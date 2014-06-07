// ==UserScript==
// @name           Music videos on Local.ch
// @namespace      http://yoan.dosimple.ch/
// @description    Show me the video!
// @include        http://guide.local.ch/*/d/*
// ==/UserScript==

function myGetElementsByClassName(className, nodeName, parentNode) {
	var oElements,
		i,
		aElements = [];
	
	parentNode = parentNode||document;
	
	if(!className)
		// sanity check
		return aElements;
	
	if(typeof parentNode === "string")
		// make it handy
		parentNode = document.getElementById(parentNode);
	
	if(typeof document.getElementsByClassName == "function") {
		// Firefox 3 way (super fast)
		oElements = parentNode.getElementsByClassName("className");
		if(nodeName) {
			nodeName = nodeName.toLowerCase();
			for(i=oElements.length; i--;) {
				if(oElements[i].nodeName.toLowerCase() === nodeName)
					// respect the order
					aElements.unshift(oElements[i]);
			}
		} else {
			for(i=oElements.length; i--;)
				aElements.unshift(oElements[i]);
		}
	} else if(typeof document.evaluate === "function") {
		// XPath way! (kinda fast)
		try {
			oElements = document.evaluate(

				".//"+nodeName+"[contains(@class, '"+className+"')]",

				parentNode,

				null,

				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

				null);
			
			for(i=oElements.snapshotLength; i--;)
				aElements.unshift(oElements.snapshotItem(i));
		} catch(e) { /* fail! */ }
	} else {
		// Pure DOM way. (may hurt)
		nodeName = nodeName ?
			nodeName.toLowerCase() :
			"*";
		
		var nFind,
			oElements = parentNode.getElementsByTagName(nodeName),
			re = new RegExp("\\b"+className+"\\b");
		
		for(i=oElements.length; i--;) {
			nFind = oElements[i].className.search(re);
			if(nFind > -1)
				aElements.unshift(oElements[i]);
		}
	}
	return aElements;
}

var reCategory = /\b[CK]on[cz]erto?\b/;
var reClean = / ?\([^\)]+\) ?/g;
var aEvents = myGetElementsByClassName("vevent", "div", "yui-main");

if(aEvents.length) {
    var oEvent = aEvents[0];
    
    try{
        var category = myGetElementsByClassName("category", "p", oEvent)[0].innerHTML;
        var title = oEvent.getElementsByTagName("h2")[0].innerHTML;
        
        if(category && title && category.search(reCategory) > -1) {
            
            title = title.replace(reClean, "");
            
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://pipes.yahoo.com/pipes/pipe.run?_id=Mu0lMpcS3RGjDP5_jknRlg&_render=json&band='+encodeURIComponent(title),
                headers: {
        		    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        		    'Accept': 'application/atom+xml,application/xml,text/xml',
        		},
        		onload: function(response) {
        		    var oResponse = eval("("+response.responseText+")");
        		    console.log(oResponse);
        		    
        		    if("count" in oResponse && oResponse.count) {
        		        var oItem = oResponse.value.items[0];
        		        var oDiv = document.createElement("div");
        		        oDiv.id = "player";
        		        oDiv.style.height = "0px";
        		        
        		        var sUrl = oItem.link.replace(/watch\?v=/, "v/");
                        
                                var oRight = document.getElementById("mapContainer");
                                oRight.parentNode.insertBefore(oDiv, oRight);
                        
                                var nHeight = 0, nMax = 390;
                                var nInterval = window.setInterval(function() {
                                    if(nHeight >= nMax-5) {
                                        oDiv.style.height = nMax+"px";
                                        oDiv.innerHTML = [
                                            '<h3><a href="',
                                            oItem.link,
                                            '" title="',
                                            oItem.description,
                                            '">',
                                            oItem.title,
                                            '</a></h3>',
                                            '<object width="425" height="355" data="',
                		            sUrl,
                                    '" type="application/x-shockwave-flash"><param value="',
                                    sUrl,
                                    ' name="movie" />',
                                    '<param value="transparent" name="wmode" />',
                                    '</object>'].join('');
                                clearInterval(nInterval);
                            } else {
                                nHeight += (nMax - nHeight) / 4;
                                oDiv.style.height = nHeight+"px";
                            }
                        }, 100);
        	    }
                }
            });
        }
    } catch(e) { /* fail silently */ }
}