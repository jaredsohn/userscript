// ==UserScript==
// @name   DIfmLink2forums
// @namespace  http://www.di.fm
// @description Replace the home-link on the new di.fm-site with a link to the forums 
// @include *di.fm*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

// Replace the pointless Home-entry with the forum-link
$('#root header div.wrap nav.main ul li a').each(function(){
	if($(this).text() == 'Home') {
		var elem = $(this)[0];
		//console.log(elem);
		elem.text = 'Forums';
		elem.href = 'http://forums.di.fm';
	}
});
function GM_addStyle(css) {
  var parent = document.getElementsByTagName("head")[0];
  if (!parent) {
    parent = document.documentElement;
  }
  var style = document.createElement("style");
  style.type = "text/css";
  var textNode = document.createTextNode(css);
  style.appendChild(textNode);
  parent.appendChild(style);
}

// adjust the margin of the li-elements in order to not mess up the layout ('Forums' is a longer word than 'Home')
var css = 'header nav.main ul > li {margin-right: 20px;position: static;}';
GM_addStyle(css);