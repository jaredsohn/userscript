// ==UserScript==
// @name		ebaySearchPictures
// @namespace	http://au.geocities.com/jplsek2000/
// @description	Add pictures in search where no preview picture exists
// @version     7.0.0
// @include		http://*search*.ebay.*/*
// @include		http://*listings.ebay.*/*
// @include		http://my.ebay.*/ws/eBayISAPI.dll*
// @include		http://stores.ebay.*/*
// @include     http://*shop.ebay.*/*
// ==/UserScript==
// (c) 2005-2010 John Plsek, PC GraFix
function $i(s) { return document.getElementById(s); }
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
function $eb(newNode, node) {
	return node.parentNode.insertBefore(newNode, node);
}
function $el(newNode, par) {
	return par.appendChild(newNode);
}
function $p(p) {
	var result = [], xpr = document.evaluate(p, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(next=xpr.iterateNext()) result.push(next);
	return result;
}
function $xGet(url, cb) {
	GM_xmlhttpRequest({
		method: "GET",
		headers: { "User-Agent":"Mozilla/5.0 Gecko","Accept":"text/html,text/xml,text/plain" },
		url: url,
		onload: function(xhr) { cb(xhr); }
	});
}
var $ev= {
	_reg: null,
	Init: function() {
		if (this._reg == null) {
			this._reg = [];
			$ev.Add(window, "_unload", this.CleanUp);
		}
	},
	Add: function(o, t, f, c) {
		this.Init();
		var r=(t=="_unload"?"unload":t);
		if (typeof o == "string") o = $i(obj);
		if (o == null || f == null) return false;
		if(o.addEventListener) o.addEventListener(r, f, c);
		this._reg.push({o:o, t:t, f:f, c:c});
		return true;
	},
	CleanUp: function() {
		$ev._reg.forEach(function(e) {
			if(e.t=="unload") e.f();
			if(e.o.removeEventListener) e.o.removeEventListener(e.t,e.f,e.c);
		});
		$ev._reg = null;
	}
};

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

var defaultSize=parseInt(GM_getValue('thumb_size', '80'));
var mySize=parseInt(GM_getValue('myEbay_thumb_size', '64'));
var shopSize=parseInt(GM_getValue('shop_thumb_size', '80'));
var storeSize=parseInt(GM_getValue('stores_thumb_size', '80'));

var maxSize = defaultSize;
if(/http:\/\/my\.ebay\./i.test(document.location.href)) maxSize=mySize;
if(/http:\/\/stores\.ebay\./i.test(document.location.href)) maxSize=storeSize;
if(/http:\/\/shop\.ebay\./i.test(document.location.href)) maxSize=shopSize;

$ev.Add(document.body, 'load', function() {
	$p('//IMG').forEach(function(img) {	if (img.naturalHeight == 0) img.src=img.src; })
}, false);

function makeThumb(inX, inY, maxX, maxY) {
	var retVal={changed:false, widthChanged:false, heightChanged:false, width:inX, height:inY};
	if(inX>maxX || inY>maxY) {
		retVal.changed=true;
		var xRatio=1.0*inX/(1.0 * maxX);
		var yRatio=1.0*inY/(1.0 * maxY);
		if(yRatio>xRatio) {
			retVal.height=maxY;
			retVal.heightChanged=true;
			retVal.width=Math.ceil((1.0*inX)/yRatio);
		}
		else {
			retVal.width=maxX;
			retVal.widthChanged=true;
			retVal.height=Math.ceil((1.0*inY)/xRatio);
		}
	}
	return retVal;
}
function imageLoad(e) {
	var tImg=e.currentTarget;
	var img=$i(tImg.alt);
	if(img) {
		var dimension=makeThumb(tImg.width, tImg.height, maxSize, maxSize);
		if(dimension.changed) {
			if(dimension.widthChanged) {
				img.style.width=dimension.width+"px";
				img.style.height="auto";
			}
			if(dimension.heightChanged) {
				img.style.height=dimension.height+"px";
				img.style.width="auto";
			}
		}
		img.src=tImg.src;
		img.style.border="none";
	}
}
var tImgs=[];
function replaceImage(img, url) {
	var tImg=$ec('IMG', { 'alt':img.id });
	tImgs.push(tImg);
	tImg.addEventListener("load", imageLoad, false);
	tImg.src=url;
	img.style.border='solid #00FF00 4px';
}
var noThumbsUrl = '//IMG[contains(@src,"iconPic_20x20.gif") or contains(@src, "_p__64x15.gif")]';
$p(noThumbsUrl).forEach(function(noThumb, i) {
	noThumb.id="Thumb"+i;
	noThumb.style.border="solid red 4px";
	var alink = noThumb.parentNode.parentNode.nextSibling.firstChild.firstChild;
	var theUrl=alink.href;
	$xGet(theUrl, function(resp) {
		if(resp.status=="200") {
			var txt=resp.responseText;
			var lnk=txt.indexOf('class="ic-m"');
			if(lnk<0) return;
			var img=txt.indexOf('<img ',lnk);
			if(img<0) return;
			var src=txt.indexOf('src="', img);
			if(src<0) return;
			var srcEnd=txt.indexOf('"', src+5);
			if(srcEnd<0) return;
			replaceImage(noThumb, txt.substring(src+5,srcEnd));
		}
	});
});
var cfg=_config_addBlock('ebay Search Pictures');
function makeEntry(gmid, txt, val) {
	var id = gmid;
	var lab=$ec('LABEL', { 'for': id, 'style': 'width:160px; text-align:right; display:block; float:left; padding-right:10px;' });
	$el($t(txt), lab);
	$el(lab, cfg);
	$el($ec('INPUT', { 'type' : 'text', 'size':'2', 'maxLength':'3', 'id' : id, 'value' : val.toString() }), cfg);
	$ev.Add($i('thumb_size'), 'blur', function() { 
		var n=parseInt($i(id).value); 
		GM_setValue(gmid, n.toString()); 
	}, false);
	$el($ec('BR', {'style':'clear:both;'}), cfg);
}
makeEntry('thumb_size', 'Default thumb size ', defaultSize);
makeEntry('myEbay_thumb_size', 'My Ebay thumb size ', mySize);
makeEntry('stores_thumb_size', 'Stores thumb size ', storeSize);
makeEntry('shop_size', 'Shop thumb size ', shopSize);
GM_registerMenuCommand( "Ebay Search Config", __config );