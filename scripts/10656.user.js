// ==UserScript==
// @name           Release Site Usenet/Torrent Searcher
// @namespace      Smiths
// @description    Adds buttons to a release's line to search usenet or torrents for the release. Now can choose default search site! [Sites: Binsearch, torrentz, NZBindex, Piratebay, Demonoid, ISOHunt]
// @include        http://*nfohump.com/*
// @include        http://dupe.sabeln.org/*
// @include        http://*nfo-source.net/*
// @include        http://*vcdq.com/*
// @include        http://*rlslog.net/*
// @include        http://*scnsrc.*/*
// @include        http://*.btarena.*/*
// @include        http://*.irfree.com/*
// @include        http://*.orlydb.com/*
// @include        http://*ps3news.com/subdomain.php?pagename=nfo*
// @include        *
// @exclude		   http://*binsearch.info/*
// @exclude		   http://*nzbindex.nl/*
// @exclude		   http://*kickasstorrents.com/*
// @exclude		   https://*thepiratebay.org/*
// @exclude		   http://*isohunt.com/*
// @exclude		   http://*nzbmatrix.com/*
// @exclude		   http://*kat.ph/*
// @exclude		   http://*torrentz.com/*
// @exclude		   http://*userscripts.org/*
// @version		   2.5.8
// @grant	       GM_getValue
// @grant	       GM_log
// @grant   	   GM_setValue
// @grant		   GM_addStyle
// @grant  		   GM_xmlhttpRequest
// @grant  		   GM_registerMenuCommand
// @attribution	changes [d:12.31.12][u:<ul><li>quick fix for VCDQuality new layout</li><li>Added abgx.net</li></ul>]
// ==/UserScript==

//note to self: gotta make sure to update the one in the metadata too!
var v = "2.5.8";

var scriptNum = "10656";
var scriptName = "Release Site Usenet/Torrent Searcher";

//<--Updater Stuff
var isFireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
GM_addStyle("#smgm_bgdiv{ text-align: center;position:fixed;top:0px;left:0px;z-index:9991;width:100%;height:100%;background-color:black;opacity:0.7;display:block;visibility:visible;}");
GM_addStyle("#smgm_dialogbox { vertical-align:middle;left:40px;top:15px;border:3px solid #000 !important;text-align:center !important;background-color:#fff !important;color:#000 !important;font-family:arial,verdana !important;z-Index:9999;position:fixed;width:18%;height:50%;margin-left:auto;margin-right:auto;display:block;visibility:visible;}");
GM_addStyle(".smgm_buttons { color:#000 !important;font: 90% 'arial','trebuchet ms',helvetica,sans-serif !important;background-color:#B2CCFF !important;border:2px solid !important;border-color: #E0EBFF #000 #000 #E0EBFF !important;vertical-align: top !important;}");
GM_addStyle(".smgm_table { margin-bottom:10px !important;border:0px !important;border-collapse:collapse !important;margin-left:auto;margin-right:auto; }");
var remindLaterV = GM_getValue('remindLaterV', remindLaterV);
if (!remindLaterV) { remindLaterV = 0; GM_setValue('remindLaterV',remindLaterV); }

var homepageURL = "http://userscripts.org/scripts/show/" + scriptNum ;
var metaURL = "http://userscripts.org/scripts/source/" + scriptNum + ".meta.js";
var scriptJSURL = "http://userscripts.org/scripts/source/" + scriptNum + ".user.js";

function doremindLater(clicked,span)
{
	if (clicked) 
		remindLaterV = span;
	else
		remindLaterV--;
	GM_setValue('remindLaterV',remindLaterV);
}

function hideUpdate()
{
	document.body.removeChild(document.getElementById('smgm_bgdiv'));
	document.body.removeChild(document.getElementById('smgm_dialogbox'));
}

function checkNew(version)
{
	var upgrade = 0;
	var verstring = "";
	var theHTML = "";
	GM_xmlhttpRequest({
		method:"GET",
		url:metaURL,
		onload:function(content){
			var aResponse = content.responseText;
			var USversion = aResponse.match(/@version.*?(\d[^<]+?)\n/);
			aResponse = aResponse.replace(/ \/>/g,'>');
			aResponse = aResponse.replace(/\n/g,'');
			var changeDate = aResponse.match(/\[d:([0-9]+?\.[0-9]+?\.[0-9]+?)\]/i)[1];
			var theChanges = aResponse.match(/\[u:(.*?)\]/i)[1];
			vSplit = version.split(".");
				vmain = Number(vSplit[0]);
				vvsub = Number(vSplit[1]);
				vrsub = Number(vSplit[2]);
			USsplit = USversion[1].split(".");
				USvmain = Number(USsplit[0]);
				USvsub = Number(USsplit[1]);
				USrsub = Number(USsplit[2]);
			verstring = "<div style='padding:5px;border-bottom:1px dotted #000;'>Latest Version on Userscripts: <a href='" + homepageURL + "' target='_new' title='Click to visit script's page'><b>" + USvmain + "." + USvsub + "." + USrsub + "</b></a><br>Your Installed Version: <b>" + vmain + "." + vvsub + "." + vrsub + "</b></div>";
			if (USvmain > vmain) upgrade = 1;
			if ( (USvsub > vvsub) && (USvmain >= vmain) ) upgrade = 1;
			if ( (USrsub > vrsub) && (USvsub == vvsub) && (USvmain >= vmain) ) upgrade = 1;
			if (upgrade == 1) //upgrade available, pop a box
			{
				theHTML += "<div style='padding:5px;border-bottom:1px dotted #000;'>New version of " + scriptName + " available.</div>";
				theHTML += verstring + "<p>";
				theHTML += "<table class='smgm_table'><tr><td><input type='button' class='smgm_buttons' id='smgm_installButton' onMouseUp=\"document.location.href=\'" + scriptJSURL + "\';\" value='Install'></td>";
				theHTML += "<td style='width:25px;'>&nbsp;</td><td><input style='' class='smgm_buttons' type='button' id='smgm_remindButton' value='Remind Me Later'></td>";
				theHTML += "</tr></table><div style='background-color:white !important;overflow:auto !important;height:50%;text-align:left;border-top:1px dotted #000;padding:7px;' colspan='5'>Changes (" + changeDate.replace(/\./g,"/") + "):<br><span style='font-style:italic;'>" + theChanges + "</span></div>";
				div1 = document.createElement('div');
				div1.id = 'smgm_dialogbox';
				div1.style.display = "none";
				div1.innerHTML = theHTML;
				document.body.appendChild(div1);
				div2 = document.createElement('div');
				div2.id = 'smgm_bgdiv';
				div2.style.display = "none";
				div2.addEventListener("click",function(){doremindLater(true,15);hideUpdate();},false);
				document.body.appendChild(div2);
				document.getElementById('smgm_bgdiv').style.display='block';
				document.getElementById('smgm_dialogbox').style.display='block';
				document.getElementById('smgm_remindButton').addEventListener("click", function(){doremindLater(true,60);hideUpdate();},false);
				document.getElementById('smgm_installButton').addEventListener("click", function(){hideUpdate();},false);
			}
		}
	})
}

