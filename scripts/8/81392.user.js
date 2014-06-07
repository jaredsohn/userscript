// ==UserScript==
// @name            RedirectToLoginOnWiki 
// @namespace       ajorpheus
// @description     When visiting an everest2 wiki page, automatically login
// @include         http://everest2.us.oracle.com/wiki/*
// @include         http://everest2/wiki/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
        $(document).ready(function() {  
        if(typeof $("li#pt-login a") != "undefined")
        if($("li#pt-login a").html() && $("li#pt-login a").html() == "Log in / create account")
            //window.location = "http://everest2.us.oracle.com/w/index.php?title=Special:UserLogin&returnto=9.20_Reporting_Enhancements_Task_List";
            window.location = $('#pt-login a').attr('href');
	});

}

// load jQuery and execute the main function
addJQuery(main);
