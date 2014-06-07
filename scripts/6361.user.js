// Semantic Radar / JS - user script
// version 1.0 [2006-11-13]
// Copyright (c) 2006, Uldis Bojars
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.

// ==UserScript==
// @name           Semantic Radar / JS
// @namespace      http://sioc-project.org
// @description    Detects presence of Semantic Web data on web pages
// @include        *
// ==/UserScript==


// TO-DO List
/*
 * 1) Optimize code (avoid re-testing for content)
 * 2) Salabot izskatu ieksh laacz.lv
   2.5) Looks funny on http://dig.csail.mit.edu/breadcrumbs/blog/2
 * 3) Use Web-safe colors
 * 4) Add Help link / create web page for Radar
 * ...
 *  ) Displays 'detected' when RDF other then SIOC/FOAF/DOAP is found
 * ...
 * n) Add icons images in-line (into code)
 */
 
function findResults() {
  return document.getElementsByTagName("link");	
}

function detectRDF(event) {

    // Redirect to browsers
    var redirect_s = 'http://sparql.captsolo.net/browser/browser.py?url=';
    var redirect_f = 'http://xml.mfd-consult.dk/foaf/explorer/?foaf=';
    var redirect_d = 'http://sparql.captsolo.net/browser/browser.py?url=';

		// Regular expressions
		var re_foaf = /FOAF/i ;
		var re_sioc = /SIOC/i ;
		var re_doap = /DOAP/i ;
		
//  var query_1 = "//link[@type='application/rdf+xml']";
//  var result = document.evaluate(query_1, content.document, null, XPathResult.ANY_TYPE, null);

// Making a mess of changes to support Opera
  var items = findResults();  
  var buf = ""

  var is_DOAP = false;
  var is_SIOC = false;
  var is_FOAF = false;
  var just_RDF = false;

  for (var i = 0; i < items.length; i++) {
    thisNode = items[i];
    if ( 'application/rdf+xml' == thisNode.type ) {
      buf += thisNode.title + " : " + thisNode.href + "\n";

			if ( thisNode.title.search( re_doap ) != -1 )
			  is_DOAP = true;

			if ( thisNode.title.search( re_foaf ) != -1 )
			  is_FOAF = true;

			if ( thisNode.title.search( re_sioc ) != -1 )
			  is_SIOC = true;

			just_RDF = true;
    }
  }

// UB: Add SemRadar code to the page + added status testing
  if ( is_DOAP || is_FOAF || is_SIOC || just_RDF ) {
    initRadar();
    var item = document.getElementById("x-sem-radar");
    item.style.display = 'block';
  }
    
// UB: Changed IDs of elements
// !!! Need to eliminate repeated testing for autodetect LINKS !!!
  var item = document.getElementById("x-sem-sioc");
  // !!! WHY do 'x-sem-*' get lost on some Google pages ??? !!!
  if (item)
    item.style.display = ( is_SIOC ? 'inline' : 'none' );
  testSioc();
  
  var item = document.getElementById("x-sem-foaf");
  if (item)
    item.style.display = ( is_FOAF ? 'inline' : 'none' );
  testFoaf();

  var item = document.getElementById("x-sem-doap");
  if (item)
    item.style.display = ( is_DOAP ? 'inline' : 'none' );
  testDoap();

// UB: We won't be pinging or updating status bar
/*  dispStatus();

  var need_to_ping = is_DOAP || is_FOAF || is_SIOC || just_RDF;

  var can_ping = semrad_prefs.getBoolPref("do_pings");

  if ( checkExcluded( content.document.URL ) ) {
    alert(" This location is excluded from pings ");
    can_ping = false;
  }

  if (need_to_ping && can_ping) {
      pingSemWeb( content.document.URL, 'http://sparql.captsolo.net/ping/');
      pingSemWeb( content.document.URL );
  } */  
}

