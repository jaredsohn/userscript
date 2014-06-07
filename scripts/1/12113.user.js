// ==UserScript==
// @name           YouTube Title Adder
// @namespace      Smiths
// @description    Preloads any YouTube (and LiveLink!) links and appends the title of the video to the link in the referring page
// @include        *
// @exclude        http://*.youtube.com/*
// @exclude        https://*.youtube.com/*
// @exclude        http://*.liveleak.com/*
// @exclude        http://youtube.com/*
// @exclude        http://liveleak.com/*
// @exclude        http://*.google.*/search?*
// @exclude        http://google.*/search?*
// @exclude        https://google.*/search?*
// @exclude        https://*.google.*/search?*
// @version		   3.4.2
// @grant	       GM_getValue
// @grant   	   GM_setValue
// @grant		   GM_addStyle
// @grant		   GM_log
// @grant  		   GM_xmlhttpRequest
// @grant  		   GM_registerMenuCommand
// @attribution	changes [d:03.15.13][u:<ul><li>Finally fixed long-standing oversight on my part that did not even try to define the size of the expand/collapse icon. This led to some sites having some huge Plus/Minus pictures.</li><li>Per suggestion on script's forum (and something I made another script to do manually), this now will automatically append YT/LL titles to Twitter/Tweetdeck posts that use the "data-full/expanded" et al tags.</li><li>If tweets don't use those tags (some inline twitter things on certain websites always just use the URL shortener without any indication of what the real page is) I recommend <a href="http://userscripts.org/scripts/show/140411">My URL Unshortener</a> script</li></ul>]
// ==/UserScript==

//note to self: gotta make sure to update the one in the metadata too!
var v = "3.4.2";

var scriptNum = "12113";
var scriptName = "YouTube Title Adder";

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

var ytcollapseimg = "data:image/gif,GIF89a%0B%00%0B%00%A2%00%00%00%00%00%FF%FF%FF%5C%AD%E0%B6%E3%FF%FF%A5%A5%CE%CE%CE%FF%FF%FF%00%00%00!%F9%04%01%00%00%06%00%2C%00%00%00%00%0B%00%0B%00%00%03%24h%B0%CC%3A0%8E%10%96%94%15%5Ci%1B%1B%1DA%05%04Pt%9E%B9%08C%E1%BE'%20%B0%DB%3A%D7J%BA%18%09%00%3B";
var ytexpandimg = "data:image/gif,GIF89a%0B%00%0B%00%A2%00%00%00%00%00%FF%FF%FF%5C%AD%E0%B6%E3%FF%FF%A5%A5%CE%CE%CE%FF%FF%FF%00%00%00!%F9%04%01%00%00%06%00%2C%00%00%00%00%0B%00%0B%00%00%03*h%B0%CC%3A0%8E%10Vd%B0%82K%40%81%16%A3m!A%05%5D%11.%A3%0A%08%60Z%B8%02%CC%7C%C3R%C33%0E(%8D%86!%01%00%3B";
var ytdisabled = "data:image/gif,GIF89a%0B%00%0B%00%A2%00%00%00%00%00%FF%FF%FF%5C%AD%E0%B6%E3%FF%FF%A5%A5%CE%CE%CE%FF%FF%FF%00%00%00!%F9%04%01%00%00%06%00%2C%00%00%00%00%0B%00%0B%00%00%03-h%B0%CC%3A0%8E%10%16%04%11W%0C%08(%DDg%0D%40U%15%20v%9D%05%A9%96p%BB%08!%E8%A5%02%8D%92%E8%9C%B7%10%99%A2%D10%24%00%00%3B";
var closeIcon = "data:image/gif;base64,R0lGODlhCgAKAIABAAAAAP///yH5BAEAAAEALAAAAAAKAAoAAAIWhI8WyxfA3oOyqnVno9piyElONCVJAQA7";
var ytlinks = 1;
var ytimage = 0;
var ytembedimage = 1;
var ytlowbw = 0;
var ytsize = 1;
var playerV=3;
var playerAN=3;
if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey to use the full features of this script.');
    return;
} else {
ytlinks = Number(GM_getValue('ytlinks', ytlinks));
ytimage = Number(GM_getValue('ytimage', ytimage));
ytembedimage = Number(GM_getValue('ytembedimage', ytembedimage));
ytlowbw = Number(GM_getValue('ytlowbw', ytlowbw));
ytsize = Number(GM_getValue('ytsize', ytsize));
playerAN = Number(GM_getValue('playerAN', playerAN));
GM_registerMenuCommand('YouTube Title Adder Options', smgm_yt_showOptions);
}
var dw = 425;
var dh = 320;
var vw,vh;
//h/w * nw = nh
if (ytsize==0)
	vw = dw;
