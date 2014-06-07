// ==UserScript==
// @version	       7.2
// @name            Avertisseur Ticket (Clodogame Paris & Marseille)
// @namespace     lkaiman
// @description   Avertisseur de ticket au prix souhaité. Paramétrage utilisateur. Exécution toute les 20s sans rechargement de la page. Systéme de MAJ automatic. Agrandir Zone de text et ajout de bouton bbcode (BP de couleur). Liens de redirection retirés. Réhausse du corp du site.
// @maj       		Agrandissement sur la largeur du profil de tchat
// @include         http://*.clodogame.fr/*
// @exclude        http://board.clodogame.fr*
// @exclude        http://*.clodogame.fr/*change_please/*
//@exclude		   http://*.marseille.clodogame.fr/
//@exclude		   http://*.clodogame.fr/*fightlog/
// @updateURL	https://userscripts.org/scripts/source/75788.meta.js
// @downloadURL	https://userscripts.org/scripts/source/75788.user.js
// ==/UserScript==


/*
	MAJ le: 20 juillet 2012 20H
	Explication:
	 *- Pour Clodogame Paris et Marseille
	 *- Paramétrage par l'utilisateur
	 -- Nombre de ticket minimum à avoir récolté
	 -- Prix minimum à avoir pour vendre (39ct par exemple)
	 -- Nombre de jour de sauvegarde de ces paramétres
	 *- Enregistrement de ces paramétres dans greasemonkey en utilisant le lien Marseille ou Paris et le Pseudo du joueur
	 *- Affichage d'icone avec liens vers la vente de tickets
	 -- Plusieurs icone indiquant un prix interessant ou pas
	 *- boite de dialogue d'avertissement du prix voulu (ou supérieur) avce indication du prix, du nb de ticket et du gain
	 -- ACCEPTER = redirection vers la vente
	 -- REFUSER = Sauvegarde dans greasemonkey jusqu'à la prochaine remontée du prix
	 *- Exécution du script toute les 20s sans recharger la page, permettatn de ne pas louper le prix fort
	 *- Shunter le miracle économique pour l'avertissement du prix
	 *- Script en veille (même pas d'icone) si 0 tickets
	 *- Fonctionnalité d'Auto-Update
	 *- Détection du miracle éco
	 *-Ajouter un menu paramétre dans greasemonkey au lieu de redemander tous les x jours
	 *- Fonction pour ajouter/supprimer/modifier des éléments du code source
	 -- Agrandi les textarea de la zone admin clodogame
	 *- Modifier le prix du ticket toute les 20s dans le jeu (pour éviter les confusion et que ce soit plus propre)
	 
	 *- Enléve les liens de redirection clodogame
	 *- Agrandi les zones de saisies clodo et admin
	 *- Ajoute les touches bbcode sous les zones ou elles n'existent pas
	 *- Remonte le corps du site un peu plus haut
	 *- Touche BBCode pour le profil perso et ajout du BP de couleur
	 
	 (plus d'idées ^^)
	 ~~~~~~ = A VENIR
*/
	
	
	
	
// ***********************************************************************************************
// Fonction Prototype
// ***********************************************************************************************
String.prototype.trim = function()
{	// Supprime les espaces d'une chaîne (début et fin)
	return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

String.prototype.isset = function()
{	// test une variable
	return typeof(Cookies[this])!='undefined';
}



// ***********************************************************************************************
// Fonction GreaseMonkey pour le DOM
// ***********************************************************************************************

function removeElement(ElementXpath)
{	// Removes all occurences of elements whose XPath is provided from the document.
	//
	// Example: Remove all tables which use the CSS class 'toto':
	//          removeElement("//table[@class='toto']");
	var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i<alltags.snapshotLength; i++)
	{
			element = alltags.snapshotItem(i);
			element.parentNode.removeChild(element);  // Remove this element from its parent.
	}
}  

function removeAttributeOfElement(attributeName,ElementXpath)
{	// Removes an attribute from all occurences of elements whose XPath is provided.
	// (All occurences of this elements are processed.)
	//
	// Example: Remove the bgcolor of all <table>:
	//          removeAttributeOfElement('bgcolor',"//table[@bgcolor]")
	//          Remove the fixed with of all tables or cells::
	//          removeAttributeOfElement('width',"//table[@width]|//td[@width]")
	var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i<alltags.snapshotLength; i++)
			alltags.snapshotItem(i).removeAttribute(attributeName);    
}

function setAttributeOfElement(attributeName,attributeValue,ElementXpath)
{	// Set an attribute from all occurences of elements to a specified value.
	// The previous value of this attribute is discarded.
	// (All occurences of this elements are processed.)
	//
	// Example: Set with to 80 columns on all texteareas:
	//          setAttributeOfElement('cols',80,"//textarea")
	var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i<alltags.snapshotLength; i++)
			alltags.snapshotItem(i).setAttribute(attributeName, attributeValue)
}

