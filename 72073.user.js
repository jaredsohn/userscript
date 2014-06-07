// ==UserScript==
// @name           visinvis
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
                              data: "username=Login&password=Hasło",
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
                              data: "username=Login&password=Hasło",
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
