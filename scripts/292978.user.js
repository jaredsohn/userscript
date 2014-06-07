// ==UserScript==
// @name        MalClubs+
// @namespace   KatzScript
// @author		katz
// @description	Extends MAL club pages with new features, while making them smaller and more practical.
// @include     http://myanimelist.net/clubs.php?*cid=*
// @version     0.6
// @date        2014.01.12
// @run-at      document-start
// @grant       none
// ==/UserScript==

// OPTIONS //
var minimalizeSite = true;

// Global variables
var contentDiv;

// Preventing page flicker
var myHideStyle = document.createElement('style');
myHideStyle.appendChild(document.createTextNode("body{display:none;}"));
document.getElementsByTagName('head')[0].appendChild(myHideStyle);

// Run editing when DOM content loaded
window.addEventListener('DOMContentLoaded', editPage, false);

function editPage() {
	try {
		contentDiv = document.getElementById("content");
		
		// Checking redirection page
		if (contentDiv.getElementsByClassName("goodresult").length > 0) {
			return;
		}		
		if (minimalizeSite) {
			minimalizePage();
		}
		loadAdditionalComments();
	} catch (e) {
		alert("MAL Clubs+ encountered an error!\nIf you get this message everytime disable the userscript!\n\n" + e.toString());
	} finally {
		// Showing edited site
		document.getElementsByTagName('head')[0].removeChild(myHideStyle);
	}	
}

function commentsReady() {
	try {
		// Adding 'at' script to site
		var atScript = document.createElement('script');
		atScript.type="text/javascript";
		atScript.innerHTML = "function at(name) { var commentForm = document.getElementsByName('commentText')[0];  commentForm.value = commentForm.value + '@' + name + ' '; var addComment = commentForm.parentNode.parentNode; addComment.scrollIntoView(true); commentForm.focus(); }";
		document.head.appendChild(atScript);
		
		// Adding 'Quote' script to site
		var quoteScript = document.createElement('script');
		quoteScript.type="text/javascript";
		quoteScript.innerHTML = "function quote(commentNum) { try { var normalHeaders = document.getElementById('content').getElementsByClassName('normal_header'); var i; for (i = 0; i < normalHeaders.length && normalHeaders[i].innerHTML.indexOf('Club Comments') == -1; i++); var commentsDiv = normalHeaders[i].nextSibling.nextSibling; var commentTd = commentsDiv.children[commentNum].children[0].children[0].children[0].children[1]; var commentStart = commentTd.textContent.indexOf('@ Quote'); var profileName = commentTd.children[0].getElementsByTagName('a')[0].innerHTML; var commentForm = document.getElementsByName('commentText')[0]; commentForm.value = commentForm.value + '[quote=' + profileName + ']'  + commentTd.textContent.slice(commentStart + 12) + '[/quote]'; var addComment = commentForm.parentNode.parentNode; addComment.scrollIntoView(true); commentForm.focus(); } catch(e) { alert('Error: ' + e); }}";
		document.head.appendChild(quoteScript);
		
		var normalHeaders = contentDiv.getElementsByClassName("normal_header");
		var i;
		for (i = 0; i < normalHeaders.length && normalHeaders[i].innerHTML.indexOf('Club Comments') == -1; i++);
		var commentsDiv = normalHeaders[i].nextSibling.nextSibling;
		for (i = 0; i < commentsDiv.children.length; i++) {
			if (commentsDiv.children[i].hasChildNodes()) {
				var commentHeaderTable = document.createElement('table');
				commentHeaderTable.appendChild(document.createElement('tr'));
				commentHeaderTable.children[0].appendChild(document.createElement('td'));
				commentHeaderTable.children[0].appendChild(document.createElement('td'));
				commentHeaderTable.children[0].appendChild(document.createElement('td'));
				commentHeaderTable.setAttribute('style', 'width:100%; border:0px; margin:0px');
				commentHeaderTable.children[0].children[1].setAttribute("width", "3%");
				commentHeaderTable.children[0].children[2].setAttribute("width", "7%");
				
				var commentTd = commentsDiv.children[i].children[0].children[0].children[0].children[1];
				var commentHeader = commentTd.children[0];
				var profileName = commentHeader.getElementsByTagName('a')[0].innerHTML;
				
				var atLink = document.createElement('a');
				atLink.setAttribute('onclick', "at('" + profileName + "');return false;");
				atLink.setAttribute('href', '#');
				atLink.innerHTML = ' @ ';
				var quoteLink = document.createElement('a');
				quoteLink.setAttribute('onclick', "quote(" + i + ");return false;");
				quoteLink.setAttribute('href', '#');
				quoteLink.innerHTML = 'Quote';
				
				commentHeaderTable.children[0].children[0].appendChild(commentHeader.children[0]);
				commentHeaderTable.children[0].children[0].appendChild(commentHeader.children[0]);
				commentHeaderTable.children[0].children[1].appendChild(document.createElement('small'));
				commentHeaderTable.children[0].children[1].children[0].appendChild(atLink);
				commentHeaderTable.children[0].children[2].appendChild(document.createElement('small'));
				commentHeaderTable.children[0].children[2].children[0].appendChild(quoteLink);
				commentHeader.appendChild(commentHeaderTable);
				
				// Need to do this for accurate refreshing
				var commentForm = document.getElementsByName('commentText')[0];
				commentForm.setAttribute('autocomplete', 'off');
			}			
		}
	} catch(e) {
		throw(e);
	}
}

