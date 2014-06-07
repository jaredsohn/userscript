// ==UserScript==
// @name           o2x snel edit
// @namespace      one2xs
// @include        http://*.one2xs.com/*
// ==/UserScript==



(function() {
	
	var voorzetsel = 'http://www.one2xs.com/forum/bewerk?id=';
	var a, thisA;
	a = document.evaluate(
    '//a',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	for (var i = 0; i < a.snapshotLength; i++){
		thisA = a.snapshotItem(i);
		if(thisA.href.slice(0,38) == voorzetsel){
			var id = thisA.href.substr(38);
			thisA.href = 'javascript:editpost1('+id+');';
		}
	}
	
})();