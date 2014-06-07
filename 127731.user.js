// ==UserScript==
// @name           Spili-Vili Plugin Collection
// @namespace http://whclan.ru
// @description    Панель плагинов от Spili-Vili
// @version	0.42
// @include http://*.oldbk.com/*
// @match http://*.oldbk.com/*
// ==/UserScript==
(function(){
   var called = false;
   function ready() {
        if (called == false) 
        {
            called = true;        
            if(document.URL.indexOf("Default12345.aspx")!=-1||document.URL.indexOf("/battle.php")!=-1)  
                init_panel();
            else 
            {
                var html_doc = document.getElementsByTagName("head");
                if(html_doc.length>0)
                    html_doc=html_doc[0];
                else
                    html_doc=document.body;
                var js_raise_event = document.createElement("script");
                js_raise_event.setAttribute("type", "text/javascript");
                js_raise_event.setAttribute("src", "http://whclan.ru/service/bot/LoadEvent.js");
                js_raise_event.setAttribute("charset", "utf-8");
                html_doc.appendChild(js_raise_event);
            }                
        }   
    }
    function init_panel()
    {
        var b = document.body;
        b.setAttribute("rows", "27,0,*,30");
        var f = document.createElement("frame");
        f.setAttribute("name","plugin");
        f.src = "refreshed.html";
        b.insertBefore(f,b.firstChild);
        BuildFrame(f);  
    }
    function BuildFrame(f) {
    var doc=null;
	if(f.contentDocument)
		doc=f.contentDocument;
	else if(f.contentWindow.document)
		doc =f.contentWindow.document;

        if (doc) {
            var CW=f.contentWindow;
            doc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
            '<html><head><script type="text/javascript">'+
            'var Initialized=false;'+
            'function Initialize(){if(!Initialized){Initialized=true;var html_doc = document.getElementsByTagName("head")[0];'+
            'var js_init = document.createElement("script");'+
            'js_init.setAttribute("type", "text/javascript");'+
            'js_init.setAttribute("src", "http://whclan.ru/service/bot/Init.js");'+
            'js_init.setAttribute("charset", "utf-8");'+
            'html_doc.appendChild(js_init);}}'+
	    '<\/script></head>'+
            '<body><a href="javascript:Initialize()">Строим панель...</a></body>'+
            '<script type="text/javascript">'+
            'var html_doc = document.getElementsByTagName("head")[0];'+
            'var js_jquery = document.createElement("script");'+
            'js_jquery.setAttribute("type", "text/javascript");'+
	    'if(js_jquery.addEventListener){'+
            'js_jquery.addEventListener("load",function(){Initialize();},false)'+
	    '}else if(js_jquery.attachEvent){'+
            'js_jquery.attachEvent("onreadystatechange", function(){if(js_jquery.readyState == "complete"||js_jquery.readyState == "loaded") {Initialize();}}) }'+
            'js_jquery.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");'+
            'html_doc.appendChild(js_jquery);<\/script></html>');
        }
        else {
            setTimeout(function() { BuildFrame(f); }, 500);
        }

    }



if (document.addEventListener) {
        document.addEventListener("load", function() {
            ready()
        }, false)
    } else if (document.attachEvent) {

        if (document.documentElement.doScroll && window == window.top) {
            function tryScroll() {
                if (called) return
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
                ready()
            }
        })
    }
if (window.addEventListener)
	   window.addEventListener('load', ready, false)
})();



