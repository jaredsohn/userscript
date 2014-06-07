// ==UserScript==
// @name           BayImgSort
// @namespace      http://zeb.fuhost.net
// @description    Sort the BayImg tag cloud
// @include        http://*bayimg.com/cloud*
// ==/UserScript==

// Declare miscellaneous variables
var links = document.getElementsByTagName('a')
var ct
var i = 0
var tagnames = new Array(links.length)
var temp
var main

// Create Sort link on Cloud Page
main = document.getElementsByTagName("li")
if (main) {
	var sort = document.createElement("li");
	sort.innerHTML = '<li><a href="sort">Sort</a></li><li>|</li>'
    main[0].parentNode.insertBefore(sort, main[0])
}


// Create function to execute when Sort is clicked    	
sort.addEventListener(
    'click', 
    function(event) { 
    	
    	// Collect all links on the page
    	for (ct = 5; ct < (links.length - 1); ct++) {
 			temp = links[ct].innerHTML
 				
 				// Extract the links for tag pages
				if (temp.indexOf("tag")) {
					tagnames[i] = links[ct].innerHTML
					i++
				}
			}
			
		// Sort the tagnames array			
		tagnames.sort()
		
		// Create newBody variable as container for sorted list HTML
		var newBody = '<ul class="none">'
		for (i = 0; i < (tagnames.length - 1); i++) {
			newBody += '<li><a href="/tag/'
			newBody += tagnames[i]
			newBody += '" style="text-decoration:none">'
			newBody += tagnames[i]
			newBody += '</a></li>'
		}
		newBody += '</ul>'
		
		// Replace the Tag Cloud with the new sorted list
		dv = document.getElementsByTagName("div")
		dv[8].innerHTML = newBody
	event.stopPropagation();
    event.preventDefault();
	}, true)
    ;
