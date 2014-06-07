// ==UserScript==
// @name           GoogleSearchWithDate
// @namespace      http://www.iconicwebworks.com
// @description    Adds the search-by-date option to normal Google Search; defaults to "anytime". 
// @include        http://www.google.com/
// @include        http://www.google.com/search*
// @exclude				 http://www.google.com/*as_qdr*
// ==/UserScript==
// 
// Author: Toby Matejovsky | @tobym | http://www.iconicwebworks.com
// 

(function() {
	
	// Inserts newNode after referenceNode
	function insertAfter(referenceNode, newNode)
	{
		referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
	}

	function addDateSelect() {
		var gDateSelect = document.createElement('select');
		gDateSelect.setAttribute('style', 'margin-left:0.5em;')
		gDateSelect.setAttribute('name', 'as_qdr');
		gDateSelect.innerHTML =
			'<option selected value="all">anytime</option>' +
			'<option value="d">past 24 hours</option>' +
			'<option value="w">past week</option>' +
			'<option value="m">past month</option>' +
			'<option value="y">past year</option>';
			
		// var submitButton = document.getElementsByName("btnG")[0];
		var searchBox = document.getElementsByName("q")[0];
		insertAfter(searchBox, gDateSelect);
	};

	addDateSelect();
	
})();