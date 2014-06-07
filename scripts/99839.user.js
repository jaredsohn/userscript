// ==UserScript==
// @name best mw cutie case
// @author fighter boss
// ==/UserScript==
/***************************************
OGP Mafia Wars Tool Suite v2
Copyright 2010-2011 OneGuy Productions
Distribution for profit or financial gain is not permitted.
****************************************/

/***************************************
 Global Contstants and Variables
****************************************/
var res = new Array(); //Job results array

/***************************************
 Configuration Contstants and Variables
****************************************/
function ogpConfigDef() {

  // Global Constants/Variables
  this.currentCity = '';
  this.originalCity = '';
  this.Session = 1;
  
  this.curEnergy;
  this.curStamina;
  this.curExp;
  this.curExpNeeded;
  this.curRatio;
  this.curHealth;
  this.curSkillPoints;
  this.curLevel;
  this.curRP;
  
  this.curFightList = new Array();
  
  // Track when we're processing something
  this.functionRunning = false;
  
  this.lastStatUpdate = null;
  this.updateStatInterval = 30000;
  this.lastSessionUpdate = null;
  this.updateSessionInterval = 60000;

  this.Version = '2.15.6';
  this.MWURL = '';
  this.MWURLAJAX = '';
  this.MWURLJSON = '';
  this.tmpkey = '';
  this.fighttmpkey = '';
  this.appHung = false;
  this.local_xw_sig = '';
  this.local_player_id = '';
  this.cbvalue = '';

  // Text colors
  this.clrWarning = '#ff0000';
  this.clrAction = '#ffff00';    
  this.clrGood = '#00ff00';
  this.clrFatal = '#ff0000';
  this.clrInfo = '#ffffff';
  this.clrUserError = '#00ffff';
  this.clrHighlight = '#ffffff';

  // The following strings are what is used to perform the specific function calls
  // Parameters specific to the action being performed are added in the individual routines
  this.FBAPPURL = 'http://apps.facebook.com/inthemafia/';
  this.MWROOTPATH = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php';

  this.urlTravel = '&xw_controller=travel&xw_action=travel&from=index';
  this.urlUpdateStats = '&xw_controller=index&xw_action=view';
  this.urlUpdateSession = '&xw_controller=index&xw_action=view';
  this.urlUpdateCurrentCity = '&xw_controller=index&xw_action=view&xw_city=1';
  this.urlDeposit = '&xw_controller=bank&xw_action=deposit';
  this.urlVegasDeposit = '&xw_controller=propertyV2&xw_action=doaction&doaction=ActionBankDeposit&building_type=6';
  this.urlLootList = '&xw_controller=loot&xw_action=view';
  this.urlProfile = '&xw_controller=stats&xw_action=view';
  this.urlSendItem = '&xw_controller=stats&xw_action=gift_send';
  this.urlSendItemNew = '&xw_controller=gift&xw_action=send';
  this.urlLottoPage = '&xw_controller=lotto&xw_action=view';
  this.urlMafiaPage = '&xw_controller=group&xw_action=view';
  this.urlSafeHousePage = '&xw_controller=safehouse&xw_action=view';
  this.urlMysteryGiftsPage = '&xw_controller=freegifts&xw_action=view';
  this.urlLootListPage = '&xw_controller=loot&xw_action=view';
  this.urlCollectionPage = '&xw_controller=collection&xw_action=view';
  this.urlSpendSkillPoints = '&xw_controller=stats&xw_action=upgrade&xw_city=1';
  this.urlSwitchJobTab = '&xw_action=view';
  this.urlRunJob = '&xw_action=dojob';
  this.urlAttack = '&xw_controller=fight&xw_action=attack';
  this.urlPunch = '&xw_controller=fight&xw_action=punch';
  this.urlHeal = '&xw_controller=hospital&xw_action=heal';
  this.urlPromotePage = '&xw_controller=group&xw_action=view&promote=yes';
  this.urlPromote ='&xw_controller=group&xw_action=promote&slot=';
  this.urlMafiaList = '&xw_controller=recruit&xw_action=view';
  this.urlAddToMafiaP1 = 'track.php?next_controller=war&next_action=add&next_params={%22friend_id%22:%22'; 
  this.urlAddToMafiaP2 = '%22}';
  this.urlLoadRobbing = '&xw_controller=robbing&xw_action=view';
  this.urlRunRobbing = '&xw_controller=robbing&xw_action=rob&xw_client_id=8';
  this.urlRobRefresh = '&xw_controller=robbing&xw_action=refresh';
  this.urlBuildShop = '&xw_controller=propertyV2&xw_action=craft';
  this.urlAchievements = '&xw_controller=achievement&xw_action=view';
  this.urlFactionStore = '&xw_controller=item&xw_action=faction_store';
  this.urlFightList = '&xw_controller=fight&xw_action=view';
  this.urlVegasJob = '&xw_controller=map&xw_action=dojob&click_origin=sidepanel_button';
  this.urlAllPropertiesCollect = '&xw_action=collectall&xw_client_id=8';
  this.urlVegasCollect = '&xw_action=collectall&xw_client_id=8';
  this.urlItalyCollect = '&xw_action=collectall&xw_client_id=8';
  this.urlRecruit = '&xw_action=recruit&xw_controller=recruit&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=0&full_width=0';
  this.urlUnlockShop = '&xw_controller=PropertyV2&xw_action=speedup&xw_city=1&city=1';
  this.urlFBProfileLink = 'http://www.facebook.com/profile.php?id=';
  this.urlMWProfileLink = 'http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=1&user=';
  this.urlAddToWishlist = '&xw_controller=wishlist&xw_action=add&isajax=1';
  this.urlChristmas = '&xw_controller=PropertyV2Tree&xw_action=view';
  this.urlRobPersonal = '&xw_controller=robbingtarget&xw_action=view';
  this.urlRobProperty = '&xw_controller=robbing&xw_action=rob_user';
  this.urlMarketFight = '&xw_controller=marketplace&xw_action=marketplace_category&category=8&subtype=-1&favor_type=-1&favor_id=-1';
  this.urlBuyFightClub = '&xw_controller=marketplace&xw_action=buy&category=8&subtype=-1';
  this.urlBuyPort = '&xw_controller=propertyV2&xw_action=portBuyItem&xw_city=6&xw_client_id=8&building_type=7';
};


/***************************************
 MAIN Entry point for tool suite
****************************************/
function ogpMainDef() {
  
  this.initialize = function()
  {
    
    //document.title = 'OGP MW Suite - Play Mafia Wars the right way';
    OGPConfig.local_xw_sig = local_xw_sig;
    OGPConfig.local_player_id = OGPParser.getNewPlayerId(document.body.innerHTML);
    this.initdiv();
    this.setMWURL();
    
    OGPDisplay.buildLayout();
    OGPDisplay.setHTML('divOGPCSS',OGPDisplay.buildCSS());
    OGPDisplay.setHTML('divOGPMenu',OGPDisplay.buildMenu());

    OGPItems.init();    
    OGPConfig.tmpkey = OGPParser.setTempKey('');
    OGPDisplay.updateCurrentCity();
    OGPTimers.startAllTimers();
    OGPItems.loadJobInfoFromCookies();
    setTimeout('OGPDisplay.updateTitle(0,0)',100);
    OGPDisplay.addLine('Ready',OGPConfig.clrGood);
    
  };
  
  this.initdiv = function(){
    try {
      if (FB) {
      FB.CanvasClient.stopTimerToSizeToContent; 
      window.clearInterval (FB.CanvasClient._timer);
      FB.CanvasClient._timer=-1; 
      }
    }catch(err){}
    /*
    try {
      if (e$('FB_HiddenContainer')) {
        e$('FB_HiddenContainer').innerHTML = '';
      }
    }catch(err){alert('here');}
    */
    document.body.style.overflowX='visible';
    document.body.style.overflowY='visible'; 
    document.body.parentNode.style.overflow ='scroll';
    // Hide the Zynga input
    document.getElementById('TopField').style.display='none';
    // Move the node to the top
    // Create a new node in the mainDiv
    var node = document.createElement('div');
    node.setAttribute('id','ogpdiv');
    document.body.insertBefore(node,document.body.firstChild);
    OGPWindowUtils.MoveNode("ogpdiv","ogpmwsuite",0,document.getElementById('mainDiv').parent);
    document.getElementById('ogpmwsuite').setAttribute("style","border:0;");
    // Center the main window
    //e$('final_wrapper').style.height="1200px";
    //e$('final_wrapper').style.overflowX='visible';
    //e$('final_wrapper').style.overflowY='visible';
    if (e$('mainDiv'))
    {
      e$('mainDiv').style.width='760px;';
      e$('mainDiv').style.position = 'absolute';
      e$('mainDiv').style.left = '50%';
      e$('mainDiv').style.marginLeft= '-380px';
    }
    if (e$('button_counter')) {
      e$('button_counter').style.left = 0;
    }
    // Hide the new flash div
    if (e$('zstream_div')) {
      e$('zstream_div').style.left='-4000px';
    }
    // Hide the game bar
    if (e$('snapi_zbar')) {
      var p = e$('snapi_zbar').parentNode;
      p.innerHTML = '';
      p.style.visibility='hidden';
      p.style.display='none';
    }
  };

  
  this.setMWURL = function() {
  	str = document.location;
	str = str.toString();
	beg = str.substring(0,str.indexOf('?')+1);
	str = str.substring(str.indexOf('?')+1);
	str = str.split('&');
	mid = '';
	for(var i=0;i<str.length;i++){
		//if(str[i].indexOf('sf_xw_')==0){ mid=mid+'&' + str[i]; }
		//if(str[i].indexOf('cb=')==0){ mid=mid+'&' + str[i]; }
	}
	OGPConfig.MWURL = beg+mid;
	if (OGPConfig.MWURL.indexOf('sf_xw_')<0) { 
	  //OGPConfig.MWURL += '&sf_xw_sig=' + OGPConfig.local_xw_sig;
	  //OGPConfig.MWURL += '&sf_xw_user_id=' + OGPConfig.local_player_id;
	}
	OGPConfig.MWURL = OGPConfig.MWURL.replace('?&','?');
	OGPConfig.MWURLAJAX = OGPConfig.MWURL;// + '&liteload=1&ajax=1';
	OGPConfig.MWURLJSON = OGPConfig.MWURL + '&ajax=1&requesttype=json';
    //OGPConfig.MWURLJSON = OGPConfig.MWURL.replace('html_','json_') + '&requesttype=json&ajax=1&skip_req_frame=1';
  };
  
};

/***************************************
 TIMER Functions 
****************************************/
function ogpTimersDef() {
  this.updateTimer = null;
  this.cleanupTimer = null;
  this.sessionTimer = null;
  this.cityTimer = null;
  this.fontTimer = null;

  this.startAllTimers = function() {
    OGPDisplay.addLine('Starting timers',OGPConfig.clrInfo);
    OGPTimers.updateStats(0,0);
    OGPTimers.updateSession(0,0);
    OGPTimers.cityTimer = setInterval("OGPDisplay.updateCurrentCity()",500);
    OGPTimers.fontTImer = setInterval("OGPDisplay.fixScreenFonts()",500);
    OGPTimers.setCleanupInterval();
  };

  this.stopRunningProcesses = function() {
    // Stop any current processes that are running.  Used if someone clicks a menu item while something's running
    if (OGPJob.jobruntimer) clearTimeout(OGPJob.jobruntimer);
    if (OGPDrone.jobwaittimer) clearTimeout(OGPDrone.jobwaittimer);
    if (OGPFight.arTimer) clearTimeout(OGPFight.arTimer);
    OGPDrone.isRunning = false;
    OGPDrone.isPaused = true;
    OGPJob.isRunning = false;
    OGPFight.arIsRunning = false;
  };

  this.setUpdateTimer = function() {
    this.updateTimer = setTimeout("OGPTimers.updateStats(0,0)",30000);
  };
  
  this.updateStats = function(step,index) {
    switch(step)
    {
      case 0:
        // Only update it we're not doing anything else
        if (OGPConfig.functionRunning == false) {
          OGPDisplay.addLine('Updating Player Statistics',OGPConfig.clrInfo);
          //e$('divOGPDebug').innerHTML += '<br>' + OGPConfig.MWURLAJAX + OGPConfig.urlUpdateStats + '&xw_city=' + OGPConfig.currentCity + '&tmp=' + OGPConfig.tmpkey,'OGPTimers.updateStats','1,%ix%';
          OGPAjax.buildAjax(OGPConfig.MWURLAJAX + OGPConfig.urlUpdateStats + '&xw_city=' + OGPConfig.currentCity + '&tmp=' + OGPConfig.tmpkey + '&cb=' + OGPParser.getCBValue('home'),'OGPTimers.updateStats','1,%ix%');
        } else {
          OGPTimers.setUpdateTimer();
        }
        break;

      case 1:
        var r = OGPAjax.ajax[index].response;
        //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>';
        OGPParser.getStatsFromPage(r);
        if (isNaN(parseInt(OGPConfig.curLevel))) {
          OGPDisplay.showPage(index,'inner_page');
          OGPParser.setTempKey('');
          this.updateStats(0,0);
          return;
        }
        
        OGPDisplay.setHTML('divOGPSkill',OGPConfig.curSkillPoints);
        OGPDisplay.setHTML('divOGPHealth',OGPConfig.curHealth);
        OGPDisplay.setHTML('divOGPStamina',OGPConfig.curStamina);
        OGPDisplay.setHTML('divOGPEnergy',OGPConfig.curEnergy);
        OGPDisplay.setHTML('divOGPExp',OGPConfig.curExpNeeded-OGPConfig.curExp);
        if (isNaN(OGPConfig.curRatio))
          OGPDisplay.setHTML('divOGPRatio','--');
        else
          OGPDisplay.setHTML('divOGPRatio',OGPConfig.curRatio);
        OGPDisplay.setHTML('divOGPLevel',OGPConfig.curLevel);
        OGPConfig.currentCity = OGPTravel.getCurrentCity();
        // See if there are more than one timers running
        if (OGPConfig.lastStatUpdate) {
          if (new Date() - OGPConfig.lastStatUpdate > OGPConfig.updateStatInterval) {
            OGPTimers.setUpdateTimer();
            OGPConfig.lastStatUpdate = new Date();
          }
        } else {
          OGPTimers.setUpdateTimer();
          OGPConfig.lastStatUpdate = new Date();
        }
        break;
    }
  };

  // Set the display cleanup timer
  this.setCleanupInterval = function() {
    this.cleanupTimer = setInterval("OGPTimers.cleanupDisplay();",1000);
  };

  this.cleanupDisplay = function() {
    // Make sure the srollbars are always there
    //document.body.style.overflowX='auto';document.body.style.overflowY='auto';document.body.parentNode.style.overflow ='scroll';
    // Move the flash block out of the way
    if (e$('zstream_div')) {
      if (parseInt(e$('zstream_div').style.left) < 0) {
        e$('zstream_div').style.left = '-4000px';
      }
    }
  };
  
  this.stopAll = function() {
    // Stop all of the timers
    if (this.updateTimer) clearTimeout(this.updateTimer);
    if (this.cleanupTimer) clearInterval(this.cleanupTimer);
    if (this.cityTimer) clearInterval(this.cityTimer);
    if (this.fontTimer) clearInterval(this.fontTimer);
    // Stop all of the processes
    OGPTimers.stopRunningProcesses();
  };

  this.setSessionTimer = function() {
    // Check the session every couple of minutes
    this.updateTimer = setTimeout("OGPTimers.updateSession(0,0)",OGPConfig.updateSessionInterval);
  };

  this.updateSession = function(step,index) {
    switch(step)
    {
      case 0:
        // Only update it we're not running something
        if (OGPConfig.functionRunning == false) {
          OGPConfig.tmpkey = OGPParser.setTempKey('');
          OGPDisplay.addLine('Updating Session State',OGPConfig.clrInfo);
          OGPAjax.buildAjax(OGPConfig.MWURLAJAX + OGPConfig.urlUpdateSession + '&xw_city=' + OGPConfig.currentCity + '&tmp=' + OGPConfig.tmpkey + '&cb=' + OGPParser.getCBValue('home'),'OGPTimers.updateSession','1,%ix%');
        } else {
          OGPTimers.setSessionTimer();
        }
        break;

      case 1:
        if (OGPAjax.ajax[index]) {
          var r = OGPAjax.ajax[index].response;
          if (r.substr(0,7)=='<script') {
            // Session timed out, see if there's any way to recover
            OGPDisplay.setHTML('divOGPSession','<font style="color:' + OGPConfig.clrFatal + ';">Timeout</font>');
            OGPDisplay.addLine('Session timed out',OGPConfig.clrFatal);
            OGPConfig.Session = 0;
            OGPTimers.stopAll();
          } else {
            OGPDisplay.setHTML('divOGPSession','<font style="color:' + OGPConfig.clrGood + ';">Active</font>');
            OGPConfig.Session = 1;
            // Update the cb value
            var s = r.indexOf('local_xw_sig = ')+16;
            var tstr = '';
            while (r.substr(s,1) != "'") tstr+=r.substr(s++,1);
            if (OGPConfig.MWURL.indexOf('cb=') > 0)
              OGPConfig.MWURL = OGPConfig.MWURL.replace(OGPConfig.local_xw_sig,tstr);
            else
              OGPConfig.MWURL = OGPConfig.MWURL + '&local_xw_sig=' + tstr;
            OGPConfig.local_xw_sig = tstr;
            // Add the cb value
            s = r.indexOf('cb=')+3;
            tstr = '';
            while (r.substr(s,1) != '"' && r.substr(s,1) != '&' && r.substr(s,1) !="'") tstr+=r.substr(s++,1);
            if (OGPConfig.MWURL.indexOf('cb=') > 0)
              OGPConfig.MWURL = OGPConfig.MWURL.replace(OGPConfig.cbvalue,tstr);
            else
              OGPConfig.MWURL = OGPConfig.MWURL + '&cb=' + tstr;
            OGPConfig.cbvalue = tstr;
            OGPConfig.MWURLAJAX = OGPConfig.MWURL;// + '&ajax=1&skip_req_frame=1';
            OGPConfig.MWURLJSON = OGPConfig.MWURL + '&ajax=1&skip_req_frame=1&requesttype=json';
            // See if there are more than one timers running
            if (OGPConfig.lastSessionUpdate) {
              if (new Date() - OGPConfig.lastSessionUpdate > OGPConfig.updateSessionInterval) {
                OGPTimers.setSessionTimer();
                OGPConfig.lastSessionUpdate = new Date();
              }
            } else {
              OGPTimers.setSessionTimer();
              OGPConfig.lastSessionUpdate = new Date();
            }
          }
        }
        break;
    }
  };
  
};

/***************************************
  STRING Functions 
****************************************/
function ogpStringDef() {

  this.getStatValue = function(strResults,strStat) {
    if (!strResults) return '';
    if (strResults.indexOf('var user_fields = [];') < 0) return '';
    var s = strResults.indexOf('user_fields[\'' + strStat + '\'] = "');
    if (s < 0) return '-';
    while (strResults.substr(s++,1) != '"');
    var e = s;
    while (strResults.substr(e,1) != '"') e++;
    return strResults.substr(s,e-s);
  };
  
  this.getNewStatValue = function(strResults,strStat) {
    // Stats for new version of return values from job runner
    if (!strResults) return '';
    if (strResults.indexOf('{"user_fields":') > 0) {
      var s = strResults.indexOf('"' + strStat + '":');
      if (s < 0) return '';
      while (strResults.substr(s++,1) != ':');
      if (strResults.substr(s,1)=='"') s++;
      var e = s;
      while (strResults.substr(e,1) != '"' && e < strResults.length) e++;
      return strResults.substr(s,e-s).replace(/[^0-9]/g,'');
    }
    if (strResults.indexOf('var user_fields = [];') > 0) {
      var s = strResults.indexOf('var user_fields = [];');
      s = strResults.indexOf(strStat);
      while (strResults.substr(s,1) != '"') s++;
      s++;
      var e = s;
      while (strResults.substr(e,1) != '"') e++;
      return strResults.substr(s,e-s).replace(/[^0-9]/g,'');
    }
    return '';
  };

  this.percentage = function(val,places) {
    var ret = (parseInt(val*Math.pow(10,places+2))/Math.pow(10,places));
    if (isNaN(ret)) 
      return 0;
    else  
      return ret;
  }
};

