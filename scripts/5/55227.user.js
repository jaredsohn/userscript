// ==UserScript==
// @name			Ouadjet Ogame Pack
// @namespace		ouadjetogame
// @version			1.9.7c
// @author			Ouadjet
// @include			http://uni*.ogame.*/game/index.php?page=*
// @exclude			http://uni6.ogame.de/*
// @exclude			http://uni42.ogame.org/*
// @exclude			http://andromeda.ogame.*
// ==/UserScript==

//Initialisation de "seyguai's scripts utilities"

var thisData = {
	namespace: 'ouadjetogamepack', // Nom simplifié. Doit être unique. Eviter les espaces, majuscules & accentuations.
	name: 'Ouadjet Ogame Pack', // Nom complet
	version: '1.9.7c', // Version du script
	scriptURL: 'http://userscripts.org/scripts/source/55227.user.js', // Lien pour installer le script (fichier hosté)
	options: showOptions  // fonction lançant les options
};

//Le changelog est visible dans les options.
var changelog = "<table style=\"width: 644px; margin: 20px 3px 0px 0px;\">"
	+ "<tr><td class=\"c\">Version</td><td class=\"c\">Description</td></tr>"
	+ "<tr><th>v 1.9.7</th><td>* Ajout de l'heure de fin de construction dans l'empire.<br />"
		+ "* Correction d'un bug lors de la recherche des images des planètes.</td></tr>"
	+ "<tr><th>v 1.9.6</th><td>* Séparation de la production horaire et du stock dans l'empire.<br />"
		+ "* Personnalisation des images de planètes.<br />"
		+ "* Afficher/Masquer les images et les descriptions des bâtiments et des recherches. <b>Merci à Cortx.</b></td></tr>"
	+ "<tr><th>v 1.9.5</th><td>Ajout de la calculette pour les rapports d'espionnage. <b>Merci à Lextaz pour sa super idée.</b></td></tr>"
	+ "<tr><th>v 1.9.4</th><td>Correction de la formule de portée des missiles interplanétaires.</td></tr>"
	+ "<tr><th>v 1.9.3</th><td>* Correction d'un oubli lors de la sélection du bouton \"Continuer\" des pages de flottes 2 & 3 (l'add-on \"Foxgame\" donne la même fonctionnalité et masquait cet oubli).<br/>"
		+ "* Ajout de l'affichage en couleur dans les statistiques pour les amis, les alliés et le joueur.<br/>"
		+ "* Modification de l'affichage des options.</td></tr>"
	+ "<tr><th>v 1.9.2</th><td>Modification de l'affichage des planètes dans l'empire (cases moins grandes).</td></tr>"
	+ "<tr><th>v 1.9.1</th><td>Correction d'un bug sur le calcul des défenses manquantes.</td></tr>"
	+ "<tr><th>v 1.9.0</th><td>* Transformation de la partie flottes/défenses en objet.<br/>"
		+ "* Affichage des infos de base et des stats de flottes/défenses.<br/>"
		+ "* Remodelage des options.<br/>"
		+ "* Ajout d'une option de soustraction à la calculette sur la 3ème page de flotte.<br/>"
		+ "* Prise en compte des opérations dans la calculette (opération simple : +, -, *, /). /!\\ Le séparateur de décimale est le point et non la virgule.<br/>"
		+ "* Correction du bonus de la recherche Ordinateur.</td></tr>"
	+ "<tr><th>v 1.8.3</th><td>Ajout d'un lien pour afficher le nombre de gt/pt de la calculette dans la 1ère page de flotte.</td></tr>"
	+ "<tr><th>v 1.8.2</th><td>* Correction du bug de suppression de la ligne des images de planètes.<br/>"
		+ "* Modification de l'affichage des notes (plus long) et de la calculette.<br/>"
		+ "* Affichage de l'énergie restante pour la centrale de fusion.<br/>"
		+ "* Affichage des infos du niveau en cours des bâtiments.<br/>"
		+ "* Ajout d'un lien pour afficher le montant d'un bâtiment dans la calculette.<br/>"
		+ "* Ajout d'un lien pour afficher le montant de la calculette dans la 3ème page de flotte.</td></tr>"
	+ "<tr><th>v 1.8.1</th><td>* Ajout des options de notes et de calculette.<br/>"
		+ "* Modification de l'apparence de ces derniers.</td></tr>"
	+ "<tr><th>v 1.8.0</th><td>Ajout de la calculette et des notes.</td></tr>"
	+ "<tr><th>v 1.7.1</th><td>* Modification de l'évènement d'affichage du coût de construction (onChange => onKeyup).<br/>"
		+ "* Ajout de la conversion de k/K en 000 et de m/M en 000000 dans la 3ème page d'envoi de flotte.</td></tr>"
	+ "<tr><th>v 1.7.0</th><td>* Ajout de l'affichage en onglet de l'empire.<br/>"
		+ "* Modification de l'affichage des unités manquantes et en production.<br/>"
		+ "* Ajout de la ligne des labos dans l'empire.<br/>"
		+ "* Fusion des cellules de chaque recherche.<br/>"
		+ "* Sélectionne le bouton \"Continuer\" dans la 1ère page de flotte.</td></tr>"
	+ "<tr><th>v 1.6.0</th><td>Ajout des informations de bâtiments et de recherches.</td></tr>"
	+ "<tr><th>v 1.5.0</th><td>Ajout de la fonctionnalité de transport semi-automatique.</td></tr>"
	+ "<tr><th>v 1.4.1</th><td>Correction d'un bug du masquage de la ligne d'images des planètes dans l'empire.</td></tr>"
	+ "<tr><th>v 1.4.0</th><td>Affichage du coût de production des vaisseaux/défenses.</td></tr>"
	+ "<tr><th>v 1.3.7</th><td>Amélioration de l'affichage des ressources en transit.</td></tr>"
	+ "<tr><th>v 1.3.6</th><td>Correction d'un bug sur l'affichage de la page empire des lunes.</td></tr>"
	+ "<tr><th>v 1.3.5</th><td>* Ajout de l'affichage du menu des planètes dans les options.<br/>"
		+ "* Correctif d'un décalage des rowspan sur l'empire.</td></tr>"
	+ "<tr><th>v 1.3.4</th><td>* Correction d'un bug d'affichage lors d'une expédition.<br/>"
		+ "* Ajout des restrictions pour la nouvelle version d'ogame.</td></tr>"
	+ "<tr><th>v 1.3.3</th><td>Ajout de l'affichage des lunes dans le menu des planètes.</td></tr>"
	+ "<tr><th>v 1.3.2</th><td>Corection d'un bug sur la récupération du nom de la planète de destination/d'arrivée.</td></tr>"
	+ "<tr><th>v 1.3.1</th><td>Suppression du bouton \"Enregistrer\" des options.</td></tr>"
	+ "<tr><th>v 1.3.0</th><td>Modification du système d'options.</td></tr>"
	+ "<tr><th>v 1.2.2</th><td>Ajout (non affichable) d'un menu de changement de planète.</td></tr>"
	+ "<tr><th>v 1.2.1</th><td>Correction d'un bug de l'affichage de l'empire lorsque le joueur à une(des) lune(s).</td></tr>"
	+ "<tr><th>v 1.2.0</th><td>Ajout du détails des transits.</td></tr>"
	+ "<tr><th>v 1.1.0</th><td>Ajout des options du script.</td></tr>"
	+ "<tr><th>v 1.0.0</th><td>1ère release.</td></tr></table>"

var declareFun = {
	fun: ['Det', 'addElem', 'insElem', '$', '$A', '$C', '$E', 'id_', 'name_', 'tag_', 'class_', 'doTheBlack', 'setReload', 'findPath', 'getStrTime'], // Fonctions que l'on souhaite utiliser.
	proto: ['toStr', 'toNum', 'find'], // Prototypes que l'on souhaite utiliser.
	vari: ['BAU', 'DATA', 'TXT', 'TAG', 'JSON', 'server', 'session', 'page', 'mode'] // Variables que l'on souhaite utiliser.
};

// Seyguai's Script - SSU Method
switch (unsafeWindow.ssu) { // diverses erreurs du script librairie.
	case undefined:
		unsafewindow.ssu = false;
		return alert("ce script fait partie d'une suite crée par seyguai.\nson bon fonctionnement implique la présence du script \"seyguai's scripts utilities\" fourni sur le site de l'auteur.\n\nsi toutefois ce script est déjà  installé, veuillez le placer en première position de la liste des autres scripts greasemonkey.\n(il n'altèrera en rien le fonctionnement des autres scripts)\n\nexécution des scripts ssu interrompue.");
	case false:
		return;
	case 'error':
		unsafewindow.ssu = false;
		return alert("une erreur s'est produite lors de l'exécution de la librairie \"seyguai's scripts utilities\". merci de contacter l'auteur.\n\nexécution des scripts ssu interrompue.");
}

eval(unsafeWindow.ssu.fun.evalFunctions(declareFun)); // Définition des fonctions/prototype/variables

if (unsafeWindow.ssu.fun.addScript(thisData)) // Référencement du script
	return; // false si script bloqué, true sinon.


/*============================*\
|  OUADJET OGAME PACK OPTIONS  |
\*============================*/

var defaultOptions = JSON.stringify({
	version: '',
	textSize: 10,
	dateFormat: 'ddd dd/mm/yy hh:nn:ss',
	showLinkMenu: true,
	homePlanet: {galaxy: 1, system: 1, planet: 1, planetType: 1},
	planetImages: [],
	indexImage: 0,
	overview: {
		showTotalResources: true,
		changeFleetsMessage: true,
		showFleet: {
			flight: true,
			return: false,
			holding: true
		},
		showResources: {
			flight: true,
			return: true,
			holding: true
		}
	},
	empire: {
		showHourlyProd: true,
		showDailyProd: true,
		showWeeklyProd: true,
		showMonthlyProd: false,
		hidePlanetImages: true,
		mergeResearchColumn: true,
		showTabs: true,
	},
	building: { showInfo: true, supprDef: true, supprImg: false },
	research: { showInfo: true, moveCurrentResearchRow: true, supprDef: true, supprImg: false },
	fleet: {
		showInfo: true,
		showStat: true
	},
	defence: {
		showInfo: true,
		showStat: true,
		calcMissing: true,
		line: { lm: 100, lle: 100, llo: 50, gauss: 20, ion: 0, pla: 1 }
	},
	statistics: {
		showColor: true
	},
	skins: {
		skin1: 'http://graphics.ogame-cluster.net/download/use/evolution/',
		skin2: 'http://otrade.free.fr/0skin/'
	},
	calc: {
		show: true,
		m: 0,
		c: 0,
		d: 0
	},
	notes: {
		show: true,
		data: ''
	}
});

var options = {
	refresh_: function () {
		var x = JSON.parse(GM_getValue('options' + server + DATA.player.name, defaultOptions));
		for (var elm in x)
			eval('this.' + elm + ' = x[elm]');
	},
	init_: function () {
		return this.set_(JSON.parse(defaultOptions));
	},
	save_: function (newData) {
		newData === undefined ? null : this.set_(newData);
		var x = {};
		for (var elm in this)
			if (!'refresh_,save_,set_,init_'.find(elm))
				eval('x.' + elm + ' = this[elm]');
		GM_setValue('options' + server + DATA.player.name, JSON.stringify(x));
		setReload(thisData.namespace, true);
	},
	set_: function (newData) {
		for (var elm in newData)
			if (!'refresh_,save_,set_,init_'.find(elm))
				eval('this.' + elm + ' = newData[elm]');
		return this;
	}
};
options.init_().refresh_();

