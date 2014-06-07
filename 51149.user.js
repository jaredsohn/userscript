// ==UserScript==
// @name             subs.nu-directDownloadLink
// @namespace        http://userscripts.org/scripts/show/51149
// @description      Add a link to download subtitles directly from a search result (without the hassle of having to go on the subtitle page first)
// @include          http://subs.nu/*/search/*
// @include          http://www.subs.nu/*/search/*
// @version          0.5
// ==/UserScript==


// this RE will be used to find the href for direct download on a subtitle page
var RE_subHref = new RegExp('<a[^>]+href="([^"]+/download/[0-9]+-[0-9a-f]+/)"[^>]+>[^<]*<img[^>]+src="[^"]+/download_icon.png"[^>]*>');

// try to find link to the subtitles
var links = document.evaluate('//body//div[@id="content"]//td[@onmouseover]/a', 
         document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Use this span as a link (embedded in a <a>
// I'll clone it later
var mySpan = document.createElement('span');
mySpan.className = 'directDownloadLink';
mySpan.textContent = ' <Download> ';
GM_addStyle('span.directDownloadLink { font-weight: bold ; text-decoration: underline }');
GM_addStyle('span.directDownloadLink-clicked { font-weight: normal ; text-decoration: line-through }');


for (var i=0, link, span ; link = links.snapshotItem(i) ; i++) {
   span = mySpan.cloneNode(true);
   link.appendChild(span);
   span.addEventListener('click', function (e) {
         var thisNode = this;
         // Don't actually click on the parent link
         e.preventDefault();
         e.stopPropagation();
         GM_xmlhttpRequest({
            method: 'GET',
            url: this.parentNode.href,
            onload: function (resp) {
                  // find the subtitle URL
                  var match = resp.responseText.match(RE_subHref);
                  if (match) {
                     location.href = match[1];
                     // visual feedback
                     thisNode.textContent = ' <Download[done]> ';
                     thisNode.className = 'directDownloadLink-clicked';
                  } else {
                     thisNode.textContent = ' Direct Link Not Found ';
                  }
            }
         });
      }, true);
}

/* vim: set et sts=3 sw=3 foldmethod=marker : */

