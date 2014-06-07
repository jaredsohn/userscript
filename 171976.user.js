// ==UserScript==
// @name       Plug.DJ Vote Revealer
// @version    1
// @match      http://plug.dj/*
// ==/UserScript==
// Based off of https://userscripts.org/scripts/show/131065 - thank you Matthew Pickering!

if(window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    unsafeWindow = div.onclick();
}

window.onload = function(){
    window.document.body.onload = doThis();
};

function doThis() {
    if (document.getElementById("current-room-users")) {
        setTimeout(setUp,3000);
    }
}

function style_vote_revealer() {
    
    //Block
    unsafeWindow.jQuery('#vote-revealer').css({
        width:parseInt(unsafeWindow.jQuery('#meta-frame').width(),10)+'px',
        height:'280px',
        position:'absolute',
        top:'295px',
        left:parseInt(unsafeWindow.jQuery('#meta-frame').offset().left + 1,10)+'px',
        background:'rgba(0,0,0,0.8)',
        color:'#fff',
        padding:'10px 20px',
        overflowY:'auto',
        'box-sizing':'border-box',
        'z-index':9,
    });
    
    //Woots/Mehs section
    unsafeWindow.jQuery('#vote-revealer-woots,#vote-revealer-mehs').css({
        padding:'1px 20px 15px 20px',
        margin:'10px 0'
    });
    unsafeWindow.jQuery('#vote-revealer-woots').css({
        background:'#a8cc00',
        'box-shadow':'0 0 5px #8fad03'
    });
    unsafeWindow.jQuery('#vote-revealer-mehs').css({
        background:'#c8303e',
        'box-shadow':'0 0 5px #ab2935'
    });
    
}

function setUp(){
    unsafeWindow.jQuery('body').append('<div id="vote-revealer"></div>');
    unsafeWindow.jQuery(document).ready(style_vote_revealer);
    unsafeWindow.jQuery(window).resize(style_vote_revealer);
    unsafeWindow.API.addEventListener(unsafeWindow.API.VOTE_UPDATE, updateWoots);
    unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_ADVANCE, resetWoots);
    updateWoots();
}

function resetWoots() {
    unsafeWindow.jQuery('#vote-revealer').empty();
}

function updateWoots(){
    woots=new Array();
    mehs=new Array();
    i = unsafeWindow.API.getUsers();
    for(a in i){
        if (i[a].vote == 1) {woots.push(i[a].username)}
        if (i[a].vote == -1) {mehs.push(i[a].username)}
    }
    
    if(woots.length>0) {
        if(unsafeWindow.jQuery('#vote-revealer-woots').length==0) {
            unsafeWindow.jQuery("#vote-revealer").append('<div id="vote-revealer-woots"></div>');
            style_vote_revealer();
        }
        string=woots.join(', ');
        unsafeWindow.jQuery("#vote-revealer-woots").html('<h3>Woots:</h3>'+string);
    }
    
    if(mehs.length>0) {
        if(unsafeWindow.jQuery('#vote-revealer-mehs').length==0) {
            unsafeWindow.jQuery("#vote-revealer").append('<div id="vote-revealer-mehs"></div>');
            style_vote_revealer();
        }
        string=mehs.join(', ');
        unsafeWindow.jQuery("#vote-revealer-mehs").html('<h3>Mehs:</h3>'+string);
    }
}