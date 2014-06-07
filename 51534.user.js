// ==UserScript==
// @name              OM Chatbox Skin Tester
// @namespace         None
// @author            X
// @description       Epic wins. Thanks to X for permission to use this script.
// @include           http://orbmore.com/orbchat/*


// ==/UserScript==

linky = document.getElementsByTagName("link");
for(var i = linky.length - 1; i >= 0; i++){
	if(linky[i].rel = 'stylesheet'){
	//styley = linky[0];
		linky[i].href = "http://runeorb.downthe.net/orbskin.css";
	}
}