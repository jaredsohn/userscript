// ==UserScript==

// @name		WikiAdBlock Silent

// @description		Blocks donation banners on the wikimedia projects silently (displays no messages)

// @include		http://*wikipedia.org/wiki*
// @include		http://*wikitionary.org/wiki*
// @include		http://*wikimedia*.org/wiki*
// @include		http://*wikinews.org/wiki*
// @include		http://*wikiversity.org/wiki*
// @include		http://*wikisource.org/wiki*
// @include		http://*wikiquote.org/wiki*
// @include		http://*wikibooks.org/wiki*



// ==/UserScript==

(function() {

//If there is such an element as 'centralNotice', hide it

	if(document.getElementById("centralNotice")) {
		document.getElementById("centralNotice").innerHTML = ''; 
	}
})();