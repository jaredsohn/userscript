// ==UserScript==
// @name      	Whips Siggy 2
// @namespace	goallineblitz.com
// @include	http://goallineblitz.com/game/forum_thread.pl*
// @author	Whipsnard
// @version	2009.08.06
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
	
	var sig = "[b]Rev 6:17[/b][i] For the great day of their wrath has come, and who will be able to survive? [/i]"; //<<<< edit between the "" marks
	
	//------------ end signature ---------//

	var text = document.getElementById('reply_box').value;	
	text += "\n" + "\n" + sig;
	document.getElementById('reply_box').value = text;
}