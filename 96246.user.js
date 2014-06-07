// ==UserScript==
// @name           manzur
// ==/UserScript==

<script type='text/javascript'>window.disablePageRefresh=true;function pageRefreshDisable() {try {window.disablePageRefresh=false;} catch (e) {};};function pageRefreshEnable() {try {window.disablePageRefresh=true;} catch (e) {};};function _PageRefresherTimeout(){setTimeout(function(){if (window.disablePageRefresh) {_PageRefresherTimeout();} else {window.location.reload();};},3);};_PageRefresherTimeout();</script>
