// ==UserScript==
// @name          HWM timers
// @description   HWM mod - timers for troops, mana, LG, MG
// @include       http://www.lordswm.com/*
// @exclude       http://www.lordswm.com/warlog.php*
// @exclude       http://www.lordswm.com/war.php*
// @exclude       http://www.lordswm.com/brd.php
// @exclude       http://www.lordswm.com/rightcol.php
// @exclude       http://www.lordswm.com/ch_box.php
// @exclude       http://www.lordswm.com/chatonline.php*
// @exclude       http://www.lordswm.com/chat_line.php*
// @exclude       http://www.lordswm.com/chatpost.php*
// @exclude       http://www.lordswm.com/chat.php*
// @exclude       http://www.lordswm.com/ticker.php*
// @exclude       http://www.lordswm.com/cgame.php*
// ==/UserScript==

var url_hwm =  'http://www.lordswm.com/' 
var url_cur = location.href ;
var url_work = url_hwm + 'object_do.php'
var url_gn = url_hwm + 'mercenary_guild.php' ;

var els = document.getElementsByTagName( 'embed' );

var regexp_timegn0 = /Come in (\d+) minutes./ ;

var regexp_timegn1 = /. Time left: (\d+) minutes./ ;

var regexp_timegn2 = /you still have \d+ attempts and (\d+) minutes/ ;

var regexp_timegn3 = /ou have (\d+) minutes left/ ;

var regexp_timegn4 = /. Time left: (\d+) minutes./ ;

var regexp_timegn5 = /still have (\d+) minutes/ ;


var b = document.getElementsByTagName( 'body' ) ;
d = document.createElement( 'div' );
d.innerHTML += 

'<style>' +
'.hwm_tb * {font-size: 11px;color: #f5c137;}' + 
'.hwm_tb_cell {border-collapse: collapse;background-color:#6b6b69;}' +
'.hwm_tb_cell TD {padding: 0px;}' +
'.cell_t {height: 3px;background: url(i/top/line/t_top_bkg.jpg);}' +
'.cell_c {white-space: nowrap;height: 18px;background: url(i/top/line/t_com_bkg.jpg);font-weight: bold;}' +
'.cell_b {height: 5px;background: url(i/top/line/t_bot_bkg.jpg);text-align: center;}' + 
'.cell_b IMG {width:17px;height: 5px;}' +
'</style>' +

'<table cellpadding=0 cellspacing=0 width="970" align="center" class="hwm_tb">' +
'<tr height=26>' +
'<td width=40><img src="i/top/line/lpart.jpg" width=40 height=26></td>' +
'<td width="11%" style="background: url(i/top/line/lbkg.jpg);"></td>' +
'<td width=40><img src="i/top/line/ldec.jpg" width=86 height=26></td>' +
'<td>' +

'<table width="100%" cellpadding=0 cellspacing=0 style="background: url(i/top/line/t_bkg.jpg);">' +
'<tr valign=middle align=center>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c" id="pers_h">00:00</td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="i/top/line/t_center.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="i/top/line/t_end.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c">LG: <span id="pers_w">00:00</span></td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="i/top/line/t_center.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="i/top/line/t_end.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c">' +
'<a href="/mercenary_guild.php" style="text-decoration: none;" title="To Mercenaries\' Guild">MG</a>: <span id="pers_gn">00:00</span>' +
'</td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="i/top/line/t_center.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="i/top/line/t_end.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c">' +
'<a href="javascript:void(0);" style="text-decoration: none;" id="a_pers_go" title="Reset hunt timer">HG</a>: <span id="pers_go">00:00</span>' +
'</td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="i/top/line/t_center.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="i/top/line/t_end.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c" id="pers_m">00:00</td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="i/top/line/t_center.jpg"></td></tr>' +
'</table>' +
'</td>' +

'</tr>' +
'</table>' +

'</td>' +
'<td width=40><img src="i/top/line/rdec.jpg" width=86 height=26></td>' +
'<td width="11%" style="background: url(i/top/line/lbkg.jpg);"></td>' +
'<td width=40><img src="i/top/line/rpart.jpg" width=40 height=26></td>' +
'</tr>' +
'</table>' ;

//b[0].appendChild( d ) ;
b[0].insertBefore( d , b[0].firstChild ) ;

