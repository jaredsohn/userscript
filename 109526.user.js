// ==UserScript==
// @name         [HWM]Refferal Statistic
// @namespace    [HWM]Refferal Statistic by Alex_2oo8
// @homepage     http://userscripts.org/scripts/show/109526
// @description  Показывает развёрнутую статистику реффералов
// @author       Alex_2oo8
// @version      1.6.03
// @include      http://www.heroeswm.ru/invitations.php*
// @icon         data:image/png;base64,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
// ==/UserScript==
    checkForUpdates( { name: '[HWM]Refferal Statistic', id: '109526', version: '1.6.03' } );

// ==Options==
	var mode = 'auto';
	var left = 550;
	var top = 765;
	var width = 480;
// ==/Options==

	GM_registerMenuCommand( '[HWM]Refferal Statistic: \u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430', editMinAlertLevel );
	GM_registerMenuCommand( '[HWM]Refferal Statistic: Показать/Убрать кол-во активных после 05.06.2011', editNewActive );
	GM_registerMenuCommand( '[HWM]Refferal Statistic: Показать/Убрать кол-во заблокированных после 05.06.2011', editNewBlocked );

	var elements = document.getElementsByTagName('td');
	for (var i = 0; i < elements.length; i++)
	{
		if (elements[i].innerHTML == '\u0418\u043c\u044f')
		{
			var i = i + 3;
			break;
		}
	}
	var starti = i;
	var levelGold = new Array();
	levelGold[2] = 500;
	levelGold[3] = 650;
	levelGold[4] = 1250;
	levelGold[5] = 3050;
	levelGold[6] = 6050;
	levelGold[7] = 12050;
	levelGold[8] = 21050;
	levelGold[9] = 33050;
	levelGold[10] = 48050;
	levelGold[11] = 72050;
	levelGold[12] = 108050;
	levelGold[13] = 153050;
	levelGold[14] = 213050;
	levelGold[15] = 288050;
	levelGold[16] = 368050;
	levelGold[17] = 473050;
	var elem_len = elements.length;
	var Levels = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	var newLevels = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var blockedCnt = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var activeCnt = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	for ( var i = starti; i < elem_len; i++ )
	{
		if ( ( elements[i].getElementsByTagName( 'a' ).length == 0 ) || ( getLevel( elements[i] ) == 1 ) ) continue;
		var level = getLevel( elements[i] );
		Levels[level]++;
        var blocked = getBlocked( elements[i] );
        if ( GM_getValue( 'Ref_' + id( elements[i] ) + 'blocked', 'undefined' ) == 'undefined' )
        {
            GM_setValue( 'Ref_' + id( elements[i] ) + 'blocked', blocked );
        }
        else 
        {
            if ( GM_getValue( 'Ref_' + id( elements[i] ) + 'blocked', 'undefined' ) != blocked )
            {
                GM_setValue( 'Ref_' + id( elements[i] ) + 'blocked', blocked );
                if ( blocked == false )
                {
                    alert('\u0413\u0435\u0440\u043e\u0439 ' + getNick( elements[i] ) + ' был разблокирован!');
                }
                else
                {
                    alert('\u0413\u0435\u0440\u043e\u0439 ' + getNick( elements[i] ) + ' был заблокирован!');
                }
            }
        }
        if ( id( elements[i] ) > 2885520 )
		{
			newLevels[level]++;
        }
        if ( blocked )
        {
            blockedCnt[getLevel(elements[i])]++;
        }
        if ( getActive( elements[i-1] ) )
        {
            activeCnt[getLevel(elements[i])]++;
        }
		if ( GM_getValue( 'Ref_' + id( elements[i] ), 'undefined' ) == 'undefined' )
		{
			GM_setValue( 'Ref_' + id( elements[i] ), level );
		}
		else
		{
			if ( GM_getValue( 'Ref_' + id( elements[i] ), 'undefined' ) != level )
			{
				GM_setValue('Ref_' + id( elements[i] ), level );
				if ( level >= GM_getValue( 'minAlertLevel', 0 ) )
					alert('\u0413\u0435\u0440\u043e\u0439 ' + getNick( elements[i] ) + ' \u043f\u043e\u043b\u0443\u0447\u0438\u043b ' + level + ' \u0443\u0440\u043e\u0432\u0435\u043d\u044c!');
				for ( var j = ( i - 1 ); j <= ( i + 1 ); j++ )
				{
					elements[j].className = 'wblight';
				}
			}
		}
	}
	var innerHTML = '<tr><td><table style="width: 100%;" class="wbwhite" border="1" bordercolor="#5d413a" frame="void"><tr height="17" class="wblight"><td colspan="4" align="center" style="font-weight: bold;">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430&nbsp;&nbsp;&nbsp;\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0445&nbsp;&nbsp;&nbsp;\u0420\u0435\u0444\u0435\u0440\u0430\u043b\u043b\u043e\u0432</td></tr><tr align="center" class="wblight"><td>\u0423\u0440\u043e\u0432\u0435\u043d\u044c</td><td>\u0414\u043e\u0445\u043e\u0434</td><td title="активных/заблокированных/всего">\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0440\u0435\u0444\u0435\u0440\u0430\u043b\u043b\u043e\u0432</td><td>\u041e\u0431\u0449\u0438\u0439 \u0434\u043e\u0445\u043e\u0434</td></tr>';
	for ( var i = 2; i <= 17; i++)
	{
		if ( Levels[i] > 0 )
		{
			innerHTML = innerHTML + '<tr align="center"><td>' + i + '</td><td>' + levelGold[i] + '</td><td><font color="7fba88">' + activeCnt[i] + '</font>/<font color="red">' + blockedCnt[i] + '</font>/' + Levels[i] + '</td><td>' + levelGold[i] * Levels[i] + '</td></tr>';
		}
	}