if (isFireFox) //only do update on FFox, Chrome/Tampermonkey are weird
{
	doremindLater(false);
	if (remindLaterV < 1) 
		checkNew(v);
}
//end updater stuff-->

var NFOdefUN,NFOdefTO,NFOLinkify,tP,uP;
var NFOUNUrls =['http://binsearch.info/?q=[_T_]&max=100&adv_age=1100&server=','http://nzbindex.nl/search?q=[_T_]'];
var NFOUNSites = ['Binsearch.info','NZBIndex.nl'];
var NFOTOUrls = ['http://www.torrentz.com/search?q=[_T_]','http://www.kat.ph/usearch/[_T_]/','https://thepiratebay.org/search/[_T_]/0/99/0','http://www.demonoid.me/files/?query=[_T_]','http://isohunt.com/torrents/?ihq=[_T_]'];
var NFOTOSites = ['torrentz.com','KickAssTorrents','thepiratebay','Demonoid','ISOHunt'];

if (isFireFox)
{
	GM_registerMenuCommand(scriptName + ' Options', smgm_nfo_showOptions);
	NFOLinkify = GM_getValue('NFOLinkify');
	if (isNaN(NFOLinkify)) { NFOLinkify = 1; GM_setValue('NFOLinkify',NFOLinkify); }
	NFOdefUN = GM_getValue('NFOdefUN');
	if (!NFOdefUN) { NFOdefUN = 'http://binsearch.info/?q=[_T_]&max=100&adv_age=1100&server='; GM_setValue('NFOdefUN',NFOdefUN); }
	NFOdefTO = GM_getValue('NFOdefTO');
	if (!NFOdefTO) { NFOdefTO = 'http://www.torrentz.com/search?q=[_T_]'; GM_setValue('NFOdefTO',NFOdefTO); }
	NFOPlusBut = GM_getValue('NFOPlusBut');
	if (isNaN(NFOPlusBut)) { NFOPlusBut = 1; GM_setValue('NFOPlusBut',NFOPlusBut); }	
	for (i=0;i<NFOUNUrls.length;i++)
		if (NFOdefUN.substr(0,9) == NFOUNUrls[i].substr(0,9))
			uP = NFOUNSites[i];
	for (i=0;i<NFOTOUrls.length;i++)
		if (NFOdefTO.substr(0,9) == NFOTOUrls[i].substr(0,9))
			tP = NFOTOSites[i];
}else{
	NFOLinkify = 1;
	NFOdefUN = 'http://binsearch.info/?q=[_T_]&max=100&adv_age=1100&server=';
	NFOdefTO = 'http://www.torrentz.com/search?q=[_T_]';
	NFOPlusBut = 1;
	uP="binsearch.info";
	tP="torrentz.com";
}

function smgm_nfo_setOptions()
{
	var NFOLinkify = GM_getValue('NFOLinkify');
		(NFOLinkify) ? document.getElementById('NFOLinkifyON').checked = true : document.getElementById('NFOLinkifyOFF').checked = true;
	var NFOPlusBut = GM_getValue('NFOPlusBut');
		(NFOPlusBut) ? document.getElementById('NFOPlusButON').checked = true : document.getElementById('NFOPlusButOFF').checked = true;
	var NFOdefUN = GM_getValue('NFOdefUN');
	var NFOdefTO = GM_getValue('NFOdefTO');
	document.getElementById('unSites').remove(0);
	for (i=0;i<NFOUNUrls.length;i++)
	{
		var nOption = document.createElement('option');
		nOption.appendChild(document.createTextNode(NFOUNSites[i]));
		nOption.value=NFOUNUrls[i];
		document.getElementById('unSites').appendChild(nOption);
	}
	for (j=0;j<document.getElementById('unSites').options.length;j++)
	{
		if (document.getElementById('unSites').options[j].value == NFOdefUN)
			document.getElementById('unSites').options[j].selected = true;
	}
	document.getElementById('toSites').remove(0);
	for (i=0;i<NFOTOUrls.length;i++)
	{
		var nOption = document.createElement('option');
		nOption.appendChild(document.createTextNode(NFOTOSites[i]));
		nOption.value=NFOTOUrls[i];
		document.getElementById('toSites').appendChild(nOption);
	}
	for (j=0;j<document.getElementById('toSites').options.length;j++)
	{
		if (document.getElementById('toSites').options[j].value == NFOdefTO)
			document.getElementById('toSites').options[j].selected = true;
	}
}

function smgm_nfo_saveOptions()
{
	(document.getElementById('NFOLinkifyON').checked) ? GM_setValue('NFOLinkify', 1 ) : GM_setValue('NFOLinkify', 0 );
	(document.getElementById('NFOPlusButON').checked) ? GM_setValue('NFOPlusBut', 1 ) : GM_setValue('NFOPlusBut', 0 );
	GM_setValue('NFOdefUN',document.getElementById('unSites').value);
	GM_setValue('NFOdefTO',document.getElementById('toSites').value);
}

function smgm_nfo_hideOptions()
{
	document.body.removeChild(document.getElementById("smgm_optionsDiv"));
	document.body.removeChild(document.getElementById("smgm_modalDiv"));
}

