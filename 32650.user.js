// ==UserScript==
// @name           GLB Agent Friends List Cookie
// @namespace      Greasemonkey
// @description    Modified from original goal line blitz friend list by Branden Guess to use Cookies
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

///////////////////////////////////////////////////////
//GLB Agent Friend List 
//version 1.04
//last modified 8/30/2008 12:59PM EST
//last modified by Zaqf
///////////////////////////////////////////////////////


var container=document.getElementById('content');
var avatar='http://goallineblitz.com/game/user_pic.pl?user_id=';
var friendlink='http://goallineblitz.com/game/home.pl?user_id=';
var msglink='http://goallineblitz.com/game/new_message.pl?to=';
var htmlFriends = "";

var delim = ','

if (readCookie('GLBFriends') == null){
   createCookie('GLBFriends','',9999);
}


var glbfriends = readCookie('GLBFriends');




   //if the first character in the friends string is a comma
   if (glbfriends.substring(0, 1) == ","){

      //drop the first character from the friends string to get rid of the comma
      glbfriends = glbfriends.substring(1, glbfriends.length);
   }

   //if the last character in the friends string is a comma
   if (glbfriends.substring(glbfriends.length - 1, glbfriends.length) == ","){

      //drop the last character from the friends string to get rid of the comma
      glbfriends = glbfriends.substring(0, glbfriends.length - 1);
   }



createCookie('GLBFriends',glbfriends,9999);


var friends = glbfriends.split(delim);


htmlFriends += '<br/><br/><div class="medium_head">' + 'My Friends</div>' + '<table><tr>';

for(i=0;i<friends.length;i++) {
	htmlFriends += '<td style="text-align: center;float:left;"><a href="' + 
				friendlink + friends[i] + '" style="text-decoration:none"><img src="' + avatar + friends[i] + '" border="0" width="75" height="75">' + '<br/>' + friends[i+1] + '</a><br/><a href="' + msglink + friends[i] + '">Send PM</a><br/><span style="color:#A8A8A8;font-size:10px;" id="' + friends[i] + '"></span></td>';
				i++
}

var managecookie = '<br/><a href="javascript:;" id="copylink">Copy/Backup Friends List</a> <a href="javascript:;" id="pastelink">Paste/Restore Friends List</a>'

container.innerHTML +=  htmlFriends + '</tr></table>' + managecookie;

var elmLink = document.getElementById('copylink');
elmLink.addEventListener("click", copylist, false);

var elmLink2 = document.getElementById('pastelink');
elmLink2.addEventListener("click", pastelist, false);

var getservertime = ShowTime();


for(i=0;i<friends.length;i++) {
	getlastaction(friends[i])
	i++
}


//Functions//////////////////////////////////////////////////////


//allow the user to copy a string of friends, which can later be used to
//restore the friends list if the cookie gets deleted
function copylist(){

   alert(glbfriends);
};

//allow the user to paste the copied string of friends to restore friends list
function pastelist(){

   var pastefriends = prompt("Paste the backup copy of your friends list here:","");

   if (pastefriends.length > 0){
      createCookie('GLBFriends',pastefriends,9999);
      window.location.reload(true);
   }
};


function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
};

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

function getlastaction(userid) {
GM_xmlhttpRequest({
   method:"GET",
   url:"http://goallineblitz.com/game/home.pl?user_id=" + userid,
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(result) {
	var agentpage = result.responseText;
	var strloc = agentpage.indexOf('Last Action:');
	agentpage = agentpage.substring(strloc + 48, strloc + 75);
	strloc = agentpage.indexOf('<');
	agentpage = agentpage.substring(0, strloc);
	agentpage = agentpage.replace(/,/g,"");
	agentpage = agentpage.split(" ");
	var spancontainer=document.getElementById(userid);
	spancontainer.innerHTML = checkonline((HMStoSec1(getservertime) - HMStoSec1(agentpage[3])),agentpage,userid);
	
   }
 });
}


function ShowTime(){
var d = new Date(new Date().getTime() + ((new Date().getTimezoneOffset()*60000) - 21600000));
var mins=d.getMinutes();mins=((mins < 10) ? "0" + mins : mins);var secs=d.getSeconds();
secs=((secs < 10) ? "0" + secs : secs);
var servertime = d.getHours()+":"+mins+":"+secs;
return servertime
}


var sixty = 60;
var online = 5;
var offline = 20;


function checkonline(intSecondsToConvert, agentpage, userid) {


var d=new Date();
var day=d.getDate();
var month=d.getMonth() + 1;
var year=d.getFullYear();

var spancontainer2=document.getElementById(userid);
var currentdate = ymd2mjd(year,month,day)


var allmonths = "JanFebMarAprMayJunJulAugSepOctNovDec";

agentpage[0] = ((allmonths.indexOf(agentpage[0]))+3) / 3;


var activedate = ymd2mjd(parseInt(agentpage[2]),parseInt(agentpage[0]),parseInt(agentpage[1]));

spancontainer2.setAttribute("title","Last Action: " + agentpage[0] + "/" + agentpage[1] + "/" + agentpage[2] + " " + agentpage[3]);



var days = (currentdate - activedate);
days = parseInt(days);
var minutes = getRemainingMinutes(intSecondsToConvert);
minutes = (minutes == 60) ? "00" : minutes;
var seconds = getRemainingSeconds(intSecondsToConvert);
var status="OFFLINE"



if(days<2){

	if(days==1){
	  var negonline = (online-1440);
	  var negoffline = (offline-1440);
	  if(minutes >= -1441 && minutes <= negonline){
		status = "ONLINE"
	  }
	  if(minutes < negonline && minutes <= negoffline){
		status = "INACTIVE"
	  }
	}
	else
	{
	  if(minutes >= (-2) && minutes <= online){
		status = "ONLINE"
	  }
	  if(minutes > online && minutes <= offline){
		status = "INACTIVE"
	  }
	}
			switch(status)
			{
			case "ONLINE":
			  spancontainer2.setAttribute("style","color:#009900;");
			  return "ONLINE"
			  break;    
			case "INACTIVE":
			  spancontainer2.setAttribute("style","color:#000099;");
			  return "INACTIVE"
			  break;
			default:
			  return "OFFLINE"
			}


}
else{
	  return "OFFLINE"
}



//spancontainer2.setAttribute("style","color:#990000;");
return minutes;
};

function convertHours(intSeconds) {
var minutes = convertMinutes(intSeconds);
var hours = Math.floor(minutes/sixty);
return hours;
}
function convertMinutes(intSeconds) {
return Math.floor(intSeconds/sixty);
}
function getRemainingSeconds(intTotalSeconds) {
return (intTotalSeconds%sixty);
}
function getRemainingMinutes(intSeconds) {
var intTotalMinutes = convertMinutes(intSeconds);
return intTotalMinutes
//return (intTotalMinutes%sixty);
}

function HMStoSec1(T) { // h:m:s
  var A = T.split(/\D+/) ; return (A[0]*60 + +A[1])*60 + +A[2] }


function ymd2mjd(Y, M, D) { // after Tony Finch
  var m = (M + 9) % 12 + 1
  var y = Y - (m > 10)
  with (Math) return -678912 + D + floor(m*367/12) +
    y*365 + floor(y/4) - floor(y/100) + floor(y/400) }




