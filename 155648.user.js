// ==UserScript==
// @name       Habr Author Highlight
// @version    0.1
// @match      http://habrahabr.ru/post/*
// @match      http://habrahabr.ru/company/*/blog/*
// ==/UserScript==

(function(){

    function main () {
        var author = $('.author a').html();
        
        $('.comment_item .info .username').each(function(i){
            if($(this).html() == author){
                $(this).parent().css('background','#dfd');
            }
        });
        
    }

    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ main +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);

})();