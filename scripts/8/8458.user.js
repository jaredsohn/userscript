// ==UserScript==
// @name          del.icio.us mp3 player for dogpile.com
// @namespace     
// @description   add del.icio.us mp3 player to links on dogpile.com
// @include       http://dogpile.com/*
// @include       http://www.dogpile.com/*
// ==/UserScript==

	var links,strinValue,oldUrl;
	links = document.getElementsByTagName('a');
	for(i=0;i<links.length;i++) {
	 stringValue = String(links[i]);
		if(stringValue.substr(0,33)=="http://www.dogpile.com/info.dogpl" && stringValue.search(".mp3")!="-1") {
		 begin = stringValue.search("rawto=")+6;
		 	links[i].href=stringValue.substr(begin);
		}
	}
	
    var head,script
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    
    for (var count = 0; count < document.getElementsByTagName('script').length; count++) {
		if (document.getElementsByTagName('script')[count].src == "http://del.icio.us/js/playtagger") {return;}
	} 

    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://del.icio.us/js/playtagger'
    head.appendChild(script);