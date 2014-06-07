// ==UserScript==
// @name           Cash To HomePage
// @namespace      Branden Guess
// @description    Adds players' cash to your home page
// @include        http://goallineblitz.com/game/home.pl
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


GM_xmlhttpRequest({    method: 'GET',    url: 'http://goallineblitz.com/game/player.pl?player_id=432283',    headers: {        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',        'Accept': 'application/atom+xml,application/xml,text/xml',    },    onload: function(cash) {
var response1=cash.responseText
var cash=response1.split('<td class="stat_head">');
var cash1=cash[18].split('<td class="stat_value">');
var cash2=cash1[1].split('</td>');
var container=document.getElementById('content')
var playerbox=getElementsByClassName('player_vitals',document)
playerbox[0].innerHTML = playerbox[0].innerHTML + 
"<tr><td class='player_vital_head'>Cash:</td><td>" + cash2[0] + "</td>" +
"</tr>"
}
});

GM_xmlhttpRequest({    method: 'GET',    url: 'http://goallineblitz.com/game/player.pl?player_id=441955',    headers: {        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',        'Accept': 'application/atom+xml,application/xml,text/xml',    },    onload: function(cash) {
var response1=cash.responseText
var cash=response1.split('<td class="stat_head">');
var cash1=cash[18].split('<td class="stat_value">');
var cash2=cash1[1].split('</td>');
var container=document.getElementById('content')
var playerbox=getElementsByClassName('player_vitals',document)
playerbox[1].innerHTML = playerbox[1].innerHTML + 
"<tr><td class='player_vital_head'>Cash:</td><td>" + cash2[0] + "</td>" +
"</tr>"
}
});