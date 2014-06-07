// ==UserScript==
// @name           SJ Save V2
// @namespace      SJ Save V2
// @description    Speichert deine Lieblingsserien
// @include        http://serienjunkies.org/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @version        2.1.9
// @updateURL      http://userscripts.org/scripts/source/39627.meta.js
// @downloadURL    https://userscripts.org/scripts/source/39627.user.js
// @icon           data:image/png;base64,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
// @attribution	changes [d:20.12.12][u: <b><u>Deutsch</u></b>Seriendatum nochmals überarbeitet. <br><br><b><u>English</u></b>Series Date reworked. <br><br><b><u>Français</u></b>Date de la série retravaillée. <br><br>]
// ==/UserScript==


sortle = GM_getValue('sort', 'j');
staff = GM_getValue('staff', 'j');

if (staff=='j'){
ps = '2px';
marg = '-2';
}else{
ps = '-5px';
marg = '-10';
}

function ger(){
GM_setValue('language', 'ger');
}
function eng(){
GM_setValue('language', 'eng');
}
function fr(){
GM_setValue('language', 'fr');
}

lan = GM_getValue('language', 'ger');
if (lan == 'ger'){
settxy = '  Ja  ';
settxn = 'Nein';
settx1 = 'Serienleiste immer anzeigen';
settx2 = 'Serienleiste mitscrollen ';
settx3 = 'Cover Anzeigen ';
settx4 = 'Serien Namen';
settx41 = 'Links';
settx42 = 'Zentriert';
settx43 = 'Rechts';
settx5 = 'Updates zulassen ';
settx6 = 'Staffel Anzeigen';
settx7 = 'Sortieren ermöglichen';
settx8 = 'Aktuelle und neue Folgen Anzeigen ';
settx9 = 'Cover - Breite | Höhe';
settx10 = 'Schriftgröße';
settx11 = 'Reload erforderlich';
settx12 = 'Reload';
settx13 = 'Script Seite';
settx14 = 'Falls du einen Bug gefunden oder eine Idee hast, mit der ich das<br>  Script verbessern kann, kannst du mir gerne eine E-Mail schreiben <br> marsch_mellow@web.de ';

neueV = 'Neue Version';
verfuegbar = 'verfuegbar';

neusteV = 'Neuste Version';
installierteV = 'Installierte Version';

install = 'Install';
spaeter = 'Spaeter';
nie = 'Nie';
}
if (lan == 'eng'){
settxy = 'Yes';
settxn = 'No';
settx1 = 'Always show list';
settx2 = 'List scrolling with page';
settx3 = 'Show cover';
settx4 = 'Series name';
settx41 = 'Left';
settx42 = 'Center';
settx43 = 'Right';
settx5 = 'Allow updates';
settx6 = 'Show seasons';
settx7 = 'Allow sorting';
settx8 = 'Displays of current and new episodes';
settx9 = 'Cover - width | height';
settx10 = 'Font size';
settx11 = 'Reload required';
settx12 = 'Reload';
settx13 = 'Script page';
settx14 = 'If you find a bug or have an idea with which I can improve the script,<br> you can tell me anytime by e-mail <br> marsch_mellow@web.de ';

neueV = 'New Version';
verfuegbar = 'available';

neusteV = 'Latest Version';
installierteV = 'Installed Version';

install = 'Install';
spaeter = 'Later';
nie = 'Never';

}
if (lan == 'fr'){
settxy = 'Oui';
settxn = 'Non';
settx1 = 'Toujours afficher la liste';
settx2 = 'Défilement de la liste avec la page';
settx3 = 'Afficher la jaquette';
settx4 = 'Nom de la série';
settx41 = 'Gauche';
settx42 = 'Centre';
settx43 = 'Droit';
settx5 = 'Laissez mises à jour';
settx6 = 'Montrer saisons';
settx7 = 'Permettre le tri';
settx8 = 'Affiche d`épisodes actuels et nouveaux';
settx9 = 'Couvrir - largeur | hauteur';
settx10 = 'Taille de la police';
settx11 = 'Recharger nécessaire';
settx12 = 'Recharger';
settx13 = 'Page Script';
settx14 = 'Si vous trouvez un bug ou une idée avec laquelle je peux <br>améliorer le script, vous pouvez me dire à tout moment par e-mail <br> marsch_mellow@web.de ';

neueV = 'Nouvelle Version';
verfuegbar = 'disponible';

neusteV = 'Dernière Version';
installierteV = 'Version installée';

install = 'Installer';
spaeter = 'Plus tard';
nie = 'Jamais';
}

widthb = GM_getValue('widthb', '230');
heighth = GM_getValue('heighth', '50');
fontsz = GM_getValue('fontsz', '12');

check = GM_getValue('newinst', 'j');
if (check=='j'){
 GM_setValue('se1', 'x');
 GM_setValue('se2', 'x');
 GM_setValue('se3', 'x');
 GM_setValue('se4', 'x');
 GM_setValue('se5', 'x');
 GM_setValue('se6', 'x');
 GM_setValue('se7', 'x');
 GM_setValue('se8', 'x');
 GM_setValue('se9', 'x');
 GM_setValue('se10', 'x');
 GM_setValue('se11', 'x');
 GM_setValue('se12', 'x');
 GM_setValue('se13', 'x');
 GM_setValue('se14', 'x');
 GM_setValue('se15', 'x');

 GM_setValue('newinst', 'n');
}


GM_addStyle("ul.boxy li { list-style-type: none;padding:0px;margin:0px; width:"+widthb+"px; min-width:130px; font-size: "+fontsz+"px;font-family: Arial, sans-serif;}ul.boxy li {margin: "+ps+" 0px 0px -16px;padding-top:2px; height:"+heighth+"px; border: 0px solid #ccc; background-color: transparent; }.clickable a {display: block;text-decoration: none;cursor: pointer;cursor: hand;}.clickable li:hover {background-color: #f6f6f6;}");

  if (sortle=='j'){

for (var g = 1; g <= 15; g++) {
GM_addStyle("ul #dragb"+g+" {cursor:move;} ul.boxy li { list-style-type: none;margin:0px; width:"+widthb+"px; height:"+heighth+"px; min-width:130px; }#phoneticlong {margin-bottom: 0em;}#phoneticlong li, #buttons li {margin-bottom: 0px;margin-top: "+marg+"px;}#boxes {font-family: Arial, sans-serif;list-style-type: none;margin: 0px;padding: 0px;width: 220px;}#boxes li {cursor: move;position: relative;float: left;margin: 2px 2px 0px 0px;width: 3px;height: 30px;border: 1px solid #000;text-align: center;padding-top: 5px;background-color: #eeeeff;}");
}
GM_addStyle("");
/*
Copyright (c) 2005 Tim Taylor Consulting <http://tool-man.org/>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/
var ToolMan = {
	events : function() {
		if (!ToolMan._eventsFactory) throw "ToolMan Events module isn't loaded";
		return ToolMan._eventsFactory
	},

	css : function() {
		if (!ToolMan._cssFactory) throw "ToolMan CSS module isn't loaded";
		return ToolMan._cssFactory
	},

	coordinates : function() {
		if (!ToolMan._coordinatesFactory) throw "ToolMan Coordinates module isn't loaded";
		return ToolMan._coordinatesFactory
	},

	drag : function() {
		if (!ToolMan._dragFactory) throw "ToolMan Drag module isn't loaded";
		return ToolMan._dragFactory
	},

	dragsort : function() {
		if (!ToolMan._dragsortFactory) throw "ToolMan DragSort module isn't loaded";
		return ToolMan._dragsortFactory
	},

	helpers : function() {
		return ToolMan._helpers
	},

	cookies : function() {
		if (!ToolMan._cookieOven) throw "ToolMan Cookie module isn't loaded";
		return ToolMan._cookieOven
	},

	junkdrawer : function() {
		return ToolMan._junkdrawer
	}

}

ToolMan._helpers = {
	map : function(array, func) {
		for (var i = 0, n = array.length; i < n; i++) func(array[i])
	},

	nextItem : function(item, nodeName) {
		if (item == null) return
		var next = item.nextSibling
		while (next != null) {
			if (next.nodeName == nodeName) return next
			next = next.nextSibling
		}
		return null
	},

	previousItem : function(item, nodeName) {
		var previous = item.previousSibling
		while (previous != null) {
			if (previous.nodeName == nodeName) return previous
			previous = previous.previousSibling
		}
		return null
	},

	moveBefore : function(item1, item2) {
		var parent = item1.parentNode
		parent.removeChild(item1)
		parent.insertBefore(item1, item2)
	},

	moveAfter : function(item1, item2) {
		var parent = item1.parentNode
		parent.removeChild(item1)
		parent.insertBefore(item1, item2 ? item2.nextSibling : null)
	}
}

/** 
 * scripts without a proper home
 *
 * stuff here is subject to change unapologetically and without warning
 */
ToolMan._junkdrawer = {
	serializeList : function(list) {
		var items = list.getElementsByTagName("li")
		var array = new Array()
		for (var i = 0, n = items.length; i < n; i++) {
			var item = items[i]

			array.push(ToolMan.junkdrawer()._identifier(item))
		}
		return array.join('|')
	},

	inspectListOrder : function(id) {
		alert(ToolMan.junkdrawer().serializeList(document.getElementById(id)))
	},

	restoreListOrder : function(listID) {
		var list = document.getElementById(listID)
		if (list == null) return

		var cookie = ToolMan.cookies().get("list-" + listID)
		if (!cookie) return;

		var IDs = cookie.split('|')
		var items = ToolMan.junkdrawer()._itemsByID(list)

		for (var i = 0, n = IDs.length; i < n; i++) {
			var itemID = IDs[i]
			if (itemID in items) {
				var item = items[itemID]
				list.removeChild(item)
				list.insertBefore(item, null)
			}
		}
	},

	_identifier : function(item) {
		var trim = ToolMan.junkdrawer().trim
		var identifier

		identifier = trim(item.getAttribute("id"))
		if (identifier != null && identifier.length > 0) return identifier;
		
		identifier = trim(item.getAttribute("itemID"))
		if (identifier != null && identifier.length > 0) return identifier;
		
		// FIXME: strip out special chars or make this an MD5 hash or something
		return trim(item.innerHTML)
	},

	_itemsByID : function(list) {
		var array = new Array()
		var items = list.getElementsByTagName('li')
		for (var i = 0, n = items.length; i < n; i++) {
			var item = items[i]
			array[ToolMan.junkdrawer()._identifier(item)] = item
		}
		return array
	},

	trim : function(text) {
		if (text == null) return null
		return text.replace(/^(\s+)?(.*\S)(\s+)?$/, '$2')
	}
}
/* Copyright (c) 2005 Tim Taylor Consulting (see LICENSE.txt) */

ToolMan._eventsFactory = {
	fix : function(event) {
		if (!event) event = window.event

		if (event.target) {
			if (event.target.nodeType == 3) event.target = event.target.parentNode
		} else if (event.srcElement) {
			event.target = event.srcElement
		}

		return event
	},

	register : function(element, type, func) {
		if (element.addEventListener) {
			element.addEventListener(type, func, false)
		} else if (element.attachEvent) {
			if (!element._listeners) element._listeners = new Array()
			if (!element._listeners[type]) element._listeners[type] = new Array()
			var workaroundFunc = function() {
				func.apply(element, new Array())
			}
			element._listeners[type][func] = workaroundFunc
			element.attachEvent('on' + type, workaroundFunc)
		}
	},

	unregister : function(element, type, func) {
		if (element.removeEventListener) {
			element.removeEventListener(type, func, false)
		} else if (element.detachEvent) {
			if (element._listeners 
					&& element._listeners[type] 
					&& element._listeners[type][func]) {

				element.detachEvent('on' + type, 
						element._listeners[type][func])
			}
		}
	}
}
/* Copyright (c) 2005 Tim Taylor Consulting (see LICENSE.txt) */

ToolMan._dragFactory = {
	createSimpleGroup : function(element, handle) {
		handle = handle ? handle : element
		var group = this.createGroup(element)
		group.setHandle(handle)
		group.transparentDrag()
		group.onTopWhileDragging()
		return group
	},

	createGroup : function(element) {
		var group = new _ToolManDragGroup(this, element)

		var position = ToolMan.css().readStyle(element, 'position')
		if (position == 'static') {
			element.style["position"] = 'relative'
		} else if (position == 'absolute') {
			/* for Safari 1.2 */
			ToolMan.coordinates().topLeftOffset(element).reposition(element)
		}

		// TODO: only if ToolMan.isDebugging()
		group.register('draginit', this._showDragEventStatus)
		group.register('dragmove', this._showDragEventStatus)
		group.register('dragend', this._showDragEventStatus)

		return group
	},

	_showDragEventStatus : function(dragEvent) {
		window.status = dragEvent.toString()
	},

	constraints : function() {
		return this._constraintFactory
	},

	_createEvent : function(type, event, group) {
		return new _ToolManDragEvent(type, event, group)
	}
}

function _ToolManDragGroup(factory, element) {
	this.factory = factory
	this.element = element
	this._handle = null
	this._thresholdDistance = 0
	this._transforms = new Array()
	// TODO: refactor into a helper object, move into events.js
	this._listeners = new Array()
	this._listeners['draginit'] = new Array()
	this._listeners['dragstart'] = new Array()
	this._listeners['dragmove'] = new Array()
	this._listeners['dragend'] = new Array()
}

_ToolManDragGroup.prototype = {
	/*
	 * TODO:
	 *   - unregister(type, func)
	 *   - move custom event listener stuff into Event library
	 *   - keyboard nudging of "selected" group
	 */

	setHandle : function(handle) {
		var events = ToolMan.events()

		handle.toolManDragGroup = this
		events.register(handle, 'mousedown', this._dragInit)
		handle.onmousedown = function() { return false }

		if (this.element != handle)
			events.unregister(this.element, 'mousedown', this._dragInit)
	},

	register : function(type, func) {
		this._listeners[type].push(func)
	},

	addTransform : function(transformFunc) {
		this._transforms.push(transformFunc)
	},

	verticalOnly : function() {
		this.addTransform(this.factory.constraints().vertical())
	},

	horizontalOnly : function() {
		this.addTransform(this.factory.constraints().horizontal())
	},

	setThreshold : function(thresholdDistance) {
		this._thresholdDistance = thresholdDistance
	},

	transparentDrag : function(opacity) {
		var opacity = typeof(opacity) != "undefined" ? opacity : 0.75;
		var originalOpacity = ToolMan.css().readStyle(this.element, "opacity")

		this.register('dragstart', function(dragEvent) {
			var element = dragEvent.group.element
			element.style.opacity = opacity
			element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')'
		})
		this.register('dragend', function(dragEvent) {
			var element = dragEvent.group.element
			element.style.opacity = originalOpacity
			element.style.filter = 'alpha(opacity=100)'
		})
	},

	onTopWhileDragging : function(zIndex) {
		var zIndex = typeof(zIndex) != "undefined" ? zIndex : 100000;
		var originalZIndex = ToolMan.css().readStyle(this.element, "z-index")

		this.register('dragstart', function(dragEvent) {
			dragEvent.group.element.style.zIndex = zIndex
		})
		this.register('dragend', function(dragEvent) {
			dragEvent.group.element.style.zIndex = originalZIndex
		})
	},

	_dragInit : function(event) {
		event = ToolMan.events().fix(event)
		var group = document.toolManDragGroup = this.toolManDragGroup
		var dragEvent = group.factory._createEvent('draginit', event, group)

		group._isThresholdExceeded = false
		group._initialMouseOffset = dragEvent.mouseOffset
		group._grabOffset = dragEvent.mouseOffset.minus(dragEvent.topLeftOffset)
		ToolMan.events().register(document, 'mousemove', group._drag)
		document.onmousemove = function() { return false }
		ToolMan.events().register(document, 'mouseup', group._dragEnd)

		group._notifyListeners(dragEvent)
	},

	_drag : function(event) {
		event = ToolMan.events().fix(event)
		var coordinates = ToolMan.coordinates()
		var group = this.toolManDragGroup
		if (!group) return
		var dragEvent = group.factory._createEvent('dragmove', event, group)

		var newTopLeftOffset = dragEvent.mouseOffset.minus(group._grabOffset)

		// TODO: replace with DragThreshold object
		if (!group._isThresholdExceeded) {
			var distance = 
					dragEvent.mouseOffset.distance(group._initialMouseOffset)
			if (distance < group._thresholdDistance) return
			group._isThresholdExceeded = true
			group._notifyListeners(
					group.factory._createEvent('dragstart', event, group))
		}

		for (i in group._transforms) {
			var transform = group._transforms[i]
			newTopLeftOffset = transform(newTopLeftOffset, dragEvent)
		}

		var dragDelta = newTopLeftOffset.minus(dragEvent.topLeftOffset)
		var newTopLeftPosition = dragEvent.topLeftPosition.plus(dragDelta)
		newTopLeftPosition.reposition(group.element)
		dragEvent.transformedMouseOffset = newTopLeftOffset.plus(group._grabOffset)

		group._notifyListeners(dragEvent)

		var errorDelta = newTopLeftOffset.minus(coordinates.topLeftOffset(group.element))
		if (errorDelta.x != 0 || errorDelta.y != 0) {
			coordinates.topLeftPosition(group.element).plus(errorDelta).reposition(group.element)
		}
	},

	_dragEnd : function(event) {
		event = ToolMan.events().fix(event)
		var group = this.toolManDragGroup
		var dragEvent = group.factory._createEvent('dragend', event, group)

		group._notifyListeners(dragEvent)

		this.toolManDragGroup = null
		ToolMan.events().unregister(document, 'mousemove', group._drag)
		document.onmousemove = null
		ToolMan.events().unregister(document, 'mouseup', group._dragEnd)
	},

	_notifyListeners : function(dragEvent) {
		var listeners = this._listeners[dragEvent.type]
		for (i in listeners) {
			listeners[i](dragEvent)
		}
	}
}

function _ToolManDragEvent(type, event, group) {
	this.type = type
	this.group = group
	this.mousePosition = ToolMan.coordinates().mousePosition(event)
	this.mouseOffset = ToolMan.coordinates().mouseOffset(event)
	this.transformedMouseOffset = this.mouseOffset
	this.topLeftPosition = ToolMan.coordinates().topLeftPosition(group.element)
	this.topLeftOffset = ToolMan.coordinates().topLeftOffset(group.element)
}

_ToolManDragEvent.prototype = {
	toString : function() {
		return "mouse: " + this.mousePosition + this.mouseOffset + "    " +
				"xmouse: " + this.transformedMouseOffset + "    " +
				"left,top: " + this.topLeftPosition + this.topLeftOffset
	}
}

ToolMan._dragFactory._constraintFactory = {
	vertical : function() {
		return function(coordinate, dragEvent) {
			var x = dragEvent.topLeftOffset.x
			return coordinate.x != x
					? coordinate.factory.create(x, coordinate.y) 
					: coordinate
		}
	},

	horizontal : function() {
		return function(coordinate, dragEvent) {
			var y = dragEvent.topLeftOffset.y
			return coordinate.y != y
					? coordinate.factory.create(coordinate.x, y) 
					: coordinate
		}
	}
}
/* Copyright (c) 2005 Tim Taylor Consulting (see LICENSE.txt) */

// TODO: write unit tests
ToolMan._cssFactory = {
	readStyle : function(element, property) {
		if (element.style[property]) {
			return element.style[property]
		} else if (element.currentStyle) {
			return element.currentStyle[property]
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			var style = document.defaultView.getComputedStyle(element, null)
			return style.getPropertyValue(property)
		} else {
			return null
		}
	}
}
/* Copyright (c) 2005 Tim Taylor Consulting (see LICENSE.txt) */

/* FIXME: assumes position styles are specified in 'px' */

ToolMan._coordinatesFactory = {

	create : function(x, y) {
		// FIXME: Safari won't parse 'throw' and aborts trying to do anything with this file
		//if (isNaN(x) || isNaN(y)) throw "invalid x,y: " + x + "," + y
		return new _ToolManCoordinate(this, x, y)
	},

	origin : function() {
		return this.create(0, 0)
	},

	/*
	 * FIXME: Safari 1.2, returns (0,0) on absolutely positioned elements
	 */
	topLeftPosition : function(element) {
		var left = parseInt(ToolMan.css().readStyle(element, "left"))
		var left = isNaN(left) ? 0 : left
		var top = parseInt(ToolMan.css().readStyle(element, "top"))
		var top = isNaN(top) ? 0 : top

		return this.create(left, top)
	},

	bottomRightPosition : function(element) {
		return this.topLeftPosition(element).plus(this._size(element))
	},

	topLeftOffset : function(element) {
		var offset = this._offset(element) 

		var parent = element.offsetParent
		while (parent) {
			offset = offset.plus(this._offset(parent))
			parent = parent.offsetParent
		}
		return offset
	},

	bottomRightOffset : function(element) {
		return this.topLeftOffset(element).plus(
				this.create(element.offsetWidth, element.offsetHeight))
	},

	scrollOffset : function() {
		if (window.pageXOffset) {
			return this.create(window.pageXOffset, window.pageYOffset)
		} else if (document.documentElement) {
			return this.create(
					document.body.scrollLeft + document.documentElement.scrollLeft, 
					document.body.scrollTop + document.documentElement.scrollTop)
		} else if (document.body.scrollLeft >= 0) {
			return this.create(document.body.scrollLeft, document.body.scrollTop)
		} else {
			return this.create(0, 0)
		}
	},

	clientSize : function() {
		if (window.innerHeight >= 0) {
			return this.create(window.innerWidth, window.innerHeight)
		} else if (document.documentElement) {
			return this.create(document.documentElement.clientWidth,
					document.documentElement.clientHeight)
		} else if (document.body.clientHeight >= 0) {
			return this.create(document.body.clientWidth,
					document.body.clientHeight)
		} else {
			return this.create(0, 0)
		}
	},

	/**
	 * mouse coordinate relative to the window (technically the
	 * browser client area) i.e. the part showing your page
	 *
	 * NOTE: in Safari the coordinate is relative to the document
	 */
	mousePosition : function(event) {
		event = ToolMan.events().fix(event)
		return this.create(event.clientX, event.clientY)
	},

	/**
	 * mouse coordinate relative to the document
	 */
	mouseOffset : function(event) {
		event = ToolMan.events().fix(event)
		if (event.pageX >= 0 || event.pageX < 0) {
			return this.create(event.pageX, event.pageY)
		} else if (event.clientX >= 0 || event.clientX < 0) {
			return this.mousePosition(event).plus(this.scrollOffset())
		}
	},

	_size : function(element) {
	/* TODO: move to a Dimension class */
		return this.create(element.offsetWidth, element.offsetHeight)
	},

	_offset : function(element) {
		return this.create(element.offsetLeft, element.offsetTop)
	}
}

function _ToolManCoordinate(factory, x, y) {
	this.factory = factory
	this.x = isNaN(x) ? 0 : x
	this.y = isNaN(y) ? 0 : y
}

_ToolManCoordinate.prototype = {
	toString : function() {
		return "(" + this.x + "," + this.y + ")"
	},

	plus : function(that) {
		return this.factory.create(this.x + that.x, this.y + that.y)
	},

	minus : function(that) {
		return this.factory.create(this.x - that.x, this.y - that.y)
	},

	min : function(that) {
		return this.factory.create(
				Math.min(this.x , that.x), Math.min(this.y , that.y))
	},

	max : function(that) {
		return this.factory.create(
				Math.max(this.x , that.x), Math.max(this.y , that.y))
	},

	constrainTo : function (one, two) {
		var min = one.min(two)
		var max = one.max(two)

		return this.max(min).min(max)
	},

	distance : function (that) {
		return Math.sqrt(Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y, 2))
	},

	reposition : function(element) {
		element.style["top"] = this.y + "px"
		element.style["left"] = this.x + "px"
	}
}
/* Copyright (c) 2005 Tim Taylor Consulting (see LICENSE.txt) */