function showOptions() {
    var content = doTheBlack(thisData.namespace), maintable, table, tr, td1, td2, input, div, td, url;

	GM_addStyle('.oop_table {  } .oop_tr { height: 21px; } .oop_td_label { width: 288px; } .oop_td_check { width: 22px; }');

	table = content.addElem('table', {class: 'oop_table'});
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'font-size: 16px; text-align: center;'}, thisData.name + ' v' + thisData.version);
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'font-size: 10px; text-align: center;'})
		.addElem('a', {href: 'http://userscripts.org/scripts/source/55227.user.js'}, 'Mise à jour du script');
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'font-size: 10px; text-align: center; background-image: none !important; background-color: darkgoldenrod !important;'})
		.addElem('a', {href: 'http://userscripts.org/reviews/new?script_id=55227', target: 'blank_', style: 'color: yellow !important;'}, 'Si vous aimez mon script, s\'il vous plaît, mettez lui une note et/ou un commentaire, merci !');
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {id: 'default', class: 'c', colspan: 3, style: 'text-align: center;'})
		.addElem('a', {href: '#'}, 'Valeurs par défaut').$E({
			click: function() {
				options.init_().save_();
				window.location.reload();
			}
		});
	
	content.addElem('br');

	tr = content.addElem('table').addElem('tr');
	td1 = tr.addElem('td', {style: 'background-color: transparent; vertical-align: top;'});
	td2 = tr.addElem('td', {style: 'background-color: transparent; vertical-align: top;'});

	// --------------------------------------------------- OPTIONS GENERALES -------------------------------------------------------
	table = td1.addElem('table', {class: 'oop_table'});
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Options Générales');
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Taille du texte');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {class: 'oop_td_check', type: 'text', id: 'textSize', value: options.textSize})
		.$E({change: function () { options.save_({textSize: id_('textSize').value}); options.refresh_(); }});
	
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Afficher le menu des planètes');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showLinkMenu'})
		.$E({change: function () { options.save_({'showLinkMenu': id_('showLinkMenu').checked}); options.refresh_(); }})
		.checked = options.showLinkMenu;
	
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Afficher la calculette');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'calc.show'})
		.$E({change: function () { options.save_({'calc.show': id_('calc.show').checked}); options.refresh_(); }})
		.checked = options.calc.show;
	
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Afficher les notes');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'notes.show'})
		.$E({change: function () { options.save_({'notes.show': id_('notes.show').checked}); options.refresh_(); }})
		.checked = options.notes.show;
	
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Mettre en couleur les amis, les alliés et moi-même<br />dans les statistiques');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'statistics.showColor'})
		.$E({change: function () { options.save_({'statistics.showColor': id_('statistics.showColor').checked}); options.refresh_(); }})
		.checked = options.statistics.showColor;

	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {colspan: 3}, 'Format de date & heure<br/><label id="lblDate">' + formatDate(options.dateFormat, new Date(), false) + '</label>')
		.addElem('input', {style: 'width: 167px; float: right;', type: 'text', id: 'dateFormat', value: options.dateFormat})
			.$E({change: function () { options.save_({dateFormat: id_('dateFormat').value}); options.refresh_(); id_('lblDate').innerHTML = formatDate(options.dateFormat, new Date(), false); }})
			.addTip('<table><tr><th colspan="3">Formats disponibles</th></tr>'
				+ '<tr><th>Format</th>	<th>Description</th>						<th>Exemple</th></tr>'
				+ '<tr><td>dddd</td>	<td>Nom du jour</td>						<td>Lundi</td></tr>'
				+ '<tr><td>ddd</td>		<td>Nom du jour abrégé</td>					<td>Lu</td></tr>'
				+ '<tr><td>dd</td>		<td>Numéro du jour (sur 2 chiffres)</td>	<td>01</td></tr>'
				+ '<tr><td>d</td>		<td>Numéro du jour</td>						<td>1</td></tr>'
				+ '<tr><td>mmmm</td>	<td>Nom du mois</td>						<td>Janvier</td></tr>'
				+ '<tr><td>mmm</td>		<td>Nom du mois abrégé</td>					<td>Janv</td></tr>'
				+ '<tr><td>mm</td>		<td>Numéro du mois (sur 2 chiffres)</td>	<td>01</td></tr>'
				+ '<tr><td>m</td>		<td>Numéro du mois</td>						<td>1</td></tr>'
				+ '<tr><td>yyyy</td>	<td>Année</td>								<td>2010</td></tr>'
				+ '<tr><td>yy</td>		<td>Année (sur 2 chiffres)</td>				<td>10</td></tr>'
				+ '<tr><td>hh</td>		<td>Heure (sur 2 chiffres)</td>				<td>01</td></tr>'
				+ '<tr><td>h</td>		<td>Heure</td>								<td>1</td></tr>'
				+ '<tr><td>nn</td>		<td>Minute (sur 2 chiffres)</td>			<td>01</td></tr>'
				+ '<tr><td>n</td>		<td>Minute</td>								<td>1</td></tr>'
				+ '<tr><td>ss</td>		<td>Seconde (sur 2 chiffres)</td>			<td>01</td></tr>'
				+ '<tr><td>s</td>		<td>Seconde</td>							<td>1</td></tr></table><br />'
				+ 'Par défaut : "ddd dd/mm/yy hh:nn:ss"<br/>'
				+ 'soit ' + formatDate('ddd dd/mm/yy hh:nn:ss', new Date(), false) + '<br />'
				+ 'Pour utiliser l\'un des caractères spéciaux, utiliser un "\\" devant.<br />'
				+ 'Par exemple, "hh\\hnn\\mss\\s" donne ' + formatDate('hh\\\hnn\\\mss\\\s', new Date(), false), 'WIDTH', '250');
	
	// --------------------------------------------------- PLANETE MERE -------------------------------------------------------
	table = td2.addElem('table', {style: 'display: inline;'});
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Planète Mère');
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Galaxie');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {class: 'oop_td_check', type: 'text', id: 'galaxy', value: options.homePlanet.galaxy})
		.$E({change: function () { options.save_({'homePlanet.galaxy': id_('galaxy').value}); options.refresh_(); }});
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Système solaire');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {class: 'oop_td_check', type: 'text', id: 'system', value: options.homePlanet.system})
		.$E({change: function () { options.save_({'homePlanet.system': id_('system').value}); options.refresh_(); }});
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Planète');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {class: 'oop_td_check', type: 'text', id: 'planet', value: options.homePlanet.planet})
		.$E({change: function () { options.save_({'homePlanet.planet': id_('planet').value}); options.refresh_(); }});
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Lune');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'planetType'})
		.$E({change: function () { options.save_({'homePlanet.planetType': (id_('planetType').checked ? 3 : 1)}); options.refresh_(); }})
		.checked = options.homePlanet.planetType == 3;
	
	// --------------------------------------------------- APERCU -------------------------------------------------------
	table = td1.addElem('table', {class: 'oop_table'});
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Page Aperçu');
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Afficher les ressources en transit');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showTotalResources'})
		.$E({change: function () { options.save_({'overview.showTotalResources': id_('showTotalResources').checked}); options.refresh_(); }})
		.checked = options.overview.showTotalResources;
		
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Changer les messages de flottes');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'changeFleetsMessage'})
		.$E({change: function () { options.save_({'overview.changeFleetsMessage': id_('changeFleetsMessage').checked}); options.refresh_(); }})
		.checked = options.overview.changeFleetsMessage;
	
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {rowspan: 3}, 'Afficher les vaisseaux');
	tr.addElem('td', {}, 'à l\'aller');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showFleet.flight'})
		.$E({change: function () { options.save_({'overview.showFleet.flight': id_('showFleet.flight').checked}); options.refresh_(); }})
		.checked = options.overview.showFleet.flight;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, 'au retour');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showFleet.return_'})
		.$E({change: function () { options.save_({'overview.showFleet.return_': id_('showFleet.return_').checked}); options.refresh_(); }})
		.checked = options.overview.showFleet.return_;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, 'en stationnement');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showFleet.holding'})
		.$E({change: function () { options.save_({'overview.showFleet.holding': id_('showFleet.holding').checked}); options.refresh_(); }})
		.checked = options.overview.showFleet.holding;
	
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {rowspan: 3}, 'Afficher les ressources');
	tr.addElem('td', {}, 'à l\'aller');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showResources.flight'})
		.$E({change: function () { options.save_({'overview.showResources.flight': id_('showResources.flight').checked}); options.refresh_(); }})
		.checked = options.overview.showResources.flight;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, 'au retour');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showResources.return_'})
		.$E({change: function () { options.save_({'overview.showResources.return_': id_('showResources.return_').checked}); options.refresh_(); }})
		.checked = options.overview.showResources.return_;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, 'en stationnement');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showResources.holding'})
		.$E({change: function () { options.save_({'overview.showResources.holding': id_('showResources.holding').checked}); options.refresh_(); }})
		.checked = options.overview.showResources.holding;
	
	// ------------------------------------------------ EMPIRE--------------------------------------------------------
	table = td2.addElem('table', {class: 'oop_table'});
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Page Empire');
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Séparer la production horaire et le stock');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showHourlyProd'})
		.$E({change: function () { options.save_({'empire.showHourlyProd': id_('showHourlyProd').checked}); options.refresh_(); }})
		.checked = options.empire.showHourlyProd;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {rowspan: 3}, 'Afficher la production');
	tr.addElem('td', {}, 'journalière');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showDailyProd'})
		.$E({change: function () { options.save_({'empire.showDailyProd': id_('showDailyProd').checked}); options.refresh_(); }})
		.checked = options.empire.showDailyProd;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, 'hebdomadaire');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showWeeklyProd'})
		.$E({change: function () { options.save_({'empire.showWeeklyProd': id_('showWeeklyProd').checked}); options.refresh_(); }})
		.checked = options.empire.showWeeklyProd;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, 'mensuelle');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showMonthlyProd'})
		.$E({change: function () { options.save_({'empire.showMonthlyProd': id_('showMonthlyProd').checked}); options.refresh_(); }})
		checked = options.empire.showMonthlyProd;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Masquer la ligne des images de planètes');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'hidePlanetImages'})
		.$E({change: function () { options.save_({'empire.hidePlanetImages': id_('hidePlanetImages').checked}); options.refresh_(); }})
		.checked = options.empire.hidePlanetImages;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Regrouper les cellules des recherches');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'mergeResearchColumn'})
		.$E({change: function () { options.save_({'empire.mergeResearchColumn': id_('mergeResearchColumn').checked}); options.refresh_(); }})
		.checked = options.empire.mergeResearchColumn;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Affichage en onglets');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'showTabs'})
		.$E({change: function () { options.save_({'empire.showTabs': id_('showTabs').checked}); options.refresh_(); }})
		.checked = options.empire.showTabs;
	
	// --------------------------------------------------- BATIMENTS -------------------------------------------------------
	table = td2.addElem('table');
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Page Bâtiment');
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Afficher les informations');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'building.showInfo'})
		.$E({change: function () { options.save_({'building.showInfo': id_('building.showInfo').checked}); options.refresh_(); }})
		.checked = options.building.showInfo;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Masquer les définitions');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'building.supprDef'})
		.$E({change: function () { options.save_({'building.supprDef': id_('building.supprDef').checked}); options.refresh_(); }})
		.checked = options.building.supprDef;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Masquer les images');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'building.supprImg'})
		.$E({change: function () { options.save_({'building.supprImg': id_('building.supprImg').checked}); options.refresh_(); }})
		.checked = options.building.supprImg;
	
	// --------------------------------------------------- DEFENSE -------------------------------------------------------
	table = td1.addElem('table', {class: 'oop_table'});
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Page Défense');
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Remplacer les informations');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'defence.showInfo'})
		.$E({change: function () { options.save_({'defence.showInfo': id_('defence.showInfo').checked}); options.refresh_(); }})
		.checked = options.defence.showInfo;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Afficher les statistiques');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'defence.showStat', style: 'text-align: center;'})
		.$E({change: function () { options.save_({'defence.showStat': id_('defence.showStat').checked}); options.refresh_(); }})
		.checked = options.defence.showStat;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Calculer les unités manquantes');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'calcMissing', style: 'text-align: center;'})
		.$E({change: function () { options.save_({'defence.calcMissing': id_('calcMissing').checked}); options.refresh_(); }})
		.checked = options.defence.calcMissing;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {rowspan: 6}, 'Ligne de défenses');
	tr.addElem('td', {}, TXT['lm']);
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {class: 'oop_td_check', type: 'text', id: 'lm', value: options.defence.line.lm})
		.$E({change: function () { options.save_({'defence.line.lm': id_('lm').value}); options.refresh_(); }});
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, TXT['lle']);
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {class: 'oop_td_check', type: 'text', id: 'lle', value: options.defence.line.lle})
		.$E({change: function () { options.save_({'defence.line.lle': id_('lle').value}); options.refresh_(); }});
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, TXT['llo']);
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {class: 'oop_td_check', type: 'text', id: 'llo', value: options.defence.line.llo})
		.$E({change: function () { options.save_({'defence.line.llo': id_('llo').value}); options.refresh_(); }});
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, TXT['gauss']);
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {class: 'oop_td_check', type: 'text', id: 'gauss', value: options.defence.line.gauss})
		.$E({change: function () { options.save_({'defence.line.gauss': id_('gauss').value}); options.refresh_(); }});
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, TXT['ion']);
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {class: 'oop_td_check', type: 'text', id: 'ion', value: options.defence.line.ion})
		.$E({change: function () { options.save_({'defence.line.ion': id_('ion').value}); options.refresh_(); }});
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {}, TXT['pla']);
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {class: 'oop_td_check', type: 'text', id: 'pla', value: options.defence.line.pla})
		.$E({change: function () { options.save_({'defence.line.pla': id_('pla').value}); options.refresh_(); }});
	
	// --------------------------------------------------- RECHERCHE -------------------------------------------------------
	table = td2.addElem('table', {class: 'oop_table'});
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Page Recherche');
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Afficher les informations');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'research.showInfo'})
		.$E({change: function () { options.save_({'research.showInfo': id_('research.showInfo').checked}); options.refresh_(); }})
		.checked = options.research.showInfo;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Déplacer la ligne de recherche en cours en haut du tableau');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'moveCurrentResearchRow'})
		.$E({change: function () { options.save_({'research.moveCurrentResearchRow': id_('moveCurrentResearchRow').checked}); options.refresh_(); }})
		.checked = options.research.moveCurrentResearchRow;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Masquer les définitions');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'research.supprDef'})
		.$E({change: function () { options.save_({'research.supprDef': id_('research.supprDef').checked}); options.refresh_(); }})
		.checked = options.research.supprDef;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Masquer les images');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'research.supprImg'})
		.$E({change: function () { options.save_({'research.supprImg': id_('research.supprImg').checked}); options.refresh_(); }})
		.checked = options.research.supprImg;
	
	// --------------------------------------------------- SHIPYARD -------------------------------------------------------
	table = td2.addElem('table', {class: 'oop_table'});
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Page Chantier Spatial');
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Remplacer les informations');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'fleet.showInfo', style: 'text-align: center;'})
		.$E({change: function () { options.save_({'fleet.showInfo': id_('fleet.showInfo').checked}); options.refresh_(); }})
		.checked = options.fleet.showInfo;
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {class: 'oop_td_label', colspan: 2}, 'Afficher les statistiques');
	tr.addElem('td', {class: 'oop_td_check'}).addElem('input', {type: 'checkbox', id: 'fleet.showStat', style: 'text-align: center;'})
		.$E({change: function () { options.save_({'fleet.showStat': id_('fleet.showStat').checked}); options.refresh_(); }})
		.checked = options.fleet.showStat;
	
	// --------------------------------------------------- OPTIONS -------------------------------------------------------
	table = td2.addElem('table', {class: 'oop_table'});
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Page Options');
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {style: 'width: 33px;'}, 'Skin 1');
	tr.addElem('td', {colspan: 2}).addElem('input', {type: 'text', id: 'skin1', value: options.skins.skin1, style: 'width: 277px;'})
		.$E({change: function () { options.save_({'skins.skin1': id_('skin1').value}); options.refresh_(); }});
	tr = table.addElem('tr', {class: 'oop_tr'});
	tr.addElem('td', {style: 'width: 33px;'}, 'Skin 2');
	tr.addElem('td', {colspan: 2}).addElem('input', {type: 'text', id: 'skin2', value: options.skins.skin2, style: 'width: 277px;'})
		.$E({change: function () { options.save_({'skins.skin2': id_('skin2').value}); options.refresh_(); }});
	
	// --------------------------------------------------- IMAGES -------------------------------------------------------
	url = tag_('link', 3);
	if (url)
		url = url.href.substring(0, url.href.lastIndexOf('/') + 1);

	function showPreview(iIndex) {
		options.indexImage = iIndex;
		id_('bigImage').src = options.planetImages[iIndex].replace('small/s_', '/');
	}

	function addImageLine(iIndex, sProperty, sId) {
		if (options.planetImages[iIndex]) {
			tr = table.addElem('tr', {class: 'oop_tr'});
			tr.addElem('td', {}, DATA.planet[iIndex].name);
			tr.addElem('td').addElem('input', {type: 'text', id: sId, value: options.planetImages[iIndex], style: 'width: 100%;'})
				.$E({change: function () { options.save_({sProperty: id_(sId).value}); options.refresh_(); }});
			tr.addElem('td', {style: 'width: 50px; text-align: center;'}).addElem('a', {style:  iIndex == options.indexImage ? 'color: lime;' : ''}, iIndex == options.indexImage ? 'En cours' : 'Voir')
				.$E({click: function () {
					if (options.indexImage != undefined)
						$(table.rows[options.indexImage + 1].cells[2]).tag_('a').$A({style: '::remove::'}).innerHTML = 'Voir';
					this.innerHTML = 'En cours';
					this.style.color = 'lime';
					showPreview(iIndex);
				}});
		}
	}

	function addPreview(sImg) {
		td.addElem('a', {style: 'float: left;'}).$E({
				click: function () {
					options.planetImages[options.indexImage] = url + 'planeten/small/s_' + sImg;
					options.save_({'planetImages': options.planetImages});
					options.refresh_();
				},
				mouseover: function () { id_('bigImage').$A({src: url + 'planeten/' + sImg}); }
			})
			.addElem('img', {class: 'oop_image', src: url + 'planeten/small/s_' + sImg, height: 50, width: 50});
	}

	table = content.addElem('table', {class: 'oop_table', style: 'width: 644px; margin: 20px 3px 0px 0px;'});
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Images des planètes');
	addImageLine(0, 'planetImages[0]', 'image0');
	addImageLine(1, 'planetImages[1]', 'image1');
	addImageLine(2, 'planetImages[2]', 'image2');
	addImageLine(3, 'planetImages[3]', 'image3');
	addImageLine(4, 'planetImages[4]', 'image4');
	addImageLine(5, 'planetImages[5]', 'image5');
	addImageLine(6, 'planetImages[6]', 'image6');
	addImageLine(7, 'planetImages[7]', 'image7');
	addImageLine(8, 'planetImages[8]', 'image8');

	// --------------------------------------------------- IMAGES PREVIEW -------------------------------------------------------
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {class: 'c', colspan: 3, style: 'text-align: center;'}, 'Aperçu des images');
	table.addElem('tr', {class: 'oop_tr'}).addElem('td', {colspan: 3}, 'Les miniatures suivantes sont celles issues du skin que vous utilisez.<br />'
		+ 'Choisissez d\'abord la planète dont vous voulez voir/modifier l\'image.<br />'
		+ 'Passez la souris sur une miniature pour la voir en grande taille et cliquez dessus pour l\'affecter à la planète en cours de modification.');
	tr = table.addElem('tr', {id: 'preview', class: 'oop_tr'/*, style: 'display: none;'*/});
	td = tr.addElem('td', {style: 'width: 220px;'});
	td.addElem('img', {id: 'bigImage', class: 'oop_big_image', src: options.planetImages[options.indexImage].replace('small/s_', '/'), height: 200, width: 200, style: 'margin-left: 10px;'});
	td = tr.addElem('td', {colspan: 2});
	addPreview('dschjungelplanet01.jpg');
	addPreview('dschjungelplanet02.jpg');
	addPreview('dschjungelplanet03.jpg');
	addPreview('dschjungelplanet04.jpg');
	addPreview('dschjungelplanet05.jpg');
	addPreview('dschjungelplanet06.jpg');
	addPreview('dschjungelplanet07.jpg');
	addPreview('dschjungelplanet08.jpg');
	addPreview('dschjungelplanet09.jpg');
	addPreview('dschjungelplanet10.jpg');
	addPreview('eisplanet01.jpg');
	addPreview('eisplanet02.jpg');
	addPreview('eisplanet03.jpg');
	addPreview('eisplanet04.jpg');
	addPreview('eisplanet05.jpg');
	addPreview('eisplanet06.jpg');
	addPreview('eisplanet07.jpg');
	addPreview('eisplanet08.jpg');
	addPreview('eisplanet09.jpg');
	addPreview('eisplanet10.jpg');
	addPreview('gasplanet01.jpg');
	addPreview('gasplanet02.jpg');
	addPreview('gasplanet03.jpg');
	addPreview('gasplanet04.jpg');
	addPreview('gasplanet05.jpg');
	addPreview('gasplanet06.jpg');
	addPreview('gasplanet07.jpg');
	addPreview('gasplanet08.jpg');
	addPreview('normaltempplanet01.jpg');
	addPreview('normaltempplanet02.jpg');
	addPreview('normaltempplanet03.jpg');
	addPreview('normaltempplanet04.jpg');
	addPreview('normaltempplanet05.jpg');
	addPreview('normaltempplanet06.jpg');
	addPreview('normaltempplanet07.jpg');
	addPreview('normaltempplanet08.jpg');
	addPreview('trockenplanet01.jpg');
	addPreview('trockenplanet02.jpg');
	addPreview('trockenplanet03.jpg');
	addPreview('trockenplanet04.jpg');
	addPreview('trockenplanet05.jpg');
	addPreview('trockenplanet06.jpg');
	addPreview('trockenplanet07.jpg');
	addPreview('trockenplanet08.jpg');
	addPreview('trockenplanet09.jpg');
	addPreview('trockenplanet10.jpg');
	addPreview('wasserplanet01.jpg');
	addPreview('wasserplanet02.jpg');
	addPreview('wasserplanet03.jpg');
	addPreview('wasserplanet04.jpg');
	addPreview('wasserplanet05.jpg');
	addPreview('wasserplanet06.jpg');
	addPreview('wasserplanet07.jpg');
	addPreview('wasserplanet08.jpg');
	addPreview('wasserplanet09.jpg');

	div = content.addElem('div', {style: 'margin: auto; text-align: left; width: 650px;'}, changelog);
}

