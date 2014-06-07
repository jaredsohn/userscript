// ==UserScript==
// @name  View all cams on reallifecam.com
// @namespace  None
// @version    1
// @description  View all cams without paying
// @match  http://reallifecam.com/
// @copyright  2012+, None
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var clipsDiv = $(".left_column");
var clipsDiv2 = $(".right_column");
var i = 1;
var camName = '';
var newHTML = '<div class="clips">';
var newHTML2 = '<div class="clips">';
var room_name = "";
while(i <= 30)
{
    if(1 <= i && i <= 5) {
  switch( i )
  {
    default: room_name = "Den"; camName = "cam" + i; break;
    case 2: room_name = "Kitchen"; camName = "cam" + i; break;
    case 3: room_name = "Hall"; camName = "cam" + i; break;
    case 4: room_name = "Bedroom"; camName = 'erda3j'; break;
    case 5: room_name = "Bathroom"; camName = "dhv3j3"; break;
  }
  newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+camName+'.stream" id="01_'+i+'" class=""> Anton Alina - '+room_name+'</a></div>';
    }
    if(6 <= i && i <= 10) {
  switch( i )
  {
    default: room_name = "Den"; camName = "cam" + i; break;
    case 7: room_name = "Kitchen"; camName = "cam" + i; break;
    case 8: room_name = "Hall"; camName = "cam" + i; break;
    case 9: room_name = "Bedroom"; camName = 'cvsdfs'; break;
    case 10: room_name = "Bathroom"; camName = '3hvngd'; break;
  }
  newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+camName+'.stream" id="01_'+i+'" class=""> Lora Max - '+room_name+'</a></div>';
    }
    if(11 <= i && i <= 15) {
  switch( i )
  {
    default: room_name = "Den"; camName = "cam" + i; break;
    case 12: room_name = "Kitchen"; camName = "cam" + i; break;
    case 13: room_name = "Bathroom " + (i-12).toString(); camName = "cam" + i; break;
    case 14: room_name = "Bathroom " + (i-12).toString(); camName = 'dsfnrn'; break;
    case 15: room_name = "Bedroom"; camName = '5hjdfn'; break;
  }
  newHTML = newHTML + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+camName+'.stream" id="01_'+i+'" class=""> Maria Jon - '+room_name+'</a></div>';
    }
    if(16 <= i && i <= 21) {
  switch( i )
  {
    default: room_name = "Den"; camName = "cam" + i; break;
    case 17: room_name = "Kitchen"; camName = "cam" + i; break;
    case 18: room_name = "Hall"; camName = "cam" + i; break;
    case 19: room_name = "Bathroom" + (i-18).toString( ); camName = 'nfgnbf'; break;
    case 20: room_name = "Bathroom" + (i-18).toString( ); camName = 'jnsdfn'; break;
    case 21: room_name = "Bedroom"; camName = 'njn43l'; break;
  }
  newHTML2 = newHTML2 + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+camName+'.stream" id="01_'+i+'" class=""> KristinaEvgeni-'+room_name+'</a></div>';
    }
    if(22 <= i && i <= 27) {
  switch( i )
  {
    case 22: room_name = "Den"; camName = "cam" + i; break;
    case 23: room_name = "Kitchen"; camName = "cam" + i; break;
    case 24: room_name = "Dance"; camName = "cam" + i; break;
    case 25: room_name = "Bathroom"; camName = 'asdfn3'; break;
    case 26: room_name = "Bedroom " + (i-25).toString( ); camName = 'ren3js'; break;
    default: room_name = "Bedroom " + (i-25).toString( ); camName = 'sadfne'; break;
  }
  newHTML2 = newHTML2 + '<div class="galki-vpravo menu1" onclick="changeclass(\'01_'+i+'\');return false;"><a href="'+camName+'.stream" id="01_'+i+'" class=""> Nastya Zheka - '+room_name+'</a></div>';
    }
    i++;
    room_name = "";
}
newHTML = newHTML + "</div>";
newHTML2 = newHTML2 + "</div>";
clipsDiv.html(newHTML);
clipsDiv2.html(newHTML2);