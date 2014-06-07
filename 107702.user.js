// ==UserScript==
// @name            The West - Duel Page - PT-BR
// @namespace       http://userscripts.org/scripts/review/107702
// @description     Script for The-West: Duel Page [SOM - Scripts-O-Maniacs]- Ajoute l'xp dans la page de duel et les saloons-
// @icon            http://img854.imageshack.us/img854/4797/iconcwalter.jpg
// @license         GNU Lesser General Public License (LGPL)
// @copyright       2011, Zyphir Randrott
// @author          Dun [SOM - Scripts-O-Maniacs]
// @release         CWalter
// @website         http://scripts-o-maniacs.leforum.eu
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/review/107702.meta.js*
// @include         http://userscripts.org/scripts/review/107702*
// @version         1.0.7
//
// @history         1.0.7 Alliance+Town popup moved on the town link instead on the avatar image (in order to keep the dueller bonus enabled).
// @history         1.0.7 Display fix for some language servers.
// @history         1.0.6 Added Alliance-Name on the player avatar popup.
// @history         1.0.6 Display fix for some language servers since TW 1.32.
// @history         1.0.5.1 Added Portuguese translations.
// @history         1.0.5 Added English translations.
// @history         1.0.4 Minor fix in town names.
// @history         1.0.3 Added Town-Name popup on player avatar.
// @history         1.0.2 Script moved to another account since Dun has stopped to play The-West. Thanks again for all his work !
// @history         1.0.1 Création
// ==/UserScript==


var duel_version = "1.0.7";

var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {
    
    var insertBeforeElement = document.getElementById('left_top');
    
    var newScriptElement = document.createElement('script');
    newScriptElement.setAttribute('type', 'text/javascript');
    var myScript = "var duel_version = '"+duel_version+"';";
    newScriptElement.innerHTML = myScript;
    insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);

