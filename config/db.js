const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://ankushrana:9560736256Ank@cluster0.ht7cwmi.mongodb.net/nodeWithMongo?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'nodeWithMongo';

// Replace 'your-mongodb-connection-string' with your actual MongoDB connection string
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

module.exports = mongoose;