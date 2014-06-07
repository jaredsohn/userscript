// ==UserScript==
// @name                Traviani Superbar (ita)
// @namespace           http://userscripts.org/scripts/show/65147
// @description         Aggiunge una super barra nella parte sinistra dello schermo molto utile... V3.5.8.1
// @version             4.1.0.0
// @include             http://www.traviani.it/game.php*
// @include             http://traviani.it/game.php*
// ==/UserScript==


javascript:void(movementInterval=1)
function toggleAddOn() {
	if ($('interfaceDivAddOn').style.display == 'none') {
		$('interfaceDivAddOn').style.display = 'block';
	} else {
		$('interfaceDivAddOn').style.display = 'none';
	}
}

function addElem(elem, html, attributes, style, parent){
	var aElem = document.createElement(elem);
	if (html) aElem.innerHTML = html;
	if (attributes)	for (a in attributes) aElem.setAttribute(a, attributes[a]);
	if (style) for (a in style) aElem.style[a] = style[a];
	if (!parent) parent = $tags('body')[0];
		else parent = (typeof(parent) == 'string') ? $(parent) : parent;
	if (!parent) return false;
	parent.appendChild(aElem);
	return aElem;
}

function $tags(tag){
	return document.getElementsByTagName(tag);
}

function $(id){
	return document.getElementById(id);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//ICONA ! + TITOLO
var menuinner = '<img style="position: absolute; top: 4px; left: 12px; z-index: 40;" src="img/icons/supporticon_rules.gif" width="17px" height="17px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Apri/chiudi\');" id="addOnMinimizer"/>'+
'<div style="display: none; position: absolute; padding: 2px; top: 0px; left: 5px; width: 220px; height: auto; z-index: 1; background: url(img/chatbg.jpg); text-size: 11px; color: rgb(114, 57, 0); text-align: left;" id="interfaceDivAddOn">'+
'<table class="popupTable" cellspacing="1" celpadding="1"><thead><tr><td colspan="1">Traviani Superbar</td></tr></thead></table>'+
'<a href="http://userscripts.org/scripts/show/65147" target="_blank"><img style="position: absolute; top: 23px; left: 25px; z-index: 40;" src="img/icons/supporticon_house.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Script homepage\');"></a>'+
'<a href="http://redevilserver10.altervista.org/script/traviani_superbar_ita.user.js" target="_blank"><img style="position: absolute; top: 23px; left: 52px; z-index: 40;" src="img/icons/levelup.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Aggiornamento script<br><object data=http://redevilserver10.altervista.org/script/last_version-bar.html type=html></object>\');"></a>'+
'<a href="http://www.traviantrucchi.org/it/viewforum.php?f=56&sid=b6d033fb3602871957df20a4aeef5e2b" target="_blank"><img style="position: absolute; top: 23px; left: 80px; z-index: 40;" src="http://redevilserver10.altervista.org/script/TT_traviani.png" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'<b>Script info</b><br>Traviantrucchi.org è il miglior sito che si occupa dei giochi della TravianGames in italia ed è pronto ad accogliere ogni vostro bisogno.\');"></a>'+
'<a onclick="xajax_showModule(\'mail\',\'new\',\'Leonardo I\',\'\'); return false;"><img style="position: absolute; top: 23px; left: 108px; z-index: 40;" src="img/icons/supporticon_guide.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Script support <br> (Non disponibile per ban)\');"></a>'+
'<img style="position: absolute; top: 23px; left: 138px; z-index: 40;" src="img/icons/supporticon_team.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Script team: <br/>Leonardo I\');">'+
'<a href="http://redevilserver10.altervista.org/script/notizie-bar.html" target="_blank"><img style="position: absolute; top: 23px; left: 166px; z-index: 40;" src="img/icons/supporticon_faq.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'<object data=http://redevilserver10.altervista.org/script/notizie-bar.html type=html></object> \');"></a>'+
'<table class="popupTable" cellspacing="1" celpadding="1" style="width: 220px; height: 25px;><thead><tr><td colspan="1"></td></tr></thead></table>'+
'<a onclick="javascript:void(movementInterval=1); return false;"><img src="img/ani/germane_dogmask_right.gif" style=" position: relative; top: 1px; left: 1px; " width="35" border="0" height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Super Velocit \');"'+
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;"><img src="/img/achievements/Icon_hausundhof2b.gif" width="27" border="0" height="27" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Propria Casa\');"'+
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -3, 0, -61, 0); return false;"><img src="/img/tavern/food0.gif" width="27" border="0" height="27" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Gola Secca\');"'+
'<a onclick="xajax_click(7590, 5223, 7542, 5322, \'fight<<\', BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr); return false;"><img src="/img/achievements/Icon_kampf2b.gif" width="27" border="0" height="27" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Arena\');"'+
'<a onclick="xajax_click(6886, 5311, 6808, 5133, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/icons/chaticon_ress1.gif" style="position: relative; top: -9px" width="55.5" border="0" height="13.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Mercato\');"'+
'<a onclick="xajax_click(6090, 5120, 6015, 5414, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/ani/gallier_flower_a.gif" style=" position: relative; left: -6px" width="33.75" border="0" height="44.25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Raccolta Erbe\');"'+
'<a onclick="xajax_click(7507, 4600, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="/img/ani/germane_mushroom_a.gif" style=" position: relative; top: -4px; left: 11px" width="33.75" border="0" height="36.75" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Raccolta Funghi\');"'+
'<a onclick="xajax_click(8196, 4751, 7876, 4781, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/matricia/Matricia_l_stand.gif" style=" position: relative; top: -12px; left: 4px" width="27" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Matricia\');"'+
'<a onclick="xajax_click(7615, 5705, 7200, 6720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/karamix/Karamix_r_stand2.gif" style=" position: relative; top: -10px; left: 4px" width="37.5" border="0" height="37.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Karamix\');" '+
'<a onclick="xajax_click(5560, 6124, 5560, 6124, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Tombo_stand.gif" style=" position: relative; top: -7px; left:5px" width="30" border="0" height="45" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Tombo\');"'+
'<a onclick="xajax_click(8193, 5681, 8193, 5681,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Isolde/Isolde_l_stand.gif" style=" position: relative; top: -3px; "width="26.25" border="0" height="37.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Isolde\');"'+
'<a onclick="xajax_click(4686, 6947, 4686, 6947, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/pilou/Pilou_l_stand.gif" style=" position: relative; top: -1px;  "width="26.25" border="0" height="37.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pilou\');"'+
'<a onclick="xajax_click(7022, 4905, 6965, 4922, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/bg/objects/people/senkel/Senkel_l_clean_b.gif" style=" position: relative; top: -1px;" width="30" border="0" height="37.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna di Senkel\');"'+
'<a onclick="xajax_click(5058, 6550, 7200, 6720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Stan_l_stand.gif" style=" position: relative; top: -1px;" width="23.25" border="0" height="35.25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Taverna di Stan: MARTEDI caff ,0GIOVEDI oggetti\');"'+
'<a onclick="xajax_click(7950, 6980, 7950, 6980, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Jolaisus/Jolaisus_r_stand.gif" style=" position: relative; top: -1px; " width="22.5" border="0" height="33.75" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Jolaisus\');"'+
'<a onclick="xajax_click(6312, 5592, 6312, 5592, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Heiderose/Heiderose_r_stand.gif" style=" position: relative; top: 1px; "width="26.25" border="0" height="37.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Brughiera-Rosa\');"'+
'<a onclick="xajax_click(9260, 6471, 9260, 6471, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/bg/objects/people/Lorena/Lorena_r_stand.gif" width="26.25" border="0" height="37.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lorena\');"'+
'<a onclick="xajax_click(7200, 6720, 7200, 6720, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="/img/bg/objects/people/sieglinde/Sieglinde_l_stand.gif" style="position: relative; left: -1px" width="26.25" border="0" height="37.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Aurora\');"'+
'<a onclick="xajax_click(7178, 4790, 7178, 4790,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="/img/bg/objects/people/magistrate/Magistrate2_l_stand.gif" style="position: relative; left: -1px" width="30" border="0" height="38" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Ufficio delle imposte\');"'+
'<a onclick="xajax_click(8041, 5345, 8041, 5345,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="/img/bg/objects/people/Penpalus/Penpalus_l_stand.gif" style="position: relative; left: -1px" width="37" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Penpalus\');"'+
'<a onclick="xajax_click(8575, 5506, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="img/ani/gallierin_treasure_b.gif" style="position: relative; top: -4px;" width="22" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Ricerca Tesori\');"'+
'<a onclick="xajax_click(4328, 7003, 4349, 7038, BGlocation, BGlocationOwner, -2, 0, 0, 0); return false; "><img src="/img/sell.gif" width="36" border="0" height="36" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Banca\');"'+
'<a onclick="xajax_click(5631, 5444, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/misc/11,10_palace.gif" width="37.5" border="0" height="37.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Propria Gilda\');"'+
'<a onclick="xajax_click(9421, 4417, 9329, 4707,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/ani/germane_stand.gif" style="position: relative; left: -1px" width="40" border="0" height="45" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine zona teutonica (Sconsigliato) \');"'+
'<a onclick="xajax_click(10413, 6880, 10315, 6985,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/ani/roemer_stand.gif" style="position: relative; left: -1px" width="40" border="0" height="45" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine mare romano (Sconsigliato) \');"'+
'<a onclick="xajax_click(5560, 6124, 5560, 6124,  BGlocation, BGlocationOwner, 0, 0, 0, 0); return false;"><img src="img/ani/gallier_stand.gif" style="position: relative; left: -1px" width="40" border="0" height="45" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Confine zona gallica \');"'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713258-60\',\'\'); return false;"><table class="popupTable" cellspacing="1" celpadding="1"><thead><tr><td colspan="1">NPG</td></tr></thead></table>'+
'<a onclick="xajax_click(6271, 5260, 6616, 5163, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter4/Fighter4_stand_l.gif" width="26.25" border="0" height="37.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Cartello Gilde\');"</a>'+
'<a onclick="xajax_click(7005, 4521, 6758, 4644, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter3/Fighter3_stand_l.gif" style=" position: relative; top: -1px;" width="23.25" border="0" height="37.5" onmouseover="showToolTipText(\'Cartello Case\');"</a>'+
'<a onclick="xajax_click(7716, 4366, 7667, 4706, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter2/Fighter2_stand_r.gif" style=" position: relative; top: 1px; left: -3px" width="33.75" border="0" height="41.25" onmouseover="showToolTipText(\'Vicino a Matrica\');"</a>'+
'<a onclick="xajax_click(8648, 4975, 8651, 4967, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter1/Fighter1_stand_l.gif" style=" position: relative; top: -1px; left: -6px" width="23.25" border="0" height="34" onmouseover="showToolTipText(\'Al ponte per la Teutonia\');"</a>'+
'<a onclick="xajax_click(8826, 5595, 8606, 5532, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter11/Fighter11_stand_l.gif" style=" position: relative; top: 1px; left: -13px" width="37.5" border="0" height="37.5" onmouseover="showToolTipText(\'Alla Palude\');" '+
'<a onclick="xajax_click(8033, 5563, 8048, 5559, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter5/Fighter5_stand_l.gif" style=" position: relative; left: -9px;" width="37.5" border="0" height="37.5" onmouseover="showToolTipText(\'A dx di Karamix\');"</a>'+
'<a onclick="xajax_click(7731, 6151, 7701, 6156, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter9/Fighter9_stand_l.gif" style=" position: relative; top: -2px; left: -15px;" top: -3"; width="23.25" border="0" height="37.5" onmouseover="showToolTipText(\'Al 2  punto di estrazione del Ferro\');"</a><br/>'+
'<a onclick="xajax_click(7040, 6533, 7062, 6439, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter8/Fighter8_stand_l.gif" style=" position: relative; left: 22px; top: -3"; width="37.5" border="0" height="37.5" onmouseover="showToolTipText(\'Vicino ad Aurora\');"</a>'+
'<a onclick="xajax_click(6321, 7308, 6325, 7279, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter10/Fighter10_stand_l.gif" style=" position: relative; top: -2px; left: 20px;" top: -3" width="23.25" border="0" height="37.5" onmouseover="showToolTipText(\'Vicino al Tempio\');"</a>'+
'<a onclick="xajax_click(6295, 6483, 6264, 6446, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/bg/objects/people/fighter/fighter7/Fighter7_stand_l.gif" style=" position: relative; left: 20px; top: -3" width="37.5" border="0" height="37.5" onmouseover="showToolTipText(\'Al 2  punto di estrazione dei Mattoni\');"</a>'+
'<table class="popupTable" cellspacing="1" celpadding="1"><thead><tr><td colspan="1"><font style="margin-left: -110px;">Quest</font></td></tr></thead></table>'+
//QUEST 1
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713281-59\',\'\'); return false;"><img style="position: absolute; top: 345px; left: 120px; z-index: 40;" src="/img/icons/generation_1.gif" width="36" border="0" height="18" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Quest I Generazione\');"></a>'+
//QUEST 2
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713281-205\',\'\'); return false;"><img style="position: absolute; top: 345px; left: 150px; z-index: 40;" src="/img/icons/generation_2.gif" width="36" border="0" height="18" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Quest II Generazione\');"></a>'+
//QUEST 3
'<img style="position: absolute; top: 345px; left: 180px; z-index: 40;" src="/img/icons/generation_3.gif" width="36" border="0" height="18" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Quest III Generazione\');">'+
//FINESTRE UTILI
'<table class="popupTable" cellspacing="1" celpadding="1"><thead><tr><td colspan="1"><a onclick="xajax_showModule(\'blogs\',\'comments\',\'731687-80\',\'\'); return false;">Finestre utili</a></td></tr></thead></table>'+
//BLOG
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'731687-80\',\'\'); return false;"><img src="/img/icons/Icon_mail.gif" width="24" border="0" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Link Utili\');"</a>'+
//BLOG 2
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'726996-199\',\'\'); return false;"><img src="img/weapons/potionB2.gif" width="24" border="0" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pozioni\');"</a>'+
//BLOG 3
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'718571-388\',\'\'); return false;"><img src="http://img6.imageshack.us/img6/7895/paginegialle.gif" width="27" border="0" height="27" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Grafiche\');"</a>'+
//BLOG 4
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713258-3\',\'\'); return false;"><img src="http://img524.imageshack.us/img524/7911/rattansingolo.gif" width="24" border="0" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Categoria Letti \');"</a>'+
//DIARIO
'<a onclick="xajax_showModule(\'questlog\',\'\',\'\'); return false;" <img src="/img/icons/Icon_questlog.gif" "width="24" border="0" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Diario delle Quest\');"</a>'+
//MAPPA COMPLETA 
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'731687-60\',\'\'); return false;"><img src="http:/img/bg/12,12.jpg" width="31.5" border="0" height="31.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Mappa Completa\');"</a>'+
//LISTA AMICI
'<a onclick="xajax_showModule(\'friendtree\',\'buddylist\',\'0\'); return false;"><img src="/img/icons/Icon_friendtree.gif" width="24" border="0" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lista degli Amici\');"</a>'+
//OFFERTE MERCATO
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;"><img src="/img/icons/chaticon_ress2.gif" border="0" height="18" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Offerte al Mercato\');"</a>'+
'<table class="popupTable" cellspacing="1" celpadding="1"><thead><tr><td colspan="1">Azioni a distanza</td></tr></thead></table>'+
<li>
<a onclick="xajax_scriptCall('showDialog',108,'2#0',''); document.getElementById('speechBalloon').style.display='none'; return false;" href="">Pozioni</a>
</li> +
<li>
<a onclick="xajax_scriptCall('showDialog',55,'1#0',''); document.getElementById('speechBalloon').style.display='none'; return false;" href="">Pagare imposte</a>
</li> +
<li>
<a onclick="xajax_scriptCall('showDialog',178,'2#0',''); document.getElementById('speechBalloon').style.display='none'; return false;" href="">Cucinate funghi</a>
</li> +
<li>
<a onclick="xajax_scriptCall('showDialog',40,'2#0',''); document.getElementById('speechBalloon').style.display='none'; return false;" href="">Mangiare</a>
</li> +
<li>
<a onclick="xajax_scriptCall('showDialog','478','8#0',''); document.getElementById('speechBalloon').style.display='none'; return false;" href="">Acquistare carta da mess</a>
</li> +
//1  punti di estrazione
'<table class="popupTable" cellspacing="1" celpadding="1"><thead><tr><td colspan="1">1° punti di estrazione</td></tr></thead></table>'+
//LEGNO
'<a onclick="xajax_click(6451, 4552,6451, 4552, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_wood.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Legna\');"</a>'+
//ARGILLA
'<a onclick="xajax_click(6505, 4299, 6505, 4299, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_clay.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Argilla\');"</a>'+
//MINERALE
'<a onclick="xajax_click(6079, 4578, 6079, 4578, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_ore.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Minerale\');"</a>'+
//GRANO
'<a onclick="xajax_click(6137, 4381, 6137, 4381,BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_corn.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Grano\');"</a>'+
//FARINA
'<a onclick="xajax_click(6882, 4679, 6882, 4679, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_flour.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Farina\');"</a>'+
'<br>'+
//CARBONE
'<a onclick="xajax_click(6690, 4924, 9380, 6126, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_coal.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Carbone\');"</a>'+
//ASSI
'<a onclick="xajax_click(7026, 4726, 7026, 4726, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_board.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Assi\');"</a>'+
//MATTONI
'<a onclick="xajax_click(6827, 4862, 6827, 4862,BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_brick.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Mattoni\');"</a>'+
//FERRO
'<a onclick="xajax_click(7091, 5031, 7091, 5031,BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_iron.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Ferro\');"</a>'+
//PANE
'<a onclick="xajax_click(6959, 4972, 6959, 4972, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_bread.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pane\');"</a>'+

