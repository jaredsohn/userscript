// ==UserScript==
// @name        Respond to posts on AoSHQ
// @namespace   none
// @description Adds a "Respond" button after each post on the AoSHQ boards
// @include     http://minx.cc/*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function(){
 if($('#idContentoEdit1').length) {

  $('#ace_comments>div:visible').each(function(){

    $(this).after('<button onclick="$(\'#idContentoEdit1\').focus();$(\'#idContentoEdit1\').contents().find(\'body\').html(\'[i]\'+$(this).prev().html().replace( /<a.*?>/, \'\' ).replace(\'</a>\',\'\')+\'<br>\'+$(this).next().text()+\'[/i]\');window.location.hash=\'idContentoEdit1\';">Respond</button>');
    
  });
 } else {
 
   $('#ace_comments>div:visible').each(function(){

    $(this).after('<button onclick="$(\'#ctext\').focus();$(\'#ctext\').val(\'[i]\'+$(this).prev().html().replace( /<a.*?>/, \'\' ).replace(\'</a>\',\'\')+\'<br>\'+$(this).next().text()+\'[/i]\');window.location.hash=\'ctext\';">Respond</button>');
  }); 
 } 
});