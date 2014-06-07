// (c) 2008-2009, xo4yxa (http://www.heroeswm.ru/pl_info.php?id=130)

// ==UserScript==
// @name          LWM Time Restore
// @description   LWM mod - time restore health & manna, etc...
// @homepage      http://hwm.xo4yxa.ru/js/timerestore/
// @version       0.13.090525
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
// @exclude       http://www.lordswm.com/
// ==/UserScript==

var url_hwm =  'http://www.lordswm.com/' 
var url_cur = location.href ;
var url_work = url_hwm + 'object_do.php'
var url_gn = url_hwm + 'mercenary_guild.php' ;
var _i = 'i/top/line/' ;
var _i_ = '' ;

var work_alert_ty = '"Work complete" alert enabled' ;
var work_alert_tn = '"Work complete" alert disabled' ;

var sm_alert_ty = '"Blacksmith works complete" alert enabled';
var sm_alert_tn = '"Blacksmith works complete" alert disabled';

var els = document.getElementsByTagName( 'embed' );

//приходи через ... мин
var regexp_timegn0 = /Come in (\d+) minutes/

//Осталось времени: ... минут
var regexp_timegn1 = /Time left: (\d+) minutes./

//тебя осталось ...  минут
var regexp_timegn2 = /you have (\d+) minutes left./

//у тебя еще есть ... минут
var regexp_timegn3 = /you still have (\d+) minutes./

//. Осталось ... минут.
var regexp_timegn4 = /. You have (\d+) minutes left./

//попыток и ... минут
var regexp_timegn5 = /attempts and (\d+) minutes./

var b = document.getElementsByTagName( 'body' ) ;
d = document.createElement( 'div' );
d.setAttribute( 'style' , 'position: absolute; top: 55px;text-align:center;width:100%;' )
d.innerHTML += 
'<style>' +
'.hwm_tb * {font-size: 11px;color: #f5c137;}' + 
'.hwm_tb_cell {border-collapse: collapse;background-color:#6b6b69;}' +
'.hwm_tb_cell TD {padding: 0px;}' +
'.cell_t {height: 3px;background: url('+_i+'t_top_bkg'+_i_+'.jpg);}' +
'.cell_c {white-space: nowrap;height: 18px;background: url('+_i+'t_com_bkg'+_i_+'.jpg);font-weight: bold;}' +
'.cell_b {height: 5px;background: url('+_i+'t_bot_bkg'+_i_+'.jpg);text-align: center;}' + 
'.cell_b IMG {width:17px;height: 5px;}' +
'</style>' +

'<table cellpadding=0 cellspacing=0 width="530" align="center" class="hwm_tb">' +
'<tr height=26>' +
'<td>' +

'<table width="100%" cellpadding=0 cellspacing=0 style="background: url('+_i+'t_bkg'+_i_+'.jpg);">' +
'<tr valign=middle align=center>' +

'<td width=9><img src="'+_i+'t_end'+_i_+'.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c" id="pers_h">00:00</td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="'+_i+'t_center'+_i_+'.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="'+_i+'t_end'+_i_+'.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c"><span style="cursor:pointer" id="a_pers_w">LG</span>: <span id="pers_w">00:00</span></td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="'+_i+'t_center'+_i_+'.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="'+_i+'t_end'+_i_+'.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c"><span title="" style="cursor:pointer" id="a_pers_sm">WS</span>: <a href="/mod_workbench.php" title="to the blacksmith" style="text-decoration: none;" id="pers_sm">00:00</a></td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="'+_i+'t_center'+_i_+'.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="'+_i+'t_end'+_i_+'.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c">' +
'<a href="/mercenary_guild.php" style="text-decoration: none;" title="to the Mercenaries guild">MG</a>: <span id="pers_gn">00:00</span>' +
'</td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="'+_i+'t_center'+_i_+'.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="'+_i+'t_end'+_i_+'.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c">' +
'<span style="cursor:pointer" id="a_pers_go" title="LeftClick = Reset timer + On; RightClick = Reset timer + Off">HG</span>: <span id="pers_go">00:00</span>' +
'</td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="'+_i+'t_center'+_i_+'.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="'+_i+'t_end'+_i_+'.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c" id="pers_m">00:00</td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="'+_i+'t_center'+_i_+'.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="'+_i+'t_end'+_i_+'.jpg" alt="" width=9 height=26></td>' +

