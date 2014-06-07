// ==UserScript==
// @name       woopra bling bling
// @version    0.1
// @description It's just fun
// @grant      none
// ==/UserScript==

$(".widgetContent.pagesWidget:last").on("DOMAttrModified", function() {
	if ($(":contains('Ingatlan lead').key").parent().children(":last").length)

	{
		clickSound = new Audio('http://danielschmidt.me/dollars.mp3');
		clickSound.play();
	}
})