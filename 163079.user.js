// ==UserScript==
// @name       RainyMood
// @namespace  RainyMood
// @version    0.1
// @description  Hide iframes and app suggestion part on rainymood page
// @include        http://*.rainymood.com/*
// @match          http://*.rainymood.com/*
// @copyright  2012+, Wayne Wang
// ==/UserScript==

var _hideElement = function(ele){
    ele.style.display = 'none';
};

var _hideIFrames = function(){
    var iframes = document.getElementsByTagName('iframe');
    for(var i=0; i<iframes.length; i++){
        _hideElement(iframes[i]);
    }
};

var _hideFooters = function(){
    _hideElement(document.getElementById('footer'));
};

// DOMContentLoaded only works under modern browsers, but that's enough for me. see below link for details.
// https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference/DOMContentLoaded_(event)?redirectlocale=en-US&redirectslug=Mozilla_event_reference%2FDOMContentLoaded_%28event%29

document.addEventListener('DOMContentLoaded',function(){
    _hideFooters();
	_hideIFrames();
});