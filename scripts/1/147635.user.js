// ==UserScript==
// @name           RéponsesElections
// @namespace      http://www.jeuxvideo.com
// @description    Ajoute des réponses types pour le forum Elections
// @include        http://www.jeuxvideo.com/forums/3-1000018*
// ==/UserScript==

              value_options = new Array(); 
              value_options[0] = new Array();
              value_options[0]["intitule"] = 'Forum pas assez actif - Activité possible';
              value_options[0]["contenu"]  = "Salut ! Le forum n'est pas assez actif pour le moment, l'élection n'est donc pas envisageable. En revanche, si à l'approche de la sortie du jeu, l'activité venait à être bien plus grande, n'hésite pas à venir redemander. En attendant, tu peux toujours signaler les messages avec la fonction d'alerte aux admins (le petit carré rouge), ou en passant par le forum Réclamations ! :)";

              value_options[1] = new Array();
              value_options[1]["intitule"] = 'Forum pas assez actif - Activité impossible';
              value_options[1]["contenu"]  = "Salut ! Désolé, le forum n'est pas assez actif pour bénéficier d'un modérateur. Et au vu de la date de sortie du jeu, ça m'étonnerait que l'activité venait à reprendre sous peu. Utilise l'alerte admin (le petit carré rouge) ou le forum Réclamations en cas de soucis ! :)";

              value_options[2] = new Array();
              value_options[2]["intitule"] = 'Je transmets';
              value_options[2]["contenu"]  = "Yop. Je transmets.";

              value_options[3] = new Array();
              value_options[3]["intitule"] = 'Je ne transmets pas';
              value_options[3]["contenu"]  = "Salut. Désolé, je ne pense pas que l'épinglage de ce topic soit réellement nécessaire (Je te renvoie à ça pour en comprendre la raison : http://www.jeuxvideo.com/forums/1-1000018-131744-1-0-1-0-les-demandes-d-epingles.htm ). Je ne transmets donc pas ! ^^";

              value_options[4] = new Array();
              value_options[4]["intitule"] = 'Mauvais forum';
              value_options[4]["contenu"]  = "Salut ! Les demandes de lock/d'errazage/de ban/de déban et les plaintes contre les modérateurs se font sur le forum Réclamations : http://www.jeuxvideo.com/forums/0-1000017-0-1-0-1-0-reclamations.htm :) Pense à lire les règles avant de poster.";

              value_options[5] = new Array();
              value_options[5]["intitule"] = 'Election validée';
              value_options[5]["contenu"]  = "Salut. L'élection a été validée par les administrateurs et sera effectuée sous peu dès que possible ! :)";

              value_options[6] = new Array();
              value_options[6]["intitule"] = 'Election transmise';
              value_options[6]["contenu"]  = "Yo ! Je vais en parler aux admins (Ce qui ne signifie pas que vous allez avoir une élection, juste que les admins vont prendre connaissance de la situation du forum et décider en conséquence). ^^";

              value_options[7] = new Array();
              value_options[7]["intitule"] = 'Election refusée';
              value_options[7]["contenu"]  = "Salut. Désolé, les admins n'ont pas jugé nécessaire de valider l'élection sur ce forum. Je vous conseille donc de passer par l'alerte admin en cas de soucis (le petit carré rouge) ou pas le forum Réclamations en en suivant les règles :)";

              value_options[8] = new Array();
              value_options[8]["intitule"] = 'Comodérateur/Forum modéré';
              value_options[8]["contenu"]  = "Salut. Le forum étant modéré, toutes demandes en rapport avec la modération se fait avec le modérateur en place ! :)";


              value_options[9] = new Array();
              value_options[9]["intitule"] = 'On ne demande pas !';
              value_options[9]["contenu"]  = "On ne demande pas à être modérateur, on demande des élections. Je te renvoie à la FAQ : http://www.jeuxvideo.com/forums_faq.htm#a44 :)";

              value_options[10] = new Array();
              value_options[10]["intitule"] = 'Forum pas assez actif - Pas un jeu';
              value_options[10]["contenu"]  = "Salut ! Le forum n'est pas assez actif pour le moment, l'élection n'est donc pas envisageable. En revanche, si l'activité venait à être bien plus grande, n'hésite pas à venir redemander. En attendant, tu peux toujours signaler les messages avec la fonction d'alerte aux admins (le petit carré rouge), ou en passant par le forum Réclamations ! :)";

              value_options[11] = new Array();
              value_options[11]["intitule"] = 'Règles élecs';
              value_options[11]["contenu"]  = "Tu devrais lire ça : http://www.jeuxvideo.com/forums/1-1000018-131742-1-0-1-0-les-demandes-d-elections.htm";



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