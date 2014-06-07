// ==UserScript==
// @name          chessworld.net practice board
// @namespace     http://radebatz.net/userscripts
// @description	  Allow unlimited moves, undo/reset
// @include       http://www.chessworld.net/*
// ==/UserScript==

// allow to run in page context
function contentEval(source) {
  if ('function' == typeof source) { source = '(' + source + ')();' }
  var script = document.createElement('script'); script.setAttribute("type", "application/javascript"); script.textContent = source;
  unsafeWindow.document.body.appendChild(script); unsafeWindow.document.body.removeChild(script);
}

contentEval(function() {
	var __SQUARES = new Array(
		'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
		'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
		'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
		'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
		'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
		'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
		'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
		'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
	);

	/*===============================================
	 * fix left hand buttons in play area
	 ================================================*/

	var buttons = document.getElementsByTagName("button");
	for (var ii=0; ii < buttons.length; ++ii) {
		var button = buttons[ii];
		var onclick = button.getAttribute("onclick");
		if (onclick && -1 != onclick.indexOf("window.location")) {
			onclick = onclick.replace(/window.location=/, 'window.location.href=');
			button.setAttribute("onclick", onclick + "; return false;");
		}
	}

	/*===============================================
	 * get document to add new functions
	 ================================================*/
	function getDocument() {
		return typeof(unsafeWindow) == 'undefined' ? document : unsafeWindow.document;
	}


	/*===============================================
	 * unlimited moves and undo
	 ================================================*/

	// keep track of ticks
	var __tickHistory = new Array();
	function Image() { return this; }
	var __blank = new Image(); __blank.src = "../gif/40blank.gif";
	var __CASTLE_MAP = new Array("e1", "g1", "h1", "f1", "e1", "c1", "a1", "d1", "e8", "g8", "h8", "f8", "e8", "c8", "a8", "d8");
	var __TEXTMOVE = getDocument().frmChessGame2 ? getDocument().frmChessGame2.textmove : null;
	var __UNDO = getDocument().frmChessGame2 ? getDocument().frmChessGame2.cmdUndo : null;
	var __TOMOVE = null != __TEXTMOVE;

	// one click info
	__square = function __square(name, img, color) {
		this.name = name;
		this.ticks = 1;
		this.img = img;
		this.lastSrc = null;
		this.color = color;
		return this;
	}

	function __clearTextmove(all) {
		if (!__TEXTMOVE)
			return;

		if (all) {
			__TEXTMOVE.value = '';
		} else {
			var val = __TEXTMOVE.value;
			__TEXTMOVE.value = val.substring(0, 2);
		}
	}

	function __addTextmove(move) {
		if (__TEXTMOVE && 3 > __tickHistory.length) {
			__TEXTMOVE.value += move;
		}
	}

	function __getColor(img) {
		return img.src.charAt(img.src.length-5);
	}

	function __isKing(tick) {
    return (-1 < tick.lastSrc.indexOf('wk')) || (-1 < tick.lastSrc.indexOf('bk'));
	}

	function __isCastle(from, to) {
		for (var ii=0; ii < __CASTLE_MAP.length; ii+=4) {
			if (from.name == __CASTLE_MAP[ii] && to.name == __CASTLE_MAP[ii+1]) {
				return new Array(__CASTLE_MAP[ii+2], __CASTLE_MAP[ii+3]);
			}
		}
		return null;
	}

	function __setColor(img, color) {
		//var dot = img.src.lastIndexOf('.');
		//return img.src.substring(0, dot-1) + color + img.src.substring(dot, img.src.length);
		return img.src;
	}

	function __setClicked(img, on) {
		if (on) {
			img.setAttribute("style", "opacity:0.5;");
		} else {
			img.removeAttribute("style");
		}
	}

	if (__TOMOVE) {
		// overrule Click hrefs to get access to this
		var as = document.getElementsByTagName("a");
		for (var jj=0; jj < as.length; ++jj) {
			var a = as[jj];
			var href = a.getAttribute("href");
			if (href) {
				var name = href.match(/.*Click\s+\(\'(..)\'\)/);
				if (name) {
					a.setAttribute("onclick", "__tick(this, '"+RegExp.$1+"'); return false;");
				}
			}
		}
	} else {
		// wrap all squares in a
		for (var dd=0; dd < __SQUARES.length; ++dd) {
			var sq = document.getElementById(__SQUARES[dd]);
			if (sq) {
				var wa = document.createElement("A");
				wa.appendChild(sq.cloneNode(true));
				wa.setAttribute("href", "#");
				wa.setAttribute("onclick", "__tick(this, '"+__SQUARES[dd]+"'); return false;");
				sq.parentNode.replaceChild(wa, sq);
			}
		}
	}

	// let's move...
	getDocument().__tick = function __tick(elem, name) { 
		var img = elem.childNodes[0];
		var isFrom = 0 == __tickHistory.length%2;
		var imgPrefix = img.src.substring(0, img.src.lastIndexOf('/')+1);

		if (isFrom && -1 < img.src.indexOf('blank')) {
			// empty
			return;
		}

		var color = __getColor(img);
		__tickHistory[__tickHistory.length] = new __square(name, img, color);
		if (isFrom) {
			__setClicked(img, true);
			__addTextmove(name);
		} else {
			var from = __tickHistory[__tickHistory.length-2];
			var to = __tickHistory[__tickHistory.length-1];
			if (from.name != to.name) {
				to.lastSrc = to.img.src;
				to.img.src = __setColor(from.img, to.color);
				from.lastSrc = from.img.src;
				from.img.src = __blank.src; //imgPrefix + from.color + '.gif';
				__setClicked(from.img, false);
				__addTextmove(name);

				// handle castling
				if (__isKing(from)) {
					var castle = __isCastle(from, to);
					if (null != castle) {
						var rFrom = document.getElementById(castle[0]).parentNode;
						var rTo = document.getElementById(castle[1]).parentNode;
						__tick(rFrom, castle[0]);
						__tick(rTo, castle[1]);
						// make undo undo twice
						__tickHistory[__tickHistory.length-1].ticks = 2;
					}
				}
			} else {
				__tickHistory.pop();
				getDocument().__undo();
				// avoid adding textmove again
				return;
			}
		}
	}

	// ... and undo!
	getDocument().__undo = function __undo() {
		if (0 == __tickHistory.length) {
			// just in case
			__clearTextmove(true);
			return;
		}

		// undo move
		var ticks = 1;
		if (0 == __tickHistory.length%2) {
			// undo
			var from = __tickHistory[__tickHistory.length-2];
			var to = __tickHistory[__tickHistory.length-1];
			ticks = to.ticks;
			from.img.src = from.lastSrc;
			__setClicked(from.img, false);
			to.img.src = to.lastSrc;
			__tickHistory.pop();
			__tickHistory.pop();
		} else {
			// just remove
			var last = __tickHistory[__tickHistory.length-1];
			__setClicked(last.img, false);
			__tickHistory.pop();
		}

		// undo textmove
		if (1 == __tickHistory.length) {
			__clearTextmove(false);
		} else if (0 == __tickHistory.length) {
			__clearTextmove(true);
		}

		if (1 < ticks) {
			__undo();
		}
	}

	// reset all moves
	getDocument().__reset = function __reset() {
		while (0 < __tickHistory.length) {
		getDocument().	__undo();
		}
		__clearTextmove(true);
	}


	/*===============================================
	 * Add reset button and set __undo
	 ================================================*/

	var buttonTemplate = document.createElement("input");
	buttonTemplate.setAttribute("type", "button");
	buttonTemplate.setAttribute("class", "chessworldnarrow");

	var reset = buttonTemplate.cloneNode(true);
	reset.setAttribute("name", "cmdReset");
	reset.setAttribute("value", "Reset");
	reset.setAttribute("onclick", "__reset();");

	if (__TOMOVE) {
		__UNDO.parentNode.insertBefore(reset, __UNDO);
		__UNDO.setAttribute("onclick", "__undo();");
	} else {
		// find some parent for the buttons...
		var buttonParent = null;
		var inputs = document.getElementsByTagName("input");
		for (var pp=0; pp < inputs.length; ++pp) {
			var input = inputs[pp];
			if ("button" == input.getAttribute("type") && "Hide" == input.getAttribute("value")) {
				buttonParent = input.parentNode;
				break;
			}
		}
		if (buttonParent) {
			buttonParent.appendChild(reset);

			var undo = buttonTemplate.cloneNode(true);
			undo.setAttribute("name", "cmdUndo");
			undo.setAttribute("value", "Undo");
			undo.setAttribute("onclick", "__undo();");
			buttonParent.appendChild(document.createTextNode("  "));
			buttonParent.appendChild(undo);
			buttonParent.appendChild(document.createElement("br"));
			buttonParent.appendChild(document.createElement("br"));
		}
	}


	/*===============================================
	 * Load game history
	 ================================================*/
  var divs = document.getElementsByTagName("div");
	for (var dd=0; dd < divs.length; ++dd) {
    div = divs[dd];
    //if (-1 < div.innerHTML.indexOf('1.&nbsp;')) alert(divs[dd].innerHTML);
  }
  

	/*===============================================
	 * TODO: change navigation rollover to onclick
	 ================================================*/

});
