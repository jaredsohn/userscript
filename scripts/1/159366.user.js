// ==UserScript==
// @name           Censure Automatique
// @namespace      www.lesroyaumes.com
// @include        http://forum.lesroyaumes.com/posting*
// @include        http://forum.lesroyaumes.com/privmsg*
// @include        http://forum2.lesroyaumes.com/posting*
// @include        http://forum2.lesroyaumes.com/privmsg*
// @grant none
// ==/UserScript==


var Verification = new RegExp("Vous êtes connecté avec le compte : (\{.+\})", "gi");
var HTML = document.body.innerHTML;

if (Verification.test(HTML)) {
	var Censeur = RegExp.$1;
    var clef, options = '';
	var DOM = document.querySelector('table.forumline[cellpadding="3"]').querySelectorAll("table")[2].querySelectorAll("tr")[3].querySelector("td");
    var Liste = new Array();
    Liste['Reponse rapide'] = "";
    	
	// ==== DEFINITION DU TEXTE ==== 
	
	/* Pour ajouter un élément à la liste :
	** 1. Ajouter avant FIN DEFINITION : Liste[''] = ""; 
	** 2. Dans '', mettez ce que vous désirez voir dans la liste.
	** 3. Dans "", mettez-y votre texte. Attention. A chaque saut de ligne, vous devrez ajouter \n afin que le code le comprenne.
	** Ou sinon, allez sur : 
	
	** Note : Vous pouvez utiliser la variable Censeur dans laquelle se trouve votre nom de censeur en utilisant la syntaxe suivante: "+ Censeur +"
	*/
	
	Liste['Etiquetage'] = "[color=green][b]Bonjour,[/b]\n\nIl semblerait que vous enfreignez les règles de la censure concernant l'étiquetage des topics. Après vérification, je ne vois aucune étiquette sur votre topic. Je me suis permis de vous citer le passage concernant l'étiquetage des règles de la censure afin que vous puissiez en prendre connaissance le plus rapidement possible. Naturellement, une fois que tout cela est rentré dans l'ordre, ce message disparaitra. \n\n Je vous invite donc à régler cette situation dans les plus brefs délais. \n\n [i]" + Censeur +"[/i]\n[/color][quote][size=18][color=darkblue][b]Etiquetage des nouveaux topics [/b][/color][/size] \n\n [u]Étiqueter clairement la nature de votre discussion en créant un sujet, notamment par l'application d'un sigle [RP], [HRP], [IRL] ou [FLOOD] entre crochets dans le titre du thread concerné.[/u]\n Pour vous aider à faire la distinction voici quelques définitions adoptées par tous. \n\n [list][b]Rp[/b] : Post qui permet de raconter une histoire d'une ville d'un duché ou d'un groupe. C’est la vie de votre perso. Les Rp sont limités à 50 pages. Dès que cette quantité est atteinte, le censeur nettoiera (comprendre supprimera) les pages précédentes et jugées trop anciennes. \n\n [b]Flood[/b] : Jeux divers où un mot voire une phrase suffit comme réponse et les topic qui se suivent mais n'apporte strictement rien au RP de la ville. Le plus souvent ils amusent les joueurs devant leur pc plutôt que le personnage en lui-même. Ils sont limités sur les halles uniquement et à 50 pages pour un sujet ou deux sujets de flood de 25 pages chacun... \n\n [b]Jeu[/b] : Sujet où le joueur s'éclate devant son pc tout en mettant en scène de façon Rp son personnage. Ex : loup-garou, chasse à la sorcière and co. Ils sont limités à un par halle, et ne sont pas autorisés en gargote.[/list] \n\n\n Je pars du principe que l’auteur d’un topic, en est responsable et qu’il peut donc demander à tout moment l’intervention d’un censeur, [size=12]si celui-ci n’était pas respecté. [/size][/quote]";
	Liste['Etiquetage non réglé'] = "[color=green][b]Bonjour,[/b]\n\nD'après le mouchard installé sur ce topic, la situation n'a toujours pas été réglée, malgré mon dernier message publié il y a plus de 48 heures. Je suis donc dans la contrainte de passer aux actes.\nC'est-à-dire, de verrouiller ce topic pour avoir oublié d'étiqueter votre message.\n\n[i]"+Censeur+"[/i][/color]";
	Liste['Signature - Poids'] = "[color=green][b]Bonjour Ljd {Nom du Joueur}[/b], \n\nMon scanner a détecté que votre bannière ne respectait pas les règles de la censure au niveau de la taille. En effet, selon mon scanner, votre bannière aurait un poids total de {Poids de la bannière} alors que la limite autorisée est de 200 Ko. \n\nJe vous invite à régler cette situation dans les plus brefs délais.\n\n[i]"+ Censeur +"[/i][/color]";
	Liste['Signature - Taille'] = "[color=green][b]Bonjour Ljd {Nom du Joueur}[/b], \n\nMon scanner a détecté que votre bannière ne respectait pas les règles de la censure au niveau des dimensions. En effet, selon mon scanner, votre bannière aurait une hauteur de {hauteur}px et une largeur de {largeur}px alors que la limite autorisée est de 200px en hauteur et 600px en largeur.\n\nJe vous invite à régler cette situation dans les plus brefs délais.\n\n[i]"+ Censeur +"[/i][/color]";

	// === FIN DEFINITION ====

	for (clef in Liste) {
        options += '<option class="genmed">' + clef + '</option>';
    }
    
    DOM.innerHTML += " <span class=\"genmed\">Censure : <select id=\"OrandinJSCensure\">" + options + "</select></span>";

    var ListeCensure = document.getElementById('OrandinJSCensure');
    
    
    function JSCensure(){
    	i = ListeCensure.selectedIndex;
    	if(i) {
    		document.querySelector("textarea").innerHTML += Liste[document.getElementById('OrandinJSCensure').options[i].value];
    	}
    	ListeCensure.selectedIndex = 0;
    } 
    ListeCensure.onchange=JSCensure;
}
