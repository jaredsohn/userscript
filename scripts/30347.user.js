// ==UserScript==

// @name           Add Agent to Roster

// @namespace      GLB

// @description    Show agent on roster page

// @include        http://goallineblitz.com/game/roster.pl?team_id=*

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

var buseshort = true;
var loaded = false;

//create loadAgent link
      var loadLink = document.createElement('a');
      loadLink.setAttribute('href', '#');
      loadLink.innerHTML = "Load Agent Names";
      loadLink.addEventListener('click',loadAgents, false);

   // subhead_link_bar
   var subhead_link_bar = getElementsByClassName("subhead_link_bar", document);
   subhead_link_bar[0].innerHTML = subhead_link_bar[0].innerHTML + " | ";
   subhead_link_bar[0].appendChild(loadLink);

function getAgentName(playerId, i)
{
   GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
   headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(agntname) {
      var response1=agntname.responseText
      var agntname=response1.split('user_id=');
      var name1=agntname[1].split('">');
       var agntID = name1[0];
      var name2=name1[1].split('</');
      var container=document.getElementById('content')
      if (buseshort) {
	      var playerbox=getElementsByClassName('player_name_short',document)
      } else {
 	      var playerbox=getElementsByClassName('player_name',document)
      }
      playerbox[i].innerHTML = playerbox[i].innerHTML + "<br><a href='/game/home.pl?user_id=" + agntID + "''><span style='font: 10pt black bold;'>" + name2[0] + "</span></a>";
      }
   });
};



function loadAgents() {
if (!loaded) {
loaded = true;
var playernames=getElementsByClassName('player_name_short',document);
if (playernames.length == 0) {
	buseshort=false;
	var playernames=getElementsByClassName('player_name',document);
}

for (var i = 0; i < playernames.length; i++) {
   var playerInfo = playernames[i].innerHTML;
   var idlong = playerInfo.split('player_id=');
   var id = idlong[1].split('">');
   getAgentName(id, i);
}
}
};

},100);