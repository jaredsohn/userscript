// ==UserScript==
// @name           [HWM]Clan level ups
// @namespace      [HWM]Clan level ups by Alex_2oo8
// @author         Alex_2oo8
// @version        1.0.01
// @include        http://www.heroeswm.ru/clan_info.php*
// ==/UserScript==

	var clanId = getParametr( 'id', location.href );
	var clanTb = getClanTable();
	if ( GM_getValue( 'clan' + clanId, false ) )
	{
		var tr_arr = clanTb.getElementsByTagName( 'tr' );
		for ( var i = 0; i < tr_arr.length; i++ )
		{
			var plId = getParametr( 'id', tr_arr[i].getElementsByTagName( 'td' )[2].getElementsByTagName( 'a' )[0].href );
			var plNick = tr_arr[i].getElementsByTagName( 'td' )[2].getElementsByTagName( 'a' )[ tr_arr[i].getElementsByTagName( 'td' )[2].getElementsByTagName( 'a' ).length - 1 ].innerHTML;
			var plLv = tr_arr[i].getElementsByTagName( 'td' )[3].innerHTML;
			var lastLv = GM_getValue( 'clan' + clanId + 'player' + plId, 'undefined' );
			if ( lastLv == 'undefined' )
				GM_setValue( 'clan' + clanId + 'player' + plId, plLv );
			else if ( plLv > lastLv )
			{
				GM_setValue( 'clan' + clanId + 'player' + plId, plLv );
				var td_arr = tr_arr[i].getElementsByTagName('td');
				for ( var i = 0; i < td_arr.length; i++ )
					td_arr[i].style.backgroundColor = '#779977';
				alert( '\u0413\u0435\u0440\u043e\u0439 ' + plNick + ' \u043f\u043e\u043b\u0443\u0447\u0438\u043b ' + plLv + ' \u0443\u0440\u043e\u0432\u0435\u043d\u044c!' );
			}
		}
	}
	else
	{
		var clanTb = clanTb.parentNode.parentNode.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
		var tr = document.createElement('tr');
		tr.id = 'clan_level_ups_tr';
		var td = document.createElement('td');
		td.setAttribute( 'colspan', '2' );
		td.className = 'wbwhite';
		var a = document.createElement('a');
		a.id = 'clan_level_ups_a';
		a.href = 'javascript: void(0);';
		a.innerHTML = '\u041e\u043f\u043e\u0432\u0435\u0449\u0430\u0442\u044c \u043e \u043f\u043e\u0432\u044b\u0448\u0435\u043d\u0438\u044f\u0445 \u0443\u0440\u043e\u0432\u043d\u0435\u0439 \u0433\u0435\u0440\u043e\u0435\u0432 \u043a\u043b\u0430\u043d\u0430';
		td.appendChild( a );
		tr.appendChild( td );
		clanTb.insertBefore( tr, clanTb.childNodes[2] );
		document.getElementById('clan_level_ups_a').addEventListener( 'click',  function()
																				{
																					alert('ok');
																					GM_setValue( 'clan' + clanId, true );
																					document.getElementById('clan_level_ups_tr').parentNode.removeChild( document.getElementById('clan_level_ups_tr') );
																				} 
																	, false);
	}
	
	function getClanTable()
	{
		var all_tbl = document.getElementsByTagName('table');
		for ( var i = 0; i < all_tbl.length; i++ )
		{
			if ( all_tbl[i].innerHTML.indexOf('<table') != -1 )
				continue;
			var has_online_gif = ( all_tbl[i].innerHTML.indexOf( 'i/clans/online.gif' ) != -1 );
			var has_offline_gif = ( all_tbl[i].innerHTML.indexOf( 'i/clans/offline.gif' )!=-1 );
			var has_battle_gif = ( all_tbl[i].innerHTML.indexOf( 'i/clans/battle.gif' )!=-1 );
			var has_cards_gif = ( all_tbl[i].innerHTML.indexOf( 'i/clans/arcomag.gif' ) != -1 );
			if ( has_online_gif || has_offline_gif || has_battle_gif || has_cards_gif )
				return all_tbl[i];
		}
	}

	function getParametr( param, string )
	{
		var regularExp = new RegExp( '\\?(?:.*=.*&)*' + param + '=(.*)(?:&.*=.*)*' );
		if ( regularExp.test( string ) )
		{
			var m = string.match( regularExp );
			var p = m[1];
			if ( p.indexOf('&') != -1 )
				p = p.substring( 0, p.indexOf('&') );
		}
		else
			var p = false;
		return p;
	}