function initRadar() {
  var x_rad_html = document.createElement("div");
  
  x_rad_html.innerHTML = '<div xmlns:html="http://www.w3.org/1999/xhtml" id="x-sem-radar"'+
    'style="background: #FFE25F; padding: .5em; display:none; ' +
    'font:13px verdana,sans-serif;*font-size:small;*font:x-small; ">' + // Avoid hacks that set non-standard font sizes
    '<table style="width: 100%;"><tr><td style="text-align: left;">' +
    'Detected' +
      '<span id="x-sem-foaf"> - <a href="">FOAF</a></span>' +
      '<span id="x-sem-sioc"> - <a href="">SIOC</a></span>' +
      '<span id="x-sem-doap"> - <a href="">DOAP</a></span>' +
    '</td><td style="text-align: right;">' +
      '(<a href="javascript:void(document.getElementById(\'x-sem-radar\').style.display = ' +
        '(document.getElementById(\'x-sem-radar\').style.display==\'none\' ? \'block\' : ' +
        ' \'none\')) ">hide</a>) ' +
      '<a href="javascript:void(document.getElementById(\'x-sem-foaf\').style.display = ' +
        '(document.getElementById(\'x-sem-radar\').style.display==\'none\' ? \'block\' : ' +
        ' \'none\')) " title="hide"><img border="0" src="http://www.w3.org/RDF/icons/rdf_flyer.24" ' +
        'alt="RDF Resource Description Framework Flyer Icon"></a>' +
    '</td></tr></table></div>';
  
  document.body.insertBefore( x_rad_html, document.body.firstChild) ;
}

function findData( what ) {

  if ( !what )
      alert("findData: parameter 'what' should be supplied !");

//  var query_1 = "//link[@type='application/rdf+xml'";
//  var query_2 = "]";
 
  var items = findResults();
  var re_what = new RegExp( what, "i" );  

  for (var i = 0; i < items.length; i++) {
    	item = items[i];
    	if ( ('application/rdf+xml' == item.type) && (item.title.search(re_what) != -1) ) {
    		 return item.href;
      }
  }

  return '';

}

// !!! Changed element IDs and assigning to their HREF instead of 'location'

// GoTo SIOC

function testSioc() {

    var span = document.getElementById("x-sem-sioc");
    if ( !span )
    	return;

    var items = span.getElementsByTagName("a");

    // Get the URL of SIOC data
    var dataURL = findData('SIOC');

    // Redirect to RDF validator
    // var redirect = 'http://www.w3.org/RDF/Validator/ARPServlet?PARSE=Parse+URI%3A+&TRIPLES_AND_GRAPH=PRINT_TRIPLES&FORMAT=PNG_EMBED&URI=';

    // Redirect to SIOC browser
    var redirect = 'http://sparql.captsolo.net/browser/browser.py?url=';

    for (var i = 0; i < items.length; i++) {
    	item = items[i];
      item.href = redirect + escape( dataURL );
    }
}

// GoTo FOAF

function testFoaf() {

    var span = document.getElementById("x-sem-foaf");
    if ( !span )
    	return;

    var items = span.getElementsByTagName("a");

    // Get the URL of FOAF data
    var dataURL = findData('FOAF');

    // Redirect to FOAF browser
    var redirect = 'http://xml.mfd-consult.dk/foaf/explorer/?foaf=';

    for (var i = 0; i < items.length; i++) {
    	item = items[i];
      item.href = redirect + escape( dataURL );
    }
}

// GoTo DOAP

function testDoap() {

    var span = document.getElementById("x-sem-doap");
    if ( !span )
    	return;

    var items = span.getElementsByTagName("a");

    // Get the URL of DOAP data
    var dataURL = findData('DOAP');

    // Redirect to SIOC browser (due to a lack of DOAP explorer)
    // var redirect = 'http://www.w3.org/RDF/Validator/ARPServlet?PARSE=Parse+URI%3A+&TRIPLES_AND_GRAPH=PRINT_TRIPLES&FORMAT=PNG_EMBED&URI=';
    var redirect = 'http://sparql.captsolo.net/browser/browser.py?url=';

    for (var i = 0; i < items.length; i++) {
    	item = items[i];
      item.href = redirect + escape( dataURL );
    }
}

detectRDF();