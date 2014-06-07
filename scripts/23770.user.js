// ==UserScript==
// @name        Time Mini
// @namespace   http://chum54.blog103.fc2.com/
// @include     *
// @version     0.0.3
// ==/UserScript==

(function () {
    // ignore inner frame
    if (String(window.frameElement).indexOf('HTMLIFrameElement') < 0){
        var reload=true;
        var delay = 60000;
        setInterval(function() {
                var now = new Date();
                var hour = now.getHours();
                var min =  now.getMinutes();
                var clock = " " + ((hour < 10) ? " " : "") + hour;
                clock += ":";
                clock += ((min <10) ? "0" : "") + min;
                document.getElementById("time_mini_clock").innerHTML = clock;
                reload = !reload;
            }, delay);


        time=document.createElement("div");
        time.innerHTML="<div id=\"time_mini\" style=\"background-color:white;color:black;padding:2px;position:fixed; top:0.2em;right: 0.2em;opacity:0.5;z-index:100;font-size:14px;\"><span id=\"time_mini_clock\"></span></div>";
        document.body.appendChild(time);


        var now = new Date();
        var hour = now.getHours();
        var min =  now.getMinutes();
        var clock = " " + ((hour < 10) ? " " : "") + hour;
        clock += ":";
        clock += ((min <10) ? "0" : "") + min;
        document.getElementById("time_mini_clock").innerHTML = clock;
    }
})();

