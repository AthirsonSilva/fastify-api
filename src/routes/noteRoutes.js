const notesController = require('../controllers/notesController')

module.exports = (app) => {
	app.post('/api/notes', notesController.create)

	app.get('/api/notes', notesController.fetch)

	app.get('/api/notes/:id', notesController.get)

	app.patch('/api/notes/:id', notesController.update)

	app.delete('/api/notes/:id', notesController.delete)
}
