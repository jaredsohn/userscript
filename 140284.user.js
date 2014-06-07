// ==UserScript==
// @name        FetLife - Click to open chat
// @namespace   kirr.fetlife
// @description Allows FetLife's chat to be open on only certain pages
// @include     https://fetlife.com/*
// @exclude     https://fetlife.com/adgear/*
// @version     1
// @url         https://fetlife.com/users/27238/posts/1136025
// @author      Kirr (https://fetlife.com/kirr)
// ==/UserScript==

function f()
{
  var newel=document.getElementById('newel');
  newel.style.display='none';
 
  var d=document.createElement('div');
  d.id="xx";
  d.class="hidden";
  d.innerHTML='<div id="im" class="hidden" data-bind="css: {hidden: !isActive()}" >\
     <div style="margin: 0 15px">\
       <div class="cont clearfix" id="chatbar">\
         <script type="text/x-jquery-tmpl" id="message-template">\
           <span class="db">{{linkified_html body}}</span>\
         </script>\
 \
         <script type="text/x-jquery-tmpl" id="message-block-template">\
           <li class="pr on_hover item">\
             <a data-bind="attr: {href: \'/\' + IM.getChatterByUserID(user_id).nickname()}">\
               <img data-bind="attr: {src: IM.getChatterByUserID(user_id).avatar_url()}" class="avatar s30 fl pan bct">\
             </a>\
             <div class="clearfix">\
               <div class="content mls30 lh4 xs messages" data-bind="template: {name: \'message-template\', foreach: messages()}">\
               </div>\
             </div>\
             <span class="tictoc xxxs q">${time}</span>\
           </li>\
         </script>\
 \
         <script type="text/x-jquery-tmpl" id="chat-template">\
           <div class="chat pr on_hover clearfix chat-box" data-with-user-id="${with_user_id}" data-bind="css: {open: IM.boxOpen() == with_user_id}">\
             <a href="#" class="closedtitle db tdn unh overellipsis opener" data-bind="click: open">\
               <span class="xs" data-bind="text: IM.getChatterByUserID(with_user_id).nickname(), css: {xq: IM.getChatterByUserID(with_user_id).status() != \'available\'}"></span>&nbsp;\
             </a>\
             <a href="#" class="close picto lhn tdn unh xs show_hidden " data-bind="click: close">*</a>\
             <span class="newmsgcnt xxs lhn pa4 hide" data-bind="css: {hide: unreadMessages() == 0}, text: unreadMessages()"></span>\
             <div>\
               <div class="header clearfix" data-bind="click: minimize">\
                 <span class="xs" data-bind="text: IM.getChatterByUserID(with_user_id).nickname()"></span>\
                 <a href="#closeConversation" class="closeopen xxs picto tdn q fr lhn dib mts closer" data-bind="click: close">*</a>\
               </div>\
               <div class="thread">\
                 <!--<div class="day xxxs ttu q pbs">Yesterday</div>-->\
                 <div class="messages">\
                   <ul data-bind="template: {name: \'message-block-template\', foreach: messageBlocks()}"></ul>\
                   <div class="pr q i xxs chatstate composing item hide" data-bind="css: {hide: IM.getChatterByUserID(user_id).chatstate() == \'active\'}">\
                     <span data-bind="text: IM.getChatterByUserID(user_id).nickname()"></span> is typing&hellip;\
                   </div>\
                   <div class="q i xxs hide" data-bind="css: {hide: IM.getChatterByUserID(user_id).status() == \'available\'}">\
                     <span data-bind="text: IM.getChatterByUserID(user_id).nickname()"></span> has gone <strong>offline</strong>\
                   </div>\
                 </div>\
               </div>\
               <form class="pr">\
                 <input type="text" data-bind="keyup: setLocalChatstate, hotkey: [{key: \'return\', action: sendMessage}, {key: \'esc\', action: close}]" />\
                 <span class="inputicon picto q">q</span>\
               </form>\
             </div>\
           </div>\
         </script>\
                       \
         <script type="text/x-jquery-tmpl" id="chatter-template">\
           <li data-bind="click: openChat">\
             <div class="clearfix">\
               <img data-bind="attr: {src: avatar_url()}" class="picture s30 fl mrm" />\
               <span class="ad5" data-bind="text: nickname()"></span>\
             </div>\
           </li>\
         </script>\
 \
         <span data-bind="template: {name: \'chat-template\', foreach: activeChats()}"></span>\
 \
         <div class="list clearfix chat-box" data-bind="css: {open: boxOpen() == \'list\'}">\
           <a href="#" class="closedtitle db tdn unh" data-bind="click: openList">\
             <span class="xs"><span class="availability picto">q</span> Kinky Chat</span> <span class="xxs">(<span class="im-online-user-count" data-bind="text: displayUsers().length"></span>)</span>\
             <span class="status quiet ttu xxxs lhn fr pd7" data-bind="text: status()"></span>\
           </a>\
           <div>\
             <div class="header xs" data-bind="click: minimizeBox">\
               <span class="availability picto">q</span> Kinky Chat (<span class="im-online-user-count" data-bind="text: displayUsers().length"></span>)\
               <a href="#openSettings" class="xxxs tdn unh q fr lhn dib pd4 ttu gear open" data-bind="css: {open: settingsOpen()}, click: toggleSettingsOpen"><span data-bind="text: status()"></span> <span class="pu1">&or;</span></a>\
             </div>\
             <ul class="settings" data-bind="css: {hidden: !settingsOpen()}">\
               <li><a class="tdn unh db lh22 xs phm" data-bind="click: setAvailable"><span class="picto pu1" data-bind="css: {vhidden: status() != \'available\'}">3</span>&nbsp; Available</a></li>\
               <li><a class="tdn unh db lh22 xs phm" data-bind="click: setInvisible"><span class="picto pu1" data-bind="css: {vhidden: status() != \'invisible\'}">3</span>&nbsp; Invisible</a></li>\
             </ul>\
             <ul class="xs kinksters" data-bind="template: {name: \'chatter-template\', foreach: displayUsers()}"></ul>\
             <form class="pr">\
               <input type="text" placeholder="Search" data-bind="keydown: filterChatlist, keyup: filterChatlist, hotkey: [{key: \'esc\', action: closeList}, {key: \'return\', action: noop}]" id="chat_list_filter" />\
               <span class="inputicon picto q">s</span>\
             </form>\
           </div>\
         </div>\
       </div>\
     </div>\
   </div>';


  document.getElementsByTagName('body')[0].appendChild(d);
  var s=document.createElement('script');
  s.src="https://flassets.a.ssl.fastly.net/javascripts/im.js";

  document.getElementsByTagName('head')[0].appendChild(s);

}

if(!document.getElementById('im'))
{
  var newel=document.createElement("div");
  newel.innerHTML="Enable Chat";
  newel.id='newel';
  newel.style.color="#666666";
  newel.style.backgroundColor='#393939';
  newel.style.left="auto";
  newel.style.position="fixed";
  newel.style.right=0;
  newel.style.bottom=0;
  newel.addEventListener("click",f);
  
  document.getElementsByTagName('body')[0].appendChild(newel);
}