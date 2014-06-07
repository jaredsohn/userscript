// ==UserScript==
// @name           Float Reply Area for new Douban
// @namespace      http://stellit.blogspot.com
// @description    Float Reply Area for new Douban
// @include        http://www.douban.com/group/topic/*
// @include        http://www.douban.com/review/*
// @include        http://www.douban.com/forum/*
// @include        http://www.douban.com/note/*
// @include        http://www.douban.com/event/discussion/*
// @include        http://www.douban.com/subject/discussion/*
// @include        http://www.douban.com/photos/photo/*
// @exclude        http://www.douban.com/group/topic/*/edit
// @exclude        http://www.douban.com/forum/
// @author         Stellit
// @version        0.1.1
// ==/UserScript==

//Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.pack.js';
// GM_JQ.src="file:///Users/stellit/Desktop/src/jquery.ui-1.5.1/jquery-1.2.6.js";
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

/*
 * jQuery UI Draggable
 *
 * Copyright (c) 2008 Paul Bakaus
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Draggables
 */

// Check if jQuery's loaded


var floatMe = function(){
	//utils
	var $j = unsafeWindow.jQuery.noConflict();
	var createContent = function(id,tagName){
		return "<" + tagName + " id='" + id + "'></" + tagName + ">";
	}
	var createColor = function(colorName, colorCode){
		$j("#color-bar").append(createContent("color-" + colorName, "a"));
		$j('#color-' + colorName).attr("href","javascript:;")
		$j('#color-' + colorName).attr("onclick", "javascript:document.getElementById('last').style.backgroundColor='"+colorCode+"';")
		$j('#color-' + colorName).text("color");
		$j('#color-' + colorName).css({"color": "" + colorCode, "background": "" + colorCode, 
									   "border": "1px gray solid", "margin": "2px"});
	}
	//logic
	var config = {
		colors:["#EEFFFF", "yellow", "cyan"]
	}
	var init = function () {
		var floatDiv = $j("div.txd");
		var replyArea = $j("textarea#last");
		// var colorBar = prependElement(floatDiv, "color-bar", "div");
		floatDiv.prepend(createContent( "color-bar", "div"));
		var colorBar = $j("#color-bar");
		floatDiv.wrap("<div id='floatFrame'></div>");
		var floatFrame = $j("#floatFrame");
		floatFrame.prepend(createContent("handle-bar", "a"));
		var handle = $j("#handle-bar");
		floatDiv.attr("id", "floatme");
		floatDiv.css({"margin-top":"10px", width: "98%", top: "10px"});
		floatFrame.css({ position:"fixed", bottom: "3%", right:"0.5%", width: "35%", 
						 padding:"5px", border:"1px #FAEFE4 double", background: "#FFF6EE",
						 opacity:"0.80"});
		replyArea.attr("rows","20");
		replyArea.attr("cols","20");
		replyArea.css({ width: "100%", border:"1px gray solid",
						opacity:"0.80", "background-color": config.colors[0]
		});
		colorBar.text("colors:");
		createColor("red","#EE4455");
		createColor("orange","#f0ab12");
		createColor("yellow","#FFFF99");
		createColor("green","#EEFFFF");
		createColor("cyan","#019fc6");
		createColor("blue","#6699ff");
		createColor("purple","#dd77ff");
		handle.attr("title", "click here to hide this frame");
		handle.css({
			position: "absolute",
			display: "block",
			top: "1%",
			height: "8px",
			width: "8px",
			left: "1%",
			background: "cyan",
			border: "#AFADAB 1px solid",
			"vertical-align": "top",
			"font-size": "10px"
		});
		handle.attr("href", "javascript:;");
		handle.attr("onclick", "javascript:$('#floatme').slideToggle(\"slow\");");

    }

	return {
		init:init
	}
}();
var GM_wait = function() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { floatMe.init(); }
}

GM_wait();