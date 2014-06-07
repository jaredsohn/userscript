// ==UserScript==
// @name           Topics/Forum JVC
// @description    Voir les topics de JVC en direct.
// @include        http://www.jeuxvideo.com/
// @version        1.0
// ==/UserScript==

function update(){jQuery.ajax({url:"",cache:!1,success: function(t){t=t.split('1" summary="">')[1].split("</table>")[0],t!==last&& (last=t,jQuery("#liste_topics").html(t)),update() }})}var last="";update()