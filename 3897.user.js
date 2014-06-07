// ==UserScript==
// @name           onPageNote
// @namespace      http://neko-mangaka.deviantart.com
// @description    Write and send notes without ever leaving the page
// @include        http://*.deviantart.com/*
// ==/UserScript==

(function()
{
	// =-=-=-=-=- C O N S T A N T S =-=
	var NEW_NOTE = 'http://i.deviantart.com/icons/notes/note-unread.gif';
	var SENT_NOTE = 'http://i.deviantart.com/icons/notes/note-replied.gif';
	var GRAY_NOTE = 'http://i.deviantart.com/icons/notes/note-read.gif';
	var THROBBER = 'http://s.deviantart.com/icons/misc/loading.gif';
	
	// =-=-=-=-=- V A R I A B L E S =-=
	var notesInterfaceOpen = false;
	var notePreviewOpen = false;
	
	// =-=-=-=-=- C O M P O N E N T S =-=	
	var interfaceDiv = document.createElement('div');
	
	var intHeadDiv = document.createElement('div');
	var headTitleH2 = document.createElement('h2');
	var headIconImg = document.createElement('img');
	var headRecipientSpan = document.createElement('span');
	var headFloatRightSpan = document.createElement('span');
	var headOpenNotesA = document.createElement('a');
	
	var intContainerDiv = document.createElement('div');
	var intSubjectText = document.createElement('input');
	var intMessageTextarea = document.createElement('textarea');
	var intSubjectLabel = document.createElement('label');
	var intMessageLabel = document.createElement('label');
	
	var intPreviewDiv = document.createElement('div');
	
	var intFootDiv = document.createElement('div');
	var footPreviewButton = document.createElement('input');
	var footSendButton = document.createElement('input');
	
	var intBottomDiv = document.createElement('div');
	var footCloseButton = document.createElement('input');
	
	var backgroundDiv = document.createElement('div');
	
	var alertDiv = document.createElement('div');
	var alertIconImg = document.createElement('img');
	var alertMessageLabel = document.createElement('label');
	var alertMessageSpan = document.createElement('span');
	
	// =-=-=-=-=- F U N C T I O N S =-=
	
	// ========== Handles clicks on the page ===
	var handleClicks = function(event)
	{		
		// Left mouse button used
		if (event.button == 0)
		{
			var target = event.target;
			
			// Close button
			if (target == footCloseButton)
			{
				hideInterface();
			}
			
			// Preview button
			if (target == footPreviewButton)
			{
				togglePreview();
			}
			
			// Send button
			else if (target == footSendButton)
			{
				sendNote();
				hideInterface();
			}
			else
			{
				// Find the first A element containing target
				// Stop if target becomes body --> there isn't an A in the chain
				while (target.nodeName.toLowerCase() != 'a' && target != document.body) target = target.parentNode;
				
				// Check to make sure that target fits the description:
				//           an A element pointing to 'http://my.deviantart.com/notes[/]?to=*'
				// I should probably use a Regular Expression here, but I don't know how
				if (target.nodeName.toLowerCase() == 'a' && target.href.indexOf('http://my.deviantart.com/notes') > -1 &&
					target.href.indexOf('?to=') > -1 && !notesInterfaceOpen)
				{					
					var deviant = target.href.substring(target.href.indexOf('?to=') + 4);
					
					showInterface(deviant);
					
					event.stopPropagation();
					event.preventDefault();
				}
			}
		}
	};
	
	// ========== Show the note interface ===
	var showInterface = function(deviant)
	{
		var interface = document.getElementById('opn-interface');
		var linkURL = interface.getElementsByTagName('a')[0].href.substring(0, interface.getElementsByTagName('a')[0].href.indexOf('=') + 1) + deviant;
		
		interface.getElementsByTagName('span')[1].innerHTML = deviant;
		interface.getElementsByTagName('a')[0].href = linkURL;
		interface.style.visibility = 'visible';
		
		if (notePreviewOpen) togglePreview();
		
		document.getElementById('opn-background').style.visibility = 'visible';
		
		notesInterfaceOpen = true;
	};
	
	// ========== Hide the note interface ===
	var hideInterface = function()
	{
		document.getElementById('opn-interface').style.visibility = 'hidden';
		document.getElementById('opn-background').style.visibility = 'hidden';
		
		notesInterfaceOpen = false;
	};
	
	// ========== Clear the note interface ===
	var clearInterface = function()
	{
		document.getElementById('opn-notesubject').value = '';
		document.getElementById('opn-notebody').value = '';
	};
	
	// ========== Send the note ===
	var sendNote = function()
	{
		var interface = document.getElementById('opn-interface');
		
		var ref = window.location.href;
		var recipients = interface.getElementsByTagName('span')[1].innerHTML;
		var subject = document.getElementById('opn-notesubject').value;
		var message = document.getElementById('opn-notebody').value;
		
		var noteData = encodeURI('ref=' + ref + '&recipients=' + recipients + '&subject=' + subject + '&body=' + message);
		
		GM_xmlhttpRequest(
		{
			method: 'POST',
			url: 'http://my.deviantart.com/notes/send',
			headers: 
			{
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: noteData,
			onload: function(responseDetails)
			{
				changeAlertIcon(NEW_NOTE);
				showAlert('note sent...');
				clearInterface();
			},
			onerror: function(responseDetails)
			{
				changeAlertIcon(GRAY_NOTE);
				showAlert('error sending note (' + responseDetails.status + ')...');
			},
			onreadystatechange: function(responseDetails)
			{
				if (responseDetails.readyState == 1)
				{
					changeAlertIcon(THROBBER);
					showAlert('sending note...');
				}
			}
		});
	};
	
	// ========== Change the icon image of the alert ===
	var changeInterfaceIcon = function(imageURL)
	{
		document.getElementById('opn-interface').getElementsByTagName('img')[0].src = imageURL;
	};
	
	// ========== Show or hide the preview ===
	var togglePreview = function()
	{
		if (!notePreviewOpen)
		{
			var message = document.getElementById('opn-notebody').value;
			
			if (message.length == 0) return;
			
			var previewData = 'body=' + encodeURI(message).replace(/&/g, '%26');
			
			changeInterfaceIcon(THROBBER);
			intPreviewDiv.innerHTML = '. . .';
			document.getElementById('opn-notebody').parentNode.replaceChild(intPreviewDiv, document.getElementById('opn-notebody'));
			document.getElementById('opn-prevbutton').value = 'Edit';
			notePreviewOpen = true;
			
			GM_xmlhttpRequest(
			{
				method: 'POST',
				url: 'http://www.deviantart.com/global/preview.php',
				headers: 
				{
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
					'Content-type': 'application/x-www-form-urlencoded'
				},
				data: previewData,
				onload: function(responseDetails)
				{
					changeInterfaceIcon(NEW_NOTE);
					document.getElementById('opn-preview').innerHTML = responseDetails.responseText;
				}
			});
		}
		else
		{
			changeInterfaceIcon(NEW_NOTE);
			document.getElementById('opn-preview').parentNode.replaceChild(intMessageTextarea, document.getElementById('opn-preview'));
			document.getElementById('opn-prevbutton').value = 'Preview';
			notePreviewOpen = false;
		}
	};
	
	// ========== Show an alert ===
	var showAlert = function(message)
	{
		var div = document.getElementById('opn-alert');
		
		div.getElementsByTagName('span')[0].innerHTML = message;
		
		div.style.opacity = '1';
		div.style.visibility = 'visible';
		
		window.setTimeout(fadeAlert, 900);
	};
	
	// ========== Hide the alert ===
	var hideAlert = function()
	{
		var div = document.getElementById('opn-alert');
		
		div.style.opacity = '0';
		div.style.visibility = 'hidden';
	};
	
	// ========== Fade out the alert ===
	var fadeAlert = function()
	{
		var div = document.getElementById('opn-alert');
		
		if (div.style.opacity > .1)
		{
			div.style.opacity = (div.style.opacity - .1);
			window.setTimeout(fadeAlert, 20);
		}
		else hideAlert();
	};
	
	// ========== Change the icon image of the alert ===
	var changeAlertIcon = function(imageURL)
	{
		document.getElementById('opn-alert').getElementsByTagName('img')[0].src = imageURL;
	};
	
	// =-=-=-=-=- S E T - U P =-=
	
	// ========== Create interface container ===
	interfaceDiv.id = 'opn-interface';
	interfaceDiv.className = 'first last output-primary section';
	interfaceDiv.style.position = 'fixed';
	interfaceDiv.style.zIndex = '1001';
	interfaceDiv.style.width = '50%';
	interfaceDiv.style.top = '15%';
	interfaceDiv.style.left = '25%';
	interfaceDiv.style.background = '#BBC2BB';
	interfaceDiv.style.visibility = 'hidden';
	intContainerDiv.className = 'trailing section-block';
	intContainerDiv.style.padding = '5px 5px 5px 5px';
	
	// ========== Create interface header ===
	intHeadDiv.className = 'section-head';
	headIconImg.className = 'icon';
	headIconImg.src = 'http://i.deviantart.com/icons/userpage/notes.gif';
	headFloatRightSpan.className = 'aside-right';
	headFloatRightSpan.style.marginTop = '5px';
	headFloatRightSpan.style.fontSize = 'x-small';
	headOpenNotesA.href = 'http://my.deviantart.com/notes/?to=unknown';
	headOpenNotesA.innerHTML = 'Open Notes...';
	
	// ========== Create subject textfield ===
	intSubjectText.id = 'opn-notesubject';
	intSubjectText.type = 'text';
	intSubjectText.className = 'text';
	intSubjectText.value = '';
	intSubjectText.size = '30';
	intSubjectText.maxLength = '80';
	intSubjectLabel.innerHTML = 'Subject:';
	
	// ========== Create message textarea ===
	intMessageTextarea.id = 'opn-notebody';
	intMessageTextarea.style.height = '200px';
	intMessageTextarea.style.width = '100%';
	intMessageLabel.innerHTML = 'Message:';
	intPreviewDiv.id = 'opn-preview';
	intPreviewDiv.style.height = '200px';
	intPreviewDiv.style.width = '100%';
	intPreviewDiv.style.border = '1px solid black';
	
	// ========== Create interface footer ===
	intBottomDiv.className = 'trailing section-foot';
	intFootDiv.className = 'trailing section-foot';
	footPreviewButton.id = 'opn-prevbutton';
	footPreviewButton.type = 'button';
	footPreviewButton.className = 'beacon';
	footPreviewButton.value = 'Preview';
	footSendButton.type = 'button';
	footSendButton.className = 'beacon aside-right';
	footSendButton.value = 'Send Note';
	footCloseButton.type = 'button';
	footCloseButton.className = 'beacon aside-left';
	footCloseButton.value = 'Close';
	
	// ========== Create background ===
	backgroundDiv.id = 'opn-background';
	backgroundDiv.style.position = 'fixed';
	backgroundDiv.style.zIndex = '1000';
	backgroundDiv.style.width = '100%';
	backgroundDiv.style.height = '100%';
	backgroundDiv.style.top = '0px';
	backgroundDiv.style.left = '0px';
	backgroundDiv.style.background = '#000000';
	backgroundDiv.style.opacity = '.75';
	backgroundDiv.style.visibility = 'hidden';
	
	// ========== Create alert ===
	alertDiv.id = 'opn-alert';
	alertDiv.style.position = 'fixed';
	alertDiv.style.zIndex = '1002';
	alertDiv.style.top = '20px';
	alertDiv.style.right = '20px';
	alertDiv.style.padding = '10px 20px 10px 10px';
	alertDiv.style.background = '#D6DBD6';
	alertDiv.style.border = '1px solid #4A584A';
	alertDiv.style.opacity = '0';
	alertDiv.style.visibility = 'hidden';
	alertDiv.addEventListener('click', hideAlert, true);
	alertIconImg.className = 'icon';
	alertMessageSpan.style.fontWeight = 'bold';
	
	// ========== Build the interface ===
	headTitleH2.appendChild(headIconImg);
	headTitleH2.innerHTML += ' Send a note to ';
	headTitleH2.appendChild(headRecipientSpan);
	headFloatRightSpan.appendChild(headOpenNotesA);
	
	intHeadDiv.appendChild(headFloatRightSpan);
	intHeadDiv.appendChild(headTitleH2);
	
	intContainerDiv.appendChild(intSubjectLabel);
	intContainerDiv.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	intContainerDiv.appendChild(intSubjectText);
	intContainerDiv.innerHTML += '<br /><br />';
	intContainerDiv.appendChild(intMessageLabel);
	intContainerDiv.innerHTML += '<br />';
	intContainerDiv.appendChild(intMessageTextarea);
	
	
	intBottomDiv.appendChild(footPreviewButton);
	
	intFootDiv.appendChild(footCloseButton);
	intFootDiv.appendChild(footSendButton);
	
	interfaceDiv.appendChild(intHeadDiv);
	interfaceDiv.appendChild(intContainerDiv);
	interfaceDiv.appendChild(intBottomDiv);
	interfaceDiv.appendChild(intFootDiv);
	
	// ========== Build the alert ===
	alertMessageLabel.appendChild(alertMessageSpan);
	
	alertDiv.appendChild(alertIconImg);
	alertDiv.innerHTML += '&nbsp;';
	alertDiv.appendChild(alertMessageLabel);
	
	// ========== Add everything to the DOM ===
	document.body.appendChild(interfaceDiv);
	document.body.appendChild(backgroundDiv);
	document.body.appendChild(alertDiv);
	
	// ========== Begin capturing clicks on the page ===
	document.addEventListener('click', handleClicks, true);
	
	// ========== Show the loaded alert ===
	changeAlertIcon(NEW_NOTE);
	showAlert('onPageNote loaded...');
})()