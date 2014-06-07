// ==UserScript==
// @name           Ikariam Refresh
// @namespace      http://userscripts.org/scripts/show/68447
// @description    Goes through all Ikariam buildings so as to refresh any tools that use IkaTools
// @author         AubergineAnodyne
// @include        http://*.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/88158.user.js
// @require        http://userscripts.org/scripts/source/94662.user.js
//
// @version 1.07
//
// @history 1.07 Corrected so the refresh buttons show up over the new gameforge bar.
// @history 1.06 Updated to no longer use PhasmaExMachina scripts (because of delete-city hack done to his/her scripts).
// @history 1.05 Improved use of IkaTools for performance.
// @history 1.04 Removed use of Greasemonkey window.  Refresh is not activated by clicking on the refresh icon in the very top left of the screen.  Also added command to stop an active refresh.
// @history 1.03 Added a quick town refresh menu item.  Visits town overviews so you pick up new building levels, but doesn't visit all of the individual buildings.
// @history 1.02 Added a randomized delay component on page changes.
// @history	1.01 Added automatic script update check.  Added refresh military only options.  Reduced time on each page to 2s.
// @history	1.00 Initial release
// ==/UserScript==

ScriptUpdater.check(68447, '1.07');

function debug(message) {
    if (unsafeWindow.console) {
        if (typeof(message) == 'string') {
            unsafeWindow.console.log("IKRefresh: " + message);
        } else {
            unsafeWindow.console.log(message);
        }
    }
}

function curry(f) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return f.apply(this, args.concat([].slice.call(arguments, 0)));
  };
}
  
function curry_scope(f, scope) {
  var args = [].slice.call(arguments, 2);
  return function () {
    return f.apply(scope, args.concat([].slice.call(arguments, 0)));
  };
}

IkariamRefreshTask = function(task) {
    this.task = task;
    this.node = $('<div class="IkariamRefreshTask_Task">' + this.task.label + '</div>');
    if (task.completed) {
        this.node.addClass('IkariamRefreshTask_Completed');
    }
}

IkariamRefreshTask.prototype.startedProcessing = function() {
    return (!!this.task.completed) || (!!this.processing);
}

IkariamRefreshTask.prototype.startProcessing = function() {
    this.processing = true;
    this.node.addClass('IkariamRefreshTask_Processing');
}

IkariamRefreshTask.prototype.markCompleted = function() {
    this.task.completed = true;
}

IkariamRefreshTask.prototype.showCompletion = function() {
    this.node.addClass('IkariamRefreshTask_Completed');
}

IkariamRefreshTask.prototype.isCompleted = function() {
    return this.task.completed;
}

IkariamRefresh = function() {
    this.taskHandlers = {
        'initialTask': curry_scope(this.initialTask, this),
        'initialTask_QuickTownRefresh': curry_scope(this.initialTask_QuickTownRefresh, this),
        'initialTask_SelfMilitaryOnly': curry_scope(this.initialTask_SelfMilitaryOnly, this),
        'initialTask_AllMilitaryOnly': curry_scope(this.initialTask_AllMilitaryOnly, this),
        'goToCity': curry_scope(this.goToCity, this),
        'visitCity': curry_scope(this.visitCity, this),
        'goToBuilding': curry_scope(this.goToBuilding, this),
        'goToUrl': curry_scope(this.goToUrl, this),
    };
}

IkariamRefresh.prototype.registerStyles = function() {
    GM_addStyle('.IkariamRefreshTask_Task {} ' + 
                '.IkariamRefreshTask_Completed { color: green; font-weight: bold; } ' +
                '.IkariamRefreshTask_Processing { font-weight: bold; } ' +
                '#IkariamRefresh_Display { position: absolute; left: 10px; top: 150px; background-color: #FEE8C8; z-index: 4000; padding: 3px; border: 1px solid #9D836A; text-align: left; } ' +
                '#IkariamRefresh_MenuCommands { display: none; position: absolute; top: 16px; left: 0px; background-color: #FEE8C8; z-index: 4000; padding: 3px; border: 1px solid #9D836A; text-align: left; } ' +
                '#IkariamRefresh_InitialDisplay { position: absolute; top: 0px; left: 0px; z-index: 4000; )');
 }

IkariamRefresh.prototype.startRefresh = function() {
    this.queue = [];
    this.enqueueTop({
        type: 'initialTask',
        label: 'Initialization',
    });
    this.processQueue();
};

IkariamRefresh.prototype.startRefresh_QuickTownRefresh = function() {
    this.queue = [];
    this.enqueueTop({
        type: 'initialTask_QuickTownRefresh',
        label: 'Initialization',
    });
    this.processQueue();
};

