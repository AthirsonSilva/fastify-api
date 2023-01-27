const Note = require('../models/Note')

module.exports = {
	create: async (request, reply) => {
		try {
			const note = request.body
			const newNote = await Note.create(note)

			reply.code(201).send({
				message: 'Note created successfully',
				data: newNote
			})
		} catch (error) {
			reply.code(400).send({
				message: 'Error creating note',
				error
			})
		}
	},
	fetch: async (request, reply) => {
		try {
			const notes = await Note.find({})

			reply.code(200).send(notes)
		} catch (error) {
			reply.code(500).send({
				message: 'Error fetching notes',
				error
			})
		}
	},
	get: async (request, reply) => {
		try {
			const noteId = request.params.id

			if (!noteId) {
				reply.code(400).send({
					message: 'Note id is required'
				})
			}

			const note = await Note.findById(noteId)

			if (!note) {
				reply.code(404).send({
					message: 'Note not found'
				})
			}

			reply.code(200).send({
				message: 'Note fetched successfully',
				data: note
			})
		} catch (error) {
			reply.code(500).send({
				message: 'Error fetching note',
				error
			})
		}
	},
	update: async (request, reply) => {
		try {
			const noteId = request.params.id
			const note = request.body

			if (!noteId) {
				reply.code(400).send({
					message: 'Note id is required'
				})
			} else if (!note) {
				reply.code(400).send({
					message: 'The data to update a note is required'
				})
			}

			const updatedNote = await Note.findByIdAndUpdate(noteId, note, {
				new: true
			})

			reply.code(200).send({
				message: 'Note updated successfully',
				data: updatedNote
			})
		} catch (error) {
			reply.code(500).send({
				message: 'Error updating note',
				error
			})
		}
	},
	delete: async (request, reply) => {
		try {
			const noteId = request.params.id

			if (!noteId) {
				reply.code(400).send({
					message: 'Note id is required'
				})
			}

			await Note.findByIdAndDelete(noteId)

			reply.code(200).send({
				message: 'Note deleted successfully'
			})
		} catch (error) {
			reply.code(500).send({
				message: 'Error deleting note',
				error
			})
		}
	}
}
