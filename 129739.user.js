// ==UserScript==
// @name    easylikes4u.com surf
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  bla bla
// @include    http://easylikes4u.com/surf.php*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @copyright  2011+, You
// ==/UserScript==



$(document).ready(function () {
     var i1 = setInterval(function ()
        {
        if($('#header-bar').html() =='null')
            {}
            else
            {
                var s = $('div#header-bar2').find('input').val();
           
               
                    if(s=="Completed")
                    { 
                        
                       $('div#header-bar2').find('button').click();
                           
                        
                        }
           
            } }, 5000);
});