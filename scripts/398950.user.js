// ==UserScript==
// @name       ReadSO
// @namespace  http://www.google.fr/
// @version    0.2
// @description  Tout SO pour les conards
// @match      http://www.sudouest.fr/*
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    if( $('.short').length ) {
        $('.entry-content').append('<input type="button" value="lire article" id="ReadSO" class="tag">')
        $("#ReadSO").css("top", 0).css("left", 0);
        
        $('#ReadSO').click(function(){ 
            $('.short').css("display", "none");
            $('.fade').css("display", "none");
            $('.long').css("display", "block");
            $('#ReadSO').css("display", "none");
        });
    }
});