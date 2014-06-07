// ==UserScript==
// @name           disable Anti-Adblockers
// @namespace      bsemf.de
// @description    disables Anti-Adblockers on several sites
// @include        http://www.otr-download.de/*
// @include        http://otr-download.de/*
// @include        http://otrzone.de/*
// @include        http://www.otrzone.de/*
// @include        http://mafia-server.com/*
// @include        http://www.mafia-server.com/*
// @include        http://mirror.human-evo.de/*
// @include        http://home.privatotrmirror.de/*
// @include        http://super-otr.de/*
// @include        http://www.super-otr.de/*
// @include        http://178.32.125.9/*
// @include        http://213.251.173.86/*
// @include        http://www.otr-files.de/*
// @include        http://otr-files.de/*
// @include        http://www.otr-load.de/*
// @include        http://otr-load.de/*
// @include        http://speedy-otr.de/*
// @include        http://*.speedy-otr.de/*
// @include        http://omegadrivers.net/*
// @include        http://www.omegadrivers.net/*
// @include        http://rofl-nerd.net/*
// @include        http://www.rofl-nerd.net/*
// ==/UserScript==

function super_otr()
	{
	var allps = document.getElementsByTagName("p");
	for( var i = 0 ; i < allps.length ; i++ )
	 {
	 if( allps[i].innerHTML.indexOf( "Werbeblocker" ) != -1 && allps[i].innerHTML.indexOf( "deaktivier" ) != -1 && allps[i].innerHTML.indexOf( "neu laden" ) != -1 )
		{
		allps[i].style.display = "none";
		break;
		}
	 }
	
	
	for( var i = 0 ; i < document.styleSheets.length ; i++ )
		{
		for( var k = 0 ; k < document.styleSheets[i].cssRules.length ; k++ )
			{
			myStyle = document.styleSheets[i].cssRules[k].style;
			if( myStyle.display == "none" )
				{
				myStyle.display = "block";
				}
			}
		}
	}

if( location.hostname.match( /super-otr\.de$/i ) != null )
	{
	setTimeout( super_otr, 600 );
	}


function roflNerd()
	{
	document.body.innerHTML+="<span id='pcdc' style='display:none;'> </span>";
	}

if( location.hostname.match( /rofl-nerd\.net$/i ) != null )
	{
	setTimeout( roflNerd, 600 );
	}


function disable_antiblock()
	{
	var allscripts = document.getElementsByTagName('script');
	
	for( var i = 0 ; i < allscripts.length ; i++ )
		{
		var url_beginning = allscripts[i].src.substr( 0, 20 );
		switch( url_beginning )
			{
			case 'http://pagead2.googl' : if( typeof( gaGlobal ) == 'undefined' ) { set_variable( 'gaGlobal' ) } break;
			case 'http://js.adscale.de' : if( typeof( adscale ) == 'undefined' ) { set_variable( 'adscale' ); }
				if( typeof( adscaleNS ) == 'undefined' ) { set_variable( 'adscaleNS' ); }
				break;
			case 'http://view.binlayer' : if( typeof( blLayer ) == 'undefined' ) { set_variable( 'blLayer' ) } break;
			case 'http://www.sponsorad' : if( typeof( preferrer ) == 'undefined' ) { set_variable( 'preferrer' ) } break;
			case 'http://get.mirando.d' : if( typeof( Mirando ) == 'undefined' ) { set_variable( 'Mirando' ) } break;
			case 'http://intext.mirago' : if( typeof( HLSysBannerUrl ) == 'undefined' ) { set_variable( 'HLSysBannerUrl' ) } break;
			case 'http://bdv.bidvertis' : if( typeof( report_error ) == 'undefined' ) { set_variable( 'report_error' ) } break;
			case 'http://ads.adtiger.d' : if( typeof( adspirit_pid ) == 'undefined' ) { set_variable( 'adspirit_pid' ) } break;
			case 'http://www.contaxe.c' : if( typeof( HLSDLGIItem ) == 'undefined' ) { set_variable( 'HLSDLGIItem' ) }
				if( typeof( HLSysBannerUrl ) == 'undefined' ) { set_variable( 'HLSysBannerUrl' ) }
				break;
			case 'http://ads.w3hoster.' : if( typeof( w3Fixv ) == 'undefined' ) { set_variable( 'w3Fixv' ) } break;
			case 'http://www.usemax.de' : if( typeof( um_breite ) == 'undefined' ) { set_variable( 'um_breite' ) } break;
			case 'http://a.wazizu.com/' : if( typeof( enkripsi ) == 'undefined' ) { set_variable( 'enkripsi' ) } break;
			}
		}
	}

function set_variable( var_name )
	{
	location.assign( "javascript:"+var_name+"=23;void(0)" );
	}

setTimeout( disable_antiblock, 550 );
