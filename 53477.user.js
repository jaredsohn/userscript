// ==UserScript==
// @name           Auto-Scouter
// @namespace      mw3
// @description    Automatic scouting for MW3TR version 3
// @include        http://www.crimsonleafgames.com/MW3TR/GamePages/*
// ==/UserScript==

//=====================================================================================
// *NOT* Fixed and tested ?? Jan 2010 to work with MW3TR version 3.00.20
//=====================================================================================
// Overview:

// asToVisit = newline-separated list of systems to Lib and/or planets to Sur
//             systemNumber only                 => Lib e.g.: 123
//             systemNumber with planetLetter(s) => Sur e.g.: 123acd
// asToLib   = newline-separated list of systems visited or probed but not yet SysLibed
//                               and  of planets in SysLibed systems yet to be PlanetLibed
// asVisiting = system to which ship is NAVing - either ssss (for LIB) or ssssppppppp (for SUR)
// asProbing  = system to which probe has been sent and from which it has not yet returned
//              coding: sSSSS where s is probeState and SSSS is system number
//                      | = not yet launched, ship in normal space  > = going to SSSS  < = returning
// asIssued   = last command issued from the asPendingCommandLine
// asLibing   = system number for which LIB lines are arriving

// Run two finite-state machines, one each for ship and probe.
// Ship: disabled->[enable]->idle->[nav]->enroute->[Entering]->[Sur?]:Y->[DoSur]->awaitingSur->[GotSur]->idle
//                                                                    N->idle
// Probe:disabled->[enable]->onBoard->[launch]->goingOut->[Probe Entering]->returning->[Probe has returned]->onboard
//                                            ::NoProbes->disabled

// Does not pick out substantive results (hab, met, owner, pop) -- leave that for logfile post-processing.

// To avoid the Ship and Probe processes stepping on each other, run a single command-issuing loop
// that draws from a common command queue. This can also help handle lost returns from the server:
// the command issuer could check, for example, that the output of a LIB command has come back,
// before issuing another one. (Checking is not implemented currently.)

// Reference: http://dev.opera.com/articles/view/timing-and-synchronization-in-javascript/
//================================================================================================
GM_log('Point Alpha - self.opener: **>' + self.opener + '<**\n' +
       '  self.document.title: *>' + self.document.title + '<*');

if( self.opener != null ) {
  GM_log('  self.opener!=null: self.opener.document.title: *>' + self.opener.document.title + '<*');
}

if(self.document.title != 'MegaWarsIII Ship Command') return;

//================================================================================================
// Get handles to some elements of the Document Object Model (DOM) tree
// that do not change during operation. Some elements -- like _scanner_ -- are constantly
// rewritten, and so cannot be looked up once, and the handles kept for later use.

// These exact identifiers are used in the original CalledBack function.
// The patched version will not be able to find these DOM elements unless the
// same names are defined here, with the same definitions as those in the original program:

oTxt = document.getElementById("TextBox2");
oTerm = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_TermPanel");
oScan = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_ScanPanel");
oStat = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_StatPanel");
oChat = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_ChatPanel");
//================================================================================================
// Insert checkbox to inhibit TermPanel auto-scrolling:

var asInhibitTermAutoScrolling;

function setUpTermAutoScrollingInhibitBox(){
  var mw3Image = document.getElementById('ctl00_Image1');
  var asiParent = mw3Image.parentNode.nextSibling.nextSibling;

  asiParent.appendChild(document.createElement('BR'));
  // asiParent.appendChild(document.createElement('BR'));

  asiParent.appendChild(document.createTextNode('Disable TermPanel auto-scroll'));
  asInhibitTermAutoScrolling = document.createElement('INPUT');
  asInhibitTermAutoScrolling.setAttribute('id',   'asInhibitTermAutoScrolling');
  asInhibitTermAutoScrolling.setAttribute('type', 'checkbox');
  asiParent.appendChild(asInhibitTermAutoScrolling);
}

setUpTermAutoScrollingInhibitBox();

window['asInhibitTermAutoScrolling'] = asInhibitTermAutoScrolling;
//---------------------------------------------------------------------------------------------------
// Insert checkbox to inhibit ChatPanel auto-scrolling:

var asInhibitChatAutoScrolling;

function setUpChatAutoScrollingInhibitBox(){
  var mw3Image = document.getElementById('ctl00_Image1');
  var asiParent = mw3Image.parentNode.nextSibling.nextSibling;

  // asiParent.appendChild(document.createElement('BR'));
  asiParent.appendChild(document.createElement('BR'));

  asiParent.appendChild(document.createTextNode('Disable ChatPanel auto-scroll'));
  asInhibitChatAutoScrolling = document.createElement('INPUT');
  asInhibitChatAutoScrolling.setAttribute('id',   'asInhibitChatAutoScrolling');
  asInhibitChatAutoScrolling.setAttribute('type', 'checkbox');
  asiParent.appendChild(asInhibitChatAutoScrolling);
}

setUpChatAutoScrollingInhibitBox();

window['asInhibitChatAutoScrolling'] = asInhibitChatAutoScrolling;
//================================================================================================
// Squeeze a new autoscouter-control panel into the display, to the left of the original ChatPanel:

