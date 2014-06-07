// ==UserScript==
// @name        UA dumps download helper
// @updateURL   https://userscripts.org/scripts/source/126018.meta.js
// @downloadURL https://userscripts.org/scripts/source/126018.user.js
// @version     0.1.5.1
// @date        04.11.2012
// @author      nihil
// @description Provides easier download for the following sites: fileshare.in.ua, filestore.com.ua, fileplaneta.com
// @include	http://fileshare.in.ua/*
// @include	https://fileshare.in.ua/*
// @include	http://www.fileshare.in.ua/*
// @include	https://www.fileshare.in.ua/*
// @include http://fileplaneta.com/*
// @include https://fileplaneta.com/*
// @include http://www.fileplaneta.com/*
// @include https://www.fileplaneta.com/*
// @include http://filestore.com.ua/*
// @include http://www.filestore.com.ua/*
// @include https://filestore.com.ua/*
// @include https://www.filestore.com.ua/*
// ==/UserScript==

"use strict";
var loc = window.location
		, searchField = document.querySelector ( 'input[name="search"]' )
		;

switch ( loc.hostname )
{
	case 'fileshare.in.ua' :
		var form = document.querySelector ( "form[name=dlfrm]" ) , free_download_input = form.querySelector ( 'input[name=post1]' );

		if ( form && free_download_input && !document.querySelector( 'div.b-download-premium' ) )
		{
//			Going straight to captcha input
			free_download_input.name = 'post2';
			form.submit ();
		}
		else
		{
			// Focusing on input field
			var input = document.querySelector ( "#dl_captupe_input" );
			if ( input )
			{
				// If previous input was wrong, the alert box will be shown
				// Removing alert box
				var infoBox = document.getElementById ( 'id_ok' );
				if ( infoBox )
					infoBox.click ();

				input.style.textAlign = "center";
				input.setAttribute ( 'autocomplete', 'off' );
				input.focus ();
			}
			else
			{
				// Going to wait timer
				/*form = document.querySelector("input.dl_fast_btn").parentElement;
				 if(form)
				 form.submit();
				 */
				var f_id = document.querySelector ( "input[name=f_id]" );
				if ( f_id )
				{
					loc.href = loc.protocol + '//' + loc.hostname + loc.pathname + '?frid=0&f_id=' + f_id.value;
				}
			}
		}
		/*
		 f_id is given only after entering captcha
		 <input type="hidden" name="f_id" value="6951b1de2c3643746557fcfd36e01dcc">
		 Then link is
		 http://fileshare.in.ua/5820288?f_id=c7aa27c03eff9691f897d148d2799cd7&frid=229

		 Link can be accessed without captcha if f_id is known, unfortunately generator method is unknown
		 */

		// Remove iframe ad when waiting
		var ifrm = document.getElementsByTagName ( 'iframe' )[1];
		if ( ifrm )	delItem ( ifrm );

		break;

	case 'filestore.com.ua':
			removeAll( 'td[colspan="2"] + td > div' ) ;

		var input = document.querySelector ( '#form > input[name="type"]' );
		if ( input )
			input.value = "full";

		var downloadFile = document.querySelector ( '#downloadfile' );
		if ( downloadFile )
		{
			loc.href = document.querySelector ( '#downloadfile a:first-child' ).href;
			document.getElementById ( "downloadbtn" ).value = 'Нажмите для скачивания в фоновом режиме!';
			downloadFile.style.display = '';
		}

		var capInput = document.querySelector ( 'input[name="captchacode"]' );
		if ( capInput )
		{
			capInput.focus ();

			capInput.style.textAlign = "center";
			capInput.setAttribute ( 'autocomplete', 'off' );

			var redrawBtn = document.querySelector ( 'input[onclick*=dynimg]' );
			redrawBtn.setAttribute ( 'onclick', redrawBtn.getAttribute ( 'onclick' ) + ' var capInput = document.querySelector(\'input[name="captchacode"]\'); capInput.value=null; capInput.focus();' );
		}

		break;

	case 'fileplaneta.com' :
		removeAll ( "iframe" );
		removeAll ( "embed" );

			removeAll ( 'script', document.body ) ;
			removeAll ( 'body > span' ) ;
			document.querySelector( 'head' ).insertAdjacentHTML( 'beforeend', '<style>body > span { display: none; }</style>' ) ;
			removeAll ( 'body > noscript' ) ;
			removeAll ( 'body > style' ) ;
			removeAll ( 'html > script' ) ;
			removeAll ( 'script[src*="mail.ru"]' ) ;
			removeAll ( 'center center + div', document.body ) ;

		var form = document.querySelector ( "input.free-dl" );
		if ( form )
		{
			form.click ();
		}
		else
		{
			var captchaInput = document.querySelector ( "input.captcha_code" );
			if ( captchaInput )
			{
				var spans = captchaInput.parentNode.parentNode.getElementsByTagName ( "span" )
						, spanValues = {}
						, i = spans.length;
				while ( i )
				{
					--i;
					spanValues[ parseInt ( spans[i].style.paddingLeft, 10 ) ] = spans[i].innerHTML;
				}
				captchaInput.value = '';
				var sortedKeys = Object.keys ( spanValues ).sort ( sortNumber );
				for ( var i = 0, len = sortedKeys.length; i < len; ++i )
				{
					captchaInput.value += spanValues[ sortedKeys[i] ];
				}
				document.getElementById ( "btn_download" ).click ();
			}
			else
			{
				document.querySelector ( '.start_countdown' ).style.display = 'none';
				document.querySelector ( '#countdown_str' ).style.display = 'block';

				setTimeout ( 'countDown()', 500 );

				delItem ( document.querySelector ( 'table' ).previousSibling );

				var shareBar = document.querySelector ( "noindex table" );
				if ( shareBar )
					delItem ( shareBar );
				shareBar = document.getElementById ( "n4p_1226" );
				if ( shareBar )
					delItem ( shareBar );
				var link = document.querySelector ( "#direct_link a" );
				if ( link )
				{
					link.target = "_self";
					var img = document.createElement ( "img" );
					img.setAttribute ( "src", link.firstChild.getAttribute ( "src" ) );
					delItem ( link.firstChild );
					link.appendChild ( img );
				}
			}
		}
		// Remove all scripts
		removeAll ( "script" );

		break;
}

