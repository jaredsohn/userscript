// ==UserScript==
// @name           clickSpoiler
// @namespace      http://userscripts.org/users/33515;scripts
// @description    Blendet Spoiler aus und lässt sie mit einem Klick wieder erscheinen
// @include        http://forum.mods.de/bb/thread.php*
// ==/UserScript==


    var is=document.getElementsByTagName("i");
    for (var i=0; i<is.length; i++) {
      if (is[i].innerHTML=="Spoiler") {
        is[i].nextSibling.nextSibling.nextSibling.setAttribute("style", "display:none;");
        var view=document.createElement("b");
            view.innerHTML=" [+]";
            view.setAttribute("onclick", "this.nextSibling.nextSibling.nextSibling.setAttribute('style', 'display:block; border:thin solid #fff; margin-top:2px');this.innerHTML=' [-]';");
            view.setAttribute("style", "cursor:pointer;");
         is[i].parentNode.innerHTML=is[i].parentNode.innerHTML.replace(/\s-\smarkieren,\sum\szu\slesen:/gi, " ");
          is[i].parentNode.insertBefore(view, is[i].nextSibling);
      }
    }