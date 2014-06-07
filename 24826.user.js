// ==UserScript==
// @name           Silverplug
// @namespace      zmarn
// @description    Replaces WMV-Plugin-Player (application/x-mplayer2) with Silverlight WMV-Player from www.jeroenwijering.com.
// @include        http://www.crooksandliars.com/*
// ==/UserScript==
	if(document.getElementsByTagName('embed').length != 0)
	{
	if(document.getElementsByTagName('embed')[0].type == 'application/x-mplayer2')
	{
	var old = document.getElementsByTagName('embed')[0];
	var wmv = document.getElementsByTagName('embed')[0].src;
  var w = document.getElementsByTagName('embed')[0].width;
  var h = parseInt(document.getElementsByTagName('embed')[0].height) + 10;	
  var neu = document.createElement("div");
	neu.innerHTML = '<iframe style="border-style: none; border-width: 0pt; margin-bottom:-25px;" src="http://zmarn.zm.ohost.de/lab/sp/gr.php?wmv=' + wmv + '&h=' + h + '&w=' + w + '" name="schnabeldabel" height="' + h + '" scrolling="no" width=" ' + w + ' ">' +
		'</iframe>';
  old.parentNode.replaceChild(neu, old);
	}}