else if (ytsize==1)
	vw = 560;
else if (ytsize==2)
	vw = 750;
else
	vw = dw;
vh = dh/dw * vw;

function checkNew2(version)
{
	GM_xmlhttpRequest({
		method:"GET",
		url:metaURL,
		headers:{"User-Agent":"monkeyagent"},
		onload:function(content){
			var upgrade = 0;
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
			document.getElementById('versioncheck').innerHTML = "<br>" + verstring + "<br><b>" + (upgrade ? "<a href=\"" + homepageURL + "\" target=\"_blank\">UPGRADE AVAILABLE</a>" : "You have the latest release");
		}
	})
}

function setOptions()
{
	if (ytlinks) document.getElementById('linkon').checked = true;
		else document.getElementById('linkoff').checked = true;
	if (ytimage) document.getElementById('imageon').checked = true;
		else document.getElementById('imageoff').checked = true;
	if (ytembedimage) document.getElementById('embedon').checked = true;
		else document.getElementById('embedoff').checked = true;
	if (ytlowbw == 0) document.getElementById('lowbw0').checked = true;
	else if (ytlowbw == 1) document.getElementById('lowbw1').checked = true;
	else document.getElementById('lowbw2').checked = true;
	if (ytsize == 0) document.getElementById('vid0').checked = true;
	else if (ytsize == 1) document.getElementById('vid1').checked = true;
	else document.getElementById('vid2').checked = true;
	if (playerAN==1) document.getElementById('playerANon').checked = true;
		else document.getElementById('playerANoff').checked = true;
}

function saveOptions()
{
	if (document.getElementById('linkon').checked) GM_setValue('ytlinks', 1 );
		else GM_setValue('ytlinks', 0 );
	if (document.getElementById('imageon').checked) GM_setValue('ytimage', 1 );
		else GM_setValue('ytimage', 0 );
	if (document.getElementById('embedon').checked) GM_setValue('ytembedimage', 1 );
		else GM_setValue('ytembedimage', 0 );
	if (document.getElementById('lowbw1').checked) 
		GM_setValue('ytlowbw', 1 );
	else if (document.getElementById('lowbw2').checked) 
		GM_setValue('ytlowbw', 2 );
	else 
		GM_setValue('ytlowbw', 0 );
	if (document.getElementById('vid1').checked) 
		GM_setValue('ytsize', 1 );
	else if (document.getElementById('vid2').checked) 
		GM_setValue('ytsize', 2 );
	else 
		GM_setValue('ytsize', 0 );
	if (document.getElementById('playerANon').checked) GM_setValue('playerAN', 1 );
		else GM_setValue('playerAN', 3 );
	}

function hideOptions()
{
	document.body.removeChild(document.getElementById("smgm_optionsDiv"));
	document.body.removeChild(document.getElementById("smgm_modalDiv"));
}

