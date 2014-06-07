// ==UserScript==
// @name           Contract Expiration Date
// @namespace      GLB
// @description    Contract Exp Date to homepage
// @include        http://goallineblitz.com/game/home.pl
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

function getExpDate(playerId, i)
{
   GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
   headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(expdate) {
      var response1=expdate.responseText
      var expdate=response1.split('/yr - Exp. ');
      var expdate1=expdate[1].split('</td>');
      var container=document.getElementById('content')
      var playerbox=getElementsByClassName('player_name',document)
      playerbox[i].innerHTML = playerbox[i].innerHTML + "&nbsp;<span class='player_xp'>" + expdate1[0] + "</span>";
      }
   });
};

var playernames=getElementsByClassName('player_name',document)

for (var i = 0; i < playernames.length; i++) {
   var playerInfo = playernames[i].innerHTML
   var re = /\d{1,7}/;
   var playerId = playerInfo.match(re);
   getExpDate(playerId, i);
};

},1000);