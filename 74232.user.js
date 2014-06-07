// ==UserScript==
// @name           Remplisseur Forumactif - Réponse rapide
// @namespace      forumactif,forum
// @description    Auto remplissage du champ de texte pour la réponse rapide sur les forums de Forumactif.
// @include        http://forum.forumactif.com/*
// ==/UserScript==

              value_options = new Array(); 
              value_options[0] = new Array();
              value_options[0]["option"] = 'opt_0';  
              value_options[0]["intitule"] = 'titre';
              value_options[0]["contenu"]  = "auto-message";

              value_options[1] = new Array();
              value_options[1]["option"] = 'opt_1';  
              value_options[1]["intitule"] = 'titre';
              value_options[1]["contenu"]  = "auto-message";

              value_options[2] = new Array();
              value_options[2]["option"] = 'opt_2';  
              value_options[2]["intitule"] = 'titre';
              value_options[2]["contenu"]  = "auto-message";
			  
              value_options[3] = new Array();
              value_options[3]["option"] = 'opt_3';  
              value_options[3]["intitule"] = 'titre';
              value_options[3]["contenu"]  = "auto-message";

              value_options[4] = new Array();
              value_options[4]["option"] = 'opt_4';  
              value_options[4]["intitule"] = 'titre';
              value_options[4]["contenu"] = "auto-message";


function add_things() {
	if (document.getElementById('quick_reply')) {
              var eltquick_reply = document.getElementById('quick_reply').getElementsByTagName('p')[0].getElementsByTagName('textarea')[0];      
              var liste = document.createElement('select');    
              liste.id = "choix_reponse";
              var niveauOptions = "<option selected></option>";
              for (var i=0; i<value_options.length; i++) {       
                   var valOption = value_options[i]["contenu"];
                   
                   niveauOptions += "<option id='"+value_options[i]['option']+"' value='"+value_options[i]['option']+"' onclick='document.getElementById(\"text_editor_textarea\").value = \""+valOption+"\"'>"+value_options[i]['intitule']+"</option>";

              }
	      liste.innerHTML = niveauOptions;
              var newtextarea = document.getElementsByTagName('div')[0].getElementsByTagName('textarea_content')[0];
              document.getElementById('quick_reply').insertBefore(liste,eltquick_reply);
	}
}

add_things();