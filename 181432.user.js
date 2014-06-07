// ==UserScript==
// @name FC2 Ads Remover
// @version 1.0
// @namespace tag:kusagame.wordpress.com,2013-11-03:FC2-Ads-Remocer
// @description Remove Ads in FC2 Blog that has not updated for a while automatically.
// @include http://*.fc2.com/*
// ==/UserScript==

/**************************************************
  FC2 Ads Remover
  Copyright (c) 2013  kusagame
  Released under the GPL Version 3 license.
  License : http://www.gnu.org/licenses/gpl-3.0.html

  For details, see the web site:
                http://kusagame.wordpress.com/
**************************************************/

var bnr = document.getElementById('fc2_bottom_bnr');
if (bnr) { 
    bnr.parentNode.removeChild(bnr);
}