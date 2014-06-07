// ==UserScript==
// @name           Gmail Smiley Extender
// @description    Add extra emojii to your Gmail chat!
// @author         1nfected
// @version        0.5
// @namespace      1nfected
// @license        CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/

// @include        http://mail.google.com/*
// @include        https://mail.google.com/*

// @history        0.5 Compatible with the new Gmail UI.
// @history		   0.5 Embeded a cross-brower compatible update notifier.
// ==/UserScript==


(function() {

// -------- USER CONFIGURABLE OPTIONS ------- //

// User defined CUSTOM SMILEYS
/* Declare your custom smileys here in the following format:

	var customSmileys = [
		[<REGEXP>, <FULL_PATH_TO_SMILEY>],
		[<REGEXP>, <FULL_PATH_TO_SMILEY>]
	];
	 
	EXAMPLE:
	var customSmileys = [
		[/:lol:/      ,'http://www.example.com/lol.gif'],
		[/:roflmao:/  ,'http://example.com/smileys/roflmao.png'],
		[/lmao/		  ,'https://ex.ample.org/laugingmyassoff.jpg']
	];
*/

var customSmileys;

// ------ END USER CONFIGURABLE OPTIONS ------ //

// -------- DONT EDIT BELOW THIS LINE -------- //

try { if(self != window.top) { return; } }
catch(e) { return; }

testGM();

var smileys, smileyURL;

var version = '0.5';
var scriptid = 77439;

// ----------------- EMBEDED SCRIPTS ------------------ //

/*  Script Updater
 *  --------------
 *  @autor      PhasmaExMachina (mod by 1nfected)
 *  @version    1.1
 */
ScriptUpdater=function(){var _version="1.1";var isGM=typeof GM_getValue!="undefined"&&typeof GM_getValue("a","b")!="undefined";function $(id){return doc.getElementById(id)}function initVars(id,currentVersion,callbackfn,notice,noticeEnabled){this.scriptId=id;this.scriptCurrentVersion=typeof currentVersion!="undefined"?currentVersion.toString():false;this.callbackFunction=typeof callbackfn=="function"?callbackfn:false;this.useNotice=notice;this.forceNoticeEnabled=noticeEnabled;this.interval=getInterval(); this.lastCheck=getLastCheck();this.doc=docElement||document}function checkRemoteScript(){if(scriptCurrentVersion&&!alreadyOffered(scriptCurrentVersion))addOffer(scriptCurrentVersion);var d=new Date;if(isGM){GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+scriptId+".meta.js",headers:{"User-agent":"Mozilla/5.0","Accept":"text/html"},onload:function(response){handleResponse(response.responseText)}});setVal("lastCheck",d.getTime())}else if(jsURL){var script=doc.createElement("script"); script.src=jsURL;script.type="text/javascript";var versionCheckDiv=doc.createElement("div");versionCheckDiv.id="ScriptUpdater-"+scriptId;versionCheckDiv.style.display="none";versionCheckDiv.addEventListener("DOMNodeInserted",function(){handleResponse(versionCheckDiv.textContent);versionCheckDiv.parentNode.removeChild(versionCheckDiv);script.parentNode.removeChild(script)},false);doc.body.appendChild(versionCheckDiv);doc.getElementsByTagName("head")[0].appendChild(script);setVal("lastCheck",d.getTime())}} function handleResponse(response){this.meta=parseHeaders(response);setVal("versionAvailable",meta.version);if(forceNoticeEnabled||scriptCurrentVersion!=meta.version&&useNotice){if(!alreadyOffered(meta.version))addOffer(meta.version);showNotice()}if(typeof callbackFunction=="function")callbackFunction(meta.version)}function parseHeaders(metadataBlock){var source=metadataBlock;var headers={};var tmp=source.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);if(tmp){var lines=tmp[0].match(/@(.*?)(\n|\r)/g); for(var i=0;i<lines.length;i++){var tmp=lines[i].match(/^@([^\s]*?)\s+(.*)/);var key=tmp[1];var value=tmp[2];if(headers[key]&&!(headers[key]instanceof Array))headers[key]=new Array(headers[key]);if(headers[key]instanceof Array)headers[key].push(value);else headers[key]=value}}return headers}function showNotice(){if(meta.name&&meta.version){var s="#ScriptUpdater-"+scriptId+"-";addStyle(s+"Mask{position:fixed;width:100%;top:0;left:0;height:100%;background-color:#000;opacity:.7;z-index:9000}"+s+"BodyWrapper{position:absolute;width:100%;top:0;left:0;z-index:9010;max-width:auto;min-width:auto;max-height:auto;min-height:auto}"+ s+"Body *{border:none;font-size:12px;color:#333;font-weight:normal;margin:0;padding:0;background:none;text-decoration:none;font-family:sans-serif}"+s+"Body{width:500px;margin:auto;top:125px;position:fixed;left:35%;text-align:left;background:#f9f9f9;border:1px outset #333;padding:0;font-family:sans-serif;font-size:14px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;cursor:default;z-index:9010;color:#333;padding-bottom:1em}"+s+"Body a{margin:0 .5em;text-decoration:underline;color:#009;font-weight:bold}"+ s+"Body strong{font-weight:bold}"+s+"Body h1{font-size:13px;font-weight:bold;padding:.5em;border-bottom:1px solid #333;background-color:#999;margin-bottom:.75em}"+s+"Body h2{font-weight:bold;margin:.5em 1em}"+s+"Body h1 img{margin-top:2px;vertical-align:middle}"+s+"Body h1 a{font-size:17px;font-weight:bold;color:#fff;text-decoration:none;cursor:help;vertical-align:middle}"+s+"Body h1 a:hover{text-decoration:underline}"+s+"Body table{width:auto;margin:0 1em}"+s+"Body table tr th{padding-left:2em;text-align:right;padding-right:.5em;line-height:2em}"+ s+"Body table tr td{line-height:2em;font-weight:bold}"+s+"Body p{font-size:12px;font-weight:normal;margin:1em}"+s+"CloseButton{background-image:url("+icons.close+")!important}"+s+"InstallButton{background-image:url("+icons.install+")!important}"+s+"History{margin:0 1em 1em 1em;max-height:150px;overflow-y:auto;border:1px inset #999;padding:0 1em 1em;width:448px}"+s+"History ul{margin-left:2em}"+s+"Close{float:right;cursor:pointer;height:14px}"+s+"Footer{margin:.75em 1em}"+s+"Footer input{border:1px outset #666;padding:3px 5px 5px 22px;background:no-repeat 4px center #eee;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;cursor:pointer;float:right;margin-left:.5em}"+ s+"Footer input:hover{background-color:#f9f9f9}"+s+"Footer select{border:1px inset #666}");var noticeBg=doc.createElement("div");noticeBg.id="ScriptUpdater-"+scriptId+"-Mask";doc.body.appendChild(noticeBg);var noticeWrapper=doc.createElement("div");noticeWrapper.id="ScriptUpdater-"+scriptId+"-BodyWrapper";var html=new Array;var notice=doc.createElement("div");notice.id="ScriptUpdater-"+scriptId+"-Body";html.push('<h1><img id="ScriptUpdater-'+scriptId+'-Close" src="');html.push(icons.close);html.push('" title="Close"/><img id="ScriptUpdater-'+ scriptId+'-USO" src="');html.push(icons.uso);html.push('"/><a href="http://userscripts.org/scripts/show/57756" target="_blank" title="About Userscripts.org Script Updater v');html.push(_version);html.push('">Userscripts.org Updater</a></h1>');if(!forceNoticeEnabled){html.push('<p>There is a new version of <strong><a href="http://userscripts.org/scripts/show/');html.push(scriptId);html.push('" target="_blank" title="Go to script page">');html.push(meta.name);html.push("</a> </strong> available for installation.</p>")}else{html.push('<p><strong><a href="http://userscripts.org/scripts/show/'); html.push(scriptId);html.push('" target="_blank" title="Go to script page" style="margin:0; padding:0;">');html.push(meta.name);html.push("</a> </strong></p>")}if(scriptCurrentVersion){html.push("<p>You currently have version <strong>");html.push(scriptCurrentVersion);html.push("</strong> installed. The latest version is <strong>");html.push(meta.version);html.push("</strong></p>")}if(meta.history){html.push('<h2>Version History:</h2><div id="ScriptUpdater-'+scriptId+'-History">');var history=new Array; var version,desc;if(typeof meta.history!="string")for(var i=0;i<meta.history.length;i++){var tmp=meta.history[i].match(/(\S+)\s+(.*)$/);version=tmp[1];change=tmp[2];history[version]=typeof history[version]=="undefined"?new Array:history[version];history[version].push(change)}else{var tmp=meta.history.match(/(\S+)\s+(.*)$/);version=tmp[1];change=tmp[2];history[version]=typeof history[version]=="undefined"?new Array:history[version];history[version].push(change)}for(var v in history){html.push('<div style="margin-top:.75em;"><strong>v'+ v+"</strong></div><ul>");for(var i=0;i<history[v].length;i++)html.push("<li>"+history[v][i]+"</li>");html.push("</ul>")}html.push("</div>")}html.push('<div id="ScriptUpdater-'+scriptId+'-Footer">');html.push('<input type="button" id="ScriptUpdater-'+scriptId+'-CloseButton" value="Close"/>');html.push('<input type="button" id="ScriptUpdater-'+scriptId+'-InstallButton" value="Install"/>');html.push("Check for updates every ");html.push('<select id="ScriptUpdater-'+scriptId+'-Interval"><option value="3600000"> Hour </option><option value="21600000"> 6 Hours </option><option value="43200000"> 12 Hours </option><option value="86400000"> Day </option><option value="259200000"> 3 Days </option><option value="604800000"> Week </option><option value="0">Never</option></select>'); html.push("</div>");notice.innerHTML=html.join("");noticeWrapper.appendChild(notice);doc.body.appendChild(noticeWrapper);$("ScriptUpdater-"+scriptId+"-Close").addEventListener("click",closeNotice,true);$("ScriptUpdater-"+scriptId+"-CloseButton").addEventListener("click",closeNotice,true);$("ScriptUpdater-"+scriptId+"-InstallButton").addEventListener("click",function(){setTimeout(closeNotice,500);doc.location=typeof installUrl=="string"?installUrl:"http://userscripts.org/scripts/source/"+scriptId+ ".user.js"},true);window.addEventListener("keyup",keyUpHandler,true);var selector=$("ScriptUpdater-"+scriptId+"-Interval");for(var i=0;i<selector.options.length;i++)if(selector.options[i].value.toString()==interval.toString())selector.options[i].selected=true;selector.addEventListener("change",function(){interval=this.value;setVal("interval",parseInt(interval))},true);noticeWrapper.style.height=doc.documentElement.clientHeight+"px";$("ScriptUpdater-"+scriptId+"-Mask").style.height=window.scrollMaxY+ window.innerHeight+"px"}}function closeNotice(){doc.body.removeChild($("ScriptUpdater-"+scriptId+"-BodyWrapper"));doc.body.removeChild($("ScriptUpdater-"+scriptId+"-Mask"));window.removeEventListener("keyup",keyUpHandler,true)}function keyUpHandler(e){if(e.keyCode==27)closeNotice()}function addStyle(css){var head=doc.getElementsByTagName("head")[0];if(!head)return;var style=doc.createElement("style");style.type="text/css";style.appendChild(doc.createTextNode(css));head.appendChild(style)}function getVal(key, defValue){if(isGM)return eval(GM_getValue("ScriptUpdater."+key,"({})"));else{key="ScriptUpdater."+scriptId+"."+key;var value=localStorage.getItem(key);if(value==null)return defValue;else switch(value.substr(0,2)){case "S]":return value.substr(2);case "N]":return parseInt(value.substr(2));case "B]":return value.substr(2)=="true";case "A]":return value.substr(2).split(",")}return value}}function setVal(key,value){if(isGM)GM_setValue("ScriptUpdater."+key,uneval(value));else{key="ScriptUpdater."+scriptId+ "."+key;switch(typeof value){case "string":localStorage.setItem(key,"S]"+value);break;case "number":if(value.toString().indexOf(".")<0)localStorage.setItem(key,"N]"+value);break;case "boolean":localStorage.setItem(key,"B]"+value);break;case "object":localStorage.setItem(key,"A]"+value.join(","));break}}}function alreadyOffered(version){var offers=getOffers();if(offers.length==0){addOffer(version);return true}else for(var i=0;i<offers.length;i++)if(version.toString()==offers[i].toString())return true; return false}function getOffers(){var offers=getVal("versionsOffered");return typeof offers=="undefined"||typeof offers.length=="undefined"||typeof offers.push=="undefined"?new Array:offers}function addOffer(version){var offers=getOffers();offers.push(version);setVal("versionsOffered",offers)}function getInterval(){var val=getVal("interval");return typeof val=="undefined"||!val.toString().match(/^\d+$/)?864E5:parseInt(val.toString())}function getLastCheck(){var val=getVal("lastCheck");return typeof val== "undefined"||!val.toString().match(/^\d+$/)?0:parseInt(val.toString())}var icons={install:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKCSURBVHjaYjTL3lPIwMAgD8Q2QKwExDwMDP9ZgDQjw38GMGBmYmRgAuL///8x/PvH8IGNleHO95+/O09N81wDEEAghVqzS61SQOrVpdnBev7/+8/w6w8Q//4H1szJzsTAyMjA8OX7P4YvP/7y33v+xWDhzrszzLK28QMEEBNQvS1I1/pTnxiA+oC2/GfIm3waaBOQA9TFygKxHWTgd6CBf/4xMP5lYGKJd1cW5mRnmwoQQCADJEC2gjT8Bsr+/gNx928gn4WZAWwASO77L6gc0IIDlz8zsLEyM3z/+YcNIIBAXuD68w/scLAiEGACufc/SDPQ6UD4A2jz95//gS78D3YliH729gfIMEaAAGIBBdhfoAAQMfyE2l6bYADWDEQMv//+Z/j2E+R0cAACzQXCfyDX/AUHKkAAgUP7318GsNOaF5wHehvoZ0aY7QwMINf9AXoNGiFgICAgBDSAGawHIIBYGMBOApn+l0FMXBoUGZD4A+uAOhlo4///UC+AnAG05PfvP6DoYgAIIJALGP7+BRsGBoxwBgPEyf8h4QOh/oPlQU7//RuSLgACCGzAn7//GKBWgv0ICjgGsEKIf8H+Btv+F5xGgCyGn7//g10AEECgQGT4+w/i5LpIGQZiQOnsq8BwgbgEIIBYQFH2Fxa6QEMmHkvBqznPcjbQy3/ACQukASCAWCB+/Q8OcRCwkokl6IJ/QBv//gYnPwaAAGIB+u0/0AuMsDA49mQxXs0msnZAF/wFpw+QXoAAYgFa/uDXn3+Kxspc4AxTYD2HoAvEeYEu+Au28D1AADGaZe3qBxqkBnSBJdBIQZCzwFH3/x84kJBpWMxAIv3/ZwZGpssAAQYAIXxui1/HoMEAAAAASUVORK5CYII%3D", close:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII%3D", uso:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKwSURBVHjabJNJTBNRGID/mc5MQYVWVNCGTbEtNZGDBj1ogolEMR5UJA2LBmMoIokxERIj8ehJjx6MYIQoJgq4JIa6gEARkKJFTa2iFFtKWwp2oeDCzNQ+31DQCc5L/nmT/P/3749ACAFBECBxiEPFFds0Ws399DRVhtX2udc97ig0PmgOLBkIbOwjAR8uMRRdvXF7pqv/NfrqnEAOlxsdLas6j3Wk2AEpCRcbKvLydrdu1WUr0lXrITEhAZKUSkhQKvKwXiY2ppbDRzCcv29P/ZZsDaSqUkCJYVJGwKMnHTDlmWgTZ/CvjkW4sKTScP1WC+oZsKAxpwv5gyEUnAkj2xc70p88Y8Y2a8VBxT0gispOGa413UVDb23IMe6OwaEw+jTqQKMOF3pptqBSw7k74hLEPaDUOu0VmpFDV58ZCJIAkiDB5fUBz0eApmjQqbOgrqa69HhVbZO4jKUfmiBJBctysHJFPPiDYbA7J4DjeJDLaWAYGVAyErIy0uDs6RPH9OXVtULWYgfEmN3emJK8BlYrEsHl8cEvloX4ODnEyRlgKGZhV1iOhcz0VNixM7dOCCp2EBkeMF3u6DaNqDasg1U4CzlFxxSRKMyz8xjmsPAQwNmRsc2jxGPkR0esHp7n9RBFrYbyUi1DUzh1GujFG0UBQrNz8P7DR3j+9NklqTEK3VVkbNLkVNZc9AwNW5Hb60PT/gCamg6gEbsT3XvYjvIP6i9gu2ShhOWb+BvLD13O9o3azWrVdy4K3wKhv5HfWW1Q39BY19nechPbzQrVwX9bhU+iIqnyQMF+mPvJQr/FCsHwDJgG30ADhl8Y2wQ4jIUVkpdaZRnPcd6AfxomJ32AIhEwdvaC8XG7JLwwvmXPmVFn52Tu2lvQjN9Crn3M6bWY+6otr3oGpWCB/SPAAJaJRguGUxB0AAAAAElFTkSuQmCC"}; return{setDoc:function(docEl){docElement=docEl},setjsURL:function(url){if(url!="undefined"&&typeof url=="string")jsURL=url},check:function(scriptId,currentVersion,callback){initVars(scriptId,currentVersion,callback,true,false);var d=new Date;if(interval>0&&d.getTime()-lastCheck>interval)checkRemoteScript()},forceCheck:function(scriptId,currentVersion,callback){initVars(scriptId,currentVersion,callback,true,false);checkRemoteScript()},getLatestVersion:function(scriptId,callback){if(typeof callback!= "function")alert("ScriptUpdater error:\n\n scriptUpdater.getLatestVersion() requires a callback function as the second argument");initVars(scriptId,callback,false,false,false);checkRemoteScript()},forceNotice:function(scriptId,currentVersion,callback){initVars(scriptId,currentVersion,callback,true,true);checkRemoteScript()},checkStored:function(){if(typeof scriptId!="undefined"&&typeof scriptCurrentVersion!="undefined")return typeof getVal("versionAvailable")!="undefined"&&scriptCurrentVersion.toString()!= getVal("versionAvailable").toString();else return false}}}();

// --------------- END EMBEDED SCRIPTS ---------------- //

// Test for Greasemonkey API & adapt accordingly
function testGM() {
	const LOG_PREFIX = 'Gmail Smiley Extender: ';
	const LOG = true;
	const DEBUG = false;
	isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
	log = isGM ? function(msg) { if(LOG) GM_log(msg) } : window.opera ? function(msg) { if(LOG) opera.postError(LOG_PREFIX+msg); } : function(msg) { try { if(LOG) console.info(LOG_PREFIX+msg); } catch(e) {} }
	debug = function(msg) { if(LOG && DEBUG) log('** Debug: '+msg+' **') }
}


// All in one function to get elements
function $(q,root,single,context) {
	root = root || document;
	context = context || root;
	if(q[0] == '#') return root.getElementById(q.substr(1));
	if(q.match(/^[\/*]|^\.[\/\.]/)) {
		if(single) return root.evaluate(q,context,null,9,null).singleNodeValue;
		var arr = []; var xpr = root.evaluate(q,context,null,7,null);
		for(var i = 0, len = xpr.snapshotLength; i < len; i++) arr.push(xpr.snapshotItem(i));
		return arr;
	}
	if(q[0] == '.') {
		if(single) return root.getElementsByClassName(q.substr(1))[0];
		return root.getElementsByClassName(q.substr(1));
	}
	if(single) return root.getElementsByTagName(q)[0];
	return root.getElementsByTagName(q);
}

function addStyle(css) {
	var head = $('head')[0];
	if(!head) return;
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	head.appendChild(style);
}

// Waits for a given set of Elements to load. Takes a callback as argument which is called if all the elements are found.
// mode == 0 : callback only if all the elements are found. (DEFAULT)
// mode == 1 : callback even if none of the elements are found.
// mode == 2 : callback immed if any single element is found.
function $W(Q,callback,mode,t) {
	t = t || 1; mode = mode || 0;
	var arr = Q instanceof Array;
	var l = arr ? Q.length : 1;
	var matches = [];
	for(var i = 0; i < l; i++) {
		var O = arr ? Q[i] : Q;
		var q = O.q || O, r = O.r, s = O.s, c = O.c;
		var T = O.t || 10, I = O.i || 250, N = O.n, F = O.f;
		var match = $(q,r,s,c);
		if(match && match.length == 0) match = null;
		if(match) { matches.push(match); if(mode == 2) { break; } }
		else {
			if(i !== (l-1) && mode == 2) { continue; }
			if(t >= T) {
				if(F) log(F);
				if(mode !== 1)
					return;
			}
			else {
				if(N) debug(t+' - '+N+' in '+t*I+'ms...');
				window.setTimeout(function(){$W(Q,callback,mode,++t)},t*I);
				return;
			}
		}
	}
	if(typeof callback == 'function') {
		if(matches.length == 1) matches = matches[0];
		if(matches.length == 0) matches = null;
		callback(matches);
	}
}

window.addEventListener('load', init, false);

function init() {
	$W({q:'.no',t:20,i:150,r:document,s:true,n:'Finding root element...',f:'Failed to find root element!'},chatHook,2);

	/*** Smileys are by Synfull (http://synfull.deviantart.com/). Used with permission ***/
	smileys = [
		[/:\!:/              ,'exclamation'],
		[/:\?:/              ,'question'],
		[/:angel:/           ,'angel'],
		[/:annoyed:/         ,'annoyed'],
		[/:blush:/           ,'blush'],
		[/:brb:/             ,'brb'],
		[/:cool:/            ,'cool'],
		[/:geek:|8-?\)/      ,'geek'],
		[/:grump:/           ,'grump'],
		[/:love:/            ,'love'],
		[/:meh:/             ,'meh'],
		[/:omg:/             ,'omg'],
		[/:paranoid:/        ,'paranoid'],
		[/:rage:/            ,'rage'],
		[/:silent:/          ,'silent'],
		[/:upset:/           ,'upset'],
		[/:zip:/             ,'zip'],
		[/[:=]B/             ,'buckteeth'],
		[/[xX]D/             ,'XD'],
		[/\._\./             ,'-_-'],
		[/[oO0][_\.][oO0]/   ,'oo']
	];
	smileyURL = 'http://i37.photobucket.com/albums/e62/im1nfected/Gmail Smiley Extender/';
	
	for(var i = smileys.length-1; i >= 0; i--) {
		smileys[i][0] = new RegExp('(^|\\s)' + smileys[i][0].source + '(\\s|$)(?!([^<]+)?>)', 'g');
		smileys[i][1] = smileyURL+smileys[i][1]+'.gif';
	}
	
	// This is where we add any custom smileys defined by you =)
	if(customSmileys && customSmileys.length > 0) {
		var l = smileys.length;
		for(var i = 0; i < customSmileys.length; i++) {
			smileys[l+i][0] = new RegExp('(^|\\s)' + customSmileys[i][0].source + '(\\s|$)(?!([^<]+)?>)', 'g');
			smileys[l+i][1] = customSmileys[i][1];
		}
	}
	
	addStyle(".smileyext{margin-top:-2px;vertical-align:middle}");
	
	ScriptUpdater.setjsURL('http://dl.dropbox.com/u/19875602/gm/77439.metax.js');
	ScriptUpdater.check(scriptid,version);
}

function chatHook(match) {
	match.addEventListener('DOMNodeInserted',function(event) {
		var source = event.target;
		if(source.className == 'Z8Dgfe') {
			var kms = $('//div[@class="aec"]/div[@class="kk"]/div[2]',document,false,source);
			var kls = $('//div[@class="kl"]',document,false,source);
			if(kms) { for(var i = 0,l = kms.length; i < l; i++) insertSmiley(kms[i]); }
			if(kls) { for(var i = 0,l = kls.length; i < l; i++) insertSmiley(kls[i]); }
			source.children[0].addEventListener('DOMNodeInserted',function(e1) {
				var source1 = e1.target;
				if(source1.className == 'aec') {
					insertSmiley($('div',source1)[2]);
					source1.addEventListener('DOMNodeInserted',function(e2) {
						var source2 = e2.target;
						if(source2.className == 'kl') insertSmiley(source2);
					},false);
					source1.addEventListener('DOMSubtreeModified',function(e2) {
						var source2 = e2.target;
						if(source2.className == 'kl') insertSmiley(source2);
						else if(source2.parentNode.parentNode.className == 'tReiP') insertSmiley($('div',source1)[2]);
					},false);
				}
			},false);
		}
	},false);
	
	log('Smiley Extender started.');
}

function insertSmiley(node) {
	for(var i = smileys.length-1; i >= 0; i--) {
		var smileyRegex = smileys[i][0];
		if(node.textContent.match(smileyRegex)) {
			node.innerHTML = node.innerHTML.replace(smileyRegex,' <img class="smileyext" src="'+smileys[i][1]+'"> ');
		}
	}
}

})();