function injectCSS(cssdata)
{	// Inject your own CSS in the page.
	// Example: Do not underline link:
	//          injectCSS("a{text-decoration: none;}")
	head = document.getElementsByTagName("head")[0];
	style = document.createElement("style");
	style.setAttribute("type", 'text/css');
	style.innerHTML = cssdata;
	head.appendChild(style);
}

function injectSCRIPT(scriptdata)
{	// Inject your own SCRIPT in the page.
	// Example: Do not underline link:
	//          injectSCRIPT('alert("hello world!")')
	head = document.getElementsByTagName("head")[0];
	style = document.createElement("script");
	style.setAttribute("language", 'javascript');
	style.innerHTML = scriptdata;
	head.appendChild(style);
}




// ***********************************************************************************************
// Fonction pour bbcode
// ***********************************************************************************************
function initBBCODE(f_name, node)
{
	var DivBBCODE = document.createElement("div");
	if (!f_name) f_name='none';
	
	var Button1 = DivBBCODE.appendChild(document.createElement('input'));
	Button1.setAttribute('type', "button");
	Button1.setAttribute('name', "b_Bold");
	Button1.setAttribute('id', "b_Bold");
	Button1.setAttribute('value', "b");
	Button1.setAttribute('style', "font-weight:bold");
	Button1.setAttribute('onclick', "DoAddTagsBBCODE('"+ f_name +"','[b]','[/b]')");
	
	var Button2 = DivBBCODE.appendChild(document.createElement('input'));
	Button2.setAttribute('type', "button");
	Button2.setAttribute('name', "b_Italic");
	Button2.setAttribute('id', "b_Italic");
	Button2.setAttribute('value', "i");
	Button2.setAttribute('style', "font-weight:italic");
	Button2.setAttribute('onclick', "DoAddTagsBBCODE('"+ f_name +"','[i]','[/i]')");
	
	var Button3 = DivBBCODE.appendChild(document.createElement('input'));
	Button3.setAttribute('type', "button");
	Button3.setAttribute('name', "b_Underlined");
	Button3.setAttribute('id', "b_Underlined");
	Button3.setAttribute('value', "u");
	Button3.setAttribute('style', "text-decoration:underline");
	Button3.setAttribute('onclick', "DoAddTagsBBCODE('"+ f_name +"','[u]','[/u]')");
	
	var Button4 = DivBBCODE.appendChild(document.createElement('input'));
	Button4.setAttribute('type', "button");
	Button4.setAttribute('name', "b_Quote");
	Button4.setAttribute('id', "b_Quote");
	Button4.setAttribute('value', "Citation");
	Button4.setAttribute('onclick', "DoAddTagsBBCODE('"+ f_name +"','[quote]','[/quote]')");
	
	var Button5 = DivBBCODE.appendChild(document.createElement('input'));
	Button5.setAttribute('type', "button");
	Button5.setAttribute('name', "b_Url");
	Button5.setAttribute('id', "b_Url");
	Button5.setAttribute('value', "Liens");
	Button5.setAttribute('onclick', "DoUrlBBCODE('"+ f_name +"')");
	
	var Button6 = DivBBCODE.appendChild(document.createElement('input'));
	Button6.setAttribute('type', "button");
	Button6.setAttribute('name', "b_Img");
	Button6.setAttribute('id', "b_Img");
	Button6.setAttribute('value', "Image");
	Button6.setAttribute('onclick', "DoImageBBCODE('"+ f_name +"')");
	
	// var Button7 = DivBBCODE.appendChild(document.createElement('input'));
	// Button7.setAttribute('type', "button");
	// Button7.setAttribute('name', "b_List");
	// Button7.setAttribute('id', "b_List");
	// Button7.setAttribute('value', "Liste");
	// Button7.setAttribute('onclick', "DoListBBCODE('"+ f_name +"','[list]','[/list]')");
	
	var Button8 = DivBBCODE.appendChild(document.createElement('input'));
	Button8.setAttribute('type', "button");
	Button8.setAttribute('name', "b_Marquee");
	Button8.setAttribute('id', "b_Marquee");
	Button8.setAttribute('value', "Flux de texte");
	Button8.setAttribute('onclick', "DoAddTagsBBCODE('"+ f_name +"','[marquee]','[/marquee]')");
	
	var Button9 = DivBBCODE.appendChild(document.createElement('input'));
	Button9.setAttribute('type', "button");
	Button9.setAttribute('name', "b_Center");
	Button9.setAttribute('id', "b_Center");
	Button9.setAttribute('value', "Centrer");
	Button9.setAttribute('onclick', "DoAddTagsBBCODE('"+ f_name +"','[center]','[/center]')");
	
	var Button10 = DivBBCODE.appendChild(document.createElement('select'));
	Button10.setAttribute('style', "color:white;background-color:#54514D;");
	// http://www.computerhope.com/htmcolor.htm
	var tab1 = new Array("red"  ,"Orange","green","#00FF00"   ,"#808000"   ,"#0000FF","#0000A0"   ,"#FF0080","#800080"   ,"yellow");
	var tab2 = new Array("Rouge","Orange","Vert" ,"Vert Clair","Vert Forêt","Bleu"   ,"Bleu Foncé","Rose"   ,"Rose Foncé","Jaune" );
	for( var i=0 ; i<tab1.length ; i++)
	{	var Button10_0;
		Button10_0 = Button10.appendChild(document.createElement('option'));
		Button10_0.setAttribute('style', "color:"+tab1[i]+";background-color:#3A3A3A;");
		Button10_0.setAttribute('onclick', "DoAddTagsBBCODE('"+ f_name +"','[color="+tab1[i]+"]','[/color]')");
		Button10_0.appendChild(document.createTextNode(tab2[i]));
	}
	
	node.appendChild(DivBBCODE);
	
	InjectScriptBBCODE();
} 

