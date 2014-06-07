// ==UserScript==
// @name              RSZ Chatbox Rectifier V1.2
// @namespace         None
// @author            X
// @description       Epic wins.
// @include           http://runescapez.com/chatbox/*


// ==/UserScript==

linky = document.getElementsByTagName("link");
for(var i = linky.length - 1; i >= 0; i++){
	if(linky[i].rel = 'stylesheet'){
	//styley = linky[0];
		linky[i].href = "http://x.leetmuffin.com/coolcss.css";
	}
}