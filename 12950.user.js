// ==UserScript==
// @name           FixLinks
// @namespace      http://userscripts.org/users/33515;scripts
// @description    Macht aus den Javascript-Profilen richtige Links
// @include        http://forum.mods.de/bb/*
// ==/UserScript==


//====
var newprofile = true;        // Das neue Profil verwenden? true=ja; false=nein
//====

  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var attr = String(links[i].getAttribute("onClick"));
    if (links[i].href=="javascript:void(0);" && attr.match(/openProfile2?\([0-9]{1,8}\)$/gi)) {
      var uid = attr.replace(/openProfile2?\(([0-9]{1,8})\)$/gi, "$1");
      var www;
      if (newprofile) {
        www = "http://my.mods.de/"+uid;
      }
      else {
        www = "http://forum.mods.de/bb/profile.php?UID="+uid;
      }
      links[i].href = www;
      links[i].removeAttribute("onClick");
    }
  }