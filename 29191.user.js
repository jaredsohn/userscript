// ==UserScript==
// @name           Cash To Quick Training Page
// @namespace     GLB
// @description   mod of http://userscripts.org/scripts/show/29108  which is a mod of http://userscripts.org/scripts/show/27967, Thanks to both authors for doing all the hard work for this script.
// @include        http://goallineblitz.com/game/quick_training.pl
// ==/UserScript==

var timeout = 0;

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

function getCash(playerId, i)
{
   GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
   headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(cash) {
      var response1=cash.responseText
      var cash=response1.split('<td class="stat_head">');
      var cash1=cash[18].split('<td class="stat_value">');
      var cash2=cash1[1].split('</td>');
      var container=document.getElementById('content')
      var playerbox=getElementsByClassName('player_name',document)
      playerbox[i].innerHTML = playerbox[i].innerHTML + 
	  "<span style='font-weight:700; padding-left:65px;'>Cash:</span><span style='padding-left:10px;'>" + cash2[0] + "</span>";
      }
   });
};


window.setTimeout( function() {
var playernames=getElementsByClassName('player_name',document)

for (var i = 0; i < playernames.length; i++) {
   var playerInfo = playernames[i].innerHTML
   var re = /\d{1,7}/;
   var playerId = playerInfo.match(re);
   getCash(playerId, i);
};
},timeout);