// ==UserScript==
// @name           TESZT
// @author         ErikPowa
// @version        2010-08-07
// @namespace      http://userscripts.org/scripts/show/48293
// @description    nop
// @include        http://www.piratesbg.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//<a href="/Publicpages/UserProfile.aspx">erikpowa</a>

$(document).ready(function () {
try 
{

var l_Index = 0;
var l_Search = '<a href="/Publicpages/UserProfile.aspx">';
l_Index = document.body.innerHTML.indexOf(l_Search);
l_Index = l_Index + l_Search.length;
alert(l_Index);
var str = document.body.innerHTML.substring(l_Index, document.body.innerHTML.indexOf('<', l_Index) );
alert(str);

} catch (e) { alert(e); }});


      