// ==UserScript==
// @name           Hotkey For Google Feeling Lucky Button
// @author         Eric Ruan
// @description    Simply adds a hotkey Ctrl + Enter for the "I'm Feeling Lucky" button.
// @version        0.1
// @license        Public Domain
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// ==/UserScript==

(function(){
    var debug = false;
    
    var divSearchForm = document.getElementById('searchform');
    if (divSearchForm == null) {
        return;
    }
    var divStatus = document.createElement('div');
    divStatus.innerHTML = "Initializing...";
    if (debug) {
        divSearchForm.appendChild(divStatus);
    }
    
    var btns = document.getElementsByName('btnI');
    if (btns.length == 0) {
        divStatus.innerHTML = "The 'Lucky' button was not found.";
        return;
    }
    var btnLucky = btns[0];
    btnLucky.title = "Ctrl + Enter";
    
    btns = document.getElementsByName('btnK');
    if (btns.length == 0) {
        divStatus.innerHTML = "The 'Search' button was not found.";
        return;
    }
    var btnSearch = btns[0];
    
    // suspend submitting on the form
    var form = document.getElementById("tsf");
    form.onsubmit = "return false;";

    var text = document.getElementById('lst-ib');
    if (text == null) {
        divStatus.innerHTML = "The text box was not found.";
        return;
    }
    
    text.addEventListener("keydown", function(e) {
        if (e.keyCode != 13) {
            return;
        }
        
        if (e.ctrlKey || e.metaKey) {
            btnLucky.click();
        }
        else {
            btnSearch.click();
        }
    });
    
    divStatus.innerHTML = "Ctrl + Enter if you feel lucky.";
})();