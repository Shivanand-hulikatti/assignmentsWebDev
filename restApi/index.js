const express = require('express');
const app = express();  
const PORT = 8000 || process.env.PORT;
const users = require('./MOCK_DATA.json');

app.use(express.json());

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {   
    const user = users.find(user => user.id === parseInt(req.params.id));
    res.json(user);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 