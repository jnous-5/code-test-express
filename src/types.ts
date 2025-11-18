export enum State {
    NSW,
    VIC,
    QLD,
    WA,
    SA,
    TAS,
    ACT,
    NT,
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

export interface Store {
    properties: Property[];
}
