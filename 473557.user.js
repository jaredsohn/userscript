// ==UserScript==
// @name       MH Post Count
// @version    0.3
// @description  Adds post counts to user posts.
// @updateURL   https://userscripts.org/scripts/source/473557.meta.js
// @downloadURL https://userscripts.org/scripts/source/473557.user.js
// @include      *forums.marvelheroes.com/*
// @require http://code.jquery.com/jquery-latest.js
// @copyright  2014+, Spedwards
// ==/UserScript==

$(document).ready(function(){
   $('span.MItem.PostCount').removeClass('PostCount');

	if (navigator.appCodeName == 'Mozilla') {
		$('div.ButtonBar span.ButtonWrap').each(function(index) {
			switch (index) {
				case 0:
					break;
				case 1:
					$(this).addClass('ButtonBarItalic');
					break;
				case 2:
					$(this).addClass('ButtonBarUnderline');
					break;
				case 3:
					$(this).addClass('ButtonBarStrike');
					break;
				case 4:
					$(this).addClass('ButtonBarCode');
					break;
				case 5:
					$(this).addClass('ButtonBarImage');
					break;
				case 6:
					$(this).addClass('ButtonBarUrl');
					break;
				case 7:
					$(this).addClass('ButtonBarQuote');
					break;
				case 8:
					$(this).addClass('ButtonBarSpoiler').addClass('ButtonOff');
					break;
			}
		});
	}
});