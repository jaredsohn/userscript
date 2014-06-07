// ==UserScript==
// @name OpenSpritz reader
// @description OpenSpritz reader. Use Alt+R to active it
// @require https://miserlou.github.io/OpenSpritz/spritz.js?callback=cb?callback=cb
// @include *
// @version 1.0
// @License The MIT License
// ==/UserScript==

var spritzCreated = false;

function create_spritz_2(){

     spritz_loader = function() {
        //getURL("https://rawgithub.com/Miserlou/OpenSpritz/master/spritz.html", function(data){

        //getURL("https://rawgithub.com/Miserlou/OpenSpritz/dev/spritz.html", function(data){

        // This won't work in Firefox because an old bug and won't work in Chrome because of security stuff:
        //getURL("spritz.html", function(data){

        //getURL("https://rawgithub.com/Miserlou/OpenSpritz/dev/spritz.html", function(data){
        getURL("https://rawgithub.com/Miserlou/OpenSpritz/master/spritz.html", function(data){
            var spritzContainer = document.getElementById("spritz_container");

            if (!spritzContainer) {
                var ele = document.createElement("div");
                data = data.replace(/(\r\n|\n|\r)/gm,"");
                ele.innerHTML = data;
                document.body.insertBefore(ele, document.body.firstChild);
                document.getElementById("spritz_toggle").style.display = "none";
            };

            document.getElementById("spritz_selector").addEventListener("change", function(e) {
                var wpm = parseInt(document.getElementById("spritz_selector").value, 10);
                if (wpm > 1) {
                    GM_setValue("defaultSpeed", wpm);
                }
                clearTimeouts();
                spritz();
            });
            selectDefaultSpeed();
            spritz();
        });
    };

    spritz_loader();
}

function show_spritz() {
    if (spritzCreated) {
        document.getElementById("spritz_spacer").style.display = "block";
        document.getElementById("spritz_container").style.display = "block";
        document.getElementById("spritz_holder").style.display = "block";
    }
}

function selectDefaultSpeed() {
    var spd = GM_getValue("defaultSpeed", false);
    if (spd) {
        var sel = document.getElementById('spritz_selector');
        for(var i, j = 0; i = sel.options[j]; j++) {
            if(i.value == spd) {
                sel.selectedIndex = j;
                break;
            }
        }
    }
}

function keyUp(e) {
    // ALT+R
    if (e.altKey && e.keyCode == 82) {
        if (!spritzCreated) {
            create_spritz_2();
            spritzCreated = true;
        } else {
            show_spritz();
            clearTimeouts();
            spritz();
        }
    }
}

window.addEventListener('keyup', keyUp, true);