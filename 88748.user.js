// ==UserScript==
// @name           Odnosnik do GSOS
// @namespace      local
// @include        http://www.fotka.pl/*
// ==/UserScript==
      var link = document.createElement("a");
      link.id = "visinvis"
      link.href = "http://www.fotka.pl/grupa/809389/Skutecznie_obnizamy_srednia_na_fotkapl_GSOS/"
      
      if(GM_getValue("visible") == "1"){
              link.innerHTML = "[Grupa GSOS]"
      }else{
              link.innerHTML = '<p><img src="http://w.fotka.pl/63aea6e095.jpg"'
      }
      if(document.getElementById("logowanie") != null){
              document.getElementById("logowanie").appendChild(link);
      }


      function switchMode(mode){
              var mode = GM_getValue("visible",1);
              if(mode == 1){        // 
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
