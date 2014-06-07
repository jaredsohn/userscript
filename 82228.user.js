// ==UserScript==
// @name           AutoPager-CR
// @namespace      VIP
// @description    Content replacment addon (companion) for AutoPager & AutoPager Lite
// @include        *
// @version        1.0.2
// ==/UserScript==

// use AddReplacementXPath() function in any script to set content replacment from given xpath
// example:
//     unsafeWindow.AddReplacementXPath('//div[@id="paginator"]');


(function(){
	if (unsafeWindow.AddReplacementXPath) return;
	
	const MESID = 'apcr-html';
	var path = [];
	var cont = [];
	
	unsafeWindow.AddReplacementXPath = function(xpath) {path.push(xpath);}
	
	
	function $xcont(i) {return document.evaluate(path[i], document, null, 8, null).singleNodeValue;}
	
	// runs in newly loaded page
	function before(event) {
		if (!arguments.callee.called) {  // do job only once per page
			arguments.callee.called = 1; //
			
			var target = event.target.wrappedJSObject, elem;
			
			for (var i = 0; i < path.length; i++) {
				elem = $xcont(i);
				if (elem) target.setAttribute(MESID+i, elem.innerHTML); // send content data within target object
			}
		}
	}
	
	function after(event) {
		var html, target = event.target.wrappedJSObject;
		for (var i = 0; html = target.getAttribute(MESID+i); i++) {
			target.removeAttribute(MESID+i);
			if (!cont[i]) cont[i] = $xcont(i); // search each container once
			if (cont[i]) cont[i].innerHTML = html;
		}
	}
	
	window.addEventListener('AutoPagerBeforeInsert', before, false);
	window.addEventListener('AutoPagerAfterInsert',  after,  false);
})()