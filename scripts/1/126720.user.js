// ==UserScript==
// @name Facebook Auto Like By Chipunk Zhakaev Valdimire
// @namespace facebook_auto_ike
// @description Like status dan Dinding Facebook hanya dengan Sekali Klik, Flood wall's / Status FaceBook
// @author http://www.facebook.com/profile.php?id=1652022253
// @homepage http://www.facebook.com/profile.php?id=1652022253
// @include htt*://www.facebook.com/*
// @icon https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash4/303862_181967998557742_181967151891160_380171_1292531872_n.jpg
// @version 6.9
// @exclude htt*://*static*.facebook.com*
// @exclude htt*://*channel*.facebook.com*
// @exclude htt*://developers.facebook.com/*
// @exclude htt*://upload.facebook.com/*
// @exclude htt*://www.facebook.com/common/blank.html
// @exclude htt*://*onnect.facebook.com/*
// @exclude htt*://*acebook.com/connect*
// @exclude htt*://www.facebook.com/plugins/*
// @exclude htt*://www.facebook.com/l.php*
// @exclude htt*://www.facebook.com/ai.php*
// @exclude htt*://www.facebook.com/extern/*
// @exclude htt*://www.facebook.com/pagelet/*
// @exclude htt*://api.facebook.com/static/*
// @exclude htt*://www.facebook.com/contact_importer/*
// @exclude htt*://www.facebook.com/ajax/*
// @exclude htt*://apps.facebook.com/ajax/*
// @exclude htt*://www.facebook.com/advertising/*
// @exclude htt*://www.facebook.com/ads/*
// @exclude htt*://www.facebook.com/sharer/*

// ==/UserScript==

// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.bottom = "+690px";
div.style.left = "+500px";
div.style.backgroundColor = "#eceff5";
div.style.border = "2px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "|™ Welcome to Chipunk = auto like / auto wall spam ™|"

body.appendChild(div);

