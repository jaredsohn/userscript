// ==UserScript==
// @name			OGame - Fast Login
// @namespace		Gollum
// @description		Simplified connection to ogame ! (V. 0.80)
// @include			http://*ogame.*
// @exclude			http://*ogame.*/game/*
// @exclude			http://*board*ogame*
// @require			http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

	//addElm(id_('content'), 'script', {src:'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js'}, '');
	uW = unsafeWindow;
	
	GM_addStyle('#fond, #options {width:100%;height:100%;position:fixed;left:0;top:0;z-index:10001;}');
	GM_addStyle('#fond {opacity:0.8;background-color:#000;} #options {color:transparent;} #centreur {height:100%; vertical-align:middle;}');
	GM_addStyle('#opt_box {vertical-align:middle;text-align:center;width:100%;height:100%;}');
	GM_addStyle('#opt_box #opt {padding:15px;width:350px;vertical-align:middle;text-align:center;background-color:#000;border:1px solid #FFF;}');
	GM_addStyle('#options h3 {color:#FFF;font-size:16px;margin-bottom:25px;} #opt h4 {color:#608db0;margin:10px;font-size:14px;cursor:pointer;}');
	GM_addStyle('.derouleur {display:none;width:100%;} #opt_box #uni {width:150px;background-color:#000;border: 1px solid #FFF;color:#55788f;text-align:center;background-image:none !important;} #options th input {width:150px;}');
	GM_addStyle('#options td[colspan="2"] {color:#55788f;font-size:14px;text-align:center;} #options td {color:#828282;font-size:12px;text-align:left;width:320px;} #options th {color:#828282;font-size:12px;text-align:center;width:100px;} #options th input, #slot_num {background-color:#000;border: 1px solid #FFF;color:#55788f;text-align:center;background-image:none !important;}');
	GM_addStyle('#opt_box #options button, {width:250px;text-align:center;} #slot_num {width:40px;}');
	GM_addStyle('#button {margin-top:5px;} #button_fermer {margin-top:15px;}');

/*** Traductions : ***/
	var Traductions = {
		0 : {
			'fr' : 'Afficher/Masquer le Menu Options',
			'de' : 'Ein/ausblenden Menü Optionen',
			'org' : 'Show/Hide Options Panel',
		},
		1 : {
			'fr' : 'Options',
			'de' : 'Optionen',
			'org' : 'Options',
		},
		2 : {
			'fr' : 'Ajouter/Modifier un slot',
			'de' : 'Hinzufügen/Bearbeiten Slot',
			'org' : 'Add/Change a slot',
		},
		3 : {
			'fr' : 'Univers :',
			'de' : 'Universum:',
			'org' : 'Universe:',
		},
		4 : {
			'fr' : 'Nom du joueur :',
			'de' : 'Name des Spielers:',
			'org' : 'Player Name:',
		},
		5 : {
			'fr' : 'Mot de passe :',
			'de' : 'Passwort:',
			'org' : 'Password:',
		},
		6 : {
			'fr' : 'Slot numéro : ',
			'de' : 'Slot-Nummer: ',
			'org' : 'Slot number: ',
		},
		7 : {
			'fr' : 'Ajouter/Modifier',
			'de' : 'Hinzufügen / Bearbeiten',
			'org' : 'Add / Edit',
		},
		8 : {
			'fr' : 'Autre Option',
			'de' : 'Andere Option',
			'org' : 'Other Option',
		},
		9 : {
			'fr' : 'Diminuer la hauteur de la page :',
			'de' : 'Verringerung der Höhe der Seite:',
			'org' : 'Reduce the height of the page:',
		},
		10 : {
			'fr' : 'Connexion automatique :',
			'de' : 'Auto-Login:',
			'org' : 'Automatic Login:',
		},
		11 : {
			'fr' : 'Enregistrer et fermer',
			'de' : 'Speichern und Schließen:',
			'org' : 'Save and close',
		},
		12 : {
			'fr' : 'Enregistré !',
			'de' : 'Aufgenommen!',
			'org' : 'Saved!',
		},
		13 : {
			'fr' : 'Connecter <player> sur l\'univers <uni> !',
			'de' : 'Verbinden <player> auf <uni> Welt!',
			'org' : 'Connect <player> one the universe <uni>!',
		},
		14 : {
			'fr' : 'Cliquez pour ajouter un Joueur...',
			'de' : 'Klicken Sie hier, um einen Spieler...',
			'org' : 'Click to add a player...',
		},
		15 : {
			'fr' : 'Slot n°',
			'de' : 'Slot Nr.',
			'org' : 'Slot No',
		},
		16 : {
			'fr' : 'Nouvelle version disponible !',
			'de' : 'Neue Version verügbar!',
			'org' : 'A new version is available!',
		},
		17 : {
			'fr' : 'Mettre à jour Fast Login ?',
			'de' : false,
			'org' : 'Download it now?',
		},
		18 : {
			'fr' : 'Votre version : ',
			'de' : false,
			'org' : 'Your version: ',
		},
		19 : {
			'fr' : 'Nouvelle version : ',
			'de' : false,
			'org' : 'New version: ',
		},
	};
	
	url = location.href; tps = url.match(/(http:\/\/([^.]*)\.ogame\.([a-z]{1,3}))\/game/);
	Na = url.match(/ogame.([a-z]{1,3}[\.]?[a-z]{0,3})/)[1];
	Num = {'a' : 101, 'b' : 102, 'c' : 103, 'd' : 104, 'e' : 105, 'f' : 106, 'g' : 107, 'h' : 108, 'i' : 109, 'j' : 110, 'k' : 111, 'l' : 112, 'm' : 113, 'n' : 114, 'o' : 115, 'p' : 116, 'q' : 117, 'r' : 118, 's' : 119, 't' : 120, 'u' : 121, 'v' : 122, 'w' : 123, 'x' : 124, 'y' : 125, 'z' : 126};
