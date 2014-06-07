// ==UserScript==
// @name           BlackDiamond
// @namespace      CSSfile by Didrik Hansen
// @description    Første versjon av BlackDiamond på Nettby å vi fikset at den ikke kræsjer med dine egne profil coder, Men i V1 om du har pimp banner kan den kræsje og med gruppe banner i gruppa, PGA feil i CSSen
// @include        *nettby.no*
// @uso:script     51394
// @version 	   v4.7
// ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://hansen.uuuq.com/BlackDiamond/mohaha.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);


        for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_evening.gif")
        {images[i].src="http://www.google.no/intl/no_no/images/logo.gif";}}
        
        for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_night.gif")
        {images[i].src="http://www.google.no/intl/no_no/images/logo.gif";}}
        
        for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_day.gif")
        {images[i].src="http://www.google.no/intl/no_no/images/logo.gif";}}
        
        for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no/logo_morning.gif")
        {images[i].src="http://www.google.no/intl/no_no/images/logo.gif";}}