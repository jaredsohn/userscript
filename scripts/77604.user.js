// ==UserScript==
// @name           Dragoncave eggs description highlighter
// @version        0.0.1
// @namespace      krwq_dragoncave
// @description    Dragoncave 

// @include        http://dragcave.net*

// @history        0.0.1 pierwsza wersja

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==

var green = ['This egg is sitting in front of the others.'];

$(function()
{
  $("div").each(function(index)
   {
    for (var i = 0; i<green.length; i++)
     {
      if ($(this).text().indexOf()!=-1)
       {
        $(this).text('<font color="green"><b>'+$(this).text()+'</b></font>');
        break;
       }
     }
   });
});