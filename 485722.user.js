// ==UserScript==
// @name          Libris.kb.se gallringsscript
// @namespace     http://loidor.com
// @description   Gallringsscript för libris
// @include       http://libris.kb.se/*
// ==/UserScript==
//jQuery for Chrome
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
    script.addEventListener('load', function() {
		var script = document.createElement("script");
          script.textContent = "(" + callback.toString() + ")();";
          document.body.appendChild(script);
	  }, false);
        document.body.appendChild(script);
	}
// load jQuery and execute the main function
addJQuery(main);
// the guts of this userscript
function main() {
    //sätter Mina Bibliotek till checkad
    $('#SEARCH_MYBIBORG').attr('checked', true);
    $('#sok').focus();
    
    //Klickar "Ta bort beståndspost (gallra) automatiskt
    if(location.href.indexOf('/edithold')>=0
      ){
        
        var $gallra_link = 'http://libris.kb.se/' + $('a:contains("Ta bort best")').attr('href');
        
        window.location.href = $gallra_link;
    }
    
    //klickar "Gallra" respektive "Spara" automatiskt
    if(location.href.indexOf('/savehold')>=0){ $('input[type=submit]').trigger('click');}
}