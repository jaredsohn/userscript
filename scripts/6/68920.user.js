// ==UserScript==
// @name           Facebook global application bookmarks
// @namespace      Facebook
// @description    Creates a persistent bookmark box for facebook
// @include        http://*.facebook.com/*
// ==/UserScript==

if (typeof autoUpdate != 'undefined') {
    autoUpdate(68920, "1.3");
}

function refreshApps() {
    document.getElementById('initappcol').innerHTML = '<img style="margin-left: 80px;" src="http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif" />';
    GM_xmlhttpRequest({ 
        method: "GET", url: "http://www.facebook.com/editapps.php?v=bookmark", onload: function(response) {
            appdiv = document.getElementById('initappcol');
            appdiv.innerHTML = response.responseText;
            applist = document.getElementById('editapps').firstChild.lastChild.firstChild;
            var thelist = "<table>\n";
            for (i = 0; i < applist.children.length; i++) {
                var thisChild = applist.children[i];
                thelist += "<tr><td>" + thisChild.getElementsByTagName('img')[0].parentNode.innerHTML + "</td>";
                thelist += "<td>" + thisChild.getElementsByTagName('a')[0].parentNode.innerHTML + "</td></tr>\n";
            }
            appdiv.innerHTML = thelist + "</table>\n";
        }
    });
}
            
function getApps() {
    if (!document.getElementById('blueBar')) { return; }
    GM_xmlhttpRequest({ 
        method: "GET", url: "http://www.facebook.com/editapps.php?v=bookmark", onload: function(response) {
            if (document.getElementById('initappcol')) {
            }
            blueBar = document.getElementById('blueBar');
            appdivheadstyle = "background-color:#627AAD;"
                + "border-color: #1D4088 #1D4088 -moz-use-text-color; "
                + "z-index: 9998; "
                + "border-style: solid solid none; "
                + "border-width: 1px 1px 0; "
                + "color: white; "
                + "font-size: 11px; "
                + "font-weight: bold; "
                + "text-align: center; "
                + "height: 22px; "
                + "width: 182px; "
                + "padding: 8px 0 0; "
                + "margin-left: 8px; "
                + "position: absolute; "
                + "left: 10px; "
                + "top: 10px;";
            var appdivhead = document.createElement('div');
            appdivhead.id = ('initappcolhead');
            appdivhead.setAttribute("style", appdivheadstyle);
            blueBar.appendChild(appdivhead);
            document.getElementById('initappcolhead').innerHTML = '<a id="achlnk" href="http://www.facebook.com/editapps.php?v=bookmark" '
                + 'style="color: #fff;">Applications</a>';
            var adstyle = "position:absolute; "
                + "z-index:9998; "
                + "margin-top: none; "
                + "background-color: #fff; "
                + "margin-left: 8px; "
                + "top: 41px; "
                + "left: 10px; "
                + "width: 182px; "
                + "border: 1px solid #B3B3B3; "
                + "border-top: none; "
                + "margin: none; "
                + "padding: none; "
                + "overflow: hidden;";
            var appdiv = document.createElement('div');
            appdiv.id = "initappcol";
            appdiv.setAttribute("style", adstyle);
            blueBar.appendChild(appdiv);
            appdiv = document.getElementById('initappcol');
            appdiv.innerHTML = response.responseText;
            applist = document.getElementById('editapps').firstChild.lastChild.firstChild;
            var thelist = "<table>\n";
            for (i = 0; i < applist.children.length; i++) {
                var thisChild = applist.children[i];
                thelist += "<tr><td>" + thisChild.getElementsByTagName('img')[0].parentNode.innerHTML + "</td>";
                thelist += "<td>" + thisChild.getElementsByTagName('a')[0].parentNode.innerHTML + "</td></tr>\n";
            }
            appdiv.innerHTML = thelist + "</table>\n";
            reflink = document.createElement('div');
            reflink.id = 'adreflink';
            reflink.setAttribute('style', 'z-index:9999; font-size: 8px; position: relative; width: 10px; overflow: hidden; left: 165px; bottom: 13px; border: 1px solid #000;');
            reflink.addEventListener('click', refreshApps, true);
            appdivhead.appendChild(reflink);
            reflink = document.getElementById('adreflink');
            reflink.innerHTML = 'Re';
        }
    });
}

window.addEventListener("load", getApps(), false);
