// ==UserScript==
// @name          Highlight VK Chat!
// @namespace     http://serebryakov.info/userscripts
// @description	  Highlights VK group chat messages with specified words
// @include       http://vk.com/*
// @include       http://www.vk.com/*
// @include       https://vk.com/*
// @include       https://www.vk.com/*
// @match         http://vk.com/*
// @match         http://*.vk.com/*
// @match         https://vk.com/*
// @match         https://*.vk.com/*
// @version       1.1
// @copyright     2013, Sergey Serebryakov
// @grant         none
// ==/UserScript==

// tr.im_in
// tr.im_out
// div.msg_item

var Container = {
	addCSSRule: function(color) {
		var css = document.createElement("style");
		css.setAttribute("type", "text/css");
		css.innerHTML = ".message_colored { background-color: " + color + "; }";
		document.getElementsByTagName("head")[0].appendChild(css);
	},
	
	augment: function(functionToAugment, functionToInject) {
		return function() {
			functionToAugment.apply(this, arguments);
			window.setTimeout(functionToInject, 500); // let them load
		};
	},
	
	inject: function(functionToInject) {
		IM.loadHistory = this.augment(IM.loadHistory, functionToInject).bind(IM);
	},
	
	colorAll: function() {
		var filter = function(array, predicate) {
			var result = [];
			for (var i = 0; i < array.length; i++) {
				if (predicate(array[i])) {
					result.push(array[i]);
				}
			}
			return result;
		};
		
		var forEach = function(array, fn) {
			for (var i = 0; i < array.length; i++) {
				fn(array[i]);
			}
		};		
		
		var colorByClassName = function(className, subclassName) {
			var messageRows = document.getElementsByClassName(className);
			var matchedRows = filter(messageRows, function(messageRow) {
				var messageTextDiv = messageRow.getElementsByClassName(subclassName)[0];
				var text = messageTextDiv.innerHTML;
				return /(рома)|(роман)|(ромич)/i.test(text);
			});
			forEach(matchedRows, function(messageRow) {
				messageRow.classList.add("message_colored");
			});
		};
		
		var classNames = [
			{sup: "im_in", sub: "im_msg_text"},
			{sup: "im_out", sub: "im_msg_text"},
			{sup: "msg_item", sub: "mi_text"}];
		classNames.forEach(function(pair) {
			colorByClassName(pair.sup, pair.sub);
		});
	},

	main: function() {
		var COLOR = "#cc99ff";
		this.addCSSRule(COLOR);
		if (IM) this.inject(this.colorAll);
		this.colorAll();
	}
}

var executeInPageContext = function() {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = "var Container = {";
	for (var item in Container) {
		script.textContent += item + ":" + Container[item] + ",";
	}
	script.textContent += "};";
	script.textContent += "Container.main();";
	document.body.appendChild(script); // run the script
}

var loadHandler = function() {
	console.log('hilite-vk-chat loaded');
    executeInPageContext();
}

window.addEventListener("load", loadHandler, false);