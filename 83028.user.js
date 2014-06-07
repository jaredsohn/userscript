// ==UserScript==
// @name          YouTube - Windows Media Player
// @namespace     -
// @description   replaces Flash-Player with Media Player updated to work with FlashBlock
// @version	  7.03
// @include       http://*.youtube.*/watch*v=*
// @include       http://youtube.*/watch*v=*
// ==/UserScript==

function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 

pausecomp(500);
if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
var conf = new Array();
// config start:
conf["autoHD"] = true; //This on true will make the video auto-set to widescreen if High Definition is available
conf["quality_default"] = GM_getValue("YouTubeWMPScriptQuality", ""); //"hq" or "hd720" or "hd1080"
conf["autostart"] = true;
conf["loop"] = false;
conf["volume"] = "100%"; //This is the default volume level, in percent from 0% to 100%
//You should not need to mess with anything below this line unless you know what you are doing.

var Update = {};

// You only need to change the following three variables.
Update.id         = 55399;
Update.curVersion = 7.03;
Update.callback   = function () {
	var answer = confirm("A new version of the YouTube script for Windows Media Player is available. \nInstalling these updates is HIGHLY RECOMMENDED! \nDo you wish to update at this time? (Restart is NOT Required!)\n If you don't update, this message will appear on each video");
	if (answer){
		window.location = "http://userscripts.org/scripts/source/55399.user.js";
	}
}

Update.check = function () {
   if (!Update.id)         { return; }
   if (!Update.curVersion) { return; }
   if (Update.keys && Update.keys['version'])  { Update.callback(); }
   var url = 'http://userscripts.org/scripts/source/'+Update.id+'.meta.js';
   XHR.get(url, Update.onXHR);
}
Update.onXHR = function (response) {
  var splat = response.responseText.split(/[\r\n]/),
  keys = {};
  for (var i in splat) {
    if (!splat[i]) continue;
    var matches = splat[i].match(/@([\w:]+)\s+(.+)/);
    if (!matches) continue;
    keys[matches[1]] = matches[2];
  }
  // set update keys
  Update.keys = keys;
  Update.url = 'http://userscripts.org/scripts/source/' + Update.id + '.user.js';
  if (keys['version'] && (keys['version'] != Update.curVersion)) {
    Update.callback();
  }
};

var XHR = {};

XHR.createQueryString = function (obj) {
   var ret = [];
   for (var i in obj) {
      ret.push([i, encodeURIComponent(obj[i])].join('='));
   }
   return ret.join('&');
}

XHR.createDoc = function (r, callback) {
  var doc = document.implementation.createDocument('','',null);
  var html = document.createElement('html');
  html.innerHTML = r.responseText;
  doc.appendChild(html);
  r.doc = doc;
  callback(r);
}

