// ==UserScript==
// @name           Gmail Subject Field Length Count
// @namespace      jameswigley.com
// @description    Displays the length of the Gmail subject field. 
// @include        *mail.google.com*
// @version        0.3
// @date           2012-11-01
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  //script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  //
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	$('body').keyup(function(e) {

        $target = $(e.target);
   
        if ( $target.attr('name') === 'subjectbox' ) {
            // new style compose (pop-up)
            $target.attr('title', 'Length: ' + $target.val().length );
        }
        else if ( $target.attr('name') === 'subject' ) {
            // old style compose (page) 
            $target.parent().prev().html('Subject (' + $target.val().length + '):');
        }
    });
}

// load jQuery and execute the main function
addJQuery(main);
