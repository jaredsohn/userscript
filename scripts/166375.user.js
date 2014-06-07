// ==UserScript==
// @name        Plug.dj Chat Enhacements
// @namespace   http://userscripts.org/users/392674
// @include     http://plug.dj/*
// @grant       none
// @version     0.1
// ==/UserScript==

var $ = unsafeWindow.jQuery;

function myLog(s){
    console.log("[Chat Enhacements] " + s)
};

function sendMsg(s){
    //API.sendChat(s);
    console.log("sending chat msg: " + s);
};

function processNames(snode){
    var users = api.getUsers();
    var needsReplacing = false;
    
    var s = snode.text();
    for (var i=0; i<users.length; i++){
        var name = users[i].username;
        
        pos = s.indexOf(name);
        if (pos>0){
            needsReplacing = true;
            myLog("found user: " + name);
            s = s.replace(name, "<span class='nick'>" + name + "</span>");
        };
    };
    if (needsReplacing) snode.replaceWith($("<div style='display:inline'></div>").html(s));
};

$(document).ready(function(){
    myLog("Doucment ready! Initializing");
    
    myLog("Expand chat window");
    $("#button-chat-expand").click(); //expand chat
    
    api = unsafeWindow.API;
    var lastId = "";
    
    $("#chat-messages").on("DOMNodeInserted", ".chat-message", function(){
        
        var message_id = $(this).attr("class").split(" ").pop().slice(8);
        var sender_name = $(this).find(".chat-from-clickable").text();
        var message = $(this).find(".chat-text");
        var message_text = $(this).find(".chat-text").text().slice(2);
        
        if (lastId != message_id){
        
            if (message_text != ""){
                myLog("Chat message: " + sender_name + ": " + message_text);
                processNames(message);
                
                //message_text cases - start
                //message_text cases - end
                
            };
            
            lastId = message_id;
            
        };
    });
    myLog("Handler for new messages OK!");
    
    $("#chat-messages").on("click", ".nick", function(){
        myLog("Custom name clicked");
        input_field = $("#chat-input-field");
        input_field.val(input_field.val() + "@" + $(this).text() + " ");
    });
    myLog("Handler for clicking custom names OK!");
    
});