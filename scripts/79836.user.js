// ==UserScript==
// @name           Facebook - Online Now Icons 2
// @namespace      Facebook - Online Now Icons 2
// @include        http://www.facebook.com/*
// ==/UserScript==

boot();
function boot(){
	try{
		var test = unsafeWindow.buddyList.availableList;
		start();
	}catch(e){
		setTimeout(boot,1000);
	}
}

function availability(id){
	try{
		return unsafeWindow.buddyList.getAvailability(id).i;
	}catch(e){
		return -1;
	}
}

function forceUpdate() { //forces update of chat list
	try{
		unsafeWindow.ChatBuddyList.prototype._forceUpdate(false);
	}catch(e){
		GM_log("Failed to update chat list");
		setTimeout(forceUpdate,2000);
	}
}

function addIcons(){


	var pi = getElementsByClassName("uiProfilePhoto profilePic uiProfilePhotoLarge img");
	pi = pi.concat(getElementsByClassName("uiProfilePhoto uiProfilePhotoMedium img"));
	pi = pi.concat(getElementsByClassName("UIProfileImage UIProfileImage_LARGE img"));
	pi = pi.concat(getElementsByClassName("UIProfileImage UIProfileImage_LARGE"));
	
	forceUpdate();
	
	profileIcons = pi;
	

	for(e=0; e<profileIcons.length; e++){
		var link;
		var hover;
		var profileID = profileIcons[e].src.split("_")[1];
		var available = availability(profileID);
		if(available == 0){link = "http://static.ak.fbcdn.net/rsrc.php/zz/r/73HA_3NSxq7.png";  hover = "User is online.";
		}else if(available == 1){link = "http://static.ak.fbcdn.net/rsrc.php/zy/r/RcZrqjLHpqS.png";  hover = "User is idle.";
		}else if(available == -1){link = "http://i54.tinypic.com/a23dyd.png"; hover = "User is offline.";}
		
		if(profileIcons[e] && profileIcons[e].className.indexOf("wstatusIcon")==-1){
			profileIcons[e].className += " wstatusIcon";
			if(profileIcons[e].className.indexOf("UIProfileImage UIProfileImage_LARGE img")>-1){
				profileIcons[e].parentNode.innerHTML += "<img class='statusIcon' title='"+hover+"' style='position:relative; right:6px; top:44px; float:right;' src='"+link+"'>";
			}else if (profileIcons[e].parentNode.className.indexOf("uiUfiAddComment")==-1 && profileIcons[e].parentNode.className.indexOf("uiTooltip")==-1){
				profileIcons[e].parentNode.innerHTML += "<img class='statusIcon' title='"+hover+"' style='position:relative; top:-6px; right:0px; float:right;' src='"+link+"'>";
			}
		}else{//if the icon already exists, update it.
			var icon = getElementsByClassName("statusIcon",null,profileIcons[e].parentNode)[0];
			try{
			icon.src = link;
			icon.title = hover;
			}catch(e){}
		}
	}

}
function start()
{
    var c;
    var t;
    if (c = document.getElementById('content')) {
    	addIcons();
        c.addEventListener("DOMNodeInserted", function () { clearTimeout(t); t = setTimeout(addIcons, 1); }, false);
    }

    delete c;
    return false;
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
