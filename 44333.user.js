// ==UserScript==
// @name           Google Reader Minor+
// @namespace      Created by Umakanthan Chandran ( http://ukanth.in )
// @description    Adds few minor things that Google missed in Google Reader.
// @include        http*://*.google.*/reader/*
// ==/UserScript==

var classHTML = document.getElementsByClassName("name sub-name name-d-2");
var classHTML1 = document.getElementsByClassName("name sub-name name-d-1");
totalCount = parseInt(classHTML.length) + parseInt(classHTML1.length);

if(document.getElementById('sub-tree-header')) {
	document.getElementById('sub-tree-header').innerHTML = document.getElementById('sub-tree-header').innerHTML +" ( " + totalCount +" ) ";
}

if(document.getElementById('star-selector')) {
    var newDiv = document.getElementById('star-selector');
	var create = document.createElement('div');	 
	create.innerHTML = newDiv.innerHTML;	
	create.setAttribute('id','like_script');	
	create.setAttribute('class','selector');
	create.firstChild.setAttribute('href','/reader/view/user/-/state/com.google/like')
	create.firstChild.firstChild.innerHTML = 'Liked Items';
	create.firstChild.firstChild.nextSibling.setAttribute('class','like-active like')
	document.getElementById('star-selector').parentNode.insertBefore(create,newDiv);   
}