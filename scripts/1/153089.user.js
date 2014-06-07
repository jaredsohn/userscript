// ==UserScript==
// @name       Followshows tracker
// @namespace  http://followshows.com
// @version    0.2
// @description  enter something useful
// @match      http://followshows.com/tracker*
// @copyright  2012+, Koen T'Sas
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
$(document).ready(function() {
    $(".header-actions").prepend('<div class="btn-group"><a class="btn btn-small uptodates" href="#">Toggle uptodates</a></div>');
    
    $(document).on("click", ".uptodates", function(){
        $("#tracker tbody tr.uptodate").each(function(){
           $(this).toggle();
        });
    });
});