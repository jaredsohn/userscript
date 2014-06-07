// ==UserScript==
// @name SOJSChatHighlight
// @description Syntax Highlighting for code in StackOverflow JS chatroom!
// @match http://chat.stackoverflow.com/rooms/*
// @version 0.0.7
// ==/UserScript==

var main = function () {
  var css = ".pln{color:#000}.str{color:#0c0}.kwd{color:#00c}.com{color:#c00}.typ{color:#a0a}.lit{color:#0aa}.pun,.opn,.clo{color:#aa0}.tag{color:#00c}.atn{color:#a0a}.atv{color:#0c0}.dec,.var{color:#a0a}.fun{color:red}.message code, .message pre{background:#ffffff;border:1px solid #f6f6f6;border-radius:6px;padding:2px;}"

  var highlight = function (event) {
      $(".message pre, .message code").not('.already-done').addClass("language-javascript prettyprint already-done");
      prettyPrint();
  
      // Fix up conflicts with SOChat UI
      $(".content:has(.already-done) ~ .meta").css("background-color","inherit")
      $('.prettyprint .tag').removeClass('tag').addClass('htmlTag');
      
      $(".message pre, .message code").removeClass("language-javascript prettyprint");    
  }
 
  $(document.body).append($('<script>', { src: "//cdnjs.cloudflare.com/ajax/libs/prettify/r224/prettify.js", onload: highlight }));
  $('head').append($('<style>', { type: 'text/css', html: css }));
 
  $(document).on('click', '.more-data', {}, highlight);
 
  $.post("/ws-auth", fkey({roomid: /\d+/.exec(location)[0] }), function (data) { 
      var socket = new WebSocket(data.url + "?l=99999999999");
      socket.addEventListener('message', highlight);
  });
};
 
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
