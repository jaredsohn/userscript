// ==UserScript==
// @name        MinimalistMalClubs
// @namespace   KatzScript
// @author		katz
// @description	Tries to make MAL club pages smaller and more practical.
// @include     http://myanimelist.net/clubs.php?*cid=*
// @version     0.5
// @date        2013.12.30
// @run-at      document-start
// @grant       none
// ==/UserScript==

// Preventing page flicker
var myHideStyle = document.createElement('style');
myHideStyle.appendChild(document.createTextNode("body{display:none;}"));
document.getElementsByTagName('head')[0].appendChild(myHideStyle);

// Run editing when DOM content loaded
window.addEventListener('DOMContentLoaded', minimalizeSite, false);

function minimalizeSite() {
	try {
		var contentDiv = document.getElementById("content");		
		// Checking redirection page
		if (contentDiv.getElementsByClassName("goodresult").length <= 0) {
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
		}		
	} catch (e) {
		alert("Minimalist MAL Clubs encountered an error!\nIf you get this message everytime disable the userscript!\n\n" + e.toString());		
	} finally {
		// Showing edited site
		document.getElementsByTagName('head')[0].removeChild(myHideStyle);
	}
}