// GM_log('oChat.style:'+oChat.getAttribute('style'));

oChat.setAttribute('style', oChat.getAttribute('style').replace(/802px/,'452px') + 'position: relative;');

// GM_log('oChat.style:'+oChat.getAttribute('style'));

// old:   originalGrandParentTR     new:  originalGrandParentTR
//          originalParentTD                newParentTD1
//            oChat                           leftPanel
//            Enter Commands:               newParentTD2
//            pendingCommandLine              oChat
//            :                           newGrandParentTR
//            :                             originalParentTD
//            :                               Enter Commands:
//            :                               pendingCommandLine
//            :                               :

// Reference: David Flanagan, _Javascript: The Definitive Guide_, 4th Edition, O'Reilly
//            -- especially Example 17-6 on page 293

var originalParentTD = oChat.parentNode;
var originalGrandParentTR = originalParentTD.parentNode;
var tbody = originalGrandParentTR.parentNode;

var newParentTD1 = document.createElement('TD');
var newParentTD2 = document.createElement('TD');
var newGrandParentTR = document.createElement('TR');

var leftPanelDiv = document.createElement('DIV');
leftPanelDiv.setAttribute('id', 'LeftPanel');
leftPanelDiv.setAttribute('style', 'width:350px;height:120px;position:relative;overflow-y: scroll;');

originalGrandParentTR.replaceChild(newParentTD2, originalParentTD);
originalGrandParentTR.insertBefore(newParentTD1, newParentTD2);
newGrandParentTR.appendChild(originalParentTD);

newParentTD1.appendChild(leftPanelDiv);
newParentTD2.appendChild(oChat);

tbody.appendChild(newGrandParentTR);
//================================================================================================
// Insert the contents of the autoscouter-control panel:

asHTML = "<table style='font-size:small; font-family:Monospace; text-align:left;'>" +
           "<thead>" +
             "<tr><th><input type='checkbox' id='asVisitEn' onclick='asNavNext()'>" +
                     "V: <input type='text' id='asVisiting' size='7'><br/>" +
                     "<input type='checkbox' id='asProbeEn' onclick='asProbeNext()'>" +
                     "P: <input type='text' id='asProbing'  size='4'>" +
                 "<th>C: <input type='text' id='asIssued' size='7'><br/>" +
                     "<input type='checkbox' id='asLibEn'>" +
                     "L: <input type='text' id='asLibing' size='4'><br/>" +
                 "<th><input type='checkbox' id='asTimeStampLogEntries'>Time Stamp<br/>" +
                   //"<input type='checkbox' id='asSingleStepEn' onclick='asToggleSingleStep()'>" +
                   //"<input type='button' " +
                   //       "onclick='asIssueOnePendingCommand()' value='Single Step'><br/>" +
                     "<input type='button' onclick='asNewLogWindow()' value='Start New Log'><br/>" +
                     "<input type='button' onclick='asDumpAllPanelsToLog()' value='Flush to Log'><br/>" +
           "<tbody valign='top'>" +
             "<tr><td width=110>" +
                    "<textarea id='asToVisit' rows='2100' cols='10' onchange='asToVisitChanged()'>" +
                         "225\n245\n1330\n1889\n1901\n" + // test data - LIB only
                         // "1330ab\n699acd\n" +             // test data - SUR only
                    "</textarea>" +
                 "<td><textarea id='asToLib' rows='2100' cols='10' onchange='asToLibChanged()'></textarea>" +
                 "<td><span id='asState'>State Unk</span><br/>" +
                   //"<input type='checkbox' id='asLogState' onclick='asNavNext()'>Log state<br/>" +
                     "<input type='checkbox' id='asProfile' onclick='asClickProfile()'>Profile<br/>" +
         "</table>";

function asToVisitChanged(){

}
window['asToVisitChanged'] = asToVisitChanged;
function asToLibChanged(){

}
window['asToLibChanged'] = asToLibChanged;

leftPanelDiv.innerHTML = asHTML;

// GM_log(asHTML);
//================================================================================================
// Add an asPendingCommandLine
// Do a little dance to cope with the original macro overlay being present or not.

// oTxt is set earlier to document.getElementById('TextBox2');
var originalPendingCommandLine = document.getElementById('PendingCommandLine');
if( originalPendingCommandLine ){
  originalPendingCommandLine.setAttribute('style',
    originalPendingCommandLine.getAttribute('style').replace(/width:300px/,'width:150px'));
}

asPendingCommandLine = document.createElement('INPUT');
asPendingCommandLine.setAttribute('id',    'asPendingCommandLine');
asPendingCommandLine.setAttribute('type',  'text');
asPendingCommandLine.setAttribute('style', 'font-family:monospace;font-size:small;text-align:left;width:140px;');
oTxt.parentNode.insertBefore(asPendingCommandLine, oTxt.previousSibling.previousSibling);

// TODO: Hack the original macro overlay, to work properly if it is installed *after* this one.
//       ?Maybe not worth doing?