ToolMan._dragsortFactory = {
	makeSortable : function(item) {
		var group = ToolMan.drag().createSimpleGroup(item)

		group.register('dragstart', this._onDragStart)
		group.register('dragmove', this._onDragMove)
		group.register('dragend', this._onDragEnd)

		return group
	},

	/** 
	 * Iterates over a list's items, making them sortable, applying
	 * optional functions to each item.
	 *
	 * example: makeListSortable(myList, myFunc1, myFunc2, ... , myFuncN)
	 */
	makeListSortable : function(list) {
		var helpers = ToolMan.helpers()
		var coordinates = ToolMan.coordinates()
		var items = list.getElementsByTagName("li")

		helpers.map(items, function(item) {
			var dragGroup = dragsort.makeSortable(item)
			dragGroup.setThreshold(4)
			var min, max
			dragGroup.addTransform(function(coordinate, dragEvent) {
				return coordinate.constrainTo(min, max)
			})
			dragGroup.register('dragstart', function() {
				var items = list.getElementsByTagName("li")
				min = max = coordinates.topLeftOffset(items[0])
				for (var i = 1, n = items.length; i < n; i++) {
					var offset = coordinates.topLeftOffset(items[i])
					min = min.min(offset)
					max = max.max(offset)
				}
			})
		})
		for (var i = 1, n = arguments.length; i < n; i++)
			helpers.map(items, arguments[i])
	},

	_onDragStart : function(dragEvent) {
	},

	_onDragMove : function(dragEvent) {
		var helpers = ToolMan.helpers()
		var coordinates = ToolMan.coordinates()

		var item = dragEvent.group.element
		var xmouse = dragEvent.transformedMouseOffset
		var moveTo = null

		var previous = helpers.previousItem(item, item.nodeName)
		while (previous != null) {
			var bottomRight = coordinates.bottomRightOffset(previous)
			if (xmouse.y <= bottomRight.y && xmouse.x <= bottomRight.x) {
				moveTo = previous
			}
			previous = helpers.previousItem(previous, item.nodeName)
		}
		if (moveTo != null) {
			helpers.moveBefore(item, moveTo)
			return
		}

		var next = helpers.nextItem(item, item.nodeName)
		while (next != null) {
			var topLeft = coordinates.topLeftOffset(next)
			if (topLeft.y <= xmouse.y && topLeft.x <= xmouse.x) {
				moveTo = next
			}
			next = helpers.nextItem(next, item.nodeName)
		}
		if (moveTo != null) {
			helpers.moveBefore(item, helpers.nextItem(moveTo, item.nodeName))
			return
		}
	},

	_onDragEnd : function(dragEvent) {
		ToolMan.coordinates().create(0, 0).reposition(dragEvent.group.element)
	}
}



/* Copyright (c) 2005 Tim Taylor Consulting (see LICENSE.txt)

based on http://www.quirksmode.org/js/cookies.html
*/

ToolMan._cookieOven = {
	set : function(name, value, expirationInDays) {
		if (expirationInDays) {
			var date = new Date()
			date.setTime(date.getTime() + (expirationInDays * 24 * 60 * 60 * 1000))
			var expires = "; expires=" + date.toGMTString()
		} else {
			var expires = ""
		}
		document.cookie = name + "=" + value + expires + "; path=/"
	},

	get : function(name) {
		              //alert('dick');
var namePattern = name + "="
		var cookies = document.cookie.split(';')
		for(var i = 0, n = cookies.length; i < n; i++) {
			var c = cookies[i]
			while (c.charAt(0) == ' ') c = c.substring(1, c.length)
			if (c.indexOf(namePattern) == 0)
				return c.substring(namePattern.length, c.length)
		}
		return null
	},

	eraseCookie : function(name) {
		createCookie(name, "", -1)
	}
}


	var dragsort = ToolMan.dragsort()
	var junkdrawer = ToolMan.junkdrawer()

	window.onload = function() {

	//	junkdrawer.restoreListOrder("serien_box")
		junkdrawer.restoreListOrder("phoneticlong")


		dragsort.makeListSortable(document.getElementById("phoneticlong"),
  		saveOrder)

	}

	function verticalOnly(item) {
		item.toolManDragGroup.verticalOnly()
	}

	function speak(id, what) {
		var element = document.getElementById(id);
		element.innerHTML = 'Clicked ' + what;
	}

	function saveOrder(item) {
		var group = item.toolManDragGroup
		var list = group.element.parentNode
		var id = list.getAttribute("id")
		if (id == null) return
		group.register('dragend', function() {
			ToolMan.cookies().set("list-" + id, 
					junkdrawer.serializeList(list), 365)
		})
	}

 }





// update erlaubt?
upset =  GM_getValue('update', 'j');

if (upset=='j'){

//note to self: gotta make sure to update the one in the metadata too!
var v = "2.1.9";

var scriptNum = "39627";
var scriptName = "SJ Save";

//<--Updater Stuff
var isFireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
GM_addStyle("#smgm_bgdiv{ text-align: center;position:fixed;top:0px;left:0px;z-index:9991;width:100%;height:100%;background-color:transparent;opacity:0.7;display:block;visibility:visible;}");
GM_addStyle("#smgm_dialogbox { font-weight:bold;font-size:0.8em;vertical-align:middle;left:10px;top:10px;border:2px solid #436472 !important;text-align:center !important;background-color:#FAF9F9 !important;color:#436472 !important;font-family:arial,verdana !important;z-Index:9999;position:fixed;width:200px;height:350px;margin-left:auto;margin-right:auto;display:block;visibility:visible;}");
GM_addStyle(".smgm_buttons { background-color:#d0e7f1;border:1px grey solid;}");
GM_addStyle(".smgm_table { margin-bottom:10px !important;border:0px !important;border-collapse:collapse !important;margin-left:auto;margin-right:auto; }");
var remindLaterV = GM_getValue('remindLaterV', remindLaterV);
if (!remindLaterV) { remindLaterV = 0; GM_setValue('remindLaterV',remindLaterV); }

var homepageURL = "http://userscripts.org/scripts/show/" + scriptNum ;
var metaURL = "http://userscripts.org/scripts/source/" + scriptNum + ".meta.js";
var scriptJSURL = "http://userscripts.org/scripts/source/" + scriptNum + ".user.js";

function doremindLater(clicked,span)
{
	if (clicked) 
		remindLaterV = span;
	else
		remindLaterV--;
	GM_setValue('remindLaterV',remindLaterV);
}

function hideUpdate()
{
	document.getElementById('smgm_bgdiv').style.display='none';
	document.getElementById('smgm_dialogbox').style.display='none';
}

function setab(upd){
GM_setValue('update', upd);
if(upd=='j'){
GM_setValue('set5j', '#d0e7f1');
GM_setValue('set5n', '#f9f9f9');
GM_addStyle(".set5j { background-color:#d0e7f1;}");
GM_addStyle(".set5n { background-color:#f9f9f9;}");
}else{
GM_setValue('set5n', '#d0e7f1');
GM_setValue('set5j', '#f9f9f9');
GM_addStyle(".set5n { background-color:#d0e7f1;}");
GM_addStyle(".set5j { background-color:#f9f9f9;}");
}
}


function checkNew(version)
{
	var upgrade = 0;
	var verstring = "";
	var theHTML = "";
	GM_xmlhttpRequest({
		method:"GET",
		url:metaURL,
		onload:function(content){
			var USversion = content.responseText.match(/@version.*?(\d[^<]+?)\n/);
			var changeDate = content.responseText.match(/\[d:([0-9]+?\.[0-9]+?\.[0-9]+?)\]/i)[1];
			var theChanges = content.responseText.match(/\[u:(.*?)\]/i)[1];
			vSplit = version.split(".");
				vmain = Number(vSplit[0]);
				vvsub = Number(vSplit[1]);
				vrsub = Number(vSplit[2]);
			USsplit = USversion[1].split(".");
				USvmain = Number(USsplit[0]);
				USvsub = Number(USsplit[1]);
				USrsub = Number(USsplit[2]);
			verstring = "<div style='padding:5px;border-bottom:1px dotted #000;'>"+neusteV+": <a href='" + homepageURL + "' target='_new' title='Script Seite'><b>" + USvmain + "." + USvsub + "." + USrsub + "</b></a><br>"+installierteV+": <b>" + vmain + "." + vvsub + "." + vrsub + "</b></div>";
			if (USvmain > vmain) upgrade = 1;
			if ( (USvsub > vvsub) && (USvmain >= vmain) ) upgrade = 1;
			if ( (USrsub > vrsub) && (USvsub == vvsub) && (USvmain >= vmain) ) upgrade = 1;
			if (upgrade == 1) //upgrade available, pop a box
			{
				theHTML += "<div style='padding:5px;border-bottom:1px dotted #000;'>"+neueV+" <a href='" + homepageURL + "'>" + scriptName + "</a> "+verfuegbar+"</div>";
				theHTML += verstring + "<p>";
				theHTML += "<table class='smgm_table'><tr><td><input type='button' class='smgm_buttons' id='smgm_installButton' onMouseUp=\"document.location.href=\'" + scriptJSURL + "\';\" value='"+install+"'></td>";
				theHTML += "<td style='width:5px;'>&nbsp;</td><td><input style='' class='smgm_buttons' type='button' id='smgm_remindButton' value='"+spaeter+"'></td>";
				theHTML += "<td style='width:5px;'>&nbsp;</td><td><input type='button' class='smgm_buttons' id='setan' value='"+nie+"'></td>";
				theHTML += "</tr></table><div style='background-color:white !important;overflow:auto !important;height:50%;text-align:left;border-top:1px dotted #000;padding:7px;' colspan='5'>Update " + changeDate + "<br><span style='font-style:italic;'>" + theChanges + "</span></div>";
				div1 = document.createElement('div');
				div1.id = 'smgm_dialogbox';
				div1.style.display = "none";
				div1.innerHTML = theHTML;
				document.body.appendChild(div1);
				div2 = document.createElement('div');
				div2.id = 'smgm_bgdiv';
				div2.style.display = "none";
				div2.addEventListener("click",function(){doremindLater(true,10);hideUpdate();},false);
				document.body.appendChild(div2);
				document.getElementById('smgm_bgdiv').style.display='block';
				document.getElementById('smgm_dialogbox').style.display='block';
				document.getElementById('smgm_remindButton').addEventListener("click", function(){doremindLater(true,20);hideUpdate();},false);
				document.getElementById('smgm_installButton').addEventListener("click", function(){hideUpdate();},false);
				document.getElementById('setan').addEventListener('click', function(){setab('n');hideUpdate();},false);
			}
		}
	})
}

	doremindLater(false);
	if (remindLaterV < 1)
		checkNew(v);
}

//#### <<< updater stuff ####

//#### Aktuelle Folgen speichern ####

bup = GM_getValue('bup', 'j');

