// ==UserScript==
// @id             fragbitev3filtersc2
// @name           Fragbite v3 filter SC2
// @version        0.1
// @author         dvr
// @description    Removes SC2 content.
// @include        http://fragbite.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/176893.user.js
// ==/UserScript==

// The first two are more efficiently removed with a userstyle
$('#sections li.item.section-sc2.unselected').remove();
$('.spreadItemSectionId3').remove();

$('a[href*="sc2"]').parent().remove();