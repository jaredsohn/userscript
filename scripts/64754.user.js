// ==UserScript==
// @name          injecting script src   
// @description   tool to inject script src
// @include       http://w3-03.ibm.com/services/salesone/Global/html/*
// ==/UserScript==
 
// Anonymous function wrapper
(function() {
 var scripts = [
    '/services/salesone/cps/balloonLink.js'
];
for (i in scripts) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}
})(); 

// end anonymous function wrapper
