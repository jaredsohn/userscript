// ==UserScript==
// @name           Onlinetvrecorder - Fuck the Weasel v2
// @namespace      bsemf.de
// @description    antwortet dem Wiesel automatisch, dass man keine GWP sammeln will
// @include        http://www.onlinetvrecorder.com/?aktion=click_confirmation
// @include        http://www.onlinetvrecorder.com/click_confirmation.php
// ==/UserScript==

var func_ftw = uneval( function ftw()
	{

	var alllinks = document.getElementsByTagName("a");
	for( var i = 0 ; i < alllinks.length ; i++ )
		{
		var onclick_code = "";
		try
			{
			onclick_code = alllinks[i].onclick + "";
			}
		catch(e){}

		if( alllinks[i].innerHTML.indexOf( "ein, ich" ) != -1 && onclick_code.indexOf( '(' ) != -1 && alllinks[i].style.display != "none" )
			{
			onclick_code = onclick_code.substring( onclick_code.indexOf( '{' ) + 1, onclick_code.indexOf( '}' ) );
			location.href = "javascript:" + onclick_code + ";void(0)";
			break;
			}
		}

	} );

location.href = "javascript:" + strip_functiontext( func_ftw ) + "ftw();void(0)";


function strip_functiontext( function_text )
	{
	return function_text.substring( 1, function_text.lastIndexOf( ")" ) );
	}


