import StorageHelper from './StorageHelper';

const test = { name: 'init' };

console.log(`Test Serialize: ${JSON.stringify(test)} === ${StorageHelper.serialize(test)}`)