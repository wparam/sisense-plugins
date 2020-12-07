//todo, expired? set by orgid?
function updateFilter(dash){
    let filters = JSON.parse(localStorage.getItem('filters'));
    dash.filters.update(filters, { refresh: true, save: true });
}

function getLocalFilters(filters){
    if(!filters || filters.length === 0){
        return [];
    }
    return filters.filter(item=>item.jaql.title && item.jaql.title.toLowerCase().endsWith('_local'));
}

function getGlobalFilters(filters){
    if(!filters || filters.length === 0){
        return [];
    }
    return filters.filter(item=>item.jaql.title && item.jaql.title.toLowerCase().endsWith('_global'));
}


prism.on('dashboardloaded', (event, args) => {
    const dashboard = args.dashboard;
    let hasDefaultFilters = false;
    let hasFilterCleared = false;
    dashboard.on('filterschanged', function (dash, args) {
        if(hasDefaultFilters){
            hasDefaultFilters = false;
            hasFilterCleared = true;
            dashboard.filters.clear();
            return false;
        }
        if(hasFilterCleared){
            hasFilterCleared = false;
            updateFilter(dash);
            return false;
        
        }
        console.log(dash.filters);
        if(!dash.filters || dash.filters.length === 0){
            console.error('filters is empty, and will be set to localStorage');
        }
        localStorage.setItem('filters', JSON.stringify(dash.filters.$$items));
    });

    dashboard.on('initialized', function (dash, args) {
        if(dash.filters && dash.filters.length > 0){
            hasDefaultFilters = true;
            return;
        }else{
            updateFilter(dash);
        }
    });
});
