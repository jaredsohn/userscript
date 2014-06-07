// ==UserScript==
// @name   Google Code proper tabs
// @namespace  Google
// @author  minj
// @description  4-width tabs
// @include   	http://code.google.com/p/*/source/browse*
// @include   	http://code.google.com/p/*/source/detail*
// @include   	http://code.google.com/p/*/source/diff*
// @include   	https://code.google.com/p/*/source/browse*
// @include   	https://code.google.com/p/*/source/detail*
// @include   	https://code.google.com/p/*/source/diff*
// ==/UserScript==

var doRealTabs = function() {
	var tds = document.querySelectorAll('div.diff td');
	for (var i = 0, td; i < tds.length && (td = tds[i]); ++i) {
		for (var j = 0, child; j < td.childNodes.length && (child = td.childNodes[j]); ++j) {
			child.textContent = child.textContent.replace(/\t/g, '    ');
		}
	}
};

var spans = document.querySelectorAll('td#lines span');
for (var i = 0, span; i < spans.length && (span = spans[i]); ++i) {
	if (span.textContent !== '')
		span.textContent = span.textContent.replace(new RegExp(String.fromCharCode(160) + ' ', 'g'),
													String.fromCharCode(160));
}

doRealTabs();

var filesContainer = document.querySelector('tbody#files');
if (filesContainer) {
	window.MO = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var observer = new MO(function() {
		observer.disconnect();
		doRealTabs();
		observer.observe(filesContainer, { childList: true, subtree: true });
	});
	observer.observe(filesContainer, { childList: true, subtree: true });
}
