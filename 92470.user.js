// ==UserScript==
// @name           RILDRize
// @namespace      com.kiririmode
// @description    Read It Later behaves like Livedoor Reader
// @include        http://readitlaterlist.com/*
// ==/UserScript==

(function() {
    // shortcut keys
    const KEY_DOWN   = 'j';
    const KEY_UP     = 'k';
    const KEY_MARK   = 'p';
    const KEY_OPEN   = 'o';
    const KEY_RELOAD = 'r';
    const KEY_NEXT   = 's';
    const KEY_PREV   = 'a';
    const KEY_REMOVE = 'x';

    // class names
    const CLASS_CURRENT = 'rildrize-current';
    const CLASS_MARK    = 'rildrize-mark';
    const CLASS_READ    = 'rildrize-read';

    const OPEN_MAX_NUM = 5;
    const DELAY = 1000;

    var currentPos = 0;
    var entryList  = [];

    init();

    function init() {
        addGlobalStyle([
            '.' + CLASS_MARK    + ' > img { border-style: solid; border-color: coral; border-width: 2px; }',
            '.' + CLASS_CURRENT + ' > img { border-style: solid; border-width: 3px; }'
        ].join("\n"));

        entryList = getElementsBySelectors('ul#list > li').filter( isUnreadItem );
        setClassName(entryList[0], CLASS_CURRENT);

        var sort_by = GM_getValue("sort_by");
        document.getElementById("sort_by").value = sort_by || "1";

        var page = GM_getValue("page") || "1";
        next( Number(page) - 1 );

        window.addEventListener("keypress", function (evt) {
            entryList = getElementsBySelectors('ul#list > li').filter( isUnreadItem );
            if ( document.getElementsByClassName(CLASS_CURRENT).length <= 0 ) {
                setClassName(entryList[0], CLASS_CURRENT);
            }

            switch( String.fromCharCode(evt.charCode) ) {
              case KEY_DOWN: move(+1);    break;
              case KEY_UP:   move(-1);    break;
              case KEY_MARK: mark();      break;
              case KEY_OPEN: open();      break;
              case KEY_NEXT: next(+1);    break;
              case KEY_PREV: next(-1);    break;
              case KEY_RELOAD: reload();  break;
              case KEY_REMOVE: remove();  break;
            }

        }, true );
    }

    function remove() {
        makeRead( entryList[currentPos] );
    }

    function reload() {
        window.location.reload(true);
    }

    function next(n) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", true, true);
        
        var page = document.getElementById("page");
        page.value = Number(page.value) + n;
        GM_setValue("page", page.value);
        page.dispatchEvent(evt);

        currentPos = 0;
    }

    function move(n) {
        if ( currentPos + n < 0 || currentPos + n >= entryList.length ) {
            return;
        }

        var prevItem    = entryList[currentPos]
        currentPos += n;
        var currentItem = entryList[currentPos];
        
        removeClassName(prevItem,    CLASS_CURRENT);
        setClassName(currentItem, CLASS_CURRENT);
        GM_setValue("sort_by", document.getElementById("sort_by").value);
    }

    function mark() {
        var currentItem = entryList[currentPos];

        toggleClassName(currentItem, CLASS_MARK);
        if ( ! pins.contains(currentItem) ) {
            pins.add(currentItem);
        } 
        else {
            pins.remove(currentItem);
        }
    }

    function open() {
        var currentItem = entryList[currentPos];
        setClassName(currentItem, CLASS_CURRENT);

        pins.open();

        currentPos = 0;
        currentItem = entryList[currentPos];
        setClassName(currentItem, CLASS_CURRENT);
    }

    function addGlobalStyle(css) {
        var head = document.getElementsByTagName('head')[0];
        if ( !head ) { return; }

        var style = document.createElement('style');
        style.type      = 'text/css';
        style.innerHTML = css;

        head.appendChild(style);
    }

    function setClassName(elem, className) {
        var classNames = elem.className? elem.className.split(/\s+/) : [];        

        if ( contains(classNames, className) ) {
            return;
        }
        classNames.push(className);        
        elem.className = classNames.join(' ');
    }

    function removeClassName(elem, className) {
        var classNames = elem.className? elem.className.split(/\s+/) : [];        

        if ( ! contains(classNames, className) ) {
            return;
        }
        classNames = classNames.filter( function (c) { return c != className; });            
        elem.className = classNames.join(' ');
    }

    function toggleClassName(elem, className) {
        var classNames = elem.className? elem.className.split(/\s+/) : [];

        if ( contains(classNames, className) ) {
            classNames = classNames.filter( function (c) { return c != className; });
        } else {
            classNames.push(className);
        }
        elem.className = classNames.join(' ');
    }

    function contains(array, s) {
        return array.some( function (elem) {
            return elem == s;
        })
    }

    function getElementsBySelectors(selector) {
        var nodeList = document.querySelectorAll(selector);
        var length   = nodeList.length;
        var results  = [];

        for ( i = 0; i < length; i++ ) {
            results.push( nodeList.item(i) );
        }
        return results;
    }

    function makeRead(list) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
        
        var nodeList = list.getElementsByClassName('check');
        if ( nodeList.length <= 0 ) {
            return;
        }
        nodeList.item(0).dispatchEvent(evt);
    }

    function isUnreadItem(elem) {
        if ( ! elem.className ) { return true; }
        
        var classes = elem.className.split(/\s+/);
        return ! contains(classes, CLASS_READ);
    }

    var pins = {
        idList: [],
        data: {},

        add: function(listItem) {
            var id = listItem.id;
            var w  = listItem.getElementsByClassName('item').item(0);

            this.idList.push(id);
            this.data[id] = {
                node: listItem,
                url: w.href,
                title: w.textContent,
            };
        },
        remove: function(listItem) {
            var id = listItem.id;
            this.idList = this.idList.filter( function(e){ return e != id } );
            delete this.data[id];
        },
        contains: function(listItem) {
            var id = listItem.id;
            return this.data[id]? true: false;
        },
        open: function() {
            var num  = Math.min(OPEN_MAX_NUM, this.idList.length);
            var data = this.data;

            this.idList.splice(0, num).forEach( function(id) {
                var pin = data[id];
                window.open(pin.url, pin.title);
                setClassName(pin.node, CLASS_READ);

                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                var nodeList = pin.node.getElementsByClassName('check');
                if ( nodeList.length <= 0 ) {
                    return;
                }
                nodeList.item(0).dispatchEvent(evt);
                pin.node.style.display = 'none';
                
                delete data[id];
            });
        },
        isEmpty: function() {
            return this.idList.length == 0;
        },
        toString: function() {
            var keys = [];
            for ( var prop in this.data ) {
                keys.push(prop);
            }

            return [ "idList: " + this.idList.toString(),
                     "data: " + keys.join(" ") ].join("\n");
        }
    };
})();
