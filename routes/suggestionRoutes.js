const express = require('express');
//create a router
const router = express.Router();

const Suggestion = require('../models/Suggestion')
const {
    getAllSuggestions,
    getSuggestionsByName,
    getOneSuggestion,
    createNewOne,
    update
}
    = require('../controllers/suggestionController')


router.get('/all-suggestions', getAllSuggestions)

router.get('/byname-suggestion/:name', getSuggestionsByName)

router.get('/single-suggestion/:id', getOneSuggestion)

router.post('/create-suggestion', createNewOne)

router.put('/update-suggestion', update)



module.exports = router;