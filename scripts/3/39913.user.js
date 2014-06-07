// ==UserScript==
// @name           Amazon barcode
// @namespace      http://userscripts.org/users/22504
// @description    Display barcode (EAN/UPC) on product page
// @version        2013.09.26.1
// @author         Aurelien Mino <aurelien.mino@gmail.com>
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
// @icon           http://www.amazon.com/favicon.ico
// @include        http://amazon.tld/*
// @include        http://www.amazon.tld/*
// @include        https://amazon.tld/*
// @include        https://www.amazon.tld/*
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/base64.js
// @require        http://point-at-infinity.org/jssha256/jssha256.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

//////////////////////////////////////////////////////////////////////////////////////
// /!\ These parameters need to be filled up by each user, otherwise this script won't work
//////////////////////////////////////////////////////////////////////////////////////

// Enable Import into MB? (disable by default, Amazon data being really crappy, or at leat what you can get from their web service)
var ENABLE_MUSICBRAINZ_IMPORT = false;

// URL used in the link for barcode search
var BARCODE_SEARCH_URL = "http://www.google.com/search?q=";
//BARCODE_SEARCH_URL = "http://www.priceminister.com/s/";

// User Amazon Access Key ID
var AWSAccessKeyId = '';

// User Amazon Secret Access Key
var AWSSecretAccessKey = '';

// Amazon associate id
var AWSAssociateId = "amazonbarcode-20";

// Debug mode
var DEBUG=false;

//////////////////////////////////////////////////////////////////////////////////////

/*
	AWSQS = Amazon Web Services / Product Advertising API Query Signer (JavaScript)

	2009.08.19, SowaCS: fixed "bug" for POST - do not encode Signature in this case (affected fnSignatureFromArray only)
	2009.06.25, SowaCS: added getSignatureFromArray: fnSignatureFromArray.  this provides much better signing
	2009.06.12, SowaCS: adjust for ff back button / form state / dom "bug" (better this way anyway)
	2009.06.02, SowaCS: fixed 1 digit day of month handling (for ie)
	2009.05.24, SowaCS: added "getSignature" method (allows explicit verb to be passed))
	2009.05.21, SowaCS: fixed some errors picked up by http://jslint.com/
	2009.05.18, SowaCS: tweaks
	2009.05.17, SowaCS: factored more generic form & query methods
	2009.05.16, SowaCS: mods for SRE
	2009.05.11, SowaCS: original; with thanks for assistance to the folks at
		http://developer.amazonwebservices.com/connect/thread.jspa?threadID=31701

	All customary licenses and disclaimers for code posted in open forums apply.

	============================================================================


	Dependencies - you will need to download, save & reference the following:

	- ecmanaut.base64.js from http://ecmanaut.blogspot.com/2007/11/javascript-base64-singleton.html
	- jssha256.js from http://point-at-infinity.org/jssha256/


	Usage:

	- Reference the dependencies and this file, e.g.:

		<script language="javacript" src="jssha256.js"></script>
		<script language="javacript" src="ecmanaut.base64.js"></script>
		<script language="javacript" src="AWSQuerySigner.js"></script>

	- Call as follows, e.g.:

		AWSQS.signForm( theForm, strAWSSecretAccessKey );

		--- OR ---

		strSignedQuery = AWSQS.signQuery( strOriginalQuery, strAWSSecretAccessKey );


		Can also retrieve timestamp & signature:

		var oSign = AWSQS.getFormSignature( theForm, strAWSSecretAccessKey );
		--- OR ---
		var oSign = AWSQS.getQuerySignature( strOriginalQuery, strAWSSecretAccessKey );
		--- OR ---
		var oSign = AWSQS.getSignature( "POST", strOriginalQuery, strAWSSecretAccessKey );

		where oSign = { Timestamp: (timestamp), Signature: (signature) }



		--- OR (PREFERRED) (added 2009.06.25) ---

		var oSign = AWSQS.getSignatureFromArray( "POST", strEndpointUri, aOriginalQueryAssociativeArray, strAWSSecretAccessKey );
		where oSign = { Timestamp: (timestamp), Signature: (signature), parameters: (array of encoded "key=value") }

	Notes:

	- Intended to assist with retro-fitting existing JavaScript code for the new AWS query signing requirement
	- No error handling is provided
*/

