// ==UserScript==
// @name           Taringa! CS
// @namespace      taringacs
// @include        *.taringa.net/*
// @creator        Taringa! CS [user]
// @require        http://www.taringacs.net/greasemonkey/gm.jquery.js
// ==/UserScript==

$(function() {
	try {
		new jquery_tcs();
	}
	catch( e ) {
		if( console && console.log )
			console.log( 'Exception!', e );
	}
});

var jquery_tcs = function()
{
	var ubicacion = window.location.pathname;
	var box = $('.birthHome.clearbeta .clima-h-city a').attr('href');

	if ($('.tabbed.registrate').length != 0) {
		$('.menuTabs').html('<li id="tabbedPosts" class="tabbed here"><a href="/" onclick="menu(\'Posts\', this.href); return false;" title="Ir a Posts">Posts <img src="http://o2.t26.net/images/arrowdown.png" alt="Posts" /></a></li><li id="tabbedComunidades" class="tabbed"> <a href="/comunidades/" onclick="menu(\'Comunidades\', this.href); return false;" title="Ir a Comunidades">Comunidades <img src="http://o2.t26.net/images/arrowdown.png" alt="Comunidades" /></a></li><li id="tabbedTops" class="tabbed">	<a href="/top/" onclick="menu(\'Tops\', this.href); return false;" title="Ir a TOPs">TOPs <img src="http://o2.t26.net/images/arrowdown.png" alt="TOPs" /></a></li><li id="tabbedTCS" class="tabbed"> <a href="http://cs.taringa.net" onclick="menu(\'TCS\', this.href); return false;" title="Ir a Taringa! CS">CS <img src="http://o2.t26.net/images/arrowdown.png" alt="Counter-Strike" /></a></li><li class="tabbed registrate"><a href="" onclick="registro_load_form(); return false" title="Registrate!"><b>Registrate!</b></a></li>  <li class="clearBoth"></li>');
	}else {
		$('.menuTabs').html('<li id="tabbedPosts" class="tabbed here"><a href="/" onclick="menu(\'Posts\', this.href); return false;" title="Ir a Posts">Posts <img src="http://o2.t26.net/images/arrowdown.png" alt="Posts" /></a></li><li id="tabbedComunidades" class="tabbed">	<a href="/comunidades/" onclick="menu(\'Comunidades\', this.href); return false;" title="Ir a Comunidades">Comunidades <img src="http://o2.t26.net/images/arrowdown.png" alt="Comunidades" /></a></li><li id="tabbedTops" class="tabbed">	<a href="/top/" onclick="menu(\'Tops\', this.href); return false;" title="Ir a TOPs">TOPs <img src="http://o2.t26.net/images/arrowdown.png" alt="TOPs" /></a></li><li id="tabbedTCS" class="tabbed"><a href="http://cs.taringa.net" onclick="menu(\'TCS\', this.href); return false;" title="Ir a Taringa! CS">CS <img src="http://o2.t26.net/images/arrowdown.png" alt="Counter-Strike" /></a></li>  <li class="clearBoth"></li>');
	}

	if ( ($('.birthHome.clearbeta').length != 0) && (ubicacion == '/') && (box = '/juegos/') ) {
		$('.birthHome.clearbeta .clima-h-data div:last').html('<a href="http://cs.taringa.net" alt="Counter-Strike" title="Counter-Strike">Counter-Strike</a>, <a href="/juegos/truco/" alt="Truco" title="Truco">Truco</a>, <a href="/juegos/damas/" alt="Damas" title="Damas">Damas</a>, <a href="/juegos/ajedrez/" alt="Ajedrez" title="Ajedrez">Ajedrez</a>, <a href="/juegos/bichitos/" alt="Bichitos" title="Bichitos">Bichitos</a>, <a href="/juegos/poker/" alt="Poker Texas Hold\'em" title="Poker Texas Hold\'em">Poker</a>, <a href="/juegos/xt/" alt="T!tris" title="Tetris">Tetris</a>, <a href="/juegos/batallanaval/" alt="Batalla naval" title="Batalla naval">Batalla naval</a>');
	}

	if ( ($('.box_txt.juegos_container').length != 0) && (ubicacion == '/juegos/') ) {	
		$.get("http://www.taringacs.net/greasemonkey/online.php", function(data) {
				var tcs_jugando;
				tcs_jugando = data;
				$('.container940 .box_cuerpo table:last').after('<table width="455" height="200" border="0" cellspacing="6" align="right" bgcolor="#FFFFFF"><tr><td width="200" align="left"><a href="http://cs.taringacs.net"><img alt="Counter-Strike" border="0" src="http://www.taringacs.net/greasemonkey/tcs.jpg"  title="Counter-Strike" / ></a></td><td width="240" align="center"><strong style="font-size:18px;line-height: 24px;">'+tcs_jugando+' personas </strong><br />jugando al <strong>Counter-Strike</strong><br /><br /><a href="http://cs.taringacs.net"><img title="Jugar al Counter-Strike" src="http://o2.t26.net/images/btn-jugar.gif" alt="Jugar al Counter-Strike" border="0"></a></td></tr></table>');
		});
	}
}