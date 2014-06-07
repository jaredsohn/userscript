// ==UserScript==
// @name			C&C Tiberium Alliances Auto Login
// @description	Autologin to C&C
// @include			http*://www.tiberiumalliances.com*
// @version			1.1
// ==/UserScript==


var username = ( "" );

var password = ( "" );

var domain = ( "https://www.tiberiumalliances.com" );


/*
	extract 'url'
*/
function getURL( url )
{
	var lang = ( "/" + getLang( url ) + "/" );

	if( url.indexOf( lang ) == -1 )
	{
		return ( url );
	}
	else
	{
		return ( url.replace( lang, "/" ) );
	}
};


/*
	extract 'lang'
*/
function getLang( url )
{
	var lang = ( url.replace( domain, "" ) ).slice( 0, 4 );

	var split = lang.split( "" );

	if(
		( split[ 0 ] == "/" ) &
		( split[ 1 ] != "/" ) &
		( split[ 2 ] != "/" ) &
		( split[ 3 ] == "/" )
	)
	{
		return ( split[ 1 ] + split[ 2 ] );
	}
	else
	{
		return ( "en" );
	}
};


/*
	do authentication
*/
function doAuth()
{
	document.getElementById( "username" ).value = ( username );
	document.getElementById( "password" ).value = ( password );

	var inputs = document.getElementsByTagName( "INPUT" );
	
	for ( var i = 0; i < inputs.length; i++ )
	{
		if( inputs[ i ].type == "submit" )
		{
			inputs[ i ].click();

			break;
		}
	}
};


/*
	initial function
*/
function init()
{
	var url = ( document.location.href );

	var nurl = getURL( url );

	var lang = getLang( url );


	console.log( url );


	if( nurl == ( domain + "/login/auth" ) )
	{
		// console.log( "auth" );

		doAuth();
	}

	else if( nurl == ( domain + "/signup/emailCheck" ) )
	{
		// console.log( "redirect" );

		window.location = ( domain + "/" + lang + "/login/auth" );
	}
}


/*
	run script
*/
init();