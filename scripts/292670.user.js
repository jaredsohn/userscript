// ==UserScript==
// @name        GLB Overall Stat Number on team page Warrior General
// @namespace   DDCUnderground - Greasemonkey
// @description From the team page will pull overal numerical ranking of each team on schedule
// @include     http://glb.warriorgeneral.com/game/team.pl?team_id=*
// @version     1.0.0
// ==/UserScript==
// modified by briansimoneau 01/21/2014
 
/*
 * pabst was here 08/26/08
 */
var timeout = 2000;

function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++) {      
      if(re.test(els[i].className)) {
         a.push(els[i]);
      }
   }
   return a;
};

function getStat(teampath, i, hoa) {
	GM_xmlhttpRequest( {
		method: 'GET',
		url: 'http://glb.warriorgeneral.com' + teampath,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(opteam) {
			var div = document.createElement("div");
			div.innerHTML = opteam.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

			var ratings = getElementsByClassName("rating_bar_fill", div);
			var stat1 = parseInt(ratings[0].innerHTML);
			var stat2 = parseInt(ratings[8].innerHTML);
			var spread = stat1 - stat2;
			if (spread > 0) {
				spread = '+' + spread;
	        }
	        var opponententry=document.getElementsByClassName("schedule_date_value");
	        var portion1end = opponententry[i].parentNode.innerHTML.indexOf('</a>');
	        portion1end = portion1end + 4;
	        var portion1str = opponententry[i].parentNode.innerHTML.substr(0,portion1end);
	        var portion2end = opponententry[i].parentNode.innerHTML.length;
	        var portion2str = opponententry[i].parentNode.innerHTML.substring(portion1end,portion2end);
	        opponententry[i].parentNode.innerHTML = portion1str + '(' + stat2 + ') ' + '(' + spread + ')' + portion2str;
 		}
	});
}




window.setTimeout( function() {
   var opponentheader=document.getElementsByClassName('schedule_opponent');
   opponentheader[0].innerHTML = opponentheader[0].innerHTML + ' (Overall)(Spread)';
   var localteamid = (window.location+"").indexOf("team_id=")+"team_id=".length;
   localteamid = (window.location+"").slice(localteamid);

   var opponent=document.getElementsByClassName("schedule_date_value");
   for (var i = 0; i < opponent.length; i++) { 
	   rowdata = opponent[i].parentNode.innerHTML.split('<td>');
	   var startpos = rowdata[2].indexOf("/game/compare");
	   if (startpos!=(-1)) { 	   
		   var stoppos = rowdata[2].indexOf('"',(startpos+1));
		   var teampath = rowdata[2].slice(startpos,stoppos);
		   teampath = teampath.replace("&amp;","&");
		   getStat(teampath, i, opponent[i].parentNode.className.slice(opponent[i].parentNode.className.length-1));
	   	}
	   	else { 
	   		startpos = (rowdata[1].indexOf('team.pl?team_id=') + 16);
	   		var stoppos = rowdata[1].indexOf('"',(startpos+1));
	   		var teampath = rowdata[1].slice(startpos,stoppos);
	   		getStat('/game/compare_teams.pl?team1=' + localteamid + '&team2=' + teampath, i,opponent[i].parentNode.className.slice(opponent[i].parentNode.className.length-1));
	   	}
   }
   
},timeout);
