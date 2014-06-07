// ==UserScript==
// @name          CTS
// @description   FS fast movement and map reloading
// @include       http://www.fallensword.com/index.php?cmd=world*
// @include       http://www.fallensword.com/index.php?cmd=settings*
// @include        http://www.fallensword.com/index.php?cmd=blacksmith*
// @include        http://www.fallensword.com/index.php?cmd=combat*
// @include        http://www.fallensword.com/index.php?cmd=guild&subcmd=scouttower
// @include       http://fallensword.com/index.php?cmd=world*
// @include       http://fallensword.com/index.php?cmd=settings*
// @include        http://fallensword.com/index.php?cmd=blacksmith*
// @include        http://fallensword.com/index.php?cmd=combat*
// @include        http://fallensword.com/index.php?cmd=guild&subcmd=scouttower
// ==/UserScript==
// Javascript learning exercise -- works for Firefox 4 -- May 15 2011 15:47 GMT

//  track current position, use array to compute offsets
//  Rev 0.91 better hotKey system
var hotKey;  // now string, not array.

var hotKeyRepair, hotKeyRefresh, hotKeyWorld, FS_Stride_On;  // utility keys
var LW_X, LW_Y;    // user loc
var DeltX=[-1,1,0,0,-1,+1,-1,+1];    // hotKey dX
var DeltY=[0,0,-1,+1,-1,-1,+1,+1];  // hotKey dY 
var titleColor = [ "#FFFFFF", "#00FFFF", "#FF7F7F" ];
var backColor = [ "#00003c", "#002018", "#330000" ];
var im_regx = /[\w]+\.gif/i;
var onodes, nnodes;
var dashes_on = false;
    
var FSST_map_dt, FSST_map_act, FSST_map_grid;  // cntrl vars for Realm refresh
var otitt = ""; // old title
var ntitt = ""; // new title
var obodyt = ""; // old map filtered
var nbodyt = ""; // new map filtered
var nbody = "";  // new body incl. new map
var animCnt = 0; // to blink title
var mapLTm;  // regularize refresh given irreg. server resp.
var mapXHR;    // handles async map reload requests
var mapWatchdog;    // reloads map if server hangs.

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
    return ; // dont load anything if no localStorage or GM storage support
}

