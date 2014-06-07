// ==UserScript==
// @name           Ukrywanie
// @namespace      local
// @include        http://www.fotka.pl/*
// ==/UserScript==
      var link = document.createElement("a");
      link.id = "visinvis"
      link.href = "javascript:void(0)"
      link.addEventListener("click", switchMode, true);
      if(GM_getValue("visible") == "1"){
              link.innerHTML = "[widoczny]"
      }else{
              link.innerHTML = "[ukryty]"
      }
      if(document.getElementById("logowanie") != null){
              document.getElementById("logowanie").appendChild(link);
      }


      function switchMode(mode){
              var mode = GM_getValue("visible",1);
              if(mode == 1){        // jak widoczny, to ukryj i ustaw napis i zmienną że ukryty
                      GM_xmlhttpRequest({
                              method: "POST",
                              url: "http://www.fotka.pl/konto_setup.php",          ///////////|
                              data: "f%5Bemailon%5D=2&f%5Bkomentarze%5D=2&f%5Bopisy_komentarze%5D=1&f%5Bvisible%5D=2&f%5Bwiek%5D=1&f%5Bemots_forum%5D=1&f%5Bemots_komentarze%5D=1&f%5Bemots_wiadomosci%5D=1&f%5Bimg_komentarze%5D=1&f%5Bokazja%5D%5Bsylwester%5D=sylwester&f%5Bprezenty%5D=1&f%5Bnotki%5D=0&f%5Boznacz%5D=0&f%5Bwystartuj%5D=1&f%5Bnowy_profil%5D=1&e=u",
                              headers: {
                              "Content-Type": "application/x-www-form-urlencoded"
                              },
                              onload: function(){
                                                                      document.getElementById("visinvis").innerHTML = "[ukryty]"
                                                                      GM_setValue("visible", 0)       
                                                              }
                      });
              }
              else if(mode == 0){
                      GM_xmlhttpRequest({
                              method: "POST",
                              url: "http://www.fotka.pl/konto_setup.php",         ///////////|
                              data: "f%5Bemailon%5D=2&f%5Bkomentarze%5D=2&f%5Bopisy_komentarze%5D=1&f%5Bvisible%5D=1&f%5Bwiek%5D=1&f%5Bemots_forum%5D=1&f%5Bemots_komentarze%5D=1&f%5Bemots_wiadomosci%5D=1&f%5Bimg_komentarze%5D=1&f%5Bokazja%5D%5Bsylwester%5D=sylwester&f%5Bprezenty%5D=1&f%5Bnotki%5D=0&f%5Boznacz%5D=0&f%5Bwystartuj%5D=1&f%5Bnowy_profil%5D=1&e=u",
                              headers: {
                              "Content-Type": "application/x-www-form-urlencoded"
                              },
                              onload: function(){
                                                                      document.getElementById("visinvis").innerHTML = "[widoczny]"
                                                                      GM_setValue("visible", 1)       
                                                              }
                      });
              }
      }
