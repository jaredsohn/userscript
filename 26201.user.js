// (c) 2008-2009, xo4yxa
//
// ==UserScript==
// @name          LWM Map Move
// @description   automatic moves on LordsWM map
// @version       1.16.1
// @homepage      http://hwm.xo4yxa.ru/js/mapmove/
// @include       http://www.lordswm.com/map.php*
// @include       http://www.lordswm.com/move_sector.php*
// ==/UserScript==

var ver = '1.16.1'
var coop = '<center style="font-size:10px;"><a href="http://hwm.xo4yxa.ru/js/mapmove/" style="font-size:10px;">HWM map move</a> (ver. ' + ver + ') by <a href="http://www.heroeswm.ru/pl_info.php?id=130" style="font-size:10px;">xo4yxa</a></center>' ;

var url = 'http://www.lordswm.com/' ;
var url_cur = location.href ;
var url_ref = document.referrer ;
var ems = getI( "//embed[@name='map']" ).snapshotItem(0) ;
var pl =  ems.getAttribute( 'FlashVars' ).split('=')[1].split(':') ;
var road = new Array() ;
ems.width = 500;

/*
 - x
|
y
  49   50   51   52
  --   --   --   --
| 00 | 05 | 08 | 00 | 49
  --   --   --   --
| 04 | 01 | 02 | 07 | 50
  --   --   --   --
| 00 | 03 | 06 | 00 | 51
  --   --   --   --
*/

/*
var locM = 
{
//			с	св	в	юв	ю	юз	з	сз
	a1:	[	5,	0,	2,	6,	3,	0,	4,	0	] ,
	a2:	[	0,	0,	7,	0,	6,	3,	1,	5	] ,
	a3:	[	1,	2,	6,	0,	0,	0,	0,	4	] ,
	a4:	[	0,	5,	1,	3,	0,	0,	0,	0	] ,
	a5:	[	0,	0,	0,	2,	1,	4,	0,	0	] ,
	a6:	[	2,	7,	0,	0,	0,	0,	3,	1	] ,
	a7:	[	0,	0,	0,	0,	0,	6,	2,	0	] ,
	a8:	[	0,	0,	0,	0,	2,	1,	5,	0	]
}
*/

var dm = document.createElement( 'div' );
dm.innerHTML = '<table>' +
'<tr>' +
'<td></td>' + 
'<td id="loc_5"></td>' +
'<td id="loc_8"></td>' +
'<td></td>' + 
'</tr>' +
'<tr>' +
'<td id="loc_4"></td>' + 
'<td id="loc_1"></td>' +
'<td id="loc_2"></td>' +
'<td id="loc_7"></td>' +
'</tr>' +
'<tr>' +
'<td></td>' + 
'<td id="loc_3"></td>' +
'<td id="loc_6"></td>' +
'<td></td>' +
'</tr>' +
'</table> ' +
'<div><label for="id_check_go" style="cursor:pointer;"><input type="checkbox" id="id_check_go"> Stop on hunt</lable></div>' +
'<div><label for="id_check_gn" style="cursor:pointer;"><input type="checkbox" id="id_check_gn"> Enter to Mercenaries Guild</lable></div>' +
'<div><label for="id_check_vm" style="cursor:pointer;"><input type="checkbox" id="id_check_vm"> Hide flash-map</lable></div>' +
coop ;


if( GM_getValue( "lwm_mapmove_checklng" ) && GM_getValue( "lwm_mapmove_checklng" ) == 1 )
{
	var check_lng_v = 1 ;
	var lng = 2 + 3 ;
} else
{
	var check_lng_v = 0 ;
	var lng = 1 + 3 ;
}


// cX_Y
var locX =
{
	c50_50:	1 ,	//Great Capital 
	c51_50:	2 ,	//East Bay 
	c50_51:	3 ,	//Yellow Lake
	c49_50:	4 ,	//Blooming Glade
	c50_49:	5 ,	//Silent Hill
	c51_51:	6 ,	//Misty Coast
	c52_50:	7 ,	//Ridge Of Hope
	c51_49:	8	//Seraph's Tears
}


