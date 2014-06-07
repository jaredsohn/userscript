// ==UserScript==
// @name       Automatically delete all Google Web History (page after page...)
// @version    1.2.3.4.5.6.4
// @description  This will delete all of your web history Google saves about you, one page at a time. Just go to https://history.google.com/history and login.
// @match      https://history.google.*/history*
// @match      http://history.google.*/history*
// @grant			GM_deleteValue
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_info
// @author    Harrison Horowitz
// @license    MIT
// ==/UserScript==

var deleteButton;

function findButtonAndClick() {
    console.log("clicking delete");
    if (typeof document.edit != "undefined") {
        document.edit.btnD.click();
    } else {
        if (typeof deleteButton != "undefined") {
            deleteButton.click();
        } else {
            //window.location.reload();// = "https://history.google.com/history/delete?hl=en&btnD";
            var nodeList = document.getElementsByName("btnD");
            nodeList[0].click();
        }
    }
}

function doItYo(){
    try {
        console.log("clicking selector_top");
        document.getElementById("selector_top").click();
        setTimeout(findButtonAndClick, 1100);
    } catch (err) {console.log(err);}
}

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"); // //ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// the guts of this userscript
function mainKillHistory() {
    var deleteButton = jQ("input.kd-button");
    //debugger;
    jQ(document).on("ready", clickThem);
    jQ(".selector_top").click();
    jQ("input.kd-button").click();
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(doItYo, 5000);
});

addJQuery(mainKillHistory);



try {
    function timedRefresh(timeoutPeriod) {
        console.log("Refreshing...");
        setTimeout(location.reload(true), timeoutPeriod);
        //console.log(getStackTrace());
        console.log("Finsished....");
    }   
} catch (err) {
    console.log(err);
}