/***************************************
 DISPLAY Functions 
****************************************/
function ogpDisplayDef() {

  this.menu = '';
  this.layout = '';
  this.css = '';

  this.bgcolor = '#000000';
  this.txtcolor = '#ffffff';
  this.goodcolor = '#00ff00';
  this.badcolor = '#ff0000';
  this.infocolor = '#ffff00';
  this.linkcolor = '#ffff00';
  this.bordercolor = '#ffffff';
  this.headercolor = '#ffff00';
  this.headerbgcolor = '#003300';
  this.headerbordercolor = '#66ff66';
  this.headerlinkcolor = '#ffff00';
  this.statscolor = '#ffffff';
  this.buttonbgcolor = '#006600';
  this.buttonfgcolor = '#ffffff';
  this.buttonbordercolor = '#00ff00';
  this.jobpaycitybgcolor = '#339933';
  this.jobpaycityfgcolor = '#000000';
  this.jobpaycitybordercolor = '#ffffff';
  this.jobpaycitytextcolor = '#ffffff';
  this.basefont = 'Arial,Tahoma';
  
  this.statusLines = 6;

  this.buildCSS = function() {
    var txt = '';
    txt +='<style type="text/css">';
    txt +='#divOGPHeader {minimum-width:760px;text-align:center;width:100%;position:fixed;top:0;left:0;height:32px;background-color:' + this.headerbgcolor + ';z-index:1000;}';
    txt +='#divOGPHeader TABLE {padding:1px;margin:0px;width:100%;height:32px;border:1px solid ' + this.headerbordercolor + ';}';
    txt +='#divOGPHeader TABLE TR {}';
    txt +='#divOGPHeader TABLE TR TH {vertical-align:middle;font-size:14px;color:' + this.headercolor + ';}';
    txt +='#divOGPHeader TABLE TR TH A {text-decoration:none;color:' + this.headerlinkcolor + ';}';
    txt +='#divOGPHeader TABLE TR TH A:hover {text-decoration:underline;}';
    txt +='#divOGPHeader TABLE TR TD {text-align:center;white-space:-webkit-nowrap;vertical-align:baseline;font-size:10px;color:' + this.headercolor + ';}';
    txt +='#divOGPHeader TABLE TR TD DIV {color:' + this.statscolor + ';}';
    txt +='#divOGPHeaderTitle {font-size:14px;}';
    txt +='#divOGPMain {font-family:' + this.basefont + ';color:' + this.txtcolor + ';background-color:' + this.bgcolor + ';}';
    txt +='#divOGPMenu TABLE {width:100%;margin-left:auto;margin-right:auto;border-collapse:collapse;padding:1px;align:center;}';
    txt +='#divOGPMenu TABLE TR {margin:0;padding:0;}';
    txt +='#divOGPMenu TABLE TR TH {padding-left:6px;padding-right:6px;border:1px solid ' + this.bordercolor + ';color:' + this.headercolor + ';font-size:13px;}';
    txt +='#divOGPMenu TABLE TR TD {padding-left:6px;padding-right:6px;border:1px solid ' + this.bordercolor + ';color:' + this.txtcolor + ';vertical-align:top;font-size:11px;}';
    txt +='#divOGPMenu TABLE TR A {text-decoration:none;color:' + this.linkcolor + ';}';
    txt +='#divOGPMenu TABLE TR A:hover {text-decoration:underline;}';
    txt +='#divOGPStatus {text-align:left;padding-left:4px;padding-right:4px;margin-top:4px;border:1px solid ' + this.bordercolor + ';font-size:10px;height:' +this.statusLines*13 + 'px;}';
    txt +='#divOGPResults {margin-top:2px;}';
    txt +='#divOGPIframe {display:none;height:10px;width:10px;}';
    txt +='#divOGPSetup {display:none;font-size:10px;margin-top:4px;margin-bottom:4px;}';
    txt +='#divOGPCSS {height:36px;}';
    txt +='#divOGPTop {display:none;}';
    txt +='#tblPropertyCollect {font-size:11px;padding:1px;margin:2px;width:95%;}';
    txt +='#tblPropertyCollect TR TD {border:1px solid #ffffff;}';
    txt +='#tblSendLoot {border:1px solid ' + this.bordercolor + ';font-size:11px;margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblSendLoot TH {font-size:12px;}';
    txt +='#tblSendLoot TD SELECT {vertical-align:top;font-size:10px;}';
    txt +='#divOGPSendLoot {text-align:center}';
    txt +='#divOGPSendStart {text-align:center;display:none;}';
    txt +='#divOGPSendStart INPUT {cursor:pointer;font-size:12px;border:1px solid ' + this.buttonbordercolor + ';background-color:' + this.buttonbgcolor + ';color:' + this.buttonfgcolor + ';}';
    txt +='#tblSendItems {margin:0;padding:0;font-size:11px;margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblSendItems TH {margin:0;padding:2px;border:1px solid ' + this.bordercolor + ';text-align:center;font-size:12px;}';
    txt +='#tblSendItems TD {margin:0;padding:2px;border:1px solid ' + this.bordercolor + ';text-align:center;}';
    txt +='#divSendItemControl {text-align:center;margin-top:3px;height:24px;}';
    txt +='#divSendItemControl A {padding-left:4px;padding-right:4px;cursor:pointer;border:1px solid ' + this.buttonbordercolor + ';background-color:' + this.buttonbgcolor + ';color:' + this.buttonfgcolor + ';}';
    txt +='#tblJobPayouts {margin-left:auto;margin-right:auto;border-collapse:collapse;color:' + this.jobpaycitytextcolor + ';}';
    txt +='#tblJobPayouts TD {vertical-align:top;margin:0px;padding:2px;border:1px solid ' + this.jobpaycitybordercolor + ';}';
    txt +='#tblJobPayouts TH {vertical-align:top;margin:0px;padding:2px;border:1px solid ' + this.jobpaycitybordercolor + ';font-size:11px;}';
    txt +='#tblJobPayouts TD#data {font-size:10px;}';
    txt +='#tblJobPayouts TD#title {text-align:center;background-color:' + this.jobpaycitybgcolor + ';color:' + this.jobpaycityfgcolor + ';font-size:16px;border:1px solid ' + this.jobpaycitybordercolor + ';}';
    txt +='#tblProfileLinks {margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblProfileLinks TR TH {font-size:12px;font-weight:normal;}';
    txt +='#tblProfileLinks A {text-decoration:none;color:' + this.linkcolor + ';}';
    txt +='#tblProfileLinks A:hover {text-decoration:underline;}';
    txt +='#tblFavorites {margin-bottom:4px;margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblFavorites TR {border:1px solid #ffffff;}';
    txt +='#tblFavorites TR TH {font-size:13px;}';
    txt +='#tblFavorites TR TD {padding-left:7px;padding-right:7px;font-size:12px;}';
    txt +='#tblSendCollection {margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblSendCollection TR {border-left:1px solid #ffffff;border-right:1px solid #ffffff;}';
    txt +='#tblSendCollection TR TH {text-align:left;border-top:1px solid #ffffff;}';
    txt +='#tblSendCollection TR TD {font-size:11px;border-bottom:1px solid #ffffff}';
    txt +='#tblSendCollection TR TD SELECT {width:40px;font-size:10px;margin-right:2px;}';
    txt +='#tblSendCollection TR TD INPUT {width:40px;border:0;background-color:#333333;font-size:10px;margin-right:2px;}';
    txt +='#divCitySelect {text-align:center;font-size:12px;}';
    txt +='#divLoading {text-align:center;font-size:13px;}';
    txt +='#tblColSending {margin-left:auto;margin-right:auto;border-collapse:collapse;padding:2px;}';
    txt +='#tblColSending TR TH {border:1px solid #ffffff;padding-left:6px;padding-right:6px;font-size:13px;}';
    txt +='#tblColSending TR TD {border:1px solid #ffffff;font-size:12px;}';
    txt +='#tblColSending TR TD DIV {text-align:center;}';
    txt +='#tblReport, #tblDrone, #tblDroneResults, #tblRunJobSetup, #tblJobResults, #tblQuickAttack, #divSkillSetup TABLE, #divSkillResults TABLE {margin-left:auto;margin-right:auto;border-collapse:collapse;margin-bottom:8px;}';
    txt +='#tblReport TR, #tblDrone TR, #tblDroneResults TR, #tblRunJobSetup TR, #tblJobResults TR, #tblQuickAttack TR, #divSkillSetup TR, #divSkillResults TR {border:1px solid #ffffff;padding-left;2px;padding-right:2px;}';
    txt +='#divSkillSetup TABLE TR TD, #divSkillResults TABLE TR TD {height:26px;text-align:center;}';
    txt +='#tblDrone TR TH, #tblDroneResults TR TH, #tblRunJobSetup TR TH, #tblJobResults TR TH {font-size:12px;}';
    txt +='#tblDrone TR TD, #tblDroneResults TR TD, #tblRunJobSetup TR TD, #tblJobResults TR TD, #divSkillSetup TR TD, #divSkillResults TR TD {font-size:10px;}';
    txt +='#tblDrone TR TD INPUT {font-size:10px;}';
    txt +='#tblDrone TR TD SELECT, #divSkillSetup TR TD SELECT {font-size:10px;}';
    txt +='#tblDrone TR TH INPUT {width:80px;border:0;background-color:#333333;color:#ffffff;font-size:10px;margin-right:2px;cursor:pointer;}';
    txt +='#tblDroneSub {border:0px;}';
    txt +='#tblDroneSub TR TD {font-size:10px;}';
    txt +='#tblDroneResults,#tblJobresults {width:600px;}';
    txt +='#divSkillSetup TABLE {width:450px;}';
    txt +='#tblDroneResults TR TD,#tblJobResults TR TD {border:1px solid #fff;vertical-align:top;}';
    txt +='#tblDroneResults TR TH,#tblJobResults TR TD {border:1px solid #fff;}';
    txt +='#tblDroneResults TR TD DIV, #tblJobResults TR TD DIV {float:left;padding-right:6px;}';
    txt +='#divDroneStatus {width:100%;text-align:center;color:' + OGPConfig.clrAction + ';}';
    txt +='#divDroneControl,#divJobControl {width:100%;text-align:center;}';
    txt +='#divJobStatus {width:100%;text-align:center;}';
    txt +='#tblQuickAttack TR TH, #tblQuickAttack TR TD {padding-left:4px;padding-right:4px;text-align:center;border:1px solid #fff;}';
    txt +='#tblQuickAttack {width:500px;}';
    txt +='#tblMinipack {width:600px;margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblMinipack TR TD {font-size:11px;}';
    txt +='#tblMinipack TR TD A {text-decoration:none;color:#ffff00;padding:2px;background-color:#770000;border:1px solid #ffaa00;font-size:11px;margin-left:3px;margin-right:3px;}';
    txt +='#tblMinipack TR TD DIV {text-align:center;width:100%;}';
    txt +='#tblRunJobSetup {width:758px;}';
    txt +='#tblRunJobSetup SELECT {font-size:10px;}';
    txt +='#tblRunJobSetup TR TH {height:24px;}';
    txt +='#tblRunJobSetup TR TH A, #divSkillSetup A {padding:2px;text-decoration:none;background-color:#770000;border:1px solid #ffaa00;font-size:11px;margin-left:3px;margin-right:3px;}';
    txt +='#tblRunJobSetup TR TD {vertical-align:top;}';
    txt +='#tblRunJobSetup TR TD TABLE {width:100%;}';
    txt +='#tblRunJobSetup TR TD TABLE TR TD DIV {width:100%;color:#ffffff;background-color:' + this.headerbgcolor + ';}';
    txt +='#trJobTabs {background-color:' + this.headerbgcolor + ';}';
    txt +='#trJobTabs TD {padding-left:3px;width:20%;cursor:pointer;}';
    txt +='#tblJobResults {width:600px;}';
    txt +='#divPromote {width:100%;text-align:center;font-size:13px;}';
    txt +='#divPromote A {text-decoration:none;color:#ffff00;padding:2px;background-color:#770000;border:1px solid #ffaa00;font-size:11px;margin-left:3px;margin-right:3px;}';
    txt +='#tblAASetup,#tblAAResults,#tblARSetup,#tblARResults {margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblAASetup {width:600px;}';
    txt +='#tblARSetup {width:200px;}';
    txt +='#tblAAResults {width:450px;}';
    txt +='#tblARResults {width:500px;}';
    txt +='#tblARResults TR TD DIV {text-align:center;width:100%;}';
    txt +='#divARStatus {color:' + this.infocolor + ';}';
    txt +='#tblAASetup TR TD,#tblAAResults TR TD,#tblARSetup TR TD,#tblARResults TR TD {padding-left:3px;padding-right:3px;vertical-align:top;font-size:12px;border:1px solid #fff;}';
    txt +='#tblAASetup TR TH,#tblAAResults TR TH,#tblARSetup TR TH,#tblARResults TR TH {text-align:center;font-size:13px;border:1px solid #fff;}';
    txt +='#tblAASetup TR TD SELECT {font-size:10px;width:60px;}';
    txt +='#tblAAResults TR TD DIV,#tblARResults TR TD DIV {float:left;}';
    txt +='#divAAControl,#divARControl {width:100%;text-align:center;padding-bottom:8px;}';
    txt +='#divAAControl A {text-decoration:none;color:#ffff00;padding:2px;background-color:#770000;border:1px solid #ffaa00;font-size:11px;margin-left:3px;margin-right:3px;}';
    txt +='#tblAddFriends {width:450px;margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblAddFriends TR TD {text-align:center;border:1px solid #ffffff;padding:3px;font-size:11px;}';
    txt +='#tblAddFriends TR TD DIV {float:left;}';
    txt +='#tblBuildShop {width:550px;margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblBuildShop TH {font-size:12px;border:1px solid #fff;}';
    txt +='#tblBuildShop TD {height:24px;vertical-align:middle;text-align:center;font-size:11px;border:1px solid #fff;}';
    txt +='#tblBuildShop TD SELECT {font-size:10px;}';
    txt +='#tblBuildShop A {text-decoration:none;color:#ffff00;padding:2px;background-color:#770000;border:1px solid #ffaa00;font-size:11px;margin-left:3px;margin-right:3px;}';
    txt +='#tblReport {width:98%;}';
    txt +='#tblReport TD {vertical-align:top;border:1px solid #fff;}';
    txt +='#tblReport TR TD TABLE TR TD {border:0;font-size:10px;}';
    txt +='#tblReport H1 {color:#ffff00;font-size:16px;font-weight:bold;padding:0;margin:0;}';
    txt +='#tblReport H2 {color:#00cc00;font-size:14px;font-weight:bold;margin:0;padding:0;}';
    txt +='#tblReport H3 {color:#fff;font-size:18px;padding:0;margin:0;}';
    txt +='#tblReport H4 {color:#00cc00;font-size:14px;font-weight:bold;margin:0;padding:0;}';
    txt +='#tblMafia TR TD,#tblMafia TR TH {font-size:11px;border:1px solid #fff}';
    txt +='#tblLinks {padding:1px;margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblLinks TR TD {font-size:11px;border:1px solid #fff;margin:0px;padding:1px;}';
    txt +='#tblLinks TR TH {text-align:left;font-size:12px;border:1px solid #fff;margin:0px;padding:1px;}';
    txt =='#tblInvEquip {padding:0;margin:0;}';
    txt +='#tblInvEquip TR TH {text-align:left;color:#009900;font-size:11px;cursor:pointer;}';
    txt +='#tblInvEquip TR TD {margin:0;padding:1px;font-size:10px;}';
    txt +='</style>';
    return txt;
  };

  this.updateTitle = function(step,index) {
    // Get the MW Account name and put it in the title
    switch(step) {
      case 0:
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlProfile;
        OGPAjax.buildAjax(url,'OGPDisplay.updateTitle','1,%ix%');
        break;
        
      case 1:
        var r = OGPAjax.ajax[index].response;
        var regexstring = /<div class="stats_title_text">\s+.*"(.*)"\s+level/;
        var match = regexstring.exec(r);
        if (match) {
          var name = match[1];
          // Clear out nonpritables
          var regexstring = /&.+;/g;
          name = name.replace(regexstring,'');
          document.title = name + ' - OGP MWTS V2 - Play Mafia Wars the Right Way';
        }
        break;
    
    }
  };
  this.buildMenu = function() {
    var txt = '';
    //txt +='<div style="width:100%;text-align:center;color:#f33;">Working on the drone runner, careful.</div>';
    txt +='<div id="divOGPMenu" name="divOGPMenu">';
    txt +='<table align="center">';
    txt +='<tr>';
    txt +='<th>Accounts</th>';
    txt +='<th>Page Links</th>';
    txt +='<th>Properties</th>';
    txt +='<th>Inventory</th>';
    txt +='<th>Jobs</th>';
    txt +='<th>Fighting/Robbing</th>';
    txt +='<th>Reference</th>';
    txt +='<th>Control</th>';
    txt +='</tr>';
    txt +='<tr>';
    txt +='<td>';
    txt +='<a onclick="OGPDisplay.menuClick(26);">Load Profile</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(27);">Manage Favorites</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(33);">Top Mafia Promote</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(31);">Get Mini-pack</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(41);">Use Skill Points</a><br />';
    //txt +='<a onclick="OGPDisplay.menuClick(43);">Add Friends To Mafia</a><br />';
    //txt +='<a style="text-decoration:line-through" onclick="OGPDisplay.addLine(\'Currently Broken\',\'#ff0\');">Add Friends To Mafia</a><br />';
    txt +='</td>';
    txt +='<td>';
    //txt +='<a onclick="OGPDisplay.menuClick(17);">Lotto Ticket</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(18);">My Mafia</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(19);">Gift Safe House</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(20);">Send Gifts</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(21);">Loot Inventory</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(24);">Collections</a><br />';
    txt +='<td>';
    txt +='Collect:<br />';
    txt +='<a onclick="OGPDisplay.menuClick(1);">NY</a>&nbsp;';
    //txt +='<a onclick="OGPDisplay.menuClick(2);">Cuba</a>&nbsp;';
    //txt +='<a onclick="OGPDisplay.menuClick(3);">Moscow</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(4);">BKK</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(48);">Vegas</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(51);">Italy</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(61);">Brazil</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(5);">All</a>&nbsp;<br />';
    txt +='Deposit<br />';
    txt +='<a onclick="OGPDisplay.menuClick(11);">NY</a>&nbsp;';
    //txt +='<a onclick="OGPDisplay.menuClick(12);">Cuba</a>&nbsp;';
    //txt +='<a onclick="OGPDisplay.menuClick(13);">Moscow</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(14);">BKK</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(49);">Vegas</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(52);">Italy</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(62);">Brazil</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(15);">All</a>&nbsp;<br />';
    txt +='Collect & Deposit<br />';
    txt +='<a onclick="OGPDisplay.menuClick(6);">NY</a>&nbsp;';
    //txt +='<a onclick="OGPDisplay.menuClick(7);">Cuba</a>&nbsp;';
    //txt +='<a onclick="OGPDisplay.menuClick(8);">Moscow</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(9);">BKK</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(50);">Vegas</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(53);">Italy</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(63);">Brazil</a>&nbsp;';
    txt +='<a onclick="OGPDisplay.menuClick(10);">All</a>&nbsp;<br />';
    txt +='</td>';
    txt +='<td>';
    txt +='<a onclick="OGPDisplay.menuClick(16);">Send Loot</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(28);">Send Collections</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(45);">Build Shop Items</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(54);">Auto-Build Shop Item</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(55);">Collect Stream Links</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(60);">Auto-Buy Fight Club</a><br />';
    //txt +='<a onclick="OGPDisplay.menuClick(46);">Collect Mystery Bags</a><br />';
    txt +='</td>';
    txt +='<td>';
    txt +='<a onclick="OGPDisplay.menuClick(30);">Smart Drone Runner</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(32);">Run Multiple Jobs</a><br />';
    txt +='</td>';
    txt +='<td>';
    txt +='Quick Attack<br />';
    txt +='&nbsp;&nbsp;&nbsp;<a onclick="OGPDisplay.menuClick(34);">(5)</a> ';
    txt +='<a onclick="OGPDisplay.menuClick(35);">(10)</a> ';
    txt +='<a onclick="OGPDisplay.menuClick(36);">(25)</a> ';
    txt +='<a onclick="OGPDisplay.menuClick(37);">(50)</a><br />';
    txt +='&nbsp;&nbsp;&nbsp;<a onclick="OGPDisplay.menuClick(38);">(100)</a> ';
    txt +='<a onclick="OGPDisplay.menuClick(39);">(500)</a> ';
    txt +='<a onclick="OGPDisplay.menuClick(40);">(1000)</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(42);">Auto-Attack</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(44);">Auto-Robbing</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(59);">Rob Specific Properties</a><br />';
    txt +='</td>';
    txt +='<td>';
    txt +='<a onclick="OGPDisplay.menuClick(22);">Update Job Payouts</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(23);">Show Job Payouts</a><br />';
    //txt +='<a onclick="OGPDisplay.menuClick(47);">My Character</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(57);">My Inventory</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(56);">My Mafia Family</a><br />';
    txt +='</td>';
    txt +='<td>';
    txt +='<a onclick="top.location.href = \'http://apps.facebook.com/inthemafia/?zy_link=appage&ref=bookmarks\';">Reset To FB</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(25);">Reset Display</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(29);">Unload Tools</a><br />';
    txt +='</td>';
    txt +='</tr>';
    txt +='</table>';
    txt +='</div>';
    return txt;
  };
  //style="text-decoration:line-through;" 
  
  this.buildLayout = function() {
    // Set up all of the divs for the display

    var txt = '';
    txt +='<div id="divOGPHeader" name="divOGPHeader">';
    txt +='<table>';
    txt +='<tr>';
    txt +='<th align="left" nowrap><div id="divOGPHeaderTitle" name="divOGPHeaderTitle">OGP MW Tools v' + OGPConfig.Version + '</div></th>';
    txt +='<td nowrap><a onclick="OGPDisplay.loadLefty(0);">Lefty\'s WL</a><br><a href="http://www.oneguy.com/mafia/mwts?p=donate" target="_blank">Donate</a>';
    txt +='&nbsp;-&nbsp;<a href="http://www.oneguy.com/mafia/mwts" target="_blank">Home Page</a></td>';
    txt +='<th nowrap><a href="http://www.oneguy.com/mafia/mwts" target="_blank">Help</a></th>';
    txt +='<td nowrap>Session<div id="divOGPSession" name="divOGPSession"></div></td>';
    txt +='<td nowrap>Current City<br /><div id="divOGPCity" name="divOGPCity"></div></td>';
    txt +='<td nowrap>Level<div id="divOGPLevel" name="divOGPLevel"></div></td>';
    txt +='<td nowrap>Skill Pts<div id="divOGPSkill" name="divOGPSKill"></div></td>';
    txt +='<td nowrap>Health<br><div id="divOGPHealth" name="divOGPHealth"></div></td>';
    txt +='<td nowrap>Stamina<div id="divOGPStamina" name="divOGPStamina"></div></td>';
    txt +='<td nowrap>Energy<div id="divOGPEnergy" name="divOGPEnergy"></div></td>';
    txt +='<td nowrap>Exp to Level<div id="divOGPExp" name="divOGPExp"></div></td>';
    txt +='<td nowrap>Eng/Exp Ratio<div id="divOGPRatio" name="divOGPRatio"></div></td>';
    txt +='<th align="right" nowrap><a href="#OGPTop">Menu</a></th>';
    txt +='</tr>';
    txt +='</table>';
    txt +='</div>'; // divOPGHeader

    txt +='<a id="OGPTop" name="OGPTop"></a>';
    txt +='<div id="divOGPCSS" name="divOGPCSS"></div>';
    txt +='<div id="divOGPMain" name="divOGPMain">';
    txt +='<div id="divOGPMenu" name="divOGPMenu">';
    txt +='</div>'; // divOGPMenu
    txt +='<div id="divOGPStatus" name="divOGPStatus">';
    for (var i=1; i < this.statusLines; i++) txt+='<br>';
    txt+='<font style="color:' + OGPConfig.clrInfo + '">Initializing...</font><br>';
    txt +='</div>'; // divOGPStatus
    txt +='<div id="divOGPSetup" name="divOGPSetup">';
    txt +='</div>'; // divOGPSetup
    txt +='<div id="divOGPResults" name="divOGPResults"></div>';
    txt +='<div id="divOGPIframe" name="divOGPIframe">';
    txt +='<iframe id="ogpiframe" name="ogpiframe" src="about:blank"></iframe>';
    txt +='</div>'; // divOGPIframe
    txt +='<div id="divOGPDebug" name="divOGPDebug"></div>';
    txt +='</div>'; // divOGPMain
    txt += '<div id="divOGPHidden" name="divOGPHidden"></div>';
    e$('ogpmwsuite').innerHTML = txt;
  };

  this.menuClick = function(item) {
    //this.hide('divOGPMenu');
    OGPDisplay.clearSetup();
    OGPDisplay.clearResults();
    OGPTimers.stopRunningProcesses();
    switch(item) {
      case 1:OGPProperty.start(OGPItems.getCityNum('New York'),true,false,false);break;
      case 2:OGPProperty.start(OGPItems.getCityNum('Cuba'),true,false,false);break;
      case 3:OGPProperty.start(OGPItems.getCityNum('Moscow'),true,false,false);break;
      case 4:OGPProperty.start(OGPItems.getCityNum('Bangkok'),true,false,false);break;
      case 5:OGPProperty.start('All',true,false,true);break;
      case 6:OGPProperty.start(OGPItems.getCityNum('New York'),true,true,false);break;
      case 7:OGPProperty.start(OGPItems.getCityNum('Cuba'),true,true,false);break;
      case 8:OGPProperty.start(OGPItems.getCityNum('Moscow'),true,true,false);break;
      case 9:OGPProperty.start(OGPItems.getCityNum('Bangkok'),true,true,false);break;
      case 10:OGPProperty.start('All',true,true,true);break;
      case 11:OGPProperty.start(OGPItems.getCityNum('New York'),false,true,false);break;
      case 12:OGPProperty.start(OGPItems.getCityNum('Cuba'),false,true,false);break;
      case 13:OGPProperty.start(OGPItems.getCityNum('Moscow'),false,true,false);break;
      case 14:OGPProperty.start(OGPItems.getCityNum('Bangkok'),false,true,false);break;
      case 15:OGPProperty.start('All',false,true,true);break;
      case 16:OGPSend.sendLoot(0,0);break;
      case 17:OGPDisplay.loadPage('Lotto');break;
      case 18:OGPDisplay.loadPage('Mafia');break;
      case 19:OGPDisplay.loadPage('SafeHouse');break;
      case 20:OGPDisplay.loadPage('Gifts');break;
      case 21:OGPDisplay.loadPage('Loot');break;
      case 22:OGPItems.updateJobPayouts(0,0);break;
      case 23:OGPItems.showJobPayouts();break;
      case 24:OGPDisplay.loadPage('Collections');break;
      case 25:OGPDisplay.resetDisplay();break;
      case 26:OGPAccount.loadProfile(0,0,1);break;
      case 27:OGPAccount.manageFavorites();break;
      case 28:OGPSend.sendCollections(0,0);break;
      case 29:OGPDisplay.hideTools();break;
      case 30:OGPDrone.droneSetup();break;
      case 31:OGPMinipack.getMinipack();break;
      case 32:OGPJob.runJobs(0,0);break;
      case 33:OGPAccount.promote(0,0);break;
      case 34:OGPFight.quickAttack(0,0,5);break;
      case 35:OGPFight.quickAttack(0,0,10);break;
      case 36:OGPFight.quickAttack(0,0,25);break;
      case 37:OGPFight.quickAttack(0,0,50);break;
      case 38:OGPFight.quickAttack(0,0,100);break;
      case 39:OGPFight.quickAttack(0,0,500);break;
      case 40:OGPFight.quickAttack(0,0,1000);break;
      case 41:OGPAccount.useSkills(0,0);break;
      case 42:OGPFight.autoAttack(0,0);break;
      case 43:OGPAccount.addFriends(0,0);break;
      case 44:OGPFight.autoRobbing(0,0);break;
      case 45:OGPItems.buildShopItems(0,0);break;
      case 46:OGPItems.collectMysteryBags(0,0);break;
      case 47:OGPAccount.myAccount(0,0);break;
      case 48:OGPProperty.start(OGPItems.getCityNum('Las Vegas'),true,false,false);break;
      case 49:OGPProperty.start(OGPItems.getCityNum('Las Vegas'),false,true,false);break;
      case 50:OGPProperty.start(OGPItems.getCityNum('Las Vegas'),true,true,false);break;
      case 51:OGPProperty.start(OGPItems.getCityNum('Italy'),true,false,false);break;
      case 52:OGPProperty.start(OGPItems.getCityNum('Italy'),false,true,false);break;
      case 53:OGPProperty.start(OGPItems.getCityNum('Italy'),true,true,false);break;
      case 54:OGPItems.autoBuildShopItems(0,0);break;
      case 55:OGPStream.collectLinks(0,0);break;
      case 56:OGPAccount.myMafia(0,0);break;
      case 57:OGPAccount.myInventory(0,0);break;
      case 58:OGPFight.robPresents(0,0);break;
      case 59:OGPFight.robPersonal(0,0);break;
      case 60:OGPItems.autoBuyFightClub(0,0);break;
      case 61:OGPProperty.start(OGPItems.getCityNum('Brazil'),true,false,false);break;
      case 62:OGPProperty.start(OGPItems.getCityNum('Brazil'),false,true,false);break;
      case 63:OGPProperty.start(OGPItems.getCityNum('Brazil'),true,true,false);break;
    }
  };      

  // Add a line to the status window
  this.addLine = function(strNew,color) {
    strCur = OGPDisplay.getHTML('divOGPStatus');
    strCur = strCur.replace(new RegExp('<br />',"gi"),'<br>');
    strCur = strCur.replace(new RegExp('<BR>',"g"),'<br>');
    var linecount = strCur.count('<br>');
    if (linecount >= this.statusLines)
      strNew = e$('divOGPStatus').innerHTML.substr(strCur.replace(new RegExp('<br />',"g"),'<br>').findx('<br>',linecount-this.statusLines+1)+4) + '<font style="color:' + color + '">' + strNew + '</font><br>';
    else
      strNew = e$('divOGPStatus').innerHTML + '<font style="color:' + color + '">' + strNew + '</font><br>';
    OGPDisplay.setHTML('divOGPStatus',strNew);
  };
  
  this.fixScreenFonts = function() {
    if (e$('user_stats'))
      e$('user_stats').style.fontSize='11px';
    if (e$('user_energy'))
      e$('user_energy').parentNode.style.fontSize='11px';
  };

  this.hide = function(elm) {
    if (e$(elm)) e$(elm).style.display='none';
  };

  this.show = function(elm) {
    if (e$(elm)) e$(elm).style.display='block';
  };

  this.setHTML = function(elm,str) {
    if (e$(elm)) {
      e$(elm).innerHTML = str;
      OGPDisplay.show(elm);
    }
  };
  
  this.getHTML = function(elm) {
    return e$(elm).innerHTML;
  };
  
  this.updateCurrentCity = function() {
    if (OGPConfig.currentCity=='') OGPConfig.currentCity = OGPTravel.getCurrentCity();
    this.setHTML('divOGPCity',OGPItems.getCityName(OGPConfig.currentCity));
  };
  
  this.clearResults = function() {
    this.setHTML('divOGPResults','');
  };
  
  this.clearSetup = function() {
    this.setHTML('divOGPSetup','');
  };

  this.resetDisplay = function() {
    //this.hide('divOGPResults');
    //this.hide('divOGPSetup');
    this.clearResults();
    this.clearSetup();
    this.setHTML('divOGPDebug','');
  };
  
  this.loadPage = function(page) {
    var url = '';
    OGPDisplay.setHTML('inner_page','<div align="center" style="width:100%;text-align:center;font-size:13px;">Loading...</div>');
    switch(page) {
      case 'Lotto':
        url = OGPConfig.MWURLAJAX + OGPConfig.urlLottoPage;
        url += '&tab=1';
        break;
      case 'Mafia':
        url = OGPConfig.MWURLAJAX + OGPConfig.urlMafiaPage;
        break;
      case 'SafeHouse':
        url = OGPConfig.MWURLAJAX + OGPConfig.urlSafeHousePage;
        break;
      case 'Gifts':
        url = OGPConfig.MWURLAJAX + OGPConfig.urlMysteryGiftsPage;
        break;
      case 'Loot':
        url = OGPConfig.MWURLAJAX + OGPConfig.urlLootListPage;
        break;
      case 'Collections':
        url = OGPConfig.MWURLAJAX + OGPConfig.urlCollectionPage;
        break;
    }
    //e$('divOGPDebug').innerHTML = url;
    OGPAjax.buildAjax(url,'OGPDisplay.showPage','%ix%,\'inner_page\'');
  };
  
  this.showPage = function(index,div) {
    if (!div) div = 'content_row';
    var r = OGPAjax.ajax[index].response;
    //e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>' + r;
    OGPDisplay.attachResponse(r,div);
  };

  this.attachResponse = function(str,div) {  
    if (!div) div = 'content_row';
    if (str.indexOf('top.location.href =') < 50 && str.indexOf('top.location.href =') > 0) {
      OGPDisplay.addLine('The session has timed out, stopping operations.',OGPConfig.clrFatal);
      OGPConfig.Session = 0;
    } else {
      OGPDisplay.setHTML(div,'');
      var newdiv = document.createElement('div');
      newdiv.innerHTML = str;
      var container = e$(div);
      if (container) {
        container.appendChild(newdiv);
        if (div=='inner_page') {
          var s = str.indexOf('!-- Current Page:');
          var e = str.indexOf('_controller',s);
          e$(div).className=str.substr(s+18,e) + '_controller';
        }
      }
      OGPDisplay.show(div);
    }
  };

  this.hideTools = function() {
    document.getElementById('ogpmwsuite').parentNode.removeChild(document.getElementById('ogpmwsuite'));
  };
  
  this.setGoodColor = function(str) {
    return '<font color="' + OGPConfig.clrGood + '">' + str + '</font>';
  }
  this.setBadColor = function(str) {
    return '<font color="' + OGPConfig.clrWarning + '">' + str + '</font>';
  }
  
  this.loadLefty = function(step) {
    OGPDisplay.addLine('Loading Lefty Thumbbreaker\'s Profile','#ff0');
    var url = OGPConfig.MWURLAJAX + OGPConfig.urlProfile + '&xw_city=' + OGPConfig.currentCity + '&user=1706598396';
    OGPAjax.buildAjax(url,'OGPAccount.loadProfile','2,%ix%,"1706598396"');
  };

};