// wait function from http://wiki.greasespot.net/Code_snippets#Waiting_for_something
function wait(c,f){
   if (c()) f()
   else window.setTimeout(function (){wait(c,f)},300,false);
}
//================================================================================================
var asProbing      = document.getElementById('asProbing');
var asToVisit      = document.getElementById('asToVisit');
var asProbeEn      = document.getElementById('asProbeEn');
var asVisitEn      = document.getElementById('asVisitEn');
var asVisiting     = document.getElementById('asVisiting');
var asState        = document.getElementById('asState');
var asToLib        = document.getElementById('asToLib');

var asLogState     = document.getElementById('asLogState');
if(asLogState == null){
  // i.e. the corresponding checkbox was commented out of the HTML
  asLogState = document.createElement('INPUT');
  asLogState.setAttribute('type', 'checkbox');
  asLogState.checked = false;
}

var asSingleStepEn = document.getElementById('asSingleStepEn');
if(asSingleStepEn == null){
  // i.e. commented out of the HTML
  asSingleStepEn = document.createElement('INPUT');
  asSingleStepEn.setAttribute('type', 'checkbox');
  asSingleStepEn.checked = false;
}

var asLibEn        = document.getElementById('asLibEn');
var asLibing       = document.getElementById('asLibing');
var asIssued       = document.getElementById('asIssued');
var asProfile      = document.getElementById('asProfile');

var asTimeStampLogEntries = document.getElementById('asTimeStampLogEntries');

window['asTimeStampLogEntries'] = asTimeStampLogEntries;
//================================================================================================
var amDead = false;

function asIssueOnePendingCommand(){
  if( asProfile.checked ) logLine('=asIssueOnePending from >' + asPendingCommandLine.value + '<');
  if( amDead ) return; // RIP -- TODO: Auto-rebuild? 8-)
  var shin = shipIsIn(); // Need this to recover from dropped "Entering System " messages
  // GM_log('asIssueOnePendingCommand: ship is in ' + shin);
  if( (asProbing.value.charAt(0) == '|') &&  // probing is stalled because must launch from hyper
      (shin.charAt(0) == 'n') &&             // ship is in normal and
      (asToVisit.value == '')                // ship has no reason to enter hyper
       ) {
    // Recover by canceling probing and sending the ship there.
    asToVisit.value = asProbing.value.substr(1) + '\n';
    asProbeEn.checked = false;
    // ?TODO? asVisitEn.checked = true; -- don't know whether we need to do this
    asEnqueueCommand('nav ' + asProbing.value.substr(1));
    asProbing.value = '';
  }
  var asPCLval = asPendingCommandLine.value;
  var oPCLval = '';
  if(originalPendingCommandLine){
     // the original macro-overlay is present
    oPCLval = originalPendingCommandLine.value;
  }
  if( (asPCLval == '') ) {
    // GM_log('asIssueOnePendingCommand: asPCLval is empty');
    // no pending autoscout commands - either recover from a dropped "Entering System " or try for a LIB
    if( asVisitEn.checked ){
      // visiting enabled
      // GM_log('asIssueOnePendingCommand: asPCLval is empty, visiting is enabled');
      if( ('normal ' + asVisiting.value.replace(/[\.a-f]/g,'')) == shin ){
        // ship is in the system it's supposed to visit, but there are no commands pending
        // -- must have dropped an "Entering System " message
        asState.firstChild.nodeValue = 'Recovering';
        asEntering(shin.substr(7));
        GM_log('asIssueOnePendingCommand: recovering from dropped Entering System ' + shin.substr(7));
        asEnqueueCommand('#EnteringLost ' + shin.substr(7));
        window.setTimeout(function(){asIssueOnePendingCommand()}, 6127);
        return;
      }
    }
    // continue with if( (asPCLval == '') ) { ... -- whether visiting is enabled or not
    // GM_log('asIssueOnePendingCommand: past EnteringSystem drop recovery');
    // Recover from lost "Probe has returned" message
    if( asProbeEn.checked && (asProbing.value.charAt(0) == '<') ){
      // GM_log('asIssueOnePendingCommand: recovering from dropped ProbeHasReturned');
      asEnqueueCommand('probe'); // Try to provoke "Your probe is not in space"
    }
    if( asToLib.value == '' ){
      // no autoscout commands pending and nothing to LIB
      if( asProfile.checked ) logLine('=asIssueOnePending: Idling - waiting 6137');
      asState.firstChild.nodeValue = 'Idling';
      if( asLogState.checked )
        GM_log('asIssueOnePendingCommand: [Idling]');
      if( !asSingleStepEn.checked )
        window.setTimeout(function(){asIssueOnePendingCommand()}, 6137);
      return;
    } else if( (oTxt.value == '') && (oPCLval == '') && asLibEn.checked ) {
      // GM_log('asIssueOnePendingCommand: trying to LIB');
      // if user is not typing in a command, no manually-triggered macro is running,
      // and LIBing is enabled -- LIB the next thing
      if( !/^\d/.test(asToLib.value) ){
        oTxt.value = '# ';
        // If not a star or planet entry, copy to log as a title e.g. Sector
      } else {
        oTxt.value = 'lib ';
      }
      oTxt.value += asToLib.value.substr(0,asToLib.value.indexOf('\n'));
      asToLib.value = asToLib.value.substr(asToLib.value.indexOf('\n')+1);
      asIssued.value = oTxt.value;
      if( !asSingleStepEn.checked ){
        if( asProfile.checked ) logLine('=asIssueOnePending clicking Send for >' + oTxt.value + '< & waiting 2147');
        window.setTimeout("document.getElementById('SendCmd').click();", 0);
        window.setTimeout(function(){asIssueOnePendingCommand()}, 2147);
      }
      return;
      // TODO: Is there a race condition here? If the LIB result does not arrive
      //       before the next asIssueOnePendingCommand timeout, will it re-LIB?
    } else {
      // no autoscout commands pending and LIBing disabled - wait for more server output
      // to trigger further activity
      if( asProfile.checked ) logLine('=asIssueOnePending LIBing disabled - waiting 2177 for server output');
      if( !asSingleStepEn.checked ){
        window.setTimeout(function(){asIssueOnePendingCommand()}, 2177);
      }
      return;
    }
    // end of if( (asPCLval == '') ) { ...
  } else if( (oTxt.value == '') && (oPCLval == '') ){
    // there is a pending autoscouting command,
    // user is not already typing in a command and no manually-triggered macro is running
    // GM_log('asIssueOnePendingCommand: asPCLval is not empty and oTxt and oPCL are both empty');
    asState.firstChild.nodeValue = 'Issuing';
    if( asProfile.checked ) logLine('=asIssueOnePending issuing from >' + asPCLval + '<');
    if( asLogState.checked ) // comment out when debugging
      GM_log('asIssueOnePendingCommand: issuing from >' + asPCLval + '<');
    var semi1x = asPCLval.indexOf(';');
    if( semi1x < 0 ) { oTxt.value = asPCLval; // no semicolon
                       asPendingCommandLine.value = '';
    } else           { oTxt.value = asPCLval.substr(0,semi1x); // without the semicolon
                       asPendingCommandLine.value = asPCLval.substr(semi1x+1);
    }
    asIssued.value = oTxt.value;
    // GM_log('asIssueOnePendingCommand: issuing >' + oTxt.value + '<');
    // if the following timeout delay is too long, Something Else may sneak in
    // and clobber the command waiting in oTxt before the click fires!
    if( asProfile.checked ) logLine('=asIssueOnePending clicking Send for >' + oTxt.value + '< & waiting 3157');
    window.setTimeout("document.getElementById('SendCmd').click();", 1);
    if( !asSingleStepEn.checked ){
      // GM_log('asIssueOnePendingCommand: Timeout 3157');
      window.setTimeout(function(){asIssueOnePendingCommand()}, 3157);
      return;
    }
  }
  // wait until manually-issued commands are no longer pending
  asState.firstChild.nodeValue = 'Waiting';
  if( asLogState.checked ) // comment out when debugging
    GM_log('asIssueOnePendingCommand: [Waiting]');
  if( asProfile.checked ) logLine('=asIssueOnePending waiting for manual commands to clear - oTxt: >' + oTxt.value +
                                  '< oPCLval: >' + oPCLval + '< - waiting 14167');
  if( !asSingleStepEn.checked ){
    // the following timeout may be too long
    // GM_log('asIssueOnePendingCommand: Timeout 14167');
    window.setTimeout(function(){asIssueOnePendingCommand()}, 14167);
  }
}
unsafeWindow.asIssueOnePendingCommand = asIssueOnePendingCommand;