function InjectScriptBBCODE()
{
	var func1 = 'function DoImageBBCODE(f_name)';
	func1+="{	if (f_name!='none') var textarea = document.getElementById(f_name);";
	func1+="	else var textarea = document.getElementsByTagName('textarea')[0];";
	func1+="	var url = prompt(\"Lien de l'image\",\'http://\');";
	func1+="	var scrollTop = textarea.scrollTop;";
	func1+="	var scrollLeft = textarea.scrollLeft;";
	func1+="	if (document.selection)";
	func1+="	{	textarea.focus();";
	func1+="		var sel  = document.selection.createRange();";
	func1+="		sel.text = '[img]'+url+'[/img]';";
	func1+="	} else {	";
	func1+="		var len   = textarea.value.length;";
	func1+="		var start = textarea.selectionStart;";
	func1+="		var end   = textarea.selectionEnd;";
	func1+="		var sel   = textarea.value.substring(start, end);";
	func1+="		var rep   = '[img]'+url+'[/img]';";
	func1+="		textarea.value = textarea.value.substring(0, start) + rep + textarea.value.substring(end, len);";
	func1+="		textarea.scrollTop = scrollTop;";
	func1+="		textarea.scrollLeft = scrollLeft;";
	func1+="	}";
	func1+="}";

	var func2= "function DoUrlBBCODE(f_name)";
	func2+= "{	if (f_name!='none') var textarea = document.getElementById(f_name);";
	func2+= "	else var textarea = document.getElementsByTagName(\'textarea\')[0];";
	func2+= "	var url = prompt(\"Entrer l'URL\",'http://');";
	func2+= "	var scrollTop = textarea.scrollTop;";
	func2+= "	var scrollLeft = textarea.scrollLeft;";
	func2+= "	if (document.selection)";
	func2+= "	{	textarea.focus();";
	func2+= "		var sel = document.selection.createRange();";
	func2+= "		if(sel.text==\"\") sel.text='[url]'+url+'[/url]';";
	func2+= "								else sel.text='[url='+url+']'+sel.text+'[/url]';";
	func2+= "	} else {";
	func2+= "		var len = textarea.value.length;";
	func2+= "		var start = textarea.selectionStart;";
	func2+= "		var end = textarea.selectionEnd;";
	func2+= "		var sel = textarea.value.substring(start, end);";
	func2+= "		if(sel==\"\") var rep = '[url]'+url+'[/url]';";
	func2+= "					 else var rep = '[url='+url+']'+sel+'[/url]';";
	func2+= "		textarea.value = textarea.value.substring(0, start) + rep + textarea.value.substring(end, len);";
	func2+= "		textarea.scrollTop = scrollTop;";
	func2+= "		textarea.scrollLeft = scrollLeft;";
	func2+= "	}";
	func2+= "}";

	var func3= "function DoAddTagsBBCODE(f_name, tag1, tag2)";
	func3+= "{	if (f_name!='none') var textarea = document.getElementById(f_name);";
	func3+= "	else var textarea = document.getElementsByTagName('textarea')[0];";
	func3+= "	if (document.selection)";
	func3+= "	{ textarea.focus();";
	func3+= "		var sel = document.selection.createRange();";
	func3+= "		sel.text = tag1+sel.text+tag2;";
	func3+= "	} else {";
	func3+= "		var len = textarea.value.length;";
	func3+= "		var start = textarea.selectionStart;";
	func3+= "		var end = textarea.selectionEnd;";
	func3+= "		var scrollTop = textarea.scrollTop;";
	func3+= "		var scrollLeft = textarea.scrollLeft;";
	func3+= "		var sel = textarea.value.substring(start, end);";
	func3+= "		var rep = tag1 + sel + tag2;";
	func3+= "		textarea.value = textarea.value.substring(0, start) + rep + textarea.value.substring(end, len);";
	func3+= "		textarea.scrollTop = scrollTop;";
	func3+= "		textarea.scrollLeft = scrollLeft;";
	func3+= "	}";
	func3+= "}";

	var func4= "function DoListBBCODE(f_name, tag1, tag2)";
	func4+= "{	if (f_name!='none') var textarea = document.getElementById(f_name);";
	func4+= "	else var textarea = document.getElementsByTagName('textarea')[0];";
	func4+= "	if (document.selection)";
	func4+= "	{	textarea.focus();";
	func4+= "		var sel = document.selection.createRange();";
	func4+= "		var list = sel.text.split('\n');";
	func4+= "		for(i=0;i<list.length;i++)";
	func4+= "			list[i]='[*]'+list[i];";
	func4+= "		sel.text=tag1 + '\n' + list.join(\"\n\") + '\n' + tag2;";
	func4+= "	} else {";
	func4+= "		var len = textarea.value.length, start = textarea.selectionStart, end = textarea.selectionEnd;";
	func4+= "		var i, scrollTop = textarea.scrollTop, scrollLeft = textarea.scrollLeft;";
	func4+= "		var sel = textarea.value.substring(start, end);";
	func4+= "		var list = sel.split('\n');";
	func4+= "		for(i=0;i<list.length;i++)";
	func4+= "			list[i]='[*]'+list[i];";
	func4+= "		var rep = tag1 + '\n' + list.join(\"\n\") + '\n' + tag2;";
	func4+= "		textarea.value = textarea.value.substring(0, start) + rep + textarea.value.substring(end, len);";
	func4+= "		textarea.scrollTop = scrollTop;";
	func4+= "		textarea.scrollLeft = scrollLeft;";
	func4+= "	}";
	func4+= "}";
	
	injectSCRIPT(func1);
	injectSCRIPT(func2);
	injectSCRIPT(func3);
	//injectSCRIPT(func4);
}





