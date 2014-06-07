// ==UserScript==
// @name        redFacebook
// @namespace   http://jibbo.altervista.org  i am experimenting with your code
// @description Change the blue color with red in facebook's pages .. i am experimenting with your code
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @version     0.3 Alpha
// @require http://code.jquery.com/jquery-latest.pack.js
// ==/UserScript==

//This function is required to use jquery in chrome browser
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.pack.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main(){
$('body').css('background-color','#EEEEEE');

//Link
$('a').css('color','red'); //all
$('#contentArea a').css('color','rgb(59,89,152)');//tag

//right colon
/*Buggy because works until you scroll down
$('#rightCol').css('background-color','#EEEEEE'); */

//central area
$('#content').css('background-color','white');

//left colon

//Bar on the top
$('#blueBar').css('background-color','red');
$('#blueBar').css('border-bottom','1px solid #c0c0c0');
$('.navSubmenu').hover(
	function(){
		$(this).css('color','white');
		$(this).css('background-color','gray');
	},
	function(){
		$(this).css('color','red');
		$(this).css('background-color','white');
	}
);

//Logo
$('#pageLogo a').css('background-color','red');
$('#pageLogo a').hover(
	function(){
		$(this).css('background-color','gray');
	},
	function(){
		$(this).css('background-color','red');
	});
//Buttons after Logo
$('a.jewelButton').hover(
	function(){
		$(this).css('background-color','gray');
	},
	function(){
		$(this).css('background-color','red');
	});

//right buttons
$('#pageNav .navItem a').css('color','white');
$('#pageNav').css('text-shadow: 0.1em 0.1em 0.2em #c0c0c0');
$('#pageNav .tinyman .headerTinymanPhoto').css('border-style','none');
$('#pageNav .navItem a').hover(
	function(){
		$(this).css('background-color','gray');
	},
	function(){
		$(this).css('background-color','red');
	});
$('#navAccountLink .menuPulldown').hover(function(){
		$(this).css('background-color','gray');
	},
	function(){
		$(this).css('background-color','red');
	});

//Chat Title
$('#fbDockChatTabs .titlebar').css('background-color','red');
}

// load jQuery and execute the main function
addJQuery(main);