if(bup=='j'){

l1 = GM_getValue('aL', '');
l2 = GM_getValue('bL', '');
l3 = GM_getValue('cL', '');
l4 = GM_getValue('dL', '');
l5 = GM_getValue('eL', '');
l6 = GM_getValue('fL', '');
l7 = GM_getValue('gL', '');
l8 = GM_getValue('hL', '');
l9 = GM_getValue('iL', '');
l10 = GM_getValue('jL', '');
l11 = GM_getValue('kL', '');
l12 = GM_getValue('lL', '');
l13 = GM_getValue('mL', '');
l14 = GM_getValue('nL', '');
l15 = GM_getValue('oL', '');
  var array=new Array();
  array[1]=l1;
  array[2]=l2;
  array[3]=l3;
  array[4]=l4;
  array[5]=l5;
  array[6]=l6;
  array[7]=l7;
  array[8]=l8;
  array[9]=l9;
  array[10]=l10;
  array[11]=l11;
  array[12]=l12;
  array[13]=l13;
  array[14]=l14;
  array[15]=l15;

for (var j = 1; j <= array.length; j++) {

if (window.location.href.indexOf(array[j]) >= 0){

function setNewE(season){
var metaxaURL = array[j];

	var verstring = "";
	var theHTML = "";
	GM_xmlhttpRequest({
		method:"GET",
		url:metaxaURL,
                onload:function(content){

for (var i = 1; i <= 30; i++) {

 function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
se01 = GM_getValue('se'+season, '01');

                        sea01 = se01*1+1;

                        sea01 = zeroPad(sea01, 2);
		        sea01 = 'E'+sea01;


                        USversione = content.responseText.match(sea01);
                        if (USversione == null){
                          break;
                        }

                        USversione = USversione.toString().replace(/E/g,'');


                        GM_setValue('se'+season, USversione);
                        }
		}
                })
  }

var pepo = '2';
	if (pepo > 0){
		setNewE(j);
}
}

}



//#### Auf neue Folgen checken >>> ####


  var array=new Array();
  array[1]=l1;
  array[2]=l2;
  array[3]=l3;
  array[4]=l4;
  array[5]=l5;
  array[6]=l6;
  array[7]=l7;
  array[8]=l8;
  array[9]=l9;
  array[10]=l10;
  array[11]=l11;
  array[12]=l12;
  array[13]=l13;
  array[14]=l14;
  array[15]=l15;

for (var j = 1; j <= array.length; j++) {

function checkNewE(season){

var metaxaURL = array[j];

	var verstring = "";
	var theHTML = "";
	GM_xmlhttpRequest({
		method:"GET",
		url:metaxaURL,
                onload:function (content){

 function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
se01 = GM_getValue('se'+season, '01');

                        sea01 = se01;
                        sea01 = sea01*1+1;

                        seas01 = zeroPad(sea01, 2);
		        seas01 = 'E'+seas01;

                        USversioni = content.responseText.match(seas01);

                        if (USversioni != null){
                        newSeabg(season, sea01);
                        }
		}
             })
          }

var pepo = '2';
	if (pepo > 0){
		checkNewE(j);
      }
  }

}

//#### <<< Auf neue Folgen checken ####

//####   Anzeige naechste Folge >>> ####





//DE
function getdate(){
f1 = GM_getValue('aF', '');
f2 = GM_getValue('bF', '');
f3 = GM_getValue('cF', '');
f4 = GM_getValue('dF', '');
f5 = GM_getValue('eF', '');
f6 = GM_getValue('fF', '');
f7 = GM_getValue('gF', '');
f8 = GM_getValue('hF', '');
f9 = GM_getValue('iF', '');
f10 = GM_getValue('jF', '');
f11 = GM_getValue('kF', '');
f12 = GM_getValue('lF', '');
f13 = GM_getValue('mF', '');
f14 = GM_getValue('nF', '');
f15 = GM_getValue('oF', '');


var array = [undefined, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15];


 if(array[1]==''){
   array[1]='asdf'
 }
 if(array[2]==''){
   array[2]='asdf'
 }
 if(array[3]==''){
   array[3]='asdf'
 }
 if(array[4]==''){
   array[4]='asdf'
 }
 if(array[5]==''){
   array[5]='asdf'
 }
 if(array[6]==''){
   array[6]='asdf'
 }
 if(array[7]==''){
   array[7]='asdf'
 }
 if(array[8]==''){
   array[8]='asdf'
 }
 if(array[9]==''){
   array[9]='asdf'
 }
 if(array[10]==''){
   array[10]='asdf'
 }
 if(array[11]==''){
   array[11]='asdf'
 }
 if(array[12]==''){
   array[12]='asdf'
 }
 if(array[13]==''){
   array[13]='asdf'
 }
 if(array[14]==''){
   array[14]='asdf'
 }
 if(array[15]==''){
   array[15]='asdf'
 }

zap = document.getElementById('cal_table').getElementsByTagName('tr');
for (var k = 1; k < array.length; k++) {

     for (var i=1; i<=250; i++){
//alert(zap[i].innerHTML);

opt1 = new RegExp("<td>" + array[k] + "|<td class\=\"lang german\">DE.*|<td>.*2012<\/td>|<td>.*2013<\/td>", "img")

if (zap[i]!=undefined){
opt1 = zap[i].innerHTML.match(opt1);

if (opt1=='null'){

}else{
 if(opt1.length==3){
    // Datum
    // Name
    jaj = opt1[2].replace(/<td>/g, '');
    fag = jaj.replace(/<td>/g, '');

        if(array[k]==fag.toLowerCase()){
    jax = opt1[0].replace(/<td>/g, '');
    fax = jax.replace(/<\/td>/g, '');
    fax = fax.split('.');

              if(fax[1]=='01'){
              fax[1] = 'Jan';
              }
              if(fax[1]=='02'){
              fax[1] = 'Feb';
              }
              if(fax[1]=='03'){
              fax[1] = 'Mar';
              }
              if(fax[1]=='04'){
              fax[1] = 'Apr';
              }
              if(fax[1]=='05'){
              fax[1] = 'May';
              }
              if(fax[1]=='06'){
              fax[1] = 'Jun';
              }
              if(fax[1]=='07'){
              fax[1] = 'Jul';
              }
              if(fax[1]=='08'){
              fax[1] = 'Aug';
              }
              if(fax[1]=='09'){
              fax[1] = 'Sep';
              }
              if(fax[1]=='10'){
              fax[1] = 'Oct';
              }
              if(fax[1]=='11'){
              fax[1] = 'Nov';
              }
              if(fax[1]=='12'){
              fax[1] = 'Dec';
              }


    fax = fax[0]+'<br><span style=\'font-size:8px;\'>'+fax[1]+'</span>';

document.getElementById('td'+k+'b1').innerHTML = "<td id='td"+k+"b1' style='line-height:10px;'>"+fax+"</td>";

       GM_setValue('newE'+k, fax);
 }
break;
}else{
//document.getElementById('td'+k+'b1').innerHTML = "<td id='td"+k+"b1' style='line-height:10px;'></td>";
       GM_setValue('newE'+k, '');
}
 }
}

}
}
}
//US
function getdateUS(){
f1 = GM_getValue('aF', '');
f2 = GM_getValue('bF', '');
f3 = GM_getValue('cF', '');
f4 = GM_getValue('dF', '');
f5 = GM_getValue('eF', '');
f6 = GM_getValue('fF', '');
f7 = GM_getValue('gF', '');
f8 = GM_getValue('hF', '');
f9 = GM_getValue('iF', '');
f10 = GM_getValue('jF', '');
f11 = GM_getValue('kF', '');
f12 = GM_getValue('lF', '');
f13 = GM_getValue('mF', '');
f14 = GM_getValue('nF', '');
f15 = GM_getValue('oF', '');


var array = [undefined, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15];


 if(array[1]==''){
   array[1]='asdf'
 }
 if(array[2]==''){
   array[2]='asdf'
 }
 if(array[3]==''){
   array[3]='asdf'
 }
 if(array[4]==''){
   array[4]='asdf'
 }
 if(array[5]==''){
   array[5]='asdf'
 }
 if(array[6]==''){
   array[6]='asdf'
 }
 if(array[7]==''){
   array[7]='asdf'
 }
 if(array[8]==''){
   array[8]='asdf'
 }
 if(array[9]==''){
   array[9]='asdf'
 }
 if(array[10]==''){
   array[10]='asdf'
 }
 if(array[11]==''){
   array[11]='asdf'
 }
 if(array[12]==''){
   array[12]='asdf'
 }
 if(array[13]==''){
   array[13]='asdf'
 }
 if(array[14]==''){
   array[14]='asdf'
 }
 if(array[15]==''){
   array[15]='asdf'
 }

zap = document.getElementById('cal_table').getElementsByTagName('tr');

for (var k = 1; k < array.length; k++) {

     for (var i=1; i<=250; i++){

opt1 = new RegExp("<td>" + array[k] + "|<td.*>US<\/td>|<td>.*2012<\/td>|<td>.*2013<\/td>", "img")

if (zap[i]!=undefined){
opt1 = zap[i].innerHTML.match(opt1);

 if(opt1.length==3){
    // Datum
    // Name
    jaj = opt1[2].replace(/<td>/g, '');
    fag = jaj.replace(/<td>/g, '');

        if(array[k]==fag.toLowerCase()){
    jax = opt1[0].replace(/<td>/g, '');
    fax = jax.replace(/<\/td>/g, '');
    fax = fax.split('.');

              if(fax[1]=='01'){
              fax[1] = 'Jan';
              }
              if(fax[1]=='02'){
              fax[1] = 'Feb';
              }
              if(fax[1]=='03'){
              fax[1] = 'Mar';
              }
              if(fax[1]=='04'){
              fax[1] = 'Apr';
              }
              if(fax[1]=='05'){
              fax[1] = 'May';
              }
              if(fax[1]=='06'){
              fax[1] = 'Jun';
              }
              if(fax[1]=='07'){
              fax[1] = 'Jul';
              }
              if(fax[1]=='08'){
              fax[1] = 'Aug';
              }
              if(fax[1]=='09'){
              fax[1] = 'Sep';
              }
              if(fax[1]=='10'){
              fax[1] = 'Oct';
              }
              if(fax[1]=='11'){
              fax[1] = 'Nov';
              }
              if(fax[1]=='12'){
              fax[1] = 'Dec';
              }


    fax = fax[0]+'<br><span style=\'font-size:8px;\'>'+fax[1]+'</span>';

document.getElementById('td'+k+'b2').innerHTML = "<td id='td"+k+"b2' style='line-height:10px;'>"+fax+"</td>";

       GM_setValue('newEUS'+k, fax);
 }
break;
}else{
//document.getElementById('td'+k+'b2').innerHTML = "<td id='td"+k+"b2' style='line-height:10px;'></td>";
       GM_setValue('newEUS'+k, '');
}
 }

}
}
}

//#### <<< Anzeige naechste Folge ####



draglibtn = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA5SURBVHjaXMuxDQAgDAPBJ5VH8FTZf4SM4A4qJER9utXd2zaSAEhC2WZmSAKAJEoSP9TVF+ptF84AxFodOyfkf4IAAAAASUVORK5CYII=';

// settings
// immer einblenden
visi = GM_getValue('set1', 'hidden');
// fenster mit scrollen
fix  = GM_getValue('fix', 'absolute');
// Cover laden
cover =  GM_getValue('cover', 'j');
// schrift buendig
bund =  GM_getValue('bund', 'left');
// css button settingz
set1j = GM_getValue('set1j' ,'#f9f9f9');
set1n = GM_getValue('set1n' ,'#d0e7f1');
set2j = GM_getValue('set2j' ,'#f9f9f9');
set2n = GM_getValue('set2n' ,'#d0e7f1');
set3j = GM_getValue('set3j' ,'#d0e7f1');
set3n = GM_getValue('set3n' ,'#f9f9f9');
set4j = GM_getValue('set4j' ,'#d0e7f1');
set4n = GM_getValue('set4n' ,'#f9f9f9');
set4x = GM_getValue('set4x' ,'#f9f9f9');
if (upset=='j'){
set5j = GM_getValue('set5j' ,'#d0e7f1');
set5n = '#f9f9f9';
}else{
set5n = GM_getValue('set5n' ,'#d0e7f1');
set5j = '#f9f9f9';
}
set6j = GM_getValue('set6j' ,'#d0e7f1');
set6n = GM_getValue('set6n' ,'#f9f9f9');
set7j = GM_getValue('set7j' ,'#d0e7f1');
set7n = GM_getValue('set7n' ,'#f9f9f9');
set8j = GM_getValue('set8j' ,'#d0e7f1');
set8n = GM_getValue('set8n' ,'#f9f9f9');

// Serienleiste Position laden
x = GM_getValue('x', '10px');
y = GM_getValue('y', '115px');

