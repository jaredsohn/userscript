// ==UserScript==
// @name          AutoLink UB DuE HBZ
// @namespace     http://www.uni-due.de/ub
// @author     Ania Lopez
// @description   Wandelt ISBNs in Links auf den Katalog der UB Duisburg-Essen oder wahlweise den Verbundkatalog HBZ um und ermittelt, ob die Bücher in der Bibliothek vorhanden sind.
// @include *
// @exclude https://katalog.ub.uni-duisburg-essen.de/F*
// ==/UserScript==

/*
Compiled by Ania Lopez (anialopez@gmail.com).
2011-07-04 


Inspired by and based on following scripts:
* AutoLink TIB/UB by Bernhard Tempel (http://userscripts.org/scripts/show/105027)

* Autolink by Jesse Ruderman (http://www.squarefree.com/2005/05/22/autolink/)
* isbnjs - An ISBN JavaScript Library by hetappi.pm (code completely included) 
* Edward Vielmetti's Greasemonkey script for inserting library holdings information into Google Book Search (http://vielmetti.typepad.com/superpatron/2006/02/inserting_libra.html) and derived scripts
* http://userscripts.org/scripts/review/20145
*/

// Check for updates
//
// Source: http://userscripts.org/scripts/review/20145
// A gratefully provided autoupdate script!
//

