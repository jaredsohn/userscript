// ==UserScript==
// @name           Alerts in Toolbar
// @namespace      cabrasher
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

window.setTimeout( function() 
{


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};


GM_xmlhttpRequest({
method: 'GET',
url: 'http://goallineblitz.com/game/home.pl',
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(inbox) {
var bodySource=inbox.responseText;

var newPM = bodySource.split('<div id="inbox_button"><div>');
var newPM1 = newPM[1].split('</div>');
var numNewPMs = newPM1[0];

var inboxBar = getElementsByClassName('toolbar_item',document)[5];
inboxBar.innerHTML = 'Inbox (' + numNewPMs + ')';

var newAlert = bodySource.split('<div id="alerts_button"><div>');
var newAlert1 = newAlert[1].split('</div>');
var numNewAlerts = newAlert1[0];

var tBar = document.getElementById('toolbar');
var tBar1 = tBar.innerHTML.split('<a href="/game/chat.pl" class="toolbar_item">Chat</a>');
tBar.innerHTML = tBar1[0] + 
	'<a href="inbox.pl?alerts=1.pl" class="toolbar_item">' + 'Alerts (' + numNewAlerts + ')</a>' +
	'<a href="/game/chat.pl" class="toolbar_item">Chat</a>' 
	+ tBar1[1];


}
});


}, 100);