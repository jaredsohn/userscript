// ==UserScript==
// @name           Reponses FIFA 13
// @namespace      http://www.jeuxvideo.com
// @description    Ajoute des réponses types pour le forum 
// @include        http://www.jeuxvideo.com/forums/3-28771*
// ==/UserScript==

              value_options = new Array(); 
              value_options[0] = new Array();
              value_options[0]["intitule"] = 'FUT(1)';
              value_options[0]["contenu"]  = "Tu peux parler de ça sur le forum de FIFA Ultimate Team 13 :d) http://ultimate-team-13.forumjv.com/0-84031-0-1-0-1-0-0.htm";

              value_options[1] = new Array();
              value_options[1]["intitule"] = 'FUT(2)';
              value_options[1]["contenu"]  = "Refais ton topic sur le forum FIFA Ultimate Team 13 :d) http://ultimate-team-13.forumjv.com/0-84031-0-1-0-1-0-0.htm";

              value_options[2] = new Array();
              value_options[2]["intitule"] = 'FUT(3)';
              value_options[2]["contenu"]  = "Il existe un forum FIFA Ultimate Team 13 :d) http://ultimate-team-13.forumjv.com/0-84031-0-1-0-1-0-0.htm";

              value_options[3] = new Array();
              value_options[3]["intitule"] = 'Youtube';
              value_options[3]["contenu"]  = "Il y a un topic créé spécialement pour partager vos chaines Youtube :d) http://www.jeuxvideo.com/forums/1-28771-250032-1-0-1-0-youtube-fifa13.htm";

              value_options[4] = new Array();
              value_options[4]["intitule"] = 'Club Pro';
              value_options[4]["contenu"]  = "Il existe des topics pour recruter ou rechercher un club :d) http://www.jeuxvideo.com/forums/1-28771-138660-1-0-1-0-c-les-regles-du-forum-c.htm#message_164619";

              value_options[5] = new Array();
              value_options[5]["intitule"] = 'Règles';
              value_options[5]["contenu"]  = "Merci de lire les règles avant de créer un topic :d) http://www.jeuxvideo.com/forums/1-28771-138660-1-0-1-0-c-les-regles-du-forum-c.htm :-)";

			  
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