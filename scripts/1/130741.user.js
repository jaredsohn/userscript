// ==UserScript==
// @name        INFERNO MWAP RX6
// @namespace   mafiawars
// @description Autoplayer for the facebook application - Mafia Wars
// @include     http://facebook.mafiawars.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/prompt_feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.com/mwfb/*#*
// @version     2.0.13

// ==/UserScript==
// @exclude     http://mwfb.zynga.com/mwfb/remote/html_server.php?*xw_controller=freegifts*
// @exclude     http://facebook.mafiawars.com/mwfb/remote/html_server.php?*xw_controller=freegifts*

// search for new_header   for changes
//
// TestChanges    <- new questionable changes can have the option to disable using this ( check box on bottom of display tab)
// if (TestChanges){ code };
// else { original code };    <- optional
// once code is proven ok, take it out of testing
//

/******************************************************************************/

var SCRIPT = {
  version: '2.0.13',
  name: 'inthemafia',
  appID: 'app10979261223',
  appNo: '10979261223',
  ajaxPage: 'inner2',
  presentationurl: 'http://userscripts.org/scripts/show/77953',
  url: 'http://www.playerscripts.com/rokdownloads/ps_facebook_mafia_wars_a.user.js',
  metadata: 'http://userscripts.org/scripts/source/77953.meta.js',
  controller: '/remote/html_server.php?&xw_controller=',
  action: '&xw_action=',
  city: '&xw_city=',
  opponent: '&opponent_id=',
  user: '&user_id=',
  PSMWAP_homePath: 'http://www.playerscripts.com/',
  PSMWAP_imagePath: 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/setlog/',
  PSMWAP_imageBPath: 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/banners/'

};


/*****************************   Global Variables  ******************************/

// anything starting with gvar is a GLOBAL variable.
var gvar        =       {};

// GM API Check
var GMSTORAGE_PATH = SCRIPT.appID;
// If GM function do not exist, declare them.
GM_ApiBrowserCheck();

// Pointers to Utilities
var g_Utils             = new Utilities();
var g_MWUtils                         = new MWUtilities();
var g_ListenerLib       = new ListenerLib();

// Pointer to MWAP Code
var g_MWAP                              = new PS_MWAP();

/*****************************     Main Code       ******************************/

// FB and MW Detection
// We are only worried about the URL detection because of the excludes

// check if we are the top URL
try {
  // this will cause an error
  if (window.top == self) {
    gvar.bTopFrame = true;
  } else {
    gvar.bTopFrame = false;
  }
} catch (_errObj) {
  gvar.bTopFrame = false;
}

if (self.location.href.indexOf('http://apps.facebook.com/inthemafia/?zy_link=appage')!=-1) {
  gvar.strFrameId = 'FaceBook';
} else if (self.location.href.indexOf('http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=index')!=-1) {
  gvar.strFrameId = 'MafiaWars';
} else {
  gvar.strFrameId = 'Ignore';
}

//handle each type of window
if (gvar.strFrameId != 'Ignore') {
  gvar.bInitialized = false;
  if (gvar.strFrameId == 'FaceBook') {
    GM_log('Initializing FB');  
    Initialize_FB()
  } else {
    GM_log('Initializing MW');  
    Initialize_MW();
  }
  
  gvar.pass                     = 0,
  gvar.change_count   = 0,
  gvar.notify_count   = 0,
  gvar.scheduled      = false;

  // dynamic changes to the display are done using this listner and the MainLoop function.
  document.addEventListener("DOMNodeInserted", function (e) {
          gvar.change_count++;
          if (!gvar.scheduled && gvar.change_count > 2 ) schedNotify();
      },false);

  // cleanup code for the script goes in here.
  window.addEventListener("unload", function (e) {
          try {
          // closing any popups, or killing timers, etc.                
            GM_log('Scripts are unloading.  Frame = '+gvar.strFrameId);
          } catch(_errObj) {
            GM_log('Something bad has happend - '+_errObj.message);
          }
      },false); 
} else {
  GM_log('IGNORE');
}

function MainLoop() {
  if (gvar.bInitialized) {
    switch (gvar.strFrameId) {
      case 'FaceBook':        
        //nada;
        break;
      case 'MafiaWars':        
        // add the MW masthead
        if (!document.getElementById('PSMWAP_masthead')) display_addMasthead();
        break;
    }                   
  }
}

