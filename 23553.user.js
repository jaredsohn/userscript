// ==UserScript==
// @name           PictureThis
// @namespace      tag:OlafTheTroll@suicidegirls.com,2008-03-05
// @description    Makes images in SG threads fit and adds links to originals.
// @include        http://suicidegirls.com/boards/*
// @include        http://suicidegirls.com/groups/*
// @include        http://suicidegirls.com/members/*/friends/threads/*
// ==/UserScript==

window.addEventListener("load", function(e) {
  var thread = document.getElementById('thread');
  if (thread == undefined) {
    return;
  }

  var divs = thread.getElementsByTagName('div');
  for (var i = 0; i < divs.length; ++i) {
    var elm = divs[i];
    if (elm.id.match(/commentContent.*/)) {
      var imgs = elm.getElementsByTagName('img');
      for (var j = 0; j < imgs.length; ++j) {
        var pic = imgs[j];
        var src = pic.src;
        if (src.match(
            /^http:\/\/((img|www)\.)?suicidegirls.com\/media\/.*_attach\./)) {
          src = src.replace(/_attach\./, ".");
          pic.title = "attached";
        } else {
          pic.title = pic.width + "x" + pic.height
          if (pic.width > 400) {
            pic.width = 400;
          }
        }
        var link = document.createElement("a");
        link.href = src;
        link.target = "_blank";
        pic.parentNode.insertBefore(link, pic);
        link.appendChild(pic);
      }
    }
  }
}, false);
