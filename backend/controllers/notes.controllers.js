const Note = require('../models/Notes')
/* Contentradas las funciones que controlen operaciones con las notas */
const notesController = {};

notesController.rootGet = (req, res) => {
    res.send("Hola mundo")
}

notesController.createNewNote = async (req, res) => {
    /* Aqui va la logica de la creación en base de datos */
    //res.send("Creando nota")
    /* Por si falla algo, esta el try */
    try {
        // Verifica si el cuerpo de la solicitud contiene datos
        if (!req.body || !req.body.titulo || !req.body.contenido) {
            return res.status(400).json({ error: 'Los datos de la nota son requeridos' });
        }

        // Obtén los datos de la nota del cuerpo de la solicitud
        const { id, titulo, contenido } = req.body;

        // Crea una nueva instancia del modelo de nota
        const nuevaNota = new Note({
            id,
            titulo,
            contenido,
        });

        // Guarda la nueva nota en la base de datos
        const notaGuardada = await nuevaNota.save();

        // Envía la nota guardada como respuesta en formato JSON
        res.json(notaGuardada);
    } catch (error) {
        console.error('Error al crear la nota:', error);
        res.status(500).json({ error: 'Error al crear la nota' });
    }
}

notesController.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({})//SELECT * FROM table 

        console.log(notes);
        res.json(notes || []);
    } catch (error) {
        console.error('Error al obtener notas:', error);
        res.status(500).json({ error: 'Error al obtener notas' });
    }
}

module.exports = notesController