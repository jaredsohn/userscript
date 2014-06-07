// ==UserScript==
// @name       Monster Twitch
// @namespace  http://enut.co/dev
// @author	   Tracerman
// @version    2.760
// @description  Streches stream to max width and hides left navigation bar with an 'M' toggle on the bottom right
// @include        http://*.twitch.tv/*
// @include        http://twitch.tv/*
// @exclude        http://www.twitch.tv/directory*
// @exclude		   http://www.twitch.tv/*/chat?popout=
// @exclude		   http://www.twitch.tv/*/popout
// @exclude        http://www.twitch.tv/*/dashboard
// @exclude        http://www.twitch.tv/inbox*
// @exclude        http://www.twitch.tv/subscriptions*
// @exclude        http://store.twitch.tv
// @exclude        http://api.twitch.tv/*
// @exclude        https://api.twitch.tv/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant       GM_addStyle
// @copyright  2014+, tracerman
// ==/UserScript==

function ChatWFix(){
 GM_addStyle ( multilineStr ( function () {/*!
    #right_col:before {
    	left: 0px
    }
    */} ) );
    $(".segmented_tabs").css("z-index", "4");
    $("#right_col .top").css("z-index", "4");
    console.log("TM: Chat Left Position Fixed");
}

setTimeout(function () {ChatWFix()}, 5000);

