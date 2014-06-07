// ==UserScript==
// @name       FLIPPITY FLIP
// @namespace  http://ass.com/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @require    http://code.jquery.com/jquery-1.8.3.min.js
// @copyright  2012+, You
// ==/UserScript==
var deg = 0;
function loop() {
    deg = deg + (Math.random()*40) + -20;
    if (deg > 180) {
        deg = -180;
    }
    //document.body.style.webkitTransform = "rotate("+deg+"deg)";
    $.each($("body").children().find(":visible"), function() {
          $(this).css("webkitTransform", "rotate("+ (deg + (Math.random()*100) - 50) +"deg)");
    });
    
    
    setTimeout(function() { loop(); }, 10);
}
loop();