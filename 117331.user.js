// ==UserScript==
// @name          QWTS
// @description   FS quick movement and map reloading
// @include       http://www.fallensword.com/index.php?cmd=world*
// @include       http://www.fallensword.com/index.php?cmd=settings*
// @include  	  http://www.fallensword.com/index.php?cmd=blacksmith*
// @include  	  http://www.fallensword.com/index.php?cmd=combat*
// @include  	  http://www.fallensword.com/index.php?cmd=guild&subcmd=scouttower
// @include       http://fallensword.com/index.php?cmd=world*
// @include       http://fallensword.com/index.php?cmd=settings*
// @include  	  http://fallensword.com/index.php?cmd=blacksmith*
// @include  	  http://fallensword.com/index.php?cmd=combat*
// @include  	  http://fallensword.com/index.php?cmd=guild&subcmd=scouttower
// ==/UserScript==
// Javascript learning exercise -- works for Firefox 5 -- Aug 15 2011

//  track current position, use array to compute offsets
//  Rev 0.91 better hotKey system
var hotKey;  // now string, not array.

var hotKeyRepair, hotKeyRefresh, hotKeyWorld, FS_Stride_On;  // utility keys
var LW_X, LW_Y;	// user loc
var DeltX=[-1,1,0,0,-1,+1,-1,+1];	// hotKey dX
var DeltY=[0,0,-1,+1,-1,-1,+1,+1];  // hotKey dY 
var titleColor = [ "#FFFFFF", "#00FFFF", "#FF7F7F", "#7FFF7F" ];
var backColor = [ "#00003c", "#002018", "#330000", "#003300" ];
var im_regx = /[\w]+\.gif/i;
var onodes, nnodes, tabb;
var dashes_on = false;
	
var FSST_map_dt, FSST_map_act, FSST_map_grid;  // cntrl vars for Realm refresh
var otitt = ""; // old title
var ntitt = ""; // new title
var obodyt = ""; // old map filtered
var nbodyt = ""; // new map filtered
var nbody = "";  // new body incl. new map
var animCnt = 0; // to blink title
var mapLTm;  // regularize refresh given irreg. server resp.
var mapXHR;	// handles async map reload requests
var worldXHR;  // handles fast-walk world map refresh
var mapWatchdog, mapReload;	// reloads map if server hangs.

function detectGM_APIs() {
	if ( "function" == typeof(GM_getValue) && "function" == typeof(GM_setValue) ) {
	// Chrome falsely reports it works, but it does not.
					GM_setValue("TS61111_test", 128);
					return ( 128 == GM_getValue("TS61111_test") );
	}
	return false ;
} ;

var uSetV, uGetV;
// If Firefox : use GM
if ( detectGM_APIs() ) {
	uSetV = function( name, value ) { return GM_setValue( name, JSON.stringify( value ) ) ; } ;
	uGetV = function( name, dvalue ) { 
		var tempv = GM_getValue( name, JSON.stringify( dvalue ) ) ; 
		try { return JSON.parse( tempv ) ; } 
		catch (e) { return dvalue ;  }
	} ;
}
// If Chrome : use localStorage
else if ( "undefined" != typeof(localStorage) ) {
	uSetV = function(name, value) { return localStorage.setItem(name, JSON.stringify( value ) ) };
	uGetV = function( name, dvalue ) {
					var tempv = localStorage.getItem(name);
					if (!tempv) { return dvalue ; }
					else { 
						try { return JSON.parse( tempv ) ;} 
						catch (e) { return dvalue ; }
					}
				}
}
else {
    return ; // abort if no localStorage or GM storage support
}

var cencol, stamel, goldel, xpel ;

function mapWatchDf() { 
	window.clearTimeout( mapReload ) ;
	mapXHR.abort();
	mapXHR.open("Get", window.location, true);
	mapXHR.onreadystatechange = mapRSCH ;
	mapXHR.send();
	mapWatchdog = window.setTimeout( mapWatchDf, FSST_map_dt+5000 ) ;
	animCnt = 3;
} ;
	
function dEbId(eid) { return document.getElementById(eid) ; } ;

