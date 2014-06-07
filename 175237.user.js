// ==UserScript==
// @name            Hack Forums New posts notifier
// @namespace       Snorlax
// @description		Check for new posts, which reloads every 30 seconds
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @include         *hackforums.net/showthread.php*
// @version         1.1
// ==/UserScript==

$("strong:contains('Thread Options')").parent("a").before("<a class='smalltext' id='notifyThread' style='color:white;cursor:pointer;'><strong>Start notifying</strong></a> - ");
postAmount = $(".smalltext > strong > a:contains('#')").length;

$("#notifyThread").click(function(){
    if(GM_getValue("runScript") == "1"){
        GM_setValue("runScript", "0");
        clearInterval(interval);
        $("#notifyThread").html("<strong>Checking stopped. Press again to check</strong>");
    }
    else{
        GM_setValue("URL",location.href);
        if(location.href == GM_getValue("URL")){
            GM_setValue("newPage","0");
            GM_setValue("postAmount",postAmount);
            GM_setValue("runScript","1");    
            runScript();
        }
    }
});

if(location.href == GM_getValue("URL")){
    GM_setValue("newPage",$(".pagination_next").length)
    if(GM_getValue("postAmount") != postAmount || GM_getValue("newPage") == 2){
        GM_deleteValue("runScript");
        GM_deleteValue("URL");
        GM_deleteValue("postAmount");
        alert("Page has changed");
    }
    if(GM_getValue("runScript") == "1"){
        runScript();
    }  
}

function runScript(){
    $("#notifyThread").html("<strong>Checking for updates... Press again to stop</strong>");
    interval = setInterval(function(){
        location.reload();
    },30000);
}