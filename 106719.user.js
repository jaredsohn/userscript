// ==UserScript==
// @source	  HWM map move (ver. 1.16.1) by xo4yxa	
// @name          LWM Map Move
// @description   automatic moves on LordsWM map
// @version       1.02
// @include       http://www.lordswm.com/map.php*
// @include       http://www.lordswm.com/move_sector.php*
// ==/UserScript==

var ver = '1.02'
var coop = '<center style="font-size:10px;"> Map move (ver. ' + ver + ') by <a href="http://www.lordswm.com/pl_info.php?id=116083" style="font-size:10px;">Hedvig</a></center>' ;

var url = 'http://www.lordswm.com/' ;
var url_cur = location.href ;
var url_ref = document.referrer ;
var ems = getI( "//embed[@name='map']" ).snapshotItem(0) ;
var pl =  ems.getAttribute( 'FlashVars' ).split('=')[1].split(':') ;
var road = new Array() ;
ems.width = 500;



var dm = document.createElement( 'div' );
dm.innerHTML = '<table>' +
'<tr>' +
'<td id="loc_9"></td>' +
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
	c51_49:	8 ,	//Seraph's Tears
	c49_49: 9	//Verdant Dell
}


// locations array
var locArr = new Array
(

	[] ,
	[ 1 , 	50 ,	50 ,	1 ,	'Great Capital' ,		'Great Capital' ] ,
	[ 2 ,	51 ,	50 ,	1 ,	'East Bay' ,			'East Bay' ] ,
	[ 3 ,	50 ,	51 ,	1 ,	'Yellow Lake' ,			'Yellow Lake' ] ,
	[ 4 ,	49 ,	50 ,	1 ,	'Blooming Glade' ,		'Blooming Glade' ] ,
	[ 5 ,	50 ,	49 ,	1 ,	'Silent Hill' ,			'Silent Hill' ] ,
	[ 6 ,	51 ,	51 ,	1 ,	'Misty Coast' ,			'Misty Coast' ] ,
	[ 7 ,	52 ,	50 ,	1 ,	'Ridge Of Hope' ,		'Ridge Of Hope' ] ,
	[ 8 ,	51 ,	49 ,	1 ,	'Seraphs Tears' ,		'Seraphs Tears' ] ,
	[ 9 ,   49 , 	49 , 	1 , 	'Verdant Dell'	,		'Verdant Dell'	] 
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

	var vm = GM_getValue( "lwm_mapmove_checkvm" ) ;
	if( vm == 1 )
	{
		ems.style.display = 'none' ;
	} else
	{
		ems.width = 500;
	}

	if( pl[14] > 0 )

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
			if( pl[13] == -1 && ( l == 8 ) )
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

	{
		init();
		return ;
	}
	if( mz == cz )

	{
		GM_setValue( "lwm_map_move" , 0 ) ;
		GM_setValue( "lwm_map_move_mz" , 0 ) ;
		if( pl[13] == -1 && ( cz == 3 || cz == 8 ) && ( GM_getValue( "lwm_mapmove_checkgn" ) && GM_getValue( "lwm_mapmove_checkgn" ) == 1 ) )

		{
			window.location.href = url + 'mercenary_guild.php' ;
			return ;
		}
		init();
		return ;
	}

	if( pl[11] != '' && ( GM_getValue( "lwm_mapmove_checkgo" ) && GM_getValue( "lwm_mapmove_checkgo" ) == 1 ) )

	{
		GM_setValue( "lwm_map_move" , 0 ) ;
		GM_setValue( "lwm_map_move_mz" , 0 ) ;
		return ;
	}

	id0 = cz
	idN = mz
	id1 = eval( 'locP.l' + id0 + '_' + idN ) //?? ??????????
	if( id1 && id1 > 0 )
	{
		window.location.href = url + 'move_sector.php?id=' + id1 ;
		return;
	}

	var kC = locArr[id0] ; //?????????? ???????
	var kM = locArr[idN] ; //?????????? ??????????

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

{

	if( mz == cz )
	{
		var myT = new Date(t*1000)
		myTs = myT.getSeconds()
		return myT.getMinutes() + ':' + ( myTs < 10 ? '0' : '' ) + myTs ;
	}

	var nz = 0 ; 

	var kC = locArr[cz] ; 
	var kM = locArr[mz] ; 

	id1 = eval( 'locP.l' + cz + '_' + mz ) 


	if( id1 && id1 > 0 )
	{
		nz = id1 ;
	}

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
		var nz = 0 ; 
		var kC = locArr[cz] ; 
		var kM = locArr[mz] ; 
		id1 = eval( 'locP.l' + cz + '_' + mz ) 

		if( id1 && id1 > 0 )
		{
			nz = id1 ;
		}


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