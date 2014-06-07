// ==UserScript==
// @name           shhd
// @namespace      http://userscripts.org/users/101059
// @description    SHH!
// @include        *
// ==/UserScript==
// This one's for Michael, may he SHH! in peace.

var shh=document.createElement("div");
shh.innerHTML='<div style="position:fixed;z-index:11138;left:50%;top:50%;text-align:center;width:800;height:400;margin-left:-480px;margin-top:-260px;border:40px solid #f00;padding:40px;line-height:400px;font-size:220px;background-color:#ffA500;"><p style="margin:0px;border:40px solid #ff0;padding:40px;height:240px;background-color:#0f0;color:#00f;line-height:240px;font-weight:bold;">SHH!</p></div>';
document.body.insertBefore(shh,document.body.firstChild);
