// ==UserScript==
// @name	GotoCAP_IDinURL
// @include         *linkedin.com/profile/view?id=*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



//--- Use jQuery to add the form in a "popup" dialog.
$("body").append ( '                                                          		\
    <div id="gmPopupContainer">                                               		\
		<span id="newHeader5"><a href="http://www.w3.org/">W3C</a></span> </br>	  	\
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
        top:                    30%;                            \
        left:                   80%;                            \
        padding:                1em;                            \
        background:             orange;                   		\
        border:                 3px double grey;               \
        border-radius:          2ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer button{                                   \
        cursor:                 pointer;                        \
        margin:                 0em 0em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
" );

function CAP(){ 
    
    var TargetLink          = $("a:contains('Send InMail')")

    if (TargetLink  &&  TargetLink.length) {
    var MemId = TargetLink[0].href;
    }
    
    
    MemId = MemId.split("&")[1];			// split on the second '&' 
    MemId = MemId.replace( /^\D+/g,'');		// Replaces non didgits with "" or nothing
    
    //https://www.linkedin.com/cap/people/show/9697480?authToken=myzj&authTokenType=NAME_BASED&wvmp=true
    var CapUrl = "https://www.linkedin.com/cap/people/show/" + MemId + "?authToken=myzj&authTokenType=NAME_BASED&wvmp=true";    
    
    var nnew2 ='<a href=' + CapUrl + ' target="_blank">Cap Profile</a>';
    document.getElementById("newHeader5").innerHTML = nnew2;
    
   
    
    var UUrl = document.location.href;
    UUrl = UUrl.split("&")[0]; 
    UUrl = UUrl.replace( /^\D+/g,'');		// Replaces non didgits with "" or nothing	
    
    //https://www.linkedin.com/cap/people/show/9697480?authToken=myzj&authTokenType=NAME_BASED&wvmp=true
    var CapUrl = "https://www.linkedin.com/cap/people/show/" + UUrl + "?authToken=myzj&authTokenType=NAME_BASED&wvmp=true"; 
    
    var nnew1 ='<a href=' + CapUrl + ' target="_blank">Path to CAP Profile</a>';
    document.getElementById("newHeader2").innerHTML=nnew1;
    

} // Ends do_LI_script
window.addEventListener("load", function() {CAP();}, false);


//.user.js
