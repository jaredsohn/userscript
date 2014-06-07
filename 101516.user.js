// ==UserScript==
// @name           Rock Paper Shotgun: Image captions
// @namespace      http://userscripts.org/users/121156
// @description    Use ‘title’/‘alt’ attributes of images on RPS as captions.
// @include        http://*.rockpapershotgun.com/*
// @require        http://code.jquery.com/jquery-1.5.2.min.js
// @require        https://github.com/jaz303/jquery-grab-bag/raw/master/javascripts/jquery.dom-builder.js
// ==/UserScript==

const CLASS_NAME = 'caption';

jQuery(function ($) {
         $('head').append($$('style', '.' + CLASS_NAME + ' { font-size: 0.9em; text-align: center; font-style: italic; display: block; }', { type: 'text/css' }));;
         $('.entry img[title], .entry img[alt]').each(
           function (idx, image) {
             image = $(image);
             var title = $.trim(image.attr('title')), alt = $.trim(image.attr('alt'));

             if (title != "") {
               image.after($$('span', title, { className: CLASS_NAME }));
               image.removeAttr('title');
             } else if (alt != "") {
               image.after($$('span', alt, { className: CLASS_NAME }));
               image.attr('alt', '');
             }
           });
       });