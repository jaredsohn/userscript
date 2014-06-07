// ==UserScript==
// @name          VeloNSK user's banlist
// @description   Totaly hides the messages from selected users
// @include       *velo.nsk.ru*
// ==/UserScript==

(function() {

var BannedList = GM_getValue('ignore_users');
var separator=',';

GM_registerMenuCommand("Change list of banned bikers", function() {
    var newBannedList = prompt("Enter the list of users to be banned, '"+separator+"'-separated", BannedList);
	
	if (newBannedList == BannedList )
	   return;
	
	if (newBannedList === "" || newBannedList === null) {
		alert("You've cleared the banlist. Everybody's messages will be shown");
	}

	GM_setValue('ignore_users',newBannedList);
	BannedList = newBannedList;
	alert("Success! Refresh page to see the changes.");
});

if ( BannedList.length!=0 )
{
    var ignore_users = BannedList.split(separator);
	var bez = " (без " + ignore_users.join(', ') + ")";
	var reg = "(" + ignore_users.join('|') + ")";
	var regexup=new RegExp('^<a href=(.*?)>(.*?)</a>(.*?)<span class=(.*?)>'+reg+'</span>(.*?)','i');
	var regexdown=new RegExp('<div class="hdr">(.*?)<a class="fmfr" href=(.*?)>'+reg+'</a>(.*?)','i');

    // clean up the upper frame (tree of headers)
	litags = document.getElementsByTagName('li');
	for (i=0; i<litags.length; ++i)
		if (regexup.exec (litags[i].innerHTML))
			litags[i].style.display='none';
	
	// clean up the lower frame (the message)
	msgs = document.getElementsByClassName('mss');
	for (i=0; i<msgs.length; ++i)
    	if (regexdown.exec (msgs[i].innerHTML))
			msgs[i].style.display='none';
	
	// add the list of banned users to the name of the thread
	divs = document.getElementsByClassName('flhc');
	for (i=0; i<divs.length; ++i)
    	divs[i].innerHTML = divs[i].innerHTML + bez;
}

})();

