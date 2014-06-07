// ==UserScript==
// @name          R12DisableTimeout
// @namespace     http://userscripts.org/users/rrph
// @description	  Stops EBS R12 Timesheet timeout by attempting to save every 1 min.
// @author        Pei Huang
// @homepage      
// @grant         none
// @include       https://oraprodr12.redrock.net.au/*
// @match         https://oraprodr12.redrock.net.au/*
// @version		  0.3
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

setInterval(function() {
    console.log("refresh page");
    exec(function() {
        if (document.getElementById("Hxccuitcsaveforlater") != null) {
            document.getElementById("Hxccuitcsaveforlater").click();
        }
    }); 
}, 60000);

for ( var i = 1; i < 100; i++ ){
    document.getElementById('A24' + i + 'N1display').size=Math.max(document.getElementById('A24' + i + 'N1display').value.length *1.3, 30);
    document.getElementById('A25' + i + 'N1display').size=Math.max(document.getElementById('A25' + i + 'N1display').value.length *1.3, 20);;
}