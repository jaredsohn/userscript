// ==UserScript==
// @name       All Cams+
// @namespace  None
// @version    1
// @description  View all cams without paying
// @match      http://reallifecam.com/
// @copyright  2012+, None
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var clipsDiv = $(".left_column");
var clipsDiv2 = $(".right_column");
var i = 1;
var camName = "";
var newHTML = '<div class="clips">';
var newHTML2 = '<div class="clips">';
var room_name = '';
while(i <= 30) {
        if(1 <= i && i <= 5) {
        switch( i )
        {
            default: room_name = 'Den'; camName = "cam6"; break;
            case 2: room_name = 'Kitchen'; camName = "cam7"; break;
            case 3: room_name = 'Hall'; camName = "cam8"; break;
            case 4: room_name = 'Bedroom <img src="http://reallifecam.com/images/voce-on.png" />'; camName = "cvsdfs"; break;
            case 5: room_name = 'Bathroom <img src="http://reallifecam.com/images/Plan_2sm.gif" />'; camName = "3hvngd"; break;
        }
        newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+camName+'.stream" id="01_'+i+'" class=""> <span style="color:Red">Ap.1 - Max & Lora</span> - '+room_name+'</a></div>';
    }
        if(6 <= i && i <= 10) {
        switch( i )
        {
            default: room_name = 'Den'; camName = "cam11"; break;
            case 7: room_name = 'Kitchen'; camName = "cam12"; break;
            case 8: room_name = 'Bathroom¹'; camName = "cam13"; break;
            case 9: room_name = 'Bathroom²'; camName = "dsfnrn"; break;
            case 10: room_name = 'Bedroom <img src="http://reallifecam.com/images/voce-on.png" /> <img src="http://reallifecam.com/images/Plan_3sm.gif" />'; camName = "5hjdfn"; break;
        }
        newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+camName+'.stream" id="01_'+i+'" class=""> <span style="color:yellow">Ap.2 - Maria & John</span> - '+room_name+'</a></div>';
    }
    if(11 <= i && i <= 15) {
        switch( i )
        {
            default: room_name = 'Den'; camName = "cam1"; break;
            case 12: room_name = 'Kitchen'; camName = "cam2"; break;
            case 13: room_name = 'Hall'; camName = "cam3"; break;
            case 14: room_name = 'Bedroom <img src="http://reallifecam.com/images/voce-on.png" />'; camName = "erda3j"; break;
            case 15: room_name = 'Bathroom <img src="http://reallifecam.com/images/Plan_1sm.gif" />'; camName = "dhv3j3"; break;
               
        }
        newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+camName+'.stream" id="01_'+i+'" class=""> <span style="color:Lime">Ap.3 - Alina & Alphafag Anton</span> - '+room_name+'</a></div>';
    }
    if(16 <= i && i <= 21) {
        switch( i )
        {
            default: room_name = 'Den'; camName = "cam16"; break;
            case 17: room_name = 'Kitchen'; camName = "cam17"; break;
            case 18: room_name = 'Hall'; camName = "cam18"; break;
            case 19: room_name = 'Bathroom¹'; camName = "nfgnbf"; break;
            case 20: room_name = 'Bathroom²'; camName = "jnsdfn"; break;
            case 21: room_name = 'Bedroom <img src="http://reallifecam.com/images/voce-on.png" /> <img src="http://reallifecam.com/images/Plan_4sm.gif" />'; camName = "njn43l"; break;
        }
        newHTML2 = newHTML2 + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+camName+'.stream" id="01_'+i+'" class=""> <span style="color:blue">Ap.4 - Katrina & Evgeni</span>-'+room_name+'</a></div>';
    }
    if(22 <= i && i <= 27) {
        switch( i )
        {
            case 22: room_name = 'Den <img src="http://reallifecam.com/images/voce-on.png" />'; camName = "cam22"; break;
            case 23: room_name = 'Kitchen'; camName = "cam23"; break;
            case 24: room_name = 'Sex Dungeon <img src="http://reallifecam.com/images/voce-on.png" />'; camName = "cam24"; break;
            case 25: room_name = 'Bathroom'; camName = "asdfn3"; break;
            case 26: room_name = 'Bedroom¹ <img src="http://reallifecam.com/images/voce-on.png" />'; camName = "ren3js"; break;
            default: room_name = 'Bedroom² <img src="http://reallifecam.com/images/voce-on.png" /> <img src="http://reallifecam.com/images/Plan_5sm.gif" />'; camName = "sadfne"; break;
        }
        newHTML2 = newHTML2 + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+camName+'.stream" id="01_'+i+'" class=""> <span style="color:orange">Ap.5 - Nastya & Zheka (NEW!)</span> - '+room_name+'</a></div>';
    }
    i++;
    room_name = "";
}
newHTML = newHTML + "</div>";
newHTML2 = newHTML2 + "</div>";
clipsDiv.html(newHTML);
clipsDiv2.html(newHTML2);