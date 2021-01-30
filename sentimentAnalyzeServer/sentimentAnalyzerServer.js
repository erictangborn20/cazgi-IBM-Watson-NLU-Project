const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getLanguageTranslator() {
  let api_key = process.env.API_KEY;
  let api_url = process.env.API_URL;

  const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),
    serviceUrl: api_url,
  });
  return naturalLanguageUnderstanding;
}


function translateUrl(url,res,sentiment,emotion) {
    let naturalLanguageUnderstanding = getLanguageTranslator();

    const analyzeParams= {
	  'url': url,
	  'features': {
	    'entities': {
	      'sentiment': sentiment,
              'emotion': emotion,
	      'limit': 1
	    }
	  }
	};

    naturalLanguageUnderstanding.analyze(analyzeParams)
	  .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
	    res.send(JSON.stringify(analysisResults, null, 2));
	  })
	  .catch(err => {
            console.log(err.toString());
	    res.send(err.toString());
	  });
}

function translateText(text,res,sentiment,emotion) {
    let naturalLanguageUnderstanding = getLanguageTranslator();

    const analyzeParams = {
	  'features': {
	    'entities': {
	      'sentiment': sentiment,
              'emotion': emotion,
	      'limit': 1
	    }
	  },
          'text': text
	};

    naturalLanguageUnderstanding.analyze(analyzeParams)
	  .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
	    res.send(JSON.stringify(analysisResults, null, 2));
	  })
	  .catch(err => {
            console.log(err.toString());
	    res.send(err.toString());
	  });
}

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let url = req.query.url;
    return translateUrl(url,res,false,true);
});

app.get("/url/sentiment", (req,res) => {
    let url = req.query.url;
    return translateUrl(url,res,true,false);
});

app.get("/text/emotion", (req,res) => {
    let text = req.query.text;
    return translateText(text,res,false,true);
});

app.get("/text/sentiment", (req,res) => {
    let text = req.query.text;
    return translateText(text,res,true,false);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
