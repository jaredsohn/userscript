// ==UserScript==
// @name            Linkedin-Profile-get
// @namespace       #sourcecon John Tunberg 
// @include         http://www.linkedin.com/profile?viewProfile=&key=*
// @include         http://www.linkedin.com/ppl/webprofile*
// ==/UserScript==


//  Created by john turnberg  john.turnberg@gmail.com
//  this shortens the amount of data that is passed along to the spreadsheet
function shortenString(string, maxlen, del) {  
	string = string.toString();
	if (!del) { del='%20Truncated%20' }
	if (string.length > maxlen) {
		string = string.substr(0, maxlen) + del;     
	}  
	return string; 
}  
String.prototype.shorten = function(n) {
   // var indicator = i || '…';//
    return (this.length > n) ? String(this.substr(0, n)) : String(this);
};

function do_LI_script() {

var FName=document.getElementsByClassName('given-name')[0].firstChild.data; 
var LName=document.getElementsByClassName('family-name')[0].firstChild.data; 
var CComp=document.getElementsByClassName('company-profile')[0].textContent; 
var TTitle=document.getElementsByClassName('title')[0].textContent; 
var UUrl = document.location.href;



  
var RResume = document.getElementById('profile-experience').textContent;// was 'past' and resume This is just the persons summary
//var RResume = document.getElementById('content').textContent;  //This is the header and sumary
var LLocation = document.getElementsByClassName('locality')[0].textContent;
//var EEducation = "";
var EEducation = document.getElementById('profile-education').textContent;

var LName = LName.replace(/(\s|&nbsp;|&\#160;)+/gi, "%20");
var LName = LName.replace(/@/, "at");//replace(/ /,"-"));
var FName = FName.replace(/(\s|&nbsp;|&\#160;)+/gi, "%20");

var TTitle = TTitle.replace(/^\s+|\s+$/g,'');
var TTitle = TTitle.replace(/ for .*/g, "");
var TTitle = TTitle.replace(/&/g, "and");       //get rid of &
var TTitle = TTitle.replace(/ at .*/g, "");     // Parse out Title from Company and Title
var TTitle = escape(TTitle);

var CComp = CComp.replace(/ at .*/g, "");
var CComp = CComp.replace(/&/g, "and");         //get rid of &
var CComp = escape(CComp);

var UUrl = UUrl.replace(/&pvs.*/g, "");
var UUrl = UUrl.replace(/&authToken.*/g, "");   //remove after &authToken
var UUrl = escape(UUrl);

var RResume = RResume.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
var RResume = RResume.replace(/<\/?[^>]+(>|$)/g, ""); //remove HTML tags
var RResume = RResume.replace(/&/g, "and");//get rid of &
var RResume = RResume.replace(/[^a-zA-Z 0-9]+/g,''); // remove special characters
var RResume = escape(RResume);
//var RResume = RResume.replace(/%0A/g,"");

//  Set length of data to be passed to form
var RResume = shortenString(RResume, 1450, "done");

var EEducation = EEducation.replace(/Education /g,"");
var EEducation = EEducation.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' '); //Removes extra spaces
var EEducation = EEducation.replace(/&/g, "and");//get rid of &
var EEducation = escape(EEducation);
var LLocation = escape(LLocation);
var LLocation = LLocation.replace(/^\s+|\s+$/g,'');// Removes extra spaces
var LLocation = LLocation.replace(/<\/?[^>]+(>|$)/g, ""); //remove HTML tags


var RResume = RResume.shorten(1450);
// old dDdSdVNuM2NsZmx2LUx3M0JLMjRJLWc6MA  //  dHVPQU4tSEY0cFZhUjZZSmNhQXY4TlE6MA  
//  The odd value is the pointer to this particular form for this google spreadsheet
//  it is in the URL of the form

var BaseURL="<a href=https://spreadsheets.google.com/viewform?hl=en&formkey=dHVPQU4tSEY0cFZhUjZZSmNhQXY4TlE6MA&entry_0=";
var URLString=BaseURL.concat(FName,"&entry_1=", LName,"&entry_2=", CComp,"&entry_3=", TTitle,"&entry_4=", UUrl,"&entry_5=", RResume,"&entry_6=", EEducation,"&entry_7=", LLocation, "#34;>Open Web Form</a>");


//  var URLString=BaseURL.concat(FName,"&entry.1.single=", LName,"&entry.2.single=", CComp,"&entry.3.single=", TTitle,"&entry.4.single=", UUrl,"&entry.5.single=", RResume,"&entry.6.single=", EEducation,"&entry.7.single=", LLocation, "&submit=Submit#34;>Get Header and Profile</a>");
//add the link to the form
document.getElementById("nav-utility-help").innerHTML=URLString;
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_LI_script() }, false);
//.user.js