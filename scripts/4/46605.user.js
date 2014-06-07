// ==UserScript==
// @name				Facebook is cool
// @namespace		http://apps.facebook.com/is_cool/*
// @description	Send and receive points from Is Cool automatically just going on Is Cool page
// @include			*apps.facebook.com/is_cool/*
// ==/UserScript==
//
//Paramètres : 
// people_to_send_to_exclude		: tableau des noms des personnes auxquelles ne pas envoyer de points
// dont_send_points					: si true, n'envoie aucun points, sinon false
// choose_random_to_not_send		: si true, choisit aléatoirement à qui ne pas envoyer de points, sinon false
//
// people_to_receive_to_exclude		: tableau des noms des personnes desquelles ne pas recevoir de points
// dont_receive_points					: si true, ne reçoit aucun points, sinon false
// choose_random_to_not_receive		: si true, choisit aléatoirement de qui ne pas recevoir de points, sinon false
//
// timeout								: délai avant de cliquer (en secondes)
// random_timeout						: si true, choisi aléatoirement le délai avant de cliquer, sinon false
// max_timeout							: valeur maxi du timeout (en secondes)


/******************/
/*** Paramètres ***/
/******************/
//personnes auxquelles ne pas envoyer de points
var people_to_send_to_exclude;
people_to_send_to_exclude = [
	'exemple 1', 'exemple 2'
];

//true : ne pas envoyer de points, false sinon
var dont_send_points = false;

//true : choisir aléatoirement à qui ne pas envoyer de points
var choose_random_to_not_send = false;

//personnes de qui ne pas recevoir de points
var people_to_receive_to_exclude;
people_to_receive_to_exclude = [
	'exemple 1', 'exemple 2'
];

//true : ne pas recevoir de points, false sinon
var dont_receive_points = false;

//true : choisir aléatoirement de qui ne pas recevoir de points
var choose_random_to_not_receive = false;

//délai avant de cliquer
var timeout = 0;

var random_timeout = true;
var min_timeout = 2;
var max_timeout = 15;
/******************/
/******************/
/******************/


var profilLink = "http://www.facebook.com/profile.php?id=";
var current_langage = '';

var texts	= {
	texts_clic:{
		"fr_FR":'Clic dans #seconds#', 
		"en_EN":'Click in #seconds#'
	},
	texts_receive:{
		"fr_FR":'Bientôt +#points#',
		"en_EN":'Soon +#points#'
	},
	texts_send:{
		"fr_FR":'#points# à envoyer', 
		"en_EN":'#points# to send'
	}
};

var people = [];
var getPoints = 0, sendPoints = 0;
var element_to_send = false, element_to_receive = false;
var ids_people_to_send_to_exclude = [], ids_people_to_receive_to_exclude = [];

var mode_send = "send", mode_receive = "receive";
//mode par défaut (utiliser la première fois)
var click_mode_default = mode_receive;



/**************************/
/*** Méthodes générales ***/
/**************************/
function appendElement(node,tag,id,class,htm) 
{
	var ne = document.createElement(tag);
	if (id) 
		ne.id = id;
	if (class) 
		ne.className = class;
	if (htm) 
		ne.innerHTML = htm;
	else
		ne.innerHTML = '';
	node.appendChild(ne);
// 	node.replaceChild(ne);
}

function removeElement(node, id) 
{
	var elt = document.getElementById(id);
	node.removeChild(elt);
}

function EcrireCookie(nom, valeur)
{
	var argv		= EcrireCookie.arguments;
	var argc		= EcrireCookie.arguments.length;
	var expires	= (argc > 2) ? argv[2] : null;
	var path		= (argc > 3) ? argv[3] : null;
	var domain	= (argc > 4) ? argv[4] : null;
	var secure	=(argc > 5) ? argv[5] : false;
	
	document.cookie = nom + "=" + escape(valeur) +
		((expires==null) ? "" : ("; expires=" + expires.toGMTString())) +
		((path==null) ? "" : ("; path=" + path)) +
		((domain==null) ? "" : ("; domain=" + domain)) +
		((secure==true) ? "; secure" : "");
}