function minimalizePage() {
	try {
		// Removing report and it's line
		contentDiv.removeChild(contentDiv.children[1]);
		contentDiv.removeChild(contentDiv.children[1]);	
		var mainTableRow = contentDiv.children[0].children[0].children[0];
		var trash = document.createElement('div');
		
		// MAIN DIV EDITING //
		var mainTd = mainTableRow.children[0];
		var mainCut = document.createElement('div');
		mainCut.style.textAlign = "left";
		// Cutting stuff before Club Discussion
		var titleDiv = mainTd.getElementsByClassName('normal_header')[0];
		while (titleDiv && titleDiv.className == 'normal_header' && titleDiv.innerHTML.indexOf('Club Discussion') == -1) {
			mainCut.appendChild(titleDiv.cloneNode(true));
			while (titleDiv.nextSibling && titleDiv.nextSibling.className != 'normal_header') {
				mainCut.appendChild(titleDiv.nextSibling);
			}
			trash.appendChild(titleDiv);
			titleDiv = mainTd.getElementsByClassName('normal_header')[0];
		}
		// Removing extra lines before Club Discussion
		titleDiv = mainTd.getElementsByClassName('normal_header')[0];
		while (titleDiv.previousSibling) {
			trash.appendChild(titleDiv.previousSibling);
		}
		// Removing extra line after Club Discussion
		var topicsTable = document.getElementById('forumTopics');
		if (topicsTable.nextSibling.nextSibling) {
			trash.appendChild(topicsTable.nextSibling.nextSibling);
		}
		// Removing Add a Comment, if not logged in
		var commentForm = document.getElementsByName('UserComment');
		if (commentForm.length > 0 &&
			document.getElementById("menu_left").children[0].innerHTML.indexOf("malLogin") != -1) {
			trash.appendChild(commentForm[0].parentNode);
		}

		// SIDE DIV EDITING //
		var sideDiv = mainTableRow.children[1].children[0];
		// Cutting Side elements	
		var sideCut = document.createElement('div');
		sideCut.style.textAlign = "left";
		var officersPos = sideDiv.innerHTML.indexOf("<div class=\"normal_header\">Club Officers");
		sideCut.innerHTML = sideDiv.innerHTML.substring(officersPos);
		sideDiv.innerHTML = sideDiv.innerHTML.slice(0, officersPos);
		sideDiv.removeChild(sideDiv.lastChild);
		sideDiv.removeChild(sideDiv.lastChild);
			
		// Adding spoiler buttons
		var buttonHTML = "<input type=\"button\" class=\"button\" onClick=\"this.nextSibling.nextSibling.style.display='';this.style.display='none';\" value=\"Show info\"/> <span class=\"spoiler_content\" style=\"display:none\"><input type=\"button\" class=\"button\" onClick=\"this.parentNode.style.display='none';this.parentNode.parentNode.childNodes[0].style.display='';\" value=\"Hide info\"/><br></span>";
		var mainButton = document.createElement('div');
		mainButton.style.textAlign = "center";
		mainButton.innerHTML = buttonHTML;
		mainButton.children[1].appendChild(mainCut);	
		mainTd.appendChild(document.createElement('br'));
		mainTd.appendChild(mainButton);
		var sideButton = document.createElement('div');
		sideButton.style.textAlign = "center";
		sideButton.innerHTML = buttonHTML;
		sideButton.children[1].appendChild(sideCut);
		sideDiv.appendChild(sideButton);
	} catch (e) {
		throw(e);
	}
}

function loadAdditionalComments() {
	try {
		var commentRequest = new XMLHttpRequest();
		var idStart = document.URL.indexOf('cid=') + 4;
		commentRequest.open("GET", 'clubs.php?id=' + document.URL.slice(idStart) + '&action=view&t=comments', true);
		commentRequest.overrideMimeType('text/xml');
		commentRequest.onload = function() {
			try {
				var commentStart = commentRequest.response.indexOf("<div id=\"comment");
				var commentEnd = commentRequest.response.indexOf("<div class=\"spaceit\">");
				var normalHeaders = contentDiv.getElementsByClassName("normal_header");
				var i;
				for (i = 0; i < normalHeaders.length && normalHeaders[i].innerHTML.indexOf('Club Comments') == -1; i++);
				var commentsDiv = normalHeaders[i].nextSibling.nextSibling;
				commentsDiv.innerHTML = commentRequest.response.slice(commentStart, commentEnd);
				commentsReady();
			} catch (e) {
				alert("MAL Clubs+ encountered an error!\nIf you get this message everytime disable the userscript!\n\n" + e.toString());
			}
		}
		commentRequest.send();
	} catch (e) {
		throw(e);
	}
}