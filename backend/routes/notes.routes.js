const { Router } = require('express');

const router = Router();
const { rootGet, createNewNote, getAllNotes } = require('../controllers/notes.controllers');//desestructción

/* Peticiones GET en la raíz / */
router.get('/', rootGet)//Endpoint
router.post('/notes/create', createNewNote)
router.get('/notes', getAllNotes)

module.exports = router;