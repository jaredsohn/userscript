// ==UserScript==
// @name           Slipstreaming SL.se
// @namespace      http://labs.mimmin.com
// @description    Gör det snabbare att planera en resa på Storstockholms Lokaltrafiks hemsida.
// @include        http://reseplanerare.sl.se/*
// ==/UserScript==

var $ = function(){
	if (/^#.+$/.test(arguments[0])) {
		return document.getElementById(arguments[0].match(/^#(.+)$/)[1]);
	} else {
		return document.getElementsByTagName(arguments[0]);
	}
};

Object.prototype.getByAttr = function(attr, value){
	var set = this[0];
	for (var key in set) {
		if (typeof(set[key][attr]) != 'undefined' && set[key][attr] == value) {
			return set[key];
		}
	}
};

Object.prototype.setAttr = function(attr, value){
	var set = this[0];
	for (var key in set) {
		if (typeof(set[key][attr]) != 'undefined') {
			set[key].setAttribute(attr, value);
		}
	}
};

Object.prototype.wrap = function(wrapper, attributes){
	var el = this[0];
	var newNode = document.createElement(wrapper);
	for (key in attributes) {
		if (typeof(attributes[key]) == 'string' || typeof(attributes[key]) == 'number') {
			newNode.setAttribute(key, attributes[key]);
		}
	}
	var parent = el.parentNode;
	newNode.appendChild(el.cloneNode(true));
	parent.replaceChild(newNode, el); 
};

var getWhat = function(){
	if (sl_selects.length == 3) {
		return sl_selects[1];
	} else {
		return sl_selects[0];
	}
}

var getWhen = function(){
	if (sl_selects.length == 3) {
		return sl_selects[2];
	} else {
		return sl_selects[1];
	}
}

var makeBoundingBox = function(el, id){
	[el].wrap('div', {
		'id': id,
		'style': 'float:left;height:' + el.offsetHeight + 'px;width:' + el.offsetWidth + 'px;' 
	});
};

console.debug();

var sl_selects = $('select');
var sl_options;

if (window.location.href.indexOf('&getstop=1') != -1) {
	sl_options = getWhat().childNodes;
	[sl_options].setAttr('selected', false);
	[sl_options].getByAttr('value', 0).setAttribute('selected', true);

	if ($('#time').value.match(/([0-9]{2}):([0-9]{2})/)[1] >= 22) {
		sl_options = getWhen().childNodes;
		[sl_options].setAttr('selected', false);
		[sl_options].getByAttr('value', '+1').setAttribute('selected', true);
	}
}


// Make special
var timer1;
makeBoundingBox(getWhat(), 'sl_what');
getWhat().addEventListener('mouseover', function(){
	clearTimeout(timer1);
	this.multiple = true;
	this.style.position = "absolute";
}, false);

getWhat().addEventListener('mouseout', function(){
	var ele = this;
	timer1 = setTimeout(function(){
		ele.multiple = false;
		ele.style.position = "static";
	}, 100);
}, false);

var timer2;
makeBoundingBox(getWhen(), 'sl_when');
getWhen().addEventListener('mouseover', function(){
	clearTimeout(timer2);
	this.multiple = true;
	this.style.position = "absolute";
}, false);

getWhen().addEventListener('mouseout', function(){
	var ele = this;
	timer2 = setTimeout(function(){
		ele.multiple = false;
		ele.style.position = "static";
	}, 100);
}, false);

