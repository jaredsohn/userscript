// ==UserScript==
// @name		Gathering of Tweakers - Automatically show new messages
// @author		Redsandro
// @namespace	userscripts
// @description	Automatically show new forum posts on last page.
// @include		http://gathering.tweakers.net/*
// @include		https://gathering.tweakers.net/*
// @_require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant		none
// @version		0.1.1
// ==/UserScript==


/*
$("#newMessages").change(function(){
	showNewMessages();
});
*/

/*
RefreshTimer().remove('newMessageNotifier')
var rsMsgWord = 'function updateNotification(errorMsg)';
var rsMsgInsert = window.newMessageNotifier.toString().indexOf(rsMsgWord) + rsMsgWord.length;
var rsMsgStr = window.newMessageNotifier.toString().slice(0,rsMsgInsert) + "{showNewMessages()}; function poop()" + window.newMessageNotifier.toString().slice(rsMsgInsert);
eval(rsMsgStr);
*/


document.getElementById('newMessages').addEventListener( 
	'DOMSubtreeModified', 
	function() { 
		document.getElementById('newMessageNotification').onclick(); 
		//document.getElementById('newMessageNotification').style.display = "none";
		//document.getElementById('newMessageNotification').setAttribute("style","display: none;");
	}, 
	false 
);