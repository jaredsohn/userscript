// http://userscripts.org/scripts/show/153215
// Now on Userscript

// ==UserScript==
// @name            RealLifeCam.com
// @namespace       Uforzyx
// @version         1.8.4g
// @description     View all cams
// @match           http://reallifecam.com/
// @copyright       2012+
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @downloadURL     https://userscripts.org/scripts/source/153215.user.js
// @updateURL       https://userscripts.org/scripts/source/153215.meta.js
// ==/UserScript==

// USER ASSIGNED VARIABLES (Safe to change. Cosmetic purposes)
var                                             __TITLE = "The Sims 5, now with more menstruation!";
if ( Math.floor(Math.random() * 10) % 2 == 0 )  __TITLE = "I hope there's a fire.";

var __TIMER = ">9000 eons";
var __EXITM = "Escape the Sex Dungeon";
var __URL   = 'http://i.imgur.com/QSyKJ.jpg?9310';

// Script variables. Changing them will affect output. //

// == OVERRIDES == //
// Removes the script that checks for any changes to the HTML (Unknown on what it actually does)
var scriptCode = new Array();
var script = document.createElement('script');

// `for` loop to remove the cookies generated when clicking a locked camera.
for ( var x = 0; x < 5; x++ ) for ( var y = 4; y <= 6; y++ ) scriptCode.push('$( ".paid0' + x + '_' + y + '" ).click(function() {}');

// Removes the `write_element` function from the `/script_5r.js`
scriptCode.push('function write_element (key, data){ return ("" + key + ": " + data); }');

// Removes the auto-refresh at the top of the page.
scriptCode.push('function reload_page(){ return false; }' );

// Removes an event handler. Unknown purposes.
scriptCode.push('function eventHandler(evt) { return evt }');

// Removes the function that creates the "b&" popup.
//scriptCode.push('function upd_send(){ $.get("ajax_upd.php", function(data){ if (data == "0"){ $("#ban").dialog("open"); $(".ui-dialog").remove(); $(".closediv").remove(); } }); }');
document.getElementsByClassName("ui-icon")[0].setAttribute("onClick", '$(".ui-dialog").remove(); $(".closediv").remove();');        // Attaches an 'onClick' attribute, to become an hero and remove all the other dialogue boxes.

script.innerHTML = scriptCode.join('\n');
scriptCode.length = 0;
document.getElementsByTagName('head')[0].appendChild(script);

// == Functions == //
// generateCamera ( int offset, int rooms, int room_no, int category ) [ Generates new links to change camera. ]
var generatedHTML = "";
function generateCamera ( offset, rooms, room_no, category ) {
    for ( var i = offset; i < offset + rooms; i++ ){
        var room = "";
        var cam = 'cam' + i;
        if      ( i == offset )         room += "Living Room";
        else if ( i == offset + 1 )     room += "Kitchen";
        else if ( 
            ( i == offset + 2 && ( room_no == 1 || room_no == 3 || room_no == 4      ) )
        )                               room += "Hallway";
        else if ( 
            ( i == offset + 3 && ( room_no == 1 || room_no == 3                     ) ) ||
            ( i == offset + 6 && ( room_no == 3                                     ) ) ||
            ( i == offset + 4 && ( room_no == 2 || room_no == 5                     ) ) ||
            ( i == offset + 5 && ( room_no == 4 || room_no == 5                     ) )
        )                               room += "Bedroom";
        else if ( 
            ( i == offset + 4 && ( room_no == 1 || room_no == 3 || room_no == 4     ) ) || 
            ( i == offset + 5 && ( room_no == 3                                     ) ) || 
            ( i == offset + 3 && ( room_no == 2 || room_no == 4 || room_no == 5     ) ) ||
            ( i == offset + 2 && ( room_no == 2                                     ) )
        )                               room += "Bathroom";
        else if ( 
            ( i == offset + 2 && ( room_no == 5 ) )
        )                               room += "Sex Dungeon";
        // Overrides, as private rooms are 'encrypted'
        if      ( i == offset + 3 && room_no == 1 )     cam = "cvsdfs";
        else if ( i == offset + 4 && room_no == 1 )     cam = "3hvngd";
        else if ( i == offset + 3 && room_no == 2 )     cam = "dsfnrn";
        else if ( i == offset + 4 && room_no == 2 )     cam = "5hjdfn";
        else if ( i == offset + 3 && room_no == 3 )     cam = "erda3j";
        else if ( i == offset + 4 && room_no == 3 )     cam = "dhv3j3";
        else if ( i == offset + 5 && room_no == 3 )     cam = "4nadmd";
        else if ( i == offset + 6 && room_no == 3 )     cam = "hwvhs4";
        else if ( i == offset + 3 && room_no == 4 )     cam = "nfgnbf";
        else if ( i == offset + 4 && room_no == 4 )     cam = "jnsdfn";
        else if ( i == offset + 5 && room_no == 4 )     cam = "njn43l";
        else if ( i == offset + 3 && room_no == 5 )     cam = "asdfn3";
        else if ( i == offset + 4 && room_no == 5 )     cam = "ren3js";
        else if ( i == offset + 5 && room_no == 5 )     cam = "sadfne";
        if ( document.getElementById("descr_cam0" + category + "_" + i) )
            document.getElementById("descr_cam0" + category + "_" + i).innerHTML = "<p>" + room + "</p>";
        room = "" + room_no + ". " + room;

        generatedHTML += '<div class="galki-vpravo menu' + category +  '" onclick="changeclass(\'0' + category + '_' + i + '\');return false;" style="display: block; "> <a href="' + cam + '.stream" id="0' + category + '_' + i + '" class=""> ' + room +' </a> </div>'
    }
}

