// ==UserScript==
// @name           BravoGMLibrary
// @namespace      bravo/greasemonkey
// @description    Bravo GM library of functions
// @version        2.3.0
// ==/UserScript==

_head = document.getElementsByTagName("head")[0];

String.prototype.setVar = function(q, v) 
{
	var regex = new RegExp("([\&\?])?"+q+"=[^\&\#]*", "g");
	return regex.test(this) ? this.replace(regex, "$1"+q+"="+v) : this+"&"+q+"="+v;
}

function $i(id) 
{
	return document.getElementById(id);
}
function $xu(p, c) 
{
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
function $xo(p, c) 
{
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
function $xf(p, c) 
{
	return document.evaluate(p, c || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function $xa(p, c) 
{
	return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}
function $c(cls, o) 
{
	var fn=$xu;
	if(o) fn=$xo;
	return fn('//*[@class = "'+cls+'"' +
				' or contains(@class, " '+cls+' ")' +
				' or starts-with(@class, "' +cls+' ")' +
				' or substring(@class,string-length(@class)-'+cls.length+')=" '+cls+'"]');
}
function $n(nm, o) 
{
	var fn=$xu;
	if(o) fn=$xo;
	return fn('//*[@name = "'+nm+'"]');
}
function $ec(type, attributes)
{
	var node = document.createElement(type);
	for (var attr in attributes) if (attributes.hasOwnProperty(attr))
		node.setAttribute(attr, attributes[attr]);
	return node;
}
function $t(s) 
{
	return document.createTextNode(s);
}
function $ed(element) 
{
	element.parentNode.removeChild(element);
}
function $ea(newNode, node) 
{
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}
function $eb(newNode, node) 
{
	return node.parentNode.insertBefore(newNode, node);
}
function $ef(newNode, par) 
{
	return par.insertBefore(newNode, par.firstChild);
}
function $el(newNode, par) 
{
	return par.appendChild(newNode);
}
function $getPos(element) 
{
	var p = {x: element.offsetLeft || 0, y:element.offsetTop || 0};
	while (element = element.offsetParent) 
	{
		p.x += element.offsetLeft;
		p.y += element.offsetTop;
	}
	return p;
}
var $ev= 
{
	_registry: null,
	Initialise: function() 
	{
		if (this._registry == null) 
		{
			this._registry = [];
			$ev.Add(window, "_unload", this.CleanUp);
		}
	},
	Add: function(obj, type, fn, useCapture) 
	{
		this.Initialise();
		var realType=(type=="_unload"?"unload":type);
		if (typeof obj == "string") obj = document.getElementById(obj);
		if (obj == null || fn == null) return false;
		if(obj.addEventListener) obj.addEventListener(realType, fn, useCapture);
		this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
		return true;
	},
	CleanUp: function() 
	{
		for (var i = 0; i < $ev._registry.length; i++) 
		{
			with($ev._registry[i]) 
			{
				if(type=="unload") fn();
				if(obj.removeEventListener) obj.removeEventListener(type,fn,useCapture);
			}
		}
		$ev._registry = null;
	}
};
function $db(name,maxlen) 
{
	this.maxlen=maxlen;
	this.name=name;
	this.count=0;
	this.load();
}
$db.prototype = 
{
	get: function(key) 
	{
		if(this.maxlen && this.data[key]) 
		{
			var t=this.data[key];
			this.set(key, t);
		} 
		else 
		{
			this.load();
		}
	  	return (typeof this.data[key] == 'undefined') ? '' : this.data[key];
	},
	read: function(key) 
	{
		this.load();
	  	return (typeof this.data[key] == 'undefined') ? '' : this.data[key];
	},
	$kill: function() 
	{
		for(var o in this.data) return this.del(o);
		return -1;
	},
	$prune: function() 
	{
		if(this.maxlen) while(this.count>=this.maxlen) this.$kill();
		this.save();
	},
	$add: function(key, value) 
	{
		this.data[key]=value;
		this.count++;
		this.$prune();
		return;
	},
	del: function(key) 
	{
		if(typeof this.data[key] == 'undefined') return -1;
		delete this.data[key];
		this.count--;
		this.save();
		return;
	},
	$mod: function(key, value) 
	{
		if(this.maxlen) {
			var t=this.data[key];
			delete this.data[key];
		}
		this.data[key]=value;
		return;
	},
	set: function(key, value) 
	{
		this.load();
		if(typeof this.data[key] == 'undefined') this.$add(key, value);
		else this.$mod(key, value);
		this.save();
		return;
	},
	load: function() 
	{
		this.data=eval(GM_getValue(this.name, '({})'));
		this.count=0;
		for(o in this.data) this.count++;
		this.$prune();
		return;
	},
	save: function() 
	{
		GM_setValue(this.name, uneval(this.data));
	},
	setmax: function(n) 
	{
		this.maxlen = parseInt(n);
		this.load();
		this.$prune();
	}
};
function __config() 
{
	var xx=$i('__back__');
	var yy=$i('__config_back__');
	xx.style.display=xx.style.display == 'block' ? 'none' : 'block';
	yy.style.display=xx.style.display;
}
if(! $i('__config__') ) 
{
	$el($ec('DIV', { 
		'id'		: '__back__',
		'style'		: 'position: fixed; top: 0; left: 0; z-index: 9997; width:100%; height:100%; '+
					  'background: black; opacity: 0.3; display:none;'
	}),document.body);
	$el($ec('DIV', { 
		'id'		: '__config_back__',
		'style'		: 'position: fixed; top: 0; left: 0; z-index: 9998; width:100%; height:100%;'+
					  'background: transparent; display:none;'
	}),document.body);
	$el($ec('DIV', { 
		'id'		: '__config_front__',
		'style'		: 'position: fixed; top: 100px; left: 100px; right:100px; bottom:100px; z-index: 9999;'+
					  'background: #9090aa; border:solid 1px dodgerblue;font-size:16px;'+
					  '-moz-box-shadow: 10px 10px 40px 10px black;'
	}),$i('__config_back__'));

	$el($ec('DIV', { 
		'id'		: '__config_header__',
		'style'		: 'width: 100%; text-align:center; font-size:2.6em; font-weight:bold;color: white;'
	}),$i('__config_front__'));
	$el($ec('DIV', { 
		'id'		: '__config__',
		//'style'		: 'width: 100%; position:fixed; z-index:10000; background: transparent;top:3em;bottom:0;'
	}), $i('__config_front__'));
	$el($ec('DIV', { 'style' : 'clear:both;' }), $i('__config__'));
	$el($ec('DIV', { 
		'style' : 'font-size: 0.5em; position:absolute; z-index:10000; '+
				  'top:5px; right: 5px; color:white: font-weight:bold; background:red;'+
				  '-moz-border-radius:8px; padding: 0 6px; cursor:pointer;',
		'id' : '__config_close__'
	}),$i('__config_header__'));
	$el($t('Greasemonkey Scripts Setup'), $i('__config_header__'));
	$el($t('X'), $i('__config_close__'));
	$ev.Add($i('__config_close__'), 'click', __config, false);
}
function _config_addBlock(s) 
{
	var r = $eb($ec('DIV', 
			{ 
				'style' : 'width:22%; margin:0 0 10px 10px; padding: 10px 8px; '+
					'border: inset 2px yellow;background:#8888dd;-moz-border-radius:9px;' +
					'float:left;'
			}
		),$i('__config__').lastChild);
	$el($t(s), $el($ec('H2', { 'style' : 'text-align:center; margin:0 0 0.4em;' }), r));
	return r;
}
function $script(scr, id)
{
	if(_head) 
	{
		var aS = document.createElement("script");
		aS.type = "text/javascript";
		aS.id = id;
		try {aS.innerHTML = scr;}
		catch(e) {aS.innerText = scr;}
		_head.appendChild(aS);
	}
}
function $run(source) 
{
	if ('function' == typeof source) 
	{
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
function $replaceYoutube(id)
{
	if(!id) id = 'movie_player';
	if('object' != typeof(id)) id=$i(id);
	if(id)
	{
		var mpC = id.cloneNode(true);
		var fv = mpC.getAttribute("flashvars").setVar("enablejsapi", "1");
		mpC.setAttribute("flashvars", fv);
		id.parentNode.replaceChild(mpC, id);
	}
}
function $yt(id)
{
	if(!id) id = 'movie_player';
	if('object' != typeof(id)) id = $i(id);
	if(id)
	{
		this.movie = id;
		this.player = id.wrappedJSObject;
	}
}