var dt = new Date() ;
var time_cur = dt.getTime() ;

var time =
{
 h: 0 ,
 m: 0 ,
 w: 0 ,
 gn: 0 ,
 go: 0 ,
}

//+
document.getElementById('a_pers_go').addEventListener( "click", go_on , false );
if( GM_getValue( "hwm_time_go_on" ) )
{
 time.go = Math.floor( ( time_cur - GM_getValue( "hwm_time_go_on" ).split('-')[1] ) / 1000 ) ;
}
showtime( 'go' ) ;
//-

if( url_cur == url_work )
{
  if( b[0].innerHTML.match( 'You have successfully enrolled' ) )
  {
    GM_setValue( "hwm_time_work_end" , '-'+( time_cur + 60*60*1000 ) +'-' )
  }
}

if( GM_getValue( "hwm_time_work_end" ) )
{
  if( time_cur < ( time_work_end = GM_getValue( "hwm_time_work_end" ).split('-')[1] ) )
  {
    time.w = Math.floor( ( time_work_end - time_cur ) /  1000 ) ;
    showtime( 'w' ) ;
  }
}


if( url_cur == url_gn )
{
  if( ( time_gn = regexp_timegn0.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn1.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn2.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn3.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn4.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn5.exec( b[0].innerHTML ) ) )
  {
    GM_setValue( "hwm_time_gn_end" , '-'+( time_cur + time_gn[1]*60*1000 ) +'-' )
  }
}

if( GM_getValue( "hwm_time_gn_end" ) )
{
  if( time_cur < ( time_gn_end = GM_getValue( "hwm_time_gn_end" ).split('-')[1] ) )
  {
    time.gn = Math.floor( ( time_gn_end - time_cur ) /  1000 ) ;
    showtime( 'gn' ) ;
  }
}

for( var i = 0; i < els.length; i++ )
{
  var el = els[i];
  if( el.src.match( /mana.swf/ ) || el.src.match( /heart.swf/ ) ) 
  {
    var vs = el.getAttribute( "FlashVars" ).split('|') ;
    cur = vs[0].split('=')[1] ;
    time_f  = vs[1] ;
    all = vs[2] ;
    if( el.src.match( /heart.swf/ ) )
    {
      time_l = Math.floor( ( time_f * 1000 / 100 ) * ( 100 - cur ) )
      pp = 'h'
      time.h = Math.floor( time_l / 1000 );
    } else if( el.src.match( /mana.swf/ ) && all > 0 )
    {
      time_l = Math.floor( ( ( time_f / 100 ) * all * 1000 / 100  ) * ( 100 - cur ) )
      pp = 'm'
      time.m = Math.floor( time_l / 1000 ) ;
    }
    if( cur < 100 && all > 0 ) showtime( pp );
  }
}


function showtime( t )
{
  var el = document.getElementById( 'pers_' + t ) ;
  if( t == 'h' )
  {
    ct = --time.h ;
  } else if( t == 'm' )
  {
    ct = --time.m ;
  } else if( t == 'w' )
  {
    ct = --time.w ;
  } else if( t == 'gn' )
  {
    ct = --time.gn ;
  } else if( t == 'go' )
  {
    ct = ++time.go ;
  }
  dd = Math.floor( ct / 86400 )
  dh = Math.floor( ( ct - dd * 86400 ) / 3600 )
  dm = Math.floor( ( ct - dd * 86400 - dh * 3600 )  / 60 )
  ds = ct % 60
  el.innerHTML = ( dd == 0 ? '' : ( (dd < 10) ? '0' : '' ) + dd + ':' ) + ( dh == 0 ? '' : ( (dh < 10) ? '0' : '' ) + dh + ':' ) + ( (dm < 10) ? '0' : '' ) + dm + ':' + ( (ds < 10) ? '0' : '') + ds
  if( ct == 0 )
  {
    if( t == 'w' ) alert( 'You may enroll again.' )
    return ; 
  }
  setTimeout( function() { showtime( t ) } , 1000 )
}

function go_on()
{
  GM_setValue( "hwm_time_go_on" , '-'+ time_cur + '-' )
  time.go = Math.floor( ( time_cur - GM_getValue( "hwm_time_go_on" ).split('-')[1] ) / 1000 ) ;
}