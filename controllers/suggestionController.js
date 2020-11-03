const Suggestion = require('../models/Suggestion')


module.exports = {
    //====================================================================================//
    //====================================================================================//
    getAllSuggestions: (req, res) => {
        Suggestion.find()
            .then((suggestion) => {
                return res.status(200).json({ confirmation: 'success', suggestion });
            })
            .catch(err => response.status(500).json({ confirmation: 'fail', err }))
    },
    //====================================================================================//
    //====================================================================================//

    // if i query a name i should get a list of their suggestions
    getSuggestionsByName: (req, res) => {
        const name = req.query.name;
        Suggestion.find({ name })
            .then((suggestion) => {
                return res.status(200).json({ confirmation: 'success', suggestion })
            })
    },
    //====================================================================================//
    //====================================================================================//

    // get one suggestion based on id using parameters
    getOneSuggestion: (req, res) => {
        Suggestion
            .findById(req.params.id)
            .then((suggestion) => res.status(200).json({ suggestion }))
            .catch((err) => res.status(500).json({ confirmation: 'fail', err }))

    },
    //====================================================================================//
    //====================================================================================//

    createNewOne: (req, res) => {

        const newSuggestion = new Suggestion();

        // do i need all these parameters to create a suggestion
        // if not,  only newSuggestion.suggestion, needed
        newSuggestion.title = req.body.title
        newSuggestion.name = req.body.name
        newSuggestion.suggestion = req.body.suggestion



        newSuggestion
            .save()
            .then((suggestion) => res.status(200).json({ confirmation: 'success', suggestion }))

    },
    //====================================================================================//
    //====================================================================================//

    // suggestion can only update title and suggestion
    update: (req, res) => {
        Suggestion.findById(req.params.id)
            .then(foundSuggestion => {
                if (!foundSuggestion) {
                    return res.status(400).send('Suggestion Not Found')
                }
                if (!req.bogy.title && !req.body.suggestion) {
                    return res.status(400).send('No change was made')
                }

                if (req.body.title) {
                    console.log('title', req.body.title)
                    foundSuggestion.title = req.body.title;
                }
                if (req.body.suggestion) {
                    console.log('suggestion', req.body.suggestion)
                    foundSuggestion.suggestion = req.body.suggestion
                }
                foundSuggestion.save()
                    .then(suggestion => {
                        return res.status(200).json({ message: 'Suggestion Updated', suggestion })
                    })


            }).catch((err) => res.status(500).json({ message: 'Server Error' }))

    },
    //====================================================================================//
    //====================================================================================//

    // suggestion deletes based on id
    deleteSuggestion: (req, res) => {
        try {

            Suggestion.findByIdAndDelete(req.params.id)
                .then((suggestion) => {
                    res.status(200).json({ message: 'Suggestion Deleted', suggestion })
                })
                .catch((err) => res.status(400).json({ confirmation: 'fail', message: 'Suggestion Not Found' }))

        }
        catch (err) {
            return res.status(500).json({ message: 'Server Error' })
        }
    }



}