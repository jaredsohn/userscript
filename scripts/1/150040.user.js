// ==UserScript==
// @name           eksi sozluk beta uc nokta geri getirme aparati
// @description    ek$i sozluk beta'nin basliklar kismini standart eksi sozluk gorunumune benzetip uc noktalari ekler.
// @namespace      https://userscripts.org/users/62169
// @include        http://beta.eksisozluk.com/*
// @run-at         document-start
// @updateUrl      https://userscripts.org/scripts/source/150040.meta.js
// @downloadUrl    https://userscripts.org/scripts/source/150040.user.js
// @version        1.0.6
// ==/UserScript==

function eksiRestyleTopics() {
	var topicList = document.getElementById('partial-index');
	if (topicList) {
		topics = topicList.getElementsByTagName("li");
		for (var i = 0; i < topics.length; i++) {
			var topic = topics[i].firstChild;
			if (topic.childNodes.length > 1) {
				// topic has >1 entries today.
				var entryCount = document.createElement("span");
				entryCount.innerHTML = "(" + topic.childNodes[1].innerHTML + ")";
				topic.removeChild(topic.childNodes[1]);
				topics[i].appendChild(entryCount);
			}
			
			var topicParamPos = topic.href.indexOf("?");
			if (topicParamPos >= 0) {
				var topicUrl = topic.href;
				topic.href = topicUrl.substr(0, topicParamPos);
				var points = document.createElement("a");
				points.className = "topicpoints";
				points.href = topicUrl;
				points.innerHTML = "...";
				topics[i].appendChild(points);
				topics[i].addEventListener('mouseover', function(event) { this.lastChild.style.visibility = 'visible'; }, true);
				topics[i].addEventListener('mouseout', function(event) { this.lastChild.style.visibility = 'hidden'; }, true);
			}
		}
	}
}

function eksiPageLoad() {
	eksiRestyleTopics();
	var target = document.getElementById('partial-index');
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	if (MutationObserver) {
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				eksiRestyleTopics();
			});
		});
		var config = { attributes: false, childList: true, characterData: true }
		observer.observe(target, config);
	} else {
		target.addEventListener("DOMNodeInserted", function(event) {
			eksiRestyleTopics();
		}, true);
	}
}

var hideStyle = document.createElement("style");
hideStyle.type = "text/css";
hideStyle.innerHTML = ".topic-list.partial li > a { display: inline; padding-right: 0 !important; } .topic-list.partial li > a.topicpoints {visibility: hidden; margin-left: 4px;} .topic-list li {margin: 2px 0 3px 0; line-height: 17px;}";
document.documentElement.appendChild(hideStyle);

if (navigator.appName == "Opera") {
	eksiPageLoad();
} else {
	window.addEventListener("DOMContentLoaded", function load(event) {
		eksiPageLoad();
	});
}