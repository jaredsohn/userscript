// ==UserScript==
// @name Spatial Navigation
// @namespace http://www.disbranded.com/userscripts
// @description Implements spatial navigation in Chrome and Firefox (Opera already implements natively). Use Shift + arrow keys to change focus.
// @version 0.9.2
// ==/UserScript==

(function() {
	//set the modifier keys
	var Key = {
		MODIFIER_1: 16,//SHIFT
		MODIFIER_2: null,//but alt/opt == 18
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40
	};
	var modifierOn_1 = Key.MODIFIER_1 == null;
	var modifierOn_2 = Key.MODIFIER_2 == null;

	/**
	* Set key press event listeners and script is live.
	*/
	function init() {
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);
	}


	/**
	* Create an array of elements that might have focus/tabIndex.
	*/
	function findFocusableItems() {
		var f = new Array();
		addFocusableObjects(f, document.links);
		addFocusableObjects(f, document.getElementsByTagName("input"));
		addFocusableObjects(f, document.getElementsByTagName("select"));
		addFocusableObjects(f, document.getElementsByTagName("textarea"));
		return f;
	}
	
	
	/**
	* Test for tabIndex to use browser's determination if element should
	* be tabbed or not. Lets the browser itself handle cases like
	* <input type="hidden">, display:none, etc, etc.
	*/
	function addFocusableObjects(focusArray, elements) {
		var len = elements.length;
		for (var i = 0; i < len; i++) {
			if (elements[i].tabIndex.toString() != "-1") {
				focusArray.push(findItemPos(elements[i]));
			}
		}
		return elements;
	}
	
	
	/**
	* @see http://www.quirksmode.org/js/findpos.html
	*/
	function findItemPos(el) {
		var item = { x:0, y:0, obj:el };
		if (el.offsetParent) {
			do {
				item.x += el.offsetLeft;
				item.y += el.offsetTop;
			} while (el = el.offsetParent);
		}
		return item;
	}



	/**
	* Set focus to focusable object closest to current focus in @param direction.
	*/
	function navigateSpatial(direction) {
		var currentFocus = document.activeElement;
		var f = findFocusableItems();
		var flen = f.length;
		
		var focus = null;
		for (var i = 0; i < flen; i++) {
			if (currentFocus === f[i].obj) {
				focus = f[i];
				break;
			}
		}
		if (focus == null) {
			focus = (currentFocus != null) ? findItemPos(currentFocus) : { x:0, y:0, obj:null };
		}

		var newFocus = null;
		var dis = 0;
		var testDis = 0;
		for (i = 0; i < flen; i++) {
			if (okToFocus(f[i])) {
				testDis = (f[i].x - focus.x) * (f[i].x - focus.x) + (f[i].y - focus.y) * (f[i].y - focus.y);
				if (newFocus == null || testDis < dis) {
					newFocus = f[i];
					dis = testDis;
				}
			}
		}
		
		function okToFocus(obj) {
			switch (direction) {
				case Key.LEFT:
					return obj.x < focus.x;
				case Key.UP:
					return obj.y < focus.y;
				case Key.RIGHT:
					return obj.x > focus.x;
				case Key.DOWN:
					return obj.y > focus.y;
			}
			return false;
		}

		if (newFocus != null && newFocus.obj != null) {
			setNewFocus(currentFocus, newFocus.obj);
		} else if (flen > 0) {
			setNewFocus(currentFocus, f[0].obj);
		}
	}
	
	
	function setNewFocus(oldFocus, newFocus) {
		if (oldFocus != null) {
			oldFocus.blur();
			oldFocus.style.outline = "0px solid rgba(153, 204, 255, 0)";
		}
		if (newFocus != null) {
			newFocus.focus();
			newFocus.style.outline = "2px solid rgba(153, 204, 255, 1)";
		}
	}


	function onKeyDown(evt) {
		if (evt.which) {
			switch (evt.which) {
				case Key.MODIFIER_1:
					modifierOn_1 = true;
					break;
				case Key.MODIFIER_2:
					modifierOn_2 = true;
					break;
				case Key.LEFT:
				case Key.UP:
				case Key.RIGHT:
				case Key.DOWN:
					if (modifierOn_1 && modifierOn_2) {
						evt.preventDefault();
						navigateSpatial(evt.which);
					}
					break;
			}
		}
	}

	function onKeyUp(evt) {
		if (evt.which) {
			switch (evt.which) {
				case Key.MODIFIER_1:
					modifierOn_1 = false;
					break;
				case Key.MODIFIER_2:
					modifierOn_2 = false;
					break;
			}
		}
	}

	init();
})();
