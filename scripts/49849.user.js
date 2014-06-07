// ==UserScript==
// @name           Experiment
// @namespace      
// @description    
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

// <td colspan="2" class="outbox_messages"><a href="/game/outbox.pl">outbox</a> (1 new)</td>
// <td colspan="2" class="outbox_empty"><a href="/game/outbox.pl">outbox</a> (0 new)</td>


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
var response1=outbox.responseText
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