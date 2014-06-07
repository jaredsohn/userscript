// ==UserScript==
// @name        TeiserComments
// @namespace   http://localhost/
// @description Facebook Comments support for all *.teiser.gr pages.
// @include     http://*.teiser.gr/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant       none
// @version     1.0
// ==/UserScript==

window.fbAsyncInit = function() {
    FB.init({
        appId: '673004752714291',
        status: true,
        xfbml: true
    });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var parentElem, width;
switch(document.domain) {
    case 'www.teiser.gr':
        parentElem = $('.article');
        width = 628;
        break;
    case 'icd.teiser.gr':
        parentElem = $('.article-content');
        width = 544;
        break;
    case 'engineering.teiser.gr':
        parentElem = $('.article-text-indent');
        width = 455;
        break;
    case 'pde.teiser.gr':
        parentElem = $('#divMain');
        width = 810;
        break;
    case 'geo.teiser.gr':
        parentElem = $('.art-article');
        width = 583;
        break;
    case 'accounting.teiser.gr':
        parentElem = $('.article');
        width = 550;
        break;
    case 'modip.teiser.gr':
        parentElem = $('.node');
        width = 706;
        break;
    case 'rescommittee.teiser.gr':
        parentElem = $('.item-page');
        width = 660;
        break;
    case 'lib.teiser.gr':
        parentElem = $('#main_content_full');
        width = 542;
        break;
    case 'noc.teiser.gr':
        parentElem = $('.content');
        width = 510;
        break;
}

$('<div/>').text('Σχόλια: ')
           .css({
               'font-size': '12px',
               'margin-top': '30px',
               'margin-bottom': '10px'
           })
           .appendTo(parentElem);
$('<div/>').attr('id', 'fb-root')
           .appendTo(parentElem);
$('<div/>').attr('id', 'fb-comments')
           .attr('class', 'fb-comments')
           .attr('data-href', window.location.href)
           .attr('data-width', width)
           .attr('data-num-posts', '10')
           .appendTo(parentElem);
FB.XFBML.parse(document.getElementById('fb-comments'));