// initilizations routine for facebook
function Initialize_FB() {
  gvar.oMW_Frame        = null;
  gvar.oFB_Frame        = null;
  
  refresh_FB_CSS();
  
  //get the MafiaWar iFrame Handle
  gvar.MWFrame_timer = setInterval(function () {findMWiFrame();}, 100);
  
  //create Log DIV
  //display_addLog();
  
  //create Setting DIV
  display_addSetting();
  
  //add listeners
  if (!gvar.isGreaseMonkey) {
    // chrome stuff here
    chrome.extension.onRequest.addListener(
      function(request, sender, sendResponse) {
        switch (request.type) {
          case 'BLANK':
        }
      }
    );
    //send Hello message to background page
    SendMessage({type:'PSMWAP-FB-Hello'});
  } else {
    //Firefox
    window.addEventListener('message',
      function(event) {
        // not from main page
        if (event.origin != 'http://facebook.mafiawars.com') return;
        
        // extract reques and process
        request = JSON.parse(event.data);
        GM_log('request.type = '+request.type);
        switch (request.type) {
          case 'PSMWAP-MW-Ack':
            clearInterval(gvar.FBFrame_timer);
            break;
        }
      },false);
    //send Hello message to MW iframe.
    //This we will keep sending until we get the iframe address
    gvar.FBFrame_timer = setInterval(function () { SendMessage({type:'PSMWAP-FB-Hello'});;}, 2000);
  }
    
  gvar.bInitialized = true;
}

// initilizations routine for mafia wars
function Initialize_MW() {
  // Initalize any variables, setting, etc in here.

  gvar.oMW_Frame = null;
  gvar.oFB_Frame        = null;
  
  refresh_MW_CSS();
  
  //add listeners
  if (!gvar.isGreaseMonkey) {
    // chrome stuff here
    chrome.extension.onRequest.addListener(
      function(request, sender, sendResponse) {
        switch (request.type) {
          case 'BLANK':
        }
      }
    );
    //send Hello message to background page
    SendMessage({type:'PSMWAP-MW-Hello'});
  } else {
    //Firefox
    window.addEventListener('message',
      function(event) {
        // not from main page
        if (event.origin != 'http://apps.facebook.com') return
        
        // extract reques and process
        request = JSON.parse(event.data);
        GM_log('request.type = '+request.type);
        switch (request.type) {
          case 'PSMWAP-FB-Hello':
            gvar.oFB_Frame = event.source;
            SendMessage({type:'PSMWAP-MW-Ack'});
            break;                                      
        }
      },false);
  }
  
  gvar.bInitialized = true;
}

function findMWiFrame() {
  var oDom;
  
  oDom  = g_Utils.xpath("//iframe");
  GM_log('# of iframes = '+oDom.snapshotLength);
  for (var i=0; i<oDom.snapshotLength; i++) {
    if (oDom.snapshotItem(i).name=='mafiawars') {
      GM_log('found the mafia wars iframe');
      gvar.oMW_Frame = oDom.snapshotItem(i).contentWindow;
      break;
    }
  }
  if (gvar.oMW_Frame) clearInterval(gvar.MWFrame_timer);        
}

function SendMessage(oMessage) {
  if (!gvar.isGreaseMonkey) {
    //send a message to the background page
    chrome.extension.sendRequest(oMessage,function(response){});
  } else {
    if(gvar.oFB_Frame) { GM_log('send message to FB'); gvar.oFB_Frame.postMessage(JSON.stringify(oMessage),'*'); }
    if(gvar.oMW_Frame) { GM_log('send message to MW'); gvar.oMW_Frame.postMessage(JSON.stringify(oMessage),'*'); }
  }
}

function notifyChange() {
    if (gvar.notify_count == gvar.change_count) MainLoop()
    if (gvar.notify_count != gvar.change_count) { schedNotify(); return; }
    gvar.scheduled = false;
};

function schedNotify() {
    gvar.scheduled = true;
    gvar.notify_count = gvar.change_count;
    gvar.iOnloadEvent = setTimeout(function (_obj) { notifyChange(); }, 250);
};

/***************************** Mafia Wars AutoPlayer ****************************/
function PS_MWAP() {
  // everything for MWAP will go in here.
  
  // any variables or constants needed MWAP can be declared here
  var bRunState;
  
  this.Start    = Start;
  this.Stop             = Stop;
  
  function Start() {
    bRunstate = true;   
  }
  
  function Stop () {
    bRunState = false;
  }     
}

/******************************* Display Routines *******************************/

