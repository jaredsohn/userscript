// Last Updated: 06-16-2013
// By SiNiquity (-Bane)
// 
// == VERSION HISTORY ==
// Version 0.3
// - Fixed bug with quote ids not being displayed in the preview
// - Started work on list rendering (not yet complete)
// - Discovered bug with rendering empty tags, e.g. [b][/b] or [b]   [/b].

// Version 0.2
// - Made images inline
//
// Version 0.1:
// - First created!
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Tribalwar Instant Preview
// @namespace     SiNiquity
// @description   Previews post as it's typed. Still in development!
// @version       0.3
// @include       *://*tribalwar.com/forums/showthread.php*
// ==/UserScript==

function getRealFirstChild(node) {
    var firstChild = node.firstChild;
	
    while(firstChild && ((firstChild.nodeType == 3 && !firstChild.nodeValue.trim()) || firstChild.nodeType == 8)) {
	firstChild = firstChild.nextSibling;
    }
    return firstChild;
}

if(!String.prototype.trimSpaces) {
    String.prototype.trimSpaces = function() {
	return this.replace(/^[\ \t]*/, "").replace(/[\ \t]*$/, "");
    };
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

var g_previewPostDiv = null;
var g_reply_textarea = null;
var handled_keyup = true;
var lastTypedValue = "";
var renderTagFns = {"QUOTE": renderQuote,
		    "FONT": renderFont,
		    "SIZE": renderSize,
		    "COLOR": renderColor,
		    "URL": renderURL,
		    "YOUTUBE": renderYoutube,
		    "HULU": renderHulu,
		    "IMG": renderImg,
		    "LIST": renderList,
		    "B": function(tag) { return document.createElement("B"); },
		    "I": function(tag) { return document.createElement("I"); },
		    "S": function(tag) { return document.createElement("S"); },
		    "INDENT": function(tag) { return document.createElement("BLOCKQUOTE")},
		    "LEFT": function(tag) {
			var div = document.createElement("div");
			div.setAttribute("align", "left");
			return div;
		    },
		    "CENTER": function(tag) {
			var div = document.createElement("div");
			div.setAttribute("align", "center");
			return div;
		    },
		    "RIGHT": function(tag) {
			var div = document.createElement("div");
			div.setAttribute("align", "right");
			return div;
		    }
};
var postRenderFns = {"QUOTE": postRenderQuote,
		     "IMG":   postRenderImg,
		     "YOUTUBE":   postRenderYoutube,
		     "HULU":   postRenderHulu,
		     "LIST":   postRenderList
};
var fileToSmiley = new Object();
var smileyToFile = new Object();
var rawTextRegex = null;

function initPreviewThread() {
    var g_reply_textarea = document.getElementById("vB_Editor_001_textarea");
    
}

function initPreview() {
    var qreply = document.getElementById("collapseobj_quickreply");
    if(qreply == null) return;
    var tr = getRealFirstChild(qreply);
    var td = getRealFirstChild(tr);
    var previewPanel = document.createElement("div");
    td.insertBefore(previewPanel, td.firstChild);
    previewPanel.className = "panel";

    var fieldset = document.createElement("fieldset");
    previewPanel.appendChild(fieldset);
    var legend = document.createElement("legend");
    fieldset.appendChild(legend);
    legend.appendChild(document.createTextNode("Post Preview"));

    g_preview_post = document.createElement("div");
    g_preview_post.setAttribute("id", "previewPost");
    g_preview_post.style.textAlign = "left";
    fieldset.appendChild(g_preview_post);

    g_reply_textarea = document.getElementById("vB_Editor_QR_textarea");
    g_reply_textarea.addEventListener("change", textAreaChange, false);
    g_reply_textarea.addEventListener("keypress", textAreaKeyPress, false);
    g_reply_textarea.addEventListener("keyup", textAreaKeyUp, false);
    
    var qreply_form = document.getElementById("qrform");
    qreply_form.addEventListener("submit", qrSubmitted, false);
}

function renderParseTree(root) {
    var tag = root.tag;
    if(tag == "#text") {
	return renderText(root.value);
    }

    var rendered = document.createDocumentFragment();
    var renderedTag = false;
    if(tag != "#root") {
	tag = root.tag[0];
	var tagName = root.tag[1].toUpperCase();
	if(root.nodeRef != null) {
	    // Generated tag due to out of order - only render if necessary
	    if(root.nodeRef.closingTag && root.children.length > 0) {
		renderedTag = renderTagFns[tagName](tag);
		if(renderedTag) rendered = renderedTag;
	    } else {
		// Do not render (not even the tag itself)
		renderedTag = null;
	    }
	} else {
	    if(root.closingTag) {
		if(root.children.length > 0) {
		    renderedTag = renderTagFns[tagName](tag);
		    if(renderedTag) rendered = renderedTag;
		}
	    }
	}
    } else {
	renderedTag = true;
    }

    for(var i in root.children) {
	var renderedChild = renderParseTree(root.children[i]);
	// Quit coding late at night... idk wtf this is here.
	// FIX ME
	if(renderedChild.firstChild 
	   && renderedChild.firstChild.nodeName == "BR"
	   && rendered.lastChild 
	   && rendered.lastChild.nodeName == "DIV") {
	    renderedChild.removeChild(renderedChild.firstChild);
	}
	rendered.appendChild(renderedChild);
    }

    if(renderedTag === false || (renderedTag && typeof postRenderFns[tagName] != "undefined")) {
	var postRendered = false;
	if(renderedTag !== false) {
	    postRendered = postRenderFns[tagName](rendered);
	}
	if(postRendered === false) {
	    rendered.insertBefore(renderText(root.tag[0]), rendered.firstChild);
	    if(root.closingTag) {
		rendered.appendChild(renderText(root.closingTag[0]));
	    }
	} else if(postRendered === null) {
	    // Do not render at all
	    rendered = document.createDocumentFragment();
	}
    }
    while(rendered.parentNode != null) {
	rendered = rendered.parentNode;
    }
    return rendered;
}

function parseText(rawText) {
    var root = {parent: null, tag: "#root", children: [], closingTag: null, nodeRef: null};
    var openTags = new Array();
    // Matches opening tag [TAG{=params}] or closing tag [/TAG].
    // Tag can be anything other than a closing bracket, equals sign, or /.
    // An equals sign denotes parameters follow
    // If opening tag, submatch 1 is defined with the tagname.
    // If closing tag, submatch 2 is defined with the tagname.
    var tagPattern = /\[(?:(?:([^\]=\/]+)[^\]]*)|(?:\/([^\]=\/]+)))\]/g;
    var currentIndex = 0;
    var tag, tagName;
    while(tag = tagPattern.exec(rawText)) {
	if(typeof tag[2] != "undefined") {
	    // Closing tag
	    tagName = tag[2].toUpperCase();
	    if(typeof openTags[tagName] != "undefined" && openTags[tagName].length > 0) {
		var enclosed = rawText.substring(currentIndex, tag.index);
		if(enclosed.trimSpaces().length > 0) {
		    root.children.push({parent: root, tag: "#text", value: enclosed});
		}

		var closedNode = openTags[tagName].pop();
		if(closedNode.nodeRef == null) {
		    closedNode.closingTag = tag;
		} else {
		    closedNode.nodeRef.closingTag = tag;
		}
		var badNodes = [];
		while(root != closedNode) {
		    badNodes.push(root);
		    openTags[root.tag[1].toUpperCase()].pop();
		    root = root.parent;
		}
		root = root.parent;
		while(badNodes.length > 0) {
		    var badNode = badNodes.pop();
		    if(badNode.nodeRef != null) {
			badNode = badNode.nodeRef;
		    }
		    var newNode = {parent: root, tag: badNode.tag, children: [], nodeRef: badNode};
		    root.children.push(newNode);
		    openTags[badNode.tag[1].toUpperCase()].push(newNode);
		    root = newNode;
		}
		currentIndex = tag.index + tag[0].length;
	    }
	} else {
	    // Opening tag
	    tagName = tag[1].toUpperCase();
	    if(typeof renderTagFns[tagName] == "function") {
		if(typeof openTags[tagName] == "undefined") {
		    openTags[tagName] = [];
		}
		var prologue = rawText.substring(currentIndex, tag.index);
		if(prologue.trimSpaces().length > 0) {
		    root.children.push({parent: root, tag: "#text", value: prologue});
		}
		var newNode = {parent: root, tag: tag, children: [], closingTag: null, nodeRef: null};
		openTags[tagName].push(newNode);
		root.children.push(newNode);
		root = newNode;
		currentIndex = tag.index + tag[0].length;
	    }
	}
    }
    var epilogue = rawText.substring(currentIndex);
    if(epilogue.trimSpaces().length > 0) {
	root.children.push({parent: root, tag: "#text", value: epilogue});
    }
    while(root.parent != null) {
	root = root.parent;
    }
    return root;
}

