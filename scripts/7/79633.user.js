// Style Reddit Comments
// Author: Ictinus
// Released: 21 June 2010
// Updated: 22 June 2010, support for Firefox and native CSS3 
// Updated: 23 June 2010, inset highlight parent comments.
// Updated: 07 July 2010, prevent script running twice with exclude.

// ==UserScript==
// @name			Style Reddit Comments
// @version       1.03
// @namespace     http://ictinus.com/styleredditcomments/
// @description   Style Reddit Comments with inset box shadows and border radius
// @include       http://www.reddit.com/*
// @exclude       http://www.reddit.com/comscore-iframe/*
// ==/UserScript==

//from http://userscripts.org/scripts/review/77390
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}
//end from http://userscripts.org/scripts/review/77390

var styleRedditComments = {
	version : 1.03,
	addGlobalStyle: function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	},

	shade: function () {
		var allDivs, thisDiv;
		allDivs = document.evaluate(
			"//div[contains(@class,'comment')]",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
			thisDiv = allDivs.snapshotItem(i);
			var topParent = thisDiv.parentNode;
			if (hasClass(topParent, "nestedlisting")) {
				addClass(thisDiv, "sub1");
			}
			var theParentComment = thisDiv.parentNode.parentNode.parentNode;
			if (typeof(theParentComment) != 'undefined') {
				if (hasClass(theParentComment, "sub1")) {
					addClass(thisDiv, "sub2");
				} else if (hasClass(theParentComment, "sub2")) {
					addClass(thisDiv, "sub1");
				}
			}
		}
	}
}

if (document.body) { 
styleRedditComments.addGlobalStyle('.content {margin: 7px 310px 0px 5px;} .sub1 {background:#FFF;} .sub2 {background:#F5F5F5;} .comment .child{margin-left:5px; border-left:none;} .comment {-webkit-box-shadow: #BBB 2px 2px 0px inset; -moz-box-shadow: #BBB 2px 2px 0px inset; box-shadow: #BBB 2px 2px 0px inset; border:1px solid #DDD; -webkit-border-radius:3px; -moz-border-radius:3px; border-radius:3px; padding-bottom:0px; padding: 4px 5px 4px 4px; margin: 0px 0px 3px; } .sub1:hover, .sub2:hover{-webkit-box-shadow: #F30 2px 2px 3px inset; -moz-box-shadow: #F30 2px 2px 3px inset; box-shadow: #F30 2px 2px 3px inset; }');
styleRedditComments.shade();
}