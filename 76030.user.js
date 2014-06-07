// ==UserScript==



// @name          What.CD stats until TM/Elite TM



// @description   What.CD stats until TM/Elite TM



// @namespace     http://what.cd



// @include       *what.cd/user.php?id=*



// @author       Amareus



// ==/UserScript==







function getClass(name) {



  var allPageTags=document.getElementsByTagName("*");



  for (i=0; i<allPageTags.length; i++) {



    if ( allPageTags[i].className == name ) return allPageTags[i];



  }



}



// stop here unless the page is a user profile



if ( location.href.split('/')[3].split('=')[0] != 'user.php?id' ) return;



var sidebar = getClass('sidebar');



var sidebarDivs = sidebar.getElementsByTagName('div');







var community = sidebarDivs[sidebarDivs.length-2];



var community2 = community.getElementsByTagName('li');



//this below is for figuring out the userclass of a profile, but does not work on all classes for some reason. disabled for now since it's not needed.

/*

var user = sidebarDivs[4];//get the box

var user2 = user.getElementsByTagName('li');//get strings in box. which one is defined later.



var popp = user2[0].innerHTML[7]; //first letter of the userclass.

var popp2 = user2[0].innerHTML; //userclass string



user2[0].innerHTML += " ? ";



for (var zz = 7; zz < popp2.length; zz++) {

var userclass = popp2[zz]; //whole userclass without "Class: "





user2[0].innerHTML += userclass;

}

*/

var TMa = "Elite TM"; //defined as a variable because the userclass names will most likely be changed later.

var ups = community2[4].innerHTML.length; //336







var upnum = community2[4].innerHTML[10]; //first number





var upnum2 = community2[4].innerHTML[11]; //second number, or a space.

var upnum3 = community2[4].innerHTML[12]; //third number, or a "["

var upnum4 = community2[4].innerHTML[13]; //fourth number

var upnum5one = community2[4].innerHTML[15]; //fifth number

var upnum5 = community2[4].innerHTML[14]; //fifth number



if (upnum2 == " ") { //one num



var upnumcal = 500 - upnum;



community2[4].innerHTML += " (" + upnumcal + " left until TM)";

community2[10].innerHTML += "<li>-- You have not reached TM yet, you have " + upnumcal + " torrents left to upload.</li>";



}

if (upnum3 == " ") { //two num

var cal = upnum + upnum2;



var upnumcal = 500 - cal;



community2[4].innerHTML += " (" + upnumcal + " left until TM)";

community2[10].innerHTML += "<li>-- You have not reached TM yet, you have " + upnumcal + " torrents left to upload.</li>";



}

if (upnum4 == " ") { //three num



var cal = upnum + upnum2 + upnum3;



var upnumcal = 500 - cal;

if (upnumcal >= 1) {



community2[4].innerHTML += " (" + upnumcal + " left until TM)";

community2[10].innerHTML += "<li>-- You have not reached TM yet, you have " + upnumcal + " torrents left to upload.</li>";

}



}

if (upnum5one == " " && upnum2 != " ") { //fourth num. the space thing is so it doesn't brake with the first one that will find the space in this one. blah blah I can't explain it. :P



//no need to calculate this because if you've got over a thousand torrents, you're a torrentmaster.



//var cal = upnum + upnum3 + upnum4 + upnum5;

//var upnumcal = 500 - cal;







//community2[4].innerHTML += " ? " + upnumcal;



}







var me = community2[6].innerHTML.length;



if (me == 19) { //one digits



var last1 = community2[6].innerHTML[17];



var last = 500 - last1;



community2[6].innerHTML += "(" + last + " left until " + TMa + ")";

community2[10].innerHTML += "<li>-- You have " + last + " FLAC's left to upload to reach " + TMa + "</li>";



//community2[8].innerHTML += "" + last + " \"Perfect\" FLACs.";



}



else if (me == 20) { //two digits



var last1 = community2[6].innerHTML[17];



var last2 = community2[6].innerHTML[18];



var last = last1 + last2;



var last = 500 - last;



community2[6].innerHTML += "(" + last + " left until " + TMa + ")";

community2[10].innerHTML += "<li>-- You have " + last + " FLAC's left to upload to reach " + TMa + "</li>";



//community2[8].innerHTML += "" + last + " \"Perfect\" FLACs.";



}







else if (me == 21) { //three digits







var last1 = community2[6].innerHTML[17];



var last2 = community2[6].innerHTML[18];



var last3 = community2[6].innerHTML[19];



var last = last1 + last2 + last3;











var last = 500 - last;



if (last <= 0) {



die;



}



else {



community2[6].innerHTML += "(" + last + " left until " + TMa + ")";

community2[10].innerHTML += "<li>-- You have " + last + " FLAC's left to upload to reach " + TMa + "</li>";



//community2[8].innerHTML += "" + last + " \"Perfect\" FLACs.";



}



}











//community2[5].style.display = "none"; //17 one digit



var me2 = community2[5].innerHTML.length;







if (me2 == 17) { //one digits



var past1 = community2[5].innerHTML[15];



var past = 500 - past1;



community2[5].innerHTML += "(" + past + " left until " + TMa + ")";

community2[10].innerHTML += "<li>-- You have " + past + " unique groups left to upload to reach " + TMa + "</li>";



//community2[8].innerHTML += "" + past + " Unique Groups.";



}



if (me2 == 18) { //two digits



var past1 = community2[5].innerHTML;



var past2 = past1[15] + past1[16];



var past = 500 - past2;



community2[5].innerHTML += "(" + past + " left until " + TMa + ")";

community2[10].innerHTML += "<li>-- You have " + past + " unique groups left to upload to reach " + TMa + "</li>";



//community2[8].innerHTML += "" + past + " Unique Groups.";



}



if (me2 == 19) { //three digits



var past1 = community2[5].innerHTML;



var past2 = past1[15] + past1[16] + past1[17];



var past = 500 - past2;







if (past <= 0)



{



//500+. By now you're reached 500, which means this script isn't needed.



die;







}



else {



community2[5].innerHTML += "(" + past + " left until " + TMa + ")";

community2[10].innerHTML += "<li>-- You have " + past + " unique groups left to upload to reach " + TMa + "</li>";



//community2[8].innerHTML += "" + past + " Unique Groups.";



}



}








