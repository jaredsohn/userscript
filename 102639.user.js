// ==UserScript==
// @name           Ponychan NameBlocker
// @namespace      http://protractorninja.blogspot.com
// @description    A nickblocker for ponychan. People whose posts/images you dislike? Hide their posts/images! Click [bi]/[ui] to block/show images from that user; [bp]/[up] to do the same for posts.
// @include		   *ponychan.*
// @exclude		   *ponychan.net/chan/
// ==/UserScript==

// Elements by class name finder
/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
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

// Actual content
var hasInnerText = (document.getElementsByTagName("body")[0].innerText != undefined) ? true : false;

// Yeaaaaaahhh.
//var blackList = eval(GM_getValue("blackList", "new Array()"));
//blackList.push("Matias");
//alert(blackList.length);
//GM_setValue("blackList", uneval(blackList));

var postBlackList = eval(GM_getValue("postBlackList", "new Array()"));
var imageBlackList = eval(GM_getValue("imageBlackList", "new Array()"));

init();

// This takes an element and gets its inner text (sans HTML notation)
function parseText(element) {
	var content;
	if(!hasInnerText) {
		content = element.textContent;
	} else {
		content = element.innerText;
	}
	return content;
} 

// Returns the <blockquote> that contains the text content of the post
function getContentElement(post) {
	var list = post.getElementsByTagName('blockquote');
	if(list.length > 0) return list[0]
	else return null;
}

// Returns the <span> that contains the post number
function getPostNumberElement(post) {
	var list = getElementsByClassName('reflink', 'span', post);
	if(list.length > 0) return list[0];
	else return null;
}

function getPostWhiteSpaceElement(post) {
	if(getImageElement(post) == null) return null;
	var list = post.getElementsByTagName('br');
	if(list.length > 0) return list[0];
	else return null;
}

// Returs the <span> that contains the name of the poster
function getTripElement(post) {
	var tripElem;
	if(getLabelElement(post).innerHTML.indexOf("postertrip") > -1) {
		tripElem = getElementsByClassName('postername', 'span', post)[0];
	} else {
		tripElem = document.createElement('div');
		tripElem.innerHTML = "NO_TRIP";
	}
	return tripElem;
}

// Returns the post time element
function getTimeElement(post) {
	var timeElem;
	if(getLabelElement(post).innerHTML.indexOf("posttime") > -1) {
		timeElem = getElementsByClassName('posttime', 'span', post)[0];
	} else {
		timeElem = document.createElement('div');
		timeElem.innerHTML = "NO_TIME";
	}
	return timeElem;
}

// Returs the <span> that contains the tripcode of the poster
function getNameElement(post) {
	var nameElem;
	if(getLabelElement(post).innerHTML.indexOf("postername") > -1) {
		nameElem = getElementsByClassName('postername', 'span', post)[0];
	} else {
		nameElem = document.createElement('div');
		nameElem.innerHTML = "NO_NAME";
	}
	return nameElem;
}

//Returns the label element (the <label> that contains the checkbox, name, trip, and time)
function getLabelElement(post) {
	var labelElem;
	labelElem = post.getElementsByTagName('label')[0];
	return labelElem;
}

// Returns the element containing the file size, if included.
function getFileSizeElement(post) {
	if(getElementsByClassName('filesize', 'span', post).length == 0) return null;
	var fileSizeElem;
	fileSizeElem = getElementsByClassName('filesize', 'span', post)[0];
	return fileSizeElem;
}

// Returns the element containing the link to the file, if included.
function getFileLinkElement(post) {
	if(getElementsByClassName('filesize', 'span', post).length == 0) return null;
	var fileLinkElement;
	var elements = post.getElementsByTagName('a');
	for (var i=0;  i<elements.length; i++) {
		if(elements[i].target != undefined) {
			fileLinkElement = elements[i];
			break;
		}
	}
	return fileLinkElement;
}

// Returns the element containing the image, if included.
function getImageElement(post) {
	if(getElementsByClassName('filesize', 'span', post).length == 0) return null;
	var imageElement;
	//var postID = parseText(getPostNumberElement(post)).replace("No.", "");
	var elements = post.getElementsByTagName("img");
	imageElement = elements[0];
	return imageElement;
} 

