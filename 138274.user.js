// ==UserScript==
// @name           Add URL to <title>
// @namespace      addurltotitle
// @description    Add URL to <title>
// @include        *
// @author       matczar
// @version      0.2
// ==/UserScript==

document.title = document.title + ' - ' + window.location.href;