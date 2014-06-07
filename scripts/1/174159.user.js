// ==UserScript==
// @name       LMA Changes
// @version    0.1
// @description  enter something useful
// @match      http://*www.lovemyanime.net/*
// @copyright  2012+, You
// ==/UserScript==
/*
 * www.lovemyanime.net##DIV[style="height:185px; width: 304px; background: #1a1a1a;"]
www.lovemyanime.net##DIV[class="ads center"]
*/
$(document).ready(function(){
    $('#right-sidebar div')[0].remove();
    $('#right-sidebar div')[0].remove();
    $('#right-sidebar div')[0].remove();
    $('.amin_box .amin_box_mid_chat').css('height','600px');
    $('.amin_box .amin_box_mid_chat embed').attr('height','600');
});