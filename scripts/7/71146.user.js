// ==UserScript==
// @name           EpiSkin
// @namespace      Clement
// @description    Skin pour l'intra d'Epitech (Feat Axone)
// @version		   2.3
// @include        htt*://*epitech.*/intra/*
// ==/UserScript==

function getUrlVars() {
	var map = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		map[key] = value;
	});
	return map;
}

function getMarkProj (id) {
 var table_action = document.getElementsByTagName('td')[17];
 table_action.innerHTML = '[<a href="index.php?section=etudiant&page=inscription&action=list&activite_instance_id='+id+'">Inscrits</a>] <a href="index.php?section=etudiant&page=inscription&action=list&activite_instance_id='+id+'&dump=on"><img border="0" src="images/ftp/txt.gif" align="absmiddle"></a>' +
 ':: [<a href="index.php?section=etudiant&page=inscription&action=list&activite_instance_id='+id+'&do=non_inscrits">Non Inscrits</a>] <a href="index.php?section=etudiant&page=inscription&action=list&activite_instance_id='+id+'&dump=on&do=non_inscrits"><img border="0" src="images/ftp/txt.gif" align="absmiddle"></a>' +
 ':: [<a href="index.php?section=etudiant&page=inscription&activite_instance_id='+id+'">Rendu / Groupe</a>]' +
 ':: [<a href="index.php?section=all&page=notes&id='+id+'">Notes</a>]</td>';
}

function getClemWords () {
 var i = Math.floor(Math.random()*111);
 switch (i % 10)
 {
	case 0:
		return ("Manger des nuggets, c'est manger des poussins.<br />Arretes le MacDo !");
		break;
	case 1:
		return ("Mangez du Poulet.");
		break;
	case 2:
		return ("Pas de sequelles !.");
		break;
	case 3:
		return ("Ne pas faire de rendu c'est mal<br />Rendre un main c'est mieux !");
		break;
	case 4:
		return ("Pensez a faire souvent des pauses.");
		break;
	case 5:
		return ("Le cafe c'est bien.");
		break;
	case 6:
		return ("Dorey est un Gay !");
		break;
	case 7:
		return ("Se branler a Epitech est interdit.<br />Allez aux toilettes pour ca.");
		break;
	case 8:
		return ("Essayez de ne pas vous faire Tiger, c'est chiant les TIGs.");
		break;
	default:
		return ("dal-pa_c est une brute en Javacript.");
		break;
 }
}