/*===================*\
|  OUTILS & FORMULES  |
\*===================*/

function Cost(m, c, d, f) {
	this.m = (m || 0);
	this.c = (c || 0);
	this.d = (d || 0);
	this.f = (f || 1);

	this.toString = function () {
		var txt = '';
		if (this.m) txt = this.m.toStr() + 'm';
		if (this.c) txt += (txt ? ', ' : '') + this.c.toStr() + 'c';
		if (this.d) txt += (txt ? ', ' : '') + this.d.toStr() + 'd';
		return txt;
	}
}

var TEXT = {
	overview: {
	    from: ' de ',
	    to: ' vers ',
	    events: 'Evènements',
	    mission: {
		    type: {
			    attack: 'Attaquer',
			    colony: 'Coloniser',
			    deploy: 'Stationner',
			    destroy: 'Détruire',
			    espionage: 'Espionner',
			    expedition: 'Expédition',
			    federation: '',
			    harvest: 'Exploiter',
			    hold: 'Stationnement allié',
			    missile: '',
			    transport: 'Transporter'
		    },
		    way: { flight: 'Aller', return: 'Retour', holding: 'Stationner' },
	        from: { planet: 'planète', moon: 'lune', cdr: 'débris', none: 'espaces infinis' }
	    }
	},
	empire: {
	    building: 'Bâtiments',
	    defence: 'Défense',
	    fleets: 'Vaisseaux',
	    research: 'Recherche',
	    resources: 'Ressources',
	    hourlyProd: 'Production horaire',
	    monthlyProd: 'Production mensuelle',
	    weeklyProd: 'Production hebdomadaire',
	    dailyProd: 'Production journalière',
	    total: 'Total/j (gt)',
	    sum: 'Somme',
	    showHideRows: 'Afficher / Masquer le contenu',
		constructTime: 'Construction (fin)'
	},
	building: {
	    and: ' et ',
	    production: 'Production : ',
	    consumption: 'Consommation : ',
	    timeGained: 'Gain de temps',
	    building: 'bâtiment',
	    fleet: 'flotte',
	    defence: 'défense',
	    research: 'recherche',
	    stock: 'Stockage : ',
	    cells: 'Cases : ',
	    deliver: 'Livraison : ',
	    capacity: 'Capacité : ',
		scope: 'Portée : '
	},
	research: {
	    computer: 'Nombre de flottes : ',
	    power: 'Puissance : +',
	    shield: 'Bouclier : +',
	    structure: 'Structure : +',
	    speed: 'Vitesse : +',
		mipscope: 'Portée des missiles interplanétaires : ',
	    expeCount: 'Nombre d\'expéditon : ',
	    expeLength: 'Durée : '
	},
	fleet: {
	    dailyTransport: 'Transport journalier : ',
	    on: 'on',
	    off: 'off',
	    hint: 'Cliquez sur ce lien pour activer/désactiver le mode "transport journalier".'
	        + ' Ce dernier va remplir pour vous le nombre de vaisseaux nécessaires, les coordonnées de la planète mère'
	        + ' (à définir dans les options SSU >> Ouadjet Ogame Pack), le mode Transporter et les ressources maximum.'
	    /* hint: 'Click on this link to activate/deactivate the "daily transport" mode.'
	        + ' This will fill for you the necessary ships, you home planet coordinates'
	        + ' (need to be define in options SSU >> Ouadjet Ogame Pack), the Transport mode and maximum resources.'*/
	},
	construction: {
	    cost: 'Co&ucirc;t : ',
	    missing: 'manquant ',
	    hint: 'Tient compte de la production en cours'
	    /* hint: 'Reflect the current production'*/
	},
	info: {
		power: 'Puissance : ',
		struct: 'Structure : ',
		shield: 'Bouclier : ',
		speed: 'Vitesse : '
	}
}

var COST = {
	building: {
		mmet: new Cost(60, 15, 0, 1.5),
		mcri: new Cost(48, 24, 0, 1.6),
		mdet: new Cost(225, 75, 0, 1.5),
		ces: new Cost(75, 30, 0, 1.5),
		cef: new Cost(900, 360, 180, 1.8),
		rob: new Cost(400, 120, 200, 2),
		nan: new Cost(1000000, 500000, 100000, 2),
		cspa: new Cost(400, 200, 100, 2),
		hmet: new Cost(2000, 0, 0, 2),
		hcri: new Cost(2000, 1000, 0, 2),
		hdet: new Cost(2000, 2000, 0, 2),
		lab: new Cost(200, 400, 200, 2),
		ter: new Cost(0, 50000, 100000, 2),
		depo: new Cost(20000, 40000, 0, 2),
		silo: new Cost(20000, 20000, 1000, 2),
		base: new Cost(20000, 40000, 20000, 2),
		phal: new Cost(20000, 40000, 20000, 2),
		port: new Cost(2000000, 4000000, 2000000, 2)
	},
	fleet: {
		pt: new Cost(2000, 2000, 0),
		gt: new Cost(6000, 6000, 0),
		cle: new Cost(3000, 1000, 0),
		clo: new Cost(6000, 4000, 0),
		crois: new Cost(20000, 7000, 2000),
		vb: new Cost(45000, 15000, 0),
		vc: new Cost(10000, 20000, 10000),
		rec: new Cost(10000, 6000, 2000),
		esp: new Cost(0, 1000, 0),
		bomb: new Cost(50000, 25000, 15000),
		ss: new Cost(0, 2000, 500),
		dest: new Cost(60000, 50000, 150000),
		edlm: new Cost(5000000, 4000000, 1000000),
		traq: new Cost(30000, 40000, 15000)
	},
	defence: {
		lm: new Cost(2000, 0, 0),
		lle: new Cost(1500, 500, 0),
		llo: new Cost(6000, 2000, 0),
		gauss: new Cost(20000, 15000, 2000),
		ion: new Cost(2000, 6000, 0),
		pla: new Cost(50000, 50000, 30000),
		pb: new Cost(10000, 10000, 0),
		gb: new Cost(50000, 50000, 0),
		mic: new Cost(8000, 0, 2000),
		mip: new Cost(12500, 2500, 10000)
	}
}

var SEARCH = {
	comb: 10,
	impu: 20,
	phyp: 30,
	pt: (DATA.techno.impu > 4 ? 'impu' : 'comb'),
	gt: 'comb',
	cle: 'comb',
	clo: 'impu',
	crois: 'impu',
	vb: 'phyp',
	vc: 'impu',
	rec: 'comb',
	esp: 'comb',
	bomb: (DATA.techno.phyp > 7 ? 'phyp' : 'impu'),
	dest: 'phyp',
	edlm: 'phyp',
	traq: 'phyp'
}

function getCoord(sCoord) {
	return sCoord.replace('[', '').replace(']', '').split(':');
}
function getProd(tag, lvl, planet) {
	if (!planet) planet = DATA.activ();
	
	if (tag == 'mmet')
		return Math.floor(30 * lvl * Math.pow(1.1, lvl));
	else if (tag == 'mcri')
		return Math.floor(20 * lvl * Math.pow(1.1, lvl));
	else if (tag == 'mdet')
		return Math.floor(10 * lvl * Math.pow(1.1, lvl) * (-0.002 * planet.maxtemp + 1.28));
	else if (tag == 'ces')
		return Math.floor(20 * lvl * Math.pow(1.1, lvl));
	else if (tag == 'cef')
		return Math.floor(30 * lvl * Math.pow(1.05 + DATA.techno.ener * 0.01, lvl));
	else if (tag == 'ss')
		return lvl * Math.min(50, Math.floor(planet.maxtemp / 4 + 20));
	else
		return 0;
}
function getConso(tag, lvl) {
	if (tag == 'mmet')
		return Math.ceil(10 * lvl * Math.pow(1.1, lvl));
	else if (tag == 'mcri')
		return Math.ceil(10 * lvl * Math.pow(1.1, lvl));
	else if (tag == 'mdet')
		return Math.ceil(20 * lvl * Math.pow(1.1, lvl));
	else if (tag == 'cef')
		return Math.ceil(10 * lvl * Math.pow(1.1, lvl));
	else
		return 0;
}
function getTime(robcspaLvl, naniteLvl) {
	var oldTime, newTime;
	oldTime = 2500 * robcspaLvl * Math.pow(2, naniteLvl);
	newTime = 2500 * (1 + robcspaLvl) * Math.pow(2, naniteLvl);
	return (Math.round(((newTime - oldTime) * 100 / newTime) * 100) / 100).toStr() + '%';
}
function getResearch(planet) {
	var labs = new Array();
	var index = -1;
	var oldTime, newTime, labLvl;
	
	function sortByLevel(a, b) { return b.level - a.level; } //Tri décroissant
	function sortByIndex(a, b) { return a.index - b.index; } //Tri croissant
	function total() {
		var total = 0;
		for (i = 0; i < labs.length; i++)
			if (labs[i].reseau)
				total += labs[i].level;
		return total;
	}

	//Récupération des informations sur les labo de chaque planète.
	for (i = 0; i < DATA.planet.length; i++) {
		labs[i] = {index: i, level: DATA.planet[i].building.lab, reseau: false};
		if (DATA.planet[i] == planet)
			index = i;
	}
	labs.sort(sortByLevel);
	for (i = 0; i < DATA.techno.rese + 1; i++)
		labs[i].reseau = true;
	labs.sort(sortByIndex);

	labLvl = (labs[index].reseau ? total() : planet.building.lab);

	oldTime = 1000 * labLvl;
	newTime = 1000 * (labLvl + 1);
	return (Math.round(((newTime - oldTime) * 100 / newTime) * 100) / 100).toStr() + '%';
}
function getStock(lvl) {
	if (!lvl)
		return 100;
	else
		return 100 + 50 * Math.floor(Math.pow(1.6, lvl));
}
function getMissiles(lvl) {
	return (5 * lvl).toStr() + 'mip/' + (10 * lvl).toStr() + 'mic';
}
function getCases(origin, lvl, ismoon) {
	return origin + lvl * (ismoon ? 3 : 4);
}
function getScope(tag, lvl) {
	switch (tag) {
		case 'phal': return Math.pow(lvl, 2) - 1;
		case 'mip': return 5 * lvl - 1;
	}
}
function getCost(tag, lvl) {
	var cost = new Cost();
	var item = (COST.building[tag] || COST.fleet[tag] || COST.defence[tag]);
	if (COST.building[tag])
		lvl = Math.pow(item.f, lvl - 1);

	with (item) {
		cost.m = m * lvl;
		cost.c = c * lvl;
		cost.d = d * lvl;
	}
	return cost;
}
function getPoint(tag, nb) {
	with ((COST.fleet[tag] || COST.defence[tag]))
		return Math.floor((m * nb + c * nb + d * nb) / 1000, 1);
}
function formatDate(sFormat, oDate, bHideDateIfCurrent) {
	function getDayName(iDay, bShort) {
		switch (iDay) {
			case 0: return bShort ? 'Di' : 'Di\\ma\\nche';
			case 1: return bShort ? 'Lu' : 'Lu\\n\\di';
			case 2: return bShort ? 'Ma' : 'Mar\\di';
			case 3: return bShort ? 'Me' : 'Mercre\\di';
			case 4: return bShort ? 'Je' : 'Jeu\\di';
			case 5: return bShort ? 'Ve' : 'Ve\\n\\dre\\di';
			case 6: return bShort ? 'Sa' : 'Sa\\me\\di';			
		}
	}

	function getMonthName(iMonth, bShort) {
		switch (iMonth) {
			case 0: return bShort ? 'Ja\\nv' : 'Ja\\nvier';
			case 1: return bShort ? 'Fév' : 'Février';
			case 2: return 'Mar\\s';
			case 3: return 'Avril';
			case 4: return 'Mai';
			case 5: return 'Jui\\n';
			case 6: return bShort ? 'Juil' : 'Juillet';
			case 7: return 'Août'
			case 8: return bShort ? 'Sept' : 'Septembre';
			case 9: return bShort ? 'Oct' : 'Octobre';
			case 10: return bShort ? 'Nov' : 'Novembre';
			case 11: return bShort ? 'Déc' : 'Décembre';
		}
	}

	var now = new Date();
	var D, d, m, y, h, n, s;

	D = oDate.getDay()
	d = oDate.getDate();
	m = oDate.getMonth();
	y = oDate.getFullYear();
	h = oDate.getHours();
	n = oDate.getMinutes();
	s = oDate.getSeconds();

	if (bHideDateIfCurrent && d == now.getDate())
		sFormat = sFormat.replace(/[^\\]{1}d{1,4}/g, '');

	if (bHideDateIfCurrent && m == now.getMonth())
		sFormat = sFormat.replace(/[^\\]{1}m{1,4}/g, '');

	if (bHideDateIfCurrent && y == now.getFullYear())
		sFormat = sFormat.replace(/[^\\]{1}y{2,4}/g, '');

	//Jour de la semaine
	sFormat = sFormat.replace(/d{4}/, getDayName(D, false));
	sFormat = sFormat.replace(/d{3}/, getDayName(D, true));
	//Jour du mois
	sFormat = sFormat.replace(/d{2}/, (d < 10 ? '0' : '') + d);
	sFormat = sFormat.replace(/[^\\]d/, d);
	//Mois
	sFormat = sFormat.replace(/m{4}/, getMonthName(m, false));
	sFormat = sFormat.replace(/m{3}/, getMonthName(m, true));
	sFormat = sFormat.replace(/m{2}/, (m < 10 ? '0' : '') + m);
	sFormat = sFormat.replace(/[^\\]m{1}/, m);
	//Année
	sFormat = sFormat.replace(/y{4}/, y);
	sFormat = sFormat.replace(/y{2}/, new String(y).substr(2, 2));
	//Heure
	sFormat = sFormat.replace(/h{2}/, (h < 10 ? '0' : '') + h);
	sFormat = sFormat.replace(/[^\\]h{1}/, h);
	//Minutes
	sFormat = sFormat.replace(/n{2}/, (m < 10 ? '0' : '') + m);
	sFormat = sFormat.replace(/[^\\]n{1}/, m);
	//Secondes
	sFormat = sFormat.replace(/s{2}/, (s < 10 ? '0' : '') + s);
	sFormat = sFormat.replace(/[^\\]s{1}/, s);
	
	while (sFormat.match(/\\(.){1}/))
		sFormat = sFormat.replace(/\\(.){1}/, '$1');

	return sFormat;
}

