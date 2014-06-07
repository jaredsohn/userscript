// ==UserScript==
// @name          Dragonriders DeNotificator
// @version         2.0
// @namespace      http://userscripts.org/users/513808/
// @description    E-Mail Benachrichtigung deaktivieren, Mod von http://userscripts.org/scripts/show/8199
// @include        http://dragonriders.forumieren.com/post?t=*&mode=reply
// @include        http://dragonriders.forumieren.com/post?t=*&mode=editpost
// @include        http://dragonriders.forumieren.com/post?t=*&mode=newtopic
// @include        http://dragonriders.forumieren.com/post?p=*&mode=reply
// @include        http://dragonriders.forumieren.com/post?p=*&mode=editpost
// @include        http://dragonriders.forumieren.com/post?p=*&mode=newtopic
// @include        http://dragonriders.forumieren.com/post?*=*&mode=reply
// @include        http://dragonriders.forumieren.com/post?*=*&mode=editpost
// @include        http://dragonriders.forumieren.com/post?*=*&mode=newtopic
// @copyright    2013+, LinkFan16/Narisha/Aurelia/Sunny, Rocky Neurock
// ==/UserScript==

var cBoxes=document.getElementsByName('notify')

window.onload = function () {
for (var i=0; i < cBoxes.length; i++) {

    if (cBoxes[i].type=="checkbox") {

   cBoxes[i].checked=false

    }

}
}