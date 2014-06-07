// ==UserScript== 
// @name           Grease Reader 
// @namespace      
// @description    Enhance Google Reader to include auto view next, auto view previous, auto scan next, auto scan previous, auto unstar, and open in new tab, among others.
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==  

/* from prototype, the bind function */

var $A = Array.from = function(iterable) {
	if (!iterable) return [];
	if (iterable.toArray) {
		return iterable.toArray();
	} 
	else {
		var results = [];
		for (var i = 0; i < iterable.length; i++) {
			results.push(iterable[i]);
		}

    		return results;
	}
}

Function.prototype.bind = function() {
	var __method = this, args = $A(arguments), object = args.shift();

	return function() {
		return __method.apply(object, args.concat($A(arguments)));
	}
}

function hasNode(xpath, contextDocument) {
	if(contextDocument) {
		return contextDocument.evaluate('count(' + xpath + ')', contextDocument, null, XPathResult.NUMBER_TYPE, null).numberValue != 0; 
	}
	else {
		return document.evaluate('count(' + xpath + ')', document, null, XPathResult.NUMBER_TYPE, null).numberValue != 0; 
	}
}

function nodeFor(xpath, contextDocument) {
	if(contextDocument) {
		return contextDocument.evaluate(xpath, contextDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
	}
	else {
		return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
	}
}

function nodeIteratorFor(xpath, contextDocument) {
	if(contextDocument) {
		return contextDocument.evaluate(xpath, contextDocument, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null); 
	}
	else {
		return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null); 
	}
}