unsafeWindow.AutoExpandPosts = function() {

buttons = document.getElementsByTagName("a");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("lfloat") >= 0)
if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
buttons[i].click();
}

};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+177px";
  div.style.left = "+7px";
  div.style.backgroundColor = "#eceff5";
  div.style.border = "2px solid #94a3c4";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#001EFF\" href=\"javascript:AutoLike()\"> |™Like Semua Status Punk !™| </a>"

  body.appendChild(div);

  unsafeWindow.AutoLike = function() {

    buttons = document.getElementsByTagName("button");
    for(i = 0; i < buttons.length; i++) {
      myClass = buttons[i].getAttribute("class");
      if(myClass != null && myClass.indexOf("like_link") >= 0)
        if(buttons[i].getAttribute("name") == "like")
          buttons[i].click();
    }

  };
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+157px";
  div.style.left = "+7px";
  div.style.backgroundColor = "#eceff5";
  div.style.border = "2px solid #94a3c4";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#00F2FF\" href=\"JavaScript:AutoUnLike()\"> |™Hapus semua like status Punk !™| </a>"

  body.appendChild(div);

  unsafeWindow.AutoUnLike = function() {

    buttons = document.getElementsByTagName("button");
    for(i = 0; i < buttons.length; i++) {
      myClass = buttons[i].getAttribute("class");
      if(myClass != null && myClass.indexOf("like_link") >= 0)
        if(buttons[i].getAttribute("name") == "unlike")
          buttons[i].click();

    }

  };
}
// ==Expand==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+137px";
  div.style.left = "+8px";
  div.style.backgroundColor = "#eceff5";
  div.style.border = "2px solid #94a3c4";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#09FF00\" href=\"JavaScript:FloodWal()\"> |™ Perkosa Wae ! ™| </a>"

  body.appendChild(div);

  unsafeWindow.FloodWal = function() {

    var a = document.body.innerHTML;var Num=prompt("","Jumlah pesan cok, ek sabaraha ?");var msg=prompt("","Isi pesan na kewe");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

  };
}
// ==Expand==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+117px";
  div.style.left = "+6px";
  div.style.backgroundColor = "#eceff5";
  div.style.border = "2px solid #94a3c4";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#FF000D\" href=\"http://http://userscripts.org/scripts/show/126720\">| ™Check for Update Cok™ |</a>"

  body.appendChild(div);

  unsafeWindow.AutoExpand = function() {

    buttons = document.getElementsByTagName("input");
    for(i = 0; i < buttons.length; i++) {
      myClass = buttons[i].getAttribute("class");
      if(myClass != null && myClass.indexOf("") >= 0)
        if(buttons[i].getAttribute("name") == "view_all")
          buttons[i].click();
    }

  };
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+97px";
  div.style.left = "+8px";
  div.style.backgroundColor = "#eceff5";
  div.style.border = "2px solid #94a3c4";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#FF0073\" href=\"http://facebook.com\">|™ Refresh Heula FB na ! ™|</a>"

  body.appendChild(div);

  unsafeWindow.AutoExpandPosts = function() {

    buttons = document.getElementsByTagName("a");
    for(i = 0; i < buttons.length; i++) {
      myClass = buttons[i].getAttribute("class");
      if(myClass != null && myClass.indexOf("lfloat") >= 0)
        if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
          buttons[i].click();
    }

  };
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+77px";
  div.style.left = "+7px";
  div.style.backgroundColor = "#eceff5";
  div.style.border = "2px solid #94a3c4";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#F700FF\" href=\"http://www.facebook.com/TheHackCheat\">|- ™My Profile :D™ -|</a>"

  body.appendChild(div);

  unsafeWindow.AutoExpandPosts = function() {

    buttons = document.getElementsByTagName("a");
    for(i = 0; i < buttons.length; i++) {
      myClass = buttons[i].getAttribute("class");
      if(myClass != null && myClass.indexOf("lfloat") >= 0)
        if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
          buttons[i].click();
    }

  };
}
// ==============
// ==Comments==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+57px";
  div.style.left = "+6px";
  div.style.backgroundColor = "#eceff5";
  div.style.border = "2px solid #94a3c4";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#7B00FF\" href=\"http://www.facebook.com/lfs.sasti\">|™MY INSPIRATION™|</a>"

  body.appendChild(div);

  unsafeWindow.AutoLikeComments = function() {

    buttons = document.getElementsByTagName("button");
    for(i = 0; i < buttons.length; i++) {
      myClass = buttons[i].getAttribute("class");
      if(myClass != null && myClass.indexOf("") >= 0)
        if(buttons[i].getAttribute("title") == "Like this comment")
          buttons[i].click();

    }

  };
}
// ==============
// ==Unlike Comments==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+37px";
  div.style.left = "+6px";
  div.style.backgroundColor = "#eceff5";
  div.style.border = "2px solid #94a3c4";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#C8FF00\" href=\http://Chipunk.deviantart.com\>|™My DeviantArt™|</a>"

  body.appendChild(div);

  unsafeWindow.AutoUnLikeComments = function() {

    buttons = document.getElementsByTagName("button");
    for(i = 0; i < buttons.length; i++) {
      myClass = buttons[i].getAttribute("class");
      if(myClass != null && myClass.indexOf("") >= 0)
        if(buttons[i].getAttribute("title") == "Unlike this comment")
          buttons[i].click();
    }

  };
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+17px";
  div.style.left = "+7px";
  div.style.backgroundColor = "#eceff5";
  div.style.border = "2px solid #94a3c4";
  div.style.padding = "2px";
 div.innerHTML = "<a style=\"font-weight:bold;color:#F700FF\" href=\"http://www.facebook.com/TheHackCheat\">|™ MADE BY CHIPUNK ZHAKAEV VALDIMIRE ™|</a>"

body.appendChild(div);

unsafeWindow.AutoExpandPosts = function() {

buttons = document.getElementsByTagName("a");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("lfloat") >= 0)
if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
buttons[i].click();
}

};
}