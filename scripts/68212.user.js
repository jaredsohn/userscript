// ==UserScript==
// @name           Better Facebook
// @description    Makes Facebook better. It's that simple.
// @include        http://www.facebook.com/*
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

function hideAnnoyances() {
	var anchors = getElementsByClassName("uiStreamMessage uiStreamPassive");
	var allExp = [/like/, /likes/, /joined the group/, /swagbucks/, /are now friends/, /is now friends/];
    
	for (var i = 0; i < anchors.length; i++) {
		for (var j = 0; j < allExp.length; j++) {
			if (allExp[j].exec(anchors[i].innerHTML)) {
				anchors[i].parentNode.parentNode.parentNode.parentNode.removeChild(anchors[i].parentNode.parentNode.parentNode);
				break;
			}
		}
        
	}
}

function hideBirthdays() {
	var anchors = getElementsByClassName("UIUpcoming_Item");
    var mast = [];
    for (var i = 0; i < anchors.length; i++) {
        var list = anchors[i].getElementsByTagName("a");
        mast[i] = list[0];
    }
    var rudder = [];
    var count = 0;
    var hbdExp = [/Today/, /birthday/];
    for (var i = 0; i < mast.length; i++) {
        if ((hbdExp[0].exec(anchors[i].innerHTML)) && (hbdExp[1].exec(anchors[i].innerHTML))) {
            rudder[count] = mast[i].innerHTML;
            count++;
        }
    }
    var crowsnest = getElementsByClassName("uiStreamMessage");
    for (var i = 0; i < crowsnest.length; i++) {
        var bday = false;
        var scurvy = crowsnest[i].getElementsByTagName("span");
        if (scurvy.length != 0) {
            var hull = scurvy[0].getElementsByTagName("a");
            for (var j = 0; j < hull.length; j++) {
                for (var k = 0; k < rudder.length; k++) {
                    if (hull[j].innerHTML == rudder[k]) {
                        bday = true;
                    }
                }
            }
            if (bday) {
                var allExp = [/birthday/, /happy/, /special/, /day/];
                for (var j = 0; j < allExp.length; j++) {
                    if (allExp[j].exec(crowsnest[i].innerHTML.toLowerCase())) {
                        crowsnest[i].parentNode.parentNode.parentNode.parentNode.removeChild(crowsnest[i].parentNode.parentNode.parentNode);
                    }
                }
            }
        }
    }
}

function endlessScroll() {
	if (document.body.offsetHeight - window.pageYOffset <= 2000){
		var anchors = getElementsByClassName("lfloat");
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("click", true, true);
		anchors[0].dispatchEvent(evt);
	}
}

var ads = document.getElementById("pagelet_adbox");
ads.parentNode.removeChild(ads);
var ads = document.getElementById("pagelet_connectbox");
ads.parentNode.removeChild(ads);

hideAnnoyances();
hideBirthdays();
setInterval(hideAnnoyances, 1000);
setInterval(hideBirthdays, 1000);
setTimeout(setInterval(endlessScroll, 2000), 5000);