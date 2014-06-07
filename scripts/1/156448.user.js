// ==UserScript==
// @name        FetLife Enable Image Saving
// @namespace   https://fetlife.com
// @description adds a save image link
// @include     https://fetlife.com/users/*
// @version     1
// @require http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

var fakeimg=$(".picture_container .main_pic .fake_img").css("background-image");
fakeimg = fakeimg.replace('url(','').replace(')','');


//$(".picture_container #picture").append('<a href='+fakeimg+' style="opacity:.8;float:right;padding:3px;"><strong>Save this image</strong></a>');

$(".picture_container #picture .fake_img").html('<img src='+fakeimg+' title="Right click to save this image." />');
//$(".picture_container a:hover").css('border','none');
