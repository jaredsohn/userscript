// ==UserScript==
// @name           MCL Pixup Copy
// @namespace      bravo/greasemonkey
// @description    Pixup copy function
// @include        http://mycoffeelounge.net/pix*
// @include        http://*.mycoffeelounge.net/pix*
// @version        1.0.0
// ==/UserScript==
// getById
function $xu(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
// create Element
function $ec(type, attributes){
	var node = document.createElement(type);
	for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
		node.setAttribute(attr, attributes[attr]);
	}
	return node;
}
function $t(s) {
	return document.createTextNode(s);
}
// make element first child of par
function $ef(newNode, par) {
	return par.insertBefore(newNode, par.firstChild);
}
// make element last child of par
function $el(newNode, par) {
	return par.appendChild(newNode);
}
function $getPos(element) {
	var p = {x: element.offsetLeft || 0, y:element.offsetTop || 0};
	while (element = element.offsetParent) {
		p.x += element.offsetLeft;
		p.y += element.offsetTop;
	}
	return p;
}
var $ev= {
	_registry: null,
	Initialise: function() {
		if (this._registry == null) {
			this._registry = [];
			$ev.Add(window, "_unload", this.CleanUp);
		}
	},
	Add: function(obj, type, fn, useCapture) {
		this.Initialise();
		var realType=(type=="_unload"?"unload":type);
		if (typeof obj == "string") obj = document.getElementById(obj);
		if (obj == null || fn == null) return false;
		if(obj.addEventListener) obj.addEventListener(realType, fn, useCapture);
		this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
		return true;
	},
	CleanUp: function() {
		for (var i = 0; i < $ev._registry.length; i++) {
			with($ev._registry[i]) {
				if(type=="unload") fn();
				if(obj.removeEventListener) obj.removeEventListener(type,fn,useCapture);
			}
		}
		$ev._registry = null;
	}
};
var msg=$el($ec('DIV', { style: 'background:yellow; color:black; border:solid 1px black; position:absolute; display:none; left:auto; width:auto; padding: 2px 3px;' }), document.body);
$el($t('Sent'), msg);
if(/pixup\.php/i.test(document.location.href) && opener) {
	var dest=opener.document.getElementById('body1');
	$xu('//input[@type="text"]').forEach(function(el) {
		if(el.name != 'imager2') {
			$ev.Add(el, 'mouseup', function(e) {
				if(opener) {
					dest.value += '\n'+ el.value +'\n';
					var p=$getPos(el);
					msg.style.left=(p.x-50)+'px';
					msg.style.top=p.y+'px';
					msg.style.display='block';
					window.setTimeout(function() { msg.style.display='none'; }, 2000);
				}
			}, false);
		}
	});
}
if(/pixbrowse\.php/i.test(document.location.href) && opener) {
	var dest=opener.document.getElementById('body1');
	$xu('//TD[@class="news"]/DIV/A[IMG]').forEach(function(el) {
		var butt=$ef($ec('INPUT', { type: 'button', value: 'copy', style: 'background:transparent; color:blue; border:none; font-size:10px;cursor:pointer;' }), el.parentNode);
		$ev.Add(butt, 'click', function(e) {
			if(opener) {
				dest.value += '\n'+ el.href +'\n';
				var p=$getPos(e.target);
				msg.style.left=(p.x-50)+'px';
				msg.style.top=(p.y-10)+'px';
				msg.style.display='block';
				window.setTimeout(function() { msg.style.display='none'; }, 2000);
			}
		}, false);
	});
}
