export enum PriceComparison {
    ABOVE = 'ABOVE',
    BELOW = 'BELOW',
    EQUAL = 'EQUAL',
}

export enum State {
    ACT = 'ACT',
    NSW = 'NSW',
    NT = 'NT',
    QLD = 'QLD',
    SA = 'SA',
    TAS = 'TAS',
    VIC = 'VIC',
    WA = 'WA',
}

export interface Address {
    postcode: number;
    state: State;
    streetName: string;
    suburb: string;
}

export interface Property {
    address: Address;
    description: string;
    id: string;
    price: number;
}

export interface SearchResult {
    address: Address;
    description: string;
    id: string;
    price: number;
    priceComparison: PriceComparison;
}

export interface Store {
    properties: Property[];
}