function smgm_nfo_showOptions()
{
	
	var div1=document.getElementById("smgm_modalDiv");
	if (div1==null)
	{
		GM_addStyle("#smgm_modalDiv{color:#000 !important; position:fixed; top:0px; left:0px; z-index:200; width:100%; height:100%; background-color:black; opacity:0.75;}");
		GM_addStyle(".smgm_hidden{display:none; visibility:hidden;}");

		div1=document.createElement("DIV");
		div1.id="smgm_modalDiv";
		div1.className="smgm_hidden";
		div1.title="Click to cancel and close";
		document.body.appendChild(div1);
		div1.addEventListener("click",smgm_nfo_hideOptions,false);
	}
	var div2=document.getElementById("smgm_optionsDiv");
	if (div2==null)
	{
		GM_addStyle(".smgm_optionsTable{vertical-align:middle !important;border-spacing: 2px !important; border: 1px solid #000 !important; border-collapse: collapse !important;padding-left:10px !important;margin-bottom:3px !important;color:#000 !important;}");
		GM_addStyle("#smgm_optionsDiv{position:fixed !important; top:3%; left:20%; z-index:210; width:40%; height:40%; background-color:white !important; border:solid 3px #0033CC !important;}");

		div2=document.createElement("div");
		div2.id="smgm_optionsDiv";
		div2.className="smgm_hidden";
		div2.setAttribute("style","text-align:justify;padding:10px");
		div2.innerHTML='<center><u><b><font size="+1">'+scriptName+' Options</b></font></u><br><font size="-2">Another <a href="'+homepageURL+'" target="_blank">Smiths Greasemonkey Script</a></font></center><p>' +
		'<div style="overflow:auto;height:60%;width:100%;"><form id="FAR" name="titleform">' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:3px;" colspan="2" width=50%>Auto-Detect and Linkify Releases:</td>' +
			'<td><input type="radio" id="NFOLinkifyON" name="embed7" value="1"/><label for="NFOLinkifyON"> Yes </label>' +
			'<input type="radio" id="NFOLinkifyOFF" name="embed7" value="0"/><label for="NFOLinkifyOFF"> No</label><br></td>' +
		'</tr>'+
		'<tr><td style="padding:3px;" colspan="2" width=50%>Default Usenet Search Site:</td>' +
			'<td><select name="unSites" id="unSites" onChange="javascript:(function(){(document.getElementById(&quot;unSites&quot;).value.indexOf(&quot;matrix&quot;) > -1) ? document.getElementById(&quot;smgm_nzbq&quot;).style.visibility=&quot;visible&quot; : document.getElementById(&quot;smgm_nzbq&quot;).style.visibility=&quot;hidden&quot;;})();"><option></select></td>' +
		'</tr>'+
		'<tr><td style="padding:3px;" colspan="2" width=50%>Default Torrent Search Site:</td>' +
			'<td><select name="toSites" id="toSites"><option></select></td>' +
		'</tr>'+
		'<tr><td style="padding:3px;" colspan="2" width=50%>Show Addition Search Sites Button:</td>' +
			'<td><input type="radio" id="NFOPlusButON" name="embed8" value="1"/><label for="NFOPlusButON"> Yes </label>' +
			'<input type="radio" id="NFOPlusButOFF" name="embed8" value="0"/><label for="NFOPlusButOFF"> No</label><br></td>' +
		'</tr>'+		
		'</table>'+
		'</div><center><input type="button" value="Ok" id="okButton" />&nbsp;&nbsp;&nbsp;<input type="button" value="Cancel" id="cancelButton" /></center></form>';

		document.body.appendChild(div2);
		document.getElementById("okButton").addEventListener("click",function(){smgm_nfo_saveOptions();smgm_nfo_hideOptions();location.reload(true);},false);
		document.getElementById("cancelButton").addEventListener("click",function(){smgm_nfo_hideOptions();},false);
	}
	document.getElementById("smgm_optionsDiv").className="";
	document.getElementById("smgm_modalDiv").className="";
	smgm_nfo_setOptions();
	div1.className="";
	div2.className="";
}

var uicon = "data:image/gif,GIF89a%0C%00%0C%00%E6%00%00%00%00%00%FF%FF%FF%3FA%3Fx%7Bx%92%95%92%5C%5E%5C%05%06%00%07%08%00%1A%1C%05%EC%F2%AB%EA%F0%AB%E4%E9%AB%F2%F7%BB%ED%F2%BA%EC%F1%BB%E9%ED%BA%1D%1F%05%F8%FE%94%F4%FA%93%E9%EE%94%F7%FD%AA%F7%FC%AB%F5%FA%AA%D3%DA%00%CA%D1%00%BF%C6%00%BE%C5%00rv%00lp%00X%5C%00X%5B%00VY%00SV%00RU%0068%00%1C%1D%00%17%18%00%18%19%01%F5%FD%0C%F6%FE%0D%DC%E3%0D%F7%FF%0F%F6%FF%24%F2%FA%24%F7%FF%26%F7%FF'%F7%FF)%D6%DC%24%F7%FE%3F%F8%FFA%EB%F1%3F%F5%FD%5D%F7%FF_%EC%F3%5C%F8%FDx%F7%FE%7B%EE%F2x%C8%CE%00%BC%C2%00%9B%A0%00%96%9A%00%95%99%00jm%00_a%00%5C%5E%00%EB%F1%0C%E5%EB%24%17%17%00%03%03%00%02%02%00%19%19%05%15%15%06%2C)%0073%05-'%07%05%05%05%04%04%04%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00M%00%2C%00%00%00%00%0C%00%0C%00%00%07%7F%80M%82L%08II%10L%82%8A%06%1E%3C%1A%3A%3D%40%07%8AD%1C%0E%0C%98%0D%0F%1B%06MK%1E%0A%16%14%15%15%16%09%0B%3F%00F%3C%12%11%04%A4%04%12%13%3C%23J967%037%B978%3A%22J%1834%054%C445%19%22G%3D01%02%D0%0202%3C%24K%20B%2C-..*%2B%2F%1D%00ME%3EA)''%26(%1CD%94!%3B%17%17%3B%1F%9D%8AM%00CHH%25%E2%82%81%00%3B";
var ticon = "data:image/gif,GIF89a%0C%00%0C%00%E6%00%00%00%00%00%FF%FF%FF%3F%3FAxx%7B%92%92%95%5C%5C%5E%00%04%05%00%06%07%B0%E0%E4%BF%EE%F2%BE%E9%ED%BF%E9%ED%02%15%16%03%16%17%07%19%1A%B0%F2%F6%B0%E8%EC%B0%E6%EA%BE%E6%E9%06MO%06LN%02%19%1A%0F%B2%B6%0F%B1%B5%07SU%07RT%07PR5%E9%EE4%E4%E9%07%1C%1DN%EB%EFP%EC%F0M%DF%E3i%EB%F0k%ED%F2h%E3%E7%82%EF%F2%85%EF%F4%9C%F1%F5%9B%EE%F2%9B%E4%E7%B1%F2%F5%B0%F0%F3%0C%90%93%08cd%07XY%07UV%0423%11%C5%C9%10%BC%C0%10%BB%BE%0F%B0%B3%0C%8C%8E%0C%8B%8D%09km%09eg%1F%E6%EA%20%E7%EB%1E%DC%DF%1D%CE%D2%22%E8%EC7%EA%EE3%D8%DB8%EA%EE2%CA%CD%81%E6%E8%00%03%03%00%02%02%02%15%15%06%17%17%07%14%14%03(%25%093%2F%0A*%24%05%05%05%04%04%04%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00L%00%2C%00%00%00%00%0C%00%0C%00%00%07%7F%80L%82K%0EHH%1DK%82%8A%06%194%1735.%07%8AB7%0B%09%98%0A%126%06LJ%19%11*%0F))*%10%08-%00E4'%26%04%AF%04'(4%15I2%24%25%03%BA%03%25A3%2FI1!%22%22%05%05%C4%23%16%2FF5%1E%1F%1F%02%02%1E%1E%204%0CJ%13%3E%3D%3F%D1%1B%1C%40%18%00LC%2C%3A%3C998%3B7B%94%14%2B00%2B%1A%9D%8AL%00DGG%0D%E2%82%81%00%3B";
var collapseimg = "data:image/gif;base64,R0lGODlhDAAMAOYAAAAAAP///1xeXXh7eQIGAAMIAA8cBcvyq9PyutPxuxEfBdD6qsvwq8jpq9f3u9Ltug4dAMj+lMb6k8DulNL9qnHaAGvRAGvOAGXGAGbFAGXCAFOgAE+ZAD12ADpwADltAC9cAC9bAC1ZACxWACxVABw4AAwYAAwXAAECAA0ZAYj9DIn+DXvjDYz/D5L6JJX/Jpb/J4vrJIPcJKH+P6L/QZvxP639XajzXLz9eLfyeFGaADRhADJeAITxDA4VBhAZBRssACQ3BQIDACEtBwUFBQQEBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEYALAAAAAAMAAwAAAd4gEaCRilAQCeDgwQiGxUVGyRCg0IeLCorKy09HyhGRCAyLjCjMC8xI0QmOjUzMzSvNDMcPiUYNwK4uTYWQyUaOQPBwjgXQxA6ExIRy8sSOj9EOw0HCxTWCwwhREYEHQ8IDuEJHpKCBTwcGhk6IQSJRkUKQUEGRYOBADs=";
var expandimg = "data:image/gif;base64,R0lGODlhDAAMAOYAAAAAAP///zAxMT9BQFxeXXh7eZKVkwIGAAMIAA8cBcvyq9PyutPxuxEfBdD6qsvwq8jpq9f3u9Ltug4dAMj+lMb6k8DulNL9qnHaAGvRAGvOAGXGAGbFAGXCAFOgAE+ZAD12ADpwADltAC9cAC9bAC1ZACxWACxVABw4AAwYAAwXAAECAA0ZAYj9DIn+DXvjDYz/D5T/JJL6JJX/Jpb/J4vrJIPcJKH+P6L/QZvxP639XajzXLz9eLfyeFGaADRhADJeAITxDA4VBhAZBRssACQ3BQIDACEtB7CwsAUFBQQEBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEsALAAAAAAMAAwAAAd6gEuCSglFRQ1KgooHJD4cHR9ACIpGIQwRmAsSIAdLSSQPDhdISA4KED9LQz4VFBQGBhUVFj4TRxo8Bbq7PR0oRxk6BMPEOxsoQh83ODgDAzc3OT4pSSY1MzQCAjEyNiOCKyJBMC4uLS8hRpQnHhgYHiWdioIqREQs84EAOw==";