// start issuing commands *after* a delay to give leftPanelDIV time to load
// turns out delay really not necessary, but leaving it in anyway.
window.setTimeout(function(){asIssueOnePendingCommand()}, 11035); 
//================================================================================================
function asToggleSingleStep(){
  if( !asSingleStepEn.checked )
    asIssueOnePendingCommand(); // restart issuing commands
}

unsafeWindow.asToggleSingleStep = asToggleSingleStep;
//================================================================================================
function asEnqueueCommand(cmd){
  if( asProfile.checked ) logLine('=asEnqueueCommand ' + cmd);
  // GM_log('asEnqueueCommand: ' + cmd);
  // return;
  var asPCLval = asPendingCommandLine.value;
  if( asPCLval == '' ){
    asPendingCommandLine.value = cmd;
  } else {
    asPendingCommandLine.value += ';' + cmd;
  }
}

window['asEnqueueCommand'] = asEnqueueCommand;
//================================================================================================
function asEnqueueLaunchProbe(){
  if( asProbing.value.charAt(0) == '|' ){
    asEnqueueCommand('probe ' + asProbing.value.substr(1));
    asProbing.value = '>' + asProbing.value.substr(1);
  }
}

function asNavNext(){
  if( asProfile.checked ) logLine('=asNavNext');
  //  GM_log('asNavNext');
  if( asVisitEn.checked ) {
    while( /^[^\d]/.test(asToVisit.value.charAt(0)) ){
      // not a star number -- copy unchanged to ToLib
      var notStar = asToVisit.value.substr(0,asToVisit.value.indexOf('\n')+1);
      asToLib.value += notStar;
      asToVisit.value = asToVisit.value.substr(notStar.length);
    }
    if( asToVisit.value.replace(/\n/,'') != '' ) {
      // GM_log('asNavNext: asToVisit.value >' + asToVisit.value + '<');
      asVisiting.value = asToVisit.value.substr(0,asToVisit.value.indexOf('\n')).replace(/(\n|\.)/g,'');
      asToVisit.value = asToVisit.value.substr(asToVisit.value.indexOf('\n')+1);
      asEnqueueCommand('nav ' + asVisiting.value.replace(/[a-f]/g,''));
      // trim off the planet specifier(s) if any
      asEnqueueLaunchProbe();
    } else {
      // Nothing more to visit
      asVisitEn.checked = false;
      asEnqueueCommand('nav a'); // head for orbit
      // TODO: This assumes normal space. Maybe check whether in hyper?
    }
  }
}

