// ==UserScript==
// @name			Gmail Notifier
// @description		Audio & Favicon alerts for New Mail or Chat msgs. (Cross-browser compatible!)
// @author			1nfected
// @version			0.8.5
// @namespace		1nfected
// @license			CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/

// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_log
// @grant			GM_xmlhttpRequest

// @include			http://mail.google.com/*
// @include			https://mail.google.com/*

// @history			0.8.5 Fixes for changes in Gmail
// @history			0.8.5 Add new font style - Slim
// ==/UserScript==

(function () {

// -------- USER CONFIGURABLE OPTIONS ------- //

var priorityInbox = false; //SET to TRUE to monitor alerts for Priority Inbox, instead of Inbox.
var soundAlerts = {
    mail : true,  // SET to FALSE to turn off Sound Alerts for new mails.
    chat : true   // SET to FALSE to turn off Sound Alerts for new chat msgs.
}
var fontType = 'smooth'; // SET FONT CHOICE - square OR smooth
var fontColor = [ // SET FONT COLOR (a parseable CSS Color value)
    '#000000',    // Border Color
    '#FFFFFF'     // Fill Color
];
var drawBorder = false; // Draws a border around the final number to be displayed on the favicon.
var borderColor = ''; // Border Color. (a parseable CSS Color value)
var flashM = 5; // Number of times the icon should flash when you recv new mail.
var flashC = 5; // Number of times the icon should flash when you recv new chat msg.


// -------- DONT EDIT BELOW THIS LINE -------- //

var scriptID = 86361;
var version = '0.8.5';
var doc, gmail, canvas;

testGM();

// Don't Run in frames
try {
    if(self != window.top)
        return;
}
catch(e) {
    return;
}

// ----------------- EMBEDED SCRIPTS ------------------ //

/*  Script Updater
 *  --------------
 *  @autor      PhasmaExMachina (mod by 1nfected)
 *  @version    1.1
 */
ScriptUpdater=function(){var _version="1.1";var isGM=typeof GM_getValue!="undefined"&&typeof GM_getValue("a","b")!="undefined";function $(id){return doc.getElementById(id)}function initVars(id,currentVersion,callbackfn,notice,noticeEnabled){this.scriptId=id;this.scriptCurrentVersion=typeof currentVersion!="undefined"?currentVersion.toString():false;this.callbackFunction=typeof callbackfn=="function"?callbackfn:false;this.useNotice=notice;this.forceNoticeEnabled=noticeEnabled;this.interval=getInterval(); this.lastCheck=getLastCheck();this.doc=docElement||document}function checkRemoteScript(){if(scriptCurrentVersion&&!alreadyOffered(scriptCurrentVersion))addOffer(scriptCurrentVersion);var d=new Date;if(isGM){GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+scriptId+".meta.js",headers:{"User-agent":"Mozilla/5.0","Accept":"text/html"},onload:function(response){handleResponse(response.responseText)}});setVal("lastCheck",d.getTime())}else if(jsURL){var script=doc.createElement("script"); script.src=jsURL;script.type="text/javascript";var versionCheckDiv=doc.createElement("div");versionCheckDiv.id="ScriptUpdater-"+scriptId;versionCheckDiv.style.display="none";versionCheckDiv.addEventListener("DOMNodeInserted",function(){handleResponse(versionCheckDiv.textContent);versionCheckDiv.parentNode.removeChild(versionCheckDiv);script.parentNode.removeChild(script)},false);doc.body.appendChild(versionCheckDiv);doc.getElementsByTagName("head")[0].appendChild(script);setVal("lastCheck",d.getTime())}} function handleResponse(response){this.meta=parseHeaders(response);setVal("versionAvailable",meta.version);if(forceNoticeEnabled||scriptCurrentVersion!=meta.version&&useNotice){if(!alreadyOffered(meta.version))addOffer(meta.version);showNotice()}if(typeof callbackFunction=="function")callbackFunction(meta.version)}function parseHeaders(metadataBlock){var source=metadataBlock;var headers={};var tmp=source.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);if(tmp){var lines=tmp[0].match(/@(.*?)(\n|\r)/g); for(var i=0;i<lines.length;i++){var tmp=lines[i].match(/^@([^\s]*?)\s+(.*)/);var key=tmp[1];var value=tmp[2];if(headers[key]&&!(headers[key]instanceof Array))headers[key]=new Array(headers[key]);if(headers[key]instanceof Array)headers[key].push(value);else headers[key]=value}}return headers}function showNotice(){if(meta.name&&meta.version){var s="#ScriptUpdater-"+scriptId+"-";addStyle(s+"Mask{position:fixed;width:100%;top:0;left:0;height:100%;background-color:#000;opacity:.7;z-index:9000}"+s+"BodyWrapper{position:absolute;width:100%;top:0;left:0;z-index:9010;max-width:auto;min-width:auto;max-height:auto;min-height:auto}"+ s+"Body *{border:none;font-size:12px;color:#333;font-weight:normal;margin:0;padding:0;background:none;text-decoration:none;font-family:sans-serif}"+s+"Body{width:500px;margin:auto;top:125px;position:fixed;left:35%;text-align:left;background:#f9f9f9;border:1px outset #333;padding:0;font-family:sans-serif;font-size:14px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;cursor:default;z-index:9010;color:#333;padding-bottom:1em}"+s+"Body a{margin:0 .5em;text-decoration:underline;color:#009;font-weight:bold}"+ s+"Body strong{font-weight:bold}"+s+"Body h1{font-size:13px;font-weight:bold;padding:.5em;border-bottom:1px solid #333;background-color:#999;margin-bottom:.75em}"+s+"Body h2{font-weight:bold;margin:.5em 1em}"+s+"Body h1 img{margin-top:2px;vertical-align:middle}"+s+"Body h1 a{font-size:17px;font-weight:bold;color:#fff;text-decoration:none;cursor:help;vertical-align:middle}"+s+"Body h1 a:hover{text-decoration:underline}"+s+"Body table{width:auto;margin:0 1em}"+s+"Body table tr th{padding-left:2em;text-align:right;padding-right:.5em;line-height:2em}"+ s+"Body table tr td{line-height:2em;font-weight:bold}"+s+"Body p{font-size:12px;font-weight:normal;margin:1em}"+s+"CloseButton{background-image:url("+icons.close+")!important}"+s+"InstallButton{background-image:url("+icons.install+")!important}"+s+"History{margin:0 1em 1em 1em;max-height:150px;overflow-y:auto;border:1px inset #999;padding:0 1em 1em;width:448px}"+s+"History ul{margin-left:2em}"+s+"Close{float:right;cursor:pointer;height:14px}"+s+"Footer{margin:.75em 1em}"+s+"Footer input{border:1px outset #666;padding:3px 5px 5px 22px;background:no-repeat 4px center #eee;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;cursor:pointer;float:right;margin-left:.5em}"+ s+"Footer input:hover{background-color:#f9f9f9}"+s+"Footer select{border:1px inset #666}");var noticeBg=doc.createElement("div");noticeBg.id="ScriptUpdater-"+scriptId+"-Mask";doc.body.appendChild(noticeBg);var noticeWrapper=doc.createElement("div");noticeWrapper.id="ScriptUpdater-"+scriptId+"-BodyWrapper";var html=new Array;var notice=doc.createElement("div");notice.id="ScriptUpdater-"+scriptId+"-Body";html.push('<h1><img id="ScriptUpdater-'+scriptId+'-Close" src="');html.push(icons.close);html.push('" title="Close"/><img id="ScriptUpdater-'+ scriptId+'-USO" src="');html.push(icons.uso);html.push('"/><a href="http://userscripts.org/scripts/show/57756" target="_blank" title="About Userscripts.org Script Updater v');html.push(_version);html.push('">Userscripts.org Updater</a></h1>');if(!forceNoticeEnabled){html.push('<p>There is a new version of <strong><a href="http://userscripts.org/scripts/show/');html.push(scriptId);html.push('" target="_blank" title="Go to script page">');html.push(meta.name);html.push("</a> </strong> available for installation.</p>")}else{html.push('<p><strong><a href="http://userscripts.org/scripts/show/'); html.push(scriptId);html.push('" target="_blank" title="Go to script page" style="margin:0; padding:0;">');html.push(meta.name);html.push("</a> </strong></p>")}if(scriptCurrentVersion){html.push("<p>You currently have version <strong>");html.push(scriptCurrentVersion);html.push("</strong> installed. The latest version is <strong>");html.push(meta.version);html.push("</strong></p>")}if(meta.history){html.push('<h2>Version History:</h2><div id="ScriptUpdater-'+scriptId+'-History">');var history=new Array; var version,desc;if(typeof meta.history!="string")for(var i=0;i<meta.history.length;i++){var tmp=meta.history[i].match(/(\S+)\s+(.*)$/);version=tmp[1];change=tmp[2];history[version]=typeof history[version]=="undefined"?new Array:history[version];history[version].push(change)}else{var tmp=meta.history.match(/(\S+)\s+(.*)$/);version=tmp[1];change=tmp[2];history[version]=typeof history[version]=="undefined"?new Array:history[version];history[version].push(change)}for(var v in history){html.push('<div style="margin-top:.75em;"><strong>v'+ v+"</strong></div><ul>");for(var i=0;i<history[v].length;i++)html.push("<li>"+history[v][i]+"</li>");html.push("</ul>")}html.push("</div>")}html.push('<div id="ScriptUpdater-'+scriptId+'-Footer">');html.push('<input type="button" id="ScriptUpdater-'+scriptId+'-CloseButton" value="Close"/>');html.push('<input type="button" id="ScriptUpdater-'+scriptId+'-InstallButton" value="Install"/>');html.push("Check for updates every ");html.push('<select id="ScriptUpdater-'+scriptId+'-Interval"><option value="3600000"> Hour </option><option value="21600000"> 6 Hours </option><option value="43200000"> 12 Hours </option><option value="86400000"> Day </option><option value="259200000"> 3 Days </option><option value="604800000"> Week </option><option value="0">Never</option></select>'); html.push("</div>");notice.innerHTML=html.join("");noticeWrapper.appendChild(notice);doc.body.appendChild(noticeWrapper);$("ScriptUpdater-"+scriptId+"-Close").addEventListener("click",closeNotice,true);$("ScriptUpdater-"+scriptId+"-CloseButton").addEventListener("click",closeNotice,true);$("ScriptUpdater-"+scriptId+"-InstallButton").addEventListener("click",function(){setTimeout(closeNotice,500);doc.location=typeof installUrl=="string"?installUrl:"http://userscripts.org/scripts/source/"+scriptId+ ".user.js"},true);window.addEventListener("keyup",keyUpHandler,true);var selector=$("ScriptUpdater-"+scriptId+"-Interval");for(var i=0;i<selector.options.length;i++)if(selector.options[i].value.toString()==interval.toString())selector.options[i].selected=true;selector.addEventListener("change",function(){interval=this.value;setVal("interval",parseInt(interval))},true);noticeWrapper.style.height=doc.documentElement.clientHeight+"px";$("ScriptUpdater-"+scriptId+"-Mask").style.height=window.scrollMaxY+ window.innerHeight+"px"}}function closeNotice(){doc.body.removeChild($("ScriptUpdater-"+scriptId+"-BodyWrapper"));doc.body.removeChild($("ScriptUpdater-"+scriptId+"-Mask"));window.removeEventListener("keyup",keyUpHandler,true)}function keyUpHandler(e){if(e.keyCode==27)closeNotice()}function addStyle(css){var head=doc.getElementsByTagName("head")[0];if(!head)return;var style=doc.createElement("style");style.type="text/css";style.appendChild(doc.createTextNode(css));head.appendChild(style)}function getVal(key, defValue){if(isGM)return eval(GM_getValue("ScriptUpdater."+key,"({})"));else{key="ScriptUpdater."+scriptId+"."+key;var value=localStorage.getItem(key);if(value==null)return defValue;else switch(value.substr(0,2)){case "S]":return value.substr(2);case "N]":return parseInt(value.substr(2));case "B]":return value.substr(2)=="true";case "A]":return value.substr(2).split(",")}return value}}function setVal(key,value){if(isGM)GM_setValue("ScriptUpdater."+key,uneval(value));else{key="ScriptUpdater."+scriptId+ "."+key;switch(typeof value){case "string":localStorage.setItem(key,"S]"+value);break;case "number":if(value.toString().indexOf(".")<0)localStorage.setItem(key,"N]"+value);break;case "boolean":localStorage.setItem(key,"B]"+value);break;case "object":localStorage.setItem(key,"A]"+value.join(","));break}}}function alreadyOffered(version){var offers=getOffers();if(offers.length==0){addOffer(version);return true}else for(var i=0;i<offers.length;i++)if(version.toString()==offers[i].toString())return true; return false}function getOffers(){var offers=getVal("versionsOffered");return typeof offers=="undefined"||typeof offers.length=="undefined"||typeof offers.push=="undefined"?new Array:offers}function addOffer(version){var offers=getOffers();offers.push(version);setVal("versionsOffered",offers)}function getInterval(){var val=getVal("interval");return typeof val=="undefined"||!val.toString().match(/^\d+$/)?864E5:parseInt(val.toString())}function getLastCheck(){var val=getVal("lastCheck");return typeof val== "undefined"||!val.toString().match(/^\d+$/)?0:parseInt(val.toString())}var icons={install:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKCSURBVHjaYjTL3lPIwMAgD8Q2QKwExDwMDP9ZgDQjw38GMGBmYmRgAuL///8x/PvH8IGNleHO95+/O09N81wDEEAghVqzS61SQOrVpdnBev7/+8/w6w8Q//4H1szJzsTAyMjA8OX7P4YvP/7y33v+xWDhzrszzLK28QMEEBNQvS1I1/pTnxiA+oC2/GfIm3waaBOQA9TFygKxHWTgd6CBf/4xMP5lYGKJd1cW5mRnmwoQQCADJEC2gjT8Bsr+/gNx928gn4WZAWwASO77L6gc0IIDlz8zsLEyM3z/+YcNIIBAXuD68w/scLAiEGACufc/SDPQ6UD4A2jz95//gS78D3YliH729gfIMEaAAGIBBdhfoAAQMfyE2l6bYADWDEQMv//+Z/j2E+R0cAACzQXCfyDX/AUHKkAAgUP7318GsNOaF5wHehvoZ0aY7QwMINf9AXoNGiFgICAgBDSAGawHIIBYGMBOApn+l0FMXBoUGZD4A+uAOhlo4///UC+AnAG05PfvP6DoYgAIIJALGP7+BRsGBoxwBgPEyf8h4QOh/oPlQU7//RuSLgACCGzAn7//GKBWgv0ICjgGsEKIf8H+Btv+F5xGgCyGn7//g10AEECgQGT4+w/i5LpIGQZiQOnsq8BwgbgEIIBYQFH2Fxa6QEMmHkvBqznPcjbQy3/ACQukASCAWCB+/Q8OcRCwkokl6IJ/QBv//gYnPwaAAGIB+u0/0AuMsDA49mQxXs0msnZAF/wFpw+QXoAAYgFa/uDXn3+Kxspc4AxTYD2HoAvEeYEu+Au28D1AADGaZe3qBxqkBnSBJdBIQZCzwFH3/x84kJBpWMxAIv3/ZwZGpssAAQYAIXxui1/HoMEAAAAASUVORK5CYII%3D", close:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII%3D", uso:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKwSURBVHjabJNJTBNRGID/mc5MQYVWVNCGTbEtNZGDBj1ogolEMR5UJA2LBmMoIokxERIj8ehJjx6MYIQoJgq4JIa6gEARkKJFTa2iFFtKWwp2oeDCzNQ+31DQCc5L/nmT/P/3749ACAFBECBxiEPFFds0Ws399DRVhtX2udc97ig0PmgOLBkIbOwjAR8uMRRdvXF7pqv/NfrqnEAOlxsdLas6j3Wk2AEpCRcbKvLydrdu1WUr0lXrITEhAZKUSkhQKvKwXiY2ppbDRzCcv29P/ZZsDaSqUkCJYVJGwKMnHTDlmWgTZ/CvjkW4sKTScP1WC+oZsKAxpwv5gyEUnAkj2xc70p88Y8Y2a8VBxT0gispOGa413UVDb23IMe6OwaEw+jTqQKMOF3pptqBSw7k74hLEPaDUOu0VmpFDV58ZCJIAkiDB5fUBz0eApmjQqbOgrqa69HhVbZO4jKUfmiBJBctysHJFPPiDYbA7J4DjeJDLaWAYGVAyErIy0uDs6RPH9OXVtULWYgfEmN3emJK8BlYrEsHl8cEvloX4ODnEyRlgKGZhV1iOhcz0VNixM7dOCCp2EBkeMF3u6DaNqDasg1U4CzlFxxSRKMyz8xjmsPAQwNmRsc2jxGPkR0esHp7n9RBFrYbyUi1DUzh1GujFG0UBQrNz8P7DR3j+9NklqTEK3VVkbNLkVNZc9AwNW5Hb60PT/gCamg6gEbsT3XvYjvIP6i9gu2ShhOWb+BvLD13O9o3azWrVdy4K3wKhv5HfWW1Q39BY19nechPbzQrVwX9bhU+iIqnyQMF+mPvJQr/FCsHwDJgG30ADhl8Y2wQ4jIUVkpdaZRnPcd6AfxomJ32AIhEwdvaC8XG7JLwwvmXPmVFn52Tu2lvQjN9Crn3M6bWY+6otr3oGpWCB/SPAAJaJRguGUxB0AAAAAElFTkSuQmCC"}; return{setDoc:function(docEl){docElement=docEl},setjsURL:function(url){if(url!="undefined"&&typeof url=="string")jsURL=url},check:function(scriptId,currentVersion,callback){initVars(scriptId,currentVersion,callback,true,false);var d=new Date;if(interval>0&&d.getTime()-lastCheck>interval)checkRemoteScript()},forceCheck:function(scriptId,currentVersion,callback){initVars(scriptId,currentVersion,callback,true,false);checkRemoteScript()},getLatestVersion:function(scriptId,callback){if(typeof callback!= "function")alert("ScriptUpdater error:\n\n scriptUpdater.getLatestVersion() requires a callback function as the second argument");initVars(scriptId,callback,false,false,false);checkRemoteScript()},forceNotice:function(scriptId,currentVersion,callback){initVars(scriptId,currentVersion,callback,true,true);checkRemoteScript()},checkStored:function(){if(typeof scriptId!="undefined"&&typeof scriptCurrentVersion!="undefined")return typeof getVal("versionAvailable")!="undefined"&&scriptCurrentVersion.toString()!= getVal("versionAvailable").toString();else return false}}}();

// --------------- END EMBEDED SCRIPTS ---------------- //

// ----------------- HELPER FUNCTIONS ----------------- //

// Test for Greasemonkey API & adapt accordingly
function testGM() {
    const LOG_PREFIX = 'Gmail Notifier: ';
    const LOG = true;
    const DEBUG = true;
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

// Function to create an Element
function $c(type,props) {
    var node = document.createElement(type);
    if(props && typeof props == 'object') { for(prop in props) if(prop) node[prop] = props[prop]; }
    return node;
}

// Waits for a given set of Elements to load. Takes a callback as argument which is called if all the elements are found.
// mode == 0 : callback only if all the elements are found. (DEFAULT)
// mode == 1 : callback even if none of the elements are found.
// mode == 2 : callback immed if any single element is found.
function $W(Q,callback,mode,t) {
    t = t || 1; mode = mode || 0;
    var arr = Q instanceof Array;
    var l = arr ? Q.length : 1;
    var matches = []; //checkiFrame();
    for(var i = 0; i < l; i++) {
        var O = arr ? Q[i] : Q;
        var q = O.q || O, r = (O.r ? gmail : doc), s = O.s, c = O.c;
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

// Check & restore reference to canvas_frame
function checkiFrame() {
    if(gmail && gmail.URL == 'about:blank') {
        debug('Lost canvas_frame...');
        gmail = $('#canvas_frame').contentDocument || 'undefined';
    }
}

// --------------- END HELPER FUNCTIONS --------------- //


//$W({q:'#canvas_frame',t:10,i:100,r:document,s:true,n:'Finding canvas frame...',f:'Unable to find canvas frame, proceeding with styling.'},init,2);

//alert('attaching init');

window.onload =  function () {
    gmail = document;
    doc = document;
    log('Starting Gmail notifier.');
    new GmailNotifier();
}

function GmailNotifier() {
    var self = this;
    this.construct = function() {
        this.mailAlert = null;
        this.chatAlert = null;
        this.digitsCanvas = [];
        this.flashing = false;
        this.icon = null;
        this.href = priorityInbox ? '#mbox' : '#inbox';
        this.icons = {
            old        : '',
            red        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuM6DpWdUAAAJ+SURBVDhPxZNbSNNRHMf/9hKVBCmRVhL4kjV9qUybJVYmSHtR0AcjV5EpudJI7ALl6aJkRRRRVFAQKBIihHlJhV1Mc5fczeWmMzc3nWtzc9Nt2eb8dv6Lgmjv/uAD5xx+v8/5/eAchln10NfVEu2t60R3t45ygxg+dhNDV8f/9PYQTeMdoqjgE2kxj/Tn7CXS/EOEmbxZAxOphfn2NZjqajD14jFcbjdcXu9vPB64Fn2wq77AKDiN0RIeNEf2QZ6SAMXBNDDfrl7AxOUKmMkVjAtOwXCmCMZLZQjMTCMUCkXwqhTQlxZAV5ALVc4eaPK46N+0BkMHOGCM1WdhKC3EvLAH9revoM7LgPpoOkZ42VhUKrAwLIfm2H5octMxnLET7p4OGGuqIYxlMMgKDOdKoD2eDVd7G9iYffMc0uQ4yHclQL57KxRpSZClbKHrbfCI+7BCc/RVAvRuYPCJFYzyC6GiszhbmyMCNsHe0oyB+I2UGAzExeBzUiK8siGEw2EEl5cxUlWJbiqQ/BVkpcLR2kSLVxD4sQSnYw7TLe8wkLgZQ8k7YBNJ4FpYQCAQQCgiEKDrj0BXnA956nbYm15jKRjErNkCh1KL0NJPeFRK+CYmEPT5MavWwTZjg8cfgPpiJTqpQMx2oMnPwmD8Wky+fAYbLXZPmuCnN/l8vn/x+2HTj8FksUJ2vhztVCBiBUo6v4huvjbUY37OFXkDTqczKg6HA1brNCT8k3hPa4SsQMHloG8dA+3TJzBRgdFqxbjFEhWDeQpj9u8Ql5ehbT3tIJMKpFwO6YxliOhEERl89IBIGhuI+F59VET0XPTwPvlwOIu00RphJoes+l9kfgG6RyCF5c9QFQAAAABJRU5ErkJggg==',
            blue    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4zoOlZ1QAAAodJREFUOE/Fk0lMk1EUhZ9u3LkwMeIUly5+2aggg+CGhQMGJUJBICKooKJxIEyJ8gyBRIwRq4CCulGCmyYqIAKRFmgFWoUWSlsp8Bc6UP7SUrCttQWOD9iYyJ6bfLtzzz15OY+QDZ8CsZ6WVA/R0notvVerpa09Btos+582uYGW1WvohVIVjb/TRw9ldNOYK32U5D+bQMFzHsW1JuSLeVQ1TsLlcmJ+bg03w7PgxHetHRfLjYi/q8PhLA1C4pUITVOB3Hg8jtyHYyisMSGzbBRJJQZcrjDCIvgQDAZXUenmcbZQj7ibWhzMHERUrgabY7rBpfaCXGLixGID2vrnUPfRjiPZaoRlqRF7dRgq/S8odQsIZxfDGPtFP9CscOFWtREkphNcigLk/H0DYq8NQdLlxMrUSKax7XgfQk4pseu0EnvPqLDjZD92JyjRoXQzxTLyxHqQo+3gRD0giUU6hKYPoqHdsWqwImj4asfWBDk2RTGi5dgp+obekXksLS1hMRjA9SfDINGtzKBrzeBA2iDefRHY7jL8fh+EWQGNMgu2n5NjX3ovpGobFtxO+Hw+LC4GkVe1YvB5zeDEbS32sHivm+wI/PHDZJ3GwLgAfyCIgVE3xqweeH4HoB6fhtVmg8/rZgnUIFEt4JJlzChHgy1xClRLJmCy2DBhdbFLXng8bPEfvF4P9LwN5ikeOZX9IJGfmIEUJDR9ACRWivK3I5h1za12wOFwrIsgCDBbzMh4wKJHfACX1AnCpbIyHOvA0/dDcM7wMJuMmOJH12WSN2DG8pP1hEWPkLA3YAm4FFbHyBaaVCSlj94oaEVdFy1/KVufF1Ja+UpKo7ObKAmXUC65k274XyR/ASa1LtZKPQZmAAAAAElFTkSuQmCC',
            chat    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAidJREFUeNqkU79rE3EUf5de7MU29O5ASMRCLzj0eyRogpns4mGXDEVwMbXBIVtTp7rVv0CyVopk1bFbswgnJHCRFhIkkFuEKxT5hqQh11rNSy/xOUWCNhjog8/w4H3ez88TiAiuY+K4k0gmQoqiZLUlzQiFQpoSVBRERN7mXd7kNc75e0Q0q0dVHHGEUQeJeGKHxdjrbCb7U2e6JMuyH0TwwQCIn/KhXbcvrSMrWPlcsTnnW416wwQAACICFmWF/Js8tdttz/M8uhI9jw4rh7T3du9iPb1ObJltExGIOtOzxqqR3dzaBAAQPc+bOG/0XhRardac8di4dF03rzPd9oEI2cyzDHqeB9Mg+SAJ593zGysPV37gALdFSZSYqqj+fr8/1dYFvwA+vw/UoCpJopQQcYDdZqc5FwgGZqbKMABwz1xQhsovAOiKiFgsfSrlwunwVHznqwOICK1eyw8A+zPh2+Fq/Uv9qXpLVRbvLMJwOJyITqcD5VKZFtQFoXhQrEjz0guBiEBnuoYDLMRjccNYNSAgBfpsmc2OquIFDp1jp9/D3s1avQbOsbPb+957ZVUsFMalHNEiBoiQkkQptfZkLWI8MmZPvp2AXbddRKzyU25yzj9YZcv5QyKif6Dd1Qob6Y2zwrsCxe/Hq7mXOfmqOCIC4e9n0mN6StO0A21JA/Ojacqy/NyqWM2JZx1PoMf0UNftmsq8wgFgt2E39v+ri+u+8+8BAA1bZjXByvQDAAAAAElFTkSuQmCC',
            blank    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAEklEQVQ4jWNgGAWjYBSMAggAAAQQAAF/TXiOAAAAAElFTkSuQmCC'
        };
        this.fonts = {
            square : [
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,2,1,1,2,1],
                    [1,2,1,1,2,1],
                    [1,2,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,1,1]
                ],
                [
                    [1,1,1,1,0],
                    [1,2,2,1,0],
                    [1,1,2,1,0],
                    [0,1,2,1,0],
                    [1,1,2,1,1],
                    [1,2,2,2,1],
                    [1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,2,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,1,1,2,1],
                    [1,2,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,2,1],
                    [0,0,0,1,2,1],
                    [0,0,0,1,1,1]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,2,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,2,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,2,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,2,1],
                    [0,0,0,1,2,1],
                    [0,0,0,1,2,1],
                    [0,0,0,1,2,1],
                    [0,0,0,1,1,1]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,2,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,2,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,2,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,2,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,1,1]
                ]
            ],
            smooth : [
                [
                    [0,1,1,1,1,0],
                    [1,1,2,2,1,1],
                    [1,2,1,1,2,1],
                    [1,2,1,1,2,1],
                    [1,2,1,1,2,1],
                    [1,1,2,2,1,1],
                    [0,1,1,1,1,0]
                ],
                [
                    [0,1,1,1,0],
                    [1,1,2,1,0],
                    [1,2,2,1,0],
                    [1,1,2,1,0],
                    [1,1,2,1,1],
                    [1,2,2,2,1],
                    [1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,1,1],
                    [1,1,1,1,2,1],
                    [1,1,2,2,1,1],
                    [1,2,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1,0],
                    [1,2,2,2,1,1],
                    [1,1,1,1,2,1],
                    [0,1,2,2,1,1],
                    [1,1,1,1,2,1],
                    [1,2,2,2,1,1],
                    [1,1,1,1,1,0]
                ],
                [
                    [0,0,1,1,1,0],
                    [0,1,1,2,1,0],
                    [1,1,2,2,1,0],
                    [1,2,1,2,1,1],
                    [1,2,2,2,2,1],
                    [1,1,1,2,1,1],
                    [0,0,1,1,1,0]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,2,1,1,1,1],
                    [1,2,2,2,1,1],
                    [1,1,1,1,2,1],
                    [1,2,2,2,1,1],
                    [1,1,1,1,1,0]
                ],
                [
                    [0,1,1,1,1,1],
                    [1,1,2,2,2,1],
                    [1,2,1,1,1,1],
                    [1,2,2,2,1,1],
                    [1,2,1,1,2,1],
                    [1,1,2,2,1,1],
                    [0,1,1,1,1,0]
                ],
                [
                    [1,1,1,1,1,1],
                    [1,2,2,2,2,1],
                    [1,1,1,1,2,1],
                    [0,1,1,2,1,1],
                    [0,1,2,1,1,0],
                    [0,1,2,1,0,0],
                    [0,1,1,1,0,0]
                ],
                [
                    [0,1,1,1,1,0],
                    [1,1,2,2,1,1],
                    [1,2,1,1,2,1],
                    [1,1,2,2,1,1],
                    [1,2,1,1,2,1],
                    [1,1,2,2,1,1],
                    [0,1,1,1,1,0]
                ],
                [
                    [0,1,1,1,1,0],
                    [1,1,2,2,1,1],
                    [1,2,1,1,2,1],
                    [1,1,2,2,2,1],
                    [0,1,1,1,2,1],
                    [0,1,2,2,1,1],
                    [0,1,1,1,1,0]
                ]
            ],
            slim : [
                [
                    [1,1,1,1,1],
                    [1,2,2,2,1],
                    [1,2,1,2,1],
                    [1,2,1,2,1],
                    [1,2,1,2,1],
                    [1,2,2,2,1],
                    [1,1,1,1,1]
                ],
                [
                    [1,1,1,1,0],
                    [1,2,2,1,0],
                    [1,1,2,1,0],
                    [0,1,2,1,0],
                    [1,1,2,1,1],
                    [1,2,2,2,1],
                    [1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1],
                    [1,2,2,2,1],
                    [1,1,1,2,1],
                    [1,2,2,2,1],
                    [1,2,1,1,1],
                    [1,2,2,2,1],
                    [1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1],
                    [1,2,2,2,1],
                    [1,1,1,2,1],
                    [1,2,2,2,1],
                    [1,1,1,2,1],
                    [1,2,2,2,1],
                    [1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1],
                    [1,2,1,2,1],
                    [1,2,1,2,1],
                    [1,2,2,2,1],
                    [1,1,1,2,1],
                    [0,0,1,2,1],
                    [0,0,1,1,1]
                ],
                [
                    [1,1,1,1,1],
                    [1,2,2,2,1],
                    [1,2,1,1,1],
                    [1,2,2,2,1],
                    [1,1,1,2,1],
                    [1,2,2,2,1],
                    [1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1],
                    [1,2,2,2,1],
                    [1,2,1,1,1],
                    [1,2,2,2,1],
                    [1,2,1,2,1],
                    [1,2,2,2,1],
                    [1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1],
                    [1,2,2,2,1],
                    [1,1,1,2,1],
                    [0,0,1,2,1],
                    [0,0,1,2,1],
                    [0,0,1,2,1],
                    [0,0,1,1,1]
                ],
                [
                    [1,1,1,1,1],
                    [1,2,2,2,1],
                    [1,2,1,2,1],
                    [1,2,2,2,1],
                    [1,2,1,2,1],
                    [1,2,2,2,1],
                    [1,1,1,1,1]
                ],
                [
                    [1,1,1,1,1],
                    [1,2,2,2,1],
                    [1,2,1,2,1],
                    [1,2,2,2,1],
                    [1,1,1,2,1],
                    [1,2,2,2,1],
                    [1,1,1,1,1]
                ]
            ]
        };
        this.audio = {
            mail : 'data:video/ogg;base64,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',
            chat : 'data:video/ogg;base64,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'
        }
       
        // Mail Alerts
        $W({q:'//div[contains(@class,"TN")]//a[contains(@href,"#inbox")]',r:gmail,s:true,t:20,n:'Mail Alerts retry hook',f:'Unable to start Mail Alerts.'},self.waitforInbox);
       
        // Chat Alerts
        $W([//{q:'.pt',r:gmail,s:true,t:20,n:'Chat Alerts retry hook',f:'Unable to start Chat Alerts.'},
            //{q:'.vy',r:gmail,s:true,t:20,n:'Chat Alerts retry hook',f:'Unable to start Chat Alerts.'},
            //{q:'.vz',r:gmail,s:true,t:20,n:'Chat Alerts retry hook',f:'Unable to start Chat Alerts.'}],
            {q:'.vB',r:gmail,s:true,t:20,n:'Chat Alerts retry hook',f:'Unable to start Chat Alerts.'}],self.waitforChat,2);
       
        // Update Check [Uses PhasmaExMachina's Script Updater]
        ScriptUpdater.setDoc(gmail);
        ScriptUpdater.setjsURL('http://dl.dropbox.com/u/19875602/gm/86361.metax.js');
        ScriptUpdater.check(scriptID, version);
    }

    this.waitforInbox = function(match) {
        var inbox = match;
        var inbox_parent = inbox.parentNode;
       
        while(inbox_parent.className != 'TK')
            inbox_parent = inbox_parent.parentNode;
       
        self.unread = self.newUnread = inbox.textContent.replace(',','').match(/\d+/) || 0;
        inbox_parent.addEventListener('DOMNodeInserted',checkInbox,false);

        if(soundAlerts.mail && !self.mailAlert) {
            self.mailAlert = $c('audio',{id:'mailAlert',src:self.audio.mail});
            document.body.appendChild(self.mailAlert);
        }

        self.drawCanvas(self.unread);
        log('Mail Alerts started.');

        function checkInbox(e) {
            var src = e.target;
            // Exit if it's not the inbox we're interested in.
            if(src.innerHTML.indexOf('#inbox') == -1)
                return;
           
            if(!self.flashing) {
                inbox = $('a',src,1);
                self.newUnread = inbox.textContent.replace(',','').match(/\d+/) ? parseInt(inbox.textContent.replace(',','').match(/\d+/)) : 0;
                if(self.newUnread > self.unread && soundAlerts.mail)
                    self.mailAlert.play();
                if(self.newUnread != self.unread && (self.newUnread < 1000 || self.unread < 1000 ))
                    self.drawCanvas(self.newUnread);
                self.unread = self.newUnread;
            }
            else
                window.setTimeout(function(){ checkInbox(e); },500);
        }
    }

    this.drawCanvas = function(num) {
        if(num > 999)
            num = 999;
       
        if(!self.baseCanvas) {
            self.createBaseCanvas(num, self.drawCanvas);
            return;
        }
       
        if(num != 0) {
            var unreadIconCanvas = $c('canvas',{height:16,width:16});
            var ctx = unreadIconCanvas.getContext('2d');
            ctx.drawImage(self.baseCanvas,0,-1);
            var num = num.toString();
            var x = 0;
            for(var i = num.length-1; i >= 0; i--) {
                var digitCanvas = self.getDigitCanvas(num[i]);
                x += digitCanvas.width;
                ctx.drawImage(digitCanvas,self.baseCanvas.width-x,self.baseCanvas.height-digitCanvas.height-1);
                --x;
            }
            if(num > self.unread)
                self.flashIcon(flashM, unreadIconCanvas.toDataURL('image/png'));
            else
                self.setIcon(unreadIconCanvas.toDataURL('image/png'));
        }
        else
            self.setIcon(self.baseCanvas.toDataURL('image/png'));
    }

    this.createBaseCanvas = function(num, callback) {
        var img = new Image();
        this.baseCanvas = $c('canvas',{height:16,width:16});
        img.addEventListener('load',function() {
                                        self.baseCanvas.getContext('2d').drawImage(img,0,0);
                                        callback(num);
                                    }, false);
        img.src = window.location.href.toLowerCase().match(/mail\.google\.com\/a\//) ? self.icons.blue : self.icons.red;
    }

    this.getDigitCanvas = function(n) {
        if(!self.digitsCanvas[n]) {
            var num = self.fonts[fontType][n];
            var digitCanvas = $c('canvas',{height:num.length,width:num[0].length});
            var ctx = digitCanvas.getContext('2d');
            for(var i = 0; i < num.length; i++) {
                for(var j = 0; j < num[i].length; j++) {
                    if(num[i][j] == 0) continue;
                    ctx.fillStyle = fontColor[num[i][j]-1];
                    ctx.fillRect(j,i,1,1);
                }
            }
            self.digitsCanvas[n] = digitCanvas;
        }
        return self.digitsCanvas[n];
    }

    this.waitforChat = function(match) {
        var chat = match.parentNode;
        chat.addEventListener('DOMSubtreeModified', checkChat, false);

        if(soundAlerts.chat && !self.chatAlert) {
            self.chatAlert = $c('audio',{id:'chatAlert',src:self.audio.chat});
            document.body.appendChild(self.chatAlert);
        }

        log('Chat Alerts started.');
       
        function checkChat(e) {
            var cN = e.target.className;
           
            // This means there are unread chat messages, so we need to notify the user through the favicon & audio.
            if(cN == 'vC vE') {
                if(soundAlerts.chat)
                    self.chatAlert.play();
               
                if(!self.flashing) {
                    self.icons.old = $('#notifier').href;
                    if(self.icons.old != self.icons.chat)
                        self.flashIcon(flashC, self.icons.chat);
                    else
                        self.flashIcon(flashC);
                }
                else
                    window.setTimeout(function(evt) { checkChat(evt); }, 1000, e);
            }
           
            // This means the user has read the chat message, so we need to revert back to the mail icon.
            if(cN == 'vC ')
                self.drawCanvas(self.newUnread);
        }
    }

    this.setIcon = function(icon) {
        var head = $('head')[0];
        if(!self.icon) {
            var links = $('link',head);
            var i = 0;
            while(i < links.length) {
                if(links[i].href == icon)
                    return;
                else if(links[i].rel == 'shortcut icon' || links[i].rel=='icon')
                    links[i].parentNode.removeChild(links[i--]);
                i++;
            }
            self.icon = $c('link',{id:'notifier',type:'image/png',rel:'shortcut icon',href:icon});
            head.appendChild(self.icon);
        }
        else {
            head.removeChild(self.icon);
            self.icon.href = icon;
            head.appendChild(self.icon);
        }
    }

    this.flashIcon = function(n, icon) {
        var currentIcon = icon || $('#notifier').href;
        var a = n;
        self.flashing = true;
        while(n--) {
            window.setTimeout(function() {
                                self.setIcon(self.icons.blank);
                            }, (((a-n)*2)-1)*500);
           
            window.setTimeout(function(x) {
                                self.setIcon(currentIcon);
                                if(x == 0)
                                    self.flashing = false;
                            }, (((a-n)*2)-1)*500 + 500,n);
        }
    }

    return this.construct();
}

})(); 