//full thanks to "Google Anonymizer" code for visual options - http://userscripts.org/scripts/review/10448
function smgm_yt_showOptions()
{
	ytlinks = Number(GM_getValue('ytlinks', ytlinks));
	ytimage = Number(GM_getValue('ytimage', ytimage));
	ytembedimage = Number(GM_getValue('ytembedimage', ytembedimage));
	
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
		GM_addStyle("#smgm_optionsDiv{overflow:auto;position:fixed !important; top:3%; left:20%; z-index:210; width:50%; height:60%; background-color:white !important; border:solid 3px #0033CC !important;}");
		
		div2=document.createElement("DIV");
		div2.id="smgm_optionsDiv";
		div2.className="smgm_hidden";
		div2.setAttribute("style","text-align:justify !important;padding:10px !important;font-family:verdana,arial !important;font-size:10pt !important;");
		
		var text1="";
		text1+="<center><font size=\"+1\"><a href=\""+ homepageURL + "\" target=\"_blank\">YouTube Title Adder</a> Options</font><span id=\"versioncheck\" style=\"font-size:10px;\"><br><br>ver. " + v + " (Checking for updates...)</span></center>";
		text1+="<form id=\"YTTA\" name=\"titleform\"><ul>";
		text1+="<li>Names on YouTube/LiveLeak Text Links:<br><input type=\"radio\" id=\"linkon\" name=\"textlinks\" value=\"1\"/><label for=\"linkon\"> Enabled</label><br><input type=\"radio\" id=\"linkoff\" name=\"textlinks\" value=\"0\"/><label for=\"linkoff\"> Disabled</label><br>";
		text1+="<li>Names on YouTube/LiveLeak Image Links:<br><input type=\"radio\" id=\"imageon\" name=\"imglinks\" value=\"1\"/><label for=\"imageon\"> Enabled</label><br><input id=\"imageoff\" type=\"radio\" name=\"imglinks\" value=\"0\"/><label for=\"imageoff\"> Disabled</label><br>";
		text1+="<li>Embed Buttons for YouTube/LiveLeak Links:<br><input type=\"radio\" id=\"embedon\" name=\"embed\" value=\"1\"/><label for=\"embedon\"> Enabled</label><br><input type=\"radio\" id=\"embedoff\" name=\"embed\" value=\"0\"/><label for=\"embedoff\"> Disabled</label><br>";
		text1+="<li>Default Embedded Video Size:<br><input type=\"radio\" id=\"vid0\" name=\"vidsize\" value=\"0\"/><label for=\"vid0\"> Small (Default since script began)</label><br><input type=\"radio\" id=\"vid1\" name=\"vidsize\" value=\"1\"/><label for=\"vid1\"> Medium</label><br><input type=\"radio\" id=\"vid2\" name=\"vidsize\" value=\"2\"/><label for=\"vid2\"> Large</label><br>";
		text1+="<li>Bandwidth Version:<br><input type=\"radio\" id=\"lowbw0\" name=\"lowbw\" value=\"0\"/><label for=\"lowbw0\"> Full (Complete Error Descriptions)</label><br><input type=\"radio\" id=\"lowbw1\" name=\"lowbw\" value=\"1\"/><label for=\"lowbw1\"> Medium (Uses mobile site, less error descriptions)</label><br><input type=\"radio\" id=\"lowbw2\" name=\"lowbw\" value=\"2\"/><label for=\"lowbw2\"> Lowest (uses Meta, very minimal error messages)</label><br>";
		text1+="<li>Enable Video Annotations by Default:<br><input type=\"radio\" id=\"playerANon\" name=\"playerAN\" value=\"1\"/><label for=\"playerANon\"> Enabled</label><br><input type=\"radio\" id=\"playerANoff\" name=\"playerAN\" value=\"0\"/><label for=\"playerANoff\"> Disabled</label><br>";
		text1+="</ul><center><input type=\"button\" value=\"Ok\" id=\"okButton\" /><input type=\"button\" value=\"Cancel\" id=\"cancelButton\" /></center></form>";
		div2.innerHTML=text1;
		
		document.body.appendChild(div2);
		
		document.getElementById("okButton").addEventListener("click",function(){saveOptions();hideOptions();location.reload(true);},false);
		document.getElementById("cancelButton").addEventListener("click",function(){hideOptions();},false);
	}
	document.getElementById("smgm_optionsDiv").className="";
	document.getElementById("smgm_modalDiv").className="";
	setOptions();
	checkNew2(v);
	div1.className="";
	div2.className="";
}

GM_addStyle(".smgm_ytTitle{border:none !important; padding:0px !important; margin:none !important; margin-left:2px !important;}");
GM_addStyle(".smgm_ytButton{height:11px !important;width:11px !important;}");

function makeStart(time)
{
	var h=0;var m=0;var s=0;
	if (time.match(/h/)) h=time.match(/(\d+)h/)[1];
	if (time.match(/m/)) m=time.match(/(\d+)m/)[1];
	if (time.match(/s/)) s=time.match(/(\d+)s/)[1];
	time = parseInt(h)*3600+parseInt(m)*60+parseInt(s);
	return time;
}

