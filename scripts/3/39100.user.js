// ==UserScript==
// @name           GLB PM's In Toolbar II (Season 7 fix)
// @namespace      KMHI - Greasemonkey (props to Branden Guess)
// @description    This places the number of PM's you have in the toolbar next to Inbox. Also puts a div popup on the screen to indicate you have messages.
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

// <td colspan="2" class="inbox_messages"><a href="/game/inbox.pl">Inbox</a> (1 new)</td>
// <td colspan="2" class="inbox_empty"><a href="/game/inbox.pl">Inbox</a> (0 new)</td>


/*

  Fixed By chazno for Season 7


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
var response1=inbox.responseText
var newmsg=response1.split('<div id="inbox_button"><div>')
var newmsg1=newmsg[1].split('</div>')
var newmsgfinal=newmsg1[0]
//alert(newmsgfinal);
var msgInt =parseFloat(newmsgfinal);

if(msgInt !=0)
{
var container=getElementsByClassName('toolbar_item',document)[5]
container.innerHTML = container.innerHTML + " (" +newmsgfinal+ ")";
}
}
});