const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();


router.get('/', (req,res) => {
    db('accounts').select('*')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.status(500).json({message:"Cannot get accounts"})
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
 db.select('*').from('accounts').where({id})
 .then(account => {
     if (account[0]) {
         res.status(200).json(account)
     } else {
         res.status(404).json({message:"Invalid Id"})
     }
 })
 .catch(err => {
     res.status(500).json({message:"Problem getting the account."})
 })
});


router.post('/', async (req, res) => {
    const accountData = req.body;
    db.insert(accountData).into('accounts')
    .then(account => {
        res.status(201).json(account)
    })
    .catch(err => {
        res.status(500).json({message:"db problem",error:err})
    })
})


module.exports = router;
