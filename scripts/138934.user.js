// ==UserScript==
// @id             ba-bamail maavaron skiper
// @name           skip ba-bamail maavaron pages
// @version        1.0
// @namespace      
// @author         Ohad Cohen
// @description    
// @include        http://new.ba-bamail.co.il/*
// @run-at         document-end
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
if(document.getElementById("div_maavaron"))
    Maavaron.close();