const storage = window.localStorage; //todo expired?

const Storage = {
    filterKey: 'sticky-filters',
    serialize: function(item){
        return JSON.stringify(item);
    },
    deserialize: function(item){
        return JSON.parse(item);
    },
    has: function(key){
        let filters = Storage.getStoredFilters();
        if(!key || !filters){
            return false;
        }
        return Object.keys(filters).includes(key);
    },
    getStoredFilters: function(){
        return Storage.deserialize(storage.getItem(Storage.filterKey));
    },
    resetFilter: function(filters){
        storage.setItem(Storage.filterKey, Storage.serialize(filters));
    },
    setItem: function(key, val){
        if(!key || !val){
            return;
        }
        const filters = Storage.getStoredFilters();
        storage.setItem(Storage.filterKey, 
            Storage.serialize({...filters, [key]: val }));
    },
    getItem: function(key){
        if(!key){
            return null;
        }
        const filters  = Storage.getStoredFilters();
        return filters[key];
    },
    removeItem: function(key){
        const filters  = Storage.getStoredFilters();
        if(!key || !filters){
            return;
        }
        delete filters[key];
        Storage.resetFilter(filters);
    }
};

module.exports = Storage;