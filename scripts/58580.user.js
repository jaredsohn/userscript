// ==UserScript==
// @name           JvHalo3OdstReponses
// @namespace       
// @description    Ajoute des réponses types pour le forum Halo 3 : ODST
// @include        http://www.jeuxvideo.com/forums/3-19175*
// ==/UserScript==


              value_options = new Array(); 
              value_options[0] = new Array();
              value_options[0]["option"] = 'opt_partie';  
              value_options[0]["intitule"] = 'Organisation partie';
              value_options[0]["contenu"]  = "Salut,"+'\\n'+"Merci de créer un topic en suivant ces règles :"+'\\n'+"http://www.jeuxvideo.com/forums/1-19175-44900-1-0-1-0-tuto-organiser-une-partie-via-le-forum.htm"+'\\n'+"Merci. :)"+
'\\n'+":d) En cas de plainte > Topic de modération : http://www.jeuxvideo.com/forums/1-19175-49020-1-0-1-0-topic-de-moderation-v2-0.htm";

              value_options[1] = new Array();
              value_options[1]["option"] = 'opt_clan';
              value_options[1]["intitule"] = 'Recrutement Team';
              value_options[1]["contenu"]  = 'Salut,'+'\\n'+'Merci de créer un topic en utilisant une présentation telle que celles du topic des clans ou similaire :'+'\\n'+'http://www.jeuxvideo.com/forums/1-19175-7048-1-0-1-0-topic-des-clans.htm'+'\\n'+'Sinon, merci de postuler dans le topic des clans :'+'\\n'+'http://www.jeuxvideo.com/forums/1-19175-7048-1-0-1-0-topic-des-clans.htm'+'\\n'+'Merci. :)'+
'\\n'+":d) En cas de plainte > Topic de modération : http://www.jeuxvideo.com/forums/1-19175-49020-1-0-1-0-topic-de-moderation-v2-0.htm";

              value_options[2] = new Array();
              value_options[2]["option"] = 'opt_coop';
              value_options[2]["intitule"] = 'Partie coop';
              value_options[2]["contenu"]  = "Salut,"+'\\n'+"Tu auras plus de réponses dans le topic approprié pour ce genre de choses :"+'\\n'+"http://www.jeuxvideo.com/forums/1-19175-24245-1-0-1-0-gamertags-bapteme-du-feu-et-campagne.htm"+'\\n'+"Ou bien en créant un topic en suivant ces règles :"+'\\n'+"http://www.jeuxvideo.com/forums/1-19175-44900-1-0-1-0-tuto-organiser-une-partie-via-le-forum.htm"+'\\n'+"Merci. :)"+
'\\n'+":d) En cas de plainte > Topic de modération : http://www.jeuxvideo.com/forums/1-19175-49020-1-0-1-0-topic-de-moderation-v2-0.htm";

              value_options[3] = new Array();
              value_options[3]["option"] = 'opt_sms';
              value_options[3]["intitule"] = 'Avertissement SMS';
              value_options[3]["contenu"]  = "Salut,"+'\\n'+"Essaie de mieux écrire, ceci est un forum et pas un téléphone, écrire en français correct ne demande pas beaucoup de temps ou de compétences, et il existe des correcteurs"+'\\n'+"Merci. :)"+
'\\n'+":d) En cas de plainte > Topic de modération : http://www.jeuxvideo.com/forums/1-19175-49020-1-0-1-0-topic-de-moderation-v2-0.htm";

              value_options[4] = new Array();
              value_options[4]["option"] = 'opt_titre';
              value_options[4]["intitule"] = 'Titre non explicite';
              value_options[4]["contenu"]  = "Salut,"+'\\n'+"Merci de choisir un meilleur titre pour ton topic, sinon il est impossible de savoir de quoi le sujet du topic retourne sans le consulter."+'\\n'+"Un titre pareil rend obsolète la recherche par titre de topic et rend illisible le forum"+'\\n'+"Merci. :)"+
'\\n'+":d) En cas de plainte > Topic de modération : http://www.jeuxvideo.com/forums/1-19175-49020-1-0-1-0-topic-de-moderation-v2-0.htm";



              value_options[5] = new Array();
              value_options[5]["option"] = 'opt_gamertags';
              value_options[5]["intitule"] = 'Recherche gamertags';
              value_options[5]["contenu"]  = "Salut,"+'\\n'+"Tu trouveras des gamertags dans ce topic :"+'\\n'+"http://www.jeuxvideo.com/forums/1-19175-7007-1-0-1-0-vos-gamertags.htm"+'\\n'+"Ou bien tu peux attirer des joueurs en créant un topic selon ces règles :"+'\\n'+"http://www.jeuxvideo.com/forums/1-19175-44900-1-0-1-0-tuto-organiser-une-partie-via-le-forum.htm"+'\\n'+"Merci. :)"+
'\\n'+":d) En cas de plainte > Topic de modération : http://www.jeuxvideo.com/forums/1-19175-49020-1-0-1-0-topic-de-moderation-v2-0.htm";


              value_options[6] = new Array();
              value_options[6]["option"] = 'opt_majuscules';
              value_options[6]["intitule"] = 'Titre en majuscules';
              value_options[6]["contenu"]  = "Salut,"+'\\n'+"Les topics dont le titre est en majuscule ne sont pas tolérés."+'\\n'+"Merci. :)"+
'\\n'+":d) En cas de plainte > Topic de modération : http://www.jeuxvideo.com/forums/1-19175-49020-1-0-1-0-topic-de-moderation-v2-0.htm";


              value_options[7] = new Array();
              value_options[7]["option"] = 'opt_inutile';
              value_options[7]["intitule"] = 'Topic inutile';
              value_options[7]["contenu"]  = "Salut,"+'\\n'+"Ce topic est sans intérêt."+'\\n'+"Merci et au revoir. :)"+
'\\n'+":d) En cas de plainte > Topic de modération : http://www.jeuxvideo.com/forums/1-19175-49020-1-0-1-0-topic-de-moderation-v2-0.htm";


              value_options[8] = new Array();
              value_options[8]["option"] = 'opt_mauvaisforum';
              value_options[8]["intitule"] = 'Mauvais forum';
              value_options[8]["contenu"]  = "Salut,"+'\\n'+"Tu as posté ton topic dans le mauvais forum, merci de poster ton topic dans le forum approprié :"+'\\n'+"http://www.jeuxvideo.com/forums.htm"+'\\n'+"Ou encore ici : "+'\\n'+"http://www.jeuxvideo.com/listeforums-a.html"+'\\n'+"Merci. :)"+
'\\n'+":d) En cas de plainte > Topic de modération : http://www.jeuxvideo.com/forums/1-19175-49020-1-0-1-0-topic-de-moderation-v2-0.htm";


              value_options[9] = new Array();
              value_options[9]["option"] = 'opt_video';
              value_options[9]["intitule"] = 'Vidéos';
              value_options[9]["contenu"]  = "Salut,"+'\\n'+"Merci de poster dans le topic des vidéos :"+'\\n'+"http://www.jeuxvideo.com/forums/1-19175-33587-1-0-1-0-officiel-les-video-d-odst.htm"+'\\n'+"Merci. :)"+
'\\n'+":d) En cas de plainte > Topic de modération : http://www.jeuxvideo.com/forums/1-19175-49020-1-0-1-0-topic-de-moderation-v2-0.htm";


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