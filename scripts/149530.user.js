// ==UserScript==
// @name           [HWM] SkladLogSearch
// @namespace      [HWM] SkladLogSearch
// @homepage       http://userscripts.org/scripts/show/149530
// @include        http://www.heroeswm.ru/sklad_log.php*
// @version        1.02
// @author         Alex_2oo8
// ==/UserScript==

    GM_addStyle( '.HWM_transfer_search_checkbox_label {background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAAAsCAYAAACOu+GLAAABrElEQVR42u3bsWrCQByA8RhdXBzEJY8gcXZz9Ek6BkIhSxBck1foG3QogpPg5uguklG6iIPU4qCT+ZcLGDiibY03ZPiGD4yaLPcTyV3O+nh/E6JnStNULPXi1X8xlunrUbX7/vrUIakDE5m+HlU7IBGQCEgEJCARkAhIBCQCEpAISAQkAhKQgAQkAhIBiYAEJAISAYmqC0kdmMr09aj6ZZD4VZGJLHZBELtIiF0kxF0bkMg8pOVyKd1uF0hAem7gfd8Xy7KABKTyA+95XoYISEAqDSkIghwRkIBUgLRarf48OQxDDVGz2QQSkPSB7/f7st1u7544Go00RI1GQxaLBZCApA98rVYTx3HkeDxqJ1wuFxmPxxoi9d0kSbj9B9JtSApJu92W/X6fvx9FUf7Ztc1mwzwSkG5DqtfrOZRer5f9zcVxrAFSzedzJiTpPqThcKiB6XQ6BUSTyYSZbfod0m63E9d1C3iuzWYzlkjof/NI5/NZWq1WAdF6vWatjR6bkDydTtkamgJk23a2psaiLZWa2T4cDjIYDGQ6nbL6TzxGQkAidpEQu0iIHuwH8Zq0OtRsnH4AAAAASUVORK5CYII%3D\');background-position:top;display:block;width:120px;height:18px;padding:2px;padding-left:24px;line-height:18px;-moz-user-select:none;cursor:default;}' + 
                 '.HWM_transfer_search_checkbox_label.checked {background-position:bottom;}' +
                 '.HWM_transfer_search_checkbox_checkbox {display:none;}' );
    
    var id = getId();
    var td_arr = document.getElementsByTagName('td');
    for (var i = 0; i < td_arr.length; i++)
    {
        if ( td_arr[i].getElementsByTagName('center').length > 0 && /Протокол склада <a.* href="sklad_info\.php\?id=[0-9]*">#[0-9]*<\/a> \(клан <b>#[0-9]*<\/b> <a.* href="clan_info\.php\?id=[0-9]*"><b>.*<\/b><\/a>\)/.test( td_arr[i].getElementsByTagName('center')[0].innerHTML ) )
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
    var tr = document.createElement( 'tr' );
    var td = document.createElement( 'td' );
    td.innerHTML = 'Поиск всех записей:';
    tr.appendChild( td );
    var td = document.createElement( 'td' );
    var inp = document.createElement( 'input' );
    inp.type = 'text';
    inp.disabled = 'disabled';
    inp.value = ' только по чекбоксам!';
    td.appendChild( inp );
    tr.appendChild( td );
    var td = document.createElement( 'td' );
    var inp = document.createElement( 'input' );
    inp.type = 'button';
    inp.value = '\u041f\u043e\u0438\u0441\u043a';
    inp.id = 'TSearchAll';
    td.appendChild( inp );
    tr.appendChild( td );
    tb.appendChild( tr );
    var tr = document.createElement( 'tr' );
    var td = document.createElement( 'td' );
    td.innerHTML = 'Ограничение по дате:';
    tr.appendChild( td );
    var td = document.createElement( 'td' );
    td.setAttribute( 'colspan', '2' );
    var inp = document.createElement( 'input' );
    inp.type = 'text';
    inp.value = '01-01-00';
    inp.id = 'TSearchDateFrom';
    inp.size = '7';
    td.appendChild( inp );
    var inp = document.createElement( 'input' );
    inp.type = 'text';
    inp.value = '31-12-99';
    inp.id = 'TSearchDateTo';
    inp.size = '7';
    td.appendChild( inp );
    tr.appendChild( td );
    tb.appendChild( tr );
    var tr = document.createElement('tr');
    var td = document.createElement( 'td' );
    var label = document.createElement( 'div' );
    label.className = 'HWM_transfer_search_checkbox_label checked';
    label.id = 'TSearchRent';
    label.innerHTML += 'Аренда/Вернул';
    td.appendChild( label );
    tr.appendChild( td );
    var td = document.createElement( 'td' );
    var label = document.createElement( 'div' );
    label.className = 'HWM_transfer_search_checkbox_label checked';
    label.id = 'TSearchPut';
    label.innerHTML += 'Поместил/Забрал';
    td.appendChild( label );
    tr.appendChild( td );
    tb.appendChild( tr );
    var tr = document.createElement('tr');
    var td = document.createElement( 'td' );
    var label = document.createElement( 'div' );
    label.className = 'HWM_transfer_search_checkbox_label checked';
    label.id = 'TSearchRepair';
    label.innerHTML += 'Ремонт';
    td.appendChild( label );
    tr.appendChild( td );
    var td = document.createElement( 'td' );
    var label = document.createElement( 'div' );
    label.className = 'HWM_transfer_search_checkbox_label checked';
    label.id = 'TSearchCash';
    label.innerHTML += 'Золото/Постройки';
    td.appendChild( label );
    tr.appendChild( td );
    tb.appendChild( tr );
    div.appendChild( tb );
    elem.getElementsByTagName('center')[0].appendChild( div );
    
    
    document.getElementById('TSearchRent').addEventListener( 'click', function() { if ( this.className.indexOf('checked') != -1 ) this.className = 'HWM_transfer_search_checkbox_label'; else this.className = 'HWM_transfer_search_checkbox_label checked'; }, false );
    document.getElementById('TSearchPut').addEventListener( 'click', function() { if ( this.className.indexOf('checked') != -1 ) this.className = 'HWM_transfer_search_checkbox_label'; else this.className = 'HWM_transfer_search_checkbox_label checked'; }, false );
    document.getElementById('TSearchRepair').addEventListener( 'click', function() { if ( this.className.indexOf('checked') != -1 ) this.className = 'HWM_transfer_search_checkbox_label'; else this.className = 'HWM_transfer_search_checkbox_label checked'; }, false );
    document.getElementById('TSearchCash').addEventListener( 'click', function() { if ( this.className.indexOf('checked') != -1 ) this.className = 'HWM_transfer_search_checkbox_label'; else this.className = 'HWM_transfer_search_checkbox_label checked'; }, false );
    document.getElementById('TSearchByNick').addEventListener( 'click', function() { search( id, elem, 'Nick' ); }, false );
    document.getElementById('TSearchByArt').addEventListener( 'click', function() { search( id, elem, 'Art' ); }, false );
    document.getElementById('TSearchAll').addEventListener( 'click', function() { search( id, elem, 'All' ); }, false );
    
    function search( id, elem, type )
    {
        var regArr = new Array();
        regArr[0] = document.getElementById('TSearchRent').className.indexOf('checked') != -1 ? /(?:арендовал)|(?:вернул ')|(?:возвращено автоматически ')/ : /#{1000000}/;
        regArr[1] = document.getElementById('TSearchPut').className.indexOf('checked') != -1 ? /(?:забрал)|(?:поместил)/ : /#{1000000}/;
        regArr[2] = document.getElementById('TSearchRepair').className.indexOf('checked') != -1 ? /(?:взял в ремонт)|(?:возвращено .* c ремонта)|(?:вернул c ремонта)/ : /#{1000000}/;
        regArr[3] = document.getElementById('TSearchCash').className.indexOf('checked') != -1 ? /(?:Передано [0-9]* золота на счет клана <a href="clan_info\.php\?id=[0-9]*"><b>#[0-9]*<\/b><\/a>)|(?:Получено [0-9]* золота со счета клана <a href="clan_info\.php\?id=[0-9]*"><b>#[0-9]*<\/b><\/a>)|(?:Открыт доступ к складу из .* за [0-9]* золота)|(?:Увеличена вместимость: \+[0-9]* артефактов за [0-9]* золота) \/\/ .*/ : /#{1000000}/;
        
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
            url: 'http://www.heroeswm.ru/sklad_log.php?page=99999&id=' + id,
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
                    if ( td_arr[i].getElementsByTagName('center').length > 0 && /Протокол склада <a.* href="sklad_info\.php\?id=[0-9]*">#[0-9]*<\/a> \(клан <b>#[0-9]*<\/b> <a.* href="clan_info\.php\?id=[0-9]*"><b>.*<\/b><\/a>\)/.test( td_arr[i].getElementsByTagName('center')[0].innerHTML ) )
                    {
                        var element = td_arr[i];
                        break;
                    }
                }
                if ( element.getElementsByTagName('center').length > 1 )
                {
                    var lastPg = Number( element.getElementsByTagName('center')[1].getElementsByTagName('b')[0].getElementsByTagName('font')[0].innerHTML );
                }
                else
                {
                    var lastPg = 1;
                }
                search2( id, type, elem, lastPg, regArr );
            }
        });
    }
    
    function rep( str ) 
    {
        str = str.replace( /\\/g, '\\\\' ).replace( /\[/g, '\\[' ).replace( /\]/g, '\\]' ).replace( /\(/g, '\\(' ).replace( /\)/g, '\\)' ).replace( /\./g, '\\.' ).replace( /\+/g, '\\+' ).replace( /\*/g, '\\*' ).replace( /\?/g, '\\?' ).replace( /\$/g, '\\$' ).replace( /\|/g, '\\|' );
        return str;
    }
    
    function prevDate( str )
    {
        var date = str.match( /([0-9]{2})-([0-9]{2})-([0-9]{2})/ );
        return ( Number(date[1]) - 1 < 10 ? '0' : '' ) + ( Number(date[1]) - 1 ) + '-' + date[2] + '-' + date[3];
    }
    
    function minDate( str1, str2 )
    {
        var date1 = str1.match( /([0-9]{2})-([0-9]{2})-([0-9]{2})/ );
        var date2 = str2.match( /([0-9]{2})-([0-9]{2})-([0-9]{2})/ );
        
        for ( var i = 1; i <= 3; i++ )
        {
            date1[i] = Number( date1[i] );
            date2[i] = Number( date2[i] );
        }
        
        if ( ( date1[3] < date2[3] ) || ( date1[3] == date2[3] && date1[2] < date2[2] ) || ( date1[3] == date2[3] && date1[2] == date2[2] && date1[1] < date2[1] ) )
        {
            return str1;
        }
        else
        {
            return str2;
        }
    }
    
    function findFirst( l, r, str, id, t, type, elem, pgCount, reg, regArr, search_str, dateTo, dateFrom )
    {
        if ( l < r )
        {
            var c = Math.floor( (l+r) / 2 );
            GM_xmlhttpRequest(
            {
                method: 'GET',
                url: 'http://www.heroeswm.ru/sklad_log.php?id=' + id + '&page=' + (c-1),
                overrideMimeType: 'text/html; charset=windows-1251',
                onload: function( resp )
                {
                    var div = document.getElementById( 'response' );
                    div.innerHTML = resp.responseText;
                    var respDoc = div;
                    var td_arr = respDoc.getElementsByTagName('td');
                    for (var i = 0; i < td_arr.length; i++)
                    {
                        if ( td_arr[i].getElementsByTagName('center').length > 0 && /Протокол склада <a.* href="sklad_info\.php\?id=[0-9]*">#[0-9]*<\/a> \(клан <b>#[0-9]*<\/b> <a.* href="clan_info\.php\?id=[0-9]*"><b>.*<\/b><\/a>\)/.test( td_arr[i].getElementsByTagName('center')[0].innerHTML ) )
                        {
                            var element = td_arr[i];
                            break;
                        }
                    }
                    var text = element.innerHTML.substring( element.innerHTML.indexOf('&nbsp;&nbsp;') );
                    var transfers = text.split('<br>');
                    transfers[0] = ' ' + transfers[0];
                    
                    if ( minDate( str, transfers[ transfers.length - 2 ].substring( 13, 21 ) ) == transfers[ transfers.length - 2 ].substring( 13, 21 ) )
                    {
                        findFirst( l, c, str, id, t, type, elem, pgCount, reg, regArr, search_str, dateTo, dateFrom );
                    }
                    else
                    {
                        findFirst( c+1, r, str, id, t, type, elem, pgCount, reg, regArr, search_str, dateTo, dateFrom );
                    }
                }
            });
                
        }
        else
        {
            if ( t == 1 )
            {
                search3( id, type, elem, l, pgCount, reg, regArr, search_str, dateTo, dateFrom );
            }
            else if ( t == 2 )
            {
                search4( id, type, elem, pgCount, l, reg, regArr, search_str, dateTo, dateFrom );
            }
        }
    }
    
    function search2( id, type, elem, pgCount, regArr )
    {
        switch(type)
        {
            case 'Nick':
                var search_str = document.getElementById('TSearchNick').value;
                var reg = new RegExp( '[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}: .*<a.*><b>' + rep( search_str ) + '<\/b><\/a>' );
                break;
            case 'Art':
                var search_str = document.getElementById('TSearchArt').value;
                var reg = new RegExp( '[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}: .* \'' + rep( search_str ) + '.*\'' );
                break;
            case 'All':
                var search_str = '';
                var reg = new RegExp( '.*' );
                break;
        }
        
        var dateFrom = document.getElementById('TSearchDateFrom').value;
        var dateTo = document.getElementById('TSearchDateTo').value;
        
        while( elem.lastChild )
        {
            elem.removeChild( elem.lastChild );
        }
        var text = document.createElement( 'text' );
        text.innerHTML = '<center>Готовимся к поиску...</center>';
        elem.appendChild( text );

        findFirst( 1, pgCount, dateTo, id, 1, type, elem, pgCount, reg, regArr, search_str, dateTo, dateFrom );
    }
    
    function search3( id, type, elem, firstPg, pgCount, reg, regArr, search_str, dateTo, dateFrom )
    {
        findFirst( firstPg, pgCount, prevDate( dateFrom ), id, 2, type, elem, firstPg, reg, regArr, search_str, dateTo, dateFrom );
    }
    
    function search4( id, type, elem, firstPg, lastPg, reg, regArr, search_str, dateTo, dateFrom )
    {
        while( elem.lastChild )
        {
            elem.removeChild( elem.lastChild );
        }
        elem.appendChild( document.createElement( 'br' ) );
        var center = document.createElement( 'center' );
        center.innerHTML = 'Поиск по протоколу склада ';
        var a = document.createElement( 'a' );
        a.href = 'sklad_info.php?id=' + id;
        a.style.textDecoration = 'none';
        a.innerHTML = '#' + id;
        center.appendChild( a );
        elem.appendChild( center );
        elem.appendChild( document.createElement( 'br' ) );
        var center = document.createElement( 'center' );
        center.id = 'TSearch';
        center.innerHTML = 'Идет поиск ' + type.replace( 'Nick', 'по нику <a href="pl_info.php?nick=' + search_str + '" style="text-decoration: none;"><b>' + search_str + '</b></a>' ).replace( 'Art', 'по артефакту\'' + search_str + '\'' ).replace( 'All', '' ) + '... (<a href="javascript: void(0);" id="cancel" onclick="document.getElementById(\'stop\').value = \'1\';">\u0441\u0442\u043e\u043f</a>)';
        center.appendChild( document.createElement( 'br' ) );
        center.innerHTML += '\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u043e <text id="viewed">0</text> \u0441\u0442\u0440\u0430\u043d\u0438\u0447\u0435\u043a \u0438\u0437 ' + ( lastPg - firstPg + 1 ) + ' (<text id="percent">0</text>%)';
        center.appendChild( document.createElement( 'br' ) );
        center.innerHTML += '\u041d\u0430\u0439\u0434\u0435\u043d\u043e <text id="matches">0</text> \u0437\u0430\u043f\u0438\u0441\u0435\u0439:';
        elem.appendChild( center );
        elem.appendChild( document.createElement( 'br' ) );
        startSearch( firstPg, id, reg, regArr, firstPg, lastPg, elem, type, search_str, dateFrom, dateTo );
    }
    
    function checkRegArr( str, regArr )
    {
        var res = false;
        for ( var i = 0; i < 4; i++ )
        {
            res = res || regArr[i].test( str );
        }
        
        return res;
    }
    
    function startSearch( pg, id, reg, regArr, firstPg, lastPg, elem, type, search_str, dateFrom, dateTo )
    {
        if ( document.getElementById('stop').value != '1' && pg <= lastPg )
        {
            var pg = pg - 1;
            GM_xmlhttpRequest(
            {
                method: 'GET',
                url: 'http://www.heroeswm.ru/sklad_log.php?id=' + id + '&page=' + pg,
                overrideMimeType: 'text/html; charset=windows-1251',
                onload: function( resp )
                {
                    var div = document.getElementById( 'response' );
                    div.innerHTML = resp.responseText;
                    var respDoc = div;
                    var td_arr = respDoc.getElementsByTagName('td');
                    for (var i = 0; i < td_arr.length; i++)
                    {
                        if ( td_arr[i].getElementsByTagName('center').length > 0 && /Протокол склада <a.* href="sklad_info\.php\?id=[0-9]*">#[0-9]*<\/a> \(клан <b>#[0-9]*<\/b> <a.* href="clan_info\.php\?id=[0-9]*"><b>.*<\/b><\/a>\)/.test( td_arr[i].getElementsByTagName('center')[0].innerHTML ) )
                        {
                            var element = td_arr[i];
                            break;
                        }
                    }
                    var text = element.innerHTML.substring( element.innerHTML.indexOf('&nbsp;&nbsp;') );
                    var transfers = text.split('<br>');
                    transfers[0] = ' ' + transfers[0];
                    for ( var i = 0; i < transfers.length - 1; i++ )
                    {
                        var currDate = transfers[i].substring( 13, 21 );

                        if ( reg.test( transfers[i] ) && checkRegArr( transfers[i], regArr ) && minDate( dateFrom, currDate ) == dateFrom && minDate( dateTo, currDate ) == currDate )
                        {
                            document.getElementById('matches').innerHTML = ( Number( document.getElementById('matches').innerHTML ) + 1 );
                            elem.innerHTML += transfers[i];
                            elem.appendChild( document.createElement('br') );
                        }

                    }
                    document.getElementById('viewed').innerHTML = ( Number( document.getElementById('viewed').innerHTML ) + 1 );
                    document.getElementById('percent').innerHTML = ( Math.round( document.getElementById('viewed').innerHTML * 100 / ( lastPg - firstPg + 1 ) ) );
                    pg = ( Number(pg) + 2 );
                    startSearch( pg, id, reg, regArr, firstPg, lastPg, elem, type, search_str, dateFrom, dateTo );
                }
            });
        }
        else
        {
            var matches = document.getElementById('matches').innerHTML;
            document.getElementById('TSearch').innerHTML = 'Поиск ' + type.replace( 'Nick', 'по нику <a href="pl_info.php?nick=' + search_str + '" style="text-decoration: none;"><b>' + search_str + '</b></a>' ).replace( 'Art', 'по артефакту \'' + search_str + '\'' ).replace( 'All', '' ) + ' закончен!<br>\u041d\u0430\u0439\u0434\u0435\u043d\u043e ' + matches + ' \u0437\u0430\u043f\u0438\u0441\u0435\u0439:';
        }
    }
    
    function getId()
    {
        var id = location.href.match( /\?(?:.*=.*&)*id=([0-9]*)(?:&.*=.*)*/ );
        return id[1];
    }