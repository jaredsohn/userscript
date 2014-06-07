// ==UserScript==
// @name           YA Facebook Mafia Wars Interface Enhancement
// @description    Another Facebook Mafia wars interface enhancement.
// @include        http://apps.facebook.com/inthemafia/*
// ==/UserScript==


/*****************************************************************/

var User = function() {
this.cash = 0;
this.health = 0;
this.maxHealth = 0;
this.energy = 0;
this.maxEnergy = 0;
this.stamina = 0;
this.maxStamina = 0;
this.exp = 0;
this.maxExp = 0;
this.level = 0;
this.rewardPoints = 0;
this.mafiaSize = 0;
this.profilePoints = 0;
}

function getUserInfo() {
//GM_log('getUserInfo started');
  var objlTemp = getXPath("//strong[contains(@id,'app10979261223_user_cash')]" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.cash = cashToInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_health']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.health = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_max_health']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.maxHealth = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_energy']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.energy = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_max_energy']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.maxEnergy = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_stamina']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.stamina = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_max_stamina']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.maxStamina = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_level']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.level = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_experience']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.exp = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_exp_for_next_level']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.maxExp = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_group_size']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.mafiaSize = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_favor']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.rewardPoints = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }

  var objlTemp = getXPath("//span[@id='app10979261223_user_skill']" ,document);
  if ( objlTemp.snapshotLength>0 ) {
    User.profilePoints = parseInt(objlTemp.snapshotItem(0).innerHTML);
  }
//GM_log('getUserInfo ended');
}

function processUser() {
//GM_log('processUser started');
  getUserInfo();

  var objlTemp = getXPath("//div[@class='user_xp_level']/div[1]/span",document);
  if (objlTemp.snapshotLength>0) {
    objlTemp.snapshotItem(0).innerHTML = 'Exp (-' + (User.maxExp - User.exp) + ')';
  }
//GM_log('processUser ended');
}

/****************************************************************/
var searchPath = "//table[@class='main_table']/tbody/tr";

// Land search paths
var landNameIncPath = "/td[2]/div/strong";
var landCostPath = "/td/table/tbody/tr[1]/td[1]/strong[@class='money']";
var landOwnPath = "/td/table/tbody/tr[2]/td";
var landBuyPath = landOwnPath + "/../..//select[@name='amount']";

// Property search paths
var propNamePath = "/td[2]/strong";
var propIncOwnPath = "/td[2]/div/strong";
var propBuildPath = "/td/table/tbody/tr[1]/td";
var propCostPath = "/td/table/tbody/tr[1]/td[1]/strong";
var propBuyPath = propBuildPath + "[2]//select[@name='amount']";