'</tr>' +
'</table>' +

'</td>' +
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
	sm: 0 
}

if( !GM_getValue( "hwm_time_com_work_end_yes" ) ) GM_setValue( "hwm_time_com_work_end_yes" , 'no' )
if( !GM_getValue( "hwm_time_com_work_alert" ) ) GM_setValue( "hwm_time_com_work_alert" , 'yes' )
if( !GM_getValue( "hwm_time_com_go_on" ) ) GM_setValue( "hwm_time_com_go_on" , '-'+ time_cur + '-' )
if( !GM_getValue( "hwm_time_com_go_stop" ) ) GM_setValue( "hwm_time_com_go_stop" , 'no' ) 
if( !GM_getValue( "hwm_time_com_go_stop_time" ) ) GM_setValue( "hwm_time_com_go_stop_time" , '0' ) 
if( !GM_getValue( "hwm_time_com_sm_end_yes" ) ) GM_setValue( "hwm_time_com_sm_end_yes" , 'yes' )
if( !GM_getValue( "hwm_time_com_sm_alert" ) ) GM_setValue( "hwm_time_com_sm_alert" , 'no' )

//+
var title_sm = $('a_pers_sm')
title_sm.addEventListener
(
	"click" ,
	function( event )
	{
		event.cancelBubble = true;
		if( GM_getValue( "hwm_time_com_sm_alert" ) == 'yes' )
		{
			GM_setValue( "hwm_time_com_sm_alert" , 'no' )
			title_sm.style.color = 'f5c137' ;
			title_sm.title = sm_alert_tn ;
		} else
		{
			GM_setValue( "hwm_time_com_sm_alert" , 'yes' )
			title_sm.style.color = 'FF0000' ;
			title_sm.title = sm_alert_ty ;
		}
	},
	false
);
if( GM_getValue( "hwm_time_com_sm_alert" ) == 'yes' )
{
	title_sm.style.color = 'FF0000' ;
	title_sm.title = sm_alert_ty ;
} else
{
	title_sm.title = sm_alert_tn ;
}
//-

//+
var title_gr = $('a_pers_w')
title_gr.addEventListener
(
	"click" ,
	function( event )
	{
		if( GM_getValue( "hwm_time_com_work_alert" ) == 'yes' )
		{
			GM_setValue( "hwm_time_com_work_alert" , 'no' )
			title_gr.style.color = 'f5c137' ;
			title_gr.title = work_alert_tn ;
		} else
		{
			GM_setValue( "hwm_time_com_work_alert" , 'yes' )
			title_gr.style.color = 'FF0000' ;
			title_gr.title = work_alert_ty ;
		}
	} ,
	false
);
if( GM_getValue( "hwm_time_com_work_alert" ) == 'yes' )
{
	title_gr.style.color = 'FF0000' ;
	title_gr.title = work_alert_ty ;
} else
{
	title_gr.title = work_alert_tn ;
}

//+
var title_go = $('a_pers_go') ;
title_go.addEventListener
(
	"click" ,
	function( event )
	{
		var dcl = new Date() ;
		var this_time = dcl.getTime() ;
		GM_setValue( "hwm_time_com_go_on" , '' + this_time )
		time.go = 0 ;
		if( GM_getValue( "hwm_time_com_go_stop" ) == 'yes' ) 
		{
			GM_setValue( "hwm_time_com_go_stop" , 'no' )
			showtime( 'go' ) ;
		}
	} ,
	false
);

title_go.addEventListener
(
	"contextmenu" ,
	function( event )
	{
		event.cancelBubble = true;
		GM_setValue( "hwm_time_com_go_stop" , 'yes' )
	},
	false
);

if( GM_getValue( "hwm_time_com_go_on" ) )
{
	time.go = Math.floor( ( time_cur - parseInt( GM_getValue( "hwm_time_com_go_on" ) ) ) / 1000 ) ;
}
showtime( 'go' ) ;
//-

if( url_cur.indexOf( url_work ) != -1 ) 
{
	if( b[0].innerHTML.match( 'You have successfully enrolled' ) )
	{
		GM_setValue( "hwm_time_com_work_end" , '' + ( time_cur + 60*60*1000 ) )
		GM_setValue( "hwm_time_com_work_end_yes" , 'no' )
	}
}

