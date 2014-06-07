// ==UserScript==
// @name        Run jQuery
// @author      codeMaster
// @version     1.03
// @Notes       run jQuery on any site 
//              (Press "Ctrl + q" for open code window)
//              you must allow the browser to open popup windows
// @include     *
// ==/UserScript==


if ( document.addEventListener )
{
  document.addEventListener( "DOMContentLoaded", loadJQ(), false );
}

// require jQuery
function loadJQ() 
{
    if ( typeof window.jQuery == 'undefined' )
    {
        var rjQuery = document.createElement( 'script' );
        rjQuery.src = "http://code.jquery.com/jquery-latest.min.js";
        document.getElementsByTagName("head")[0].appendChild( rjQuery );
        rjQuery.addEventListener( 'load', jQLoaded(), false );
    }
}

// when jQloaded
function jQLoaded()
{
    location.href = 'javascript:(' + encodeURI( uneval( function() {
        window.jqWaiter = window.setInterval( function(){ jqWait() }, 100 );
        // wait when jQuery creating
        function jqWait()
        {
            if ( typeof window.jQuery != 'undefined' )
            {
                window.clearInterval( window.jqWaiter );
                jQuery(document).ready(function()
                {
                    runJqCode();
                });
                
            }
        }
        
        // run code when jQuery ready
        function runJqCode()
        {
	
	var username = "Лурц"; //u can type any username
	var a = $('a:contains("'+username+'")');
	for(var i=0;i<a.length;++i){
		var parents_tr = $(a[i]).parents('tr');
		$(parents_tr[2]).remove();
	};
        }
    })) + ")();";
}