unsafeWindow.asNavNext = asNavNext;

function asProbeNext(){
  //  GM_log('asProbeNext');
  if( asProbeEn.checked ){
    // Need a system number only, with no planet ID(s)
    if( asToVisit.value.match(/[^\n]$/) ) asToVisit += '\n'; // make sure there is a newline at the end
    asToVisit.value = asToVisit.value.replace(/^\n+/,'');    // and none at the beginning
    var firstSys = asToVisit.value.match(/^\d+\n/);          // is first entry system-number only?
    if( firstSys == null ) {
      // no it is not -- is there one after the first entry?
      firstSys = asToVisit.value.match(/\n\d+\n/);
      if( firstSys == null ) {
        // no system-number-only entries at all
        asProbing.value = '';
        asProbeEn.checked = false;
        return;
      } else {
        // there is a system-number-only entry after the first
        asToVisit.value = asToVisit.value.replace(firstSys[0], '\n'); // chop it out of the list
      }
    } else {
      // first entry in asToVisit is system-number-only
      asToVisit.value = asToVisit.value.substr(firstSys[0].length); // chop it out of the list
    }
    asProbing.value = '>' + firstSys[0].replace(/\n/g,''); // trim off newline(s)
    if( asProbing.value == '>' ) {
      GM_log('asProbeNext: firstSys[0]:>' + firstSys[0] + '< yielded empty asProbing.value - aborting');
      asProbing.value = '';
      asProbeEn.checked = false;
    } else {
      asEnqueueCommand('probe ' + asProbing.value.substr(1));   // send the probe
    }
  } else {
    // probing not enabled
    asProbing.value = '';
  }
}

unsafeWindow.asProbeNext = asProbeNext;

function asAddToLibIfNotDup(sysOrPl){
  if( asProfile.checked ) logLine('=asAddToLibIfNotDup ' + sysOrPl);
  if( !(RegExp('^'  + sysOrPl + '\n').test(asToLib.value) || 
        RegExp('\n' + sysOrPl + '\n').test(asToLib.value)
    ) ){
    // i.e. if it is not already on the list
    // need this check to avoid duplicates when Entering System msgs get dropped
    if( /[a-f]$/.test(sysOrPl) ) {
      asToLib.value = sysOrPl + '\n' + asToLib.value; // add planets to the beginning
    } else {
      asToLib.value += sysOrPl + '\n'; // and systems to the end
    }
  }
}

function asEntering(sysNum){
  if( asProfile.checked ) logLine('=asEntering ' + sysNum);
  // GM_log('asEntering: >' + sysNum + '<  asVisiting.value: >' + asVisiting.value + '<');
  // GM_log('asEntering: trimmed asVisiting.value: >' + asVisiting.value.replace(/\.?[a-f]+/,'') + '<');
  if( sysNum == asVisiting.value.replace(/\.?[a-f]+/,'') ){
    // in right system
    // GM_log('asEntering: in right system');
    if( /^\d+$/.test(asVisiting.value) ) {
      // system number only => make sure this system is in ToLib and NAV to next system
      // GM_log('asEntering: system number only');
      asAddToLibIfNotDup(sysNum);
      asNavNext(); // nav to next system
    } else {
      // system number with planet letters => enqueue SUR for each planet then NAV to next system
      // GM_log('asEntering: planet letters too');
      pltLtrs = asVisiting.value.replace(/\d+\.?/g,'');
      // GM_log('asEntering: planet letters **>' + pltLtrs + '<**');
      while( pltLtrs != '' ){
        asEnqueueCommand('sur ' + pltLtrs.charAt(0)+';'); // extra ';' for extra wait
        pltLtrs = pltLtrs.substr(1);
      }
      // GM_log('asEntering: naving to next system');
      asNavNext(); // nav to next system
    }
  } else {
    // in wrong system -- what to do?
    GM_log('asEntering: wrong system - in **>' + sysNum +
           '<** but want **>' + asVisiting.value.replace(/\.?[a-f]+/,'') + '<**');
    asVisitEn.checked = false; // for now, just drop auto
    asEnqueueCommand('nav a');                            // and head for orbit
  }
}

unsafeWindow.asEntering = asEntering;

function asProbeEntering(sysNum){
  asAddToLibIfNotDup(sysNum);
  asProbing.value = '<' + asProbing.value.substr(1);
}

function asChopEntryOutOfToLib(ee){
  var asToLib = document.getElementById('asToLib');
  // GM_log('chopping ' + ee + ' from >' + asToLib.value + '<');
  var reM = RegExp('^'  + ee + '\n');
  if( reM.test(asToLib.value) ){
    // first entry matches
    // GM_log('  from first entry');
    asToLib.value = asToLib.value.replace(reM,'');
  } else {
    reM = RegExp('\n' + ee + '\n');
    if( reM.test(asToLib.value) ){
      // entry after the first matches
      asToLib.value = asToLib.value.replace(reM,'\n');
      // GM_log('  from middle');
    }
  }
  // GM_log('  leaving >' + asToLib.value + '<');
}