if( GM_getValue( "hwm_time_com_work_end" ) )
{
	if( time_cur < ( time_work_end = parseInt( GM_getValue( "hwm_time_com_work_end" ) ) ) )
	{
		time.w = Math.floor( ( time_work_end - time_cur ) /  1000 ) ;
		showtime( 'w' ) ;
	}
}


if( url_cur == url_gn )
{
	if( ( time_gn = regexp_timegn0.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn1.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn2.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn3.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn4.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn5.exec( b[0].innerHTML ) ) )
	{
		GM_setValue( "hwm_time_com_gn_end" , '' + ( time_cur + time_gn[1]*60*1000 ) )
	}
}

if( GM_getValue( "hwm_time_com_gn_end" ) )
{
	if( time_cur < ( time_gn_end = parseInt( GM_getValue( "hwm_time_com_gn_end" ) ) ) )
	{
		time.gn = Math.floor( ( time_gn_end - time_cur ) /  1000 ) ;
		showtime( 'gn' ) ;
	}
}


//+ for smithy Завершение работы:
var regexp_sm = /Completion time: (\d+):(\d+)/ ;
var regexp_time_server = /(\d+):(\d+), (\d+) online/ ;

if( url_cur.indexOf( 'mod_workbench.php' ) > -1 )
{
	if( ( time_sm = regexp_sm.exec( b[0].innerHTML ) ) )
	{
		var time_serv = regexp_time_server.exec( b[0].innerHTML )
		if( time_sm[1][0] == 0 ) time_sm[1] = time_sm[1][1] ;
		var t_sm = new Date( 0 , 0 , ( parseInt(time_sm[1]) >= parseInt(time_serv[1]) ? 0 : 1 ) , parseInt(time_sm[1]) , parseInt(time_sm[2]) , 59 )
		var t_serv = new Date( 0 , 0 , 0 , parseInt(time_serv[1]) , parseInt(time_serv[2]) , 0 )
		GM_setValue( "hwm_time_com_sm_end" , ''+( time_cur+(t_sm-t_serv) ) )
		GM_setValue( "hwm_time_com_sm_end_yes" , 'no' )
	}
}

if( GM_getValue( "hwm_time_com_sm_end" ) )
{
	if( time_cur < ( time_sm_end = parseInt( GM_getValue( "hwm_time_com_sm_end" ) ) ) )
	{
		time.sm = Math.floor( ( time_sm_end - time_cur ) /  1000 ) ;
		showtime( 'sm' ) ;
	}
}
//- for smithy


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
	var el = $( 'pers_' + t ) ;
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
		if( GM_getValue( "hwm_time_com_go_stop" ) == 'yes' )
		{
			el.innerHTML = '00:00' ;
			return ;
		}
		ct = ++time.go ;
	} else if( t == 'sm' )
	{
		ct = --time.sm ;
	}
	dd = Math.floor( ct / 86400 )
	dh = Math.floor( ( ct - dd * 86400 ) / 3600 )
	dm = Math.floor( ( ct - dd * 86400 - dh * 3600 )  / 60 )
	ds = ct % 60
	el.innerHTML = ( dd == 0 ? '' : ( (dd < 10) ? '0' : '' ) + dd + ':' ) + ( dh == 0 ? '' : ( (dh < 10) ? '0' : '' ) + dh + ':' ) + ( (dm < 10) ? '0' : '' ) + dm + ':' + ( (ds < 10) ? '0' : '') + ds

	if( ct == 0 )
	{
		if( t == 'w' && GM_getValue( "hwm_time_com_work_end_yes" ) != 'yes' && GM_getValue( "hwm_time_com_work_alert" ) == 'yes' )
		{
			GM_setValue( "hwm_time_com_work_end_yes" , 'yes' )
			alert( 'Time to work' )
		}
		if( t == 'sm' && GM_getValue( "hwm_time_com_sm_end_yes" ) != 'yes' && GM_getValue( "hwm_time_com_sm_alert" ) == 'yes' )
		{
			GM_setValue( "hwm_time_com_sm_end_yes" , 'yes' )
			alert( 'Blacksmith jobs completed' )
		}
		return ; 
	}
	setTimeout( function() { showtime( t ) } , 1000 )
}

function $( id ) { return document.getElementById( id ); }