function display_addSetting() {
  var oDom, oDiv;
  var oMenu, oMenuItem;
  var oSettingsBox, oButton;
  var oSettingContainer;
  var oFooter;
  var aButtons;
  
  GM_log('setting up Setting Window');
  oDom = document.getElementById('globalContainer');
  oSettingContainer =   g_Utils.makeElement('div', oDom, {'id':'mwapSettingContainer', 'style':'border-radius: 10px 10px 10px 10px; border: 5px solid rgb(163, 26, 31); z-index: 101; display: block; top: 183px; left: 189px; height: 600px; width: 800px; position: absolute;'});

    oDiv = g_Utils.makeElement('div', oSettingContainer, {'style':'height:32px; font-size: 12px; color: white; background-color: rgb(163, 26, 31); padding: 5px 0pt 3px 5px;'});
      oDom = g_Utils.makeElement('div', oDiv, {'style':'<div style="font-size:14px'});
      oDom.innerHTML = '<b>PS MafiaWars Autoplayer V2.0.0 - Settings</b>';
      oDom = g_Utils.makeElement('div', oDiv, null, null);
      
      aButtons = ['General','Display','Mafia','Operation','AutoStat','Energy','Stamina','Health','Cash','About']
      oMenu =   g_Utils.makeElement('ul', oDom, {'class':'tabNav', 'style':'padding: 0px; margin: 4px 0px 5px 0px; list-style-type: none;'});
      for (var i=0; i<aButtons.length; i++) {  
        oMenuItem =   g_Utils.makeElement('li', oMenu, {'style':'padding-right:10px; display:inline'});
        if (i==0) {
          oButton =   g_Utils.makeElement('a', oMenuItem, {'style':'color:white'}); 
        } else {
          oButton =   g_Utils.makeElement('a', oMenuItem, null); 
        }
        oButton.id = aButtons[i];
        oButton.appendChild(document.createTextNode(aButtons[i]));
        oButton.addEventListener('click',         g_ListenerLib.TabNav(oButton,aButtons[i]),    false);
      }
    
    //content section
    oSettingsBox = g_Utils.makeElement('div', oSettingContainer, {'id':'settingsBox','style':'opacity:.85;background-color: rgb(0, 0, 0); background-repeat: no-repeat; background-image: url("http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/setlog/mwap_int_web_r3_c2.png"); height: 465px; background-position: center center; width: 800px;'});
      // Create General tab.
      oSettingsBox.appendChild(createGeneralTab());
      // Create Display tab.
      oSettingsBox.appendChild(createDisplayTab());
      // Create Mafia tab.
      oSettingsBox.appendChild(createMafiaTab());
      // Create help/publish tab.
      oSettingsBox.appendChild(createHelpMissionsTab());
      // Create Autostat tab.
      oSettingsBox.appendChild(createAutostatTab());
      // Create energy tab.
      oSettingsBox.appendChild(createEnergyTab());
      // Create stamina tab.
      oSettingsBox.appendChild(createStaminaTab());
      // Create health tab.
      oSettingsBox.appendChild(createHealTab());
      // Create cash tab.
      oSettingsBox.appendChild(createCashTab());
      // Create about tab.
      oSettingsBox.appendChild(createAboutTab());
    
    //Footer section
    oFooter = g_Utils.makeElement('div', oSettingContainer, {'style':'background-color: rgb(0, 0, 0); height: 95px; width: 800px; border-radius: 0pt 0pt 6px 6px;'});
    
      // PS MWAP Link
      oDiv = g_Utils.makeElement('Div', oFooter);
      oButton = g_Utils.makeElement('a', oDiv, {'href':'http://www.playerscripts.com','target':'_blank','class':'mwapLink','alt':'playerscripts.com','title':'playerscripts.com'});
      
    
    // tab sections
    function createGeneralTab() {
      var oTab
      
      oTab = g_Utils.makeElement('div', null, {'id':'generalTab', 'class':'tabcontent', 'style':'display: block;'});
      
      return oTab;
    };
    
    function createDisplayTab() {
      var oTab
      
      oTab = g_Utils.makeElement('div', null, {'id':'displayTab', 'class':'tabcontent', 'style':'display: none;'});
      
      return oTab;

    };
    
    function createMafiaTab() {
      var oTab
      
      oTab = g_Utils.makeElement('div', null, {'id':'mafiaTab', 'class':'tabcontent', 'style':'display: none;'});
      
      return oTab;
    };
    
    function createHelpMissionsTab() {
      var oTab
      
      oTab = g_Utils.makeElement('div', null, {'id':'HelpMissionsTab', 'class':'tabcontent', 'style':'display: none;'});
      
      return oTab;
    };
    
    function createAutostatTab() {
      var oTab
      
      oTab = g_Utils.makeElement('div', null, {'id':'autostatTab', 'class':'tabcontent', 'style':'display: none;'});
      
      return oTab;
    };
    
    function createEnergyTab() {
      var oTab
      
      oTab = g_Utils.makeElement('div', null, {'id':'energyTab', 'class':'tabcontent', 'style':'display: none;'});
      
      return oTab;
    };
    
    function createStaminaTab() {
      var Tab
      var Header;
      var eltDom, eltDiv, eltForm, EltButton;
      
      Tab = g_Utils.makeElement('div', null, {'id':'staminaTab', 'class':'tabcontent', 'style':'display: none;'});
      
      Header = makeElement('div', Tab, {'style':'width:762px;height:25px;'});
        eltDiv = makeElement('div', Header, {'style':'width:500px;height:25px;border:none #FFFFFF;float:left;font-size: 18px; font-weight: bold;'});
        eltDiv.appendChild(document.createTextNode('Autostat Settings:'));
        
        eltForm = makeElement('form', Header,{'action':'https://www.paypal.com/cgi-bin/webscr','method':'post','name':'MWAPDonateLink','target':'_blank'});
          EltButton = makeElement('input', eltForm,{'name':'cmd','type':'hidden','value':'_s-xclick'});
          EltButton = makeElement('input', eltForm,{'name':'hosted_button_id','type':'hidden','value':'ST6BSZGFQXCUY'});
          EltButton = makeElement('a', eltForm, {'name':'submit','href':'#','target':'_blank','onclick':'document.MWAPDonateLink.submit();return false;','alt':'PayPal - The safer, easier way to pay online.','title':'PayPal - The safer, easier way to pay online.','style':'width:50px;','class':'settingsLink'});
          EltButton.appendChild(document.createTextNode('Donate'));

      
      return Tab;
    };
    
    function createHealTab() {
      var oTab
      
      oTab = g_Utils.makeElement('div', null, {'id':'healTab', 'class':'tabcontent', 'style':'display: none;'});
      
      return oTab;
    };
    
    function createCashTab() {
      var oTab
      
      oTab = g_Utils.makeElement('div', null, {'id':'cashTab', 'class':'tabcontent', 'style':'display: none;'});
      
      return oTab;
    };
    
    function createAboutTab() {
      var oTab
      
      oTab = g_Utils.makeElement('div', null, {'id':'aboutTab', 'class':'tabcontent', 'style':'display: none;'});
      
      return oTab;
    };
    
}

