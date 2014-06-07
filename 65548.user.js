// ==UserScript==
// @name           HattrickLeagueAndMatchChat
// @description	   Adds a yaplet chat link to league and match pages on hattrick.org
// @namespace      HattrickLeagueAndMatchChat
// @version        0.1


// @include        http://*.hattrick.org/World/Series/Default.aspx?LeagueLevelUnitID=*
// @include        http://*.hattrick.org/World/Series/YouthSeries.aspx?YouthLeagueId=*
// @include        http://*.hattrick.org/Club/Matches/Match.aspx?matchID=*
// @include        http://*.hattrick.org/World/Cup/CupMatches.*
// @include        http://*.hattrick.org/World/Cup/?CupID=*
// @include        http://*.hattrick.org/Community/Federations/Federation.aspx?AllianceID=*

// @include        http://*.hattrick.interia.pl/World/Series/Default.aspx?LeagueLevelUnitID=*
// @include        http://*.hattrick.interia.pl/World/Series/YouthSeries.aspx?YouthLeagueId=*
// @include        http://*.hattrick.interia.pl/Club/Matches/Match.aspx?matchID=*
// @include        http://*.hattrick.interia.pl/World/Cup/CupMatches.*
// @include        http://*.hattrick.interia.pl/World/Cup/?CupID=*
// @include        http://*.hattrick.interia.pl/Community/Federations/Federation.aspx?AllianceID=*

// @include        http://*.hattrick.ws/World/Series/Default.aspx?LeagueLevelUnitID=*
// @include        http://*.hattrick.ws/World/Series/YouthSeries.aspx?YouthLeagueId=*
// @include        http://*.hattrick.ws/Club/Matches/Match.aspx?matchID=*
// @include        http://*.hattrick.ws/World/Cup/CupMatches.*
// @include        http://*.hattrick.ws/World/Cup/?CupID=*
// @include        http://*.hattrick.ws/Community/Federations/Federation.aspx?AllianceID=*

// ==/UserScript==

// settings		
var open_as_right_frame = false;  // set to to to open chat in right frame instead of a new window
var nick='none';

// strings
var MatchChat = "Non HT Match Chat";
var LeagueChat = "Non HT League Chat";
var CupChat = "Non HT Cup chat";
var FederationChat = "Non HT Federation Chat";