// replace centerColum when move
function worldRH( aEvt ) {
	if (this.readyState == 4 ) {
		if (this.status == 200 ) {
			var rx = /<td id=\"centerColumn\"[^>]*?>([\s\S]*?realm_right_bottom[\s\S]*?<br>)<br><\/td>/i  ; // use to pull out centerColumn
			var rxCmbt = /<td id=\"centerColumn\"[^>]*?>([\s\S]*?)<td id=\"rightColumn\"/i  ; // use to pull out centerColumn of combat
			var reportx = /report\[\d+\]=\"[^"]+\"/g ;
			var rgx = /(<table[^>]*?>)[^\S]*?(<form[^>]*?>)/i ;
			var rgx2 = /(<\/form>)[^\S]*?(<\/table>)/i ;
			
			var stamrgx = /icon_stamina\.gif[\s\S]*?([0-9,]*)<\/font>/i ;
			var xprgx = /xp_progress\.gif[\s\S]*?width: ([0-9]+px)/i ;
			var goldrgx = /icon_gold\.gif[\s\S]*?([0-9,]*)<\/font>/i ;
			var arr = stamrgx.exec(this.responseText);
			if ( (arr.length >= 2) && stamel ) stamel.innerHTML = arr[1] ;
			arr = xprgx.exec(this.responseText);
			if ( (arr.length >= 2) && xpel ) xpel.style.width = arr[1] ;
			arr = goldrgx.exec(this.responseText);
			if ( (arr.length >= 2) && goldel ) goldel.innerHTML = arr[1] ;
	
			arr = rx.exec(this.responseText) ;
			if ( arr && arr.length >= 2 ) {
				// before writing innerHTML, swap any <array ...><form ...> ... </form></array> so form is outside array
				cencol.innerHTML = arr[1].replace( rgx2, "$2 $1").replace(rgx, "$2 $1");
				if ( arr[1].search("INFORMATION") >= 0 ) { // blocked or "cannot move"
					var locRE = /\((\d+), (\d+)\)/.exec(arr[1]) ;
					LW_X = parseInt(locRE[1],10);
					LW_Y = parseInt(locRE[2],10);
					sessionStorage.setItem("TS_loc", locRE[0]);
				}
				// show imps left
				var SSI = document.evaluate("descendant::a[contains(@href, 'skill_id=55&')]",tn, null, 9, null).singleNodeValue;
				var bufflabel = document.evaluate("descendant::B[contains(text(), 'Active Buffs')]",tn, null, 9, null).singleNodeValue;
				if ( SSI && bufflabel){
					bufflabel.childNodes[0].appendData(" (" + /([0-9][0-9]?) HP/.exec(SSI.innerHTML)[1] + " Imps)");
				}
				else if ( bufflabel ){
					bufflabel.childNodes[0].appendData(" (No Imps)");
				}
			}
			else { // combat page
				arr = rxCmbt.exec( this.responseText ) ;
				if ( arr && arr.length > 1 ) {
					cencol.innerHTML = arr[1] ;
					arr = arr[1].match( reportx ) ;
					if ( arr && arr.length > 0 ) {
						for ( var ri = 0; ri < arr.length; ri++ ) {
							arr[ri] = /\"([^"]+?)\"/.exec( arr[ri] )[1] ;
						}
						document.getElementById("reportDiv").innerHTML += arr.join("<BR>") ;
					}
				}
			}
			// move any warnings to the top banner DIV  
			if ( uGetV("FSST_move_warn", 0) > 0 ) {
				var topb = document.getElementsByClassName("top_banner").item(0);
				if ( topb ) {
					topb.style.overflowY="auto";
					var i = 0;
					while ( cencol.childNodes[i].nodeName != "SCRIPT" ) i++ ;
					for ( var j = i-1; j >= 0; j-- ) {
						var ntm = cencol.childNodes[j] ;
						cencol.removeChild( ntm ) ; ntm.width = "800" ;
						if ( ntm.tagName != "BR" ) {
							topb.appendChild( ntm ) ; 
						}
					}
				}
			}
			arr.length=0;
		}
	}
} ;


