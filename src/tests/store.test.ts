import { clearStore, createProperty, getProperties } from 'src/store';
import { PriceComparison, State } from 'src/types';
import { beforeEach, describe, expect, it } from 'vitest';

describe('createProperty function', () => {
    beforeEach(() => {
        clearStore();
    });

    it('should create a new property', () => {
        const newProperty = {
            address: {
                postcode: 2071,
                state: State.NSW,
                streetName: '12 Buckingham Road',
                suburb: 'Killara',
            },
            description:
                '12 Buckingham Road is a 5 bedroom, 7 bathroom house in Killara.',
            price: 6_098_000,
        };

        createProperty(newProperty);

        expect(getProperties().at(0)).toMatchObject(newProperty);
    });

    it('should return the new property', () => {
        const newProperty = {
            address: {
                postcode: 2230,
                state: State.NSW,
                streetName: '33 Shorebird Parade',
                suburb: 'Greenhills Beach',
            },
            description:
                '33 Shorebird Parade is a 5 bedroom, 2 bathroom house in Greenhills Beach.',
            price: 6_098_000,
        };

        const result = createProperty(newProperty);

        expect(getProperties().at(0)).toHaveProperty('id');
        expect(getProperties().at(0)).toHaveProperty('priceComparison');
        expect(getProperties().at(0)).toMatchObject(result);
    });
});

describe('getProperties function', () => {
    beforeEach(() => {
        clearStore();

        createProperty({
            address: {
                postcode: 6011,
                state: State.WA,
                streetName: '200 Marine Parade',
                suburb: 'Cottesloe',
            },
            description:
                '200 Marine Parade is a 4 bedroom, 3 bathroom house in Cottesloe.',
            price: 10_000_000,
        });
        createProperty({
            address: {
                postcode: 6009,
                state: State.WA,
                streetName: '5 Hamersley Street',
                suburb: 'Dalkeith',
            },
            description:
                '5 Hamersley Street is a 3 bedroom, 4 bathroom house in Cottesloe.',
            price: 4_922_000,
        });
        createProperty({
            address: {
                postcode: 6009,
                state: State.WA,
                streetName: '4 Avonmore Terrace',
                suburb: 'Dalkeith',
            },
            description:
                '4 Avonmore Terrace is a 4 bedroom, 2 bathroom house in Cottesloe.',
            price: 4_009_000,
        });
        createProperty({
            address: {
                postcode: 7053,
                state: State.TAS,
                streetName: '46A Taroona Cres',
                suburb: 'Taroona',
            },
            description:
                '46A Taroona Cres is a 5 bedroom, 2 bathroom house in Taroona.',
            price: 3_814_000,
        });
    });

    it('should return all properties', () => {
        const properties = getProperties();

        expect(properties).toHaveLength(4);
    });

    it('should filter based on suburb', () => {
        const properties = getProperties({ suburb: 'taroona' });

        expect(properties).toHaveLength(1);
    });

    it('should return the average price of the property relative to the suburb', () => {
        const properties = getProperties({ suburb: 'dalkeith' });

        expect(properties.at(0)?.priceComparison).toEqual(
            PriceComparison.ABOVE,
        );
        expect(properties.at(1)?.priceComparison).toEqual(
            PriceComparison.BELOW,
        );
    });
});
