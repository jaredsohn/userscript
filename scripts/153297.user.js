// ==UserScript==
// @name       View all cams on reallifecam.com
// @namespace  None
// @version    1
// @description  View all cams without paying
// @match      http://*.reallifecam.com/
// @copyright  2012+, None
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var clipsDiv = $(".clips.low");
var i = 1;
var newHTML = '';
while(i <= 15) {
    var room = '';
    var icon = '';
    var stream = '';
    
    stream = 'cam'+i+'.stream';
    if(i == 9) {stream = 'cvsdfs.stream';} //APT. 1 BEDROOM
    if(i == 10) {stream = '3hvngd.stream';}//APT. 1 BEDROOM
    
    if(i == 14) {stream = 'dsfnrn.stream';}//APT. 2 BATHROOM
    if(i == 15) {stream = '5hjdfn.stream';}//APT. 2 BEDROOM
    
    if(i == 9 || i == 10 || i == 14 || i == 15) {
        icon = ' <img src="http://reallifecam.com/images/zamok_opn.png" />';
    }
    if(i == 9 || i == 15) {
        icon = icon + '<img src="http://reallifecam.com/images/voce-on.png" />';
    }
    if(i == 6 || i == 11) {
        room = "Living Room";
    }
    if(i == 7 || i == 12) {
        room = "Kitchen";
    }
    if(i == 8) {
        room = "Hall";
    }
    if(i == 9 || i == 15) {
        room = "Bedroom";
    }
    if(i == 10) {
        room = "Bathroom";
    }
    if(i == 13) {
        room = "Bathroom (1)";
    }
    if(i == 14) {
        room = "Bathroom (2)";
    }
    if(6 <= i && i <= 10) {
        newHTML = newHTML + '<div class="galki-vpravo menu2" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+stream+'" id="01_'+i+'" class=""> #1 - '+room+icon+'</a></div>';
    }
    if(11 <= i && i <= 15) {
        newHTML = newHTML + '<div class="galki-vpravo menu2" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+stream+'" id="01_'+i+'" class=""> #2 - '+room+icon+'</a></div>';
    }
    i++;
}
i = 0;
while(i <= 27) {
    var room = '';
    var icon = '';
    var stream = '';
    
    stream = 'cam'+i+'.stream';
    if(i == 4) {stream = 'erda3j.stream';}//APT. 3 BEDROOM
    if(i == 5) {stream = 'dhv3j3.stream';}//APT. 3 BATHROOM
    
    if(i == 19) {stream = 'nfgnbf.stream';}//APT. 4 BATHROOM (1)
    if(i == 20) {stream = 'jnsdfn.stream';}//APT. 4 BATHROOM (2)
    if(i == 21) {stream = 'njn43l.stream';}//APT. 4 BEDROOM
    
    if(i == 25) {stream = 'asdfn3.stream';}//APT. 5 BATHROOM
    if(i == 26) {stream = 'ren3js.stream';}//APT. 5 BEDROOM
    if(i == 27) {stream = 'sadfne.stream';}//APT. 5 BEDROOM
    
    if(i == 4 || i == 5 || i == 19 || i == 20 || i == 21 || i == 25 || i == 26 || i == 27) {
        icon = ' <img src="http://reallifecam.com/images/zamok_opn.png" />';
    }
    if(i == 4 || i == 21 || i == 22 || i == 24 || i == 26 || i == 27) {
        icon = icon + '<img src="http://reallifecam.com/images/voce-on.png" />';
    }
    if(i == 1 || i == 6 || i == 11 || i == 16 || i == 22) {
        room = "Living Room";
    }
    if(i == 2 || i == 7 || i == 12 || i == 17 || i == 23) {
        room = "Kitchen";
    }
    if(i == 3 || i == 8 || i == 18) {
        room = "Hall";
    }
    if(i == 4 || i == 9 || i == 15 || i == 21 || i == 26 || i == 27) {
        room = "Bedroom";
    }
    if(i == 5 || i == 10 || i == 25) {
        room = "Bathroom";
    }
    if(i == 13 || i == 19) {
        room = "Bathroom (1)";
    }
    if(i == 14 || i == 20) {
        room = "Bathroom (2)";
    }
    if(i == 24) {
        room = "Dance room";
    }
    if(1 <= i && i <= 5) {
        newHTML = newHTML + '<div class="galki-vpravo menu2" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+stream+'" id="01_'+i+'" class=""> #3 - '+room+icon+'</a></div>';
    }
    if(16 <= i && i <= 21) {
        newHTML = newHTML + '<div class="galki-vpravo menu2" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+stream+'" id="01_'+i+'" class=""> #4 - '+room+icon+'</a></div>';
    }
    if(22 <= i && i <= 27) {
        newHTML = newHTML + '<div class="galki-vpravo menu2" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+stream+'" id="01_'+i+'" class=""> #5 - '+room+icon+'</a></div>';
    }
    i++;
}
clipsDiv.html(newHTML);