innerHTML = innerHTML + '<tr align="center" class="wblight" style="font-weight: bold;"><td colspan="2">\u0412\u0441\u0435\u0433\u043e:</td><td>' + (Levels[2] + Levels[3] + Levels[4] + Levels[5] + Levels[6] + Levels[7] + Levels[8] + Levels[9] + Levels[10] + Levels[11] + Levels[12] + Levels[13] + Levels[14] + Levels[15] + Levels[16] + Levels[17]) + '</td><td>' + (500 * Levels[2] + 650 * Levels[3] + 1250 * Levels[4] + 3050 * Levels[5] + 6050 * Levels[6] + 12050 * Levels[7] + 21050 * Levels[8] + 33050 * Levels[9] + 48050 * Levels[10] + 72050 * Levels[11] + 108050 * Levels[12] + 153050 * Levels[13] + 213050 * Levels[14] + 278050 * Levels[15] + 368050 * Levels[16] + 473050 * Levels[17]) + '</td></tr></table></td></tr><tr><td style="height: 20;">&nbsp;</td></tr><tr><td><table style="width: 100%;" class="wbwhite" border="1" bordercolor="#5d413a" frame="void"><tr height="17" class="wblight"><td colspan="17" align="center" style="font-weight: bold;">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0445 \u0420\u0435\u0444\u0435\u0440\u0430\u043b\u043b\u043e\u0432 \u043f\u043e\u0441\u043b\u0435 05.06.2011</td></tr><tr><td>\u0423\u0440\u043e\u0432\u0435\u043d\u044c:</td><td>&nbsp;2</td><td>&nbsp;3</td><td>&nbsp;4</td><td>&nbsp;5</td><td>&nbsp;6</td><td>&nbsp;7</td><td>&nbsp;8</td><td>&nbsp;9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td></tr>' + ( GM_getValue( 'displayNewActive', false ) ? '<tr align="center"><td align="left">Активных:</td><td>' + activeCnt[2] + '</td><td>' + activeCnt[3] + '</td><td>' + activeCnt[4] + '</td><td>' + activeCnt[5] + '</td><td>' + activeCnt[6] + '</td><td>' + activeCnt[7] + '</td><td>' + activeCnt[8] + '</td><td>' + activeCnt[9] + '</td><td>' + activeCnt[10] + '</td><td>' + activeCnt[11] + '</td><td>' + activeCnt[12] + '</td><td>' + activeCnt[13] + '</td><td>' + activeCnt[14] + '</td><td>' + activeCnt[15] + '</td><td>' + activeCnt[16] + '</td><td>' + activeCnt[17] + '</td></tr>' : '' ) + ( GM_getValue( 'displayNewBlocked', false ) ? '<tr align="center"><td align="left">Заблокированных:</td><td>' + blockedCnt[2] + '</td><td>' + blockedCnt[3] + '</td><td>' + blockedCnt[4] + '</td><td>' + blockedCnt[5] + '</td><td>' + blockedCnt[6] + '</td><td>' + blockedCnt[7] + '</td><td>' + blockedCnt[8] + '</td><td>' + blockedCnt[9] + '</td><td>' + blockedCnt[10] + '</td><td>' + blockedCnt[11] + '</td><td>' + blockedCnt[12] + '</td><td>' + blockedCnt[13] + '</td><td>' + blockedCnt[14] + '</td><td>' + blockedCnt[15] + '</td><td>' + blockedCnt[16] + '</td><td>' + blockedCnt[17] + '</td></tr>' : '' ) + '<tr align="center"><td align="left">Количество:</td><td>' + newLevels[2] + '</td><td>' + newLevels[3] + '</td><td>' + newLevels[4] + '</td><td>' + newLevels[5] + '</td><td>' + newLevels[6] + '</td><td>' + newLevels[7] + '</td><td>' + newLevels[8] + '</td><td>' + newLevels[9] + '</td><td>' + newLevels[10] + '</td><td>' + newLevels[11] + '</td><td>' + newLevels[12] + '</td><td>' + newLevels[13] + '</td><td>' + newLevels[14] + '</td><td>' + newLevels[15] + '</td><td>' + newLevels[16] + '</td><td>' + newLevels[17] + '</td></tr><tr class="wblight" align="center"><td colspan="17"><b>\u0417\u0430\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u043e \u0431\u0440\u0438\u043b\u043b\u0438\u0430\u043d\u0442\u043e\u0432:&nbsp;&nbsp;' + (newLevels[6] + newLevels[7] + newLevels[8] + newLevels[9] + (newLevels[10] + newLevels[11] + newLevels[12] + newLevels[13] + newLevels[14]) * 3 + (newLevels[15] + newLevels[16] + newLevels[17]) * 6) + ' </b></td></tr></table></td></tr>';
	var tb_arr = document.getElementsByTagName('table');
	for (var i = 0; i < tb_arr.length; i++)
	{
		if (!tb_arr[i]) continue;
		if (!tb_arr[i].childNodes[0]) continue;
		if (!tb_arr[i].childNodes[0].childNodes[0]) continue;
		if (!tb_arr[i].childNodes[0].childNodes[0].childNodes[0]) continue;
		if (!tb_arr[i].childNodes[0].childNodes[0].childNodes[0].innerHTML) continue;
		var text = tb_arr[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
		if (text.substring(0, 35) == '<br><b>\u041f\u0440\u0438\u0432\u043e\u0434\u044f \u043d\u043e\u0432\u044b\u0445 \u0438\u0433\u0440\u043e\u043a\u043e\u0432 \u0432 \u0438\u0433\u0440\u0443')
		{
			var elem = tb_arr[i].childNodes[0].childNodes[0].childNodes[0];
			break;
		}
	}
	var td1 = text.substring(0, text.indexOf('<table class="wb">'));
	var td2 = text.substring(text.indexOf('<table class="wb">'), text.indexOf('<br>(*) \u041d\u0430\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u0435 \u0431\u0440\u0438\u043b\u043b\u0438\u0430\u043d\u0442\u043e\u0432, \u0434\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u0439 \u0438 \u0430\u0440\u0442\u0435\u0444\u0430\u043a\u0442\u043e\u0432 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0441\u044f \u0441 \u0438\u0433\u0440\u043e\u043a\u043e\u0432, \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u043d\u044b\u0445 \u043d\u0435 \u0440\u0430\u043d\u0435\u0435 5.06.2011<br>'))
	var td3 = '<table border="0" style="width: 85%;" cellspacing="0" cellpadding="0">' + innerHTML + '</table>';
	var td4 = '<br>(*) \u041d\u0430\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u0435 \u0431\u0440\u0438\u043b\u043b\u0438\u0430\u043d\u0442\u043e\u0432, \u0434\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u0439 \u0438 \u0430\u0440\u0442\u0435\u0444\u0430\u043a\u0442\u043e\u0432 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0441\u044f \u0441 \u0438\u0433\u0440\u043e\u043a\u043e\u0432, \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u043d\u044b\u0445 \u043d\u0435 \u0440\u0430\u043d\u0435\u0435 5.06.2011<br>';
	if ( mode == 'auto' )
	{
		elem.innerHTML = '';
		var ob = document.createElement('table');
		ob.id = 'ref_tb';
		ob.style.width = '100%';
		ob.border = '0px';
		ob.innerHTML = '<tr><td colspan="2">' + td1 + '</td></tr><tr><td>' + td2 + '</td><td valign="top" align="center">' + td3 + '</td></tr><tr><td colspan="2">' + td4 + '</td></tr>';
		elem.appendChild(ob);
	}
	else
	{
		var ob = document.createElement('table');
		ob.id = 'ref_tb';
		ob.style.position = 'absolute';
		ob.style.top = top;
		ob.style.left = left;
		ob.style.width = width;
		ob.border = '0px';
		ob.innerHTML = innerHTML;
		document.getElementsByTagName('body')[0].appendChild(ob);
	}

	function id( elem )
	{
		var id = elem.getElementsByTagName('a')[0].href.match( /pl_info\.php\?id=([0-9]*)/ );
		return id[1];
	}
	
	function editMinAlertLevel()
	{
		var minLevel = prompt( '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c \u0434\u043b\u044f \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u044f \u043e\u0431 \u043f\u043e\u0432\u044b\u0448\u0435\u043d\u0438\u0438 \u0443\u0440\u043e\u0432\u043d\u044f \u0440\u0435\u0444\u0435\u0440\u0430\u043b\u043b\u0430', GM_getValue( 'minAlertLevel', 0 ) );
		if ( !isNaN( minLevel ) )
		{
			GM_setValue( 'minAlertLevel', minLevel );
			alert( '\u0433\u043e\u0442\u043e\u0432\u043e' );
		}
	}

    function editNewActive()
    {
        GM_setValue( 'displayNewActive', ( GM_getValue( 'displayNewActive', false ) ? false : true ) );
    }
	
    function editNewBlocked()
    {
        GM_setValue( 'displayNewBlocked', ( GM_getValue( 'displayNewBlocked', false ) ? false : true ) );
    }
	
	function getLevel( elem )
	{
		while ( elem.lastChild )
			elem = elem.lastChild;
		var m = elem.parentNode.innerHTML.match( /\[([0-9]*)\]/ );
		return m[1];
	}
	
	function getNick( elem )
	{
		while ( elem.lastChild )
			elem = elem.lastChild;
		var m = elem.parentNode.innerHTML.match( /(.*) \[[0-9]*\]/ );
		return m[1];
	}

    function getBlocked( elem )
    {
        return ( elem.innerHTML.indexOf('<strike>') != -1 ) ? true : false;
    }

    function getActive( elem )
    {
        return ( elem.parentNode.innerHTML.indexOf('#98e3a1') != -1 ) ? true : false;
    }
	
	function checkForUpdates( metadata )
	{
		var date = new Date();
		var today = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
		var lastDay = GM_getValue('lastDate', '');
		if ( today != lastDay )
		{
			GM_setValue('lastDate', today);
			var script_id = metadata['id'];
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/' + script_id + '.meta.js',
				headers:
				{
					'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.8.1)',
					'Accept': 'text /xml,application/xml,application/xhtml+xml,text/html',
					'Content-type': 'application/x-www-form-urlencoded'
				},
				onload: function(resp)
				{
					var newMetadata = toMetadata( resp.responseText );
					if ( metadata['version'] != newMetadata['version'] && confirm(metadata['name'] + ': \u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u043a\u0440\u0438\u043f\u0442\u0430!\n\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0441\u043a\u0440\u0438\u043f\u0442?') )
					{
						location.href = 'http://userscripts.org/scripts/source/' + script_id + '.user.js';
					}
				}
			});
		}
	}
	
	function toMetadata( string )
	{
		var m_arr = string.split('\n');
		var metadata_arr = new Array();
		for ( var i = 0; i < m_arr.length; i++ )
		{
			if ( /\/\/ @\w*\s*.*/.test(m_arr[i]) )
			{
				var metadata = m_arr[i].match(/\/\/ @(\w*)\s*(.*)/);
				metadata_arr[metadata[1]] = metadata[2];
			}
		}
		return metadata_arr;
	}