function nodeSnapshotFor(xpath, contextDocument) {
	if(contextDocument) {
		return contextDocument.evaluate(xpath, contextDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
	}
	else {
		return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
	}
}

function xpathPosition(node, tagName) {
	if(node.previousSibling) {
		if(node.tagName == tagName) {
			return xpathPosition(node.previousSibling, tagName) + 1;
		}
		else {
			return xpathPosition(node.previousSibling, tagName) + 0;
		}		
	}
	else {
		if(node.tagName == tagName) {
			return 1;
		}
		else {
			return 0;
		}
	}
}

function xpath(node) {
	if(node.parentNode) {
		return xpath(node.parentNode) + '/' + node.tagName + '[' + xpathPosition(node, node.tagName) + ']';
	}
	else {
		return '';
	}
}

/* The Google Reader popup window. */

function GoogleReaderPopup() {
	this.divBack = document.createElement('div');
	this.divFore = document.createElement('div');

	this.divBack.innerHTML = 
		'<div class = "banner banner-background label-keyboard-selector hidden">' + 
			'<div class="primary-message-parent">' + 
				'<ins class="primary-message">Primary Message</ins>' + 
			'</div>' + 
			'<div class="secondary-message-parent">' + 
				'<ins class="secondary-message">Secondary Message</ins>' + 
			'</div>' + 
		'</div>';

	this.divFore.innerHTML = 
		'<div class="banner banner-foreground label-keyboard-selector hidden">' + 
			'<div class="primary-message-parent">' + 
				'<ins class="primary-message">Primary Message</ins>' + 
			'</div>' + 
			'<div class="secondary-message-parent">' + 
				'<ins class="secondary-message">Secondary Message</ins>' + 
			'</div>' + 
		'</div>';

	this.divBack = this.divBack.firstChild;
	this.divFore = this.divFore.firstChild;

	document.body.appendChild(this.divBack);
	document.body.appendChild(this.divFore);
}

/* Set the primary message for the Google Reader popup window. */

GoogleReaderPopup.prototype.setPrimaryMessage = function(message) {
	var divBackContext = this.divBack.firstChild.firstChild;
	var divForeContext = this.divFore.firstChild.firstChild;

	divBackContext.replaceChild(document.createTextNode(message), divBackContext.firstChild);
	divForeContext.replaceChild(document.createTextNode(message), divForeContext.firstChild);
}

/* Set the secondary message for the Google Reader popup window. */

GoogleReaderPopup.prototype.setSecondaryMessage = function(message) {
	var divForeContext = this.divFore.firstChild.nextSibling.firstChild;
	var divBackContext = this.divBack.firstChild.nextSibling.firstChild;

	divBackContext.innerHTML = message; 
	divForeContext.innerHTML = message; 
}

/* Show the Google Reader popup window with the given message; hide it after one second. */

GoogleReaderPopup.prototype.show = function(message, delay) {
	clearTimeout(this.timeout);

	backClassNameArray = this.divBack.className.split(' ');
	foreClassNameArray = this.divFore.className.split(' ');

	for(var index = 0; index < backClassNameArray.length; index++) 
		if(backClassNameArray[index] == 'hidden') 
			backClassNameArray[index] = '';

	for(var index = 0; index < foreClassNameArray.length; index++) 
		if(foreClassNameArray[index] == 'hidden') 
			foreClassNameArray[index] = '';

	this.divBack.className = backClassNameArray.join(' ');
	this.divFore.className = foreClassNameArray.join(' ');

	this.setSecondaryMessage(message);

	if(delay) {
		this.timeout = setTimeout(this.hide.bind(this), delay);
	}
	else {
		this.timeout = setTimeout(this.hide.bind(this), 1000);
	}
}

/* Hide the Google Reader popup window. */

GoogleReaderPopup.prototype.hide = function() {
	this.divBack.className = this.divBack.className + ' hidden';
	this.divFore.className = this.divFore.className + ' hidden';
}

/* The Google Reader web application. */

function GoogleReader() {
	this.popup = new GoogleReaderPopup();
}

/* Dispatch a keypress event. */

GoogleReader.prototype.dispatch = function(character, shift) {
	var event = document.createEvent('KeyboardEvent'); 
	    event.initKeyEvent('keypress', true, true, null, false, false, shift, false, 0, character.charCodeAt(0)); 

	document.dispatchEvent(event);
}

/* View the next item in the reading list. */

GoogleReader.prototype.viewNext = function() {
	this.dispatch('j');
}

/* View the previous item in the reading list. */

GoogleReader.prototype.viewPrevious = function() {
	this.dispatch('k');
}

/* Scan the next item in the reading list. */

GoogleReader.prototype.scanNext = function() {
	this.dispatch('n');
}

/* Scan the previous item in the reading list. */

GoogleReader.prototype.scanPrevious = function() {
	this.dispatch('p');
}

/* Star the current item in the reading list. */

GoogleReader.prototype.star = function() {
	this.dispatch('s');
}

/* Load starred items in the reading list. */

GoogleReader.prototype.loadStar = function() {
	this.dispatch('g');
	this.dispatch('s');
}

/* Page down. */

GoogleReader.prototype.pageDown = function() {
	this.dispatch('n', true);
}

/* Status */

GoogleReader.prototype.statusLoading = 0;
GoogleReader.prototype.statusLoaded  = 1;
GoogleReader.prototype.statusEmpty   = 2;

GoogleReader.prototype.statusNext = function() {
	var nodeNext = nodeFor('//html/body/div[11]/div/div[2]/div/div/div[2]/div[2]/ul/li[5]');

	if(nodeNext.className.indexOf('hidden') != -1) {
		return this.statusEmpty;
	}
	else
	if(nodeNext.className.indexOf('loading') != -1) {
		return this.statusLoading;
	}
	else {
		return this.statusLoaded;
	}
}

GoogleReader.prototype.statusPrevious = function() {
	var nodePrevious = nodeFor('//html/body/div[11]/div/div[2]/div/div/div[2]/div[2]/ul/li[3]');

	if(nodePrevious.className.indexOf('hidden') != -1) {
		return this.statusEmpty;
	}
	else
	if(nodePrevious.className.indexOf('loading') != -1) {
		return this.statusLoading;
	}
	else {
		return this.statusLoaded;
	}
}

/* The Grease Reader. */

function GreaseReader() {
	GoogleReader.call(this);

	this.interval              = GM_getValue('interval', 1000);
	this.viewPreviousAutoState = false;
	this.viewNextAutoState     = false;

	this.popup.setPrimaryMessage('Grease Reader');
}

/* Set the Grease Reader prototype to Google Reader */

GreaseReader.prototype = new GoogleReader();

GreaseReader.prototype.statusHalt             = 0;
GreaseReader.prototype.statusScanNextAuto     = 1;
GreaseReader.prototype.statusScanPreviousAuto = 2;
GreaseReader.prototype.statusViewNextAuto     = 3;
GreaseReader.prototype.statusViewPreviousAuto = 4;
GreaseReader.prototype.statusUnstarAuto       = 5;
GreaseReader.prototype.statusHelp             = 6;
GreaseReader.prototype.statusEndAuto          = 7;
GreaseReader.prototype.status                 = GreaseReader.prototype.statusHalt;

GreaseReader.prototype.xpathNodeItemBodyContainer = '//div[@class = "item-body-container"]/div';

/* Listen for the '?', 'J', 'K', 'V', 'b', 'o', '+', '-', and 'e' keys.
 * On '?', show help.
 * On 'J', toggle auto view next.
 * On 'K', toggle auto view previous.
 * On 'V', show original item in new tab.
 * On 'b', toggle auto scan next.
 * On 'o', toggle auto scan previous.
 * On 'S', toggle auto unstar.
 * On '+', scroll faster.
 * On '-', scroll slower.
 * On 'e', go to the end of the list.
 * On any other, reset the timeout
 */

GreaseReader.prototype.listen = function(event) {
	if(event.type == 'keypress') {
            if(event.target.tagName == 'INPUT') {
			// ignore event type keypress if event target tagname is "INPUT"
		}
		else
		if(event.charCode == '?'.charCodeAt(0)) {
			this.showHelp();
		}
		else
		if(event.charCode == 'V'.charCodeAt(0)) {
			this.showOriginalTab();
		}
		else
		if(event.charCode == 'b'.charCodeAt(0)) {
			this.scanNextAuto();
		}
		else
		if(event.charCode == 'o'.charCodeAt(0)) {
			this.scanPreviousAuto();
		}
		else
		if(event.charCode == 'J'.charCodeAt(0)) {
			this.viewNextAuto();
		}
		else
		if(event.charCode == 'K'.charCodeAt(0)) {
			this.viewPreviousAuto();
		}
		else
		if(event.charCode == '+'.charCodeAt(0)) {
			this.faster();
		}
		else
		if(event.charCode == '-'.charCodeAt(0)) {
			this.slower();
		}
		else
		if(event.charCode == 'S'.charCodeAt(0)) {
			this.unstarAuto();
		}
		else
		if(event.charCode == 'e'.charCodeAt(0)) {
			this.endAuto();
		}
		else
		if(event.view != null) {
			this.resetTimeout();
		}
	}
	else 
	if(event.type == 'DOMNodeInserted') {
		if(event.target == nodeFor(this.xpathNodeItemBodyContainer)) {
			this.onNodeInsertedItemBodyContainer(event);
		}
	}
}

/* If the item body contains an image, float the image right and, if
   necessary, resize the image to be 250 pixels in width. */

GreaseReader.prototype.onNodeInsertedItemBodyContainer = function(event) {
	var image = event.target.getElementsByTagName('img');

	for(var index = 0; index < image.length; index++) {
		image[index].style.cssFloat = 'right';
		image[index].style.clear    = 'both';

		if(image[index].offsetWidth > 250) {
			image[index].style.width  = '250px';
			image[index].style.height = 'auto';
		}
	}
}

/* Show help. */

GreaseReader.prototype.showHelp = function() {
	if(this.status == this.statusHelp) {
		this.status = this.statusHalt;
	}
	else {
		this.status = this.statusHelp;
		this.showHelpHelper();
	}
}

GreaseReader.prototype.showHelpHelper = function() {
	if(this.status == this.statusHelp) {
		help = '<table style = "margin-left: auto; margin-right: auto; text-align: left; font-size: 9pt">' +
				'<tr>' + 
					'<td colspan =  "3" style = "text-align: center; font-size: 16pt">Google Reader Help</td>' +
					'<td rowspan = "12" style = "width: 20px"></td>' +
					'<td colspan =  "3" style = "text-align: center; font-size: 16pt">Grease Reader Help</td>' +
				'</tr>' + 
				'<tr>' + 
					'<td></td><td rowspan = "11" style = "width: 10px"></td><td></td>' + 
					'<td></td><td rowspan = "11" style = "width: 10px"></td><td></td>' +
				'</tr>' + 
				'<tr>' + 
					'<td>      j</td><td>View the next item.</td>' + 
					'<td>shift j</td><td>Toggle auto view next.</td>' +
				'</tr>' + 
				'<tr>' + 
					'<td>      k</td><td>View the previous item.</td>' +
					'<td>shift k</td><td>Toggle auto view previous.</td>' +
				'</tr>' + 
				'<tr>' + 
					'<td>      n</td><td>Scan to the next item.</td>' + 
					'<td>      b</td><td>Toggle auto scan next.</td>' +
				'</tr>' + 
				'<tr>' + 
					'<td>      p</td><td>Scan to the previous item.</td>' + 
					'<td>      o</td><td>Toggle auto scan previous.</td>' +
				'</tr>' + 
				'<tr>' + 
					'<td>      v</td><td>Open the original item in a new window.</td>' +
					'<td>shift v</td><td>Open the original item in a new tab.</td>' +
				'</tr>' + 
				'<tr>' + 
					'<td>      s</td><td>Star the current item.</td>' +
					'<td>shift s</td><td>Toggle auto unstar.</td>' +
				'</tr>' + 
				'<tr>' + 
					'<td>      h</td><td>Go to the first item.</td>' +
					'<td>      e</td><td>Go to the last item.</td>' +
				'</tr>' + 
				'<tr>' + 
					'<td></td><td></td>' +
					'<td>+</td><td>Scroll faster.</td>' +
				'</tr>' + 
				'<tr>' + 
					'<td></td><td></td>' +
					'<td>-</td><td>Scroll slower.</td>' +
				'</tr>' + 
				'<tr>' + 
					'<td></td><td></td>' +
					'<td>?</td><td>Show help.</td>' +
				'</tr>' + 
			'</table>';

		this.popup.show(help, 1000);
		this.timeout = setTimeout(this.showHelpHelper.bind(this), 1000);
	}
}

/* Show original in new tab. */

GreaseReader.prototype.showOriginalTab = function() {
	GM_openInTab(nodeFor('//a[@class = "launch-original"]/@href').textContent);
}

/* Toggle scroll next view. */

GreaseReader.prototype.viewNextAuto = function() {
	if(this.status == this.statusViewNextAuto) {
		this.status = this.statusHalt;

		this.popup.show('Auto View Next - Off');
	}
	else {
		this.status = this.statusViewNextAuto;
		this.popup.show('Auto View Next - On');

		this.viewNextAutoHelper();
	}
}

GreaseReader.prototype.viewNextAutoHelper = function() {
	if(this.status == this.statusViewNextAuto) {
		if(this.statusNext() == this.statusLoaded) {
			this.viewNext();

			this.timeout = setTimeout(this.viewNextAutoHelper.bind(this), this.interval);
		}
		else
		if(this.statusNext() == this.statusLoading) {
			this.popup.show('Auto View Next - Wait');

			this.timeout = setTimeout(this.viewNextAutoHelper.bind(this), 1000);
		}
		else {
			this.viewNextAuto();
		}
	}
}

/* Toggle scroll previous view. */

GreaseReader.prototype.viewPreviousAuto = function() {
	if(this.status == this.statusViewPreviousAuto) {
		this.status = this.statusHalt;

		this.popup.show('Auto View Previous - Off');
	}
	else {
		this.status = this.statusViewPreviousAuto;
		this.popup.show('Auto View Previous - On');

		this.viewPreviousAutoHelper();
	}
}

GreaseReader.prototype.viewPreviousAutoHelper = function() {
	if(this.status == this.statusViewPreviousAuto) {
		if(this.statusPrevious() == this.statusLoaded) {
			this.viewPrevious();

			this.timeout = setTimeout(this.viewPreviousAutoHelper.bind(this), this.interval);
		}
		else
		if(this.statusPrevious() == this.statusLoading) {
			this.popup.show('Auto View Previous - Wait');

			this.timeout = setTimeout(this.viewPreviousAutoHelper.bind(this), 1000);
		}
		else {
			this.viewPreviousAuto();
		}
	}
}

/* Toggle scroll next scan. */

GreaseReader.prototype.scanNextAuto = function() {
	if(this.status == this.statusScanNextAuto) {
		this.status = this.statusHalt;

		this.popup.show('Auto Scan Next - Off');
	}
	else {
		this.status = this.statusScanNextAuto;
		this.popup.show('Auto Scan Next - On');

		this.scanNextAutoHelper();
	}
}

GreaseReader.prototype.scanNextAutoHelper = function() {
	if(this.status == this.statusScanNextAuto) {
		if(this.statusNext() == this.statusLoaded) {
			this.scanNext();

			this.timeout = setTimeout(this.scanNextAutoHelper.bind(this), this.interval);
		}
		else
		if(this.statusNext() == this.statusLoading) {
			this.popup.show('Auto Scan Next - Wait');

			this.timeout = setTimeout(this.scanNextAutoHelper.bind(this), 1000);
		}
		else {
			this.scanNextAuto();
		}
	}
}

/* Toggle scroll previous scan. */

GreaseReader.prototype.scanPreviousAuto = function() {
	if(this.status == this.statusScanPreviousAuto) {
		this.status = this.statusHalt;

		this.popup.show('Auto Scan Previous - Off');
	}
	else {
		this.status = this.statusScanPreviousAuto;
		this.popup.show('Auto Scan Previous - On');

		this.scanPreviousAutoHelper();
	}
}

GreaseReader.prototype.scanPreviousAutoHelper = function() {
	if(this.status == this.statusScanPreviousAuto) {
		if(this.statusPrevious() == this.statusLoaded) {
			this.scanPrevious();

			this.timeout = setTimeout(this.scanPreviousAutoHelper.bind(this), this.interval);
		}
		else
		if(this.statusPrevious() == this.statusLoading) {
			this.popup.show('Auto Scan Previous - Wait');

			this.timeout = setTimeout(this.scanPreviousAutoHelper.bind(this), 1000);
		}
		else {
			this.scanPreviousAuto();
		}
	}
}

/* Scroll slower. */

GreaseReader.prototype.slower = function() {
	this.interval = this.interval + 1000;

	this.popup.show('Wait ' + (this.interval / 1000) + (this.interval == 1000 ? ' second before scrolling.' : ' seconds before scrolling.'));

	this.persist();
}

/* Scroll faster. */

GreaseReader.prototype.faster = function() {
	this.interval = (this.interval == 1000 ? this.interval : this.interval - 1000);

	this.popup.show('Wait ' + (this.interval / 1000) + (this.interval == 1000 ? ' second before scrolling.' : ' seconds before scrolling.'));

	this.persist();
}

/* Toggle unstar. */

GreaseReader.prototype.unstarAuto = function() {
	if(this.status == this.statusUnstarAuto) {
		this.status = this.statusHalt;

		this.popup.show('Auto Unstar - Off');
	}
	else {
		this.status = this.statusUnstarAuto;
		this.popup.show('Auto Unstar - On');

		this.loadStar();

		this.unstarAutoHelper.bind(this);
	}
}

GreaseReader.prototype.unstarAutoHelper = function() {
	if(this.status == this.statusUnstarAuto) {
		if(this.statusNext() == this.statusLoaded) {
			this.star();
			this.viewNext();

			this.timeout = setTimeout(this.unstarAutoHelper.bind(this), this.interval);
		}
		else
		if(this.statusNext() == this.statusLoading) {
			this.popup.show('Auto Unstar - Wait');

			this.timeout = setTimeout(this.unstarAutoHelper.bind(this), 1000);
		}
		else {
			this.star();
			this.unstarAuto();
		}
	}
}

/* End. */

GreaseReader.prototype.endAuto = function() {
	if(this.status == this.statusEndAuto) {
		this.status = this.statusHalt;

		this.popup.show('Auto End - Off');
	}
	else {
		this.status = this.statusEndAuto;
		this.popup.show('Auto End - On');

		this.endAutoHelper();
	}
}

GreaseReader.prototype.endAutoHelper = function() {
	if(this.status == this.statusEndAuto) {
		if(this.statusNext() == this.statusLoaded) {
			this.pageDown();

			this.timeout = setTimeout(this.endAutoHelper.bind(this), 1000);
		}
		else
		if(this.statusNext() == this.statusLoading) {
			this.popup.show('Auto End - Wait');

			this.timeout = setTimeout(this.endAutoHelper.bind(this), 1000);
		}
		else {
			this.endAuto();
		}
	}
}

/* Reset timeout. */

GreaseReader.prototype.resetTimeout = function() {
	clearTimeout(this.timeout);

	if(this.status == this.statusScanNextAuto) {
		this.timeout = setTimeout(this.scanNextAutoHelper.bind(this), this.interval);
	}
	else 
	if(this.status == this.statusScanPreviousAuto) {
		this.timeout = setTimeout(this.scanPreviousAutoHelper.bind(this), this.interval);
	}
	else 
	if(this.status == this.statusViewNextAuto) {
		this.timeout = setTimeout(this.viewNextAutoHelper.bind(this), this.interval);
	}
	else 
	if(this.status == this.statusViewPreviousAuto) {
		this.timeout = setTimeout(this.viewPreviousAutoHelper.bind(this), this.interval);
	}
	else 
	if(this.status == this.statusUnstarAuto) {
		this.timeout = setTimeout(this.unstarAutoHelper.bind(this), this.interval);
	}
}

/* Persist interval. */

GreaseReader.prototype.persist = function() {
	GM_setValue('interval', this.interval);
}

/* Run Grease Reader. */

GreaseReader.prototype.run = function() {
	document.addEventListener('keypress',        this.listen.bind(this), false);
	document.addEventListener('DOMNodeInserted', this.listen.bind(this), false);
}

var GreaseReader = new GreaseReader();
GreaseReader.run();


