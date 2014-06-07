// ==UserScript==
// @name           MCL Priority recent
// @namespace      bravo/greasemonkey
// @description    Prioritise recent threads
// @version        1.07
// @include        http://mycoffeelounge.net/*
// @include        http://*.mycoffeelounge.net/*
// ==/UserScript==
// getById
function $i(id) {
	return document.getElementById(id);
}
// xpath unordered nodes
function $xu(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
// xpath ordered nodes
function $xo(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
// xpath single first node
function $xf(p, c) {
	return document.evaluate(p, c || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
// xpath single any node
function $xa(p, c) {
	return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}
// getByCLASS(className, orderedFlag);
// untested!!
function $c(cls, o) {
	var fn=$xu;
	if(o) fn=$xo;
	return fn('//*[@class = "'+cls+'"' +
				' or contains(@class, " '+cls+' ")' +
				' or starts-with(@class, "' +cls+' ")' +
				' or substring(@class,string-length(@class)-'+cls.length+')=" '+cls+'"]');
}
// create Element
function $ec(type, attributes){
	var node = document.createElement(type);
	for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
		node.setAttribute(attr, attributes[attr]);
	}
	return node;
}
// text node
function $t(s) {
	return document.createTextNode(s);
}
// delete Element
function $ed(element) {
	element.parentNode.removeChild(element);
}
// insert element after
function $ea(newNode, node) {
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}
// insert element before
function $eb(newNode, node) {
	return node.parentNode.insertBefore(newNode, node);
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
// event manager
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
// simple "database", with a maximum length
function $db(name,maxlen) {
	this.maxlen=maxlen;
	this.name=name;
	this.count=0;
	this.load();
}
$db.prototype = {
	get: function(key) {
		if(this.maxlen && this.data[key]) {
			var t=this.data[key];
			this.set(key, t);
		} else {
			this.load();
		}
	  	return (typeof this.data[key] == 'undefined') ? '' : this.data[key];
	},
	read: function(key) {
		this.load();
	  	return (typeof this.data[key] == 'undefined') ? '' : this.data[key];
	},
	$kill: function() {
		for(var o in this.data) return this.del(o);
		return -1;
	},
	$prune: function() {
		if(this.maxlen) while(this.count>=this.maxlen) this.$kill();
		this.save();
	},
	$add: function(key, value) {
		this.data[key]=value;
		this.count++;
		this.$prune();
		return;
	},
	del: function(key) {
		if(typeof this.data[key] == 'undefined') return -1;
		delete this.data[key];
		this.count--;
		this.save();
		return;
	},
	$mod: function(key, value) {
		if(this.maxlen) {
			var t=this.data[key];
			delete this.data[key];
		}
		this.data[key]=value;
		return;
	},
	set: function(key, value) {
		this.load();
		if(typeof this.data[key] == 'undefined') this.$add(key, value);
		else this.$mod(key, value);
		this.save();
		return;
	},
	load: function() {
		this.data=eval(GM_getValue(this.name, '({})'));
		this.count=0;
		for(o in this.data) this.count++;
		this.$prune();
		return;
	},
	save: function() {
		GM_setValue(this.name, uneval(this.data));
	},
	setmax: function(n) {
		this.maxlen = parseInt(n);
		this.load();
		this.$prune();
	}
};
// -- start common config --
function __config() {
	var xx=$i('__back__');
	var yy=$i('__config_back__');
	xx.style.display=xx.style.display == 'block' ? 'none' : 'block';
	yy.style.display=xx.style.display;
}
if(! $i('__config__') ) {
	$el($ec('DIV', { 
		'id'		: '__back__',
		'style'		: 'position: fixed; top: 0; left: 0; z-index: 9998; width:100%; height:100%; background: black; opacity: 0.7; display:none;'
	}),document.body);
	$el($ec('DIV', { 
		'id'		: '__config_back__',
		'style'		: 'position: fixed; top: 0; left: 0; z-index: 9999; width:100%; height:100%;'+
					  'background: transparent;font-size:16px; display:none;'
	}),document.body);
	$el($ec('DIV', { 
		'id'		: '__config_header__',
		'style'		: 'width: 100%; text-align:center; font-size:2.6em; font-weight:bold;color: white;'
	}),$i('__config_back__'));
	$el($ec('DIV', { 
		'id'		: '__config__',
		'style'		: 'width: 100%; position:fixed; z-index:10000; background: transparent;top:3em;bottom:0;'
	}), $i('__config_back__'));
	$el($ec('DIV', { 'style' : 'clear:both;' }), $i('__config__'));
	$el($ec('DIV', { 
		'style' : 'font-size: 0.6em; position:fixed; z-index:10000; top:5px; right: 5px; color:white: font-weight:bold; background:red;'+
				  '-moz-border-radius:8px; padding: 0 6px; cursor:pointer;',
		'id' : '__config_close__'
	}),$i('__config_header__'));
	$el($t('Greasemonkey Scripts Setup'), $i('__config_header__'));
	$el($t('X'), $i('__config_close__'));
	$ev.Add($i('__config_close__'), 'click', __config, false);
}
function _config_addBlock(s) {
	var r = $eb($ec('DIV', { 
		'style' : 'width:22%; margin:0 0 10px 10px; padding: 10px 8px; border: inset 2px yellow;background:#8888dd;-moz-border-radius:9px;' +
		'float:left;'
	}),$i('__config__').lastChild);
	$el($t(s), $el($ec('H2', { 'style' : 'text-align:center; margin:0 0 0.4em;' }), r));
	return r;
}
// -- end common config --
// -- start MCL config common --
if(! $i('__GMMCL__')) {
	var tUL=$xf('//div[@id="ml"]/UL/LI/UL');
	if(tUL) {
		var LI=$el($ec('LI'), tUL);
		var A=$el($ec('A', { id: '__GMMCL__', style: 'cursor:pointer;' }), LI);
		$el($t('- Config'), A);
		$ev.Add(A, "click", __config, false);
	}
}
// -- end MCL config common --
// -------------------------------------------------------------------------------------------
// initialise the ratings database
cfgTrack = GM_getValue("track", 100);
thdRatings = new $db("rating", cfgTrack);
var hiStar = ['data:image/png;base64,',
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAA',
	'AAd0SU1FB9gKEwUHHRAp7McAAAGlSURBVDjLpZJBSFRRFIa%2Fe98bR3Pa6MI2Pt1JuSh6QxDS3hZtQgmDtqJtglrozlYVbRKkwn24aeFeXLp8IxgEJRVMyeiohA7j',
	'm5k3797TIhmG0TcqXriLc%2B85%2F%2FnPf34lIlzm6HafxclXo1ujz%2B63y1FJDEqLy269%2BHej%2FuWHig5KN73V9%2FWLMpjS6dQNpfV1pzM9faERSovLPcBL',
	'qdRABJSa%2Bzr4oPe0XLel0AGGgFmJ6r2msA%2BAjeMeU67M53T2NcJ3XwLT0GD74eyY4%2FXdcweu3dbp1C0gY8Mq8a8CsneAtZajQpHD9W9ILQIoAxtADlhz46Mw',
	'tD%2B3ps32fkp3dwGChDWIDWItUTmk8nsHiRoaZoAR4A6wokSEzeFHE87VK59SmW6tO1xQCoz5X%2Fxnh1phD4lN87QWeOJLsNRY43r67pTqcD84XZ1Kuw5iLCasYs',
	'IqWNuq3VNfgo8nfJBT2TfAzBnme%2BtLMJO0xvw53Jtv54P%2BcwB47QC8lvjw%2BCY2SQLIAy%2BO437geRN1L9GJwC7wGPjsSxA3vb%2FLqewCMAaMNxf8A4n8sF',
	'3gXdrmAAAAAElFTkSuQmCC'].join('');
var loStar = ['data:image/png;base64,',
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAA',
	'AAd0SU1FB9gKEwUnKNMeDEYAAAGASURBVDjLtZLBShtRFIa%2FmbnM3AatSUoEg0JQu%2BhjiQpCFt2VroIrt4oyIBqIi9JFXyOBPIKLghXUFnQmNtGYO5O5d9xE0U',
	'BisvDAWRz%2Bc79zuP%2BB94xfP37mD%2FcP8uN67FFCs96w5nLZFSnlir%2B7Z00NAIpCiIxt2xnXdYtTAZr1hgBK%2FX6fNE0BSpVv38VEgGa9kQFWkyQRd%2B0O',
	'AFproZRaLa9vZob7rZOj40I2m5vLfcrPCCFmACeOY1pBSLd7jzGG27DF%2BdkfkiQB0EAXuAPaQimlg%2BCm2Ol0LM%2FzAIjjCGMMaZrS6%2FUIgoDE6KehDvARmA',
	'VaFsBOZXteSvnF%2ByARQmBZFsYY1EOPMAxp3%2F5Haz28%2Falfq14%2F2%2FN1c6toC%2Bez67o4joMxhjiOiaIITDr8%2BLdfq%2F4FeOVveW1jGVh6474u%2FF',
	'r1bJQLaoIDVeNs9CYAyHEAOVTrQY4cIkaIEXAJ%2FBvUC8DiQB8L6AOnwI1fq778%2Bsvy2sYVUBjkczwCswiRuIuhvxwAAAAASUVORK5CYII%3D'].join('');
function getWidth(id) {
	var x = thdRatings.read(id);
	if(!x) x = 0;
	return (x*8)+'px';
}
function SetWidth(event, par, child) {
	var x=event.pageX;
	var left = $getPos(par).x;
	var newWidth = x-left+4;
	if (newWidth>80) newWidth = 80;
	newWidth = parseInt(newWidth * 10 / 80);
	newWidth *= 8;
	child.style.width=newWidth+'px';
	return parseInt(newWidth * 100 / 80);
}
function addRatingThread(thdId) { // add the rating interface to the thread page
	var tUL=$xf('//div[@id="ml"]/UL/LI/UL');
	if(tUL) {
		var LI=$el($ec('LI'), tUL);
		var A=$el($ec('A', { 'style': 'background: white'}), LI);
//		$el($t('- Config'), A);
//		$ev.Add(A, "click", __config, false);
		var rate=$ec('DIV', { 'style': 'background: #cccccc url('+loStar+') 0 50% repeat-x; width:80px; height:16px; padding:0; margin: 0;vertical-align:middle;' });
		rate = $ef(rate, A);
		rate.id='rateback_'+thdId;
		var rateTop=$ec('DIV', { 'style': 'background: url('+hiStar+') 0 50% repeat-x; width:0px; height:16px; padding:0; margin: 0;vertical-align:middle; opacity:0.5;' });
		rateTop = $ef(rateTop, rate);
		rateTop.id='rate_'+thdId;
		rateTop.style.width=getWidth(rateTop.id);
		$ev.Add(rate, 'mouseover', function(e) {
			var x=e.target;
			var p=e.currentTarget;
			var c=x;
			if(p==x)
				c=x.firstChild
			c.style.opacity='0.9';
			SetWidth(e, p, c);
		}, true);
		$ev.Add(rate, 'mouseout', function(e) {
			var x=e.target;
			var p=e.currentTarget;
			var c=x;
			if(p==x) 
				c=x.firstChild;
			c.style.opacity='0.5';
			// revert stored rating
			c.style.width=getWidth(c.id);
		}, true);
		$ev.Add(rate, 'click', function(e) {
			var x=e.target;
			var p=e.currentTarget;
			var c=x;
			if(p==x) 
				c=x.firstChild;
			// this also sets the thread last in database - safest from being dropped
			thdRatings.set(c.id, parseInt(SetWidth(e, p, c)/10));
		}, true);
		$ev.Add(rate, 'mousemove', function(e) {
			var x=e.target;
			var p=e.currentTarget;
			var c=x;
			if(p==x) 
				c=x.firstChild;
			SetWidth(e, p, c);
		}, true);
	}
}
function sortByRating(el) { 
	var ord=0;
	var theTr;
	var trs=$xo('./TBODY/TR[TD[2][@class="news"]]', el);
	trs.forEach(function(tr) {
		theTr = tr;
		ord++;
		$xu('./TD[3]/A', tr).forEach(function(a) {
			var thdId=a.getAttribute('href').replace(/forum\-replies\.php\?t=(\d+)/i, '$1');
			a.parentNode.parentNode.id = 'thd_'+thdId;
			var td = $xf('./TD', theTr);
			td.style.width="90px";
			td.style.borderBottom="1px solid #cccccc";
			td.innerHTML='';
			var rate=$ec('DIV', { 'style': 'background: url('+loStar+') 0 50% repeat-x; width:80px; height:16px; padding:0; margin: 0;vertical-align:middle;' });
			rate = $ef(rate, td);
			rate.id='rateback_'+thdId;
			var rateTop=$ec('DIV', { 'style': 'background: url('+hiStar+') 0 50% repeat-x; width:0px; height:16px; padding:0; margin: 0;vertical-align:middle; opacity:0.25;' });
			rateTop = $ef(rateTop, rate);
			rateTop.id='rate_'+thdId;
			rateTop.style.width=getWidth(rateTop.id);
			theTr.id="t"+thdId;
			theTr.className = "pp"+("00"+(10-thdRatings.read(rateTop.id))).substr(-2)+"oo"+("000"+ord).substr(-3);
			$ev.Add(rate, 'mouseover', function(e) {
				var x=e.target;
				var p=e.currentTarget;
				var c=x;
				if(p==x)
					c=x.firstChild
				c.style.opacity='0.5';
				SetWidth(e, p, c);
			}, true);
			$ev.Add(rate, 'mouseout', function(e) {
				var x=e.target;
				var p=e.currentTarget;
				var c=x;
				if(p==x) 
					c=x.firstChild;
				c.style.opacity='0.25';
				// revert stored rating
				c.style.width=getWidth(c.id);
			}, true);
			$ev.Add(rate, 'click', function(e) {
				var x=e.target;
				var p=e.currentTarget;
				var c=x;
				if(p==x) 
					c=x.firstChild;
				// this also sets the thread last in database - safest from being dropped
				thdRatings.set(c.id, parseInt(SetWidth(e, p, c)/10));
			}, true);
			$ev.Add(rate, 'mousemove', function(e) {
				var x=e.target;
				var p=e.currentTarget;
				var c=x;
				if(p==x) 
					c=x.firstChild;
				SetWidth(e, p, c);
			}, true);
		});
	});
	// theTR contains the last child - this childs nextSibling is the one we insertBefore
	if(theTr) {
		theTr = theTr.nextSibling;
		trs.sort(function(a,b) { return a.className > b.className });
		trs.forEach(function(tr) {
			$eb(tr, theTr);
		});
	}
}
if(/forum\-recent\.php/.test(document.location.href)) { // recent threads page
// replace the ajax call
	unsafeWindow.showmythreads=function(){ return; }
	window.setInterval(function() {
		GM_xmlhttpRequest({
			method:'GET',
			url:document.location.protocol+'//'+document.location.host+'/ajax-mythreads.php',
			headers: {
				"User-Agent":window.navigator.userAgent,
				"Accept":"text/html,text/xml,text/plain",
				"Cookie":document.cookie
			},
			onload: function(resp) {
				if(resp.status == "200") {
					var txt=resp.responseText;
					if(txt.charAt(0) == '<') {
						var el=$ec('DIV', { 'style' : 'display:none;' });
						el = $el(el, document.body);
						el.innerHTML=txt;
						sortByRating(el.firstChild);
						var d=$i("new");
						while(d.firstChild) {
							$ed(d.firstChild);
						}
						$el(el.firstChild, d);
						$ed(el);
					}
				}
			}
		});
	}, 10000);
	var tbl=$xf('./TABLE', $i('new'));
	sortByRating(tbl);
}
if(/forum\-replies\.php/.test(document.location.href)) { // in a thread
	var thrdId = unsafeWindow.t;
	var id='rate_'+thrdId;
	addRatingThread(thrdId);
	var currRate=thdRatings.get(id); // use get here, that updates the data base so this thread, if present, is put to the tail, last to be pruned
}
{
	var cfg=_config_addBlock('Rating Track');
	var lab=$ec('LABEL', { 'for': 'mcl_track' });
	$el($t('Threads to track '), lab);
	$el(lab, cfg);
	$el($ec('INPUT', { 'type' : 'text', 'id' : 'mcl_track', 'value' : cfgTrack.toString() }), cfg);
	$ev.Add($i('mcl_track'), 'blur', function() { 
		var n=parseInt($i('mcl_track').value); 
		GM_setValue('track', n.toString()); 
		thdRatings.setmax(n);
	}, false);
}
