// ==UserScript==
// @name           GLB Messages and Alerts in toolbar
// @namespace      GLB
// @description    Shows messages & alerts in toolbar.
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

/*

Compiled by oldskool, with a lot of help by reading already-made scripts.

Very special thanks to everyone who made "messages/alerts in toolbar" GLB scripts. Without your hard work I never could've pieced this thing together.

*/


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
//Checking for new alerts
var response1=inbox.responseText
var newmsg=response1.split('<div id="alerts_button"><div>')
var newmsg1=newmsg[1].split('</div>')
var newmsgfinal=newmsg1[0]
var msgInt =parseFloat(newmsgfinal);

//Checking for new messages
var response2=inbox.responseText
var newmsg2=response2.split('<div id="inbox_button"><div>')
var newmsg3=newmsg2[1].split('</div>')
var newinboxfinal=newmsg3[0]
var msgInbox =parseFloat(newinboxfinal);

var container=getElementsByClassName('toolbar_item',document)[5]


if(msgInbox >1)
{
container.innerHTML = container.innerHTML + " (" +newinboxfinal+ " new messages)";
}else{
if(msgInbox ==1)
{
container.innerHTML = container.innerHTML + " (" +newinboxfinal+ " new message)";
}else{
if(msgInbox ==0)
{
container.innerHTML = container.innerHTML;
}
}
}
if(msgInt >1)
{
container.innerHTML = container.innerHTML + " (" +msgInt+ " new alerts)";
}else{
if(msgInt ==1)
{
container.innerHTML = container.innerHTML + " (" +newmsgfinal+ " new alert)";
}else{
if(msgInt ==0)
{
container.innerHTML = container.innerHTML;
}
}
}
}
});