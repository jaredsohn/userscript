// ==UserScript==
// @name            Raiffeisen.hu Session Force Open
// @author          Daniel Vasarhelyi
// @namespace       http://userscripts.org/users/293336
// @description     Forces raiffeisen.hu kept open - it's default 5 minute idle timeout is rather boring
// @license         Creative Commons Attribution License
// @version	        0.1
// @include         https://direktnet.raiffeisen.hu/rai/direktnet/*
// @compatible      Greasemonkey
// ==/UserScript==
 
(function(){
	setInterval(unsafeWindow.resetCounter,120000);
})();