/*============*\
|  CALCULETTE  |
\*============*/

function Calc() {
	this.edtM = null;
	this.edtC = null;
	this.edtD = null;
	this.lblTotal = null;
	this.lblTransport = null;

	this.total = 0;

	this.getShip = function (tag) {
		if (tag == 'gt')
			return Math.ceil(this.total / 25000);
		else if (tag == 'pt')
			return Math.ceil(this.total / 5000);
		else 
			return 0;
	}

	this.getTotal = function () {
		this.total = options.calc.m + options.calc.c + options.calc.d;
		this.lblTotal.innerHTML = 'Total : ' + this.total.toStr();
		this.lblTransport.innerHTML = 'Soit ' + this.getShip('gt').toStr() + ' gt ou ' 
			+ this.getShip('pt').toStr() + ' pt';
		return this.total;
	}

	this.set_ = function (m, c, d) {
		options.calc.m = (m < 0 ? 0 : m);
		options.calc.c = (c < 0 ? 0 : c);
		options.calc.d = (d < 0 ? 0 : d);
		options.save_();

		this.refresh();
	}

	this.setM = function (m) { this.set_(m, options.calc.c, options.calc.d); };

	this.setC = function (c) { this.set_(options.calc.m, c, options.calc.d); };

	this.setD = function (d) { this.set_(options.calc.m, options.calc.c, d); };

	this.substract = function (m, c, d) {
		options.calc.m -= (m || 0);
		options.calc.c -= (c || 0);
		options.calc.d -= (d || 0);
		options.save_();

		this.refresh();
	}

	this.refresh = function () {
		this.edtM.value = options.calc.m;
		this.edtC.value = options.calc.c;
		this.edtD.value = options.calc.d;

		this.getTotal();
	}

	this.keyup = function (e) {
		this.value = this.value.replace(/k/ig, '000').replace(/m/ig, '000000');
		if (!this.value) this.value = '0';

		options.calc.m = parseInt(calc.edtM.value, '10');
		options.calc.c = parseInt(calc.edtC.value, '10');
		options.calc.d = parseInt(calc.edtD.value, '10');
		options.save_();

		calc.getTotal();
	}

	this.blur = function (e) {
		try {
			this.value = Math.round(eval(this.value), 1);

			options.calc.m = parseInt(calc.edtM.value, '10');
			options.calc.c = parseInt(calc.edtC.value, '10');
			options.calc.d = parseInt(calc.edtD.value, '10');
			options.save_();

			calc.getTotal();
		}
		catch (e) {
			alert('La valeur "' + this.value + '" n\'est pas une valeur correcte !');
		}
	}

	this.show = function () {
		var div;
		
		div = id_('menu').addElem('form').addElem('div', {class: 'oopdiv'});
		div.addElem('span', {class: 'titre'}, 'Calculette');
		div.addElem('label', {for: 'calcM'}, 'Métal');
		this.edtM = div.addElem('input', {name: 'calcM', type: "text", value: options.calc.m, onfocus: 'javascript:this.select();'})
			.$E({keyup: this.keyup, blur: this.blur});
		div.addElem('br');
		div.addElem('label', {for: 'calcC'}, 'Cristal');
		this.edtC = div.addElem('input', {name: 'calcC', type: "text", value: options.calc.c, onfocus: 'javascript:this.select();'})
			.$E({keyup: this.keyup, blur: this.blur});
		div.addElem('br');
		div.addElem('label', {for: 'calcD'}, 'Deutérium');
		this.edtD = div.addElem('input', {name: 'calcD', type: "text", value: options.calc.d, onfocus: 'javascript:this.select();'})
			.$E({keyup: this.keyup, blur: this.blur});
		this.lblTotal = div.addElem('span', {id: 'calcTotal'}, 'Total : 0');
		this.lblTransport = div.addElem('span', {id: 'calcTransport'});

		this.getTotal();
	}

	this.showCapacity = function () {
		var ship, capacity = 0;
		for (var i = 200; i < 300; i++) {
			ship = name_('ship' + i);
			if (ship)
				capacity += ship.value * name_('capacity' + i).value;
		}
		capacity += -options.calc.m - options.calc.c - options.calc.d;
		id_('remainingresources').innerHTML = '<font color="' + (capacity < 0 ? 'red' : 'lime') + '">' + capacity.toStr() + '</font>';
	}

	this.showFlotten1 = function () {
		var line = 2;
		var table = id_('content').tag_('table', 2);
		
		with (DATA.activ())
			for (var i = 0; i < TAG.fleet.length; i++)
				line += (fleet[TAG.fleet[i]] > 0 ? 1 : 0);

		var tr = $(table.rows[line]);
		tr.cells[0].setAttribute('colspan', '1');
		insElem(tr.cells[1], 'th', {}).addElem('a', {href: '#'}, 'Calculette').$E({click: function () {
			if (name_('ship203'))
				name_('ship203').value = calc.getShip('gt');
			else if (name_('ship202'))
				name_('ship202').value = calc.getShip('pt');
		}});
	}

	this.showFlotten3 = function () {
		//Ajout du lien pour afficher le contenu de la calculette.
		var td = $(id_('content').tag_('table', 2).rows[5].cells[0]);
		td.addElem('label', {}, ', ');
		td.addElem('a', {href: 'javascript:;'}, 'Calculette').$E({click: function (e) {
			name_('resource1').value = options.calc.m;
			name_('resource2').value = options.calc.c;
			name_('resource3').value = options.calc.d;

			calc.showCapacity();
		}});

		//Ajout de la case à cocher pour indiquer s'il faut soustraire les ressources envoyés à celle de la calculette
		td = $(id_('content').tag_('table').rows[2].cells[0]);
		td.addElem('label', {title: 'Soustraire les ressources envoyées à celles de la calculette.'},
			'<input type="checkbox" name="chkSubstract">Soustraire ...');
		var btn = td.tag_('input');
		btn.$E({click: function () {
			if (name_('chkSubstract').checked)
				calc.substract(name_('resource1').value, name_('resource2').value, name_('resource3').value);
		}});
	}

	this.showSpy = function() {
		var tds, center;

		tds = class_("b", -1);
		for (var i = 0; i < tds.length; i++) {
			center = $(tds[i]).tag_('center', 1);
			if (center) {
				center.innerHTML = ' - ' + center.innerHTML;
				insElem(center.childNodes[0], 'a', {href: '#'}, 'Calculette').$E({click: function () {
					var table = $(this.parentNode.parentNode).childNodes[0];
					calc.set_(Math.floor(table.rows[1].cells[1].innerHTML.toNum() / 2), Math.floor(table.rows[1].cells[3].innerHTML.toNum() / 2), Math.floor(table.rows[2].cells[1].innerHTML.toNum() / 2));
				}});
			}
		}
	}
}
var calc;

/*=======*\
|  NOTES  |
\*=======*/

function showNotes() {
	var div;

	div = id_('menu').addElem('form').addElem('div', {class: 'oopdiv'});
	div.addElem('span', {class: 'titre'}, 'Notes');
	div.addElem('textarea', {name: 'notes', onfocus: 'javascript:this.select();', style: 'width: 100%;'}, options.notes.text)
		.$E({keyup: function () { options.notes.text = this.value; options.save_(); }});
}
	
/*==========*\
|  OVERVIEW  |
\*==========*/