nzbi = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvOg93bzoP/286DyJvOg9mbzoP/286D3dvOg/dbzoP/286D/9vOg//bzoPu286D7tvOg//bzoP/286D91vOg8ibzoPd286D/9vOg8ibzoPqm86D/9vOg93bzoPqm86D/9vOg8iAAAAAAAAAABvOg+7bzoP3W86DxFvOg/ubzoPiG86D3dvOg//bzoPM286D+5vOg//bzoPd286D1VvOg//bzoPdwAAAAAAAAAAbzoPu286D90AAAAAbzoPu286D8xvOg93bzoP/286D3dvOg//bzoP/286D3dvOg8RbzoP7m86D8wAAAAAAAAAAG86D7tvOg/dAAAAAG86D7tvOg/dbzoPd286D/9vOg+7bzoP/286D/9vOg93AAAAAG86D6pvOg//bzoPEQAAAABvOg+7bzoP3QAAAABvOg/ubzoPqm86D3dvOg//bzoP/286D/9vOg//bzoPdwAAAABvOg9VbzoP/286D3cAAAAAbzoPu286D/9vOg//bzoP7m86DzNvOg93bzoP/286D/9vOg+qbzoP/286D3cAAAAAbzoPEW86D/9vOg+7AAAAAG86D7tvOg/dbzoPM286D/9vOg9VbzoPd286D/9vOg//bzoPZm86D/9vOg93AAAAAAAAAABvOg+qbzoP/286DxFvOg+7bzoP3QAAAABvOg//bzoPd286D3dvOg//bzoP7m86DyJvOg//bzoPdwAAAAAAAAAAbzoPZm86D/9vOg93bzoPu286D91vOg8zbzoP/286D3dvOg93bzoP/286D4hvOg8ibzoP/286D3dvOg+7bzoP/286D/9vOg//bzoPmW86D7tvOg//bzoP/286D91vOg8iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD//wAAtAEAAKTkAACm5AAApmQAAIZkAACHYQAAhyUAAJclAACXpQAAlAEAAP//AAD//wAA//8AAA==";
isohunt = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39vX28e/5+fUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkimdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N/Mu6xmMwCgfl8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7+viadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYAAAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAAAADJvKtsPQujh2n7+/qUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj/l2NMAAAAAAAAAAADk1c5wQBGNZ0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNpNwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMAAAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC/rZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx/wAA8f8AAPH/AACR/wAAAf8AAAHHAACAxwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA//EAAP/wAAD/+QAA';
demonoid = 'data:image/gif;base64,R0lGODlhEAAQAMQAAGtuXomKhLOytKa3TdjY2HiHKLjLU5GiM8PXWsjIy7DDRaa6OZqrQ4iXNvn5+4iUSJydnElUEExPOmRvJenp67zPVn6JQr+/v560H7zApt7e4NDQ0ainrq/BT0JCQv///yH5BAAAAAAALAAAAAAQABAAAAWK4CeOZGmeo/d5LLq2XtexdL0sqsdU1YD8CMNAsWjkHhWDpYPgVRgHxUTkQRoqTctVQZRQG7wOY0Bm3BYR1sDAsEAuAQIFAngcMKyDJSCgfAQaDgICCRIFORwEGooECQQXGwIQLSsbggkfF30JEJMpABkAHBoQfBASKiQeFgWtrRNpJzQTtJQuNCYhADs=';
tpb = 'data:image/x-icon;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA/////////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBAv7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////AAA=';
kat = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUFLcyFLV74bO0UuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeQEthLmNy+DVzhf81c4X/NXOF/ydUYdscPEUdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTFeuN3WG/zh2iP84doj/OHaI/zh2iP84doj/M2t7/B9BS1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlS1ecPHmM/zx5jP88eYz/WIyc/3OfrP9BfI//PHmM/zx5jP83b4D9IEFLPgAAAAAAAAAAAAAAAAAAAAAiQ0wzPXiJ/kB9j/9AfY//XZGg//b5+v//////4uvu/2iZp/9AfY//QH2P/zNkcu4AAAAAAAAAAAAAAAAAAAAAMl1q2UWBlP9FgZT/RYGU/73T2f///////f7+//L29//p8PL/RYGU/0WBlP9FgZT/KUxXgAAAAAAAAAAAJ0ZPHUeBk/9Khpj/SoaY/0qGmP/b5+r//////7vR2P9Khpj/bp6t/0qGmP9Khpj/SoaY/zlndOcAAAAAAAAAAC9SXIBPi53/T4ud/0+Lnf9Pi53/0eHm///////F2d//T4ud/0+Lnf9Pi53/T4ud/0+Lnf9Mhpf/KEZPEgAAAAA4YGu+VJCh/1SQof9UkKH/VJCh/8HX3f//////6/L0/1SQof9UkKH/VJCh/1SQof9UkKH/VJCh/y9QWVwAAAAAQGp31lmUpv9ZlKb/aZ6u/5u/yv/W5en////////////C2N//3urt/3Smtf9ZlKb/WZSm/1mUpv81WWOIAAAAAENseNRemar/Xpmq/3Wntv////////////////////////////////+VvMf/Xpmq/16Zqv9emar/OFtlhAAAAABCaHS+Y52v/2Odr/9nn7H/iLTC/4Kxv//0+Pn//////6zL1f9jna//Y52v/2Odr/9jna//Y52v/zdXYVwAAAAAPF5od2ehsv9nobL/Z6Gy/2ehsv9nobL/xtzi///////f6+//Z6Gy/2ehsv9nobL/Z6Gy/2Wdrv80UVoSAAAAADZTXBJkmqr+a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9SfovlAAAAAAAAAAAAAAAAS3J9xG+ouf9vqLn/XIuZ9GGTovpvqLn/b6i5/2+ouf9gkqD5Zpqp/W+ouf9vqLn/QWJsdwAAAAAAAAAAAAAAADtZYhdbipfxQWJrbgAAAAAAAAAAR2t2p2CRn/dBYmtuAAAAAAAAAABGanSgVH6L3wAAAAAAAAAA/j8AAPgPAADwBwAA4AMAAMADAADAAQAAgAEAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIABAADAAQAAxjMAAA==';
bins = 'data:image/gif;base64,R0lGODlhEAAQAPcAAERCRMTCxHRydOTm5JSWlGRmZNza3Pz+/ExOTMzOzHx+fPTy9JyenAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAABwhWAAEIHEiwoMGDCBMoRFhwwYEDDAk+hBhR4EQGDhMUQDix4wCODwkgGPBQwcGJAhmEPPkw5UMGLA8IAJDg4UyDExcYeLgAwUGHAQLw3FixQAGfFZMqDQgAOw==';
torrentz = 'data:image/gif;base64,R0lGODlhEAAQAPcAAAQCBDRmnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAABwg/AAEEGEiwYEGBBhMqXJgQgEOHBx8KlAiRIMWLCAdipBhxY0WNHj8GCCmSZMaRJA8avNhxIkuLEDdGRIlRZcGAADs=';

