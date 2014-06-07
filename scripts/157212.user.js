// ==UserScript==
// @name        Memrise pinyin colorization
// @namespace   memrisepinyin
// @include     http://www.memrise.com/course/*
// @version     1
// @grant none
// ==/UserScript==

colors = {
	"1": "#aabbff",  //blue
	"2": "#aaffaa",  //green
	"3": "#ffffaa",  //yellow
	"4": "#ffaaaa"   //red
}

log = function(obj) {
	unsafeWindow.console.log(obj)
}
if(typeof(String.prototype.trim) === "undefined") {
	String.prototype.trim = function() {
		return String(this).replace(/^\s+|\s+$/g, '');
	};
}

var text_regex = /(\W|^)\w{2,4}\d(\W|$)/


startScript = function() {
	$('.row-value, .extra-info').each(function() {
		me = $(this)
		if (text_regex.test(me.text())) {
			if (me.find(".pinyin-color").length == 0) {
				var words = me.text().trim().split(/ +/);
				out = "";
				$.each(words, function(){
					number = this.match(/\d/)[0];
					color = colors[number];
					out += "<span class='pinyin-color' style='background-color: " + 
					color + "; padding: 3px'>" + this + "</span> ";
				})
				me.html(out)
			}
		}
	})
	setTimeout(startScript, 500)
}

startScript()
