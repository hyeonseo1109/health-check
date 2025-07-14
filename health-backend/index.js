require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const app = express();
const PORT = 1109;

app.use(cors());
app.use(express.json());

// MongoDB 연결 문자열
const uri = process.env.MONGO_URI;

// MongoClient 인스턴스 생성
const client = new MongoClient(uri);

let collection;  // 나중에 DB 컬렉션 할당할 변수

async function connectDB() {
    try {
        await client.connect();
        const db = client.db('healthCheckDB'); // 원하는 DB 이름
        collection = db.collection('contents'); // 원하는 컬렉션 이름
        console.log("MongoDB connected");
    } catch (e) {
        console.error(e);
    }
}

// 기본 라우트
app.get('/', (req, res) => {
    res.send('✧*｡٩(ˊᗜˋ*)و✧*｡');
});

// 모든 데이터 가져오기 API
app.get('/api/data', async (req, res) => {
    try {
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// 데이터 추가 API
app.post('/api/data', async (req, res) => {
    try {
        const newData = req.body;
        const result = await collection.insertOne(newData);
        newData._id = result.insertedId;
        res.json(newData);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// 데이터 삭제 API
app.delete('/api/data/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // 문자열 id → MongoDB의 ObjectId 타입으로 변환
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});





// 서버 실행 전에 DB 연결
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
