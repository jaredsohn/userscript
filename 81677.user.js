// ==UserScript==
// @name         Filter large form selects
// @namespace    http://browservulsel.blogspot.com/
// @description  v0.5.0.4 - Adds a filtering tool to large select fields
// ==/UserScript==

/*

	Author: Jasper de Vries, jepsar@gmail.com
	Date:   2006-04-12

	Fixed for Firefox 3.6
	Used function from PrototypeJS
	Author: Thomas Kosel, thomas.kosel@gmx.de
	Date:   2010-07-17
*/

GM_addStyle('.flfs-start { position: absolute; z-index: 32767; display: none; width: 16px; height: 16px; opacity: 0.4; background: no-repeat url("data:image/gif;base64,R0lGODlhEAAQAMQfALfT+7F0W2NkZcbm/Yymz/fOmneOuK2trubm5tSbdc3KyYeKkYmVqdr6/9fX18Db/VdLSbWKb+a3isy/u2hDPZWx3+P+/4NcUHx7faG95vD//87v/9Dh/oifwr2/wf///yH5BAEAAB8ALAAAAAAQABAAAAWP4CeOn+Mxh4eQrGcYBGEwCiu6Gcc9QLXUJASjsnsYAZ0FS2EwPjbQQQUDvBl2g4bFsslgDiQm4GnRcDMC8EiYAWQbjQFDUFVEFoz2YPDoCDAjExEFEhgMHQRJAgIOIoKECRcYGIsCCysfEwESCREXEI0IDpgiFwkJAZ9qNh8XAQEUFKusHrEQs6wlB1W5HyEAOw=="); }');
GM_addStyle('.flfs-start:hover { opacity: 1; ');
GM_addStyle('.flfs-input { visibility: hidden; position: absolute; z-index: 32766; padding: 2px; background: #fff; border: 1px solid #aaa; }');
GM_addStyle('.flfs-select { visibility: hidden; position: absolute; z-index: 32766; }');

cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return {left: valueL, top: valueT};
}

