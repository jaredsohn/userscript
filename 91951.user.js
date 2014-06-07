// ==UserScript==
// @name           Hide Google Junk
// @version        1.4
// @author         jondaley
// @namespace      http://limedaley.com
// @description    Hide Google stuff (instant preview, left sidebar, starred, +1)  Use up the new-found whitespace. 
// @include        /^https?://.*\.google\..*/
// @exclude        /^https?://.*\.google\..*/bookmarks/
// @grant       none
// ==/UserScript==

// run on first startup
startup();

// every time (runs way too many times, but I'm not sure how to run it less often)
document.addEventListener('DOMAttrModified', function (event) {
    if (event.target.tagName == "BODY") {
      doIt();
    }
}, false);

function startup() {
    var css = "#appbar, #top_nav {display: none}"+
            ".s {max-width: 100%}"+
            "li.g {margin-bottom: 5px}";
    
    if (typeof GM_addStyle != "undefined") {
    	GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
    	PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
    	addStyle(css);
    } else {
    	var heads = document.getElementsByTagName("head");
    	if (heads.length > 0) {
    		var node = document.createElement("style");
    		node.type = "text/css";
    		node.appendChild(document.createTextNode(css));
    		heads[0].appendChild(node); 
    	}
    }
    
    // The setting button is useful, so let's separate it from the rest
    var top_bar = document.getElementById("mngb");
    var settings = document.getElementById("ab_ctls");
    if(settings && top_bar){ 
        top_bar.appendChild(settings);
    }
    doIt();
}

function doIt(){

    // move center column over to the left, and widen since we have so much whitespace now
    var o = document.getElementById("center_col");
    if(o && o.style) {
        o.style.margin = "0px";
        o.style.width = "100%";
        op = o.parentNode;
        if(op && op.style){
            op.style.width = "";
        }
    }

    var o = document.getElementById("rcnt");
    if(o && o.style){
        o.style.marginTop = "0px";
    }  
}
