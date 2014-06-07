// lwm Army Set
// (c) 2007, xo4yxa
//
// ==UserScript==
// @name          LWM Army Sets
// @homepage      http://hwm.xo4yxa.ru/js/armyset/
// @version       0.01b
// @description   Army Set
// @include       http://www.lordswm.com/*
// ==/UserScript==


var url = 'http://www.lordswm.com/' ;
var url_cur = location.href ;

var b = document.getElementsByTagName( 'body' ) ;
var anchors = document.getElementsByTagName( 'a' );

var i_names = GM_getValue( "lwm_army_name" ) ;

if( url_cur == url + 'army.php' )
{
	ob = document.createElement( 'center' );
	ob.id = 'armysets'

	ob.appendChild( get_set( 0 ) ) ;
	ob.appendChild( document.createElement( 'br' ) ) ;

	if( i_names && i_names != '' )
	{
		i_name = i_names.split( '|' ) ;
		for( var i1 = 0; i1 < i_name.length ; i1++ )
		{
			ob.appendChild( get_set( i_name[i1] ) ) ;
		}
	}

	b[0].appendChild( ob ) ;
}


for( var i = 0; i < anchors.length; i++ )
{
	var el = anchors[i];
	if( el.href == 'http://www.lordswm.com/map.php' )
	{
		d = document.createElement( 'div' );
		d.id = 'lwm_army_get' ;
		addStyle( '#lwm_army_get { position: absolute;background:#FFF;top:40px;margin-left:25px;border: 1px solid #abc;padding: 5px; }' );

		title = document.createElement( 'b' );
		title.appendChild( document.createTextNode( 'Army sets' ) ) ;
		title.style.cursor = 'pointer' ;
		title.addEventListener( "click", display_sets , false );
		d.appendChild( title ) ;

		d1 = document.createElement( 'div' );
		d1.id = 'lwm_army_sets' ;
		addStyle( '#lwm_army_sets { padding: 5px; display:none; }' );

		if( i_names && i_names != '' )
		{
			i_name = i_names.split( '|' ) ;
			for( var i1 = 0; i1 < i_name.length ; i1++ )
			{
				d1.appendChild( get_set_all( i_name[i1] ) ) ;
			}
		}
		d.appendChild( d1 ) ;

		b[0].appendChild( d ) ;
	}
}

function display_sets()
{
	div_army_sets = document.getElementById( 'lwm_army_sets' )
	visible = div_army_sets.style.display ;
	div_army_sets.style.display = visible == 'block' ? 'none' : 'block' ;
}

function addStyle( css )
{
	var h , style ;
	h = document.getElementsByTagName('head')[0];
	if( !h ) return;
	style = document.createElement( 'style' );
	style.type = 'text/css';
	style.innerHTML = css;
	h.appendChild( style );
}

function get_set_all( t )
{
	var td = document.createElement( 'div' );
	td.setAttribute( 'sets' , t ) ;

	var i_name = GM_getValue( "lwm_army_name_" + t ) ;
	var i_set = GM_getValue( "lwm_army_set_" + t ) ;

	var bt = document.createElement( 'a' );
	bt.href = 'javascript:void(0);' ;
	bt.addEventListener( "click", test , false );
	bt.appendChild( document.createTextNode( decodeURIComponent( i_name ) ) ) ;
	td.appendChild( bt ) ;
//	td.appendChild( document.createTextNode( ': ' + i_set ) ) ;

	return td ;
}


function test()
{
	var set = this.parentNode.getAttribute( 'sets' )
	var i_set = GM_getValue( "lwm_army_set_" + set ).split('|') ;
	var data = '' ;
	for( var i = 0 ; i < i_set.length ; i++ )
	{
		data = 'countv' + ( i + 1 ) + '=' + i_set[i] + ( data == '' ? '' : '&' ) + data ;
	}
	GM_xmlhttpRequest
	({
		method: "POST",
		url: url+"army_apply.php" ,
		headers:
		{
			'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.8.1)',
			'Accept': 'text /xml,application/xml,application/xhtml+xml,text/html',
			'Content-type': 'application/x-www-form-urlencoded'
		} ,
		data: data ,
		onload:function(res)
		{
			alert( 'ok' );
			return false;
		}
	});
	return false;
}