(function(f) {
    var d=document,s=d.createElement('script');
    s.setAttribute('type','application/javascript');
    s.textContent = '('+f.toString()+')()';
    (d.body||d.head||d.documentElement).appendChild(s);
    s.parentNode.removeChild(s)
})( function() {


	/////////////////////////////////////////////////////////
	// DÉCLARATION DES CONSTANTES
	/////////////////////////////////////////////////////////
	//MISE À JOUR
	var VERSION_SCRIPT 		= duel_version ;
	var NUMERO_SCRIPT		= "107702" ;
	var NB_HISTORY			= 5 ;
	var MENU_maj			= "ZYPH_" + NUMERO_SCRIPT + "_MAJ" ;
	var DELTA_maj 			= 24 * 3600 ; // 24 h en s

var dp_lang = {
	XP: 'XP',
	YOURDUELLVL: 'Seu nível de duelo',
	REFRESHDUELLVL: 'Atualizar o nível de duelo',
};
var dp_langs = {};
dp_langs.fr = {
	XP: 'XP',
	YOURDUELLVL: 'Votre niveau de duel',
	REFRESHDUELLVL: 'Rafraîchir le niveau de duel',
};
var dp_langname = location.host.match(/(\D+)\d+\./);
if(dp_langname && dp_langs[dp_langname[1]]) dp_lang = dp_langs[dp_langname[1]];

	
    var level_duel = 0;
     
    var filler;
    function isNull(variable) {
        return (typeof(variable) === "undefined" || variable === null) ? true : false;
    }

    function refreshPage(element) {

		var detail ="", posBRfin="";
        var textNode = element.target;

        if(isNull(textNode)) {
            // Premiere page
            detail = element.innerHTML;

        } else {

            // Pages suivantes
            detail =textNode.innerHTML;

			}
        if(detail.indexOf('- '+dp_lang.XP)>0){
              posBRfin = detail.indexOf('- '+dp_lang.XP);
        }else{
              posBRfin = detail.lastIndexOf('<br>');
            
        }
        var motivation = $("duel_motivation_bar_num").innerHTML;
       
        motivation =  ( 0 + motivation.substring(0, (motivation.length - 1) ) ) / 100;
        
        var reg = new RegExp(":\\s*(\\d+)\\s*<")

        var result = reg.exec(detail);
     
         if(!isNull(result)) {
       
            var exp=result[1];

            var xpreel = ((7 * exp.trim()) - (5 * level_duel)) + 4;
            xpreel=xpreel.toFixed(0);

            var xp = xpreel * motivation;

            var cible;
            if(!isNull(textNode)) {
 
                textNode.innerHTML =  (detail.substring(0, posBRfin) +   "<br><b>"+dp_lang.XP+": " + xpreel + " (" + xp.toFixed(0)  + "</b>)").replace(/<br>([^<]{10})[^<]{4,}:/, "<br>$1... :");
				var dp_player_img_element = textNode.parentNode.previousSibling.firstChild.firstChild;
				var dp_player_town_element = textNode.parentNode.firstChild;

            } else {
               
                element.innerHTML = (detail.substring(0, posBRfin) + "<br><b>"+dp_lang.XP+": "+ xpreel + " (" + xp.toFixed(0)  + ")</b></div>").replace(/<br>([^<]{10})[^<]{4,}:/, "<br>$1... :");
				var dp_player_img_element = element.previousSibling.firstChild.firstChild;
				var dp_player_town_element = element.firstChild;
            }

			var dp_player_id = dp_player_img_element.id.substring(11, dp_player_img_element.id.length);
			if(dp_player_id) (new Ajax('game.php?window=profile&char_id='+dp_player_id, {
			  method:'post',
			  data:{},
			  onComplete:function(data) {
				var dp_player_town = new RegExp("profile_link_town_overview[^>]+>([^<]+)");
				dp_player_town = data.match(dp_player_town);
				var dp_player_ally = new RegExp("Alliance.show[^>]+>([^<]+)");
				dp_player_ally = data.match(dp_player_ally);
				if(element && dp_player_town){
				  //alert(dp_player_town_element.childNodes[4].innerHTML);
				  dp_player_town_element.childNodes[4].title="";
				  dp_player_town_element.childNodes[4].addMousePopup(new MousePopup('<nobr><img src="images/chat/channelpic-town.png"> <b>&nbsp;'+unescape(dp_player_town[1].replace(/\\/g,"%"))+'<b></nobr>'+(dp_player_ally?'<br><nobr><img src="images/chat/channelpic-alliance.png"> <b>'+unescape(dp_player_ally[1].replace(/\\/g,"%"))+'<b></nobr>':'')));
				}
			  }
			}).request());


            return true;
        }
        return false;

    }

    /**
     * Recherche un element avec une classe spécifié dans un element parent
     *
     */
    function getElementByClassName( element, id ) {

        var result = null;
        if ( element.getAttribute('class') == id )
            return element;

        for ( var indR = 0; indR < element.childNodes.length; indR++ ) {

            if ( element.childNodes[indR].nodeType == 1 ) {
                result = getElementByClassName( element.childNodes[indR], id );
                if ( result != null ) {
                    break;
                }

            }
        }

        return result;
    }

    function setXPForSaloon() {

        var divSaloon = $('tab_saloon');
        var motivation = getElementByClassName(divSaloon, 'bar_perc').innerHTML;

        motivation =  ( 0 + motivation.substring(0, (motivation.length - 1) ) ) / 100;
          
        var trJoueur = getElementByClassName(divSaloon, "saloon_duel_table").getElementsByTagName( "tr" );

        for( i = 1; i < trJoueur.length; i++ ) {
            var exp = trJoueur[ i ].childNodes[5].innerHTML;

            if( exp.length <= 5 ) {
                var xp = (0 + exp) * motivation;
                trJoueur[ i ].childNodes[5].innerHTML += " (" + xp.toFixed(0)  + ")";
            }
        }
    }

    

    function initLevelDuel() {

        level_duel = getLevelDuel();
        $('lvlduel').innerHTML=dp_lang.YOURDUELLVL+" : " + level_duel ;
        
    }

    function parsePage() {
        var element = $('op_duel_list').getElementsByTagName( "tr" );
         
        for(var i = 0; i < element.length; i++ ) {
//alert(element[ i ].childNodes[1].previousSibling.firstChild.firstChild.src)
            refreshPage(element[ i ].childNodes[1]);
            element[ i ].childNodes[1].addEventListener ("DOMNodeInserted", refreshPage, false);
        }
    }

    function setXPForDuelPage() {

        var lvlDuel= document.createElement("span");
        var tblOp = $('op_duel_list');
        var trJoueur = tblOp.getElementsByTagName( "tr" );

        lvlDuel.innerHTML = "<br><span style='cursor: pointer;' id='lvlduel'>"+dp_lang.YOURDUELLVL+" : " + level_duel +"</span>";
        parsePage();
        $('duel_op_picture').appendChild(lvlDuel);

        lvlDuel.addMousePopup(new MousePopup("<B>"+dp_lang.REFRESHDUELLVL+"</B>"));
       lvlDuel.addEventListener('click', function() {
                     initLevelDuel();
                     parsePage();
        }, false);
        return true;
    }

    function findDuelLevel(data) {

        var carObject =  JSON.parse(data);
        //var html='<div id="char_avatar"> <div class="char_frame" style=\'overflow:visible\'> <div class=\'char_background\'></div> <img src=\'/images/transparent.png\' class="reward_opener" /> <table class="char_reward_show_slots" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="char_reward_drop expose_0"></td><td class="char_reward_drop expose_1"></td><td class="char_reward_drop expose_2"></td><td class="char_reward_drop expose_3"></td> </tr> </tbody> </table> <div class="char_reward_box"><div class="char_reward_box_background"></div> <div class="switch_prev ie0height" onmouseout="this.removeClass(\'glow_left\')" onmouseover="this.addClass(\'glow_left\')"></div> <div class="switch_next ie0height" onmouseout="this.removeClass(\'glow_right\')" onmouseover="this.addClass(\'glow_right\')"></div> <table class="char_reward_slots" cellspacing="0" cellpadding="0"> <tbody> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> </tbody> </table> </div> </div> <div id="char_avatar_img" style="display: inline-block;"> <img src="images/avatars/iroquois.jpg" alt="Avatar" class="char_avatar_picture" /> </div> </div> <div id="char_info"> <table> <tr> <th>Niveau</th> <td id="level">87</td> </tr> <tr> <th>Points d\'exp?rience</th> <td id="experience">314 / 7754</td> </tr> <tr> <th>Points de vie</th> <td id="health">2840 / 2840</td> </tr> <tr> <th>Repos</th> <td id="energy">30 / 100</td> </tr> <tr> <th>Vitesse</th> <td id="speed">6 mph (146%)</td> </tr> <tr> <th>Niveau de duel</th> <td>144</td> </tr> <tr> <th>Duels gagn?s</th> <td>359</td> </tr> <tr> <th>Duels perdus</th> <td>251</td> </tr> </table> </div> <div class="class_choose_icon_layer" id="character_window_choose_class_layer"> <a href="#" onclick="AjaxWindow.show(\'class_choose\');"><img id="character_choose_image" src="images/class_choose/characters_grey.png" alt="" /></a> </div> <br style="clear:both;" /> <br /> <h2>Classe de personnage: Soldat</h2> <br /> <div id="char_class_advantages"> <strong>Avantages:</strong><br /> <table cellspacing=\'0\' cellpadding=\'0\'> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_health_raise" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Pour chaque point d\'aptitude que tu attribues au points de vie, tu re?ois 10 points de vie en plus.</td></tr> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_item_wear_level" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Le niveau requis pour l\'usage d\'armes diminue de 6 niveaux. </td></tr> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_duel_tactic" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Pour un duel tu re?ois un bonus de 100% pour l\'aptitude "Tactique".</td></tr> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_fb_lead" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Au cours des batailles de forts, tu augmentes ton aptitude au commandement et celle de tes quatre voisins ? hauteur de 50% de tes propres capacit?s de commandement.</td></tr> </table> </div> <img src="images/class_choose/symbol_soldier.png" id="char_class_symbol">';
      
        var tdChar = document.createElement("div");
        tdChar.innerHTML= carObject.page;
        tdChar=tdChar.getElementsByTagName("td");
 
        for(var ij = 0; ij < tdChar.length; ij++ ) {
            if(tdChar[ ij ].id == "speed") {
                level_duel = tdChar[ ij + 1 ];
                level_duel=level_duel.innerHTML.trim();
                  
                break;
            }
        }
         
        return level_duel;
    }

    function getLevelDuel() {

        filler=  new Ajax('game.php?window=character',   {
            async:'false',
            method:'post',
            data:{},
            onComplete: function(data) {

                level_duel =  findDuelLevel(data);
            }
        }).request();
        
        return level_duel;
    }

    // injection sur ouverture de la fenêtre de duel

    function initDuel() {

        AjaxWindow.setJSHTML_Saloon = AjaxWindow.setJSHTML;
        AjaxWindow.setJSHTML = function(div,content) {
            AjaxWindow.setJSHTML_Saloon(div,content);
            if(div && div.id && div.id.search(/saloon/) != -1) {

                setTimeout(setXPForSaloon, 100);

            }
        }
        AjaxWindow.setJSHTML_Duel = AjaxWindow.setJSHTML;
        AjaxWindow.setJSHTML = function(div,content) {
            AjaxWindow.setJSHTML_Duel(div,content);
            if(div && div.id && div.id.search(/duel/) != -1) {
            //   getLevelDuel();
              // attente pour la récupération du level duel 
                setTimeout(setXPForDuelPage, 1000);
            }
        }
        return true;
    }

    getLevelDuel();
    initDuel();


///////////* SOM Manager by Zyphir */////////////


 ///////////* end SOM Manager */////////////


 
 	function maj_a_verifier()
	{
		//
		// Gestion de la màj toute les 24 h
		//

		var heure_dernier_maj = 0 ;
		//Lit le contenu de la variable
		var donnee = localStorage.getItem(MENU_maj) ;
		if (donnee != null)
		{
			heure_dernier_maj = donnee ;
		}

		//Récupération de l'heure actuelle (en s depuis 1970)
		var heure_actuelle = new Date().getTime() / 1000 ;
				
		//Calcul le delta entre la dernière vérif et maintenant
		var delta = heure_actuelle - heure_dernier_maj ;
		if (delta < DELTA_maj) 
		{
			return false ; //Pas de màj à vérifier
//			return true ; //Force la màj
		}
		else
		{
			return true ;
		}
	}

	//Fonction de traitement du retour du source de l'iframe
	function trait_ret_iframe(contenu_iframe)
	{
	  if (contenu_iframe.origin != "http://userscripts.org") return; //Sort si le retour n'est pas le contenu d'un script
	  var version_recuperee = unescape(contenu_iframe.data);
	  try{
		if (version_recuperee.match(/^\d+/) == NUMERO_SCRIPT) //vérifie si le message commence par le bon numéro de script 
		{
			var script_version = version_recuperee.match(/\/\/ @version+\s*(.*)/)[1]; //Récupération du contenu après @version
			if (script_version != VERSION_SCRIPT) //Ne fais rien si la version est identique
			{
				var script_nom = version_recuperee.match(/\/\/ @name+\s*(.*)/)[1]; //Récupération du contenu après @name
				var script_auteur = version_recuperee.match(/\/\/ @release+\s*(.*)/)[1]; //Récupération du contenu après @release 
				//
				//Travaille sur les variables @history
				//
				var tab_history = version_recuperee.match(/\/\/ @history+\s*(.*)/g); //Récupération du tableau des lignes

				//Initialisation des variables
				var version_history_precedente	= "" ;
				var nb_version_history_trouvee	= 0 ;
				var contenu_fenetre_history		= "<DIV STYLE='text-align:center;font-weight:bold'>"+script_nom+"<span style='font-size:9px'> "+VERSION_SCRIPT+"</span><span style='font-size:11px'>";
				contenu_fenetre_history	+= eval(TheWestApi.displayOutdated.toString().match(/(currentVersionMsg *= *)([^;]+)/)[2].replace("this.version", "\"<span style='color:rgb(34,34,136)'>"+script_version+"</span></span>\""));
				contenu_fenetre_history	+= "</DIV><DIV ID='script_history' STYLE='border:1px #DABF83 inset;overflow:auto;height: 250px;margin-top:3px;'><TABLE>";

				function make_script_history(his){
				  //Boucle qui parcourt les @history
				  for (var i=his; i<tab_history.length ; i++)
				  {
					  ligne	= tab_history[i].match(/\/\/ @history+\s*(.*)/)[1];
					  version_history_avec_espace	= ligne.match(/^[a-zA-Z0-9\.\-\|\/]*\s/)[0] ; //contient les n° de version
					  version_history_full = version_history_avec_espace.replace(/(^\s*)|(\s*$)/g,""); //suppression des espaces
					  version_history = version_history_full.split("|")[0];
					  version_history_date = version_history_full.split("|")[1] || "";
  
					  //Sort si le nb maximum d'historique est atteint
					  if (nb_version_history_trouvee >= NB_HISTORY && version_history != version_history_precedente) return i ;
					  if (i==(tab_history.length-1) && $("script_history_next")) $("script_history_next").style.display="none";
  
					  //Teste si la version a changé
					  if (version_history != version_history_precedente)
					  {
					  if (i>0) contenu_fenetre_history += "</UL></TD></TR>";
						  contenu_fenetre_history += "<TR><TD width='500px' style='border: solid 1px #666666;background: url(../images/profile/settings_profile_input_bg.png);font-size:12px;vertical-align:top;'><B>" + version_history + "</B> <span style='float:right;font-size:10px;font-style:italic'>"+version_history_date+"</span><BR><UL style='margin-bottom:4px;'>" ;
						  nb_version_history_trouvee++ ;
						  version_history_precedente = version_history ;
					  }
					  version_history_full=version_history_full.replace("|","\\|");
					  var reg = new RegExp(version_history_full + "+\s*(.*)");
					  texte_history = ligne.match(reg)[1];
					  contenu_fenetre_history += "<LI>" + texte_history + "</LI>" ;
					  
					  if (i==tab_history.length-1) contenu_fenetre_history += "</UL></TD></TR>";
				  }
				}
				var script_history_next = make_script_history(0)||0;
			  
				function make_script_history_next(){
					contenu_fenetre_history='';
					nb_version_history_trouvee = 0;
					script_history_next=make_script_history(script_history_next);
					$("script_history").firstChild.firstChild.innerHTML += contenu_fenetre_history;
				}
				window.make_script_history_next = make_script_history_next;

				contenu_fenetre_history += "</TABLE>";
				
				if(script_history_next>0 && script_history_next<tab_history.length)contenu_fenetre_history += "<div id='script_history_next' style='text-align:center;font-size:10px;margin-top:-3px'><a href='javascript:window.make_script_history_next();'>[+"+NB_HISTORY+"]</a></div>";

				contenu_fenetre_history += "</DIV>";
				
				contenu_fenetre_history	+= "<DIV style='float:left;font-size:10px;margin-top:2px;margin-left:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.website *\?.+(?=['"]['"]\)*,'*\)* *"*\)*<\/div)/)[0].replace(" | ", "").replace(/api.website/g, "\"http://userscripts.org/scripts/show/"+NUMERO_SCRIPT+"\\\"\"+\"\\\" target='_blank'\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<DIV style='float:right;font-size:10px;margin-top:2px;margin-right:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.author *\?.+(?=['"]['"]\)*,\(* *api.website *\?)/)[0].replace(" | ", "").replace(/api.author/g, "\""+script_auteur+"\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<BR><DIV STYLE='margin-bottom:-10px;text-align:center;font-weight:bold'>Install ?</DIV>";

				showMessage(contenu_fenetre_history, "Script Updater by [<a href='http://scripts-o-maniacs.leforum.eu' target='_blank'>SOM</a>]", 400, undefined, [["ok", function () {try{(typeof(safari) != "undefined" && safari)?window.open("http://userscripts.org/scripts/show/" + NUMERO_SCRIPT):location.href = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".user.js";}catch(e){}}], ["cancel"]]);			
			}
			//Stocke l'heure de la dernière vérif
			var heure_actuelle = new Date().getTime() / 1000 ;
			localStorage.setItem(MENU_maj,heure_actuelle) ;
		}
	  }catch(e){
				//Réessaye 2h plus tard en cas d'erreur (timeout uso)
				var heure_actuelle = ((new Date().getTime() / 1000)-79200) ;
				localStorage.setItem(MENU_maj,heure_actuelle) ;
				}
	}

	if (maj_a_verifier())
	{
		//Test safari
		var navigateur = navigator.userAgent.toLowerCase();
		//Initialisation de la variable
		var scr_script = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".meta.js";

		//Vu que pour chrome, il y a "safari", je teste avant la présence de chrome
		var chrome = navigateur.indexOf("chrome") + 1 ;
		if (!chrome)
		{
			safari = navigateur.indexOf("safari") + 1 ;
			if (safari)
			{
				var scr_script = "http://userscripts.org/scripts/review/" + NUMERO_SCRIPT;
			}
		}

		//
		//IFRAME
		//

		//Écriture dans une iframe le contenu de la source de l'en-tête du script
		var source_script=document.createElement('iframe');

		source_script.setAttribute('id', 'maj_' + NUMERO_SCRIPT);
		source_script.setAttribute('style', 'display:none;');
		//source_script.setAttribute('style', 'display:inline; position:absolute; width:500px; height:600px;');
		source_script.src = scr_script ;

		document.body.appendChild(source_script);
		// Fin de la génération de l'iframe

		// fix for iframe bad content loading
		var f=document.getElementsByTagName("iframe");
		for(var i=0;i<f.length;i++){
			if(f[i].src.substring(0,31)=="http://www.jeux-alternatifs.com") continue;
			if(f[i].src.substr(f[i].src.length-1)=="#") f[i].src=f[i].src.substr(0,f[i].src.length-1);
			else f[i].src=f[i].src+"#";
		} 

		//Ajout d'un évènement pour récupérer le contenu de l'iframe
		window.addEventListener('message', trait_ret_iframe, true);
	}
 
    })
} // end if (url.indexOf(".the-west.") != -1)
else	//Cas du script exécuté dans l'iframe pour la mise à jour
{
	//Création d'une fonction globale pour tout le script
	(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

	/////////////////////////////////////////////////////////
	// DÉCLARATION DES CONSTANTES
	/////////////////////////////////////////////////////////
	var NUMERO_SCRIPT	= "107702" ;

	//Envoi des informations à la fenêtre principale
	function envoi_info(){
		var destination = window.parent;
		message = String(escape(document.body.textContent));

		//Indiquer le n° du script pour identifier la communication
		if(destination.postMessage) {
			destination.postMessage(NUMERO_SCRIPT + message, '*');
		}
	}
	envoi_info();
	})
}