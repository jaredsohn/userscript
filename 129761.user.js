// ==UserScript==
// @name           aprilfool
// @namespace      wwww.dolpen.net
// @description    aprilfool
// @include        *
// ==/UserScript==

(function(){
var tgt = new Date(2012, 4, 1, 0, 0, 0);
var fn = function(){
	if((new Date()).getTime() >=tgt.getTime()){
		location.reload();
	} else {
		setTimeout(fn,1000);
	}
};
if((new Date()).getTime() <= tgt.getTime())fn();
})();