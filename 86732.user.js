// ==UserScript==
// @name           otr-download.de anti-anti-Adblock
// @namespace      bsemf.de
// @description    deactivates the anti-Adblock on otr-download.de / deaktiviert die Erkennung von Adblockern auf otr-download.de
// @include        http://otr-download.de/*
// ==/UserScript==

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

setTimeout( disable_antiblock, 1500 );

