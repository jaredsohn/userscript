// ==UserScript==
// @name        No Limit Sydsvenskan
// @namespace   http://www.sydsvenskan.se/
// @version     0.2.0
// @description Removes poorly implemented paywalls for sydsvenskan.se by (1) deleting cookies and (2) removing paywall elements (if necessary for some reason). Superior to other scripts since they only do the (2).
// @match       http://www.sydsvenskan.se/*
// @copyright   2013
// ==/UserScript==

document.cookie=".visitedPages=; expires=Thu, 01 Jan 1970 13:37:00 GMT; path=/";var body=document.getElementsByTagName("body")[0];null!==body.className.match(/meteredlimit/)&&(body.className=body.className.replace(/meteredlimit/,""),document.getElementById("ctl00_ctl00_ctlWarningPopup_pnlWarningPopup").style.display="none",document.getElementById("ctl00_ctl00_ctlLimitPopup_pnlLimitPopup").style.display="none",document.getElementById("ctl00_ctl00_ctlInfoPopup_pnlInfoPopup").style.display="none");