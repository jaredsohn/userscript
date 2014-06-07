// ==UserScript==
// @name        AvaxHome No Details Link
// @namespace   HabDichLieb ♥
// @description Removes the Details link
// @version     1.0
// @license     Public Domain
// @include     http://avaxhome.ws/*
// @include     http://avaxsearch.com/*
// @include     http://www.avaxhome.ws/*
// @include     http://avaxhome.org/
// ==/UserScript==

GM_log("Hostname: " + window.location.hostname);
GM_log("URL: " + window.location.href);

// <div class="container" id="main-info-container">
//   <div class="news" id="news-1571371">
//     <div class="title">...</div>
//     <div class="info">...</div>
//     <div class="text">
//       <div class="image">...</div><br>
//       <div class="center"><b>...</b></div><br>
//     </div>
//     <div class="actions dt">
//       <a href="....html">Details</a>
//     </div>
//   </div>
//   ...
// </div>

var links = document.evaluate('div[@class="news"]/div[@class="actions dt"]/a',
                              document.getElementById("main-info-container"), null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<links.snapshotLength; i++) {
  var el = links.snapshotItem(i);

  if (el.innerHTML != "Details") {
    GM_log("link text = " + el.innerHTML);
    GM_log("link url = " + el.href);
  }

  el = el.parentNode;
  el.parentNode.removeChild(el);

  GM_log("element removed.");
}