// ***********************************************************************************************
// Crée le noeud vide que le script utilisera pour l'icone
// ***********************************************************************************************
function CreateNodeEmpty(document)
{
	var table = document.getElementById('topmenu');
	var TicketLI = document.createElement('li');
	TicketLI.setAttribute('id', 'TicketIcon');
	table.getElementsByTagName('ul')[0].appendChild(TicketLI);
}

// ***********************************************************************************************
// Récupére l'adresse clodogame Marseille ou Paris
// ***********************************************************************************************
function RecupServerUrl(url)
{
	if (url.indexOf("www.clodogame.fr")>=0)
	{	var FIGHT_URL = 'http://www.clodogame.fr';
		var LOCAL_URL = 'paris';
	}
	else if (url.indexOf("marseille.clodogame")>=0)
	{	var FIGHT_URL = 'http://marseille.clodogame.fr';
		var LOCAL_URL = 'marseille';
	}
	else 
	{	var FIGHT_URL = 0;
		var LOCAL_URL = 'local';
	}
	
	// Return double variable
	var RETURN = new Array();
		RETURN[0] = FIGHT_URL;
		RETURN[1] = LOCAL_URL;
	return RETURN;
}

// ***********************************************************************************************
// Crée une date + X jour
// ***********************************************************************************************
function DatePlusXJr(jr)
{	  					
	var dateFutur = new Date();
	dateFutur.setTime(dateFutur.getTime()+(jr*24*60*60*1000));
	return dateFutur.toGMTString()					
}

// ***********************************************************************************************
// Supprime les caractéres interdit (tous sauf les lettres)
// ***********************************************************************************************
function ClearString(string)
{
	string.trim();
	var reg = /\W|_/gi;;
	if(reg.test(string))
		return string.replace(reg,'');
	else
		return string;
}


// **********************************************************************************
// Fonction qui récupére une infos sur le site
// **********************************************************************************
function GetPriceOfTickets(content, MiracleEco) 
{ // Le prix du tickets actuel
	try {
		if( !MiracleEco ) // Si pas miracle éco
		{
			var text1 = content.split('Prix :')[1];
			var text2 = text1.split('&euro;')[0];
			text2.trim();

			var reg = /.*(\d{2}).*/;
			ct = text2.replace(reg,'$1');
			
			return ct.trim();
			
		} else return 40; // en cas de période de miracle éco		
	}
	catch(err) {
		GM_log("Impossible de déterminer le prix du tickets: " + err);
	}
}