function smgm_nfo_toggleList(anID)
{
	arrID = anID.split("||");
	theID = arrID[0].substr(1);
	title = arrID[1];
	
	if (document.getElementById('r' + theID))
		document.body.removeChild(document.getElementById('r' + theID));
	else
	{
		popDiv = document.createElement('div');
		popDiv.id = 'r' + theID;
		popDiv.setAttribute('style','text-align:left;width:150px;-moz-box-shadow: 3px 3px 5px #000;color:#000;padding:4px;top:0px;left:0px;background-color:#fff;font-size:8pt;font-family:verdana;position:absolute;z-index:30;border:1px solid #000;');

		//search engines
		if (NFOdefTO.match(/torrentz\.com/)==null) popDiv.appendChild(addSearch('Torrentz',torrentz,'http://www.torrentz.com/search?q=',title,''));
		if (NFOdefUN.match(/binsearch\.info/)==null) popDiv.appendChild(addSearch('Binsearch',bins,'http://binsearch.info/?q=',title,'&max=100&adv_age=1100&server='));
		if (NFOdefUN.match(/nzbindex\.nl/)==null) popDiv.appendChild(addSearch('NZBIndex.nl',nzbi,'http://nzbindex.nl/search?q=',title,''));
		if (NFOdefTO.match(/thepiratebay\.org/)==null) popDiv.appendChild(addSearch('thepiratebay',tpb,'https://thepiratebay.org/search/',title,'/0/99/0'));
		if (NFOdefTO.match(/kat\.ph/)==null) popDiv.appendChild(addSearch('KickAssTorrents',kat,'http://www.kat.ph/usearch/',title,'/'));
		if (NFOdefTO.match(/demonoid\.me/)==null) popDiv.appendChild(addSearch('Demonoid',demonoid,'http://www.demonoid.me/files/?query=',title,''));
		if (NFOdefTO.match(/isohunt\.com/)==null) popDiv.appendChild(addSearch('ISOHunt',isohunt,'http://isohunt.com/torrents/?ihq=',title,''));

		var pos = findPos(document.getElementById("n" + theID));
		popDiv.style.top = pos[1] + "px";
		popDiv.style.left = pos[0]+52+ "px";
		popDiv.addEventListener("click",function(){smgm_nfo_toggleList(this.id);},true);
		document.body.appendChild(popDiv);
	}
	document.getElementById("img_" + theID).src = (document.getElementById("r" + theID)) ? collapseimg : expandimg;
}

