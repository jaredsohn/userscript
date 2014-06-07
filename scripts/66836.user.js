// ==UserScript==
// @name           JvDarksidersReponses
// @namespace       
// @description    Ajoute des réponses types pour le forum Darksiders
// @include        http://www.jeuxvideo.com/forums/3-22647-*
// ==/UserScript==

              value_options = new Array(); 
              value_options[0] = new Array();
              value_options[0]["option"] = 'opt_reponse_apportee';  
              value_options[0]["intitule"] = 'Réponse apportée';
              value_options[0]["contenu"]  = "La réponse a été apportée. Je lock :-)";

              value_options[1] = new Array();
              value_options[1]["option"] = 'opt_avis';  
              value_options[1]["intitule"] = 'Avis';
              value_options[1]["contenu"]  = "Il existe un topic général concernant les avis en tout genre, merci de poster ici dorénavant : http://www.jeuxvideo.com/forums/1-22647-28454-1-0-1-0-officiel-vos-avis-sur-le-jeu.htm";

              value_options[2] = new Array();
              value_options[2]["option"] = 'opt_details';  
              value_options[2]["intitule"] = 'Détails';
              value_options[2]["contenu"]  = "Merci de te référer à ce lien : "+
                                            '\\n'+
                                            "http://www.jeuxvideo.com/forums/1-22647-28463-1-0-1-0-faq-bloque-venez-d-abord-ici.htm#message_28465";

              value_options[3] = new Array();
              value_options[3]["option"] = 'opt_trone';  
              value_options[3]["intitule"] = 'Trône noir';
              value_options[3]["contenu"]  = "Il existe un topic avec des liens vidéos :"+
                                             '\\n'+
                                             "http://www.jeuxvideo.com/forums/1-22647-27497-1-0-1-0-video-trone-noir-rayon-robot.htm"+
                                            '\\n'+
                                            '\\n'+
                                             "Merci de rechercher la prochaine fois ^^";


              value_options[4] = new Array();
              value_options[4]["option"] = 'opt_epees';  
              value_options[4]["intitule"] = '3 Epées';
              value_options[4]["contenu"]  = "Il existe un topic avec des liens vidéos :"+
                                             '\\n'+
                                             "http://www.jeuxvideo.com/forums/1-22647-27604-1-0-1-0-video-epee-cathedrale-bombes.htm"+
                                            '\\n'+
                                            '\\n'+
                                             "Merci de rechercher la prochaine fois ^^";

              value_options[5] = new Array();
              value_options[5]["option"] = 'opt_viecourroux';  
              value_options[5]["intitule"] = 'Vie / Courroux';
              value_options[5]["contenu"]  = "Merci de te référer à ce lien : "+
                                            '\\n'+
                                            "http://www.jeuxvideo.com/forums/1-22647-28463-1-0-1-0-faq-bloque-venez-d-abord-ici.htm#message_28466";


              value_options[6] = new Array();
              value_options[6]["option"] = 'opt_artefact';  
              value_options[6]["intitule"] = 'Artefact';
              value_options[6]["contenu"]  = "Merci de te référer à ce lien : "+
                                            '\\n'+
                                            "http://www.jeuxvideo.com/forums/1-22647-28463-1-0-1-0-faq-bloque-venez-d-abord-ici.htm#message_28468";

              value_options[7] = new Array();
              value_options[7]["option"] = 'opt_ameliorlegend';  
              value_options[7]["intitule"] = 'Améliorations Légendaires';
              value_options[7]["contenu"]  = "Merci de te référer à ce lien : "+
                                            '\\n'+
                                            "http://www.jeuxvideo.com/forums/1-22647-28463-1-0-1-0-faq-bloque-venez-d-abord-ici.htm#message_28470";

              value_options[8] = new Array();
              value_options[8]["option"] = 'opt_armureabyssale';  
              value_options[8]["intitule"] = 'Armure Abyssale';
              value_options[8]["contenu"]  = "Merci de te référer à ce lien : "+
                                            '\\n'+
                                            "http://www.jeuxvideo.com/forums/1-22647-28463-1-0-1-0-faq-bloque-venez-d-abord-ici.htm#message_28471";

              value_options[9] = new Array();
              value_options[9]["option"] = 'opt_epeearmagedon';  
              value_options[9]["intitule"] = 'Epée Armagedon';
              value_options[9]["contenu"]  = "Merci de te référer à ce lien : "+
                                            '\\n'+
                                            "http://www.jeuxvideo.com/forums/1-22647-28463-1-0-1-0-faq-bloque-venez-d-abord-ici.htm#message_28472";

              value_options[10] = new Array();
              value_options[10]["option"] = 'opt_wickedk';  
              value_options[10]["intitule"] = 'Wicked K';
              value_options[10]["contenu"]  = "Merci de te référer à ce lien : "+
                                            '\\n'+
                                            "http://www.jeuxvideo.com/forums/1-22647-28463-1-0-1-0-faq-bloque-venez-d-abord-ici.htm#message_28473";

              value_options[11] = new Array();
              value_options[11]["option"] = 'opt_lesboss';  
              value_options[11]["intitule"] = 'Les Boss';
              value_options[11]["contenu"]  = "Merci de te référer à ce lien : "+
                                            '\\n'+
                                            "http://www.jeuxvideo.com/forums/1-22647-28463-1-0-1-0-faq-bloque-venez-d-abord-ici.htm#message_28474";

              value_options[12] = new Array();
              value_options[12]["option"] = 'opt_emptyslot';  
              value_options[12]["intitule"] = 'Slot vide';
              value_options[12]["contenu"]  = "Tu trouveras ta réponse ici : http://www.jeuxvideo.com/forums/1-22647-28417-1-0-1-0-le-dernier-slot-de-libre.htm"+
                                            '\\n'+
                                            '\\n'+
                                            "Merci de rechercher la prochaine fois ^^";

              value_options[13] = new Array();
              value_options[13]["option"] = 'opt_autres';  
              value_options[13]["intitule"] = 'Autres';
              value_options[13]["contenu"]  = "Tu trouveras ta réponse ici :"+
                                            '\\n'+
                                            "http://www.jeuxvideo.com/forums/1-22647-28463-1-0-1-0-faq-bloque-venez-d-abord-ici.htm#message_28475";


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
