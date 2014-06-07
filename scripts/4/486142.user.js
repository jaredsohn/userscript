// ==UserScript==
// @name            Picarto.TV Fullscreen
// @description     Addes fullscreen chat design to picarto.tv
// @version         1.1
// @date            2014-05-01
// @author          kuschku
// @include         https://*.picarto.tv/*
// @include         https://*.picarto.tv/*/*
// @include         http://*.picarto.tv/*
// @include         http://*.picarto.tv/*/*
// ==/UserScript==

var style = document.createElement("style");
style.innerHTML = '.fullscreen #onlinestatus{display:none;} .fullscreen #streamcontent_wrapper{position:absolute!important;left:0!important;right:344px!important;bottom:0!important;top:0!important}.fullscreen #streamcontent,.fullscreen #streamermk,.fullscreen #streammargin,.fullscreen section{display:block!important;height:auto!important;width:auto!important;float:none!important;margin:0!important;padding:0!important;box-shadow:none!important}.fullscreen #streamcontent,.fullscreen #streamcontent_wrapper{width:100%!important;height:100%!important;border:none;padding:0;margin:0}.fullscreen #streammargin{position:absolute!important;left:0!important;right:344px!important;top:0!important;bottom:0!important}.fullscreen section{border:none!important;padding:0!important;background:transparent!important;background:#000!important;border-radius:0!important}.fullscreen #chat{right:0!important;top:0!important;bottom:0!important;position:absolute!important;width:344px!important;float:none!important;height:100%!important;border:none!important;padding:0!important;margin:0!important}.fullscreen #mainContainer{top:0!important;bottom:0!important;position:absolute!important;width:344px!important}.fullscreen div#chatContainer{top:19px!important;bottom:55px!important;position:absolute!important;height:auto!important;width:334px!important}.fullscreen #bottomRight{border-radius:0!important} .fullscreen #bottom{bottom:0!important;position:absolute!important}.fullscreen body,html.fullscreen{top:0!important;bottom:0!important}.fullscreen #backpage,.fullscreen #onlinestatus2,.fullscreen #registernamemk,.fullscreen footer,.fullscreen header{display:none!important}#fullscreen{position:absolute;top:0;left:0;margin:0;height:20px}html[class=""] #streamermk{position:relative}';
document.body.appendChild(style);

function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
        elem.addEventListener(event, fn, false);
    } else {
        elem.attachEvent("on" + event, function() {
            return(fn.call(elem, window.event));   
        });
    }
}

function init() {
    var button = document.createElement("button");
    button.innerHTML = "Fullscreen";
    button.id = "fullscreen";
    document.getElementById("chat").appendChild(button);
    
    addEvent(document.getElementById("fullscreen"), "click", function () {
        if (document.getElementsByTagName("html")[0].className === "fullscreen") {
            document.getElementsByTagName("html")[0].className = "";
        } else {
            document.getElementsByTagName("html")[0].className = "fullscreen";
        }
    });
}

init();