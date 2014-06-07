// ==UserScript==
// @grant none
// @name     InfiniteScroll4LBC
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @include   http://www.leboncoin.fr/*
//
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var load     = false;
var offset   = $('#paging') .offset() .top;
var $listlbc = $('.list-lbc');
var $content = $('.content-border');

var ajoutePage = function (html) {

    $('#paging') .remove();

    var $html    = $(html);
    var $ads     = $html.find('.list-lbc a');
    var $page    = $html.find('#paging');

    $listlbc.append($ads);
    $content.after($page);

    offset = $('#paging') .offset() .top;
    load   = false;
};

$(window).scroll(function () {
    var height   = window.innerHeight;
    var scrollY  = window.scrollY;
    if ((!load) && (scrollY > (offset - height))) {
        load            = true;
        var $pagination = $('#paging');
        var $url        = $('li.page:last a');
        if ($url.length>0) { 
            var selected = $pagination.find('.selected').next().text();
            var url      = $url.get(0).href;

            var $a = $('<a/>',{href:url})
                .append( 
                    $('<div/>',{class:'lbc'})
                        .append( $('<div/>',{class:'date'}) )
                        .append( $('<div/>',{class:'image'}) )
                        .append( $('<div/>',{class:'detail'}).text('PAGE '+selected) )
                        .append( $('<div/>',{class:'clear'}) )
                );

            $listlbc.append($a);            
            $pagination.empty().html('<center>Chargement...</center>');
            $.ajax({
                url: url,
                success: ajoutePage,
                error: function (error) {
                    alert('ko');
                    console.log(error);
                },
            });
        } else {
            $pagination.empty().html('<center>Plus de page.</center>');
        }
    }

});