settsimg = 'data:image/png;base64,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';
hidesimg = 'data:image/png;base64,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';
hidesimg2 = 'data:image/png;base64,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';
editsimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAaQSURBVHjavJZJjFxXFYa/+6aa56qe3F3ddrftbis4UQxEChkwYlgYKUIKSCgLQqSwAVYIgWCNQEiIDUJCRCBZCrAgCxBkEQIxcQLBMXHk9tRtd3e5q2vqmt6req/qVb2JRcdtPCFWObv3dO/9zn/0n3OvCIKADyMUgL+dX73zpyzT1Hu8ceEKW+UaQ3sEgCQJggCikTCj8ZiQpiFLkpBlOegaPZbmZx9/dPngi+bQPrtdb/2+0mj38pkUv/jOi3ug/xWu5+GOhgCZWCJVmJrITi7PHyh+ZLF4SBai8JvX357fbXZfScZjpeOHi3+4vlNPj8fO8wF8RZalrwqJzX1FdxfP8328IFCDIDiVz6ROzhw9tHB8sXj4SHE6U0gnk0DUMC0OTk3wztUNdL3/6UePLfmyJMWDIKDW7OJ57lOu5/9J74nPAjsKgKbsCQuCAEkSTGRTKLL8kyNz09987NgSU9kUhjWkPxiyVd1FAEII9LjF2HFYnJ+JWraN03IRQhAOabQ6FmPHXWnXKz8FvqgACLGnRAiBkASpWPR54BuaqlBpdjDMAZIsUCSZkKqgqnuJXblZ5epGmXgswtLcNFe3ymiaiuu5AFjtmj+zsHR2v3S3IgggEQ6fnMymf15tdcRgNEZTFWKREACqqiABqqrS7ZmcfvUMY8ehUjcJApgqZCmVa1hDG6vbHsfzM18/eqj40j5ISAJFlpGFND9byJ7umYOIORhhDkdoikJIVVAU+dYaupbFy6+9hdGzPnBiQKW+S9+0mMhlUPumb1v9H+cyqZd83+cORWFVjcxN5n+tSNIswPVKHXMwJBYJoSgyen9Ap2fS6Vn849IatUYLRVEYDO29gxQZIaBc28XqG78LguAH9/SRPXJYnpv5meO6J6/Xm7y3tsW5KzeYKWS5tLWD5/vIkkQuGWejtku10UJVlDv6Kx6N4vs+9tC6fHjp0Lc0TbUVScL1vNugixvb39f71gu6NaBUa+IHAY8cXmAikySbiDOZS5NJxLhWqnBpfQtVUbBHI4IgQIg9iBCCbqddz+ULzyYTsfotJb4f3Ab1BvZzsiwzkU4ym8+STcbIJhPEIhqqrOB4Lt3+gO1Gm7Hj4Pv+/gHRSBhZlmm3W3axWDy1cvDAtQeOoLCqXH7qkZWVRkcnGg6hyjKmbbNR3WW3bdAxLcbOXo9MT+Ypbd1E1sJEI2EUWcJ1XaamJt0Dk7kbe9PEvz+oNxheluDZkKZys9bkRrXBaOygqQr5VIKHF+eZm8zxl3dXOVqcIRoOsb5ZxnFdIqEQj59YZqfZEWPH0QzL535zWgEwzMGGD74mK5IQgoXJPPNTBTLJOKlYBFmWAXj51b+zce4NvvTC1zjx0BHS8Sif+ehDqKrKK2f+heP5Y0WWHjy9raG92TJ6g1QsGj+2cIBkLIIH6L0+q5stqq0ubaPPwtwUQfA06XiUYwuzTOdSFFIp8tkkM/mMVqo3n1Rk5c8PBDmOt77bMXaKU4Vlo2/x1sU1Kq0ug6GNqipMpJOcOHKQ44tF1so1BGCYFp2eCVT4+LFFji8V1abe/64kidcUSXLuCwoCv1mqt9584uGVZQMY2COWDkwyW8gxnU/vl07vmVzaKjNyXIajMfbYIREO8e9rm6wszLI8P/PEern2tB8ErwuxNzHuAGmaynaj9VvHcb6ciIYTpz5x4vaV4XmUqg12mh3Ku212djt7tg6FSEYiRMIafhCwXq6RT8ax8pnvNTrGmZHrueJuRSFNpd7Wz25UG388PDv93MC2WduuUqo20a0BruuTTkQ5OD2BJAkc10dTFYLAvyOhaltHkeWT2UTsh2s79W//tzEUgFgkjOO43upG+VfL87PPjK1hfLvRJhWPcnxpnuJkDlVVAUgnolxYL+F5Hn4Q4Loeru/juF5g2SN9NHau11rdUr3ZRVbuAiWiYTzPZ6PSeLut987k0snPP/Pkx+5xjud5FFJJMvEYG7VdRmNnYI+d93sD+2xH7696vnela5g3gH4opN5rBklISIqEZY9Gb75/9Zdf+ORjnwKiAJ2eSaOj09L71Dq61+mZ24Y5OF9pdt41rME7hmGuxqJh3bSGaKq6d3kKcX97738oCpdvVv4a+eeF1zKp+Oe2663z7Z75Xqdn7jSNvjEeO9Wu0b/oB0HZcTxc193fK8sysiLhO96DG/ZWfJCHde7a5o900zrtOO7ZgT1q5dJJbpQqRMKh/bWqKuP7Hv/vs1B8WA/I/wwActE47NnArtIAAAAASUVORK5CYII=';
infosimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAOeSURBVHjavJY5bFxVFIbPvfftu/1mxjP2yMt4wcFgcAdOkEwkCsLSISoqKnoKhGko6FEqkBBISNAQEBKIDolFQiA5JAETx45JnBmPZ/Wb5c3bl0tDKksW+EX5y3OLT/+5/5F+RCmFhyEMD0nMaY97h60TM44hsLV37+JB6/jtnKaU77WOt595fHHz4try7plBO9XGiRnBWKq2rdfSlG64QUjiNJ29WW38lAm0WzvpCGP0dKdvP1cp5YmpyRBEMb9ba74EAJfPDNIkAYauD5okgMCx90GswLFkeboIEs+BF0YAAP1MYcAYAcYIBo4Ht+tt0CQBVivlq7os/trp26Nq2wpcP/zz3HTxcqYw3FdKKbAMgWrbYhrWwM8b6jt+GH0RxomW05WtmQnzamYQRggIxihOkgoFuEQw3giiuHg8GHXOzZTeC6N4K0nSbPFGCEGcpKLjB6+OvGBTk8QFTRLADyPoDkdwfb9mr6/Mvz5wvDCrI+XouP8WwXhzrphLMUbUUCRkyCKkKQXb8xd5llFYhliZQPVu/804STdffGr1Oy8I02rbupTTFWSqMvRGLuiyWCiN63lCsJUpdRxDnt94Yunz2Qnzjd3D1n4YJxgAwA1CsF0fcrrS41hmyLNMtj969slHrqii8PWtWjMcON6FR6dLIPMcDF0foiSB4pj2IwLo/JcwnOporpj7lBB8e7/efkXg2LWSqQPLEGj1hqCKQmQo0leqJCSqJGQDRXHSutvoTjhB+HLBUIkui+AGIQwcD6Zyxi95Xdn+6+CI3rhzmG11h90eNKzBhThOzpdzY4ARgu5gBBgjWFuY/uyHP/b6QRQDRigbqN23td7IfcFQJFGXRQjjBNp9G5bKE39/+fPv39qev14wVIoQ+g0A0jOvbuQFFT+M1kumDjzLgGU7QDAGlpBPWr1h+dp+7WNVFGZMVaaZHA0cb5VgvDhlGsAyBGzXh3FNbh52e/HNg/pHyzOT6uJUocNljTdD8LwqCVjgWAiiGGSBh7vNrrFTbby7Mlem51fm3xc4dhshlM2RqSkLrd4QwjgGhBAMXY92+jazWil3HpudvDJpGh8ihFqZO0NxTBvW2pa/U20ijJDr+MHRUnnixsJU4fvSuP4NpbTzQMpJ3lA/qEzmR9bQKYg825ktmrcKhnrdUKRrlNLk/zQ1dFqvO2h2eccPV9wgnJJ4biQL3J0wTuoSz8UIAaQpBfTvDZXzY2cHPUj9MwD1wJtqNFXuVwAAAABJRU5ErkJggg==';
newimg   = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAACXBIWXMAAG66AABuugHW3rEXAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAALnSURBVHjatJQ/aFRJHMc/M292zequCComxPCiISHG4+5ACwVdbrUxNok50KQKqFilTKsINndFsLwmchEEG9GIIBZaHJHgCqkCUXFjDBYe/gskZs3uvnk/i8zKsOyqCA58ecOb73xm3vt9Z1QYhg+2NjdnX+bzURdglUIBGlDUbwLE7hmI8Bxo27/fLL19O2VOnz178J/Ll82vYDqVIgYCB9QNgLGTBbRSpESYm5/nzMjIAbN7zx7SHz4wqDVFIAkkvgL1YRWgDOxTirGlJVrCENPR2UkC2OUMSSfjVA8YOZWdEm7OjpYWTCKRIACa3K6anCHxDWDFG69+0fLKCsbGMbgCVAsReKoFKq8oUU3xVj9+xOBBrDP4QOVNkBqgvwENRNaiReTL6rrBjur16/lFpGEyfrj9PKB4+t5Wb47mGxBp0G/kM7UnoFa6zhmuJwCt9TpQvPRbLz7ai4m/sPUUee9NEGD8XFUNpiYSfg5rYdbzRdZiUOv2hAglpSh7BvHC7QP9cxy7o6eAleVl9LZ0mkx3NxdEeC2CAdacSt7EqkreuAH+F+FSHBPv3ImxluD506cLF8fG/iyGIVdmZrBra4QiaHc3RjW7qv7rUhxzT4TxdJpwcJDDR49y4/r180GhUJhdXFgonOzvP/bbkSP22ebN5t8nT9gVRaSApFKUHCQAVkSYF+FSMonq7SXb11fetmlTZfLmzYtzc3MT1UtGABkYGPjrj1zu+Jv37/fenpzUzbOzDFhLh17/q/NxzK0g4GVXF4ez2TizcWPhcT4/PT09/bdjrFbTEAApB28aHR29NjU1JUPnzkm2vV36lZITSsmhtjbpPXVKxsfHZWho6A7wO9Dt1ApsUV4yqjeXSiaTqZ6enr5cLndye2vr8YczM1QqFX7p6ODNq1f/Pcrn7y4uLt6PomjV1acIfAIqjW4kDZRTqVR7JpMJh4eHr0ZRpCcmJkaKxeK7Uqn0Atjgiv7Jq5f9PADIkUKPGu5TeQAAAABJRU5ErkJggg==';
hkn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLGBEFLEnT+McAAAGbSURBVDjLpZM/SEJxEMe/v1dQT5pMCHRpEUwoCCqMIAIFh4aUdHFoaRMcgoYC8T2fEgRRpGbU0BiG/RuCSCsqIqEIrShEAqEiQjHCpYh41xQE/X11091xnzvuji/wT6v4C5TMJNu4du6GdTBRMbyT2dnWjehIJ+lofm++TxEsLol+jaQhw5iBdjO7YUWwPWwfhwBSC2o5cZyYVgT3hnvFGqmG+ABP0rKkbLIz6nRAAMEHsoVsR4rgmfWZQe2oliBAdsfd9G1xoVhofh/nrnOtneFOggCZ9/N0dnHWfX51zj6AcxtzjYYRw6k+pCd7yL76ljdPmQkCZE7gyDJhaflqcOXW7dZC9jHbgGcgj3xP/DDuvnu4M3n2PQQGuOpdT7OO2VPVgOrTBgwAvIteCp4ECRxg1VhZ4bmAdDmNWq4WJaHEvludA4CgI8hMdSYGBpa6TyFdTgMA+pv61346NPfmaEkbggwqUxkAYOSNGOoamvz1y16KL43VvmqCCMIw5FgqRoqF4l3xUlWgiiKJSOlP2j64POiLbkYVKewVAFmdTAKBIbAAAAAASUVORK5CYII=";



GM_addStyle("#serien_box { z-Index:9997; min-width:120px;font-weight:bold;font-size:0.8em;left:"+x+";top:"+y+";border:0px solid #436472 !important;text-align:"+bund+" !important;background-color:transparent !important;color:#000 !important;font-family:Arial, Times, Times New Roman, sans-serif !important;position:"+fix+";display:block;visibility:"+visi+";}");
GM_addStyle("#settingz { text-shadow: 1px 1px 1px #888; border-radius: 10px 10px 10px 10px;z-Index:9997;min-width:300px;height:400px;font-weight:bold;font-size:0.8em;right:40%;top:100px;border:2px solid #436472 !important;text-align:center !important;background-color:#FAF9F9 !important;color:#436472 !important;font-family:Arial, Times, Times New Roman, sans-serif !important;position:fixed;margin-left:0px;margin-right:0px;display:block;visibility:hidden;}");
GM_addStyle("#settingztbl tr:hover td{background-color:#deebfe;}");

GM_addStyle("#info { text-shadow: 1px 1px 1px #888;border-radius: 10px 10px 10px 10px;z-Index:9997;width:300px;height:480px;font-weight:bold;font-size:0.8em;right:40%;top:30px;border:2px solid #436472 !important;text-align:center !important;background-color:#FAF9F9 !important;color:#436472 !important;font-family:Arial, Times, Times New Roman, sans-serif !important;position:fixed;margin-left:5px;margin-right:5px;display:block;visibility:hidden;}");
GM_addStyle("#infotbl td{border-bottom:1px black solid;padding:3px 0 3px 0;} #infotbl tr {background-color:#fff;} #infotbl tr #tdb2{background-color:#e6e6e6;}#infotbl tr:hover td{background-color:#deebfe !important; }");
GM_addStyle("#bttn_show { right:15px;top:140px;border:none !important;background-color:transparent !important;position:fixed;height:50px;width:30px;display:block;visibility:visible;}");
GM_addStyle("#set_bgdiv{ z-Index:9996;text-align: center;position:fixed;top:0px;left:0px;z-index:5;width:100%;height:100%;background-color:black;opacity:0.7;display:block;visibility:visible;}");
GM_addStyle(".info { background-image: url('"+infosimg+"'); background-color:transparent; background-repeat:no-repeat; width:26px; height:26px; border:none;}");
GM_addStyle(".infchng { cursor: pointer;font-weight:bold;font-size:12px;padding-left:5px;color:#436472;background-color:transparent; border:none; text-shadow: 1px 1px 1px #888;}");
GM_addStyle(".infchngbtn { padding-left:8px;padding-right:5px; background-image: url('"+hkn+"');background-repeat:no-repeat; background-color:transparent;border-radius: 5px 5px 5px 5px;boder:2px solid #436472}");
GM_addStyle(".bttn_set { background-image: url('"+settsimg+"'); background-color:transparent; background-repeat:no-repeat; border:none;right:-10px;top:205px;position:fixed;height:35px;width:40px;visibility:visible;}");
GM_addStyle(".show { background-image: url('"+hidesimg+"'); background-color:transparent; background-repeat:no-repeat; width:51px; height:88px; border:none;}");
GM_addStyle(".edit { background-image: url('"+editsimg+"'); background-color:transparent; background-repeat:no-repeat; width:26px; height:26px; border:none;}");
GM_addStyle(".ok { font-size:1.5em;font-weight:bold;background-color:transparent; color:#a0d460; border:0px #436472 solid;margin:-21px 0px 0px -10px; padding:5px 4px 5px 3px; width: 20px; height: 100%; cellspacing:0px; cursor:pointer;visibility:hidden;}");
GM_addStyle(".del { font-size:1.5em;font-weight:bold;background-color:transparent; color:#3c72a9; border:0px #436472 solid; margin:-21px 0px 0px 0px; padding-bottom:3px; width: 15px; height: 100%; cellspacing:0px; cursor:pointer;visibility:hidden;}");
GM_addStyle("#serien_box a:link { color:black; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; line-height:1.3em; text-decoration:none;} #serien_box a:visited {  color:black; text-decoration:none; } #serien_box a:focus {  color:black; text-decoration:none; } #serien_box a:hover { color:white; text-shadow: 2px 2px 7px #000; text-decoration:none;} #serien_box a:active {  color:black; text-decoration:none; }");



//platz fuer die liste schaffen falls junkies enhancer genutzt wird

function setwidthen(e){
trckB = document.getElementsByClassName('hosterButton')[0];
trckO = document.getElementsByClassName('seasonTitle')[0];
if (trckB || trckO){
GM_addStyle("#rap { width: 80%; margin-left:220px; }");
}
}


GM_addStyle(".set1j { background-color:"+set1j+";box-shadow: 1px 1px 2px #000;border-radius: 5px 0px 0px 5px;border:1px grey solid; width:40px;}");
GM_addStyle(".set1n { background-color:"+set1n+";box-shadow: 1px 1px 2px #000;border-radius: 0px 5px 5px 0px;border:1px grey solid; width:40px;}");
GM_addStyle(".set2j { background-color:"+set2j+";box-shadow: 1px 1px 2px #000;border-radius: 5px 0px 0px 5px;border:1px grey solid; width:40px;}");
GM_addStyle(".set2n { background-color:"+set2n+";box-shadow: 1px 1px 2px #000;border-radius: 0px 5px 5px 0px;border:1px grey solid; width:40px;}");
GM_addStyle(".set3j { background-color:"+set3j+";box-shadow: 1px 1px 2px #000;border-radius: 5px 0px 0px 5px;border:1px grey solid; width:40px;}");
GM_addStyle(".set3n { background-color:"+set3n+";box-shadow: 1px 1px 2px #000;border-radius: 0px 5px 5px 0px;border:1px grey solid; width:40px;}");
GM_addStyle(".set4j { background-color:"+set4j+";box-shadow: 1px 1px 2px #000;border-radius: 5px 0px 0px 5px;border:1px grey solid; width:50px;}");
GM_addStyle(".set4n { background-color:"+set4n+";box-shadow: 1px 1px 2px #000;border:1px grey solid; width:60px;}");
GM_addStyle(".set4x { background-color:"+set4x+";box-shadow: 1px 1px 2px #000;border-radius: 0px 5px 5px 0px;border:1px grey solid; width:50px;}");
GM_addStyle(".set5j { background-color:"+set5j+";box-shadow: 1px 1px 2px #000;border-radius: 5px 0px 0px 5px;border:1px grey solid; width:40px;}");
GM_addStyle(".set5n { background-color:"+set5n+";box-shadow: 1px 1px 2px #000;border-radius: 0px 5px 5px 0px;border:1px grey solid; width:40px;}");
GM_addStyle(".set6j { background-color:"+set6j+";box-shadow: 1px 1px 2px #000;border-radius: 5px 0px 0px 5px;border:1px grey solid; width:40px;}");
GM_addStyle(".set6n { background-color:"+set6n+";box-shadow: 1px 1px 2px #000;border-radius: 0px 5px 5px 0px;border:1px grey solid; width:40px;}");
GM_addStyle(".set7j { background-color:"+set7j+";box-shadow: 1px 1px 2px #000;border-radius: 5px 0px 0px 5px;border:1px grey solid; width:40px;}");
GM_addStyle(".set7n { background-color:"+set7n+";box-shadow: 1px 1px 2px #000;border-radius: 0px 5px 5px 0px;border:1px grey solid; width:40px;}");
GM_addStyle(".set8j { background-color:"+set8j+";box-shadow: 1px 1px 2px #000;border-radius: 5px 0px 0px 5px;border:1px grey solid; width:40px;}");
GM_addStyle(".set8n { background-color:"+set8n+";box-shadow: 1px 1px 2px #000;border-radius: 0px 5px 5px 0px;border:1px grey solid; width:40px;}");
GM_addStyle(".set9 { background-color:#f9f9f9;border-radius: 4px 4px 4px 4px;box-shadow: 1px 1px 2px #000;border:1px grey solid;}");

GM_addStyle(".set10 { background-color:#f9f9f9;border-radius: 4px 4px 4px 4px;box-shadow: 1px 1px 2px #000;border:1px grey solid;  }");

// aktuelle url
var serLink  = location.href;

if(staff=='j'){
aN = GM_getValue('aN', '');
bN = GM_getValue('bN', '');
cN = GM_getValue('cN', '');
dN = GM_getValue('dN', '');
eN = GM_getValue('eN', '');
fN = GM_getValue('fN', '');
gN = GM_getValue('gN', '');
hN = GM_getValue('hN', '');
iN = GM_getValue('iN', '');
jN = GM_getValue('jN', '');
kN = GM_getValue('kN', '');
lN = GM_getValue('lN', '');
mN = GM_getValue('mN', '');
nN = GM_getValue('nN', '');
oN = GM_getValue('oN', '');
}else{
aN = GM_getValue('aN', '');
aN = aN.split('<br>');
aN = aN[0];

bN = GM_getValue('bN', '');
bN = bN.split('<br>');
bN = bN[0];

cN = GM_getValue('cN', '');
cN = cN.split('<br>');
cN = cN[0];

dN = GM_getValue('dN', '');
dN = dN.split('<br>');
dN = dN[0];

eN = GM_getValue('eN', '');
eN = eN.split('<br>');
eN = eN[0];

fN = GM_getValue('fN', '');
fN = fN.split('<br>');
fN = fN[0];

gN = GM_getValue('gN', '');
gN = gN.split('<br>');
gN = gN[0];

hN = GM_getValue('hN', '');
hN = hN.split('<br>');
hN = hN[0];

iN = GM_getValue('iN', '');
iN = iN.split('<br>');
iN = iN[0];

jN = GM_getValue('jN', '');
jN = jN.split('<br>');
jN = jN[0];

kN = GM_getValue('kN', '');
kN = kN.split('<br>');
kN = kN[0];

lN = GM_getValue('lN', '');
lN = lN.split('<br>');
lN = lN[0];

mN = GM_getValue('mN', '');
mN = mN.split('<br>');
mN = mN[0];

nN = GM_getValue('nN', '');
nN = nN.split('<br>');
nN = nN[0];

oN = GM_getValue('oN', '');
oN = oN.split('<br>');
oN = oN[0];

}

