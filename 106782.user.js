// ==UserScript==
// @name           sina_weibo_commander
// @namespace      weibo
// @include        http://weibo.com/*
// ==/UserScript==
//

//TODO fix element key install

(function() {

    function invokeMouseEvent(elem, evname) {
        var e = document.createEvent('MouseEvents');
        e.initMouseEvent(evname, true, true, e.view||window, 0, 0, 0, 0, 0,
            false, false, false, false, 0, null);
        elem.dispatchEvent(e);
    }

    function click(elem) {
        invokeMouseEvent(elem, 'click');
    }

    function mousedown(elem) {
        invokeMouseEvent(elem, 'mousedown');
    }

    function mouseup(elem) {
        invokeMouseEvent(elem, 'mouseup');
    }

    function plus(elem) {
        var elems = elem.getElementsByTagName('button');
        for (var n = 0; n < elems.length; n++) {
            if (elems[n].getAttribute('g:type') == 'plusone') {
                click(elems[n]);
            }
        }
    }

    function comment(elem) {
        //var elems = elem.getElementsByTagName('button');
        var elems = elem.getElementsByTagName('a');
        for (var n = 0; n < elems.length; n++) {
            if (elems[n].id.substring(0,8)== '_comment') {
                return elems[n];
            }
        }
        return false;
    }
    function tools(elem) {
        var ret = [];
        //var elems = elem.getElementsByTagName('button');
        var elems = elem.getElementsByTagName('a');
        for (var n = 0; n < elems.length; n++) {
            if (elems[n].getAttribute('g:type') == 'plusone') {
                var next = elems[n];
                while (next) {
                    if (next.nodeType == 1 && next.getAttribute('role') == 'button')
                        ret.push(next);
                    next = next.nextSibling;
                }
            }
        }
        return ret;
    }

    function newEntry() {
        var elems = getElementsByTagAndClassName('div', 'n-Nd');
        if (elems.length > 0) {
            window.scrollTo(0, 0);
            click(elems[0]);
            return true;
        }
        return false;
    }

    function setFocus(elem)
    {
        elem.style.borderLeft = '2px solid #ffff00';
    }

    function cleanFocus(elem)
    {
        elem.style.border='';
    }

    function closeForm(elem) {
        if (elem.id.match(/\.f$/)) {
            var cancel = findCancelElement(elem);
            if (cancel) {
                elem.blur();
                cancel.focus();
                if (cancel.id.match(/\.c$/)) {
                    click(cancel);
                } else {
                    mousedown(cancel);
                    mouseup(cancel);
                }
                return true;
            }
        }
        return false;
    }

    function getItems() {
        var items = [];
        var elems = document.getElementsByTagName('li');
        for (var n = 0; n < elems.length; n++) {
            var e = elems[n];
            if (e.id.substring(0,4) == 'mid_') {
                items.push(e);
            }
        }
        return items;
    }

    function getOffset(elem){
        return elem.offsetTop;
        var y = 0;
        while(elem.parentNode){
            y += elem.offsetTop;
            elem = elem.parentNode;
        }
        return y;
    }

    var onFoucusId = undefined;

    var globalKeymap = {

        'gg': function(e) {
            var elems = getItems();
            var elem = elems[0];
            if(onFoucusId)
                cleanFocus(document.getElementById(onFoucusId));
            onFoucusId = elem.id;
            setFocus(elem);
            window.scrollTo(0, getOffset(elem)-30);
            GM_log("scroll to" + getOffset(elem));
            click(elem);
            return true;
        },
        'G': function(e) {
            var elems = getItems();
            var elem = elems[elems.length-1];
            if(onFoucusId)
                cleanFocus(document.getElementById(onFoucusId));
            onFoucusId = elem.id;
            window.scrollTo(0,getOffset(elem)-30);
            GM_log("scroll to" + getOffset(elem));
            click(elem);
            return true;
        },
        'k': function(e) {
            //click(document.getElementById('gbi1'));
            var elems = getItems();
            var elem ;
            GM_log("foucus" + onFoucusId);
            if(onFoucusId)
            {
                for( var i =1 ; i< elems.length-1; ++i )
                {
                    if ( elems[i].id == onFoucusId )
                    {
                        cleanFocus(elems[i]);
                        elem = elems[i-1];
                    }
                }
                if(! elem)
                    elem= elems[0];
            }
            else
                return false;

            onFoucusId = elem.id;
            setFocus(document.getElementById(onFoucusId));
            window.scrollTo(0, getOffset(elem)-30);
            GM_log("scroll to" + getOffset(elem));
            click(elem);
            return true;
        },
        'j': function(e) {
            //click(document.getElementById('gbi1'));
            var elems = getItems();
            var elem ;
            GM_log("foucus" + onFoucusId);
            if(onFoucusId)
            {
                for( var i =0 ; i< elems.length-1; ++i )
                {
                    if ( elems[i].id == onFoucusId )
                    {
                        cleanFocus(elems[i]);
                        elem = elems[i+1];
                    }
                }
                if(! elem)
                    elem= elems[elems.length-1];
            }
            else
                elem =  elems[0];

            onFoucusId = elem.id;
            setFocus(document.getElementById(onFoucusId));
            window.scrollTo(0, getOffset(elem) - 30);
            GM_log("scroll to" + getOffset(elem));
            click(elem);
            return true;
        },
        'm': function(e) {
            if (!e.ctrlKey) {
                comment(document.getElementById(onFoucusId)).click();
                return true;
            }
            return false;
        },
        'dgh': function(e) {
            location.href = 'https://plus.google.com/';
            return true;
        },
        'dgP': function(e) {
            location.href = 'https://plus.google.com/photos';
            return true;
        },
        'dgp': function(e) {
            location.href = 'https://plus.google.com/me';
            return true;
        },
        'dgc': function(e) {
            location.href = 'https://plus.google.com/circles';
            return true;
        }
    };

    var itemKeymap = {
        'i': function(e) {
            if (newEntry()) {
                return true;
            }
            return false;
        },
        'c': function(e) {
            if (!e.ctrlKey) {
                click(comment(e.target));
                return true;
            }
            return false;
        },
        'n': function(e) {
            click(document.getElementById('gbi1'));
            return true;
        },
        's': function(e) {
            click(tools(e.target)[1]);
            return true;
        },
        '+': function(e) {
            plus(e.target);
            return true;
        }
    };
    for (var k in globalKeymap) {
        itemKeymap[k] = globalKeymap[k]
    }

    var stack = "";
    var timer = 0;
    function handleKeys(e, m) {
        var c = String.fromCharCode(e.which ? e.which :
                e.keyCode ? e.keyCode : e.charCode);
        stack += c;
        var u = 0;
        for (var k in m) {
            if (k == stack) {
                e.preventDefault();
                var f = m[stack];
                if (f) {
                    stack = "";
                    if (f(e)) return true;
                }
                return false;
            } else if (k.substring(0, stack.length) == stack) {
                u++;
            }
        }
        try { clearTimeout(timer) } catch(ee) {};
        if (u) {
            e.preventDefault();
            timer = setTimeout(function() {
                var f = m[stack];
                stack = "";
                if (f) f(e);
            }, 2000);
        } else {
            stack = "";
        }
    }

    function installGlobalKeys(elem) {
        elem.addEventListener('keypress', function(e) {
            //if (e.target.id.substring(0, 4) == 'mid_') return;
            //if (e.target.nodeName.toLowerCase() == 'input') return;
            //if (e.target.getAttribute('g_editable') == 'true') return;
            return handleKeys(e, globalKeymap);
        }, false)
    }

    function installItemKeys(elem) {
        elem.addEventListener('keypress', function(e) {
            if (e.target.id.substring(0, 4) != 'mid_') return;
            return handleKeys(e, itemKeymap);
        }, false)
        elem.className += ' gpcommander';
    }

    function installEditorKeys(elem) {
        elem.addEventListener('keyup', function(e) {
            var hooked = false;
            if (hasClass(e.target, 'editable')) {
                var c = String.fromCharCode(e.keyCode ? e.keyCode : e.charCode);
                if (!e.shiftKey) {
                    c = c.toLowerCase();
                }
                switch (c) {
                    case '\x1b':
                        hooked = closeForm(e.target);
                        break;
                }
            }
            if (!hooked) {
                e.preventDefault();
            }
        }, false)
        elem.className += ' gpcommander';
    }

    function hasClass(elem, clazz) {
        var zz = elem.className.split(/\s+/g);
        for (var m = 0; m < zz.length; m++) {
            if (zz[m] == clazz) return true;
        }
        return false;
    }

    function getElementsByTagAndClassName(tag, clazz) {
        var retval = [];
        var elems = document.getElementsByTagName(tag);
        for (var i = 0, I = elems.length; i < I; ++i) {
            var e = elems[i];
            if (hasClass(e, clazz)) {
                retval.push(e);
            }
        }
        return retval;
    }

    function findElement(elem, matcher) {
        if (matcher(elem)) {
            return elem;
        }
        for (var child = elem.firstChild; child; child = child.nextSibling) {
            var found = findElement(child, matcher);
            if (found) {
                return found;
            }
        }
        return undefined;
    }

    function findElementFromNext(elem, matcher) {
        for (var curr = elem.nextSibling; curr; curr = curr.nextSibling) {
            var found = findElement(curr, matcher); 
            if (found) {
                return found;
            }
        }
        if (elem.parentNode) {
            return findElementFromNext(elem.parentNode, matcher);
        } else {
            return undefined;
        }
    }

    function findCancelElement(elem) {
        return findElementFromNext(elem, function(e) {
            return e.id && e.id.match(/\.c(ancel)?$/);
        });
    }

    function install() {
        var elems = document.getElementsByTagName('li');
        for (var n = 0; n < elems.length; n++) {
            var e = elems[n];
            if (e.id.substring(0, 4) == 'mid_' && !hasClass(e, 'gpcommander')) {
                installItemKeys(e);
            } else if (hasClass(e, 'editable') && !hasClass(e, 'gpcommander')) {
                installEditorKeys(e);
            }
        }
    }
    window.setInterval(install, 1000);
    installGlobalKeys(document);
})()
