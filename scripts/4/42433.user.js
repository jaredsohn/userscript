// ==UserScript==
// @name           Resizeable Text Fields
// @namespace      http://userscripts.org/scripts/show/42433
// @description    Based on Resizeable Textarea 0.1 (https://addons.mozilla.org/de/firefox/addon/3818), original coding by Raik Jürgens. Added support for select lists and horizontal resizing of input fields by Florian Höch. Should now work on all page types (XML/XHTML/you-name-it).
// @include        *
// ==/UserScript==

window.resizeableTF =
{
	loaded: false,
	TF: [],
	TF_names: [],
	TF_lineheights: [],
	TF_tags: {
		/*
			directions:
			0 = determine on runtime by looking at size attribute
			1 = only horizontal
			2 = horizontal & vertical
		*/
		'input': {
			directions: 1,
			types: ['text', 'password']
		},
		'pre': {
			directions: 2
		},
		'select': {
			directions: 0
		},
		'textarea': {
			directions: 2
		}
	},

	pageload: function (e) {
		if (!resizeableTF.loaded) {
			resizeableTF.doc = document;
			resizeableTF.rootElem = resizeableTF.doc.getElementsByTagName('body')[0] || resizeableTF.doc.documentElement;
		}
		// Don't add handles to elements inside TinyMCE
		if ((resizeableTF.rootElem.getAttribute('class') || '').indexOf('mceContentBody') > -1) return;
		var TF = []
		for (var tagName in resizeableTF.TF_tags) {
			TF = TF.concat(Array.prototype.slice.call(resizeableTF.doc.getElementsByTagName(tagName)));
		}
		if (TF.length) {
			var i = TF.length, k = resizeableTF.TF.length, curTF_Nr;
			while (i--) {
				var TF_tag = resizeableTF.TF_tags[TF[i].tagName.toLowerCase()]
				if ((TF_tag && (!TF_tag.types || TF_tag.types.indexOf(TF[i].type) > -1)) && (!resizeableTF.loaded || resizeableTF.TF_names.indexOf(TF[i].name) < 0)) {
					resizeableTF.TF[k] = TF[i];
					resizeableTF.TF_names[k] = TF[i].name;
					resizeableTF.TF_lineheights[k] = resizeableTF.getlineheight(TF[i]);
					resizeableTF.newdiv('5' , '1' , 'resizeableTFgripH_', k, 'w' ).addEventListener('mouseout', resizeableTF.hidediv, false);
					if (TF_tag.directions == 2 || (TF_tag.directions == 0 && TF[i].size > 1)) {
						resizeableTF.newdiv('1' , '5' , 'resizeableTFgripV_', k, 'n' ).addEventListener('mouseout', resizeableTF.hidediv, false);
						resizeableTF.newdiv('10', '5', 'resizeableTFgripX_', k, 'se').addEventListener('mouseout', resizeableTF.hidediv, false);
					}
					resizeableTF.TF[k].addEventListener('mousemove', new Function('if (!resizeableTF.isresizing && resizeableTF.curTF_Nr !== ' + k + ') { resizeableTF.curTF_Nr = ' + k + '; resizeableTF.posdiv() }'), false);
					resizeableTF.TF[k].addEventListener('mouseout', resizeableTF.hidediv, false);
					k++;
				}
			}
			if (!resizeableTF.loaded) {
				resizeableTF.newdiv('0', '0', 'resizeableTFshowCursor', '', 'w');
				resizeableTF.CursorDiv = resizeableTF.doc.getElementById('resizeableTFshowCursor');
				resizeableTF.CursorDiv.removeEventListener('mousedown', resizeableTF.activate, true);
				window.addEventListener('resize', resizeableTF.hidedivs, true);
				window.addEventListener('scroll', resizeableTF.hidedivs, true);
			}
		}
		resizeableTF.loaded = true;
	},

	newdiv: function (w, h, id, nr, cu) {
		var grip = this.rootElem.namespaceURI ? this.doc.createElementNS(this.rootElem.namespaceURI, 'div') : this.doc.createElement('div');
		grip.setAttribute('id', id + nr);
		grip.setAttribute('style', 'display: none; border: none; font-size: 1px; line-height: 1px; margin: 0; padding: 0; position: fixed; width: ' + w + 'px; height: ' + h + 'px; cursor: ' + cu + '-resize; left: 0; top: 0; z-index: 2147483647;'); // max possible z-index value 2^32/2-1
		grip.addEventListener('mousedown', this.activate, true);
		this.rootElem.appendChild(grip);
		return grip;
	},

	getpositionabs: function (k, elem) {
		var curElem = elem || this.TF[k];
		var curX = curElem.offsetLeft;
		while (curElem.offsetParent) {
			curX += Math.abs(curElem.offsetParent.offsetLeft) + (curElem.offsetParent.tagName.toLowerCase() != 'table' ? curElem.offsetParent.clientLeft : 0) - curElem.offsetParent.scrollLeft;
			// Math.abs needed for <body> which returns negative offset if it has a border (NOT ok - should be positive)
			// curElem.offsetParent.clientLeft not needed for tables (cell offsetLeft already contains table clientLeft)
			curElem = curElem.offsetParent;
		}
		if (curElem != document.documentElement) curX += document.documentElement.offsetLeft; // <html> returns negative offset if it has a border (OK)
		curElem = elem || this.TF[k];
		var curY = curElem.offsetTop;
		while (curElem.offsetParent) {
			curY += Math.abs(curElem.offsetParent.offsetTop) + (curElem.offsetParent.tagName.toLowerCase() != 'table' ? curElem.offsetParent.clientTop : 0) - curElem.offsetParent.scrollTop;
			// Math.abs needed for <body> which returns negative offset if it has a border (NOT ok - should be positive)
			// curElem.offsetParent.clientTop not needed for tables (cell offsetTop already contains table clientTop)
			curElem = curElem.offsetParent;
		}
		if (curElem != document.documentElement) curY += document.documentElement.offsetTop; // <html> returns negative offset if it has a border (OK)
		return [curX, curY];
	},

	getposition: function (k, elem) {
		var curElem = elem || this.TF[k];
		var curX = curElem.offsetLeft;
		while (curElem.offsetParent) {
			curX += Math.abs(curElem.offsetParent.offsetLeft) + (curElem.offsetParent.tagName.toLowerCase() != 'table' ? curElem.offsetParent.clientLeft : 0) - curElem.offsetParent.scrollLeft;
			// Math.abs needed for <body> which returns negative offset if it has a border (NOT ok - should be positive)
			// curElem.offsetParent.clientLeft not needed for tables (cell offsetLeft already contains table clientLeft)
			curElem = curElem.offsetParent;
		}
		if (curElem != document.documentElement) curX -= document.documentElement.scrollLeft;
		curElem = elem || this.TF[k];
		var curY = curElem.offsetTop;
		while (curElem.offsetParent) {
			curY += Math.abs(curElem.offsetParent.offsetTop) + (curElem.offsetParent.tagName.toLowerCase() != 'table' ? curElem.offsetParent.clientTop : 0) - curElem.offsetParent.scrollTop;
			// Math.abs needed for <body> which returns negative offset if it has a border (NOT ok - should be positive)
			// curElem.offsetParent.clientTop not needed for tables (cell offsetTop already contains table clientTop)
			curElem = curElem.offsetParent;
		}
		if (curElem != document.documentElement) curY -= document.documentElement.scrollTop;
		return [curX, curY];
	},

	getdimensions: function (elem) {
		if (document.compatMode == 'BackCompat' || elem.tagName.toLowerCase() == 'select') {
			var w = elem.offsetWidth;
			var h = elem.offsetHeight;
		}
		else {
			var style = document.defaultView.getComputedStyle(elem, null);
			var w = parseFloat(style.width);
			var h = parseFloat(style.height);
			if (elem.tagName.toLowerCase() == 'td' || elem.tagName.toLowerCase() == 'th') {
				// w += parseFloat(style.paddingLeft);
				// w += parseFloat(style.paddingRight);
				h += parseFloat(style.paddingTop);
				h += parseFloat(style.paddingBottom);
			}
		}
		return [w, h];
	},

	getlineheight: function (elem) {
		var style = document.defaultView.getComputedStyle(elem, null);
		return parseFloat(style.lineHeight);
	},

	posdiv: function (e) {
		resizeableTF.isshown = true;
		var k = resizeableTF.curTF_Nr, hx, hy, hh, vx, vy, vw, xx, xy;
		var curPos = resizeableTF.getposition(k);
		resizeableTF.doc.getElementById('resizeableTFgripH_' + k).style.left        = hx = (curPos[0] + resizeableTF.TF[k].offsetWidth  -  5) + 'px';
		resizeableTF.doc.getElementById('resizeableTFgripH_' + k).style.top         = hy = (curPos[1]                                       ) + 'px';
		var TF_tag = resizeableTF.TF_tags[resizeableTF.TF[k].tagName.toLowerCase()];
		if (TF_tag.directions == 2 || (TF_tag.directions == 0 && resizeableTF.TF[k].size > 1)) {
			resizeableTF.doc.getElementById('resizeableTFgripH_' + k).style.height  = hh = (            resizeableTF.TF[k].offsetHeight -  5) + 'px';
			resizeableTF.doc.getElementById('resizeableTFgripV_' + k).style.left    = vx = (curPos[0]                                       ) + 'px';
			resizeableTF.doc.getElementById('resizeableTFgripV_' + k).style.top     = vy = (curPos[1] + resizeableTF.TF[k].offsetHeight -  5) + 'px';
			resizeableTF.doc.getElementById('resizeableTFgripV_' + k).style.width   = vw = (            resizeableTF.TF[k].offsetWidth  - 10) + 'px';
			resizeableTF.doc.getElementById('resizeableTFgripV_' + k).style.display = 'block';
			resizeableTF.doc.getElementById('resizeableTFgripX_' + k).style.left    = xx = (curPos[0] + resizeableTF.TF[k].offsetWidth  - 10) + 'px';
			resizeableTF.doc.getElementById('resizeableTFgripX_' + k).style.top     = xy = (curPos[1] + resizeableTF.TF[k].offsetHeight -  5) + 'px';
			resizeableTF.doc.getElementById('resizeableTFgripX_' + k).style.display = 'block';
		}
		else {
			resizeableTF.doc.getElementById('resizeableTFgripH_' + k).style.height  = hh =              resizeableTF.TF[k].offsetHeight       + 'px';
		}
		resizeableTF.doc.getElementById('resizeableTFgripH_' + k).style.display     = 'block';
	},

	activate: function (e) {
		resizeableTF.isresizing = true;
		var curTargetId = e.target.getAttribute('id').split('_');
		resizeableTF.curTarget = curTargetId[0];
		resizeableTF.curTF_Nr = parseInt(curTargetId[1]);
		resizeableTF.curTF = resizeableTF.TF[resizeableTF.curTF_Nr];
		var curPos = resizeableTF.getposition(resizeableTF.curTF_Nr),
			curDim = resizeableTF.getdimensions(resizeableTF.curTF);
		resizeableTF.offset = [
			e.pageX - curPos[0] - curDim[0],
			e.pageY - curPos[1] - curDim[1]
		];
		var elem = resizeableTF.curTF.parentNode;
		// if (elem.tagName.toLowerCase() == 'td' || elem.tagName.toLowerCase() == 'th') {
			// while (elem.tagName.toLowerCase() != 'table') elem = elem.parentNode;
		// }
		with (elem.style)
			resizeableTF.storedDim = [minWidth, minHeight, width, height];
		var parDim = resizeableTF.getdimensions(elem)
		elem.style.minWidth  = parDim[0] + 'px';
		elem.style.minHeight = parDim[1] + 'px';
		resizeableTF.doc.addEventListener('mouseup', resizeableTF.deactivate, true);
		switch(resizeableTF.curTarget){
			case 'resizeableTFgripH':
				resizeableTF.doc.addEventListener('mousemove', resizeableTF.resizeta_h, true);
				resizeableTF.doc.addEventListener('draggesture', resizeableTF.cancelEvent, true);
				resizeableTF.doc.addEventListener('dragstart', resizeableTF.cancelEvent, true);
				break;
			case 'resizeableTFgripV':
				resizeableTF.doc.addEventListener('mousemove', resizeableTF.resizeta_v, true);
				resizeableTF.doc.addEventListener('draggesture', resizeableTF.cancelEvent, true);
				resizeableTF.doc.addEventListener('dragstart', resizeableTF.cancelEvent, true);
				break;
			case 'resizeableTFgripX':
				resizeableTF.doc.addEventListener('mousemove', resizeableTF.resizeta_x, true);
				resizeableTF.doc.addEventListener('draggesture', resizeableTF.cancelEvent, true);
				resizeableTF.doc.addEventListener('dragstart', resizeableTF.cancelEvent, true);
				break;
			}
		resizeableTF.CursorDiv.style.width = resizeableTF.rootElem.offsetWidth + 'px';
		resizeableTF.CursorDiv.style.height = resizeableTF.rootElem.offsetHeight + 'px';
		resizeableTF.CursorDiv.style.cursor = e.target.style.cursor;
		resizeableTF.CursorDiv.style.display = 'block';
		resizeableTF.cancelEvent(e);
	},

	deactivate: function () {
		resizeableTF.isresizing = false;
		var elem = resizeableTF.curTF.parentNode;
		// if (elem.tagName.toLowerCase() == 'td' || elem.tagName.toLowerCase() == 'th') {
			// while (elem.tagName.toLowerCase() != 'table') elem = elem.parentNode;
		// }
		elem.style.minWidth  = resizeableTF.storedDim[0];
		elem.style.minHeight = resizeableTF.storedDim[1];
		// elem.style.width     = resizeableTF.storedDim[2];
		// elem.style.height    = resizeableTF.storedDim[3];
		resizeableTF.doc.removeEventListener('mouseup', resizeableTF.deactivate, true);
		resizeableTF.posdiv();
		switch(resizeableTF.curTarget){
			case 'resizeableTFgripH':
				resizeableTF.doc.removeEventListener('mousemove', resizeableTF.resizeta_h, true);
				resizeableTF.doc.removeEventListener('draggesture', resizeableTF.cancelEvent, true);
				resizeableTF.doc.removeEventListener('dragstart', resizeableTF.cancelEvent, true);
				resizeableTF.doc.removeEventListener('select', resizeableTF.cancelEvent, true);
				break;
			case 'resizeableTFgripV':
				resizeableTF.doc.removeEventListener('mousemove', resizeableTF.resizeta_v, true);
				resizeableTF.doc.removeEventListener('draggesture', resizeableTF.cancelEvent, true);
				resizeableTF.doc.removeEventListener('dragstart', resizeableTF.cancelEvent, true);
				resizeableTF.doc.removeEventListener('select', resizeableTF.cancelEvent, true);
				break;
			case 'resizeableTFgripX':
				resizeableTF.doc.removeEventListener('mousemove', resizeableTF.resizeta_x, true);
				resizeableTF.doc.removeEventListener('draggesture', resizeableTF.cancelEvent, true);
				resizeableTF.doc.removeEventListener('dragstart', resizeableTF.cancelEvent, true);
				resizeableTF.doc.removeEventListener('select', resizeableTF.cancelEvent, true);
				break;
		}
		resizeableTF.CursorDiv.style.width = '0';
		resizeableTF.CursorDiv.style.height = '0';
		resizeableTF.CursorDiv.style.display = 'none';
	},

	hidedivs: function () {
		if (resizeableTF.isshown && !resizeableTF.isresizing) {
			var k = resizeableTF.TF.length;
			while (k--) {
				resizeableTF.curTF_Nr = k;
				resizeableTF.hidediv();
			}
			resizeableTF.isshown = false;
		}
	},

	hidediv: function (e) {
		if (resizeableTF.isshown && !resizeableTF.isresizing) {
			try {
				if (e && e.relatedTarget && e.relatedTarget.id && e.relatedTarget.id.indexOf('resizeableTFgrip') == 0) return;
			}
			catch (exception) {
			};
			var k = resizeableTF.curTF_Nr;
			if (k != undefined && !resizeableTF.isresizing) {
				var grip = resizeableTF.doc.getElementById('resizeableTFgripH_' + k);
				grip.style.display = 'none';
				if (grip = resizeableTF.doc.getElementById('resizeableTFgripV_' + k))
					grip.style.display = 'none';
				if (grip = resizeableTF.doc.getElementById('resizeableTFgripX_' + k))
					grip.style.display = 'none';
				resizeableTF.curTF_Nr = undefined;
			}
		}
	},

	cancelEvent: function (e) {
		e.preventDefault();
		e.stopPropagation();
	},

	resizeta_h: function (e) {
		var curPos = resizeableTF.getposition(resizeableTF.curTF_Nr);
		resizeableTF.curTF.style.minWidth  = Math.max(25, e.pageX - resizeableTF.offset[0] - curPos[0]) + 'px';
		resizeableTF.curTF.style.width     = Math.max(25, e.pageX - resizeableTF.offset[0] - curPos[0]) + 'px';
		resizeableTF.cancelEvent(e);
	},

	resizeta_v: function (e) {
		var curPos = resizeableTF.getposition(resizeableTF.curTF_Nr);
		resizeableTF.curTF.style.minHeight = Math.max(resizeableTF.TF_lineheights[resizeableTF.curTF_Nr], e.pageY - resizeableTF.offset[1] - curPos[1]) + 'px';
		resizeableTF.curTF.style.height    = Math.max(resizeableTF.TF_lineheights[resizeableTF.curTF_Nr], e.pageY - resizeableTF.offset[1] - curPos[1]) + 'px';
		resizeableTF.cancelEvent(e);
	},

	resizeta_x: function (e) {
		var curPos = resizeableTF.getposition(resizeableTF.curTF_Nr);
		resizeableTF.curTF.style.minWidth  = Math.max(25, e.pageX - resizeableTF.offset[0] - curPos[0]) + 'px';
		resizeableTF.curTF.style.width     = Math.max(25, e.pageX - resizeableTF.offset[0] - curPos[0]) + 'px';
		resizeableTF.curTF.style.minHeight = Math.max(resizeableTF.TF_lineheights[resizeableTF.curTF_Nr], e.pageY - resizeableTF.offset[1] - curPos[1]) + 'px';
		resizeableTF.curTF.style.height    = Math.max(resizeableTF.TF_lineheights[resizeableTF.curTF_Nr], e.pageY - resizeableTF.offset[1] - curPos[1]) + 'px';
		resizeableTF.cancelEvent(e);
	}
};

window.addEventListener('load', resizeableTF.pageload, true);
resizeableTF.pageload();
