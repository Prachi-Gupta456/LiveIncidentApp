import express from "express"
import { collectionName, connection } from "./dbconfig.js"
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors"
import 'dotenv/config'
import { ObjectId } from "mongodb";

const app = express();
app.use(express.json());

app.use(cors({
    origin: "https://live-incident-app.vercel.app",
    credentials: true
}))

app.use(express.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

const db = await connection();
const collection = await db.collection(collectionName);

async function getReadableAddress(lat, lng) {
    try {
        let result = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        result = await result.json()

        return { address: result.display_name };
    } catch (err) {
        console.log(err.message);
        return { address: "Unavailable" };
    }
}

app.get("/api/reverse-geocode", async (req, resp) => {

    try {
        const { lat, lng } = req.query;

        const data = await getReadableAddress(lat, lng)

        resp.send(data)
    }
    catch (error) {
        resp.send({
            success: false,
            msg: error.message
        })
    }

})

app.post("/api/create-incident", upload.single("media"), async (req, resp) => {


    try {
        if (!req.file) {
            return resp.status(400).send({
                successs: false,
                msg: "Media file is not provided!"
            })
        }

        // Upload media to cloudinary

        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },

            async (error, uploadResult) => {

                if (error) {
                    return resp.send({
                        success: false,
                        msg: error.message
                    })
                }

                const incidentReport = {
                    user_name: req.body.user_name,
                    contact: req.body.contact,
                    type: req.body.type,
                    description: req.body.description,
                    location: req.body.location,
                    mediaURL: uploadResult.secure_url,
                    mediaType: uploadResult.resource_type,
                    status: "unverified",
                    severity: req.body.severity,
                    timestamp: new Date()
                }

                const result = await collection.insertOne(incidentReport)

                if (result) {
                    resp.send({
                        success: true,
                        msg: incidentReport
                    })
                }
                else {
                    return resp.send({
                        success: false,
                        msg: "Incident not saved in database yet!"
                    })
                }

            }
        )
        uploadStream.end(req.file.buffer)
    }

    catch (error) {
        resp.status(500).send({
            success: false,
            msg: error.message
        })
    }
})

app.get("/api/incidents", async (req, resp) => {
    try {
        let result = await collection.find().toArray()

        resp.send({
            success: true,
            data: result,
            msg: "data fetched"
        })

    } catch (error) {
        resp.send({
            success: false,
            msg: error.message
        })
    }
})

app.get("/api/incidents/:id", async (req, resp) => {
    try {
        const id = req.params.id
        let result = await collection.findOne({ _id: new ObjectId(id) })

        resp.send({
            success: true,
            msg: "Incident found successfully!",
            incident: result
        })

    } catch (error) {
        resp.status(500).send({
            success: false,
            msg: error.message
        })
    }
})

app.patch("/api/incidents/:id/status", async (req, resp) => {
    const id = req.params.id;
    const { status, notes } = req.body

    try {

        let result = await collection.updateOne({ _id: new ObjectId(id) }, {
            $set: {
                status: status,
                notes: notes
            }
        })
        resp.send({
            success: true,
            msg: result
        })
    }

    catch (error) {
        resp.status(500).send({
            success: false,
            msg: error.message
        })
    }

})

app.patch("/api/incidents/:id/confirm", async (req, resp) => {
    const id = req.params.id;
    try {

        let result = await collection.updateOne({ _id: new ObjectId(id) }, {
            $set: {
                confirm: "true"
            }
        })
        resp.send({
            success: true,
            msg: result
        })
    }

    catch (error) {
        resp.status(500).send({
            success: false,
            msg: error.message
        })
    }
})

app.listen(process.env.PORT || 5000,() => console.log("server is listening..."));


