// ==UserScript==
// @name          Haxorware Chrome
// @namespace     luis
// @description   arregla el resetlog para chrome
// @include       http://192.168.100.1/eventlog.html
// ==/UserScript==

	var arreglarboton = document.evaluate("/@onclick=\"resetlog()\"",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i = 0; i < arreglarboton.snapshotLength; i++) {
	    a = arreglarboton.snapshotItem(i);
	    	a.setAttribute("onclick", "alert(\"Funciono!\")");
	    }
