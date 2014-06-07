// ==UserScript==
// @name           Facebook Mafia Wars - Enhancement Framework
// @namespace      http://userscripts.org/users/101456
// @description    Framework for Facebook Mafia Wars enhancements. Calls functions based on page clicked on.
// @include        http://apps.facebook.com/inthemafia/*
// ==/UserScript==

function determinePage() {
  var objlTemp = getXPath("//div[@id='app10979261223_inner_page']//div[@class='title']");

  if ( objlTemp.snapshotLength>0 ) {

    // If so, we're on the Properties page!
    if (objlTemp.snapshotItem(0).innerHTML.match(/^[\s]*Properties/)) {
execute('properties');

    } else if (/[.\s]*Join the Mafia Mailing List/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('home');

    } else if (/[.\s]*Go to War/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('war');

    } else if (/[.\s]*Businesses/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('businesses');

    } else if (/[.\s]*Total Job Bribe/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('inventoryCuba');

    } else if (/[.\s]*Loot/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('loot');

    } else if (/[.\s]*Collections/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('collections');

    } else if (/[.\s]*Gifting/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('gifting');

    } else if (/[.\s]*The Godfather/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('godfather');

    } else if (/[.\s]*, level [\d]+/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('profile');

    } else if (/[.\s]*My Achievements/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('achievements');

    } else if (/[.\s]*Your Mafia Members/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('mafia');

    } else if (/[.\s]*Your Mafia/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('recruit');

    } else if (/[.\s]*Top Families/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('topFamilies');

    } else if (/[.\s]*Robbing List/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('rob');

    } else if (/[.\s]*Total Upkeep/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('inventoryNY');

    } else if (/[.\s]*The Hospital/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('hospital');

    } else if (/[\s]*The Bank/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute('bank');

    // Jobs that have preparation show up here instead of the other 'else' clause
    // So do "Boss Fights" that we don't yet qualify for.
    } else if (/[\s]*Jobs preparation/.test(objlTemp.snapshotItem(0).innerHTML)
             ||  /[\s]*Boss Fight/.test(objlTemp.snapshotItem(0).innerHTML) ) {
execute("jobs");
    } else {
      GM_log('Unknown Title: ' + objlTemp.snapshotItem(0).innerHTML);
    }

  } else {
      objlTemp = getXPath("//div[@id='app10979261223_inner_page']/div/table[@class='job_list']/tbody/tr");
      if ( objlTemp.snapshotLength>0 ) {
execute("jobs");
      } else {
        GM_log("No title");
      }
  }
}


/*****************************************************************/
// 
// Pilfered from http://userscripts.org/scripts/show/45937
// Used to load the rest of the script.
// v v v v v v
function GM_MW_DoEvents()
{
  GM_MW_RemoveListener();

  try
  {
    determinePage();
  }
  catch (err)
  {
    GM_log('Exception caught: ' + err.name + ' - ' + err.message);
  }

  GM_MW_AddListener();
}

function GM_MW_AddListener()
{
  if (!eventAdded)
  {
    document.addEventListener("DOMNodeInserted", GM_MW_DoEvents, false);
    
    eventAdded = true;
  }
}

var eventAdded = false;

function GM_MW_RemoveListener()
{
  if (eventAdded)
  {
    document.removeEventListener("DOMNodeInserted", GM_MW_DoEvents, false);

    eventAdded = false;
  }
}
// ^ ^ ^ ^ ^
// Pilfered from http://userscripts.org/scripts/show/45937
// 

/****************************************************************/
function getXPath(expression) {
  return document.evaluate( expression, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null);
}

/***************************************************************/
var mySandbox = {
  properties: function(){ GM_log('nofunction');},
  home: function(){ GM_log('nofunction');},
  war: function(){ GM_log('nofunction');},
  businesses: function(){ GM_log('nofunction');},
  inventoryCuba: function(){ GM_log('nofunction');},
  inventoryNY: function(){ GM_log('nofunction');},
  loot: function(){ GM_log('nofunction');},
  collections: function(){ GM_log('nofunction');},
  gifting: function(){ GM_log('nofunction');},
  godfather: function(){ GM_log('nofunction');},
  profile: function(){ GM_log('nofunction');},
  achievements: function(){ GM_log('nofunction');},
  mafia: function(){ GM_log('nofunction');},
  recruit: function(){ GM_log('nofunction');},
  topFamilies: function(){ GM_log('nofunction');},
  rob: function(){ GM_log('nofunction');},
  hospital: function(){ GM_log('nofunction');},
  bank: function(){ GM_log('nofunction');},
  jobs: function(){ GM_log('nofunction');}
};

function GM_MW_register(name, funcDef) {
  if ( mySandbox[name] ) {
    mySandbox[name] = funcDef;
    return 1;
  }
  return 0;
}

function execute( name ) {
  if ( mySandbox[name] ) {
    try {
      (mySandbox[name])();
    } catch (err) {
      GM_log('Unable to run '+name+':'+err.name+ ' = ' +err.message);
    }
  }
}
