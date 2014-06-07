// ==UserScript==
// @name           clickIcons
// @namespace      http://userscripts.org/users/33515/scripts
// @description    Bessere Version von klickbare Posticons
// @include        http://forum.mods.de/bb/newreply.php*
// @include        http://forum.mods.de/bb/thread.php*
// @include        http://forum.mods.de/bb/editreply.php*
// ==/UserScript==



      var textarea = document.getElementsByTagName("textarea")[0];
      var imgs = document.getElementsByTagName("img");
      GM_addStyle(".icon { cursor:pointer; }");
      for (var i=0; i<imgs.length; i++) {
        if (imgs[i].src.indexOf("/img/icons") > -1) {
          imgs[i].className = "icon";
          imgs[i].addEventListener("click", function(e) {
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;
            //textarea.value = (textarea.value.substring(0, start) + ("[img]"+this.src+"[/img]") + textarea.value.substring(end, textarea.value.length).replace(/\n*$/gi, ""));
            textarea.value = (textarea.value.substring(0, start) + ("[img]./"+this.src.substring(24, this.src.length)+"[/img]") + textarea.value.substring(end, textarea.value.length).replace(/\n*$/gi, ""));
            textarea.focus();
            }, true);
        }
      }