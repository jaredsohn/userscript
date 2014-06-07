// ==UserScript==
// @name       View all cams on reallifecam.com
// @namespace  None
// @version    1.6.2
// @description  View all cams without paying
// @match      http://reallifecam.com/
// @copyright  2012+, None
// @downloadURL    https://userscripts.org/scripts/source/152651.user.js
// @updateURL      https://userscripts.org/scripts/source/152651.meta.js
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var clipsDiv    = $(".clips.low");
var offset      = 0;
var newHTML     = '';

// Overriding auto-refresh
var scriptCode = new Array();
scriptCode.push('function reload_page(){' );
scriptCode.push('  return false;'         );
scriptCode.push('}'                       );
var script = document.createElement('script');
script.innerHTML = scriptCode.join('\n');
scriptCode.length = 0;
document.getElementsByTagName('head')[0].appendChild(script);

// function generateCamera ( offset, name )
function generateCamera ( offset, rooms, room_no, category ) {

    for ( var i = offset; i < offset + rooms; i++ ){
        var room = "[" + room_no + "] ";
        var cam = 'cam' + i;
        if      ( i == offset )
            room += "Living Room";
        else if ( i == offset + 1 )
            room += "Kitchen";
        else if ( 
            ( i == offset + 2 && ( room_no == 1 || room_no == 3 || room_no == 4      ) )
        )
            room += "Hallway";
        else if ( 
            ( i == offset + 3 && ( room_no == 1 || room_no == 3                     ) ) ||
            ( i == offset + 4 && ( room_no == 2 || room_no == 5                     ) ) ||
            ( i == offset + 5 && ( room_no == 4 || room_no == 5                     ) )
        )
            room += "Bedroom";
        else if ( 
            ( i == offset + 4 && ( room_no == 1 || room_no == 3 || room_no == 4     ) ) || 
            ( i == offset + 3 && ( room_no == 2 || room_no == 4 || room_no == 5     ) ) ||
            ( i == offset + 2 && ( room_no == 2                                     ) )
        )
            room += "Bathroom";
        else if ( 
            ( i == offset + 2 && ( room_no == 5 ) )
        )
            room += "Sex Dungeon";
        // Overrides, as private rooms are 'encrypted'
        if      ( i == offset + 3 && room_no == 1 )
            cam = "cvsdfs" ;
        else if ( i == offset + 4 && room_no == 1 )
            cam = "3hvngd";
        else if ( i == offset + 3 && room_no == 2 )
            cam = "dsfnrn";
        else if ( i == offset + 4 && room_no == 2 )
            cam = "5hjdfn";
        else if ( i == offset + 3 && room_no == 3 )
            cam = "erda3j";
        else if ( i == offset + 4 && room_no == 3 )
            cam = "dhv3j3";
        else if ( i == offset + 3 && room_no == 4 )
            cam = "nfgnbf";
        else if ( i == offset + 4 && room_no == 4 )
            cam = "jnsdfn";
        else if ( i == offset + 5 && room_no == 4 )
            cam = "njn43l";
        else if ( i == offset + 3 && room_no == 5 )
            cam = "asdfn3";
        else if ( i == offset + 4 && room_no == 5 )
            cam = "ren3js";
        else if ( i == offset + 5 && room_no == 5 )
            cam = "sadfne";

        newHTML = newHTML + '<div class="galki-vpravo menu' + category +  '" onclick="changeclass(\'0' + category + '_' + i + '\');return false;" style="display: block; "> <a href="' + cam + '.stream" id="0' + category + '_' + i + '" class=""> ' + room +' </a> </div>'
    }
}

// Cam 1 "Lora & Max"
generateCamera( 6 , 5, 1, 2, "Lora & Max" );
// Cam 2 "Maria & John"
generateCamera( 11, 5, 2, 3, "Maria & John" );
// Cam 3 "Anila & Anton"
generateCamera( 1 , 5, 3, 1, "Anila & Anton" );
// Cam 4 "Kristina & Evgeni"
generateCamera( 16, 6, 4, 4, "Kristina & Evgeni" );
// Cam 5 "Nastya & Zheka"
generateCamera( 22, 6, 5, 5, "Nastya & Zheka" );

clipsDiv.html(newHTML);