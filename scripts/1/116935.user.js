// ==UserScript==
// @name YouTube HTML5 everywhere
// @version 0.0.3
// @namespace http://userscripts.org/users/miguillo
// @description Replace all old YouTube embed code (Flash) with new one (either Flash or HTML5 depending on your choice on YouTube).
// @include *
// @exclude http://www.youtube.com/*
// @exclude https://www.youtube.com/*
// ==/UserScript==

// given extension isolation, we can pollute global namespace
var debug = false;

// list from http://code.google.com/apis/youtube/player_parameters.html
// updated on 2011-10-31
var knownParams = [ 'autohide', 'autoplay', 'border', 'cc_load_policy',
		'color', 'color1', 'color2', 'controls', 'disablekb', 'enablejsapi',
		'egm', 'fs', 'hd', 'iv_load_policy', 'loop', 'modestbranding',
		'origin', 'playerapiid', 'playlist', 'rel', 'showinfo', 'showsearch',
		'start', 'theme' ];

var processingLocked = false;

// utilities
if (typeof String.prototype.startsWith != 'function') {
	/**
	 * @returns {Boolean}
	 */
	String.prototype.startsWith = function(s) {
		return this.slice(0, s.length) == s;
	};
}
if (typeof String.prototype.contains != 'function') {
	/**
	 * @returns {Boolean}
	 */
	String.prototype.contains = function(s) {
		return this.indexOf(s) != -1;
	};
}

/**
 * @returns {Array}
 */
function toArray(collection) {
	var a = Array(collection.length);
	for ( var i = 0; i < collection.length; i++) {
		a[i] = collection[i];
	}
	return a;
};

/**
 * @param paramsArray
 * @returns {String}
 */
function makeParamString(paramsArray) {
	return filterUnknownUrlParams(paramsArray).join("&");
}

/**
 * @param params
 * @returns {Array}
 */
function filterUnknownUrlParams(params) {
	return params.filter(function(param) {
		if (knownParams.indexOf(param.split("=", 1)[0]) != -1) {
			return true;
		} else {
			console.warn("YouTube HTML5 everywhere:", "unknown URL parameter",
					param);
			return false;
		}
	});
}

function createNode(id, paramsString, width, height) {
	var iframe = document.createElement("iframe");

	iframe.setAttribute("class", "youtube-player");
	iframe.setAttribute('type', 'text/html');
	if (width != null) {
		iframe.setAttribute('width', width);
	}
	if (height != null) {
		iframe.setAttribute('height', height);
	}
	iframe.setAttribute('frameborder', 0);

	var src = "//www.youtube.com/embed/" + id;
	if (paramsString != "")
		src = src + "?" + paramsString;
	iframe.setAttribute('src', src);
	return iframe;
}

function replaceNode(oldNode, id, paramsString, width, height) {
	var node = createNode(id, paramsString, width, height);
	oldNode.parentNode.replaceChild(node, oldNode);
	if (debug)
		console.debug("Transformed frog to prince: ", oldNode, node);
}

function filterPage() {
	if (debug)
		console.log("Executing YouTube HTML5 everywhere.");
	var consideredNodes =
	/* all <object>s */
	toArray(document.getElementsByTagName("object")).
	/* and */
	concat(
	/* all <embed>s that aren't contained in an <object> */
	toArray(document.getElementsByTagName("embed")).filter(function(node) {
		if (node.parentNode.nodeName.toLowerCase() == "object")
			return false;
		else
			return true;
	}));

	transform(consideredNodes);
}

function isZero(s) {
	return s==null || s=="" || s=="0" || s=="0px";
}

function transform(consideredNodes) {

	for ( var i = 0; i < consideredNodes.length; i++) {
		var node = consideredNodes[i];
		var embedChild = null;
		if (node.nodeName.toLowerCase() == "object") {
			// it can contains an <embed>
			var children = node.childNodes;
			for ( var j = 0; j < children.length; j++) {
				var child = children[j];
				if (child.nodeName.toLowerCase() == "embed") {
					embedChild = child;
					break;
				}
			}
		}

		var src = node.getAttribute('src'); // case <embed src="xxx">
		if (src == null) // case <object data="xxx">
			src = node.getAttribute('data');
		if (src == null && embedChild != null) // case <object><embed
			// src="xx"></object>
			src = embedChild.getAttribute('src');

		var view = document.defaultView;
		var nodeStyle = view.getComputedStyle(node, "");
		var childStyle = null;
		try { childStyle = view.getComputedStyle(embedChild, ""); } catch (e) {}

		var width = node.getAttribute('width');
		if (isZero(width) && embedChild != null)
			width = embedChild.getAttribute('width');
		if (isZero(width) && nodeStyle != null) // CSS select on object
			width = nodeStyle.getPropertyValue('width');
		if (isZero(width) && childStyle != null)
			width = childStyle.getPropertyValue('width');
		if (isZero(width))
			width = '100%';

		var height = node.getAttribute('height');
		if (isZero(height) && embedChild != null)
			height = embedChild.getAttribute('height');
		if (isZero(height) && nodeStyle != null)
			height = nodeStyle.getPropertyValue('height');
		if (isZero(height) && childStyle != null)
			height = childStyle.getPropertyValue('height');
		if (isZero(height))
			height = '100%';

		/*
		 * TODO keep class and id attribute, perhaps others
		 * TODO keep style attribute
		 */

		var id = "";
		var paramsString = null;
		var found = false;

		/* extract url of the form http://www.youtube.com/v/xxxxxx?a=b&c=d */
		var youtubevRegex = /^(http:|https:|)\/\/www.youtube.com\/v\/(.*)$/;
		if (src != null) {
			if (src.match(youtubevRegex)) {
				if (debug)
					console.log("Found //www.youtube.com/v/", node);
				var idAndParamsString = RegExp.$2;
				var idAndParams = idAndParamsString.split(/[&;\?]/);
				id = idAndParams.shift();
				paramsString = makeParamString(idAndParams);

				// no error thrown until now, all parsing done, it seams that it
				// will work
				found = true;
			}
			if (found) {
				replaceNode(node, id, paramsString, width, height);
			} else if (debug // when debugging, search for missed links
					&& (src.toLowerCase().contains("youtube") || src
							.toLowerCase().contains("ytimg"))) {
				alert("YouTube5 everywhere: please check log.");
				console.info("YouTube5 everywhere",
						"Found but not matched, so not replaced", node);
			}
		}
	}
}

function main() {
	filterPage();

	document.addEventListener("DOMNodeInserted", nodeInserted, false);
	function nodeInserted(event) {
		if (!processingLocked) { // javascript is still monothread I hope
			processingLocked = true;
			// TODO parse only the added node, not the whole page
			filterPage();
			processingLocked = false;
		}
	}
}

main();
