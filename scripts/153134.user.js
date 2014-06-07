// ==UserScript==
//
//Displayable Name of your script 
// @name           Winster auto-spin
//
// brief description
// @description    Automatically spins for bingo in Winster.
//
//URI 
// @namespace      http://userscripts.org/scripts/show/153134
//
// @author         Nathan Harvey
//
// @license        Public domain 
//
//(optional) may be used by browsers to display an about link
// @homepage       http://www.sarathonline.com/dyn/userscripts/hello/ 
//
//Version Number
// @version        0.7.4
//
// Urls process this user script on
// @include        http://www.winster.com/games/console
// @include        http://www.jjot.com/
// @include        http://jjot.com/
// @include        http://www.jjot.com
// @include        http://jjot.com
// @include        jjot.com
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @grant          unsafeWindow
//
// ==/UserScript==


//Want to send to the tag: <embed id="UserProfileMain" ...>

$(function(){
var script = document.createElement("script");
script.setAttribute("type", "application/javascript");

    script.textContent = "(" +function(){
		window.setInterval(function(){sendIt();}, 5000);
	}
	+ function sendIt(){
        var d = jQuery.Event('keydown');
        d.which = 13;
        d.keyCode = 13;
        var p = jQuery.Event('keypress');
        p.which = 13;
        p.keyCode = 13;
        var u = jQuery.Event('keyup');
        u.which = 13;
        u.keyCode = 13;
        $('body').trigger(d);//down
        $('body').trigger(p);//press
        $('body').trigger(u);//up
    } + ")()";

document.body.appendChild(script);
});



/* old way:
function(){
    var ev = document.createEvent("KeyboardEvent");
    var targetNode  = document.querySelector ("#UserProfileMain embed"); 
    ev.initKeyEvent("keypress", true, false, targetNode, 0, 0, 0, 0, 13, 13);
    targetNode.dispatchEvent(ev);
}
*/