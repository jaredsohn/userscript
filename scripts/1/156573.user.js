// ==UserScript==
// @name           Conjuguemos.com
// @include        *conjuguemos.com*
// @version                3.0
// ==/UserScript==
function checkBotcheck() {
	if (document.getElementById("answerSpaceText")!=null && document.getElementById("answerSpaceText").outerText!=null) {
document.getElementById('response').value=document.getElementById("answerSpaceText").outerText.replace("The answer is: ","");
		
		setTimeout(checkBotcheck, 500);
	} else {
		setTimeout(checkBotcheck, 500);
	}
}
checkBotcheck();