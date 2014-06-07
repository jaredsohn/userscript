// ==UserScript==
// @name           TwitterRiver
// @namespace      http://yoan.dosimple.ch/
// @description    Pagination is a pita (handles now when the pagination is deactivated)
// @include        http://twitter.com/home
// @include        https://twitter.tld/home
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

var oBottomNavs = myGetElementsByClassName("bottom_nav", "div", "content");
var nPage = document.location.search.search("page=") > 0 ?
  parseInt(document.location.search.match(/page=(\d+)/)[1], 10) :
  1;

function loadPage() {
    if(bLoading || nPage >= 10) {
        return;
    }
    nPage += 1;
    
    var oIframe = document.createElement("iframe");
    oIframe.style.width = "0";
    oIframe.style.height = "0";
    oIframe.style.border = "0 none";
    oIframe.src = 'http://twitter.com/home?page='+nPage;
    
    // setUp
    bLoading = true;
    document.body.appendChild(oIframe);
    document.documentElement.className = "loading";
    
    oIframe.addEventListener("load", function(evt) {
        document.getElementById("timeline").innerHTML += oIframe.contentDocument.getElementById("timeline").innerHTML;
        
        // tearDown
        document.documentElement.className = "";
        setTimeout(function(){
            oIframe.parentNode.removeChild(oIframe);
        }, 100);
        bLoading = false;
    }, false);
}

if(nPage < 10 && oBottomNavs.length && oBottomNavs[0].getElementsByTagName("a").length > 1) {
    GM_addStyle([
        ".bottom_nav{display:none;text-align:center;font-style:italic;color:#999;font-size:1.2em;}",
        ".loading .bottom_nav{display:block;}"
    ].join(""));
    
    oBottomNavs[0].innerHTML = "loading...";
    var bLoading = false;
    
    window.addEventListener("scroll", function(evt) {
        if(window.scrollMaxY - window.scrollY <= 200) {
            loadPage();
        }
    }, false);
}