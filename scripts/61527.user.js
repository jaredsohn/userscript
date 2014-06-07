// ==UserScript==
// @name           Torrents.ru text button
// @namespace      torrentsru
// @description    Replace grafics button on text
// @include        http://torrents.ru/forum/*
// @include        http://pornolab.net/forum/*
// @license        GPLv3
// @copyright      2009 Apkawa Inc
// @contributor    Apkawa
// ==/UserScript==
var debug = 0;
function log( msg){
    if (debug){
        console.debug(msg);
    };
};
var prefix="http://static."+ document.domain +"/templates/default/images/"
var replaced = [
            [ "reply.gif", '「Reply」' ],
            [ "post.gif",  '「New theme」'],
            [ "reply_locked.gif",  '「Theme locked」'],
            [ "folder_new_big.gif","{☢▮}"],
            [ "folder_big.gif","{☢}"],
            [ "folder_announce_new.gif",'{☭▮}'],
            [ "folder_announce.gif","{☭}"],
            [ "folder_sticky_new.gif","[⚠▮]"],
            [ "folder_sticky.gif","[⚠]"],
            [ "folder_new.gif","(▮)"],
            [ "folder.gif","(-)"],
            [ "folder_lock_new.gif","(☠▮)"],
            [ "folder_lock.gif","(☠)"],
            [ "icon_newest_reply.gif","⇨▮"],
            [ "icon_latest_reply.gif","⇨▯"],
            [ "menu_open_1.gif","⟱"],
            [ "folder_dl.gif","[DL]"],
            [ "folder_dl_new.gif","[DL▮]"],
            [ "icon_minipost_new.gif","▮"],
            [ "icon_minipost.gif","▯"],
            ];

for (var i = 0; i < replaced.length; i++) {
   var images = document.querySelectorAll("img[src='" + prefix+replaced[i][0] + "']");
   if (images) {
       for (var j = 0; j < images.length; j++) {
           var span = document.createElement('span');
           span.setAttribute('class','user_button');
           span.innerHTML = replaced[i][1];
           var img = images[j];
           img.parentNode.replaceChild(span, img);

       };
   };
      
};
