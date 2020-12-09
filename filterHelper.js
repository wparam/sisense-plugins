const FilterHelper = {
    isValid: function(filter){
        return filter && filter.jaql && !filter.jaql.title;
    },
    isEnabled: function(filter){
        return filter && filter.jaql && filter.jaql.title && filter.disabled;
    },
    getTitle: function(filter){
        if(!this.isValid(filter)){
            return null;
        }
        return filter.jaql.title;
    },
    isLocal: function(filter){
        if(!this.isValid(filter)){
            return false;
        }
        return filter.jaql.title.toLowerCase().endsWith('_local');
    },
    isGlobal: function(filter){
        if(!this.isValid(filter)){
            return false;
        }
        return filter.jaql.title.toLowerCase().endsWith('_global');
    },
    getLocalFilters: function(filters){
        if(!filters || filters.length === 0){
            return [];
        }
        return filters.filter(item=>item.jaql.title && item.jaql.title.toLowerCase().endsWith('_local'));
    },
    getGlobalFilters: function(filters){
        if(!filters || filters.length === 0){
            return [];
        }
        return filters.filter(item=>item.jaql.title && item.jaql.title.toLowerCase().endsWith('_global'));
    }
};

module.exports = FilterHelper;