#!/usr/bin/env node
//import 'node-mommy'; // Mommy's here to help you when running Node~

// A helper class to run tests

// More stuff will be added here later
export default class Debug {
    log(...message) {
        console.log(...message);
    }
    error(message) {
        console.error(...message);
    }
}