function display_addLog() {
  
}


function display_addMasthead() {
  var oDiv, oDom;
  var oMastHead, oHelpContainer, oMenu, oMenuItem;
  
  GM_log('Setting up masthead');
  oDiv = document.getElementById('mw_masthead');
  oMastHead =   g_Utils.makeElement('div', null, {'id':'PSMWAP_masthead', 'style':'z-index: 20; display: block; height:32px; margin-top:5px'});
  oDiv.parentNode.insertBefore(oMastHead,oDiv.nextSibling);
  
  //add name and version
  oDom = g_Utils.makeElement('div', oMastHead, {'style':'display: inline; float:left; padding: 5px; width:465px'});
  oDom.appendChild(document.createTextNode('PS MWAP ' + SCRIPT.version)) ;
  
  //like button
  oDom = g_Utils.makeElement('div', oMastHead, {'style':'display: inline; float:left; padding-left: 5px; width:80px'});
  oDom.innerHTML        =       '<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FPS-Mafia-Wars-Autoplayer%2F160393374005267&amp;layout=button_count&amp;show_faces=true&amp;width=80&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px;" allowTransparency="true"></iframe>';
      
  //MWAP Menu
  oMenu =       g_Utils.makeElement('div', oMastHead, {'id':'mwapHelpElt', 'style':'position: absolute; width: 155px; z-index: 20; top: 60px; right: 220px;'});
    
  oMenu.addEventListener('click',         g_ListenerLib.toggleMWAPMenu, false);
  oMenu.addEventListener('mouseover',   g_ListenerLib.openMWAPMenu,             false);
  oMenu.addEventListener('mouseout',    g_ListenerLib.closeMWAPMenu,    false);
  
  //oDiv                        =       g_Utils.makeElement('div', oMenu, {'id':'help_container', 'style':'width: 155px;'});
  oDiv = g_Utils.makeElement('div', oMenu, {'id':'mwapHelpEltContainer'} );
    
  oDom = g_Utils.makeElement('a', oDiv, {'id':'mwapHelpEltLink','class':'sexy_button_new short black_white_border'});
  oDom = g_Utils.makeElement('span', oDom);
  oDom = g_Utils.makeElement('span', oDom, {'id':'mwapHelpEltTitle'});
  oDom.appendChild(document.createTextNode(' PS MWAP Options '));
    
  oDom = g_Utils.makeElement('div', oDiv, {'id':'mwapHelpMenu'});
    
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank'});
  oMenuItem.appendChild(document.createTextNode('Settings'));
  //oMenuItem.addEventListener('click',         g_ListenerLib., false);
  
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank'});
  oMenuItem.appendChild(document.createTextNode('Show Timers'));
  //oMenuItem.addEventListener('click',         g_ListenerLib., false);
  
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank'});
  oMenuItem.appendChild(document.createTextNode('Reset Timers'));
  //oMenuItem.addEventListener('click',         g_ListenerLib., false);
  
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank'});
  oMenuItem.appendChild(document.createTextNode('Check Las Vegas Vault'));
  //oMenuItem.addEventListener('click',         g_ListenerLib., false);
  
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank'});
  oMenuItem.appendChild(document.createTextNode('Grab Toolbar info'));
  //oMenuItem.addEventListener('click',         g_ListenerLib., false);
  
  oMenuItem     =       g_Utils.makeElement('div',oDom, null);
  oMenuItem.innerHTML = '<b>Downloads</b>';
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank','href':'http://www.playerscripts.com/mwap-script/mwap-ff-download.html'});
  oMenuItem.appendChild(document.createTextNode('For Firefox'));
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank','href':'https://chrome.google.com/extensions/detail/cgagpckjofhomehafhognmangbjdiaap'});
  oMenuItem.appendChild(document.createTextNode('For Chrome'));
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank','href':'http://www.playerscripts.com/mwap-script/google-repository.html'});
  oMenuItem.appendChild(document.createTextNode('Revert to Previous'));
  oMenuItem     =       g_Utils.makeElement('div',oDom, null);
  oMenuItem.innerHTML = '<b>Websites</b>';
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank','href':'http://www.playerscripts.com'});
  oMenuItem.appendChild(document.createTextNode('PlayerScripts'));
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank','href':'http://www.playerscripts.com/components/com_ajaxchat/chatapp.php?jid=55&view=chat'});
  oMenuItem.appendChild(document.createTextNode('PlayerScripts Live Support'));
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank','href':'http://playerscripts.com/pswiki'});
  oMenuItem.appendChild(document.createTextNode('PlayerScripts Wiki'));
  oMenuItem     =       g_Utils.makeElement('div',oDom, null);
  oMenuItem.innerHTML = '<b>PS Scripts</b>';
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank','href':'http://playerscripts.com/pswiki/index.php?title=PS_MWAG_About'});
  oMenuItem.appendChild(document.createTextNode('PS MWAG'));
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank','href':'http://playerscripts.com/pswiki/index.php?title=PS_WS_About'});
  oMenuItem.appendChild(document.createTextNode('PS Wall Scrubber'));
  oMenuItem     =       g_Utils.makeElement('a',oDom, {'class':'sexy_destination','target':'_blank','href':'http://www.playerscripts.com/ps-mwe.html'});
  oMenuItem.appendChild(document.createTextNode('PS MWE'));
  
  //run state icon and text
  oDom = g_Utils.makeElement('img', oMastHead, {'id':'MWAP_Icon'});
  oDom.addEventListener('click',        g_ListenerLib.toggleMWAPRun,    false);
  if (gvar.bRunState) {
    oDom.src = 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/32_green.png'
  }     else {
    oDom.src = 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/32_red.png';
  }

  oDom = g_Utils.makeElement('a', oMastHead, {'id':'MWAP_RunPause'});
  oDom.addEventListener('click',        g_ListenerLib.toggleMWAPRun,    false);

  if (gvar.bRunState) {
    oDom.style.color = 'green'
    oDom.textContent = 'Pause';
  } else {
    oDom.style.color = 'red'
    oDom.textContent = 'Resume';
  }
    
  //add Setting Link
  oDom = g_Utils.makeElement('a', oMastHead, {'id':'MWAP_Settings'});
  oDom.addEventListener('click',        g_ListenerLib.toggleSettings,   false);
  oDom.appendChild(document.createTextNode('Settings')) ;
    
  //add Log Link
  oDom = g_Utils.makeElement('a', oMastHead, {'id':'MWAP_LogLink'});
  oDom.appendChild(document.createTextNode('Log')) ;
}