function generatePreview() {
    while(g_preview_post.firstChild) {
	g_preview_post.removeChild(g_preview_post.firstChild);
    }
    var renderedTree = renderParseTree(parseText(g_reply_textarea.value));
    while(renderedTree.firstChild && renderedTree.firstChild.nodeName == "BR") {
	renderedTree.removeChild(renderedTree.firstChild);
    }
    
    g_preview_post.appendChild(renderedTree);
}

function renderText(text) {
    var container = document.createDocumentFragment();
    // Check for smiley

    var match = null;
    var currentIndex = 0;
    while(match = rawTextRegex.exec(text)) {
	var prologue = text.substring(currentIndex, match.index);
	if(prologue.length > 0) {
	    container.appendChild(document.createTextNode(prologue));
	}
	if(typeof match[1] != "undefined") {
	    container.appendChild(document.createElement("br"));
	} else if(typeof match[2] != "undefined") {
	    var smiley = match[2];
	    var img = document.createElement("IMG");
	    img.setAttribute("src", smileyToFile[smiley].file);
	    img.setAttribute("alt", smiley);
	    img.setAttribute("title", smileyToFile[smiley].title);
	    img.setAttribute("class", "inlineimg");
	    container.appendChild(img);
	}
	currentIndex = match.index + match[0].length;
    }
    var epilogue = text.substring(currentIndex);
    if(epilogue.length > 0) {
	container.appendChild(document.createTextNode(epilogue));
    }
    return container;
}

