scr_meta=<><![CDATA[
// ==UserScript==
// @name           Fark Anal Reverteresque
// @namespace      Smiths
// @include        http://*.fark.com/*
// @include        https://*.fark.com/*
// @include        http://*.totalfark.com/*
// @include        https://*.totalfark.com/*
// @include        http://*.foobies.com/*
// @include		   http://www.blender.com/fark/*
// @include		   http://network.yardbarker.com/network/fark_sports
// @version		   3.4.9
// @attribution	changes [d:07.02.12][u:It's been a fun run, guys.. but I'm afraid: <b>PERMA-BANNED!</b><a href="https://twitter.com/SmithsH8sTweets/status/220124481274920960/photo/1">4 hours after they did it I get to know!</a><p>I thought my uberblock would be the final "olive branch", but apparently people didn't take kindly to my Farkbacks (which were not off-topic). Thanks for your support on this script; maybe when Tony and James are gone I'll be back. For the deets, <b>EIP</b>! Feel free to mail drew@fark.com, tweet @drewcurtis/@fark if you love me.<p>I'm introducing <B><big>UBERBLOCK</big></b><ul><li>If you tag a user with "uberblock" in their comment when you ignore them, this script will remove their posts and completely remove any threaded posts (if threaded blocking is enabled in this script) from the thread once it updates its blocking variable. (Every 5 minutes)</li><li>Unlike official Fark controls, this will not mess up the post count in a thread; crucial for a gredunza.<li>So, you can have "Show Headers from ignored users" enabled on Fark and see some troll and whore headers in your thread as usual.</li><li>However, if there's some swindling stripper you just want banished from the site and it's apparent someone has a Rocky Mountain High for her, you can erase just that person without screwing up anything else on Fark.</li><li>Again, just put "uberblock" somewhere in their note when you block them and watch them fade away like sagging breasts.</li></ul><p>]
// ==/UserScript==
]]></>.toString();
var v = /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1];

var scriptNum = "8821";
var scriptName = "Fark Anal Reverteresque ReDux";

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
	document.getElementById('smgm_bgdiv').style.display='none';
	document.getElementById('smgm_dialogbox').style.display='none';
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
			var USversion = content.responseText.match(/@version.*?(\d[^<]+?)\n/);
			content.responseText = content.responseText.replace(/ \/>/g,'>');
			content.responseText = content.responseText.replace(/\n/g,'');
			var changeDate = content.responseText.match(/\[d:([0-9]+?\.[0-9]+?\.[0-9]+?)\]/i)[1];
			var theChanges = content.responseText.match(/\[u:(.*?)\]/i)[1];
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

GM_registerMenuCommand('Fark Anal Reverteresque Redux Options', smgm_fark_showOptions);
GM_addStyle(".headlineCommentsRej, .headlineCommentsRej a, .headlinerej, .headlinerej a {color:#800000; font-size:10pt;background:#F5EBEB;}");
GM_addStyle(".headlinelive, .headlinelive a {color:#006000; font-size:10pt;font-size:9pt;}");
GM_addStyle(".smgm_fbutton{vertical-align:bottom !important;margin-left:5px !important;width:16px;height:16px;text-indent:-9999px;display:inline-block;}");

var urlfilter = GM_getValue('urlfilter');
var tagfilter = GM_getValue('tagfilter');
var hideads = GM_getValue('hideads');
var hideshirts = GM_getValue('hideshirts');
var PITA = GM_getValue('PITA');
var RIP = GM_getValue('RIP');
var newthread = GM_getValue('newthread');
var fixanchor = GM_getValue('fixanchor');
var sub_altTag = GM_getValue('sub_altTag');
var threadedBlock = GM_getValue('threadedBlock');
var replyFinder = GM_getValue('replyFinder');
var useInlineFavBlock = GM_getValue('useInlineFavBlock');
var fixUsercomment = GM_getValue('fixUsercomment');
var removeVotes = GM_getValue('removeVotes');

if (!GM_getValue('blockedUsers')) GM_setValue('blockedUsers','');
if (!urlfilter) { urlfilter = ""; GM_setValue('urlfilter',urlfilter); }
if (!tagfilter) { tagfilter = ""; GM_setValue('tagfilter',tagfilter); }
if (isNaN(hideads)) { hideads = 0; GM_setValue('hideads',hideads); }
if (isNaN(hideshirts)) { hideshirts = 0; GM_setValue('hideshirts',hideshirts); }
if (isNaN(PITA)) { PITA = 0; GM_setValue('PITA',PITA); }
if (isNaN(RIP)) { RIP = 0; GM_setValue('RIP',RIP); }
if (isNaN(newthread)) { newthread = 1; GM_setValue('newthread',newthread); } //open in new thread on by default
if (isNaN(fixanchor)) { fixanchor = 1; GM_setValue('fixanchor',fixanchor); } //fix anchor on by default
if (isNaN(sub_altTag)) { sub_altTag = 0; GM_setValue('sub_altTag',sub_altTag); } 
if (isNaN(threadedBlock)) { threadedBlock = 0; GM_setValue('threadedBlock',threadedBlock); }  //threaded blocking
if (isNaN(replyFinder)) { replyFinder = 1; GM_setValue('replyFinder',replyFinder); }  //reply hunter
if (isNaN(useInlineFavBlock)) { useInlineFavBlock = 0; GM_setValue('useInlineFavBlock',useInlineFavBlock); }  //custom fav/block buttons off by default now that Fark's are up-to-speed
if (isNaN(fixUsercomment)) { fixUsercomment = 1; GM_setValue('fixUsercomment',fixUsercomment); }  //fix the new TR for user fav/ignore comments
if (isNaN(removeVotes)) { removeVotes = 0; GM_setValue('removeVotes',removeVotes); }  //remove stupid new voting buttons

urls = urlfilter.split("@@@");
filteredtags = tagfilter.split("@@@");

function setOptions()
{
	var urlfilter = GM_getValue('urlfilter');
	urls = urlfilter.split("@@@");
	for (var z=0;z<urls.length;z++)
		document.getElementById("urlfilters").innerHTML+='<option value="'+urls[z]+'">'+urls[z]+'</option>';
	var tagfilter = GM_getValue('tagfilter');
	filteredtags = tagfilter.split("@@@");
	for (var z=0;z<filteredtags.length;z++)
		document.getElementById("tagfilters").innerHTML+='<option value="'+filteredtags[z]+'">'+filteredtags[z]+'</option>';
	var hideads = GM_getValue('hideads');
		(hideads) ? document.getElementById('hideadson').checked = true : document.getElementById('hideadsoff').checked = true;
	var hideshirts = GM_getValue('hideshirts');
		(hideshirts) ? document.getElementById('hideshirtson').checked = true : document.getElementById('hideshirtsoff').checked = true;
	var PITA = GM_getValue('PITA');
		(PITA) ? document.getElementById('PITAon').checked = true : document.getElementById('PITAoff').checked = true;
	var RIP = GM_getValue('RIP');
		(RIP) ? document.getElementById('RIPon').checked = true : document.getElementById('RIPoff').checked = true;
	var newthread = GM_getValue('newthread');
		(newthread) ? document.getElementById('newthreadON').checked = true : document.getElementById('newthreadOFF').checked = true;
	var fixanchor = GM_getValue('fixanchor');
		(fixanchor) ? document.getElementById('fixanchorON').checked = true : document.getElementById('fixanchorOFF').checked = true;
	var sub_altTag = GM_getValue('sub_altTag');
		(sub_altTag) ? document.getElementById('sub_altTagON').checked = true : document.getElementById('sub_altTagOFF').checked = true;
	var threadedBlock = GM_getValue('threadedBlock');
		(threadedBlock) ? document.getElementById('threadedBlockON').checked = true : document.getElementById('threadedBlockOFF').checked = true;
	var replyFinder = GM_getValue('replyFinder');
		(replyFinder) ? document.getElementById('replyFinderON').checked = true : document.getElementById('replyFinderOFF').checked = true;
	var useInlineFavBlock = GM_getValue('useInlineFavBlock');
		(useInlineFavBlock) ? document.getElementById('useInlineFavBlockON').checked = true : document.getElementById('useInlineFavBlockOFF').checked = true;
	var fixUsercomment = GM_getValue('fixUsercomment');
		(fixUsercomment) ? document.getElementById('fixUsercommentON').checked = true : document.getElementById('fixUsercommentOFF').checked = true;
	var removeVotes = GM_getValue('removeVotes');
		(removeVotes) ? document.getElementById('removeVotesON').checked = true : document.getElementById('removeVotesOFF').checked = true;
}

function saveOptions()
{
	(document.getElementById('hideadson').checked) ? GM_setValue('hideads', 1 ) : GM_setValue('hideads', 0 );
	(document.getElementById('hideshirtson').checked) ? GM_setValue('hideshirts', 1 ) : GM_setValue('hideshirts', 0 );
	(document.getElementById('PITAon').checked) ? GM_setValue('PITA', 1 ) : GM_setValue('PITA', 0 );
	(document.getElementById('RIPon').checked) ? GM_setValue('RIP', 1 ) : GM_setValue('RIP', 0 );
	(document.getElementById('newthreadON').checked) ? GM_setValue('newthread', 1 ) : GM_setValue('newthread', 0 );
	(document.getElementById('fixanchorON').checked) ? GM_setValue('fixanchor', 1 ) : GM_setValue('fixanchor', 0 );
	(document.getElementById('sub_altTagON').checked) ? GM_setValue('sub_altTag', 1 ) : GM_setValue('sub_altTag', 0 );
	(document.getElementById('threadedBlockON').checked) ? GM_setValue('threadedBlock', 1 ) : GM_setValue('threadedBlock', 0 );
	(document.getElementById('replyFinderON').checked) ? GM_setValue('replyFinder', 1 ) : GM_setValue('replyFinder', 0 );
	(document.getElementById('useInlineFavBlockON').checked) ? GM_setValue('useInlineFavBlock', 1 ) : GM_setValue('useInlineFavBlock', 0 );
	(document.getElementById('fixUsercommentON').checked) ? GM_setValue('fixUsercomment', 1 ) : GM_setValue('fixUsercomment', 0 );
	(document.getElementById('removeVotesON').checked) ? GM_setValue('removeVotes', 1 ) : GM_setValue('removeVotes', 0 );
}

function hideOptions()
{
	document.body.removeChild(document.getElementById("smgm_optionsDiv"));
	document.body.removeChild(document.getElementById("smgm_modalDiv"));
}

function delURLFilter(value)
{
	var urlfilter = GM_getValue('urlfilter');
	urls = urlfilter.split("@@@");
	for (var i = 0; i < urls.length; i++)
	{
		if (value == urls[i]) 
			urls.splice(i,1);
	}
	urlfilter = urls.join("@@@");
	document.getElementById("urlfilters").innerHTML="";
	for (var z=0;z<urls.length;z++)
		document.getElementById("urlfilters").innerHTML+='<option value="'+urls[z]+'">'+urls[z]+'</option>';
	GM_setValue('urlfilter',urlfilter);
}

function addURLFilter(newURL)
{
	var urlfilter = GM_getValue('urlfilter');
	urls = urlfilter.split("@@@");
	already = 0;
	for (var i=0; i<urls.length;i++)
		if (newURL == urls[i]) already = 1;
	if (already==1)
		alert("Keyword already exists");
	else
		(urlfilter=="") ? urlfilter = newURL : urlfilter += "@@@" + newURL;
	GM_setValue('urlfilter',urlfilter);
	urls = urlfilter.split("@@@");
	document.getElementById("urlfilters").innerHTML="";
	for (var z=0;z<urls.length;z++)
		document.getElementById("urlfilters").innerHTML+='<option value="'+urls[z]+'">'+urls[z]+'</option>';
}

function deltagFilter(value)
{
	var tagfilter = GM_getValue('tagfilter');
	tags = tagfilter.split("@@@");
	for (var i = 0; i < tags.length; i++)
	{
		if (value == tags[i]) 
			tags.splice(i,1);
	}
	tagfilter = tags.join("@@@");
	document.getElementById("tagfilters").innerHTML="";
	for (var z=0;z<tags.length;z++)
		document.getElementById("tagfilters").innerHTML+='<option value="'+tags[z]+'">'+tags[z]+'</option>';
	GM_setValue('tagfilter',tagfilter);
}

function addtagFilter(newtag)
{
	var tagfilter = GM_getValue('tagfilter');
	tags = tagfilter.split("@@@");
	already = 0;
	for (var i=0; i<tags.length;i++)
		if (newtag == tags[i]) already = 1;
	if (already==1)
		alert("Keyword already exists");
	else
		(tagfilter=="") ? tagfilter = newtag : tagfilter += "@@@" + newtag;
	GM_setValue('tagfilter',tagfilter);
	tags = tagfilter.split("@@@");
	document.getElementById("tagfilters").innerHTML="";
	for (var z=0;z<tags.length;z++)
		document.getElementById("tagfilters").innerHTML+='<option value="'+tags[z]+'">'+tags[z]+'</option>';
}