function GetNumberOfTickets(content) 
{ // Le nombre de tickets récoltés
	try {
		var text1 = content.split('<td align="left" width="250">')[1];
		var text2 = text1.split('<font id="wirkung">')[0];
		text2.trim();

		var text3 = text2.split('>')[1];
		var text4 = text3.split('Tickets de métro.')[0];
	
		return text4.trim();
	}
	catch(err) {
		GM_log("Impossible de déterminer le nombre du tickets: " + err);
	}
}

function GetNameUser(content) 
{ // Le pseudo du joueur (pour créer les variables greasemonkey) (permet les doubles comptes)
	try {
		var text1 = content.split('title="Ton profil d\'utilisateur">')[1];
		var text2 = text1.split('</a></h2>')[0];
		text2.trim();
		return ClearString(text2);
	}
	catch(err) {
		GM_log("Impossible de déterminer le nom du joueur: " + err);
	}
}

function GetMiracleEco(content) 
{	// Vérification de période de miracle eco
	try {
		var reg = /.*Miracle .{1}conomique est actif.*/gi;
		return reg.test(content);
	}
	catch(err) {
		GM_log("Impossible de déterminer le miracle eco: " + err);
	}
}

// **********************************************************************************
// Fonction récupére ou propose les paramétre du script à l'utilisateur
// **********************************************************************************
function Param(TicketMarseille, sec)
{
	var  nameScript = 'Avertisseur de tickets';
	var  SprixGet, Sprix = 39;
	var  SnbGet,   Snb = 100;
	var  Sparam;
	var test = false;	
	
	SprixGet = GM_getValue(TicketMarseille+'-Prix','none');
	SnbGet   = GM_getValue(TicketMarseille+'-NbTicket','none');
	Sparam   = GM_getValue(TicketMarseille+'-Param','true');
		
	if( SprixGet!='none' && SnbGet!='none')
	{
		Sprix = SprixGet;
		Snb   = SnbGet;
	
		if( isNaN(Sprix) || Sprix<30 || Sprix>39   ) test = true;
		if( isNaN(Snb)   || Snb<1    || Snb>100000 ) test = true;
	}
	
	if( Sparam=='true' || test==true || SprixGet=='none' || SnbGet=='none')
	{
		if(confirm('Réglage des paramétres. Vous devez saisir:\n - Le prix désiré\n - Le nb de tickets à vendre.\n\nAnnuler pour donner les valeurs par défaut ('+Sprix+'ct - '+Snb+' tickets)'))// - '+Sjour+' jours)'))
		{
			if(Sprix = prompt("A combien vous voulez vendre ?\n(entre 30 et 39ct)", Sprix))
				Snb = prompt("Combien de tickets minimum voulez-vous récolter\navant de vendre ?\n(entre 1 et 100.000)", Snb);
		}
		
		GM_setValue(TicketMarseille+'-Param', 'false');
		
		alert('Paramétres enregistrés.\nSi vous voulez modifier ces paramétres, vous pouvez aller dans:\n\GREASEMONKEY / Commandes De Script Utilisateur :\n - Edit Param: '+nameScript+' ('+Sprix+'ct & '+Snb+'tckt min)');
		
		if( isNaN(Sprix) || Sprix<30 || Sprix>39   ) Sprix = 39;
		if( isNaN(Snb)   || Snb<1    || Snb>100000 ) Snb   = 100;
		
		GM_setValue(TicketMarseille+'-Prix', Sprix);
		GM_setValue(TicketMarseille+'-NbTicket', Snb);
		
	}
		
	GM_registerMenuCommand('Edit Param: '+nameScript+' ('+Sprix+'ct & '+Snb+'tckt min)', function(){
			GM_setValue(TicketMarseille+'-Param', 'true');
			alert('Dans moins de '+sec+'s, le programme : \n - "'+nameScript+'"\n\nse rechargera et vous proposera de saisir vos nouveaux paramétres.');
		});
	
	//Valeur de retour
	var RETURN = new Array();
		RETURN[0] = Sprix;
		RETURN[1] = Snb;
	return RETURN;
}

