// ==UserScript==
// @author  Krysaphir
// @name  Travian Multi-Tools
// @version  1.1.0.0
// @namespace Travian Multi-Tools
// @include  http://ts*.travian.*
// @exclude  http://analytics.travian*.*/*
// @exclude  http://*.travian*.*/hilfe.php*
// @exclude  http://*.travian*.*/logout.php*
// @exclude  http://*.travian*.*/index.php*
// @exclude  http://*.travian*.*/anleitung.php*
// @exclude  http://*.travian*.*/impressum.php*
// @exclude  http://*.travian*.*/anmelden.php*
// @exclude  http://*.travian*.*/gutscheine.php*
// @exclude  http://*.travian*.*/spielregeln.php*
// @exclude  http://*.travian*.*/links.php*
// @exclude  http://*.travian*.*/geschichte.php*
// @exclude  http://*.travian*.*/tutorial.php*
// @exclude  http://*.travian*.*/manual.php*
// @exclude  http://*.travian*.*/manual.php*
// @exclude  http://*.travian*.*/ajax.php*
// @exclude  http://*.travian*.*/ad/*
// @exclude  http://*.travian*.*/chat/*
// @exclude  http://forum.travian*.*
// @exclude  http://board.travian*.*
// @exclude  http://shop.travian*.*
// @exclude  http://*.travian*.*/activate.php*
// @exclude  http://*.travian*.*/support.php*
// @exclude  http://help.travian*.*
// @exclude  *.css
// @exclude  *.js
// ==/UserScript==

// ***************************************************
// *** Début de déclaration des variables globales ***
// ***************************************************

// Tableaux de textes pour support multilingue :
var langue_batiments = [];		// Noms des bâtiments
var langue_ressources = [];		// Noms des ressources
var langue_textes = [];			// Différents textes affichés
var langue_taches = [];			// Différents textes affichés
var langue_troupes = [];		// Nons des diférentes troupes

// Tableaux contenant les renseignements sur les bâtiments :
var cout_batiments = [];		// Cout en ressource des bâtiments
var temps_batiments = [];		// Temps de construction des bâtiments
var max_batiments = [];			// Niveau maximum des bâtiments
 
 // Tableau contenant diverses variables
var var_divers = [];

// Tableau contenant les images
var var_images = [];

// Tableau contenant les couleurs
var couleur = [];

// Récupère l'ID du monde du serveur
var_divers['world_id'] = get_world_id();

// Récupère l'id utilisateur
var_divers['user_id'] = get_user_id();

// Initialisation de la variable de log
// 0 - pas de log; 2 - log minimum; 3 - log complète
if(get_option("afficher_log",false,"integer",'TMT'))
	var_divers['afficher_log'] = get_option("afficher_log",false,"integer",'TMT');
else
	var_divers['afficher_log'] = 0; 
add_log(3,"\n****************************\n* Script Travian Multi-tools\n****************************\n");

// Détection de la langue du serveur :
var langue_serveur = detect_langue();

// Test le sens d'écriture
if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction") === 'rtl')
		var isR2L = true; // is Right 2 Left => Ecritures arabes de droite à gauche.

// *************************************************
// *** Fin de déclaration des variables globales ***
// *************************************************





// ********************************************
// *** Début du corps du script Multi-tools ***
// ********************************************

// Vérifie si on est connecté
var deconnecte = get_connexion();

// Arrête le script si on est pas connecté
if(deconnecte) {
		add_log(1, "Vous n'êtes pas connecté, arrêt du script Travian Multi-Tools.");
	}
else {

	// Chargement du fichier langue
	get_language(langue_serveur);

	// Chargement des tableaux des niveau maximums des bâtiments
	get_max_batiments();

	// Chargement des tableaux des coûts en ressources des bâtiments
	get_couts_batiments();

	// Chargement des tableaux des temps de construction des bâtiments
	// plus utile pour le moment
	// get_temps_batiments();
	
	// Div les plus importantes
	var div_content		=	$id('content') ;   		// La div content contient la page centrale
	var div_wrapper		=	$id('wrapper') ;   		// La div contient la page complete
	var div_villageName	=	$id('villageName') ; 	// Nom du village actif (haut gauche)
	var div_villages	=	$id('villageList');  	// Liste des villages (milieu droite)
	var div_infobuild	=	$id('contract');  		// Encart indiquant les ressources sur page de construction
	var div_sideInfo	=	$id('side_info');  		// La div de la partie de droite
	var ul_res			=	$id('res');     		// Ul des ressources en haut de la page
	
	// Récupération des information utilisateur
	var_divers['page_php']	=	get_page_php();		// Récupère le nom de la page php en cours
	var_divers['page_nom']	=	get_page_nom();		// Récupère le nom de la page en cours
	var_divers['allianz']	=	get_allianz();		// Récupère le nom de l'alliance si le joueur en a une
	
	// Lance l'initialisation des options si necessaire
	if(var_divers['page_php'] == "spieler" && location.search.indexOf("uid=" + var_divers['user_id'])!=-1) {
		initialise_options();
		}
	
	// Récupération des information sockées dans OPTION
	var_divers['user_name']				=	existe(get_option("USER_NAME", false, "string",'TMT'));		// Nom du joueur
	var_divers['race']					= 	existe(get_option("RACE",false,"integer",'TMT'));			// Peuple (0 - romain, 1 - germain, 3 - gaulois)
	var_divers['capital_X'] 			=	existe(get_option("CAPITAL_X",false,"string",'TMT')); 		// Coordonnée X de la capitale
	var_divers['capital_Y'] 			=	existe(get_option("CAPITAL_Y",false,"string",'TMT'));		// Coordonnée Y de la capitale
	var_divers['replace_titre_page'] 	=	get_option("replace_titre_page",0,"string",'TMT');			//
	var_divers['replace_logo'] 			=	get_option("replace_logo",0,"string",'TMT');				//
	var_divers['insert_build_page'] 	=	get_option("insert_build_page",0,"string",'TMT');			//
	var_divers['replace_player'] 		=	get_option("replace_player",0,"string",'TMT');				//
	var_divers['replace_allianz']	 	=	get_option("replace_allianz",0,"string",'TMT');				//
	var_divers['replace_village']	 	=	get_option("replace_village",0,"string",'TMT');				//
	var_divers['defense_village']	 	=	get_option("defense_village",0,"string",'TMT');				//
	var_divers['merchant_village']	 	=	get_option("merchant_village",0,"string",'TMT');			//
	var_divers['add_resource'] 			=	get_option("add_resource",0,"string",'TMT');				//
	var_divers['position_resource'] 	=	get_option("position_resource",0,"string",'TMT');			//
	
	
	// Récupération des informations dans la page
	if(var_divers['allianz'])
		var_divers['nbr_messages_allianz']	=	get_nbr_messages_allianz();		// Récupère le nombre de message non lu sur le forum.
	var_divers['ressources'] 				=	get_ressources();				// Récupère le nombre de ressources et la limite des stock {Bois, Argile, Fer, Céréales, Dépot, Silo}
	var_divers['production'] 				=	get_production();				// Récupère la production horaire {Bois, Argile, Fer, Céréales}
	var_divers['warehouse'] 				=	var_divers['ressources'][4];	// Taille du dépot
	var_divers['granary'] 					=	var_divers['ressources'][5];	// Taille du silo
	var tmp0 								=	get_village_actif().split(";,;,");
	var_divers['village_actif_nom'] 		=	tmp0[0];						// Récupère le nom du village actif
	var_divers['village_actif_newdid']		=	tmp0[3];						// Récupère le newdid du village actif
	var_divers['village_actif_pos'] 		=	new Array(tmp0[1],tmp0[2]);		// Récupère la position du village actif {x,y}
	var_divers['capital'] 					=	test_capitale();				// Vérifie si le village en cours est la capitale
	var_divers['village_liste'] 			=	village_liste();				// Récupère la liste des villages
	
	// Les couleurs
	couleur['bg_titre'] = "#CCCCFF";
	couleur['bg_texte'] = "#EEEEFF";
	
	// Définition des images 
	var_images['alliance_blason']		= 	"data:image/png;base64,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";
	//var_images['boutton_fermer_off']	= 	"data:image/gif;base64,R0lGODlhFAAUANUAAP///+/u7vvuwvrtwfviwv7JsfTDrO/AqvS3pP+tnL28zfirnbW2xfClmqqxxPeblPaajfOUjfeUhKCmtu2Nie6KhO6HhJSbr+iFgOiCfuZ7e+Z6d95yc9xvctZrcdVobdNma8xmZrZNZ7RLVmYzM1grJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAUABQAAAbMQMZlRCwaj6OLYjJKFAiCgXQ6JRQSIybk8TB4v2AvF0KURB4LxGHNXiMWj0iEWKFQIKVSY8/PQyIUFUQYGBYWAAAldnYliBWPGEQZkxmIiYQYlpiRIxoalJYlGY0AlBkaRBueq6GIq6tEHKqvlgCvsCOyt6S2t6gjHR0bw7wbiCXDGxwcRMHBvMscx9HMIx4eHSSW1JYkwR5E19eIzs7k4uEgIOLs7R/vRCEh6+316iBEIvP3/P3qIiMcjBBBsKDBgwAdBBCIpCERhUEAADs%3D";
	// var_images['boutton_fermer_off']	= 	"data:image/gif;base64,R0lGODlhBwAYAKECAMnJydkPD////////yH5BAEKAAIALAAAAAAHABgAAAIgTISmsmrIXnLxuDOh3rz7D4YdAEDkKaAnabLIWqprWwAAOw%3D%3D";
	var_images['boutton_fermer_off']	= 	"data:image/png;base64,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%3D%3D";
	var_images['boutton_fermer_on']		= 	"data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAP//////vP//vf//wP//wv//xf//yf//1P//2///5v/6uP/2pv/3r//ymf/0pf/ynv/tlv/tmv/mg//dWf/mif/njf/nkP/pmP/bZv/bbv/dcf/ec//eeP/eev/po//ef//fg//RXP/PXf/RYf/UZP/Vbf/COf/CPP/FRf/JUv/OXP/PZP/RZf+4Lv/CSP/CSf/FTP/HVf/JWf/Qbf/RcP+zJ/+4Nf+4Nv+4Pf+8SP/HYP+uLP+vLP+0M/+0Of+zOv+4Pv+9TP+cDP+cDf+eEP+eEv+hFv+lGv+lIP+nJ/+rK/+sMf+rM/+5UP/CZv+VAP+VBf+WBf+YCf+YD/+nLv+sPf+LAP+NAv+PBP+QBv+YFf+EAP+HAP+JAv+LBf+ZJf+nQv+sTv+AAP+CAP+DAP+DCf+JFv+NGv+QIP+cNv+jSJVlNv96AP97AP9/DHNKJf9zAP93APp1AMBZAP94BFg1GGI+H/9wAP9xAP9mAP9hAP9iAPlhAO1dAPJaAN9QAN1MANlJANVIANFFANBGAK46AKs6AKY3AMlBAMA9AKcuAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIwALAAAAAAUABQAAAj/ABmxgXOnoMGDB+GwEWhHAYKHECNGJGBnYIICDjJq3MjxCcEBF0KKHEnygpiCCyqoXMlSpYaVawo2AEEThBU6LWraXJSGZpiCDDgIvXGI0JwSQw8N4mOCg5qCEDJIdVFIT5kxFHoYEhSHxAEOVQpiGEF2xAk8Xa54ARQozg4DE0aAKWhBhV27OMakxRNHhIAOdtEUDKGjsOEtcq5gKfKghuEzBT3kmDyZiqI9XbRkkfKD8puCG3yI9jEEkSA5L6JAIeOGh2gzBWksmf3FdBwnH4C0STuGyZI6BVkkGe4nEZ4YEoQkOSKnCwwQSeQUXIGkOhI5KCKksF6kifbrBWUYLhk/fkYQ8uOVnDeS5w4cG1OIyJ9Pnz6XPgrt5NHDv79//39UJBBBCBVYkEKMBAQAOw%3D%3D";
	var_images['vide']					= 	"data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAUUAAIALAAAAAABAAEAAAICVAEAOw%3D%3D";
	var_images['hero_enchere']			= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMAUExURQAAAMKzacKzacKzacKzaQkICL6uaMKzaSIZFiooIFlTOaGVXREREAcHBiEgGUdCMgcGBScmIBMTEAkJCAMDAgYGBQMDA0VFQyEgGVZUSDEuIDg2LYZ+XwkJCHZlMAMCAhcWEy0sJ8KzacKzad7Xt8Kzab+yb1JNNMKzacKzaVxXQc3NyM7NydvWxdra1I0DAi0pHc20aO/myaGXbvPnxdTTztDPynd3dOrfv/3z0IyFc+bbu/vuzPjryf/41fXpx8GvZc/Oyf/yz8GoGKSPMaueYt3c19PSzZqXitHQy6upovbqyG9tZlBPSu/n0ce8ndbV0NnY08C+tv/z0OXau/vvzNfMr9jW0e/jw9LRzMm/pI+OhtjX0fjsyrGxrdbQvrmwl/3xzqeilGRkYGAvKS0sKTw4J729uAICAp6WgXJtYA8PDmNaOWBdVJyakhsaFFNQRtvZ1FlLDyIhID4+PDQzMfLmxcbGwNXUz/TovM7NyDErFOzblcKzac3Mx/HlxICAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///+I1SaIAAAABdFJOUwBA5thmAAAAkElEQVR42nTOrw3CcBTE8c8jSGxXYAXKHnVNkFgGqO4ITEDq2IMOgKoiYYEKJMkP0X8gOHX55u7eC8fMoP4M1rJ2f0PYGYk85dCMJKja/U2k7jmQ1TgiDuYWSKECzUSCFpRfmfy3FdS/y8l8YhykN/38ug8/p3nnnU/+n6JafPMYWpdtB8W1KGuI02YJ1fAZAIqEITAkPqAgAAAAAElFTkSuQmCC";
	var_images['hero_mort'] 			= 	"data:image/png;base64,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%3D";
	var_images['hero_quete']			= 	"data:image/png;base64,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%3D";
	var_images['hero_background']		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACICAMAAADDCLm2AAABgFBMVEUAAADCs2nCs2nCs2nCs2kJCAi+rmjCs2kiGRYqKCBZUzmhlV0RERAHBwYhIBlHQjIHBgUnJiATExAJCQgDAwIGBgUDAwNFRUMhIBlWVEgxLiA4Ni2Gfl8JCQh2ZTADAgIXFhMtLCfCs2nCs2ne17fCs2m/sm9STTTCs2nCs2lcV0HNzcjOzcnb1sXa2tSNAwItKR3NtGjv5smhl27z58XU087Qz8p3d3Tq37/989CMhXPm27v77sz468n/+NX16cfBr2XPzsn/8s/BqBikjzGrnmLd3NfT0s2al4rR0MurqaL26shvbWZQT0rv59HHvJ3W1dDZ2NPAvrb/89Dl2rv778zXzK/Y1tHv48PS0czJv6SPjobY19H47Mqxsa3W0L65sJf98c6nopRkZGBgLyktLCk8OCe9vbgCAgKeloFybWAPDw5jWjlgXVScmpIbGhRTUEbb2dRZSw8iISA+Pjw0MzHy5sXGxsDV1M/06LzOzcgxKxTs25XCs2nNzMfx5cQzfcqlAAAAK3RSTlMAAQIDBAn9C/6J2PxE0Of+u18w5mGmiP7BG9n9/fv+Hfz9BQYLDwgJBwj8dBmqKQAAFFRJREFUeNrNXItX2ui2l5eWKggihDeIZZTKcuq9aJiIgEyF8sgCBgiPCIfHjeFheDQJcHQk//r9kkBrz0zntAqte7Wzxum0/rq//fztvVlbe6Iodg16vX5r7cXJG00PbTOptt79woBJX+v6E5qAU5RG8bKQbdnQAXPcb/ejrd2XhUyDRp1OkqJYPGWWvShkqhbTIttQtG+D1Y6XhQxt93GIwVv9vu1lIdPQONomj23MEa56WS6gZacsjfcZFIYMLyxs6HtwlGr3J3hb/9KQtdEai8J4e/tG/6KeU+u8um/3nG2N/j68qXo5PnCgb9/cqpw1VClTGG7C/+t8MdFW2du8V//yukYp+S9e3dK08oUAs4TDapPCmIB1b4AYe+EKtPsCjE2htdmv7rUKkxad0EbapHCbP578uW34+dCUt/f2V1pQB7224RObalfrdqtv37/b1ph+Lq595ceTW53W8cb9WqlqQ6zpjXLX7Ta3b0/eG7U/Fdlr9ftN5xvHmnbyZk3qdioVIGIoFG7lzclmz/kT/UBh2HaCpxRMijf+NwssDuXH/7Ov3xh+oo2FP7Z1Bo1GYzSq92iC7oF/1Rh2dg5+Mb46OQlvKw9+klcOtt+BlNTvk+QEH/xBw2QfhykUJWijUdm2v9+0vzP+eGg7Wo2O7idqk2J2enp2Fj+junVmOs0cZ4vZo0mthsMQ1Ovd3hp3figsh0FDt1t1tjkqn81ms6PZzDutsedsIub1Hh0deb3lWDaaYCELBBE/svbYMuhYPDFoBbvM1DubS7nGlFg8dnQ0E6AezYqstU7XalBP/4O0pjDpey3y9NpLsliLnl3OgR1lPlgqA/ITUG+2z2AD4o9ihuxDP6RB3tKzMFks898aqlia0wWSuyiENG2T+JH45eVxjUEIaHI6u4sXyx8IvXbNseJ3RPHLUZn/3qcJokTB0bs5sCxMnGO9flRENo3BTJNCxf8T/CUmOKpXrVBxO3qIzBbPRCwjlApW2vBx8exydjeNpnqVRqTT68ezmdNMtsYy2IXzQ3b+uEfeYhR2rgyaQt+mmf7i+aa1Xr1Q6PQYnJxMZwmUwBolrgH36BSe6KO09SJwYWGydwurG+FUilavpv5wmFtMs26rnYqvV2SoHMc1sC5D0wwxaJ0XShw3LmAIZKFZ5F8RHxeot5FjUWnxEUx0LAmSXUEdrth9TUZre/kWe30KFHEZTdFciOO4au6ikm7WsQj/BZCLSCNwXmoIXwWQNpydXl6WsyQKIT08EztK6bRLf0k4E/eOUpTfydRi16MyTFcCIpbxRTVQuBhznyXkm/9KDulBzQlZS7Fd/7vWaHZ0NkrsKX9ZqkuaSd6Y4+Qelu/SNEqxQ6zA/VcZ5zAcgtBuE/ut3pvEeXvLTFLqJVaUW+ysOOMtJsN0chEM6bbqhSr3LXLRCJ37LwKhJDZoZgSTO4viKu2SsoLC1LoU49KsiHZz4LtFIt+GixefT3jbBspkxbx1NIVtb/+e+5BIpNLv0hg0is+d/xpCItyTpIrZ8Dm02ITF1H9BJpHJ5If7+3KpTCr5VmB7k7nGQI6k09WnIeManTZ8PY3Hy8Upg5f+o1WWSuWHno0N94bnO1jBXcvkU24cwVB1/ERk4wLyDm2SZO0D060MKWj38xNK5C6Ayu32yL/nLbWWSWYBLEYO0gHuqTL+zY+wgwGB1ltQbRRj5qlKKt8H2to4lEnWPr+idH//v4F0qElvPDYvwMossP9nSKhRwjA/KOpm01n5jg8eEqnLxduWqDwxovMZzLV26HH9IzC3CmVYtnYNslE8O4OYcYh7loyTyUB98Af/Vx3h+jWp7LG5S6SOXY3OaNYfrEld+/J9+T95gtJJpEvQgJxen5IITfmS3LMl16WiwhNkWl+0fNIDAMv8+uRk3ah070tcGy7XP5idlgKNUN1H9RiUpdkP1dDzgXEFBhENtxy3fM6hii29ymxdPwHATq7MRpNEKtnwgADyFWAmthyNJhjkt3qn08R8kfESgHENCj8VC5ApqRagSQ62lGqzNRxeX38Asrl9o1a61+Ryj1sulQLP/RtgqlrGCxIdnc5FCo2Gj1uK5Lqt7NzXs7jOseY2Kc339quPj8T6/l5pWpNJXe4NufSxy34yMjzjBVH7uAU8MlSpV5eDrNBkY95FE8MYleZXt5vrD+GPf36Wjw9XvBvIZJINt0vyV2gOSNC6N4MPC+OQv9UpLAWZ75yoxefAkHb7Hrxi+GGBbHPT+UqAdmLWy9Ykcsmh2/NXlelrYhyL9SFQfV3kh76l2BkX6cLRuZ0RHyzbgm09PABkm3anda60m4d1XmvABvkXlX0Jbqsl/v6jaR8KAGQVqrocZNUKQQLvPCuSaCpYb28ukFmdn58TIDtRK/dBLJHINjxfBrZf1HOdz7LwW1BfBKhlGRqXs9LkaDRpsfVANcjY1sMiMjv/jnariAz8tyvguQCSVOZxfRE8dtn4vO/JMEiDq9apxpKAceNgF1TFRDdfAP1Nr20VgAmv+eqVdbO3KegMRI+eiUcGlHb4RQFixLMLumKAJblGt7k0ZJyvUUEQrBGqWgdEqtm7Es1sIdZNUWc3C5LQc/jI0BQmJjZX2SjFBMbjEpX3ccuTai6X5EDfnMhmo5BVQPbrr38KP/989efH+5sHnsbnzUwoPB67gAGOimZWnPSAtsZ+yr9MZELlkR/0o97ZtDkQdfbrrwIwYG78YwLejaenNyT/iczIsuQoNrsb1QgKeCaXXJ4DfEpTH4gyCORHp5RVfM1ff7XbXzlPBDML397y9du+R8JX4Y88YNdGbTtTtUwc7lFC91jodCNLRhZBmAzfGMT/2H6sM9E1bzf5HkZy6Fnb+KLUNTCVEtca2FjiXScivGIS2172czYAMiEVRNHbx3Y21xkokSTyDanc7X7kAA4dlvOFcv463imJwLhxCMJCy0UWaIrIZpm+bXPhm2JKvwmvG3kCRL6xdgiQfbYyw9tgIRAK5HKRRpLzi5E/QjUDy0V2UWEnAmHpLfJKm2MCcn9z82DXg1gmAfbvcR8+SgGGVrU53IaslWrSB/4xb8q6jeUi83FsvygqrUmHH25EAen95CG8aeRHfXyZ8WVu2qUZFK/hTHvoq8O/zSNQnVq2CzRgaiQWHfF3wD3DIIbxdUd48/berJnTCy7XF+l8p41Hp+XpFG8jSD2wKPiQZSOrVmhS7LGz1E1YTOxXVgBLuSP5SnOiZYp3AjeCMta53Rcwy/mSPYAvvKFrwdKuYScoHq/st/dqo3bnH1omJZoVKzucHYosWdL/th5YNjAudP4OnopkdNv+9l5t1prc+x65zCV3yWWyvwOoh8Vsftofpqx87+urDps5bvnSqPTwKEjQmcuBWrnlkgECAXAb4AcgOFyyv3ZOB8b+ItAwaTQEokaja10FMPAH11k4cZZpsm09UNW+a9/j8QDqxbN/eCgHnfFfGgAdKWbz49b2eFji61nmf0IrQcblsOGAIHotWrPgD3gO7WstsIkQexvvKdEKUSXBL1ejMo4rVYP5TqcSROZUn0wuP9zY2P8KV6Wl74TaLJNo1zmgM1CcYStSGTf+dxMOBKuBStsBtCUTaKH9A5dix+HYcghMkeSLtagzHtn1hIaC9WFgXE0PA+MVIfP5h9ZhPRf0O3ckBy6TybSztas1qFQanc4ISCE5oKseV40oSBrT0z6xfe4bgmzZ6OANblUSQNKYtYvU94xKpdFsVN+b7+9v7a+tV+ubKi3P+XkOHy25taLZGNgka14EEWtuDJClL1aGLGKtN6gBytq2t+12++ZV+OpESFLh9ZNNo3tNduh6ZHQqKIGjQFkN3wUMmhPuAsn7VgUsibXGDDSJ1px2kNTv59IT+vZ1O+g45Rty1wLalm0IpjVJ8IBjruv3hcalbmlVZgbeo9Nhi/G7a+b24eH+9z9/B/L+/X34RGCFzDvA1DZci5C7C0UiyUIOdOTjktWfzFexbnKFyKxEIgOmkAKyuTjvxfQeNoPFBZnnE33g0FmIPUs3Xa1yJTjQoZF0q7A6B0jbGDD8u5tCt+G50t7/bjsRKg9QEJm1HqnUw3NVEnEBFe/DDL2NBUoIBqWhIbI61xyXBjjPApd5nYVFZO/nKuPrNTB1lMk23HNomn40m82SrDPPdawdENKw5MqQ+Uo0P4o/mwwAsrmhvV88KtCcClTdMonbLbJoKqEIzpC9VqBDYdVqYWWeCXTmE0pu72Rgf3g4Wejsd0F41Z2ot/jMvrEhFXV2yveBo1bvvDvkxtxKJdKFwDjqjHT+VWf3vLXdCts7cpHgU8JC41BO2OpDqrFaYGBS5sSjZ7E/nNYFMj5oPIQXprbOs8xSyb6bD7iG1rFIAgFk1tyKkXG5Tg+elCdO+8lnnS1wgb7ADvbTea7K45GDgCbyQKe1XmW7GeBWDq1OEWC3afNzPOv1PiGzm7VC2SaV88i2BsJKzWnCmV9d+fOoG8jl8nmqDVi0wTwH/P5JaVcW7YFIbe9vuAB3ZksIg6EUe9E9X7EDgOFivoJhQWwAwPTuH9s+b2W3/GKdnM+bgs7e6BKn/JR10Ckg/hUjGzcQJz2ghx0xup7Mu+G5bKpA4lzb56d2EuABigMVz7ePwEJGCV/1U0ZgJz+NTfFs7f1ncQoa2zTzMzMJX9ZKpEIxZEyUZ9l+r57LI74Vx4y0M5E9i8eiEO8A9vd2Xj7aP97ztcb6a6WC57ZB/HcdyoWyW5sCg7BBPRfCuhcrNjIGPgZR/fLSAnr0wSOlhR/W1+2aHRnPbUvWZO4NkRHdYhMwC1pfX37FyEJ5OsE36bHazRVfy16FwRgxLBS1729fq3dF1n0N5E2PAMyhodlhM5hrFLgVe0C1PpjwO2PFD69efxzcO2029b3aqTYbdUa9UaN3zHtQl9vjEkKHgy0lg4Vmt1MPdbCVGhoY9Ey8Ahek39o5OFAowA/FmsIBfj7a55CCXQmxqlWoKr91LANi0H43bEZWicyXp2uAp7o7tfzT8pf080hsy8wyONjSqKFtS2mlSmsM4RHPn3zzYqsCFI+XXu901Gp3VldslPjnZGaZ2fF3HCLtiiPEGGmjcqtExuWGbK1Iqt2/SHgbF0ZzMp5x4TeX/pZ4NM3poCLDrIw4KJWE8ozoTXAjCAuHcpdLur8xl8OvLWscGGGB3M22aN+KkPnAWKwBSJPQEGXcC+F5PUCh7Utlkq+unEGZOwHZ3op6zYsS1rQiaa4KeEfdHNbhvkvYgvjHLa8DlcA7ZtG3K7EzwC8hNAOjNJ0O5m1aAMoll3zj2pmBAUrzznpIcBXICh2Ebo1A65iiO03d9y3ZmtrNU7BVRFD+FVS1gTQM8lIcjCiifcJp+s4dWyN0XATb7PVubumWlsxTYBVtKg7qYNX3roqanJMaAWN5pIOVljt09ZW66SCFCvz5ZZz47mVuhZ6wtQmW2d7r1NNL7aAKSLMQ6YrTkGzqCdc9mratVZtNEiib7qaXpzVfJI0UfJEOISxZX5q/f8dcsatjo6debyybgs6XNt8fN/ydLpY/92NClTGCn3IQpXCI1MvZHYEhS5o6jbnOcIgg1lY6aAFZJlbTPW33fYsGRwmADWHPm0hkvIw0BepRoLAgQr/rNNnyNEs98YYMLLiPeI1bch0keZ4vJZcQYeuRUANBSZweWiCy/+RzAYWejMVnNJIrdDrpehd7th80Os1qtQLNptlJC8ybdE9fLN9hizOoG/RjGFYNpqlnF7hAZ4XAsJ/lryxae85nXDEoDBTarXZomqWZrr+D5J5na1XM6rvAxJWDyyjzrENFDV0JwjaEnNQQiO4gndBzoCVLSLoaqBNer7ADrnneWYzegg7waPkyljnu02Dg/2RT81WrGADGjfPCXH+UePaxzJY6cXzEixdsL21/eGLDMg7k6/UmFvwtEsltp6Kz6wS4xX7uScWuujZfw8/W2p3IExVWR+r+HIj/lDWNEXi0pt5ZwunTjnmxiD9qDZ+kMzC66vgihQ5NUC2IZurDlHM5x0VbDClqLU7S3z+1SF4Af4SwQmnYQ07BCGTSGn5oL+vTB7Q0eS2uwDLf+5w+XyV9Xm2cI/6usxYFO82gjm2120u76NxVN4txoWPhN6ULkci3slchf73J76M3m512TdwCGZF7qiVeg5s06CTGd8adRgTkd6SS+6b2IJTv5IPBQh7D/r0ndrB3I9xsWu7dn5KdTC8nNNZA6B4D0V3/txhcqJ7udK3N81wu3RO6/vIU1piWfZBo2COjOHQBgZEHuM9kmOQnrY3HX213wZ5IqwWxSKliqwEHz0yoVXxgicEJs/VOj+TvsqZn7HwkddFoVC8KkeTn0BVozKd7F35mgJez2Qyo2CtD9vQsWyNW81EIW23ET+OjxYVRE5ySVhsYMoSgYRcTDyOruVIaWLw/B7JYiGMG4FAQJMnTa5zoslS2v6qr1y0VpXaS81O2LP4KS1aBKtAU3EfAploJ+Gsj3bIwEIqi1krO1+j2alPxbPioWEMRiNWv7IhZ4XDsquHJtXA4EGW6QaxHzbLZIjjc90KEPxRI96hEPJPJAFYAqZaccHR+E343LfadTs3aSsVhcFK1a1AtTPtsDoxNhRN+r/cszgwLJaIV5U85QDRNEG/HID+KqSN71id0etXKP3Zmx6CjyFEmPmMxJnH96bRtMqjX2+T8xuRo6kUpZEAWZ3eZEQkTOoNj7Qd8eooCvCnanETRCkOdHS2gZWEKHLZeLs68yxkKoXrN6GUfdWq0P+wzXRQOg4pGmQZCeM8+KS1BgJFIbPHlETjiz0GD1J5ml/+Ukh/4qQxrW7o95F2LnIkfYnEJ+lJLiQB84N3ZWTmTHcVqcA8Z6nZ/xsct7Rj0u3qjGYWbicnk7joKDzEmVr4uTyY1PJVibSq95qd9VCH/RibHrkGjVrOvUV2aUkPsa4tarVPptVtLV9b/A5u5Z7h4OM8GAAAAAElFTkSuQmCC";
	var_images['marche']				= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANVJREFUeNqkU8ERAyEIRMcarCH/1JBPrshLE5eirgnjOuAgYnIz2cedyrIgYLrdH+Rh2574FXyO4x1ogURrNOd9f7V1zjk4ASggg7op2lgj0nmek2IV6Y6SWZArVIcpCs54GeDMZ0NGUat7Ea0Na72PX2rQ0vWENaItyhVobqQ/EVmxoKK2G15k5nRulAOp9g+RFghtFi7aWEzrets4M1IBJm5iY5HBsbNgMHCxT3ZQLEA2tnBpDqQWIGMivdF2H5MuIt/figwZJM+ZX+CyE1Woi3wEGADIKW2OODNEYQAAAABJRU5ErkJggg%3D%3D";
	var_images['peuple_gaulois']		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANISURBVHjatJRdTJNXGMd/h2LTJVPq0hELRIhV7GvoYhfmR5p1JoIKM6IX08S5C5PNhXDhvoipmRqWiNFGDCZ+xLiYDLZkerHZGGh81bBkGCZOcGzpgpENAfnoQqUKKR/17OK1J1RgwMWeq/P8n+f83n+ec84rpJT8HyFma6iu0aU9I1PlvY972P9BoUhPT5cDAwNiXuCNbyyVN397JKprdLl+cwEA5yoOJvX03fme+uaOGcGp04mlHjsuW4pcv7lAAVe96WE4GjE+4vfhfzeD+uaO+Y+iukaXrU23FHC4oWpKzz9ZW7h05ti0jJSZwK1Nt8hevoqBwCGGG6qoPF0GwPZd76i1rTvI3jLf3E9/b5lPlpe4ZXmJWzZ+94kc77woy0vccrzzoixY7ZQFq52yo8mveuY8Y1t3ULk7ciIIBKm/+gXBr79FP7EVgL9e1AEWpAhZ+cM9caA4Xx6vuytmBFeeLuNO4++s8eShnzRaJl7UJlY66eqN0NvRA8D4n7+SY1vAgeJ8aXp1+L8dA6zx5Bmg5c4ZRxao/Vmtl2Wa6Bya5Vac3fOWBPjo6MdUldcq/TP/Hr4sPa/yovxXGHkWp+tpnM6hKJWXQ2LW63Z85wYJsNYZV1rLAxMr7WMq73pq1F6GTgueDBx5Fk+qXWkzHsi6nEVKa/o7yiU9JOb0QA7u1GRvJFmzL4YK/+cA7PvwpHFwzyeovflAzPsnlJg1wKb3i+iPRFXtfl0j4cEYAEfq2sScXx5A3o5lZHmtRJYIMl4z43bYcDtsNNy7TXgwhsNqxmE1U1HskrM6DlwolADCFEfGTWiahVAoRlv7EJ++t41TVwK4ctOINgzy8MkYDqsZkxC0R0Zxb1/Ctn26mOI4cKFQer12vF47b3uyaGs3LqamWXDlpgHgyk2j5ce+JDPtkVF2+3Lweu3KWMpkqKZZAAiHI4TDyaenaRZu3P8JTbPgsJqV24dPxtjty1H7EnAFbu42EQrFpgBbWkdoaR1R8F/OPU6CakXpXL7ar/oT+1MBDh3eIgGu3R1VgFAoxorshWwqzJyyCVDQl+MbfRwwkZqA9vcZrhLw2OjzJOi1r/4AYG1pBltfX6z063oPK7IXToIa8e8AEYpirDFn620AAAAASUVORK5CYII%3D";
	var_images['peuple_germain']		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQBSURBVHjatJVbTJtlGMd/Hz3RFkqh0EKhlHIsDGYdJpIsJAO3ublMGKJCdBpcNFPm9IbNRGO4MXFxNyNbdOoYUycYt7mBMk2GeAimjgzMxG3AwuSQtoHS0IIcStrPC6TIYLG78Ln53uf7/vl9z+F9n1cQRZH/w4RwhV2X9ogAdrucvZWz+OfH8PlzySv5fF1GRLhQu10OwNNPxvHpORXD7jQMeg0jP+asm7L0v6C+7iYRoKBiyf/oy8sUFfmRChLmFgS8fhtlxdNi46mX0GXXC/cV8b/txYqdZCU/jnTawtdtHuIUdswpcfT91ourt1oMO+L1LFIUyMreAEBrJzQ0fyHU7XOIi5P3UeONdV1seX+etnPnV/mDA38AMDu/pBvyFDPuLw2/xh1PzANd2MdW+wnZj4Tgn7xXI6THXcK01SOEDU7cWr60aGoCwPBwCUFhKdEf+kYAeK7utHj31r0n+GB1vnitZ4zAzDQ79h8G4MSVqwB8+8ERAHJT2ninQR7+Admcow1196nKTGrKD3D64nFqyg8AcPricbTKOUqLnFTVBlf2e/+UsC747VdKxY6OHpLNBhbmpnGPz9JyIoILnelUlAxxoTMdgIqSIQCqaoPE61VMzwRZ+KeLy3Dp3dB4vQoJc6iUK1VaBi0/j56cZXfJG6SaG0nQaZiY9AFyAijZDGJX/9RSFw5W54sdHT2kmjWolFISdBoAHtiUQVVtkOHxlayOnpylrPQtPjx/KvRuWR+viwKgenuqKGk88rz4TXs3ADFaBQGURKkkqFUKIgigT0rgsxYPf47N8cu1RZ4te5VR1x1+st/AYknmQZsNl8sZ0huTNNy6NYHEnBCodzp9AGRmJBClkqCN1WO1WhlzeXjIls/rO7bATS+WQCLW3DwMSXr27X6UDLMJk9FIQCrD5XKyd9dOrg/eRiYHiXTRXw+QatagVimw2QqZ8voo3pCFVK2mIFlPojkNncXEyKSC7xtbkAXmMOflEKWQsxi3kUR1gIBUhkGj5vrgbdQqBZI92zPrnU4fMVoFapWCbYU2ckxG4o1yooVIlEkZ6KKURMVqycw3YjRo6W2189e8l7TcbNR+N1pLHoaYKUxGK7FqNTeHhtbOCofDTbxRji46i3ijnFRNZOibRCbHXJDLrncP4fr9Dq3NXxEMBADQRWcBkGpR3XsIuR1+RI83JAY4drYd35QPIS4GfWYm2+oPMXn1Bj3f/UxwdIBjZ9sRPV4AbLbCFfDIsI+JSR8dvd04HG4GJsbW/DA6uHJZaI1GrC9X0t/5K97RwVW6Fw6fESIamvuEwk0pITjA5MwiDoc7FAHAa888RsPlLkSPl+DoAAAytZKyN/dz5eO2NUH8PQCMfHe74fgBYAAAAABJRU5ErkJggg%3D%3D";
	var_images['peuple_natar']			= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAT9SURBVHjatJRrUJRVGMd/7y7LLstlLyAXgUVZlSyKFMFRNEKs9ZLW1DTGNEpOmdOHZtQabaopZyxrNB0nx9SxRp001Gq8TDJ5SUSEDEVARKLhLrgI7K7LLnt7efftw47LkN9qOp/OnMvvec7z/z9HkGWZ/2NE3Di+Vr7T9oAC0z0BwLyy6j8BW37ZIEfGeFBMfEoBQHXPRBmg/fv5/xr6x0+fyFp9gNMXfEQE7C7ypsVy/S8X1T0T5VUfHRf+eSE/P182m83Y7XYcDge1tbWPnDmzZ62ck6PiYm0QSWtEEdFmLzLmaFBrNCQZg48AS0pK5KMHC3m5wM/Q0BAGg4HCwkK5sLBQ7urqmvjw7HSzDp/Ph0OZSP/SnUIEgCRJ6FOyud95Y1yGP/7wPHUXWnl9dSUAbrebgYEBRFEkNTUVi8XSB9Da2ipExniorHQhMxwS77ZTXxHfYsNgyKW5OQoAs9nMl1vMHPvOyonzHbz/1nLSjaNU1d0F4Juy3+jp6cFkMuF2uwEYHR1FjIpHUMaRfHaDrMjWPShKcbmF+KgbaLVacnNz5eWzR1j1ZhWVjVZOHlnKwhcjqG91cKXpPk5FMgUFBQD09fUBkJWVJTvuh2xrLdws9C/dKSiAywBerxdzSiSSJLFxRz1Op5Ojh4tQx6o4cEig+d4oAI2Njej1eoqLi5EkCbvdjiiKeCIMTJky1hOKh5PsxYcFk8nNhlezEEWRNUtMaKLN+F0iw8PDdHd3hy91d3ej1+tRq9UolUp2vfsEYiycMe0VAHY8DYq00nLSSsvJz8+XAYY8UahUKg5dsHJy/0HkSHhhhioMHRwcpLOzk4qKClQqFTqdDrVGQ32LhqOLksMpRwBYLBbZYDAgiiIFMzJINS4AwOGJ5vjuGhatnE5OTg6nTp3C5/ORlJTEmmLImZVBS4vAXUUmAVdI2NubLDLnzoXslpuby7ypPezbd4XNO5dRXR/yf4LWxi2rj0vH2rjVHFrbvykPY5JAS4tAVV3IRXHA3v3nUavVjMsYwOkcptY6gUBAZNn8RKYt3g7Ajg9LCQKvFXhJWvYkzb3RJNi9lH58AoBtn60HQBkbjzziwOfzjYm3ZOaDcKSXSuuI0vmpPLIRgPe2HuZh7Zt7owHC0O27PiUh3cD2fZeQXDb8fn+YI8iyTNO1dXJ5WRM//+5ihasf5cJYLBYLvQNB2q0BPB7PIx9OMHES8QYl3x65xlTJS4M3iO1uO+np6dTU1AiKUNeIvLFxEQCvPDMH6aKLlZuvMDz0J88VPMasx5PCwAStlzhTCifPXmfP16cxRSnxBIN4bVa0Wu14H2/bYydGlxkqui4uvPnFiSH6e26SPXfsiYGETNo72vHb7zM5by4As/s7AIiPj8dms42By8rKhM+31nHoQKhV5yZPCIN2l/tQxUSQagxZVBml5derg0zOm4tzxMW9q5eZo48JlUcTR2Rv1xh4bbJOfkdyMHTPxldNXaTnzaRkZACAhoYG/MMBUpKTw8GUflfodZ3tLE/Us9ouMWXesxRlpqJJTCMjI0NWnF6xRDbGxXGzq5sPtrRR7wkAEB0dHQaNWIPoteMFVGpU+FsamaOPIW1GHgAdZ0+RkDUVSROLQmvQsX7921yrb2Lb1CT6+/u55IMFUyaFIc5BISyc0x9qApvNjlohsE6KQRsXy+Tq89wZdpOgUnLCGOTvAQA8pgmhM85vOQAAAABJRU5ErkJggg%3D%3D";
	var_images['peuple_romain']			= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMNSURBVHjatJRtaFNXGMd/5ya5NzXORpuknR806KA67D5UYTImg9JtolH8ulFBzLQoxIJ0Y6JVVAqDbQwpFrrOIa6oINvY7F5824cFyspGmdwoFZmkvve9Smpymtx79uGauKyFRjcPHDjnOc/zP/9znv/zQInj3petqv/oPlWqv1aqY9+t2zyXEYsaampMU7GooQ5/6Fb/C+NY1FD1dRKAjXWSoWEXs4GLUkA3vC1J3vYV2c0rOUJBi5aPcuKpgWNRo8Bq//uuaeeHPrZoOyZnxHDPxri+TnLxF4NPjyjCS1cTmFeB0ATfnv2essBKoIdnAj79NQTmQ3PDniL7G8tr+OJCnJFEpwqs2CZKTt5IolO1NB3BZ/g5sHUvyz/4kTd/GAQorMdHh55NFSfONHGw2eb4z63c2P0yv65MAxTWMnWHvyZfejrgfz9PVoXp6HEYd/QMIqvC7HtvF71fHfhvlQcQDFVy/JtegqHKWX1nTF5fQ1gNj0tMxors618PA+HC3rifBODc+hdVcL5BbVdSzAj8eY1fAVyKJymf54dapoHkv6PxNYf1+f443sFyBm6mC/HbzQkh8gz/uDyBFjGwuyUPHk5weZHO3f4pNh8qY/SujT7+KtuWFb+ssx+6T/zOgtU23qRgLJ0h4vc7lZe/RYsYmIkUQ+MWHuEC3UYfzhJYNodAtWTL2r2cPHWxCDi9oJdN6zT2NwmqQgJpw6pX5mJ3S9xaxHBqP5FickASWmwU8mrey/HZTxnaO5yve/ed+iLgY+d6ARi+8YiqkI9ok6KrLUVNZC5uM5EqODZ+otPVBg0xRVfbE7XtbFS0d7ROS/KmdRrp9BNh5WPMRApR2+xVa665mBxw2qLvMWPzt0m++1NHAVbOCRwd0bhyFZYsdJGxQPeAt8ymIpRD121adniJV1usuebCvdNTjkmKvrfyAnEOAGwbslnIpIUzMwJwGp7ugTk+m0BlFo+ucP2j+cWrLdzt2QdQPbPIZQYepQVTUiAzgimpcf2OxZKF8EK5RUUwh9uj0KZ3VP4eADsjLF5UA687AAAAAElFTkSuQmCC";
	var_images['player_background']		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAAAzCAMAAAANUwJdAAAABGdBTUEAALGPC/xhBQAAAYBQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAwMCAwQEBQQDBwcHCAcFCwoHDg0IDg4PEBALFBMOFhUQGRgRHBsTIiAVISIjKCUZLSobMi8eNjIfODg5OzgmSUQsR0dIVlZXV1dXV1dXc2xGdXV2d3Zx//3R//zQ//rN//nN//jL/vXJ/fTI/PLH+O7E+O7E+O7E+O7E+O7E+O7E+O7E+O7E+e7E+e7E+O7E+O7E+O7E+O7E+O7E+O7E+O7E+O7E+O7E+e7E+O7E+O3D9uzE9evD8ejA7+a/6+K959+64tu83te119G3y8WsysOizsB2zr9xyb2Dzb1vy7xuyLlsx7hrxLRqw7Rqw7Npw7NpwrNpwbJpv7BptapztqloraFlqp5gqJxcopVWopVXnJBSmo9Ul41bk4lUj4VViYBShXxLf3dOeXJMbGZFZmA/YVs7WlQ5VE82UEsxQz8qMJJjgQAAADJ0Uk5TDiATEg4KAAAAAAAAAoKZr87a9/T29H72B/L5/Wz9+/j49Pto+v78/Vz9/l9QGiX+QDG2TVtQAAALvElEQVRo3tVabXeaaLeOneZLV4xKNCoERAQJJIZos3SZr+MPaNJYo6FRmTWKKAYhIO/89bPBds60Z551TmeePsuzVzRw3zd47Vfg2hy8SySVPj5OvfsijcOjRurN21IpVUqnU6Xz43StljlOp1JXZ+mzxrt9kANAeZZKI7RDZt80TlPXtXS6ls1Ui7lsFj2pegxKRlxE0WEYcSxOYUStsR+wGwjJ5J27T8MiyfkRRQUerxirsSS/Kk/iWHwSJ+LzZDKZTmUQaYvsC+zyclZ/fHwcIuuJNBHF8Vj8fSrNJAm+/qfIWG1frK3I+PDTp89I+PRXQL+ViUGelVKpRqnxrpR6+3d/tXF9DFnz5vDt20PIqzdH308fHsJ46fD78aOjo/+GXZxMGUZ3CRK3lvMkEqTpZDx+ho8E8j1uNWSpSjlXLpdPTk5ymePz5tX15RkkbOk8nb68OIbcLZ3FCdy4ThI6nU6fn6fjBYfJTwPWJkrQkCscUy1nMxxdzuWymVM4YaZ2QVQymbNqNpvJVHMg2Zqt49lM+uIyW63isOziD9iFp5lKIQy9wMkCRjE0E7F1LghDSxDWG8Ncb1R1PZuIE4iaRI25PJuKyxdbCHnOE/yApagiGdLVE4RhMZSOOIYJPUBV5V2fr0eOG0Ysh3E8R9NVmGWrlZwgK5KUWAhsI4rib6phy8sXwxL0lfqiC+pENZyxrBiuxwmmZXt8lHeGj1RQyGdLO9hNRpxNJarl20R/sFgudMc2TT5wHdv3OS4CBfwCWshTGLtR14ZlWSZ8tJUsTiFdxXGcAdJYfBafnmD3aSY9QzbPYlBz0HHyDE57BmDi87MoycpylWD9zoW//+HV+B8cJc2n08TV092EJLLcp8dPOksaVLWUwL6uizNpibXa9fB9r9vutN/f3LRv2u1Ot9e7/3Db7bRvWq3+w2i02Mny1d46Ls+hOBVFUd1naIqkeBdc86KAS+ZJlEHpmfxFhP2oSLt4lVcr0gXYQ4Rdr6nTHWxvPJOUQqvX/9D7l9K97d7eJlu33fbNDSgSy/v7h+FgOBiBSqYeBUy9zkGQ0RTDhq5rqfISVFAU+IOQWKryZCrGtTTRZr6DFOfQszR9jmUcT0EEzpWZNJ3GdpZXlmXzFInmkUL98RPA9jTNv2wksP3xbKbQrd7flm4XVAEndbsPg0F/8LEzWox004kCDkEIx49YhsCKSCwYFTie6wZ+GPG853m+H/B8sNqEIQ+rWDb+5lkS/IeRxXyZIJECguuL0Wj4GaF1k8Jdbe1fJNa+CAG2TP0D2N8KOKXT6bRBOnfDZYAy+sdu4p7uAGQRFTl3uRhtP490HULONu3AD7av+nJrwoDjwCYMj7p1ffi+NXBiP4JZbu16HcGwwNNe6C+wvelstmb+bbC/UaHT+jDSHTcYttq9Wwizx8oCMgdwgGvi/OnAHyTR7c5nMAYSD3e7gwW9bQWDXq//CpOj4nDrbKFQaCp2mcAu2xBqmvdTYMfIAWx3xPCvw9FgMAoWnf/zgS3dH4FGfbvXa0PIhXc6Vxc0FW8msKtrSFkz+FmwE+m0+4uF/qq/Dn7oqLiY9e7M3v3dkjRbHVdgBE3Dd3Wb3gBsy77p/WzpQrj/ncMCx3H8x3bvhrMISzPoHewiwJZcu93bV/nY//hh4D90W+QG3WgWuoONqQDbsTu9fZbbkbMd5FeIplnlBHYJDWRp6urd3n7j7to+9oqpmpfZWfu6wtgib+85bKiBBc7EVY2//vpQdk5vqcW+o+4NC4ZNr9fceQK7eXl9eiJURnsP+4E2nPp6zSRPVwdnRdoxZLS/97D7uOLCDWB1d7+dKkjjyQbr7j/svGyR9gq9SmCfF+HWXuBa+466O0KVOYV6VHMHGxVnc/Y/cJH8p/cHC1KeP4UUkhBMB1dlWZLxRWfvYX/Gldl8orwg8fXm4PBEkeTi/mdkZ4Qp8WPaqoDlSlAAyxNpRQz2HvbNFl8C7Okqbwfo9UGzKo097v7/AWwsga3jG42tHZSyusiH+1//uqP8KmaXLEIzyPODRk4RqbCdPAPuNew+YsTWNlHDKDYPGqhiFkhn8GH4fq+Bdx/yVgx7UzSMSvOgicuYO1wUqQr3sNfmbhPuHCrJS97SCo2DBmlXHh/vAt3Z87xs0ZEMsNWCplWb8JgQVYaPdxFu3+15KbFReT6emnljDbDflQVEHy6owfsv3EzCzgBRcdu7u7/vxRTgzfvWVwFmcFd0fgUCBwiPzn/u6todItbURSjEjK19hC1drOwO2glded+9/9hf6CaQk74PDHRouwEfcUDrAQPmRZxvu77tOcCBwdM0r48+jzof+/3BF3nf7oCG3c6XcvrrvzfHOwwd+WER0Yxy4yBFKTMZfRwuAFAQYCxbp6kw9FzBVjcv6lJRLWOzXKuqAPSwYJkwbnmeI1ghHwZ1hqVphuFIiqYIHEXRYtHzgkVM2o0Go4fBx8RB7U7Met7G8s+C28b00SuCrK1C6aAE10yRRHCgv421upKVhJee7ijPWCZfNnbUbTw+BpnEDOl0x63P5tOJtARm1dhsBMH1nJAFtrJYLhRjEtl2XT2m9z4P+23Q4iaJsh9X4de+749Gn6k6vtbKVwdNuEOZmqos/f5Pmeg/lJOmMU2vrpbKBhRJvGR4YZ3FMdznI3O7XC4Ww4dYhfZX8L/+L3F9c6fbi9EyIBB4DFZRsHbMk0wSEl+C1oA4mUI7AHbjbgBw69AJiGlnsHKMZwcQDD4Fe4Mjdr2EPwGfxB6AA35PNv6kUtzqGCuqqq0tQ7BdnsQQpu5sYw548AEyP0n4mw4Ugg8Jh9n9kzc6rb7N2R6NoKwz3TJgbajb+Q2cD7qPS1lxdJ0L3QrJcIFfh8CN3C3H8AKYZ2nbG4gAx7Y2puDaL0bgvS4V0zN1VdUt+3WzWgqWrsiuZYxlwYQ91/iXfoEGgSjOFMOwbccLQ0gmGq2QfNxvcSHbHXf7uuh3d/F0/9Af6jSCoBgvmDLYSog0Dfnl4BcaxTm0iBNEgUQYAnIVks7xoIi4AcvgZMgxFEnQPMOQWBQxOIpQDAbrKRLPQwLTOAHdKhot5hGqmC9gBFZGSa4ORDzuTr6JoMl45wDpGxViDaDnAx5SVivwhAEBJYQUgSAUhoLp4LdhMzBWypcjtuTaysctpwriQSdJMEzT3Gg7WUPpiGWtrmFT+yqGocG5VyCwBHa/LtY0db2x1qu1Fn82mxc4z9qrQCVSVcsyVNsXNhs3sHVFms6h7bSErshvqiKL4lIGzJPfnicqNEy2xuZlqUyMF3X+pFj2y4uhmRt1pcyfoWkmjeMuiSia1FooAOxS8wIpg3MhdVxHYEPfE7bgOieMDR5bvVqnoSkHniRogiApjiFxnOF83amzfBjVaS6iMZwL6ihBsj7PsBzvCa4QvBIIQaA4DeYCTxWLBAP2wzEKQXBwLUXhRZSoQG+EIfMIUUUJlEJogoQjoPGRzyctE5LjKAhZJgqhxrKRZ2/rPEVrXjlmpaDFeVXDvGqOOD8tX8C7Dtlc5ezs/BL6oGfX17WzZjOVah42f4EG6bvDVBrehTi9vIB/mewFfOXOT48zzeuz40y5Fs9lMjXYLhTrp1nE0l4Sb+1cFvsHbGPZsGkLnvoiCL4LzU8vHoTwMBLPGZZrrc3YgpYNcx5cLwSPq8MljmMpHN5a4LSQ28EGQu3oR3rPR3/5ukDp+4FL6MclURaH0dc4g32IJYg/0MRSYWJjxIjjJcmUtv7T6q8xm5whVhuIYsx1L77C/inSOMsjJDSACyQdhYHrmmEYkhTDh0JE80QBJ3O5MlGnsApF0SznexjDBoLlsqEHVcG0PEEw1ivB1lRwiKEZrh17RQhxr/ZTYcNbACXou59dXUFoZbKFSu04W6lBYGWqF+eHqVT8zgHIVelNKhXH3HkSeacXsKyMYmimAPFdzeZyJyfwXcAzmRyK4lCyCmc/GfYPBdm3LzEcxTH3NtV8d/gmddg4fHt4mBwEr0TUThvv/guEZgzZvv1mYAAAAABJRU5ErkJggg%3D%3D";
	var_images['race_joueur']			= 	get_image_race(var_divers['race']);	// Retourne l'image correspondant à la race du joueur
	var_images['rapport_01']			= 	"data:image/gif;base64,R0lGODlhEwATAPcAAAABAAIIDCILCXYAAHQAEYAAAHsGAJ4AD7cAAL8ADCAuPd4BAKIUGvAAEfcGABBMAF8zL2A0MGI1LGE1MYEwFmY9ABZVFXw0MUVHRG1DBnY8N3g9OVlLC1RHQ6gxM4Y9NHtCJ5A+OIBDOYJFO41COYNGPHRSAPgnNYFKPZJGN3NWAYJMRYRNQJpHOz5mGopMQo1SAWNZOGRaORd1EZ1JPZJMQB51AJ9KOB92AP8vLplMPTFvF5tOPnxeAKJNOwCEAJ1PQKRPPY5VSKVQPpZaC0Nmi6xPOqxQQW9lQ3RjVJVbSaxVQ2xoRLNUQLJURZdcSp1bTAuUAJ9iS7RcSaFkTN1SVm9xbnlySetPVrViRn1yULJrALRoGmJ1jHJ0cYF7AKtmaCCXIJd1FKlqTPhTV5h6AK5uUK9vUod8WSGlACuiBbJyVIl+WyWnAIiBV4uAXYmCWL97AL97B/5gZIaBgAC2AL1/CvpkZLiAFsR/AIyGYrx6VpiEXYWHhAu8AIGNjsR/Vt1+J8qJAJ6LfMeMAM+NANaDWMuGW5aRj9aNAMmPMbWVNryVL9KVAL6fAJGdntObAImgvtqbAzbNANydAOmcANuhAHyo2++cAoioxDXWAOSjAADnANGhYcmjc9yoFcWrUOCrBv6UlKqsqe2qALWugemsAADyAPSqAL2vcbawiYLFYbqyhZ610/KwKOq0GbO1ssqxlr+3itS3VeW6B+63C/K6AO+9AOm+EOG7TIPVZ/G/AOW9P4TWaLy+u9m+abzBw8jCm/3CAMDCvj/3OufMAP/GAEr/AMLHyobkZfvNANrKhdPLnf7PAPnQBf/QC/3PH//MN7fP7svOytXPp83Py/7VAPjWDv/Je/nXEfHUSvfTS9rTrNHT0P/XKP7Ra9LU0dvVrdPV0v/dBPzfAt3Xr/3gBvjiBKLvhv7hCuHasv/bW+zblf7mAP/cY+fcu9Pg4dTg7t7g3f/tAP/pK/roUv/ld/vpgP/yWu3v6/7yo//72P/+4f/+9f7//P///yH5BAEAAP8ALAAAAAATABMAAAibAP8JHEiwoMGDCAnKWJjQoIx3/PjJaDhQRjl13CIybCiDVblyGSMyWEiSpEAZqlixosaNgcuI+yRymzlRhhs3pVgxKBBSY7BgJv+RZFWA50xuMn7G+Blu4kkZRVXSBKonaVOCOxfCUSlDlgw9emJ4HVjgX1mhC9HI8vp1rMCyZ09e0bJ2rdOdbwuW3EiwKEWseP8OZCC4sOG/AQEAOw%3D%3D";
	var_images['rapport_02'] 			= 	"data:image/gif;base64,R0lGODlhEwATAPcAAAABAAIIDCILCXYAAHQAEYAAAHsGAJ4AD7cAAL8ADCAuPd4BAKIUGvAAEfcGABBMAF8zL2A0MGI1LGE1MYEwFmY9ABZVFXw0MUVHRG1DBnY8N3g9OVlLC1RHQ6gxM4Y9NHtCJ5A+OIBDOYJFO41COYNGPHRSAPgnNYFKPZJGN3NWAYJMRYRNQJpHOz5mGopMQo1SAWNZOGRaORd1EZ1JPZJMQB51AJ9KOB92AP8vLplMPTFvF5tOPnxeAKJNOwCEAJ1PQKRPPY5VSKVQPpZaC0Nmi6xPOqxQQW9lQ3RjVJVbSaxVQ2xoRLNUQLJURZdcSp1bTAuUAJ9iS7RcSaFkTN1SVm9xbnlySetPVrViRn1yULJrALRoGmJ1jHJ0cYF7AKtmaCCXIJd1FKlqTPhTV5h6AK5uUK9vUod8WSGlACuiBbJyVIl+WyWnAIiBV4uAXYmCWL97AL97B/5gZIaBgAC2AL1/CvpkZLiAFsR/AIyGYrx6VpiEXYWHhAu8AIGNjsR/Vt1+J8qJAJ6LfMeMAM+NANaDWMuGW5aRj9aNAMmPMbWVNryVL9KVAL6fAJGdntObAImgvtqbAzbNANydAOmcANuhAHyo2++cAoioxDXWAOSjAADnANGhYcmjc9yoFcWrUOCrBv6UlKqsqe2qALWugemsAADyAPSqAL2vcbawiYLFYbqyhZ610/KwKOq0GbO1ssqxlr+3itS3VeW6B+63C/K6AO+9AOm+EOG7TIPVZ/G/AOW9P4TWaLy+u9m+abzBw8jCm/3CAMDCvj/3OufMAP/GAEr/AMLHyobkZfvNANrKhdPLnf7PAPnQBf/QC/3PH//MN7fP7svOytXPp83Py/7VAPjWDv/Je/nXEfHUSvfTS9rTrNHT0P/XKP7Ra9LU0dvVrdPV0v/dBPzfAt3Xr/3gBvjiBKLvhv7hCuHasv/bW+zblf7mAP/cY+fcu9Pg4dTg7t7g3f/tAP/pK/roUv/ld/vpgP/yWu3v6/7yo//72P/+4f/+9f7//P///yH5BAEAAP8ALAAAAAATABMAAAiVAP8JHEiwoMF4CA0ORMeQYLxL0uIpRHeszimH0iBKJEjRYp2CkTJGXHgszKmPBkNq/EfR5AyFAlVKQ3fKJcyBXWbWPGXhJsedPX0KpGnSwkifNC1aaLXS4CBPSXn+68I0oqdBBDs8VYqT6dUOBbV6Corza0FPScSeHdQhiaeBaMFqLcj2X9u3cYUKvBsLrN69sf4aDAgAOw%3D%3D";
	var_images['rapport_03'] 			= 	"data:image/gif;base64,R0lGODlhEwATAPcAAAABAAIIDCILCXYAAHQAEYAAAHsGAJ4AD7cAAL8ADCAuPd4BAKIUGvAAEfcGABBMAF8zL2A0MGI1LGE1MYEwFmY9ABZVFXw0MUVHRG1DBnY8N3g9OVlLC1RHQ6gxM4Y9NHtCJ5A+OIBDOYJFO41COYNGPHRSAPgnNYFKPZJGN3NWAYJMRYRNQJpHOz5mGopMQo1SAWNZOGRaORd1EZ1JPZJMQB51AJ9KOB92AP8vLplMPTFvF5tOPnxeAKJNOwCEAJ1PQKRPPY5VSKVQPpZaC0Nmi6xPOqxQQW9lQ3RjVJVbSaxVQ2xoRLNUQLJURZdcSp1bTAuUAJ9iS7RcSaFkTN1SVm9xbnlySetPVrViRn1yULJrALRoGmJ1jHJ0cYF7AKtmaCCXIJd1FKlqTPhTV5h6AK5uUK9vUod8WSGlACuiBbJyVIl+WyWnAIiBV4uAXYmCWL97AL97B/5gZIaBgAC2AL1/CvpkZLiAFsR/AIyGYrx6VpiEXYWHhAu8AIGNjsR/Vt1+J8qJAJ6LfMeMAM+NANaDWMuGW5aRj9aNAMmPMbWVNryVL9KVAL6fAJGdntObAImgvtqbAzbNANydAOmcANuhAHyo2++cAoioxDXWAOSjAADnANGhYcmjc9yoFcWrUOCrBv6UlKqsqe2qALWugemsAADyAPSqAL2vcbawiYLFYbqyhZ610/KwKOq0GbO1ssqxlr+3itS3VeW6B+63C/K6AO+9AOm+EOG7TIPVZ/G/AOW9P4TWaLy+u9m+abzBw8jCm/3CAMDCvj/3OufMAP/GAEr/AMLHyobkZfvNANrKhdPLnf7PAPnQBf/QC/3PH//MN7fP7svOytXPp83Py/7VAPjWDv/Je/nXEfHUSvfTS9rTrNHT0P/XKP7Ra9LU0dvVrdPV0v/dBPzfAt3Xr/3gBvjiBKLvhv7hCuHasv/bW+zblf7mAP/cY+fcu9Pg4dTg7t7g3f/tAP/pK/roUv/ld/vpgP/yWu3v6/7yo//72P/+4f/+9f7//P///yH5BAEAAP8ALAAAAAATABMAAAiLAP8JHEiwoMF4CA0OdAcNGsF4l6TFU+jOWBxMD6VFnEiw4sU4BSNplLjQIiaQBkVu/OfxpEKBKqW1RPnyXxeZJmnWZJlzZ8mPJHfObLXS4CBPM20SlehpEMEORz8O7EK0aYeCUD3ptGm1oKckWb0O6pDE08CvV6EWHPuPrFm0PgW6jXU1rtxYdg0GBAA7";
	var_images['rapport_04'] 			= 	"data:image/gif;base64,R0lGODlhEwATAPcAAAABAAIIDCILCXYAAHQAEYAAAHsGAJ4AD7cAAL8ADCAuPd4BAKIUGvAAEfcGABBMAF8zL2A0MGI1LGE1MYEwFmY9ABZVFXw0MUVHRG1DBnY8N3g9OVlLC1RHQ6gxM4Y9NHtCJ5A+OIBDOYJFO41COYNGPHRSAPgnNYFKPZJGN3NWAYJMRYRNQJpHOz5mGopMQo1SAWNZOGRaORd1EZ1JPZJMQB51AJ9KOB92AP8vLplMPTFvF5tOPnxeAKJNOwCEAJ1PQKRPPY5VSKVQPpZaC0Nmi6xPOqxQQW9lQ3RjVJVbSaxVQ2xoRLNUQLJURZdcSp1bTAuUAJ9iS7RcSaFkTN1SVm9xbnlySetPVrViRn1yULJrALRoGmJ1jHJ0cYF7AKtmaCCXIJd1FKlqTPhTV5h6AK5uUK9vUod8WSGlACuiBbJyVIl+WyWnAIiBV4uAXYmCWL97AL97B/5gZIaBgAC2AL1/CvpkZLiAFsR/AIyGYrx6VpiEXYWHhAu8AIGNjsR/Vt1+J8qJAJ6LfMeMAM+NANaDWMuGW5aRj9aNAMmPMbWVNryVL9KVAL6fAJGdntObAImgvtqbAzbNANydAOmcANuhAHyo2++cAoioxDXWAOSjAADnANGhYcmjc9yoFcWrUOCrBv6UlKqsqe2qALWugemsAADyAPSqAL2vcbawiYLFYbqyhZ610/KwKOq0GbO1ssqxlr+3itS3VeW6B+63C/K6AO+9AOm+EOG7TIPVZ/G/AOW9P4TWaLy+u9m+abzBw8jCm/3CAMDCvj/3OufMAP/GAEr/AMLHyobkZfvNANrKhdPLnf7PAPnQBf/QC/3PH//MN7fP7svOytXPp83Py/7VAPjWDv/Je/nXEfHUSvfTS9rTrNHT0P/XKP7Ra9LU0dvVrdPV0v/dBPzfAt3Xr/3gBvjiBKLvhv7hCuHasv/bW+zblf7mAP/cY+fcu9Pg4dTg7t7g3f/tAP/pK/roUv/ld/vpgP/yWu3v6/7yo//72P/+4f/+9f7//P///yH5BAEAAP8ALAAAAAATABMAAAiMAP8JHEiwoMF4CA0OFCUqB8F4l6TFU9gQgYOH0iJOJFhxAYKCkTJKXJgDgUeFITX+62hAocCU0li6HNglZskFLWeSNJlT58qbBkbqZNlKpcFBnmR2KSrR0yCCHZDypFnUaYeCUT31FNjFakFPSbJ+HdQhiaeBYK9GLUj2X9mzaX0KfBvrqty5se4aDAgAOw%3D%3D";
	var_images['rapport_05'] 			= 	"data:image/gif;base64,R0lGODlhEwATAPcAAAABAAIIDCILCXYAAHQAEYAAAHsGAJ4AD7cAAL8ADCAuPd4BAKIUGvAAEfcGABBMAF8zL2A0MGI1LGE1MYEwFmY9ABZVFXw0MUVHRG1DBnY8N3g9OVlLC1RHQ6gxM4Y9NHtCJ5A+OIBDOYJFO41COYNGPHRSAPgnNYFKPZJGN3NWAYJMRYRNQJpHOz5mGopMQo1SAWNZOGRaORd1EZ1JPZJMQB51AJ9KOB92AP8vLplMPTFvF5tOPnxeAKJNOwCEAJ1PQKRPPY5VSKVQPpZaC0Nmi6xPOqxQQW9lQ3RjVJVbSaxVQ2xoRLNUQLJURZdcSp1bTAuUAJ9iS7RcSaFkTN1SVm9xbnlySetPVrViRn1yULJrALRoGmJ1jHJ0cYF7AKtmaCCXIJd1FKlqTPhTV5h6AK5uUK9vUod8WSGlACuiBbJyVIl+WyWnAIiBV4uAXYmCWL97AL97B/5gZIaBgAC2AL1/CvpkZLiAFsR/AIyGYrx6VpiEXYWHhAu8AIGNjsR/Vt1+J8qJAJ6LfMeMAM+NANaDWMuGW5aRj9aNAMmPMbWVNryVL9KVAL6fAJGdntObAImgvtqbAzbNANydAOmcANuhAHyo2++cAoioxDXWAOSjAADnANGhYcmjc9yoFcWrUOCrBv6UlKqsqe2qALWugemsAADyAPSqAL2vcbawiYLFYbqyhZ610/KwKOq0GbO1ssqxlr+3itS3VeW6B+63C/K6AO+9AOm+EOG7TIPVZ/G/AOW9P4TWaLy+u9m+abzBw8jCm/3CAMDCvj/3OufMAP/GAEr/AMLHyobkZfvNANrKhdPLnf7PAPnQBf/QC/3PH//MN7fP7svOytXPp83Py/7VAPjWDv/Je/nXEfHUSvfTS9rTrNHT0P/XKP7Ra9LU0dvVrdPV0v/dBPzfAt3Xr/3gBvjiBKLvhv7hCuHasv/bW+zblf7mAP/cY+fcu9Pg4dTg7t7g3f/tAP/pK/roUv/ld/vpgP/yWu3v6/7yo//72P/+4f/+9f7//P///yH5BAEAAP8ALAAAAAATABMAAAiVAP8JHEiwYMFLlwwqRDgQYUKF/xwWfPDg4UGKBh+sosix48aMq1bp0pWs5MhVOB6AxKFGzaSXLXGkXNny5aSYMyeirAlTDQ4bKkHyvOkzqFCXPXMqfKCrjc2WRglWiMjUac+K/6YOrFABIdOnFS9xLcg14YNeL1WK1bq1QgetZ4O6HSuQa4escOtOfTvVLsSCfP8KDggAOw%3D%3D";
	var_images['rapport_06'] 			= 	"data:image/gif;base64,R0lGODlhEwATAPcAAAABAAIIDCILCXYAAHQAEYAAAHsGAJ4AD7cAAL8ADCAuPd4BAKIUGvAAEfcGABBMAF8zL2A0MGI1LGE1MYEwFmY9ABZVFXw0MUVHRG1DBnY8N3g9OVlLC1RHQ6gxM4Y9NHtCJ5A+OIBDOYJFO41COYNGPHRSAPgnNYFKPZJGN3NWAYJMRYRNQJpHOz5mGopMQo1SAWNZOGRaORd1EZ1JPZJMQB51AJ9KOB92AP8vLplMPTFvF5tOPnxeAKJNOwCEAJ1PQKRPPY5VSKVQPpZaC0Nmi6xPOqxQQW9lQ3RjVJVbSaxVQ2xoRLNUQLJURZdcSp1bTAuUAJ9iS7RcSaFkTN1SVm9xbnlySetPVrViRn1yULJrALRoGmJ1jHJ0cYF7AKtmaCCXIJd1FKlqTPhTV5h6AK5uUK9vUod8WSGlACuiBbJyVIl+WyWnAIiBV4uAXYmCWL97AL97B/5gZIaBgAC2AL1/CvpkZLiAFsR/AIyGYrx6VpiEXYWHhAu8AIGNjsR/Vt1+J8qJAJ6LfMeMAM+NANaDWMuGW5aRj9aNAMmPMbWVNryVL9KVAL6fAJGdntObAImgvtqbAzbNANydAOmcANuhAHyo2++cAoioxDXWAOSjAADnANGhYcmjc9yoFcWrUOCrBv6UlKqsqe2qALWugemsAADyAPSqAL2vcbawiYLFYbqyhZ610/KwKOq0GbO1ssqxlr+3itS3VeW6B+63C/K6AO+9AOm+EOG7TIPVZ/G/AOW9P4TWaLy+u9m+abzBw8jCm/3CAMDCvj/3OufMAP/GAEr/AMLHyobkZfvNANrKhdPLnf7PAPnQBf/QC/3PH//MN7fP7svOytXPp83Py/7VAPjWDv/Je/nXEfHUSvfTS9rTrNHT0P/XKP7Ra9LU0dvVrdPV0v/dBPzfAt3Xr/3gBvjiBKLvhv7hCuHasv/bW+zblf7mAP/cY+fcu9Pg4dTg7t7g3f/tAP/pK/roUv/ld/vpgP/yWu3v6/7yo//72P/+4f/+9f7//P///yH5BAEAAP8ALAAAAAATABMAAAiMAP8JHEiwYMFLlwwqRDgQYUKF/xwWVKHi4UGKBlXgo8ix48aM+EKKHFlGBcgyjhwVW5myTMmTKVcWa/lyIj6UKlk6cmkSZEydNX3mnLmzp0KNQ1MaJVghIlKZShM2HVihAkKNUCteqlqwakKsxUxunUq1QoepGnua5Sqwaod/bNU2PdvULcSCdO/qDQgAOw%3D%3D";
	var_images['rapport_07'] 			= 	"data:image/gif;base64,R0lGODlhEwATAPcAAAABAAIIDCILCXYAAHQAEYAAAHsGAJ4AD7cAAL8ADCAuPd4BAKIUGvAAEfcGABBMAF8zL2A0MGI1LGE1MYEwFmY9ABZVFXw0MUVHRG1DBnY8N3g9OVlLC1RHQ6gxM4Y9NHtCJ5A+OIBDOYJFO41COYNGPHRSAPgnNYFKPZJGN3NWAYJMRYRNQJpHOz5mGopMQo1SAWNZOGRaORd1EZ1JPZJMQB51AJ9KOB92AP8vLplMPTFvF5tOPnxeAKJNOwCEAJ1PQKRPPY5VSKVQPpZaC0Nmi6xPOqxQQW9lQ3RjVJVbSaxVQ2xoRLNUQLJURZdcSp1bTAuUAJ9iS7RcSaFkTN1SVm9xbnlySetPVrViRn1yULJrALRoGmJ1jHJ0cYF7AKtmaCCXIJd1FKlqTPhTV5h6AK5uUK9vUod8WSGlACuiBbJyVIl+WyWnAIiBV4uAXYmCWL97AL97B/5gZIaBgAC2AL1/CvpkZLiAFsR/AIyGYrx6VpiEXYWHhAu8AIGNjsR/Vt1+J8qJAJ6LfMeMAM+NANaDWMuGW5aRj9aNAMmPMbWVNryVL9KVAL6fAJGdntObAImgvtqbAzbNANydAOmcANuhAHyo2++cAoioxDXWAOSjAADnANGhYcmjc9yoFcWrUOCrBv6UlKqsqe2qALWugemsAADyAPSqAL2vcbawiYLFYbqyhZ610/KwKOq0GbO1ssqxlr+3itS3VeW6B+63C/K6AO+9AOm+EOG7TIPVZ/G/AOW9P4TWaLy+u9m+abzBw8jCm/3CAMDCvj/3OufMAP/GAEr/AMLHyobkZfvNANrKhdPLnf7PAPnQBf/QC/3PH//MN7fP7svOytXPp83Py/7VAPjWDv/Je/nXEfHUSvfTS9rTrNHT0P/XKP7Ra9LU0dvVrdPV0v/dBPzfAt3Xr/3gBvjiBKLvhv7hCuHasv/bW+zblf7mAP/cY+fcu9Pg4dTg7t7g3f/tAP/pK/roUv/ld/vpgP/yWu3v6/7yo//72P/+4f/+9f7//P///yH5BAEAAP8ALAAAAAATABMAAAiWAP8JHEiwYMFLlwwqRDgQYUKF/xwWJEDg4UGKBglUocix48aMVapgwTJnDpmRVQ4QAHkgQYITJxq4PKCSpUuYMhPQXDkx5c2YM2uC/JlT6NCXQHXyVEgAC9KcSwlWiNj0qcuK/6YOrFABYVOcCSpe4lqQa8KvDVaO1bq1QgetBObwdEtWINcOWeHanfp26l2IBfsCHhwQADs%3D";
	var_images['rapport_08'] 			= 	"data:image/gif;base64,R0lGODlhEwATAPcAAAABAAIIDCILCXYAAHQAEYAAAHsGAJ4AD7cAAL8ADCAuPd4BAKIUGvAAEfcGABBMAF8zL2A0MGI1LGE1MYEwFmY9ABZVFXw0MUVHRG1DBnY8N3g9OVlLC1RHQ6gxM4Y9NHtCJ5A+OIBDOYJFO41COYNGPHRSAPgnNYFKPZJGN3NWAYJMRYRNQJpHOz5mGopMQo1SAWNZOGRaORd1EZ1JPZJMQB51AJ9KOB92AP8vLplMPTFvF5tOPnxeAKJNOwCEAJ1PQKRPPY5VSKVQPpZaC0Nmi6xPOqxQQW9lQ3RjVJVbSaxVQ2xoRLNUQLJURZdcSp1bTAuUAJ9iS7RcSaFkTN1SVm9xbnlySetPVrViRn1yULJrALRoGmJ1jHJ0cYF7AKtmaCCXIJd1FKlqTPhTV5h6AK5uUK9vUod8WSGlACuiBbJyVIl+WyWnAIiBV4uAXYmCWL97AL97B/5gZIaBgAC2AL1/CvpkZLiAFsR/AIyGYrx6VpiEXYWHhAu8AIGNjsR/Vt1+J8qJAJ6LfMeMAM+NANaDWMuGW5aRj9aNAMmPMbWVNryVL9KVAL6fAJGdntObAImgvtqbAzbNANydAOmcANuhAHyo2++cAoioxDXWAOSjAADnANGhYcmjc9yoFcWrUOCrBv6UlKqsqe2qALWugemsAADyAPSqAL2vcbawiYLFYbqyhZ610/KwKOq0GbO1ssqxlr+3itS3VeW6B+63C/K6AO+9AOm+EOG7TIPVZ/G/AOW9P4TWaLy+u9m+abzBw8jCm/3CAMDCvj/3OufMAP/GAEr/AMLHyobkZfvNANrKhdPLnf7PAPnQBf/QC/3PH//MN7fP7svOytXPp83Py/7VAPjWDv/Je/nXEfHUSvfTS9rTrNHT0P/XKP7Ra9LU0dvVrdPV0v/dBPzfAt3Xr/3gBvjiBKLvhv7hCuHasv/bW+zblf7mAP/cY+fcu9Pg4dTg7t7g3f/tAP/pK/roUv/ld/vpgP/yWu3v6/7yo//72P/+4f/+9f7//P///yH5BAEAAP8ALAAAAAATABMAAAibAP8JHEiwYMFLlwwqRDgQYUKF/xwW9OLl4UEvGAx6GUaxo8dhGScOG4YMGbiTJYf9CUlw459Hj4DJhPlnpUaVMGUCo2lT5MuYMx/VZNlyWM6gPW8e3SmU6ERkQJk6FVghoheoOmFiSFh1YIUKCK9m3Xrpa8GvCb1Uk5mxbFevFTp09QIuZFyzVOP+w+sl7z+5Vb92gFgQMOHDAQEAOw%3D%3D";
	var_images['rapport_09'] 			= 	"data:image/gif;base64,R0lGODlhEwATAPcAAAABAAIIDCILCXYAAHQAEYAAAHsGAJ4AD7cAAL8ADCAuPd4BAKIUGvAAEfcGABBMAF8zL2A0MGI1LGE1MYEwFmY9ABZVFXw0MUVHRG1DBnY8N3g9OVlLC1RHQ6gxM4Y9NHtCJ5A+OIBDOYJFO41COYNGPHRSAPgnNYFKPZJGN3NWAYJMRYRNQJpHOz5mGopMQo1SAWNZOGRaORd1EZ1JPZJMQB51AJ9KOB92AP8vLplMPTFvF5tOPnxeAKJNOwCEAJ1PQKRPPY5VSKVQPpZaC0Nmi6xPOqxQQW9lQ3RjVJVbSaxVQ2xoRLNUQLJURZdcSp1bTAuUAJ9iS7RcSaFkTN1SVm9xbnlySetPVrViRn1yULJrALRoGmJ1jHJ0cYF7AKtmaCCXIJd1FKlqTPhTV5h6AK5uUK9vUod8WSGlACuiBbJyVIl+WyWnAIiBV4uAXYmCWL97AL97B/5gZIaBgAC2AL1/CvpkZLiAFsR/AIyGYrx6VpiEXYWHhAu8AIGNjsR/Vt1+J8qJAJ6LfMeMAM+NANaDWMuGW5aRj9aNAMmPMbWVNryVL9KVAL6fAJGdntObAImgvtqbAzbNANydAOmcANuhAHyo2++cAoioxDXWAOSjAADnANGhYcmjc9yoFcWrUOCrBv6UlKqsqe2qALWugemsAADyAPSqAL2vcbawiYLFYbqyhZ610/KwKOq0GbO1ssqxlr+3itS3VeW6B+63C/K6AO+9AOm+EOG7TIPVZ/G/AOW9P4TWaLy+u9m+abzBw8jCm/3CAMDCvj/3OufMAP/GAEr/AMLHyobkZfvNANrKhdPLnf7PAPnQBf/QC/3PH//MN7fP7svOytXPp83Py/7VAPjWDv/Je/nXEfHUSvfTS9rTrNHT0P/XKP7Ra9LU0dvVrdPV0v/dBPzfAt3Xr/3gBvjiBKLvhv7hCuHasv/bW+zblf7mAP/cY+fcu9Pg4dTg7t7g3f/tAP/pK/roUv/ld/vpgP/yWu3v6/7yo//72P/+4f/+9f7//P///yH5BAEAAP8ALAAAAAATABMAAAiDAP8JHEiwoMGDBuHBQ4hQ4UKGBR0WzJChoUKDGTpR3EhRIsZOIEN2cgjgYEYiKFGSrPgxJRGSRFhO7JQSZkyEJ22y5PTR5s1/nHgKrCAQZtCjQf0IrVDBpp+nUKEubQqAJpEoWLNG8RNlaIUORE/KFIjVa4d/TP9RNNh16FmIcOMKDAgAOw%3D%3D";
	var_images['ressources_01'] 		= 	"data:image/gif;base64,R0lGODlhEgASAOYAAP/0nX0qDn8tEoAvFIEwFWY2MIc6IIg8I3lDJ4tBKIBFPaROPaBZWLFWRHFxcbRoGsRpWL51AIOCgsSBFtt/JZKRkcqPMNSaANijFtedftSkVtqpFdqpJduqGaysrNytH9ytINapYPSqANyuIvWrAPSrA9yvJfStCbS0tPGpb/KwL9+0QvWyGPa2I/a5LPe5K/a7Mr++vfa9OffCR/fFUf/MAOfIdP/NA//PDv/SAM3NzerPhf/TJP/UJ9LS0v/QavbVU//YIO3UktXV1f/aR+7Xme7Ynf/jAPfba//dVvXmPPjffN/f3//rD//rEv/ibP/ibv/sHPLhsv/le//vQv/wSP/wTv/wT//vbv/rmfvrrf/zafzrxO7u7v/wsv///+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGEALAAAAAASABIAQAdWgGGCg4SFhmEIP4oIDwiMKhQUCIeUlYSPkZODiYucP4yOlqKGjgiQFA+NmoKepY6nqaGHpaO1o7SWj7Crl4qfqKqyrI6+jg8qu6zFrcDCiKGtvLbTlYEAOw%3D%3D";
	var_images['ressources_02'] 		= 	"data:image/gif;base64,R0lGODlhEgASAOYAAP/0nX0qDn8tEoAvFIEwFWY2MIc6IIg8I3lDJ4tBKIBFPaROPaBZWLFWRHFxcbRoGsRpWL51AIOCgsSBFtt/JZKRkcqPMNSaANijFtedftSkVtqpFdqpJduqGaysrNytH9ytINapYPSqANyuIvWrAPSrA9yvJfStCbS0tPGpb/KwL9+0QvWyGPa2I/a5LPe5K/a7Mr++vfa9OffCR/fFUf/MAOfIdP/NA//PDv/SAM3NzerPhf/TJP/UJ9LS0v/QavbVU//YIO3UktXV1f/aR+7Xme7Ynf/jAPfba//dVvXmPPjffN/f3//rD//rEv/ibP/ibv/sHPLhsv/le//vQv/wSP/wTv/wT//vbv/rmfvrrf/zafzrxO7u7v/wsv///+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGEALAAAAAASABIAQAdjgGGCg4SFhAoKCwsKKY2NCgWREIaUlYULDZmak4WIjCmfjpCRlqWCmA2IiqsNpIOhoIiPBZiulJ6zprqGEJkZpquKmoqEwYwMqguRBYexsKCRDcRhz4yeisuGuI7QzLqeu5aBADs%3D";
	var_images['ressources_03'] 		= 	"data:image/gif;base64,R0lGODlhEgASAOYAAP/0nX0qDn8tEoAvFIEwFWY2MIc6IIg8I3lDJ4tBKIBFPaROPaBZWLFWRHFxcbRoGsRpWL51AIOCgsSBFtt/JZKRkcqPMNSaANijFtedftSkVtqpFdqpJduqGaysrNytH9ytINapYPSqANyuIvWrAPSrA9yvJfStCbS0tPGpb/KwL9+0QvWyGPa2I/a5LPe5K/a7Mr++vfa9OffCR/fFUf/MAOfIdP/NA//PDv/SAM3NzerPhf/TJP/UJ9LS0v/QavbVU//YIO3UktXV1f/aR+7Xme7Ynf/jAPfba//dVvXmPPjffN/f3//rD//rEv/ibP/ibv/sHPLhsv/le//vQv/wSP/wTv/wT//vbv/rmfvrrf/zafzrxO7u7v/wsv///+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGEALAAAAAASABIAQAdwgGGCg4SFhRVMTF8VjIwSDjqMDoaUlYIOiYoxmzGThA4oKD6PDqU6OkyNnpSlrauDmJmLFT4eDkNDq6Aos46PqJKWwsPErV+cnayZihUezqWHso20kF0VnhW8X70Vv6nXl6E+jaSn356ur+mvxO2WgQA7";
	var_images['ressources_04'] 		= 	"data:image/gif;base64,R0lGODlhEgASAOYAAP/0nX0qDn8tEoAvFIEwFWY2MIc6IIg8I3lDJ4tBKIBFPaROPaBZWLFWRHFxcbRoGsRpWL51AIOCgsSBFtt/JZKRkcqPMNSaANijFtedftSkVtqpFdqpJduqGaysrNytH9ytINapYPSqANyuIvWrAPSrA9yvJfStCbS0tPGpb/KwL9+0QvWyGPa2I/a5LPe5K/a7Mr++vfa9OffCR/fFUf/MAOfIdP/NA//PDv/SAM3NzerPhf/TJP/UJ9LS0v/QavbVU//YIO3UktXV1f/aR+7Xme7Ynf/jAPfba//dVvXmPPjffN/f3//rD//rEv/ibP/ibv/sHPLhsv/le//vQv/wSP/wTv/wT//vbv/rmfvrrf/zafzrxO7u7v/wsv///+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGEALAAAAAASABIAQAeEgGGCg4SFhEA1NU01Ik0RijUXF0BhQJSEjE0vNQE1JIaKgjWCTZUXYaOGggEbGwEXERcBqqqptKiLkBeNpUdHhiIbIowiIo+3ghcbspLIzs6pl6Clo7mni7SQixdN2xcrK5WUNRtNOY7b47TBr8YizwHx8s5N5SIBw8hKkS+bL0ovCgUCADs%3D";
	var_images['ressources_05'] 		= 	"data:image/gif;base64,R0lGODlhEgASAOYAAP/0nX0qDn8tEoAvFIEwFWY2MIc6IIg8I3lDJ4tBKIBFPaROPaBZWLFWRHFxcbRoGsRpWL51AIOCgsSBFtt/JZKRkcqPMNSaANijFtedftSkVtqpFdqpJduqGaysrNytH9ytINapYPSqANyuIvWrAPSrA9yvJfStCbS0tPGpb/KwL9+0QvWyGPa2I/a5LPe5K/a7Mr++vfa9OffCR/fFUf/MAOfIdP/NA//PDv/SAM3NzerPhf/TJP/UJ9LS0v/QavbVU//YIO3UktXV1f/aR+7Xme7Ynf/jAPfba//dVvXmPPjffN/f3//rD//rEv/ibP/ibv/sHPLhsv/le//vQv/wSP/wTv/wT//vbv/rmfvrrf/zafzrxO7u7v/wsv///+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGEALAAAAAASABIAQAemgGGCg4SFhEA1NU44LVUhYGBeUpBhS0iFNSJNLzUBNSSGNU2COIJbkFJhlIZhAx8jBhgTGAesrES2g4o4PFdQRlyUAFiGJSAsPTIzNBpJuYIXGxcBFxfP19eUWoKrgqJhpVZPWZDdhTdRPOJF5WBFQjZhQEBhNR1RQVSQUzvb5oMnTCTg4MICDGwCBhAgMGDAtSYbmogIIKLGMyU1Lrzg9ELJi0KBAAA7";
	var_images['separateur_build'] 		= 	"data:application/octet-stream;base64,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";
	var_images['travian_revised'] 		= 	"data:image/png;base64,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%3D";
	var_images['troupes_special_01'] 	= 	"data:image/gif;base64,R0lGODlhEAAQAMQAAN3c3IoEBKsAACYmJrkKCkMtCz4+PqYlJcIoKE9PT3pSFGVlZZKSktuZL6Ojo7ukdrqmeLe3t+/EXf/EN+/v7x4eHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABYALAAAAAAQABAAQAV4oGUZpGiShpkM69M00vsMdMJAz4M/RW/oOYhlNXgcAockklexjXKPlOiXk1oW2EXh1SgYsoMhjQbNFSo1BtEYaLcPTCeqNJ2LcMWiED/TiRZ9PYIGRQsiags/XYtRC2NEZIxoaZBGUHBnLGpkR25LZzZrnW6YTQwhADs%3D";
	var_images['troupes_special_02'] 	= 	"data:image/gif;base64,R0lGODlhEAAQAMQAAN3c3IoEBKsAACYmJrkKCkMtCz4+PqYlJcIoKE9PT3pSFGVlZZKSktuZL6Ojo7ukdrqmeLe3t+/EXf/EN+/v7x4eHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABYALAAAAAAQABAAQAUzoCWOFkGQo6me6cqWbYqKZnnWc4vPb97DtNcPtcuRir6b0hej6VRHl9MIlAWtSaRRawkBADs%3D";
	var_images['troupes_special_03'] 	= 	"data:image/gif;base64,R0lGODlhEAAQAMQAAN3c3IoEBKsAACYmJrkKCkMtCz4+PqYlJcIoKE9PT3pSFGVlZZKSktuZL6Ojo7ukdrqmeLe3t+/EXf/EN+/v7x4eHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABYALAAAAAAQABAAQAV0oCWKCBIcJoIio7W4USzLr3pEjAUs/NvCkYQhxqhUBhSfpXQIzCKH6MjE4DkcvWxrQYkNjcfqb5FwUXKWoXLZNDVPAdYo6mTYRYxD64RzXR0AAF0iAYUvPTIUikkjWTxgAwMRPlxeQ0VHazBCXZhImltKPiEAOw%3D%3D";
	var_images['troupes_special_04'] 	= 	"data:image/gif;base64,R0lGODlhEAAQAMQAAN3c3IoEBKsAACYmJrkKCkMtCz4+PqYlJcIoKE9PT3pSFGVlZZKSktuZL6Ojo7ukdrqmeLe3t+/EXf/EN+/v7x4eHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABYALAAAAAAQABAAQAVOoCWKkiU15qhaQgu5rTBOShHfcaFMowD9LuDKdGpIisahD7dUxoDNFY9XKFimQ+LReMyqFApv2Af9vSzh3osMcy7fshX8GVcxb14ROBsCADs%3D";
	var_images['village_icone'] 		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAHqSURBVHjapJJPSJNhHMc/T3Vwwsq0Sx4iuowllOEhZgWCUHhpuyhsl8hRvv592aYNanuFlcNDm0yzkFgSRLFJh4gCgxEhQQWJF/HmYSANBiV6sEP2dHh9X/bnnQX9Ts/z5ff9Pt/n+/sJKSX/U4e2C+/+2hTRAhLgXmxKVAlYEaT8DQii40F5stFOanIY8v2oWkBWioitb4uWrwaH3fLx4E848wjy/bCp4zdm60jOvBL7OjDreAcUM2DrAJsBfuKfHACEBu9LZ+sp8762sk5idlRYZiClRIjyjGxNG1x2x0oENGqGWEo2Uk/FPKian5tD6dpjrAT8vR6ZfRLQL4U4KR+oD/x7jqoFDlSSvS1t9PROQSFuJm+4ScU8pruyEPu6R+Qvex5vSxsAzQ31JD4ukb21w5U7B1l8GTYdsQnq89MU13aZW5gWwnvRIQ8fbeT6eXuVPe1tDqXdxYvVr2TjO2WOlKSLrR/f9S+MTUSY/7xN3VUHTnUApzpAelmitLtobqgndOESPbf1RfBFHfiiDsYmItYhXusM8TSXAKBzfBSlK7zXeAJfFO4+TNaewvvMLs6z55gMPuNY0xGUrnAVwaj0zLwuMLcwLfq6RySAf8hdtkkGXlqvM2/48iEHoIe43ypbCRhE4/xnAANsqiO/nPgnAAAAAElFTkSuQmCC";
	var_images['bg_option_gauche'] 		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAaCAYAAACO5M0mAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEHg4jA9xVy/EAAADVSURBVDjL7ZKxToVAEEXPdZ+iBhsbQyUN/II9jT2/uT9iRYcJfIIxsdnERbKszeOFEFEKExsnme7MnZu5I8AAF8AVcOO9f0ySxLCqM3bWP/jHYPw1xTirSYpbYFzA0zAMYY/i5JwbvgMnIACh67rXr8D5QXUcMt77sa7re0naAgWobdtQVVWS5/ntEtTCggEOwGWaptdN0zwURXG36RH4cM69l2X5ZK19HscxLFev04lAtNa+9X3/kmUZWkFa2DDA+bEPZiOx011nS/oh3tM1tOMfBOgTLThHaxZtrRgAAAAASUVORK5CYII%3D";
	var_images['bg_option_milieu'] 		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAaCAYAAAB7GkaWAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEHg4iCSWbE64AAABDSURBVCjPY/z//38mAw7AxIAHsMAYf//+ZYSxmZmZ/6NIwgRGjR0Exg46OxkZGBjkoDRWB33BJcnIwMDAic9YZlySAG93IwHC2pYxAAAAAElFTkSuQmCC";
	var_images['bg_option_droite'] 		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAaCAYAAACO5M0mAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEHg4iMHqem6YAAADWSURBVDjL7ZI/CsIwFIe/WJCCk5M3KB7FoXvP4I16hdITOLeDF1AoHcRRcBAMlDRt4hIk1r+Dg4MPsoSP7/deXoS1dsmglFJ9GIYr4Aw0QDviw/qDPwTa7xmFENaz2qegUqoHjBdvH4JSSuWBz41VVR2B3h3zEDTGmDRN90DnW+/Aoih2WZadAO2M92Bd14c4jjeAcqC56VFr3ed5vo2iaC2lbIB22CNlWS6SJJkDM2AKTIAxEADi+rYO6FyUHpiuawxcfOugzh/A7z9wF77BvNq3ePcpLpJ0ZseSww9xAAAAAElFTkSuQmCC";
	var_images['bg_option_gauch2'] 		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEHg8rOKRFwuoAAABKSURBVCjP7c4rDoAwEEXRwycBiey22L/AdAUYkJhWQifoPn3mZgbsWDU2Cq7DDv/DqeAUKeZoccHVqtYfM+5IEY5S3jB/QTjfDh6RmglNQqWciwAAAABJRU5ErkJggg%3D%3D";
	var_images['bg_option_milie2'] 		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEHg8tBap3KX0AAAAdSURBVCjPY2RgYIhkIAx+MDEQCUYVjiocVUiaQgDMiAF9uzvf6AAAAABJRU5ErkJggg%3D%3D";
	var_images['bg_option_droit2'] 		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEHg8sFNncOM4AAAA7SURBVCjPY2RgYIhkIAx+MDEQCUYVjiqkvcKbxCp8QozCi8RY/YOBgeEJAwMDAwseBTdhirApxFAAAwDpCAtVk4IJ/wAAAABJRU5ErkJggg%3D%3D";
	var_images['bg_option_titre'] 		= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAl0AAAAnCAYAAAA1pP2lAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFL0lEQVR42u3dPU8sVRzH8f+Z4WldDAYXL8liQgNv4BabiGBDQWVFtCJGGxN7XwE9JbYmGJK1pKMgMbwEEwgUt5OYKAV6UZS9M8diZ2R275mZM4/swveTTGaZ3Qxnzjyc35w5LEriqchrJ/g5OgEAADxXemjyI8tTg9XwcieY3GCaCObh8rR1AAAAPLWgFfKDyRORN8HkBcu0KXwpw89h4JoQkUkRmQ6mKRGZXF9ff29zc/NDrbXyfZ/ABQAAng3HcbRSSne73Vfn5+d/iUhPRO5F5N9gfh+EL284qClD4HKDgDUjIo35+fm54+Pjr5eXlz9qNpsvGo3GBFUOAACeM6213N3d9W5vb3+5vLz8aWNj43sR+TuY/gnCmCeRXi9lCFzTIvKOiLy7v7//8c7Ozrezs7PvU70AAABmNzc3V3t7e7u7u7s/i8hrEbmTfq/XG1PoCgNXU0TmTk9Pv1lbW/vMcRyHqgQAAEjW6/V6R0dH321vb/8oIn9Iv9crfNyoXXkYwzUlIg0Rmet2u59vbW19SeACAACw47quu7Ky8rLRaLw6OTn5VYYG14ePFSfCwLW0tNS+uLj4odlsNqk+AACAbK6vr39bWFj4QkR+F5E/pf+o0XMioWtaRJqHh4dfEbgAAADyabVaHxwcHHwq/SFbU9IfwvX/d26FoWt2dXX1JdUFAACQX6fT+SQIXdNBznLCnq5wEH2j1Wq9oKoAAADyW1xcbEt/6FbY06WioWuy0+ksuK7rUlUAAAD5zczMhIFr0hi62u32HNUEAABQmJKHXi4nGrocEXE8z6OXCwAAoByuKXSFwYv/pQgAAFAOFZlk4MtPtdaELgAAgArQuwUAAFANNRy6AAAAUDFCFwAAQA0mqAIAAIBS6GASrbWfGLp839ci0pOHZ5CmOWPAAADAkwxLMXPbZdFM1UsMXYF7i8KpDHPbzwIAANiGpLS5zvDZMgznGic1dGmtXcNGSc0FLWsOAABGPyDlmZclLjuolO1J3D7f932b0OVlKGDS6yyFrKsiVYagJ0opQh0A4FmGIq21zhCc6ghHRYJSXFnrCHOJoUvl3Fl5C6xSglueIFdKhQ4eb7nC58CyhwyXGAJt1gUAeB4ByLptC9osnXNdVQWjutr3ojmkdIaOrrdDl+lDNR5kZR8Eab1wKkO5TOWs8+BNDWeGUGf72vhesD5Vx8EJACMSdiL33TprI5/4OiEU1dmGZGkns7aRo9JOjixTT9dTPYn0IxywA0kotpDmSk97ZvzWZ2red7EnZ8w2ZwnAxveHVmsbogmJwGiEmNRlhlBiey1PfD/mMdmoBoHU4FNSu6It6xZ5TwDDLjD1dNFIVX+RKXIiqgznX567FIm5u0vbnnE4cVXSckM9qrzrEovUmGOfqRK2Na5sdYdUVfF5V9n5nePmRpf02dT16OTC6aK/M+XaMK6Ntkq7aavoGqsL7B89YucgzPvZakwXNTVewU4/0j6z6Y0qeqLbNDJZGg1dcmMKIOcNhN09SHnXC4teNM21ASWHLkkNXfR0oeIeh7qvXlZjFGLGr9V5x6iD9eiq908FDcg4926Us7J6egpV5Dh5rH2WdJOnK/j9etyOBSBT6PI8jwMQhMbHCR3jejvNNaOefahH/DjhOAAGQ1f648VH+utFAACAJ8P05LCM7+kCAADAYJ6S1NBFTxcAAEAxVj1dDKQHAAAoHLokNXQxkB4AAKAYq8eLfB8JAABAMVaPF+npAgAAKN9A6Lq6unp9dnbWploAAADK9R8+t/OfCHovTgAAAABJRU5ErkJggg%3D%3D";
	var_images['bg_option_contenu'] 	= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAl0AAAAKCAYAAACOlutNAAAAYElEQVR42u3WMQ2AMBRFUbYmCGiCBxZ01ED9r4xfQHkeGBg4J7ke7hZ7OtIVcwEA8EpV3Xmrkc7UUzNdAACmCwDAdAEAYLoAAEwXAIDpAgDAdAEAmC4AgL8zXQAAH03XA0D+ADq1iMeuAAAAAElFTkSuQmCC";
	var_images['bg_option_save']	 	= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlwAAAAoCAYAAAArMCROAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFARMgFrtBIoMAAAROSURBVHja7d09TCNXFIbhbzxjG1aJnawixU2EBBKJoIqUAqRQ0NDRUNCR1BRuqVKnIEU2kSIKNhWioaNBUCAKOkSDiBCKAw7ZZgn2Lj/G9ng8Mynmev2zWokwi6KI95GuRrI1Lk716dzrcy1JTyRlJeWmpqa+3Nra+lUAAAC4t/Pz81Iul/tG0l+S/k5QEgAAgIdF4AIAACBwAQAA/L85is5wfSrpC0lfUxIAAIDYnkr6SlJKkk+HCwAA4IERuAAAAAhcAAAABC4AAAAQuAAAAP7bwBVSBgAAgIcNXAAAAHjgwBWaFdze3nqUBAAAIB7f9yWpaVbQClyBpCAIAp8SAQAAxBOGoVr5SlLgSEormob6WTqd/pwSAQAAxGPbtiVpSNIrSRcJk7x8Sb5lWU1KBAAA8F60MtabLUVfklev1xvUBgAAIGbSCgJJqpvltTpcnvnApUQAAACxA1docpUnqdkZuFzbtulwAQAAxBSGoSupZkKX3xW4HMepUSIAAIB4gmhPsaaeLcWmpFoymaxTIgAAgHgsywokVSU1ZDpcoQlcbjqdpsMFAAAQP3CFJnC5bwWuZDLJoXkAAICYEolEoGg7sSEzFkIy57hSqRSH5gEAAGIyHS5XZtZp6wxXIKmZTCa5SxEAAOD9BC7PBC4lOr4LHcdh0jwAAED8wCUTtkJJYefl1f7JyclrSgQAABBPsVh01T7D5XcGrqbneV6lUilRJgAAgPsrlUpNRX9KDNRzl2LTtu3GwcHBc8oEAABwf/v7+7/IdLdagat1k7XX19fnbm5u0uECAAC4p2q1Wl5fX39pApenng6XWy6Xy4uLi3+enp4+o1wAAAD/3srKys/FYrGk6GqftyfNZ7PZ20ajcZnP5/9wXbdMyQAAAO7u8PDwx4WFhUIikbjRu672yWQyVUmXGxsbL/L5/A+1Wo3QBQAAcAeFQuHZ7Ozs8fX19UUqlbpSu8PVPWl+YGCgKulK0sXy8vLv09PT3x8dHf1ECQEAAN5tbW1tcWxs7Lfj4+MXksr9/f3XJnA1JfmO2mMhvKGhobqi81yWJG1vbzdHR0dfz83NfTczM/Px8PDwtyMjI59QVgAA8JhVKpVyoVAId3d3n6+url7s7e29lFQy61Uul6ufnZ21rvaJgpV5Wjs7O08nJyfrkp5I+lBSVtJH5vmBpH5JKUmOoin1FiUHAACPRKiORpWiuxKrkm4U7RBemmdlfn4+XFpaujGBK3Q6fkCDg4O+ebn1z8WG+aFLE7bSkpKSbHVfCwQAAPBYQlfQkZPqJitVJd0q2kZ0x8fHE0tLS62rfeR0/kAmk3kzIsI8PfNi2ixH3d0tOlwAAOAxBq5A0fmshlmu2nO3/ImJidaxLak3MIVhmLUs68p8njDLNiHLVruz1dndInQBAIDHErZ6Q5dvgpdvVhBFqjBlWZbbetG5Y3rz1O5osZUIAAAIX91nusKeUNblH9ytpxJwDRjIAAAAAElFTkSuQmCC";
	var_images['cadre'] 				= 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAMAAAD8CC+4AAAAXVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQHQ0ND8/Pz///////////////////////////////////////////8gyYehAAAAH3RSTlNoaGdGPj0pLx8TFgkBCgAAAF6r2OPj397j3t/e4+v2bg7yrQAABJNJREFUeNrt282SmlAQgFFH5D9MlZedRN//MQNCYEAry6TSc76Vl+0pSsvbffoc+zHWtp9rbTs9+dzVKUynp3nb1U2zATdN3bUH9UphOk3mXV2l1G/AfUpV3e3Vh8d9UIDuj+E0mTepH08b8G0Y+tTs1aEHQl/N9+gv6tAjobf19Wl+QB/6a91CD4reVWl4hz6kqoMeE72ti/49el/ULfSY6E35iv6sLxvoQX+969sFHbqgC7qgC7qgC7qgC7r+KnpX5S//vc/nPq+6L8/89x7owuVP6C5cwt6ypffoyS1b4Pv0l8mZ+UW/uk8PPDmTp3foKTc5ExZ9fNWzwzTs9J6nrDAjFxZ9nIYts+vI/gW4T9esNA0bd3JmUi/y7HzegM/nLC8Oc+/nj4+zAjQ6/t5wKcp8A87L4mXD5ZJlFwVodNx22aoNuLLLFn2X7bm12u63Vltbq8G3VuXCRdAFXdAFXdAFXdD1z9C76jLvo9/Wh8t9zG5G7qfCNKFnj7kVeDln0KErEPrlPrcCL+cL9MDox+/05Qw9MvpwmIFeztChC7qgC7qgC7qgC7qgC7qgC7qgC7qgQ4cOHTp06NAFXdAFXdAFXdAFXdAFXdAFXdAFHTp06NChQ4cu6IIu6IIu6IIu6IIu6IIu6IIu6NChQ4cOHTp0QRd0QRd0QRd0QRd0QRd0QRd0QYcOHTp06NChC7qgC7qgC7qgC7qgC7qgC7qgC7qgQ4cOHTp0QRd0QRd0QRd0QRd0QRd0QRd0QRd06NChQ4cOHbqgC7qgC7qgC7qgC7qgC7qgC7qgQ4cOHTp06NAFXdAFXdAFXdAFXdAFXdAFXdAFHTp06NChQ4cu6IIu6IIu6IIu6IIu6IIu6IIu6NChQ4cOHTp0QRd0QRd0QRd0QRd0QRd0QRd0QRd06NChQ4cu6IIu6IIu6IIu6IIu6IIu6IIu6IIOHTp06NChQxd0QRd0QRd0QRd0QRd0QRd0QRd06NChQ4cOHbqgC7qgC7qgC7qgC7qgC7qgC7qgQ4cOHTp06NAFXdAFXdAFXdAFXdAFXdAFXdAFHTp06NChQ4cu6IIu6IIu6IIu6IIu6IIu6IIu6IIOHTp06NAFXdAFXdAFXdAFXdAFXdAFXdAFXdChQ4cOHTp06IIu6IIu6IIu6IIu6IIu6IIu6IIOHTp06NChQxd0QRd0QRd0QRd0QRd0QRd0QRd06NChQ4cOHbqgC7qgC7qgC7qgC7qgC7qgC7qgQ4cOHTp06NAFXdAFXdAFXdAFXdAFXdAFXdAFXdChQ4cOHbqgC7qgC7qgC7qgC7qgC7qgC7qgCzp06NChQ4cOXdAFXdAFXdAFXdAFXdAFXdAFXdChQ4cOHTp06IIu6IIu6IIu6IIu6IIu6IIu6IIOHTp06NChQxd0QRd0QRd0QRd0QRd0QRd0QRd06NChQ4cOHbqgC7qgC7qgC7qgC7qgC7qgC7qgCzp06NChQxd0QRd0QRd0QRd0QRd0QRd0QRd0QYcOHTp06NCh639Hz4/otznokd/05fMKfJ+DHhg9e8ytwMs5gw5d3+CHXA49Zr8Awla3FK1rHB0AAAAASUVORK5CYII%3D";
	
	// Ajoute les styles CSS
	ajout_CSS();
	
	// Retire le cadre indiquant que le serveur est Beta.
	if($id('betaBox'))
		$id('betaBox').style.display = 'none';
	
	// créer le menu des options
	cr_option_liste();
	
	// Changer le titre de la page
	if(var_divers['replace_titre_page'] == "1")
		replace_titre_page();

	// Changer le logo "TRAVIAN"
	if(var_divers['replace_logo'] == "1")
		replace_logo();

	// Affiche les ressources manquantes pour construire le batiment
	if(var_divers['insert_build_page'] == "1")
		insert_build_page();

	// Remplace les cadres du héro et du joueur
	if(var_divers['replace_player'] == "1")
		replace_player();

	// Remplace le cadre de l'alliance
	if(var_divers['replace_allianz'] == "1" && var_divers['allianz'])
		replace_allianz();
	
	// Remplace le cadre des villages
	if(var_divers['replace_village'] == "1")
		replace_village();
	
	// Ajoute le cadre des barres de ressources
	if(var_divers['add_resource'] == "1")
		add_resource();
	
	// Ajoute les racourcis sur les pages de profils
	// if(var_divers['page_php'] == "spieler" && var_divers['add_link_spieler'] == "1") {
	if(var_divers['page_php'] == "spieler") {
		add_link_spieler();
		}
		
	}

// ******************************************
// *** Fin du corps du script Multi-tools ***
// ******************************************



	

// ******************************************
// *** Début de déclaration des fonctions ***
// ******************************************

// Acces rapise à getElementById()
function $id(id_recherche) {
	return document.getElementById(id_recherche);
	}

// Acces rapise à getElementsByClassName()
function $class(class_recherche) {
	return document.getElementsByClassName(class_recherche);
	}

// Acces rapise à getElementsByTagName()
function $tag(class_recherche) {
	return document.getElementsByTagName(class_recherche);
	}

// Fonction servant à inscrire la log
function add_log(niveau,texte) {
	if(niveau<=var_divers['afficher_log'])
		console.log(texte);
	}

// Récupère l'id du monde
function get_world_id(){
	add_log(3,"get_world_id() > Début.");
	if(document.getElementsByTagName('script')[1].innerHTML.split("worldId = '")[1])
		data = document.getElementsByTagName('script')[1].innerHTML.split("worldId = '")[1].split("';")[0];
	else
		data = document.getElementsByTagName('script')[2].innerHTML.split("worldId = '")[1].split("';")[0];
	add_log(1,"get_world_id() > ID du monde en cours : " + data);
	add_log(3,"get_world_id() > Fin");
	return data;
	}

// Récupère le nom de la page php
function get_page_php() {
	add_log(3, "get_page_php() > Début.");
	var data = location.pathname.split("/")[1].split(".php")[0];
	add_log(1, "get_page_php() > Page en cours : " + data);
	add_log(3, "get_page_php() > Fin.");
	return data;
	}

// Récupère le nom de la page
function get_page_nom() {
	add_log(3, "get_page_nom() > Début.");
	var data = $id("content").className;
	add_log(1, "get_page_nom() > Nom de la page : " + data);
	add_log(3, "get_page_nom() > Fin.");
	return data;
	}

//Récupère l'ID de l'utilisateur
function get_user_id() {
	add_log(3, "get_user_id() > Début.");
	var data = $id('heroImage').src.split('uid=')[1].split('&')[0];
	add_log(1, "get_user_id() > ID de l'utilisateur : " + data);
	add_log(3, "get_user_id() > Fin.");
	return data;
	}

// Récupère le nom de l'alliance
function get_allianz() {
	add_log(3, "get_allianz() > Début.");
	var ma_liste = $id('side_info');
	var i = 0;
	var node_allianz = false;
	for(i = 0 ; i < ma_liste.childNodes.length; i++) {
		if(ma_liste.childNodes[i].innerHTML) {
			if(ma_liste.childNodes[i].innerHTML.split('allianz.php')[1])
				node_allianz = ma_liste.childNodes[i];
			}
		}
	if(node_allianz) {
		var tmp_ALLIANZ = node_allianz.getElementsByClassName('wrap')[0].innerHTML;
		add_log(1, "get_allianz() > Nom de l'alliance joueur : " + tmp_ALLIANZ);
		}
		
	else {
		var tmp_ALLIANZ = false;
		add_log(1, "get_allianz() > Joueur sans alliance");
		}
	add_log(3, "get_allianz() > Fin.");
	return tmp_ALLIANZ;
	}
	
// Initialisation des options
function initialise_options() {
	add_log(3, "initialise_options() > Début.");
	
	// Récupération des informations utilisateurs
	var ma_liste = $id('side_info');
	var i = 0;
	var node_user = false;
	for(i = 0 ; i < ma_liste.childNodes.length; i++) {
		if(ma_liste.childNodes[i].innerHTML) {
			if(ma_liste.childNodes[i].innerHTML.split('nationBig')[1])
				node_user = ma_liste.childNodes[i];
			}
		}
	var tmp_USER_NAME = node_user.getElementsByClassName('wrap')[0].innerHTML;
	add_log(3, "initialise_options() > Nom du joueur : " + tmp_USER_NAME);
	var tmp_RACE = node_user.innerHTML.split("nationBig nationBig")[1].split("\"")[0];
	add_log(3, "initialise_options() > ID de la race : " + tmp_RACE);
	
	// Récupèration des information sur la capitale
	var tmp_CAPITAL_POS = get_capitale_pos().split(",");
	var tmp_CAPITAL_X = tmp_CAPITAL_POS[0];
	add_log(3, "initialise_options() > Position X de la capitale : " + tmp_CAPITAL_X);
	var tmp_CAPITAL_Y = tmp_CAPITAL_POS[1];
	add_log(3, "initialise_options() > Position Y de la capitale : " + tmp_CAPITAL_Y);
	
	// Enregistrement des données dans GM
	set_option("USER_NAME", tmp_USER_NAME, 'TMT');
	set_option("RACE", tmp_RACE, 'TMT');
	set_option("CAPITAL_X",tmp_CAPITAL_X,'TMT');
	set_option("CAPITAL_Y",tmp_CAPITAL_Y,'TMT');
	add_log(3, "initialise_options() > Fin.");
	}
	
// Récupère la position de la capitale
function get_capitale_pos() {
	add_log(3, "get_capitale_pos() > Début.");
	var ma_liste = $id('villages');
	var i = 0;
	var node_tbody = false;
	for(i = 0 ; i < ma_liste.childNodes.length; i++) {
		if(ma_liste.childNodes[i].innerHTML) {
			if(ma_liste.childNodes[i].innerHTML.split('mainVillage')[1])
				node_tbody = i;
			}
		}
		
	if(node_tbody) {
		var node_tr = "";
		for(i = 0 ; i < ma_liste.childNodes[node_tbody].childNodes.length; i++) {
			if(ma_liste.childNodes[node_tbody].childNodes[i].innerHTML) {
				if(ma_liste.childNodes[node_tbody].childNodes[i].innerHTML.split('mainVillage')[1])
					node_tr += i+",";
				}
			}
		
		j=0;
		if(node_tr != "") {
			var nodes_tr = node_tr.split(',');
			for(j=0; j<nodes_tr.length-1;j++) {
				var node_td_v = "";
				var node_td_c = "";
				for(i = 0 ; i < ma_liste.childNodes[node_tbody].childNodes[nodes_tr[j]].childNodes.length; i++) {
					if(ma_liste.childNodes[node_tbody].childNodes[nodes_tr[j]].childNodes[i].innerHTML) {
						if(ma_liste.childNodes[node_tbody].childNodes[nodes_tr[j]].childNodes[i].innerHTML.split('</span></a>')[1])
							node_td_c = ma_liste.childNodes[node_tbody].childNodes[nodes_tr[j]].childNodes[i];
						}
					}
				
				if(isR2L) {
					cible_y = node_td_c.getElementsByTagName('span')[1].innerHTML.substring(0, node_td_c.getElementsByTagName('span')[1].innerHTML.length-1);
					cible_x = node_td_c.getElementsByTagName('span')[3].innerHTML.substring(1, node_td_c.getElementsByTagName('span')[3].innerHTML.length);
					}
				else {
					cible_x = node_td_c.getElementsByTagName('span')[1].innerHTML.substring(1, node_td_c.getElementsByTagName('span')[1].innerHTML.length);
					cible_y = node_td_c.getElementsByTagName('span')[3].innerHTML.substring(0, node_td_c.getElementsByTagName('span')[3].innerHTML.length-1);
					}
				}
			}
		}
	add_log(1, "get_capitale_pos() > Position de la capitale : " + cible_x + "," + cible_y);
	add_log(3, "get_capitale_pos() > Fin.");
	return cible_x + "," + cible_y;
	}

// Vérifie si une option existe
function existe(valeur) {
	if(valeur != false)
		return valeur; 
	else {
		add_log(1, "existe() > Au minimum une variable à besoin d'être initialisée.");
		document.location.pathname = "spieler.php?uid=" + var_divers['user_id'];
		}
	}

// Récupère le nombre de message non lu sur le forum.
function get_nbr_messages_allianz() {
	add_log(3, "get_nbr_messages_allianz() > Début.");
	var ma_liste = $id('side_info');
	var i = 0;
	var node_allianz = false;
	for(i = 0 ; i < ma_liste.childNodes.length; i++) {
		if(ma_liste.childNodes[i].innerHTML) {
			if(ma_liste.childNodes[i].innerHTML.split('allianz.php')[1])
				node_allianz = ma_liste.childNodes[i];
			}
		}
	if(node_allianz) {
		if(node_allianz.getElementsByClassName('bubble-content').length>0)
			var tmp_MSG = node_allianz.getElementsByClassName('bubble-content')[0].innerHTML;
		else
			var tmp_MSG = 0;
			}
	add_log(2, "get_nbr_messages_allianz() > Nombre de message(s) : " + tmp_MSG);
	add_log(3, "get_nbr_messages_allianz() > Fin.");
	return tmp_MSG;
	}

// Récupère le nombre de ressources et la limite des stock {Bois, Argile, Fer, Céréales, Dépot, Silo}
function get_ressources(){
	add_log(3, "get_ressources() > Début.");
	var data = new Array();
	data [0] = $id('l1').innerHTML.split("/")[0];
	data [1] = $id('l2').innerHTML.split("/")[0];
	data [2] = $id('l3').innerHTML.split("/")[0];
	data [3] = $id('l4').innerHTML.split("/")[0];
	data [4] = $id('l1').innerHTML.split("/")[1];
	data [5] = $id('l4').innerHTML.split("/")[1];
	add_log(2, "get_ressources() > Bois, Argile, Fer, Céréales, depot, silo : " + data);
	add_log(3, "get_ressources() > Fin.");
	return data;
	}

// Récupère la production horaire {Bois, Argile, Fer, Céréales}
function get_production() {
	add_log(3, "get_production() > Début.");
	console.log($id('res').innerHTML);
	var ma_liste = $id('res');
	var data = new Array();
	data [0] = ma_liste.innerHTML.split(":")[1].split("\"")[0];
	data [1] = ma_liste.innerHTML.split(":")[4].split("\"")[0];
	data [2] = ma_liste.innerHTML.split(":")[7].split("\"")[0];
	data [3] = ma_liste.innerHTML.split(":")[10].split("\"")[0];
	add_log(1, "get_production() > Production (Bois, Argile, Fer, Céréales) : " + data);
	add_log(3, "get_production() > Fin");
	return data;
	}

// Retirer les caractères spéciaux
function re_write(chaine) {
	return chaine.split('&amp;').join('&').split('&quot;').join('\'').split('&lt;').join('<').split('&gt;').join('>');
	}

// Récupère le nom du village actif
function get_village_actif() {
	add_log(3, "get_village_actif() > Début.");
	var ma_liste = $id('villageList');
	var i = 0;
	var node_villages_1 = false;
	for(i = 0 ; i < ma_liste.childNodes.length; i++) {
		if(ma_liste.childNodes[i].innerHTML) {
			if(ma_liste.childNodes[i].innerHTML.split('active')[1]) {
				node_villages_1 = ma_liste.childNodes[i];
				}
		}
			}
	var node_villages_2 = false;
	for(i = 0 ; i < node_villages_1.childNodes.length; i++) {
		if(node_villages_1.childNodes[i].innerHTML) {
			if(node_villages_1.childNodes[i].innerHTML.split('active')[1]) {
				node_villages_2 = node_villages_1.childNodes[i];
				}
			}
		}
	var node_villages_3 = false;
	for(i = 0 ; i < node_villages_2.childNodes.length; i++) {
		if(node_villages_2.childNodes[i].innerHTML) {
			if(node_villages_2.childNodes[i].innerHTML.split('active')[1]) {
				node_villages_3 = node_villages_2.childNodes[i];
				node_villages_3.innerHTML = re_write(node_villages_3.innerHTML);
				tmp_NEWDID = node_villages_2.childNodes[i].innerHTML.split("newdid=")[1].split("\"")[0].split("&")[0];
				}
			}
		}
	var node_villages_4 = document.createElement("div");
	for(i = 0 ; i < node_villages_3.childNodes.length; i++) {
		if(node_villages_3.childNodes[i].innerHTML) {
				tmp_NOM_VILLAGE = node_villages_3.childNodes[i].innerHTML;
				node_villages_4.innerHTML = node_villages_3.childNodes[i].title;
			}
		}
		
	
	if(isR2L) {
		tmp_Y = node_villages_4.getElementsByTagName('span')[2].innerHTML.substring(0, node_villages_4.getElementsByTagName('span')[2].innerHTML.length-1);
		tmp_X = node_villages_4.getElementsByTagName('span')[4].innerHTML.substring(1, node_villages_4.getElementsByTagName('span')[4].innerHTML.length);
		}
	else {
		tmp_X = node_villages_4.getElementsByTagName('span')[2].innerHTML.substring(1, node_villages_4.getElementsByTagName('span')[2].innerHTML.length);
		tmp_Y = node_villages_4.getElementsByTagName('span')[4].innerHTML.substring(0, node_villages_4.getElementsByTagName('span')[4].innerHTML.length-1);
		}
		
	add_log(1, "get_village_actif() > Nom du village, position X, position Y, Newdid : " + tmp_NOM_VILLAGE + "," + tmp_X + "," + tmp_Y + "," + tmp_NEWDID);
	add_log(3, "get_village_actif() > Fin.");
	return tmp_NOM_VILLAGE + ";,;," + tmp_X + ";,;," + tmp_Y + ";,;," + tmp_NEWDID;
	}
	
/*/ Renvoie la position du village						DISABLED
function position_village(texte) {
	add_log(3, "position_village(" + texte + ") > Début.");
	if(var_divers['beta_serveur'] == "1") {
		if (texte[0].split("xCoord\">(")[1]) {
			var village_coupe_x = texte[0].split("xCoord\">(")[1].split("</span")[0];
			var village_coupe_y = texte[0].split("yCoord\">")[1].split(")")[0];
			}
		else {
			var village_coupe_x = texte[0].split("coordinateX\">(")[1].split("</span")[0];
			var village_coupe_y = texte[0].split("coordinateY\">")[1].split(")")[0];
			}
		}
	else {
		var village_coupe_x = texte[0].split("(")[1].split("|")[0];
		var village_coupe_y = texte[0].split("|")[1].split(")")[0];
		}
	
	var data = new Array(village_coupe_x,village_coupe_y);
	add_log(3, "position_village(" + texte + ") > Terminé, position : " + data);
	return data;
	}*/
	
// Vérifie si le village en cours est la capitale
function test_capitale() {
	add_log(3, "test_capitale() > Début.");
	if(var_divers['capital_X'] == var_divers['village_actif_pos'][0] && var_divers['capital_Y'] == var_divers['village_actif_pos'][1]) {
		add_log(1, "test_capitale() > Ce village est la capitale.");
		add_log(3, "test_capitale() > Fin.");
		return true;
		}
	else {
		add_log(1, "test_capitale() > Ce village n'est pas la capitale.");
		add_log(3, "test_capitale() > Fin.");
		return false;
		}
	}
	
// Récupère la liste des villages
function village_liste() {
	add_log(3, "village_liste() > Début.");
	var ma_liste = $id('villageList');
	var village_liste_return = new Array();
	var i = 0;
	var node_villages_1 = false;
	for(i = 0 ; i < ma_liste.childNodes.length; i++) {
		if(ma_liste.childNodes[i].innerHTML) {
			if(ma_liste.childNodes[i].innerHTML.split('active')[1]) {
				node_villages_1 = ma_liste.childNodes[i];
				}
			}
		}
	var node_villages_2 = false;
	for(i = 0 ; i < node_villages_1.childNodes.length; i++) {
		if(node_villages_1.childNodes[i].innerHTML) {
			if(node_villages_1.childNodes[i].innerHTML.split('active')[1]) {
				node_villages_2 = node_villages_1.childNodes[i];
				}
			}
		}
	var node_villages_3 = false;
	for(i = 0 ; i < node_villages_2.childNodes.length; i++) {
		if(node_villages_2.childNodes[i].innerHTML) {
			if(node_villages_2.childNodes[i].innerHTML) {
				node_villages_3 = node_villages_2.childNodes[i];
				node_villages_3.innerHTML = re_write(node_villages_3.innerHTML);
				tmp_NEWDID = node_villages_2.childNodes[i].innerHTML.split("newdid=")[1].split("\"")[0].split("&")[0];
				
				var node_villages_4 = document.createElement("div");
				var j=0
				for(j = 0 ; j < node_villages_3.childNodes.length; j++) {
					if(node_villages_3.childNodes[j].innerHTML) {
							tmp_NOM_VILLAGE = node_villages_3.childNodes[j].innerHTML;
							node_villages_4.innerHTML = node_villages_3.childNodes[j].title;
						}
					}
				if(isR2L) {
					tmp_Y = node_villages_4.getElementsByTagName('span')[2].innerHTML.substring(0, node_villages_4.getElementsByTagName('span')[2].innerHTML.length-1);
					tmp_X = node_villages_4.getElementsByTagName('span')[4].innerHTML.substring(1, node_villages_4.getElementsByTagName('span')[4].innerHTML.length);
					}
				else {
					tmp_X = node_villages_4.getElementsByTagName('span')[2].innerHTML.substring(1, node_villages_4.getElementsByTagName('span')[2].innerHTML.length);
					tmp_Y = node_villages_4.getElementsByTagName('span')[4].innerHTML.substring(0, node_villages_4.getElementsByTagName('span')[4].innerHTML.length-1);
					}
					village_liste_return.push(tmp_NEWDID + ";,;," + tmp_X + ";,;," + tmp_Y + ";,;," + tmp_NOM_VILLAGE);
					add_log(3, "village_liste() > +1 village : " + tmp_NEWDID + "," + tmp_X + "," + tmp_Y + "," + tmp_NOM_VILLAGE);
				}
			}
		}
	add_log(3, "village_liste() > Fin.");
	return village_liste_return;
	}

// Retourne l'image correspondant à la race du joueur
function get_image_race(race) {
	add_log(3, "get_image_race() > Début.");
	switch (race) {
		case 1:
			add_log(1, "get_image_race() > Race 1, image Romain retournée.");
			add_log(3, "get_image_race() > Fin.");
			return var_images['peuple_romain'];
			break;
		case 2:
			add_log(1, "get_image_race() > Race 2, image Germain retournée.");
			add_log(3, "get_image_race() > Fin.");
			return var_images['peuple_germain'];
			break;
		case 3:
			add_log(1, "get_image_race() > Race 3, image Gaulois retournée.");
			add_log(3, "get_image_race() > Fin.");
			return var_images['peuple_gaulois'];
			break;
		default:
			add_log(1, "get_image_race() > Race inconue, image Natar retournée.");
			add_log(3, "get_image_race() > Fin.");
			return var_images['peuple_natar'];
			break;
		}
	}

// Création de la liste des option
function cr_option_liste() {
	add_log(3, "cr_option_liste() > Début.");
	var div_content_bis = $cr_d($id('contentOuterContainer').innerHTML,[['id', 'content_bis']]);
	var div_content_ter = $cr_d('',[['id', 'content_ter'],['style', 'z-index: 900;']]);
	$id('contentOuterContainer').innerHTML= "";
	$id('contentOuterContainer').appendChild(div_content_ter);
	$id('contentOuterContainer').appendChild(div_content_bis);
	
	var opt_boutton = $cr_table([['id', 'option_boutton'],['class', 'option_boutton'],['cellspacing', '0'],['cellpadding', '0']]);
	var opt_ligne = $cr_tr();
	if(isR2L) {
		var opt_cel_3 = $cr_td([['id', 'option_boutton_ga'],['class', 'option_boutton_ga']]);
		var opt_cel_1 = $cr_td([['id', 'option_boutton_dr'],['class', 'option_boutton_dr']]);
		}
	else {
		var opt_cel_1 = $cr_td([['id', 'option_boutton_ga'],['class', 'option_boutton_ga']]);
		var opt_cel_3 = $cr_td([['id', 'option_boutton_dr'],['class', 'option_boutton_dr']]);
		}
	var opt_cel_2 = $cr_td([['id', 'option_boutton_mi'],['class', 'option_boutton_mi']],langue_textes['options']);
	
	opt_ligne.appendChild(opt_cel_1);
	opt_ligne.appendChild(opt_cel_2);
	opt_ligne.appendChild(opt_cel_3);
	opt_boutton.appendChild(opt_ligne);
	opt_boutton.addEventListener("click", function () {option_affiche();}, true);
	opt_boutton.addEventListener("mouseover", function () {$id('option_boutton_ga').style.backgroundImage="url(" + var_images['bg_option_gauch2'] + ")";$id('option_boutton_ga').style.backgroundPosition = "3px 0px";$id('option_boutton_mi').style.backgroundImage="url(" + var_images['bg_option_milie2'] + ")";$id('option_boutton_dr').style.backgroundImage="url(" + var_images['bg_option_droit2'] + ")";$id('option_boutton_dr').style.backgroundPosition = "-3px 0px";}, true);
	opt_boutton.addEventListener("mouseout", function () {$id('option_boutton_ga').style.backgroundImage="url(" + var_images['bg_option_gauche'] + ")";$id('option_boutton_ga').style.backgroundPosition = "0px 0px";$id('option_boutton_mi').style.backgroundImage="url(" + var_images['bg_option_milieu'] + ")";$id('option_boutton_dr').style.backgroundImage="url(" + var_images['bg_option_droite'] + ")";$id('option_boutton_dr').style.backgroundPosition = "0px 0px";}, true);
	
	opt_boutton.style.position = 'absolute';
	opt_boutton.style.top = '0px';
	if(isR2L)
		opt_boutton.style.right = '20px';
	else
		opt_boutton.style.left = '20px';
	$id('wrapper').appendChild(opt_boutton);
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	// Passe les éléments derrière les options
	$id('anwersQuestionMark').style.zIndex='850';
	
	// Parametres d'option
	var opt_param = [
		[1, "options_various", "TR", "", -1],
			[2, "replace_titre_page", "SEL", new Array(langue_textes['no'],langue_textes['yes']), 'replace_titre_page'],
			[2, "replace_logo", "SEL", new Array(langue_textes['no'],langue_textes['yes']), 'replace_logo'],
//			[2, "insert_build_page", "SEL", new Array(langue_textes['no'],langue_textes['yes']), 'insert_build_page'],
			[2, "afficher_log", "SEL", new Array('0', '1', '2', '3'), 'afficher_log'],
		[1, "options_right_side", "TR", "", -1],
			[2, "replace_player", "SEL", new Array(langue_textes['no'],langue_textes['yes']), 'replace_player'],
			[2, "replace_allianz", "SEL", new Array(langue_textes['no'],langue_textes['yes']), 'replace_allianz'],
			[2, "replace_village", "SEL", new Array(langue_textes['no'],langue_textes['yes']), 'replace_village'],
			[2, "defense_village", "SEL", new Array(langue_textes['no'],langue_textes['yes']), 'defense_village'],
			[2, "merchant_village", "SEL", new Array(langue_textes['no'],langue_textes['yes']), 'merchant_village'],
			[2, "add_resource", "SEL", new Array(langue_textes['no'],langue_textes['yes']), 'add_resource'],
			[2, "position_resource", "SEL", new Array(langue_textes['before_village'],langue_textes['after_village']), 'position_resource'],
		];
		
	var option_table_global = 	$cr_table([['id', 'option_table'],['class', 'option_table'],['cellspacing', '0'],['cellpadding', '0']]);
	var option_ligne_global = 		$cr_tr();
	var option_cellule_globale = 		$cr_td([['class', 'option_titr2']]);
	var option_table_titre = 				$cr_table([['class', 'option_titre'],['cellspacing', '0'],['cellpadding', '0']]);
	var option_ligne_titre = 					$cr_tr();
	var option_cellule_titre_gauche =				$cr_th([['class', 'option_titre']],langue_textes['options']);
	var option_cellule_titre_droite =				$cr_th([['class', 'option_titre'], ['width', '50px'], ['style','valign:left']]);
	var opt_img_close = $cr_img	([['src', var_images['vide']], ['id','option_fermer'], ['class','option_fermer']]);
	opt_img_close.addEventListener("click", function () {option_fermer();}, true);
	opt_img_close.addEventListener("mouseover", function () {$id('option_fermer').style.backgroundColor='#EEEEFF';}, true);
	opt_img_close.addEventListener("mouseout", function () {$id('option_fermer').style.backgroundColor='transparent';}, true);
	
	option_cellule_titre_droite.appendChild(opt_img_close);
	option_ligne_titre.appendChild(option_cellule_titre_gauche);
	option_ligne_titre.appendChild(option_cellule_titre_droite);
	option_table_titre.appendChild(option_ligne_titre);
	option_cellule_globale.appendChild(option_table_titre);
	option_ligne_global.appendChild(option_cellule_globale);
	option_table_global.appendChild(option_ligne_global);
	
	
	option_ligne_global = 		$cr_tr();
	option_cellule_globale = 		$cr_td([['class', 'option_contenu']]);
	var option_table_contenu = 			$cr_table([['id', 'option_table2'],['class', 'option_titre'],['cellspacing', '0'],['cellpadding', '0']]);
	for (var i = 0; i < opt_param.length; i++) {
		if (opt_param[i][0] == 1) {
			opt_ligne = $cr_tr(opt_param[i][2]);
			opt_cel_1 = $cr_td([['class', 'option_titre'], ['colspan', '2']], langue_textes[opt_param[i][1]]);
			opt_ligne.appendChild(opt_cel_1);
			option_table_contenu.appendChild(opt_ligne);
			}
		else if (opt_param[i][0] == 2) {
			opt_ligne = $cr_tr();
			opt_cel_1 = $cr_td([['class', 'option_texte']], langue_textes[opt_param[i][1]]);
			opt_cel_2 = $cr_td([['class', 'option_texte']]);
       
			if (opt_param[i][4] != -1) 
				aValue = var_divers[opt_param[i][4]];
			sVal = (aValue != "false" ? aValue : '');
			switch (opt_param[i][2]) {
				case "SEL":
					pS = $cr_elem('SELECT', [['id', opt_param[i][1]], ['class','cursor_hand'], ['name', opt_param[i][1]]]);
					for (var xi = 0; xi < opt_param[i][3].length; xi++) pS.options[xi] = new Option(opt_param[i][3][xi], xi, false, false);
					pS.selected = sVal;
					pS.value = parseInt(sVal);
					break;
				}
			opt_cel_2.appendChild(pS);
			opt_ligne.appendChild(opt_cel_1);
			opt_ligne.appendChild(opt_cel_2);
			option_table_contenu.appendChild(opt_ligne);
			}
		}
	
	option_cellule_globale.appendChild(option_table_contenu);
	option_ligne_global.appendChild(option_cellule_globale);
	option_table_global.appendChild(option_ligne_global);
	
	opt_save = $cr_input([['type','button'], ['class','cursor_hand'], ['value', langue_textes['save']]]);
	opt_save.addEventListener("click", function () {option_sauve();}, true);
	
	option_ligne_global = $cr_tr();
	option_cellule_globale = $cr_td([['class', 'option_save']]);
	option_cellule_globale.appendChild(opt_save);
	option_ligne_global.appendChild(option_cellule_globale);
	option_table_global.appendChild(option_ligne_global);
	
	option_table_global.style.position = 'absolute';
	// option_table_global.style.left = ($id('content_ter').offsetWidth - 605) + 'px';
	if(isR2L)
		option_table_global.style.left = '0px';
	else
		option_table_global.style.right = '0px';
	$id('content_ter').appendChild(option_table_global);
	add_log(3, "cr_option_liste() > Fin.");
	}

// Feuille de style CSS
function ajout_CSS() {
	add_log(3, "ajout_CSS() > Début.");
	var add_css = "";
	add_css += "table.option_table {width: 605px; visibility: hidden; z-index:900; border: solid 0px #000000; background-color: transparent; }";
	add_css += "table.option_titre {width: 100%; border: solid 0px #000000; background-color: transparent}";
	add_css += "th.option_titre {background-color: transparent; text-align: center; vertical-align: middle; height: 39px; font-weight: bold;}";
	add_css += "td.option_titr2 {background-color: transparent; background-image: url(" + var_images['bg_option_titre'] + "); background-position: 0px 0px;}";
	add_css += "td.option_contenu {background-color: transparent; background-image: url(" + var_images['bg_option_contenu'] + "); background-position: 0px 0px; background-repeat:repeat-y; padding-left: 4px; padding-right: 4px; }";
	add_css += "td.option_save {text-align: center; height: 35px; background-color: transparent; background-image: url(" + var_images['bg_option_save'] + "); background-position: 0px -5px; padding-bottom: 10px; padding-top: 3px; padding-left: 4px; padding-right: 4px; }";
	add_css += "td.option_titre {background-color: transparent; text-align: center; font-weight: bold; border: solid 0px #000000; border-top-width: 1px; }";
	add_css += "td.option_texte {background-color: transparent; text-align: left; border: solid 0px #CCCCFF; padding: 2px; }";
	add_css += ".cursor_hand {cursor: pointer;}";
	add_css += "table.option_boutton {width: 250px; background-color: transparent; height: 22px; z-index:900; border: 0px; cursor: pointer;}";
	add_css += "td.option_boutton_ga {width: 10px; background-color: transparent; background-image: url(" + var_images['bg_option_gauche'] + ");}";
	add_css += "td.option_boutton_mi {text-align: center; font-style: italic; font-weight: bold; font-size: 12px; color: #CC5500; background-color: transparent; background-image: url(" + var_images['bg_option_milieu'] + "); background-repeat:repeat-x; }";
	add_css += "td.option_boutton_dr {width: 10px; background-color: transparent; background-image: url(" + var_images['bg_option_droite'] + "); }";
	add_css += "img.option_fermer {cursor: pointer; height: 32px; width: 32px; background-image: url(" + var_images['boutton_fermer_off'] + "); background-position: 0px 0px }";
	add_css += "table.cadres_side{background-color: transparent; width: 100%; border: solid 0px #000000; height: 30px }";
	add_css += "td.cadres_side{border: 0px; text-align: center; font-weight: bold; background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -40px -40px; }";
	add_css += "td.cadres_side_t1 {width: 10px;  background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: 0px 0px; }";
	add_css += "td.cadres_side_t2 {width: 180px; background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -40px 0px; height: 9px; }";
	add_css += "td.cadres_side_t3 {width: 10px;  background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -20px 0px; }";
	add_css += "td.cadres_side_m1 {width: 10px;  background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -1px -40px; }";
	add_css += "td.cadres_side_m2 {text-align: center; font-weight: bold; background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -40px -40px; }";
	add_css += "td.cadres_side_m3 {text-align: center; width: 30px;  background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -40px -40px; }";
	add_css += "td.cadres_side_m4 {text-align: center; width: 30px;  background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -40px -40px; }";
	add_css += "td.cadres_side_m5 {text-align: center; width: 10px;  background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -20px -40px; }";
	add_css += "td.cadres_sideV_m2{text-align: left; font-weight: 400; background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -40px -40px; }";
	add_css += ".village_side   {text-align: left; background-color: transparent; background-image: none}";
	add_css += "th.cadres_side_m1 {width: 10px; border: solid 0px #AAAAAA; border-bottom-width: 1px; background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -1px -40px; }";
	add_css += "th.cadres_side_m2 {text-align: center; border: solid 0px #AAAAAA; border-bottom-width: 1px; padding-bottom: 2px; font-weight: bold; background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -40px -40px; }";
	add_css += "th.cadres_side_m5 {width: 10px; border: solid 0px #AAAAAA; border-bottom-width: 1px;   background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -20px -40px; }";
	add_css += "td.cadres_side_b1 {width: 10px;  background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: 0px -20px; }";
	add_css += "td.cadres_side_b2 {width: 180px; background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -40px -20px; height: 9px; }";
	add_css += "td.cadres_side_b3 {width: 10px;  background-color: transparent; background-image: url(" + var_images['cadre'] + "); background-position: -20px -20px; }";
	if(isR2L) {
		add_css += "td.res_side_t1 {padding: 0px; margin: 0px; background-color: transparent; border: solid 0px #AAAAAA; border-bottom-width: 1px; height: 10px}";
		add_css += "td.res_side_t2 {padding: 0px; margin: 0px; background-color: transparent; border: solid 0px #AAAAAA; border-bottom-width: 1px; border-right-width: 1px; text-align: left; }";
		add_css += "td.res_side_m1 {padding: 0px; margin: 0px; background-color: transparent; border: solid 0px #AAAAAA; border-bottom-width: 1px; width: 20px;}";
		add_css += "td.res_side_m2 {padding: 0px; margin: 0px; background-color: transparent; border: solid 0px #AAAAAA; border-bottom-width: 1px; border-right-width: 1px; text-align: left; height: 10px; width: 110px;}";
		add_css += "td.res_side_m3 {padding: 0px; margin: 0px; border: solid 0px #AAAAAA; border-bottom-width: 1px; border-right-width: 1px; text-align: left; height: 5px; width: 10%}";
		add_css += "td.res_side_m4 {padding: 0px; margin: 0px; background-color: #CCCCCC; border: solid 0px #AAAAAA; border-bottom-width: 1px; text-align: left; width: 90%;}";
		add_css += "td.res_side_m5 {padding: 0px; margin: 0px; background-color: transparent; border: solid 0px #AAAAAA; border-bottom-width: 1px; border-right-width: 1px; text-align: center;}";
		}
	else {
		add_css += "td.res_side_t1 {padding: 0px; margin: 0px; background-color: transparent; border: solid 0px #AAAAAA; border-bottom-width: 1px; height: 10px}";
		add_css += "td.res_side_t2 {padding: 0px; margin: 0px; background-color: transparent; border: solid 0px #AAAAAA; border-bottom-width: 1px; border-left-width: 1px; text-align: left; }";
		add_css += "td.res_side_m1 {padding: 0px; margin: 0px; background-color: transparent; border: solid 0px #AAAAAA; border-bottom-width: 1px; width: 20px;}";
		add_css += "td.res_side_m2 {padding: 0px; margin: 0px; background-color: transparent; border: solid 0px #AAAAAA; border-bottom-width: 1px; border-left-width: 1px; text-align: left; height: 10px; width: 110px;}";
		add_css += "td.res_side_m3 {padding: 0px; margin: 0px; border: solid 0px #AAAAAA; border-bottom-width: 1px; border-left-width: 1px; text-align: left; height: 5px; width: 10%}";
		add_css += "td.res_side_m4 {padding: 0px; margin: 0px; background-color: #CCCCCC; border: solid 0px #AAAAAA; border-bottom-width: 1px; text-align: left; width: 90%;}";
		add_css += "td.res_side_m5 {padding: 0px; margin: 0px; background-color: transparent; border: solid 0px #AAAAAA; border-bottom-width: 1px; border-left-width: 1px; text-align: center;}";
		}
	
	GM_addStyle(add_css);
	add_log(3, "ajout_CSS() > Fin.");
	}

// Affiche les options
function option_affiche(){
	if($id('option_table').style.visibility=='visible')
		option_fermer();
	else {
		$id('option_table').style.visibility='visible';
		}
	}

// Masque les options
function option_fermer(){
	$id('option_table').style.visibility='hidden';
	}

// Sauve les options
function option_sauve(){
	var liste_option = new Array("replace_titre_page", "replace_logo", /*"insert_build_page",*/ "afficher_log", "replace_player", "replace_allianz", "replace_village", "defense_village", "merchant_village", "add_resource", "position_resource");
	for (var i = 0; i < liste_option.length; i++) {
		set_option(liste_option[i], $id(liste_option[i]).value, 'TMT');
		}
	option_fermer();
	}

// // Changer le titre de la page
function replace_titre_page() {
	add_log(3,"replace_titre_page() > Début.");
	var nouv_titre = "[" + document.title.split(" ")[1].toUpperCase() + "] " + var_divers['village_actif_nom'] + " (" + var_divers['village_actif_pos'][0] + "|" + var_divers['village_actif_pos'][1] + ")";
	document.title = nouv_titre;
	add_log(1,"replace_titre_page() > Nouveau titre : " + nouv_titre);
	add_log(3,"replace_titre_page() > Fin.");
	}

// Remplace le logo original "TRAVIAN"
function replace_logo() {
	add_log(3,"replace_logo() > Début.");
	$id('logo').style.backgroundImage = "url(" + var_images['travian_revised'] + ")";
	add_log(1,"replace_logo() > Logo remplacé.");
	add_log(3,"replace_logo() > Fin.");
	}

// Affiche les ressources manquantes pour construire le batiment
function insert_build_page() {
	add_log(3,"insert_build_page() > Début.");
	add_log(1,"insert_build_page() > Fonction à venir.");
	add_log(3,"insert_build_page() > Fin.");
	}

// Remplace le cadre du héro et du joueur
function replace_player() {
	add_log(3,"replace_player() > Début.");
	if($id('staticElements'))
		$id('staticElements').style.background = "url(img/x.gif)";
		
	var div_hero = $id('heroImage').parentNode;
	div_hero.innerHTML= "<div style='visibility: hidden; height: 45px;'>" + div_hero.innerHTML + "</div>";
	div_hero.style.width = '200px';
	div_hero.style.height = '88px';
	
	var cadre_hero = $cr_table([['id', 'cadre_hero'],['class', 'cadres_side'],['cellspacing', '0'],['cellpadding', '0']]);
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_3 = $cr_td([['class', 'cadres_side_t1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_t3']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_t1']]);
		var hero_cel_3 = $cr_td([['class', 'cadres_side_t3']]);
		}
	var hero_cel_2 = $cr_td([['class', 'cadres_side_t2'],['colspan', '3']]);
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_3);
	cadre_hero.appendChild(hero_ligne);
	
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_5 = $cr_td([['class', 'cadres_side_m1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_m5']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_m1']]);
		var hero_cel_5 = $cr_td([['class', 'cadres_side_m5']]);
		}
		
	var hero_cel_2 = $cr_td([['id', 'my_hero'],['class', 'cadres_side_m2']]);
	var hero_lien = $cr_a(" ",[['href','hero_inventory.php']])
	var hero_img_hero = $cr_img([['src', var_images['troupes_special_03']]]);
	var hero_texte = $cr_s(" " + langue_textes['my_hero'])
	hero_lien.appendChild(hero_img_hero);
	hero_lien.appendChild(hero_texte);
	hero_lien.addEventListener("mouseover", function () {this.style.color='#22AA55'; $id('my_hero').style.backgroundImage='none'; $id('my_hero').style.backgroundColor='#BBFFBB';}, true);
	hero_lien.addEventListener("mouseout", function () {this.style.color='#000000'; $id('my_hero').style.backgroundImage="url('" + var_images['cadre'] + "')"; $id('my_hero').style.backgroundColor='transparent';}, true);
	hero_cel_2.appendChild(hero_lien);
	
	var hero_cel_3 = $cr_td([['id', 'adventure_hero'],['class', 'cadres_side_m3']]);
	var adventure_lien = $cr_a(" ",[['href','hero_adventure.php']])
	var hero_img_adventure = $cr_img([['src', var_images['hero_quete']]]);
	adventure_lien.appendChild(hero_img_adventure);
	adventure_lien.addEventListener("mouseover", function () {this.style.color='#22AA55'; $id('adventure_hero').style.backgroundImage='none'; $id('adventure_hero').style.backgroundColor='#BBFFBB';}, true);
	adventure_lien.addEventListener("mouseout", function () {this.style.color='#000000'; $id('adventure_hero').style.backgroundImage="url('" + var_images['cadre'] + "')"; $id('adventure_hero').style.backgroundColor='transparent';}, true);
	hero_cel_3.appendChild(adventure_lien);
	
	var hero_cel_4 = $cr_td([['id', 'auction_lien'],['class', 'cadres_side_m4']]);
	var auction_lien = $cr_a(" ",[['href','hero_auction.php']])
	var hero_img_auction = $cr_img([['src', var_images['hero_enchere']]]);
	auction_lien.appendChild(hero_img_auction);
	auction_lien.addEventListener("mouseover", function () {this.style.color='#22AA55'; $id('auction_lien').style.backgroundImage='none'; $id('auction_lien').style.backgroundColor='#BBFFBB';}, true);
	auction_lien.addEventListener("mouseout", function () {this.style.color='#000000'; $id('auction_lien').style.backgroundImage="url('" + var_images['cadre'] + "')"; $id('auction_lien').style.backgroundColor='transparent';}, true);
	hero_cel_4.appendChild(auction_lien);
	
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_3);
	hero_ligne.appendChild(hero_cel_4);
	hero_ligne.appendChild(hero_cel_5);
	cadre_hero.appendChild(hero_ligne);
	
	
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_3 = $cr_td([['class', 'cadres_side_b1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_b3']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_b1']]);
		var hero_cel_3 = $cr_td([['class', 'cadres_side_b3']]);
		}
	var hero_cel_2 = $cr_td([['class', 'cadres_side_b2'],['colspan', '3']]);
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_3);
	cadre_hero.appendChild(hero_ligne);
	
	cadre_hero.style.position = 'relative';
	if(isR2L)
		cadre_hero.style.right = '-30px';
	else
		cadre_hero.style.left = '-30px';
	div_hero.appendChild(cadre_hero);
		
	add_log(1,"replace_player() > Cadre héro remplacé");
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var div_player = $class('sideInfoPlayer')[0];
	div_player.innerHTML= "<div style='visibility: hidden; height: 0px;'>" + div_player.innerHTML + "</div>";
	
	var cadre_player = $cr_table([['id', 'cadre_player'],['class', 'cadres_side'],['cellspacing', '0'],['cellpadding', '0']]);
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_3 = $cr_td([['class', 'cadres_side_t1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_t3']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_t1']]);
		var hero_cel_3 = $cr_td([['class', 'cadres_side_t3']]);
		}
	var hero_cel_2 = $cr_td([['class', 'cadres_side_t2']]);
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_3);
	cadre_player.appendChild(hero_ligne);
	
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_5 = $cr_td([['class', 'cadres_side_m1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_m5']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_m1']]);
		var hero_cel_5 = $cr_td([['class', 'cadres_side_m5']]);
		}
		
	var hero_cel_2 = $cr_td([['id', 'my_player'],['class', 'cadres_side_m2']]);
	var hero_lien = $cr_a(" ",[['href',"spieler.php?uid=" + var_divers['user_id']]])
	var hero_img_hero = $cr_img([['src', var_images['race_joueur']]]);
	var hero_texte = $cr_s(" " + var_divers['user_name'])
	hero_lien.appendChild(hero_img_hero);
	hero_lien.appendChild(hero_texte);
	hero_lien.addEventListener("mouseover", function () {this.style.color='#22AA55'; $id('my_player').style.backgroundImage='none'; $id('my_player').style.backgroundColor='#BBFFBB';}, true);
	hero_lien.addEventListener("mouseout", function () {this.style.color='#000000'; $id('my_player').style.backgroundImage="url('" + var_images['cadre'] + "')"; $id('my_player').style.backgroundColor='transparent';}, true);
	hero_cel_2.appendChild(hero_lien);
	
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_5);
	cadre_player.appendChild(hero_ligne);
	
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_3 = $cr_td([['class', 'cadres_side_b1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_b3']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_b1']]);
		var hero_cel_3 = $cr_td([['class', 'cadres_side_b3']]);
		}
	var hero_cel_2 = $cr_td([['class', 'cadres_side_b2']]);
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_3);
	cadre_player.appendChild(hero_ligne);
	
	cadre_player.style.position = 'relative';
	if(isR2L)
		cadre_player.style.right = '-30px';
	else
		cadre_player.style.left = '-30px';
	div_hero.appendChild(cadre_player);
	
	add_log(1,"replace_player() > Cadre Joueur remplacé");
	
	add_log(3,"replace_player() > Fin.");
	}

// Remplace le cadre de l'alliance
function replace_allianz() {
	add_log(3,"replace_allianz() > Début.");
	var div_allianz = $class('sideInfoAlly')[0];
	div_allianz.style.backgroundImage= 'none';
	div_allianz.innerHTML= "<div style='visibility: hidden; height: 0px;'>" + div_allianz.innerHTML + "</div>";
	div_allianz.style.width = '200px';
	div_allianz.style.height = '50px';
	
		
	var cadre_allianz = $cr_table([['id', 'cadre_allianz'],['class', 'cadres_side'],['cellspacing', '0'],['cellpadding', '0']]);
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_3 = $cr_td([['class', 'cadres_side_t1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_t3']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_t1']]);
		var hero_cel_3 = $cr_td([['class', 'cadres_side_t3']]);
		}
	var hero_cel_2 = $cr_td([['class', 'cadres_side_t2'],['colspan', '2']]);
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_3);
	cadre_allianz.appendChild(hero_ligne);
	
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_5 = $cr_td([['class', 'cadres_side_m1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_m5']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_m1']]);
		var hero_cel_5 = $cr_td([['class', 'cadres_side_m5']]);
		}
		
	var hero_cel_2 = $cr_td([['id', 'forum_ally'],['class', 'cadres_side_m3']]);
	var hero_lien = $cr_a(" ",[['href','allianz.php?s=2']])
	var hero_img_hero = $cr_img([['src', var_images['alliance_blason']]]);
	hero_lien.appendChild(hero_img_hero);
	hero_lien.addEventListener("mouseover", function () {this.style.color='#22AA55'; $id('forum_ally').style.backgroundImage='none'; $id('forum_ally').style.backgroundColor='#BBFFBB';}, true);
	hero_lien.addEventListener("mouseout", function () {this.style.color='#000000'; $id('forum_ally').style.backgroundImage="url('" + var_images['cadre'] + "')"; $id('forum_ally').style.backgroundColor='transparent';}, true);
	hero_cel_2.appendChild(hero_lien);
	
	var hero_cel_3 = $cr_td([['id', 'info_ally'],['class', 'cadres_side_m2']]);
	var adventure_lien = $cr_a(" ",[['href','allianz.php']])
	var hero_texte = $cr_s(" " + var_divers['allianz'])
	adventure_lien.appendChild(hero_texte);
	adventure_lien.addEventListener("mouseover", function () {this.style.color='#22AA55'; $id('info_ally').style.backgroundImage='none'; $id('info_ally').style.backgroundColor='#BBFFBB';}, true);
	adventure_lien.addEventListener("mouseout", function () {this.style.color='#000000'; $id('info_ally').style.backgroundImage="url('" + var_images['cadre'] + "')"; $id('info_ally').style.backgroundColor='transparent';}, true);
	hero_cel_3.appendChild(adventure_lien);
	
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_3);
	hero_ligne.appendChild(hero_cel_5);
	cadre_allianz.appendChild(hero_ligne);
	
	
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_3 = $cr_td([['class', 'cadres_side_b1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_b3']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_b1']]);
		var hero_cel_3 = $cr_td([['class', 'cadres_side_b3']]);
		}
	var hero_cel_2 = $cr_td([['class', 'cadres_side_b2'],['colspan', '2']]);
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_3);
	cadre_allianz.appendChild(hero_ligne);
	
	cadre_allianz.style.position = 'relative';
	if(isR2L)
		cadre_allianz.style.right = '-3px';
	else
		cadre_allianz.style.left = '-3px';
	div_allianz.appendChild(cadre_allianz);
		
	add_log(1,"replace_allianz() > Cadre Alliance remplacé");
	
	add_log(3,"replace_allianz() > Fin.");
	}

// Remplace le cadre des villages
function replace_village() {
	add_log(3,"replace_village() > Début.");
	var div_villages = $id('villageList');
	div_villages.style.backgroundImage= 'none';
	div_villages.style.visibility='hidden';
	div_villages.style.height = '5px';
	div_villages = $id('side_info');
	
		
	var cadre_villages = $cr_table([['id', 'cadre_villages'],['class', 'cadres_side'],['cellspacing', '0'],['cellpadding', '0']]);
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_3 = $cr_td([['class', 'cadres_side_t1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_t3']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_t1']]);
		var hero_cel_3 = $cr_td([['class', 'cadres_side_t3']]);
		}
	var hero_cel_2 = $cr_td([['class', 'cadres_side_t2']]);
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_3);
	cadre_villages.appendChild(hero_ligne);
	
	
	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_5 = $cr_th([['class', 'cadres_side_m1']]);
		var hero_cel_1 = $cr_th([['class', 'cadres_side_m5']]);
		}
	else {
		var hero_cel_1 = $cr_th([['class', 'cadres_side_m1']]);
		var hero_cel_5 = $cr_th([['class', 'cadres_side_m5']]);
		}
		
	var hero_cel_2 = $cr_th([['class', 'cadres_side_m2']]);
	var hero_lien = $cr_a(" ",[['href',"dorf3.php"]])
	var hero_img_hero = $cr_img([['src', var_images['village_icone']]]);
	var hero_img_hero2 = $cr_img([['src', var_images['village_icone']]]);
	var hero_texte = $cr_s(" " + langue_textes['villages'] + " ")
	hero_lien.appendChild(hero_img_hero);
	hero_lien.appendChild(hero_texte);
	hero_lien.appendChild(hero_img_hero2);
	hero_cel_2.appendChild(hero_lien);
	
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_5);
	cadre_villages.appendChild(hero_ligne);

	
	var ma_liste = $id('villageList');
	var village_liste_return = new Array();
	var i = 0;
	var node_villages_1 = false;
	for(i = 0 ; i < ma_liste.childNodes.length; i++) {
		if(ma_liste.childNodes[i].innerHTML) {
			if(ma_liste.childNodes[i].innerHTML.split('active')[1]) {
				node_villages_1 = ma_liste.childNodes[i];
				}
			}
		}
	var node_villages_2 = false;
	for(i = 0 ; i < node_villages_1.childNodes.length; i++) {
		if(node_villages_1.childNodes[i].innerHTML) {
			if(node_villages_1.childNodes[i].innerHTML.split('active')[1]) {
				node_villages_2 = node_villages_1.childNodes[i];
				}
			}
		}
	var node_villages_3 = false;
	for(i = 0 ; i < node_villages_2.childNodes.length; i++) {
		if(node_villages_2.childNodes[i].innerHTML) {
			if(node_villages_2.childNodes[i].innerHTML) {
				node_villages_3 = node_villages_2.childNodes[i];
				node_villages_3.innerHTML = re_write(node_villages_3.innerHTML);
				tmp_LINK = node_villages_2.childNodes[i].innerHTML.split("href=\"")[1].split("\"")[0];
				tmp_NEWDID = node_villages_2.childNodes[i].innerHTML.split("newdid=")[1].split("\"")[0].split("&")[0];

				
				var node_villages_4 = document.createElement("div");
				var j=0
				for(j = 0 ; j < node_villages_3.childNodes.length; j++) {
					if(node_villages_3.childNodes[j].innerHTML) {
							tmp_NOM_VILLAGE = node_villages_3.childNodes[j].innerHTML;
							node_villages_4.innerHTML = node_villages_3.childNodes[j].title;
						}
					}
				if(isR2L) {
					tmp_Y = node_villages_4.getElementsByTagName('span')[2].innerHTML.substring(0, node_villages_4.getElementsByTagName('span')[2].innerHTML.length-1);
					tmp_X = node_villages_4.getElementsByTagName('span')[4].innerHTML.substring(1, node_villages_4.getElementsByTagName('span')[4].innerHTML.length);
					}
				else {
					tmp_X = node_villages_4.getElementsByTagName('span')[2].innerHTML.substring(1, node_villages_4.getElementsByTagName('span')[2].innerHTML.length);
					tmp_Y = node_villages_4.getElementsByTagName('span')[4].innerHTML.substring(0, node_villages_4.getElementsByTagName('span')[4].innerHTML.length-1);
					}
					village_liste_return.push(tmp_NEWDID + ";,;," + tmp_X + ";,;," + tmp_Y + ";,;," + tmp_NOM_VILLAGE);				
				
				var hero_ligne = $cr_tr();
				if(isR2L) {
					var hero_cel_5 = $cr_td([['class', 'cadres_side_m1']]);
					var hero_cel_1 = $cr_td([['class', 'cadres_side_m5']]);
					}
				else {
					var hero_cel_1 = $cr_td([['class', 'cadres_side_m1']]);
					var hero_cel_5 = $cr_td([['class', 'cadres_side_m5']]);
					}
				
				
				var tbl_vill = $cr_table([['class', 'village_side'],['cellspacing', '0'],['cellpadding', '0']])
				var lig_vill = $cr_tr();
				var cel_vil1 = $cr_td([['class', 'village_side']]);

				var hero_lien = $cr_a("",[['href',tmp_LINK]])
				var tbl_village = $cr_table([['class', 'village_side'],['cellspacing', '0'],['cellpadding', '0']])
				var lig_village = $cr_tr();
				var cel_villag1 = $cr_td([['class', 'village_side']],' ' + tmp_NOM_VILLAGE + ' ');
				var cel_villag2 = $cr_td([['class', 'village_side']],'(');
				var cel_villag3 = $cr_td([['class', 'village_side']],tmp_X);
				var cel_villag4 = $cr_td([['class', 'village_side']],'|');
				var cel_villag5 = $cr_td([['class', 'village_side']],tmp_Y);
				var cel_villag6 = $cr_td([['class', 'village_side']],')');
				if(tmp_NEWDID == var_divers['village_actif_newdid']) {
					cel_villag1.style.fontWeight='bold';
					cel_villag2.style.fontWeight='bold';
					cel_villag3.style.fontWeight='bold';
					cel_villag4.style.fontWeight='bold';
					cel_villag5.style.fontWeight='bold';
					cel_villag6.style.fontWeight='bold';
					}
				lig_village.appendChild(cel_villag1);
				lig_village.appendChild(cel_villag2);
				if(isR2L) {
					lig_village.appendChild(cel_villag5);
					lig_village.appendChild(cel_villag4);
					lig_village.appendChild(cel_villag3);
					}
				else {
					lig_village.appendChild(cel_villag3);
					lig_village.appendChild(cel_villag4);
					lig_village.appendChild(cel_villag5);
					}
				lig_village.appendChild(cel_villag6);
				tbl_village.appendChild(lig_village);
				hero_lien.appendChild(tbl_village);
				
				cel_vil1.appendChild(hero_lien);
				
				var cel_vil2 = $cr_td([['class', 'village_side'],['width', '75%']],'');
				if(var_divers['defense_village'] == "1") {
					var img_def = $cr_img([['src', var_images['rapport_05']]]);
					var lien_def = $cr_a("",[['href',"a2b.php?x=" + tmp_X + "&y=" + tmp_Y + "&c=2"]])
					lien_def.appendChild(img_def);
					cel_vil2.appendChild(lien_def);
					}
				if(var_divers['merchant_village'] =="1") {
					var img_ech = $cr_img([['src', var_images['marche']]]);
					var lien_ech = $cr_a("",[['href',"build.php?x=" + tmp_X + "&y=" + tmp_Y + "&gid=17"]])
					lien_ech.appendChild(img_ech);
					cel_vil2.appendChild(lien_ech);
					}
				
				if(isR2L) {
					cel_vil2.style.textAlign='right';
					}
				lig_vill.appendChild(cel_vil1);
				lig_vill.appendChild(cel_vil2);
				tbl_vill.appendChild(lig_vill);
				
				
				var hero_cel_2 = $cr_td([['id', 'village' + i],['class', 'cadres_sideV_m2']]);
				hero_lien.addEventListener("mouseover", function () {this.style.color='#22AA55';}, true);
				hero_lien.addEventListener("mouseout", function () {this.style.color='#000000';}, true);
				hero_cel_2.appendChild(tbl_vill);
				
				hero_ligne.appendChild(hero_cel_1);
				hero_ligne.appendChild(hero_cel_2);
				hero_ligne.appendChild(hero_cel_5);
				cadre_villages.appendChild(hero_ligne);
				
				
				
				}
			}
		}


	var hero_ligne = $cr_tr();
	if(isR2L) {
		var hero_cel_3 = $cr_td([['class', 'cadres_side_b1']]);
		var hero_cel_1 = $cr_td([['class', 'cadres_side_b3']]);
		}
	else {
		var hero_cel_1 = $cr_td([['class', 'cadres_side_b1']]);
		var hero_cel_3 = $cr_td([['class', 'cadres_side_b3']]);
		}
	var hero_cel_2 = $cr_td([['class', 'cadres_side_b2']]);
	hero_ligne.appendChild(hero_cel_1);
	hero_ligne.appendChild(hero_cel_2);
	hero_ligne.appendChild(hero_cel_3);
	cadre_villages.appendChild(hero_ligne);
	
	cadre_villages.style.position = 'relative';
	if(isR2L)
		cadre_villages.style.right = '3px';
	else
		cadre_villages.style.left = '3px';
	cadre_villages.style.width = '200px';
	div_villages.appendChild(cadre_villages);
		
	add_log(1,"replace_villages() > Cadre Villages remplacé");
	
	add_log(3,"replace_villages() > Fin.");
	}

// Ajout de la barre de ressources
function add_resource() {
	add_log(3,"add_resource() > Début.");
	if(var_divers['position_resource'] == 1)
		var div_res_bar = $id('side_info');
	else {
		if(var_divers['allianz'])
			var div_res_bar = $class('sideInfoAlly')[0];
		else
			var div_res_bar = $class('sideInfoPlayer')[0];
		}
	
		
	var cadre_res_bar = $cr_table([['id', 'cadre_res_bar'],['class', 'cadres_side'],['cellspacing', '0'],['cellpadding', '0']]);
	var ligne = $cr_tr();
	
	if(isR2L) {
		var cel_3 = $cr_td([['class', 'cadres_side_t1']]);
		var cel_1 = $cr_td([['class', 'cadres_side_t3']]);
		}
	else {
		var cel_1 = $cr_td([['class', 'cadres_side_t1']]);
		var cel_3 = $cr_td([['class', 'cadres_side_t3']]);
		}
	var cel_2 = $cr_td([['class', 'cadres_side_t2']]);
	ligne.appendChild(cel_1);
	ligne.appendChild(cel_2);
	ligne.appendChild(cel_3);
	cadre_res_bar.appendChild(ligne);
	
	ligne = $cr_tr();
	if(isR2L) {
		var cel_5 = $cr_th([['class', 'cadres_side_m1']]);
		var cel_1 = $cr_th([['class', 'cadres_side_m5']]);
		}
	else {
		var cel_1 = $cr_th([['class', 'cadres_side_m1']]);
		var cel_5 = $cr_th([['class', 'cadres_side_m5']]);
		}
		
	var cel_2 = $cr_th([['class', 'cadres_side_m2']]);
	var texte = $cr_s(langue_textes['resources'])
	cel_2.appendChild(texte);
	
	ligne.appendChild(cel_1);
	ligne.appendChild(cel_2);
	ligne.appendChild(cel_5);
	cadre_res_bar.appendChild(ligne);
		
	var ligne = $cr_tr();
	if(isR2L) {
		var cel_3 = $cr_td([['class', 'cadres_side_m1']]);
		var cel_1 = $cr_td([['class', 'cadres_side_m5']]);
		}
	else {
		var cel_1 = $cr_td([['class', 'cadres_side_m1']]);
		var cel_3 = $cr_td([['class', 'cadres_side_m5']]);
		}
	var cel_2 = $cr_td([['class', 'cadres_side_m2']]);
	
	////////////////////////// Début tableau ressources
	var res_table = $cr_table([['id', 'res_table'],['class', 'cadres_side'],['cellspacing', '0'],['cellpadding', '0']]);
	/*
	var res_ligne = $cr_tr();
	var res_cel_1 = $cr_td([['class', 'res_side_t1']]);
	var res_cel_2 = $cr_td([['class', 'res_side_t1']]);
	var res_cel_3 = $cr_td([['class', 'res_side_t1']]);
	var res_cel_4 = $cr_td([['class', 'res_side_t2']],"/h");
	
	res_ligne.appendChild(res_cel_1);
	res_ligne.appendChild(res_cel_2);
	res_ligne.appendChild(res_cel_3);
	res_ligne.appendChild(res_cel_4);
	res_table.appendChild(res_ligne);
	*/
	
	////////////////////////// Ligne Bois
	var res_ligne = $cr_tr();
	var res_cel_1 = $cr_td([['id', 'res_bois_1'],['class', 'res_side_m1'],['rowspan','2']]);
	var res_cel_2 = $cr_td([['id', 'res_bois_2'],['class', 'res_side_m2']]);
		var res_per_table = $cr_table([['cellspacing', '0'],['cellpadding', '0']]);
		var res_per_ligne = $cr_tr();
		var res_per_cel_1 = $cr_td([['id', 'res_bois_3'],['class', 'res_side_m3']]);
		var res_per_cel_2 = $cr_td([['id', 'res_bois_4'],['class', 'res_side_m4']]);
	var res_cel_3 = $cr_td();
	res_per_ligne.appendChild(res_per_cel_1);
	res_per_ligne.appendChild(res_per_cel_2);
	res_per_table.appendChild(res_per_ligne);
	res_cel_3.appendChild(res_per_table);
	var res_cel_4 = $cr_td([['id', 'res_bois_5'],['class', 'res_side_m5'],['rowspan','2']]);
	
	res_img = $cr_img([['src', var_images['ressources_01']]]);
	res_cel_1.appendChild(res_img);
	res_ligne.appendChild(res_cel_1);
	res_ligne.appendChild(res_cel_2);
	res_ligne.appendChild(res_cel_4);
	res_table.appendChild(res_ligne);
	
	var res_ligne = $cr_tr();
	res_ligne.appendChild(res_cel_3);
	res_table.appendChild(res_ligne);
	
	////////////////////////// Ligne Argile
	var res_ligne = $cr_tr();
	var res_cel_1 = $cr_td([['id', 'res_argile_1'],['class', 'res_side_m1'],['rowspan','2']]);
	var res_cel_2 = $cr_td([['id', 'res_argile_2'],['class', 'res_side_m2']]);
		var res_per_table = $cr_table([['cellspacing', '0'],['cellpadding', '0']]);
		var res_per_ligne = $cr_tr();
		var res_per_cel_1 = $cr_td([['id', 'res_argile_3'],['class', 'res_side_m3']]);
		var res_per_cel_2 = $cr_td([['id', 'res_argile_4'],['class', 'res_side_m4']]);
	var res_cel_3 = $cr_td();
	res_per_ligne.appendChild(res_per_cel_1);
	res_per_ligne.appendChild(res_per_cel_2);
	res_per_table.appendChild(res_per_ligne);
	res_cel_3.appendChild(res_per_table);
	var res_cel_4 = $cr_td([['id', 'res_argile_5'],['class', 'res_side_m5'],['rowspan','2']]);
	
	res_img = $cr_img([['src', var_images['ressources_02']]]);
	res_cel_1.appendChild(res_img);
	res_ligne.appendChild(res_cel_1);
	res_ligne.appendChild(res_cel_2);
	res_ligne.appendChild(res_cel_4);
	res_table.appendChild(res_ligne);
	
	var res_ligne = $cr_tr();
	res_ligne.appendChild(res_cel_3);
	res_table.appendChild(res_ligne);
	
	////////////////////////// Ligne Fer
	var res_ligne = $cr_tr();
	var res_cel_1 = $cr_td([['id', 'res_fer_1'],['class', 'res_side_m1'],['rowspan','2']]);
	var res_cel_2 = $cr_td([['id', 'res_fer_2'],['class', 'res_side_m2']]);
		var res_per_table = $cr_table([['cellspacing', '0'],['cellpadding', '0']]);
		var res_per_ligne = $cr_tr();
		var res_per_cel_1 = $cr_td([['id', 'res_fer_3'],['class', 'res_side_m3']]);
		var res_per_cel_2 = $cr_td([['id', 'res_fer_4'],['class', 'res_side_m4']]);
	var res_cel_3 = $cr_td();
	res_per_ligne.appendChild(res_per_cel_1);
	res_per_ligne.appendChild(res_per_cel_2);
	res_per_table.appendChild(res_per_ligne);
	res_cel_3.appendChild(res_per_table);
	var res_cel_4 = $cr_td([['id', 'res_fer_5'],['class', 'res_side_m5'],['rowspan','2']]);
	
	res_img = $cr_img([['src', var_images['ressources_03']]]);
	res_cel_1.appendChild(res_img);
	res_ligne.appendChild(res_cel_1);
	res_ligne.appendChild(res_cel_2);
	res_ligne.appendChild(res_cel_4);
	res_table.appendChild(res_ligne);
	
	var res_ligne = $cr_tr();
	res_ligne.appendChild(res_cel_3);
	res_table.appendChild(res_ligne);
	
	////////////////////////// Ligne Céréales
	var res_ligne = $cr_tr();
	var res_cel_1 = $cr_td([['id', 'res_cc_1'],['class', 'res_side_m1'],['rowspan','2']]);
	var res_cel_2 = $cr_td([['id', 'res_cc_2'],['class', 'res_side_m2']]);
		var res_per_table = $cr_table([['cellspacing', '0'],['cellpadding', '0']]);
		var res_per_ligne = $cr_tr();
		var res_per_cel_1 = $cr_td([['id', 'res_cc_3'],['class', 'res_side_m3']]);
		var res_per_cel_2 = $cr_td([['id', 'res_cc_4'],['class', 'res_side_m4']]);
	var res_cel_3 = $cr_td();
	res_per_ligne.appendChild(res_per_cel_1);
	res_per_ligne.appendChild(res_per_cel_2);
	res_per_table.appendChild(res_per_ligne);
	res_cel_3.appendChild(res_per_table);
	var res_cel_4 = $cr_td([['id', 'res_cc_5'],['class', 'res_side_m5'],['rowspan','2']]);
	
	res_img = $cr_img([['src', var_images['ressources_04']]]);
	res_cel_1.appendChild(res_img);
	res_ligne.appendChild(res_cel_1);
	res_ligne.appendChild(res_cel_2);
	res_ligne.appendChild(res_cel_4);
	res_table.appendChild(res_ligne);
	
	var res_ligne = $cr_tr();
	res_ligne.appendChild(res_cel_3);
	res_table.appendChild(res_ligne);
	
	////////////////////////// Fin du tableau des ressources
	cel_2.appendChild(res_table);
	
	ligne.appendChild(cel_1);
	ligne.appendChild(cel_2);
	ligne.appendChild(cel_3);
	cadre_res_bar.appendChild(ligne);
	
	var ligne = $cr_tr();
	if(isR2L) {
		var cel_3 = $cr_td([['class', 'cadres_side_b1']]);
		var cel_1 = $cr_td([['class', 'cadres_side_b3']]);
		}
	else {
		var cel_1 = $cr_td([['class', 'cadres_side_b1']]);
		var cel_3 = $cr_td([['class', 'cadres_side_b3']]);
		}
	var cel_2 = $cr_td([['class', 'cadres_side_b2']]);
	
	ligne.appendChild(cel_1);
	ligne.appendChild(cel_2);
	ligne.appendChild(cel_3);
	cadre_res_bar.appendChild(ligne);
	
	cadre_res_bar.style.position = 'relative';
	if(var_divers['position_resource'] == 1) {
		if(isR2L)
			cadre_res_bar.style.right = '4px';
		else
			cadre_res_bar.style.left = '4px';
		}
	else{
		if(isR2L) {
			cadre_res_bar.style.right = '-3px';
			cadre_res_bar.style.top = '50px';
			}
		else
			cadre_res_bar.style.left = '-3px';
		var h_div = $id('villageList').offsetHeight;
		h_div += 127;					// Hauteur de la partie barre de ressources.
		h_div += 'px';
		$id('villageList').style.height = h_div;
		}
	cadre_res_bar.style.width = '200px';
	div_res_bar.appendChild(cadre_res_bar);
		
	add_log(1,"add_resource() > Barre de ressources ajoutée.");
	
	add_log(3,"add_resource() > Fin.");
	// Rafraichissement de la barre de ressources
	update_ressources_barre()
	setInterval(function(){update_ressources_barre();}, 10000);
	}
	
// Met à jour le contenu de la barre de ressources
function update_ressources_barre() {
	var upd_ressources = ['750','750','750','750'];
	var upd_capacite = ['800','800','800','800'];
	var upd_production = ['8','8','8','8'];
	var upd_occupe = ['10','10','10','10'];
	var upd_libre = ['90','90','90','90'];
	var upd_temps = [langue_textes['infinity'],langue_textes['infinity'],langue_textes['infinity'],langue_textes['infinity']];
	
	var get_ress = get_ressources();	// Bois, Argile, Fer, Céréales, depot, silo
	
	upd_ressource = [get_ress[0],get_ress[1],get_ress[2],get_ress[3]];
	upd_capacite = [get_ress[4],get_ress[4],get_ress[4],get_ress[5]];
	upd_production = [var_divers['production'][0],var_divers['production'][1],var_divers['production'][2],var_divers['production'][3]];
	upd_occupe = [Math.round(upd_ressource[0]/upd_capacite[0]*100),Math.round(upd_ressource[1]/upd_capacite[1]*100),Math.round(upd_ressource[2]/upd_capacite[2]*100),Math.round(upd_ressource[3]/upd_capacite[3]*100)];
	upd_libre = [upd_occupe[0]-100,upd_occupe[1]-100,upd_occupe[2]-100,upd_occupe[3]-100];
	upd_temps = [temps_restant(upd_production[0],upd_ressource[0],upd_capacite[0]),temps_restant(upd_production[1],upd_ressource[1],upd_capacite[1]),temps_restant(upd_production[2],upd_ressource[2],upd_capacite[2]),temps_restant(upd_production[3],upd_ressource[3],upd_capacite[3])];
	
	////////////////////////// MAJ Bois
	$id('res_bois_2').innerHTML = upd_occupe[0] + "% - " + upd_temps[0];
	$id('res_bois_3').style.width = upd_occupe[0] + '%';
	$id('res_bois_5').innerHTML = upd_production[0] + "/h";
	if(upd_occupe[0] >= 90)
		$id('res_bois_3').style.backgroundColor='#faf85b';	// Orange
	else
		$id('res_bois_3').style.backgroundColor='#33b23f';	// Vert
	if(upd_production[0] < 0)
		$id('res_bois_3').style.backgroundColor='#f40e2f';	// Rouge
	
	////////////////////////// MAJ Argile
	$id('res_argile_2').innerHTML = upd_occupe[1] + "% - " + upd_temps[1];
	$id('res_argile_3').style.width = upd_occupe[1] + '%';
	$id('res_argile_5').innerHTML = upd_production[1] + "/h";
	if(upd_occupe[1] >= 90)
		$id('res_argile_3').style.backgroundColor='#faf85b';	// Orange
	else
		$id('res_argile_3').style.backgroundColor='#33b23f';	// Vert
	if(upd_production[1] < 0)
		$id('res_argile_3').style.backgroundColor='#f40e2f';	// Rouge
	
	////////////////////////// MAJ Fer
	$id('res_fer_2').innerHTML = upd_occupe[2] + "% - " + upd_temps[2];
	$id('res_fer_3').style.width = upd_occupe[2] + '%';
	$id('res_fer_5').innerHTML = upd_production[2] + "/h";
	if(upd_occupe[2] >= 90)
		$id('res_fer_3').style.backgroundColor='#faf85b';	// Orange
	else
		$id('res_fer_3').style.backgroundColor='#33b23f';	// Vert
	if(upd_production[2] < 0)
		$id('res_fer_3').style.backgroundColor='#f40e2f';	// Rouge
	
	////////////////////////// MAJ Céréales
	$id('res_cc_2').innerHTML = upd_occupe[3] + "% - " + upd_temps[3];
	$id('res_cc_3').style.width = upd_occupe[3] + '%';
	$id('res_cc_5').innerHTML = upd_production[3] + "/h";
	if(upd_occupe[3] >= 90)
		$id('res_cc_3').style.backgroundColor='#faf85b';	// Orange
	else
		$id('res_cc_3').style.backgroundColor='#33b23f';	// Vert
	if(upd_production[3] < 0)
		$id('res_cc_3').style.backgroundColor='#f40e2f';	// Rouge
	
	}

// Calcule le temps restant avant que les dépots ou silo soient pleins
function temps_restant(production, occupation, limite) {
	if(production >= 0)
		var t1 = (limite - occupation) / production ;
	else
		var t1 = occupation / Math.abs(production) ;
	var t2 = Math.floor(t1);
	var t1 = (t1 - t2) * 60 ;
	var t3 = Math.floor(t1);
	var t1 = (t1 - t3) * 60 ;
	var t1 = Math.floor(t1);
	var t0 = t2;
	if(t3<"10"){
		t0 += ":0" + t3;
		}
	else {
		t0 += ":" + t3;
		}
	if(t1<"10"){
		t0 += ":0" + t1;
		}
	else {
		t0 +=  ":" + t1;
		}
	return t0;
	}

function add_link_spieler() {
	var ma_liste = $id('villages');
	var i = 0;
	var node_tbody = false;
	for(i = 0 ; i < ma_liste.childNodes.length; i++) {
		if(ma_liste.childNodes[i].innerHTML) {
			if(ma_liste.childNodes[i].innerHTML.split('karte')[1])
				node_tbody = i;
			}
		}
		
	if(node_tbody) {
		var node_tr = "";
		for(i = 0 ; i < ma_liste.childNodes[node_tbody].childNodes.length; i++) {
			if(ma_liste.childNodes[node_tbody].childNodes[i].innerHTML) {
				if(ma_liste.childNodes[node_tbody].childNodes[i].innerHTML.split('karte')[1])
					node_tr += i+",";
				}
			}
		
		j=0;
		if(node_tr != "") {
			var nodes_tr = node_tr.split(',');
			for(j=0; j<nodes_tr.length-1;j++) {
				var node_td_v = "";
				var node_td_c = "";
				for(i = 0 ; i < ma_liste.childNodes[node_tbody].childNodes[nodes_tr[j]].childNodes.length; i++) {
					if(ma_liste.childNodes[node_tbody].childNodes[nodes_tr[j]].childNodes[i].innerHTML) {
						if(ma_liste.childNodes[node_tbody].childNodes[nodes_tr[j]].childNodes[i].innerHTML.split('</span></a>')[1])
							node_td_c = ma_liste.childNodes[node_tbody].childNodes[nodes_tr[j]].childNodes[i];
						else 
							if(ma_liste.childNodes[node_tbody].childNodes[nodes_tr[j]].childNodes[i].innerHTML.split('<a href')[1])
								node_td_v = ma_liste.childNodes[node_tbody].childNodes[nodes_tr[j]].childNodes[i];
						}
					}

					if(isR2L) {
					cible_y = node_td_c.getElementsByTagName('span')[1].innerHTML.substring(0, node_td_c.getElementsByTagName('span')[1].innerHTML.length-1);
					cible_x = node_td_c.getElementsByTagName('span')[3].innerHTML.substring(1, node_td_c.getElementsByTagName('span')[3].innerHTML.length);
					}
				else {
					cible_x = node_td_c.getElementsByTagName('span')[1].innerHTML.substring(1, node_td_c.getElementsByTagName('span')[1].innerHTML.length);
					cible_y = node_td_c.getElementsByTagName('span')[3].innerHTML.substring(0, node_td_c.getElementsByTagName('span')[3].innerHTML.length-1);
					}
				
				//insérer les bouttons
				ajout="";
				ajout += " <a href=\"./a2b.php?x=" + cible_x + "&y=" + cible_y + "&c=2\" <img src='" + var_images['rapport_05'] + "' style='vertical-align: middle;' alt='langue_textes['send_assistance']' onMouseOver=\"this.style.cursor='pointer'\" onMouseOut=\"this.style.cursor='default'\"></a>";
				ajout += " <a href=\"./a2b.php?x=" + cible_x + "&y=" + cible_y + "&c=3\" <img src='" + var_images['rapport_02'] + "' style='vertical-align: middle;' alt='langue_textes['send_assistance']' onMouseOver=\"this.style.cursor='pointer'\" onMouseOut=\"this.style.cursor='default'\"></a>";
				ajout += " <a href=\"./a2b.php?x=" + cible_x + "&y=" + cible_y + "&c=4\" <img src='" + var_images['troupes_special_02'] + "' style='vertical-align: middle;' alt='langue_textes['send_assistance']' onMouseOver=\"this.style.cursor='pointer'\" onMouseOut=\"this.style.cursor='default'\"></a>";
				ajout += " <img src='" + var_images['marche'] + "' onclick=\"document.location='/build.php?x=" + cible_x + "&y=" + cible_y + "&gid=17'\" style='vertical-align: middle;' alt='langue_textes['send_merchand']' onMouseOver=\"this.style.cursor='pointer'\" onMouseOut=\"this.style.cursor='default'\">";
		
				node_td_v_split = node_td_v.innerHTML.split("</a>");
				node_td_v.innerHTML = node_td_v_split[0] + "</a>" + ajout + node_td_v_split[1];
				}
			}
		}
	}

// Vérifie si est bien connecté.
function get_connexion() {
	add_log(3, "get_connexion() > Début.");
	// Récupération du nom de la page en cours
	if($id("content").className=='login' || $id("content").className=='logout') {
		add_log(1, "get_connexion() > Vous n'êtes pas connecté.");
		add_log(3, "get_connexion() > Fin.");
		return true;
		}
	else {
		add_log(1, "get_connexion() > Vous êtes connecté.");
		add_log(3, "get_connexion() > Fin.");
		return false ;
		}
	}

function get_option(key, Valeur_defaut, type, base) {
	add_log(3,"get_option("+key+","+Valeur_defaut+","+type+","+base+") > Début.");
	var options = get_variable(base, '');
	options = options.split(",");
	var my_option = options.indexOf(key);
	if(my_option < 0) {
	add_log(2, "get_option("+key+","+Valeur_defaut+","+type+","+base+") > Echec, cette clé n'existe pas.");
		return Valeur_defaut;
		}
	switch(type) {
		case "boolean":
			var my_option = ( options[my_option + 1] == "true") ? true:false;
			break;
		case "integer":
			var my_option = parseInt(options[my_option + 1]);
			break;
		case "string":
		default:
			var my_option = options[my_option + 1];
			break;    
		}
	add_log(3, "get_option("+key+","+Valeur_defaut+","+type+","+base+"s) > Valeur : " + my_option);
	add_log(3, "get_option("+key+","+Valeur_defaut+","+type+","+base+"s) > Fin.");
	return my_option;
	}
  
function get_variable(nom, Valeur_defaut) {
	add_log(3,"get_variable("+nom+","+Valeur_defaut+") > Début.");
    if(!Valeur_defaut) { var Valeur_defaut = ''; }
    nom = var_divers['world_id'] + "_" + var_divers['user_id'] + "_" + nom;
    var data = GM_getValue(nom, Valeur_defaut);
    add_log(2, "get_variable("+nom+","+Valeur_defaut+") > Valeur : " + data);
    add_log(3, "get_variable("+nom+","+Valeur_defaut+") > Fin.");
    return data;
	}

function set_option(key, valeur, base) {
    add_log(3,"set_option("+key+","+valeur+","+base+") > Début.");
    var options = get_variable(base, '');
	if(options != '') options = options.split(",");
	else options = [];
    var my_option = options.indexOf(key);
	if(my_option < 0) {
		options.push(key);
		options.push(valeur);
		}
	else options[my_option + 1] = valeur;
    set_variable(base, options.join(","));
	add_log(3, "set_option("+key+","+valeur+","+base+") > Fin.");
	}

function set_variable(nom, valeur) {
	add_log(3,"set_variable("+nom+","+valeur+") > Début.");
    nom = var_divers['world_id'] + "_" + var_divers['user_id'] + "_" + nom;
    GM_setValue(nom, valeur);
    add_log(3, "set_variable("+nom+","+valeur+") > Fin.");
    return true;
}

// Récupère la langue du serveur
function detect_langue() {
	add_log(3, "detect_langue() > Début.");
	var serveur_split = location.hostname.split(".")
	var serveur_langue = serveur_split[serveur_split.length-1];
	add_log(1, "detect_langue() > Langue du serveur : " + serveur_langue + ".");
	add_log(3, "detect_langue() > Fin.");
	return serveur_langue;
	}

// Charge la traduction suivant la langue
function get_language(langue){
	// Langue par défaut : Anglais
	add_log(3, "get_language() > Début.");
	switch(langue_serveur) { 
		case "fr": // French
			// Les batiments :
			langue_batiments['1'] = "Bûcheron";
			langue_batiments['2'] = "Carrière d'argile";
			langue_batiments['3'] = "Mine de fer";
			langue_batiments['4'] = "Ferme";
			langue_batiments['5'] = "Scierie";
			langue_batiments['6'] = "Usine de poteries";
			langue_batiments['7'] = "Fonderie";
			langue_batiments['8'] = "Moulin";
			langue_batiments['9'] = "Boulangerie";
			langue_batiments['10'] = "Dépôt de ressources";
			langue_batiments['11'] = "Silo de céréales";
			langue_batiments['12'] = "Armurerie";
			langue_batiments['13'] = "Forge";
			langue_batiments['14'] = "Place du tournoi";
			langue_batiments['15'] = "Bâtiment principal";
			langue_batiments['16'] = "Place de rassemblement";
			langue_batiments['17'] = "Place du Marché";
			langue_batiments['18'] = "Ambassade";
			langue_batiments['19'] = "Caserne";
			langue_batiments['20'] = "Écurie";
			langue_batiments['21'] = "Atelier";
			langue_batiments['22'] = "Académie";
			langue_batiments['23'] = "Cachette";
			langue_batiments['24'] = "Hôtel de ville";
			langue_batiments['25'] = "Résidence";
			langue_batiments['26'] = "Palais";
			langue_batiments['27'] = "Chambre aux trésors";
			langue_batiments['28'] = "Comptoir de commerce";
			langue_batiments['29'] = "Grande caserne";
			langue_batiments['30'] = "Grande écurie";
			langue_batiments['31'] = "Mur d'enceinte";
			langue_batiments['32'] = "Mur de terre";
			langue_batiments['33'] = "Palissade";
			langue_batiments['34'] = "Tailleur de pierre";
			langue_batiments['35'] = "Brasserie";
			langue_batiments['36'] = "Fabricant de pièges";
			langue_batiments['37'] = "Manoir du héros";
			langue_batiments['38'] = "Grand dépôt";
			langue_batiments['39'] = "Grand silo";
			langue_batiments['40'] = "Merveille du monde";
			langue_batiments['41'] = "Abreuvoir";
			// Ressources
			langue_ressources['lumber'] = "Bois";
			langue_ressources['clay'] = "Argile";
			langue_ressources['iron'] = "Fer";
			langue_ressources['crop'] = "Céréales";
			// Taches
			langue_textes['build'] = "Construire le bâtiment";
			langue_textes['upgrade'] = "Augmenter";
			langue_textes['attack'] = "Attaque";
			langue_textes['research'] = "Rechercher";
			langue_textes['train'] = "Entrainer";
			langue_textes['party'] = "Fête";
			langue_textes['demolish'] = "Démolir";
			langue_textes['send_merchants'] = "Envoyer ressources";
			langue_textes['send_assistance'] = "Envoyer une assistance";
			// Textes					
			langue_textes['ressources'] = "Ressources";
			langue_textes['villages'] = "Villages";
			langue_textes['my_hero'] = "Mon héro";
			langue_textes['task_list'] = "Liste des tâches";
			langue_textes['options'] = "Options Multi-Tools";
			langue_textes['options_right_side'] = "Colonne de droite";
			langue_textes['replace_hero'] = "Remplacer le cadre du héro ?";
			langue_textes['replace_player'] = "Remplacer le cadre du joueur ?";
			langue_textes['replace_allianz'] = "Remplacer le cadre de l'alliance ?";
			langue_textes['replace_village'] = "Remplacer le cadre des villages ?";
			langue_textes['defense_village'] = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ajouter le raccourci \"envoyer défense\" ?";
			langue_textes['merchant_village'] = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ajouter le raccourci \"envoyer marchand\" ?";
			langue_textes['add_resource'] = "Ajouter le cadre des barres de ressource ?";
			langue_textes['position_resource'] = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Avant ou après les villages ?";
			langue_textes['no'] = "Non";
			langue_textes['yes'] = "Oui";
			langue_textes['before_village'] = "Avant les villages";
			langue_textes['after_village'] = "Après les villages";
			langue_textes['options_various'] = "Options diverses";
			langue_textes['replace_titre_page'] = "Remplacer le nom de la page ?";
			langue_textes['save'] = "Sauvegarder et fermer";
			langue_textes['replace_logo'] = "Remplacer le logo original ?";
			langue_textes['ready'] = "Prêt";
			langue_textes['never'] = "Jamais";
			langue_textes['required_resources'] = "Ressources nécessaires pour améliorer";
			langue_textes['insert_build_page'] = "Afficher les ressources manquantes dans les pages de construction ?";
			langue_textes['infinity'] = "Infini";
			langue_textes['upgrade_wharehouse'] = "Vous devez améliorer le dépot de ressources.";
			langue_textes['upgrade_granary'] = "Vous devez améliorer le dépot de céréales.";
			langue_textes['use_scheduler'] = "Utiliser le planificateur ?";
			langue_textes['afficher_log'] = "Niveau de log ?";
			langue_textes['add_build_list'] = "- Ajouter à la liste des constructions -";
			langue_textes['add_build_box_titre'] = "Ajouter une tâche (heure du serveur)";
			langue_textes['add_build_box_schedule'] = "Planifier à :";
			langue_textes['add_build_box_format'] = "(aaaa/mm/jj hh:mm:ss)";
			break;
		case "ir": // Persian by Mr_572
			// Buldings :
			langue_batiments['1'] = "هیزم شکن";
			langue_batiments['2'] = "آجر سازی";
			langue_batiments['3'] = "معدن آهن";
			langue_batiments['4'] = "گندم زار";
			langue_batiments['5'] = "چوب بری";
			langue_batiments['6'] = "آجرپزی";
			langue_batiments['7'] = "ذوب آهن";
			langue_batiments['8'] = "آسیاب";
			langue_batiments['9'] = "نانوایی";
			langue_batiments['10'] = "آنبار";
			langue_batiments['11'] = "آنبار غذا";
			langue_batiments['12'] = "اسلحه سازی";
			langue_batiments['13'] = "زره سازی";
			langue_batiments['14'] = "میدان تمرین";
			langue_batiments['15'] = "ساختمان اصلی";
			langue_batiments['16'] = "اردوگاه";
			langue_batiments['17'] = "بازار";
			langue_batiments['18'] = "سفارت";
			langue_batiments['19'] = "سربازخانه";
			langue_batiments['20'] = "اصطبل";
			langue_batiments['21'] = "کارگاه";
			langue_batiments['22'] = "دارالفنون";
			langue_batiments['23'] = "مخفیگاه";
			langue_batiments['24'] = "تالار شهر";
			langue_batiments['25'] = "اقامتگاه";
			langue_batiments['26'] = "قصر";
			langue_batiments['27'] = "خزانه";
			langue_batiments['28'] = "تجارتخانه";
			langue_batiments['29'] = "سربازخانه بزرگ";
			langue_batiments['30'] = "اصطبل بزرگ";
			langue_batiments['31'] = "دیوارشهر";
			langue_batiments['32'] = "دیوار گلی";
			langue_batiments['33'] = "پرچین";
			langue_batiments['34'] = "سنگ تراشی";
			langue_batiments['35'] = "قهوه خانه";
			langue_batiments['36'] = "تله ساز";
			langue_batiments['37'] = "عمارت قهرمان";
			langue_batiments['38'] = "انبار بزرگ";
			langue_batiments['39'] = "انبار غذای بزرگ";
			langue_batiments['40'] = "شگفتی جهان";
			langue_batiments['41'] = "آبشخور اسب";
			// Ressources
			langue_ressources['lumber'] = "چوب";
			langue_ressources['clay'] = "خشت";
			langue_ressources['iron'] = "آهن";
			langue_ressources['crop'] = "گندم";
			// Tasks
			langue_textes['build'] = "ساختن";
			langue_textes['upgrade'] = "ارتقاع";
			langue_textes['attack'] = "حمله";
			langue_textes['research'] = "تحقیق";
			langue_textes['train'] = "تربیت";
			langue_textes['party'] = "جشن";
			langue_textes['demolish'] = "تخریب";
			langue_textes['send_merchants'] = "ارسال تاجر";
			langue_textes['send_assistance'] = "ارسال نیروی کمکی";
			// Textes					
			langue_textes['ressources'] = "منابع";
			langue_textes['villages'] = "دهکده ها";
			langue_textes['my_hero'] = "قهرمان";
			langue_textes['task_list'] = "لیست وظایف";
			langue_textes['options'] = "گزینه ها";
			langue_textes['options_right_side'] = "ستون سمت چپ";
			langue_textes['replace_hero'] = "بخش مربوط به قهرمان تغییر کند؟";
			langue_textes['replace_player'] = "بخش مربوط به نام بازیکن تغییر کند؟";
			langue_textes['replace_allianz'] = "بخش مربوط به اتحاد تغییر کند؟";
			langue_textes['replace_village'] = "بخش مربوط به اسامی دهکده ها تغییر کند؟";
			langue_textes['defense_village'] = "Add shortcut\"ارسال نیروی کمکی\" ?";
			langue_textes['merchant_village'] = "Add shortcut \"ارسال منابع\" ?";
			langue_textes['add_resource'] = "قسمت نوار منابع نمایش داده شود؟";
			langue_textes['position_resource'] = "قبل یا بعد از بخش مربوط به اسامی دهکده ها";
			langue_textes['no'] = "خیر";
			langue_textes['yes'] = "بله";
			langue_textes['before_village'] = "بعد از لیست دهکده ها";
			langue_textes['after_village'] = "قبل از لیست دهکده ها";
			langue_textes['options_various'] = "گزینه های مختلف";
			langue_textes['replace_titre_page'] = "نام صفحه تغییر پیدا کند؟";
			langue_textes['save'] = "Save and close";
			langue_textes['replace_logo'] = "آرم تراوین تغییر کند؟";
			langue_textes['ready'] = "آماده";
			langue_textes['never'] = "هرگز";
			langue_textes['required_resources'] = "منابع مورد نیاز برای ارتقاع";
			langue_textes['insert_build_page'] = "نمایش منابع مورد نیاز در صفحه ساختمان؟";
			langue_textes['infinity'] = "ارتقاع";
			langue_textes['upgrade_wharehouse'] = "شما دارید برای ارتقاع انبار.";
			langue_textes['upgrade_granary'] = " شما دارید برای ارتقاع انبار غذا.";
			langue_textes['use_scheduler'] = "Use the scheduler ?";
			langue_textes['afficher_log'] = "Log level ?";
			langue_textes['add_build_list'] = "- Add to build list -";
			langue_textes['add_build_box_titre'] = "Schedule task (Server time)";
			langue_textes['add_build_box_schedule'] = "Schedule at :";
			langue_textes['add_build_box_format'] = "(yyyy/mm/dd hh:mm:ss)";
			break;
		case "sa": // Arabic by Dream1
		// Buldings :
			langue_batiments['1'] = "الحطاب";
			langue_batiments['2'] = "حفرة الطين";
			langue_batiments['3'] = "منجم الحديد";
			langue_batiments['4'] = "حقل القمح";
			langue_batiments['5'] = "معمل النشار";
			langue_batiments['6'] = "معمل البلوك";
			langue_batiments['7'] = "مسبك الحديد";
			langue_batiments['8'] = "المطاحن";
			langue_batiments['9'] = "مخبز";
			langue_batiments['10'] = "المخزن";
			langue_batiments['11'] = "مخزن الحبوب";
			langue_batiments['12'] = "الحداد";
			langue_batiments['13'] = "مستودع الدروع";
			langue_batiments['14'] = "ساحة البطولة";
			langue_batiments['15'] = "المبنى الرئيسي";
			langue_batiments['16'] = "نقطة التجمع";
			langue_batiments['17'] = "السوق";
			langue_batiments['18'] = "السفارة";
			langue_batiments['19'] = "الثكنة";
			langue_batiments['20'] = "إسطبل";
			langue_batiments['21'] = "المصانع الحربية";
			langue_batiments['22'] = "الأكادمية الحربية";
			langue_batiments['23'] = "المخبأ";
			langue_batiments['24'] = "البلدية";
			langue_batiments['25'] = "السكن";
			langue_batiments['26'] = "القصر";
			langue_batiments['27'] = "الخزنة";
			langue_batiments['28'] = "المكتب التجاري";
			langue_batiments['29'] = "الثكنة الكبيرة";
			langue_batiments['30'] = "الأسطبل الكبير";
			langue_batiments['31'] = "حائط المدينة";
			langue_batiments['32'] = "الحائط الأرضي";
			langue_batiments['33'] = "الحاجز";
			langue_batiments['34'] = "الحجار";
			langue_batiments['35'] = "المقهى";
			langue_batiments['36'] = "الصياد";
			langue_batiments['37'] = "قصر الأبطال";
			langue_batiments['38'] = "المخزن الكبير";
			langue_batiments['39'] = "مخزن الحبوب الكبير";
			langue_batiments['40'] = "أعجوبة العالم أو المعجزة";
			langue_batiments['41'] = "ساقية الخيول";
			// Ressources
			langue_textes['build'] = "بناء";
			langue_textes['upgrade'] = "تطوير";
			langue_textes['attack'] = "هجوم";
			langue_textes['research'] = "بحث";
			langue_textes['train'] = "قطار";
			langue_textes['party'] = "حفله";
			langue_textes['demolish'] = "هدم";
			langue_textes['send_merchants'] = "أرسال التجار";
			langue_textes['send_assistance'] = "دعم البريد الإلكتروني";
			// Textes					
			langue_textes['ressources'] = "الموارد";
			langue_textes['villages'] = "القرى";
			langue_textes['my_hero'] = "بطلي";
			langue_textes['task_list'] = "قائمة المهام";
			langue_textes['options'] = "خيارات";
			langue_textes['options_right_side'] = "الخانة في الجانب الأيمن";
			langue_textes['replace_hero'] = "أستبدال شكل قائمة البطل؟";
			langue_textes['replace_player'] = "أستبدال شكل قائمة الاعب؟";
			langue_textes['replace_allianz'] = "أستبدال شكل قائمة التحالف؟";
			langue_textes['replace_village'] = "أستبدال شكل قائمة القرى؟";
			langue_textes['defense_village'] = "أضافة أختصار \"أرسال القوات\"؟";
			langue_textes['merchant_village'] = "أضافة أختصار \"أرسال التجار أو الموارد\"؟";
			langue_textes['add_resource'] = "أضافة قائمة الموارد؟";
			langue_textes['position_resource'] = "قائمة القرى قبل أو بعد؟";
			langue_textes['no'] = "لا";
			langue_textes['yes'] = "نعم";
			langue_textes['before_village'] = "بعد قائمة القرى";
			langue_textes['after_village'] = "قبل قائمة القرى";
			langue_textes['options_various'] = "خيارات أخرى";
			langue_textes['replace_titre_page'] = "أستبدال أسم الصفحة؟";
			langue_textes['save'] = "Save and close";
			langue_textes['replace_logo'] = "أستبدال الشعار الأصلي؟";
			langue_textes['ready'] = "Ready";
			langue_textes['never'] = "أبداَ";
			langue_textes['required_resources'] = "الموارد المطلوبة للإرتقاء الى المستوى التالي";
			langue_textes['insert_build_page'] = "أظهار كم تحتاج من الموارد للبناء؟";
			langue_textes['infinity'] = "غير محدود";
			langue_textes['upgrade_wharehouse'] = "You have to upgrade wharehouse.";
			langue_textes['upgrade_granary'] = "You have to upgrade granary.";
			langue_textes['use_scheduler'] = "Use the scheduler ?";
			langue_textes['afficher_log'] = "Log level ?";
			langue_textes['add_build_list'] = "- Add to build list -";
			langue_textes['add_build_box_titre'] = "Schedule task (Server time)";
			langue_textes['add_build_box_schedule'] = "Schedule at :";
			langue_textes['add_build_box_format'] = "(yyyy/mm/dd hh:mm:ss)";
	break;
		case "uk": // English
		default:
			// Buldings :
			langue_batiments['1'] = "Woodcutter";
			langue_batiments['2'] = "Clay Pit";
			langue_batiments['3'] = "Iron Mine";
			langue_batiments['4'] = "Cropland";
			langue_batiments['5'] = "Sawmill";
			langue_batiments['6'] = "Brickyard";
			langue_batiments['7'] = "Iron Foundry";
			langue_batiments['8'] = "Flour Mill";
			langue_batiments['9'] = "Bakery";
			langue_batiments['10'] = "Warehouse";
			langue_batiments['11'] = "Granary";
			langue_batiments['12'] = "Blacksmith";
			langue_batiments['13'] = "Armory";
			langue_batiments['14'] = "Tournament Square";
			langue_batiments['15'] = "Main Building";
			langue_batiments['16'] = "Rally Point";
			langue_batiments['17'] = "Marketplace";
			langue_batiments['18'] = "Embassy";
			langue_batiments['19'] = "Barracks";
			langue_batiments['20'] = "Stable";
			langue_batiments['21'] = "Siege Workshop";
			langue_batiments['22'] = "Academy";
			langue_batiments['23'] = "Cranny";
			langue_batiments['24'] = "City Hall";
			langue_batiments['25'] = "Residence";
			langue_batiments['26'] = "Palace";
			langue_batiments['27'] = "Treasury";
			langue_batiments['28'] = "Trade Office";
			langue_batiments['29'] = "Great Barracks";
			langue_batiments['30'] = "Great Stable";
			langue_batiments['31'] = "City Wall";
			langue_batiments['32'] = "Earth Wall";
			langue_batiments['33'] = "Palisade";
			langue_batiments['34'] = "Stonemason";
			langue_batiments['35'] = "Brewery";
			langue_batiments['36'] = "Trapper";
			langue_batiments['37'] = "Hero's Mansion";
			langue_batiments['38'] = "Great Warehouse";
			langue_batiments['39'] = "Great Granary";
			langue_batiments['40'] = "Wonder";
			langue_batiments['41'] = "Horse Drinking Trough";
			// Ressources
			langue_ressources['lumber'] = "Lumber";
			langue_ressources['clay'] = "Clay";
			langue_ressources['iron'] = "Iron";
			langue_ressources['crop'] = "Crop";
			// Tasks
			langue_textes['build'] = "Build";
			langue_textes['upgrade'] = "Upgrade";
			langue_textes['attack'] = "Attack";
			langue_textes['research'] = "Research";
			langue_textes['train'] = "Train";
			langue_textes['party'] = "Party";
			langue_textes['demolish'] = "Demolish";
			langue_textes['send_merchants'] = "Send Merchants";
			langue_textes['send_assistance'] = "Send assistance";
			// Textes					
			langue_textes['ressources'] = "Ressources";
			langue_textes['villages'] = "Villages";
			langue_textes['my_hero'] = "My hero";
			langue_textes['task_list'] = "Task list";
			langue_textes['options'] = "Multi-Tools options";
			langue_textes['options_right_side'] = "Right side column";
			langue_textes['replace_hero'] = "Replace hero's framework ?";
			langue_textes['replace_player'] = "Replace player's framework ?";
			langue_textes['replace_allianz'] = "Replace alliance's framework ?";
			langue_textes['replace_village'] = "Replace village's framework ?";
			langue_textes['defense_village'] = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Add shortcut \"send defense\" ?";
			langue_textes['merchant_village'] = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Add shortcut \"send merchant\" ?";
			langue_textes['add_resource'] = "Add resource bars framework ?";
			langue_textes['position_resource'] = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Before or after village's framework ?";
			langue_textes['no'] = "No";
			langue_textes['yes'] = "Yes";
			langue_textes['before_village'] = "Before village";
			langue_textes['after_village'] = "After village";
			langue_textes['options_various'] = "Various options";
			langue_textes['replace_titre_page'] = "Replace name's page ?";
			langue_textes['save'] = "Save and close";
			langue_textes['replace_logo'] = "Replace original logo ?";
			langue_textes['ready'] = "Ready";
			langue_textes['never'] = "Never";
			langue_textes['required_resources'] = "Required resources to upgrade";
			langue_textes['insert_build_page'] = "Show ressourses needed in building's pages ?";
			langue_textes['infinity'] = "Infinity";
			langue_textes['upgrade_wharehouse'] = "You have to upgrade wharehouse.";
			langue_textes['upgrade_granary'] = "You have to upgrade granary.";
			langue_textes['use_scheduler'] = "Use the scheduler ?";
			langue_textes['afficher_log'] = "Log level ?";
			langue_textes['add_build_list'] = "- Add to build list -";
			langue_textes['add_build_box_titre'] = "Schedule task (Server time)";
			langue_textes['add_build_box_schedule'] = "Schedule at :";
			langue_textes['add_build_box_format'] = "(yyyy/mm/dd hh:mm:ss)";
			break;
		}
	add_log(3, "get_language() > Fin.");
	}

// Création des tableaux des niveau maximum
function get_max_batiments() {
	add_log(3, "get_max_batiments() > Début.");
	max_batiments[0] = [0, 10, 10, 10, 10, 5, 5, 5, 5, 5, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 20, 20, 20, 20, 100, 20]; // Non capitale
	max_batiments[1] = [0, 25, 25, 25, 25, 5, 5, 5, 5, 5, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 20, 20, 20, 20, 100, 20]; // Capitale
	add_log(3, "get_max_batiments() > Fin.");
	}

// Création des tableaux des ressources necessaires par niveau de bâtiment
function get_couts_batiments() {
	add_log(3, "get_couts_batiments() > Début.");
	cout_batiments['1'] = [ // Bûcheron
		[0,0,0,0,0,0],
		[40,100,50,60,1,2],
		[65,165,85,100,1,3],
		[110,280,140,165,2,4],
		[185,465,235,280,2,5],
		[310,780,390,465,2,6],
		[520,1300,650,780,3,8],
		[870,2170,1085,1300,4,10],
		[1450,3625,1810,2175,4,12],
		[2420,6050,3025,3630,5,14],
		[4040,10105,5050,6060,6,16],//10
		[6750,16870,8435,10125,7,18],
		[11270,28175,14090,16905,9,20],
		[18820,47055,23525,28230,11,22],
		[31430,78580,39290,47150,13,24],
		[52490,131230,65615,78740,15,26],
		[87660,219155,109575,131490,18,29],
		[146395,365985,182995,219590,22,32],
		[244480,611195,305600,366715,27,35],
		[408280,1020695,510350,612420,32,38],
		[681825,1704565,852280,1022740,38,41],//20
		[1138650,2846620,1423310,1707970,38,44],
		[1901540,4753855,2376925,2852315,38,47],
		[3175575,7938935,3969470,4763360,38,50],
		[5303210,13258025,6629015,7954815,38,53],
		[8856360,22140900,11070450,13284540,38,56]//25
		];
	cout_batiments['2'] = [ // Carrière d'argile
		[0,0,0,0,0,0],
		[80,40,80,50,1,2],
		[135,65,135,85,1,3],
		[225,110,225,140,2,4],
		[375,185,375,235,2,5],
		[620,310,620,390,2,6],
		[1040,520,1040,650,3,8],
		[1735,870,1735,1085,4,10],
		[2900,1450,2900,1810,4,12],
		[4840,2420,4840,3025,5,14],
		[8080,4040,8080,5050,6,16],//10
		[13500,6750,13500,8435,7,18],
		[22540,11270,22540,14090,9,20],
		[37645,18820,37645,23525,11,22],
		[62865,31430,62865,39290,13,24],
		[104985,52490,104985,65615,15,26],
		[175320,87660,175320,109575,18,29],
		[292790,146395,292790,182995,22,32],
		[488955,244480,488955,305600,27,35],
		[816555,408280,816555,510350,32,38],
		[1363650,681825,1363650,852280,38,41],//20
		[2277295,1138650,2277295,1423310,38,44],
		[3803085,1901540,3803085,2376925,38,47],
		[6351150,3175575,6351150,3969470,38,50],
		[10606420,5303210,10606420,6629015,38,53],
		[17712720,8856360,17712720,11070450,38,56]//25
		];
	cout_batiments['3'] = [ // Mine de Fer
		[0,0,0,0,0,0],
		[100,80,30,60,1,3],
		[165,135,50,100,1,5],
		[280,225,85,165,2,7],
		[465,375,140,280,2,9],
		[780,620,235,465,2,11],
		[1300,1040,390,780,3,13],
		[2170,1735,650,1300,4,15],
		[3625,2900,1085,2175,4,17],
		[6050,4840,1815,3630,5,19],
		[10105,8080,3030,6060,6,21],//10
		[16870,13500,5060,10125,7,24],
		[28175,22540,8455,16905,9,27],
		[47055,37645,14115,28230,11,30],
		[78580,62865,23575,47150,13,33],
		[131230,104985,39370,78740,15,36],
		[219155,175320,65745,131490,18,39],
		[365985,292790,109795,219590,22,42],
		[611195,488955,183360,366715,27,45],
		[1020695,816555,306210,612420,32,48],
		[1704565,1363650,511370,1022740,38,51],//20
		[2846620,2277295,853985,1707970,38,54],
		[4753855,3803085,1426155,2852315,38,57],
		[7938935,6351150,2381680,4763360,38,60],
		[13258025,10606420,3977410,7954815,38,63],
		[22140900,17712720,6642270,13284540,38,66]//25
		];
	cout_batiments['4'] = [ // Ferme de céréales
		[0,0,0,0,0,0],
		[70,90,70,20,1,0],
		[115,150,115,35,1,0],
		[195,250,195,55,2,0],
		[325,420,325,95,2,0],
		[545,700,545,155,2,0],
		[910,1170,910,260,3,1],
		[1520,1950,1520,435,4,2],
		[2535,3260,2535,725,4,3],
		[4235,5445,4235,1210,5,4],
		[7070,9095,7070,2020,6,5],//10
		[11810,15185,11810,3375,7,6],
		[19725,25360,19725,5635,9,7],
		[32940,42350,32940,9410,11,8],
		[55005,70720,55005,15715,13,9],
		[91860,118105,91860,26245,15,10],
		[153405,197240,153405,43830,18,12],
		[256190,329385,256190,73195,22,14],
		[427835,550075,427835,122240,27,16],
		[714485,918625,714485,204140,32,18],
		[1193195,1534105,1193195,340915,38,20],//20
		[1992635,2561960,1992635,569325,38,22],
		[3327700,4278470,3327700,950770,38,24],
		[5557255,7145045,5557255,1587785,38,26],
		[9280620,11932225,9280620,2651605,38,28],
		[15498630,19926810,15498630,4428180,38,30]//25
		];
	cout_batiments['5'] = [ // Scierie
		[0,0,0,0,0,0],
		[520,380,290,90,1,4],
		[935,685,520,160,1,6],
		[1685,1230,940,290,2,8],
		[3035,2215,1690,525,2,10],
		[5460,3990,3045,945,2,12]
		];
	cout_batiments['6'] = [ // Usine de poterie
		[0,0,0,0,0,0],
		[440,480,320,50,1,3],
		[790,865,575,90,1,5],
		[1425,1555,1035,160,2,7],
		[2565,2800,1865,290,2,9],
		[4620,5040,3360,525,2,11]
		];
	cout_batiments['7'] = [ // Fonderie
		[0,0,0,0,0,0],
		[200,450,510,120,1,6],
		[360,810,920,215,1,9],
		[650,1460,1650,390,2,12],
		[1165,2625,2975,700,2,15],
		[2100,4725,5355,1260,2,18]
		];
	cout_batiments['8'] = [ // Moulin
		[0,0,0,0,0,0],
		[500,440,380,1240,1,3],
		[900,790,685,2230,1,5],
		[1620,1425,1230,4020,2,7],
		[2915,2565,2215,7230,2,9],
		[5250,4620,3990,13015,2,11]
		];
	cout_batiments['9'] = [ // Boulangerie
		[0,0,0,0,0,0],
		[1200,1480,870,1600,1,4],
		[2160,2665,1565,2880,1,6],
		[3890,4795,2820,5185,2,8],
		[7000,8630,5075,9330,2,10],
		[12595,15535,9135,16795,2,12]
		];
	cout_batiments['10'] = [ // Dépot de ressources
		[0,0,0,0,0,0],
		[130,160,90,40,1,1],
		[165,205,115,50,1,2],
		[215,260,145,65,2,3],
		[275,335,190,85,2,4],
		[350,430,240,105,2,5],
		[445,550,310,135,3,6],
		[570,705,395,175,4,7],
		[730,900,505,225,4,8],
		[935,1155,650,290,5,9],
		[1200,1475,830,370,6,10],//10
		[1535,1890,1065,470,7,12],
		[1965,2420,1360,605,9,14],
		[2515,3095,1740,775,11,16],
		[3220,3960,2230,990,13,18],
		[4120,5070,2850,1270,15,20],
		[5275,6490,3650,1625,18,22],
		[6750,8310,4675,2075,22,24],
		[8640,10635,5980,2660,27,26],
		[11060,13610,7655,3405,32,28],
		[14155,17420,9800,4355,38,30]//20
		];
	cout_batiments['11'] = [ // Silo de céréales
		[0,0,0,0,0,0],
		[80,100,70,20,1,1],
		[100,130,90,25,1,2],
		[130,165,115,35,2,3],
		[170,210,145,40,2,4],
		[215,270,190,55,2,5],
		[275,345,240,70,3,6],
		[350,440,310,90,4,7],
		[450,565,395,115,4,8],
		[575,720,505,145,5,9],
		[740,920,645,185,6,10],//10
		[945,1180,825,235,7,12],
		[1210,1510,1060,300,9,14],
		[1545,1935,1355,385,11,16],
		[1980,2475,1735,495,13,18],
		[2535,3170,2220,635,15,20],
		[3245,4055,2840,810,18,22],
		[4155,5190,3635,1040,22,24],
		[5315,6645,4650,1330,27,26],
		[6805,8505,5955,1700,32,28],
		[8710,10890,7620,2180,38,30]//20
		];
	cout_batiments['12'] = [ // Armurerie
		[0,0,0,0,0,0],
		[170,200,380,130,2,4],
		[220,255,485,165,3,6],
		[280,330,625,215,3,8],
		[355,420,795,275,4,10],
		[455,535,1020,350,5,12],
		[585,685,1305,445,6,15],
		[750,880,1670,570,7,18],
		[955,1125,2140,730,9,21],
		[1225,1440,2740,935,10,24],
		[1570,1845,3505,1200,12,27],//10
		[2005,2360,4485,1535,15,30],
		[2570,3020,5740,1965,18,33],
		[3290,3870,7350,2515,21,36],
		[4210,4950,9410,3220,26,39],
		[5390,6340,12045,4120,31,42],
		[6895,8115,15415,5275,37,46],
		[8825,10385,19730,6750,44,50],
		[11300,13290,25255,8640,53,54],
		[14460,17015,32325,11060,64,58],
		[18510,21780,41380,14155,77,62]//20
		];
	cout_batiments['13'] = [ // Usine d'armure
		[0,0,0,0,0,0],
		[130,210,410,130,2,4],
		[165,270,525,165,3,6],
		[215,345,670,215,3,8],
		[275,440,860,275,4,10],
		[350,565,1100,350,5,12],
		[445,720,1410,445,6,15],
		[570,925,1805,570,7,18],
		[730,1180,2310,730,9,21],
		[935,1515,2955,935,10,24],
		[1200,1935,3780,1200,12,27],//10
		[1535,2480,4840,1535,15,30],
		[1965,3175,6195,1965,18,33],
		[2515,4060,7930,2515,21,36],
		[3220,5200,10150,3220,26,39],
		[4120,6655,12995,4120,31,42],
		[5275,8520,16630,5275,37,46],
		[6750,10905,21290,6750,44,50],
		[8640,13955,27250,8640,53,54],
		[11060,17865,34880,11060,64,58],
		[14155,22865,44645,14155,77,62]//20
		];
	cout_batiments['14'] = [ // Place du tournois
		[0,0,0,0,0,0],
		[1750,2250,1530,240,1,1],
		[2240,2880,1960,305,1,2],
		[2865,3685,2505,395,2,3],
		[3670,4720,3210,505,2,4],
		[4700,6040,4105,645,2,5],
		[6015,7730,5255,825,3,6],
		[7695,9895,6730,1055,4,7],
		[9850,12665,8615,1350,4,8],
		[12610,16215,11025,1730,5,9],
		[16140,20755,14110,2215,6,10],//10
		[20660,26565,18065,2835,7,12],
		[26445,34000,23120,3625,9,14],
		[33850,43520,29595,4640,11,16],
		[43330,55705,37880,5940,13,18],
		[55460,71305,48490,7605,15,20],
		[70990,91270,62065,9735,18,22],
		[90865,116825,79440,12460,22,24],
		[116305,149540,101685,15950,27,26],
		[148875,191410,130160,20415,32,28],
		[190560,245005,166600,26135,38,30]//20
		];
	cout_batiments['15'] = [ // Bâtiment principal
		[0,0,0,0,0,0],
		[70,40,60,20,2,2],
		[90,50,75,25,3,3],
		[115,65,100,35,3,4],
		[145,85,125,40,4,5],
		[190,105,160,55,5,6],
		[240,135,205,70,6,8],
		[310,175,265,90,7,10],
		[395,225,340,115,9,12],
		[505,290,430,145,10,14],
		[645,370,555,185,12,16],//10
		[825,470,710,235,15,18],
		[1060,605,905,300,18,20],
		[1355,775,1160,385,21,22],
		[1735,990,1485,495,26,24],
		[2220,1270,1900,635,31,26],
		[2840,1625,2435,810,37,29],
		[3635,2075,3115,1040,44,32],
		[4650,2660,3990,1330,53,35],
		[5955,3405,5105,1700,64,38],
		[7620,4355,6535,2180,77,41]//20
		];
	cout_batiments['16'] = [ // Place de rassemblement
		[0,0,0,0,0,0],
		[110,160,90,70,1,1],
		[140,205,115,90,1,2],
		[180,260,145,115,2,3],
		[230,335,190,145,2,4],
		[295,430,240,190,2,5],
		[380,550,310,240,3,6],
		[485,705,395,310,4,7],
		[620,900,505,395,4,8],
		[795,1155,650,505,5,9],
		[1015,1475,830,645,6,10],//10
		[1300,1890,1065,825,7,12],
		[1660,2420,1360,1060,9,14],
		[2130,3095,1740,1355,11,16],
		[2725,3960,2230,1735,13,18],
		[3485,5070,2850,2220,15,20],
		[4460,6490,3650,2840,18,22],
		[5710,8310,4675,3635,22,24],
		[7310,10635,5980,4650,27,26],
		[9360,13610,7655,5955,32,28],
		[11980,17420,9800,7620,38,30]//20
		];
	cout_batiments['17'] = [ // Place du marché
		[0,0,0,0,0,0],
		[80,70,120,70,4,4],
		[100,90,155,90,4,6],
		[130,115,195,115,5,8],
		[170,145,250,145,6,10],
		[215,190,320,190,7,12],
		[275,240,410,240,9,15],
		[350,310,530,310,11,18],
		[450,395,675,395,13,21],
		[575,505,865,505,15,24],
		[740,645,1105,645,19,27],//10
		[945,825,1415,825,22,30],
		[1210,1060,1815,1060,27,33],
		[1545,1355,2320,1355,32,38],
		[1980,1735,2970,1735,39,41],
		[2535,2220,3805,2220,46,44],
		[3245,2840,4870,2840,55,48],
		[4155,3635,6230,3635,67,52],
		[5315,4650,7975,4650,80,56],
		[6805,5955,10210,5955,96,60],
		[8710,7620,13065,7620,115,64]//20
		];
	cout_batiments['18'] = [ // Ambassade
		[0,0,0,0,0,0],
		[180,130,150,80,5,3],
		[230,165,190,100,6,5],
		[295,215,245,130,7,7],
		[375,275,315,170,8,9],
		[485,350,405,215,10,11],
		[620,445,515,275,12,13],
		[790,570,660,350,14,15],
		[1015,730,845,450,17,17],
		[1295,935,1080,575,21,19],
		[1660,1200,1385,740,25,21],//10
		[2125,1535,1770,945,30,24],
		[2720,1965,2265,1210,36,27],
		[3480,2515,2900,1545,43,30],
		[4455,3220,3715,1980,51,33],
		[5705,4120,4755,2535,62,36],
		[7300,5275,6085,3245,74,39],
		[9345,6750,7790,4155,89,42],
		[11965,8640,9970,5315,106,45],
		[15315,11060,12760,6805,128,48],
		[19600,14155,16335,8710,153,51]//20
		];
	cout_batiments['19'] = [ // Caserne
		[0,0,0,0,0,0],
		[210,140,260,120,1,4],
		[270,180,335,155,1,6],
		[345,230,425,195,2,8],
		[440,295,545,250,2,10],
		[565,375,700,320,2,12],
		[720,480,895,410,3,15],
		[925,615,1145,530,4,18],
		[1180,790,1465,675,4,21],
		[1515,1010,1875,865,5,24],
		[1935,1290,2400,1105,6,27],//10
		[2480,1655,3070,1415,7,30],
		[3175,2115,3930,1815,9,33],
		[4060,2710,5030,2320,11,36],
		[5200,3465,6435,2970,13,39],
		[6655,4435,8240,3805,15,42],
		[8520,5680,10545,4870,18,46],
		[10905,7270,13500,6230,22,50],
		[13955,9305,17280,7975,27,54],
		[17865,11910,22120,10210,32,58],
		[22865,15245,28310,13065,38,62]//20
		];
	cout_batiments['20'] = [ // Ecurie
		[0,0,0,0,0,0],
		[260,140,220,100,2,5],
		[335,180,280,130,3,8],
		[425,230,360,165,3,11],
		[545,295,460,210,4,14],
		[700,375,590,270,5,17],
		[895,480,755,345,6,20],
		[1145,615,970,440,7,23],
		[1465,790,1240,565,9,26],
		[1875,1010,1585,720,10,29],
		[2400,1290,2030,920,12,32],//10
		[3070,1655,2595,1180,15,36],
		[3930,2115,3325,1510,18,40],
		[5030,2710,4255,1935,21,44],
		[6435,3465,5445,2475,26,48],
		[8240,4435,6970,3170,31,52],
		[10545,5680,8925,4055,37,56],
		[13500,7270,11425,5190,44,60],
		[17280,9305,14620,6645,53,64],
		[22120,11910,18715,8505,64,68],
		[28310,15245,23955,10890,77,72]//20
		];
	cout_batiments['21'] = [ // Atelier
		[0,0,0,0,0,0],
		[460,510,600,320,4,3],
		[590,655,770,410,4,5],
		[755,835,985,525,5,7],
		[965,1070,1260,670,6,9],
		[1235,1370,1610,860,7,11],
		[1580,1750,2060,1100,9,13],
		[2025,2245,2640,1405,11,15],
		[2590,2870,3380,1800,13,17],
		[3315,3675,4325,2305,15,19],
		[4245,4705,5535,2950,19,21],//10
		[5430,6020,7085,3780,22,24],
		[6950,7705,9065,4835,27,27],
		[8900,9865,11605,6190,32,30],
		[11390,12625,14855,7925,39,33],
		[14580,16165,19015,10140,46,36],
		[18660,20690,24340,12980,55,39],
		[23885,26480,31155,16615,67,42],
		[30570,33895,39875,21270,80,45],
		[39130,43385,51040,27225,96,48],
		[50090,55535,65335,34845,115,51]//20
		];
	cout_batiments['22'] = [ // Academie
		[0,0,0,0,0,0],
		[220,160,90,40,5,4],
		[280,205,115,50,6,6],
		[360,260,145,65,7,8],
		[460,335,190,85,8,10],
		[590,430,240,105,10,12],
		[755,550,310,135,12,15],
		[970,705,395,175,14,18],
		[1240,900,505,225,17,21],
		[1585,1155,650,290,21,24],
		[2030,1475,830,370,25,27],//10
		[2595,1890,1065,470,30,30],
		[3325,2420,1360,605,36,33],
		[4255,3095,1740,775,43,36],
		[5445,3960,2230,990,51,39],
		[6970,5070,2850,1270,62,42],
		[8925,6490,3650,1625,74,46],
		[11425,8310,4675,2075,89,50],
		[14620,10635,5980,2660,106,54],
		[18715,13610,7655,3405,128,58],
		[23955,17420,9800,4355,153,62]//20
		];
	cout_batiments['23'] = [ // Cachette
		[0,0,0,0,0,0],
		[40,50,30,10,1,0],
		[50,65,40,15,1,0],
		[65,80,50,15,2,0],
		[85,105,65,20,2,0],
		[105,135,80,25,2,0],
		[135,170,105,35,3,1],
		[175,220,130,45,4,2],
		[225,280,170,55,4,3],
		[290,360,215,70,5,4],
		[370,460,275,90,6,5]//10
		];
	cout_batiments['24'] = [ // Hôtel de ville
		[0,0,0,0,0,0],
		[1250,1110,1260,600,6,4],
		[1600,1420,1615,770,7,6],
		[2050,1820,2065,985,9,8],
		[2620,2330,2640,1260,10,10],
		[3355,2980,3380,1610,12,12],
		[4295,3815,4330,2060,15,15],
		[5500,4880,5540,2640,18,18],
		[7035,6250,7095,3380,21,21],
		[9005,8000,9080,4325,26,24],
		[11530,10240,11620,5535,31,27],//10
		[14755,13105,14875,7085,37,30],
		[18890,16775,19040,9065,45,33],
		[24180,21470,24370,11605,53,36],
		[30950,27480,31195,14855,64,39],
		[39615,35175,39930,19015,77,42],
		[50705,45025,51110,24340,92,46],
		[64905,57635,65425,31155,111,50],
		[83075,73770,83740,39875,133,54],
		[106340,94430,107190,51040,160,58],
		[136115,120870,137200,65335,192,62]//20
		];
	cout_batiments['25'] = [ // Résidence
		[0,0,0,0,0,0],
		[580,460,350,180,2,1],
		[740,590,450,230,3,2],
		[950,755,575,295,3,3],
		[1215,965,735,375,4,4],
		[1555,1235,940,485,5,5],
		[1995,1580,1205,620,6,6],
		[2550,2025,1540,790,7,7],
		[3265,2590,1970,1015,9,8],
		[4180,3315,2520,1295,11,9],
		[5350,4245,3230,1660,12,10],//10
		[6845,5430,4130,2125,15,12],
		[8765,6950,5290,2720,18,14],
		[11220,8900,6770,3480,21,16],
		[14360,11390,8665,4455,26,18],
		[18380,14580,11090,5705,31,20],
		[23530,18660,14200,7300,37,22],
		[30115,23885,18175,9345,44,24],
		[38550,30570,23260,11965,53,26],
		[49340,39130,29775,15315,64,28],
		[63155,50090,38110,19600,77,30]//20
		];
	cout_batiments['26'] = [ // Palais
		[0,0,0,0,0,0],
		[550,800,750,250,6,1],
		[705,1025,960,320,7,2],
		[900,1310,1230,410,9,3],
		[1155,1680,1575,525,10,4],
		[1475,2145,2015,670,12,5],
		[1890,2750,2575,860,15,6],
		[2420,3520,3300,1100,18,7],
		[3095,4505,4220,1405,21,8],
		[3965,5765,5405,1800,26,9],
		[5075,7380,6920,2305,31,10],//10
		[6495,9445,8855,2950,37,12],
		[8310,12090,11335,3780,45,14],
		[10640,15475,14505,4835,53,16],
		[13615,19805,18570,6190,64,18],
		[17430,25355,23770,7925,77,20],
		[22310,32450,30425,10140,92,22],
		[28560,41540,38940,12980,111,24],
		[36555,53170,49845,16615,133,26],
		[46790,68055,63805,21270,160,28],
		[59890,87110,81670,27225,192,30]//20
		];
	cout_batiments['27'] = [ // Chambre aux trésors
		[0,0,0,0,0,0],
		[2880,2740,2580,990,7,4],
		[3630,3450,3250,1245,9,6],
		[4570,4350,4095,1570,10,8],
		[5760,5480,5160,1980,12,10],
		[7260,6905,6505,2495,15,12],
		[9145,8700,8195,3145,18,15],
		[11525,10965,10325,3960,21,18],
		[14520,13815,13010,4990,26,21],
		[18295,17405,16390,6290,31,24],
		[23055,21930,20650,7925,37,27],//10
		[29045,27635,26020,9985,45,30],
		[36600,34820,32785,12580,53,33],
		[46115,43875,41310,15850,64,36],
		[58105,55280,52050,19975,77,39],
		[73210,69655,65585,25165,92,42],
		[92245,87760,82640,31710,111,46],
		[116230,110580,104125,39955,133,50],
		[146450,139330,131195,50340,160,54],
		[184530,175560,165305,63430,192,58],
		[232505,221205,208285,79925,230,62]//20
		];
	cout_batiments['28'] = [ // Comptoir de commerce
		[0,0,0,0,0,0],
		[1400,1330,1200,400,4,3],
		[1790,1700,1535,510,4,5],
		[2295,2180,1965,655,5,7],
		[2935,2790,2515,840,6,9],
		[3760,3570,3220,1075,7,11],
		[4810,4570,4125,1375,9,13],
		[6155,5850,5280,1760,11,15],
		[7880,7485,6755,2250,13,17],
		[10090,9585,8645,2880,15,19],
		[12915,12265,11070,3690,19,21],//10
		[16530,15700,14165,4720,22,24],
		[21155,20100,18135,6045,27,27],
		[27080,25725,23210,7735,32,30],
		[34660,32930,29710,9905,39,33],
		[44370,42150,38030,12675,46,36],
		[56790,53950,48680,16225,55,39],
		[72690,69060,62310,20770,67,42],
		[93045,88395,79755,26585,80,45],
		[119100,113145,102085,34030,96,48],
		[152445,144825,130670,43555,115,51]//20
		];
	cout_batiments['29'] = [ // Grande caserne
		[0,0,0,0,0,0],
		[630,420,780,360,1,4],
		[805,540,1000,460,1,6],
		[1030,690,1280,590,2,8],
		[1320,880,1635,755,2,10],
		[1690,1125,2095,965,2,12],
		[2165,1445,2680,1235,3,15],
		[2770,1845,3430,1585,4,18],
		[3545,2365,4390,2025,4,21],
		[4540,3025,5620,2595,5,24],
		[5810,3875,7195,3320,6,27],//10
		[7440,4960,9210,4250,7,30],
		[9520,6345,11785,5440,9,33],
		[12185,8125,15085,6965,11,36],
		[15600,10400,19310,8915,13,39],
		[19965,13310,24720,11410,15,42],
		[25555,17035,31640,14605,18,46],
		[32710,21810,40500,18690,22,50],
		[41870,27915,51840,23925,27,54],
		[53595,35730,66355,30625,32,58],
		[68600,45735,84935,39200,38,62]//20
		];
	cout_batiments['30'] = [ // Grande écurie
		[0,0,0,0,0,0],
		[780,420,660,300,2,5],
		[1000,540,845,385,3,8],
		[1280,690,1080,490,3,11],
		[1635,880,1385,630,4,14],
		[2095,1125,1770,805,5,17],
		[2680,1445,2270,1030,6,20],
		[3430,1845,2905,1320,7,23],
		[4390,2365,3715,1690,9,26],
		[5620,3025,4755,2160,10,29],
		[7195,3875,6085,2765,12,32],//10
		[9210,4960,7790,3540,15,36],
		[11785,6345,9975,4535,18,40],
		[15085,8125,12765,5805,21,44],
		[19310,10400,16340,7430,26,48],
		[24720,13310,20915,9505,31,52],
		[31640,17035,26775,12170,37,56],
		[40500,21810,34270,15575,44,60],
		[51840,27915,43865,19940,53,64],
		[66355,35730,56145,25520,64,68],
		[84935,45735,71870,32665,77,72]//20
		];
	cout_batiments['31'] = [ // Mur d'enceinte
		[0,0,0,0,0,0],
		[70,90,170,70,1,0],
		[90,115,220,90,1,0],
		[115,145,280,115,2,0],
		[145,190,355,145,2,0],
		[190,240,455,190,2,0],
		[240,310,585,240,3,1],
		[310,395,750,310,4,2],
		[395,505,955,395,4,3],
		[505,650,1225,505,5,4],
		[645,830,1570,645,6,5],//10
		[825,1065,2005,825,7,6],
		[1060,1360,2570,1060,9,7],
		[1355,1740,3290,1355,11,8],
		[1735,2230,4210,1735,13,9],
		[2220,2850,5390,2220,15,10],
		[2840,3650,6895,2840,18,12],
		[3635,4675,8825,3635,22,14],
		[4650,5980,11300,4650,27,16],
		[5955,7655,14460,5955,32,18],
		[7620,9800,18510,7620,38,20]//20
		];
	cout_batiments['32'] = [ // Mur de pierre
		[0,0,0,0,0,0],
		[120,200,0,80,1,0],
		[155,255,0,100,1,0],
		[195,330,0,130,2,0],
		[250,420,0,170,2,0],
		[320,535,0,215,2,0],
		[410,685,0,275,3,1],
		[530,880,0,350,4,2],
		[675,1125,0,450,4,3],
		[865,1440,0,575,5,4],
		[1105,1845,0,740,6,5],//10
		[1415,2360,0,945,7,6],
		[1815,3020,0,1210,9,7],
		[2320,3870,0,1545,11,8],
		[2970,4950,0,1980,13,9],
		[3805,6340,0,2535,15,10],
		[4870,8115,0,3245,18,12],
		[6230,10385,0,4155,22,14],
		[7975,13290,0,5315,27,16],
		[10210,17015,0,6805,32,18],
		[13065,21780,0,8710,38,20]//20
		];
	cout_batiments['33'] = [ // Palissade
		[0,0,0,0,0,0],
		[160,100,80,60,1,0],
		[205,130,100,75,1,0],
		[260,165,130,100,2,0],
		[335,210,170,125,2,0],
		[430,270,215,160,2,0],
		[550,345,275,205,3,1],
		[705,440,350,265,4,2],
		[900,565,450,340,4,3],
		[1155,720,575,430,5,4],
		[1475,920,740,555,6,5],//10
		[1890,1180,945,710,7,6],
		[2420,1510,1210,905,9,7],
		[3095,1935,1545,1160,11,8],
		[3960,2475,1980,1485,13,9],
		[5070,3170,2535,1900,15,10],
		[6490,4055,3245,2435,18,12],
		[8310,5190,4155,3115,22,14],
		[10635,6645,5315,3990,27,16],
		[13610,8505,6805,5105,32,18],
		[17420,10890,8710,6535,38,20]//20
		];
	cout_batiments['34'] = [ // Tailleur de pierre
		[0,0,0,0,0,0],
		[155,130,125,70,1,2],
		[200,165,160,90,1,3],
		[255,215,205,115,2,4],
		[325,275,260,145,2,5],
		[415,350,335,190,2,6],
		[535,445,430,240,3,8],
		[680,570,550,310,4,10],
		[875,730,705,395,4,12],
		[1115,935,900,505,5,14],
		[1430,1200,1155,645,6,16],//10
		[1830,1535,1475,825,7,18],
		[2340,1965,1890,1060,9,20],
		[3000,2515,2420,1355,11,22],
		[3840,3220,3095,1735,13,24],
		[4910,4120,3960,2220,15,26],
		[6290,5275,5070,2840,18,29],
		[8050,6750,6490,3635,22,32],
		[10300,8640,8310,4650,27,35],
		[13185,11060,10635,5955,32,38],
		[16880,14155,13610,7620,38,41]//20
		];
	cout_batiments['35'] = [ // Brasserie
		[0,0,0,0,0,0],
		[1460,930,1250,1740,5,6],
		[2045,1300,1750,2435,6,9],
		[2860,1825,2450,3410,7,12],
		[4005,2550,3430,4775,8,15],
		[5610,3575,4800,6685,10,18],
		[7850,5000,6725,9360,12,22],
		[10995,7000,9410,13100,14,26],
		[15390,9805,13175,18340,17,30],
		[21545,13725,18445,25680,21,34],
		[30165,19215,25825,35950,25,38]//10
		];
	cout_batiments['36'] = [ // Fabriquant de piège
		[0,0,0,0,0,0],
		[100,100,100,100,1,4],
		[130,130,130,130,1,6],
		[165,165,165,165,2,8],
		[210,210,210,210,2,10],
		[270,270,270,270,2,12],
		[345,345,345,345,3,15],
		[440,440,440,440,4,18],
		[565,565,565,565,4,21],
		[720,720,720,720,5,24],
		[920,920,920,920,6,27],//10
		[1180,1180,1180,1180,7,30],
		[1510,1510,1510,1510,9,33],
		[1935,1935,1935,1935,11,36],
		[2475,2475,2475,2475,13,39],
		[3170,3170,3170,3170,15,42],
		[4055,4055,4055,4055,18,46],
		[5190,5190,5190,5190,22,50],
		[6645,6645,6645,6645,27,54],
		[8505,8505,8505,8505,32,58],
		[10890,10890,10890,10890,38,62]//20
		];
	cout_batiments['37'] = [ // Manoirdu héro
		[0,0,0,0,0,0],
		[700,670,700,240,1,2],
		[930,890,930,320,1,3],
		[1240,1185,1240,425,2,4],
		[1645,1575,1645,565,2,5],
		[2190,2095,2190,750,2,6],
		[2915,2790,2915,1000,3,8],
		[3875,3710,3875,1330,4,10],
		[5155,4930,5155,1765,4,12],
		[6855,6560,6855,2350,5,14],
		[9115,8725,9115,3125,6,16],//10
		[12125,11605,12125,4155,7,18],
		[16125,15435,16125,5530,9,20],
		[21445,20525,21445,7350,11,22],
		[28520,27300,28520,9780,13,24],
		[37935,36310,37935,13005,15,24],
		[50450,48290,50450,17300,18,27],
		[67100,64225,67100,23005,22,30],
		[89245,85420,89245,30600,27,33],
		[118695,113605,118695,40695,32,36],
		[157865,151095,157865,54125,37,39]//20
		];
	cout_batiments['38'] = [ // Grand dépot
		[0,0,0,0,0,0,0],
		[650,800,450,200,1,1],
		[830,1025,575,255,1,2],
		[1065,1310,735,330,2,3],
		[1365,1680,945,420,2,4],
		[1745,2145,1210,535,2,5],
		[2235,2750,1545,685,3,6],
		[2860,3520,1980,880,4,7],
		[3660,4505,2535,1125,4,8],
		[4685,5765,3245,1440,5,9],
		[5995,7380,4150,1845,6,10],//10
		[7675,9445,5315,2360,7,12],
		[9825,12090,6800,3020,9,14],
		[12575,15475,8705,3870,11,16],
		[16095,19805,11140,4950,13,18],
		[20600,25355,14260,6340,15,20],
		[26365,32450,18255,8115,18,22],
		[33750,41540,23365,10385,22,24],
		[43200,53170,29910,13290,27,26],
		[55295,68055,38280,17015,32,28],
		[70780,87110,49000,21780,38,30]//20
		];
	cout_batiments['39'] = [ // Grand silo
		[0,0,0,0,0,0],
		[400,500,350,100,1],
		[510,640,450,130,1,2],
		[655,820,575,165,2,3],
		[840,1050,735,210,2,4],
		[1075,1340,940,270,2,5],
		[1375,1720,1205,345,3,6],
		[1760,2200,1540,440,4,7],
		[2250,2815,1970,565,4,8],
		[2880,3605,2520,720,5,9],
		[3690,4610,3230,920,6,10],//10
		[4720,5905,4130,1180,7,12],
		[6045,7555,5290,1510,9,14],
		[7735,9670,6770,1935,11,16],
		[9905,12380,8665,2475,13,18],
		[12675,15845,11090,3170,15,20],
		[16225,20280,14200,4055,18,22],
		[20770,25960,18175,5190,22,24],
		[26585,33230,23260,6645,27,26],
		[34030,42535,29775,8505,32,28],
		[43555,54445,38110,10890,38,30]//20
		];
	cout_batiments['40'] = [ // Merveilledu monde
		[0,0,0,0,0,0],
		[66700,69050,72200,13200,0,1],
		[68535,70950,74185,13565,0,2],
		[70420,72900,76225,13935,0,3],
		[72355,74905,78320,14320,0,4],
		[74345,76965,80475,14715,0,5],
		[76390,79080,82690,15120,0,6],
		[78490,81255,84965,15535,0,7],
		[80650,83490,87300,15960,0,8],
		[82865,85785,89700,16400,0,9],
		[85145,88145,92165,16850,0,10],//10
		[87485,90570,94700,17315,0,12],
		[89895,93060,97305,17790,0,14],
		[92365,95620,99980,18280,0,16],
		[94905,98250,102730,18780,0,18],
		[97515,100950,105555,19300,0,20],
		[100195,103725,108460,19830,0,22],
		[102950,106580,111440,20375,0,24],
		[105785,109510,114505,20935,0,26],
		[108690,112520,117655,21510,0,28],
		[111680,115615,120890,22100,0,30],//20
		[114755,118795,124215,22710,0,33],
		[117910,122060,127630,23335,0,36],
		[121150,125420,131140,23975,0,39],
		[124480,128870,134745,24635,0,42],
		[127905,132410,138455,25315,0,45],
		[131425,136055,142260,26010,0,48],
		[135035,139795,146170,26725,0,51],
		[138750,143640,150190,27460,0,54],
		[142565,147590,154320,28215,0,57],
		[146485,151650,158565,28990,0,60],//30
		[150515,155820,162925,29785,0,64],
		[154655,160105,167405,30605,0,68],
		[158910,164505,172010,31450,0,72],
		[163275,169030,176740,32315,0,76],
		[167770,173680,181600,33200,0,80],
		[172380,178455,186595,34115,0,84],
		[177120,183360,191725,35055,0,88],
		[181995,188405,197000,36015,0,92],
		[186995,193585,202415,37005,0,96],
		[192140,198910,207985,38025,0,100],//40
		[197425,204380,213705,39070,0,105],
		[202855,210000,219580,40145,0,110],
		[208430,215775,225620,41250,0,115],
		[214165,221710,231825,42385,0,120],
		[220055,227805,238200,43550,0,125],
		[226105,234070,244750,44745,0,130],
		[232320,240505,251480,45975,0,135],
		[238710,247120,258395,47240,0,140],
		[245275,253915,265500,48540,0,145],
		[252020,260900,272800,49875,0,150],//50
		[258950,268075,280305,51245,0,156],
		[266070,275445,288010,52655,0,162],
		[273390,283020,295930,54105,0,168],
		[280905,290805,304070,55590,0,174],
		[288630,298800,312430,57120,0,180],
		[296570,307020,321025,58690,0,186],
		[304725,315460,329850,60305,0,192],
		[313105,324135,338925,61965,0,198],
		[321715,333050,348245,63670,0,204],
		[330565,342210,357820,65420,0,210],//60
		[339655,351620,367660,67220,0,217],
		[348995,361290,377770,69065,0,224],
		[358590,371225,388160,70965,0,231],
		[368450,381435,398835,72915,0,238],
		[378585,391925,409800,74920,0,245],
		[388995,402700,421070,76985,0,252],
		[399695,413775,432650,79100,0,259],
		[410685,425155,444550,81275,0,266],
		[421980,436845,456775,83510,0,273],
		[433585,448860,469335,85805,0,280],//70
		[445505,461205,482240,88165,0,288],
		[457760,473885,495505,90590,0,296],
		[470345,486920,509130,93080,0,304],
		[483280,500310,523130,95640,0,312],
		[496570,514065,537520,98270,0,320],
		[510225,528205,552300,100975,0,328],
		[524260,542730,567490,103750,0,336],
		[538675,557655,583095,106605,0,344],
		[553490,572990,599130,109535,0,352],
		[568710,588745,615605,112550,0,360],//80
		[584350,604935,632535,115645,0,369],
		[600420,621575,649930,118825,0,378],
		[616930,638665,667800,122090,0,387],
		[633895,656230,686165,125450,0,396],
		[651330,674275,705035,128900,0,405],
		[669240,692820,724425,132445,0,414],
		[687645,711870,744345,136085,0,423],
		[706555,731445,764815,139830,0,432],
		[725985,751560,785850,143675,0,441],
		[745950,772230,807460,147625,0,450],//90
		[766460,793465,829665,151685,0,460],
		[787540,815285,852480,155855,0,470],
		[809195,837705,875920,160140,0,480],
		[831450,860745,900010,164545,0,490],
		[854315,884415,924760,169070,0,500],
		[877810,908735,950190,173720,0,510],
		[901950,933725,976320,178495,0,520],
		[926750,959405,1000000,183405,0,530],
		[952235,985785,1000000,188450,0,540],
		[1000000,1000000,1000000,193630,0,550]//100
		];
	cout_batiments['41'] = [ // Abreuvoir
		[0,0,0,0,0,0],
		[780,420,660,540,4,5],
		[1000,540,845,690,4,8],
		[1280,690,1080,885,5,11],
		[1635,880,1385,1130,6,14],
		[2095,1125,1770,1450,7,17],
		[2680,1445,2270,1855,9,20],
		[3430,1845,2905,2375,11,23],
		[4390,2365,3715,3040,13,26],
		[5620,3025,4755,3890,15,29],
		[7195,3875,6085,4980,19,31],//10
		[9210,4960,7790,6375,22,35],
		[11785,6345,9975,8160,27,39],
		[15085,8125,12765,10445,32,43],
		[19310,10400,16340,13370,39,47],
		[24720,13310,20915,17115,46,51],
		[31640,17035,26775,21905,55,55],
		[40500,21810,34270,28040,67,59],
		[51840,27915,43865,35890,80,63],
		[66355,35730,56145,45940,96,67],
		[84935,45735,71870,58800,115,71]//20
		];
	add_log(3, "get_couts_batiments() > Fin.");
	}
	
// Création des tableaux des temps de construcion des bâtiments
function get_temps_batiments() {
	add_log(3, "get_temps_batiments() > Début.");
	temps_batiments['1'] = [		// Bûcherons  
		['00:21:40', '00:04:20', '00:04:10', '00:04:00', '00:03:50', '00:03:40', '00:03:40', '00:03:30', '00:03:20', '00:03:10', '00:03:10', '00:03:00', '00:02:50', '00:02:50', '00:02:40', '00:02:40', '00:02:30', '00:02:20', '00:02:20', '00:02:10', '00:02:10'],
		['00:51:40', '00:10:20', '00:09:50', '00:09:30', '00:09:10', '00:08:50', '00:08:30', '00:08:10', '00:08:00', '00:07:40', '00:07:20', '00:07:10', '00:06:50', '00:06:40', '00:06:20', '00:06:10', '00:06:00', '00:05:40', '00:05:30', '00:05:20', '00:05:10'],
		['01:39:10', '00:19:50', '00:19:00', '00:18:20', '00:17:40', '00:17:00', '00:16:30', '00:15:50', '00:15:20', '00:14:40', '00:14:10', '00:13:40', '00:13:10', '00:12:40', '00:12:20', '00:11:50', '00:11:20', '00:11:00', '00:10:40', '00:10:10', '00:09:50'],
		['02:55:00', '00:35:00', '00:33:40', '00:32:30', '00:31:20', '00:30:10', '00:29:10', '00:28:00', '00:27:00', '00:26:00', '00:25:10', '00:24:10', '00:23:20', '00:22:30', '00:21:40', '00:21:00', '00:20:10', '00:19:30', '00:18:40', '00:18:00', '00:17:20'],
		['04:56:40', '00:59:20', '00:57:10', '00:55:00', '00:53:00', '00:51:10', '00:49:20', '00:47:30', '00:45:50', '00:44:10', '00:42:40', '00:41:00', '00:39:40', '00:38:10', '00:36:50', '00:35:30', '00:34:10', '00:33:00', '00:31:50', '00:30:40', '00:29:30'],
		['08:10:50', '01:38:10', '01:34:40', '01:31:10', '01:27:50', '01:24:50', '01:21:40', '01:18:50', '01:16:00', '01:13:10', '01:10:30', '01:08:00', '01:05:30', '01:03:10', '01:01:00', '00:58:40', '00:56:40', '00:54:40', '00:52:40', '00:50:40', '00:48:50'],
		['13:21:40', '02:40:20', '02:34:30', '02:29:00', '02:23:40', '02:18:30', '02:13:30', '02:08:40', '02:04:00', '01:59:40', '01:55:20', '01:51:10', '01:47:10', '01:43:20', '01:39:30', '01:36:00', '01:32:30', '01:29:10', '01:26:00', '01:22:50', '01:19:50'],
		['21:39:10', '04:19:50', '04:10:30', '04:01:30', '03:52:50', '03:44:30', '03:36:20', '03:28:30', '03:21:00', '03:13:50', '03:06:50', '03:00:10', '02:53:40', '02:47:20', '02:41:20', '02:35:30', '02:30:00', '02:24:30', '02:19:20', '02:14:20', '02:09:30'],
		['34:55:50', '06:59:10', '06:44:00', '06:29:30', '06:15:30', '06:02:00', '05:49:00', '05:36:20', '05:24:20', '05:12:40', '05:01:20', '04:50:30', '04:40:00', '04:30:00', '04:20:10', '04:10:50', '04:01:50', '03:53:10', '03:44:40', '03:36:40', '03:28:50'],
		['56:10:00', '11:14:00', '10:49:40', '10:26:20', '10:03:50', '09:42:00', '09:21:10', '09:00:50', '08:41:30', '08:22:40', '08:04:30', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:20', '06:28:50', '06:14:50', '06:01:20', '05:48:20', '05:35:50'],
		['90:08:20', '18:01:40', '17:22:50', '16:45:20', '16:09:00', '15:34:10', '15:00:30', '14:28:10', '13:56:50', '13:26:40', '12:57:40', '12:29:40', '12:02:40', '11:36:40', '11:11:40', '10:47:30', '10:24:10', '10:01:40', '09:40:00', '09:19:10', '08:59:00'],
		['144:30:50', '28:54:10', '27:51:40', '26:51:30', '25:53:30', '24:57:30', '24:03:40', '23:11:40', '22:21:30', '21:33:20', '20:46:40', '20:01:50', '19:18:30', '18:36:50', '17:56:40', '17:17:50', '16:40:30', '16:04:30', '15:29:50', '14:56:20', '14:24:00'],
		['231:30:00', '46:18:00', '44:37:50', '43:01:30', '41:28:30', '39:59:00', '38:32:40', '37:09:20', '35:49:10', '34:31:40', '33:17:10', '32:05:20', '30:56:00', '29:49:10', '28:44:40', '27:42:40', '26:42:50', '25:45:10', '24:49:30', '23:55:50', '23:04:10'],
		['370:40:00', '74:08:00', '71:27:50', '68:53:30', '66:24:40', '64:01:20', '61:43:00', '59:29:40', '57:21:10', '55:17:20', '53:17:50', '51:22:40', '49:31:50', '47:44:50', '46:01:40', '44:22:10', '42:46:20', '41:14:00', '39:45:00', '38:19:00', '36:56:20'],
		['593:20:50', '118:40:10', '114:23:50', '110:16:40', '106:18:30', '102:28:50', '98:47:30', '95:14:10', '91:48:30', '88:30:10', '85:19:00', '82:14:40', '79:17:00', '76:25:50', '73:40:40', '71:01:30', '68:28:10', '66:00:10', '63:37:40', '61:20:10', '59:07:40'],
		['949:37:30', '189:55:30', '183:05:20', '176:29:50', '170:08:40', '164:01:10', '158:06:50', '152:25:20', '146:56:00', '141:38:40', '136:32:40', '131:37:50', '126:53:30', '122:19:20', '117:55:10', '113:40:30', '109:35:00', '105:38:10', '101:50:00', '98:10:10', '94:38:00'],
		['1519:40:50', '303:56:10', '292:59:40', '282:26:50', '272:16:50', '262:28:40', '253:01:40', '243:55:10', '235:08:20', '226:40:20', '218:30:50', '210:38:50', '203:03:50', '195:45:10', '188:42:20', '181:54:40', '175:21:50', '169:03:00', '162:57:50', '157:05:50', '151:26:30'],
		['2431:46:40', '486:21:20', '468:50:50', '451:58:00', '435:41:50', '420:00:40', '404:53:30', '390:18:50', '376:15:50', '362:43:10', '349:39:40', '337:04:20', '324:56:20', '313:14:30', '301:57:50', '291:05:30', '280:36:50', '270:30:40', '260:46:20', '251:23:10', '242:20:10'],
		['3891:06:40', '778:13:20', '750:12:30', '723:12:00', '697:09:50', '672:04:00', '647:52:20', '624:33:00', '602:03:50', '580:23:30', '559:29:50', '539:21:20', '519:56:20', '501:13:10', '483:10:40', '465:47:00', '449:00:50', '432:51:00', '417:16:00', '402:14:40', '387:45:50'],
		['6226:04:10', '1245:12:50', '1200:23:10', '1157:10:20', '1115:30:50', '1075:21:20', '1036:38:30', '999:19:20', '963:20:50', '928:40:00', '895:14:10', '863:00:20', '831:56:20', '801:59:20', '773:07:00', '745:17:00', '718:27:20', '692:35:20', '667:39:20', '643:37:20', '620:27:00']
		];
	temps_batiments['2'] = [		// Carrière de terre 
		['00:18:20', '00:03:40', '00:03:30', '00:03:20', '00:03:20', '00:03:10', '00:03:00', '00:03:00', '00:02:50', '00:02:40', '00:02:40', '00:02:30', '00:02:30', '00:02:20', '00:02:20', '00:02:10', '00:02:10', '00:02:00', '00:02:00', '00:01:50', '00:01:50'],
		['00:45:50', '00:09:10', '00:08:50', '00:08:30', '00:08:10', '00:08:00', '00:07:40', '00:07:20', '00:07:10', '00:06:50', '00:06:40', '00:06:20', '00:06:10', '00:06:00', '00:05:40', '00:05:30', '00:05:20', '00:05:10', '00:05:00', '00:04:50', '00:04:40'],
		['01:30:00', '00:18:00', '00:17:20', '00:16:50', '00:16:10', '00:15:40', '00:15:00', '00:14:30', '00:14:00', '00:13:30', '00:13:00', '00:12:30', '00:12:00', '00:11:40', '00:11:10', '00:10:50', '00:10:20', '00:10:00', '00:09:40', '00:09:20', '00:09:00'],
		['02:40:50', '00:32:10', '00:31:00', '00:30:00', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:25:00', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:50', '00:20:00', '00:19:20', '00:18:40', '00:18:00', '00:17:20', '00:16:40', '00:16:00'],
		['04:34:10', '00:54:50', '00:52:50', '00:51:00', '00:49:10', '00:47:20', '00:45:40', '00:44:00', '00:42:30', '00:41:00', '00:39:30', '00:38:00', '00:36:40', '00:35:20', '00:34:00', '00:32:50', '00:31:40', '00:30:30', '00:29:30', '00:28:20', '00:27:20'],
		['07:35:50', '01:31:10', '01:27:50', '01:24:40', '01:21:40', '01:18:40', '01:15:50', '01:13:10', '01:10:30', '01:08:00', '01:05:30', '01:03:10', '01:00:50', '00:58:40', '00:56:40', '00:54:30', '00:52:40', '00:50:40', '00:48:50', '00:47:10', '00:45:20'],
		['12:25:50', '02:29:10', '02:23:50', '02:18:40', '02:13:40', '02:08:50', '02:04:10', '01:59:40', '01:55:20', '01:51:10', '01:47:10', '01:43:20', '01:39:40', '01:36:00', '01:32:40', '01:29:20', '01:26:00', '01:23:00', '01:20:00', '01:17:10', '01:14:20'],
		['20:10:00', '04:02:00', '03:53:20', '03:44:50', '03:36:50', '03:29:00', '03:21:30', '03:14:10', '03:07:10', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30'],
		['32:32:30', '06:30:30', '06:16:30', '06:03:00', '05:49:50', '05:37:20', '05:25:10', '05:13:30', '05:02:10', '04:51:20', '04:40:50', '04:30:40', '04:21:00', '04:11:30', '04:02:30', '03:53:40', '03:45:20', '03:37:10', '03:29:20', '03:21:50', '03:14:40'],
		['52:20:50', '10:28:10', '10:05:30', '09:43:50', '09:22:50', '09:02:30', '08:43:00', '08:24:10', '08:06:00', '07:48:30', '07:31:40', '07:15:20', '06:59:40', '06:44:40', '06:30:00', '06:16:00', '06:02:30', '05:49:20', '05:36:50', '05:24:40', '05:13:00'],
		['84:02:30', '16:48:30', '16:12:10', '15:37:10', '15:03:20', '14:30:50', '13:59:30', '13:29:20', '13:00:10', '12:32:00', '12:05:00', '11:38:50', '11:13:40', '10:49:30', '10:26:10', '10:03:30', '09:41:50', '09:20:50', '09:00:40', '08:41:10', '08:22:30'],
		['134:44:10', '26:56:50', '25:58:40', '25:02:30', '24:08:30', '23:16:20', '22:26:00', '21:37:30', '20:50:50', '20:05:50', '19:22:20', '18:40:30', '18:00:10', '17:21:20', '16:43:50', '16:07:40', '15:32:50', '14:59:20', '14:26:50', '13:55:40', '13:25:40'],
		['215:51:40', '43:10:20', '41:37:00', '40:07:10', '38:40:30', '37:17:00', '35:56:20', '34:38:50', '33:24:00', '32:11:50', '31:02:20', '29:55:10', '28:50:30', '27:48:20', '26:48:10', '25:50:20', '24:54:30', '24:00:40', '23:08:50', '22:18:50', '21:30:40'],
		['345:39:10', '69:07:50', '66:38:30', '64:14:30', '61:55:40', '59:42:00', '57:33:00', '55:28:40', '53:28:50', '51:33:20', '49:42:00', '47:54:40', '46:11:10', '44:31:20', '42:55:10', '41:22:30', '39:53:10', '38:27:00', '37:04:00', '35:43:50', '34:26:40'],
		['553:19:10', '110:39:50', '106:40:40', '102:50:20', '99:08:10', '95:34:00', '92:07:40', '88:48:40', '85:36:50', '82:31:50', '79:33:40', '76:41:40', '73:56:00', '71:16:20', '68:42:30', '66:14:00', '63:51:00', '61:33:00', '59:20:10', '57:12:00', '55:08:20'],
		['885:35:00', '177:07:00', '170:44:20', '164:35:30', '158:40:00', '152:57:20', '147:27:00', '142:08:30', '137:01:30', '132:05:30', '127:20:10', '122:45:10', '118:20:00', '114:04:20', '109:58:00', '106:00:30', '102:11:30', '98:30:40', '94:58:00', '91:32:50', '88:15:00'],
		['1417:12:30', '283:26:30', '273:14:10', '263:24:00', '253:55:00', '244:46:40', '235:57:50', '227:28:10', '219:16:50', '211:23:10', '203:46:40', '196:26:30', '189:22:10', '182:33:10', '175:58:50', '169:38:40', '163:32:20', '157:39:00', '151:58:30', '146:30:10', '141:13:50'],
		['2267:48:20', '453:33:40', '437:14:00', '421:29:30', '406:19:10', '391:41:30', '377:35:20', '363:59:50', '350:53:30', '338:15:40', '326:05:00', '314:20:40', '303:01:40', '292:07:10', '281:36:10', '271:27:50', '261:41:30', '252:16:20', '243:11:20', '234:26:10', '225:59:40'],
		['3628:45:50', '725:45:10', '699:37:30', '674:26:20', '650:09:30', '626:45:10', '604:11:30', '582:26:20', '561:28:20', '541:15:30', '521:46:20', '502:59:20', '484:52:50', '467:25:30', '450:36:00', '434:22:40', '418:44:20', '403:39:50', '389:08:00', '375:07:30', '361:37:10'],
		['5806:18:20', '1161:15:40', '1119:27:20', '1079:09:10', '1040:18:20', '1002:51:10', '966:45:00', '931:56:50', '898:23:50', '866:03:20', '834:52:40', '804:49:20', '775:50:50', '747:55:00', '720:59:30', '695:02:10', '670:01:00', '645:53:40', '622:38:30', '600:13:40', '578:37:10']
		];
	temps_batiments['3'] = [		 // Mine de fer 
		['00:37:30', '00:07:30', '00:07:10', '00:07:00', '00:06:40', '00:06:30', '00:06:10', '00:06:00', '00:05:50', '00:05:40', '00:05:20', '00:05:10', '00:05:00', '00:04:50', '00:04:40', '00:04:30', '00:04:20', '00:04:10', '00:04:00', '00:03:50', '00:03:40'],
		['01:16:40', '00:15:20', '00:14:50', '00:14:10', '00:13:40', '00:13:10', '00:12:50', '00:12:20', '00:11:50', '00:11:30', '00:11:00', '00:10:40', '00:10:10', '00:09:50', '00:09:30', '00:09:10', '00:08:50', '00:08:30', '00:08:10', '00:08:00', '00:07:40'],
		['02:19:10', '00:27:50', '00:26:50', '00:25:50', '00:25:00', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:50', '00:20:00', '00:19:20', '00:18:40', '00:18:00', '00:17:20', '00:16:40', '00:16:00', '00:15:30', '00:15:00', '00:14:20', '00:13:50'],
		['04:00:00', '00:48:00', '00:46:10', '00:44:30', '00:43:00', '00:41:20', '00:39:50', '00:38:30', '00:37:00', '00:35:40', '00:34:30', '00:33:10', '00:32:00', '00:30:50', '00:29:50', '00:28:40', '00:27:40', '00:26:40', '00:25:40', '00:24:50', '00:23:50'],
		['06:40:00', '01:20:00', '01:17:10', '01:14:20', '01:11:40', '01:09:10', '01:06:40', '01:04:10', '01:01:50', '00:59:40', '00:57:30', '00:55:30', '00:53:30', '00:51:30', '00:49:40', '00:47:50', '00:46:10', '00:44:30', '00:42:50', '00:41:20', '00:39:50'],
		['10:56:40', '02:11:20', '02:06:40', '02:02:00', '01:57:40', '01:53:30', '01:49:20', '01:45:20', '01:41:40', '01:38:00', '01:34:30', '01:31:00', '01:27:50', '01:24:40', '01:21:30', '01:18:40', '01:15:50', '01:13:00', '01:10:30', '01:07:50', '01:05:30'],
		['17:47:30', '03:33:30', '03:25:50', '03:18:20', '03:11:10', '03:04:20', '02:57:40', '02:51:20', '02:45:10', '02:39:10', '02:33:30', '02:28:00', '02:22:40', '02:17:30', '02:12:30', '02:07:50', '02:03:10', '01:58:40', '01:54:30', '01:50:20', '01:46:20'],
		['28:44:10', '05:44:50', '05:32:30', '05:20:30', '05:09:00', '04:57:50', '04:47:10', '04:36:50', '04:26:50', '04:17:10', '04:08:00', '03:59:00', '03:50:30', '03:42:10', '03:34:10', '03:26:30', '03:19:00', '03:11:50', '03:05:00', '02:58:20', '02:51:50'],
		['46:15:50', '09:15:10', '08:55:10', '08:36:00', '08:17:20', '07:59:30', '07:42:10', '07:25:30', '07:09:30', '06:54:00', '06:39:10', '06:24:50', '06:11:00', '05:57:30', '05:44:40', '05:32:20', '05:20:20', '05:08:50', '04:57:40', '04:47:00', '04:36:40'],
		['74:18:20', '14:51:40', '14:19:30', '13:48:30', '13:18:40', '12:50:00', '12:22:20', '11:55:30', '11:29:50', '11:05:00', '10:41:00', '10:18:00', '09:55:40', '09:34:20', '09:13:30', '08:53:40', '08:34:30', '08:16:00', '07:58:00', '07:40:50', '07:24:20'],
		['119:10:00', '23:50:00', '22:58:30', '22:08:50', '21:21:00', '20:34:50', '19:50:20', '19:07:30', '18:26:10', '17:46:30', '17:08:00', '16:31:00', '15:55:20', '15:21:00', '14:47:50', '14:15:50', '13:45:00', '13:15:20', '12:46:40', '12:19:10', '11:52:30'],
		['190:55:50', '38:11:10', '36:48:40', '35:29:10', '34:12:30', '32:58:40', '31:47:30', '30:38:50', '29:32:30', '28:28:50', '27:27:10', '26:28:00', '25:30:50', '24:35:40', '23:42:30', '22:51:20', '22:02:00', '21:14:20', '20:28:30', '19:44:20', '19:01:40'],
		['305:46:40', '61:09:20', '58:57:10', '56:49:50', '54:47:00', '52:48:40', '50:54:40', '49:04:40', '47:18:40', '45:36:30', '43:58:00', '42:23:00', '40:51:30', '39:23:10', '37:58:10', '36:36:10', '35:17:00', '34:00:50', '32:47:20', '31:36:30', '30:28:20'],
		['489:30:50', '97:54:10', '94:22:40', '90:58:50', '87:42:20', '84:32:50', '81:30:10', '78:34:10', '75:44:30', '73:00:50', '70:23:10', '67:51:10', '65:24:30', '63:03:20', '60:47:10', '58:35:50', '56:29:10', '54:27:10', '52:29:40', '50:36:10', '48:46:50'],
		['783:30:00', '156:42:00', '151:03:30', '145:37:10', '140:22:40', '135:19:30', '130:27:10', '125:45:20', '121:13:40', '116:51:50', '112:39:30', '108:36:10', '104:41:30', '100:55:20', '97:17:20', '93:47:20', '90:24:40', '87:09:20', '84:01:10', '80:59:40', '78:04:40'],
		['1253:52:30', '250:46:30', '241:44:50', '233:02:40', '224:39:20', '216:34:00', '208:46:10', '201:15:20', '194:00:30', '187:01:30', '180:17:30', '173:48:10', '167:32:40', '161:30:50', '155:42:00', '150:05:40', '144:41:20', '139:28:50', '134:27:40', '129:37:10', '124:57:10'],
		['2006:28:20', '401:17:40', '386:50:50', '372:55:20', '359:29:50', '346:33:20', '334:04:40', '322:03:10', '310:27:30', '299:16:50', '288:30:30', '278:07:20', '268:06:30', '258:27:20', '249:09:10', '240:11:00', '231:32:10', '223:12:00', '215:10:00', '207:25:10', '199:57:10'],
		['3210:38:20', '642:07:40', '619:00:40', '596:43:40', '575:14:40', '554:32:10', '534:34:20', '515:19:40', '496:46:30', '478:53:30', '461:39:10', '445:02:00', '429:00:40', '413:34:00', '398:40:40', '384:19:30', '370:29:20', '357:09:10', '344:17:40', '331:54:00', '319:57:10'],
		['5137:17:30', '1027:27:30', '990:28:20', '954:48:50', '920:26:30', '887:18:20', '855:21:40', '824:34:10', '794:53:00', '766:16:10', '738:41:00', '712:05:20', '686:27:20', '661:44:30', '637:55:10', '614:57:20', '592:49:00', '571:28:30', '550:54:10', '531:04:10', '511:57:00'],
		['8219:57:30', '1643:59:30', '1584:48:20', '1527:45:10', '1472:45:20', '1419:44:10', '1368:37:30', '1319:21:20', '1271:51:30', '1226:04:20', '1181:56:00', '1139:23:00', '1098:21:50', '1058:49:30', '1020:42:20', '983:57:40', '948:32:20', '914:23:30', '881:28:20', '849:44:20', '819:09:00']
		];
	temps_batiments['4'] = [		 // Ferme de céréales 
		['00:12:30', '00:02:30', '00:02:20', '00:02:20', '00:02:10', '00:02:10', '00:02:00', '00:02:00', '00:02:00', '00:01:50', '00:01:50', '00:01:40', '00:01:40', '00:01:40', '00:01:30', '00:01:30', '00:01:30', '00:01:20', '00:01:20', '00:01:20', '00:01:10'],
		['00:36:40', '00:07:20', '00:07:00', '00:06:50', '00:06:30', '00:06:20', '00:06:10', '00:05:50', '00:05:40', '00:05:30', '00:05:20', '00:05:00', '00:04:50', '00:04:40', '00:04:30', '00:04:20', '00:04:10', '00:04:00', '00:04:00', '00:03:50', '00:03:40'],
		['01:15:00', '00:15:00', '00:14:30', '00:14:00', '00:13:30', '00:13:00', '00:12:30', '00:12:10', '00:11:40', '00:11:10', '00:10:50', '00:10:30', '00:10:00', '00:09:40', '00:09:20', '00:09:00', '00:08:40', '00:08:20', '00:08:00', '00:07:50', '00:07:30'],
		['02:17:30', '00:27:30', '00:26:30', '00:25:30', '00:24:30', '00:23:40', '00:22:50', '00:22:00', '00:21:10', '00:20:30', '00:19:40', '00:19:00', '00:18:20', '00:17:40', '00:17:00', '00:16:30', '00:15:50', '00:15:20', '00:14:40', '00:14:10', '00:13:40'],
		['03:55:50', '00:47:10', '00:45:30', '00:43:50', '00:42:20', '00:40:50', '00:39:20', '00:37:50', '00:36:30', '00:35:10', '00:34:00', '00:32:40', '00:31:30', '00:30:30', '00:29:20', '00:28:20', '00:27:20', '00:26:20', '00:25:20', '00:24:20', '00:23:30'],
		['06:34:10', '01:18:50', '01:16:00', '01:13:20', '01:10:40', '01:08:10', '01:05:40', '01:03:20', '01:01:00', '00:58:50', '00:56:40', '00:54:40', '00:52:40', '00:50:50', '00:49:00', '00:47:10', '00:45:30', '00:43:50', '00:42:20', '00:40:50', '00:39:20'],
		['10:48:20', '02:09:40', '02:05:00', '02:00:30', '01:56:10', '01:51:50', '01:47:50', '01:44:00', '01:40:20', '01:36:40', '01:33:10', '01:29:50', '01:26:30', '01:23:30', '01:20:30', '01:17:30', '01:14:50', '01:12:00', '01:09:30', '01:07:00', '01:04:30'],
		['17:33:20', '03:30:40', '03:23:10', '03:15:50', '03:08:40', '03:02:00', '02:55:20', '02:49:00', '02:43:00', '02:37:10', '02:31:30', '02:26:00', '02:20:50', '02:15:40', '02:10:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00'],
		['28:22:30', '05:40:30', '05:28:10', '05:16:20', '05:05:00', '04:54:00', '04:43:20', '04:33:10', '04:23:20', '04:13:50', '04:04:40', '03:56:00', '03:47:30', '03:39:20', '03:31:20', '03:23:50', '03:16:30', '03:09:20', '03:02:30', '02:56:00', '02:49:40'],
		['45:40:00', '09:08:00', '08:48:20', '08:29:20', '08:11:00', '07:53:20', '07:36:10', '07:19:50', '07:04:00', '06:48:40', '06:34:00', '06:19:50', '06:06:10', '05:53:00', '05:40:10', '05:28:00', '05:16:10', '05:04:50', '04:53:50', '04:43:20', '04:33:00'],
		['73:20:50', '14:40:10', '14:08:30', '13:38:00', '13:08:30', '12:40:10', '12:12:40', '11:46:20', '11:21:00', '10:56:20', '10:32:50', '10:10:00', '09:48:00', '09:26:50', '09:06:30', '08:46:50', '08:27:50', '08:09:30', '07:52:00', '07:35:00', '07:18:30'],
		['117:38:20', '23:31:40', '22:40:50', '21:51:50', '21:04:30', '20:19:00', '19:35:10', '18:52:50', '18:12:00', '17:32:50', '16:54:50', '16:18:20', '15:43:10', '15:09:10', '14:36:30', '14:04:50', '13:34:30', '13:05:10', '12:36:50', '12:09:40', '11:43:20'],
		['188:29:10', '37:41:50', '36:20:30', '35:02:00', '33:46:20', '32:33:20', '31:23:00', '30:15:10', '29:09:50', '28:06:50', '27:06:10', '26:07:40', '25:11:10', '24:16:50', '23:24:20', '22:33:50', '21:45:00', '20:58:00', '20:12:50', '19:29:10', '18:47:00'],
		['301:51:40', '60:22:20', '58:12:00', '56:06:10', '54:05:00', '52:08:10', '50:15:40', '48:27:00', '46:42:20', '45:01:30', '43:24:20', '41:50:30', '40:20:10', '38:53:00', '37:29:00', '36:08:00', '34:50:00', '33:34:50', '32:22:10', '31:12:20', '30:04:50'],
		['483:15:50', '96:39:10', '93:10:20', '89:49:00', '86:35:00', '83:28:00', '80:27:40', '77:34:00', '74:46:20', '72:04:50', '69:29:10', '66:59:10', '64:34:30', '62:15:00', '60:00:30', '57:50:50', '55:45:50', '53:45:30', '51:49:20', '49:57:20', '48:09:30'],
		['773:29:10', '154:41:50', '149:07:40', '143:45:40', '138:35:00', '133:35:40', '128:47:10', '124:09:00', '119:40:50', '115:22:20', '111:13:10', '107:12:50', '103:21:20', '99:38:00', '96:02:50', '92:35:20', '89:15:20', '86:02:40', '82:56:40', '79:57:30', '77:04:50'],
		['1237:51:40', '247:34:20', '238:39:30', '230:04:00', '221:47:10', '213:48:00', '206:06:10', '198:41:00', '191:31:50', '184:38:10', '177:59:20', '171:35:00', '165:24:20', '159:27:00', '153:42:40', '148:10:40', '142:50:30', '137:42:00', '132:44:30', '127:57:50', '123:21:30'],
		['1980:50:50', '396:10:10', '381:54:30', '368:09:40', '354:54:20', '342:07:50', '329:48:50', '317:56:20', '306:29:40', '295:27:40', '284:49:20', '274:34:10', '264:41:10', '255:09:20', '245:58:20', '237:07:00', '228:34:50', '220:21:00', '212:25:10', '204:46:20', '197:24:00'],
		['3169:38:20', '633:55:40', '611:06:30', '589:06:30', '567:54:00', '547:27:20', '527:44:50', '508:44:50', '490:26:00', '472:46:40', '455:45:30', '439:21:00', '423:32:00', '408:17:10', '393:35:20', '379:25:10', '365:45:40', '352:35:30', '339:54:00', '327:39:50', '315:52:00'],
		['5071:42:30', '1014:20:30', '977:49:30', '942:37:30', '908:41:20', '875:58:40', '844:26:30', '814:02:30', '784:44:10', '756:29:10', '729:15:10', '703:00:00', '677:41:30', '653:17:40', '629:46:30', '607:06:10', '585:14:50', '564:10:40', '543:52:10', '524:17:20', '505:24:50']
		];
	temps_batiments['5'] = [		 // Scierie 
		['04:10:00', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40', '00:33:20', '00:32:10', '00:31:00', '00:30:00', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50'],
		['07:55:00', '01:35:00', '01:31:30', '01:28:20', '01:25:10', '01:22:00', '01:19:10', '01:16:10', '01:13:30', '01:10:50', '01:08:20', '01:05:50', '01:03:30', '01:01:10', '00:59:00', '00:56:50', '00:54:50', '00:52:50', '00:51:00', '00:49:10', '00:47:20'],
		['13:32:30', '02:42:30', '02:36:40', '02:31:00', '02:25:30', '02:20:20', '02:15:20', '02:10:20', '02:05:40', '02:01:10', '01:56:50', '01:52:40', '01:48:30', '01:44:40', '01:40:50', '01:37:20', '01:33:50', '01:30:20', '01:27:10', '01:24:00', '01:21:00'],
		['21:59:10', '04:23:50', '04:14:20', '04:05:10', '03:56:20', '03:47:50', '03:39:30', '03:31:40', '03:24:00', '03:16:40', '03:09:40', '03:02:50', '02:56:10', '02:49:50', '02:43:50', '02:37:50', '02:32:10', '02:26:40', '02:21:30', '02:16:20', '02:11:30'],
		['34:38:20', '06:55:40', '06:40:40', '06:26:10', '06:12:20', '05:59:00', '05:46:00', '05:33:30', '05:21:30', '05:10:00', '04:58:50', '04:48:00', '04:37:40', '04:27:40', '04:18:00', '04:08:50', '03:59:50', '03:51:10', '03:42:50', '03:34:50', '03:27:10']
		];
	temps_batiments['6'] = [		 // Usine de poteries 
		['03:06:40', '00:37:20', '00:36:00', '00:34:40', '00:33:30', '00:32:10', '00:31:00', '00:30:00', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:25:00', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:50', '00:20:00', '00:19:20', '00:18:40'],
		['06:20:00', '01:16:00', '01:13:20', '01:10:40', '01:08:10', '01:05:40', '01:03:20', '01:01:00', '00:58:50', '00:56:40', '00:54:40', '00:52:40', '00:50:50', '00:49:00', '00:47:10', '00:45:30', '00:43:50', '00:42:20', '00:40:40', '00:39:20', '00:37:50'],
		['11:10:00', '02:14:00', '02:09:10', '02:04:30', '02:00:00', '01:55:40', '01:51:30', '01:47:30', '01:43:40', '01:40:00', '01:36:20', '01:32:50', '01:29:30', '01:26:20', '01:23:10', '01:20:10', '01:17:20', '01:14:30', '01:11:50', '01:09:20', '01:06:50'],
		['18:25:00', '03:41:00', '03:33:00', '03:25:20', '03:18:00', '03:10:50', '03:04:00', '02:57:20', '02:51:00', '02:44:50', '02:38:50', '02:33:10', '02:27:40', '02:22:20', '02:17:10', '02:12:20', '02:07:30', '02:03:00', '01:58:30', '01:54:10', '01:50:10'],
		['29:17:30', '05:51:30', '05:38:50', '05:26:40', '05:14:50', '05:03:30', '04:52:40', '04:42:10', '04:32:00', '04:22:10', '04:12:40', '04:03:40', '03:54:50', '03:46:20', '03:38:10', '03:30:20', '03:22:50', '03:15:30', '03:08:30', '03:01:40', '02:55:10']
		];
	temps_batiments['7'] = [		 // Fonderie 
		['05:40:00', '01:08:00', '01:05:30', '01:03:10', '01:01:00', '00:58:40', '00:56:40', '00:54:30', '00:52:40', '00:50:40', '00:48:50', '00:47:10', '00:45:30', '00:43:50', '00:42:10', '00:40:40', '00:39:10', '00:37:50', '00:36:30', '00:35:10', '00:33:50'],
		['10:10:00', '02:02:00', '01:57:40', '01:53:20', '01:49:20', '01:45:20', '01:41:30', '01:37:50', '01:34:20', '01:31:00', '01:27:40', '01:24:30', '01:21:30', '01:18:30', '01:15:40', '01:13:00', '01:10:20', '01:07:50', '01:05:20', '01:03:00', '01:00:50'],
		['16:55:00', '03:23:00', '03:15:40', '03:08:40', '03:01:50', '02:55:20', '02:49:00', '02:42:50', '02:37:00', '02:31:20', '02:26:00', '02:20:40', '02:15:40', '02:10:40', '02:06:00', '02:01:30', '01:57:10', '01:52:50', '01:48:50', '01:45:00', '01:41:10'],
		['27:02:30', '05:24:30', '05:12:50', '05:01:30', '04:50:40', '04:40:10', '04:30:10', '04:20:30', '04:11:00', '04:02:00', '03:53:20', '03:44:50', '03:36:50', '03:29:00', '03:21:30', '03:14:10', '03:07:10', '03:00:30', '02:54:00', '02:47:40', '02:41:40'],
		['42:14:10', '08:26:50', '08:08:30', '07:51:00', '07:34:00', '07:17:40', '07:01:50', '06:46:40', '06:32:00', '06:18:00', '06:04:20', '05:51:10', '05:38:30', '05:26:20', '05:14:40', '05:03:20', '04:52:20', '04:41:50', '04:31:40', '04:22:00', '04:12:30']
		];
	temps_batiments['8'] = [		 // Moulin 
		['02:33:20', '00:30:40', '00:29:30', '00:28:30', '00:27:30', '00:26:30', '00:25:30', '00:24:40', '00:23:40', '00:22:50', '00:22:00', '00:21:20', '00:20:30', '00:19:50', '00:19:00', '00:18:20', '00:17:40', '00:17:00', '00:16:30', '00:15:50', '00:15:20'],
		['05:30:00', '01:06:00', '01:03:40', '01:01:20', '00:59:10', '00:57:00', '00:55:00', '00:53:00', '00:51:00', '00:49:10', '00:47:30', '00:45:40', '00:44:10', '00:42:30', '00:41:00', '00:39:30', '00:38:00', '00:36:40', '00:35:20', '00:34:10', '00:32:50'],
		['09:55:00', '01:59:00', '01:54:40', '01:50:40', '01:46:40', '01:42:50', '01:39:00', '01:35:30', '01:32:00', '01:28:40', '01:25:30', '01:22:30', '01:19:30', '01:16:40', '01:13:50', '01:11:10', '01:08:40', '01:06:10', '01:03:50', '01:01:30', '00:59:20'],
		['16:32:30', '03:18:30', '03:11:20', '03:04:30', '02:57:50', '02:51:30', '02:45:20', '02:39:20', '02:33:30', '02:28:00', '02:22:40', '02:17:30', '02:12:40', '02:07:50', '02:03:10', '01:58:50', '01:54:30', '01:50:20', '01:46:30', '01:42:40', '01:38:50'],
		['26:29:10', '05:17:50', '05:06:20', '04:55:20', '04:44:40', '04:34:20', '04:24:30', '04:15:00', '04:05:50', '03:57:00', '03:48:30', '03:40:10', '03:32:20', '03:24:40', '03:17:20', '03:10:10', '03:03:20', '02:56:40', '02:50:20', '02:44:10', '02:38:20']
		];
	temps_batiments['9'] = [		 // Boulangerie 
		['05:06:40', '01:01:20', '00:59:10', '00:57:00', '00:55:00', '00:53:00', '00:51:00', '00:49:10', '00:47:30', '00:45:40', '00:44:10', '00:42:30', '00:41:00', '00:39:30', '00:38:00', '00:36:40', '00:35:20', '00:34:10', '00:32:50', '00:31:40', '00:30:30'],
		['09:20:00', '01:52:00', '01:48:00', '01:44:00', '01:40:20', '01:36:40', '01:33:10', '01:29:50', '01:26:40', '01:23:30', '01:20:30', '01:17:40', '01:14:50', '01:12:10', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50'],
		['15:40:00', '03:08:00', '03:01:10', '02:54:40', '02:48:30', '02:42:20', '02:36:30', '02:30:50', '02:25:30', '02:20:10', '02:15:10', '02:10:20', '02:05:40', '02:01:00', '01:56:40', '01:52:30', '01:48:30', '01:44:30', '01:40:50', '01:37:10', '01:33:40'],
		['25:10:00', '05:02:00', '04:51:10', '04:40:40', '04:30:30', '04:20:50', '04:11:20', '04:02:20', '03:53:40', '03:45:10', '03:37:10', '03:29:20', '03:21:50', '03:14:30', '03:07:30', '03:00:50', '02:54:10', '02:48:00', '02:42:00', '02:36:10', '02:30:30'],
		['39:25:00', '07:53:00', '07:36:00', '07:19:30', '07:03:40', '06:48:30', '06:33:50', '06:19:40', '06:06:00', '05:52:50', '05:40:00', '05:27:50', '05:16:00', '05:04:40', '04:53:40', '04:43:10', '04:32:50', '04:23:10', '04:13:40', '04:04:30', '03:55:40']
		];
	temps_batiments['10'] = [		 // Dépôt de ressources 
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['11'] = [		 // Silo à céréales 
		['02:13:20', '00:26:40', '00:25:40', '00:24:50', '00:23:50', '00:23:00', '00:22:10', '00:21:20', '00:20:40', '00:19:50', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:30', '00:16:00', '00:15:20', '00:14:50', '00:14:20', '00:13:50', '00:13:20'],
		['03:00:00', '00:36:00', '00:34:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:20', '00:18:30', '00:17:50'],
		['03:53:20', '00:46:40', '00:45:00', '00:43:20', '00:41:50', '00:40:20', '00:38:50', '00:37:30', '00:36:10', '00:34:50', '00:33:30', '00:32:20', '00:31:10', '00:30:00', '00:29:00', '00:28:00', '00:27:00', '00:26:00', '00:25:00', '00:24:10', '00:23:20'],
		['04:55:50', '00:59:10', '00:57:00', '00:55:00', '00:53:00', '00:51:00', '00:49:10', '00:47:30', '00:45:50', '00:44:10', '00:42:30', '00:41:00', '00:39:30', '00:38:10', '00:36:40', '00:35:20', '00:34:10', '00:32:50', '00:31:40', '00:30:30', '00:29:30'],
		['06:08:20', '01:13:40', '01:11:00', '01:08:20', '01:06:00', '01:03:30', '01:01:20', '00:59:00', '00:57:00', '00:54:50', '00:53:00', '00:51:00', '00:49:10', '00:47:20', '00:45:40', '00:44:00', '00:42:30', '00:41:00', '00:39:30', '00:38:00', '00:36:40'],
		['07:31:40', '01:30:20', '01:27:10', '01:24:00', '01:21:00', '01:18:00', '01:15:20', '01:12:30', '01:10:00', '01:07:20', '01:05:00', '01:02:40', '01:00:20', '00:58:10', '00:56:10', '00:54:10', '00:52:10', '00:50:20', '00:48:30', '00:46:40', '00:45:00'],
		['09:09:10', '01:49:50', '01:45:50', '01:42:10', '01:38:20', '01:34:50', '01:31:30', '01:28:10', '01:25:00', '01:22:00', '01:19:00', '01:16:10', '01:13:20', '01:10:50', '01:08:10', '01:05:50', '01:03:20', '01:01:10', '00:58:50', '00:56:50', '00:54:40'],
		['11:02:30', '02:12:30', '02:07:40', '02:03:00', '01:58:40', '01:54:20', '01:50:20', '01:46:20', '01:42:30', '01:38:50', '01:35:10', '01:31:50', '01:28:30', '01:25:20', '01:22:10', '01:19:20', '01:16:20', '01:13:40', '01:11:00', '01:08:30', '01:06:00'],
		['13:13:20', '02:38:40', '02:32:50', '02:27:20', '02:22:10', '02:17:00', '02:12:00', '02:07:20', '02:02:40', '01:58:20', '01:54:00', '01:50:00', '01:46:00', '01:42:10', '01:38:30', '01:35:00', '01:31:30', '01:28:10', '01:25:00', '01:22:00', '01:19:00'],
		['15:45:00', '03:09:00', '03:02:10', '02:55:40', '02:49:20', '02:43:10', '02:37:20', '02:31:40', '02:26:10', '02:21:00', '02:15:50', '02:11:00', '02:06:20', '02:01:40', '01:57:20', '01:53:10', '01:49:00', '01:45:10', '01:41:20', '01:37:40', '01:34:10'],
		['18:40:50', '03:44:10', '03:36:10', '03:28:20', '03:20:50', '03:13:40', '03:06:40', '03:00:00', '02:53:30', '02:47:10', '02:41:10', '02:35:20', '02:29:50', '02:24:30', '02:19:10', '02:14:10', '02:09:20', '02:04:40', '02:00:10', '01:55:50', '01:51:40'],
		['22:05:50', '04:25:10', '04:15:30', '04:06:20', '03:57:30', '03:49:00', '03:40:40', '03:32:50', '03:25:10', '03:17:40', '03:10:40', '03:03:40', '02:57:10', '02:50:50', '02:44:40', '02:38:40', '02:33:00', '02:27:30', '02:22:10', '02:17:00', '02:12:10'],
		['26:02:30', '05:12:30', '05:01:20', '04:50:30', '04:40:00', '04:29:50', '04:20:10', '04:10:50', '04:01:50', '03:53:10', '03:44:40', '03:36:40', '03:28:50', '03:21:20', '03:14:00', '03:07:00', '03:00:20', '02:53:50', '02:47:30', '02:41:30', '02:35:40'],
		['30:37:30', '06:07:30', '05:54:20', '05:41:30', '05:29:20', '05:17:20', '05:06:00', '04:55:00', '04:44:20', '04:34:10', '04:24:10', '04:14:40', '04:05:30', '03:56:40', '03:48:10', '03:40:00', '03:32:00', '03:24:30', '03:17:00', '03:10:00', '03:03:10'],
		['35:56:40', '07:11:20', '06:55:50', '06:40:50', '06:26:30', '06:12:30', '05:59:10', '05:46:10', '05:33:40', '05:21:40', '05:10:10', '04:59:00', '04:48:10', '04:37:50', '04:27:50', '04:18:10', '04:08:50', '04:00:00', '03:51:20', '03:43:00', '03:35:00'],
		['42:06:40', '08:25:20', '08:07:10', '07:49:40', '07:32:40', '07:16:30', '07:00:40', '06:45:30', '06:31:00', '06:16:50', '06:03:20', '05:50:20', '05:37:40', '05:25:30', '05:13:50', '05:02:30', '04:51:40', '04:41:10', '04:31:00', '04:21:10', '04:11:50'],
		['49:15:50', '09:51:10', '09:30:00', '09:09:30', '08:49:40', '08:30:40', '08:12:10', '07:54:30', '07:37:20', '07:21:00', '07:05:00', '06:49:50', '06:35:00', '06:20:50', '06:07:00', '05:53:50', '05:41:10', '05:28:50', '05:17:00', '05:05:40', '04:54:40'],
		['57:34:10', '11:30:50', '11:06:00', '10:42:00', '10:18:50', '09:56:40', '09:35:10', '09:14:30', '08:54:30', '08:35:10', '08:16:40', '07:58:50', '07:41:30', '07:25:00', '07:09:00', '06:53:30', '06:38:40', '06:24:10', '06:10:20', '05:57:00', '05:44:10'],
		['67:11:40', '13:26:20', '12:57:20', '12:29:20', '12:02:20', '11:36:20', '11:11:20', '10:47:10', '10:23:50', '10:01:20', '09:39:40', '09:18:50', '08:58:40', '08:39:20', '08:20:40', '08:02:40', '07:45:20', '07:28:30', '07:12:20', '06:56:50', '06:41:50'],
		['78:21:40', '15:40:20', '15:06:30', '14:33:50', '14:02:30', '13:32:10', '13:02:50', '12:34:40', '12:07:30', '11:41:20', '11:16:10', '10:51:40', '10:28:20', '10:05:40', '09:43:50', '09:22:50', '09:02:30', '08:43:00', '08:24:10', '08:06:00', '07:48:30']
		];
	temps_batiments['12'] = [		 // Armurerie 
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['13'] = [		 // Usine d'armures 
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['14'] = [		 // Place du tournoi 
		['04:51:40', '00:58:20', '00:56:10', '00:54:10', '00:52:20', '00:50:20', '00:48:30', '00:46:50', '00:45:10', '00:43:30', '00:42:00', '00:40:30', '00:39:00', '00:37:30', '00:36:10', '00:34:50', '00:33:40', '00:32:30', '00:31:20', '00:30:10', '00:29:00'],
		['06:03:20', '01:12:40', '01:10:00', '01:07:30', '01:05:10', '01:02:50', '01:00:30', '00:58:20', '00:56:10', '00:54:10', '00:52:10', '00:50:20', '00:48:30', '00:46:50', '00:45:10', '00:43:30', '00:42:00', '00:40:30', '00:39:00', '00:37:30', '00:36:10'],
		['07:26:40', '01:29:20', '01:26:00', '01:23:00', '01:20:00', '01:17:10', '01:14:20', '01:11:40', '01:09:00', '01:06:40', '01:04:10', '01:01:50', '00:59:40', '00:57:30', '00:55:30', '00:53:30', '00:51:30', '00:49:40', '00:47:50', '00:46:10', '00:44:30'],
		['09:02:30', '01:48:30', '01:44:40', '01:40:50', '01:37:20', '01:33:50', '01:30:20', '01:27:10', '01:24:00', '01:21:00', '01:18:00', '01:15:20', '01:12:30', '01:10:00', '01:07:20', '01:05:00', '01:02:40', '01:00:20', '00:58:10', '00:56:10', '00:54:10'],
		['10:55:00', '02:11:00', '02:06:10', '02:01:40', '01:57:20', '01:53:10', '01:49:00', '01:45:10', '01:41:20', '01:37:40', '01:34:10', '01:30:50', '01:27:30', '01:24:20', '01:21:20', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10'],
		['13:04:10', '02:36:50', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:40', '01:44:50', '01:41:00', '01:37:30', '01:33:50', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10'],
		['15:35:00', '03:07:00', '03:00:20', '02:53:50', '02:47:30', '02:41:30', '02:35:40', '02:30:00', '02:24:40', '02:19:30', '02:14:30', '02:09:40', '02:05:00', '02:00:30', '01:56:10', '01:52:00', '01:47:50', '01:44:00', '01:40:20', '01:36:40', '01:33:10'],
		['18:30:00', '03:42:00', '03:34:00', '03:26:10', '03:18:50', '03:11:40', '03:04:50', '02:58:10', '02:51:40', '02:45:30', '02:39:30', '02:33:50', '02:28:20', '02:23:00', '02:17:50', '02:12:50', '02:08:00', '02:03:30', '01:59:00', '01:54:40', '01:50:30'],
		['21:52:30', '04:22:30', '04:13:00', '04:03:50', '03:55:10', '03:46:40', '03:38:30', '03:30:40', '03:23:00', '03:15:40', '03:08:40', '03:01:50', '02:55:20', '02:49:00', '02:43:00', '02:37:00', '02:31:30', '02:26:00', '02:20:40', '02:15:40', '02:10:50'],
		['25:47:30', '05:09:30', '04:58:20', '04:47:30', '04:37:10', '04:27:10', '04:17:40', '04:08:20', '03:59:20', '03:50:50', '03:42:30', '03:34:30', '03:26:40', '03:19:20', '03:12:10', '03:05:10', '02:58:30', '02:52:10', '02:45:50', '02:40:00', '02:34:10'],
		['30:20:00', '06:04:00', '05:50:50', '05:38:10', '05:26:00', '05:14:20', '05:03:00', '04:52:00', '04:41:30', '04:31:30', '04:21:40', '04:12:10', '04:03:10', '03:54:20', '03:46:00', '03:37:50', '03:30:00', '03:22:30', '03:15:10', '03:08:10', '03:01:20'],
		['35:35:50', '07:07:10', '06:51:50', '06:37:00', '06:22:40', '06:08:50', '05:55:40', '05:42:50', '05:30:30', '05:18:30', '05:07:10', '04:56:00', '04:45:20', '04:35:10', '04:25:10', '04:15:40', '04:06:30', '03:57:40', '03:49:00', '03:40:50', '03:32:50'],
		['41:42:30', '08:20:30', '08:02:30', '07:45:10', '07:28:20', '07:12:10', '06:56:40', '06:41:40', '06:27:10', '06:13:20', '05:59:50', '05:46:50', '05:34:20', '05:22:20', '05:10:50', '04:59:30', '04:48:50', '04:38:20', '04:28:20', '04:18:40', '04:09:20'],
		['48:48:20', '09:45:40', '09:24:30', '09:04:10', '08:44:40', '08:25:40', '08:07:30', '07:50:00', '07:33:00', '07:16:40', '07:01:00', '06:45:50', '06:31:10', '06:17:10', '06:03:40', '05:50:30', '05:37:50', '05:25:40', '05:14:00', '05:02:40', '04:51:50'],
		['57:01:40', '11:24:20', '10:59:40', '10:35:50', '10:13:00', '09:51:00', '09:29:40', '09:09:10', '08:49:20', '08:30:20', '08:12:00', '07:54:20', '07:37:10', '07:20:40', '07:04:50', '06:49:30', '06:34:50', '06:20:40', '06:06:50', '05:53:40', '05:41:00'],
		['66:34:10', '13:18:50', '12:50:00', '12:22:20', '11:55:40', '11:29:50', '11:05:00', '10:41:00', '10:18:00', '09:55:40', '09:34:20', '09:13:40', '08:53:40', '08:34:30', '08:16:00', '07:58:10', '07:40:50', '07:24:20', '07:08:20', '06:52:50', '06:38:00'],
		['77:38:20', '15:31:40', '14:58:00', '14:25:40', '13:54:30', '13:24:30', '12:55:30', '12:27:40', '12:00:40', '11:34:50', '11:09:50', '10:45:40', '10:22:20', '10:00:00', '09:38:20', '09:17:30', '08:57:30', '08:38:10', '08:19:30', '08:01:30', '07:44:10'],
		['90:28:20', '18:05:40', '17:26:30', '16:48:50', '16:12:30', '15:37:30', '15:03:50', '14:31:20', '13:59:50', '13:29:40', '13:00:30', '12:32:30', '12:05:20', '11:39:10', '11:14:00', '10:49:50', '10:26:20', '10:03:50', '09:42:10', '09:21:10', '09:01:00'],
		['105:21:40', '21:04:20', '20:18:50', '19:35:00', '18:52:40', '18:11:50', '17:32:30', '16:54:40', '16:18:10', '15:43:00', '15:09:00', '14:36:20', '14:04:40', '13:34:20', '13:05:00', '12:36:40', '12:09:30', '11:43:10', '11:18:00', '10:53:30', '10:30:00'],
		['122:38:20', '24:31:40', '23:38:40', '22:47:40', '21:58:20', '21:10:50', '20:25:10', '19:41:00', '18:58:30', '18:17:30', '17:38:00', '17:00:00', '16:23:10', '15:47:50', '15:13:40', '14:40:50', '14:09:10', '13:38:30', '13:09:00', '12:40:40', '12:13:20']
		];
	temps_batiments['15'] = [		 // Bâtiment principal  
		['05:33:20', '-  ', '-  ', '-  ', '-', '-', '-', '-', '-', '-  ', '-  ', '-  ', '-', '-  ', '-  ', '-  ', '-', '-  ', '-  ', '-  ', '-'],
		['- ', '00:43:40', '- ', '- ', '-', '-', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '00:53:40', '- ', '-', '-', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '01:04:40', '-', '-', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '01:16:50', '-', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '01:30:10', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '01:45:00', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '02:01:20', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '02:19:40', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '02:39:50', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '- ', '03:02:20', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '- ', '- ', '03:27:20', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '- ', '- ', '- ', '03:55:20', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '- ', '- ', '- ', '-', '04:26:20', '- ', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '05:00:50', '- ', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '05:39:30', '-', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '06:22:30', '- ', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '07:10:30', '- ', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '08:04:00', '- ', '-'],
		['- ', '- ', '- ', '- ', '-', '-', '-', '-', '-', '- ', '- ', '- ', '-', '- ', '- ', '- ', '-', '- ', '- ', '09:03:50', '-']
		];
	temps_batiments['16'] = [		 // Place de rassemblement 
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['17'] = [		 // Place du marché 
		['02:30:00', '00:30:00', '00:29:00', '00:27:50', '00:26:50', '00:25:50', '00:25:00', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:50', '00:20:00', '00:19:20', '00:18:40', '00:18:00', '00:17:20', '00:16:40', '00:16:10', '00:15:30', '00:15:00'],
		['03:19:10', '00:39:50', '00:38:20', '00:37:00', '00:35:40', '00:34:20', '00:33:10', '00:32:00', '00:30:50', '00:29:40', '00:28:40', '00:27:40', '00:26:40', '00:25:40', '00:24:40', '00:23:50', '00:23:00', '00:22:10', '00:21:20', '00:20:30', '00:19:50'],
		['04:15:50', '00:51:10', '00:49:20', '00:47:30', '00:45:50', '00:44:10', '00:42:40', '00:41:00', '00:39:40', '00:38:10', '00:36:50', '00:35:30', '00:34:10', '00:33:00', '00:31:50', '00:30:40', '00:29:30', '00:28:30', '00:27:30', '00:26:30', '00:25:30'],
		['05:21:40', '01:04:20', '01:02:00', '00:59:50', '00:57:40', '00:55:30', '00:53:30', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:00'],
		['06:38:20', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:04:00', '01:01:40', '00:59:20', '00:57:20', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40', '00:41:10', '00:39:40'],
		['08:06:40', '01:37:20', '01:33:50', '01:30:30', '01:27:20', '01:24:10', '01:21:00', '01:18:10', '01:15:20', '01:12:40', '01:10:00', '01:07:30', '01:05:00', '01:02:40', '01:00:30', '00:58:20', '00:56:10', '00:54:10', '00:52:10', '00:50:20', '00:48:30'],
		['09:50:00', '01:58:00', '01:53:40', '01:49:40', '01:45:40', '01:41:50', '01:38:10', '01:34:40', '01:31:20', '01:28:00', '01:24:50', '01:21:50', '01:18:50', '01:16:00', '01:13:10', '01:10:40', '01:08:00', '01:05:40', '01:03:20', '01:01:00', '00:58:50'],
		['11:49:10', '02:21:50', '02:16:40', '02:11:50', '02:07:00', '02:02:30', '01:58:10', '01:53:50', '01:49:40', '01:45:50', '01:42:00', '01:38:20', '01:34:50', '01:31:20', '01:28:00', '01:24:50', '01:21:50', '01:18:50', '01:16:00', '01:13:20', '01:10:40'],
		['14:07:30', '02:49:30', '02:43:30', '02:37:30', '02:31:50', '02:26:30', '02:21:10', '02:16:00', '02:11:10', '02:06:30', '02:01:50', '01:57:30', '01:53:20', '01:49:10', '01:45:20', '01:41:30', '01:37:50', '01:34:20', '01:30:50', '01:27:40', '01:24:30'],
		['16:48:20', '03:21:40', '03:14:30', '03:07:30', '03:00:40', '02:54:10', '02:47:50', '02:41:50', '02:36:00', '02:30:20', '02:25:00', '02:19:50', '02:14:40', '02:09:50', '02:05:10', '02:00:40', '01:56:20', '01:52:10', '01:48:10', '01:44:10', '01:40:30'],
		['19:55:00', '03:59:00', '03:50:20', '03:42:00', '03:34:00', '03:26:20', '03:19:00', '03:11:50', '03:04:50', '02:58:10', '02:51:50', '02:45:40', '02:39:40', '02:33:50', '02:28:20', '02:23:00', '02:17:50', '02:12:50', '02:08:10', '02:03:30', '01:59:00'],
		['23:30:50', '04:42:10', '04:32:00', '04:22:10', '04:12:50', '04:03:40', '03:55:00', '03:46:30', '03:38:20', '03:30:30', '03:22:50', '03:15:30', '03:08:30', '03:01:40', '02:55:10', '02:48:50', '02:42:50', '02:37:00', '02:31:20', '02:25:50', '02:20:40'],
		['27:41:40', '05:32:20', '05:20:20', '05:08:50', '04:57:40', '04:47:00', '04:36:40', '04:26:40', '04:17:10', '04:07:50', '03:59:00', '03:50:20', '03:42:00', '03:34:00', '03:26:20', '03:18:50', '03:11:40', '03:04:50', '02:58:10', '02:51:50', '02:45:40'],
		['32:32:30', '06:30:30', '06:16:30', '06:02:50', '05:49:50', '05:37:10', '05:25:10', '05:13:20', '05:02:10', '04:51:10', '04:40:40', '04:30:40', '04:20:50', '04:11:30', '04:02:30', '03:53:40', '03:45:20', '03:37:10', '03:29:20', '03:21:50', '03:14:30'],
		['38:10:00', '07:38:00', '07:21:30', '07:05:40', '06:50:20', '06:35:30', '06:21:20', '06:07:30', '05:54:20', '05:41:30', '05:29:20', '05:17:20', '05:06:00', '04:55:00', '04:44:20', '04:34:10', '04:24:10', '04:14:40', '04:05:30', '03:56:40', '03:48:10'],
		['44:41:40', '08:56:20', '08:37:00', '08:18:20', '08:00:20', '07:43:10', '07:26:30', '07:10:20', '06:54:50', '06:40:00', '06:25:30', '06:11:40', '05:58:20', '05:45:20', '05:33:00', '05:21:00', '05:09:20', '04:58:20', '04:47:30', '04:37:10', '04:27:10'],
		['52:15:00', '10:27:00', '10:04:30', '09:42:40', '09:21:50', '09:01:30', '08:42:00', '08:23:10', '08:05:10', '07:47:40', '07:30:50', '07:14:40', '06:59:00', '06:43:50', '06:29:20', '06:15:20', '06:01:50', '05:48:50', '05:36:10', '05:24:10', '05:12:30'],
		['61:01:40', '12:12:20', '11:46:00', '11:20:40', '10:56:10', '10:32:30', '10:09:40', '09:47:50', '09:26:40', '09:06:10', '08:46:30', '08:27:40', '08:09:20', '07:51:40', '07:34:40', '07:18:20', '07:02:30', '06:47:20', '06:32:40', '06:18:30', '06:05:00'],
		['71:12:30', '14:14:30', '13:43:50', '13:14:10', '12:45:30', '12:18:00', '11:51:30', '11:25:50', '11:01:10', '10:37:20', '10:14:20', '09:52:20', '09:31:00', '09:10:20', '08:50:40', '08:31:30', '08:13:00', '07:55:20', '07:38:10', '07:21:40', '07:05:50'],
		['83:01:40', '16:36:20', '16:00:30', '15:25:50', '14:52:30', '14:20:20', '13:49:30', '13:19:30', '12:50:50', '12:23:00', '11:56:20', '11:30:30', '11:05:40', '10:41:40', '10:18:30', '09:56:20', '09:34:50', '09:14:10', '08:54:10', '08:35:00', '08:16:30']
		];
	temps_batiments['18'] = [	 // Ambassade 	
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['19'] = [		 // Caserne 
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['20'] = [		 // Écurie 
		['03:03:20', '00:36:40', '00:35:20', '00:34:00', '00:32:50', '00:31:40', '00:30:30', '00:29:30', '00:28:20', '00:27:20', '00:26:20', '00:25:20', '00:24:30', '00:23:40', '00:22:50', '00:22:00', '00:21:10', '00:20:20', '00:19:40', '00:19:00', '00:18:20'],
		['03:57:30', '00:47:30', '00:45:50', '00:44:10', '00:42:30', '00:41:00', '00:39:30', '00:38:10', '00:36:50', '00:35:30', '00:34:10', '00:33:00', '00:31:50', '00:30:40', '00:29:30', '00:28:30', '00:27:30', '00:26:30', '00:25:30', '00:24:30', '00:23:40'],
		['05:00:50', '01:00:10', '00:58:00', '00:55:50', '00:53:50', '00:52:00', '00:50:00', '00:48:20', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40', '00:33:30', '00:32:10', '00:31:10', '00:30:00'],
		['06:14:10', '01:14:50', '01:12:00', '01:09:30', '01:07:00', '01:04:30', '01:02:10', '01:00:00', '00:57:50', '00:55:50', '00:53:40', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:40', '00:43:10', '00:41:30', '00:40:10', '00:38:40', '00:37:20'],
		['07:38:20', '01:31:40', '01:28:30', '01:25:10', '01:22:10', '01:19:10', '01:16:20', '01:13:40', '01:11:00', '01:08:20', '01:06:00', '01:03:30', '01:01:20', '00:59:00', '00:57:00', '00:54:50', '00:53:00', '00:51:00', '00:49:10', '00:47:20', '00:45:40'],
		['09:16:40', '01:51:20', '01:47:20', '01:43:30', '01:39:50', '01:36:10', '01:32:40', '01:29:20', '01:26:10', '01:23:00', '01:20:10', '01:17:10', '01:14:30', '01:11:40', '01:09:10', '01:06:40', '01:04:20', '01:02:00', '00:59:40', '00:57:30', '00:55:30'],
		['11:10:50', '02:14:10', '02:09:20', '02:04:40', '02:00:10', '01:55:50', '01:51:40', '01:47:40', '01:43:50', '01:40:10', '01:36:30', '01:33:00', '01:29:40', '01:26:30', '01:23:20', '01:20:20', '01:17:30', '01:14:40', '01:12:00', '01:09:20', '01:06:50'],
		['13:23:20', '02:40:40', '02:34:50', '02:29:20', '02:24:00', '02:18:50', '02:13:50', '02:09:00', '02:04:20', '01:59:50', '01:55:30', '01:51:20', '01:47:20', '01:43:30', '01:39:50', '01:36:10', '01:32:40', '01:29:20', '01:26:10', '01:23:00', '01:20:00'],
		['15:56:40', '03:11:20', '03:04:30', '02:57:50', '02:51:30', '02:45:20', '02:39:20', '02:33:40', '02:28:00', '02:22:50', '02:17:40', '02:12:40', '02:07:50', '02:03:20', '01:58:50', '01:54:30', '01:50:30', '01:46:30', '01:42:40', '01:39:00', '01:35:20'],
		['18:55:00', '03:47:00', '03:38:50', '03:31:00', '03:23:20', '03:16:00', '03:09:00', '03:02:10', '02:55:40', '02:49:20', '02:43:10', '02:37:20', '02:31:40', '02:26:10', '02:21:00', '02:15:50', '02:11:00', '02:06:20', '02:01:40', '01:57:20', '01:53:10'],
		['22:21:40', '04:28:20', '04:18:40', '04:09:20', '04:00:20', '03:51:50', '03:43:20', '03:35:20', '03:27:40', '03:20:10', '03:13:00', '03:06:00', '02:59:20', '02:52:50', '02:46:40', '02:40:40', '02:34:50', '02:29:20', '02:23:50', '02:18:40', '02:13:40'],
		['26:21:40', '05:16:20', '05:04:50', '04:54:00', '04:43:20', '04:33:10', '04:23:20', '04:13:50', '04:04:40', '03:55:50', '03:47:20', '03:39:10', '03:31:20', '03:23:40', '03:16:20', '03:09:20', '03:02:30', '02:56:00', '02:49:40', '02:43:30', '02:37:40'],
		['30:59:10', '06:11:50', '05:58:30', '05:45:40', '05:33:10', '05:21:10', '05:09:40', '04:58:30', '04:47:40', '04:37:20', '04:27:20', '04:17:50', '04:08:30', '03:59:30', '03:50:50', '03:42:40', '03:34:30', '03:26:50', '03:19:20', '03:12:10', '03:05:20'],
		['36:21:40', '07:16:20', '07:00:40', '06:45:30', '06:31:00', '06:16:50', '06:03:20', '05:50:10', '05:37:40', '05:25:30', '05:13:50', '05:02:30', '04:51:30', '04:41:00', '04:31:00', '04:21:10', '04:11:50', '04:02:40', '03:54:00', '03:45:30', '03:37:30'],
		['42:35:50', '08:31:10', '08:12:50', '07:55:10', '07:38:00', '07:21:30', '07:05:40', '06:50:20', '06:35:30', '06:21:20', '06:07:30', '05:54:20', '05:41:30', '05:29:20', '05:17:20', '05:06:00', '04:55:00', '04:44:20', '04:34:10', '04:24:10', '04:14:40'],
		['49:50:00', '09:58:00', '09:36:30', '09:15:40', '08:55:40', '08:36:30', '08:17:50', '08:00:00', '07:42:40', '07:26:00', '07:10:00', '06:54:30', '06:39:30', '06:25:10', '06:11:20', '05:58:00', '05:45:00', '05:32:40', '05:20:40', '05:09:10', '04:58:00'],
		['58:13:20', '11:38:40', '11:13:30', '10:49:20', '10:26:00', '10:03:20', '09:41:40', '09:20:40', '09:00:30', '08:41:10', '08:22:20', '08:04:20', '07:46:50', '07:30:00', '07:13:50', '06:58:10', '06:43:10', '06:28:40', '06:14:40', '06:01:10', '05:48:10'],
		['67:57:30', '13:35:30', '13:06:10', '12:37:50', '12:10:30', '11:44:20', '11:18:50', '10:54:30', '10:30:50', '10:08:10', '09:46:20', '09:25:10', '09:04:50', '08:45:10', '08:26:20', '08:08:10', '07:50:30', '07:33:40', '07:17:20', '07:01:30', '06:46:20'],
		['79:15:00', '15:51:00', '15:16:50', '14:43:50', '14:12:00', '13:41:20', '13:11:40', '12:43:10', '12:15:40', '11:49:10', '11:23:40', '10:59:10', '10:35:20', '10:12:30', '09:50:30', '09:29:10', '09:08:40', '08:49:00', '08:29:50', '08:11:30', '07:53:50'],
		['92:20:50', '18:28:10', '17:48:20', '17:09:50', '16:32:40', '15:57:00', '15:22:30', '14:49:20', '14:17:20', '13:46:30', '13:16:40', '12:48:00', '12:20:20', '11:53:40', '11:28:00', '11:03:20', '10:39:20', '10:16:20', '09:54:10', '09:32:50', '09:12:10']
		];
	temps_batiments['21'] = [		 // Atelier 
		['04:10:00', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40', '00:33:20', '00:32:10', '00:31:00', '00:30:00', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50'],
		['05:15:00', '01:03:00', '01:00:40', '00:58:30', '00:56:30', '00:54:20', '00:52:30', '00:50:30', '00:48:40', '00:47:00', '00:45:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20'],
		['06:30:00', '01:18:00', '01:15:20', '01:12:30', '01:10:00', '01:07:30', '01:05:00', '01:02:40', '01:00:20', '00:58:10', '00:56:10', '00:54:10', '00:52:10', '00:50:20', '00:48:30', '00:46:40', '00:45:00', '00:43:30', '00:41:50', '00:40:20', '00:38:50'],
		['07:57:30', '01:35:30', '01:32:10', '01:28:50', '01:25:40', '01:22:30', '01:19:30', '01:16:40', '01:14:00', '01:11:20', '01:08:40', '01:06:10', '01:03:50', '01:01:30', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:10', '00:49:20', '00:47:40'],
		['09:39:10', '01:55:50', '01:51:40', '01:47:40', '01:43:50', '01:40:00', '01:36:30', '01:33:00', '01:29:40', '01:26:20', '01:23:20', '01:20:20', '01:17:20', '01:14:40', '01:12:00', '01:09:20', '01:06:50', '01:04:30', '01:02:10', '00:59:50', '00:57:40'],
		['11:36:40', '02:19:20', '02:14:20', '02:09:30', '02:04:50', '02:00:20', '01:56:00', '01:51:50', '01:47:50', '01:44:00', '01:40:10', '01:36:40', '01:33:10', '01:29:50', '01:26:30', '01:23:30', '01:20:30', '01:17:30', '01:14:40', '01:12:00', '01:09:30'],
		['13:53:20', '02:46:40', '02:40:40', '02:35:00', '02:29:20', '02:24:00', '02:18:50', '02:13:50', '02:09:00', '02:04:20', '01:59:50', '01:55:30', '01:51:20', '01:47:20', '01:43:30', '01:39:50', '01:36:10', '01:32:40', '01:29:20', '01:26:10', '01:23:00'],
		['16:31:40', '03:18:20', '03:11:10', '03:04:20', '02:57:40', '02:51:20', '02:45:10', '02:39:10', '02:33:30', '02:28:00', '02:22:40', '02:17:30', '02:12:30', '02:07:50', '02:03:10', '01:58:40', '01:54:30', '01:50:20', '01:46:20', '01:42:30', '01:38:50'],
		['19:35:50', '03:55:10', '03:46:40', '03:38:30', '03:30:40', '03:23:00', '03:15:40', '03:08:40', '03:01:50', '02:55:20', '02:49:00', '02:43:00', '02:37:10', '02:31:30', '02:26:00', '02:20:40', '02:15:40', '02:10:50', '02:06:00', '02:01:30', '01:57:10'],
		['23:08:20', '04:37:40', '04:27:40', '04:18:10', '04:08:50', '03:59:50', '03:51:10', '03:42:50', '03:34:50', '03:27:10', '03:19:40', '03:12:30', '03:05:30', '02:58:50', '02:52:30', '02:46:10', '02:40:10', '02:34:30', '02:29:00', '02:23:30', '02:18:20'],
		['03:15:50', '05:27:10', '05:15:20', '05:04:00', '04:53:10', '04:42:30', '04:32:20', '04:22:30', '04:13:10', '04:04:00', '03:55:10', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30', '02:49:10', '02:43:00'],
		['08:02:30', '06:24:30', '06:10:40', '05:57:20', '05:44:30', '05:32:00', '05:20:10', '05:08:40', '04:57:30', '04:46:50', '04:36:30', '04:26:30', '04:16:50', '04:07:40', '03:58:40', '03:50:10', '03:41:50', '03:33:50', '03:26:10', '03:18:50', '03:11:40'],
		['13:35:00', '07:31:00', '07:14:50', '06:59:10', '06:44:00', '06:29:30', '06:15:30', '06:02:00', '05:49:00', '05:36:20', '05:24:20', '05:12:40', '05:01:20', '04:50:30', '04:40:00', '04:30:00', '04:20:10', '04:10:50', '04:01:50', '03:53:10', '03:44:40'],
		['20:00:50', '08:48:10', '08:29:10', '08:10:50', '07:53:10', '07:36:10', '07:19:40', '07:03:50', '06:48:40', '06:34:00', '06:19:50', '06:06:10', '05:52:50', '05:40:10', '05:28:00', '05:16:10', '05:04:50', '04:53:50', '04:43:10', '04:33:00', '04:23:10'],
		['03:28:20', '10:17:40', '09:55:30', '09:34:00', '09:13:20', '08:53:30', '08:34:20', '08:15:50', '07:57:50', '07:40:40', '07:24:10', '07:08:10', '06:52:40', '06:37:50', '06:23:30', '06:09:40', '05:56:30', '05:43:40', '05:31:10', '05:19:20', '05:07:50'],
		['12:07:30', '12:01:30', '11:35:40', '11:10:30', '10:46:20', '10:23:10', '10:00:40', '09:39:10', '09:18:10', '08:58:10', '08:38:50', '08:20:10', '08:02:10', '07:44:40', '07:28:00', '07:11:50', '06:56:20', '06:41:20', '06:26:50', '06:13:00', '05:59:30'],
		['22:10:00', '14:02:00', '13:31:40', '13:02:30', '12:34:20', '12:07:10', '11:41:00', '11:15:50', '10:51:30', '10:28:00', '10:05:20', '09:43:30', '09:22:30', '09:02:20', '08:42:50', '08:24:00', '08:05:50', '07:48:20', '07:31:30', '07:15:10', '06:59:30'],
		['09:48:20', '16:21:40', '15:46:20', '15:12:20', '14:39:30', '14:07:50', '13:37:20', '13:07:50', '12:39:30', '12:12:10', '11:45:50', '11:20:20', '10:55:50', '10:32:20', '10:09:30', '09:47:40', '09:26:30', '09:06:00', '08:46:20', '08:27:30', '08:09:10'],
		['23:19:10', '19:03:50', '18:22:40', '17:43:00', '17:04:40', '16:27:50', '15:52:10', '15:18:00', '14:44:50', '14:13:00', '13:42:20', '13:12:40', '12:44:10', '12:16:40', '11:50:10', '11:24:40', '11:00:00', '10:36:10', '10:13:20', '09:51:10', '09:30:00'],
		['14:59:10', '22:11:50', '21:23:50', '20:37:40', '19:53:10', '19:10:10', '18:28:50', '17:48:50', '17:10:20', '16:33:20', '15:57:30', '15:23:00', '14:49:50', '14:17:50', '13:46:50', '13:17:10', '12:48:30', '12:20:50', '11:54:10', '11:28:20', '11:03:40']
		];
	temps_batiments['22'] = [		 // Académie 
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['23'] = [		 // Cachette 
		['01:02:30', '00:12:30', '00:12:00', '00:11:40', '00:11:10', '00:10:50', '00:10:20', '00:10:00', '00:09:40', '00:09:20', '00:09:00', '00:08:40', '00:08:20', '00:08:00', '00:07:50', '00:07:30', '00:07:10', '00:07:00', '00:06:40', '00:06:30', '00:06:10'],
		['01:37:30', '00:19:30', '00:18:50', '00:18:10', '00:17:30', '00:16:50', '00:16:10', '00:15:40', '00:15:10', '00:14:30', '00:14:00', '00:13:30', '00:13:00', '00:12:30', '00:12:10', '00:11:40', '00:11:20', '00:10:50', '00:10:30', '00:10:00', '00:09:40'],
		['02:18:20', '00:27:40', '00:26:40', '00:25:40', '00:24:40', '00:23:50', '00:23:00', '00:22:10', '00:21:20', '00:20:40', '00:19:50', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:30', '00:16:00', '00:15:20', '00:14:50', '00:14:20', '00:13:50'],
		['03:05:00', '00:37:00', '00:35:40', '00:34:30', '00:33:10', '00:32:00', '00:30:50', '00:29:40', '00:28:40', '00:27:40', '00:26:40', '00:25:40', '00:24:40', '00:23:50', '00:23:00', '00:22:10', '00:21:20', '00:20:40', '00:19:50', '00:19:10', '00:18:30'],
		['04:00:00', '00:48:00', '00:46:10', '00:44:30', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:10', '00:32:00', '00:30:50', '00:29:50', '00:28:40', '00:27:40', '00:26:40', '00:25:40', '00:24:50', '00:23:50'],
		['05:03:20', '01:00:40', '00:58:30', '00:56:20', '00:54:20', '00:52:20', '00:50:30', '00:48:40', '00:46:50', '00:45:10', '00:43:40', '00:42:00', '00:40:30', '00:39:00', '00:37:40', '00:36:20', '00:35:00', '00:33:40', '00:32:30', '00:31:20', '00:30:10'],
		['06:16:40', '01:15:20', '01:12:40', '01:10:00', '01:07:30', '01:05:00', '01:02:40', '01:00:30', '00:58:20', '00:56:10', '00:54:10', '00:52:10', '00:50:20', '00:48:30', '00:46:50', '00:45:10', '00:43:30', '00:41:50', '00:40:20', '00:39:00', '00:37:30'],
		['07:41:40', '01:32:20', '01:29:00', '01:25:50', '01:22:50', '01:19:50', '01:17:00', '01:14:10', '01:11:30', '01:08:50', '01:06:30', '01:04:00', '01:01:40', '00:59:30', '00:57:20', '00:55:20', '00:53:20', '00:51:20', '00:49:30', '00:47:50', '00:46:00'],
		['09:20:50', '01:52:10', '01:48:10', '01:44:10', '01:40:30', '01:36:50', '01:33:20', '01:30:00', '01:26:50', '01:23:40', '01:20:40', '01:17:40', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:40', '01:02:20', '01:00:10', '00:58:00', '00:55:50'],
		['11:15:50', '02:15:10', '02:10:20', '02:05:30', '02:01:00', '01:56:40', '01:52:30', '01:48:30', '01:44:30', '01:40:50', '01:37:10', '01:33:40', '01:30:20', '01:27:00', '01:23:50', '01:20:50', '01:18:00', '01:15:10', '01:12:30', '01:09:50', '01:07:20']
		];
	temps_batiments['24'] = [		 // Hôtel de ville 
		['17:21:40', '03:28:20', '03:20:50', '03:13:40', '03:06:40', '02:59:50', '02:53:30', '02:47:10', '02:41:10', '02:35:20', '02:29:50', '02:24:20', '02:19:10', '02:14:10', '02:09:20', '02:04:40', '02:00:10', '01:55:50', '01:51:40', '01:47:40', '01:43:50'],
		['20:33:20', '04:06:40', '03:57:50', '03:49:10', '03:41:00', '03:33:00', '03:25:20', '03:18:00', '03:10:50', '03:04:00', '02:57:20', '02:51:00', '02:44:50', '02:38:50', '02:33:10', '02:27:40', '02:22:20', '02:17:10', '02:12:20', '02:07:30', '02:02:50'],
		['24:15:50', '04:51:10', '04:40:40', '04:30:30', '04:20:50', '04:11:30', '04:02:20', '03:53:40', '03:45:10', '03:37:10', '03:29:20', '03:21:50', '03:14:30', '03:07:30', '03:00:50', '02:54:10', '02:48:00', '02:42:00', '02:36:10', '02:30:30', '02:25:00'],
		['28:33:20', '05:42:40', '05:30:20', '05:18:30', '05:07:00', '04:56:00', '04:45:20', '04:35:00', '04:25:10', '04:15:40', '04:06:20', '03:57:30', '03:49:00', '03:40:40', '03:32:50', '03:25:10', '03:17:40', '03:10:40', '03:03:50', '02:57:10', '02:50:50'],
		['33:32:30', '06:42:30', '06:28:00', '06:14:10', '06:00:40', '05:47:40', '05:35:10', '05:23:00', '05:11:30', '05:00:10', '04:49:20', '04:39:00', '04:29:00', '04:19:20', '04:10:00', '04:01:00', '03:52:20', '03:43:50', '03:35:50', '03:28:00', '03:20:30'],
		['39:20:00', '07:52:00', '07:35:00', '07:18:40', '07:02:50', '06:47:30', '06:32:50', '06:18:50', '06:05:10', '05:52:00', '05:39:20', '05:27:10', '05:15:20', '05:04:00', '04:53:00', '04:42:30', '04:32:20', '04:22:30', '04:13:00', '04:04:00', '03:55:10'],
		['46:02:30', '09:12:30', '08:52:30', '08:33:20', '08:15:00', '07:57:10', '07:40:00', '07:23:20', '07:07:20', '06:52:00', '06:37:10', '06:22:50', '06:09:10', '05:55:50', '05:43:00', '05:30:40', '05:18:50', '05:07:20', '04:56:10', '04:45:30', '04:35:20'],
		['53:49:10', '10:45:50', '10:22:40', '10:00:10', '09:38:40', '09:17:50', '08:57:40', '08:38:20', '08:19:40', '08:01:40', '07:44:20', '07:27:40', '07:11:30', '06:56:00', '06:41:00', '06:26:30', '06:12:40', '05:59:10', '05:46:20', '05:33:50', '05:21:50'],
		['62:50:50', '12:34:10', '12:07:00', '11:40:50', '11:15:40', '10:51:20', '10:27:50', '10:05:20', '09:43:30', '09:22:30', '09:02:10', '08:42:40', '08:23:50', '08:05:50', '07:48:20', '07:31:20', '07:15:10', '06:59:30', '06:44:20', '06:29:50', '06:15:50'],
		['73:19:10', '14:39:50', '14:08:10', '13:37:40', '13:08:10', '12:39:50', '12:12:30', '11:46:10', '11:20:40', '10:56:10', '10:32:30', '10:09:50', '09:47:50', '09:26:40', '09:06:20', '08:46:40', '08:27:40', '08:09:20', '07:51:50', '07:34:50', '07:18:20'],
		['85:28:20', '17:05:40', '16:28:40', '15:53:10', '15:18:50', '14:45:40', '14:13:50', '13:43:10', '13:13:30', '12:45:00', '12:17:20', '11:50:50', '11:25:20', '11:00:30', '10:36:50', '10:13:50', '09:51:50', '09:30:30', '09:10:00', '08:50:10', '08:31:00'],
		['99:34:10', '19:54:50', '19:11:40', '18:30:20', '17:50:20', '17:11:50', '16:34:40', '15:58:50', '15:24:20', '14:51:00', '14:19:00', '13:48:00', '13:18:10', '12:49:30', '12:21:50', '11:55:10', '11:29:20', '11:04:30', '10:40:40', '10:17:30', '09:55:20'],
		['115:55:00', '23:11:00', '22:20:50', '21:32:30', '20:46:00', '20:01:10', '19:18:00', '18:36:20', '17:56:00', '17:17:20', '16:40:00', '16:04:00', '15:29:20', '14:55:50', '14:23:40', '13:52:30', '13:22:30', '12:53:40', '12:25:50', '11:59:00', '11:33:00'],
		['134:52:30', '26:58:30', '26:00:10', '25:04:00', '24:09:50', '23:17:40', '22:27:20', '21:38:50', '20:52:10', '20:07:00', '19:23:40', '18:41:40', '18:01:20', '17:22:20', '16:44:50', '16:08:40', '15:33:50', '15:00:10', '14:27:50', '13:56:30', '13:26:30'],
		['156:52:30', '31:22:30', '30:14:40', '29:09:20', '28:06:20', '27:05:40', '26:07:10', '25:10:40', '24:16:20', '23:23:50', '22:33:20', '21:44:40', '20:57:40', '20:12:20', '19:28:40', '18:46:40', '18:06:10', '17:27:00', '16:49:20', '16:13:00', '15:38:00'],
		['182:23:20', '36:28:40', '35:09:50', '33:53:50', '32:40:40', '31:30:00', '30:22:00', '29:16:30', '28:13:10', '27:12:10', '26:13:30', '25:16:50', '24:22:10', '23:29:40', '22:38:50', '21:50:00', '21:02:50', '20:17:20', '19:33:30', '18:51:10', '18:10:30'],
		['211:59:10', '42:23:50', '40:52:10', '39:24:00', '37:58:50', '36:36:50', '35:17:40', '34:01:30', '32:48:00', '31:37:10', '30:28:50', '29:23:00', '28:19:30', '27:18:20', '26:19:20', '25:22:30', '24:27:40', '23:34:50', '22:44:00', '21:54:50', '21:07:30'],
		['246:19:10', '49:15:50', '47:29:20', '45:46:50', '44:08:00', '42:32:40', '41:00:40', '39:32:10', '38:06:40', '36:44:20', '35:25:00', '34:08:30', '32:54:50', '31:43:40', '30:35:10', '29:29:10', '28:25:20', '27:24:00', '26:24:50', '25:27:50', '24:32:50'],
		['286:08:20', '57:13:40', '55:10:10', '53:11:00', '51:16:00', '49:25:20', '47:38:40', '45:55:40', '44:16:30', '42:40:50', '41:08:40', '39:39:50', '38:14:10', '36:51:30', '35:31:50', '34:15:10', '33:01:10', '31:49:50', '30:41:10', '29:34:50', '28:31:00'],
		['332:20:50', '66:28:10', '64:04:30', '61:46:10', '59:32:40', '57:24:10', '55:20:10', '53:20:40', '51:25:20', '49:34:20', '47:47:10', '46:04:00', '44:24:30', '42:48:30', '41:16:10', '39:47:00', '38:21:00', '36:58:10', '35:38:20', '34:21:20', '33:07:10']
		];
	temps_batiments['25'] = [		 // Résidence 
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['26'] = [		 // Palais 
		['06:56:40', '01:23:20', '01:20:20', '01:17:30', '01:14:40', '01:12:00', '01:09:20', '01:06:50', '01:04:30', '01:02:10', '00:59:50', '00:57:50', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30'],
		['08:28:20', '01:41:40', '01:38:00', '01:34:30', '01:31:00', '01:27:50', '01:24:40', '01:21:40', '01:18:40', '01:15:50', '01:13:10', '01:10:30', '01:08:00', '01:05:30', '01:03:10', '01:00:50', '00:58:40', '00:56:30', '00:54:30', '00:52:30', '00:50:40'],
		['10:15:00', '02:03:00', '01:58:30', '01:54:10', '01:50:10', '01:46:10', '01:42:20', '01:38:40', '01:35:10', '01:31:40', '01:28:20', '01:25:10', '01:22:10', '01:19:10', '01:16:20', '01:13:30', '01:11:00', '01:08:20', '01:05:50', '01:03:30', '01:01:20'],
		['12:18:20', '02:27:40', '02:22:20', '02:17:10', '02:12:10', '02:07:30', '02:02:50', '01:58:30', '01:54:10', '01:50:00', '01:46:10', '01:42:20', '01:38:40', '01:35:00', '01:31:40', '01:28:20', '01:25:10', '01:22:10', '01:19:10', '01:16:20', '01:13:30'],
		['14:40:50', '02:56:10', '02:49:50', '02:43:50', '02:37:50', '02:32:10', '02:26:40', '02:21:30', '02:16:20', '02:11:30', '02:06:40', '02:02:10', '01:57:40', '01:53:30', '01:49:20', '01:45:30', '01:41:40', '01:38:00', '01:34:30', '01:31:10', '01:27:50'],
		['17:26:40', '03:29:20', '03:21:50', '03:14:40', '03:07:40', '03:00:50', '02:54:20', '02:48:00', '02:42:00', '02:36:10', '02:30:30', '02:25:10', '02:19:50', '02:14:50', '02:10:00', '02:05:20', '02:00:50', '01:56:30', '01:52:20', '01:48:10', '01:44:20'],
		['20:40:00', '04:08:00', '03:59:00', '03:50:20', '03:42:10', '03:34:10', '03:26:20', '03:19:00', '03:11:50', '03:04:50', '02:58:10', '02:51:50', '02:45:40', '02:39:40', '02:34:00', '02:28:20', '02:23:00', '02:17:50', '02:13:00', '02:08:10', '02:03:30'],
		['24:23:20', '04:52:40', '04:42:00', '04:31:50', '04:22:10', '04:12:40', '04:03:30', '03:54:50', '03:46:20', '03:38:10', '03:30:20', '03:22:50', '03:15:30', '03:08:30', '03:01:40', '02:55:10', '02:48:50', '02:42:40', '02:36:50', '02:31:10', '02:25:50'],
		['28:41:40', '05:44:20', '05:32:00', '05:20:00', '05:08:30', '04:57:30', '04:46:40', '04:36:20', '04:26:30', '04:16:50', '04:07:40', '03:58:40', '03:50:10', '03:41:50', '03:33:50', '03:26:10', '03:18:40', '03:11:30', '03:04:40', '02:58:00', '02:51:40'],
		['33:42:30', '06:44:30', '06:30:00', '06:15:50', '06:02:20', '05:49:20', '05:36:50', '05:24:40', '05:13:00', '05:01:40', '04:50:50', '04:40:20', '04:30:20', '04:20:30', '04:11:10', '04:02:10', '03:53:20', '03:45:00', '03:36:50', '03:29:00', '03:21:30'],
		['39:30:50', '07:54:10', '07:37:10', '07:20:40', '07:04:50', '06:49:30', '06:34:50', '06:20:30', '06:06:50', '05:53:40', '05:41:00', '05:28:40', '05:16:50', '05:05:30', '04:54:30', '04:43:50', '04:33:40', '04:23:50', '04:14:20', '04:05:10', '03:56:20'],
		['46:15:50', '09:15:10', '08:55:10', '08:35:50', '08:17:20', '07:59:20', '07:42:10', '07:25:30', '07:09:30', '06:54:00', '06:39:10', '06:24:40', '06:10:50', '05:57:30', '05:44:40', '05:32:10', '05:20:20', '05:08:40', '04:57:40', '04:47:00', '04:36:40'],
		['54:05:00', '10:49:00', '10:25:30', '10:03:00', '09:41:20', '09:20:20', '09:00:10', '08:40:50', '08:22:00', '08:04:00', '07:46:30', '07:29:40', '07:13:30', '06:58:00', '06:42:50', '06:28:20', '06:14:20', '06:01:00', '05:48:00', '05:35:20', '05:23:20'],
		['63:08:20', '12:37:40', '12:10:30', '11:44:10', '11:18:50', '10:54:20', '10:30:50', '10:08:10', '09:46:10', '09:25:10', '09:04:50', '08:45:10', '08:26:20', '08:08:00', '07:50:30', '07:33:30', '07:17:10', '07:01:30', '06:46:20', '06:31:40', '06:17:30'],
		['73:40:00', '14:44:00', '14:12:10', '13:41:30', '13:11:50', '12:43:20', '12:16:00', '11:49:30', '11:23:50', '10:59:20', '10:35:30', '10:12:40', '09:50:40', '09:29:20', '09:08:50', '08:49:00', '08:30:00', '08:11:40', '07:54:00', '07:36:50', '07:20:30'],
		['85:52:30', '17:10:30', '16:33:20', '15:57:30', '15:23:10', '14:49:50', '14:17:50', '13:47:00', '13:17:10', '12:48:30', '12:20:50', '11:54:10', '11:28:30', '11:03:40', '10:39:50', '10:16:40', '09:54:30', '09:33:10', '09:12:30', '08:52:40', '08:33:30'],
		['100:01:40', '20:00:20', '19:17:00', '18:35:30', '17:55:20', '17:16:30', '16:39:10', '16:03:20', '15:28:40', '14:55:10', '14:23:00', '13:51:50', '13:22:00', '12:53:00', '12:25:10', '11:58:20', '11:32:30', '11:07:40', '10:43:30', '10:20:20', '09:58:00'],
		['116:26:40', '23:17:20', '22:27:00', '21:38:30', '20:51:50', '20:06:40', '19:23:20', '18:41:20', '18:01:00', '17:22:10', '16:44:40', '16:08:30', '15:33:30', '15:00:00', '14:27:30', '13:56:20', '13:26:10', '12:57:10', '12:29:10', '12:02:20', '11:36:20'],
		['135:29:10', '27:05:50', '26:07:20', '25:11:00', '24:16:30', '23:24:10', '22:33:30', '21:44:50', '20:57:50', '20:12:40', '19:29:00', '18:46:50', '18:06:20', '17:27:10', '16:49:30', '16:13:10', '15:38:10', '15:04:20', '14:31:50', '14:00:20', '13:30:10'],
		['157:35:00', '31:31:00', '30:23:00', '29:17:20', '28:14:10', '27:13:10', '26:14:20', '25:17:40', '24:23:00', '23:30:20', '22:39:30', '21:50:40', '21:03:30', '20:18:00', '19:34:10', '18:51:50', '18:11:10', '17:31:50', '16:54:00', '16:17:30', '15:42:20']
		];
	temps_batiments['27'] = [		 // Chambre du trésor 
		['11:06:40', '02:13:20', '02:08:30', '02:03:50', '01:59:30', '01:55:10', '01:51:00', '01:47:00', '01:43:10', '01:39:30', '01:35:50', '01:32:20', '01:29:00', '01:25:50', '01:22:50', '01:19:50', '01:17:00', '01:14:10', '01:11:30', '01:09:00', '01:06:30'],
		['13:18:20', '02:39:40', '02:34:00', '02:28:20', '02:23:00', '02:17:50', '02:13:00', '02:08:10', '02:03:30', '01:59:00', '01:54:50', '01:50:40', '01:46:40', '01:42:50', '01:39:10', '01:35:30', '01:32:10', '01:28:50', '01:25:40', '01:22:30', '01:19:30'],
		['15:50:50', '03:10:10', '03:03:20', '02:56:50', '02:50:20', '02:44:20', '02:38:20', '02:32:40', '02:27:10', '02:21:50', '02:16:50', '02:11:50', '02:07:00', '02:02:30', '01:58:10', '01:53:50', '01:49:40', '01:45:50', '01:42:00', '01:38:20', '01:34:50'],
		['18:48:20', '03:45:40', '03:37:30', '03:29:40', '03:22:10', '03:14:50', '03:07:50', '03:01:10', '02:54:30', '02:48:20', '02:42:10', '02:36:20', '02:30:50', '02:25:20', '02:20:10', '02:15:00', '02:10:10', '02:05:30', '02:01:00', '01:56:40', '01:52:30'],
		['22:14:10', '04:26:50', '04:17:10', '04:07:50', '03:59:00', '03:50:20', '03:42:00', '03:34:00', '03:26:20', '03:19:00', '03:11:50', '03:04:50', '02:58:10', '02:51:50', '02:45:40', '02:39:40', '02:33:50', '02:28:20', '02:23:00', '02:17:50', '02:12:50'],
		['26:12:30', '05:14:30', '05:03:10', '04:52:10', '04:41:40', '04:31:30', '04:21:50', '04:12:20', '04:03:20', '03:54:30', '03:46:00', '03:38:00', '03:30:00', '03:22:30', '03:15:10', '03:08:10', '03:01:30', '02:54:50', '02:48:40', '02:42:30', '02:36:40'],
		['30:48:20', '06:09:40', '05:56:30', '05:43:40', '05:31:10', '05:19:20', '05:07:50', '04:56:40', '04:46:00', '04:35:40', '04:25:50', '04:16:20', '04:07:00', '03:58:10', '03:49:30', '03:41:20', '03:33:20', '03:25:40', '03:18:10', '03:11:10', '03:04:10'],
		['36:09:10', '07:13:50', '06:58:20', '06:43:10', '06:28:40', '06:14:40', '06:01:10', '05:48:10', '05:35:40', '05:23:40', '05:12:00', '05:00:40', '04:49:50', '04:39:30', '04:29:20', '04:19:40', '04:10:20', '04:01:20', '03:52:40', '03:44:20', '03:36:10'],
		['42:21:40', '08:28:20', '08:10:00', '07:52:20', '07:35:20', '07:19:00', '07:03:10', '06:48:00', '06:33:20', '06:19:10', '06:05:30', '05:52:20', '05:39:40', '05:27:20', '05:15:40', '05:04:10', '04:53:20', '04:42:40', '04:32:30', '04:22:40', '04:13:20'],
		['49:33:20', '09:54:40', '09:33:10', '09:12:40', '08:52:40', '08:33:30', '08:15:00', '07:57:10', '07:40:00', '07:23:30', '07:07:30', '06:52:10', '06:37:20', '06:23:00', '06:09:10', '05:55:50', '05:43:10', '05:30:40', '05:18:50', '05:07:20', '04:56:20'],
		['57:54:10', '11:34:50', '11:09:50', '10:45:40', '10:22:30', '10:00:00', '09:38:30', '09:17:40', '08:57:30', '08:38:10', '08:19:30', '08:01:30', '07:44:10', '07:27:30', '07:11:20', '06:55:50', '06:40:50', '06:26:30', '06:12:30', '05:59:10', '05:46:10'],
		['67:35:00', '13:31:00', '13:01:50', '12:33:40', '12:06:30', '11:40:20', '11:15:10', '10:50:50', '10:27:20', '10:04:50', '09:43:00', '09:22:00', '09:01:50', '08:42:20', '08:23:30', '08:05:20', '07:47:50', '07:31:00', '07:14:50', '06:59:10', '06:44:00'],
		['78:48:20', '15:45:40', '15:11:40', '14:38:50', '14:07:10', '13:36:40', '13:07:20', '12:39:00', '12:11:40', '11:45:20', '11:20:00', '10:55:30', '10:31:50', '10:09:10', '09:47:10', '09:26:00', '09:05:40', '08:46:00', '08:27:00', '08:08:50', '07:51:10'],
		['91:50:00', '18:22:00', '17:42:20', '17:04:10', '16:27:10', '15:51:40', '15:17:30', '14:44:30', '14:12:30', '13:41:50', '13:12:20', '12:43:50', '12:16:20', '11:49:50', '11:24:10', '10:59:40', '10:35:50', '10:13:00', '09:50:50', '09:29:40', '09:09:10'],
		['106:56:40', '21:23:20', '20:37:10', '19:52:40', '19:09:40', '18:28:20', '17:48:20', '17:10:00', '16:32:50', '15:57:10', '15:22:40', '14:49:30', '14:17:30', '13:46:30', '13:16:50', '12:48:10', '12:20:30', '11:53:50', '11:28:10', '11:03:20', '10:39:30'],
		['124:28:20', '24:53:40', '24:00:00', '23:08:10', '22:18:10', '21:30:00', '20:43:30', '19:58:40', '19:15:40', '18:34:00', '17:53:50', '17:15:10', '16:38:00', '16:02:00', '15:27:20', '14:54:00', '14:21:50', '13:50:50', '13:20:50', '12:52:00', '12:24:20'],
		['144:48:20', '28:57:40', '27:55:10', '26:54:50', '25:56:40', '25:00:40', '24:06:40', '23:14:30', '22:24:20', '21:36:00', '20:49:20', '20:04:20', '19:21:00', '18:39:10', '17:58:50', '17:20:00', '16:42:40', '16:06:30', '15:31:40', '14:58:10', '14:25:50'],
		['168:23:20', '33:40:40', '32:28:00', '31:17:50', '30:10:10', '29:05:00', '28:02:20', '27:01:40', '26:03:20', '25:07:00', '24:12:50', '23:20:30', '22:30:00', '21:41:30', '20:54:40', '20:09:30', '19:25:50', '18:44:00', '18:03:30', '17:24:30', '16:46:50'],
		['195:45:00', '39:09:00', '37:44:30', '36:23:00', '35:04:20', '33:48:40', '32:35:30', '31:25:10', '30:17:20', '29:11:50', '28:08:50', '27:08:00', '26:09:20', '25:12:50', '24:18:30', '23:26:00', '22:35:20', '21:46:30', '20:59:30', '20:14:10', '19:30:30'],
		['227:29:10', '45:29:50', '43:51:40', '42:16:50', '40:45:30', '39:17:30', '37:52:40', '36:30:50', '35:12:00', '33:56:00', '32:42:40', '31:32:00', '30:23:50', '29:18:10', '28:14:50', '27:13:50', '26:15:00', '25:18:20', '24:23:40', '23:31:00', '22:40:10']
		];
	temps_batiments['28'] = [		 // Comptoir de commerce 
		['04:10:00', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40', '00:33:20', '00:32:10', '00:31:00', '00:30:00', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50'],
		['05:15:00', '01:03:00', '01:00:40', '00:58:30', '00:56:30', '00:54:20', '00:52:30', '00:50:30', '00:48:40', '00:47:00', '00:45:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20'],
		['06:30:00', '01:18:00', '01:15:20', '01:12:30', '01:10:00', '01:07:30', '01:05:00', '01:02:40', '01:00:20', '00:58:10', '00:56:10', '00:54:10', '00:52:10', '00:50:20', '00:48:30', '00:46:40', '00:45:00', '00:43:30', '00:41:50', '00:40:20', '00:38:50'],
		['07:57:30', '01:35:30', '01:32:10', '01:28:50', '01:25:40', '01:22:30', '01:19:30', '01:16:40', '01:14:00', '01:11:20', '01:08:40', '01:06:10', '01:03:50', '01:01:30', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:10', '00:49:20', '00:47:40'],
		['09:39:10', '01:55:50', '01:51:40', '01:47:40', '01:43:50', '01:40:00', '01:36:30', '01:33:00', '01:29:40', '01:26:20', '01:23:20', '01:20:20', '01:17:20', '01:14:40', '01:12:00', '01:09:20', '01:06:50', '01:04:30', '01:02:10', '00:59:50', '00:57:40'],
		['11:36:40', '02:19:20', '02:14:20', '02:09:30', '02:04:50', '02:00:20', '01:56:00', '01:51:50', '01:47:50', '01:44:00', '01:40:10', '01:36:40', '01:33:10', '01:29:50', '01:26:30', '01:23:30', '01:20:30', '01:17:30', '01:14:40', '01:12:00', '01:09:30'],
		['13:53:20', '02:46:40', '02:40:40', '02:35:00', '02:29:20', '02:24:00', '02:18:50', '02:13:50', '02:09:00', '02:04:20', '01:59:50', '01:55:30', '01:51:20', '01:47:20', '01:43:30', '01:39:50', '01:36:10', '01:32:40', '01:29:20', '01:26:10', '01:23:00'],
		['16:31:40', '03:18:20', '03:11:10', '03:04:20', '02:57:40', '02:51:20', '02:45:10', '02:39:10', '02:33:30', '02:28:00', '02:22:40', '02:17:30', '02:12:30', '02:07:50', '02:03:10', '01:58:40', '01:54:30', '01:50:20', '01:46:20', '01:42:30', '01:38:50'],
		['19:35:50', '03:55:10', '03:46:40', '03:38:30', '03:30:40', '03:23:00', '03:15:40', '03:08:40', '03:01:50', '02:55:20', '02:49:00', '02:43:00', '02:37:10', '02:31:30', '02:26:00', '02:20:40', '02:15:40', '02:10:50', '02:06:00', '02:01:30', '01:57:10'],
		['23:08:20', '04:37:40', '04:27:40', '04:18:10', '04:08:50', '03:59:50', '03:51:10', '03:42:50', '03:34:50', '03:27:10', '03:19:40', '03:12:30', '03:05:30', '02:58:50', '02:52:30', '02:46:10', '02:40:10', '02:34:30', '02:29:00', '02:23:30', '02:18:20'],
		['27:15:50', '05:27:10', '05:15:20', '05:04:00', '04:53:10', '04:42:30', '04:32:20', '04:22:30', '04:13:10', '04:04:00', '03:55:10', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30', '02:49:10', '02:43:00'],
		['32:02:30', '06:24:30', '06:10:40', '05:57:20', '05:44:30', '05:32:00', '05:20:10', '05:08:40', '04:57:30', '04:46:50', '04:36:30', '04:26:30', '04:16:50', '04:07:40', '03:58:40', '03:50:10', '03:41:50', '03:33:50', '03:26:10', '03:18:50', '03:11:40'],
		['37:35:00', '07:31:00', '07:14:50', '06:59:10', '06:44:00', '06:29:30', '06:15:30', '06:02:00', '05:49:00', '05:36:20', '05:24:20', '05:12:40', '05:01:20', '04:50:30', '04:40:00', '04:30:00', '04:20:10', '04:10:50', '04:01:50', '03:53:10', '03:44:40'],
		['44:00:50', '08:48:10', '08:29:10', '08:10:50', '07:53:10', '07:36:10', '07:19:40', '07:03:50', '06:48:40', '06:34:00', '06:19:50', '06:06:10', '05:52:50', '05:40:10', '05:28:00', '05:16:10', '05:04:50', '04:53:50', '04:43:10', '04:33:00', '04:23:10'],
		['51:28:20', '10:17:40', '09:55:30', '09:34:00', '09:13:20', '08:53:30', '08:34:20', '08:15:50', '07:57:50', '07:40:40', '07:24:10', '07:08:10', '06:52:40', '06:37:50', '06:23:30', '06:09:40', '05:56:30', '05:43:40', '05:31:10', '05:19:20', '05:07:50'],
		['60:07:30', '12:01:30', '11:35:40', '11:10:30', '10:46:20', '10:23:10', '10:00:40', '09:39:10', '09:18:10', '08:58:10', '08:38:50', '08:20:10', '08:02:10', '07:44:40', '07:28:00', '07:11:50', '06:56:20', '06:41:20', '06:26:50', '06:13:00', '05:59:30'],
		['70:10:00', '14:02:00', '13:31:40', '13:02:30', '12:34:20', '12:07:10', '11:41:00', '11:15:50', '10:51:30', '10:28:00', '10:05:20', '09:43:30', '09:22:30', '09:02:20', '08:42:50', '08:24:00', '08:05:50', '07:48:20', '07:31:30', '07:15:10', '06:59:30'],
		['81:48:20', '16:21:40', '15:46:20', '15:12:20', '14:39:30', '14:07:50', '13:37:20', '13:07:50', '12:39:30', '12:12:10', '11:45:50', '11:20:20', '10:55:50', '10:32:20', '10:09:30', '09:47:40', '09:26:30', '09:06:00', '08:46:20', '08:27:30', '08:09:10'],
		['95:19:10', '19:03:50', '18:22:40', '17:43:00', '17:04:40', '16:27:50', '15:52:10', '15:18:00', '14:44:50', '14:13:00', '13:42:20', '13:12:40', '12:44:10', '12:16:40', '11:50:10', '11:24:40', '11:00:00', '10:36:10', '10:13:20', '09:51:10', '09:30:00'],
		['110:59:10', '22:11:50', '21:23:50', '20:37:40', '19:53:10', '19:10:10', '18:28:50', '17:48:50', '17:10:20', '16:33:20', '15:57:30', '15:23:00', '14:49:50', '14:17:50', '13:46:50', '13:17:10', '12:48:30', '12:20:50', '11:54:10', '11:28:20', '11:03:40']
		];
	temps_batiments['29'] = [		 // Grande caserne
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['30'] = [		 // Grande écurie
		['03:03:20', '00:36:40', '00:35:20', '00:34:00', '00:32:50', '00:31:40', '00:30:30', '00:29:30', '00:28:20', '00:27:20', '00:26:20', '00:25:20', '00:24:30', '00:23:40', '00:22:50', '00:22:00', '00:21:10', '00:20:20', '00:19:40', '00:19:00', '00:18:20'],
		['03:57:30', '00:47:30', '00:45:50', '00:44:10', '00:42:30', '00:41:00', '00:39:30', '00:38:10', '00:36:50', '00:35:30', '00:34:10', '00:33:00', '00:31:50', '00:30:40', '00:29:30', '00:28:30', '00:27:30', '00:26:30', '00:25:30', '00:24:30', '00:23:40'],
		['05:00:50', '01:00:10', '00:58:00', '00:55:50', '00:53:50', '00:52:00', '00:50:00', '00:48:20', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40', '00:33:30', '00:32:10', '00:31:10', '00:30:00'],
		['06:14:10', '01:14:50', '01:12:00', '01:09:30', '01:07:00', '01:04:30', '01:02:10', '01:00:00', '00:57:50', '00:55:50', '00:53:40', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:40', '00:43:10', '00:41:30', '00:40:10', '00:38:40', '00:37:20'],
		['07:38:20', '01:31:40', '01:28:30', '01:25:10', '01:22:10', '01:19:10', '01:16:20', '01:13:40', '01:11:00', '01:08:20', '01:06:00', '01:03:30', '01:01:20', '00:59:00', '00:57:00', '00:54:50', '00:53:00', '00:51:00', '00:49:10', '00:47:20', '00:45:40'],
		['09:16:40', '01:51:20', '01:47:20', '01:43:30', '01:39:50', '01:36:10', '01:32:40', '01:29:20', '01:26:10', '01:23:00', '01:20:10', '01:17:10', '01:14:30', '01:11:40', '01:09:10', '01:06:40', '01:04:20', '01:02:00', '00:59:40', '00:57:30', '00:55:30'],
		['11:10:50', '02:14:10', '02:09:20', '02:04:40', '02:00:10', '01:55:50', '01:51:40', '01:47:40', '01:43:50', '01:40:10', '01:36:30', '01:33:00', '01:29:40', '01:26:30', '01:23:20', '01:20:20', '01:17:30', '01:14:40', '01:12:00', '01:09:20', '01:06:50'],
		['13:23:20', '02:40:40', '02:34:50', '02:29:20', '02:24:00', '02:18:50', '02:13:50', '02:09:00', '02:04:20', '01:59:50', '01:55:30', '01:51:20', '01:47:20', '01:43:30', '01:39:50', '01:36:10', '01:32:40', '01:29:20', '01:26:10', '01:23:00', '01:20:00'],
		['15:56:40', '03:11:20', '03:04:30', '02:57:50', '02:51:30', '02:45:20', '02:39:20', '02:33:40', '02:28:00', '02:22:50', '02:17:40', '02:12:40', '02:07:50', '02:03:20', '01:58:50', '01:54:30', '01:50:30', '01:46:30', '01:42:40', '01:39:00', '01:35:20'],
		['18:55:00', '03:47:00', '03:38:50', '03:31:00', '03:23:20', '03:16:00', '03:09:00', '03:02:10', '02:55:40', '02:49:20', '02:43:10', '02:37:20', '02:31:40', '02:26:10', '02:21:00', '02:15:50', '02:11:00', '02:06:20', '02:01:40', '01:57:20', '01:53:10'],
		['22:21:40', '04:28:20', '04:18:40', '04:09:20', '04:00:20', '03:51:50', '03:43:20', '03:35:20', '03:27:40', '03:20:10', '03:13:00', '03:06:00', '02:59:20', '02:52:50', '02:46:40', '02:40:40', '02:34:50', '02:29:20', '02:23:50', '02:18:40', '02:13:40'],
		['26:21:40', '05:16:20', '05:04:50', '04:54:00', '04:43:20', '04:33:10', '04:23:20', '04:13:50', '04:04:40', '03:55:50', '03:47:20', '03:39:10', '03:31:20', '03:23:40', '03:16:20', '03:09:20', '03:02:30', '02:56:00', '02:49:40', '02:43:30', '02:37:40'],
		['30:59:10', '06:11:50', '05:58:30', '05:45:40', '05:33:10', '05:21:10', '05:09:40', '04:58:30', '04:47:40', '04:37:20', '04:27:20', '04:17:50', '04:08:30', '03:59:30', '03:50:50', '03:42:40', '03:34:30', '03:26:50', '03:19:20', '03:12:10', '03:05:20'],
		['36:21:40', '07:16:20', '07:00:40', '06:45:30', '06:31:00', '06:16:50', '06:03:20', '05:50:10', '05:37:40', '05:25:30', '05:13:50', '05:02:30', '04:51:30', '04:41:00', '04:31:00', '04:21:10', '04:11:50', '04:02:40', '03:54:00', '03:45:30', '03:37:30'],
		['42:35:50', '08:31:10', '08:12:50', '07:55:10', '07:38:00', '07:21:30', '07:05:40', '06:50:20', '06:35:30', '06:21:20', '06:07:30', '05:54:20', '05:41:30', '05:29:20', '05:17:20', '05:06:00', '04:55:00', '04:44:20', '04:34:10', '04:24:10', '04:14:40'],
		['49:50:00', '09:58:00', '09:36:30', '09:15:40', '08:55:40', '08:36:30', '08:17:50', '08:00:00', '07:42:40', '07:26:00', '07:10:00', '06:54:30', '06:39:30', '06:25:10', '06:11:20', '05:58:00', '05:45:00', '05:32:40', '05:20:40', '05:09:10', '04:58:00'],
		['58:13:20', '11:38:40', '11:13:30', '10:49:20', '10:26:00', '10:03:20', '09:41:40', '09:20:40', '09:00:30', '08:41:10', '08:22:20', '08:04:20', '07:46:50', '07:30:00', '07:13:50', '06:58:10', '06:43:10', '06:28:40', '06:14:40', '06:01:10', '05:48:10'],
		['67:57:30', '13:35:30', '13:06:10', '12:37:50', '12:10:30', '11:44:20', '11:18:50', '10:54:30', '10:30:50', '10:08:10', '09:46:20', '09:25:10', '09:04:50', '08:45:10', '08:26:20', '08:08:10', '07:50:30', '07:33:40', '07:17:20', '07:01:30', '06:46:20'],
		['79:15:00', '15:51:00', '15:16:50', '14:43:50', '14:12:00', '13:41:20', '13:11:40', '12:43:10', '12:15:40', '11:49:10', '11:23:40', '10:59:10', '10:35:20', '10:12:30', '09:50:30', '09:29:10', '09:08:40', '08:49:00', '08:29:50', '08:11:30', '07:53:50'],
		['92:20:50', '18:28:10', '17:48:20', '17:09:50', '16:32:40', '15:57:00', '15:22:30', '14:49:20', '14:17:20', '13:46:30', '13:16:40', '12:48:00', '12:20:20', '11:53:40', '11:28:00', '11:03:20', '10:39:20', '10:16:20', '09:54:10', '09:32:50', '09:12:10']
		];
	temps_batiments['31'] = [		 // Mur d'enceinte
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['32'] = [		 // Mur de terre
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['33'] = [		 // Palissade
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:38:20', '00:43:40', '00:42:10', '00:40:30', '00:39:10', '00:37:40', '00:36:20', '00:35:00', '00:33:50', '00:32:30', '00:31:20', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10', '00:25:10', '00:24:20', '00:23:20', '00:22:30', '00:21:50'],
		['04:38:20', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:40'],
		['05:47:30', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40'],
		['07:08:20', '01:25:40', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:03:50', '01:01:40', '00:59:20', '00:57:10', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00', '00:44:20', '00:42:40'],
		['08:41:40', '01:44:20', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:26:50', '01:23:50', '01:20:50', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:50', '01:02:30', '01:00:10', '00:58:00', '00:56:00', '00:54:00', '00:52:00'],
		['10:30:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:10', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50'],
		['12:36:40', '02:31:20', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:06:00', '02:01:20', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:00', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20'],
		['15:02:30', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50', '01:33:20', '01:30:00'],
		['17:51:40', '03:34:20', '03:26:40', '03:19:10', '03:12:00', '03:05:10', '02:58:30', '02:52:00', '02:45:50', '02:39:50', '02:34:10', '02:28:30', '02:23:10', '02:18:00', '02:13:10', '02:08:20', '02:03:40', '01:59:10', '01:55:00', '01:50:50', '01:46:50'],
		['21:08:20', '04:13:40', '04:04:30', '03:55:40', '03:47:10', '03:39:00', '03:31:10', '03:23:30', '03:16:10', '03:09:10', '03:02:20', '02:55:50', '02:49:30', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:10', '02:16:00', '02:11:10', '02:06:20'],
		['24:55:50', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10'],
		['29:20:50', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40', '04:32:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:40', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30'],
		['34:27:30', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00'],
		['40:23:20', '08:04:40', '07:47:10', '07:30:20', '07:14:10', '06:58:30', '06:43:30', '06:28:50', '06:14:50', '06:01:30', '05:48:20', '05:35:50', '05:23:50', '05:12:10', '05:00:50', '04:50:00', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30'],
		['47:15:50', '09:27:10', '09:06:40', '08:47:00', '08:28:00', '08:09:50', '07:52:10', '07:35:10', '07:18:50', '07:03:00', '06:47:40', '06:33:00', '06:19:00', '06:05:20', '05:52:10', '05:39:30', '05:27:10', '05:15:30', '05:04:10', '04:53:10', '04:42:40'],
		['55:14:10', '11:02:50', '10:39:00', '10:16:00', '09:53:50', '09:32:30', '09:11:50', '08:52:00', '08:32:50', '08:14:20', '07:56:30', '07:39:30', '07:22:50', '07:07:00', '06:51:30', '06:36:50', '06:22:30', '06:08:40', '05:55:30', '05:42:40', '05:30:20'],
		['64:30:00', '12:54:00', '12:26:10', '11:59:10', '11:33:20', '11:08:20', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:20', '08:37:10', '08:18:30', '08:00:30', '07:43:10', '07:26:30', '07:10:30', '06:55:00', '06:40:00', '06:25:40'],
		['75:14:10', '15:02:50', '14:30:20', '13:59:00', '13:28:50', '12:59:40', '12:31:30', '12:04:30', '11:38:30', '11:13:20', '10:49:00', '10:25:40', '10:03:10', '09:41:30', '09:20:30', '09:00:20', '08:40:50', '08:22:10', '08:04:00', '07:46:40', '07:29:50'],
		['87:40:50', '17:32:10', '16:54:20', '16:17:50', '15:42:40', '15:08:40', '14:36:00', '14:04:30', '13:34:00', '13:04:40', '12:36:30', '12:09:20', '11:43:00', '11:17:40', '10:53:20', '10:29:50', '10:07:10', '09:45:20', '09:24:10', '09:03:50', '08:44:20']
		];
	temps_batiments['34'] = [		 // Tailleur de pierres
		['03:03:20', '00:36:40', '00:35:20', '00:34:00', '00:32:50', '00:31:40', '00:30:30', '00:29:30', '00:28:20', '00:27:20', '00:26:20', '00:25:20', '00:24:30', '00:23:40', '00:22:50', '00:22:00', '00:21:10', '00:20:20', '00:19:40', '00:19:00', '00:18:20'],
		['04:22:30', '00:52:30', '00:50:40', '00:48:50', '00:47:00', '00:45:20', '00:43:40', '00:42:10', '00:40:40', '00:39:10', '00:37:50', '00:36:20', '00:35:10', '00:33:50', '00:32:40', '00:31:30', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10'],
		['05:55:00', '01:11:00', '01:08:20', '01:06:00', '01:03:30', '01:01:20', '00:59:00', '00:57:00', '00:54:50', '00:52:50', '00:51:00', '00:49:10', '00:47:20', '00:45:40', '00:44:00', '00:42:30', '00:41:00', '00:39:30', '00:38:00', '00:36:40', '00:35:20'],
		['07:41:40', '01:32:20', '01:29:00', '01:25:50', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:04:00', '01:01:40', '00:59:30', '00:57:20', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00'],
		['09:45:00', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:10', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20', '01:12:40', '01:10:00', '01:07:30', '01:05:10', '01:02:50', '01:00:30', '00:58:20'],
		['12:09:10', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:05:50', '02:01:20', '01:57:00', '01:52:50', '01:48:40', '01:44:50', '01:41:00', '01:37:20', '01:33:50', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20', '01:12:40'],
		['14:55:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10', '02:23:40', '02:18:30', '02:13:30', '02:08:50', '02:04:10', '01:59:40', '01:55:20', '01:51:10', '01:47:10', '01:43:20', '01:39:40', '01:36:00', '01:32:30', '01:29:10'],
		['18:09:10', '03:37:50', '03:30:00', '03:22:20', '03:15:10', '03:08:00', '03:01:20', '02:54:50', '02:48:30', '02:42:20', '02:36:30', '02:31:00', '02:25:30', '02:20:20', '02:15:10', '02:10:20', '02:05:40', '02:01:10', '01:56:50', '01:52:30', '01:48:30'],
		['21:53:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:50', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30', '02:49:10', '02:43:00', '02:37:10', '02:31:30', '02:26:00', '02:20:50', '02:15:40', '02:10:50'],
		['26:13:20', '05:14:40', '05:03:20', '04:52:20', '04:41:50', '04:31:40', '04:22:00', '04:12:30', '04:03:20', '03:54:40', '03:46:10', '03:38:00', '03:30:10', '03:22:40', '03:15:20', '03:08:20', '03:01:30', '02:55:00', '02:48:40', '02:42:40', '02:36:50'],
		['31:15:00', '06:15:00', '06:01:30', '05:48:30', '05:35:50', '05:23:50', '05:12:10', '05:01:00', '04:50:10', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30', '03:52:50', '03:44:30', '03:36:20', '03:28:30', '03:21:00', '03:13:50', '03:06:50'],
		['37:05:00', '07:25:00', '07:09:00', '06:53:30', '06:38:40', '06:24:20', '06:10:30', '05:57:10', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:20', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40'],
		['43:50:50', '08:46:10', '08:27:10', '08:09:00', '07:51:20', '07:34:20', '07:18:00', '07:02:20', '06:47:00', '06:32:20', '06:18:20', '06:04:40', '05:51:30', '05:38:50', '05:26:40', '05:14:50', '05:03:30', '04:52:40', '04:42:10', '04:32:00', '04:22:10'],
		['51:41:40', '10:20:20', '09:58:00', '09:36:30', '09:15:40', '08:55:40', '08:36:30', '08:17:50', '08:00:00', '07:42:40', '07:26:00', '07:10:00', '06:54:30', '06:39:30', '06:25:10', '06:11:20', '05:58:00', '05:45:00', '05:32:40', '05:20:40', '05:09:10'],
		['60:48:20', '12:09:40', '11:43:20', '11:18:00', '10:53:40', '10:30:00', '10:07:20', '09:45:30', '09:24:30', '09:04:10', '08:44:30', '08:25:40', '08:07:30', '07:49:50', '07:33:00', '07:16:40', '07:01:00', '06:45:50', '06:31:10', '06:17:10', '06:03:30'],
		['71:21:40', '14:16:20', '13:45:30', '13:15:50', '12:47:10', '12:19:30', '11:52:50', '11:27:10', '11:02:30', '10:38:40', '10:15:40', '09:53:30', '09:32:10', '09:11:30', '08:51:40', '08:32:30', '08:14:00', '07:56:20', '07:39:10', '07:22:40', '07:06:40'],
		['83:36:40', '16:43:20', '16:07:10', '15:32:20', '14:58:50', '14:26:30', '13:55:20', '13:25:10', '12:56:10', '12:28:20', '12:01:20', '11:35:20', '11:10:20', '10:46:10', '10:23:00', '10:00:30', '09:38:50', '09:18:00', '08:58:00', '08:38:40', '08:20:00'],
		['97:49:10', '19:33:50', '18:51:40', '18:10:50', '17:31:40', '16:53:50', '16:17:20', '15:42:00', '15:08:10', '14:35:30', '14:04:00', '13:33:30', '13:04:20', '12:36:00', '12:08:50', '11:42:40', '11:17:20', '10:52:50', '10:29:20', '10:06:50', '09:44:50'],
		['114:18:20', '22:51:40', '22:02:20', '21:14:40', '20:28:50', '19:44:40', '19:02:00', '18:20:50', '17:41:10', '17:03:00', '16:26:10', '15:50:40', '15:16:30', '14:43:30', '14:11:40', '13:41:00', '13:11:30', '12:43:00', '12:15:30', '11:49:00', '11:23:30'],
		['133:25:50', '26:41:10', '25:43:30', '24:48:00', '23:54:20', '23:02:50', '22:13:00', '21:25:00', '20:38:40', '19:54:10', '19:11:10', '18:29:40', '17:49:50', '17:11:10', '16:34:10', '15:58:20', '15:23:50', '14:50:30', '14:18:30', '13:47:40', '13:17:50']
		];
	temps_batiments['35'] = [		 // Brasserie
		['11:06:40', '02:13:20', '02:08:30', '02:03:50', '01:59:30', '01:55:10', '01:51:00', '01:47:00', '01:43:10', '01:39:30', '01:35:50', '01:32:20', '01:29:00', '01:25:50', '01:22:50', '01:19:50', '01:17:00', '01:14:10', '01:11:30', '01:09:00', '01:06:30'],
		['13:43:20', '02:44:40', '02:38:40', '02:33:00', '02:27:30', '02:22:10', '02:17:10', '02:12:10', '02:07:20', '02:02:50', '01:58:20', '01:54:10', '01:50:00', '01:46:00', '01:42:10', '01:38:30', '01:35:00', '01:31:40', '01:28:20', '01:25:10', '01:22:00'],
		['16:45:00', '03:21:00', '03:13:50', '03:06:50', '03:00:00', '02:53:40', '02:47:20', '02:41:20', '02:35:30', '02:29:50', '02:24:30', '02:19:20', '02:14:20', '02:09:30', '02:04:50', '02:00:20', '01:56:00', '01:51:50', '01:47:50', '01:43:50', '01:40:10'],
		['20:15:50', '04:03:10', '03:54:30', '03:46:00', '03:37:50', '03:30:00', '03:22:30', '03:15:10', '03:08:10', '03:01:20', '02:54:50', '02:48:30', '02:42:30', '02:36:40', '02:31:00', '02:25:30', '02:20:20', '02:15:20', '02:10:20', '02:05:40', '02:01:10'],
		['24:20:50', '04:52:10', '04:41:30', '04:31:30', '04:21:40', '04:12:10', '04:03:10', '03:54:20', '03:46:00', '03:37:50', '03:30:00', '03:22:30', '03:15:10', '03:08:10', '03:01:20', '02:54:50', '02:48:30', '02:42:30', '02:36:40', '02:31:00', '02:25:30'],
		['29:04:10', '05:48:50', '05:36:20', '05:24:10', '05:12:30', '05:01:10', '04:50:20', '04:40:00', '04:29:50', '04:20:10', '04:10:50', '04:01:50', '03:53:00', '03:44:40', '03:36:30', '03:28:50', '03:21:20', '03:14:00', '03:07:00', '03:00:20', '02:53:50'],
		['34:33:20', '06:54:40', '06:39:40', '06:25:20', '06:11:30', '05:58:00', '05:45:10', '05:32:50', '05:20:50', '05:09:10', '04:58:10', '04:47:20', '04:37:00', '04:27:00', '04:17:30', '04:08:10', '03:59:10', '03:50:40', '03:42:20', '03:34:20', '03:26:40'],
		['40:55:00', '08:11:00', '07:53:20', '07:36:20', '07:19:50', '07:04:00', '06:48:40', '06:34:00', '06:19:50', '06:06:10', '05:53:00', '05:40:20', '05:28:00', '05:16:10', '05:04:50', '04:53:50', '04:43:20', '04:33:00', '04:23:10', '04:13:50', '04:04:40'],
		['48:17:30', '09:39:30', '09:18:40', '08:58:30', '08:39:10', '08:20:30', '08:02:30', '07:45:10', '07:28:20', '07:12:10', '06:56:40', '06:41:40', '06:27:10', '06:13:10', '05:59:50', '05:46:50', '05:34:20', '05:22:20', '05:10:40', '04:59:30', '04:48:50'],
		['56:50:50', '11:22:10', '10:57:40', '10:34:00', '10:11:10', '09:49:10', '09:28:00', '09:07:30', '08:47:50', '08:28:50', '08:10:30', '07:52:50', '07:35:50', '07:19:20', '07:03:40', '06:48:20', '06:33:40', '06:19:30', '06:05:50', '05:52:40', '05:40:00']
		];
	temps_batiments['36'] = [		 // Fabriquant de pièges
		['02:46:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:10', '00:18:30', '00:17:50', '00:17:10', '00:16:40'],
		['03:13:20', '00:38:40', '00:37:20', '00:36:00', '00:34:40', '00:33:20', '00:32:10', '00:31:00', '00:29:50', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:24:50', '00:24:00', '00:23:10', '00:22:20', '00:21:30', '00:20:40', '00:20:00', '00:19:20'],
		['03:44:10', '00:44:50', '00:43:10', '00:41:40', '00:40:10', '00:38:40', '00:37:20', '00:36:00', '00:34:40', '00:33:30', '00:32:10', '00:31:10', '00:30:00', '00:28:50', '00:27:50', '00:26:50', '00:25:50', '00:25:00', '00:24:00', '00:23:10', '00:22:20'],
		['04:20:00', '00:52:00', '00:50:10', '00:48:20', '00:46:40', '00:45:00', '00:43:20', '00:41:50', '00:40:20', '00:38:50', '00:37:20', '00:36:00', '00:34:50', '00:33:30', '00:32:20', '00:31:10', '00:30:00', '00:29:00', '00:27:50', '00:26:50', '00:26:00'],
		['05:01:40', '01:00:20', '00:58:10', '00:56:10', '00:54:00', '00:52:10', '00:50:10', '00:48:30', '00:46:40', '00:45:00', '00:43:20', '00:41:50', '00:40:20', '00:38:50', '00:37:30', '00:36:10', '00:34:50', '00:33:30', '00:32:20', '00:31:10', '00:30:00'],
		['05:50:00', '01:10:00', '01:07:30', '01:05:00', '01:02:40', '01:00:30', '00:58:20', '00:56:10', '00:54:10', '00:52:10', '00:50:20', '00:48:30', '00:46:50', '00:45:10', '00:43:30', '00:41:50', '00:40:20', '00:39:00', '00:37:30', '00:36:10', '00:34:50'],
		['06:45:50', '01:21:10', '01:18:20', '01:15:30', '01:12:50', '01:10:10', '01:07:40', '01:05:10', '01:02:50', '01:00:30', '00:58:20', '00:56:20', '00:54:20', '00:52:20', '00:50:30', '00:48:40', '00:46:50', '00:45:10', '00:43:30', '00:42:00', '00:40:30'],
		['07:50:50', '01:34:10', '01:30:50', '01:27:30', '01:24:20', '01:21:20', '01:18:30', '01:15:40', '01:12:50', '01:10:20', '01:07:40', '01:05:20', '01:03:00', '01:00:40', '00:58:30', '00:56:20', '00:54:20', '00:52:20', '00:50:30', '00:48:40', '00:47:00'],
		['09:06:40', '01:49:20', '01:45:20', '01:41:30', '01:37:50', '01:34:20', '01:31:00', '01:27:40', '01:24:30', '01:21:30', '01:18:30', '01:15:40', '01:13:00', '01:10:20', '01:07:50', '01:05:20', '01:03:00', '01:00:50', '00:58:40', '00:56:30', '00:54:30'],
		['10:34:10', '02:06:50', '02:02:10', '01:57:50', '01:53:30', '01:49:30', '01:45:30', '01:41:40', '01:38:00', '01:34:30', '01:31:10', '01:27:50', '01:24:40', '01:21:40', '01:18:40', '01:15:50', '01:13:10', '01:10:30', '01:08:00', '01:05:30', '01:03:10'],
		['12:15:00', '02:27:00', '02:21:50', '02:16:40', '02:11:40', '02:07:00', '02:02:30', '01:58:00', '01:53:50', '01:49:40', '01:45:40', '01:41:50', '01:38:10', '01:34:40', '01:31:20', '01:28:00', '01:24:50', '01:21:50', '01:18:50', '01:16:00', '01:13:20'],
		['14:12:30', '02:50:30', '02:44:30', '02:38:30', '02:32:50', '02:27:20', '02:22:00', '02:16:50', '02:12:00', '02:07:10', '02:02:40', '01:58:10', '01:54:00', '01:49:50', '01:45:50', '01:42:10', '01:38:30', '01:34:50', '01:31:30', '01:28:10', '01:25:00'],
		['16:29:10', '03:17:50', '03:10:40', '03:03:50', '02:57:20', '02:50:50', '02:44:40', '02:38:50', '02:33:00', '02:27:30', '02:22:20', '02:17:10', '02:12:10', '02:07:30', '02:02:50', '01:58:30', '01:54:10', '01:50:00', '01:46:10', '01:42:20', '01:38:40'],
		['19:07:30', '03:49:30', '03:41:20', '03:33:20', '03:25:40', '03:18:10', '03:11:00', '03:04:10', '02:57:30', '02:51:10', '02:45:00', '02:39:00', '02:33:20', '02:27:50', '02:22:30', '02:17:20', '02:12:30', '02:07:40', '02:03:00', '01:58:40', '01:54:20'],
		['22:11:40', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40', '03:33:40', '03:26:00', '03:18:30', '03:11:30', '03:04:30', '02:57:50', '02:51:30', '02:45:20', '02:39:20', '02:33:40', '02:28:10', '02:22:50', '02:17:40', '02:12:40'],
		['25:44:10', '05:08:50', '04:57:40', '04:47:00', '04:36:40', '04:26:40', '04:17:10', '04:07:50', '03:59:00', '03:50:20', '03:42:00', '03:34:00', '03:26:20', '03:19:00', '03:11:50', '03:04:50', '02:58:10', '02:51:50', '02:45:40', '02:39:40', '02:33:50'],
		['29:51:40', '05:58:20', '05:45:20', '05:33:00', '05:21:00', '05:09:20', '04:58:20', '04:47:30', '04:37:10', '04:27:10', '04:17:30', '04:08:20', '03:59:20', '03:50:40', '03:42:30', '03:34:30', '03:26:40', '03:19:20', '03:12:10', '03:05:10', '02:58:30'],
		['34:38:20', '06:55:40', '06:40:40', '06:26:10', '06:12:20', '05:58:50', '05:46:00', '05:33:30', '05:21:30', '05:10:00', '04:58:50', '04:48:00', '04:37:40', '04:27:40', '04:18:00', '04:08:40', '03:59:50', '03:51:10', '03:42:50', '03:34:50', '03:27:00'],
		['40:10:50', '08:02:10', '07:44:40', '07:28:00', '07:11:50', '06:56:20', '06:41:20', '06:26:50', '06:13:00', '05:59:30', '05:46:40', '05:34:10', '05:22:10', '05:10:30', '04:59:20', '04:48:30', '04:38:10', '04:28:10', '04:18:30', '04:09:10', '04:00:10'],
		['46:35:50', '09:19:10', '08:59:10', '08:39:40', '08:21:00', '08:03:00', '07:45:30', '07:28:50', '07:12:40', '06:57:00', '06:42:00', '06:27:30', '06:13:40', '06:00:10', '05:47:10', '05:34:40', '05:22:40', '05:11:00', '04:59:50', '04:49:00', '04:38:40']
		];
	temps_batiments['37'] = [		 // Manoir du héros
		['03:11:40', '00:38:20', '00:37:00', '00:35:40', '00:34:20', '00:33:10', '00:31:50', '00:30:50', '00:29:40', '00:28:40', '00:27:30', '00:26:30', '00:25:40', '00:24:40', '00:23:50', '00:23:00', '00:22:10', '00:21:20', '00:20:30', '00:19:50', '00:19:10'],
		['03:42:30', '00:44:30', '00:42:50', '00:41:20', '00:39:50', '00:38:20', '00:37:00', '00:35:40', '00:34:20', '00:33:10', '00:32:00', '00:30:50', '00:29:40', '00:28:40', '00:27:40', '00:26:40', '00:25:40', '00:24:40', '00:23:50', '00:23:00', '00:22:10'],
		['04:17:30', '00:51:30', '00:49:40', '00:48:00', '00:46:10', '00:44:30', '00:43:00', '00:41:20', '00:39:50', '00:38:30', '00:37:10', '00:35:40', '00:34:30', '00:33:10', '00:32:00', '00:30:50', '00:29:50', '00:28:40', '00:27:40', '00:26:40', '00:25:40'],
		['04:59:10', '00:59:50', '00:57:40', '00:55:40', '00:53:40', '00:51:40', '00:49:50', '00:48:00', '00:46:20', '00:44:40', '00:43:00', '00:41:30', '00:40:00', '00:38:30', '00:37:10', '00:35:50', '00:34:30', '00:33:20', '00:32:00', '00:31:00', '00:29:50'],
		['05:46:40', '01:09:20', '01:06:50', '01:04:30', '01:02:10', '01:00:00', '00:57:50', '00:55:40', '00:53:40', '00:51:50', '00:49:50', '00:48:10', '00:46:20', '00:44:40', '00:43:10', '00:41:30', '00:40:00', '00:38:40', '00:37:10', '00:35:50', '00:34:40'],
		['06:42:30', '01:20:30', '01:17:40', '01:14:50', '01:12:10', '01:09:30', '01:07:00', '01:04:40', '01:02:20', '01:00:00', '00:57:50', '00:55:50', '00:53:50', '00:51:50', '00:50:00', '00:48:10', '00:46:30', '00:44:50', '00:43:10', '00:41:40', '00:40:10'],
		['07:46:40', '01:33:20', '01:30:00', '01:26:50', '01:23:40', '01:20:40', '01:17:50', '01:15:00', '01:12:20', '01:09:40', '01:07:10', '01:04:40', '01:02:20', '01:00:10', '00:58:00', '00:55:50', '00:53:50', '00:52:00', '00:50:00', '00:48:20', '00:46:30'],
		['09:01:40', '01:48:20', '01:44:30', '01:40:40', '01:37:00', '01:33:30', '01:30:10', '01:27:00', '01:23:50', '01:20:50', '01:17:50', '01:15:10', '01:12:20', '01:09:50', '01:07:20', '01:04:50', '01:02:30', '01:00:20', '00:58:10', '00:56:00', '00:54:00'],
		['10:28:20', '02:05:40', '02:01:10', '01:56:50', '01:52:30', '01:48:30', '01:44:40', '01:40:50', '01:37:10', '01:33:40', '01:30:20', '01:27:10', '01:24:00', '01:21:00', '01:18:00', '01:15:10', '01:12:30', '01:09:50', '01:07:20', '01:05:00', '01:02:40'],
		['12:09:10', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:05:50', '02:01:20', '01:57:00', '01:52:50', '01:48:40', '01:44:50', '01:41:00', '01:37:20', '01:33:50', '01:30:30', '01:27:20', '01:24:10', '01:21:00', '01:18:10', '01:15:20', '01:12:40'],
		['14:05:50', '02:49:10', '02:43:00', '02:37:10', '02:31:30', '02:26:00', '02:20:50', '02:15:40', '02:10:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:48:50', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:20', '01:24:20'],
		['16:20:50', '03:16:10', '03:09:10', '03:02:20', '02:55:40', '02:49:20', '02:43:20', '02:37:30', '02:31:50', '02:26:20', '02:21:00', '02:16:00', '02:11:00', '02:06:20', '02:01:50', '01:57:20', '01:53:10', '01:49:10', '01:45:10', '01:41:20', '01:37:40'],
		['18:57:30', '03:47:30', '03:39:20', '03:31:30', '03:23:50', '03:16:30', '03:09:30', '03:02:40', '02:56:00', '02:49:40', '02:43:40', '02:37:40', '02:32:00', '02:26:30', '02:21:20', '02:16:10', '02:11:20', '02:06:30', '02:02:00', '01:57:40', '01:53:20'],
		['22:00:00', '04:24:00', '04:14:30', '04:05:20', '03:56:30', '03:48:00', '03:39:40', '03:31:50', '03:24:10', '03:16:50', '03:09:50', '03:03:00', '02:56:20', '02:50:00', '02:43:50', '02:38:00', '02:32:20', '02:26:50', '02:21:30', '02:16:30', '02:11:30'],
		['25:30:50', '05:06:10', '04:55:10', '04:44:30', '04:34:20', '04:24:30', '04:14:50', '04:05:40', '03:56:50', '03:48:20', '03:40:10', '03:32:10', '03:24:30', '03:17:10', '03:10:10', '03:03:20', '02:56:40', '02:50:20', '02:44:10', '02:38:20', '02:32:30'],
		['29:35:50', '05:55:10', '05:42:20', '05:30:00', '05:18:10', '05:06:40', '04:55:40', '04:45:00', '04:34:50', '04:24:50', '04:15:20', '04:06:10', '03:57:20', '03:48:50', '03:40:30', '03:32:30', '03:25:00', '03:17:30', '03:10:30', '03:03:30', '02:57:00'],
		['34:20:00', '06:52:00', '06:37:10', '06:22:50', '06:09:10', '05:55:50', '05:43:00', '05:30:40', '05:18:40', '05:07:20', '04:56:10', '04:45:30', '04:35:20', '04:25:20', '04:15:50', '04:06:40', '03:57:40', '03:49:10', '03:40:50', '03:33:00', '03:25:20'],
		['39:50:00', '07:58:00', '07:40:40', '07:24:10', '07:08:10', '06:52:40', '06:37:50', '06:23:30', '06:09:40', '05:56:30', '05:43:40', '05:31:10', '05:19:20', '05:07:50', '04:56:40', '04:46:00', '04:35:50', '04:25:50', '04:16:20', '04:07:00', '03:58:10'],
		['46:11:40', '09:14:20', '08:54:30', '08:35:10', '08:16:40', '07:58:50', '07:41:30', '07:25:00', '07:08:50', '06:53:30', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:10'],
		['53:35:50', '10:43:10', '10:20:00', '09:57:40', '09:36:10', '09:15:20', '08:55:20', '08:36:10', '08:17:30', '07:59:40', '07:42:20', '07:25:40', '07:09:40', '06:54:10', '06:39:20', '06:24:50', '06:11:00', '05:57:40', '05:44:50', '05:32:20', '05:20:30']
		];
	temps_batiments['38'] = [		 // Grand dépôt de ressources
		['12:30:00', '02:30:00', '02:24:40', '02:19:20', '02:14:20', '02:09:30', '02:04:50', '02:00:20', '01:56:00', '01:51:50', '01:47:50', '01:44:00', '01:40:10', '01:36:40', '01:33:10', '01:29:50', '01:26:30', '01:23:30', '01:20:30', '01:17:30', '01:14:40'],
		['14:55:00', '02:59:00', '02:52:30', '02:46:20', '02:40:20', '02:34:30', '02:29:00', '02:23:40', '02:18:30', '02:13:30', '02:08:40', '02:04:00', '01:59:40', '01:55:20', '01:51:10', '01:47:10', '01:43:20', '01:39:30', '01:36:00', '01:32:30', '01:29:10'],
		['17:43:20', '03:32:40', '03:25:00', '03:17:40', '03:10:30', '03:03:40', '02:57:00', '02:50:40', '02:44:30', '02:38:40', '02:32:50', '02:27:20', '02:22:00', '02:17:00', '02:12:00', '02:07:20', '02:02:40', '01:58:20', '01:54:00', '01:49:50', '01:46:00'],
		['20:58:20', '04:11:40', '04:02:40', '03:53:50', '03:45:30', '03:37:20', '03:29:30', '03:22:00', '03:14:40', '03:07:40', '03:01:00', '02:54:30', '02:48:10', '02:42:10', '02:36:10', '02:30:40', '02:25:10', '02:20:00', '02:15:00', '02:10:00', '02:05:20'],
		['24:45:00', '04:57:00', '04:46:10', '04:36:00', '04:26:00', '04:16:30', '04:07:10', '03:58:20', '03:49:40', '03:41:30', '03:33:30', '03:25:50', '03:18:20', '03:11:10', '03:04:20', '02:57:40', '02:51:20', '02:45:10', '02:39:10', '02:33:30', '02:28:00'],
		['29:07:30', '05:49:30', '05:36:50', '05:24:40', '05:13:00', '05:01:50', '04:50:50', '04:40:30', '04:30:20', '04:20:40', '04:11:10', '04:02:10', '03:53:30', '03:45:00', '03:37:00', '03:29:10', '03:21:40', '03:14:20', '03:07:20', '03:00:40', '02:54:10'],
		['34:11:40', '06:50:20', '06:35:30', '06:21:20', '06:07:40', '05:54:20', '05:41:40', '05:29:20', '05:17:30', '05:06:00', '04:55:00', '04:44:20', '04:34:10', '04:24:20', '04:14:50', '04:05:40', '03:56:50', '03:48:10', '03:40:00', '03:32:10', '03:24:30'],
		['40:05:00', '08:01:00', '07:43:40', '07:27:00', '07:10:50', '06:55:20', '06:40:30', '06:26:00', '06:12:10', '05:58:40', '05:45:50', '05:33:20', '05:21:20', '05:09:50', '04:58:40', '04:47:50', '04:37:30', '04:27:30', '04:17:50', '04:08:40', '03:59:40'],
		['46:55:00', '09:23:00', '09:02:40', '08:43:10', '08:24:20', '08:06:10', '07:48:40', '07:31:50', '07:15:30', '06:59:50', '06:44:40', '06:30:10', '06:16:10', '06:02:30', '05:49:30', '05:37:00', '05:24:50', '05:13:10', '05:01:50', '04:51:00', '04:40:30'],
		['54:50:00', '10:58:00', '10:34:20', '10:11:30', '09:49:30', '09:28:20', '09:07:50', '08:48:10', '08:29:10', '08:10:50', '07:53:10', '07:36:00', '07:19:40', '07:03:50', '06:48:30', '06:33:50', '06:19:40', '06:06:00', '05:52:50', '05:40:10', '05:27:50'],
		['64:01:40', '12:48:20', '12:20:40', '11:54:00', '11:28:20', '11:03:30', '10:39:40', '10:16:40', '09:54:20', '09:33:00', '09:12:20', '08:52:30', '08:33:20', '08:14:50', '07:57:00', '07:39:50', '07:23:20', '07:07:20', '06:52:00', '06:37:10', '06:22:50'],
		['74:41:40', '14:56:20', '14:24:00', '13:52:50', '13:22:50', '12:54:00', '12:26:10', '11:59:20', '11:33:20', '11:08:30', '10:44:20', '10:21:10', '09:58:50', '09:37:10', '09:16:30', '08:56:30', '08:37:10', '08:18:30', '08:00:30', '07:43:20', '07:26:30'],
		['87:03:20', '17:24:40', '16:47:00', '16:10:50', '15:35:50', '15:02:10', '14:29:40', '13:58:20', '13:28:10', '12:59:10', '12:31:00', '12:04:00', '11:38:00', '11:12:50', '10:48:40', '10:25:10', '10:02:40', '09:41:00', '09:20:10', '09:00:00', '08:40:30'],
		['101:24:10', '20:16:50', '19:33:00', '18:50:50', '18:10:00', '17:30:50', '16:53:00', '16:16:30', '15:41:20', '15:07:30', '14:34:50', '14:03:20', '13:33:00', '13:03:40', '12:35:30', '12:08:20', '11:42:00', '11:16:50', '10:52:30', '10:29:00', '10:06:20'],
		['118:02:30', '23:36:30', '22:45:30', '21:56:20', '21:09:00', '20:23:20', '19:39:10', '18:56:50', '18:15:50', '17:36:20', '16:58:20', '16:21:40', '15:46:20', '15:12:20', '14:39:30', '14:07:50', '13:37:20', '13:07:50', '12:39:30', '12:12:10', '11:45:50'],
		['137:20:50', '27:28:10', '26:28:50', '25:31:40', '24:36:30', '23:43:20', '22:52:00', '22:02:40', '21:15:00', '20:29:10', '19:44:50', '19:02:10', '18:21:10', '17:41:30', '17:03:20', '16:26:30', '15:51:00', '15:16:40', '14:43:40', '14:11:50', '13:41:10'],
		['159:44:10', '31:56:50', '30:47:50', '29:41:20', '28:37:10', '27:35:20', '26:35:50', '25:38:20', '24:43:00', '23:49:30', '22:58:10', '22:08:30', '21:20:40', '20:34:30', '19:50:10', '19:07:20', '18:26:00', '17:46:10', '17:07:50', '16:30:50', '15:55:10'],
		['185:42:30', '37:08:30', '35:48:20', '34:31:00', '33:16:20', '32:04:30', '30:55:10', '29:48:30', '28:44:00', '27:42:00', '26:42:10', '25:44:30', '24:48:50', '23:55:20', '23:03:40', '22:13:50', '21:25:50', '20:39:30', '19:54:50', '19:11:50', '18:30:20'],
		['215:50:00', '43:10:00', '41:36:50', '40:07:00', '38:40:20', '37:16:50', '35:56:10', '34:38:40', '33:23:50', '32:11:40', '31:02:10', '29:55:00', '28:50:30', '27:48:10', '26:48:10', '25:50:10', '24:54:20', '24:00:40', '23:08:40', '22:18:50', '21:30:30'],
		['250:47:30', '50:09:30', '48:21:10', '46:36:40', '44:56:00', '43:19:00', '41:45:20', '40:15:10', '38:48:20', '37:24:30', '36:03:40', '34:45:50', '33:30:40', '32:18:20', '31:08:30', '30:01:10', '28:56:20', '27:53:50', '26:53:40', '25:55:30', '24:59:30']
		];
	temps_batiments['39'] = [		 // Grand silo de céréales
		['09:43:20', '01:56:40', '01:52:30', '01:48:30', '01:44:30', '01:40:50', '01:37:10', '01:33:40', '01:30:20', '01:27:00', '01:23:50', '01:20:50', '01:18:00', '01:15:10', '01:12:30', '01:09:50', '01:07:20', '01:04:50', '01:02:30', '01:00:20', '00:58:10'],
		['11:41:40', '02:20:20', '02:15:20', '02:10:20', '02:05:40', '02:01:10', '01:56:50', '01:52:40', '01:48:30', '01:44:40', '01:40:50', '01:37:20', '01:33:50', '01:30:20', '01:27:10', '01:24:00', '01:21:00', '01:18:00', '01:15:10', '01:12:30', '01:10:00'],
		['13:59:10', '02:47:50', '02:41:40', '02:36:00', '02:30:20', '02:24:50', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:40', '01:56:20', '01:52:10', '01:48:00', '01:44:10', '01:40:30', '01:36:50', '01:33:20', '01:30:00', '01:26:40', '01:23:40'],
		['16:38:20', '03:19:40', '03:12:30', '03:05:30', '02:58:50', '02:52:20', '02:46:10', '02:40:10', '02:34:30', '02:28:50', '02:23:30', '02:18:20', '02:13:20', '02:08:30', '02:04:00', '01:59:30', '01:55:10', '01:51:00', '01:47:00', '01:43:10', '01:39:30'],
		['19:42:30', '03:56:30', '03:48:00', '03:39:50', '03:32:00', '03:24:20', '03:17:00', '03:09:50', '03:03:00', '02:56:30', '02:50:00', '02:44:00', '02:38:00', '02:32:20', '02:26:50', '02:21:40', '02:16:30', '02:11:30', '02:06:50', '02:02:20', '01:57:50'],
		['23:17:30', '04:39:30', '04:29:20', '04:19:40', '04:10:20', '04:01:20', '03:52:40', '03:44:10', '03:36:10', '03:28:20', '03:20:50', '03:13:40', '03:06:40', '03:00:00', '02:53:30', '02:47:10', '02:41:10', '02:35:30', '02:29:50', '02:24:30', '02:19:10'],
		['27:25:50', '05:29:10', '05:17:20', '05:05:50', '04:54:50', '04:44:10', '04:34:00', '04:24:10', '04:14:40', '04:05:30', '03:56:40', '03:48:10', '03:39:50', '03:32:00', '03:24:20', '03:17:00', '03:09:50', '03:03:00', '02:56:30', '02:50:10', '02:44:00'],
		['32:14:10', '06:26:50', '06:12:50', '05:59:30', '05:46:30', '05:34:00', '05:22:00', '05:10:20', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:30', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40'],
		['37:48:20', '07:33:40', '07:17:20', '07:01:40', '06:46:30', '06:31:50', '06:17:40', '06:04:10', '05:51:00', '05:38:20', '05:26:10', '05:14:30', '05:03:10', '04:52:10', '04:41:40', '04:31:30', '04:21:50', '04:12:20', '04:03:20', '03:54:30', '03:46:00'],
		['44:16:40', '08:51:20', '08:32:10', '08:13:40', '07:56:00', '07:38:50', '07:22:20', '07:06:20', '06:51:00', '06:36:10', '06:22:00', '06:08:10', '05:55:00', '05:42:10', '05:29:50', '05:18:00', '05:06:30', '04:55:30', '04:44:50', '04:34:40', '04:24:40'],
		['51:46:40', '10:21:20', '09:58:50', '09:37:20', '09:16:30', '08:56:30', '08:37:10', '08:18:40', '08:00:40', '07:43:20', '07:26:40', '07:10:30', '06:55:00', '06:40:10', '06:25:40', '06:11:50', '05:58:30', '05:45:30', '05:33:10', '05:21:10', '05:09:30'],
		['60:28:20', '12:05:40', '11:39:30', '11:14:20', '10:50:10', '10:26:40', '10:04:10', '09:42:20', '09:21:20', '09:01:10', '08:41:40', '08:23:00', '08:04:50', '07:47:20', '07:30:30', '07:14:20', '06:58:40', '06:43:40', '06:29:10', '06:15:10', '06:01:30'],
		['70:34:10', '14:06:50', '13:36:20', '13:06:50', '12:38:40', '12:11:20', '11:45:00', '11:19:30', '10:55:10', '10:31:30', '10:08:50', '09:46:50', '09:25:40', '09:05:20', '08:45:40', '08:26:50', '08:08:30', '07:51:00', '07:34:00', '07:17:40', '07:02:00'],
		['82:16:40', '16:27:20', '15:51:40', '15:17:30', '14:44:30', '14:12:40', '13:41:50', '13:12:20', '12:43:50', '12:16:20', '11:49:50', '11:24:10', '10:59:40', '10:35:50', '10:13:00', '09:50:50', '09:29:40', '09:09:10', '08:49:20', '08:30:20', '08:12:00'],
		['95:50:50', '19:10:10', '18:28:50', '17:48:50', '17:10:30', '16:33:20', '15:57:30', '15:23:10', '14:49:50', '14:17:50', '13:47:00', '13:17:10', '12:48:30', '12:20:50', '11:54:10', '11:28:30', '11:03:40', '10:39:50', '10:16:40', '09:54:30', '09:33:10'],
		['111:36:40', '22:19:20', '21:31:00', '20:44:30', '19:59:50', '19:16:40', '18:35:00', '17:54:50', '17:16:10', '16:38:50', '16:02:50', '15:28:10', '14:54:50', '14:22:30', '13:51:30', '13:21:30', '12:52:40', '12:24:50', '11:58:10', '11:32:10', '11:07:20'],
		['129:52:30', '25:58:30', '25:02:30', '24:08:20', '23:16:10', '22:26:00', '21:37:30', '20:50:50', '20:05:50', '19:22:20', '18:40:30', '18:00:10', '17:21:20', '16:43:50', '16:07:40', '15:32:50', '14:59:10', '14:26:50', '13:55:40', '13:25:30', '12:56:30'],
		['151:05:00', '30:13:00', '29:07:40', '28:04:40', '27:04:10', '26:05:40', '25:09:20', '24:15:00', '23:22:30', '22:32:00', '21:43:20', '20:56:30', '20:11:10', '19:27:40', '18:45:40', '18:05:00', '17:26:00', '16:48:20', '16:12:00', '15:37:00', '15:03:20'],
		['175:40:00', '35:08:00', '33:52:10', '32:39:00', '31:28:30', '30:20:30', '29:14:50', '28:11:40', '27:10:50', '26:12:10', '25:15:30', '24:21:00', '23:28:20', '22:37:40', '21:48:50', '21:01:40', '20:16:20', '19:32:30', '18:50:20', '18:09:30', '17:30:20'],
		['204:11:40', '40:50:20', '39:22:00', '37:57:00', '36:35:00', '35:16:00', '33:59:50', '32:46:30', '31:35:40', '30:27:20', '29:21:40', '28:18:10', '27:17:00', '26:18:10', '25:21:20', '24:26:30', '23:33:40', '22:42:50', '21:53:50', '21:06:30', '20:20:50']
		];
	temps_batiments['40'] = [		 // Merveille du monde
		['12:30:00', '02:30:00', '02:24:40', '02:19:30', '02:14:30', '02:09:30', '02:05:00', '02:00:30', '01:56:10', '01:51:50', '01:47:50', '01:44:00', '01:40:20', '01:36:40', '01:33:10', '01:29:50', '01:26:40', '01:23:30', '01:20:30', '01:17:30', '01:14:50'],
		['13:05:50', '02:37:10', '02:31:30', '02:26:00', '02:20:50', '02:15:40', '02:10:50', '02:06:10', '02:01:30', '01:57:10', '01:53:00', '01:49:00', '01:45:00', '01:41:10', '01:37:30', '01:34:00', '01:30:40', '01:27:30', '01:24:20', '01:21:10', '01:18:20'],
		['13:41:40', '02:44:20', '02:38:30', '02:32:40', '02:27:10', '02:22:00', '02:16:50', '02:11:50', '02:07:10', '02:02:30', '01:58:10', '01:53:50', '01:49:50', '01:45:50', '01:42:00', '01:38:20', '01:34:50', '01:31:30', '01:28:10', '01:25:00', '01:21:50'],
		['14:18:20', '02:51:40', '02:45:30', '02:39:30', '02:33:50', '02:28:10', '02:22:50', '02:17:50', '02:12:50', '02:08:00', '02:03:20', '01:59:00', '01:54:40', '01:50:30', '01:46:30', '01:42:40', '01:39:00', '01:35:30', '01:32:00', '01:28:40', '01:25:30'],
		['14:55:00', '02:59:00', '02:52:40', '02:46:20', '02:40:20', '02:34:40', '02:29:00', '02:23:40', '02:18:30', '02:13:30', '02:08:40', '02:04:10', '01:59:40', '01:55:20', '01:51:10', '01:47:10', '01:43:20', '01:39:40', '01:36:00', '01:32:30', '01:29:10'],
		['15:32:30', '03:06:30', '02:59:50', '02:53:20', '02:47:10', '02:41:10', '02:35:20', '02:29:40', '02:24:20', '02:19:10', '02:14:10', '02:09:20', '02:04:40', '02:00:10', '01:55:50', '01:51:40', '01:47:40', '01:43:50', '01:40:00', '01:36:30', '01:33:00'],
		['16:10:50', '03:14:10', '03:07:10', '03:00:30', '02:54:00', '02:47:40', '02:41:40', '02:35:50', '02:30:10', '02:24:50', '02:19:40', '02:14:30', '02:09:40', '02:05:00', '02:00:30', '01:56:10', '01:52:00', '01:48:00', '01:44:10', '01:40:20', '01:36:50'],
		['16:49:10', '03:21:50', '03:14:40', '03:07:40', '03:00:50', '02:54:20', '02:48:00', '02:42:00', '02:36:10', '02:30:30', '02:25:10', '02:20:00', '02:14:50', '02:10:00', '02:05:20', '02:00:50', '01:56:30', '01:52:20', '01:48:20', '01:44:20', '01:40:40'],
		['17:28:20', '03:29:40', '03:22:10', '03:14:50', '03:07:50', '03:01:10', '02:54:40', '02:48:20', '02:42:10', '02:36:20', '02:30:50', '02:25:20', '02:20:10', '02:15:00', '02:10:10', '02:05:30', '02:01:00', '01:56:40', '01:52:30', '01:48:20', '01:44:30'],
		['18:08:20', '03:37:40', '03:29:50', '03:22:20', '03:15:00', '03:08:00', '03:01:10', '02:54:40', '02:48:20', '02:42:20', '02:36:30', '02:30:50', '02:25:30', '02:20:10', '02:15:10', '02:10:20', '02:05:40', '02:01:00', '01:56:40', '01:52:30', '01:48:30'],
		['18:48:20', '03:45:40', '03:37:30', '03:29:40', '03:22:10', '03:14:50', '03:07:50', '03:01:10', '02:54:40', '02:48:20', '02:42:20', '02:36:30', '02:30:50', '02:25:20', '02:20:10', '02:15:10', '02:10:10', '02:05:30', '02:01:00', '01:56:40', '01:52:30'],
		['19:29:10', '03:53:50', '03:45:30', '03:37:20', '03:29:30', '03:22:00', '03:14:40', '03:07:40', '03:01:00', '02:54:20', '02:48:10', '02:42:00', '02:36:10', '02:30:40', '02:25:10', '02:20:00', '02:15:00', '02:10:10', '02:05:20', '02:00:50', '01:56:30'],
		['20:10:50', '04:02:10', '03:53:20', '03:45:00', '03:36:50', '03:29:10', '03:21:30', '03:14:20', '03:07:20', '03:00:30', '02:54:00', '02:47:50', '02:41:50', '02:36:00', '02:30:20', '02:25:00', '02:19:40', '02:14:40', '02:09:50', '02:05:10', '02:00:40'],
		['20:52:30', '04:10:30', '04:01:30', '03:52:50', '03:44:30', '03:36:20', '03:28:30', '03:21:00', '03:13:50', '03:06:50', '03:00:10', '02:53:40', '02:47:20', '02:41:20', '02:35:30', '02:30:00', '02:24:30', '02:19:20', '02:14:20', '02:09:30', '02:04:50'],
		['21:35:00', '04:19:00', '04:09:40', '04:00:40', '03:52:00', '03:43:40', '03:35:40', '03:27:50', '03:20:20', '03:13:10', '03:06:10', '02:59:30', '02:53:00', '02:46:50', '02:40:50', '02:35:00', '02:29:30', '02:24:00', '02:18:50', '02:13:50', '02:09:00'],
		['22:18:20', '04:27:40', '04:18:00', '04:08:40', '03:59:50', '03:51:10', '03:42:50', '03:34:50', '03:27:00', '03:19:40', '03:12:30', '03:05:30', '02:58:50', '02:52:20', '02:46:10', '02:40:10', '02:34:30', '02:28:50', '02:23:30', '02:18:20', '02:13:20'],
		['23:01:40', '04:36:20', '04:26:30', '04:16:50', '04:07:40', '03:58:40', '03:50:10', '03:41:50', '03:33:50', '03:26:10', '03:18:40', '03:11:30', '03:04:40', '02:58:00', '02:51:40', '02:45:30', '02:39:30', '02:33:40', '02:28:10', '02:22:50', '02:17:40'],
		['23:46:40', '04:45:20', '04:35:00', '04:25:10', '04:15:30', '04:06:20', '03:57:30', '03:49:00', '03:40:40', '03:32:50', '03:25:10', '03:17:40', '03:10:40', '03:03:40', '02:57:10', '02:50:40', '02:44:40', '02:38:40', '02:33:00', '02:27:30', '02:22:10'],
		['24:30:50', '04:54:10', '04:43:40', '04:33:30', '04:23:40', '04:14:10', '04:05:00', '03:56:10', '03:47:40', '03:39:30', '03:31:30', '03:24:00', '03:16:40', '03:09:30', '03:02:40', '02:56:10', '02:49:50', '02:43:40', '02:37:50', '02:32:10', '02:26:40'],
		['25:16:40', '05:03:20', '04:52:30', '04:42:00', '04:31:50', '04:22:00', '04:12:30', '04:03:30', '03:54:40', '03:46:20', '03:38:10', '03:30:20', '03:22:40', '03:15:20', '03:08:20', '03:01:40', '02:55:00', '02:48:50', '02:42:40', '02:36:50', '02:31:10'],
		['26:03:20', '05:12:40', '05:01:20', '04:50:30', '04:40:00', '04:30:00', '04:20:20', '04:10:50', '04:01:50', '03:53:10', '03:44:50', '03:36:40', '03:28:50', '03:21:20', '03:14:10', '03:07:10', '03:00:20', '02:53:50', '02:47:40', '02:41:40', '02:35:50'],
		['26:50:00', '05:22:00', '05:10:20', '04:59:10', '04:48:30', '04:38:00', '04:28:00', '04:18:20', '04:09:10', '04:00:10', '03:51:30', '03:43:10', '03:35:10', '03:27:20', '03:20:00', '03:12:40', '03:05:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30'],
		['27:37:30', '05:31:30', '05:19:30', '05:08:00', '04:57:00', '04:46:20', '04:36:00', '04:26:00', '04:16:30', '04:07:10', '03:58:20', '03:49:50', '03:41:30', '03:33:30', '03:25:50', '03:18:30', '03:11:20', '03:04:20', '02:57:50', '02:51:20', '02:45:10'],
		['28:25:50', '05:41:10', '05:28:50', '05:17:00', '05:05:40', '04:54:40', '04:44:00', '04:33:50', '04:24:00', '04:14:30', '04:05:20', '03:56:30', '03:48:00', '03:39:40', '03:31:50', '03:24:10', '03:16:50', '03:09:50', '03:03:00', '02:56:20', '02:50:00'],
		['29:14:10', '05:50:50', '05:38:20', '05:26:10', '05:14:20', '05:03:00', '04:52:10', '04:41:40', '04:31:30', '04:21:40', '04:12:20', '04:03:10', '03:54:30', '03:46:00', '03:37:50', '03:30:00', '03:22:30', '03:15:10', '03:08:10', '03:01:20', '02:54:50'],
		['30:04:10', '06:00:50', '05:47:50', '05:35:20', '05:23:10', '05:11:40', '05:00:20', '04:49:30', '04:39:10', '04:29:10', '04:19:30', '04:10:10', '04:01:10', '03:52:20', '03:44:00', '03:36:00', '03:28:10', '03:20:40', '03:13:30', '03:06:30', '02:59:50'],
		['30:54:10', '06:10:50', '05:57:30', '05:44:40', '05:32:10', '05:20:20', '05:08:50', '04:57:40', '04:47:00', '04:36:40', '04:26:40', '04:17:00', '04:07:50', '03:58:50', '03:50:20', '03:42:00', '03:34:00', '03:26:20', '03:18:50', '03:11:40', '03:04:50'],
		['31:45:00', '06:21:00', '06:07:20', '05:54:10', '05:41:20', '05:29:10', '05:17:10', '05:05:50', '04:54:50', '04:44:10', '04:34:00', '04:24:10', '04:14:40', '04:05:30', '03:56:40', '03:48:10', '03:39:50', '03:32:00', '03:24:20', '03:17:00', '03:09:50'],
		['32:36:40', '06:31:20', '06:17:20', '06:03:40', '05:50:40', '05:38:00', '05:25:50', '05:14:10', '05:02:50', '04:51:50', '04:41:20', '04:31:20', '04:21:30', '04:12:10', '04:03:00', '03:54:20', '03:45:50', '03:37:40', '03:29:50', '03:22:20', '03:15:00'],
		['33:29:10', '06:41:50', '06:27:20', '06:13:30', '06:00:00', '05:47:00', '05:34:30', '05:22:30', '05:11:00', '04:59:40', '04:49:00', '04:38:30', '04:28:30', '04:18:50', '04:09:30', '04:00:30', '03:51:50', '03:43:30', '03:35:30', '03:27:40', '03:20:20'],
		['34:22:30', '06:52:30', '06:37:40', '06:23:20', '06:09:30', '05:56:10', '05:43:30', '05:31:00', '05:19:10', '05:07:40', '04:56:30', '04:45:50', '04:35:40', '04:25:40', '04:16:10', '04:06:50', '03:58:00', '03:49:30', '03:41:10', '03:33:10', '03:25:30'],
		['35:16:40', '07:03:20', '06:48:00', '06:33:20', '06:19:10', '06:05:30', '05:52:20', '05:39:40', '05:27:30', '05:15:40', '05:04:20', '04:53:20', '04:42:50', '04:32:40', '04:22:50', '04:13:20', '04:04:10', '03:55:30', '03:47:00', '03:38:50', '03:31:00'],
		['36:10:50', '07:14:10', '06:58:30', '06:43:30', '06:29:00', '06:15:00', '06:01:30', '05:48:30', '05:36:00', '05:23:50', '05:12:10', '05:01:00', '04:50:10', '04:39:40', '04:29:40', '04:19:50', '04:10:30', '04:01:30', '03:52:50', '03:44:30', '03:36:20'],
		['37:06:40', '07:25:20', '07:09:20', '06:53:50', '06:38:50', '06:24:30', '06:10:40', '05:57:20', '05:44:30', '05:32:10', '05:20:10', '05:08:40', '04:57:30', '04:46:50', '04:36:30', '04:26:30', '04:17:00', '04:07:40', '03:58:50', '03:50:10', '03:41:50'],
		['38:02:30', '07:36:30', '07:20:10', '07:04:10', '06:49:00', '06:34:10', '06:20:00', '06:06:20', '05:53:10', '05:40:30', '05:28:10', '05:16:20', '05:05:00', '04:54:00', '04:43:30', '04:33:20', '04:23:20', '04:14:00', '04:04:50', '03:56:00', '03:47:30'],
		['38:59:10', '07:47:50', '07:31:00', '07:14:50', '06:59:10', '06:44:10', '06:29:30', '06:15:30', '06:02:00', '05:49:00', '05:36:20', '05:24:20', '05:12:40', '05:01:20', '04:50:30', '04:40:00', '04:30:00', '04:20:20', '04:10:50', '04:01:50', '03:53:10'],
		['39:57:30', '07:59:30', '07:42:10', '07:25:30', '07:09:30', '06:54:00', '06:39:10', '06:24:50', '06:11:00', '05:57:40', '05:44:40', '05:32:20', '05:20:20', '05:08:50', '04:57:40', '04:47:00', '04:36:40', '04:26:40', '04:17:10', '04:07:50', '03:59:00'],
		['40:55:50', '08:11:10', '07:53:30', '07:36:30', '07:20:00', '07:04:10', '06:48:50', '06:34:10', '06:20:00', '06:06:20', '05:53:10', '05:40:30', '05:28:10', '05:16:20', '05:05:00', '04:54:00', '04:43:20', '04:33:10', '04:23:20', '04:13:50', '04:04:50'],
		['41:55:00', '08:23:00', '08:05:00', '07:47:30', '07:30:40', '07:14:30', '06:58:50', '06:43:40', '06:29:10', '06:15:10', '06:01:40', '05:48:40', '05:36:10', '05:24:00', '05:12:20', '05:01:10', '04:50:20', '04:39:50', '04:29:40', '04:20:00', '04:10:40'],
		['42:55:50', '08:35:10', '08:16:30', '07:58:40', '07:41:30', '07:24:50', '07:08:50', '06:53:20', '06:38:30', '06:24:10', '06:10:20', '05:57:00', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:10', '04:46:30', '04:36:10', '04:26:20', '04:16:40'],
		['43:56:40', '08:47:20', '08:28:20', '08:10:00', '07:52:20', '07:35:20', '07:19:00', '07:03:10', '06:48:00', '06:33:20', '06:19:10', '06:05:30', '05:52:20', '05:39:40', '05:27:20', '05:15:40', '05:04:20', '04:53:20', '04:42:40', '04:32:30', '04:22:50'],
		['44:58:20', '08:59:40', '08:40:20', '08:21:30', '08:03:30', '07:46:00', '07:29:20', '07:13:10', '06:57:30', '06:42:30', '06:28:00', '06:14:00', '06:00:30', '05:47:40', '05:35:10', '05:23:00', '05:11:20', '05:00:10', '04:49:20', '04:39:00', '04:29:00'],
		['46:00:50', '09:12:10', '08:52:20', '08:33:10', '08:14:40', '07:56:50', '07:39:40', '07:23:10', '07:07:10', '06:51:50', '06:37:00', '06:22:40', '06:09:00', '05:55:40', '05:42:50', '05:30:30', '05:18:40', '05:07:10', '04:56:10', '04:45:30', '04:35:10'],
		['47:05:00', '09:25:00', '09:04:40', '08:45:00', '08:26:10', '08:07:50', '07:50:20', '07:33:20', '07:17:10', '07:01:20', '06:46:10', '06:31:30', '06:17:30', '06:03:50', '05:50:50', '05:38:10', '05:26:00', '05:14:20', '05:03:00', '04:52:00', '04:41:30'],
		['48:09:10', '09:37:50', '09:17:00', '08:57:00', '08:37:40', '08:19:00', '08:01:10', '07:43:50', '07:27:00', '07:11:00', '06:55:30', '06:40:30', '06:26:10', '06:12:10', '05:58:50', '05:45:50', '05:33:30', '05:21:30', '05:09:50', '04:58:40', '04:48:00'],
		['49:15:00', '09:51:00', '09:29:40', '09:09:10', '08:49:20', '08:30:20', '08:12:00', '07:54:20', '07:37:10', '07:20:40', '07:04:50', '06:49:40', '06:34:50', '06:20:40', '06:07:00', '05:53:40', '05:41:00', '05:28:40', '05:16:50', '05:05:30', '04:54:30'],
		['50:20:50', '10:04:10', '09:42:30', '09:21:30', '09:01:20', '08:41:50', '08:23:00', '08:05:00', '07:47:30', '07:30:40', '07:14:30', '06:58:50', '06:43:40', '06:29:10', '06:15:10', '06:01:40', '05:48:40', '05:36:10', '05:24:00', '05:12:20', '05:01:10'],
		['51:28:20', '10:17:40', '09:55:30', '09:34:00', '09:13:20', '08:53:30', '08:34:10', '08:15:40', '07:57:50', '07:40:40', '07:24:10', '07:08:10', '06:52:40', '06:37:50', '06:23:30', '06:09:40', '05:56:20', '05:43:30', '05:31:10', '05:19:20', '05:07:50'],
		['52:36:40', '10:31:20', '10:08:40', '09:46:40', '09:25:40', '09:05:10', '08:45:40', '08:26:40', '08:08:30', '07:50:50', '07:33:50', '07:17:30', '07:01:50', '06:46:40', '06:32:00', '06:17:50', '06:04:20', '05:51:10', '05:38:30', '05:26:20', '05:14:40'],
		['53:45:50', '10:45:10', '10:22:00', '09:59:30', '09:38:00', '09:17:10', '08:57:10', '08:37:50', '08:19:10', '08:01:10', '07:43:50', '07:27:10', '07:11:00', '06:55:30', '06:40:40', '06:26:10', '06:12:20', '05:58:50', '05:46:00', '05:33:30', '05:21:30'],
		['54:55:50', '10:59:10', '10:35:30', '10:12:40', '09:50:30', '09:29:20', '09:08:50', '08:49:00', '08:30:00', '08:11:40', '07:54:00', '07:36:50', '07:20:30', '07:04:40', '06:49:20', '06:34:30', '06:20:20', '06:06:40', '05:53:30', '05:40:50', '05:28:30'],
		['56:07:30', '11:13:30', '10:49:10', '10:25:50', '10:03:20', '09:41:40', '09:20:40', '09:00:30', '08:41:00', '08:22:20', '08:04:10', '07:46:40', '07:30:00', '07:13:40', '06:58:10', '06:43:10', '06:28:30', '06:14:40', '06:01:10', '05:48:10', '05:35:30'],
		['57:19:10', '11:27:50', '11:03:10', '10:39:10', '10:16:10', '09:54:00', '09:32:40', '09:12:00', '08:52:10', '08:33:00', '08:14:30', '07:56:40', '07:39:40', '07:23:00', '07:07:10', '06:51:40', '06:36:50', '06:22:40', '06:08:50', '05:55:30', '05:42:50'],
		['58:32:30', '11:42:30', '11:17:10', '10:52:50', '10:29:20', '10:06:40', '09:44:50', '09:23:50', '09:03:30', '08:44:00', '08:25:00', '08:06:50', '07:49:20', '07:32:30', '07:16:10', '07:00:30', '06:45:20', '06:30:40', '06:16:40', '06:03:10', '05:50:00'],
		['59:46:40', '11:57:20', '11:31:30', '11:06:40', '10:42:40', '10:19:30', '09:57:10', '09:35:40', '09:15:00', '08:55:00', '08:35:40', '08:17:10', '07:59:20', '07:42:00', '07:25:20', '07:09:20', '06:53:50', '06:39:00', '06:24:40', '06:10:50', '05:57:30'],
		['61:01:40', '12:12:20', '11:46:00', '11:20:40', '10:56:10', '10:32:30', '10:09:40', '09:47:50', '09:26:40', '09:06:10', '08:46:30', '08:27:40', '08:09:20', '07:51:40', '07:34:40', '07:18:20', '07:02:30', '06:47:20', '06:32:40', '06:18:30', '06:05:00'],
		['62:18:20', '12:27:40', '12:00:40', '11:34:50', '11:09:50', '10:45:40', '10:22:20', '10:00:00', '09:38:20', '09:17:40', '08:57:30', '08:38:10', '08:19:30', '08:01:30', '07:44:10', '07:27:30', '07:11:20', '06:55:50', '06:40:50', '06:26:30', '06:12:30'],
		['63:35:50', '12:43:10', '12:15:40', '11:49:10', '11:23:40', '10:59:00', '10:35:20', '10:12:20', '09:50:20', '09:29:10', '09:08:40', '08:48:50', '08:29:50', '08:11:30', '07:53:50', '07:36:40', '07:20:20', '07:04:30', '06:49:10', '06:34:30', '06:20:10'],
		['64:54:10', '12:58:50', '12:30:40', '12:03:40', '11:37:40', '11:12:30', '10:48:20', '10:25:00', '10:02:30', '09:40:50', '09:19:50', '08:59:50', '08:40:20', '08:21:40', '08:03:30', '07:46:10', '07:29:20', '07:13:10', '06:57:30', '06:42:30', '06:28:00'],
		['66:13:20', '13:14:40', '12:46:00', '12:18:30', '11:51:50', '11:26:20', '11:01:30', '10:37:50', '10:14:50', '09:52:40', '09:31:20', '09:10:50', '08:51:00', '08:31:50', '08:13:20', '07:55:40', '07:38:30', '07:22:00', '07:06:10', '06:50:50', '06:36:00'],
		['67:34:10', '13:30:50', '13:01:40', '12:33:30', '12:06:20', '11:40:10', '11:15:00', '10:50:40', '10:27:20', '10:04:40', '09:43:00', '09:22:00', '09:01:40', '08:42:10', '08:23:30', '08:05:20', '07:47:50', '07:31:00', '07:14:50', '06:59:10', '06:44:00'],
		['68:55:50', '13:47:10', '13:17:20', '12:48:40', '12:21:00', '11:54:20', '11:28:40', '11:03:50', '10:40:00', '10:16:50', '09:54:40', '09:33:20', '09:12:40', '08:52:40', '08:33:30', '08:15:10', '07:57:20', '07:40:10', '07:23:30', '07:07:30', '06:52:10'],
		['70:18:20', '14:03:40', '13:33:20', '13:04:00', '12:35:50', '12:08:40', '11:42:30', '11:17:10', '10:52:50', '10:29:20', '10:06:40', '09:44:50', '09:23:40', '09:03:30', '08:43:50', '08:25:00', '08:06:50', '07:49:20', '07:32:20', '07:16:10', '07:00:30'],
		['71:42:30', '14:20:30', '13:49:30', '13:19:40', '12:51:00', '12:23:10', '11:56:20', '11:30:40', '11:05:50', '10:41:50', '10:18:40', '09:56:30', '09:35:00', '09:14:20', '08:54:20', '08:35:00', '08:16:30', '07:58:40', '07:41:30', '07:24:50', '07:08:50'],
		['73:08:20', '14:37:40', '14:06:00', '13:35:30', '13:06:10', '12:37:50', '12:10:40', '11:44:20', '11:19:00', '10:54:30', '10:31:00', '10:08:10', '09:46:20', '09:25:10', '09:04:50', '08:45:20', '08:26:20', '08:08:10', '07:50:30', '07:33:40', '07:17:20'],
		['74:34:10', '14:54:50', '14:22:40', '13:51:40', '13:21:40', '12:52:50', '12:25:00', '11:58:10', '11:32:20', '11:07:20', '10:43:20', '10:20:10', '09:57:50', '09:36:20', '09:15:40', '08:55:40', '08:36:20', '08:17:50', '07:59:50', '07:42:30', '07:25:50'],
		['76:01:40', '15:12:20', '14:39:30', '14:07:50', '13:37:20', '13:08:00', '12:39:40', '12:12:10', '11:45:50', '11:20:30', '10:56:00', '10:32:20', '10:09:40', '09:47:40', '09:26:30', '09:06:10', '08:46:30', '08:27:30', '08:09:10', '07:51:40', '07:34:40'],
		['77:30:50', '15:30:10', '14:56:40', '14:24:20', '13:53:20', '13:23:20', '12:54:20', '12:26:30', '11:59:40', '11:33:40', '11:08:50', '10:44:40', '10:21:30', '09:59:10', '09:37:30', '09:16:40', '08:56:40', '08:37:20', '08:18:50', '08:00:50', '07:43:30'],
		['79:00:50', '15:48:10', '15:14:00', '14:41:10', '14:09:30', '13:38:50', '13:09:20', '12:41:00', '12:13:30', '11:47:10', '11:21:40', '10:57:10', '10:33:30', '10:10:40', '09:48:40', '09:27:30', '09:07:10', '08:47:20', '08:28:30', '08:10:10', '07:52:30'],
		['80:32:30', '16:06:30', '15:31:40', '14:58:10', '14:25:50', '13:54:40', '13:24:40', '12:55:40', '12:27:40', '12:00:50', '11:34:50', '11:09:50', '10:45:40', '10:22:30', '10:00:00', '09:38:30', '09:17:40', '08:57:30', '08:38:10', '08:19:30', '08:01:40'],
		['82:05:00', '16:25:00', '15:49:30', '15:15:20', '14:42:20', '14:10:40', '13:40:00', '13:10:30', '12:42:00', '12:14:40', '11:48:10', '11:22:40', '10:58:10', '10:34:20', '10:11:30', '09:49:30', '09:28:20', '09:07:50', '08:48:10', '08:29:10', '08:10:50'],
		['83:39:10', '16:43:50', '16:07:40', '15:32:50', '14:59:10', '14:26:50', '13:55:40', '13:25:40', '12:56:40', '12:28:40', '12:01:40', '11:35:40', '11:10:40', '10:46:30', '10:23:10', '10:00:50', '09:39:10', '09:18:20', '08:58:10', '08:38:50', '08:20:10'],
		['85:14:10', '17:02:50', '16:26:00', '15:50:30', '15:16:20', '14:43:20', '14:11:30', '13:40:50', '13:11:20', '12:42:50', '12:15:20', '11:48:50', '11:23:20', '10:58:50', '10:35:00', '10:12:10', '09:50:10', '09:29:00', '09:08:30', '08:48:40', '08:29:40'],
		['86:50:50', '17:22:10', '16:44:40', '16:08:30', '15:33:40', '15:00:00', '14:27:40', '13:56:20', '13:26:20', '12:57:10', '12:29:20', '12:02:20', '11:36:20', '11:11:10', '10:47:00', '10:23:50', '10:01:20', '09:39:40', '09:18:50', '08:58:40', '08:39:20'],
		['88:29:10', '17:41:50', '17:03:30', '16:26:40', '15:51:10', '15:17:00', '14:44:00', '14:12:10', '13:41:30', '13:11:50', '12:43:20', '12:15:50', '11:49:20', '11:23:50', '10:59:10', '10:35:30', '10:12:40', '09:50:30', '09:29:20', '09:08:50', '08:49:00'],
		['90:08:20', '18:01:40', '17:22:40', '16:45:10', '16:09:00', '15:34:10', '15:00:30', '14:28:00', '13:56:50', '13:26:40', '12:57:40', '12:29:40', '12:02:40', '11:36:40', '11:11:30', '10:47:20', '10:24:10', '10:01:40', '09:40:00', '09:19:10', '08:59:00'],
		['91:49:10', '18:21:50', '17:42:10', '17:03:50', '16:27:00', '15:51:30', '15:17:10', '14:44:10', '14:12:20', '13:41:40', '13:12:10', '12:43:40', '12:16:10', '11:49:40', '11:24:00', '10:59:30', '10:35:40', '10:12:50', '09:50:50', '09:29:30', '09:09:00'],
		['93:30:50', '18:42:10', '18:01:50', '17:22:50', '16:45:20', '16:09:10', '15:34:10', '15:00:40', '14:28:10', '13:57:00', '13:26:50', '12:57:50', '12:29:50', '12:02:50', '11:36:40', '11:11:40', '10:47:30', '10:24:10', '10:01:40', '09:40:00', '09:19:10'],
		['95:14:10', '19:02:50', '18:21:50', '17:42:10', '17:03:50', '16:27:00', '15:51:30', '15:17:10', '14:44:10', '14:12:20', '13:41:40', '13:12:10', '12:43:40', '12:16:10', '11:49:40', '11:24:00', '10:59:30', '10:35:40', '10:12:50', '09:50:50', '09:29:30'],
		['96:59:10', '19:23:50', '18:42:00', '18:01:40', '17:22:40', '16:45:10', '16:09:00', '15:34:00', '15:00:30', '14:28:00', '13:56:50', '13:26:40', '12:57:40', '12:29:40', '12:02:40', '11:36:40', '11:11:30', '10:47:20', '10:24:00', '10:01:40', '09:40:00'],
		['98:45:50', '19:45:10', '19:02:30', '18:21:20', '17:41:40', '17:03:30', '16:26:40', '15:51:10', '15:17:00', '14:43:50', '14:12:10', '13:41:30', '13:11:50', '12:43:20', '12:15:50', '11:49:20', '11:23:50', '10:59:10', '10:35:30', '10:12:40', '09:50:30'],
		['100:34:10', '20:06:50', '19:23:20', '18:41:30', '18:01:10', '17:22:10', '16:44:40', '16:08:30', '15:33:40', '15:00:00', '14:27:40', '13:56:20', '13:26:20', '12:57:20', '12:29:20', '12:02:20', '11:36:20', '11:11:10', '10:47:00', '10:23:50', '10:01:20'],
		['102:23:20', '20:28:40', '19:44:30', '19:01:50', '18:20:40', '17:41:00', '17:02:50', '16:26:00', '15:50:30', '15:16:20', '14:43:20', '14:11:30', '13:40:50', '13:11:20', '12:42:50', '12:15:20', '11:49:00', '11:23:20', '10:58:50', '10:35:10', '10:12:10'],
		['104:14:10', '20:50:50', '20:05:50', '19:22:30', '18:40:40', '18:00:20', '17:21:20', '16:43:50', '16:07:40', '15:32:50', '14:59:20', '14:27:00', '13:55:40', '13:25:40', '12:56:40', '12:28:40', '12:01:40', '11:35:50', '11:10:40', '10:46:30', '10:23:20'],
		['106:06:40', '21:13:20', '20:27:30', '19:43:20', '19:00:50', '18:19:40', '17:40:10', '17:02:00', '16:25:10', '15:49:40', '15:15:30', '14:42:30', '14:10:50', '13:40:10', '13:10:40', '12:42:10', '12:14:40', '11:48:20', '11:22:50', '10:58:10', '10:34:30'],
		['108:00:50', '21:36:10', '20:49:30', '20:04:30', '19:21:10', '18:39:20', '17:59:10', '17:20:20', '16:42:50', '16:06:40', '15:31:50', '14:58:20', '14:26:00', '13:54:50', '13:24:50', '12:55:50', '12:27:50', '12:01:00', '11:35:00', '11:10:00', '10:45:50'],
		['109:56:40', '21:59:20', '21:11:50', '20:26:00', '19:42:00', '18:59:20', '18:18:20', '17:38:50', '17:00:40', '16:24:00', '15:48:30', '15:14:20', '14:41:30', '14:09:50', '13:39:10', '13:09:40', '12:41:20', '12:13:50', '11:47:30', '11:22:00', '10:57:30'],
		['111:54:10', '22:22:50', '21:34:30', '20:47:50', '20:03:00', '19:19:40', '18:38:00', '17:57:40', '17:18:50', '16:41:30', '16:05:30', '15:30:40', '14:57:10', '14:24:50', '13:53:40', '13:23:40', '12:54:50', '12:26:50', '12:00:00', '11:34:10', '11:09:10'],
		['113:53:20', '22:46:40', '21:57:30', '21:10:00', '20:24:20', '19:40:10', '18:57:40', '18:16:50', '17:37:20', '16:59:10', '16:22:30', '15:47:10', '15:13:00', '14:40:10', '14:08:30', '13:38:00', '13:08:30', '12:40:10', '12:12:50', '11:46:20', '11:21:00'],
		['115:54:10', '23:10:50', '22:20:40', '21:32:30', '20:45:50', '20:01:00', '19:17:50', '18:36:10', '17:56:00', '17:17:10', '16:39:50', '16:03:50', '15:29:10', '14:55:40', '14:23:30', '13:52:30', '13:22:30', '12:53:30', '12:25:40', '11:58:50', '11:33:00'],
		['117:55:50', '23:35:10', '22:44:20', '21:55:10', '21:07:50', '20:22:10', '19:38:10', '18:55:50', '18:14:50', '17:35:30', '16:57:30', '16:20:50', '15:45:30', '15:11:30', '14:38:40', '14:07:00', '13:36:30', '13:07:10', '12:38:50', '12:11:30', '11:45:10'],
		['120:00:00', '24:00:00', '23:08:10', '22:18:10', '21:30:00', '20:43:40', '19:58:50', '19:15:40', '18:34:10', '17:54:00', '17:15:20', '16:38:00', '16:02:10', '15:27:30', '14:54:10', '14:21:50', '13:50:50', '13:21:00', '12:52:10', '12:24:20', '11:57:30'],
		['122:05:50', '24:25:10', '23:32:30', '22:41:40', '21:52:40', '21:05:20', '20:19:50', '19:35:50', '18:53:30', '18:12:40', '17:33:20', '16:55:30', '16:19:00', '15:43:40', '15:09:40', '14:37:00', '14:05:20', '13:35:00', '13:05:40', '12:37:20', '12:10:10'],
		['124:13:20', '24:50:40', '23:57:00', '23:05:20', '22:15:30', '21:27:20', '20:41:00', '19:56:20', '19:13:20', '18:31:50', '17:51:50', '17:13:10', '16:36:00', '16:00:10', '15:25:30', '14:52:10', '14:20:10', '13:49:10', '13:19:20', '12:50:30', '12:22:50'],
		['126:23:20', '25:16:40', '24:22:00', '23:29:20', '22:38:40', '21:49:40', '21:02:30', '20:17:10', '19:33:20', '18:51:00', '18:10:20', '17:31:10', '16:53:20', '16:16:50', '15:41:40', '15:07:40', '14:35:00', '14:03:30', '13:33:10', '13:03:50', '12:35:40'],
		['128:34:10', '25:42:50', '24:47:20', '23:53:40', '23:02:10', '22:12:20', '21:24:20', '20:38:10', '19:53:40', '19:10:40', '18:29:10', '17:49:20', '17:10:50', '16:33:40', '15:57:50', '15:23:30', '14:50:10', '14:18:10', '13:47:10', '13:17:30', '12:48:50'],
		['130:47:30', '26:09:30', '25:13:00', '24:18:30', '23:26:00', '22:35:20', '21:46:30', '20:59:30', '20:14:10', '19:30:30', '18:48:20', '18:07:40', '17:28:30', '16:50:50', '16:14:30', '15:39:20', '15:05:30', '14:33:00', '14:01:30', '13:31:10', '13:02:00'],
		['133:01:40', '26:36:20', '25:39:00', '24:43:30', '23:50:10', '22:58:40', '22:09:00', '21:21:10', '20:35:00', '19:50:30', '19:07:40', '18:26:20', '17:46:30', '17:08:10', '16:31:10', '15:55:30', '15:21:10', '14:48:00', '14:16:00', '13:45:10', '13:15:30'],
		['135:18:20', '27:03:40', '26:05:20', '25:09:00', '24:14:40', '23:22:20', '22:31:50', '21:43:10', '20:56:10', '20:11:00', '19:27:20', '18:45:20', '18:04:50', '17:25:50', '16:48:10', '16:11:50', '15:36:50', '15:03:10', '14:30:40', '13:59:20', '13:29:00'],
		['137:37:30', '27:31:30', '26:32:00', '25:34:40', '24:39:30', '23:46:10', '22:54:50', '22:05:20', '21:17:40', '20:31:40', '19:47:20', '19:04:30', '18:23:20', '17:43:40', '17:05:20', '16:28:30', '15:52:50', '15:18:30', '14:45:30', '14:13:40', '13:42:50']
		];
	temps_batiments['41'] = [		 // Abreuvoir
		['03:03:20', '00:36:40', '00:35:20', '00:34:00', '00:32:50', '00:31:40', '00:30:30', '00:29:30', '00:28:20', '00:27:20', '00:26:20', '00:25:20', '00:24:30', '00:23:40', '00:22:50', '00:22:00', '00:21:10', '00:20:20', '00:19:40', '00:19:00', '00:18:20'],
		['04:22:30', '00:52:30', '00:50:40', '00:48:50', '00:47:00', '00:45:20', '00:43:40', '00:42:10', '00:40:40', '00:39:10', '00:37:50', '00:36:20', '00:35:10', '00:33:50', '00:32:40', '00:31:30', '00:30:20', '00:29:10', '00:28:10', '00:27:10', '00:26:10'],
		['05:55:00', '01:11:00', '01:08:20', '01:06:00', '01:03:30', '01:01:20', '00:59:00', '00:57:00', '00:54:50', '00:52:50', '00:51:00', '00:49:10', '00:47:20', '00:45:40', '00:44:00', '00:42:30', '00:41:00', '00:39:30', '00:38:00', '00:36:40', '00:35:20'],
		['07:41:40', '01:32:20', '01:29:00', '01:25:50', '01:22:40', '01:19:40', '01:16:50', '01:14:00', '01:11:20', '01:08:50', '01:06:20', '01:04:00', '01:01:40', '00:59:30', '00:57:20', '00:55:10', '00:53:10', '00:51:20', '00:49:30', '00:47:40', '00:46:00'],
		['09:45:00', '01:57:00', '01:52:50', '01:48:50', '01:44:50', '01:41:10', '01:37:30', '01:34:00', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20', '01:12:40', '01:10:00', '01:07:30', '01:05:10', '01:02:50', '01:00:30', '00:58:20'],
		['12:09:10', '02:25:50', '02:20:30', '02:15:30', '02:10:40', '02:05:50', '02:01:20', '01:57:00', '01:52:50', '01:48:40', '01:44:50', '01:41:00', '01:37:20', '01:33:50', '01:30:30', '01:27:20', '01:24:10', '01:21:10', '01:18:10', '01:15:20', '01:12:40'],
		['14:55:50', '02:59:10', '02:52:40', '02:46:30', '02:40:30', '02:34:40', '02:29:10', '02:23:40', '02:18:30', '02:13:30', '02:08:50', '02:04:10', '01:59:40', '01:55:20', '01:51:10', '01:47:10', '01:43:20', '01:39:40', '01:36:00', '01:32:30', '01:29:10'],
		['18:09:10', '03:37:50', '03:30:00', '03:22:20', '03:15:10', '03:08:00', '03:01:20', '02:54:50', '02:48:30', '02:42:20', '02:36:30', '02:31:00', '02:25:30', '02:20:20', '02:15:10', '02:10:20', '02:05:40', '02:01:10', '01:56:50', '01:52:30', '01:48:30'],
		['21:53:20', '04:22:40', '04:13:10', '04:04:00', '03:55:20', '03:46:50', '03:38:40', '03:30:50', '03:23:10', '03:15:50', '03:08:50', '03:02:00', '02:55:30', '02:49:10', '02:43:00', '02:37:10', '02:31:30', '02:26:00', '02:20:50', '02:15:40', '02:10:50'],
		['26:13:20', '05:14:40', '05:03:20', '04:52:20', '04:41:50', '04:31:40', '04:22:00', '04:12:30', '04:03:20', '03:54:40', '03:46:10', '03:38:00', '03:30:10', '03:22:40', '03:15:20', '03:08:20', '03:01:30', '02:55:00', '02:48:40', '02:42:40', '02:36:50'],
		['31:15:00', '06:15:00', '06:01:30', '05:48:30', '05:35:50', '05:23:50', '05:12:10', '05:01:00', '04:50:10', '04:39:40', '04:29:30', '04:19:50', '04:10:30', '04:01:30', '03:52:50', '03:44:30', '03:36:20', '03:28:30', '03:21:00', '03:13:50', '03:06:50'],
		['37:05:00', '07:25:00', '07:09:00', '06:53:30', '06:38:40', '06:24:20', '06:10:30', '05:57:10', '05:44:10', '05:31:50', '05:19:50', '05:08:20', '04:57:20', '04:46:30', '04:36:20', '04:26:20', '04:16:40', '04:07:30', '03:58:30', '03:50:00', '03:41:40'],
		['43:50:50', '08:46:10', '08:27:10', '08:09:00', '07:51:20', '07:34:20', '07:18:00', '07:02:20', '06:47:00', '06:32:20', '06:18:20', '06:04:40', '05:51:30', '05:38:50', '05:26:40', '05:14:50', '05:03:30', '04:52:40', '04:42:10', '04:32:00', '04:22:10'],
		['51:41:40', '10:20:20', '09:58:00', '09:36:30', '09:15:40', '08:55:40', '08:36:30', '08:17:50', '08:00:00', '07:42:40', '07:26:00', '07:10:00', '06:54:30', '06:39:30', '06:25:10', '06:11:20', '05:58:00', '05:45:00', '05:32:40', '05:20:40', '05:09:10'],
		['60:48:20', '12:09:40', '11:43:20', '11:18:00', '10:53:40', '10:30:00', '10:07:20', '09:45:30', '09:24:30', '09:04:10', '08:44:30', '08:25:40', '08:07:30', '07:49:50', '07:33:00', '07:16:40', '07:01:00', '06:45:50', '06:31:10', '06:17:10', '06:03:30'],
		['71:21:40', '14:16:20', '13:45:30', '13:15:50', '12:47:10', '12:19:30', '11:52:50', '11:27:10', '11:02:30', '10:38:40', '10:15:40', '09:53:30', '09:32:10', '09:11:30', '08:51:40', '08:32:30', '08:14:00', '07:56:20', '07:39:10', '07:22:40', '07:06:40'],
		['83:36:40', '16:43:20', '16:07:10', '15:32:20', '14:58:50', '14:26:30', '13:55:20', '13:25:10', '12:56:10', '12:28:20', '12:01:20', '11:35:20', '11:10:20', '10:46:10', '10:23:00', '10:00:30', '09:38:50', '09:18:00', '08:58:00', '08:38:40', '08:20:00'],
		['97:49:10', '19:33:50', '18:51:40', '18:10:50', '17:31:40', '16:53:50', '16:17:20', '15:42:00', '15:08:10', '14:35:30', '14:04:00', '13:33:30', '13:04:20', '12:36:00', '12:08:50', '11:42:40', '11:17:20', '10:52:50', '10:29:20', '10:06:50', '09:44:50'],
		['114:18:20', '22:51:40', '22:02:20', '21:14:40', '20:28:50', '19:44:40', '19:02:00', '18:20:50', '17:41:10', '17:03:00', '16:26:10', '15:50:40', '15:16:30', '14:43:30', '14:11:40', '13:41:00', '13:11:30', '12:43:00', '12:15:30', '11:49:00', '11:23:30'],
		['133:25:50', '26:41:10', '25:43:30', '24:48:00', '23:54:20', '23:02:50', '22:13:00', '21:25:00', '20:38:40', '19:54:10', '19:11:10', '18:29:40', '17:49:50', '17:11:10', '16:34:10', '15:58:20', '15:23:50', '14:50:30', '14:18:30', '13:47:40', '13:17:50']
		];
	add_log(1, "get_temps_batiments() > Fin.");
	}
	
// ******************************************************
// *** Début des fonctions copiées sur Travian Beyond ***
// ******************************************************
// (Et modifiées)

//////////////////////////////////////////////////////////////////////
// Create a new element of the DOM
//   call syntax:
//   1)   $elem(type)
//   2)   $elem(type, innerHTML)
//   3)   $elem(type, childNode)
//   4)   $elem(type, [attributes])
//   5)   $elem(type, [attributes], innerHTML)
//   6)   $elem(type, [attributes], childNode)
//   7)   $elem(type, [attributes], [children])
function $cr_elem(aType, attributes, content) {
	var node = document.createElement(aType); 
	if (arguments.length === 2 && (!(attributes instanceof Array) || typeof attributes === "string" )) {
		content = attributes;
		attributes = null;
		}   
	$add_att(node, attributes);
	if (content !== null && content !== undefined) {
		if (typeof content === "object") {
			addChildren(node,content);
			}
		else if (content !== "") {
			node.innerHTML = content; 
			}
		}
	return node;
	}

//////////////////////////////////////////////////////////////////////
// Give attributes
//   call syntax:
//   1)   $at(node)
//   2)   $at(node, [])
//   3)   $at(node, [[name1,value1],...,[nameN,valueN]])
function $add_att(aElem, attributes) {
	if (attributes) {
		var xi;
		for (xi = 0; xi < attributes.length; xi++) {
			var attribute = attributes[xi];
			if (attribute instanceof Array && attribute.length >= 2) {
				aElem.setAttribute(attribute[0], attribute[1]);
				if ( attribute[0].toUpperCase() === 'TITLE' ) {
					aElem.setAttribute('alt', attribute[1]);
					}
				}
			}
		}
	} 


//////////////////////////////////////////////////////////////////////
// Crée une TABLE
function $cr_table(att, content) {
	return $cr_elem("table", att, content);
	}

//////////////////////////////////////////////////////////////////////
// Crée un TH
function $cr_th(att, content) {
	return $cr_elem("th", att, content);
	}

//////////////////////////////////////////////////////////////////////
// Crée un TR
function $cr_tr(att, content) {
	return $cr_elem("tr", att, content);
	}

//////////////////////////////////////////////////////////////////////
// Crée un TD
function $cr_td(att, content) {
	return $cr_elem("td", att, content);
	}

	
//////////////////////////////////////////////////////////////////////
// Crée une IMAGE
function $cr_img(att) {
   var aImg = document.createElement("img");
   $add_att(aImg, att);
   return aImg;
}

//////////////////////////////////////////////////////////////////////
// Crée un lien A
function $cr_a(iHTML, att) {
	return $cr_elem("a", att, iHTML);
	}

//////////////////////////////////////////////////////////////////////
// Crée un INPUT
function $cr_input(att){
	var aInput = document.createElement("input");
	$add_att(aInput, att);
	return aInput;
	}

//////////////////////////////////////////////////////////////////////
// Crée une div
function $cr_d(iHTML, att){
	return $cr_elem("div", att, iHTML);
	}
	
//////////////////////////////////////////////////////////////////////
// Crée un span
function $cr_s(iHTML, att){
	return $cr_elem("span", att, iHTML);
	}



// ****************************************************
// *** Fin des fonctions copiées sur Travian Beyond ***
// ****************************************************


