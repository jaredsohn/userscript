// ==UserScript==
// @name      	Forum Post Signature for GLB
// @namespace	goallineblitz.com
// @include	http://goallineblitz.com/game/forum_thread.pl*
// @author	d-bo14
// @version	08/09/2009
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
	
	var sig = "[i]test[/i] \n\n [b]line 2[/b]"
	
	//------------ end signature ---------//

	var text = document.getElementById('reply_box').value;	
	text += "\n\n" + "\n\n" + sig;
	document.getElementById('reply_box').value = text;
}