// ==UserScript==
// @name       Transparent BlueBar
// @version    1
// @description  Makes facebook bar transparent while scrolling 
// @match      https://www.facebook.com/
// @copyright  2013+, Fabrizio Mele fabrizio.mele@mlefrz.org
//@require http://code.jquery.com/jquery-latest.js

// ==/UserScript==

var debug=false;

if ("https:" == document.location.protocol) {
    var protocol = "https://";
	if(debug)console.log("Detected that we're running with secure browsing..");
} else {
    var protocol = "http://";
	if(debug)console.log("Detected that we're not running with secure browsing..");
}

function main(){
    $(window).scroll(function(){
    console.log("scroll");
    $top = $(window).scrollTop();
    console.log($top);
    if($top !=0 ){
     	   $('#blueBar').css('opacity','0.85');
    }else{
     $('#blueBar').css('opacity','1');   
    }
    
});

$('#blueBar *').focus(function(){
    
    $('#blueBar').css('opacity','1');
    
    
});
                      
 }                             

main();