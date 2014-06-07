// ==UserScript==
// @name           Kings Age - Alertes de nouveaux messages
// @namespace       
// @include        http://s5.kingsage.fr/*
// @exclude        http://s5.kingsage.fr/forum.php*
// @exclude        http://s5.kingsage.fr/map.php*
// @exclude        http://s5.kingsage.fr/help.php*
// ==/UserScript==


tableAlerte = '<table cellspacing="0" cellpadding="0" style="width:185px;"><tr style="background-image:url(img/modern/infobox_back.png); background-position:bottom; background-repeat:repeat-x;"><td style="width:10px; margin:0px; padding:0px;"><img src="http://s5.kingsage.fr/img/modern/infobox_left.png" ></td><td style="width:100px; margin:0px; padding:0px; background:url(http://s5.kingsage.fr/img/modern/infobox_center.png) repeat; color:#543901;"><b>Alertes</b></td><td style="width:11px; margin:0px; padding:0px;"><img src="http://s5.kingsage.fr/img/modern/infobox_right.png" ></td><td style="width:64px; margin:0px; padding:0px;"></td></tr><tr><td style="background:url(img/layout/bg_table_cell.jpg) repeat; border-left:1px solid #BD9D60; border-right:1px solid #BD9D60; border-bottom:1px solid #BD9D60; width:185px; padding:3px 0 3px 0;" colspan="4" align="center">';
			
alerte1 = '<table cellspacing="0" cellpadding="0" style=" width:175px; height:25px; margin-top:3px;" class="noborder"><tr><td style="width:7px; background:url(http://s5.kingsage.fr/img/modern/infocell_left.png) repeat; margin:0px; padding:0px;"></td><td style="width:160px; background:url(http://s5.kingsage.fr/img/modern/infocell_center.png) repeat; margin:0px; padding:0px;">Nouveau post sur le forum !</td><td style="width:8px; margin:0px; padding:0px;"><img src="http://s5.kingsage.fr/img/modern/infocell_right.png" /></td></tr></table>';

alerte2 = '<table cellspacing="0" cellpadding="0" style=" width:175px; height:25px; margin-top:3px;" class="noborder"><tr><td style="width:7px; background:url(http://s5.kingsage.fr/img/modern/infocell_left.png) repeat; margin:0px; padding:0px;"></td><td style="width:160px; background:url(http://s5.kingsage.fr/img/modern/infocell_center.png) repeat; margin:0px; padding:0px;">Nouveau rapport !</td><td style="width:8px; margin:0px; padding:0px;"><img src="http://s5.kingsage.fr/img/modern/infocell_right.png" /></td></tr></table>';

alerte3 = '<table cellspacing="0" cellpadding="0" style=" width:175px; height:25px; margin-top:3px;" class="noborder"><tr><td style="width:7px; background:url(http://s5.kingsage.fr/img/modern/infocell_left.png) repeat; margin:0px; padding:0px;"></td><td style="width:160px; background:url(http://s5.kingsage.fr/img/modern/infocell_center.png) repeat; margin:0px; padding:0px;">Nouveau message priv&eacute;</td><td style="width:8px; margin:0px; padding:0px;"><img src="http://s5.kingsage.fr/img/modern/infocell_right.png" /></td></tr></table>';

function normal(numero) {
	var image = document.getElementsByTagName('img')[numero].src;
	var img_right = 'http://s5.kingsage.fr/img/layout/sc_right.png' ;
	var img_left  = 'http://s5.kingsage.fr/img/layout/sc_left.png';
	var marqueur  = 'http://s5.kingsage.fr/img/layout/sc_marker.png';


	if(  image == img_right || image == img_left || image == marqueur ) {
		return true;
	}
	else {
		return false;
	}
}
var x = 0 ;

if ( !normal(13) ) { tableAlerte += alerte1 ; x = 1; }
if ( !normal(17) || !normal(16) )  { tableAlerte += alerte2 ; x = 1; }
if ( !normal(19) || !normal(20) || !normal(21) ) { tableAlerte += alerte3 ; x = 1; }

tableAlerte += '</td></tr></table>';

divAlerte = '<div id="alerte" style="display:none;position:absolute;z-index:1000;left:0;top:0;"> ' + tableAlerte + '</div>';

document.getElementsByTagName('body')[0].innerHTML += divAlerte;

if (x == 1) {document.getElementById('alerte').style.display = 'block'};