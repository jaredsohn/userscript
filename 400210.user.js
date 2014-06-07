// ==UserScript==
// @name           Chess.com Favicon Alerts
// @description    Add number of games waiting to favicon
// @version        0.8
// @author         Jim Farrand
// @author         Peter Wooley (Original GMail Favicon script)
// @license        MIT
// @namespace      http://xyxyx.org/
// @include        https://www.chess.com/*
// @include        http://www.chess.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// ==/UserScript==

if(typeof GM_getValue === "undefined") {
    function GM_getValue(name, fallback) {
        return fallback;
    }
}

var titleNotificationConfigKey = 'titleNotificationEnabled';
var debuggingConfigKey = 'debuggingEnabled';
var autoReloadConfigKey = 'autoReloadEnabled';
var lastCountKey = 'lastCount';
var lastCountUpdateTimeKey = 'lastCountUpdateTime';
var lastCountChangeTimeKey = 'lastCountChangeTime';
var flashIconForNewKey = 'flashIconEnabled';

// Register GM Commands and Methods
if(typeof GM_registerMenuCommand !== "undefined") {
    var setTitleNotification = function(state) {
        console.log("Setting title notifications: " + state);
        GM_setValue(titleNotificationConfigKey, state);
    };

    var setDebugging = function(state) {
        console.log("Setting debugging: " + state);
        GM_setValue(debuggingConfigKey, state);
    };


    var setAutoReload = function(state) {
        console.log("Setting auto-reload: " + state);
        GM_setValue(autoReloadConfigKey, state);
    }
    
    var setFlashIcon = function(state) {
        console.log("Setting flash icon: " + state);
        GM_setValue(flashIconForNewKey, state);
    }

    GM_registerMenuCommand( "Chess.com Favicon Alerts > Set Title Notifications On", 
        function() { setTitleNotification(true) });
    GM_registerMenuCommand( "Chess.com Favicon Alerts > Set Title Notifications Off", 
        function() { setTitleNotification(false) });
    GM_registerMenuCommand( "Chess.com Favicon Alerts > Set Debugging On", 
        function() { setDebugging(true) });
    GM_registerMenuCommand( "Chess.com Favicon Alerts > Set Debugging Off", 
        function() { setDebugging(false) });
    GM_registerMenuCommand( "Chess.com Favicon Alerts > Set Auto Reload On", 
        function() { setAutoReload(true) });
    GM_registerMenuCommand( "Chess.com Favicon Alerts > Set Auto Reload Off", 
        function() { setAutoReload(false) });
    GM_registerMenuCommand( "Chess.com Favicon Alerts > Set Flash Icon After Change On", 
        function() { setFlashIcon(true) });
    GM_registerMenuCommand( "Chess.com Favicon Alerts > Set Flash Icon After Change Off", 
        function() { setFlashIcon(false) });
}

if(!window.frameElement) {
    new ChessDotComFavIconAlerts();
}