// changeRtmpAddress ( int edge ) [ Changes the rtmp:// address to .edge{edge}. ]
function changeRtmpAddress ( edge ) {
    document.getElementsByClassName('webcam_online')[0].innerHTML = '<div id="player" style="display:block;width:479px;height:362px;"><object width="100%" height="100%" id="player_api" name="player_api" data="http://reallifecam.com/flowplayer.commercial-3.2.7.swf" type="application/x-shockwave-flash"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="quality" value="high"><param name="bgcolor" value="#000000"><param name="wmode" value="opaque"><param name="flashvars" value="config={&quot;key&quot;:&quot;#$cad8307b5ecf1baf1d6&quot;,&quot;canvas&quot;:{&quot;backgroundGradient&quot;:&quot;none&quot;},&quot;clip&quot;:{&quot;provider&quot;:&quot;rtmpe&quot;,&quot;connectionProvider&quot;:&quot;secure&quot;,&quot;live&quot;:true,&quot;baseUrl&quot;:&quot;rtmpe://edge' + edge + '.reallifecam.com/liveedge&quot;},&quot;playlist&quot;:[{&quot;title&quot;:&quot;MP4 file&quot;,&quot;url&quot;:&quot;cam6.stream&quot;,&quot;provider&quot;:&quot;rtmpe&quot;,&quot;connectionProvider&quot;:&quot;secure&quot;,&quot;live&quot;:true,&quot;baseUrl&quot;:&quot;rtmpe://edge' + edge + '.reallifecam.com/liveedge&quot;}],&quot;plugins&quot;:{&quot;rtmpe&quot;:{&quot;url&quot;:&quot;http://reallifecam.com/flowplayer.rtmp-3.2.3.swf&quot;,&quot;netConnectionUrl&quot;:&quot;rtmpe://edge' + edge + '.reallifecam.com/liveedge&quot;},&quot;controls&quot;:{&quot;controls&quot;:null,&quot;time&quot;:false,&quot;scrubber&quot;:false},&quot;secure&quot;:{&quot;url&quot;:&quot;http://reallifecam.com/flowplayer.securestreaming-3.2.3.swf&quot;,&quot;token&quot;:&quot;%23Loi8iJu&quot;}},&quot;playerId&quot;:&quot;player&quot;}"></object></div> <script type="text/javascript"> $(function() { $f("player", {src: "http://reallifecam.com/flowplayer.commercial-3.2.7.swf", wmode: "opaque"}, { onFullscreen: function () { this.getClip().update({scaling: "fit"}); }, onFullscreenExit: function () { this.getClip().update({scaling: "scale"}); }, key: "#$cad8307b5ecf1baf1d6", canvas: { backgroundGradient: "none" }, clip: { onBegin: function () { this.getPlugin("play").show(); }, onBeforeFinish: function () { this.getPlugin("play").hide(); },provider: "rtmpe", connectionProvider: "secure", live: true, baseUrl: "rtmpe://edge' + edge + '.reallifecam.com/liveedge" }, playlist: [ {title: "MP4 file", url: "cam6.stream"} ], plugins: { rtmpe: { url: "http://reallifecam.com/flowplayer.rtmp-3.2.3.swf", netConnectionUrl: "rtmpe://edge' + edge + '.reallifecam.com/liveedge" }, controls: { controls: null, time: false, scrubber: false }, secure: {  url: "http://reallifecam.com/flowplayer.securestreaming-3.2.3.swf", token: escape("#Loi8iJu") } } }).playlist("div.clips").playlist2("div.clips2");     }); </script>';
}

