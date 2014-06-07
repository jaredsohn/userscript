// ==UserScript==
// @name           StarCraft II Beta Key Watch
// @namespace      
// @description    Fuck you Jeff.
// @include http://www.facebook.com/photo.php?pid=*
// ==/UserScript==

setTimeout(function() {
	
	var key = prompt('Enter Key');
	if(key == null) {
		return;
	}
	
	var frm = '<form id="asdfasjhfjkasdhfjkasdjkfhas" action="https://us.battle.net/account/management/add-game.xml?" method="post" target="_blank"><input type="hidden" name="gameKey" value="'+ key +'"></form>';
	document.body.innerHTML += frm;
	
	var form = document.getElementById('asdfasjhfjkasdhfjkasdjkfhas');
	form.submit();
		// 
		// GM_xmlhttpRequest({
		// 	method: "POST",
		// 	url: "https://us.battle.net/account/management/add-game.xml",
		// 	data: "gameKey="+ key,
		// 	headers: {
		// 		"Content-Type": "application/x-www-form-urlencoded"
		// 	},
		// 	onload: function(response) {
		// 		if(response.responseText.indexOf("error.claim") == -1) {
		// 			alert('You won!');
		// 		}
		// 	}
		// });
}, 10);