/***************************************
  Stream Functions
****************************************/
function ogpStreamDef() {
  
  this.clStartDate;
  this.clEndDate;
  this.clCurUser;
  this.clArray = new Array;
  this.clWin;
  this.clIsRunning = false;
  
  this.clLower = 0;
  this.clLimit = 0;
  
  this.CLPause = function() {
    OGPStream.clIsRunning = false;
    e$('divCLControl').innerHTML= '<a onclick="OGPStream.CLResume()">Resume Collecting</a>';
  };
  
  this.CLResume = function() {
    e$('divCLControl').innerHTML = '<a onclick="OGPStream.CLPause()">Pause Collecting</a>';
    OGPStream.clIsRunning = true;
    OGPStream.collectLinks(5,0);
  };

  this.collectLinks = function(step,index) {
    switch(step) {
      case 0:
        var txt='';
        txt+='<table id="tblDrone" style="width:450px">';
        txt+='<tr><td colspan="2" style="font-size:11px;">';
        txt+='READ THIS WHOLE SECTION<br><br>';
        txt+='This feature has been fully rewritten.  Status messages from friends are limited to the last 30 days or 50 posts ';
        txt+='which resulted in not many links being returned from posts older than 7 days.  This function will now scan your ';
        txt+='friends\' status messages and pull out links to tinyurl and bit.ly addresses.  The full list will be displayed ';
        txt+='allowing you to collect the items you need.<br><br>';
        txt+='<a onclick="OGPStream.collectLinks(1,0)">Start Scanning</a>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;
        
      case 1:
        OGPStream.clIsRunning = true;
        OGPDisplay.clearSetup();
        OGPDisplay.setHTML('divOGPResults','Loading current mafia member list');
        OGPStream.clLower = 0;
        OGPStream.clLimit = 50;
        var qry = "";
        qry += "SELECT time,message from status ";
        qry += " where uid in (select uid from status where uid in (select uid2 from friend where uid1=me())) ";
        qry += " order by time desc ";
        OGPStream.clQrybase = qry;
        OGPStream.collectLinks(2,0);
        break;
        
      case 2:
        // Get some records
        OGPDisplay.setHTML('divOGPResults','Scanned ' + OGPStream.clLower + ' status entries.  ' + OGPStream.clArray.length + ' links found.');
        FB.Facebook.apiClient.fql_query(OGPStream.clQrybase + ' LIMIT ' + OGPStream.clLower + ',' + OGPStream.clLimit,
          function(rows) {
            if (rows == null) {
              // Move to next one
              return;
            }
            if (rows.length > 0) {
              // Scan results and add to array
              var regexstring = /((?:\b[A-Z][a-zA-Z]+\b\s+)*(?:\b[A-Z][a-zA-Z]+\b)):\s(http:\/\/tinyurl.com\/?[a-z0-9]*|http:\/\/bit.ly\/?[a-zA-Z0-9]*)/g;
              //var regexstring = '\\b[a-zA-Z]+\\b';
              //var re = new RegExp(regexstring);
              for (var i=0; i < rows.length; i++) {
                if (regexstring.exec(rows[i].message)) {
                  // Match, check the time
                  var rmatch;
                  regexstring.lastIndex=0;
                  while (rmatch = regexstring.exec(rows[i].message)) {
                    OGPStream.clArray[OGPStream.clArray.length]=new Array(rmatch[1],rmatch[2]);
                  }
                } 
              }
              OGPStream.clLower += OGPStream.clLimit;
              setTimeout('OGPStream.collectLinks(2,0)',1000);
              return;
            }
            // No rows returned, done
            OGPStream.collectLinks(3,0);
            return;
        });        
        break;
        
      case 3:
        OGPDisplay.setHTML('divOGPResults',OGPStream.clArray.length + ' links found...sorting.');
        for (var i=0; i < OGPStream.clArray.length-1; i++) {
          for (var j=i+1; j < OGPStream.clArray.length; j++) {
            if (OGPStream.clArray[i][0] > OGPStream.clArray[j][0]) {
              var tmp = OGPStream.clArray[i];
              OGPStream.clArray[i] = OGPStream.clArray[j];
              OGPStream.clArray[j] = tmp;
            }
          }
        }
        
        var txt = '';
        var col = 0;
        var lastitem = '';
        txt += '<table align="center" id="tblLinks" name="tblLinks">';
        for (var i=0; i < OGPStream.clArray.length; i++)
        {
          if (OGPStream.clArray[i][0] != lastitem) {
            txt += '<tr><th colspan="4">' + OGPStream.clArray[i][0] + '</th></tr>';
            lastitem = OGPStream.clArray[i][0];
            col=0;
          }
          if (col==0) txt += '<tr>';
          txt += '<td><a href="' + OGPStream.clArray[i][1] + '" target="_blank">' + OGPStream.clArray[i][1] + '</a></td>';
          col++;
          if (col==4) {
            txt += '</tr>';
            col = 0;
          }
          if (i < OGPStream.clArray.length-1) {
            if (OGPStream.clArray[i+1][0] != lastitem) {
              if (col > 0) {
                for (var j=col; j < 4; j++) {
                  txt += '<td>&nbsp;</td>';
                }
                txt += '</tr>';
              }
            }
          }
        }
        if (col > 0) {
          for (var j=col; j < 4; j++) {
            txt += '<td>&nbsp;</td>';
          }
          txt += '</tr>';
        }
        txt += '</table>';
        OGPDisplay.setHTML('divOGPResults',txt);
        break;
        
      case 4:
        // Set up the processing table
        var txt='';
        txt +='<table id="tblDrone" align="center" style="width:620px;">';
        txt +='<tr><td style="width:20%">Mafia Count:</td><td style="width:30%"><div id="divCLCount" name="divCLCount">0/' + OGPAccount.currentMafia.length + '</div></td>';
        txt +='<td style="width:20%">Current Member:</td><td style="width:30%"><div id="divCLName" name="divCLName"></div></td></tr>';
        txt +='<td>Current Status:</td><td colspan="3"><div id="divCLStatus" name="divCLStatus">Initializing...</div></td></tr>';
        txt +='<tr><td colspan="4"><div id="divCLInfo" name="divCLInfo">&nbsp;</div></td></tr>';
        txt +='</table>';
        txt +='<div id="divCLControl" name="divCLControl" style="text-align:center"><a onclick="OGPStream.CLPause()">Pause Collecting</a></div>';
        
        OGPDisplay.setHTML('divOGPResults',txt);
        //OGPStream.clCurUser = 0;
        //Process one user
        OGPStream.collectLinks(5,0);
        break; 
        
      case 5:
        if(!OGPStream.clIsRunning) break;
        if (parseInt(OGPStream.clCurUser) >= OGPAccount.currentMafia.length) {
          OGPDisplay.setHTML('divCLStatus','<font color=green>All users processed</font>');
          OGPDisplay.setHTML('divCLControl','');
          return;
        }
        OGPStream.clArray.length = 0;
        OGPDisplay.setHTML('divCLStatus','Getting user information and status messages');
        OGPDisplay.setHTML('divCLCount',OGPStream.clCurUser + 1 + '/' + OGPAccount.currentMafia.length);
        var qry = "SELECT uid,name FROM user WHERE uid=" + OGPAccount.currentMafia[OGPStream.clCurUser];
        FB.Facebook.apiClient.fql_query(qry,
          function(rows) {
            if (rows == null) {
              // Move to next one
              OGPDisplay.setHTML('divCLStatus','Could not get user information, FB Connection may have timed out.');
              OGPStream.clCurUser++;
              setTimeout("OGPStream.collectLinks(5,0)",2000);
              return;
            }
            if (rows.length > 0) {
              OGPDisplay.setHTML('divCLName',rows[0].name);
            }
        });
        var st = parseInt(OGPStream.clStartDate.getTime()/1000);
        var et = parseInt(OGPStream.clEndDate.getTime()/1000);
        qry = "SELECT uid,message From status where uid=" + OGPAccount.currentMafia[OGPStream.clCurUser];
        qry += " AND time >= " + st + " AND time <= " + et + " ORDER BY time";
        qry += " LIMIT 500"
        FB.Facebook.apiClient.fql_query(qry,
          function(rows) {
            if (rows.length > 0) {
              OGPDisplay.setHTML('divCLStatus',rows.length + ' status messages read.  Checking for links');
              for (var i=0; i < rows.length; i++) {
                // Check for a link
                var r = rows[i]['message'];
                if (r.indexOf('http://') > 0) {
                  var ar = r.split('\n')
                  for (var j=0; j < ar.length; j++) {
                    if (ar[j].indexOf('http://') > 0) {
                      var n = ar[j].substr(0,ar[j].indexOf('http://'));
                      var l = ar[j].substr(ar[j].indexOf('http://'));
                      if (l.length < 30) // Try to limit to only short links
                        OGPStream.clArray[OGPStream.clArray.length] = new Array(n,l);
                    } 
                  }
                }
              }
            }
            if (OGPStream.clArray.length > 0) {
              // Have at least one link, start collecting
              OGPStream.collectLinks(6,0);
            } else {
              OGPDisplay.setHTML('divCLInfo','No links found for this user.');
              OGPStream.clCurUser++;
              setTimeout("OGPStream.collectLinks(5,0)",2000);
            }
        });
        break;
      
      case 6:
        // Collect the last one in the list
        if (!OGPStream.clIsRunning) break;
        OGPDisplay.setHTML('divCLInfo','Collecting ' + OGPStream.clArray[OGPStream.clArray.length-1][0]);
        if (!OGPStream.clWin) 
          OGPStream.clWin = window.open(OGPStream.clArray[OGPStream.clArray.length-1][1],'winCL');
        else
          OGPStream.clWin.location = OGPStream.clArray[OGPStream.clArray.length-1][1];
          
        if (!OGPStream.clWin) {
          OGPDisplay.setHTML('divCLStatus','<font color=red>Could not open popup window...disable popup-blocker</font>');
          return;
        }
        //e$('frameCL').src = OGPStream.clArray[OGPStream.clArray.length-1][1];
        OGPStream.clArray.length--;
        if (OGPStream.clArray.length > 0) {
          setTimeout('OGPStream.collectLinks(6,0)',8000);
        } else {
          // Done with this user, move to next
          if(OGPStream.clWin) { OGPStream.clWin.close(); OGPStream.clWin = null}
          OGPStream.clCurUser++;
          OGPStream.collectLinks(5,0); 
        }
        break;
    }
  }


};
/***************************************
  Fighting/Robbing 
****************************************/
function ogpFightDef() {

  this.DefaultAttackTarget = 'p|3'; // Default user id to attack
  this.BurstCount = 10; // Number of attacks for burst
  
  this.qkFightCount;
  this.qkFightsToDo;
 
  this.qkSuccess;
  this.qkFail;
  this.qkNothing;
  this.qkWeak;
  this.fighttempkey;
 
  this.arRobCity;
  this.arRobSpots = new Array();
  this.arNoStamina;
  this.arIsRunning;
  this.arTimer;
  
  this.aaMinLevel = 1;
  this.aaMaxLevel = 25000;
  this.aaMinMafia = 1;
  this.aaMaxMafia = 501;
  this.aaBank = 0;
  this.aaStopForLevel = 0;
  this.aaIgnore = new Array();
  this.aaTimesToAttack = 0;
  this.aaAttackCount = 0;
  this.aaFightWins = 0;
  this.aaFightLosses = 0;
  this.aaCity = 1;
  this.aaHealCity = 1;
  this.lootitems = new Array();
  this.attackStrength = 0;
  this.defenseStrength = 0;
  this.attackStrengthCurrent = 0;
  this.defenseStrengthCurrent = 0;
  this.totalmoney = new Array();
  this.aaCurFightIndex = 0;
  this.spendStamTimeout;
  this.aaIsPaused = 0;
  this.aaIced = -1;
  this.aaIcedCurrent = -1;
  
  this.arDelay;
  
  this.beatdowns = new Array('Whoopin\' some ass','Pounding them','Handing out a beatdown','Breaking out the pimp hand','Smacking them around','Knocking out some teeth');

  this.autoAttack = function(step,index) {
    switch(step) {
      case 0:
        // Load the cookie
        OGPFight.lootitems.length = 0;
        var ck = OGPCookie.readCookie('ogpattack');
        if (ck != null) {
          ck = ck.split('|');
          var i = 0;
          while (i < ck.length) {
            switch(ck[i]) {
              case 'city':OGPFight.aaCity = ck[i+1];i+=2;break;
              case 'heal':OGPFight.aaHealCity = ck[i+1];i+=2;break;
              case 'mlvl':OGPFight.aaMinLevel = parseInt(ck[i+1]);i+=2;break;
              case 'xlvl':OGPFight.aaMaxLevel = parseInt(ck[i+1]);i+=2;break;
              case 'mfam':OGPFight.aaMinMafia = parseInt(ck[i+1]);i+=2;break;
              case 'xfam':OGPFight.aaMaxMafia = parseInt(ck[i+1]);i+=2;break;
              case 'matt':OGPFight.aaMaxAttacks = parseInt(ck[i+1]);i+=2;break;
              case 'bank':OGPFight.aaBank = parseInt(ck[i+1]);i+=2;break;
              case 'stop':OGPFight.aaStopForLevel = 1;i++;break;
              case 'strt':OGPFight.aaRestart = 1;i++;break;
              case 'ignore':OGPFight.aaIgnore = ck[i+1].split('%*%');i+=2;break;
              default: i++;break;
            }
          }
        }
        if (OGPFight.aaBank == -1) OGPFight.aaBank = 0;
        OGPFight.autoAttack(1,0);
        break;
        
      case 1:
        var txt = '';
        txt += '<table id="tblDrone">';
        txt += '<tr><td>Times to Attack:</td><td><select id="selAACount" name="selAACount">';
        txt += '<option value="99999999">All</option>';
        for (var i=1; i < 50; i++) {txt += '<option value="' + i + '">' + i + '</option>'};
        for (var i=50; i < 500; i+=50) {txt += '<option value="' + i + '">' + i + '</option>'};
        for (var i=500; i < 5000; i+=250) {txt += '<option value="' + i + '">' + i + '</option>'};
        for (var i=5000; i <= 25000; i+=1000) {txt += '<option value="' + i + '">' + i + '</option>'};
        txt += '</select></td>';
        txt += '<td>Level:</td>';
        txt += '<td><input name="txtMinLevel" id="txtMinLevel" type="text" size="5" value="' + OGPFight.aaMinLevel + '">';
        txt += ' to ';
        txt += '<input name="txtMaxLevel" id="txtMaxLevel" type="text" size="5" value="' + OGPFight.aaMaxLevel + '">';
        txt += '</td></tr>';
        txt += '<tr>';
        txt += '<td>Attack City:</td>';
        txt += '<td><select id="selAACity" name="selAACity">';
        for (var i=0; i < OGPItems.cities.length; i++) {
          txt += '<option';
          if (OGPItems.cities[i][3] == OGPFight.aaCity) txt += ' selected';
          txt += ' value="' + OGPItems.cities[i][3] + '">' + OGPItems.cities[i][0] + '</option>';
        }
        txt += '</select></td>';
        txt += '<td>Mafia Size:</td>';
        txt += '<td><input name="txtMinSize" id="txtMinSize" type="text" size="5" value="' + OGPFight.aaMinMafia + '">';
        txt += ' to ';
        txt += '<input name="txtMaxSize" id="txtMaxSize" type="text" size="5" value="' + OGPFight.aaMaxMafia + '">';
        txt += '</td></tr>';
        txt += '<tr>';
        txt += '<td>Heal City:</td>';
        txt += '<td><select id="selAAHealCity" name="selAAHealCity">';
        for (var i=0; i < OGPItems.cities.length; i++) {
          txt += '<option';
          if (OGPItems.cities[i][3] == OGPFight.aaHealCity) txt += ' selected';
          txt += ' value="' + OGPItems.cities[i][3] + '">' + OGPItems.cities[i][0] + '</option>';
        }
        txt += '</select></td>';
        txt += '<td colspan="2"><input type="checkbox" name="chkRestart" id="chkRestart"';
        if (OGPFight.aaRestart == 1) txt += ' checked';
        txt += '> Restart When Stamina Available</td>';
        txt += '</tr>';
        txt += '<tr><td colspan="2"><input type="checkbox" id="chkBank" name="chkBank"';
        if (OGPFight.aaBank > 0) txt += ' checked';
        txt += '> Deposit when balance over <input type="text" size="12" name="txtBank" id="txtBank" value="' + OGPFight.aaBank + '"></td>';
        txt += '<td colspan="2"><input type="checkbox" id="chkStop" name="chkStop"';
        if (OGPFight.aaStopForLevel == 1) txt += ' checked';
        txt += '> Stop before level up</td>';
        txt += '</tr>';
        txt += '<tr><td valign="top">Ignore names with:<br>(Separate with a space)</td><td valign="top" colspan="3">';
        txt += '<textarea name="txtIgnore" id="txtIgnore" rows="3" cols="50">';
        for (var i=0; i < OGPFight.aaIgnore.length; i++) {
          txt += OGPFight.aaIgnore[i] + ' ';
        }
        txt += '</textarea></td></tr>';
        txt += '</table>';
        txt += '<div align="center"><a onclick="OGPFight.autoAttack(2,0)">Start Attacking</a></div>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;
        
      case 2:
        // Save the settings
        OGPFight.aaTimesToAttack = parseInt(e$('selAACount').value);
        OGPFight.aaMinLevel = parseInt(e$('txtMinLevel').value);
        OGPFight.aaMaxLevel = parseInt(e$('txtMaxLevel').value);
        OGPFight.aaMinMafia = parseInt(e$('txtMinSize').value);
        OGPFight.aaMaxMafia = parseInt(e$('txtMaxSize').value);
        OGPFight.aaCity = e$('selAACity').value;
        OGPFight.aaHealCity = e$('selAAHealCity').value;
        OGPFight.aaRestart = (e$('chkRestart').checked==true?1:0);
        if (e$('chkBank').checked == true) {
          if (!isNaN(e$('txtBank').value)) {
            OGPFight.aaBank = parseInt(e$('txtBank').value);
          } else {
            OGPFight.aaBank = -1;
          }
        } else {
          OGPFight.aaBank = -1;
        }
        OGPFight.aaStopForLevel = (e$('chkStop').checked==true?1:0);
        var ta = e$('txtIgnore').value.split(' ');
        var igcookie = '';
        OGPFight.aaIgnore.length = 0;
        for (var i=0; i < ta.length; i++) {
          if (ta[i] != '') {
            OGPFight.aaIgnore[OGPFight.aaIgnore.length] = ta[i];
            if (igcookie != '') igcookie += '%*%';
            igcookie += ta[i];
          }
        }
        // Build the cookie string
        var ck = '';
        ck += 'mlvl|' + OGPFight.aaMinLevel + '|';
        ck += 'xlvl|' + OGPFight.aaMaxLevel + '|';
        ck += 'mfam|' + OGPFight.aaMinMafia + '|';
        ck += 'xfam|' + OGPFight.aaMaxMafia + '|';
        ck += 'city|' + OGPFight.aaCity + '|';
        ck += 'heal|' + OGPFight.aaHealCity + '|';
        if (OGPFight.aaStopForLevel == 1) ck += 'stop|';
        if (OGPFight.aaRestart == 1) ck += 'strt|';
        if (OGPFight.aaBank != -1)
          ck += 'bank|' + OGPFight.aaBank + '|';
        if (igcookie != '')
          ck += 'ignore|' + igcookie + '|';
        OGPCookie.createCookie('ogpattack',ck,365);
        OGPFight.autoAttack(3,0);
        break;
        
      case 3:
        // Set up the output table
        var txt = '';
        txt += '<table id="tblDroneResults" name="tblDroneResults">';
        txt += '<tr><th colspan="2">Auto-Attack</th></tr>';
        txt += '<tr><td colspan="2">Options:  ';
        txt += 'Attack levels ' + OGPFight.aaMinLevel + '-' + OGPFight.aaMaxLevel;
        txt += ', Mafia size ' + OGPFight.aaMinMafia + '-' + OGPFight.aaMaxMafia;
        txt += ', Attack in ' + OGPItems.getCityName(OGPFight.aaCity);
        txt += ', Heal in ' + OGPItems.getCityName(OGPFight.aaHealCity);
        if (OGPFight.aaStopForLevel == 1) txt += ', Stop For Level Up';
        if (OGPFight.aaBank > 0) txt += ', Deposit money at ' + OGPFight.aaBank;
        if (OGPFight.aaRestart == 1) txt += ', Restart When Stamina Available';
        if (OGPFight.aaIgnore.length > 0) {
          txt += ', Ignore names with: '
          for (var i = 0; i < OGPFight.aaIgnore.length; i++)
            txt += OGPFight.aaIgnore[i] + ', ';
          txt = txt.substr(0,txt.length-2);
        }
        txt += '</td></tr>';
        txt += '<tr>';
        txt += '<td style="width:50%"><div>Fights: </div><div id="divAAFightsRun" name="divAAFightsRun">0/' + (OGPFight.aaTimesToAttack==99999999?'All':OGPFight.aaTimesToAttack) + '</div></td>';
        txt += '<td style="width:50%"><div>Exp Needed: </div><div id="divAAExpNeeded" name="divAAExpNeeded"></div></td>';
        txt += '</tr>';
        txt += '<tr><td><div>Stamina Remaining: </div><div id="divAAStamLeft" name="divAAStamLeft"></div></td>';
        txt += '<td><div>Fight Results: </div><div id="divAAFightWin" name="divAAFightWin">Win: 0</div><div name="divAAFightLoss" id="divAAFightLoss">Lose: 0</div></td></tr>';
        txt += '</tr>';
        txt += '<tr><td><div>Attack: </div><div id="divAAAttack" name="divAAAttack">-----</div>';
        txt += '<div>&nbsp;&nbsp;&nbsp;&nbsp;Defense: </div><div id="divAADefense" name="divAADefense">-----</div></td>';
        txt += '<td><div>Iced:</div><div id="divAAIced" name="divAAIced">-----</div></td><tr>';
        txt += '<tr><td colspan="2"><div>Total Money: </div><div id="divAATotalMoney" name="divAATotalMoney"></div></td>';
        txt += '<tr><td colspan="2"><div>Loot Items: </div><div id="divAALoot" name="divAALoot"></div></td></tr>';
        txt += '<tr><td colspan="2"><div style="width:100%;text-align:center;" id="divAAStatus" name="divAAStatus"></div></td></tr>';
        txt += '</table>';
        txt += '<div id="divAAControl" name="divAAControl"></div>';
        OGPDisplay.clearSetup();
        OGPDisplay.setHTML('divOGPResults',txt);
        
        // Clear all of the counters
        OGPFight.aaAttackCount = 0;
        OGPFight.aaFightWins = 0;
        OGPFight.aaFightLosses = 0;
        OGPFight.aaIsPaused = false;
        OGPFight.aaIced = -1;

        for (var i=0; i < OGPItems.cities.length; i++) 
          OGPFight.totalmoney[i] = 0;
          
        // Load the fight page to get A/D values
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlFightList;
        OGPAjax.buildAjax(url,'OGPFight.autoAttack','31,%ix%');
        break;
        
      case 31:
        var r = OGPAjax.ajax[index].response;
        r = r.replace(/[\r\n|\n|\t|]/g,'');
        OGPFight.attackStrength = OGPParser.getADStats(r,'A');
        OGPFight.defenseStrength = OGPParser.getADStats(r,'D');
        OGPFight.attackStrengthCurrent = OGPParser.getADStats(r,'A');
        OGPFight.defenseStrengthCurrent = OGPParser.getADStats(r,'D');
        OGPDisplay.setHTML('divAAAttack',OGPDisplay.setGoodColor(OGPFight.attackStrength));
        OGPDisplay.setHTML('divAADefense',OGPDisplay.setGoodColor(OGPFight.defenseStrength));
        OGPFight.autoAttack(4,0);
        break;


      case 4:
        // Main loop
        if (!e$('divAAControl')) {
          return;
        }
        
        if (OGPFight.aaIsPaused == true) {
          OGPDisplay.setHTML('divAAControl','<a onclick="OGPFight.aaIsPaused=false;OGPFight.autoAttack(4,0);">Resume</a>');
          return;
        }
        OGPDisplay.setHTML('divAAControl','<a onclick="OGPFight.aaIsPaused=true;this.innerHTML=\'Stopping...\';">Pause</a>');
        if (OGPConfig.curExpNeeded-OGPConfig.curExp < 25 && OGPDrone.stopForLevel == true) {OGPDisplay.setHTML('divAAStatus','Stopping before level up');return;}
        
        if (parseInt(OGPFight.aaAttackCount) >= parseInt(OGPFight.aaTimesToAttack)) {
          OGPDisplay.setHTML('divAAStatus','All fights completed');
          OGPDisplay.setHTML('divAAControl','');
          return;
        }
        
        // Only continue if we have enough stamina
        if (OGPFight.aaCity == 7 && OGPConfig.curStamina < 5) {
          OGPDisplay.setHTML('divAAStatus','Waiting for more stamina...');
          setTimeout('OGPFight.autoAttack(4,0)',10000);
          return;
        }
        if (OGPFight.aaCity != 7 && OGPConfig.curStamina <1) {
          OGPDisplay.setHTML('divAAStatus','Waiting for more stamina...');
          setTimeout('OGPFight.autoAttack(4,0)',10000);
          return;
        }
        
        if (OGPConfig.curHealth < 25)
          OGPFight.autoAttack(5,0);
        else
          if (OGPConfig.currentCity != OGPFight.aaCity) 
            OGPTravel.goCity(OGPFight.aaCity,"OGPFight.autoAttack(7,0)");
          else
            OGPFight.autoAttack(7,0);
        break;
        
      case 5:
        // Heal in the heal city
        if (OGPConfig.currentCity != OGPFight.aaHealCity) {
          OGPTravel.goCity(OGPFight.aaHealCity,"OGPFight.autoAttack(4,0)");
        } else {
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlHeal + '&xw_city=' + OGPConfig.currentCity;
          OGPAjax.buildAjax(url,'OGPFight.autoAttack','6,%ix%');
        }
        break;
        
      case 6:
        // See if we healed
        if (OGPAjax.ajax[index]) {
          OGPTimers.updateStats(1,index);
          var r = OGPAjax.ajax[index].response;
          if (parseInt(OGPConfig.curHealth) < 25) {
            // Couldn't heal, wait 15 seconds and try again
            OGPDisplay.setHTML('divAAStatus','Can\'t heal yet, waiting...');
            setTimeout('OGPFight.autoAttack(5,0)',15000);
            return; 
          }
          // Healed, start over
          OGPFight.autoAttack(4,0);
        } else {
          // No response from the call, try again in 15 seconds
          setTimeout('OGPFight.autoAttack(4,0)',15000);
        }
        break;
          
      case 7:
        // Load the fight page and look for someone to attack
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlFightList;
        OGPAjax.buildAjax(url,'OGPFight.autoAttack','8,%ix%');
        break; 
      
      case 8:
        var r = OGPAjax.ajax[index].response;
        OGPParser.getFightList(r);
        // Check for someone on the fightlist to attack
        var i = OGPParser.getAttackTarget(OGPFight.aaMinLevel,OGPFight.aaMaxLevel,OGPFight.aaMinMafia,OGPFight.aaMaxMafia,OGPFight.aaIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          OGPDisplay.setHTML('divAAStatus','No matches on fight list, waiting 10 seconds');
          setTimeout('OGPFight.autoAttack(4,0)',10000);
          return; 
        }
        // Have someone to attack, try once
        OGPFight.aaCurFightIndex = i;
        OGPDisplay.setHTML('divAAStatus','Attacking ' + OGPConfig.curFightList[i][0] + '&nbsp;' + OGPConfig.curFightList[i][2] + ' - Level ' + OGPConfig.curFightList[i][3] + ' - Mafia Size ' + OGPConfig.curFightList[i][4]);
        var url = OGPConfig.MWROOTPATH + '?' + OGPConfig.urlAttack;
        url += '&xw_city=' + OGPConfig.curFightList[i][5];
        OGPAjax.buildAjax(url,'OGPFight.autoAttack','9,%ix%');
        break;

      case 9:
        // Title, UserID, Name, Level, Mafia, tmpkey, iced, available
        var r = OGPAjax.ajax[index].response;
        //e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>'; break;
        r = r.replace(/[\r\n|\n|\t]/g,'');
        // Clear the timeout
        if (OGPFight.spendStamTimeout) clearTimeout(OGPFight.spendStamTimeout);
        OGPTimers.updateStats(1,index);
        
        // Check for icing
        var regex = /iced_pop_body_count_number.*?([0-9,]+)/;
        var match = regex.exec(r);
        if (match) { // Iced
          OGPFight.aaIcedCurrent = match[1].replace(/,/g,'');
          if (OGPFight.aaIced == -1) OGPFight.aaIced = OGPFight.aaIcedCurrent-1;
        }
        
        // Check for deposit
        if (OGPFight.aaBank > 0) {
          var tamount = OGPString.getStatValue(r,'user_cash_nyc');
          if (tamount == '') tamount = OGPParser.getValueInJSONResults(r,'user_cash_nyc');
          var amount='';
          for (var i=0; i < tamount.length; i++)
            if (tamount.substr(i,1) >= '0' && tamount.substr(i,1) <='9') amount += tamount.substr(i,1);
          if (parseInt(amount) >= parseInt(OGPFight.aaBank)) {
            OGPDisplay.addLine('Depositing ' + tamount.replace('$',''),OGPConfig.clrAction);
            if (OGPConfig.currentCity != 5) {  // Don't deposit in Vegas - limit on vault
              var url = OGPConfig.MWURLAJAX + OGPConfig.urlDeposit + '&city=' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][7];
              url += '&xw_city=' + OGPConfig.currentCity + '&amount=' + amount;
              OGPAjax.buildAjax(url,'','');
            }
          }
        }
        
        if (r.indexOf('You Won!') > 0) {
          // Won the fight, update the counters and see if we can fight again
          // Check if it was a power attack
          if (r.indexOf('Win:') > 0) {
            OGPFight.aaFightWins += parseInt(r.substr(r.indexOf('Win:')+4));
            OGPFight.aaAttackCount += parseInt(r.substr(r.indexOf('Win:')+4));
          } else {
            OGPFight.aaFightWins++;
            OGPFight.aaAttackCount++;
          }
          OGPDisplay.setHTML('divAAFightWin','W: ' + OGPDisplay.setGoodColor(OGPFight.aaFightWins));
          OGPDisplay.setHTML('divAAFightLoss','L: ' + OGPDisplay.setBadColor(OGPFight.aaFightLosses));
          // Check for money
          var me = OGPParser.getFightMoney(r);
          if (parseInt(me[2]) > 0) {
            for (var i=0; i < OGPItems.cities.length;i++) {
              if (OGPItems.cities[i][6] == me[0]+me[1]) 
                OGPFight.totalmoney[i] += parseInt(me[2]);
            }
          }
          // Check for loot
          var tla = OGPParser.getFightLoot(r);
          if (tla.length > 0) {
            for (var i=0; i < tla.length; i++) {
              var lindex = -1;
              for (var j = 0; j < OGPFight.lootitems.length; j++) {
                if (OGPFight.lootitems[j][1]==tla[i][1]) 
                  lindex = j;
              }
              try {
                if (lindex == -1) {
                  OGPFight.lootitems[OGPFight.lootitems.length] = new Array(tla[i][0],tla[i][1]);
                } else {
                  OGPFight.lootitems[lindex][0] = '*' + (parseInt(OGPFight.lootitems[lindex][0]) + parseInt(tla[i][0]));
                }
              } catch(err) {}
            }
          }
          // Get current A/D
          OGPFight.attackStrengthCurrent = OGPParser.getADStats(r,'A');
          OGPFight.defenseStrengthCurrent = OGPParser.getADStats(r,'D');
          OGPFight.updateFightResults();

          if (OGPFight.aaIsPaused == true) {
            OGPDisplay.setHTML('divAAControl','<a onclick="OGPFight.aaIsPaused=false;OGPFight.autoAttack(4,0);">Resume</a>');
            return;
          }
          
          // Check stamina remaining
          if (OGPConfig.curExpNeeded-OGPConfig.curExp <= 150 && OGPFight.aaCity == 7 && OGPFight.aaStopForLevel==1) {
            OGPDisplay.setHTML('divAAStatus','Stopping for level up.');
            return;
          }
          if (OGPConfig.curExpNeeded-OGPConfig.curExp <= 25 && OGPFight.aaCity != 7 && OGPFight.aaStopForLevel==1) {
            OGPDisplay.setHTML('divAAStatus','Stopping for level up.');
            return;
          }
          if (OGPConfig.curStamina <= 0 || (OGPFight.aaCity == 7 && OGPConfig.curStamina < 5)) {
            if (OGPFight.aaRestart) {
              OGPDisplay.setHTML('divAAStatus','Waiting for more stamina...');
              setTimeout('OGPFight.autoAttack(4,0)',10000);
              return;
            } else {
              OGPDisplay.setHTML('divAAStatus','All Stamina Used...Stopping');
              return;
            }
          } 

          // Check health
          if (OGPConfig.curHealth < 25) {
            // Start over with the health check
            OGPFight.autoAttack(4,0);
            return;
          }
          
          if (r.indexOf('power_attack') > 0 && (parseInt(OGPFight.aaTimesToAttack) - parseInt(OGPFight.aaAttackCount) >= 5)) {
            // Power attack
            var s = r.indexOf('power_attack');
            while (r.substr(s,1) != '?') s--;
            var e = r.indexOf('"',s);
            var url = OGPConfig.MWROOTPATH + r.substr(s,e-s);
            OGPAjax.buildAjax(url,'OGPFight.autoAttack','9,%ix%');
          } else {
            // No longer alive or less than 5 fights left to be run, get a new target
            OGPConfig.curFightList[OGPFight.aaCurFightIndex][7] = 0;
            OGPFight.autoAttack(10,0);
          }
        } else if (r.indexOf('You Lost!') > 0) {
          OGPFight.aaFightLosses++;
          OGPFight.aaAttackCount++;
          OGPDisplay.setHTML('divAAFightWin','W: ' + OGPDisplay.setGoodColor(OGPFight.aaFightWins));
          OGPDisplay.setHTML('divAAFightLoss','L: ' + OGPDisplay.setBadColor(OGPFight.aaFightLosses));
          OGPConfig.curFightList[OGPFight.aaCurFightIndex][7] = 0;
          if (OGPConfig.currentCity != 7 && OGPConfig.curStamina > 0 && (OGPConfig.curExpNeeded-OGPConfig.curExp > 25 || OGPDrone.stopForLevel==0)) {
            // Find a new target
            OGPFight.autoAttack(10,0);
          } else if (OGPConfig.currentCity == 7 && OGPConfig.curStamina >= 5 && (OGPConfig.curExpNeeded-OGPConfig.curExp > 150 || OGPDrone.stopForLevel==0)) {
            OGPFight.autoAttack(10,0);
          } else {
            // All stamina gone, set the flag
            OGPDisplay.setHTML('divAAStatus','No Stamina remaining');
            OGPDisplay.setHTML('divAAControl','');
            return;
          }
          
        } else {
          // Bad response, start over
          OGPFight.autoAttack(4,0);
        }
        break;
        
      case 10:
        // See if we're done
        if (parseInt(OGPFight.aaAttackCount) >= parseInt(OGPFight.aaTimesToAttack)) {
          OGPDisplay.setHTML('divAAStatus','All fights completed');
          OGPDisplay.setHTML('divAAControl','');
          return;
        } 
        
        if (OGPFight.aaIsPaused == true) {
          OGPDisplay.setHTML('divAAControl','<a onclick="OGPFight.aaIsPaused=false;OGPFight.autoAttack(4,0);">Resume</a>');
          return;
        }
        
        // Check for someone on the fightlist to attack
        var i = OGPParser.getAttackTarget(OGPFight.aaMinLevel,OGPFight.aaMaxLevel,OGPFight.aaMinMafia,OGPFight.aaMaxMafia,OGPFight.aaIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          OGPDisplay.setHTML('divAAStatus','No matches on fight list, waiting 10 seconds');
          setTimeout('OGPFight.autoAttack(4,0)',10000);
          return; 
        }
        // Have someone to attack, try once
        OGPFight.aaCurFightIndex = i;
        OGPDisplay.setHTML('divAAStatus','Attacking ' + OGPConfig.curFightList[i][0] + '&nbsp;' + OGPConfig.curFightList[i][2] + ' - Level ' + OGPConfig.curFightList[i][3] + ' - Mafia Size ' + OGPConfig.curFightList[i][4]);
        var url = OGPConfig.MWROOTPATH + '?' + OGPConfig.urlAttack;
        url += '&xw_city=' + OGPConfig.curFightList[i][5];
        OGPAjax.buildAjax(url,'OGPFight.autoAttack','9,%ix%');
        break;

        
    }
  };

  this.updateFightResults = function() {
    OGPDisplay.setHTML('divAAFightsRun',OGPDisplay.setGoodColor(OGPFight.aaAttackCount + '/' + (OGPFight.aaTimesToAttack==99999999?'All':OGPFight.aaTimesToAttack)));
    var txt = '';
    for (var i=0; i < OGPItems.cities.length; i++) {
        txt += OGPItems.cities[i][6] + OGPFight.totalmoney[i] + '&nbsp;&nbsp;&nbsp;';
    }
    OGPDisplay.setHTML('divAATotalMoney',OGPDisplay.setGoodColor(txt));
    var txt = '';
    for (var i=0; i < OGPFight.lootitems.length; i++) {
      var t = OGPFight.lootitems[i][0].toString();  if (t==null)t='  ';
      if (t.substr(0,1)=='*') {
        t = t.substr(1);
        OGPFight.lootitems[i][0] = OGPFight.lootitems[i][0].toString().substr(1);
        txt += OGPFight.lootitems[i][1] + ' (<font style="color:#ffff00">x' + t + '</font>)';
      }
      else
        txt += OGPFight.lootitems[i][1] + ' (x' + OGPFight.lootitems[i][0] + ')';
      if (i < OGPFight.lootitems.length-1) txt += ' - ';
    }
    OGPDisplay.setHTML('divAALoot',OGPDisplay.setGoodColor(txt));
    OGPDisplay.setHTML('divAAExpNeeded',OGPDisplay.setGoodColor(OGPConfig.curExpNeeded-OGPConfig.curExp));
    OGPDisplay.setHTML('divAAStamLeft',OGPDisplay.setGoodColor(OGPConfig.curStamina));
    
    if (OGPFight.aaIced >= 0) {
      var dif = parseInt(OGPFight.aaIcedCurrent-OGPFight.aaIced);
      if (dif > 0)
        OGPDisplay.setHTML('divAAIced',OGPDisplay.setGoodColor(OGPFight.aaIcedCurrent + ' (+' + dif + ')'));
      else
        OGPDisplay.setHTML('divAAIced',OGPDisplay.setGoodColor(OGPFight.aaIcedCurrent));
    }
    var t = OGPDisplay.setGoodColor(OGPFight.attackStrengthCurrent);
    var dif = OGPFight.attackStrengthCurrent - OGPFight.attackStrength;
    if (dif < 0) t += '&nbsp;' + OGPDisplay.setBadColor('(' + dif + ')');
    if (dif > 0) t += '&nbsp;' + OGPDisplay.setGoodColor('(+' + dif + ')');
    OGPDisplay.setHTML('divAAAttack',t);
    var t = OGPDisplay.setGoodColor(OGPFight.defenseStrengthCurrent);
    var dif = OGPFight.defenseStrengthCurrent - OGPFight.defenseStrength;
    if (dif < 0) t += '&nbsp;' + OGPDisplay.setBadColor('(' + dif + ')');
    if (dif > 0) t += '&nbsp;' + OGPDisplay.setGoodColor('(+' + dif + ')');
    OGPDisplay.setHTML('divAADefense',t);
  };

  this.autoRobbing = function(step,index) {
  
    switch(step) {
      case 0:
        var txt = '';
        txt += '<table id="tblARSetup" name="tblARSetup">';
        txt += '<tr><th>Auto-Robbing</th></tr>';
        txt += '<tr>';
        txt += '<td>Robbing City:<br />';
        for (var i=0; i < OGPItems.cities.length; i++) {
          txt += '&nbsp;&nbsp;<input type="checkbox" name="ckRobCity' + OGPItems.cities[i][3] + '" id="ckRobCity' + OGPItems.cities[i][3] + '" onclick="OGPFight.setAutoRobCity(' + OGPItems.cities[i][3] + ');" ';
          if (parseInt(OGPItems.cities[i][3]) == parseInt(OGPConfig.currentCity)) txt += ' checked';
          txt += '> ' + OGPItems.cities[i][0] + '<br />';
        }
        txt += '</td>';
        txt += '</tr>';
        txt += '<tr><td>Robbing Delay (Seconds):<br />';
        txt += '<select name="selRDelay" id="selRDelay">';
        txt += '<option value="0">None</option>';
        txt += '<option value="100">0.10</option>';
        txt += '<option value="250">0.25</option>';
        txt += '<option value="500">0.50</option>';
        txt += '<option value="750">0.75</option>';
        txt += '<option value="1000" selected>1.00</option>';
        txt += '<option value="2000">2.00</option>';
        txt += '</select><br />';
        txt += 'This sets the delay for calls to rob each individual property on a robbing board.  Your account may be flagged and disabled if the value is set too low.  Use low numbers at your own risk.';
        txt += '</td></tr>';
        txt += '</table><br />';
        txt += '<div id="divARControl" name="divARControl"><a onclick="OGPFight.autoRobbing(1,0);">Start Robbing</a></div>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;
        
      case 1:
        for (var i=0; i < OGPItems.cities.length; i++) {
          if (e$('ckRobCity' + OGPItems.cities[i][3]).checked) {
            OGPFight.arRobCity = OGPItems.cities[i][3];
          }
        }
        OGPFight.arDelay = parseInt(e$('selRDelay').value);
        OGPDisplay.clearSetup();
        var txt = '';
        txt += '<table id="tblARResults">';
        txt += '<tr><th>Property</th><th>Difficulty</th><th>Cost</th><th>Mafia Size</th><th>Result</th></tr>';
        for (var i=0; i < 9; i++) {
          txt += '<tr><td><div name="divProp' + i + '" id="divProp' + i + '">&nbsp;</div></td>';
          txt += '<td><div name="divDiff' + i + '" id="divDiff' + i + '">&nbsp;</div></td>';
          txt += '<td><div name="divCost' + i + '" id="divCost' + i + '">&nbsp;</div></td>';
          txt += '<td><div name="divSize' + i + '" id="divSize' + i + '">&nbsp;</div></td>';
          txt += '<td><div name="divResult' + i + '" id="divResult' + i + '">&nbsp;</div></td>';
          txt += '</tr>';
        }
        txt += '<tr><td colspan="5"><div name="divARStatus" id="divARStatus"></div></td></tr>';
        txt += '<tr><td colspan="5"><div name="divARBonus" id="divARBonus">&nbsp;</div></td></tr>';
        txt += '</table>';
        txt += '<div name="divARControl" id="divARControl">---</div><br /><br />';
        OGPDisplay.setHTML('divOGPResults',txt);
        // Travel if needed
        OGPFight.arIsRunning = true;
        if (parseInt(OGPConfig.currentCity) != parseInt(OGPFight.arRobCity)){
          OGPDisplay.setHTML('divARStatus','Travelling');
          OGPTravel.goCity(OGPFight.arRobCity,"OGPFight.autoRobbing(2,0);");
        }
        else
          OGPFight.autoRobbing(2,0);
        break;    
  
      case 2:
        // In the right city, load the page
        OGPDisplay.setHTML('divARStatus','Loading Robbing Properties Page');
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlLoadRobbing;
        url += '&xw_city=' + OGPFight.arRobCity;
        OGPAjax.buildAjax(url,'OGPFight.autoRobbing','3,%ix%');
        break;
        
      case 3:
        if (OGPFight.arIsRunning == false) {
          OGPDisplay.setHTML('divARStatus','Stopping By User Request');
          OGPDisplay.setHTML('divARControl','');
          break;
        }
        OGPDisplay.setHTML('divARControl','<a onclick="OGPFight.arIsRunning=false;this.innerHTML=\'--Stopping--\';">Stop Robbing</a>');
        var r = OGPAjax.ajax[index].response;
        OGPTimers.updateStats(1,index);
        // Load the robbing array
        OGPDisplay.setHTML('divARStatus','Robbing Properties');
        OGPFight.arNoStamina = false;
        for (var i=0; i < 9; i++) {
          OGPFight.arRobSpots[i] = null;
          var s = r.indexOf('id="rob_slot_' + i);
          var e = r.indexOf('id="rob_slot_' + (i+1));
          if (e < 0) e = r.length;
          var tstr = r.substr(s,e-s);
          var diff = 'Easy';
          if (tstr.indexOf('rob_difficulty_medium') > 0) diff = "Medium";
          if (tstr.indexOf('rob_difficulty_hard') > 0) diff = "Hard";
          var prop = OGPParser.getValueInTags(tstr,'class="rob_prop_name"',1);
          if (prop.indexOf('<') >= 0) {
            var s = prop.indexOf('<');
            var e = prop.indexOf('>');
            if (s > 0)
              prop = prop.substr(0,s)+prop.substr(e+1);
            else
              prop = prop.substr(e+1);
          }
          var robbed = false;
          if (tstr.indexOf('rob_prop_img_robbed') > 0) robbed = true;
          if (tstr.indexOf('rob_prop_img_failed') > 0) robbed = true;
          var outcome = '';
          var cost = 0;
          var msize = 0;
          if (robbed == true) {
            if (tstr.indexOf('SUCCESS!') > 0) 
              outcome = 'Success';
            else
              outcome = 'Failed';
          } else {
            msize = OGPParser.getValueInTags(tstr,'title="Mafia Size"',0);
            cost = OGPParser.getValueInTags(tstr,'title="Stamina Used"',0);            
          }
          OGPFight.arRobSpots[i] = new Array(prop,diff,outcome,cost,msize);
        }
        OGPFight.updateRobbing();
        // Set the timeout in case it hangs
        OGPFight.arTimer = setTimeout("OGPFight.autoRobbing(2,0)",30000);
        
        var cs = OGPConfig.curStamina;
        var numrun = 0;
        var norun = 0;
        for (var i=0; i < 9; i++) {
          if (parseInt(OGPFight.arRobSpots[i][3]) <= cs && parseInt(OGPFight.arRobSpots[i][3]) != 0) {
            if (OGPFight.arRobSpots[i][2]=='') {
              cs -= parseInt(OGPFight.arRobSpots[i][3]);
              numrun++;
              var url = OGPConfig.MWURLAJAX + OGPConfig.urlRunRobbing;
              url += '&slot=' + i + '&xw_city=' + OGPFight.arRobCity;
              setTimeout("OGPAjax.buildAjax('" + url + "','OGPFight.autoRobbing','4,%ix%');",i*OGPFight.arDelay);
            } 
          } else {
            if (OGPFight.arRobSpots[i][2]=='') {
              OGPFight.arRobSpots[i][2]='Low Stamina';
              OGPFight.arNoStamina = true;
            }
          }
        }
        if (numrun == 0) {
          // Could be first time in with no properties
          var hasstam = false;
          var all0 = true;
          for (var i = 0; i < 9; i++) {
            if (parseInt(OGPConfig.curStamina) >= parseInt(OGPFight.arRobSpots[i][3]) && parseInt(OGPFight.arRobSpots[i][3]) > 0)
              hasstam = true;
            if (parseInt(OGPFight.arRobSpots[i][3]) > 0)
              all0 = false;
          }
          if (hasstam || all0) {
            // Get new properties\
            OGPDisplay.setHTML('divARStatus','Getting new properties');
            var url = OGPConfig.MWURLAJAX + OGPConfig.urlRobRefresh;
            url += '&xw_city=' + OGPFight.arRobCity;
            OGPAjax.buildAjax(url,'OGPFight.autoRobbing','2,%ix%');
            break;
          } else {
            OGPFight.arNoStamina = true;          
          }
        }
        if (OGPFight.arNoStamina == true) {
          OGPDisplay.setHTML('divARStatus','Out Of Stamina...Will continue when stamina is available');
          OGPDisplay.setHTML('divARControl','');
          OGPFight.updateRobbing();
          OGPFight.arTimer = setTimeout("OGPFight.autoRobbing(2,0)",120000);
        }
        break;
        
      case 4:
        try {
          var r = OGPAjax.ajax[index].response;
          if (r.indexOf('You cleared the full board and earned') > 0) {
            var s = r.indexOf('You cleared the full board');
            s = r.indexOf('>',s);
            while (r.substr(s,1) < '0' || r.substr(s,1) > '9') s++;
            var e = s;
            while (r.substr(e,1) >= '0' && r.substr(e,1) <= '9') e++;
            e$('divARBonus').innerHTML = 'Last board clearing bonus: ' + r.substr(s,e-s) +' Experience';
          }
          var s = r.indexOf('openSlot(');
          var slot = parseInt(r.substr(s+9));
          var res = OGPParser.getValueInTags(r,'"rob_res_outcome ',0);
          OGPFight.arRobSpots[slot][2] = res;
          OGPFight.updateRobbing();
        } catch(err) {
          // Didn't get this one, count it and let the page refresh and try it again
          //OGPFight.arRobSpots[slot][2] = 'Retrying';
        }
        // If all spots are done, get new targets
        var done = true;
        for (var i=0; i < 9; i++)
          if (OGPFight.arRobSpots[i][2] == '')
            done = false;
        if (done && !OGPFight.arNoStamina) {
          // Clear the hang timer
          if (OGPFight.arTimer) clearTimeout(OGPFight.arTimer);
          for (var i = 0; i < 9; i++) OGPFight.arRobSpots[i][2]='';
          // Get new properties
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlRobRefresh;
          url += '&xw_city=' + OGPFight.arRobCity;
          OGPAjax.buildAjax(url,'OGPFight.autoRobbing','2,%ix%');
        }
        break;
        
    }
  };

  this.CTRobMax = 0;
  this.CTLoot = new Array();
  this.CTIsRobbing = false;
  this.CTcurPresents = 0;
  this.CTmaxPresents = 0;
  this.CTSuccess = 0;
  this.CTFailed = 0;
  
  this.RParray = new Array();
  this.RPMaxRob = 0;
  this.RPMaxStam = 0;
  this.RPRobCounter =0;
  this.RPCurRob = 0;
  this.RPWin = 0;
  this.RPLoss = 0;
  this.RPStamUsed = 0;
  this.RPLoot = new Array();
  this.RPCurProp = 0;
  this.isRobbingPersonal = false;
  
  this.robPersonal = function(step,index) {
    switch(step) {
      case 0:
        OGPFight.RParray.length = 0;
        var txt = '';
        txt += '<table id="tblDrone" name="tblDrone" align="center">';
        txt += '<tr><td colspan="' + OGPItems.cities.length + '">Select Properties To Rob</td></tr>';
        txt += '<tr>';
        for (var i=0; i < OGPItems.cities.length; i++) {
          txt += '<td>' + OGPItems.cities[i][0] + '</td>';
        }
        txt += '</tr>';
        txt += '<tr>';
        for (var i=0; i < OGPItems.cities.length; i++) {
          txt += '<td valign="top">';
          for (var j=0; j < OGPItems.robProperties.length; j++) {
            if (OGPItems.robProperties[j][0] == OGPItems.cities[i][3]) {
              txt += '<input type="checkbox" name="ckrob' + j + '" id="ckrob' + j + '"> ' + OGPItems.robProperties[j][2] + '<br>';
            }
          }
        }
        txt += '</tr>';
        txt += '<tr><td>Options:</td><td colspan="' + (parseInt(OGPItems.cities.length)-1) + '">';
        txt += 'Max robs per property: <select id="selMaxRob" name="selMaxRob">';
        txt += '<option value="99999">No Max</option>';
        for (var i=1;i<=50;i++) 
          txt += '<option value="' + i + '">' + i + '</option>';
        txt += '</select>&nbsp;&nbsp;&nbsp;Max stamina to spend: <select id="selMaxStam" name="selMaxStam">';
        txt += '<option value="999999999">All</option>';
        var t = OGPConfig.curStamina;
        var ta = new Array();
        while (t > 2000) {var v = parseInt(t/1000) * 1000;ta[ta.length] = v;t-=1000;}
        while (t > 600) {var v = parseInt(t/100) * 100;ta[ta.length] = v;t-=100;}
        while (t > 50) {var v=parseInt(t/50) * 50;ta[ta.length] = v;t-=50;}
        for (var i=t; i > 25; i-=10) ta[ta.length] = i;
        for (var i=ta.length-1;i>=0;i--)
          txt += '<option value="' + ta[i] + '">' + ta[i] + '</option>';
        txt += '</select>';
        txt += '</td></tr>';
        txt += '<tr><td colspan="' + OGPItems.cities.length + '" style="text-align:center"><a onclick="OGPFight.robPersonal(1,0);">Start Robbing</a></td></tr>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;
        
      case 1:
        // Make sure a box is checked
        for (var i=0; i < OGPItems.robProperties.length; i++) {
          if (e$('ckrob' + i)) {
            if (e$('ckrob' + i).checked == true) {
              OGPFight.RParray[OGPFight.RParray.length] = OGPItems.robProperties[i];
            }
          }
        }
        if (OGPFight.RParray.length == 0) {
          OGPDisplay.addLine('You must select at least one property to rob',OGPConfig.clrWarning);
          return;
        }
        // Sort the properties by city
        for (var i=0; i < OGPFight.RParray.length-1; i++) {
          for (var j=i+1; j < OGPFight.RParray.length; j++) {
            if (OGPFight.RParray[i][0] > OGPFight.RParray[j][0]) {
              var t = OGPFight.RParray[i]; OGPFight.RParray[i]=OGPFight.RParray[j];OGPFight.RParray[j]=t;
            }
          }
        }
        OGPFight.RPMaxRob = e$('selMaxRob').value;
        OGPFight.RPMaxStam = e$('selMaxStam').value;
        OGPFight.RPWin = 0;
        OGPFight.RPLoss = 0;
        OGPFight.RPStamUsed = 0;
        OGPFight.RPLoot.length = 0;
        OGPFight.RPcurProp = 0;
        OGPFight.RPcurRob = 0;
        
        var txt = '<table id="tblDrone" name="tblDrone" style="width:550px;">';
        txt += '<tr><td>Status:</td><td colspan="5"><div id="divRPStatus" name="divRPStatus"></div></td></tr>';
        txt += '<tr><td colspan="6">Robbing: ';
        for (var i=0; i < OGPFight.RParray.length; i++) {
          if (i > 0 ) txt += ', ';
          txt += OGPFight.RParray[i][2];
        }
        txt += '</td></tr>';
        txt += '<tr><td style="width:16%;">Stamina Used:</td><td style="width:16%;"><div id="divRPStamUsed"></div></td>';
        txt += '<td style="width:16%;">Wins:</td><td style="width:16%;"><div id="divRPWin" name="divRPWin"></div></td>';
        txt += '<td style="width:16%;">Losses:</td><td><div id="divRPLoss" name="divRPLoss"></div></td>';
        txt += '</tr>';
        //txt += '<tr><td colspan="6"><div id="divRPLoot" name="divRPLoot">Loot:</div></td></tr>';
        txt += '</table>';
        txt += '<div style="text-align:center" id="divRPControl" name="divRPControl"></div>';
        OGPDisplay.clearSetup();
        OGPDisplay.setHTML('divOGPResults',txt);
        setTimeout("OGPFight.robPersonal(2,0)",200);
        break;
        
      case 2:
        OGPDisplay.setHTML('divRPStatus','Loading current fight list to find targets');
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlFightList;
        OGPAjax.buildAjax(url,'OGPFight.robPersonal','3,%ix%');
        break; 
      
      case 3:
        var r = OGPAjax.ajax[index].response;
        OGPParser.getFightList(r);
        if (OGPConfig.curFightList.length==0) {
          OGPDisplay.setHTML('divRPStatus','No one on the fight list, waiting 10 seconds');
          setTimeout('OGPFight.robPersonal(2,0)',10000);
          return;
        }
        OGPFight.RPcurRob = 0;
        OGPDisplay.setHTML('divRPControl','<a onclick="OGPFight.robPersonal(99,0);">Stop Robbing</a>');
        OGPFight.isRobbingPersonal=true;
        OGPFight.robPersonal(4,0);
        break;
        
      case 4:
        // Title, UserID, Name, Level, Mafia, tmpkey, iced, available
        OGPDisplay.setHTML('divRPStatus','Checking properties for ' + OGPConfig.curFightList[OGPFight.RPcurRob][2]);
        OGPFight.RPRobCounter=0;
        if (OGPConfig.currentCity != OGPFight.RParray[OGPFight.RPcurProp][0]) {
          OGPTravel.goCity(OGPFight.RParray[OGPFight.RPcurProp][0],'OGPFight.robPersonal(5,0)');
        } else {
          setTimeout('OGPFight.robPersonal(5,0)',100);
        }
        break;
        
      case 5:
        if (!e$('tblDrone')) OGPFight.isRobbingPerson = false;
        if (!OGPFight.isRobbingPersonal) return;
        // In the right city, load the robbing page for this user
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlRobPersonal;
        url += '&target=' + OGPConfig.curFightList[OGPFight.RPcurRob][1];
        OGPAjax.buildAjax(url,'OGPFight.robPersonal','6,%ix%');
        break;
        
      case 6:
        var r = OGPAjax.ajax[index].response;
        //e$('divOGPDebug').innerHTML = r;
        var e = r.indexOf('rob_prop=' + OGPFight.RParray[OGPFight.RPcurProp][1]);
        var s = e;
        if (s < 0) {
          // Property not listed or police tape - Go to the next property
          OGPFight.robPersonal(7,0);
        } else {
          while (r.substr(s,8) != 'rob_slot') s--;
          var st = r.indexOf('Stamina Used',s);
          st = parseInt(r.substr(st+14));
          if (r.substr(s,e-s).indexOf('zy_progress_bar') > 0) {
            var s = r.substr(s,e-s).indexOf('rob_slot_');
            var slot = parseInt(r.substr(s+9));
            // Rob them
            OGPDisplay.setHTML('divRPStatus','Robbing the ' + OGPFight.RParray[OGPFight.RPcurProp][2] + ' from ' + OGPConfig.curFightList[OGPFight.RPcurRob][2]);
            var url = OGPConfig.MWURLAJAX + OGPConfig.urlRobProperty;
            url += '&rob_user=' + OGPConfig.curFightList[OGPFight.RPcurRob][1];
            url += '&rob_prop=' + OGPFight.RParray[OGPFight.RPcurProp][1];
            url += '&rob_city=' + OGPConfig.currentCity;
            url += '&slot=' + slot;
            OGPFight.RPStamUsed+=st;
            OGPAjax.buildAjax(url,'OGPFight.robPersonal','8,%ix%');
          } else {
            // Listed but not robbable
            OGPFight.robPersonal(7,0);
          }
        }
        break;

      case 7:
        if (!e$('tblDrone')) OGPFight.isRobbingPersonal = false;
        if (!OGPFight.isRobbingPersonal) return;
        OGPFight.RPcurProp++;
        if (OGPFight.RPcurProp < OGPFight.RParray.length) {
          setTimeout('OGPFight.robPersonal(4,0);',100);
        } else {
          OGPFight.RPcurProp = 0;
          OGPFight.RPcurRob++;
          if (OGPFight.RPcurRob < OGPConfig.curFightList.length) {
            setTimeout('OGPFight.robPersonal(4,0);',100);
          } else {
            setTimeout('OGPFight.robPersonal(2,0);',100);
          }
        }
        break;
              
      case 8:
        var r = OGPAjax.ajax[index].response;
        var s = r.indexOf('user_stamina');
        if (s > 0) {
          OGPConfig.curStamina = parseInt(r.substr(s+14));
        }
        OGPDisplay.setHTML('divOGPStamina',OGPConfig.curStamina);
        // Check for low stamina
        if (r.indexOf('do not have enough stamina') > 0) {
          OGPDisplay.setHTML('divRPControl','Out of stamina...stopping');
          OGPFight.isRobbingPersonal=false;
          return;
        }
        OGPFight.RPRobCounter++;
        var won = false;
        if (r.indexOf('SUCCESS!') > 0) {
          OGPFight.RPWin++;
          won = true;
        } else {
          OGPFight.RPLoss++;
        }
        OGPDisplay.setHTML('divRPWin',OGPFight.RPWin);
        OGPDisplay.setHTML('divRPLoss',OGPFight.RPLoss);
        OGPDisplay.setHTML('divRPStamUsed',OGPFight.RPStamUsed);
        if (OGPFight.RPStamUsed > OGPFight.RPMaxStam) {
          OGPDisplay.setHTML('divRPControl','Selected Max Stamina Used');
          OGPFight.isRobbingPersonal = false;
          return;
        }
        if (parseInt(OGPConfig.curStamina) < 25) {
          OGPDisplay.setHTML('divRPControl','Less Than 25 Stamina Remaining...Stopping');
          OGPFight.isRobbingPersonal = false;
          return;
        }
        if (OGPFight.RPRobCounter == OGPFight.RPMaxRob) {
          // Max hits on this property, move on win or lose
          OGPFight.robPersonal(7,0);
        } else {
          if (won) {
            setTimeout('OGPFight.robPersonal(5,0);',250);
          } else {
            // Lost, don't try to rob this user again
            OGPFight.RPcurProp = OGPFight.RParray.length;
            OGPFight.robPersonal(7,0);
          }
        }
        break;
        
      case 99:
        OGPFight.isRobbingPersonal = false;
        OGPDisplay.setHTML('divRPControl','Stopped');
        break;
    }
  };
  
  this.robPresents = function(step,index) {
    switch(step) {
      case 0:
        var txt = '';
        txt += '<table align="center" style="width:450px;"><tr><td>';
        txt += 'This function will rob Christmas Trees only on the robbing board and then spend 8 stamina to refresh the board.  It will automatically quit if the max presents have been reached.';
        txt += '<br><br>';
        txt += 'You currently have ' + OGPConfig.curStamina + ' stamina, which will allow ' + parseInt(OGPConfig.curStamina/14) + ' Christmas Trees to be robbed.<br><br>';
        txt += 'How many times to rob? <select id="selRobTree" name= "selRobTree">';
        txt += '<option value="' + parseInt(OGPConfig.curStamina/14) + '">' + parseInt(OGPConfig.curStamina/13) + '</option>';
        txt += '<option value="0">-----</option>';
        for (var i=1; i < parseInt(OGPConfig.curStamina/14); i++)
          txt += '<option value="' + i + '">' + i + '</option>';
        txt += '</select>';
        if (OGPConfig.curStamina >= 14)
          txt += '<br><br><a onclick="OGPFight.robPresents(1,0);">Click Here to begin robbing</a></td></tr></table>';
        else
          txt += '<br><br>You do not have enough stamina to rob a Christmas Tree!';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;
        
      case 1:
        OGPFight.CTRobMax = e$('selRobTree').value;
        OGPDisplay.setHTML('divOGPSetup','Checking for how many presents you have');
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlChristmas;
        OGPAjax.buildAjax(url,'OGPFight.robPresents','2,%ix%');
        break;
        
      case 2:
        var r = OGPAjax.ajax[index].response;
        var regex = /([0-9]+)\/([0-9]+)/;
        var match = regex.exec(r);
        OGPFight.CTcurPresents = parseInt(match[1]);
        OGPFight.CTmaxPresents = parseInt(match[2]);
        if (OGPFight.CTcurPresents == OGPFight.CTmaxPresents) {
          OGPDisplay.setHTML('divOGPSetup','You are already at max presents, no need to rob');
          return;
        }
        OGPFight.robPresents(3,0);
        break;
      
      case 3:
        OGPDisplay.setHTML('divOGPSetup','');
        var txt = '<table id="tblARResults" name="tblARResults" style"width:450px;">';
        txt += '<tr><td style="width:150px;">Robbed:</td><td><div style="text-align:left;" id="divRobCount" name="divRobCount"></div></td></tr>';
        txt += '<tr><td style="width:150px;">Presents:</td><td><div style="text-align:left;" id="divPresentCount" name="divPresentCount"></div></td></tr>';
        txt += '<tr><td style="width:150px;">Successful Robberies:</td><td><div style="text-align:left;" id="divSuccessCount" name="divSuccessCount"></div></td></tr>';
        txt += '<tr><td style="width:150px;">Failed Robberies:</td><td><div style="text-align:left;" id="divFailedCount" name="divFailedCount"></div></td></tr>';
        txt += '<tr><td valign="top">Loot Gathered:</td><td><div style="text-align:left;" id="divRobLoot" name="divRobLoot"></div></td></tr>';
        txt += '</table>';
        txt += '<div align="center" id="divRobControl" name="divRobControl"></div>';
        OGPDisplay.setHTML('divOGPResults',txt);
        OGPFight.CTIsRobbing = true;
        OGPFight.CTSuccess = 0;
        OGPFight.CTFailed = 0;
        OGPFight.CTCurRob = 0;
        OGPFight.CTLoot.length = 0;
        OGPFight.robPresents(4,0);
        OGPDisplay.setHTML('divRobControl','<a onclick="OGPFight.CTIsRobbing=false;OGPDispaly.setHTML(\'divRobControl\',\'Stopping...\');">Stop Robbing</a>');
        break;
        
      case 4:
        if (OGPFight.CTIsRobbing == false) {
          OGPDisplay.setHTML('divRobControl','Stopped robbing by user selection');
          return;
        }
        OGPDisplay.setHTML('divRobCount',OGPFight.CTCurRob + '/' + OGPFight.CTRobMax);
        OGPDisplay.setHTML('divPresentCount',OGPFight.CTcurPresents + '/' + OGPFight.CTmaxPresents);
        OGPDisplay.setHTML('divSuccessCount',OGPFight.CTSuccess);
        OGPDisplay.setHTML('divFailedCount',OGPFight.CTFailed);
        if (OGPFight.CTCurRob >= OGPFight.CTRobMax) {
          OGPDisplay.setHTML('divRobControl','All robbing complete');
          return;
        }
        if (OGPFight.CTcurPresents == OGPFight.CTmaxPresents) {
          OGPDisplay.setHTML('divRobControl','Max presents reached...stopping');
          return;
        }
        if (OGPConfig.curStamina < 6) {
          OGPDisplay.setHTML('divRobControl','Out of Stamina...stopping');
          return;
        }
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlLoadRobbing;
        OGPAjax.buildAjax(url,'OGPFight.robPresents','5,%ix%');
        break;
        
      case 5:
        // Robbing board loaded, check for Christmas tree
        var r = OGPAjax.ajax[index].response;
        OGPParser.getStatsFromPage(r);
        var s = r.indexOf('Christmas Tree');
        if (s > 0) {
          while (r.substr(s,9) != 'rob_slot_' && s > 0) s--;
          var slot = parseInt(r.substr(s+9));
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlRunRobbing;
          url += '&slot=' + slot + '&xw_city=' + OGPConfig.currentCity;
          OGPAjax.buildAjax(url,'OGPFight.robPresents','6,%ix%');
        } else {
          // No Christmas tree, must be over
          OGPDisplay.setHTML('divOGPResults','No Christmas Tree found, promotion must be over');
          return;
        }
        break;
        
      case 6:
        var r = OGPAjax.ajax[index].response;
        if (r.indexOf('Sorry, please try again later') > 0) {
          // Already robbed, get new
          OGPFight.robPresents(7,0);
        } else if (r.indexOf('Failed') > 0 ) {
          OGPFight.CTCurRob++;
          OGPFight.CTFailed++;
        } else if (r.indexOf('Success') > 0 ) {
          OGPFight.CTCurRob++;
          OGPFight.CTSuccess++;
          var regex = /You gained:.+title=."([a-zA-Z0-9\s]+)/;
          var match = regex.exec(r);
          if (match)
            if (match[1].indexOf('Present') > 0) OGPFight.CTcurPresents++;
          var am = -1;
          for (var i=0; i < OGPFight.CTLoot.length; i++) {
            if (OGPFight.CTLoot[i][0] == match[1])
              am = i;
          }
          if (am == -1) {
            OGPFight.CTLoot[OGPFight.CTLoot.length] = new Array(match[1],1);
          } else {
            OGPFight.CTLoot[am][1]++;
          }
          var txt = '';
          for (var i=0; i < OGPFight.CTLoot.length; i++)
            txt += OGPFight.CTLoot[i][0] + ' (x' + OGPFight.CTLoot[i][1] + ')<br>';
          OGPDisplay.setHTML('divRobLoot',txt);
        } else {
          // Something else
        }
        if (OGPFight.CTCurRob < OGPFight.CTRobMax) {
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlRobRefresh;
          OGPAjax.buildAjax(url,'OGPFight.robPresents','4,%ix%');
        } else {
          OGPFight.robPresents(4,0);
        }
        break;
    }
  };
  
  this.updateRobbing = function() {
    for (var i=0; i < 9; i++) {
      if (OGPFight.arRobSpots[i] != null) {
        OGPDisplay.setHTML('divProp' + i,OGPFight.arRobSpots[i][0]);
        OGPDisplay.setHTML('divDiff' + i,OGPFight.arRobSpots[i][1]);
        OGPDisplay.setHTML('divResult' + i,OGPFight.arRobSpots[i][2]);
        OGPDisplay.setHTML('divCost' + i,OGPFight.arRobSpots[i][3]);
        OGPDisplay.setHTML('divSize' + i,OGPFight.arRobSpots[i][4]);
      }
    }
  };
  this.setAutoRobCity = function(city) {
    for (var i=0; i < OGPItems.cities.length; i++)
      if (city != OGPItems.cities[i][3])
        e$('ckRobCity' + OGPItems.cities[i][3]).checked = false;
  };

  this.quickAttackReset = function() {
    OGPFight.qkFightCount = 0;
    OGPFight.qkFightsToDo = 0;
    OGPFight.qkSuccess = 0;
    OGPFight.qkFail = 0;
    OGPFight.qkNothing = 0;
    OGPFight.qkWeak = false;
    this.fighttempkey = null;
  };  

  this.quickAttack = function(step,index,qty) {
    switch(step) {
      case 0:
        OGPFight.quickAttackReset();
        OGPFight.qkFightsToDo = qty;
        if (!OGPParser.getTargetUser()) {
          OGPDisplay.addLine('This function must be run from a user\'s profile page',OGPConfig.clrWarning);
          break;
        }
        // Get the fight key
        OGPFight.fighttmpkey = OGPParser.setTempKey(document.body.innerHTML,'fight');
        if (!OGPFight.fighttmpkey) {
          OGPDisplay.addLine('Could not locate temporary key, please reload user profile and try again',OGPConfig.clrWarning);
          break;
        }
        var txt = '';
        txt += '<table id="tblQuickAttack" name="tblQuickAttack">';
        txt += '<tr><th>Fights Run</th><th>Win</th><th>Lose</th><th>Bad Response</th></tr>';
        txt += '<tr><td><div id="divQAttackRun" name="divQAttackRun">0</div></td>';
        txt += '<td><div id="divQAttackSuccess" name="divQAttackSuccess">0</div></td>';
        txt += '<td><div id="divQAttackFail" name="divQAttackFail">0</div></td>';
        txt += '<td><div id="divQAttackBad" name="divQAttackBad">0</div></td>';
        txt += '</tr>';
        txt += '<tr><td colspan="4"><div id="divQStatus" name="divQStatus"></td></tr>';
        txt += '</tr></table>';
        OGPDisplay.setHTML('divOGPResults',txt);

        OGPDisplay.setHTML('divQStatus',OGPFight.beatdowns[parseInt(OGPFight.beatdowns.length * Math.random())] + '...');
        // Now start blasting them
        var sendcount = 0;
        while (sendcount < qty && !OGPFight.qkWeak) {
          setTimeout("OGPFight.quickAttack(1,0,0)",sendcount * 250);
          sendcount++;
        }
        break;
      
      case 1:  
        // Build the fight url and start it
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlAttack;
        url += '&xw_city=' + OGPConfig.currentCity;
        url += '&opponent_id=' + OGPParser.getTargetUser() + '&tmp=' + OGPFight.fighttmpkey;
        if (!OGPFight.qkWeak)
          setTimeout("OGPAjax.buildAjax('" + url + "','OGPFight.quickAttack','2,%ix%," + i + "')",i*200);
        else  
          OGPDisplay.setHTML('divQStatus','Health low, stopping after current fights complete');
        break;

      case 2:
        // Fight done, parse
        if (OGPAjax.ajax[index]) {
          var r = OGPAjax.ajax[index].response;
          //e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>' + r;
          OGPFight.qkFightCount = parseInt(OGPFight.qkFightCount) + 1;
          OGPDisplay.setHTML('divQAttackRun',OGPFight.qkFightCount);
          if (r.indexOf('You win') > 0) {
            OGPFight.qkSuccess = parseInt(OGPFight.qkSuccess) + 1;
            OGPDisplay.setHTML('divQAttackSuccess',OGPFight.qkSuccess);
          } else if (r.indexOf('You lose') > 0) {
            OGPFight.qkFail = parseInt(OGPFight.qkFail) + 1;
            OGPDisplay.setHTML('divQAttackFail',OGPFight.qkFail);
          } else if (r.indexOf('You do not have enough health to keep fighting') > 0) {
            if (!OGPFight.qkWeak) OGPDisplay.addLine('Not enough health to continue fighting.',OGPConfig.clrWarning);
            OGPFight.qkWeak = true;
          } else {
            // Something unexplained came back
            OGPFight.qkNothing = parseInt(OGPFight.qkNothing) + 1;
            OGPDisplay.setHTML('divQAttackBad',OGPFight.qkNothing);
          }
        } else {
          OGPFight.qkNothing = OGPFight.qkNothing + 1;
          OGPDisplay.setHTML('divQAttackBad',OGPFight.qkNothing);
        }
        if (parseInt(OGPFight.qkFightCount)+parseInt(OGPFight.qkNothing) == parseInt(OGPFight.qkFightsToDo))
          OGPDisplay.setHTML('divQStatus','Finished');
        break;
    }
  };
};

