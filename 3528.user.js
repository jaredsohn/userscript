// phpBB Quick Edit user script
// version 0.4
// 2007-01-25
// Copyright (c) 2006-7, xamm
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "phpBB Quick Edit", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ChangeLog
// 2007-01-25 - 0.4 - Added error message for when a topic locked.
// 2007-01-23 - 0.3 - Added an image for the Quick Edit which was taken directly from the subSilver SDK on phpBB.com
// 2006-03-12 - 0.2 - Fixed the code for encoding the form data that was corrupted by GM downloading it which I'd never known before
//                    which means my quick reply script has been broken for months and I never knew.
// 2006-03-12 - 0.1 - Initial release
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           phpBB Quick Edit
// @namespace      http://www.otsegolectric.com/greasemonkey/
// @description    Adds a feature allowing you to quickly edit your posts on a phpBB forum
// @include        */viewtopic.php*
// ==/UserScript==

function encodeFormData(formData){ 
	formData = encodeURI(formData);
	var encodedData = ''; 
	var t;
	for(i = 0; i < formData.length; i++){
		t = '' + formData.charCodeAt(i).toString(16).toUpperCase();
		if(t.length == 1)
			encodedData += "%0" + formData.charCodeAt(i).toString(16).toUpperCase(); 
		else
			encodedData += "%" + formData.charCodeAt(i).toString(16).toUpperCase();
	}
	encodedData = decodeURI(encodedData);
	return encodedData;
} 

