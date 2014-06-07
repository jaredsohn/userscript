// (c) 2008-2009, xo4yxa (http://www.heroeswm.ru/pl_info.php?id=130)

// ==UserScript==
// @name          hwmtimerestore
// @description   HWM mod - time restore health & manna, etc...
// @homepage      http://hwm.xo4yxa.ru/js/timerestore/
// @version       0.14.091006
// @include       http://www.heroeswm.ru/*
// @exclude       http://www.heroeswm.ru/warlog.php*
// @exclude       http://www.heroeswm.ru/war.php*
// @exclude       http://www.heroeswm.ru/brd.php
// @exclude       http://www.heroeswm.ru/rightcol.php
// @exclude       http://www.heroeswm.ru/ch_box.php
// @exclude       http://www.heroeswm.ru/chatonline.php*
// @exclude       http://www.heroeswm.ru/chat_line.php*
// @exclude       http://www.heroeswm.ru/chatpost.php*
// @exclude       http://www.heroeswm.ru/chat.php*
// @exclude       http://www.heroeswm.ru/ticker.php*
// @exclude       http://www.heroeswm.ru/cgame.php*
// @exclude       http://www.heroeswm.ru/battlechat.php*
// @exclude       http://www.heroeswm.ru/
// ==/UserScript==

var url_hwm =  'http://www.heroeswm.ru/' 
var url_cur = location.href ;
var url_work = url_hwm + 'object_do.php'
var url_gn = url_hwm + 'mercenary_guild.php' ;
var _i = 'i/top/line/' ;
var _i_ = '' ;

var work_alert_ty = '\u0411\u0443\u0434\u0435\u0442 \u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u044f \u043e \u043a\u043e\u043d\u0446\u0435 \u0440\u0430\u0431\u043e\u0447\u0435\u0433\u043e \u0447\u0430\u0441\u0430' ;
var work_alert_tn = '\u041d\u0435 \u0431\u0443\u0434\u0435\u0442 \u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u044f' ;

var sm_alert_ty = '\u0411\u0443\u0434\u0435\u0442 \u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u0435 \u043e \u0437\u0430\u0432\u0440\u0435\u0448\u0435\u043d\u0438\u0438 \u0440\u0430\u0431\u043e\u0442 \u0432 \u041a\u0443\u0437\u043d\u0438\u0446\u0435';
var sm_alert_tn = '\u041d\u0435 \u0431\u0443\u0434\u0435\u0442 \u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u044f';

var els = document.getElementsByTagName( 'embed' );

//
var regexp_timegn0 = /\u041f\u0440\u0438\u0445\u043e\u0434\u0438 \u0447\u0435\u0440\u0435\u0437 (\d+) \u043c\u0438\u043d/

//
var regexp_timegn1 = /\u041e\u0441\u0442\u0430\u043b\u043e\u0441\u044c \u0432\u0440\u0435\u043c\u0435\u043d\u0438: (\d+) \u043c\u0438\u043d\u0443\u0442/

//
var regexp_timegn2 = /\u0442\u0435\u0431\u044f \u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c (\d+) \u043c\u0438\u043d\u0443\u0442/

//
var regexp_timegn3 = /\u0443 \u0442\u0435\u0431\u044f \u0435\u0449\u0435 \u0435\u0441\u0442\u044c (\d+) \u043c\u0438\u043d\u0443\u0442/

//
var regexp_timegn4 = /. \u041e\u0441\u0442\u0430\u043b\u043e\u0441\u044c (\d+) \u043c\u0438\u043d\u0443\u0442./

//
var regexp_timegn5 = /\u043f\u043e\u043f\u044b\u0442\u043e\u043a \u0438 (\d+) \u043c\u0438\u043d\u0443\u0442/

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
'<td class="cell_c"><span style="cursor:pointer" id="a_pers_w">\u0413\u0420</span>: <span id="pers_w">00:00</span></td>' +
'</tr>' +
'<tr><td class="cell_b"><img src="'+_i+'t_center'+_i_+'.jpg"></td></tr>' +
'</table>' +
'</td>' +

