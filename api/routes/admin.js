const express = require('express');
var async = require('async');
const truffleContract = require('../../connection/app.js');
const router = express.Router();
var Hashids = require('hashids');
var hashids = new Hashids('', 10);


const fileUpload = require('express-fileupload');
const fs = require('fs');

// IPFS configuration
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient('http://localhost:5001');

const addFile = async (fileName, filePath) => {
    var buf = Buffer.from('[18,32,182]');

    // console.log(buf.toString());

    const file = fs.readFileSync(filePath);
    let results = [];
    for await (const result of ipfs.add({path: fileName, content: file})) {
        results.push(result);
    }
    // console.log(results);
    // console.log(typeof JSON.stringify(results[0].cid));
    await truffleContract.set(results[0].cid.toString());
    return results[0].cid;
};

router.post('/', async (req, res, next) => {

        const fileName = req.body.filename;

        const filePath = './api/routes/files/' + fileName;

        const fileHash = await addFile(fileName, filePath);

        console.log(fileHash);
        fs.unlink(filePath, (err) => {
            if (err) console.log(err);
            res.status(200).json({
                message: fileHash
            })
        })
});

router.get('/data', async (req, res, next) => {
    let address = await truffleContract.get();
    console.log(address);
    const stream = ipfs.cat(address);
    let data = ''

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
    }

    res.status(200).send(data);
})

router.get('/', (req, res, next) => {
    console.log('Getting info from the blockchain');
    truffleContract.renderAdmin().then((answer) => {
        res.status(200).json({
            account: answer
        })
    })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    })
});


module.exports = router;