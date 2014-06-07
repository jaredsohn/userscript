// ==UserScript==
// @name        Ajax lifeboxset lists
// @namespace   ajax_lifeboxset_lists
// @description This will load the articles in lifeboxset.com lists without reloading the page.
// @include     http://www.lifeboxset.com/*
// @version     1.2
// ==/UserScript==
$(document).on('click',".pagination-btns a",function(e){
    e.preventDefault();
    $clicked = $(this)
    clicked_href = $clicked.attr('href');
    $clicked.css({"background-color":"gray"});
    $clicked.attr('href','#');
    $.get(clicked_href,function(data){
        $DOM = $.parseHTML(data);
        $article = $($DOM).find('article');
        $('article').html($article.html())
        history.pushState({}, "", clicked_href);

    })
});
