// ==UserScript==
// @name           Download afschriften zonder vertraging
// @description    Normaal moet je 10 seconden wachten tussen het downloaden van elk afschrift. Dit reset de javascript timer. Hopelijk checken ze het niet server-side.
// @namespace      lucb1e
// @include        https://bankieren.rabobank.nl/era/era.cgi
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

setTimeout(function() {
    exec(function() {
        setInterval("document.RTI.X012.value = 0;", 10);
    });
}, 1500);