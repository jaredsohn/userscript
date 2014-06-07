// ==UserScript==
// @name           captchatradersolver
// @namespace      captchatrader_solver@anythingsthing.de
// @include        http://www.captchatrader.com/captchas/solve
// ==/UserScript==


if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

function checkForImage() {
	imgdiv = document.getElementById('captcha_image');
	if (imgdiv.style.backgroundImage != '') {
		word = generateWord();
		/*reponse = document.getElementById('response');
		response.value = word;*/
		document.forms[0].elements[0].value = word;
		/*document.forms[0].submit();*/
		document.getElementById('response_form').elements[1].click();

		/*captchaTrader.respond($("#response").val());
		$("#response").val("");$("input[type=submit]").attr('disabled',true);*/

		//alert(word);
	}
}

window.setInterval(checkForImage, 10000);

function generateWord() {
	word = '';
	len = Math.round(Math.random(5)) + 5;
	for (var i = 0; i < len; i++) {
		if (Math.random(1) > 0.5) {
			word += String.fromCharCode(Math.round(Math.random(1)*25)+65);
		} else {
			word += String.fromCharCode(Math.round(Math.random(1)*25)+65+32);
		}
	}

	word += ' ';

	len = Math.round(Math.random(5)) + 5;
	for (var i = 0; i < len; i++) {
		if (Math.random(1) > 0.5) {
			word += String.fromCharCode(Math.round(Math.random(1)*25)+65);
		} else {
			word += String.fromCharCode(Math.round(Math.random(1)*25)+65+31);
		}
	}

	return word;
}
