// ==UserScript==

// @name          Wikipedia Article Mode

// @namespace     http://buzypi.in/

// @description   Use the keyboard shortcut Ctrl+Alt+Z to toggle between article-mode and normal mode

// @include       http://*.wikipedia.org/*

// @include       http://*.wikibooks.org/*

// ==/UserScript==



/* Modifications to this script is permitted provided this comment is retained in its entirety.

 * Copyright: Gautham Pai

 * Author: Gautham Pai

 * http://buzypi.in/

 */



var wikifullscreen = {};

wikifullscreen.show = false;



function fullScreen() {

    var displayStyle = "";

    if(wikifullscreen.show){

        document.body.style.background = "none";

        document.body.style.backgroundColor = "#F3F3F3";

        document.getElementById("content").style.boxShadow = "none";

        document.getElementById("content").style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeF4FwTEBAAAAgjD7FzESWfjYdgwEoAJ4lTsaxgAAAABJRU5ErkJggg==')";

        document.getElementById("content").style.fontSize = "";

        document.getElementById("content").style.margin = "";

        document.getElementById("content").style.width = "";

        document.getElementById("bodyContent").style.lineHeight = "1.5em";

    } else {
        displayStyle = "none";

        document.body.style.background = "none";

        document.body.style.backgroundColor = "#EFEFEF";

        document.getElementById("content").style.backgroundImage = "none";

        document.getElementById("content").style.boxShadow = "0 1px 7px #888888";

        document.getElementById("content").style.margin = "0 auto";

        document.getElementById("content").style.width = "50%";

        document.getElementById("content").style.fontSize = "110%";

        document.getElementById("bodyContent").style.lineHeight = "2.5em";

    }

    document.getElementById("mw-panel").style.display = displayStyle;

    document.getElementById("mw-head").style.display = displayStyle;

    document.getElementById("footer").style.display = displayStyle;

    document.getElementById("mw-head-base").style.display = displayStyle;

    document.getElementById("mw-page-base").style.display = displayStyle;

    wikifullscreen.show = !wikifullscreen.show;

}



function keyPressEvent(event) {

    var kcode = (event.keyCode)?event.keyCode:event.which;

    var ctrlKeyPressed =event.ctrlKey;

    var altKeyPressed =event.altKey;



    var k = String.fromCharCode(kcode);



    if(ctrlKeyPressed && altKeyPressed && (k == "z" || k == "Z" || k == "f" || k == "F")) {

        fullScreen();

    }

} 



document.addEventListener("keypress", keyPressEvent, true);



fullScreen();