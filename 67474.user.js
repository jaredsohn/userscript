// ==UserScript==
// @name           More Netflix Tabs
// @namespace      srawlins
// @description    Adds "Your Ratings" link to top
// @include        http://www.netflix.com/*
// @include        https://www.netflix.com/*
// @include        http://movies.netflix.com/*
// ==/UserScript==

var url = window.location.pathname;
var primaryNav = document.getElementById('top-nav');
var navMenu = document.evaluate("ul",
      primaryNav, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var yourRatingsTab = document.createElement('li');
if ( url.match(/MoviesYouveSeen/) ) {
  yourRatingsTab.setAttribute("class", "nav-item nav-item-current");
  notCurrent();
} else {
  yourRatingsTab.setAttribute("class", "nav-item");
}
yourRatingsTab.setAttribute("id", "yrTab");

var yourRatingsA = document.createElement('a');
yourRatingsA.href = "http://www.netflix.com/MoviesYouveSeen";
yourRatingsA.title = "Movies You've Rated";

var yourRatingsSpan1 = document.createElement('span');

yourRatingsSpan1.appendChild(document.createTextNode('Your Ratings'));
yourRatingsA.appendChild(yourRatingsSpan1);
yourRatingsTab.appendChild(yourRatingsA);
navMenu.appendChild(yourRatingsTab);

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.netflix.com/RecommendationsHome',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
    },
    onload: function(responseDetails) {
        var re = /.span class="ratedText".(\d+).\/span./
        var match = re.exec(responseDetails.responseText);
        var ratings = match[1];
        //yourRatingsSpan2.innerHTML = 'Ratings ('+ratings+')';
        yourRatingsSpan1.innerHTML = 'Ratings ('+ratings+')';
        var statsNotInterested = document.getElementById('stats-not-interested');
        if (statsNotInterested == null) var statsNotInterested = document.getElementById('stats-thrillers');
        if (statsNotInterested == null) var statsNotInterested = document.getElementById('stats-z');
        var statsDivTail = document.getElementById('stats-div-tail');
        if ( statsNotInterested != null && statsDivTail != null ) {
          statsNotInterested.innerHTML += "" + (ratings*1 - statsDivTail.innerHTML*1);
        }
    }
});

if ( url.match(/MoviesYouveSeen/) ) {
  var links = document.evaluate("//*[@id='jumpto']/div/div/table/tbody/tr/td/a",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var statsDiv = document.createElement('div');
  statsDiv.setAttribute("id", "stats");
  var statsDivTail = document.createElement('span');
  statsDivTail.setAttribute("id", "stats-div-tail");
  statsDivTail.style.display = "none";
  statsDiv.appendChild(statsDivTail);
  var mainContent = document.getElementById('main-content');
  mainContent.insertBefore(statsDiv, mainContent.firstChild);
  mainContent.style.padding = "5px 0 0";
  
  var previousIdx = -1;
  var idxRe = /idx=(\d+)/;
  var stats_el_margin_right = 6;
  for (var i = links.snapshotLength - 1; i>=0; i--) {
    link = links.snapshotItem(i);
    var statsEl = document.createElement('span');
    var space = document.createTextNode(' ');
    statsEl.setAttribute( "class", "stats-el" );
    statsEl.setAttribute( "id", "stats-"+( link.innerHTML.toLowerCase().replace(/\s/g, "-") ) );
    statsEl.innerHTML = "<b>" + link.innerHTML + ":</b> ";
    statsDiv.insertBefore(space, statsDiv.firstChild);
    statsDiv.insertBefore(statsEl, statsDiv.firstChild);
    linkIdx = idxRe.exec(link.href);
    if ( linkIdx == null || linkIdx.length < 2 ) { continue; }
    linkIdx = linkIdx[1]*1;
    if ( link.innerHTML == "Thrillers" ) stats_el_margin_right = 4;
    if ( link.innerHTML == "Not Interested" ||
         link.innerHTML == "Thrillers" || 
         link.innerHTML == "Z" ) {
      previousIdx = linkIdx;
      statsDivTail.innerHTML = linkIdx;
      continue;
    }
    if ( previousIdx < 0 ) { previousIdx = linkIdx; continue; }
    statsEl.innerHTML += ""+(previousIdx-linkIdx);
    previousIdx = linkIdx;
  }
  
  addGlobalStyle(
    "#stats {\n" +
    "  color: #FFFFFF;\n" +
    "  margin-bottom: 2px;\n" +
    "}"
  );
  addGlobalStyle(
    ".stats-el {\n" +
    "  margin-right: "+stats_el_margin_right+"px;\n" +
    "  white-space: nowrap;\n" +
    "}"
  );
}

function notCurrent() {
  var wnTab = document.getElementById('nav-watchinstantly');
  var qTab  = document.getElementById('nav-queue');
  var rTab  = document.getElementById('nav-recs');
  wnTab.setAttribute("class", "nav-item");
  qTab.setAttribute("class", "nav-item");
  rTab.setAttribute("class", "nav-item");
}

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