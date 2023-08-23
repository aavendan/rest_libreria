const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/rest_autores.js', './routes/rest_libros.js']

swaggerAutogen(outputFile, endpointsFiles)