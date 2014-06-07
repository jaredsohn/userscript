// ElectroFox Designs (Max Smiley)
// http://www.efoxdesigns.com
// GPL
//Please send any bugs to support@efoxdesigns.com    Enjoy!
var update = 2;

// ==UserScript==
// @name           Screen Userscripts
// @namespace      http://*
// @description    Screens greasemonkey userscripts to make sure they don't steal cookies.  You can make sure this script is valid by checking the md5 sum listed at: http://userscripts.org/scripts/show/11388
// ==/UserScript==

//#EDIT THIS ONLY
var autoScan = true; //true = automatically scan all userscript links.  false = ask before scanning.   will only ask on pages with userscript links.
var threshold = 5;   //if autoScan is true, you can set threshold, which is the number of userscript links a page contains before Screen Userscripts asks whether or not to scan.
                     //set threshold to -1 to scan any number of userscript links.  (set to 0, Screen Userscripts will always ask)
					 //  *performance note: see http://userscripts.org/scripts/show/11388
var checkForUpdate = true;  //(If set to true) when you visit userscripts.org, Screen Userscripts will notify you if it has been updated.
//#END EDIT   That's all.   You're done. :)

//--------  DO NOT EDIT BELOW THIS POINT!  -------//
var phrases = new Array(); var scriptName, scriptSource, sourceLinks, getSource, scanDoc;
var alertText = "The following userscripts are most likely malicious:\n\n"; var alert_text = alertText;
//BEGIN Malicious phrase declaration
phrases[0] = "encodeURIComponent(document" + ".cookie)"; phrases[1] = ".php?" + "cookie=";
//END Malicious phrase declaration
sourceLinks = document.evaluate("//a[@href[contains(.,'user.js')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var cLocation = location.toString(); if (threshold < 0) threshold = (sourceLinks.snapshotLength + 1);
//if just updated:
if (!GM_getValue('version')) { GM_setValue('version', update); GM_setValue('ignore_update', false); GM_setValue('update_confirmed', false); alert("" + update);}
else if (GM_getValue('version') < update) { GM_setValue('version', update); GM_setValue('ignore_update', false); GM_setValue('update_confirmed', false);}
//reset
//GM_setValue('version', 1); GM_setValue('ignore_update', false); GM_setValue('update_confirmed', false);
// This used to check for updates whenever visiting the userscripts.org website. Disabling this, as I think this had a bug and people probably don't need to use this script anyway.
//if (cLocation.indexOf("userscripts.org") > 0) if (checkForUpdate && !GM_getValue('ignore_update')) checkUpdate();
if (sourceLinks.snapshotLength > 0) {
  if (autoScan && sourceLinks.snapshotLength <= threshold) scanIt();
  else {
    if (cLocation.indexOf("?") > 0) cLocation += "&"; else cLocation += "?";
	var scanButton = document.createElement('div');	
	scanButton.innerHTML = '<div id="su_scan" style="background-color:#F02222;color:#FFFFFF;border:2px;border-style:outset;padding:2px;cursor:pointer;opacity:.40;" title="Userscripts found on this page. Would you like to scan them?" onMouseOver="this.style.opacity=1" onMouseOut="this.style.opacity=.40">Scan Userscripts</div>';
    scanButton.style.position = "absolute"; scanButton.style.top = "50px"; scanButton.style.left = "8px";	
    document.body.appendChild(scanButton);
	document.getElementById('su_scan').addEventListener("click", scanClicked, true);
  }
}
function scanIt() {
  for(var i = 0; i < sourceLinks.snapshotLength; i++) {
    currentLink = sourceLinks.snapshotItem(i);  //rather than write sourceLinks.snapshotItem(i) all over the place
    if (isMalicious(currentLink.href)) {
    currentLink.title = "WAIT! You probably shouldn't install this!";
	currentLink.style.border = "1px solid #FF0000"; currentLink.style.backgroundColor = "#FFD0D0";
    alert_text += scriptName + " (" + currentLink.textContent + ")\n"; }
    if (i == (sourceLinks.snapshotLength - 1)) if (alert_text != alertText) {alert(alert_text);}
  }
  if (document.getElementById('su_scan')) {
  document.getElementById('su_scan').innerHTML = 'Scan Complete';
  document.getElementById('su_scan').style.opacity = '1';
  if (alert_text == alertText) document.getElementById('su_scan').style.backgroundColor = '#22EE22';
  setTimeout("document.getElementById('su_scan').style.display = 'none'",1500)}
  alert_text = alertText;
}
function isMalicious(theHref)
{
  theHref = theHref + "?source";
  var malicious = false;
  getSource = new XMLHttpRequest();
  getSource.open("GET", theHref, false);
  getSource.send(null);
  getSource.onreadystatechange = stateHandler();
  scriptName = trimLeft(scriptSource.substr(scriptSource.indexOf("@name"), scriptSource.indexOf("@namespace") - scriptSource.indexOf("@name") - 4).replace("@name",""));
  for(var i = 0; i < phrases.length; i++) {
  if (scriptSource.indexOf(phrases[i]) >= 0) { malicious = true; break; }
  }
  return malicious;
}
function stateHandler()
{
  if (getSource.readyState == 4) if (getSource.status == 200) scriptSource = getSource.responseText;
}
function trimLeft(theStr) { 
    while (theStr.substring(0,1) == ' ') 
        theStr = theStr.substring(1, theStr.length);
   return theStr;
} 
function scanClicked() { document.getElementById('su_scan').innerHTML = "Scanning..."; setTimeout(scanIt,100); }
function checkUpdate() {
  var currentVersion;
  getSource = new XMLHttpRequest();
  getSource.open("GET", "http://userscripts.org/scripts/source/11388.user.js?source", false);
  getSource.send(null);
  getSource.onreadystatechange = stateHandler();
  if (scriptSource.indexOf("var update = ") > 0) {
  currentVersion = parseInt(scriptSource.substr((scriptSource.indexOf("var update = ") + 13), scriptSource.indexOf(";") - scriptSource.indexOf("var update = ") - 13));
  if (update == currentVersion) {
	var updateButton = document.createElement('div');	
	updateButton.innerHTML = '<div id="su_update" style="background-color:#F02222;color:#FFFFFF;border:2px;border-style:outset;padding:2px;cursor:pointer;" title="Click to ignore." >Screen Userscripts has been updated. Go to <a href="http://userscripts.org/scripts/show/11388">http://userscripts.org/scripts/show/11388</a> to install the update.<br>(Click this message to make it go away.)</div>';
    updateButton.style.position = "absolute"; updateButton.style.top = "43px"; updateButton.style.left = "160px";	
    document.body.appendChild(updateButton);
	document.getElementById('su_update').addEventListener("click", updateClicked, true);
  } else if (!GM_getValue('update_confirmed')){
    var updateButton = document.createElement('div');	
	updateButton.innerHTML = '<div id="su_update" style="background-color:#22F022;color:#FFFFFF;border:2px;border-style:outset;padding:2px;cursor:pointer;">Congratulations, You now have the latest update of Screen Userscripts.</div>';
    updateButton.style.position = "absolute"; updateButton.style.top = "43px"; updateButton.style.left = "160px";	
    document.body.appendChild(updateButton);
	setTimeout("document.getElementById('su_update').style.display = 'none'", 1500);
	GM_setValue('update_confirmed', true);
  }
  }
  else alert("Screen Userscripts may have moved.\nYou may have to search for it manually");
}
function updateClicked() {
GM_setValue('ignore_update',true);
document.getElementById('su_update').style.display = 'none';
}