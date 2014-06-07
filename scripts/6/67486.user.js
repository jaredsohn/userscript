// ==UserScript==
// @name          CS DataMiner
// @author        Daniele Binaghi / Dan°
// @version       1.5
// @releasedate   27/03/2010
// @copyright     Released under the CreativeCommons cc by-nc-nd license (http://creativecommons.org/)
// @description   Mines data from group members' profiles
// @namespace     http://userscripts.org/users/126144
// @include       http://www.couchsurfing.org/group.html?gid=*&show_members=Y
// @include       https://www.couchsurfing.org/group.html?gid=*&show_members=Y
// ==/UserScript==
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script for Firefox web-browser!
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CS DataMiner", and click Uninstall.
//
// To activate/deactivate tool functions, go to menu Tools/GreaseMonkey/
// User script commands
//


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Variables section

var _target = window.content.document;
var _url = window.content.location;
var _url = _url.toString();
var _matches;
var gCounter = 0;
var gProfilesTotal = 0;
var _bPaginaAccettata = false;
var gTime = 10;
var s_RE_From = '</div><strong>From '; // reg exp to be searched for
var s_RE_To = '</div><strong>For '; // reg exp to be searched for
var s_RE_Inappropriate = 'This reference is not appropriate.<br'; // reg exp to be searched for
var s_RE_Positive = '>Positive<'; // reg exp to be searched for
var s_RE_Negative = '>Negative<'; // reg exp to be searched for
var refpos = 0;
var refpos_received = 0;
var refpos_left = 0;
var refneg = 0;
var refneg_received = 0;
var refneg_left = 0;
var refneg_percent = 0;
var refinap = 0;
var refinap_received = 0;
var refinap_left = 0;
var refneu = 0;
var refneu_received = 0;
var refneu_left = 0;
var xhReq = false;
var itemStart = 0;
var itemEnd = 0;


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Functions section

//	Javascript trim, ltrim, rtrim
// http://www.webtoolkit.info/
function trim(str, chars, nbsp) {
	return ltrim(rtrim(str, chars, nbsp), chars, nbsp);
}
 
function ltrim(str, chars, nbsp) {
	chars = chars || "\\s";
	if (nbsp) {
		return str.replace(new RegExp("^" + chars + "+", "g"), "");
	} else {
		return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
	}
}
 
function rtrim(str, chars, nbsp) {
	chars = chars || "\\s";
	if (nbsp) {
		return str.replace(new RegExp( chars + "+$", "g"), "");
	} else {	
		return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
	}
}

// estrae elementi dalla pagina in base al tipo di tag e/o di classe
// sorgente: http://blog.stchur.com/2006/11/29/retrieving-elements-by-class-name/
function getElementsByClassName(_className, _startElem, _filterTag) {
   if (typeof _className === 'string') {
		_className = new RegExp('(^| )' + _className + '( |$)');
	}

   // default to the document element if no _startElem is specified
   _startElem = _startElem || document;

   // default to all elements if no _filterTag is specified
   _filterTag = _filterTag || '*';

   var arr = [];    // the array of matched elements that will be returned
   var tags;        // array of all tags to check for class name matches

   // If the browser supports [DOMElement].all, we'll use that. Otherwise
   // we'll use .getElementsByTagName(..), which is really the preferred method.
   if (typeof _startElem.all != 'undefined' && _filterTag == '*') {
   	tags = _startElem.all;
   } else {
      // the W3C way (but won't work for IE less than 6)
      tags = _startElem.getElementsByTagName(_filterTag);
   }

   // loop through the tags array checking for .className matches
   var i, len = tags.length;
   for (i = 0; i < len; i++) {
      var elem = tags[i];
      if (_className.test(elem.className)) {
			arr.push(elem);
		}
   }
   return arr;
}

// This function inserts newNode after referenceNode
function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}	