//
// Parse through the page and gather all the necessary information about the property
//
function getPropertyInfo() {
//GM_log('getPropertyInfo started');
    var properties = {};

  var objlProperties = getXPath(searchPath,document);

  // Loop through the rows to parse out information about the properties
  for( var cnt = 0; cnt<objlProperties.snapshotLength; cnt++ ) {
    var property = new Object();

    var tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + propNamePath;

    var objlTemp = getXPath(tmpSearchPath ,document);

    // If there are snapshots, then this should be properties, not land.
    if ( objlTemp.snapshotLength>0 ) {

      // Get the name of the property
      property['name'] = objlTemp.snapshotItem(0).innerHTML

      // Get the income and number owned for the property
      tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + propIncOwnPath;
      objlTemp = getXPath(tmpSearchPath ,document);

      property['income'] = cashToInt(objlTemp.snapshotItem(0).innerHTML);
      property['owned'] = parseInt(objlTemp.snapshotItem(1).innerHTML.replace(/^.*x| .*$/,''));

      // Change Buy amount to 10
      tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + propBuyPath;
      objlTemp = getXPath(tmpSearchPath ,document);
      if ( objlTemp.snapshotLength>0 ) {
        objlTemp.snapshotItem(0).selectedIndex = objlTemp.snapshotItem(0).options.length-1;
      }

      // Find the cost of the land
      tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + propCostPath;
      objlTemp = getXPath(tmpSearchPath ,document);

      if (objlTemp.snapshotLength>0) {
        property['cost'] = cashToInt(objlTemp.snapshotItem(objlTemp.snapshotLength-1).innerHTML);

        if ( objlTemp.snapshotLength>1 ) {
          property['mafia'] = parseInt(objlTemp.snapshotItem(objlTemp.snapshotLength-2).innerHTML);
        }
      }

      // Get the name of the land upon which this needs to be built
      tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + propBuildPath;
      objlTemp = getXPath(tmpSearchPath ,document);
      if ( /Built on:/.test(objlTemp.snapshotItem(0).innerHTML) ) { 
        property['builton'] = objlTemp.snapshotItem(0).innerHTML.replace(/([\s]+).*Built on: /m,"");
        property['builton'] = property['builton'].replace(/<.*([\s].*)+/m,"");

        var income = property['income'] - properties[property['builton']]['income'];
        var cost = 0;

        if ( properties[property['builton']]['owned']/10 < 1 ) {
          cost = property['cost'] + properties[property['builton']]['cost'];
        } else {
          cost = property['cost'];
        }

        property['recoup'] = Math.round((income/cost*100)*100)/100;
      }

      properties[property['name']]=property;
    } else {

      tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + landNameIncPath;
      objlTemp = getXPath(tmpSearchPath ,document);

      // If there are snapshots then this should be land. Ignore everything else
      if ( objlTemp.snapshotLength>0 ) {
        property['name'] = objlTemp.snapshotItem(0).innerHTML;
        property['income'] = cashToInt(objlTemp.snapshotItem(1).innerHTML);

        tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + landOwnPath;
        objlTemp = getXPath(tmpSearchPath ,document);

        var intTemp = objlTemp.snapshotItem(0).innerHTML.replace(/([\s]+Owned:[\s]+)/,"");
        property['owned'] = parseInt(intTemp.replace(/&nbsp;.*/,""));
        
        tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + landCostPath;
        objlTemp = getXPath(tmpSearchPath ,document);

        property['cost'] = cashToInt(objlTemp.snapshotItem(0).innerHTML);
        property['recoup'] = Math.round((property['income']/property['cost']*100)*100)/100;
        properties[property['name']] = property;

        // Set buy to 10
        tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + landBuyPath;
        objlTemp = getXPath(tmpSearchPath ,document);
        objlTemp.snapshotItem(0).selectedIndex = objlTemp.snapshotItem(0).options.length-1;
      }
    }
  }
//GM_log('getPropertyInfo ended');
  return properties;
}

