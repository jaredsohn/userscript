// ==UserScript==
// @name           mscext
// @namespace      http://monopolycitystreets.com/*
// @description    Monopoly City Street Ext JS
// @include        http://www.monopolycitystreets.com/*
// @include        http://monopolycitystreets.com/*
// @version        0.1
// ==/UserScript==


var mscext = function() {
	var name = TOOLCONFIG.name;
	var version = 'v' + TOOLCONFIG.version;
	var debug = false;

	var dbg = function(message) {
		if (debug) {
			var date = new Date();
			var dstr = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			console.log('mscext (' + dstr + '): ' + message);
		}
	}

	return {
		init: function() {
			dbg('init');			

			// tool dialog
			$('body').append('<div style=\"display: block; left: 300px; top: 28 px; position: absolute; width: 100px; z-index: 2000\" id="mscext"><span>|&nbsp;<a href="#">mscext</a></span></div>');
		},

		dbg: function(message) {
			dbg(message);
		}
	}
}();

$(document).ready(function() {
	mscext.dbg('mscext load.');
	mscext.init();
});