IkariamRefresh.prototype.startRefresh_SelfMilitaryOnly = function() {
    this.queue = [];
    this.enqueueTop({
        type: 'initialTask_SelfMilitaryOnly',
        label: 'Initialization (Self Military Only)',
    });
    this.processQueue();
};

IkariamRefresh.prototype.startRefresh_AllMilitaryOnly = function() {
    this.queue = [];
    this.enqueueTop({
        type: 'initialTask_AllMilitaryOnly',
        label: 'Initialization (Military Only)',
    });
    this.processQueue();
};

IkariamRefresh.prototype.clearQueue = function() {
    this.queue = [];
    this.saveQueue();
}

IkariamRefresh.prototype.loadQueue = function() {
    var queue = IkaTools.getVal("IkariamRefreshQueue", true) || [];
    this.queue = [];
    for (var i = 0; i < queue.length; i++) {
        this.queue.push(new IkariamRefreshTask(queue[i]));
    }
};

IkariamRefresh.prototype.saveQueue = function() {
    var queue = [];
    for (var i = 0; i < this.queue.length; i++) {
        queue.push(this.queue[i].task);
    }
//    debug('Saving queue of ' + queue.length + ' elements');
    IkaTools.setVal("IkariamRefreshQueue", queue, true);
};

IkariamRefresh.prototype.processQueue = function(loadIkaTools) {
    if (this.processTopTask()) {
	if (loadIkaTools) {
            IkaTools.init({ trackData: {construction: false, resource: false} });
	}
        this.displayTasks();
        return true;
    }
    return false;
};

IkariamRefresh.prototype.processTopTask = function() {
    for (var i = 0; i < this.queue.length; i++) {
        var item = this.queue[i];
//        debug("startedProcessing: " + item.startedProcessing());
        if (!item.startedProcessing()) {
            item.startProcessing();
//            debug('Processing task: ' + item.task.type + ': ' + item.task.label);
            this.taskHandlers[item.task.type](item);
            item.markCompleted();
            this.saveQueue();
            return true;
        }
    }
    return false;
}

IkariamRefresh.prototype.displayTasks = function() {
    var display = $('<div id="IkariamRefresh_Display"></div>');
    for (var i = 0; i < this.queue.length; i++) {
        var item = this.queue[i];
//        debug(item.task.label);
        display.append(item.node);
    }
    $('body').append(display);
};

IkariamRefresh.prototype.enqueueTop = function(task) {
    for (var i = 0; i < this.queue.length; i++) {
        if (!this.queue[i].startedProcessing()) {
            this.queue.splice(i, 0, new IkariamRefreshTask(task));
            this.saveQueue();
            return;
        }
    }
    this.enqueue(task);
};

IkariamRefresh.prototype.enqueue = function(task) {
    this.queue.push(new IkariamRefreshTask(task));
    this.saveQueue();
};

IkariamRefresh.prototype.scheduleUrl = function(item, url, cityId) {
    var delay = IkaTools.getVal('IkariamRefresh-PageWait', 2000);
    IkaTools.setVal('IkariamRefresh-PageWait', item.task.onPage ? item.task.onPage : 0);
    delay = (delay || 1500) + Math.random() * 2000;
    debug('Scheduling next page in ' + delay);
    window.setTimeout(curry(this.doGoToUrl, url, cityId), delay);
};

IkariamRefresh.prototype.doGoToUrl = function(url, cityId) {
	document.body.style.cursor = "wait";
	var loc = url.match(/^\//) ? 'http://' + IkaTools.getDomain() + url : url;
	if(cityId && cityId != IkaTools.getCurrentCityId()) {
		var postdata = [];
		var elems = document.getElementById('changeCityForm').getElementsByTagName('fieldset')[0].getElementsByTagName('input');
		for(var i = 0; i < elems.length; i++) {
			postdata.push(elems[i].name + "=" + elems[i].value);
		}
		postdata.push('cityId=' + cityId);
		
		postdata = postdata.join('&');
//		debug("postdata: " + postdata);
		
	    IkaTools.getRemoteDocument('http://' + location.host + '/index.php', 
	        function() { unsafeWindow.document.location = loc; }, 
	        'POST', postdata);
	} else {
		unsafeWindow.document.location = loc;
	}
}

IkariamRefresh.prototype.initialTask = function(item) {
    IkaTools.init({ trackData: {construction: false, resource: false} });
    var cities = IkaTools.getCities();
    this.enqueue({
        type: 'goToUrl', 
        url: '/index.php?view=merchantNavy',
        label: 'Visit active transports'
    });
    this.enqueue({
        type: 'goToUrl',
        url: '/index.php?view=finances',
        label: 'Visit finances'
    });
    this.enqueue({
        type: 'goToUrl',
        url: '/index.php?view=militaryAdvisorMilitaryMovements',
        label: 'Visit military movements'
    });
    this.enqueue({
        type: 'goToUrl',
        url: '/index.php?view=militaryAdvisorCombatReports',
        // Some scripts (e.g. Ikariam Farm List) can spend a long time 
        // processing on this page.
        onPage: 10000,
        label: 'Visit combat reports'
    });
    
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        if (IkaTools.cityIsOwn(city)) {
            this.enqueue({
                type: 'goToCity',
                cityId: city.id,
                cityName: city.name,
                label: 'Go to city: ' + city.name,
            });
            this.enqueue({
                type: 'goToUrl',
                url: '/index.php?view=cityMilitary-army&id=' + city.id,
                cityId: city.id,
                label: 'Inspect army garrison in ' + city.name
            });
            this.enqueue({
                type: 'goToUrl',
                url: '/index.php?view=cityMilitary-fleet&id=' + city.id,
                cityId: city.id,
                label: 'Inspect fleet garrison in ' + city.name
            });
        }
    }
    item.showCompletion();
    this.processTopTask();
}

