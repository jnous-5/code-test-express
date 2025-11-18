import { createProperty, getProperties } from 'src/store';
import { Property } from 'src/types';

const resolvers = {
    Mutation: {
        addProperty: (_: unknown, args: Omit<Property, 'id'>): Property => {
            return createProperty(args);
        },
    },
    Query: {
        properties: (): Property[] => {
            return getProperties();
        },
    },
};

export default resolvers;
