// ==UserScript==
// @name           Syrnia Bot Check Alarm (SPEAKING)
// @include        *syrnia*game.php*
// @version                3.0
// ==/UserScript==
function checkBotcheck() {
	if (document.getElementById("botImage")!=null) {
		try{
  		document.getElementById('ifrm').outerHTML = "";
  	}catch(err){}
		var el = document.createElement("iframe");
		el.setAttribute('id', 'ifrm');
		el.height = 0;
		el.width = 0;
		document.body.appendChild(el);
		el.setAttribute('src', 'http://translate.google.com/translate_tts?tl=en&q=Bot+check+has+appeared');
		setTimeout(checkBotcheck, 10000);
	} else {
try{
  		document.getElementById('ifrm').outerHTML = "";
  	}catch(err){}
		setTimeout(checkBotcheck, 1000);
	}
}
checkBotcheck();