// ==UserScript==
// @name            CITools JS Alert Disabled
// @namespace       MYKDE
// @include         http://citools.netflix.com/tools/*
// @Created by      Cory Hanson -=MyKDE=-
// @version         0.0.1
// @date            07-14-2010
// ==/UserScript==

unsafeWindow.alert = function alert(message) {
	
		console.log(message);
	
}