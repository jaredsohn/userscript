// ==UserScript==
// @name           Damned plugin panel
// @namespace http://bkdamned.clan.su
// @description    Панель плагинов от клана Damned
// @include http://*.oldbk.com/*
// @match http://*.oldbk.com/*
// ==/UserScript==

(function(){
    var load = false;
    function ready() {
        if (load == false){
            load = true;
            if(document.URL.indexOf("Default12345.aspx")!=-1||document.URL.indexOf("/battle.php")!=-1)
                init_plugin();
        }
    }
    function init_plugin(){
        var b = document.body;
        b.setAttribute("rows", "27,0,*,30");
        var f = document.createElement("frame");
        f.setAttribute("name","damned_plugin");
        f.src = "damned_plugin.html";
        b.insertBefore(f,b.firstChild);
        CreateFrame(f);
    }
    function CreateFrame(f) {
        var mw=null;
        if(f.contentDocument)
            mw=f.contentDocument;
        else if(f.contentWindow.document)
            mw =f.contentWindow.document;
        if (mw) {
            var CW=f.contentWindow;
            mw.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
                '<html><head><script type="text/javascript">'+
                'var initm=false;'+
                'function init_main(){if(!initm){initm=true;var html_doc = document.getElementsByTagName("head")[0];'+
                'var js_init = document.createElement("script");'+
                'js_init.setAttribute("type", "text/javascript");'+
                'js_init.setAttribute("src", "http://damned.mtkcom.ru/panel/main.js");'+
                'js_init.setAttribute("charset", "utf-8");'+
                'html_doc.appendChild(js_init);}}'+
                '<\/script></head>'+
                '<body>Loading...</body>'+
                '<script type="text/javascript">'+
                'var html_doc = document.getElementsByTagName("head")[0];'+
                'var js_jquery = document.createElement("script");'+
                'js_jquery.setAttribute("type", "text/javascript");'+
                'if(js_jquery.addEventListener){'+
                'js_jquery.addEventListener("load",function(){init_main();},false)'+
                '}else if(js_jquery.attachEvent){'+
                'js_jquery.attachEvent("onreadystatechange", function(){if(js_jquery.readyState == "complete"||js_jquery.readyState == "loaded") {init_main();}}) }'+
                'js_jquery.setAttribute("src", "http://damned.mtkcom.ru/panel/jquery.min.js");'+
                'html_doc.appendChild(js_jquery);'+
                '<\/script></html>');
        }else{
            setTimeout(function() {
                CreateFrame(f);
            }, 1000);
        }

    }

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function() {
            ready();
        }, false)
    } else if (document.attachEvent) {
        if (document.documentElement.doScroll && window == window.top) {
            function tryScroll() {
                if (load) return
                if (!document.body) return
                try {
                    document.documentElement.doScroll("left")
                    ready()
                } catch (e) {
                    setTimeout(tryScroll, 0)
                }
            }
            tryScroll()
        }

        window.attachEvent( "onload", ready );

        document.attachEvent("onreadystatechange", function() {
            if (document.readyState === "complete") {
                ready();
            }
        })
    }
    if (window.addEventListener)
        window.addEventListener('load', ready, false)

    if(document.body)
        ready();

})();