var commands = window.location.search.substr(5).split(/[&=]/);  // HC webpages are all of the form "http//.../index.php?cmd=<command>[&<subcmd>=<whatever>]"
if (commands[0]=="world" || commands[0]=="blacksmith" || commands[0]=="combat" ) { 
	// Enhanced movement active on: world, blacksmith (after repair), combat(if mob dead when you atacked)
	// But must carve out Realm map.  
	if ( "map" != commands[2] ) {  // do enhanced walking
		FS_Stride_On=uGetV("FS_Stride_On",1);
		cencol = dEbId("centerColumn");
		stamel = document.evaluate( "descendant::font", dEbId("topBar-Stamina"), null, 9, null ).singleNodeValue ;
		xpel = document.getElementsByClassName("progressBar").item(0) ;
		goldel = document.evaluate( "descendant::font", dEbId("topBar-Gold"), null, 9, null ).singleNodeValue ;
		if ( FS_Stride_On != 0 ) {
			var tn = dEbId('centerColumn');
			LW_X = 0; LW_Y = 0 ;  // we will not  move commands if either of these is zero
			if ( tn ) {
				var currentLocation = document.evaluate("descendant::td[contains(@background,'/realm_top_b4.jpg')]",tn, null, 9, null).singleNodeValue;
				var locationRE ;
				if ( currentLocation ) locationRE = /\((\d+), (\d+)\)/.exec(currentLocation.textContent) ;
				else locationRE = /\((\d+), (\d+)\)/.exec(sessionStorage.getItem("TS_loc")) ; // if not on map restore from sessionStore
				if ( locationRE ) {
					LW_X = parseInt(locationRE[1],10);
					LW_Y = parseInt(locationRE[2],10);
					sessionStorage.setItem("TS_loc", locationRE[0]);
				}
			}

			hotKey = uGetV("FS_Stride_HKString","ADWXQEZC");  // rev0.91
			hotKeyRepair=uGetV("FS_Stride_Repair","R");
			hotKeyRefresh=uGetV("FS_Stride_Refresh","S");
			hotKeyWorld=uGetV("FS_Stride_World","F");
			worldXHR = new XMLHttpRequest() ;
			// listen for keystrokes

			document.addEventListener('keypress',function shortcutKey(e) {
				var fe = document.activeElement;  // where is the focus ?  Don't want to move if typing in a test box.
				FS_Stride_On=uGetV("FS_Stride_On",1);

				if( FS_Stride_On != 0 && (fe == null || fe == document.body) ) { // look at keystrokes if focus is on nothing or  body
					var character = String.fromCharCode(e.which);  // get the character code
					if ( character==hotKeyRepair ) {
						window.location.assign( "http://www.fallensword.com/index.php?cmd=blacksmith&subcmd=repairall&fromworld=1"); // repair request 
					} else if ( character==hotKeyRefresh ) {
//						window.location.reload();
						worldXHR.open( "GET", window.location, true ) ;
						worldXHR.onreadystatechange = worldRH ;
						worldXHR.send() ;
					} else if ( character==hotKeyWorld ) {
						window.location.assign("http://www.fallensword.com/index.php?cmd=world");
					}
					else if ( LW_X * LW_Y > 0 ) {  // if we are on a non-move-allowed page, ignore move keys
						if ( 0 <= (i = hotKey.indexOf( character )) && i < 8 ) {  // new rev. 0.91
							var tx = LW_X + DeltX[i];				// add dX for hotKey to current X
							var ty = LW_Y + DeltY[i];				// do it for Y
							if ( tx > 0 && ty > 0 ) {				// do not run off map!
								LW_X = tx; LW_Y = ty;				// update where player should be
								// new
								worldXHR.open( "GET", "http://www.fallensword.com/index.php?cmd=world&subcmd=move&x="+tx+"&y="+ty, true ) ;
								worldXHR.onreadystatechange = worldRH ;
								worldXHR.send() ;
								sessionStorage.setItem("TS_loc", "("+LW_X+", "+LW_Y+")");

								// old
								//	window.location.assign( "http://www.fallensword.com/index.php?cmd=world&subcmd=move&x="+tx+"&y="+ty ) ;
							}
						}
					}
				}
			},false);
			// show imps left
			if ( tn ) {
				var SSI = document.evaluate("descendant::a[contains(@href, 'skill_id=55&')]",tn, null, 9, null).singleNodeValue;
				var bufflabel = document.evaluate("descendant::B[contains(text(), 'Active Buffs')]",tn, null, 9, null).singleNodeValue;
				if ( SSI && bufflabel ){
					bufflabel.childNodes[0].appendData(" (" + /([0-9][0-9]?) HP/.exec(SSI.innerHTML)[1] + " Imps)");
				}
				else if ( bufflabel ){
					bufflabel.childNodes[0].appendData(" (No Imps)");
				}
			}
			
			// move any warnings to the top banner DIV  
			if ( uGetV("FSST_move_warn", 0) > 0 ) {
				var topb = document.getElementsByClassName("top_banner").item(0);
				if ( topb ) {
					topb.style.overflowY="auto";
					var i = 0;
					while ( cencol.childNodes[i].nodeName != "SCRIPT" ) i++ ;
					for ( var j = i-1; j >= 0; j-- ) {
						var ntm = cencol.childNodes[j] ;
						cencol.removeChild( ntm ) ; ntm.width = "800" ;
						if ( ntm.tagName != "BR" ) {
							topb.appendChild( ntm ) ; 
						}
					}
				}
			}
		}		
	}
	else { // do the map refresh
		FSST_map_act=uGetV("FSST_map_act", 1);
		if ( FSST_map_act == 1 ) { 
			FSST_map_dt=uGetV("FSST_map_dt", 500);
			// XMLHttpResponse readystatuschange handler for Realm refresh 
			mapXHR = new XMLHttpRequest() ;
			mapXHR.open("Get", window.location, true);
			// one-time
			var tdback_rx = /<td[^>]+?['"][^'"]+?([^'"\/]+.gif)["']/i ;
			var tableback_rx = /<table[^>]+?['"][^'"]+?([^'"\/]+.gif)["']/i ;
			var center_rx = /<center>.+><\/center>/i ;  // new
			var backg_rx = /background=['"]([^'"]+)['"]/i ;
			var img_rx = /<img [^>]+?player_tile.gif[^>]+>/i ;
			var tabb = document.evaluate( "child::table/child::tbody", document.body, null, 9, null ).singleNodeValue;  // 8.17.11 just first one
			var onodes = tabb && document.evaluate( "child::tr/child::td", tabb, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );   // table entries (TD) in old
			var onlength = onodes ? onodes.snapshotLength : 0 ;
			// handler
			mapXHR.onreadystatechange = function mapRSCH( aEvt ) {
				if (mapXHR.readyState == 4 ) {
					// reset watchdog then start it again.
					window.clearTimeout( mapWatchdog ) ;
					mapWatchdog = window.setTimeout( mapWatchDf, FSST_map_dt+3000 ); // 3sec after expected
					if (mapXHR.status == 200 ) {
						var tnow = Date.now();
						nbody = mapXHR.responseText.split(/<\/?body[^>]*>/ig)[1];	// get response body	
						ntitt = mapXHR.responseText.split(/<\/?b>/ig)[1];			// bold text = map title
						animCnt = (animCnt==1) ? 0 : 1;		// rotate color of title: working
						FSST_map_grid=uGetV("FSST_map_grid", 1);
						if (ntitt == otitt) {				// in same map
							FFSST_map_dt=uGetV("FSST_map_dt", 500);
							FSST_map_act=uGetV("FSST_map_act", 1);
							// new code start
							if ( FSST_map_grid && false==dashes_on ) {
								var obim = document.evaluate( "child::table", document.body, null, 9, null ).singleNodeValue ;
								if ( obim ) obim.style.borderCollapse = "collapse";
							}
							// adapted (?) to bgrnd changing in dark maps.
							if ( tabb ) {
								nnodes = nbody.match(/<td([^>]+?dark\.gif[^>]+?>)|(<td[^>]+?background[^>]+>.+?<table.+?<\/table.+?)<\/td>/igm);  // table entries in new
								var nbim;
								for ( var i = 0; i < onlength; i++ ) {
									if ( FSST_map_grid && false==dashes_on ) {
										onodes.snapshotItem(i).style.border = 'dashed lightgray 1px';
										onodes.snapshotItem(i).style.backgroundClip = 'content-box';
									}
									// if player img is found in one but not other ...
									if ( ( nnodes[i].search("player_tile.gif") < 0 ) != ( onodes.snapshotItem(i).innerHTML.search("player_tile.gif") < 0 )) {
										// cfound = true;
										// replace or delete the image
										nbim = img_rx.exec( nnodes[i] );
										obim = document.evaluate( "descendant::td", onodes.snapshotItem(i), null, 9, null).singleNodeValue ;
										if ( obim ) obim.innerHTML = ( nbim && nbim.length > 0 ) ? nbim[0] : "" ;
										else onodes.snapshotItem(i).innerHTML = ( nbim && nbim.length > 0 ) ? nbim[0] : "" ;
									}
									// check TD background
									nbim = tdback_rx.exec( nnodes[i] ) ;
									if ( nbim && nbim.length > 1 ) {
										if ( nbim[1].search( "dark.gif" ) < 0 ) {  // don't overwrite with dark background
											if ( window.getComputedStyle(onodes.snapshotItem(i)).backgroundImage.search( nbim[1] ) < 0 ) {
												onodes.snapshotItem(i).style.backgroundImage = "url(\""+backg_rx.exec( nbim[0] )[1]+"\")" ; //URL
											}
											if ( 1 != onodes.snapshotItem(i).style.opacity ) onodes.snapshotItem(i).style.opacity = 1 ;
										}
										else {
											if ( 0.4 != onodes.snapshotItem(i).style.opacity ) onodes.snapshotItem(i).style.opacity = 0.4 ;
										}
									}
									// check table background
									nbim = tableback_rx.exec( nnodes[i] ) ;
									if ( nbim && nbim.length > 1 ) {
										obim = document.evaluate( "descendant::table", onodes.snapshotItem(i), null, 9, null).singleNodeValue ;
										if ( obim ) {
											if ( window.getComputedStyle(obim).backgroundImage.search( nbim[1] ) < 0 ) {
												obim.style.backgroundImage = "url(\""+ backg_rx.exec( nbim[0] )[1] + "\")" ;
												animCnt = 2;  // titan moved - flash red
											}
										} else {
											obim = center_rx.exec( nnodes[i] ) ;
											if ( obim && obim.length > 0 ) {
												onodes.snapshotItem(i).innerHTML = obim[0] ;
												animCnt = 2;  // titan moved - flash red
											}
										}
									}
								}
								dashes_on = true;
							}
							if ( FSST_map_act ) {
								mapXHR.open("Get", window.location, true);
								mapXHR.onreadystatechange = mapRSCH ;
								tttm = (2*FSST_map_dt) - (tnow-mapLTm); 
								mapLTm = tnow;
								mapReload = setTimeout( function() { mapXHR.send(); }, (tttm < 20 ) ? 20 : tttm );
								document.body.getElementsByTagName("font")[0].style.color = titleColor[animCnt];
								if ( 1 == uGetV("FSST_map_blinkback", 0) ) { 
									document.body.style.backgroundColor = backColor[animCnt]; 
									document.documentElement.style.backgroundColor = backColor[animCnt]; 
								}	
							}
						} else {  // new realm: reload
							otitt = ntitt ;
							document.body.innerHTML = nbody ;
							dashes_on = false;
							document.location.reload();
						}
					}
					else { // bad return code
						mapXHR.abort();
						mapXHR.open("Get", window.location, true);
						mapXHR.onreadystatechange = mapRSCH ;
						mapReload = setTimeout( function() { mapXHR.send(); }, 50);
						mapLTm = Date.now();
					}
				}
			} ;
			// handler end
			otitt = document.body.innerHTML.split(/<\/?b>/ig)[1];
			mapLTm = Date.now();
			mapReload = window.setTimeout(function() { mapXHR.send(); }, FSST_map_dt);
		}
	}
}
else if ( commands[0]=="guild" &&  "scouttower" == commands[2] ) {
	var STXHR = new XMLHttpRequest() ;
	var cenrx = /id=\"centerColumn\"[^>]*?>([\s\S]*?)<\/td>[^>]*?<td id=\"rightColumn\"/i ;
	var imgrx = /<img[^>]+>/ig ;
	var titanimg = /<img[^>]+?creatures[^>]+?title=["']([^'"]+?)['"][^>]+>/ig ;
	// <img src="http://huntedcow.cachefly.net/fs/creatures/14265ed7d8f3004f665970abab79d3f7e991.jpg" title="Air Guardian (Titan)" height="100">
	STXHR.open("GET", "http://www.fallensword.com/index.php?cmd=guild&subcmd=scouttower", true );
	STXHR.onreadystatechange = function STRSCH( aEvt ) {
		if (STXHR.readyState == 4 ) {
			FSST_map_dt = 1000 * uGetV("FSST_tower_dt", 6)
			// reset watchdog then start it again.
			window.clearTimeout( mapWatchdog ) ;
			mapWatchdog = window.setTimeout( function () { document.location.reload(); }, FSST_map_dt+10000 ); // 10sec after expected
			if (STXHR.status == 200 ) {
				var txt = cenrx.exec( STXHR.responseText ) ;
				if ( txt ) {
					txt = txt[1].replace( titanimg, "<center>$1</center>" );
					var killsrx = /([1-9]\d*)\/(\d+)(<\/td>[^>]*>)(\d+)</ig ;
					txt = txt.replace( killsrx, function( str, p1, p2, p3, p4, off, s ) {
						var p1n, p2n, p4n ;
						p1n = parseInt( p1 ) ;
						p2n = parseInt( p2 ) ;
						p4n = parseInt( p4 ) ;
						return p1+"/"+p2+p3+p4+" ("+ (100*p4n/p2n).toFixed(1) + "%)" + ( p4n+p1n < 1+p2n/2 ? "" : " <br><span style='color:blue'>" + (1+p2n/2 - p4n).toFixed(0) + " to secure<span>" ) +"<" ; } ) ;
					now = new Date() ;
					txt = txt.replace( imgrx, "" ).replace( '<td height="20" colspan="3"></td>', '<td height="20" colspan="3"><center>Last Updated: '+ now.toLocaleTimeString() + '</center></td>');
					document.body.innerHTML = txt ;
					STXHR.open("Get", window.location, true);
					STXHR.onreadystatechange = STRSCH ;
					setTimeout( function() { STXHR.send(); }, FSST_map_dt < 2000 ? 2000 : FSST_map_dt );
				}
			}
		}
	} ;
	STXHR.send(); 
}
else if (commands[0]=="settings")
{  // this appends the setting below the new tabbed interface -- usually. 
	// retrieve the current values
	var FSST_map_dt=uGetV("FSST_map_dt", 500);
	var FSST_map_act=uGetV("FSST_map_act", 1);
	var FSST_map_grid=uGetV("FSST_map_grid", 1);
	var FSST_map_blinkback=uGetV("FSST_map_blinkback", 0);
	
	var FSST_tower_dt=uGetV("FSST_tower_dt", 6);
	var FSST_tower_act=uGetV("FSST_tower_act", 1);
	
	var FSST_move_warn=uGetV("FSST_move_warn", 1);
	FS_Stride_On=uGetV("FS_Stride_On",1);
	hotKey = uGetV("FS_Stride_HKString","ADWXQEZC"); // Rev 0.91 more efficient hotKey system

	hotKeyRepair=uGetV("FS_Stride_Repair","R");
	hotKeyRefresh=uGetV("FS_Stride_Refresh","S");
	hotKeyWorld=uGetV("FS_Stride_World","F");
	// find a place to attach the interface
	var tn = dEbId('settingsTabs');
	var ndiv=document.createElement('div');
	
	// NEW add styles as CSS (save chars)
	const TSUI_tda = "style='text-align:right;width:140px;'";
	const TSUI_tdb = "style='text-align:right;width:124px;";
	const TSUI_tdc = "style='text-align:right;width:40px;'";
	const TSUI_tdhd = "style='background-color:#663333;border:1px white solid;border-radius:6px/3px;font-weight:bold";
	const TSUI_tin = "input style='width:25px' type='text' id"
	
	// build the interface up
	var mH=[""] ;
	mH.push("<form><table style='color:white;background-color:#CC9933;border-radius:6px/3px;width: 100%'>");
	mH.push("<tr><td colspan='9' "+TSUI_tdhd+"'><center>FS Realm Map Refresh Settings</center></td></tr>");
	mH.push("<tr><td colspan='9'><center><span style='font-size:12px'>Set the delay (in milliseconds) between refresh checks.</span></center></td></tr>");
	mH.push("<tr><td "+TSUI_tda+">Map Delay, ms</td><td><"+TSUI_tin+"='FSST_map_dt' value='" + FSST_map_dt + "' /></td> ");
	mH.push("<td "+TSUI_tda+">Map Refresh Active</td><td><input style='width:25px' type='checkbox' id='FSST_map_act' value='on' " + (FSST_map_act ? "checked" : "") + "/></td>"); 
	mH.push("<td "+TSUI_tda+">Grid On</td><td><input style='width:25px' type='checkbox' id='FSST_map_grid' value='on' " + (FSST_map_grid ? "checked" : "") + "/></td>");
	mH.push("<td "+TSUI_tda+">Blink Background</td><td><input style='width:25px' type='checkbox' id='FSST_map_blinkback' value='on' " + (FSST_map_blinkback ? "checked" : "") + "/></td></tr>"); 
	
	mH.push("<tr><td colspan='9' style='height:4px;'> </td></tr>");
	
	mH.push("<tr><td colspan='9' "+TSUI_tdhd+"'><center>FS Scout Tower Refresh Settings</center></td></tr>");
	mH.push("<tr><td colspan='9'><center><span style='font-size:12px'>Set the delay (in seconds) between refreshs.</span></center></td></tr>");
	mH.push("<tr><td "+TSUI_tda+">Tower Delay</td><td><"+TSUI_tin+"='FSST_tower_dt' value='" + FSST_tower_dt + "' /></td> ");
	mH.push("<td "+TSUI_tda+">Tower Refresh Active</td><td><input style='width:25px' type='checkbox' id='FSST_tower_act' value='on' " + (FSST_tower_act ? "checked" : "") + "/></td></tr>"); 
	
	mH.push("<tr><td colspan='9' style='height:4px;'> </td></tr>");
	
	mH.push("<tr><td colspan='9' "+TSUI_tdhd+"'><center>Titan Stride QW 9.2.11 Settings</center></td></tr>");
	mH.push("<tr><td colspan='9'><center><b>Shortcut Keys: CASE-SENSITIVE keys to move and do other essential hunting actions</b></center></td></tr>");
	mH.push("<tr><td style='text-align:right;'>Enabled</td><td><input style='width:25px' type='checkbox' id='FS_Stride_On' value='on' "  + (FS_Stride_On ?"checked":"") + "></td>");
	mH.push("<td style='text-align:right;'>Move Warnings</td><td><input style='width:25px' type='checkbox' id='FS_MoveWarning' value='on' "  + (FSST_move_warn ?"checked":"") + "></td>");
	mH.push("<tr><td "+TSUI_tdb+"'>North West</td><td><"+TSUI_tin+"='FS_Stride_NWshortcut' value='"+hotKey[4]+"' /></td>");
	mH.push("<td "+TSUI_tdb+"'>North</td><td><"+TSUI_tin+"='FS_Stride_Nshortcut' value='"+hotKey[2]+"' /></td>");
	mH.push("<td "+TSUI_tdb+"'>North East</td><td><"+TSUI_tin+"='FS_Stride_NEshortcut' value='"+hotKey[5]+"' /></td>");
	mH.push("<td "+TSUI_tdb+"border-left:1px solid white'>Repair</td><td><"+TSUI_tin+"='FS_Stride_RepairKey' value='"+hotKeyRepair+"' /></td>");  //new
	mH.push("<td "+TSUI_tdc+"></td></tr>");
	mH.push("<tr><td "+TSUI_tdb+">'West</td><td><"+TSUI_tin+"='FS_Stride_Wshortcut' value='"+hotKey[0]+"' /></td>");
	mH.push("<td "+TSUI_tdb+"'>Refresh</td><td><"+TSUI_tin+"='FS_Stride_RefreshKey' value='"+hotKeyRefresh+"' /></td>"); // new
	mH.push("<td "+TSUI_tdb+"'>East</td><td><"+TSUI_tin+"='FS_Stride_Eshortcut' value='"+hotKey[1]+"' /></td>");
	mH.push("<td "+TSUI_tdb+"border-left:1px solid white'>World</td><td><"+TSUI_tin+"='FS_Stride_WorldKey' value='"+hotKeyWorld+"' /></td>");  // new
	mH.push("<td "+TSUI_tdc+"></td></tr>");
	mH.push("<tr><td "+TSUI_tdb+">'South West</td><td><"+TSUI_tin+"='FS_Stride_SWshortcut' value='"+hotKey[6]+"' /></td>");
	mH.push("<td "+TSUI_tdb+">'South</td><td><"+TSUI_tin+"='FS_Stride_Sshortcut' value='"+hotKey[3]+"' /></td>");
	mH.push("<td "+TSUI_tdb+">'South East</td><td><"+TSUI_tin+"='FS_Stride_SEshortcut' value='"+hotKey[7]+"' /></td>");
	mH.push("<td "+TSUI_tdc+"></td></tr>");
	mH.push("<tr><td > </td></tr>");
	mH.push("<tr><td colspan='5' "+TSUI_tdhd+"border:2px white solid;'><center><input style='width:180px' class='custombutton' type='button' id='FS_Stride_Save' value='Save TS Settings'/></center></td>");
	mH.push("<td colspan='4' "+TSUI_tdhd+"border:2px white solid;'><center><input style='width:150px' class='custombutton' type='button' id='FS_Stride_Noises_Off' value='Turn Off FS Distractions'/></center></td></tr>");
	mH.push("</table></form>");

	// display the interface
	ndiv.innerHTML = mH.join("") ;  mH.length=0;
	ndiv.style.width="650px";  ndiv.style.background="#CC9933"; 
	ndiv.style.border="1px black solid"; ndiv.style.color="white"; 
	ndiv.style.borderRadius="6px/3px"; ndiv.style.margin="8px 0px";
	tn.parentNode.insertBefore(ndiv,tn.nextSibling);

	// process the interface when user clicks "Save"
	dEbId('FS_Stride_Save').addEventListener('click',function(){
		var mdt = parseInt(dEbId('FSST_map_dt').value) ;
			
		if ( NaN != mdt ) {  // make sure the user gave us a number
			FSST_map_dt = ( mdt < 200 ) ? 200 : mdt;  // 5 times a second is fast enough for anyone, will rarely be achieved.
		}
		
		mdt = parseInt(dEbId('FSST_tower_dt').value) ;
		if ( NaN != mdt ) {  // make sure the user gave us a number
			FSST_tower_dt = ( mdt < 2 ) ? 2 : mdt;  // every 2 seconds is fast enough for anyone.
		}
		uSetV("FSST_map_dt", FSST_map_dt);
		uSetV("FSST_map_act", dEbId('FSST_map_act').checked ? 1 : 0 );
		uSetV("FSST_map_grid", dEbId('FSST_map_grid').checked ? 1 : 0 );
		uSetV("FSST_map_blinkback", dEbId('FSST_map_blinkback').checked ? 1 : 0 );
		
		uSetV("FSST_tower_dt", FSST_tower_dt);
		uSetV("FSST_tower_act", dEbId('FSST_tower_act').checked ? 1 : 0 );
		
		// Start: Rev 0.91 more efficient hotKey system
		// hotKey = uGetV("FS_Stride_HKString","ADWXQEZC"); // this shows the order
		hotKey = dEbId('FS_Stride_Wshortcut').value + dEbId('FS_Stride_Eshortcut').value +
			dEbId('FS_Stride_Nshortcut').value + dEbId('FS_Stride_Sshortcut').value +
			dEbId('FS_Stride_NWshortcut').value + dEbId('FS_Stride_NEshortcut').value +
			dEbId('FS_Stride_SWshortcut').value + dEbId('FS_Stride_SEshortcut').value ;
		uSetV("FS_Stride_HKString", hotKey) ;		
		// End: Rev 0.91 more efficient hotKey system
		uSetV("FS_Stride_Repair",dEbId('FS_Stride_RepairKey').value);
		uSetV("FS_Stride_Refresh",dEbId('FS_Stride_RefreshKey').value);
		uSetV("FS_Stride_World",dEbId('FS_Stride_WorldKey').value);
		uSetV("FS_Stride_On",dEbId('FS_Stride_On').checked ? 1 : 0 );
		uSetV("FSST_move_warn",dEbId('FS_MoveWarning').checked ? 1 : 0 );
		alert("Titan Stride Settings Saved (refresh Realm map if needed)");
		window.location.reload();
	},false);
	// right column junk & other setting to optimize for Titan hunting, ui_prefrences hide:
	// 14 - Curr. Poll Rslts  	// 3 -  Allies List
	// 10 - LHS Questions 	 	// 9 - recruiting
	// 8 - Help 			  	// 7 - Support Us
	// 3 - Kill / Chest  Logs	// 2 - Game Stats
	// 1 - Guild Info Chat		// 0 - Guild Info Members
	// hide_fsbox - FSBox
	dEbId('FS_Stride_Noises_Off').addEventListener('click',function(){
		var names2check = [ "ui_preference_0", "ui_preference_1", "ui_preference_2", "ui_preference_3", "ui_preference_7", 
			"ui_preference_8", "ui_preference_9", "ui_preference_10", "ui_preference_13", "ui_preference_14", "hide_fsbox" ] ; 

		var obj, obj_so;
		for ( var i = 0; i < names2check.length; i++ ) {
			obj = document.getElementsByName(names2check[i])
			if ( obj.length > 0 ) obj[0].checked = true ;
		}
		obj = document.getElementsByName("combat_speed") ;
		if ( obj.length > 0 ) {
			for ( i = 0; i < obj[0].options.length; i++ ) { 
				obj_so = obj[0].options[i]; 
				obj_so.selected = ( "Instant" == obj_so.text ) ? true : false ; 
			}
		}
		dEbId('settingsTabs-2').getElementsByTagName("form")[0].submit();
	},false);
}