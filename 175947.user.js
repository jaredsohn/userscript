// ==UserScript==
// @name       Longdo OnScreen Keyboard
// @namespace  http://dict.longdo.com/search/
// @version    0.3
// @description  onsceen keyboard
// @match      http://dict.longdo.com/search/*
// @require			http://code.jquery.com/jquery-latest.min.js
// @copyright  2012+, You
// ==/UserScript==

var charSet = ["qwertyuiop", "asdfghjkl", "zxcvbnm", "-*"];
var container = $("<div></div>").addClass("OnscreenKeyboard").attr("unselectable", "on").css('user-select', 'none').on('selectstart', false)[0];
var textInput = $("#textboxPlaceholder>input")[0];
textInput.onclick = null;
addGlobalStyle(".OnscreenKey{ padding: 2px 5px; background-color: #e8e8f2; border-color: #9393ab; border: 1px solid; color: #000; cursor: pointer; margin-top: 2px; display: inline-block; }");
addGlobalStyle(".OnscreenKey:hover{ border-color: white; }");
addGlobalStyle(".OnscreenKey:active{ background-color: #c6c5bb; }");
for (var i = 0; i < charSet.length; i++) {
    $(container).append(i ? "<br>" : "");
    for (var j = 0; j < charSet[i].length; j++) {
        $(container).append($("<span></span>").addClass("OnscreenKey").text(charSet[i][j]).click(function() {
            textInput.value += this.innerHTML;
        }));
    }
}
$(container).append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
$(container).append($("<span></span>").addClass("OnscreenKey").text("Space").click(function() {
    textInput.value += " ";
}));
$(container).append($("<span></span>").addClass("OnscreenKey").text("Clr").click(function() {
    //textInput.value = textInput.value.substring(0 , textInput.value.length? textInput.value.length-1 : 0);
    textInput.value = "";
}));
$(container).append($("<span></span>").addClass("OnscreenKey").text("Send").click(function() {
    $("#inputarea>form").submit();
}));
$("#animation-ads").append(container).css("text-align","left");

setTimeout(function(){
    console.log($(".flashsound > a")[0] , $(".performance-header i")[0]);
    $(".flashsound > a")[0].href = "http://www.howjsay.com/index.php?word=" +  $(".performance-header i").text();
},2000);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}