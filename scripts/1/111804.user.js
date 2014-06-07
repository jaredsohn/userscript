// ==UserScript==
// @name           SBC
// @include        *syrnia*game.php*
// @version                2.0
// ==/UserScript==
function checkBotcheck() {
	if (document.getElementById("botImage")!=null) {
		for (i=0;i<=9999;i++){
			window.updateCenterContents('botCheck', i);
		}
	} else {
		setTimeout(checkBotcheck, 10000);
	}
}
checkBotcheck();