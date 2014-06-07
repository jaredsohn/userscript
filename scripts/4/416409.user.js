
// ==UserScript== 
// @name          e621 AFTagger
// @version       1.0
// @description   e621 quick anthro/feral tagger
// @author        Lizardite

// @namespace     e621
// @run-at        document-end
// @include       http://e621.net/post
// @include       https://e621.net/post
// @include       http://e621.net/post/*
// @include       https://e621.net/post/*
// @match         http://e621.net/post
// @match         https://e621.net/post
// @match         http://e621.net/post/*
// @match         https://e621.net/post/*
// ==/UserScript== 

var h = document.createElement("script");

h.innerHTML = "(" + function() {
	var options = {
		0: "None",
		1: "Anthro",
		2: "Feral"
	};
	var defaultOption = 1;

	var optionTags = {
		0: "",
		1: "anthro",
		2: "feral"
	}

	var createSidebarSection = function(title) {
		var div = document.createElement("div");
		div.style.marginBottom = "1em";

		var titleElem = document.createElement("h5");
		titleElem.innerText = title;
		div.appendChild(titleElem);

		document.getElementsByClassName("sidebar")[0].appendChild(div);
		return div;
	}

	var buildSelector = function(options, defaultOption) {
		var selector = document.createElement("select");

		for (var optionId in options) {
			var option = document.createElement("option");
			option.value = optionId;
			option.innerText = options[optionId];
			if (defaultOption == optionId) {
				option.selected = 1;
			}
			selector.appendChild(option);
		}

		return selector;
	}

	var getElementPost = function(elem) {
		while (elem) {
			var matches = elem.id.match(/^p([0-9]+)$/);
			if (matches) {
				return parseInt(matches[1]);
			}
			elem = elem.parentElement;
		}

		return false;
	}

	var posts = document.getElementsByClassName("thumb");
	for (var i = 0; i < posts.length; i++) {
		var score = posts[i].getElementsByClassName("post-score")[0];
		score.remove();
		score.style.width = "100%";
		posts[i].appendChild(score);

		var selector = buildSelector(options, defaultOption);
		selector.className = "mtt-posttype";
		score.appendChild(selector);
	}

	var sendHolder = createSidebarSection("AFTagger");

	var sendButton = document.createElement("button");
	sendButton.onclick = function(e) {
		var postData = [];
		var postElems = document.getElementsByClassName("mtt-posttype");
		for (var i = 0; i < postElems.length; i++) {
			var tagScript = optionTags[postElems[i].value];
			if (tagScript) {
				var postId = getElementPost(postElems[i]);
				if (postId !== false) {
					TagScript.run(postId, tagScript);
				}
			}
		}
	}
	sendButton.innerHTML = "Send post types";
	sendHolder.appendChild(sendButton);
} + ")();";

h.type = "text/javascript";
document.body.appendChild(h);
