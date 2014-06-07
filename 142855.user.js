// ==UserScript==
// @name        LoU City Sort
// @description Sorts your cities by their reference
// @namespace   d1
// @author      Disparity
// @include     http://prodgame*.lordofultima.com/*/index.aspx*
// @version     1.0.2
// @run-at      document-end
// ==/UserScript==

// injector
(function(script) {
	var domScript = document.createElement("script");
	domScript.innerHTML = "(" + script.toString() + ")();";
	domScript.type = "text/javascript";
	if (/lordofultima\.com/i.test(document.domain)) {
		document.getElementsByTagName("head")[0].appendChild(domScript);
	}
})(function() {
	// City sorter
	var script = function(webfrontend) {
		webfrontend.gui.SelCities.prototype.getSortedPlayerCities = function() {
			var ck = [], cm = webfrontend.data.Player.getInstance().cities;
			for(var cl in cm) {
				ck.push({iId: cl, city: cm[cl], sName: cm[cl].name, reference: cm[cl].reference});
			}
			return ck.sort(function(a, b) {
				if(a.reference.toUpperCase() != b.reference.toUpperCase()){
					return a.reference.toUpperCase() < b.reference.toUpperCase() ? -1 : 1;
				}
				return a.id < b.id ? -1 : 1;
			});
		};
		webfrontend.gui.TradeMinisterOptionsPage.prototype._sortArrayByName = function(a, b) {
			if (a.cityRef == undefined || b.cityRef == undefined || a.cityRef.toUpperCase() == b.cityRef.toUpperCase()) {
				return 0;
			}
			return a.cityRef.toUpperCase() < b.cityRef.toUpperCase() ? -1 : 1;
		};
	};

	// loader
	(function() {
		var logger = console && console.log || window.opera && window.opera.postError || GM_log || function() {};
		try {
			if (typeof qx != 'undefined') {
				var a = qx.core.Init.getApplication();
				if (a && window.webfrontend && window.webfrontend.gui && window.webfrontend.gui.SelCities && window.webfrontend.gui.TradeMinisterOptionsPage) {
					script.call(window, window.webfrontend);
					return;
				}
			}
			window.setTimeout(arguments.callee, 1000);
		} catch (e) {
			logger(e);
		}
	})();
});
