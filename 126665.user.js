// ==UserScript==
// @name            Linkedin-Profile-get
// @namespace       #sourcecon John Tunberg 
// Updated by HenkDeTank to work on new linkedin
// @include         http://www.linkedin.com/profile?viewProfile=&key=*
// @include         http://www.linkedin.com/ppl/webprofile*
// @include			http://www.linkedin.com/profile/view?id=*
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
var TTitle=document.getElementsByClassName('headline-title title')[0].textContent; 
var EEmail=document.getElementsByClassName('abook-email')[0].textContent; 
var PPhone=document.getElementsByClassName('abook-phone')[0].textContent; 
var IIndustry=document.getElementsByClassName('industry')[0].textContent; 
var UUrl = document.location.href;

var LName = LName.replace(/(\s|&nbsp;|&\#160;)+/gi, "%20");
var LName = LName.replace(/@/, "at");//replace(/ /,"-"));
var FName = FName.replace(/(\s|&nbsp;|&\#160;)+/gi, "%20");

var TTitle = TTitle.replace(/^\s+|\s+$/g,'');
var TTitle = TTitle.replace(/ for .*/g, "");
var TTitle = TTitle.replace(/&/g, "and");       //get rid of &
var TTitle = TTitle.replace(/ at .*/g, "");     // Parse out Title from Company and Title
var TTitle = escape(TTitle);

var EEmail = EEmail.replace(/^\s+|\s+$/g,'');
var EEmail = EEmail.replace(/ for .*/g, "");
var EEmail = EEmail.replace(/&/g, "and");       
var EEmail = EEmail.replace(/ at .*/g, "");   
var EEmail = EEmail.split(" ");
var EEmail = escape(EEmail[0]);

var PPhone = PPhone.replace(/^\s+|\s+$/g,'');
var PPhone = PPhone.replace(/ for .*/g, "");
var PPhone = PPhone.replace(/&/g, "and");       
var PPhone = PPhone.replace(/ at .*/g, "");
var PPhone = PPhone.split(" ");
var PPhone = escape(PPhone[0]);

var IIndustry = IIndustry.replace(/^\s+|\s+$/g,'');
var IIndustry = IIndustry.replace(/ for .*/g, "");
var IIndustry = IIndustry.replace(/&/g, "and");       
var IIndustry = IIndustry.replace(/ at .*/g, "");     
var IIndustry = escape(IIndustry);

var CComp = CComp.replace(/ at .*/g, "");
var CComp = CComp.replace(/&/g, "and");         //get rid of &
var CComp = escape(CComp);

var UUrl = UUrl.replace(/&pvs.*/g, "");
var UUrl = UUrl.replace(/&authToken.*/g, "");   //remove after &authToken
var UUrl = escape(UUrl);

var BaseURL="<a href=https://docs.google.com/spreadsheet/viewform?formkey=dEVEZjRzQU1MMjZpTVhFd0Z1RG9ydlE6MA&entry_0=";
var URLString=BaseURL.concat(FName,"&entry_1=", LName,"&entry_2=", CComp,"&entry_3=", TTitle,"&entry_4=", UUrl, "&entry_6=", EEmail,"&entry_7=", PPhone, "&entry_8=", IIndustry,"#34;>Open Web Form</a>");
alert(URLString);
document.location.href;
//  var URLString=BaseURL.concat(FName,"&entry.1.single=", LName,"&entry.2.single=", CComp,"&entry.3.single=", TTitle,"&entry.4.single=", UUrl,"&entry.5.single=", RResume,"&entry.6.single=", EEducation,"&entry.7.single=", LLocation, "&submit=Submit#34;>Get Header and Profile</a>");
//add the link to the form
document.getElementById("overview-summary-current-title").innerHTML=URLString;
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_LI_script() }, false);
//.user.js