function asLibOrSurReceived(sysOrPlanetId){
  if( asProfile.checked ) logLine('=asLibOrSurReceived ' + sysOrPlanetId);
  if( /^\d+$/.test(sysOrPlanetId) ) {
    // system number only => lib lines for individual planets will follow
    asLibing.value = sysOrPlanetId;
    asChopEntryOutOfToLib(sysOrPlanetId);
  } else {
    // not a system LIB - either a planet LIB or a SUR
    asChopEntryOutOfToLib(sysOrPlanetId);
  }
}

function asSysLibPlanetLineReceived(pltChar){
  if( asProfile.checked ) logLine('=asSysLibPlanetLineReceived ' + pltChar);
  asAddToLibIfNotDup(asLibing.value + '.' + pltChar);
}

function shipIsIn(){
  // returns: "Orbiting s.p", "normal s", "hyper near s"
  //   where s = system, p = planet -- doesn't look for alive vs dead
  var asScannerHTML = oScan.innerHTML;
  // GM_log('shipIsIn: asScannerHTML:' + asScannerHTML);
  var asStatusHTML = oStat.innerHTML;
  // GM_log('shipIsIn: asStatusHTML:' + asStatusHTML);
  var snI = asScannerHTML.indexOf("60px;") + 7;
  var snJ = asScannerHTML.substr(snI).indexOf('<');
  var sn = asScannerHTML.substr(snI, snJ);
  // GM_log('shipIsIn: sn = ' + sn);
  if(sn == 0){
    // hyper
    snJ = asScannerHTML.indexOf('|');
    var frag = asScannerHTML.substr(snJ-10, 10); // the fragment containing the nearby star number
    var nbs = frag.substr(frag.indexOf('>')+1);
    // GM_log('shipIsIn: frag: >' + frag + '< nbs: >' + nbs + '<');
    return 'hyper near ' + nbs;
  } else {
    // normal or orbiting
    var mat = asStatusHTML.match(/Orbiting \d+\.[a-f]/);
    if( mat ) return mat[0]; // i.e. Orbiting...
    else      return 'normal ' + sn;
  }
}

function asWarping(){
  if( asProfile.checked ) logLine('=asWarping');
  // GM_log('asWarping:');
  if( asProbeEn.checked ){
    if( asProbing.value.charAt(0) == '|' ){
      // probe-launch was blocked because ship was in normal space
      asEnqueueCommand('probe ' + asProbing.value.substr(1));
      asProbing.value = '>' + asProbing.value.substr(1);
      return;
    }
  }
  asLibNextSysOrPlanet();
}

function asNotVisited(sysNum){
  asChopEntryOutOfToLib(sysNum);
  return;
}

function asNoProbes(){
  if( as.Probing.value != '' ) {
    asToVisit.value = asProbing.value.substr(1) + '\n' + asToVisit.value; // put sys back on list
    asProbing.value = '';
  }
  asProbeEn.checked = false;
}

function asLibNextSysOrPlanet(){
  if( !asLibEn.checked ) return;
  var nextEntry = asToLib.value.substr(0,asToLib.value.indexOf('\n')+1);
  // GM_log('asLibNextSysOrPlanet: nextEntry: *>' + nextEntry + '<*');
  if( !/^\d/.test(nextEntry) ){
    // GM_log('asLibNextSysOrPlanet: non-digit');
    // If not a star or planet entry, copy to log as a title e.g. Sector
    asEnqueueCommand('# ' + nextEntry.substr(0,nextEntry.length-1));
    asToLib.value = asToLib.value.substr(nextEntry.length);
  }
  // GM_log('asLibNextSysOrPlanet: asToLib.value >' + asToLib.value + '<');
  var nextEntryMatch = asToLib.value.match(/\d+(\.[a-f])?/);
  if( nextEntryMatch ){
    asEnqueueCommand('lib ' + nextEntryMatch[0] );
  } else if( asToLib.value != '' ) {
    // GM_log('asLibNextSysOrPlanet: *ERR* asToLib.value >' + asToLib.value +
    //       '< not empty but contains no proper entry - emptying');
    asToLib.value = '';
  }
}

function asBeingDead(){
  // TODO: how to handle? not just re-stack systems being probed/visited:
  //       will lose flight window contents on leaving flight mode to rebuild
  //       maybe dump ToVisit and ToLib to log so user can copy-and-paste after rebuilding?
  //       also need to restack to ToVisit from asProbing and asVisiting
  //       maybe blink *DEAD* in asStatus to remind the user to copy-and-paste?
  amDead = true;
  return;
}

function asProbeNotInSpace(){
  if( asProbing.value.charAt(0) == '>' ){
    asEnqueueCommand('probe ' + asProbing.value.substr(1)); // re-launch
  } else if( asProbing.value.charAt(0) == '<' ){
    asProbeNext(); // as if returned
  }
}

