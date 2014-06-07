// ==UserScript==
// @name        ProBoards Quick Reply Tweaker
// @namespace   Smiths
// @description	Adds buttons to ProBoards' Quick Reply area so you can apply quick formatting. Has "quick quote" button as well to quote only selected text. Modifies replies for easy thread navigation via anchors.
// @include     http://*.proboards.com/*
// @include     https://*.proboards.com/*
// @version     0.7.7
// @grant       GM_getValue
// @grant   	GM_setValue
// @grant		GM_addStyle
// @grant		GM_log
// @grant  		GM_xmlhttpRequest
// @attribution	changes [d:10.22.12][u:<ul><li>Quick fix for quoting people with Quick Reply Buttons who have HTML in their usernames. Fancy people.</li></ul>]
// ==/UserScript==

//note to self: gotta make sure to update the one in the metadata too!
var v = "0.7.7";
var scriptNum = "138851";
var scriptName = "ProBoards Quick Reply Tweaker";

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

//Script Start
var quoteIMG = 'data:image/gif;base64,R0lGODlhEwAQAPcAAAAAAP///0JCSVFRWEBARTc3Ozk5PS4uMCwsLcvO77m71K6wx62vxqqsw8PF3YCBkHh5hVVizFpmzWFtz2Ju0HqE14aP2p+m4qKp46yy5qiu4a6056+157G36Kyx3bO45Le86auv2bm+6rq/6ri957W65LzB673C67u/6aerzqquz8XJ7cTI7MDE573B5KOmxKiryZCTrcfL7sfL7cLG6KmsysjM7srO77G00bq92MjL5sXI473A2by/2Lu+19PW8tLV8c7R7MvO6cXI4ouNn4KEldXY89TX8tPW8dDT7czP6cvO56OlupaYq9bZ89XY8tHU7c/S687R6tjb9Nfa89bZ8tXY8dPW75aYqZyer2Rlb2Nkbj9NtTxIpztHpTpGojtHpDlEnUpYyVdkzVhlzT9IkVtozlxpzl5rzmJuz2Rw0IyV3Jef4Jig4Jqi4aOq46Ws5Kat5Keu46et3bO56Kqw3LS66LK45ra86bW76K2z3rS65rC127vA6L/E7MDF7LS53bK325SYtsLH7cDF66GlxcPI7cLH7MLG5pSXr8vP78nN7Y2Qps3R8MvP7r/D4GRmdc7S8MzQ7sbK57/D39DU8c/T8M7S78bK5sLG4dDU8MvP68TI49HV8a+yyayvxqCjuJibr7y/17Czym5wfsDD27G0yq2wxba5z9PW7szP57e6z9nc9IGDkdjb8tfa8dve9N3g9VFSWt7h9YKGnauvyJKVqKSnuWhqdeHk9kJDSD4/QzU2OC0uLyUlJf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAL8ALAAAAAATABAAAAj/AHPNGkiQYKyDsWAphKUoIZUqVay8euUK4pMnSIBoAnKjAqyHqW6pWoVKCpQkp3T46DEpCAoKH69AOJClVysHS7D40rJrV61HJdTAchLlAK8Bvh6YKsXEly4Dvhjh0JOGlRMlBBDI8rWlgagmvkgVEBCjRp0JrI4IGUXEFq5Qn3iAKpIIEi1BKuagYfUjyBAFCxh46rGDUw4YLwqlCKThzJROlzZhykTpESIaLVwA4hPCwwc5Zh5XsmRJkqNFM1gcItSHxJ47eeBIcFIpUiNFMlYYGvTnxAg8dDhw6IBhjJFGN2ys4H3ChAgQdjpwyJCBw4UIP5Tv9o0nOocNG6hXN79eKbluPyZAAO/Avj0eOGQScIgD580FN23YtNnPv42bNWJYwIUXXXjhxRdfgKHgggp6EUYZAQEAOw==';
var cbbIMG = 'data:image/gif;base64,R0lGODlhGgAWAPcAAAAAAP///yoqKTIyMS8vLiwsKysrKj09PDw8Ozo6OTk5ODg4Nzc3NjY2NTU1NDQ0M6qqqKenpaampKKioKGhn5ycmo+PjVVVVFNTUvj49vf39fb29PX18/T08vPz8fLy8PHx7/Dw7u/v7e7u7O3t6+zs6uvr6erq6Onp5+jo5ufn5ebm5OXl4+Tk4uPj4eLi4OHh3+Dg3t/f3d7e3N3d29zc2tvb2djY1tLS0NDQzs3Ny8zMysrKyMfHxcXFw8PDwcLCwL6+vLi4tre3tba2tLW1s7S0srOzsbKysLGxr6+vra6urKysqqurqXZ2dXV1dF9fXl5eXV1dXFxcW1tbWvr6+fn5+Pj49/f39vb29fX19PT08/Pz8vLy8fHx8PDw7+/v7u3t7Ozs6+jo59ra2dnZ2NjY187OzcjIx8DAv76+vbi4t7e3tra2tbW1tLS0s7OzsrKysbGxsK+vrq6uraysq6qqqampqKiop6ampaWlpKSko6OjoqKioZ6enZqamZaWlZSUk5OTkpKSkZGRkJCQj46OjY2NjIyMi4uLioqKiYmJiIiIh/r6+vn5+fj4+Pb29r+/v7W1tbCwsK6urqOjo4iIiFtbWzw8PDs7Ozo6Ojk5OTg4ODc3NzY2NjU1NTIyMi4uLi0tLSsrKyoqKikpKSgoKCcnJyYmJiQkJP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKoALAAAAAAaABYAAAj/ABtVGUiw4EBHjqwotPLoypUMWLR8sHIFi8WLGCFpzJJlgxYOWzpw8fBFSAYNHFOm3ODxY8iRXT6AABECByAsHVMeODCKlKedmDBpImCKEwIQX0KIyBEIpxYtLHf2/Hkg6NCiCJSOKHFGEJaWH9esiROHCBs2Q9q4kaPEiBESJEqc0DEI0kcOeLfoJdUgKCYECUIphWsCxZgdhLJo0au3g2O+fgGH2nriBIoUKngUysLBseORHia9aSPJjRsjc+SOGaNiBQs0FjZs4UKbS1ADAj4hQJApkwJRqBoocN3CRQ9DGzp4WO7hdu7dvX8HV1D8BQwfhzh4+MD9g2klSo4Y7YETJwmdOxGaNLEeQ8YPRNo/eJmptdSDBAk2KWBQ4EV7GTPMQAMQiXQgE31xmWAffvrxJwMNNUBYgw1pKGJgCEqJYNkYENSxRB1M2IEHHxOSYQMZKEayCBcgiDBCXJtsYsopAyzQCQMMOEBKKqB8UoYZQKphSRcikGCCZTHOWOONOe7Y4w1Q3hAEIyCIsaEKTDSxBx965CHBHpX04UcFFEwQpZSMgGECaysUBwOAJZpx5pxohnGCay7AEMMME/5IJ51TorDDGkMU8cYRScxBCR2MNuqoo388gYQTUEQhxRSXXELFppx26ikVF2AQEAA7';
var smallIMG = 'data:image/gif;base64,R0lGODdhGgAWAOcAALKysHZ2dV9fXl5eXV1dXFxcW1tbW1tbWlVVVFNTUunp58zMyri4t7e3tbW1s7S0s7OzsbGxr6+vrq6urq6urZqamXV1dO3t7Orq6Obm5OXl4+Pj4eHh3+Dg3t7e3Nzc2tvb2dnZ2NjY19jY1r6+vIiIh+/v7uvr6ejo5+fn5eTk4t/f3dra2fHx7+zs6+Li4N3d2/Ly8e/v7e3t61BQUA0NDQAAAF5eXjg4OK2trCsrK1hYV/Pz8mxsaxsbGhwcG3JycdnZ16Cgn+zs6iwsK76+vYiIiPT08vLy8PDw7szMy7Ozsqysqg4ODTs7Oh0dHXd3dr+/v4mJiG5ubUVFRampqKqqqaysqzk5OXR0c8HBwNLS0Ds7O9PT0cDAv4qKifX18/Pz8cPDwSoqKjk5OM7OzSwsLEtLSlpaWfHx8MLCwIuLioKCgGdnZllZWJeXlrW1tIyMi/b29BwcHA4ODrS0sjw8PMXFw42NjPT086OjopaWlMfHxY6Ojfb29ZOTkkpKSpaWlsjIx4+PjfX19Ojo5srKyJCQj/b29nl5eJGRkPf39tTU0tXV083Ny5KSke7u7MXFxPDw79DQzpSUk/j49vf39ZaWlfn5+Pj497i4tvr6+vr6+fn5+fj4+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAGgAWAAAI/gA3cRpIsODATp0wKcTkKVOmSosIIcGUaZHFixgRafTjRw4hMHmO8AgjSVMlSxxTppTj8WPIkTGQtGiRZMulRR1VcmzpUmSYmC0kJZExiRJOQpBkJGmBJEYkHkfygCFElaVVQkPK/FnkccgMpS0Y2WgENY9UqmipYnD0CNFHBSe+JkFjI1GYslLB6N2LYoEiP4TyFFKAYUYHOjboIAlz90hUs5BTGDrkB8yRDClQYPhjA9CTQE0ZQ3VMWoOgQXLy8FChIQOKOTb07DHDNLRoHrg38Okj50iYFxtUXLEx54QHOnVmIlkeww7jMBzu4AETBkkHDi8Q2GCjuY0bsDPf/NiAs3yFmDjUkXjwIMaGjTFksOiwUUZuEjNn0LRIA0PNmiMyffDBFDZQUYUVTFyBRRYYeKWFDVtw0UULIHjxBYBJsKBEDTYssUIHwDHRRAia7WCDE09AkWEUUvDQggwi9GCDDyB8AMOHHPwARAZB2CBEg0SsIEIRRsQgwww0cFjDDSzUCEMC7r2Agw05oMCCDjuMQEIJLbiAgQIopKCBCi9wsIIHMIDAQggijODmm1qWYMIJYWagwgZmevCBmm3C6eeWF2CQgQZ4dqAnCGz6qWicCizAQAMOPABBBBJMQMGlmGaaaQUWABCAAAMQUIABBhxg6qmopnoAAgkEBAA7';
var downarrow = 'data:image/gif;base64,R0lGODlhEAAOAOZ8AGzSOGbMMxp3Gn3fQ060J1m/KxiJFRqIF1S6KRt3HK3UpsnW0x2XGzunO8/pz+/x8ladXFOyMYu0kmrQNofMaR54H2HHL3rdQ4rEfOLl6zCUKWm+Smq7T47DhBqDGNDW38DOzLPlkoHkSBl9F63Spcvpy4a1lT23IzqcQXbLUGXKM2DBNHfYPWTHN4zHeWfNMh95Im3TN6DOlC+iK4HZTy2nH02VTejo71G2Kn6yiJ/Rn125O128NoOyhiyjIi2ELaTCry2XLnPaQW3TOUexJVi+K+7w9Gu3VHzfQ1GdW0CePxh6GIixkWi2UG3MPkKTP3W6Yla1M4HQW2DGMF3IMh6OIVyzQIjIcHG4X9Pnzvj4+3WdgmWtVi6RMGe6Sx6SGXTYPxmAGObp7mvBSTOVIlvBLJTKhVXCMIbJbH68cGjONNvg54vQbJPabHTZP13DLk61Jm7UOmG3RCKWH266V2PJMODv4HDGS+7u85rYelK5KZDUcf///wAAAAAAAAAAACH5BAEAAHwALAAAAAAQAA4AAAeagHyCg4SFglswFQkCSyNhHgcGX3M6gjZZCjJmLldoFGx7eSEzgj0kHWlQdBwbY3cpUm0NggtPGFhNcjs8Ky1ONDUlgloSXEdWUXoFUwEAVEk3g2I/XhFwRRZqQ0gMH4VAZDgIb80XJyaGRhAEZXUTYEIoa4Z8GRoqL3EiPiD0gkxEYrg5kwOPPz4PurAYUOXgIDtKgjhwSJFPIAA7';
var maxwidth = 800;

