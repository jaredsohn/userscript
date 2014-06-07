// ==UserScript==
// @name           Yahoo - skip unsupported screen resolution
// @namespace      http://userscripts.org/users/197327
// @description    Skips screen resolution warning page Yahoo webmail gives on netbooks
// @include        http://*.mail.yahoo.*/*/system_requirements?resolution=unsupported
// ==/UserScript==

window.location.href = window.location.href.replace("/system_requirements?resolution=unsupported","/launch?sysreq=ignore");