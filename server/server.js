import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

// In-memory storage for reports
let reports = [];

// Enable CORS for both apps
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'DELETE'],
}));

app.use(express.json({ limit: '50mb' })); // Increased limit for Base64 images/audio

// GET - Fetch all reports
app.get('/api/reports', (req, res) => {
    res.json(reports);
});

// DELETE - Remove a report
app.delete('/api/reports/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = reports.length;
    reports = reports.filter(r => r.id !== id);

    if (reports.length < initialLength) {
        console.log(`[Server] Deleted report: ${id}`);
        res.json({ success: true, message: 'Report deleted' });
    } else {
        res.status(404).json({ success: false, message: 'Report not found' });
    }
});

// POST - Submit a new report
app.post('/api/reports', (req, res) => {
    const { id, type, message, location, photoUrl, audioUrl } = req.body;

    const newReport = {
        id: id || `report-${Date.now()}`, // Use client ID if provided
        type: type || 'general',
        message: message || '',
        location: location || 'Unknown',
        photoUrl: photoUrl || undefined,
        audioUrl: audioUrl || undefined,
        timestamp: new Date().toISOString(),
        isVerified: false,
        urgency: 'Medium',
    };

    // Check for duplicates
    const existingIndex = reports.findIndex(r => r.id === (id || ''));
    if (existingIndex !== -1) {
        console.log(`[Server] Duplicate report ignored: ${id}`);
        return res.status(200).json({
            success: true,
            message: 'Report already exists',
            report: reports[existingIndex]
        });
    }

    reports.unshift(newReport); // Add to beginning
    console.log(`[Server] New report received:`, newReport);

    res.status(201).json({
        success: true,
        report: newReport,
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', reportCount: reports.length });
});

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   Miyah Report Server Running!         ║
║   http://localhost:${PORT}                 ║
║                                        ║
║   Endpoints:                           ║
║   POST /api/reports - Submit report    ║
║   GET  /api/reports - Get all reports  ║
║   DELETE /api/reports/:id - Delete     ║
╚════════════════════════════════════════╝
    `);
});
