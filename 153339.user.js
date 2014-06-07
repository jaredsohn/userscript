// ==UserScript==
// @name       tabIndent
// @namespace  http://dothack.tk/
// @version    0.1.1
// @description  Enable TAB & shift-TAB to control your text layout on traditional textarea.Hit ESC to bring back the regular behaviour.
// @include    http://*/*
// @include    https://*/*
// @copyright  2012+,dothack.tk & julianlam@GitHub
// ==/UserScript==

/*
Copyright (c) 2012-2013 Julian Lam

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Enable add/removeEventListener if it is not present (retrieved from https://developer.mozilla.org/en-US/docs/DOM/element.removeEventListener)
if (!Element.prototype.addEventListener) {
	var oListeners = {};
	function runListeners(oEvent) {
		if (!oEvent) { oEvent = window.event; }
		for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
			if (oEvtListeners.aEls[iElId] === this) {
				for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) { oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent); }
					break;
			}
		}
	}
	Element.prototype.addEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
		if (oListeners.hasOwnProperty(sEventType)) {
			var oEvtListeners = oListeners[sEventType];
			for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
				if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
			}
			if (nElIdx === -1) {
				oEvtListeners.aEls.push(this);
				oEvtListeners.aEvts.push([fListener]);
				this["on" + sEventType] = runListeners;
			} else {
				var aElListeners = oEvtListeners.aEvts[nElIdx];
				if (this["on" + sEventType] !== runListeners) {
					aElListeners.splice(0);
					this["on" + sEventType] = runListeners;
				}
				for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
					if (aElListeners[iLstId] === fListener) { return; }
				}     
				aElListeners.push(fListener);
			}
		} else {
			oListeners[sEventType] = { aEls: [this], aEvts: [ [fListener] ] };
			this["on" + sEventType] = runListeners;
		}
	};
	Element.prototype.removeEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
		if (!oListeners.hasOwnProperty(sEventType)) { return; }
		var oEvtListeners = oListeners[sEventType];
		for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
			if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
		}
		if (nElIdx === -1) { return; }
		for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
			if (aElListeners[iLstId] === fListener) { aElListeners.splice(iLstId, 1); }
		}
	};
}

// Fork and modify from https://github.com/julianlam/tabIndent.js
tabIndent = {
	version: '0.1.6',
	config: {
		images: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAKZSURBVEjH7ZRfSFNRHMe/9+/+3G26tUn+ycywgURgUBAUJlIhWlEQEjN8yQcfolKJxJAefOjRCnT0IPYQ9iRa9FAYJiaUVP4twf7gzJzpnDbdzHt3z+3Fua3dO4Ne/f5ezjmc8+F7zvmeA2zrv0VFGlexAssFw1mG1pqqUL8npGY60Bw3ykYaOVjlrFXmEyw0AQj6g53UONQBO8DBzuiT2tUx+gR/mwACBQpIUoACBZoAZaOSiWwFIFs4oMMS9/boZVF8T8vtkbEofatiRKF9mXK6M7tTyyxRaPwWtJezIu9+9cNzxHk/n9938rz6IWpvgRdZd5/HcsvC9jadqk6Z0qkBiCaAF3UtX8cy6h1mwlnLhsuZuRvqABlyNJqb0q0ZWsb7uUVHlXAahWl1y3M2tVuQVR1Q0Pl0dwZ67KbZtGnX/ma++/FsCCY1ANlAxIuT2NZP3XB/GRKc9qKhKTYnd4auJbIqINEBDa5zoWWByoS1jocR+loKpKGJKqBLybN/OQN2Tmodv4jCtYIMYurnP5sLf+V5XK4DbFv4haaDCEABA/J88GdegD1I2+heY0Xj7M1itiMjP8srzutjXMbkIDZKCrAcfGOt8LwODimYnzzjLcHIx5VFwPekZrhVPYmxyVNAvZP8KV28SykClo6XF4/t9LpC2TTIteulJepJjD5nCjL8E56sMHt40NYYqE51ZnZIfmGXYBC68p/6v6UkApSI8Y2ejPVKhyE0PdLDPcg+Z003G0W7YUmmvo/WtjXgbiKAAQNGpjYRDOwWILx3dV16ZBsx3QsdYi4JNUw6uCvMbrUcWFAvPWznfH9/GQHR5xAbPuTumRFWvS+ZwDGyJFfidkxWk2oaIfTRk8RI0YqMAQBAL7YVrz/iUDx4QII4/QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0xMi0wMVQwMDowNjo0My0wNTowMLKpTWYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMTItMDFUMDA6MDY6NDMtMDU6MDDD9PXaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg=='
	},
	events: {
		keydown: function(e) {
			if (e.keyCode === 9) {
				e.preventDefault();
				var	currentStart = this.selectionStart,
					currentEnd = this.selectionEnd;
				if (e.shiftKey === false) {
					// Normal Tab Behaviour
					if (!tabIndent.isMultiLine(this)) {
						// Add tab before selection, maintain highlighted text selection
						this.value = this.value.slice(0, currentStart) + "\t" + this.value.slice(currentStart);
						this.selectionStart = currentStart + 1;
						this.selectionEnd = currentEnd + 1;
					} else {
						// Iterating through the startIndices, if the index falls within selectionStart and selectionEnd, indent it there.
						var	startIndices = tabIndent.findStartIndices(this),
							l = startIndices.length,
							newStart = undefined,
							newEnd = undefined,
							affectedRows = 0;
						while(l--) {
							var lowerBound = startIndices[l];
							if (startIndices[l+1] && currentStart != startIndices[l+1]) lowerBound = startIndices[l+1];
							if (lowerBound >= currentStart && startIndices[l] < currentEnd) {
								this.value = this.value.slice(0, startIndices[l]) + "\t" + this.value.slice(startIndices[l]);
								newStart = startIndices[l];
								if (!newEnd) newEnd = (startIndices[l+1] ? startIndices[l+1] - 1 : 'end');
								affectedRows++;
							}
						}
						this.selectionStart = newStart;
						this.selectionEnd = (newEnd !== 'end' ? newEnd + affectedRows : this.value.length);
					}
				} else {
					// Shift-Tab Behaviour
					if (!tabIndent.isMultiLine(this)) {
						if (this.value.substr(currentStart - 1, 1) == "\t") {
							// If there's a tab before the selectionStart, remove it
							this.value = this.value.substr(0, currentStart - 1) + this.value.substr(currentStart);
							this.selectionStart = currentStart - 1;
							this.selectionEnd = currentEnd - 1;
						} else if (this.value.substr(currentStart - 1, 1) == "\n" && this.value.substr(currentStart, 1) == '\t') {
							// However, if the selection is at the start of the line, and the first character is a tab, remove it
							this.value = this.value.substring(0, currentStart) + this.value.substr(currentStart + 1);
							this.selectionStart = currentStart;
							this.selectionEnd = currentEnd - 1;
						}
					} else {
						// Iterating through the startIndices, if the index falls within selectionStart and selectionEnd, remove an indent from that row
						var	startIndices = tabIndent.findStartIndices(this),
							l = startIndices.length,
							newStart = undefined,
							newEnd = undefined,
							affectedRows = 0;
						while(l--) {
							var lowerBound = startIndices[l];
							if (startIndices[l+1] && currentStart != startIndices[l+1]) lowerBound = startIndices[l+1];
							if (lowerBound >= currentStart && startIndices[l] < currentEnd) {
								if (this.value.substr(startIndices[l], 1) == '\t') {
									// Remove a tab
									this.value = this.value.slice(0, startIndices[l]) + this.value.slice(startIndices[l] + 1);
									affectedRows++;
								} else {}	// Do nothing
								newStart = startIndices[l];
								if (!newEnd) newEnd = (startIndices[l+1] ? startIndices[l+1] - 1 : 'end');
							}
						}
						this.selectionStart = newStart;
						this.selectionEnd = (newEnd !== 'end' ? newEnd - affectedRows : this.value.length);
					}
				}
			} else if (e.keyCode == 27) {
				tabIndent.events.disable(e);
			}
		},
		disable: function(e) {
			var events = this;
			// Temporarily suspend the main tabIndent event
			tabIndent.remove(e.target);
			// ... but re-add it upon re-focus
			tabIndent.render(e.target);
		}
	},
	render: function(el) {
		var self = this;
		if (el.nodeName === 'TEXTAREA') {
			el.addEventListener('focus', function f() {
				var delayedRefocus = setTimeout(function() {
					var classes = (el.getAttribute('class') || '').split(' '),
					contains = classes.indexOf('tabIndent');
					el.addEventListener('keydown', self.events.keydown);
					el.style.backgroundImage = "url(" + self.config.images + ")";
					el.style.backgroundPosition = '98% 0%';
					el.style.backgroundRepeat = 'no-repeat';
					if (contains !== -1) classes.splice(contains, 1);
					if (classes.indexOf('tabIndent-rendered') == -1) classes.push('tabIndent-rendered');
					el.setAttribute('class', classes.join(' '));
					el.removeEventListener('focus', f);
				}, 0);
				// If they were just tabbing through the input, let them continue unimpeded
				el.addEventListener('blur', function b() {
					clearTimeout(delayedRefocus);
					el.removeEventListener('blur', b);
				});
			});
			el.addEventListener('blur', function b(e) {
				self.events.disable(e);
				el.removeEventListener('blur', b);
			});
		}
	},
	renderAll: function() {
		// Find all elements with the tabIndent class
		var textareas = document.getElementsByTagName('textarea'),
			t = textareas.length,
			contains = -1,
			classes = [],
			el = undefined;
		while(t--) {
			classes = (textareas[t].getAttribute('class') || '').split(' ');
			contains = classes.indexOf('tabIndent');
			if (contains !== -1) {
				el = textareas[t];
				this.render(el);
			}
			contains = -1;
			classes = [];
			el = undefined;
		}
	},
	remove: function(el) {
		if (el.nodeName === 'TEXTAREA') {
			var classes = (el.getAttribute('class') || '').split(' '),
				contains = classes.indexOf('tabIndent-rendered');
			el.removeEventListener('keydown', this.events.keydown);
			el.style.backgroundImage = '';
			if (contains !== -1) classes.splice(contains, 1);
			if (classes.indexOf('tabIndent') == -1)classes.push('tabIndent');
			el.setAttribute('class', (classes.length > 1 ? classes.join(' ') : classes[0]));
		}
	},
	removeAll: function() {
		// Find all elements with the tabIndent class
		var textareas = document.getElementsByTagName('textarea'),
			t = textareas.length,
			contains = -1,
			classes = [],
			el = undefined;
		while(t--) {
			classes = (textareas[t].getAttribute('class') || '').split(' ');
			contains = classes.indexOf('tabIndent-rendered');
			if (contains !== -1) {
				el = textareas[t];
				this.remove(el);
			}
			contains = -1;
			classes = [];
			el = undefined;
		}
	},
	isMultiLine: function(el) {
		// Extract the selection
		var	snippet = el.value.slice(el.selectionStart, el.selectionEnd),
			nlRegex = new RegExp(/\n/);
		if (nlRegex.test(snippet)) return true;
		else return false;
	},
	findStartIndices: function(el) {
		var	text = el.value,
			startIndices = [],
			offset = 0;
		while(text.match(/\n/) && text.match(/\n/).length > 0) {
			offset = (startIndices.length > 0 ? startIndices[startIndices.length - 1] : 0);
			var lineEnd = text.search("\n");
			startIndices.push(lineEnd + offset + 1);
			text = text.substring(lineEnd + 1);
		}
		startIndices.unshift(0);
		return startIndices;
	}
}
    
document.addEventListener('click', function(event){
    if(event.target.nodeName == 'TEXTAREA'){
		var el = event.target;
    	var classes = (el.getAttribute('class') || '').split(' '),
			containsUnrendered = classes.indexOf('tabIndent'),
			containsRendered = classes.indexOf('tabIndent-rendered');
		if(containsUnrendered == -1 && containsRendered == -1){
			classes.push('tabIndent');
			el.setAttribute('class', classes.join(' '));
			tabIndent.render(el);
			el.blur();
			el.focus();
		}
	}
});