/***************************************
  Single job runner
****************************************/
function ogpJobDef() {

  this.jobToRun;
  this.qtyToRun;
  this.curJobTab;
  this.isRunning;
  this.isPaused;
  this.lootitems = new Array();
  this.totalmoney = new Array();
  this.extramoney;
  this.extraexp;
  this.extraexpcount;
  this.freejobs;
  this.jobsrun;
  this.specialcontroller; // Fix for new job layout

  this.reset = function() {
    this.jobToRun = -1;
    this.qtyToRun = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.lootitems.length = 0;
    this.freejobs = 0;
    this.extramoney = 0;
    this.extraexp = 0;
    this.extraexpcount = 0;
    this.jobsrun = 0;
    this.curJobTab = -1;
    this.specialcontroller = '';
    for (var i=0; i < OGPItems.cities.length; i++) 
      this.totalmoney[i] = 0;

  };

  this.runJobs = function(step,index) {

    switch(step) {

      case 0: // Initial setup
        OGPJob.reset();
        var txt = '';
        txt += '<table name="tblRunJobSetup" id="tblRunJobSetup">';
        txt += '<tr><th colspan="' + OGPItems.cities.length + '"><div name="divRunJobParams" id="divRunJobParams">Select quantity and job to run</div></th></tr>';
        txt += '<tr><td colspan="' + OGPItems.cities.length + '" name="tdQuantity" id="tdQuantity">';
        txt += 'Quantity to run: <select name="selJobQty" id="selJobQty" onchange="OGPJob.setQty()">';
        txt += '<option value="999999">All Energy</option>';
        for (var i=1; i < 100; i++) {txt += '<option value="' + i + '">' + i + '</option>';}        
        for (var i=100; i < 250; i+=25) {txt += '<option value="' + i + '">' + i + '</option>';}        
        for (var i=250; i < 500; i+=50) {txt += '<option value="' + i + '">' + i + '</option>';}        
        for (var i=500; i <= 2000; i+=100) {txt += '<option value="' + i + '">' + i + '</option>';}
        txt += '</select>'; 
        txt += '</td></tr>';
        txt += '<tr name="trJobTabs" id="trJobTabs">';
        for (var i=0; i < OGPItems.cities.length; i++) {
          txt += '<td id="tdJobTab' + i + '" name="tdJobTab' + i + '" onclick="OGPJob.showTab(' + i + ');">' + OGPItems.cities[i][0] + '</td>';
        }
        txt += '</tr>';
        txt += '<tr><td colspan="' + OGPItems.cities.length + '" id="tdCityJobs" name="tdCityJobs">';
        for (var i=0; i < OGPItems.cities.length; i++) {
          txt += '<div id="divCityJobs' + i + '" name="divCityJobs' + i + '" style="display:none;">';
          txt += '<table>';
          var curcol = 0;
          for (var j=1; j < OGPItems.jobLevels[i].length; j++) {
            if (curcol == 0) txt += '<tr>';
            txt += '<td>';
            txt += '<div>'+ OGPItems.jobLevels[i][j] + '</div>';
            for (var k=0; k < OGPItems.jobs.length; k++) {
              if (OGPItems.jobs[k][0]==OGPItems.cities[i][8] && OGPItems.jobs[k][1]==j) {
                if (parseInt(OGPItems.jobs[k][6]) != 0 && parseInt(OGPItems.jobs[k][7]) != 0) {
                  txt += '<a onclick="OGPJob.setJob(' + k + ');">' + OGPItems.jobs[k][3] + '</a>';
                  if (OGPItems.jobs[k][4]!='') {
                    if (OGPItems.jobs[k][5] == true) {
                      txt += '<br />&nbsp;&nbsp;<font style="color:' + OGPConfig.clrHighlight + '"> *HEL - ' + OGPItems.jobs[k][4] + '</font>';
                    } else {
                      txt += '<br />&nbsp;&nbsp;<font style="color:' + OGPConfig.clrInfo + '"> Loot - ' + OGPItems.jobs[k][4] + '</font>';
                    }
                  }
                  txt += '<br />';
                }
              }
            }
            txt += '</td>';
            curcol++;
            if (curcol == 3) {
              txt += '</tr>';
              curcol = 0;
            }
          } 
          txt == '</tr>';
          txt += '</table>';
          txt += '</div>';
        }
        txt += '</td>';
        txt += '</tr>';
        txt += '</table>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        OGPJob.showTab(0);
        break;

      case 1: // Start running the jobs
        OGPDisplay.clearSetup();
        var txt = '';
        txt += '<table id="tblJobResults" name="tblJobResults">';
        txt += '<tr><th colspan="2">Run Multiple Jobs</th></tr>';
        txt += '<tr><td style="width:50%"><div>Exp Needed: </div><div id="divExpNeeded" name="divExpNeeded"></div></td>';
        txt += '<td style="width:50%"><div>Jobs Run: </div><div id="divJobsRun" name="divJobsRun"></div></td>';
        txt += '</tr>';
        txt += '<tr><td><div>Eng Remaining: </div><div id="divEngLeft" name="divEngLeft"></div></td>';
        txt += '<td><div>Free Jobs: </div><div id="divFreeJobs" name="divFreeJobs"></div></td>';
        txt += '</tr>';
        txt += '<tr><td><div>Cur Ratio: </div><div id="divCurRatio" name="divCurRatio"></div></td>';
        txt += '<td><div>Extra Exp: </div><div id="divExtraExp" name="divExtraExp"></div></td>';
        txt += '</tr>';
        txt += '<tr>';
        txt += '<td><div>Extra Money: </div><div id="divExtraMoney" name="divExtraMoney"></div></td>';
        txt += '<td></td>';
        txt += '</tr>';
        txt += '<tr><td colspan="2"><div>Total Money: </div><div id="divTotalMoney" name="divTotalMoney"></div></td></tr>';
        txt += '<tr><td colspan="2"><div>Loot Items: </div><div id="divLoot" name="divLoot"></div></td></tr>';
        txt += '<tr><td colspan="2"><div style="text-align:center;" id="divJobStatus" name="divJobStatus"></div></td></tr>';
        txt += '</table>';
        txt += '<div id="divJobControl" name="divJobControl"></div>';
        OGPDisplay.setHTML('divOGPResults',txt);        
        OGPJob.updateJobResults();
        OGPDisplay.setHTML('divJobStatus','Running');
        OGPDisplay.setHTML('divJobControl','<a onclick="javascript:OGPJob.pause();">Pause</a>');
        OGPJob.isRunning = true;
        OGPJob.isPaused = false;
        OGPJob.runJobs(2,-1);
        break;

      case 2: // Main Loop
        if (OGPConfig.Session==1 && OGPJob.isRunning && !OGPJob.isPaused) {
          if (OGPConfig.currentCity != (parseInt(OGPItems.jobs[OGPJob.jobToRun][0])+1)) {
            // Wrong city, travel
            OGPTravel.goCity((parseInt(OGPItems.jobs[OGPJob.jobToRun][0])+1),'OGPJob.runJobs(2,0)');
            break;
          }
  
          // In the right city, select the job tab
          if (OGPJob.curJobTab != OGPItems.jobs[OGPJob.jobToRun][1]) {
            var url = OGPConfig.MWURLAJAX + OGPConfig.urlSwitchJobTab;
            url += '&xw_city=' + OGPConfig.currentCity;
            url += '&xw_controller=' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2];
            url += '&' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][5] + '=' + OGPItems.jobs[OGPJob.jobToRun][1];
            url += '&tmp=' + OGPConfig.tmpkey;
            OGPAjax.buildAjax(url,'OGPJob.runJobs','2,%ix%');
            OGPJob.curJobTab = OGPItems.jobs[OGPJob.jobToRun][1];
            break;
          }
  
          // Right city and right tab, run the job
          if (index != -1) {
            OGPJob.jobtmpkey = OGPParser.setTempKey(OGPAjax.ajax[index].response,'job');
          } 
          var url  = OGPConfig.MWURLAJAX + OGPConfig.urlRunJob;
          //url += '&xw_controller=' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2];
          url += '&xw_controller=' + OGPJob.specialcontroller;
          if (OGPJob.specialcontroller != OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2])
            url += '&no_load=1';
          url += '&xw_city=' + OGPConfig.currentCity;
          url += '&' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][5] + '=' + OGPItems.jobs[OGPJob.jobToRun][1]; 
          url += '&job=' + OGPItems.jobs[OGPJob.jobToRun][2];
          url += '&tmp=' + OGPJob.jobtmpkey;
          if (OGPConfig.currentCity == 7) {
            url += '&clkdiv=btn_dojob_' + OGPItems.jobs[OGPJob.jobToRun][2];
          }
          OGPDisplay.setHTML('divJobStatus','Running Job');
          OGPAjax.buildAjax(url,'OGPJob.runJobs','3,%ix%');
        }
        break;
              
      case 3: // Job ran, parse results
        if (OGPAjax.ajax[index]) {
          var r = OGPAjax.ajax[index].response;
          //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>';
          OGPParser.parseJobResults(r);
          if (r.indexOf('class="messages"') > 0) r = r.substr(r.indexOf('class="messages"'));
          OGPTimers.updateStats(1,index);
          if (res['jobResults'] == 'Completed') {
            OGPJob.jobtmpkey = OGPParser.setTempKey(r,'job')?OGPParser.setTempKey(r,'job'):OGPJob.jobtmpkey;
            OGPJob.jobsrun++;
            if (res['jobExtraExp']) {OGPJob.extraexpcount++;OGPJob.extraexp+=parseInt(res['jobExtraExp']);}
            if (res['jobEnergySpent']==0) OGPJob.freejobs++;
            if (!isNaN(parseInt(res['jobMoney']))) OGPJob.totalmoney[OGPItems.getCityIndex(OGPConfig.currentCity)] += parseInt(res['jobMoney']);
            if (!isNaN(parseInt(res['jobExtraMoney']))) {OGPJob.extramoney++;OGPJob.totalmoney[OGPItems.getCityIndex(OGPConfig.currentCity)]+=parseInt(res['jobExtraMoney']);}
            // Check the loot
            if (res['jobLoot']) {
              var lindex = -1;
              for (var i = 0; i < OGPJob.lootitems.length; i++) {
                if (OGPJob.lootitems[i][1]==res['jobLoot']) 
                  lindex = i;
              }
              if (lindex == -1) {
                OGPJob.lootitems[OGPJob.lootitems.length] = new Array(1,res['jobLoot']);
              } else {
                OGPJob.lootitems[lindex][0] = parseInt(OGPJob.lootitems[lindex][0]) + 1;
              }
            }
            OGPJob.updateJobResults();
            if (parseInt(OGPJob.jobsrun) < parseInt(OGPJob.qtyToRun)) {
              if (OGPConfig.currentCity == 5 || OGPConfig.currentCity == 6) OGPJob.curJobTab = -1;
              OGPJob.jobruntimer = setTimeout("OGPJob.runJobs(2,-1);",250);
            } else {
              OGPDisplay.setHTML('divJobStatus','<font style="color:' + OGPConfig.clrGood + '">All jobs complete</font>');
            }
          } else {
            // Got return value, but wasn't successful run
            if (res['timeout']) {
              OGPJob.isRunning = false;
              OGPDisplay.setHTML('divJobStatus','<font style="color:' + OGPConfig.clrFatal + '">Session has timed out...stopping</font>');
              OGPDisplay.addLine('Session has timed out...stopping running jobs',OGPConfig.clrFatal);
              break;
            }
            if (r.indexOf('session has timed out') > 0) {
              // Wrong temp key, get a new one
              OGPDisplay.setHTML('divJobStatus','<font style="color:' + OGPConfig.clrWarning + '">Temp key has expired, attempting to refresh key</font>');
              OGPJob.curJobTab = -1;
              OGPJob.jobruntimer = setTimeout("OGPJob.runJobs(2,-1);",250);
              break;
            }
            if (r.indexOf('need more energy') > 0) {
              //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>' + r;
              OGPDisplay.setHTML('divJobStatus','No energy remaining...waiting for additional energy');
              OGPJob.curJobTab = -1; // Force tmpkey refresh
              OGPJob.jobruntimer = setTimeout("OGPJob.runJobs(2,-1);",30000);
              break;
            }
            if (res['jobResults']=='Failed') {
              OGPDisplay.setHTML('divJobStatus','<font style="color:' + OGPConfig.clrWarning + '">Job did not run correctly, attempting to recover</font>');
              // Reload the city and try again
              var tcity = OGPConfig.currentCity;
              OGPConfig.currentCity = -1;
              OGPTravel.goCity(tcity,"OGPJob.runJobs(2,-1)");
              //OGPJob.jobruntimer = setTimeout("OGPJob.runJobs(2,-1);",5000);
              break;
            }
            
            OGPDisplay.setHTML('divJobStatus','<font style="color:' + OGPConfig.clrFatal + '">Could not understand response from server.  Stopping job running</font>');
            OGPJob.isRunning = false;
            break;
          }
        } else {
          // AJAX non-existant
          OGPDisplay.setHTML('divJobStatus','<font style="color:' + OGPConfig.clrFatal + '">No response returned from server, attempting to recover</font>');
          OGPConfig.currentCity = -1; // Force travel to city again
          OGPJob.curJobTab = -1; // Force tmpkey refresh
          OGPJob.jobruntimer = setTimeout("OGPJob.runJobs(2,-1);",5000);
        }
        break;
    }
  };

  this.pause = function() {
    OGPJob.isPaused = true;
    if (OGPJob.jobruntimer) clearTimeout(OGPJob.jobruntimer);
    OGPDisplay.setHTML('divJobStatus','Paused');
    OGPDisplay.setHTML('divJobControl','<a onclick="OGPJob.resume();">Resume</a>');
  }

  this.resume = function() {
    OGPDisplay.setHTML('divJobControl','<a onclick="OGPJob.pause();">Pause</a>');
    OGPDisplay.setHTML('divJobStatus','Running');
    OGPJob.isPaused = false;
    OGPJob.runJobs(2,-1);
  }

  this.updateJobResults = function() {
    OGPDisplay.setHTML('divExpNeeded',OGPDisplay.setGoodColor(parseInt(OGPConfig.curExpNeeded) - parseInt(OGPConfig.curExp))); 
    OGPDisplay.setHTML('divJobsRun',OGPDisplay.setGoodColor(OGPJob.jobsrun + '/' + OGPJob.qtyToRun));
    OGPDisplay.setHTML('divEngLeft',OGPDisplay.setGoodColor(OGPConfig.curEnergy));
    OGPDisplay.setHTML('divFreeJobs',OGPDisplay.setGoodColor(OGPJob.freejobs + ' (' + OGPString.percentage(OGPJob.freejobs/OGPJob.jobsrun,2) + '%)'));
    OGPDisplay.setHTML('divCurRatio',OGPDisplay.setGoodColor(OGPConfig.curRatio));
    OGPDisplay.setHTML('divExtraExp',OGPDisplay.setGoodColor(OGPJob.extraexpcount + ' for ' + OGPJob.extraexp + ' (' + OGPString.percentage(OGPJob.extraexpcount/OGPJob.jobsrun,2) + '%)'));
    OGPDisplay.setHTML('divExtrMoney',OGPDisplay.setGoodColor(OGPJob.extramoney));
    var txt = '';
    for (var i=0; i < OGPItems.cities.length; i++) {
        txt += OGPItems.cities[i][6] + OGPJob.totalmoney[i] + '&nbsp;&nbsp;&nbsp;';
    }
    OGPDisplay.setHTML('divTotalMoney',OGPDisplay.setGoodColor(txt));
    var txt = '';
    for (var i=0; i < OGPJob.lootitems.length; i++) {
      txt += OGPJob.lootitems[i][1] + ' (x' + OGPJob.lootitems[i][0] + ')';
      if (i < OGPJob.lootitems.length-1) txt += ' - ';
    }
    OGPDisplay.setHTML('divLoot',OGPDisplay.setGoodColor(txt));
    
  };

  this.showTab = function(tab) {
    for (var i=0; i < OGPItems.cities.length; i++) {
      if (i==tab) {
        OGPDisplay.show('divCityJobs' + i);
        e$('tdJobTab' + i).style.backgroundColor= OGPDisplay.buttonbgcolor;
      } else {
        OGPDisplay.hide('divCityJobs' + i);
        e$('tdJobTab' + i).style.backgroundColor = OGPDisplay.headerbgcolor;
      }
    } 
  };

  this.setQty = function() {
    OGPJob.qtyToRun = e$('selJobQty').value;
    if (OGPJob.jobToRun != -1 && parseInt(OGPJob.qtyToRun) != 0) {
      e$('divRunJobParams').innerHTML = 'Ready to run ' + OGPJob.qtyToRun + ' "' + OGPItems.jobs[OGPJob.jobToRun][3] + '" job' + ((parseInt(OGPJob.qtyToRun) > 1)?'s':'');
      e$('divRunJobParams').innerHTML += '  <a onclick="OGPJob.runJobs(1,0);">Start Running</a>';
    }
  };
  this.setJob = function(jobid) {
    OGPJob.jobToRun = jobid;
    OGPJob.qtyToRun = e$('selJobQty').value;
    if (OGPJob.jobToRun != -1 && parseInt(OGPJob.qtyToRun) != 0) {
      e$('divRunJobParams').innerHTML = 'Ready to run ' + OGPJob.qtyToRun + ' "' + OGPItems.jobs[OGPJob.jobToRun][3] + '" job' + ((parseInt(OGPJob.qtyToRun) > 1)?'s':'');
      e$('divRunJobParams').innerHTML += '  <a onclick="OGPJob.runJobs(1,0)">Start Running</a>';
    }
  };
  
};

