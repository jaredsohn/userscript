// ==UserScript==
// @name           :: Facebook Fast Friends Select ::
// @namespace      http://userscripts.org/users/410854
// @description    Seleziona tutti tuoi amici con dei semplici click!
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// ==/UserScript==

(function () {
	
	var inviteBox, executing, i, l, scrollTimer, fieldError = false;
	
	function clickLink(elm) {
		var evt = document.createEvent('MouseEvents');
		evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		elm.dispatchEvent(evt);
	}
	
	function getCumulativePosition(obj) {
		var curleft = 0, curtop = curleft;
		
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			
				obj = obj.offsetParent;
			} while (obj);
		}
		
		return [curleft, curtop];
	}
	
	// Fade function (element, duration in seconds, from opacity, to opacity).
	function fade(elm, time, from, to, fadeCallback) {
		
		var updaterate = 10, neededcalcs = (1000 * time) / updaterate,
			currentcalcs = 0, opacityperloop = (from - to) / neededcalcs, currentopacity = from;
		
		if (this.fadeTimer) {
			clearTimeout(this.fadeTimer);
			delete this.fadeTimer;
		}
		
		elm.style.opacity = currentopacity;
		
		(function loop() {
			this.fadeTimer = setTimeout(function () {

				if (currentcalcs !== neededcalcs) {

					currentopacity -= opacityperloop;

					elm.style.opacity = currentopacity;

					currentcalcs += 1;
					

					loop();
					
				} else {
					if (opacityperloop > 0) {
						elm.parentNode.removeChild(elm);
					}
					

					delete this.fadeTimer;
					

					if (fadeCallback) {
						fadeCallback();
					}
				}
			}, updaterate);
		}());
	}
	
	
	function errorAlert(message, positionArray, errorAlertCallback) {
		try {
			function appendText(textArray, elm) {
				for (i = 0, l = textArray.length; i < l; i += 1) {
					elm.appendChild(textArray[i]);
					
					elm.appendChild(document.createElement('br'));
				}
			}
			
			var container = document.createElement('div');
			container.className = 'alertBox';
			container.id = 'errorMessageBox';
			container.style.opacity = 0;
			
			var innerContainer = document.createElement('div');
			innerContainer.className = 'textContainer';
			
			var header = document.createElement('b');
			header.appendChild(document.createTextNode('Error!'));
			header.appendChild(document.createElement('br'));
			
			var OKButtonContainer = document.createElement('div'),
				OKButton = document.createElement('button');
			
			OKButton.textContent = 'OK';
			OKButton.className = 'uiButton';
			
			OKButton.addEventListener('click', function () {
				fade(container, 0.1, container.style.opacity, 0, (errorAlertCallback && function () {
					errorAlertCallback();
				}));
			}, false);
			
			OKButtonContainer.className = 'OKButtonContainer';
			OKButtonContainer.appendChild(OKButton);
			
			
			innerContainer.appendChild(header);
			appendText(message, innerContainer);
			innerContainer.appendChild(OKButtonContainer);
			container.appendChild(innerContainer);
			
			try {
				inviteBox.appendChild(container);
			} catch (e) {
				document.body.appendChild(container);
			}
			
			container.style.position = 'fixed';
			
			if (positionArray && positionArray.length === 2) {
				var pixelsFromLeft = positionArray[0], pixelsFromTop = positionArray[1] - container.offsetHeight;
				
				container.style.left = pixelsFromLeft.toString() + 'px';
				container.style.top = pixelsFromTop.toString() + 'px';
			} else {
				container.style.right = '4em';
				container.style.bottom = '5em';
			}
			
			fade(container, 0.2, container.style.opacity, 0.9);
			
		} catch (f) {
			if (message) {
				var messageInString = '';
				
				for (i = 0, l = message.length; i < l; i += 1) {
					messageInString += message[i].textContent + '\n';
				}
				
				alert(messageInString);
			}
		}
	}
	
	
	function addButton(inviteBoxParameter) {
		inviteBox = inviteBoxParameter;
		
		if (inviteBox !== undefined && !executing && !document.getElementById('selectAllButton')) {
			executing = true;
			

			var selectButton = document.createElement('button');
			selectButton.className = 'uiButton';
			selectButton.id = 'selectAllButton';

			selectButton.style.align = 'center';
			

			var selectButtonText1 = document.createTextNode('Seleziona Tutti'),
				selectButtonText2 = document.createTextNode('Deseleziona');
			

			selectButton.appendChild(selectButtonText1);
			

			var btnClicked;
			
			
			function selectFriends(btn) {
			
				var friends = document.getElementsByName('checkableitems[]')[0] ?
						document.getElementsByName('checkableitems[]') :
						inviteBox.querySelectorAll('input[type="checkbox"]:not(#autoScrollCheckBox):not(#selectAllCheckBox)'),
					forceChoose = false,
			
			
					selectionStart = fields[0].value === fields[0].defaultValue ?
						0 :
			
						parseInt(fields[0].value, 10) - 1,
			
					friendsToSelect = fields[1].value === fields[1].defaultValue ?
						selectSpanTypeCheckBox.checked ?
			
							friends.length - selectionStart :
			
							friends.length :
						selectSpanTypeCheckBox.checked ?
			
							parseInt(fields[1].value, 10) - selectionStart :
			
							parseInt(fields[1].value, 10),
					selectedFriends = 0,
					
					alwaysIterate = selectSpanTypeCheckBox.checked,
					currentFriendNumber = selectionStart;
				
				
				if (!btnClicked) {
				
					while (friendsToSelect > selectedFriends && friends[currentFriendNumber]) {
				
						var iterated = false;
						
			
						if ((!friends[currentFriendNumber].checked && !friends[currentFriendNumber].disabled) || forceChoose) {
			
							clickLink(friends[currentFriendNumber].nextSibling);
							
			
							selectedFriends += 1;
							iterated = true;
						}
						
						if (!iterated && alwaysIterate) {
							selectedFriends += 1;
						}
						
			
						currentFriendNumber += 1;
					}
					
			
					btn.textContent = selectButtonText2.textContent;
					btnClicked = true;
					
			
					for (i = 0, l = fields.length; i < l; i += 1) {
						fields[i].disabled = true;
					}
					selectSpanTypeCheckBox.disabled = true;
				
			
				} else {
					for (i = 0, l = friends.length; i < l; i += 1) {
			
						if ((friends[i].checked && !friends[i].disabled) || forceChoose) {
			
							clickLink(friends[i].nextSibling);
						}
					}
					
			
					btn.textContent = selectButtonText1.textContent;
					btnClicked = false;
					
			
					for (i = 0, l = fields.length; i < l; i += 1) {
						fields[i].disabled = '';
					}
					selectSpanTypeCheckBox.disabled = '';
				}
			}
			
			
			selectButton.addEventListener('click', function () {
	
				if (fieldError) {
					return;
				}
				
				if (autoScrollCheckBox.checked) {
					autoScroll(function () {
						selectFriends(selectButton);
					});
				} else {
					selectFriends(selectButton);
				}
			}, false);
			
			
		
			function createContainer(contElmType, elmArray) {
				var divElm = document.createElement(contElmType);
				for (i = 0, l = elmArray.length; i < l; i += 1) {
					divElm.appendChild(elmArray[i]);
				}
				
				return divElm;
			}
			
		
			function createLabel(textParam, forElm) {
				var labl = document.createElement('label');
				labl.appendChild(document.createTextNode(textParam));
				labl.setAttribute('for', forElm.id);
				
				return labl;
			}
			
			
		
			var autoScrollCheckBox = document.createElement('input');
			autoScrollCheckBox.type = 'checkbox';
			autoScrollCheckBox.id = 'autoScrollCheckBox';
		
			autoScrollCheckBox.defaultChecked = 'true';
		
			autoScrollCheckBox.style.verticalAlign = 'middle';
			
		
			function autoScroll(callback) {
		
				var autoScrollDisabled;
				
				function isBelowViewport(container, element) {
				
					var scrolledFromTop = container.scrollTop,
						viewportHeight = container.offsetHeight,
						totalHeight = container.scrollHeight,
						elementHeight = element.offsetHeight;
					
				
					var leftFromTop = scrolledFromTop + viewportHeight;
					
				
					var leftFromBottom = totalHeight - leftFromTop;
					
				
					return leftFromBottom > elementHeight ? true : false;
				}
				
				function scrollFriends() {
					if (autoScrollDisabled) {
						return;
					}
					
					if (scrollTimer) {
						clearTimeout(scrollTimer);
					}
					
					var lastUL = inviteBox.getElementsByTagName('ul')[inviteBox.getElementsByTagName('ul').length - 1],
						scrollableDiv = lastUL.offsetParent,
						lastFriend = lastUL.lastChild;
					
					
					if (isBelowViewport(scrollableDiv, lastFriend)) {
					
						scrollableDiv.scrollTop = scrollableDiv.scrollHeight - scrollableDiv.offsetHeight;
						
					
						scrollTimer = setTimeout(function () {
							autoScrollDisabled = true;
							clearTimeout(scrollTimer);
							
							callback();
						}, 1000);
					
					} else {
						autoScrollDisabled = true;
						
						callback();
						return;
					}
					
					return true;
				}
				
				
				scrollFriends();
				inviteBox.addEventListener('DOMNodeInserted', function watch() {
					if (!scrollFriends()) {
				
						this.removeEventListener('DOMNodeInserted', watch, false);
						autoScrollDisabled = false;
					}
				}, false);
			}
			
			
			var autoScrollCheckBoxLabel = createLabel('Autoscorrimento', autoScrollCheckBox);
			
			
			var autoScrollCont = createContainer('span', [autoScrollCheckBoxLabel, autoScrollCheckBox]);
			
			
			
			var defaultValueClassName = 'textInput inputtext DOMControl_placeholder', valueModifiedClassName = 'textInput inputtext';
			
			
			var fromField = document.createElement('input');
			fromField.type = 'text';
			fromField.id = 'fromField';
			fromField.className = defaultValueClassName;
			fromField.style.width = '2.5em';
			fromField.style.textAlign = 'left';
			var fromFieldDefaultValues = ['primo', 'primo'];
			fromField.defaultValue = fromFieldDefaultValues[0];

			var fromFieldLabelValues = ['', ''],
				fromFieldLabel = createLabel(fromFieldLabelValues[0], fromField);
			

			var toField = document.createElement('input');
			toField.type = 'text';
			toField.id = 'toField';
			toField.className = defaultValueClassName;
			toField.style.width = '2.5em';
			toField.style.textAlign = 'left';
			var toFieldDefaultValues = ['tutti', 'ultimo'];
			toField.defaultValue = toFieldDefaultValues[0];
			
			var toFieldLabelValues = ['', ''],
				toFieldLabel = createLabel(toFieldLabelValues[0], toField);
			
			
			var fields = [fromField, toField];

			// Nascondo i varie Fileds & Checkboxes
			fromField.style.display = 'none';
			toField.style.display = 'none';
			
			
			function fieldErrorAlert(message, concerningElementParam) {
			
				fieldError = true;
				
			
				var concerningElement = concerningElementParam || this, relativeElement = this, positionArray;
				
				function errorAlertCallback() {
					concerningElement.value = '';
					concerningElement.focus();
				}
				
			
				if (relativeElement) {
					var relativeElementPosition = getCumulativePosition(relativeElement), offsetPixelsToRight = 30, offsetPixelsToBottom = 10;
					
					positionArray = [relativeElementPosition[0] - offsetPixelsToRight, relativeElementPosition[1] - offsetPixelsToBottom];
				}
				
				errorAlert(message, positionArray, errorAlertCallback);
			}
			
			function fieldFocusEventListener() {
			
				var thisField = this;
				
			
				if (thisField.value === thisField.defaultValue) {
					thisField.value = '';
				}
				
				thisField.className = valueModifiedClassName;
			}
			
			function fieldBlurEventListener() {
				
				var thisField = this;
				
				
				switch (thisField.value) {
				case '':
					thisField.value = thisField.defaultValue;
				case thisField.defaultValue:
					thisField.className = defaultValueClassName;
					
				
					fieldError = false;
					break;
				default:
				
					thisField.value = parseInt(thisField.value, 10);
					
					if (isNaN(thisField.value)) {
						fieldErrorAlert.call(thisField, [document.createTextNode('You can\'t insert a non-numeric value.'),
							document.createTextNode('Please insert a valid value.')]);
						break;
				
					} else if (thisField.previousSibling.textContent.indexOf('#') !== -1 && thisField.value === '0') {
						fieldErrorAlert.call(thisField, [document.createTextNode('There does not exist a friend #0.'),
							document.createTextNode('Please insert a valid value.')]);
						break;
					} else if (parseInt(thisField.value, 10) < 0) {
						fieldErrorAlert.call(thisField, [document.createTextNode('You can\'t insert a negative value.'),
							document.createTextNode('Please insert a valid value.')]);
						break;
					}
					
			
					fieldError = false;
				}
			}
			
			
			fromField.addEventListener('focus', fieldFocusEventListener, false);
			fromField.addEventListener('blur', fieldBlurEventListener, false);
			toField.addEventListener('focus', fieldFocusEventListener, false);
			toField.addEventListener('blur', fieldBlurEventListener, false);
			
			
			var selectSpanTypeCheckBox = document.createElement('input');
			selectSpanTypeCheckBox.type = 'checkbox';
			selectSpanTypeCheckBox.id = 'selectSpanTypeCheckBox';
			
			selectSpanTypeCheckBox.style.verticalAlign = 'top';
			
			var selectSpanTypeCheckBoxLabel = createLabel('Type?', selectSpanTypeCheckBox);
			
			selectSpanTypeCheckBox.addEventListener('change', function () {
			
				fromFieldLabel.textContent = fromFieldLabel.textContent === fromFieldLabelValues[0] ? fromFieldLabelValues[1] : fromFieldLabelValues[0];
				toFieldLabel.textContent = toFieldLabel.textContent === toFieldLabelValues[0] ? toFieldLabelValues[1] : toFieldLabelValues[0];
				
			
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
			
			


			var galliardField = document.createElement('input');
			galliardField.type = 'text';
			galliardField.id = 'galliardField';
			galliardField.className = defaultValueClassName;
			galliardField.style.width = '2.5em';
			galliardField.style.textAlign = 'left';
			var galliardFieldDefaultValues = ['primo', 'primo'];
			galliardField.defaultValue = galliardFieldDefaultValues[0];

			var galliardFieldLabelValues = [':: Galliard Music Club ::', ''],
				galliardFieldLabel = createLabel(galliardFieldLabelValues[0], galliardField);




			var selectSpanArray = [galliardFieldLabel];
			
			
			for (i = 0, l = selectSpanArray.length; i < l; i += 1) {
			
				if (selectSpanArray[i] !== toField && selectSpanArray[i] !== selectSpanTypeCheckBoxLabel) {
					selectSpanArray[i].style.marginRight = '5px';
				}
			}
			
			
			var selectSpanCont = createContainer('span', selectSpanArray);
			
			
			
			var cont = document.createElement('tr');
			var icont = document.createElement('td');



			
			
			icont.setAttribute('colspan', 0);
			icont.style.textAlign = 'center';

			
//			icont.appendChild(selectSpanCont);
//			icont.appendChild(autoScrollCont);
			icont.appendChild(selectButton);
			cont.appendChild(icont);
			
			
			inviteBox.getElementsByTagName('tbody')[0].appendChild(cont);
			
			executing = false;
		}
	}
	
	
	
	function checkForInviteBox() {
	
		var inviteBoxCheck = document.getElementsByClassName('eventInviteLayout')[0] || document.getElementsByClassName('dialog_body')[0] ||
			document.getElementById('fb_multi_friend_selector_wrapper');
		
	
		if (inviteBoxCheck && inviteBoxCheck.getElementsByTagName('tbody')[0]) {
	
			addButton(inviteBoxCheck);
			
		}
	}
	
	
	
	window.addEventListener('DOMNodeInserted', checkForInviteBox, false);
	

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
	');
}());