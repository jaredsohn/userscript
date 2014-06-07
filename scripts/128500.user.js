// ==UserScript==
// @name           Sas Chat
// @namespace      OgRe
// @version		   2.0
// @include        http://*.ogame.*/game/index.php?page=*
// @require        http://code.jquery.com/jquery-1.5.1.min.js
// ==/UserScript==

GM_addStyle((<><![CDATA[
#sChatClose
{
	background-image: url("http://gf1.geo.gfsrv.net/cdn0b/d55059f8c9bab5ebf9e8a3563f26d1.gif");
	display : inline-block;
	width : 22px;
	height : 22px;
	float : right;
	margin : -4px 25px 0 0;
	cursor : pointer;
}
.scOpen { background-position : 0 -22px; }
.scClose { background-position : 0 0; }
.scShow { height: 400px; }
.scHide { height: 0; }
.scHeaderContent
{
	color: #6F9FC8;
	margin: 0px 0 0 20px;
	font-weight: bold;
	display: inline-block;
	width: 60%;
}
.scFooter {
    background: url("http://gf1.geo.gfsrv.net/cdnbe/04a7b39dc27c29c4c2cadd3fd44ec0.gif") no-repeat scroll 0 0 transparent;
    display: block;
    height: 29px;
    margin: 0;
    padding: 0;
}
.scHeader {
    background: url("http://gf1.geo.gfsrv.net/cdnef/bfb16d45a8ab1ca15ca3029feb8b44.gif") no-repeat scroll 0 0 transparent;
    height: 25px;
    padding: 9px 0 0 30px;
}
#scFrameBody {
    background: url("http://gf1.geo.gfsrv.net/cdn03/db530b4ddcbe680361a6f837ce0dd7.gif") repeat-y scroll 0 0 transparent;
}
#inhalt #sChat
{
	width: 670px;
	z-index: 1100;
}
]]></>).toString());

(function() {
	var chatopen = GM_getValue('chatopen');
    var icon = (chatopen=="chatOpen") ? "scOpen" : "scClose";
    var show_hide = (chatopen=="chatOpen") ? "scShow" : "scHide";
	$frame = $('<iframe>', {
				'id' : 'saschat',
				'class' : 'scFrame',
				'src': 'http://sas.kurl.hu/chat/index.php',
				'css': {'padding': '0 10px 0 13px', 'width' : 640, 'height': 420}
				});

    $('<div>', {'id':'sChat', 'class':'sChat'}).insertAfter('#inhalt .c-right');
	$('<div>', {'class':'scHeader'}).appendTo('#sChat');
	$('<h3>', {'class':'scHeaderContent'}).text("Szövetségi cset").appendTo('.scHeader');
    $('<a>', {'id' : 'sChatClose', 'class' : icon }).appendTo('.scHeader');
    $('<div>', {'id':'scFrameBody', 'class' : show_hide}).appendTo('#sChat');
    $('<div>', {'class':'scFooter'}).appendTo('#sChat');

	if(chatopen=="chatOpen")
		$frame.appendTo('#scFrameBody');

	$('#sChatClose').click(function(){
		if($(this).attr('class') == "scOpen")
		{
			GM_setValue('chatopen', 'chatClose');
			$frame.remove();
			$('#scFrameBody').animate({height: '0'}, 500);
			$(this).removeClass().addClass('scClose');
		}
		else
		{
			GM_setValue('chatopen', 'chatOpen');
			$frame.appendTo('#scFrameBody');
			$('#scFrameBody').animate({height: '400px'}, 500);
			$(this).removeClass().addClass('scOpen');
		}
	});

})();

