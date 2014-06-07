// ==UserScript==
// @name           Exile menu
// @namespace      http://sheflaprod.free.fr
// @description    Enrichis le menu de navigation pour un accès plus facile aux sous-catégories.
// @include        http://genesis.exile.fr/game/*
// ==/UserScript==

var d = document,
	statut = GM_getValue('exile_menu', false),
	id = [
		'menu_fleets', 'menu_alliance', 'menu_planet', 'menu_shipyard',
		'menu_mails', 'menu_reports', 'menu_help'
	];

if (window.location.href == 'http://genesis.exile.fr/game/overview.asp'){
	statut = d.getElementById('motd') ? 'menu_noalliance' : 'menu_alliance';
	GM_setValue('exile_menu', statut);
}

if (!statut){
	statut = window.confirm(
		"Initialisation du script Exile menu.\n\n"
		 + "Il est nécessaire de visiter la page vue d'ensemble de votre empire.\n"
		 + "Rediriger maintenant?"
	);
	if (statut){ window.location.href ='http://genesis.exile.fr/game/overview.asp'; }
}

function toggleSubMenu(list){
	return function(event){
		event.preventDefault();
		for (var i = 0, l = list.length; i < l; i++){
			list[i].className = (list[i].className.indexOf('hidden') !== -1)
				? list[i].className.replace(/^\s+|hidden|\s+$/g, '')
				: list[i].className + ' hidden ';
		}
	};
};

function createSubMenu(ref, desc){
	var list = [],
	    menu = d.getElementById('leftnav'),
	    end  = ref.nextSibling;
	for (var i = 0, l = desc.length; i < l; i++){
		var span = d.createElement('span'),
		    link = d.createElement('a');
		span.className = 'dot';
		span.textContent = '.';
		link.className = 'menu lvl3 hidden';
		link.href = ref.href + '?' + desc[i].action;
		link.appendChild(span);
		link.appendChild(d.createTextNode(desc[i].label));
		list.push(link);
		menu.insertBefore(link, end);
	}
	return list;
};

if (!!statut){
	for (var i = 0; i < 7; i++){
	    var toggle = current = d.getElementById(id[i]),
	        child = [];
	        /*
	    var plus = d.createElement('span');
		plus.textContent = '+';
		toggle.appendChild(plus);
		*/
	    switch (id[i]){
	    	case 'menu_planet':
				child = createSubMenu(toggle, [
					{ label: 'Vue d\'ensemble', action: 'cat=1' },
					{ label: 'Production',      action: 'cat=2' },
					{ label: 'Fonctionnement',  action: 'cat=3' }
				]);
				break;
			case 'menu_reports':
				child = createSubMenu(toggle, [
					{ label: 'Tout',          action: 'cat=0' },
					{ label: 'Alliance',      action: 'cat=1' },
					{ label: 'Combats',       action: 'cat=2' },
					{ label: 'Développement', action: 'cat=3' },
					{ label: 'Flottes',       action: 'cat=4' },
					{ label: 'Echanges',      action: 'cat=5' },
					{ label: 'Colonisations', action: 'cat=6' },
					{ label: 'Evénements',    action: 'cat=7' }
				]);
				break;
			case 'menu_help':
				child = createSubMenu(toggle, [
					{ label: 'Aide générale', action: '' },
					{ label: 'Construction',  action: 'cat=buildings' },
					{ label: 'Recherche',     action: 'cat=research' },
					{ label: 'Vaisseaux',     action: 'cat=ships' },
					{ label: 'Balises',       action: 'cat=tags' }
				]);
				break;
			default:
				while (current.nextSibling.className.indexOf('lvl3') !== -1){
					current = current.nextSibling;
					if (id[i] != 'menu_alliance' || current.id.indexOf(statut) === -1){
						child.push(current);
					}
				}
		}
		toggle.addEventListener('click', toggleSubMenu(child), false);
		//plus.addEventListener('click', toggleSubMenu(child), false);
	}
}