var commands = window.location.search.substr(5).split(/[&=]/);  // HC webpages are all of the form "http//.../index.php?cmd=<command>[&<subcmd>=<whatever>]"
if (commands[0]=="world" || commands[0]=="blacksmith" || commands[0]=="combat" ) { 
    // Enhanced movement active on: world, blacksmith (after repair), combat(if mob dead when you atacked)
    // But must carve out Realm map.  
    if ( "map" != commands[2] ) {  // do enhanced walking
        FS_Stride_On=uGetV("FS_Stride_On",1);
        if ( FS_Stride_On != 0 ) {
            var tn = document.getElementById('centerColumn');
            
            var currentLocation = document.evaluate("descendant::td[contains(@background,'/realm_top_b4.jpg')]",tn, null, 9, null).singleNodeValue;
            var locationRE ;
            if ( currentLocation ) locationRE = /\((\d+), (\d+)\)/.exec(currentLocation.textContent) ;
            else locationRE = /\((\d+), (\d+)\)/.exec(sessionStorage.getItem("TS_loc")) ; // if not on map restore from sessionStore
            if ( locationRE ) {
                LW_X = parseInt(locationRE[1],10);
                LW_Y = parseInt(locationRE[2],10);
                sessionStorage.setItem("TS_loc", locationRE[0]);
            }
            else {
                LW_X = 0; LW_Y = 0 ;  // we will not check the move commands if either of these is zero, but still do utility functions
            }

            hotKey = uGetV("FS_Stride_HKString","ADWXQEZC");  // rev0.91
            hotKeyRepair=uGetV("FS_Stride_Repair","R");
            hotKeyRefresh=uGetV("FS_Stride_Refresh","S");
            hotKeyWorld=uGetV("FS_Stride_World","F");
            
            // listen for keystrokes
            document.addEventListener('keypress',function shortcutKey(e) {
                var fe = document.activeElement;  // where is the focus ?  Don't want to move if typing in a test box.
                FS_Stride_On=uGetV("FS_Stride_On",1);

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
                        if ( 0 <= (i = hotKey.indexOf( character )) && i < 8 ) {  // new rev. 0.91
                            var tx = LW_X + DeltX[i];                // add dX for hotKey to current X
                            var ty = LW_Y + DeltY[i];                // do it for Y
                            if ( tx > 0 && ty > 0 ) {                // do not run off map!
                                LW_X = tx; LW_Y = ty;                // update where player should be
                                sessionStorage.setItem("TS_loc", "("+LW_X+", "+LW_Y+")");
                                window.location.assign( "http://www.fallensword.com/index.php?cmd=world&subcmd=move&x="+tx+"&y="+ty ) ;
                            }
                        }
                    }
                }
            },false);
            // show imps left
            var SSI = document.evaluate("descendant::a[contains(@href, 'skill_id=55&')]",tn, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            var bufflabel = document.evaluate("descendant::B[contains(text(), 'Active Buffs')]",tn, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (( SSI.snapshotLength > 0 ) && ( bufflabel.snapshotLength > 0 )){
                bufflabel.snapshotItem(0).childNodes[0].appendData(" (" + /([0-9][0-9]?) HP/.exec(SSI.snapshotItem(0).innerHTML)[1] + " Imps)");
            }
            else if ( bufflabel.snapshotLength > 0 ){
                bufflabel.snapshotItem(0).childNodes[0].appendData(" (No Imps)");
            }
            // move any warnings to the top banner DIV  
            if ( uGetV("FSST_move_warn", 0) > 0 ) {
                var topb = document.getElementsByClassName("top_banner").item(0); 
                topb.style="overflow-y:auto;";
                var cencol = document.getElementById("centerColumn");
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
    else { // do the map refresh
        FSST_map_act=uGetV("FSST_map_act", 1);
        if ( FSST_map_act == 1 ) { 
            FSST_map_dt=uGetV("FSST_map_dt", 500);
            // XMLHttpResponse readystatuschange handler for Realm refresh 
            mapXHR = new XMLHttpRequest() ;
            mapXHR.open("Get", window.location, true);
            // handler
            mapXHR.onreadystatechange = function mapRSCH( aEvt ) {
                if (mapXHR.readyState == 4 ) {
                    // reset watchdog then start it again.
                    window.clearTimeout( mapWatchdog ) ;
                    mapWatchdog = window.setTimeout( function () { document.location.reload(); }, FSST_map_dt+3000 ); // 3sec after expected
                    if (mapXHR.status == 200 ) {
                        var tnow = Date.now();
                        nbody = mapXHR.responseText.split(/<\/?body[^>]*>/ig)[1];    // get response body    
                        ntitt = mapXHR.responseText.split(/<\/?b>/ig)[1];            // bold text = map title
                        animCnt = (animCnt==1) ? 0 : 1;        // rotate color of title: working
                        FSST_map_grid=uGetV("FSST_map_grid", 1);
                        if (ntitt == otitt) {                // in same map
                            FFSST_map_dt=uGetV("FSST_map_dt", 500);
                            FSST_map_act=uGetV("FSST_map_act", 1);
                            // new code start
                            if ( FSST_map_grid && false==dashes_on ) {
                                onodes = document.evaluate( "child::table", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ) ;
                                if (onodes.snapshotLength > 0 ){ 
                                    onodes.snapshotItem(0).style.borderCollapse = "collapse";
                                }
                            }
                            // adapted (?) to bgrnd changing in dark maps.
                            var tabb = document.evaluate( "descendant::tbody", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
                            if ( tabb.snapshotLength > 0 ) {
                                tabb = tabb.snapshotItem(0) ;  // want first table body
                                onodes = document.evaluate( "child::*/child::td", tabb, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );   // table entries in old
                                nnodes = nbody.match(/<td([^>]+?dark\.gif[^>]+?>)|(<td[^>]+?background[^>]+>.+?<table.+?<\/table.+?)<\/td>/igm);  // table entries in new
                                var onlength = onodes.snapshotLength ;
                                var obim; var nbim; var cfound;  var nnmatch ;
                                for ( var i = 0; i < onlength; i++ ) {
                                    if ( FSST_map_grid && false==dashes_on ) {
                                        onodes.snapshotItem(i).style.border = 'dotted lightgray 1pt';
                                        onodes.snapshotItem(i).style.backgroundClip = 'content-box';
                                    }
                                    cfound = false ;
                                    // player is only image on map, so if an img is found in one but not other ...
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
                                    // if player entered or left square, or a titan entered, left, or changed, refresh square.
                                    // also refresh bgrnd if it changes (e.g. dark realms)
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
                                        animCnt = 2;  // signal change
                                    }
                                }
                                dashes_on = true;
                            }
                            if ( FSST_map_act ) {
                                mapXHR.open("Get", window.location, true);
                                mapXHR.onreadystatechange = mapRSCH ;
                                tttm = (2*FSST_map_dt) - (tnow-mapLTm); 
                                mapLTm = tnow;
                                setTimeout( function() { mapXHR.send(); }, (tttm < 20 ) ? 20 : tttm );
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
                        mapXHR.open("Get", window.location, true);
                        mapXHR.onreadystatechange = mapRSCH ;
                        setTimeout( function() { mapXHR.send(); }, 50);
                        mapLTm = Date.now();
                    }
                }
            } ;
            // handler end
            otitt = document.body.innerHTML.split(/<\/?b>/ig)[1];
            mapLTm = Date.now();
            window.setTimeout(function() {     mapXHR.send(); }, FSST_map_dt);
        }
    }
}
else if ( commands[0]=="guild" &&  "scouttower" == commands[2] ) {
    if ( 1 == uGetV("FSST_tower_act", 1) ) {
        window.setTimeout( function () { document.location.reload(); }, 1000 * uGetV("FSST_tower_dt", 6)) ;
    }
}
else if (commands[0]=="settings")
{  // this appends the setting below the new tabbed interface -- usually.  TBD is to make it a tab.
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
    var tn = document.getElementById('settingsTabs');
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
    
    mH.push("<tr><td colspan='9' "+TSUI_tdhd+"'><center>Titan Stride Settings</center></td></tr>");
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


    // display the interface
    ndiv.innerHTML = mH.join("") ;  mH.length=0;
    ndiv.style.width="650px";  ndiv.style.background="#CC9933"; 
    ndiv.style.border="1px black solid"; ndiv.style.color="white"; 
    ndiv.style.borderRadius="6px/3px"; ndiv.style.margin="8px 0px";
    tn.parentNode.insertBefore(ndiv,tn.nextSibling);

    // process the interface when user clicks "Save"
    document.getElementById('FS_Stride_Save').addEventListener('click',function(){
        var mdt = parseInt(document.getElementById('FSST_map_dt').value) ;
            
        if ( NaN != mdt ) {  // make sure the user gave us a number
            FSST_map_dt = ( mdt < 200 ) ? 200 : mdt;  // 5 times a second is fast enough for anyone, will rarely be achieved.
        }
        
        mdt = parseInt(document.getElementById('FSST_tower_dt').value) ;
        if ( NaN != mdt ) {  // make sure the user gave us a number
            FSST_tower_dt = ( mdt < 2 ) ? 2 : mdt;  // every 2 seconds is fast enough for anyone.
        }
        uSetV("FSST_map_dt", FSST_map_dt);
        uSetV("FSST_map_act", document.getElementById('FSST_map_act').checked ? 1 : 0 );
        uSetV("FSST_map_grid", document.getElementById('FSST_map_grid').checked ? 1 : 0 );
        uSetV("FSST_map_blinkback", document.getElementById('FSST_map_blinkback').checked ? 1 : 0 );
        
        uSetV("FSST_tower_dt", FSST_tower_dt);
        uSetV("FSST_tower_act", document.getElementById('FSST_tower_act').checked ? 1 : 0 );
        
        // Start: Rev 0.91 more efficient hotKey system
        // hotKey = uGetV("FS_Stride_HKString","ADWXQEZC"); // this shows the order
        hotKey = document.getElementById('FS_Stride_Wshortcut').value + document.getElementById('FS_Stride_Eshortcut').value +
            document.getElementById('FS_Stride_Nshortcut').value + document.getElementById('FS_Stride_Sshortcut').value +
            document.getElementById('FS_Stride_NWshortcut').value + document.getElementById('FS_Stride_NEshortcut').value +
            document.getElementById('FS_Stride_SWshortcut').value + document.getElementById('FS_Stride_SEshortcut').value ;
        uSetV("FS_Stride_HKString", hotKey) ;        
        // End: Rev 0.91 more efficient hotKey system
        uSetV("FS_Stride_Repair",document.getElementById('FS_Stride_RepairKey').value);
        uSetV("FS_Stride_Refresh",document.getElementById('FS_Stride_RefreshKey').value);
        uSetV("FS_Stride_World",document.getElementById('FS_Stride_WorldKey').value);
        uSetV("FS_Stride_On",document.getElementById('FS_Stride_On').checked ? 1 : 0 );
        uSetV("FSST_move_warn",document.getElementById('FS_MoveWarning').checked ? 1 : 0 );
        alert("Titan Stride Settings Saved (refresh Realm map if needed)");
        window.location.reload();
 },false);
    // right column junk & other setting to optimize for Titan hunting, ui_prefrences hide:
    // 14 - Curr. Poll Rslts      // 3 -  Allies List
    // 10 - LHS Questions          // 9 - recruiting
    // 8 - Help                   // 7 - Support Us
    // 3 - Kill / Chest  Logs    // 2 - Game Stats
    // 1 - Guild Info Chat        // 0 - Guild Info Members
    // hide_fsbox - FSBox
    document.getElementById('FS_Stride_Noises_Off').addEventListener('click',function(){
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
        document.getElementById('settingsTabs-2').getElementsByTagName("form")[0].submit();
    },false);
}