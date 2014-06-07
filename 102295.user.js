// ==UserScript==
// @name           remove_conf
// @namespace      auto-zap
// @description    Warns about potentially malicious JS code. Like onBeforeUnload, onClick, onUnload.. these can be used to generate unescapable pages. Can blacklist/whitelist domains and subdomains. Uses the DOM Storage (available from Firefox 2)
// @include        *
// @author         max
// @contact        ...@gmail.com
// ==/UserScript==


unsafeWindow.onbeforeunload = null;
unsafeWindow.onunload = null;