function overview() {
	var FN_VISIBILITY =
    'function setDetailsVisible(elmId) {\n'
        + '  var elm = document.getElementById(elmId);\n'
        + '  if (elm.getAttribute("class") == "invisible")\n'
            + '    elm.setAttribute("class", "visible");\n'
        + '  else\n'
            + '    elm.setAttribute("class", "invisible");\n'
    + '}';

	var NAME_LIMIT = ' <a href="javascript:showGalaxy';
	var PLAYER_NAME_LIMIT = ' <a href="#" onclick="showMessageMenu';

	function resToString(res) {
		var txt = (res.m ? res.m.toStr() + 'm' : '');
		txt += (res.c ? (txt ? ', ' : '') + res.c.toStr() + 'c' : '');
		txt += (res.d ? (txt ? ', ' : '') + res.d.toStr() + 'd' : '');
		return txt;
	}
	
	function Res() {
		this.m = 0;
		this.c = 0;
		this.d = 0;
		this.isntNull = function () { return this.m > 0 || this.c > 0 || this.d > 0; };
		this.toString = function () {
			var txt = (this.m ? this.m.toStr() + 'm' : '');
			txt += (this.c ? (txt ? ', ' : '') + this.c.toStr() + 'c' : '');
			txt += (this.d ? (txt ? ', ' : '') + this.d.toStr() + 'd' : '');
			return txt;
		}
	} 
	
	function Planet() { 
		this.res = new Res();
		this.type = '';
		this.posi = '';
		this.end = 0;
	} 
	
	function Transit() { 
		this.planet = [];
		this.getPlanet = function (posi) { 
			for (var i = 0; i < this.planet.length; i++)
				if (this.planet[i].posi == posi)
					return this.planet[i];
			return null;
		}; 
		this.total = function () { 
			var res = new Res();
			for (var i = 0; i < this.planet.length; i++) {
				res.m += this.planet[i].res.m;
				res.c += this.planet[i].res.c;
				res.d += this.planet[i].res.d;
			}
			return res;
		}; 
	} 
	var transit = new Transit();
	
	function getPlanet(posi) { 
		for (var i = 0; i < DATA.planet.length; i++)
			if (DATA.planet[i].posi == posi)
				return DATA.planet[i];
		return null;
	} 
	
	function getClass(way, isFleet) { 
		var show = (isFleet ? options.overview.showFleet[way] : options.overview.showResources[way]);
		return (show ? 'visible' : 'invisible');
	} 
	
	function getName(span, type, getFirst) { 
		var name = '', index = 0;
		try {
			index = (getFirst ? span.innerHTML.indexOf(NAME_LIMIT) : span.innerHTML.lastIndexOf(NAME_LIMIT));
			name = span.innerHTML.substr(0, index);
			name = name.substr(name.lastIndexOf(TEXT.overview.mission.from[type]) + TEXT.overview.mission.from[type].length);
		} catch (e) {
			name = '';
		}
		return name;
	} 
	
	function getPlayerName(span, type, getFirst) { 
		var reg = new RegExp(" ([^ ]*) (<a href=\"#\" onclick=\"showMessageMenu\\([0-9]+\\)\").*></a>", "ig");
		res = reg.exec(span.innerHTML);
		if (res)
			return res[2] + ' title="Ecrire un message">' + res[1] + '</a>';
		else
			return '';
	} 
	
	var m = 0, c = 0, d = 0;
	var sMission, sMission, sSource, sDest, sFleet, sStyle, sWay, sPlayer;
	var spans, span, a;
	var aSource, aDest;
	
	spans = findPath('//tr[@class="flight" or @class="return" or @class="holding"]/th/span');
	for (var i = 0; i < DATA.fleet.length; i++) { 
		span = $(spans[i]);
		sMission = '';
		sSource = '';
		sPlayer = '';
		sDest = '';
		sFleet = '';
		sStyle = '';
		sWay = '';
		aSource = (1, 1, 1);
		aDest = (1, 1, 1);
		
		with(DATA.fleet[i]) {
			if (options.overview.showTotalResources || options.overview.changeFleetsMessage) {
				planet = transit.getPlanet(to.posi);
				if (!planet) {
					transit.planet.push(new Planet());
					planet = transit.planet[transit.planet.length - 1];
					planet.posi = to.posi;
					planet.type = to.type;
					planet.name = getName(span, to.type, false);
				}
				if (planet.end < end && (resource.m || resource.c || resource.d))
					planet.end = end;
				planet.res.m += resource.m;
				planet.res.c += resource.c;
				planet.res.d += resource.d;
			}
			
			if (options.overview.changeFleetsMessage) {
				sMission = TEXT.overview.mission.type[mission.type.replace('own', '')];
				if (!sMission) continue;
				
				aSource = getCoord(from.posi);
				aDest = getCoord(to.posi);
				
				if (aSource[2] == 16)
					sMission = TEXT.overview.mission.type.expedition;
				else if (from.type != 'cdr')
					sSource = getName(span, from.type, true);
					
				if (aDest[2] == 16)
					sMission = TEXT.overview.mission.type.expedition;
				else if (to.type != 'cdr')
					sDest = getName(span, to.type, false);
						
				if (mission.type.indexOf('own') == -1)
					sPlayer = getPlayerName(span, from.type, true);	
					
				for (var j = 0; j < TAG.fleet.length; j++)
					if (ships[TAG.fleet[j]]) {
						if (sFleet) sFleet += ', ';
						sFleet += ships[TAG.fleet[j]].toStr() + ' ' + TAG.fleet[j];
					}
		
		        if (options.overview.changeFleetsMessage) {
				    span.$C('');
				    span.innerHTML += sMission;
				    span.innerHTML += TEXT.overview.from + TEXT.overview.mission.from[from.type] + ' ' + (sSource ? sSource + ' ' : '') + (sPlayer ? ' (' + sPlayer + ') ' : '');
				    span.addElem('a', {href: 'javascript:showGalaxy(' + aSource[0] + ',' + aSource[1] + ',' + aSource[2] + ');'}, from.posi);
				    span.innerHTML += TEXT.overview.to + TEXT.overview.mission.from[to.type] + ' ' + (sDest ? sDest + ' ' : '');
				    span.addElem('a', {href: 'javascript:showGalaxy(' + aDest[0] + ',' + aDest[1] + ',' + aDest[2] + ');'}, to.posi);
				    span.innerHTML += " (" + TEXT.overview.mission.way[mission.way] + ")";
				    if (sFleet) {
					    span.addElem('br');
					    span.addElem('a', {href: '#', class: 'visible', onclick: 'setDetailsVisible("detailsFleet' + i + '");'}, TEXT.empire.fleets)
						    .addElem('span', {class: getClass(mission.way, true), id: 'detailsFleet' + i}, " : " + sFleet);
				    }
				    if (resToString(resource)) {
					    span.addElem('br');
					    span.addElem('a', {href: '#', class: 'visible', onclick: 'setDetailsVisible("detailsRes' + i + '");'}, TEXT.empire.resources)
						    .addElem('span', {class: getClass(mission.way, false), id: 'detailsRes' + i}, " : " + resToString(resource));
				    }
				}
			}
		}
	}
	
	if (options.overview.showTotalResources) { 
		var td, table, tr, res, a, planet, date = new Date();
		
		res = transit.total();
		if (res.isntNull()) {
			td = id_('content').class_('c', 1);
			//On enlève le colspan de la première colonne
			td.$A({colspan: '::remove::'});
			//On ajoute une nouvelle colonne (avec colspan 3).
			td = addElem(td.parentNode, 'td', {colspan: 3, class: 'c'});
			//on ajoute le lien affichant le transit total (et le détail lors du clic).
			a = td.addElem('a', {href: '#', class: 'visible', 
				onmouseover: 'return overlib("<font color=white><b>Cliquez pour afficher/masquer le détails.</b></font>");',
				onmouseout: 'return nd();'}, ' (En transit (total) : ' + res.toString() + ')')
				.$E({click: function() {
					var t = id_('transit');
					t.$A({class: (t.$A('class') ? '::remove::' : 'invisible')});
				}});
			
			tr = insElem(td.parentNode.nextSibling, 'tr', {id: 'transit', class: 'invisible'});
			td = tr.addElem('th', {colspan: 4, style: 'background-color: transparent; border-color: transparent;'});
			
			//Puis on ajoute chaque transit (si ceux-ci ne sont pas vides).
			table = td.addElem('table', {style: 'text-align: center; width: 100%; margin: 5px 0px;'});
			tr = table.addElem('tr');
			tr.addElem('td', {rowspan: 2, class: 'c'}, 'Destination');
			tr.addElem('td', {colspan: 3, class: 'c'}, 'Ressources en vol');
			tr.addElem('td', {colspan: 3, class: 'c'}, 'Ressources à l\'arrivée');
			tr = table.addElem('tr');
			tr.addElem('td', {class: 'c'}, 'Métal');
			tr.addElem('td', {class: 'c'}, 'Cristal');
			tr.addElem('td', {class: 'c'}, 'Deutérium');
			tr.addElem('td', {class: 'c'}, 'Métal');
			tr.addElem('td', {class: 'c'}, 'Cristal');
			tr.addElem('td', {class: 'c'}, 'Deutérium');
			
			for(var i = 0; i < transit.planet.length; i++)
				with (transit.planet[i]) {
					if (!res.isntNull()) continue;
					
					planet = (type == 'planet' ? getPlanet(posi) : null);
					
					tr = table.addElem('tr');
					tr.addElem('th', {}, TEXT.overview.mission.from[type] + name + ' ' + posi);
					tr.addElem('th', {}, res.m.toStr());
					tr.addElem('th', {}, res.c.toStr());
					tr.addElem('th', {}, res.d.toStr());
					if (planet) {
						planet.majStock(end);
						tr.addElem('th', {}, Math.floor(planet.resource.stock.m + res.m).toStr());
						tr.addElem('th', {}, Math.floor(planet.resource.stock.c + res.c).toStr());
						tr.addElem('th', {}, Math.floor(planet.resource.stock.d + res.d).toStr());
					} else {
						tr.addElem('th', {}, '-');
						tr.addElem('th', {}, '-');
						tr.addElem('th', {}, '-');
					}
				}
		}
	} 
	
	//recherche des images de planètes
	if (options.showLinkMenu) {
		var links = $(findPath('//a[img and contains(@href,"&cp=")]'));
		var index = -1, id = '';
		
		for (var i = 0; i < links.length; i++) {
			index = -1;
			id = $A(links[i], 'href');
			id = id.substr(id.indexOf('cp=') + 3);
			
			for (var j = 0; j < DATA.planet.length; j++)
				if (DATA.planet[j].id == id) {
					index = j;
					break;
				}
			if (index == -1) continue;
			if (options.planetImages[index])
				links[i].childNodes[0].src = options.planetImages[index];
			else
				options.planetImages[index] = $A(links[i].childNodes[0], 'src');

		}
		
		//planète active
		var img = findPath('//img[@width="200" and @height="200"]')[0];
		index = -1;
		id = DATA.activ().id;
		for (var j = 0; j < DATA.planet.length; j++)
			if (DATA.planet[j].id == id) {
				index = j;
				break;
			}
		if (index != -1) {
			if (options.planetImages[index] == '')
				img.src = options.planetImages[index].replace('small/s_', '/');
			else {
				options.planetImages[index] = $A(img, 'src');
				var k = options.planetImages[index].indexOf('planeten/') + ('planeten/').length;
				options.planetImages[index] = options.planetImages[index].substr(0, k) + 'small/s_' + options.planetImages[index].substr(k);
			}
		}

		options.save_({'planetImages': options.planetImages});
	}
	
	tag_('head').addElem('script', {language: "JavaScript", type: 'text/javascript'}, FN_VISIBILITY);
	GM_addStyle('\n.visible { font-size: ' + options.textSize + '; display: inline; }'
	   + '\n.invisible { display: none; }');
}

/*========*\
|  EMPIRE  |
\*========*/