function smgm_fark_showOptions()
{
	
	var div1=document.getElementById("smgm_modalDiv");
	if (div1==null)
	{
		GM_addStyle("#smgm_modalDiv{position:fixed; top:0px; left:0px; z-index:200; width:100%; height:100%; background-color:black; opacity:0.75;}");
		GM_addStyle(".smgm_hidden{display:none; visibility:hidden;}");
		div1=document.createElement("DIV");
		div1.id="smgm_modalDiv";
		div1.className="smgm_hidden";
		div1.title="Click to cancel and close";
		document.body.appendChild(div1);
		div1.addEventListener("click",hideOptions,false);
	}
	var div2=document.getElementById("smgm_optionsDiv");
	if (div2==null)
	{
		GM_addStyle(".smgm_optionsTable{vertical-align:middle !important;border-spacing: 2px !important; border: 1px solid #000 !important; border-collapse: collapse !important;padding-left:10px !important;margin-bottom:3px !important;color:#000 !important;}");
		GM_addStyle("#smgm_optionsDiv{position:fixed !important; top:3%; left:20%; z-index:210; width:50%; height:80%; background-color:white !important; border:solid 3px #0033CC !important;}");
		div2=document.createElement("DIV");
		div2.id="smgm_optionsDiv";
		div2.className="smgm_hidden";
		div2.setAttribute("style","text-align:justify;padding:10px");
		div2.innerHTML='<center><u><b><font size="+1">Fark Anal Reverteresque ReDux Options</b></font></u><br><font size="-2">Another <a href="http://userscripts.org/scripts/show/8821" target="_blank">Smiths Greasemonkey Script</a></font></center><p>' +
		'<div style="overflow:auto;height:80%;"><form id="FAR" name="titleform">' +
		'<table class="smgm_optionsTable" width="100%"><tr><td style="padding:6px;" width=33%>Current URL Filters:</td><td width=33%><select id="urlfilters"></select></td>' +
		'<td style="padding:6px;" width=33%><input id="delfilterbutton" type="button" value="Remove URL Filter"></button></td></tr>' +
		'<tr><td style="padding:6px;" width=33%>Add URL Keyword:</td><td width=33%><input id="newURL" type="text"></td><td style="padding:6px;" width=33%><input id="addfilterbutton" type="button" value="Add URL Filter"></button></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%"><tr><td style="padding:6px;" width=33%>Current Tag Filters:</td><td width=33%><select id="tagfilters"></select></td>' +
		'<td style="padding:6px;" width=33%><input id="deltagfilterbutton" type="button" value="Remove Tag Filter"></button></td></tr>' +
		'<tr><td style="padding:6px;" width=33%>Add Tag Keyword:</td><td width=33%><input id="newtag" type="text"></td><td style="padding:6px;" width=33%><input id="addtagfilterbutton" type="button" value="Add Tag Filter"></button></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Hide advertisements:</td><td><input type="radio" id="hideadson" name="embed" value="1"/><label for="hideadson"> Yes </label><input type="radio" id="hideadsoff" name="embed" value="0"/><label for="hideadsoff"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Hide t-shirt icons:</td><td><input type="radio" id="hideshirtson" name="embed2" value="1"/><label for="hideshirtson"> Yes </label><input type="radio" id="hideshirtsoff" name="embed2" value="0"/><label for="hideshirtsoff"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Hide Political Meter:</td><td><input type="radio" id="PITAon" name="embed3" value="1"/><label for="PITAon"> Yes </label><input type="radio" id="PITAoff" name="embed3" value="0"/><label for="PITAoff"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>RIP Meme Filter Attempt:</td><td><input type="radio" id="RIPon" name="embed4" value="1"/><label for="RIPon"> Yes </label><input type="radio" id="RIPoff" name="embed4" value="0"/><label for="RIPoff"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Open New Tab when opening thread/article:</td><td><input type="radio" id="newthreadON" name="embed5" value="1"/><label for="newthreadON"> Yes </label><input type="radio" id="newthreadOFF" name="embed5" value="0"/><label for="newthreadOFF"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Use alternate tag button on link submission form:</td><td><input type="radio" id="sub_altTagON" name="embed6" value="1"/><label for="sub_altTagON"> Yes </label><input type="radio" id="sub_altTagOFF" name="embed6" value="0"/><label for="sub_altTagOFF"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Fix anchors for quoted text in threads:</td><td><input type="radio" id="fixanchorON" name="embed7" value="1"/><label for="fixanchorON"> Yes </label><input type="radio" id="fixanchorOFF" name="embed7" value="0"/><label for="fixanchorOFF"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Remove posts featuring quotes from users you\'re blocking on FARK:</td><td><input type="radio" id="threadedBlockON" name="embed8" value="1"/><label for="threadedBlockON"> Yes </label><input type="radio" id="threadedBlockOFF" name="embed8" value="0"/><label for="threadedBlockOFF"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Enable Reply Finding Buttons:</td><td><input type="radio" id="replyFinderON" name="embed9" value="1"/><label for="replyFinderON"> Yes </label><input type="radio" id="replyFinderOFF" name="embed9" value="0"/><label for="replyFinderOFF"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Use Custom Inline Fav/Block Icons:</td><td><input type="radio" id="useInlineFavBlockON" name="embed10" value="1"/><label for="useInlineFavBlockON"> Yes </label><input type="radio" id="useInlineFavBlockOFF" name="embed10" value="0"/><label for="useInlineFavBlockOFF"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Place Favorite/Ignore captions on same row as Username:</td><td><input type="radio" id="fixUsercommentON" name="embed11" value="1"/><label for="fixUsercommentON"> Yes </label><input type="radio" id="fixUsercommentOFF" name="embed11" value="0"/><label for="fixUsercommentOFF"> No</label><br></td></tr></table>' +
		'<table class="smgm_optionsTable" width="100%">' +
		'<tr><td style="padding:6px;" colspan="2" width=65%>Remove Comment Voting Buttons (other than the "Best" one):</td><td><input type="radio" id="removeVotesON" name="embed12" value="1"/><label for="removeVotesON"> Yes </label><input type="radio" id="removeVotesOFF" name="embed12" value="0"/><label for="removeVotesOFF"> No</label><br></td></tr></table>' +
		'</div><center><input type="button" value="Ok" id="okButton" />&nbsp;&nbsp;&nbsp;<input type="button" value="Cancel" id="cancelButton" /></center></form>';
		document.body.appendChild(div2);
		document.getElementById("delfilterbutton").addEventListener("click",function(){delURLFilter(document.getElementById("urlfilters").options[document.getElementById("urlfilters").selectedIndex].value);},false);
		document.getElementById("addfilterbutton").addEventListener("click",function(){addURLFilter(document.getElementById("newURL").value);document.getElementById("newURL").value = "";},false);
		document.getElementById("deltagfilterbutton").addEventListener("click",function(){deltagFilter(document.getElementById("tagfilters").options[document.getElementById("tagfilters").selectedIndex].value);},false);
		document.getElementById("addtagfilterbutton").addEventListener("click",function(){addtagFilter(document.getElementById("newtag").value);document.getElementById("newtag").value = "";},false);
		document.getElementById("okButton").addEventListener("click",function(){saveOptions();hideOptions();location.reload(true);},false);
		document.getElementById("cancelButton").addEventListener("click",function(){hideOptions();},false);
	}
	document.getElementById("smgm_optionsDiv").className="";
	document.getElementById("smgm_modalDiv").className="";
	setOptions();
	div1.className="";
	div2.className="";
}

