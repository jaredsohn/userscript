// ==UserScript==
// @name            Novice novega sveta
// @namespace       www.erepublik.com
// @author          fsacer
// @include         http://www.erepublik.com/*     
// @version         0.5
// ==/UserScript==


GM_xmlhttpRequest({
              method: 'GET',
              url: http://docs.google.com/View?docID=0AXCaoP5pIoAmZGhobnM2bTRfMTJocDc4ZDZmcg&revision=_latest&hgd=1,
              headers: {
              'User-agent':window.navigator.userAgent,
              'Accept': 'application/atom+xml,application/xml,text/xml',
              },
              onload: function(responseDetails) {
                doc = HTMLtoDOM(responseDetails.responseText);
              }
});