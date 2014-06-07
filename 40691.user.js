// ==UserScript==
// @name           Facebook Direct Links
// @namespace      sizzlemctwizzle
// @description    Makes links on Facebook go directly to the page 
// @include        http://*.facebook.com/*
// ==/UserScript==

// Get a list of nodes with xpath
function multi(x) { return document.evaluate(x, document, null, 6, null); }

// Find out where a share link really leads
function discoverShare(e) {
  var link = e.target, 
    cachedLinks = eval(GM_getValue('cachedLinks', '({})')),
    sid;
  if (!link.href) return;
  if (sid=link.href.match(/sid=(.*?)&/i)) 
    sid = sid[1];
  else
    return;
  if (cachedLinks[sid]) {
    link.href = cachedLinks[sid];
    link.setAttribute('unmasked', '');
  } else
    GM_xmlhttpRequest({
          method: 'HEAD',
	  url: link.href,
	  headers: {
	    'User-agent':window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	  },
	  onload: function(res) {
	     var url;
	     if (res.status == 200 && (url = res.finalUrl)) {
	       link.href = url;
	       cachedLinks[sid] = url;
	       GM_setValue('cachedLinks', cachedLinks.toSource());
	       link.setAttribute('unmasked', '');
	     }
          }
    });
}

function replace_links() {
  var links = multi('//a[contains(@href, "http://www.facebook.com/ext/share.php") and not(@unmasked)]'), link, i=links.snapshotLength;
  while(link=links.snapshotItem(--i)) {
    link.addEventListener('mouseover', discoverShare, false);
  }
}

function watchforchange() {
  document.documentElement.removeEventListener('DOMNodeInserted', watchforchange, false);
  setTimeout(replace_links, 0);
  document.documentElement.addEventListener("DOMNodeInserted", watchforchange, false);
}

watchforchange();