// ==UserScript==
// @name           GC TB latest history
// @namespace      tblogger.gcinfo.de
// @description    show latest history
// @include        http://www.geocaching.com/track/details.aspx*
// ==/UserScript==

/*
 * Uwe Pfaffmann 2008.11.
 * Version 1.00
 *
 * Changelog:
 * 
 * version 1.0      - initial release
 * 	   1.1      - add some things
 *         1.2      - tracker
 *         1.3      - ignore discovered. 
 * should start before GC Little Helper, if installed 	
 * 
 */  
 
// Url Guid lesen 
var GUID = UrlParm('guid'); 
var TRACKER  = UrlParm('tracker');
 
// Get TBName 
var TBName, TBNameId, newElement;
TBNameId = document.getElementById('ctl00_ContentBody_lbHeading');
TBName = TBNameId.innerHTML;

// History Details
var meinTag, meinTag2
var Datum, CacheOwner, CacheName

// falls GUID nicht gefunden
if ((!GUID) && (TRACKER))
{
  var temp = $('ctl00_ContentBody_lnkPrint');
  var arrGUID = temp.toString().split('=');
  GUID = (arrGUID[1]);
}

// Initial
var Content, History,Land, aLand, Bundesland;

var Content = document.getElementsByClassName('TrackableItemLogTable Table');
if (Content.length > 0) {
	var History = Content[0].getElementsByTagName('tr');

    var dings = History.length;
  	for (var i = 0; i < dings; i++) {
  	
  	  meinTag = History[i].getElementsByTagName('td')[0];
  		Datum = meinTag.innerHTML.substring(meinTag.innerHTML.indexOf(';')+1);
      
      if (History[i].getElementsByTagName('td')[1])
      {
      meinTag2 = History[i].getElementsByTagName('td')[1];
    		
  	  if (meinTag2.getElementsByTagName('a')[0])
      {
        CacheOwner =  meinTag2.getElementsByTagName('a')[0].innerHTML;

        if (meinTag2.getElementsByTagName('a')[1])
        {
			CacheName =  meinTag2.getElementsByTagName('a')[1].innerHTML;

			meinTag3 = History[i].getElementsByTagName('td')[2];
			Land =  meinTag3.innerHTML.replace(/\n/g, "|");
			Land =  Land.replace(/\s+/g, "");
			Bundesland = "";

			// beim Komma splitten falls vorhanden

			if (Land.indexOf(',')>0){
				var Komma =       Land.split(',');
				Land = Komma[1];
				Bundesland_ = Komma[0];
				Bundesland =  Bundesland_.replace("|", "");        
			}
			if (Land.indexOf('-')>0){
			  var km = Land.split('-');
			  Land = km[0];	  
			}

			aLand = Land.split('|');
			// für USA
			if (aLand[0]== "" && aLand[1] != ""){
				aLand[0] =  aLand[1];
			} 
			break;
        }
      }
    }
  }
  } else {
    GM_log("MyClass is empty -- no matching class names");
  }

     

var WatchList = $('ctl00_ContentBody_WatchList');
var NavTable = Get_Parent(WatchList, 'tbody');
var newRow = NavTable.insertRow(Get_Parent(WatchList, 'tr').rowIndex + 1);
newRow.bgColor = '#CDD8E8';    
newRow.fgColor = '#222222'; 
newRow.setAttribute('valign', 'top');

var NewDetailsSpan = document.createElement("span");
var NewDetailsCode = '<tr><td class="TableHeader" ><strong>Last History Details</strong></span></td><tr>';

NewDetailsSpan.innerHTML = NewDetailsCode;
newRow.insertCell(-1).appendChild(NewDetailsSpan);
	
// zweite Zeile
newRow = NavTable.insertRow(Get_Parent(WatchList, 'tr').rowIndex + 2);
newRow.bgColor = '#ffffff';
newRow.fgColor = '#222222';
  
var OwnerNoteSpan = document.createElement("span");
var OwnerNoteCode = '<b>last Owner:</b> '   + CacheOwner + '<br>';
OwnerNoteCode    += '<b>last Cache:</b> '   + CacheName + '<br>';
OwnerNoteCode    += '<b>last Date:</b> '    + Datum + '<br>';
OwnerNoteCode    += '<b>last Country:</b> ' + aLand[0] + '<br>';
if (Bundesland != "") {
 OwnerNoteCode    += '<b>last State:</b> ' + Bundesland + '<br>';
}
OwnerNoteSpan.innerHTML = OwnerNoteCode;
newRow.insertCell(-1).appendChild(OwnerNoteSpan);
	

//  Returns a URL parameter.
//    ParmName - Parameter name to look for.
//    IgnoreCase - (optional) *false, true. Ignore parmeter name case.
//    UrlString - (optional) String to search. If omitted, document URL is used.
function UrlParm(ParmName, IgnoreCase, UrlString) {
	var RegRslt, sc = '', RtnVal = '';
	if (IgnoreCase) {sc = 'i'}
	if(UrlString) {
		var PageUrl = UrlString;
	} else {
		PageUrl = document.location + '';
	}
	var ParmString = PageUrl.substring(PageUrl.indexOf('?') + 1);
	var RegEx1 = new RegExp('(^|&)' + ParmName + '=(.*?)(&|#|$)', sc);
	RegRslt = RegEx1.exec(ParmString);
	if (RegRslt) {RtnVal = RegRslt[2]}
	return RtnVal;
}

	
function $() {
	if (arguments.length==1) {
		return document.getElementById(arguments[0]);
	}
	var elements = [];
	for (var i = 0; i < arguments.length; i++) {
		var e = arguments[i];
		if (typeof e == 'string') {
			e = document.getElementById(e);
		}
		elements.push(e);
	}
	return elements;
}


// return a node's parent of a certain type. if not found, return null
function Get_Parent(thisNode /* ,nodename */ ) {
	if (!thisNode || !thisNode.parentNode) { return thisNode; }
	if (arguments.length < 2) { return thisNode.parentNode; }

	for (var i=1; i < arguments.length; i++) {
		var nodeNameToLookFor = arguments[i].toLowerCase();
		do {
			thisNode = thisNode.parentNode;
		} while (thisNode && (thisNode.nodeName.toLowerCase() !== nodeNameToLookFor));
	}
	return thisNode;
}