function renderYoutube(tag) {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("width","640");
    iframe.setAttribute("height","390");
    iframe.setAttribute("frameborder","0");
    iframe.setAttribute("allowfullscreen","");
    iframe.setAttribute("title","Youtube video player");
    return iframe;
}

function renderHulu(tag) {
    var obj = document.createElement("object");
    obj.setAttribute("width","512");
    obj.setAttribute("height","296");
    return obj;
}

function renderURL(tag) {
    var param = /='([^']+)'|="([^"]+)"|=([^\]"]+)/g.exec(tag);
    if(param) {
	if(typeof param[1] != "undefined") {
	    param = param[1];
	} else if(typeof param[2] != "undefined") {
	    param = param[2];
	} else if(typeof param[3] != "undefined") {
	    param = param[3];
	} else {
	    param = param[0];
	}
	var link = document.createElement("a");
	link.setAttribute("href", param);
	link.setAttribute("target", "_blank");
	return link;
    }
    return false;
}

function renderImg(tag) {
    var img = document.createElement("IMG");
    return img;
}

function renderList(tag) {
    var paramMatch = tag.match(/=([^'"\]]+)|(?:'([^']+)')|(?:"([^"]+)")\]/);
    var orderedList = false;
    if(paramMatch) {
	var param = userMatch[1] || userMatch[2] || userMatch[3];
	if(param != "0") {
	    orderedList = true;
	}
    }
    var list;
    if(orderedList) {
	list = document.createElement("OL");
    } else {
	list = document.createElement("UL");
    }
    return list;
}


function renderFont(tag) {
    var param = /='([^']+)'|="([^"]+)"|=([^\]"]+)/g.exec(tag);
    if(param) {
	if(typeof param[1] != "undefined") {
	    param = param[1];
	} else if(typeof param[2] != "undefined") {
	    param = param[2];
	} else if(typeof param[3] != "undefined") {
	    param = param[3];
	} else {
	    param = param[0];
	}
	var font = document.createElement("font");
	font.setAttribute("face", param);
	return font;
    }
    return false;
}

function renderSize(tag) {
    var param = /='([^']+)'|="([^"]+)"|=([^\]"]+)/g.exec(tag);
    if(param) {
	if(typeof param[1] != "undefined") {
	    param = param[1];
	} else if(typeof param[2] != "undefined") {
	    param = param[2];
	} else if(typeof param[3] != "undefined") {
	    param = param[3];
	} else {
	    param = param[0];
	}
	var font = document.createElement("font");
	font.setAttribute("size", param);
	return font;
    }
    return false;
}

function renderColor(tag) {
    var param = /='([^']+)'|="([^"]+)"|=([^\]"]+)/g.exec(tag);
    if(param) {
	if(typeof param[1] != "undefined") {
	    param = param[1];
	} else if(typeof param[2] != "undefined") {
	    param = param[2];
	} else if(typeof param[3] != "undefined") {
	    param = param[3];
	} else {
	    param = param[0];
	}
	var font = document.createElement("font");
	font.setAttribute("color", param);
	return font;
    }
    return false;
}

