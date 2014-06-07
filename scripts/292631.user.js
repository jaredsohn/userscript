// ==UserScript==
// @name        mmmturkeybacon Single Page Queue
// @author      mmmturkeybacon
// @description Puts all HITs in the queue on a single page.
// @namespace   http://userscripts.org/users/523367
// @match       https://*.mturk.com/mturk/myhits
// @match       https://*.mturk.com/mturk/sortmyhits?*
// @match       https://*.mturk.com/mturk/viewmyhits?*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/292631.user.js
// @updateURL   http://userscripts.org/scripts/source/292631.meta.js
// @version     1.0
// @grant       none
// ==/UserScript==

var $searchSpec = $("input[type='hidden'][value^='HITSearch'][name='searchSpec']");
var searchSpec = $searchSpec.val();
var new_searchSpec = searchSpec.replace("#10#", "#25#");
$searchSpec.val(new_searchSpec);