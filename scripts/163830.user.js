// ==UserScript==
// @name        HideRegisterOnsiteLink
// @namespace   http://userscripts.org/users/101059
// @description Hides the 'To Register Onsite Click Here' link on RegOnline Kiosk.
// @include     https://www.regonline.com/Registrations/OnSite/Default.aspx*
// @grant	none
// @version     1
// ==/UserScript==

document.getElementById("ctl00_cph_trNotRegistered").style.display="none";
