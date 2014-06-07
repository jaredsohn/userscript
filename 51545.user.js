// ==UserScript==
// @name          HWM map move
// @description   HWM map move
// @include       http://www.lordswm.com/map.php*
// ==/UserScript==


var url = 'http://www.lordswm.com/' ;
var els = document.getElementsByTagName( 'img' );
var ems = document.getElementsByTagName( 'embed' );
var coord_regexp = /map.php\?cx=(\d+)&cy=(\d+)/

/*
 - x
|
y
  47   48   49   50   51   52   53
  --   --   --   --   --   --   -- 
| 00 | 00 | 00 | 00 | 00 | 00 | 00 | 48
  --   --   --   --   --   --   --
| 00 | 00 | 00 | 05 | 00 | 00 | 00 | 49
  --   --   --   --   --   --   --
| 00 | 00 | 04 | 01 | 02 | 07 | 00 | 50
  --   --   --   --   --   --   --
| 00 | 00 | 00 | 03 | 06 | 00 | 00 | 51
  --   --   --   --   --   --   --
| 00 | 00 | 00 | 00 | 00 | 00 | 00 | 52
  --   --   --   --   --   --   --
*/

var dm = document.createElement( 'div' );
dm.innerHTML = '<table>' +
'<tr>' +
'<td></td>' + 
'<td id="loc_5"></td>' + 
'<td></td>' +
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
'</table> ';


// cX_Y
var loc =
{
  c50_50:	1 ,	//Great Capital 
  c51_50:	2 ,	//East Bay 
  c50_51:	3 ,	//Yellow Lake
  c49_50:	4 ,	//Blooming Glade
  c50_49:	5 ,	//Silent Hill
  c51_51:	6 ,	//Misty Coast
  c52_50:	7 ,	//Ridge of Hope
}

var locZ =
{
  z1		: '50:50' ,
  z2		: '51:50' ,
  z3		: '50:51' ,
  z4		: '49:50' ,
  z5		: '50:49' ,
  z6		: '51:51' ,
  z7		: '52:50' ,
}

var locN = new Array
(
  '' ,				//0
  'Great Capital' ,	//1
  'East Bay' ,		//2
  'Yellow Lake' ,	//3
  'Blooming Glade' ,//4
  'Silent Hill' ,	//5
  'Misty Coast' ,	//6
  'Ridge of Hope' 	//7
)

var locP =
{
  l7_13: 8
}


if( GM_getValue( "hwm_map_move" ) == 1 )
{
  getCXY() ;
} else
{
  init();
}

function init()
{
	for( var i = 0; i < ems.length; i++ )
	{
		var el = ems[i];
		if( el.name == 'map' )
		{
			nado = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
			var pl =  el.getAttribute( 'FlashVars' ).split('=')[1].split(':')
/*
0 - cur place
1 - view place
2-10 - move
11 - gO
12 - gV
13 - gN
*/

			nado.appendChild( dm ) ;

	for( l = 1 ; l < locN.length; l++ )
	{
		var d = document.getElementById( 'loc_' + l ) ;
		d.style.width = 150 ;
		d.style.textAlign = 'center' ;
		d.style.border = '1px solid #abc' ;
		if( l == pl[0] )
		{
			d.style.fontWeight = 'bold' ;
			d.style.backgroundColor = 'FFF8DC' ;
			d.appendChild( document.createTextNode( locN[l] ) );
		} else
		{
			a = document.createElement( 'a' );
			a.href = 'javascript: void(0)' ;
			a.appendChild( document.createTextNode( locN[l] ) ) ;
			a.setAttribute( 'tZ' , l ) ;
			a.addEventListener( "click", setMXY , false );
			a.title = locN[l] + ' (' + l + ')' ;
			d.appendChild( a );
		}
	}
    }
  }
}

function move( cz )
{
  mz = GM_getValue( "hwm_map_move_mz" ) ;

  if( mz == cz )
  {
    GM_setValue( "hwm_map_move" , 0 ) ;
    GM_setValue( "hwm_map_move_mz" , 0 ) ;
    init();
    return ;
  }

  id0 = cz
  idN = mz
  id1 = eval( 'locP.l' + id0 + '_' + idN ) //
  if( id1 && id1 > 0 )
  {
    window.location.href = url + 'move_sector.php?id=' + id1 ;
    return;
  }
  c = eval( 'locZ.z' + id0 ).split(':') ; //
  m = eval( 'locZ.z' + idN ).split(':') ; //

  nx = m[0] > c[0] ? parseInt(c[0]) + 1 : ( m[0] == c[0] ? c[0] : parseInt(c[0]) - 1 ) ;
  ny = m[1] > c[1] ? parseInt(c[1]) + 1 : ( m[1] == c[1] ? c[1] : parseInt(c[1]) - 1 ) ;
  id = eval( 'loc.c' + nx + '_' + ny ) ;
  window.location.href = url + 'move_sector.php?id=' + id ;
}

function setMXY()
{
  GM_setValue( "hwm_map_move_mz" , this.getAttribute( 'tz' ) )
  GM_setValue( "hwm_map_move" , 1 ) ;
  getCXY();
}


function getCXY()
{
  for( var i = 0; i < ems.length; i++ )
  {
    var el = ems[i];
    if( el.name == 'map' )
    {
      move( el.getAttribute( 'FlashVars' ).split('=')[1].split(':')[0] ) ;
    }
  }
}