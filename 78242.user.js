// ==UserScript==
// @name           Talkback Flatener
// @namespace      sleeponit
// @description    Velvet Talkbacks
// @include        http://www.ice.co.il/*
// ==/UserScript==

function nonHebrew(txtElm) {
	if (txtElm.textContent.match('.*[א-ת].*'))
		return;
	if (!txtElm.textContent.match('.*[A-Za-z].*'))
		return;
	txtElm.style.direction = 'ltr';
	txtElm.style.textAlign = 'left';
}

window.addEventListener(
    'load',
    function() { 
	var talkbacks = unsafeWindow.document.getElementsByClassName('bdytalk');
	if (!talkbacks || !talkbacks.length)
		return;
	for (var i = 0; i < talkbacks.length; i++) {
		nonHebrew(talkbacks[i]);
		talkbacks[i].style.paddingLeft = '10px';
		talkbacks[i].parentNode.style.lineHeight = "140%";
		talkbacks[i].parentNode.onclick = undefined;
		talkbacks[i].parentNode.style.cursor = "auto";
	}

	var article = unsafeWindow.document.getElementById('articleBody');
	if (!article)
		return;
	nonHebrew(article);
	article.style.lineHeight = "140%";
	article.style.fontSize = "11pt";
	var imgs = article.getElementsByTagName('img');
	if (!imgs || !imgs.length)
		return;
	for (var i = 0; i < imgs.length; i++)
		imgs[i].style.display = "block";
    },
    true);


