// ==UserScript==
// @name          Show IDs
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(':input').each(function(){
	var currentitem = $(this).attr('id');
	$(this).after('<span style="color:#1a921a; font: bold 10px  verdana">' + currentitem + '</span>')
});