// locations array
var locArr = new Array
(
//	0i	1x	2y	3r	4ne				5nr
	[] ,
	[ 1 , 	50 ,	50 ,	1 ,	'Great Capital' ,		'Great Capital' ] ,
	[ 2 ,	51 ,	50 ,	1 ,	'East Bay' ,			'East Bay' ] ,
	[ 3 ,	50 ,	51 ,	1 ,	'Yellow Lake' ,			'Yellow Lake' ] ,
	[ 4 ,	49 ,	50 ,	1 ,	'Blooming Glade' ,		'Blooming Glade' ] ,
	[ 5 ,	50 ,	49 ,	1 ,	'Silent Hill' ,			'Silent Hill' ] ,
	[ 6 ,	51 ,	51 ,	1 ,	'Misty Coast' ,			'Misty Coast' ] ,
	[ 7 ,	52 ,	50 ,	1 ,	'Ridge Of Hope' ,		'Ridge Of Hope' ] ,
	[ 8 ,	51 ,	49 ,	1 ,	'Seraphs Tears' ,		'Seraphs Tears' ]
)

// location error
var locP =
{
}


if( url_cur.indexOf( 'map.php' ) > -1 )
{
	if( GM_getValue( "lwm_map_move" ) == 1 )
	{
		getCXY() ;
	} else
	{
		init();
	}
} else if( url_cur.indexOf( 'move_sector.php' ) > -1 )
{
	init();
}

function init()
{
	var el = ems;
	nado = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
/*
0 - cur place
1 - view place
2-10 - have move
11 - gO
12 - gV
13 - gN
14 - loc from move (only move)
15 - last time move (only move)
16 - all time move (only move)
17 - ?
18 - clan id
19 - ?
20 - ?
*/
	var vm = GM_getValue( "lwm_mapmove_checkvm" ) ; // отображение карты
	if( vm == 1 )
	{
		ems.style.display = 'none' ;
	} else
	{
		ems.width = 500;
	}

	if( pl[14] > 0 )
// происходит передвижение
	{
		var mz = GM_getValue( "lwm_map_move_mz" ) ;
		if( mz == 0 )
		{
			place = locArr[pl[0]][lng] ;
		} else
		{
			place = locArr[mz][lng] ;
		}

		if( pl[0] != mz )
		{
			var stop = ' [<a href="javascript: void(0)" id="a_stop_move">stop</a>]' ;
		div = document.createElement( 'div' );
		div.innerHTML = '<br><div id="hint_move">Final destination: <b>' + place + '</b>' + stop + '</div><br>' + coop ;
			nado.appendChild( div );
			var a = $('a_stop_move');
			a.addEventListener( "click", setStop , false );
		} else
		{
			div = document.createElement( 'div' );
			div.innerHTML = '<br><div id="hint_move">Final destination: <b>' + place + '</b></div><br>' + coop ;
			nado.appendChild( div );
		}

		var mTitle = document.title ;
		var start_time = new Date() ;
		update_time( start_time.getTime() , mTitle ) ;
	} else
// стоим в секторе
	{
		nado.appendChild( dm ) ;

		var check_go = $('id_check_go')
		check_go.checked = ( GM_getValue( "lwm_mapmove_checkgo" ) && GM_getValue( "lwm_mapmove_checkgo" ) == 1 ) ? 'checked' : '' ;
		check_go.addEventListener( "click", setCheckGo , false );

		var check_gn = $('id_check_gn')
		check_gn.checked = ( GM_getValue( "lwm_mapmove_checkgn" ) && GM_getValue( "lwm_mapmove_checkgn" ) == 1 ) ? 'checked' : '' ;
		check_gn.addEventListener( "click", setCheckGn , false );

		var check_vm = $('id_check_vm')
		check_vm.checked = ( GM_getValue( "lwm_mapmove_checkvm" ) && GM_getValue( "lwm_mapmove_checkvm" ) == 1 ) ? 'checked' : '' ;
		check_vm.addEventListener( "click", setCheckVm , false );
/*
		var check_lng = $('id_check_lng') ;
		if( check_lng_v == 1 )
		{
			check_lng.checked = 'checked' ;
		} else
		{
			check_lng.checked = '' ;
		}
		check_lng.addEventListener( "click", setCheckLng , false );
*/
//alert( locArr.length )
		for( l = 1 ; l < locArr.length; l++ )
		{
//alert( 'ok' + l )

			var d = document.getElementById( 'loc_' + l ) ;
			d.style.textAlign = 'center' ;
			d.style.padding = '2px 4px' ;
			d.style.fontSize = '11px' ;
			d.style.border = '1px solid #abc' ;
			if( l == pl[0] )
			{
				d.style.fontWeight = 'bold' ;
				d.style.backgroundColor = 'FFF8DC' ;
				if( pl[13] != 0 && l == pl[13] )
				{
					d.style.color = 'FF0000' ;
				}
				d.innerHTML = locArr[l][lng] ;
			} else
			{
				a = document.createElement( 'a' );
				a.style.fontSize = '11px' ;
				a.href = 'javascript: void(0)' ;
				if( pl[13] != 0 && l == pl[13] )
				{
					a.style.color = 'FF0000' ;
				}
				a.innerHTML = locArr[l][lng] ;
				a.setAttribute( 'tZ' , l ) ;

				a.addEventListener( "mouseover", viewPath , false );
				a.addEventListener( "mouseout", hidePath , false );

				a.addEventListener( "click", setMXY , false );
				a.title = locArr[l][lng] + ' (' + getTimeL( pl[0] , l , 0 ) + ')' ;
				d.appendChild( a );
			}
			if( pl[13] == -1 && ( l == 3 ) )
			{
				b = document.createElement( 'b' );
				b.style.color = '#00F' ;
				b.innerHTML = ' X' ;
				d.appendChild( b ) ;
			}

		}
	}
}

