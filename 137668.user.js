// ==UserScript==
// @name            JIRA Redirect to login page
// @namespace       ajorpheus
// @description     When visiting an everest2 wiki page, automatically login
// @include         https://jira.dev.monitise.net/*
// @exclude         https://jira.dev.monitise.net/login.jsp?os_destination=%2Fsecure%2FRapidStart.jspa
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
        //alert('Loaded');
        if(typeof $("li#header-details-user a") != "undefined")
        {
            if( $("li#header-details-user a").html() && $("li#header-details-user a").html() == "Log In" 
                && (typeof $("input.login-form-username") != "undefined" || $("input.login-form-username").size() ==0))
            {   
                //alert($('li#header-details-user a').attr('href'));
                window.location = $('li#header-details-user a').attr('href');
            }
        }
        });
}

// load jQuery and execute the main function
addJQuery(main);

