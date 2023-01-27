const fastify = require('fastify')
const mongoose = require('mongoose')
const app = fastify()
const noteRoutes = require('./routes/noteRoutes')

mongoose.set('strictQuery', true)

try {
	mongoose.connect('mongodb://127.0.0.1:27017/notes_db', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
} catch (a) {
	console.error(e)
}

noteRoutes(app)

app.listen({ port: 3000 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}

	console.info(`Server running on ${address}`)
})

app.get('/', (request, reply) => {
	try {
		reply.send('Hello World')
	} catch (error) {
		console.error(error)
	}
})
