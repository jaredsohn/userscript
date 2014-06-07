// ==UserScript==
// @name       Fix MSRS OWA links
// @namespace  http://use.i.E.your.homepage/
// @version    0.4
// @description  If you don't know what this is, don't use it.
// @include      https://192.168.220.12/+CSCO+*owa/*
// @copyright  none
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    // Note, jQ replaces $ to avoid conflicts.
    
    var doIt = function(event) { 
        try {
            var href = jQ(this).attr("href");
            console.log("Clicked href="+href);
            if(!href) {
                return;
            }
            var newHref;
            var aTag = jQ(this);
            var hrefs= href.match(/URL=(.*)/);
            if(hrefs) {
                href = decodeURIComponent(hrefs[1]);
                console.log('href='+href);
                aTag.attr('href', href);
            }
            if(href.match(/.*\+CSCOE\+\/files\/files_retr\/init\/html\/file\/(.*)$/)) {
                var potentialHref = aTag.text();
                console.log("Checking link text to see if it's an URL: " +potentialHref);
                if(potentialHref.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)) {
                    newHref = potentialHref;
                }
            } else if((hrefs = href.match(/http:\/\/localhost:9000(.*)/)) != null) {
                newHref = 'https://sonar.msrs.state.mn.us:8443/sonar' + hrefs[1];
            }
                
            if(newHref) {
                console.log("Mapped "+href+" to "+newHref);
                href = newHref;
                aTag.attr('href', newHref);
            }
        } catch(e) {
            alert(e);
        }
    };
    jQ("#divRPContainer").bind("DOMSubtreeModified", function() {
        jQ(this).find("a").unbind("click");
        jQ(this).find("a").click(doIt);
    });
    jQ('body').find("a").click(doIt);    
}

// load jQuery and execute the main function
addJQuery(main);