if (document.body.innerHTML.indexOf('You\'ve submitted that form once already.') == -1) //double-post page is not there, proceed
{
		GM_addStyle(".headlineComments {width:120px;padding:5px;text-align:center;vertical-align:middle;}");
		GM_addStyle(".headlineRow td{font-size:10pt;font-family:Verdana,Arial,Helvetica,sans-serif;padding:3px}");
		GM_addStyle(".headlineRow1 td{font-size:10pt;font-family:Verdana,Arial,Helvetica,sans-serif;padding:3px}");
		GM_addStyle("body {background:#777;}");
		GM_addStyle(".ctable td, .ctableTF td {vertical-align:middle;height:26px;}");
		GM_addStyle("table tr td.headlineTopic{padding:4px}");
		GM_addStyle(".clogin a {font-size:0.9em;}");
		GM_addStyle(".profhdr1{width:15% !important;}");
		GM_addStyle("select,input,textarea,button{font:9pt sans-serif}");
		GM_addStyle("#commentsArea {width:99%;font-size:0.9em;font-family:Verdana,Arial,Helvetica,sans-serif;}");
		GM_addStyle("#commentsArea .ctext {margin-bottom:25px;}");
		GM_addStyle("#catMenu {margin-top:8px;height:30px;}");
		GM_addStyle("#catMenu li{margin-right:1px;line-height:30px;}");
		GM_addStyle("#catMenu li.catSelected a {font-size:0.9em;background-color: #437; color:#fff;border:2px solid #3d3d3d;border-bottom:0px;margin-top:3px;-moz-box-shadow:2px 2px 4px #333;-webkit-box-shadow:2px 2px 4px #333;box-shadow:2px 2px 4px #333;}");
		GM_addStyle("#catMenu li a {color:#fff;font-size:0.8em;background-color: #669;border:2px solid #3d3d3d;border-bottom:0px;-moz-box-shadow:2px 2px 4px #333;-webkit-box-shadow:2px 2px 4px #333;box-shadow:2px 2px 4px #333;}");
		GM_addStyle("#newsContainer{border:2px solid #3d3d3d;}");
		GM_addStyle("#leftCol{width:90% !important;float:left;min-height:90%;}");
		GM_addStyle("#leftColSpacer{width:0% !important;}");
		GM_addStyle("#rightColSpacer{width:0% !important;}");
		GM_addStyle(".alsoOnFark{display:none;}");
		GM_addStyle("footer{display:block;float:left;margin-right:0px;}");
		GM_addStyle(".headlineRow td{padding:4px;font-size:9pt;}");
		GM_addStyle(".headlineRow1 td{padding:4px;font-size:9pt;}");
		GM_addStyle(".mainDate{text-align:center;font-weight:bold;font-size:14pt;padding:0 0 10px 10px}");
		GM_addStyle("#commentsPostingArea .commentsPostingAreaInput{font-size:10pt;font-family:Verdana,Arial,Helvetica,sans-serif;color:#000}");
		GM_addStyle("#commentsPostingArea .commentPostingTable td{padding:2px}");

	var elements = document.evaluate("//noscript", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < elements.snapshotLength; i++) 
	{
		var thisElement = elements.snapshotItem(i);
		thisElement.parentNode.removeChild(thisElement);
	}    
    

	if (document.getElementById('bodyTabSports')) document.getElementById('bodyTabSports').href = "http://www.fark.com/sports/";
	if (document.getElementById('bodyTabGeek')) document.getElementById('bodyTabGeek').href = "http://www.fark.com/geek/";
	if (document.getElementById('bodyTabSportsespn')) document.getElementById('bodyTabSportsespn').href = "http://www.fark.com/sports/";


		topSections = document.getElementById('catMenu').getElementsByTagName('a');
		for (i=0;i<topSections.length;i++)
		{
			if (topSections[i].href.indexOf('geek_ext') > -1) topSections[i].href = "http://www.fark.com/geek/";
			if (topSections[i].href.indexOf('sports') > -1) topSections[i].href = "http://www.fark.com/sports/";
		}	  
		
	if (hideads) //remove some adbars
	{
		//hide ads? that includes back ones
		document.body.style.backgroundImage = '';
		document.body.style.backgroundColor = '';

		//Screw it not letting them keep altering our sitecontainer widths! - have to hide Ads though still
		GM_addStyle(".headlineCommentsTags{display:none;}");
		if (document.getElementById('siteContainer')) document.getElementById('siteContainer').setAttribute('style','width:95% !important');
		if (document.getElementById('bodyHeadlineContainer')) document.getElementById('bodyHeadlineContainer').setAttribute('style','width:95% !important');
		if (document.getElementById('leftCol')) document.getElementById('leftCol').setAttribute('style','width:95% !important');
		if (document.getElementById('TFbodyHeadlineContainer')) document.getElementById('TFbodyHeadlineContainer').setAttribute('style','width:95% !important');
		if (document.getElementById('bodycontentframe')) document.getElementById('bodycontentframe').setAttribute('style','width:95% !important');
		var remove = ['jsblobbo1','bodyRightSideContainer', 'topAd728x90', 'footer','rightSideLeftMenubar','rightCol','alsoOnFarkTable','boxSwap','rightAd300x250Lower'];
		for (var i = 0; i < remove.length; i++) 
		{
			var adSidebar = document.getElementById(remove[i]);
			if (adSidebar) 
				adSidebar.parentNode.removeChild(adSidebar);
		}

	}

	//Screw the stupid PITA Meter thingy
	if (PITA)
	{
		var trs = document.evaluate('//table[@width="640"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < trs.snapshotLength; i++)
		{
			if (trs.snapshotItem(i).getElementsByTagName('td').item(0).innerHTML.indexOf("Fark.com's&nbsp;&nbsp;<span style=\"font-si") > -1)
				trs.snapshotItem(i).parentNode.removeChild(trs.snapshotItem(i));
		}
	}

	//Remove referrer, underline sources, oldschool, move or remove tshirts
	if (document.location.href.match(/http:\/\/.*\.f[oa][or][bk].*\.com/) && document.location.href.match(/http:\/\/.*\.f[oa][or][bk].*\.com\/comments/) == null) //fark or foobies
	{
		var newicon = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBggGBQkIBwgKCQkKDRYODQwMDRoTFBAWHxwhIB8cHh4jJzIqIyUvJR4eKzssLzM1ODg4ISo9QTw2QTI3ODUBCQoKDQsNGQ4OGTUkHiQ1KTU1NTU1NTUpNTU1NTU1KTU1NTU1NTU1NTU1NTU1KTU1KTU1KTU1NSk1NTU1NTU1Nf/AABEIAAoACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAGBf/EACIQAAIBAgYDAQAAAAAAAAAAAAECAwQRAAUGEiJxMVGRIf/EABUBAQEAAAAAAAAAAAAAAAAAAAQD/8QAHBEAAgAHAAAAAAAAAAAAAAAAAQIAAxExQWHB/9oADAMBAAIRAxEAPwBbqTWGb5ZrOhozRwXiJ2ok/GcScVubcbH3hvG2ZmNTJHSK5A3KHYgHu2JtbSwS02evJBE7Ei7MgJO2NSPh8Yup+xr1iag1NTDp8xCiBUAIvvPY/9k=";
		var headlines = document.evaluate('//tr[contains(@class, "headlineRow")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var theLink;
		var foundOld = 0;
		var comments, headline, hlTD, cmTD;
		if (headlines.snapshotItem(1))
		{
			for (k=0;k<headlines.snapshotItem(1).getElementsByTagName('span').length;k++)
				if (headlines.snapshotItem(1).getElementsByTagName('span')[k].className == "headline" ||
						headlines.snapshotItem(1).getElementsByTagName('span')[k].className == "headlinelive" ||
							headlines.snapshotItem(1).getElementsByTagName('span')[k].className == "headlinerej" ||
								headlines.snapshotItem(1).getElementsByTagName('span')[k].className == "headlineapp" ||
									headlines.snapshotItem(1).getElementsByTagName('span')[k].className == "headlinenew") //TF stuff requires more classifying
						hlTD = k;
			for (k=0;k<headlines.snapshotItem(1).getElementsByTagName('td').length;k++)
				if (headlines.snapshotItem(1).getElementsByTagName('td')[k].className == "headlineComments")
						cmTD = k;
			currentPlace = location.href.substr(0,(location.href.lastIndexOf('?')) > 0 ? location.href.lastIndexOf('?') : location.href.lastIndexOf('/')+1);
			var lastHeadline = GM_getValue("lastHeadline" + currentPlace);
			if (!lastHeadline) { lastHeadline = ""; }
			for (var i = 0; i < headlines.snapshotLength; i++) {
				if (headlines.snapshotItem(i).getElementsByTagName('a').item(0)) {
					theLink = headlines.snapshotItem(i).getElementsByTagName('a').item(0);
					if (headlines.snapshotItem(1).getElementsByTagName('span')[hlTD].innerHTML.indexOf('<a rel') > -1) //hover headlines (aka - guest visitor settings)... remove referrer on those too
					{
						headlines.snapshotItem(i).getElementsByTagName('span')[hlTD].getElementsByTagName('a').item(0).href = unescape(headlines.snapshotItem(i).getElementsByTagName('span')[hlTD].getElementsByTagName('a').item(0).href.replace(/http:\/\/.*?fark.com\/cgi\/go.pl\?i=[^>]+.*?l=/g, '').replace(/http:\/\/.*?fark.com\/goto\/.*?\//g, ''));
						headlines.snapshotItem(i).getElementsByTagName('span')[hlTD+1].getElementsByTagName('a').item(0).href = headlines.snapshotItem(i).getElementsByTagName('span')[hlTD].getElementsByTagName('a').item(0).href;
					}
					if (document.location.href.match(/fark\.com\/users/) == null && document.location.href.match(/fark\.com\/cgi\/users/) == null)
					{
						if (headlines.snapshotItem(i).innerHTML.indexOf(lastHeadline) > -1) foundOld = 1;
						if (headlines.snapshotItem(i).innerHTML.indexOf(lastHeadline) == -1 && foundOld == 0){
							headlines.snapshotItem(i).getElementsByTagName('td')[cmTD].style.width = '10%';
							headlines.snapshotItem(i).getElementsByTagName('td')[cmTD].innerHTML += "<span style=\"margin-left:5px;color:red;font-weight:bold;\"><img title='New Story' alt='New Story' src='" + newicon + "' border='0'></span>";
						}
						if (headlines.snapshotItem(i).getElementsByTagName('a').item(1)) {
							if (headlines.snapshotItem(i).getElementsByTagName('a').item(1).href.indexOf('ordershirt.pl') > -1)
							{
								shirtlink = headlines.snapshotItem(i).getElementsByTagName('a').item(1);
								comments = headlines.snapshotItem(i).getElementsByTagName('a').item(2);
								(hideshirts) ? shirtlink.parentNode.removeChild(shirtlink) : comments.parentNode.insertBefore(shirtlink, comments.nextsibling);
							}
						}
					}
					theLink.href = unescape(theLink.href.replace(/http:\/\/.*?fark.com\/cgi\/go.pl\?i=[^>]+.*?l=/g, '').replace(/http:\/\/.*?fark.com\/goto\/.*?\//g, ''));
					if (theLink.innerHTML.indexOf('img') != 1)
						theLink.innerHTML = theLink.innerHTML.replace(/\(([^<]+?)\)/,"(<u>$1</u>)");
					for (var j = 0; j < urls.length; j++)
					{		
						if ((!document.location.href.match(/self=1/)) && (urls[j] != "") && (headlines.snapshotItem(i).getElementsByTagName('a').item(0) != null)&& (headlines.snapshotItem(i).getElementsByTagName('td').item(0).innerHTML.search(urls[j]) != -1))
							headlines.snapshotItem(i).parentNode.removeChild(headlines.snapshotItem(i));
					}
				}
			}
		}
		if (headlines.snapshotItem(1) && document.location.href.match(/fark\.com\/users/) == null && document.location.href.match(/fark\.com\/cgi\/users/) == null && document.location.href.match(/fark\.com\/submit/) == null)
		{
			headline = headlines.snapshotItem(1).getElementsByTagName('span')[hlTD].innerHTML;
			if (headline.indexOf('<a rel') > -1){
				headline = headline.match(/<a rel.*>(.*?)<\/a>/i)[1];
			}
			GM_setValue("lastHeadline" + currentPlace, headline);
		}

		//Comments, oldschool Farky style
		//record comments on click (thread||comments)
		function recordcomments(id)
		{
			postcounts = GM_getValue('postcounts');
			if (!postcounts) { postcounts = ""; }
			currentcheck = postcounts.split(",");
			if (currentcheck.length > 100) currentcheck.splice(0, 50); //store only the last 100 clicked, just for size's sake, trim by 50 each time it's gone over
			for (var i=0; i<currentcheck.length; i++)
			{
				if (id.substr(0,7) == currentcheck[i].substr(0,7))
					currentcheck.splice(i,1);
				document.getElementById(id).innerHTML = "(<u>" + id.substr(9) + "</u>)";
			}
			postcounts = currentcheck.join();
			(postcounts == "") ? postcounts = id : postcounts += "," + id;
			GM_setValue('postcounts',postcounts);
		}
		function pluscomments(post)
		{
			postcounts = GM_getValue('postcounts');
			if (!postcounts) { postcounts = ""; }
			oldcheck = postcounts.split(",");
			if (post.substr(9,1).match(/\d/) != null) document.getElementById(post).innerHTML = "(<u>+" + post.substr(9) + "</u>)";
			for (var i=0; i<oldcheck.length; i++)
			{
				if (post.substr(0,7) == oldcheck[i].substr(0,7))
				{ 
					//this has been clicked before, compare values -- not sure how it'll work for the "too many" and "sq root"
					if (post.substr(9,1).match(/[0-9]/) != null)
					{
						newposts = post.substr(9) - oldcheck[i].substr(9);
						if (newposts > 0) document.getElementById(post).innerHTML = "(<u>" + oldcheck[i].substr(9) + " + " + newposts + "</u>)";
						else if (newposts == 0) document.getElementById(post).innerHTML = "(<u>" + post.substr(9) + "</u>)";
					}
					if (oldcheck[i].substr(9,1).match(/[0-9]/) == null)//it found the thread but the old click had special characters (lots, too many)
						document.getElementById(post).innerHTML = "(<u>" + post.substr(9) + "</u>)";
				}
				document.getElementById(post).target = (newthread) ? "_blank" : "";
			}
		}
		//add listener for comment links to record on click, and see if it's been clicked before - improved
		theComments = document.evaluate('//td[@class="headlineComments"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < theComments.snapshotLength; i++)
		{
			if (!theComments.snapshotItem(i).getElementsByTagName('a').item(0).innerHTML.match(/\(.*?post.*?of.*?\)/))
			{
				theComments.snapshotItem(i).innerHTML = theComments.snapshotItem(i).innerHTML.replace(/\((.*?)\)/,"(<u>$1</u>)");
				thread = theComments.snapshotItem(i).getElementsByTagName('a').item(0).href.match(/.*comments\/([0-9]{7})/)[1];
				comments = theComments.snapshotItem(i).getElementsByTagName('a').item(0).innerHTML.match(/\(<u>(.*?)<\/u>/)[1];
				commentamounts = theComments.snapshotItem(i).getElementsByTagName('a').item(0);
				commentamounts.setAttribute("id",thread + "||" + comments);
				commentamounts.addEventListener('click', function(){recordcomments(this.id);}, false);
				pluscomments(commentamounts.id); //check if it's been clicked and compare comments		
			}
		}
		
		//old method works on farktography,newsflash,animated ones
		var tags = document.evaluate('//td[contains(@class,"headlineTopic")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j=0;j<filteredtags.length; j++)
			for (var i = 0; i < tags.snapshotLength; i++)
				if ((filteredtags[j] != "") && (tags.snapshotItem(i).innerHTML.toLowerCase().search(filteredtags[j].toLowerCase()) != -1))
					tags.snapshotItem(i).parentNode.parentNode.removeChild(tags.snapshotItem(i).parentNode);
	}

	//Farkyish posts -- improved w/less external loading -- based off of the excellent mikeruhlin script "Farkyish Comments"
	//http://userscripts.org/scripts/show/8954
	if (document.location.href.match(/fark\.com\/users/) == null && document.location.href.match(/fark\.com\/cgi\/users/) == null && document.location.href.match(/http:\/\/.*\.f[oa][or][bk].*\.com\/comments/) == null && document.location.href.match(/fark\.com\/submit/) == null) {
		if (document.getElementById('userName'))
		{
			var myname = document.getElementById('userName').getElementsByTagName('a').item(0).innerHTML.substr(0,document.getElementById('userName').getElementsByTagName('a').item(0).innerHTML.length-1);
			myname = myname.toLowerCase();
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://www.fark.com/users/" + myname + "/recent",
				onload:function(details)
				{
					var myThreads = new Array();
					details.responseText = details.responseText.replace(/\*/g,'B');
					myThreads = details.responseText.match(/last post.*?\/td>\n.*?\/td>\n.*?\/td>\n.*?\/comments\/([0-9]{7}).*?\">/g);
					for(j=0; j<myThreads.length; j++){
						threadno = myThreads[j].match(/comments\/([0-9]{7})/);
							theComments = document.evaluate('//td[@class="headlineComments"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							for (var i=0;i<theComments.snapshotLength;i++)
							{
								if (theComments.snapshotItem(i).getElementsByTagName('a').item(0).href.indexOf(threadno[1]) > -1)
								{
									theComments.snapshotItem(i).className='';
									theComments.snapshotItem(i).setAttribute('style','text-align:center;vertical-align:middle;font-weight:bold;');
									theComments.snapshotItem(i).getElementsByTagName('a').item(0).setAttribute('style','color:#ff0000;');
								}
							}
					}
				}
			});
		}
	}
	headerRow = document.getElementById('headerMenuContainer');
	lastTab = headerRow.getElementsByTagName('a')[headerRow.getElementsByTagName('a').length-1];
	newTab = document.createElement('li');
	newTab.innerHTML = "<a href=\"http://www.fark.com/submit\">» Submit a Link</a>";
	lastTab.parentNode.insertBefore(newTab, lastTab.nextSibling);

	function makePop(text, href)
	{
		newBTN = document.createElement('div');
		newBTN.addEventListener("click",function(){document.location.href=href;},false);
		newBTN.addEventListener("mouseover",function(){this.style.color="#3d3d3d";this.style.backgroundColor="#d9d9ff";},false);
		newBTN.addEventListener("mouseout",function(){this.style.color="white";this.style.backgroundColor="#669";},false);
		newBTN.setAttribute('style',"cursor:pointer;color:#fff;text-decoration:none;margin:0px;background:#669;padding:6px 6px 6px 6px;margin:0px;border-bottom:solid #3d3d3d 1px;border-left:solid #3d3d3d 1px;border-right:solid #3d3d3d 1px;border-top:solid #3d3d3d 1px;white-space:nowrap;-webkit-text-size-adjust:none;");
		newBTN.title = text;
		newBTN.innerHTML = text;
		return newBTN;
	}
	function toggleTabMenu(parentTab)
	{
		if (document.getElementById('smgm_tabDiv'))
		{
			document.body.removeChild(document.getElementById('smgm_tabPop'));
			document.body.removeChild(document.getElementById('smgm_tabDiv'));
		}else{
			var pos = findPos(parentTab);
			bgDiv = document.createElement('div');
			bgDiv.id = "smgm_tabDiv";
			bgDiv.setAttribute("style","position:absolute;width:200px;height:100%;z-index:799;");
			bgDiv.style.top = "0px";
			bgDiv.style.left = pos[0]-65+ "px";
			document.body.appendChild(bgDiv);
			popDiv = document.createElement('div');
			popDiv.id = "smgm_tabPop";
			popDiv.setAttribute('style','-moz-box-shadow:2px 2px 4px #333;-webkit-box-shadow:2px 2px 4px #333;box-shadow:2px 2px 4px #333;text-align:left;color:#000;top:0px;left:0px;background-color:#fff;font-size:10pt;font-family:verdana;position:absolute;z-index:7999;');
			popDiv.style.top = pos[1] + "px";
			popDiv.style.left = pos[0]+ "px";
			popDiv.addEventListener("click",function(){toggleTabMenu();},false);
			popDiv.appendChild(makePop("Main","http://www.fark.com/"));		
			popDiv.appendChild(makePop("Sports","http://www.fark.com/sports"));		
			popDiv.appendChild(makePop("Business","http://www.fark.com/business"));
			popDiv.appendChild(makePop("Geek","http://www.fark.com/geek"));
			popDiv.appendChild(makePop("Entertainment","http://www.fark.com/entertainment"));
			popDiv.appendChild(makePop("Politics","http://www.fark.com/politics"));
			popDiv.appendChild(makePop("Video","http://www.fark.com/video"));
			popDiv.appendChild(makePop("Foobies","http://www.foobies.com"));
			if (document.getElementById('userName')) popDiv.appendChild(makePop("Commented","http://total.fark.com/commented/"));		
			if (document.getElementById('userName')) popDiv.appendChild(makePop("Greenlit","http://total.fark.com/Greenlit.html")); 
			document.body.appendChild(popDiv);
			setTimeout(function(){bgDiv.addEventListener("mouseover",function(){toggleTabMenu();},false);},50);	
		}
	}
	
	//add a tab tab menu
	tabRow = document.getElementById('catMenu');
	lastTab = tabRow.getElementsByTagName('li')[tabRow.getElementsByTagName('li').length-1];
	plusMenu = document.createElement('li');
	plusMenu.id = "smgm_pmParent";
	plusMenu.innerHTML = "<a href='javascript:void(0);'>[+]</a>";
	plusMenu.title = "All Tabs";
	plusMenu.addEventListener('mouseover',function(){toggleTabMenu(this);},false);
	lastTab.parentNode.insertBefore(plusMenu, lastTab.nextSibling);
	
	function makeTab(text,url)
	{
		newTab = document.createElement('li');
		newTab.innerHTML = "<a href=\"" + url + "\">" + text + "</a>";
		return newTab;
	}
	if (document.getElementById('userName')) lastTab.parentNode.insertBefore(makeTab('myFark','http://www.fark.com/cgi/users.pl?self=1'), lastTab.nextSibling);
	lastTab.parentNode.insertBefore(makeTab('Voting','http://www.fark.com/LinkVote.html'), lastTab.nextSibling);
	
	
	//thread stuff: add a little "arrow" if post mentions your name, kill RIP, fix anchors, etc.
	if (document.location.href.match(/http:\/\/.*?\.fark\.com\/comments\//) != null) 
	{
		if (document.evaluate('//tr[contains(@class, "headlineRow")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0))
		{
			commentHeadline = document.evaluate('//tr[contains(@class, "headlineRow")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			commentHeadline.getElementsByTagName('a').item(0).href = unescape(commentHeadline.getElementsByTagName('a').item(0).href.replace(/http:\/\/.*?fark.com\/cgi\/go.pl\?i=[^>]+&l=/g, '').replace(/http:\/\/.*?fark.com\/goto\/.*?\//g, ''));
			for (k=0;k<commentHeadline.getElementsByTagName('a').length;k++)
				if (commentHeadline.getElementsByTagName('a')[k].href.indexOf('go.pl') > -1 || commentHeadline.getElementsByTagName('a')[k].href.indexOf('/goto/') > -1) commentHeadline.getElementsByTagName('a')[k].href = commentHeadline.getElementsByTagName('a')[0].href;
		}
		var myname = (document.getElementById('userName')) ? document.getElementById('userName').getElementsByTagName('a').item(0).innerHTML.substr(0,document.getElementById('userName').getElementsByTagName('a').item(0).innerHTML.length-1) : "/guest/";
		myname = myname.toLowerCase();
		var highlight = "data:image/gif,GIF89a%10%00%10%00%F7%00%00%00%00%00%FF%FF%FF%F8%FA%F9%F5%F7%F6%AD%E1%BE%7D%A2%89%82%9A%8A%DB%F3%E3%EA%F0%EC%E6%EC%E8%F5%F8%F6%19%C5P%1F%DF%5B%17%A8D!%D5X'%F1f%18%95%3E(%D7%5D%26%C6W%1D%8E%3F%1A%7F85%F4n7%F6q%14P%26%19%5C-%1C%5B%2FP%F1%80D%80Wj%C6%86%81%EC%A2%86%F3%A73%5B%3F2W%3DL%7D%5B%9D%E9%B5T%7C%60%5D%86j%5D%85i%5E%85jz%9F%85%7D%9D%87%C2%F0%D0%7D%9B%86%83%9D%8B%CC%EF%D7%D8%F1%E0%19u4*%BBT%1F%89%3D%1Bn3%19c.%3F%F1r%26%93D%3D%E7m-%ABP%26%91D3%BFZ-%A5N%13F%223%B6W%23h7X%ED%83G%B6g%20M-0kA%2B%5E%3Av%FC%9C4oE2d%40%83%F7%A4DwS%8E%F7%AC%97%FD%B3%95%FA%B1AjMLzYJwWb%92p%A1%EF%B7%A7%E2%B8%2B%9DJ*%97G%1Fi2%20j3%3C%C0_.%91GG%D1k%2CyA%2Bf%3Ab%E7%85R%B7me%CD%81%7F%F8%9E%84%E7%9D%90%F5%AA~%D0%93%9B%FD%B5%9A%FC%B3%9C%FD%B5R%85_%5E%8Aj%A9%F5%BD%9E%E5%B1%8F%CA%9Ec%85lc%82k2%97K%25o7%26p7%25n6D%C6dD%C4dR%EBxP%DEsF%BFb1%84D%5C%E7%7C%40%97T9%7DJh%DE%85%5D%C4vf%D2%80%B1%F9%C3%93%CA%A0%B9%FB%C8%5C%7Cd6%8FJ%3E%9DR3%81D5%84F%3E%9ARV%CAoK%B1%60j%ED%85%7C%D6%8FM%81X%96%EA%A8JpR%9B%D2%A7%95%CA%A1%40%93OG%A1XB%93QU%BAiv%F8%90k%DF%80%3E%81Ks%EC%89N%9A%5C%97%F6%A9%96%F0%A8%8C%D0%99%EA%EF%EBJ%A0YH%9CWf%CEwM%9CZh%CExU%A8br%DD%83%9F%EE%AC%93%D2%9DR%A1%5Ez%E5%8A%7B%DC%89%3FmF%3EiDm%C5wL%87S%93%D8%9B%7C%D0%84~%CF%85%95%E5%96%7C%BB%7B%93%D7%8F%B5%E3%A6%B4%DA%9F%06%06%04%0A%0A%07%0E%0E%0A%07%07%05%16%16%10%0B%0B%08%1E%1E%16%0F%0F%0B%1F%1F%17%1B%1B%14%17%17%11%1C%1C%15%14%14%0F%10%10%0C%0C%0C%09%08%08%06%04%04%03%15%15%10%0D%0D%0A%09%09%07%01%01%01%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%C6%00%2C%00%00%00%00%10%00%10%00%00%08%FF%00%8D%11%C3U%8BW%AE%5B%BAz%0D%03%16%AC%18%00%00%C6hE%A8%20%04%09%181a%92%1C%F1%D0A%04%8B%16%00d%BD%A8%B1%E5%CC%9EE%8A%F8%E8)%E3%24%C5%01%02%C5%86%E5%E0%B1%A1%84%09%13%23%C6%80%B2%D4%C5%CC%13%0E%C1~Eqs%A5%89%80%00%01NdP%F5%C9%D0%17%1F%B2%88%DD%A0B%A7%CE%10%04H%13%04A%95%EA%92%16_%B4%60%EC%883i%D5%05%14H%07%F4I%14%0A%CF%AE%60%14lX%89%C4%EAU%A94H%03%18%00%91%87W0%17P%E4tr%05%CB%14%9A%BC%2B%3E%DC%E1%15%2BF%15B%A7Z%E9P%81T%01%99C%88%B2%EC%226%C5%CF%23ID0!E%00%84R%25%2F%3D%7C%D9Z%23%08%0B%89%A3%01%0A%60%20%05%89K%11%0D%B2%86%B1%F9%A1%84%C9%92%10F%EC%8C*%04g%86%85%07%C1dI%99%13%C8%11'Q%9E6%0Dz%83C%82%03%06%C5h%C9h%03%88%91%A6L%8D%FE%A8%14%A11%01B%83%05%10%07%16%CC%95K%97%B0Y%0C%1DB%0C%08%00%3B";
		var favIcon = "data:image/gif;base64,R0lGODlhEwATANUAAAAAAP////U1NvM4OfI5O+pBSOlCSeBMWN9NWtxRX9pTYthUZNRZa9Jbb9Fccc9fdMtiesllfcZog8NsiMFtir5xj7xzk7t0lbV6nq+BqKuGr6iIs6CSwZ2UxZuXyJqYypmZzPY0NLS0tG1tbSUlJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEwATAAAGg0CRcEgsDkfGJHFEEoKe0KiU1BQ9ORJHBopxWD5PqpNjCJkroIY5pAhXQZB1iFCRhzAgsbVgF9gZeVUfdoQhCIFOA4VyCYhWCotrFI4gG4qLB2B6TxplhAsdbk5PHQtyAhNRm1FxIQIXU29SDyEWUpRSHhG3uLy3YkxUwsPEVMHFyMJBADs=";
		var unfavIcon = "data:image/gif;base64,R0lGODlhEwATANUAAAAAAP////U1NvM4OfI5O+87P+0+QutARupBSOlCSeZGT+RHUeJJVOBMWN9NWtxRX9tSYdpTYthUZNVYatRZa9Jbb9Fccc9fdMtiespkfMllfcZog8VphMNsiMFtir5xj7xzk7t0lbl1l7d5nLV6nrN8obN9orCApq+BqKmHsaiIs6eKtaaKtqSNuqOOvKGRv6CSwZ2UxZyVx5uXyJqYypmYy5mZzDg4QSoqLfY0NLS0tG1tbSUlJQAAAAAAAAAAACwAAAAAEwATAAAGq0CdcEgsDnfGJHHHE9qe0KiU19Q9YRsLCkoy0WhPqhOWyJk/tkqulYqEqzaM2Uz45Ba2TI5kE1sRczkEAjkcNAc5FH1VNIEJKQY5KidmDotOA3MZNisQNhZmD5dWEXMoJS40MwVmHqM2KpkFNBAKLyNmDWB+Vw0TMpkMEDkSMW9OTzUsuGYCHVG8USLNIVNwUhc5IFKvUjMa3N3h3GI7NzhU6errPEzo7PBUQQA7";
		var blockIcon = "data:image/gif;base64,R0lGODlhEwATAPcAAAAAAP///9EAAc8AAboAAeADBNQEBq8DBMMGCJIEBoAEBYsFBpILDnQUFnMVF2YoKZcLD5sRF5kRF40SF2wcH3BVVpMYII4YH3AsMG41OHBDRm9HSX8fJoQlLXM9QXVITHBGSXlaXYs5RXVUWXZiZnhna3NnanhlanBmaXtrcoRhc39rdXtsdXhud3tqendud2ppandveXNwdHRteHNqeXNvdnRvenJvfG1pf3Zyl4mIroOCo5mZzJeXyV1dXpSVx5OUxoyNvJiZy5aXyYmMu4uNvYiLuYOFsoGDr5GTw4uPv32BrIiMunp9pW5vfoWKuH6CrHh+p2lwkGVujWZwkGZsgGluf2NshmNshWpwgGJtiWJtiGFui2BtiWdvgGFod2pvemNvhGlxfmhtdWFvfmBqdWtxeGRyfllgWm9uXHpyU//poaCLXMGpdXZrUpaBVnpsUXlsUcutd9u3fntvXPzLiXltX3ltZYNlU2hlZHNwb25jYH5ORYJEO3VdWoAxKXRJRW5kY3saFW81McESDI4NCf8AAPwAAPYAAPUAAPQAAPMAAPIAAPEAAPAAAO8AAO4AAOwAAOsAAOkAAOUAAOQAAOEAAN0AANwAANoAANkAANUAANMAAM8AAMwAAMsAAMgAAMUAAMMAAL8AAL4AALsAALoAALkAAKgAAJ8AAJYAAJQAAIoBAYMCApQDA4ADA3MODmkoJ2tAQG5UVHFlZbS0tG1tbSUlJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEwATAAAI/wBrCRxIsOBAWwYTErR1SyAPHkCQ4CjxwQMJHEd+PORxq2EtHkO6tIgwQNOlThJeTOnxsKPAJFxGmHIEilUrUIpIhaAChKNHIidEGfqkQgaaGSIQkUrBxKfAHAsooYJk4Y4cOmMoNEpQJYjLWisKHPDx6hCsOHV2fEGwCYWXr7IiXSBDg5CkP2x0XJmACUSWrw8mdQgDxk8oS3zMYOGQKYOVrxsYMSijJw0gS6NMnIFgqYKYry4MjNrzZo2aWJBQzRLgqYaUr00aPCrkps0cOIIicYrkQMuQr0VipFrkqg8eO4MqGVJlQ4mQrzyisFiVCFOpU5gqKWCxpKXHh1FuYCRQJYoAKw1OoGyE/vDJljy0AsHYYmSjU4Yd8+vf3xE////5BQQAOw==";
		var unblockIcon = "data:image/gif;base64,R0lGODlhEwATAOYAAAAAAP///6ydrLKitbanvbKlwLGkwLGlwKmfvqacuqqhxaScvamhxaefxaGbxE5NVKGcyqCbxqCcy5iUvFVUX1RTXZ2azZ6bzZ+czH58n5yazpuZzZuZzJiWx5aUxZ2bzZSSwZORwImHsIeFrYiGrnNyjmppgJGQvoiHr4eGroaFrH9+on18nnl4mFVVYFNTXEdHSkRERURFSSEkIWtta7W2tf/LjP/MjPnHifzJi/rHivfFifbEiPXDiPXEiPPCh/HAhvHBhu+/hfLCiO7Ahea4gee5guO2gOG1f+C0f9yxfdetetmvfNOqedOreduxftiwgfTCiOi7iPDCjvXGk9uyg0JCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEwATAAAHsYA1goOEhYM0homENDOCGo+QkZIzjTWSkRUPLCMdGpSOlxsiJxouViielZcaHDIwJBoUGamgGhYKDY8eGjApvLSWGhcEPkQIKzEmvCAvwI8FNkBJShMtViWRn8EGPTw3TwIaKiHZqhoHRkc2UQmr2pADTlIfq84aDFM/Q1AR7uZUR4rkQFIFw6V3GnYwwWFDxxIJB83pEGLDRpAmECLWguRggb8ajCiJHEmSUsiSKEUGAgA7";
		var workingIcon = "data:image/gif;base64,R0lGODlhEwATALIAALS0tG1tbSUlJZmZzAAAADg4QSoqLQAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFFAAHACwAAAAAEwATAAADOwi63BsusiDUuDhrUYH+GWeBoOiRn4mm3bq1ROyqMTHD8qq62M4PPl7wNvoNdZVAwcBpOp8CChNK5SQAACH5BAUUAAcALAgACAADAAMAAAMDSLqbACH5BAUUAAcALA0ACAADAAMAAAMDSLqbACH5BAUUAAcALAMACAADAAMAAAMDOLqbACH5BAUUAAcALAgACAADAAMAAAMDOLqbACH5BAUoAAcALA0ACAADAAMAAAMDOLqbADs=";
		var replyFindIcon = "data:image/gif;base64,R0lGODlhEwATALMAAAAAAP///6W+2Mvi+ndxYkZDPM++n7S0tHNzc////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAATABMAAARMMMlJq70464u69xkSjCSJcONRIMXhjmclBkUwDLVpzcgtIK9AjDIrDASCHGyXWq0MhyWzVCAYpFNSoTbkeEpdDW9DFJInoLN6za5EAAA7";
		if (document.location.href.match(/http:\/\/.*?\.fark\.com\/comments\/([0-9]+)/))
			var thisthread = document.location.href.match(/http:\/\/.*?\.fark\.com\/comments\/([0-9]+)/)[1];
		else
			var thisthread = document.location.href.match(/http:\/\/.*?\.fark\.com\/comments\/(blog[0-9]+)/)[1];
		var postHeaders = document.evaluate('//table[contains(@class, "ctable")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var tooltip = '';
		var	theColor = '';
		var userid;
		
		//get blockedUsers
		function reloadBlockedUsers(force)
		{
			var d = new Date(); 
			var bCheck = GM_getValue("bCheck");
			if (isNaN(bCheck)) { bCheck=d.getTime();GM_setValue('bCheck',bCheck+''); }
			if ((Math.floor((d.getTime()-bCheck)/(5*60*1000)) > 1) || force == 1)
			{
				GM_xmlhttpRequest({
					method:"GET",
					url:"http://www.fark.com/users/" + myname + "/tools",
					onload:function(details)
					{
						var ignoredUsers = new Array();
						var blockedUsers = "";
						ignoredUsers = details.responseText.match(/ignorelist_note.*?>\n.*?\/users\/(.*?)\">/g);
						for(j=0; j<ignoredUsers.length; j++){
							blockedUsers += unescape(ignoredUsers[j].match(/ignorelist_note.*?value=\"(.*?)\".*?>\n.*?\/users\/(.*?)\">/)[2] + "|||" + ignoredUsers[j].match(/ignorelist_note.*?value=\"(.*?)\".*?>\n.*?\/users\/(.*?)\">/)[1]);
							blockedUsers += (j != ignoredUsers.length-1) ? "@@@" : "";
						}
						GM_setValue('blockedUsers',blockedUsers);
						GM_xmlhttpRequest({
							method:"GET",
							url:"http://www.fark.com/users/" + myname + "/recent"
						});
					}
				});	
				GM_setValue('bCheck',d.getTime()+'');
			}
		}

		if (myname != "/guest/")
			reloadBlockedUsers(0);

		//ignore and favorite IN THREAD
		function doRedraw(theAction,buttonID) //redraw thread without reloading, lotta code for an aesthetic thing
		{
			var userid = buttonID.split('@_@')[1];
			oldButton = document.getElementById(buttonID);
			if (theAction.toLowerCase().indexOf('fave') > -1)
			{
				if (theAction.toLowerCase().indexOf('unf') > -1){ //unfave realtime so reset all the posts to no coloring
					for (var i = 0; i < postHeaders.snapshotLength; i++)
					{
						var header2 = postHeaders.snapshotItem(i);
						var start=0;
						while (header2.getElementsByTagName('a').item(start).href.indexOf('#') > -1) start++;
						var uid = header2.getElementsByTagName('a').item(start).innerHTML;
						if (document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6)))
						{
							if (uid.toLowerCase() == userid.toLowerCase())
							{
								document.evaluate(".//span[contains(@id, 'favignout')]", header2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = '&nbsp;';
								thePost = document.getElementById('ct' + postHeaders.snapshotItem(i).id.substr(6));
								if (thePost) //you could favorite someine in a thread who has a collapsed post because they quoted an AW or something
								{
									thePost.style.backgroundColor = '';
									thePost.style.borderWidth = '0px';
								}
							}
						}
					}
					//convert the icons to fave (since we're unfaving)
					var favIcons = document.evaluate("//span[contains(@id, \"@_@" + userid +"@_@Unfa\")]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					for (var k = 0; k < favIcons.snapshotLength; k++)
					{
						otherOldButton = document.getElementById(favIcons.snapshotItem(k).id);

						//gotta add an ignore button
						ignButton = document.createElement('span');
						ignButton.id = 'ign' + k + '@_@' + userid + '@_@' + 'Ignore ';
						ignButton.addEventListener('click',function(){UserCtl(this.id,'Ignore ');},false);
						ignButton.innerHTML = '<img class="smgm_fbutton" src="' + blockIcon + '" border="0" title="Ignore ' + userid + '">';
						otherOldButton.parentNode.insertBefore(ignButton,otherOldButton.nextSibling);
						
						altButton = document.createElement('span');
						altButton.id = favIcons.snapshotItem(k).id.replace(/@_@Unfave $/,'@_@Fave ');
						altButton.addEventListener('click',function(){UserCtl(this.id,'Fave ');},false);
						altButton.innerHTML = '<img class="smgm_fbutton" src="' + favIcon + '" border="0" title="Fave ' + userid + '">';
						otherOldButton.parentNode.replaceChild(altButton,otherOldButton);
					}
				}
				else //remove ignore button, change hearts to broken hearts
				{
					for (var i = 0; i < postHeaders.snapshotLength; i++)
					{
						var header2 = postHeaders.snapshotItem(i);
						var start=0;
						while (header2.getElementsByTagName('a').item(start).href.indexOf('#') > -1) start++;
						var uid = header2.getElementsByTagName('a').item(start).innerHTML;
						if (document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6)))
						{
							if (uid.toLowerCase() == userid.toLowerCase()) //go through posts to change them to what you've set
							{
								document.evaluate(".//span[contains(@id, 'favignout')]", header2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = ' <i>(favorite: ' + unescape(tooltip) + ')</i>';
								thePost = document.getElementById('ct' + postHeaders.snapshotItem(i).id.substr(6));
								if (thePost) //you could favorite someone in a thread who has a collapsed post because they quoted an AW or something
								{
									thePost.style.backgroundColor = '#' + theColor.split('/')[0];
									thePost.style.borderStyle = 'solid';
									thePost.style.borderColor = '#' + theColor.split('/')[1];
									thePost.style.borderWidth = '1px';
								}
							}
						}
						//convert the icons to unfave
						var favIcons = document.evaluate("//span[contains(@id, \"@_@" + userid +"@_@F\")]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						for (var k = 0; k < favIcons.snapshotLength; k++)
						{
							otherOldButton = document.getElementById(favIcons.snapshotItem(k).id);
							altButton = document.createElement('span');
							altButton.id = favIcons.snapshotItem(k).id.replace(/@_@Fave $/,'@_@Unfave ');
							altButton.addEventListener('click',function(){UserCtl(this.id,'Unfave ');},false);
							altButton.innerHTML = '<img class="smgm_fbutton" src="' + unfavIcon + '" border="0" title="Unfave ' + userid + '">';
							otherOldButton.parentNode.replaceChild(altButton,otherOldButton);
						}
						//remove block icons
						var ignIcons = document.evaluate("//span[contains(@id, \"@_@" + userid +"@_@Ign\")]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						for (var k = 0; k < ignIcons.snapshotLength; k++)
							ignIcons.snapshotItem(k).parentNode.removeChild(ignIcons.snapshotItem(k));
					}
				}
			}
			else if (theAction.toLowerCase().indexOf('ignore') > -1) //rebuild thread quick to remove douchebag
			{
				reloadBlockedUsers(1);
				var ignorePref = 0;
				GM_xmlhttpRequest({
				method:"GET",
				url:"http://www.fark.com/users/" + myname + "/prefs",
				onload:function(details)
				{
					ignorePref = details.responseText.match(/name="pref_show_ignored_header" id="pref_show_ignored_header" value=".*?"(.*?)>/);
					if (ignorePref[1].indexOf("checked") > -1) ignorePref = 1;
					if (ignorePref == 0){ //fark prefs: chosen to remove entire posts from blocked people. ignorePref 1 = display headers of blocked posts
						if (confirm("Perform instant refresh of thread to remove our newly blocked friend?"))
						{
							for (var i = 0; i < postHeaders.snapshotLength; i++)
							{
								username = document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6)).innerHTML.toLowerCase();
								if (username == userid.toLowerCase())
								{
									postHeaders.snapshotItem(i).parentNode.removeChild(postHeaders.snapshotItem(i)); //title
									document.getElementById('ct' + postHeaders.snapshotItem(i).id.substr(6)).parentNode.removeChild(document.getElementById('ct' + postHeaders.snapshotItem(i).id.substr(6))); //post
								}
							}
						}
					}else{ //show headers only with blocked comment
						for (var i = 0; i < postHeaders.snapshotLength; i++)
						{
							var header2 = postHeaders.snapshotItem(i);
							var start=0;
							while (header2.getElementsByTagName('a').item(start).href.indexOf('#') > -1) start++;
							var uid = header2.getElementsByTagName('a').item(start).innerHTML;
							if (document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6)))
							{
								if (uid.toLowerCase() == userid.toLowerCase()) //go through posts to change them to what you've set
								{
									document.evaluate(".//span[contains(@id, 'favignout_c')]", header2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = ' <i>(ignored: ' + unescape(tooltip) + ')</i>';
									document.evaluate(".//span[contains(@id, 'favbutton')]", header2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML="";
									postHeaders.snapshotItem(i).getElementsByTagName('td').item(1).style.backgroundColor = "#DFDFDF"; //title
									document.getElementById('ct' + postHeaders.snapshotItem(i).id.substr(6)).parentNode.removeChild(document.getElementById('ct' + postHeaders.snapshotItem(i).id.substr(6))); //post
								}
							}
							//convert the icons to unblock
							var ignIcons = document.evaluate("//span[contains(@id, \"@_@" + userid +"@_@Ign\")]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							for (var k = 0; k < ignIcons.snapshotLength; k++)
							{
								otherOldButton = document.getElementById(ignIcons.snapshotItem(k).id);
								altButton = document.createElement('span');
								altButton.id = ignIcons.snapshotItem(k).id.replace(/@_@Ignore $/,'@_@Unignore ');
								altButton.addEventListener('click',function(){UserCtl(this.id,'Unignore ');},false);
								altButton.innerHTML = '<img class="smgm_fbutton" src="' + unblockIcon + '" border="0" title="Unignore ' + userid + '">';
								otherOldButton.parentNode.replaceChild(altButton,otherOldButton);
							}
							//remove fave icons
							var favIcons = document.evaluate("//span[contains(@id, \"@_@" + userid +"@_@Fave\")]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							for (var k = 0; k < favIcons.snapshotLength; k++)
								favIcons.snapshotItem(k).parentNode.removeChild(favIcons.snapshotItem(k));
							
							//if enabled,go through and remove anyone quoting your new blocked friend
							if (threadedBlock)
							{
								var blockedFolks = new Array();
								blockFolks = (GM_getValue('blockedUsers')+'@@@'+userid).split("@@@");
								for (var a=0;a<blockFolks.length;a++) {
									var blockComment = blockFolks[a].split("|||")[1];
									var re1 = new RegExp('\/comments\/.*?#c[0-9]+?".*?>' + blockFolks[a].split("|||")[2] + '<\/a>:<\/b>', 'i');
									var re2 = new RegExp('<\/a>:<\/b> <i>.*?' + blockFolks[a].split("|||")[2] + ': ','i');
									var re3 = new RegExp('<b>' + blockFolks[a].split("|||")[2] + ':<\/b> <i>','i');
									var re4 = new RegExp('<i>.*?' + blockFolks[a].split("|||")[2] + ':.*?</i>','i');
									var re5 = new RegExp('\/comments\/[0-9]+?\/[0-9]+?".*?>' + blockFolks[a].split("|||")[2] + '<\/a>:<\/b>', 'i');
									var matchType = 0;
									var thePost = document.getElementById('ct' + postHeaders.snapshotItem(i).id.substr(6));
									if (thePost)
									{
										if (thePost.innerHTML.match(re1)) matchType = 1;
										if (thePost.innerHTML.match(re2)) matchType = 2;
										if (thePost.innerHTML.match(re3)) matchType = 3;
										if (thePost.innerHTML.match(re4)) matchType = 4;
										if (thePost.innerHTML.match(re5)) matchType = 5;
										if (matchType > 0){ //quoted!
											if (blockComment.toLowerCase().match(/uberblock/)) //user is an uberwhore or troll, don't even want to see collapsed comments or headers. Let's nuke the bitch without fucking up the post count
											{
												postHeaders.snapshotItem(i).parentNode.removeChild(postHeaders.snapshotItem(i));
											}else{
												puthere = document.evaluate(".//span[contains(@id, 'favignout')]", header2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
												puthere.innerHTML += '<i>(post collapsed: contains ' + blockFolks[a].split("|||")[2] +' quote)</i>';
												postHeaders.snapshotItem(i).getElementsByTagName('td').item(1).style.backgroundColor = "#669"; //title
												oldPostdiv = document.createElement('div');
												embeddedtag = document.createElement('div');
												oldInner = "<div style='margin-top:8px;'>" + thePost.innerHTML +"</div>";
												embedid = (i+500) + "blockquote_embedded";
												embeddedtag.id = embedid;
												embeddedtag.style.display = 'none';
												embeddedtag.innerHTML = oldInner;
												oldPostdiv.id = (i+500);
												blockText = (matchType==2) ? 'someone else quoting ' + blockFolks[a].split("|||")[2] : blockFolks[a].split("|||")[2];
												oldPostdiv.innerHTML = "<div style='display:inline;padding:2px;border:1px dotted #000;background:#f7f7f7;font-size:10pt;font-weight:bold;color:#737373'><i>   Someone quoted " + blockText + ", click to view post</i></div>";
												oldPostdiv.setAttribute("style", "align:left;");
												oldPostdiv.addEventListener('click', function(){toggleembed(this.id,'blockquote');}, false);
												oldPostdiv.appendChild(embeddedtag);
												thePost.parentNode.replaceChild(oldPostdiv,thePost);
											}
										}
									}
								}
							}
						}
					}
				}
				});
			}
		}

		function hideFav()
			document.body.removeChild(document.getElementById('smgm_favPop'));
			
		function UserCtl(useridlong,action)
		{
			userid = useridlong.split('@_@')[1];
			theLink = '';
			tooltip = '';
			theColor = '';
			doFave = 0;
			oldButton = document.getElementById(useridlong);
			workingbutton = document.createElement('span');
			workingbutton.id = useridlong;
			workingbutton.innerHTML = '<img class="smgm_fbutton" src="' + workingIcon + '" border="0" title="Working...please wait">';
			oldButton.parentNode.replaceChild(workingbutton,oldButton);

			GM_addStyle("#smgm_favPop { -moz-box-shadow: 3px 3px 5px #000;padding:5px;vertical-align:middle;position:absolute;border:3px dotted #000;background-color:#fff;color:#000;font-family:arial,verdana;font-size:10pt;z-Index:9999;display:block;visibility:visible;}");
			GM_xmlhttpRequest({ //fetch the user's profile page to get the add/remove/block links
				method:"GET",
				url:"http://www.fark.com/users/" + userid,
				onload:function(details)
				{
					if (action.toLowerCase().indexOf('fave') > -1)
					{
						theLink = details.responseText.match(/\"favuserlist_add\"/); //user not a fave, faving
						if (!theLink)
						{
							hash = details.responseText.match(/name=\"(favuserlist_del_.*?)\" value/)[1];
							tok = details.responseText.match(/name=\"tok\" value=\"(.*?)\"/)[1];
							theLink = 'http://www.fark.com/users?uaction=Ed&' + hash + '=1&tok=' + tok;
							GM_xmlhttpRequest({
									method: "GET",
									url: theLink,
									onload:function(details){
										doRedraw(action,useridlong);
									}
									});
						}else{
							tok = details.responseText.match(/name=\"tok\" value=\"(.*?)\"/)[1];
							//dynamically add a favorite note
							function addFav()
							{
								tooltip = escape(document.getElementById("smgm_comment").value);
								theColor = document.getElementById("smgm_color").value;
								if (action.toLowerCase() == 'fave ')
								{
									GM_xmlhttpRequest({
									method: "GET",
									url: 'https://www.fark.com/users?uaction=Ed&favuserlist_add=' + userid + '&tok=' + tok + '&favuserlist_addnote=' + tooltip + '&favuserlist_addcol=' + theColor,
									onload:function(details){
										doRedraw(action,useridlong);
									}
									});
								}
							}
							
							favPopup = document.createElement('div');
							favPopup.innerHTML = '<table style="font-size:8pt;"><tr><td style="border-bottom:1px dotted #000;" colspan="2">Select Color/Note for ' + userid + '</td></tr><tr><td>Color: </td><td><select style="background-color: #99ff99;" id="smgm_color" onchange="farkTweakOptionColor(this);"><option value="ffffff/ffffff" style="background-color: #ffffff;">-none-</option><option value="3333ff/0000ff" style="background-color: #3333ff;">blue 1</option><option value="6666ff/0000ff" style="background-color: #6666ff;">blue 2</option><option value="9999ff/3333ff" style="background-color: #9999ff;">blue 3</option>' +
							'<option value="ccccff/6666ff" style="background-color: #ccccff;">blue 4</option><option value="e5e5ff/9999ff" style="background-color: #e5e5ff;">blue 5</option><option value="33ffff/00ffff" style="background-color: #33ffff;">cyan 1</option><option value="66ffff/00ffff" style="background-color: #66ffff;">cyan 2</option>' +
							'<option value="99ffff/33ffff" style="background-color: #99ffff;">cyan 3</option><option value="ccffff/66ffff" style="background-color: #ccffff;">cyan 4</option><option value="e5ffff/99ffff" style="background-color: #e5ffff;">cyan 5</option><option value="33ff33/00ff00" style="background-color: #33ff33;">green 1</option>' +
							'<option value="66ff66/00ff00" style="background-color: #66ff66;">green 2</option><option value="99ff99/33ff33" style="background-color: #99ff99;" selected="selected">green 3</option><option value="ccffcc/66ff66" style="background-color: #ccffcc;">green 4</option><option value="e5ffe5/99ff99" style="background-color: #e5ffe5;">green 5</option>' +
							'<option value="575757/000000" style="background-color: #575757;">grey 1</option><option value="757575/111111" style="background-color: #757575;">grey 2</option><option value="949494/222222" style="background-color: #949494;">grey 3</option><option value="b3b3b3/333333" style="background-color: #b3b3b3;">grey 4</option>' +
							'<option value="c2c2c2/444444" style="background-color: #c2c2c2;">grey 5</option><option value="d9d9d9/555555" style="background-color: #d9d9d9;">grey 6</option><option value="f0f0f0/666666" style="background-color: #f0f0f0;">grey 7</option><option value="ff9933/ff7f00" style="background-color: #ff9933;">orange 1</option>' +
							'<option value="ffb266/ff7f00" style="background-color: #ffb266;">orange 2</option><option value="ffcc99/ff9933" style="background-color: #ffcc99;">orange 3</option><option value="ffe5cc/ffb266" style="background-color: #ffe5cc;">orange 4</option><option value="fff2e5/ffcc99" style="background-color: #fff2e5;">orange 5</option>' +
							'<option value="ff33ff/ff00ff" style="background-color: #ff33ff;">purple 1</option><option value="ff66ff/ff00ff" style="background-color: #ff66ff;">purple 2</option><option value="ff99ff/ff33ff" style="background-color: #ff99ff;">purple 3</option><option value="ffccff/ff66ff" style="background-color: #ffccff;">purple 4</option>' +
							'<option value="ffe5ff/ff99ff" style="background-color: #ffe5ff;">purple 5</option><option value="ff3333/ff0000" style="background-color: #ff3333;">red 1</option><option value="ff6666/ff0000" style="background-color: #ff6666;">red 2</option><option value="ff9999/ff3333" style="background-color: #ff9999;">red 3</option>' +
							'<option value="ffcccc/ff6666" style="background-color: #ffcccc;">red 4</option><option value="ffe5e5/ff9999" style="background-color: #ffe5e5;">red 5</option><option value="ffff33/ffff00" style="background-color: #ffff33;">yellow 1</option><option value="ffff66/ffff00" style="background-color: #ffff66;">yellow 2</option>' +
							'<option value="ffff99/ffff33" style="background-color: #ffff99;">yellow 3</option><option value="ffffcc/ffff66" style="background-color: #ffffcc;">yellow 4</option><option value="ffffe5/ffff99" style="background-color: #ffffe5;">yellow 5</option></select></td><tr>' +
							'<tr><td>Comment: </td><td><input size="25" type="text" id="smgm_comment" value="Favorited in thread ' + thisthread + '"></td></tr>' +
							'<tr><td style="text-align:center;" colspan="2"><input type="button" value="Ok" id="smgm_okButton" style="margin-right:5px;"><input style="margin-left:5px;" type="button" value="Cancel" id="smgm_cancelButton"></td></tr></table>';
							favPopup.id = 'smgm_favPop';
							favPopup.style.display = "block";
							var pos = findPos(workingbutton);
							favPopup.style.top = pos[1]+10 + "px";
							favPopup.style.left = pos[0]-152 + "px";
							favPopup.style.width = "250px";
							favPopup.style.backgroundColor = "#efefef";
							favPopup.style.height = "";
							document.body.appendChild(favPopup);
							document.getElementById("smgm_okButton").addEventListener("click",function(){addFav();hideFav();},false);
							document.getElementById("smgm_cancelButton").addEventListener("click",function(){document.getElementById(useridlong).parentNode.replaceChild(oldButton,document.getElementById(useridlong));hideFav();},false);
						}
					}
					else if (action.toLowerCase().indexOf('ignore') > -1)
					{
						theLink = details.responseText.match(/\"ignorelist_add\"/); //we blocking
						if (!theLink) //him already blocked, unblock
						{
							hash = details.responseText.match(/name=\"(ignorelist_del_.*?)\" value/)[1];
							tok = details.responseText.match(/name=\"tok\" value=\"(.*?)\"/)[1];
							theLink = 'http://www.fark.com/users?uaction=Ed&' + hash + '=1&tok=' + tok;
							GM_xmlhttpRequest({
								method: "GET",
								url: theLink,
								onload:function(details){
									var blockedUsers = GM_getValue('blockedUsers');
									u = blockedUsers.split("@@@");
									for (var i = 0; i < u.length; i++)
										if (userid == u[i]) 
											u.splice(i,1);
									blockedUsers = u.join("@@@");
									GM_setValue('blockedUsers',blockedUsers);
									location.reload(true);
								}
							});
						}else{
							tok = details.responseText.match(/name=\"tok\" value=\"(.*?)\"/)[1];
							function doIgnore()
							{
								tooltip = escape(document.getElementById("smgm_comment").value);
								GM_xmlhttpRequest({
									method: "GET",
									url: 'https://www.fark.com/users?uaction=Ed&ignorelist_add=' + userid + '&tok=' + tok + '&ignorelist_addnote=' + tooltip,
									onload:function(details){
										doRedraw(action,useridlong);
									}
								});
							}
							ignPopup = document.createElement('div');
							ignPopup.innerHTML = '<table style="font-size:8pt;"><tr><td style="border-bottom:1px dotted #000;" colspan="2">Enter ignore comment for ' + userid + '</td></tr>' +
							'<tr><td>Comment: </td><td><input size="25" type="text" id="smgm_comment" value="Ignored from thread ' + thisthread + '"></td></tr>' +
							'<tr><td style="text-align:center;" colspan="2"><input type="button" value="Ok" id="smgm_okButton" style="margin-right:5px;"><input style="margin-left:5px;" type="button" value="Cancel" id="smgm_cancelButton"></td></tr></table>';
							ignPopup.id = 'smgm_favPop';
							ignPopup.style.display = "block";
							var pos = findPos(workingbutton);
							ignPopup.style.top = pos[1]+10 + "px";
							ignPopup.style.left = pos[0]-152 + "px";
							ignPopup.style.width = "250px";
							ignPopup.style.backgroundColor = "#efefef";
							ignPopup.style.height = "";
							document.body.appendChild(ignPopup);
							document.getElementById("smgm_okButton").addEventListener("click",function(){doIgnore();hideFav();},false);
							document.getElementById("smgm_cancelButton").addEventListener("click",function(){document.getElementById(useridlong).parentNode.replaceChild(oldButton,document.getElementById(useridlong));hideFav();},false);
						}
					}
				}
			});
		}
		
		//make the icons for block/fave/unfave
		downarrow = 'data:image/gif;base64,R0lGODlhEAAOAOZ8AGzSOGbMMxp3Gn3fQ060J1m/KxiJFRqIF1S6KRt3HK3UpsnW0x2XGzunO8/pz+/x8ladXFOyMYu0kmrQNofMaR54H2HHL3rdQ4rEfOLl6zCUKWm+Smq7T47DhBqDGNDW38DOzLPlkoHkSBl9F63Spcvpy4a1lT23IzqcQXbLUGXKM2DBNHfYPWTHN4zHeWfNMh95Im3TN6DOlC+iK4HZTy2nH02VTejo71G2Kn6yiJ/Rn125O128NoOyhiyjIi2ELaTCry2XLnPaQW3TOUexJVi+K+7w9Gu3VHzfQ1GdW0CePxh6GIixkWi2UG3MPkKTP3W6Yla1M4HQW2DGMF3IMh6OIVyzQIjIcHG4X9Pnzvj4+3WdgmWtVi6RMGe6Sx6SGXTYPxmAGObp7mvBSTOVIlvBLJTKhVXCMIbJbH68cGjONNvg54vQbJPabHTZP13DLk61Jm7UOmG3RCKWH266V2PJMODv4HDGS+7u85rYelK5KZDUcf///wAAAAAAAAAAACH5BAEAAHwALAAAAAAQAA4AAAeagHyCg4SFglswFQkCSyNhHgcGX3M6gjZZCjJmLldoFGx7eSEzgj0kHWlQdBwbY3cpUm0NggtPGFhNcjs8Ky1ONDUlgloSXEdWUXoFUwEAVEk3g2I/XhFwRRZqQ0gMH4VAZDgIb80XJyaGRhAEZXUTYEIoa4Z8GRoqL3EiPiD0gkxEYrg5kwOPPz4PurAYUOXgIDtKgjhwSJFPIAA7';
		function followquote(theIDs)
		{
			if (!document.getElementById('ra_'+theIDs))
			{
				arrID = theIDs.split('___');
				origPostID = arrID[0];
				targetPostID = arrID[1];
				origPoster = document.getElementById(origPostID).innerHTML;
				newspan = document.createElement('span');
				newspan.id = theIDs;
				newspan.innerHTML = '<span id="ra_'+theIDs+'"><a href="#' + origPostID + '" title="Back to ' + origPoster + '\'s reply"><img src="' + downarrow + '" border="0" style="margin-right:6px;"></a></span>';
				newspan.addEventListener('click',function(){document.getElementById(theIDs).parentNode.removeChild(document.getElementById(theIDs));},false);
				document.getElementById(targetPostID).parentNode.insertBefore(newspan,document.getElementById(targetPostID));
			}
		}
			
		var myNameCount = 0;
		var extraURL='';
		if (document.location.href.match(/fark\.com\/comments\/[0-9]+?[\/|\?]/i))
			extraURL = document.location.href.match(/fark\.com\/comments\/[0-9]+?([\/|\?][^#]+)/i)[1];
		var post = 0;
		var quotedblockedtotal = 0;

		function findReplies(theID,theThread,theName)
		{
			if (document.getElementById("smgm_replyFind" + theID))
				document.body.removeChild(document.getElementById("smgm_replyFind" + theID));
			else
			{
				header = document.getElementById('cu' + theID.substr(1));
				var closeIcon = "data:image/gif;base64,R0lGODlhCgAKAIABAAAAAP///yH5BAEAAAEALAAAAAAKAAoAAAIWhI8WyxfA3oOyqnVno9piyElONCVJAQA7";
				if (document.evaluate("//div[contains(@id, 'smgm_replyFind')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)) document.body.removeChild(document.evaluate("//div[contains(@id, 'smgm_replyFind')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0));
				var replies = document.evaluate("//a[contains(@href, \"" + theID +"\") and contains(@href, \"" + theThread +"\")]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var theNumber = replies.snapshotLength-1;
				var highlighttag = document.createElement('div');
				highlighttag.id = "smgm_replyFind" + theID;
				highlighttag.setAttribute('style','color:#000;text-align:center;border:1px solid #000;background-color:#669;z-index:999;position:fixed;bottom:10px;right:10px;-moz-box-shadow:2px 2px 4px #333;-webkit-box-shadow:2px 2px 4px #333;box-shadow:2px 2px 4px #333;');
				var close = document.createElement('span');
				close.addEventListener('click',function(){document.body.removeChild(document.evaluate("//div[contains(@id, 'smgm_replyFind')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0));},false);
				close.setAttribute('style','margin-left:4px;vertical-align:middle;cursor:pointer;font-size:6pt;');
				close.setAttribute('title','Close');
				close.innerHTML = "<img src='" + closeIcon + "'>";
				var replyTable = document.createElement('table');
				replyTable.setAttribute('style','padding:3px;border-collapse:collapse;');
				aTR1 = document.createElement('tr');
				headerTD = document.createElement('td');
				headerTD.setAttribute('colspan',theNumber);
				headerTD.setAttribute('style','border-bottom:1px dotted #000;font-size:9pt;text-align:center;padding:2px;');
				headerTD.innerHTML = "Replies to <a href='" + 'http://www.fark.com/comments/' + thisthread + extraURL + '#' + theID + "'>" + unescape(theName) + "'s Post</a>";
				headerTD.appendChild(close);
				aTR1.appendChild(headerTD);
				replyTable.appendChild(aTR1);
				aTR2 = document.createElement('tr');
				if (replies.snapshotLength > 1)
				{
					for (var k = 1; k < replies.snapshotLength; k++)
					{
						var invisiSpan = document.createElement('span');
						invisiSpan.setAttribute('style','z-Index:4444;position:relative;top:-40px;');
						var invisiReply = document.createElement('a');
						invisiReply.name='repliedto_' +theID.substr(1)+ '_' +(k);
						invisiSpan.appendChild(invisiReply);
						replies.snapshotItem(k).appendChild(invisiSpan);
						var newTD = document.createElement('td');
						newTD.innerHTML = '<a href="#repliedto_' +theID.substr(1)+ '_' +(k)+ '">' + k + '</a>';
						aTR2.appendChild(newTD);
					}
				}
				else
				{
					var newTD = document.createElement('td');
					newTD.innerHTML = '<span style="font-size:8pt;">None</span>';
					aTR2.appendChild(newTD);
				}
				replyTable.appendChild(aTR2);
				aTR3 = document.createElement('tr');
				var newTD = document.createElement('td');
				newTD.setAttribute('colspan',theNumber);
				newTD.innerHTML = '<span style="font-size:7pt;margin-left:3px;margin-right:3px;">'+unescape(theName)+' has '+countPosts(theName)+' posts on this page</span>';
				aTR3.appendChild(newTD);
				replyTable.appendChild(aTR3);
				highlighttag.appendChild(replyTable);
				document.body.appendChild(highlighttag);
			}
		}	

		function countPosts(userName)
		{
			aCount = 0;
			for (var i = 0; i < postHeaders.snapshotLength; i++)
			{
				var start=0;
				while (postHeaders.snapshotItem(i).getElementsByTagName('a').item(start).href.indexOf('#') > -1) start++;
				var uid = postHeaders.snapshotItem(i).getElementsByTagName('a').item(start).innerHTML;
				if (escape(uid) == userName) 
					aCount++;
			}
			return aCount;
		}
		
		//one loop, dammit
		var blockedtotal=0;
		var blockedFolks = new Array();
		blockFolks = GM_getValue('blockedUsers').split("@@@");
		for (var i = 0; i < postHeaders.snapshotLength; i++)
		{
			aPost = document.getElementById('ct' + postHeaders.snapshotItem(i).id.substr(6));
			//arrow mentioning you
			if (aPost && myname != "/guest/")
			{
				if (aPost.innerHTML.toLowerCase().indexOf(myname) > -1 && document.getElementById('cu' + aPost.id.substr(2)))
				{
					if (document.getElementById('cu' + aPost.id.substr(2)).innerHTML.toLowerCase() != myname)
					{
						highlighttag = document.createElement('div');
						tagHTML = '<a style="float:left;z-index:999;position:relative;left:-3px;top:1px;" href="#mentions_' +myname+ '_' +(myNameCount+1)+ '" name="mentions_' +myname+ '_' +(myNameCount)+ '" id="mentions_' +myname+ '_' +(myNameCount)+ '">';
						tagHTML += '<img style="" src="' + highlight + '" border="0">';
						tagHTML += '</a>';
						aPost.style.position="relative";
						aPost.style.left="6px";
						highlighttag.innerHTML = tagHTML;
						aPost.parentNode.insertBefore(highlighttag, aPost);
						myNameCount++;
					}
				}
			}
			
			//ignored blocked folk quotes
			if (postHeaders.snapshotItem(i).innerHTML.indexOf('(ignore') > -1)
			{
				blockeduser = document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6)).innerHTML.toLowerCase();
				blockedtotal++;
				for (var a=0;a<blockFolks.length;a++) {
					if (blockFolks[a].split("|||")[1].toLowerCase().match(/uberblock/) && blockFolks[a].split("|||")[0].toLowerCase().indexOf(blockeduser) > -1)
					{
						postHeaders.snapshotItem(i).parentNode.removeChild(postHeaders.snapshotItem(i));
						blockedtotal--; //don't need to count those we are uberblocking. banish those shitheads completely from our site
					}
				}
			}
			if (threadedBlock && aPost)
			{
				for (var a=0;a<blockFolks.length;a++) {
					var blockComment = blockFolks[a].split("|||")[1];
					var re1 = new RegExp('\/comments\/.*?#c[0-9]+?".*?>' + blockFolks[a].split("|||")[0] + '<\/a>:<\/b>', 'i');
					var re2 = new RegExp('<\/a>:<\/b> <i>.*?' + blockFolks[a].split("|||")[0] + ': ','i');
					var re3 = new RegExp('<b>' + blockFolks[a].split("|||")[0] + ':<\/b> <i>','i');
					var re4 = new RegExp('<i>.*?' + blockFolks[a].split("|||")[0] + ':.*?</i>','i');
					var re5 = new RegExp('\/comments\/[0-9]+?\/[0-9]+?".*?>' + blockFolks[a].split("|||")[0] + '<\/a>:<\/b>', 'i');
					var matchType = 0;
					if (aPost.innerHTML.match(re1)) matchType = 1;
					else if (aPost.innerHTML.match(re2)) matchType = 2;
					else if (aPost.innerHTML.match(re3)) matchType = 3;
					else if (aPost.innerHTML.match(re4)) matchType = 4;
					else if (aPost.innerHTML.match(re5)) matchType = 5;
					if (matchType > 0){ //quoted!
						quotedblockedtotal++;
						if (blockComment.toLowerCase().match(/uberblock/)) //user is an uberwhore or troll, don't even want to see collapsed comments or headers. Let's nuke the bitch without fucking up the post count
						{
							document.getElementById('ctable' + aPost.id.substr(2)).parentNode.removeChild(document.getElementById('ctable' + aPost.id.substr(2)));
							quotedblockedtotal--;
						}else{
							//color other people's headers
							var header2 = document.getElementById('ctable' + aPost.id.substr(2))
							j=0;
							if (header2.getElementsByTagName('a').item(1).innerHTML.indexOf('[TotalFark]') > -1 || header2.getElementsByTagName('a').item(1).innerHTML.indexOf('recently expired') > -1) j++;
							var puthere = header2.getElementsByTagName('a').item(j);
							ignText = document.createElement('span');
							ignText.innerHTML = ' <i><small>(post collapsed: contains ' + blockFolks[a].split("|||")[0] +' quote)</small></i>';
							if (puthere.parentNode.innerHTML.indexOf('post collapsed') < 0){
								puthere.parentNode.appendChild(ignText);
								header2.getElementsByTagName('td').item(1).style.backgroundColor = "#669"; //title
							}
							oldPostdiv = document.createElement('div');
							embeddedtag = document.createElement('div');
							oldInner = "<div style='margin-top:8px;'>" + aPost.innerHTML +"</div>";
							embedid = "blocked_" + i + "blockquote_embedded";
							embeddedtag.id = embedid;
							embeddedtag.style.display = 'none';
							embeddedtag.innerHTML = oldInner;
							oldPostdiv.id = "blocked_" + i;
							blockText = (matchType==2) ? 'someone else quoting ' + blockFolks[a].split("|||")[0] : blockFolks[a].split("|||")[0];
							oldPostdiv.innerHTML = "<div style='display:inline;padding:2px;border:1px dotted #000;background:#f7f7f7;font-size:10pt;font-weight:bold;color:#737373'><i>   Someone quoted " + blockText + ", click to view post</i></div>";
							oldPostdiv.setAttribute("style", "align:left;");
							oldPostdiv.addEventListener('click', function(){toggleembed(this.id,'blockquote');}, false);
							oldPostdiv.appendChild(embeddedtag);
							if (aPost.parentNode) aPost.parentNode.replaceChild(oldPostdiv,aPost);
						}
					}
				}
			}
			
			if(RIP && aPost)
			{
				if (aPost.innerHTML.toLowerCase().match(/<img.*?\.jpg.*?r\.i\.p/) || aPost.innerHTML.toLowerCase().match(/<img.*?\.jpg.*?rip /))
				{
					oldPostdiv = document.createElement('div');
					embeddedtag = document.createElement('div');
					oldInner = "<div style='margin-top:8px;'>" + aPost.innerHTML +"</div>";
					embedid = "rip_" + i + "rip_embedded";
					embeddedtag.id = embedid;
					embeddedtag.style.display = 'none';
					embeddedtag.innerHTML = oldInner;
					oldPostdiv.id = "rip_" + i;
					oldPostdiv.innerHTML = "<div style='display:inline;padding:2px;border:1px dotted #000;background:#f7f7f7;font-size:10pt;font-weight:bold;color:#737373'><i>RIP meme hidden, click to view</i></div>";
					oldPostdiv.setAttribute("align", "center");
					oldPostdiv.addEventListener('click', function(){toggleembed(this.id,'rip');}, false);
					oldPostdiv.appendChild(embeddedtag);
					if (aPost.parentNode) aPost.parentNode.replaceChild(oldPostdiv,aPost);
					post++;
				}
			}	
			//fix anchor
			if(fixanchor && aPost)
			{
				var linksinpost = document.evaluate('.//a[contains(@href,"'+thisthread+'")]', aPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var j=0;j<linksinpost.snapshotLength;j++)
				{				
					if (linksinpost.snapshotItem(j).href.indexOf('#new') < 0 && (linksinpost.snapshotItem(j).href.indexOf('#') > -1 || linksinpost.snapshotItem(j).href.match(/\/[0-9]+\/[0-9]+/)))
					{
						theanchor = (linksinpost.snapshotItem(j).href.match(/#([^<]+)/)) ? linksinpost.snapshotItem(j).href.match(/#c([^<]+)/)[1] : linksinpost.snapshotItem(j).href.match(/\/[0-9]+\/(\d[^<]+)/)[1];
						if (document.getElementById('c' + theanchor))	{ //post is on this page
							if (document.getElementById('cu' + theanchor)) document.getElementById('cu' + theanchor).name = 'ct' + theanchor;
							linksinpost.snapshotItem(j).target = '';
							linksinpost.snapshotItem(j).name = 'cu' + aPost.id.substr(2) + '___cu' + theanchor;
							linksinpost.snapshotItem(j).setAttribute('href','http://www.fark.com/comments/' + thisthread + extraURL + '#' + 'c' + theanchor);
							aPost.name = 'cu' + aPost.id.substr(2);
							linksinpost.snapshotItem(j).addEventListener('click',function(){followquote(this.name);},false);
						}
						else
						{
							linksinpost.snapshotItem(j).innerHTML += " <img style='border:none;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAB3RJTUUH2AwSDAEgJjauGgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAFcSURBVHjabVA7qsJQFJwkVyWFYikKdpa6HbGyMoVkL2lsFAMiWYSVhZgVCPZaCCLGRjHxd59zII9H8qa53/mcMZDBYrHQ+/0ej8cDpVIJWuvfN57r9TpUlnQ4HNDtdlGpVPD5fGCaptxzv9vtsFqt8iQ62LaN9/sNx3Hkc7VaxeVywWw2w3K5zJNerxcKhYLsJ5MJLMtCv98XIpEkCVQYhnq73cIwDCil5JLgLCS4rovpdIrhcCiuFFSbzQa9Xk+yF4tFzOdz3O93ich4o9FIyBTkH8ZXVObQf+ORMBgMJB4TEJ7nyUons1wuy4HqBAu43W4Yj8dCoAjBFFEUiZvKNtbpdCQiFTkXBWq1Gs7ns0Rst9uA7/v6+XzqFF+i/orInmsQBDrbsMlG0tx0pH1aOZWPxyP+JaUPzJ2CM55OJzQajRxJNZtNrNdrXK9XxHEsg7NizshmW61WjvQDnNjJUsseLXoAAAAASUVORK5CYII=' alt='New Window'>";
							linksinpost.snapshotItem(j).title = 'Quote comes from previous page, click to open in new window';
						}					
					}
				}
			}
			
			//reply hunter
			if (replyFinder)
			{
				if (document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6)))
				{	
					var header = postHeaders.snapshotItem(i);
					header2 = document.evaluate('.//a[contains(@class,"quoteComment")]', postHeaders.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					if (header2.snapshotLength < 1) //closed thread = no quote button
						header2 = document.evaluate('.//a[contains(@class,"commentTimestamp")]', postHeaders.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					header2 = header2.snapshotItem(0);
					if (header.innerHTML.indexOf('(ignore')<0)
					{
						var username = document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6));
						replyFind = document.createElement('span');
						replyFind.setAttribute('style','top:4px;height:15px;font-size:7px;position:relative;');
						replyFind.id = 'rf_c' + postHeaders.snapshotItem(i).id.substr(6) + "@_@" + escape(username.innerHTML);
						replyFind.addEventListener('click',function(){findReplies(this.id.split("@_@")[0].substr(3),thisthread,this.id.split("@_@")[1]);},false);
						replyFind.innerHTML = '<img style="margin-left:5px !important;padding:0px !important;" src="' + replyFindIcon + '" border="0" title="Find replies to ' + username.innerHTML + '\'s comment">';
						header2.parentNode.insertBefore(replyFind,header2);
					}
				}
			}
		
			if (useInlineFavBlock && myname != "/guest/")
			{
				if (document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6)))
				{	
					if (document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6)).innerHTML.toLowerCase() != myname)
					{
						var header = postHeaders.snapshotItem(i);
						var placeright = document.evaluate('.//span[contains(@class,"cmtHdrB1")]', postHeaders.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;
						header2 = document.evaluate('.//span[contains(@class,"cmtHdrB1")]', postHeaders.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						if (header2.snapshotLength < 1) //closed thread = no quote button
						{
							header2 = document.evaluate('.//a[contains(@class,"commentTimestamp")]', postHeaders.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							header2.snapshotItem(0).setAttribute('style','padding-left:10px;');
						}
						header2 = header2.snapshotItem(0);
						var uid = header.getElementsByTagName('a').item(0).innerHTML;
						username = document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6));
						if (header.innerHTML.indexOf('(ignore') < 0)
						{
							doWhat = (header.innerHTML.indexOf('(favorite') > -1) ? 'Unfave ' : 'Fave ';
							theIcon =  (header.innerHTML.indexOf('(favorite') > -1) ? unfavIcon : favIcon;
							favButton = document.createElement('span');
							favButton.id = 'fav' + i + '@_@' + username.innerHTML + '@_@' + doWhat;
							favButton.addEventListener('click',function(){UserCtl(this.id,this.id.split('@_@')[2]);},false);
							favButton.innerHTML = '<img class="smgm_fbutton" src="' + theIcon + '" border="0" title="' + doWhat + username.innerHTML + '">';
							(placeright>0) ? header2.appendChild(favButton) : header2.parentNode.insertBefore(favButton,header2);
						}
						if (header.innerHTML.indexOf('(favorite') < 0) //can't block faves
						{
							doWhat2 = (header.innerHTML.indexOf('(ignore') > -1) ? 'Unignore ' : 'Ignore ';
							theIcon2 =  (header.innerHTML.indexOf('(ignore') > -1) ? unblockIcon : blockIcon;
							ignButton = document.createElement('span');
							ignButton.id = 'ign' + i + '@_@' + username.innerHTML + '@_@' + doWhat2;
							ignButton.addEventListener('click',function(){UserCtl(this.id,this.id.split('@_@')[2]);},false);
							ignButton.innerHTML = '<img class="smgm_fbutton" src="' + theIcon2 + '" border="0" title="' + doWhat2 + username.innerHTML + '">';
							(placeright>0) ? header2.appendChild(ignButton) : header2.parentNode.insertBefore(ignButton,header2);
						}
					}
				}
			}
			
			if (fixUsercomment) //fix user comment location
			{
				if (document.getElementById('cu' + postHeaders.snapshotItem(i).id.substr(6)))
				{							
					commentTR = document.evaluate('.//tr[contains(@id,"noterow")]', postHeaders.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
					theComment = commentTR.getElementsByTagName("td").item(0).innerHTML;
					document.evaluate(".//span[contains(@id, 'favignout')]", postHeaders.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = theComment;
					document.evaluate(".//span[contains(@id, 'favignout')]", postHeaders.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.fontSize = "10pt";
					commentTR.parentNode.removeChild(commentTR);
				}
			}
			
			if (removeVotes)
			{
				var aVote = document.evaluate('.//a[contains(@class,"voting") or contains(@class,"voted")]', postHeaders.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var o=0;o<aVote.snapshotLength;o++)
					if (aVote.snapshotItem(o).innerHTML.match(/Best/i) == null)
						aVote.snapshotItem(o).parentNode.removeChild(aVote.snapshotItem(o));
			}
		} //end postbody loop
	
		if(myNameCount > 0){ // Link the last tag back to the first.
			var lastMyName = document.getElementById('mentions_' +myname+ '_' + (myNameCount-1));
			lastMyName.href = '#mentions_' + myname + '_0';
			for (var i = 0; i < myNameCount; i++)
				document.getElementById('mentions_' +myname+ '_' + i).title = "(Comment " + (i+1) + "/" + myNameCount+")";
		}

		// Add total count...
		if (myname)
		{
			blockedCountText1 = ''; blockedCountText2 = '';
			if (blockedtotal > 0) blockedCountText1 = '<br><span style="font-size:8pt;">' + blockedtotal + ' post' + ((blockedtotal>1)?'s':'') + ' removed</span>';
			if (threadedBlock && quotedblockedtotal > 0) blockedCountText2 = '<br><span style="font-size:8pt;">' + quotedblockedtotal + ' threaded post' + ((quotedblockedtotal>1)?'s':'') + ' removed</span>';
			myNameCountLink = '<a href="#mentions_' + myname + '_0">' + myNameCount + ' Comment' + ((myNameCount>1 || myNameCount==0)?'s':'') +' mentioned you</a>' + blockedCountText1 + blockedCountText2;

			// Top of page
			var commentsHeader = document.getElementById("commentsArea");
			topSpan = document.createElement('div');
			topSpan.setAttribute("style","margin-top:3px;padding:2px;margin-left:auto;margin-right:auto;width:15%;text-align:center;color:black;background-color:#dfdfdf;border:1px solid #000;");
			topSpan.innerHTML = myNameCountLink;
			commentsHeader.parentNode.insertBefore(topSpan, commentsHeader);
			// Bottom of page
			bottomSpan = document.createElement('div');
			bottomSpan.setAttribute("style","-moz-box-shadow:2px 2px 4px #333;-webkit-box-shadow:2px 2px 4px #333;box-shadow:2px 2px 4px #333;margin-top:3px;padding:6px;margin-left:12px;width:15%;color:black;background-color:#dfdfdf;border:1px solid #000;");
			bottomSpan.innerHTML = myNameCountLink;
			var bottomOfPage = document.getElementById("b");
			if (!bottomOfPage)
			{
				bottomOfPage = document.evaluate('//div[@class="refreshRedisplayComments"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);
				bottomOfPage.parentNode.appendChild(bottomSpan);
			}
			else
				bottomOfPage.parentNode.insertBefore(bottomSpan, bottomOfPage);
		}

		//check for ban, jump to new posts regardless of status
		var isBanninated = document.body.innerHTML.match(/<span class="mainerr leftpadding">You are not allowed/);
		if (isBanninated != null && document.body.innerHTML.match(/<a name="new" id="new">&nbsp;<\/a>\n<br><div class="comlinkcount">/) == null && document.body.innerHTML.match(/<a name="new" id="new">&nbsp;<\/a>\n<script type="text\/javascript">/) == null)
			window.location.hash="new"; 

		//custom quickedit buttons
		var htmlasst = document.evaluate('//span[@class="htmlasst"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		function newAsst(tags,title,image)
		{
			var arrTags,frontT="",backT="",newhtmlasst;
			newhtmlasst = document.createElement('a');
			var arrTags = tags.split(',');
			for (var i=0;i<arrTags.length;i++) frontT+=arrTags[i];
			for (var i=arrTags.length-1;i>-1;i--) backT+=arrTags[i].replace('<','</');
			newhtmlasst.setAttribute('onclick',"farkTextboxSurroundSelect(document.forms.postcomform.nc,'"+frontT+"','"+backT+"',''); return false;");
			newhtmlasst.href = "#b";
			newhtmlasst.setAttribute('title',title);
			newhtmlasst.innerHTML = '<img src="'+image+'" alt="'+title+'" width="42" height="18">';
			htmlasst.appendChild(newhtmlasst);	
		}
		if (htmlasst)
		{
			newAsst('<center>,<big>,<b>','Center big bold',"data:image/gif;base64,R0lGODlhJAASAIAAAP///wAAACH5BAEAAAEALAAAAAAkABIAAAIrjI+py+0PD5i02hrR3Tf773AbqIkWiYLm6q1mCqtnvHT0nblTrAP4D0wUAAA7");
		}
	}

	if (document.location.href.match(/http:\/\/.*?fark\.com\/submit/) != null) 
	{
		var maxl = 250;
		
		var bar = document.createElement('span');
		bar.id = 'charentry';
		bar.style.border = '1px solid #000';
		bar.style.backgroundColor = '#669';
		bar.style.width = '50px';
		bar.innerHTML = "(0/" + maxl + ")";
		bar.style.height = '20px';
		bar.style.position = 'relative';
		bar.style.top = '2px';
		bar.style.padding = '1px';
		bar.style.color = '#fff';
		bar.style.fontWeight = 'bold';
		bar.style.marginLeft = '0px';
			
		
		function check()
		{
		  var raw=document.getElementById('headline').value.split("&").join("&amp;").split( "<").join("&lt;").split(">").join("&gt;").split("\"").join("&quot;").split("'").join("''");
		  var total = raw.length;
		  document.getElementById('charentry').innerHTML = "(" + total + "/" + maxl + ")";
		  if (total < maxl/3)
			  document.getElementById('charentry').style.backgroundColor = "#669"; //green
		  else if (total > maxl/3 && total < maxl-(maxl/3))
			  document.getElementById('charentry').style.backgroundColor = "#ffd633"; //yellow
		  else
			  document.getElementById('charentry').style.backgroundColor = "#ff3333"; //red
		  if (total >= maxl) 
		   document.getElementById('headline').value = document.getElementById('headline').value.substr(0,maxl);
		}
		var oldHLBox = document.getElementById('headline');
		var tb = document.createElement('textarea');
		tb.setAttribute('rows','3');
		tb.setAttribute('cols','6');
		tb.setAttribute('style','width:50%;height:100%;font-size:10pt;font-family:ms sans serif, verdana, arial;');
		tb.id = 'headline';
		tb.name = 'headline';
		tb.innerHTML = oldHLBox.value;
		tb.addEventListener("keyup", function(){check();}, false);
		oldHLBox.parentNode.replaceChild(tb,oldHLBox);
		document.getElementById('headline').parentNode.appendChild(bar);

		if (sub_altTag)
		{
			function selectThis(aValue)
			{
				var tabButs = document.evaluate('//input[@class="smgm_tags"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i = 0; i < tabButs.snapshotLength; i++)
				{
					tabButs.snapshotItem(i).style.backgroundColor = "#fff";
					tabButs.snapshotItem(i).style.color = "#000";
					tabButs.snapshotItem(i).style.fontWeight = "";
				}	
				aValue.style.backgroundColor = '#669';
				aValue.style.color = '#fff';
				aValue.style.fontWeight = 'bold';
				for (j=1;j<document.getElementById('t').options.length;j++)
				{
					if (document.getElementById('t').options[j].value == aValue.value)
						document.getElementById('t').options[j].selected = true;
				}
			}
			function makeSel(option)
			{
				sel = document.createElement('input');
				sel.type = "button";
				sel.setAttribute("style","font-size:8pt;width:80px;margin-left:2px;margin-bottom:2px;background-Color:#fff;border:1px dotted #000;");
				sel.className = "smgm_tags";
				sel.value = option.value;
				sel.addEventListener("mouseup", function(){selectThis(this);}, false);
				document.getElementById("t").parentNode.appendChild(sel);
			}
			document.getElementById("t").parentNode.parentNode.innerHTML = document.getElementById("t").parentNode.parentNode.innerHTML.replace("Topic","Tag");
			var tagOptions = document.getElementById("t").options;
			for (j=1;j<tagOptions.length;j++)
				makeSel(tagOptions[j]);
			document.getElementById("t").style.display = "none";
			document.getElementById("srctxt").style.width = "20%";
		}
	}
}else{ //that double post warning thing
	document.body.innerHTML += '<a href="' + document.location.href.substr(0,document.location.href.indexOf('?')) + document.location.hash + '">Parent page was here (won\'t work if this appeared after voting)</a>' +
	'<p><a href="javascript:history.go(-1);">Go Back</a>';
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

function toggleembed(id,prefix)
{
	embeddedid = id + prefix +'_embedded';
	isembedded = document.getElementById(embeddedid);
	(isembedded.style.display != 'none') ? isembedded.style.display = 'none' : isembedded.style.display = '';
}