function update_time( start , title )
{
	new_time=new Date();
	s=pl[15]-Math.round((new_time.getTime()-start)/1000.);
	m=0;h=0;
	if(s<0)
	{
	} else
	{
		if(s>59)
		{
			m=Math.floor(s/60);
			s=s-m*60;
		}
		if(m>59)
		{
			h=Math.floor(m/60);
			m=m-h*60;
		}
		if(s<10)
		{
			s="0"+s;
		}
		if(m<10)
		{
			m="0"+m;
		}
//		document.title=" ["+h+":"+m+":"+s+"] " + title;
		document.title=" ["+m+":"+s+"] " + title;
		setTimeout( function(){ update_time(start,title)},999);
	}
}

function move( cz , mz )
{
	if( pl[14] != 0 )
// если на странице перемещения
	{
		init();
		return ;
	}
	if( mz == cz )
// если прибыли в конечный пункт
	{
		GM_setValue( "lwm_map_move" , 0 ) ;
		GM_setValue( "lwm_map_move_mz" , 0 ) ;
		if( pl[13] == -1 && ( cz == 3 ) && ( GM_getValue( "lwm_mapmove_checkgn" ) && GM_getValue( "lwm_mapmove_checkgn" ) == 1 ) )
// если было задание ГН и пришли в сектор где есть ГН
		{
			window.location.href = url + 'mercenary_guild.php' ;
			return ;
		}
		init();
		return ;
	}

	if( pl[11] != '' && ( GM_getValue( "lwm_mapmove_checkgo" ) && GM_getValue( "lwm_mapmove_checkgo" ) == 1 ) )
// есть охота
	{
		GM_setValue( "lwm_map_move" , 0 ) ;
		GM_setValue( "lwm_map_move_mz" , 0 ) ;
		return ;
	}

	id0 = cz
	idN = mz
	id1 = eval( 'locP.l' + id0 + '_' + idN ) //Ид исключение
	if( id1 && id1 > 0 )
	{
		window.location.href = url + 'move_sector.php?id=' + id1 ;
		return;
	}

	var kC = locArr[id0] ; //координаты текущие
	var kM = locArr[idN] ; //координаты назначения

	if( kC[3] != kM[3] )
	{
		move( cz , eC ) ;
		return ;
	}

	nx = kM[1] > kC[1] ? parseInt(kC[1]) + 1 : ( kM[1] == kC[1] ? kC[1] : parseInt(kC[1]) - 1 ) ;
	ny = kM[2] > kC[2] ? parseInt(kC[2]) + 1 : ( kM[2] == kC[2] ? kC[2] : parseInt(kC[2]) - 1 ) ;
	id = eval( 'locX.c' + nx + '_' + ny ) ;
	window.location.href = url + 'move_sector.php?id=' + id ;
}


function setMXY()
{
	GM_setValue( "lwm_map_move_mz" , this.getAttribute( 'tz' ) )
	GM_setValue( "lwm_map_move" , 1 ) ;
	getCXY();
}


function getCXY()
{
	move( pl[0] , GM_getValue( "lwm_map_move_mz" ) ) ;
}


function setStop()
{
	GM_setValue( "lwm_map_move" , 0 ) ;
	GM_setValue( "lwm_map_move_mz" , 0 ) ;
	$('hint_move').innerHTML = 'Final destination: <b>' + locArr[pl[0]][lng] + '</b>' ;
}