/*** Traductions ***/

/*** Version ***/
	function Mise_a_jour(Version, VA) {
		GM_addStyle('#maj:hover {opacity:1;} #maj {opacity:0.3; position:absolute; left:8px; top:40px; width:340px; height:80px; background-color:#000; z-index:10000; border:1px solid #FFF; } #maj table {width:100%;} #maj td {color:#828282; font-size:10px; text-align:center;} #maj th {color:#FFFFFF; text-align:center;} #maj th a {color:#608db0; font-size:14px; font-weight:bold; text-decoration:none;} #maj th a:hover {color:#FFFFFF; text-decoration:underline;} #maj th.b {height:10px;}');
		Code =  '<tr><th>'+Tra(16, Na)+'</th></tr>';
		Code += '<tr><th class="b"></th></tr>';
		Code += '<tr><th><a href="http://userscripts.org/scripts/source/50977.user.js" id="lien_mise_a_jour">'+Tra(17, Na)+'</a></th></tr>';
		Code += '<tr><th class="b"></th></tr>';
		Code += '<tr><td>'+Tra(18, Na)+Version+'</td></tr>';
		Code += '<tr><td>'+Tra(19, Na)+VA+'</td></tr>';
		addElm(addElm(tag_('html')[0], 'div', {id:'maj'}, ''), 'table', {}, Code);
		
		id_('lien_mise_a_jour').addEventListener('click', function() {GM_setValue('Anci', Date_.toString());}, true);
	}
	
	Version = 0.80;
	Date_ = new Date().getTime() / 1000;
	Anci = GM_getValue('Anci', 0);
	
	if ((Date_ - Anci) > 86400*3) {
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://userscripts.org/scripts/show/50977',
			onload: function(responseDetails) {
				var VA = parseFloat(responseDetails.responseText.match(/Simplified connection to ogame ! \(V. ([0-9]*\.[0-9]*)\)/)[1]);
				if (VA > Version) {Mise_a_jour(Version, VA);} else {GM_setValue('Anci', Date_.toString());}
			}
		});
	}
/*** Version ***/