//quick reply Box
var qrBox, postsTable,thePosts;
function addQRBarAndOtherStuff(){
	qrBox = (document.evaluate) ? document.evaluate("//textarea[@name='message']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) : getanElementByName('textarea','message')[0];
	//Get posts regardless of logged-in status
	//Long words break table BAD
	var postTDs = getElementsByStuff("td","colspan","3");
	var maxLen = 35;
	for (var k=0;k<postTDs.length;k++)
		if (postTDs[k].getElementsByTagName("hr").item(0))
		{
			postTDs[k].innerHTML=postTDs[k].innerHTML.replace(/(<.*?>)/g," $1 ");
			var words = postTDs[k].innerHTML.split(" ");
			for (var j=0;j<words.length;j++)
			{
				if (words[j].length > maxLen && !words[j].match(/.*?=\".*?\"/))
				{
					var chunks = [];
					for (var i = 0; i < words[j].length; i += maxLen)
						chunks.push(words[j].substring(i, i + maxLen));
					words[j] = chunks.join(" ");
				}
			}
			postTDs[k].innerHTML = words.join(" ");
		}
	thePosts = getElementsByStuff("tr","id","tr_post");
	if (document.location.href.match(/action=display/i) && !document.getElementById('rrc'))
	{
		var bottomofPage="";
		var theTables = getElementsByStuff("table","class","bordercolor");
		for (var i=0;i<theTables.length;i++)
			if (theTables[i].getElementsByTagName('table').item(0))
				if (theTables[i].getElementsByTagName('table').item(0).getElementsByTagName('td').item(0))
					if (theTables[i].getElementsByTagName('table').item(0).getElementsByTagName('td').item(0).innerHTML.toLowerCase().indexOf('quick reply') > -1)
						bottomofPage = theTables[i];
		if (bottomofPage=="") bottomofPage = document.getElementById('forumjump');
		var bottomDiv = document.createElement('div');
		bottomDiv.name = "new";
		bottomDiv.id = "rrc";
		bottomDiv.setAttribute('style','width:100%;padding:8px;font-size:12pt;font-weight:bold;text-align:center;');
		var theURL;
		if (getElementsByStuff("a","href","action=login").length == 0)
			theURL = location.href.match(/#/) ? location.href.substr(0,location.href.indexOf('#')).replace('display','gotonewpost') : location.href.replace('display','gotonewpost');
		else
			theURL = location.href;
		bottomDiv.innerHTML = "<center><a style='font-size:12pt;font-weight:bold;text-align:center;' href='"+theURL+"'>Redisplay/refresh comments</a></center>";
		bottomofPage.parentNode.insertBefore(bottomDiv,bottomofPage);

		for (var k=0;k<thePosts.length;k++)
		{
			aPost = thePosts[k];
			//scan for images in posts
			var imagesinpost = aPost.getElementsByTagName('img');
			for (var j=0;j<imagesinpost.length;j++)
			{
				if (imagesinpost[j].src.indexOf('proboards.com') < 0 && imagesinpost[j].src.indexOf('data:') < 0)
				{
					theIMG = imagesinpost[j];
					if (theIMG.width > maxwidth)
					{
						var orH,orW,arPer;
						orH = theIMG.height;
						orW = theIMG.width;
						theIMG.height = (maxwidth/theIMG.width) * theIMG.height;
						theIMG.width = maxwidth;
						arPer = Math.round((theIMG.width/orW)*100) + "%";
						theIMG.title = "Image scaled down " + arPer + " (" + orW + "x"+orH+" -> "+theIMG.width+"x"+theIMG.height+"), click to view original in new window";
						if (theIMG.addEventListener){
							theIMG.setAttribute('style','cursor:pointer;');
							theIMG.addEventListener('click', function(){window.open(this.src);}, false);
						} else if (theIMG.attachEvent){
							theIMG.style.cursor = 'pointer';
							(function(theIMG){theIMG.attachEvent("onclick", function(){window.open(theIMG.src);});})(theIMG);
						}						
					}
					
				}
			}
			//embedded Youtube resizing
			var vidsinpost = aPost.getElementsByTagName('embed');
			for (var j=0;j<vidsinpost.length;j++)
			{			
				theVid = vidsinpost[j];
				theVid.id = 'embedv_'+k+"_"+j;
				var sizeDiv = document.createElement('div');
				sizeDiv.id = 'bembedv_'+k+"_"+j;
				sizeDiv.style.padding = '0px';
				sizeDiv.style.width = '350px';
				sizeDiv.style.fontSize = '10pt';
				sizeDiv.style.border = '1px solid #000';
				sizeDiv.style.textAlign = 'center';
				('style','color:#ffffff;background-color:#000000;padding:0px !important;font-size:10pt !important;width:350px;border:1px solid #000000 !important;text-align:center !important');
				sizeDiv.innerHTML = "<span style='padding-left:3px !important;float:left !important;'>Video Size:</span>";
				var sSpan = document.createElement('span');
				sSpan.innerHTML = "<a href=\"javascript:void(0);\">Default</a>";
				sSpan.id = 'sembedv_'+k+"_"+j;
				sSpan.style.padding = "6px";
				if (sSpan.addEventListener){
					sSpan.addEventListener('click', function(){document.getElementById('b'+this.id.substr(1)).style.width='350px';document.getElementById(this.id.substr(1)).setAttribute('height','287');document.getElementById(this.id.substr(1)).setAttribute('width','350');}, false);
				} else if (sSpan.attachEvent){
					(function(sSpan){sSpan.attachEvent("onclick", function() {document.getElementById('b'+sSpan.id.substr(1)).style.width='350px';document.getElementById(sSpan.id.substr(1)).setAttribute('height','287');document.getElementById(sSpan.id.substr(1)).setAttribute('width','350');});})(sSpan);
				}
				sizeDiv.appendChild(sSpan);
				var sSpan = document.createElement('span');
				sSpan.innerHTML = "<a href=\"javascript:void(0);\">Medium</a>";
				sSpan.style.padding = "6px";
				sSpan.id = 'membedv_'+k+"_"+j;
				if (sSpan.addEventListener){
					sSpan.addEventListener('click', function(){document.getElementById('b'+this.id.substr(1)).style.width='560px';document.getElementById(this.id.substr(1)).setAttribute('height','420');document.getElementById(this.id.substr(1)).setAttribute('width','560');}, false);
				} else if (sSpan.attachEvent){
					(function(sSpan){sSpan.attachEvent("onclick", function() {document.getElementById('b'+sSpan.id.substr(1)).style.width='560px';document.getElementById(sSpan.id.substr(1)).setAttribute('height','420');document.getElementById(sSpan.id.substr(1)).setAttribute('width','560');});})(sSpan);
				}
				sizeDiv.appendChild(sSpan);		
				var sSpan = document.createElement('span');
				sSpan.innerHTML = "<a href=\"javascript:void(0);\">Large</a>";
				sSpan.style.padding = "6px";
				sSpan.id = 'lembedv_'+k+"_"+j;
				if (sSpan.addEventListener){
					sSpan.addEventListener('click', function(){document.getElementById('b'+this.id.substr(1)).style.width='750px';document.getElementById(this.id.substr(1)).setAttribute('height','563');document.getElementById(this.id.substr(1)).setAttribute('width','750');}, false);
				} else if (sSpan.attachEvent){
					(function(sSpan){sSpan.attachEvent("onclick", function() {document.getElementById('b'+sSpan.id.substr(1)).style.width='750px';document.getElementById(sSpan.id.substr(1)).setAttribute('height','563');document.getElementById(sSpan.id.substr(1)).setAttribute('width','750');});})(sSpan);
				}
				sizeDiv.appendChild(sSpan);	
				theVid.parentNode.insertBefore(sizeDiv,theVid.nextSibling);
			}
		}
	}
	if (!document.getElementById('sFont') && qrBox && document.location.href.match(/action=display/i))	//Greasemonkey script not in use, let's do stuff to the page
	{
		qrBox = (document.evaluate) ? document.evaluate("//textarea[@name='message']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) : getanElementByName('textarea','message')[0];
		if (document.evaluate) //NS
			qrBox = document.evaluate("//textarea[@name='message']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		qrBox.setAttribute('rows',10);
		qrBox.id = "QuickReplyBox";
		for (var k=0;k<thePosts.length;k++)
		{
			aPost = thePosts[k];
			thePostNum = aPost.id.substr(7);
			theUser = escape(aPost.getElementsByTagName('a').item(2).innerHTML.replace(/<(.|\n)*?>/gi,''));
			theBoard = escape(location.href.match(/board=(.*?)&/i)[1]);
			theThread = location.href.match(/thread=(\d+)/i)[1];
			thePostTime = aPost.getElementsByTagName('a').item(1).name;
			var theButtonRow = getElementsByStuff("img","src","quote",aPost.id)[0];
			var quickquoteBTN = document.createElement('a');
			var anID = theUser + "@_@" + thePostNum + "@_@" + thePostTime + "@_@" + theBoard + "@_@" + theThread;
			quickquoteBTN.id = anID;
			quickquoteBTN.href = "javascript:void(0);";
			quickquoteBTN.innerHTML = "<img title='Quick Quote' alt='Quote' style='border:none;margin-right:10px;' src='" + quoteIMG + "'>";
			if (quickquoteBTN.addEventListener){
				quickquoteBTN.addEventListener('click', function(){doaction('quote',this.id);}, false);
			} else if (quickquoteBTN.attachEvent){
				(function(quickquoteBTN){quickquoteBTN.attachEvent("onclick", function() { doaction('quote',quickquoteBTN.id); });})(quickquoteBTN);
			}
			theButtonRow.parentNode.insertBefore(quickquoteBTN,theButtonRow);

			//scan for quoted posts
			var linksinpost = getElementsByStuff("a","href","thread="+theThread,aPost.id);
			for (var j=0;j<linksinpost.length;j++)
			{				
				aLink = linksinpost[j];
				if (aLink.href.indexOf('action=display') > -1 || aLink.href.indexOf('action=gotopost') > -1)
				{
					if ((aLink.href.indexOf('#') > -1 && aLink.href.match(/#([^<]+)/)) || aLink.href.indexOf('&post=') > -1)
					{
						var oldPost="";
						theanchor = (aLink.href.indexOf('#') > -1) ? aLink.href.match(/#([^<]+)/)[1] : aLink.href.match(/&post=(\d+)/)[1];
						if (getElementsByStuff("a","name",theanchor,aPost.id).length > 0) //search for post on same page
							oldPost = getElementsByStuff("a","name",theanchor,aPost.id)[0].name;
						if (oldPost == theanchor || document.getElementById('tr_post' + theanchor))	{ //post is on this page
							aLink.target = '';
							aLink.setAttribute('title','Click to jump to original post');
							aLink.name = aPost.id + '___tr_post' + theanchor;
							aLink.setAttribute('href',location.href.substr(0,location.href.indexOf('#')) + '#' +theanchor);
							if (aLink.addEventListener){
								aLink.addEventListener('click', function(){followquote(this.name);}, false);
							} else if (aLink.attachEvent){
								(function(aLink){aLink.attachEvent("onclick", function(){followquote(aLink.name);});})(aLink);
							}
						}else{ //post on diff page
							aLink.innerHTML += " <img style='border:none;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAB3RJTUUH2AwSDAEgJjauGgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAFcSURBVHjabVA7qsJQFJwkVyWFYikKdpa6HbGyMoVkL2lsFAMiWYSVhZgVCPZaCCLGRjHxd59zII9H8qa53/mcMZDBYrHQ+/0ej8cDpVIJWuvfN57r9TpUlnQ4HNDtdlGpVPD5fGCaptxzv9vtsFqt8iQ62LaN9/sNx3Hkc7VaxeVywWw2w3K5zJNerxcKhYLsJ5MJLMtCv98XIpEkCVQYhnq73cIwDCil5JLgLCS4rovpdIrhcCiuFFSbzQa9Xk+yF4tFzOdz3O93ich4o9FIyBTkH8ZXVObQf+ORMBgMJB4TEJ7nyUons1wuy4HqBAu43W4Yj8dCoAjBFFEUiZvKNtbpdCQiFTkXBWq1Gs7ns0Rst9uA7/v6+XzqFF+i/orInmsQBDrbsMlG0tx0pH1aOZWPxyP+JaUPzJ2CM55OJzQajRxJNZtNrNdrXK9XxHEsg7NizshmW61WjvQDnNjJUsseLXoAAAAASUVORK5CYII=' alt='New Window'>";
							aLink.title = 'Quote comes from previous page, click to open in new window';
						}
					}
				}	
			}
			
		}
		newAsst('[b]','Bold',"http://images.proboards.com/new/bold.png");
		newAsst('[i]','Italics',"http://images.proboards.com/new/italicize.png");
		newAsst('[u]','Underline',"http://images.proboards.com/new/underline.png");
		newAsst('[s]','Strike',"http://images.proboards.com/new/strike.png");
		newAsst('[sup]','Superscript',"http://images.proboards.com/new/sup.png");
		newAsst('[sub]','Subscript',"http://images.proboards.com/new/sub.png");
		newAsst('[size=5]','Big',"http://images.proboards.com/new/size.png");
		newAsst('[size=1]','Small',smallIMG);
		newAsst('[pre]','Preformatted Text',"http://images.proboards.com/new/pre.png");
		newAsst('[code]','Code',"http://images.proboards.com/new/code.png");
		newAsst('[center]','Center',"http://images.proboards.com/new/center.png");
		newAsst('[move]','Marquee',"http://images.proboards.com/new/move.png");
		newAsst('[url]','Link',"http://images.proboards.com/new/url.png");
		newAsst('[youtube]','Youtube',"http://images.proboards.com/new/youtube2.png");
		newAsst('[img]','Image',"http://images.proboards.com/new/img.png");
		newAsst('[center],[size=5],[b]','Center big bold',cbbIMG);

		var fSizeArray =['Size','1','2','3','4','5','6'];
		var fFontArray =['Font','Arial','Blackadder ITC','Bradley Hand ITC','Century Gothic','Comic Sans MS','Copperplate Gothic Bold','Cordia New','Courier New','Curlz MT','Cursive','Edwardian Script ITC','Felix Titling','Freestyle Script','French Script MT','Garamond','Georgia','Impact','Kartika','Kristen ITC','Lucida Console','Miriam Fixed','Mistral','Monospace','Monotype Corsiva','Palatino Linotype','Papyrus','Simplified Arabic Fixed','Simsun','Sylfaen','Tahoma','Times New Roman','Verdana','Vivaldi'];
		var fColorArray =['Colors','Black','Red','Yellow','Pink','Green','Orange','Purple','Blue','Beige','Brown','Teal','Navy','Maroon','Lime Green','White','Gray','Snow','WhiteSmoke','GhostWhite','Linen','AliceBlue','OldLace','MintCream','Ivory','AntiqueWhite','Bisque','BlanchedAlmond','Cornsilk','LavenderBlush','Gainsboro','LightGray','Silver','DarkGray','LightSlateGray','SlateGray','DarkSlateGray','DimGray','PowderBlue','Lavender','Azure','LightSkyBlue','SkyBlue','LightBlue','MediumBlue','DarkBlue','MidnightBlue','RoyalBlue','PrussianBlue','DeepSkyBlue','DodgerBlue','CadetBlue','CornflowerBlue','LightSteelBlue','SteelBlue','SlateBlue','MediumSlateBlue','DarkSlateBlue','Aqua','Cyan','DarkCyan','Aquamarine','MediumAquamarine','PaleTurquoise','Turquoise','MediumTurquoise','DarkTurquoise','LightSeaGreen','SeaGreen','MediumSeaGreen','SpringGreen','MediumSpringGreen','DarkSeaGreen','LawnGreen','YellowGreen','PaleGreen','LightGreen','DarkGreen','ForestGreen','Lime','GreenYellow','Chartreuse','Olive','OliveDrab','DarkOliveGreen','Brown','SaddleBrown','Sienna','Chocolate','SandyBrown','Burlywood','Wheat','Tan','IndianRed','Moccasin','NavajoWhite','PapayaWhip','PeachPuff','RosyBrown','Peru','DarkOrange','OrangeRed','Tomato','Crimson','DarkRed','BlancheDiamond','FireBrick','Violet','Indigo','MediumVioletRed','DarkViolet','BlueViolet','MediumPurple','DarkMagenta','Orchid','MediumOrchid','DarkOrchid','Plum','Seashell','Honeydew','LemonChiffon','LightYellow','Gold','PaleGoldenrod','LightGoldenrodYellow','Goldenrod','DarkGoldenrod','Khaki','DarkKhaki','LightPink','MistyRose','Thistle','Fuchsia','Magenta','Cinnabar','PaleVioletRed','LightCoral','Coral','DeepPink','LightSalmon','Salmon','DarkSalmon','HotPink'];
		newAsstDrpDwn('size',fSizeArray,'Size');
		newAsstDrpDwn('font',fFontArray,'Font');
		newAsstDrpDwn('color',fColorArray,'Colors');
		
		//preview button in reply box
		var qrForm = qrBox.parentNode;
		qrForm.removeChild(qrForm.lastChild);
		qrForm.id = 'qrForm';
		var postButton = getElementsByStuff("input","value","Post Reply")[0];
		postButton.id = 'postButton';
		postButton.setAttribute('onclick','document.getElementById(\'qrForm\').nextaction.value=\'post\';this.disabled=true;document.getElementById(\'qrForm\').submit();');
		qrForm.setAttribute('onsubmit','');
		qrForm.setAttribute('onsubmit','');
		var previewSpan = document.createElement('span');
		previewSpan.innerHTML = '<input style="margin-left:5px;" type="submit" value="Preview" onclick="document.getElementById(\'postButton\').disabled=false;document.getElementById(\'qrForm\').nextaction.value=\'preview\'; return true;" /><input name="nextaction" type="hidden" value="post">';
		postButton.parentNode.insertBefore(previewSpan,postButton.nextSibling);

	}

} //addQRBarandOtherStuff

function newAsstDrpDwn(tagText,vArray,title)
{
	var aForms = document.getElementsByTagName('form');
	for (var z=0;z<aForms.length;z++)
		if (aForms[z].getElementsByTagName('textarea').length > 0)
			qrArea = aForms[z];
	var frontT="["+tagText+"=",backT="[/"+tagText+"]";
	var nSelect = document.createElement('select');
	nSelect.id="s"+title;
	nSelect.setAttribute('style','margin:2px;font-size:7pt;align:center;height:20px;vertical-align:top;');
	for (i=0;i<vArray.length;i++)
	{
		var nOption = document.createElement('option');
		nOption.appendChild(document.createTextNode(vArray[i]));
		(i==0) ? nOption.value = "||" : nOption.value=frontT+vArray[i]+"]||"+backT;
		nSelect.appendChild(nOption);
	}
	if (nSelect.addEventListener){
		nSelect.addEventListener('change', function(){doaction(this.value);}, false);
	} else if (nSelect.attachEvent){
		nSelect.attachEvent('onchange', function(){doaction(document.getElementById('s'+title).value);});
	}
	qrArea.parentNode.insertBefore(nSelect,qrArea);	
}

function newAsst(tags,title,image)
{
	var aForms = document.getElementsByTagName('form');
	for (var z=0;z<aForms.length;z++)
		if (aForms[z].getElementsByTagName('textarea').length > 0)
			qrArea = aForms[z];
	var arrTags,frontT="",backT="",newhtmlasst;
	newhtmlasst = document.createElement('a');
	var arrTags = tags.split(',');
	for (var i=0;i<arrTags.length;i++) frontT+=arrTags[i];
	for (var i=arrTags.length-1;i>-1;i--) backT+=arrTags[i].replace('[','[/').replace(/=.*?]/,']');
	if (newhtmlasst.addEventListener){
		newhtmlasst.addEventListener('click',function(){doaction(frontT+"||"+backT);},false);
	} else if (newhtmlasst.attachEvent){
		newhtmlasst.attachEvent('onclick', function(){doaction(frontT+"||"+backT);});
	}
	newhtmlasst.href = "javascript:void(0);";
	newhtmlasst.setAttribute('title',title);
	newhtmlasst.innerHTML = '<img style="border:none;" src="'+image+'" title="'+title+'" alt="'+title+'">';
	qrArea.parentNode.insertBefore(newhtmlasst,qrArea);	
}

function doaction(action,quoteID,mode) {
	if (action=='quote')
	{
		var selectedText = getSelText();
		tmp_text = selectedText.toString();
		quotedUser = unescape(quoteID.split('@_@')[0]);
		quotedPost = unescape(quoteID.split('@_@')[1]);
		quoteTime = unescape(quoteID.split('@_@')[2]);
		quoteBoard = unescape(quoteID.split('@_@')[3]);
		quoteThread = unescape(quoteID.split('@_@')[4]);
		if (tmp_text=="") //nothing selected, quote whole post
		{
			var thePost = 'tr_post' + quotedPost;
			var wholepost = document.getElementById(thePost).innerHTML.replace('<br/>','\n');
			GM_log(wholepost);
			var postbody = (document.evaluate) ? wholepost.match(/<!-- google.*? -->([\s\S]*?)<!-- google.*? -->/i)[1] : wholepost.match(/<!-google.*? -->([\s\S]*?)<!-- google.*? -->/i)[1];
			postbody = postbody.replace(/<!--.*?-->/g,'').replace(/^[ \t]+/g,'').replace(/\n/g,'');
			tmp_text = postbody;
		}
		tmp_text = tmp_text.replace(/<br>/gi,'\n').replace(/<(.|\n)*?>/gi,''); //keep line breaks, strip html
		var pageURL = location.href.match(/#/) ? location.href.substr(0,location.href.indexOf('#')) : location.href;
		qrBox.value = qrBox.value+'[b][url='+pageURL+'#'+quotedPost+']'+quotedUser+'[/url]:[/b][i] ' + tmp_text +'[/i]\n\n';
		qrBox.focus();
	}
	else if (action.indexOf('[') > -1) //text thing
	{
		qrBox.focus();
		var selectedText = getInputSelection(qrBox);
		var QRselectionStart = selectedText.start;
		var QRselectionEnd = selectedText.end;
		var textBeforeSelection = qrBox.value.substr(0,QRselectionStart);
		var textAfterSelection = qrBox.value.substr(QRselectionEnd,qrBox.value.length)
		var selectedText = qrBox.value.substring(QRselectionStart, QRselectionEnd)
		if (action.indexOf('[url]') > -1) //url
		{
			if (selectedText.indexOf('http') > -1 || selectedText.match(/[a-zA-Z0-9]\.[a-zA-Z0-9]/)) //selected a url
			{
				var curPos = QRselectionStart;
				var theURL;
				if (selectedText.match(/youtube\.com\/watch/i) || selectedText.match(/youtu.be/i))
				{
					if (selectedText.match(/^http/i) == null) selectedText = "http://" + selectedText;
					tmp_text = "[youtube]" + selectedText + "[/youtube]";
				}else{
					(selectedText.match(/[a-zA-Z0-9]\.[a-zA-Z0-9]/) && selectedText.indexOf('http') < 0) ? theURL = 'http://' + selectedText : theURL = selectedText;
					tmp_text = "[url=" + theURL + "]Link[/url]";
				}
				qrBox.value = textBeforeSelection+tmp_text+textAfterSelection;
				setCaretPosition(qrBox,curPos+(action.split('||')[0].length)+1+theURL.length);
			}
			else //put selected text as the link text, set focus after http://
			{
				var curPos = QRselectionStart;
				tmp_text = "[url=http://]"+selectedText+"[/url]";
				qrBox.value = textBeforeSelection+tmp_text+textAfterSelection;
				setCaretPosition(qrBox,curPos+(action.split('||')[0].length)+7);
			}
		}else{
			tmp_text = action.split('||')[0] + selectedText + action.split('||')[1];
			var curPos = QRselectionStart;
			qrBox.value = textBeforeSelection+tmp_text+textAfterSelection;
			if (selectedText=="") //nothing selected, put cursor between tags
				setCaretPosition(qrBox,curPos+(action.split('||')[0].length));
			else //put cursor after tags
				setCaretPosition(qrBox,textBeforeSelection.length+action.split('||')[0].length+action.split('||')[1].length+selectedText.length);
		}
	}
	else
	{
		qrBox.focus();
		var selectedText = getInputSelection(qrBox);
		var QRselectionStart = selectedText.start;
		var QRselectionEnd = selectedText.end;
		var selectedText = qrBox.value.substring(QRselectionStart, QRselectionEnd)
		var curPos = QRselectionStart;
		setCaretPosition(qrBox,curPos+selectedText.length);
	}
}

function doGetCaretPosition (ctrl) {
	var CaretPos = 0;
	if (document.selection) {
	ctrl.focus ();
		var Sel = document.selection.createRange ();
		Sel.moveStart ('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
	}
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
	return (CaretPos);
}
function setCaretPosition(ctrl, pos){
	if(ctrl.setSelectionRange)
	{
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
	}
	else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function getElementsByStuff(tag, thingtosearch,thingtolookfor,parent) {
		 var elem;
		 if (parent)
			elem = document.getElementById(parent).getElementsByTagName(tag);
		 else
			elem = document.getElementsByTagName(tag);
        var arr = new Array();
		for(i = 0,iarr = 0; i < elem.length; i++) {
			if (thingtosearch=='href')
				att = elem[i].href;
			else if (thingtosearch=='class')
				att = elem[i].className;
			else
				att = elem[i].getAttribute(thingtosearch);
			if(att)
			{
				if(att.indexOf(thingtolookfor) > -1) {
					arr[iarr] = elem[i];
					iarr++;
				}
			}
        }
        return arr;
}

function getanElementByName(tag, name){var elem = document.getElementsByTagName(tag);var arr = new Array();for(i = 0,iarr = 0; i < elem.length; i++){att = elem[i].getAttribute("name");if(att == name){arr[iarr] = elem[i];iarr++;}}return arr;}

function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());
            endRange = el.createTextRange();
            endRange.collapse(false);
            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;
                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }
    return {
        start: start,
        end: end
    };
}

function getSelText(){var txt = '';if (window.getSelection){txt = window.getSelection();}else if (document.getSelection){txt = document.getSelection();}else if (document.selection){txt = document.selection.createRange().text;}else return;return txt;}

function followquote(theIDs)
{
	if (!document.getElementById('ra_'+theIDs))
	{
		arrID = theIDs.split('___');
		origPostID = arrID[0];
		targetPostID = arrID[1];
		origPoster = escape(document.getElementById(origPostID).getElementsByTagName('a').item(2).innerHTML);
		newspan = document.createElement('span');
		newspan.id = theIDs;
		newspan.innerHTML = '<span id="ra_'+theIDs+'"><a href="#' + origPostID + '" title="Back to ' + unescape(origPoster) + '\'s reply" target=""><img src="' + downarrow + '" border="0" style="margin-right:6px;"></a></span>';
		if (newspan.addEventListener){
			newspan.addEventListener('click', function(){document.getElementById(theIDs).parentNode.removeChild(document.getElementById(theIDs));}, false);
		} else if (newspan.attachEvent){
			(function(newspan){newspan.attachEvent("onclick", function(){document.getElementById(theIDs).parentNode.removeChild(document.getElementById(theIDs));});})(newspan);
		}
		document.getElementById(targetPostID).getElementsByTagName('td').item(2).appendChild(newspan);
	}
}

addQRBarAndOtherStuff();
