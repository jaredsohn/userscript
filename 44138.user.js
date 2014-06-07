// ==UserScript==
// @name           PA Forums Inline Videos Externaliser
// @namespace      forums.penny-arcade.com
// @description    Adds a link to embedded videos to display them in an external popup window, so you can read the thread while having the video up elsewhere
// @include        http://forums.penny-arcade.com/showthread.php*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,20); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	
	var title = $(document).attr('title');
	if (title.match(' - PA Embedded Video$'))
	{
		return;
	}
	
	unsafeWindow.popClosed = function(w)
	{
		$('#posts').width(w);
		popOpen = false;
	}
	
	unsafeWindow.popEmbedded = function(button)
	{
		var w = $(button).closest('table').width();
		var h = $(button).closest('table').height();
		var x = screen.availWidth - w - 30;
		var y = (screen.availHeight / 2) - (h / 2);
		var isNew = false;
		if (typeof popOpen == 'undefined' || popOpen == false) { var isNew = true; };
		pop = window.open('about:blank', 'popWin', 'height='+h+',width='+w+',left='+x+',top='+y);
		popOpen = true;
		if (pop.opener == null) pop.opener = self;
		if (isNew) { popPostWidth = $('#posts').width(); }
		var html = '                                                                                                                          \
		<html>                                                                                                                                \
			<head>                                                                                                                              \
				<title>'+$(button).prev().text()+' - PA Embedded Video</title>                                                                    \
				<link rel="stylesheet" type="text/css" href="/clientscript/vbulletin_css/style-812156bd-00002.css" />                             \
				<style>.popupExternal { display: none; }</style>                                                                                  \
				<script type="text/javascript">                                                                                                   \
					function closed(w)                                                                                                              \
					{                                                                                                                               \
						window.opener.popClosed(w);                                                                                                   \
					}                                                                                                                               \
				</script>                                                                                                                         \
			</head>                                                                                                                             \
			<body onUnload="closed('+popPostWidth+');">                                                                                  \
				<table summary="table" class="tborder" align="center" border="0" cellpadding="6" cellspacing="1" width="1" style="margin: auto;"> \
				'+$(button).closest('table').html()+'                                                                                             \
				</table>                                                                                                                          \
			</body>                                                                                                                             \
		</html>                                                                                                                               \
		'
		
		pop.document.write(html);
		pop.document.close();
		
		if (isNew) { $('#posts').width($('#posts').width()-w); }
		pop.focus();
	}
	
	$('table[summary=table] thead tr td').each(function()
	{
		$(this).append('<span class="popupExternal" onClick="popEmbedded(this)" style="cursor: pointer; position: relative; right: 0; margin-left: 10px; text-transform: uppercase; font-size: 0.8em;">PopEx</span>');
	});
	
}