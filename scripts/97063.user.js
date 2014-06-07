// ==UserScript==
// @name          Clien Memo Notification
// @namespace     http://nuridol.egloos.com
// @description   쪽지 놓치지 마세요! 읽지 않은 쪽지가 있는지 확인해서 보여줍니다.
// @version       1.0.1
// @author        NuRi
// @require       http://code.jquery.com/jquery-latest.js
// @include       http://www.clien.net/*
// @exclude       http://www.clien.net/cs2/bbs/memo.php*
// ==/UserScript==

// ...script by NuRi

// Add jQuery
/*
var GM_JQ = document.createElement('script');
GM_JQ.type = 'text/javascript';
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
*/
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(letsJQuery);

function letsJQuery() {
 $(document).ready(function() {
     // call memo page
     $.get("http://www.clien.net/cs2/bbs/memo.php?kind=recv", function(data){
         if (data.search("회원이시라면 로그인 후 이용해 보십시오.") > 0) {
                // not login
                return;
         }
         // check unread memo
         if (data.search('<span class="style8">읽지 않음</span>') > 0) {
             // notice
              //alert("읽지 않은 쪽지가 있습니다. 쪽지를 확인해 주세요.");
              $("BODY").append('<div id="popup_container"><h3 id="popup_title"></h3><div id="popup_msg"></div></div>');
              $("#popup_title").text("You've got memo!");
              $("#popup_msg").text("읽지 않은 쪽지가 있습니다. 쪽지를 확인해 주세요.");

              $("#popup_container").css({
                   'left': '330px', 'top': '45px', 'width': '330px', 'height': '90px', 'z-index': '3'
                  ,'position': 'absolute', '-moz-border-radius': '6px 6px 6px 6px'
                 ,'border': '1px solid #FFFFFF', 'padding': '5px 10px', 'background-color': '#E1F0FD'
             });
             $("#popup_title").css({
                  'width': '100%', 'border-bottom': '1px solid #FFFFFF', 'text-shadow': '1px 1px 3px #AAAAAA', 'line-height': '30px'
                 ,'color': '#444444', 'font-size': '16px'
             });
             $("#popup_msg").css({
                  'border-top': '1px solid #C0CDD8', 'padding': '8px 5px', 'font-size': '1.1em', 'color': '#555555'
             });

             $("#popup_msg").after('<div id="popup_menu"><input type="button" value="OK" id="popup_ok" /></div>');
             $("#popup_menu").css({
                  'text-align': 'center'
             });
             $("#popup_menu input").css("width", "60px");
             $("#popup_ok").click( function() {
                $("#popup_container").remove();
                //callback(true);
             });
         }
     });
 });
}