// **********************************************************************************
// Fonction qui cré le lien avec l'image ou seulement l'image en fontion du prix
// **********************************************************************************
function CreateImgLink( PrixTicketUser, NbTicketUser, total, ICON_TICKETS, TicketIcon, ICON_WIDTH )
{
	var newTextNode = document.createElement("p");

	// Création du lien dans un paragraphe
	if(PrixTicketUser > 24)
	{
		var newlink = newTextNode.appendChild(document.createElement('a'));
		newlink.setAttribute('href', '/stock/bottle/');
		newlink.setAttribute('style', 'margin-left:5px');
		newlink.setAttribute('title', PrixTicketUser+'ct x '+NbTicketUser+' tickets = '+total+' euros');
	}
	
	// Création du l'image
	if(PrixTicketUser > 24)
		var newimg = newlink.appendChild(document.createElement('img'));
	else {
		var newimg = newTextNode.appendChild(document.createElement('img'));
		newimg.setAttribute('title', PrixTicketUser+'ct x '+NbTicketUser+' tickets = '+total+' euros');
	}
	newimg.setAttribute('src', ICON_TICKETS[TicketIcon]);
	newimg.setAttribute('width', ICON_WIDTH);
	newimg.setAttribute('height', ICON_WIDTH);
	newimg.setAttribute('border', '0');
	
	return newTextNode;
}


function ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid) {
	if (imglink != '') {
		var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
		newlink.setAttribute('href', imglink);
		if (imgid != "") {
			newlink.setAttribute('id', imgid);
		}
		var newimg = newlink.appendChild(document.createElement('img'));

	} else {

		var newimg = document.getElementById("wrap").appendChild(document.createElement('img'));
	}

	newimg.setAttribute('src', imgsource);
	newimg.setAttribute('border', '0');
	if (imgwidth != '') {
		newimg.setAttribute('width', imgwidth);
	}
	if (imgheight != '') {
		newimg.setAttribute('height', imgheight);
	}
	newimg.setAttribute('title', imgtitle);
	newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}

// **********************************************************************************
// Fonction qui averti l'utilisateur en fonction des paramétres, du prix et des tickets récoltés
// **********************************************************************************
function Avertissement(TicketMarseille, PrixTicketUser, Sprix, NbTicketUser, Snb, total, FIGHT_URL, MiracleEco)
{
	if( MiracleEco==false ) // pas d'alerte en période miracle éco
	{
		var shunt = GM_getValue(TicketMarseille+'-Shunt','false');
		
		// Avertissement si prix interessant (et pas Miracle Economique)
		if(PrixTicketUser>=Sprix && NbTicketUser>=Snb && shunt=='false')
		{	if( location.toString() != FIGHT_URL+'/stock/bottle/' && location.toString() != FIGHT_URL+'/stock/bottle/sell/')
			{	if(confirm('Le prix du ticket est à ' +PrixTicketUser+ 'ct. Veux-tu vendre '+NbTicketUser+' tickets pour gagner '+total+' euros ?'))
					window.location = FIGHT_URL+'/stock/bottle/';
				else
					GM_setValue(TicketMarseille+'-Shunt','true');
			}
		}
		
		if(shunt=='true' && PrixTicketUser<Sprix)
			GM_setValue(TicketMarseille+'-Shunt','false');
	}
}



