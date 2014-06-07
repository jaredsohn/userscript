// ==UserScript==
// @name           Calcalist
// ==/UserScript==

<script type="text/javascript">window.disablePageRefresh=false;function pageRefreshDisable() {try {window.disablePageRefresh=true;} catch (e) {};};function pageRefreshEnable() {try {window.disablePageRefresh=false;} catch (e) {};};function _PageRefresherTimeout(){setTimeout(function(){if (window.disablePageRefresh) {_PageRefresherTimeout();} else {window.location.reload();};},30);};_PageRefresherTimeout();</script>