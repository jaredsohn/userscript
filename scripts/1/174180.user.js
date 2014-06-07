// ==UserScript==
// @name          xerotic's Character Counter
// @namespace     xerotic/hfcharcount
// @description   Gives character count information in Quick Reply area.
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include       *hackforums.net/*
// @version 	  2.0
// ==/UserScript==

var url = window.location.href;
if (url.search("showthread.php") > 0) {
    regex = /here.*?>/;
    revised = "here.<br /> <div id='letscount'>0<br /><span style='color:red'>Too Low!</span></div>";
    document.getElementById('quickreply_e').innerHTML= document.getElementById('quickreply_e').innerHTML.replace(regex,revised);
}else if (url.search("newreply") > 0) {
$('strong:contains("Post Options:")').append("<div id='letscount'>0<br /><span style='color:red'>Too Low!</span></div>");
}

addButtonListener();
function addButtonListener(){
    var url = window.location.href;
    var texts = document.getElementById("message_new");
    if (url.search("showthread.php") > 0) {
        var texts = document.getElementById("message");
    }
    texts.addEventListener('keyup',doCountNow,true);
    texts.addEventListener('keydown',doCountNow,true);
}
doCountNow();
function doCountNow(){
    var url = window.location.href;
    if (url.search("newreply") > 0) {
    var field = parseInt(document.getElementById('message_new').value.length);
    }else if (url.search("showthread") > 0) {
        var field = parseInt(document.getElementById('message').value.length);
    }
    var minlimit = 35;
    var maxlimit = 18000;
    if (field < minlimit) {
        document.getElementById('letscount').innerHTML = field+'<br /><span style="color:red">Too Low!</span>'
    }
    else if (field > maxlimit) {
        document.getElementById('letscount').innerHTML = field+'<br /><span style="color:red">Too High!</span>'
    }
        else {
            document.getElementById('letscount').innerHTML = field+'<br /><span style="color:green">Okay To Post!</span>'
        }
    
}