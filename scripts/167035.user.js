// ==UserScript==
// @name        LI_Search_JV_HI
// @include     https://www.linkedin.com/cap/people/show/*
// @include	https://www.linkedin.com/cap/pymbii/show*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

//--- Use jQuery to add the form in a "popup" dialog.
$("body").append ( '                                                          		\
    <div id="gmPopupContainer">                                               		\
		<span id="newHeader1"><a href="http://www.w3.org/">Test JV?</a></span> </br>	  	\
		<span id="newHeader2"><a href="http://www.w3.org/">other</a></span> </br>	  	\
		<span id="newHeader3"><a href="http://www.w3.org/">other</a></span> </br>	  	\
<button id="gmCloseDlgBtn" type="button">Close</button>               		\
    </div>                                                                    		\
' );

$("#gmCloseDlgBtn").click ( function () {
    $("#gmPopupContainer").hide ();
} );


$("#gmCloseDlgBtn").click ( function () {
    $("#gmPopupContainer").hide ();
} );


//--- CSS styles make it work...
GM_addStyle ( "                                                 \
    #gmPopupContainer {                                         \
        position:               fixed;                          \
        top:                    15%;                            \
        left:                   85%;                            \
        padding:                1em;                            \
        background:             white;                    		\
        border:                 3px double Blue;               \
        border-radius:          3ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer button{                                   \
        cursor:                 pointer;                        \
        margin:                 0em 0em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
" );


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

    //Name
    var FName = document.getElementsByClassName('given-name')[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, ""); //Remove HTML
    FName = FName.trim();
 var FNplus = FName.replace(/ /g, '+');    
    FName = FName.replace(/ /g,"&#32;");
    
    
var JVurl = "<a href=https://source.jobvite.com/TalentNetwork/person/applicants.html?jobIds=&action=initialize&searchName=&searchId=&refreshSearchList=&refreshGrid=refreshGrid&page=0&sortBy=&jv-selectedJobDescription=&jv-quickViewSelectedTab=&updateFetch=&q=" + FName + "&requisitions=2&workflowStateIds=&jobTypes=&sourceIds=&distance=&location=";
      
var  PPort = JVurl + ' target="_JV">Jobvite</a>';
var HHI = "<a href=https://hirein.corp.linkedin.com/application/?requisition=__None&keywords=" + FName + ' target="_HI">HireIN</a>';

    document.getElementById("newHeader1").innerHTML = PPort;
	document.getElementById("newHeader2").innerHTML = HHI;
    
//var PUrl = document.getElementsByClassName('public-profile')[0].innerHTML.replace(/linkedin.com\/in\//g, 'github.com/');  //replace(/\//g, 'ZZ'); //.innerHTML.replace(  
var Sgh = "<a href=https://github.com/search?q=" + FNplus + '&ref=cmdform&type=Users  target="_GH">Search GitHub</a>';    

	document.getElementById("newHeader3").innerHTML = Sgh;
    
} // Ends do_Pro_script

window.addEventListener("load", function() {do_Pro_script();}, false);
//.user.js