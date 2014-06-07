// ==UserScript==
// @name           DoghouseDiaries
// @namespace      http://thedoghousediaries.com
// @include        http://thedoghousediaries.com/*
// ==/UserScript==

var log = unsafeWindow.console != null ? unsafeWindow.console.log : function() {
    var output = '';
    for (var n = 0; n < arguments.length; n++) {
        output = output + arguments[n];
    }
    GM_log(output);
};

//http://http://thedoghousediaries.com/*
if (String(window.location).search(/^http(s)?:\/\/(www.)?thedoghousediaries\.com(\/[0-9]*)?$/) >= 0) {
    log('DoghouseDiaries Comic');
    
    var DHD = {
        
        isBase: null,
        onKey: {},
        
        nextLink: null,
        prevLink: null,
    
        init: function() {
            this.isBase = String(window.location).search(/^http(s)?:\/\/(www.)?thedoghousediaries\.com(\/)?$/) >= 0 ? true : false;
            this.setupKeyListener();
            this.setupArrowNavigation();
        },
        
        setupKeyListener: function() {
            var that = this;
            window.addEventListener('keyup',function() {
                try {
                    that.handleKeyUp.apply(that,arguments);
                } catch(err) {
                    log('DHD.setupKeyKistener()#keyup Error: ',err);
                }
            },false);
        },
        
        handleKeyUp: function(event) {
            if (this.onKey[event.keyCode]) {
                this.onKey[event.keyCode].call(this);
            }
        },
        
        setupArrowNavigation: function() {
            
            var aNextArray = document.getElementsByClassName('next-comic-link');
            if (aNextArray.length > 0) {
                if (!this.isBase && String(aNextArray[0].href) != String(window.location)) {
                    this.nextLink = aNextArray[0].href;
                    
                    //right key
                    this.onKey[39] = this.navigateNext;
                }
            }
            
            var aPrevArray = document.getElementsByClassName('previous-comic-link');
            if (aPrevArray.length > 0) {
                if (String(aPrevArray[0].href) != String(window.location)) {
                    this.prevLink = aPrevArray[0].href;
                    
                    //left key
                    this.onKey[37] = this.navigatePrev;
                }
            }
        },
        
        navigateNext: function() {
            if (this.nextLink) {
                log('Next: ',this.nextLink);
                window.location = this.nextLink;
            }
        },
        
        navigatePrev: function() {
            if (this.prevLink) {
                log('Previous: ',this.prevLink);
                window.location = this.prevLink;
            }
        }
    
    };
    try {
        DHD.init.call(DHD);
    } catch(err) {
        log('DHD.init() Error: ',err);
    }
}
else {
    //log('DoghouseDiaries Non-comic','\n',String(window.location));
}