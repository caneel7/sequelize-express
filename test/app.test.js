const request = require('supertest');
const assert = require('assert');
const { describe, after, it } = require('node:test');
const app = require('../build/index').server;

const test = async () => {
    try {

        await new Promise((resovle, reject) => {
            app.on('connected', () => {
                console.log("Successfully connected to server");
                resovle();
            })
        })

        let testPassed = true;

        describe('Running All Public Essential APIs', () => {

            it('Login ', async () => {
                try {

                    let resp = await request(app).get('/user/ping');
                    assert.strictEqual(resp.statusCode, 200);

                } catch (error) {
                    testPassed = false;
                    throw error;
                }
            })

            after(() => {
                if (!testPassed) {
                    process.exit(1);
                } else {
                    console.log('All Test Passed');
                    process.exit(0);
                }
            })

        })


    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

test();