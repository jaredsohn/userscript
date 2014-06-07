// ==UserScript==
// @name           Facebook Notification Colorizer
// @namespace      Facebook Notification Colorizer
// @include        http://www.facebook.com*
// ==/UserScript==  

var jewl, jewlBtn;
jewl = document.evaluate('//a[@id="jewelAlert"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
jewlBtn = jewl.snapshotItem(0);
document.addEventListener('click', function (event) {
    if (event.target == jewlBtn) {
            colourHandler();
    }
}, true);

var notifLinks = new Array();
var notifColours = new Array();
var possColours = Array("#F5A9D0","#D0A9F5","#81BEF7","#A9F5A9","#F3F781","#F7BE81");
possColours = fisherYates(possColours);
possColours.push("");


var checkPVS;
function colourHandler(){
  if(checkPVS != getElementsByClassName("pvs notification")){
    colourNotifications();
    checkPVS = getElementsByClassName("pvs notification");
  }else{
    setTimeout(colourHandler,500);
  }   
}

function colourNotifications() {
    var possibleColours;
    possibleColours = possColours;
    var loading = document.getElementById('presence_notifications_loading');
    if (loading) {
        window.setTimeout(colourNotifications, 5);
        return;
    }

    var notifications = getElementsByClassName("pvs notification");
    for (i = 0; i < notifications.length; i++) {
        var linkHref = notifications[i].getElementsByTagName("a")[notifications[i].getElementsByTagName("a").length - 1].href;


        if (notifLinks.indexOf(linkHref) == -1) {
            notifLinks.push(linkHref);
            possColours.pop();
            notifColours.push(possibleColours[possibleColours.length - 1]);
            notifications[i].style.backgroundColor = notifColours[notifLinks.indexOf(linkHref)];
        } else {
            notifications[i].style.backgroundColor = notifColours[notifLinks.indexOf(linkHref)];
        }

    }

}

function fisherYates(myArray) {
    var i = myArray.length;
    if (i == 0) return false;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
    return myArray;
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