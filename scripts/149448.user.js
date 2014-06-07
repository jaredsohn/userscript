// ==UserScript==
// @name       Cookie Warning Hider
// @version    0.1.1
// @description  attempts to auto hide any cookie warnings on a webpage
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include    http*://*
// @copyright  2012, Chris Bradbury
// ==/UserScript==

$("div:visible").each(function(key,value){var id=$(this).attr('id').toLowerCase();if(id.indexOf("cookie")>=0){$('#'+id).hide();console.log(id+' hidden');}var class1=$(this).attr('class').toLowerCase();if(class1.indexOf("cookie")>=0){$('.'+class1).hide();console.log(class1+' hidden');}});$("span:visible").each(function(key,value){var id=$(this).attr('id').toLowerCase();if(id.indexOf("cookie")>=0){$('#'+id).hide();console.log(id+' hidden');}var class1=$(this).attr('class').toLowerCase();if(class1.indexOf("cookie")>=0){$('.'+class1).hide();console.log(class1+' hidden');}});