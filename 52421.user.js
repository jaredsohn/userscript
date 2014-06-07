// ==UserScript==
// @name          Whirlpool chatbox
// @namespace     Whirlpoolchatbox
// @description   Adds suite of extra optional features to Whirlpool forums.
// @version       1.0
// @include       http://forums.whirlpool.net.au/*
// @include       http://bc.whirlpool.net.au/*
// @include       http://whirlpool.net.au/*
// @exclude       http://forums.whirlpool.net.au/whim-send*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm*p=-2*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm*&ux* 
// @exclude       http://forums.whirlpool.net.au/forum-replies-print.cfm*
// @exclude       http://forums.whirlpool.net.au/forum-replies-archive.cfm*
// ==/UserScript==
function chatBox(){
	
		if(GM_getValue('chatBoxAvatars')=='no'){
		
			GM_addStyle('.pic {display: none !important;}');
		
		}
	
		GM_addStyle('#root{min-height:1800px}');
		var newDD = $('<DD>');		
		var cBoxW = GM_getValue('cBoxW');
		newDD.html('<br /><a style="font-size:12px;border-bottom:1px solid #525D94;" onmouseover="this.style.cursor=\'pointer\'" onclick="ANY_NAME=window.open(\'http://www.onlinelife.com/chatbox.html\', '+
							'\'chatpop\',\'status=0,directories=0,toolbar=0,location=0,menuBar=0,scrollbars=1,resizable=1,width=700,height=580,left=100,'+
							'top=100\')">Chat (POPUP)</a>'+
							'&nbsp;&nbsp;&nbsp;<a style="font-size:12px;border-bottom:1px solid #525D94;" href="/wiki/?tag=wpplus_chatbox_rules" target="_blank">Chatbox Rules</a>'+
							'<div align="center" style="margin-top:3px;" id="cboxdiv"><iframe frameborder="0" width="'+cBoxW+'" height="300" '+
							'src="http://www6.cbox.ws/box/?boxid=157399&boxtag=t5q2w1&sec=main; sec=main" marginheight="2" marginwidth="2" scrolling="auto" allowtr'+
							'ansparency="yes" name="cboxmain" style="border: 0px solid;" id="cboxmain"></iframe> <iframe frameborder="0" width="170" height="'+
							'75" src="http://www6.cbox.ws/box/?boxid=157399&boxtag=t5q2w1&sec=form;boxtag=1700&amp;sec=form" marginheight="2" marginwidth="2" scrolling="'+
							'no" allowtransparency="yes" name="cboxform" style="border: 0px solid;border-top:0px" id="cboxform"></iframe></div>');	

		docs.uinfo.append(newDD);
	}