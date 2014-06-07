// ==UserScript==
// @id             ynetVideoFix
// @name           ynetVideoFix
// @version        0.1.2
// @namespace      
// @author         Ohad Cohen
// @description    fix ynet video don't stop on close bug
// @include        http://www.ynet.co.il/*
// @run-at         window-load
// ==/UserScript==

if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();
  return;
}

if(document.getElementsByClassName("hp_player_content")[0])
    document.getElementsByClassName("hp_player_content")[0].onclick=function(){
        document.getElementById("ynet_lightbox_video_header").getElementsByTagName("div")[2].onclick=function(){
            $f("yntfpcontainer1").close();
        }
    }
    
if(document.getElementById("fpMainWrapper1"))
    document.getElementById("fpMainWrapper1").onclick=function(){
        document.getElementsByClassName("hp_player_video_close")[0].onclick=function(){
            $f(0).close();
        }
    }