// gespeicherte daten abrufen
aL = GM_getValue('aL', '');
aI = GM_getValue('aI', '');

bL = GM_getValue('bL', '');
bI = GM_getValue('bI', '');

cL = GM_getValue('cL', '');
cI = GM_getValue('cI', '');

dL = GM_getValue('dL', '');
dI = GM_getValue('dI', '');

eL = GM_getValue('eL', '');
eI = GM_getValue('eI', '');

fL = GM_getValue('fL', '');
fI = GM_getValue('fI', '');

gL = GM_getValue('gL', '');
gI = GM_getValue('gI', '');

hL = GM_getValue('hL', '');
hI = GM_getValue('hI', '');

iL = GM_getValue('iL', '');
iI = GM_getValue('iI', '');

jL = GM_getValue('jL', '');
jI = GM_getValue('jI', '');

kL = GM_getValue('kL', '');
kI = GM_getValue('kI', '');

lL = GM_getValue('lL', '');
lI = GM_getValue('lI', '');

mL = GM_getValue('mL', '');
mI = GM_getValue('mI', '');

nL = GM_getValue('nL', '');
nI = GM_getValue('nI', '');

oL = GM_getValue('oL', '');
oI = GM_getValue('oI', '');

if(aN == ''){
aD = '';
}else{
aD = draglibtn;
}

if(bN == ''){
bD = '';
}else{
bD = draglibtn;
}

if(cN == ''){
cD = '';
}else{
cD = draglibtn;
}

if(dN == ''){
dD = '';
}else{
dD = draglibtn;
}

if(eN == ''){
eD = '';
}else{
eD = draglibtn;
}

if(fN == ''){
fD = '';
}else{
fD = draglibtn;
}

if(gN == ''){
gD = '';
}else{
gD = draglibtn;
}

if(hN == ''){
hD = '';
}else{
hD = draglibtn;
}

if(iN == ''){
iD = '';
}else{
iD = draglibtn;
}

if(jN == ''){
jD = '';
}else{
jD = draglibtn;
}

if(kN == ''){
kD = '';
}else{
kD = draglibtn;
}

if(lN == ''){
lD = '';
}else{
lD = draglibtn;
}

if(mN == ''){
mD = '';
}else{
mD = draglibtn;
}

if(nN == ''){
nD = '';
}else{
nD = draglibtn;
}

if(oN == ''){
oD = '';
}else{
oD = draglibtn;
}


