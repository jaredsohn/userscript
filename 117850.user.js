// ==UserScript==
// @name           Songmeanings.net Selection Enable
// @namespace      imadethisup.selectionenable
// @description    Allows the user to select (and copy) lyric text
// @include        http://www.songmeanings.net/songs/view/*
// ==/UserScript==

var $;

(function(){

	var lyricdiv = document.getElementById("songText2"); //Get the Div which the lyrics are contained in.
	lyricdiv.className = "SOMETHINGRANDOM"; //Change the class to stop any possible interference
	lyricdiv.setAttribute('style', '');
	lyricdiv.setAttribute('unselectable', 'off');
	//Make it selectable by removing the dynamically added styles (-moz-user-select, etc) and the unselectable tag
	
	WaitForJQuery(); //Wait until JQuery is loaded before trying to use it.
	
})();

function WaitForJQuery() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
			UnbindCtrl();
        }
}

function UnbindCtrl() {
	$(this).unbind(); //Unbind control handlers (Ctrl+A,C,S)
}