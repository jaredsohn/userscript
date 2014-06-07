// ==UserScript==
// @name           Soup.io Annoying Long Text Remover
// @include        http://www.soup.io/everyone
// @description    Removes annoying posts on soup.io. It scans for long text posts (usually advs) every sec or when you press the n or j key and then removes them.
// @author         Quba (http://userscripts.org/users/quba)
// ==/UserScript==

window.addEventListener("keydown", KeyCheck, true);
window.setTimeout(removeLongPostsAndSchedule, 1000);

function removeLongPostsAndSchedule() {
	removeLongPosts();
	window.setTimeout(removeLongPostsAndSchedule, 1000);
};


function removeLongPosts() {
	var postDiv = document.getElementById("posts");
	var posts = getElementsByClassName("post", "div", postDiv);
	for (var i = 0; i < posts.length; i++) {
		var bodyLength = 0;
		var post = posts[i];
		var bodies = getElementsByClassName("body", "div", post);
		for (var b = 0; b < bodies.length; b++) {
			var body = bodies[b];
			bodyLength = body.innerHTML.length;
		}

		if(bodyLength>1000) {
			post.parentNode.removeChild(post);
		}
	}
};


/**
 * Based on http://stackoverflow.com/questions/2129303/greasemonkey-javascript-key-press-help/2129405#2129405
 */
function KeyCheck(e) {
	var key = e.keyCode;
	switch (key) {
		case 78: // "n"
		case 74: // "j"
			removeLongPosts();
			break;
	}
};


/**
 * Developed by Robert Nyman, http://www.robertnyman.com
 * Code/licensing: http://code.google.com/p/getelementsbyclassname/
 */
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};