/***************************************
  Mini-pack
****************************************/
function ogpMinipackDef() {

  this.mpurls = new Array();
  this.mpurls[0] = 'http://toolbar.zynga.com/game_iframe_proxy.php?playing=true';
  this.mpurls[1] = 'http://www.facebook.com/extern/login_status.php?api_key=a50ad74e9db5f16570a7379d65cb6cee&extern=0&channel=http%3A%2F%2Ftoolbar.zynga.com%2Fxd_receiver.htm&locale=en_US';
  this.mpurls[2] = 'http://toolbar.zynga.com/click.php?to=mwgamestatsplaynow';
  this.mpurls[3] = 'http://toolbar.zynga.com/game_iframe_proxy.php';

  this.getMinipack = function() {
    var txt = '';
    txt += '<table name="tblMinipack" id="tblMinipack">';
    txt += '<tr><td>';
    txt += 'If you have collected a minipack before, all that is needed is to click the <b>Get Minipack</b> link below.  If this is ';
    txt += 'your first time collecting, or you were not able to collect, click all four links in order.  The first link may require that ';
    txt += 'you log in.  All pages opened by this process can be closed once they have completely loaded.<br /><br /></td></tr>';
    txt += '<tr><td><div><a target="minipackwin" href="' + this.mpurls[0] + '">Set Playing Status</a>&nbsp;&nbsp;';
    txt += '<a target="minipackwin" href="' + this.mpurls[1] + '">Initialize FB Connection</a>';
    txt += '<a target="minipackwin" href="' + this.mpurls[2] + '">Get Minipack</a>';
    txt += '<a target="minipackwin" href="' + this.mpurls[3] + '">Clear Playing Status</a>';
    txt += '</div></td></tr></table>';
    OGPDisplay.setHTML('divOGPSetup',txt);
  };
};

