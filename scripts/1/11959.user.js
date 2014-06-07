// ==UserScript==
// @name        Tiny alert() Hack for infinite loop
// @description This script enables to cancel the script as showing alert.
// @namespace   http://lowreal.net/
// @include     http://*
// ==/UserScript==


var alert = unsafeWindow.alert;
unsafeWindow.alert = function (msg) {
	if (!confirm(msg + "\n Ok to continue, Cancel to break script.")) {
		throw 'Stopped alert';
	}
};
