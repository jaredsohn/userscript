// ==UserScript==
// @name          Poonifier
// @grant         none
// @namespace     wtf.lolwat
// @description   Poon
// @include       http://*reddit.com*
// @include       https://*reddit.com*
// @version       1.0.2
// ==/UserScript==

function setArrows() {
	$('.arrow.up').css('background-position', '0 0')
	$('.arrow.upmod').css('background-position', '-32px 0')
	$('.arrow.down').css('background-position', '0 -32px')
	$('.arrow.downmod').css('background-position', '-32px -32px')
}

$(document).ready(function () {
	$('*').css('font-family', 'Comic Sans MS');
	
	$('body').css('background', '#eee url(http://b.thumbs.redditmedia.com/QH1pfvFXLoZ48oOy.jpg) no-repeat fixed center center')
	
	$('.midcol').css('width', '32px !important')
	
	$('.arrow').css('width', '64px')
	$('.arrow').css('height', '32px')
	$('.arrow').css('background-image', 'url(http://i.imgur.com/xxQpD7y.png)')
	$('.arrow').click(setArrows)
	setArrows()
	
	$('.entry').css('background-image', 'url(http://b.thumbs.redditmedia.com/mQCfZnU1o57_A_DO.png)')
	
	$('a.title').prepend(document.createTextNode('Giant '))
	$('a.title').append(document.createTextNode(' in the butt'))
});
