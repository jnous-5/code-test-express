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
        "Name of the street."
        streetName: String!
        "Name of the suburb."
        suburb: String!
        "Name of the state."
        state: State!
        "The address postcode."
        postcode: Int!
    }

    input AddressInput {
        "Name of the street."
        streetName: String!
        "Name of the suburb."
        suburb: String!
        "Name of the state."
        state: State!
        "The address postcode."
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

    enum PriceComparison {
        ABOVE
        BELOW
        EQUAL
    }

    type SearchResult {
        "Unique ID of this item."
        id: ID!
        "Address of the property."
        address: Address!
        "Price of the property."
        price: Float!
        "Description of the property."
        description: String
        """
        Determines if the price is above, below, or equal to the average price
        in the same suburb.
        """
        priceComparison: PriceComparison!
    }

    type Query {
        """
        Returns all properties. Optionally filters via suburb.
        """
        properties(suburb: String): [SearchResult!]
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
