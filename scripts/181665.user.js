// ==UserScript==
// @name        facepunch code line numbers
// @namespace   http://www.facepunch.com
// @include     http://*facepunch.com*
// @version     1
// ==/UserScript==

window.onload = function()
{
    var elements = document.getElementsByClassName( "bbcode_code rainbow" );
            
    for ( var i = 0; i < elements.length; i++ ) 
    {

        var rainbow = elements[i];
                  
        var html = rainbow.innerHTML;
        var joinHtml = "<div class = 'code_numbers' style = 'text-align: right; color: #bbb; background-color: rgb( 68, 68, 68 ); width: 20px; padding-right: 8px; height: 100%; float: left; border-right: 1px solid rgb( 106, 106, 106 ); margin-right: 8px;'>"    
 
        var lineNum = 1;
        
        var lineBreaks = [];
        
        var rawText = html.replace( /(<([^>]+)>)/ig, "" );

        var wordText = rawText.replace( /\n/g, " \n " );

        var lines = rawText.split( "\n" );   
        var line = 0;

        for ( var i2 = 0; i2 < lines.length; i2++ )
        {
            joinHtml = joinHtml + ( i2 + 1 ) + "\n";
        }
        
        joinHtml = joinHtml + "</div>";
        
        var newHtml = joinHtml + html;
        
        rainbow.innerHTML = newHtml;    
        
    }
} 