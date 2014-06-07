// ==UserScript==
// @name        Expand_Display
// @namespace   yellowbluebus.com
// @include     http://focalpoint.*.net/fp/servlet/ElementManager*
// @version     1
// ==/UserScript==

// window.addEventListener('load', function () 
// {
//     expand(1);
// }

// unsafeWindow.expand(1);

// parent.window.frames[2].expand(1);

function __exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

window.addEventListener("load", function() {
    // script injection
    __exec(function() {
        expand(1);
    });
}, false);


