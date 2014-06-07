// ==UserScript==
// @name           Facebook: InviteThemAll Abdalrhman slaim
// @namespace      Aspi
// @description    Adds a button to select multiple, thus all, friends in the "invite friends Abdalrhman slaim" dialog at Facebook.
// @include        /https?://(|.*\.)facebook.com/?.*/
// @require        http://usocheckup.redirectme.net/89653.js?method=update
// @version        2.17
// ==/UserScript==

// ==ChangeLog==
// @history        2.17 (02.08.2012) Hotfix.
// @history        2.16 (18.07.2012) Improved friend enumeration method.
// @history        2.15 (13.07.2012) Added friend enumeration (sloppy version).
// @history        2.14 (28.06.2012) Increased invite dialog detection redundancy.
// @history        2.13 (21.06.2012) Made compatible with arrangements one is not attending to.
// @history        2.12 (20.06.2012) Addressed bug with use of "button" element.
// @history        2.11 Enhanced fade function, plus minor fixes.
// @history        2.10 Added, among much, non-blocking error alerting.
// @history        2.03 Added selection span option.
// @history        2.02 Changed the scrolling method.
// @history        2.01 Hotfix.
// @history        2.00 Major rewrite.
// @history        1.05 Changed updater to usoCheckup.
// @history        1.04 Added selection option ("Select ALL").
// @history        1.03 Removed the (deleted) updater.
// @history        1.02 Added manual update search command and fixed selection bug.
// @history        1.01 Added this awesome script updater, privatized the data, fixed small bugs and re-wrote the button injection method.
// @history        1.00 Initial release.
// ==/ChangeLog==

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
}())