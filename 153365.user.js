// ==UserScript==
// @name        TumblrBandage.sub: disable fade-in in controls
// @description Adds some simple CSS rules to override annoying fade-in transition effects in Tumblr controls (...<3/reblog/follow/dashboard)
// @namespace   http://tumblrbandage.tumblr.com/
// @include     http://www.tumblr.com/dashboard/iframe*
// @version     1.0
// @run-at      document-start
// @grant       GM_addStyle
// ==/UserScript==

(function(window, content_window, document) {

var GM_addStyle = window.GM_addStyle || function(css) {
	var h = document.getElementsByTagName('head');
	if (h) {
		var style = document.createElement('style');
		style.textContent = css;
		h[0].appendChild(style);
	}
};

function fix_tumblr_controls() {
	GM_addStyle([
		// removes transitions
		'body { -webkit-transition-property:none!important; -moz-transition-property:none!important; -ms-transition-property:none!important; -o-transition-property:none!important; transition-property:none!important; }',

		// fixes startup visibility, opcity, position
		'body.loading { top:0!important; visibility:visible!important; opacity:1!important; }',

		// matter of taste - removes transparency from control buttons
		'.btn.icon { background-color:#444444!important; }'
	].join(''));
}

function excecute() {
	fix_tumblr_controls();
};

excecute();

})(this, this.unsafeWindow || this, document);