XHR.post = function (url, callback, data) {
   GM_xmlhttpRequest({
         method: 'POST',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': XHR.createQueryString(data).length
         },
         data: XHR.createQueryString(data),
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}

XHR.get = function (url, callback) {
   GM_xmlhttpRequest({
         method: 'GET',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}
Update.check();
var playerDiv = document.getElementById("watch-player-div");
if (!playerDiv) playerDiv = document.getElementById("watch-video"); // New youtube interface thanks caesar2k! //Needs more work due to many other changes as well.
var keepFlash = playerDiv.innerHTML;
GM_registerMenuCommand("YouTube - WMP Choose Default Quality", setquality);

//var fixwhiten = document.getElementById('watch-player-div');
//fixwhiten.style.backgroundColor = 'white';
//document.getElementById('player-toggle-switch').style.visibility = "hidden";

	function setquality(){
		var qualityset = prompt("Please enter default quality\nThis is required, enter \"hq\", \"hd720\", or \"hd1080\"\nIf the default quality is not available, the script will use the next available lower quality\nhd1080 = High Definition (1080p)\nhd720 = High Definition (720p)\nhq = High Quality", "hd1080");
		if (qualityset == "hd1080" || qualityset == "hd720" || qualityset == "hq"){
			GM_setValue("YouTubeWMPScriptQuality", qualityset);
			conf["quality_default"] = qualityset;
		}
			else
		{
			alert('You must select a setting "hq", "hd720", or "hd1080"');
			setquality();
		}
	}
	
if (conf["quality_default"] == ""){
	setquality();
}


var hasran = GM_getValue('YouTubeWMPAnnounceNumberHasRan', 0);
if (hasran == 0){
GM_setValue('YouTubeWMPAnnounceNumberHasRan', 1);
GM_setValue('YouTubeWMPAnnounceNumber', 0);
}


   GM_xmlhttpRequest({
         method: 'GET',
         url: 'http://dl.dropbox.com/u/1103639/do_not_move/UserScript%20Announce/announcenumber.txt',
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         onload: function (r) { 
		var announcenumber = r.responseText;
		var currentnumber = GM_getValue('YouTubeWMPAnnounceNumber', 0);
		if (currentnumber < announcenumber){
			   GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://dl.dropbox.com/u/1103639/do_not_move/UserScript%20Announce/messagetext.txt',
					headers: {
					'User-Agent': navigator.userAgent,
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				onload: function (r) { 
					var messagetext = r.responseText;
					alert(messagetext);
				}
				});
			GM_setValue('YouTubeWMPAnnounceNumber', announcenumber);
			}
		 }
      });

	  
 var args = unsafeWindow.yt.config_.SWF_ARGS;
if(! args) {
	args = {};
	var player = document.getElementById("movie_player");
	var flashvars = player.getAttribute("flashvars");
	var ampSplit = flashvars.split("&");
	
	for(var i = 0; i < ampSplit.length; i++) {
		var eqSplit = ampSplit[i].split("=");
		args[eqSplit[0]] = eqSplit[1];
	}
}
function toggleWideScr(value)
{
	// if (value == true){
		// document.getElementById("content").setAttribute("class", "");
		// document.getElementById("watch-video").setAttribute("class", "");

	// }
	// else
	// {
		// document.getElementById("content").setAttribute("class", "watch-wide");
		// document.getElementById("watch-video").setAttribute("class", "watch-wide");
	// }
	// unsafeWindow.yt.www.watch.player.enableWideScreen(value);
}
unsafeWindow.yt.www.watch.player.enableWideScreen(true);
toggleWideScr(false);

conf["width"] = 640;
var s = unsafeWindow.yt.getConfig('IS_WIDESCREEN');
if (s == true){
conf["height"] = 425;
}else{
conf["height"] = 545;
}



GM_registerMenuCommand("Toggle YouTube First Run", reset_firstrun);


function reset_firstrun()
{
GM_setValue("YouTubeScriptFirstRun", true);
window.location.reload(true);
}
	

var FirstRun = GM_getValue("YouTubeScriptFirstRun", true);


if(FirstRun == true) {
var refresh = document.location.href.toString();
	playerDiv.innerHTML = "<font size=\"20\"><center>First run!<br />If you are on Windows 7, just download this:<br /><a href=\"http://port25.technet.com/pages/windows-media-player-firefox-plugin-download.aspx\" />http://port25.technet.com/pages/windows-media-player-firefox-plugin-download.aspx</a><br /><br />If you are on Windows Vista or Windows XP, you need to get this as well:<br /><a href=\"http://www.cccp-project.net/\" />http://www.cccp-project.net</a><br /><br /><a href=\""+refresh+"\" >Once that is done, please click here.</a></center></font>";
	GM_setValue("YouTubeScriptFirstRun", false);
}
else
{


if (conf["autoHD"] == true)
{
	if (isHD720avail() == true || isHD1080avail() == true) {
		var theurl = document.location.href.toString();
		if(theurl.search("&Quality=High_Quality") == -1)
		{
			toggleWideScr(true);
		}
	}
}

qualtiy = getQuality();
//setTimeout("secondpart();",4000);
if (qualtiy == "High_Quality") {
	setTimeout(replacePlayer("hq"),500);
	//replacePlayer("hq");
}
else if (qualtiy == "High_Definition720") {
	setTimeout(replacePlayer("hd720"),500);
	//replacePlayer("hd720");
}
else if (qualtiy == "High_Definition1080") {
	setTimeout(replacePlayer("hd1080"),500);
	//replacePlayer("hd1080");
}

}

function getPlayer(qual) {
	url = getURL(qual);
	player =  "<center><EMBED type=\"application/x-ms-wmp\" id=\"YTPlayer\" stretchToFit=\"true\" zoom=\"200%\" zoomabsolute=\"2000\" pluginspage=\"http://port25.technet.com/pages/windows-media-player-firefox-plugin-download.aspx\"";
	player += "	width=\""+conf["width"]+"\" height=\""+conf["height"]+"\"";
	player += "	src=\""+url+"\" autostart=\""+conf["autostart"]+"\" loop=\""+conf["loop"]+"\" volume=\""+conf["volume"]+"\">";
	player += "</EMBED></table>";
	
	return player;
	
}

function getURL(qual) {
	var vidId = unsafeWindow.yt.config_.VIDEO_ID;
	var t = decodeURIComponent(args['t']);
	var fmtList = decodeURIComponent(args['fmt_list']);
	fmtList = fmtList.split(",");
	for(var i = 0; i < fmtList.length; i++) {
		fmtList[i] = fmtList[i].split("/")[0];
	}

	
	var downloadURL = "http://www.youtube.com/get_video?video_id=" + vidId + "&t=" + t;
	switch(qual) {
		case "hq": return downloadURL + "&fmt=18"; break;
		case "hd720": return downloadURL + "&fmt=22"; break;
		case "hd1080": return downloadURL + "&fmt=37"; break;
		default: return "";
	}
	
}

//function getURL(qual) {
//	id = document.URL.split("v=")[1];
//	id = id.split("&")[0];
//	flashvars = document.getElementById("movie_player").getAttribute("flashvars");
//	valid = flashvars.split("&t=")[1];
//	valid = valid.split("&")[0];
//	downloadURL = "http://"+document.domain+"/get_video?video_id="+id+"&t="+valid;
//	
//	switch(qual) {
//		case "hq": return downloadURL + "&fmt=18"; break;
//		case "hd": return downloadURL + "&fmt=22"; break;
//		default: return "";
//	}
//}


function isHD1080avail() {
  var fmt_map_check = decodeURIComponent(args['fmt_list']);
    if (fmt_map_check.indexOf('37/1920x1080/9/0/115') > -1) {
		return true;
	}
	else {
		return false;
	}
}

function isHD720avail() {
  var fmt_map_check = decodeURIComponent(args['fmt_list']);
    if (fmt_map_check.indexOf('22/1280x720/9/0/115') > -1) {
		return true;
	}
	else {
		return false;
	}
}



function getLinks(qual) {
    var theurl = document.location.href.toString();
	cleanURL = window.location.href;
	cleanURL = cleanURL.replace(/&Quality=High_Quality/, "");
	cleanURL = cleanURL.replace(/&Quality=High_Definition720/, "");
	cleanURL = cleanURL.replace(/&Quality=High_Definition1080/, "");
	cleanURL = cleanURL.replace(/&hd=1/, "");
	var links;
	
	if (qual == "hq") {
		links = "[<b>High Quality</b>]&nbsp;";
	}
	else {
		links = "[<a id=\"HighQuality\" class=\"link\">High Quality</a>]&nbsp;";
	}
	if (qual == "hd720") {
		links += "&nbsp;&nbsp;[<b>High Definition(720p)</b>]";
		if (isHD1080avail()){
		links += "&nbsp;&nbsp;&nbsp;[<a id=\"hd1080\">High Definition(1080p)</a>]";
		}
	}
	else if(qual == "hd1080") {
		links += "&nbsp;&nbsp;[<a id=\"hd720\">High Definition(720p)</a>]";
		links += "&nbsp;&nbsp;&nbsp;[<b>High Definition(1080p)</b>]";
	}
	else if (isHD1080avail()) {
		links += "&nbsp;&nbsp;[<a id=\"hd720\">High Definition(720p)</a>]";
		links += "&nbsp;&nbsp;&nbsp;[<a id=\"hd1080\">High Definition(1080p)</a>]";
	}
	else if (isHD720avail()) {
			links += "&nbsp;&nbsp;&nbsp;[<a id=\"hd720\">High Definition(720p)</a>]";
			if (isHD1080avail()){
			links += "&nbsp;&nbsp;&nbsp;[<a id=\"hd1080\">High Definition(1080p)</a>]";
			}
		}
	links += "&nbsp;&nbsp;&nbsp;[<a id=\"flash\">Disable WMP</a>]</center>";
	return links;
}

function replacePlayer(qual) {

	var theurl = document.location.href.toString();	
		if (isHD720avail() == true || isHD1080avail() == true) {
			if (conf["autoHD"] == true){
				if (qual != "hq"){
					conf["width"] = 960;
					conf["height"] = 605;
				}
			}
		}
	
	if (theurl.search("disable=true") == -1) {
	playerDiv.innerHTML = getPlayer(qual)+"<br>"+getLinks(qual);
	if (checkvideo() == false)
		{
			playerDiv.innerHTML = "<center><br /><br /><br /><br /><br /><br />This video is not compatible with YouTube - Windows Media Player<br />Please click \"Disable WMP\" below.<br /><br /><br /><br /><br /><br />"+getLinks(qual);
		}
    }
	else
	{
	
		var cleanURL = window.location.href;
		cleanURL = cleanURL.replace(/&disable=true/, "");
		playerDiv.innerHTML += "<center>[<a href="+cleanURL+">Enable YouTube Windows Media Player</a>]<center>";

}
if (qual == "flash"){
	playerDiv.innerHTML = keepFlash + "<center>[<a id=\"wmp\">Enable YouTube Windows Media Player</a>]<center>";
}
		var writePlayerFunction = function(qual) {
            return function (event) {
			if (qual != "flash"){
				GM_setValue("YouTubeWMPScriptQuality", qual);
			}
				if (qual == "hq" || qual == "flash"){
					toggleWideScr(false);
					conf["width"] = 640;
					var s = unsafeWindow.yt.getConfig('IS_WIDESCREEN');
					if (s == true){
						conf["height"] = 425;
					}else{
						conf["height"] = 545;
					}
					if (s == true && qual == "flash"){
						toggleWideScr(false);
					}
				}
				else
				{
					conf["width"] = 960;
					conf["height"] = 605;
					toggleWideScr(true);
				}
				replacePlayer(qual);
            };
        };
		if (document.getElementById('HighQuality') != null){
				var hqlink = document.getElementById('HighQuality');
				hqlink.addEventListener("click", writePlayerFunction('hq'), true);
		}
		if (document.getElementById("hd720") != null){
				var hd720link = document.getElementById("hd720");
				hd720link.addEventListener("click", writePlayerFunction('hd720'), true);
		}
		if (document.getElementById("hd1080") != null){
				var hd1080link = document.getElementById("hd1080");
				hd1080link.addEventListener("click", writePlayerFunction('hd1080'), true);
		}
		if (document.getElementById("flash") != null){
				var flashlink = document.getElementById("flash");
				flashlink.addEventListener("click", writePlayerFunction('flash'), true);
		}
		if (document.getElementById("wmp") != null){
				var wmplink = document.getElementById("wmp");
				
				if (conf["quality_default"] == "hd1080" && isHD1080avail() == true){
					newquality = "hd1808";
				}
				else if (conf["quality_default"] == "hd1080" && isHD1080avail() == false){
					if (isHD720avail() == true){
						newquality = "hd720";
					}
					else
					{
						newquality = "hq";
					}
				}
				
				if (conf["quality_default"] == "hd720" && isHD720avail() == true){
					newquality = "hd720";
				}
				else if (conf["quality_default"] == "hd720" && isHD720avail() == false){
					newquality = "hq";
				}
				
				if (conf["quality_default"] == "hq"){
					newquality = "hq";
				}
				
				wmplink.addEventListener("click", writePlayerFunction(newquality), true);
		}
}

function checkvideo(){
	
  var fmt_map_check = decodeURIComponent(args['fmt_list']);
	//alert(fmt_map_check);
    if (fmt_map_check.indexOf('37/1920x1080/9/0/115') != -1) {
		return true;
	}
	if (fmt_map_check.indexOf('22/1280x720/9/0/115') != -1) {
		return true;
	}
	if (fmt_map_check.indexOf('35/854x480/9/0/115') != -1) {
		return true;
	}
	if (fmt_map_check.indexOf('34/640x360/9/0/115') != -1) {
		return true;
	}
	if (fmt_map_check.indexOf('34/320x240/9/0/115') != -1) {
		return true;
	}
	if (fmt_map_check.indexOf('18/854x480/9/0/115') != -1) {
		return true;
	}
	
	return false;
}
	
	

function getQuality()
{
	url = document.URL;
	
	if (url.indexOf("High_Quality") >= 0) {
		return("High_Quality");
	}
	else if ((url.indexOf("High_Definition720") >= 0) && (isHD720avail() == false)) {
		return("High_Quality");
	}
	else if ((url.indexOf("High_Definition720") >= 0) && (isHD720avail() == true)) {
		return("High_Definition720");
	}
	else if ((url.indexOf("High_Definition1080") >= 0) && (isHD1080avail() == true)) {
		return("High_Definition1080");
	}
	else {
		if (conf["quality_default"] == "hq") {
			return("High_Quality");
		}
		else if ((conf["quality_default"] == "hd720") && (isHD720avail() == false)) {
			return("High_Quality");
		}
		else if ((conf["quality_default"] == "hd720") && (isHD720avail() == true)) {
			return("High_Definition720");			
		}
		else if ((conf["quality_default"] == "hd1080") && (isHD1080avail() == true)) {
			return("High_Definition1080");			
		}
		else if ((conf["quality_default"] == "hd1080") && (isHD1080avail() == false)) {
			if (isHD720avail() == true){
			return("High_Definition720");	
			}
			else
			{
			return("High_Quality");
			}	
		}
	}
return("High_Quality");
}

//document.getElementById('player-toggle-switch').style.visibility = "hidden";





