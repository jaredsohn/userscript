// ==UserScript==
// @name           BRChan Board/Thread Reloader
// @include        http://brchan.org/*
// @include        http://www.brchan.org/*
// @exclude        http://brchan.org/
// @exclude        http://www.brchan.org/
// @exclude        http://brchan.org/menu.php
// @exclude        http://www.brchan.org/menu.php
// @exclude        http://brchan.org/news.php
// @exclude        http://www.brchan.org/news.php
// @exclude        http://brchan.org/banlist.php
// @exclude        http://www.brchan.org/banlist.php
// @exclude        http://www.brchan.org/manage_menu.php
// @exclude        http://brchan.org/manage_menu.php
// @exclude        http://www.brchan.org/manage_page.php
// @exclude        http://brchan.org/manage_page.php
// @exclude        http://brchan.org/manage.php
// @exclude        http://www.brchan.org/manage.php
// @version        0.8001
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

if ($('.replymode')[0]) {

         $('body').append('<input type="submit" id="tzps" value="Atualizar Thread" style="width:200px; position:fixed; bottom:15px; right:15px; font-size:15px;">');
         $('#tzps').click(function() {
         var threadurl = $(location).attr('href');
         $('#delform').fadeOut('slow').load(threadurl + ' #delform').fadeIn('slow');
         });

} else {

         $('body').append('<input type="submit" id="tzps" value="Atualizar Board" style="width:200px; position:fixed; bottom:15px; right:15px; font-size:15px;">');
         $('#tzps').click(function() {
		 var boardurl = $(location).attr('href');			   
		 $('#delform').fadeOut('slow').load(boardurl + 'board.html #delform').fadeIn('slow');
         });

}