function empire() {
	var FN_VISIBILITY = '\nfunction hideRows(index) {\n'
		+ '  var table = document.getElementById("content").getElementsByTagName("table")[0];\n'
		+ '  if (!table) return;\n'
		+ '  for(var i = index + 1; i < table.rows.length; i++) {\n'
			+ '    if (table.rows[i].cells[0].getAttribute("class") == "c") break;\n'
			+ '    if (table.rows[i].getAttribute("style"))\n'
				+ '      table.rows[i].setAttribute("style", "");\n'
			+ '    else\n'
				+ '      table.rows[i].setAttribute("style", "display: none;");\n'
		+ '  }\n'
	+ '}\n';
	
	var table, index, rowSpan, txt, th, header;
	var indexRess, indexBat, indexRech, indexFleet, indexDef;

	//Récupère les index des entêtes.
	function getIndexes() {
		for (var i = 1; i < table.rows.length; i++) {
			th = table.rows[i].cells[0];
			if (th.getAttribute('class') == 'c') {
				if (th.innerHTML == TEXT.empire.resources)
					indexRess = i;
				else if (th.innerHTML == TEXT.empire.building)
					indexBat = i;
				else if (th.innerHTML == TEXT.empire.research)
					indexRech = i;
				else if (th.innerHTML == TEXT.empire.fleets)
					indexFleet = i;
				else if (th.innerHTML == TEXT.empire.defence)
					indexDef = i;
			}
		}
	}
	
	table = id_('content').tag_('table');
	if (!table) return;
	
	function addResourceRow(iRowIndex, iCoef, sResource, sHint, bHideHourlyProd) {
		var tr = insElem(table.rows[iRowIndex], 'tr', {title: sHint});
		var prod = 0, totalProd = 0;
		var calcProd = false;
		var td, a;
		
		for (var i = 0; i < DATA.planet.length + 1; i++) {
			if (i == DATA.planet.length)
				prod = totalProd;
			else {
				prod = DATA.planet[i].resource.prod[sResource] * iCoef;
				totalProd += prod;
				calcProd = calcProd || DATA.planet[i].calcProd;
			}

			if (bHideHourlyProd) {
				if (i != DATA.planet.length)
					$(table.rows[iRowIndex - 1].cells[i + 1]).tag_('a').$A({style: 'color: lime;'});
				else
					$(table.rows[iRowIndex - 1].cells[i + 1]).$A({style: 'color: lime;'});
				td = table.rows[iRowIndex - 1].cells[i + 1];
				td.innerHTML = td.innerHTML.substring(0, i == DATA.planet.length ? td.innerHTML.indexOf('&nbsp;') : td.innerHTML.indexOf('/ '));
			}
				
			a = tr.addElem('th', {width: '75px', style: 'font-size:' + options.textSize + '; color: silver !important;'}).addElem('a', {}, prod.toStr());

			if (i != DATA.planet.length) {
				a.$A({href: 'index.php?page=resources&session=' + session + '&cp=' + DATA.planet[i].id});
				if (DATA.planet[i].calcProd)
					a.$A({style: 'color: red !important;'});
			}
			else if (calcProd)
				a.$A({style: 'color: red !important;'});
		}
	}
	function addTransportRow() {
		var r = insElem(table.rows[indexRess + 5], 'tr', {height: '20'});
		r.addElem('th', {width: '75'}, TEXT.empire.total);
		
		var iProd = 0, totalProd = 0;
		for (var i = 0; i < DATA.planet.length + 1; i++) {   
			if (i == DATA.planet.length)
				iProd = totalProd;
			else {
				with(DATA.planet[i].resource)
					iProd = prod.m * 24 + prod.c * 24 + prod.d *24;
				totalProd += iProd; 			}
			
			var th = r.addElem('th', {width: '75px'}, iProd.toStr() + ' ');
			if (i != DATA.planet.length)
				th.addElem('a', {href: 'index.php?page=flotten1&session=' + session
					+ '&mode=Flotte&cp=' + DATA.planet[i].id}, '(' + Math.ceil(iProd / 25000) + ')');
		}
	}
	function addConstructionTimeRow() {
		var r = insElem(table.rows[indexBat + 1], 'tr', {height: '20'});
		var building = false;
		r.addElem('th', {width: '75'}, TEXT.empire.constructTime);
		
		var iProd = 0, totalProd = 0;
		for (var i = 0; i < DATA.planet.length + 1; i++) {
			if (i != DATA.planet.length && DATA.planet[i].building.build.end > 0) {
				r.addElem('th', {width: '75px', style: 'font-size: ' + options.textSize + 'px;'},
					formatDate(options.dateFormat, new Date(DATA.planet[i].building.build.end * 1000), true));
				building = true;
			} else
				r.addElem('th', {}, '-');
		}

		if (!building)
			r.parentNode.removeChild(r);
	}
	
	rowSpan = (options.empire.showHourlyProd ? 1 : 0) + (options.empire.showDailyProd ? 1 : 0)
		+ (options.empire.showWeeklyProd ? 1 : 0) + (options.empire.showMonthlyProd ? 1 : 0);
	if (rowSpan > 0)
		rowSpan++;

	getIndexes();
	addTransportRow();
	
	//Deutérium
	if(options.empire.showMonthlyProd)
		addResourceRow(indexRess + 4, 24 * 30, 'd', TEXT.empire.monthlyProd);
	if(options.empire.showWeeklyProd)
		addResourceRow(indexRess + 4, 24 * 7, 'd', TEXT.empire.weeklyProd);
	if(options.empire.showDailyProd)
		addResourceRow(indexRess + 4, 24, 'd', TEXT.empire.dailyProd);
	if(options.empire.showHourlyProd)
		addResourceRow(indexRess + 4, 1, 'd', TEXT.empire.hourlyProd, true);
	$A(table.rows[indexRess + 3].getElementsByTagName('th')[0], {rowSpan: rowSpan});
	//Cristal
	if(options.empire.showMonthlyProd)
		addResourceRow(indexRess + 3, 24 * 30, 'c', TEXT.empire.monthlyProd);
	if(options.empire.showWeeklyProd)
		addResourceRow(indexRess + 3, 24 * 7, 'c', TEXT.empire.weeklyProd);
	if(options.empire.showDailyProd)
		addResourceRow(indexRess + 3, 24, 'c', TEXT.empire.dailyProd);
	if(options.empire.showHourlyProd)
		addResourceRow(indexRess + 3, 1, 'c', TEXT.empire.hourlyProd, true);
	$A(table.rows[indexRess + 2].getElementsByTagName('th')[0], {rowSpan: rowSpan});
	//Métal
	if(options.empire.showMonthlyProd)
		addResourceRow(indexRess + 2, 24 * 30, 'm', TEXT.empire.monthlyProd);
	if(options.empire.showWeeklyProd)
		addResourceRow(indexRess + 2, 24 * 7, 'm', TEXT.empire.weeklyProd);
	if(options.empire.showDailyProd)
		addResourceRow(indexRess + 2, 24, 'm', TEXT.empire.dailyProd);
	if(options.empire.showHourlyProd)
		addResourceRow(indexRess + 2, 1, 'm', TEXT.empire.hourlyProd, true);
	$A(table.rows[indexRess + 1].getElementsByTagName('th')[0], {rowSpan: rowSpan});

	getIndexes();
	addConstructionTimeRow();
	
	table.$A({'style': 'width: 100%;'});
	if (options.empire.hidePlanetImages) {
		for (var i = 1; i < table.rows.length; i++)
			if (!table.rows[i].cells[0].innerHTML) {
				for(var j = 0; j < DATA.planet.length; j++) {
					th = $(table.rows[i + 1].cells[j + 1]);
					th.$C('');
					th.addElem('a', {href: 'index.php?page=overview&session=' + session + '&cp=' + DATA.planet[j].id}, DATA.planet[j].name);
				}
				$C(table.rows[i + 1].cells[DATA.planet.length + 1], TEXT.empire.sum);
				table.rows[i].setAttribute('style', 'display: none;');
				break;
			}
	} else
		for (var i = 1; i < table.rows.length; i++)
			if (!table.rows[i].cells[0].innerHTML) {
				for(var j = 0; j < table.rows[i].cells.length; j++) {
					$A(table.rows[i].cells[j], {style: '::remove::'});
					if (options.showLinkMenu && options.planetImages[j - 1] != '' && j > 0 && j <= DATA.planet.length)
						$(table.rows[i].cells[j]).tag_('img').src = options.planetImages[j - 1];
				}
				break;
			}

	
	if(options.empire.mergeResearchColumn) {
	    var table, row, cell, labs, higher;
	    var i, index = -1;
	    
	    function sortByLevel(a, b) { return b.level - a.level; }
	    function sortByIndex(a, b) { return a.index - b.index; }
	    function total() {
	        var total = 0;
	        for (i = 0; i < labs.length; i++)
	            if (labs[i].reseau)
	                total += labs[i].level;
	        return total;
	    }
	    
	    table = id_('content').tag_('table');
	    //Recherche de l'indice de la ligne de recherche.
	    for (i = 0; i < table.rows.length; i++)
		    if (table.rows[i].cells[0].innerHTML == TEXT.empire.research) {
			    index = i;
			    break;
		    }
		
		//Récupération des informations sur les labo de chaque planète.
		labs = new Array();
		for (i = 0; i < DATA.planet.length; i++)
		    labs[i] = {index: i, level: DATA.planet[i].building.lab, reseau: false};
		//Tri par niveau pour définir les labos mis en réseau.
		labs.sort(sortByLevel);
		for (i = 0; i < DATA.techno.rese + 1; i++)
		    labs[i].reseau = true;
		higher = labs[0].index;
		
		//Insertion de la ligne des labos.
		labs.sort(sortByIndex);
		row = insElem(table.rows[index + 1], 'tr', {height: '20'});
		row.addElem('th', {width: '75'}, TXT.lab);
		for (i = 0; i < labs.length; i++) 
		    row.addElem('th', {width: '75', style: (labs[i].reseau ? 'color: lime;' : '')}, (labs[i].level > 0 ? labs[i].level : '-'));
		row.addElem('th', {width: '75', title: 'Niveau total des laboratoires mis en réseau'}, total());
		index++;
	    
		//Suppression de toutes les cellules à l'exception des 2 premières. Lien vers le laboratoire le plus haut.
		count = DATA.planet.length + 2;
		while (++index < table.rows.length && table.rows[index].cells[0].innerHTML != TEXT.empire.fleets) {
		    for (i = DATA.planet.length + 1; i > 1; i--)
		        table.rows[index].deleteCell(i);
		    table.rows[index].cells[0].setAttribute('colspan', Math.ceil(count / 2));
		    table.rows[index].cells[1].setAttribute('colspan', Math.floor(count / 2));
		    txt = table.rows[index].cells[1].innerHTML;
		    table.rows[index].cells[1].innerHTML = txt.replace(DATA.planet[0].id, DATA.planet[higher].id);
		}
	}
	
	if (options.empire.showTabs) {    	
	    function RowVisibility(ress, bat, rech, fleet, def) {
	        //Réaffiche toutes les lignes sinon le tableau table.rows ne contient que les lignes visibles
	        var rows = id_('content').tag_('tr', -1);
	        for (var i = indexRess + 1; i < rows.length; i++)
	            $A(rows[i], {style: '::remove::'});
    	    //Affiche/Masque les lignes en fonction de leur index
	        for (var i = indexRess + 1; i < table.rows.length; i++) {
			    if (i > indexRess && i < indexBat)
			        $A(table.rows[i], {style: (ress ? '' : 'display: none;')});
			    else if (i >= indexBat && i < indexRech)
			        $A(table.rows[i], {style: (bat ? '' : 'display: none;')});
			    else if (i >= indexRech && i < indexFleet)
			        $A(table.rows[i], {style: (rech ? '' : 'display: none;')});
			    else if (i >= indexFleet && i < indexDef)
			        $A(table.rows[i], {style: (fleet ? '' : 'display: none;')});
			    else if (i >= indexDef)
			        $A(table.rows[i], {style: (def ? '' : 'display: none;')});
		    }
	    }
    	
		getIndexes();

    	//Modifie la 1ère cellule
	    th = $(table.rows[indexRess].cells[0]);
	    th.$A({colspan: 2, align: 'center'});
	    th.$C('');
	    th.addElem('a', {href: '#'}, TEXT.empire.resources + ' / ' + TEXT.empire.building)
	        .$E({click: function() {
	            RowVisibility(true, true, false, false, false);
	        }});
	        
    	//Ajoute la cellule "Recherche"
	    th = addElem(table.rows[indexRess], 'td', {class: 'c', colspan: 2, align: 'center'});
	    th.addElem('a', {href: '#'}, TEXT.empire.research)
	        .$E({click: function() {
	            RowVisibility(false, false, true, false, false);
	        }});
	        
    	//Ajoute la cellule "Vaisseaux / Défense"
	    th = addElem(table.rows[indexRess], 'td', {class: 'c', colspan: 2, align: 'center'});
	    th.addElem('a', {href: '#'}, TEXT.empire.fleets + ' / ' + TEXT.empire.defence)
	        .$E({click: function() {
	            RowVisibility(false, false, false, true, true);
	        }});
	        
    	//Réglage du colspan restant
	    th = addElem(table.rows[indexRess], 'td', {class: 'c', colspan: DATA.planet.length - 4}, '&nbsp;');
	    
    	//Affichage des "Ressources / Bâtiments" par défaut
	    RowVisibility(true, true, false, false, false);
	} else {
	    //Mise en place des liens d'affichage/masquage
	    for(var i = 4; i < table.rows.length; i++) {
		    th = $(table.rows[i].cells[0]);
		    if (th.$A('class') == 'c') {
		        if (index == -1) index = i;
			    txt = th.innerHTML;
			    th.$C('');
			    th.addElem('a', {href:'#', onclick: 'hideRows(' + i + ');', onmouseout: 'return nd();',
				    onmouseover: 'return overlib("<font color=white><b>' + TEXT.empire.showHideRows + '</b></font>");'}, txt);
		    }
	    }
    	
	    tag_('head').addElem('script', {language: "JavaScript", type: 'text/javascript'}, FN_VISIBILITY);
	}
}

/*==========*\
|  BUILDING  |
\*==========*/

function building() {
	var table, td, reg, result;
	table = id_('content').tag_('table', 1);

	with (DATA.activ()) {
		var prod, conso, calc1, calc2, lvl;
		var reg = new RegExp('gid=([0-9]{1,2})"'/*'(<a.*gid=([0-9]{1,2}).*<br>).*[\.m]{1}<br>'*/, '');
		var energy = resource.stock.e - getConso('mmet', building.mmet) - getConso('mcri', building.mcri) - getConso('mdet', building.mdet);
		
		for (var i = 0; i < table.rows.length; i++) {
			td = $(table.rows[i].cells[table.rows[i].cells.length == 3 ? 1 : 0]);
			if (td.childNodes.length < 2) continue;

			prod = '';
			conso = '';
			switch (td.childNodes[0].href.substr(td.childNodes[0].href.lastIndexOf('=') + 1, 2)) {
				case '1': //mmet
					lvl = building.mmet;
					calc1 = getProd('mmet', building.mmet + 1);
					calc2 = resource.prod.m;
					prod = TEXT.building.production + calc1.toStr() + ' (' + calc2.toStr() + ' + ' + (calc1 - calc2).toStr() + ')';
					calc1 = getConso('mmet', building.mmet + 1);
					calc2 = getConso('mmet', building.mmet);
					conso = TEXT.building.consumption + calc1.toStr() + ' (' + calc2.toStr() + ' + ' + (calc1 - calc2).toStr() + ') => ' 
						+ (energy - calc1 + calc2).toStr();
					break;
				case '2': //mcri
					lvl = building.mcri;
					calc1 = getProd('mcri', building.mcri + 1);
					calc2 = resource.prod.c;
					prod = TEXT.building.production + calc1.toStr() + ' (' + calc2.toStr() + ' + ' + (calc1 - calc2).toStr() + ')';
					calc1 = getConso('mcri', building.mcri + 1);
					calc2 = getConso('mcri', building.mcri);
					conso = TEXT.building.consumption + calc1.toStr() + ' (' + calc2.toStr() + ' + ' + (calc1 - calc2).toStr() + ') => ' 
						+ (energy - calc1 + calc2).toStr();
					break;
				case '3': //mdet
					lvl = building.mdet;
					calc1 = getProd('mdet', building.mdet + 1);
					calc2 = resource.prod.d;
					prod = TEXT.building.production + calc1.toStr() + ' (' + calc2.toStr() + ' + ' + (calc1 - calc2).toStr() + ')';
					calc1 = getConso('mdet', building.mdet + 1);
					calc2 = getConso('mdet', building.mdet);
					conso = TEXT.building.consumption + calc1.toStr() + ' (' + calc2.toStr() + ' + ' + (calc1 - calc2).toStr() + ') => ' 
						+ (energy - calc1 + calc2).toStr();
					break;
				case '4': //ces
					lvl = building.ces;
					calc1 = getProd('ces', building.ces + 1);
					calc2 = getProd('ces', building.ces);
					prod = TEXT.building.production + calc1.toStr() + ' (' + calc2.toStr() + ' + ' + (calc1 - calc2).toStr() + ') => '
						+ (energy + calc1 - calc2).toStr();
					break;
				case '12': //cef
					lvl = building.cef;
					calc1 = getProd('cef', building.cef + 1);
					calc2 = getProd('cef', building.cef);
					prod = TEXT.building.production + calc1.toStr() + ' (' + calc2.toStr() + ' + ' + (calc1 - calc2).toStr() + ') => '
						+ (energy + calc1 - calc2).toStr();
					calc1 = getConso('cef', building.cef + 1);
					calc2 = getConso('cef', building.cef);
					conso = TEXT.building.consumption + calc1.toStr() + ' (' + calc2.toStr() + ' + ' + (calc1 - calc2).toStr() + ') => '
						+ (resource.prod.d - calc1 + calc2).toStr();
					break;
				case '14': //rob
					lvl = building.rob;
					prod = TEXT.building.timeGained + ' (' + TEXT.building.building + ') : ' 
						+ getTime(building.rob + 1, building.nan);
					break;
				case '15': //nan
					lvl = building.nan;
					prod = TEXT.building.timeGained + ' (' + TEXT.building.building + ', ' + TEXT.building.fleet + TEXT.building.and + TEXT.building.defence + ') : 50%' 
					break;
				case '21': //cspa
					lvl = building.cspa;
					prod = TEXT.building.timeGained + ' (' + TEXT.building.fleet + TEXT.building.and + TEXT.building.defence + ') : ' 
						+ getTime(building.cspa + 1, building.nan);
					break;
				case '22': //hmet
					lvl = building.hmet;
					calc1 = getStock(building.hmet + 1);
					calc2 = getStock(building.hmet);
					prod = TEXT.building.stock + calc1.toStr() + 'k (' + calc2.toStr() + 'k + ' + (calc1 - calc2).toStr() + 'k)';
					break;
				case '23': //hcri
					lvl = building.hcri;
					calc1 = getStock(building.hcri + 1);
					calc2 = getStock(building.hcri);
					prod = TEXT.building.stock + calc1.toStr() + 'k (' + calc2.toStr() + 'k + ' + (calc1 - calc2).toStr() + 'k)';
					break;
				case '24': //hdet
					lvl = building.hdet;
					calc1 = getStock(building.hdet + 1);
					calc2 = getStock(building.hdet);
					prod = TEXT.building.stock + calc1.toStr() + 'k (' + calc2.toStr() + 'k + ' + (calc1 - calc2).toStr() + 'k)';
					break;
				case '31': //lab
					lvl = building.lab;
					prod = TEXT.building.timeGained + ' (' + TEXT.building.research + ') : ' + getResearch(DATA.activ());
					break;
				case '33': //ter
					lvl = building.ter;
					prod = TEXT.building.cells + getCases(ceil.max, building.ter + 1, false) + ' (+4)';
					break;
				case '34': //depo
					lvl = building.depo;
					calc1 = (building.depo + 1) * 10000;
					calc2 = building.depo * 10000;
					prod = TEXT.building.deliver + calc1.toStr() + 'd (' + calc2.toStr() + 'd + 10.000d)';
					break;
				case '41': //base
					lvl = building.base;
					prod = TEXT.building.cells + getCases(ceil.max, building.base + 1, true) + ' (+3)';
					break;
				case '42': //phal
					lvl = building.phal;
					calc1 = getScope('phal', building.phal + 1);
					calc2 = getScope('phal', building.phal);
					prod = TEXT.building.scope + calc1.toStr() + ' (' + calc2.toStr() + ' + ' + (calc1 - calc2).toStr() + ')';
					break;
				case '44': //silo
					lvl = building.silo;
					calc1 = getMissiles(building.silo + 1);
					calc2 = getMissiles(building.silo);
					prod = TEXT.building.capacity + calc1 + ' (' + calc2 + ' + 5mip/10mic)<br />'
						+ TEXT.research.mipscope + getScope('mip', DATA.techno.impu);
					break;
			}

			if (options.building.supprDef) {
				td.removeChild(td.childNodes[lvl ? 3 : 2]);
				td.removeChild(td.childNodes[lvl ? 3 : 2]);
			}

			if (options.building.supprImg) {
				td.parentNode.removeChild(td.parentNode.cells[0]);
				td.$A({colspan: 2});
			}

			if (options.building.showInfo) {
				if (prod)
					prod = '<label style="color: lime !important; font-weight: normal !important;">' + prod + '</label><br />';
				if (conso)
					conso = '<label style="color: red !important; font-weight: normal !important;">' + conso + '</label><br />';
				
				insElem(td.childNodes[lvl ? 3 : 2], 'span', {}, prod + conso);
			}
		}
	}

	if (options.calc.show) {
		var span, txt;
		reg = new RegExp("(?:>([0-9\.]+)<|\"-([0-9\.]+)\")", "ig"); //

		function toCalc(m, c, d) {
			calc.set_(m, c, d);
		}

		function setLink(td) {
			var total = {m: -1, c: -1, d: -1};
			var missing = {m: -1, c: -1, d: -1};

			while (result = reg.exec(td.innerHTML)) {
				if (result[1]) {
					if (total.c != -1)
						total.d = result[1].toNum();
					else if (total.m != -1)
						total.c = result[1].toNum();
					else
						total.m = result[1].toNum();
				} else if (result[2]) {
					if (total.c != -1)
						missing.d = result[2].toNum();
					else if (total.m != -1)
						missing.c = result[2].toNum();
					else
						missing.m = result[2].toNum();
				}
			}

			span = td.addElem('span', {style: 'display: block;'}, 'Calculette : ');
			span.addElem('a', {href: '#'}, 'total').$E({click: function () { calc.set_(total.m, total.c, total.d); }});
			if (missing.m > -1 || missing.c > -1 || missing.d > -1) {
				span.addElem('label', {}, ', ');
				span.addElem('a', {href: '#'}, 'manquant').$E({click: function () { toCalc(missing.m, missing.c, missing.d); }});
			}
		}

		for (var i = 0; i < table.rows.length; i++)
			if (table.rows[i].cells[table.rows[i].cells.length == 3 ? 1 : 0].childNodes.length > 1)
				setLink($(table.rows[i].cells[table.rows[i].cells.length == 3 ? 1 : 0]));
	}
}

