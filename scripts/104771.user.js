// ==UserScript==
// @author         Konfuze
// @name           Alizar's highlighter
// @namespace      habrawide
// @include        http://*.habrahabr.ru/*
// @include        http://habrahabr.ru/*
// ==/UserScript==

(function() {
	function getElementsByClassName(name, node) {
		var r = [];
		var re = new RegExp("(^| )" + name + "( |$)");
                
                var parent = node || document;

		var e = parent.getElementsByTagName("*");
		for ( var i = 0, len = e.length; i < len; i++ )
			if ( re.test(e[i].className) ) r.push( e[i] );

		return r;
	}

	var list = getElementsByClassName('fn nickname url');

	for(var i = 0; i < list.length; i++) {
		if(list[i].href === 'http://alizar.habrahabr.ru/') {
			var that = list[i];
			
			//don't go that way, kids!
			var title = that.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('h2')[0];
			title.innerHTML = "<img style='vertical-align: middle' src='http://habrastorage.org/storage/f67c3ca0/8c47837f/ec641a53/705bea19.png' /> " + title.innerHTML;
			
			var topicTitle = getElementsByClassName('topic', title)[0];

			topicTitle.style.color = "#000";
			topicTitle.style.backgroundColor = "#FFF300";
			topicTitle.style.fontStyle = "italic";
		}
	}
})();