'<td width=9><img src="'+_i+'t_end'+_i_+'.jpg" alt="" width=9 height=26></td>' +

'<td>' +
'<table class="hwm_tb_cell">' +
'<tr><td class="cell_t"></td></tr>' +
'<tr>' +
'<td class="cell_c"><span title="" style="cursor:pointer" id="a_pers_sm">\u041a</span>: <a href="/mod_workbench.php" title="\u0412 \u041a\u0443\u0437\u043d\u0438\u0446\u0443" style="text-decoration: none;" id="pers_sm">00:00</a></td>' +
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
'<a href="/mercenary_guild.php" style="text-decoration: none;" title="\u0412 \u0437\u0434\u0430\u043d\u0438\u0435 \u0413\u0438\u043b\u044c\u0434\u0438\u0438 \u041d\u0430\u0435\u043c\u043d\u0438\u043a\u043e\u0432">\u0413\u041d</a>: <span id="pers_gn">00:00</span>' +
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
'<span style="cursor:pointer" id="a_pers_go" title="LeftClick = \u041e\u0431\u043d\u0443\u043b\u0438\u0442\u044c + On; RightClick = \u041e\u0431\u043d\u0443\u043b\u0438\u0442\u044c + Off">\u0413\u041e</span>: <span id="pers_go">00:00</span>' +
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

if( !GM_getValue( "hwm_time_work_end_yes" ) ) GM_setValue( "hwm_time_work_end_yes" , 'no' )
if( !GM_getValue( "hwm_time_work_alert" ) ) GM_setValue( "hwm_time_work_alert" , 'yes' )
if( !GM_getValue( "hwm_time_go_on" ) ) GM_setValue( "hwm_time_go_on" , '-'+ time_cur + '-' )
if( !GM_getValue( "hwm_time_go_stop" ) ) GM_setValue( "hwm_time_go_stop" , 'no' ) 
if( !GM_getValue( "hwm_time_go_stop_time" ) ) GM_setValue( "hwm_time_go_stop_time" , '0' ) 
if( !GM_getValue( "hwm_time_sm_end_yes" ) ) GM_setValue( "hwm_time_sm_end_yes" , 'yes' )
if( !GM_getValue( "hwm_time_sm_alert" ) ) GM_setValue( "hwm_time_sm_alert" , 'no' )

//+
var title_sm = $('a_pers_sm')
title_sm.addEventListener
(
	"click" ,
	function( event )
	{
		event.cancelBubble = true;
		if( GM_getValue( "hwm_time_sm_alert" ) == 'yes' )
		{
			GM_setValue( "hwm_time_sm_alert" , 'no' )
			title_sm.style.color = 'f5c137' ;
			title_sm.title = sm_alert_tn ;
		} else
		{
			GM_setValue( "hwm_time_sm_alert" , 'yes' )
			title_sm.style.color = 'FF0000' ;
			title_sm.title = sm_alert_ty ;
		}
	},
	false
);
if( GM_getValue( "hwm_time_sm_alert" ) == 'yes' )
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
		if( GM_getValue( "hwm_time_work_alert" ) == 'yes' )
		{
			GM_setValue( "hwm_time_work_alert" , 'no' )
			title_gr.style.color = 'f5c137' ;
			title_gr.title = work_alert_tn ;
		} else
		{
			GM_setValue( "hwm_time_work_alert" , 'yes' )
			title_gr.style.color = 'FF0000' ;
			title_gr.title = work_alert_ty ;
		}
	} ,
	false
);
if( GM_getValue( "hwm_time_work_alert" ) == 'yes' )
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
		GM_setValue( "hwm_time_go_on" , '' + this_time )
		time.go = 0 ;
		if( GM_getValue( "hwm_time_go_stop" ) == 'yes' ) 
		{
			GM_setValue( "hwm_time_go_stop" , 'no' )
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
		GM_setValue( "hwm_time_go_stop" , 'yes' )
	},
	false
);

