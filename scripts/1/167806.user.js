// ==UserScript==
// @name        gifland-prod
// @namespace   elmisto
// @description Gifland productivity suite
// @include     http://*gifland.us/*
// @require     http://code.jquery.com/jquery-2.0.0.min.js
// @version     1.0
// ==/UserScript==

function checkDuplicate() {
    var current = window.location.pathname;
    
    if(sessionStorage.gl_visited != undefined) {
        var visited = JSON.parse(sessionStorage.gl_visited);
        
        if(visited.indexOf(current) == -1) {
            visited.push(current);
        }
        else {
            window.location.replace("http://gifland.us");
        }
    }
    else {
        var visited = [current];
    }
    
    sessionStorage.gl_visited = JSON.stringify(visited);
}

// Optimize view for widescreen
function siteReflow() {
    // Move next button under gif
    $( "#nexthelp" ).insertAfter( "#gif" );
    $( "#nextcont" ).insertAfter( "#gif" );
    
    // Fix button margin
    var margin_bottom = $( "#nextcont" ).css("margin-bottom");
    $( "#nextcont" ).css("margin-top", margin_bottom);
    
    // Move header
    $( "#content").css("margin-top", "20px");
    $( "#head_cont").css("width", "100%");
    $( "#menu").css("width",    "510px")
               .css("margin",   "0 auto")
               .css("position", "relative")
               .css("left",     "0");
    
    // Add id to the nex button
    $(".next").attr("id", "next-button");
    
    // Add back button
    $("#next-button").before('<a id="back-button" class="next" href="#"><span> Back! </span></a>');
    
    // Fix button layout
    $(".next").css("display", "inline-block")
              .css("margin",  "0 10px");
    $("#nextcont").css("text-align", "center");
    
    // Fix help message
    $("span > kbd").html("(BACK)SPACE");
}

function updateTitle() {
    var title = document.title;
    document.title = title + " | " + sessionStorage.gl_gifcount + " | " + localStorage.gl_gifcount;
}

function checkStorage() {
    if(localStorage.gl_gifcount == undefined) {
        localStorage.gl_gifcount = "0";
    }
    
    if(sessionStorage.gl_gifcount == undefined) {
        sessionStorage.gl_gifcount = "0";
    }
}

function incrementCounter() {
    checkStorage();
    
    var count = parseInt(localStorage.gl_gifcount);
    count = count + 1;
        
    localStorage.gl_gifcount = count.toString();
        
    count = parseInt(sessionStorage.gl_gifcount);
    count = count + 1;
        
    sessionStorage.gl_gifcount = count.toString();
}

function goBack() {
    GM_setValue("back", true);
    history.back();
}

function goNext() {
    incrementCounter();
    GM_setValue("back", false);
}

// Event handling
$("#back-button").click(function(e){
    goBack();
});

$("#next-button").click(function(e) {
    goNext();
});

$("body").keyup(function(e){
    if(e.keyCode == 8) {
        goBack();
    }
    else if(e.keyCode == 32) {
        goNext();
    }
});

// Do things
if(!GM_getValue("back", false)) {checkDuplicate();}
siteReflow();
updateTitle();