try { 
	var href = document.location.href;	
	var icon = "http://hattrick.org/App_Themes/Simple/logo_green.png";
	var icon2 = "http://hattrick.org/favicon.ico";
	
	if (nick=='none'){
		var teamlinks = document.getElementById('teamLinks').getElementsByTagName('a');
		if (teamlinks.length) nick = teamlinks[0].innerHTML;
		else nick='Guest';
	}
	
	if (href.search(/\/World\/Series\/Default\.aspx/i)!=-1) {
			var id=document.location.href.replace(/.+leagueLevelUnitID=/i, "").match(/^\d+/)[0];
			var channel = "hattrick.org/league"+id;
			var a = document.createElement('a');
			if (open_as_right_frame) 
					a.href = "javascript:void(location.href='http://go.yaplet.com/?b=3&url='+location.href+'&title="+channel+"&yapletlogo="+icon2+ "&nick="+nick+"&channel="+channel+"')";
			else  	a.href = "javascript:(function(){window.open('http://embed.yaplet.com/?title="+channel+"&yapletlogo="+icon+ "&nick="+nick+"&channel="+channel+"','','width=300,height=500,resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no')})()";
			a.innerHTML = LeagueChat;
			// add after forum <p> 
			var sidebox_p = document.getElementById('sidebar').getElementsByTagName('p')[0].parentNode;			
			sidebox_p.appendChild(a);
		}
	else if (href.search(/\/World\/Series\/YouthSeries\.aspx/i)!=-1) {
			var id = document.location.href.replace(/.+YouthLeagueId=/i, "").match(/^\d+/)[0];
			var channel = "hattrick.org/youthleague"+id;
			var a = document.createElement('a');
			if (open_as_right_frame) 
					a.href = "javascript:void(location.href='http://go.yaplet.com/?b=3&url='+location.href+'&title="+channel+"&yapletlogo="+icon2+ "&nick="+nick+"&channel="+channel+"')";
			else  	a.href = "javascript:(function(){window.open('http://embed.yaplet.com/?title="+channel+"&yapletlogo="+icon+ "&nick="+nick+"&channel="+channel+"','','width=300,height=500,resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no')})()";
			a.innerHTML = LeagueChat;
			// add after forum <p> 
			var sidebox_p = document.getElementById('sidebar').getElementsByTagName('p')[0].parentNode;			
			sidebox_p.appendChild(a);
		}
		else if (href.search(/\/Club\/Matches\/Match.aspx\?matchID=/i)!=-1) { 
			var id = document.location.href.replace(/.+matchID=/i, "").match(/^\d+/)[0];
			var channel = "hattrick.org/match" + id;
			var a = document.createElement('a');
			if (open_as_right_frame) 
					a.href = "javascript:void(location.href='http://go.yaplet.com/?b=3&url='+location.href+'&title="+channel+"&yapletlogo="+icon2+ "&nick="+nick+"&channel="+channel+"')";
			else  	a.href = "javascript:(function(){window.open('http://embed.yaplet.com/?title="+channel+"&yapletlogo="+icon+ "&nick="+nick+"&channel="+channel+"','','width=300,height=500,resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no')})()";
			a.innerHTML = MatchChat;
			// add to date
			var date = document.getElementById('mainBody').getElementsByTagName('h1')[0].nextSibling.nextSibling;
			date.appendChild(a);
		}
		else if (href.search(/\/World\/Cup\/CupMatches\.aspx/i)!=-1 || href.search(/\/World\/Cup\/.CupID=/i)!=-1) { 
			var id = document.location.href.replace(/.+CupID=/i, "").match(/^\d+/)[0];
			var channel = "hattrick.org/nationalcup" + id;
			var a = document.createElement('a');
			if (open_as_right_frame) 
					a.href = "javascript:void(location.href='http://go.yaplet.com/?b=3&url='+location.href+'&title="+channel+"&yapletlogo="+icon2+ "&nick="+nick+"&channel="+channel+"')";
			else  	a.href = "javascript:(function(){window.open('http://embed.yaplet.com/?title="+channel+"&yapletlogo="+icon+ "&nick="+nick+"&channel="+channel+"','','width=300,height=500,resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no')})()";
			a.innerHTML = CupChat;
			var p = document.createElement('p');
			p.appendChild(a);
			// add after header
			var h1 = document.getElementById('mainBody').getElementsByTagName('h1')[0];
			h1.parentNode.insertBefore(p,h1.nextSibling);
		}
		else if (href.search(/\/Community\/Federations\/Federation.aspx\?AllianceID=/i)!=-1) { 
			var id = document.location.href.replace(/.+AllianceID=/i, "").match(/^\d+/)[0];
			var channel = "hattrick.org/federation" + id;
			var a = document.createElement('a');
			if (open_as_right_frame) 
					a.href = "javascript:void(location.href='http://go.yaplet.com/?b=3&url='+location.href+'&title="+channel+"&yapletlogo="+icon2+ "&nick="+nick+"&channel="+channel+"')";
			else  	a.href = "javascript:(function(){window.open('http://embed.yaplet.com/?title="+channel+"&yapletlogo="+icon+ "&nick="+nick+"&channel="+channel+"','','width=300,height=500,resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no')})()";
			a.innerHTML = FederationChat;
			// add to first sidebox
			var sidebox1_a = document.getElementById('sidebar').getElementsByTagName('div')[0].getElementsByTagName('a');
			var lasta = sidebox1_a[sidebox1_a.length-1];			
			lasta.parentNode.insertBefore(a,lasta.nextSibling);		
		}
			
} catch( e ){ alert(e); }
	