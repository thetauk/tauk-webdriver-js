import {Tauk} from "../tauk/taukWebdriver";

const assert = require('assert');

describe('E2E Tests', () => {
    describe('initialize',  () => {
        it('should initialize Tauk', () => {
            let tauk = Tauk.getInstance()
            // throw new Error('failed to get instance');
            // assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});