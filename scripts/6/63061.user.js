// ==UserScript==
// @name unspam_kino 
// @namespace http://planb-jena.de 
// @description removes popovers from kino.to and some of the sites they link to 
// @include http://kino.to/*
// @include http://filebase.to/*
// @include http://ebase.to/*
// @include http://www.tubeload.to/*
// @include http://duckload.com/*
// ==/UserScript== 


function pimp (o) 
{
	var ext = {
		kill : function () 
		{
			this.parentNode.removeChild(this ) ; 
		}
	}
	for ( var name in ext ) 
	{
		if ( ext.hasOwnProperty(name )  ) 
		{
			o[name] = ext[name] ; 
		} 
	}
	return o ; 
} 

function $xx ( expr , f ) 
{
	try 
	{
		var nodes = document.evaluate ( expr , document , null ,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE ,null ); 
	} 
	catch ( ex ) 
	{
		return ; 
	}
	var i ; 
	for ( i=0 ; i< nodes.snapshotLength ; i++ ) 
	{
		f( pimp ( nodes.snapshotItem (i))  ) ; 
	}
}


function kill_by_id ( id ) 
{
	$xx('//*[@id="' + id + '"]' , function (x ) {x.kill() } ) ; 
}


var url_str = window.location.toString(); 

if ( url_str.match(/kino\.to/ ) ) 
{
	unsafeWindow.Set_Layer_ID = "" ; 
}

if ( url_str.match(/\/filebase\.to/) ) 
{

	kill_by_id ( "systemad_container") ; 
	kill_by_id ( "ball" ) ; 
	kill_by_id ( "adlayerad" ) ; 
} 

if ( url_str.match(/\/ebase\.to/) ) 
{
	kill_by_id( "adLayer" ) ; 
	kill_by_id( "ball" ) ; 
	
}

if ( url_str.match(/tubeload\.to/) )
{
	kill_by_id ( "tt" ) ; 
	kill_by_id ( "sysbar" ) ; 
	kill_by_id ( "content" ) ; 
}
if (url_str.match(/duckload/ ) ) 
{
	kill_by_id ( "reklame-1" ) ; 
	kill_by_id ( "ball" ) ; 
	kill_by_id ( "sym_cont" ) ; 
}	
 


