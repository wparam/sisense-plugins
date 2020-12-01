
prism.on('dashboardloaded', (event, args) => {
    console.log(`--------------------${args.dashboard.title}--------------------------`);
    const dashboard = args.dashboard;
    let clearFlag = false;
    dashboard.on('filterschanged', function (dash, args) {
        console.log('++++++++++start filter changed++++++++++++++++++++++');
        if(clearFlag){
            console.log(`clearFlag is ${clearFlag}`);
            clearFlag = false;
            return;
        }
        if(args.items.elecTrigger || args.items && args.items.length > 0 && args.items[0].elecTrigger){
            console.log('find filter is triggered from localStorage, skip set localStorage');
            return;
        }
        console.log('start to set the filters');
        console.log(dash.filters.$$items);
        localStorage.setItem('filters', JSON.stringify(dash.filters.$$items));
    });

    dashboard.on('initialized', function (dash, args) {
        console.log('--------------------start initialized----------------------------');
        if(dash.filters.$$items && dash.filters.$$items.length > 0){
            clearFlag = true;
            dashboard.filters.clear();
        }   
        setTimeout(function(){
            // dashboard.filters.clear();
            let filters = JSON.parse(localStorage.getItem('filters'));
            console.log('get the filters from localStorage');
            console.log(filters);
            if(filters && filters.length > 0){
                filters[0].elecTrigger = true;
            }else{
                filters.elecTrigger = true;
            }
            dashboard.filters.update(filters, { refresh: true, save: true });
            // dashboard.filters.reset(filters);
        }, 0);
        
    });
});