function processProperties() {
//GM_log('processProperties started');
  var properties = getPropertyInfo();

  objlProperties = getXPath(searchPath,document);

  // Loop through the rows to parse out information about the properties
  for( var cnt = 0; cnt<objlProperties.snapshotLength; cnt++ ) {
    var property = objlProperties.snapshotItem(cnt);

    var recoup = 0;
    var propertyName = '';
    for (var propName in properties) {
      // Calculate the cost of the land and store the property name so we can access it later
      if ( property.innerHTML.indexOf(propName) != -1 && properties[propName]['cost'] ) {
        var propCost = properties[propName]['cost'];

        // If the property must be built on land, get the land
        if ( properties[propName]['builton'] ) {
          var landName = properties[propName]['builton'];
          var landBuiltOn = properties[landName];

          // Factor in the cost of the land if we don't own.
          // Assume we're going to purchase properties in 10 packs
          // since that's the most efficient use of money.
          if ( landBuiltOn['owned']/10 < 1 ) {
            propCost += landBuiltOn['cost'];
          }

          recoup = Math.round(((properties[propName]['income']-landBuiltOn['income'])/propCost*100)*100)/100
        } else {
          recoup = Math.round((properties[propName]['income']/propCost*100)*100)/100
        }
        propertyName = propName;
      }
    }

    if ( recoup != 0 ) {

      if ( properties[propertyName]['builton'] ) {
        var tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + propCostPath + '/..';
        var objlTemp = getXPath(tmpSearchPath ,document);

        if ( !/Recoup: /.test(objlTemp.snapshotItem(0).innerHTML)
             && !/Mafia too small/.test(objlTemp.snapshotItem(0).innerHTML) ) {

          // If your mafia size is smaller than required it can't be bought
          // so put that.
          if ( properties[propertyName]['mafia']
               && properties[propertyName]['mafia'] > User.mafiaSize ) {
            objlTemp.snapshotItem(0).innerHTML += '<br>Mafia too small';
          } else {
            objlTemp.snapshotItem(0).innerHTML += '<br>Recoup: ' + recoup + '% / time';
          }
        } 
      } else {
        var tmpSearchPath = searchPath + '[' + (cnt+1) + ']' + landCostPath + '/..';
        var objlTemp = getXPath(tmpSearchPath ,document);
        if ( !/Recoup: /.test(objlTemp.snapshotItem(0).innerHTML) ) {
          objlTemp.snapshotItem(0).innerHTML += '<br>Recoup: ' + recoup + '% / time';
        }
      }
      recoup = 0;
      propertyName = '';
    }
  }
//GM_log('processProperties ended');
}

/***************************************************************************************/

function processJobs() {
//GM_log('processJobs started');
  var minCash = [];
  var maxCash = [];
  var experience = [];
  var energy = [];

  // Process minimum cash
  var objlRewards = getXPath("//td[@class='job_reward']/span/strong",document);

  for( var cnt = 0; cnt<objlRewards.snapshotLength; cnt++ ) {
    var money = objlRewards.snapshotItem(cnt).innerHTML.split('&nbsp;-&nbsp;');

    minCash[cnt] = cashToInt(money[0]);
    maxCash[cnt] = cashToInt(money[1]);

  }

  // Process the experience
  objlRewards = getXPath("//td[@class='job_reward']/span[@class='bold_number']",document);

  for( var cnt = 0; cnt<objlRewards.snapshotLength; cnt++ ) {
    experience[cnt] = eval(objlRewards.snapshotItem(cnt).innerHTML.replace('+',''));
  }

  // Process the energy
  objlRewards = getXPath("//td[@class='job_energy']/span[@class='bold_number']",document);

  for( var cnt = 0; cnt<objlRewards.snapshotLength; cnt++ ) {
    energy[cnt] = eval(objlRewards.snapshotItem(cnt).innerHTML);
  }

  // Display the results
  objlRewards = getXPath("//td[@class='job_energy']",document);

  for( var cnt = 0; cnt<objlRewards.snapshotLength; cnt++ ) {
    var cashROI = parseInt((minCash[cnt]+maxCash[cnt])/(2*energy[cnt]));
    var html = '';
    if ( cashROI >= 0 ) {
      html = '($' + cashROI + ')<br>';
    }
    var expROI = Math.round((experience[cnt]/energy[cnt])*100)/100;
    var expHTML = '(' + expROI + ')<br>';

    if ( objlRewards.snapshotItem(cnt).innerHTML.match(/[\d]+\)/) ) {
    } else {
      objlRewards.snapshotItem(cnt).innerHTML = html + objlRewards.snapshotItem(cnt).innerHTML + expHTML;
    }
  }
//GM_log('processJobs ended');
}

/*****************************************************************************/

