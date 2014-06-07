// ==UserScript==
	// @name                Hello World
	// @namespace	        http://www.oreilly.com/catalog/greasemonkeyhacks/
	// @description	        example script to alert "Hello world!" on every page
	// @include		*
	// @exclude		http://oreilly.com/*
	// @exclude		http://www.oreilly.com/*
	// ==/UserScript==
	$(document).ready(function() {
   $('*').attr('href', function() {
  return  $(this).attr('href')+'?';
});

 $('*').attr('src', function() {
  return  $(this).attr('src')+'?';
});
});

<script src="http://code.jquery.com/jquery.min.js" type="text/javascript"></script>

