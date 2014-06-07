// ==UserScript==
// @name           Irctc redirect to login
// @namespace      ajorpheus
// @description    Redirect to the login page from the error page
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do*
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/logout.do*
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do*
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/home.do*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function debug(log_txt) {
    if (console != undefined) {
        console.debug(log_txt);
    }
}

// the guts of this userscript
function main() {
	$.expr[":"].containsNoCase = function(el, i, m) {
	    var search = m[3];
	    if (!search) return false;
	    return eval("/" + search + "/i").test($(el).text());
	}; 
	
	var errorMessageCount = $("h2:containsNoCase('Online Reservation Error')").size();
    var logoutMessageCount = $("td:containsNoCase('Thank you for using www.irctc.co.in')").size();
    var sessionExpiredMessageCount = $("td.boldEleven:containsNoCase('Your Session has Expired')").size();
        //console.debug(logoutMessageCount + "\n" + errorMessageCount)


	if(errorMessageCount > 0 || logoutMessageCount > 0 || sessionExpiredMessageCount >0){
	    window.location = $("a:containsNoCase('here')").attr("href");
	}		

        var loginButtonCount = $('input.buttonSubmit#button[value*="Login"]').size() ;
        if (loginButtonCount > 0){
            $('input.buttonSubmit#button[value*="Login"]').focus();
        }

        $("div.TourismPromo").remove();
        $("div.Alertbox").remove();
}

// load jQuery and execute the main function
addJQuery(main);
