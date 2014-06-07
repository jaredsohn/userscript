// ==UserScript==
// @name	XenForo Post Style
// @namespace	Makaze
// @include	*
// @grant	none
// @version	5.0.4
// ==/UserScript==

/*
 XENFORO POST TEMPLATE SCRIPT
 
 PRESS Alt+T TO APPLY ON ANY PAGE

 AUTOMATIC FORMATTING OPTIONAL
*/

function getPosition(element) {
	var xPosition = 0,
	yPosition = 0;

	while (element) {
		xPosition += (element.offsetLeft
			+ element.clientLeft);
		yPosition += (element.offsetTop
			+ element.clientTop);
		element = element.offsetParent;
	}
	return {x: xPosition, y: yPosition};
}

Math.easeInOutQuad = function (time, start, change, duration) {
	time /= duration / 2;
	if (time < 1) {
		return change / 2 * time * time + start;
	}
	time--;
	return -change / 2 * (time * (time - 2) - 1) + start;
};

function scrollTo(element, to, duration) {
	var start = element.scrollTop,
	change = to - start,
	currentTime = 0,
	increment = 1;

	var animateScroll = function() {        
		var val = Math.easeInOutQuad(currentTime, start, change, duration);                        
		element.scrollTop = val; 
		currentTime += increment;
		if (currentTime < duration) {
			setTimeout(animateScroll, increment);
		}
	};

	animateScroll();
}

function selectRange(elem, start, end) {
	var range;

	if (elem.setSelectionRange) {
		elem.focus();
		elem.setSelectionRange(start, end);
	} else if (elem.createTextRange) {
		range = elem.createTextRange();
		range.collapse(true);
		range.moveEnd('character', end);
		range.moveStart('character', start);
		range.select();
	}
}

function cursor(elem, position) {
	selectRange(elem, position, position);
}

function applyTemplate(elem) {
	var formContext = elem,
	opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
	htmlPrefix = (opts.hasOwnProperty('xf_template_htmlPrefix')) ? opts.xf_template_htmlPrefix : '',
	htmlSuffix = (opts.hasOwnProperty('xf_template_htmlSuffix')) ? opts.xf_template_htmlSuffix : '',
	bbPrefix = (opts.hasOwnProperty('xf_template_bbPrefix')) ? opts.xf_template_bbPrefix : '',
	bbSuffix = (opts.hasOwnProperty('xf_template_bbSuffix')) ? opts.xf_template_bbSuffix : '',
	thisList,
	thisLink,
	instance,
	postForm,
	plainText,
	i = 0;

	var applyTemplateEvent = function(event) {
		var parent = event.target;
		applyToChildren(parent);
		event.target.removeEventListener('keydown', applyTemplateEvent, false);
	};

	var applyToChildren = function(parent) {
		var thisChild,
		applyTo,
		i = 0;

		for (i = 0; i < parent.childNodes.length; i++) {
			thisChild = parent.childNodes[i];
			if (thisChild.innerHTML) {
				applyTo = thisChild.innerHTML.replace(
					/\[quote([^]+)\[\/quote\]/gi, htmlSuffix + '[quote$1[/quote]' + htmlPrefix
				);

				thisChild.innerHTML = htmlPrefix + applyTo + htmlSuffix;
			}
		}
	};

	while (formContext.getElementsByClassName('redactor_box')[0] == null && formContext.parentNode) {
		formContext = formContext.parentNode;
	}

	if (opts.hasOwnProperty('xf_template_auto')) {
		for (i = 0; i < formContext.getElementsByClassName('redactor_MessageEditor').length; i++) {
			instance = formContext.getElementsByClassName('redactor_MessageEditor')[i];
			postForm = instance.contentWindow.document;
			if (!postForm.body.textContent.length) {
				postForm.body.addEventListener('keydown', applyTemplateEvent, false);
			} else {
				applyToChildren(postForm.body);
			}
		}
		for (i = 0; i < formContext.getElementsByClassName('bbCodeEditorContainer').length; i++) {
			plainText = formContext.getElementsByClassName('bbCodeEditorContainer')[i].getElementsByTagName('textarea')[0];
			plainText.value = bbPrefix + plainText.value + bbSuffix;
			cursor(plainText, plainText.value.length - bbSuffix.length);
		}
	} else {
		thisList = document.getElementById('AccountMenu').getElementsByClassName('blockLinksList')[0];
		for (i = 0; i < thisList.getElementsByTagName('a').length; i++) {
			thisLink = thisList.getElementsByTagName('a')[i];
			if (thisLink.href.match(/account\/personal\-details/gi) && thisLink.href.substr(window.location.href.length - 14, 14) !== '#Post_Template') {
				thisLink.href = thisLink.href + '#Post_Template';
				thisLink.click();
				break;
			}
		}
	}
}

function xenForoMessage(msg, success) {
	if (success) {
		$('#templateMessage .content').html(msg);
		console.log(msg);
	} else {
		$('#templateMessage .content').html('<strong>Error:</strong> ' + msg);
		console.log('Error:', msg);
	}
	$('#templateMessage').slideDown('medium');
	$('#templateMessage .content').animate({
		'opacity': 1
	}, 'fast');
	setTimeout(function() {
		$('#templateMessage').slideUp('medium');
		$('#templateMessage .content').animate({
			'opacity': 0
		}, 'fast');
	}, 1500);
}

function runInGlobal(code) {
	var scripts = document.createElement('script');
	scripts.type = 'text/javascript';
	scripts.id = 'runInGlobal';
	scripts.appendChild(document.createTextNode(
		code +
		'\n\n' +
		'document.getElementById(\'runInGlobal\').remove();'
	));

	(document.head || document.body || document.documentElement).appendChild(scripts);
}

function saveTemplateSettings() {
	if (!document.getElementById('htmlPrefixField').value.length) {
		xenForoMessage('HTML prefix required.', false);
		return false;
	}

	if (!document.getElementById('htmlSuffixField').value.length) {
		xenForoMessage('HTML suffix required.', false);
		return false;
	}

	if (!document.getElementById('bbPrefixField').value.length) {
		xenForoMessage('BBCode prefix required.', false);
		return false;
	}

	if (!document.getElementById('bbSuffixField').value.length) {
		xenForoMessage('BBCode suffix required.', false);
		return false;
	}
	
	var opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {};

	opts.xf_template_auto = (document.getElementById('autoApplyField').options[document.getElementById('autoApplyField').selectedIndex].value === 'true');
	opts.xf_template_htmlPrefix = document.getElementById('htmlPrefixField').value;
	opts.xf_template_htmlSuffix = document.getElementById('htmlSuffixField').value;
	opts.xf_template_bbPrefix = document.getElementById('bbPrefixField').value;
	opts.xf_template_bbSuffix = document.getElementById('bbSuffixField').value;
	localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));

	xenForoMessage('Your settings have been saved.', true);
}

