// ==UserScript==
// @name           Facebook Https 
// @namespace      facebook.com
// @include        *
// ==/UserScript==

function process()
{
	var xpath, targets;
	var regExp;
	
	xpath='//a[contains(@href, "facebook.com")]';
	//xpath='//a[matches(@href, "^http:\/\/(\S*)\.facebook\.com")]';
	regExp = /^http:\/\/(\S*)\.facebook\.com/ig;
	
	targets = document.evaluate(xpath, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i<targets.snapshotLength; i++) {
		var target = targets.snapshotItem(i);
		if (!regExp.test(target.href)) continue;
		if (target.href == "http://www.facebook.com/") { 
			target.href="http://www.facebook.com/home.php";
		}
		target.href = target.href.replace(/^http:/,"https:");
	}

	xpath = '//form[contains(@action,"facebook.com")]';
	//xpath='//a[matches(@href, "^http:\/\/(\S*)\.facebook\.com")]';
	regExp = /^http:\/\/(\S*)\.facebook\.com/ig;
	
	targets = document.evaluate(xpath, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i<targets.snapshotLength; i++) {
		var target = targets.snapshotItem(i);
		if (!regExp.test(target.action)) continue;
		target.action = target.action.replace(/^http:/,"https:");
	}

	//xpath='//img[matches(@src, "^https:\/\/secure-profile\.facebook\.com")]';
	xpath='//img[contains(@src, "secure-profile.facebook.com")]';
	regExp = /^https:\/\/secure-profile\.facebook\.com/ig;
	
	targets = document.evaluate(xpath, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i<targets.snapshotLength; i++)
	{
		var target = targets.snapshotItem(i);
		if (!regExp.test(target.src)) continue;
		target.src = target.src.replace(regExp,"http://profile.ak.fbcdn.net");
	}

	xpath='//img[contains(@src, "s-static.facebook.com")]';
	regExp = /^https:\/\/s-static\.facebook\.com/ig;
	
	targets = document.evaluate(xpath, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i<targets.snapshotLength; i++)
	{
		var target = targets.snapshotItem(i);
		if (!regExp.test(target.src)) continue;
		target.src = target.src.replace(regExp,"http://static.ak.fbcdn.net");
	}
}

function final_process()
{
	window.clearInterval(timer);
	process();
}

var timer = window.setInterval(process, 500);

window.addEventListener("load", final_process, false);
