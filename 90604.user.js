// ==UserScript==
// @name           Confreaks Notes
// @namespace      srawlins
// @description    Track Confreaks videos
// @include        http://*.confreaks.com/*
// @include        http://*.confreaks.net/*
// @include        http://confreaks.net/*
// ==/UserScript==

var url = window.location.pathname;
var url = document.URL;
var primaryContent = document.getElementById('primary-content');
var videoHeaders = primaryContent.firstChild;
var videoDivs = document.evaluate("div[@class='videos']/div[@class='video']",
      primaryContent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (videoDivs.snapshotLength == 0) {  // old-style
  setupOldStyle();
} else {                              // new-style
  setupNewStyle(videoDivs);
}


function setupOldStyle() {
  var videoHeaders = document.evaluate("div/table[1]/tbody/tr[1]",
      primaryContent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  var thWatched = document.createElement('th');
  thWatched.appendChild(document.createTextNode('Watched?'));
  videoHeaders.appendChild(thWatched);

  var videoRows = document.evaluate("div/table[1]/tbody/tr",
        primaryContent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = videoRows.snapshotLength - 1; i>=1; i--) {  // skip first row
    row = videoRows.snapshotItem(i);
    videoLink = document.evaluate("td[2]/a[1]",
      row, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (videoLink == null) { continue; }
    href = videoLink.getAttribute("href");
    s = getKey(url+""+href);
    watchedTD = document.createElement('td');
    watchedTD.setAttribute( "class", "watched" );
    appendYesAndNo(watchedTD, href);
    appendSaveAndUgh(watchedTD, href);
    
    row.appendChild(watchedTD);
  }
}

function setupNewStyle(videoDivs) {
  for (var i = videoDivs.snapshotLength - 1; i>=0; i--) {
    row = videoDivs.snapshotItem(i);
    var mainInfo = document.evaluate("div[@class='main-info']",
      row, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    watchedDiv = document.createElement('div');
    videoLink = document.evaluate("div[@class='thumbnail']/a",
      row, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    href = videoLink.getAttribute("href");
    s = getKey(url+""+href);
    appendYesAndNo(watchedDiv, href);
    appendSaveAndUgh(watchedDiv, href);
    watchedDiv.setAttribute( "class", "watchedDiv" );
    
    mainInfo.parentNode.insertBefore(watchedDiv, mainInfo.nextSibling);
  }
}

function appendYesAndNo(elm, href) {
  var watchedA = document.createElement('a');
  watchedA.href="javascript:void(0);";
  watchedA.appendChild(document.createTextNode('Yes'));
  elm.appendChild(watchedA);
  var notYetA = document.createElement('a');
  notYetA.href="javascript:void(0);";
  notYetA.appendChild(document.createTextNode('No'));
  elm.appendChild(notYetA);
    
  if (GM_getValue(getKey(url+""+href), 0) & 1 == 1) { // watched: yes
    watchedA.setAttribute( "class", "watchedY_set" );
    notYetA.setAttribute( "class", "watchedN" );
  } else {                          // watched: no
    watchedA.setAttribute( "class", "watchedY" );
    notYetA.setAttribute( "class", "watchedN_set" );
  }
  watchedA.addEventListener("click", createYesCallback(href, watchedA, notYetA), false);
  notYetA.addEventListener("click",  createNoCallback(href,  watchedA, notYetA), false);
}

function appendSaveAndUgh(elm, href) {
  saveA = document.createElement('a');
  saveA.href="javascript:void(0);";
  saveA.appendChild(document.createTextNode('Save'));
  elm.appendChild(saveA);
  notInterestedA = document.createElement('a');
  notInterestedA.href="javascript:void(0);";
  notInterestedA.appendChild(document.createTextNode('Ugh'));
  elm.appendChild(notInterestedA);
  
  if ((GM_getValue(s, 0) & 2) == 2) { // save: yes (g & 010)
    saveA.setAttribute( "class", "watchedS_set" );
  } else {                          // save: no
    saveA.setAttribute( "class", "watchedS" );
  }
  if ((GM_getValue(s, 0) & 4) == 4) { // ugh: yes (g & 100)
    notInterestedA.setAttribute( "class", "watchedNI_set" );
  } else {                          // ugh: no
    notInterestedA.setAttribute( "class", "watchedNI" );
  }
  saveA.addEventListener("click",          createSaveCallback(href, saveA, notInterestedA), false);
  notInterestedA.addEventListener("click", createUghCallback(href,  saveA, notInterestedA), false);
}

function createYesCallback(href, yesA, noA) {
  return function(event) {
    s = getKey(url+""+href);
    GM_setValue(s, GM_getValue(s, 0) | 1); // g | 001
    yesA.setAttribute( "class", "watchedY_set" );
    noA.setAttribute( "class", "watchedN" );
  }
}

function createNoCallback(href, yesA, noA) {
  return function(event) {
    s = getKey(url+""+href);
    GM_setValue(s, GM_getValue(s, 0) & 6); // g & 110
    yesA.setAttribute( "class", "watchedY" );
    noA.setAttribute( "class", "watchedN_set" );
  }
}

function createSaveCallback(href, saveA, ughA) {
  return function(event) {
    s = getKey(url+""+href);
    GM_setValue(s, GM_getValue(s, 0) ^ 2); // g ^ 010
    if ((GM_getValue(s, 0) & 2) == 2) {
      saveA.setAttribute( "class", "watchedS_set" );
      ughA.setAttribute( "class", "watchedNI" );
    } else {
      saveA.setAttribute( "class", "watchedS" );
    }
  }
}

function createUghCallback(href, saveA, ughA) {
  return function(event) {
    s = getKey(url+""+href);
    GM_setValue(s, GM_getValue(s, 0) ^ 4); // g ^ 100
    if ((GM_getValue(s, 0) & 4) == 4) {
      saveA.setAttribute( "class", "watchedS" );
      ughA.setAttribute( "class", "watchedNI_set" );
    } else {
      ughA.setAttribute( "class", "watchedNI" );
    }
  }
}

function getKey(s) {
  return "cn_"+s.replace(/[:.\/]/g,"_");
}

addGlobalStyle(
  ".watched {\n" +
  "  font-size: 75%;\n" +
  "}\n" +
  ".watched a {\n" +
  "  padding: 1px;\n" +
  "}"
);
addGlobalStyle(
  "#primary-content {\n" +
  "  width: 750px;\n" +
  "}\n" +
  ".video .main-info {\n" +
  "  width: 370px;\n" +
  "}\n" +
  ".videos {\n" +
  "  padding-left: 5px;\n" +
  "  padding-right: 5px;\n" +
  "}"
);
addGlobalStyle(
  ".watchedDiv {\n" +
  "  float: left;\n" +
  "  width: 130px;\n" +
  "}"
);
addGlobalStyle(
  ".watchedY {\n" +
  "  background-color: white;\n" +
  "  border: solid 1px blue;\n" +
  "  color: blue;\n" +
  "  margin-right: 0.6em;\n" +
  "}\n" +
  ".watchedY:hover {\n" +
  "  background-color: blue;\n" +
  "  border: solid 1px white;\n" +
  "  color: white;\n" +
  "}\n" +
  ".watchedY_set {\n" +
  "  background-color: blue;\n" +
  "  border: solid 1px white;\n" +
  "  color: white;\n" +
  "  margin-right: 0.6em;\n" +
  "}\n" +
  ".watchedY_set:hover {\n" +
  "  background-color: white;\n" +
  "  border: solid 1px blue;\n" +
  "  color: blue;\n" +
  "}"
);
addGlobalStyle(
  ".watchedN_set {\n" +
  "  background-color: black;\n" +
  "  border: solid 1px white;\n" +
  "  color: white;\n" +
  "  margin-right: 0.6em;\n" +
  "}\n" +
  ".watchedN_set:hover {\n" +
  "  background-color: white;\n" +
  "  border: solid 1px black;\n" +
  "  color: black;\n" +
  "}\n" +
  ".watchedN {\n" +
  "  background-color: white;\n" +
  "  border: solid 1px black;\n" +
  "  color: black;\n" +
  "  margin-right: 0.6em;\n" +
  "}\n" +
  ".watchedN:hover {\n" +
  "  background-color: black;\n" +
  "  border: solid 1px white;\n" +
  "  color: white;\n" +
  "}"
);
addGlobalStyle(
  ".watchedS {\n" +
  "  background-color: white;\n" +
  "  border: solid 1px green;\n" +
  "  color: green;\n" +
  "  margin-right: 0.6em;\n" +
  "}\n" +
  ".watchedS:hover {\n" +
  "  background-color: green;\n" +
  "  border: solid 1px white;\n" +
  "  color: white;\n" +
  "}\n" +
  ".watchedS_set {\n" +
  "  background-color: green;\n" +
  "  border: solid 1px white;\n" +
  "  color: white;\n" +
  "  margin-right: 0.6em;\n" +
  "}\n" +
  ".watchedS_set:hover {\n" +
  "  background-color: white;\n" +
  "  border: solid 1px green;\n" +
  "  color: green;\n" +
  "}"
);
addGlobalStyle(
  ".watchedNI {\n" +
  "  background-color: white;\n" +
  "  border: solid 1px #666666;\n" +
  "  color: #666666;\n" +
  "}\n" +
  ".watchedNI:hover {\n" +
  "  background-color: #666666;\n" +
  "  border: solid 1px white;\n" +
  "  color: white;\n" +
  "}\n" +
  ".watchedNI_set {\n" +
  "  background-color: #666666;\n" +
  "  border: solid 1px white;\n" +
  "  color: white;\n" +
  "  margin-right: 0.6em;\n" +
  "}\n" +
  ".watchedNI_set:hover {\n" +
  "  background-color: white;\n" +
  "  border: solid 1px #666666;\n" +
  "  color: #666666;\n" +
  "}"
);

function addGlobalStyle(css) {
  try {
    var elmHead, elmStyle;
    elmHead = document.getElementsByTagName('head')[0];
    elmStyle = document.createElement('style');
    elmStyle.type = 'text/css';
    elmHead.appendChild(elmStyle);
    elmStyle.innerHTML = css;
  } catch (e) {
    if (!document.styleSheets.length) {
      document.createStyleSheet();
    }
      document.styleSheets[0].cssText += css;
  }
}