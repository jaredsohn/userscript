// ==UserScript==
// @name       Google+: Cleaner sidebar
// @namespace  http://www.somethingafal.com/
// @version    0.1
// @description  Cleans up the right hand sidebar
// @include    https://plus.google.com/*
// @copyright  2012 Dafydd "Afal" Francis
// ==/UserScript==

(function () {
    var DOMLib = {
        get_element_by_attribute: function (root, attribute, value) {
            var i, attr, root = root.children;
            for (i = 0; i < root.length; i++) {
                if ((attr = root[i].getAttribute(attribute)) && attr === value) {
                    return root[i];
                }
            }
        },
        delete_element: function (parent, child) {
            parent.removeChild(child);
        }
    };
    var content = document.getElementById("content").children[0],
        sidebar = DOMLib.get_element_by_attribute(content, "guidedhelpid", "social-pane");
    sidebar.style.position = "absolute";
    sidebar.style.left = "-1000px";
    
        GM_addStyle("#oz-chat-roster{position:fixed;border:solid 1px gray;background:white;width:200px;right:10px;top:160px}");
}());