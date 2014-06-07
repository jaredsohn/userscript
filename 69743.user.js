// ==UserScript==
// @name      	Whips Siggy 2.1
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
	
	var sig = "[b]a49erfan is lame and GMan is dog (dang dyslexia kicked in)[/b]"; //<<<< edit between the "" marks
	
	//------------ end signature ---------//

	var text = document.getElementById('reply_box').value;	
	text += "\n" + "\n" + sig;
	document.getElementById('reply_box').value = text;
}