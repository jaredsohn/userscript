// ==UserScript==
// @name           UserStyles.org Forum quote fix
// @namespace      http://www.customizefacebook.co.uk
// @description    Adds a textarea to the bottom of any page of comments where there isn't one already to fix the quote links.
// @include        http://forum.userstyles.org/comments.php?*
// ==/UserScript==
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


if(!document.getElementById('Form')) {
   var commentForm = document.getElementById('Form');
   var contentInfoTop = getElementsByClassName("ContentInfo Top")[0].innerHTML;
   var contentBody = document.getElementById("ContentBody").innerHTML;
   var contentInfoMid = getElementsByClassName("ContentInfo Middle")[0].innerHTML;
   var content =  "";

   content+= "<div class=\"ContentInfo Top\">" + contentInfoTop + "</div>\n";
   content+= "<div id=\"ContentBody\">" + contentBody + "</div>\n";
   content+= "<div class=\"ContentInfo Middle\">" + contentInfoMid + "</div>\n";
   content+= "<div id=\"Form\" class=\"AddComments\">\n<fieldset>\n";
   content+= "<legend>Add your comments</legend>\n<form><ul><li><label for=\"CommentBox\">Enter your comments</label>\n";
   content+= "<textarea id=\"CommentBox\" class=\"SmallCommentBox\" cols=\"85\" rows=\"10\" name=\"Body\"></textarea></li>\n";
   content+= "<li id=\"CommentFormats\">When you have finished quoting the messages on this page, please copy the text onto the last page to post your comment.</li></ul>";
   content+= "</form></fieldset></div>\n";
   document.getElementById('Content').innerHTML = content;
}