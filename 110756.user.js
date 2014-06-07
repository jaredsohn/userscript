// ==UserScript==
// @name           csfd obrat poradi prispevku v poste
// @namespace      deamonicky script
// @description    Obrátí pořadí příspěvků v poště, takže ty nejnovějěí budou dole (tedy budou v pořadí jak lidé čtou).
// @include        http://www.csfd.cz/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//
// tools used :
// http://jsfiddle.net/ javascript and jquery debugger
// Aptana 3
// Notepad 2
//
// bugs:
// cleared content of scripts.xml and then realized mistake was on @include in this file :-D
//
// ideas from :
//
// http://stackoverflow.com/questions/6219152/jquery-reverse-an-order
// http://api.jquery.com/attribute-starts-with-selector/

/*
$($(".sent,.received").get().reverse()).each(function() {
     $(this).appendTo($(this).parent());
 });
*/

// 
// http://api.jquery.com/multiple-selector/
//
$("[class^=ui-posts-action-list]").append($(".sent,.received").get().reverse());
 
/* 
$(".sent").reverseOrder();//html()="";//remove();
*/