var AWSQS = (function() {

	// ------ privates ------ //

	function array_to_string( ary ) {
		var str = "";
		for( var i = 0; i < ary.length; i++ ) {
			str += String.fromCharCode( ary[i] );
		}
		return str;
	}

	// uses http://point-at-infinity.org/jssha256/
	function local_HMAC_SHA256_MAC( strKey, strMsg ) {
	  HMAC_SHA256_init( strKey );
	  HMAC_SHA256_write( strMsg );
	  var aHash = HMAC_SHA256_finalize();
	  return array_to_string( aHash );
	}

	function fnTranslate( str, aTranslate ) {
		for ( var i = 0; i < aTranslate.length; i++ ) {
			str = str.replace( aTranslate[i][0], aTranslate[i][1] );
		}
		return str;
	}

	function encodeURIComponentAWS( str ) {
		return fnTranslate( encodeURIComponent( str ),
			[ [/!/g, "%21"], [/'/g, "%27"], [/\(/g, "%28"], [/\)/g, "%29"], [/\*/g, "%2A"] ] );
		//'<=because the single quote in the line above messes with my syntax highlighter
	}

	function toZString( dt ) {
		// "Sun, 10 May 2009 18:45:50 UTC" to "2009-05-10T18:45:50Z":
		//  note: ff toUTCString returns "Sun, 17 May 2009 23:31:11 GMT" - !
		return dt.toUTCString().replace( /.{3}, (\d{1,2}) .{3} (\d{4}) (\d{2}:\d{2}:\d{2}) .{3}/,
			function(strMatch, strDay, strYear, strTime) {
				var strDate = (dt.getUTCDate()).toString().replace( /^(\d)$/, "0$1" );
				var strMonth = (dt.getUTCMonth()+1).toString().replace( /^(\d)$/, "0$1" );
				return strYear + "-" + strMonth + "-" + strDate + "T" + strTime + "Z";
			});
	}

	function timestamp() { return toZString( new Date() ); }

	// given method ( "POST" or "GET" ), AWS query (in GET form) and "secret access key",
	// return object with Timestamp and Signature
	// NOTE: you're better off using fnSignatureFromArray (below) !
	function fnSignature( strMethod, strQuery, strKey ) {
		var bEncode = strMethod == "GET";

		var strTimestamp = timestamp();
		strQuery += "&Timestamp=" + ( bEncode ? strTimestamp : encodeURIComponentAWS( strTimestamp ) );

		var strToSign = strQuery.replace( /(https?:\/\/)([^\/]*)(\/.*)\?(.*)/i,
			function( strMatch, strScheme, strHost, strUri, strParams ) {
				var aParams = strParams.split("&").sort();
					if ( bEncode ) {
						for ( var i = 0; i < aParams.length; i++ ) {
							var aKV = aParams[i].split("=");
							for ( var j = 0; j < aKV.length; j++ ) {
								aKV[j] = encodeURIComponentAWS( aKV[j] );
							}
							aParams[i] = aKV.join("=");
						}
					}
				strParams = aParams.join("&");
				strHost = strHost.toLowerCase();
				return ([ strMethod, strHost, strUri, strParams ]).join("\n");
			});

		// Base64 from http://ecmanaut.blogspot.com/2007/11/javascript-base64-singleton.html
		var strSignature = Base64.encode( local_HMAC_SHA256_MAC( strKey, strToSign ) );
		if ( bEncode ) {
			strSignature = encodeURIComponentAWS( strSignature );
		}

		return { Timestamp: strTimestamp, Signature: strSignature };
	}

	// given method ( "POST" or "GET" ), EndpointUri string,
	// AWS query parameters _in_an_associative_array_,
	// and "secret access key",
	// return object with Timestamp and Signature
	function fnSignatureFromArray( strMethod, strEndpointUri, aQuery, strKey ) {
		var bEncode = strMethod == "GET";

		if ( aQuery["Timestamp"] == undefined )
			aQuery["Timestamp"] = timestamp();

		if ( aQuery["Signature"] != undefined )
			delete aQuery["Signature"];

		var aParams = [];
		var strToSign = strEndpointUri.replace( /([^\/]*)(\/.*)/i,
			function( strMatch, strEndpoint, strUri ) {
				for ( key in aQuery ) {
					var aKV = [ encodeURIComponentAWS(key), encodeURIComponentAWS(aQuery[key]) ];
					aParams.push( aKV.join("=") );
				}
				strParams = aParams.sort().join("&");
				strEndpoint = strEndpoint.toLowerCase();
				return ([ strMethod, strEndpoint, strUri, strParams ]).join("\n");
			});

		// Base64 from http://ecmanaut.blogspot.com/2007/11/javascript-base64-singleton.html
		var strSignature = Base64.encode( local_HMAC_SHA256_MAC( strKey, strToSign ) );
		if ( bEncode ) {
			strSignature = encodeURIComponentAWS( strSignature );
		}

		return { Timestamp: aQuery["Timestamp"], Signature: strSignature, parameters: aParams };
	}




	// ------ form helpers ------ //

	function encodeKV( strKey, strVal )  {
		var strK = encodeURIComponentAWS( strKey );
		var strV = encodeURIComponentAWS( strVal );
		return strK + "=" + strV;
	}

	function getKV( elem )  {
		return encodeKV( elem.name, elem.value );
	}

	// getQuery collects up all field values to be POSTed from form,
	// constructs _uri_encoded_ GET style query with form's action
	// _all_ fields must be collected, even if empty (except those not sent).
	// 2009.06.12, fn: all except for the _signature_ & _timestamp_ fields, if present !
	function getQuery( oForm )  {
		var aQuery = [];

		var colElements = oForm.elements;
		for ( var i = 0; i < colElements.length; i++ )  {
			var elem = colElements[i];
			var strType = elem.type ? elem.type.toLowerCase() : "";
			var strTag = elem.tagName.toLowerCase();

			switch( true ) {

				case elem.name == "Signature":
				case elem.name == "Timestamp":
					// SKIP!
					break;

				case strType == "hidden":
				case strType == "text":
				case strType == "checkbox" && elem.checked:
				case strType == "radio" && elem.checked:
				case strTag == "textarea":

					aQuery.push( getKV( elem ) );
					break;

				case strTag == "select":
					var bDone = false;
					for ( var j = 0; j < elem.options.length; j++ ) {
						if ( !bDone && elem.options[j].selected ) {
							aQuery.push( encodeKV( elem.name, elem.options[j].value ) );
							bDone = true;
						}
					}
					if ( !bDone ) { // or are empty selects not POSTed ?
						aQuery.push( encodeKV( elem.name, "" ) );
					}
					break;

				default:
					// nothin'
			}
		}
		return oForm.action + "?" + aQuery.join("&");
	}

	function setHidden( oForm, strName, strValue ) {
		var elem = oForm.elements[ strName ];
		if ( !elem ) {
			elem = document.createElement("input");
			elem.type = "hidden";
			elem.name = strName;
			oForm.appendChild(elem);
		}
		elem.value = strValue;
	}


	// ------ publics ------ //

	//  get timestamp & signature for form
	function fnFormSignature( oForm, strKey ) {
		return fnSignature( oForm.method.toUpperCase(), getQuery( oForm ), strKey );
	}

	//  get timestamp & signature for query
	function fnQuerySignature( strQuery, strKey ) {
		return fnSignature( "GET", strQuery, strKey );
	}

	// sign form with key: add signature & timestamp
	function fnSignForm( oForm, strKey ) {
		var oSign = fnFormSignature( oForm, strKey );
		setHidden( oForm, "Timestamp", oSign.Timestamp );
		setHidden( oForm, "Signature", oSign.Signature );
	}

	// sign query with key: add signature & timestamp
	function fnSignQuery( strQuery, strKey ) {
		var oSign = fnQuerySignature( strQuery, strKey );
		return strQuery + "&Timestamp=" + oSign.Timestamp + "&Signature=" + oSign.Signature;
	}


	// ------ expose publics here ------ //
	return {
				signForm: fnSignForm,
				signQuery: fnSignQuery,
				getFormSignature: fnFormSignature,
				getQuerySignature: fnQuerySignature,
				getSignature: fnSignature,
				getSignatureFromArray: fnSignatureFromArray
			};
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Here starts user script
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Script Update Checker
// -- http://userscripts.org/scripts/show/20145
var version_scriptNum = 39913; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1250978903767; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
try {
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
} catch(e) {}

// Get current ASIN & domain
var amzTLD = "", ASIN = "", m;
if ((m = window.location.href.match(/amazon\.([a-z\.]+)\//)) != null) {
	amzTLD = m[1];
	if (amzTLD == "co.jp") amzTLD = "jp";
	if (amzTLD == "at") amzTLD = "de";
}
if ((m = window.location.href.match(/\/([A-Z0-9]{10})(?:[/?]|$)/)) != null) {
	ASIN = m[1];
}

// Request Amazon WS
 if (amzTLD != "" && ASIN != "") {
 
 	// Prepare Amazon WS url
 	var url = 'http://ecs.amazonaws.' + amzTLD + '/onca/xml' + 
 				'?Service=AWSECommerceService' + 
 				'&AWSAccessKeyId=' + AWSAccessKeyId +
 				'&Operation=ItemLookup' + 
 				'&ItemId=' + ASIN + 
 				'&AssociateTag=' + AWSAssociateId +
 				'&ResponseGroup=Medium,Tracks';

	var signedUrl = AWSQS.signQuery( url, AWSSecretAccessKey );
	mylog('Signed URL: ' + signedUrl);
    
	GM_xmlhttpRequest({
	  method:"GET",
	  url:signedUrl,
	  headers:{
		"User-Agent":"monkeyagent",
		"Accept":"text/monkey,text/xml",
		},
	  onload:function(response) {
		var xmldoc = new DOMParser().parseFromString(response.responseText,"text/xml");
		var release = parseAmazonRelease(xmldoc);
        setupUI(release);
	  },
	  onerror:function(response) {
		mylog(reponse.statusText + " - " + response.responseText);
      }
	});

 }
 
 // Analyze XmlHttp response
 function parseAmazonRelease(xmldoc) {

    var $xmldoc = $(xmldoc);
    var release = { 'discs': [] };
    
	// Barcode
	release.ean = $xmldoc.find("EAN").text();
    release.upc = $xmldoc.find("UPC").text();
	
    // ASIN
    release.asin = ASIN;
    
    // Release artist credit
    var artist = $(xmldoc).find("Artist").text();
    if (!artist) artist = $(xmldoc).find("Author").text();
    if (!artist) artist = $(xmldoc).find("Creator").text();
    var ac = { 'artist_name': artist, 'credited_name': artist, 'joinphrase': "" };
    release.artist_credit = [ ac ];
    
    // Title
    release.title = $(xmldoc).find("Title").text();
    
    // Release date
    var releasedate = $(xmldoc).find("ReleaseDate").text();
    if (typeof releasedate != "undefined" && releasedate != "") {
        var tmp = releasedate.split('-');        
        if (tmp[0] != "undefined" && tmp[0] != "") {
            release.year = parseInt(tmp[0], 10);
            if (tmp[1] != "undefined" && tmp[1] != "") {
                release.month = parseInt(tmp[1], 10);                
				if (tmp[2] != "undefined" && tmp[2] != "") {
                    release.day = parseInt(tmp[2], 10);
                }
            }
        }
    }  
    
    // Discs
    $(xmldoc).find("Disc").each(function() {
        $disc = $(this);
        var disc = { 'tracks': []};
        disc.format = $(xmldoc).find("Binding").text();;
        // Tracks
        $disc.find("Track").each(function() {
            var track = { 'title': $(this).text() };
            disc.tracks.push( track );
        });
        release.discs.push(disc);
    });
    
    // Labels
    release.labels = [];
    
    mylog(release);
    return release;
 }

function setupUI(release) {

	// Display EAN/UPC
    $('td.bucket ul:first li:contains("ASIN")').after(
        "<b>EAN:</b> <a href='" + BARCODE_SEARCH_URL + release.ean  + "'>" + release.ean + "</a>"
        + ((release.upc != "") ? " (<a href='" + BARCODE_SEARCH_URL + release.upc  + "'>" + release.upc + "</a>)" : "")
    );
    
    // Import: Form parameters
    var edit_note = 'Imported from Amazon: '+release.asin;
	var parameters = MBReleaseImportHelper.buildFormParameters(release, edit_note);

	// Import: Build form
	var innerHTML = MBReleaseImportHelper.buildFormHTML(parameters);
    
    if(ENABLE_MUSICBRAINZ_IMPORT) {
        $('td.bucket ul:first li:contains("ASIN")').after("<b>MusicBrainz:</b>" + innerHTML);
    }

}

function mylog(text) {
    if (DEBUG && unsafeWindow.console) {
        unsafeWindow.console.log(text);
    }
}
