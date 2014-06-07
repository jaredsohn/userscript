// ==UserScript==
// @name	TF2R - Raffle quick-link fixes
// @namespace	auhtwoo
// @description	Replaces the defunct TF2Rep link with a useful link to the raffler's steam profile inventory, fixes TF2B link, and adds BP.tf link
// @include	http://tf2r.com/k*
// @include	http://tf2r.com/user/*
// @grant	none
// ==/UserScript== 

var a = document.getElementsByClassName("profile_info");
var x = a[0].getElementsByTagName("a")[0].href.replace("http://steamcommunity.com/actions/AddFriend/", "");

a[0].innerHTML = '<a href="steam://friends/add/'+x+'"><img src="http://tf2r.com/images/friend.png" width="16" height="16" /></a> <a href="http://steamrep.com/index.php?id='+x+'"><img src="http://tf2r.com/images/steamrep.png" width="16" height="16" /></a> <a href="http://steamcommunity.com/profiles/'+x+'/inventory#440"><img src="http://puu.sh/2hXh7.png"" width="16" height="16" /></a> <a href="http://tf2b.com/tf2/'+x+'"><img src="http://tf2r.com/images/tf2b.png" width="16" height="16" /></a> <a href="http://backpack.tf/profiles/'+x+'"><img src="http://puu.sh/2hWPn.png" width="16" height="16" /></a>';
