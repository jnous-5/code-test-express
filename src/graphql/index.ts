import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import propertyResolvers from 'src/graphql/resolvers/property';
import propertyTypeDefs from 'src/graphql/typeDefs/property';

export const typeDefs = mergeTypeDefs([propertyTypeDefs]);

export const resolvers = mergeResolvers([propertyResolvers]);
