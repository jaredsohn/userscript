// ==UserScript==
// @name        Facebook LogOut
// @namespace   *.facebook.com/*
// @description Facebook LogOut Button Always Visible
// @include     http*.facebook.com/*
// @version     1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function logoutFB2(){
	$('#logout_form').appendTo('#blueBar');
	$('#logout_form').addClass('stilizacija');
	$('#blueBar').append('<style>.stilizacija{background:red;float:right;padding:5px 10px;margin:10px}.stilizacija input{color:#fff;font-weight:bold}</style>');
}

// load jQuery and execute the main function
addJQuery(logoutFB2);
