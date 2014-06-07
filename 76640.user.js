// ==UserScript==
// @name           Kryptos
// @namespace      Ogame Imperial units
// @description    Replaces the decimals with commas. 
// @version	   1
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

function getElementsByClass(searchClass, domNode, tagName) {
            if (domNode == null) domNode = document;
            if (tagName == null) tagName = '*';
            var el = new Array();
            var tags = domNode.getElementsByTagName(tagName);
            var tcl = " " + searchClass + " ";
            for (i = 0, j = 0; i < tags.length; i++) {
                var test = " " + tags[i].className + " ";
                if (test.indexOf(tcl) != -1)
                    el[j++] = tags[i];
            }
            return el;
        }
        function execute() {
            var re = new RegExp("[.]");
            var rep = getElementsByClass("overmark");
            for (i = 0; i < rep.length; i++) {
                rep[i].innerHTML = rep[i].innerHTML.replace(re, ",");
            }
        }
        window.onload = execute;