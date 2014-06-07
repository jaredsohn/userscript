// HWM Inventory Set
// (c) 2007, xo4yxa
//
// ==UserScript==
// @name          hwminventset
// @homepage      http://hwm.xo4yxa.ru/js/inventset/
// @version       0.03b
// @description   Inventory Set
// @include       http://www.heroeswm.ru/inventory.php
// ==/UserScript==


var url = 'http://www.heroeswm.ru/' ;
var url_cur = location.href ;

var anchors = document.getElementsByTagName( 'a' );
get_dressid_regexp = /inventory.php\?pull_off=(\d+)/

var tables = document.getElementsByTagName('table');
for( var i = 0; i < tables.length; i++ )
{
  var tbl = tables[i];
  var bg = tbl.getAttribute("background") ; 
  if( bg && bg.match( /i\/kukla/ ) )
  {
    o1 = tbl.parentNode.parentNode.parentNode ;

    tr = document.createElement( 'tr' );
    td = document.createElement( 'td' );
    td.className = 'wb' ;
    td.setAttribute( 'colspan' , 2 ) ;
    td.setAttribute( 'align' , 'center' ) ;
    td.innerHTML = '<b>\u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0442\u044b:</b>' ;
    tr.appendChild( td ) ;
    o1.appendChild( tr ) ;

    tr = document.createElement( 'tr' );
    td = document.createElement( 'td' );
    td.setAttribute( 'colspan' , 2 ) ;
    td.setAttribute( 'align' , 'center' ) ;

    a = document.createElement( 'a' );
    a.href = 'javascript:void(0);' ;
    a.addEventListener( "click", save_cur_set , false );
    a.appendChild( document.createTextNode( '\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0438\u0439' ) ) ;
    td.appendChild( a ) ;

    td.appendChild( document.createTextNode( ' / ' ) ) ;

    a = document.createElement( 'a' );
    a.href = 'javascript:void(0);' ;
    a.addEventListener( "click", clear_set , false );
    a.appendChild( document.createTextNode( '\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435' ) ) ;
    td.appendChild( a ) ;
    tr.appendChild( td ) ;
    o1.appendChild( tr ) ;

    tr = document.createElement( 'tr' );
    td = document.createElement( 'td' );
    td.setAttribute( 'colspan' , 2 ) ;

    tbl = document.createElement( 'table' );
    tbl.setAttribute( 'id' , 'inventsets' ) ;
    tr1 = document.createElement( 'tr' );
    td1 = document.createElement( 'td' );
    td1.style.fontWeight ='bold' ;
    td1.appendChild( document.createTextNode( 'Title' ) ) ;
    td1.setAttribute( 'width' , '100%' ) ;
    tr1.appendChild( td1 ) ;
    td1 = document.createElement( 'td' );
    td1.style.fontWeight ='bold' ;
    td1.appendChild( document.createTextNode( 'Items' ) ) ;
    tr1.appendChild( td1 ) ;
    td1 = document.createElement( 'td' );
    td1.style.fontWeight ='bold' ;
    td1.appendChild( document.createTextNode( 'ReN' ) ) ;
    tr1.appendChild( td1 ) ;
    td1.style.fontWeight ='bold' ;
    td1 = document.createElement( 'td' );
    td1.style.fontWeight ='bold' ;
    td1.appendChild( document.createTextNode( 'ReS' ) ) ;
    tr1.appendChild( td1 ) ;
    td1 = document.createElement( 'td' );
    td1.style.fontWeight ='bold' ;
    td1.appendChild( document.createTextNode( 'Del' ) ) ;
    tr1.appendChild( td1 ) ;
    tbl.appendChild( tr1 ) ;
    
    invent_names = GM_getValue( "hwm_inventory_name" ) ;
    if( invent_names )
    {
      invent_name = invent_names.split( '|' ) ;
      invent_count = invent_name.length ;
      for( var i1 = 0; i1 < invent_count; i1++ )
      {
        inv_set_str = GM_getValue( "hwm_inventory_set_" + invent_name[i1] ) ;
        if( inv_set_str && inv_set_str != '' )
        {
          tbl.appendChild( get_set( invent_name[i1] ) ) ;
        }
      }
    }

    td.appendChild( tbl ) ;
    tr.appendChild( td ) ;
    o1.appendChild( tr ) ;

    tr = document.createElement( 'tr' );
    td = document.createElement( 'td' );
    td.className = 'wb' ;
    td.setAttribute( 'colspan' , 2 ) ;
    td.setAttribute( 'id' , 'id_loader' ) ;
    tr.appendChild( td ) ;
    o1.appendChild( tr ) ;

  }
}

