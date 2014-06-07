    // ==UserScript==
    // @name       View all cams on reallifecam.com
    // @namespace  ytyytytytyty
    // @version    1
    // @description  View all cams without paying
    // @match      http://reallifecam.com/
    // @copyright  2012+, None
    // @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
    // ==/UserScript==
    var clipsDiv = $(".clips.low");
    var i = 1;
    var newHTML = '';
    var room_name = "";
    while(i <= 30)
    {
        if(1 <= i && i <= 5) {
            switch( i )
            {
                default: room_name = "Den"; break;
                case 2: room_name = "Kitchen"; break;
                case 3: room_name = "Hall"; break;
                case 4: room_name = "Bedroom"; break;
                case 5: room_name = "Bathroom"; break;
                   
            }
            newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="cam'+i+'.stream" id="01_'+i+'" class=""> AliAnt - '+room_name+'</a></div>';
        }
        if(6 <= i && i <= 10) {
            switch( i )
            {
                default: room_name = "Den"; break;
                case 7: room_name = "Kitchen"; break;
                case 8: room_name = "Hall"; break;
                case 9: room_name = "Bedroom"; break;
                case 10: room_name = "Bathroom"; break;
            }
            newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="cam'+i+'.stream" id="01_'+i+'" class=""> LorMax - '+room_name+'</a></div>';
        }
        if(11 <= i && i <= 15) {
            switch( i )
            {
                default: room_name = "Den"; break;
                case 12: room_name = "Kitchen"; break;
                case 13:
                case 14: room_name = "Bathroom (" + (i-12).toString() + ")"; break;
                case 15: room_name = "Bedroom"; break;
            }
            newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="cam'+i+'.stream" id="01_'+i+'" class=""> MarJon - '+room_name+'</a></div>';
        }
        if(16 <= i && i <= 21) {
            switch( i )
            {
                default: room_name = "Den"; break;
                case 17: room_name = "Kitchen"; break;
                case 18: room_name = "Hall"; break;
                case 19:
                case 20: room_name = "Bathroom (" + (i-18).toString( ) +")"; break;
                case 21: room_name = "Bedroom"; break;
            }
            newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="cam'+i+'.stream" id="01_'+i+'" class=""> KriGeni - '+room_name+'</a></div>';
        }
        if(22 <= i && i <= 27) {
            switch( i )
            {
                case 22: room_name = "Den"; break;
                case 23: room_name = "Kitchen"; break;
                case 24: room_name = "Dance"; break;
                case 25: room_name = "Bathroom"; break;
                default: room_name = "Bedroom (" + (i-25).toString( ) + ")"; break;
            }
            newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="cam'+i+'.stream" id="01_'+i+'" class=""> Nasty - '+room_name+'</a></div>';
        }
        i++;
        room_name = "";
    }
    clipsDiv.html(newHTML);
