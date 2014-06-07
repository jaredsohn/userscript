// ==UserScript==
// @name           LDR with say
// @namespace      ldr_with_say.gm.hakobe.jp
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

window.addEventListener("load", function() {
  with(unsafeWindow){

    Keybind.add("j", function() {    
        GM_xmlhttpRequest({
            method : 'GET', 
            url : 'http://localhost/cgi-bin/say.cgi?msg=y&voice=Alex', 
            onload : function(){}
        });
        Control.go_next();
    });
    Keybind.add("k",function() {
        GM_xmlhttpRequest({
            method : 'GET', 
            url : 'http://localhost/cgi-bin/say.cgi?msg=hara&voice=Alex', 
            onload : function(){}
        });

        Control.go_prev();
    });
  }
},false);