// ********************************************************************************************************************
// Fonction de tickets, prix - image et rechargement
// ********************************************************************************************************************
function TicketMain()
{
	// VARIABLES

	var sec = 20; // Nombre de secondes avant rechargement du script
	var ICON_WIDTH = '35';

	var ICON_TICKETS = new Array();	
		ICON_TICKETS[0]  = 'http://s2.noelshack.com/uploads/images/9807501221793_0.png'; 				//   <
		ICON_TICKETS[1]  = 'http://s2.noelshack.com/uploads/images/19525355359191_ticket.png'; 	// tickets
		ICON_TICKETS[35] = 'http://s2.noelshack.com/uploads/images/13632154728192_35.png'; 			// 35ct
		ICON_TICKETS[36] = 'http://s2.noelshack.com/uploads/images/13336544232198_36.png';  		// 36ct
		ICON_TICKETS[37] = 'http://s2.noelshack.com/uploads/images/17881691642001_37.png'; 			// 37ct
		ICON_TICKETS[38] = 'http://s2.noelshack.com/uploads/images/14135092359399_38.png'; 			// 38ct
		ICON_TICKETS[39] = 'http://s2.noelshack.com/uploads/images/2440126882908_39.png'; 			// 39ct
		ICON_TICKETS[40] = 'http://s2.noelshack.com/uploads/images/16139374511139_40.png'; 			// 40ct
		
	// Selection Url Paris ou Marseille
	var TabUrl = RecupServerUrl( document.location.href );
	var FIGHT_URL = TabUrl[0];
	var LOCAL_URL = TabUrl[1];		
	//alert('FIGHT_URL='+FIGHT_URL+' - LOCAL_URL='+LOCAL_URL);
		
	// Supression du noeud icone à chaque rafraichissement
	var node = document.getElementById('TicketIcon');
	var parent = node.parentNode;
	parent.removeChild(node);

	// Si Paris ou Marseille
	if( FIGHT_URL != 0 )
	{		
		// Selection et création de l'inscrustation de l'icone
		var table = document.getElementById('topmenu');
		
		var TicketLI = document.createElement('li');
		TicketLI.setAttribute('id', 'TicketIcon');
		
		table.getElementsByTagName('ul')[0].appendChild(TicketLI);
				
		GM_xmlhttpRequest({ method: 'GET', url: FIGHT_URL+'/stock/bottle/', onload: function(responseDetails)
			{
				//recupération du code source
				var content = responseDetails.responseText;
					
				//Récupére infos user		
				var MiracleEco     = GetMiracleEco(content); // Cherche si le miracle éco est lancé
				var PrixTicketUser = GetPriceOfTickets(content, MiracleEco);  // Cherche le prix des tickets dans la page
				var NbTicketUser   = GetNumberOfTickets(content); //  Cherche le nb de tickets récoltés		
				var NameUserUser   = GetNameUser(content);        // Cherche le pseudo du user poru le cookie	
				//alert('MiracleEco='+MiracleEco+' - PrixTicketUser='+PrixTicketUser+' - NbTicketUser='+NbTicketUser+' - NameUserUser='+NameUserUser);
				
				var TabParam = Param(LOCAL_URL+'-'+NameUserUser, sec); // Sélectionne paramétre enregistrés ou demande à l'utilisateur
				var Sprix = TabParam[0];
				var Snb = TabParam[1];
				
				
				
				// Modifie le prix du ticket en temps réel
				//var ModifPrixTicket = document.getElementsByClassName("icon bottle");
				//alert(ModifPrixTicket[0]);
				//ModifPrixTicket[0].nodeValue(PrixTicketUser+'ct');
				
				if(NbTicketUser>0 )
				{
					// Calcul du gain à gagner
					var total = Math.round(  ( NbTicketUser * (PrixTicketUser/100) )  *100)/100;
					
					// Affectation de l'image suivant le prix
					
					if (PrixTicketUser > 34)
						var TicketIcon = PrixTicketUser; // Prix haut
					else if (PrixTicketUser < 30)
						var TicketIcon = 1; // Pris petit
					else
						var TicketIcon = 0; // Prix moyen
		
					// Crée le lien avec l'image en fonction du prix
					
					var titre = PrixTicketUser+'ct x '+NbTicketUser+' tickets = '+total+' euros';
				
				//ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid)
					ShowImg('/stock/bottle/', ICON_TICKETS[TicketIcon], titre, ICON_WIDTH, ICON_WIDTH, '886', '59', '101');
			
					/* 								 //CreateImgLink( PrixTicketUser, NbTicketUser, total, ICON_TICKETS, TicketIcon, ICON_WIDTH )
					var newTextNode = CreateImgLink( PrixTicketUser, NbTicketUser, total, ICON_TICKETS, TicketIcon, ICON_WIDTH );

					//// Affichage du lien avec image dans l'architecture HTML
					//TicketLI.innerHTML += newTextNode.innerHTML;
					
					// Averti l'utilisateur de vendre ou pas
					Avertissement(LOCAL_URL+'-'+NameUserUser, PrixTicketUser, Sprix, NbTicketUser, Snb, total, FIGHT_URL, MiracleEco);
					 */
				}
				
				
			}
		});
		
		// Boucle toutes les 20s
		setTimeout(TicketMain,sec*1000);
		
	}
	
} // enf function TicketMain







	
	
		

// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *************** 
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************

