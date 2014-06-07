// ==UserScript==
// @name           The Ultimate Popup Blocker
// @description    Configurable popup blocker that blocks ALL (even user-initiated) popup windows by default. But you can easily open the blocked popup or whitelist a domain, directly from the page.
// @namespace      jakub-g.github.com
// @author         http://jakub-g.github.com/
// @version        0.1-20130112
// @downloadURL    https://raw.github.com/jakub-g/greasemonkey-userscripts/master/general/ultimatePopupBlocker.js
// @userscriptsOrg http://userscripts.org/scripts/show/...
// @grant          GM_getValue
// @grant          GM_setValue
// @include        *
// @exclude        http*://*.youtube.com/*
// @exclude        http*://mail.google.com/*
// @exclude        http*://*.blogspot.tld/*
// @exclude        http*://poczta.wp.pl/*
// ==/UserScript==

// Why another popup blocker?

// Built-in Firefox popup blocker blocks only the popup that were created automatically via
// script on page load etc. When you click on a button on the page, it won't block it.
// However, malicious websites can create JS code that will launch the popups whenever you click
// on any blank space on the page for instance.

// In JavaScript, functions are first-order citizens. It means you can store a function in a variable
// and pass it freely. You can also modify the native functions provided by the browser, like 'window.open'.
// Here, we override 'window.open' with our own implementation which doesn't really open the window.
// However the user may want to open a popup - cool, we stored original native window.open function
// in a variable and we will call it!

// Of course, we'd like to white list some domains. Greasemonkey offers an option to specify @exclude entries
// in the metadata block of the script. However this means you'll have to edit this text file each time you
// want to whitelist a domain. However, GM also offers a way to set config entries in Firefox storage
// (about:config entries) and we'll make use of it to dynamically add entries to the white list 
// right from the page.

// The essence of the blocking code is substituting window.open with the function returning FakeWindow,
// which can be a one-liner.
// The majority of the code here is the handling of whitelisting logic and informational logging.

// Tests: http://www.popuptest.com/

