// phpBB Quick Reply user script
// version 0.9.3
// 2007-02-17
// Copyright (c) 2005-7, xamm
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
// select "phpBB Quick Reply", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ChangeLog
// 2007-02-17 - 0.9.3 - Fixed the CTD caused by posting on CVG.com
// 2007-01-25 - 0.9.2 - Made the reply box stay open if it contains text and made it scroll to the bottom when a quote is added. Added error
//                      messages for when a topic is locked.
// 2007-01-23 - 0.9.1 - Added an image for the Quick Quote which was taken directly from the subSilver SDK on phpBB.com. For those waiting for
//                      1.0 tough, I need to fix some issues first.
// 2006-09-26 - 0.9 - Tidied up the code a tad
//                    Finally added the quick quote feature, no more opening new tabs to do multiple quotes
// 2006-07-06 - 0.8 - Made a proper workaround for the phpBB 3 new post feature. It increases server load but they deserve it for funing crap TBH
// 2006-07-05 - 0.7 - Added basic support for phpBB3, it works with the only forum I've tried it on, that's it.
//                    Managed to make a workaround for the retarded change post feature on phpBB 3 too.
//	                  Disabled the "Submit" button once its clicked.
// 2006-03-15 - 0.6 - Completly rewritten from scratch
//                     + moved the location of the quick reply box
//                     + shortened the delay between the posting and the post appearing
//                     + fixed it so it works with different themes
//                     + fixed the issue with non standard characters which i thought i'd fixed
//                     + fixed the issue with it unsubscribing you to a topic you'd subscribed to
// 2005-12-19 - 0.5 - Altered the way the reply is submitted to a style like vBulletin's
// 2005-09-04 - 0.4 - Fixed duplication bug
// 2005-08-30 - 0.3 - Added check to see if user is logged in and centered form
// 2005-08-29 - 0.2 - Fixed topic number retrieval bug
// 2005-08-29 - 0.1 - Initial release
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           phpBB Quick Reply
// @namespace      http://www.otsegolectric.com/greasemonkey/
// @description    A fairly basic quick reply function that should work for all phpBB forums with the standard theme installed
// @include        */viewtopic.php*
// ==/UserScript==

