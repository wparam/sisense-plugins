const FilterHelper = {
    isValid: function(filter){
        return filter && filter.jaql && filter.jaql.title;
    },
    isEnabled: function(filter){
        return filter && filter.jaql && filter.jaql.title && filter.disabled;
    },
    getTitle: function(filter){
        if(!this.isValid(filter)){
            return null;
        }
        // return filter.jaql.dim;
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
        return !filter.jaql.title.toLowerCase().endsWith('_local');
    },
    getPreFilterState: function(preFilters, curFilters){
        if(!preFilters || preFilters.length === 0 || !curFilters || 
            curFilters.length === 0){
            return '';
        }
        const preFilter = preFilters.filter(pre=>!curFilters.find(cur=>cur.jaql.title===pre.jaql.getPreFilterName));
        if(!preFilter){
            return '';
        }
        return preFilter;
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
        return filters.filter(item=>item.jaql.title && !item.jaql.title.toLowerCase().endsWith('_local')); //default be global ones
    },
    removeHandler: function(filter){
        if(!filter){
            throw new Error('Fail to remove filter');
        }
        StorageHelper.removeItem(FilterHelper.getTitle(filter));   
    },
    renameHandler: function(preFilters, curFilters){

    }
};

module.exports = FilterHelper;