function clear_set()
{
  invent_name = GM_getValue( "hwm_inventory_name" ).split( '|' ) ;
  invent_count = invent_name.length ;
  if( invent_count && invent_count > 0 )
  {
    for( var i1 = 0; i1 <= invent_count; i1++ )
    {
      GM_setValue( "hwm_inventory_set_" + invent_name[i1] , null ) ;
      GM_setValue( "hwm_inventory_name_" + invent_name[i1] , null ) ;
      a = document.getElementById( 'id_inv_tr_' + invent_name[i] ) ;
      a.parentNode.removeChild( a ) ;
    }
  }
  GM_setValue( "hwm_inventory_name" , '' ) ;
  return ;
}

function del_invent_set()
{
  tr = this.parentNode.parentNode ;
  set = tr.getAttribute( 'sets' )
  var dress_id = '' ;
  invent_name = GM_getValue( "hwm_inventory_name" ).split( '|' ) ;
  invent_count = invent_name.length ;

  for( var i = 0; i < invent_count; i++ )
  {
    if( invent_name[i] == set )
    {
      GM_setValue( "hwm_inventory_set_" + invent_name[i] , '' ) ;
      GM_setValue( "hwm_inventory_name_" + invent_name[i] , '' ) ;
      tr.parentNode.removeChild( tr ) ;
    } else
    {
      dress_id += ( dress_id == '' ? '' : '|' ) + invent_name[i] ;
    }
  }
  GM_setValue( "hwm_inventory_name" , dress_id ) ;
  return;
}

function save_cur_set()
{
  var dress_id = '' ;
  for( var i = 0; i < anchors.length; i++ )
  {
    var el = anchors[i];
    if( i > 0 && anchors[i].href == anchors[i-1].href ) continue ;
    if( el.href.match(/http:\/\/www\.heroeswm\.ru\/inventory.php\?pull_off=/) )
    {
      params = get_dressid_regexp.exec( el.href ) ;
      dress_id += ( dress_id == '' ? '' : '|' ) + params[1] ;
    }
  }
  if( dress_id == '' )
  {
    alert( 'Not items' )
    return ;
  }

  var str = prompt( '\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0434\u043b\u044f \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442\u0430' , '' );
  if( str == '' )
  {
    alert( 'Not title' )
    return ;
  }

  invent_name = GM_getValue( "hwm_inventory_name" ) ;
  if( !invent_name )
  {
    invent_name = '' ;
  }
  var dt = new Date() ;
  var time_cur = dt.getTime() ;
  invent_name += ( invent_name == '' ? '' : '|' ) + time_cur ;

  GM_setValue( "hwm_inventory_name" , invent_name ) ;
  GM_setValue( "hwm_inventory_set_" + time_cur , dress_id ) ;
  GM_setValue( "hwm_inventory_name_" + time_cur , encodeURIComponent( str ) ) ;

  td = document.getElementById( 'inventsets' )
  td.appendChild( get_set( time_cur ) ) ;
}

function save_invent_set()
{
  var dress_id = '' ;
  for( var i = 0; i < anchors.length; i++ )
  {
    var el = anchors[i];
    if( i > 0 && anchors[i].href == anchors[i-1].href ) continue ;
    if( el.href.match(/http:\/\/www\.heroeswm\.ru\/inventory.php\?pull_off=/) )
    {
      params = get_dressid_regexp.exec( el.href ) ;
      dress_id += ( dress_id == '' ? '' : '|' ) + params[1] ;
    }
  }
  if( dress_id == '' )
  {
    alert( 'Not items' )
    return ;
  }
  tr = this.parentNode.parentNode
  set = tr.getAttribute( 'sets' )
  GM_setValue( "hwm_inventory_set_" + set , dress_id ) ;
  tr.parentNode.insertBefore( get_set( set ) , tr.nextSibling )
  tr.parentNode.removeChild( tr ) ;
  alert( 'ok' ) ;
}

function name_invent_set()
{
  set = this.parentNode.parentNode.getAttribute( 'sets' )
  var str = prompt( '\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0434\u043b\u044f \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442\u0430' , decodeURIComponent( GM_getValue( "hwm_inventory_name_" + set ) ) );
  if( str == null ) return

  if( str == '' )
  {
    alert( 'Not title' )
    return ;
  }
  GM_setValue( "hwm_inventory_name_" + set , encodeURIComponent( str ) ) ;
  tr = this.parentNode.parentNode
  tr.parentNode.insertBefore( get_set( set ) , tr.nextSibling )
  tr.parentNode.removeChild( tr ) ;
}

