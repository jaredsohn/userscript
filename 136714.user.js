// ==UserScript==
// @name          COG_Counter
// @description   COG_Counter - shows 10, 30 and 60 min countdown 
// @include       http://callofgods.aeriagames.com/*
// ==/UserScript==


var url_cur = location.href ;

//alert("COG_Counter ");	

var b = document.getElementsByTagName( 'body' ) ;
d = document.createElement( 'div' );
d.innerHTML += 
'<table width="400" border="1" cellpadding="2" cellspacing="0" style="position:absolute;top:140px;background-color:#eee;"><tr>' +
'<td align="center" style="font-size: 11px; font-weight:bold;">count</td>' +
'<td align="center" style="font-size: 11px; font-weight:bold;"><a href="javascript:void(0);" style="font-size: 11px;" id="a_pers_10m">10 min</a>: <span id="pers_t10">00:00</span></td>' +
'<td align="center" style="font-size: 11px; font-weight:bold;"><a href="javascript:void(0);" style="font-size: 11px;" id="a_pers_30m">30 min</a>: <span id="pers_t30">00:00</span></td>' +
'<td align="center" style="font-size: 11px; font-weight:bold;"><a href="javascript:void(0);" style="font-size: 11px;" id="a_pers_60m" title="Tavern">60 min</a>: <span id="pers_t60">00:00</span></td>' + 
'</tr></table>' ;
b[0].appendChild( d ) ;


var time =
{
 t10: 0 ,
 t30: 0 ,
 t60: 0 
}


document.getElementById('a_pers_60m').addEventListener( "click", function(event){setCount(60)} , false );
document.getElementById('a_pers_30m').addEventListener( "click", function(event){setCount(30)} , false );
document.getElementById('a_pers_10m').addEventListener( "click", function(event){setCount(10)} , false );

function setCount(n){
	var dt = new Date() ;
	var time_cur = dt.getTime() ;
	var nm = "cog_count_"+n+"m";
	GM_setValue( nm , '-'+( time_cur + n*60*1000 ) +'-' );
	
}

showtime() ; // GO!
		
function showtime(){
	var t10m = GM_getValue( "cog_count_10m" );
	var t30m = GM_getValue( "cog_count_30m" );
	var t60m = GM_getValue( "cog_count_60m" );

	var e10 = document.getElementById( 'pers_t10' ) ;
	var e30 = document.getElementById( 'pers_t30' ) ;
	var e60 = document.getElementById( 'pers_t60' ) ;
	
	var dt = new Date() ;
	var time_cur = dt.getTime() ;
	
	if( t10m ){
	  if( time_cur < ( t10m = t10m.split('-')[1] ) ) {
	    time.t10 = Math.floor( ( t10m - time_cur ) /  1000 ) ;
	    e10.parentNode.style.background = "#e66";
	  }else{
	  time.t10 = 0;
	  e10.parentNode.style.background = "#6e6";
	  }
	}
	
	if( t30m ){
	  if( time_cur < ( t30m = t30m.split('-')[1] ) ) {
	    time.t30 = Math.floor( ( t30m - time_cur ) /  1000 ) ;
	    e30.parentNode.style.background = "#e66";
	  }else{
	  time.t30 = 0;
	  e30.parentNode.style.background = "#6e6";
	  }
	}

	if( t60m ){
	  if( time_cur < ( t60m = t60m.split('-')[1] ) ) {
	    time.t60 = Math.floor( ( t60m - time_cur ) /  1000 ) ;
		e60.parentNode.style.background = "#e66";
	  }else{
	  time.t60 = 0;
	  e60.parentNode.style.background = "#6e6";
	  }
	}	
	

  e10.innerHTML = getTimeString(time.t10);
  e30.innerHTML = getTimeString(time.t30);
  e60.innerHTML = getTimeString(time.t60);
  
  setTimeout	( function() { showtime() } , 1000 );
  
}

function getTimeString(ct){
	var dd = Math.floor( ct / 86400 )
	var dh = Math.floor( ( ct - dd * 86400 ) / 3600 )
	var dm = Math.floor( ( ct - dd * 86400 - dh * 3600 )  / 60 )
	var ds = ct % 60
	//
	var str  = ( dd == 0 ? '' : ( (dd < 10) ? '0' : '' ) + dd + ':' ) + ( dh == 0 ? '' : ( (dh < 10) ? '0' : '' ) + dh + ':' ) + ( (dm < 10) ? '0' : '' ) + dm + ':' + ( (ds < 10) ? '0' : '') + ds;
	//
	return str;
}

// ========= END ==============
