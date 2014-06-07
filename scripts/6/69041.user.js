// ==UserScript==
// @name           JP ISBN Linker
// @namespace      http://iwamot.com/
// @include        *
// @version        1.2.3
// ==/UserScript==

(function(unsafeWindow){
	const URI_TEMPLATE_ASIN = 'http://www.amazon.co.jp/exec/obidos/ASIN/{asin}/chintara-22/ref=nosim';
	const URI_TEMPLATE_ISBN = 'http://www.amazon.co.jp/gp/search?field-keywords={isbn}&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&tag=chintara-22';

	const LISTEN_MOUSEUP_EVENT = true;

	const SHORTCUT_KEY = 'M';

	if (LISTEN_MOUSEUP_EVENT) {
		document.addEventListener('mouseup', mouseHandler, true);
	} else {
		document.addEventListener('dblclick', mouseHandler, true);
	}

	function mouseHandler() {
		var selection = window.getSelection();
		if (!selection || selection.rangeCount == 0) return;

		var range = new RangeWrapper(selection.getRangeAt(0));
		while (/^[0-9X\-]/i.test(range.toString())) {
			if (!range.expandStart()) break;
		}
		while (/[0-9X\-]$/i.test(range.toString())) {
			if (!range.expandEnd()) break;
		}

		var isbnCandidate = range.toString();
		isbnCandidate = isbnCandidate.replace(/^[^0-9xX\-]+/, '');
		isbnCandidate = isbnCandidate.replace(/[^0-9xX\-]+$/, '');
		isbnCandidate = isbnCandidate.replace(/-/g, '');

		var validator;
		switch (isbnCandidate.length) {
		case 10:
			validator = new Isbn10Validator();
			break;
		case 13:
			validator = new Isbn13Validator();
			break;
		}
		if (validator && validator.validate(isbnCandidate)) {
			openAsinPage(isbnCandidate);
		}

		range.reset();
	}

	window.addEventListener('load', registerShortcutKey, false);

	function registerShortcutKey() {
		if (/^http:\/\/(?:reader\.livedoor|fastladder)\.com\/reader\//.test(location.href)) {
			unsafeWindow.Keybind.add(SHORTCUT_KEY, function(){
				var item = unsafeWindow.get_active_item(true);
				if (!item) return;
				var isbn = searchIsbn(unsafeWindow.$('item_body_' + item.item_id));
				if (isbn) openAsinPage(isbn);
			});
			return;
		}

		if (!window.Minibuffer) return;

		window.Minibuffer.addCommand({
			name: 'ISBNLinker::open',
			command: function(){
				var currentNode;
				try {
					currentNode = window.Minibuffer.execute('current-node')[0];
				} catch (e) {
				}
				if (!currentNode) currentNode = document.body;

				var isbn = searchIsbn(currentNode);
				if (isbn) openAsinPage(isbn);
			}
		});

		window.Minibuffer.addShortcutkey({
			key: SHORTCUT_KEY,
			description: 'ISBNLinker::open',
			command: function(){window.Minibuffer.execute('ISBNLinker::open');}
		});
	}

	function searchIsbn(node) {
		var matches = node.textContent.match(/[0-9xX\-]{10,}/g);
		if (!matches) return false;

		var isbn10Validator = new Isbn10Validator();
		var isbn13Validator = new Isbn13Validator();

		for (var i = 0, j = matches.length; i < j; i++) {
			var isbnCandidate = matches[i].replace(/-/g, '');
			switch (isbnCandidate.length) {
			case 10:
				if (isbn10Validator.validate(isbnCandidate)) return isbnCandidate;
				break;
			case 13:
				if (isbn13Validator.validate(isbnCandidate)) return isbnCandidate;
				break;
			}
		}

		return false;
	}

	function openAsinPage(isbn) {
		var uri;
		if (isbn.length == 10) {
			uri = URI_TEMPLATE_ASIN.replace('{asin}', isbn);
		} else if (isbn.substr(0, 3) == '978') {
			uri = URI_TEMPLATE_ASIN.replace('{asin}', isbnToAsin(isbn));
		} else {
			uri = URI_TEMPLATE_ISBN.replace('{isbn}', isbn);
		}
		if (window.GM_openInTab) {
			GM_openInTab(uri);
		} else {
			window.open(uri);
		}
	}

	function isbnToAsin(isbn) {
		return (isbn.length == 10) ? isbn : isbn13ToIsbn10(isbn);
	}

	function isbn13ToIsbn10(isbn13) {
		var isbn10Base = isbn13.substr(3, 9);
		return isbn10Base + (new Isbn10Validator()).calcCheckDigit(isbn10Base);
	}

	function areNodesSame(n1, n2) {
		if (n1.isSameNode) return n1.isSameNode(n2);
		return n1 === n2;
	}

// RangeWrapper

	var RangeWrapper = function(range){
		this.range = range;
		this.defaultStartContainer = range.startContainer;
		this.defaultStartOffset = range.startOffset;
		this.defaultEndContainer = range.endContainer;
		this.defaultEndOffset = range.endOffset;
	};

	RangeWrapper.prototype.expandStart = function(){
		var startContainer = this.range.startContainer;
		if (startContainer.nodeType != 3) return false;

		var startOffset = this.range.startOffset;
		if (startOffset > 0) {
			this.range.setStart(startContainer, startOffset - 1);
			return true;
		}

		var blockContainer = this.getBlockContainer();
		var previousTextNode = blockContainer.getPreviousTextNode(startContainer);
		if (!previousTextNode) return false;

		this.range.setStart(previousTextNode, previousTextNode.length);
		return true;
	};

	RangeWrapper.prototype.expandEnd = function(){
		var endContainer = this.range.endContainer;
		if (endContainer.nodeType != 3) return false;

		var endOffset = this.range.endOffset;
		if (endOffset < endContainer.length) {
			this.range.setEnd(endContainer, endOffset + 1);
			return true;
		}

		var blockContainer = this.getBlockContainer();
		var nextTextNode = blockContainer.getNextTextNode(endContainer);
		if (!nextTextNode) return false;

		this.range.setEnd(nextTextNode, 0);
		return true;
	};

	RangeWrapper.prototype.reset = function(){
		this.range.setStart(this.defaultStartContainer, this.defaultStartOffset);
		this.range.setEnd(this.defaultEndContainer, this.defaultEndOffset);
	};

	RangeWrapper.prototype.getBlockContainer = function(){
		if (this.blockContainer) return this.blockContainer;
		var container = this.range.commonAncestorContainer;
		while (!container.clientHeight) {
			if (!container.parentNode) break;
			container = container.parentNode;
		}
		this.blockContainer = new BlockContainer(container);
		return this.blockContainer;
	};

	RangeWrapper.prototype.toString = function(){
		return this.range.toString();
	};

// BlockContainer

	var BlockContainer = function(blockContainer){
		this.blockContainer = blockContainer;
	};

	BlockContainer.prototype.getTextNodes = function(){
		if (this.textNodes) return this.textNodes;
		var textNodesSnapshot = document.evaluate(
			"descendant::text()", this.blockContainer,
			null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
		);
		var textNodes = [];
		for (var i = 0, j = textNodesSnapshot.snapshotLength; i < j; i++) {
			textNodes.push(textNodesSnapshot.snapshotItem(i));
		}
		this.textNodes = textNodes;
		return textNodes;
	};

	BlockContainer.prototype.getFirstTextNode = function(){
		if (this.firstTextNode) return this.firstTextNode;
		var textNodes = this.getTextNodes();
		if (textNodes.length > 0) {
			this.firstTextNode = textNodes[0];
		} else {
			this.firstTextNode = false;
		}
		return this.firstTextNode;
	};

	BlockContainer.prototype.getLastTextNode = function(){
		if (this.lastTextNode) return this.lastTextNode;
		var textNodes = this.getTextNodes();
		if (textNodes.length > 0) {
			this.lastTextNode = textNodes[textNodes.length - 1];
		} else {
			this.lastTextNode = false;
		}
		return this.lastTextNode;
	};

	BlockContainer.prototype.getPreviousTextNode = function(currentTextNode){
		var textNodes = this.getTextNodes();
		for (var i = 0, j = textNodes.length; i < j; i++) {
			if (areNodesSame(textNodes[i], currentTextNode)) {
				return (i > 1) ? textNodes[i - 1] : false;
			}
		}
	};

	BlockContainer.prototype.getNextTextNode = function(currentTextNode){
		var textNodes = this.getTextNodes();
		var maxIndex = textNodes.length - 1;
		for (var i = maxIndex; i >= 0; i--) {
			if (areNodesSame(textNodes[i], currentTextNode)) {
				return (i < maxIndex) ? textNodes[i + 1] : false;
			}
		}
	};

// IsbnValidator

	var IsbnValidator = function(){};

	IsbnValidator.prototype.validate = function(string){
		if (!this.regExp.test(string)) return false;
		return (string[string.length - 1] == this.calcCheckDigit(string));
	};

// Isbn10Validator

	var Isbn10Validator = function(){
		this.regExp = /^[0-9]{9}[0-9X]$/i;
	};

	Isbn10Validator.prototype = new IsbnValidator();

	Isbn10Validator.prototype.calcCheckDigit = function(string){
		var sum = 0;
		for (var i = 0; i < 9; i++) {
			sum += parseInt(string[i], 10) * (10 - i);
		}

		var checkDigit = 11 - (sum % 11);
		switch (checkDigit) {
		case 10:
			return 'X';
		case 11:
			return '0';
		default:
			return checkDigit.toString();
		}
	};

// Isbn13Validator

	var Isbn13Validator = function(){
		this.regExp = /^[0-9]{13}$/i;
	};

	Isbn13Validator.prototype = new IsbnValidator();

	Isbn13Validator.prototype.calcCheckDigit = function(string){
		var sum = 0;
		for (var i = 0; i < 12; i++) {
			sum += parseInt(string[i], 10) * ((i % 2 == 0) ? 1 : 3);
		}

		var checkDigit = (10 - (sum % 10));
		return (checkDigit == 10) ? '0' : checkDigit.toString();
	};
})(this.unsafeWindow || window);
