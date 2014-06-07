// ==UserScript==
// @name         Leprochart
// @namespace    http://userscripts.org/scripts/show/185913
// @homepage     http://userscripts.org/scripts/show/185913
// @version      0.22
// @author       carwyn
// @contributor  simonov
// @description  Adds some useful functionality for leprochart.com
// @match        http://leprochart.com/
// @copyright    2013+, carwyn
// @run-at       document-end
// @updateURL    https://userscripts.org/scripts/source/185913.meta.js
// @downloadURL  https://userscripts.org/scripts/source/185913.user.js
// ==/UserScript==

$('document').ready(function(){
    if ($('a[href="/signin"]').length < 1){
        var removeRated = function (event) {
            event.preventDefault();
            $('span.music-rating').filter(function(){return $(this).parent().find('a.thumb-down').length<1;}).closest('tr').each(function(i,v){
                    $(v).find('a.fap-single-track').each(function(ind,val){
                        $('#fap-playlist li span').filter(function(){return $(this).text()==$(val).text();}).closest('li').find('div.fap-remove-track').click();
                    });
                    $(v).remove();
            });
        }
        $('#play-all').after('<a id="remove-rated" style="float:right;margin-top:20px;margin-right:2px;" class="btn btn-primary">Убрать оценённые</a>');
        $('#remove-rated').on('click', removeRated);
    }
});
