// ==UserScript==
// @name           blinking links
// @namespace      deamonicky script
// @include        *
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//alert("");
//$("document").

// copy of this css http://www.jwz.org/
var rectaround = {"background":"rgba(0,0,0,0.7)",
				"border":"1px solid #F00",
				"margin":"-17px",
				"padding":"16px",
				"position":"relative",
				 "z-index":"1"};
// simpler way than
/*$(this).css(
	"background","rgba(0,0,0,0.7)");
$(this).css(
	"border","1px solid #F00");
$(this).css(
	"margin","-17px");
$(this).css(
	"padding","16px");
$(this).css(
	"position","relative");
$(this).css(
	 "z-index","1");
*/
				 
// sets default value:
// http://stackoverflow.com/questions/4314359/how-can-i-restore-the-default-button-style/4314445#4314445
var rectaround_clear = {"background":"",
				"border":"",
				"margin":"",
				"padding":"",
				"position":"",
				 "z-index":""};			
$("a").hover(
		// ON START
		function(){
			$(this).css(rectaround);
			
			// blinking
			// http://api.jquery.com/hover/
			$(this).fadeOut(100);$(this).fadeIn(500);

		},
		// ON END
		function() {
			$(this).css(rectaround_clear);
			//alert(backup));
		}           
	);