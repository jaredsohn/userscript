// ==UserScript==
// @name           Antichat.ru Quick Posting Buttons
// @include        *://forum.antichat.*/*
// @exclude        *://forum.antichat.*/newreply.php*
// @exclude        *://forum.antichat.*/newthread.php*
// @author         mr.The
// @homepage       http://mrthe.name/
// @version        1.0
// ==/UserScript==

function loader() {
var html = '<table cellpadding="0" cellspacing="0" border="0"><tr>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'B\', \'\')"><img src="fusion/editor/bold.gif" alt="Жирный" width="21" height="20" border="0" /></a></div></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'I\', \'\')"><img src="fusion/editor/italic.gif" alt="Курсив" width="21" height="20" border="0" /></a></div></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'U\', \'\')"><img src="fusion/editor/underline.gif" alt="Подчеркнутый" width="21" height="20" border="0" /></a></div></td>' +
		'<td><img src="fusion/editor/separator.gif" alt="" width="6" height="20" /></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'LEFT\', \'\')"><img class="image" src="fusion/editor/justifyleft.gif" alt="Выравнить по левому краю" width="21" height="20" border="0" /></a></div></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'CENTER\', \'\')"><img class="image" src="fusion/editor/justifycenter.gif" alt="Выровнить по центру" width="21" height="20" border="0" /></a></div></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'RIGHT\', \'\')"><img class="image" src="fusion/editor/justifyright.gif" alt="Выравнить по правому краю" width="21" height="20" border="0" /></a></div></td>' +
		'<td><img src="fusion/editor/separator.gif" alt="" width="6" height="20" border="0" /></td>' +
		'<td><img src="fusion/editor/separator.gif" alt="" width="6" height="20" border="0" /></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'IMG\', \'http://\')"><img src="fusion/editor/insertimage.gif" alt="Вставить рисунок" width="21" height="20" border="0" /></a></div></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="namedlink(\'URL\')"><img src="fusion/editor/createlink.gif" alt="Вставить гиперссылку" width="21" height="20" border="0" /></a></div></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="namedlink(\'EMAIL\')"><img src="fusion/editor/email.gif" alt="Вставить ссылку на E-mail" width="21" height="20" border="0" /></a></div></td>' +
		'<td><img src="fusion/editor/separator.gif" alt="" width="6" height="20" border="0" /></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'CODE\', \'\')"><img src="fusion/editor/code.gif" alt="Вставить тег [CODE]" width="21" height="20" border="0" /></a></div></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'HTML\', \'\')"><img src="fusion/editor/html.gif" alt="Вставить тег [HTML]" width="21" height="20" border="0" /></a></div></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'PHP\', \'\')"><img src="fusion/editor/php.gif" alt="Вставить тег [PHP]" width="21" height="20" border="0" /></a></div></td>' +		
		'<td><img src="fusion/editor/separator.gif" alt="" width="6" height="20" border="0" /></td>' +
		'<td><div class="imagebutton"><a href="#" onclick="return vbcode(\'QUOTE\', \'\')"><img src="fusion/editor/quote.gif" alt="Вставить тег цитаты [QUOTE]" title="Вставить тег цитаты [QUOTE]" width="21" height="21" border="0" /></a></div></td>' +
	'</tr></table>';
	document.getElementById('controlbar').innerHTML=html;
	document.getElementById('qr_message').style="width:600px; height:150px"
}


// Wait until the page is fully loaded

window.addEventListener( 'load', function( e ) {
	loader();
},false);
