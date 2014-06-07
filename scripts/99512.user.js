// ==UserScript==
// @name           Facebook Long Publisher Fixer
// @description    Moves the publish button when facebook publishing frames are too long
// @include        http://www.facebook.com/connect/uiserver.php?*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.6
// @copyright      Charlie Ewing
// ==/UserScript== 

(function() { 
	var version = "0.0.6";

	function run(){
		try{
		var publish=document.getElementById('publish').childNodes[0];
		var newPublish=publish.cloneNode(true);
		var better=document.getElementById('feedform_user_message').parentNode;
		if (newPublish && better) {
			newPublish.setAttribute('id','publishClone');
			better.appendChild(newPublish);
		}
		else window.setTimeout(function(e){run();},500);
		} catch(e){window.setTimeout(function(e){run();},500);}
	}

	run();

})(); // anonymous function wrapper end