/*==========*\
|  RESEARCH  |
\*==========*/

function research() {
	var table, td, bonus = '', lvl = 0;

	table = id_('content').tag_('table', 1);
	for (var i = 0; i < table.rows.length; i++) {
		td = $(table.rows[i].cells[1]);
		if (td.childNodes.length < 2) continue;

		bonus  = '';
		console.info(td.childNodes[0].href.substr(td.childNodes[0].href.lastIndexOf('=') + 1, 3));
		with (DATA.techno)
			switch (td.childNodes[0].href.substr(td.childNodes[0].href.lastIndexOf('=') + 1, 3)) {
				case '106': //'espi'
					console.info('espi');
					lvl = espi;
					break;
				case '108': //'ordi'
					lvl = ordi;
					bonus = TEXT.research.computer + (ordi + 2) + ' (' + (ordi + 1) + ' + 1)';
					break;
				case '109': //'arme'
					lvl = arme;
					bonus = TEXT.research.power + ((arme + 1) * 10) + '% (' + (arme * 10) + '% + 10%)';
					break;
				case '110': //'bouc'
					lvl = bouc;
					bonus = TEXT.research.shield + ((bouc + 1) * 10) + '% (' + (bouc * 10) + '% + 10%)';
					break;
				case '111': //'prot'
					lvl = prot;
					bonus = TEXT.research.structure + ((prot + 1) * 10) + '% (' + (prot * 10) + '% + 10%)';
					break;
				case '113': //'ener'
					lvl = ener;
					break;
				case '114': //'hype'
					lvl = hype;
					break;
				case '115': //'comb'
					lvl = comb;
					bonus = TEXT.research.speed + ((comb + 1) * 10) + '% (' + (comb * 10) + '% + 10%)';
					break;
				case '117': //'impu'
					lvl = impu;
					bonus = TEXT.research.speed + ((impu + 1) * 20) + '% (' + (impu * 20) + '% + 20%)<br />'
						+ TEXT.research.mipscope + getScope('mip', impu + 1) + ' (' + getScope('mip', impu) + ' + 5)';
					break;
				case '118': //'phyp'
					lvl = phyp;
					bonus = TEXT.research.speed + ((phyp + 1) * 30) + '% (' + (phyp * 30) + '% + 30%)';
					break;
				case '120': //'lase'
					lvl = lase;
					break;
				case '121': //'ions'
					lvl = ions;
					break;
				case '122': //'plas'
					lvl = plas;
					break;
				case '123': //'rese'
					lvl = rese;
					break;
				case '124': //'expe'
					lvl = expe;
					bonus = TEXT.research.expeCount + Math.ceil((expe + 1) / 2)
						+ ' (' +  Math.ceil(expe / 2) + ' + ' + ((expe + 1) % 2 ? 1 : 0) + ')'
						+ '<br />'
						+ TEXT.research.expeLength + (expe + 1) + 'h (' + expe + 'h + 1h)';
					break;
				case '199': //'grav'
					lvl = grav;
					break;
			}

		if (options.research.supprDef) {
			td.removeChild(td.childNodes[lvl ? 3 : 2]);
			td.removeChild(td.childNodes[lvl ? 3 : 2]);
		}

		if (options.research.supprImg) {
			td.parentNode.removeChild(td.parentNode.cells[0]);
			td.$A({colspan: 2});
		}

		if (options.research.showInfo && bonus) {
			bonus = '<label style="color: lime !important; font-weight: normal !important;">' + bonus + '</label><br />';
			insElem(td.childNodes[lvl ? 3 : 2], 'span', {}, bonus);
		}
	}

	if (options.research.moveCurrentResearchRow && id_('bxx')) {
		var running = id_('bxx').parentNode.parentNode;
		if (!running) return;
		
		running.parentNode.insertBefore(running, running.parentNode.rows[1]);
	}
}

/*=======*\
|  FLEAT  |
\*=======*/

function selectContinue() {
	var inputs = id_('content').tag_('input', -1);
	for (var i = 0; i < inputs.length; i++)
		if (inputs[i].type == 'submit' && inputs[i].value == 'Continuer') {
			inputs[i].focus();
			break;
		}
}

function flotten1() {
	function setNeededShip() {
		var total = 0;
		with (DATA.activ().resource.stock)
			total = m + c + d;
		
		var input202 = name_('ship202');
		var input203 = name_('ship203');
		if (input203)
			input203.$A({value: Math.ceil(total / 25000)});
		else if (input202)
			input202.$A({value: Math.ceil(total / 5000)});
		
		selectContinue();
	}
	
	var auto = GM_getValue(server + DATA.player.name + 'dailyTransport', 0);
	var elm = id_('content').tag_('table', 2).class_('c');
	elm.addElem('label', {style: 'float: right;'}).addElem('a', {id: 'dailyTransport', href: '#', style: 'color: ' + (auto ? 'lime' : 'red'), title: TEXT.fleet.hint}, 
		TEXT.fleet.dailyTransport + (auto ? TEXT.fleet.on : TEXT.fleet.off)).$E({click: function () {
			auto = !auto;
			GM_setValue(server + DATA.player.name + 'dailyTransport', auto);
			var a = id_('dailyTransport');
			if (a) {
				a.$C(TEXT.fleet.dailyTransport + (auto ? TEXT.fleet.on : TEXT.fleet.off));
				a.$A({style: 'color: ' + (auto ? 'lime' : 'red')});
			}
			setNeededShip();
		}});
	
	if (auto)
		setNeededShip();

	if (calc)
		calc.showFlotten1();
}

function flotten2() {
	var auto = GM_getValue(server + DATA.player.name + 'dailyTransport', 0);
	if (auto) {
		id_('content').tag_('td').addElem('label', {style: 'float: right; color: lime'}, TEXT.fleet.dailyTransport + TEXT.fleet.on);
		with (options.homePlanet) {
			tag_('body').$A({onload: 'onBodyLoad(); setTarget(' + galaxy + ',' + system + ',' + planet + ',' + planetType + '); shortInfo();'});
		}
	}
		
	selectContinue();
}

function flotten3() {
	var auto = GM_getValue(server + DATA.player.name + 'dailyTransport', 0);
	if (auto) {
		id_('content').tag_('td').addElem('label', {style: 'float: right; color: lime'}, TEXT.fleet.dailyTransport + TEXT.fleet.on);
		tag_('body').$A({onload: 'onBodyLoad(); maxResources();'});
		var elm = $(findPath('//input[@value="3"]')[0]);
		elm.$A({checked: "checked"});
		
		selectContinue();
	}

	var inputs = id_('content').tag_('input', -1);
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].getAttribute('type') == 'text') {
			$E(inputs[i], {keyup: function (e) {
				this.value = this.value.replace(/k/ig, '000').replace(/m/ig, '000000');
			}});
		}
	}

	if (calc)
		calc.showFlotten3();
}

/*=====================*\
|  SHIPYARD / DEFENSES  |
\*=====================*/

