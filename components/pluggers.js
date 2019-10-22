const express = require('express');
const db = require('../db');
const router = express.Router();

//  Return all plug information
router.get('/', (req, res) => {
    db.query('SELECT * FROM demo').then(results => {
        res.json({ pluggers: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

//  Return information of a single plug
router.get('/:plugId', (req, res) => {
    db.query('SELECT * FROM demo where id = ?', [req.params.plugId])
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

/* Create a new dog
    Expects the following data format
    {
        name: string,
        image: string - whole url to image
    }
*/
router.post('/', (req, res) => {

    db.query('INSERT INTO demo (lat, lng, type, address, img) VALUES (?,?,?,?,?)',
    [req.body.lat, req.body.lng, req.body.type, req.body.address, req.body.img])
    .then(results => {
        console.log(results);
        res.sendStatus(201);
    })
    .catch(() => {
        res.sendStatus(500);
    });

});

router.delete('/:plugID', (req, res) => {
    db.query('DELETE FROM demo where id = ?', [req.params.plugID])
    .then(results => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

module.exports = router;