/**
 * QUOTE OUTLINE:
 * <div style="margin:20px; margin-top:5px; ">
 * <div class="smallfont" style="margin-bottom:2px">Quote:</div>
 *   <table width="100%" cellspacing="0" cellpadding="6" border="0">
 *     <tbody>
 *       <tr>
 *         <td class="alt2" style="border:1px inset">
 *           <!-- Only if [QUOTE=USER] used -->
 *           <div> 
 *             Originally Posted by
 *             <strong>USER</strong>
 *             <!-- Only if [QUOTE=USER;ID] used -->
 *             <a rel="nofollow" href="showthread.php?p=ID#postID">
 *               <img class="inlineimg" border="0" alt="View Post" src="triton_images/buttons/viewpost.gif" title="View Post">
 *             </a>
 *           </div>
 *           <!-- QUOTED TEXT -->
 */
function renderQuote(tag, currentNode) {
    // Match either
    // 1. Non-quotes nor closing brackets
    // 2. Something wrapped in single quotes
    // 3. Something wrapped in double quotes
    // Followed by a closing bracket
    var userMatch = tag.match(/=([^'"\]]+)|(?:'([^']+)')|(?:"([^"]+)")\]/);
    var user = null;
    var postId = null;
    if(userMatch) {
	user = userMatch[1] || userMatch[2] || userMatch[3];
	var userSplit = user.split(";");
	if(userSplit.length == 2) {
	    var idMatch = userSplit[1].match(/^\d+$/);
	    if(idMatch) {
		user = userSplit[0];
		postId = idMatch[0];
	    }
	}
    }

    var quoteDiv = document.createElement("div");
    quoteDiv.style.margin = "20px";
    quoteDiv.style.marginTop = "5px";
    var quoteHeaderDiv = document.createElement("div");
    quoteDiv.appendChild(quoteHeaderDiv);
    quoteHeaderDiv.className = "smallfont";
    quoteHeaderDiv.style.marginBottom = "2px";
    quoteHeaderDiv.appendChild(document.createTextNode("Quote:"));
    var quoteTable = document.createElement("table");
    quoteDiv.appendChild(quoteTable);
    quoteTable.setAttribute("width", "100%");
    quoteTable.setAttribute("cellspacing", "0");
    quoteTable.setAttribute("cellpadding", "6");
    quoteTable.setAttribute("border", "0");
    var quoteTBody = document.createElement("tbody");
    quoteTable.appendChild(quoteTBody);
    var quoteTR = document.createElement("tr");
    quoteTBody.appendChild(quoteTR);
    var quoteTD = document.createElement("td");
    quoteTR.appendChild(quoteTD);
    quoteTD.className = "alt2";
    quoteTD.style.border = "1px inset";

    if(user != null) {
	var quotePosterDiv = document.createElement("div");
	quoteTD.appendChild(quotePosterDiv);
	quotePosterDiv.setAttribute("data-original-poster-div", "true");
	quotePosterDiv.appendChild(document.createTextNode("Originally Posted by "));
	var quoteBoldPoster = document.createElement("strong");
	quotePosterDiv.appendChild(quoteBoldPoster);
	quoteBoldPoster.appendChild(document.createTextNode(user));
	if(postId != null) {
	    quotePosterDiv.appendChild(document.createTextNode(" "));
	    var quoteLink = document.createElement("a");
	    quotePosterDiv.appendChild(quoteLink);
	    quoteLink.setAttribute("rel", "nofollow");
	    quoteLink.setAttribute("href", "showthread.php?p=" + postId + "#post" + postId);
	    var quoteLinkImg = document.createElement("img");
	    quoteLink.appendChild(quoteLinkImg);
	    quoteLinkImg.className = "inlineimg";
	    quoteLinkImg.setAttribute("border", "0");
	    quoteLinkImg.setAttribute("alt", "View Post");
	    quoteLinkImg.setAttribute("src", "triton_images/buttons/viewpost.gif");
	    quoteLinkImg.setAttribute("title", "View Post");
	}
    }
    return quoteTD;
}

/**
 * Need to move text node to src attribute
 */
function postRenderHulu(obj) {
    if(obj.firstChild.nodeType == 3 && obj.childNodes.length == 1) {
	var vid = obj.firstChild.nodeValue;
	vid = /[-_\w]+/g.exec(vid);
	if(vid) {
	    obj.removeChild(obj.firstChild);
	    var param1 = document.createElement("param");
	    param1.setAttribute("name", "movie");
	    param1.setAttribute("value", "http://www.hulu.com/embed/" + vid);
	    obj.appendChild(param1);
	    var param2 = document.createElement("param");
	    param2.setAttribute("name", "allowFullScreen");
	    param2.setAttribute("value", "true");
	    obj.appendChild(param2);
	    var embed = document.createElement("embed");
	    embed.setAttribute("src", "http://www.hulu.com/embed/" + vid);
	    embed.setAttribute("type", "application/x-shockwave-flash");
	    embed.setAttribute("allowFullScreen", "true");
	    embed.setAttribute("width", "512");
	    embed.setAttribute("height", "296");
	    obj.appendChild(embed);
	    return true;
	} else {
	    return null;
	}
    } else {
	return false;
    }
}

/**
 * Need to move text node to src attribute
 */
function postRenderYoutube(iframe) {
    if(iframe.firstChild.nodeType == 3 && iframe.childNodes.length == 1) {
	var vid = iframe.firstChild.nodeValue;
	vid = /[-_\w]+/g.exec(vid);
	if(vid) {
	    iframe.setAttribute("src", "http://www.youtube.com/embed/" + vid + "?hd=1");
	    iframe.removeChild(iframe.firstChild);
	    return true;
	} else {
	    return null;
	}
    } else {
	return false;
    }
}

/**
 * Need to move text node to src attribute
 */
function postRenderImg(img) {
    if(img.firstChild.nodeType == 3 && img.childNodes.length == 1) {
	img.setAttribute("src", img.firstChild.nodeValue);
	img.removeChild(img.firstChild);
	return true;
    } else {
	return false;
    }
}

/**
 * PHPBB strips one line break on each side of the quote if it exists
 */ 
function postRenderQuote(quoteTD) {
    var firstChild = quoteTD.firstChild;
    var lastChild = quoteTD.lastChild;
    // Skip original poster div if present
    if(firstChild && firstChild.nodeType == 1 && firstChild.getAttribute("data-original-poster-div")) {
	firstChild = quoteTD.firstChild.nextSibling;
    }
    if(firstChild && firstChild.nodeType == 1 && firstChild.nodeName == "BR") {
	quoteTD.removeChild(firstChild);
    }
    if(lastChild && lastChild.nodeType == 1 && lastChild.nodeName == "BR") {
	quoteTD.removeChild(lastChild);
    }
    return true;
}

function postRenderList(list) {
    var node = list.firstChild;
    if(!node || (node.nodeType == 3 && node.nodeValue.trimSpaces() == "")) {
	return null;
    }

    while(node) {
	var next = node.nextSibling;
	if(node.nodeType == 3) {
	    var items = node.nodeValue.split("[*]");
	    for(var i = 0; i < items.length; i++) {
		if(items[i] != "") {
		    var li = document.createElement("li");
		    li.appendChild(document.createTextNode(items[i]));
		    list.insertBefore(li, node);
		}
	    }
	    list.removeChild(node);
	} 
	node = next;
    }
    return true;
}

function textAreaChange(e) {
    var newVal = g_reply_textarea.value;
    console.log("Change!");
    console.log(".value:  " + newVal);
    console.log(".getAtt: " + g_reply_textarea.getAttribute("value"));
    if(g_preview_post && newVal != lastTypedValue) {
	generatePreview();
    }
}

function textAreaKeyPress(e) {
    if(g_preview_post) {
	if(!handled_keyup) {
	    // Key press is a delayed event, meaning on keypress the textarea
	    // value will not be updated. However, if a key is held, multiple
	    // key press events will be fired and the textarea WILL be updated.
	    // It will, however, always be one character behind, but the keyUp
	    // handler will take care of this.
	    generatePreview();
	}
	handled_keyup = false;
    }
}

function textAreaKeyUp(e) {
    // Value may not have changed if key wasn't a printable character
    var newVal = g_reply_textarea.value;
    if(g_preview_post && newVal != lastTypedValue) {
	generatePreview();
	handled_keyup = true;
	lastTypedValue = newVal;
    }
}

function qrSubmitted(e) {
    // Fire changed event
    changeEvent = document.createEvent("HTMLEvents");
    changeEvent.initEvent("change", true,  true);
    g_reply_textarea.dispatchEvent(changeEvent);
}

function initSmileys() {
    fileToSmiley["images/smilies/sex.gif"] = {smiley: ":sex:", title: "Sex"};
    fileToSmiley["images/smilies/biggrin.gif"] = {smiley: ":D", title: "Big Grin"};
    fileToSmiley["images/smilies/bandit.gif"] = {smiley: ":bandit:", title: "bandito"};
    fileToSmiley["images/smilies/roller.gif"] = {smiley: ":roller:", title: "roller"};
    fileToSmiley["images/smilies/huh.gif"] = {smiley: ":huh:", title: "Huh?"};
    fileToSmiley["/forums/images/smilies/rofl.gif"] = {smiley: ":rofl:", title: "rofl"};
    fileToSmiley["/forums/images/smilies/browsmiley.gif"] = {smiley: ":brows:", title: "browsmiley"};
    fileToSmiley["images/smilies/flag.gif"] = {smiley: ":flag:", title: "Flag"};
    fileToSmiley["images/smilies/deal.gif"] = {smiley: ":deal:", title: "deal"};
    fileToSmiley["images/smilies/gayfight2.gif"] = {smiley: ":gayfight:", title: "Gayfight2"};
    fileToSmiley["images/smilies/twist.gif"] = {smiley: ":twist:", title: "Twist"};
    fileToSmiley["images/smilies/ninja.gif"] = {smiley: ":ninja", title: "ninja"};
    fileToSmiley["images/smilies/50pages.gif"] = {smiley: ":50pages:", title: "50 pages"};
    fileToSmiley["images/smilies/redface.gif"] = {smiley: ":o:", title: "Embarrassment"};
    fileToSmiley["images/smilies/angel.gif"] = {smiley: ":angel:", title: "angel"};
    fileToSmiley["images/smilies/pimp.gif"] = {smiley: ":dapimp:", title: "pimp"};
    fileToSmiley["images/smilies/fu.gif"] = {smiley: ":fu:", title: "FU"};
    fileToSmiley["images/smilies/bdaysmile.gif"] = {smiley: ":birthday:", title: "birthday"};
    fileToSmiley["/forums/images/smilies/argue.gif"] = {smiley: ":argue:", title: "argue"};
    fileToSmiley["images/smilies/boogie.gif"] = {smiley: ":boogie:", title: "Boogie"};
    fileToSmiley["images/smilies/wave.gif"] = {smiley: ":wave:", title: "Wave"};
    fileToSmiley["images/smilies/cheers.gif"] = {smiley: ":cheers:", title: "cheers"};
    fileToSmiley["images/smilies/no.gif"] = {smiley: ":no:", title: "no"};
    fileToSmiley["images/smilies/hitit.gif"] = {smiley: ":hitit:", title: "Hit it"};
    fileToSmiley["images/smilies/worried.gif"] = {smiley: ":worried:", title: "worried"};
    fileToSmiley["images/smilies/confused3.gif"] = {smiley: ":confused:", title: "Confused"};
    fileToSmiley["images/smilies/frown.gif"] = {smiley: ":(", title: "Frown"};
    fileToSmiley["images/smilies/eek.gif"] = {smiley: ":eek:", title: "EEK!"};
    fileToSmiley["images/smilies/lol.gif"] = {smiley: ":lol:", title: "lol"};
    fileToSmiley["images/smilies/bigthumb.gif"] = {smiley: ":bigthumb:", title: "Big Thumb"};
    fileToSmiley["images/smilies/pignored.gif"] = {smiley: ":pignored:", title: "pignored bitch!"};
    fileToSmiley["/forums/images/smilies/satan.gif"] = {smiley: ":satan:", title: "satan"};
    fileToSmiley["/forums/images/smilies/ugh.gif"] = {smiley: ":ugh:", title: "ugh"};
    fileToSmiley["images/smilies/simmadown.gif"] = {smiley: ":chill:", title: "Chill"};
    fileToSmiley["images/smilies/hft.gif"] = {smiley: ":happy:", title: "Hft"};
    fileToSmiley["images/smilies/boohoo.gif"] = {smiley: ":boohoo:", title: "boohoo"};
    fileToSmiley["images/smilies/crbaby.gif"] = {smiley: ":baby:", title: "Cry Baby"};
    fileToSmiley["images/smilies/old.gif"] = {smiley: ":ofn:", title: "OFN"};
    fileToSmiley["images/smilies/hungry.gif"] = {smiley: ":hungry:", title: "hungry"};
    fileToSmiley["images/smilies/pics-stfu.gif"] = {smiley: ":Pstfu:", title: "pics of stfu"};
    fileToSmiley["images/smilies/stfumember.gif"] = {smiley: ":member:", title: "Stfumember"};
    fileToSmiley["images/smilies/google.gif"] = {smiley: ":google:", title: "Google"};
    fileToSmiley["images/smilies/drool.gif"] = {smiley: ":drool:", title: "Drool"};
    fileToSmiley["images/smilies/notsigned.gif"] = {smiley: ":notsigned", title: "Not Signed"};
    fileToSmiley["http://www.tribalwar.com/forums/images/smilies/tinfoil.gif"] = {smiley: ":tinfoil:", title: "Tinfoil"};
    fileToSmiley["images/icons/icon7.gif"] = {smiley: ":)", title: "Smilie"};
    fileToSmiley["images/smilies/mad.gif"] = {smiley: ":mad:", title: "Mad"};
    fileToSmiley["images/smilies/indifferent.gif"] = {smiley: ":-|", title: "indifferent"};
    fileToSmiley["images/smilies/weird.gif"] = {smiley: ":weird:", title: "weird"};
    fileToSmiley["images/smilies/zzz.gif"] = {smiley: ":zzz:", title: "ZZZ"};
    fileToSmiley["/forums/images/smilies/heart.gif"] = {smiley: ":heart:", title: "heart"};
    fileToSmiley["/forums/images/smilies/clap.gif"] = {smiley: ":clap:", title: "clap"};
    fileToSmiley["/forums/images/smilies/iamwithstupid.gif"] = {smiley: ":withstupi", title: "with stupid"};
    fileToSmiley["images/smilies/bangin.gif"] = {smiley: ":banging:", title: "banging"};
    fileToSmiley["images/smilies/classic.gif"] = {smiley: ":classic:", title: "A TW Classic"};
    fileToSmiley["images/smilies/doom.gif"] = {smiley: ":doom:", title: "Dr. Doom"};
    fileToSmiley["images/smilies/emo.gif"] = {smiley: ":emo:", title: "Emo"};
    fileToSmiley["images/smilies/picard.gif"] = {smiley: ":picard:", title: "Face Palm"};
    fileToSmiley["images/smilies/colbert.gif"] = {smiley: ":isee:", title: "Truthiness"};
    fileToSmiley["images/smilies/attentionwhore.gif"] = {smiley: ":attention", title: "Attentionwhore"};
    fileToSmiley["images/smilies/bye.gif"] = {smiley: ":bye:", title: "bye"};
    fileToSmiley["images/smilies/info-smilie.gif"] = {smiley: ":lies:", title: "Disinformation Minister"};
    fileToSmiley["images/smilies/rolleyes.gif"] = {smiley: ":rolleyes:", title: "Roll Eyes (Sarcastic)"};
    fileToSmiley["images/smilies/freak5.gif"] = {smiley: ":ftard:", title: "tard"};
    fileToSmiley["images/smilies/thinkerg.gif"] = {smiley: ":idea:", title: "idea"};
    fileToSmiley["images/smilies/thefinger.gif"] = {smiley: ":finger:", title: "Finger"};
    fileToSmiley["/forums/images/smilies/scared.gif"] = {smiley: ":scared:", title: "scared"};
    fileToSmiley["/forums/images/smilies/king.gif"] = {smiley: ":king:", title: "king"};
    fileToSmiley["images/smilies/nuts.gif"] = {smiley: ":nuts:", title: "Nuts"};
    fileToSmiley["images/smilies/badrazz.gif"] = {smiley: ":razz:", title: "razz"};
    fileToSmiley["images/smilies/soapbox.gif"] = {smiley: ":soapbox:", title: "soapbox"};
    fileToSmiley["images/smilies/shrug03.gif"] = {smiley: ":shrug:", title: "Shrug"};
    fileToSmiley["images/smilies/ofn2.gif"] = {smiley: ":ofn2:", title: "Ofn2"};
    fileToSmiley["images/smilies/domotwak.gif"] = {smiley: ":domotwak:", title: "Domo Twak"};
    fileToSmiley["images/smilies/lolwut.gif"] = {smiley: ":lolwut:", title: "lol wut?"};
    fileToSmiley["images/smilies/cool.gif"] = {smiley: ":cool:", title: "Cool"};
    fileToSmiley["images/smilies/disgust.gif"] = {smiley: ":disgust:", title: "disgust"};
    fileToSmiley["images/smilies/shock.gif"] = {smiley: ":shock:", title: "shock"};
    fileToSmiley["/forums/images/smilies/flame.gif"] = {smiley: ":flame:", title: "flame"};
    fileToSmiley["/forums/images/smilies/rocker.gif"] = {smiley: ":rocker:", title: "rocker"};
    fileToSmiley["images/smilies/hurry.gif"] = {smiley: ":hurry:", title: "Hurry"};
    fileToSmiley["images/smilies/sunny.gif"] = {smiley: ":sunny:", title: "Sunny"};
    fileToSmiley["images/smilies/mecry.gif"] = {smiley: ":mecry:", title: "mecry"}; /* NOT A TYPO */
    fileToSmiley["images/smilies/ban1.gif"] = {smiley: ":ban:", title: "Ban1"};
    fileToSmiley["images/smilies/grammar.gif"] = {smiley: ":grammar:", title: "Grammar"};
    fileToSmiley["images/smilies/redx.gif"] = {smiley: ":redx:", title: "Red X"};
    fileToSmiley["images/smilies/psyduck.gif"] = {smiley: ":psyduck:", title: "Psyduck"};
    fileToSmiley["images/smilies/tongue.gif"] = {smiley: ":p:", title: "Stick Out Tongue"};
    fileToSmiley["images/smilies/cry.gif"] = {smiley: ":cry:", title: "cry"};
    fileToSmiley["images/smilies/sick.gif"] = {smiley: ":sick:", title: "sick"};
    fileToSmiley["images/smilies/popblood.gif"] = {smiley: ":popcorn:", title: "Popcorn"};
    fileToSmiley["/forums/images/smilies/twak.gif"] = {smiley: ":twak:", title: "twak"};
    fileToSmiley["/forums/images/smilies/jester.gif"] = {smiley: ":jester:", title: "jester"};
    fileToSmiley["images/smilies/alf.gif"] = {smiley: ":ralf:", title: "Alf"};
    fileToSmiley["images/smilies/ctrlk.gif"] = {smiley: ":ctrlk:", title: "Ctrlk"};
    fileToSmiley["images/smilies/nofu.gif"] = {smiley: ":nofu:", title: "No, FU"};
    fileToSmiley["images/smilies/outofcloset.gif"] = {smiley: ":closet:", title: "Closet"};
    fileToSmiley["images/smilies/signed.gif"] = {smiley: ":signed:", title: "signed"};
    fileToSmiley["images/smilies/nag.gif"] = {smiley: ":nag:", title: "Nag"};
    fileToSmiley["images/smilies/wink.gif"] = {smiley: ";)", title: "Wink"};
    fileToSmiley["images/smilies/couto.gif"] = {smiley: ":stab:", title: "stab"};
    fileToSmiley["images/smilies/slant.gif"] = {smiley: ":hrm:", title: "hrm"};
    fileToSmiley["images/smilies/jawdrop.gif"] = {smiley: ":jawdrop:", title: "Jaw Drop"};
    fileToSmiley["/forums/images/smilies/kiss.gif"] = {smiley: ":kiss:", title: "kiss"};
    fileToSmiley["images/smilies/ladysman.gif"] = {smiley: ":ladysman:", title: "ladysman"};
    fileToSmiley["images/smilies/grim.gif"] = {smiley: ":reaper:", title: "Grim Reaper"};
    fileToSmiley["images/smilies/fight.gif"] = {smiley: ":fight:", title: "fight"};
    fileToSmiley["images/smilies/phone.gif"] = {smiley: ":phone:", title: "Phone"};
    fileToSmiley["images/smilies/rainbow.gif"] = {smiley: ":rainbow:", title: "Rainbow"};
    fileToSmiley["images/smilies/lolpicard2.gif"] = {smiley: ":picard2:", title: "Serious Facepalm"};
    for(var url in fileToSmiley) {
	smileyToFile[fileToSmiley[url].smiley] = {file: url, title: fileToSmiley[url].title};
    }
}

function initRawTextRegex() {
    var smileyPattern = "";
    for(var smiley in smileyToFile) {
	var escaped = escapeRegex(smiley);
	if(!smileyPattern) {
	    smileyPattern += "(?:" + escaped + ")";
	} else {
	    smileyPattern += "|(?:" + escaped + ")";
	}
    }

    rawTextRegex = new RegExp("(\n)|(" + smileyPattern + ")", "g");
}

initSmileys();
initRawTextRegex();
initPreview();
