// ==UserScript==
// @name        Email
// @namespace   monkey
// @description Envoi d'emails
// @include     https://mail.google.com/mail/*
// @include     http://*.eventbrite.*
// @version     14
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_openInTab
// ==/UserScript==

if(window.location.href.indexOf('google') != -1) {
	var eraseTimeout;
	function dataSpan(value) {
		if (document.getElementById('spanConfirmSaveForm')) {
			window.clearTimeout(eraseTimeout);
			if (!value) {
				document.getElementById('spanConfirmSaveForm').innerHTML = 'Champs Sauvegardés';
			} else {
				document.getElementById('spanConfirmSaveForm').innerHTML = value;
			}
			eraseTimeout = window.setTimeout(function() {
				document.getElementById('spanConfirmSaveForm').innerHTML = '';
			}, 1000);
		} else {
			window.clearTimeout(eraseTimeout);
		}
	}
	var listeAdressesValides = [];

	function sendMail () {
		var currentURL = listeAdressesValides[0];
		listeAdressesValides.shift();
		GM_setValue('adresses', listeAdressesValides.join(','));
		
		window.setTimeout(function() {
			BoucleSendMail();
		}, 2000);
		
		GM_openInTab(currentURL + '?sendMail');
	}

	function BoucleSendMail() {
		var currentURLs = GM_getValue('adresses');
		currentURLs = currentURLs.split(',');
		var URLtoSend = currentURLs[0] + '?sendMail';
		currentURLs.shift();
		GM_setValue('adresses', currentURLs.join(','));
		if(currentURLs.length > 0) {
			window.setTimeout(function() {
				BoucleSendMail();
			}, 2000);
		}
		GM_openInTab(URLtoSend);
	}
	
	function checkEmails () {
		var URLFount = false;
		var listA = document.getElementsByTagName('a');
		for (var i = 0; i < listA.length; i++) {
			if(listA[i].href.indexOf('www.eventbrite.com') != -1) {
				URLFount = true;
			}
		}
		
		if(URLFount == true) {
			if(document.getElementById('envoiEmailForm')) {
				window.setTimeout(checkEmails, 1000);
			} else {
				var newDiv = document.createElement('div');
					newDiv.style.position = 'fixed';
					newDiv.style.bottom = '0px';
					newDiv.style.right = '20px';
					newDiv.style.padding = '1px';
					newDiv.style.margin = '1px';
					newDiv.style.border = '1px solid grey';
					newDiv.id = 'envoiEmailForm';
					newDiv.style.background = 'white';
				var newSpanTitleBox = document.createElement('span');
					newSpanTitleBox.innerHTML = 'Envoi Automatique';
				newDiv.appendChild(newSpanTitleBox);
				newDiv.appendChild(document.createElement('br'));
				
				var newFormName = document.createElement('input');
					newFormName.type = 'text';
				var newFormEmail = document.createElement('input');
					newFormEmail.type = 'text';
				var newFormMessage = document.createElement('textarea');
					newFormMessage.style.height = '100px';
					newFormMessage.style.width = '250px';
				var newDescriptionSpanName = document.createElement('span');
					newDescriptionSpanName.innerHTML = 'Nom : ';
				newDiv.appendChild(newDescriptionSpanName);
				newDiv.appendChild(newFormName);
				newDiv.appendChild(document.createElement('br'));
				var newDescriptionSpanMail = document.createElement('span');
					newDescriptionSpanMail.innerHTML = 'Email : ';
				newDiv.appendChild(newDescriptionSpanMail);
				newDiv.appendChild(newFormEmail);
				newDiv.appendChild(document.createElement('br'));
				var newDescriptionSpanMsg = document.createElement('span');
					newDescriptionSpanMsg.innerHTML = 'Message : ';
				newDiv.appendChild(newDescriptionSpanMsg);
				newDiv.appendChild(newFormMessage);
				newDiv.appendChild(document.createElement('br'));
				
				var newSpanConfirm = document.createElement('span');
				newSpanConfirm.id = 'spanConfirmSaveForm';
				
				var newFormSend = document.createElement('input');
					newFormSend.type = 'button';
					newFormSend.value = 'Envoyer les mails';
				
				newDiv.appendChild(newFormSend);
				newDiv.appendChild(newSpanConfirm);
				document.body.appendChild(newDiv);
				if(GM_getValue('formName') != undefined){
					newFormName.value = GM_getValue('formName');
				} else {
					newFormName.value = 'nom';
				}
				
				if(GM_getValue('formMail') != undefined){
					newFormEmail.value = GM_getValue('formMail');
				} else {
					newFormEmail.value = 'email';
				}
				
				if(GM_getValue('formMsg') != undefined){
					newFormMessage.value = GM_getValue('formMsg');
				} else {
					newFormMessage.value = 'message';
				}
				
				newFormName.addEventListener('keyup', function() {
					GM_setValue('formName', newFormName.value);
					dataSpan();
				}, false);
				
				newFormEmail.addEventListener('keyup', function() {
					GM_setValue('formMail', newFormEmail.value);
					dataSpan();
				}, false);
				
				newFormMessage.addEventListener('keyup', function() {
					GM_setValue('formMsg', newFormMessage.value);
					dataSpan();
				}, false);
				
				newFormSend.addEventListener('click', function() {
					var j = 0;
					var listURLs = document.getElementsByTagName('a');
					for (var i = 0; i < listURLs.length; i++) {
						if(listURLs[i].href.indexOf('/SRCH') != -1 ||
							listURLs[i].href.indexOf('-srch.eventbrite.com') != -1) {
							listeAdressesValides[j] = listURLs[i].href;
							j++
						}
					}
					sendMail();
				}, false);
				
				window.setTimeout(checkEmails, 1000);
			}
		} else {
			if(document.getElementById('envoiEmailForm')) {
				document.getElementById('envoiEmailForm').parentNode.removeChild(document.getElementById('envoiEmailForm'));
			}
			window.setTimeout(checkEmails, 1000);
			
		}
	}
	checkEmails ();
} else if (window.location.href.indexOf('eventbrite') != -1 && window.location.href.indexOf('?sendMail') != -1) {
	window.setTimeout(function() {
		if (document.getElementsByClassName('contact_organizer_link')[0]) {
			document.getElementsByClassName('contact_organizer_link')[0].click();
			window.setTimeout(function() {
				document.getElementById('contact_name').value = GM_getValue('formName');
				document.getElementById('contact_email').value = GM_getValue('formMail');
				document.getElementById('contact_message').value = GM_getValue('formMsg');
				window.setTimeout(function() {
					document.getElementById('lightbox_contact_send_button').click();
				}, 1500);
			}, 1500);
		}
		window.setTimeout(function() {
			window.close();
		}, 9000);
	}, 1500);
}