if (searchField)
{
	searchField.setAttribute( 'type', 'search' );
	searchField.setAttribute( 'placeholder', 'Search' );
	searchField.setAttribute( 'results', '10' );
}

function delItem (itemNode)
{
	itemNode.parentNode.removeChild( itemNode );
}
function removeAll (itemName, context)
{
	if ( typeof ( context ) === 'undefined' )	context	= document ;
	var items = context.querySelectorAll( itemName )
		, i = items.length;
	while ( i-- )
		delItem( items[i] );
}
function sortNumber (a, b)
{
	return a - b;
}

document.querySelector( 'head' ).insertAdjacentHTML( 'beforeend', '<style> input, textarea {\
  color: #579     ;  \
  text-align: left ; \
  font-weight: bold; \
  font-size: 1.1em ; \
  font-family: Consolas, Arial, Verdana;    \
  padding: 2px 1em;             \
  -webkit-border-radius: 2em;   \
  -moz-border-radius: 2em;      \
  -ms-border-radius: 2em;       \
  -o-border-radius: 2em;        \
  border-radius: 1em;           \
  border: 1px solid #cccccc;    \
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);                                     \
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);                                        \
  -ms-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);                                         \
  -o-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);                                          \
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);                                             \
  -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;                               \
  -moz-transition: border linear 0.2s, box-shadow linear 0.2s;                                  \
  -ms-transition: border linear 0.2s, box-shadow linear 0.2s;                                   \
  -o-transition: border linear 0.2s, box-shadow linear 0.2s;                                    \
  transition: border linear 0.2s, box-shadow linear 0.2s;                                       \
}                                                                                               \
input:focus, textarea:focus, input:active, textarea:active, input:hover, textarea:hover {   \
  border-color: rgba(82, 168, 236, 0.8);                                                        \
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);    \
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);       \
  -ms-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);        \
  -o-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);         \
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);            \
  outline: 0;\
}</style>' );

/*
 @History:

 0.1.5 [04.11.2012]:
 - fixed secure updates with GreaseMonkey

 0.1.4 [04.11.2012]:
 - fixed fileshare continuous reload on premium download
 - fixed fileplaneta
 - banner hide on fileshare

 0.1.2 [14.09.2012]:
 - updated fileplaneta waiting

 0.1.0 [22.04.2012]:
 - removed captcha fields autocomplete
 - [filestore] search field input looks more like search box
 - [fileshare] autoclose "wrong input number" alert
 - fixed fileplanet.com.ua -> fileplaneta.com
 - added global stylings
 */
