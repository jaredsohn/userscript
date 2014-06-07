// ==UserScript==
// @name           JvDofusReponses
// @namespace       
// @description    Ajoute des réponses types pour le forum Dofus
// @include        http://www.jeuxvideo.com/forums/3-9655*
// ==/UserScript==

              value_options = new Array(); 
              value_options[0] = new Array();
              value_options[0]["option"] = 'opt_modo';  
              value_options[0]["intitule"] = 'Modo';
              value_options[0]["contenu"]  = "Pour les plaintes et les remarques, merci de poster sur le topic de modération : http://www.jeuxvideo.com/forums/1-9655-1479219-1-0-1-0-le-temple-des-gardiens-de-l-ordre.htm";

              value_options[1] = new Array();
              value_options[1]["option"] = 'opt_achatvente';  
              value_options[1]["intitule"] = 'Achat/ Vente';
              value_options[1]["contenu"]  = "La vente de compte est strictement interdite sur les forums, ainsi que IG. Pour info :"+
'\\n'+"http://www.jeuxvideo.com/forums/1-9655-1476296-1-0-1-0-rappel-vente-echange-de-compte.htm";

              value_options[2] = new Array();
              value_options[2]["option"] = 'opt_echange';  
              value_options[2]["intitule"] = 'Echange Obj';
              value_options[2]["contenu"]  = "Pour échanger des objets, merci de passer par le topic de ta communauté.";

              value_options[3] = new Array();
              value_options[3]["option"] = 'opt_codeaudio';  
              value_options[3]["intitule"] = 'Code audio';
              value_options[3]["contenu"]  = "La vente est interdite sur le forum !";

              value_options[4] = new Array();
              value_options[4]["option"] = 'opt_HS';  
              value_options[4]["intitule"] = 'HS';
              value_options[4]["contenu"] = "HS, merci de poster sur le blabla du forum.";


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
