// ==UserScript==
// @name           Avatar Alliance Suite
// @description    Avatar Alliance Suite - fun and good times for friends, family and alliance members.
// @namespace      Ava
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @run-at			document-end
// @version        192.168.0.12
// ==/UserScript==
//
/*** changes
 select ImageSource under options to disable winter or view older images wich may be faster to load on memory limited machines.
 you may need to clear the browser cache
***/


function loadWhenReady(counter)
{	
	//var sourceUrl="//localhost:2048/avasuite.js";
	var sourceUrl="http://userscripts.org/scripts/source/293189.user.js";


	if ( typeof qx != 'undefined' &&
		 typeof qx.Bootstrap != 'undefined' &&
		 typeof qx.Class.define!='undefined'&&
		 typeof qx.dom!='undefined'&&
		typeof qx.dom.Element!='undefined'
	   )
	{
	// this is slow
		qx.dom.Element._allowCreationWithMarkup=function ( P ) { return false; }


		console.warn( 'qx bootstrap is ready!' );
		var avaScript=document.createElement( "script" );
		avaScript.id="AvatarSuite";

		avaScript.async=true;
		avaScript.type='text/javascript';
		//var avaScriptTxt = avaSuiteWrapper.toString();
		//avaScript.innerHTML="<script type='text/javascript' src = '"+sourceUrl+"'></script>"; // we want to strip the function name.
		avaScript.src=sourceUrl;
		document.body.appendChild( avaScript );
		//	document.getElementById("fb_xdm_frame_http" ).appendChild( avaScript );

		return;
	}
	counter=counter||1;
	if ( counter>=20 )
	{
		console.log( "Giving up." );
		return;
	}
	console.log( 'Waiting for qx.Bootstrap :'+counter );
	setTimeout( loadWhenReady,counter < 5 ? 1000: 5000,counter+1 );
};

(function(){
	
	// only certain domains. Should be prod...
	if(!(/lordofultima\.com/i.test(document.domain) ||  
			/avatar-alliance.com/i.test(document.domain)  || 
			/localhost/i.test(document.domain) ||
	   0)  ){
		return;
	}
	
	console.warn('Injecting fun fun fun script');

	var pre=document.createElement( "script" );
	pre.innerHTML="("+loadWhenReady.toString()+")();";
	pre.type="text/javascript";
	(document.getElementsByTagName('HEAD')[0]||document.getElementsByTagName('BODY')[0]).appendChild( pre );

 })();



