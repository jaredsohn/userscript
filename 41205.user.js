// ==UserScript==
// @name           Clean SEGA Board
// @namespace      max_mello@yahoo.com
// @description    Remove un-needed things from the SEGA Board
// @include        http://boards2.sega.com/*
// ==/UserScript==

var adSidebar = document.getElementById(':sonic:');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}


var allDivs, thisDiv;
var DivParent;

allDivs = document.evaluate(
    "//a[@href='http://www.esrb.org']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
    // do something with thisDiv
}

allDivs = document.evaluate(
    "//a[@href='http://www.sega.com/legal/privacy.php']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
    // do something with thisDiv
}

allDivs = document.evaluate(
    "//a[@href='groupcp.php?g=1182']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    DivParent = thisDiv.parentNode;
    thisDiv.parentNode.removeChild(thisDiv);
    DivParent.parentNode.removeChild(DivParent);
    // do something with thisDiv
}


allDivs = document.evaluate(
    "//img[@href='homeb.php']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
    // do something with thisDiv
}

allDivs = document.evaluate(
    "//img[@href='index.php']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
    // do something with thisDiv
}

function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText) }
  })
}

var txtget
var logo
var href = window.location.href;

if(href!="http://boards2.sega.com/sega_board/posting.php?mode=smilies") {
  if(href=="http://boards2.sega.com/sega_board/index.php") {
    get("http://segaboardsplus.webs.com/newsticker_v2.txt", inform);
  }
  else {
    get("http://segaboardsplus.webs.com/announcements_v2.txt", inform);
  }
  get("http://segaboardsplus.webs.com/boardpages.txt", inform2);
}

function inform(text) {
  txtget=text
  logo = document.createElement("div");
  logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
      'border-bottom: 1px solid #000000; margin-bottom: 1px; ' +
      'font-size: small; background-color: #000000; ' +
      'color: #ffffff;"><p style="margin: 1px 0 1px 0;"> ' +
      txtget +
      '</p></div>';
  document.body.insertBefore(logo, document.body.firstChild);
}

function inform2(text) {
  txtget=text
  logo = document.createElement("div");
  logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
      'border-bottom: 1px solid #C0C8D6; margin-bottom: 1px; ' +
      'font-size: small; background-color: #C0C8D6; ' +
      'color: #FFFFFF;"><p style="margin: 2px 0 1px 0;"> ' +
      txtget +
      '</p></div>';
  document.body.insertBefore(logo, document.body.secondChild);
}

logo = document.createElement("td");
logo.innerHTML = '<td><a href=\"javascript:emoticon(\':sonic:\')\"><img src= \"http://img172.imageshack.us/img172/622/smiliesonicip6.gif\" border="0" alt="Sonic" title="Sonic" /></a></td>';

var logo2 = document.createElement("tr");
logo2.innerHTML = '<tr align="left" valign="center"><td><a href=\"javascript:emoticon(\':amyxsonic:\')\"><img src= \"http://img412.imageshack.us/img412/4527/sonicandamyemoticonbyziok3.gif\" border="0" alt="Sonic" title="Sonic" /></a></td></tr>';


if(href=="http://boards2.sega.com/sega_board/posting.php?mode=smilies") {
  allDivs = document.evaluate(
      "//img[@src='images/smiles/icon_mrgreen.gif']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
  for (var i = 0; i < allDivs.snapshotLength; i++) {
      thisDiv = allDivs.snapshotItem(i);
      DivParent=thisDiv.parentNode.parentNode;
      DivParent.parentNode.insertBefore(logo, DivParent.nextSibling);
  }

  allDivs = document.evaluate(
      "//img[@src='http://img172.imageshack.us/img172/622/smiliesonicip6.gif']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
  for (var i = 0; i < allDivs.snapshotLength; i++) {
      thisDiv = allDivs.snapshotItem(i);
      DivParent=thisDiv.parentNode.parentNode;
      DivParent.parentNode.parentNode.insertBefore(logo2, DivParent.parentNode.nextSibling);
  }

}

else if (1==2) {
  logo2.innerHTML = '<tr align="left" valign="center"><td><a href="javascript:emoticon(\':|\')"><img src="images/smiles/icon_neutral.gif" border="0" alt="Neutral" title="Neutral" /></a></td><td><a href=\"javascript:emoticon(\':mrgreen:\')\"><img src=\"images/smiles/icon_mrgreen.gif\" border="0" alt="Mr. Green" title="Mr. Green" /></a></td><td><a href=\"javascript:emoticon(\':sonic:\')\"><img src= \"http://img172.imageshack.us/img172/622/smiliesonicip6.gif\" border="0" alt="Sonic" title="Sonic" /></a></td></tr>';

  allDivs = document.evaluate(
      "//img[@src='images/smiles/icon_arrow.gif']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
  for (var i = 0; i < allDivs.snapshotLength; i++) {
      thisDiv = allDivs.snapshotItem(i);
      DivParent=thisDiv.parentNode.parentNode;
      DivParent.parentNode.parentNode.insertBefore(logo, DivParent.parentNode.nextSibling);
  }


}


function randomImage() {
  var quotes = [
    'http://img292.imageshack.us/img292/1252/boardimgsupersonichg9.png',
    'http://img292.imageshack.us/img292/6316/boardimgsonicfacerk7.png',
    'http://img292.imageshack.us/img292/7285/boardimgshadowge2.png',
    'http://img292.imageshack.us/img292/1426/boardimgdreggmanki7.png',
    'http://img292.imageshack.us/img292/3041/boardimghypersonicrb8.png',
    'http://img259.imageshack.us/img259/6654/boardimgsilverqg1.png',
    'http://img259.imageshack.us/img259/8131/boardimgsupersus3.png',
    'http://img259.imageshack.us/img259/7599/boardimgcreamqu2.png',
    'http://boards2.sega.com/sega_board/templates/subSonic/images/bb_header_sonicheroes.gif',
    'http://img144.imageshack.us/img144/2217/boardimgdarkspineob6.png',
    'http://img144.imageshack.us/img144/4253/boardimgchaorn4.png'

  ];
  return quotes[Math.floor(Math.random()*(quotes.length))];
}


logo = document.createElement("img");
logo.innerHTML = '<img src="http://img132.imageshack.us/img132/5483/boardimgshadowjx0.gif"; ' +
    'width: "242"; ' +
    'height: "152"; ' +
    'alt: ""; ' +
    'border: "0">';
    '</img>';
    
allDivs = document.evaluate(
    "//img[@width='242']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.src = randomImage();
 }



GM_registerMenuCommand('Jump to The Sonic Stadium',
function(e) {TheSonicStadium(1)} );

function TheSonicStadium(dataflag){
    if(dataflag==1){
        window.location.href = 'http://www.sonicstadium.org/';
    }
}


allDivs = document.evaluate(
    "//span[@class='postbody']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.innerHTML = thisDiv.innerHTML.replace(/\:sonic\:/g, "<img src=\"http://img172.imageshack.us/img172/622/smiliesonicip6.gif\" />");
    thisDiv.innerHTML = thisDiv.innerHTML.replace(/\:amyxsonic\:/g, "<img src=\"http://img412.imageshack.us/img412/4527/sonicandamyemoticonbyziok3.gif\" />");
 }


var version_scriptNum = 41205; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1203221929959; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);