import FilterHelper from './filterHelper';
import Storage from './storage';

//todo, expired? set by orgid?
function updateFilter(dash){
    let filters = JSON.parse(localStorage.getItem('filters'));
    dash.filters.update(filters, { refresh: true, save: true });
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
        args.items.forEach(function(filter, idx){
            if(FilterHelper.isLocal(filter)){
                return false;
            }
            if(FilterHelper.isGlobal(filter)){
                Storage.setItem(FilterHelper.getTitle(filter), filter);
            }
        });
    });

    dashboard.on('initialized', function (dash, args) {
        if(dash.filters && dash.filters.length > 0 && 
            FilterHelper.getGlobalFilters(dash.filters.$$items).length > 0){
            hasDefaultFilters = true;
            return;
        }else{
            updateFilter(dash);
        }
    });
});