function del_i_set()
{
  tr = this.parentNode ;
  set = tr.getAttribute( 'sets' )
  var i_id = '' ;
  i_name = GM_getValue( "lwm_army_name" ).split( '|' ) ;
  i_count = i_name.length ;

  for( var i = 0; i < i_count; i++ )
  {
    if( i_name[i] == set )
    {
      GM_setValue( "lwm_army_set_" + i_name[i] , '' ) ;
      GM_setValue( "lwm_army_name_" + i_name[i] , '' ) ;
      tr.parentNode.removeChild( tr ) ;
    } else
    {
      i_id += ( i_id == '' ? '' : '|' ) + i_name[i] ;
    }
  }
  GM_setValue( "lwm_army_name" , i_id ) ;
  return;
}

function save_cur_set()
{
  tr = this.parentNode ;
  set = tr.getAttribute( 'sets' )
  var i_id = '' ;

  str = document.getElementById( 'a0_' + set ).value
  if( str == '' )
  {
    alert( 'Not title' )
    return ;
  }
  for( var i = 1; i <= 7 ; i++ )
  {
    i_id += ( i_id == '' ? '' : '|' ) + document.getElementById( 'a' + i + '_' + set ).value ;
  }

  if( i_id == '' )
  {
    alert( 'Not Army' )
    return ;
  }

  i_name = GM_getValue( "lwm_army_name" ) ;
  if( !i_name )
  {
    i_name = '' ;
  }

	if( set == 0 )
	{
		var dt = new Date() ;
		var time_cur = dt.getTime() ;
		i_name += ( i_name == '' ? '' : '|' ) + time_cur ;
		GM_setValue( "lwm_army_name" , i_name ) ;
		GM_setValue( "lwm_army_set_" + time_cur , i_id ) ;
		GM_setValue( "lwm_army_name_" + time_cur , encodeURIComponent( str ) ) ;
		td = document.getElementById( 'armysets' )
		td.appendChild( get_set( time_cur ) ) ;
	} else
	{
		GM_setValue( "lwm_army_set_" + set , i_id ) ;
		GM_setValue( "lwm_army_name_" + set , encodeURIComponent( str ) ) ;
		tr.parentNode.insertBefore( get_set( set ) , tr.nextSibling )
		tr.parentNode.removeChild( tr ) ;
		alert( 'ok' ) ;
	}
}

function get_set( t )
{
	td = document.createElement( 'div' );
	td.style.width = '700px' ;
	td.setAttribute( 'sets' , t ) ;
	td.id = 'a_' + t ;
	td.style.textAlign = 'left'

	bt = document.createElement( 'input' );
	bt.type = 'input'
	bt.id = 'a' + 0 + '_' + t ;
	bt.setAttribute( 'size' , 35 ) ;

	var i_name = '' ;
	var i_set ;

	if( t > 0 )
	{
		i_set = GM_getValue( "lwm_army_set_" + t ).split('|') ;
		i_name = GM_getValue( "lwm_army_name_" + t ) ;
	}

	bt.value = t > 0 ? decodeURIComponent( i_name ) : '' ;
	td.appendChild( bt ) ;

	for( i = 1 ; i < 8 ; i++ )
	{
		bt = document.createElement( 'input' );
		bt.type = 'input'
		bt.id = 'a' + i + '_' + t ;
		bt.value = t > 0 ? i_set[i-1] : 0 ;
		bt.style.textAlign = 'center'
		bt.setAttribute( 'size' , 2 ) ;
		td.appendChild( bt ) ;
	}

	bt = document.createElement( 'input' );
	bt.type = 'button'
	bt.addEventListener( "click", save_cur_set , false );
	bt.setAttribute( 'value' , 'save' ) ;
	td.appendChild( bt ) ;

	if( t > 0 )
	{
		bt = document.createElement( 'input' );
		bt.type = 'button'
		bt.addEventListener( "click", del_i_set , false );
		bt.setAttribute( 'value' , 'del' ) ;
		td.appendChild( bt ) ;
	}

	return td ;
}
