// ==UserScript==
// @name           miniThreads
// @namespace      http://userscripts.org/users/33515;scripts
// @description    2000 Seiten sind zuviel.
// @include        http://forum.mods.de/bb/board.php?BID=*
// ==/UserScript==

//=====

var maxseiten = 20; // Ab wievielen Seiten sollen die Threads gekürzt werden?
var anfang    = 10; // Die ersten Seiten die noch angezeigt werden sollen
var ende      = 5;  // Die letzten Seiten  "

//=====


      GM_addStyle(".spacer {color:#ccc;font-size:12pt;cursor:pointer;margin-right:3px;} .spacer:hover {color:#ddd} .spacer:active {color:#fff}");

      var a = document.getElementsByTagName("a");
      for (var i=0; i<a.length; i++) {
      if (a[i].href.match(/thread\.php\?TID([^(last)]*)/gi)) {
          var td = a[i].parentNode;
          if (td.getAttribute("width") == "36%" && td.getElementsByTagName("font")[0]) {
            var font = td.getElementsByTagName("font")[0];
            var links = font.getElementsByTagName("a");
            if (links.length > maxseiten) {
              var spacer = document.createElement("a");
                  spacer.innerHTML = "&raquo;";
                  spacer.title = "Alle Seiten anzeigen";
                  spacer.className = "spacer";
                  spacer.addEventListener("click", function(e) {
                    var hiddenlinks = this.parentNode.getElementsByTagName("a");
                    for (var z=0; z<hiddenlinks.length; z++) {
                      if (hiddenlinks[z].className == "hiddenlink") {
                        var y = hiddenlinks[z].style;
                        y.display = (y.display == "none") ? "" : "none";
                      }
                    }
                    this.style.display = "none";
                  }, true);
              links[anfang].parentNode.insertBefore(spacer, links[anfang]);
              var count = Number(links.length);
              var letzte = (count-(ende));
              for (var k=0; k<links.length; k++) {
                var page = Number(links[k].innerHTML);
                if (page > anfang && page < letzte) {
                  links[k].className = "hiddenlink";
                  links[k].style.display = "none";
                }
              }
            }
          }
        }
      }