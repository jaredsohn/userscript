// ==UserScript==
// @name        Random Thought Thread remover
// @namespace    Random Thought Thread remover
// @include http://threxx28.com
// @include http*://threxx28.com
// @include http*://threxx28.com/*
// ==/UserScript==


function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

// the guts of this userscript
function main() {

	jQuery('.row').each(function(){ 
		var thistext = jQuery('.topictitle', this).text();
		if( thistext.match(/^random thought/i) ) $(this).hide();
	}); 
}

// load jQuery and execute the main function
addJQuery(main);