var allLinks, thisLink, thetitle, tubelink;
function addtitle(link, number,vidlink) {
	var requestURL;
	if (ytlowbw==0) requestURL = link.href;
	else if (ytlowbw==1) requestURL = "http://m.youtube.com/watch?v=" + vidlink;
	else if (ytlowbw==2) requestURL = "http://gdata.youtube.com/feeds/api/videos/" + vidlink;
	GM_xmlhttpRequest({
		method:"GET",
		url:requestURL,
		onload:function(content){
			var isAgeVerify;
			var verifyHTML = "";
			var ageString = "";
			var color1 = "0x000000";
			var color2 = "0x7c7c7c";
			var embedid, alink;
			var linkOK = "";
			var videoname = "";
			var extra = link.hash;
			var aResponse = content.responseText;
			if(extra.length>0)
				extra = makeStart(extra);
			if (ytlowbw==0)
			{
				var videoembedcode = aResponse.match(/(http:\/\/youtu\.be\/)([^<]+?)\"/);
				if (videoembedcode) { linkOK = videoembedcode[1]; var videoembed = unescapeHTML(videoembedcode[2].replace(/\\/g,"")); videoNumber = videoembed;}
				aResponse = aResponse.replace(/\\'/g,"'");
				videoname = aResponse.match(/meta property=\"og:title\" content=\"([^<]+?)\"/);
				if (!videoname) { 
					videoname = aResponse.match(/<div id=\"vidTitle\">([^<]+)<\/div>/); 
				}
				if (!videoname) {
					videoname = aResponse.match(/<meta name=\"title\" content=\"([^<]+)\">/);
				}
				if (!videoname) { //at this point it's an error page on YouTube (login page, etc)
					//let's see if its an age verification
					isAgeVerify = aResponse.match(/desktop_uri=%2Fverify_age%3Fnext_url%3Dhttp%253A%2F%2Fwww.youtube.com%2Fwatch%253Fv%253D([^<]+?)&amp;/);
					if (isAgeVerify) { 
						var videoembed = unescapeHTML(isAgeVerify[1].replace(/\\/g,"")); 
						var videoNumber = videoembed;
						linkOK = "http"; //we know it's legit
						videoname = aResponse.match(/alt="Thumbnail" class="" title=\"([^<]+?)\"/);
						ageString = " [age restr]";
						var color1 = "0xFF9900";
						var color2 = "0xCC5200";
						GM_xmlhttpRequest({
							method: "GET",
							url: "http://www.youtube.com/watch?v=" + videoNumber,
							onload: function( response ) {
								verifyHTML = response.responseText;
							}
						});	
					}
					else //who knows, video not found, whatever
					{
						if (aResponse.match(/<div id=\"unavailable-message\"/i))
						{
							theError = aResponse.match(/<div id=\"unavailable-message\".*?>[ \t]+(.*?)\n/i)[1]
							videoname = ["Error",theError.substr(0,theError.length-1).replace(/<.*?>/g,'')];
						}
						else
							videoname = ["Error","Video Not Found"];
					}
				}
			}else if (ytlowbw==1){
				if (aResponse.match(/<title>YouTube - Broadcast Yourself.<\/title>/)) //error
				{
					if (aResponse.match(/border-bottom:1px dashed #FF0000"><\/div>/)) //just a bunch of dashes
						videoname = ["Error","Removed by Youtube"];
					else if (aResponse.match(/border-bottom:1px dashed #FF0000">/)) //there an error on mobile site
					{
						theError = aResponse.match(/border-bottom:1px dashed #FF0000">(.*?)<\/div>/)[1];
						videoname = ["Error",theError.substr(0,theError.length-1).replace(/<.*?>/g,'')];
					}
					else
						videoname = ["Error","Other (age rest./etc.)"];
				}
				else
				{
					linkOK = "http";
					videoname = aResponse.match(/<title>(.*?)<\/title>/);
					videoNumber = vidlink;
				}
			}else if (ytlowbw==2){
				if (aResponse.match(/<media:title/) == null) //error
				{
					if (aResponse.match(/<error>/))
						videoname = ["Error",aResponse.match(/<code>(.*?)<\/code>/)[1]];
					else
						videoname = ["Error",aResponse];
				}
				else
				{
					linkOK = "http";
					videoname = aResponse.match(/<media:title.*?>(.*?)<\/media:title>/);
					videoNumber = vidlink;
				}
			}
			embeddedtag = document.createElement('div');
			embeddedtag.className = "smgm_ytTitle";
			btn = document.createElement('a');
			btn.className = "smgm_ytTitle";
			if (linkOK.substr(0,4).toLowerCase() == "http")
			{
				alink = vidlink + number;
				btn.id = alink; embedid = alink + "embedded";
				embeddedtag.id = embedid;
				embeddedtag.style.display = 'none';
				embeddedtag.setAttribute("align", "center");
				objectHTML = '<object><param name="movie" value="http://www.youtube.com/v/' +
				videoNumber + '?version='+playerV+'&amp;fs=1&amp;hl=en_US&amp;disablekb=1&amp;rel=0&amp;color1=' + color1 + '&amp;color2=' + color2 + '&amp;border=0&amp;iv_load_policy='+playerAN+'&amp;modestbranding=1&amp;autohide=1&amp;start='+extra+'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param>' +
				'<embed id="'+embedid+'_v" src="http://www.youtube.com/v/' + videoNumber + '?version='+playerV+'&amp;fs=1&amp;hl=en_US&amp;disablekb=1&amp;rel=0&amp;color1=' + color1 + '&amp;color2=' + color2 + '&amp;modestbranding=1&amp;border=0&amp;iv_load_policy='+playerAN+'&amp;autohide=1&amp;start='+extra+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+vw+'" height="'+vh+'"></embed></object>' +
				'';
				embeddedtag.innerHTML = objectHTML;
				btn.innerHTML = '<img class="smgm_ytTitle smgm_ytButton" src="' + ytexpandimg + '" align="top" border="0" title="Click to Show Video">';
				btn.addEventListener('click', function(){toggleembed(this.id,1);drawvidoptions(this.id);}, true);
			}
			if ((link.innerHTML.indexOf('<img') < 0) && (ytlinks == 1)) 
			{ 
				link.innerHTML = (videoname[0] != "Error") ? '<i style="background:none !important;">' + link.innerHTML + " (<b>YT: " + unescapeHTML(videoname[1]) + ageString + "</b>)</i>" :
						'<i style="background:none !important;">' + link.innerHTML + " (<b>Error: " + unescapeHTML(videoname[1]) + "</b>)</i>";
				if (ytembedimage == 1)
				{
					link.parentNode.insertBefore(embeddedtag, link.nextSibling);
					link.parentNode.insertBefore(btn, link.nextSibling);
				}
			}
			if ((link.innerHTML.indexOf('<img') > -1) && (ytimage == 1)) 
			{ 
				link.innerHTML = (videoname[0] != "Error") ? '<i style="background:none !important;">' + link.innerHTML + " (<b>YT: " + unescapeHTML(videoname[1]) + ageString + "</b>)</i>" :
						'<i style="background:none !important;">' + link.innerHTML + " (<b>Error: " + unescapeHTML(videoname[1]) + "</b>)</i>";
				if (ytembedimage == 1)
				{
					link.parentNode.insertBefore(embeddedtag, link.nextSibling);
					link.parentNode.insertBefore(btn, link.nextSibling);
				}
			}
			else
			{
				if (link.innerHTML.indexOf('<img') > -1)
				{
					theimg = link.getElementsByTagName('img');
					if (videoname[0] != "Error")
						theimg[0].setAttribute('title', 'YouTube link: Video name = "' + unescapeHTML(videoname[1]) + ageString + '"');
					else
						theimg[0].setAttribute('title', 'YouTube Error: ' + unescapeHTML(videoname[1]));
				}
				if ((linkOK.substr(0,4) == "http") && (ytembedimage == 1))
				{
					link.parentNode.insertBefore(embeddedtag, link.nextSibling);
					link.parentNode.insertBefore(btn, link.nextSibling);
				}
				else
				{
					if (ytembedimage == 1)
					{
						objectHTML = '<object ><param name="movie" value="http://www.youtube.com/v/' +
						videoNumber + '?version='+playerV+'fs=1&amp;hl=en_US&amp;disablekb=1&amp;rel=0&amp;color1=' + color1 + '&amp;color2=' + color2 + '&amp;border=0&amp;iv_load_policy='+playerAN+'&amp;modestbranding=1&amp;autohide=1&amp;start='+extra+'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param>' +
						'<embed src="http://www.youtube.com/v/' + videoNumber + '?version='+playerV+'fs=1&amp;hl=en_US&amp;disablekb=1&amp;rel=0&amp;color1=' + color1 + '&amp;color2=' + color2 + '&amp;border=0&amp;modestbranding=1&amp;iv_load_policy='+playerAN+'&amp;autohide=1&amp;start='+extra+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+vw+'" height="'+vh+'"></embed></object>';
						alink = vidlink + number;
						btn.id = alink; embedid = alink + "embedded";
						embeddedtag.id = embedid;
						embeddedtag.style.display = 'none';
						embeddedtag.setAttribute("align", "center");
						embeddedtag.innerHTML = objectHTML;
						if (videoname[0] != "Error")
						{
							btn.innerHTML = '<img src="' + ytdisabled + '" align="top" border="0" title="Embedding disabled for this video, click to see preview thumb">';
							btn.addEventListener('click', function(){toggleembed(this.id,0);drawvidoptions(this.id);}, true);
						}
						else
							btn.innerHTML = '<img src="' + ytdisabled + '" align="top" border="0" title="YouTube Error: ' + unescapeHTML(videoname[1]) + '">';
						link.parentNode.insertBefore(embeddedtag, link.nextSibling);
						link.parentNode.insertBefore(btn, link.nextSibling);
					}
				}
			}
			(videoname[0] != "Error") ? link.setAttribute('title', 'YouTube link: Video name = "' + unescapeHTML(videoname[1]) + ageString + '"') : 
						link.setAttribute('title', 'YouTube Error: ' + unescapeHTML(videoname[1]));
		}
	})
}

//LiveLeak
function addtitleLL(link, number, vidlink) {
GM_xmlhttpRequest({
		method:"GET",
		url:link.href,
		onload:function(content){
			var embedid, alink;
			var aResponse = content.responseText;
			var videoembedcode = aResponse.match(/<!--share_item_(.*?)_menu-->/);
			aResponse = aResponse.replace(/\\'/g,"'");
			var videoname = aResponse.match(/<span class="section_title" st.*?>([^<]+?)<\/span>/);
			embeddedtag = document.createElement('div');
			embeddedtag.className = "smgm_ytTitle";
			btn = document.createElement('a');
			btn.className = "smgm_ytTitle";
			if (!videoname)	videoname = "Video Not Found";
			alink = vidlink + number;
			btn.id = alink; embedid = alink + "embedded";
			embeddedtag.id = embedid;
			embeddedtag.style.display = 'none';
			embeddedtag.setAttribute("align", "center");
			objectHTML = '<object width="425" height="373"><param name="movie" value="http://www.liveleak.com/e/' +
			videoembedcode[1] + '"></param><param name="wmode" value="transparent"></param><param name="allowscriptaccess" value="never">' +
			'</param><embed id="'+embedid+'_v" src="http://www.liveleak.com/e/' + videoembedcode[1] + '" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="never" width="450" height="370"></embed></object>';
			embeddedtag.innerHTML = objectHTML;
			btn.innerHTML = '<img class="smgm_ytTitle smgm_ytButton" src="' + ytexpandimg + '" align="top" border="0" title="Click to Show Video">';
			btn.addEventListener('click', function(){toggleembed(this.id,1);drawvidoptions(this.id);}, true);

			if ((link.innerHTML.indexOf('<img') < 0) && (ytlinks == 1)) 
			{ 
				link.innerHTML = '<i style="background:none !important;">' + link.innerHTML + " (<b>LL: " + unescapeHTML(videoname[1]) + "</b>)</i>";
				if (ytembedimage == 1)
				{
					link.parentNode.insertBefore(embeddedtag, link.nextSibling);
					link.parentNode.insertBefore(btn, link.nextSibling);
				}
			}
			if ((link.innerHTML.indexOf('<img') > -1) && (ytimage == 1)) 
			{ 
				link.innerHTML = '<i style="background:none !important;">' + link.innerHTML + " (<b>LL: " + unescapeHTML(videoname[1]) + "</b>)</i>"; 
				if (ytembedimage == 1)
				{
					link.parentNode.insertBefore(embeddedtag, link.nextSibling);
					link.parentNode.insertBefore(btn, link.nextSibling);
				}
			}
			else
			{
				if (link.innerHTML.indexOf('<img') > -1)
				{
					theimg = link.getElementsByTagName('img');
					theimg[0].setAttribute('title', 'LiveLeak link: Video name = "' + unescapeHTML(videoname[1]) + '"');
				}
				if (ytembedimage == 1)
				{
					link.parentNode.insertBefore(embeddedtag, link.nextSibling);
					link.parentNode.insertBefore(btn, link.nextSibling);
				}
			}
			link.setAttribute('title', 'Liveleak link: Video name = "' + unescapeHTML(videoname[1]) + '"');
		}
	})
}

function toggleembed(id,embedable)
{
	embeddedid = id + "embedded";
	embeddedDIV = document.getElementById(embeddedid);
	if (embeddedDIV.style.display != 'none')
	{
		if (embedable == 1) document.getElementById(id).innerHTML = '<img class="smgm_ytTitle smgm_ytButton" src="' + ytexpandimg + '" align="top" border="0" title="Click to Show Video">';
		if (embedable == 0) document.getElementById(id).innerHTML = '<img class="smgm_ytTitle smgm_ytButton" src="' + ytdisabled + '" align="top" border="0" title="Embedding disabled for this video, click to see preview thumb">';
		embeddedDIV.innerHTML = embeddedDIV.innerHTML;
		embeddedDIV.style.display = 'none';
	}
	else
	{
		document.getElementById(id).innerHTML = '<img class="smgm_ytTitle smgm_ytButton" src="' + ytcollapseimg + '" align="top" border="0" title="Click to Hide Video">';
		embeddedDIV.style.display = '';
	}
}

function unescapeHTML(s)
{
    return s.replace('&amp;', '&').replace('&lt;',"<").replace('&gt;','>').replace('&quot;','"').replace('&#39;','\'');
}


function drawvidoptions(id)
{
	vid = id + "embedded_v";
	var pos = findPos(document.getElementById(id));
	if (document.getElementById("smgm_ytvidsize" + id))
		document.body.removeChild(document.getElementById("smgm_ytvidsize" + id));
	else
	{
		var highlighttag = document.createElement('div');
		highlighttag.id = "smgm_ytvidsize" + id;
		highlighttag.setAttribute('style','padding:0px !important;margin:2px !important;color:#000;text-align:center;border:1px solid #000;background-color:#B6E3FF;z-index:175;position:absolute;top:'+(pos[1]-30)+'px;left:'+(pos[0]+20)+'px;-moz-box-shadow:2px 2px 4px #333;-webkit-box-shadow:2px 2px 4px #333;box-shadow:2px 2px 4px #333;');
		var close = document.createElement('span');
		close.id = vid + "sizebox";
		close.addEventListener('click',function(){toggleembed(this.id.substr(0,this.id.length-17),1);drawvidoptions(this.id.substr(0,this.id.length-17));},false);
		close.setAttribute('style','margin-left:4px;vertical-align:middle;cursor:pointer;font-size:6pt;');
		close.setAttribute('title','Click to Hide Video');
		close.innerHTML = "<img alt='[x]' src='" + closeIcon + "'>";
		var ytsizetable = document.createElement('table');
		ytsizetable.setAttribute('style','font-family:verdana,arial !important;font-size:9pt !important;border-collapse:collapse;color:#000 !important;margin:0px !important; padding:2px !important;text-align:center !important;border:none !important;');
		aTR1 = document.createElement('tr');
		aTR1.setAttribute('style','background:#5CADE0;');
		headerTD = document.createElement('td');
		headerTD.setAttribute('colspan',3);
		headerTD.setAttribute('style','border-bottom:1px dotted #000;font-size:9pt;text-align:center;padding:1px !important;');
		headerTD.innerHTML = "Video Size";
		headerTD.appendChild(close);
		aTR1.appendChild(headerTD);
		ytsizetable.appendChild(aTR1);
		aTR2 = document.createElement('tr');
		aTR2.setAttribute('style','padding:2px !important;margin:0px !important;');
		var newTD = document.createElement('td');
		newTD.innerHTML = '<a style="text-decoration:none !important;color:#000 !important;" title="Small" onclick="javascript:(function(){document.getElementById(&quot;'+vid+'&quot;).width=&quot;425&quot;;document.getElementById(&quot;'+vid+'&quot;).height=&quot;320&quot;;})();" href="javascript:void(0);">S</a>';
		newTD.setAttribute('style','font-family:verdana,arial !important;font-size:9pt !important;text-align:center !important;padding:1px !important;margin:0px !important;border:none !important;');
		aTR2.appendChild(newTD);
		var newTD = document.createElement('td');
		newTD.innerHTML = '<a style="text-decoration:none !important;color:#000 !important;" title="Medium" onclick="javascript:(function(){document.getElementById(&quot;'+vid+'&quot;).width=&quot;560&quot;;document.getElementById(&quot;'+vid+'&quot;).height=&quot;420&quot;;})();" href="javascript:void(0);">M</a>';
		newTD.setAttribute('style','font-family:verdana,arial !important;font-size:9pt !important;text-align:center !important;padding:1px !important;margin:0px !important;border:none !important;');
		aTR2.appendChild(newTD);
		var newTD = document.createElement('td');
		newTD.innerHTML = '<a style="text-decoration:none !important;color:#000 !important;" title="Large" onclick="javascript:(function(){document.getElementById(&quot;'+vid+'&quot;).width=&quot;750&quot;;document.getElementById(&quot;'+vid+'&quot;).height=&quot;563&quot;;})();" href="javascript:void(0);">L</a>';
		newTD.setAttribute('style','font-family:verdana,arial !important;font-size:9pt !important;text-align:center !important;padding:1px !important;margin:0px !important;border:none !important;');
		aTR2.appendChild(newTD);		
		ytsizetable.appendChild(aTR2);
		highlighttag.appendChild(ytsizetable);
		highlighttag.addEventListener('click',function(){var p=findPos(document.getElementById(this.id.substr(14)));document.getElementById(this.id).style.top=(p[1]-30)+"px";document.getElementById(this.id).style.left=(p[0]+20)+"px";},false);
		document.body.appendChild(highlighttag);
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

var vc=0;
document.addEventListener('DOMNodeInserted',function(e){
	window.setTimeout(function(){
		var newLinks = document.querySelectorAll('a[data-full-url*="youtu.be/"],a[data-full-url*="youtube.com/watch"],a[data-expanded-url*="youtu.be/"],a[data-expanded-url*="youtube.com/watch"],a[href*="liveleak.com/view"],a[href*="youtu.be/"],a[href*="youtube.com/watch"]');
		if (newLinks.length > 0)
		{
			for (var i = 0; i < newLinks.length; i++) {
				if (newLinks[i].className.match(/\bsmgm_ytTitle\b/) == null)
				{
					vc++;
					var theURL;
					if (newLinks[i].href.match('/t.co/') && newLinks[i].getAttribute("data-expanded-url") != null)
						theURL = unescape(newLinks[i].getAttribute("data-expanded-url"));
					else if (newLinks[i].href.match('/t.co/') && newLinks[i].getAttribute("data-full-url") != null)
						theURL = unescape(newLinks[i].getAttribute("data-full-url"));
					else
						theURL = unescape(newLinks[i].href);
					(newLinks[i].className == "") ? newLinks[i].className = "smgm_ytTitle" : newLinks[i].className = newLinks[i].className + " smgm_ytTitle";
					if (!theURL.match(/liveleak/i))
					{
						vidlink = theURL.match(/youtube\.com\/watch/) ? theURL.match(/youtube\.com\/watch.*?\?.*v=([-_A-Za-z0-9]{11})/)[1] : theURL.match(/youtu\.be\/([-_A-Za-z0-9]{11})/)[1];
						youtubelink = "http://www.youtube.com/watch?v=" + vidlink;
						if (theURL.match(/#(.*?)$/)) youtubelink += '#' + theURL.match(/#(.*?)$/)[1];
						newLinks[i].href = youtubelink;
						addtitle(newLinks[i], vc, vidlink);
					}
					else //liveleak
					{
						vidlink = theURL.match(/view\?i=([-_A-Za-z0-9]{14})/)[1];
						addtitleLL(newLinks[i],vc,vidlink);
					}
				}
			}
		}
		}, 200);}
	, false);