function ChessDotComFavIconAlerts() {
    var self = this;

    // PRIVATE VARIABLES AND METHODS

    // The URL attached to the little hand icon, with the link containing the number of games
    var gotoReadyGameURL = "http://www.chess.com/echess/goto_ready_game";

    // Min time to wait after suspected suspend before refreshing
    var reloadRandomizationMin  = 20 * 1000;
    
    // Random time to wait after suspected suspend before refreshing, in addition to reloadAfterSuspendMinimum
    var reloadRandomizationMax  = 40 * 1000;

    var searchElement;
    var iconCanvas;

    var isDebugging = function() {
        return false || GM_getValue(debuggingConfigKey, false);
    }

    var getLastCount = function() {
        return GM_getValue(lastCountKey);
    }

    var getLastCountUpdateTime = function() {
       return GM_getValue(lastCountUpdateTimeKey);
    }

	var getLastCountChangeTime = function() {
       return GM_getValue(lastCountChangeTimeKey);
    }
	
    var setLastCount = function(value) {
        GM_setValue(lastCountKey, value);
    }

    var setLastCountUpdateTime = function(value) {
        GM_setValue(lastCountUpdateTimeKey, value);
    }

	
    var setLastCountChangeTime = function(value) {
        GM_setValue(lastCountChangeTimeKey, value);
    }

	
    var isAutoReloadEnabled = function() {
       return false || GM_getValue(autoReloadConfigKey, false);
    }

    var isFlashIconEnabled = function() {
       return false || GM_getValue(flashIconForNewKey, false);
    }

	var isTitleUpdatedEnabled = function() {
		return false || GM_getValue(titleNotificationConfigKey, false);
	}
	
    var head = window.document.getElementsByTagName('head')[0];
 
    // Element that contains the count
    var findSearchElement = function() {
        var searchElement = document.getElementById("topright");;
        if (isDebugging()) { console.log("findSearchElement: " + searchElement); }
        return searchElement;
    }


    var setIcon = function(icon) {
        var links = head.getElementsByTagName("link");
        for (var i = 0; i < links.length; i++) {
            if ((links[i].rel == "shortcut icon" || links[i].rel=="icon") && links[i].href != icon) {
                head.removeChild(links[i]);
            } else if(links[i].href == icon) {
                return;
            }
        }

        var newIcon = document.createElement("link");
        newIcon.type = "image/png";
        newIcon.rel = "shortcut icon";
        newIcon.href = icon;

        head.appendChild(newIcon);

        setTimeout(function() {
            if (isDebugging()) { console.log("Timeout function"); }

            var shim = document.createElement('iframe');
            shim.width = shim.height = 0;
            document.body.appendChild(shim);
            shim.src = "icon";
            document.body.removeChild(shim);

            if (isDebugging()) { console.log("Timeout function done"); }
        }, 1000);
    }

    var getIconCanvas = function() {
        if(!iconCanvas) {
            iconCanvas = document.createElement('canvas');
            iconCanvas.height = iconCanvas.width = 16;

            var ctx = iconCanvas.getContext('2d');

            for (var y = 0; y < iconCanvas.width; y++) {
                for (var x = 0; x < iconCanvas.height; x++) {
                    if (self.pixelMaps.icons.unread[y][x]) {
                        ctx.fillStyle = self.pixelMaps.icons.unread[y][x];
                        ctx.fillRect(x, y, 1, 1);
                    }
                }
            }
        }

        return iconCanvas;
    }

    var showCount = function() {
        // We could decide here whether to show the count or the other icon
        return true;
    }

    // TODO: This could be made abstract so that that this class can be more easily reused
    var getCount = function() {
        // Return the number of things
        if(searchElement) {
            var center;
            var topRightChildren = searchElement.childNodes;
            for (var i = 0; i < topRightChildren.length; i++) {
                var topRightChild = topRightChildren.item(i);
                if (topRightChild.tagName == "LI" && topRightChild.hasAttribute("class") && topRightChild.getAttribute("class") == "center") {
                    var centerChildren = topRightChild.childNodes;
                    for (var i = 0; i < centerChildren.length; i++) {
                        var centerChild = centerChildren.item(i);
                        if (centerChild.tagName == "A" && centerChild.hasAttribute("href") && centerChild.getAttribute("href") == gotoReadyGameURL) {
                            var result = centerChild.textContent;
                            if (isDebugging()) { console.log("getCount: " + result); }
                            return result;
                        }
                    }
                }
            }
            if (isDebugging()) { console.log("getCount: 0"); }
            return 0;
        }
    }
	
    this.construct = function() {		
        if (isDebugging()) { console.log("Creating ChessDotComFavIconAlerts"); }

        // PUBLIC  VARIABLES AND METHODS

        this.backgroundFillColour   = "#ff0000";
        this.backgroundBorderColour = "#990000";
        this.digitColour = "#ffffff";
        
        // How long must have passed without user input in this window before we reload the page?
        this.inactivityTimeout = 15 * 60  * 1000; // 15 minutes
        
        // How old must the data be before we reload the page?
		this.dataTimeout = 3 * 60  * 1000; // 3 minutes
		// Note that we might have received data from another tab/window, which is why there are seperate data/inactivity timeouts
        
        // How long to flash the icon for after it changes
        this.flashPeriod = 15 * 1000;
		
        // TODO: More things could be private
        this.icons = {
            // TODO: These are the same, and incorrectly named.
            read:   'data:image/x-icon;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAACAgAAABACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAEAAARCwAAEQsAAAAAAAAAAAAA////AP///wD///8AO4ZcPDuKYMw7i2HsN3xR8jZ2S/83d0z/N3dM9zd3TN83d0ytN3dMIP///wD///8A////AP///wD///8A////AD+SaP4+k2r/PpNq/zqEWv84d03/OHhN/zZ3S/83d0z/N3dM/zd3TO////8A////AP///wD///8A////AP///wA7iV7hPpNq/z6Tav8+jWT/N3hM/zh4Tf83d0z/N3dM/zh3Tf42dkvL////AP///wD///8A////AP///wD///8AO4heuj6Tav8+k2r/PpJq/zmAVv83d0z/N3dM/zh3Tf83d0z/NnZLm////wD///8A////AP///wD///8A////ADuGXCo7jGLhPpNq/z6Tav87hVv/OHdN/zd3TP84d037N3dMqjd3TBX///8A////AP///wD///8A////AP///wAAAAAAAAAAADuGXFw9kGf7PIlg/zh4Tf82dkvfNnZLGwAAAAAAAAAA////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAPYphzjyOZP83d0z/N3dMjwAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAADuIX6I/kmj/N3dL/zZ3S2UAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAA8h1+AP5Rq/zh5T/82d0tLAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAO4ddZT6Tav83fFH/NnZLOQAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AAAAAAAAAAAAPYphzjyPZvg+k2r/PI5k/zd5Ttk4d02PAAAAAAAAAAD///8A////AP///wD///8A////AP///wAAAAAAAAAAADuIX9o9kGf8PpNq/z2NZP84eE7kN3dMnQAAAAAAAAAA////AP///wD///8A////AP///wD///8AAAAAAAAAAAA7hlxFPpNq/z+Uav8+k2r/On9U/jZ3SyUAAAAAAAAAAP///wD///8A////AP///wD///8A////AAAAAAAAAAAAO4leij6Sav8+k2r/PpNq/zuHXv82d0tSAAAAAAAAAAD///8A////AP///wD///8A////AP///wAAAAAAAAAAADuGXEFyr5L/wNzO/0mZc/87h13/N3dMIwAAAAAAAAAA////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAP4tifF2ee/9Vn3v+OYJYZQAAAAAAAAAAAAAAAP///wD///8A////AOAHAADgBwAA4AcAAOAHAADgBwAA+B8AAPw/AAD8PwAA/D8AAPw/AAD4HwAA+B8AAPgfAAD4HwAA+B8AAPw/AAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAARCwAAEQsAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8AAAAAAAAAAAA7hVsCO4ddaDuGXKk5f1W+N3dN0jd3Teo3d03+N3dN/zd3Tf83d03+N3dN6jd3TdI3d02sN3dNejd3TTs3d00BAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA7hVsKPIlftj2QZvw+k2n/PpNp/z6Taf88iF7/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3TeE3d013N3dNBf///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD2MYuY+k2n/PpNp/z6Taf8+k2n/PpNp/z6SaP83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d02v////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APpJo/z6Taf8+k2n/PpNp/z6Taf8+k2n/PY9l/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3TfT///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA7iF6WPpJo/z6Taf8+k2n/PpNp/z6Taf89kWf/OH5U/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d032N3dNW////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAA7hlxVPpJo/z6Taf8+k2n/PpNp/z6Taf8+kmj/OHpQ/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN9jd3TS0AAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAD2MYuY+k2n/PpNp/z6Taf8+k2n/PpNp/z6Taf87hVv/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dNpwAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAPI5k9D6Taf8+k2n/PpNp/z6Taf8+k2n/PpNp/z2MYv83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03LAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAA7h12BPpJo/z6Taf8+k2n/PpNp/z6Taf8+k2n/PZBm/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN9Dd3TU4AAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAA7hlwwPIpgwj2QZvw+k2n/PpNp/z6Taf8+k2n/N3hO/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN4zd3TYI3d00ZAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAO4VbCDuIXpM+kmj+PpNp/z6Taf84fVP/N3dN/zd3Tf83d03/N3dN8Dd3TVo3d00DAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyJX7U+k2n/PpNp/zmBV/83d03/N3dN/zd3Tf83d012AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO4ZcSz6Taf8+k2n/OoVb/zd3Tf83d03/N3dN/zd3TSkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7hVsCPpJo/z6Taf88iV//N3dN/zd3Tf83d031N3dNAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9j2X3PpNp/zyNY/83d03/N3dN/zd3TdIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2MYuY+k2n/PZFn/zd3Tf83d03/N3dNrwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPIth1D6Taf8+k2n/N3lP/zd3Tf83d02WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8imDFPpNp/z6Taf84fFL/N3dN/zd3TYUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyJX7I+k2n/PpNp/zl/Vf83d03/N3dNcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPIhenT6Taf8+k2n/OoJY/zd3Tf83d01gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAA7hVslPIhenDyKYM08jmTxPpNp/z6Taf88jWP/OYFX/zd3TcQ3d02ON3dNYDd3TRMAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAADyOZPM+k2n/PpNp/z6Taf8+k2n/PpNp/z6Taf8+k2n/OX9V/zd3Tf83d03/N3dNxgAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAPIlfuj6SaP4+k2n/PpNp/z6Taf8+k2n/PpNp/zyNY/84elD/N3dN/zd3TfI3d016AAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAO4VbBjyJX7o+k2n/PpNp/z6Taf8+kmj/OYBW/zd3Tf83d015N3dNAwAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAA7hVslPZFn/j6Taf8+k2n/PpNp/z6Taf8+k2n/OH5U/zd3Te83d00TAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAADyJX6s+k2n/PpNp/z6Taf8+k2n/PpNp/z6Taf88jmT/N3dN/zd3TW0AAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAPIth2T6Taf8+k2n/PpNp/z6Taf8+k2n/PpNp/z6Taf83e1H/N3dNmwAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAA9i2HcPpNp/z6Taf8+k2n/PpNp/z6Taf8+k2n/PpNp/zh+VP83d02fAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAADyJX7E+k2n/rdG//7TVxP9OnHX/PpNp/z6Taf8+k2n/OH1T/zd3TXIAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAO4ZcLj6SaP6Twqv///////D28/9nqoj/PpNp/z6SaP84eU/0N3dNFwAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO4hekEaXbv/I4NT/+/38/5TDqv8+k2n/PIpg/jd3TVcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO4ddbTyNY+8+kmj/PpJo/zyNY+45gFZSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP8AAP/8AAA//AAAP/wAAD/8AAA//gAAf/4AAH/+AAB//gAAf/8AAP//wAP///AP///wD///8A////gf///4H///+B////gf///4H///+B///8AD///AA///wAP//+AH///gB///4Af//+AH///gB///4Af//+AH///wD///+B//',
            unread: 'data:image/x-icon;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAACAgAAABACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAEAAARCwAAEQsAAAAAAAAAAAAA////AP///wD///8AO4ZcPDuKYMw7i2HsN3xR8jZ2S/83d0z/N3dM9zd3TN83d0ytN3dMIP///wD///8A////AP///wD///8A////AD+SaP4+k2r/PpNq/zqEWv84d03/OHhN/zZ3S/83d0z/N3dM/zd3TO////8A////AP///wD///8A////AP///wA7iV7hPpNq/z6Tav8+jWT/N3hM/zh4Tf83d0z/N3dM/zh3Tf42dkvL////AP///wD///8A////AP///wD///8AO4heuj6Tav8+k2r/PpJq/zmAVv83d0z/N3dM/zh3Tf83d0z/NnZLm////wD///8A////AP///wD///8A////ADuGXCo7jGLhPpNq/z6Tav87hVv/OHdN/zd3TP84d037N3dMqjd3TBX///8A////AP///wD///8A////AP///wAAAAAAAAAAADuGXFw9kGf7PIlg/zh4Tf82dkvfNnZLGwAAAAAAAAAA////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAPYphzjyOZP83d0z/N3dMjwAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAADuIX6I/kmj/N3dL/zZ3S2UAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAA8h1+AP5Rq/zh5T/82d0tLAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAO4ddZT6Tav83fFH/NnZLOQAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AAAAAAAAAAAAPYphzjyPZvg+k2r/PI5k/zd5Ttk4d02PAAAAAAAAAAD///8A////AP///wD///8A////AP///wAAAAAAAAAAADuIX9o9kGf8PpNq/z2NZP84eE7kN3dMnQAAAAAAAAAA////AP///wD///8A////AP///wD///8AAAAAAAAAAAA7hlxFPpNq/z+Uav8+k2r/On9U/jZ3SyUAAAAAAAAAAP///wD///8A////AP///wD///8A////AAAAAAAAAAAAO4leij6Sav8+k2r/PpNq/zuHXv82d0tSAAAAAAAAAAD///8A////AP///wD///8A////AP///wAAAAAAAAAAADuGXEFyr5L/wNzO/0mZc/87h13/N3dMIwAAAAAAAAAA////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAP4tifF2ee/9Vn3v+OYJYZQAAAAAAAAAAAAAAAP///wD///8A////AOAHAADgBwAA4AcAAOAHAADgBwAA+B8AAPw/AAD8PwAA/D8AAPw/AAD4HwAA+B8AAPgfAAD4HwAA+B8AAPw/AAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAARCwAAEQsAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8AAAAAAAAAAAA7hVsCO4ddaDuGXKk5f1W+N3dN0jd3Teo3d03+N3dN/zd3Tf83d03+N3dN6jd3TdI3d02sN3dNejd3TTs3d00BAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA7hVsKPIlftj2QZvw+k2n/PpNp/z6Taf88iF7/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3TeE3d013N3dNBf///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD2MYuY+k2n/PpNp/z6Taf8+k2n/PpNp/z6SaP83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d02v////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APpJo/z6Taf8+k2n/PpNp/z6Taf8+k2n/PY9l/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3TfT///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA7iF6WPpJo/z6Taf8+k2n/PpNp/z6Taf89kWf/OH5U/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d032N3dNW////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAA7hlxVPpJo/z6Taf8+k2n/PpNp/z6Taf8+kmj/OHpQ/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN9jd3TS0AAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAD2MYuY+k2n/PpNp/z6Taf8+k2n/PpNp/z6Taf87hVv/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dNpwAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAPI5k9D6Taf8+k2n/PpNp/z6Taf8+k2n/PpNp/z2MYv83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03LAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAA7h12BPpJo/z6Taf8+k2n/PpNp/z6Taf8+k2n/PZBm/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN9Dd3TU4AAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAA7hlwwPIpgwj2QZvw+k2n/PpNp/z6Taf8+k2n/N3hO/zd3Tf83d03/N3dN/zd3Tf83d03/N3dN4zd3TYI3d00ZAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAO4VbCDuIXpM+kmj+PpNp/z6Taf84fVP/N3dN/zd3Tf83d03/N3dN8Dd3TVo3d00DAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyJX7U+k2n/PpNp/zmBV/83d03/N3dN/zd3Tf83d012AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO4ZcSz6Taf8+k2n/OoVb/zd3Tf83d03/N3dN/zd3TSkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7hVsCPpJo/z6Taf88iV//N3dN/zd3Tf83d031N3dNAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9j2X3PpNp/zyNY/83d03/N3dN/zd3TdIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2MYuY+k2n/PZFn/zd3Tf83d03/N3dNrwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPIth1D6Taf8+k2n/N3lP/zd3Tf83d02WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8imDFPpNp/z6Taf84fFL/N3dN/zd3TYUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyJX7I+k2n/PpNp/zl/Vf83d03/N3dNcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPIhenT6Taf8+k2n/OoJY/zd3Tf83d01gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAA7hVslPIhenDyKYM08jmTxPpNp/z6Taf88jWP/OYFX/zd3TcQ3d02ON3dNYDd3TRMAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAADyOZPM+k2n/PpNp/z6Taf8+k2n/PpNp/z6Taf8+k2n/OX9V/zd3Tf83d03/N3dNxgAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAPIlfuj6SaP4+k2n/PpNp/z6Taf8+k2n/PpNp/zyNY/84elD/N3dN/zd3TfI3d016AAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAO4VbBjyJX7o+k2n/PpNp/z6Taf8+kmj/OYBW/zd3Tf83d015N3dNAwAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAA7hVslPZFn/j6Taf8+k2n/PpNp/z6Taf8+k2n/OH5U/zd3Te83d00TAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAADyJX6s+k2n/PpNp/z6Taf8+k2n/PpNp/z6Taf88jmT/N3dN/zd3TW0AAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAPIth2T6Taf8+k2n/PpNp/z6Taf8+k2n/PpNp/z6Taf83e1H/N3dNmwAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAA9i2HcPpNp/z6Taf8+k2n/PpNp/z6Taf8+k2n/PpNp/zh+VP83d02fAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAADyJX7E+k2n/rdG//7TVxP9OnHX/PpNp/z6Taf8+k2n/OH1T/zd3TXIAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAO4ZcLj6SaP6Twqv///////D28/9nqoj/PpNp/z6SaP84eU/0N3dNFwAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO4hekEaXbv/I4NT/+/38/5TDqv8+k2n/PIpg/jd3TVcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO4ddbTyNY+8+kmj/PpJo/zyNY+45gFZSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP8AAP/8AAA//AAAP/wAAD/8AAA//gAAf/4AAH/+AAB//gAAf/8AAP//wAP///AP///wD///8A////gf///4H///+B////gf///4H///+B///8AD///AA///wAP//+AH///gB///4Af//+AH///gB///4Af//+AH///wD///+B//',
        };

        this.pixelMaps = {
            icons: {
                // TODO: Transparency
                'unread':
[["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#afc59b","#aac193","#6d9645","#c6d4bc","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#e1e8dc","#7ea159","#eef3e9","#67923a","#407119","#f5f8f7","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#b4c8a4","#59882a","#5c8a2e","#69933d","#507d29","#c7d4c1","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#f1f4f0","#598729","#69933e","#6c963e","#406f23","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#bcceac","#6a9342","#68933c","#608b39","#5b8149","#c1cfb9","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#7b9f5b","#5f8b35","#68933c","#638e39","#5b8247","#84a176","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#dce5d7","#5f8d2e","#3c6a23","#f6f8f5","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#c2d2b5","#618e30","#3b6924","#d8e1d3","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#b8cba7","#608d31","#3b6826","#c2d1bb","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#a9c192","#5d8932","#3f6c2a","#a2b897","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#fefeff","#608c35","#5e8939","#477232","#567e41","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#f7f9f7","#7da05c","#548324","#69943c","#5b853a","#4b7536","#497332","#38671f","#819f72","#ffffff","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#b0c59e","#5a882a","#69933d","#6c963e","#557f39","#4b7536","#4d7737","#4c7636","#36651d","#beceb7","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#bcceae","#5f8c31","#69933e","#66903d","#4a7436","#4c7636","#4d7737","#4c7636","#416e2a","#cdd8c7","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#40750c","#618d33","#68933b","#588238","#4b7536","#4c7636","#4b7535","#487331","#406d28","#2d5f14","#ffffff","#ffffff","#ffffff"],["#ffffff","#ffffff","#ffffff","#f3f6f2","#a8bf90","#799e58","#5b8346","#4b7535","#4c7636","#587f43","#759564","#a8bc9d","#ffffff","#ffffff","#ffffff","#ffffff"]]
                },
                numbers: [
                    [
                            [0,1,1,0],
                            [1,0,0,1],
                            [1,0,0,1],
                            [1,0,0,1],
                            [0,1,1,0]
                    ],
                    [
                            [0,1,0],
                            [1,1,0],
                            [0,1,0],
                            [0,1,0],
                            [1,1,1]
                    ],
                    [
                            [1,1,1,0],
                            [0,0,0,1],
                            [0,1,1,0],
                            [1,0,0,0],
                            [1,1,1,1]
                    ],
                    [
                            [1,1,1,0],
                            [0,0,0,1],
                            [0,1,1,0],
                            [0,0,0,1],
                            [1,1,1,0]
                    ],
                    [
                            [0,0,1,0],
                            [0,1,1,0],
                            [1,0,1,0],
                            [1,1,1,1],
                            [0,0,1,0]
                    ],
                    [
                            [1,1,1,1],
                            [1,0,0,0],
                            [1,1,1,0],
                            [0,0,0,1],
                            [1,1,1,0]
                    ],
                    [
                            [0,1,1,0],
                            [1,0,0,0],
                            [1,1,1,0],
                            [1,0,0,1],
                            [0,1,1,0]
                    ],
                    [
                            [1,1,1,1],
                            [0,0,0,1],
                            [0,0,1,0],
                            [0,1,0,0],
                            [0,1,0,0]
                    ],
                    [
                            [0,1,1,0],
                            [1,0,0,1],
                            [0,1,1,0],
                            [1,0,0,1],
                            [0,1,1,0]
                    ],
                    [
                            [0,1,1,0],
                            [1,0,0,1],
                            [0,1,1,1],
                            [0,0,0,1],
                            [0,1,1,0]
                    ],
            ]
        };

        this.timer = setInterval(this.poll, 100);
        this.poll();

        return true;
    }

    // This breaks unless the parameter is a string
    this.drawNumberedIcon = function(number) {
        if (! (number instanceof String) ) {
            number = number.toString();
        }
        
        if(!self.textedCanvas) {
                self.textedCanvas = [];
        }

        if(!self.textedCanvas[number]) {
			if (isDebugging()) { console.log("drawNumberedIcon(" + number + ")"); }
            var iconCanvas = getIconCanvas();
            var textedCanvas = document.createElement('canvas');
            textedCanvas.height = textedCanvas.width = iconCanvas.width;
            var ctx = textedCanvas.getContext('2d');
            ctx.drawImage(iconCanvas, 0, 0);

            ctx.fillStyle = this.backgroundFillColour;
            ctx.strokeStyle = this.backgroundBorderColour;
            ctx.strokeWidth = 1;

            var count = number.length;
            var bgHeight = self.pixelMaps.numbers[0].length;
            var bgWidth = 0;
            var padding = count > 2 ? 0 : 1;

            for(var index = 0; index < count; index++) {
                bgWidth += self.pixelMaps.numbers[number[index]][0].length;
                if(index < count-1) {
                    bgWidth += padding;
                }
            }
            bgWidth = bgWidth > textedCanvas.width-4 ? textedCanvas.width-4 : bgWidth;

            ctx.fillRect(textedCanvas.width-bgWidth-4,2,bgWidth+4,bgHeight+4);

            var digit;
            var digitsWidth = bgWidth;
            for(var index = 0; index < count; index++) {
                digit = number[index];
                if (self.pixelMaps.numbers[digit]) {
                    var map = self.pixelMaps.numbers[digit];
                    var height = map.length;
                    var width = map[0].length;

                    ctx.fillStyle = this.digitColour;

                    for (var y = 0; y < height; y++) {
                        for (var x = 0; x < width; x++) {
                            if(map[y][x]) {
                                ctx.fillRect(14- digitsWidth + x, y+4, 1, 1);
                            }
                        }
                    }

                    digitsWidth -= width + padding;
                }
            }

            ctx.strokeRect(textedCanvas.width-bgWidth-3.5,2.5,bgWidth+3,bgHeight+3);

            self.textedCanvas[number] = textedCanvas;

            if (isDebugging()) { console.log("drawNumberedIcon: Done making icon"); }
        }

        return self.textedCanvas[number];
    }

    var resetTimer = function(init) {
        var time = new Date().getTime();
        self.lastActivity = time;
    }

    this.poll = function() {

    
		var lastCount = getLastCount();
		var time = new Date().getTime();
		var count;
		
		if (self.foundCountAlready) {
			count = lastCount;
			
			if (isAutoReloadEnabled()) {	
				// TODO: Maybe we shouldn't do this on explorer, analysis board, and a few other places
				
                var lastCountUpdateTime = getLastCountUpdateTime();				

                var refreshTime = lastCountUpdateTime + self.dataTimeout;
				
                if (self.lastActivity) {
                    var inactivityRefreshTime = self.lastActivity + self.inactivityTimeout;
                    if (inactivityRefreshTime > refreshTime) {
                        refreshTime = inactivityRefreshTime;
                    }
                }
                
                if (self.noReloadBefore) {
                    if (self.noReloadBefore > refreshTime) {
                        refreshTime = self.noReloadBefore;
                    } else {
						// Some activity happened since this was set, so clear it and pick a new one next time
						self.noReloadBefore = undefined;
					}
                }
			     
                var time = new Date().getTime();
                if (isDebugging()) {
                    var d = new Date(refreshTime);
                    var formattedTime = d.getUTCHours() + ":" + (d.getUTCMinutes() < 10 ? "0" : "") + d.getUTCMinutes();
					if (self.noReloadBefore) {
						formattedTime += ":" + (d.getUTCSeconds() < 10 ? "0" : "") + d.getUTCSeconds()
					} else {
						formattedTime += " (ish)";
					}
                    if (!self.lastDebugTime || self.lastDebugTime != formattedTime) {
						self.lastDebugTime = formattedTime;
						console.log("poll: Will reload page at " + formattedTime);
                    }
                }
			
                if (time > refreshTime) {
                    if (isDebugging()) { console.log("poll: Page reload timeout passed after " + ((self.pageLoadTime - time)/1000) + "sec"); }
				
				    if ( self.noReloadBefore ) {
						// We already did a random period, and passed it, so we can reload now
						self.noReloadBefore = undefined; // Probably unneeded, we'll lose this after the reload
                        location.reload();
				    } else {
				        // If we massively overshot the refresh time, it's possible that this machine was suspended
				        // (which is why we didn't get woken up)
				        // That can be a problem - often the CPU becomes active several seconds before the network, and so if we
				        // immediately reload, we will get an error

						// Also, we don't want tabs all piling up and reloading at the same moment
						
				        // We therefore wait some extra random time before refreshing
				        self.noReloadBefore = time + reloadRandomizationMin + Math.ceil((reloadRandomizationMax-reloadRandomizationMin)*Math.random());
				    }
				

                }
            }
		} else {
			searchElement = findSearchElement();
			
			if(!searchElement) {
				if (isDebugging()) { console.log("poll: Search element not found, using last value"); }
				count = lastCount;
			} else {
				if (isDebugging()) { console.log("poll: Found search element"); }
				var lastCountUpdateTime = getLastCountUpdateTime();	
				if (lastCountUpdateTime && lastCountUpdateTime > time) {
					if (isDebugging()) { console.log("poll: Stored count more recent"); }
					// Some other page got a more up to date value
					count = lastCount;
				} else {
					count = getCount();
					if (count !== lastCount) {
						if (isDebugging()) { console.log("Count updated to: " + count); }
						setLastCount(count);
						setLastCountChangeTime(time);
					}
					
					setLastCountUpdateTime(time);
				}
				
				self.foundCountAlready = true;
			}
		}
	
		var displayCountIcon;
		if (count == 0 || !showCount()) {
			displayCountIcon = false;
		} else {
			var lastCountChangeTime = getLastCountChangeTime();
			if (isFlashIconEnabled() && (time - lastCountChangeTime) < self.flashPeriod && (!self.lastActivity || self.lastActivity < lastCountTime)) {
				displayCountIcon = (0 == (Math.floor(time / 1000) % 2)); 
			} else {
				displayCountIcon = true;
			}
		}
				
		if(displayCountIcon) {
			setIcon(self.drawNumberedIcon(count).toDataURL('image/png'));
		} else {
			setIcon(self.icons.read);
		}
		
		if (isTitleUpdatedEnabled()) {
			if (count === 0) {
				document.title = self.pageTitle;
			} else {
				document.title = "(" + count + ") " + self.pageTitle;
			}
		}
    }


    this.toString = function() { return '[object ChessDotComFavIconAlerts]'; } 
		
	this.pageLoadTime = new Date().getTime();
	this.pageTitle = document.title;
	
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('click', resetTimer);
	window.addEventListener('onkeypress', resetTimer);
	
	if (isDebugging()) { console.log("Done creating ChessDotComFavIconAlerts"); } ;
	
    return this.construct();
}
