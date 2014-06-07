// ==UserScript==
// @name      	Forum Post Signature
// @namespace	goallineblitz.com
// @include	http://goallineblitz.com/game/forum_thread.pl*
// @author	garrettfoster
// @version	2009.07.15
// ==/UserScript==

window.setTimeout( 
	function() {
		var post = document.getElementById('reply_submit').childNodes[3];
		post.addEventListener('click', attachSig, false);		
	}, 
	1
);

function attachSig(){
	
	//------------ start signature ----------- //
	
	var sig = "http://www.carolinahuddle.com/forum/images/smilies/willy_nilly.gif"; //<<<< edit between the "" marks
	
	//------------ end signature ---------//

	var text = document.getElementById('reply_box').value;	
	text += "\n" + "\n" + sig;
	document.getElementById('reply_box').value = text;
}