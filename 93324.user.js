// ==UserScript==
// @name		evohack+flyingpi
// @version		5.99.9fluffy_into_oblivion_on_the_p
// @namespace	http://userscripts.org/scripts/source/93324.user.js
// @description	Enchances evo game for the pi guys and girls and anyone else who gets hold of it :)
// @include		http://classic.playevo.com/*
// @include		http://beta.classic.playevo.com/*
// @released      2010/08/28 00:55:00
// @frequency     10 hours
// @author		~ravenlord~ (r4v3n10rd@gmail.com) - original 1.0x source
// @author		HETMAN (kanarinios@gmail.com) - upgrades
// @author		mindfox & Fire - upgrades
// @author		MadFrog (mbfrog@gmail.com)
// @author		Roland
// @author		WhyteWolf (whytewolf1@gmail.com)
// @author		Gavry
// @author		Ressol
// @author		Pinky
// @author		Toby-Jug
// @author		Chief Trajan
// @author		TMX (adam@omega.org.uk)
// @author		Birinight
// @author		Fluffy (with some hints and tips from Podd)
// @author		HACKhalo (hackhalotwo@gmail.com)
// @author		SpacePhoenix_
// ==/UserScript==


const SUpE_META=<><![CDATA[
// ==UserScript==
// @name        EvoPlus
// @shortname   EvoHack
// @namespace   tag:GasBuddyPhilly@yahoo.com,2008-05:monkey
// @description Template for constructing self-updating user scripts.
// @released    2010/08/28 00:55:00
// @frequency   10 hours
// @releaseURL  http://userscripts.org/scripts/source/93324.user.js
// @scriptURL   http://userscripts.org/scripts/source/93324.user.js
// @include     *
// ==/UserScript==
]]></>.toString();

// ***************************************************************************
// ** Auto Update Code - being tested...
// ***************************************************************************
SUpE_SelfUpdater();
//Self-updater function is copyright <GasBuddyPhilly@yahoo.com>,
// located at <http://userscripts.org/scripts/show/29878>,
// and licensed under <http://gnu.org/licenses/gpl-3.0.html>,
// incorporated herein by reference.
function SUpE_SelfUpdater()
{//localizable strings
 const CKNOW='Check Now For ';
 const UPDTE=' Update';
 const SETTT='Set ';
 const UPIVL=' Update Interval';
 const ITAPP='It appears this is the first time you\'ve used\n'+
  'the ';
 const ISDES=' script.\n'+
  'This script is designed to automatically\n'+
  'check for updates every ';
 const CHIVL='.\n'+
  'Would you like to change this interval?'
 const HWLNG='How long would you like the ';
 const WAITB='\n'+
  'script to wait between update checks?\n'+
  'Enter an interval such as "12 hours" or "1 week".';
 const DIDNT='I didn\'t understand that.\n\n';
 const UPIN4='The update interval for the ';
 const REMAI='\n'+
  'script remains set at ';
 const UMAYS='.  You may select\n'+
  '"';
 const FRMTH='" from the\n'+
  '"User Script Commands..." menu at any time\n'+
  'to change this.';
 const THRIS='There is an update available for the\n';
 const GRSCR=' Greasemonkey script.';
 const INSIT='\n'+
  'Would you like to install it?';
 const UWILB='You will be reminded about this update again\n'+
  'in ';
 const THRNO='There is no update available for the\n';
 const SELFU='The self-updater for the ';
 const WASUN='\n'+
  'script was unable to locate any valid update\n'+
  'information.  This could mean that this\n'+
  'computer has lost its Internet connection, or\n'+
  'that the original site for this script has gone\n'+
  'down, moved, or disappeared.\n\n'+
  'This script will check again in '
 //l10n not recommended
 const S_LU='SUpE_LastUpdateCheck';
 const S_UF='SUpE_UpdateFrequency';
 const INVDT='Invalid Date';

 var parms=parseParms(SUpE_META);
 if(!parms.shortname)
 {parms.shortname=parms.name;
 };
 GM_registerMenuCommand
 (SETTT+parms.shortname+UPIVL,
  function()
  {GM_setValue(S_UF,askUF(parms,GM_getValue(S_UF)));
  }
 );
 GM_registerMenuCommand
 (CKNOW+parms.shortname+UPDTE,
  function()
  {parms.m=true;
   doUpCk();
  }
 );
 var LU=new Date(GM_getValue(S_LU,''));
 if(LU.toString()==INVDT)
 {LU=new Date(0);
  GM_setValue(S_LU,LU.toString());
 };
 var UF=GM_getValue(S_UF,'');
 if(!toMillis(UF))
 {if(!confirm(ITAPP+parms.name+ISDES+parms.frequency+CHIVL))
  {UF=parms.frequency;
   GM_setValue(S_UF,UF);
   alert(UPIN4+parms.name+REMAI+UF+UMAYS+SETTT+parms.shortname+UPIVL+
    FRMTH);
  }else
  {UF=askUF(parms,parms.frequency);
   GM_setValue(S_UF,UF);
  };
 };
 if(Number(new Date(LU))+toMillis(UF)<=new Date())
 {doUpCk();
 };
 function doUpCk()
 {LU=new Date();
  GM_setValue(S_LU,LU.toString());
  doXHRs();
 };
 function doXHRs(xhr)
 {var lyn,dte;
  GM_log('pass '+parms.i);
  if(!xhr)
  {GM_log('no response to look at - moving on');
   nextXHR(parms);
  }else
  {GM_log('response received');
   if(!xhr.status)
   {GM_log('no status found in response - moving on');
    nextXHR(parms);
   }else
   {GM_log('status code of "'+xhr.status+'" received');
    if(xhr.status!=200)
    {GM_log('error status received - moving on');
     nextXHR(parms);
    }else
    {GM_log('successful status received');
     if(!xhr.responseText)
     {GM_log('no response text received - moving on');
      nextXHR(parms);
     }else
     {GM_log(xhr.responseText.length+
       ' characters of response text received');
      lyn=xhr.responseText.
       match(/\/\/ \@released\s+([^\r\n<]+)\s*[\r\n<]/);
      if(!lyn||!lyn[1])
      {GM_log('no release date in response text - moving on');
       nextXHR(parms);
      }else
      {dte=new Date(lyn[1]);
       if(dte.toString()==INVDT)
       {GM_log('release date uninterpretable - moving on');
        nextXHR(parms);
       }else
       {GM_log('release date of "'+dte.toString()+
         '" found in response');
        GM_log('comparing to installed release - "'+
         parms.released.toString()+'"');
        if(parms.released<dte)
        {GM_log('release found is newer - '+
         'getting new release from '+parms.scriptURLs[parms.i-1]);
         if(confirm(THRIS+parms.name+GRSCR+INSIT))
         {GM_openInTab(parms.scriptURLs[parms.i-1]);
         }else
         {alert(UWILB+UF+UMAYS+SETTT+parms.shortname+UPIVL+FRMTH);
         };
         //reset for next time (if any)
         parms.i=0;
         parms.m=false;
        }else
        {GM_log('release found is not newer - ending update check');
         if(parms.m)
         {alert(THRNO+parms.name+GRSCR);
         };
         //reset for next time (if any)
         parms.i=0;
         parms.m=false;
        };//end if(parms.released<dte)
       };//end if(dte.toString()==INVDT)
      };//end if(!lyn||!lyn[1])
     };//end if(!xhr.responseText)
    };//end if(xhr.status!=200)
   };//end if(!xhr.status)
  };//end if(!xhr)
 };//end doXHRs()
 function nextXHR(pms)
 {if(pms.releaseURLs[pms.i])
  {GM_log('update check #'+(pms.i+1)+' - checking '+
    pms.releaseURLs[pms.i]);
   GM_xmlhttpRequest
   ({method:            'GET',
     url:               pms.releaseURLs[pms.i],
     headers:
     {'Cache-Control':  'no-cache',
      'Pragma':         'no-cache'
     },
     onerror:           doXHRs,
     onload:            doXHRs
    }
   );
   pms.i++;
  }else
  {GM_log('ran out of places to look for updates');
   if(confirm(SELFU+pms.name+WASUN+UF+CHIVL))
   {UF=askUF(pms,UF);
    GM_setValue(S_UF,UF);
   };
   //reset for next time (if any)
   pms.i=0;
   pms.m=false;
  };
 };

 //subroutines
 function parseParms(metaBlock)
 {var metalines=metaBlock.match(/^\/\/ \@\S+\s+.+$/gm);
  var metaparms=new ParmPack;
  var lineparts,i;
  for(i=0;i<metalines.length;i++)
  {lineparts=metalines[i].match(/^\/\/ \@(\S+)\s+(.+)$/);
   switch(lineparts[1])
   {case 'name':
    case 'shortname':
     metaparms[lineparts[1]]=lineparts[2];
     break;
    case 'released':
     metaparms[lineparts[1]]=new Date(lineparts[2]);
     break;
    case 'frequency':
     if(toMillis(lineparts[2]))
     {metaparms[lineparts[1]]=lineparts[2];
     };
     break;
    case 'releaseURL':
    case 'scriptURL':
     metaparms[lineparts[1]+'s'].push(lineparts[2]);
     break;
   };
  };
  return metaparms;
 };
 function toMillis(lyne)
 {if(!lyne)
  {return null;
  };
  var wurds=lyne.split(/\s+/);
  if(wurds.length!=2)
  {return null;
  };
  switch(wurds[1].toLowerCase())
  {case 'months':
   case 'month':
    wurds[0]*=4.4;//close enough
   case 'weeks':
   case 'week':
    wurds[0]*=7;
   case 'days':
   case 'day':
    wurds[0]*=24;
   case 'hours':

   case 'hour':
    wurds[0]*=60;
   case 'minutes':
   case 'minute':
    return wurds[0]*60*1000;
   default:
    return null;
  };
 };
 function askUF(pms,was)
 {var x=prompt(HWLNG+pms.name+WAITB,was);
  if(x==null)
  {alert(UPIN4+pms.name+REMAI+was+UMAYS+SETTT+pms.shortname+UPIVL+
    FRMTH);
   return was;
  }else
  {while(!toMillis(x))
   {x=prompt(DIDNT+HWLNG+pms.name+WAITB,was);
    if(x==null)
    {alert(UPIN4+pms.name+REMAI+was+UMAYS+SETTT+pms.shortname+UPIVL+
      FRMTH);
     return was;
    };
   };
   return x;
  };
 };

 //constructor
 function ParmPack()
 {this.name=null;
  this.shortname=null;
  this.released=null;
  this.frequency=null;
  this.releaseURLs=[];
  this.scriptURLs=[];
  this.i=0;
  this.m=false;
 };
};

// ***************************************************************************
// ** Global Variables
// ***************************************************************************

const scriptversion = '5.99.9fluffy_into_oblivion_on_the_p';
const scriptversionID = 'evo+ ' + scriptversion;
const scriptTag = 'Beta than a Pi(e)';
GM_log(scriptversionID + " start");

// xscript data sharing
unsafeWindow.evo_plus = new Array();

// page handlers
var pageHandlers = new Array();

var units = new Object(); // units :P
var contents = null; // pointer to the 'content' node in the page

// boosts
const UT_NONE		= 0;
const UT_NATURAL		= 1;
const UT_ENG		= 2;

// max possible boosts
var maxBoosts = new Array();
maxBoosts[UT_NONE]	= 0;
maxBoosts[UT_NATURAL]	= 0.3946625;  //max boost for natural
maxBoosts[UT_ENG]	= 0.33126875; //max boost for eng
unsafeWindow.evo_plus['maxBoosts'] = maxBoosts;

// defense multiplier
var defenseMultiplier = 1.4;

// defender's boost
var defendersBoost = 1.44;

// intrinsic land defense
var landDefense = 80;

// mimimum score ratio for attacks
var minAttack = 0.35;

// user current boosts
var boosts = new Array();
boosts[UT_NONE]    = 0;
boosts[UT_NATURAL] = Number(GM_getValue('boostNat', maxBoosts[UT_NATURAL]));
boosts[UT_ENG]     = Number(GM_getValue('boostEng', maxBoosts[UT_ENG]));
unsafeWindow.evo_plus['boosts'] = boosts;

//base stats
var pMetal = 0, pMineral = 0, pFood = 0; //player's resources
var pRank = null, pScore = null; // player's ranking and score
var eeb = Number(GM_getValue('eeb', 1)); // efficient breeding center ratio

// constants
var FOODCOST = 91; //

// input box borders
var boxBorder = GM_getValue('boxBorder', false);
var boxColour = GM_getValue('boxColour', '1px solid red');

// set MP availability
var allowMP = GM_getValue('allowMP', false);
var tickallowed = GM_getValue('tickallowed', 1);

/*************************************************
 * Begin Fluffy's hack of Ace's Quick Links Code *
 *************************************************/
var quickLinks = new Array();
var quickLinksText = new Array();
// How many links?
numlinks = GM_getValue('NmLnks', 6);

quickLinks[0] = GM_getValue('link1', 'http://playevo.com/_/743766-Evolution-Discussion/view/unread');
quickLinks[1] = GM_getValue('link2', 'http://playevo.com/_/743769-The-Lounge/view/unread');
quickLinks[2] = GM_getValue('link3', 'http://playevo.com/_/794800-Alliance-Declarations-599/view/unread');
for (i=3; i<numlinks; i++) {
	var lnknm = 'link' + (i+1);
	quickLinks[i] = GM_getValue(lnknm, 'http://playevo.com/farty');
}
quickLinksText[0] = GM_getValue('link1text', 'Evo Disc.');
quickLinksText[1] = GM_getValue('link2text', 'Lounge');
quickLinksText[2] = GM_getValue('link3text', 'Alliance Decls.');
for (i=3; i<numlinks; i++) {
	var lnknm = 'link' + (i+1) + 'text';
	quickLinksText[i] = GM_getValue(lnknm, 'Edit me');
}

GM_registerMenuCommand('Edit Quick Links', editQuickLinks, '', '', 'l');
GM_registerMenuCommand('Set Number of Quick Links', setQuickLinksNumber, '', '', 'q');

// Still a slightly untidy approach, but simplified and extended to allow for more links
function editQuickLinks() {
	window.alert('It is recommended to have a separate window or program (like Notepad) open with your links ready to copy and paste if you want to edit more than one link at a time.');
	var ans;
	for (i=0; i<numlinks; i++) {
		ans = prompt('Link Location ' + (i+1) + ' of ' + numlinks + ':\nTo keep default link click Cancel, otherwise type in the link you want and click OK:', quickLinks[i]);
		if (ans != null) {
			quickLinks[i] = ans;
			lnknm = 'link' + (i+1);
			GM_setValue(lnknm, quickLinks[i]);
			ans = prompt('Display Text for Link ' + (i+1) + ' of ' + numlinks + ':\nTo keep default text click Cancel, otherwise type in the description you want and click OK:', quickLinksText[i]);
			if (ans != null) {
				quickLinksText[i] = ans;
				lnknm = 'link' + (i+1) + 'text';
				GM_setValue(lnknm, quickLinksText[i]);
			}
		}
	}
	window.alert('Please reload the page to see the changes.');
}

function setQuickLinksNumber() {
	var newLinks = prompt('How many quick links would you like?', numlinks);
	if ( !isNaN(newLinks)) {
		GM_setValue('NmLnks', newLinks);
		window.alert('Please reload the page to see the changes.');
	}
}

// note: more code in another section to add this QL bar to each page, but it handles arbitrary lengths,
// so no need to modify anything out of this section to add (or remove) Quick Links
/***********************************************
 * End Fluffy's hack of Ace's Quick Links Code *
 ***********************************************/

//
// New update? If so, then tell the user why it was released...
//
thisUpdate = GM_getValue('version', "uh oh");
if (thisUpdate != scriptversion) {
	alert("New update: " + scriptversion + " Fluffy feels that paranoia is required at this point, and may provide some random functionality to evo+ knowing that it won't make a blind bit of difference to him :)");
	GM_setValue('version', scriptversion);
}

// ***************************************************************************
// ** Page handlers
// ***************************************************************************


const boostally = boostally;



(function() {  

contents = document.getElementById("content");
if( contents == null ) return;
var words = new Array();
var bgColors = new Array();
var fgColors = new Array();

/* Add your own "words" to this "list", in the same format.  The next word would be 
 * words[2] = "some word or phrase" 
 * add more colors, too
 * if there is no color corresponding to the word (no bgColors[4] for words[4]) the first (bgColors[0]) will be used
 * The words are should be written in all caps, but the word matching is not case sensitive */
 

words[0] = "[Tas"; 
//bgColors[0] = "blue";
fgColors[0] = "red";

words[1] = "[J4N]";
//bgColors[1] = "black";
fgColors[1] = "yellow";


words[2] = "[TAS]";
//bgColors[2] = "white";
fgColors[2] = "white";

// Leaders
words[3] = "ODYSSEUS1";
bgColors[3] = "black";
fgColors[3] = "blue";

words[4] = "REINCARNATION";
bgColors[4]= "black";
fgColors[4] = "red";

//Officer Corps

words[7] = "INCOGNITO";
bgColors[7] = "White";
fgColors[7] = "Black";

words[8] = "THE1STVOICE";
bgColors[8] = "White";
fgColors[8] = "Red";

// Rebel Guard

words[11] = "ACHILLES1";
bgColors[11] = "Red";
fgColors[11] = "Black";

words[12] = "GEARJAMMER";
bgColors[12] = "White";
fgColors[12] = "Black";

words[13] = "MURF";
bgColors[13] = "White";
fgColors[13] = "Black";

words[14] = "KING STRATOS";
bgColors[14] = "White";
fgColors[14] = "Black";

words[15] = "PIPES6969";
bgColors[15] = "White";
fgColors[15] = "Black";

//Homeland Security
words[20] = "KING WOLF";
bgColors[20] = "White";
fgColors[20] = "Green";

//words[18] = "DRAGONIS";
//bgColors[18] = "White";
//fgColors[18] = "Green";

words[16] = "SKIPPER";
bgColors[16] = "White";
fgColors[16] = "Green";

words[10] = "PANGRA";
bgColors[10] = "White";
fgColors[10] = "Green";

//Logistics
words[9] = "NINJ4";
bgColors[9] = "White";
fgColors[9] = "Red";

words[6] = "BLUEGYPSY";
bgColors[6] = "White";
fgColors[6] = "Red";

//generals
words[21] = "DOOMBASHAR";
bgColors[21] = "White";
fgColors[21] = "Blue";

words[17] = "LEOJ";
bgColors[17] = "White";
fgColors[17] = "Blue";

words[5] = "ELFSTONE";
bgColors[5] = "White";
fgColors[5] = "Blue";

//lulz
words[19] = "[DAMN]";
//bgColors[19] = "White";
fgColors[19] = "pink";





 for(var i = 0; i < words.length; i++) { 
  var xpath = "//a[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'"+words[i]+"')]";
  var results = document.evaluate(xpath, document, null, XPathResult.UNORDERED_SNAPSHOT_TYPE, null);
  var items = new Array();
  var thisItem = results.iterateNext();
  while(thisItem) { items.push(thisItem); thisItem = results.iterateNext(); }

  for(var ii = 0; ii < items.length; ii++) {  
   items[ii].style.backgroundColor = bgColors[i]?bgColors[i]:bgColors[0];
   items[ii].style.color = fgColors[i]?fgColors[i]:fgColors[0];
  }  
 }

})()



//
// ***************************************************************************
// ** Page handlers
// ***************************************************************************
//
regPageHandler(/^\/create/i, function () { evoCreate(1); evoCreate(2); evoCreate(3); });
regPageHandler(/^\/scans/i,  function () { evoCreate(1); });
regPageHandler(/^\/(overview)?$/i,  evoOverview);
regPageHandler(/^\/rd\/d/i,  evoRnD);
regPageHandler(/^\/resources\/overview/i,  evoResources);
regPageHandler(/^\/alliances$/i,  evoAlliances);
regPageHandler(/^\/alliances\/(.*)\/members/i, evoAllianceMembers);
regPageHandler(/^\/(universe\/(home|search)|(\d+(,\d+)*))$/i,  evoUniverse);
regPageHandler(/^\/scans/i, evoScans );
regPageHandler(/^\/scans/i, evoAmpRatio );
regPageHandler(/^\/scans/i, evoMPCheck );
regPageHandler(/^\/fleets/i,  evoFleets );
regPageHandler( /^\/news/i, evoNews );
regPageHandler(/^\/rankings\/continent$/i, evoContRankings);
regPageHandler(/^\/inventory/i,  evoInventory);
regPageHandler(/^\/planet\/home/i, evoPlanetStatus);
regPageHandler(null, allPages);
regPageHandler(/^\/scans/i, evoMasterScan );
regPageHandler(/^\/affairs\/cr/i,  evoAffairs);
regPageHandler(/^\/auctions\/auction_item/i,  evoAuctions );
regPageHandler(/^\/auctions\/view/i,  evoAuctionNext );
regPageHandler(/^\/auctions/i, evoAuctionScan );
regPageHandler(/^\/rankings\/alliance$/i, evoAlliRankings );

