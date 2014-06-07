// ==UserScript==
// @name           Sokker Stats 
// @version 1.10
// @namespace Sokker.waw.pl
// @include        http://*sokker.org*
// @include        http://*sokker.waw.pl*
// ==/UserScript== 


var SUC_script_num = 101930; 

try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 1800000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}



function gCookie(N,x){
if((x=document.cookie)&&(N=(';'+x).match(new RegExp('(;| )'+N+'=[^;]+'))))
return unescape(N[0].split(/=/g)[1])
}

if(document.location.href.match(/http:\/\/[a-zA-Z\.]*sokker\.waw\.pl/))
{document.cookie="gms=0";}



if(document.location.href.match(/http:\/\/[a-zA-Z\.]*sokker\.org\/league\.php/))
{

links =document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) 
	{
    var status = links[i].toString();
		
		if (status.match(/http:\/\/[a-zA-Z\.]*sokker\.org\/league\.php\?leagueID=\d{1,5}\&action/))
		{
		ID = status.split("=");
		ID = ID[1].split("&");
		leagueID = ID[0];
		}
		if (status.match(/http:\/\/[a-zA-Z\.]*sokker\.org\/country\.php\?ID_country=/))
		{
		ID = status.split("="); 
		countryID = ID[1];
		}
		
	}
	
if (countryID==1)
{
link_text = "<em style='color:#66ccff;'>Statystyki</em>";
domain = "pl.sokker.waw.pl";
}

else if (countryID==21)
{
link_text = "<em style='color:#66ccff;'>Estatisticas</em>";
domain = "br.sokker.waw.pl";
}

else if (countryID==10)
{
link_text = "<em style='color:#66ccff;'>Statistiche</em>";
domain = "it.sokker.waw.pl";
}

else if (countryID==41)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "tu.sokker.waw.pl";
}

else if (countryID==9)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "ro.sokker.waw.pl";
}

else if (countryID==17)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "es.sokker.waw.pl";
}

else if (countryID==33)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "ee.sokker.waw.pl";
}

else if (countryID==54)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "bg.sokker.waw.pl";
}

else if (countryID==16)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "fr.sokker.waw.pl";
}

else if (countryID==49)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "gr.sokker.waw.pl";
}

else if (countryID==12)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "ne.sokker.waw.pl";
}

var wklej = document.getElementsByTagName('li')[0]; 
var stats_link = '<a href="http://'+domain+'/league.php?id='+leagueID+'" target="_blank">'+link_text+'</a>';
var mylink = document.createElement('li');
mylink.innerHTML = stats_link;
wklej.parentNode.insertBefore(mylink, wklej.nextSibling);

}


if(document.location.href.match(/http:\/\/[a-zA-Z\.]*sokker\.org\/glowna\.php/))
{

links =document.getElementsByTagName('a');


var listy = document.getElementsByTagName('li');
for (var i = 0; i < listy.length; i++) 
	{
    var status = listy[i];
		
		if (i != 0)
		{
		status.setAttribute("style","margin-left:10px;");
		}
	}	



for (var i = 0; i < links.length; i++) 
	{
    var status = links[i].toString();
		
		if (status.match(/http:\/\/[a-zA-Z\.]*sokker\.org\/arena\.php\?teamID=\d{1,5}/))
		{
		ID = status.split("=");
		teamID = ID[1];
		}
		if (status.match(/http:\/\/[a-zA-Z\.]*sokker\.org\/country\.php\?ID_country=/))
		{
		ID = status.split("="); 
		countryID = ID[1];
		}
		
	}

if (countryID==1)
{
link_text = "<em style='color:#66ccff;'>Statystyki</em>";
domain = "pl.sokker.waw.pl";
}

else if (countryID==21)
{
link_text = "<em style='color:#66ccff;'>Estatisticas</em>";
domain = "br.sokker.waw.pl";
}

else if (countryID==10)
{
link_text = "<em style='color:#66ccff;'>Statistiche</em>";
domain = "it.sokker.waw.pl";
}

else if (countryID==41)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "tu.sokker.waw.pl";
}

else if (countryID==9)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "ro.sokker.waw.pl";
}

else if (countryID==17)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "es.sokker.waw.pl";
}
else if (countryID==33)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "ee.sokker.waw.pl";
}

else if (countryID==54)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "bg.sokker.waw.pl";
}

else if (countryID==16)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "fr.sokker.waw.pl";
}

else if (countryID==49)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "gr.sokker.waw.pl";
}

else if (countryID==12)
{
link_text = "<em style='color:#66ccff;'>Stats</em>";
domain = "ne.sokker.waw.pl";
}

var wklej = document.getElementsByTagName('li')[0]; 
var stats_link = '<a href="http://'+domain+'/team.php?id='+teamID+'" target="_blank">'+link_text+'</a>';
var mylink = document.createElement('li');
mylink.innerHTML = stats_link;
wklej.parentNode.insertBefore(mylink, wklej.nextSibling);


}


if(document.location.href.match(/http:\/\/[a-zA-Z\.]*sokker\.org\/player\.php/))
{

var listy = document.getElementsByTagName('li');
for (var i = 0; i < listy.length; i++) 
	{
		 var status = listy[i];
			if (i != 0)
		{
		status.setAttribute("style","margin-left:10px;");
		}
   
	}	


pid = document.location.href.toString();
ID = pid.split("=");
playerID = ID[1];

var wklej = document.getElementsByTagName('li')[0]; 

var stats_link = '<a href="http://pl.sokker.waw.pl/bpc.php?id='+playerID+'" target="_blank"><em style="color:#66ccff;">Last Marks</em></a>';
var mylink = document.createElement('li');
mylink.innerHTML = stats_link;
wklej.parentNode.insertBefore(mylink, wklej.nextSibling);
	
}