var SUC_script_num = 106077; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
							    if(confirm('Es ist ein Update verfügbar für "'+script_name+'."\nWollen Sie jetzt zur Downloadseite wechseln\nund das Update installieren?'))
								{
								    GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
								    GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('Kein Update verfügbar für '+script_name+'.');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('Fehler bei der Prüfung auf Updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Autolink ' + libraryName) + ' - Manuelle Prüfung auf Update', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

// Anzahl der ISBNs auf einer Seite, die ohne Rückfrage am Katalog geprüft werden
var maxisbns = 50; 

/* Auswahl der Bibliothek per Menü ermöglichen
   Default ist: TIB/UB.
   Kann angepasst werden, wird aber bei evtl. Update über userscript.org überschrieben */

if (GM_getValue ("libraryName") == "") {GM_setValue ("libraryName", "TIB/UB")}

/* Zur Anpassung des Skripts für Kataloge weiterer Bibliothek, die PICA OPC4  verwenden,
   ist der folgende Block anzupassen (Menüregistrierung und Variablen) */ 

function registerTIBUB() {
    GM_setValue("libraryName", "TIB/UB");
    alert(GM_getValue("libraryName") + " ausgewählt");
}
GM_registerMenuCommand( "TIB/UB", registerTIBUB);

function registerGWLB() {
    GM_setValue("libraryName", "GWLB");
    alert(GM_getValue("libraryName") + " ausgewählt");
}
GM_registerMenuCommand( "GWLB", registerGWLB);

function registerUBDuE() {
    GM_setValue("libraryName", "UBDuE");
    alert(GM_getValue("libraryName") + " ausgewählt");
}
GM_registerMenuCommand( "UBDuE", registerUBDuE);

function registerFHH() {
    GM_setValue ("libraryName", "FHH");
    alert(GM_getValue("libraryName") + " ausgewählt");
}
GM_registerMenuCommand( "FHH", registerFHH);

function registerSBBPK() {
    GM_setValue("libraryName", "SBB-PK");
    alert(GM_getValue("libraryName") + " ausgewählt");
}
GM_registerMenuCommand( "SBB-PK", registerSBBPK);

switch(GM_getValue("libraryName"))
    {
    case 'TIB/UB':
// Für Abfrage im Picaplus-Format (Parsing der Signatur einfacher)
	libraryUrlPatternA = "http://opac.tib.uni-hannover.de/DB=1/LNG=DU/CMD?ACT=SRCHA&PRS=PP%7F&TRM=num+";
// Für Einfügen des Links auf den Katalog
	libraryUrlPatternB = "http://opac.tib.uni-hannover.de/DB=1/LNG=DU/CMD?ACT=SRCHA&IKT=1016&SRT=YOP&TRM=num+";
// Name der Bibliothek (möglichst kurz, wird u.a. hinter ISBNs in die Webseiten geschrieben
	libraryName = GM_getValue("libraryName");
// String zum Erkennen einer Kurzliste als Ergebnis der Abfrage (in diesem Fall wird keine Signatur ausgelesen) 
	libraryAvailability = /\d+&nbsp;von&nbsp;\d+/;
// String zum Parsen der Signatur
	libraryShelfmark = /<TD>209A\/\d\d<\/TD><TD>.*?\$a([^$<]*)/i;
// String zum Erkennen eines Nulltreffer-Ergebnisses
	notFound = /Es wurde nichts gefunden/;
	break;

    case 'GWLB':
	libraryUrlPatternA = "http://opac.tib.uni-hannover.de/DB=3/LNG=DU/CMD?ACT=SRCHA&PRS=PP%7F&TRM=num+";
	libraryUrlPatternB = "http://opac.tib.uni-hannover.de/DB=3/LNG=DU/CMD?ACT=SRCHA&IKT=1016&SRT=YOP&TRM=num+";
	libraryName = GM_getValue("libraryName");
	libraryAvailability = /\d+&nbsp;von&nbsp;\d+/;
	libraryShelfmark = /<TD>209A\/01<\/TD><TD>.*?\$a([^$<]*)/i;
	notFound = /Es wurde nichts gefunden/;
	break;

    case 'UBDuE':
	libraryUrlPatternA = "https://katalog.ub.uni-duisburg-essen.de/F?func=find-b&find_code=WRD&request=num+";
	libraryUrlPatternB = "https://katalog.ub.uni-duisburg-essen.de/F?func=find-b&find_code=WRD&request=num+";
	libraryName = GM_getValue("libraryName");
	libraryAvailability = /\d+&nbsp;von&nbsp;\d+/;
	libraryShelfmark = /<TD>209A\/01<\/TD><TD>.*?\$a([^$<]*)/i;
	notFound = /Es wurde nichts gefunden/;
	break;

    case 'FHH':
	libraryUrlPatternA = "http://opac.tib.uni-hannover.de/DB=4/LNG=DU/CMD?ACT=SRCHA&PRS=PP%7F&TRM=num+";
	libraryUrlPatternB = "http://opac.tib.uni-hannover.de/DB=4/LNG=DU/CMD?ACT=SRCHA&IKT=1016&SRT=YOP&TRM=num+";
	libraryName = GM_getValue("libraryName");
	libraryAvailability = /\d+&nbsp;von&nbsp;\d+/;
	libraryShelfmark = /<TD>209A\/01<\/TD><TD>.*?\$a([^$<]*)/i;
	notFound = /Es wurde nichts gefunden/;
	break;

    case 'SBB-PK':
	libraryUrlPatternA = "http://stabikat.sbb.spk-berlin.de/DB=1/CMD?ACT=SRCHA&PRS=PP%7F&SRT=YOP&TRM=xnum+";
	libraryUrlPatternB = "http://stabikat.sbb.spk-berlin.de/DB=1/CMD?ACT=SRCHA&IKT=1016&SRT=YOP&TRM=xnum+";
	libraryName = GM_getValue("libraryName");
	libraryAvailability = /\d+&nbsp;von&nbsp;\d+/;
	libraryShelfmark = /<TD>209A\/01<\/TD><TD>.*?\$a([^$<]*)/i;
	notFound = /Es wurde nichts gefunden/;
	break;
    }

// Linkersetzung
//
// Da Autolink keine Links verarbeitet, muessen Links, 
// die eine ISBN enthalten, zunaechst durch ihren Linktext
// ersetzt werden. Pruefung auf Validitaet der ISBN kann an
// dieser Stelle noch unterbleiben.

// Regexp zur Ermittlung moeglicher ISBN-Kandidaten
// (zuerst Prüfung auf ISBN13 anschließend auf ISBN10
var patternISBN = /(97[89][\- ]?[\d\- ]{9,11}[\- ]?[\dxX]|[\d][\- \d]{8,10}[\- ]?[\- ]?[\dxX])/;

var allLinks = document.getElementsByTagName("a");
// alert(allLinks.length); // Fuer Debugging: Ausgabe Anzahl Links

var link = "";

for (var i = allLinks.length - 1; i >=0; i--)
    {
	link = allLinks[i];
	if (patternISBN.exec(link.textContent)){
	    // Linkersetzung
	    link.parentNode.replaceChild(document.createTextNode(link.textContent), link);

	    // // Alternativ zur Linkersetzung: Einfügen eines zusätzlichen Links
	    // link.parentNode.appendChild(document.createTextNode(link.textContent), link);
	}
    }
//
// Ende vorsorgliche Linkersetzung
//

var page = '';
var counter = 0;

const timeBefore = new Date();

/***********************************
 *             Filters             *
 ***********************************/

// This functions takes a string containing
// a candidate for ISBN (ISBN-10 or ISBN-13) and returns
// true if it's valid or false if it's invalid.

function validateISBN(isbn) {
    var isbnTest = ISBN.parse(isbn);
    if (isbnTest == null){
	return false;
    }
    if (isbnTest.isIsbn10()){
	return true;
    }
    else if (isbnTest.isIsbn13()){
	return true;
    }
    return false;
}

// No change of Autolink algorithm although only one filter needed

const filters = [
		 {
		     name: "ISBN --> TIB/UB",
		     regexp: /\b(97[89][\- ]?[\d\- ]{9,11}[\- ]?[\dxX]|[\d][\- \d]{8,10}[\- ]?[\- ]?[\dxX])/g,
		     href: function(match) {
			 var isbx = alphanumerics(match[1]);
			 if (validateISBN(isbx) == true){
			     return libraryUrlPatternB + ISBN.asIsbn13(alphanumerics(match[1])) + "+or+" + ISBN.asIsbn10(alphanumerics(match[1])) + "&sourceid=autolink_tibub_tempelb";}
		     }
		 }
		 ];

/***********************************
 *  Helper function for filters   *
 ***********************************/

function alphanumerics(s)
{
    return s.replace(/[^0-9a-z]/ig, "");
}

/***********************************
 *           Link styling          *
 ***********************************/
    
/*

  You can make links generated by AutoLink look different from normal links
  by editing styleLink below and/or by setting up user style sheet rules.
  
  Example: on squarefree.com, make autolinked plain text links orange. (Firefox trunk only.)
  
  @-moz-document domain(squarefree.com) { 
  .autolink-plain-text-link { color: orange ! important; }
  }
      
*/

function styleLink(a, filter, color)
{
    a.style.border = "1px solid " + color;
    a.style.padding ="1px";
    a.target = "_blank";
}

/***********************************
 *           Fix filters           *
 ***********************************/

function fixFilters()
{
    var i, r;
    for (i = 0; r = filters[i]; ++i) {
	// lowercase, and replace each run of non-alphanumerics with a single hyphen
	r.classNamePart = r.name.toLowerCase().replace(/[^0-9a-z]+/ig, "-");
	if(!r.regexp.global)
	    alert("AutoLink-Filter " + r.name + " ist nicht als global definiert! Das gibt Probleme!!!");
    }
}
fixFilters();

/***********************************
 *      When and where to run      *
 ***********************************/

var moddingDOM = false;

window.addEventListener("load", init, false);
function init(rightaway)
{
    document.addEventListener("DOMNodeInserted", nodeInserted, false);
    if (rightaway)
	go(document.body);
    else
	window.setTimeout(go, 100, document.body);
}

// This makes it work at Gmail.
// 20% performance penalty on a plain text file with a link on almost every line.
// Tiny performance penalty on pages with few automatically added links.
function nodeInserted(e)
{
    // our own modifications should not trigger this.
    // (we don't want our regular expression objects getting confused)
    // (we want better control over when we recurse)
    
    //GM_log("Inserted: " + e.target);
    
    if (!moddingDOM && e.target.nodeType != 3)
	go(e.target);
}

/***********************************
 *          DOM traversal          *
 ***********************************/

/*
  
  This script uses manual DOM traversal, in an iterative way without a stack!
  
  Advantages of snapshot XPath:
  * Much less code
  * 20-40% faster
  * May be possible to get another speed boost by including the regexp in the XPath expression - http://www.developer.com/xml/article.php/10929_3344421_3
  * All the cool people are using it
  
  Advantages of manual DOM traversal:
  * Lets us stop+continue (snapshot xpath doesn't let us)
  * Lets us modify DOM in strange ways without worrying.
  * Easier to control which elements we recurse into.
  
  */


// Ignore all children of these elements.
const skippedElements = { 
    a:        true, // keeps us from screwing with existing links. keeps us from recursing to death :)
    noscript: true, // noscript has uninterpreted, unshown text children; don't waste time+sanity there.
    head:     true,
    script:   true,
    style:    true,
    textarea: true,
    label:    true,
    select:   true,
    button:   true
};

const gmail = (window.location.host == "gmail.google.com");

function skipChildren(node)
{
    if (node.tagName)  // !
	{
	    if (skippedElements[node.tagName.toLowerCase()]) {
		return true;
	    }
	    
	    if (gmail) {
		if (node.className == "ac") // gmail autocomplete (fake dropdown)
		    return true;
		if (node.className == "ilc sxs") // invite foo to gmail (fake link/button)
		    return true;
	    }
	}
    
    return false;
}

function go(traversalRoot)
{
    /* some documents don't have document.body - such as XML documents */
    /*    if (traversalRoot == null)
	  return;
    */   
    var m;
    
    // Ensure we're not already in a forbidden element.
    for (m = traversalRoot; m != undefined; m = m.parentNode) {
	if (!m || skipChildren(m)) {
	    return;
	}
    }
    
    // work around bug, or in case previous user scripts did crazy stuff
    traversalRoot.normalize();
    
    function cont(n, didChildren)
    {
	var k = 0; // split work into chunks so Firefox doesn't freeze
	var q;
	
	while (n && k < 100)
	    {
		++k;
		
		// Do stuff at this node
		if (!didChildren && n.nodeType == 3) {
		    if((q = runFiltersOnTextNode(n))) {
			n = q[0];
			
			// if there were changes, run filters again on the new text node that's here          
			if (q[1]) 
			    continue;
		    }
		}
		
		// Traverse to the "next" node in depth-first order
		
		if (!n.firstChild)
		    didChildren = true;
		
		if (didChildren && n == traversalRoot)
		    break;
		else if (!didChildren && n.firstChild && !skipChildren(n)) {
		    n = n.firstChild;
		    // didChildren is already false and should stay false
		}
		else {
		    if (n.nextSibling) {
			n = n.nextSibling;
			didChildren = false;
		    }
		    else {
			n = n.parentNode;
			didChildren = true;
		    }
		}
	    } // end while
	
	if (!n) {
	    //GM_log("Odd. traversalRoot was " + traversalRoot);
	}
	else if (n == traversalRoot) {
	    //GM_log("Done");
	    //alert("AutoLink time: " + (new Date() - timeBefore))
	}
	else {
	    // Continue after 10ms.
	    //GM_log("will have to continue");
	    setTimeout(cont, 10, n, didChildren);
	}
	
    } // end function cont
    
    cont(traversalRoot, false);
}

/***********************************
 *         Running filters         *
 ***********************************/

// runFiltersOnTextNode
// Return: node at which to continue traversal, or |null| to mean no changes were made.

function runFiltersOnTextNode(node)
{
    function genLink(filter, match)
    {
	try {
	    return filter.href(match); 
	}
	catch(er) {
	    return "data:text/plain,Error running AutoLink function for filter: " + encodeURIComponent(filter.name) + "%0A%0A" + encodeURIComponent(er);
	}
    }
    
    // Too many variables.  Good hint that I need to split this function up :P
    var source, j, regexp, match, lastLastIndex, k, filter, href, anyChanges; // things
    var used, unused, firstUnused, lastUnused, a, parent, nextSibling; // nodes
    
    source = node.data;
    
    anyChanges = false;
    
    // runFiltersOnTextNode has its own do-too-much-at-once avoider thingie.
    // assumption: if there is one text node with a lot of matches,
    // it's more important to finish quickly than be transparent.
    // (e.g. plain text file FULL of links)
    // assumption: 40 * 100 = 140.
    k=0;
  
    for (j = 0; filter = filters[j]; ++j) {
	regexp = filter.regexp;
    
	if (regexp.test(source)) {
	    
	    parent = node.parentNode;
	    nextSibling = node.nextSibling;
      
	    regexp.lastIndex = 0;
	    firstUnused = null;
      
	    // Optimization from the linkify that came with Greasemonkey(?):
	    // instead of splitting a text node multiple times, take advantage
	    // of global regexps and substring.
	    
	    for (match = null, lastLastIndex = 0; k < 40 && (match = regexp.exec(source)); ) {

		href = genLink(filter, match); 
		
		if (href != null && href != location.href) { 
		    ++k;
		    unused = document.createTextNode(source.substring(lastLastIndex, match.index));
		    if (!anyChanges) {
			anyChanges = true;
			parent.removeChild(node);
			firstUnused = unused;
			moddingDOM = true;
		    }
		    parent.insertBefore(unused, nextSibling);
		    
		    // Abfrage am Katalog der TIB/UB
		    
		    var isbnx = alphanumerics(match[0]);
		    counter++;
		    if (counter == maxisbns +1){
			var check = confirm("Die Seite scheint viele ISBNs zu enthalten.\nEs werden " + maxisbns + " ISBNs am Katalog geprüft.\nBestätigen Sie mit \"ok\", wenn das Skript\nohne Beschränkung weiterlaufen soll.");
			if (!check){
			    exit();
			}
		    }
		    
		    GM_xmlhttpRequest
			({
			    method:'GET',
				url: libraryUrlPatternA + ISBN.asIsbn10(isbnx) + "+OR+" + ISBN.asIsbn13(isbnx),
				onload:function(results)
				{
				    var page = results.responseText;
				    if ( notFound.test(page) )
					{
					    used = document.createTextNode(isbnx + ' FEHLT ' + libraryName);
					    a = document.createElement("a");
					    a.href = href;
					    a.title = "Link eingesetzt von Autolink_TIB/UB";
					    a.className = "autolink autolink-" + filter.classNamePart;
					    
					    styleLink(a, filter, "red");
					    
					    a.appendChild(used);
					    parent.insertBefore(a, nextSibling);
					}
				    else if ( libraryAvailability.test(page) )
					{ 
					    var signatur = libraryShelfmark.exec(page);
					    if (signatur){
						shelfmark = libraryName + " " + signatur[1];
					    }
					    else {
						shelfmark = libraryName + "+";
					    }
					    used = document.createTextNode(isbnx + ' ' + shelfmark);
					    a = document.createElement("a");
					    a.href = href;
					    a.title = "Link eingesetzt von Autolink_TIB/UB";
					    a.className = "autolink autolink-" + filter.classNamePart;
					    styleLink(a, filter, "blue");
					    a.appendChild(used);
					    parent.insertBefore(a, nextSibling);
					}
				    else
					{
					    alert(isbnx + "Sonstiger Fehler?!");
					}
				}
			});
		    lastLastIndex = regexp.lastIndex;
		    if (anyChanges) {
			lastUnused = document.createTextNode(source.substring(lastLastIndex));
			parent.insertBefore(lastUnused, nextSibling);
			moddingDOM = false;
			return [firstUnused, true];
		    }
		    return [node, false];
		}
	    }
	}
    }
    return null;
}

//
// isbn.js
//
// The MIT License
// Copyright (c) 2007, 2010 hetappi <hetappi.pm (a) gmail.com>
//
"use strict";
var ISBN;
(function () {
    ISBN  = {
	VERSION: '0.01',
	GROUPS: {
	    '0': {
		'name': 'English speaking area',
		'ranges': [['00', '19'], ['200', '699'], ['7000', '8499'], ['85000', '89999'], ['900000', '949999'], ['9500000', '9999999']]
	    },
	    '1': {
		'name': 'English speaking area',
		'ranges': [['00', '09'], ['100', '399'], ['4000', '5499'], ['55000', '86979'], ['869800', '998999']]
	    },
	    '4': {
		'name': 'Japan',
		'ranges': [['00','19'], ['200','699'], ['7000','8499'], ['85000','89999'], ['900000','949999'], ['9500000','9999999']]
	    }
	},
	
	isbn: function () {
	    this.initialize.apply(this, arguments);
	},
	
	parse: function(val, groups) {
	    var me = new ISBN.isbn(val, groups ? groups : ISBN.GROUPS);
	    return me.isValid() ? me : null;
	},
	
	hyphenate: function(val) {
	    var me = ISBN.parse(val);
	    return me ? me.isIsbn13() ? me.asIsbn13(true) : me.asIsbn10(true) : null;
	},
	
	asIsbn13: function(val, hyphen) {
	    var me = ISBN.parse(val);
	    return me ? me.asIsbn13(hyphen) : null;
	},
	
	asIsbn10: function(val, hyphen) {
	    var me = ISBN.parse(val);
	    return me ? me.asIsbn10(hyphen) : null;
	}
    };
    
    ISBN.isbn.prototype = {
	isValid: function() {
	    return this.codes && this.codes.isValid;
	},
	
	isIsbn13: function() {
	    return this.isValid() && this.codes.isIsbn13;
	},
	
	isIsbn10: function() {
	    return this.isValid() && this.codes.isIsbn10;
	},
	
	asIsbn10: function(hyphen) {
	    return this.isValid() ? hyphen ? this.codes.isbn10h : this.codes.isbn10 : null;
	},
	
	asIsbn13: function(hyphen) {
	    return this.isValid() ? hyphen ? this.codes.isbn13h : this.codes.isbn13 : null;
	},
	
	initialize: function(val, groups) {
	    this.groups = groups;
	    this.codes = this.parse(val);
	},
	
	merge: function(lobj, robj) {
	    var key;
	    if (!lobj || !robj) {
		return null;
	    }
	    for (key in robj) {
		if (robj.hasOwnProperty(key)) {
		    lobj[key] = robj[key];
		}
	    }
	    return lobj;
	},
	
	parse: function(val) {
	    var ret;
	    // correct for misplaced hyphens
	    // val = val.replace(/ -/,'');
	    ret =
	    val.match(/^\d{9}[\dX]$/) ?
	    this.fill(
		      this.merge({source: val, isValid: true, isIsbn10: true, isIsbn13: false}, this.split(val))) :
	    val.length === 13 && val.match(/^(\d+)-(\d+)-(\d+)-([\dX])$/) ?
	    this.fill({
		    source: val, isValid: true, isIsbn10: true, isIsbn13: false, group: RegExp.$1, publisher: RegExp.$2,
		    article: RegExp.$3, check: RegExp.$4}) :
	    val.match(/^(978|979)(\d{9}[\dX]$)/) ?
	    this.fill(
		      this.merge({source: val, isValid: true, isIsbn10: false, isIsbn13: true, prefix: RegExp.$1},
				 this.split(RegExp.$2))) :
	    val.length === 17 && val.match(/^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/) ?
	    this.fill({
		    source: val, isValid: true, isIsbn10: false, isIsbn13: true, prefix: RegExp.$1, group: RegExp.$2,
		    publisher: RegExp.$3, article: RegExp.$4, check: RegExp.$5}) :
	    null;
	    
	    if (!ret) {
		return {source: val, isValid: false};
	    }
	    
	    return this.merge(ret, {isValid: ret.check === (ret.isIsbn13 ? ret.check13 : ret.check10)});
	},
	
	split: function(isbn) {
	    return (
		    !isbn ?
		    null :
		    isbn.length === 13 ?
		    this.merge(this.split(isbn.substr(3)), {prefix: isbn.substr(0, 3)}) :
		    isbn.length === 10 ?
		    this.splitToObject(isbn) :
		    null);
	},
	
	splitToArray: function(isbn10) {
	    var rec, key, rest, i, m;
	    rec = this.getGroupRecord(isbn10);
	    if (!rec) {
		return null;
	    }
	    
	    for (key, i = 0, m = rec.record.ranges.length; i < m; i += 1) {
		key = rec.rest.substr(0, rec.record.ranges[i][0].length);
		if (rec.record.ranges[i][0] <= key && rec.record.ranges[i][1] >= key) {
		    rest = rec.rest.substr(key.length);
		    return [rec.group, key, rest.substr(0, rest.length - 1), rest.charAt(rest.length - 1)];
		}
	    }
	    return null;
	},
	
	splitToObject: function(isbn10) {
	    var a = this.splitToArray(isbn10);
	    if (!a || a.length !== 4) {
		return null;
	    }
	    return {group: a[0], publisher: a[1], article: a[2], check: a[3]};
	},
	
	fill: function(codes) {
	    var rec, prefix, ck10, ck13, parts13, parts10;
	    
	    if (!codes) {
		return null;
	    }
	    
	    rec = this.groups[codes.group];
	    if (!rec) {
		return null;
	    }
	    
	    prefix = codes.prefix ? codes.prefix : '978';
	    ck10 = this.calcCheckDigit([
					codes.group, codes.publisher, codes.article].join(''));
	    if (!ck10) {
		return null;
	    }
	    
	    ck13 = this.calcCheckDigit([prefix, codes.group, codes.publisher, codes.article].join(''));
	    if (!ck13) {
		return null;
	    }
	    
	    parts13 = [prefix, codes.group, codes.publisher, codes.article, ck13];
	    this.merge(codes, {
		    isbn13: parts13.join(''),
			isbn13h: parts13.join('-'),
			check10: ck10,
			check13: ck13,
			groupname: rec.name
			});
	    
	    if (prefix === '978') {
		parts10 = [codes.group, codes.publisher, codes.article, ck10];
		this.merge(codes, {isbn10: parts10.join(''), isbn10h: parts10.join('-')});
	    }
	    
	    return codes;
	},
	
	getGroupRecord: function(isbn10) {
	    var key;
	    for (key in this.groups) {
		if (isbn10.match('^' + key + '(.+)')) {
		    return {group: key, record: this.groups[key], rest: RegExp.$1};
		}
	    }
	    return null;
	},
	
	calcCheckDigit: function(isbn) {
	    var c, n;
	    if (isbn.match(/^\d{9}[\dX]?$/)) {
		c = 0;
		for (n = 0; n < 9; n += 1) {
		    c += (10 - n) * isbn.charAt(n);
		}
		c = (11 - c % 11) % 11;
		return c === 10 ? 'X' : String(c);
		
	    } else if (isbn.match(/(?:978|979)\d{9}[\dX]?/)) {
		c = 0;
		for (n = 0; n < 12; n += 2) {
		    c += Number(isbn.charAt(n)) + 3 * isbn.charAt(n + 1);
		}
		return String((10 - c % 10) % 10);
	    }
	    
	    return null;
	}
    };
}());

// referred: http://www.isbn-international.org/converter/ranges.htm
// frequently, you need to update the following table. what a nice specification!
// isbn-groups.js
// generated by mkgroups.pl
"use strict";
var ISBN = ISBN || {};
(function () {
    
// referred: http://www.isbn-international.org/converter/ranges.htm
// frequently, you need to update the following table. what a nice specification!
    ISBN.GROUPS_VERSION = '20090504';
    ISBN.GROUPS = {
	"0": {
	    "name": "English speaking area",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "949999"], ["9500000", "9999999"]]
	},
	"1": {
	    "name": "English speaking area",
	    "ranges": [["00", "09"], ["100", "399"], ["4000", "5499"], ["55000", "86979"], ["869800", "998999"]]
	},
	"2": {
	    "name": "French speaking area",
	    "ranges": [["00", "19"], ["200", "349"], ["35000", "39999"], ["400", "699"], ["7000", "8399"], ["84000", "89999"], ["900000", "949999"], ["9500000", "9999999"]]
	},
	"3": {
	    "name": "German speaking area",
	    "ranges": [["00", "02"], ["030", "033"], ["0340", "0369"], ["03700", "03999"], ["04", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "949999"], ["9500000", "9539999"], ["95400", "96999"], ["9700000", "9899999"], ["99000", "99499"], ["99500", "99999"]]
	},
	"4": {
	    "name": "Japan",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "949999"], ["9500000", "9999999"]]
	},
	"5": {
	    "name": "Russian Federation",
	    "ranges": [["00", "19"], ["200", "420"], ["4210", "4299"], ["430", "430"], ["4310", "4399"], ["440", "440"], ["4410", "4499"], ["450", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "909999"], ["91000", "91999"], ["9200", "9299"], ["93000", "94999"], ["9500", "9799"], ["98000", "98999"], ["9900000", "9909999"], ["9910", "9999"]]
	},
	"600": {
	    "name": "Iran",
	    "ranges": [["00", "09"], ["100", "499"], ["5000", "8999"], ["90000", "99999"]]
	},
	"601": {
	    "name": "Kazakhstan",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "7999"], ["80000", "84999"], ["85", "99"]]
	},
	"602": {
	    "name": "Indonesia",
	    "ranges": [["00", "19"], ["200", "799"], ["8000", "9499"], ["95000", "99999"]]
	},
	"603": {
	    "name": "Saudi Arabia",
	    "ranges": [["00", "04"], ["500", "799"], ["8000", "8999"], ["90000", "99999"]]
	},
	"604": {
	    "name": "Vietnam",
	    "ranges": [["0", "4"], ["50", "89"], ["900", "979"], ["9800", "9999"]]
	},
	"605": {
	    "name": "Turkey",
	    "ranges": [["00", "09"], ["100", "399"], ["4000", "5999"], ["60000", "89999"]]
	},
	"606": {
	    "name": "Romania",
	    "ranges": [["0", "0"], ["10", "49"], ["500", "799"], ["8000", "9199"], ["92000", "99999"]]
	},
	"607": {
	    "name": "Mexico",
	    "ranges": [["00", "39"], ["400", "749"], ["7500", "9499"], ["95000", "99999"]]
	},
	"608": {
	    "name": "Macedonia",
	    "ranges": [["0", "0"], ["10", "19"], ["200", "449"], ["4500", "6499"], ["65000", "69999"], ["7", "9"]]
	},
	"609": {
	    "name": "Lithuania",
	    "ranges": [["00", "39"], ["400", "799"], ["8000", "9499"], ["95000", "99999"]]
	},
	"610": {
	    "name": "Thailand",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "8999"], ["90000", "99999"]]
	},
	"611": {
	    "name": "Ukraine",
	    "ranges": [["00", "49"], ["500", "699"], ["7000", "8999"], ["90000", "99999"]]
	},
	"612": {
	    "name": "Peru",
	    "ranges": [["00", "29"], ["300", "399"], ["4000", "4499"], ["45000", "49999"], ["50", "99"]]
	},
	"613": {
	    "name": "Mauritius",
	    "ranges": [["0", "9"]]
	},
	"614": {
	    "name": "Lebanon",
	    "ranges": [["00", "39"], ["400", "799"], ["8000", "9499"], ["95000", "99999"]]
	},
	"615": {
	    "name": "Hungary",
	    "ranges": [["00", "09"], ["100", "499"], ["5000", "7999"], ["80000", "89999"]]
	},
	"7": {
	    "name": "China, People's Republic",
	    "ranges": [["00", "09"], ["100", "499"], ["5000", "7999"], ["80000", "89999"], ["900000", "999999"]]
	},
	"80": {
	    "name": "Czech Republic; Slovakia",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "999999"]]
	},
	"81": {
	    "name": "India",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["900000", "999999"]]
	},
	"82": {
	    "name": "Norway",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "8999"], ["90000", "98999"], ["990000", "999999"]]
	},
	"83": {
	    "name": "Poland",
	    "ranges": [["00", "19"], ["200", "599"], ["60000", "69999"], ["7000", "8499"], ["85000", "89999"], ["900000", "999999"]]
	},
	"84": {
	    "name": "Spain",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["9000", "9199"], ["920000", "923999"], ["92400", "92999"], ["930000", "949999"], ["95000", "96999"], ["9700", "9999"]]
	},
	"85": {
	    "name": "Brazil",
	    "ranges": [["00", "19"], ["200", "599"], ["60000", "69999"], ["7000", "8499"], ["85000", "89999"], ["900000", "979999"], ["98000", "99999"]]
	},
	"86": {
	    "name": "Serbia and Montenegro",
	    "ranges": [["00", "29"], ["300", "599"], ["6000", "7999"], ["80000", "89999"], ["900000", "999999"]]
	},
	"87": {
	    "name": "Denmark",
	    "ranges": [["00", "29"], ["400", "649"], ["7000", "7999"], ["85000", "94999"], ["970000", "999999"]]
	},
	"88": {
	    "name": "Italian speaking area",
	    "ranges": [["00", "19"], ["200", "599"], ["6000", "8499"], ["85000", "89999"], ["900000", "949999"], ["95000", "99999"]]
	},
	"89": {
	    "name": "Korea",
	    "ranges": [["00", "24"], ["250", "549"], ["5500", "8499"], ["85000", "94999"], ["950000", "999999"]]
	},
	"90": {
	    "name": "Netherlands, Belgium (Flemish)",
	    "ranges": [["00", "19"], ["200", "499"], ["5000", "6999"], ["70000", "79999"], ["800000", "849999"], ["8500", "8999"], ["900000", "909999"], ["940000", "949999"]]
	},
	"91": {
	    "name": "Sweden",
	    "ranges": [["0", "1"], ["20", "49"], ["500", "649"], ["7000", "7999"], ["85000", "94999"], ["970000", "999999"]]
	},
	"92": {
	    "name": "International Publishers (Unesco, EU), European Community Organizations",
	    "ranges": [["0", "5"], ["60", "79"], ["800", "899"], ["9000", "9499"], ["95000", "98999"], ["990000", "999999"]]
	},
	"93": {
	    "name": "India",
	    "ranges": [["00", "09"], ["100", "499"], ["5000", "7999"], ["80000", "94999"], ["950000", "999999"]]
	},
	"94": {
	    "name": "Netherlands",
	    "ranges": [["000", "599"], ["6000", "8999"], ["90000", "99999"]]
	},
	"950": {
	    "name": "Argentina",
	    "ranges": [["00", "49"], ["500", "899"], ["9000", "9899"], ["99000", "99999"]]
	},
	"951": {
	    "name": "Finland",
	    "ranges": [["0", "1"], ["20", "54"], ["550", "889"], ["8900", "9499"], ["95000", "99999"]]
	},
	"952": {
	    "name": "Finland",
	    "ranges": [["00", "19"], ["200", "499"], ["5000", "5999"], ["60", "65"], ["6600", "6699"], ["67000", "69999"], ["7000", "7999"], ["80", "94"], ["9500", "9899"], ["99000", "99999"]]
	},
	"953": {
	    "name": "Croatia",
	    "ranges": [["0", "0"], ["10", "14"], ["150", "549"], ["55000", "59999"], ["6000", "9499"], ["95000", "99999"]]
	},
	"954": {
	    "name": "Bulgaria",
	    "ranges": [["00", "29"], ["300", "799"], ["8000", "8999"], ["90000", "92999"], ["9300", "9999"]]
	},
	"955": {
	    "name": "Sri Lanka",
	    "ranges": [["0000", "0999"], ["1000", "1999"], ["20", "54"], ["550", "799"], ["8000", "9499"], ["95000", "99999"]]
	},
	"956": {
	    "name": "Chile",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "9999"]]
	},
	"957": {
	    "name": "Taiwan, China",
	    "ranges": [["00", "02"], ["0300", "0499"], ["05", "19"], ["2000", "2099"], ["21", "27"], ["28000", "30999"], ["31", "43"], ["440", "819"], ["8200", "9699"], ["97000", "99999"]]
	},
	"958": {
	    "name": "Colombia",
	    "ranges": [["00", "56"], ["57000", "59999"], ["600", "799"], ["8000", "9499"], ["95000", "99999"]]
	},
	"959": {
	    "name": "Cuba",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"]]
	},
	"960": {
	    "name": "Greece",
	    "ranges": [["00", "19"], ["200", "659"], ["6600", "6899"], ["690", "699"], ["7000", "8499"], ["85000", "99999"]]
	},
	"961": {
	    "name": "Slovenia",
	    "ranges": [["00", "19"], ["200", "599"], ["6000", "8999"], ["90000", "94999"]]
	},
	"962": {
	    "name": "Hong Kong",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "86999"], ["8700", "8999"], ["900", "999"]]
	},
	"963": {
	    "name": "Hungary",
	    "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["9000", "9999"]]
	},
	"964": {
	    "name": "Iran",
	    "ranges": [["00", "14"], ["150", "249"], ["2500", "2999"], ["300", "549"], ["5500", "8999"], ["90000", "96999"], ["970", "989"], ["9900", "9999"]]
	},
	"965": {
	    "name": "Israel",
	    "ranges": [["00", "19"], ["200", "599"], ["7000", "7999"], ["90000", "99999"]]
	},
	"966": {
    "name": "Ukraine",
    "ranges": [["00", "14"], ["1500", "1699"], ["170", "199"], ["2000", "2999"], ["300", "699"], ["7000", "8999"], ["90000", "99999"]]
	},
	"967": {
	    "name": "Malaysia",
	    "ranges": [["00", "29"], ["300", "499"], ["5000", "5999"], ["60", "89"], ["900", "989"], ["9900", "9989"], ["99900", "99999"]]
	},
	"968": {
	    "name": "Mexico",
	    "ranges": [["01", "39"], ["400", "499"], ["5000", "7999"], ["800", "899"], ["9000", "9999"]]
	},
	"969": {
	    "name": "Pakistan",
	    "ranges": [["0", "1"], ["20", "39"], ["400", "799"], ["8000", "9999"]]
	},
	"970": {
	    "name": "Mexico",
	    "ranges": [["01", "59"], ["600", "899"], ["9000", "9099"], ["91000", "96999"], ["9700", "9999"]]
	},
	"971": {
	    "name": "Philippines",
	    "ranges": [["000", "019"], ["02", "02"], ["0300", "0599"], ["06", "09"], ["10", "49"], ["500", "849"], ["8500", "9099"], ["91000", "99999"]]
	},
	"972": {
	    "name": "Portugal",
	    "ranges": [["0", "1"], ["20", "54"], ["550", "799"], ["8000", "9499"], ["95000", "99999"]]
	},
	"973": { "name": "Romania", "ranges": [["0", "0"], ["100", "169"], ["1700", "1999"], ["20", "54"], ["550", "759"], ["7600", "8499"], ["85000", "88999"], ["8900", "9499"], ["95000", "99999"]]
	},
	"974": { "name": "Thailand", 
		 "ranges": [["00", "19"], ["200", "699"], ["7000", "8499"], ["85000", "89999"], ["90000", "94999"], ["9500", "9999"]] }, "975": { "name": "Turkey", "ranges": [["00000", "00999"], ["01", "24"], ["250", "599"], ["6000", "9199"], ["92000", "98999"], ["990", "999"]]
	},
	"976": {
	    "name": "Caribbean Community",
	    "ranges": [["0", "3"], ["40", "59"], ["600", "799"], ["8000", "9499"], ["95000", "99999"]]
	},
	"977": {
	    "name": "Egypr",
	    "ranges": [["00", "19"], ["200", "499"], ["5000", "6999"], ["700", "999"]]
	},
	"978": {
	    "name": "Nigeria",
	    "ranges": [["000", "199"], ["2000", "2999"], ["30000", "79999"], ["8000", "8999"], ["900", "999"]]
	},
	"979": {
	    "name": "Indonesia",
	    "ranges": [["000", "099"], ["1000", "1499"], ["15000", "19999"], ["20", "29"], ["3000", "3999"], ["400", "799"], ["8000", "9499"], ["95000", "99999"]]
	},
	"980": {
	    "name": "Venezuela",
	    "ranges": [["00", "19"], ["200", "599"], ["6000", "9999"]]
	},
	"981": {
	    "name": "Singapore",
	    "ranges": [["00", "11"], ["1200", "1999"], ["200", "289"], ["2900", "9999"]]
	},
	"982": {
	    "name": "South Pacific",
	    "ranges": [["00", "09"], ["100", "699"], ["70", "89"], ["9000", "9999"]]
	},
	"983": {
	    "name": "Malaysia",
	    "ranges": [["00", "01"], ["020", "199"], ["2000", "3999"], ["40000", "44999"], ["45", "49"], ["50", "79"], ["800", "899"], ["9000", "9899"], ["99000", "99999"]]
	},
  "984": {
      "name": "Bangladesh",
      "ranges": [["00", "39"], ["400", "799"], ["8000", "8999"], ["90000", "99999"]]
  },
	"985": {
	    "name": "Belarus",
	    "ranges": [["00", "39"], ["400", "599"], ["6000", "8999"], ["90000", "99999"]]
	},
	"986": {
	    "name": "Taiwan, China",
	    "ranges": [["00", "11"], ["120", "559"], ["5600", "7999"], ["80000", "99999"]]
	},
	"987": {
	    "name": "Argentina",
	    "ranges": [["00", "09"], ["1000", "1999"], ["20000", "29999"], ["30", "49"], ["500", "899"], ["9000", "9499"], ["95000", "99999"]]
	},
	"988": {
	    "name": "Hongkong",
	    "ranges": [["00", "16"], ["17000", "19999"], ["200", "799"], ["8000", "9699"], ["97000", "99999"]]
	},
	"989": {
	    "name": "Portugal",
	    "ranges": [["0", "1"], ["20", "54"], ["550", "799"], ["8000", "9499"], ["95000", "99999"]]
	},
	"9933": {
	    "name": "Syria",
	    "ranges": [["0", "0"], ["10", "39"], ["400", "899"], ["9000", "9999"]]
	},
	"9934": {
	    "name": "Latvia",
	    "ranges": [["0", "0"], ["10", "49"], ["500", "799"], ["8000", "9999"]]
	},
	"9935": {
	    "name": "Iceland",
	    "ranges": [["0", "0"], ["10", "39"], ["400", "899"], ["9000", "9999"]]
	},
	"9936": {
	    "name": "Afghanistan",
	    "ranges": [["0", "1"], ["20", "39"], ["400", "799"], ["8000", "9999"]]
	},
	"9937": {
	    "name": "Nepal",
	    "ranges": [["0", "2"], ["30", "49"], ["500", "799"], ["8000", "9999"]]
	},
	"9938": {
	    "name": "Tunisia",
	    "ranges": [["00", "79"], ["800", "949"], ["9500", "9999"]]
	},
	"9939": {
	    "name": "Armenia",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "899"], ["9000", "9999"]]
	},
	"9940": {
	    "name": "Montenegro",
	    "ranges": [["0", "1"], ["20", "49"], ["500", "899"], ["9000", "9999"]]
	},
	"9941": {
	    "name": "Georgia",
	    "ranges": [["0", "0"], ["10", "39"], ["400", "899"], ["9000", "9999"]]
	},
	"9942": {
	    "name": "Ecuador",
	    "ranges": [["00", "89"], ["900", "994"], ["9950", "9999"]]
	},
	"9943": {
	    "name": "Uzbekistan",
	    "ranges": [["00", "29"], ["300", "399"], ["4000", "9999"]]
	},
	"9944": {
	    "name": "Turkey",
	    "ranges": [["0", "2"], ["300", "499"], ["5000", "5999"], ["60", "89"], ["900", "999"]]
	},
	"9945": {
	    "name": "Dominican Republic",
	    "ranges": [["00", "00"], ["010", "079"], ["08", "39"], ["400", "569"], ["57", "57"], ["580", "849"], ["8500", "9999"]]
	},
	"9946": {
	    "name": "Korea, P.D.R.",
	    "ranges": [["0", "1"], ["20", "39"], ["400", "899"], ["9000", "9999"]]
	},
	"9947": {
	    "name": "Algeria",
	    "ranges": [["0", "1"], ["20", "79"], ["800", "999"]]
	},
	"9948": {
	    "name": "United Arab Emirates",
	    "ranges": [["00", "39"], ["400", "849"], ["8500", "9999"]]
	},
	"9949": {
	    "name": "Estonia",
	    "ranges": [["0", "0"], ["10", "39"], ["400", "899"], ["9000", "9999"]]
	},
	"9950": {
	    "name": "Palestine",
	    "ranges": [["00", "29"], ["300", "840"], ["8500", "9999"]]
	},
	"9951": {
	    "name": "Kosova",
	    "ranges": [["00", "39"], ["400", "849"], ["8500", "9999"]]
	},
	"9952": {
	    "name": "Azerbaijan",
	    "ranges": [["0", "1"], ["20", "39"], ["400", "799"], ["8000", "9999"]]
	},
	"9953": {
	    "name": "Lebanon",
	    "ranges": [["0", "0"], ["10", "39"], ["400", "599"], ["60", "89"], ["9000", "9999"]]
	},
	"9954": {
	    "name": "Morocco",
	    "ranges": [["0", "1"], ["20", "39"], ["400", "799"], ["8000", "9999"]]
	},
	"9955": {
	    "name": "Lithuania",
	    "ranges": [["00", "39"], ["400", "929"], ["9300", "9999"]]
	},
	"9956": {
	    "name": "Cameroon",
	    "ranges": [["0", "0"], ["10", "39"], ["400", "899"], ["9000", "9999"]]
	},
	"9957": {
	    "name": "Jordan",
	    "ranges": [["00", "39"], ["400", "699"], ["70", "84"], ["8500", "9999"]]
	},
	"9958": {
	    "name": "Bosnia and Herzegovina",
	    "ranges": [["0", "0"], ["10", "49"], ["500", "899"], ["9000", "9999"]]
	},
	"9959": {
	    "name": "Libya",
	    "ranges": [["0", "1"], ["20", "79"], ["800", "949"], ["9500", "9999"]]
	},
	"9960": {
	    "name": "Saudi Arabia",
	    "ranges": [["00", "59"], ["600", "899"], ["9000", "9999"]]
	},
	"9961": {
	    "name": "Algeria",
	    "ranges": [["0", "2"], ["30", "69"], ["700", "949"], ["9500", "9999"]]
	},
	"9962": {
	    "name": "Panama",
	    "ranges": [["00", "54"], ["5500", "5599"], ["56", "59"], ["600", "849"], ["8500", "9999"]]
	},
	"9963": {
	    "name": "Cyprus",
	    "ranges": [["0", "2"], ["30", "54"], ["550", "749"], ["7500", "9999"]]
	},
	"9964": {
	    "name": "Ghana",
	    "ranges": [["0", "6"], ["70", "94"], ["950", "999"]]
	},
	"9965": {
	    "name": "Kazakhstan",
	    "ranges": [["00", "39"], ["400", "899"], ["9000", "9999"]]
	},
	"9966": {
	    "name": "Kenya",
	    "ranges": [["000", "199"], ["20", "69"], ["7000", "7499"], ["750", "959"], ["9600", "9999"]]
	},
	"9967": {
	    "name": "Kyrgyzstan",
	    "ranges": [["00", "39"], ["400", "899"], ["9000", "9999"]]
	},
	"9968": {
	    "name": "Costa Rica",
	    "ranges": [["00", "49"], ["500", "939"], ["9400", "9999"]]
	},
	"9970": {
	    "name": "Uganda",
	    "ranges": [["00", "39"], ["400", "899"], ["9000", "9999"]]
	},
	"9971": {
	    "name": "Singapore",
	    "ranges": [["0", "5"], ["60", "89"], ["900", "989"], ["9900", "9999"]]
	},
	"9972": {
	    "name": "Peru",
	    "ranges": [["00", "09"], ["1"], ["200", "249"], ["2500", "2999"], ["30", "59"], ["600", "899"], ["9000", "9999"]]
	},
	"9973": {
	    "name": "Tunisia",
	    "ranges": [["00", "05"], ["060", "089"], ["0900", "0999"], ["10", "69"], ["700", "969"], ["9700", "9999"]]
	},
	"9974": {
	    "name": "Uruguay",
	    "ranges": [["0", "2"], ["30", "54"], ["550", "749"], ["7500", "9499"], ["95", "99"]]
	},
	"9975": {
	    "name": "Moldova",
	    "ranges": [["0", "0"], ["100", "399"], ["4000", "4499"], ["45", "89"], ["900", "949"], ["9500", "9999"]]
	},
	"9976": { "name": "Tanzania", "ranges": [["0", "5"], ["60", "89"],
						 ["900", "989"], ["9990", "9999"]] },
	"9977": {
	    "name": "Costa Rica",
	    "ranges": [["00", "89"], ["900", "989"], ["9900", "9999"]]
	},
	"9978": {
	    "name": "Ecuador",
	    "ranges": [["00", "29"], ["300", "399"], ["40", "94"], ["950", "989"], ["9900", "9999"]]
	},
	"9979": {
	    "name": "Iceland",
	    "ranges": [["0", "4"], ["50", "64"], ["650", "659"], ["66", "75"], ["760", "899"], ["9000", "9999"]]
	},
	"9980": {
	    "name": "Papua New Guinea",
	    "ranges": [["0", "3"], ["40", "89"], ["900", "989"], ["9900", "9999"]]
	},
	"9981": {
	    "name": "Morocco",
	    "ranges": [["00", "09"], ["100", "159"], ["1600", "1999"], ["20", "79"], ["800", "949"], ["9500", "9999"]]
	},
	"9982": {
	    "name": "Zambia",
	    "ranges": [["00", "79"], ["800", "989"], ["9900", "9999"]]
	},
	"9983": {
	    "name": "Gambia",
	    "ranges": [["80", "94"], ["950", "989"], ["9900", "9999"]]
	},
	"9984": {
	    "name": "Latvia",
	    "ranges": [["00", "49"], ["500", "899"], ["9000", "9999"]]
	},
	"9985": {
	    "name": "Estonia",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "899"], ["9000", "9999"]]
	},
	"9986": {
	    "name": "Lithuania",
	    "ranges": [["00", "39"], ["400", "899"], ["9000", "9399"], ["940", "969"], ["97", "99"]]
	},
  "9987": {
      "name": "Tanzania",
      "ranges": [["00", "39"], ["400", "879"], ["8800", "9999"]]
  },
	"9988": {
	    "name": "Ghana",
	    "ranges": [["0", "2"], ["30", "54"], ["550", "749"], ["7500", "9999"]]
	},
	"9989": {
	    "name": "Macedonia",
	    "ranges": [["0", "0"], ["100", "199"], ["2000", "2999"], ["30", "59"], ["600", "949"], ["9500", "9999"]]
	},
	"99901": {
	    "name": "Bahrain",
	    "ranges": [["00", "49"], ["500", "799"], ["80", "99"]]
	},
	"99902": {
	    "name": "Gabon - no ranges fixed yet",
	    "ranges": []
	},
	"99903": {
	    "name": "Mauritius",
	    "ranges": [["0", "1"], ["20", "89"], ["900", "999"]]
	},
	"99904": {
	    "name": "Netherlands Antilles; Aruba, Neth. Ant",
	    "ranges": [["0", "5"], ["60", "89"], ["900", "999"]]
	},
	"99905": {
	    "name": "Bolivia",
	    "ranges": [["0", "3"], ["40", "79"], ["800", "999"]]
	},
	"99906": {
	    "name": "Kuwait",
	    "ranges": [["0", "2"], ["30", "59"], ["600", "699"], ["70", "89"], ["9", "9"]]
	},
	"99908": {
	    "name": "Malawi",
	    "ranges": [["0", "0"], ["10", "89"], ["900", "999"]]
	},
	"99909": {
	    "name": "Malta",
	    "ranges": [["0", "3"], ["40", "94"], ["950", "999"]]
	},
	"99910": {
	    "name": "Sierra Leone",
	    "ranges": [["0", "2"], ["30", "89"], ["900", "999"]]
	},
	"99911": {
	    "name": "Lesotho",
	    "ranges": [["00", "59"], ["600", "999"]]
	},
	"99912": {
	    "name": "Botswana",
	    "ranges": [["0", "3"], ["400", "599"], ["60", "89"], ["900", "999"]]
	},
	"99913": {
	    "name": "Andorra",
	    "ranges": [["0", "2"], ["30", "35"], ["600", "604"]]
	},
	"99914": {
	    "name": "Suriname",
	    "ranges": [["0", "4"], ["50", "89"], ["900", "949"]]
	},
	"99915": {
	    "name": "Maldives",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
	},
	"99916": {
	    "name": "Namibia",
	    "ranges": [["0", "2"], ["30", "69"], ["700", "999"]]
	},
	"99917": {
	    "name": "Brunei Darussalam",
	    "ranges": [["0", "2"], ["30", "89"], ["900", "999"]]
	},
	"99918": {
	    "name": "Faroe Islands",
	    "ranges": [["0", "3"], ["40", "79"], ["800", "999"]]
	},
	"99919": {
	    "name": "Benin",
	    "ranges": [["0", "2"], ["300", "399"], ["40", "69"], ["900", "999"]]
	},
	"99920": {
	    "name": "Andorra",
	    "ranges": [["0", "4"], ["50", "89"], ["900", "999"]]
	},
	"99921": {
	    "name": "Qatar",
	    "ranges": [["0", "1"], ["20", "69"], ["700", "799"], ["8", "8"], ["90", "99"]]
	},
	"99922": {
	    "name": "Guatemala",
	    "ranges": [["0", "3"], ["40", "69"], ["700", "999"]]
	},
	"99923": {
	    "name": "El Salvador",
	    "ranges": [["0", "1"], ["20", "79"], ["800", "999"]]
	},
	"99924": {
	    "name": "Nicaragua",
	    "ranges": [["0", "1"], ["20", "79"], ["800", "999"]]
	},
	"99925": {
	    "name": "Paraguay",
	    "ranges": [["0", "3"], ["40", "79"], ["800", "999"]]
	},
	"99926": {
	    "name": "Honduras",
	    "ranges": [["0", "0"], ["10", "59"], ["600", "999"]]
	},
	"99927": {
	    "name": "Albania",
	    "ranges": [["0", "2"], ["30", "59"], ["600", "999"]]
	},
	"99928": {
	    "name": "Georgia",
	    "ranges": [["0", "0"], ["10", "79"], ["800", "999"]]
	},
	"99929": {
	    "name": "Mongolia",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
	},
	"99930": {
	    "name": "Armenia",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
	},
	"99931": {
	    "name": "Seychelles",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
	},
  "99932": {
      "name": "Malta",
      "ranges": [["0", "0"], ["10", "59"], ["600", "699"], ["7", "7"], ["80", "99"]]
  },
	"99933": {
	    "name": "Nepal",
	    "ranges": [["0", "2"], ["30", "59"], ["600", "999"]]
	},
	"99934": {
	    "name": "Dominican Republic",
	    "ranges": [["0", "1"], ["20", "79"], ["800", "999"]]
	},
	"99935": {
	    "name": "Haiti",
	    "ranges": [["0", "2"], ["7", "8"], ["30", "59"], ["600", "699"], ["90", "99"]]
	},
	"99936": {
	    "name": "Bhutan",
	    "ranges": [["0", "0"], ["10", "59"], ["600", "999"]]
	},
	"99937": {
	    "name": "Macau",
	    "ranges": [["0", "1"], ["20", "59"], ["600", "999"]]
	},
	"99938": {
	    "name": "Srpska",
	    "ranges": [["0", "1"], ["20", "59"], ["600", "899"], ["90", "99"]]
	},
	"99939": {
	    "name": "Guatemala",
	    "ranges": [["0", "5"], ["60", "89"], ["900", "999"]]
	},
	"99940": {
	    "name": "Georgia",
	    "ranges": [["0", "0"], ["10", "69"], ["700", "999"]]
	},
	"99941": {
	    "name": "Armenia",
	    "ranges": [["0", "2"], ["30", "79"], ["800", "999"]]
	},
	"99942": {
	    "name": "Sudan",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
	},
	"99943": {
	    "name": "Alsbania",
	    "ranges": [["0", "2"], ["30", "59"], ["600", "999"]]
	},
	"99944": {
	    "name": "Ethiopia",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
	},
	"99945": {
	    "name": "Namibia",
	    "ranges": [["0", "5"], ["60", "89"], ["900", "999"]]
	},
	"99946": {
	    "name": "Nepal",
	    "ranges": [["0", "2"], ["30", "59"], ["600", "999"]]
	},
	"99947": {
	    "name": "Tajikistan",
	    "ranges": [["0", "2"], ["30", "69"], ["700", "999"]]
	},
	"99948": {
	    "name": "Eritrea",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
	},
	"99949": {
	    "name": "Mauritius",
	    "ranges": [["0", "1"], ["20", "89"], ["900", "999"]]
	},
	"99950": {
	    "name": "Cambodia",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
	},
	"99951": {
	    "name": "Congo - no ranges fixed yet",
	    "ranges": []
	},
	"99952": {
	    "name": "Mali",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
	},
	"99953": {
	    "name": "Paraguay",
	    "ranges": [["0", "2"], ["30", "79"], ["800", "999"]]
	},
	"99954": {
	    "name": "Bolivia",
	    "ranges": [["0", "2"], ["30", "69"], ["700", "999"]]
	},
	"99955": {
	    "name": "Srpska",
	    "ranges": [["0", "1"], ["20", "59"], ["600", "899"], ["90", "99"]]
	},
	"99956": {
	    "name": "Albania",
	    "ranges": [["00", "59"], ["600", "999"]]
	},
	"99957": {
	    "name": "Malta",
	    "ranges": [["0", "1"], ["20", "79"], ["800", "999"]]
	},
	"99958": {
	    "name": "Bahrain",
	    "ranges": [["0", "4"], ["50", "94"], ["950", "999"]]
	},
  "99959": {
      "name": "Luxembourg",
      "ranges": [["0", "2"], ["30", "59"], ["600", "999"]]
  },
	"99960": {
	    "name": "Malawi",
	    "ranges": [["0", "0"], ["10", "94"], ["950", "999"]]
	},
	"99961": {
	    "name": "El Salvador",
	    "ranges": [["0", "3"], ["40", "89"], ["900", "999"]]
	},
	"99962": {
	    "name": "Mongolia",
	    "ranges": [["0", "4"], ["50", "79"], ["800", "999"]]
	},
	"99963": {
	    "name": "Cambodia",
	    "ranges": [["00", "49"], ["500", "999"]]
	}
    };
}());

// 
// Ende importiertes isbn.js
//

Because it's your web | Donate

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
