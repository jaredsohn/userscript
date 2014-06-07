// ==UserScript==
// @name           NYT unbowdlerizer
// @description    Are you annoyed that the New York Times refuses to print swear words? Now you can fix that.
// @namespace      http://blog.voyou.org/
// @include        http://*.nytimes.com/*

// ==/UserScript==

function main() {
	var title_word = /\b[A-Z][A-Za-z]*[a-z]/g;
	var lower_word = /\b[a-z]+/g;
	var upper_word = /\b[A-Z][A-Z]+/g;
	var body = document.getElementsByTagName('body')[0];
	traverseChildNodes(body, function(node) {
		var text = node.data;
		text = text.replace(lower_word, 'fuck')
			.replace(title_word, 'Fuck')
			.replace(upper_word, 'FUCK');
		node.data = text;		
	});
}

function traverseChildNodes(node, f) {
 
    var next;
 
    if (node.nodeType === 1) {
        // (Element node)
 
        if (node = node.firstChild) {
            do {
                // Recursively call traverseChildNodes
                // on each child node
                next = node.nextSibling;
                traverseChildNodes(node, f);
            } while(node = next);
        }
 
    } else if (node.nodeType === 3) {
        // (Text node)
	f(node);
    }
 
}

main();

