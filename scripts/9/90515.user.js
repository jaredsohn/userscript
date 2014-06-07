// ==UserScript==
// @name           Facebook - Relationship Image
// @namespace      Facebook - Relationship Image
// @include        http://www.facebook.com/*
// ==/UserScript==

start();

function start()
{

    var c;
    var t;
    if (c = document.getElementById('content')) {
    c.removeEventListener('DOMNodeInserted', start, false);
	if(getElementsByClassName("relationshipImage").length == 0){
    setTimeout(setPic, 0);
	}
    c.addEventListener("DOMNodeInserted", start, false);
	}

    delete c;
    return false;


}

function setPic(){

var div = getElementsByClassName("inside basic_info_summary_list");
	if(div.length > 0){
	var div = div[0];
	var dts = div.getElementsByTagName("dt");
	for(e=0; e<dts.length; e++){
		if(dts[e].innerHTML.indexOf("Relationship Status:")>-1){
			var dds = div.getElementsByTagName("dd")[e];
			var relationshipLink = dds.getElementsByTagName("a");
			
			if(relationshipLink.length > 0){
				if(getElementsByClassName("relationshipImage").length == 0){
				var relationshipLink = dds.getElementsByTagName("a")[0].href
				sendRequest(relationshipLink + "&v=photos",dds);
				}
			}
			
			
		}
	}
	}
}

function sendRequest(url,dds){
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        },
        onload: function (response) {
            if ((response.readyState == 4) && (response.status == 200)) handleProfile(response.responseText,url,dds);
        }
    });
}


function handleProfile(responseTxt,url,dds){	

	var dummyDiv = document.createElement("div");
	dummyDiv.innerHTML = responseTxt;
	if(dummyDiv.innerHTML.indexOf("window.location.replace(\"") > -1){
		var href = dummyDiv.innerHTML.split("window.location.replace(\"")[1].split("\"")[0];
		if(href.length > 1){
			href = href.replace(/\\/gi,"");
			if(getElementsByClassName("relationshipImage").length == 0){
				sendRequest(href,dds);
			}
		}
	}else{
		if(getElementsByClassName("relationshipImage").length == 0){
			var image = ("htt" + responseTxt.split("UIProfileImage UIProfileImage_LARGE img")[1].split(">")[0].split("htt")[1].split(".jpg")[0] + ".jpg").replace(/\\/gi,"");
			
			var newa = document.createElement("a");
			newa.href = url.split("&v=")[0];
			newa.href = newa.href.split("?v=")[0];
			
			var newImage = document.createElement("img");
			newImage.style.cssFloat = "left";
			newImage.style.width = "32px";
			newImage.style.height = "32px";
			newImage.style.paddingTop = "5px";
			newImage.style.paddingBottom = "5px";
			newImage.src = image;
			newImage.id = "relationshipImage";
			newImage.className = "relationshipImage";
			newa.appendChild(newImage);
			dds.parentNode.insertBefore(newa,dds);
			
			dds.style.padding = "5px";
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
} /*   paste in your code and press Beautify button   */