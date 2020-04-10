const https = require('https')
const express = require('express')
const app = express()

const port = 3000;
const url = "https://blockchain.info/rawblock/"
// /block/000000000002de92d93fcb92eeb2be097af8570a70fa5a8c6df473626891c9d6


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/block/:block', function (req, res, next) {
	let block = req.params.block;
	let blockJSON = {}

	https.get( url + block, response => {
	    let resultat = "";
	    response.on("data", data => {
	        resultat += data;
	    })
	    response.on('end', () =>{
	        let blockJSON = JSON.parse(resultat)
	        let str = 'Block N° : '+block+'<br>Date : '+new Date(blockJSON.time*1000)+'<br>'
	        	str += 'Hauteur : '+blockJSON.height+'<br>'
	        	for (let i=0,j=blockJSON.tx.length;i<j;i++){
	        		str += 'Hash '+(i+1)+' : '+blockJSON.tx[i].hash+'<br>'
	        	}
	        	
						
	        console.log(blockJSON)

        	res.send(JSON.stringify(str))
	    })
	})

})

