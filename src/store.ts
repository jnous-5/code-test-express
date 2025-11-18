import { Property, Store } from './types';

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
 * Returns all properties from the database.
 *
 * @returns {Property[]}
 */
export function getProperties(): Property[] {
    return _db.properties;
}
