// ==UserScript==
// @name        Spergs
// @namespace    somespergynamespace
// @include      http://sper.gs/*
// @author       scrubinator
// @description  Sper.gs Feature Additions v0.3
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
//GM_addStyle(//Add some fancy crap here eventually);

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
  
  var GM_JQU = document.createElement('script'); 
  GM_JQU.src = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js";
  GM_JQU.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(GM_JQU); 
}

// the guts of this userscript
function main() {

  //Alters the next and previous buttons
    $("#container").after($("a:contains(Next Episode)").html("").append('<img id="r" class="navBut" src="http://assets.speedtv.com/_assets/img/photos/browser/viewer/next_button.jpg"/>'));
    $("#container").before($("a:contains(Previous Episode)").html("").append('<img id="l" class="navBut" src="http://assets.speedtv.com/_assets/img/photos/browser/viewer/previous_button.jpg" />'));
    $("#container").attr('height','374');
	$("#r").parent().after('<br/><button id="lights">Lights Out!</button>')
	$("button").toggle(function() {  lightsOut(); },function() { lightsOn(); });
    
	function lightsOut()
	{
	

	jwplayer().resize(960, 540);
	//Change button text
	$("#lights").html("Lights On");
	//Fades out
	$("#mainbody").animate({backgroundColor: 'black'}, 'slow');
	$(".junk").not("#vid").fadeTo('slow', 0.2);
	$("#vid").css('backgroundColor','black');
		$(".spoiler").css('color','#F4F7F8');
			$(".spoiler").animate({backgroundColor: 'black'}, 'slow');
		//Info Block
	$("#vid").next().css('color','gray');
	$("#vid").next().css('border-left','0px');
	$('div[style$="15px;"]').fadeTo('slow', 0.2);
	$("#header").fadeTo('slow', 0.2);
	$(".navBut").fadeTo('slow', 0.2);
	$(".footer").fadeTo('slow', 0.2);
	$(".descriptiondaddy").fadeTo('slow', 0.2);

	}
	function lightsOn()
	{
	jwplayer().resize(480, 374);
	//Change button text
	$("#lights").html("Lights Off")
	//Fades in
	$("#mainbody").animate({backgroundColor: '#e4ecee'}, 'slow');
	$(".spoiler").animate({backgroundColor: '#e4ecee'}, 'slow');
	$(".junk").not("#vid").fadeTo('slow', 1);
	$("#vid").css('backgroundColor','#F4F7F8');
	
		//Info Block
	$("#vid").next().css('color','black');
	$("#vid").next().css('border-left','16px');
	$('div[style$="15px;"]').fadeTo('slow', 1);
	$("#header").fadeTo('slow', 1);
	$(".navBut").fadeTo('slow', 1);
	$(".footer").fadeTo('slow', 1);
	$(".spoiler").css('color','black');
	$(".descriptiondaddy").fadeTo('slow', 1);
	}



	//Synopsis Hide
	//$("b:contains('Episode Synopsis')").wrap("<a id='synop'/>");
	//$("#synop").html("<b>&#60Spoilers/></b>");
	//$("#synop").next().hide();
	//$("#synop").toggle(function(){$("#synop").next().show();},function(){$("#synop").next().hide();});
  //Starts playback on page load
	jwplayer().play(true);
  //Navigates to the next episode on finish
    jwplayer().onIdle(function() { document.location = $("#container").next().attr('href'); });	
  }

// load jQuery and execute the main function
addJQuery(main);
