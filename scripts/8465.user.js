// Written by Lior Zur, 2007
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
//
// v0.11 (14.4.07)
//
// ==UserScript==
// @name				 Resize this page's margins!
// @namespace		 liorzur
// @description	 Adds dynamic margins to any page for easy reading. Useful for those long texts with no margins. Activated through a menu command.
// @include			 *
// ==/UserScript==

function encapsulate () {
if ($('gm_handle_l')) return false; //Don't run encapsulate twice.

// Functions:
function $(id) {
  return document.getElementById(id);
}
function addGlobalStyle(css) {
	 var head, style; head = document.getElementsByTagName('head')[0];
	 if (!head) { return; } style = document.createElement('style');
	 style.type = 'text/css'; style.innerHTML = css; head.appendChild(style);
}
function createEl(elObj, parent) { //By Arvid
  var el;
  if (typeof elObj == 'string') {
	  el = document.createTextNode(elObj);
  }
  else {
	  el = document.createElement(elObj.n);
	  if (elObj.a) {
		  attributes = elObj.a;
		  for (var key in attributes) {
			  if (key.charAt(0) == '@')
				  el.setAttribute(key.substring(1), attributes[key]);
			  else 
				  el[key] = attributes[key];
		  }
	  }
	  if (elObj.evl) {
		  el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
	  }
	  if (elObj.c) {
		  elObj.c.forEach(function (v, i, a) { createEl(v, el); });
	  }
  }
  if (parent)
	  parent.appendChild(el);
  return el;
}
function addClass (element, className ) {
	var currentClass = element.getAttribute ("class") || '';
	if (!currentClass) currentClass = "";
	if (currentClass.indexOf(className) == -1)
		element.setAttribute ("class", currentClass + " " + className);
}
function removeClass (element, className ) {
	var currentClass = element.getAttribute ("class") || '';
	if (currentClass.indexOf(className) != -1)
		element.setAttribute ("class", currentClass.replace(className, "").replace(/^\s+/, '').replace(/\s+$/, ''));
}
//End functions


var DEFAULTWIDTH = 550; //Constant. Good default width, used when program first runs.
var imgBackgroundBar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAYAAAC07qxWAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACfSURBVHjajJC9CgJBDISTbFBQDrWwsLz3fwXtbe0t7GwFi0P3J7qSg2A1aTLLfjuZDR8vDyOgVIQJAhnjSM1AsDWM1FxAx1xhR0YdGwa+Mzj6ep8wMIEb1wpuXFcLwcDtmqFv637Qp+setnk37+RadDPozYGeoToww+K9j05nv6jB5b9YD7vl6StKcKLwMM2OPL3K6AcLkIXMv/EfAQYAvhIzc0/rlkwAAAAASUVORK5CYII=";
var imgArrowRight = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJmSURBVHjaYvz//z/DQIHguD4WIMUKxH+B+DcQYziGaQAdB7JbPCXWKUVLXcYCyObFpm7AHAgE/GbGKn5Odtrd6QnOSwT4ucyAYtyDwoHA0GOUEBOQTox2qGVnZ2WXkRaWLc3zmwyU0gZijgF34NpFRf9fvPrw9f2Hr89hYhqqUhrlBf59QKYaELMPhih+2dy1Nu/q9cdXYQJmRsrWGYkujUCmAjTzMDAGxfayQOMeFLTMdHDYPyD+A821HMAoNqws9J+kqyWnCpIElir/12w6OXvF2mPtQO5jkOP4k2MdEzjY2Yz+/P3LRmvXMTIy/vv69ce7V68/PmNiYvr76/cfzh17Lp7j5eGUUZAT5QTKMwZ4m6Z8+PD15Y69F2eAHCigqiwZp6okoccwSAArCzNTTLhtKdCtV0Bp8B8TE+NfhkEGfv788+v9x69fQCH49sDha/WHjl5X//v3Hxs9HQFMboy/fv/l+v79l0ZYoIWXnIwIuIj59u3nr9mL9taeOH37NMiBX7btPr8LSO8HJRE6ug9kF7+4GL9taa5vIsxxP3/+/rNszdEOoOPWgAKPcSDqYmg1J6SsKO5SmOk1WVJCUAQkDozB/8vXHp2wfsvpCUDuU5AQywAlMWZXRz3z8EDL6YIC3AIwQWBMLgE6biqQ+QzagBiwgvr/s+fvPv379w+eOXftv7RxwbKDbaCyD1pODmhN8vfqjSdXJ87cUfzp8/cP5y7e3z9z/p46oPh9IP6FklAHqj0IS4fA1oz2vkNXH0Oj9QdGThrgBisTNDf/h1aBGIAFqGggy+N/hBQMZGuGKAAQYACzkeXDUCvFzQAAAABJRU5ErkJggg==";
var imgArrowLeft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ2SURBVHjaYvz//z8DOgiO62MEUqxAzAzEv9cuKvrDQCMAtAuvPBMOcV4tdRmLlFinFCBbDGgIE8MAARYsPuIW4OcyS09wnicqwid27tL9X+cu3l8FlHo/EA5kQnMcB5DSLs3zmywjLSzLzs7KnhrvXC8hLiAFjfaBcyDQAexASq28wL9PQ1VKAyb+/sPX5y9efvgGTIf/ByyKgY4DZQiFjESXRjMjZWuY5NXrj6+292/MAzJfDlQaZAyK7QXlVNmIYKvKED/zVEYgAElcvvboNshxP3/+Pg/k/oDmahY8GYua4C/Uzq8gC8U9nPWTArxNU2COe/Do9fcdey6es7FQt2ZjZTH69+8fs5govxQ3N4cQsFiiuQNZmJl//fj569zcxfsXMMxasCf82/ef3/8PMnDr7vOLwNhVZvry7ee3nz///GIYZICJiREUzf9Yjhy/cfLPn7912cluXVxc7GwgySfP3v1YsfbYNk5OthtsrMzfgDFP1xzMzMz069+//zeBzLegNPjmxOnbqwX5uYXiIuyq2dhYmGWkhDiC/cwsuydvXvvy1cfDQDUfgZiejgTZ9RuEGUF1MbCYAeVk6UAf04LIYOsCoA/AmeX5i/dv+qdvy717/+UeIPcdsCz8NyB1MdBiUHw/W7/l9NRtu88vgUlKSgiKVBYGTHd11DOHNhwGriaBtlgeL1h2sG3X/ksbYeLAIubvs+fvPtE5irHXxUBHgnLz/Znz99QBGwj7P33+/r536taCqzeeXIUWnvSvSXC0B0GNBiknO23ZfYeuXoGmP5qEIFntQaBjQNXMA6DjjoDaCwPVUIDVxQyDGTAxDHIAEGAAzxeOOQZVkPgAAAAASUVORK5CYII=";
addGlobalStyle(
'div#gm_handle_l {display:block; height:20px; width:40px; background:red; position:absolute; top:0; left:0; '+
"background:  top left no-repeat url("+ imgArrowLeft +");"+
"}"+
'div#gm_handle_r {display:block; height:20px; width:40px; position:absolute; top:0; right:0; '+
"background:  top right no-repeat url("+ imgArrowRight +");"+
"}"+
'div#gm_bar {display:block; height:20px; width:500px; position:absolute; top:0; '+
'background: repeat-x top left url('+imgBackgroundBar+');'+
'}'+
'div.gm_bar_passive {opacity: 0.3; '+
"}"+
'div.gm_bar_passive:hover {opacity: 0.7;} '+
'div.gm_bar_active {opacity: 1.0;} '+
'');

function updateBar () {
	_docWidth = document.documentElement.clientWidth;
	_maximumWidth = _docWidth;
	_theBar.style.width = _barWidth + "px";
	_theBar.style.left = ((_docWidth - _barWidth) / 2) + "px";
}
function updateDocumentMargins () {
	var docBody = document.body;
	docBody.style.marginLeft = 'auto';
	docBody.style.marginRight = 'auto';
	docBody.style.width = _barWidth + "px";
}

var events = {
		 onmouseup: function(e) {
			document.removeEventListener ('mousemove', events.trackmouse, false);
			document.removeEventListener ('mouseup', events.onmouseup, false);
			addClass(_theBar, 'gm_bar_passive');
			removeClass(_theBar, 'gm_bar_active');
			GM_setValue("barWidth", _barWidth); //Remember width.
			updateDocumentMargins ();
		 },

		 trackmouse: function(e) {
			var xDelta = e.clientX - _startingMouseX;
			_barWidth = (_isLeftHandle)?  (_startingWidth - (xDelta * 2))  :  (_startingWidth + (xDelta * 2));
			if (_barWidth < _minimumWidth) _barWidth = _minimumWidth;
			if (_barWidth > _maximumWidth) _barWidth = _maximumWidth;
			updateBar();
			updateDocumentMargins ();
		 },
		 
		 onmousedown: function(e) {
			removeClass(_theBar, 'gm_bar_passive');
			addClass(_theBar, 'gm_bar_active');

			_startingMouseX = e.clientX;
			_startingWidth = parseInt(_theBar.style.width);
			_isLeftHandle = (e.target.id.search("gm_handle_l") != -1);
			
			document.addEventListener ('mousemove', events.trackmouse, false);
			document.addEventListener ('mouseup', events.onmouseup, false);
			updateBar (); //mainly to determine current Maximum Width.
		},
		
		onwindowresize: function (e) {
			updateBar ();
			updateDocumentMargins ();
		}
}

// Internal settings for dragging functions:
var _startingWidth;
var _startingMouseX;
var _isLeftHandle;
var _docWidth;
var _minimumWidth = 200; //Const
var _maximumWidth;
var _barWidth;

// Create and initialize the bar
var _theBar = createEl({n: 'div', a: {'@id': 'gm_bar',},
	c: [
		{n: 'div', a: {'@id': 'gm_handle_l'}},
		{n: 'div', a: {'@id': 'gm_handle_r'}},
	]});

document.body.insertBefore(_theBar, document.body.firstChild);

_barWidth = GM_getValue("barWidth", DEFAULTWIDTH); //Recall width (or use default).
addClass(_theBar, 'gm_bar_passive');
updateBar ();
updateDocumentMargins ()

// Bind events
$('gm_handle_l').addEventListener('mousedown', events.onmousedown, false);
$('gm_handle_r').addEventListener('mousedown', events.onmousedown, false);
window.addEventListener('resize', events.onwindowresize, true);

} // end encapsulate.

GM_registerMenuCommand("Resize this page's margins!", encapsulate);
//setTimeout(encapsulate, 100); //Uncomment this.