function asProbeNotLaunchedFmNormal(){
  asProbing.value = '|' + asProbing.value.substr(1);
}

function asSawCommandEcho(){
  if( asPendingCommandLine.value == '' ){
    return; // fol line is unnecessary: asIssue... will issue LIBs when possible
    asLibNextSysOrPlanet();
    // but maybe some day it will be useful to have a handle on this event?
  }
}
//=====================================================================================
// Scanner and status caching:

var cachedScanner;
var cachedScannerDumped = false; // one-time-only

function asCacheScanner(scannerFromServer){
  cachedScanner = scannerFromServer;
  if( cachedScannerDumped ) return;
  // GM_log('cached Scanner:' + cachedScanner);
  cachedScannerDumped = true;
}

window['asCacheScanner'] = asCacheScanner;

var cachedStatus;

function asCacheStatus(statusFromServer){
  cachedStatus = statusFromServer;
}

window['asCacheStatus'] = asCacheStatus;
//=====================================================================================
// Logging -- by extraction from TermPanel and ChatPanel

var dumpWin;

function asDumpAllPanelsToLog(){
  dumpWin = window.open('javascript:"MW3 Panel Dump"',
                        "", 'width=800,height=300,scrollbars=yes');
  // GM_log('asDumpAllPanelsToLog: dumpWin.document.body.innerHTML/0: **>' +
  //                               dumpWin.document.body.innerHTML + '<**');
  dumpWin.document.write(
    "<title>MW3 Panel Dump " + Date() + "</title>" +
    '<body>' + Date() +
      '<h1>TermPanel:</h1>' +
       document.getElementById('ctl00_ctl00_GamePanel_MW3TR_GamePanel_TermPanel').innerHTML +
      '<h1>ChatPanel:</h1>' +
       document.getElementById('ctl00_ctl00_GamePanel_MW3TR_GamePanel_ChatPanel').innerHTML +
    '</body></html>');
  dumpWin.document.close();
  // GM_log('asDumpAllPanelsToLog: dumpWin.document.body.innerHTML/1: **>' +
  //                               dumpWin.document.body.innerHTML + '<**');
  
  // asDumpPanelToLog('ctl00_ctl00_GamePanel_MW3TR_GamePanel_TermPanel');
  // asDumpPanelToLog('ctl00_ctl00_GamePanel_MW3TR_GamePanel_ChatPanel');

  document.getElementById('ctl00_ctl00_GamePanel_MW3TR_GamePanel_TermPanel').innerHTML = Date();
  document.getElementById('ctl00_ctl00_GamePanel_MW3TR_GamePanel_ChatPanel').innerHTML = Date();
  
}

unsafeWindow.asDumpAllPanelsToLog = asDumpAllPanelsToLog;
//=====================================================================================
// Logging -- directly to a separate window -- eventually causes bogging-down:

var logWin = null;

// Uncomment the following line to open a log window by default:
// asNewLogWindow();

function asNewLogWindow(){
  if( logWin != null ){
    asFlushLinesToLog();
    // wrap up and close the old window
    logWin.document.write('</body></html>');
    logWin.document.close();
  }
  logWin = window.open('javascript:"MW3 auto-scouter LIB+SUR+Profiling Log"',
                       "", "width=200,height=200,scrollbars=yes");
  logWin.document.write( '<title>MW3 Flight Log ' + Date() + '</title>' +
                         '<body>' );
}

unsafeWindow.asNewLogWindow = asNewLogWindow;

var logLinesCache=''; // log in batches, to postpone bogging-down [kludge]

function logLine(ln){
  if( logWin == null ) return; // i.e. no logging window is open
  var pfx = '<br/>';
  if(asTimeStampLogEntries.checked) pfx += '+' + Date().substr(16,8) + '+';
  logLinesCache += pfx + ln;
}

function asFlushLinesToLog(){
  if( logWin == null ) return; // no logging window is open
  logWin.document.write(logLinesCache);
  //  logWin.document.body.innerHTML += logLinesCache;
  logLinesCache = '';
}

function asClickProfile(){
  if( asProfile.checked && (logWin == null) ){
    // no logging window is open, but user wants to start profiling, so open one:
    asNewLogWindow();
  }
}
//=====================================================================================
// Watch the TermPanel for Interesting Lines:

