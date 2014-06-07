// ==UserScript==
// @name               Vimgolf challenge duplicate filter
// @namespace      http://lry.be
// @contact            larry.bolt@gmail.com
// @version            0.2
// @description      Filtering duplicate entries and displaying the total unique entries at vimgolf
// @include            http://vimgolf.com/challenges/*
// ==/UserScript==

var a = []; 
jQuery("#content .success").each(function(i,e)
{
  if($.inArray($('pre',e).text(),a)!==-1 && $('p.comment',e).length < 1) 
    $(e).hide();
  else 
    a.push($('pre',e).text());
}).eq(0).before("<p>There are "+a.length+" unique solutions</p>"); 