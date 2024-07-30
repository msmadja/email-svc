const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use('/', routes);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
 .then(() => {
    console.log('Connected to MongoDB');
})
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.listen(PORT, () => { 
  console.log(`Server is started on port ${PORT}`);
});