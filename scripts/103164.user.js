// Basecamp - TODO tags
//
// ==UserScript==
// @name        Basecamp - TODO tags
// @version     0.1
// @description Changes the Colour of TODOs based on custom tags
// @namespace   https://www.awnist.com/
// @include     https://*.updatelog.*/*
// @include     https://*.clientsection.*/*
// @include     https://*.seework.*/*
// @include     https://*.grouphub.*/*
// @include     https://*.projectpath.*/*
// @include     https://*.basecamphq.*/*
// @include     http://*.updatelog.*/*
// @include     http://*.clientsection.*/*
// @include     http://*.seework.*/*
// @include     http://*.grouphub.*/*
// @include     http://*.projectpath.*/*
// @include     http://*.basecamphq.*/*
// ==/UserScript==
//

document.tags = {
	// Keywords that will remain same color go in here
	// keyword: '#EFFFB3'
};

document.default_colors = [
	// Array of colors to be automatically assigned to found keywords
	'#EFFFB3',
	'#B3FFB4',
	'#FFCAB3',
	'#B3CAFF',
	'#E8B3FF',
	'#FFB3E3',
	'#B3FFD5',
	'#FFE3B3'
	];

// Find all text nodes with [keyword]
textnodes = document.evaluate(".//span//text()[contains(.,'[') and contains(.,']')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var u = 0; u < textnodes.snapshotLength; u++) {

	node = textnodes.snapshotItem(u);	

        var html = node.parentNode.innerHTML;

        if (html.match(/\[\w+\]/))
        {
                node.parentNode.innerHTML = html.replace(/\[(\w+)\]/g, function(m,k){
        		// Guess a color if we don't have one set
	        	if (typeof document.tags[k] == 'undefined') { document.tags[k] = document.default_colors.shift(); }

		        // Wrap in span
		        return '<span class="keytag" style="color: #666666; -moz-border-radius: 10px; -webkit-border-radius: 10px; padding: 1px 7px; background-color: '+document.tags[k]+'">'+k+'</span>';
                });
        }

}
