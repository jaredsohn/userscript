// ==UserScript==
// @name           Soapbar
// @namespace      http://people.sigh.asia/~sulaiman
// @description    Removes blasphemy and profanity from webpages
// @include        http://*/*
// @include        https://*/*
// @match          http://*/*
// @match          https://*/*
// @version        1.5.2
// ==/UserScript==
// Copyrights: Public domain.
// Note: Non-webkit change detection is not tested! 

var words = ["Allah", 
            "holy( [a-z]*)?",
            "moses",
            "jesus( christ)?",
            "christ",
            "(a )?god((s)|(dess)|(ess))?",
            "om[Ff][Gg]", 
            "(the )?fuck((ing)|(er)|(ed))?"];

for (var i = 0; i<words.length; ++i) words[i] = new RegExp(words[i], "i");

function wash_page(e){
    if (e.childNodes && e.childNodes.length != 0) {for (var i = 0; i < e.childNodes.length; ++i) wash_page(e.childNodes[i]);}
    else if (e && e.nodeType == 3) 
        for (var i = 0; i<words.length; ++i) if (e.data.search(words[i])!=-1) e.data=e.data.replace(words[i], "")+" -- modified";
}

wash_page(document.body);

if (WebKitMutationObserver || MutationObserver) {
    var changed = false,
        intrvlid = false;

    if(window.soapscript_debug) console.log("a Mutation observer was detected");
    
    function intrctrl() {
        if (document.webkitHidden || document.hidden) {
            if (intrvlid) { 
                window.clearInterval(intrvlid); 
                if(window.soapscript_debug) console.log("Page hidden, removing interval");
            }
        }
        else {
            intrvlid = window.setInterval(function(){
                    if(window.soapscript_debug) console.log("checking if flag Cleanup flag is set...");
                    if (changed) {
                        wash_page(document.body);
                        changed = false;
                        if(window.soapscript_debug) console.log("All cleaned up!");
                    }
                }, 1000);
            wash_page(document.body);
            if(window.soapscript_debug) console.log("Page no longer hidden, restarting interval");
        }
    }

    document.addEventListener((WebKitMutationObserver?"webkitvisibilitychange":"visibilitychange"), intrctrl);

    (new (WebKitMutationObserver||MutationObserver)(function(){
        changed = true;
    })).observe(document.body, {subtree:true, attributes:true,  childList:true});

    intrctrl();
}