function canPost(){
	var canReply = document.evaluate("//*[contains(span, 'cannot reply to topics in this forum')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(canReply.snapshotLength == 0)
		return true;
	else
		return false;
}

function checkVersion(){
	//quick n dirty phpBB3 check
	if(document.getElementById('pagecontent'))
		v3 = true;
}

//add "link" for adding a quote
function addQuickQuotes(){
	var quoteLinks = document.evaluate("//a[contains(@href, 'posting.php?mode=quote')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < quoteLinks.snapshotLength; i++){
		var qqLink = document.createElement('img');
		qqLink.setAttribute('title', 'click to quote this post');
		qqLink.style.cursor = 'pointer';
		qqLink.addEventListener('click', getQuote, true);
		qqLink.style.paddingLeft = '2px';
		qqLink.src = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0E%00%00%00%0D%08%06%00%00%00%99%DC_%7F%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v2.64%82%22%10)%00%00%00%98IDAT(S%8D%91A%12%80%20%08E%E3j.%B9N%CB%B6%1D%B0%23t%84N%20%09%82R%D1(3NJ%3C%F9~%80%88%16%0B%00%E8%87%96%AD%9BR%07%8F%14%83%0AS%CE%F9%2C%FB0%98%AD%BC%D6%1B%F4%07%BC%F2%97%C1%AA%82%AEI%B0u5%F0%C1!%EE%C4%8B%03q%93%E5Ce%8B%EE%00%AC%C5%0C%A5%B4%CE%81%06X%B5%07%D9%40%E9%18%99%E3%A5E%DD%84%F1%E3%18%19%F4%19%87%87%F5%A7%DC%E1f\'%AE%FF%82%C1%05%EF%A7%F49Z%F1%E8kJ%8A9G3g%04EJn%F1%B3%03%00\'%40%C7Q%00%00%00%00IEND%AEB%60%82';
		quoteLinks.snapshotItem(i).parentNode.insertBefore(qqLink, quoteLinks.snapshotItem(i).nextSibling);
	}
}

var getQuote = function(event){
	var quoteHREF = event.target.previousSibling.href;
	var qqIFrame = document.createElement('iframe');
	var qrTextArea = document.getElementById('quickreply');
	qqIFrame.style.width = '1px';
	qqIFrame.style.height = '1px';
	qqIFrame.style.display = 'none';
	qqIFrame.src = quoteHREF;
	qqIFrame.addEventListener('load',
		function(){
			var qqDoc = qqIFrame.contentDocument;
			if(qqDoc.body.getElementsByTagName('textarea').length != 0){
				if(qrTextArea.value != '')
					qrTextArea.value += '\n\n';
				qrTextArea.value += qqDoc.body.getElementsByTagName('textarea')[0].value;
				qrTextArea.style.height = '100px';
				qrTextArea.scrollTop = qrTextArea.scrollHeight - qrTextArea.clientHeight;
			} else {
				var errorMessage = document.evaluate("//*[contains(span, 'locked')]", qqDoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				alert('Getting post contents failed, the error returned was:\n' + errorMessage.snapshotItem(0).getElementsByTagName('span')[0].innerHTML);
			}
			setTimeout( function() {qqIFrame.parentNode.removeChild(qqIFrame);}, 500);
			qqDoc = null;
		},
		false);
	document.body.appendChild(qqIFrame);
	event.preventDefault();
};

//hex encodes the form data for transmission
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

//used to send the post
var postXMLHTTPRequest = function(fd, rh, pc){
	GM_xmlhttpRequest({
		method: 'POST',
		url: rh,
		data: fd + 'message=' + pc,
		headers: {'Content-Type': 'application/x-www-form-urlencoded',
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey phpBB Quick Reply'},
		onload: function(responseDetails) {
			var gotoPost = document.createElement('div');
			gotoPost.id = 'gotoPost';
			gotoPost.style.display = 'none';
			gotoPost.innerHTML = responseDetails.responseText;
			if(window.location.host == 'www.computerandvideogames.com')
				for(var i = 0; i < gotoPost.getElementsByTagName('div').length; i++)
					if(gotoPost.getElementsByTagName('div')[i].className == 'wrap_forums')
						gotoPost.innerHTML = gotoPost.getElementsByTagName('div')[i].innerHTML;
			document.body.appendChild(gotoPost);
			var errorMessage = document.evaluate("//*[contains(span, 'locked')]", gotoPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if(errorMessage.snapshotLength == 0){
				var allAs = gotoPost.getElementsByTagName('a');
				for (var i = 0; i < allAs.length; i++)
					if (allAs[i].href.indexOf('viewtopic.php') > 0)
						window.location = allAs[i].href;
			} else {
				alert('Posting the message failed, the error returned was:\n' + errorMessage.snapshotItem(0).getElementsByTagName('span')[0].innerHTML);
				document.body.removeChild(gotoPost);
			}
		}
	});
};

//function called when the "submit" button is clicked
var submitPost = function(event){
	var formData = event.target.getAttribute('formData');
	var postContents = encodeFormData(event.target.previousSibling.previousSibling.value);
	event.target.value = 'Submitting...'
	event.target.disabled = true;
	if(v3 == true){
		var replyHREF = event.target.getAttribute('replyHREF');
		//quick and dirty hack to bypass the frankly shit feature where it asks if you want to change your post
		//i can see people spending ages trying to post in busy threads thanks to this stupid thing
		var loc = '' + window.location;
		GM_xmlhttpRequest({
			method: 'GET',
			url: loc,
			headers: 'User-agent: Mozilla/4.0 (compatible) Greasemonkey phpBB Quick Reply',
			onload: function(responseDetails) {
				postXMLHTTPRequest(formData, replyHREF, postContents);
			}
		});
	} else {
		var replyHREF = event.target.getAttribute('replyHREF').split('?')[0];
		postXMLHTTPRequest(formData, replyHREF, postContents);
	}
};


function createQuickReply(){
	//grabs the link from the reply button
	var replyHREF = document.evaluate("//a[contains(@href, 'posting.php?mode=reply')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(replyHREF.snapshotLength != 0)
		replyHREF = replyHREF.snapshotItem(0);
	if(v3 == true){
		//generally the last one is the proper one
		var mainTable = document.evaluate('//div[@id="pagecontent"]/table', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
		if(mainTable.snapshotLength != 0)
			mainTable = mainTable.snapshotItem(mainTable.snapshotLength - 3);
	} else {
		//generally the last one is the proper one
		var mainTable = document.evaluate('//table[@class="forumline"]/tbody', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
		if(mainTable.snapshotLength != 0)
			mainTable = mainTable.snapshotItem(mainTable.snapshotLength - 1);
	}

	//create the table row for everything to sit in
	var qrTableRow = document.createElement('tr');
	qrTableRow.align = 'center';

	//create the cell for the quick reply stuff
	var qrTableDivision = document.createElement('td');
	qrTableDivision.className = 'catBottom';
	qrTableDivision.style.backgroundImage = 'none!important';
	qrTableDivision.style.width = '100%';
	qrTableDivision.colSpan = '2';

	//create the text area
	var qrTextArea = document.createElement('textarea');
	qrTextArea.id = 'quickreply';
	qrTextArea.style.backgroundColor = '#ffffff';
	qrTextArea.style.color = '#000000';
	qrTextArea.style.width = '80%';
	qrTextArea.style.height = '25px';
	qrTextArea.style.border = '1px solid #000000';
	qrTextArea.style.paddingLeft = '2px';
	qrTextArea.style.paddingBottom = '2px';
	qrTextArea.addEventListener('blur', function(e){setTimeout(function(){if(e.target.value == '')e.target.style.height = '25px';}, 500);}, true);
	qrTextArea.addEventListener('focus', function(e){e.target.style.height = '100px'}, true);

	//create a submit button
	var qrSubmit = document.createElement('input');
	qrSubmit.type = 'button';
	qrSubmit.name = 'post';
	qrSubmit.className = 'mainoption';
	qrSubmit.value = 'Quick Reply';
	qrSubmit.style.border = '1px solid #000000';
	qrSubmit.addEventListener('click', submitPost, true);
	qrSubmit.setAttribute('replyHREF', replyHREF);

	//used to get the variables for the post otherwise we might unsubscribe people to topics
	var qrIFrame = document.createElement('iframe');
	qrIFrame.style.width = '1px';
	qrIFrame.style.height = '1px';
	qrIFrame.style.display = 'none';
	qrIFrame.src = replyHREF;
	qrIFrame.addEventListener('load',
		function(){
			var qrDoc = qrIFrame.contentDocument;
			if(qrDoc.body.getElementsByTagName('textarea').length != 0){
				qrDoc = qrDoc.getElementsByTagName('input');
				var formData = '';
				for(var i = 0; i < qrDoc.length; i++)
					if(qrDoc[i].name.indexOf('addbbcode') == -1 && qrDoc[i].name.indexOf('icon') == -1 && qrDoc[i].name.indexOf('helpbox') == -1 && qrDoc[i].name != '')
						if(qrDoc[i].type != 'checkbox' || qrDoc[i].checked != '')
							formData += qrDoc[i].name + '=' + encodeFormData(qrDoc[i].value) + '&';
				if(v3 == true)
					formData = 'icon=0' + formData;
				qrSubmit.setAttribute('formData', formData);
				qrDoc = null;
				qrTableDivision.appendChild(qrTextArea, qrTableDivision);
				qrTableDivision.appendChild(document.createElement('br'), qrTableDivision);
				qrTableDivision.appendChild(qrSubmit, qrTableDivision);
				qrTableRow.appendChild(qrTableDivision, qrTableRow);
				mainTable.appendChild(qrTableRow, mainTable);
				addQuickQuotes();
			} else {
				qrTextArea = null;
				qrSubmit = null;
				qrTableDivision = null;
				qrTableRow = null;
			}
			setTimeout( function() {qrIFrame.parentNode.removeChild(qrIFrame);}, 500);
		},
		false);
	document.body.appendChild(qrIFrame);
}

//call the functions to get the job done
if(canPost() == true){
	var v3 = false;
	var allowQuickQuote = false;
	checkVersion();
	createQuickReply();
}