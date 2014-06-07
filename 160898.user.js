// ==UserScript==
// @name        LI_Bubble_Share_v2
// @include     *linkedin.com/profile/view?id=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

//--- Use jQuery to add the form in a "popup" dialog.
$("body").append ( '                                                          		\
    <div id="gmPopupContainer">                                               		\
		<span id="newHeader1"><a href="http://www.w3.org/">W3C</a></span> </br>	  	\
		<span id="newHeader2"><a href="http://www.w3.org/">W3C</a></span> </br>	  	\
     	<button id="gmCloseDlgBtn" type="button">Close</button>               		\
    </div>                                                                    		\
' );

$("#gmCloseDlgBtn").click ( function () {
    $("#gmPopupContainer").hide ();
} );


//--- CSS styles make it work...
GM_addStyle ( "                                                 \
    #gmPopupContainer {                                         \
        position:               fixed;                          \
        top:                    15%;                            \
        left:                   80%;                            \
        padding:                1em;                            \
        background:             Aqua;                    		\
        border:                 3px double Black;               \
        border-radius:          2ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer button{                                   \
        cursor:                 pointer;                        \
        margin:                 0em 0em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
" );

function do_NewLI_script(){ 
    
    var UUrl = document.location.href;
    UUrl = UUrl.split("&")[0]; 
    UUrl = UUrl.replace( /^\D+/g,'');		// Replaces non didgits with "" or nothing	
    
    
    var peeps = "http://www.linkedin.com/pymk/pcard?mid=" + UUrl;    
    
    var nnew1 ='<a href=' + peeps + ' target="_blank">Path to full Profile</a>';
    document.getElementById("newHeader1").innerHTML=nnew1;
} // Ends do_LI_script



// add get script
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
   // var indicator = i || '';//
    return (this.length > n) ? String(this.substr(0, n)) : String(this);
};

function do_Pro_script() {
//location
var LLoca = "";
    LLoca = document.getElementsByClassName('locality')[0];
    LLoca = LLoca.innerHTML.replace(/<\/?[^>]+(>|$)/g, "").replace(/ /g,"&#032").replace(/<\/?[^>]+(>|$)/g, "");  //Remove HTML
    //Name
    var FName = document.getElementsByClassName('full-name')[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
    FName = FName.replace(/ /g,"&#032");
    //Title
    var TTitle = document.getElementsByClassName('title ')[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, "").replace(/ /g,"&#032");
     //Memebr ID - UUrl is the member ID
    var UUrl = document.location.href;
    UUrl = UUrl.replace(/&auth.*/g, '');   //remove after &authToken
    UUrl = UUrl.replace( /^\D+/g, '');		// Replaces non didgits with "" or nothing
    //Education
    var EEdu = document.getElementById('overview-summary-education').innerHTML;	
    EEdu = EEdu.replace(/<\/?[^>]+(>|$)/g, "").replace(/[^a-zA-Z 0-9]+/g,' ').replace(/ /g,"&#032").replace(/Education/g,"");
    //Resume
    //var RRes = document.getElementsByClass('profile-background')[0].innerHTML;
    var RRes = document.getElementById('background-experience-container').innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
    RRes = RRes.replace(/ /g,"&#032");
    
    
    //Public URL
      
    //new edit
 	var PUrl2 = "";
    PUrl2 = document.getElementsByClassName('public-profile')[0];
  
    PUrl2 = PUrl2.innerHTML.replace(/<\/?[^>]+(>|$)/g, "").replace("Public Profile","").replace(" ","");   
      
    
var RResume = document.getElementById('background-experience-container').innerHTML;
    RResume = RResume.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
 RResume = RResume.replace(/<\/?[^>]+(>|$)/g, /z9z/); 					//remove HTML tags and add a spacer
 RResume = RResume.replace(/&/g, "and");								//get rid of &
 RResume = RResume.replace(/[^a-zA-Z 0-9]+/g,''); 						// remove special characters
 RResume = RResume.replace(/z9z/g," ").replace(/\s+/g, " ");			//replace spacer with HTML
 RResume = escape(RResume);
 RResume = RResume.replace(/%0A/g,"");
 RResume = shortenString(RResume, 1450, "Truncated%20");
 RResume = RResume.replace("%2Truncated","%20Truncated").replace("%Truncated","%20Truncated");
    
    var UName = document.getElementsByClassName('username-cont')[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
    UName = UName.replace(/^\s+|\s+$/g,'');
    UName = UName.replace(/ /g,"&#032");
    
    //This sets up the form to send to a spreadsheet   
	var BaseURL="<a href=https://docs.google.com/forms/d/1firkTqIsP2A20_ITVzFTb2ps2DuKQtN78-5mH--ole0/viewform?entry.1=";

var PPort2=BaseURL.concat(FName,"&entry.2=", TTitle,"&entry.3=", LLoca,"&entry.4=", EEdu,"&entry.5=", PUrl2,"&entry.6=", RResume,"&entry.7=", UUrl,"&entry.8=", UName);
//var PPort=BaseURL.concat(FName,"&entry.2=", TTitle,"&entry.3=", LLoca,"&entry.4=", EEdu,"&entry.5=", PUrl2,"&entry.6=", RResume,"&entry.7=", UUrl,"&entry.8=", UName, "#34;>New Web Form</a>");
    
    var nnew100 =PPort2 + ' target="_new">Add to Project</a>';

    document.getElementById("newHeader2").innerHTML = nnew100;
	document.getElementsByClassName('member-connections')[0].innerHTML = PPort;
} // Ends do_Pro_script

window.addEventListener("load", function() {do_Pro_script();}, false);
window.addEventListener("load", function() { do_NewLI_script()}, false);

//.user.js
