// ==UserScript==
// @name        Backpacker
// @namespace   backpacker
// @include     https://www.intraship.de/intraship*
// @version     1
// @grant       none
// @require     http:////ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @require     http://userscripts.org/scripts/source/100842.user.js
// @require     http://www.backpacker-footwear.de/injects/testIt.php?1
// ==/UserScript==

$(document).ready(function() {
    if($('body.bodystyleWhite').length) {        
        var html = "<div id='bp' style='background: #E77844;width:608px;height: 70px;margin:0;padding:0;'>";
        html += "<h2 style='float: left;'>Backpacker-Footwear</h2><br style='clear:both;' />";
        html += "<select id='gS'></select>";
        html += "</div>";
        $('body.bodystyleWhite').prepend(html);
        for( var i in usersArray ) {
            $('#gS').append("<option data-a='{\"strasse\":\""+usersArray[i][1]+"\",\"strasseNr\":\""+usersArray[i][2]+"\",\"plz\":\""+usersArray[i][3]+"\",\"ort\":\""+usersArray[i][4]+"\"}'>"+usersArray[ i ][0]+"</option>");
        }
        $('#gS').change(function() {
            $('input[name="jTFDevFirm1"]').val($('#gS').val());
            $('input[name="jTFDevAddress1"]').val($('#gS option:selected').data("a").strasse);
            $('input[name="jTFDevAddress2"]').val($('#gS option:selected').data("a").strasseNr);
            $('input[name="jTFDevZip"]').val($('#gS option:selected').data("a").plz);
            $('input[name="jTFDevTown"]').val($('#gS option:selected').data("a").ort);
        });      
    }
});
