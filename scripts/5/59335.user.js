// ==UserScript==
// @name           Pull up categories for Gigazine.net
// @namespace      http://khlog.net/userscripts/gigazine/pullup_categories
// @include        http://gigazine.net/index.php?/news/comments/*
// ==/UserScript==

var g_category_link = new RegExp("^http://gigazine.net/.*/C\\d+/$");

function get_categories() {
    var posted = getElementsByClassName("posted");
    var i;
    for (i = 0; i < posted.length; i ++) {
        var anchors = get_anchors(posted[i]);
        if (anchors.length)
            return anchors;
    }
    return [];
}

function get_anchors(posted) {
    var links = posted.getElementsByTagName("a");
    var i;
    var res = [];
    for (i = 0; i < links.length; i ++) {
        if (links[i].href.match(g_category_link)) {
            res.push(links[i].cloneNode(true));
        }
    }
    return res;
}

function _getElementsByClassNamePattern(pat, parent) {
    var node = (parent) ? parent : document;
    var all = node.getElementsByTagName('*');
    var i;
    var res = [];
    for (i = 0; i < all.length; i++) {
	if (all[i].className.match(pat))
	    res.push(all[i]);
    }
    return res;
}


function getElementsByClassName(cls, parent) {
    var pat = new RegExp("\\b" + cls + "\\b");
    return _getElementsByClassNamePattern(pat);
}


function insert_below_title(categories) {
    var title = getElementsByClassName("title")[0];
    var parent = title.parentNode;
    var i;
    for (i = 0; i < categories.length; i++) {
	categories[i].style.marginRight = "9px";
	if (categories[i].innerHTML.match(/^\s*広告\s*$/))
	    categories[i].style.backgroundColor = "pink";
        parent.insertBefore(categories[i], title);
    }
}


(function () {
    window.addEventListener("load", function(e){
        var categories = get_categories();
	if (categories) {
	    insert_below_title(categories);
	}
    }, false);
})();
