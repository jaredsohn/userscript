// ==UserScript==
// @name         Story Nexus - Display Storylet Requirements
// @namespace    http://arundor/storynexus.display.storylet.requirements
// @description  For Story Nexus - Displays storylet requirements in plain text so that you can see the information at a glance without having to mouse over multiple icons to uncover it bit by bit.
// @version      1.0
// @include      http://*.storynexus.com/s
// ==/UserScript==

/*
I am an amateur script writer.  What you see here is not necessarily the best way to achieve what has been done.

Changelog:

v1.0:
 August 24, 2012
 -initial release
*/


//The main content of the page is loaded by Ajax so an action listener is used to detect it when it is inserted.
document.addEventListener('DOMNodeInserted', showPrereqs, false);
showPrereqs();

//Due to the way the action listener is set up, this function may fire multiple times per storylet.
//I know of no better way to handle this, but since it fires multiple times each iteration will need to check if a previous iteration has already done of the work of adding the plain text requirements list.
function showPrereqs() {
	var requirements = document.getElementsByClassName('choice-buttons buttons');
	if (requirements) {
		for (var a=0; a<requirements.length; a++) {
			var parent = requirements[a].parentNode;
			if (parent) {
				//Each iteration of the script checks for the 'plain_text_reqs' class to determine if a previous iteration of the function has already done the work.
				if (parent.getElementsByClassName('plain_text_reqs').length == 0) {
					var tooltips = requirements[a].getElementsByClassName('tooltip');
					
					//Constructing a new div element to hold the list of plain text requirements.
					//The class is set to 'plain_text_reqs' as a marker that future iterations of the function can look for to determine if the work is already done.
					var div = document.createElement('div');
					div.setAttribute('class', 'plain_text_reqs');
					div.style.fontSize = '70%';
					div.style.width = '100%';
					div.style.clear = 'both';
					div.style.lineHeight = 'normal';
					
					if (tooltips) {
						for (var b=0; b<tooltips.length; b++) {
							var text = tooltips[b].innerHTML;
							
							//New lines using the <br> tag are used for formatting the tooltips, and are not necessary for the new plain text list. They can be removed.
							text = text.replace(/<br>/,'');
							
							//If the requirement has not yet been met, display the text in grey.
							if (tooltips[b].parentNode.getAttribute('class') == 'req-item req-item-lock tooltipToggle') {
								text = '<span style="color: grey">' + text + '</span>';
							}
							
							div.innerHTML += '<br>- ' + text;
						}
					}
					
					//Even if the new div is empty it is added to the page anyway.
					//This is done so that future iterations of the function can find it and know that the work is already done.
					parent.appendChild(div);
				}
			}
		}
	}
}