function refresh_FB_CSS() {             
  var cssElt, mwapCSS;
  try {
    var newCSS = ''+
      // *********************** MWAP Masthead ************************         
      '#PSMWAP_masthead                                 {z-index: 14}'+
      // ******************** MWAP Drop Down Menu *********************
      '#mwapHelpEltContainer            {}'+
      '#mwapHelpEltLink         {width: 155px; outline-color: -moz-use-text-color; outline-style: none; outline-width: medium;z-index:50;}'+
      '#mwapHelpEltTitle        {font-size:12px; background: transparent url(http://mwfb.static.zynga.com/mwfb/graphics/dropdown_travel_arrow.gif) no-repeat scroll 135px 50%; text-align: left; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;}'+
      '#mwapHelpMenu                                            {display: none; background-color:black; width: 150px; z-index: 200;border-color: #CDCDCD;border-style: solid; border-width: 0 1px 1px; font-size: 12px; font-weight: bold; margin: 0 2px; -moz-border-bottom-colors: none;-moz-border-image: none;-moz-border-left-colors: none;-moz-border-right-colors: none;-moz-border-top-colors: none;}'+
      '#mwapHelpMenu div                                {width:135px; font-size:12px; color: grey; padding: 2px 5px 2px 10px; background-color:black;font-weight:bold;}'+
      '#mwapHelpMenu a                                  {font-size: 12px; color: white;}'+
      '#mwapHelpMenu a:hover            {font-size: 12px; color: yellow;}'+
      '.mwapLink                {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c2.png\');width:154px;height:70px;}'+
      '.mwapLink:hover          {background-image:url(\'' + SCRIPT.PSMWAP_imagePath+'mwap_int_web_r5_c2_f2.png\');width:154px;height:70px;}'+

      // ******************** MWAP Menu Links *************************
      '#MWAP_Icon               {display: inline; float:left; padding: 0px; width:30px;}'+
      '#MWAP_RunPause           {display: inline; float:left; padding: 5px; width:55px;}'+
      '#MWAP_Settings           {display: inline; float:left; padding: 5px; width:55px;}'+
      '#MWAP_LogLink            {display: inline; float:left; padding: 5px; width:25px;}'+
      // ******************** Menu selection **************************
      '.tabNav                  {padding: 0px; margin: 4px 0px 5px 0px; list-style-type: none;}'+
      '.tabNac li               {padding-right:10px; display:inline}'+
      '.tabNav li a             {text-decoration:none; text-transform:uppercase; font-weight:bold; color: #808080; }'+
      '.tabNav li a:hover       {text-decoration:none; text-transform:uppercase; font-weight:bold; color: #C0C0C0; }'      
            
    //existing CSS
    cssElt = document.getElementById('mwapCSS');
    if (cssElt) {
      mwapCSS = cssElt.innerHTML
    } else {
      mwapCSS = '';
    }

    // If CSS has changed, remove the old one and add a new one.
    if (newCSS != mwapCSS){
      g_Utils.makeElement('style', document.getElementsByTagName('head')[0], {'id':'mwapCSS','type':'text/css'}).appendChild(document.createTextNode(newCSS));
    }
  } catch(ex) {
    GM_log(ex.message);
    //addToLog('warning Icon', 'BUG DETECTED (refreshMWAPCSS): ' + ex);
  }
}

