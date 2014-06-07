// ==UserScript==
// @name           JvReclamReponses
// @namespace      http://www.jeuxvideo.com
// @description    Ajoute des réponses types pour le forum Réclam
// @include        http://www.jeuxvideo.com/forums/3-24777*
// ==/UserScript==

              value_options = new Array(); 
              value_options[0] = new Array();
              value_options[0]["intitule"] = 'Piratage';
              value_options[0]["contenu"]  = "Tu devrais contacter le modérateur pour traiter ta demande.";
			  
              value_options[1] = new Array();
              value_options[1]["intitule"] = 'Liens de parrainage';
              value_options[1]["contenu"]  = "Tu devrais contacter le modérateur pour traiter ta demande.";

if (document.getElementById('post')) {
              var eltPost = document.getElementById('post').getElementsByTagName('p')[0].getElementsByTagName('textarea')[0];      
              var liste = document.createElement('select');    
              liste.id = "choix_reponse";
              liste.innerHTML = "<option selected></option>";
              for (var i=0; i<value_options.length; i++) {       
                   var valOption = value_options[i]["contenu"];
                  
                   liste.innerHTML += "<option value=\""+valOption+"\" onClick=\"document.getElementById(\"newmessage\").value = \""+valOption+"\"\">"+value_options[i]['intitule']+"</option>";

              }
              liste.addEventListener('click', function() {document.getElementById("newmessage").value = this.value;})
              document.getElementById('post').getElementsByTagName('p')[0].insertBefore(liste, eltPost);
	}