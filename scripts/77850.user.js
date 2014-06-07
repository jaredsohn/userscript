// ==UserScript==
// @name           Facebook - Auto Expand 'Show More'
// @namespace      Facebook - Auto Expand 'Show More'
// @include        http://www.facebook.com/*
// ==/UserScript==

function removeExpands(){
  var expands = getElementsByClassName("text_exposed_show");
  var expandsHide = getElementsByClassName("text_exposed_hide");
  
  var expandLinks = getElementsByClassName("text_exposed_link");
  
  for(var i=0; i<expands.length; i++){
      expands[i].style.display = 'block';
      expands[i].style.visibility = 'visible';
  }
  for(var i=0; i<expandsHide.length; i++){
      expandsHide[i].parentNode.removeChild(expandsHide[i]);
  }
  for(var i=0; i<expandLinks.length; i++){
      expandLinks[i].parentNode.removeChild(expandLinks[i]);
  }
}



function checkForUpdate() {
  document.documentElement.removeEventListener('DOMNodeInserted', checkForUpdate, false);
  setTimeout(removeExpands, 0);
  document.documentElement.addEventListener("DOMNodeInserted", checkForUpdate, false);
}

checkForUpdate();

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
            elements,
            node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch(e) {
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
            current,
            returnElements = [],
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