const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Dallo Open AI',
            version: '1.0.0',
            description: 'An API for interacting with Open AI API',
        },
        servers: [
            {
                url: 'http://localhost:4000',
                url: 'https://dallo-openai-production.up.railway.app/'
            },
        ],
    },
    apis: ['./routes/*.js'], // ruta a los archivos donde está la documentación en comentarios
};

export default swaggerOptions;