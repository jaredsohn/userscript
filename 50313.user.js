// ==UserScript==
// @name           Gonintendo Comment Count
// @description    Displays how many comments have been made for currently displayed story.
// @include        *
// ==/UserScript==


var URL = window.location.href;

var new_comment_match = /http:.*gonintendo\.com\/viewstory.*/i.test(URL);

var archived_comment_match = /http:.*gonintendo\.com\/viewwpcomments.*/i.test(URL);

if (new_comment_match == true){


var body = document.getElementsByTagName("body")[0].innerHTML;

var reg = /<div class="commenttext">/ig;

var result = body.match(reg);


if (!result){
	
	document.body.innerHTML = document.body.innerHTML.replace(/<h3>Story Feedback<\/h3>/, "<h3>0 Comments</h3>");
}

else{

var num = result.length;

document.body.innerHTML = document.body.innerHTML.replace(/<h3>Story Feedback<\/h3>/, "<h3>" + num + " Comments</h3>");

}
}

else if (archived_comment_match == true){
	
	// ==UserScript==
// @name           Gonintendo Comment Count
// @description    Displays how many comments have been made for currently displayed story.
// @include        *
// ==/UserScript==


var body = document.getElementsByTagName("body")[0].innerHTML;

var reg = /<div class="wpcomment">/ig;

var result = body.match(reg);


if (!result){
	
	document.body.innerHTML = document.body.innerHTML.replace(/<h3><span name=\"KonaFilter\">Archived comments<\/span><\/h3>/, "<h3>0 Archived Comments</h3>");
}

else{

var num = result.length;

document.body.innerHTML = document.body.innerHTML.replace(/<h3><span name=\"KonaFilter\">Archived comments<\/span><\/h3>/, "<h3>" + num + " Archived Comments</h3>");

}
}