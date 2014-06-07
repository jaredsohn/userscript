// ==UserScript==
// @name           YouTube Video Detacher
// @namespace      http://h3xploit.com
// @description    Detaches video and places it in a moveable window.
// @include        http://*.youtube.com/watch?v=*
// ==/UserScript==

// Updater
var version_scriptNum = 42343; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1238641226106; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/source/" + version_scriptNum +".user.js");GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);

// Values, set via setvals() function.
var c1 = (GM_getValue("c1","0000000"));
var c2 = (GM_getValue("c2","0000000"));
var ap= (GM_getValue("ap","1"));

GM_registerMenuCommand("YouTube Video Detacher - Set up player",function setvals(force){var sc1=prompt("Please enter in hex color without # for Player Color 1",c1);var sc2=prompt("Please enter in hex color without # for Player Color 2",c2);var sap=prompt("Want auto play for window? 1 = Yes, 0 = No",ap);GM_setValue("c1",sc1);GM_setValue("c2",sc2);GM_setValue("ap",sap);location.reload(true);});

// Grabbing Video Id
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
};

var ytvidid
ytvidid = gup( 'v' );

// Creating DIVs
var dive = document.createElement('div');
dive.setAttribute("id","aggregationServicesDiv");
var cont = document.getElementById('watch-views');


//Enableing API in embeded video


//Createing Detach Link			 
var link = document.createElement('a');
link.href= "javascript:player.pauseVideo()"
link.setAttribute("onclick", 'javascript: window.open(' +
'"http://h3xploit.com/youtube/external/?v=' + ytvidid + '&c1=' + c1 + '&c2=' + c2 + '&ct="+ player.getCurrentTime() +"&ap=' + ap + '",' +
'"windowName",'+
'"width=425,height=355,scrollbars=no,menubar=no")');
link.innerHTML= "<img src='data:image/gif;base64,R0lGODlhCwALAKIEALW679LS/P///3d3zP///wAAAAAAAAAAACH5BAEAAAQALAAAAAALAAsAAAMnSATTPkCNIGoNsNUnGrbY0ImigH2aeHYjO1ntC4fm4zDUPCiMDSkJADs%3D' border='0'></a> Popout";
cont.innerHTML= cont.innerHTML + "  |   ";
// Attaching link to div

cont.appendChild(link);
 
 function YTVD(){var swfArgs = {"enablejsapi":1};
 var $=_gel;
window.player=$("movie_player");}
 document.body.appendChild(document.createElement("script")).innerHTML="("+YTVD+")()";