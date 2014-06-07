// ==UserScript==
// @name Damn Facebook Quizzes
// @namespace tag:rahul.narain@gmail.com,2009-03:damnquizzes
// @description G- the damn quizzes -TFO of Facebook
// @include http://www.facebook.com/*
// ==/UserScript==

(function () {
    // helper functions
    var byclass = function (name) {return document.getElementsByClassName(name);};
    var when = function (cond,body) {if (cond()) body(); else setTimeout(function(){when(cond,body);}, 500);};
    var isapp = function (icon) {var src = icon.childNodes[0].src; return /app_/.exec(src) || /hidden/.exec(src);};
    var clone = function (list) {return [].slice.call(list,0);};
    var remove = function (node) {node.parentNode.removeChild(node);};
    var ancestor = function (node,cond) {while (!cond(node)) node = node.parentNode; return node;};
    var either = function (a,b) {if (byclass(a).length > 0) return byclass(a)[0]; else return byclass(b)[0];};
    var click = function (node) {
	var e = document.createEvent("MouseEvents");
	e.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
	node.dispatchEvent(e);
    };
    var removeapps = function () {
	var icons = clone(byclass('UIIntentionalStory_Icon'));
	for (var i = 0; i < icons.length; i++)
	    if (isapp(icons[i]))
		remove(ancestor(icons[i], function(n){return /UIStory/.exec(n.className);}));
    };
    // actual execution
    var n = byclass('UIIntentionalStory').length;
    removeapps();
    var n2 = byclass('UIIntentionalStory').length;
    if(n2 <= n/2) {
	click(either('UIIntentionalStream_ShowMore','pager_next').childNodes[0]);
	when(function(){return byclass('UIIntentionalStory').length > n2}, removeapps);
    }
})()