function HTMLParser(aHTMLString){
	var parseDOM = content.document.createElement('div');
   parseDOM.appendChild(Components.classes["@mozilla.org/feed-unescapehtml;1"].getService(Components.interfaces.nsIScriptableUnescapeHTML).parseFragment(aHTMLString, false, null, parseDOM));
   return parseDOM;
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Code section

//if (!confirm('Start datamining?')) {
//	alert('Canceled by the user');
//} else {
// verifica che la pagina sia di un gruppo o di una ricerca
if (_url.substr(0,43) == 'http://www.couchsurfing.org/group.html?gid=') {
	_bPaginaAccettata = true;
	_bTipoPagina = 'group';
	if (_url.indexOf('show_members=Y') > 0) {
		_bListaCompleta = true;
	} else {
		_bListaCompleta = false;
		if (confirm('Attention: this page does not contain the complete list of members. Load it? (if negative, script will act only on showed members)')) {
			//caricamento nuova pagina
			_url = _url + '&show_members=Y';
			window.content.location.href = _url;
			if (_target.addEventListener) {
				_target.addEventListener("DOMContentLoaded", alert(_target.title), false); // verifica che il dom sia caricato nella finestra target
			}									
		}
	}
} else if (_url.substr(0,45) == 'http://www.couchsurfing.org/mapsurf.html?sid=') {
	_bPaginaAccettata = true;
	_bTipoPagina = 'mapSurf';
}

if (_bPaginaAccettata) {
	var gStart = new Date();
	// cerca profili, e prepara lista
	_matches = getElementsByClassName('profile-image', _target, 'a');
	gProfilesTotal = _matches.length;
	if (gProfilesTotal > 0) {
		// crea tabella e la inserisce dopo mappa
		var txt = "<table id='DADAMI' cellpadding='2' style='width:100%; margin-top:20px; border:1px solid black; text-align:center'>";
		txt = txt + "<tr bgcolor='lightgray'><td colspan='28' id='tblTitle' style='font-weight:bold'><div id='tblStatus' style='float:left'></div>CS DataMiner: results<a href='http://userscripts.org/scripts/show/67486' title='info' target='_blank'><img src='http://s3.amazonaws.com/uso_ss/5523/medium.png?1264513113' alt='info' border='0' width='16px' height='16px' style='float:right'></a></td></tr>";	
		txt = txt + "<tr bgcolor='lightgray'><td colspan='8'>member's bio</td><td colspan='6'>member's CS life</td><td colspan='3'>this group</td><td colspan='4'>couch info</td><td colspan='3'>member's connections</td><td colspan='4'>received references</td></tr>";
		txt = txt + "<tr bgcolor='lightgray'><td>id</td><td>name</td><td>city</td><td>nation</td><td>birthday</td><td>age</td><td>gender</td><td>languages</td><td>mbr name</td><td>mbr since</td><td>last login</td><td>profile hidden</td><td>profile views</td><td>amb</td><td>mod</td><td>join date</td><td>communic. type</td><td>couch</td><td>couch requests</td><td>preferred gender</td><td>maximum surfers</td><td>friends</td><td>groups</td><td>vouches</td><td>pos</td><td>neu</td><td>neg</td><td>ina</td></tr>";
		txt = txt + "</table>";
		var map = document.getElementById('map');
		var theNewDiv = document.createElement('div');
		theNewDiv.innerHTML = txt;
		insertAfter(map,theNewDiv);
		var tabella = document.getElementById('DADAMI');
		var celle = document.getElementsByTagName('td');
		var i = 0;
		
		// individuo cella tabella contenente i dati di quel membro
		for (var ii = 0; ii < celle.length; ii++) {
			if (celle[ii].getAttribute('width') == '25%') {
				var txtCellaSource = celle[ii].innerHTML;
				if (txtCellaSource.match(/href="\/profile.html\?id=(.+?)"/g)) {
					var codice = RegExp.$1;
					// creo nuova riga in tabella
					var row = document.createElement("TR");
					tabella.appendChild(row);
					row.setAttribute("id",codice);
					if (i % 2) {
						row.setAttribute("bgcolor",'#E6CE7B');
					} else {
						row.setAttribute("bgcolor",'#F7F29C');
					}
					row.innerHTML = "<td><font size='1'>" + codice + "</font></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
					// creo riferimento a riga per inserimento dati estratti
					var x = row.cells;
					// nome
					var nome = '&nbsp;';
					if (txtCellaSource.match(/<strong>(?!<a)(.+?)<\/strong>/g)) {
						nome = "<font size='1'><b>" + RegExp.$1 + "</b></font>";
					}
					x[1].innerHTML = nome;
					// città e nazione
					var dati;
					var citta = '&nbsp;';
					var nazione = '&nbsp;';
					if (txtCellaSource.match(/<span style="font-size: 7pt; font-weight: bold;">\s*(.+?)<\/span>/g)) {
						citta = RegExp.$1;
						dati = citta.split(',');
						nazione = "<font size='1'>" + trim(dati[0], '&nbsp;', true) + "</font>";
						citta = "<font size='1'>" + dati[2] + "</font>";
					}
					x[2].innerHTML = citta;
					x[3].innerHTML = nazione;						
					// moderatore
					var moderatore = '&nbsp;';
				 	if (txtCellaSource.match(/<font color="red">moderator<\/font>/g)) {
						moderatore = "<font size='1'>yes</font>";
					}
					x[14].innerHTML = moderatore;
					// joindate
					var joindate = '&nbsp;';
					if (txtCellaSource.match(/Joined:\s*(.+?)</g)) {
						joindate = "<font size='1'>" + RegExp.$1 + "</font>";
					}
					x[15].innerHTML = joindate;
					// comtype - attenzione, funziona solo per moderatori
					var comtype = '-';
					if (txtCellaSource.match(/Communication:\s*(.+?)<\/span>/g)) {
						comtype = "<font size='1'>" + RegExp.$1 + "</font>";
					}
					x[16].innerHTML = comtype;
					// avanzo ed eventualmente esco
					i++;
					if (i == gProfilesTotal) {
						break;
					} 					
				}
			}		
		}			

		var divStatus = document.getElementById('tblStatus');

		xhReq = false;
		try {
		  	xhReq = new XMLHttpRequest();
		} catch (trymicrosoft) { // attempt for IE old versions
		  	try {
		    	xhReq = new ActiveXObject("Msxml2.XMLHTTP");
		  	} catch (othermicrosoft) {
		    	try {
		      	xhReq = new ActiveXObject("Microsoft.XMLHTTP");
		    	} catch (failed) {
		      	xhReq = false;
		    	}
		  	}
		}
		// using XMLHttpRequest
		if (!xhReq) {
		  	alert("Error initializing XMLHttpRequest!");
		}				
		processLinks( _matches, gCounter);
	}
}

function processLinks(sLinks, i) {
	// if the current row does not have a link then recurse
	if (sLinks[gCounter] == null) {
		if (++gCounter < gProfilesTotal) {
			processLinks(_matches, gCounter);
		}
	} else { // process the link on current row
		itemStart = new Date();
		xhReq.open('GET', sLinks[gCounter] + '&user_language=en', true);
		xhReq.onreadystatechange = function() {
			mainDataMining(xhReq);
		}
		xhReq.send(null);
	}
}

function mainDataMining(obj) {
	if (obj.readyState == 4) {
		if (obj.status == 200) {
			// configurazione
			var sResponseText	= obj.responseText;
			//var sResponseDOM = HTMLParser(sResponseText);
			//alert(sResponseDOM.getElementsByTagName('DIV')[0]);
			url = _matches[gCounter].toString();
			var memberID = url.substring(url.indexOf('=')+1);
			var x = document.getElementById(memberID).cells;
			divStatus.innerHTML = "Status: " + (gCounter + 1) + "/" + gProfilesTotal + ", " + Math.round(gTime * (gProfilesTotal - gCounter - 1)/1000) + " seconds left...";
			if (sResponseText.match(/Sorry, this member has selected to have their profile hidden/g)) {
				// hidden profile
				x[11].innerHTML = "<font size='1'>yes</font>";
			} else {
				// estrazione dati dalla pagina
				// birthday
				if (sResponseText.match(/>birthday<\/th><td valign="top">(.+?)</g)) {
					x[4].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// age
				if (sResponseText.match(/>age<\/th><td valign="top">(.+?)<\/td>/g)) {
					x[5].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// gender
				if (sResponseText.match(/>gender<\/th><td valign="top">(.+?)<\/td>/g)) {
					x[6].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// languages
				if (sResponseText.match(/<ul class="languages">(.+?)<\/ul>/g)) {
					var lingue = trim(RegExp.$1);
					lingue = lingue.replace(new RegExp('</li><li>','gi'),',<br>');
					lingue = lingue.replace(new RegExp('<sup>','gi'),' [');
					lingue = lingue.replace(new RegExp('</sup>','gi'),']');
					lingue = lingue.replace(new RegExp('<(\/?)li>','gi'),'');
					lingue = lingue.replace(new RegExp('<(\/?)strong>','gi'),'');
					x[7].innerHTML = "<font size='1'>" + lingue.replace(new RegExp(' ','g'),'&nbsp;') + "</font>";
				}
				// membername
				if (sResponseText.match(/>membername<\/th><td valign="top">(.+?)<\/td>/g)) {
					x[8].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// member since
				if (sResponseText.match(/>member since<\/th><td valign="top">(.+?)<\/td>/g)) {
					x[9].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// last login
				if (sResponseText.match(/>last login<\/a><\/th><td valign="top">(.+?)</g)) {
					x[10].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// profile views
				if (sResponseText.match(/>profile views<\/th><td valign="top">(.+?)<\/td>/g)) {
					x[12].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// ambassador
				if (sResponseText.match(/<a href="http:\/\/www\.couchsurfing\.org\/amb_levels.html#(.+?)">/g)) {
					x[13].innerHTML = "<font size='1'>" + trim(RegExp.$1).replace('_',' ') + "</font>"; 
				}
				// couch availability
				if (sResponseText.match(/>Couch available<\/th><td valign="top">(.+?)<\/td>/g)) {
					x[17].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// couchrequests answered
				if (sResponseText.match(/>CouchSurf requests replied to<\/a><\/font><\/th><td valign="top">(.+?)<\/td>/g)) {
					x[18].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// couch preferred gender
				if (sResponseText.match(/<strong>Preferred Gender:<\/strong>(.+?)</g)) {
					x[19].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// couch max surfers
				if (sResponseText.match(/<strong>Max Surfers Per Night:<\/strong>(.+?)</g)) {
					x[20].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				// friends
				if (sResponseText.match(/<h2 class="profile" id="friends">Friends \((.+?)\)<\/h2>/g)) {
					x[21].innerHTML = "<font size='1'>" + trim(RegExp.$1) + "</font>"; 
				}
				//groups
				var groups = sResponseText.match(/border_group_img/g);
				if (groups) {
					groups = groups.length + 1;
					if (sResponseText.match(/>Active in (.+?) more groups.</g)) {
						groups = groups + RegExp.$1*1;
					}
				} else {
					groups = 0;
				}
				x[22].innerHTML = "<font size='1'>" + groups + "</font>"; 
				// vouches
				if (sResponseText.match(/alt=['"]Vouched for['"] title=['"]Vouched for['"] width=['"]35['"] height=['"]35['"] border=['"]0['"] align=['"]top['"]><\/a><sub>(.+?)<\/sub>/g)) {
					x[23].innerHTML = "<font size='1'>" + RegExp.$1 + "</font>"; 
				} else {
					x[23].innerHTML = "<font size='1'>0</font>"; 
				}
				// not yet implemented
				 
				x[24].innerHTML = "<font size='1'>?</font>";
				x[25].innerHTML = "<font size='1'>?</font>";
				x[26].innerHTML = "<font size='1'>?</font>";
				x[27].innerHTML = "<font size='1'>?</font>";
			}
			var itemEnd= new Date();
			gTime = itemEnd - itemStart;

			// ..and recurse
			if(++gCounter < gProfilesTotal) {
				processLinks(_matches, gCounter);
			} else {
				var gEnd= new Date();
				divStatus.innerHTML = '';
				alert("This is the end\nMy only friend, the end...\n\n" + gCounter + " profiles have been mined for you in " + Math.round((gEnd - gStart) / 1000) + " seconds.");
			}
	 	} else if (xhReq.status == 404) {
      	alert("Requested URL does not exist");
      } else {
      	alert("Error: status code is " + xhReq.status);
      }
	}
}