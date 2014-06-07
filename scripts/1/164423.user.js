// ==UserScript==
// @name        Diaspora replace single title
// @namespace   deusfigendi
// @description replaces the title of the singleview by a real headline instead of whole content
// @include     https://pod.geraspora.de/posts/*
// @version     1
// ==/UserScript==

function strip_off_html(element) {
    // What a tag looks like
    var matchTag = /<(?:.|\s)*?>/g;
    // Replace the tag
    return element.replace(matchTag, "");
}

function replace_title_by_headline() {
	var new_title = "Beitrag";
	var content_div = document.getElementById("post-content");
	if (content_div.getElementsByTagName("h1").length > 0) {
		new_title = strip_off_html(content_div.getElementsByTagName("h1")[0].innerHTML);
	} else if (content_div.getElementsByTagName("h2").length > 0) {
		new_title = strip_off_html(content_div.getElementsByTagName("h2")[0].innerHTML);
	} else if (content_div.getElementsByTagName("h3").length > 0) {
		new_title = strip_off_html(content_div.getElementsByTagName("h3")[0].innerHTML);
	} else if (content_div.getElementsByTagName("h4").length > 0) {
		new_title = strip_off_html(content_div.getElementsByTagName("h4")[0].innerHTML);
	} else if (content_div.getElementsByTagName("h5").length > 0) {
		new_title = strip_off_html(content_div.getElementsByTagName("h5")[0].innerHTML);
	} else if (content_div.getElementsByTagName("header").length > 0) {
		new_title = strip_off_html(content_div.getElementsByTagName("header")[0].innerHTML);
	}
	
	document.getElementsByTagName("title")[0].firstChild.data = new_title;
}

window.setTimeout(replace_title_by_headline,1000);
