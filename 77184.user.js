// ==UserScript==
// @name           QQ Report
// @namespace      info.luosheng.qqreport
// @description    Recover the report function for verified users.
// @include        http://t.qq.com/*
// ==/UserScript==

~(function() {
	
	var getElementsByClassName = function(tagName, className, startElem) {
		startElem = startElem || document;
		var result = [];
		var elems = document.getElementsByTagName(tagName);
		for (var i = 0; i < elems.length; i++) {
			var elem = elems[i];
			if (elem.className === className) {
				result.push(elem);
			}
		}
		return result;
	}
	
	var getUserName = function() {
		var links = getElementsByClassName('a', 'link');
		var path = links[0].pathname;
		return path.substring(1);
	}
	
	var arrTalk = getElementsByClassName('a', 'talk');
	if (arrTalk.length > 0) {
		var wrapper = arrTalk[0].parentNode;
		if (wrapper.innerHTML.indexOf('report') === -1) {
			wrapper.innerHTML += '<a class="report" onclick="jubao_user(\'' + getUserName() + '\');MI.Bos(\'btnReportUser\')" href="javascript:void(0)">举报</a>'
		}
	} 
	
})();