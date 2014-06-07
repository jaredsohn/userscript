// ==UserScript==
// @name         CS_WH Editor
// @namespace    http://fcamusement.forumvi.com/
// @version      1.0
// @description  Change The Character Sheet's Width and Height
// @copyright    2014+, NCat
// @icon         http://png-4.findicons.com/files/icons/2776/android_icons/48/ic_size_up.png
// @include      http://*/admin*
// @match        http://*/admin*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at       document-start
// @grant        none
// @downloadURL  http://userscripts.org/scripts/source/443958.user.js
// @updateURL    http://userscripts.org/scripts/source/443958.user.js
// ==/UserScript==

$('.forumline .row1:nth-child(2) .gen input').after('<textarea id="meomeo" class="post" type="text" name="field_1" value="" style="min-width:290px;min-height:200px;overflow:visible"></textarea>');
$('.forumline .row1:nth-child(2) .gen input').css('display','none');
takethat = $('.forumline .row1:nth-child(2) .gen input').val();
$('textarea#meomeo').val(takethat);
