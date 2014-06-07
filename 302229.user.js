// ==UserScript==
// @name        LI_Search_For_Manager_Review
// @include https://www.linkedin.com/cap/candidate/show/*
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
        <span id="newHeader4"><a href="http://www.w3.org/">other</a></span> </br>	  	\
		<span id="newHeader5"><a href="http://www.w3.org/">other</a></span> </br>	  	\
		<span id="newHeader6"><a href="http://www.w3.org/">other</a></span> </br>	  	\
        <span id="newHeader7"><a href="http://www.w3.org/">other</a></span> </br>	  	\
        <span id="newHeader8"><a href="http://www.w3.org/">other</a></span> </br>	  	\
		<span id="newHeader9"><a href="http://www.w3.org/">other</a></span> </br>	  	\
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
        background:             #eee;                    		\
        border:                 1px Solid #bbb;               \
        border-radius:          3ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer button{                                   \
        cursor:                 pointer;                        \
        margin:                 0em 0em 0;                      \
        border:                 1px outset buttonface;          \
        box-sizing:             border-box;                     \
        font-size:              13px;                           \
        color:                  #fff;                           \
        background-color:       #287bbc;                        \
        border-color:           #1b5480;                        \
        border-radius:          3px;                            \
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
    
//var PUrl = document.getElementsByClassName('public-profile')[0].innerHTML.replace(/linkedin.com\/in\//g, 'github.com/');  //replace(/\//g, 'ZZ'); //.innerHTML.replace(  
var Sgh = "<a href=https://github.com/search?q=" + FNplus + '&ref=cmdform&type=Users  target="_GH">GitHub</a>';    
var GMN = "<a href=http://search.gmane.org/?query=&author=" + FName + ' target="_GM">Gmane</a>';
var ACM = "<a href=http://esv4-bizops03.linkedin.biz/futurama/futurama/headline.php?headline=" + FName + ' target="_AM">Ref2.0</a>';
var DBLP = "<a href=http://www.dblp.org/search/index.php#query=author:" + FName + ' target="_DB">DBLP</a>';
var QQQ = "<a href=http://www.quora.com/search?q=" + FName + ' target="_QQ">Quora</a>';
var KAG = "<a href=http://www.google.com/search?q=site%3Awww.kaggle.com%2Fusers%2F+" + FName + ' target="_KG">Kaggle</a>';
var LIR = "<a href=https://www.linkedin.com/cap/peopleSearch/doSearch?actionCombo=peopleSearch&searchSelected=&keywords=" + FName + ' target="_LR">Recruiter</a>';
	
    document.getElementById("newHeader1").innerHTML = LIR;
    document.getElementById("newHeader2").innerHTML = HHI;
    document.getElementById("newHeader3").innerHTML = Sgh;
    document.getElementById("newHeader4").innerHTML = GMN;
    document.getElementById("newHeader5").innerHTML = ACM;
	document.getElementById("newHeader6").innerHTML = DBLP;
    document.getElementById("newHeader7").innerHTML = QQQ;
    document.getElementById("newHeader8").innerHTML = KAG;
    document.getElementById("newHeader9").innerHTML = PPort;
} // Ends do_Pro_script

window.addEventListener("load", function() {do_Pro_script();}, false);
//.user.js
