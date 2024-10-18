const express = require('express');
const route = express.Router();

const {handleCreateShortUrl,handleGetAllShortUrls,handleAnalyticsId} = require('../controllers/index');

route.post('/',handleCreateShortUrl);
route.get('/',handleGetAllShortUrls);
route.get('/analyse/:id',handleAnalyticsId);

module.exports = route;