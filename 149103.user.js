// ==UserScript==
// @name           ReponsesModMCPE
// @namespace      
// @description    Ajoute des réponses types pour le forum Minecraft Pocket Edition
// @include        http://www.jeuxvideo.com/forums/3-27056*
// ==/UserScript==

var value_options = new Array(); 
value_options[0] = new Array();
value_options[0]["option"] = 'opt_help';  
value_options[0]["intitule"] = 'Help';
value_options[0]["contenu"]  = "Merci de poser ta question sur la F.A.Q qui est épinglée, la voici : http://www.jeuxvideo.com/forums/1-27056-132181-1-0-1-0-f-a-q-la-mine-aux-questions.htm . :pf: ";	


value_options[1] = new Array();
value_options[1]["option"] = 'opt_regles';  
value_options[1]["intitule"] = 'Règles';
value_options[1]["contenu"]  = "Je tiens à vous rappeler cette règle : http://www.jeuxvideo.com/forums/1-27056-39510-1-0-1-0-regles-du-forum.htm#message_140897 ! :-))) ";


value_options[2] = new Array();
value_options[2]["option"] = 'opt_jailbreak';  
value_options[2]["intitule"] = 'Jailbreak';
value_options[2]["contenu"]  = "Il est interdit de parler de Jailbreak sur les forums de JV.Com.";

value_options[3] = new Array();
value_options[3]["option"] = 'opt_màj';  
value_options[3]["intitule"] = 'Màj';
value_options[3]["contenu"]  = "Il y'a déjà des topics pour parler des prochaines mises à jour comme ceux-ci : http://www.jeuxvideo.com/forums/1-27056-67432-1-0-1-0-nouveau-developpeur-pour-mpe-tweeter.htm ; http://www.jeuxvideo.com/forums/1-27056-71475-1-0-1-0-officiel-les-futures-maj.htm :-))) ";

value_options[4] = new Array();
value_options[4]["option"] = 'opt_serveur';
value_options[4]["intitule"] = 'Serveurs';
value_options[4]["contenu"]  = "Il est interdit de créer des topics pour des ouvertures temporaires de serveur ou pour dire que l'on en recherche, c'est considéré comme du flood.";


value_options[5] = new Array();
value_options[5]["option"] = 'opt_presentation';
value_options[5]["intitule"] = 'Présentation';
value_options[5]["contenu"]  = "Merci de revoir ta présentation ou ton titre, il faut les soigner si tu ne veux pas qu'on lock ton topic. :oui:";
							 

value_options[6] = new Array();
value_options[6]["option"] = 'opt_jeu';
value_options[6]["intitule"] = 'Jeux';
value_options[6]["contenu"]  = "Désolé mais il y'a pour l'instant assez de jeu, qui plus est hors-sujet, sur ce forum.";										 

							 
value_options[7] = new Array();
value_options[7]["option"] = 'opt_texturepack';
value_options[7]["intitule"] = 'Doublon Carl Johnson';
value_options[7]["contenu"]  = "Tu cherche à en installer un, tu ne sais pas lequel choisir, tu veux en montrer un ? Ce topic est fait pour toi : http://www.jeuxvideo.com/forums/1-27056-98889-1-0-1-0-contribution-centralisation-de-t-p.htm";

value_options[8] = new Array();
value_options[8]["option"] = 'opt_seed';
value_options[8]["intitule"] = 'Seed';
value_options[8]["contenu"]  = "Salut, tu cherche un seed en particulier ou tu en as un à nous montrer ? Au lieu de faire un topic, vas sur ces topics réservés à ces causes : http://www.jeuxvideo.com/forums/1-27056-46553-1-0-1-0-seeds-minecraft-pe.htm ; http://www.jeuxvideo.com/forums/1-27056-1207-1-0-1-0-officiel-vos-seed.htm ! :noel:";

value_options[9] = new Array();
value_options[9]["option"] = 'opt_trompe';
value_options[9]["intitule"] = 'Trompé';
value_options[9]["contenu"]  = "Salut, Tu t'es trompé de forum, le forum Minecraft Pocket Edition est fait pour la version mobile, je pense que tu cherchais ce forum : http://www.jeuxvideo.com/forums/0-24777-0-1-0-1-0-minecraft.htm Bonne journée !";

value_options[10] = new Array();
value_options[10]["option"] = 'opt_flood';
value_options[10]["intitule"] = 'Flood';
value_options[10]["contenu"]  = "Ne viens pas te plaindre du kick après. :pf:";

value_options[11] = new Array();
value_options[11]["option"] = 'opt_pub';
value_options[11]["intitule"] = 'Pub';
value_options[11]["contenu"]  = "Merci d'aller poster sur le topic de publicité que voilà : http://www.jeuxvideo.com/forums/1-27056-1582-1-0-1-0-topic-de-publicite.htm :-p";

value_options[12] = new Array();
value_options[12]["option"] = 'opt_hs';
value_options[12]["intitule"] = 'Hors-Sujet';
value_options[12]["contenu"]  = "Ce forum ne tolère pas ce genre de H-S, merci de lire la charte (http://www.jeuxvideo.com/forums_charte.htm) et les règles de ce forum (http://www.jeuxvideo.com/forums/1-27056-39510-1-0-1-0-regles-du-forum.htm) !";
							   
var liste;

function insertMessage() { 
	if (liste.selectedIndex > 0){
		document.getElementById('newmessage').value = value_options[liste.selectedIndex-1]["contenu"];
	}
	else {
		document.getElementById('newmessage').value = "";
	}
}

/* Creation of the select with auto-answer */										 
function create_select() {
	  var eltPost = document.getElementById('post').getElementsByTagName('p')[0].getElementsByTagName('textarea')[0];      
	  liste = document.createElement('select');  
	  liste.id = "choix_reponse";

	  var options = "<option selected></option>";
	  for (var i=0 ; i < value_options.length; i++) {       
		   options += "<option id='"+value_options[i]['option']+"' value='"+value_options[i]['option']+"' >"+value_options[i]['intitule']+"</option>";
	  }
	  liste.innerHTML = options;
	  document.getElementById('post').getElementsByTagName('p')[0].insertBefore(liste,eltPost);
}

/* If we are on form post, we add the select and the listener */
if (document.getElementById('post')) {
	create_select();
	document.getElementById('choix_reponse').addEventListener('change', insertMessage, false);
}