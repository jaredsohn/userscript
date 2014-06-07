// ==UserScript==
// @name          Hack Forums - Special Links
// @namespace     Tetrimartial
// @description   Adds time spent online to home page 
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 	  1.0
// ==/UserScript==
var regex = /\(Unread(.*?)\)/;
var revised = "(Unread $1)  | <a href='showgroups.php'>Show Groups</a> | <a href='stafflist.php'>Staff List</a> | <a href='modlist.php'>Mod List</a> <form method=\"post\" action=\"search.php\"><input type=\"hidden\" name=\"action\" value=\"do_search\" /><input type=\"text\" class=\"textbox\" name=\"keywords\" size=\"35\" maxlength=\"250\" /><input type=\"hidden\" name=\"postthread\" value=\"1\" />";
document.getElementById('panel').innerHTML= document.getElementById('panel').innerHTML.replace(regex,revised);;

