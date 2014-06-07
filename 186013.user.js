// ==UserScript==
// @name        Spiegel.de Newsletter Redirect to Article
// @namespace   http://userscripts.org
// @description Redirects a link from the newsletter directly to the article.
// @include     http://*spiegel.de/#ai*
// @version     2013-12-12
// @grant       none
// ==/UserScript==
var pattern = /http:\/\/www.spiegel.de\/#ai=(\d*).*&aitype=newsletter&ref=nl-dertag/;
var match = pattern.exec(window.location.href);
if (match != null) {
  var aid = match[1];
  targetUrlPattern = new RegExp("href=\"([^\"]*a-" + aid + "\.html)\"");
  // console.log(targetUrlPattern.toString());
  var html = document.documentElement.innerHTML;
  match = targetUrlPattern.exec(html);
  // console.log(match)
  if (match != null) {
    window.location.href = "http://www.spiegel.de" + match[1]
  } else {
    teaserDivHTML = document.getElementsByClassName("teaser")[0].innerHTML
    hrefPattern = new RegExp("href=\"([^\"]*\.html)\"");
    match = hrefPattern.exec(teaserDivHTML);
    if (match != null) {
      window.location.href = "http://www.spiegel.de" + match[1]
    }
  }
}