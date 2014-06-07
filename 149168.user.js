// ==UserScript==
// @name			Twitterfall Click Presenter Mode
// @namespace		twitterfallPresentMode
// @description		Clicks "Present Mode"
// @version			0.0.1
// @include			*twitterfall.com*
// ==/UserScript==


(function() {
    var click = document.createEvent("MouseEvents");
    click.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
    button = document.getElementById("presentmode");
    button.dispatchEvent(click);
    button.focus();
}());