function getCookieVal(offset)
{
	var endstr	= document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function LireCookie(nom)
{
	var arg	= nom + "=";
	var alen	= arg.length;
	var clen	= document.cookie.length;
	var i = 0;
	while (i < clen)
	{
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return getCookieVal(j);
		i = document.cookie.indexOf(" ",i) + 1;
		if (i == 0)
			break;
	}
	return null;
}

function EffaceCookie(nom)
{
	var date = new Date;
	date.setFullYear(date.getFullYear() - 1);
	EcrireCookie(nom, null, date);
}

//Retourne un nombre entier entre min et max (inclus)
function Int_Random(val_min, val_max)
{
	return parseInt(val_min + (Math.random() * (val_max - val_min)));
	
}

//Retourne vrai si search_val est dans tab, faux sinon
function In_Array(search_val, tab)
{
	for (current_index_tab in tab)
	{
		if (tab[current_index_tab] == search_val)
			return true;
	}
	return false;
}
/**************************/
/**************************/
/**************************/


/****************************/
/*** Méthodes spécifiques ***/
/****************************/
function load_People()
{
	var submit_element, submitok_element;
	
	//on charge tout les identifiants
	var idProfil, people_type, nb_people_to_send = 0, nb_people_to_receive = 0;
	for (var num_form = 0 ; num_form < document.forms.length ; num_form++)
	{
		var formu = document.forms[num_form];
		for (var num_element = 0 ; num_element < formu.elements.length ; num_element++)
		{
			current_element = formu.elements[num_element];
			
			if (current_element.type == 'checkbox')
			{
				idProfil = 0;
				if (current_element.name == 'box[]')
				{
					people_type = 'to_send';
					nb_people_to_send++;
					idProfil = current_element.value;
				}
				else if (current_element.name.match(/accept\[.*\]/))
				{
					people_type = 'to_receive';
					nb_people_to_receive++;
					idProfil = current_element.name.replace(/accept\[/, '').replace(/\]/, '');
				}
				
				if (idProfil > 0)
					people[people.length] = {
							'idProfil':idProfil, 
							'nom':'',
							'type':people_type, 
							'status':'', 
							'id_input':current_element.id,
							'profil_link':profilLink + idProfil
					};
			}
			else
			{
				if (current_element.name == "submit")
					element_to_receive = current_element;
				else if (current_element.name == "submitok")
					element_to_send = current_element;
				else if (current_element.name == "fb_sig_locale")
					current_langage = current_element.value;
			}
		}
	}
	
	if (choose_random_to_not_send == true)
		ids_people_to_send_to_exclude = get_ids_random_people('to_send', nb_people_to_send);

	if (choose_random_to_not_receive == true)
		ids_people_to_receive_to_exclude = get_ids_random_people('to_receive', nb_people_to_receive);

	find_names();
	set_status();
	count_points()
}

//Initialise ids_people_to_send_to_exclude avec les identifiants des personnes à exclure
//type_people : 'to_send' ou 'to_receive'
function get_ids_random_people(type_people, nb_people)
{
	var nb_people_to_choose = Int_Random(0, nb_people);
	var ids = [], indexes = [], index_people;
	
	for (var num = 0 ; num < nb_people_to_choose ; num++)
	{
		//on vérifie que l'index choisi n'est pas deja utilisé
		do
		{
			index_people = Int_Random(0, people.length - 1);
		}
		while (In_Array(index_people, indexes) == true || people[index_people]['type'] != type_people)
		
		indexes[indexes.length] = index_people;
		ids[ids.length] = people[index_people]['idProfil'];
	}
	
	return ids;
}

//trouve les noms des personnes stockées dans le tableau people
function find_names()
{
	for (var num_elt_a = 0 ; num_elt_a < document.getElementsByTagName("a").length ; num_elt_a++)
	{
		element_a = document.getElementsByTagName("a")[num_elt_a];
		
		for (var num_people = 0 ; num_people < people.length ; num_people++)
		{
			idProfil = people[num_people]['idProfil'];
			if (element_a.href == profilLink + idProfil)
			{
				if (people[num_people]['nom'] == '')
				{
					people[num_people]['nom'] = element_a.innerHTML;
				}
				break;
			}
		}
	}
}

//initialise le statut des personnes trouvées
function set_status()
{
	for (num_people in people)
	{
		if (people[num_people]['type'] == 'to_send')
		{
			if (
				dont_send_points == true ||
				In_Array(people[num_people]['nom'], people_to_send_to_exclude) == true ||
				In_Array(people[num_people]['idProfil'], ids_people_to_send_to_exclude) == true
			)
				people[num_people]['status'] = 'exclude';
		}
		else if (people[num_people]['type'] == 'to_receive')
		{
			if (
				dont_receive_points == true ||
				In_Array(people[num_people]['nom'], people_to_receive_to_exclude) == true ||
				In_Array(people[num_people]['idProfil'], ids_people_to_receive_to_exclude) == true
			)
				people[num_people]['status'] = 'exclude';
		}
		
	}
}

//compte les points à recevoir et à envoyer dans getPoints et sendPoints respectivement
function count_points()
{
	for (num_people in people)
	{
		if (people[num_people]['status'] != 'exclude')
		{
			if (people[num_people]['type'] == 'to_send')
				sendPoints++;
			else if (people[num_people]['type'] == 'to_receive')
				getPoints++;
		}
	}
}

//décoche les personnes à exclure
function unchecked_people_to_exclude()
{
	var idProfil, nom;
	for (num_people in people)
		document.getElementById(people[num_people]['id_input']).checked = (people[num_people]['status'] != 'exclude');
}

//fixe aléatoirement le timeout
function set_random_timeout()
{
	timeout = Int_Random(min_timeout, max_timeout);
}

function action_method()
{
	//on décoche celles à qui ne pas envoyer
	unchecked_people_to_exclude();
	
	//mode à utiliser pour ce passage
	var current_click_mode;
	
	if ((current_click_mode = LireCookie("click_mode")) == null)
		current_click_mode = click_mode_default;
	EffaceCookie("click_mode");
	
	if (
		element_to_receive != false ||
		element_to_send != false
	)
	{
		if (element_to_receive == false || getPoints == 0)
			current_click_mode = mode_send;
		else if (element_to_send == false || sendPoints == 0)
			current_click_mode = mode_receive;

		var nb_points = 0;
		if (current_click_mode == mode_receive)
			nb_points = getPoints;
		else if (current_click_mode == mode_send)
			nb_points = sendPoints;
		
		var text_points = nb_points + ' point' + (nb_points > 1 ? 's' : '');
		
		var text = '';
		if (current_click_mode == mode_receive)
		{
			text = texts["texts_receive"][current_langage].replace('#points#', text_points);
			
			appendElement(document.getElementsByClassName('fb_menu_list')[0], 'li', '', 'fb_menu', '<div class="fb_menu_title"><a>' + text + '</a></div>');
			
			EcrireCookie("click_mode", mode_send);;
			element_to_receive.click();
			return;
		}
		else if (current_click_mode == mode_send)
		{
			text = texts["texts_send"][current_langage].replace('#points#', text_points);
			
			appendElement(document.getElementsByClassName('fb_menu_list')[0], 'li', '', 'fb_menu', '<div class="fb_menu_title"><a>' + text + '</a></div>');
			
			EcrireCookie("click_mode", mode_receive);
			element_to_send.click();
			return;
		}
	}
	else
	{
		var current_loc = window.location.href;
		window.location.href = current_loc;
	}
}
/****************************/
/****************************/
/****************************/

if (random_timeout == true)
	set_random_timeout();

// var txt = '<span class="Text Dark"><b>J'ai re&ccedil;u <span class="Orange">100</span> points aujourd'hui</b></span><br />';
// appendElement(document.getElementsByClassName('fb_menu_list')[0], 'li', 'id_timeout', 'fb_menu', txt);

timeoutTimer	= null;
startTimeoutTimer	= function()
{
	//on charge les personnes à qui envoyer ou de qui recevoir des points
	load_People();
	
	appendElement(document.getElementsByClassName('fb_menu_list')[0], 'li', 'id_timeout', 'fb_menu', '<div class="fb_menu_title"><a>' + texts["texts_clic"][current_langage].replace('#seconds#', '<span id="js_count">' + timeout + '</span> s') + '</a></div>');
	timeoutTimer		= window.setTimeout(
		function()
		{
			window.clearInterval(intervalTimer);
			removeElement(document.getElementsByClassName('fb_menu_list')[0], 'id_timeout');
			action_method();
		}, timeout * 1000
	);
	intervalTimer = window.setInterval(
		function()
		{
			t=parseInt(document.getElementById('js_count').innerHTML) - 1;
			document.getElementById ('js_count').innerHTML = t
		}, 1000
	);
};
startTimeoutTimer();