/***************************************
  Smart Drone Runner
****************************************/
function ogpDroneRunnerDef() {
  this.burnStamina = false;
  this.stamFight = false;
  this.stamRob = false;
  this.stamFightRob = false;
  this.stamRobFight = false;
  this.useEnergyFirst = false;
  this.stopForBoss = false;
  this.stopForLevel = false;
  this.spendSkillPoints = false;
  this.skillToSpend = '';
  this.runHELjobs = false;
  this.runLootjobs = false;
  this.HELJobs = new Array();
  this.LootJobs = new Array();
  this.ChipsDecksOnly = false;
  this.BeefPokerOnly = false;
  this.BigJump = false;
  this.ForceDelay = false;
  this.ForceDelayVal = 0;
  this.depositMoney = false;
  this.AdjustTime = false;
  this.BurstMode = false;
  this.StopRatio = false;
  this.StopRatioVal = '';
  this.StopEng = false;
  this.StopEngVal = '';
  this.stamRobCity = '';
  this.stamFightCity = '';
  this.stamHealCity = '';
  this.burstCount = 0;
  this.noReqMoney = false;
  this.noReqItem = false;
  this.bestVegas = false;
  this.jobBest = new Array(0,0,0);
  this.jobPoker = new Array(0,4,26);
  this.jobToken = new Array(0,4,24);
  this.jobDeck = new Array(0,4,25);

  this.last100 = new Array();
  this.locntr;
  this.cDelay;
  
  this.updateInterval = 1000*60*60*24*7;  // One week
  this.lootCols = 4;
  
  this.jobtmpkey;
  this.jobsrun;
  this.freejobs;
  this.extraexp;
  this.totalextraexp;
  this.totalexp;
  this.totaleng;
  this.totalstamina;
  this.extramoney;
  this.totalmoney = new Array();
  this.lootitems = new Array();
  this.bossjobeng;
  this.bossjobexp;
  this.bigjumpeng;
  this.bigjumpexp;
  this.bigjumpid;
  this.startinglevel;
  this.tokencount;
  this.deckcount;
  this.isRunning;
  this.isPaused;
  this.curJobCity;
  this.curJobTab;
  this.currentJob;
  this.fightkey;
  this.isburningstamina;
  this.jobwaittimer; // Timeout for waiting to check for more energy
  this.specialcontroller; // Fix for the new job layout
  this.expRatio; // Expected Ratio
  this.cBonus;
  this.arNoStamina;
  this.arRobSpots = new Array();
  this.fightLevel;
  this.fightMafia;
  this.fightwins = 0;
  this.fightlosses = 0;
  this.robwins = 0;
  this.roblosses =0;
  this.curFightIndex = 0;
  this.attackStrength = 0;
  this.defenseStrength = 0;
  this.attackStrengthCurrent = 0;
  this.defenseStrengthCurrent = 0;
  this.FRSwitch = 0;
  this.FDelay = 0;
  this.FIgnore = new Array();
  this.BadJobRunCount = 0;
  this.RobDelay = 1;
  
  this.resetSettings = function() {
    this.isRunning = false;
    this.isPaused = false;
    this.burnStamina=false;
    this.stamFight = false;
    this.stamRob = false;
    this.stamFightRob = false;
    this.stamRobFight = false;
    this.useEnergyFirst = false;
    this.stopForBoss=false;
    this.stopForLevel=false;
    this.spendSkillPoints=false;
    this.skillToSpend='';
    this.runHELjobs=false;
    this.runLootjobs=false;
    this.HELJobs.length=0;
    this.LootJobs.length=0;
    this.ChipsDecksOnly=false;
    this.BeefPokerOnly=false;
    this.BigJump=false;
    this.ForceDelay=false;
    this.ForceDelayVal=0;
    this.AdjustTime=false;
    this.BurstMode=false;
    this.StopRatio=false;
    this.StopRatioVal='';
    this.StopEng=false;
    this.StopEngVal='';
    this.stamRobCity = '';
    this.stamFightCity = '';
    this.stamHealCity = '';
    this.burstCount = 0;
    this.updateWarning = false;
    this.depositMoney = false;
    this.bossjobeng = 0;
    this.bossjobexp = 0;
    this.bigjumpeng = 0;
    this.bigjumpexp = 0;
    this.startinglevel = 0;
    this.totallevels = 0;
    this.tokencount = 0;
    this.deckcount = 0;
    this.freejobs = 0;
    this.extraexp = 0;
    this.extramoney = 0;
    this.totalextraexp = 0;
    this.totalexp = 0;
    this.totaleng = 0;
    this.startinglevel = OGPConfig.curLevel;
    this.curJobCity = OGPConfig.currentCity;
    this.curJobTab = -1;
    this.currentJob = -1;
    this.jobsrun=0;
    this.jobtmpkey = '';
    this.fightkey = '';
    this.bigjumpid = -1;
    this.lootitems.length = 0;
    this.isburningstamina = false;
    this.noReqMoney = false;
    this.noReqItem = false;
    this.bestVegas = false;
    this.specialcontroller = OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2];
    for (var i=0;i<OGPItems.cities.length;i++) this.totalmoney[i]=0;
    for (var i=0; i < 100; i++) this.last100[i] = 0;
    this.locntr = 0;
    this.cDelay = 1; // Assume 1 second per run as a default
    this.expRatio = 0;
    this.cBonus = 0;
    this.fightLevel=25000;
    this.fightMafia=501;
    this.fightwins = 0;
    this.fightlosses = 0;
    this.robwins = 0;
    this.roblosses = 0;
    this.attackStrength = 0;
    this.defenseStrength = 0;
    this.attackStrengthCurrent = 0;
    this.defenseStrengthCurrent = 0;
    this.FRSwitch = 0;
    this.FDelay = 0;
    this.FIgnore.length = 0;
    this.BadJobRunCount = 0;
    this.RobDelay = 1;
  }
  
  this.droneSetup = function() {
    OGPDrone.resetSettings();
    if (OGPCookie.readCookie('mwjobs_updated'))
      lastupdate = OGPCookie.readCookie('mwjobs_udated');
    else
      lastupdate = new Date().getTime();
      
    // See if the job payouts need to be updated
    if (new Date().getTime() - lastupdate < OGPDrone.updateInterval) {
      OGPDisplay.addLine('It has been a while since you have updated the job payouts.  For maximum effectiveness, this should be updated.',OGPConfig.clrWarning);
      OGPDrone.updateWarning = true;
    }
    
    // Load the user preferences
    if (OGPCookie.readCookie('ogpdrone')) {
      var dr = OGPCookie.readCookie('ogpdrone');
      var adr = dr.split('|');
      for (var i = 0; i < adr.length; i++) {
        switch(adr[i]) {
          case 'stamina':this.burnStamina = true;break;
          case 'stopboss':this.stopForBoss = true;break;
          case 'stoplevel':this.stopForLevel = true;break;
          case 'spendskill':this.spendSkillPoints = true;this.skillToSpend = adr[i+1];i++;break;
          case 'hel':this.runHELJobs=true;break;
          case 'loot':this.runLootJobs=true;break;
          case 'chips':this.ChipsDecksOnly=true;break;
          case 'beef':this.BeefPokerOnly=true;break;
          //case 'jump':this.BigJump=true;break;
          case 'deposit':this.depositMoney=true;break;
          case 'delay':this.ForceDelay=true;this.ForceDelayVal=adr[i+1];i++;break;
          case 'adjust':this.AdjustTime=true;break;
          case 'burst':this.BurstMode=true;break;
          case 'stfight':this.stamFight=true;break;
          case 'strob':this.stamRob=true;break;
          case 'stfightrob':this.stamFightRob=true;break;
          case 'strobfight':this.stamRobFight=true;break;
          case 'frswitch':this.FRSwitch=adr[i+1];i++;break;
          case 'useenfirst':this.useEnergyFirst=true;break;
          case 'stopratio':this.StopRatio=true;break;
          case 'stopratioval':this.StopRatioVal=adr[i+1];i++;break;
          case 'stopeng':this.StopEng=true;break;
          case 'stopengval':this.StopEngVal=adr[i+1];i++;break;
          case 'robcity':this.stamRobCity=adr[i+1];i++;break;
          case 'fightcity':this.stamFightCity=adr[i+1];i++;break;
          case 'healcity':this.stamHealCity=adr[i+1];i++;break;
          case 'nomoney':this.noReqMoney=true;break;
          case 'noitem':this.noReqItem=true;break;
          case 'bestvegas':this.bestVegas=true;break;
          case 'flevel':this.fightLevel=adr[i+1];i++;break;
          case 'fmafia':this.fightMafia=adr[i+1];i++;break;
          case 'fdelay':this.FDelay=adr[i+1];i++;break;
          case 'ignore':this.FIgnore = adr[i+1].split('%*%');i++;break;
          case 'rdelay':this.RobDelay=adr[i+1];i++;break;
        }
      }
    }
    if (!this.stamFight && !this.stamRob && !this.stamFightRob && !this.stamRobFight) this.stamFight = true;
    // Build the setup screen
    var txt = '';
    txt += '<table id="tblDrone" name="tblDrone">';
    txt += '<tr><th colspan="4">Smart Drone Runner Options</th></tr>';
    txt += '<tr>';
    txt += '<td><input type="checkbox" onclick="e$(\'ckLevel\').checked=(this.checked==true?false:e$(\'ckLevel\').checked);" name="ckBoss" id="ckBoss"' + (this.stopForBoss==true?' checked':'') + '> Stop For Boss Job</td>';
    txt += '<td><input type="checkbox" onclick="e$(\'ckBoss\').checked=(this.checked==true?false:e$(\'ckBoss\').checked);"name="ckLevel" id="ckLevel"' + (this.stopForLevel==true?' checked':'') + '> Stop For Level Up</td>';
    txt += '<td><input type="checkbox" onclick="e$(\'ckBeef\').checked=(this.checked==true?false:e$(\'ckBeef\').checked);" name="ckChips" id="ckChips"' + (this.ChipsDecksOnly==true?' checked':'') + '> Get Tokens/Decks Only</td>';
    txt += '<td><input type="checkbox" onclick="e$(\'ckChips\').checked=(this.checked==true?false:e$(\'ckChips\').checked);" name="ckBeef" id="ckBeef"' + (this.BeefPokerOnly==true?' checked':'') + '> Run Best Job/Poker Game Only</td>';
    txt += '</tr>';
    txt += '<tr>';
    txt += '<td><input type="checkbox" name="ckStamina" id="ckStamina"' + (this.burnStamina==true?' checked':'') + '> Burn Stamina</td>';
    txt += '<td colspan="2"><input type="checkbox" onclick="OGPDrone.fightrobck(1);" name="ckSTFight" id="ckSTFight"' + (this.stamFight==true?' checked':'') + '> Fight&nbsp;&nbsp;&nbsp;';
    txt += '<input type="checkbox" onclick="OGPDrone.fightrobck(2);" name="ckSTRob" id="ckSTRob"' + (this.stamRob==true?' checked':'') + '> Rob';
    txt += '<input type="checkbox" onclick="OGPDrone.fightrobck(3);" name="ckSTFightRob" id="ckSTFightRob"' + (this.stamFightRob==true?' checked':'') + '> Fight then Rob';
    txt += '<input type="checkbox" onclick="OGPDrone.fightrobck(4);" name="ckSTRobFight" id="ckSTRobFight"' + (this.stamRobFight==true?' checked':'') + '> Rob then Fight</td>';
    //txt += '<td><input type="checkbox" name="ckENUseFirst" id="ckENUseFirst"' + (this.useEnergyFirst==true?' checked':'') + ' onclick="e$(\'ckEnergy\').checked=(this.checked==true?true:e$(\'ckEnergy\').checked);"> Use Energy First</td>';
    txt += '<td>For F/R or R/F, switch at <input type="text" size="5" name="txtFRSwitch" id="txtFRSwitch" value="' + this.FRSwitch + '"> energy remaining</td>';
    txt += '</tr>';
    txt += '<tr>';
    txt += '<td colspan="4">Fighting: Max Lvl: <input size="5" type="text" name="txtFLevel" id="txtFLevel" value="' + this.fightLevel + '"> - Max Mafia: <input size="3" type="text" name="txtFMafia" id="txtFMafia" value="' + this.fightMafia + '">';
    txt += '&nbsp;&nbsp;Rob in ';
    txt += '<select name="selRobCity" id="selRobCity">';
    for (var i=0; i < OGPItems.cities.length; i++) {
      txt += '<option value="' + OGPItems.cities[i][3] + '"' + (parseInt(OGPItems.cities[i][3])==parseInt(this.stamRobCity)?' selected':'') + '>' + OGPItems.cities[i][0] + '</option>';
    }
    txt += '</select>&nbsp;&nbsp;';
    txt += 'Fight in ';
    txt += '<select name="selFightCity" id="selFightCity">';
    for (var i=0; i < OGPItems.cities.length; i++) {
      txt += '<option value="' + OGPItems.cities[i][3] + '"' + (parseInt(OGPItems.cities[i][3])==parseInt(this.stamFightCity)?' selected':'') + '>' + OGPItems.cities[i][0] + '</option>';
    }
    txt += '</select>&nbsp;&nbsp;';
    txt += 'Heal in ';
    txt += '<select name="selHealCity" id="selHealCity">';
    for (var i=0; i < OGPItems.cities.length; i++) {
      txt += '<option value="' + OGPItems.cities[i][3] + '"' + (parseInt(OGPItems.cities[i][3])==parseInt(this.stamHealCity)?' selected':'') + '>' + OGPItems.cities[i][0] + '</option>';
    }
    txt += '</select>';
    txt += '</td>';
    txt += '</tr>';
    txt += '<tr>';
    txt += '<td colspan="2">';
    txt += 'Delay <input type="text" size="3" name="txtFDelay" id="txtFDelay" value="' + this.FDelay + '"> seconds between fights';
    txt += '</td>';
    txt += '<td colspan="2">';
    txt += 'Delay <select name="selRDelay" id="selRDelay">';
    txt += '<option value="0"' + (parseInt(OGPDrone.RobDelay)==0?' selected':'') + '>None</option>';
    txt += '<option value="100"' + (parseInt(OGPDrone.RobDelay)==100?' selected':'') + '>0.10</option>';
    txt += '<option value="250"' + (parseInt(OGPDrone.RobDelay)==250?' selected':'') + '>0.25</option>';
    txt += '<option value="500"' + (parseInt(OGPDrone.RobDelay)==500?' selected':'') + '>0.50</option>';
    txt += '<option value="750"' + (parseInt(OGPDrone.RobDelay)==750?' selected':'') + '>0.75</option>';
    txt += '<option value="1000"' + (parseInt(OGPDrone.RobDelay)==1000?' selected':'') + '>1.00</option>';
    txt += '<option value="2000"' + (parseInt(OGPDrone.RobDelay)==2000?' selected':'') + '>2.00</option>';
    txt += '</select> seconds between robbing calls';
    txt += '</tr>';
    txt += '<tr><td colspan="4">Your account may be flagged and disabled if the robbing delay value is set too low.  Use low numbers at your own risk.</td></tr>';
    txt += '<tr>';
    txt += '<td colspan="4">Don\'t fight people with these characters in their name: ';
    txt += '<input size="120" type="text" name="txtIgnore" id="txtIgnore" value="';
    for (var i=0; i < OGPDrone.FIgnore.length; i++) {
      txt += OGPDrone.FIgnore[i] + ' ';
    }
    txt += '"></td></tr>';
    txt += '<tr>';
    txt += '<td><input type="checkbox" name="ckAdjust" id="ckAdjust"' + (this.AdjustTime==true?' checked':'') + '> Adjust Delay for Bonuses</td>';
    txt += '<td><input type="checkbox" name="ckDelay" id="ckDelay"' + (this.ForceDelay==true?' checked':'') + '> Delay <input type="txt" size="3" name="txtDelay" id="txtDelay" value="' + this.ForceDelayVal + '"> seconds</td>';
    //txt += '<td><input type="checkbox" name="ckBurst" id="ckBurst"' + (this.BurstMode==true?' checked':'') + '> Burst Mode</td>';
    txt += '<td></td>';
    //txt += '<td><input type="checkbox" name="ckJump" id="ckJump"' + (this.BigJump==true?' checked':'') + '> Max Jump To Next Level</td>';
    txt += '<td></td>';
    txt += '<td></td>';
    txt += '</tr>';
    txt += '<tr>';
    txt += '<td><input type="checkbox" name="ckStopRatio" id="ckStopRatio"' + (this.StopRatio==true?' checked':'') + '> Stop When Ratio At <input type="text" name="txtStopRatio" id="txtStopRatio" size="4" value="' + this.StopRatioVal + '"></td>';
    txt += '<td><input type="checkbox" name="ckStopEng" id="ckStopEng"' + (this.StopEng==true?' checked':'') + '> Stop When Energy At <input type="text" name="txtStopEng" id="txtStopEng" size="7" value="' + this.StopEngVal + '"></td>';
    txt += '<td><input type="checkbox" name="ckSpend" id="ckSpend"' + (this.spendSkillPoints==true?' checked':'') + '> Spend Skill Points on ';
    txt += '<select name="selSkill" id="selSkill">';
    for (var i=0; i < OGPAccount.skills.length; i+=2) {
      txt += '<option value="' + OGPAccount.skills[i] + '"' + (OGPAccount.skills[i]==this.skillToSpend?' selected':'') + '>' + OGPAccount.skills[i+1] + '</option>';
    }
    txt += '</select></td>';
    txt += '</tr>';
    txt += '<tr>';
    txt += '<td colspan="2"><input type="checkbox" name="ckNoMoney" id="ckNoMoney"' + (this.noReqMoney==true?' checked':'') + '> Don\'t run jobs that require money</td>';
    txt += '<td colspan="2"><input type="checkbox" name="ckNoItem" id="ckNoItem"' + (this.noReqItem==true?' checked':'') + '> Don\'t run jobs that require consumables</td>';
    txt += '</tr>';
    //txt += '<tr>';
    //txt += '<td colspan="4"><input type="checkbox" name="ckBestVegas" id="ckBestVegas"' + (this.bestVegas==true?' checked':'') + '> Run the best Las Vegas Job if possible</td>';
    //txt += '</tr>';
    txt += '<tr>';
    txt += '<td>Get HEL</td>';
    txt += '<td colspan="' + this.lootCols + '">';
    txt += '<table name="tblDroneSub" id="tblDroneSub">';
    var ccnt = 0;
    for (var i=0; i < OGPItems.jobs.length; i++) {
      if (OGPItems.jobs[i][5]==true) {
        ccnt+=1;
        if (ccnt > this.lootCols) {
          txt += '</tr><tr>';
          ccnt = 1;
        }
        txt += '<td><input type="checkbox" value="' + i + '" name="HEL' + i + '" id="HEL' + i + '"> ' + OGPItems.jobs[i][4] + '</td>';
      }
    }
    txt += '</tr>';
    txt += '</table>';
    txt += '</td>';
    txt += '</tr>';
    txt += '<tr>';
    txt += '<td>Get Loot</td>';
    txt += '<td colspan="' + this.lootCols + '">';
    txt += '<table name="tblDroneSub" id="tblDroneSub">';
    var ccnt = 0;
    for (var i=0; i < OGPItems.jobs.length; i++) {
      if (OGPItems.jobs[i][5]==false && OGPItems.jobs[i][4]!='' && OGPItems.jobs[i][6]!=0) {
      //if (OGPItems.jobs[i][5]==false && OGPItems.jobs[i][4]!='') {
        ccnt+=1;
        if (ccnt > this.lootCols) {
          txt += '</tr><tr>';
          ccnt = 0;
        }
        txt += '<td><input type="checkbox" value="' + i + '" name="Loot' + i + '" id="Loot' + i + '"> ' + OGPItems.jobs[i][4] + '</td>';
      }
    }
    txt += '</tr>';
    txt += '</table>';
    txt += '</td>';
    txt += '</tr>';
    txt += '<tr><th colspan="4><div id="divOGPDroneStart" name="divOGPDroneStart"><input type="button" value="Start Drone" onclick="OGPDrone.run(0,0)"></div></th></tr>';
    txt += '</table>';
    OGPDisplay.setHTML('divOGPSetup',txt);
  
  };
  

  this.run = function(step,index) {
    switch(step) {
      case 0:
        OGPDrone.resetSettings();
        OGPDrone.isRunning = true;
        var curcookie = '';
        // Set the robbing settings if robbing city selected.
        //if (e$('ckSTRob').checked && e$('selRobCity').value != '0') e$('ckENUseFirst').checked=true;
        if (e$('ckStamina').checked) {OGPDrone.useEnergyFirst = true;OGPDrone.burnStamina = true;curcookie+='stamina|';}
        if (e$('ckSTFight').checked) {OGPDrone.stamFight = true;curcookie+='stfight|';}
        if (e$('ckSTRob').checked) {OGPDrone.stamRob = true;curcookie+='strob|';}
        if (e$('ckSTFightRob').checked) {OGPDrone.stamFightRob = true;curcookie+='stfightrob|';}
        if (e$('ckSTRobFight').checked) {OGPDrone.stamRobFight = true;curcookie+='strobfight|';}
        OGPDrone.FRSwitch = e$('txtFRSwitch').value;
        if (isNaN(OGPDrone.FRSwitch)) OGPDrone.FRSwitch = 0;
        OGPDrone.FDelay = e$('txtFDelay').value;
        if (isNaN(OGPDrone.FDelay)) OGPDrone.FDelay = 0;
        curcookie+='fdelay|' + OGPDrone.FDelay + '|';
        OGPDrone.RobDelay = e$('selRDelay').value;
        if (isNaN(OGPDrone.RobDelay)) OGPDrone.RobDelay = 1000;
        curcookie+='rdelay|' + OGPDrone.RobDelay + '|';
        curcookie+='frswitch|' + OGPDrone.FRSwitch + '|';
        if (isNaN(e$('txtFLevel').value)) e$('txtFLevel').value = '25000';
        if (isNaN(e$('txtFMafia').value)) e$('txtFMafia').value = '501';
        curcookie+='flevel|' + e$('txtFLevel').value + '|';
        curcookie+='fmafia|' + e$('txtFMafia').value + '|';
        OGPDrone.fightLevel = e$('txtFLevel').value;
        OGPDrone.fightMafia = e$('txtFMafia').value;
        if (e$('ckBoss').checked) {OGPDrone.stopForBoss = true;curcookie+='stopboss|';}
        if (e$('ckLevel').checked) {OGPDrone.stopForLevel = true;curcookie+='stoplevel|';}
        if (e$('ckNoMoney').checked) {OGPDrone.noReqMoney = true;curcookie+='nomoney|'; }
        if (e$('ckNoItem').checked) {OGPDrone.noReqItem = true;curcookie+='noitem|'; }
        //if (e$('ckBestVegas').checked) {OGPDrone.bestVegas = true;curcookie+='bestvegas|'; }
        OGPDrone.BurstMode = false;
        if (e$('ckStopRatio').checked) {OGPDrone.StopRatio = true;curcookie+='stopratio|';}
        if (e$('ckStopEng').checked) {OGPDrone.StopEng = true;curcookie+='stopeng|';}
        OGPDrone.stamRobCity = e$('selRobCity').value;curcookie+='robcity|' + OGPDrone.stamRobCity + '|';
        OGPDrone.stamFightCity = e$('selFightCity').value;curcookie+='fightcity|' + OGPDrone.stamFightCity + '|';
        OGPDrone.stamHealCity = e$('selHealCity').value;curcookie+='healcity|' + OGPDrone.stamHealCity + '|';
        OGPDrone.StopRatioVal = e$('txtStopRatio').value;curcookie+='stopratioval|' + OGPDrone.StopRatioVal + '|';
        OGPDrone.StopEngVal = e$('txtStopEng').value;curcookie+='stopengval|' + OGPDrone.StopEngVal + '|';
        if (isNaN(OGPDrone.StopRatioVal)) {OGPDrone.StopRatio=false;OGPDrone.StopRatioVal='';}
        if (isNaN(OGPDrone.StopEngVal)) {OGPDrone.StopEng=false;OGPDrone.StopEngVal='';}
        OGPDrone.runHELJobs = false;
        OGPDrone.runLootJobs = false;
        for (var i=0; i < OGPItems.jobs.length; i++) {
          if (e$('HEL' + i)) {
            if (e$('HEL' + i).checked) {
              OGPDrone.runHELJobs = true;
              curcookie+='hel|';
              OGPDrone.HELJobs[OGPDrone.HELJobs.length] = i;
            }
          }
          if (e$('Loot' + i)) {
            if (e$('Loot' + i).checked) {
              OGPDrone.runLootJobs = true;
              curcookie+='loot|';
              OGPDrone.LootJobs[OGPDrone.LootJobs.length] = i;
            }
          }
        }
        if (e$('ckChips').checked) {OGPDrone.ChipsDecksOnly = true;curcookie+='chips|';}
        if (e$('ckBeef').checked) {OGPDrone.BeefPokerOnly = true;curcookie+='beef|';}
        if (e$('ckSpend').checked) {OGPDrone.spendSkillPoints = true;curcookie+='spendskill|';}
        OGPDrone.skillToSpend = e$('selSkill').value; curcookie+=e$('selSkill').value + '|';
        if (e$('ckDelay').checked) {OGPDrone.ForceDelay = true;OGPDrone.ForceDelayVal=e$('txtDelay').value;curcookie+='delay|' + e$('txtDelay').value + '|';}
        //if (e$('ckDeposit').checked) {OGPDrone.depositMoney = true;curcookie+='deposit|';}
        //if (e$('ckJump').checked) {OGPDrone.BigJump = true;curcookie+='jump|';}
        if (e$('ckAdjust').checked) {OGPDrone.AdjustTime = true; curcookie+='adjust|';}
        var ta = e$('txtIgnore').value.split(' ');
        var igcookie = '';
        OGPDrone.FIgnore.length = 0;
        for (var i=0; i < ta.length; i++) {
          if (ta[i] != '') {
            OGPDrone.FIgnore[OGPDrone.FIgnore.length] = ta[i];
            if (igcookie != '') igcookie += '%*%';
            igcookie += ta[i];
          }
        }
        if (igcookie != '')
          curcookie += 'ignore|' + igcookie + '|';


        curcookie=curcookie.substr(0,curcookie.length-1);
        OGPCookie.createCookie('ogpdrone',curcookie,365);
        // Got the settings, set up the output
        var txt = '';
        txt += '<table id="tblDroneResults" name="tblDroneResults">';
        txt += '<tr><th colspan="3">Smart Drone Runner</th></tr>';
        txt += '<tr><td colspan="3">Options:  ';
        if (OGPDrone.burnStamina) txt += 'Burn Stamina, ';
        if (OGPDrone.stopForBoss) txt += 'Stop For Boss Job, ';
        if (OGPDrone.stopForLevel) txt += 'Stop Before Level Up, ';
        if (OGPDrone.runHELJobs && !OGPDrone.ChipsDecksOnly.checked && !OGPDrone.BeefPokerOnly.checked) txt += 'Run HEL Jobs, ';
        if (OGPDrone.runLootJobs && !OGPDrone.ChipsDecksOnly.checked && !OGPDrone.BeefPokerOnly.checked) txt += 'Run Loot Jobs, ';
        if (OGPDrone.ChipsDecksOnly) txt += 'Run Tokens/Decks Jobs Only, ';
        if (OGPDrone.BeefPokerOnly) txt += 'Run Best/Poker Jobs Only, ';
        if (OGPDrone.spendSkillPoints) txt += 'Spend Skill Points, ';
        if (OGPDrone.depositMoney) txt += 'Deposit Money, ';
        //if (OGPDrone.BigJump) txt += 'Max Jump To Next Level, ';
        if (OGPDrone.AdjustTime) txt += 'Adjust Delay For Bonuses, ';
        if (OGPDrone.BurstMode) txt += 'Burst Mode, ';
        if (OGPDrone.useenergyFirst) txt += 'Use Energy First, ';
        if (OGPDrone.stamRob && OGPDrone.burnStamina) txt += 'Use Robbing To Burn Stamina, ';
        if (OGPDrone.stamFightRob && OGPDrone.burnStamina) txt += 'Fight Then Rob, Switch at ' + OGPDrone.FRSwitch + ' stamina remaining, ';
        if (OGPDrone.stamRobFight && OGPDrone.burnStamina) txt += 'Rob Then Fight, Switch at ' + OGPDrone.FRSwitch + ' stamina remaining, ';
        if (OGPDrone.burnStamina && OGPDrone.FDelay > 0) txt += 'Wait ' + OGPDrone.FDelay + ' seconds between fights, ';          
        if (OGPDrone.StopRatio) txt += 'Stop At Ratio Of ' + OGPDrone.StopRatioVal + ', ';
        if (OGPDrone.StopEng) txt += 'Stop When Energy At ' + OGPDrone.StopEngVal + ', ';
        if (OGPDrone.noReqMoney) txt += 'Don\'t run jobs that cost money, ';
        if (OGPDrone.noReqItem) txt += 'Don\'t run jobs that require consumables, ';
        if (OGPDrone.FIgnore.length > 0) {
          txt += ', Ignore names with: '
          for (var i = 0; i < OGPDrone.FIgnore.length; i++)
            txt += OGPDrone.FIgnore[i] + ', ';
          txt = txt.substr(0,txt.length-2);
        }
        
        //if (OGPDrone.bestVegas) txt += 'Run best Vegas job, ';
        txt = txt.substr(0,txt.length-2);
        txt += '</td></tr>';
        txt += '<tr><td style="width:33%"><div>Exp Needed: </div><div id="divDroneExpNeeded" name="divDroneExpNeeded"></div></td>';
        txt += '<td style="width:33%"><div>Jobs Run: </div><div id="divDroneJobsRun" name="divDroneJobsRun"></div></td>';
        txt += '<td style="width:33%"><div>Levels Gained: </div><div id="divDroneLevels" name="divDroneLevels"></div></td>';
        txt += '</tr>';
        txt += '<tr><td><div>Eng: </div><div id="divDroneEngLeft" name="divDroneEngLeft"></div><div>Stam: </div><div id="divDroneStamLeft" name="divDroneStamLeft"></div></td>';
        txt += '<td><div>Free Jobs: </div><div id="divDroneFreeJobs" name="divDroneFreeJobs"></div></td>';
        txt += '<td><div>Tokens/Decks Left: </div><div id="divDroneTokens" name="divDroneTokens"></div><div>/</div><div id="divDroneDecks" name="divDroneDecks"></div></td>';
        txt += '</tr>';
        txt += '<tr><td><div>Cur Ratio: </div><div id="divDroneCurRatio" name="divDroneCurRatio"></div></td>';
        txt += '<td><div>Extra Exp: </div><div id="divDroneExtraExp" name="divDroneExtraExp"></div></td>';
        txt += '<td><div>Energy For Boss Job: </div><div id="divDroneBossJob" name="divDroneBossJob"></div></td>';
        txt += '</tr>';
        txt += '<tr><td><div>Expected Ratio: </div><div id="divDroneExpRatio" name="divDroneExpRatio"></td>';
        txt += '<td><div>Extra Money: </div><div id="divDroneExtraMoney" name="divDroneExtraMoney"></div></td>';
        txt += '<td><div>Energy For Level Jump: </div><div id="divDroneBigJump" name="divDroneBigJump"></div></td>';
        txt += '</tr>';
        txt += '<tr><td colspan="2"><div>Total Money: </div><div id="divDroneTotalMoney" name="divDroneTotalMoney"></div></td>';
        txt += '<td><div>Fight: </div><div id="divDroneFightWin" name="divDroneFightWin"></div><div name="divDroneFightLoss" id="divDroneFightLoss"></div></td></tr>';
        txt += '<tr><td colspan="2"><div>Attack: </div><div id="divDroneAttack" name="divDroneAttack"></div>';
        txt += '<div>&nbsp;&nbsp;&nbsp;&nbsp;Defense: </div><div id="divDroneDefense" name="divDroneDefense"></div></td>';
        txt += '<td><div>Rob: </div><div id="divDroneRobWin" name="divDroneRobWin"></div><div name="divDroneRobLoss" id="divDroneRobLoss"></div></td></tr>';
        txt += '<tr><td colspan="3"><div>Loot Items: </div><div id="divDroneLoot" name="divDroneLoot"></div></td></tr>';
        txt += '<tr><td colspan="3"><div style="text-align:center;" id="divDroneStatus" name="divDroneStatus"></div></td></tr>';
        txt += '</table>';
        txt += '<div id="divDroneControl" name="divDroneControl"></div>';
        OGPDisplay.setHTML('divOGPResults',txt);
        OGPDrone.run(1,0);
        break;
    
      case 1:
        // Display is all set, fill in the blanks and call functions we need
        // Find the best job
        var best = parseFloat(OGPItems.jobs[0][7])/parseFloat(OGPItems.jobs[0][6]);
        
        var big = OGPItems.jobs[0][6];
        for (var i=1; i < OGPItems.jobs.length; i++) {
          if (parseInt(OGPItems.jobs[i][6]) > 0 && parseInt(OGPItems.jobs[i][6]) > parseInt(OGPItems.jobs[big][6])) {
            if ((!OGPDrone.noReqMoney) || (OGPDrone.noReqMoney && OGPItems.jobs[i][8] != 1))
              if ((!OGPDrone.noReqLoot) || (OGPDrone.noReqLoot && OGPItems.jobs[i][9] != 1))
                big = i;
          }
          if (parseInt(OGPItems.jobs[i][6]) > 0 && parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[best][7])/parseFloat(OGPItems.jobs[best][6])) {
            // Skip Poker game
            if (OGPItems.jobs[i][0] != 0 || OGPItems.jobs[i][1] != 4 || OGPItems.jobs[i][2] != 26)
              best = i;
          }
        }
        OGPDrone.jobBest[0] = OGPItems.jobs[best][0];
        OGPDrone.jobBest[1] = OGPItems.jobs[best][1];
        OGPDrone.jobBest[2] = OGPItems.jobs[best][2];
        
        if (OGPItems.jobs[big][6] > 0) { 
          OGPDrone.bigjumpid = big;
          OGPDrone.bigjumpeng = OGPItems.jobs[big][6];
          OGPDrone.bigjumpexp = OGPItems.jobs[big][7];
          OGPDisplay.setHTML('divDroneBigJump','<font color="' + OGPConfig.clrGood + '">' + OGPDrone.bigjumpeng + '</font>');
        } else {
          OGPDisplay.setHTML('divDroneBigJump','<font color="' + OGPConfig.clrWarning + '">Update Job Payouts</font>');
        }
        OGPDisplay.clearSetup();
        // Check for boss job and tokens/decks
        if (OGPConfig.currentCity != OGPItems.getCityNum('New York')) {
          OGPTravel.goCity(OGPItems.getCityNum('New York'),'OGPDrone.run(2,0)');
        } else {
            OGPDrone.run(2,0);
        }
        break;
    
      case 2:
        // Get the boss job value - Select the boss job tab
        var url = OGPConfig.MWURLAJAX;
        url += '&xw_controller=' + OGPItems.cities[OGPConfig.currentCity][2];
        url += '&xw_action=view&xw_city=' + OGPConfig.currentCity;
        url += '&tab=4&bar=0';
        OGPAjax.buildAjax(url,'OGPDrone.run','3,%ix%');
        break;
        
      case 3:
        var r = OGPAjax.ajax[index].response;
        OGPDrone.bossjobeng = OGPParser.getSpecificTagValue(r,'bosseng');
        OGPDrone.bossjobexp = OGPParser.getSpecificTagValue(r,'bossexp');
        OGPDisplay.setHTML('divDroneBossJob',OGPDrone.stopForBoss?OGPDisplay.setGoodColor(OGPDrone.bossjobeng):'--');
        // Pull the tokens and decks at the same time
        OGPDrone.tokencount = OGPParser.getSpecificTagValue(r,'token');
        OGPDrone.deckcount = OGPParser.getSpecificTagValue(r,'deck');
        OGPDisplay.setHTML('divDroneTokens',OGPDisplay.setGoodColor(OGPDrone.tokencount));
        OGPDisplay.setHTML('divDroneDecks',OGPDisplay.setGoodColor(OGPDrone.deckcount));
        OGPDisplay.setHTML('divDroneControl','<a onclick="javascript:OGPDrone.pause();">Pause</a>');
        OGPDrone.updateDroneResults();
        
        // Load the fight page to get A/D values
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlFightList;
        OGPAjax.buildAjax(url,'OGPDrone.run','31,%ix%');
        break;
        
      case 31:
        var r = OGPAjax.ajax[index].response;
        r = r.replace(/[\r\n|\n|\t|]/g,'');
        OGPDrone.attackStrength = OGPParser.getADStats(r,'A');
        OGPDrone.defenseStrength = OGPParser.getADStats(r,'D');
        OGPDrone.attackStrengthCurrent = OGPParser.getADStats(r,'A');
        OGPDrone.defenseStrengthCurrent = OGPParser.getADStats(r,'D');
        OGPDisplay.setHTML('divDroneAttack',OGPDisplay.setGoodColor(OGPDrone.attackStrength));
        OGPDisplay.setHTML('divDroneDefense',OGPDisplay.setGoodColor(OGPDrone.defenseStrength));
        OGPDrone.run(4,0);
        break;
        
      case 4:
        // Main Loop
        if (OGPConfig.Session==1 && OGPDrone.isRunning && !OGPDrone.isPaused) {
          // Calculate the target ratio
          var tExpNeed = parseInt(OGPConfig.curExpNeeded-OGPConfig.curExp);
          var tEng = OGPConfig.curEnergy;
          var canDoBoss = true;
          var canDoJump = true;
          
          // See what our options are at this point
          if (tEng < OGPDrone.bossjobeng) canDoBoss = false;
          if (tEng < OGPDrone.bigjumpeng) canDoJump = false;

          // Compute our target ratio based on the settings
          if (OGPDrone.stopForBoss && canDoBoss) {
            OGPConfig.curRatio = parseInt((tExpNeed/(tEng-OGPDrone.bossjobeng))*100)/100;
          //} else if ((OGPDrone.BigJump && canDoJump) && (tEng-OGPDrone.bigjumpeng >= 0)) {
          //  OGPConfig.curRatio = parseInt((tExpNeed/(tEng-OGPDrone.bigjumpeng))*100)/100;
          } else { // Regular job
            OGPConfig.curRatio = parseInt((tExpNeed/tEng)*100)/100;
          }
          
          // Check for Stop For Ratio
          if (OGPDrone.StopRatio) {
            if (parseFloat(OGPConfig.curRatio) <= parseFloat(OGPDrone.StopRatioVal)) {
              OGPDisplay.setHTML('divDroneStatus','Stopping at user selected ratio');
              OGPDrone.isRunning = false;
              OGPDrone.isPaused = false;
              break;
            }
          }
          
          // Check for Stop For Energy
          if (OGPDrone.StopEng) {
            if (parseInt(OGPConfig.curEnergy) <= parseInt(OGPDrone.StopEngVal)) {
              OGPDisplay.setHTML('divDroneStatus','Stopping at user seelcted energy level');
              OGPDrone.isRunning = false;
              OGPDrone.isPaused = false;
              break;
            }
          }
          // Set the most exp and energy we can get/spend
          var maxexp = tExpNeed-1;
          var maxeng = tEng;

          if (OGPDrone.burnStamina==true) tExpNeed-=(3*OGPConfig.curStamina);

          // See if skill points need to be used
          if (OGPDrone.spendSkillPoints==true && OGPConfig.curSkillPoints > 0) {
            OGPDrone.useSkillPoints(0,0);
          }
          
          // See if stamina needs to be used
          if (OGPDrone.burnStamina==true && OGPDrone.isburningstamina==false) {
            // Trap for not enough to rob
            if ( ((OGPDrone.stamFight==true) && (parseInt(OGPConfig.curStamina) >= 5)) || parseInt(OGPConfig.curStamina) >= 20) {
              OGPDrone.spendStamina(0,0);
              // Give the flag time to set
              setTimeout("OGPDrone.run(4,0);",250);
              break;
            }
          }

          // See if we're supposed to be burning energy before running fight
          if (OGPDrone.useenergyFirst==true && OGPDrone.isburningenergy==true) {
            // Check again in 3 seconds
            setTimeout("OGPDrone.run(4,0);",3000);
            break;
          }
          
          // Adjust the max energy we can spend
          if (OGPDrone.stopForBoss && canDoBoss) {
            maxeng -= OGPDrone.bossjobeng;
          //} else if (OGPDrone.BigJump && canDoJump) {
          //  maxeng -= OGPDrone.bigjumpeng;
          }

          // Compute in Mastermind and Wheelman bonuses
          var mmbonus = parseInt(((maxexp/74)*.03)*37);
          var wmbonus = parseInt(((maxeng/35)*.03)*74);
          
          OGPDrone.curRatio = maxexp/maxeng;
          OGPDrone.updateDroneResults();
          
          // At this point, max energy will have how much energy we can spend without
          // missing boss or big jump

          // Check for stop for boss
          if (OGPDrone.stopForBoss && canDoBoss) {
            if (parseInt(maxeng) <= 15 || parseInt(maxexp) <= 15) {
              OGPDrone.isRunning = false;
              OGPDisplay.setHTML('divDroneStatus','Stopping to run boss job.  Reset to FB to avoid running away.');
              return;
            }
          }
          
          // Check for stop for level
          if (OGPDrone.stopForLevel) {
            if (parseInt(tExpNeed) <= 10) {
              OGPDrone.isRunning = false;
              OGPDisplay.setHTML('divDroneStatus','Stopping for level up.');
              return;
            }
          }
          
          // See if we can level up
          var lujob = OGPDrone.findJumpJob(OGPConfig.curEnergy,maxexp);
          if (lujob > 0) {
            // Stop if stop for level is checked
            if (OGPDrone.stopForLevel) {
              OGPDrone.isRunning = false;
              OGPDisplay.setHTML('divDroneStatus','Stopping for level up.');
              return;
            }
              
            // Job that can level us up, if there's less than 5 energy or 5 exp needed, run it
            if (((parseInt(OGPConfig.curEnergy) - parseInt(OGPItems.jobs[lujob][6])) < 5) || (parseInt(tExpNeed) < 5)) {
              OGPDrone.runOneJob(0,0,new Array(OGPItems.jobs[lujob][0],OGPItems.jobs[lujob][1],OGPItems.jobs[lujob][2]));
              return; 
            }
          }
          
          // Not leveling up, find the right job to run
          var wrat = parseFloat(maxexp)/parseFloat(maxeng);

          if (OGPDrone.ChipsDecksOnly) {
            var runit = true;
            // If Stop for boss or level, make sure we're not going to accidentally level up
            if ((OGPDrone.stopForBoss && canDoBoss) || OGPDrone.stopForLevel) {
              if (parseInt(tExpNeed) <= parseInt(OGPDrone.getJobExp(OGPDrone.jobToken)) * 1.5 || parseInt(OGPConfig.curEnergy) <= parseInt(OGPDrone.getJobEng(OGPDrone.jobToken))) {
                runit = false;              
              }
            }
            if (runit == true) {
              if (parseInt(OGPDrone.tokencount) > parseInt(OGPDrone.deckcount)) {
                OGPDrone.runOneJob(0,0,OGPDrone.jobDeck);
                if (parseInt(OGPConfig.curEnergy) > 400 && parseInt(OGPConfig.curExpNeeded) > 500 && OGPDrone.BurstMode)
                  OGPDrone.runBurst(0,0,OGPDrone.jobDeck);
                return;
              } else {
                OGPDrone.runOneJob(0,0,OGPDrone.jobToken);
                if (parseInt(OGPConfig.curEnergy) > 400 && parseInt(OGPConfig.curExpNeeded) > 500 && OGPDrone.BurstMode)
                  OGPDrone.runBurst(0,0,OGPDrone.jobToken);
                return;
              }
            } 
          }

          if (OGPDrone.BeefPokerOnly) {
            var runit = true;
            // If Stop for boss or level, make sure we're not going to accidentally level up
            if ((OGPDrone.stopForBoss && canDoBoss) || OGPDrone.stopForLevel) {
              if (parseInt(tExpNeed) <= parseInt(OGPDrone.getJobExp(OGPDrone.jobToken)) * 1.5 || parseInt(OGPConfig.curEnergy) <= parseInt(OGPDrone.getJobEng(OGPDrone.jobToken))) {
                runit = false;              
              }
            }
            if (runit == true) {
              if (parseFloat(OGPConfig.curRatio) >= parseFloat(OGPDrone.getJobRatio(OGPDrone.jobPoker)) && (parseInt(OGPDrone.tokencount) >= 20 && parseInt(OGPDrone.deckcount) >= 20)) {
                OGPDrone.runOneJob(0,0,OGPDrone.jobPoker);
                if (parseInt(OGPConfig.curEnergy) > 500 && parseInt(OGPConfig.curExpNeeded) > 1000 && OGPDrone.BurstMode)
                  OGPDrone.runBurst(0,0,OGPDrone.jobPoker);
                return;
              } else {
                OGPDrone.runOneJob(0,0,OGPDrone.jobBest);
                if (parseInt(OGPConfig.curEnergy) > 500 && parseInt(OGPConfig.curExpNeeded) > 1000 && OGPDrone.BurstMode)
                  OGPDrone.runBurst(0,0,OGPDrone.jobBest);
                return;
              }
            }
          }

          if (OGPDrone.runHELJobs) {
            for (var i=0; i < OGPDrone.HELJobs.length; i++) {
              if (parseFloat(OGPDrone.getJobRatio(OGPItems.jobs[OGPDrone.HELJobs[i]])) > parseFloat(OGPConfig.curRatio) && maxexp >= OGPDrone.getJobExp(OGPItems.jobs[OGPDrone.HELJobs[i]])) {
                OGPDrone.runOneJob(0,0,OGPItems.jobs[OGPDrone.HELJobs[i]]);
                if (parseInt(OGPConfig.curEnergy) > 2000 && parseInt(OGPConfig.curExpNeeded) > 2500 && OGPDrone.BurstMode)
                  OGPDrone.runBurst(0,0,OGPItems.jobs[OGPDrone.HELJobs[i]]);
                return;
              }
            }
          }
          
          if (OGPDrone.runLootJobs) {
            for (var i=0; i < OGPDrone.LootJobs.length; i++) {
              if (parseFloat(OGPDrone.getJobRatio(OGPItems.jobs[OGPDrone.LootJobs[i]])) >= parseFloat(OGPConfig.curRatio) && maxexp >= OGPDrone.getJobExp(OGPItems.jobs[OGPDrone.LootJobs[i]])) {
                OGPDrone.runOneJob(0,0,OGPItems.jobs[OGPDrone.LootJobs[i]]);
                if (parseInt(OGPConfig.curEnergy) > 1500 && parseInt(OGPConfig.curExpNeeded) > 2000 && OGPDrone.BurstMode)
                  OGPDrone.runBurst(0,0,OGPItems.jobs[OGPDrone.LootJobs[i]]);
                return;
              }
            }
          }
          
          // Check for best Vegas job
          var bvj = -1;
          if (OGPDrone.bestVegas == true) {
            for (var i=0; i < OGPItems.jobs.length; i++ ) {
              if (parseInt(OGPItems.jobs[i][0])==4) {
                if (parseInt(OGPItems.jobs[i][8])==0 || OGPDrone.noReqMoney==false) {
                  if (parseInt(OGPItems.jobs[i][9])==0 || OGPDrone.noReqItem==false) {
                    if (parseFloat(OGPDrone.getJobRatio(OGPItems.jobs[i])) >= parseFloat(OGPConfig.curRatio) && maxexp >= OGPDrone.getJobExp(OGPItems.jobs[i])) {
                      if (bvj == -1) 
                        bvj = i;
                      else
                        if (parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[bvj][7])/parseFloat(OGPItems.jobs[bvj][6])) {
                          bvj = i;
                      }
                    }
                  }
                }
              }
            }
          }
          if (bvj != -1) {
            OGPDrone.runOneJob(0,0,new Array(OGPItems.jobs[bvj][0],OGPItems.jobs[bvj][1],OGPItems.jobs[bvj][2]));
            return;
          }
            
          // No special circumstances, find the best job
          var regjob = OGPDrone.findJob(maxeng,maxexp);
          //if (lujob > 0)
          //  regjob = OGPDrone.findJob(maxeng-OGPItems.jobs[lujob][6],maxexp);
          if (regjob >= 0) {
            OGPDrone.runOneJob(0,0,new Array(OGPItems.jobs[regjob][0],OGPItems.jobs[regjob][1],OGPItems.jobs[regjob][2]));
            if (parseInt(OGPConfig.curEnergy) > 1500 && parseInt(OGPConfig.curExpNeeded) > 2000 && OGPDrone.BurstMode)
              OGPDrone.runBurst(0,0,new Array(OGPItems.jobs[regjob][0],OGPItems.jobs[regjob][1],OGPItems.jobs[regjob][2]));
            return;
          }
          
          // No regular job, no jump job, need more energy
          OGPDisplay.setHTML('divDroneStatus','No jobs available to run, waiting for energy or stamina');
          OGPDrone.jobwaittimer = setTimeout("OGPDrone.run(4,0);",30000);
          return;
        } else {
          if (OGPConfig.Session == 0)
            OGPDisplay.addLine('Stopping Drone Runner - Session Timeout',OGPConfig.clrFatal);
          else 
          {
            OGPDisplay.addLine('Stopping based on user selections',OGPConfig.clrAction);
          }
        }
        break;
    }
  
  };
  
  this.runBurst = function(step,index,job) {
    switch(step) {
      case 0:
        var url  = OGPConfig.MWURLAJAX + OGPConfig.urlRunJob;
        url += '&xw_controller=' + OGPDrone.specialcontroller;
        if (OGPDrone.specialcontroller != OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2])
          url += '&no_load=1';
        url += '&xw_city=' + OGPConfig.currentCity;
        url += '&' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][5] + '=' + OGPDrone.currentJob[1];
        url += '&job=' + OGPDrone.currentJob[2];
        url += '&tmp=' + OGPDrone.jobtmpkey;
        if (parseFloat(OGPDrone.expRatio) <= parseFloat(OGPDrone.getJobRatio(OGPDrone.jobPoker)) && (parseInt(OGPDrone.jobsrun) >= 100) || OGPDrone.ChipsDecksOnly || OGPDrone.BeefPokerOnly) {
          for (var i = 0; i < (5-OGPDrone.burstCount); i++) {
            OGPDrone.burstCount++;
            setTimeout("OGPAjax.buildAjax('" + url + "','OGPDrone.runBurst','1,%ix%,0');",i*250);
          }
          break;
        }
        break;
      case 1:
        OGPDrone.burstCount--;
        if (OGPAjax.ajax[index]) {
          var r = OGPAjax.ajax[index].response;
          OGPParser.parseJobResults(r);
          if (res['jobResults'] == 'Completed') {
            // Job ran successfully
            OGPDrone.jobsrun++;
            if (res['jobExtraExp']) {OGPDrone.extraexp++;OGPDrone.totalextraexp+=res['jobExtraExp'];}
            if (res['jobEnergySpent']=='0') OGPDrone.freejobs++;
            if (!isNaN(parseInt(res['jobMoney']))) OGPDrone.totalmoney[OGPItems.getCityIndex(OGPConfig.currentCity)] += parseInt(res['jobMoney']);
            if (!isNaN(parseInt(res['jobExtraMoney']))) {OGPDrone.extramoney++;OGPDrone.totalmoney[OGPItems.getCityIndex(OGPConfig.currentCity)]+=parseInt(res['jobExtraMoney']);}
            // Check the loot
            if (res['jobLoot']) {
              var lindex = -1;
              for (var i = 0; i < OGPDrone.lootitems.length; i++) {
                if (OGPDrone.lootitems[i][1]==res['jobLoot']) 
                  lindex = i;
              }
              if (lindex == -1) {
                OGPDrone.lootitems[OGPDrone.lootitems.length] = new Array(1,res['jobLoot']);
              } else {
                OGPDrone.lootitems[lindex][0] = parseInt(OGPDrone.lootitems[lindex][0]) + 1;
              }
            }
            OGPDrone.tokencount = OGPParser.getSpecificTagValue(r,'token')?OGPParser.getSpecificTagValue(r,'token'):OGPDrone.tokencount;
            OGPDrone.deckcount = OGPParser.getSpecificTagValue(r,'deck')?OGPParser.getSpecificTagValue(r,'deck'):OGPDrone.deckcount;
            // Mark the last100 array with the results
            var tval=0;
            if (res['jobEnergySpent']=='0') tval+=1;
            if (res['jobExtraExp']) tval+=2;
            OGPDrone.last100[OGPDrone.locntr++] = tval;
            if (OGPDrone.locntr == 100) OGPDrone.locntr = 0;
            OGPDrone.updateDroneResults();
          }
        } 
        break;
    }       
  };

  this.runOneJob = function(step,index,job) {
    switch(step) {
      case 0:
        OGPDrone.currentJob = job;
        OGPDisplay.setHTML('divDroneStatus','Running ' + OGPDrone.getJobName(job));
        //if (!confirm('Run job?')) return;
        if (OGPConfig.currentCity != OGPItems.getCityNumByIndex(job[0]))
          OGPTravel.goCity(OGPItems.getCityNumByIndex(job[0]),'OGPDrone.runOneJob(1,0,0)');
        else
          OGPDrone.runOneJob(1,0,0);
        break;
        
      case 1:
        // In the right city, select the job tab
        if (OGPConfig.currentCity == 5 || OGPConfig.currentCity == 6) OGPDrone.curJobTab = -1;
        if (OGPDrone.curJobTab != OGPDrone.currentJob[1]) {
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlSwitchJobTab;
          url += '&xw_city=' + OGPConfig.currentCity;
          url += '&xw_controller=' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2];
          url += '&' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][5] + '=' + OGPDrone.currentJob[1];
          url += '&tmp=' + OGPConfig.tmpkey;
          OGPAjax.buildAjax(url,'OGPDrone.runOneJob','2,%ix%,0');
          OGPDrone.curJobTab = OGPDrone.currentJob[1];
        } else {
          OGPDrone.runOneJob(2,-1,0);
        }
        break;
    
      case 2:
        // On the right tab, run the job
        if (index != -1) {
          OGPDrone.jobtmpkey = OGPParser.setTempKey(OGPAjax.ajax[index].response,'job');
        }
        var url  = OGPConfig.MWURLAJAX + OGPConfig.urlRunJob;
        //url += '&xw_controller=' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2];
        url += '&xw_controller=' + OGPDrone.specialcontroller;
        if (OGPDrone.specialcontroller != OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2])
          url += '&no_load=1';
        url += '&xw_city=' + OGPConfig.currentCity;
        url += '&' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][5] + '=' + OGPDrone.currentJob[1];
        url += '&job=' + OGPDrone.currentJob[2];
        url += '&tmp=' + OGPDrone.jobtmpkey;
        OGPAjax.buildAjax(url,'OGPDrone.runOneJob','3,%ix%,0');
        break;
        
      case 3:
        // Job ran, parse the results
        if (OGPAjax.ajax[index]) {
          var r = OGPAjax.ajax[index].response;
          //e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>' + r;
          //return;
          OGPParser.parseJobResults(r);
          OGPTimers.updateStats(1,index);
          if (res['jobResults'] == 'Completed') {
            // Clear the bad run counter
            OGPDrone.BadJobRunCount = 0;
            // Update the job tempkey
            OGPDrone.jobtmpkey = OGPParser.setTempKey(r,'job')?OGPParser.setTempKey(r,'job'):OGPDrone.jobtmpkey;
            // Job ran successfully
            OGPDrone.jobsrun++;
            if (res['jobExtraExp']) {OGPDrone.extraexp++;OGPDrone.totalextraexp+=res['jobExtraExp'];}
            if (res['jobEnergySpent']=='0') OGPDrone.freejobs++;
            //if (res['jobBadMoney']) OGPDrone.totalmoney[OGPConfig.currentCity]-=res['jobBadMoney'];
            if (!isNaN(parseInt(res['jobMoney']))) OGPDrone.totalmoney[OGPItems.getCityIndex(OGPConfig.currentCity)] += parseInt(res['jobMoney']);
            if (!isNaN(parseInt(res['jobExtraMoney']))) {OGPDrone.extramoney++;OGPDrone.totalmoney[OGPItems.getCityIndex(OGPConfig.currentCity)]+=parseInt(res['jobExtraMoney']);}

            // Check the loot
            if (res['jobLoot']) {
              var lindex = -1;
              for (var i = 0; i < OGPDrone.lootitems.length; i++) {
                if (OGPDrone.lootitems[i][1]==res['jobLoot']) 
                  lindex = i;
              }
              if (lindex == -1) {
                OGPDrone.lootitems[OGPDrone.lootitems.length] = new Array(1,res['jobLoot']);
              } else {
                OGPDrone.lootitems[lindex][0] = '*' + (parseInt(OGPDrone.lootitems[lindex][0]) + 1);
              }
            }
            OGPDrone.tokencount = OGPParser.getSpecificTagValue(r,'token')?OGPParser.getSpecificTagValue(r,'token'):OGPDrone.tokencount;
            OGPDrone.deckcount = OGPParser.getSpecificTagValue(r,'deck')?OGPParser.getSpecificTagValue(r,'deck'):OGPDrone.deckcount;

            // Mark the last100 array with the results
            var tval=0;
            if (res['jobEnergySpent']=='0') tval+=1;
            if (res['jobExtraExp']) tval+=2;
            OGPDrone.last100[OGPDrone.locntr++] = tval;
            if (OGPDrone.locntr == 100) OGPDrone.locntr = 0;

          } else {
            // Unsuccesful job run
            if (res['timeout']) {
              OGPDrone.isRunning = false;
              OGPDisplay.setHTML('divDroneStatus','<font style="color:' + OGPConfig.clrFatal + '">Session has timed out...stopping</font>');
              OGPDisplay.addLine('Session has timed out...stopping drone runner',OGPConfig.clrFatal);
              return;
            } 
            if (r.indexOf('session has timed out') > 0) {
              // Wrong temp key, need a new one
              OGPDisplay.setHTML('divDroneStatus','<font style="color:' + OGPConfig.clrWarning + '">Temp key has expired, attempting to refresh key</font>');
              OGPConfig.currentCity = -1;
              OGPDrone.run(4,0);
              return; 
            }
            if (r.indexOf('need more energy') > 0 && OGPConfig.curEnergy < 100) {
              // Out of energy, wait a while and try again
              OGPDisplay.setHTML('divDroneStatus','Not enough energy...waiting');
              //OGPDrone.jobwaittimer = setTimeout("OGPDrone.run(4,0);",120000);
              return;
            }
            if (res['jobResults']=='Failed') {
              OGPDrone.BadJobRunCount++;
              if (OGPDrone.BadJobRunCount == 3) {
                // Three tries at running the job, mark it unrunnable
                OGPDisplay.addLine('Job failed to run 3 times, marking as unrunnable',OGPConfig.clrAction);
                for (var i=0; i < OGPItems.jobs.length; i++) {
                  if (OGPItems.jobs[i][0] == OGPDrone.currentJob[0] && OGPItems.jobs[i][1] == OGPDrone.currentJob[1] && OGPItems.jobs[i][2] == OGPDrone.currentJob[2]) {
                    OGPItems.jobs[i][6] = 0;
                    OGPItems.jbos[i][7] = 0;
                  }
                }
                OGPDrone.BadJobRunCount = 0;
                // Start over with next job
                OGPDrone.run(4,0);
                return;
              }
              // Job run hung
              OGPDisplay.setHTML('divDroneStatus','<font style="color:' + OGPConfig.clrWarning + '">Job did not run correctly, attempting to recover</font>');

              // Catch for Zynga's Episode 7 locking problem
              if (parseInt(OGPDrone.currentJob[1]) == 8 && parseInt(OGPItems.getCityNum(OGPDrone.currentJob[0]))==4) {
                // Episode 7 got locked probably
                OGPDrone.fix7Lock(0,0);
                break;
              }

              // Reload the city and try again
              var tcity = OGPConfig.currentCity;
              OGPConfig.currentCity = -1;
              //OGPTravel.goCity(tcity,"OGPDrone.run(4,0)");
              OGPDrone.jobwaittimer = setTimeout("OGPDrone.run(4,0);",2000);
              return; 
            }
            // Didn't return Failed, but didn't run
            OGPDrone.BadJobRunCount++;
            if (OGPDrone.BadJobRunCount == 3) {
              // Three tries at running the job, mark it unrunnable
              OGPDisplay.addLine('Job failed to run 3 times, marking as unrunnable',OGPConfig.clrAction);
              for (var i=0; i < OGPItems.jobs.length; i++) {
                if (OGPItems.jobs[i][0] == OGPDrone.currentJob[0] && OGPItems.jobs[i][1] == OGPDrone.currentJob[1] && OGPItems.jobs[i][2] == OGPDrone.currentJob[2]) {
                  OGPItems.jobs[i][6] = 0;
                  OGPItems.jobs[i][7] = 0;
                }
              }
              OGPDrone.BadJobRunCount = 0;
              // Start over with next job
              OGPDrone.run(4,0);
              return;
            }
            OGPDisplay.addLine('Job failed to run correctly - Try #' + OGPDrone.BadJobRunCount,OGPConfig.clrFatal);
            OGPDrone.run(4,0);
            break;
          }

        } else {
          // Really bad result
          OGPDisplay.addLine('Unexpected result...debug',OGPConfig.clrFatal);
          break;
        }
        //OGPDrone.updateDroneResults();
 
        // If this is the 10th job, update the AD Stats
        if (OGPDrone.jobsrun % 10 == 0) 
          OGPDrone.updateADStats(0,0);
          

        // Check to see if the delay needs to be adjusted based on the payouts
        if (parseInt(OGPDrone.jobsrun) >= 100) {
          // Conditions met, figure out the delay
          var tbonus = 0;
          for (var i=0; i < 100; i++) {
            if (this.last100[i] == 1 || this.last100[i] == 3) tbonus += 1.0;
            if (this.last100[i] == 2 || this.last100[i] == 3) tbonus += 0.5;
          }
          var cp=0;
          var cr = (OGPConfig.curExpNeeded-OGPConfig.curExp)/OGPConfig.curEnergy;
          if (tbonus > 0) cp = tbonus/100.0;
          var joben = OGPDrone.getJobEng(OGPDrone.jobBest);
          var jobex = OGPDrone.getJobExp(OGPDrone.jobBest);
          var crun = parseInt(OGPConfig.curEnergy/joben); // Number of jobs we can run
          var eexp = parseInt(crun * (jobex * cp)); // Expected amount of extra energy based on current bonus percentage
          var ttr = crun * ((OGPDrone.cDelay/1000) + .25); // Time it will take to burn energy (1/4 sec per job + delay)
          var eeng = 2 * (ttr/150); // Extra energy gained during run
          var expneeded = OGPConfig.curExpNeeded-OGPConfig.curExp; // Experience needed to level
          var totalexp = eexp + (parseInt(.9 * crun) * jobex); // Total exp gained by burning our energy (90% to give more accurate ratios)
          var expleft = expneeded-totalexp;
          var engleft = OGPConfig.curEnergy-(parseInt(.9 * crun) *joben); // (90% for more accurate ratio)
          var er = expleft/engleft;
          //OGPDisplay.addLine(totalexp + ' ::: ' + expleft + ' ::: ' + engleft + ' ::: ' + er,'#fff');
          
          //var er = ((OGPConfig.curExpNeeded-OGPConfig.curExp)-(((OGPConfig.curEnergy/35)*cp)*OGPDrone.getJobExp(OGPDrone.jobBest)))/(OGPConfig.curEnergy + (2 * (ttr/150)));
          OGPDrone.expRatio = er;
          OGPDrone.cDelay = (er-cr)*50000;
          OGPDrone.cBonus = parseInt(cp*10000)/100;
          
          if (OGPDrone.cDelay < 0) OGPDrone.cDelay = 0;
          // Adjust for ratio below Beef
          if (parseFloat(OGPConfig.curRatio) <= OGPDrone.getJobRatio(OGPDrone.jobBest))
            OGPDrone.cDelay = 0;
          else {
            if (OGPDrone.cDelay > 5000) OGPDrone.cDelay = 5000; // Max 5 second wait
            if (OGPDrone.cDelay > 500 && OGPDrone.AdjustTime)
              OGPDisplay.setHTML('divDroneStatus','Waiting ' + parseInt(OGPDrone.cDelay)/1000 + ' seconds based on bonus ratio');
          }
          if (OGPDrone.AdjustTime) {
            setTimeout("OGPDrone.run(4,0);",OGPDrone.cDelay);
            break;
          }
        }
        // If we're forcing a delay, wait the right number of seconds
        if (OGPDrone.ForceDelay==true) {
          OGPDisplay.setHTML('divDroneStatus','Waiting ' + OGPDrone.ForceDelayVal + ' seconds to run next job');
          setTimeout("OGPDrone.run(4,0);",parseFloat(OGPDrone.ForceDelayVal)*1000);
          break;
        }
        
        // This job has been processed, start the next one
        if (parseInt(OGPConfig.curExpNeeded)-parseInt(OGPConfig.curExp) < 350)
          setTimeout("OGPDrone.run(4,0);",25);
        else
          setTimeout("OGPDrone.run(4,0);",25);
        break;
    }
  
  };

  this.updateADStats = function(step,index) {
    switch (step) {
      case 0:
        // Load the fight page
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlFightList;
        OGPAjax.buildAjax(url,'OGPDrone.updateADStats','1,%ix%');
        break;
        
      case 1:
        var r = OGPAjax.ajax[index].response;
        r = r.replace(/[\r\n|\n|\t|]/g,'');
        OGPDrone.attackStrengthCurrent = OGPParser.getADStats(r,'A');
        OGPDrone.defenseStrengthCurrent = OGPParser.getADStats(r,'D');
        break;
    }
  };
  
  
  this.fix7Lock = function(step,index) {
    switch (step) {
      case 0:
        OGPDisplay.setHTML('divDroneStatus','Level 7 may have locked...attempting to unlock');
        OGPTravel.goCity(1,'OGPDrone.fix7Lock(1,0)');
        break;

      case 1:
        OGPTravel.goCity(4,'OGPDrone.fix7Lock(2,0)');
        break;
                      
      case 2:
        // Select tab 4
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlSwitchJobTab;
        url += '&xw_city=' + OGPConfig.currentCity;
        url += '&xw_controller=' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2];
        url += '&' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][5] + '=4';
        url += '&tmp=' + OGPConfig.tmpkey;
        OGPAjax.buildAjax(url,'OGPDrone.fix7Lock','3,%ix%');
        OGPDrone.curJobTab = OGPDrone.currentJob[1];
        break;

      case 3:
        // Select tab 6
        OGPDisplay.showPage(index,'inner_page');
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlSwitchJobTab;
        url += '&xw_city=' + OGPConfig.currentCity;
        url += '&xw_controller=' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2];
        url += '&' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][5] + '=6';
        url += '&tmp=' + OGPConfig.tmpkey;
        OGPAjax.buildAjax(url,'OGPDrone.fix7Lock','4,%ix%');
        OGPDrone.curJobTab = OGPDrone.currentJob[1];
        break;

      case 4:
        // Select tab 6
        OGPDisplay.showPage(index,'inner_page');
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlSwitchJobTab;
        url += '&xw_city=' + OGPConfig.currentCity;
        url += '&xw_controller=' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2];
        url += '&' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][5] + '=7';
        url += '&tmp=' + OGPConfig.tmpkey;
        OGPAjax.buildAjax(url,'OGPDrone.fix7Lock','5,%ix%');
        OGPDrone.curJobTab = OGPDrone.currentJob[1];
        break;

      case 5:
        // Go back and try to run the real job again
        OGPDisplay.showPage(index,'inner_page');
        OGPDrone.run(4,0);
        break;
    }
  };
  
  this.fightrobck = function(v) {
    e$('ckSTFight').checked = false;
    e$('ckSTRob').checked = false;
    e$('ckSTFightRob').checked = false;
    e$('ckSTRobFight').checked = false;
    switch(v) {
      case 1: e$('ckSTFight').checked = true; break;
      case 2: e$('ckSTRob').checked = true; break;
      case 3: e$('ckSTFightRob').checked = true; break;
      case 4: e$('ckSTRobFight').checked = true; break;
    }
  };

  this.pause = function() {
    OGPDrone.isPaused = true;
    OGPDrone.isburningstamina = false;
    if (OGPDrone.jobwaittimer) clearTimeout(OGPDrone.jobwaittimer);
    OGPDisplay.setHTML('divDroneControl','<a onclick="OGPDrone.resume();">Resume</a>');
  };

  this.resume = function() {
    OGPDisplay.setHTML('divDroneControl','<a onclick="OGPDrone.pause();">Pause</a>');
    OGPDrone.isPaused = false;
    OGPDrone.run(4,0);
  };
  
  this.findJumpJob = function(eng,exp) {
    // Find the biggest job that can be run with the energy
    var goodjob = -1;
    for (var i = 0; i < OGPItems.jobs.length; i++) {
      if (parseInt(OGPItems.jobs[i][6]) > 0 && parseInt(OGPItems.jobs[i][6]) <= parseInt(eng)) {
        if (parseInt(OGPItems.jobs[i][7]) >= parseInt(exp)) {
          if (goodjob == -1)
            goodjob = i;
          else
            if (parseInt(OGPItems.jobs[i][7]) > parseInt(OGPItems.jobs[goodjob][7]))
              goodjob = i;
        }
      }
    } 
    return goodjob;
  };
  
  this.canRunTokenDeck = function(job,eng,exp) {
    // Not with HEL
    if (OGPDrone.runHELJobs || OGPDrone.runLootJobs) return false;
    for (var i=0; i < OGPItems.jobs.length; i++) {
      if (OGPItems.jobs[i][0] == job[0] && OGPItems.jobs[i][1] == job[1] && OGPItems.jobs[i][2]==job[2]) {
        if ((parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6])) >= (parseFloat(exp)/parseFloat(eng))) {
          if (parseFloat(OGPItems.jobs[i][7]*1.5) < parseFloat(exp))
            return i;
        }
      }
    }
    return false;
  };
  
  this.findJob = function(eng,exp) {
    // Find a job for eng or less that won't give back more than exp
    var goodjob = -1;

    if (parseInt(OGPDrone.tokencount) <= parseInt(OGPDrone.deckcount)) {
      var job = OGPDrone.canRunTokenDeck(OGPDrone.jobToken,eng,exp);
      if (job != false) {
        return job;
      } 
    } else {
      var job = OGPDrone.canRunTokenDeck(OGPDrone.jobDeck,eng,exp);
      if (job != false) {
        return job;
      }
    }

    for (var i = 0; i < OGPItems.jobs.length; i++) {
      if (parseInt(OGPItems.jobs[i][6]) > 0 && parseInt(OGPItems.jobs[i][6]) <= parseInt(eng) && (parseFloat(OGPItems.jobs[i][7])*1.5) < parseFloat(exp)) {
        var usejob = true;
        // Skip jobs that require money or consumables if selected
        if (parseInt(OGPItems.jobs[i][8])==1 && OGPDrone.noReqMoney==true) usejob = false;
        if (parseInt(OGPItems.jobs[i][9])==1 && OGPDrone.noReqItem==true) usejob = false; 
        
        // Avoid poker if no chips or decks or ratio is below poker
        if (parseInt(OGPItems.jobs[i][0])==parseInt(OGPDrone.jobPoker[0]) && parseInt(OGPItems.jobs[i][1])==parseInt(OGPDrone.jobPoker[1]) && parseInt(OGPItems.jobs[i][2])==parseInt(OGPDrone.jobPoker[2])) {
          if (parseInt(OGPDrone.deckcount) < parseInt(20) || parseInt(OGPDrone.tokencount) < parseInt(20)) usejob = false;
          if (parseFloat(OGPConfig.curRatio) <= (parseFloat(OGPDrone.getJobRatio(OGPDrone.jobPoker)))) usejob = false;
        }
        if (usejob == true) {
          if (goodjob==-1) {
            goodjob = i;
          }
          else
            if (parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[goodjob][7])/parseFloat(OGPItems.jobs[goodjob][6])) {
              goodjob = i;
            }
        }
      }
    }
    /*
    // If no viable job, run Poker or Settle A Beef if it won't put us over the top
    if (goodjob == -1) {
      if (OGPDrone.deckcount >= 20 && OGPDrone.tokencount >= 20 && exp <= OGPDrone.getJobEng(OGPDrone.jobPoker)) {
        goodjob = OGPDrone.getJobNumber(OGPDrone.jobPoker);
      } 
    }
    if (goodjob == -1) {
      if (exp <= OGPDrone.getJobEng(OGPDrone.jobBest)) {
        goodjob = OGPDrone.getJobNumber(OGPDrone.jobPoker);
      }
    }
    */
    return goodjob;
  }

  this.setBigJump = function() {
    // Set up for the big jump to the next level
    var bEng = parseInt(OGPConfig.curEnergy) - parseInt(OGPDrone.bigjumpeng);
    var bExp = parseInt(OGPConfig.curExpNeeded) - parseInt(OGPConfig.curExp);
    // Try to find a job to run
    var job = OGPDrone.findJob(bEng,bExp);
    if (job >= 0 && bExp > 1) {
      // Run the good job unless we're low on energy
      // *** TODO - Add code to handle waiting to avoid mugging job
      OGPDrone.runOneJob(0,0,new Array(OGPItems.jobs[job][0],OGPItems.jobs[job][1],OGPItems.jobs[job][2]));
    } else { 
      // Only thing left to do is the big job if it gets us there
      if (bEng >= 0 && bExp <= parseInt(OGPItems.jobs[OGPDrone.bigjumpid][7])) {
        OGPDisplay.addLine('Running Big Job - ' + OGPItems.jobs[OGPDrone.bigjumpid][3],OGPConfig.clrAction);
        OGPDrone.runOneJob(0,0,new Array(OGPItems.jobs[OGPDrone.bigjumpid][0],OGPItems.jobs[OGPDrone.bigjumpid][1],OGPItems.jobs[OGPDrone.bigjumpid][2]));
      } else {
        OGPDisplay.addLine('Not enough exp from big job to level, running normal jobs',OGPConfig.clrAction);
        OGPDrone.runOneJob(0,0,OGPDrone.jobBest);
      }
    }
  };
  
  this.getJobName = function(arJob) {
    for (var i=0; i < OGPItems.jobs.length; i++)
      if (OGPItems.jobs[i][0]==arJob[0] && OGPItems.jobs[i][1]==arJob[1] && OGPItems.jobs[i][2]==arJob[2])
        return(OGPItems.jobs[i][3]);
    return ' - Job name not available';
  };
  
  this.getJobNumber = function(arJob) {
    for (var i=0; i < OGPItems.jobs.length; i++)
      if (OGPItems.jobs[i][0]==arJob[0] && OGPItems.jobs[i][1]==arJob[1] && OGPItems.jobs[i][2]==arJob[2]) {
        return(i);
      }
    return -1;
  };
  
  this.getJobRatio = function(arJob) {
    for (var i=0; i < OGPItems.jobs.length; i++)
      if (OGPItems.jobs[i][0]==arJob[0] && OGPItems.jobs[i][1]==arJob[1] && OGPItems.jobs[i][2]==arJob[2]) {
        return(parseFloat((OGPItems.jobs[i][7]/OGPItems.jobs[i][6])*100)/100);
      }
    return 999999;
  };

  this.getJobEng = function(arJob) {
    for (var i=0; i < OGPItems.jobs.length; i++)
      if (OGPItems.jobs[i][0]==arJob[0] && OGPItems.jobs[i][1]==arJob[1] && OGPItems.jobs[i][2]==arJob[2])
        return(parseInt(OGPItems.jobs[i][6]));
    return 0;
  };
  
  this.getJobExp = function(arJob) {
    for (var i=0; i < OGPItems.jobs.length; i++)
      if (OGPItems.jobs[i][0]==arJob[0] && OGPItems.jobs[i][1]==arJob[1] && OGPItems.jobs[i][2]==arJob[2])
        return(parseInt(OGPItems.jobs[i][7]));
    return 0;
  };
  
  this.useSkillPoints = function(step,index) {
    if (OGPDrone.isRunning == false || OGPDrone.isPaused==true) return;
    switch(step) {
      case 0:
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlSpendSkillPoints;
        url += '&upgrade_key=' + OGPDrone.skillToSpend + '&upgrade_amt=';
        if (parseInt(OGPConfig.curSkillPoints) >= 5)
          url += '5';
        else 
          url += '1';
        //for (var i=0; i < 10; i++)
        OGPAjax.buildAjax(url,'OGPDrone.useSkillPoints','1,%ix%');
        break;
      case 1:
        // Skill points spend, update the stats
        OGPTimers.updateStats(1,index);
        if (parseInt(OGPConfig.curSkillPoints) > 0)
          OGPDrone.useSkillPoints(0,0);
        break;
    }
  };
  
  this.spendStamTimeout;
  
  this.spendStamina = function(step,index) {
    // Make sure that we aren't spending when it could cause us to level up accidentally
    if (OGPConfig.curExpNeeded-OGPConfig.curExp < 25 && OGPDrone.stopForLevel==true) {OGPDisplay.setHTML('divDroneStatus','Low stamina, stopping before level up');OGPDrone.isburningstamina=false;return;}
    if (OGPDrone.isRunning == false || OGPDrone.isPaused==true) return;
    switch(step) {
      case 0:
        OGPDisplay.setHTML('divDroneStatus','Using Stamina Before Running Jobs');
        OGPDrone.isburningstamina = true;
        // Check if we're robbing. If so, jump to the other section
        if (OGPDrone.stamRob == true) {
          OGPDrone.spendStamina(10,0);
          return;
        }
        
        if (OGPDrone.stamRobFight == true && parseInt(OGPConfig.curStamina) > parseInt(OGPDrone.FRSwitch)) {
          OGPDrone.spendStamina(10,0);
          return;
        }
        
        if (OGPDrone.stamFightRob == true && parseInt(OGPConfig.curStamina) <= parseInt(OGPDrone.FRSwitch)) {
          OGPDrone.spendStamina(10,0);
          return;
        }
        
        // Check for healing
        if (parseInt(OGPConfig.curHealth) < 25) {
          OGPDrone.spendStamina(1,0);
          return;
        }
          
        if ((OGPDrone.stamFightCity != 7 && parseInt(OGPConfig.curStamina) > 0) || (OGPDrone.stamFightCity == 7 && parseInt(OGPConfig.curStamina) >= 5)) {
          // Travel to the right city and jump to the main loop
          if ((OGPConfig.currentCity != OGPDrone.stamFightCity) && OGPDrone.stamFightCity > 0)
            OGPTravel.goCity(OGPDrone.stamFightCity,"OGPDrone.spendStamina(3,0)");
          else
            OGPDrone.spendStamina(3,0);
        } else {
          OGPDrone.isburningstamina = false;
        }
        break;
      
      case 1:
        if (OGPConfig.curExpNeeded-OGPConfig.curExp < 25 && OGPDrone.stopForLevel == true) {OGPDisplay.setHTML('divDroneStatus','Stopping before level up');OGPDrone.isburningstamina=false;return;}
        // Heal in the heal city
        
        if ((OGPConfig.currentCity != OGPDrone.stamHealCity) && OGPDrone.stamHealCity > 0) {
          OGPTravel.goCity(OGPDrone.stamHealCity,"OGPDrone.spendStamina(1,0)");
        } else {
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlHeal + '&xw_city=' + OGPConfig.currentCity;
          OGPAjax.buildAjax(url,'OGPDrone.spendStamina','2,%ix%');
        }
        break;
        
      case 2:
        // See if we healed
        if (OGPAjax.ajax[index]) {
          OGPTimers.updateStats(1,index);
          var r = OGPAjax.ajax[index].response;
          if (parseInt(OGPConfig.curHealth) < 25) {
            // Couldn't heal, wait 15 seconds and try again
            OGPDisplay.setHTML('divDroneStatus','Can\'t heal yet, waiting...');
            setTimeout('OGPDrone.spendStamina(1,0)',15000);
            return; 
          }
          // Healed, start over
          OGPDrone.spendStamina(0,0);
        } else {
          // No response from the call, try again in 15 seconds
          setTimeout('OGPDrone.spendStamina(1,0)',15000);
        }
        break;
          
      case 3:
        // Load the fight page and look for someone to attack
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlFightList;
        OGPAjax.buildAjax(url,'OGPDrone.spendStamina','4,%ix%');
        break; 
      
      case 4:
        var r = OGPAjax.ajax[index].response;
        OGPParser.getFightList(r);
        // Check for someone on the fightlist to attack
        var i = OGPParser.getAttackTarget(1,OGPDrone.fightLevel,1,OGPDrone.fightMafia,OGPDrone.FIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          OGPDisplay.setHTML('divDroneStatus','No matches on fight list, waiting 10 seconds');
          setTimeout('OGPDrone.spendStamina(0,0)',10000);
          return; 
        }
        // Have someone to attack, try once
        OGPDrone.curFightIndex = i;
        OGPDisplay.setHTML('divDroneStatus','Attacking ' + OGPConfig.curFightList[i][0] + '&nbsp;' + OGPConfig.curFightList[i][2] + ' - Level ' + OGPConfig.curFightList[i][3] + ' - Mafia Size ' + OGPConfig.curFightList[i][4]);
        var url = OGPConfig.MWROOTPATH + '?' + OGPConfig.urlAttack;
        url += '&xw_city=' + OGPConfig.curFightList[i][5];
        OGPAjax.buildAjax(url,'OGPDrone.spendStamina','5,%ix%');
        break;

      case 5:
        // Title, UserID, Name, Level, Mafia, tmpkey, iced, available
        var r = OGPAjax.ajax[index].response;
        r = r.replace(/[\r\n|\n|\t]/g,'');
        // Clear the timeout
        if (OGPDrone.spendStamTimeout) clearTimeout(OGPDrone.spendStamTimeout);
        OGPTimers.updateStats(1,index);
        if (r.indexOf('You Won!') > 0) {
          // Won the fight, update the counters and see if we can fight again
          // Check if it was a power attack
          if (r.indexOf('Win:') > 0) {
            OGPDrone.fightwins += parseInt(r.substr(r.indexOf('Win:')+4));
          } else {
            OGPDrone.fightwins++;
          }
          OGPDisplay.setHTML('divDroneFightLoss','L: ' + OGPDrone.fightlosses);
          OGPDisplay.setHTML('divDroneFightWin','W: ' + OGPDrone.fightwins);
          // Check for money
          var me = OGPParser.getFightMoney(r);
          if (parseInt(me[2]) > 0) {
            for (var i=0; i < OGPItems.cities.length;i++) {
              if (OGPItems.cities[i][6] == me[0]+me[1]) 
                OGPDrone.totalmoney[i] += parseInt(me[2]);
            }
          }
          // Check for loot
          var tla = OGPParser.getFightLoot(r);
          if (tla.length > 0) {
            for (var i=0; i < tla.length; i++) {
              var lindex = -1;
              for (var j = 0; j < OGPDrone.lootitems.length; j++) {
                if (OGPDrone.lootitems[j][1]==tla[i][1]) 
                  lindex = j;
              }
              try {
                if (lindex == -1) {
                  OGPDrone.lootitems[OGPDrone.lootitems.length] = new Array(tla[i][0],tla[i][1]);
                } else {
                  OGPDrone.lootitems[lindex][0] = '*' + (parseInt(OGPDrone.lootitems[lindex][0]) + parseInt(tla[i][0]));
                }
              } catch(err) {}
            }
          }
          // Get current A/D
          OGPDrone.attackStrengthCurrent = OGPParser.getADStats(r,'A');
          OGPDrone.defenseStrengthCurrent = OGPParser.getADStats(r,'D');
          OGPDrone.updateDroneResults();

          // Check stamina remaining
          if (OGPConfig.curStamina <= 0 || OGPConfig.curExpNeeded-OGPConfig.curExp < 25) {
            if (OGPConfig.curStamina > 0)
              OGPDisplay.setHTML('divDroneStatus','All Stamina used...Stopping');
            else
              OGPDisplay.setHTML('divDroneStatus','Stopping before level up');
            OGPDrone.isburningstamina = false;
            return;
          }
          
          // Check to see if we need to switch
          if (OGPDrone.stamRobFight == true && parseInt(OGPConfig.curStamina) > parseInt(OGPDrone.FRSwitch)) {
            OGPDrone.spendStamina(10,0);
            return;
          }
        
          if (OGPDrone.stamFightRob == true && parseInt(OGPConfig.curStamina) <= parseInt(OGPDrone.FRSwitch)) {
            OGPDrone.spendStamina(10,0);
            return;
          }
          
          // Check health
          if (OGPConfig.curHealth < 25) {
            // Start over with the health check
            OGPDrone.spendStamina(0,0);
            return;
          }
          if (r.indexOf('power_attack') > 0) {
            // Power attack
            var s = r.indexOf('power_attack');
            while (r.substr(s,1) != '?') s--;
            var e = r.indexOf('"',s);
            var url = OGPConfig.MWROOTPATH + r.substr(s,e-s);
            setTimeout("OGPAjax.buildAjax('" + url + "','OGPDrone.spendStamina','5,%ix%')",OGPDrone.FDelay*1000);
          } else {
            // No longer alive, get a new target
            OGPConfig.curFightList[OGPDrone.curFightIndex][7] = 0;
            setTimeout("OGPDrone.spendStamina(6,0);",OGPDrone.FDelay*1000);
          }
        } else if (r.indexOf('You Lost!') > 0) {
          OGPDrone.fightlosses++;
          OGPDisplay.setHTML('divDroneFightLoss','L: ' + OGPDrone.fightlosses);
          OGPDisplay.setHTML('divDroneFightWin','W: ' + OGPDrone.fightwins);
          OGPConfig.curFightList[OGPDrone.curFightIndex][7] = 0;
          if (OGPConfig.curStamina > 0 && (OGPConfig.curExpNeeded-OGPConfig.curExp > 25 || OGPDrone.stopForLevel==false)) {
            // Find a new target
            setTimeout("OGPDrone.spendStamina(6,0);",OGPDrone.FDelay*1000);
          } else {
            // All stamina gone, set the flag
            OGPDrone.isburningstamina = false;
            return;
          }
          
        } else {
          // Bad response, start over
          OGPDrone.spendStamina(0,0);
        }
        break;
        
      case 6: 
                
        var i = OGPParser.getAttackTarget(1,OGPDrone.fightLevel,1,OGPDrone.fightMafia,OGPDrone.FIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          OGPDisplay.setHTML('divDroneStatus','No matches on fight list, waiting 10 seconds');
          setTimeout('OGPDrone.spendStamina(0,0)',10000);
          return; 
        }
        // Have someone to attack, try once
        OGPDrone.curFightIndex = i;
        OGPDisplay.setHTML('divDroneStatus','Attacking ' + OGPConfig.curFightList[i][0] + '&nbsp;' + OGPConfig.curFightList[i][2] + ' - Level ' + OGPConfig.curFightList[i][3] + ' - Mafia Size ' + OGPConfig.curFightList[i][4]);
        var url = OGPConfig.MWROOTPATH + '?' + OGPConfig.urlAttack;
        url += '&xw_city=' + OGPConfig.curFightList[i][5];
        OGPAjax.buildAjax(url,'OGPDrone.spendStamina','5,%ix%');
        break;
        
      case 10: // Robbing section
        // If stamina is too low, just bail

        if (OGPConfig.curStamina < 5) {
          OGPDrone.isburningstamina = false;
          break;
        }
        
        // If we're not in the robbing city, go back there
        if (parseInt(OGPDrone.stamRobCity) != 0) {
          if (parseInt(OGPConfig.currentCity) != parseInt(OGPDrone.stamRobCity)) {
            OGPTravel.goCity(OGPDrone.stamRobCity,'OGPDrone.spendStamina(10,0)');
            break;
          }
        }
        
        // Set the timeout to reset flag to false to keep from hanging
        OGPDrone.spendStamTimeout = setTimeout("OGPDrone.isburningstamina=false;",15000);
        // Load the robbing page
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlLoadRobbing;
        url += '&xw_city=' + OGPConfig.currentCity;
        OGPAjax.buildAjax(url,'OGPDrone.spendStamina','11,%ix%');
        break;
        
      case 11:
        if (OGPDrone.isRunning == false) {
          break;
        }
        var r = OGPAjax.ajax[index].response;
        OGPTimers.updateStats(1,index);
        // Load the robbing array
        OGPDrone.arNoStamina = false;
        for (var i=0; i < 9; i++) {
          OGPDrone.arRobSpots[i] = null;
          var s = r.indexOf('id="rob_slot_' + i);
          var e = r.indexOf('id="rob_slot_' + (i+1));
          if (e < 0) e = r.length;
          var tstr = r.substr(s,e-s);
          var diff = 'Easy';
          if (tstr.indexOf('rob_difficulty_medium') > 0) diff = "Medium";
          if (tstr.indexOf('rob_difficulty_hard') > 0) diff = "Hard";
          var prop = OGPParser.getValueInTags(tstr,'class="rob_prop_name"',1);
          if (prop.indexOf('<') >= 0) {
            var s = prop.indexOf('<');
            var e = prop.indexOf('>');
            if (s > 0)
              prop = prop.substr(0,s)+prop.substr(e+1);
            else
              prop = prop.substr(e+1);
          }
          var robbed = false;
          if (tstr.indexOf('rob_prop_img_robbed') > 0) robbed = true;
          if (tstr.indexOf('rob_prop_img_failed') > 0) robbed = true;
          var outcome = '';
          var cost = 0;
          var msize = 0;
          if (robbed == true) {
            if (tstr.indexOf('SUCCESS!') > 0) {
              outcome = 'Success';
            } else {
              outcome = 'Failed';
            }
          } else {
            msize = OGPParser.getValueInTags(tstr,'title="Mafia Size"',0);
            cost = OGPParser.getValueInTags(tstr,'title="Stamina Used"',0);            
          }
          
          OGPDrone.arRobSpots[i] = new Array(prop,diff,outcome,cost,msize);
        }
        var cs = OGPConfig.curStamina;
        var numrun = 0;
        var norun = 0;
        for (var i=0; i < 9; i++) {
          if (parseInt(OGPDrone.arRobSpots[i][3]) <= cs && parseInt(OGPDrone.arRobSpots[i][3]) != 0) {
            if (OGPDrone.arRobSpots[i][2]=='') {
              cs -= parseInt(OGPDrone.arRobSpots[i][3]);
              numrun++;
              var url = OGPConfig.MWURLAJAX + OGPConfig.urlRunRobbing;
              url += '&slot=' + i + '&xw_city=' + OGPConfig.currentCity;
              setTimeout("OGPAjax.buildAjax('" + url + "','OGPDrone.spendStamina','12,%ix%');",i*OGPDrone.RobDelay);
            } 
          } else {
            if (OGPDrone.arRobSpots[i][2]=='') {
              OGPDrone.arRobSpots[i][2]='Low Stamina';
              OGPDrone.arNoStamina = true;
            }
          }
        }
        if (numrun == 0) {
          // Could be first time in with no properties
          var hasstam = false;
          var all0 = true;
          for (var i = 0; i < 9; i++) {
            if (parseInt(OGPConfig.curStamina) >= parseInt(OGPDrone.arRobSpots[i][3]) && parseInt(OGPDrone.arRobSpots[i][3]) > 0)
              hasstam = true;
            if (parseInt(OGPDrone.arRobSpots[i][3]) > 0)
              all0 = false;
          }
          if (hasstam || all0) {
            // Get new properties\
            var url = OGPConfig.MWURLAJAX + OGPConfig.urlRobRefresh;
            url += '&xw_city=' + OGPConfig.currentCity;
            OGPAjax.buildAjax(url,'OGPDrone.spendStamina','11,%ix%');
            break;
          } else {
            OGPDrone.arNoStamina = true;          
          }
        }
        if (OGPDrone.arNoStamina == true) {
          OGPDrone.isburningstamina = false;
        }
        break;
        
      case 12:
        var r = OGPAjax.ajax[index].response;
        OGPParser.getStatsFromPage(r);
        r = r.replace(/[\r\n|\n|\t]/g,'');
        if (r.indexOf('SUCCESS!') > 0) OGPDrone.robwins++;
        if (r.indexOf('FAILED') > 0) OGPDrone.roblosses++;
        var s = r.indexOf('openSlot(');
        var slot = parseInt(r.substr(s+9));
        var res = OGPParser.getValueInTags(r,'"rob_res_outcome ',0);
        OGPDrone.arRobSpots[slot][2] = res;

        // Check for money
        var me = OGPParser.getRobbingMoney(r);
        if (parseInt(me[2]) > 0) {
          for (var i=0; i < OGPItems.cities.length;i++) {
            if (OGPItems.cities[i][6] == me[0]+me[1]) 
              OGPDrone.totalmoney[i] += parseInt(me[2]);
          }
        }
        
        var tla = OGPParser.getRobLoot(r);
        if (tla.length > 0) {
          for (var i=0; i < tla.length; i++) {
            var lindex = -1;
            for (var j = 0; j < OGPDrone.lootitems.length; j++) {
              if (OGPDrone.lootitems[j][1]==tla[i][1]) 
                lindex = j;
            }
            try {
              if (lindex == -1) {
                OGPDrone.lootitems[OGPDrone.lootitems.length] = new Array(tla[i][0],tla[i][1]);
              } else {
                OGPDrone.lootitems[lindex][0] = '*' + (parseInt(OGPDrone.lootitems[lindex][0]) + parseInt(tla[i][0]));
              }
            } catch(err) {}
          }
        }
        OGPDrone.updateDroneResults();
        
        // If all spots are done, get new targets
        var done = true;
        for (var i=0; i < 9; i++)
          if (OGPDrone.arRobSpots[i][2] == '')
            done = false;
        if (done && !OGPDrone.arNoStamina) {
          // Check for switching to fighting
          if (OGPDrone.stamRobFight == true && parseInt(OGPConfig.curStamina) <= parseInt(OGPDrone.FRSwitch)) {
            OGPDrone.spendStamina(0,0);
            if (OGPDrone.spendStamTimeout) clearTimeout(OGPDrone.spendStamTimeout);
            return;
          }
        
          if (OGPDrone.stamFightRob == true && parseInt(OGPConfig.curStamina) > parseInt(OGPDrone.FRSwitch)) {
            OGPDrone.spendStamina(0,0);
            if (OGPDrone.spendStamTimeout) clearTimeout(OGPDrone.spendStamTimeout);
            return;
          }

          for (var i = 0; i < 9; i++) OGPDrone.arRobSpots[i][2]='';
          // Get new properties
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlRobRefresh;
          url += '&xw_city=' + OGPConfig.currentCity;
          OGPAjax.buildAjax(url,'OGPDrone.spendStamina','11,%ix%');
        }
        break;
        
    }
  };
  
  this.updateDroneResults = function() {
    OGPDisplay.setHTML('divDroneJobsRun',OGPDisplay.setGoodColor(OGPDrone.jobsrun));
    var tval = parseInt((OGPDrone.freejobs/OGPDrone.jobsrun)*10000)/100;
    if (isNaN(tval)) tval = 0;
    OGPDisplay.setHTML('divDroneFreeJobs',OGPDisplay.setGoodColor(OGPDrone.freejobs) + ' (' + tval + '%)');
    tval = parseInt((OGPDrone.extraexp/OGPDrone.jobsrun)*10000)/100;
    if (isNaN(tval)) tval = 0;
    OGPDisplay.setHTML('divDroneExtraExp',OGPDisplay.setGoodColor(OGPDrone.extraexp) + ' for ' + OGPDisplay.setGoodColor(OGPDrone.totalextraexp) + ' (' + tval + '%)');
    OGPDisplay.setHTML('divDroneExtraMoney',OGPDisplay.setGoodColor(OGPDrone.extramoney));
    var txt = '';
    for (var i=0; i < OGPItems.cities.length; i++) {
        txt += OGPItems.cities[i][6] + OGPDrone.totalmoney[i] + '&nbsp;&nbsp;&nbsp;';
    }
    OGPDisplay.setHTML('divDroneTotalMoney',OGPDisplay.setGoodColor(txt));
    var txt = '';
    for (var i=0; i < OGPDrone.lootitems.length; i++) {
      var t = OGPDrone.lootitems[i][0].toString();  if (t==null)t='  ';
      if (t.substr(0,1)=='*') {
        t = t.substr(1);
        OGPDrone.lootitems[i][0] = OGPDrone.lootitems[i][0].toString().substr(1);
        txt += OGPDrone.lootitems[i][1] + ' (<font style="color:#ffff00">x' + t + '</font>)';
      }
      else
        txt += OGPDrone.lootitems[i][1] + ' (x' + OGPDrone.lootitems[i][0] + ')';
      if (i < OGPDrone.lootitems.length-1) txt += ' - ';
    }
    OGPDisplay.setHTML('divDroneLoot',OGPDisplay.setGoodColor(txt));
    OGPDisplay.setHTML('divDroneLevels',OGPDisplay.setGoodColor(parseInt(OGPConfig.curLevel)-parseInt(OGPDrone.startinglevel)));
    OGPDisplay.setHTML('divDroneExpNeeded',OGPDisplay.setGoodColor(OGPConfig.curExpNeeded-OGPConfig.curExp));
    OGPDisplay.setHTML('divDroneEngLeft',OGPDisplay.setGoodColor(OGPConfig.curEnergy));
    OGPDisplay.setHTML('divDroneStamLeft',OGPDisplay.setGoodColor(OGPConfig.curStamina));
    if (parseFloat(OGPConfig.curRatio) >= 0)
      OGPDisplay.setHTML('divDroneCurRatio',OGPDisplay.setGoodColor(OGPConfig.curRatio));
    else
      OGPDisplay.setHTML('divDroneCurRatio','Waiting...');
    var bonusText = '<font style="color:#ff0000">' + OGPDrone.cBonus + '%</font>';
    if (parseFloat(OGPDrone.cBonus) >= 6.0) bonusText = '<font style="color:#ffff00">' + OGPDrone.cBonus + '%</font>';
    if (parseFloat(OGPDrone.cBonus) >= 10.0) bonusText = '<font style="color:#00ff00">' + OGPDrone.cBonus + '%</font>';
    if (parseFloat(OGPDrone.expRatio) >= OGPDrone.getJobRatio(OGPDrone.jobPoker))
      OGPDisplay.setHTML('divDroneExpRatio',OGPDisplay.setGoodColor(parseInt(OGPDrone.expRatio*100)/100) + ' (' + bonusText + ')');
    else  
      OGPDisplay.setHTML('divDroneExpRatio',OGPDisplay.setGoodColor('Level Up') + ' (' + bonusText + ')');
    OGPDisplay.setHTML('divDroneTokens',OGPDisplay.setGoodColor(OGPDrone.tokencount));
    OGPDisplay.setHTML('divDroneDecks',OGPDisplay.setGoodColor(OGPDrone.deckcount));
    
    var t = OGPDisplay.setGoodColor(OGPDrone.attackStrengthCurrent);
    var dif = OGPDrone.attackStrengthCurrent - OGPDrone.attackStrength;
    if (dif < 0) t += '&nbsp;' + OGPDisplay.setBadColor('(' + dif + ')');
    if (dif > 0) t += '&nbsp;' + OGPDisplay.setGoodColor('(+' + dif + ')');
    OGPDisplay.setHTML('divDroneAttack',t);
    var t = OGPDisplay.setGoodColor(OGPDrone.defenseStrengthCurrent);
    var dif = OGPDrone.defenseStrengthCurrent - OGPDrone.defenseStrength;
    if (dif < 0) t += '&nbsp;' + OGPDisplay.setBadColor('(' + dif + ')');
    if (dif > 0) t += '&nbsp;' + OGPDisplay.setGoodColor('(+' + dif + ')');
    OGPDisplay.setHTML('divDroneDefense',t);
    OGPDisplay.setHTML('divDroneRobLoss','L: ' + OGPDrone.roblosses);
    OGPDisplay.setHTML('divDroneRobWin','W: ' + OGPDrone.robwins);

  };
  
};

