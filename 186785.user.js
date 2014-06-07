// ==UserScript==
// @name           nCore Üzenet bipp
// @namespace      ForWhhy
// @include        https://ncore.cc/index.php*
// @exclude        https://ncore.cc/inbox.php*
// @downloadURL   https://userscripts.org/scripts/source/186785.user.js
// @updateURL     https://userscripts.org/scripts/source/186785.meta.js
// @version      v 0.6beta
// ==/UserScript==

	//Ellenőrizze, hogy aktiv-e a böngészőablak
	document.onmousemove = resetTimer;
	document.onkeydown = resetTimer;
	window.onload = function() {
	screenTimer = setTimeout(inactive, 60000);
		//Üzenetek számának kiolvasása
		var uzi = document.getElementsByClassName("i_e_pmcount")[0];
		//Üzenet hangja
		var audio = new Audio();
		var audiotobb = new Audio();
		audio.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=hu&q=%20%C3%BCzenete%20%C3%A9rkezett';
		audiotobb.src ='http://translate.google.com/translate_tts?ie=utf-8&tl=hu&q='+uzi.innerHTML+'%20.%20%C3%BCzenete%20%C3%A9rkezett';
		//Üzenet hang lejátszása ha van olvasatlan üzenet
		if(uzi.innerHTML > 0 & uzi.innerHTML < 2){audio.play();}
		if(uzi.innerHTML > 1){audiotobb.play();}
	}
	function inactive(){
		window.setTimeout(function(){location.reload()},3000)
	}
	 function resetTimer(e) {
		clearTimeout(screenTimer);
		screenTimer = setTimeout(inactive, 60000);
	}