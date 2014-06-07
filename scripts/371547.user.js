// ==UserScript==
// @name       Pivotal Tracker Story Numbers
// @namespace  http://masukomi.org/
// @homepage   https://github.com/masukomi/pt_numbers
// @updateURL  https://raw2.github.com/masukomi/pt_numbers/master/pt_numbers.js
// @downloadURL https://raw2.github.com/masukomi/pt_numbers/master/pt_numbers.js
// @version    0.1
// @description  displays the story numbers in pivotal tracker so that you can easily reference a particular one.
// @match      https://www.pivotaltracker.com/s/projects/*
// @copyright  2014+, masukomi.org
// @author masukomi
// ==/UserScript==

function loadStoryNumbers(){
	console.log("running loadStoryNumbers");
	var preview_headers = $('div.items div.item header.preview');
	preview_headers.each(function(index){
		var parent_elm = preview_headers[index].parentNode;
		var id = parent_elm.className.split(/ +/)[0].split(/_/)[1];
		if (id != null){
			displayStoryNumberInHeader(id, preview_headers[index])
		}
	});
}

function displayStoryNumberInHeader(story_number, header_element){
	$("<div class='story_number preview'>" + story_number + "</div>").insertBefore(header_element.firstChild);
}

setTimeout(loadStoryNumbers, 2000);



