//
//  This seems to work, previous attempts failed because (maybe) one of:
//      1) They were fired on DOMNodeInserted?
//      2) Crashed when tried to use a null value (it wasn't my code).
//      3) The event listener placed after document load? (maybe)
//
//  Note that simple time delays did not appear to work, either.
//
//
// ==UserScript==
// @name            Troubleshoot Phantom DOM problems
// @namespace       http://www.google.com/
// @description     Streamlined version that shows the phantom DOM problem and the workaround.  Note: Assumes Firebug is installed.
// @include         http://www.google.tld/*
// ==/UserScript==
//

//--- WARNING: if Firebug is not installed, the console functions will not be defined.
console.info ('At the top of the GM script file.');
console.time ('WholeGM_ScriptRun');

var zGbl_DOM_ChangeTimer    = '';


document.addEventListener ("DOMSubtreeModified", ReportDOM_ChangeWithDelay, false);


function LocalMain ()
{
    SpotCheckDOM_Contents ('Manually rechecked body --> ');
    console.log ('All done, except for any timer or event driven functions.');
    console.timeEnd ('WholeGM_ScriptRun');
}


function ReportDOM_ChangeWithDelay (zEvent)
{
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { SpotCheckDOM_Contents ('DOM change event(s) fired --> '); }, 444); //-- 444 milliseconds
}


function SpotCheckDOM_Contents (sPrefix)
{
    var zMainNode   = document.getElementById ('main');

    console.log
    (
        sPrefix,
        'BodyLen: ', document.body.innerHTML.length,
        ' Id "main" len: ', zMainNode ? zMainNode.innerHTML.length : '*null*'
    );
}


window.addEventListener ("load", function() {LocalMain ();}, false);
//LocalMain ();
