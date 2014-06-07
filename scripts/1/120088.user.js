// ==UserScript==
// @name           fvwmflavars_page_analysis
// @namespace      fvwmflavars_page_analysis
// @description    Page Analysis
// @copyright      MonkeyNround
// @version        0.0.1
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @include        http://apps.facebook.com/onthefarm/*
// @include        http://fb-tc-2.farmville.com/flash.php*
// ==/UserScript==
(function() 
{
    // Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://code.jquery.com/jquery-1.4.2.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    var jqueryActive = false;

    //Check if jQuery's loaded
    function GM_wait() 
    {
        if(typeof unsafeWindow.jQuery == 'undefined') 
        { window.setTimeout(GM_wait,100); }
        else 
        { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    function letsJQuery() 
    {
        jqueryActive = true;
        setupOutputFooter();
    }

    /******************************* Analysis FOOTER Functions ******************************/ 
    function printOutput(someText)
    {
        alert('printing output');
        
        if($('div.analysis_footer').length)
        {
           alert('is here - appending');
           $('div.analysis_footer').append('<br>' + someText);         
        }
        else
        {
            alert('not here - trying again');
            setupOutputFooter();
            $('div.analysis_footer').append('<br>' + someText);            
        }
    }
    
    
    GM_registerMenuCommand("Test Output", testOutput, "k", "control", "k" );
    
        
    function testOutput()
    {
        printOutput('testing this');
    }           
    
    function setupOutputFooter()
    {    
        $('<div class="analysis_footer">Page Analysis Footer:</div>').appendTo('body');
        $('div.analysis_footer').css('position','fixed').css('bottom', '0px').css('background-color','#F8F8F8');
        $('div.analysis_footer').css('width','100%').css('color','#3B3B3B').css('font-size', '0.8em');
        $('div.analysis_footer').css('font-family', '"Myriad",Verdana,Arial,Helvetica,sans-serif').css('padding', '5px');
        $('div.analysis_footer').css('border-top', '1px solid black').css('text-align', 'left');
    }      
    
    
}());