import { PriceComparison, Property, SearchResult, Store } from './types';

/**
 * In-memory database for storing data. Only persist while the server
 * is running. Restarting the server will restore data back to the
 * initial state.
 *
 * @type {Store}
 */
const _db: Store = {
    properties: [],
};

/**
 * Creates a new property item in the database.
 *
 * @param {Omit<Property, 'id'>} data The property details.
 * @returns {Property}
 */
export function createProperty(data: Omit<Property, 'id'>): Property {
    const newProperty = { id: crypto.randomUUID(), ...data };

    _db.properties.push(newProperty);

    return newProperty;
}

/**
 * Returns all properties from the database with an optional
 * search filter.
 *
 * @param {Object} filter Optional filter to apply.
 * @returns {SearchResult[]}
 */
export function getProperties({ suburb }: { suburb?: string }): SearchResult[] {
    let matches = _db.properties;

    if (suburb) {
        matches = _db.properties.filter((property) => {
            return (
                property.address.suburb.toLowerCase() === suburb.toLowerCase()
            );
        });
    }

    return matches.map((property) => {
        const average = getAveragePropertyPrice(property.address.suburb);

        let priceComparison: PriceComparison;

        if (property.price === average) {
            priceComparison = PriceComparison.EQUAL;
        } else if (property.price > average) {
            priceComparison = PriceComparison.ABOVE;
        } else {
            priceComparison = PriceComparison.BELOW;
        }

        return { ...property, priceComparison };
    });
}

/**
 * Returns the average price of properties in a suburb.
 *
 * @param {string} suburb The suburb where the properties belong.
 * @returns {number}
 */
function getAveragePropertyPrice(suburb: string): number {
    const propertiesInSuburb = _db.properties.filter((property) => {
        return property.address.suburb.toLowerCase() === suburb.toLowerCase();
    });

    const total = propertiesInSuburb.reduce(
        (sum, property) => sum + property.price,
        0,
    );

    return total / propertiesInSuburb.length;
}