function asWatchTermPanelLine(tpLine){
  if( asProfile.checked ) logLine('=asWatchTermPanel ' + tpLine);
  if     ( /^Entering System /      .test(tpLine) ) asEntering(tpLine.substr(16));
  else if( /^Probe Entering System /.test(tpLine) ) asProbeEntering(tpLine.substr(22));
  else if( /^Probe has returned/    .test(tpLine) ) asProbeNext();
  else if( /^System /               .test(tpLine) ) { asLibOrSurReceived(tpLine.substr(7));
                                                      logLine(tpLine);
                                                    }
  else if( /^[a-f] /                .test(tpLine) ) { asSysLibPlanetLineReceived(tpLine.charAt(0));
                                                      logLine(tpLine);
                                                    }
  else if( /^Warping /              .test(tpLine) ) asWarping();
  else if( /^You have not visited / .test(tpLine) ) { asNotVisited(tpLine.substr(21));
                                                      logLine(tpLine);
                                                    }
  else if( /^There are no probes /  .test(tpLine) ) asNoProbes();
  else if( /^Being dead that cannot be done/
                                    .test(tpLine) ) { asBeingDead();
                                                      logLine(tpLine);
                                                    }
  else if( /^Probe Destroyed/       .test(tpLine) ) asProbeNotInSpace();
  else if( /^Probes can only be /   .test(tpLine) ) asProbeNotLaunchedFmNormal();
  else if( /^Your probe is not /    .test(tpLine) ) asProbeNotInSpace();
  else if( /^> /                    .test(tpLine) ) asSawCommandEcho();
  else if( /^(Metals|Habitability|Owner:|Colonists|Surface|Dry dock|Taxes|Mercenaries|Fighters =)/
                                    .test(tpLine) ) logLine(tpLine);
  else if( / Hit /                  .test(tpLine) ) logLine(tpLine);
  else if( /^Death Recorded/        .test(tpLine) ) logLine(tpLine);
  else if( /^No Base /              .test(tpLine) ) logLine(tpLine);

  if( asProfile.checked ) logLine('=asWatchTermPanel *exit*');
}

function asWatchTermPanelTxt(tpt){
  // tpt = new text for TermPanel, with '<br />' between lines
  var tptLine = tpt.split('<br />');
  for(var lx in tptLine){
    asWatchTermPanelLine(tptLine[lx]);
  }
  asFlushLinesToLog();
}
window['asWatchTermPanelTxt'] = asWatchTermPanelTxt;
//=====================================================================================
function hailTheCheif(chatTxt){
  var cttt = '<br />'+chatTxt; // Chat Text To Test
  var mat = cttt.match(/<br \/>(1|666|6)([A-C]):Hello Everybody/);
  if(mat){
    if(mat[1] == '1') asEnqueueCommand(mat[2] + '/All hail the cheif');
    else              asEnqueueCommand(mat[2] + '/All bow down before the LightBearer!');
  }
}
window['hailTheCheif'] = hailTheCheif;
//=====================================================================================
// Substitute a new and improved CalledBack function for the original:

function asCalledBack(result, context){

  // make sure there is exactly one timer going at a time
  unsafeWindow.clearTimeout(unsafeWindow.WebChatTimeoutID);

  if( result.length>0 ){

    if (result.search("ENTERDRYDOCK") != -1) {
      window.location = "DryDock.aspx";
      return;
    }

    var panelTxt = result.split("||");
    var newPnode;

    // Reference: David Flanagan, _Javascript: The Definitive Guide_, 4th Ed., O'Reilly,
    //            Example 17-7 on pp. 294-295.

    var ts = '';
    if( asTimeStampLogEntries.checked ) ts = '+' + Date().substr(16,8) + '+<br/>';

    if( panelTxt[1].length > 0 ){
      newPnode = document.createElement("P");
      newPnode.innerHTML = ts + panelTxt[1]; // + '<br/>';
      oTerm.appendChild(newPnode);
      if( !asInhibitTermAutoScrolling.checked ) {
        oTerm.scrollTop = oTerm.scrollHeight;
      }
      asWatchTermPanelTxt(panelTxt[1]); // hook to detect lines of interest for auto-scouting
    }

    if( panelTxt[2].length > 0 ){
      asCacheScanner(panelTxt[2]); // hook to cache scanner
      oScan.innerHTML = panelTxt[2];
      oScan.scrollTop = 0;
    }

    if( panelTxt[3].length > 0 ){
      asCacheStatus(panelTxt[3]); // hook to cache status
      oStat.innerHTML = "<p>" + panelTxt[3] + "</p>";
      oStat.scrollTop = 0;
    }

    if( panelTxt[4].length > 0 ){
      newPnode = document.createElement("P");
      newPnode.innerHTML = ts + panelTxt[4]; // + '<br/>';
      hailTheCheif(panelTxt[4]);
      oChat.appendChild(newPnode);
      if( !asInhibitChatAutoScrolling.checked ) {
        oChat.scrollTop = oChat.scrollHeight;
      }
    }

    // document.getElementById("TextBox2").focus(); // This is the focus-grabber - just don't do it!

  } else {
    window.location = "../default.aspx";
    return;
  }   
  unsafeWindow.bWaitForAjaxResponse = false;
  if(unsafeWindow.sCmdBuffer.length > 0){
    unsafeWindow.WebChatTimeoutID = unsafeWindow.setTimeout("UseCommandBuffer()", 10);
    return;
  }
  unsafeWindow.WebChatTimeoutID=unsafeWindow.setTimeout("DoChatCallBack()", 5000);
}

DoChatCallBack = unsafeWindow.DoChatCallBack; // avoid a naming problem

hacked = asCalledBack.toString()

hacked = hacked.substr(hacked.indexOf('{')); // drop the header, leaving only the body

// GM_log( hacked );

hacked = Function("result", "context", hacked); // Convert to a function with proper arguments

// Uncomment this line to display the hacked CalledBack code:
// GM_log( hacked );

// Inject the hacked CallBack function into the FlightMode window's Tree of DOM:
unsafeWindow.CalledBack = hacked;

// GM_log( unsafeWindow.CalledBack );

GM_log('Normal end of script');