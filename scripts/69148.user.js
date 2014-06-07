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
            // open code window
            jQuery( window ).keydown( function( event )
            {
                if (event.ctrlKey && event.keyCode == 81)
                {
                    if (typeof window.jqWindow == 'undefined')
                    {
                        window.jqWindow = {};
                    }
                    _rnd = new Date().getTime();
                    window.jqWindow[_rnd] = window.open('', 'jQWindow' + _rnd, 'status=0,toolbar=0,width=400,height=300');
                    window.jqWindow[_rnd].document.title = "Run jQuery - Code Window";
                    window.jqWindow[_rnd].document.body.innerHTML = '<table width="100%" height="100%"><tr><td height="100%"><textarea style="width:100%;height:100%;" id="code"></textarea></td></tr><tr><td align="right"><button onclick="window.runCode(document.getElementById(\'code\').value);" style="width: 100px; margin-right: 5px; font-family: Arial; font-weight:bold;">Run</button><button onclick="document.getElementById(\'code\').value = \'\';" style="width: 100px; font-family: Arial; font-weight:bold;">Clear</button></td></tr></table>';
                    window.jqWindow[_rnd].eval("window.runCode = function(jQcode){opener.window.eval(jQcode);opener.window.jqWindow[" + _rnd + "].focus();return false;}");
                }
            });
        }
    })) + ")();";
}