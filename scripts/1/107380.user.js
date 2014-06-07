// --------------------------------------------------------------------------
// ==UserScript==
// @name           Show Bangumi Edit
// @description    Show del and edit link
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==
//
// --------------------------------------------------------------------------

var type = location.href.split("/")[3];
var reinfo = document.getElementsByClassName("re_info");
var me = document.getElementsByClassName("badgeUser")[0];
var myid = me.childNodes[1].href.split("/")[4];
for (j = 0; j < reinfo.length; j++)
  {var id = reinfo[j].parentNode.childNodes[3].href.split("/")[4];
   if (reinfo[j].textContent.slice(-4) != "edit" & myid == id){
   var timestamp = reinfo[j].firstChild.textContent;
   var post = reinfo[j].parentNode.id.slice(5);
   var dellink = ' / <a id="erase_' + post + '" href="/erase/' + type + '/reply/' + post + '" class="erase_post">del</a>';
   var editlink = ' / <a href="/' + type + '/reply/' + post + '/edit">edit</a>';
   reinfo[j].firstChild.innerHTML = timestamp + dellink + editlink;
  }
  }