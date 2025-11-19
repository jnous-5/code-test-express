import { createProperty, getProperties } from 'src/store';
import { Property, SearchResult } from 'src/types';

const resolvers = {
    Mutation: {
        addProperty: (_: unknown, args: Omit<Property, 'id'>): Property => {
            return createProperty(args);
        },
    },
    Query: {
        properties: (_: unknown, args: { suburb?: string }): SearchResult[] => {
            return getProperties({ suburb: args.suburb });
        },
    },
};

export default resolvers;