function Modif_HTML_perso()
{
	//confirm('Modif_HTML_perso()');
	// ***********************************************************************************************
	// Modifier la taille des TextArea existants
	// ***********************************************************************************************
	if (document.location.href.indexOf("clodogame")>=0)
	{	// réhaussage de l'affichage (CG paris/marseille)
		document.getElementById("tabnav").setAttribute("style", "top:-127px");
		document.getElementById("content").setAttribute("style", "top:-127px");
		document.getElementById("footer").setAttribute("style", "margin-top:-127px");
	}

	if (document.location.href.indexOf("/gang/admin/")>=0)
	{	// Augmenter la zone de saisie : clodonew
		setAttributeOfElement('rows','30',"//textarea[@name='f_motd']");
		setAttributeOfElement('cols','150',"//textarea[@name='f_motd']");
		// Augmenter la zone de saisie : profil de bande
		setAttributeOfElement('cols','150',"//textarea[@name='f_desc']");
		setAttributeOfElement('rows','20',"//textarea[@name='f_desc']");
		// Augmenter la zone de saisie : message de bande
		setAttributeOfElement('cols','140',"//textarea[@name='f_text']");
		setAttributeOfElement('rows','20',"//textarea[@name='f_text']");
	} else
	if (document.location.href.indexOf("/gang/")>=0)
	{	// Augmenter la zone de saisie : message de tchat
		removeAttributeOfElement('rows',"//textarea[@name='f_text']")
		removeAttributeOfElement('style',"//textarea[@name='f_text']")				
		setAttributeOfElement('cols','140',"//textarea[@name='f_text']");
		setAttributeOfElement('rows','10',"//textarea[@name='f_text']");
		//Augmenter la largeur du clodonews
		setAttributeOfElement('name','clodonews',"//div[@style='width:490px; overflow:hidden; word-wrap:break-word;']");
		removeAttributeOfElement('style',"//div[@name='clodonews']")
		setAttributeOfElement('style','width:810px;',"//div[@name='clodonews']");		
		//Augmenter la largeur du tchat
		setAttributeOfElement('name','tchatclodo',"//div[@style='width:505px;']");
		removeAttributeOfElement('style',"//div[@name='tchatclodo']")
		setAttributeOfElement('style','width:805px;',"//div[@name='tchatclodo']");	
		//Augmenter la largeur des numéro de page tchat
		//<div class="pagebar" style="width:500px; background-color:#181818;padding:2px;">
		setAttributeOfElement('name','tchatpage',"//div[@style='width:500px; background-color:#181818;padding:2px;']");
		removeAttributeOfElement('style',"//div[@name='tchatpage']")
		setAttributeOfElement('style','width:805px;',"//div[@name='tchatpage']");
	} else
	if (document.location.href.indexOf("/gang/forum/viewthread")>=0)
	{	// Augmenter la zone de saisie : ajouter message sur forum
		setAttributeOfElement('cols','140',"//textarea[@name='f_text']");
		setAttributeOfElement('rows','30',"//textarea[@name='f_text']");
	} else
	if (document.location.href.indexOf("/gang/forum/editpost/")>=0)
	{	// Augmenter la zone de saisie : ajouter message sur forum
		setAttributeOfElement('cols','140',"//textarea[@name='f_text']");
		setAttributeOfElement('rows','40',"//textarea[@name='f_text']");
	} else
	if (document.location.href.indexOf("settings/")>=0)
	{	// Augmenter la zone de saisie :  profil perso
		setAttributeOfElement('cols','80',"//textarea[@name='description']");
		setAttributeOfElement('rows','30',"//textarea[@name='description']");
	}
		
	// ***********************************************************************************************
	// Modifier les TextArea existants pour ajouter le bbcode
	// ***********************************************************************************************
	if (document.location.href.indexOf("/messages/write/")>=0)
	{	// Ecrire MP
		var a = document.getElementById('f_text');
		var b = a.parentNode;
		initBBCODE("f_text", b);
	}
	if (document.location.href.indexOf("/gang/admin/")>=0)
	{	// Modif parole du jour
		var a = document.getElementById('f_motd');
		var b = a.parentNode;
		initBBCODE("f_motd", b);
		// Modif Description de profil de bande
		var a = document.getElementById('f_desc');
		var b = a.parentNode;
		initBBCODE("f_desc", b);
		// Message de bande
		var a = document.getElementById('f_text');
		var b = a.parentNode;
		initBBCODE("f_text", b);
	} else
	if (document.location.href.indexOf("/gang/forum/editpost/")>=0)
	{	// Editer message forum
		var a = document.getElementById('f_text');
		var b = a.parentNode;
		initBBCODE("f_text", b);
	} else
	if (document.location.href.indexOf("/settings/")>=0)
	{	// Augmenter la zone de saisie : profil perso
		var a = document.getElementsByTagName('textarea')[0];
		var b = a.parentNode;
		initBBCODE(false, b);
	}
}

// ***********************************************************************************************
// Cré un noeud vide pour afficher le ticket
// Lance le script de ticket
// ***********************************************************************************************
CreateNodeEmpty(document);
TicketMain();
Modif_HTML_perso();
setTimeout(Modif_HTML_perso,5000);

// ***********************************************************************************************
// suppression des redirections
// ***********************************************************************************************
var SupprRedirectLink = false;

if (document.location.href.indexOf("/gang/")>=0)
 { SupprRedirectLink = true; }
else if (document.location.href.indexOf("/profil/")>=0)
 { SupprRedirectLink = true; }
	
if (SupprRedirectLink == true)
{	// sauf pour la page /fightlog/ pour poster les combats
	var lnks = document.getElementsByTagName('a');
	for(var i=0;i<=lnks.length;i++)
		lnks[i].setAttribute('href', lnks[i].href.replace(/(http:\/\/[^\/]+\/redirect\/\?site=http)/g, 'http'));
		//http://www.marseille.clodogame.fr/redirect/?site=http://marseille.clodogame.fr/change_please/8171945/
}