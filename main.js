import FilterHelper from './filterHelper';
import StorageHelper from './StorageHelper';

//todo, expired? set by orgid?
function updateFilter(dash){
    let filters = StorageHelper.getStoredFilters();
    if(!filters || Object.keys(filters).length === 0){
        return;
    }
    let newFilters = Object.values(filters);
    console.log(filters);
    console.log(newFilters);
    dash.filters.update(newFilters, { refresh: true, save: true });
}

function removeHandler(dash, args){
    if(!FilterHelper.isGlobal(args.items[0])){
        return;
    }
    StorageHelper.removeItem(FilterHelper.getTitle(args.items[0]));
}

function renameHandler(dash, args){
    let preFilterState= FilterHelper.getPreFilterState(JSON.parse(stagedFilters), dash.filters.$$items);
    if(FilterHelper.isGlobal(preFilterState)){
        StorageHelper.removeItem(FilterHelper.getTitle(preFilterState));
    }
    if(FilterHelper.isGlobal(args.items[0])){
        return false;
    }else{
        return true;
    }
}

prism.on('dashboardloaded', (event, args) => {
    const dashboard = args.dashboard;
    let hasDefaultFilters = false;
    let hasFilterCleared = false;
    let stagedFilters = '[]';
    dashboard.on('filterschanged', function (dash, args) {
        console.log('in filter changed');
        console.log(args);
        if(hasDefaultFilters){
            let globalFilters = FilterHelper.getGlobalFilters(dash.filters.$$items);
            let count = 1;
            if(globalFilters.length === 0){
                updateFilter(dash);
            }
            dash.filters.$$items.forEach(function(filter, idx){
                if(FilterHelper.isGlobal(filter)){
                    console.log('it is global filter, about to remove it')
                    console.log(filter);
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

        if(args.type==='remove' && args.items.length === 1 ){
            removeHandler(dash, args);
            return;
        }

        if(args.type === 'update' && args.reason === 'filterRenamed' && args.items.length === 1
            && renameHandler(dash, args)){
            return;
        }

        args.items.forEach(function(filter, idx){
            if(FilterHelper.isGlobal(filter)){
                StorageHelper.setItem(FilterHelper.getTitle(filter), filter);
            }
        });

        stagedFilters = JSON.stringify(dash.filters.$$items);
        console.log('now the filters become: ');
        console.log(stagedFilters);
    });

    dashboard.on('initialized', function (dash, args) {
        console.log('in initialized');
        console.log(dash.filters);
        if(dash.filters && dash.filters.length > 0){
            hasDefaultFilters = true;
            return;
        }else{
            updateFilter(dash);
        }
    });
});
