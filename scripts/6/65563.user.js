// ==UserScript==
// @name           Snel coördinaten kopieren
// @description    Kopieert snel dorpscoördinaten: C = kopieren / V = plakken
// @author         Michael Richter
// @version        17072009-1
// @contributer    Lekensteyn
// @namespace      http://osor.de/
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

var mousex = 0;
var mousey = 0;

(function(){

	var $x = function(p, context) {
		if(!context)
			context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr;
	};
	
	var getPos = function(el) {
		if(typeof(el.offsetParent) != 'undefined') {
			for(var x = 0, y = 0; el; el = el.offsetParent) {
				x += el.offsetLeft;
				y += el.offsetTop;
			}
			return {left: x, top: y};
		} else {
			return {left: el.x, top: el.y};
		}
	};
	
	var getText = function(el) {
		var text = '';
		for(var i = 0; i < el.childNodes.length; i++) {
			if(el.childNodes[i].nodeType == 3) {
				text += el.childNodes[i].nodeValue + ' ';
			}
		}
		return text;
	};
	
	var getMouseElements = function(nodes) {
		var x = mousex + window.pageXOffset;
		var y = mousey + window.pageYOffset;
		var node, pos;
		for(var i = 0; i < nodes.length; i++) {
			if(pos = getPos(nodes[i])) {
				if(pos.top < y && pos.top + nodes[i].offsetHeight > y && pos.left < x && pos.left + nodes[i].offsetWidth > x) {
					node = nodes[i];
				}
			}
		}
		return node;
	};
	
	document.addEventListener("mousemove", function(evt){
		mousex = evt.clientX;
		mousey = evt.clientY;
	}, true);
	
	document.addEventListener('keypress', function(evt){
		if(evt.ctrlKey || evt.altKey) return;
		var code = evt.charCode || evt.keyCode;
		if(code == 99) { //c = copy
			var choose = document.getElementById('copycoordschooser');
			if(choose) {
				choose.parentNode.removeChild(choose);
			}
			var node;
			if(/screen=map/.test(location.href)) {
				if(node = getMouseElements($x('//a[contains(@onmouseover,"map_popup")]'))) {
					var coord = /'.*? \((\d+\|\d+)\) C\d+'/.exec(node.getAttribute('onmouseover'));
					if(coord) {
						document.cookie = 'copycoords=' + coord[1];
						evt.preventDefault();
						return;
					}
				}
			}
			if(node = getMouseElements($x('//*[text()]'))) {
				if(node.nodeName == 'TEXTAREA' || node.nodeName == 'INPUT') {
					return;
				}
				var text = getText(node);
				var m;
				var coords = [];
				while(m = /(\d+\|\d+)/.exec(text)) {
					coords.push(m[1]);
					text = text.substr(text.indexOf(m[1]) + m[1].length);
				}
				
				if(coords.length > 1) {
					var chooser = document.createElement('div');
					chooser.id = 'copycoordschooser';
					chooser.setAttribute('style', 'position: absolute; z-index: 1000; left: '+mousex+'px; top: '+mousey+'px; background-color: #f6f2e7; padding: 2px; border: 2px solid #804000;');
					var head = document.createElement('div');
					head.setAttribute('style', 'background-color: #e1d7bc; font-weight: bold;');
					head.textContent = 'Kiezen... ';
					var close = document.createElement('a');
					close.href = '#';
					close.textContent = '×';
					close.addEventListener('click', function(evt){
						var el = document.getElementById('copycoordschooser');
						el.parentNode.removeChild(el);
					}, false);
					head.appendChild(close);
					chooser.appendChild(head);
					for(var i = 0; i < coords.length; i++) {
						var entry = document.createElement('div');
						entry.setAttribute('style', 'padding: 1px;');
						var a = document.createElement('a');
						a.href = '#';
						a.textContent = coords[i];
						a.addEventListener('click', function(evt){
							document.cookie = 'copycoords=' + evt.target.textContent;
							var el = document.getElementById('copycoordschooser');
							el.parentNode.removeChild(el);
						}, false);
						entry.appendChild(a);
						chooser.appendChild(entry);
					}
					document.body.appendChild(chooser);
				} else if(coords.length == 1) {
					document.cookie = 'copycoords=' + coords[0];
				} else {
					document.cookie = 'copycoords=';
				}
			}
		} else if(code == 118) { //v = paste
			var coords = /copycoords=(\d+)\|(\d+)/.exec(document.cookie)
			if(!coords) return;
			var formx = document.getElementsByName("x");
			var formy = document.getElementsByName("y");
			if(formx.length && formy.length) {
				formx[0].value = coords[1];
				formy[0].value = coords[2];
				evt.preventDefault(); 
			}
			else if(!document.getElementById('copycoordspaster')){//added by Lekensteyn
				coords = coords[1]+'|'+coords[2];
				var pe = document.createElement('input');
				pe.addEventListener('focus', function(){this.select();}, false);
				pe.id = 'copycoordpaster';
				pe.readonly = true;
				pe.value = coords;
				pe.style.cssText = 'position: absolute; top: 10px; left: 10px; font-size: 20pt; font-weight: bold; width: 5em; text-align: center;';
				document.body.appendChild(pe);
			}
		}
	}, false);

})();