// cover laden, leer lassen wenn keins vorhanden/gewollt
if (location.href != 'http://serienjunkies.org/'){
var Element = document.getElementsByTagName("p")[1];
var AElement = document.getElementsByClassName('seasonCover')[0];
if(Element){
// wenn cover existiert
if (Element.getElementsByTagName('img')[0]){

var bckimg = Element.firstChild.getAttribute('src');
  if(cover == 'n'){
   bckimg = '&nbsp;';
  }
} 
// junkies enhancer
}else if(AElement){

// wenn cover existiert
if (AElement.getElementsByTagName('img')[0]){

var bckimg = AElement.firstChild.getAttribute('src');
  if(cover == 'n'){
   bckimg = '&nbsp;';
  }
} 
}
// wenn cover nicht existiert
else{
   if(cover == 'n'){
   bckimg = '&nbsp;';
}
// cover fuer breaking bad
  if(cover == 'j'){
  bckimg = 'http://justpic.info/images3/14eb/10798.jpg.817700.jpg'
  }
  if(cover == 'j' && location.href == 'http://serienjunkies.org/breaking-bad/breaking-bad-season-5-hdtv-xvid720p/'){
  bckimg = 'http://justpic.info/images/749d/bb.jpg'
  }

}}
// url woerter entfernen
var serName = serLink.replace(/http:\/\/serienjunkies.org\//g, "");
var serName2 = serName.replace(/-/g, " ");
var serName4 = serName2.replace(/serie\//g, "");
var serName5 = serName4.replace(/hdtv/g, "");
var serName6 = serName5.replace(/720p/g, "");
var serName7 = serName6.replace(/ituneshd/g, "");
var serName8 = serName7.replace(/dvdrip/g, "");
var serName9 = serName8.replace(/xvid/g, "");
var serName10 = serName9.replace(/1080p/g, "");
var serName11 = serName10.replace(/1080i/g, "");
var serName12 = serName11.replace(/h264/g, "");
var serName13 = serName12.replace(/bluray/g, "");
var serName14 = serName13.replace(/blu ray/g, "");
var serName15 = serName14.replace(/dvdr/g, "");
var serName16 = serName15.replace(/dvd9/g, "");
var serName17 = serName16.replace(/dtv/g, "");
var serName18 = serName17.replace(/atv/g, "");
var serName19 = serName18.replace(/rip/g, "");
var serName20 = serName19.replace(/sat/g, "");
var serName21 = serName20.replace(/web/g, "");
var serName22 = serName21.replace(/dl/g, "");
var serName23 = serName22.replace(/complete/g, "");
var serName24 = serName23.replace(/divx/g, "");
var serName211 = serName24.replace(/x264/g, "");
var serName212 = serName211.replace(/%e2%80%93/g, "");
var serName213 = serName212.replace(/bd50/g, "");

var serName25 = serName213.replace(/ p /g, "");



var serName26 = serName25.replace(/staffel/g, "<br>staffel");
var serName27 = serName26.replace(/season/g, "<br>season");

var serName28 = serName25.replace(/staffel/g, "");
var serName29 = serName28.replace(/season/g, "");


var InfoWort = serName29.split("/");
var serNameE = InfoWort[0];


var Wort = serName27.split("/");
var serName3 = Wort[1];
if (!serName3){
var serName3 = Wort[0];
}

// serienaufruf
function clik(ref){
location.href = ref;
}

// hide&sow bttn anzeige
function showbtn(){
set1 = GM_getValue('set1', 'hidden');
if (set1 == 'visible'){
document.getElementsByClassName('show')[0].style.backgroundImage = "url('"+hidesimg2+"')";
}else{
document.getElementsByClassName('show')[0].style.backgroundImage = "url('"+hidesimg+"')";
}}

// hide&show serien
function show(){
if (document.getElementById('serien_box').style.visibility == 'visible'){
document.getElementById('serien_box').style.visibility = 'hidden';
document.getElementsByClassName('show')[0].style.backgroundImage = "url('"+hidesimg+"')";
}else{
document.getElementById('serien_box').style.visibility = 'visible';
document.getElementsByClassName('show')[0].style.backgroundImage = "url('"+hidesimg2+"')";
}}

// hide&show settingz
function setshow(){
if (document.getElementById('settingz').style.visibility == 'visible'){
document.getElementById('settingz').style.visibility = 'hidden';
document.getElementById('set_bgdiv').style.display='none';
document.body.removeChild(divbg);
}else{
document.getElementById('settingz').style.visibility = 'visible';
divbg = document.createElement('div');
divbg.id = 'set_bgdiv';
divbg.style.display = "block";
divbg.addEventListener("click",function(){setshow();},false);
document.body.appendChild(divbg);
}
}

// hide&show info
function info(){
if (document.getElementById('info').style.visibility == 'visible'){
document.getElementById('info').style.visibility = 'hidden';
document.getElementById('set_bgdiv').style.display='none';
document.body.removeChild(divbg);
}else{  
document.getElementById('info').style.visibility = 'visible';
divbg = document.createElement('div');
divbg.id = 'set_bgdiv';
divbg.style.display = "block";
divbg.addEventListener("click",function(){info();},false);
document.body.appendChild(divbg);
}
}


// hide&show edit buttons
function edit(){

for (var i=0; i<15; i++) {
if (document.getElementsByClassName('ok')[i].style.visibility == 'visible'){
document.getElementsByClassName('ok')[i].style.visibility = 'hidden';
document.getElementsByClassName('del')[i].style.visibility = 'hidden';

}else{

document.getElementsByClassName('ok')[i].style.visibility = 'visible';
document.getElementsByClassName('del')[i].style.visibility = 'visible';

}
}
}
// loescht den inhalt einer zeile
function serieB(nam,lin,tx,bimg,inf,dragb){
GM_setValue(nam, '');
GM_setValue(lin, '');
GM_setValue(bimg, '');
GM_setValue(inf, '');
GM_setValue('se'+dragb, 'x');
GM_setValue('newE'+dragb, '');
GM_setValue('newEUS'+dragb, '');

  document.getElementById('dragb'+dragb+'').style.backgroundImage = '';

  document.getElementById(''+tx+ '').style.backgroundImage = 'url()';

  document.getElementById(''+tx+ '').innerHTML = "<td width='90%' id='" +tx+ "' style='border:0px;background-image:none;background-color:transparent;'><a href=\"\"></a>";
}

// uebergibt den serien namen, link, id, cover, info name, dragbttn setzt serie in tabelle und speichert
function serieA(nam,lin,tx,bimg,inf,dragb){
GM_setValue(bimg, bckimg);
GM_setValue(nam, serName3);
GM_setValue(lin, serLink);

if(serName3.match('two and a half men')){
 serNameE = 'two and a half men';
}
if(serName3.match('tron der aufstand')){
 serNameE = 'tron - der aufstand';
}
if(serName3.match('tron uprising')){
 serNameE = 'tron - der aufstand';
}
GM_setValue(inf, serNameE);

GM_setValue('se'+dragb, '01');
GM_setValue('newE'+dragb, '');
GM_setValue('newEUS'+dragb, '');

  document.getElementById('dragb'+dragb+'').style.backgroundImage = 'url('+draglibtn+')';
  document.getElementById(''+tx+ '').style.backgroundImage = 'url('+ bckimg +')';
  var txt = document.getElementById(tx);
  txt.innerHTML = "<td width='90%' id='" +tx+ "' style='cursor:pointer;border:0px;background-image:url(" + bckimg + ");background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><a href=''><b>" + serName3 + "</b></a></span></td>";

  edit();

if(bup=='j'){
  location.reload();
}

}


// settingz, erste auswahl (visibility)
function set1b(vis){
GM_setValue('set1', vis);
GM_addStyle("#serien_box { visibility:"+vis+";}");
if(vis=='visible'){
GM_setValue('set1j', '#d0e7f1');
GM_setValue('set1n', '#f9f9f9');
GM_addStyle(".set1j { background-color:#d0e7f1;}");
GM_addStyle(".set1n { background-color:#f9f9f9;}");
}else{
GM_setValue('set1n', '#d0e7f1');
GM_setValue('set1j', '#f9f9f9');
GM_addStyle(".set1j { background-color:#f9f9f9;}");
GM_addStyle(".set1n { background-color:#d0e7f1;}");
}
}

// settingz, zweite auswahl (position)
function set2b(fi){
GM_setValue('fix', fi);
GM_addStyle("#serien_box {  position:"+fi+" !important;}");
if(fi=='fixed'){
GM_setValue('set2j', '#d0e7f1');
GM_setValue('set2n', '#f9f9f9');
GM_addStyle(".set2j { background-color:#d0e7f1;}");
GM_addStyle(".set2n { background-color:#f9f9f9;}");
}else{
GM_setValue('set2n', '#d0e7f1');
GM_setValue('set2j', '#f9f9f9');
GM_addStyle(".set2j { background-color:#f9f9f9;}");
GM_addStyle(".set2n { background-color:#d0e7f1;}");
}
}

// settingz, dritte auswahl (cover)
function set3b(anz){
GM_setValue('cover', anz);
if(anz=='j'){
GM_setValue('set3j', '#d0e7f1');
GM_setValue('set3n', '#f9f9f9');
GM_addStyle(".set3j { background-color:#d0e7f1;}");
GM_addStyle(".set3n { background-color:#f9f9f9;}");

document.getElementById('txt1').style.backgroundImage = 'url('+aI+')';
document.getElementById('txt2').style.backgroundImage = 'url('+bI+')';
document.getElementById('txt3').style.backgroundImage = 'url('+cI+')';
document.getElementById('txt4').style.backgroundImage = 'url('+dI+')';
document.getElementById('txt5').style.backgroundImage = 'url('+eI+')';
document.getElementById('txt6').style.backgroundImage = 'url('+fI+')';
document.getElementById('txt7').style.backgroundImage = 'url('+gI+')';
document.getElementById('txt8').style.backgroundImage = 'url('+hI+')';
document.getElementById('txt9').style.backgroundImage = 'url('+iI+')';
document.getElementById('txt10').style.backgroundImage = 'url('+jI+')';
document.getElementById('txt11').style.backgroundImage = 'url('+kI+')';
document.getElementById('txt12').style.backgroundImage = 'url('+lI+')';
document.getElementById('txt13').style.backgroundImage = 'url('+mI+')';
document.getElementById('txt14').style.backgroundImage = 'url('+nI+')';
document.getElementById('txt15').style.backgroundImage = 'url('+oI+')';

}else{
GM_setValue('set3n', '#d0e7f1');
GM_setValue('set3j', '#f9f9f9');
GM_addStyle(".set3n { background-color:#d0e7f1;}");
GM_addStyle(".set3j { background-color:#f9f9f9;}");
for (var i=1; i<16; i++) {
  var txt = document.getElementById('txt'+[i]);
  txt.style.backgroundImage = 'none';
}
}
}

// settings, vierte auswahl (buendig)
function set4b(snz){
GM_setValue('bund', snz);
GM_addStyle("#serien_box { text-align:"+snz+" !important;}");
if(snz=='left'){
GM_setValue('set4j', '#d0e7f1');
GM_setValue('set4n', '#f9f9f9');
GM_setValue('set4x', '#f9f9f9');
GM_addStyle(".set4j { background-color:#d0e7f1;}");
GM_addStyle(".set4n { background-color:#f9f9f9;}");
GM_addStyle(".set4x { background-color:#f9f9f9;}");
}
if(snz=='center'){
GM_setValue('set4j', '#f9f9f9');
GM_setValue('set4n', '#d0e7f1');
GM_setValue('set4x', '#f9f9f9');
GM_addStyle(".set4j { background-color:#f9f9f9;}");
GM_addStyle(".set4n { background-color:#d0e7f1;}");
GM_addStyle(".set4x { background-color:#f9f9f9;}");
}
if(snz=='right'){
GM_setValue('set4j', '#f9f9f9');
GM_setValue('set4n', '#f9f9f9');
GM_setValue('set4x', '#d0e7f1');
GM_addStyle(".set4j { background-color:#f9f9f9;}");
GM_addStyle(".set4n { background-color:#f9f9f9;}");
GM_addStyle(".set4x { background-color:#d0e7f1;}");
}
}

// settingz, fuenfte auswahl (updates)
function set5b(upd){
GM_setValue('update', upd);
if(upd=='j'){
GM_setValue('set5j', '#d0e7f1');
GM_setValue('set5n', '#f9f9f9');
GM_addStyle(".set5j { background-color:#d0e7f1;}");
GM_addStyle(".set5n { background-color:#f9f9f9;}");
}else{
GM_setValue('set5n', '#d0e7f1');
GM_setValue('set5j', '#f9f9f9');
GM_addStyle(".set5n { background-color:#d0e7f1;}");
GM_addStyle(".set5j { background-color:#f9f9f9;}");
}
}

// settingz, sechste auswahl (staffel anzeigen)
function set6b(usd){
GM_setValue('staff', usd);
if(usd=='j'){
GM_setValue('set6j', '#d0e7f1');
GM_setValue('set6n', '#f9f9f9');
GM_addStyle(".set6j { background-color:#d0e7f1;}");
GM_addStyle(".set6n { background-color:#f9f9f9;}");
}else{
GM_setValue('set6n', '#d0e7f1');
GM_setValue('set6j', '#f9f9f9');
GM_addStyle(".set6n { background-color:#d0e7f1;}");
GM_addStyle(".set6j { background-color:#f9f9f9;}");
}
}

// settingz, siebte auswahl (sortieren)
function set7b(usd){
GM_setValue('sort', usd);
if(usd=='j'){
GM_setValue('set7j', '#d0e7f1');
GM_setValue('set7n', '#f9f9f9');
GM_addStyle(".set7j { background-color:#d0e7f1;}");
GM_addStyle(".set7n { background-color:#f9f9f9;}");
}else{
GM_setValue('set7n', '#d0e7f1');
GM_setValue('set7j', '#f9f9f9');
GM_addStyle(".set7n { background-color:#d0e7f1;}");
GM_addStyle(".set7j { background-color:#f9f9f9;}");
}
}


// neue folgen anzeigen
function set8b(usd){
GM_setValue('bup', usd);
if(usd=='j'){
GM_setValue('set8j', '#d0e7f1');
GM_setValue('set8n', '#f9f9f9');
GM_addStyle(".set8j { background-color:#d0e7f1;}");
GM_addStyle(".set8n { background-color:#f9f9f9;}");
}else{
GM_setValue('set8n', '#d0e7f1');
GM_setValue('set8j', '#f9f9f9');
GM_addStyle(".set8n { background-color:#d0e7f1;}");
GM_addStyle(".set8j { background-color:#f9f9f9;}");
}
}


// serien banner groessee
function set9b(){
widthb = document.getElementById('set9j').value;
heighth = document.getElementById('set9n').value;
GM_setValue('widthb', widthb);
GM_setValue('heighth', heighth);

GM_addStyle("ul.boxy li { width:"+widthb+"px;}ul.boxy li {height:"+heighth+"px;");

  if (sortle=='j'){

for (var g = 1; g <= 15; g++) {
GM_addStyle("ul #dragb"+g+" {cursor:move;} ul.boxy li { list-style-type: none;margin:0px; width:"+widthb+"px; height:"+heighth+"px; min-width:190px; }#phoneticlong {margin-bottom: 0em;}#phoneticlong li, #buttons li {margin-bottom: 0px;margin-top: "+marg+"px;}#boxes {font-family: Arial, sans-serif;list-style-type: none;margin: 0px;padding: 0px;width: 220px;}#boxes li {cursor: move;position: relative;float: left;margin: 2px 2px 0px 0px;width: 3px;height: 30px;border: 1px solid #000;text-align: center;padding-top: 5px;background-color: #eeeeff;}");
}
}
}

// schrift groessee
function set10b(){
fontsz = document.getElementById('set10j').value;

GM_setValue('fontsz', fontsz);

GM_addStyle("ul.boxy li { list-style-type: none;padding:0px;margin:0px; width:"+widthb+"px; min-width:190px; font-size: "+fontsz+"px;font-family: Arial, sans-serif;}ul.boxy li {margin: "+ps+" 0px 0px -16px;padding-top:2px; height:"+heighth+"px; border: 0px solid #ccc; background-color: transparent; }.clickable a {display: block;text-decoration: none;cursor: pointer;cursor: hand;}.clickable li:hover {background-color: #f6f6f6;}");

  if (sortle=='j'){

for (var g = 1; g <= 15; g++) {
GM_addStyle("ul #dragb"+g+" {cursor:move;} ul.boxy li { list-style-type: none;margin:0px; width:"+widthb+"px; height:"+heighth+"px; min-width:190px; }#phoneticlong {margin-bottom: 0em;}#phoneticlong li, #buttons li {margin-bottom: 0px;margin-top: "+marg+"px;}#boxes {font-family: Arial, sans-serif;list-style-type: none;margin: 0px;padding: 0px;width: 220px;}#boxes li {cursor: move;position: relative;float: left;margin: 2px 2px 0px 0px;width: 3px;height: 30px;border: 1px solid #000;text-align: center;padding-top: 5px;background-color: #eeeeff;}");
}
}
}



// Vorhandene Cover ausblenden, falls gewuenscht
  if (cover=='n'){
   aI = '&nbsp;';
   bI = '&nbsp;';
   cI = '&nbsp;';
   dI = '&nbsp;';
   eI = '&nbsp;';
   fI = '&nbsp;';
   gI = '&nbsp;';
   hI = '&nbsp;';
   iI = '&nbsp;';
   jI = '&nbsp;';
   kI = '&nbsp;';
   lI = '&nbsp;';
   mI = '&nbsp;';
   nI = '&nbsp;';
   oI = '&nbsp;';
  }


                                // neue folgen anzeige, in fenster bleiben und nicht mit schrift ueberlappen
                                if (staff=='j'){
                                 showN = '-32px;'
                                 }else{
                                 showN = '-15px;'
                                 };
                                
                                if (bund=='right'){
                                 showNb = '0px;';
                                 side   = 'right';
                                }else{
                                 showNb = widthb*1-70;
                                 showNb = showNb+'px;';
                                 side   = 'left';
                                }

                            if (sortle=='n'){
                              padd = '38';
                            }else{
                              padd = '53';
                            }







                                // serien tabelle
                            var table = '';
                                table += "<table width='90%' style='margin-bottom:-12px; padding: 0px  0px 0px "+ padd +"px;'><tr><td align='left' width='1%' style='padding-left:3px;border-radius: 5px 0 0 0; background-color:#d0e7f1;color:#436472;-moz-user-select:none;cursor:move;opacity:0.80;box-shadow: 0px 0px 5px #000;'><input type='button' id='editbttn' class='edit' style='cursor:pointer;'></td><td width='23%' align='center' style='box-shadow: 0px 0px 5px #000; background-color:#fff;opacity:0.75;-moz-user-select:none;cursor:move;'><div id='dragle' style='color:#72625b; '><b>SJ <span style='color:#76201f;'>Save</span></b> </div></td><td align='left' width='1%' style='border-radius: 0 5px 0 0; background-color:#d0e7f1;-moz-user-select:none;cursor:move;opacity:0.80;box-shadow: 0px 0px 4px #000; padding-left:3px; '><input type='button' id='infobttn' class='info' style='cursor:pointer;'></td></td> </tr></table>";
                                table += "<ul id=\"phoneticlong\" class=\"boxy\" width='100%' border:0px solid #CCCCCC;'> ";
                                table += "<li itemID=\"a\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='1' itemID=\"a\" value='+'></td> <td width='90%' id='txt1' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + aI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+aL+">" + aN + "</a></b></span>  <div id='s1' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>   <div id='s1' style=\"font-size:11px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb1' width='4%' ";if (aL){table += "style='background-image:url("+ aD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='1x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"b\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='2' itemID=\"b\" value='+'></td> <td width='90%' id='txt2' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + bI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+bL+">" + bN + "</a></b></span>  <div id='s2' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s2' style=\"font-size:11px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb2' width='4%' ";if (bL){table += "style='background-image:url("+ bD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='2x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"c\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='3' itemID=\"c\" value='+'></td> <td width='90%' id='txt3' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + cI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+cL+">" + cN + "</a></b></span>  <div id='s3' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s3' style=\"font-size:11px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb3' width='4%' ";if (cL){table += "style='background-image:url("+ cD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='3x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"d\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='4' itemID=\"d\" value='+'></td> <td width='90%' id='txt4' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + dI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+dL+">" + dN + "</a></b></span>  <div id='s4' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s4' style=\"font-size:11px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb4' width='4%' ";if (dL){table += "style='background-image:url("+ dD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='4x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"e\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='5' itemID=\"e\" value='+'></td> <td width='90%' id='txt5' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + eI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+eL+">" + eN + "</a></b></span>  <div id='s5' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s5' style=\"font-size:11px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb5' width='4%' ";if (eL){table += "style='background-image:url("+ eD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='5x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"f\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='6' itemID=\"f\" value='+'></td> <td width='90%' id='txt6' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + fI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+fL+">" + fN + "</a></b></span>  <div id='s6' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s6' style=\"font-size:10px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb6' width='4%' ";if (fL){table += "style='background-image:url("+ fD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='6x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"g\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='7' itemID=\"g\" value='+'></td> <td width='90%' id='txt7' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + gI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+gL+">" + gN + "</a></b></span>  <div id='s7' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s7' style=\"font-size:10px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb7' width='4%' ";if (gL){table += "style='background-image:url("+ gD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='7x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"h\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='8' itemID=\"h\" value='+'></td> <td width='90%' id='txt8' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + hI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+hL+">" + hN + "</a></b></span>  <div id='s8' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s8' style=\"font-size:10px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb8' width='4%' ";if (hL){table += "style='background-image:url("+ hD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='8x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"i\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='9' itemID=\"i\" value='+'></td> <td width='90%' id='txt9' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + iI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+iL+">" + iN + "</a></b></span>  <div id='s9' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s9' style=\"font-size:10px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb9' width='4%' ";if (iL){table += "style='background-image:url("+ iD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='9x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"j\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='10' itemID=\"j\" value='+'></td> <td width='90%' id='txt10' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + jI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+jL+">" + jN + "</a></b></span>  <div id='s10' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s10' style=\"font-size:10px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb10' width='4%' ";if (jL){table += "style='background-image:url("+ jD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='10x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"k\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='11' itemID=\"k\" value='+'></td> <td width='90%' id='txt11' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + kI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+kL+">" + kN + "</a></b></span>  <div id='s11' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s11' style=\"font-size:10px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb11' width='4%' ";if (kL){table += "style='background-image:url("+ kD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='11x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"l\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='12' itemID=\"l\" value='+'></td> <td width='90%' id='txt12' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + lI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+lL+">" + lN + "</a></b></span>  <div id='s12' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s12' style=\"font-size:10px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb12' width='4%' ";if (lL){table += "style='background-image:url("+ lD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='12x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"m\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='13' itemID=\"m\" value='+'></td> <td width='90%' id='txt13' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + mI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+mL+">" + mN + "</a></b></span>  <div id='s13' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s13' style=\"font-size:10px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb13' width='4%' ";if (mL){table += "style='background-image:url("+ mD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='13x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"n\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='14' itemID=\"n\" value='+'></td> <td width='90%' id='txt14' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + nI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+nL+">" + nN + "</a></b></span>  <div id='s14' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s14' style=\"font-size:10px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb14' width='4%' ";if (nL){table += "style='background-image:url("+ nD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='14x' value='-'></td></tr></table></li> ";
                                table += "<li itemID=\"o\"'><table width='100%'><tr><td width='5%'><input type='button' class='ok' id='15' itemID=\"o\" value='+'></td> <td width='90%' id='txt15' style='cursor:pointer;border:0pt solid #F0EFEF;background-image:url(" + oI + ");background-color:transparent;background-repeat:no-repeat;background-size:100%;-moz-user-select:none;'><span style='padding-"+side+":3px;'><b><a href="+oL+">" + oN + "</a></b></span>  <div id='s15' style='height:17px; width:16px; position: relative; top:"+ showN +" left: "+ showNb +" line-height:10px; color:white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;text-align:center; padding:4px 3px 2px 2px;>  <div id='s15' style=\"font-size:10px; color: white;background-color: transparent;\"></div> </div>  </td><td id='dragb15' width='4%' ";if (oL){table += "style='background-image:url("+ oD +");'"};table += "></td><td width='5%'><input type='button' class='del' id='15x' value='-'></td></tr></table></li> ";
			 	table += "</ul>";
				div1 = document.createElement('div');
				div1.id = 'serien_box';
				div1.style.display = "block";
				div1.innerHTML = table;

                                // show&hide button
                            var bttn = '';
                                bttn += "<table><tr><td><input type='button' class='show' id='bttn'></td><tr></table>";
				divX = document.createElement('div');
				divX.id = 'bttn_show';
				divX.style.display = "block";
				divX.innerHTML = bttn;

                                // settingz button
                            var setbttn = '';
                                setbttn += "<table><tr><td><input type='button' class='bttn_set' id='setbttn'></td><tr></table>";
				divseb = document.createElement('div');
				divseb.id = 'bttn_set';
				divseb.style.display = "block";
				divseb.innerHTML = setbttn;


                                // settingz fenster
                            var sets = '';
                                sets += "<table id='settingztbl' width='100%' height='100%' style='cellspacing='0px' cellpadding='0px'> ";
                                sets += "<tr> <td align='right' colspan='2' height='20px' style='border-radius: 5px 5px 0px 0px;background-color:#d0e7f1;color:#436472;padding-right:5px;'><b><span style='padding-right:100px'>settings</span></b><a href='' id='ger'>ger </a>| <a href='' id='eng'>eng </a>| <a href='' id='fr'>fr </a></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp; "+settx1+" </td> <td><input type='button' class='set1j' align='center' id='set1j' value='"+settxy+"'> <input type='button' class='set1n' id='set1n' value='"+settxn+"'></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp; "+settx2+" </td> <td><input type='button' class='set2j' id='set2j' value='"+settxy+"'> <input type='button' class='set2n' id='set2n' value='"+settxn+"'></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp; "+settx4+" </td> <td><input type='button' class='set4j' id='set4j' value='"+settx41+"'><input type='button' class='set4n' id='set4n' value='"+settx42+"'><input type='button' class='set4x' id='set4x' value='"+settx43+"'></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp; "+settx5+" </td> <td><input type='button' class='set5j' id='set5j' value='"+settxy+"'> <input type='button' class='set5n' id='set5n' value='"+settxn+"'></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp; "+settx6+" <span style='color:red'>*</span></td> <td><input type='button' class='set6j' id='set6j' value='"+settxy+"'> <input type='button' class='set6n' id='set6n' value='"+settxn+"'></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp; "+settx7+" <span style='color:red'>*</span></td> <td><input type='button' class='set7j' id='set7j' value='"+settxy+"'> <input type='button' class='set7n' id='set7n' value='"+settxn+"'></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp; "+settx8+" <span style='color:red'>*</span></td> <td><input type='button' class='set8j' id='set8j' value='"+settxy+"'> <input type='button' class='set8n' id='set8n' value='"+settxn+"'></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp; "+settx3+" </td> <td><input type='button' class='set3j' id='set3j' value='"+settxy+"'> <input type='button' class='set3n' id='set3n' value='"+settxn+"'></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp; "+settx9+"</td> <td align='right' style='padding-right:5px;'><input id='set9j' type='text' size='2' maxlength='3' value='"+widthb+"'>px <input id='set9n' type='text' size='1' maxlength='2' value='"+heighth+"'>px <input type='button' class='set9' id='set9' value=' set '></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp; "+settx10+"</td> <td align='right' style='padding-right:5px;'><input id='set10j' type='text' size='1' maxlength='2' value='"+fontsz+"'>px <input type='button' class='set10' id='set10' value=' set '></td> </tr>";
                                sets += "<tr> <td align='left'>&nbsp;</td> <td></td> </tr>";
                                sets += "<tr> <td align='center' colspan='2'>&nbsp; <span style='color:red'>*</span> "+settx11+"</td> <td></td> </tr>";
                                sets += "<tr> <td align='center' colspan='2'>&nbsp;<a href='javascript: location.reload()'>"+settx12+"</a></td> <td></td> </tr>";
                                sets += "<tr> <td align='center' colspan='2' style='border-radius: 0px 0px 5px 5px;background-color:#e8f3f8;'>&nbsp;<a href='http://userscripts.org/scripts/show/39627'>"+settx13+"</a></td> <td></td> </tr>";
                                sets += "<tr> <td align='center' colspan='2' style='border-radius: 0px 0px 5px 5px;background-color:#e8f3f8;'>&nbsp;"+settx14+"</a></td> <td></td> </tr>";
                              	sets += "</table>";
				divse = document.createElement('div');
				divse.id = 'settingz';
				divse.style.display = "block";
				divse.innerHTML = sets;


//#### Info Window >>> ###



aN = GM_getValue('aF', '');
bN = GM_getValue('bF', '');
cN = GM_getValue('cF', '');
dN = GM_getValue('dF', '');
eN = GM_getValue('eF', '');
fN = GM_getValue('fF', '');
gN = GM_getValue('gF', '');
hN = GM_getValue('hF', '');
iN = GM_getValue('iF', '');
jN = GM_getValue('jF', '');
kN = GM_getValue('kF', '');
lN = GM_getValue('lF', '');
mN = GM_getValue('mF', '');
nN = GM_getValue('nF', '');
oN = GM_getValue('oF', '');


//fernsehserien.de
var aNi = aN.replace(/ /g, "+");
var bNi = bN.replace(/ /g, "+");
var cNi = cN.replace(/ /g, "+");
var dNi = dN.replace(/ /g, "+");
var eNi = eN.replace(/ /g, "+");
var fNi = fN.replace(/ /g, "+");
var gNi = gN.replace(/ /g, "+");
var hNi = hN.replace(/ /g, "+");
var iNi = iN.replace(/ /g, "+");
var jNi = jN.replace(/ /g, "+");
var kNi = kN.replace(/ /g, "+");
var lNi = lN.replace(/ /g, "+");
var mNi = mN.replace(/ /g, "+");
var nNi = nN.replace(/ /g, "+");
var oNi = oN.replace(/ /g, "+");


fs = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAACXBIWXMAAG66AABuugHW3rEXAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAHcSURBVHjajJK7a1NxHEfP53d/Nze5TWNT07Spg5VWhZZisZuugrg66OTiH+LQreAsCk4idCjOojg4iFrUwQcoKFj6oMFXbFPy8Jd7vw4qOnrGwxmP7Ms01uJ/UNXb4JPUJhGy39bAIIMBGPa3Dl6KQ0ebL9RpSRk5+IR0hOGaVRtoyAQM4AcQe1LuX9P1JeZnGDlAllGqogIhqFyl0tDENFNzOnzcohS/88rdu4XDgmnnM0dP6PJy7oqEPfa3tfWad49ZW7F+pEtXIr/xluYWSYFOz3ptjTYoViFYHpwPLJ6zxdOwy4M7vHxoLvTwHjPa+7R7JCUjNwZ8bdrVJZ7eVZbBEPOnSGNcHszJcqPTpZ+ROGiLvpKi6kd4ssabDw6UFC0u4ARmCAnJkbdhA9bpf2R3nZlJTTmjacREHh8XlOWSTFIOne+wZ9ZVii5cZLZhFI1DdLeVBVx9nLTMIEMwlGinCZkE1XI+O5V3nTW7PH+k1RsqpZK9r60sf7t9kwgiRxSxMEexZAYhk0GpzME6xxY4eWbU07Wz56lU2Fyn1TInvGe0Rm1C45OMTTDWsPIIxGCm/FlFtIHQJ89wEd6jGBxgmMjAMAM37KFug1gijiH+M1DAfu31L676cwBOZchFI+Zs4wAAAABJRU5ErkJggg==";
wl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAACXBIWXMAAG66AABuugHW3rEXAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAISSURBVHjajJI9TxRhFIXPfT9mdob9YNkFJUaMLMVKITVWkBALY6Ux/gj/iYWNhZXGwmhlQmJigYWBxOAaNBowaBY2KF+rssuwy7AzOzPvtRhMtPOU5zy5uTk59G6jHxvGf0gJUlHCxkAIkkRERP8SzGwAw2wMM7OSgsKEfxz1Wt2gG/QTY/qxYQKIXFvnBuxBSw5ZOu9oAKp5HC40mjMThRzHu8cnL78caClTmgAQbFBGidtTFybPFNRW2291/FuXJwAsbh7Or7ekEExEAhkpwNwL4k4Qvao3L43kFQTPVMvpl8OuvjFZzigC4zBM3m53iOhqtVTO6j0v9PsxHi//5L8URMmvTsjMfhjPPfhw/eGn1H9dbz+reaLRPrn/Zie9vdb07zz/+uT9PgDXkhMlZ+5iPo2eruxExgjPj5brrdTa84LFemtp0+tFBsD0ePHa1CiA1bX1lW8e2AjbkhlHn9ZLZGm1exSu7nUBzFYKY0UbwIvaZ+26kkjkLAVjUrhScqbPDURRvLTRBnB+MGMTmPljWyrmnK1FybXbJ9EpXXbu3azmHb28dWT+zKHTi3apnNdkSaHGh7JDjnt3oXFlvFDM2ttekADfvfDRyv5Y2WWizWZHEM9WRrQUVKv3Cdw48LuJsbQKE6MFERAmxhhmhgSPZvVw1jXMShCEoOrZHAEJMzOBkG6LAQEASIDEsBbi9wAEZw0OOMKg/AAAAABJRU5ErkJggg==";
sj = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJQSURBVHjaRFJNSFRRGP2+7943771xmPccZ3Qq0LDQhDKiohYRrSI3ESEiBNFCEiJoVbSIykLQNgotok1FP5vaRBQtkhZtXCSSWVgY9mOaMjON897Mm3d9c+9t0VAHDhzOz+7g8TPD5apAJMaIiAARkRCRiBARQCMiAgJiIm7xxZ/LQSiI2L8GEiESIACg1kDEAECDjtsmF4FfKvnrIlIatEZAIAJCVAAKAQGJDEbMtEztJHghn9NSHdzTvSGbcRzXtA0nEddaBUHoB4EQqlAorubyUzMfIXR41m0Yv3EZEql43K5E0vfCWk0jaoMTELpJ2+bM97zvn+auDI3Syb6eicnZlbxnaJlk0Jqyd7U3/g6qE9PfRBA2mSwZIwY4/X7u0L5Ovh76E8+eDJw4NnT7xdcfRavB3tbmSm28mV1+O7Oole7a7Jzr3f/00Z32tiYula6svBu7frH3aL+/s4URWE766rVbH6YmY0BRJL2O1l+7G0VufokJbhpGzIx9mf/8erA/8AOvHF0aHr4weGThcOfD8bGlxYUWRKWkjCIRVni1Ut57oMd10wNnz/ulEhBLN2Vujox07dg+evdBPrfqOs7j+/eqQrqWid0dW/pOnX718nk+X2SqVotEsVD0S2sAkEpnLDMWiHCtWEhkmjdlXNyaTZXLa6nsxkDUlEappFIKEQFASYmERMwwONNR0uLcsrgI0MstEzEkNLAOAABA0AAStNRKA1gpLqUkzqD+HAQADaABEBDqVp0SgTdns17J/utrqCfwX/xdIQA6jvNnALRuAh6l7fzSAAAAAElFTkSuQmCC";
wi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAACXBIWXMAAG66AABuugHW3rEXAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGiSURBVHjalJI/LANxFMd/1/tJfx0MeinaYnM66NTEgtpEFbOEVCKxCQ1SMYhE1SQNQZpSrCQMYmAkLSY2xeBP77TWLm3uWr2v4YSSSPhO77183hu+78sBIH+WgfxHVFVVTdNMJpOiKKVSied5xlg+nyeEMMYKhaI+rKigqlrgfb6hYDAUCi2mUrLFIqysrM7PLzDGAIyOjl9dXdvt1lhsOxxeFsVGAiCdzpjN1ZFIFMDDw2NVleX4+ATA8PCILMsAtrZ2NjZiAAgAALOzcy5XS7FYBDA1Ne319u3vH+zu7gFQFCUQmMnlcl/0y0taEGr0k5Ik22wNg4M+ffn09Cwa3dSxD0/sdpvH07W2FiGE1NfXtbW1ZjKvlFJCSDye6O3t+emg3z+WSJzf3d1ns1lBMN/cJC8uLp+eno1Go9VaqzNc+Xc6Oz1OZ7Moih0d7vX1iCRJXm+3293ucDR9ECjT4eERpcalpTCAZPKWscrJyUA58I1WVbW/f0CSJL31+yfi8UQ5wP3IydtbiVJerzVNMxi+RYP7V6roZ/W5xnHcb/T7ALIkFHuCpYosAAAAAElFTkSuQmCC";

                   // DE date
                   nE1 = GM_getValue('newE1', '');
                   nE2 = GM_getValue('newE2', '');
                   nE3 = GM_getValue('newE3', '');
                   nE4 = GM_getValue('newE4', '');
                   nE5 = GM_getValue('newE5', '');
                   nE6 = GM_getValue('newE6', '');
                   nE7 = GM_getValue('newE7', '');
                   nE8 = GM_getValue('newE8', '');
                   nE9 = GM_getValue('newE9', '');
                   nE10 = GM_getValue('newE10', '');
                   nE11 = GM_getValue('newE11', '');
                   nE12 = GM_getValue('newE12', '');
                   nE13 = GM_getValue('newE13', '');
                   nE14 = GM_getValue('newE14', '');
                   nE15 = GM_getValue('newE15', '');

                   // DE date
                   nEUS1 = GM_getValue('newEUS1', '');
                   nEUS2 = GM_getValue('newEUS2', '');
                   nEUS3 = GM_getValue('newEUS3', '');
                   nEUS4 = GM_getValue('newEUS4', '');
                   nEUS5 = GM_getValue('newEUS5', '');
                   nEUS6 = GM_getValue('newEUS6', '');
                   nEUS7 = GM_getValue('newEUS7', '');
                   nEUS8 = GM_getValue('newEUS8', '');
                   nEUS9 = GM_getValue('newEUS9', '');
                   nEUS10 = GM_getValue('newEUS10', '');
                   nEUS11 = GM_getValue('newEUS11', '');
                   nEUS12 = GM_getValue('newEUS12', '');
                   nEUS13 = GM_getValue('newEUS13', '');
                   nEUS14 = GM_getValue('newEUS14', '');
                   nEUS15 = GM_getValue('newEUS15', '');

function infa1(){
  document.getElementById('inffrma2').innerHTML = "<form action''><input type='text' id='infa2' value=\"" + aN + "\"><input class='infchngbtn' type='button' id='infab2' value=''></form>";
  document.getElementById('infab2').addEventListener('click', function(event) {infa2(document.getElementById('infa2').value)},false);
}
function infa2(aN){
  GM_setValue('aF', aN.toLowerCase());
  document.getElementById('inffrma2').innerHTML = "<form action''><input type='button' class='infchng' id='infab1' value=\"" + aN + "\"></form>";
}


function infb1(){
  document.getElementById('inffrmb2').innerHTML = "<form action''><input type='text' id='infb2' value=\"" + bN + "\"><input class='infchngbtn' type='button' id='infbb2' value=''></form>";
  document.getElementById('infbb2').addEventListener('click', function(event) {infb2(document.getElementById('infb2').value)},false);
}
function infb2(bN){
  GM_setValue('bF', bN.toLowerCase());
  document.getElementById('inffrmb2').innerHTML = "<form action''><input type='button' class='infchng' id='infbb1' value=\"" + bN + "\"></form>";
}


function infc1(){
  document.getElementById('inffrmc2').innerHTML = "<form action''><input type='text' id='infc2' value=\"" + cN + "\"><input class='infchngbtn' type='button' id='infcb2' value=''></form>";
  document.getElementById('infcb2').addEventListener('click', function(event) {infc2(document.getElementById('infc2').value)},false);
}
function infc2(cN){
  GM_setValue('cF', cN.toLowerCase());
  document.getElementById('inffrmc2').innerHTML = "<form action''><input type='button' class='infchng' id='infcb1' value=\"" + cN + "\"></form>";
}


function infd1(){
  document.getElementById('inffrmd2').innerHTML = "<form action''><input type='text' id='infd2' value=\"" + dN + "\"><input class='infchngbtn' type='button' id='infdb2' value=''></form>";
  document.getElementById('infdb2').addEventListener('click', function(event) {infd2(document.getElementById('infd2').value)},false);
}
function infd2(dN){
  GM_setValue('dF', dN.toLowerCase());
  document.getElementById('inffrmd2').innerHTML = "<form action''><input type='button' class='infchng' id='infdb1' value=\"" + dN + "\"></form>";
}



function infe1(){
  document.getElementById('inffrme2').innerHTML = "<form action''><input type='text' id='infe2' value=\"" + eN + "\"><input class='infchngbtn' type='button' id='infeb2' value=''></form>";
  document.getElementById('infeb2').addEventListener('click', function(event) {infe2(document.getElementById('infe2').value)},false);
}
function infe2(eN){
  GM_setValue('eF', eN.toLowerCase());
  document.getElementById('inffrme2').innerHTML = "<form action''><input type='button' class='infchng' id='infeb1' value=\"" + eN + "\"></form>";
}



function inff1(){
  document.getElementById('inffrmf2').innerHTML = "<form action''><input type='text' id='inff2' value=\"" + fN + "\"><input class='infchngbtn' type='button' id='inffb2' value=''></form>";
  document.getElementById('inffb2').addEventListener('click', function(event) {inff2(document.getElementById('inff2').value)},false);
}
function inff2(fN){
  GM_setValue('fF', fN.toLowerCase());
  document.getElementById('inffrmf2').innerHTML = "<form action''><input type='button' class='infchng' id='inffb1' value=\"" + fN + "\"></form>";
}



function infg1(){
  document.getElementById('inffrmg2').innerHTML = "<form action''><input type='text' id='infg2' value=\"" + gN + "\"><input class='infchngbtn' type='button' id='infgb2' value=''></form>";
  document.getElementById('infgb2').addEventListener('click', function(event) {infg2(document.getElementById('infg2').value)},false);
}
function infg2(gN){
  GM_setValue('gF', gN.toLowerCase());
  document.getElementById('inffrmg2').innerHTML = "<form action''><input type='button' class='infchng' id='infgb1' value=\"" + gN + "\"></form>";
}



function infh1(){
  document.getElementById('inffrmh2').innerHTML = "<form action''><input type='text' id='infh2' value=\"" + hN + "\"><input class='infchngbtn' type='button' id='infhb2' value=''></form>";
  document.getElementById('infhb2').addEventListener('click', function(event) {infh2(document.getElementById('infh2').value)},false);
}
function infh2(hN){
  GM_setValue('hF', hN.toLowerCase());
  document.getElementById('inffrmh2').innerHTML = "<form action''><input type='button' class='infchng' id='infhb1' value=\"" + hN + "\"></form>";
}



function infi1(){
  document.getElementById('inffrmi2').innerHTML = "<form action''><input type='text' id='infi2' value=\"" + iN + "\"><input class='infchngbtn' type='button' id='infib2' value=''></form>";
  document.getElementById('infib2').addEventListener('click', function(event) {infi2(document.getElementById('infi2').value)},false);
}
function infi2(iN){
  GM_setValue('iF', iN.toLowerCase());
  document.getElementById('inffrmi2').innerHTML = "<form action''><input type='button' class='infchng' id='infib1' value=\"" + iN + "\"></form>";
}



function infj1(){
  document.getElementById('inffrmj2').innerHTML = "<form action''><input type='text' id='infj2' value=\"" + jN + "\"><input class='infchngbtn' type='button' id='infjb2' value=''></form>";
  document.getElementById('infjb2').addEventListener('click', function(event) {infj2(document.getElementById('infj2').value)},false);
}
function infj2(jN){
  GM_setValue('jF', jN.toLowerCase());
  document.getElementById('inffrmj2').innerHTML = "<form action''><input type='button' class='infchng' id='infjb1' value=\"" + jN + "\"></form>";
}



function infk1(){
  document.getElementById('inffrmk2').innerHTML = "<form action''><input type='text' id='infk2' value=\"" + kN + "\"><input class='infchngbtn' type='button' id='infkb2' value=''></form>";
  document.getElementById('infkb2').addEventListener('click', function(event) {infk2(document.getElementById('infk2').value)},false);
}
function infk2(kN){
  GM_setValue('kF', kN.toLowerCase());
  document.getElementById('inffrmk2').innerHTML = "<form action''><input type='button' class='infchng' id='infkb1' value=\"" + kN + "\"></form>";
}




function infl1(){
  document.getElementById('inffrm12').innerHTML = "<form action''><input type='text' id='infl2' value=\"" + lN + "\"><input class='infchngbtn' type='button' id='inflb2' value=''></form>";
  document.getElementById('inflb2').addEventListener('click', function(event) {infl2(document.getElementById('infl2').value)},false);
}
function infl2(lN){
  GM_setValue('lF', lN.toLowerCase());
  document.getElementById('inffrm12').innerHTML = "<form action''><input type='button' class='infchng' id='inflb1' value=\"" + lN + "\"></form>";
}




function infm1(){
  document.getElementById('inffrmm2').innerHTML = "<form action''><input type='text' id='infm2' value=\"" + mN + "\"><input class='infchngbtn' type='button' id='infmb2' value=''></form>";
  document.getElementById('infmb2').addEventListener('click', function(event) {infm2(document.getElementById('infm2').value)},false);
}
function infm2(mN){
  GM_setValue('mF', mN.toLowerCase());
  document.getElementById('inffrmm2').innerHTML = "<form action''><input type='button' class='infchng' id='infmb1' value=\"" + mN + "\"></form>";
}




function infn1(){
  document.getElementById('inffrmn2').innerHTML = "<form action''><input type='text' id='infn2' value=\"" + nN + "\"><input class='infchngbtn' type='button' id='infnb2' value=''></form>";
  document.getElementById('infnb2').addEventListener('click', function(event) {infn2(document.getElementById('infn2').value)},false);
}
function infn2(nN){
  GM_setValue('nF', nN.toLowerCase());
  document.getElementById('inffrmn2').innerHTML = "<form action''><input type='button' class='infchng' id='infnb1' value=\"" + nN + "\"></form>";
}




function info1(){
  document.getElementById('inffrmo2').innerHTML = "<form action''><input type='text' id='info2' value=\"" + oN + "\"><input class='infchngbtn' type='button' id='infob2' value=''></form>";
  document.getElementById('infob2').addEventListener('click', function(event) {info2(document.getElementById('info2').value)},false);
}
function info2(oN){
  GM_setValue('oF', oN.toLowerCase());
  document.getElementById('inffrmo2').innerHTML = "<form action''><input type='button' class='infchng' id='infob1' value=\"" + oN + "\"></form>";
}






                            var sets = '';
                                sets += "<table id='infotbl' width='96%' cellspacing='0px' cellpadding='0px' style='margin:0px 5px 0px 5px ;'> ";
                                sets += "<tr> <td align='center' colspan='4' height='20px' style='border-radius: 5px 5px 0px 0px;background-color:#d0e7f1;color:#436472;'><b>info</b></td> </tr>";
                                sets += "<tr><td>DE |</td><td>US</td><td colspan='2'></td>";
                               if(aN){
                                sets += "<tr><td id='td1b1' style='line-height:10px;'>"+nE1+"</td><td id='td1b2' style='line-height:10px;'>"+nEUS1+"</td>";

                                sets += "<td align='left' id='inffrma2' class='inforow'><form action''><input type='button' class='infchng' id='infab1' value=\"" + aN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + aNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + aN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + aNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + aN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(bN){
                                sets += "<tr><td id='td2b1' style='line-height:10px;'>"+nE2+"</td><td id='td2b2' style='line-height:10px;'>"+nEUS2+"</td>";

                                sets += "<td align='left' id='inffrmb2' class='inforow'><form action''><input type='button' class='infchng' id='infbb1' value=\"" + bN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + bNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + bN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + bNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + bN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(cN){
                                sets += "<tr><td id='td3b1' style='line-height:10px;'>"+nE3+"</td><td id='td3b2' style='line-height:10px;'>"+nEUS3+"</td>";

                                sets += "<td align='left' id='inffrmc2' class='inforow'><form action''><input type='button' class='infchng' id='infcb1' value=\"" + cN + "\"></form></td> <td class='inforow'>";
 
                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + cNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + cN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + cNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + cN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(dN){
                                sets += "<tr><td id='td4b1' style='line-height:10px;'>"+nE4+"</td><td id='td4b2' style='line-height:10px;'>"+nEUS4+"</td>";

                                sets += "<td align='left' id='inffrmd2' class='inforow'><form action''><input type='button' class='infchng' id='infdb1' value=\"" + dN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + dNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + dN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + dNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + dN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(eN){
                                sets += "<tr><td id='td5b1' style='line-height:10px;'>"+nE5+"</td><td id='td5b2' style='line-height:10px;'>"+nEUS5+"</td>";

                                sets += "<td align='left' id='inffrme2' class='inforow'><form action''><input type='button' class='infchng' id='infeb1' value=\"" + eN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + eNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + eN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + eNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + eN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(fN){
                                sets += "<tr><td id='td6b1' style='line-height:10px;'>"+nE6+"</td><td id='td6b2' style='line-height:10px;'>"+nEUS6+"</td>";

                                sets += "<td align='left' id='inffrmf2' class='inforow'><form action''><input type='button' class='infchng' id='inffb1' value=\"" + fN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + fNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + fN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + fNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + fN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(gN){
                                sets += "<tr><td id='td7b1' style='line-height:10px;'>"+nE7+"</td><td id='td7b2' style='line-height:10px;'>"+nEUS7+"</td>";

                                sets += "<td align='left' id='inffrmg2' class='inforow'><form action''><input type='button' class='infchng' id='infgb1' value=\"" + gN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + gNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + gN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + gNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + gN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(hN){
                                sets += "<tr><td id='td8b1' style='line-height:10px;'>"+nE8+"</td><td id='td8b2' style='line-height:10px;'>"+nEUS8+"</td>";

                                sets += "<td align='left' id='inffrmh2' class='inforow'><form action''><input type='button' class='infchng' id='infhb1' value=\"" + hN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + hNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + hN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + hNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + hN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(iN){
                                sets += "<tr><td id='td9b1' style='line-height:10px;'>"+nE9+"</td><td id='td9b2' style='line-height:10px;'>"+nEUS9+"</td>";

                                sets += "<td align='left' id='inffrmi2' class='inforow'><form action''><input type='button' class='infchng' id='infib1' value=\"" + iN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + iNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + iN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + iNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + iN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(jN){
                                sets += "<tr><td id='td10b1' style='line-height:10px;'>"+nE10+"</td><td id='td10b2' style='line-height:10px;'>"+nEUS10+"</td>";

                                sets += "<td align='left' id='inffrmj2' class='inforow'><form action''><input type='button' class='infchng' id='infjb1' value=\"" + jN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + jNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + jN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + jNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + jN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(kN){
                                sets += "<tr><td id='td11b1' style='line-height:10px;'>"+nE11+"</td><td id='td11b2' style='line-height:10px;'>"+nEUS11+"</td>";

                                sets += "<td align='left' id='inffrmk2' class='inforow'><form action''><input type='button' class='infchng' id='infkb1' value=\"" + kN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + kNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + kN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + kNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + kN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(lN){
                                sets += "<tr><td id='td12b1' style='line-height:10px;'>"+nE12+"</td><td id='td12b2' style='line-height:10px;'>"+nEUS12+"</td>";
                               
                                sets += "<td align='left' id='inffrm12' class='inforow'><form action''><input type='button' class='infchng' id='inflb1' value=\"" + lN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + lNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + lN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + lNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + lN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(mN){
                                sets += "<tr><td id='td13b1' style='line-height:10px;'>"+nE13+"</td><td id='td13b2' style='line-height:10px;'>"+nEUS13+"</td>";

                                sets += "<td align='left' id='inffrmm2' class='inforow'><form action''><input type='button' class='infchng' id='infmb1' value=\"" + mN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + mNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + mN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + mNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + mN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(nN){
                                sets += "<tr><td id='td14b1' style='line-height:10px;'>"+nE14+"</td><td id='td14b2' style='line-height:10px;'>"+nEUS14+"</td>";

                                sets += "<td align='left' id='inffrmn2' class='inforow'><form action''><input type='button' class='infchng' id='infnb1' value=\"" + nN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + nNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + nN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + nNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + nN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                               if(oN){
                                sets += "<tr><td id='td15b1' style='line-height:10px;'>"+nE15+"</td><td id='td15b2' style='line-height:10px;'>"+nEUS15+"</td>";

                                sets += "<td align='left' id='inffrmo2' class='inforow'><form action''><input type='button' class='infchng' id='infob1' value=\"" + oN + "\"></form></td> <td class='inforow'>";

                                sets += "<a href='http://redirectme.to/http://www.fernsehserien.de/suche/" + oNi + "'> <img src='"+fs+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.wunschliste.de/suche/" + oN + "/titel'> <img src='"+wl+"'></a>";
                                sets += "<a href='http://redirectme.to/http://www.serienjunkies.de/suchen.php?s=" + oNi + "'> <img src='"+sj+"'></a>";
                                sets += "<a href='http://redirectme.to/http://de.wikipedia.org/w/index.php?search=" + oN + "&button=&title=Spezial%3ASuche'> <img src='"+wi+"'></a>";
                                sets += "</td> </tr>";
                               }
                              	sets += "</table>";
				divsi = document.createElement('div');
				divsi.id = 'info';
				divsi.style.display = "block";
				divsi.innerHTML = sets;

                                //fuegt alles in die seite ein
                                document.body.appendChild(divX);
                                document.body.appendChild(div1);
                                document.body.appendChild(divse);
                                document.body.appendChild(divsi);
                                document.body.appendChild(divseb);


//#### <<< Info Window ###



function newSeabg(seasn, numbr){
  document.getElementById('s'+seasn).innerHTML = numbr;
  document.getElementById('s'+seasn).style.color = 'red';
}

if(bup=='j'){
for (var i = 1; i <= 15; i++) {
 function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

lemb = GM_getValue('se'+i, '01');
lemb = lemb.replace(/^0+/, '');

if(lemb!='x'){
document.getElementById('s'+i).innerHTML = lemb;
             }
                              }
          }

(
function babba() {

window.DragObject = function (o_move, o_drag) {

	// private Variabeln
    var obj;            // Dieses Objekt empfaengt den Event
    var move;           // Dieses Objekt wird bewegt
    var start_pos = []; // Die Startposition des Elements
	var restore_pos;
    var zIndex;
    
	// private Funktionen
    var Index = function(z) { move.style.zIndex = z; };

    this.ini = function(o_move, o_drag) {
		if(!o_move) return alert('kein Objekt');
		move = o_move;
		zIndex = move.style.zIndex || 0;

		obj = o_drag && o_drag.nodeType == 1 ? o_drag : o_move;
		obj.style.cursor = 'move';
		
		// Event aktivieren
		var self = this;
		obj.onmousedown = function(e) { dragObject = self; drag_start(e); };
	};
	this.obj = function() { return move;};

    this.ondrop = function() {return true;};
    this.ondrag = function() {return true;};
	this.onstart = function() {return true;};
    
	this.getPos = function() {
		return [move.offsetTop, move.offsetLeft, move.offsetHeight, move.offsetWidth];
	};
    
	this.setPos = function(t, l) {
		if(typeof t != 'undefined' && t != null) move.style.top = t + 'px';
		if(typeof l != 'undefined' && l != null) move.style.left = l + 'px';

	};
	
	this.start = function(e) {
		restore_pos = this.getPos();
		start_pos = this.getPos();
		
		var evt_pos = getEvtPos(e);
		
		start_pos[0] -= evt_pos[0];
		start_pos[1] -= evt_pos[1];
		
		Index(999);
		this.onstart(e);
	};
	
	this.move = function(e) {
		
		var evt_pos = getEvtPos(e);
		var new_top = evt_pos[0] + start_pos[0];
		var new_left = evt_pos[1] + start_pos[1];
		if(this.ondrag(e, new_top, new_left) != false) this.setPos(new_top, new_left); this.setSave(new_top, new_left);
    };
    this.end  = function (e) { 
		Index(zIndex); 
		if(false == this.ondrop(e)) this.setPos( restore_pos[0], restore_pos[1]);
	        
};
    this.setSave = function(new_top, new_left) {
                        GM_setValue('y', new_top+'px');
                        GM_setValue('x', new_left+'px');
	
    };
    if(o_move) this.ini(o_move, o_drag);
	
} // <-- DragObjekt



var dragObject = null;

function drag_start(e) {
	if( !dragObject ) return true;

	dragObject.start(e);
	document.onmouseup   = function (e) {
		document.onmouseup = document.onmousemove = null;
		dragObject.end(e);
		dragObject = null;
		return false;
	};
	document.onmousemove = function(e) {
		if(!dragObject) return end_drag(e);
		dragObject.move( e );
		return false;
	};
	if(e && e.preventDefault) e.preventDefault()
	return false;
}
/*
 * Hilfsfunktion:
 *
 * getEvtPos(e)
 * ermittelt die Position des Events
 * */
function getEvtPos(e)
{
    if(!e) e = window.event;
    var t = e.pageY ? e.pageY : e.clientY + window.document.body.scrollTop;
    var l = e.pageX ? e.pageX : e.clientX + window.document.body.scrollLeft;
    return [t, l];
}  
// Ende und Aufruf der anonymen Funktion

})();

new DragObject( document.getElementById('serien_box'), document.getElementById('dragle')  );



                                // gibt den buttons anweisungen
				// Show Hide button Serienliste
                                document.getElementById('bttn').addEventListener('click', show,false);

                                // set Serien buttons
                                document.getElementById('1').addEventListener('click', function(event) {serieA('aN','aL','txt1','aI','aF','1')},false);
 				document.getElementById('2').addEventListener('click', function(event) {serieA('bN','bL','txt2','bI','bF','2')},false);
				document.getElementById('3').addEventListener('click', function(event) {serieA('cN','cL','txt3','cI','cF','3')},false);
				document.getElementById('4').addEventListener('click', function(event) {serieA('dN','dL','txt4','dI','dF','4')},false);
				document.getElementById('5').addEventListener('click', function(event) {serieA('eN','eL','txt5','eI','eF','5')},false);
				document.getElementById('6').addEventListener('click', function(event) {serieA('fN','fL','txt6','fI','fF','6')},false);
				document.getElementById('7').addEventListener('click', function(event) {serieA('gN','gL','txt7','gI','gF','7')},false);
				document.getElementById('8').addEventListener('click', function(event) {serieA('hN','hL','txt8','hI','hF','8')},false);
				document.getElementById('9').addEventListener('click', function(event) {serieA('iN','iL','txt9','iI','iF','9')},false);
				document.getElementById('10').addEventListener('click', function(event) {serieA('jN','jL','txt10','jI','jF','10')},false);
				document.getElementById('11').addEventListener('click', function(event) {serieA('kN','kL','txt11','kI','kF','11')},false);
				document.getElementById('12').addEventListener('click', function(event) {serieA('lN','lL','txt12','lI','lF','12')},false);
				document.getElementById('13').addEventListener('click', function(event) {serieA('mN','mL','txt13','mI','mF','13')},false);
				document.getElementById('14').addEventListener('click', function(event) {serieA('nN','nL','txt14','nI','nF','14')},false);
				document.getElementById('15').addEventListener('click', function(event) {serieA('oN','oL','txt15','oI','oF','15')},false);

		                // del Serien buttons
			        document.getElementById('1x').addEventListener('click', function(event) {serieB('aN','aL','txt1','aI','aF','1')},false);
				document.getElementById('2x').addEventListener('click', function(event) {serieB('bN','bL','txt2','bI','bF','2')},false);
				document.getElementById('3x').addEventListener('click', function(event) {serieB('cN','cL','txt3','cI','cF','3')},false);
				document.getElementById('4x').addEventListener('click', function(event) {serieB('dN','dL','txt4','dI','dF','4')},false);
				document.getElementById('5x').addEventListener('click', function(event) {serieB('eN','eL','txt5','eI','eF','5')},false);
				document.getElementById('6x').addEventListener('click', function(event) {serieB('fN','fL','txt6','fI','fF','6')},false);
				document.getElementById('7x').addEventListener('click', function(event) {serieB('gN','gL','txt7','gI','gF','7')},false);
				document.getElementById('8x').addEventListener('click', function(event) {serieB('hN','hL','txt8','hI','hF','8')},false);
				document.getElementById('9x').addEventListener('click', function(event) {serieB('iN','iL','txt9','iI','iF','9')},false);
				document.getElementById('10x').addEventListener('click', function(event) {serieB('jN','jL','txt10','jI','jF','10')},false);
				document.getElementById('11x').addEventListener('click', function(event) {serieB('kN','kL','txt11','kI','kF','11')},false);
				document.getElementById('12x').addEventListener('click', function(event) {serieB('lN','lL','txt12','lI','lF','12')},false);
				document.getElementById('13x').addEventListener('click', function(event) {serieB('mN','mL','txt13','mI','mF','13')},false);
				document.getElementById('14x').addEventListener('click', function(event) {serieB('nN','nL','txt14','nI','nF','14')},false);
				document.getElementById('15x').addEventListener('click', function(event) {serieB('oN','oL','txt15','oI','oF','15')},false);

        			// Links
                                document.getElementById('txt1').addEventListener('click', function(event) {clik(''+aL+'')},true);
                                document.getElementById('txt2').addEventListener('click', function(event) {clik(''+bL+'')},true);
                                document.getElementById('txt3').addEventListener('click', function(event) {clik(''+cL+'')},true);
                                document.getElementById('txt4').addEventListener('click', function(event) {clik(''+dL+'')},false);
                                document.getElementById('txt5').addEventListener('click', function(event) {clik(''+eL+'')},false);
                                document.getElementById('txt6').addEventListener('click', function(event) {clik(''+fL+'')},false);
                                document.getElementById('txt7').addEventListener('click', function(event) {clik(''+gL+'')},false);
                                document.getElementById('txt8').addEventListener('click', function(event) {clik(''+hL+'')},false);
                                document.getElementById('txt9').addEventListener('click', function(event) {clik(''+iL+'')},false);
                                document.getElementById('txt10').addEventListener('click', function(event) {clik(''+jL+'')},false);
                                document.getElementById('txt11').addEventListener('click', function(event) {clik(''+kL+'')},false);
                                document.getElementById('txt12').addEventListener('click', function(event) {clik(''+lL+'')},false);
                                document.getElementById('txt13').addEventListener('click', function(event) {clik(''+mL+'')},false);
                                document.getElementById('txt14').addEventListener('click', function(event) {clik(''+nL+'')},false);
                                document.getElementById('txt15').addEventListener('click', function(event) {clik(''+oL+'')},false);

                                // settings show hide button
                                document.getElementById('setbttn').addEventListener('click', setshow,false);

                                // settings buttons
				document.getElementById('set1j').addEventListener('click', function(event) {set1b('visible')},false);
				document.getElementById('set1n').addEventListener('click', function(event) {set1b('hidden')},false);
				document.getElementById('set2j').addEventListener('click', function(event) {set2b('fixed')},false);
				document.getElementById('set2n').addEventListener('click', function(event) {set2b('absolute')},false);
				document.getElementById('set3j').addEventListener('click', function(event) {set3b('j')},false);
				document.getElementById('set3n').addEventListener('click', function(event) {set3b('n')},false);
				document.getElementById('set4j').addEventListener('click', function(event) {set4b('left')},false);
				document.getElementById('set4n').addEventListener('click', function(event) {set4b('center')},false);
				document.getElementById('set4x').addEventListener('click', function(event) {set4b('right')},false);
				document.getElementById('set5j').addEventListener('click', function(event) {set5b('j')},false);
				document.getElementById('set5n').addEventListener('click', function(event) {set5b('n')},false);
				document.getElementById('set6j').addEventListener('click', function(event) {set6b('j')},false);
				document.getElementById('set6n').addEventListener('click', function(event) {set6b('n')},false);
				document.getElementById('set7j').addEventListener('click', function(event) {set7b('j')},false);
				document.getElementById('set7n').addEventListener('click', function(event) {set7b('n')},false);
				document.getElementById('set8j').addEventListener('click', function(event) {set8b('j')},false);
				document.getElementById('set8n').addEventListener('click', function(event) {set8b('n')},false);
				document.getElementById('set9').addEventListener('click', function(event) {set9b()},false);
				document.getElementById('set10').addEventListener('click', function(event) {set10b()},false);

                                // language button
				document.getElementById('ger').addEventListener('click', function(event) {ger()},false);
				document.getElementById('eng').addEventListener('click', function(event) {eng()},false);
				document.getElementById('fr').addEventListener('click', function(event) {fr()},false);

                                // edit show hide button
                                document.getElementById('editbttn').addEventListener('click', edit,false);
                         
                                // info show hide button
                                document.getElementById('infobttn').addEventListener('click', info,false);

                                document.addEventListener("DOMContentLoaded", setwidthen, false);
                                document.addEventListener("DOMContentLoaded", showbtn, false);
                               
                               if(document.getElementById('cal_table')){
                                document.addEventListener("DOMContentLoaded", getdate, false);
                                document.addEventListener("DOMContentLoaded", getdateUS, false);
                               }
				document.getElementById('infab1').addEventListener('click', function(event) {infa1()},false);
				document.getElementById('infbb1').addEventListener('click', function(event) {infb1()},false);
				document.getElementById('infcb1').addEventListener('click', function(event) {infc1()},false);
				document.getElementById('infdb1').addEventListener('click', function(event) {infd1()},false);
				document.getElementById('infeb1').addEventListener('click', function(event) {infe1()},false);
				document.getElementById('inffb1').addEventListener('click', function(event) {inff1()},false);
				document.getElementById('infgb1').addEventListener('click', function(event) {infg1()},false);
				document.getElementById('infhb1').addEventListener('click', function(event) {infh1()},false);
				document.getElementById('infib1').addEventListener('click', function(event) {infi1()},false);
				document.getElementById('infjb1').addEventListener('click', function(event) {infj1()},false);
				document.getElementById('infkb1').addEventListener('click', function(event) {infk1()},false);
				document.getElementById('inflb1').addEventListener('click', function(event) {infl1()},false);
				document.getElementById('infmb1').addEventListener('click', function(event) {infm1()},false);
				document.getElementById('infnb1').addEventListener('click', function(event) {infn1()},false);
			 	document.getElementById('infob1').addEventListener('click', function(event) {info1()},false);

