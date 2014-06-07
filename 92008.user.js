// ==UserScript==
// @name           Facebook - Remove Spam
// @namespace      Facebook - Remove Spam
// @include        http://www.facebook.com/*
// ==/UserScript==

var crap;

crap = [
  "glee",
  "big brother",
  "x factor",
  "xfactor",
  "x-factor",
  "i'm a celebrity",
  "im a celebrity",
  "i'm a celeb",
  "im a celeb",
  "castaway",
  "dancing on ice",
  "britains got talent",
  "britain's got talent",
  "americas got talent",
  "america's got talent",
  "just dance"
];


start();

function start()
{

    var c;
    var t;
    if (c = document.getElementById('content')) {
    	check();
		c.addEventListener("DOMNodeInserted", function () { clearTimeout(t); t = setTimeout(check, 1); }, false);
	}

    delete c;
    return false;


}

function check(){
	var feedItems = getElementsByClassName("uiUnifiedStory");
	for(e=0; e<feedItems.length; e++){
		var msgBody = getElementsByClassName("messageBody",null,feedItems[e]);
		msgBody = msgBody.concat(getElementsByClassName("UIStory_Message",null,feedItems[e]));
		if(msgBody.length > 0){
			var message = msgBody[0].innerHTML;
		    for ( a in crap ) {
				if(msgBody[0].innerHTML.toLowerCase().indexOf(crap[a])>-1){
					feedItems[e].parentNode.removeChild(feedItems[e]);
				}
		    }
		}
	}
}


function getElementsByClassName(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
                nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
                returnElements = [],
                current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    } else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = "",
                xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                returnElements = [],
                elements, node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
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
    } else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = [],
                elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                current, returnElements = [],
                match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
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
}