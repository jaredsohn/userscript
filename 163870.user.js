// ==UserScript==
// @name       Search Autocompletion for Bangumi.tv
// @version    0.1
// @description  利用B站的自动补全实现BGM站的自动补全
// @require    http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js
// @require    http://lib.sinaapp.com/js/jquery-ui/1.10.2/jquery-ui.min.js
// @include    http://bgm.tv/*
// @include    http://bangumi.tv/*
// @include    http://chii.in/*
// @author     Bonegumi
// ==/UserScript==

$(document).ready(function(){
    $("head").append("<link rel='stylesheet' type='text/css' href='http://lib.sinaapp.com/js/jquery-ui/1.10.2/themes/smoothness/jquery-ui.min.css' />");

/*        Note: 
 *         For the reason that userscript runs inside Greasemonkey sandbox environment, 
 *         the callback of $.getJSON is not work. So the GM_xmlhttpRequest is uesed to instead of $.getJSON.
 *         If this autocomplete feature is used in normal webpage, just import jQuery and then use $.getJSON.
 */

    function getSuggest (request,response) {
/*        $.getJSON("http://www.bilibili.tv/suggest?jsoncallback=?&term=" + request.term, function (data) {
                response($.map(data, function (item) {
                    return {
                        label: item.value,
                    };
                }));
        });
*/
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://www.bilibili.tv/suggest?term=" + request.term,
            onload: function(responseDetails) {
                var data = eval(responseDetails.responseText);
                response($.map(data, function (item) {
                    return {
                        label: item.value,
                    };
                }));
            }
        });
    }

    $.fn.extend({
        autoComplete: function (submitElement,appendTo) {
            this.autocomplete({
                source: function (request, response) {
                    getSuggest (request,response);
                },select: function (event, ui) {
                    this.value = ui.item.value;
                    var form = $(submitElement);
                    form.submit();
                    return false;
                },appendTo: appendTo
            });
        }
    });
    
    $.ui.autocomplete.prototype._renderItem = function( ul, item){
        var term = this.term.split(' ').join('|');
        var re = new RegExp("(" + term + ")", "gi") ;
        var t = item.label.replace(re,"<b>$1</b>");
        return $( "<li></li>" )
        .data( "item.autocomplete", item )
        .append( "<a>" + t + "</a>" )
        .appendTo( ul );
    };
    
    $("#search_text").autoComplete("#searchfrom",".SearchBar");    
    $(".searchInputL").autoComplete("#searchHomeBox form","#searchHomeBox");
});