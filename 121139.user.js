// ==UserScript==
// @author         Nate Sisk 
// @version        0.3
// @name           Metagaming Chat Text Color
// @namespace      http://example.com
// @description    Use to automatically color your text in the chatbox.
// @include        http://metagaming.co.uk/forum.php
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
	
	$(function()
{
  var textcolor = 'blue';
  var precolor = '[color='+textcolor+']';
  var postcolor = '[/color]';
  

  $('.controls_send').bind('click', function()
  {
	var text = $('.controls.add').children('.controls_message').val();
	if (text != '')
	{
		$('.controls.add').children('.controls_message').val(precolor+text+postcolor);
	}
	
	text = $('.controls.edit').children('.controls_message').val()
	if (text != '')
	{
		$('.controls.edit').children('.controls_message').val(precolor+text+postcolor);
	}
  });
});
