// ==UserScript==
// @name           Reddit Wingnut Filter
// @namespace      http://reddit.com
// @description    Hides everything even remotely political on the main Reddit pages
// @include        http://reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://reddit.com/reddits*
// @exclude        http://reddit.com/r/*
// @exclude        http://reddit.com/stats*
// @exclude        http://reddit.com/saved*
// @exclude        http://reddit.com/message/*
// @exclude        http://reddit.com/prefs*
// @exclude        http://reddit.com/submit*
// @exclude        http://reddit.com/info*
// ==/UserScript==

var keywords = [
  /\bpaul\b/i,
  /bush|dubya/i,
  /cheney/i,
  /treason|impeach/i,
  /israel/i,
  /palestin/i,
  /\bgaza\b/i,
  /terror/i,
  /bin laden|osama|al[ -]qaeda/i,
  /taser/i,
  /\bcops?\b|police|officer/i,
  /\bwar\b/i,
  /iraq/i,
  /afganistan/i,
  /united states|america/i,
  /\bUSA?\b/,
  /U\.S\./,  // catches U.S.S.R., need to fix, \b doesn't work after .
  /canad/i,
  /\bUAE\b/,
  /united arab emirates/i,
  /clinton|obama|kucinich|huckabee|giuliani|romney|mccain|edwards/i,
  /saudi/i,
  /dubai/i,
  /\blie.?\b|\blying\b/i,
  /\bfed.?\b|federal reserve/i,
  /republican/i,
  /democrat/i,
  /copyright/i,
  /\bpatent(ed|ing)?\b/i,
  /congress/i,  // catches "library of congress"...fix w/o lookbehinds?
  /\bFBI\b|\bCIA\b/,
  /9\/11|september 11/i,
  /recession|inflation|stocks|stock market|stock exchange|markets|\bdow\b/i,
  /wall street/i,
  /constitution|democracy|government/i,
  /diebold/i,
  /real ?id/i,
  /illegal/i,
  /arrest|cuffed|prison|criminal|convict/i,
  /al jazeera/i,
  /caucus/i,
  /\bcourts?\b|\bjudges?\b/i,
  /\bcensor/i,
  /\bguns\b|\barmed\b/i,
  /lobby|lobbies/i,
  ];

var articles = document.evaluate('//div[@class="entry"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var wingnutArticles = new Array();

for (var i = 0; i < articles.snapshotLength; i++) {
	var article = articles.snapshotItem(i);
	var title = document.evaluate('.//a[contains(@class, "title")]/text()', article, null, XPathResult.STRING_TYPE, null).stringValue;
	
	for (var j = 0; j < keywords.length; j++) {
    if (title.match(keywords[j]) != null) {
      article.firstChild.firstChild.style.color = "#CCC";
      wingnutArticles.push(article);
  	  break; // don't bother checking the rest of the keywords
    }
  }  
}

function hideArticles() {
  for (var i = 0; i < wingnutArticles.length; i++) {
    wingnutArticles[i].parentNode.parentNode.style.display = "none";
  }
}

function showArticles() {
  for (var i = 0; i < wingnutArticles.length; i++) {
    wingnutArticles[i].parentNode.parentNode.style.display = "block";
  }  
}

hideArticles();

// add a message to reddit's sidebar
if (wingnutArticles.length == 0) {
  var message = "no stories matched";
} else if (wingnutArticles.length == 1) {
  var message = '<input type="checkbox" id="wingnut_toggle">show ' + wingnutArticles.length + ' story';
} else {
  var message = '<input type="checkbox" id="wingnut_toggle">show ' + wingnutArticles.length + ' stories';
}

var sidebar = document.evaluate("//div[@class='right']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var sidebox = document.createElement('div');
sidebox.setAttribute('class','sidebox');
sidebox.innerHTML = '<table><tr><td><div class="sortbox"><p class="head">wingnut filter</p>' + message + '</div></td></tr></table>';
sidebar.insertBefore(sidebox, sidebar.childNodes[sidebar.childNodes.length-1]);

wingnut_toggle = document.getElementById("wingnut_toggle");

if (wingnut_toggle != null) {
  wingnut_toggle.addEventListener('click', function () {
    wingnut_toggle.checked ? showArticles() : hideArticles();
  }, false);
}

