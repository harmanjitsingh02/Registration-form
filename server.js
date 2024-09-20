const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Add this to use 'path' module
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/health_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Create a Mongoose schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    height: Number,
    weight: Number,
    gender: String,
    goal: String,
    diet: String,
    phone: String,
    zipcode: String,
    state: String,
    city: String,
}, { collection: 'info' });

const User = mongoose.model('User', userSchema);

// Serve static files (your HTML, CSS, and JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the form
});

// Route for form submission
app.post('/submit', async (req, res) => {
    try {
        const body = req.body;

        // Save form data to MongoDB
        const result = await User.create({
            username: body.username,
            password: body.password,
            height: body.height,
            weight: body.weight,
            gender: body.gender,
            goal: body.goal,
            diet: body.diet,
            phone: body.phone,
            zipcode: body.zipcode,
            state: body.state,
            city: body.city,
        });

        console.log('Data saved to MongoDB:', result);
        return res.status(201).json({ msg: 'Success' });

    } catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({ msg: 'Error saving data' });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
