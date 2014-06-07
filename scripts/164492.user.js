// ==UserScript==
// @name        KaldataOverflow
// @namespace   bit_kaldata
// @description Kaldata.com news overflow reader 
// @include     http://www.kaldata.com/
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	//css inlude
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'http://rawgithub.com/malihu/malihu-custom-scrollbar-plugin/master/jquery.mCustomScrollbar.css') );
	$.ajaxSetup({cache: true});
	$.getScript("http://rawgithub.com/malihu/malihu-custom-scrollbar-plugin/master/jquery.mCustomScrollbar.concat.min.js");

    var timeoutID; 
    function delayedAlert() {timeoutID = window.setTimeout(slowAlert, 500);};     
    function slowAlert() {$("#overflow").remove();};     
    function clearAlert() {window.clearTimeout(timeoutID);};    
    
	$(".article_container h2 a,.news_scroller li a").hover(
		function () {
			var offset = $(this).offset();
			var div_width = $(this).width()+offset.left+2;
			var div_offset = "left: "+div_width+"px; top:"+offset.top+"px;";
			var link_load ="http://www.kaldata.com" + $(this).attr('href')+" .tiny_mce";
			$(this).css("position","relative");
			$("#overflow").remove(); clearAlert();
			$("body").after($("<div id='overflow' style='padding: 5px; overflow: auto; position: absolute; z-index: 2147483647 ; " + div_offset + " width: 300px; height: 400px; border:2px solid red; border-radius: 10px; background-color:yellow;'></div>"));
			$("#overflow").load(link_load, function() {
				//alert('Load was performed.');
				$("#overflow p").css("margin","0px");
				$("#overflow").mCustomScrollbar({theme:"dark-2"});
				$("#overflow .cnews_logo").remove(); //remove program logo from overflow            
				$("#overflow img").css("max-width","100%"); //set img size in overflow
				$("#overflow iframe").css("max-width","100%");
			});
			//console.log(div_offset);
		},
		function () {
			$("#overflow").hover(function(){ clearAlert();},function(){ delayedAlert();});
			delayedAlert();
		}
	);
});