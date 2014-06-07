scr_meta=<><![CDATA[
// ==UserScript==
// @name           Neobux Easy Account Transfers
// @namespace      http://userscripts.org/users/kwah

// @description    Allows you to transfer funds from your account balance to your rental balance without leaving the page!

// @include        http://www.neobux.com/*
// @include        https://www.neobux.com/*

////version = major.minor.date.time
// @version        0.2.100101.1552
// @updateNote     0.2.100101.1552 = Added an error message that is displayed in the error console when the script cannot find your current account balance;

// @license        WTFPL v2 - Do What [..] You Want To Public License v2; http://sam.zoy.org/wtfpl/
// @license        "Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed **as long as the name is changed** [emphasis mine]". 

// ==/UserScript==
]]></>.toString();

var logging = false;
if(!logging) { function GM_log() {} }

var xpath_AccBalance = '//span[@id="t_saldo"]';

  var accountBalanceNode = document.evaluate(xpath_AccBalance,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null)
    
if(accountBalanceNode.snapshotLength > 0)
{
  accountBalanceNode = accountBalanceNode.snapshotItem(1);

  accountBalance = parseFloat(accountBalanceNode.textContent.replace('$',''));
  accountBalanceRounded = Math.floor(accountBalance*10)/10;

  GM_log('accountBalanceRounded = '+accountBalanceRounded);

  accountBalanceNode.addEventListener("click", function(){ transfer(); }, false);


  function transfer() {
    var minTransfer = 0.10;

    var errorMessage = 'Error: Transfer Stopped!';
    var errorMessagePresent = false;


    var transferAmount = prompt('How much would you like to transfer? [NOTE: Multiples of $'+minTransfer.toFixed(2)+' only]',accountBalanceRounded.toFixed(2));
    if(transferAmount == null)
    {
      errorMessagePresent = true;
      errorMessage += '\n * Transfer cancelled';
    }
    else
    {
      transferAmount = Math.floor(transferAmount * 10) / 10;
      // transferAmount = 0.1;
    
      if(!isNaN(transferAmount))
      {
        GM_log('(transferAmount != null) && !isNaN(transferAmount)');
        
        if(transferAmount >= minTransfer) 
        {
          GM_xmlhttpRequest({
              method: 'GET',
              url: 'https://www.neobux.com/?u=c&s=rba&s1=1&s2='+transferAmount,
              onload: function(responseDetails) { transferCallback(responseDetails,transferAmount,false); },
              onerror: function(responseDetails) { transferCallback(responseDetails,transferAmount,true); }
            });
          GM_log('Transfer in progress, Please wait..');
          alert('Transfer in progress, Please wait..');
        }
        else
        {
          errorMessagePresent = true;
          errorMessage += '\n * Minimum Transfer: $'+minTransfer.toFixed(2);
        }
      }
      else if(isNaN(transferAmount))
      {
        errorMessagePresent = true;
        errorMessage += '\n * You must enter only a number';
      } 
      else
      {
        errorMessagePresent = true;
        errorMessage += '\n * Unknown Error';
      } 
    }
    
    if(errorMessagePresent)
    {
      GM_log(errorMessage);
      alert(errorMessage);
    }
  }

  function transferCallback(responseDetails,transferAmount,internalError)
  {
    if(internalError) 
    {
      GM_log('transferCallback: Error during transfer - Transfer Stopped');
      alert('transferCallback: Error during transfer - Transfer Stopped');
    } 
    else 
    {
      GM_log('responseDetails.status = ' + responseDetails.status + '\n' + 
      'responseDetails.statusText = ' + responseDetails.statusText + '\n' + 
      'responseDetails.responseHeaders = ' + responseDetails.responseHeaders + '\n' + 
      'responseDetails.responseText = ' + responseDetails.responseText);
      
      var successfulTransferText = '<div align="center" style="font-weight:bold;">The transfer has been successfully completed.</div>';
      var unsuccessfulTransferText = '<div align="center" style="font-weight:bold;">You don\'t have sufficient funds to complete the transfer or an error occurred.</div>';
      var unsuccessfulTransferText_PT = '<div align="center" style="font-weight:bold;">Não tem fundos suficientes para completar a transacção ou ocorreu um erro.</div>';
      
      var transferError = 'Neobux: The transfer was rejected by Neobux!';
      var transferRejected = false;
      
      if(responseDetails.responseText.indexOf(successfulTransferText) > 0) 
      {
        GM_log('Transfer completed successfully');
        alert('Transfer completed successfully');
        //updateBalances(transferAmount);
      } 
      else if(responseDetails.responseText.indexOf(unsuccessfulTransferText) > 0) 
      {
        transferRejected = true;
        transferError += "\n * You don't have sufficient funds to complete the transfer or an error occurred.";
      }
      else if(responseDetails.responseText.indexOf(unsuccessfulTransferText_PT) > 0) 
      {
        transferRejected = true;
        transferError += "\n * Não tem fundos suficientes para completar a transacção ou ocorreu um erro.";
      }
      else
      {
        GM_log('transferCallback: There was an unknown error during transfer.');
        alert('transferCallback: There was an unknown error during transfer.');
      }
      
      if(transferRejected)
      {
        GM_log(transferError);
        alert(transferError);
      }
    }
  }
}
else
{
  GM_log('Error - cannot find your current account balance thus the script cannot run. Please report this immediately.');
}



  GM_registerMenuCommand("Neobux Easy Account Transfers: Edit Update Frequency", editUpdateFrequency);
  
  
//*********************
// ** UPDATER CODE **
//*********************

