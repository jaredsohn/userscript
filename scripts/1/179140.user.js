// ==UserScript==
// @name       KickAss
// @namespace  DalekSec Userscripts
// @version    1.5
// @description  Angry? Destroy ANY website!
// @include /^https?://.*/
// @copyright  2011, 2012 Rootof Creations HB, rootof.com, kickassapp.com.
// ==/UserScript==
var ignored_tags = [
    "INPUT", "TEXTAREA"
];
function run(pressed_key){
    if(pressed_key.keyCode == 192 && ignored_tags.indexOf(document.activeElement.tagName) == -1){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        document.body.appendChild(s);
        s.src='//hi.kickassapp.com/kickass.js';
    }
}
document.body.onkeydown = run;