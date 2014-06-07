// ==UserScript==
// @name         Echo Bazaar - Display Storylet Prerequisites
// @namespace    http://arundor/echo.bazaar.disply.storylet.prerequisites
// @description  For Fallen London (previously Echo Bazaar) - Displays storylet prerequisites in plain text so that you can see the information at a glance without having to mouse over multiple icons to uncover it bit by bit.
// @version      1.6
// @include      http://echobazaar.failbettergames.com/Gap/Load*
// @include      http://*fallenlondon.com/Gap/Load*
// @include      http://fallenlondon.storynexus.com/Gap/Load*
// ==/UserScript==

/*
I am an amateur script writer.  What you see here is not necessarily the best way to achieve what has been done.

Changelog:

v1.6
 January 6, 2014
  - updated to work after layout changes in the game
 
v1.5
 August 24, 2012
  - updated for the new fallenlondon.storynexus.com domain.

v1.4:
 May 27, 2012
  - requirements you have not met are now displayed in grey
  - updated script @description to reflect the game's new name (@name cannot be updated in the same way, as doing so would break the update process for users of the old version)
  - the @version meta data tag is now used

v1.3:
 March 26, 2012
 - now works on the new fallenlondon.com domain

v1.2:
 Jan 26, 2012
 - support for Google Chrome
 - removes item acquisition tips from the list of prerequisites
 - better method of preventing the script from running before Ajax has fully loaded the main content
 - better method of constructing the the new div that holds the plain text prereqs, this method prevents unnecessary nested divs.
 - prereq text now prints inside the storylet_rhs block to prevent clipping issues with the prereq icons

v1.1:
 Jan 24, 2012
 -initial release
*/


//The main content of the page is loaded by Ajax so an action listener is used to detect it when it is inserted.
document.addEventListener('DOMNodeInserted', showPrereqs, false);

//Due to the way the action listener is set up, this function may fire multiple times per storylet.
//I know of no better way to handle this, but since it fires multiple times each iteration will need to check if a previous iteration has already done of the work of adding the plain text requirements list.
function showPrereqs() {
	var qreqs = document.getElementsByClassName('qreqs');
	if (qreqs) {
		for (var a=0; a<qreqs.length; a++) {
			var parent = qreqs[a].parentNode.parentNode.getElementsByClassName('storylet_rhs')[0];
			if (parent) {
				//Each iteration of the script checks for the 'plain_text_reqs' class to determine if a previous iteration of the function has already done the work.
				if (parent.getElementsByClassName('plain_text_reqs').length == 0) {
					var tooltips = qreqs[a].getElementsByTagName('a');

					//Constructing a new div element to hold the list of plain text requirements.
					//The class is set to 'plain_text_reqs' as a marker that future iterations of the function can look for to determine if the work is already done.
					var div = document.createElement('div');
					div.setAttribute('class', 'plain_text_reqs');
					div.style.fontSize = '65%';
					div.style.width = '100%';
					div.style.clear = 'both';
					
					if (tooltips) {
						for (var b=0; b<tooltips.length; b++) {
							var text = tooltips[b].getElementsByClassName('tt')[0].innerHTML;
							
							//Text after a <br> tag in the tooltip will be explanations on how to acquire items or qualities.
							//These can be removed from the plain text requirements list since they tend to take up a lot of space.
							//Users can still see the text by mousing over the icon as the game developers intended.
							text = text.replace(/<br\>.*/,'');
							
							//If the requirement has not yet been met, display the text in grey.
							if (tooltips[b].getAttribute('class') == 'tooltip qreq  unlock') {
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
