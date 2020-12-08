const StorageHelper = window.localStorage; //todo expired?

const StorageHelper = {
    filterKey: 'sticky-filters',
    serialize: function(item){
        return JSON.stringify(item);
    },
    deserialize: function(item){
        return JSON.parse(item);
    },
    has: function(key){
        let filters = StorageHelper.getStoredFilters();
        if(!key || !filters){
            return false;
        }
        return Object.keys(filters).includes(key);
    },
    getStoredFilters: function(){
        return StorageHelper.deserialize(StorageHelper.getItem(StorageHelper.filterKey));
    },
    resetFilter: function(filters){
        StorageHelper.setItem(StorageHelper.filterKey, StorageHelper.serialize(filters));
    },
    setItem: function(key, val){
        if(!key || !val){
            return;
        }
        const filters = StorageHelper.getStoredFilters();
        StorageHelper.setItem(StorageHelper.filterKey, 
            StorageHelper.serialize({...filters, [key]: val }));
    },
    getItem: function(key){
        if(!key){
            return null;
        }
        const filters  = StorageHelper.getStoredFilters();
        return filters[key];
    },
    removeItem: function(key){
        const filters  = StorageHelper.getStoredFilters();
        if(!key || !filters){
            return;
        }
        delete filters[key];
        StorageHelper.resetFilter(filters);
    }
};

module.exports = StorageHelper;