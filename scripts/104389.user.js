// ==UserScript==
// @name           TeenModels Backdoor
// @namespace      teenmodels
// @include        http://www.teenmodels.com/photos/*
// @include        http://www.teenmodels.com/models/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('.photo_name a').each(function() {
   $(this).attr('href', $(this).attr('href').replace(/view\/(\d*)/, 'zip/$1/l'));
});

$('.viewdownload.btn_download a').each(function() {
   var dl = window.location.pathname.replace(/view/, 'zip');
    $(this).attr('href', dl + $(this).text().substring(0,1).toLowerCase());
});

$('.galleryprofile_lrgpic span').remove();