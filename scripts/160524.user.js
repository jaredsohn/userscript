// ==UserScript==
// @name    	    4chan Show All Pages
// @namespace	    http://example.com
// @description	    Duh!?
// @include	    http://boards.4chan.org/*/
// @include	    https://boards.4chan.org/*/

// ==/UserScript==
 
(function(){
 
	// Get count of all pages.
	function pageCount() {
		var a = document.querySelectorAll('div.pages a')
		return a.item(a.length-2).getAttribute('href')*1
	}
 
	// Parse HTML response and strip fluff.
	function parsePage(pageHTML) {
		var doc = document.createElement('div')
		doc.innerHTML = pageHTML
		return doc.querySelector('div.board')
	}
	
	// Remove link to page in footer.
	function showProgress(number) {
		var a = document.querySelector('a[href="' + number + '"]')
		var b = document.createElement('b')
		b.innerHTML = number
		a.parentNode.replaceChild(b,a)
	}
 
	// Insert fetched page.
	function insertPage(number,lorem) {
		return function(response) {
			var div = parsePage(response.responseText)
			div.setAttribute('name','page_' + number)
			lorem.appendChild(div)
			showProgress(number)
		}
	}
 
	// Fetch page, asynchronously.
	function fetchPage(number) {
		var lorem = document.createElement('div')
		document.querySelector('#delform').appendChild(lorem)
		GM_xmlhttpRequest({
			method: "GET",
			url: window.location.href + number,
			onload: insertPage(number,lorem)
		})
	}
 
	for (var n = 1, pages = pageCount(); n <= pages; n++) fetchPage(n)
	var node = document.querySelector('input[value="Next"]')
	node.parentNode.removeChild(node)
	
})()
