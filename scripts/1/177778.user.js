// ==UserScript==
// @name       PlugBot Autoloader
// @version    1.0
// @description  PlugBot Autoloading script that loads in PlugBot after everything is loaded.
// @match      http://plug.dj/*/
// @exclude    http://plug.dj/lobby/
// @copyright  2013, Wadu436
// ==/UserScript==

// AutoLoad script by Wadu436
// plugBot by connergdavis: https://github.com/connergdavis/Plugbot

function loadScript() {
    var jsCode = document.createElement('script'); 
    jsCode.setAttribute('id', 'plugbot-js'); 
    jsCode.setAttribute('src', 'https://raw.github.com/connergdavis/Plugbot/master/plugbot.js'); 
    document.body.appendChild(jsCode);
}
function loadPlugBot() { 
    setTimeout(function () {
        if(API.getNextMedia() != undefined){
            loadScript();
        } else{
            loadPlugBot();
        }
    }, 500);
}
window.addEventListener("load", loadPlugBot(), false); 