function determinePage(target) {
//GM_log('determinPage started');
  processUser();
  var objlTemp = getXPath("//div[@id='app10979261223_inner_page']//div[@class='title']",target);

  if ( objlTemp.snapshotLength>0 ) {

    // If so, we're on the Properties page!
    if (objlTemp.snapshotItem(0).innerHTML.match(/^[\s]*Properties/)) {
      processProperties();

    } else if (/[.\s]*Join the Mafia Mailing List/.test(objlTemp.snapshotItem(0).innerHTML) ) {
      //GM_log('On the \'Home\' page.');

    } else if (/[\s]*The Bank/.test(objlTemp.snapshotItem(0).innerHTML) ) {
      //GM_log('At the bank');

    // Jobs that have preparation show up here instead of the other 'else' clause
    // So do "Boss Fights" that we don't yet qualify for.
    } else if (/[\s]*Jobs preparation/.test(objlTemp.snapshotItem(0).innerHTML)
             ||  /[\s]*Boss Fight/.test(objlTemp.snapshotItem(0).innerHTML) ) {
      processJobs();
    } else {
      //GM_log('Title: ' + objlTemp.snapshotItem(0).innerHTML);
    }

  } else {
      objlTemp = getXPath("//div[@id='app10979261223_inner_page']/div/table[@class='job_list']/tbody/tr",target);
      if ( objlTemp.snapshotLength>0 ) {
        processJobs();
      } else {
////GM_log("No title");
      }
  }
//GM_log('determinPage ended');
}

function getXPath(expression, target) {
  return document.evaluate( expression, target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null);
}

function cashToInt(string) {
  string = string.replace(/,/g, "");
  return eval(string.replace(/.*\$/g, ""));
}

/*****************************************************************/

var table = getXPath("//table[@class='fb_email_prof_header']", document).snapshotItem(0);
table.innerHTML = "";

var iframe = getXPath("//iframe",document);
for( var cnt = 0; cnt < iframe.snapshotLength; cnt++ ) {
  if ( iframe.snapshotItem(cnt).src.match(/http:\/\/zbar2.zynga.com\/zbar-new\/banner\.php.*/) ) {
    var parent = iframe.snapshotItem(cnt).parentNode;
    parent.removeChild(iframe.snapshotItem(cnt));
  }
}


// 
// Pilfered from http://userscripts.org/scripts/show/45937
// Used to load the rest of the script.
// v v v v v v
function GM_MW_DoEvents(currentTarget)
{
  try
  {
    GM_MW_RemoveListener();
    if (!document.getElementById('pauseButton'))
    {
      determinePage(currentTarget);
    }
    GM_MW_AddListener();
  }
  catch (err)
  {
    //GM_log('Exception caught: ' + err.name + ' - ' + err.message);
  } 
}

function GM_MW_nodeInserted(event) {
    if(event.relatedNode.id && event.relatedNode.id.search("countdown") == -1  && event.relatedNode.id.search("buy_timer") == -1)
    { //HACK:avoid calling checkPropertiesPage if update is due to the countdown in page
      //Havk taken from http://userscripts.org/topics/24747
      GM_MW_RemoveListener();
      determinePage(event.currentTarget);
      GM_MW_AddListener();
    }
}

function GM_MW_AddListener()
{
  if (!eventAdded)
  {
    document.addEventListener("DOMNodeInserted", GM_MW_nodeInserted, false);
    
    eventAdded = true;
  }
}

var eventAdded = false;

function GM_MW_RemoveListener()
{
  if (eventAdded)
  {
    document.removeEventListener("DOMNodeInserted", GM_MW_nodeInserted, false);

    eventAdded = false;
  }
}
// ^ ^ ^ ^ ^
// Pilfered from http://userscripts.org/scripts/show/45937
// 

//
// Pilfered from http://userscripts.org/scripts/show/20145
// v v v v v v v v v
var SUC_script_num = 54752;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
// ^ ^ ^ ^ ^ ^ ^ ^ ^
// Pilfered from http://userscripts.org/scripts/show/20145
//

/*******************************************************************/
var $j;

// Add jQuery
var jQscript = document.createElement('script');
jQscript.src = 'http://code.jquery.com/jquery-latest.js';
jQscript.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jQscript);

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else { $j = unsafeWindow.jQuery.noConflict(); letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
var letsJQuery = function() {
    GM_MW_DoEvents(document.body);
    window.setTimeout(letsJQuery, 1000);
}