// ==UserScript==
// @name	Xuite Album Expander
// @version	0.0.20100316
// @namespace	http://blog.gslin.org/plugins/xuite-album-expander
// @description	Expand Xuite album
// @homepage	http://github.com/gslin/albumexpander
// @include	http://photo.xuite.net/*
// ==/UserScript==

(function(){
    if (!document.location.href.match(/\/\w+\/\d+(\*\d+)?$/)) {
	return;
    }

    var htmlCode = '';

    var photoItems = document.getElementsByClassName('photo_item');
    var photoItemsLength = photoItems.length;

    for (var i = 0; i < photoItemsLength; i++) {
	try {
	    var el = photoItems[i];

	    var elA = el.getElementsByTagName('a')[0];
	    var elALink = elA.href;
	    var elImg = el.getElementsByTagName('img')[0];
	    var elImgNewUrl = elImg.src.replace('_c', '_l');

	    htmlCode += '<a href="' + elALink + '"><img alt="" src="' + elImgNewUrl + '"></a>';
	} catch(err) {
	}
    }

    try {
	var blogbody = document.getElementsByClassName('blogbody')[1];
	blogbody.innerHTML = htmlCode;
    } catch(err) {
    }
})();
