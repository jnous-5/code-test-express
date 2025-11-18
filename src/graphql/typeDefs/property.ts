import gql from 'graphql-tag';

const typeDefs = gql`
    enum State {
        NSW
        VIC
        QLD
        WA
        SA
        TAS
        ACT
        NT
    }

    type Address {
        streetName: String!
        suburb: String!
        state: State!
        postcode: Int!
    }

    input AddressInput {
        streetName: String!
        suburb: String!
        state: State!
        postcode: Int!
    }

    type Property {
        id: ID!
        "Address of the property."
        address: Address!
        "Price of the property."
        price: Float!
        "Description of the property."
        description: String
    }

    type Query {
        properties: [Property!]
    }

    type Mutation {
        """
        Creates a new property.
        """
        addProperty(
            "Address of the property."
            address: AddressInput!
            "Price of the property."
            price: Float!
            "Description of the property."
            description: String
        ): Property
    }
`;

export default typeDefs;
