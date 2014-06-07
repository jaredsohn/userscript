// ==UserScript==
// @name           Flickriver Background Switcher
// @namespace      http://labs.mimmin.com
// @description    Change the background color on flickriver by simply double clicking.
// @include        http://www.flickriver.com/*
// @include        http://flickriver.com/*
// ==/UserScript==

document.getElementsByClassName = function(clsName){
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className.indexOf(" ") >= 0){
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++){
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
};

var $ = function(){
	if (/^#.+$/.test(arguments[0])) {
		return document.getElementById(arguments[0].match(/^#(.+)$/)[1]);
	} else if (/^\..+$/.test(arguments[0])) {
		return document.getElementsByClassName(arguments[0].match(/^\.(.+)$/)[1]);
	} else {
		return document.getElementsByTagName(arguments[0]);
	}
};

Object.prototype.getCss = function(attr){
	var set = this[0];
	if (typeof(set.length) != 'undefined') {
		for (var i = 0; i < set.length; i++) {
			return document.defaultView.getComputedStyle(set[i], null).getPropertyValue(attr);
		}
	} else {
		return document.defaultView.getComputedStyle(set, null).getPropertyValue(attr);
	}
};

Object.prototype.setCss = function(attr, value){
	var set = this[0];
	var defaultStyle = [ set ].getCss(attr);
	if (typeof(set.length) != 'undefined') {
		for (var i = 0; i < set.length; i++) {
			set[i].style.setProperty(attr, value, '');
		}
	} else {
		set.style.setProperty(attr, value, '');
	}
	return defaultStyle;
};


var bg, h_bg, h_mrg, h_pt, h_pb, isWhite = false;

var switchBg = function(){
	if (isWhite) {
		[ $('body') ].setCss('background-color', bg);
		[ $('#header') ].setCss('background-color', h_bg);
		[ $('#header') ].setCss('margin-top', h_mrg);
		[ $('#header') ].setCss('padding-top', h_pt);
		[ $('#header') ].setCss('padding-bottom', h_pb);
		isWhite = false;
	} else {
		bg = [ $('body') ].setCss('background-color', '#f5f5f5');
		h_bg = [ $('#header') ].setCss('background-color', '#000');
		h_mrg = [ $('#header') ].setCss('margin-top', '0');
		h_pt = [ $('#header') ].setCss('padding-top', '1em');
		h_pb = [ $('#header') ].setCss('padding-bottom', '8px');
		isWhite = true;
	}
};

switchBg();


$('#photos').addEventListener('dblclick', switchBg, false);
$('.top-toolbar')[0].addEventListener('dblclick', switchBg, false);

