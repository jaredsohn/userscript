// ==UserScript==
// @name           Sage Pay Disable Admin Timeout
// @namespace      http://userscripts.org
// @description    Stops Sage Pay Timing Out the Admin Session
// @version        1.0.0
// author          paul3vanz
// @include        https://live.sagepay.com/mysagepay/*
// ==/UserScript==

window.reloadInterval = 120 * 1000; // 2 mins

welcomeText = document.getElementById('welcome');

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
    if(refresh.readyState == 4) welcomeText.innerHTML = '<p>Session renewed!</p>';
};

window.getThisPageAgain = function() {
	unsafeWindow.session.start();
	unsafeWindow.session.restartWithServer();
	welcomeText.innerHTML = '<p>getting new page...</p>';
	refresh = createRequest();
	refresh.open('GET',window.location.href,true);
	refresh.onreadystatechange = showIt;
	refresh.send(null);
	window.setTimeout(getThisPageAgain,reloadInterval);
};

	if (typeof unsafeWindow.session == 'object')
	{
		window.setTimeout(getThisPageAgain,reloadInterval);
	}

// Add notice to show script is enabled
welcomeTextContent = welcomeText.innerHTML;
welcomeText.innerHTML = welcomeTextContent.replace('</p>',' [Sage Pay with Session Extender by Paul Evans]</p>');