function Filter(select, filterId) {
	var obj = this;
	var keyTO = null;
	var inputBlurTO = null;
	var resultBlurTO = null;
	var startFocusTO = null;

	this.keypress = function(e) {
		clearTimeout(keyTO);
		if (e.keyCode == 40) { // Down
			e.preventDefault();
			obj.moveSelectedIndex(1);
			return;
		}
		if (e.keyCode == 38) { // Up
			e.preventDefault();
			obj.moveSelectedIndex(-1);
			return;
		}
		if (e.keyCode == 34) { // Page Down
			obj.moveSelectedIndex(10);
			return;
		}
		if (e.keyCode == 33) { // Page Up
			obj.moveSelectedIndex(-10);
			return;
		}
		if (e.keyCode == 13) { // Enter
			e.preventDefault();
			obj.hideFilter();
			select.focus();
			return;
		}
		if (e.keyCode == 9) { // Tab
			obj.hideFilter();
			return;
		}
		if (e.keyCode == 27) { // Esc
			e.preventDefault();
			unsafeWindow.document.getElementById(input.id).value = '';
			resultSelect.innerHTML = '';
			obj.hideFilter();
			select.focus();
			return;
		}
		keyTO = setTimeout(function(){ obj.filterResult() }, 100);
	}

	this.moveSelectedIndex = function(num) {
		if (resultSelect.selectedIndex + num >= resultSelect.options.length) {
			resultSelect.selectedIndex = resultSelect.options.length - 1;
		}
		else if (resultSelect.selectedIndex + num < 0) {
			resultSelect.selectedIndex = 0;
		}
		else {
			resultSelect.selectedIndex += num;
		}
	}

	this.filterResult = function(show) {
		var newOptions;
		for (var i = 0; i < select.options.length; i++) {
			if (select.options[i].text.toLowerCase().indexOf(input.value.toLowerCase()) >= 0) {
				newOptions += '<option value="'+ i + '">'+ select.options[i].text;
			}
		}
		resultSelect.innerHTML = newOptions;
		if (resultSelect.options.length > 0) resultSelect.selectedIndex = 0;
		obj.sizeResult();
	}

	this.sizeResult = function(){
		if (resultSelect.options.length < 2) {
			resultSelect.size = 2;
		}
		else if (resultSelect.options.length < 10) {
			resultSelect.size = resultSelect.options.length;
		}
		else {
			resultSelect.size = 10;
		}
	}

	this.showFilter = function() {
		clearTimeout(inputBlurTO);
		clearTimeout(resultBlurTO);
		if (resultSelect.options.length == 0) {
			var options;
			for (var i = 0; i < select.options.length; i++) {
				options += '<option value="'+ i + '">'+ select.options[i].text;
			}
			resultSelect.innerHTML = options;
			unsafeWindow.document.getElementById(input.id).value = '';
		}
		obj.sizeResult();
		resultSelect.style.visibility = 'visible';
		input.style.visibility = 'visible';
		select.style.visibility = 'hidden';
		input.focus();
	}

	this.hideFilter = function() {
		clearTimeout(resultBlurTO);
		if (
			input.value != '' &&
			resultSelect.selectedIndex >= 0 &&
			select.selectedIndex != resultSelect.options[resultSelect.selectedIndex].value
		) {
			select.selectedIndex = resultSelect.options[resultSelect.selectedIndex].value;
			if (select.getAttribute('onchange')) {
				unsafeWindow.document.getElementById(select.id).onchange();
			}
		}
		select.style.visibility = 'visible';
		resultSelect.style.visibility = 'hidden';
		input.style.visibility = 'hidden';
	}

	this.resposition = function() {
		var posY = 0;
		var posX = 0;
		var currOffsetParent = select;
		do {
			if (
				document.defaultView.getComputedStyle(currOffsetParent, null)
				.getPropertyValue('position') == 'static'
			) {
				posY += currOffsetParent.offsetTop;
				posX += currOffsetParent.offsetLeft;
			}
			else break;
		} while (currOffsetParent = currOffsetParent.offsetParent);
		a.style.top = (posY + 2) +'px';
		a.style.left = (posX - 8) +'px';
		with (input.style) {
			top = posY +'px';
			left = posX +'px';
		}
	}

	var cModeCorrect = (document.compatMode == 'BackCompat' ? 0 : 6);

	// anchor to start filter
	var a = document.createElement('a');
	a.className = 'flfs-start';
	a.href = '#';
	a.setAttribute('onclick', 'return false');
	a.addEventListener('click', this.showFilter, false);
	a.addEventListener('focus', function(){ startFocusTO = setTimeout(obj.showFilter, 250) }, false);
	a.addEventListener('blur', function(){ clearTimeout(startFocusTO) }, false);
	select.parentNode.insertBefore(a, select);

	// filter input
	var input = document.createElement('input');
	with (input.style) {
		height = (select.offsetHeight - cModeCorrect) +'px';
		width = (select.offsetWidth - cModeCorrect) +'px';
	}
	input.setAttribute('id', 'flfs-input-'+ filterId);
	input.setAttribute('autocomplete', 'off');
	input.className = 'flfs-input';
	input.addEventListener('keypress', this.keypress, false);
	input.addEventListener('focus', obj.showFilter, false);
	input.addEventListener('blur', function(){ inputBlurTO = setTimeout(obj.hideFilter, 100) }, false);
	select.parentNode.insertBefore(input, select);
	
	// select to display filter results
	var resultSelect = document.createElement('select');
	var offset = cumulativeOffset(select);
	with (resultSelect.style) {
		top = (offset.top + input.offsetHeight) +'px';
		left = (offset.left) +'px';
		minWidth = (select.offsetWidth - cModeCorrect) +'px';
	}
	resultSelect.className = 'flfs-select';
	resultSelect.addEventListener('change', function(){ obj.hideFilter(); select.focus() }, false);
	resultSelect.addEventListener('click', function(){ clearTimeout(inputBlurTO) }, false);
	resultSelect.addEventListener('focus', function(){ clearTimeout(inputBlurTO) }, false);
	resultSelect.addEventListener('blur', function(){ resultBlurTO = setTimeout(obj.hideFilter, 100) }, false);
	document.body.appendChild(resultSelect);
	
	// set id to get onchange function in unsafeWindow
	if (!select.getAttribute('id')) select.setAttribute('id', 'flfs-select-'+ filterId);

	// reposition absolute positioned elements
	// damn this.. find a way to do this event based
	unsafeWindow.setInterval(obj.resposition, 100);
	this.resposition();
	a.style.display = 'block';
}

var selects = document.getElementsByTagName('select');
if (selects.length) {
	for (var i = 0; i < selects.length; i++) {
		if (!selects[i].multiple && !selects[i].disabled && selects[i].options.length > 20) {
			new Filter(selects[i], i);
		}
	}
}