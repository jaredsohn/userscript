// ==UserScript==
          // @name           AutoSelect de Servidor by WTF
          // @namespace      WTF
          // @include        http://ikariam.*/
          // ==/UserScript==
          
          //INTRODUCE A CONTINUACION (Cambiando el 12) EL NUMERO DE TU SERVIDOR (1-Alpha, 2-Beta, etc.) Lo puedes ver en el foro
          var id = 2;
          
          //AQUI PUEDES ADAPTARLO SI JUEGAS EN OTRO IKARIAM DIFERENTE AL .ES
          var country = "ar";
          
          //NO MODIFICAR A PARTIR DE AQUI
          var text = document.getElementById('universe');
          text.innerHTML = text.innerHTML.replace('<option value="s' + id + '.ikariam.' + country + '">','<option value="s' + id + '.ikariam.' + country + '" selected="selected">');