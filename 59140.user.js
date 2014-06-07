// ==UserScript==
// @name           JvMaterielInfoReponses
// @namespace       
// @description    Ajoute des réponses types pour le forum MatérielInformatique
// @include        http://www.jeuxvideo.com/forums/3-6-*
// ==/UserScript==

              value_options = new Array(); 
              value_options[0] = new Array();
              value_options[0]["option"] = 'opt_hs';  
              value_options[0]["intitule"] = 'HS';
              value_options[0]["contenu"]  = "Salut, tu est hors sujet, va voir sur le topic de la console en question, merci :)";

              value_options[1] = new Array();
              value_options[1]["option"] = 'opt_politesse';  
              value_options[1]["intitule"] = 'Politesse';
              value_options[1]["contenu"]  = "Topic à refaire avec un minimum de politesse stp, merci :)";


              value_options[2] = new Array();
              value_options[2]["option"] = 'opt_hs360';  
              value_options[2]["intitule"] = 'HS Xbox360';
              value_options[2]["contenu"]  = "Salut, tu est hors sujet, va voir sur le topic de la console en question, http://www.jeuxvideo.com/forums/0-61-0-1-0-1-0-xbox-360.htm"+
'\\n'+
"merci :)";


              value_options[3] = new Array();
              value_options[3]["option"] = 'opt_hsPS3';  
              value_options[3]["intitule"] = 'HS PS3';
              value_options[3]["contenu"]  = "Salut, tu est hors sujet, va voir sur le topic de la console en question, http://www.jeuxvideo.com/forums/0-60-0-1-0-1-0-playstation-3.htm"+
'\\n'+
"merci :)";

              value_options[4] = new Array();
              value_options[4]["option"] = 'opt_hsjeu';  
              value_options[4]["intitule"] = 'HS Jeu';
              value_options[4]["contenu"]  = "Salut, tu est hors sujet, va voir sur le topic du jeu en question, merci :)";


              value_options[5] = new Array();
              value_options[5]["option"] = 'opt_idiotie';  
              value_options[5]["intitule"] = 'Idiotie ';
              value_options[5]["contenu"]  = ":d) http://www.dailymotion.com/video/x8j2e1_alerte_sport";



function add_things() {
	if (document.getElementById('post')) {
              var eltPost = document.getElementById('post').getElementsByTagName('p')[0].getElementsByTagName('textarea')[0];      
              var liste = document.createElement('select');    
              liste.id = "choix_reponse";
              var niveauOptions = "<option selected></option>";
              for (var i=0; i<value_options.length; i++) {       
                   var valOption = value_options[i]["contenu"];
                   
                   niveauOptions += "<option id='"+value_options[i]['option']+"' value='"+value_options[i]['option']+"' onclick='document.getElementById(\"newmessage\").value = \""+valOption+"\"'>"+value_options[i]['intitule']+"</option>";

              }
	      liste.innerHTML = niveauOptions;
              var newtextarea = document.getElementById('post').getElementsByTagName('p')[0].getElementsByTagName('textarea')[0];
              document.getElementById('post').getElementsByTagName('p')[0].insertBefore(liste,eltPost);
	}
}

add_things(); 