function pull_on_off()
{
  set = this.parentNode.parentNode.getAttribute( 'sets' )
  inv_set = GM_getValue( "hwm_inventory_set_" + set ).split('|')
  var inv_on = new Array()
  var inv_off = new Array()

  function if_off( id )
  {
    for( var i = 0; i < inv_set.length; i++ )
    {
      if( id == inv_set[i] )
      {
        inv_on.push( id )
        return
      }
    }
    inv_off.push( id )
  }

  for( var i = 0; i < anchors.length; i++ )
  {
    var el = anchors[i]
    if( i > 0 && anchors[i].href == anchors[i-1].href ) continue ;
    if( el.href.match(/http:\/\/www\.heroeswm\.ru\/inventory.php\?pull_off=/) )
    {
      params = get_dressid_regexp.exec( el.href )
      if_off( params[1] )
    }
  }

  function if_on( id )
  {
    for( var i = 0; i < inv_on.length; i++ )
    {
      if( id == inv_on[i] )
      {
        return true
      }
    }
    return false
  }

  function f_inv_on( cur )
  {
    if( cur == inv_set.length )
    {
      window.location.href = url_cur
      return ;
    }
    if( !if_on( inv_set[cur] ) )
    {
      set_loader()
      GM_xmlhttpRequest
      ({ 
        method:"GET",
        url: url+"inventory.php?dress="+inv_set[cur],
        onload:function(res)
        {
          f_inv_on( cur + 1 )
          return;
        }
      })
    } else
    {
      f_inv_on( cur + 1 ) ;
    }
  }

  function f_inv_off( cur )
  {
    set_loader()
    GM_xmlhttpRequest
    ({ 
      method:"GET",
      url: url+"inventory.php?pull_off="+inv_off[cur],
      onload:function(res)
      {
        if( ( cur + 1 ) == inv_off.length )
        {
          f_inv_on( 0 ) ;
          return ;
        } else
        {
          f_inv_off( cur + 1 )
        }
        return ;
      }
    });
  }

  function f_inv_off_all()
  {
    set_loader();
    GM_xmlhttpRequest
    ({
      method: "GET",
      url: url+"inventory.php?all_off=1" ,
      onload: function(res)
      {
        f_inv_on( 0 ) ;
        return ;
      }
    });
  }

  if( inv_off.length == 0 )
  {
    if( inv_on.length == inv_set.length  )
    {
      alert( 'ALL dressed' )
      return;
    }
    f_inv_on( 0 )
  } else if( ( inv_off.length + inv_set.length - inv_on.length ) > ( inv_set.length + 1 ) )
  {
    f_inv_off_all()
  } else
  {
    f_inv_off( 0 )
  }
}

function set_loader()
{
  a = document.getElementById( 'id_loader' )
  img = document.createElement( 'span' ) ;
  img.innerHTML = loader ;
  a.appendChild( img ) ;
}


function get_set( t )
{
  d = document.createElement( 'tr' );
  d.setAttribute( 'align' , 'center' ) ;
  d.setAttribute( 'sets' , t ) ;
  d.setAttribute( 'id' , 'id_inv_tr_' + t ) ;

  td0 = document.createElement( 'td' );
  td0.setAttribute( 'align' , 'left' ) ;
  a = document.createElement( 'a' );
  a.href = 'javascript:void(0);' ;
  a.title = '\u041d\u0430\u0434\u0435\u0442\u044c \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442' ;
  a.addEventListener( "click", pull_on_off , false );
  name = GM_getValue( "hwm_inventory_name_" + t ) ;
  if( name && name != '' )
  {
    a.appendChild( document.createTextNode( decodeURIComponent( name ) ) ) ;
  } else
  {
    a.appendChild( document.createTextNode( '\u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0442 ' + t ) ) ;
  }
  td0.appendChild( a ) ;
  d.appendChild( td0 ) ;

  td0 = document.createElement( 'td' );
  inv_set = GM_getValue( "hwm_inventory_set_" + t ).split('|');
  td0.appendChild( document.createTextNode( inv_set.length ) ) ;
  d.appendChild( td0 ) ;

  td0 = document.createElement( 'td' );
  a = document.createElement( 'a' );
  a.href = 'javascript:void(0);' ;
  a.title = '\u041f\u0435\u0440\u0435\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u0442\u044c \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442'
  a.addEventListener( "click", name_invent_set , false );
  a.appendChild( document.createTextNode( 'rN' ) ) ;
  td0.appendChild( a ) ;
  d.appendChild( td0 ) ;

  td0 = document.createElement( 'td' );
  a = document.createElement( 'a' );
  a.href = 'javascript:void(0);' ;
  a.title = '\u041f\u0435\u0440\u0435\u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442'
  a.addEventListener( "click", save_invent_set , false );
  a.appendChild( document.createTextNode( 'rS' ) ) ;
  td0.appendChild( a ) ;
  d.appendChild( td0 ) ;

  td0 = document.createElement( 'td' );
  a = document.createElement( 'a' );
  a.href = 'javascript:void(0);' ;
  a.title = '\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442'
  a.addEventListener( "click", del_invent_set , false );
  a.appendChild( document.createTextNode( 'X' ) ) ;
  td0.appendChild( a ) ;
  d.appendChild( td0 ) ;

  return d ;
}


loader = '<img border="0" src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYi'+
'IiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+
'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'+
'fySDhGYQdDWGQyUhADs=">'