var addQuickEdit = function(event){
	var editHREF = event.target.previousSibling.href;
	var editHREFPart = editHREF.substring(editHREF.indexOf("posting.php"), editHREF.length);
	var postBody = document.evaluate("//a[@href='" + editHREFPart + "']/../../..//*[@class='postbody']/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	postBody = postBody.snapshotItem(0);
	if(postBody.getElementsByTagName('textarea').length == 0){
		var allElements = postBody.getElementsByTagName('*');
		for(j = 0; j < allElements.length; j++)
			allElements[j].style.display = 'none';
		
		var qeTextArea = document.createElement('textarea');
		var qeSubmit = document.createElement('input');
		var qeIFrame = document.createElement("iframe");
		
		qeTextArea.style.width = '90%';
		qeTextArea.style.height = '200px';
		qeTextArea.style.border = '1px solid #000000';
		qeTextArea.style.paddingLeft = '2px';
		qeTextArea.style.paddingBottom = '2px';
		qeTextArea.value = '\n\n\n\n\n\t\t\tGetting post contents...';
		
		qeSubmit.type = 'submit';
		qeSubmit.value = 'Post';
		qeSubmit.style.border = '1px solid #000000';
		qeSubmit.style.position = 'absolute';
		qeSubmit.addEventListener('click', editPost, true);
		qeSubmit.setAttribute('editHREF', editHREF);

		qeIFrame.style.width = '1px';
		qeIFrame.style.height = '1px';
		qeIFrame.style.display = 'none';
		qeIFrame.src = editHREF;
		qeIFrame.addEventListener('load',
			function(){
				var qeDoc = qeIFrame.contentDocument;
				if(qeDoc.body.getElementsByTagName('textarea').length != 0){
					qeTextArea.value = qeDoc.body.getElementsByTagName('textarea')[0].value;
					qeDoc = qeDoc.getElementsByTagName('input');
					var formData = '';
					for(var i = 0; i < qeDoc.length; i++)
						if(qeDoc[i].name.indexOf('addbbcode') == -1 && qeDoc[i].name.indexOf('helpbox') == -1 && qeDoc[i].name != '')
							if(qeDoc[i].type != 'checkbox' || qeDoc[i].checked != '')
								formData += qeDoc[i].name + '=' + encodeFormData(qeDoc[i].value) + '&';
					qeSubmit.setAttribute('formData', formData);
					qeDoc = null;
				} else {
					var errorMessage = document.evaluate("//*[contains(span, 'edit your own')]|//*[contains(span, 'locked')]", qeDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					alert('Getting post contents failed, the error returned was:\n' + errorMessage.snapshotItem(0).getElementsByTagName('span')[0].innerHTML.split('<')[0]);
					var allElements = postBody.getElementsByTagName('*');
					for(i = 0; i < allElements.length; i++)
						if(allElements[i].style.display == 'none')
							allElements[i].style.display = '';
						else
							allElements[i].style.display  = 'none';
				}
			},
			false);
		postBody.insertBefore(qeSubmit, postBody.firstChild);
		postBody.insertBefore(qeTextArea, postBody.firstChild);
		document.body.appendChild(qeIFrame);
	} else {
		var allElements = postBody.getElementsByTagName('*');
		for(i = 0; i < allElements.length; i++)
			if(allElements[i].style.display == 'none')
				allElements[i].style.display = '';
			else
				allElements[i].style.display  = 'none';
	}
	event.preventDefault();
};

var editPost = function(event){
	var editHREF = event.target.getAttribute('editHREF').split('?')[0];
	var formData = event.target.getAttribute('formData');
	var postContents = encodeFormData(event.target.previousSibling.value);
	event.target.value = 'Submitting...'
	GM_xmlhttpRequest({
		method: 'POST',
		url: editHREF,
		data: formData + 'message=' + postContents,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		onload: function(responseDetails) {
			window.location.reload(false);
		}
	});
};

var editLinks = document.evaluate("//a[contains(@href, 'posting.php?mode=editpost')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < editLinks.snapshotLength; i++){
	var qeLink = document.createElement('img');
	qeLink.setAttribute('title', 'click to edit this post');
	qeLink.style.cursor = 'pointer';
	qeLink.addEventListener('click', addQuickEdit, true);
	qeLink.style.paddingLeft = '2px';
	qeLink.src = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%13%00%00%00%0F%08%06%00%00%00%06D%F4%2C%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v2.64%82%22%10)%00%00%01%20IDAT8O%95%93%BD%8D%840%10%85wK%20%A2%10Z%20%23%A6%04h%E1%12%88Hh%C1-%B8%05Z%40%9B%12%D1%C1%09%DD%05w%C1%06%CC%FA%8D%C6%08%CC%B0%F2Z%1A!%C6%E3%CF%CF%F3s\'%A2%9B%B6%DA%B6%3Dmt%5DwW%83%BD%13%B0%D0%9A%A6q%AE%E3Z%D7%F5%0F~%D9%3B%9DaQ%1A%C8%1D%7C%9Eh%3B%C7%150JU%08%8E%82!%C8%A9%FA%7D%A7%CA%EFi%C0%832-WW%60%0F%9B%A6%89%AC%B5l%1BLS5%8E%23%0D%C3%40%F8%5E%3D%D5%15%D28%9B%9D-%07Xx%A0%EF%7BJ%92%04-Bu%5D%D3%B2%2C%1C%82%02%E1r%E7%1F%04%96TUuT%A6%3D%09%00%80%00%04%D8%18%83%B0%1F%81%C1%FF%05e%5Bk%C4%E4j%9Eg%CA%F3%9C%A1Y%96%7D%8B%22%FC%F7%BE%BD%F8%9910%C8%81%CA%B2%2C%19(%C6%8A6X%2C%C8%A7%A0(%0AJ%D3%F4!c%88%C4%A3%3A%0C%FCH%99%D6c%A2%D0rE%3D%D5%CF%5D%F8%0D%8B%E2*%F9%BFoX%B4%84%A84%EA%C0%EE%F3%A0%5D%12%CE%B3%B4%88%7D%01gd3%B4%8Ft%0E%E4%00%00%00%00IEND%AEB%60%82';
	editLinks.snapshotItem(i).parentNode.insertBefore(qeLink, editLinks.snapshotItem(i).nextSibling);
}