// ==UserScript==
// @name          Google2
// @description   Add alternate search engines.
// @include       http://www.google.tld/*
// @version		2
// ==/UserScript==

unsafeWindow.altLinks = {
      Bing           : "http://www.bing.com/search?q={searchTerms}",
      Yahoo          : "http://search.yahoo.com/search?p={searchTerms}",
//      百度           : "http://www.baidu.com/s?wd={searchTerms}",
//      Яндекс         : "http://yandex.ru/yandsearch?text={searchTerms}",
      Ask            : "http://web.ask.com/web?q={searchTerms}",
      WolframAlpha   : "http://www.wolframalpha.com/input/?i={searchTerms}",
//      FilesTube      : "http://www.filestube.com/search.html?q={searchTerms}+-ebay+-review+-coupon",
//      Fileserve      : "http://www.google.com/search?q={searchTerms}+%2Bfileserve+",
//      BeeMp3         : "http://beemp3.com/index.php?st=all&q={searchTerms}",
//      iMDB           : "http://www.imdb.com/find?s=all&q={searchTerms}",
//      WorldCat       : "http://www.worldcat.org/search?qt=worldcat_org_all&q={searchTerms}",
//      Newspapers     : "http://news.google.com/archivesearch?q={searchTerms}",
      Twitter        : "http://www.twitter.com/search?q={searchTerms}"
};

unsafeWindow.query = "";

unsafeWindow.checkQuery = function () {
  var s;
  if(unsafeWindow.google.jesrstate) {
    s = unsafeWindow.google.jesrstate;
  } else if(unsafeWindow.google.base_href) {
    s = unsafeWindow.google.base_href;
  } else {
    s = window.location.href;
  }
  unsafeWindow.query = s.match(/[\?|;|&]q=[^&]*/)[0].slice(3);
};

waitForGoogle = function(event) {
  if(unsafeWindow.working) return;
  unsafeWindow.working = true;
  unsafeWindow.setTimeout(function () { positionLinks(); }, 500);
};

// place the alternate links in the search results
positionLinks = function (event) {
  if(!document.getElementById("subform_ctrl")) {
    unsafeWindow.working = false;
    return;
  }

  if(document.getElementById("alternateLinks")) {
    var other = document.getElementById("alternateLinks");
  } else {
    var results = document.getElementById("subform_ctrl");
    var other = document.createElement('div');
    other.id = "alternateLinks";
    other.style.width = "600px";
    results.insertBefore(other, results.firstChild);
  }
  var links = "";
  unsafeWindow.checkQuery();
  for (var p in unsafeWindow.altLinks) {
    links = links + ", <a href=\"" + 
            unsafeWindow.altLinks[p].replace("{searchTerms}", unsafeWindow.query) + 
            "\">" + p + "</a>";
  }
  links = links.slice(2);
  other.innerHTML = links;
  unsafeWindow.working = false;
  return;
}

unsafeWindow.working = false;
unsafeWindow.document.addEventListener('DOMNodeInserted', function (event) {waitForGoogle(event);}, false);

return;