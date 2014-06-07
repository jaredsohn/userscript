
// ==UserScript==

// @name           GLB Add Player Ratings to Search Page

// @namespace      GLB

// @description    Add Player Ratings to Search page results

// @include        http://goallineblitz.com/game/search.pl*

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




function getElementsByClassNameDyn(classname1,classname2, par)
{
	var a=[];   
	var re1 = new RegExp('\\b' + classname1 + '\\b');
    var re2 = new RegExp('\\b' + classname2 + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re1.test(els[i].className) || re2.test(els[i].className)) 
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
      loadLink.innerHTML = "Load Ratings";
      loadLink.addEventListener('click',loadRatings, false);

   // subhead_link_bar
   var subhead_link_bar = getElementsByClassName("subhead_link_bar", document);
   subhead_link_bar[0].innerHTML = subhead_link_bar[0].innerHTML + " ";
   subhead_link_bar[0].appendChild(loadLink);

   var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = '/css/game/scouting_reports.css?1';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link2 = window.document.createElement('link');
link2.rel = 'stylesheet';
link2.type = 'text/css';
link2.href = '/css/game/scouting_reports.css?2';
document.getElementsByTagName("HEAD")[0].appendChild(link2);

var link3 = window.document.createElement('link');
link3.rel = 'stylesheet';
link3.type = 'text/css';
link3.href = '/css/game/scouting_reports.css?1';
document.getElementsByTagName("HEAD")[0].appendChild(link3);


var link4 = window.document.createElement('link');
link4.rel = 'stylesheet';
link4.type = 'text/css';
link4.href = '/css/game/skill_tree.css?2';
document.getElementsByTagName("HEAD")[0].appendChild(link4);



var link5 = window.document.createElement('link');
link5.rel = 'stylesheet';
link5.type = 'text/css';
link5.href = '/css/game/player.css?5';
document.getElementsByTagName("HEAD")[0].appendChild(link5);


var link6 = window.document.createElement('link');
link6.rel = 'stylesheet';
link6.type = 'text/css';
link6.href = '/css/tooltip.css';
document.getElementsByTagName("HEAD")[0].appendChild(link6);


   

function getPlayerBars(playerId, i)
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
      var playeroverall=response1.split('<div class="rating_bar">');
      var playeroverallbar = '';
      var playerfullbar ='';
      var playerbartitle='';
      for (var k=0;k<(playeroverall.length-1);k++) {
          
          playerbartitle = playeroverall[k].substring(playeroverall[k].indexOf('rating_head')+13, playeroverall[k].indexOf('</div>', playeroverall[k].indexOf('rating_head') + 6));
          playeroverallbar = playeroverall[k+1].substring(playeroverall[k+1].indexOf('<div class="rating_bar_fill'), playeroverall[k+1].indexOf('</div>', playeroverall[k+1].indexOf('<div class="rating_bar_fill') + 6));
          if (playeroverallbar.indexOf('px')>0) {
              var playerstat = playeroverallbar.substring(playeroverallbar.indexOf('width:') + 6, playeroverallbar.indexOf('px'));
          }else{
              var playerstat = playeroverallbar.substring(playeroverallbar.indexOf('width:') + 6, playeroverallbar.indexOf('%'));
          }
          playeroverallbar = playeroverallbar.replace('&nbsp;',playerstat);

          playerfullbar = playerfullbar + playerbartitle + ': ' + playeroverallbar + '</div>';

      }
      
          var container=document.getElementById('content')
          if (buseshort) {
              var playerbox=getElementsByClassNameDyn('alternating_color2', 'alternating_color1', document);
          } else {
              var playerbox=getElementsByClassNameDyn('alternating_color2', 'alternating_color1', document);
          }
          playerbox[i].innerHTML = playerbox[i].innerHTML + '<td>' + playerfullbar + '</td>';
      
   
   }
   });
};



function loadRatings() {
if (!loaded) {
loaded = true;
var playernames=getElementsByClassName('search_name',document);
if (playernames.length == 0) {
	buseshort=false;
    loaded=false;
	var playernames=getElementsByClassName('search_name',document);
}

var playcount = getElementsByClassNameDyn('alternating_color2', 'alternating_color1', document);


var tablehead = getElementsByClassName('nonalternating_color',document);
tablehead[0].innerHTML = tablehead[0].innerHTML + '<td class="search_name_head">Ratings</td>';


for (var i = 0; i < playernames.length; i++) {
   var playerInfo = playernames[i].innerHTML;
   var idlong = playerInfo.split('player_id=');
   var id = idlong[1].split('">');
   getPlayerBars(id, i);
}
}
};

