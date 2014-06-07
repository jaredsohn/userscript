// ==UserScript==
// @name           [HWM] TransferSearch
// @namespace      [HWM] TransferSearch
// @homepage       http://userscripts.org/scripts/show/113693
// @include        http://www.heroeswm.ru/pl_transfers.php*
// @version        1.12
// @author         Alex_2oo8
// ==/UserScript==

	GM_addStyle( '#HWM_transfer_search_checkbox_label {background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAAsCAYAAACOu+GLAAABrElEQVR42u3bsWrCQByA8RhdXBzEJY8gcXZz9Ek6BkIhSxBck1foG3QogpPg5uguklG6iIPU4qCT+ZcLGDiibY03ZPiGD4yaLPcTyV3O+nh/E6JnStNULPXi1X8xlunrUbX7/vrUIakDE5m+HlU7IBGQCEgEJCARkAhIBCQCEpAISAQkAhKQgAQkAhIBiYAEJAISAYmqC0kdmMr09aj6ZZD4VZGJLHZBELtIiF0kxF0bkMg8pOVyKd1uF0hAem7gfd8Xy7KABKTyA+95XoYISEAqDSkIghwRkIBUgLRarf48OQxDDVGz2QQSkPSB7/f7st1u7544Go00RI1GQxaLBZCApA98rVYTx3HkeDxqJ1wuFxmPxxoi9d0kSbj9B9JtSApJu92W/X6fvx9FUf7Ztc1mwzwSkG5DqtfrOZRer5f9zcVxrAFSzedzJiTpPqThcKiB6XQ6BUSTyYSZbfod0m63E9d1C3iuzWYzlkjof/NI5/NZWq1WAdF6vWatjR6bkDydTtkamgJk23a2psaiLZWa2T4cDjIYDGQ6nbL6TzxGQkAidpEQu0iIHuwH8Zq0OtRsnH4AAAAASUVORK5CYII%3D\');background-position:top;display:block;width:120px;height:18px;padding:2px;padding-left:24px;line-height:18px;-moz-user-select:none;cursor:default;}' + 
				 '#HWM_transfer_search_checkbox_label.checked {background-position:bottom;}' +
				 '.HWM_transfer_search_checkbox_checkbox {display:none;}' );

	var id = getId();
	var td_arr = document.getElementsByTagName('td');
	for (var i = 0; i < td_arr.length; i++)
	{
//		if ( /&nbsp;&nbsp;[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}/.test( td_arr[i].innerHTML ) )
		if ( td_arr[i].getElementsByTagName('center').length > 0 && /\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0438\u0433\u0440\u043e\u043a\u0430 <a.* href="pl_info\.php\?id=[0-9]*"><b>.*<\/b><\/a>/.test( td_arr[i].getElementsByTagName('center')[0].innerHTML ) )
		{
			var elem = td_arr[i];
			break;
		}
	}
	var text = document.createElement( 'text' );
	text.innerHTML = '&nbsp;(';
	text.id = 'TSearch';
	var a = document.createElement( 'a' );
	a.href = 'javascript: void(0);';
	a.innerHTML = '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u0443';
	text.appendChild( a );
	text.innerHTML += ')';
	elem.getElementsByTagName('center')[0].appendChild( text );
	elem.getElementsByTagName('center')[0].lastChild.getElementsByTagName('a')[0].addEventListener( 'click', function() { document.getElementById('transferSearchDiv').style.display = ( document.getElementById('transferSearchDiv').style.display == 'none' ? 'block' : 'none' ); }, false );
	var div = document.createElement( 'div' );
	div.id = 'transferSearchDiv';
	div.style.display = 'none';
	var tb = document.createElement( 'table' );
	var tr = document.createElement( 'tr' );
	var td = document.createElement( 'td' );
	td.innerHTML = '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043d\u0438\u043a\u0443:';
	tr.appendChild( td );
	var td = document.createElement( 'td' );
	var inp = document.createElement( 'input' );
	inp.type = 'text';
	inp.id = 'TSearchNick';
	td.appendChild( inp );
	tr.appendChild( td );
	var td = document.createElement( 'td' );
	var inp = document.createElement( 'input' );
	inp.type = 'button';
	inp.value = '\u041f\u043e\u0438\u0441\u043a';
	inp.id = 'TSearchByNick';
	td.appendChild( inp );
	tr.appendChild( td );
	tb.appendChild( tr );
	var tr = document.createElement( 'tr' );
	var td = document.createElement( 'td' );
	td.innerHTML = '\u041f\u043e\u0438\u0441\u043a \u0448\u0442\u0440\u0430\u0444\u043e\u0432:';
	tr.appendChild( td );
	var td = document.createElement( 'td' );
	var label = document.createElement( 'div' );
	label.id = 'HWM_transfer_search_checkbox_label';
	label.innerHTML += '\u0411\u043b\u043e\u043a\u0438 / \u0420\u0430\u0437\u0431\u043b\u043e\u043a\u0438';
	td.appendChild( label );
	tr.appendChild( td );
	var td = document.createElement( 'td' );
	var inp = document.createElement( 'input' );
	inp.type = 'button';
	inp.value = '\u041f\u043e\u0438\u0441\u043a';
	inp.id = 'TSearchByFine';
	td.appendChild( inp );
	tr.appendChild( td );
	tb.appendChild( tr );
	var tr = document.createElement( 'tr' );
	var td = document.createElement( 'td' );
	td.innerHTML = '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u044e:';
	tr.appendChild( td );
	var td = document.createElement( 'td' );
	var inp = document.createElement( 'input' );
	inp.type = 'text';
	inp.id = 'TSearchDesc';
	td.appendChild( inp );
	tr.appendChild( td );
	var td = document.createElement( 'td' );
	var inp = document.createElement( 'input' );
	inp.type = 'button';
	inp.value = '\u041f\u043e\u0438\u0441\u043a';
	inp.id = 'TSearchByDesc';
	td.appendChild( inp );
	tr.appendChild( td );
	tb.appendChild( tr );
	var tr = document.createElement( 'tr' );
	var td = document.createElement( 'td' );
	td.innerHTML = '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u0430\u0440\u0442\u0435\u0444\u0430\u043a\u0442\u0443:';
	tr.appendChild( td );
	var td = document.createElement( 'td' );
	var inp = document.createElement( 'input' );
	inp.type = 'text';
	inp.id = 'TSearchArt';
	td.appendChild( inp );
	tr.appendChild( td );
	var td = document.createElement( 'td' );
	var inp = document.createElement( 'input' );
	inp.type = 'button';
	inp.value = '\u041f\u043e\u0438\u0441\u043a';
	inp.id = 'TSearchByArt';
	td.appendChild( inp );
	tr.appendChild( td );
	tb.appendChild( tr );
	div.appendChild( tb );
	elem.getElementsByTagName('center')[0].appendChild( div );
	
	document.getElementById('HWM_transfer_search_checkbox_label').addEventListener( 'click', function() { if ( this.className.indexOf('checked') != -1 ) this.className = ''; else this.className = 'checked'; }, false );
	document.getElementById('TSearchByNick').addEventListener( 'click', function() { search( id, elem, 'Nick' ); }, false );
	document.getElementById('TSearchByFine').addEventListener( 'click', function() { search( id, elem, 'Fine' ); }, false );
	document.getElementById('TSearchByDesc').addEventListener( 'click', function() { search( id, elem, 'Desc' ); }, false );
	document.getElementById('TSearchByArt').addEventListener( 'click', function() { search( id, elem, 'Art' ); }, false );

	function search( id, elem, type )
	{
		var stop = document.createElement( 'input' );
		stop.type = 'hidden';
		stop.value = '0';
		stop.id = 'stop';
		document.getElementsByTagName('body')[0].appendChild( stop );
		document.getElementById('transferSearchDiv').style.display = 'none';
		document.getElementById('TSearch').style.display = 'none';
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://www.heroeswm.ru/pl_transfers.php?page=9999&id=' + id,
			overrideMimeType: 'text/html; charset=windows-1251',
			onload: function( resp )
					{
						var div = document.createElement( 'div' );
						div.id = 'response';
						div.style.display = 'none';
						div.innerHTML = resp.responseText;
						document.getElementsByTagName('body')[0].appendChild( div );
						var respDoc = document.getElementsByTagName('body')[0].lastChild;
						var td_arr = respDoc.getElementsByTagName('td');
						for (var i = 0; i < td_arr.length; i++)
						{
//							if ( td_arr[i].innerHTML.match(/&nbsp;&nbsp;\d{2}-\d{2}-\d{2} \d{2}:\d{2}/) )
							if ( td_arr[i].getElementsByTagName('center').length > 0 && /\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0438\u0433\u0440\u043e\u043a\u0430 <a.* href="pl_info\.php\?id=[0-9]*"><b>.*<\/b><\/a>/.test( td_arr[i].getElementsByTagName('center')[0].innerHTML ) )
							{
								var element = td_arr[i];
								break;
							}
						}
						if ( element.getElementsByTagName('center').length > 1 )
						{
							var lastPg = element.getElementsByTagName('center')[1].getElementsByTagName('b')[0].getElementsByTagName('font')[0].innerHTML;
						}
						else
						{
							var lastPg = 1;
						}
						search2( id, type, elem, lastPg );
					}
		});
	}
	
	function rep( str ) {
		str = str.replace( /\\/g, '\\\\' ).replace( /\[/g, '\\[' ).replace( /\]/g, '\\]' ).replace( /\(/g, '\\(' ).replace( /\)/g, '\\)' ).replace( /\./g, '\\.' ).replace( /\+/g, '\\+' ).replace( /\*/g, '\\*' ).replace( /\?/g, '\\?' ).replace( /\$/g, '\\$' ).replace( /\|/g, '\\|' );
		return str;
	}
	
	function search2( id, type, elem, pgCount )
	{
		switch(type)
		{
			case 'Nick':
				var search_str = document.getElementById('TSearchNick').value;
				var reg = new RegExp( '[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}: .*<b>' + rep( search_str ) + '<\/b><\/a>' );
				break;
			case 'Fine':
				var search_str = document.getElementById('HWM_transfer_search_checkbox_label').className.indexOf('checked') != -1 ? '+' : '';
				var reg = new RegExp( '[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}: <b>\u0418\u0433\u0440\u043e\u043a' + ( search_str.indexOf('+') == -1 ? ' \u043e\u0448\u0442\u0440\u0430\u0444\u043e\u0432\u0430\u043d' : '' ) );
				break;
			case 'Desc':
				var search_str = document.getElementById('TSearchDesc').value;
				var reg = new RegExp( '[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}: .*: .*' + rep( search_str ) );
				break;
			case 'Art':
				var search_str = document.getElementById('TSearchArt').value;
				var reg = new RegExp( '[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}: .* \u043f\u0440\u0435\u0434\u043c\u0435\u0442 ["\'].*' + rep( search_str ) + '.*["\']' );
				break;
		}
		var nick = elem.getElementsByTagName('center')[0].getElementsByTagName('a')[0].innerHTML;
		while( elem.lastChild )
		{
			elem.removeChild( elem.lastChild );
		}
		elem.appendChild( document.createElement( 'br' ) );
		var center = document.createElement( 'center' );
		center.innerHTML = '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u0443 \u043f\u0435\u0440\u0435\u0434\u0430\u0447 \u0438\u0433\u0440\u043e\u043a\u0430 ';
		var a = document.createElement( 'a' );
		a.href = 'pl_info.php?id=' + id;
		a.style.textDecoration = 'none';
		a.innerHTML = nick;
		center.appendChild( a );
		elem.appendChild( center );
		elem.appendChild( document.createElement( 'br' ) );
		var center = document.createElement( 'center' );
		center.id = 'TSearch';
		center.innerHTML = '\u0418\u0434\u0435\u0442 \u043f\u043e\u0438\u0441\u043a ' + type.replace( 'Nick', '\u043f\u043e \u043d\u0438\u043a\u0443 <a href="pl_info.php?nick=' + search_str + '" style="text-decoration: none;"><b>' + search_str + '</b></a>' ).replace( 'Fine', '\u0448\u0442\u0440\u0430\u0444\u043e\u0432' + ( search_str.indexOf('+') != -1 ? ' \u0438 \u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u043e\u043a/\u0440\u0430\u0437\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u043e\u043a' : '' ) ).replace( 'Desc', '\u043f\u043e \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u044e "' + search_str + '"' ).replace( 'Art', '\u043f\u043e \u0430\u0440\u0442\u0435\u0444\u0430\u043a\u0442\u0443"' + search_str + '"' ) + '... (<a href="javascript: void(0);" id="cancel" onclick="document.getElementById(\'stop\').value = \'1\';">\u0441\u0442\u043e\u043f</a>)';
		center.appendChild( document.createElement( 'br' ) );
		center.innerHTML += '\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u043e <text id="viewed">0</text> \u0441\u0442\u0440\u0430\u043d\u0438\u0447\u0435\u043a \u0438\u0437 ' + pgCount + ' (<text id="percent">0</text>%)';
		center.appendChild( document.createElement( 'br' ) );
		center.innerHTML += '\u041d\u0430\u0439\u0434\u0435\u043d\u043e <text id="matches">0</text> \u0437\u0430\u043f\u0438\u0441\u0435\u0439:';
		elem.appendChild( center );
		elem.appendChild( document.createElement( 'br' ) );
		startSearch( 1, id, reg, pgCount, elem, type, search_str );
	}
	
	function startSearch( pg, id, reg, lastPg, elem, type, search_str )
	{
		if ( document.getElementById('stop').value != '1' && pg <= lastPg )
		{
			var pg = pg - 1;
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://www.heroeswm.ru/pl_transfers.php?id=' + id + '&page=' + pg,
				overrideMimeType: 'text/html; charset=windows-1251',
				onload: function( resp )
						{
							var div = document.getElementById( 'response' );
							div.innerHTML = resp.responseText;
							var respDoc = div;
							var td_arr = respDoc.getElementsByTagName('td');
							for (var i = 0; i < td_arr.length; i++)
							{
//								if ( td_arr[i].innerHTML.match(/&nbsp;&nbsp;\d{2}-\d{2}-\d{2} \d{2}:\d{2}/) )
								if ( td_arr[i].getElementsByTagName('center').length > 0 && /\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0438\u0433\u0440\u043e\u043a\u0430 <a.* href="pl_info\.php\?id=[0-9]*"><b>.*<\/b><\/a>/.test( td_arr[i].getElementsByTagName('center')[0].innerHTML ) )
								{
									var element = td_arr[i];
									break;
								}
							}
							var text = element.innerHTML.substring( element.innerHTML.indexOf('&nbsp;&nbsp;') );
							var transfers = text.split('<br>');
							for ( var i = 0; i < transfers.length; i++ )
							{
								if ( reg.test( transfers[i] ) )
								{
									document.getElementById('matches').innerHTML = ( Number( document.getElementById('matches').innerHTML ) + 1 );
									elem.innerHTML += transfers[i];
									elem.appendChild( document.createElement('br') );
								}
							}
							document.getElementById('viewed').innerHTML = ( Number( document.getElementById('viewed').innerHTML ) + 1 );
							document.getElementById('percent').innerHTML = ( Math.round( document.getElementById('viewed').innerHTML * 100 / lastPg ) );
							pg = ( Number(pg) + 2 );
							startSearch( pg, id, reg, lastPg, elem, type, search_str );
						}
			});
		}
		else
		{
			var matches = document.getElementById('matches').innerHTML;
			document.getElementById('TSearch').innerHTML = '\u041f\u043e\u0438\u0441\u043a ' + type.replace( 'Nick', '\u043f\u043e \u043d\u0438\u043a\u0443 <a href="pl_info.php?nick=' + search_str + '" style="text-decoration: none;"><b>' + search_str + '</b></a>' ).replace( 'Fine', '\u0448\u0442\u0440\u0430\u0444\u043e\u0432' + ( search_str.indexOf('+') != -1 ? ' \u0438 \u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u043e\u043a/\u0440\u0430\u0437\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u043e\u043a' : '' ) ).replace( 'Desc', '\u043f\u043e \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u044e "' + search_str + '"' ).replace( 'Art', '\u043f\u043e \u0430\u0440\u0442\u0435\u0444\u0430\u043a\u0442\u0443"' + search_str + '"' ) + ' \u0437\u0430\u043a\u043e\u043d\u0447\u0435\u043d!<br>\u041d\u0430\u0439\u0434\u0435\u043d\u043e ' + matches + ' \u0437\u0430\u043f\u0438\u0441\u0435\u0439:';
		}
	}

	function getId()
	{
		var id = location.href.match( /\?(?:.*=.*&)*id=([0-9]*)(?:&.*=.*)*/ );
		return id[1];
	}