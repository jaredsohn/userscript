// ==UserScript==
// @name          Pixiv Hide Bookmarks
// @namespace     http://www.funkafied-69.com/gmscripts
// @description   Hides the Bookmarks and Image Response images on the Pixiv artist view page.
// @include       http://www.pixiv.net/member.php*
// @grant		  none
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version       1.1
// ==/UserScript==

var elements = $("div.worksListOthersImg.linkStyleWorks");
//console.log(elements.length);

for (var i=0; i<elements.length; i++) {
	$(elements[i]).attr('class', $(elements[i]).attr('class')+' hideUs');
	//console.log($(elements[i]).attr('class'));
}

var toHide = $(".hideUs");

for (var i=0; i<toHide.length; i++) {
	$(toHide[i]).css('display', 'none');
	//console.log('...');
	
}

var headers = $(".worksListOthersTitle");

$(headers[1]).click(function() {
	$(elements[0]).toggle();
});

$(headers[2]).click(function() {
	$(elements[1]).toggle();
});

$(headers[1]).append('<p style=float:right;font-style:italic;color:#888888;cursor:pointer;">Show/Hide</p>');
$(headers[2]).append('<p style=float:right;font-style:italic;color:#888888;cursor:pointer;">Show/Hide</p>');