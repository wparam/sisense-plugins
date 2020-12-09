import FilterHelper from './filterHelper';
import Storage from './storage';

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
        args.items.forEach(function(filter, idx){
            if(FilterHelper.isLocal(filter)){
                return false;
            }
            if(FilterHelper.isGlobal(filter)){
                Storage.setItem(FilterHelper.getTitle(filter), filter);
            }
        });
        console.log(args);
        console.log(dash.filters.$$items);
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
