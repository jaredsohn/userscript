// ==UserScript==
// @name           sportdb helper
// @description    invert select checkboxes default value
// @include        https://www.sportdb.ch/extranet/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version        1.0
// @copyright      free
// @license        free
// ==/UserScript== 

//================================= 


$(document).ready(function()
 {

$("td.alt :checkbox").each( 
    function() { 
       // Insert code here 
       $(this).attr('checked', true);
    } 
);


} );



