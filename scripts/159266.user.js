// ==UserScript==
// @name            Beta1_ER_Linkedin
// @namespace       #sourcecon v0.1 Linkedin
// @include         http://www.linkedin.com/profile/view?id=*
// @description     Pass along info to a online from, in this use case, a google doc
// @copyright  2013-2-15 5:09
// ==/UserScript==
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

function do_Pro_script() {
//location
var LLoca = "";
    LLoca = document.getElementsByClassName('locality')[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, "").replace(/ /g,"&#032");
    LLoca = LLoca.replace(/<\/?[^>]+(>|$)/g, "");  //Remove HTML
    //Name
    var FName = document.getElementsByClassName('full-name')[0].innerHTML.replace(/[^a-zA-Z 0-9 ',.–']+/g,'').replace(/<\/?[^>]+(>|$)/g, "");
    FName = FName.replace(/ /g,"&#032");
    //Title
    var TTitle = document.getElementsByClassName('title ')[0].innerHTML.replace(/[^a-zA-Z 0-9 ',.–']+/g,'').replace(/<\/?[^>]+(>|$)/g, "").replace(/ /g,"&#032");
     //Memebr ID - UUrl is the member ID
    var UUrl = document.location.href;
    UUrl = UUrl.replace(/&auth.*/g, '');   //remove after &authToken
    UUrl = UUrl.replace( /^\D+/g, '');		// Replaces non didgits with "" or nothing
    //Education
    var EEdu = document.getElementById('overview-summary-education').innerHTML;	
    EEdu = EEdu.replace(/<\/?[^>]+(>|$)/g, "").replace(/ /g,"&#032").replace(/Education/g,"");
    //Resume
    //var RRes = document.getElementsByClass('profile-background')[0].innerHTML;
    var RRes = document.getElementById('background-experience-container').innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
    RRes = RRes.replace(/ /g,"&#032");
    //Public URL
    var PUrl = document.getElementsByClassName('public-profile')[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
    PUrl = PUrl.replace("Public Profile","").replace(" ","");
    
var RResume = document.getElementById('background-experience-container').innerHTML
    RResume = RResume.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
 RResume = RResume.replace(/<\/?[^>]+(>|$)/g, ""); //remove HTML tags
 RResume = RResume.replace(/&/g, "and");//get rid of &
 RResume = RResume.replace(/[^a-zA-Z 0-9 ',.–']+/g,''); // remove special characters
 RResume = escape(RResume);
 RResume = RResume.replace(/%0A/g,"");
 RResume = shortenString(RResume, 1450, "done");
    
    var UName = document.getElementsByClassName('username-cont')[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
    UName = UName.replace(/^\s+|\s+$/g,'');
    UName = UName.replace(/ /g,"&#032");

    var BaseURL="<a href=https://docs.google.com/forms/d/1firkTqIsP2A20_ITVzFTb2ps2DuKQtN78-5mH--ole0/viewform?entry.1=";

var PPort=BaseURL.concat(FName,"&entry.2=", TTitle,"&entry.3=", LLoca,"&entry.4=", EEdu,"&entry.5=", PUrl,"&entry.6=", RResume,"&entry.7=", UUrl,"&entry.8=", UName, "#34;>New Web Form</a>");
    
	document.getElementsByClassName('member-connections')[0].innerHTML = PPort;
} // Ends do_Pro_script

window.addEventListener("load", function() {do_Pro_script();}, false);

//.user.js