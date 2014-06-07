// ==UserScript==
// @name           Forum o Fotka
// @namespace      local
// @include        http://www.fotka.pl/*
// ==/UserScript==
      var link = document.createElement("a");
      link.id = "visinvis"
      link.href = "http://www.fotka.pl/forum/o_fotka.pl"
      
      if(GM_getValue("visible") == "1"){
              link.innerHTML = "[Forum o Fotka]"
      }else{
              link.innerHTML = '<p><p><p><img src="http://img809.imageshack.us/img809/3249/gotowe.gif"'
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
                              data: "",
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
                              data: "",
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
