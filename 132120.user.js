// ==UserScript==
// @name          Timeouts Intervals Fix
// @namespace     rolosworld.com
// @description   Stop background timeouts or intervals from been processed while the site is not focused
// @include        *
// @include        http://*
// @include        https://*
// @include        file:*
// @run-at document-start
// @version 1.0
// ==/UserScript==

(function() {
    var focused = 1;
    
    var timeouts = [];
    var intervals = [];
   
    var timeo = unsafeWindow.setTimeout;
    var inter = unsafeWindow.setInterval;
    
    var cinter = unsafeWindow.clearInterval;
    
    var intervalObj = function() {
	var data = null;
	var id = null;
	var me = this;
	
	me.getId = function() {
	    return id;
	};
	
	me.setData = function(a) {
	    data = a;
	};
	
	me.start = function() {
	    if (id === null) {
		id = inter.apply(unsafeWindow,data);
		GM_log("setInterval: " + id);
	    }
	};
	
	me.stop = function() {
	    GM_log("clearInterval: " + id);
	    cinter(id);
	    id = null;
	};
    };
    
    function getIntervalById(id) {
	for (var i = 0; i < intervals.length; ++i) {
	    if (intervals[i].getId() == id) {
		return intervals[i];
	    }
	}
    };
    
    function deleteIntervalById(id) {
	var inter = [];
	for (var i = 0; i < intervals.length; ++i) {
	    if (intervals[i].getId() != id) {
		inter.push(intervals[i]);
	    }
	}
	intervals = inter;
    };
    
    unsafeWindow.setTimeout=function(){
	GM_log("setTimeout abducted");
	
	if (focused) {
	    timeo.apply(unsafeWindow,arguments);
	} else {
	    timeouts.push([unsafeWindow,arguments]);
	}
    };
    
    unsafeWindow.clearInterval=function(id){
	GM_log("setInterval stopped");

	var i = getIntervalById(id);
	
	if (i) {
	    i.stop();
	    deleteIntervalById(id);
	}
    };
    
    unsafeWindow.setInterval=function(){
	GM_log("setInterval abducted");
	
	var i = new intervalObj();
	intervals.push(i);
	i.setData(arguments);
	
	if (focused) {
	    i.start();
	} else {
	    i.stop();
	}
    };
    
    unsafeWindow.addEventListener("focus",function() {
	GM_log("onFocus");
	
	focused = 1;
	
	for (var i = 0; i < timeouts.length; ++i) {
	    var t = timeouts[i];
	    timeo.apply(t[0],t[1]);
	}
	timeouts = [];
	
	for (var i = 0; i < intervals.length; ++i) {
	    var t = intervals[i];
	    t.start();
	}
    });
    
    unsafeWindow.addEventListener("blur",function() {
	GM_log("onBlur");
	
	focused = 0;
	
	for (var i = 0; i < intervals.length; ++i) {
	    intervals[i].stop();
	}
    });
}());