var applyHandler = function() {
	applyTemplate(this);
};

if (document.documentElement.id === "XenForo") {
	var opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {},
	autoApply = (opts.hasOwnProperty('xf_template_auto')) ? opts.xf_template_auto : false,
	htmlPrefix = (opts.hasOwnProperty('xf_template_htmlPrefix')) ? opts.xf_template_htmlPrefix : '',
	htmlSuffix = (opts.hasOwnProperty('xf_template_htmlSuffix')) ? opts.xf_template_htmlSuffix : '',
	bbPrefix = (opts.hasOwnProperty('xf_template_bbPrefix')) ? opts.xf_template_bbPrefix : '',
	bbSuffix = (opts.hasOwnProperty('xf_template_bbSuffix')) ? opts.xf_template_bbSuffix : '',
	instance,
	buttonsContext,
	richInstance,
	richDoc,
	field,
	i = 0;

	// Button creation and auto-application

	if (document.getElementsByClassName('MessageEditor')[0] != null) {
		for (i = 0; i < document.getElementsByClassName('MessageEditor').length; i++) {
			instance = document.getElementsByClassName('MessageEditor')[i];
			buttonsContext = instance;

			while (buttonsContext.getElementsByClassName('submitUnit')[0] == null && buttonsContext.parentNode) {
				buttonsContext = buttonsContext.parentNode;
			}

			buttonsContext = buttonsContext.getElementsByClassName('submitUnit')[0].getElementsByClassName('button primary')[0].parentNode;

			var applyButton = document.createElement('input'),
			applyButtonSpacer = document.createTextNode(String.fromCharCode(160));
			applyButton.type = 'button';
			applyButton.value = 'Apply Style';
			applyButton.className = 'button JsOnly applyButton';
			applyButton.onclick = applyHandler;

			buttonsContext.appendChild(applyButtonSpacer);
			buttonsContext.appendChild(applyButton);

			if (autoApply.toString() === 'true') {
				applyTemplate(instance);
			}
		}

		document.addEventListener('keydown', function(e) {
			var i = 0,
			keyInstance;

			if (e.keyCode == 84 && e.altKey) {
				for (i = 0; i < document.getElementsByClassName('MessageEditor').length; i++) {
					keyInstance = document.getElementsByClassName('MessageEditor')[i];
					applyTemplate(keyInstance);
				}
			}
		}, false);

		var applyToRichHandler = function(e) {
			if (e.keyCode == 84 && e.altKey) {
				applyTemplate(richInstance);
			}
		};

		if (document.getElementsByClassName('redactor_MessageEditor')[0] != null) {
			for (i = 0; i < document.getElementsByClassName('redactor_MessageEditor').length; i++) {
				richInstance = document.getElementsByClassName('redactor_MessageEditor')[i];
				richDoc = richInstance.contentWindow.document;
				richDoc.addEventListener('keydown', applyToRichHandler, false);
			}
		}
	}
	
	if (window.location.href.match(/account\/personal\-details/gi)) {
		// Define xenForoMessage and saveTemplateSettings

		runInGlobal(
			xenForoMessage.toString() +
			saveTemplateSettings.toString()
		);

		// Settings creation

		var optionsContainer = document.createElement('fieldset'),

		header = document.createElement('dl'),
		headerDT = document.createElement('dt'),
		headerDD = document.createElement('dd'),
		headerDD_Text = document.createTextNode('Post Style'),

		autoApplyField = document.createElement('dl'),
		autoApplyFieldDT = document.createElement('dt'),
		autoApplyFieldDT_Text = document.createTextNode('Auto-apply:'),
		autoApplyFieldDD = document.createElement('dd'),
		autoApplyFieldDD_Select = document.createElement('select'),
		autoApplyFieldDD_Select_true = document.createElement('option'),
		autoApplyFieldDD_Select_true_Text = document.createTextNode('True'),
		autoApplyFieldDD_Select_false = document.createElement('option'),
		autoApplyFieldDD_Select_false_Text = document.createTextNode('False'),

		htmlPrefixField = document.createElement('dl'),
		htmlPrefixFieldDT = document.createElement('dt'),
		htmlPrefixFieldDT_Text = document.createTextNode('HTML Prefix:'),
		htmlPrefixFieldDD = document.createElement('dd'),
		htmlPrefixFieldDD_input = document.createElement('input'),

		htmlSuffixField = document.createElement('dl'),
		htmlSuffixFieldDT = document.createElement('dt'),
		htmlSuffixFieldDT_Text = document.createTextNode('HTML Suffix:'),
		htmlSuffixFieldDD = document.createElement('dd'),
		htmlSuffixFieldDD_input = document.createElement('input'),

		bbPrefixField = document.createElement('dl'),
		bbPrefixFieldDT = document.createElement('dt'),
		bbPrefixFieldDT_Text = document.createTextNode('BBCode Prefix:'),
		bbPrefixFieldDD = document.createElement('dd'),
		bbPrefixFieldDD_input = document.createElement('input'),

		bbSuffixField = document.createElement('dl'),
		bbSuffixFieldDT = document.createElement('dt'),
		bbSuffixFieldDT_Text = document.createTextNode('BBCode Suffix:'),
		bbSuffixFieldDD = document.createElement('dd'),
		bbSuffixFieldDD_input = document.createElement('input'),

		submitField = document.createElement('dl'),
		submitFieldDT = document.createElement('dt'),
		submitFieldDD = document.createElement('dd'),
		submitFieldDD_input = document.createElement('input'),

		templateMessage = document.createElement('div'),
		templateMessage_content = document.createElement('div'),
		templateMessage_content_Text = document.createTextNode('Your settings have been saved.');

		// Load input settings

		htmlPrefixFieldDD_input.value = htmlPrefix;
		htmlSuffixFieldDD_input.value = htmlSuffix;
		bbPrefixFieldDD_input.value = bbPrefix;
		bbSuffixFieldDD_input.value = bbSuffix;

		// Header

		headerDD.setAttribute('style', 'font-weight: bolder; font-size: 130%; width: 40%; text-decoration: underline;');
		headerDD.appendChild(headerDD_Text);

		header.className = 'ctrlUnit';
		header.appendChild(headerDT);
		header.appendChild(headerDD);

		// Auto apply field

		autoApplyFieldDT.appendChild(autoApplyFieldDT_Text);

		autoApplyFieldDD_Select_true.value = true;
		autoApplyFieldDD_Select_true.appendChild(autoApplyFieldDD_Select_true_Text);

		autoApplyFieldDD_Select_false.value = false;
		autoApplyFieldDD_Select_false.appendChild(autoApplyFieldDD_Select_false_Text);

		autoApplyFieldDD_Select.id = 'autoApplyField';
		autoApplyFieldDD_Select.className = 'textCtrl';
		autoApplyFieldDD_Select.appendChild(autoApplyFieldDD_Select_true);
		autoApplyFieldDD_Select.appendChild(autoApplyFieldDD_Select_false);

		autoApplyFieldDD.appendChild(autoApplyFieldDD_Select);

		autoApplyField.className = 'ctrlUnit';
		autoApplyField.appendChild(autoApplyFieldDT);
		autoApplyField.appendChild(autoApplyFieldDD);

		// HTML prefix field

		htmlPrefixFieldDT.appendChild(htmlPrefixFieldDT_Text);

		htmlPrefixFieldDD_input.type = 'text';
		htmlPrefixFieldDD_input.id = 'htmlPrefixField';
		htmlPrefixFieldDD_input.className = 'textCtrl OptOut';

		htmlPrefixFieldDD.appendChild(htmlPrefixFieldDD_input);

		htmlPrefixField.className = 'ctrlUnit';
		htmlPrefixField.appendChild(htmlPrefixFieldDT);
		htmlPrefixField.appendChild(htmlPrefixFieldDD);

		// HTML suffix field

		htmlSuffixFieldDT.appendChild(htmlSuffixFieldDT_Text);

		htmlSuffixFieldDD_input.type = 'text';
		htmlSuffixFieldDD_input.id = 'htmlSuffixField';
		htmlSuffixFieldDD_input.className = 'textCtrl OptOut';

		htmlSuffixFieldDD.appendChild(htmlSuffixFieldDD_input);

		htmlSuffixField.className = 'ctrlUnit';
		htmlSuffixField.appendChild(htmlSuffixFieldDT);
		htmlSuffixField.appendChild(htmlSuffixFieldDD);

		// BBCode prefix field

		bbPrefixFieldDT.appendChild(bbPrefixFieldDT_Text);

		bbPrefixFieldDD_input.type = 'text';
		bbPrefixFieldDD_input.id = 'bbPrefixField';
		bbPrefixFieldDD_input.className = 'textCtrl OptOut';

		bbPrefixFieldDD.appendChild(bbPrefixFieldDD_input);

		bbPrefixField.className = 'ctrlUnit';
		bbPrefixField.appendChild(bbPrefixFieldDT);
		bbPrefixField.appendChild(bbPrefixFieldDD);

		// BBCode suffix field

		bbSuffixFieldDT.appendChild(bbSuffixFieldDT_Text);

		bbSuffixFieldDD_input.type = 'text';
		bbSuffixFieldDD_input.id = 'bbSuffixField';
		bbSuffixFieldDD_input.className = 'textCtrl OptOut';

		bbSuffixFieldDD.appendChild(bbSuffixFieldDD_input);

		bbSuffixField.className = 'ctrlUnit';
		bbSuffixField.appendChild(bbSuffixFieldDT);
		bbSuffixField.appendChild(bbSuffixFieldDD);

		// Submit field

		submitFieldDD_input.type = 'button';
		submitFieldDD_input.id = 'submitTemplate';
		submitFieldDD_input.className = 'button';
		submitFieldDD_input.value = 'Save';
		submitFieldDD_input.setAttribute('onClick', 'saveTemplateSettings();');

		submitFieldDD.appendChild(submitFieldDD_input);

		submitField.className = 'ctrlUnit';
		submitField.appendChild(submitFieldDT);
		submitField.appendChild(submitFieldDD);

		// Template message

		templateMessage_content.className = 'content baseHtml';
		templateMessage_content.style.opacity = 0;
		templateMessage_content.appendChild(templateMessage_content_Text);

		templateMessage.id = 'templateMessage';
		templateMessage.className = 'xenOverlay timedMessage';
		templateMessage.setAttribute('style', 'top: 0px; left: 0px; position: fixed; display: none;');
		templateMessage.appendChild(templateMessage_content);

		// Build it all

		optionsContainer.id = 'templateOptionsContainer';
		optionsContainer.appendChild(header);
		optionsContainer.appendChild(autoApplyField);
		optionsContainer.appendChild(htmlPrefixField);
		optionsContainer.appendChild(htmlSuffixField);
		optionsContainer.appendChild(bbPrefixField);
		optionsContainer.appendChild(bbSuffixField);
		optionsContainer.appendChild(submitField);

		document.getElementsByClassName('OptOut')[document.getElementsByClassName('OptOut').length - 1].parentNode.insertBefore(optionsContainer, document.getElementsByClassName('OptOut')[document.getElementsByClassName('OptOut').length - 1]);

		(document.body || document.documentElement).appendChild(templateMessage);

		// Load auto apply setting

		for (i = 0, field = document.getElementById('autoApplyField'); i < field.options.length; i++) {
			if (field.options[i].value === autoApply.toString()) {
				field.selectedIndex = i;
			}
		}
		
		if (window.location.href.substr(window.location.href.length - 14, 14) === '#Post_Template') {
			scrollTo(document.body, getPosition(document.getElementById('templateOptionsContainer')).y, 100);
			runInGlobal('xenForoMessage(\'Post Template installed. Customize your settings.\', true);');
		}
	}
}