// ==UserScript==
// @name         Sectionary New Posts
// @namespace    None
// @version      0.1
// @description  enter something useful
// @include      *hackforums.net/*
// @copyright    2013, Vazity @ HackForums.net
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js 
// ==/UserScript==

var link, ForumID;

// Insert the Forum ID between the quotation marks (e.g. 25 for The Lounge)
ForumID = "25";

link = "<a href='http://www.hackforums.net/search.php?action=getnew&fid="+ForumID+"'>Sectionary New Posts</a>";

$("#panel").append(" | "+link); 