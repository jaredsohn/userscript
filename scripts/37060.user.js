// ==UserScript==
// @name           mods.de hider
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @description    blendet posts bestimmter user aus
// @include        http://forum.mods.de/bb/thread.php*
// ==/UserScript==

var hider = {
	names: ["Pling", "Circle of the Elite"],
	init: function() {
		this.xpr(this.names).forEach(function(t) {
			t.style.display = t.nextSibling.nextSibling.style.display = "none";
		});
	},
	$x: function(p, context) {
		if (!context) context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, 6, null);
		for (i=0; item=xpr.snapshotItem(i); i++) arr.push(item);
		return arr;
	},
	xpr: function(e) {
		var expr = "//tr[", i;
		for (i=0; i<e.length; i++) expr += "@username='" + escape(e[i]) + "' or ";
		return this.$x(expr.replace(/\s*or\s*$/, "") + "]");
	}
}
hider.init();