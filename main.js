
// dashboard.on('filterschanged', function (dash, args) {
//     localStorage.setItem('filter', JSON.stringify(dashboard.filters.$$items));
//     console.log(dashboard.filters.$$items);
// });

prism.on('dashboardloaded', (event, args) => {
    const dashboard = args.dashboard;
    let clearFlag = false;
    console.log(`You have opened the dashboard: ${args.dashboard.title}`);
    dashboard.on('filterschanged', function (dash, args) {
        if(!args.items || args.items.length === 0){
            return;
        }
        console.log('filter changed');
        console.log(args);
        console.log(dash.filters.$$items);
        let elecTrigger = args.items[0].elecTrigger;
        if(elecTrigger){
            console.log('find filter is triggered from localStorage, skip set localStorage');
            return;
        }
        if(clearFlag){
            clearFlag = false;
            return;
        }
        console.log('start to set the filters');
        console.log(dash.filters.$$items);
        localStorage.setItem('filters', JSON.stringify(dash.filters.$$items));
    });

    dashboard.on('initialized', function (a, b) {
        clearFlag = true;
        dashboard.filters.clear();
        setTimeout(function(){
            // dashboard.filters.clear();
            let filters = JSON.parse(localStorage.getItem('filters'));
            if(filters && filters.length > 0){
                console.log('get the filters from localStorage');
                console.log(filters[0].jaql.filter);
                filters[0].elecTrigger = true;
                dashboard.filters.update(filters, { refresh: true, save: true });
                // dashboard.filters.reset(filters);
            }
        }, 0);
        
    });
});

// dashboard.on('initialized', function (a, b) {

//     let filters = JSON.parse(localStorage.getItem('filter'));


//     dashboard.filters.update(filters);
// });
