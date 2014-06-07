// ==UserScript==
// @name        Twitch Plays Pokemon - Command Filtering & Spamming Tool
// @namespace   butt
// @description Adds tools to your chatbox for spamming chat and filtering out commands from chat.
// @include     http://www.twitch.tv/twitchplayspokemon
// @include     http://www.twitch.tv/chat/embed?channel=twitchplayspokemon&popout_chat=true
// @version     1.4
// @grant       none
// ==/UserScript==

function main() {

function setUpTheShit(){
    var $ = window.$
    var spamhandle;
    var counterHandle;
    var uname = $("div#you span.username").text();
    var flag = false;
    var datext = "";
    
    // Add buttons and shit
    $("div#controls").append('<div id="muh-controls" style="background-color:#f0f0f0;padding:5px"><label style="display:inline" for="dubs">Filter Inputs </label><input type="checkbox" id="dubs" checked><div><label for="spam-check" style="display:inline">Spam </label><input type="checkbox" id="spam-check" > <span id="spam-notice" style="color:green">You spammed!</span></div><div><label for="spam-text" style="display:inline">Text </label><input type="text" id="spam-text" value="GUYЅ, WЕ NЕЕD TО BONE MІЅТY http://userscripts.org/scripts/show/399187"></div><div><label for="spam-interval" style="display:inline">Interval(secs) </label><input type="text" id="spam-interval" value="32"><span id="spam-counter"></span></div></div>')
    
    // FILTERING
    $("<style type='text/css'>#chat_line_list li{display:none;}</style>").appendTo("head");
    
    showAll = false;
    $("#dubs").click( function() {
        showAll = !showAll;
    } )
    
    CurrentChat.line_buffer=800;
    
    setInterval(function(){
        $('#chat_line_list li').each(function(){
            var a=$(this);
            var t=$.trim(a.text().split(':')[1]);
    
            if(showAll){
                a.show();
            }
            else if(!t.match(/^((up|down|left|right|a|b|start|select|anarchy|democracy|wait?)(\d)?)+$/i)){
                a.show(); 
            }
            
            if(flag) {
                if(a.data("sender") === uname) {
                    a.find("span.chat_line").text(datext);
                    flag = false;
                }
            }
                    
        });
        //$("#chat_lines").scrollTop(999999);
        if(CurrentChat.currently_scrolling){
            CurrentChat.scroll_chat();
        }
    },100)
    
    // SPAMMING
    $("#spam-notice").hide();
    
    function spam(){
        var old_shit = $("#chat_text_input").val();
        var interval =  parseInt($("#spam-interval").val()) * 1000;
        datext = $("#spam-text").val();
        var text = datext.toString();
        if(text.trim().toLowerCase() === "anarchy") {text = "democracy"; flag = true;}
        $("#chat_text_input").val(text);
        document.getElementById("chat_speak").click();
        $("#spam-notice").show();
        $("#spam-notice").fadeOut(3000);
        spamhandle = setTimeout(spam, interval);
        $("#chat_text_input").val(old_shit);
        counter($("#spam-counter"), interval / 1000);
    }
    
    $("#spam-check").click( function() {
        if($("#spam-check:checked").val()){
            spam();
        } else {
            clearTimeout(spamhandle);
            clearTimeout(counterHandle);
            $("#spam-counter").hide();
        }
    } );
    
    function counter($el, n) {
        $("#spam-counter").show();
        clearTimeout(counterHandle);
        (function loop() {
            $el.html(n);
            if (n--) {
                counterHandle = setTimeout(loop, 1000);
            }
        })();
    }
    
    $(window).resize();
}

function loopydoo (){
    if ( document.readyState == 'complete' && document.getElementById('chat_text_input') != null ) {
        setUpTheShit();
    }
    else {
        setTimeout(loopydoo, 500);
    }
}

loopydoo();

}

//Inject dat shit nigga aaawwww yiss
var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);