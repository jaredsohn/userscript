// ==UserScript==
// @include       http://*/admin.php?fID=*
// @name          jQuery multiselector for kh_mod
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require       https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js
// ==/UserScript==

$(".table_actions tbody").selectable({
        filter:'tr',
    stop: function() {        
        $(".ui-selected input", this).each(function() {
            this.checked= !this.checked
          
        });
    }
});