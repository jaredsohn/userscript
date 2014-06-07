// ==UserScript==
// @name          Remember The Milk Cow in Google Reader
// @namespace     http://forgotthemilk.net/
// @description   This script allows you to add a Remember The Milk task in Google Reader. You'll see cow icos in Google Reader.
// @include       http://www.google.*/reader/*
// @include       https://www.google.*/reader/*
// ==/UserScript==

// original author is Hiroshi Miyazaki
// see http://forgotthemilk.net/labo/rememberthemilk-cow-in-googlereader

(function() {
    //--- config parts. you can change settings at here. ---------//
    var def_prefix="website:"; //default prefix of task name(allow blank)
    var def_tag   ="website";  //default tag(allow blank)
    var def_due   ="today";    //default due date(allow blank)
    //------------------------------------------------------------//

    var timerID;
    var busy = false;

    //rtm small icon image(base64)
    var icon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAIAAABbzbuTAAAAB3RJTUUH1wkCAyk3mkuocAAAAAlw'+
    'SFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAHZSURBVHjaY/iPClatXqWsqPzv3z8I'+
    '18vLa8a0GcgKWBiQwKNHjwIDAtnZ2BkZGSEi7u7uL1+9RFYD0rB96/ar168GBwbfvX9XTk5OREQE'+
    'Lm2gZyAtLY2sgWHl8pU/f/788vXLlk1b7Gztrly9wsfLp6SgFBMdM3HCRKAbNm/avGPbjt7e3g3r'+
    'NwC5jJMmTbK0tOxo67hz987Hjx8fPHzAgApiYmMU5RXfvH1jZWV14MABZl5u3qzsLDlZOU0tzbXr'+
    '1wJtQ9Nw6dIlfgF+HR2drKysxw8fM61cvXLipIl37t0xNjb++OEjPDRWr1oNZzP8ZXj79m1TY5OF'+
    'hQUDXHT50uUQRnFRMZAEhsTqlVA9J0+eRGiGs3q7e6FCDAxzZs1hZ2fX1daFiEyfOh1LPHz78Q3C'+
    'mDxxcnJq8rsP73x8fCAi9+7dQ/gJrhUYXP9xgMrKSjibCaJt3bp1MTExDDjA79+/4WyohpvXbwoK'+
    'CgIZd+/eZcALoBq+//wOYaioqEAYFmYWwGCAsIWEhFDSEhC8f/8ewgCmUwijrKIsKCgIwgaGGLqn'+
    'nzx5YmNlg9XHnZ2dv379gnMZIQEP0VlYWPjnzx9WVtbPXz7//PZTTkGOl5e3oqwC5nAQAABsHHvO'+
    'd/cybQAAAABJRU5ErkJggg==';

    //make RTM icon as earch article
    function setRtmIcon(targetNode, href, titleStr) {
        //make linking string
        var anker = "javascript:(function(){name=\""+def_prefix+"\"+encodeURIComponent(\""+titleStr+"\");due=\""+def_due+"\";tags=\""+def_tag+"\";url=\""+href+"\";cp=\"http://m.rememberthemilk.com/add?name=\"+name+\"&due=\"+due+\"&tags=\"+tags+\"&url=\"+url;w=window.open(cp,\"_blank\",\"status=no,toolbar=no,width=200,height=560,resizable=yes\");setTimeout(function(){w.focus();},500);})();";
        //make anker tags
        var a = document.createElement("a");
        a.setAttribute('href', anker);
/*        a.setAttribute('target', '_blank');*/
        //make img tag
        var imgTag = document.createElement("img");
        imgTag.src = icon;
        imgTag.border="0px";
        //set img tag in anker tag
        a.appendChild(imgTag);
        //set anker tag in span tag
        with (targetNode) {
            appendChild(document.createTextNode(" "));
            appendChild(a);
        }
    }

    //make RTM icons
    function setRtmIcons(titleArray) {
        //loop for articles
        for (var i = 0; i < titleArray.length; i++) {
            var href = titleArray[i].href;
            var title = titleArray[i].node;
            var titleStr = titleArray[i].titleStr;
            //make span tag
            var node = document.createElement('span');
            node.className = 'googlereader2rtm';
            //make RTM icon
            setRtmIcon(node, href, titleStr);
            title.insertBefore(node, title.childNodes[1]);
        }
    }

    //main function(timer calls every 3 seconds)
    function greader_add_rtmicon() {
        if (busy) return;

        var titles = document.evaluate('//h2[@class="entry-title"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (! titles.snapshotLength) return;

        busy = true;

        var titleArray = new Array();
        for (var i = 0; i < titles.snapshotLength; i++) {
            var title = titles.snapshotItem(i);
            var nodes = title.childNodes;
            if ((nodes == null) ||
              (nodes[1] == null) ||
              (nodes[1].tagName != 'SPAN') ||
              (nodes[1].className != 'googlereader2rtm')) {
                var link = null;
                var titleStr = '';
                if (title.firstChild.tagName == 'A') {
                    // entry-container (Expanded view or Collapsed item)
                    link = title.firstChild;
                    titleStr = link.firstChild.textContent;
                } else {
                    // entry (List view)
                    link = title.parentNode.parentNode.firstChild;
                    if (link.tagName != 'A') link = null;
                    titleStr = title.textContent;
                }
                if (link != null) {
                    titleArray.push({ node: title, href: link.href, titleStr: titleStr });
                }
            }
        }
        if (titleArray.length == 0) {
            busy = false;
            return;
        }
        //make RTM icons
        setRtmIcons(titleArray);
        busy = false;
    }

    // be careful not to be too busy
    timerID = setInterval(greader_add_rtmicon, 3000);
})();
