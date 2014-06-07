// ==UserScript==
// @name          atlanticgames.net practice board
// @namespace     http://radebatz.net/userscripts
// @description	  Allow unlimited moves, undo/reset
// @include       http://www.atlanticgames.net/*mainboard*
// ==/UserScript==

// allow to run in page context
function contentEval(source) {
  if ('function' == typeof source) { source = '(' + source + ')();' }
  var script = document.createElement('script'); script.setAttribute("type", "application/javascript"); script.textContent = source;
  unsafeWindow.document.body.appendChild(script); unsafeWindow.document.body.removeChild(script);
}

contentEval(function() {
	/*===============================================
	 * get document to add new functions
	 ================================================*/
	function getDocument() {
		return typeof(unsafeWindow) == 'undefined' ? document : unsafeWindow.document;
	}

	function __getParameterMap(query) {
		var map = new Array();
		var nvps = query.split('&');
		for (var ii=0; ii < nvps.length; ++ii) {
			var nvp = nvps[ii].split('=');
			var values = map[nvp[0]];
			if (null == values) {
				values = new Array();
			}
			values.push(unescape(nvp[1]));
			map[nvp[0].toLowerCase()] = values;
		}
		return map;
	}

	// translation table
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
	var __CASTLE_MAP = new Array(3, 1, 0, 2, 3, 5, 7, 4, 59, 57, 56, 58, 59, 61, 63, 60);
	var __PREVIEW = null;
	var __TEXTMOVE = null;
	var __FROM = null;
	var __TO = null;

	/*===============================================
	 * Get some nodes and fix a few things
	 ================================================*/
	var inputs = document.getElementsByTagName("input");
	for (var ii=0; ii < inputs.length; ++ii) {
		var input = inputs[ii];
		if ("qmsub" == input.getAttribute("name")) {
			input.parentNode.setAttribute("nowrap", "nowrap");
			__PREVIEW = input;
		} else if ("qm" == input.getAttribute("name")) {
			__TEXTMOVE = input;
			var prevtd = __TEXTMOVE.parentNode.previousSibling;
			prevtd.childNodes[0].data = "   Move ";
			var nexttd = __TEXTMOVE.parentNode.nextSibling;
			nexttd.childNodes[0].data = " ";
		}
	}
	var __TOMOVE = null != __TEXTMOVE;

	var forms = document.getElementsByTagName("FORM");
	// remove buggy form fragments
	if (forms[0])
		forms[0].parentNode.removeChild(forms[0]);


	/*===============================================
	 * Add reset and undo button
	 ================================================*/

	var buttonParent = null;
	if (__TOMOVE) {
		buttonParent = __PREVIEW.parentNode;
		// looks nicer...
		buttonParent.setAttribute("nowrap", "nowrap");
	} else {
		// find some parent for the buttons...
		var tds = document.getElementsByTagName("TD");
		for (var tt=0; tt < tds.length; ++tt) {
			var td = tds[tt];
			if ("textsmall" == td.getAttribute("class") && "500px" == td.getAttribute("width")) {
				buttonParent = document.createElement("form");
				td.insertBefore(buttonParent, td.childNodes[0]);
			}
		}
	}
	if (buttonParent) {
		var spacer = document.createTextNode("  ");
		var button = document.createElement("input");
		button.setAttribute("type", "button");

		// add buttons
		var undo = button.cloneNode(true);
		undo.setAttribute("value", "Undo");
		undo.setAttribute("onclick", "__undo();");
		buttonParent.appendChild(undo);
		buttonParent.appendChild(spacer);
		var reset = button.cloneNode(true);
		reset.setAttribute("value", "Reset");
		reset.setAttribute("onclick", "__reset();");
		buttonParent.appendChild(reset);
		buttonParent.appendChild(spacer.cloneNode(true));
	}

	/*===============================================
	 * Do the dirty deeds...
	 * ... and build a nice submit form
	 ================================================*/

	if (__PREVIEW && __TEXTMOVE) {
		var form = document.createElement("form");
		form.setAttribute("action", "http://www.atlanticgames.net/chess/play/clickpiece.asp");
		form.setAttribute("style", "display:inline;");
		form.setAttribute("onsubmit", "return __onsubmit(this);");
		form.setAttribute("name", "quickForm");

		// important fields ;)
		var gameid = document.createElement("input"); 
		gameid.setAttribute("type", "hidden");
		gameid.setAttribute("name", "gameid");
		gameid.setAttribute("value", __getParameterMap(window.location.search)['gameid']);
		form.appendChild(gameid);

		var next = document.createElement("input"); 
		next.setAttribute("type", "hidden");
		next.setAttribute("name", "chkNextGame");
		next.setAttribute("value", "y");
		next.setAttribute("checked", "checked");
		form.appendChild(next);

		// these two will be updated when we move
		__FROM = document.createElement("input");
		__FROM.setAttribute("type", "hidden");
		__FROM.setAttribute("name", "f");
		form.appendChild(__FROM);

		__TO = document.createElement("input");
		__TO.setAttribute("type", "hidden");
		__TO.setAttribute("name", "t");
		form.appendChild(__TO);

		var submit = document.createElement("input");
		submit.setAttribute("type", "submit");
		submit.setAttribute("name", "cmdSubmit");
		submit.value = "SUBMIT MOVE";
		form.appendChild(submit);

		var firsttd = __TEXTMOVE.parentNode.previousSibling;
		// make first element in row (kinda)
		firsttd.insertBefore(form, firsttd.childNodes[0]);
	}

	// validate move
	getDocument().__onsubmit = function __onsubmit(form) {
		if (4 != __TEXTMOVE.value.length || "" == __TO.value || "" == __FROM.value) {
			alert('First you have to move!');
			return false;
		}
		return true;
	}


	/*===============================================
	 * unlimited moves and undo
	 ================================================*/

	// keep track of ticks
	var __tickHistory = new Array();
	// one click info
	__square = function __square(idx, img, color) {
		this.idx = idx;
		this.ticks = 1;
		this.img = img;
		this.lastSrc = null;
		this.color = color;
		return this;
	}

	function __clearTextmove(all) {
		if (__TEXTMOVE) {
			if (all) {
				__TEXTMOVE.value = '';
			} else {
				__TEXTMOVE.value = __TEXTMOVE.value.substring(0, 2);
			}
		}
	}

	function __idx2Notation(idx) {
		return __SQUARES[63-idx];
	}

	function __notation2Idx(sq) {
		for (var qq=0; qq < 64; ++qq) {
			if (__SQUARES[qq] == sq)
				return qq;
		}
		return -1;
	}

	function __addTextmove(idx) {
		if (3 > __tickHistory.length) {
			if (__TEXTMOVE) {
				if (0 == __TEXTMOVE.value.length) {
					__FROM.value = idx;
				} else {
					__TO.value = idx;
				}
				__TEXTMOVE.value += __idx2Notation(idx);
			}
		}
	}

	function __isKing(tick) {
    return -1 < tick.lastSrc.indexOf('King');
	}

	function __isCastle(from, to) {
		for (var ii=0; ii < __CASTLE_MAP.length; ii+=4) {
			if (from.idx == __CASTLE_MAP[ii] && to.idx == __CASTLE_MAP[ii+1]) {
				return new Array(__CASTLE_MAP[ii+2], __CASTLE_MAP[ii+3]);
			}
		}
		return null;
	}

	function __getColor(img) {
		return img.parentNode.getAttribute("bgcolor");
	}

	function __setColor(img, color) {
		return img.src;
	}

	function __setClicked(img, on) {
		if (on) {
			img.parentNode.parentNode.setAttribute("style", "border:1px solid red;");
		} else {
			img.parentNode.parentNode.setAttribute("style", "border:1px -moz-bg-inset #fff;");
		}
	}

	// add onclick to all squares to overrule href
	var __flip = true;
	var imgs = document.getElementsByTagName("img");
	var idx = __flip ? 63 : 0;
	var flipper = false;
	for (var jj=0; jj < imgs.length; ++jj) {
		var img = imgs[jj];
		if ("32px" != img.getAttribute("width") || "32px" != img.getAttribute("height")) {
			continue;
    }

		var a = null;
		if ("A" != img.parentNode.nodeName) {
			// need to wrap img in a
			a = document.createElement("A");
			a.appendChild(img.cloneNode(true));
			img.parentNode.replaceChild(a, img);
		} else {
			a = img.parentNode;
		}
		var href = a.getAttribute("href");
		if (href && "#" != href) {
			var name = href.match(/.*clickpiece.*p=(.*)/);
			if (name) {
				var bidx = RegExp.$1;
				if (idx != bidx) {
					if (flipper) {
						// just in case...
						alert("can't figure out board orientation (" + idx + " != " + bidx + ") - givin up!");
						return;
					}
					// try again...
					__flip = !__flip;
					idx = __flip ? (__SQUARES.length-1) : 0;
					jj = -1;
					flipper = true;
					continue;
				}
				a.setAttribute("onclick", "__tick(this, '" + bidx + "'); return false;");
				a.setAttribute("id", "__tickId-"+bidx);
			}
		} else {
			a.setAttribute("href", "#");
			a.setAttribute("onclick", "__tick(this, '" + idx + "'); return false;");
			a.setAttribute("id", "__tickId-"+idx);
		}
		idx = __flip ? --idx : ++idx;
	}


	// let's move...
	getDocument().__tick = function __tick(elem, idx) { 
		var img = elem.childNodes[0];
		var isFrom = 0 == __tickHistory.length%2;
		var imgPrefix = img.src.substring(0, img.src.lastIndexOf('/')+1);

		if (-1 < img.src.indexOf("blank") && isFrom) {
			return;
		}

		var color = __getColor(img);
		__tickHistory[__tickHistory.length] = new __square(idx, img, color);
		if (isFrom) {
			__setClicked(img, true);
			__addTextmove(idx);
		} else {
			var from = __tickHistory[__tickHistory.length-2];
			var to = __tickHistory[__tickHistory.length-1];
			if (from.idx != to.idx) {
				to.lastSrc = to.img.src;
				to.img.src = __setColor(from.img, to.color);
				from.lastSrc = from.img.src;
				from.img.src = imgPrefix + 'blank' + '.gif';
				__setClicked(from.img, false);
				__addTextmove(idx);

				// handle castling
				if (__isKing(from)) {
					var castle = __isCastle(from, to);
					if (null != castle) {
						var rFrom = document.getElementById("__tickId-"+castle[0]);
						var rTo = document.getElementById("__tickId-"+castle[1]);
						__tick(rFrom, castle[0]);
						__tick(rTo, castle[1]);
						// make undo undo twice
						__tickHistory[__tickHistory.length-1].ticks = 2;
					}
				}
			} else {
				__tickHistory.pop();
				getDocument().__undo();
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
			getDocument().__undo();
		}
		__clearTextmove(true);
	}

});
