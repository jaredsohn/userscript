// ==UserScript==
// @name           Bugzilla Login checker
// @namespace      http://www.ucw.cz/
// @description    Check if the current Bugzilla page is loaded by authenticated user
// @include        https://bugzilla.novell.com/*
// ==/UserScript==

var loginoutre=/Log (In|out)/;

function processLogInOut(liobj,pm) {
        var m=new String(pm);
        m=m.replace(/^.*,(.*)$/,"$1");             
        if (m=="In") {
                var atags=liobj.getElementsByTagName("a");
                for(var i=0;i<atags.length;i++) {
                        window.location=atags[i].href;
                }
        }                 
}                         
                          
                          
function loginCheck() {
        var x;
        var m;
        var s = document.getElementById("header");

        if(!s) { return false; }
        var itags = s.getElementsByTagName("li");

        for (x=0;x<itags.length;x++) {
                if(itags[x].parentNode.className=="links") {
                        m = itags[x].innerHTML.match(loginoutre);
                        if (m) {
                                processLogInOut(itags[x],m);
                                break;
                        }                          
                }                                   
        }
        return false;
  }

loginCheck();