(function() {
    // ============================== CONFIG =================================
    var bDisplayMessageOnPopupBlocked = true;
    var bDisplayOpenPopupLink = true;
    var bDisplayWhiteListThisDomainLink = true;
    var LOG_ID = "ultimate_popup_blocker"; // HTML ID in the page
    
    // ============================ FUNCTIONS ================================
    var global = unsafeWindow; // reference to page's "window" through GreaseMonkey
    
    /*
     * Helper to create a button with inner text @text executing onclick @clickCallback,
     * appended as a child of @logDiv
     */
    var putButton = function (logDiv, text, clickCallback, inlineStyle) {
        var button = document.createElement("button");
        button.innerHTML = text;
        button.style.cssText = "text-decoration:none; color:black; cursor:pointer;\
            margin: 0 5px; font: 8pt microsoft sans serif; padding: 1px 3px;\
            background-color:rgb(212,208,200); border-width:2px; border-style:outset;\
            border-color:#eee #555 #555 #eee; color:black;" + inlineStyle;
        logDiv.appendChild(button);
        button.addEventListener("click", clickCallback);
    };
    
    /*
     * Helper to create a button (child of @logDiv) which onclick whitelists @domain
     * in internal Firefox storage.
     */
    var putWhitelistButton = function (logDiv, domain) {
        putButton(logDiv, domain, function(){
            GM_setValue("whitelisted_" + domain, true);
        });
    };
    
    /* 
     * Helper to create a text node with @text and append to @logDiv
     */
    var putText = function (logDiv, text) {
        var node = document.createTextNode(text);
        logDiv.appendChild(node);
    };
    
    /*
     * Return logger div, or create it ad-hoc.
     */
    var getLogDiv = function () {
        var logDiv = document.getElementById(LOG_ID);
        if(!logDiv){
            logDiv = document.createElement("div");
            logDiv.setAttribute("id", LOG_ID);
            logDiv.style.cssText="position:fixed; top:0; left:0; width:100%;\
                padding:5px 5px 5px 29px; font: 8pt microsoft sans serif;\
                background-color: linen; color:black; border:1px solid black;\
                ";
            document.body.appendChild(logDiv);
        }
        return logDiv;
    };
    
    /*
     * Get array of domains for which it would make sense to whitelist them.
     * Sample valid outputs:
     *  // localhost       -> ['localhost']
     *  // youtube.com     -> ['youtube.com']
     *  // www.youtube.com -> ['youtube.com', 'www.youtube.com']
     *  // a.b.c.d         -> ['c.d', 'b.c.d', 'a.b.c.d']
     */
    var getDomainsArray = function(documentDomain){
        // e.g. domain = www.google.com, topDomain = google.com
        var d1 = documentDomain;
        var domainsArr = [];
        
        var lastDot1 = d1.lastIndexOf('.');
        if(lastDot1 != -1){
            var lastDot2 = d1.lastIndexOf('.', lastDot1-1);
            if(lastDot2 != -1 && lastDot2 != lastDot1) {
                var d2 = d1.substr(lastDot2 + 1);
                domainsArr.push(d2);
  
                var lastDot3 = d1.lastIndexOf('.', lastDot2-1);
                if(lastDot3 != -1 && lastDot3 != lastDot2) {
                    var d3 = d1.substr(lastDot3 + 1);
                    domainsArr.push(d3);
                }
            }
        }
        
        domainsArr.push(d1);
        return domainsArr;
    };
    
    /*
     * Checks if domain we're currently browsing has been whitelisted by the user
     * to display popups.
     */
    var isCurrentDomainWhiteListed = function() {
        var domains = getDomainsArray(document.domain);
        var whitelisted = domains.some(function(d){
            return GM_getValue("whitelisted_" + d);
        }); // if any 'd' in 'domains' was whitelisted, we return true
        return whitelisted;
    };
    
    /*
     * "window.open()" returns Window which might be then used by the originator page
     * to focus the popup (annoying splash popup) or blur it to retain focus in the original page
     * (pay-by-impressions popup, I don't need it to actually see it).
     * We need to return the fake window to not encounter JS runtime error when the popup originator
     * page wants to call focus() or blur().
     */
    var FakeWindow = {
        blur: function() {return false;},
        focus: function() {return false;}
    };
    
    /*
     * Storing a reference to real "window.open" method in case we wanted
     * to actually open a blocked popup
     */
    var realWindowOpen = global.open;

    /*
     * This function will be called each time a script wants to open a new window,
     * if the blocker is activated.
     * We handle the blocking & messaging logic here.
     */
    var fakeWindowOpen = function(url){
        if(!bDisplayMessageOnPopupBlocked){
            return FakeWindow;
        }
        var logDiv = getLogDiv();
        logMessage(logDiv, url);
        
        if(bDisplayOpenPopupLink){
            displayOpenPopupLink(logDiv, arguments);
        }
        if(bDisplayWhiteListThisDomainLink) {
            displayWhiteListThisDomainLink(logDiv);
        }
        displayCloseButton(logDiv);
        return FakeWindow; // see the doc of FakeWindow
    };
    
    var logMessage = function (logDiv, url) {
        global.upb_counter = (global.upb_counter || 0);
        url = (url[0] == '/') ? document.domain + url : url;
        var msg = ["UPB has blocked <b>", ++global.upb_counter, "</b> popup windows, last: <u>", url, "</u>"].join("");
        logDiv.innerHTML = msg;
        console.log(msg);
        logDiv.style.display = "block";
    };
    
    var displayOpenPopupLink = function (logDiv, realArguments){
        putButton (logDiv, "open the popup", function(){
            realWindowOpen.apply(null, realArguments);
        });
    };
    
    var displayWhiteListThisDomainLink = function(logDiv) {
        var domainsArr = getDomainsArray(document.domain);
        
        putText(logDiv, ' whitelist the domain: '); // using 'innerHTML += ' breaks event listeners strangely
        putWhitelistButton(logDiv, domainsArr[0]);
        if(domainsArr[1]){
            putWhitelistButton(logDiv, domainsArr[1]);
        }
        if(domainsArr[2]){
            putWhitelistButton(logDiv, domainsArr[2]);
        }
    };
    
    var displayCloseButton = function(logDiv) {
        putButton (logDiv, "x", function(){
            logDiv.style.display = 'none';
        }, 'background-color: #a00; color:white; margin:0 32px 0 0; float:right');
    };
    
    /*
     * Override browser's "window.open" with our own implementation.
     */
    var activateBlocker = function() {
        global.open = fakeWindowOpen;
    };
    
    // ============================ LET'S RUN IT ================================
    
    var disabled = isCurrentDomainWhiteListed();
    if(disabled){
        console.log('[UPB] current domain was found on a white list. UPB disabled.');
    }else{
        activateBlocker();
    }
})();