/*** Fonctions : ***/
	function id_(id) {return document.getElementById(id);}
	function class_(n, elm) {if (elm) {return elm.getElementsByClassName(n);} else {return document.getElementsByClassName(n);}}
	function tag_(n, elm) {if (elm) {return elm.getElementsByTagName(n);} else {return document.getElementsByTagName(n);}}
	function Display(elm, d) {
		if (elm.length > 1) {for (i = 0; i < elm.length; i++) {elm[i].style.display = d;}}
		else {elm.style.display = d;}
	}
	function Tra(N, Na) {
		if (Traductions[N][Na]) {
			return Traductions[N][Na];
		} else {
			if (Traductions[N]['org']) {return Traductions[N]['org'];}
			else {return Traductions[N]['fr'];}
		}
	}
	function Titre(Phrase, NJ, uni) {return Phrase.replace('<player>', NJ).replace('<uni>', uni);}
	function Adapter(n, Joueur) {
		if (Joueur) {
			Uni = Joueur.uni.match(/([a-zA-Z0-9]*)\.ogame\./)[1]; if (STI(Uni) == 0) {NUni = Num[Uni[0]]; TUni = Uni.substr(0,1).toUpperCase() + Uni.substr(1,Uni.length).toLowerCase();} else {NUni = STI(Uni); TUni = NUni;}
			Liste[n].innerHTML = '<a title="'+Titre(Tra(13, Na), Joueur.nom, TUni)+'">'+Joueur.nom+'</a>';
			Liste[n].getElementsByTagName('a')[0].setAttribute('onclick', 'Charger("'+Joueur.uni+'", "'+NUni+'", "'+Joueur.nom+'", "'+Joueur.mdp+'");');
		} else {
			Liste[n].innerHTML = '<a title="'+Tra(14, Na)+'">'+Tra(15, Na)+(n+1)+'</a>';
			Liste[n].getElementsByTagName('a')[0].setAttribute('onclick', "document.getElementById('slot_num').options["+n+"].selected = true;");
			Liste[n].getElementsByTagName('a')[0].addEventListener('click', function() {uW.Show_Opt();}, true);	
		}
	}
	function STI(N) {if (N.match(/[0-9]/)) {return parseInt(N.replace(/[^0-9]/g, ''));} else {return 0;}}
	function Insert(where, what, avec, id) {
		var Object = document.createElement(what);
		where.appendChild(Object);
		Object.innerHTML = avec;
		if (id) {Object.id = id;}
	}
	function addElm(that, tag, attr, txt) {
		if (tag.nodeType != 1) {
			var T = document.createElement(tag), a;
			if (attr) {for (a in attr) {T.setAttribute(a, attr[a]);}}
			if (txt != undefined) {T.innerHTML = txt;}
			that.appendChild(T); return T;
		}
	}
	function Save() {
		Fast_Opt.Options.diminuer = id_("Diminuer").checked;
		Fast_Opt.Options.auto = id_("Auto").checked;
		GM_setValue('options_'+Na, uneval(Fast_Opt));
	}
	uW.Show_Opt = function () {
		if (id_('options').style.display != 'none') {if (uW.$()) {uW.$('.options').fadeOut(500);uW.$('#trailer').fadeIn(500);uW.$('#mmonetbar').fadeIn(500);} else {Display(id_('trailer'), 'inline');Display(id_('trailer'), 'inline');Display(class_('options'), 'none');}}
		else {if (uW.$()) {uW.$('#trailer').fadeOut(400);uW.$('#mmonetbar').fadeOut(400);uW.$('.options').fadeIn(500);} else {Display(id_('trailer'), 'none');Display(id_('mmonetbar'), 'none');Display(class_('options'), 'inline');} }
	}
	function Select_(Select, Options) {for (i in Select.options) {if (Select.options[i].value == Options) {Select.options[i].selected = true; return;}}}
	function Options_(Select) {var txt = ''; for (i in Select.options) {txt += '<option value="'+Select.options[i].value+'">'+Select.options[i].innerHTML.replace(/ /g,'').replace(/\./g,'. ')+'</option>\n';} return txt;}
	function OptX(nom, def) {
		act = eval(GM_getValue(nom, uneval(def)));
		for (i in def) {if (act[i] == null) {act[i] = def[i]}}
		GM_setValue(nom, uneval(act));
		return act;
	}
	function Checked(a) {return (a ? 'checked="true"' : '');}
	function IndexOf(Text, Recherche) {if (Text.indexOf(Recherche) > -1) {return true;} else {return false;}}
	
	uW.Charger = function (uni, NUni, NJ, MP) {
		Display(id_('login'), 'inline');
		Select_(id_("serverLogin"), uni); uW.setUniID(NUni); uW.setUniUrl(uni);
		id_("usernameLogin").value = NJ; id_("passwordLogin").value = MP;
		if (Fast_Opt.Options.auto && MP != '') {document.getElementById("loginForm").submit();}
		else {if (MP == '') {id_("passwordLogin").focus();}}
	};
/*** Fonctions ***/

