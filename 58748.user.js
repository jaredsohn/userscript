// ==UserScript==
// @name           JvFifa10Reponses
// @namespace       
// @description    Ajoute des réponses types pour le forum Fifa10
// @include        http://www.jeuxvideo.com/forums/3-19583*
// ==/UserScript==

              value_options = new Array(); 
              value_options[0] = new Array();
              value_options[0]["option"] = 'opt_forumfoot';  
              value_options[0]["intitule"] = 'Forum Foot';
              value_options[0]["contenu"]  = "Va sur le forum football :d) http://www.jeuxvideo.com/forums/0-20-0-1-0-1-0-0.htm"+
'\\n'+":merci:";

              value_options[1] = new Array();
              value_options[1]["option"] = 'opt_mauvforum';  
              value_options[1]["intitule"] = 'Mauvais forum';
              value_options[1]["contenu"]  = "Pas sur le bon forum :d) http://www.jeuxvideo.com/forums.htm"+
'\\n'+":merci:";

              value_options[2] = new Array();
              value_options[2]["option"] = 'opt_doublon';  
              value_options[2]["intitule"] = 'Doublon';
              value_options[2]["contenu"]  = "Il y a déjà un topic pour ce sujet :rechercher:"+
'\\n'+":merci:";

              value_options[3] = new Array();
              value_options[3]["option"] = 'opt_pronos';  
              value_options[3]["intitule"] = 'Pronos';
              value_options[3]["contenu"]  = "Il existe déjà un topic de pronostiques. :ok:"+
'\\n'+"http://www.jeuxvideo.com/forums/1-19583-200924-1-0-1-0-topic-des-pronostics-saison-2009-2010.htm"+
'\\n'+"http://www.jeuxvideo.com/forums/1-19583-201006-1-0-1-0-pronostics-special-league-des-champions.htm"+
'\\n'+":merci:";

              value_options[4] = new Array();
              value_options[4]["option"] = 'opt_video';  
              value_options[4]["intitule"] = 'Vidéo';
              value_options[4]["contenu"]  = "Topic vidéo :d) http://www.jeuxvideo.com/forums/1-19583-255070-1-0-1-0-officiel-topic-des-videos.htm"+
'\\n'+":merci:";

              value_options[5] = new Array();
              value_options[5]["option"] = 'opt_modo';  
              value_options[5]["intitule"] = 'Modo';
              value_options[5]["contenu"]  = "Pas la peine de créer un topic pour ça, tu peux nous parler sur la tribune des modérateurs. :ok:"+
'\\n'+"http://www.jeuxvideo.com/forums/1-19583-31373-1-0-1-0-la-tribune-des-moderateurs.htm"+
'\\n'+":merci:";


              value_options[6] = new Array();
              value_options[6]["option"] = 'opt_pes';  
              value_options[6]["intitule"] = 'PES';
              value_options[6]["contenu"]  = "Forum PES :d) http://www.jeuxvideo.com/forums/0-19584-0-1-0-1-0-0.htm"+
'\\n'+":merci:";

              value_options[7] = new Array();
              value_options[7]["option"] = 'opt_360';  
              value_options[7]["intitule"] = '360';
              value_options[7]["contenu"]  = "Go forum Xbox 360 :d) http://www.jeuxvideo.com/forums/0-61-0-1-0-1-0-0.htm"+
'\\n'+":merci:";


              value_options[8] = new Array();
              value_options[8]["option"] = 'opt_PS3';  
              value_options[8]["intitule"] = 'PS3';
              value_options[8]["contenu"]  = "Go forum PS3 :d) http://www.jeuxvideo.com/forums/0-60-0-1-0-1-0-0.htm"+
'\\n'+":merci:";

              value_options[9] = new Array();
              value_options[9]["option"] = 'opt_GDC';  
              value_options[9]["intitule"] = 'GDC';
              value_options[9]["contenu"]  = "Forum Guerre des Consoles :d) http://www.jeuxvideo.com/forums/0-36-0-1-0-1-0-0.htm"+
'\\n'+":merci:";

              value_options[10] = new Array();
              value_options[10]["option"] = 'opt_online';  
              value_options[10]["intitule"] = 'Online';
              value_options[10]["contenu"]  = "Va poster ça sur le topic du online :d) http://www.jeuxvideo.com/forums/1-19583-250205-1-0-1-0-le-online-tournoi-championnat-etc-etc.htm"+
'\\n'+":merci:";


              value_options[11] = new Array();
              value_options[11]["option"] = 'opt_team';  
              value_options[11]["intitule"] = 'Recrutement';
              value_options[11]["contenu"]  = "Va sur le topic de recrutement et création de teams :d) http://www.jeuxvideo.com/forums/1-19583-261122-1-0-1-0-recrutement-et-creation-de-team.htm"+
'\\n'+":merci:";

              value_options[12] = new Array();
              value_options[12]["option"] = 'opt_carriere';  
              value_options[12]["intitule"] = 'Carrière';
              value_options[12]["contenu"]  = "Raconte ta carrière sur ce topic :d) http://www.jeuxvideo.com/forums/1-19583-273831-1-0-1-0-vos-carrieres-sur-fifa-10.htm"+
'\\n'+":merci:";

              value_options[13] = new Array();
              value_options[13]["option"] = 'opt_SMS';  
              value_options[13]["intitule"] = 'SMS';
              value_options[13]["contenu"]  = "Évite le langage SMS. :ok:";

              value_options[14] = new Array();
              value_options[14]["option"] = 'opt_capslock';  
              value_options[14]["intitule"] = 'Topic en majuscule';
              value_options[14]["contenu"]  = "Pas de topic en majuscule, merci. :ok:";

              value_options[15] = new Array();
              value_options[15]["option"] = 'opt_inutile';  
              value_options[15]["intitule"] = 'Topic inutile';
              value_options[15]["contenu"]  = "Topic inutile. :non:";





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