IkariamRefresh.prototype.initialTask_QuickTownRefresh = function(item) {
    IkaTools.init({ trackData: {construction: false, resource: false} });
    var cities = IkaTools.getCities();
    
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        if (IkaTools.cityIsOwn(city)) {
            this.enqueue({
                type: 'goToUrl',
                url: '/index.php?view=city&id=' + city.id,
                cityId: city.id,
                label: 'Go to city: ' + city.name,
            });
        }
    }
    item.showCompletion();
    this.processTopTask();
}

IkariamRefresh.prototype.initialTask_SelfMilitaryOnly = function(item) {
    IkaTools.init({ trackData: {construction: false, resource: false} });
    var cities = IkaTools.getCities();
    this.enqueue({
        type: 'goToUrl',
        url: '/index.php?view=finances',
        label: 'Visit finances'
    });
    this.enqueue({
        type: 'goToUrl',
        url: '/index.php?view=militaryAdvisorMilitaryMovements',
        label: 'Visit military movements'
    });
    this.enqueue({
        type: 'goToUrl',
        url: '/index.php?view=militaryAdvisorCombatReports',
        // Some scripts (e.g. Ikariam Farm List) can spend a long time 
        // processing on this page.
        onPage: 10000,
        label: 'Visit combat reports'
    });
    
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        if (IkaTools.cityIsOwn(city)) {
            this.enqueue({
                type: 'goToUrl',
                url: '/index.php?view=cityMilitary-army&id=' + city.id,
                cityId: city.id,
                label: 'Inspect army garrison in ' + city.name
            });
            this.enqueue({
                type: 'goToUrl',
                url: '/index.php?view=cityMilitary-fleet&id=' + city.id,
                cityId: city.id,
                label: 'Inspect fleet garrison in ' + city.name
            });
        }
    }
    item.showCompletion();
    this.processTopTask();
}

IkariamRefresh.prototype.initialTask_AllMilitaryOnly = function(item) {
    IkaTools.init({ trackData: {construction: false, resource: false} });
    var cities = IkaTools.getCities();
    this.enqueue({
        type: 'goToUrl',
        url: '/index.php?view=finances',
        label: 'Visit finances'
    });
    this.enqueue({
        type: 'goToUrl',
        url: '/index.php?view=militaryAdvisorMilitaryMovements',
        label: 'Visit military movements'
    });
    this.enqueue({
        type: 'goToUrl',
        url: '/index.php?view=militaryAdvisorCombatReports',
        // Some scripts (e.g. Ikariam Farm List) can spend a long time 
        // processing on this page.
        onPage: 10000,
        label: 'Visit combat reports'
    });
    
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        if (IkaTools.cityIsOwn(city)) {
            this.enqueue({
                type: 'goToUrl',
                url: '/index.php?view=cityMilitary-army&id=' + city.id,
                cityId: city.id,
                label: 'Inspect army garrison in ' + city.name
            });
            this.enqueue({
                type: 'goToUrl',
                url: '/index.php?view=cityMilitary-fleet&id=' + city.id,
                cityId: city.id,
                label: 'Inspect fleet garrison in ' + city.name
            });
        } else {
            this.enqueue({
                type: 'goToUrl',
                url: '/index.php?view=relatedCities&id=' + city.id,
                cityId: city.id,
                label: 'Inspect garrison in ' + city.name
            });
        }
    }
    item.showCompletion();
    this.processTopTask();
}

IkariamRefresh.prototype.goToUrl = function(item) {
    this.scheduleUrl(item, item.task.url, item.task.cityId);
}