/***************************************
  Player/Account Functions
****************************************/
function ogpAccountDef() {

  this.topmafia = new Array('Mastermind','mastermind','Wheelman','wheelman','Button Man','buttonman','Bodyguard','bodyguard','Safecracker','safecracker','Bagman','bagman');
  this.skills = new Array('attack','Attack','defense','Defense','max_health','Health','max_stamina','Stamina','max_energy','Energy');

  this.skillQty=0;
  this.skillCat='';
  this.skillStart = 0;

  this.currentMafia = new Array();
  this.friends = new Array();
  this.friendCount;
  
  this.accountcurcity;
  this.ares='';
  this.swpn=0;
  this.sarm=0;
  this.sveh=0;
  this.sspc=0;
  this.sani=0;
  this.shid=0;
  this.spre=0;
  this.endlist=0;
  this.ewpn=0;
  this.earm=0;
  this.eveh=0;
  this.espc=0;
  this.eani=0;
  this.ehid=0;
  this.epre=0;

  this.account = {
    name:'',
    title:'',
    skills:new Array(),
    level:0,
    mafiasize:0,
    stats:new Array(),
    hiddenloot:new Array(),
    specialloot:new Array(),
    preploot:new Array(),
    weapons:new Array(),
    armor:new Array(),
    vehicles:new Array(),
    animals:new Array(),
    boosts:new Array(),
    achievements:new Array(),
    fightattack:0,
    fightdefense:0
    
  };
  
  this.mafiaindex = 0;
  this.myMafia = function(step,index) {
    switch(step) {
      case 0:
        OGPAccount.mafiaindex = 0;
        var txt = '';
        txt += '<div style="text-align:center;">This function will go through your mafia family and retrieve all of the ';
        txt += 'information to cross-reference their account with their<br>Facebook profile ';
        txt += 'plus other MW account data.  It will be listed in a table that can be saved ';
        txt += 'to your computer for easy reference.<br><br>';
        txt += 'There will be some entries where the FB call doesn\'t return a name, this is normal ';
        txt += 'and the name will have to be filled in manually.<br><br>'; 
        txt += '<a onclick="OGPAccount.myMafia(1,0);">Click here to get started</a></div>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;
        
      case 1:
        OGPDisplay.setHTML('divOGPSetup','Loading mafia page...');
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlRecruit + '&xw_city=' + OGPConfig.currentCity + '&tmp=' + OGPConfig.tmpkey;
        OGPAjax.buildAjax(url,'OGPAccount.myMafia','2,%ix%'); 
        break;
        
      case 2:
        if (OGPAjax.ajax[index]) {
          var r = OGPAjax.ajax[index].response;
          if (r.indexOf('exclude_ids="') > 0) {
            var s = r.indexOf('exclude_ids="');
            s+=13;
            var str = '';
            while (r.substr(s,1) != '"') str+=r.substr(s++,1);
            OGPAccount.currentMafia = str.split(',');
            OGPAccount.myMafia(3,0);
            break;
          }
        }
        OGPDisplay.clearSetup();
        OGPDisplay.setHTML('divOGPResults','Could not retrieve mafia list...stopping');
        break;
        
      case 3:
        // Set up the table
        var txt = '';
        txt += '<b>My Mafia</b><br>';
        txt += '<table align="center" cellpadding="1" cellspacing="0" id="tblMafia" name="tblMafia">';
        txt += '<tr><th>Facebook ID</th><th>MW ID</th><th>Facebook Name</th><th>MW Name</th>';
        txt += '<th>Title</th><th>Level</th><th>Jobs Run</th><th>Fights Won</th><th>Fights Lost</th><th>Robbing Wins</th><th>Robbing Losses</th><th>Gifts Sent</th>';
        txt += '</table>';
        OGPDisplay.setHTML('divOGPResults',txt);
        // Start getting information
        OGPAccount.myMafia(4,0);
        break;
        
      case 4:
        // See if the user stopped it
        if (e$('tblMafia')==null) return;
        
        if (OGPAccount.mafiaindex < OGPAccount.currentMafia.length) {
          // Get the mafia info for this user
          OGPDisplay.setHTML('divOGPSetup',OGPAccount.mafiaindex + '/' + OGPAccount.currentMafia.length + ' - Loading information for user ' + OGPAccount.currentMafia[OGPAccount.mafiaindex]);
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlProfile + '&xw_city=' + OGPConfig.currentCity + '&user=' + OGPAccount.currentMafia[OGPAccount.mafiaindex];
          OGPAjax.buildAjax(url,'OGPAccount.myMafia','5,%ix%');
        } else {
          OGPDisplay.setHTML('divOGPSetup','All Mafia Family information loaded');
        }
        break;
        
      case 5:
        if (OGPAjax.ajax[index]) {
          var r = OGPAjax.ajax[index].response;
          // Parse out the mafia information
          var fbid=OGPAccount.currentMafia[OGPAccount.mafiaindex];
          var tmp = OGPParser.getValueInTags(r,'<div class="title"',0);
          tmp = tmp.split('"');
          var mwname = tmp[1];
          var title = tmp[0];
          tmp = tmp[2].split(' ');
          var level = tmp[2];
          var s = r.indexOf('class="main_table stats"');
          s = r.indexOf('Jobs Completed',s);
          var jobs = OGPParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('Fights Won',s);
          var fightsw = OGPParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('Fights Lost',s);
          var fightsl = OGPParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('Robbing Wins',s);
          var robw = OGPParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('Robbing Losses',s);
          var robl = OGPParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('Gifts sent',s);
          var gifts = OGPParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('target_id=') + 10;
          var e = s; while (r.substr(e,1) != '"') e++;
          var mwid = r.substr(s,e-s).replace('%7C','|');
          // Trap for own account or other erros
          if (mwid.indexOf('Current Page') < 0) {
            // Add the info to the table
            var rowcount = document.getElementById('tblMafia').rows.length;
            var row = document.getElementById('tblMafia').insertRow(rowcount);
            var cell = row.insertCell(0); cell.innerHTML=fbid;
            var cell = row.insertCell(1); cell.innerHTML=mwid;
            var cellname = row.insertCell(2); 
            var cell = row.insertCell(3); cell.innerHTML=mwname;
            var cell = row.insertCell(4); cell.innerHTML=title;
            var cell = row.insertCell(5); cell.innerHTML=level;
            var cell = row.insertCell(6); cell.innerHTML=jobs;
            var cell = row.insertCell(7); cell.innerHTML=fightsw;
            var cell = row.insertCell(8); cell.innerHTML=fightsl;
            var cell = row.insertCell(9); cell.innerHTML=robw;
            var cell = row.insertCell(10); cell.innerHTML=robl;
            var cell = row.insertCell(11); cell.innerHTML=gifts;
            // Load the FB information
            var qry = "SELECT uid,name FROM user WHERE uid=" + OGPAccount.currentMafia[OGPAccount.mafiaindex];
            FB.Facebook.apiClient.fql_query(qry,
              function(rows) {
                if (rows.length > 0) {
                  cellname.innerHTML = rows[0].name;
                } 
            });
          }
        }
        OGPAccount.mafiaindex++;
        OGPAccount.myMafia(4,0);
        break;
        
    }
        
  };
  
  this.arInventory = new Array();
  this.myInventory = function(step,index) {
    switch(step) {
      case 0:
        var txt = 'Please wait, loading inventory information...<Br>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlLootListPage;
        url += '&xw_city=' + OGPConfig.currentCity;
        OGPAjax.buildAjax(url,'OGPAccount.myInventory','1,%ix%');
        break;
    
      case 1:
        var r = OGPAjax.ajax[index].response;
        var s = r.indexOf('var Items');
        s = r.indexOf('data:',s) + 6;
        var e = r.indexOf('var InventorySearch',s);
        r = r.substr(s,e-s);
        // Get the items
        var regexitem = /\{[^}]+\}/g;
        var match = regexitem.exec(r);
        regexitem.lastIndex=0;
        OGPAccount.arInventory.length = 0;
        while (rmatch = regexitem.exec(r)) {
          OGPAccount.arInventory[OGPAccount.arInventory.length] = rmatch[0];
        }
        OGPDisplay.setHTML('divOGPSetup','Parsing inventory information');
        setTimeout('OGPAccount.myInventory(2,0)',100);
        break;
        
      case 2:
        var regexsplit = /".+?":"?.+?"?[,\}]/g;
        var item;
        for (var i=0; i < OGPAccount.arInventory.length; i++) {
          var tval = OGPAccount.arInventory[i];
          OGPAccount.arInventory[i] = new Array();
          while (item = regexsplit.exec(tval)) {
            var t = item[0].replace(new RegExp ('[",]','gi'),'');
            t = t.substr(t.indexOf('{')+1);
            t = t.split(':');
            switch(t[0]) {
              case 'id':OGPAccount.arInventory[i][0] = t[1];break;
              case 'name':OGPAccount.arInventory[i][1] = t[1];break;
              case 'attack':OGPAccount.arInventory[i][2] = t[1];break;
              case 'defense':OGPAccount.arInventory[i][3] = t[1];break;
              case 'quantity':OGPAccount.arInventory[i][4] = t[1];break;
              case 'equipped_offense':OGPAccount.arInventory[i][5] = t[1];break;
              case 'equipped_defense':OGPAccount.arInventory[i][6] = t[1];break;
              case 'type':OGPAccount.arInventory[i][7] = t[1];break;
              case 'tradeable':OGPAccount.arInventory[i][8] = t[1];break;
              case 'quality':OGPAccount.arInventory[i][9] = t[1];break;
              case 'gift_link':OGPAccount.arInventory[i][10] = t[1];break;
              case 'wishlist':OGPAccount.arInventory[i][11] = t[1];break;
              case 'location':OGPAccount.arInventory[i][12] = t[1];break;
              case 'subtype':OGPAccount.arInventory[i][13] = t[1];break;
            }
          }
        }
        OGPDisplay.clearSetup();
        setTimeout('OGPAccount.myInventory(3,0)',100);
        break;
        
      case 3:
        var txt = '';
        txt += '<table style="width:600px;" id="tblInventory" id="tblInventory">';
        txt += '<tr>';
        txt += '<th style="cursor:pointer;background-color:green;border:1px solid #fff;" id="invHdrTab1" name="invHdrTab1" onclick="OGPAccount.invTab(1);">Used Equipment</th>';
        txt += '<th style="cursor:pointer;border:1px solid #fff;" id="invHdrTab2" name="invHdrTab2" onclick="OGPAccount.invTab(2);">Consumables</th>';
        txt += '<th style="cursor:pointer;border:1px solid #fff;" id="invHdrTab3" name="invHdrTab3" onclick="OGPAccount.invTab(3);">Unused Equipment</th>';
        txt += '<th style="cursor:pointer;border:1px solid #fff;" id="invHdrTab4" name="invHdrTab4" onclick="OGPAccount.invTab(4);">Unowned Equipment</th>';
        txt += '</tr></table>';
        txt += '<div id="invTab1" name="invTab1" style="display:block">';
        txt += '<table><tr><td valign="top">Attack';
        txt += '<div id="invEq1" name="invEq1"></div>';
        txt += '</td><td valign="top">Defense';
        txt += '<div id="invEq2" name="invEq2"></div>';
        txt += '</td></tr></table>';
        txt += '</div>';
        txt += '<div id="invTab2" name="invTab2" style="display:none;">';
        txt += '</div>';
        txt += '<div id="invTab3" name="invTab3" style="display:none;">';
        txt += '</div>';
        txt += '<div id="invTab4" name="invTab4" style="display:none;">';
        txt += '</div>';
        txt += '</table>';
        OGPDisplay.setHTML('divOGPResults',txt);
        OGPAccount.invSort('A');
        OGPAccount.invShowEquipment(1);
        OGPAccount.invSort('D');
        OGPAccount.invShowEquipment(2);
        OGPAccount.invShowConsumables();
        OGPAccount.invSort('N');
        OGPAccount.invShowUnusedEquipment();
        OGPAccount.invShowUnownedEquipment();
        
    }
  };
  
  this.invShowConsumables = function() {
    var txt = '';
    txt += '<table id="tblInvEquip" name="tblInvEquip" style="border:1px solid #fff;">';
    txt += '<tr>';
    txt += '<th>Qt.</th>';
    txt += '<th>Consumable</th>';
    txt += '<th>Gift</th>';
    txt += '</tr>';
    OGPAccount.invSort('N');
    for (var i=0; i < OGPAccount.arInventory.length; i++) {
      if (OGPAccount.arInventory[i][7]==4 && OGPAccount.arInventory[i][4] > 0) {
        txt += '<tr>';
        txt += '<td>' + OGPAccount.arInventory[i][4] + '</td>'; 
        txt += '<td>' + OGPAccount.arInventory[i][1] + '</td>'; 
        txt += '<td>';
        if(OGPAccount.arInventory[i][8]==1) 
          txt += 'Y';
        else 
          txt += 'N';
        txt += '</td>'; 
        txt += '</tr>';
      }
    }
    txt += '</table>';
    e$('invTab2').innerHTML = txt;
  };
  
  this.invShowUnusedEquipment = function() {
    var txt = '';
    txt += '<table id="tblInvEquip" name="tblInvEquip" style="border:1px solid #fff;">';
    txt += '<tr>';
    txt += '<th onclick="OGPAccount.invSort(\'Q\');OGPAccount.invShowUnusedEquipment();" title="Sort by Quantity">Qt.</th>';
    txt += '<th onclick="OGPAccount.invSort(\'N\');OGPAccount.invShowUnusedEquipment();" title="Sort by Name">Item Name</th>';
    txt += '<th onclick="OGPAccount.invSort(\'A\');OGPAccount.invShowUnusedEquipment();" title="Sort by Attack">Att</th>';
    txt += '<th onclick="OGPAccount.invSort(\'D\');OGPAccount.invShowUnusedEquipment();" title="Sort by Defense">Def</th>';
    txt += '<th onclick="OGPAccount.invSort(\'G\');OGPAccount.invShowUnusedEquipment();" title="Sort by Giftable">Gift</th>';
    txt += '<th onclick="OGPAccount.invSort(\'C\');OGPAccount.invShowUnusedEquipment();" title="Sort by Category">Qual</th>';
    txt += '</tr>';
    txt += OGPAccount.invShowUnusedItems(1);
    txt += OGPAccount.invShowUnusedItems(2);
    txt += OGPAccount.invShowUnusedItems(3);
    txt += OGPAccount.invShowUnusedItems(8);
    e$('invTab3').innerHTML = txt;    
  };
  
  this.invShowUnownedEquipment = function() {
    var txt = '';
    txt += '<table id="tblInvEquip" name="tblInvEquip" style="border:1px solid #fff;">';
    txt += '<tr>';
    txt += '<th onclick="OGPAccount.invSort(\'N\');OGPAccount.invShowUnownedEquipment();" title="Sort by Name">Item Name</th>';
    txt += '<th onclick="OGPAccount.invSort(\'A\');OGPAccount.invShowUnownedEquipment();" title="Sort by Attack">Att</th>';
    txt += '<th onclick="OGPAccount.invSort(\'D\');OGPAccount.invShowUnownedEquipment();" title="Sort by Defense">Def</th>';
    txt += '<th onclick="OGPAccount.invSort(\'G\');OGPAccount.invShowUnownedEquipment();" title="Sort by Giftable">Gift</th>';
    txt += '<th onclick="OGPAccount.invSort(\'C\');OGPAccount.invShowUnownedEquipment();" title="Sort by Category">Qual</th>';
    txt += '</tr>';
    txt += OGPAccount.invShowUnownedItems(1);
    txt += OGPAccount.invShowUnownedItems(2);
    txt += OGPAccount.invShowUnownedItems(3);
    txt += OGPAccount.invShowUnownedItems(8);
    e$('invTab4').innerHTML = txt;    
  };
  
  this.invShowUnusedItems = function(cat) {
    var t = '';
    t += '<tr><td colspan="7" style="color:black;text-align:center;font-size:10px;background-color:#77ff77;">';
    switch(cat) {
      case 1: t+='Weapons';break;
      case 2: t+='Armor';break;
      case 3: t+='Vehicles';break;
      case 8: t+='Animals';break;
    }
    t += '</th></tr>';
    for (var i=0; i < OGPAccount.arInventory.length; i++) {
      if (parseInt(OGPAccount.arInventory[i][4]) > 0 && OGPAccount.arInventory[i][5] == 0 && OGPAccount.arInventory[i][6] == 0 && OGPAccount.arInventory[i][7]==cat) {
        t += '<tr style="font-size:8px;">';
        t += '<td>' + OGPAccount.arInventory[i][4] + '</td>';
        t += '<td>' + OGPAccount.arInventory[i][1] + '</td>';
        t += '<td>' + OGPAccount.arInventory[i][2] + '</td>';
        t += '<td>' + OGPAccount.arInventory[i][3] + '</td>';
        t += '<td>';
        if (OGPAccount.arInventory[i][8] == 1) 
          t += 'Y';
        else
          t += 'N';
        t += '</td>';
        t += '<td>';
        switch (parseInt(OGPAccount.arInventory[i][9])) {
          case 1: t+='Common';break;
          case 2: t+='Uncommon';break;
          case 3: t+='Rare';break;
          case 4: t+='Superior';break;
          case 5: t+='Ultimate';break;
        }
        t += '</td>';
        t += '<td>';
        if (OGPAccount.arInventory[i][8] == 1)
          t += '<a title="Add item to Wishlist" onclick="OGPItems.addToWishlist(0,0,' + OGPAccount.arInventory[i][0] + ');">WL</a>';
        else
          t += '&nbsp;';
        t += '</td>';
        t += '</tr>';
      }
    }
    return(t);
  
  };
  
  this.invShowUnownedItems = function(cat) {
    var t = '';
    t += '<tr><td colspan="6" style="color:black;text-align:center;font-size:10px;background-color:#77ff77;">';
    switch(cat) {
      case 1: t+='Weapons';break;
      case 2: t+='Armor';break;
      case 3: t+='Vehicles';break;
      case 8: t+='Animals';break;
    }
    t += '</th></tr>';
    for (var i=0; i < OGPAccount.arInventory.length; i++) {
      if (parseInt(OGPAccount.arInventory[i][4]) == 0 && OGPAccount.arInventory[i][7]==cat) {
        t += '<tr style="font-size:8px;">';
        t += '<td>' + OGPAccount.arInventory[i][1] + '</td>';
        t += '<td>' + OGPAccount.arInventory[i][2] + '</td>';
        t += '<td>' + OGPAccount.arInventory[i][3] + '</td>';
        t += '<td>';
        if (OGPAccount.arInventory[i][8] == 1) 
          t += 'Y';
        else
          t += 'N';
        t += '</td>';
        t += '<td>';
        switch (parseInt(OGPAccount.arInventory[i][9])) {
          case 1: t+='Common';break;
          case 2: t+='Uncommon';break;
          case 3: t+='Rare';break;
          case 4: t+='Superior';break;
          case 5: t+='Ultimate';break;
        }
        t += '</td>';
        t += '<td>';
        if (OGPAccount.arInventory[i][8] == 1)
          t += '<a title="Add item to Wishlist" onclick="OGPItems.addToWishlist(0,0,' + OGPAccount.arInventory[i][0] + ');">WL</a>';
        else
          t += '&nbsp;';
        t += '</td>';
        t += '</tr>';
      }
    }
    return(t);
  
  };
  
  this.invShowEquipment = function(col) {
    var txt = '';
    txt += '<table id="tblInvEquip" name="tblInvEquip" style="border:1px solid #fff;">';
    txt += '<tr>';
    txt += '<th onclick="OGPAccount.invSort(\'Q\');OGPAccount.invShowEquipment(' + col + ');" title="Sort by Quantity">Qt.</th>';
    txt += '<th onclick="OGPAccount.invSort(\'N\');OGPAccount.invShowEquipment(' + col + ');" title="Sort by Name">Item Name</th>';
    txt += '<th onclick="OGPAccount.invSort(\'A\');OGPAccount.invShowEquipment(' + col + ');" title="Sort by Attack">Att</th>';
    txt += '<th onclick="OGPAccount.invSort(\'D\');OGPAccount.invShowEquipment(' + col + ');" title="Sort by Defense">Def</th>';
    txt += '<th style="cursor:default;">Extra</th>';
    txt += '<th onclick="OGPAccount.invSort(\'G\');OGPAccount.invShowEquipment(' + col + ');" title="Sort by Giftable">Gift</th>';
    txt += '<th onclick="OGPAccount.invSort(\'C\');OGPAccount.invShowEquipment(' + col + ');" title="Sort by Category">Qual</th>';
    txt += '</tr>';
    switch (col) {
      case 1:
        txt += OGPAccount.invShowItems(1,5);
        txt += OGPAccount.invShowItems(2,5);
        txt += OGPAccount.invShowItems(3,5);
        txt += OGPAccount.invShowItems(8,5);
        break;
      case 2:
        txt += OGPAccount.invShowItems(1,6);
        txt += OGPAccount.invShowItems(2,6);
        txt += OGPAccount.invShowItems(3,6);
        txt += OGPAccount.invShowItems(8,6);
        break;
    }    
    e$('invEq' + col).innerHTML = txt;
  };
  
  this.invTab = function(tab) {
    for (var i=1; i <= 4; i++) {
      if (i==tab) {
        e$('invTab' + i).style.display='block';
        e$('invHdrTab' + i).style.backgroundColor='green';
      } else {
        e$('invTab' + i).style.display='none';
        e$('invHdrTab' + i).style.backgroundColor='black';
      }
    }
  };
  
  this.invSort = function(by) {
    for (var i=0; i < OGPAccount.arInventory.length-1; i++) {
      for (var j=i+1; j < OGPAccount.arInventory.length; j++) {
        switch(by) {
          case 'A':
            if (parseInt(OGPAccount.arInventory[i][2]) < parseInt(OGPAccount.arInventory[j][2])) {
              OGPAccount.swapInv(i,j);
            }
            break;
          case 'D':
            if (parseInt(OGPAccount.arInventory[i][3]) < parseInt(OGPAccount.arInventory[j][3])) {
              OGPAccount.swapInv(i,j);
            }
            break;
          case 'Q':
            if (parseInt(OGPAccount.arInventory[i][4]) < parseInt(OGPAccount.arInventory[j][4])) {
              OGPAccount.swapInv(i,j);
            }
            break;
          case 'N':
            if (OGPAccount.arInventory[i][1] > OGPAccount.arInventory[j][1]) {
              OGPAccount.swapInv(i,j);
            }
            break;
          case 'G':
            if (OGPAccount.arInventory[i][8] < OGPAccount.arInventory[j][8]) {
              OGPAccount.swapInv(i,j);
            }
            break;
          case 'C':
            if (OGPAccount.arInventory[i][9] < OGPAccount.arInventory[j][9]) {
              OGPAccount.swapInv(i,j);
            }
            break;
        
        }
      }
    }
  };
  
  this.swapInv = function(a,b) {
    var t = OGPAccount.arInventory[a];
    OGPAccount.arInventory[a] = OGPAccount.arInventory[b];
    OGPAccount.arInventory[b] = t;
  };
  
  this.invShowItems = function(cat,ad) {
    var t = '';
    t += '<tr><td colspan="7" style="color:black;text-align:center;font-size:10px;background-color:#77ff77;">';
    switch(cat) {
      case 1: t+='Weapons';break;
      case 2: t+='Armor';break;
      case 3: t+='Vehicles';break;
      case 8: t+='Animals';break;
    }
    t += '</th></tr>';
    for (var i=0; i < OGPAccount.arInventory.length; i++) {
      if (parseInt(OGPAccount.arInventory[i][ad]) > 0 && OGPAccount.arInventory[i][7]==cat) {
        t += '<tr style="font-size:8px;">';
        t += '<td>' + OGPAccount.arInventory[i][4] + '</td>';
        t += '<td>' + OGPAccount.arInventory[i][1] + '</td>';
        t += '<td>' + OGPAccount.arInventory[i][2] + '</td>';
        t += '<td>' + OGPAccount.arInventory[i][3] + '</td>';
        var ea = OGPAccount.arInventory[i][4]-OGPAccount.arInventory[i][5];
        var ed = OGPAccount.arInventory[i][4]-OGPAccount.arInventory[i][6];
        if (ea > 0 && ed > 0) {
          t += '<td><font color="yellow">';
          if (ea > ed)
            t += ed;
          else 
            t += ea;
          t += '</font></td>';
        } else { t+='<td></td>'; }
        t += '<td>';
        if (OGPAccount.arInventory[i][8] == 1) 
          t += 'Y';
        else
          t += 'N';
        t += '</td>';
        t += '<td>';
        switch (parseInt(OGPAccount.arInventory[i][9])) {
          case 1: t+='Common';break;
          case 2: t+='Uncommon';break;
          case 3: t+='Rare';break;
          case 4: t+='Superior';break;
          case 5: t+='Ultimate';break;
        }
        t += '</td>';
        t += '<td>';
        if (OGPAccount.arInventory[i][8] == 1)
          t += '<a title="Add item to Wishlist" onclick="OGPItems.addToWishlist(0,0,' + OGPAccount.arInventory[i][0] + ');">WL</a>';
        else
          t += '&nbsp;';
        t += '</td>';
        t += '</tr>';
      }
    }
    return(t);
  };
  
  this.myAccount = function(step,index) {
    switch(step) {
      case 0:
        OGPAccount.accountcurcity = OGPConfig.currentCity;
        OGPAccount.account.skills.length = 0;
        OGPAccount.account.hiddenloot.length = 0;
        OGPAccount.account.specialloot.length = 0;
        OGPAccount.account.preploot.length = 0;
        OGPAccount.account.weapons.length = 0;
        OGPAccount.account.armor.length = 0;
        OGPAccount.account.weapons.length = 0;
        OGPAccount.account.vehicles.length = 0;
        OGPAccount.account.boosts.length = 0;
        OGPAccount.account.achievements.length = 0;
        OGPAccount.account.animals.length = 0;
        var txt = 'Please wait, loading your account information...<br>';
        txt += 'Loading profile information...';
        OGPDisplay.setHTML('divOGPSetup',txt);
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlProfile;
        url += '&xw_city=' + OGPConfig.currentCity;
        OGPAjax.buildAjax(url,'OGPAccount.myAccount','1,%ix%');
        break;
        
      case 1:
        var r = OGPAjax.ajax[index].response;
        var s,e;
        var tmp = OGPParser.getValueInTags(r,'<div class="title"',0);
        tmp = tmp.split('"');
        OGPAccount.account.name = tmp[1];
        OGPAccount.account.title = tmp[0];
        OGPAccount.account.level = OGPParser.getUserFieldValue(r,'user_level');
        OGPAccount.account.mafiasize = OGPParser.getUserFieldValue(r,'user_group_size');
        OGPAccount.account.skills['energy'] = OGPParser.getUserFieldValue(r,'user_max_energy');
        OGPAccount.account.skills['stamina'] = OGPParser.getUserFieldValue(r,'user_max_stamina');
        OGPAccount.account.skills['health'] = OGPParser.getUserFieldValue(r,'user_max_health');
        s = r.indexOf('Attack:');
        while (r.substr(s,4) != '<td>') s++;
        OGPAccount.account.skills['attack'] = parseInt(r.substr(s+4));
        s = r.indexOf('Defense:');
        while (r.substr(s,4) != '<td>') s++;
        OGPAccount.account.skills['defense'] = parseInt(r.substr(s+4));
        s = r.indexOf('class="main_table stats"');
        var next = s;
        while (s < next) {
          s = r.indexOf('<td>',s); s+=4;
          e = r.indexOf('<',s);
          var tname = r.substr(s,e-s);
          s = r.indexOf('<td ',e);
          while (r.substr(s,1) != '>') s++;
          s++; e=s;
          while (r.substr(e,1) != '<') e++;
          OGPAccount.account.stats[OGPAccount.account.stats.length]=new Array(tname,r.substr(s,e-s));
          s = r.indexOf('<tr>',e);
          i++;
        }
        OGPDisplay.setHTML('divOGPSetup','Loading Achievements...');
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlAchievements;
        url += '&xw_city=' + OGPConfig.currentCity;
        OGPAjax.buildAjax(url,'OGPAccount.myAccount','2,%ix%');
        break; 
        
      case 2:
        var e;
        var r = OGPAjax.ajax[index].response;
        var s = r.indexOf('ach_ach_img');
        while (s > 0) {
          s+= 12;
          var earned = false;
          if (r.substr(s,8)=='ach_earn') earned = true;
          var atitle = OGPParser.getValueInTags(r.substr(s),'ach_ach_name',0);
          var adesc = OGPParser.getValueInTags(r.substr(s),'ach_ach_description',0);
          OGPAccount.account.achievements[OGPAccount.account.achievements.length] = new Array(atitle,adesc,earned);
          s = r.indexOf('ach_ach_img',s);
        }
        OGPDisplay.setHTML('divOGPSetup','Loading Equipment...');
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlLootListPage;
        url += '&xw_city=' + OGPConfig.currentCity;
        OGPAjax.buildAjax(url,'OGPAccount.myAccount','3,%ix%');
        break;
        
      case 3:
        OGPAccount.ares = OGPAjax.ajax[index].response;
        var r = OGPAccount.ares;
                
        OGPAccount.swpn = r.indexOf('<h3><span class="text">Weapons</span></h3>');
        OGPAccount.sarm = r.indexOf('<h3><span class="text">Armor</span></h3>');
        OGPAccount.sveh = r.indexOf('<h3><span class="text">Vehicles</span></h3>');
        OGPAccount.sspc = r.indexOf('<h3><span class="text">Special Loot</span></h3>');
        OGPAccount.sani = r.indexOf('<h3><span class="text">Animals</span></h3>');
        OGPAccount.shid = r.indexOf('<h3><span class="text">Hidden Loot</span></h3>');
        OGPAccount.spre = r.indexOf('<h3><span class="text">Prep Loot</span></h3>');

        // Determine ending points
        OGPAccount.endlist = r.indexOf('Job Mastery Items');

        OGPAccount.ewpn = OGPAccount.lootgetlow(OGPAccount.swpn,OGPAccount.sarm,OGPAccount.sveh,OGPAccount.sspc,OGPAccount.sani,OGPAccount.shid,OGPAccount.spre,OGPAccount.endlist);
        OGPAccount.earm = OGPAccount.lootgetlow(OGPAccount.sarm,OGPAccount.swpn,OGPAccount.sveh,OGPAccount.sspc,OGPAccount.sani,OGPAccount.shid,OGPAccount.spre,OGPAccount.endlist);
        OGPAccount.eveh = OGPAccount.lootgetlow(OGPAccount.sveh,OGPAccount.swpn,OGPAccount.sarm,OGPAccount.sspc,OGPAccount.sani,OGPAccount.shid,OGPAccount.spre,OGPAccount.endlist);
        OGPAccount.espc = OGPAccount.lootgetlow(OGPAccount.sspc,OGPAccount.swpn,OGPAccount.sarm,OGPAccount.sveh,OGPAccount.sani,OGPAccount.shid,OGPAccount.spre,OGPAccount.endlist);
        OGPAccount.eani = OGPAccount.lootgetlow(OGPAccount.sani,OGPAccount.sspc,OGPAccount.swpn,OGPAccount.sarm,OGPAccount.sveh,OGPAccount.shid,OGPAccount.spre,OGPAccount.endlist);
        OGPAccount.ehid = OGPAccount.lootgetlow(OGPAccount.shid,OGPAccount.sspc,OGPAccount.swpn,OGPAccount.sarm,OGPAccount.sveh,OGPAccount.spre,OGPAccount.sani,OGPAccount.endlist);
        OGPAccount.epre = OGPAccount.lootgetlow(OGPAccount.spre,OGPAccount.sspc,OGPAccount.swpn,OGPAccount.sarm,OGPAccount.sveh,OGPAccount.shid,OGPAccount.sani,OGPAccount.endlist);

        OGPDisplay.setHTML('divOGPSetup','Weapons...');
        setTimeout('OGPAccount.myAccount(31,0)',1000);
        break;
        
      case 31:
        var r = OGPAccount.ares.substr(OGPAccount.swpn,OGPAccount.ewpn-OGPAccount.swpn);
        var s = r.indexOf('<strong>');
        while ( s > 0) {
          var tmp = OGPAccount.getInvItem(r,s);
          if (tmp == null) break;
          OGPAccount.account.weapons[OGPAccount.account.weapons.length] = tmp;
          s = r.indexOf('<strong>',++s);
        }
        OGPDisplay.setHTML('divOGPSetup','Armor...');
        setTimeout('OGPAccount.myAccount(32,0)',1000);
        break;
        
      case 32:
        var r = OGPAccount.ares.substr(OGPAccount.sarm,OGPAccount.earm-OGPAccount.sarm);
        var s = r.indexOf('<strong>');
        while ( s > 0) {
          var tmp = OGPAccount.getInvItem(r,s);
          if (tmp == null) break;
          OGPAccount.account.armor[OGPAccount.account.armor.length] = tmp;
          s = r.indexOf('<strong>',++s);
        }
        OGPDisplay.setHTML('divOGPSetup','Vehicles...');
        setTimeout('OGPAccount.myAccount(33,0)',1000);
        break;
        
      case 33:
        var r = OGPAccount.ares.substr(OGPAccount.sveh,OGPAccount.eveh-OGPAccount.sveh);
        var s = r.indexOf('<strong>');
        while ( s > 0) {
          var tmp = OGPAccount.getInvItem(r,s);
          if (tmp == null) break;
          OGPAccount.account.vehicles[OGPAccount.account.vehicles.length] = tmp;
          s = r.indexOf('<strong>',++s);
        }
        OGPDisplay.setHTML('divOGPSetup','Animals...');
        setTimeout('OGPAccount.myAccount(34,0)',1000);
        break;
        
   