// ==UserScript==
// @name           hideToday
// @namespace      www.mifan.me
// @include        http://mifan.me/*
// ==/UserScript==

$ = function(id) {
	return document.getElementById(id);
}

GM_addStyle("#qToday { display:none; }");

if (document.evaluate) {
	var tblHeaders = document.evaluate("//body/div/div/ul[2]/li[2]/a/span",
			document, null, XPathResult.ANY_TYPE, null);
	var result = tblHeaders.iterateNext();
	while (result) {
		result.addEventListener('propertychange', recount, false);

		var t = parseInt(result.innerHTML, 10) - 1;
		// alert(t);
		if (t == 0) {
			result.style.display = 'none';
		} else {
			result.innerHTML = t;
		}

		break;
	}
	// 隐藏右侧的每日一问
	var hreflink = document.location.href;
	if (hreflink == 'http://mifan.me/home' || hreflink == 'http://mifan.me/') {
		var todaySub = document.evaluate("//body/div/div[2]/div/div/div",
				document, null, XPathResult.ANY_TYPE, null);
		var result2 = todaySub.iterateNext();
		while (result2 ) {
			if(result2.className.indexOf('q-t-day') > 0){
				result2.style.display = 'none';
				break;
			}
			result2 = todaySub.iterateNext();
		}
	}
}
// 隐藏导航条上的问题提示
function recount(e) {
	var el = e.target;
	var t = parseInt(el.innerHTML, 10) - 1;
	if (t == 0) {
		el.style.display = 'none';
	} else {
		el.innerHTML = t;
	}
}