// Grab the update frequency for use in the updater script
var updateFrequency = GM_getValue("updateFrequency",180);

AnotherAutoUpdater = {
// Config values, change these to match your script
 id: '61968', // Script id on Userscripts.org
// days: 2, // Days to wait between update checks
 days: 1000*60*updateFrequency, // 1000ms * 60secs * mins
 
// Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
      onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname = /\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      GM_log('this.xversion == '+this.xversion);
      this.xversion = parseFloat(this.xversion[1]);
      GM_log('this.xversion == '+this.xversion);
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
      GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    
    if(this.xupdateNote=/\/\/\s*@updateNote\s+(.*)\s*\n/i.exec(xpr.responseText)) {
      this.xupdateNote = this.xupdateNote[1];
      GM_log('this.xupdateNote == '+this.xupdateNote);
      this.updateNotice = this.xupdateNote;
    } else {
      this.updateNotice = '';
    } 
    
    
    
    // otherVerIsNewerVersion(currentVer,otherVer) ?
    var hasBeenUpdated = otherVerIsNewerVersion(this.version,this.xversion);
    GM_log('hasBeenUpdated = '+hasBeenUpdated);
    
    if (hasBeenUpdated) {
      GM_log('Newer version available');
      if (confirm('A new version of the '+this.xname+' user script is available.\n\nCurrent version: '+this.version+'\nAvailable version: '+this.xversion+'\n\nNotes about the Available version:\n'+this.updateNotice+'\n\nDo you wish to update to v'+this.xversion+'?')) {
        GM_log('New version being downloaded.');
        GM_setValue('updated_'+this.id, this.time+'');
        top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
      } else {
        GM_log('New version declined');
        if(confirm('Do you want to turn off auto updating for this script?')) {
          GM_log('AutoUpdates turned off');
          GM_setValue('updated_'+this.id, 'off');
          GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); 
          AnotherAutoUpdater.call(true);});
          alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
        } 
        GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      GM_log('New version NOT available');
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
  
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (this.days))) ) {
        this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
        GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
        GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.check(true);});
  }

};

if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();

var currentVer;
var otherVer;


// CUSTOM FUNCTION -- Compares two version numbers
// Returns true if current version < 'other' version
function otherVerIsNewerVersion(currentVer_input,otherVer_input) {

GM_log('currentVer_input = '+currentVer_input);
GM_log('otherVer_input = '+otherVer_input);


var otherVerIsNewer;

currentVer = currentVer_input.toString().split('.');
if(currentVer[0]) { current_MajVer = currentVer[0]; } else { current_MajVer = 0; } 
if(currentVer[1]) { current_MinVer = currentVer[1]; } else { current_MinVer = 0; }
if(currentVer[2]) { current_BugVer = currentVer[2]; } else { current_BugVer = 0; }

otherVer = otherVer_input.toString().split('.');
if(otherVer[0]) { other_MajVer = otherVer[0]; } else { other_MajVer = 0; } 
if(otherVer[1]) { other_MinVer = otherVer[1]; } else { other_MinVer = 0; }
if(otherVer[2]) { other_BugVer = otherVer[2]; } else { other_BugVer = 0; }

GM_log('current_MajVer,current_MinVer,current_BugVer = '+current_MajVer+','+current_MinVer+','+current_BugVer);
GM_log('other_MajVer,other_MinVer,other_BugVer = '+other_MajVer+','+other_MinVer+','+other_BugVer);

  if(current_MajVer < other_MajVer) {
    otherVerIsNewer = true;
    GM_log('Reason: current_MajVer < other_MajVer');
  } else if(current_MajVer == other_MajVer) {
    if((current_MinVer < other_MinVer)) {
      otherVerIsNewer = true;
      GM_log('Reason: current_MajVer == other_MajVer');
    } else if((current_MinVer == other_MinVer) && (current_BugVer < other_BugVer)) {
      otherVerIsNewer = true;
      GM_log('Reason: (current_MinVer == other_MinVer) && (current_BugVer < other_BugVer)');
    } else {
      otherVerIsNewer = false;
      GM_log('Reason: current_MinVer == other_MinVer');
    }
  } else {
    otherVerIsNewer = false;
    GM_log('Reason: current_MajVer > other_MajVer');
  }
  
  GM_log('otherVerIsNewerVersion(currentVer_input,otherVer_input) = '+otherVerIsNewer);
  return otherVerIsNewer;
  
}


//******************
//**MENU FUNCTIONS**
//******************
// Function called from the Menu to edit how often the script checks for updates
function editUpdateFrequency() {
  var updateFrequency = parseFloat(GM_getValue('updateFrequency',10));
  
  var updateFrequency_Input = prompt('Please enter how often you would like to check for updates (minutes).',updateFrequency);
      GM_log("updateFrequency_Input = "+updateFrequency_Input);
    updateFrequency = parseFloat(updateFrequency_Input);
      GM_log("updateFrequency = "+updateFrequency);

  try {
    if(updateFrequency>=0 && updateFrequency<1440){
      GM_setValue('updateFrequency',String(updateFrequency));
      GM_setValue("AutoDetectTimeOffset",false);
      
      alert("Settings applied sucessfully. Neobux Easy Account Transfers will now check for updates every "+updateFrequency+" minutes.");
    }
  } catch(err) {
    GM_log("Error = "+err);
    GM_log("updateFrequency = "+updateFrequency);
    alert("An error occured! Please retry then report this error. \n\nNOTE: minimum = 0minutes, maximum = 1440 (24hrs), 1.5mins = 90seconds.");
  }
}