// changeBanner ( string url ) [ Changes banner ]
function changeBanner ( url ) {
    __URL = url;
    document.getElementById('logotime').innerHTML = '<a href="/" title="main"><img src="' + __URL + '" alt="' + __TITLE + '" width="486" height="34" border="0" align="left"></a> </a> <div class="toptime">Time remaining: <span>' + __TIMER  + '</span> <a href="/logout">[' + __EXITM + ']</a></div>';
}

// changeBanner ( string url ) [ Changes banner ]
function changeBannerNoStretch ( url ) {
    __URL = url;
    document.getElementById('logotime').innerHTML = '<a href="/" title="main"><img src="' + __URL + '" alt="' + __TITLE + '" border="0" align="left"></a> </a> <div class="toptime">Time remaining: <span>' + __TIMER  + '</span> <a href="/logout">[' + __EXITM + ']</a></div>';
}

// changeTime ( string time, String logout ) [Changes logout and time messages at the top. Simulates being a richfag and having membershit. ]
function changeTime ( time, logout ) {
    __TIMER = time;
    __EXITM = logout;
    document.getElementsByClassName('toptime')[0].innerHTML = '</a> <div class="toptime">Time remaining: <span>' + __TIMER  + '</span> <a href="/logout">[' + __EXITM + ']</a></div>';
}

// changeHeadline ( string title ) [ Changes the headline at the way top to whatever you want. ]
function changeHeadline ( title ) {
    __TITLE = title;
    document.getElementsByClassName('stroka')[0].innerHTML = '<div id="langv"> <a href="http://reallifecam.com/" title="English"><img src="http://reallifecam.com/design/flag_eng.gif" alt="English" width="18" height="12" border="0"></a> <a href="http://de.reallifecam.com/" title="Deutsch"><img src="http://reallifecam.com/design/flag_germ.gif" alt="Deutsch" width="18" height="12" border="0"></a> <a href="http://it.reallifecam.com/" title="Italiano"><img src="http://reallifecam.com/design/flag_italy.gif" alt="Italiano" width="18" height="12" border="0"></a> </div>' + __TITLE;
}

// changeSidebarName ( int apartment, string name ) [ Changes a name of the given apartment to the given string. Used to change "masked" names to their actual, previous names before "it" happened ]
function changeSidebarName ( apartment, name ) {
    document.getElementsByClassName("main_menu_desc")[apartment - 1].innerHTML = name;
}

// changePopupMessage ( string message ) [ Changes the message displayed in that fucking popup. ]
function changePopupMessage ( message ) {
    for ( var i = 0; i < document.getElementsByClassName("closetext").length; i++ )
        document.getElementsByClassName("closetext")[i].innerHTML = '<div align="center">' + message + '</div>';
}

// removePopupMessages ( ) [ Removes ALL messages. This renders `changePopupMessage` useless. ]
function removePopupMessages (  ) {
   $(".ui-dialog").remove()
}

// ==== Starting overrides // ==== //
// == Aesthetical changes. Can be commented out == //
changeTime( __TIMER, __EXITM );
changeHeadline( __TITLE );
changeBanner( __URL );
//changeRtmpAddress( 1 );                               // Uncomment this to use a different '.edge#' URL
changePopupMessage( '<a href="http://imgur.com/WnISB">You must check your privileges before continuing, cis scum!</a>' );
if ( Math.floor(Math.random() * 10) % 2 == 0 )  changePopupMessage( "DISREGARD THAT I SUCK COCKS!" );

//removePopupMessages();                                // Uncommenting this will have cams not load. Just click the "X" of the popup, and it should remove all popups.
// == KEEP THESE UNLESS YOU JUST WANT THE AESTHETICAL CHANGES == //
generateCamera( 6 , 5, 1, 2, "Lora and Max" );
generateCamera( 11, 5, 2, 3, "Maria and John" );
generateCamera( 1 , 7, 3, 1, "Alina and Anton" );
generateCamera( 16, 6, 4, 4, "Kristina and Evgeni" );
generateCamera( 22, 6, 5, 5, "Nastya and Zheka" );

changeSidebarName(1, "Lora and Max");
changeSidebarName(2, "Maria and John");
changeSidebarName(3, "Alina and Anton");
changeSidebarName(4, "Kristina and Evgeni");
changeSidebarName(5, "Nastya and Zheka");

document.getElementsByClassName('clips low')[0].innerHTML = generatedHTML;