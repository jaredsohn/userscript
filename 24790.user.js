// ==UserScript==
// @name           HaineiGouzi
// @namespace      longwosion
// @include        http://hainei.com/rewen*
// @include        http://www.hainei.com/rewen*
// ==/UserScript==

(function(){

	//short alias
	var YAHOO = unsafeWindow.YAHOO;
	var Dom = YAHOO.util.Dom
	var Event = YAHOO.util.Event;
	var $ = Dom.get;

    var isTitle = function(h4) {return h4.parentNode.className=="info";};
    
    //Global
    var KEYS = generateKeyCodes();
    
    //Page Url
    var baseUrl = "";

    //Page catalog id
    var catalog = 0;

    var type = 0;

    //Page number, default 1;
    var page = 1;

    var viewMode = "HaineiView";
    var rewenEntrys = [];
    Dom.getElementsByClassName("toggle","a","content",function(el){
        rewenEntrys.push(el.getAttribute("rewen:id"));
    });

    var currentIndex = -1;

    function generateKeyCodes() {
        var KEY_STRING = "abcdefghijklmnopqrstuvwxyz";
        var KEYS = {};
        
        //[0-9]
        for(var i=0; i<10; i++) {
            KEYS[i] = 48+i;
        }
        //[a-z]
        for(var i=0; i<26; i++) {
            KEYS[KEY_STRING[i]] = 65+i;
        }
        //Special keys
        for(var i in YAHOO.util.KeyListener.KEY) {
            KEYS[i] = YAHOO.util.KeyListener.KEY[i];
        }
        return KEYS;
    }
 
    var Services = {
        itemById: function(itemId) {
            var item = Dom.getElementsByClassName("toggle","a","rewen-entry-"+itemId)[0];
            var listeners = Event.getListeners(item, "click");
            Dom.getElementsByClassName("toggle","a","content",function(el){
                var li = Dom.getAncestorByTagName(el, "li");
                if(el.getAttribute("rewen:id") == itemId) {
                    if(Dom.hasClass(el,"collapse")){
                        listeners[0].fn.call(listeners[0].scope, {});
                    }
                    Dom.addClass(li, "current");
                } else {
                    Dom.removeClass(li, "current");
                }
            });
            document.documentElement.scrollTop = Dom.getY("rewen-entry-"+itemId) - 4;
        },

        itemDown: function() {
            if(currentIndex >= rewenEntrys.length-1) {return;}
            Services.itemById(rewenEntrys[++currentIndex]);
        },

        itemUp  : function() {
            if(currentIndex <= 0) return;
            Services.itemById(rewenEntrys[--currentIndex]);
        },

        viewPage : function() {
            if(currentIndex==-1) return;
            var itemId = rewenEntrys[currentIndex];
            Dom.getElementsBy(isTitle, "h4", "rewen-entry-"+itemId, function(el){
                var url = el.getElementsByTagName("a")[0].href;
                window.open(url, "_blank");
            });
        },

        nextPage : function() {
            ++page; Services.refresh();
        },

        previousPage : function() {
            page = (page==1) ? 1 : page-1;
            Services.refresh();
        },

        nextCatalog : function() {
            catalog = catalog==5 ? 0 : catalog+1;
            page = 1;
            Services.refresh();
        },

        previousCatalog : function() {
            catalog = catalog==0 ? 5 : catalog-1;
            page = 1;
            Services.refresh();
        },

        refresh : function() {
            document.location = baseUrl + "?r[0]=" + catalog + "&r[1]="+ type +"&p=" + page;
        },

        expandedView : function() {
            if (viewMode == "expandedView") return;
            var callList = [];
            Dom.getElementsByClassName("toggle","a","content",function(el){
                var listeners = Event.getListeners(el, "click");
                if(Dom.hasClass(el,"collapse")){
                    callList.push(listeners[0].fn.o);
                }
                Dom.setStyle(el, "display", "none");
            });

            for(var i=callList.length-1; i>=0; i--) {
                callList[i].fn.call(callList[i].scope, {})
            }
            currentIndex = -1;
            viewMode = "expandedView";
        },

        listView : function() {
            if (viewMode == "listView") return;
            Dom.getElementsByClassName("toggle","a","content",function(el){
                var listeners = Event.getListeners(el, "click");
                var itemId = el.getAttribute("rewen:id");
                var content = Dom.getElementsByClassName("content","div","rewen-entry-"+itemId)[0];
                if(!Dom.hasClass(el,"collapse")){
                    listeners[0].fn.o.fn.call(listeners[0].scope, {})
                }
                Dom.setStyle(content,"display","none");
                Dom.setStyle(el, "display", "");

            });
            currentIndex = -1;
            viewMode = "listView";
        },

        shortListView : function() {
            if (viewMode == "shortListView") return;
            Dom.getElementsByClassName("toggle","a","content",function(el){
                var listeners = Event.getListeners(el, "click");
                var itemId = el.getAttribute("rewen:id");
                var content = Dom.getElementsByClassName("content","div","rewen-entry-"+itemId)[0];
                if(!Dom.hasClass(el,"collapse")){
                    listeners[0].fn.o.fn.call(listeners[0].scope, {})
                }
                Dom.setStyle(content,"display","");
                Dom.setStyle(el, "display", "");

            });
            currentIndex = -1;
            viewMode = "shortListView";            
        },

        scrollToTop : function() {
            document.documentElement.scrollTop = 0;
        },

        help : function() {
            window.open("http://userscripts.org/scripts/show/24790", "_blank");
        }
    };

    var ShortKeySetting = [
        { key: "j",        handler: Services.itemDown,        shift: false   },
        { key: "k",        handler: Services.itemUp,          shift: false   },
        { key: "r",        handler: Services.refresh,         shift: false   },
        { key: "1",        handler: Services.expandedView,    shift: false   },
        { key: "2",        handler: Services.listView,        shift: false   },
        { key: "3",        handler: Services.shortListView,   shift: false   },
        { key: "t",        handler: Services.scrollToTop,     shift: false   },
        { key: "v",        handler: Services.viewPage,        shift: false   },
        { key: "n",        handler: Services.nextPage,        shift: false   },
        { key: "p",        handler: Services.previousPage,    shift: false   },
        { key: "n",        handler: Services.nextCatalog,     shift: true    },
        { key: "p",        handler: Services.previousCatalog, shift: true    },
        { key: "h",        handler: Services.help,            shift: false   }
    ];

    /**
     * Bind shortKey to some function
     * @param attachTo {DOMHTML|String} Dom object or its name to be attached event
     * @param keyData {Object} short key information setting, available properties are 
     *  shift, alt, ctrl, key, handler
     */
    function keyPress(attachTo, keyData) {
        var handleKeyPress = function(e) {
            var el = Event.getTarget(e);
            if (el.tagName.toUpperCase() == "INPUT") { return; }
            if (el.tagName.toUpperCase() == "TEXTAREA") { return; }
            if (! keyData.shift) {  keyData.shift = false; }
            if (! keyData.alt)   {  keyData.alt = false;   }
            if (! keyData.ctrl)  {  keyData.ctrl = false;  }

            if (e.shiftKey == keyData.shift && 
                e.altKey   == keyData.alt &&
                e.ctrlKey  == keyData.ctrl) {
                    if (keyData.keyCode == e.charCode || keyData.keyCode == e.keyCode) {
                        keyData.handler();
                    }
            }
            Event.stopEvent(e);
        }
        YAHOO.util.Event.addListener(attachTo, "keyup", handleKeyPress);
    }

    function injectShortKeys() {
        for(var i=0, n=ShortKeySetting.length; i<n; i++) {
            ShortKeySetting[i].keyCode = KEYS[ShortKeySetting[i].key];
            keyPress(document, ShortKeySetting[i]);
        }
    }

    function repaintCurrent() {

        var clientRgn = Dom.getClientRegion();
        var intersectItems = [];
        var containItems = [];
        var currentItem = 0;

        Dom.getElementsByClassName("toggle","a","content",function(el){
            var li = Dom.getAncestorByTagName(this, "li");
            var elRgn = Dom.getRegion(li);
            if(clientRgn.intersect(elRgn)) {
                intersectItems.push(this.getAttribute("rewen:id"));
                if(clientRgn.contains(elRgn)) {
                    containItems.push(this.getAttribute("rewen:id"));
                }
            }
        });

        if(containItems.length>0) {
            currentItem = containItems[0];
        } else {
            if(intersectItems.length==1) {
                currentItem = intersectItems[0];
            } else {
                currentItem = intersectItems[1];
            }
        }

        Dom.getElementsByClassName("toggle","a","content",function(el){
            var li = Dom.getAncestorByTagName(el, "li");
            if(this.getAttribute("rewen:id") == currentItem) {
                if(!Dom.hasClass(li, "current")) { Dom.addClass(li, "current"); }
            } else {
                if(Dom.hasClass(li, "current")) { Dom.removeClass(li, "current"); }
            }
        });

        for(var i=0; i<rewenEntrys.length; i++){
            if(currentItem == rewenEntrys[i]) {
                currentIndex = i;
                return;
            }
        }
    }


    YAHOO.util.Event.onDOMReady(function(){

        var parameter = document.location.toString();

        //get root of url, page number and catalog id from current url link
        baseUrl = parameter.replace(/\?.*/,"");
        parameter.replace(/([^=&\?]*)=([0-9]*)/g, function($0, $1, $2) {
            if($1=="r") { catalog = parseInt($2, 10); };
            if($1=="p") { page = parseInt($2, 10); };
            if($1=="r[0]") { catalog = parseInt($2, 10); };
            if($1=="r[1]") { type = parseInt($2, 10); };
        });

        //enable shortcuts
        injectShortKeys();
        
        //rewrite default event handler
        Dom.getElementsByClassName("toggle","a","content",function(el){
            var listeners = Event.getListeners(el, "click");

            var fn = function(e) {
                var id = this.getAttribute("rewen:id");

                listeners[0].fn.call(this, e);
                if(Dom.hasClass(this,"collapse") && viewMode == "listView"){
                    var content = Dom.getElementsByClassName("content","div","rewen-entry-"+id)[0];
                    Dom.setStyle(content,"display","none");
                }

                if (viewMode == "listView") {
                    Dom.getElementsByClassName("toggle","a","content",function(el){
                        var itemId = el.getAttribute("rewen:id");
                        var listeners = Event.getListeners(el, "click");
                        var content = Dom.getElementsByClassName("content","div","rewen-entry-"+itemId)[0];

                        if(!Dom.hasClass(this, "collapse") && itemId !=id) {
                            listeners[0].fn.o.fn.call(listeners[0].scope, {})
                            Dom.setStyle(content,"display","none");
                            Dom.setStyle(el, "display", "");                        
                        }
                    });
                    document.documentElement.scrollTop = Dom.getY("rewen-entry-"+id) - 4;
                }
            };
            fn.o = listeners[0];

            Event.removeListener(el, "click");
            Event.on(el, "click", fn);
        });
        
        Dom.getElementsBy(isTitle, "h4", "content", function(el){
            var listeners = Event.getListeners(el, "click");

            var fn = function(e) {
                var li, el, id, content;

                if(viewMode == "expandedView") return;

                listeners[0].fn.call(this, e);
                if(Event.getTarget(e).tagName.toLowerCase()=="h4"){
                    li = Dom.getAncestorByTagName(this,"li");
                    el = Dom.getElementsByClassName("toggle","a",li)[0];
                    if(Dom.hasClass(el,"collapse") && viewMode == "listView"){
                        id = el.getAttribute("rewen:id");
                        content = Dom.getElementsByClassName("content","div","rewen-entry-"+id)[0];
                        Dom.setStyle(content,"display","none");
                    }
                }
            }
            Event.removeListener(el, "click");
            Event.on(el, "click", fn);
       });

        Event.on(window, "scroll", function() {
            if(viewMode != "expandedView") return;
            repaintCurrent();
        });

    });

})();