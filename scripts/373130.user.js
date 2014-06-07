// ==UserScript==
// @name        Bonnaroo Subreddit CSS
// @namespace   BonnarooSubReddit
// @description Add the 2014 Banner to the Bonnaroo Subreddit CSS
// @metadata    BOnnaroo,Reddit
// @include     http://www.reddit.com/r/bonnaroo/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @version     0.3
// ==/UserScript==

$(document).ready(function()
  {
	//Green: #00FF01
	//Pink: #FA01F9
	//Blue: #06AEF9
    //DarkBlue: #013A45
      
	$('a').css('color','#013A45');
	$('#header-img-a').html("<img id=\"header-img\" alt=\"bonnaroo\" src=\"http://i.imgur.com/c3bNJaz.jpg\">");
	$('#header').css('background-color','#00FF01').css( 'background-image', 'none' );
    $('.fancy-toggle-button .remove').css( 'background-image', 'none' ).css('background-color','#FA01F9').css('color','#fff');
	$('#header-bottom-right').css('background-color','#06AEF9');
	$('#sr-header-area').css('background-color','#06AEF9');
    $('.tabmenu li a').css('background-color','#06AEF9');
    $('.selected a').css('background-color','#fff').css('color','#06AEF9');
    $('.flair').css('background-color','#FA01F9');
    $('.link .score.likes').css('color','#FA01F9');
    $('#sr-header-area, #sr-more-link').css('background-color','#06AEF9');
  });
