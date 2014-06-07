// ==UserScript==
// @name           Google Language Links
// @namespace      http://satomacoto.blogspot.com
// @include        http://*.google.*
// @description    検索結果に英語・日本語の言語設定のリンクを追加します。
// ==/UserScript==

(function () {

    var lang = {
        "en": "Search English pages",
        "ja": "Search Japanese pages"
    };

    var func = function() {
        setTimeout(function() {
            var lr_ = document.getElementById("lr_");
            var ctrl = null;
            if (lr_) {
                ctrl = lr_.parentNode;
            } else {
                var tbd = document.getElementById("tbd");
                if (tbd) {
                    ctrl = document.createElement("ul");
                    ctrl.setAttribute("class", "tbt tbpd");
                    
                    var li = document.createElement("li");
                    li.setAttribute("class", "tbos");
                    li.setAttribute("id", "lr_");
                    li.innerText = "Search the web";
                    
                    ctrl.appendChild(li);
                    tbd.insertBefore(ctrl, tbd.firstChild);
                }
            }
            if (!ctrl) return;

            var url = "";
            if (location.hash) {
                url = location.pathname + location.hash;
            } else {
                url = location.href;
            }
            if (url.indexOf("&lr=") < 0) {
                url += "&lr=";
            }
            if (url.indexOf("&hl=") < 0) {
                url += "&hl=";
            }
            
            for (var key in lang) {
                url += "&";
                url = url.replace(/([\?&#]lr=)(.*?)&/g, "$1"+ "lang_" + key + "&");
                url = url.replace(/([\?&#]hl=)(.*?)&/g, "$1" + key + "&");
                url = url.replace(/([\?&#]fp=)(.*?)&/g, "&");
                url = url.replace(/&+$/, "");
                
                var l = document.getElementById("lr_lang_1" + key);        
                if (l) {
                    l.firstChild.href = url;
                } else {
                    var li = document.createElement("li");
                    li.setAttribute("class", "tbou");
            
                    var a = document.createElement("a");
                    a.setAttribute("class", "q qs");
                    a.href = url;
                    console.log(a.href);
                    a.appendChild(document.createTextNode(lang[key]));
            
                    li.appendChild(a);
                    li.setAttribute("id", "lr_lang_1" + key);

                    ctrl.appendChild(li);
                    
                }
            }
       }, 200);
    };
    
    func();
    document.addEventListener('DOMNodeInserted', func, false);
})();