// ==UserScript==
// @name        Amazon Discount
// @namespace   tag:seven.issimo@gmail.com,2011-11-01:amazon-discount
// @author      Sevenissimo <seven.issimo@gmail.com>
// @version     0.3
// @description Displays discount rates directly on Amazon search/list pages.
//
// @include        http://www.amazon.com/s/*
// @include        http://www.amazon.com/b/*
// @include        http://www.amazon.co.uk/s/*
// @include        http://www.amazon.co.uk/b/*
// @include        http://www.amazon.it/s/*
// @include        http://www.amazon.it/b/*
//
// ==/UserScript==


(function () {
	// Convert text to float.
	function toPrice(text) {
		return parseFloat(text.replace(/,/, '.').replace(/[^0-9\.]*/g, ''));
	};
	
	// Calculate discount rate.
	function calcDiscount(oldPrice, newPrice) {
		return Math.round(100 - ((newPrice * 100) / oldPrice));
	};
	
	
	function updateDiscount(parentNode) {
		if (parentNode == null)
			parentNode = document;
		
		// Get all prices in parentNode
		nodes = document.evaluate('//div[@class="newPrice"]', 
		                          parentNode, 
		                          null, 
		                          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		                          null);
		for (var i = 0; i < nodes.snapshotLength; i++) {
			node = nodes.snapshotItem(i);
			
			// Try to get old and new prices
			// Expected DOM: <anchor> <span> <strike> <span>
			if (node.children.length == 4) {
				oldPrice = toPrice(node.children[2].innerHTML);
				newPrice = toPrice(node.children[3].innerHTML);
				
				// Create and append discount rate field
				discount = document.createElement('span');
				discount.innerHTML = "(-" + calcDiscount(oldPrice, newPrice) + "%)";
			
				node.appendChild(discount);
			}
		}
	}
	
	
	// Add listener to catch all AJAX page changes
	main = document.getElementById('main');
	main.addEventListener('DOMNodeInserted', function (event) {
		console.log('Inserted Node: ' + event.target.tagName + '#' + event.target.id);
		
		// Filter inserted results by classes
		// 2 matches expected: <div#atfResults> <div#btfResults>
		if (event.target.className == 'list results ') {
			updateDiscount(event.target);
		}
	}, true);
	
	
	// First run, on page load
	updateDiscount();
	
})();