//2 PUNTI DI ESTRAZIONE
'<table class="popupTable" cellspacing="1" celpadding="1"><thead><tr><td colspan="1">2° punti di estrazione</td></tr></thead></table>'+
//LEGNO
'<a onclick="xajax_click(8446, 6354, 8446, 6354, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_wood.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Legna\');"</a>'+
//ARGILLA
'<a onclick="xajax_click(9600, 5460, 9600, 5460, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_clay.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Argilla\');"</a>'+
//MINERALE
'<a onclick="xajax_click(6906, 7252, 6906, 7252, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_ore.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Minerale\');"</a>'+
//GRANO
'<a onclick="xajax_click(7348, 6394, 7348, 6394, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_corn.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Grano\');"</a>'+
//FARINA
'<a onclick="xajax_click(6735, 5973, 6735, 5973, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_flour.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Farina\');"</a>'+
'<br>'+
//CARBONE
'<a onclick="xajax_click(9380, 6126, 9380, 6126, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_coal.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Carbone\');"</a>'+
//ASSI
'<a onclick="xajax_click(6239, 6981, 6239, 6981, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_board.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Assi\');"</a>'+
//MATTONI
'<a onclick="xajax_click(6317, 6595, 6317, 6595, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_brick.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Mattoni\');"</a>'+
//FERRO
'<a onclick="xajax_click(7579, 6071, 7579, 6071, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_iron.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Ferro\');"</a>'+
//PANE
'<a onclick="xajax_click(6239, 6981, 6239, 6981, BGlocation, BGlocationOwner, 0, 0, 0, 0); return false; "><img src="/img/res/big_bread.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pane\');"</a>'+
'<hr>'+
'<table class="popupTable" cellspacing="1" celpadding="1"><thead><tr><td colspan="1">Copyright © 2009-2010 <a onclick="xajax_showModule(\'profile\',\'player\',\'731687\',\'\'); return false;"><i>Leonardo I</i></a> | All Rights Reserved</td></tr></thead></table>'+
'<font style=" position: absolute; top: 1px; left: 175px; color:#FFFFFF;"><sup><b>v4.1.0.0</b></sup></font>'+
'</div>';

var menu = addElem('div', menuinner);

var elem = $('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}