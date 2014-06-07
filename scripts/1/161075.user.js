// ==UserScript==
// @name        Backbone-help
// @namespace   backbone-help@backbone-help
// @description Some helper functions for debugging Backbone.js applications. Call functions from Firebug or Web Console.
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

// Helps to catch event handlers. 
// name: name of object string.
// part: name without quotes.
// level: number of levels to look for events.
function eventslog(name,part,level) {
	if (level > 0) {
			for(i in part) {
				if (parseInt(i) || i=='$el' ||i=='el' || i.substring(0,1)=='_') {
					//nothing
				} else {
					if (part[i] && part[i].on) {
						part[i].on('all',function(ev) {console.log(name+' '+ev)})
						console.log(name);
					}
					if (part[i] && part[i].bind) {
						part[i].bind('all',function(ev) {console.log(name+' '+ev)})
						console.log(name);
					}
					if (typeof part == 'object' || typeof part == 'function') {
						eventslog(name+'.'+i, part[i], level-1);
					}
				}
			}
	}/* else {
		console.log('farthest, '+name);
	}*/
}
window.eventslog = eventslog;

// Helps to list views
window.bbv = function(views) {
	var ret = {};
	if (typeof views._views == "object") {
		for (id in views._views) {
			console.log(id);
			ret[id] = views._views[id][0].el;
		}
	} else {
		console.log('not views object.');
	}
	return ret;
}