function ShipyardDefenses(isFleet) {
	//Constructeurs
	function Construction() {
		this.pt = 0;
		this.gt = 0;
		this.cle = 0;
		this.clo = 0;
		this.crois = 0;
		this.vb = 0;
		this.vc = 0;
		this.rec = 0;
		this.esp = 0;
		this.bomb = 0;
		this.ss = 0;
		this.dest = 0;
		this.edlm = 0;
		this.traq = 0;
		this.lm = 0;
		this.lle = 0;
		this.llo = 0;
		this.gauss = 0;
		this.ion = 0;
		this.pla = 0;
		this.pb = 0;
		this.gb = 0;
		this.mic = 0;
		this.mip = 0;
	}
	function Item(nb, struct, shield, power, speed) {
		this.nb = (nb > 0 ? nb : 0);
		this.power = (power || 0) * arme;
		this.shield = (shield || 0) * bouc;
		this.struct = (struct || 0) * prot;
		this.speed = (speed || 0);

		this.totalPower = function () { return this.nb * this.power; }
		this.totalShield = function () { return this.nb * this.shield; }
		this.totalStruct = function () { return this.nb * this.struct; }
		this.getRatio = function () { return this.totalPower() + this.totalShield() + this.totalStruct(); }
	}
	
	//Variables publiques
	this.isFleet = isFleet;
	this.planet = DATA.activ();
	//Variables privées
	var that = this;
	var running = new Construction();
	var built = new Construction();
	var coef = new Construction();
	var need = new Construction();
	var highestCoef = 0;
	var tags = (this.isFleet ? TAG.fleet : TAG.defence);
	var costs = (this.isFleet ? COST.fleet : COST.defence);
	var arme = 1 + (DATA.techno.arme * 10 / 100);
	var bouc = 1 + (DATA.techno.bouc * 10 / 100);
	var prot = 1 + (DATA.techno.prot * 10 / 100);
	var energy = 0;
	
	//Fonctions privées
	function getBuilt() {
		with (that.planet) {
			built.pt = fleet.pt;
			built.gt = fleet.gt;
			built.cle = fleet.cle;
			built.clo = fleet.clo;
			built.crois = fleet.crois;
			built.vb = fleet.vb;
			built.vc = fleet.vc;
			built.rec = fleet.rec;
			built.esp = fleet.esp;
			built.bomb = fleet.bomb;
			built.ss = fleet.ss;
			built.dest = fleet.dest;
			built.edlm = fleet.edlm;
			built.traq = fleet.traq;
			built.lm = defence.lm;
			built.lle = defence.lle;
			built.llo = defence.llo;
			built.gauss = defence.gauss;
			built.ion = defence.ion;
			built.pla = defence.pla;
		}
	}
	
	function getRunning() {
		with ((that.isFleet ? that.planet.fleet : that.planet.defence))
			for (i = 0; i < build.length; i++)
				running[build[i].tag] += build[i].number;
	}
	
	function getCoef(tag) {
		if (options.defence.line[tag] && built[tag])
			coef[tag] = (built[tag] + running[tag]) / options.defence.line[tag];
	}
	
	function showNeeded(tag) {
		var r, td, a, span;
		
		r = findPath('//tr[td/a/@href="index.php?page=infos&session=' + session + '&gid=' + BAU[tag] + '"]')[0];
		if (!r) return;
		
		td = r.cells[1];
		if (running[tag]) {
			td.innerHTML = td.innerHTML.replace('<br>', '<label style="color: lime;"> +' + + running[tag].toStr() + ' = ' 
				+ (built[tag] + running[tag]).toStr() + '</label><br />');
		}
			
		td = $(r.cells[2]);
		if (!this.isFleet && options.defence.calcMissing) {
			need[tag] = Math.ceil(options.defence.line[tag] * highestCoef) - built[tag] - running[tag];
			if(need[tag]) {
				a = td.addElem('a', {href: 'javascript:setMax(' + BAU[tag] + ', ' + need[tag] + ');',
					onmouseover: 'return overlib("<font color=white><b>' + TEXT.construction.hint + '</b></font>");',
					onmouseout: 'return nd();'},
					'<br>(' + TEXT.construction.missing + need[tag].toStr() + ')');
			}
		}
	}
		
	function initCost(tag) {
		var input, span, res, i, links;

		function initLink(link) {
			$E(link, {click: function () {
				var qte = link.href.replace('javascript:setMax(' + BAU[tag] + ',%20', '').replace(');', '');
				page.inputChanged(tag, qte);
			}});
		}
		
		input = name_('fmenge[' + BAU[tag] + ']');
		if (!input) return;
		
		addElem(input.parentNode, 'br');
		addElem(input.parentNode, 'span', {id: 'cost' + tag});
		input.$E({keyup: function () { page.inputChanged(tag, this.value); }});
		
		links = input.parentNode.getElementsByTagName('a');
		for(var j = 0; j < links.length; j++)
			initLink(links[j]);
	}
	
	//Fonction publique
	this.inputChanged = function (tag, qte) {
		span = id_('cost' + tag);
		if (!span) return;
		
		span.$C('');
		res = getCost(tag, qte);
		if (res.toString())
			span.$C(TEXT.construction.cost + res.toString()
				+ (tag == 'ss' ? '<br /><label style="color: lime;">' + TEXT.building.production + '+' + getProd(tag, qte).toStr() 
				+ ' => ' + (energy + getProd(tag, qte)).toStr() + '</label>' : ''));
		delete res;
	}

	this.showConstruction = function () {
		var i;
		
		getBuilt();
		getRunning();
		
		if (this.isFleet)
			for (i = 0; i < TAG.fleet.length; i++)
				showNeeded(TAG.fleet[i]);
		else {
			if (options.defence.calcMissing) {
				for (i = 0; i < 6; i++)
					getCoef(TAG.defence[i]);
				highestCoef = Math.ceil(Math.max(coef.lm, coef.lle, coef.llo, coef.gauss, coef.ion, coef.pla));
			}
			
			for (i = 0; i < TAG.defence.length; i++)
				showNeeded(TAG.defence[i]);
		}
	}

	this.showCost = function () {		
		for(i = 0; i < tags.length; i++) {
			initCost(tags[i]);
		}
	}

	this.showInfo = function () {
		var total = 0, totalPower = 0, totalShield = 0, totalStruct = 0, totalPoint = 0;
		var ratio = 0, maxRatio = 0, sumRatio = 0;
		var maxUnit = '-';

		if ((this.isFleet && !options.fleet.showInfo && !options.fleet.showStat) || (!this.isFleet && !options.defence.showInfo && !options.defence.showStat))
			return;

		var stat = {
			pt: new Item(this.planet.fleet.pt, 4000, 10, 5, (DATA.techno.impu > 4 ? 10000 : 5000)),
			gt: new Item(this.planet.fleet.gt, 12000, 25, 5, 7500),
			cle: new Item(this.planet.fleet.cle, 4000, 10, 50, 12500),
			clo: new Item(this.planet.fleet.clo, 10000, 25, 150, 10000),
			crois: new Item(this.planet.fleet.crois, 27000, 50, 400, 15000),
			vb: new Item(this.planet.fleet.vb, 60000, 200, 1000, 10000),
			vc: new Item(this.planet.fleet.vc, 30000, 100, 50, 2500),
			rec: new Item(this.planet.fleet.rec, 16000, 10, 1, 2000),
			esp: new Item(this.planet.fleet.esp, 1000, 0, 0, 100000000),
			bomb: new Item(this.planet.fleet.bomb, 75000, 500, 1000, (DATA.techno.phyp > 7 ? 5000 : 4000)),
			ss: new Item(this.planet.fleet.ss, 2000, 1, 1),
			dest: new Item(this.planet.fleet.dest, 110000, 500, 2000, 5000),
			edlm: new Item(this.planet.fleet.edlm, 9000000, 50000, 200000, 100),
			traq: new Item(this.planet.fleet.traq, 70000, 400, 700, 10000),
			lm: new Item(this.planet.defence.lm, 2000, 20, 80),
			lle: new Item(this.planet.defence.lle, 2000, 25, 100),
			llo: new Item(this.planet.defence.llo, 8000, 100, 250),
			gauss: new Item(this.planet.defence.gauss, 35000, 200, 1100),
			ion: new Item(this.planet.defence.ion, 8000, 500, 150),
			pla: new Item(this.planet.defence.pla, 100000, 300, 3000),
			pb: new Item(this.planet.defence.pb, 20000, 2000, 1),
			gb: new Item(this.planet.defence.gb, 100000, 10000, 1),
			mic: new Item(this.planet.defence.mic, 0, 0, 0),
			mip: new Item(this.planet.defence.mip, 0, 0, 0)
		};

		for (var i = 0; i < tags.length; i++) {
			if (!stat[tags[i]]) continue;

			totalPoint += getPoint(tags[i], stat[tags[i]].nb);
			if (tags[i] != 'ss' && tags[i] != 'pb' && tags[i] != 'gb' && tags[i] != 'mic' && tags[i] != 'mip') {
				total += stat[tags[i]].nb;

				ratio = stat[tags[i]].getRatio();
				sumRatio += ratio;
				if (ratio && ratio >= maxRatio) {
					maxRatio = ratio;
					maxUnit = TXT[tags[i]];
				}
			}
			if (tags[i] != 'mic' && tags[i] != 'mip') {
				totalPower += stat[tags[i]].totalPower();
				totalShield += stat[tags[i]].totalShield();
				totalStruct += stat[tags[i]].totalStruct();
			}			
		}

		var table, td, reg, result, item, txt, pourcent;
		var reg = new RegExp('(<a.*gid=([0-9]{3}).*)<br>.*[\.]{1}<br>', '');

		table = id_('content').tag_('table', 1);
		if ((this.isFleet && options.fleet.showInfo) || (!this.isFleet && options.defence.showInfo)) {
			energy = this.planet.resource.stock.e - getConso('mmet', this.planet.building.mmet) 
				- getConso('mcri', this.planet.building.mcri) - getConso('mdet', this.planet.building.mdet);
			for (var i = 1; i < table.rows.length - 1; i++) {
				item = '';
				pourcent = '';
				td = $(table.rows[i].cells[1]);
				result = reg.exec(td.innerHTML);
				if (result)
					switch (result[2]) {
						case '202': item = 'pt'; break;
						case '203': item = 'gt'; break;
						case '204': item = 'cle'; break;
						case '205': item = 'clo'; break;
						case '206': item = 'crois'; break;
						case '207': item = 'vb'; break;
						case '208': item = 'vc'; break;
						case '209': item = 'rec'; break;
						case '210': item = 'esp'; break;
						case '211': item = 'bomb'; break;
						case '212': item = 'ss'; break;
						case '213': item = 'dest'; break;
						case '214': item = 'edlm'; break;
						case '215': item = 'traq'; break;
						case '401': item = 'lm'; break;
						case '402': item = 'lle'; break;
						case '403': item = 'llo'; break;
						case '404': item = 'gauss'; break;
						case '405': item = 'ion'; break;
						case '406': item = 'pla'; break;
						case '407': item = 'pb'; break;
						case '408': item = 'gb'; break;
						case '502': item = 'mic'; break;
						case '503': item = 'mip'; break;
					}
				
				if (item == 'mic' || item == '')
					txt = '';
				else if (item == 'ss')
					txt = '<label style="color: lime !important; font-weight: normal !important;">' + TEXT.building.production + getProd(item, 1) + '</label><br />';
				else if (item == 'mip')
					txt = '<label style="color: lime !important; font-weight: normal !important;">' + TEXT.building.scope + getScope(item, DATA.techno.impu) + '</label><br />';
				else {
					pourcent = (stat[item].nb && item != 'ss' && item != 'pb' && item != 'gb' ? ' ' + (Math.floor((stat[item].nb * 100 / total) * 100) / 100) + '%' : '');
					txt = '<label>'
						+ TEXT.info.power + stat[item].power.toStr() + '<br />'
						+ TEXT.info.struct + stat[item].struct.toStr() + '<br />'
						+ TEXT.info.shield + stat[item].shield.toStr()
						+ (stat[item].speed ? '<br />' + TEXT.info.speed + (stat[item].speed * (1 + DATA.techno[SEARCH[item]] * SEARCH[SEARCH[item]] / 100)).toStr() : '')
						+ '</label><br />';
					if (stat[item].nb == 1 && (item == 'pb' || item == 'gb')) {
						txt += td.parentNode.cells[2].innerHTML + '<br />';
						td.parentNode.cells[2].innerHTML = '';
					}
				}

				td.innerHTML = td.innerHTML.replace(reg, '<label>$1' + pourcent + '</label><br />' + txt);
			}
		}

		if ((this.isFleet && options.fleet.showStat) || (!this.isFleet && options.defence.showStat)) {
			if (isFleet)
				total += stat.ss.nb;
			else
				total += stat.mip.nb + stat.mic.nb + stat.gb.nb + stat.pb.nb;

			tr = insElem(table.rows[0], 'tr');
			tr.addElem('td', {class: 'c', colspan: 3}, 'Défenses');
			tr = insElem(table.rows[0], 'tr', {style: 'text-align: center;'});
			tr.addElem('td', {class: 'l'}, Math.round(totalPower).toStr());
			tr.addElem('td', {class: 'l'}, Math.round(totalStruct).toStr());
			tr.addElem('td', {class: 'l'}, Math.round(totalShield).toStr());
			tr = insElem(table.rows[0], 'tr', {style: 'text-align: center; font-weight: bold;'});
			tr.addElem('td', {class: 'l'}, TEXT.info.power.replace(':', ''));
			tr.addElem('td', {class: 'l'}, TEXT.info.struct.replace(':', ''));
			tr.addElem('td', {class: 'l'}, TEXT.info.shield.replace(':', ''));
			tr = insElem(table.rows[0], 'tr', {style: 'text-align: center;'});
			tr.addElem('td', {class: 'l'}, total.toStr());
			tr.addElem('td', {class: 'l'}, maxUnit);
			tr.addElem('td', {class: 'l'}, totalPoint.toStr());
			tr = insElem(table.rows[0], 'tr', {style: 'text-align: center; font-weight: bold;'});
			tr.addElem('td', {class: 'l'}, 'Nombre d\'unités');
			tr.addElem('td', {class: 'l'}, 'Unité dominante');
			tr.addElem('td', {class: 'l'}, 'Points');
			tr = insElem(table.rows[0], 'tr');
			tr.addElem('td', {class: 'c', colspan: 3}, 'Statistiques');
		}
	}
}

/*=========*\
|  OPTIONS  |
\*=========*/

function optionsPage() {
	var elm = name_('dpath');
	elm.insElem('a', {}, 'Skin 1 ').$E({
		click: function () {
			name_('dpath').$A({value: options.skins.skin1});
		}
	});
	elm.insElem('a', {}, 'Skin 2').$E({
		click: function () {
			name_('dpath').$A({value: options.skins.skin2});
		}
	});
	elm.insElem('br');
}

/*============*\
|  STATISTICS  |
\*============*/

function statistics() {
	if (!options.statistics.showColor) return;

	var table = id_('content').tag_('table', 1);
	var tr, name, i, j, friends, allies;

	friends = new Array();
	for (i = 0; i < DATA.list.friends.length; i++)
		friends[i] = DATA.list.friends[i].name;
	allies = new Array();
	for (i = 0; i < DATA.list.allymember.length; i++)
		allies[i] = DATA.list.allymember[i].name;

	for (i = 1; i < table.rows.length; i++) {
		tr = table.rows[i];
		name = tr.cells[1].childNodes[1].innerHTML.trim();

		if (DATA.player.name == name)
			for (j = 0; j < tr.cells.length; j++) {
				$A(tr.cells[j], {style: 'background-color: darkgoldenrod !important; color: yellow !important;'});
				if (tr.cells[j].innerHTML.trim() != '' && (j == 1 || j == 3))
					$A(tr.cells[j].childNodes[1], {style: 'color: yellow !important;'});
			}
		
		if (friends.indexOf(name) > -1)
			for (j = 0; j < tr.cells.length; j++) {
				$A(tr.cells[j], {style: 'background-color: green !important; color: lime !important;'});
				if (tr.cells[j].innerHTML.trim() != '' && (j == 1 || j == 3 ))
					$A(tr.cells[j].childNodes[1], {style: 'color: lime !important;'});
			}
		
		if (allies.indexOf(name) > -1)
			for (j = 0; j < tr.cells.length; j++) {
				$A(tr.cells[j], {style: 'background-color: navy !important; color: aqua !important;'});
				if (tr.cells[j].innerHTML.trim() != '' && (j == 1 || j == 3))
					$A(tr.cells[j].childNodes[1], {style: 'color: aqua !important;'});
			}
	}
}

/*===========*\
|  LINK MENU  |
\*===========*/

function showLinkMenu() {
	/*var planetImages = GM_getValue('planetImages' + server + DATA.player.name, '');
	if (!planetImages) return;
	planetImages = JSON.parse(planetImages);*/

	if (options.planetImages.length == 0) return;
	
	var div, div2, a, url, moon, moonImage;
	
	moonImage = options.planetImages[0].substr(0, options.planetImages[0].indexOf('small/') + ('small/').length) + 's_mond.jpg';
	
	div = addElem(document.body, 'div', {style: 'top: 5px; right: 5px; height: 100%; width: 120px; overflow: auto; position: fixed; z-index: 400; text-align: center;'});
	for(var i = 0; i < DATA.planet.length; i++) {
		moon = null;
		url = 'http://' + server + '/game/index.php?page=' + page + '&session=' + session 
			+ '&cp=' + DATA.planet[i].id + '&mode=' + (mode != 'none' ? mode : '') + '&gid=&messageziel=&re=0';
			
		div2 = div.addElem('div', {style: 'width: 100%; margin:5px 0px;'});
		a = div2.addElem('a', {href: url}, DATA.planet[i].name + '<br />' + DATA.planet[i].posi + '<br />');
		a.addElem('img', {src: options.planetImages[i], style: 'width: 50px; height: 50px;'});
		if (DATA.planet[i] == DATA.activ()) {
			a.$A({style: 'color: lime;'});
			options.indexImage = i;
		}
			
		if (DATA.planet[i].moonid != -1) {
			for(var j = 0; j < DATA.moon.length; j++)
				if (DATA.moon[j].id == DATA.planet[i].moonid) {
					moon = DATA.moon[j];
					break;
				}
			if (!moon) return;
			
			url = 'http://' + server + '/game/index.php?page=' + page + '&session=' + session 
				+ '&cp=' + moon.id + '&mode=' + (mode != 'none' ? mode : '') + '&gid=&messageziel=&re=0';
			div2 = div2.addElem('div', {style: 'float: right; margin:5px 0px;'});
			a = div2.addElem('a', {href: url}, moon.name);
			a.addElem('br');
			a.addElem('img', {src: moonImage, style: 'width: 20px; height: 20px;'});
			if (moon == DATA.activ())
				a.$A({style: 'color: lime;'});
		}
	}
	id_('content').$A({style: 'width: 75%'});

	$(id_('header_top').tag_('table', 1).rows[0].cells[0]).tag_('img').src = options.planetImages[options.indexImage];
}

/*===============*\
|  DECLENCHEMENT  |
\*===============*/

var url = document.URL;
var page;

if (options.showLinkMenu && url.indexOf('page=imperium') == -1
	&& url.indexOf('page=notizen') == -1
	&& url.indexOf('page=galaxy') == -1
	&& url.indexOf('page=bericht') == -1)
	showLinkMenu();

if (options.calc.show || options.notes.show)
	GM_addStyle('.oopdiv { width: 110px; margin-top: 10px; background-color: #344566; border: 1px solid #415680; }\n'
		+ '.oopdiv .titre { font-weight: bold; background-color: #242F45; }\n'
		+ '.oopdiv label { clear: left; float: left; width: 50px; padding-top: 2px; }\n'
		+ '.oopdiv input[type="text"] { width: 60px; }\n'
		+ '.oopdiv span { display: block; padding-top: 2px; padding-bottom: 2px; }\n'
		+ '.oopdiv textarea { width: 100%; height: 100px; }\n');


if (options.calc.show && url.indexOf('page=bericht') == -1) {
	calc = new Calc();
	calc.show();
}

if (options.notes.show && url.indexOf('page=bericht') == -1)
	showNotes();

if (url.indexOf('page=overview') > -1)
	overview();
else if (url.indexOf('page=imperium') > -1 && url.indexOf('planettype=3') == -1)
	empire();
else if (url.indexOf('page=b_building') > -1)
	building();
else if (url.indexOf('page=buildings') > -1 && url.indexOf('mode=Forschung') > -1)
	research();
else if (url.indexOf('page=buildings') > -1 && url.indexOf('mode=Flotte') > -1) {
	page = new ShipyardDefenses(true);
	page.showConstruction();
	page.showCost();
	page.showInfo();
} else if (url.indexOf('page=flotten1') > -1)
	flotten1();
else if (url.indexOf('page=flotten2') > -1)
	flotten2();
else if (url.indexOf('page=flotten3') > -1)
	flotten3();
else if (url.indexOf('page=buildings') > -1 && url.indexOf('mode=Verteidigung') > -1) {
	page = new ShipyardDefenses(false);
	page.showConstruction();
	page.showCost();
	page.showInfo();
} else if (url.indexOf('page=options') > -1)
	optionsPage();
else if (url.indexOf('page=statistics') > -1)
	statistics();
else if (url.indexOf('page=messages') > -1)
	calc.showSpy();

unsafeWindow.ssu.fun.updateStatus(thisData.namespace, 'activ');