IkariamRefresh.prototype.goToCity = function(item) {
    this.enqueueTop({
        type: 'visitCity', 
        cityId: item.task.cityId, 
        cityName: item.task.cityName,
        label: 'Process city view: ' + item.task.cityName
    });
    this.scheduleUrl(item, '/index.php?view=city&id=' + item.task.cityId, item.task.cityId);
};


IkariamRefresh.prototype.visitCity = function(item) {
    var city = IkaTools.getCityById(item.task.cityId);
    for (var position = 0; position <= 14; position++) {
        var building = IkaTools.cityGetBuildingByPosition(position, city);
        if (building) {
            this.enqueue({
                type: 'goToBuilding',
                cityId: building.cityId,
                position: position,
                buildingName: building.name,
                buildingType: building.type,
                buildingLevel: building.level,
                label: 'Visit ' + building.name + ' (' + building.level + ') in ' + city.name,
            });
        }
    }
    item.showCompletion();
    this.processTopTask();
};

IkariamRefresh.prototype.goToBuilding = function(item) {
    this.scheduleUrl(item, '/index.php?view=' + item.task.buildingType + '&id=' + item.task.cityId + '&position=' + item.task.position, item.task.cityId);
};

IkariamRefresh.prototype.registerMenuCommands = function(isActive) {
    if (isActive) {
        var display = $('<div id="IkariamRefresh_MenuCommands">'
                        +'<div id="IkariamRefresh_MenuCommand_StopRefresh"><a href="#">Stop refresh</a></div>');
        $('body').append(display);
        $('#IkariamRefresh_MenuCommand_StopRefresh').click(curry_scope(this.clearQueue, this));
        display.show();
    } else {
        var display = $('<div id="IkariamRefresh_MenuCommands">'
                        +'<div id="IkariamRefresh_MenuCommand_Building_OwnMilitary"><a href="#">Refresh buildings/own military</a></div>'
                        +'<div id="IkariamRefresh_MenuCommand_QuickRefreshBuildings"><a href="#">Quick refresh buildings</a></div>'
                        +'<div id="IkariamRefresh_MenuCommand_RefreshOwnCitiesMilitary"><a href="#">Refresh own cities military</a></div>'
                        +'<div id="IkariamRefresh_MenuCommand_RefreshAllCitiesMilitary"><a href="#">Refresh all cities military</a></div>');
        $('body').append(display);
        
        $('#IkariamRefresh_MenuCommand_Building_OwnMilitary').click(curry_scope(this.startRefresh, this));
        $('#IkariamRefresh_MenuCommand_QuickRefreshBuildings').click(curry_scope(this.startRefresh_QuickTownRefresh, this));
        $('#IkariamRefresh_MenuCommand_RefreshOwnCitiesMilitary').click(curry_scope(this.startRefresh_SelfMilitaryOnly, this));
        $('#IkariamRefresh_MenuCommand_RefreshAllCitiesMilitary').click(curry_scope(this.startRefresh_AllMilitaryOnly, this));
        var initialDisplay = $('<div id="IkariamRefresh_InitialDisplay"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGMSURBVDjLY/j//z8DJZiggtx9Sasyd8Yxk21Axo7YSymbow4QZUDJ8QyHoiNpB/IPJP/P3pPwP3177P+mQ5X/6/aV/o9cFrATrwHFxzIcCg+nnplzacr/TbdW/19/c8X/tTeW/l91bdH/5Vfn/y/ZkvPfb7rbHZwGFBxKnTn9fN//jTdX/W8+XPU/cX34/5iVQf8rtuf/L9mc/d9nqutuvC7I2Zv4AOjf/0D//o9fG3YIJh4wy+OS9xTnQ2699kyO7VacRAUi0L/wUPea5LTGtceW9FgA+ncNyekgfJEfZ9AcTyagfw+59ztcgolbVBsdMi7V/a+Xr/lfK0v1AV4XAP27O2tl0v/UJbH/rRtM/5tVGf6PmB74v/dE0//khdH/VVMUZ+I0AOjflxnLE/5PP9v7f8rprv8TT7X/7zvZ8r/nRON/kLhKssIZxXhZB7wusGu22Bk3N+x/1Mzg//qFWv+1s9X+q6cp/1dOUjigEIeqGWcgAv17AOjfS2RnJt08DWbNTNVVVMmNhDAANau2t3wToKQAAAAASUVORK5CYII%3D" style="cursor:pointer;" title="Show Ikariam Refresh Options"></div>');
        $('body').append(initialDisplay);
        $('#IkariamRefresh_InitialDisplay').click(function() { $('#IkariamRefresh_MenuCommands').show()});
    }
};

//IkaTools.init({ trackData: {construction: false, resource: false} });

var refresh = new IkariamRefresh();
refresh.registerStyles();
refresh.loadQueue();
var active = refresh.processQueue(true);
refresh.registerMenuCommands(active);
