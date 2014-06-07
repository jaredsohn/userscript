// ==UserScript==
// @name            Salesforce-www.linkedin.com/profile
// @namespace       SalesforceLI
// @include         http://www.linkedin.com/profile?viewProfile=&key=*
// ==/UserScript==
function shortenString(string, maxlen, del) {  
	string = string.toString();
	if (!del) { del='...' }
	if (string.length > maxlen) {
		string = string.substr(0, maxlen) + del;     
	}  
	return string; 
}  

function do_platypus_script() {

var FName=document.getElementsByClassName('given-name')[0].firstChild.data; 
var LName=document.getElementsByClassName('family-name')[0].firstChild.data; 
var CComp=document.getElementsByClassName('company-profile')[0].textContent; 
var TTitle=document.getElementsByClassName('title')[0].textContent; 
var UUrl = document.location.href;

var RResume = document.getElementById('profile-summary').textContent;// was 'past' and resume This is just the persons summary
//var RResume = document.getElementById('content').textContent;  //This is the header and sumary
var LLocation = document.getElementsByClassName('locality')[0].textContent;
var EEducation = document.getElementById('profile-education').textContent;

var LName = LName.replace(/(\s|&nbsp;|&\#160;)+/gi, "%20");
var FName = FName.replace(/(\s|&nbsp;|&\#160;)+/gi, "%20");
var LName = LName.replace(/@/, "at");//replace(/ /,"-"));

var TTitle = TTitle.replace(/^\s+|\s+$/g,'');
var TTitle = TTitle.replace(/ for .*/g, "");
var TTitle = TTitle.replace(/&/g, "and");//get rid of &
var TTitle = TTitle.replace(/ at .*/g, "");
var TTitle = escape(TTitle);
var CComp = CComp.replace(/ at .*/g, "");
var CComp = CComp.replace(/&/g, "and");//get rid of &
var CComp = escape(CComp);
var UUrl = UUrl.replace(/&pvs.*/g, "");
var UUrl = UUrl.replace(/&authToken.*/g, "");//&authToken
var UUrl = escape(UUrl);

var RResume = RResume.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
var RResume = RResume.replace(/<\/?[^>]+(>|$)/g, ""); //remove HTML tags
var RResume = RResume.replace(/&/g, "and");//get rid of &
var RResume = RResume.replace(/[^a-zA-Z 0-9]+/g,''); // remove special characters
var RResume = escape(RResume);
//var RResume = RResume.replace(/%0A/g,"");

var RResume = shortenString(RResume, 3000);


var EEducation = EEducation.replace(/Education /g,"");
var EEducation = EEducation.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' '); //Removes extra spaces
var EEducation = EEducation.replace(/&/g, "and");//get rid of &
var EEducation = escape(EEducation);
var LLocation = escape(LLocation);
var LLocation = LLocation.replace(/^\s+|\s+$/g,'');
//var LLocation = trim11(LLocation);
 
//var URLString="<a href=https://na7.salesforce.com/00Q/e?_CONFIRMATIONTOKEN=&cancelURL=%2Fhome%2Fhome.jsp&retURL=%2Fhome%2Fhome.jsp&save_new_url=%2F00Q%2Fe&lea13=Open&name_salutationlea2=&name_firstlea2="+FName+"&lea8=&name_lastlea2="+LName+"&lea11=&lea3="+CComp+"&lea14=&lea4=&lea16street=&lea12="+UUrl+"&lea16city="+LLocation+"&lea16state=&lea16zip=&lea16country=&lea15=&lea5=&lea7=&lea6=&lea17=&save=Saving...">Add to Salesforce</a>");

var BaseURL="<a href=https://na7.salesforce.com/00Q/e?_CONFIRMATIONTOKEN=&cancelURL=%2Fhome%2Fhome.jsp&retURL=%2Fhome%2Fhome.jsp&save_new_url=%2F00Q%2Fe&lea13=Open&name_salutationlea2=&name_firstlea2=";
var URLString=BaseURL.concat(FName,"&lea8=&name_lastlea2=", LName,"&lea11=&lea3=", CComp,"&lea14=&lea4=", TTitle, "&lea16street=&lea12=", UUrl,"&lea16city=", LLocation, "&lea16state=&lea16zip=&lea16country=&lea15=&lea5=&lea7=&lea6=&lea17=", RResume, "&save=Saving...#34;>Add to Salesforce</a>");


//add the link to the form
document.getElementById("nav-utility-acct").innerHTML=URLString;
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
//.user.js
