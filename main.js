import FilterHelper from './filterHelper';
import Storage from './storage';

//todo, expired? set by orgid?
function updateFilter(dash){
    let filters = Storage.getStoredFilters();
    if(!filters || Object.keys(filters).length === 0){
        return;
    }
    let newFilters = Object.values(filters);
    console.log(filters);
    console.log(newFilters);
    dash.filters.update(newFilters, { refresh: true, save: true });
}

function updateHandler(dash, args){

}

function removeHandler(dash, args){

}

prism.on('dashboardloaded', (event, args) => {
    const dashboard = args.dashboard;
    let hasDefaultFilters = false;
    let hasFilterCleared = false;
    
    dashboard.on('filterschanged', function (dash, args) {
        console.log(args);
        if(hasDefaultFilters){
            let globalFilters = FilterHelper.getGlobalFilters(dash.filters.$$items);
            let count = 1;
            console.log(dash.filters.$$items);
            console.log(globalFilters);
            dash.filters.$$items.forEach(function(filter, idx){
                console.log(FilterHelper.isGlobal(filter));
                console.log(filter);
                if(FilterHelper.isGlobal(filter)){
                    dashboard.filters.remove(idx, {refresh: globalFilters.length === count, save: true});
                    count++;
                }
            });
            hasDefaultFilters = false;
            hasFilterCleared = true;
            return;
        }
        if(hasFilterCleared){
            hasFilterCleared = false;
            updateFilter(dash);
            return;
        }

        if(args.type==='remove'){
            try {
                FilterHelper.removeHandler(dash, args);
            } catch (error) {
                console.error(error);
            }
            return;
        }

        args.items.forEach(function(filter, idx){
            if(FilterHelper.isGlobal(filter)){
                Storage.setItem(FilterHelper.getTitle(filter), filter);
            }
        });
    });

    dashboard.on('initialized', function (dash, args) {
        console.log(dash.filters);
        if(dash.filters && dash.filters.length > 0){
            hasDefaultFilters = true;
            return;
        }else{
            updateFilter(dash);
        }
    });
});
