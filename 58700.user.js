// ==UserScript==
// @name           JvReclamReponses
// @namespace      http://www.jeuxvideo.com
// @description    Ajoute des réponses types pour le forum Réclam
// @include        http://www.jeuxvideo.com/forums/3-1000017*
// ==/UserScript==

              value_options = new Array(); 
              value_options[0] = new Array();
              value_options[0]["intitule"] = 'Contacter Modérateur';
              value_options[0]["contenu"]  = "Tu devrais contacter le modérateur pour traiter ta demande.";

              value_options[1] = new Array();
              value_options[1]["intitule"] = 'Mauvaise balise';
              value_options[1]["contenu"]  = "Ton titre de topic ne dispose pas de la bonne balise, tu devrais lire les règles de ce forum pour faire un topic conforme.";

              value_options[2] = new Array();
              value_options[2]["intitule"] = 'Je transmets';
              value_options[2]["contenu"]  = "Je transmets.";

              value_options[3] = new Array();
              value_options[3]["intitule"] = 'Règles du forum';
              value_options[3]["contenu"]  = "Merci de lire les règles du forum.";

              value_options[4] = new Array();
              value_options[4]["intitule"] = '[Déban] pseudo hacké';
              value_options[4]["contenu"]  = "On ne déban pas les pseudos hackés, désolé.";

              value_options[5] = new Array();
              value_options[5]["intitule"] = '[Déban] plagiat de pseudo';
              value_options[5]["contenu"]  = "Le plagiat de pseudo est interdit, désolé.";

              value_options[6] = new Array();
              value_options[6]["intitule"] = '[Déban] divulgation';
              value_options[6]["contenu"]  = "Il est interdit de divulguer des informations personnelles sans une autorisation préalable de la personne concernée, désolé";

              value_options[7] = new Array();
              value_options[7]["intitule"] = '[Déban] 15-18';
              value_options[7]["contenu"]  = "La lecture des règles du forum expliquera ce qui a causé le banissement, tu devrais les lire.";

              value_options[8] = new Array();
              value_options[8]["intitule"] = 'Bug';
              value_options[8]["contenu"]  = "Contacte la personne adéquate stp, utilise ce formulaire : http://www.jeuxvideo.com/mailform.php";


              value_options[9] = new Array();
              value_options[9]["intitule"] = 'Délai dépassé';
              value_options[9]["contenu"]  = "Ta demande est trop ancienne pour être traitée, désolé.";

              value_options[10] = new Array();
              value_options[10]["intitule"] = 'FAQ';
              value_options[10]["contenu"]  = "Tu devrais consulter la faq des forum, elle te sera très utile .";


              value_options[11] = new Array();
              value_options[11]["intitule"] = '+100 jours';
              value_options[11]["contenu"]  = "Signale le message hors charte avec la fonction \"alerter un administrateur\" stp.";



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