/*** Chargement des Options : ***/
	Def_Fast_Opt = {
		1 : false, 2 : false, 3 : false,
		Options : {diminuer:false, auto:true}
	}
	Fast_Opt = OptX('options_'+Na, Def_Fast_Opt);
	//if (Fast_Opt.Options.diminuer) {GM_addStyle('#content {top: -315px !important;} body {background-position: center -305px !important;}');}
/*** Chargement des Options ***/

/*** Modifications : ***/
	GM_addStyle('#logs {border-bottom:1px solid #131820;display:inline float:left;height:33px;margin:0 0 0 17px;width:440px;} #logs li {float:left;height:33px;width:110px;} #logs li a {color:#5b6a76;display:block;font-size:14px;line-height:33px;text-align:center;text-shadow:-1px -1px 0 #000; cursor:pointer;} #logs li a:hover {color:#91B0C4;}');
	id_('menu').innerHTML = '<ul id="logs"><li></li><li></li><li></li><li></li></ul>';
	Liste = id_('logs').getElementsByTagName('li');
	Adapter(0, Fast_Opt[1]); Adapter(1, Fast_Opt[2]); Adapter(2, Fast_Opt[3]);
	Liste[3].innerHTML = '<a title="'+Tra(0, Na)+'" id="Show_Opt" href="javascript:Show_Opt();">'+Tra(1, Na)+'</a>';
	
	// Ajout du Menu d'Options :
	Code = '<tr><td id="centreur"><center><div id="opt">';
	Code += '<h3>'+Tra(1, Na)+' - Fast Login</h1>';
	Code += '<h4 onclick="$(\'.derouleur\').slideToggle(500);">'+Tra(2, Na)+'</h2>';
	Code += '<table class="derouleur" style="display:inline;">';
	Code += '<tr><td>'+Tra(3, Na)+'</td><th><select id="uni" class="input_universe_select" tabindex="10">'+Options_(id_('serverLogin'))+'</select></th></tr>';
	Code += '<tr><td>'+Tra(4, Na)+'</td><th><input id="nom_joueur" size="15" maxlength="20" type="text" value="" tabindex="11"/></th></tr>';
	Code += '<tr><td>'+Tra(5, Na)+'</td><th><input id="mot_passe" size="15" maxlength="32" type="password" value="" tabindex="12"/></th></tr>';
	Code += '<tr><td>'+Tra(6, Na)+'</td><th><select id="slot_num"><option value="0">1</option><option value="1">2</option><option value="2">3</option></select></th></tr>';
	Code += '<tr><td colspan="2"><button id="button">'+Tra(7, Na)+'</button></td></tr>';
	Code += '</table>';
	Code += '<h4 onclick="$(\'.derouleur\').slideToggle(500);">'+Tra(8, Na)+'</h2>';
	Code += '<table class="derouleur" style="display:none;">';
	//Code += '<tr><td>'+Tra(9, Na)+'</td><th><input '+Checked(Fast_Opt.Options.diminuer)+' id="Diminuer" type="checkbox"/></td></tr>';
	Code += '<tr><td>'+Tra(10, Na)+'</td><th><input '+Checked(Fast_Opt.Options.auto)+' id="Auto" type="checkbox"/></td></tr>';
	Code += '</table>';
	Code += '<button id="button_fermer" onclick="Show_Opt();">'+Tra(11, Na)+'</button>';
	Code += '</div></center></td></tr>';
	
	body = document.getElementsByTagName('body')[0]; Etat = GM_getValue('One_time'+Na, ''); GM_setValue('One_time'+Na, 'none');
	addElm(body, 'div', {id:'fond',style:'display:'+Etat+';',class:'options'}, '')
	addElm(addElm(body, 'div', {id:'options',style:'display:'+Etat+';',class:'options'}, ''), 'table', {id:'opt_box'}, Code);
	
	// Ajout des fonctions :
	//id_('Diminuer').addEventListener('change', function() {Save();}, true);
	id_('Auto').addEventListener('change', function() {Save();}, true);
	
	id_('button').addEventListener('click', function() {
		Fast_Opt[Number(id_('slot_num').value) + 1] = {uni:id_('uni').value, nom:id_('nom_joueur').value, mdp:id_('mot_passe').value}
		GM_setValue('options_'+Na, uneval(Fast_Opt));
		alert(Tra(12, Na));
	}, true);
	
	// Réparation bug :
	id_('loginBtn').addEventListener('click', function() {
		if (id_('login').style.display != 'none') {Display(id_('login'), 'none');} else {Display(id_('login'), 'inline');}
	}, true);
/*** Modifications ***/