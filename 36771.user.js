// ==UserScript==
// @name           Myspace Remove "Find Friends"
// @namespace      rkm
// @description    Read the name
// @include        http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID=*
// @include        http://friends.myspace.com/index.cfm?friendID=*&fuseaction=user.viewfriends
// ==/UserScript==
document.getElementById("tkn_medrec").style.height = "10px";
document.getElementById("friends_head").parentNode.removeChild(document.getElementById("friends_head"));