function setCheckGo()
{
	if( GM_getValue( "lwm_mapmove_checkgo" ) && GM_getValue( "lwm_mapmove_checkgo" ) == 1 )
	{
		GM_setValue( "lwm_mapmove_checkgo" , 0 );
	} else
	{
		GM_setValue( "lwm_mapmove_checkgo" , 1 );
	}
}

function setCheckGn()
{
	if( GM_getValue( "lwm_mapmove_checkgn" ) && GM_getValue( "lwm_mapmove_checkgn" ) == 1 )
	{
		GM_setValue( "lwm_mapmove_checkgn" , 0 );
	} else
	{
		GM_setValue( "lwm_mapmove_checkgn" , 1 );
	}
}

function setCheckVm()
{
	if( GM_getValue( "lwm_mapmove_checkvm" ) && GM_getValue( "lwm_mapmove_checkvm" ) == 1 )
	{
		GM_setValue( "lwm_mapmove_checkvm" , 0 );
	} else
	{
		GM_setValue( "lwm_mapmove_checkvm" , 1 );
	}
}

function setCheckLng()
{
	if( GM_getValue( "lwm_mapmove_checklng" ) && GM_getValue( "lwm_mapmove_checklng" ) == 1 )
	{
		GM_setValue( "lwm_mapmove_checklng" , 0 );
	} else
	{
		GM_setValue( "lwm_mapmove_checklng" , 1 );
	}
}

function getTimeL( cz , mz , t )
/*
	cz	текущий сектор обсчета
	mz 	конечный сектор обсчета
	t	сумма времени
*/
{
// если прибыли в конечный пункт
	if( mz == cz )
	{
		var myT = new Date(t*1000)
		myTs = myT.getSeconds()
		return myT.getMinutes() + ':' + ( myTs < 10 ? '0' : '' ) + myTs ;
	}

	var nz = 0 ; // следующий сектор, к которому надо действительно двигаться

	var kC = locArr[cz] ; //координаты текущие
	var kM = locArr[mz] ; //координаты назначения

	id1 = eval( 'locP.l' + cz + '_' + mz ) //Ид исключение

// если есть исключения, следующий сектор будет равен ид исключения
	if( id1 && id1 > 0 )
	{
		nz = id1 ;
	}

// если исключения, то переназначаем координаты назначения
	if( nz != 0 ) var kM = locArr[nz] ;

	tx = kM[1] > kC[1] ? 1 : ( kM[1] == kC[1] ? 0 : -1 ) ;
	ty = kM[2] > kC[2] ? 1 : ( kM[2] == kC[2] ? 0 : -1 ) ;
	nx = parseInt( kC[1] ) + tx ;
	ny = parseInt( kC[2] ) + ty ;

	t = ( ty == 0 || tx == 0 ) ? t + 120 : t + 169 ;
	id = eval( 'locX.c' + nx + '_' + ny ) ;
//	t = t + ' ' + id + '(' + nz + ')' ;

	return getTimeL( id , mz , t );
}


function viewPath()
{
	mz = this.getAttribute( 'tz' ) ;

	path( pl[0] , mz ) ;
	function path( cz , mz )
	{
		if( mz == cz )	 return ;
		var nz = 0 ; // следующий сектор, к которому надо действительно двигаться
		var kC = locArr[cz] ; //координаты текущие
		var kM = locArr[mz] ; //координаты назначения
		id1 = eval( 'locP.l' + cz + '_' + mz ) //Ид исключение
// если есть исключения, следующий сектор будет равен ид исключения
		if( id1 && id1 > 0 )
		{
			nz = id1 ;
		}

// если исключения, то переназначаем координаты назначения
		if( nz != 0 ) var kM = locArr[nz] ;
		tx = kM[1] > kC[1] ? 1 : ( kM[1] == kC[1] ? 0 : -1 ) ;
		ty = kM[2] > kC[2] ? 1 : ( kM[2] == kC[2] ? 0 : -1 ) ;
		nx = parseInt( kC[1] ) + tx ;
		ny = parseInt( kC[2] ) + ty ;
		id = eval( 'locX.c' + nx + '_' + ny ) ;

		td = $('loc_'+id)
		td.style.backgroundColor = 'F0E68C' ;
		road[road.length] = id ;
		path( id , mz );
	}

	return ;
}

function hidePath()
{
	for( i = 0; i < road.length ; i ++ )
	{
		$('loc_'+road[i]).style.backgroundColor = 'DDD9CD' ;
	}
	road = new Array() ;
}


function getI( xpath )
{
	return document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}
function $( id ) { return document.getElementById( id ); }
