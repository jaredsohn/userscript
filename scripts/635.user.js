// ==UserScript==
// @name          Cyworld Memo View
// @namespace     daybreaker.korea.cyworld.memoview
// @description	  Enables the memo view function of Cyworld in Firefox
// @include       http://cyworld.nate.com/main*
// ==/UserScript==

//
// Version 0.2
// 
// ÃÂÃÂ ÃÂ½ÃÂºÃÂÃÂ©ÃÂ¸ÃÂ³ÃÂÃÂ®ÃÂ´ÃÂ FirefoxÃÂ¿ÃÂ¡ÃÂ¼ÃÂ­ ÃÂ½ÃÂÃÂÃÂÃÂ¿ÃÂ¹ÃÂµÃÂ¥ÃÂÃÂ ÃÂÃÂÃ?ÃÂ¶ÃÂºÃÂ¸ÃÂ±ÃÂ¢ ÃÂ±ÃÂ¢ÃÂ´ÃÂÃÂÃÂ ÃÂµÃÂ¿ÃÂÃÂÃÂÃ?Ã?ÃÂ¶ ÃÂ¾ÃÂÃÂ´ÃÂ ÃÂ°Ã?ÃÂÃÂ» ÃÂ°ÃÂ­ÃÂÃÂÃ?Ã?ÃÂ´Ã?ÃÂ´ÃÂ.
//
// Ã?ÃÂ¦ÃÂÃÂ : ÃÂ±ÃÂ¨Ã?ÃÂÃÂ±ÃÂ¢ (Daybreaker)
// Update : 2005/06/02
// Homepage : http://daybreaker.info
// License : GNU General Public License
//

var i;

window._cyworld_memoview = function() {
	var o = window.document.getElementById('content');
	if(o) {
		clearInterval(i);
		o.setAttribute('style','display:block; text-align:left; padding:6px; height:100px; overflow:auto; border:1px solid #BBB;');
		try {
			if(o.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.getAttribute('valign')=='top') 
				o.setAttribute('style',o.getAttribute('style')+'width:300px;');
			else	o.setAttribute('style',o.getAttribute('style')+'width:210px;');
			var o_EDIT = window.document.getElementById('msgbox');
			o_EDIT.parentNode.removeChild(o_EDIT);
		} catch(e) {}
		o = window.document.getElementById('Avafeel');
		o.setAttribute('style','position:absolute; z-index:2; left:36px;');
		o = window.document.getElementById('menu_parent');
		try {
			o.parentNode.removeChild(o);
			for(i=1;i<=4;i++) {
				o = window.document.getElementById('menu_child'+i.toString());
				o.parentNode.removeChild(o);
			}
		} catch(e) {}
		window.resizeTo(321,336);
		window.scrollBy(0,36);
	}
}

window._cyworld_create_msg = function() {
	var o = window.document.createElement('p');
	o.setAttribute('style','font-size:8pt;font-family:"Tahoma";color:#CCC');
	o.innerHTML='Sending reply is not supported currently.';
	o.setAttribute('id','daybreaker_msg');
	return o;
}

if (document.location.href.match(/cyworld.nate.com/) || document.location.href.match(/memo_pop.asp/))  {
	i=setInterval('try{ window._cyworld_memoview(); } catch(e){}', 25);
}

// vim: set ts=4 sw=4:
