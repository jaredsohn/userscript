// ==UserScript==

// @name           Alerts in Toolbar

// @namespace      GLB

// @description    Places the number of Alerts you have in the toolbar at the top of the page.

// @include        http://goallineblitz.com/game/*

// ==/UserScript==


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
var response1=inbox.responseText
var newmsg=response1.split('<td colspan="2" class="inbox_messages"><a href="/game/inbox.pl?alerts=1">Alerts</a>')
var newmsg1=newmsg[1].split('</td>')
var newmsgfinal=newmsg1[0]
var container=getElementsByClassName('toolbar_item',document)[5]
container.innerHTML = container.innerHTML + ' Alerts: ' + newmsgfinal 
}
});