// ==UserScript==
// @name           Sort Youtube Comments 
// @namespace      ytubecommentsort
// @include        http://www.youtube.com/*
// ==/UserScript==

if (location.href.toString().indexOf("all_comments?") != -1) 
	init();
	
	
function init() {
	//remove all nodes from the comment area, storing them in an array
	//sort based on their ratings
	//return sorted array
	//add nodes back into place
	
	var sortLink = document.createElement("a");
	var options = document.getElementById("threaded-option");
	sortLink.setAttribute("href", "#");
	sortLink.appendChild(document.createTextNode("Sort by rating"));
	sortLink.addEventListener("mousedown", function() {
		options.innerHTML = options.innerHTML.replace("<strong>Sort by time</strong>", "<a href=\""+document.location.href+"\">Sort by time</a>");
		options.innerHTML = options.innerHTML.replace("<a href=\"#\">Sort by rating</a>", "<strong>Sort by rating</strong>");
		sortByRating()
	}, true);
	document.getElementById("threaded-option").innerHTML += " | ";
	document.getElementById("threaded-option").appendChild(sortLink);
}

function sortByRating() {
	var uls = document.getElementsByTagName("ul");
	var commentArea;
	for (var i in uls)
		if (uls[i].className == "comment-list")
			commentArea = uls[i];
	var comments = commentArea.getElementsByTagName("li")
	var com = new Array();
	for (var i in comments) {
		com.push(comments[i]);
	}
	comments = commentSort(com);
	commentArea.innerHTML = "";
	for (var i in comments) {
		commentArea.appendChild(comments[i]);
	}
}

//shuffle the comments by rating (highest to lowest)
function commentSort(arr) {

	if (arr.length <= 1)
		return arr;
	
	var swapped;
	var count = 0;
	do {
		swapped = false;
		for (var i=0; i<arr.length-1; i++) {
			if (parseInt(arr[i].getAttribute("data-score")) < parseInt(arr[i+1].getAttribute("data-score"))) {
				var temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
				swapped = true;
			}
		}
		
	} while (swapped)
	
	return arr;
}