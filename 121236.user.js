// ==UserScript==
// @name          ClassTS
// @description   Bandwidth-saving and fast movement enhancements to FS
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
// Javascript learning exercise -- works for Firefox 4 -- May 15 2011 15:47 GMT

// TitanStride features:
// NO rebinding of commands on the map arrow icons - bind keystrokes only
// User configurable remapping of movement
// binding of a key to the quick-repair function, refresh and World page
// Only operate on the world screen, blacksmith and combat when there was no mob )
// Do not process keys unless focus is on the overall document (i.e. not in a text box)
// new: Shows remaining imps and (optionally) moves warning to the top banner area

// Automatic Reload features:
// Only fetch new images and redraw Realm Map that has changed
// -- AJAXified, does not reload entire page, just the changed parts
// -- uses asynchronous XMLHttpRequests to mimimize user interface lock-up
// -- reload entire map when title changes
// -- watchdog timer forces complete reload if did not get a response from servers in 3 seconds.
// -- give an indication (blinking text) that requests are being processed
// -- dashed grid to mave movement easier to figure, optional
// Reload Scour Tower at a programable interval
// -- uses reload for more efficient use of browser resources.
// TBD:  on/off toggle on the realm map (next to title) ?

//  track current position, use array to compute offsets
var hotKey = new Array(7);			// key bindings for Titan Striding movement
var hotKeyRepair; var hotKeyRefresh; var hotKeyWorld; var FS_Stride_On;  // utility keys
var LW_X; var LW_Y;					// where the user is
var DeltX=[-1,1,0,0,-1,+1,-1,+1];	// turn a hotkey (as numbered above) into a Delta-X value
var DeltY=[0,0,-1,+1,-1,-1,+1,+1];  // turn a hotkey (as numbered above) into a Delta-Y value
var titleColor = [ "#FFFFFF", "#00FFFF", "#FF7F7F" ];
var im_regx = /[\w]+\.gif/i;
var onodes; 
var nnodes;
var dashes_on = false;
	
var FSST_map_dt; var FSST_map_act; var FSST_map_grid;  // control variables for Realm refresh
var otitt = ""; // old title
var ntitt = ""; // new title
var obodyt = ""; // old map, filtered
var nbodyt = ""; // new map, filtered
var nbody = "";  // new body including new map
var animCnt = 0; // toggles to blink the title
var maplasttime ;  // try to regularize refresh in face of variable internet response time
var attlasttime ;
var mapXHR;			// handles the async requests for map reload
var mapWatchdog;	// reloads the page it the request is outstanding for too long.

// function lsGet( str, def ) {
	// var t = localStorage.getItem( "TS6711" + str );
	// return t == null ? def : t ;
// }
// function lsGetInt( str, def ) {
	// var t = localStorage.getItem( "TS6711" + str );
	// return t == null ? def : parseInt(t) ;
// }

// function lsSet( str, val ) {
	// localStorage.setItem("TS6711" + str, val);
// }

function detectGM_APIs() {
	if ( "function" == typeof(GM_getValue) && "function" == typeof(GM_setValue) ) {
	// Chrome falsely reports it works, but it does not.
					GM_setValue("TS61111_test", 128);
					return ( 128 == GM_getValue("TS61111_test") );
	}
	return false ;
} ;

var uSetValue;  var uGetValue;

// If Firefox : use GM
if ( detectGM_APIs() ) {
	uSetValue = function( name, value ) { return GM_setValue( name, JSON.stringify( value ) ) ; } ;
	uGetValue = function( name, dvalue ) { 
		var tempv = GM_getValue( name, JSON.stringify( dvalue ) ) ; 
		try { return JSON.parse( tempv ) ; } 
		catch (e) { return dvalue ;  }
	} ;
}
// If Chrome : use localStorage
else if ( "undefined" != typeof(localStorage) ) {
	uSetValue = function(name, value) { return localStorage.setItem(name, JSON.stringify( value ) ) };
	uGetValue = function( name, dvalue ) {
					var tempv = localStorage.getItem(name);
					if (!tempv) { return dvalue ; }
					else { 
						try { return JSON.parse( tempv ) ;} 
						catch (e) { return dvalue ; }
					}
				}
}
else {
    return ; // dont load anything if no localStorage or GM storage support
}

// function slashify( x ) { return ((x=="'" || x=="\\" || x=="\"") ? "\\"+x : x ) ; } ;

