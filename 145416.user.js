// ==UserScript==
// @name       Remove Facebook Offers
// @version    1.0
// @description  I really hate Facebook Offers, and there's no option to turn them off, so I made this. Hope you enjoy it. :)
// @namespace  http://www.facebook.com/
// @include    http://www.facebook.com/*
// @include    https://www.facebook.com/*
// @exclude    http://www.facebook.com/ai.php?*
// @exclude    https://www.facebook.com/ai.php?*
// @copyright  2012+, Zachary Murray
// ==/UserScript==

(function () {
window.unsafeWindow || (
	unsafeWindow = (function() {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
	}())
);
    
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var findJQuery = function() {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'try {return typeof jQuery === undefined ? undefined : jQuery;} catch (e) {return false;}');
		return el.onclick();
	};
    var internalScript = function() {
        var script = document.createElement("script");
        script.textContent = "if(!($ === undefined) && !($.noConflict === undefined)) {$.noConflict();}(" + callback.toString() + ")();";
        document.body.appendChild(script);
    };
    if (!findJQuery()) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
        script.addEventListener('load', internalScript, false);
        document.body.appendChild(script);
    } else {
        internalScript();
    }
}
    
function enforcePersistentJQuery(callback) {
    var watchdog = function () {
        var tock = document.createElement("div");
        var mainContainer = document.getElementById("mainContainer");
        tock.setAttribute("style", "display: none");
        tock.setAttribute("id", "zm-watchdog-v5mxrFq");
        if (mainContainer) mainContainer.appendChild(tock);
    };
    watchdog();
    addJQuery(callback);
    var grrr = 'if (console && console.log) console.log("ZM: Watchdog: Woof! Facebook cleared our interval!");';
    var woof = 'if (jQuery === undefined || (jQuery && jQuery("#zm-watchdog-v5mxrFq").length == 0)) {'+grrr+'('+watchdog.toString()+')();('+addJQuery.toString()+')('+callback.toString()+');}';
    var wooftrycatch = 'try {'+woof+'} catch (e) { console.log("ZM: Watchdog: Woof failed, error: "+e); }';
    //console.log(woof);
    setInterval(wooftrycatch, 1000);
}
    

function main() {
    //debugger;
    var findAndCullOffers = jQuery.proxy(function () {
        //console.log("ping!");
        //alert("pronouns: " + $(".pronoun-link").length);
        //$(".pronoun-link").each(function () {alert("pronoun: " + $(this).html())});
        jQuery(".pronoun-link").each(function () {
            if (jQuery(this).text() == "an offer") {
                //debugger;
                if (console && console.log) console.log("ZM: Removing a Facebook news feed offer (" + jQuery(this).parent().text() + ")");
                jQuery(this).parent().parent().parent().parent().remove();
            }
        });
        jQuery('a[href="#"]').each(function () {
            if (jQuery(this).text() == "Get Offer") {
                if (console && console.log) console.log("ZM: Removing a Facebook news feed sidebar offer");
                $(this).parent().parent().parent().parent().parent().parent().parent().parent().remove();
            }
        });
        jQuery('a[href$="sponsored-stories"]').each(function () {
            var storyHeadNode = jQuery(this);
            var found = false, i = 0;
            for (i = 0; i < 12; i++) {
                if (storyHeadNode.hasClass("mainWrapper")) {
                    found = true;
                    break;
                }
                storyHeadNode = storyHeadNode.parent();
            }
            if (found) {
                if (console && console.log) console.log("ZM: Found the mainWrapper div at " + i.toString() + " levels high");
            } else {
                if (console && console.log) console.log("ZM: WARNING: Couldn't find the mainWrapper div for a sponsored story");
            }
            if (console && console.log) {
                var sponsor = storyHeadNode.children('.uiStreamHeadline :first').text();
                console.log("ZM: Removing a Facebook news feed sponsored story (" + sponsor + ")");
            }
            storyHeadNode.parent().parent().parent().remove();
        });
    }, this);
    findAndCullOffers();
    setInterval(findAndCullOffers, 1000);
    if (typeof main.isEventListenerReady == undefined) {
        document.addEventListener("DOMNodeInserted", findAndCullOffers);
        main.isEventListenerReady = true;
    }
}

// load jQuery and execute the main function
enforcePersistentJQuery(main);

})();