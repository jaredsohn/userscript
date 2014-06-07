// ==UserScript==
// @name           Facebook Feedfilter
// @namespace      anukool.junnarkar
// @description    Exclude stuff (currently 'X likes Y' and 'X is now friends with Y') from facebook's stream.
// @include        http://www.facebook.com/
// ==/UserScript==

/* Filters: */

var img_filters = ['img spritemap_4a20ge sx_eff5a1', // 'Like' image
		   'img spritemap_8g7zwg sx_7265c3']; // 'Friend' image

/* Functional programming functions: */

function map(array, fn) {
    var len = array.length;
    var newArr = [];
    for (var i = 0; i < len; i++) {
	newArr[i] = fn(array[i]);
    }
    return newArr;
}

function each(array, fn) {
    var copy = map(array, function (i) i);
    var len = copy.length;
    for (var i = 0; i < len; i++) {
	fn(copy[i]);
    }
}

function some(array, fn) {
    var len = array.length;
    for (var i = 0; i < len; i++) {
	if (fn(array[i])) {
	    return true;
	}
    }
    return false;
}

/* Condition testing functions: */

function checkStreamSrc(curr_img_class) {
    return some(img_filters, function (img_class) img_class == curr_img_class);
}

/* Main: */

function removeFromStream() {
    var allItems = document.getElementsByClassName("uiStreamStory");

    // Filter!
    each(allItems, function (elt) {
	    var text = elt.getElementsByClassName("uiStreamMessage")[0].textContent;

	    var tmp = elt.getElementsByClassName("uiStreamSource")[0];
	    var img_class = tmp.getElementsByTagName("i")[0] ? tmp.getElementsByTagName("i")[0].className : "";

	    if (checkStreamSrc(img_class)) {
		elt.parentNode.removeChild(elt);
		// GM_log("Removed " + text);
	    } else {
		// GM_log("Kept " + text);
	    }
	});
}

removeFromStream();
setInterval(removeFromStream, 10000);