var commands = window.location.search.substr(5).split(/[&=]/);  // HC webpages are all of the form "http//.../index.php?cmd=<command>[&<subcmd>=<whatever>]"
if(commands[0]=="world" || commands[0]=="blacksmith" || commands[0]=="combat" ) { 
	// Enhanced movement is active on these pages
	// "blacksmith" happens when you repair items.  
	// "combat" can be walked from if the monster was already dead when you atacked it (if not, there is no location to fetch)
	// But must carve out Realm map.  Are we in the Realm map instead ?.  
	if ( "map" == commands[2] ) {  // do the map refresh.  commands[1] would be "subcmd" typically.
		// start the realm map refresh
		FSST_map_act=uGetValue("FSST_map_act", 1);
		if ( FSST_map_act == 1 ) { 
			FSST_map_dt=uGetValue("FSST_map_dt", 500);
			// XMLHttpResponse readystatuschange handler for Realm refresh 
			mapXHR = new XMLHttpRequest() ;
			mapXHR.open("Get", window.location, true);
			mapXHR.onreadystatechange = function mapRSCH( aEvt ) {
				if (mapXHR.readyState == 4 ) {
					// reset watchdog then start it again.
					window.clearTimeout( mapWatchdog ) ;
					mapWatchdog = window.setTimeout( function () { document.location.reload(); }, 3000 ); // three second watchdog
					if (mapXHR.status == 200 ) {
						nbody = mapXHR.responseText.split(/<\/?body[^>]*>/ig)[1];	// get the bod of the response	
						ntitt = mapXHR.responseText.split(/<\/?b>/ig)[1];			// look for bold text - the map title
						animCnt = (animCnt==1) ? 0 : 1;							// rotates the coloer of the title to show it is working
						FSST_map_grid=uGetValue("FSST_map_grid", 1);
						if (ntitt == otitt) {									// in same map
							FFSST_map_dt=uGetValue("FSST_map_dt", 500);
							FSST_map_act=uGetValue("FSST_map_act", 1);
							// new code start
							if ( FSST_map_grid && false==dashes_on ) {
								onodes = document.evaluate( "child::table", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ) ;
								if (onodes.snapshotLength > 0 ){ 
									onodes.snapshotItem(0).style.borderCollapse = "collapse";
								}
							}
							// need to adapt this to the fact that the background DOES change for dark maps.
							// might have to treat dark maps different.  "Region Maps" do not have an array, don't need updating.
							var tabb = document.evaluate( "descendant::tbody", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
							if ( tabb.snapshotLength > 0 ) {
								tabb = tabb.snapshotItem(0) ;  // want the first table body
								onodes = document.evaluate( "child::*/child::td", tabb, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );   // table entries in old
								nnodes = nbody.match(/<td([^>]+?dark\.gif[^>]+?>)|(<td[^>]+?background[^>]+>.+?<table.+?<\/table.+?)<\/td>/igm);  // table entries in new
								var onlength = onodes.snapshotLength ;
								var obim; var nbim; var cfound;  var nnmatch ;
								for ( var i = 0; i < onlength; i++ ) {
									if ( FSST_map_grid && false==dashes_on ) {
										onodes.snapshotItem(i).style.border = 'dotted lightgray 1pt';
									}
									cfound = false ;
									// player is the only image on the map, so if an img is found in one but not the other ...
									if ( ( nnodes[i].search("img") < 0 ) != ( onodes.snapshotItem(i).innerHTML.search("img") < 0 )) {
										cfound = true;
									}
									else {
										// looking for titans in the inner nested table
										nbim = nnodes[i].search("\/titans\/");
										obim = onodes.snapshotItem(i).innerHTML.search("\/titans\/");
										if ( (obim > 0) || (nbim > 0 )) {
											if ((obim > 0) && (nbim > 0 )) {  // unmoving Titan or other titan in same spot
												obim = onodes.snapshotItem(i).innerHTML.substr(obim,42);
												nbim = nnodes[i].substr(nbim,42);
											}
											if ( obim != nbim ) {
												cfound = true ;
											}
										}
									}
									// if the player entered or left the square, or a titan entered, left, or changed,  refresh this square.
									// also refresh the background if it changes (as occurs in dark realms)
									if (cfound ) {
										nnmatch = nnodes[i].match(/<center>.*?<\/center>/i);  // HC centers the contents of each table entry
										if ( nnmatch && nnmatch.length > 0 ) {
											onodes.snapshotItem(i).innerHTML = nnmatch[0] ;
										} 
										else onodes.snapshotItem(i).innerHTML = "";
										nnmatch = nnodes[i].match(/background=(["'][^"']+?["'])/i);
										if ( nnmatch && nnmatch.length > 1 && ( onodes.snapshotItem(i).style.backgroundImage != nnmatch[1] )) {
											onodes.snapshotItem(i).style.backgroundImage = 'url('+nnmatch[1]+')' ; 
										}
										// onodes.snapshotItem(i).innerHTML = nnodes[i].match(/<center>.*?<\/center>/i)[0];
										animCnt = 2;  // indicates change
									}
								}
								dashes_on = true;
							}
							// new code end
							if ( FSST_map_act ) {
								mapXHR.open("Get", window.location, true);
								mapXHR.onreadystatechange = mapRSCH ;
								tttm = FSST_map_dt - (Date.now()-maplasttime); 
								setTimeout( function() { mapXHR.send(); }, (tttm < 20 ) ? 20 : tttm );
								maplasttime = Date.now();
								document.body.getElementsByTagName("font")[0].style.color = titleColor[animCnt];
							}
						} else {  // user moved to a new map: reload the page.
							otitt = ntitt ;
							document.body.innerHTML = nbody ;
							dashes_on = false;
							document.location.reload();
						}
					}
					else {
						mapXHR.open("Get", window.location, true);
						mapXHR.onreadystatechange = mapRSCH ;
						setTimeout( function() { mapXHR.send(); }, 50);
						maplasttime = Date.now();
					}
				}
			} ;

			otitt = document.body.innerHTML.split(/<\/?b>/ig)[1];
			maplasttime = Date.now();
			window.setTimeout(function() { mapXHR.send(); }, FSST_map_dt);
		}
	}
	else { // do enhanced walking
	// get the hotkey setting from greasemonkey's storage in the user's Firefox profile
		FS_Stride_On=uGetValue("FS_Stride_On",1);
		if ( FS_Stride_On != 0 ) {
			var tn = document.getElementById('centerColumn');
			var LWFQ = document.evaluate("descendant::td[contains(@background,'/realm_top_b4.jpg')]",tn, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			// if the LWFQ node is null, we cannot LW 
			var currentLocation = LWFQ.snapshotItem(0);
			if (currentLocation) {
				var locationRE = /\((\d+), (\d+)\)/.exec(currentLocation.textContent) ;
				LW_X = parseInt(locationRE[1],10);
				LW_Y = parseInt(locationRE[2],10);
			}
			else {
				LW_X = 0; LW_Y = 0 ;  // we will not check the move commands if either of these is zero, but still do utility functions
			}
			hotKey[0]=uGetValue("FS_Stride_W","A"); 
			hotKey[1]=uGetValue("FS_Stride_E","D");
			hotKey[2]=uGetValue("FS_Stride_N","W");
			hotKey[3]=uGetValue("FS_Stride_S","X");
			hotKey[4]=uGetValue("FS_Stride_NW","Q");
			hotKey[5]=uGetValue("FS_Stride_NE","E");
			hotKey[6]=uGetValue("FS_Stride_SW","Z");
			hotKey[7]=uGetValue("FS_Stride_SE","C");
			hotKeyRepair=uGetValue("FS_Stride_Repair","R");
			hotKeyRefresh=uGetValue("FS_Stride_Refresh","S");
			hotKeyWorld=uGetValue("FS_Stride_World","F");
			
			// listen for keystrokes
			document.addEventListener('keypress',function shortcutKey(e) {
				var fe = document.activeElement;  // where is the focus ?  Don't want to move if typing in a test box.
				FS_Stride_On=uGetValue("FS_Stride_On",1);

				if( FS_Stride_On != 0 && (fe == null || fe == document.body) ) { // only look at keystrokes is focus is on nothing or the body
					var character = String.fromCharCode(e.which);  // get the character code
					if ( character==hotKeyRepair ) {
						window.location.assign( "http://www.fallensword.com/index.php?cmd=blacksmith&subcmd=repairall&fromworld=1"); // repair request 
					} else if ( character==hotKeyRefresh ) {
						window.location.reload();
					} else if ( character==hotKeyWorld ) {
						window.location.assign("http://www.fallensword.com/index.php?cmd=world");
					}
					else if ( LW_X * LW_Y > 0 ) {  // if we are on a non-move-allowed page, ignore move keys
						for(i=0;i<hotKey.length;i++) {   				// search the hotKey array
							if(character==hotKey[i]) {
								var tx = LW_X + DeltX[i];				// add the change in X for that hotkey to the current X
								var ty = LW_Y + DeltY[i];				// do same for Y
								if ( tx > 0 && ty > 0 ) {				// no use trying to run off the map!
									LW_X = tx; LW_Y = ty;				// update where the player should be
									window.location.assign( "http://www.fallensword.com/index.php?cmd=world&subcmd=move&x="+tx+"&y="+ty ) ;
								}
								break;
							}
						}
					}
				}
			},false);
			// show how many imps are left
			var SSI = document.evaluate("descendant::a[contains(@href, 'skill_id=55&')]",tn, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var bufflabel = document.evaluate("descendant::B[contains(text(), 'Active Buffs')]",tn, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (( SSI.snapshotLength > 0 ) && ( bufflabel.snapshotLength > 0 )){
				bufflabel.snapshotItem(0).childNodes[0].appendData(" (" + /([0-9][0-9]?) HP/.exec(SSI.snapshotItem(0).innerHTML)[1] + " Imps)");
			}
			else if ( bufflabel.snapshotLength > 0 ){
				bufflabel.snapshotItem(0).childNodes[0].appendData(" (No Imps)");
			}
			// move any warnings to the top banner DIV  
			if ( uGetValue("FSST_move_warn", 0) > 0 ) {
				var topb = document.getElementsByClassName("top_banner").item(0); 
				var cencol = document.getElementById("centerColumn");
				var i = 0;
				while ( cencol.childNodes[i].nodeName != "SCRIPT" ) i++ ;
				for ( var j = i-1; j >= 0; j-- ) topb.appendChild( cencol.removeChild( cencol.childNodes[j] ) ) ;
			}
		}
	}
}
else if ( commands[0]=="guild" &&  "scouttower" == commands[2] ) {
	if ( 1 == uGetValue("FSST_tower_act", 1) ) {
		window.setTimeout( function () { document.location.reload(); }, 1000 * uGetValue("FSST_tower_dt", 6)) ;
	}
}
else if (commands[0]=="settings")
{  // this appends the setting below the new tabbed interface -- usually.  TBD is to make it a tab.
	// retrieve the current values
	var FSST_map_dt=uGetValue("FSST_map_dt", 500);
	var FSST_map_act=uGetValue("FSST_map_act", 1);
	var FSST_map_grid=uGetValue("FSST_map_grid", 1);
	
	var FSST_tower_dt=uGetValue("FSST_tower_dt", 6);
	var FSST_tower_act=uGetValue("FSST_tower_act", 1);
	
	var FSST_move_warn=uGetValue("FSST_move_warn", 1);
	FS_Stride_On=uGetValue("FS_Stride_On",1);
	hotKey[0]=uGetValue("FS_Stride_W","A"); 
	hotKey[1]=uGetValue("FS_Stride_E","D");
	hotKey[2]=uGetValue("FS_Stride_N","W");
	hotKey[3]=uGetValue("FS_Stride_S","X");
	hotKey[4]=uGetValue("FS_Stride_NW","Q");
	hotKey[5]=uGetValue("FS_Stride_NE","E");
	hotKey[6]=uGetValue("FS_Stride_SW","Z");
	hotKey[7]=uGetValue("FS_Stride_SE","C");
	hotKeyRepair=uGetValue("FS_Stride_Repair","R");
	hotKeyRefresh=uGetValue("FS_Stride_Refresh","S");
	hotKeyWorld=uGetValue("FS_Stride_World","F");
	// find a place to attach the interface
	var tn = document.getElementById('settingsTabs');
	var ndiv=document.createElement('div');
	// build the interface up
	var menuHTML=[""] ;
	menuHTML.push("<form><table style=\"color:white;background-color:#CC9933;border-radius:6px/3px;width: 100%\">");
	menuHTML.push("<tr><td colspan=\"9\" style=\"background-color:#663333;border:1px white solid;border-radius:6px/3px;font-weight:bold\"><center>FS Realm Map Refresh Settings</center></td></tr>");
	menuHTML.push("<tr><td colspan=\"9\"><center><span style='font-size:12px'>Set the delay (in milliseconds) between refresh checks.</span></center></td></tr>");
	menuHTML.push("<tr><td style=\"text-align:right;width: 140px\">Map Delay, ms</td><td><input style='width:25px' type=\"text\" id=\"FSST_map_dt\" value=\"" + FSST_map_dt + "\" /></td> ");
	menuHTML.push("<td style=\"text-align:right;width: 140px\">Map Refresh Active</td><td><input style='width:25px' type=\"checkbox\" id=\"FSST_map_act\" value=\"on\" " + (FSST_map_act ? "checked" : "") + "/></td>"); 
	menuHTML.push("<td style=\"text-align:right;width: 140px\">Grid On</td><td><input style='width:25px' type=\"checkbox\" id=\"FSST_map_grid\" value=\"on\" " + (FSST_map_grid ? "checked" : "") + "/></td></tr>"); 
	
	menuHTML.push("<tr><td colspan='9' style='height:4px;'> </td></tr>");
	
	menuHTML.push("<tr><td colspan=\"9\" style=\"background-color:#663333;border:1px white solid;border-radius:6px/3px;font-weight:bold\"><center>FS Scout Tower Refresh Settings</center></td></tr>");
	menuHTML.push("<tr><td colspan=\"9\"><center><span style='font-size:12px'>Set the delay (in seconds) between refreshs.</span></center></td></tr>");
	menuHTML.push("<tr><td style=\"text-align:right;width: 140px\">Tower Delay</td><td><input style='width:25px' type=\"text\" id=\"FSST_tower_dt\" value=\"" + FSST_tower_dt + "\" /></td> ");
	menuHTML.push("<td style=\"text-align:right;width: 140px\">Tower Refresh Active</td><td><input style='width:25px' type=\"checkbox\" id=\"FSST_tower_act\" value=\"on\" " + (FSST_tower_act ? "checked" : "") + "/></td></tr>"); 
	
	menuHTML.push("<tr><td colspan='9' style='height:4px;'> </td></tr>");
	
	menuHTML.push("<tr><td colspan=\"9\" style=\"background-color:#663333;border:1px white solid; border-radius:6px/3px;font-weight:bold\"><center>Titan Stride Settings</center></td></tr>");
	menuHTML.push("<tr><td colspan=\"9\"><center><b>Shortcut Keys: CASE-SENSITIVE keys to move and do other essential hunting actions</b></center></td></tr>");
	menuHTML.push("<tr><td style=\"text-align:right;\">Enabled</td><td><input style='width:25px' type=\"checkbox\" id=\"FS_Stride_On\" value=\"on\" "  + (FS_Stride_On ?"checked":"") + "></td>");
	menuHTML.push("<td style=\"text-align:right;\">Move Warnings</td><td><input style='width:25px' type=\"checkbox\" id=\"FS_MoveWarning\" value=\"on\" "  + (FSST_move_warn ?"checked":"") + "></td>");
	menuHTML.push("<tr><td style=\"text-align:right;width: 121px;\">North West</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_NWshortcut\" value=\""+hotKey[4]+"\" /></td>");
	menuHTML.push("<td style=\"text-align:right;width: 121px;\">North</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_Nshortcut\" value=\""+hotKey[2]+"\" /></td>");
	menuHTML.push("<td style=\"text-align:right;width: 121px;\">North East</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_NEshortcut\" value=\""+hotKey[5]+"\" /></td>");
	menuHTML.push("<td style=\"text-align:right;width: 123px;border-left:1px solid white\">Repair</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_RepairKey\" value=\""+hotKeyRepair+"\" /></td>");  //new
	menuHTML.push("<td style=\"text-align:right;width: 40px\"></td></tr>");
	menuHTML.push("<tr><td style=\"text-align:right;width: 121px;\">West</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_Wshortcut\" value=\""+hotKey[0]+"\" /></td>");
	menuHTML.push("<td style=\"text-align:right;width: 121px;\">Refresh</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_RefreshKey\" value=\""+hotKeyRefresh+"\" /></td>"); // new
//	menuHTML.push("<td colspan=\"2\" style=\"text-align:right;width: 123px\"> </td>");
	menuHTML.push("<td style=\"text-align:right;width: 121px;\">East</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_Eshortcut\" value=\""+hotKey[1]+"\" /></td>");
	menuHTML.push("<td style=\"text-align:right;width: 123px;border-left:1px solid white\">World</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_WorldKey\" value=\""+hotKeyWorld+"\" /></td>");  // new
	menuHTML.push("<td style=\"text-align:right;width: 40px\"></td></tr>");
	menuHTML.push("<tr><td style=\"text-align:right;width: 121px;\">South West</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_SWshortcut\" value=\""+hotKey[6]+"\" /></td>");
	menuHTML.push("<td style=\"text-align:right;width: 121px;\">South</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_Sshortcut\" value=\""+hotKey[3]+"\" /></td>");
	menuHTML.push("<td style=\"text-align:right;width: 121px;\">South East</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_SEshortcut\" value=\""+hotKey[7]+"\" /></td>");
	menuHTML.push("<td style=\"text-align:right;border-left:1px solid white;width: 40px\"></td></tr>");
	menuHTML.push("<tr><td > </td></tr>");
	// menuHTML.push("<tr><td style=\"text-align:right;width: 123px\">Refresh</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_RefreshKey\" value=\""+hotKeyRefresh+"\" /></td>");
	// menuHTML.push("<td style=\"text-align:right;width: 123px\">Repair</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_RepairKey\" value=\""+hotKeyRepair+"\" /></td>");
	// menuHTML.push("<td style=\"text-align:right;width: 123px\">World</td><td><input style='width:25px' type=\"text\" id=\"FS_Stride_WorldKey\" value=\""+hotKeyWorld+"\" /></td></tr>");
	menuHTML.push("<tr><td colspan=\"9\" style=\"background-color:#663333;border:2px white solid;border-radius:6px/3px;font-weight:bold;\"><center><input style='width:50px' class='custombutton' type='button' id='FS_Stride_Save' value='Save'/></center></td></tr>");
	menuHTML.push("</table></form>");

	// display the interface
	ndiv.innerHTML = menuHTML.join("") ;  menuHTML.length=0;
	ndiv.style.width="650px";  ndiv.style.background="#CC9933"; 
	ndiv.style.border="1px black solid"; ndiv.style.color="white"; 
	ndiv.style.borderRadius="6px/3px"; ndiv.style.margin="8px 0px";
	tn.parentNode.insertBefore(ndiv,tn.nextSibling);

	// process the interface when user clicks "Save"
	document.getElementById('FS_Stride_Save').addEventListener('click',function(){
		var mdt = parseInt(document.getElementById('FSST_map_dt').value) ;
			
		if ( NaN != mdt ) {  // make sure the user gave us a number
			FSST_map_dt = ( mdt < 250 ) ? 250 : mdt;  // 5 times a second is fast enough for anyone, will rarely be achieved.
		}
		
		mdt = parseInt(document.getElementById('FSST_tower_dt').value) ;
		if ( NaN != mdt ) {  // make sure the user gave us a number
			FSST_tower_dt = ( mdt < 2 ) ? 2 : mdt;  // every 2 seconds is fast enough for anyone.
		}
		uSetValue("FSST_map_dt", FSST_map_dt);
		uSetValue("FSST_map_act", document.getElementById('FSST_map_act').checked ? 1 : 0 );
		uSetValue("FSST_map_grid", document.getElementById('FSST_map_grid').checked ? 1 : 0 );

		uSetValue("FSST_tower_dt", FSST_tower_dt);
		uSetValue("FSST_tower_act", document.getElementById('FSST_tower_act').checked ? 1 : 0 );
		
		uSetValue("FS_Stride_E",document.getElementById('FS_Stride_Eshortcut').value);
		uSetValue("FS_Stride_N",document.getElementById('FS_Stride_Nshortcut').value);
		uSetValue("FS_Stride_S",document.getElementById('FS_Stride_Sshortcut').value);
		uSetValue("FS_Stride_W",document.getElementById('FS_Stride_Wshortcut').value);
		uSetValue("FS_Stride_NE",document.getElementById('FS_Stride_NEshortcut').value);
		uSetValue("FS_Stride_NW",document.getElementById('FS_Stride_NWshortcut').value);
		uSetValue("FS_Stride_SE",document.getElementById('FS_Stride_SEshortcut').value);
		uSetValue("FS_Stride_SW",document.getElementById('FS_Stride_SWshortcut').value);
		uSetValue("FS_Stride_Repair",document.getElementById('FS_Stride_RepairKey').value);
		uSetValue("FS_Stride_Refresh",document.getElementById('FS_Stride_RefreshKey').value);
		uSetValue("FS_Stride_World",document.getElementById('FS_Stride_WorldKey').value);
		uSetValue("FS_Stride_On",document.getElementById('FS_Stride_On').checked ? 1 : 0 );
		uSetValue("FSST_move_warn",document.getElementById('FS_MoveWarning').checked ? 1 : 0 );
		alert("Titan Stride Settings Saved (refresh Realm map if needed)");
		window.location.reload();
	},false);
}