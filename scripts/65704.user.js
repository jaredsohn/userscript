// ==UserScript==
// @name           Gaia Mail Auto Attach Signature
// @description    Automatically checks the mail attach signature box
// @include        http://www.gaiaonline.com/profile/privmsg.php*
// ==/UserScript==
var attach_sig=document.getElementsByName('attach_sig');
if(attach_sig.length!=0){
   attach_sig[0].checked='checked';
}