function addSearch(theSite,icon,queryString,title,extra)
{
	newBTN = document.createElement('div');
	newBTN.title = 'Search ' + theSite + ' for ' + title;
	newBTN.setAttribute("style","vertical-align:middle;margin-top:2px;margin-bottom:4px;");
	newLink = document.createElement('a');
	newLink.href = queryString + title + extra;
	newLink.target = "_blank";
	newLink.setAttribute('style','font-size:8pt;color:#03585F;text-decoration:none;');
	newLink.innerHTML = '<img class="none" title="Search ' + theSite + ' for ' + title + '" src="' + icon + '" style="width:14px !important; height:14px !important;margin-left:3px !important;margin-right:5px !important;" border="0"><span style="padding-left:5px !important;position:relative !important;top:-3px !important;border-left:1px solid #000 !important;">' + theSite + "</span>";
	newBTN.appendChild(newLink); 
	return newBTN;
}
function makeButtons(title,num,extra)
{
	newDiv = document.createElement('span');
	newDiv.id = "n" + num;
	//default buttons
	var uTitle = title;
	if (isNaN(extra)) extra = "";
	if (extra==2 && NFOdefUN.match(/binsearch\.info/)==null) extra="";
	var unLink = NFOdefUN.replace('[_T_]',uTitle) + extra;
	var unHTML = '<a href="' + unLink + '" target="_blank"><img alt="[u]" title="Search '+ uP +' for ' + title + '" src="' + uicon + '" style="margin-left:3px !important;margin-right:3px !important;padding:0px !important;border:none !important;"><\/a>';
	var torLink = NFOdefTO.replace('[_T_]',title);
	var torHTML = '<a href="' + torLink + '" target="_blank"><img alt="[t]" title="Search ' + tP +' for ' + title + '" src="' + ticon + '" style="margin-left:0px !important;margin-right:3px !important;padding:0px !important;border:none !important;"><\/a>';
	var theHTML = unHTML + torHTML;
	newSpan = document.createElement('span');
	newSpan.innerHTML = theHTML;
	newDiv.appendChild(newSpan);

	if (NFOPlusBut==1){ //draw plus button
		btn = document.createElement('span');
		btn.innerHTML = '<a href="javascript:void(0);"><img alt="[+]" title="More Search Options" id="img_' + num + '"style="border:none !important;margin-left:0px !important;padding:0px !important;" src="' + expandimg + '"></a>';
		btn.id = "t" + num + '||' + title;
		btn.addEventListener("click",function(){smgm_nfo_toggleList(this.id);},true);
		newDiv.appendChild(btn);
	}

	return newDiv;
}
//BTArena
if(document.location.href.indexOf('btarena.org') > -1) 
{
	var releases = document.evaluate('//h1[@class="storyTitle"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (releases.snapshotLength == 0)
		releases = document.evaluate('//h2', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i=0; i<releases.snapshotLength; i++)
		if (releases.snapshotItem(i).getElementsByTagName('a').item(0))
			getfullnameBTArena(releases.snapshotItem(i).getElementsByTagName('a').item(0),i);
}
//IRFree
else if(document.location.href.indexOf('irfree.com') > -1) 
{
	var thePosts = document.evaluate('//div[@class="page-content"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (thePosts.snapshotLength > 0) //main page
		var releases = document.evaluate('//h3', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	else
	{
		var thePosts = document.evaluate('//div[@class="entry"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (thePosts.snapshotLength > 0) //another page
			var releases = document.evaluate('//h1', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		else
		{
			var thePosts = document.evaluate('//div[@class="entry_content"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var releases = document.evaluate('//h2[@class="home"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		}
	}

	for (var i=0; i<thePosts.snapshotLength; i++)
	{
		thegoddamnimage = thePosts.snapshotItem(i).getElementsByTagName('img').item(0);
		thegoddamnimage.style.width = "25%"; //shrink the goddamn images
		thegoddamnimage.style.height = "25%"; 
	}	

	for (var i=0; i<releases.snapshotLength; i++)
		if (releases.snapshotItem(i).getElementsByTagName('a').item(0))
			getfullnameIRFree(releases.snapshotItem(i).getElementsByTagName('a').item(0),i);
}
//ps3news
else if(document.location.href.indexOf('pagename=nfo') > -1 && document.location.href.indexOf('ps3news') > -1) 
{ 
		var releases = document.getElementsByTagName("table");
		for (var i=3; i<releases.length; i++)
		{
			if (releases[i].getElementsByTagName("td").item(6))
				getfullnamePS3(releases[i].getElementsByTagName("td").item(3),i);		
		}

}

//rlslog
else if(document.location.href.indexOf('rlslog.net') > -1) 
{ 
	var releases = document.evaluate('//h3[@class="entrytitle"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<releases.snapshotLength; i++)
		getfullnameRL(releases.snapshotItem(i),i,false);
	//check for updates
	var entries = document.evaluate('//div[@class="entrybody"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var j=0; j<entries.snapshotLength; j++)
	{
		if (entries.snapshotItem(j).innerHTML.match(/<p>.*?<strong>.*?update.*?[:\*]/i))
		{
			i++;
			getfullnameRL(entries.snapshotItem(j),i,true);
		}
	}
}

//VCDQ
if(document.location.href.indexOf('vcdq.com') > -1) 
{ 
	var releases = document.evaluate('//td[@class="titleField"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<releases.snapshotLength; i++)
		if (releases.snapshotItem(i).getElementsByTagName('a').item(1))
			getfullnameVCDQ(releases.snapshotItem(i),i,1);
	var releaseonPage = document.evaluate('//dd[contains(@id, "title-")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<releaseonPage.snapshotLength; i++)
	{
		releaseonPage.snapshotItem(i).innerHTML = releaseonPage.snapshotItem(i).innerHTML.replace(/<br>/gi,'');
		getfullnameVCDQ(releaseonPage.snapshotItem(i),i+2020,2);
	}
	var dlLinks = document.evaluate('//td[@id="dlField"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<dlLinks.snapshotLength; i++)
		if (dlLinks.snapshotItem(i).getElementsByTagName('div').item(0))
		{
			var uTitle = dlLinks.snapshotItem(i).getElementsByTagName('div').item(0).getAttribute('alt').replace('Download ','');
			dlLinks.snapshotItem(i).getElementsByTagName('a').item(0).href = NFOdefUN.replace('[_T_]',uTitle);
			dlLinks.snapshotItem(i).setAttribute('title','Search '+uP+' for '+dlLinks.snapshotItem(i).getElementsByTagName('div').item(0).getAttribute('alt').replace('Download ',''));
		}
	var dlImgs = document.evaluate('//img[@src="/images/download.png"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<dlImgs.snapshotLength; i++)
	{
		var uTitle = dlImgs.snapshotItem(i).getAttribute('alt').replace('Download ','');
		dlImgs.snapshotItem(i).parentNode.href = NFOdefUN.replace('[_T_]',uTitle);
		dlImgs.snapshotItem(i).setAttribute('title','Search ' + uP + ' for ' + dlImgs.snapshotItem(i).getAttribute('alt').replace('Download ',''));
	}
}

//NFOHump	
//Get all links
else if(document.location.href.indexOf('nfohump.com') > -1) 
{
	var allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if(((window.location.pathname.toLowerCase() + window.location.search.toLowerCase()).indexOf('index.php?switchto=nfos&menu=quicknav&item=viewnfo') < 0) 
		&& (document.location.href.indexOf('nfohump') > -1)) { 
	//Main page

	//Widen group column so it all stays on one line
	document.getElementById("tgroup").style.width="15%";
	for(var i=0; i < allLinks.snapshotLength; i++) {
		var release = allLinks.snapshotItem(i);
	if (release.href.search('switchto=nfos&menu=quicknav&item=viewnfo&id') >= 0) {
		//Release name on main page
			release.setAttribute('id','newcolumn' + i);
			searchitem = release.innerHTML;
			searchitem = searchitem.replace(/\(c\)./g,"");
			searchitem = searchitem.replace(/:/g,"");
			searchitem = searchitem.replace(/\*/g,"");
			searchitem = searchitem.replace(/ /g,".");
			searchitem = searchitem.replace(/\u2013/g,"-");
			searchitem = searchitem.replace(/\.-\./g,"-");
			searchitem = searchitem.replace(/(\([0-9][0-9][0-9][0-9])\)\./g,"");
		if ((allLinks.snapshotItem(i-1).innerHTML.indexOf('XviD') >= 0) || (allLinks.snapshotItem(i-1).innerHTML.indexOf('DVD-') >= 0) || (allLinks.snapshotItem(i-1).innerHTML.indexOf('VCD') >= 0)) {
			//Type is DVD-R, Xvid, or VCD/SVCD, append that to link
			maintype = allLinks.snapshotItem(i-1).innerHTML.replace(/-/,"");
			searchitem = searchitem + '.' + maintype;
		}
		maingroup = allLinks.snapshotItem(i+1).innerHTML;
		searchitem = searchitem + '-' + maingroup;
		var dot = ((searchitem.length > 65) ? "..." : "");
		release.innerHTML = searchitem.substring(0,65) + dot;
		allLinks.snapshotItem(i).parentNode.appendChild(makeButtons(searchitem,i));
		}
	}

	}
	//NFO viewing page
	else {
		var releasetitle = document.getElementById('nfoViewTitle');
		function strip(title) {
				title.innerHTML = title.innerHTML.replace(/\(c\)./g,"");
				title.innerHTML = title.innerHTML.replace(/:/g,"");
				title.innerHTML = title.innerHTML.replace(/\*/g,"");
				title.innerHTML = title.innerHTML.replace(/ /g,".");
				title.innerHTML = title.innerHTML.replace(/\u2013/g,"-");
				title.innerHTML = title.innerHTML.replace(/\.-\./g,"-");
				title.innerHTML = title.innerHTML.replace(/(\([0-9][0-9][0-9][0-9])\)\./g,"");
		}
		if (releasetitle) {
			strip(releasetitle);
			for(var i=0; i < allLinks.snapshotLength; i++) {
				var group = allLinks.snapshotItem(i);
				var release = allLinks.snapshotItem(i);

				if (group.href.search('&group=') >= 0) {
					var groupname = group.innerHTML;
					if ((allLinks.snapshotItem(i+1).innerHTML.indexOf('DVD-') >= 0) || (allLinks.snapshotItem(i+1).innerHTML.indexOf('VCD') >= 0) || (allLinks.snapshotItem(i+1).innerHTML.indexOf('XviD') >= 0)) {
						var type = allLinks.snapshotItem(i+1).innerHTML.replace(/-/,"");
						releasetitle.innerHTML = releasetitle.innerHTML + '.' + type;
					}
				releasetitle.innerHTML = releasetitle.innerHTML + '-' + groupname;
				var rls = releasetitle.innerHTML
				releasetitle.appendChild(makeButtons(rls,i));

				}
			}
		}
	}
}
else if(document.location.href.indexOf('scnsrc.') > -1) //scnsrc
{
	var releases = document.evaluate('//div[@class="post"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<releases.snapshotLength; i++)
		getfullnameSCNSRC(releases.snapshotItem(i),i);
		
}
else if(document.location.href.indexOf('abgx.net') > -1) //abgx
{
	var releaseName = document.evaluate('//a[contains(@href,"www.ebgames.com")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<releaseName.snapshotLength; i++)
	{
		//if (!releaseName.snapshotItem(i).innerHTML.match('<'))
		{
			getfullnameABGX(releaseName.snapshotItem(i),i);
		}
	}
}
else if(document.location.href.indexOf('orlydb.') > -1) //orlydb
{
	document.getElementById('searchform').setAttribute('style','padding:10px;position:static;');
	var a = document.evaluate('.//a', document.getElementById('logo'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=a.snapshotLength-1; i>0; i--)
	{
		var newLink=document.createElement('a');
		newLink.setAttribute('style','font-size:13px;margin-left:10px;margin-right:4px;');
		newLink.href = a.snapshotItem(i).href;
		newLink.innerHTML =a.snapshotItem(i).innerHTML;
		if (i%11==0)
			document.getElementById('header').parentNode.insertBefore(document.createElement('p'),document.getElementById('header').nextSibling);
		document.getElementById('header').parentNode.insertBefore(newLink,document.getElementById('header').nextSibling);
	}
	document.getElementById('logo').innerHTML=a.snapshotItem(0).innerHTML;
	a = document.evaluate('//a[contains(@href, "filedroid.net")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<a.snapshotLength; i++)
		a.snapshotItem(i).parentNode.removeChild(a.snapshotItem(i));
	var releases = document.evaluate('//span[@class="release"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<releases.snapshotLength; i++)
		getfullnameORLY(releases.snapshotItem(i),i);
	var dlLinks = document.evaluate('//a[@class="dlright"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<dlLinks.snapshotLength; i++)
	{
		var uTitle = dlLinks.snapshotItem(i).href.substr(dlLinks.snapshotItem(i).href.indexOf('/dl/')).replace('/dl/','').replace("/","");
		var altTitle = uTitle;
		dlLinks.snapshotItem(i).href = NFOdefUN.replace('[_T_]',uTitle);
		dlLinks.snapshotItem(i).setAttribute('title','Search '+uP+' for '+altTitle);
		dlLinks.snapshotItem(i).setAttribute('target','_blank');
	}
}



function findPos(obj){
	var curleft = curtop = 0;
	if (obj.offsetParent){
		do{
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}

function scanPage()
{
	var badtags=['a','textarea','head','style','option','script','title','noscript'];
	var textStuff=".//text()[not(ancestor::"+badtags.join(') and not(ancestor::')+")]";
	var allText=document.evaluate(textStuff, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var releaseRE = /([^ \s\/]+?\.[^ \s\/]+?\.[^ \s\/]+-[\d\w]+)/gi;
	list = ""; match = 0; thisID = 500;
	for (j=0;j<allText.snapshotLength;j++)
	{
		while (aMatch=releaseRE.exec(allText.snapshotItem(j).textContent))
		{
			if (allText.snapshotItem(j).parentNode.name != "smgm_nfo")
			{
				newSpan = document.createElement('span');
				newSpan.id = "autoNFO" + thisID;
				newSpan.innerHTML = allText.snapshotItem(j).textContent.substr(0,aMatch.index) + "<a href='javascript:void(0);' title='Release Site Usenet/Torrent Searcher Discovered Link'>"+ aMatch[0].replace(/<.*?>/,'') + "</a>" + allText.snapshotItem(j).textContent.substr(aMatch.index+aMatch[0].length);
				allText.snapshotItem(j).parentNode.replaceChild(newSpan,allText.snapshotItem(j));
				newSpan.appendChild(makeButtons(aMatch[0],thisID));
			}
		}
		thisID++;
	}
}
if (NFOLinkify)
	scanPage();
	
function getfullnameRL(link,num,isUpdate)
{	
	if (!isUpdate){
		thelink = link.getElementsByTagName("a").item(0);
		fulltitle = thelink.innerHTML;
		fulltitle = fulltitle.substr(1);
		fulltitle = fulltitle.replace(/ {5}/g,"");
		fulltitle = fulltitle.replace(/ {4}/g,"");
		fulltitle = fulltitle.replace(/ /g,".");
		fulltitle = fulltitle.replace(/\u2013/g,"-");
		fulltitle = fulltitle.replace(/\.-\./g,"-");
		thelink.innerHTML = fulltitle;
		thelink.parentNode.appendChild(makeButtons(fulltitle,num));
	} else {
		var theMatches,matchType;
		
		var r1 = '<p>.*?<strong>.*?update.*?[:\*\s]+<\/strong>.*?<strong>(.*?)<';
		var r2 = '<p>.*?<strong>.*?update.*?[:\*]+(.*?)<\/';
		var r3 = '<p>.*?<strong>.*?update.*?[:\*][ \s]+.*>([\w].*?)<';
		var re1 = new RegExp(r1,'ig');
		var re2 = new RegExp(r2,'ig');
		var re3 = new RegExp(r2,'ig');
		if (link.innerHTML.match(re3)) theMatches = link.innerHTML.match(re3);
		else if (link.innerHTML.match(re1)) theMatches = link.innerHTML.match(re1);
		else if (link.innerHTML.match(re2)) theMatches = link.innerHTML.match(re2);
		re1 = new RegExp(r1,'i');
		re2 = new RegExp(r2,'i');
		re3 = new RegExp(r2,'i');
		for (var k=0;k<theMatches.length;k++)
		{
			if (theMatches[k].match(re3)) 
				matchType = 3; 
			else if (theMatches[k].match(re1)) 
				matchType = 1; 
			else if (theMatches[k].match(re2)) 
				matchType = 2; 
			if (matchType == 1) fulltitle = unescape(theMatches[k].match(re1)[1]);				
			if (matchType == 2) fulltitle = unescape(theMatches[k].match(re2)[1]);
			if (matchType == 3) fulltitle = unescape(theMatches[k].match(re3)[1]);
			newlink = document.createElement('div');
			newlink.setAttribute("style","color:#0792D3;padding:2px;font-size:12pt;font-weight:bold;");
			thelink = link.parentNode.insertBefore(newlink,link);
			fulltitle = fulltitle.trim().replace(/<(.|\n)*?>/gi,'');
			fulltitle = fulltitle.replace(/ {5}/g,"");
			fulltitle = fulltitle.replace(/ {4}/g,"");
			fulltitle = fulltitle.replace(/ /g,".");
			fulltitle = fulltitle.replace(/\u2013/g,"-");
			fulltitle = fulltitle.replace(/\.-\./g,"-");
			thelink.innerHTML = "UPDATE: <a href=\"javascript:void(0);\">" + fulltitle + "</a>";
			thelink.appendChild(makeButtons(fulltitle,num+((k+4)*34))) ;			
		}
	}
}

function getfullnameVCDQ(link,num,onPage)
{	
		thelink = (onPage==1) ? link.getElementsByTagName("a").item(1) : link;
		thelink.name = "smgm_nfo";
		fulltitle = thelink.innerHTML;
		if (fulltitle.substr(0,3) == "<b>") fulltitle = fulltitle.substr(3);
		thelink.innerHTML = fulltitle;
		(onPage==1) ? thelink.parentNode.appendChild(makeButtons(fulltitle,num)) : thelink.appendChild(makeButtons(fulltitle,num));
}
function getfullnameSCNSRC(link,num)
{	
	thelink = link.getElementsByTagName("a").item(0);
	thelink.name = "smgm_nfo";
	fulltitle = link.innerHTML.match(/\<a[^<]+?dex\.nl[^<]+?\?q=([^<]+?)\"/i);
	if (!fulltitle)
		fulltitle = link.innerHTML.match(/<a[^<]+?\/all\/%21([^<]+?)\"/i);
	if (fulltitle)
	{
		fulltitle = fulltitle[1].replace(/%20/g,".");
		fulltitle = fulltitle.replace(/\u2013/g,"-");
		fulltitle = fulltitle.replace(/\.-\./g,"-");
		thelink.parentNode.insertBefore(makeButtons(fulltitle,num),thelink.nextSibling);
	}
}
function getfullnamePS3(link,num)
{	
	link.align = "left";
	link.width = "90%";
	thelink = link.getElementsByTagName("font").item(0);
	thelink.name = "smgm_nfo";
	fulltitle = thelink.innerHTML;
	fulltitle = fulltitle.replace(/ /g,".");
	fulltitle = fulltitle.replace(/\u2013/g,"-");
	fulltitle = fulltitle.replace(/\.-\./g,"-");
	thelink.innerHTML = fulltitle;
	link.appendChild(makeButtons(fulltitle,num,2));
}
function getfullnameIRFree(link,num)
{	
	method = 1;
	GM_xmlhttpRequest({
	method:"GET",
	headers:{"User-Agent":"monkeyagent"},
	url:link.href,
	onload:function(details)
	{
		fulltitle = details.responseText.match(/<p>Filename: (.*?)<br \/>/);
		if (!fulltitle)
			fulltitle = details.responseText.match(/<a href.*?filesonic\.com\/file\/.*?\/(.*?)\" /);
		if (fulltitle)
		{
			fulltitle = fulltitle[1];
			fulltitle = fulltitle.substr(0,fulltitle.lastIndexOf('.'));
			link.name = "smgm_nfo";
			link.parentNode.insertBefore(makeButtons(fulltitle,num),link.nextSibling);
		}
	}
	})
}
function getfullnameBTArena(link,num)
{	
	GM_xmlhttpRequest({
	method:"GET",
	url:link.href,
	onload:function(details)
	{
		fulltitle = details.responseText.match(/<div class="realStory">.*?<strong>(.*?)<\/strong>/);
		if (fulltitle)
		{
			fulltitle = details.responseText.match(/<div class="realStory">.*?<strong>(.*?)<\/strong>/)[1];
			link.name = "smgm_nfo";
			link.parentNode.insertBefore(makeButtons(fulltitle,num),link.nextSibling);
		}
	}
	})
}
function getfullnameORLY(link,num)
{	
			fulltitle = link.innerHTML;
			fulltitle = fulltitle.replace(/ /g,".");
			fulltitle = fulltitle.replace(/_/g,".");
			fulltitle = fulltitle.replace(/\u2013/g,"-");
			fulltitle = fulltitle.replace(/\.-\./g,"-");
			link.innerHTML = fulltitle;
			link.name = "smgm_nfo";
			link.parentNode.insertBefore(makeButtons(fulltitle,num),link.nextSibling);
}
function getfullnameABGX(link,num)
{	
			fulltitle = link.innerHTML;
			fulltitle = fulltitle.replace(/ /g,".");
			fulltitle = fulltitle.replace(/_/g,".");
			fulltitle = fulltitle.replace(/\u2013/g,"-");
			fulltitle = fulltitle.replace(/\.-\./g,"-");
			fulltitle = fulltitle.replace(/<(.|\n)*?>/gi,'');

			link.innerHTML = fulltitle;
			link.name = "smgm_nfo";
			link.parentNode.insertBefore(makeButtons(fulltitle,num),link.nextSibling);
}
