import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import { resolvers, typeDefs } from 'src/graphql/index';

async function init(): Promise<void> {
    const server = new ApolloServer({ resolvers, typeDefs });
    await server.start();

    const app = express();
    app.use('/graphql', express.json(), expressMiddleware(server));

    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
}

init();
