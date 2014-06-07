// ==UserScript==
// @name           Hide FB Comments
// @namespace      *
// @description    Hides fb:comment elements
// ==/UserScript==



// Hide comments
var comments = document.getElementsByTagName('fb:comments');
var element;
for( var i = 0;  (element=comments[i] ) != null; i++ ){	
	element.style.display = 'none';
}

// Hide like-box
var comments = document.getElementsByTagName('fb:like-box');
var element;
for( var i = 0;  (element=comments[i] ) != null; i++ ){	
	element.style.display = 'none';
}


// Hide title and instructions
var divs = document.getElementsByTagName('div');
var element;
for( var i = 0;  (element=divs[i] ) != null; i++ ){	
	if(element.id=='fbcomments' || element.className=='comment_instructions'){
		element.style.display = 'none';
	}
}