// Gets the "hide me" element in a post
function getElementFromID(post, id) {
	for(var i=0; i<post.childNodes.length; i++) {
		if(post.childNodes[i].id == id) return post.childNodes[i];
	}
	return null;
}

function findIndex(search, string) {
	for(var i=0; i<search.length; i++) {
		if(search[i] == string) return i;
	}
	return -1;
}

// Parses through all replies in a thread and hides those that match certain criteria.
function init() {
	var replies = getElementsByClassName('reply');
	if(replies[0].id == "watchedthreads") replies.shift();
	var post;
	var name;
	var trip;
	var time;
	var content;
	var modBPL;
	var modIBL;
	for (var i=0; i<replies.length; i++) {
		post = replies[i];
		name = parseText(getNameElement(post));
		trip = parseText(getTripElement(post));
		content = parseText(getContentElement(post));
		time = parseText(getTimeElement(post));
		var buttonsBox = getElementsByClassName('extrabtns', 'span', post)[0];
		// currently Blocked (posts)
		if(findIndex(postBlackList, name) > -1) {
			hidePost(post);
			modPBL = document.createElement('a');
			modPBL.innerHTML = "<font size = 1>[up]</font>";
			buttonsBox.appendChild(modPBL);
			modPBL.addEventListener('click', function() {togglePostBlackList(this, this.parentNode.parentNode)}, true);
		// currently unblocked (posts)
		} else {
			modPBL = document.createElement('a');
			modPBL.innerHTML = "<font size = 1>[bp]</font>";
			buttonsBox.appendChild(modPBL);
			modPBL.addEventListener('click', function() {togglePostBlackList(this, this.parentNode.parentNode)}, true);
		}
		// currently Blocked (images)
		if(findIndex(imageBlackList, name) > -1) {
			hideImage(post);
			modIBL = document.createElement('a');
			modIBL.innerHTML = "<font size = 1>[ui]</font>";
			buttonsBox.insertBefore(modIBL, modPBL);
			modIBL.addEventListener('click', function() {toggleImageBlackList(this, this.parentNode.parentNode)}, true);
		// currently unblocked (images)
		} else {
			modIBL = document.createElement('a');
			modIBL.innerHTML = "<font size = 1>[bi]</font>";
			buttonsBox.insertBefore(modIBL, modPBL);
			modIBL.addEventListener('click', function() {toggleImageBlackList(this, this.parentNode.parentNode)}, true);
		}
	}
}

function filterPosts() {
	var replies = getElementsByClassName('reply');
	if(replies[0].id == "watchedthreads") replies.shift();
	var post;
	var name;
	var trip;
	var time;
	var content;
	for (var i=0; i<replies.length; i++) {
		post = replies[i];
		name = parseText(getNameElement(post));
		trip = parseText(getTripElement(post));
		content = parseText(getContentElement(post));
		time = parseText(getTimeElement(post));
		resetPost(post);
		if(findIndex(postBlackList, name) > -1) hidePost(post);
		if(findIndex(imageBlackList, name) > -1) hideImage(post);
	}
}

function togglePostBlackList(button, post) {
	var name = parseText(getNameElement(post));
	var index = findIndex(postBlackList, name);
	if(index == -1) {
		postBlackList.push(name);
		GM_setValue("postBlackList", uneval(postBlackList));
		hidePost(post);
		button.innerHTML = "<font size = 1>[up]</font>";
	}
	else {
		postBlackList.splice(index, 1);
		GM_setValue("postBlackList", uneval(postBlackList));
		unhidePost(post);
		button.innerHTML = "<font size = 1>[bp]</font>";
	}
	
	filterPosts();
}

function toggleImageBlackList(button, post) {
	var name = parseText(getNameElement(post));
	var index = findIndex(imageBlackList, name);
	if(index == -1) {
		imageBlackList.push(name);
		GM_setValue("imageBlackList", uneval(imageBlackList));
		hideImage(post);
		button.innerHTML = "<font size = 1>[ui]</font>";
	}
	else {
		imageBlackList.splice(index, 1);
		GM_setValue("imageBlackList", uneval(imageBlackList));
		unhideImage(post);
		button.innerHTML = "<font size = 1>[bi]</font>";
	}
	
	filterPosts();
}

// This takes a post as a parameter and will hide all of its contents, totally killing it.
function killPost(post) {
	post.style.display = "none";
} 

// Counteracts the above.
function revivePost(post) {
	post.style.display = "inline";
}

