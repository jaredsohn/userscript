// ==UserScript==
// @name       Quick Scroll
// @namespace  FireAway-剑仙乘仙剑
// @version    1.0
// @description  快速翻页
// @updateURL          http://userscripts.org/scripts/source/401286.meta.js
// @downloadURL      http://userscripts.org/scripts/source/401286.user.js
// @exclude     *://*.bilibili.tv/*
// @exclude     *://*.bilibili.tv
// @exclude     *://*.bilibili.*
// @exclude     *://bilibili.*/*
// @require                http://firebfp.duapp.com/JS/jq.js
// @copyright  FireAway~
// @run-at document-end
// ==/UserScript==
localStorage.setItem("isQSAdded", "false");
var cssStr = ".quickScroll {top: 48%; position: fixed; right: 3.5%; z-index:999;}.quickScroll span {opacity: 0.5; background: 50% 50% no-repeat no-repeat rgba(0, 0, 0, 0.701961) scroll; border-radius: 5px 0px 0px 5px; cursor: pointer; height: 36px; width: 36px; position: fixed; border: 1px rgb(255, 255, 255) solid; -webkit-transition : 0.5s all ease-in-out; -moz-transition : 0.5s all ease-in-out; -ms-transition : 0.5s all ease-in-out; transition : 0.5s all ease-in-out; } .quickScroll span:hover {opacity: 1; -webkit-transition : 0.5s all ease-in-out; -moz-transition : 0.5s all ease-in-out; -ms-transition : 0.5s all ease-in-out; transition : 0.5s all ease-in-out; } #up {background-image: url(http://0.firebfp.duapp.com/images/up.png); margin-top: -78px; } #previous {background-image: url(http://0.firebfp.duapp.com/images/previous.png); margin-top: -38px; } #next {background-image: url(http://0.firebfp.duapp.com/images/next.png); margin-top: 2px; } #down {background-image: url(http://0.firebfp.duapp.com/images/down.png); margin-top: 42px; }";
var cssDom = document.createElement("style");
cssDom.id = "cssDom";
document.head.appendChild(cssDom);
cssDom.innerHTML = cssStr;

var scStr = "<span class='quickScroll' id='quickScroll'> <span id='up'></span> <span id='previous'></span> <span id='next'></span> <span id='down'></span> </span>";
var scDom = document.createElement("span");
scDom.id = "scDom";

if (self.frameElement == null) {
	if (!eval(localStorage.getItem('isQSAdded'))) {
		document.body.appendChild(scDom);
		scDom.outerHTML = scStr;
		localStorage.setItem("isQSAdded", "true");
	}
}

var up = document.getElementById("up");
var previous = document.getElementById("previous");
var next = document.getElementById("next");
var down = document.getElementById("down");
var screenHeight = window.innerHeight;
var totalHeight = document.body.scrollHeight;
up.addEventListener("click", function() {
	pageSwift(-totalHeight);
}, false);
previous.addEventListener("click", function() {
	pageSwift(-screenHeight);
}, false);
next.addEventListener("click", function() {
	pageSwift(screenHeight);
}, false);
down.addEventListener("click", function() {
	pageSwift(totalHeight);
}, false);

function pageSwift(height2Scroll) {
	var screenHeight = window.innerHeight;
	var totalHeight = document.body.scrollHeight;
	var scrolledHeight = document.body.scrollTop || window.scrollY;
	var availScrollHeight = totalHeight - screenHeight;
	// window.scrollTo(0,height2Scroll + scrolledHeight);
	if (navigator.userAgent.indexOf("Firefox") == -1) {
		$('html, body').animate({
			scrollTop: (height2Scroll + scrolledHeight)
		}, 500);
	} else {
		var i = 0;
		var finalScrollTop = ((height2Scroll + scrolledHeight) < 0 ? 0 : (height2Scroll + scrolledHeight)) >= availScrollHeight ? availScrollHeight : (height2Scroll + scrolledHeight) < 0 ? 0 : (height2Scroll + scrolledHeight);
		//Method 1
		// var perMili = Math.abs(finalScrollTop - scrolledHeight) / 100;
		// var isDown = (finalScrollTop - scrolledHeight) > 0 ? true : false;

		// var scroll = self.setInterval(function() {
		//  i++;
		//  if (isDown) {
		//      document.body.scrollTop = scrolledHeight + perMili * i;
		//      if (document.body.scrollTop>= finalScrollTop) {
		//          window.clearInterval(scroll);
		//      }
		//  } else {
		//      document.body.scrollTop = scrolledHeight - perMili * i;
		//      if (document.body.scrollTop <= finalScrollTop) {
		//          window.clearInterval(scroll);
		//      }
		//  }
		// }, 1);

		//Method 2
		var perMili = (finalScrollTop - scrolledHeight) / 80;

		var scroll = self.setInterval(function() {
			i++;
			var next = scrolledHeight + perMili * i;
			window.scrollTo(0, next);
			if (i >= 80) {
				window.clearInterval(scroll);
			}
		}, 1);
	}
}

function keyDown(e) {　　　　
	var keycode = e.which;　　　　
	if (keycode == 37) {
		pageSwift(-screenHeight);
	} else if (keycode == 39) {
		pageSwift(screenHeight);
	}
}　　
//document.onkeydown = keyDown;

function notExist(id) {
	var dom = document.getElementById(id) || getFromFrames(id) || false;
	return dom;
}

function getFromFrames(id) {
	// for (var i = 0; i < window.frames.length; i++) {

	// };
	return false;
}
window.onbeforeunload = function() {
	localStorage.setItem("isQSAdded", "false");
	return;
}
