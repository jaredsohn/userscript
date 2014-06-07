// ==UserScript==
// @name			Google Analytics Testing
// @namespace		wakeless
// @version			0.1
// @license         BSD
// @author			Michael Gall
// @description		This uses Firebug console to output any interactions with the Google Analytics server.
// @homepage		http://wakeless.net/archive/2010/04/google-analytics-testing-script
// ==/UserScript==

(function() {
        if(typeof window == "undefined") {
             var window = this;
        }

        if (window['GM_log']) {
		var window = unsafeWindow;
		var console = window.console;
	}
	var intercept = function(tracker) {
		var ob = {};
		
		ob["_trackPageview"] = function(url) {
			console.groupCollapsed("Track Pageview called. URL: ", url);
			console.trace();
			console.groupEnd();
		}
		
		
		ob["_trackEvent"] = function(category, action, opt_label, opt_value) {
			console.groupCollapsed("Track Event called. Category: ",category," Action: ", action, " Label: ", opt_label, " Value: ", opt_value);
			console.trace();
			console.groupEnd();
		}
		
		ob["_addItem"] = function (orderId, sku, name, category, price, quantity) {
			console.groupCollapsed("Add Item called. Order ID: ", orderId);
			console.log("SKU: ", sku);
			console.log("Name: ",name);
			console.log("Category: ", category);
			console.log("Price: ", price);
			console.log("Quantity: ", quantity);
			console.groupCollapsed("Trace");
			console.trace();
			console.groupEnd();
			console.groupEnd();
		}
		
		ob["_addTrans"] = function (orderId, affiliation, total, tax, shipping, city, state, country) {
			console.groupCollapsed("Add Tranaction called. orderId: ", orderId);
			console.log("Affiliation: ", affiliation);
			console.log("Total: ", total);
			console.log("Tax: ", tax);
			console.log("Shipping: ", shipping);
			console.log("City: ", city);
			console.log("State: ", state);
			console.log("Country: ", country);
			console.groupCollapsed("Trace");
			console.trace();
			console.groupEnd();
			console.groupEnd();
		}
		
		ob['_setCustomVar'] = function(index, name, value, opt_scope) {
			var levels = ["Visitor", "Session", "Page"];
			console.groupCollapsed("%s Custom Variable Set. Index: %s Name: %s Value: %o ", levels[opt_scope-1], index, name, value);
			console.trace();
			console.groupEnd();
		}
		
		for(i in ob) {
			(function() {
				var thisFunc = ob[i];
				var oldFunc = tracker[i];
				tracker[i] = function() {
					try {
						thisFunc.apply(ob, arguments);
					} catch(e) {}
					return oldFunc.apply(tracker, arguments);
				}
			})();
		}
	}

	var getCustomVar = function(tracker) {
		for(var i=1; i<=5; i++) {
			var customVar = tracker._getVisitorCustomVar(i);
			if(customVar) {
				console.log("Visitor Custom Variable Slot: %s = %o", i, customVar);
			}
		}
	}
	
	var monitor = function() {
		if(window['pageTracker']) {
			var id = window.pageTracker.s;
			console.groupCollapsed("Synchronous Analytics loaded: %s", id);
			getCustomVar(window.pageTracker);
			console.groupEnd();
			intercept(window.pageTracker);
		} else if(window['_gaq']) {
			var id = window._gaq._getAsyncTracker().s;
			console.groupCollapsed("Asynchronous Analytics loaded: ", id);
			getCustomVar(window._gaq._getAsyncTracker());
			console.groupEnd();
			intercept(window._gaq._getAsyncTracker());
		} else {
			setTimeout(monitor, 1000);
		}
	};
	monitor();	
})();