$("#player").ready(function() {
    
var showCheck3 = 0;
var zNode3       = document.createElement ('div');
var pHeight = $(".dynamic-player").css("height");
var intHeight = $(".chat-interface").css("height");
var bHeight = $('#left_col').css("width");
var cHeight = $('#right_col').css("width");
var cDisp 	= $('#right_col').css("display");
var conWidth = $('#content').css("width");
var tHeight = $('#main_col').css("margin-left");
var zHeight = $('#main_col').css("margin-right");
var mrCheck = $('#main_col').css("margin-right");
var zWidth = $('#main_col').css("width");
var ZWidthCheck = zWidth;
var chatInt = $(".chat-interface").css("background-color");
var chatHeight = $('#chat').css("width");
var chatLHeight = $('#chat_line').css("width");
var chatLLHeight = $('#chat_line_list').css("width");
var chatLLPadding = $('#chat_line_list').css("padding");
var chatLeft;


zNode3.innerHTML = '<button id="myButton3" type="button">'
                + '</button>';

zNode3.setAttribute ('id', 'myContainer3');
document.getElementById('player').appendChild(zNode3);
    
//--- Activate the newly added button.
document.getElementById ("myButton3").addEventListener (
    "click", ButtonClickAction, false
);
    
function ButtonClickAction (zEvent) {
if(showCheck3 == 1) { 
    $("#channel").removeAttr('style');
    $("#chat_line_list").each(function () {
      this.style.setProperty("padding", chatLLPadding, "important");
});
    $("#chat_line_list").each(function () {
      this.style.setProperty("padding", chatLLPadding);
});
    $("#left_col").show(300, "swing");
    $(".editable").show(300, "swing");
    $("#channel_panels_contain").show(300, "swing");
    $(".stats-and-actions").show(300, "swing");
    $(".resizer").show(300, "swing");
    $("#right_close").show(300, "swing"); 
    $("#right_col").each(function () {
       this.style.setProperty("width", "", "important");
});
    $("#right_col").each(function () {
       this.style.setProperty("width", cHeight);
});
    $("#main_col").removeAttr('style');
    
    $("#main_col").each(function () {
       this.style.setProperty("margin-left", "", "important");
});
    $("#main_col").css("margin-left","");

    $("#main_col").each(function () {
       this.style.setProperty("width", "", "important");
});
    
    if (cDisp == "block") {
        
    $("#main_col").each(function () {
        this.style.setProperty("margin-right", "");
});
    }
    
    else {
        $("#main_col").each(function () {
       this.style.setProperty("width", "");
});
        
    }
    
   if(zWidth >= 1) {
    
       $("#main_col").each(function () {
        this.style.setProperty("width", "");
          this.style.setProperty("margin-right", "");
}); 
       
    }
    else {       
        
        $("#main_col").css("width", "");
        
    }
    $(".dynamic-player").removeAttr("style");
    $("#player").each(function () {
      this.style.setProperty("position", "relative");
});
    $("#content").each(function () {
        this.style.setProperty("width", "", "important");
});
    $("#content").each(function () {
        this.style.setProperty("width", conWidth);
});
    $("#chat").each(function () {
       this.style.setProperty("width", "", "important");
});
    $("#chat").each(function () {
       this.style.setProperty("width", chatHeight);
});
    $("#chat_line").each(function () {
       this.style.setProperty("width", "", "important");
});
    $("#chat_line").each(function () {
       this.style.setProperty("width", chatLHeight);
});
    $("#chat_line_list").each(function () {
       this.style.setProperty("width", "", "important");
});
    $("#myContainer3").fadeTo("fast", 0.5).css({"background":"url('http://i61.tinypic.com/qq1hy1.png')"}).delay(300).css({"box-shadow":"inset 0 0 20px rgb(138, 138, 138)"});
    
    //--- Old Chat Button
    $("#chat_speak").animate({"width":"149px"}, "fast");
    //--- New Chat Button
    $(".send-chat-button").css("width", "").css("left", chatLeft);
    $("button.primary_button").css("background", "");
    $("button.primary_button").removeAttr("style");
    // Show the video bar
    $("#twitch_chat").animate({"top":"51px"}, "fast");
    $("#chat").each(function () {
    this.style.setProperty("top", "51px", "important");
});
    $("#archives").animate({"top":"51px"}, "fast");
    //--- Chat Bottom
    $(".chat-messages").removeAttr("style");
    $(".chat-buttons-container").css("top", "");
    //--- Old Buttons Border
    $(".dropdown_glyph").css("border", "", "important").css("box-shadow", "", "important");
    //--- New Buttons Border
    $("button.settings").css("margin-right", "").css("border", "", "important").css("box-shadow", "", "important");
    $("button.settings").removeAttr("style");
    $("button.viewers").css("margin-right", "").css("border", "", "important").css("box-shadow", "", "important");
    $("button.viewers").removeAttr("style");
    $("button.emotemenu").css("margin-right", "").css("margin-left", "").css("border", "", "important").css("box-shadow", "", "important");
    $("button.emotemenu").removeAttr("style");
    //--- Chat Background
    $(".chat-messages").css("background", "");
    
    //--- New Chat Interface Features
    $(".chat-interface").css("background", "").css("border", "", "important").css("box-shadow", "", "!important");
    $(".chat-interface").each(function () {
      this.style.setProperty("height", intHeight, "important");
});
    $(".textarea-contain").css("border", "");
    
    $(".segmented_tabs").css({"visibility":"visible"}).css({"z-index":"4"});
    $("#right_col .top").css({"z-index":"4"});
    
    showCheck3 = 2;
}
else if(showCheck3 == 0) {
    pHeight = $(".dynamic-player").css("height");
    bHeight = $('#left_col').css("width");
    cHeight = $('#right_col').css("width");
    conWidth = $('#content').css("width");
    tHeight = $('#main_col').css("margin-left");
    zHeight = $('#main_col').css("margin-right");
    chatHeight = $('#chat').css("width");
    chatLHeight = $('#chat_line').css("width");
    chatLLHeight = $('#chat_line_list').css("width");
    chatLLPadding = $('#chat_line_list').css("padding");
    cDisp 	= $('#right_col').css("display");
    zWidth = $('#main_col').css("width");
    chatLeft= $('.send-chat-button').css("left");
    intHeight = $(".chat-interface").css("height");
    
    $("#channel").each(function () {
      this.style.setProperty("padding", "0 0 0 0", "important");
});
    $("#chat_line_list").each(function () {
      this.style.setProperty("padding", "0 0 0", "important");
});
    $(".editable").hide(300, "swing");
    $("#left_col").hide(300, "swing");
    $(".resizer").hide(300, "swing");
    $("#channel_panels_contain").hide(300, "swing");
    $(".stats-and-actions").hide(300, "swing");
    $(".dynamic-player, .dynamic-player object, .dynamic-player video").each(function () {
      this.style.setProperty("height", "100%", "important");
      this.style.setProperty("width", "100%", "important");
});
    $(".dynamic-player").each(function () {
      this.style.setProperty("height", "100%", "important");
      this.style.setProperty("width", "100%", "important");
});
    $("#player").each(function () {
      this.style.setProperty("position", "absolute");
    });
    //--- Scroll Top Test
    $(".tse-scroll-content").scrollTop(0);
    //--- End Test

    if (cDisp == "block") {
    $("#content").each(function () {
      this.style.setProperty("width", "275px", "important");
});
    $("#right_col").each(function () {
      this.style.setProperty("width", "275px", "important");
});
    $("#chat").animate({"width":"275px"}, "fast");
    $("#chat_line_list").css({"width":""});
    $("#chat_line").animate({"width":"272px"}, "fast");

    $("#main_col").each(function () {
     this.style.setProperty("margin-right", "275px", "important");
      this.style.setProperty("width", "");
});
    
    $(".segmented_tabs").css({"visibility":"hidden"});
    $("#right_col .top").css({"z-index":"inherit"});
    $("#twitch_chat").css({"top":"0px"});
    $("#chat").each(function () {
      this.style.setProperty("top", "0px", "important");
});
    $("#archives").animate({"top":"0px"}, "fast");
    //--- Old Chat Button    
    $("#chat_speak").animate({"width":"84px"}, "fast");
    //--- New Chat Button
    $(".send-chat-button").css("width", "120px").css("left", "auto");
    $("button.primary_button").css("background", "black");
    $("button.primary_button").each(function () {
      this.style.setProperty("border", "2px solid #6441a5", "important");
});
        
    //--- Chat Background
    $(".chat-messages").css("background", "white");
    
    //--- Chat Bottom
    $(".chat-messages").each(function () {
      this.style.setProperty("bottom", "110px", "important");
});
    $(".chat-buttons-container").css("top", "70px");
        
    //--- New Chat Interface Features
    $(".chat-interface").css("background", "white").css("border", "1px solid #6441a5", "important").css("box-shadow", "1px 1px 1px rgb(100, 65, 165), 0px 1px 0px rgba(0, 0, 0, 0.15) inset", "!important");
    $(".chat-interface").each(function () {
      this.style.setProperty("height", "110px", "important");
});
        
    $(".textarea-contain").css("border", "2px solid rgb(100, 65, 165)");
    }
    else {
        $("#content").each(function () {
      this.style.setProperty("width", "0px", "important");
});
    $("#right_col").each(function () {
      this.style.setProperty("width", "0px", "important");
});
        $("#main_col").each(function () {
      this.style.setProperty("margin-right", "0px", "important");
           this.style.setProperty("width", "100%", "important");
});
        
    }
    
    if (zWidth > 0) {
       $("#main_col").each(function () {
        this.style.setProperty("width", "100%", "important");
}); 
       
    }
    else {       
        this.style.setProperty("width", "", "important");
    }
    
    $("#main_col").each(function () {
      this.style.setProperty("margin-left", "0px", "important");      
});
    $("#right_close").hide(300, "swing");     
    //--- Old Buttons Border
    $(".dropdown_glyph").css("border", "1px solid #6441a5", "important").css("box-shadow", "1px 1px 1px rgb(100, 65, 165), 0px 1px 0px rgba(0, 0, 0, 0.15) inset", "!important");
    //--- New Buttons Border
    $("button.settings").css("margin-right", "2px");
    $("button.settings").each(function () {
      this.style.setProperty("border", "2px solid #6441a5", "important");
        this.style.setProperty("box-shadow", "1px 1px 1px rgb(100, 65, 165), 0px 1px 0px rgba(0, 0, 0, 0.15) inset", "important");
});
    $("button.viewers").css("margin-right", "2px");
    $("button.viewers").each(function () {
      this.style.setProperty("border", "2px solid #6441a5", "important");
        this.style.setProperty("box-shadow", "1px 1px 1px rgb(100, 65, 165), 0px 1px 0px rgba(0, 0, 0, 0.15) inset", "important");
});
    $("button.emotemenu").css("margin-right", "2px");
    $("button.emotemenu").each(function () {
      this.style.setProperty("margin-left", "0px", "important");
      this.style.setProperty("border", "2px solid #6441a5", "important");
      this.style.setProperty("box-shadow", "1px 1px 1px rgb(100, 65, 165), 0px 1px 0px rgba(0, 0, 0, 0.15) inset", "important");
});
    $("#myContainer3").fadeTo("fast", 1.0).css({"background":"url('http://i61.tinypic.com/ri80w5.png')"}).delay(300).css({"box-shadow":"inset 0 0 20px black"});
    showCheck3 = 1;
 
}
else if(showCheck3 == 2) {
    
    if (cDisp == "block") {
        
    $("#main_col").each(function () {
      this.style.setProperty("margin-right", zHeight);
});
    }
    
    else {
        $("#main_col").each(function () {
       this.style.setProperty("margin-right", "0px");
       this.style.setProperty("width", "");
});
        
    }
    
    $("#main_col").each(function () {
       this.style.setProperty("margin-left", tHeight);
});
    
    $("#main_col").css("width", "");
    if (cDisp == "block") {
       $("#main_col").each(function () {
           this.style.setProperty("margin-right", "340px");
}); 
       
    }
    else {       
        $("#main_col").css("margin-right", "0", "important");
    }
 
    $("#myContainer3").fadeTo("fast", 0.5).delay(300).css({"box-shadow":"inset 0 0 20px navy"});
    
    showCheck3 = 0;
}
else if(showCheck3 == 3) {
    
}
    }
    });

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer3 {
        position:               absolute;
        background:				url("http://i57.tinypic.com/10dxqhc.png");
        background-size:		contain !important; 
        box-shadow:				inset 0 0 20px black;
        bottom:                 0;
        left:					0;
        font-size:              13px;
        border:                 0px outset black;
        margin-left:            160px;
        margin-bottom:			0px;
        opacity:                0.5;
        width:					27px !important;
        height:					27px !important;
        z-index:                999;
        padding:                0px 0px;
    }
    #myButton3 {
        cursor:                 pointer;
       	background: 			transparent;
    	border: 				none !important;
        width:					27px !important;
        height:					27px !important;
        color:					purple;
        font-weight:			bold;
    }
    #myContainer3 p {
        color:                  purple;
        background:             transparent;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            //--- .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}