// Add stuff to the scans and create pages
// handle each creation table
function evoCreate(tableID) {
	//
	// event handlers
	//
	// refreshes the max numbers when click on "max" or form field change
	function evoUpdateAvailableUnits(table) {
		var tmpMetal = pMetal;
		var tmpMineral = pMineral;
		var rows = table.rows;
		var row, unit, unitsToOrder, maxUnitsAvailable, span;

		// keep data between the two passes
		var createDataArray = new Array();
		function createData(unit, unitsToOrder, isTooMuch) {
			this.unit = unit;
			this.unitsToOrder = unitsToOrder;
			this.isTooMuch = isTooMuch;
		}

		// first pass
		//	- gather all necessary data for second pass
		//	- adjust metal/mineral amount
		for(var i = 2; i < (rows.length - 1); i++) {
			row = rows[i];
			unit = row.cells[1].getElementsByTagName('SPAN')[0].textContent.toLowerCase();
			unit = units[unit];
			
			unitsToOrder = Number(row.cells[3].getElementsByTagName('INPUT')[0].value);
			if( isNaN(unitsToOrder) ) unitsToOrder = 0;
			createDataArray[i] = new createData(unit, unitsToOrder, unitsToOrder > unit.getMaxUnits(tmpMetal, tmpMineral));
			
			if(! createDataArray[i].isTooMuch ) {
				tmpMetal = Math.max(tmpMetal - unitsToOrder * unit.getMetal(), 0);
				tmpMineral = Math.max(tmpMineral - unitsToOrder * unit.getMineral(), 0);
			}
		}
		// second pass
		//	- ui logic
		for(var i = 2; i < (rows.length - 1); i++) {
			row = rows[i];
			maxUnitsAvailable = createDataArray[i].unit.getMaxUnits(tmpMetal, tmpMineral);
			span = row.cells[3].getElementsByTagName('SPAN')[0];
			// have to replace the data of the child text node
			// span.textContent = html would recreate the child text node and cancel the onclick event
			span.firstChild.data = 'max: ' + String(createDataArray[i].isTooMuch ? maxUnitsAvailable : (maxUnitsAvailable + createDataArray[i].unitsToOrder));
			span.style.color = createDataArray[i].isTooMuch ? 'coral' : 'palegoldenrod';
		}
	}
	var onBlur = function() { evoUpdateAvailableUnits(table); };
	var onClick = function(e) {
		if( e.target.tagName.toLowerCase() == 'input' ) return;
		this.getElementsByTagName('input')[0].value = /max: (\d+)/m.exec(this.textContent)[1];
		evoUpdateAvailableUnits(table);
	};

	//
	// Helper functions
	//
	function addHeader(cellIndex, label) {
		var cell = table.rows[0].insertCell(cellIndex);
		cell.innerHTML = label;
		cell.align = "center"; cell.vAlign = "bottom"; cell.width = "60px";
		cell = table.rows[1].insertCell(cellIndex); cell.className = "alt1";
	}
	function addStat(row, cellIndex, base, square, value, boost) {
		var cell = row.insertCell(cellIndex);
		cell.className = row.cells[1].className; cell.align = "center";
		cell.innerHTML = '<span title="Unboosted: ' + base + '">' + ( base * boost ).toFixed(1)
			+ '</span><br /><span class="t_enormous" title="Unboosted: ' + square + '">' + (square*boost*boost).toFixed(0)
			+ '</span><br /><span title="Unboosted: ' + evoNumber2String(value) + '">' + evoNumber2String((value*boost*boost).toFixed(0)) + '</span>';
	}
	//
	// main
	//
	var unit, cell, unitCost, row;
	var table = null;
	var isScanPage = document.location.pathname == '/scans';
	if( isScanPage) 
		xPathTerm = "id('content_pad')/div[3]/div[2]/table[1]";
	else
		xPathTerm = "id('content_pad')/div["+tableID+"]/div[2]/table";
	table = document.evaluate(xPathTerm, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(table == null) return;

	var showstats = !isScanPage && (tableID == 1 | tableID == 2);

	// Efficient breeding center?
	if( showstats && tableID == 1 ) {
		var monkey =  document.evaluate(".//tbody/tr/td[2][./a/span[@class='b' and text()='Monkey']]/text()",
							table, null, XPathResult.STRING_TYPE, null).stringValue;
		if( monkey ) {
			var match = /(\d+) metal, (\d+) mineral each\./.exec(monkey);
			if( match ) {
				eeb = parseInt(match[1]) / units['monkey'].metal;
				GM_setValue('eeb', String(eeb));
			}
		}
	}

	// add creatures/items stats
	if( showstats ) {
		// column headers
		addHeader(4, 'Attack/<br /><strong>Attack<sup>2</sup></strong>/<br /><span title="Attack per 100,000 resources (metal + mineral)">per 100K</span>');
		addHeader(5, 'Defense/<br /><strong>Defense<sup>2</sup></strong>/<br /><span title="Defense per 100,000 resources (metal + mineral)">per 100K</span>');
		addHeader(6, 'Total/<br /><strong>Total<sup>2</sup></strong>/<br /><span title="Attack + Defense per 100,000 resources (metal + mineral)">per 100K</span>');
	}

	// display stats for each item
	for( var i = 2; i < (table.rows.length - 1); i++ ) {
		row = table.rows[i];
		if( showstats ) {
			unit = (row.cells[1].getElementsByTagName('SPAN'))[0].textContent.toLowerCase();
			unit = units[unit];
			unitCost = unit.getMetal() + unit.getMineral();
			var att2 = unit.getAttackScore(1);
			var def2 = unit.getDefenseScore(1);
			var average = att2 + def2;
			var boost = 1 + unit.getBoost();
			addStat(row, 4, unit.attack,  att2, Math.round(att2*100000/unitCost), boost);
			addStat(row, 5, unit.defense, def2, Math.round(def2*100000/unitCost), boost);
			addStat(row, 6, (unit.defense + unit.attack), average, Math.round(average*100000/unitCost), boost);
		}
		// new UI
		cell = document.createElement('SPAN');
		cell.style.display = "block";
		row.cells[3].style.cursor = "pointer";
		cell.textContent = ' '; // forces the creation of a text node
		row.cells[3].appendChild(cell);
		// update hook
		row.cells[3].getElementsByTagName('INPUT')[0].addEventListener('blur', onBlur, false);
		// order max amount hook
		row.cells[3].addEventListener('click', onClick, false);
	}

	// hook up a confirmation dialog on the form
	var youSure = function(e)
		{
			if(! confirm('Are you sure you want to produce these items/creatures?'))
				e.preventDefault();
		}
	var daForm = table.getElementsByTagName('FORM')[0];
	daForm.addEventListener('submit', youSure, false);

	evoUpdateAvailableUnits(table);
}

//
// changes to the overview page
//
function evoOverview() {
	var tick = 60;
	var i, ticks, total;
	var node, match;
	var now = new Date(document.lastModified);
	var searchKey = "separator title";
	now.setUTCMinutes(now.getUTCMinutes() - now.getUTCMinutes() % tick);

	// let's try to grab the player's coords
	node = document.evaluate("//div[@id='navstatus']/strong[1]", document, null, XPathResult.STRING_TYPE, null).stringValue.substring(0,10); //openpanel
	if( node != null && (match = node.match(/(\d*?),(\d*?),(\d*?):\w/)) ) {
		GM_setValue('evoCoords', match[0]);
		unsafeWindow.evo_plus.coords = match[0];
	} else
		GM_log("Unable to find your coordinates :(", 1);

	// look for the fleets status table and show the ETA
	node = document.evaluate(".//div[@id='cfleets']/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( node ) {
		node.rows[0].cells[3].innerHTML += ' - <br/>ETA';
		//node.rows[0].insertCell(4);
		//node.rows[0].cells[4].textContent = 'ETA';
		// let's parse the ETAs...
		for(i = 1; i < node.rows.length; i++) {
			if( node.rows[i].cells.length == 4 ) {
				node.rows[i].insertCell(4);
				if(! isNaN(ticks = parseInt(node.rows[i].cells[3].textContent)) ) {
					var eta = new Date(now.valueOf() + (ticks * tick * 60000));
					node.rows[i].cells[3].innerHTML += "<br/>" + evoFormatNumberZ(eta.getUTCHours(),2) + ":" + evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT";
				}
			}
		}
	}

	// Same for the R&D
	var nodes = document.evaluate(".//div[@id='cdev' or @id='cresearch']/div[2]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for( i = 0; node = nodes.snapshotItem(i); i++ ) {
		node.innerHTML = node.innerHTML.replace(/(\d+)% \((\d+)\/(\d+)\) (\w+\W+)/,
				 function(str, p1, p2, p3, offset, s) {
					var minutes = (Number(p3) - Number(p2)) * tick;
					var eta = new Date(now.valueOf() + (minutes * 60000));
					return p1 + '% (' + p2 + '/' + p3 + ') complete - ETA: ' + evoFormatNumberZ(eta.getUTCHours(),2) + ":" + 
					       evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT" + 
					       (minutes > 1440 ? ' (+' + Math.floor(minutes/1440) + ' day' + ( minutes >= 2880 ? 's' : '' ) + ')' : '')+ "</";
				 });
	}

	// same for the creatures and stuff
	nodes = document.evaluate(".//table[@id='overview_cprod']/tbody/tr[count(td)=2]",
	contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for( i = 0; node = nodes.snapshotItem(i); i++ ) {
		// add a column
		node.insertCell(2);
		if( match = /\d+% [\s\S]*,[\s\S]*(\d+)[\s\S]*/.exec(node.cells[0].innerHTML) ) {
			var tleft = parseInt(node.cells[0].innerHTML.substring(5,8));
			if (tleft > 0) {tleft = -tleft;}
			var eta = new Date(now.valueOf() + (-tleft * tick * 60000));
			node.cells[2].innerHTML = evoFormatNumberZ(eta.getUTCHours(),2) + ":" + evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT";
		}
	}

	// attackers - defenders id('cstatus')/div/span/font[1]
	GM_setValue('allowMP', false);	
	if( node = document.evaluate(".//div[@id='cstatus']/div/span", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ) {
		attackers = new Array();
		defenders = new Array();
		var j, first = 24, last = 0;
		nodes = node.getElementsByTagName('font');
		//get the tick number
		var tick = parseInt(document.evaluate(".//div[@id='tickcount']/acronym", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.textContent);

		for(i=0; i < 24; i++) attackers[i] = defenders[i] = 0;
		for(i = 0; i < nodes.length; i++ ) {
			if( match = /Incoming (\d+) creatures .* they will be here to (ATTACK|DEFEND) in (\d+) tick/.exec(nodes[i].innerHTML) ) {
				var num = parseInt(match[3]);
				if( match[2] == 'ATTACK' ) {
					if (num == 1) {
						GM_setValue('allowMP', true);
						GM_setValue('tickallowed', tick);
					}
					for(j = num; j < num + 3; j++) attackers[j] += parseInt(match[1]);
				} else {
					for(j = num; j < num + 6; j++) defenders[j] += parseInt(match[1]);
				}
				if( j > last ) last = j;
				if( num < first ) first = num;
			} else if( match = /(\d+) creatures (DEFENDING|ATTACKING) .* - (\d+) tick/.exec(nodes[i].innerHTML) ) {
				var num = match[3];
				if( match[2] == 'ATTACKING' ) {
					for(j = 0; j < num; j++) attackers[j] += parseInt(match[1]);
				} else {
					for(j = 0; j < num; j++) defenders[j] += parseInt(match[1]);
				}
				if( num > last ) last = num;
				first = 0;
			}
		}
		var table = document.createElement('table');
		table.className = 't_little';
		table.cellSpacing = 1;
		var rowT = table.insertRow(table.rows.length);
		var rowA = table.insertRow(table.rows.length);
		var rowD = table.insertRow(table.rows.length);
		var cell;
		rowT.innerHTML = "<td class=\"row1 b\">Tick</td>";
		rowA.innerHTML = "<td class=\"row1 b\">Attackers</td>";
		rowD.innerHTML = "<td class=\"row1 b\">Defenders</td>";
		for( i = first; i < last; i++ ) {
			(cell = rowT.insertCell(rowT.cells.length)).textContent = i; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
			(cell = rowA.insertCell(rowA.cells.length)).textContent = attackers[i]; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
			(cell = rowD.insertCell(rowD.cells.length)).textContent = defenders[i]; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
		}
		node.parentNode.insertBefore(table, node.nextSibling);
	}

	//
	// Unallocated land percentage
	//

	var landtable = document.evaluate("id('cland')/div/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	
	var alloc = evoString2Number(landtable.rows[1].cells[1].textContent)+evoString2Number(landtable.rows[2].cells[0].textContent)+evoString2Number(landtable.rows[2].cells[1].textContent);
	var l_min = evoString2Number(landtable.rows[2].cells[1].textContent);
	var l_food = evoString2Number(landtable.rows[1].cells[1].textContent);
	var l_met = evoString2Number(landtable.rows[2].cells[0].textContent);
	var total = alloc+ evoString2Number(landtable.rows[1].cells[0].textContent);
	var metal_per_alloc = Math.round(l_met*100/alloc);
	var mineral_per_alloc = Math.round(l_min*100/alloc);
	var food_per_alloc = Math.round(l_food*100/alloc);
	
	var per = Math.round(( total - alloc ) * 100 / total );
	
	var stMet = "<td style=\"background: #1598FD; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(metal_per_alloc*0.5)+"px;\"></td>";
	var stMin = "<td style=\"background: #29D900; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(mineral_per_alloc*0.5)+"px;\"></td>";
	var stFood = "<td style=\"background: #FD9315; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(food_per_alloc*0.5)+"px;\"></td>";
	landtable.rows[0].cells[1].innerHTML = "<center><div style=\"border: 1px solid rgb(201, 201, 201); float: top; width: 50px; height: 50px;\"><table style=\"background: #C9C9C9; height: "+per+"%; width: 50px;\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr style=\"height : "+Math.round(per*0.5)+"px;\"><td></td></tr><tr>"+stMet+stMin+stFood+"</tr></tbody></table></div></center>"

	var elm = document.createElement('DIV');
	elm.className = 'separator title';
	elm.innerHTML = 'You currently have ' + per + '% Unallocated Land'; 
	landtable.parentNode.appendChild(elm);
	
	//
	// Fleet table
	//
	var pi_monkey = pi_real = 0;
	var cfleettable = document.evaluate("id('ccreat')/div/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (cfleettable != null){
		var lfcost = 0, lfpercent = 0;
		for( i = 0; i < cfleettable.rows.length; i++ ) {
			unit = cfleettable.rows[i].cells[0].innerHTML.toLowerCase();
			unit = unit.substring(0,unit.indexOf("<",unit));
			if( unit != '' ) {

				crittercount = evoString2Number(cfleettable.rows[i].cells[1].textContent);
				lfcost = lfcost + crittercount * ( (units[unit].metal + units[unit].mineral ) / 100 );
				if (unit == "monkey") pi_monkey += crittercount; else pi_real += crittercount;
			}
			if( cfleettable.rows[i].cells.length > 2 ) {
				unit = cfleettable.rows[i].cells[2].innerHTML.toLowerCase();
				unit = unit.substring(0,unit.indexOf("<",unit));
				if( unit != '' ) {

					crittercount = evoString2Number(cfleettable.rows[i].cells[3].textContent);
					lfcost = lfcost + crittercount * ( (units[unit].metal + units[unit].mineral ) / 100 );
					if (unit == "monkey") pi_monkey += crittercount; else pi_real += crittercount;
				}
			}
		}
		pi_html = "<span>Monkeys: " + 
				pi_monkey +
				" / Real Creatures: " +
				pi_real + 
				"</span>";
		if(pi_monkey < (pi_real - 2))
		{
			var _f1 = pi_real - (pi_monkey + 2);
			pi_html += 	"<br /><span style='color:#FF0000'>You are short by " +
						_f1.toString() +
						 " monkeys for 1 decoy fleet</span>";
		}
		if(pi_monkey < (pi_real*2 - 6))
		{
			var _f2 = pi_real*2 - (pi_monkey + 6);
			pi_html += 	"<br /><span style='color:#FF0000'>You are short by " +
						_f2.toString() +
						 " monkeys for 2 decoy fleets</span>";
		}
		if(pi_monkey > (pi_real*2 - 6))
		{
			var _f3 = pi_monkey - (pi_real*2 +6);
			pi_html += "<br />You can launch both fleets and you have left " + _f3 + " monkeys.";
		}
		if(GM_getValue('evo_SE',"no") == "yes") lfcost = lfcost * 0.95;
		var f1 = evoString2Number( cfleettable.rows[0].cells[1].textContent );
		var conc;
		var firstline = document.createElement('DIV');
		var midline = document.createElement('DIV');
		var lastline = document.createElement('DIV');
		var appendline = document.createElement('DIV');
		var cfp = 24 * ( 500 + l_food * 100 );
		var dif = Math.round( ( ( lfcost - cfp ) / 2400) + 0.5 );
		var launchratio = 0;
		if( lfcost != 0 ) lfpercent = Math.round(( cfp / lfcost ) * 100 );
		if( dif > 0 ) {
			var cont = Math.round((pFood - lfcost) / (lfcost - cfp));
			conc = '<span style="color: orange">You can launch daily for ' + cont + ' days!</span><br /><span style="color: red">OR you need '+dif+' more food land, </span>';
		}
		else {
			conc = 'Your food allocation is over your daily needs by '+Math.abs(dif)+' land(s).'; 
		}
		firstline.className = 'separator title';
		midline.className = 'separator title';
		lastline.className = 'separator title';
		appendline.className = 'separator title';
		firstline.innerHTML = 'Food Production / Launch Cost : ' + evoNumber2String(Math.round(cfp)) + ' / ' + evoNumber2String(Math.round(lfcost));
		midline.innerHTML = 'You can launch '+ lfpercent + '% of all of your creatures per day.';
		lastline.innerHTML = conc;
		appendline.innerHTML = pi_html;
		cfleettable.parentNode.appendChild(firstline);
		cfleettable.parentNode.appendChild(midline);
		cfleettable.parentNode.appendChild(lastline);
		cfleettable.parentNode.appendChild(appendline);
	}

	//
	// Defenses
	//
	// The messy bit is because nD's overview page can't handle more than one static type :P
	var attack, defense, nDef, overallDefense = 0, overallAttack = 0;
	var staticDefense = document.evaluate("id('cdef')/div/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (staticDefense != null) {
		var staticsSegment = document.evaluate("id('cdef')/div", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var defLine = staticsSegment.snapshotItem(1).textContent;
		var defs = defLine.split(String.fromCharCode(187));
		for (var i = 1; i< defs.length-1; i++) {
			defs[i] = defs[i].substring(0,defs[i].indexOf("Create",defs[i]));
			defenseType = defs[i].match(/^\D+/,defs[i]);
			defenseType = defenseType.toString();
			nDef = parseInt(defs[i].replace(/^\D+/,""));
			if (defenseType == "Satellite Mark ") {
				defenseType = defenseType + "2";
				nDef = nDef.toString().substring(1);
			}
			unit = units[defenseType.toLowerCase()];
			if ( unit != null ) {
				var row = staticDefense.insertRow(staticDefense.rows.length);
				newCell = row.insertCell(0);
				newCell.className = "row1 b";
				newCell.innerHTML = defenseType;
				newCell = row.insertCell(1);
				newCell.innerHTML = nDef;
			}
		}
		var shrinkToTable = staticsSegment.snapshotItem(1).innerHTML;
		staticsSegment.snapshotItem(1).innerHTML = shrinkToTable.substring(0, shrinkToTable.indexOf("/div>")+5);
		var staticDefense = document.evaluate("id('cdef')/div/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		for( i = 0; i < staticDefense.rows.length; i++ ){
			for( j = 0; j < staticDefense.rows[i].cells.length; j += 2 ){
				defenseType = staticDefense.rows[i].cells[j].textContent.toLowerCase();
				nDef = parseInt(staticDefense.rows[i].cells[j+1].textContent);
				unit = units[defenseType];
				attack = unit.getAttackScore(nDef);
				defense = unit.getDefenseScore(nDef) * defendersBoost;
				staticDefense.rows[i].cells[j+1].title = 'Individual att2/def2 score: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(defense.toFixed(0));
				overallAttack += attack;
				overallDefense += defense;
			}
		}
		var thecell = document.createElement('DIV');
		thecell.className = 'separator title';
		thecell.innerHTML = "Total Att&sup2;: " + evoNumber2String(overallAttack.toFixed(0)) + "<br /> Total Def&sup2;: " + evoNumber2String(overallDefense.toFixed(0));
		staticDefense.parentNode.appendChild(thecell);
	}
	

}

//
// RnD Develop page check for space elevator
//
function evoRnD() {
	if(GM_getValue('evo_SE',"no") != "yes"){
		var rndtable = document.evaluate("id('content_pad')/table/tbody/tr/td[1]/div[2]/div[2]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(rndtable.snapshotItem(0).innerHTML.indexOf("/rd/display/i11") != -1) GM_setValue('evo_SE',"yes");
	}
}

//
// restores the land cost display on the resources page
//
function evoResources() {
	var resourcetable = document.evaluate("id('testtable')", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	evoLandRatio();

	// Max land that can be allocated
	// get current amount of allocated
	if( resourcetable.rows[0].cells[1].innerHTML.match("uninitiated land") != null) var z = 1; else var z = 0;
	var land = evoString2Number(resourcetable.rows[z+3].cells[1].textContent) + evoString2Number(resourcetable.rows[z+3].cells[2].textContent) + evoString2Number(resourcetable.rows[z+3].cells[3].textContent);
	var totcost = 0;
	var nbr =0; var qrty=0;

	while( totcost < pMetal ) {
		qrty++;
		totcost += ((( land -1 ) * 150 ) + 1000 + ( qrty * 150 ));
		if(totcost < pMetal) { nbr++; }
	}
	
	// We need to have unallocated land
	if( z == 1 ) {
		unallocland = resourcetable.rows[0].cells[1].textContent;
		unallocland = unallocland.substr(5,unallocland.length-27);
		if( unallocland < nbr ) nbr = unallocland;
	}else{
		nbr = 0;
	}


	// Add the text
	var newRow = resourcetable.insertRow(resourcetable.rows.length);
	newCell = newRow.insertCell(0);
	newCell.colSpan = '5';
	newCell.className = 'alt1 b';
	newCell.textContent = (nbr == 0) ? 'You cannot currently allocate any land' :'You can currently allocate a maximum of '+nbr+' land';
	newCell.style.textAlign ='center';

	if( resourcetable ) {
		// do we have the graphic?
		if( resourcetable.rows[0].cells[0].innerHTML == 'Unused Land' ) return;

		// onclick function....
		showAllocCost = function(e) {
			var parent = this.parentNode;
			this.style.cursor = 'auto';
			this.style.textDecoration = "none";
			if( parent.nextSibling != null ) return;
			parent = parent.parentNode;
			var elm = document.createElement('IMG');
			elm.src = 'http://ev5.neondragon.net/graphs.land/'+land+'?width=799';
			parent.appendChild(elm);
			elm = document.createElement('BR');
			parent.appendChild(elm);
			elm = document.createElement('SPAN');
			elm.className = 't_little';
			elm.innerHTML = '<SPAN class="red">Red</SPAN> values are the costs in metal to initiate the number of land on the x axis.';
			parent.appendChild(elm);
		};

		var elm = document.createElement('DIV');
		var span = document.createElement('SPAN');
		elm.className = "title";
		span.innerHTML = 'Land Initiation Cost';
		span.style.textDecoration = "underline";
		span.style.cursor = "pointer";
		span.addEventListener('click',showAllocCost, false);
		elm.appendChild(span);
		resourcetable.parentNode.appendChild(elm);
	}
	function evoLandRatio() {
		var fields = resourcetable.rows.length;
		var food = Number(evoString2Number(resourcetable.rows[4].cells[3].textContent));
		var mineral = Number(evoString2Number(resourcetable.rows[4].cells[2].textContent));
		var metal = Number(evoString2Number(resourcetable.rows[4].cells[1].textContent));
		if( isNaN(food) || isNaN(mineral) || isNaN(metal) ) return;

		var gcd = gcf(gcf(metal,mineral),food);
		metal = metal / gcd;
		mineral = mineral / gcd;
		food = food / gcd;
		var row = resourcetable.insertRow(fields);
		row.className = 'row2';
		node = row.insertCell(0);
		node.innerHTML = 'Ratio';
		node.className = 'alt1 b';
		node.style.textAlign = 'right';
		node = row.insertCell(1);
		node.innerHTML = metal + ':' + mineral + ':' + food;
		node.style.textAlign = 'center';
		// give approx. ratio with: 1 <= food <= 2
		if( food > 2 && food < metal && food < mineral ) {
			gcd = Math.pow(2, Math.floor(Math.log(food) / Math.log(2))) // divider
			gcd = food / (food = Math.round(food / gcd)); // refine the divider
			metal = Math.round(metal / gcd);
			mineral = Math.round(mineral / gcd);
			gcd = gcf(gcf(metal,mineral),food);
			food /= gcd;
			mineral /= gcd;
			metal /= gcd;
			node = row.insertCell(2);

			node.innerHTML = '(~' + metal + ':' + mineral + ':' + food + ')';
			node.style.textAlign = 'center';
			node = row.insertCell(3);
			node.colSpan = 2;
		} else {
			node = row.insertCell(2);
			node.colSpan = 3;
		}
	}
}

//
// Alliances page
//
function evoAlliances() {
	var row;
	var rows = document.evaluate(".//table/tbody[tr/td[text()='Alliance Name']]/tr[count(td)=5]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 1; row = rows.snapshotItem(i); i++) {
		row.cells[3].innerHTML = evoNumber2String(row.cells[3].textContent) + '<br /><span style="color: dodgerblue">' + evoNumber2String(Math.ceil(evoString2Number(row.cells[3].textContent)/evoString2Number(row.cells[2].textContent))) + "</span>";
		row.cells[3].style.textAlign = "right";
		row.cells[3].style.padding = "0 2px 0 2px";
	}
}

//
// Alliance members
//
function evoAllianceMembers() {
	var smin = Math.ceil(pScore * minAttack);
	var tmax = Math.floor(pScore / minAttack);
	
	var memberTables = document.evaluate(".//div[@id='alliancememberlist']/div/table", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	// if we have rank edit powers.. we need another snapshot
	if(memberTables.snapshotItem(0) == null) var memberTables = document.evaluate(".//div[@id='alliancememberlist']/form/div/table", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var nbr = 0, snbr = 0, totscore = 0, stotscore = 0;

	var primeTag = unescape( window.location.href.match(/\/alliances\/(.*)\/members$/)[1] ); // get the alliance's tag

	for( var i = 0; memberTable = memberTables.snapshotItem(i); i++ ) {
		// Add some formatting
		memberTable.style.width = '100%';
		memberTable.rows[0].cells[0].style.width = '500px';
		memberTable.rows[0].cells[3].style.textAlign = 'right';
		memberTable.rows[0].style.fontWeight = 'right';
		memberTable.rows[0].style.fontWeight = 'bold';

		for(var j = 1; j < memberTable.rows.length; j++) {
			score = memberTable.rows[j].cells[2];		
			target = evoString2Number(score.textContent);
			if( target < smin ) {
				score.style.color = 'chocolate';
			}else{
				if( target > tmax ) score.style.color ='dodgerblue';
				else score.style.color = 'lime';
				thisTag = ( memberTable.rows[j].cells[0].textContent.match(/\[(.*)\]/) != null ) ? memberTable.rows[j].cells[0].textContent.match(/\[(.*)\]/)[1] : '';
				if( thisTag == primeTag ) {
					totscore += target;
					nbr += 1;
				}else{
					stotscore += target;
					snbr += 1;
				} 
			}
			memberTable.rows[j].cells[2].textContent = evoNumber2String(memberTable.rows[j].cells[2].textContent);
			memberTable.rows[j].cells[3].style.textAlign = 'right';
		}
	}
	// Show the info at the top
	var div = document.evaluate(".//div[@id='alliancememberlist']", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	div.innerHTML = '<div class="separator title">You currently have <span style="color: lime">' + nbr + '</span> Primary targets in this alliance (' + evoNumber2String(totscore) + ')</div><div class="separator title">You currently have <span style="color: orange">' + snbr + '</span> Secondary targets in this alliance (' + evoNumber2String(stotscore) + ')</div><div class="separator title">Total of <span style="color: orangered">' + evoNumber2String(nbr + snbr) + '</span> Targets (' + evoNumber2String(totscore + stotscore) + ')</div>' + div.innerHTML;

	// quick buddy
	// This feature makes a direct request to the server which is deemed illegal
	// neon has however kindly accepted to allow it only for this particular feature
	// since it puts less strain on the server than doing it the regular way
	// AGAIN, THIS IS AN EXCEPTION. DON't USE XmlHttpRequest!!! IT IS ILLEGAL!
	function onBuddy(e) {
		var postData;
		e.preventDefault();
		try {
			postData = e.target.href.match(/\/buddies\/add\?(.*)$/)[1];
		} catch ( e ) {
			return;
		}
		if( count++ ) {
			alert("Wow... take it easy! One buddy at a time, will you?");
			--count;
			return;
		}
		e.target.textContent = "Please wait...";
		e.target.href = '#';
		GM_xmlhttpRequest({

			method: 'POST',
			url: 'http://'+document.location.hostname+'/buddies/add',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: postData,
			onreadystatechange: function(responseDetails) {
				if( responseDetails.readyState == 4 && responseDetails.status == 200 ) {
					e.target.parentNode.removeChild(e.target);
					--count;
				}
			},
			onerror: function(responseDetails) {
				e.target.href = "/buddies/add?" + postData;
				e.target.textContent = ' Add to buddies';
				--count;
			}
		});
	}

	var i, match;
	var re = /javascript:return continentBox\(\d+,(\d+),(\d+),(\d+),(\d+),'(\w)','([^']+)','([^']+)','([^']+)','([^']+)','([^']*)',\s*'([^']*)'/;
	var users = document.evaluate(".//a[@class='cleanlink continfo']", contents, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for(i = 0; node = users.snapshotItem(i); i++) {
		if( match = re.exec(node.getAttribute('onclick')) ) {
			if( match[11] == '' ) {
				var br, td = node.parentNode.parentNode;
				var a = document.createElement('a');
				a.href = '/buddies/add?x=' + match[2] + '&y=' + match[3] + '&z=' + match[4] + '&c=' + match[5] + '&nickname=' + encodeURIComponent(match[6]) + '&label=' + encodeURIComponent(node.textContent.match(/\[([^\]]+)\]/)[1]);
				a.appendChild(document.createTextNode(' Add to buddies'));
				a.addEventListener('click', onBuddy, false);
				if(! (br = node.parentNode.nextSibling) ) td.appendChild(document.createElement('br'));
				else br.nextSibling.textContent += ' ';
				td.appendChild(a);
			}
		}
	}
}

//
// Add some color to the scores on the universe pages
//
function evoUniverse() {
	var smin = Math.ceil(pScore * minAttack);
	var tmax = Math.floor(pScore / minAttack);
	var table = document.getElementById('cont_list');
	if( table != null ) {
		// insert a column to show players' online/offline status
		table.rows[0].insertCell(4);
		table.rows[0].cells[4].textContent = 'Last Seen'; // New heading
		for(var i=2; i < table.rows.length; i++) {
			if( table.rows[i].cells.length < 4 ) continue;

			var cell1 = table.rows[i].cells[1];
			var cell3 = table.rows[i].cells[3];
			
			var matchr = /Last Seen: (?:(\d+) days )?(\d+) hours ago/.exec(cell1.getElementsByTagName("a")[0].getAttribute('onclick'));
			
			//Add an "attack this" button			
			var coords = table.rows[i].cells[0].textContent.split(",");
			coords[0] = coords[0].substring(1);
			coords[2] = coords[2].split(":");
			coords[3] = coords[2][1].substring(0,1);
			coords[2] = coords[2][0];
			table.rows[i].cells[0].innerHTML = "<a href = \"/fleets?x=" + coords[0] + "&y=" + coords[1] + "&z=" + coords[2] + "&c=" + coords[3] + "\">" + table.rows[i].cells[0].innerHTML + "</a>";
			
			table.rows[i].insertCell(4);
			table.rows[i].cells[4].style.textAlign="left";
			// display player's online/offline status
			if( matchr ) {
				// player is not online
				table.rows[i].cells[4].textContent = matchr[0].split(":")[1];
				table.rows[i].cells[4].textContent = table.rows[i].cells[4].textContent.replace(/( days)|( hours)/g,function(thematch){if(thematch==" days") return "d"; else return "h"});
			} else {
				// player is online right now!
				table.rows[i].cells[4].innerHTML = '<span style="color:orangered"> Online!</span>';
			}
			table.rows[i].cells[4].innerHTML = '&nbsp;' + table.rows[i].cells[4].innerHTML; // insert preceding space for readability
						
			// Look for valid targets 
			var target = evoString2Number(cell3.innerHTML);

			if( target < smin ) cell3.style.color = 'chocolate';
			else if( target > tmax ) cell3.style.color ='dodgerblue';
			else cell3.style.color = 'lime';
		}
		var git = document.evaluate(".//table[tbody/tr[1]/td[1][text() = 'Key']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if( git != null ) {
			var d = git.insertRow(4);
			d.className = "lightblue_bg_row2";
			d.innerHTML = '<td>Score colours:</td><td colspan="3" align="center">Players with <span style="color: chocolate">this score</span> can attack you, but you can\'t attack them <img src="http://evolution.neondragon.net/ui/emoticons/sad.png" alt=":(" align="absmiddle" /><br />Players with <span style="color: lime">this score</span> can attack you, and you can also attack them <img src="http://evolution.neondragon.net/ui/emoticons/smile.png" alt=":)" align="absmiddle" /><br />Players with <span style="color: dodgerblue">this score</span> can\'t attack you, but you can attack them <img src="http://evolution.neondragon.net/ui/emoticons/cool.png" alt="B)" align="absmiddle" /></td>';
		}
	}
evoVTF();
evoUniverseNav();
}

//
// Evaluation of att/def on scans
//
function evoScans() {
	var scan = document.evaluate("id('main')/div[7]/strong", contents, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if( !scan ) {return;}
	var table = document.evaluate("./following-sibling::table", scan, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	scan = scan.textContent;
/// NEWS SCAN
	if (scan.indexOf("News Scan") != -1) {
		var ruler = document.evaluate("id('main')/div[7]/table/tbody/tr[1]/td/span", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.textContent;
		ruler = ruler.substring(ruler.indexOf("("),ruler.indexOf("(")+10);
		var RegExpTerm = "//table[@class='t_little']";
		var battleReports = document.evaluate(RegExpTerm, contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		readBR(ruler, battleReports, true);
	}
/// SECTOR SCAN
		if( scan.indexOf("Sector Scan") != -1 ) {
		var defenseData = new Array( new Array( 7, 'fort' ), new Array( 8, 'satellite mark 2' ), new Array( 9, 'nanowire wall' ));
		var attack, defense, overallAttack = 0, overallDefense = 0;
		var row, cells, nDef, unit, newCell;
		var landAmt = 0, nLands, unused = 0;
		var rows = table.rows;
		for( var i = 0; i < defenseData.length; i++ ) {
			cells = rows[defenseData[i][0]].cells;
			if( cells.length == 4 ) {
				// static defenses
				nDef = parseInt(cells[3].innerHTML);
				if( isNaN( nDef )) continue;
				unit = units[defenseData[i][1]];
				attack = unit.getAttackScore(nDef);
				defense = unit.getDefenseScore(nDef) * defendersBoost;
				overallAttack += attack;
				overallDefense += defense;
				cells[3].title = 'Individual attack/defense score: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(defense.toFixed(0));
			}
			if( cells.length == 2 || cells.length == 4 ) {
				// land defense
				nLands = parseInt(cells[1].innerHTML);
				if( !isNaN( nLands )) landAmt += nLands;
			}
		}
		//
		// formatting score number / add attacker's score range
		//
		var resPics = new Array ('metal.png','mineral.png','food.png');
		for( var i = 2; i < 5; i++ ) {
			rows[i].cells[2].innerHTML = '<img src="http://images.neondragon.net/ev5/resources/' + resPics[i-2] + '" border="0" /> ' + rows[i].cells[2].innerHTML;
			rows[i].cells[3].innerHTML = '<span style="color: lightblue">' + evoNumber2String(parseInt(rows[i].cells[3].innerHTML)) + "</span>";
		}
		resPics = null;
		var score = parseInt(rows[2].cells[1].innerHTML);
		rows[2].cells[1].innerHTML = '<span style="color: greenyellow">' + evoNumber2String(score) + "</span>";
		rows[3].cells[0].innerHTML = "Max. Attacker Score";
		rows[3].cells[0].className = "alt1 b";
		rows[3].cells[1].innerHTML = '<span style="color: dodgerblue">' + evoNumber2String(Math.ceil(score/minAttack)) + "</span>";
		rows[4].cells[0].innerHTML = "Min. Attacker Score";
		rows[4].cells[0].className = "alt1 b";
		rows[4].cells[1].innerHTML = '<span style="color: chocolate">' + evoNumber2String(Math.ceil(score*minAttack)) + "</span>";
		unused = parseInt(rows[6].cells[1].innerHTML);
		row = table.insertRow(10);
		newCell = row.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = 'Land ratio/def&sup2;';
		newCell = row.insertCell(1);
		newCell.innerHTML = '<span style="color: gold">' + evoNumber2String(( 100 * landAmt / ( landAmt + unused )).toFixed(2)) + "%</span> / " + 
				    '<span style="color: tomato">' + evoNumber2String((( landAmt + unused ) * ( landDefense * landDefense ) * defenseMultiplier ).toFixed(0)) + "</span>";
		newCell = row.insertCell(2);
		newCell.className = "alt1 b";
		newCell.innerHTML = 'Overall att&sup2;/def&sup2;';
		newCell = row.insertCell(3);
		newCell.title = "This does NOT include the creature stats";
		newCell.innerHTML = '<span style="color: coral">' + evoNumber2String(overallAttack.toFixed(0)) + "</span> / " + 
				    '<span style="color: palegreen">' + evoNumber2String(overallDefense.toFixed(0)) + "</span>";

		for( var i = 6; i <= 9; i++ ) {
			if( rows[i].cells[1] ) rows[i].cells[1].innerHTML = evoNumber2String( parseInt( rows[i].cells[1].innerHTML ));
			if( rows[i].cells[3] ) rows[i].cells[3].innerHTML = evoNumber2String( parseInt( rows[i].cells[3].innerHTML ));
		}
/// CREATURE SCAN
		} else if( scan.indexOf( "Creature Scan" ) != -1 ) {
		var rows = table.rows;
		var row, cells, cell, unit, quantity, boost;
		var attack, defense, defendersDefense, overallAttack = 0, overallDefenseAttacking = 0, overallDefenseDefending = 0;
		var foodCost = 0;
		var engFlag = 0;
		var gCount = 0;
		var boostext = "nano technology";
		for(var i = 2; i < rows.length; i++) {
			row = rows[i];
			cells = row.cells;
			for(var j = 0; j < cells.length; j += 2) {
				unit = units[cells[j].textContent.toLowerCase()];
				cell = cells[j + 1];
				quantity = parseInt(cell.innerHTML);
				if ((unit.unitName == "Demon" || unit.unitName == "Dragon" || unit.unitName == "Anubis Incarnate" || unit.unitName == "Werewolf" || unit.unitName == "Giganotosaurus") && (quantity > 30)) engFlag = 1;
				boost = 1 + unit.getMaxBoosts();
				if (unit.unitName == "Guerrilla ") gCount = quantity;
				attack = unit.getAttackScore(quantity) * boost * boost;
				defense = unit.getDefenseScore(quantity) * boost * boost;
				defendersDefense = defense * defendersBoost;
				overallAttack += attack;
				overallDefenseAttacking += defense;
				overallDefenseDefending += defendersDefense;
				foodCost += unit.getFoodCost(quantity);
				cell.title = "Individual attack/defense; with " + evoNumber2String( unit.getBoost() * 100 ) + "% boost: " +
					     evoNumber2String( attack.toFixed( 0 )) + " / " + evoNumber2String(defense.toFixed(0)) +
					     " (" + evoNumber2String(defendersDefense.toFixed(0)) + ")";
			}
		}
		if (engFlag == 1) {
			overallAttack -= (gCount * 25000000);
			overallDefense -= (gCount * 1.4 * defendersBoost);
			overallAttack = overallAttack * 0.82987196
			overallDefenseAttacking = overallDefenseAttacking * 0.82987196
			overallDefenseDefending = overallDefenseDefending * 0.82987196
			overallAttack += (gCount * 25000000);
			overallDefense += (gCount * 1.4 * defendersBoost);
			boostext = "advanced genetics";
		}
		var newRow = table.insertRow(rows.length);
		var newCell = newRow.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = 'Total att&sup2;/def&sup2;';
		newCell = newRow.insertCell(1);
		newCell.title = "Total attack/defense with assumed " + boostext + " boost";
		newCell.innerHTML = '<span style="color: coral">' + evoNumber2String( overallAttack.toFixed( 0 )) + "</span> / " + 
				    '<span style="color: palegreen">' + evoNumber2String( overallDefenseAttacking.toFixed( 0 )) + "</span> (" + 
				    '<span style="color: turquoise">' + evoNumber2String( overallDefenseDefending.toFixed( 0 )) + "</span> )";
		newCell.colSpan = 5;
		newRow = table.insertRow(rows.length);
		newCell = newRow.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = "Launch cost";
		newCell = newRow.insertCell(1);
		newCell.innerHTML = '<span style="color: pink">' + evoNumber2String( foodCost.toFixed( 0 )) + "</span>";
		newCell.colSpan = 5;
	}
	
}

//
// BR Interpretation Code
//
function readBR( ruler, battleReports, isScan) {
	function addCell( row, cellIndex, attributes, html ) {
		var cell = row.insertCell(cellIndex);
		if( attributes ) for( var i = 0; i < attributes.length; i++) cell.setAttribute(attributes[i][0], attributes[i][1] );
		if( html ) cell.innerHTML = html;
		return cell;
	}
	var battleReport;
	var rows, html, atthtml, defhtml, stathtml, attDefRow, isAttacker, att, myAtt, defAtt, def, myDef, defDef, statAtt, statDef;
	var idx, idx2, idx3, idx4, unittext, unit, quantity, boost, landType, land, myLand, summaryRow, cell, j;
	var advmult = 1;
	if (isScan) {
		start = 1;
	} else {
		start = 0;
	}
	for( var i = start; battleReport = battleReports.snapshotItem(i); i++ ) {
		rows = battleReport.rows;
		attDefRow = rows[0];
		if (attDefRow.textContent.substring(0,4)=="Item") break;
		//establish if player is attacking or defending
		isAttacker = attDefRow.cells[1].textContent.toLowerCase().indexOf(ruler.toLowerCase()) != -1;
	
		idx = isAttacker ? 1 : 2;
		idx2 = isAttacker ? 1 : 6;
		att = 0; attAft = 0;
		def = 0; defAft = 0;
		defAtt = 0; defAttAft = 0;
		defDef = 0; defDefAft = 0;
		myAtt = 0; myAttAft = 0;
		myDef = 0; myDefAft = 0;
		statAtt = 0; statAttAft = 0;
		statDef = 0; statDefAft = 0;
	
		for( j = 3; j < rows.length; j++ ) {
			unittext = rows[j].cells[0].innerHTML.toLowerCase();
			if (unittext == "defence") {unittext = ""; continue;}
			unit = units[unittext];
			if(!unit) {break;}
			//ensure multiplier reduces effectiveness of known advanced genetics creatures.
			if (unit.unitName == "Demon" || unit.unitName == "Dragon" || unit.unitName == "Anubis Incarnate" || unit.unitName == "Werewolf" || unit.unitName == "Giganotosaurus") {
				advmult = 0.82987196;
			} else {
				advmult = 1;
			}	
			//scan for both attacking and defending creatures
			for (idx3 = 1; idx3<7; idx3 +=5) {
				//check to see if the creature list includes "the rulers"
				//so you get the correct critter count
				if (idx3 == idx2) {
					idx4 = rows[j].cells[idx3].innerHTML.indexOf("<br>");
					quantity = parseInt(rows[j].cells[idx3].innerHTML.substring(16,idx4));
					idx4 = rows[j].cells[idx3+4].innerHTML.indexOf("<br>");
					quantAft = parseInt(rows[j].cells[idx3+4].innerHTML.substring(16,idx4));
				} else {
					quantity = parseInt(rows[j].cells[idx3].innerHTML);
					quantAft = parseInt(rows[j].cells[idx3+4].innerHTML);
				}
				boost = 1 + unit.getMaxBoosts();
				//make sure you increase the correct total (attackers or defenders)
				if (idx3 == 1) {
					//if we're scanning the attackers column, only add Critters
					if (unit.isCritter()) {
						//Add attack / defense values for what was there at the start
						att += unit.getAttackScore(quantity) * boost * boost * advmult;
						def += unit.getDefenseScore(quantity)  * boost * boost * advmult;
						//And then for what's left
						attAft += unit.getAttackScore(quantAft) * boost * boost * advmult;
						defAft += unit.getDefenseScore(quantAft)  * boost * boost * advmult;	
					}
				} else {
					//if we're scanning the defenders column, check for critter or static
					if (unit.isCritter()) {
						//Add attack / defense values for what was there at the start
						defAtt += unit.getAttackScore(quantity) * boost * boost * advmult;
						defDef += unit.getDefenseScore(quantity)  * boost * boost * advmult * defendersBoost; //add defenders boost
						//And then for what's left
						defAttAft += unit.getAttackScore(quantAft) * boost * boost * advmult;
						defDefAft += unit.getDefenseScore(quantAft)  * boost * boost * advmult * defendersBoost; //add defenders boost
						
					} else {
						//Add attack / defense values for what was there at the start
						statAtt += unit.getAttackScore(quantity) * boost * boost;
						statDef += unit.getDefenseScore(quantity)  * boost * boost * defendersBoost; //add defenders boost
						//And then for what's left
						statAttAft += unit.getAttackScore(quantAft) * boost * boost;
						statDefAft += unit.getDefenseScore(quantAft)  * boost * boost * defendersBoost; //add defenders boost
					}
				}
			}
			//and don't forget to total up the players creature stats
			if (unit.isCritter()) {
				idx4 = rows[j].cells[idx2].innerHTML.indexOf("<br>");
				quantity = parseInt(rows[j].cells[idx2].innerHTML.substring(idx4 + 4));
				idx4 = rows[j].cells[idx2+4].innerHTML.indexOf("<br>");
				quantAft = parseInt(rows[j].cells[idx2+4].innerHTML.substring(idx4 + 4));
				boost = 1 + unit.getMaxBoosts();
				//Add attack / defense values for what was there at the start
				myAtt += unit.getAttackScore(quantity) * boost * boost * advmult;
				myDef += unit.getDefenseScore(quantity)  * boost * boost * advmult;
				//And then for what's left
				myAttAft += unit.getAttackScore(quantAft) * boost * boost * advmult;
				myDefAft += unit.getDefenseScore(quantAft)  * boost * boost * advmult;
			}
		}
		if (!(isAttacker)) myDef = myDef * defendersBoost;
		summaryRow = battleReport.insertRow(rows.length);
		cell = addCell(summaryRow, 0, new Array(new Array("colSpan", "11"), new Array("height", "3")));
		summaryRow = battleReport.insertRow(rows.length);
		cell = addCell(summaryRow, 0, new Array(new Array("class", "alt1 b")), "Summary");
		//If attacking creatures have been destroyed, give remaining att/def figures
		if (att != attAft) {
			aftAtt = " (Remaining: " +evoNumber2String(attAft.toFixed(0)) + ")";
			aftDef = " (Remaining: " +evoNumber2String(defAft.toFixed(0)) + ")";
		} else {
			aftAtt = "";
			aftDef = "";
		}
		atthtml = "Att: " + evoNumber2String(att.toFixed(0)) + aftAtt + "<br/>Def:  " + evoNumber2String(def.toFixed(0)) + aftDef;
		//If defending creatures have been destroyed, give remaining att/def figures
		if (defAtt != defAttAft) {
			aftAtt = " (Remaining: " +evoNumber2String(defAttAft.toFixed(0)) + ")";
			aftDef = " (Remaining: " +evoNumber2String(defDefAft.toFixed(0)) + ")";
		} else {
			aftAtt = "";
			aftDef = "";
		}
		defhtml = "Att: " + evoNumber2String(defAtt.toFixed(0)) + aftAtt + "<br/>Def: " + evoNumber2String(defDef.toFixed(0)) + aftDef;
		//If statics have been destroyed, give remaining att/def figures
		if (statAtt != statAttAft) {
			aftAtt = " (Remaining: " + evoNumber2String(statAttAft.toFixed(0)) + ")";
			aftDef = " (Remaining: " + evoNumber2String(statDefAft.toFixed(0)) + ")";
		} else {
			aftAtt = "";
			aftDef = "";
		}
		stathtml = "<br/>Static Att: " + evoNumber2String(statAtt.toFixed(0)) + aftAtt + "<br/>Static Def: " + evoNumber2String(statDef.toFixed(0)) + aftDef ;
		if( isAttacker ) {
			html = "Att: " + evoNumber2String(myAtt.toFixed(0)) + " / <b>" + evoNumber2String(att.toFixed(0)) + "</b> (" + (att != 0 ? parseInt(100 * myAtt / att) : 0) + "%)<br/>" + "Def: " + evoNumber2String(myDef.toFixed(0)) + " / <b>" + evoNumber2String(def.toFixed(0)) + "</b> (" + (def != 0 ? parseInt(100 * myDef / def) : 0) + "%)";
			//If your attacking creatures have been destroyed (or just maybe you've caught some defenders), give remaining att/def figures
			if (myAttAft != myAtt) {
				html += "<br/>(Remaining Att: " + evoNumber2String(myAttAft.toFixed(0)) + " / <b>" + evoNumber2String(attAft.toFixed(0)) + "</b> (" + (attAft != 0 ? parseInt(100 * myAttAft / attAft) : 0) + "%))<br/>" + "(Remaining Def: " + evoNumber2String(myDefAft.toFixed(0)) + " / <b>" + evoNumber2String(defAft.toFixed(0)) + "</b> (" + (defAft != 0 ? parseInt(100 * myDefAft / defAft) : 0) + "%)";
			}
			cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "2")), html);
			html = "";
			for( ; j < rows.length - 2; j++ ) {
				if( rows[j].cells[0].innerHTML.indexOf("Land Capture") != -1 ) {
					j++;
					break;
				}
			}
			for( ; j < rows.length - 2; j++) {
				landType = rows[j].cells[0].innerHTML;
				land = rows[j].cells[2].firstChild.innerHTML;
				myLand = rows[j].cells[2].innerHTML.replace(/.*<br>/, "");
				idx = landType.length + (11 - landType.length) * 6;
				landType = (landType + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").substring(0, idx);
				html += landType + ": " + myLand + " / <b>" + land + "</b> (" + parseInt(100 * myLand / land) + "%)<br/>";
			}
			cell = addCell(summaryRow, 2, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "3")), html);
			cell = addCell(summaryRow, 3, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "5")), defhtml + stathtml);
		} else {
			html = "Att: " + evoNumber2String(myAtt.toFixed(0)) + " / <b>" + evoNumber2String(defAtt.toFixed(0)) + "</b> (" + (defAtt != 0 ? parseInt(100 * myAtt / defAtt) : 0) + "%)<br/>" + "Def: " + evoNumber2String(myDef.toFixed(0)) + " / <b>" + evoNumber2String(defDef.toFixed(0)) + "</b> (" + (defDef != 0 ? parseInt(100 * myDef / defDef) : 0) + "%)";
			//If your defending creatures have been destroyed (or just maybe you've caught some attackers), give remaining att/def figures
			if (myAttAft != myAtt) {
				html += "<br/>(Remaining Att: " + evoNumber2String(myAttAft.toFixed(0)) + " / <b>" + evoNumber2String(defAttAft.toFixed(0)) + "</b> (" + (defAttAft != 0 ? parseInt(100 * myAttAft / defAttAft) : 0) + "%))<br/>" + "(Remaining Def: " + evoNumber2String(myDefAft.toFixed(0)) + " / <b>" + evoNumber2String(defDefAft.toFixed(0)) + "</b> (" + (defDefAft != 0 ? parseInt(100 * myDefAft / defDefAft) : 0) + "%)";
			}
			cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "5")), atthtml);
			cell = addCell(summaryRow, 2, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "5")), html + stathtml);
		}
     		// calcul land loss ratio
		for( j=rows.length-3;j>rows.length-8; j--) {
			if(rows[j].cells[0].innerHTML.indexOf("Land Capture") != -1) {
			j++;
			for(; j < rows.length -2; j++) {
				landBefo = parseInt(rows[j].cells[4].innerHTML);
				landLoss = parseInt(rows[j].cells[6].innerHTML);
				rows[j].cells[6].className=rows[j].cells[6].className.substring(0,13)+" red";
				rows[j].cells[6].innerHTML = "<B>"+rows[j].cells[6].innerHTML+"</B>"+(isAttacker?"<br />":"&nbsp;")+"("+(100*landLoss/landBefo).toFixed(2)+"%)";
			}
			break;
		}
	}
	//
	// losses evaluation
	//
	var total = new Array(), losses = new Array();
	total[0] = total[1] = losses[0] = losses[1] = 0;

	function updateLosses(unit, cells, idx, isAtt) {
      	var a = cells[idx].firstChild;
      	if( !a ) return; // no figures in the BR for defenses on the attacker's side
		//now find the number of items, and if it's zero then exit the function
		a = Number(a.textContent);
		if( a == 0 ) return;
		var l = Number(cells[idx+1].firstChild.textContent);
		cells[idx+1].title = Math.round(100*l/a) + '% (' + evoNumber2String(Math.abs(l) * (unit.metal + unit.mineral)) + ')';
		// take captures into account for the global stats
		total[isAtt] += (a + Number(cells[idx+3].firstChild.textContent)) * (unit.metal + unit.mineral);
		losses[isAtt] += (l + Number(cells[idx+2].firstChild.textContent)) * (unit.metal + unit.mineral);
	}

	for( j = 3; j < rows.length; j++ ) {
		unit = rows[j].cells[0].innerHTML.toLowerCase();
		if(unit == '') break;
		unit = units[unit];
		if(!unit) continue; // unknown unit?
		updateLosses(unit, rows[j].cells, 1, 0);
		updateLosses(unit, rows[j].cells, 6, 1);
	}
	battleReport.insertRow(j+2).innerHTML = '<TD class="row1 b"></TD><TD class="red_bg_row1 b">' + evoNumber2String(total[0]) + 
		'</TD><TD class="red_bg_row1 b red" colspan="4">' + evoNumber2String(losses[0]) + 
		' (' + (losses[0]==0?0:Math.round(100*losses[0]/total[0])) + '%)</TD>' + 
		'<TD class="green_bg_row1 b">' + evoNumber2String(total[1]) + 
		'</TD><TD class="green_bg_row1 b red" colspan="4">' + 
		evoNumber2String(losses[1]) + ' (' + (losses[1]==0?0:Math.round(100*losses[1]/total[1])) + '%)</TD>';
	}
}

//
// Scan Amp Ratio data
//
function evoAmpRatio() {
	var scantable = document.evaluate("id('content_pad')/div/div/table[starts-with(.,'Item')]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (scantable != null){ 
		var ordScans = ordAmps = 0;
		var land = document.getElementById( 'panelinfo' ).textContent.match( /Land:\s([,?\d]+)/ );
		var curScans = evoString2Number ( scantable.rows[2].cells[2].textContent );
		var curAmps = evoString2Number( scantable.rows[3].cells[2].textContent );
		var curLand = evoString2Number( land[1] );
		var ratio = Math.round(( curAmps / curLand ) * 1000 ) / 1000;
		var xPathTerm = "id('content_pad')/div[3]/div[2]/table[2]";
		var orderTable = document.evaluate(xPathTerm, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if(orderTable != null) {
			for(q=2; q <= orderTable.rows.length-1; q++) {
				item = orderTable.rows[q].cells[0].textContent;
				num = evoString2Number(orderTable.rows[q].cells[2].textContent);
				if (item == "Land Scan") {ordScans += num;}
				if (item == "Scan Amplifier") {ordAmps += num;}
			}
		}
		//var scanorder = evoGetOrder(orderTable);
		var futratio = Math.round(( curAmps / (curLand + curScans)) * 1000 ) / 1000;
		var pendratio = Math.round(( (curAmps + ordAmps) / (curLand + curScans + ordScans)) * 1000 ) / 1000;
		scantable.rows[3].cells[2].innerHTML = scantable.rows[3].cells[2].innerHTML + '<br /><span style="text-size: 0.8em;color: greenyellow">' + ratio;
		if (curScans != 0) {
			scantable.rows[3].cells[2].innerHTML = scantable.rows[3].cells[2].innerHTML + ' (' + futratio + ')'; 
		}
		if (ordScans != 0) {
			scantable.rows[3].cells[2].innerHTML = scantable.rows[3].cells[2].innerHTML + ' (' + pendratio + ' w/order)';
		} 
		scantable.rows[3].cells[2].innerHTML = scantable.rows[3].cells[2].innerHTML + '</span>';
	}
}

//
// MP Check
//
function evoMPCheck() {
	//get the tick number
	var tick = parseInt(document.evaluate(".//div[@id='tickcount']/acronym", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.textContent);
	//Are we on the same tick as when the MP was initially permitted?
	okToFire = (tick == GM_getValue('tickallowed',1));
	//If we haven't reviewed the overview page since the tick changed then alert user
	if (allowMP & !okToFire) {alert("Review Overview page if you want to MP");}
	//If the tick number's right and there are fleets 1 tick out, then don't remove the MPs
	if (allowMP & okToFire) return;
	//Otherwise remove MPs from the option list
	var ScansAvailable = document.getElementsByTagName("option");
	for (var count=ScansAvailable.length -1;count > -1 ;count--) {
		var searchText = ScansAvailable[count].text.toLowerCase();
		var match = searchText.search("microwave pulse");
		if (match > -1) {
			var UnitToDelete = document.getElementsByTagName("option")[count];
			UnitToDelete.parentNode.removeChild(UnitToDelete);
		}
	}
}

//
// Fleets page
//
function evoFleets() {

	// flags
	var flag1 = flag2 = flag3 = false;

	getCoords();
		var fleetsTable = null;
	fleetsTable = document.evaluate("id('content')/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	// Balancing act
	// This is a huge hack... but oh well, it works :P
	var FleetOne = 0; var FleetTwo = 0; var FleetThree= 0;
	
	for(q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetOne += Number(fleetsTable.rows[q].cells[3].textContent);
	}
	
	for(q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetTwo += Number(fleetsTable.rows[q].cells[5].textContent);
	}
	
	for(q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetThree += Number(fleetsTable.rows[q].cells[7].textContent);
	}
	
	if(FleetOne > FleetTwo) {
		if(FleetOne > FleetThree) maxSize = FleetOne;
		else maxSize = FleetThree;
	}
	else {
		if(FleetTwo > FleetThree) maxSize = FleetTwo;
		else maxSize = FleetThree;
	}

	// Add the function to add monkeys to the correct box when clicking
	fleetsTable = document.evaluate("id('content')/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var theRow = 0;
	for( var i = 1; i < (fleetsTable.rows.length); i++ ) {
		if(fleetsTable.rows[i].cells.length != 9) continue;
		if(fleetsTable.rows[i].cells[0].textContent.toLowerCase() == "monkey") theRow = i;
	}	
	var MonkeyClick = function(e){
    	fleetsTable.rows[theRow].cells[2].getElementsByTagName('INPUT')[0].value = this.textContent.split(" More")[0];
	};		
	
	if(FleetOne == maxSize) { cellToGo = 3; }
	else if(FleetTwo == maxSize) { cellToGo = 5; }
	else if(FleetThree == maxSize) { cellToGo = 7; }
	rawr = fleetsTable.insertRow(fleetsTable.rows.length-12);
	rawr.className = "alt1 b";
	rawr.style.textAlign = "center";
	
	heh = rawr.insertCell(0);
	heh.textContent = "Difference";
	heh.style.textAlign = "left";
	heh.addEventListener("click", MonkeyClick, false);
	
	heh = rawr.insertCell(1);
	heh.className = "alt2 row2";
	heh.colSpan = 2;
	heh.addEventListener("click", MonkeyClick, false);
		
	heh = rawr.insertCell(2);
	heh.className = "red_bg";
	heh.colSpan = 2;
	heh.textContent = maxSize-FleetOne + ' More';
	heh.addEventListener("click", MonkeyClick, false);
		
	heh = rawr.insertCell(3);
	heh.className = "yellow_bg";
	heh.colSpan = 2;
	heh.textContent = maxSize-FleetTwo + ' More';
	heh.addEventListener("click", MonkeyClick, false);
		
	heh = rawr.insertCell(4);
	heh.className = "green_bg";
	heh.colSpan = 2;
	heh.textContent = maxSize-FleetThree + ' More';
	heh.addEventListener("click", MonkeyClick, false);
	// End the hack 
	
	// How many times can we launch?
	for(z=1; z <= 3; z++) {	
	var LaunchCell = fleetsTable.rows[fleetsTable.rows.length -2].cells[z];
	var LaunchCost = evoString2Number(fleetsTable.rows[fleetsTable.rows.length -2].cells[z].textContent);
		if((LaunchCost * 5) < pFood) { cellCol = "lightgreen"; }
		else if(LaunchCost < pFood ) { cellCol = "orange"; }
		else { cellCol = "red"; }
	LaunchCell.innerHTML = '<span style="color:' + cellCol + '">' + LaunchCell.innerHTML + '</span>';
	}

	//add row for fleet counts
	var sumRow = document.evaluate(".//tr[td[position()=1 and text()='Move to']]", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	sumRow = fleetsTable.insertRow(sumRow.rowIndex);

	sumRow.innerHTML = '<td class="alt1 b">Total</td><td class="alt2" colspan="2"></td><td class="red_bg" colspan="2"></td><td class="yellow_bg" colspan="2"></td><td class="green_bg" colspan="2"></td>';
	updateFleetsAddRow(fleetsTable, true);
	updateFleetsAddRow(fleetsTable, false);
	

	// Add the function to add numbers to the correct box when clicking
	var AddByClick = function(e) {
                 	fleetsTable.rows[this.parentNode.rowIndex].cells[this.cellIndex+1].getElementsByTagName('INPUT')[0].value = this.textContent;
      };
	var Selecta = function(e) {
			selectAllFleet(this.cellIndex-1, fleetsTable);
      };
	for( var j = 1; j < 5; j++) {
		fleetE = fleetsTable.rows[0].cells[j];
		fleetE.addEventListener("click", Selecta, false);
	}

	for( var i = 0; i < (fleetsTable.rows.length); i++ ) {
		for( var j = 1; j <= 7; j+=2 ) {
		if(fleetsTable.rows[i].cells.length != 9) continue;
		row = fleetsTable.rows[i].cells[j];
		// Add the listener to the cell
		row.addEventListener("click", AddByClick, false); 
		}
	}
		//multiple fleet launch check boxes inserted when fleet is home
	if(document.getElementsByName('f_submit[1]')[0]) {
		document.getElementsByName('f_submit[1]')[0].type='checkbox';
		flag1=true;
	}
	if(document.getElementsByName('f_submit[2]')[0]) {
		document.getElementsByName('f_submit[2]')[0].type='checkbox';
		flag2=true;
	}
	if(document.getElementsByName('f_submit[3]')[0]) {
		document.getElementsByName('f_submit[3]')[0].type='checkbox';
		flag3=true;
	}
	
	//add buttons to rotate fleets or move them to home as long as they are not out
	var reorderRow = document.evaluate(".//td[input[@name='reorder']]", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(flag1 && flag2 && flag3) {
		var randomButton = document.createElement('input');
		randomButton.type = "button";
		randomButton.style.color = "#FFFF00";
		randomButton.value = "Random";
		randomButton.addEventListener('click', function() {randomFleets(true); }, false);
		reorderRow.insertBefore(randomButton, reorderRow.childNodes[0]);
		var homeButton = document.createElement('input');
		homeButton.type = "button";
		homeButton.style.color = "#FFFF00";
		homeButton.value = "Home";/*lkjlkj*/
		homeButton.addEventListener('click', function() {randomFleets(false); }, false);
		reorderRow.insertBefore(homeButton, reorderRow.childNodes[0]);
		//Code Below is related to failed attempt to self-balancing fleets
		/*var splitUp = document.createElement('input');
		splitUp.type = "button";
		splitUp.style.color = "#FFFF00";
		splitUp.value = "Spread 'em";
		splitUp.addEventListener('click', function() {randomFleets(false); splitEmUp(fleetsTable); }, false);
		reorderRow.insertBefore(splitUp, reorderRow.childNodes[0]);
		*/
	}

	//if check boxes are in, add the "Launch Fleets" button
	var Element = document.getElementsByName('launchform')[0].parentNode;
	if(Element && (flag1 || flag2 || flag3))
	{
		var button = document.createElement('input');
		button.type = "button";
		button.style.color = "#FFFF00";
		button.value = " **** Launch Fleets ***** ";
		button.addEventListener('click', submitFleets,true);	
		Element.insertBefore(button, Element.lastChild);
	}

	//return the number of fleets checked
	function numChecked()
	{
		var num = 0;
		if (flag1)
			num+= document.getElementsByName('f_submit[1]')[0].checked;
		if (flag2)
			num+= document.getElementsByName('f_submit[2]')[0].checked;
		if (flag3)
			num+= document.getElementsByName('f_submit[3]')[0].checked;
		return num;
	}
	
	//return which fleets are checked
	function fleetsChecked()
	{
		var num = new Array(0,0,0);
		if (flag1)
			num[0] = document.getElementsByName('f_submit[1]')[0].checked;
		if (flag2)
			num[1]= document.getElementsByName('f_submit[2]')[0].checked;
		if (flag3)
			num[2]= document.getElementsByName('f_submit[3]')[0].checked;
		return num;
	}
	
	//function to compare travel times on fleets
	function compareFleets(fleet1, fleet2)
	{
		for(i=0;i < 4; ++i)
			if(fleet1[i] != fleet2[i])
				return (false);
		return (true)
	}
	
	//function to compare the travel times for the fleets
	function compareWindows()
	{
		num = numChecked();
		if(num < 2)
			return true;
		fleetschecked = fleetsChecked();
		for(i = 0; i < 3;++i)
			for(j=0; j<3; ++j)
			{
				if(i!=j)
					if(fleetschecked[i] && fleetschecked[j])
						if(!compareFleets(unsafeWindow.traveltimes[i],unsafeWindow.traveltimes[j]))
							return(false);
			}
		return true;
	}
	
	//the launch function called when "Launch Fleets" is clicked
	function submitFleets()
	{
		var message = "";
		if(!compareWindows())
		message+= "The fleets weight are not equal\n";
		message = message + "Are you sure you want to send the fleets?";
		if(confirm(message))			
			document.getElementsByName('launchform')[0].submit();
	}

	function getCoords() {
	      var x = gup("x");
	      var y = gup("y");
	      var z = gup("z");
	      var c = gup("c");
	      if(x == "" || y == "" || z == "" || c == "")
		return;
	
	      //show all 3 fleets
	      for(var i = 1; i < 4; i++)
	      {
		var a = document.getElementById("fleetx" + i);
		if(a != null)
		  a.value = x;
	
		var b = document.getElementById("fleety" + i);
		if(b != null)
		  b.value = y;
	
		var d = document.getElementById("fleetz" + i);
		if(d != null)
		  d.value = z;
	
		var e = document.getElementsByName("f_c[" + i + "]")[0];
		if(e != null)
		  e.value = c;    
	      }
	}
	
      function gup(name)
      {
      	var regexS = "[\\?&]"+name+"=([^&#]*)";
      	var regex = new RegExp( regexS );
      	var tmpURL = window.location.href;
      	var results = regex.exec( tmpURL );
      	if( results == null )
      	      return "";
      	else
			return results[1];
      }
	
	function updateFleetsAddCell(row, cellIndex, className, scores) {
		var cell = row.insertCell(cellIndex);
		cell.className = className;
		cell.style.textAlign = 'center';
		cell.colSpan = 2;
		if(cellIndex > 0) {
			cell.style.fontSize = "12px";
			cell.innerHTML = evoNumber2String(scores[1]);
			cell.title = 'Unboosted: ' + evoNumber2String(scores[0]);
		} else {
			cell.innerHTML = scores; // cell title actually
		}
	}

	function updateFleetsAddRow(fleetsTable, isAttack) {
		var row = fleetsTable.insertRow(fleetsTable.rows.length - 2);
		updateFleetsAddCell(row, 0, "alt1 b", (isAttack ? "Attack" : "Defense") + 
				    '<br /><span style="font-size: smaller; font-weight: normal">(estimation with max boost)</span>');
		updateFleetsAddCell(row, 1, "red_bg", getFleetScore(1, fleetsTable, isAttack));
		updateFleetsAddCell(row, 2, "yellow_bg", getFleetScore(2, fleetsTable, isAttack));
		updateFleetsAddCell(row, 3, "green_bg", getFleetScore(3, fleetsTable, isAttack));
	}

	function getFleetScore(fleetNo, table, isAttack) {
		var rows, row;
		var unit, quantity, total = 0;

		var i, j, baseScore, boost, noBoostScore = 0, maxBoostScore = 0;
		rows = document.evaluate(".//tr[td[1]/a]", table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for( i = 0; row = rows.snapshotItem(i); i++ ) {
			if( row.cells[0].rowSpan > 1 ) break;
			unit = units[row.cells[0].textContent.toLowerCase()];
			quantity = Number(row.cells[fleetNo * 2 + 1].textContent);
			total += quantity;
			baseScore = isAttack ? unit.getAttackScore(quantity) : unit.getDefenseScore(quantity);
			noBoostScore += baseScore;
			boost = 1 + unit.getBoost();
			maxBoostScore += baseScore * boost * boost;
		}
		row.cells[0].rowSpan = 12;
		var cell = sumRow.cells[1 + fleetNo];
		cell.textContent = total;
		cell.style.textAlign = 'center';
		cell.style.fontSize = '12px';
		return new Array(Math.round(noBoostScore), Math.round(maxBoostScore));
	}
	
	//function to move fleets below
	function randomFleets(switchfleets) {
		var moveRow = document.evaluate(".//tr[td[position()=1 and text()='Move to']]", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		var reorderButton = document.evaluate(".//input[@name='reorder']", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if (switchfleets) {
			var toFleet = new Array("0,0,0", "0,3,3", "2,2,0", "2,3,2", "3,2,3", "3,0,2");
			var rndFleet = Math.round(Math.random() * 5) % 5;		
			var positions = (toFleet[rndFleet]).split(",");

		}
		else {
			var positions = new Array(1,1,1);
		}
		var refreshMe = false;
		var allFleetsHome = true;
		
		for (var i = 2; i < 5; i++) {
			var input = moveRow.cells[i].childNodes[0];
			if (input){ input.selectedIndex = positions[i - 2]; } else { allFleetsHome = false; }
				
			if (allFleetsHome == true){
				if (positions[i - 2] > 0) {
					selectAllFleet((i - 1), fleetsTable);
					refreshMe = true;
				}
			}
			
		}
		
		if (allFleetsHome == true){
			if (refreshMe) {
				reorderButton.click();
			}	
		}else{
				alert('Error: You can\'t rotate fleets when you\'ve got some out!');
			}
	}
	
	//This function selects all of the creatures in a specified fleet
	function selectAllFleet(fleetNo, table){
		var rows, row;
		var unit, quantity, total = 0;
		var i, j, baseScore, boost, noBoostScore = 0, maxBoostScore = 0;
		rows = document.evaluate(".//tr[td[1]/a]", table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for (i = 0; row = rows.snapshotItem(i); i++ ) {
			if (row.cells[0].rowSpan > 1) {
				break;
			}
			quantity = Number(row.cells[(fleetNo * 2) + 1].textContent);
			if (quantity > 0) {
					row.cells[(fleetNo * 2) + 2].childNodes[0].value = quantity
			}
		}
	}
	
	//Function to make balanced fleets (hopefully)
	function splitEmUp(table){
		var rows, row, numFleets;
		var unit, crittertypes, total = 0;
		var monkeys = 0, realcrits = 0, exemptcrits = 0;
		var monkeyrow = 99;
		var maxweight = 0, maxwghtrow = 0;
		var i, j, baseScore, boost, noBoostScore = 0, maxBoostScore = 0;
		var critter = new Array(20);
		var quantity = new Array(20);
		var moveRow = document.evaluate(".//tr[td[position()=1 and text()='Move to']]", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		var reorderButton = document.evaluate(".//input[@name='reorder']", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		rows = document.evaluate(".//tr[td[1]/a]", table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; row = rows.snapshotItem(i); i++ ) {
			if (row.cells[0].rowSpan > 1) {
				break;
			}
			critter[i] = row.cells[0].textContent.toLowerCase();
			quantity[i] = Number(row.cells[1].textContent);
			if (critter[i] == "monkey") {
				monkeys = quantity[i];
				monkeyrow = i;
			}
			else {
				realcrits += quantity[i];
				unit = units[critter[i]];
				if (unit.getWeight() > maxweight) {
					if (quantity[i]>2) {
						maxweight = unit.getWeight();
						maxwghtrow = i; // only count the heavyweight creature if there are more than two of them
						exemptcrits = 0; // and ensure smaller quantities of other heavyweight creatures are included
					}
					else {
						exemptcrits += quantity[i]; // otherwise add them for potential exemption
					}
				}
			}
			crittertypes = i;
		}
		realcrits -= exemptcrits;
		alert(realcrits + "real and " + monkeys + "monkeys");
		if (monkeys > ((realcrits * 2) - 6)) {
			numFleets = 3;
		}
		else {
			if (monkeys > (realcrits - 2)) {
				numFleets = 2;
			}
			else {
				numFleets = 1;
			}
		}
		//real critters first
		for (i = 0; row = rows.snapshotItem(i); i++ ) {
			if (row.cells[0].rowSpan > 1) {
				break;
			}
			unit = units[critter[i]];
			if (i != monkeyrow && (unit.getWeight() <= maxweight)) {
				if (i != maxwghtrow) {
					alert("got here");
					row.cells[2].childNodes[0].value = quantity[i]
				}
				else {
					row.cells[2].childNodes[0].value = quantity[i]-2;
				}
			}
		}
		var input = moveRow.cells[0].childNodes[0];
		if (input){ alert("YAY"); input.selectedIndex = 1; }
		reorderButton.click();
		alert("what happened");
	}	
}

//
// News page
//
function evoNews() {
	//get the ruler name from the navstatus panel
	var ruler = document.evaluate("//div[@id='navstatus']/strong[1]", document, null, XPathResult.STRING_TYPE, null).stringValue.substring(0,10);
	var RegExpTerm = (".//table[@class='t_little']");
	var battleReports = document.evaluate(RegExpTerm, contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	readBR(ruler, battleReports, false);
}


//
// Rankings page
//
function evoContRankings() {
	var smin = Math.ceil(pScore * minAttack);
	var tmax = Math.floor(pScore / minAttack);
	var rankTable = document.evaluate(".//table[@class='t_little grey_bg']", contents, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	for( var j = 1; j < rankTable.rows.length; j++ ) {
		if( rankTable.rows[j].cells.length != 4 ) continue;
		score = rankTable.rows[j].cells[3];		
		target = evoString2Number(score.textContent);
		if( target < smin ) score.style.color = 'chocolate';
		else if( target > tmax ) score.style.color ='dodgerblue';
		else score.style.color = 'lime';
	}
}

//
// Inventory
// add the Fleets stats to the Inventory page
// This one's c/o red* ;)
//
function evoInventory() {
	var Attack = new Array();
	var Defense = new Array();
	var Food = new Array();
	var total, subTotal, iter, fleet;

	var allTitles = document.evaluate(".//div[@class='seperator']", contents, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var tCritters = allTitles.snapshotItem(0).nextSibling;
	Attack[0] = Attack[1] = Attack[2] = Attack[3] = 0;
	Defense[0] = Defense[1] = Defense[2] = Defense[3] = 0;
	Food[0] = Food[1] = Food[2] = Food[3] = 0;
	for (iter = 0; iter < tCritters.rows.length; iter++) {
		creature = tCritters.rows[iter].cells[0].firstChild;
		name = creature.rows[0].cells[1].textContent.split("\t").join("").split("\n").join("").toLowerCase();
		total = Number(creature.rows[1].cells[0].textContent);
		subTotal = 0;
		spans = creature.rows[2].getElementsByTagName('span');
		if (units[name]==undefined) continue;
		unit=units[name];
		// detailed numbers like 6576 x Fleet 1 are put in spans
		for (jter=0;jter<spans.length;jter++) {
			count = Number(spans[jter].firstChild.nodeValue);
			stats = spans[jter].nextSibling.nodeValue.replace( /^\s+/g, "" ).split(" ").join("").split("%").join("").split(":").join(",").split(",");
			fleet=0;
			offBoost=defBoost=1;
			for (stat=0; stat<stats.length; stat+=2) {
				if (stats[stat]=="Fleet" || stats[stat]=="xFleet") {
					fleet = stats[stat+1];
				} else if (stats[stat]=="OffBoost" || stats[stat]=="xOffBoost") {
					offBoost += stats[stat+1]/100;
				} else if (stats[stat]=="DefBoost" || stats[stat]=="xDefBoost") {
					defBoost += stats[stat+1]/100;
				}
			}
			subTotal += count;
			Attack[fleet] += unit.getAttackScore(count)*offBoost*offBoost;
			Defense[fleet] += unit.getDefenseScore(count)*offBoost*offBoost;
			Food[fleet] += unit.getFoodCost(count);
		}

		// the following has no numbers before it..... so it _should_ be the total
		if (spans.length==0) {
			count = total;
			stats = creature.rows[2].getElementsByTagName('TD')[0];
			if (stats.getElementsByTagName('form').length>0) stats = stats.getElementsByTagName('form')[0];
			stats= stats.textContent.replace( /^\s+/g, "" ).split(" ").join("").split("%").join("").split(":").join(",").split(",");
			fleet=0;
			offBoost=defBoost=1;
			for (stat=0; stat<stats.length; stat+=2) {
				if (stats[stat]=="Fleet" || stats[stat]=="xFleet") {
					fleet = stats[stat+1];
				} else if (stats[stat]=="OffBoost" || stats[stat]=="xOffBoost") {
					offBoost += stats[stat+1]/100;
				} else if (stats[stat]=="DefBoost" || stats[stat]=="xDefBoost") {
					defBoost += stats[stat+1]/100;
				}
			}
			subTotal += count;
			// GM_log("Fleet " + fleet + " + " + count  + " * " + unit.getAttackScore(1) + " * " + offBoost + " " + unit.unitName);
			Attack[fleet] += unit.getAttackScore(count)*offBoost*offBoost;
			Defense[fleet] += unit.getDefenseScore(count)*offBoost*offBoost;
			Food[fleet] += unit.getFoodCost(count);
		}

		if( subTotal != total ) {
			if( subTotal > total )
				creature.rows[1].cells[0].style.color = "red";
			else { // unboosted creatures home
				fleet = 0;
				count = total - subTotal;
				Attack[fleet] += unit.getAttackScore(count);
				Defense[fleet] += unit.getDefenseScore(count);
				Food[fleet] += unit.getFoodCost(count);
			}
		}
	}

	// subtotal for creatures
	var cAttack = Attack[0] + Attack[1] + Attack[2] + Attack[3];
	var cDefense = Defense[0] + Defense[1] + Defense[2] + Defense[3];
	var cFood = Food[0] + Food[1] + Food[2] + Food[3];

	// home defences
	tCritters = allTitles.snapshotItem(1).nextSibling;
	fleet = 0;
	for( iter = 0; iter < tCritters.rows.length; iter++ ) {
		creature = tCritters.rows[iter].cells[0].firstChild;
		name = creature.rows[0].cells[1].textContent.split("\t").join("").split("\n").join("").toLowerCase();
		count = Number(creature.rows[1].cells[0].textContent);
		spans = creature.rows[2].getElementsByTagName('span');
		if (units[name]==undefined) continue;
		unit=units[name];
		Attack[fleet] += unit.getAttackScore(count);
		Defense[fleet] += unit.getDefenseScore(count);
		Food[fleet] += unit.getFoodCost(count);
	}

	function addRow(title, v1, v2, v3) {
		return '<tr class="row' + ((iter ^= 1)+1) + '" align="right"><th>' + title + '</th><td>'+evoNumber2String(v1.toFixed(0))+'</td><td>'+evoNumber2String(v2.toFixed(0))+'</td><td>'+evoNumber2String(v3.toFixed(0))+'</td></tr>';
	}
	iter = 1;
	var newspan = document.createElement('SPAN');
	newspan.innerHTML= '<DIV class=title>Fleet Status <span style="font-weight: normal">(boosted scores)</span></div>'
						+ '<table width=100% cellspacing=0 cellpadding=0 border=0 class=t_little><tbody>'
						+ '<tr class="row2" style="text-align: right; font-weight: bold"><td colspan="2">Attack</th><td>Defense</td><td>Food</td></tr>'
						+ addRow('Home',		Attack[0], Defense[0], Food[0])
						+ addRow('Fleet 1',		Attack[1], Defense[1], Food[1])
						+ addRow('Fleet 2',		Attack[2], Defense[2], Food[2])
						+ addRow('Fleet 3',		Attack[3], Defense[3], Food[3])
						+ addRow('All fleets',	Attack[1] + Attack[2] + Attack[3], Defense[1] + Defense[2] + Defense[3], Food[1] + Food[2] + Food[3])
						+ addRow('All creatures', cAttack, cDefense, cFood)
						+ addRow('Total',		Attack[0] + Attack[1] + Attack[2] + Attack[3], Defense[0] + Defense[1] + Defense[2] + Defense[3], Food[0] + Food[1] + Food[2] + Food[3])
						+ '</tbody></table>';
	tCritters.parentNode.appendChild(newspan);
}

//
// Planet status
//
function evoPlanetStatus() {
	function sum(type) {
		var span;
		var i = 0;
		var spans = document.evaluate(".//tr[td[text()='Incoming']]/following-sibling::tr//tr[td[text()='"+type+"']]/following-sibling::tr[2]/td/span", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if( ! spans ) return;
		while( span = spans.snapshotItem(i++) ) {
			var nodes = document.evaluate("./text()", span, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
			var node, creatures = 0;
			while( node = nodes.iterateNext() )
				creatures += parseInt(node.data);
			span.appendChild(document.createTextNode("** Total: " + creatures + " creatures **"));
		}
	}
	sum('Attackers');
	sum('Defenders');
}

//
// Visual Target Finder
//
function evoVTF() {
	// VTF bullets
	// display bullet for low scores
	const bulletLowScores = GM_getValue("bulletLowScores", false);
	const bulletOpacity = 0.3;
	const bulletThreshold = 2;

	// DON'T TOUCH THOSE BELOW
	const bullets = [
		"data:image/gif;base64,R0lGODlhDAAMAMZhAP8AAA0AABkAAHMAAOkAAP8BAdcAAAIAAAMAAP8PD7kAAFoAAHQAADkAAIAAAP8LC%2F8fH%2FwDA%2F84OM0AAGsAAP4AAKkAAP8CAj8AADIAABoAAHYAAP8MDOsAAJMAAF4AAL8AAKgAACUAAOYAAP8eHpUAAJEAAP8yMosAAP9ZWTMAACEAAEkAAD0AAL4AAP9NTf8REcMAAI0AABsAAIIAAGMAACcAAJkAACsAAEcAAB4AAP9kZKUAAAwAAHwAAH8AAOoAAO4AAP9gYEEAAO0AADEAAFwAABEAABMAABUAAAQAAO4FBUgAAGIAAD4AAP%2BOjv9UVP%2BwsNwAAFUAAMgAALEAAP9wcPcAAC0AAA8AAP8UFHkAAKIAAP8ICP%2B6uv9vb0MAAP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEAAH8ALAAAAAAMAAwAAAcTgH%2BCg4SFhoeIiYqLjI2Oj5CIgQA7",
		"data:image/gif;base64,R0lGODlhDAAMAOZhAP8AAA0AABkAAHMAAOkAAP8BAdcAAAIAAAMAAP8PD7kAAFoAAHQAADkAAIAAAP8LC%2F8fH%2FwDA%2F84OM0AAGsAAP4AAKkAAP8CAj8AADIAABoAAHYAAP8MDOsAAJMAAF4AAL8AAKgAACUAAOYAAP8eHpUAAJEAAP8yMosAAP9ZWTMAACEAAEkAAD0AAL4AAP9NTf8REcMAAI0AABsAAIIAAGMAACcAAJkAACsAAEcAAB4AAP9kZKUAAAwAAHwAAH8AAOoAAO4AAP9gYEEAAO0AADEAAFwAABEAABMAABUAAAQAAO4FBUgAAGIAAD4AAP%2BOjv9UVP%2BwsNwAAFUAAMgAALEAAP9wcPcAAC0AAA8AAP8UFHkAAKIAAP8ICP%2B6uv9vb0MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGEALAAAAAAMAAwAAAeEgGGCSjgMDhgBgoozJlcAjxNOigI3HQUcMF0FAFNhCAtVBAkvVl9QCSNJAgMhUlopT15RJwA1IhQlMUskEkI7EAAoOh8%2BPFRAEQ8PFxVbR0xNP1wgBgRBRAZgB1gsCxseFgouCjKJARktOUYDDjQMK4pZNkUqDUMNSIqCBz0CGgEIFAUCADs%3D",
		"data:image/gif;base64,R0lGODlhDAAMAOZxAAIAAggACDYHNgkACRICEl8MXyEEIf9U%2F9If0t0l3WsPa44Ujtch11AIUOMu46AWoP9P%2FxgDGAMAA%2B8i758Xn3kQeSACIBoAGiMBI98n37UdtRQCFPEj8SIAIjIGMgEAAcgfyEMIQzUGNRsEG5YVluQn5GUOZSgCKEkISVwLXJIUkv9L%2FxUCFS8EL0wLTK0YrVoNWv9i%2F%2F9s%2F2oOavs%2B%2B1YKVkYIRtIg0lcLV%2F9Y%2F6MXo1gMWP8x%2F%2FQq9P9V%2F7EZsf8y%2FywELEgLSIkTiasYq8YdxooTin4Rfn0RfQkBCRACEOEh4XIPcgoCCgsAC0IIQkUIRbIZsg4BDiIBIhAAEIQShDIHMv4o%2Fv%2BE%2F8EdwREAEf%2BB%2F9sf244Tjq8Zr%2F8s%2FzUINa8ar%2F8v%2F28ObykEKfw1%2FLwbvGEMYf9g%2F2kOaVUJVf9C%2F1ULVdgo2Pom%2Bm0ObXsRewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHEALAAAAAAMAAwAAAeGgHGCEgY7Jh5NgoobCmZcHG5ZYIoETF43PTxiX1dCcQBPVS8ZK2gxPkAISgRqSDptEDJYW2sTLiMNYyoaDjQHOWVLaSw2KXAkYSAJJQxFME4CKAUVXRREUT8PVgAWAiE4b0dDC0YzSXEBU0EiUGwFZzURigMXHRgnLWRSioIfAVRaBgBQFAgAOw%3D%3D",
		"data:image/gif;base64,R0lGODlhDAAMAOZxABkMAForAHM3ANdpAAIBAA0GAHQ4AH8%2BAP%2BTABEHAP%2B6APd8AP%2BYBf%2BpBCEPAHY5AEEfAP%2B%2BBlUvAB4NAO56AetzAFwrAP%2B%2BDqlTAJNHALlaAD8gAP%2BXBEkiAA0HAP%2FvMII%2FAAMBAP%2FAA%2F%2F%2FWzkbAC0VAF4tAPyEAKVQAHw8ADEYACsWAJlLABoMAP%2BQAP%2FxKP%2BPAP%2F%2FRb5dAEMgAP%2BbAP%2BqADIXAAQCAA0FADkaAAMCAHQ6AEchAP%2FnKs1%2FAP%2BcBJFGAIA%2BAItFAP%2BjDI1FAO50AO10AKhSAOpzAOlyAL9dACcTAD4iAP%2BdAEgiAJVJADMYAA8HABsNABMJAAwFAP%2FjJIBCALFXAP%2F%2FVmIvAP%2BWCP%2FLGtxrALlbAMNgAOlwAP%2FqLms0AHk6AMhiAKJPAP%2BLAP%2BjAGMyAOaJAP%2F6NiURAP%2F8Nv6CABULAP%2FDBj0cAP%2FcFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHEALAAAAAAMAAwAAAeGgHGCNys7VhsegopSQAsuTWY%2BTIoALBVlDREiCjUScToBV0kMVWtpL25obQACR1xaPTEjWHA0Z2phT14UQ1tgHxcIQhMmKShjSCccPzBsYglOWQdkSgNfRUYDMwQlHQEPGRgaMl1EBXEFNm88FgJBIAYOilFLKlAkEDlTioIEVAAtcIRQFAgAOw%3D%3D",
		"data:image/gif;base64,R0lGODlhDAAMAOZyAAAAAwAAAggIWgICGQAADRMTuRAQoiAh%2FzE7%2FwwMgh0d%2FiEh%2Fxsb9wwMgC81%2Fycv%2FwsLVQ0NeQ4Okw8PkR0i7hMTvwQEPTI8%2FxERpQAADy4%2F%2FwEBEyg1%2FxQUvgEBM09%2B%2FxYW1w4OgITj%2FwkJcwwMfyIh%2FwAAGRkZ6wgIaxoc6ktz%2F0Jd%2F2Kc%2FwEBDVWC%2FwsLfA4OixUVyCYl%2FwoKdCUt%2Fw4OjYHb%2FwcHSWCZ%2Fz5d%2FwgIXgICLQgIYgQEJQMDIQcHQwAAJwsLdgsLcwQEQRgY6Q8PmRkZ7RkZ7hgZ6QgIXAAAGioz%2FxcW1xERqAQEK1SG%2FwICFQcHSAAAMQAABAAAESwu%2FwAADB0dzQICGxcY3AEBMjVH%2FxQUwyMi%2FwYGPx8i%2FGy1%2Fycx%2FwgIPh8f%2FwwMdBERqQsLYwQEOQ4PlViL%2FwICOScn%2FxISsQICDSEk%2FwYGRx8e5gICHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHIALAAAAAAMAAwAAAeGgHKCU05kIV5tgopYEwxjXTJXYooDRScHSwgOVWsQcgACbEhhKjgsLhdwUAMjTVkcH2AiNislZj0oaFwUGjlPaVsLMHE6LxgxKV80D24KEVRRPCQGFUxER0YgPwE7NwJBEmUFHQU1LXIEWhZvSUINCTM%2BihlAUh5qQ2cbioIBViZKCABQFAgAOw%3D%3D",
		"data:image/gif;base64,R0lGODlhDAAMAOZhAP%2F%2FAA0NABkZAFpaAHNzAP%2F%2FCzk5AOnpAAICAAMDAP%2F%2FD%2F%2F%2FAdfXAHR0ALm5AICAAKKiAP%2F%2FjjExAL%2B%2FAMjIAMPDAB4eAAQEAD4%2BABMTAP%2F%2FEXZ2AFVVAAwMAP%2F%2FuicnAP%2F%2FOObmAGtrAA8PANzcAM3NAP%2F%2FHuvrABUVAP%2F%2FYP%2F%2Fb6WlACUlAIKCAP%2F%2FMv%2F%2FWf%2F%2FcC0tAP%2F%2FHyEhAI2NAFxcAO3tAHx8AGJiAEdHAP%2F%2FFH9%2FAP%2F%2FsCsrAJGRAP%2F%2FZENDAPf3AIuLAOrqAO7uAL6%2BAKmpAF5eAKioAEFBAD09ABsbAEhIADMzAD8%2FADIyABERABoaAP7%2BAP%2F%2FVLGxAElJAO7uBf%2F%2FApWVAHl5AP%2F%2FDP%2F%2FTZOTAP%2F%2FCGNjAPz8A5mZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGEALAAAAAAMAAwAAAeEgGGCFz0ND04BgopLPkEAjyUYigJgJwtaGl0LABxhCQNUBwpbMCpTCiEoAgRIJDovER48LgBeLCJYFVYmICk%2FMgBCFkc3KxRDXwUFV1JZUEw4OxATDAdENgxACDFVAxtcRg5FDjSJAU9KOTUEDy0NM4ojHxJNBkkGGYqCCB0CUQEJFAUCADs%3D",
		"data:image/gif;base64,R0lGODlhDAAMAOZwAAACAAIRAgg9CAAJAAAIAAxXDAEhASPbIx%2B%2FHyjIKCLbIgAaACfOJy7VLh%2B2HxSFFCz9LDH3MQADABidGApPCgQrBAgwCIH%2FgRmhGReSFwISAgQpBA5lDgg%2BCAYuBgg%2FCAEJAQtCC4T%2FhBFyESC%2FIAAQAActB1T%2FVBqfGhieGAQmBAIPAgxYDAhJCBJ5Eh2mHSjtKAYwBhF0EQ5cDgABAEL%2FQiXMJWD%2FYC%2F7Lx2xHQARAAQeBBN%2BEwhCCA5fDg9pDwtQCw5gDg9iDxaSFlj%2FWDL9Mk%2F%2FTw1SDRN%2FEyHFIT7zPgcwBxFxEQ5kDgIJAgALAAMVAwtUCyrkKgAhAAIUAgcxBwENATXxNSHNIWL%2FYiblJgtNC2z%2FbBusG1X%2FVR21HROCEyfTJxSCFAtGCwImAhBvEBWJFRmiGReUFxmgGR%2FIHwIdAglOCUv%2FSwQYBAxRDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHAALAAAAAAMAAwAAAeGgHCCEjtvMx5OgooaQl1qB1o5FooBP2kkUhE4EDAhcAACLikMbTdZXkUIKwFsI2gJRlwiFzUKY24tHA8vDUonRFdYQVQfUUxmKA42YUlfR09LPQVlYBkTZxhDJgBrVQJATTI8Ykg%2BIHAEBhsxHVsFLBRQigMLUwZkFSpWioI0BCU6BgBQFAgAOw%3D%3D"
	];
	const bulletTitles = [
		'',
		'Allianced - Online',
		'Unallianced - Online',
		'Allianced - Last Seen < ' + bulletThreshold + ' days',
		'Unllianced - Last Seen < ' + bulletThreshold + ' days',
		'Allianced - Last Seen >= ' + bulletThreshold + ' days',
		'Unllianced - Last Seen >= ' + bulletThreshold + ' days'
	];

	var table = document.getElementById('cont_list');
	if( table ) {
		var smin = Math.ceil(pScore * 0.35);
		for(var i=2; i < table.rows.length; i++) {
			if( table.rows[i].cells.length < 4 )
				continue;

			var cell1 = table.rows[i].cells[1];
			var target = evoString2Number(table.rows[i].cells[3].innerHTML);
			var bullet = 0;

			if( target >= smin || bulletLowScores ) {
				// Quick target picker :D
				// is the lad online?
				var match = /Last Seen: (?:(\d+) days )?(\d+) hours ago/.exec(cell1.getElementsByTagName("a")[0].getAttribute('onclick'));
				// let's try to find if it's a viable target :)
				var ally = /^\[.*\]/.test(cell1.textContent);
				if( match ) {
					// player is not online
					if( Number(match[1]) >= bulletThreshold ) bullet = ally?5:6; else bullet = ally?3:4;
					table.rows[i].title = match[0];
				} else {
					bullet = ally?1:2;
					table.rows[i].title = 'Online';
				}
			}
			var img = document.createElement('img');
			img.src = bullets[bullet];
			img.style.verticalAlign = "middle";
			img.style.marginRight = "2px";
			if( target < smin ) img.style.opacity = bulletOpacity;
			img.title = bulletTitles[bullet];
			cell1.insertBefore(img, cell1.firstChild);
		}
	}
}

//
// Universe 'Next' Button
//
function evoUniverseNav() {
	var next = null;
	var i;

	// let's find the select...
	var sel = document.evaluate(".//select[@name='p']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( sel == undefined ) {
		// we're on the galaxy or dim view, so we should see a list of planets/galaxies, just pick the first from the list :)
		next = document.evaluate(".//tr[@class='row1' or @class='row2'][2]/td[1]/span/text()", document, null, XPathResult.STRING_TYPE, null).stringValue;
	} else {
		// try to get the next one from the planets drop down
		next = document.evaluate(".//select[@name='p']/option[preceding-sibling::*[@selected][2]][1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if( next == null ) {
			next = document.evaluate(".//select[@name='g']/option[preceding-sibling::*[@selected][2]][1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			if( next == null )
				next = document.evaluate(".//select[@name='dimension']/option[preceding-sibling::*[@selected][2]][1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		}
		if( next != null ) next = next.textContent;
	}
	if( next != null ) {
		var node = document.evaluate(".//table[@class='alt2 b']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if( node ) {
			var a = document.createElement('a');
			var link = "" + next.match(/(\d+(,\d+)*)/)[0];
			var idx = link.indexOf(',');
			if(idx != -1)
			{
				idx = link.indexOf(',',idx+1);
				if(idx == -1)
				link = link + ",1";
			}
			else
				link = link + ",1,1";
			a.href = '/' + link;
			a.title = next;
			a.textContent = "Next page >>";
			node.appendChild(a);
			a.style.fontSize = "8pt"
			a.style.fontWeight = "bold"
			a.style.marginLeft = "10px";
		}
	}
}

//
// All Pages (Evo notepad, gmt etc)
//
function allPages() {
	//deal with the text input box borders
	if (boxBorder) {
		var inputboxes = document.getElementsByTagName('input');
		for (i = 0; i<inputboxes.length; i++) {
			thisbox = inputboxes[i];
			if (thisbox.type == 'text') {inputboxes[i].style.border = boxColour;}
		}
	}

	function toggleNotepad() {
		var np = document.getElementById("hide_notepad");
		if(np.style.visibility == 'hidden') np.style.visibility = 'visible';
		else np.style.visibility = 'hidden';
	}
	
	function saveNotepad() {
		GM_setValue('notepad', this.value);
	}
	
	function clearNotepad() {
		var np = this.nextSibling;
		if(confirm('Clear Scratch Pad?')) {
			np.value = '';
			GM_setValue('notepad', '');
		}
	}
	
	var helpMenu = document.evaluate(".//a[@id='openhelppanel']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var nImg = document.createElement('IMG');
	nImg.src = "http://img91.imageshack.us/img91/3329/notepadpi6.png" //Replace with data url?
	nImg.style.marginLeft = '10px';
	nImg.style.cursor = 'pointer';
	var tzOffset = GM_getValue('tzOffset');
	var tzName = GM_getValue('tzName');
	var tzInline = GM_getValue('tzInline', false);
	nImg.addEventListener('click', toggleNotepad, false);
	helpMenu.parentNode.insertBefore(nImg, helpMenu.nextSibling);

	var nDiv = document.createElement('DIV');
	nDiv.id = 'hide_notepad';
	nDiv.style.width = '177px';
	nDiv.style.height = '580px';
	nDiv.style.position = 'absolute';
	nDiv.style.visibility = 'hidden';
	nDiv.style.top = '30px';
	nDiv.style.left = '820px';

	
	var hDiv = document.createElement('DIV');
	hDiv.style.textAlign = 'left';
	hDiv.style.fontSize = '12px';
	hDiv.style.fontFamily = 'Verdana';
	hDiv.style.fontWeight = 'bold';
	hDiv.style.padding = '2px 0px 2px 10px';
	hDiv.style.backgroundColor = 'limegreen';
	hDiv.style.color = 'white';
	hDiv.style.cursor = 'pointer';
	hDiv.innerHTML = 'Scratch Pad';
	hDiv.addEventListener('click', clearNotepad, false);
	
	nDiv.appendChild(hDiv);

	var ele = document.createElement('TEXTAREA');
	ele.style.backgroundColor = 'pink';
	ele.style.fontSize = '10px';
	ele.style.fontFamily = 'Verdana';
	ele.style.color = 'black';
	ele.cols = 29;
	ele.rows = 10;
	ele.id = 'notepad';
	ele.wrap = 'virtual';
	ele.value = GM_getValue('notepad', '');
	ele.addEventListener('blur', saveNotepad, false);

	nDiv.appendChild(ele);

	var tb = document.getElementById("userinfocontents");
	tb.appendChild(nDiv);
	
	// command Handler
	function evoSetTZ() {
		if( tzOffset === undefined || isNaN(tzOffset) )
			tzOffset = 0;
		tzOffset /= 60;
		if( tzName === undefined )
			tzName = 'GMT';

		do {
			var i = prompt('Enter your time zone offset from GMT, in hours\neg. enter -4 or -5 if you live in New York (depending on the Daylight Saving Time)', tzOffset);
			if( i == null ) return;
		} while( isNaN(parseInt(i,10)) );
		tzOffset = Number(i)*60;
		tzName = prompt('Enter your time zone name (eg. CST, EST, ET)', tzName);
		if( tzName == null ) return;

		GM_setValue('tzOffset', tzOffset);
		GM_setValue('tzName', tzName);

		alert("Please reload the page for the changes to take effect.");
	}
	//
	GM_registerMenuCommand((tzInline?'Disable':'Enable') + ' automatic time zone conversion', function() { GM_setValue('tzInline', !tzInline); }, '', '', 'a');
	GM_registerMenuCommand("Set Time Zone", evoSetTZ, '', '', 't');

	if(! contents ) return;

	if( tzOffset === undefined )	tzOffset = 0;
	if( tzName === undefined )		tzName = 'GMT';

	// looking for occurences of "GMT"
	var nodes = document.evaluate(".//text()[contains(.,'GMT')]/parent::*", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var node;

	for( var i =0; (node = nodes.snapshotItem(i)); i++) {
		// look for HH:MM GMT
		if( node.tagName == 'INPUT' || node.tagName == 'TEXTAREA' ) continue;
		node.innerHTML = node.innerHTML.replace(/(\d{2}):?(\d{2})\s*GMT/mgi,
			function (str, p1, p2, offset, s) {
				var minutes = Number(p1)*60 + Number(p2) + tzOffset;
				// adjust for day overlap
				if( minutes >= 1440 )
					minutes -= 1440;
				else if( minutes < 0 )
					minutes += 1440;
				if( tzInline )
					return '<span title="' + str + '">' + evoFormatNumberZ(minutes / 60,2) + ':' + evoFormatNumberZ(minutes % 60,2) + '&nbsp;' + tzName + '</span>';
				else
					return '<span title="' + evoFormatNumberZ(minutes / 60,2) + ':' + evoFormatNumberZ(minutes % 60,2) + '&nbsp;' + tzName + '">' + str + '</span>';
			});
	}
	
	// VTF
	if( (bulletLowScores = GM_getValue("bulletLowScores", false)) )
		GM_registerMenuCommand("Hide low scores in VTF", (function () { GM_setValue('bulletLowScores', false); alert("Please reload the page for the changes to take effect."); }), '', '', 'v');
	else
		GM_registerMenuCommand("Show low scores in VTF", (function () { GM_setValue('bulletLowScores',  true); alert("Please reload the page for the changes to take effect."); }), '', '', 'v');

	// forum tweak
	if( GM_getValue("forumStyle", false) )
		GM_addStyle(".heading { font-weight: bold; background-color: rgb(68,28,28); }\
					.entry.sticky { background-color: rgb(84,44,44); }\
					.comment { border-top-color: rgb(71,71,71); }\
					.comment.row1 { background-color: rgb(54,54,54); }\
					.comment.row2 { background-color: rgb(38,38,38); }\
					h4.commenttitle { border-bottom-color: rgb(71,71,71); }\
					h4.commenttitle a { color: rgb(212,212,212); }\
					");
}

//
// Master scan functionality
//
function evoMasterScan(){
var scan = document.evaluate("//div[@class='helpmessage']/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var table = document.evaluate("//div[@class='helpmessage']/table", document, null, 6, null).snapshotItem(0);
var scandrop = document.evaluate("//select[@name='scan_id']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (!scan) return;
var noCritters = false;
scan = scan.textContent;
var scanID = '';
	
	var scanName = '';
	// Who are we scanning?
	var personC = table.rows[0].cells[0].textContent;
	var stuff= personC.split("(");
	stuff= stuff[1].split(")");
	personCoord = stuff[0];
	
	personCoord2 = personCoord.split(",");
	var x = personCoord2[0];
	var y = personCoord2[1];
	personCoord3 = personCoord2[2].split(":");
	var z = personCoord3[0];
	var c = personCoord3[1];
	if (scan.indexOf("R&D Scan") != -1){	
	
		var m = /[0-9]{1,6}" style="background-color: darkgreen; color: white;">Sector/i.exec(scandrop.innerHTML);
		if (m != null) {
			var scanID = m.toString().split("\"")[0];
			okForNextScan = true;
		} else {
			var scanID = "Sector";
			okForNextScan = false;
		}
	
		// Get the entire table's content
		var cell = table.rows[2].cells[1].textContent;
		var mpCell = table.rows[2].cells[0].textContent;
		// Check what we have
		var pulseType = 'OP';
		if (mpCell.indexOf("Microwave pulse") != -1){ var pulseType = 'MP'; }
		if (cell.indexOf("Enhanced microwave emitter") != -1){ var pulseType = 'EMP'; }
		if (cell.indexOf("Overload pulse") != -1){ var pulseType = 'OP'; }
		// Stick it in a GM Variable
		var toStore = pulseType +'|'+personCoord;
		GM_setValue('prevMP', toStore);
	}
	
	if (scan.indexOf("Sector Scan") != -1){

		var m = /[0-9]{1,6}" style="background-color: darkgreen; color: white;">Creature/i.exec(scandrop.innerHTML);
		if (m != null) {
			var scanID = m.toString().split("\"")[0];
			okForNextScan = true;
		} else {
			var scanID = "Creature";
			okForNextScan = false;
		}

		// Remove R+D Section, we don't need it now we know if they have MP or not
		table.rows[11].removeChild(table.rows[11].cells[0]);
		table.rows[12].removeChild(table.rows[12].cells[0]);
		table.rows[12].removeChild(table.rows[12].cells[0]);
		table.rows[13].removeChild(table.rows[13].cells[0]);
		table.rows[13].removeChild(table.rows[13].cells[0]);
		
		// Land type breakdown
		var landTotal=0;
		var unused = evoString2Number(table.rows[6].cells[1].textContent);
		var metal = evoString2Number(table.rows[7].cells[1].textContent);
		var mineral = evoString2Number(table.rows[8].cells[1].textContent);
		var farming = evoString2Number(table.rows[9].cells[1].textContent);
		var landTotal = metal + mineral + farming + unused;
		// Values from table
		var food = evoString2Number(table.rows[4].cells[3].textContent);
		var creatures =  evoString2Number(table.rows[6].cells[3].textContent);
		var score = evoString2Number(table.rows[2].cells[1].textContent);
		
		// Approximate number of launches
		if (creatures > 0) {
			var launches = Math.floor(food / (FOODCOST * creatures));			
			table.rows[4].cells[3].innerHTML = table.rows[4].cells[3].innerHTML + ' | ' + '<font color="' + (launches > 1 ? 'red' : '#00FF00') + '"><span class="b" title="Approx fleet launches with current food and creatures." style="cursor:help;">' + Math.floor(launches) + '</span></font>';
		} else {
			noCritters = true;
			okForNextScan = false;
		}
		
		// Add our land percentages
		for( var i=6; i<=9; i++) {	
			table.rows[i].cells[1].innerHTML = table.rows[i].cells[1].textContent + '<span style="color:lightskyblue;"> :: ' + 		Math.round((evoString2Number(table.rows[i].cells[1].textContent) / landTotal)*100) +'%';
		}
		
		// Max attack to send for this land
		row = table.insertRow(11);
		newCell = row.insertCell(0);
		newCell.className = "alt1 b";
		newCell.innerHTML = "Max Att";
	 	newCell = row.insertCell(1);
		newCell.innerHTML = '<span style="color:orange;">' + evoNumber2String(landTotal/4*300000) + '</span>';

		newCell = row.insertCell(2);
		newCell.innerHTML = '&nbsp;';
		newCell = row.insertCell(3);
		newCell.innerHTML = '&nbsp;';
		
		
		// Do we have MP available?
		// Make sure the MP info is right for this person - Or even if it's available on first use
		mpType = GM_getValue('prevMP', "blah");
		mpUse = mpType.split("|");
		
		tester = table.rows[0].cells[0].textContent;
		if (tester.indexOf(mpUse[1]) == -1){
			mpUse[0] = "Unknown"; mpColour = 'lightblue'; mpAvail = 'Unknown';
		}
		
		// Get the stuff ready in the table
		if (mpUse[0] == 'OP'){ mpColour = 'lightgreen'; mpAvail = 'No'; }
		if (mpUse[0] == 'MP'){ mpColour = 'orange'; mpAvail = 'Yes'; }
		if (mpUse[0] == 'EMP'){ mpColour = 'red'; mpAvail = 'Enhanced'; }
		
		table.rows[10].cells[0].innerHTML = "Has MP?";
		table.rows[10].cells[1].innerHTML = '<span style="color:'+mpColour+'"><b>'+mpAvail+'</b></span>';
		
		// Store the string in the table ready for the master scan
		GM_setValue('sectorScan', String(table.innerHTML));
		GM_setValue('sectorScanName', personCoord);
			
	}
	
	if (scan.indexOf("Creature Scan") != -1){
		
		// Make sure this scan is the right person
		tester = table.rows[0].cells[0].textContent;
		if (tester.indexOf(GM_getValue('sectorScanName')) != -1){
		// Make it say that this is a Master Scan
		var messg = document.evaluate("//div[@class='helpmessage']/strong", document, null, 6, null).snapshotItem(0);
		messg.textContent = messg.textContent.replace("Creature","Master");
		
		// Add the scan to the creature scan
		var sTable = document.createElement('TABLE');			
			sTable.innerHTML = GM_getValue('sectorScan', '');
			sTable.innerHTML = sTable.innerHTML.replace("Sector","Master");
			sTable.className = 't_little';
			sTable.cellSpacing = 1;
			sTable.cellPadding = 0;
			table.parentNode.insertBefore(sTable, table);
		// Remove the creature scan title
			table.rows[0].removeChild(table.rows[0].cells[0]);
		// Calculate the exact number of launches and percentage fleet launch per day
			var food = sTable.rows[4].cells[3].innerHTML.split("|");
			curFood = sTable.rows[4].cells[3].textContent.split("|");
			var n = table.rows.length-1;
			var launchCost = evoString2Number(table.rows[n].cells[1].textContent);
			var ExactLaunches = Math.round(evoString2Number(curFood[0]) / launchCost);
			if (ExactLaunches <=3){launchCol='green'; }else{launchCol='red'; }
			var foodLand = sTable.rows[9].cells[1].textContent.split(":");
			var foodIncome = (((evoString2Number(foodLand[0]) * 100) + 500) * 24);
			var dailyLaunches = Math.round((foodIncome / launchCost) *100);
			if (dailyLaunches < 100) { 
				dailyCol = 'red';
				var cont = Math.round((evoString2Number(curFood[0]) - launchCost) / (launchCost - foodIncome));
				if (cont < 8) {var contCol = 'red';} else {var contCol = 'green';}
			}
			else {
				dailyCol = 'green';
				var cont = 'Forever';
				var contCol = 'green';
			}
			sTable.rows[4].cells[3].innerHTML = food[0] +' | <span style="font-weight:bold;color:'+launchCol+'">'+ExactLaunches+'</span>'
				+ ' | <span style="font-weight:bold;color:'+dailyCol+'">'+dailyLaunches+'%</span>'
				+ ' | <span style="font-weight:bold;color:'+contCol+'">'+cont+'</span>';
		// Show static att/def 
			sTable.rows[10].cells[2].innerHTML = "Static Att<sup>2</sup>/Def<sup>2</sup> ";
		// Total att/def
		    sTable.rows[11].cells[2].className = "alt1 b";
			sTable.rows[11].cells[2].innerHTML = "Total Att<sup>2</sup>/Def<sup>2</sup> ";
			var TotAtt = 0, TotDef = 0;
			Static = sTable.rows[10].cells[3].textContent.split("/");
			var m = table.rows.length-2;
			table.rows[m].cells[0].innerHTML = "Fleet Att<sup>2</sup>/Def<sup>2</sup> ";			
			Fleet = table.rows[m].cells[1].textContent.split("/");
			DefDef = Fleet[1].split("(");
			DefDef[1] = DefDef[1].replace(" )","");
			
			TotAtt = evoString2Number(Static[0]) + evoString2Number(Fleet[0]);
			TotDef = evoString2Number(Static[1]) + evoString2Number(DefDef[0]);
			TotDefDefender = evoString2Number(Static[1]) + evoString2Number(DefDef[1]);
			sTable.rows[11].cells[3].innerHTML = '<b><span style="color:red;">'+evoNumber2String(TotAtt)+'</span> / <span style="color:lightgreen;">'+ evoNumber2String(TotDef)+'</span> <span style="color:turquoise;">('+evoNumber2String(TotDefDefender)+')</span></b>';
			

		}
		
	}

	if (okForNextScan){
		var buttonhtml = "<form action='/scans' method='post'><input type='hidden' value='"+scanID+"' 			name='scan_id' /><input type='hidden'  value='" + x + "' name='scaninput[x]' /><input type='hidden' 			value='" + y + "' name='scaninput[y]' /><input type='hidden' value='" + z + "' name='scaninput[z]' /><input 			type='hidden' value='" + c + "' name='scaninput[c]' /><input name='launch_scan' value='Next >>' 		type='submit'></form>";

		var row = table.insertRow(0);
        	var newCell = row.insertCell(0);
        	newCell.innerHTML = buttonhtml;
	} else {
		if (noCritters) {
			alert("Target has no creatures, so you have no 'Next >>' button");
		} else {
			alert("You need a " + scanID + " scan for full Master Scan functionality");
		}
	} 
}

///
/// affairs page
///

function evoAffairs()  {
    var table = document.evaluate(".//table[@class='t_little'][preceding-sibling::div[@class='seperator']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    if( table != null ) {
        // insert a column to show players' online/offline status
        table.rows[0].insertCell(3);
        table.rows[0].cells[3].textContent = 'Change Vote'; // New heading

        for(var i=2; i < table.rows.length; i++) {
            //if( table.rows[i].cells.length < 4 ) continue;

            var cell1 = table.rows[i].cells[0];
           
            //Add an "attack this" button           
            var coords = table.rows[i].cells[0].textContent.split(",");
            coords[0] = coords[0].substring(1);
            coords[2] = coords[2].split(":");
            coords[3] = coords[2][1].substring(0,1);
            coords[2] = coords[2][0];
            table.rows[i].insertCell(3);
            table.rows[i].cells[3].innerHTML = "<form method=\"post\"><input value=\""+ coords[3] + "\" type=\"hidden\" name=\"vote\"><input type=\"submit\" value=\"Vote\"></form>";
        }
    }
}

///
/// auction page
///

function evoAuctions() {
    //evo_debug("ENTER evoAuctions",299);

    var UnitsForAuction = document.getElementsByTagName("option");
   
    for (var count=UnitsForAuction.length -1;count > -1 ;count--)
    {
        var searchText = UnitsForAuction[count].text.toLowerCase();
        var match = searchText.search("fleet");
        if (match > -1) {
            var UnitToDelete = document.getElementsByTagName("option")[count];
            UnitToDelete.parentNode.removeChild(UnitToDelete);
        }
    }
    //evo_debug("EXIT evoAuctions",299);   
}

///
/// auction item "Previous" and "Next" buttons
/// and some auction detail...
///

function evoAuctionNext() {
	var sPath = window.location.pathname;
	var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
	var node = document.evaluate("id('content')/table[1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if( node ) { 
			var a = document.createElement('a');
			a.href = '/auctions/view/' + (parseInt(sPage) - 1);
			a.title = "Previous Auction";
			a.textContent = "<Previous";
			node.appendChild(a);
			a.style.fontSize = "8pt"
			a.style.fontWeight = "bold"
			a.style.marginLeft = "10px";
			var a = document.createElement('a');
			a.href = '/auctions/view/' + (parseInt(sPage) + 1);
			a.title = "Next Auction";
			a.textContent = "Next>";
			node.appendChild(a);
			a.style.fontSize = "8pt"
			a.style.fontWeight = "bold"
			a.style.marginLeft = "10px";
		}
	table = document.evaluate("id('content')/table[3]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (table == null) return;
	rows = table.rows;
	for (var i = 0; i < rows.length-2; i++) {
		resource = rows[i].cells[0].textContent;
		bidDetail = rows[i].cells[1].innerHTML;
		while ( bidDetail.indexOf(",") != -1) {
			bidDetail = bidDetail.replace(",","");
		}
		pos1 = bidDetail.indexOf('b">') + 3;
		pos2 = bidDetail.indexOf("<", pos1);
		pos3 = bidDetail.indexOf('b">', pos2) + 3;
		pos4 = bidDetail.indexOf("<", pos3);
		nextBid = parseInt(bidDetail.substring(pos1,pos2));
		maxBid = parseInt(bidDetail.substring(pos3,pos4));
		bidToMax = Math.round((maxBid / 1.15) + 0.5);
		if (nextBid > maxBid) {
			rows[i].cells[1].innerHTML = bidDetail.substring(0, bidDetail.indexOf("<br>") + 4) + resource + " Maxed</i>";
		} else {
			if (nextBid < bidToMax) {
				rows[i].insertCell(2);
				rows[i].cells[2].textContent=" (" + bidToMax + " bid will max the " + resource + ")";
			}
		}
	}
}

///
/// auction interpret code
///

function evoAuctionScan() {
	var limitMult = 2.174;
	var node = document.evaluate("//table[@class='t_little auctiontable']", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	auctionTable = node.snapshotItem(0);
	if (auctionTable == null) return;
	rows = auctionTable.rows;
	for( var i = 2; i < rows.length; i++) {
		var oneResource = false;
		var metalMaxed = false;
		var mineralMaxed = false;
		auctionCells = rows[i].cells;
		if (auctionCells.length != 7) continue;
		itemName = auctionCells[1].textContent;
		itemValues = auctionCells[2].innerHTML;
		while ( itemValues.indexOf(",") != -1) {
			itemValues = itemValues.replace(",","");
		}
		metalVal = parseInt(itemValues.substring(0, itemValues.indexOf("<")));
		mineralVal = parseInt(itemValues.substring(itemValues.indexOf(">")+1));
		itemOffers = auctionCells[3].innerHTML;
		pos1 = itemOffers.indexOf(">") + 1;
		pos2 = itemOffers.indexOf("<", pos1);
		metalOffVal = parseInt(itemOffers.substring(pos1, pos2).replace(",",""));
		pos3 = itemOffers.indexOf('">', pos2) + 2;
		if (pos3 == 1) {
			mineralOffVal = metalOffVal;
			oneResource = true;
		} else {
			pos4 = itemOffers.indexOf("<", pos3);
			mineralOffVal = parseInt(itemOffers.substring(pos3, pos4).replace("<",""));
		}
		if (oneResource) {
			if (metalOffVal > (Math.max(metalVal, mineralVal) * limitMult) ) {
				auctionCells[3].innerHTML = '<span class="red">Maxed</span>';
			}
		} else {
			if (metalOffVal > (metalVal * limitMult)) {
				metalMaxed = true;
				repPos1 = pos1;
				repPos2 = pos2;
				repText = "Metal ";
			}
			if (mineralOffVal > (mineralVal * limitMult)) {
				mineralMaxed = true;
				repPos1 = pos3;
				repPos2 = pos4;
				repText = "Mineral ";
			}
			if (metalMaxed && mineralMaxed) { 
				auctionCells[3].innerHTML = '<span class="red">Maxed</span>';
				continue;
			}
			if (!metalMaxed && !mineralMaxed) continue;
			auctionCells[3].innerHTML = itemOffers.substring(0, repPos1) + repText + "Maxed" + itemOffers.substring(repPos2);
		}
		itemBids = auctionCells[6].textContent;
		if (parseInt(itemBids) == 0) {
			//alert (itemName);
		}
	}
}

function evoAlliRankings() {

	//EVO_debug("ENTER evoAlliRankings",399);
	var rankTable = document.evaluate(".//table[@class='XHTMLTable alliance']", contents, null, XPathResult.FIRST_ORDERED_NODE_TYPE, 	null).singleNodeValue;
	rankTable.rows[0].insertCell(6);
	rankTable.rows[0].cells[6].textContent = 'Avg. Member land (Rounded)'; // New heading
	for( var j = 1; j < rankTable.rows.length; j++ ) {
		if( rankTable.rows[j].cells.length != 6 ) continue;
		members = rankTable.rows[j].cells[2];
		totmembers = evoString2Number(members.textContent);
		allilands = rankTable.rows[j].cells[3];
		totlands = evoString2Number(allilands.textContent);
		rankTable.rows[j].insertCell(6);
		if (j > 1 && j < 21){
			rankTable.rows[j].cells[6].innerHTML = Math.round(totlands/totmembers);
		}
	}
}

//
// ***************************************************************************
// ** CONFIG
// ***************************************************************************
//

GM_registerMenuCommand( "Configure boosts...", evoConfigBoosts, null, null, 'b' );
function evoConfigBoosts() {
	var n;
	if(( n = prompt( "Boosts for Natural Creatures?\n(e.g. 39.466250 for Nanotech. or 27.050 for Advanced Genetics)", boosts[UT_NATURAL] * 100 )) != null && !isNaN( n = Number( n ))) GM_setValue( 'boostNat', String( n / 100 ));
	if(( n = prompt( "Boosts for Archaeological Creatures?\n(e.g. 33.126875 for Nanotech. or 21.275 for Advanced Genetics)", boosts[UT_ENG]*100)) != null && !isNaN(n
 = Number( n ))) GM_setValue('boostEng', String( n / 100 ));
	alert( "Please reload the page for the changes to take effect." );
}
GM_registerMenuCommand( "Configure input borders...", evoSetBorders );
function evoSetBorders() {
	var confborder = prompt( "Enter the colour name or code, or hit cancel to deactivate borders", "red" );
	if (confborder == null) {
		boxBorder = false;
	} else {
		boxBorder = true;
		boxColour = '1px solid ' + confborder;
	}	
	GM_setValue('boxBorder', boxBorder);
	GM_setValue('boxColour', boxColour);
	alert( "Please reload the page for the changes to take effect.") ;
}
	

//
// ***************************************************************************
// ** MAIN
// ***************************************************************************
//
(function () {
	var totalPlayers = null;
	var match;
	var node;
	var panel;

	var profiler = Date.now();

	// Initialization
	// -----------------------------------------------------------------------
	// contents node
	contents = document.getElementById("content");

	// get out of the bloody forums message editor
	if( contents == null ) return;

	// initialize the units table
	evoUnitsInitialize();

	// grab player's available resources
	panel = document.getElementById("navstatus");
	if( panel != null ) {
    	var match = new Array();
    	resources = document.evaluate("id('navstatus')/acronym",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    	for( i = 0; resource = resources.snapshotItem(i); i++ )
    	{
    	    match[resource.title] = resource.textContent.match(/[\d,]+/);
    	}
   
    	unsafeWindow.evo_plus['pMetal'] = pMetal = evoString2Number(String(match['Metal']));
    	unsafeWindow.evo_plus['pMineral'] = pMineral = evoString2Number(String(match['Mineral']));
    	unsafeWindow.evo_plus['pFood'] = pFood = evoString2Number(String(match['Food']));
    	unsafeWindow.evo_plus['pGold'] = pGold = evoString2Number(String(match['Gold']));
    	unsafeWindow.evo_plus['pScore'] =pScore = evoString2Number(String(match['Score']));
	}
	// ranking
	panel = document.evaluate("//div[@id='panelinfo']/table/tbody/tr/td[2]/p", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( panel != null ) {
		match = panel.innerHTML.match(/<strong>[\s\S]*<\/strong>[\s\S]*<br><strong>[\s\S]*<\/strong>[\s]+([\d,]+)\s\S*\s([\d,]+)/);
		if( match != null ) {
			pRank = match[1];
			totalPlayers = match[2];
		}
	}
	// coords
	unsafeWindow.evo_plus.coords = GM_getValue('evoCoords');

	// Dispatch
	// -----------------------------------------------------------------------
	for(var i = 0; i < pageHandlers.length; i++ ) {
		if( pageHandlers[i].urlRegEx == null || pageHandlers[i].urlRegEx.test(document.location.pathname) )
			pageHandlers[i].handler();
	}

	// THE evo+ bar
	// -----------------------------------------------------------------------
	node = document.createElement('DIV');
	node.style.textAlign="right";
	node.style.marginRight="5px";
	node.style.marginTop="3px";
	node.style.marginBottom="3px";

	function addItemToContent(c, text, className, html, isLastItem) {
		c.appendChild(document.createTextNode(text));
		var span = document.createElement('SPAN');
		span.className = className;
		if( isLastItem ) html += "&nbsp;|&nbsp;";
		span.innerHTML = html;
		c.appendChild(span);
	}

	addItemToContent(node, 'Rank: ', 't_normal b', pRank + "/" + totalPlayers, true);
	addItemToContent(node, 'Min. TargetScore: ', 't_normal b', evoNumber2String(Math.ceil(pScore * minAttack)), true);
	addItemToContent(node, 'Max. AttackerScore: ', 't_normal b', evoNumber2String(Math.floor(pScore / minAttack)), false);
	addItemToContent(node, '', 't_normal b', "<br/>", false);

	// Quick Link code part 2:
	addItemToContent(node, 'Quick Links: ', 't_normal b', "<a href=\"" + quickLinks[0] + "\">" + quickLinksText[0] + "</a>", true);
	for (var j = 1; j < quickLinks.length; j++) {
		if (j == (quickLinks.length - 1)) {
			addItemToContent(node, '', 't_normal b', "<a href=\"" + quickLinks[j] + "\">" + quickLinksText[j] + "</a>", false);
		} else {
			// not the last element, so it gets a divider bar
			addItemToContent(node, '', 't_normal b', "<a href=\"" + quickLinks[j] + "\">" + quickLinksText[j] + "</a>", true);
		}
	}
	// end of Quick Link code part 2

	contents.parentNode.insertBefore(node, contents);

	node = document.createElement('DIV');
	node.style.color = "lawngreen";
	node.style.fontSize = "8pt"; node.style.fontWeight = "bold";
	node.style.paddingLeft = "3px"; node.style.paddingTop = "3px";
	node.style.position = "absolute";
	node.title = scriptTag;
	node.id = "evomagik";
	panel = document.getElementById('navbar');
	panel.parentNode.insertBefore(node, panel);

	profiler = Date.now() - profiler;
//	GM_log('evo+ exec time: ' + profiler + ' ms');
	
	// fix a bug in evo with non existent adverts that prevent the use of the top panel 
	if(! (node = document.getElementById('advert')) ) {
		node = document.createElement('span');
		node.id = 'advert';
		contents.appendChild(node);
	}
	
}) ();

//
// ***************************************************************************
// ** Helper functions
// ***************************************************************************
//
function gcf(a,b) {
	while( b != 0 ) {
		t = a%b;
		a = b;
		b = t;
	}
	return a;
}

function evoNumber2String(num) {
	var re = /(\d+)(\d{3})/g;
	num = String(num);
	var decimalIdx = num.indexOf('.');
	var part1 = '1', part2="";
	if( decimalIdx != -1 ) {
		part1 = num.substring(0, decimalIdx);
		part2 = num.substring(decimalIdx + 1, num.length);
	} else {
		part1 = num;
	}
	while( re.test(part1) ) part1 = part1.replace(re, '$1,$2');
	return part2 == "" ? part1 : part1 + "." + part2;
}

function evoString2Number(num) {
	return Number(num.replace(/,/g,''));
}

function evoFormatNumberZ(num, zeros) {
	var str = "0000" + Math.floor(Math.abs(num));
	return str.substr(-zeros);
}

//
// ***************************************************************************
// ** Objects
// ***************************************************************************

// evoUnit
function evoUnit(unitName, unitType, ticks, metal, mineral, attack, defense, intel, weight, defenseBoost, eats) {
	this.unitName = unitName;
	this.unitType = unitType;
	this.defense = defense;
	this.attack = attack;
	this.metal = metal;
	this.ticks = ticks;
	this.intel = intel;
	this.weight = weight;
	this.mineral = mineral;
	this.eats = eats;
	this.defenseBoost = defenseBoost/100 + 1;
	return this;
}

//
// Page Handler hooks
function pageHandler(urlRegEx, handler) {
	this.urlRegEx = urlRegEx;
	this.handler = handler;
}
function regPageHandler(urlRegEx, handler) {
	pageHandlers.push(new pageHandler(urlRegEx,  handler));
}

//
// ***************************************************************************
// ** MISC
// ***************************************************************************

// GM implementation of cookies :)
function evoSetCookie(name, value, hours) {
	GM_setValue('cv_' + name, value);
	var expire = new Date();
	expire.setUTCHours(expire.getUTCHours() + hours);
	GM_setValue('cx_' + name, expire.toGMTString());

}

function evoGetCookie(name) {
	var value = GM_getValue('cv_' + name);
	var expire = GM_getValue('cx_' + name);
	if( value != null && expire != null ) {
		expire = new Date(expire);
		if( expire.valueOf() >= Date.now() ) return value;
	}
	return null;
}

//
// ***************************************************************************
// ** Evo units stats
// ***************************************************************************
function evoUnitsInitialize() {
	evoUnit.prototype.getFoodCost = function(count) {
		return this.eats?count * (this.mineral+this.metal)/100:0;
	}

	evoUnit.prototype.isCritter = function() {
		return (this.eats);
	}

	evoUnit.prototype.getAttackScore = function(count) {
		return count * this.attack * this.attack;
	}

	evoUnit.prototype.getDefenseScore = function(count) {
		//Changed to reflect correct formula, Thanks to Mefisto of Alexandria
		return count * this.defense * this.defense * this.defenseBoost;
	}

	evoUnit.prototype.getMaxUnits = function (metal, mineral) {
		if( this.unitType == UT_NATURAL )
			return Math.min(Math.floor(metal / (this.metal * eeb)), Math.floor(mineral / (this.mineral * eeb)));
		else
			return Math.min(Math.floor(metal / this.metal), Math.floor(mineral / this.mineral));
	}

	evoUnit.prototype.getMetal = function() {
		return this.unitType == UT_NATURAL ? (this.metal * eeb) : this.metal;
	}

	evoUnit.prototype.getMineral = function() {
		return this.unitType == UT_NATURAL ? (this.mineral * eeb) : this.mineral;
	}

	evoUnit.prototype.getBoost = function() {
		return boosts[this.unitType];
	}

	evoUnit.prototype.getWeight = function() {
		return this.weight;
	}
	evoUnit.prototype.getMaxBoosts = function() {
		return maxBoosts[this.unitType];
	}
	units['monkey']           = new evoUnit('Monkey'           ,UT_NATURAL ,3   ,500    ,250    ,4   ,4   ,3   ,0  ,40 ,true);
	units['guerrilla ']       = new evoUnit('Guerrilla '       ,UT_NONE    ,24  ,3000000,4500000,5000,1   ,0  ,0  ,40 ,true);
	units['spy']		  = new evoUnit('spy'		     ,UT_NONE    ,24  ,1000000,500000 ,0  ,0   ,0   ,0  ,40 ,true);
	units['sheep']            = new evoUnit('Sheep'            ,UT_NATURAL ,4   ,1500   ,750    ,11  ,11  ,6   ,0  ,40 ,true);
	units['wolf']             = new evoUnit('Wolf'             ,UT_NATURAL ,10  ,8000   ,4000   ,27  ,25  ,14  ,0  ,40 ,true);
	units['python']           = new evoUnit('Python'           ,UT_NATURAL ,12  ,12500  ,5000   ,36  ,30  ,7   ,1  ,40 ,true);
	units['kangaroo']         = new evoUnit('Kangaroo'         ,UT_NATURAL ,15  ,15000  ,8000   ,36  ,40  ,5   ,1  ,40 ,true);
	units['walrus']           = new evoUnit('Walrus'           ,UT_NATURAL ,18  ,26000  ,13000  ,52  ,51  ,4   ,2  ,40 ,true);
	units['cow']              = new evoUnit('Cow'              ,UT_NATURAL ,6   ,2500   ,1250   ,16  ,13  ,3   ,1  ,40 ,true);
	units['hyena']            = new evoUnit('Hyena'            ,UT_NATURAL ,9   ,8800   ,3300   ,28  ,27  ,9   ,1  ,40 ,true);
	units['ostrich']          = new evoUnit('Ostrich'          ,UT_NATURAL ,12  ,18000  ,8000   ,42  ,44  ,6   ,2  ,40 ,true);
	units['bear']             = new evoUnit('Bear'             ,UT_NATURAL ,15  ,30000  ,15000  ,60  ,57  ,12  ,3  ,40 ,true);
	units['elephant']         = new evoUnit('Elephant'         ,UT_NATURAL ,19  ,42000  ,21000  ,72  ,75  ,22  ,4  ,40 ,true);
	units['horse']            = new evoUnit('Horse'            ,UT_NATURAL ,5   ,2000   ,1000   ,13  ,13  ,4   ,1  ,40 ,true);
	units['fox']              = new evoUnit('Fox'              ,UT_NATURAL ,9   ,7200   ,3200   ,24  ,25  ,8   ,0  ,40 ,true);
	units['puma']             = new evoUnit('Puma'             ,UT_NATURAL ,13  ,11000  ,5000   ,32  ,32  ,5   ,1  ,40 ,true);
	units['lynx']             = new evoUnit('Lynx'             ,UT_NATURAL ,15  ,12000  ,5500   ,35  ,31  ,8   ,1  ,40 ,true);
	units['lion']             = new evoUnit('Lion'             ,UT_NATURAL ,15  ,12000  ,5000   ,31  ,35  ,8   ,1  ,40 ,true);
	units['cheetah']          = new evoUnit('Cheetah'          ,UT_NATURAL ,16  ,14000  ,7000   ,41  ,29  ,5   ,1  ,40 ,true);
	units['panther']          = new evoUnit('Panther'          ,UT_NATURAL ,16  ,14000  ,8000   ,32  ,41  ,6   ,1  ,40 ,true);
	units['tiger']            = new evoUnit('Tiger'            ,UT_NATURAL ,20  ,18000  ,9000   ,44  ,43  ,11  ,2  ,40 ,true);
	units['rhino']            = new evoUnit('Rhino'            ,UT_NATURAL ,24  ,28000  ,17000  ,66  ,51  ,3   ,3  ,40 ,true);
	units['centaur']          = new evoUnit('Centaur'          ,UT_ENG     ,5   ,4800   ,2400   ,22  ,23  ,10  ,1  ,40 ,true);
	units['unicorn']          = new evoUnit('Unicorn'          ,UT_ENG     ,8   ,7500   ,3750   ,31  ,26  ,6   ,1  ,40 ,true);
	units['gryphon']          = new evoUnit('Gryphon'          ,UT_ENG     ,12  ,10500  ,5250   ,36  ,36  ,8   ,2  ,40 ,true);
	units['minotaur']         = new evoUnit('Minotaur'         ,UT_ENG     ,18  ,19000  ,9500   ,54  ,43  ,13  ,2  ,40 ,true);
	units['dragon']           = new evoUnit('Dragon'           ,UT_ENG     ,24  ,30000  ,15000  ,76  ,67  ,9   ,3  ,40 ,true);
	units['fire sprite']      = new evoUnit('Fire Sprite'      ,UT_ENG     ,4   ,5000   ,2500   ,25  ,18  ,4   ,0  ,40 ,true);
	units['salamander']       = new evoUnit('Salamander'       ,UT_ENG     ,7   ,9000   ,4500   ,36  ,26  ,10  ,1  ,40 ,true);
	units['phoenix']          = new evoUnit('Phoenix'          ,UT_ENG     ,10  ,14600  ,7300   ,44  ,35  ,6   ,1  ,40 ,true);
	units['wyvern']           = new evoUnit('Wyvern'           ,UT_ENG     ,15  ,25000  ,12500  ,64  ,43  ,7   ,2  ,40 ,true);
	units['demon']            = new evoUnit('Demon'            ,UT_ENG     ,20  ,34000  ,17000  ,93  ,58  ,5   ,3  ,40 ,true);
	units['dryad']            = new evoUnit('Dyrad'            ,UT_ENG     ,7   ,3600   ,2700   ,21  ,21  ,13  ,1  ,40 ,true);
	units['basilisk']         = new evoUnit('Baskilisk'        ,UT_ENG     ,10  ,5800   ,4350   ,29  ,24  ,21  ,1  ,40 ,true);
	units['medusa']           = new evoUnit('Medusa'           ,UT_ENG     ,15  ,10000  ,7500   ,37  ,34  ,15  ,1  ,40 ,true);
	units['cockatrice']       = new evoUnit('Cockatrice'       ,UT_ENG     ,21  ,18000  ,13500  ,54  ,45  ,23  ,2  ,40 ,true);
	units['werewolf']         = new evoUnit('Werewolf'         ,UT_ENG     ,28  ,26000  ,19500  ,70  ,64  ,30  ,2  ,40 ,true);
	units['avimimus']         = new evoUnit('Avimimus'         ,UT_ENG     ,4   ,3600   ,1800   ,22  ,17  ,2   ,1  ,40 ,true);
	units['therizinosaurus']  = new evoUnit('Therizinosaurus'  ,UT_ENG     ,6   ,5300   ,2650   ,26  ,22  ,3   ,1  ,40 ,true);
	units['styracosaurus']    = new evoUnit('Styracosaurus'    ,UT_ENG     ,8   ,9400   ,4700   ,33  ,35  ,8   ,2  ,40 ,true);
	units['carnotaurus']      = new evoUnit('Carnotaurus'      ,UT_ENG     ,11  ,15200  ,7600   ,51  ,41  ,5   ,3  ,40 ,true);
	units['giganotosaurus']   = new evoUnit('Giganotosaurus'   ,UT_ENG     ,14  ,24000  ,12000  ,75  ,56  ,4   ,4  ,40 ,true);
	units['scarab beetle']    = new evoUnit('Scarab Beetle'    ,UT_ENG     ,8   ,6000   ,3000   ,25  ,25  ,7   ,0  ,40 ,true);
	units['mummy']            = new evoUnit('Mummy'            ,UT_ENG     ,12  ,12000  ,6000   ,38  ,35  ,1   ,1  ,40 ,true);
	units['sta']              = new evoUnit('Sta'              ,UT_ENG     ,18  ,19000  ,9500   ,46  ,44  ,12  ,1  ,40 ,true);
	units['sphinx']           = new evoUnit('Sphinx'           ,UT_ENG     ,24  ,28000  ,14000  ,67  ,57  ,14  ,3  ,40 ,true);
	units['anubis incarnate'] = new evoUnit('Anubis Incarnate' ,UT_ENG     ,32  ,42000  ,21000  ,93  ,78  ,7   ,3  ,40 ,true);
	units['fort']             = new evoUnit('Fort'             ,UT_NONE    ,4   ,2000   ,1000   ,40  ,40  ,0   ,0  ,40 ,false);
	units['satellite']        = new evoUnit('Satellite'        ,UT_NONE    ,6   ,7000   ,3500   ,70  ,60  ,0   ,0  ,40 ,false);
	units['satellite mark 2'] = new evoUnit('Satellite Mark 2' ,UT_NONE    ,6   ,8000   ,4000   ,85  ,75  ,0   ,0  ,40 ,false);
	units['test sat mark 2']  = new evoUnit('Test Sat mark 2'  ,UT_NONE    ,6   ,8000   ,4000   ,85  ,75  ,0   ,0  ,40 ,false);
	units['nanowire wall']    = new evoUnit('Nanowire wall'    ,UT_NONE    ,9   ,12000  ,4500   ,150  ,120  ,0   ,0  ,40 ,false);
	units['superstealthwall'] = new evoUnit('superstealthwall' ,UT_NONE    ,21  ,15000  ,6000   ,110 ,110 ,0   ,0  ,40 ,false);   
	units['wave reflector']   = new evoUnit('Wave Reflector'   ,UT_NONE    ,4   ,2000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);
	units['biochemical missile']     = new evoUnit('Biochemical Missile' ,UT_NONE ,12  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
	units['nanovirus missile']       = new evoUnit('Nanovirus Missile' ,UT_NONE    ,12  ,30000  ,15000  ,0   ,0   ,0   ,0  ,0  ,false);
	units['bombs']                   = new evoUnit('Bombs'            ,UT_NONE    ,12  ,33000  ,12000   ,0   ,0   ,0   ,0  ,0  ,false);
	units['neural reorganiser bomb'] = new evoUnit('Neural Reorganiser Bomb' ,UT_NONE ,24,50000 ,32000 ,0  ,0   ,0   ,0  ,0  ,false);
	units['poison bombs']            = new evoUnit('Poison Bombs'     ,UT_NONE    ,16  ,16000  ,12000  ,0   ,0   ,0   ,0  ,0  ,false);
	units['land scan']        = new evoUnit('Land Scan'        ,UT_NONE    ,4   ,1000   ,2000   ,0   ,0   ,0   ,0  ,0  ,false);
	units['scan amplifier']   = new evoUnit('Scan Amplifier'   ,UT_NONE    ,4   ,1000   ,1000   ,0   ,0   ,0   ,0  ,0  ,false);
	units['sector scan']      = new evoUnit('Sector Scan'      ,UT_NONE    ,8   ,2000   ,4000   ,0   ,0   ,0   ,0  ,0  ,false);
	units['creature scan']    = new evoUnit('Creature Scan'    ,UT_NONE    ,8   ,3000   ,6000   ,0   ,0   ,0   ,0  ,0  ,false);
	units['r&d scan']         = new evoUnit('R&D Scan'         ,UT_NONE    ,6   ,2000   ,3000   ,0   ,0   ,0   ,0  ,0  ,false);
	units['news scan']        = new evoUnit('News Scan'        ,UT_NONE    ,18  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0  ,false);
	units['military scan']    = new evoUnit('Military Scan'    ,UT_NONE    ,12  ,6000   ,12000  ,0   ,0   ,0   ,0  ,0  ,false);
	units['microwave pulse']  = new evoUnit('Microwave Pulse'  ,UT_NONE    ,20  ,520000  ,1040000  ,0   ,0   ,0   ,0  ,0  ,false);
	units['overload pulse']   = new evoUnit('Overload Pulse'   ,UT_NONE    ,24  ,1600000  ,3200000  ,0   ,0   ,0   ,0  ,0  ,false);
	unsafeWindow.evo_plus['units'] = units;
}

GM_log("evo+ Finished");