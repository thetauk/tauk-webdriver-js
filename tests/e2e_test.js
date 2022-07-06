"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tauk_webdriver_1 = require("../tauk/tauk_webdriver");
const assert = require('assert');
describe('E2E Tests', () => {
    describe('initialize', () => {
        it('should initialize Tauk', () => {
            console.log('Starting init');
            let tauk = tauk_webdriver_1.Tauk.getInstance();
            // throw new Error('failed to get instance');
            // assert.equal([1, 2, 3].indexOf(4), -1);
            console.log(tauk);
        });
    });
});
