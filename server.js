const express = require('express');
const cors = require('cors');
const request = require('request');
const https = require('https');
const Dictionary = require('oxford-dictionary');
const bodyParser = require('body-parser');

require('dotenv').load();

const config = {
  app_id: process.env.APP_ID,
  app_key: process.env.APP_KEY, 
  source_lang : "en"
};

const dict = new Dictionary(config);
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//WITH WRAPPER for get testing
app.get('/search', function(req, res) {
  const lookup = dict.thesaurus("jump");
  lookup.then(function(response) {
    res.send({ data: response.results[0].lexicalEntries[0].entries[0].senses });
  });
});

//WITHOUT WRAPPER for post
app.post('/search',function (searchReq, searchRes){
  const options = {
    url: `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${searchReq.body.query}/synonyms`,
    headers: {
      "Accept": "application/json",
      app_id: process.env.APP_ID,
      app_key: process.env.APP_KEY, 
    }
  };
  
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      searchRes.json({ data: JSON.parse(body).results[0].lexicalEntries[0].entries[0].senses });
      searchRes.end();
    }
  }
  
  request(options, callback);

});

app.listen(port, () => console.log(`Listening on port ${port}`));