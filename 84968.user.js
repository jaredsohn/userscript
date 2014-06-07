// ==UserScript==
// @name Travis Kingsbauer
// @namespace showpicsinthread
// @description Instead of click through links in a thread, this will show all pictures at once
// ==/UserScript==

javascript: var x= $(".content").find("a").each(function(){var href=$(this).attr("href");if((!$(this).hasClass("drowsapMorphed")) && ($(this).next(".drowsapMorphed").length==0) && href && (href.indexOf('imgur')>=0 || href.indexOf('jpeg')>=0 || href.indexOf('jpg')>=0 || href.indexOf('png')>=0)){var ext =(href.indexOf('imgur')>=0 && href.indexOf('jpg')<0 && href.indexOf('png')<0) ? '.jpg' :''; var img = $("<a class='drowsapMorphed' href='"+href+"' target='blank' style='display:block'><img style='display:block;max-width:780px;' src='"+href+ ext+"' /></a>");$(this).after(img);}});
