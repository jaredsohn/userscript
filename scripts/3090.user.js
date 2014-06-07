// ==UserScript==
// @name         Technorati and Del.icio.us Tag adder
// @namespace    http://browservulsel.blogspot.com/
// @description  v0.3.1 - Lets you add tags to your Blogger posts in a flexible stylable way.<ul><li>Tags can easily be modified on existing or draft posts as they are read back into the tag input field!</li><li>Tags are placed in a unordered list, which make them easy to style!</li><li>You can easily add sites to tag.</li><li>Separate tags using a comma.</li></ul>
// @include	     http://*blogger.com/post-*
// @include	     http://*blogger.com/blog-this.g*
// ==/UserScript==

/*

	Author: Jasper de Vries, jepsar@gmail.com
	Date:   2006-01-03

*/

function tagSite(name, tagLink) {
	this.name = name;
	this.tagLink = tagLink;
}
tagSites = new Array();
//tagSites[tagSites.length] = new tagSite('Technorati', '<a href="http://www.technorati.com/tag/${tag}" rel="tag">${tag}</a>');
tagSites[tagSites.length] = new tagSite('Del.icio.us', '<a href="http://del.icio.us/sogi/${tag}" rel="tag">${tag}</a>');


function addTags() {
	var tagSplit = document.getElementById('tags').value.split(/\s*,\s*/);
	var tags = '';
	if (tagSplit[0] != '') {
		for (i = 0; i < tagSites.length; i++) {
			tags += '\n<div class="tags">';
			if (tagSites.length > 1) {
				tags += tagSites[i].name +' t';
			}
			else {
				tags += 'T';
			}
			tags += 'ags: <ul>';
			for (j = 0; j < tagSplit.length; j++) {
				tags += '<li> '+ tagSites[i].tagLink.replace(/\$\{tag\}/g, tagSplit[j]) +' </li>';
			}
			tags += '</ul></div>\n';
		}
		// Blogger post?
		if (unsafeWindow.document.forms.stuffform.textarea) {
			unsafeWindow.document.forms.stuffform.textarea.value += tags;
		}
		// Compose mode?
		if (document.getElementById('richeditorframe')) {
			document.getElementById('richeditorframe').contentDocument.body.innerHTML += tags;
		}
	}
}

// Blogger post?
if (self.location.href.indexOf('blogger.com/post-') > 0) {
	var ta = document.getElementById('textarea');
	if (ta) {
		var tags = '';
		var post = document.createElement('div');
		post.innerHTML = ta.value;
		try {
			var divs = post.getElementsByTagName('div');
			for (var i = 0; i < divs.length; i++) {
				if (divs[i].className == 'tags') {
					var tagAs = divs[i].getElementsByTagName('a');
					for (var j = 0; j < tagAs.length; j++) {
						tags += tagAs[j].text;
						if (j+1 < tagAs.length) tags += ', ';
					}
					break;
				}
			}
		} catch(e) {}
	
		ta.value = ta.value.replace(/(\n)*<div class=\"tags\">(.|\n)+<\/div>/, '');
	
		var tagRow = document.createElement('tr');
		document.getElementById('titles').getElementsByTagName('tbody')[0].appendChild(tagRow);
		tagRow.innerHTML = (
			 '<th><label for="tags">Tags:</label></th>'
			+'<td><input id="tags" class="text" style="width:650px" tabindex="2" value="'+ tags +'"></td>'
		);
		document.getElementById('f-title').style.width = '650px';
	
		document.getElementById('saveDraft').addEventListener('click', addTags, false);
		document.getElementById('publishPost').addEventListener('click', addTags, false);
	}
}
// Blog this?
else if (self.location.href.indexOf('blogger.com/blog-this.g') > 0 && document.getElementById('Editor')) {
	var tagDiv = document.createElement('div');
	tagDiv.innerHTML = '<label for="tags">Tags:</label> <input id="tags" style="width:448px" tabindex="3">';
	document.getElementById('Editor').insertBefore(tagDiv, document.getElementById('buttons'));
	
	var draftBtn = document.getElementById('saveDraftButton');
	draftBtn.removeAttribute('onclick');
	draftBtn.addEventListener('click', function(){
		addTags();
		unsafeWindow.saveAsDraft();
	}, false);
	
	var postBtn = document.getElementById('publishPostButton');
	postBtn.removeAttribute('onclick');
	postBtn.addEventListener('click', function(){
		addTags();
		unsafeWindow.publishPost();
	}, false);
}


