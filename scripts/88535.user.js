// ==UserScript==
// @name		The Colorless Chat Message Append
// @include		http://thecolorless.net/chat/*
// @include		http://thecolorless.net/chat
// ==/UserScript==

var oldFunction = unsafeWindow.pressMessage;
unsafeWindow.pressMessage = function(msg) {
  var type=msg.type;
  var nickname=unsafeWindow.stripslashes(msg.nickname);
  var timestamp=msg.timestamp;
  var content=unsafeWindow.stripslashes(msg.text);
  var color=msg.color;
  //only change message logic
  if(type=="message"){
    var reply="";
    if(!unsafeWindow.anon_name){
      var o_u=unsafeWindow.readCookie("nickname").toLowerCase();
      var t_c=content.toLowerCase();
      if(t_c.search(o_u)!==-1){
        reply=" is_reply";
      }
    }
    var message='<div class="message '+color+reply+'"><div class="user"><img src="/images/avatars/'+color+'.png" width="64" height="64" class="avatar" alt="'+timestamp+'" /><a class="username" target="_blank" href="/user/'+nickname+'">'+nickname+'</a></div><div class="blurb"><p>'+content+'</p></div></div>';        
    unsafeWindow.$("#chat-area").append(message);
    unsafeWindow.damnedEffect();
    window.scrollTo(0,document.body.scrollHeight);
  }else{	  
   return oldFunction(msg);
  }
};

unsafeWindow.$("#chat-area").append('<div class="message">Note: You are using the flipping script so latest msg appear from below</div><br/>');
