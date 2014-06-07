// ==UserScript==
// @name           Make the Irish Independent's auto-generated links appear as normal text until MouseOver
// @namespace      http://independent.ie
// @description    Make the Irish Independent's auto-generated links appear as normal text until MouseOver
// @include        http://www.independent.ie/*
// ==/UserScript==

window.addEventListener( 'load', function( e ) 
{
    try
    {
	var aLinks = document.getElementsByTagName ( "a" );
        for (var i=0; i < aLinks.length; i++ )
	{
            var aOldRegEx = aLinks[i].href.match(/www\.independent\.ie\/topics/);
            var aNewRegEx = aLinks[i].href.match(/searchtopics\.independent\.ie\/topic/);
            if ( aOldRegEx != null || aNewRegEx != null)
            {
                aLinks[i].style.color='#333333';
                aLinks[i].style.textDecoration= 'none';
                aLinks[i].style.hover= 'none';
                aLinks[i].addEventListener ( 'mouseover', function ( e )
                {
                    this.style.textDecoration = 'underline';
                    this.style.color='#306294';
                }, false );
                aLinks[i].addEventListener ( 'mouseout', function ( e )
                {
                    this.style.textDecoration = 'none';
                    this.style.color='#000000';
                }, false );
            }
        }
	}
	catch ( sError )
	{
		GM_log ( "Got error: " + sError );
	}
},false);