(function() {

var map = getUrlVars();
if ((map['section'] == 'etudiant' || map['section'] == undefined) && (map['page'] == 'accueil' || map['page'] == undefined))
{
	var med = 0,
	mod = 0,
	aide = 0;
	
	if (document.getElementsByTagName('img')[1].title == "Etudiant remarquable" || document.getElementsByTagName('img')[2].title == "Etudiant remarquable")
		mod = 1;
	if (document.getElementsByTagName('img')[1].title == "Etudiant medaillé" || document.getElementsByTagName('img')[2].title == "Etudiant medaillé")
		med = 1;
	if (document.getElementsByTagName('img')[1].title == "Etudiant en difficulte" || document.getElementsByTagName('img')[2].title == "Etudiant en difficulte")
		aide = 1;
	
	var css_eboard = document.getElementsByTagName('link')[4],
	td_ol = document.getElementsByTagName('td')[14],
	img_sky = document.getElementsByTagName('img')[med+mod+aide+2],
	img_time = document.getElementsByTagName('img')[med+mod+aide+3],
	img_proj = document.getElementsByTagName('img')[med+mod+aide+5],
	img_astek = document.getElementsByTagName('img')[med+mod+aide+6],	
	img_feu = document.getElementsByTagName('img')[med+mod+aide+4],
	img_ol = document.getElementsByTagName('img')[med+mod+aide+1];

	css_eboard.href='http://perso.epitech.eu/~dal-pa_c/my.css';
	img_ol.src='http://perso.epitech.eu/~dal-pa_c/poulet.png';
	td_ol.innerHTML = "<td align='right'><i>Le conseil du jour de Cl&eacute;ment</i><br />"+getClemWords()+"</td>";
	
	switch (img_feu.src)
	{
		case 'https://www.epitech.eu/intra/images/feux_rouge.png':
			img_feu.src='http://perso.epitech.eu/~dal-pa_c/feux_rouge.png';
			break;
		case 'http://www.epitech.eu/intra/images/feux_rouge.png':
			img_feu.src='http://perso.epitech.eu/~dal-pa_c/feux_rouge.png';
			break;
		case 'https://www.epitech.eu/intra/images/feux_orange.png':
			img_feu.src='http://perso.epitech.eu/~dal-pa_c/feux_orange.png';
			break;
		case 'http://www.epitech.eu/intra/images/feux_orange.png':
			img_feu.src='http://perso.epitech.eu/~dal-pa_c/feux_orange.png';
			break;
		default :
			img_feu.src='http://perso.epitech.eu/~dal-pa_c/feux_vert.png';
			break;
	}
	img_astek.src='http://perso.epitech.eu/~dal-pa_c/astek.png';
	img_proj.src='http://perso.epitech.eu/~dal-pa_c/soutenance.png';
	img_sky.src='http://perso.epitech.eu/~dal-pa_c/lightning.png';
	img_time.src='http://perso.epitech.eu/~dal-pa_c/time.jpg';
}

var head = document.getElementsByTagName('head')[0],
    img_pub = document.getElementsByTagName('img')[0],
	style = document.createElement('style'), 
    css = 	'body { color:#4a596f; background-color:#c6c6c6; background-image: url("http://perso.epitech.eu/~dal-pa_c/back.png"); background-repeat:repeat-x; }' +	
			'#logo-top { background:url("http://perso.epitech.eu/~dal-pa_c/logo_epi.png")no-repeat;}' +
			' .content-menu { background-color:#000; background-image: url(./); }' +
			' th.cat2 { background: url("http://perso.epitech.eu/~dal-pa_c/bt_sct2_off.png") no-repeat; }' +
			' th.cat1 { background: url("http://perso.epitech.eu/~dal-pa_c/bt_sct2_off.png") no-repeat; }' +
			' th.cat3 { background: url("http://perso.epitech.eu/~dal-pa_c/bt_sct2_off.png") no-repeat; }' +
			' th.cat1:hover { background: url("http://perso.epitech.eu/~dal-pa_c/bt_sct2_on.png") no-repeat; }' +
			' th.cat2:hover { background: url("http://perso.epitech.eu/~dal-pa_c/bt_sct2_on.png") no-repeat; }' +
			' th.cat3:hover { background: url("http://perso.epitech.eu/~dal-pa_c/bt_sct2_on.png") no-repeat; }' +
			' .table-content-header { background-color: #232b35; }' +
			' .content-header-left { color: #FFFFFF; }' +
			' .content-header-left a { color: #FFF; }' +
			' .content-header-left a:hover, .content-header-left a:visited,  .content-header-right a:hover { color: #FFF; border: 0px solid #717171; }' +
			' .content { background-color: #e9e9e9; }' +
			' .table-footer { background-color:#232b35; }' +
			' td.default0 { background-color: #c6c6c6; } ' +
			' td.default1 {	background-color: #c6c6f0; } ' +
			' th.default { background: #2d3745; } ';

	img_pub.src= "http://perso.epitech.eu/~dal-pa_c/banner.jpg";
	
if (map['page'] == 'projets' && map['action'] == 'voir')
	getMarkProj(map['act_id']);
	
	var li_conf = document.getElementsByTagName('li')[5],
	td_rss = document.getElementById('whatsnewtd'),
	font_cpr = document.getElementsByTagName('font')[0];

	if (li_conf != undefined) li_conf.innerHTML = "<li><a href='http://perso.epitech.eu/~shkurt_j/epirank/'>Classement</a></li><li><a href='index.php?section=elearning&mfrom=etudiant'>E-Learning</a></li>";
	font_cpr.innerHTML = "<font style='process-time'>&nbsp;[<img src='images/flag/fr.gif' border='0' align='absmiddle' alt='francais' title='francais'>]&nbsp;<a href='?section=all&page=lang&lang=en'><img src='images/flag/en.gif' border='0' align='absmiddle' alt='english' title='english'></a>&nbsp; &nbsp; &copy; 2000-2009 Epitech Corporation. Design by <a href='mailto:dal-pa_c@epitech.eu'><b>dal-pa_c</b></a>.</font>";
	if (td_rss != undefined) td_rss.innerHTML = '<td><img src="http://perso.epitech.eu/~dal-pa_c/maj.png" /></td>';
												
	
if (!head || self.location != top.location) {return}
style.type = 'text/css';
try {style.innerHTML = css}
catch(x) {style.innerText = css}
head.appendChild(style);
})();