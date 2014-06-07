// ==UserScript==
// @name           Kiss Insights Goodbye
// @namespace      https://github.com/johan/
// @description    Remove KissInsights dialogs from all web sites.
// @match          https://*/*
// @match          http://*/*
// @run-at         document-start
// ==/UserScript==

var start = +new Date
  , kmode = localStorage.KissInsights
  , quiet = kmode === 'quiet'
  , is_ki = /^\/\/s3\.amazonaws\.com\/(ki\.js|r\.kissinsights\.com)\//
  , edits = { childList: true
            , subtree: true
            }
  ;

if (quiet || !kmode)
  (new WebKitMutationObserver(removeKissInsights)).observe(document, edits);

function removeKissInsights(mutations) {
  for (var i = 0, m; m = mutations[i]; i++)
    for (var j = 0, a = m.addedNodes, n; n = a[j]; j++)
      if (n.id === 'ki_container')
        nuke('Kiss Insights container removed: ', n);
      else if (n.src && /^script$/i.test(n.nodeName) &&
               is_ki.test(n.getAttribute('src')))
        nuke('Kiss Insights script removed: ', n);
}

function nuke(msg, n) {
  n.parentNode.removeChild(n);
  if (quiet) return;
  var args = [].slice.call(arguments)
    , help = '\nTo enable for this site, set localStorage.KissInsights = true;'
    ;
  console.warn.apply(console, [+new Date - start +'ms:'].concat(args, help));
}
