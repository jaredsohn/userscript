// ==UserScript==
// @name           Fully Maximize Google Calendar with F12 Toggle
// @namespace      http://www.google.com/calendar/*
// @description    Makes the most of Google Calendar on limited screen real estate (great for EEE PC).
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// ==/UserScript==

(function(){

        window.addEventListener("keydown",function(e) {
                if((e.keyCode==123)) {
                //if((e.keyCode==122)&&(e.ctrlKey)) { //control-F11
                        guser = document.getElementById('guser');
                        gbar = document.getElementById('gbar');
                        nav = document.getElementById('nav');
                        topbar = document.getElementById('topBar');
                        body = window.document.body;
                        mothertable = document.getElementById('mothertable');
                        if (guser.style.display != "none"){
                                guser.style.display = "none";
                                gbar.style.display = "none";
                                body.style.margin = "0px";
                                mothertable.style.padding = "0";
                                nav.style.visibility = "collapse";
                                nav.style.width = "0px";
                                topbar.style.visibility = "collapse";
                                unsafeWindow._SR_backToCalendar();
                        }else{
                                guser.style.display = "";
                                gbar.style.display = "";
                                body.style.margin = "0pt 1ex";
                                mothertable.style.padding = "0pt 1ex";
                                nav.style.visibility = "visible";
                                nav.style.width = "13em";
                                topbar.style.visibility = "visible";
                                unsafeWindow._SR_backToCalendar();
                        }
                } 
        }, false);

})();
