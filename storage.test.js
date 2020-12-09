import Storage from './storage';

const test = { name: 'init' };

console.log(`Test Serialize: ${JSON.stringify(test)} === ${Storage.serialize(test)}`)