// ==UserScript==
// @name           scenefz
// @namespace      mezb
// @description    scenefz
// @include        http://*scenefz.net/*
// ==/UserScript==

try {
	var newmsg = document.getElementById("newmsg");
	
	if(newmsg) {
		
		var hide = newmsg.getElementsByTagName("a")[1].getAttribute("onclick");
		location.assign( "javascript:" + hide + "void(0)" );
		
	} else {
		location.assign( "javascript:" + "accepta_reguli();" );
		// unsafeWindow.accepta_reguli();
	}
	
} catch(e) {
		console.log(e.source+" - "+e.message);
}


