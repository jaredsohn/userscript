// ==UserScript==
// @name       EOS Market NPC remover v3
// @namespace  http://www.capitalism-online.com
// @version    0.5 - add updateURL
// @description  removes NPC from the market page
// @match      http://www.capitalism-online.com/eos/market.php*
// @exclude	   http://www.capitalism-online.com/eos/market.php?view_type=firm*
// @exclude	   http://www.capitalism-online.com/eos/market.php?view_type=prod*
// @copyright  2013+, WNZ
// @updateURL  https://userscripts.org/scripts/show/184518
// ==/UserScript==

function removeNPC(){
    $("tr.b2b_tr").each(function(){
        var row = $(this);
        row.find("a:contains('NPC')").closest("tr").remove();
    });
}
$(document).ajaxStop(removeNPC);