if( GM_getValue( "hwm_time_go_on" ) )
{
	time.go = Math.floor( ( time_cur - parseInt( GM_getValue( "hwm_time_go_on" ) ) ) / 1000 ) ;
}
showtime( 'go' ) ;
//-

if( url_cur.indexOf( url_work ) != -1 ) 
{
	if( b[0].innerHTML.match( '\u0412\u044b \u0443\u0441\u0442\u0440\u043e\u0435\u043d\u044b \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0443' ) )
	{
		GM_setValue( "hwm_time_work_end" , '' + ( time_cur + 60*60*1000 ) )
		GM_setValue( "hwm_time_work_end_yes" , 'no' )
	}
}

if( GM_getValue( "hwm_time_work_end" ) )
{
	if( time_cur < ( time_work_end = parseInt( GM_getValue( "hwm_time_work_end" ) ) ) )
	{
		time.w = Math.floor( ( time_work_end - time_cur ) /  1000 ) ;
		showtime( 'w' ) ;
	}
}


if( url_cur == url_gn )
{
	if( ( time_gn = regexp_timegn0.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn1.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn2.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn3.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn4.exec( b[0].innerHTML ) ) || ( time_gn = regexp_timegn5.exec( b[0].innerHTML ) ) )
	{
		GM_setValue( "hwm_time_gn_end" , '' + ( time_cur + time_gn[1]*60*1000 ) )
	}
}

if( GM_getValue( "hwm_time_gn_end" ) )
{
	if( time_cur < ( time_gn_end = parseInt( GM_getValue( "hwm_time_gn_end" ) ) ) )
	{
		time.gn = Math.floor( ( time_gn_end - time_cur ) /  1000 ) ;
		showtime( 'gn' ) ;
	}
}


//+ for smithy
var regexp_sm = /\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u0435 \u0440\u0430\u0431\u043e\u0442\u044b: \d+-\d+ (\d+):(\d+)/ ;
var regexp_time_server = /(\d+):(\d+), (\d+) online/ ;

if( url_cur.indexOf( 'mod_workbench.php' ) > -1 )
{
	if( ( time_sm = regexp_sm.exec( b[0].innerHTML ) ) )
	{
		var time_serv = regexp_time_server.exec( b[0].innerHTML )
		if( time_sm[1][0] == 0 ) time_sm[1] = time_sm[1][1] ;
		var t_sm = new Date( 0 , 0 , ( parseInt(time_sm[1]) >= parseInt(time_serv[1]) ? 0 : 1 ) , parseInt(time_sm[1]) , parseInt(time_sm[2]) , 0 )
		var t_serv = new Date( 0 , 0 , 0 , parseInt(time_serv[1]) , parseInt(time_serv[2]) , 0 )
		GM_setValue( "hwm_time_sm_end" , ''+( time_cur+(t_sm-t_serv) ) )
		GM_setValue( "hwm_time_sm_end_yes" , 'no' )
	}
}

if( GM_getValue( "hwm_time_sm_end" ) )
{
	if( time_cur < ( time_sm_end = parseInt( GM_getValue( "hwm_time_sm_end" ) ) ) )
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
		if( GM_getValue( "hwm_time_go_stop" ) == 'yes' )
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
		if( t == 'w' && GM_getValue( "hwm_time_work_end_yes" ) != 'yes' && GM_getValue( "hwm_time_work_alert" ) == 'yes' )
		{
			GM_setValue( "hwm_time_work_end_yes" , 'yes' )
			alert( '\u041f\u043e\u0440\u0430 \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0443' )
		}
		if( t == 'sm' && GM_getValue( "hwm_time_sm_end_yes" ) != 'yes' && GM_getValue( "hwm_time_sm_alert" ) == 'yes' )
		{
			GM_setValue( "hwm_time_sm_end_yes" , 'yes' )
			alert( '\u0420\u0430\u0431\u043e\u0442\u044b \u0432 \u041a\u0443\u0437\u043d\u0438\u0446\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u044b' )
		}
		return ; 
	}
	setTimeout( function() { showtime( t ) } , 1000 )
}

function $( id ) { return document.getElementById( id ); }