function refresh_MW_CSS() {     
  var cssElt, mwapCSS;
  try {
    var newCSS = ''+
      // *********************** MWAP Masthead ************************         
      '';
            
    //existing CSS
    cssElt = document.getElementById('mwapCSS');
    if (cssElt) {
      mwapCSS = cssElt.innerHTML
    }   else {
      mwapCSS = '';
    }
    
    // If CSS has changed, remove the old one and add a new one.
    if (newCSS != mwapCSS){
      g_Utils.makeElement('style', document.getElementsByTagName('head')[0], {'id':'mwapCSS','type':'text/css'}).appendChild(document.createTextNode(newCSS));
    }
  } catch(ex) {
    GM_log(ex.message);         
    //addToLog('warning Icon', 'BUG DETECTED (refreshMWAPCSS): ' + ex);
  }
}


/******************************** General Utilies *******************************/
/****   General Javascript Utilies      ****/
function Utilities() {
  // making them public
  this.xpath                                      = xpath;
  this.xpathFirst                               =       xpathFirst;
  this.getCurrentTime   =       getCurrentTime;
  this.getZyngaTime     =       getZyngaTime;
  this.getRandRange     =       getRandRange;
  this.getCalendarDate  =       getCalendarDate;
  this.getClockTime                     =       getClockTime;
  this.updateCheck      =       updateCheck;
  this.stripURI                           =     stripURI;
  this.makeElement                      =       makeElement;

  function makeElement(type, appendto, attributes, checked, chkdefault) {
    var element = document.createElement(type);
    if (attributes != null) for (var i in attributes) element.setAttribute(i, attributes[i]);
    if ((checked != null) && (GM_getValue(checked, chkdefault) == 'checked')) element.setAttribute('checked', 'checked');
    if (appendto != null) appendto.appendChild(element);
    return element;
  }
  
    // strip the graphics from encoded image
  function stripURI(img) {
    img = img.split('"')[1];
    return img.replace('" />', '');
  }

  // get a Snapshot based on an XPath
  function xpath(_strPattern,_doc) {
    // default is document if _doc is not provided
    return document.evaluate(_strPattern, _doc||document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  }
  
  function xpathFirst(_strPattern, _doc) {
    return document.evaluate(_strPattern, _doc || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  }

  // gets the current timestamp in minutes
  function getCurrentTime() {
    return Math.round(new Date().getTime() / 1000 / 60);
  }

  // gets the current timestamp in minutes
  function getZyngaTime() {
    var d1,d2,d3,d4;
    d1 = new Date();
    d2 = 8*60-d1.getTimezoneOffset();
    d3 = new Date(d1.getTime()-d2*60*1000);
    d4 = new Date(d3.getFullYear(),d3.getMonth(),d3.getDate()+1,d2/60,0,0,0);
    return Math.round(d4.getTime()/1000/60);
  }

  // gets a random num within a range
  function getRandRange(_iLow, _iHigh) {
    return Math.floor((_iHigh - _iLow) * Math.random()) + _iLow;
  }

  // returns the date is a Month Date format. ex "Jan 18"
  function getCalendarDate() {
    var months = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
    var now         = new Date();
    var monthnumber = now.getMonth();
    var monthname   = months[monthnumber];
    var monthday    = now.getDate();
    var year        = now.getYear();
    if(year < 2000) { year = year + 1900; }
    var dateString = monthname + ' ' +  monthday;
    return dateString;
  }

  // returns the time in a standard AM/PM format. ex "10:51:42 AM"
  function getClockTime() {
    var now    = new Date();
    var hour   = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var ap = "AM";
    if (hour   > 11) { ap = "PM";             }
    if (hour   > 12) { hour = hour - 12;      }
    if (hour   == 0) { hour = 12;             }
    if (hour   < 10) { hour   = "0" + hour;   }
    if (minute < 10) { minute = "0" + minute; }
    if (second < 10) { second = "0" + second; }
    var timeString = hour + ':' + minute + ':' + second + " " + ap;
    return timeString;
  }

  // logging
  function doLog(_strSource, _bDebugOn, _strMessage) {
    if (_bDebugOn) {
      GM_log('Source: ' + _strSource + '\r\nMessage: ' + _strMessage);
    }
  }

  function updateCheck() {
    // put MWAP update code in here
  }
}

/****************************** Mafia Wars Utilies  *****************************/
function MWUtilities() {
  
}

/******************************** Listner Utilies *******************************/
function ListenerLib() {
  this.toggleMWAPMenu             =     toggleMWAPMenu;
  this.openMWAPMenu                 =   openMWAPMenu;
  this.closeMWAPMenu              =     closeMWAPMenu;
  this.openMWAPMenuItem   =     openMWAPMenuItem;
  this.closeMWAPMenuItem  =     closeMWAPMenuItem;
  this.toggleMWAPRun              =     toggleMWAPRun;
  this.toggleSettings             =     toggleSettings;
  this.closeSettings              =     closeSettings;
  this.saveSettings                 =   saveSettings;
  this.TabNav             = TabNav;
  
  function toggleSettings() {
    var oIcon, oLable;
    
    oIcon       =       document.getElementById('MWAP_Icon');
    oIcon.src = 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/32_grey.png'
    
    g_MWAP.Stop();
  }
  
  function closeSettings() {
    var oIcon, oLable;
    
    oIcon       =       document.getElementById('MWAP_Icon');
    if (gvar.bRunState) {
      oIcon.src = 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/32_green.png'
      g_MWAP.Start();
    } else {
      oIcon.src = 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/32_red.png';
    }
  }
  
  function saveSettings() {
    var oIcon, oLable;
    
    oIcon       =       document.getElementById('MWAP_Icon');
    oLable      =       document.getElementById('MWAP_RunPause');

    if (gvar.bRunState) {
      oIcon.src = 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/32_green.png'
      g_MWAP.Start();
    } else {
      oIcon.src = 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/32_red.png';
    }
  }

  
  function toggleMWAPRun () {
    var oIcon, oLable;
    
    oIcon       =       document.getElementById('MWAP_Icon');
    oLable      =       document.getElementById('MWAP_RunPause');
    
    gvar.bRunState = !gvar.bRunState;
    if (gvar.bRunState) {
      oIcon.src = 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/32_green.png'
      oLable.style.color = 'green';
      oLable.textContent = 'Pause';
    } else {
      oIcon.src = 'http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/mwap_graphics/32_red.png';
      oLable.style.color = 'red';
      oLable.textContent = 'Resume';
    }
  }
  
  function toggleMWAPMenu(){
    var oDom;
    oDom        =       document.getElementById('mwapHelpMenu');
    if(oDom) {
      if(oDom.style.display == 'none') {
        oDom.style.display = 'block';
      } else {
        oDom.style.display = 'none';
      }
    }
  }
  
  function openMWAPMenu(){
    var oDom;
    oDom        =       document.getElementById('mwapHelpMenu');
    if(oDom) oDom.style.display = 'block';
  }
  
  function closeMWAPMenu(){
    var oDom;
    oDom        =       document.getElementById('mwapHelpMenu');
    if(oDom) oDom.style.display = 'none';
  }
  
  function openMWAPMenuItem(_elt){
    return function () {
      if(_elt) _elt.style.color = 'yellow';
    }
  }
  function closeMWAPMenuItem(_elt){
    return function () {
      if(_elt) _elt.style.color = 'white';
    }
  }
  
  function TabNav(oMenu, TabID) {
    return function() {
      var oUl, oButton, oSettingsBox;
      
      oUl = oMenu.parentNode.parentNode;
      oSettingBox = document.getElementById('settingsBox');

      for (var i=0; i<oUl.childNodes.length; i++) {
        oButton = oUl.childNodes[i].childNodes[0];
        if (oButton.id == TabID) {
          oButton.setAttribute('style','color:white')
          oSettingBox.childNodes[i].style.display = "block";
        } else {
          oButton.setAttribute('style','')
          oSettingBox.childNodes[i].style.display = "none";
        }
      }
    }
  }
  
}

/***************************** GreaseMonkey API Utils **************************/

// GM Api Checker
function GM_ApiBrowserCheck() {
  gvar.isGreaseMonkey=false;

  // replace unsafeWindow
  if( typeof(unsafeWindow)=='undefined') { unsafeWindow = window; }

  // replace GM_log
  if(typeof(GM_log)=='undefined') {
    GM_log = function(msg) {
      try {
        unsafeWindow.console.log('GM_log: '+msg);
      } catch(_errObj) {
        //nothing in here
      }
    };
  }

  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError;
  }

  // Test for issues with GM API
  if(typeof(GM_setValue)!='undefined') {
    try {
      var gsv=GM_setValue.toString();
      if (gsv.indexOf('staticArgs')>0) {
        gvar.isGreaseMonkey=true;
        GM_log('GreaseMonkey Api detected...');
      } else if(/not\s+supported/.test(gsv)) {
        needApiUpgrade=true;
        isBuggedChrome=true;
        GM_log('Bugged Chrome GM Api detected...');
      }
    } catch(err) {
      // catch FF4
      gvar.isGreaseMonkey=true;
      needApiUpgrade = false
      GM_log('GreaseMonkey Api detected...');
    }
  } else {
    needApiUpgrade=true; GM_log('No GM Api detected...');
  }

  // Define GM_getValue, GM_setValue, GM_deleteValue
  if(!needApiUpgrade) {
    GM_log('Upgrading actual GM storage functions for objects, arrays, etc');
    GM_getValue_old = GM_getValue;
    GM_setValue_old = GM_setValue;

    GM_getValue=function(name,defValue) {
      var strTemp;
      if(typeof(defValue) == 'undefined') {
        strTemp = GM_getValue_old(GMSTORAGE_PATH+'.'+name)
      } else {
        strTemp = GM_getValue_old(GMSTORAGE_PATH+'.'+name,JSON.stringify(defValue));
      }

      if (typeof(strTemp) == 'undefined') {
        return strTemp
      } else {
        return JSON.parse(strTemp);
      }
    }

    GM_setValue=function(name,value) {
      GM_setValue_old(GMSTORAGE_PATH+'.'+name,JSON.stringify(value));
    }

  } else {
    GM_log('Try to recreate needed GM Api...');
    GM_log('Using [' +  GMSTORAGE_PATH  + '] as storage path.');
    var ws=null;
    try {
      ws=typeof(unsafeWindow.localStorage);
      unsafeWindow.localStorage.length;
    } catch(_errObj) {                                                                                                                          // Catch Security error
      ws=null;
    }
    if(ws=='object') {
      GM_log('Using localStorage for GM Api.');

      GM_getValue=function(name, defValue) {
        var strTemp

        strTemp = localStorage.getItem(GMSTORAGE_PATH+'.'+name);

        if (strTemp != null) {
          return JSON.parse(strTemp)
        }       else {
          return defValue
        }
      };

      GM_setValue=function(name,value) {
        if (typeof(value) != 'undefined') {
          localStorage.setItem(GMSTORAGE_PATH+'.'+name, JSON.stringify(value))
        }
      }

      GM_deleteValue=function(name) {
        unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+'.'+name);
      }

      GM_listValues=function() {
        var value = [];
        for(var i=0; i<unsafeWindow.localStorage.length; i++) value[i] = unsafeWindow.localStorage[i];
        return value;
      }

    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      GM_log('Using temporarilyStorage for GM Api.');
      gvar.temporarilyStorage = new Array();

      GM_getValue=function(name,defValue) {
        if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name])=='undefined') {
          return defValue;
        } else {
          return gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name];
        }
      }

      GM_setValue=function(name,value) {
          gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name]=value;
      }

      GM_deleteValue=function(name) {
        delete gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name];
      };

      GM_listValue=function() {
        var value = [];
        var i = 0;
        for(var ID in gvar.temporarilyStorage) {value[i] = ID; i++};
        return value;
      }
    }

    // replace Open in Tab
    if(typeof(GM_openInTab)=='undefined') {
      GM_openInTab=function(url) {
        unsafeWindow.open(url,"");
      }
    }

    // replace GM_registerMenuCommand
    if((typeof(GM_registerMenuCommand)=='undefined')||(isBuggedChrome)) {
      GM_registerMenuCommand=function(name,cmd) {                                                               // Dummy
        GM_log("Notice: GM_registerMenuCommand is not supported.");
      }
    }

    //update XMLHttpRequest
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      GM_log('Using XMLHttpRequest for GM Api.');
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        try {
           request.open(obj.method,obj.url,true);
        } catch(_errObj) {
          if(obj.onerror) {
            obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'});

          }
        return;
        }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.send(obj.data); return request;
      }
    }
  }
}