// This will replace the contents of the post (sans the label) with a button saying "Hidden, click to show."
function hidePost(post) {
	var message = document.createElement('a');
	message.innerHTML = "<font size = 2>[hide]</font>";
	message.id = "hideme";
	post.insertBefore(message, post.childNodes[10]);
	message.addEventListener('click', function() { toggleHiddenPost(this.parentNode) }, true);
	toggleHiddenPost(post);
}

// Replaces an image with emptiness; shows if the label is clicked.
function hideImage(post) {
	if(getImageElement(post) != null) {
		var message = document.createElement('a');
		message.innerHTML = "<font size = 2>[hide]</font>";
		message.id = "hideimg";
		post.insertBefore(message, post.childNodes[10]);
		message.addEventListener('click', function() { toggleHiddenImage(this.parentNode) }, true);
		toggleHiddenImage(post);
	}
}

// Undoes the corresponding above function.
function unhidePost(post) {
	if(getContentElement(post).style.display == "none") toggleHiddenPost(post);
	post.removeChild(getElementFromID(post, "hideme"));
}

// Undoes the corresponding above function.
function unhideImage(post) {
	if(getImageElement(post) != null) {
		if(getImageElement(post).style.display == "none") toggleHiddenImage(post);
		post.removeChild(getElementFromID(post, "hideimg"));
	}
}

function toggleHiddenImage(post) {
	// If the post is currently hidden
	if(parseText(getElementFromID(post, 'hideimg')).indexOf("show") > -1) {
		getElementFromID(post, 'hideimg').innerHTML = "<font size = 2>[hide image]</font>";
		if(getFileSizeElement(post) != null) getFileSizeElement(post).style.display = "inline";
		if(getFileLinkElement(post) != null) getFileLinkElement(post).style.display = "inline";
		if(getImageElement(post) != null) {
			getImageElement(post).style.display = "inline";
			getPostWhiteSpaceElement(post).style.display = "block";
		}
	}
	// If the post is currently showing
	else {
		getElementFromID(post, 'hideimg').innerHTML = "<font size = 2>[show image]</font>";
		if(getFileSizeElement(post) != null) getFileSizeElement(post).style.display = "none";
		if(getFileLinkElement(post) != null) getFileLinkElement(post).style.display = "none";
		if(getImageElement(post) != null) {
			getImageElement(post).style.display = "none";
			getPostWhiteSpaceElement(post).style.display = "none";
		}
	}
}

// This toggles the hidden posts.
function toggleHiddenPost(post) {
	// If the post is currently hidden
	if(parseText(getElementFromID(post, 'hideme')).indexOf("show") > -1) {
		getElementFromID(post, 'hideme').innerHTML = "<font size = 2>[hide]</font>";
		if(getFileSizeElement(post) != null) getFileSizeElement(post).style.display = "inline";
		if(getFileLinkElement(post) != null) getFileLinkElement(post).style.display = "inline";
		if(getImageElement(post) != null) {
			getImageElement(post).style.display = "inline";
			getPostWhiteSpaceElement(post).style.display = "block";
		}
		getContentElement(post).style.display = "block";
	}
	// If the post is currently showing
	else {
		getContentElement(post).style.display = "none";
		getElementFromID(post, 'hideme').innerHTML = "<font size = 2>[show]</font>";
		if(getFileSizeElement(post) != null) getFileSizeElement(post).style.display = "none";
		if(getFileLinkElement(post) != null) getFileLinkElement(post).style.display = "none";
		if(getImageElement(post) != null) {
			getImageElement(post).style.display = "none";
			getPostWhiteSpaceElement(post).style.display = "none";
		}
	}
}

function resetPost(post) {
	if(getElementFromID(post, 'hideme') != null) post.removeChild(getElementFromID(post, "hideme"));
	if(getElementFromID(post, 'hideimg') != null) post.removeChild(getElementFromID(post, "hideimg"));
	if(getFileSizeElement(post) != null) getFileSizeElement(post).style.display = "inline";
	if(getFileLinkElement(post) != null) getFileLinkElement(post).style.display = "inline";
	if(getImageElement(post) != null) {
		getImageElement(post).style.display = "inline";
		getPostWhiteSpaceElement(post).style.display = "block";
	}
	getContentElement(post).style.display = "block";
}