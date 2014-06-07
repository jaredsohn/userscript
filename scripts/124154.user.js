// ==UserScript==
// @name          No Timeouts
// @namespace     academyx.com
// @description   keep session alive on selected web sites
// @include        *
// @include        http://*
// @include        https://*
// @include        file:*
// ==/UserScript==

window.reloadInterval = 120 * 1000; // 2 minutes

window.createRequest = function(){
	var req;
	if(typeof(XMLHttpRequest) != 'undefined') req = new XMLHttpRequest();
	else req = false;

	if(!req) {
		try {
			req = new ActiveXObject("MSXML.XMLHTTP");
		} catch (olderMS) {
			try {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(oops) {
				alert('not able to create');
			}
		}
	}
	return(req)
};

window.showIt = function() {
    if(refresh.readyState == 4) window.status = 'session renewed!';
};

window.getThisPageAgain = function() {
	window.status = 'getting new page...'
	refresh = createRequest();
	refresh.open('GET',window.location.href,true);
	refresh.onreadystatechange = showIt;
	refresh.send(null);
	window.setTimeout(getThisPageAgain,reloadInterval);
};

window.setTimeout(getThisPageAgain,reloadInterval);
