// ==UserScript==
// @name           Hotmail Inbox Direct
// @namespace      http://www.acsv.net
// @description    Forces Hotmail straight to your Inbox, skipping the 'Home' or 'Today' page (Firefox 2 compatible!)
// @include        http://*.hotmail.msn.com/cgi-bin/hmhome*
// ==/UserScript==

function jumptoinbox(){
	//ITERATE THE DOCUMENT LINKS ARRAY TO FIND THE INBOX LINK, JUMPING TO IT UPON POSITIVE MATCH
	var i, temlink = '';
	
	for(i in document.links){
		temlink = document.links[i] + '';

		if((temlink.indexOf('HoTMaiL?curmbox') != -1) && (temlink.indexOf('000000000001') != -1)){
			window.location = temlink;
		}
	}
}

if (document.URL.indexOf('hmhome') != -1){
	//IF THIS IS THE 'Home' OR 'Today' PAGE THEN RUN THE INBOX JUMPING FUNCTION
	jumptoinbox();
}
