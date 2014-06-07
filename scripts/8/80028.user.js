// ==UserScript==
// @name           Facebook - Undo Notifications Update 
// @namespace      Facebook - Undo Notifications Update 
// @include        http*://www.facebook.com/*
// ==/UserScript==

var jewl, jewlBtn;
jewl = document.evaluate('//a[@id="jewelAlert"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
jewlBtn = jewl.snapshotItem(0);
document.addEventListener('click', function (event) {
    if (event.target == jewlBtn) {
            setTimeout(undoIt,10);
    }
}, true);

function undoIt(){
  var jewelNotifs = document.getElementById("jewelNotifs");
  var notifs = jewelNotifs.getElementsByClassName("pvs notification");

  if(notifs.length > 0){
    for(i=0; i<notifs.length; i++){
    
      var images = notifs[i].getElementsByTagName("img");
      for(e=0; e<images.length; e++){
        if(images[e].className == "uiProfilePhoto uiProfilePhotoLarge img"){ images[e].style.display = "none"; }
      }
      
      var icon = notifs[i].getElementsByTagName("i")[0];
      notifs[i].getElementsByTagName("a")[0].parentNode.insertBefore(icon,notifs[i].getElementsByTagName("a")[0]);
      
      var icon = notifs[i].getElementsByTagName("img");
      for(o=0; o<icon.length; o++){
          if(icon[o].width == 16 && icon[o].height == 16){
            notifs[o].getElementsByTagName("a")[0].parentNode.insertBefore(icon[o],notifs[i].getElementsByTagName("a")[0]);
          }
      }
      
      //var abbr = notifs[i].getElementsByTagName("div")[notifs[i].getElementsByTagName("div").length - 1];
      //abbr.getElementsByTagName("span")[0]
      //notifs[i].getElementsByTagName("a")[notifs[i].getElementsByTagName("a").length - 1].parentNode.insertBefore(abbr,notifs[i].getElementsByTagName("a")[notifs[i].getElementsByTagName("a").length - 1].nextSibling.nextSibling);

    }
  }else{
      setTimeout(undoIt,50);
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