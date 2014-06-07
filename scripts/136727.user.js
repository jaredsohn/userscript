// ==UserScript==
// @name   Bullshits
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
  this.curCash;
  
  this.curFightList = new Array();
  
  // Track when we're processing something
  this.functionRunning = false;
  
  this.lastStatUpdate = null;
  this.updateStatInterval = 30000;
  this.lastSessionUpdate = null;
  this.updateSessionInterval = 60000;

  this.Version = '2.18.1';
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
  this.MWROOTPATH = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php';

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
  this.urlAttackNew = '&xw_controller=fight&xw_action=attack_pop';
  this.urlPunch = '&xw_controller=fight&xw_action=punch';
  this.urlHeal = '&xw_controller=hospital&xw_action=heal';
  this.urlHealNY = '&xw_controller=hospital&xw_action=heal&xcity=1';
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
  this.urlViewPort = '&xw_controller=propertyV2&xw_action=view&xw_city=6&mwcom=1';
  this.urlViewBrazilProp = '&xw_controller=propertyV2&xw_action=view&xw_city=7&mwcom=1';
  
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
    OGPItems.loadJobInfoFromCookies(1);
    setTimeout('OGPDisplay.updateTitle(0,0)',100);
    OGPDisplay.addLine('Ready',OGPConfig.clrGood);
    
  };
  
  this.showScrollbars = function() {
    try {
      if (FB) {
      FB.CanvasClient.stopTimerToSizeToContent; 
      window.clearInterval (FB.CanvasClient._timer);
      FB.CanvasClient._timer=-1; 
      }
    }catch(err){}
    document.body.style.overflowX='visible';
    document.body.style.overflowY='visible';
    document.body.parentNode.style.overflow ='scroll';  
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
    // Hide the like bar and zbar
    if (e$('mw_like_button')) {
      var p = e$('mw_like_button');
      p.style.visibility='hidden';
      p.style.display='none';
    }
    // Hide the zbar
    var p = document.getElementById('zbar');
    if (p) {
      p.parentNode.style.visibility = 'hidden';
      p.parentNode.style.display='none';
    }
    var p = document.getElementsByName('mafiawars_zbar');
    for (var i=0;i < p.length; i++) {
      p[i].style.visibility = 'hidden';
      p[i].style.display='none';
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
    OGPTimers.fontTimer = setInterval("OGPDisplay.fixScreenFonts()",500);
    OGPTimers.setCleanupInterval();
    //OGPTimers.RCTimer = setInterval("OGPTimers.RealClickTimer()",20000);
    OGPTimers.RCTimer = setInterval("OGPTimers.RealClickTimer()",600000);
  };

  this.RealClickTimer = function() {
    e$('ogpiframe').src = 'http://facebook.mafiawars.zynga.com/mwfb/?skip_req_frame=1&mwcom=1';
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
    this.cleanupTimer = setInterval("OGPTimers.cleanupDisplay();",500);
  };

  this.cleanupDisplay = function() {
    // Make sure the srollbars are always there
    //document.body.style.overflowX='auto';document.body.style.overflowY='auto';document.body.parentNode.style.overflow ='scroll';
    //document.body.parentNode.style.overflow ='scroll';
    OGPMain.showScrollbars();
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
    txt +='#divOGPIframe {display:none;height:400px;width:600px;}';
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
        r = r.replace(/[\r\n|\n|\t|]/g,'');
        //var regexstring = /<div class="stats_title_text">.*?"(.*)".*?level/;
        var regexstring = /<div class="stats_title_text">.+?"(.+?)".+?level/;
        var match = regexstring.exec(r);
        if (match) {
          var name = match[1];
          // Clear out nonprintables
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
    //txt +='<a onclick="OGPDisplay.menuClick(55);">Collect Stream Links</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(60);">Auto-Buy Fight Club</a><br />';
    //txt +='<a onclick="OGPDisplay.menuClick(46);">Collect Mystery Bags</a><br />';
    txt +='</td>';
    txt +='<td>';
    txt +='<a onclick="OGPDisplay.menuClick(30);">Smart Drone Runner</a><br />';
    txt +='<a onclick="OGPDisplay.menuClick(32);">Run Multiple Jobs</a><br />';
    txt +='</td>';
    txt +='<td>';
/*
    txt +='Quick Attack<br />';
    txt +='&nbsp;&nbsp;&nbsp;<a onclick="OGPDisplay.menuClick(34);">(5)</a> ';
    txt +='<a onclick="OGPDisplay.menuClick(35);">(10)</a> ';
    txt +='<a onclick="OGPDisplay.menuClick(36);">(25)</a> ';
    txt +='<a onclick="OGPDisplay.menuClick(37);">(50)</a><br />';
    txt +='&nbsp;&nbsp;&nbsp;<a onclick="OGPDisplay.menuClick(38);">(100)</a> ';
    txt +='<a onclick="OGPDisplay.menuClick(39);">(500)</a> ';
    txt +='<a onclick="OGPDisplay.menuClick(40);">(1000)</a><br />';
*/
    txt +='<a onclick="OGPDisplay.menuClick(42);">Auto-Attack</a> <br />';
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
    //txt +='<a onclick="OGPDisplay.menuClick(64);">Add El Dorado</a><br />';
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
      case 64:OGPItems.addElDorado();break;
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
        txt+='friends\' status messages and pull out links to tinyurl.com, spockon.me and bit.ly addresses.  The full list will be displayed ';
        txt+='allowing you to collect the items you need.<br><br>';
        txt+='<a onclick="OGPStream.collectLinks(1,0)">Start Scanning</a>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        OGPStream.clArray.length = 0;
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
        //FB.Facebook.apiClient.fql_query(OGPStream.clQrybase + ' LIMIT ' + OGPStream.clLower + ',' + OGPStream.clLimit,
        var query = FB.Data.query(OGPStream.clQrybase + ' LIMIT ' + OGPStream.clLower + ',' + OGPStream.clLimit);
        //var query = FB.Data.query('select time,message from status limit 0,50');
        query.wait(
          function(rows) {
            if (rows == null) {
              // Move to next one
              return;
            }
            if (rows.length > 0) {
              // Scan results and add to array
              var regexstring = /((?:\b[A-Z][a-zA-Z]+\b\s+)*(?:\b[A-Z][a-zA-Z]+\b)):\s(http:\/\/spockon.me\/?[A-Za-z0-9]*|http:\/\/tinyurl.com\/?[a-z0-9]*|http:\/\/bit.ly\/?[a-zA-Z0-9]*)/g;
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
  this.aaLastWinCount = 0;
  this.lastPAURL = '';
    
  this.arDelay;
  
  this.beatdowns = new Array('Whoopin\' some ass','Pounding them','Handing out a beatdown','Breaking out the pimp hand','Smacking them around','Knocking out some teeth');

  this.autoAttack = function(step,index) {
    switch(step) {
      case 0:
        // Load the cookie
        OGPFight.aaLastWinCount = 0;
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
        if (OGPFight.aaHealCity == 1) { // NY
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlHealNY + '&xw_city=' + OGPConfig.currentCity;
          OGPAjax.buildAjax(url,'OGPFight.autoAttack','6,%ix%');
        }
        else if (OGPConfig.currentCity != OGPFight.aaHealCity) {
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
        var newfight = false;
        if (r.indexOf('attack_pop') >= 0) newfight = true;
        //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>' + r;return;
        OGPParser.getFightList(r);
        // Check for someone on the fightlist to attack
        var i = OGPParser.getAttackTarget(OGPFight.aaMinLevel,OGPFight.aaMaxLevel,OGPFight.aaMinMafia,OGPFight.aaMaxMafia,OGPFight.aaIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          OGPDisplay.setHTML('divAAStatus','No matches on fight list, waiting 5 seconds');
          setTimeout('OGPFight.autoAttack(4,0)',5000);
          return; 
        }
        // Have someone to attack, try once
        OGPFight.aaCurFightIndex = i;
        OGPFight.LastWinCount = 0;
        OGPDisplay.setHTML('divAAStatus','Attacking ' + OGPConfig.curFightList[i][0] + '&nbsp;' + OGPConfig.curFightList[i][2] + ' - Level ' + OGPConfig.curFightList[i][3] + ' - Mafia Size ' + OGPConfig.curFightList[i][4]);
        var url = OGPConfig.MWROOTPATH + '?' + OGPConfig.urlAttack;
        if (newfight == true) url = OGPConfig.MWROOTPATH + '?' + OGPConfig.urlAttackNew;
        url += '&xw_city=' + OGPConfig.curFightList[i][5];
        //e$('divOGPDebug').innerHTML += url + '<br>';
        OGPAjax.buildAjax(url,'OGPFight.autoAttack','9,%ix%');
        break;

      case 9:
        // Title, UserID, Name, Level, Mafia, tmpkey, iced, available
        var r = OGPAjax.ajax[index].response;
        r = r.replace(/[\r\n|\n|\t]/g,'');
        //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>' + r; return;
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
        
        var regex = /iced_popv2_big_red_counter.*?([0-9,]+)/;
        var match = regex.exec(r);
        if (match) { // Iced
          OGPFight.aaIcedCurrent = match[1].replace(/,/g,'');
          if (OGPFight.aaIced == -1) OGPFight.aaIced = OGPFight.aaIcedCurrent-1;
        }
        
        var regex = /"total_ice_count".*?([0-9,]+)/;
        var match = regex.exec(r);
        if (match) { // Iced
          if (match[1]!= '0') {
            OGPFight.aaIcedCurrent = match[1].replace(/,/g,'');
            if (OGPFight.aaIced == -1) OGPFight.aaIced = OGPFight.aaIcedCurrent-1;
          }
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
        if (r.indexOf('msg.fight_result') > 0 || r.indexOf('"fight_result":') > 0) {
          // New fight results
          if (r.indexOf('msg.fight_result') > 0)
            var regex = /msg.fight_result\s=.*?script/;
          else 
            var regex = /"fight_result":.*?script/;
          var match = regex.exec(r);
        
//        if (r.indexOf('msg.fight_result') > 0) {
//          // New fight results
//          var regex = /msg.fight_result.*?script/;
//          var match = regex.exec(r);

          if (match) {
            var res = match[0];
            var regex = /isWin":true/;
            var win = regex.exec(res);
            if (win) {
              // Fight won
              if (r.indexOf('is_power_attack":true') > 0) {
                // Power Attack
                //e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>';return;
                var regex = /power_attack":{"won":([0-9]+)/;
                var match = regex.exec(r);
                if (match) {
                  var twins = parseInt(match[1]);
                  var tdiff = twins - OGPFight.aaLastWinCount;
                  OGPFight.aaLastWinCount = twins;
                  OGPFight.aaFightWins+=tdiff;
                  OGPFight.aaAttackCount+=tdiff;
                  OGPDisplay.setHTML('divAAFightWin','W: ' + OGPDisplay.setGoodColor(OGPFight.aaFightWins));
                  OGPDisplay.setHTML('divAAFightLoss','L: ' + OGPDisplay.setBadColor(OGPFight.aaFightLosses));
                }
               } else {
                // Single Attack
                OGPFight.lastPAURL = '';
                OGPFight.aaFightWins++;
                OGPFight.aaAttackCount++;
                OGPFight.aaLastWinCount=1;
                OGPDisplay.setHTML('divAAFightWin','W: ' + OGPDisplay.setGoodColor(OGPFight.aaFightWins));
                OGPDisplay.setHTML('divAAFightLoss','L: ' + OGPDisplay.setBadColor(OGPFight.aaFightLosses));
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

              var isalive=true;
              if (r.indexOf('"is_iced":true') > 0) isalive = false;
              if (r.indexOf('"is_killed":true') > 0) isalive = false;
              
              if (isalive && (parseInt(OGPFight.aaTimesToAttack) - parseInt(OGPFight.aaAttackCount) >= 5)) {
                // Power attack
                if (OGPFight.lastPAURL == '') {
                  var s = r.indexOf("callback='FightV2.powerAttack'");
                  var s = r.indexOf("callback='FightV2.powerAttack'",s+1);
                  while (r.substr(s,1) != '?') s++;
                  var e = r.indexOf("'",s);
                  var url = OGPConfig.MWROOTPATH + r.substr(s,e-s);
                  url = url.replace(/click_amt=[0-9]+&/,'click_amt=5&');
                  OGPFight.lastPAURL = url;
                } else {
                  var url = OGPFight.lastPAURL;
                }
                //e$('divOGPDebug').innerHTML += '<div style="width:800px;">' + url + '</div>';
                OGPAjax.buildAjax(url,'OGPFight.autoAttack','9,%ix%');
              }else {
                 // No longer alive or less than 5 fights left to be run, get a new target
                OGPConfig.curFightList[OGPFight.aaCurFightIndex][7] = 0;
                OGPFight.autoAttack(10,0);
              }


            } else {
              // Fight lost
              OGPFight.aaFightLosses++;
              OGPFight.aaAttackCount++;
              OGPFight.updateFightResults();
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
            }
          } else {
            // No fight - in mafia or something else
            // Mark as no and go back
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
          }
          return;
        }
        
        
        // Old fight results
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
            if (OGPFight.aaRestart) {
              OGPDisplay.setHTML('divAAStatus','Waiting for more stamina...');
              setTimeout('OGPFight.autoAttack(4,0)',10000);
              return;
            } else {
              OGPDisplay.setHTML('divAAStatus','No Stamina remaining');
              OGPDisplay.setHTML('divAAControl','');
              return;
            }
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
          OGPDisplay.setHTML('divAAStatus','No matches on fight list, waiting 5 seconds');
          setTimeout('OGPFight.autoAttack(4,0)',5000);
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
        //OGPDisplay.setHTML('divAAIced',OGPDisplay.setGoodColor(OGPFight.aaIcedCurrent + ' (+' + dif + ')'));
        OGPDisplay.setHTML('divAAIced',OGPDisplay.setGoodColor(' (+' + dif + ')'));
      //else
      //  OGPDisplay.setHTML('divAAIced',OGPDisplay.setGoodColor(OGPFight.aaIcedCurrent));
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
          OGPDisplay.setHTML('divRPStatus','No one on the fight list, waiting 5 seconds');
          setTimeout('OGPFight.robPersonal(2,0)',5000);
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
            if (OGPItems.jobLevels[i][j] != '') {
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
          //e$('divOGPDebug').innerHTML += '<br>' + url;
          OGPDisplay.setHTML('divJobStatus','Running Job');
          OGPAjax.buildAjax(url,'OGPJob.runJobs','3,%ix%');
        }
        break;
              
      case 3: // Job ran, parse results
        if (OGPAjax.ajax[index]) {
          var r = OGPAjax.ajax[index].response;
          //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>';return;
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
              if (OGPConfig.currentCity >= 5 && OGPConfig.currentCity <= 8) OGPJob.curJobTab = -1;
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
  this.useStaminaFirst = false;
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
  this.newfight = false;

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
  this.icesStart = -1;
  this.icesCurrent = 0;
  this.lastwincount = 0;
  this.lastPAURL = '';
  
  this.resetSettings = function() {
    this.isRunning = false;
    this.isPaused = false;
    this.burnStamina=false;
    this.stamFight = false;
    this.stamRob = false;
    this.stamFightRob = false;
    this.stamRobFight = false;
    this.useStaminaFirst = false;
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
    this.icesStart = -1;
    this.icesCurrent = 0
    this.lastwincount = 0;
    this.newfight = false;
    this.lastPAURL = '';
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
          case 'usestfirst':this.useStaminaFirst=true;break;
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
    //txt += '<td><input type="checkbox" name="ckSTUseFirst" id="ckSTUseFirst"' + (this.useStaminaFirst==true?' checked':'') + ' onclick="e$(\'ckStamina\').checked=(this.checked==true?true:e$(\'ckStamina\').checked);"> Use Stamina First</td>';
    txt += '<td>For F/R or R/F, switch at <input type="text" size="5" name="txtFRSwitch" id="txtFRSwitch" value="' + this.FRSwitch + '"> stamina remaining</td>';
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
    txt += '<td><input type="checkbox" name="ckDeposit" id="ckDeposit"' + (this.depositMoney==true?' checked':'') + '> Deposit money</td>';
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

  this.droneDeposit = function(step,index) {
    // Don't deposit in Italy
    if (OGPConfig.currentCity==4) return;
    switch(step) {
      case 0:
        var minmoney = 0;
        switch(OGPConfig.currentCity) {
          case 1: minmoney=1000000;break;
          case 5: minmoney=100000;break;
          case 6: minmoney=20000;break;
        }
        if (parseInt(OGPConfig.curCash) > parseInt(minmoney)) {
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlDeposit + '&city=' + OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][7];
          url += '&xw_city=' + OGPProperty.currentCity + '&amount=' + OGPConfig.curCash;
          OGPAjax.buildAjax(url,'OGPDrone.droneDeposit','1,%ix%');
        }
        break;
      case 1:
        break;
      
    }
  };
  
  this.run = function(step,index) {
    switch(step) {
      case 0:
        OGPDrone.resetSettings();
        OGPDrone.isRunning = true;
        var curcookie = '';
        // Set the robbing settings if robbing city selected.
        //if (e$('ckSTRob').checked && e$('selRobCity').value != '0') e$('ckSTUseFirst').checked=true;
        if (e$('ckStamina').checked) {OGPDrone.useStaminaFirst = true;OGPDrone.burnStamina = true;curcookie+='stamina|';}
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
        if (e$('ckDeposit').checked) {OGPDrone.depositMoney = true;curcookie+='deposit|';}
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
        if (OGPDrone.useStaminaFirst) txt += 'Use Stamina First, ';
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
        txt += '<td><div>Fight: </div><div id="divDroneFightWin" name="divDroneFightWin"></div><div name="divDroneFightLoss" id="divDroneFightLoss"></div><div name="divDroneIces" id="divDroneIces"></div></td></tr>';
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
        var best = 0;
        
        var big = OGPItems.jobs[0][6];
        for (var i=1; i < OGPItems.jobs.length; i++) {
          if (parseInt(OGPItems.jobs[i][6]) > 0 && parseInt(OGPItems.jobs[i][6]) > parseInt(OGPItems.jobs[big][6])) {
            if ((!OGPDrone.noReqMoney) || (OGPDrone.noReqMoney && OGPItems.jobs[i][8] != 1))
              if ((!OGPDrone.noReqItem) || (OGPDrone.noReqItem && OGPItems.jobs[i][9] != 1))
                big = i;
          }
          if (parseInt(OGPItems.jobs[i][6]) > 0 && parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[best][7])/parseFloat(OGPItems.jobs[best][6])) {
            if ((!OGPDrone.noReqMoney) || (OGPDrone.noReqMoney && OGPItems.jobs[i][8] != 1))
              if ((!OGPDrone.noReqItem) || (OGPDrone.noReqItem && OGPItems.jobs[i][9] != 1))
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

          // Check for Deposit
          if (OGPDrone.depositMoney)
            OGPDrone.droneDeposit(0,0);

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

          // See if we're supposed to be burning stamina before running jobs
          if (OGPDrone.useStaminaFirst==true && OGPDrone.isburningstamina==true) {
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
              // Find the best job regardless of ratio
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
          
          // Check for best job
          /*
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
          */
            
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
        if (OGPConfig.currentCity >= 5 && OGPConfig.currentCity <= 8) OGPDrone.curJobTab = -1;
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
          var regex = /btn_dojob.*?&cb=(.*?)&/;
          var match = regex.exec(OGPAjax.ajax[index].response);
          if (match) {
            OGPConfig.MWURL = OGPConfig.MWURL.replace(OGPConfig.cbvalue,match[1]);          
            OGPConfig.cbvalue = match[1];
          }
        }
        //OGPParser.showDebug(OGPAjax.ajax[index].response,0);
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
                    OGPItems.jobs[i][7] = 0;
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
            //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>';return;
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
    //e$('divOGPDebug').innerHTML += OGPItems.jobs[goodjob][1];
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
          
        if (((OGPDrone.stamFightCity != 7 && OGPDrone.stamFightCity != 8) && parseInt(OGPConfig.curStamina) > 0) || ((OGPDrone.stamFightCity == 7 ||OGPDrone.stamFightCity == 8) && parseInt(OGPConfig.curStamina) >= 5)) {
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
        if (OGPDrone.stamHealCity == 1) { // NY
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlHealNY + '&xw_city=' + OGPConfig.currentCity;
          OGPAjax.buildAjax(url,'OGPDrone.spendStamina','2,%ix%');
        }
        else if ((OGPConfig.currentCity != OGPDrone.stamHealCity) && OGPDrone.stamHealCity > 0) {
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
        OGPDrone.newfight = false;
        if (r.indexOf('attack_pop') >= 0) OGPDrone.newfight = true;
        OGPParser.getFightList(r);
        // Check for someone on the fightlist to attack
        var i = OGPParser.getAttackTarget(1,OGPDrone.fightLevel,1,OGPDrone.fightMafia,OGPDrone.FIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          OGPDisplay.setHTML('divDroneStatus','No matches on fight list, waiting 5 seconds');
          setTimeout('OGPDrone.spendStamina(0,0)',5000);
          return; 
        }
        // Have someone to attack, try once
        OGPDrone.curFightIndex = i;
        OGPDisplay.setHTML('divDroneStatus','Attacking ' + OGPConfig.curFightList[i][0] + '&nbsp;' + OGPConfig.curFightList[i][2] + ' - Level ' + OGPConfig.curFightList[i][3] + ' - Mafia Size ' + OGPConfig.curFightList[i][4]);
        // Set the timeout to reset flag to false to keep from hanging
        OGPDrone.spendStamTimeout = setTimeout("OGPDrone.isburningstamina=false;",15000);
        var url = OGPConfig.MWROOTPATH + '?' + OGPConfig.urlAttack;
        if (OGPDrone.newfight == true) url = OGPConfig.MWROOTPATH + '?' + OGPConfig.urlAttackNew;
        url += '&xw_city=' + OGPConfig.curFightList[i][5];
        OGPAjax.buildAjax(url,'OGPDrone.spendStamina','5,%ix%');
        break;

      case 5:
      try {
        // Title, UserID, Name, Level, Mafia, tmpkey, iced, available
        var r = OGPAjax.ajax[index].response;
        //e$('divOGPDebug').innerHTML = '';
        //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>';return;
        r = r.replace(/[\r\n|\n|\t]/g,'');
        // Clear the timeout
        if (OGPDrone.spendStamTimeout) clearTimeout(OGPDrone.spendStamTimeout);
        OGPTimers.updateStats(1,index);
        // Check for deposit
        if (OGPDrone.depositMoney)
          OGPDrone.droneDeposit(0,0);
          
        //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>';return;  
        if (r.indexOf('msg.fight_result') > 0 || r.indexOf('"fight_result":') > 0) {
          // New fight results
          if (r.indexOf('msg.fight_result') > 0)
            var regex = /msg.fight_result\s=.*?script/;
          else 
            var regex = /"fight_result":.*?script/;
          var match = regex.exec(r);
          if (match) {
            var res = match[0];
            var regex = /isWin":true/;
            var win = regex.exec(res);
            if (win) {
              // Fight won
              if (r.indexOf('is_power_attack":true') > 0) {
                // Power Attack
                var regex = /power_attack":{"won":([0-9]+)/;
                var match = regex.exec(r);
                if (match) {
                  var twins = parseInt(match[1]);
                  var tdiff = twins - OGPDrone.lastwincount;
                  OGPDrone.lastwincount = twins;
                  OGPDrone.fightwins+=tdiff;
                  OGPDisplay.setHTML('divDroneFightLoss','L: ' + OGPDrone.fightlosses);
                  OGPDisplay.setHTML('divDroneFightWin','W: ' + OGPDrone.fightwins);
                }
              } else {
                // Single Attack
                OGPDrone.lastPAURL = '';
                OGPDrone.fightwins++;
                OGPDrone.lastwincount=1;
                OGPDisplay.setHTML('divDroneFightLoss','L: ' + OGPDrone.fightlosses);
                OGPDisplay.setHTML('divDroneFightWin','W: ' + OGPDrone.fightwins);
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
              
              // Check for icing
              
              // Check for icing
               if (r.indexOf('<div id="fv2_defender_overlay_iced" class="fv2_opp_overlay" style="display: block; ">') > 0 ||
                   r.indexOf('you_just_iced":true') > 0) {
                OGPDrone.icesCurrent++;
                if (OGPDrone.icesStart == -1) OGPDrone.icesStart = 0;
              }          
        
              // Check for killing
              if (r.indexOf('div id="fv2_defender_overlay_killed" class="fv2_opp_overlay" style="display: block;') > 0 ||
                  r.indexOf('you_just_killed":true') > 0) {
                OGPDrone.icesCurrent+=2;
                if (OGPDrone.icesStart == -1) OGPDrone.icesStart = 0;
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
              
              // Check to see if target is dead
              if (r.indexOf('"is_iced":true') > 0 || r.indexOf('"is_killed":true') > 0) {
                OGPConfig.curFightList[OGPDrone.curFightIndex][7] = 0;
                setTimeout("OGPDrone.spendStamina(6,0);",OGPDrone.FDelay*1000);
                return;
              }
          
              // Check health
              if (OGPConfig.curHealth < 25) {
                // Start over with the health check
                OGPDrone.spendStamina(0,0);
                return;
              }
              if (r.indexOf('power_attack') > 0 ) {
                // Power attack
                if (OGPDrone.lastPAURL == '') {
                  var s = r.indexOf("callback='FightV2.powerAttack'");
                  while (r.substr(s,1) != '?') s++;
                  var e = r.indexOf("'",s);
                  var tmp = r.substr(s,e-s);
                  var url = OGPConfig.MWROOTPATH + tmp;
                  OGPDrone.lastPAURL = url;
                } else {
                  var url = OGPDrone.lastPAURL;
                }
                setTimeout("OGPAjax.buildAjax('" + url + "','OGPDrone.spendStamina','5,%ix%')",OGPDrone.FDelay*1000);
              } else {
              
                // No longer alive, get a new target
                OGPDrone.lastPAURL = '';
                OGPConfig.curFightList[OGPDrone.curFightIndex][7] = 0;
                setTimeout("OGPDrone.spendStamina(6,0);",OGPDrone.FDelay*1000);
              }
              return;
              
            } else {
              // Fight lost
              OGPDrone.fightlosses++;
              OGPDisplay.setHTML('divDroneFightLoss','L: ' + OGPDrone.fightlosses);
              OGPDisplay.setHTML('divDroneFightWin','W: ' + OGPDrone.fightwins);
              OGPConfig.curFightList[OGPDrone.curFightIndex][7] = 0;
              if (r.indexOf('div id="fv2_defender_overlay_iced" class="fv2_opp_overlay" style="display: block;"') > 0) {
                OGPDrone.icesCurrent++;
                if (OGPDrone.icesStart == -1) OGPDrone.icesStart = 0;
              }          
              
              // Check for killing
              if (r.indexOf('div id="fv2_defender_overlay_killed" class="fv2_opp_overlay" style="display: block;"') > 0) {
                OGPDrone.icesCurrent+=2;
                if (OGPDrone.icesStart == -1) OGPDrone.icesStart = 0;
              }          
              if (OGPConfig.curStamina > 0 && (OGPConfig.curExpNeeded-OGPConfig.curExp > 25 || OGPDrone.stopForLevel==false)) {
                // Find a new target
                setTimeout("OGPDrone.spendStamina(6,0);",OGPDrone.FDelay*1000);
              } else {
                // All stamina gone, set the flag
                OGPDrone.isburningstamina = false;
              }
              return;
            }
          } else {
            // No fight - in mafia or something else
            // Mark as no and go back
            OGPConfig.curFightList[OGPDrone.curFightIndex][7] = 0;
            if (OGPConfig.curStamina > 0 && (OGPConfig.curExpNeeded-OGPConfig.curExp > 25 || OGPDrone.stopForLevel==false)) {
              // Find a new target
              setTimeout("OGPDrone.spendStamina(6,0);",OGPDrone.FDelay*1000);
            } else {
              // All stamina gone, set the flag
              OGPDrone.isburningstamina = false;
            }
            return;
          }
        } else if (r.indexOf('You Won!') > 0) {
          // Won the fight, update the counters and see if we can fight again
          // Check if it was a power attack
          //e$('divOGPDebug').innerHTML += 'Old Fight Results<br>';
          
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
          
          // Check for icing
          if (r.indexOf('div id="fv2_defender_overlay_iced" class="fv2_opp_overlay" style="display: block;"') > 0) {
            OGPDrone.icesCurrent++;
            if (OGPDrone.icesStart == -1) OGPDrone.icesStart = 0;
          }          
          
          // Check for killing
          if (r.indexOf('div id="fv2_defender_overlay_killed" class="fv2_opp_overlay" style="display: block;"') > 0) {
            OGPDrone.icesCurrent+=2;
            if (OGPDrone.icesStart == -1) OGPDrone.icesStart = 0;
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
          //e$('divOGPDebug').innerHTML += 'Bad';
          OGPDrone.spendStamina(0,0);
        }
      } catch(err) {
        //e$('divOGPDebug').innerHTML += err.message;
      }
        break;
        
      case 6: 
                
        OGPDrone.lastWinCount = 0;
        var i = OGPParser.getAttackTarget(1,OGPDrone.fightLevel,1,OGPDrone.fightMafia,OGPDrone.FIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          OGPDisplay.setHTML('divDroneStatus','No matches on fight list, waiting 5 seconds');
          setTimeout('OGPDrone.spendStamina(0,0)',5000);
          return; 
        }
        // Have someone to attack, try once
        OGPDrone.curFightIndex = i;
        OGPDisplay.setHTML('divDroneStatus','Attacking ' + OGPConfig.curFightList[i][0] + '&nbsp;' + OGPConfig.curFightList[i][2] + ' - Level ' + OGPConfig.curFightList[i][3] + ' - Mafia Size ' + OGPConfig.curFightList[i][4]);
        // Set the timeout to reset flag to false to keep from hanging
        OGPDrone.spendStamTimeout = setTimeout("OGPDrone.isburningstamina=false;",15000);
        var url = OGPConfig.MWROOTPATH + '?' + OGPConfig.urlAttack;
        if (OGPDrone.newfight == true) url = OGPConfig.MWROOTPATH + '?' + OGPConfig.urlAttackNew;
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
    if (OGPDrone.icesStart != -1) {
      //OGPDisplay.setHTML('divDroneIces','Iced: ' + parseInt(OGPDrone.icesCurrent) + ' (+' + (parseInt(OGPDrone.icesCurrent)-parseInt(OGPDrone.icesStart)) + ')');
      OGPDisplay.setHTML('divDroneIces','Iced: (+' + (parseInt(OGPDrone.icesCurrent)-parseInt(OGPDrone.icesStart)) + ')');
    }

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
    txt += OGPAccount.invShowUnusedItems(13);
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
    txt += OGPAccount.invShowUnownedItems(13);
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
      case 13: t+='Henchmen';break;
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
      case 13: t+='Henchmen';break;
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
        txt += OGPAccount.invShowItems(13,5);
        break;
      case 2:
        txt += OGPAccount.invShowItems(1,6);
        txt += OGPAccount.invShowItems(2,6);
        txt += OGPAccount.invShowItems(3,6);
        txt += OGPAccount.invShowItems(8,6);
        txt += OGPAccount.invShowItems(13,6);
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
      case 13: t+='Henchmen';break;
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
        
      case 34:
        var r = OGPAccount.ares.substr(OGPAccount.sani,OGPAccount.eani-OGPAccount.sani);
        var s = r.indexOf('<strong>');
        while ( s > 0) {
          var tmp = OGPAccount.getInvItem(r,s);
          if (tmp == null) break;
          OGPAccount.account.animals[OGPAccount.account.animals.length] = tmp;
          s = r.indexOf('<strong>',++s);
        }
        OGPDisplay.setHTML('divOGPSetup','Hidden Loot...');
        setTimeout('OGPAccount.myAccount(35,0)',1000);
        break;
        
      case 35:
        var r = OGPAccount.ares.substr(OGPAccount.shid,OGPAccount.ehid-OGPAccount.shid);
        //break;
        var s = r.indexOf('<strong>');
        while ( s > 0) {
          var tmp = OGPAccount.getInvItem(r,s);
          if (tmp == null) break;
          OGPAccount.account.hiddenloot[OGPAccount.account.hiddenloot.length] = tmp;
          s = r.indexOf('<strong>',++s);
        }
        OGPDisplay.setHTML('divOGPSetup','Special Loot...');
        setTimeout('OGPAccount.myAccount(36,0)',1000);
        break;
        
      case 36:
        var r = OGPAccount.ares.substr(OGPAccount.sspc,OGPAccount.espc-OGPAccount.sspc);
        var s = r.indexOf('<strong>');
        while ( s > 0) {
          var tmp = OGPAccount.getInvItem(r,s);
          if (tmp == null) break;
          OGPAccount.account.specialloot[OGPAccount.account.specialloot.length] = tmp;
          s = r.indexOf('<strong>',++s);
        }
        OGPDisplay.setHTML('divOGPSetup','Prep Loot...');
        setTimeout('OGPAccount.myAccount(37,0)',1000);
        break;
         
      case 37:
        var r = OGPAccount.ares.substr(OGPAccount.spre,OGPAccount.epre-OGPAccount.spre);
        var s = r.indexOf('<strong>');
        while ( s > 0) {
          var tmp = OGPAccount.getInvItem(r,s);
          if (tmp == null) break;
          OGPAccount.account.preploot[OGPAccount.account.preploot.length] = tmp;
          s = r.indexOf('<strong>',++s);
        }
        OGPDisplay.setHTML('divOGPSetup','Loading Faction Items...');
        if (OGPConfig.currentCity != 4) {
          OGPTravel.goCity(OGPItems.getCityNum('Bangkok'),'OGPAccount.myAccount(4,0)')
        } else {
          setTimeout('OGPAccount.myAccount(4,0);',1000);
        }
        break;

      case 4:
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlFactionStore + '&xw_city=' + OGPConfig.currentCity;
        OGPAjax.buildAjax(url,'OGPAccount.myAccount','5,%ix%');
        break;
       
      case 5:
        var r = OGPAjax.ajax[index].response;
        var s = r.indexOf('Yakuza Store');
        if (s < 0) { OGPAccount.myAccount(6,0); break; }
        OGPAccount.account.weapons[OGPAccount.account.weapons.length] = OGPAccount.getFactionItem(r,'Raion Assault Rifle');
        OGPAccount.account.armor[OGPAccount.account.armor.length] = OGPAccount.getFactionItem(r,'Yakuza Assassin');
        OGPAccount.account.vehicles[OGPAccount.account.vehicles.length] = OGPAccount.getFactionItem(r,'Fugama Hasu');
        OGPAccount.account.animals[OGPAccount.account.animals.length] = OGPAccount.getFactionItem(r,'Banded Krait');
        OGPAccount.account.weapons[OGPAccount.account.weapons.length] = OGPAccount.getFactionItem(r,'Cheng-Wei X94 Machine Gun');
        OGPAccount.account.armor[OGPAccount.account.armor.length] = OGPAccount.getFactionItem(r,'Shaolin Bodyguard');
        OGPAccount.account.vehicles[OGPAccount.account.vehicles.length] = OGPAccount.getFactionItem(r,'PLA Armored Car');
        OGPAccount.account.animals[OGPAccount.account.animals.length] = OGPAccount.getFactionItem(r,'Xiamen Tiger');
        OGPDisplay.setHTML('divOGPSetup','Computing used equipment...');
        if (OGPConfig.currentCity != OGPAccount.accountcurcity) {
          OGPTravel.goCity(OGPAccount.accountcurcity,'OGPAccount.myAccount(6,0)')
        } else {
          setTimeout('OGPAccount.myAccount(6,0);',1000);
        }
        break;
        
      case 6:
        // Compute the equipment
        OGPAccount.account.weapons = OGPAccount.setUsedLoot(OGPAccount.account.weapons,1,4);
        OGPAccount.account.weapons = OGPAccount.setUsedLoot(OGPAccount.account.weapons,2,5);
        OGPAccount.account.armor = OGPAccount.setUsedLoot(OGPAccount.account.armor,1,4);
        OGPAccount.account.armor = OGPAccount.setUsedLoot(OGPAccount.account.armor,2,5);
        OGPAccount.account.vehicles = OGPAccount.setUsedLoot(OGPAccount.account.vehicles,1,4);
        OGPAccount.account.vehicles = OGPAccount.setUsedLoot(OGPAccount.account.vehicles,2,5);
        OGPAccount.account.animals = OGPAccount.setUsedLoot(OGPAccount.account.animals,1,4);
        OGPAccount.account.animals = OGPAccount.setUsedLoot(OGPAccount.account.animals,2,5);
        
        // Compute attack/defense number
        var ta = 0,td = 0;
        for (var i=0; i < OGPAccount.account.weapons.length; i++) {
          ta += parseInt(OGPAccount.account.weapons[i][1]) * parseInt(OGPAccount.account.weapons[i][4]);
          td += parseInt(OGPAccount.account.weapons[i][2]) * parseInt(OGPAccount.account.weapons[i][5]);
        }
        for (var i=0; i < OGPAccount.account.armor.length; i++) {
          ta += parseInt(OGPAccount.account.armor[i][1]) * parseInt(OGPAccount.account.armor[i][4]);
          td += parseInt(OGPAccount.account.armor[i][2]) * parseInt(OGPAccount.account.armor[i][5]);
        }
        for (var i=0; i < OGPAccount.account.vehicles.length; i++) {
          ta += parseInt(OGPAccount.account.vehicles[i][1]) * parseInt(OGPAccount.account.vehicles[i][4]);
          td += parseInt(OGPAccount.account.vehicles[i][2]) * parseInt(OGPAccount.account.vehicles[i][5]);
        }
        for (var i=0; i < OGPAccount.account.animals.length; i++) {
          ta += parseInt(OGPAccount.account.animals[i][1]) * parseInt(OGPAccount.account.animals[i][4]);
          td += parseInt(OGPAccount.account.animals[i][2]) * parseInt(OGPAccount.account.animals[i][5]);
        }
        OGPAccount.account.fightattack = ta;
        OGPAccount.account.fightdefense = td;
        
        OGPAccount.myAccount(10,0);
        break;
        
        case 10:
          // Build the report
          var txt = '';
          txt += '<table id="tblReport">';
          txt += '<tr><td><h3>' + OGPAccount.account.name + '</h3></td>';
          txt += '<td id="tdTitle"><h3>' + OGPAccount.account.title + '</h3></td>';
          txt += '<td id="tdTitle"><h3>Level: ' + OGPAccount.account.level + '</h3></td>';
          txt += '<td id="tdTitle"><h3>Mafia Size: ' + OGPAccount.account.mafiasize + '</h3></td></tr>';
          txt += '<tr>';
          txt += '<td colspan="4" id="tdSkills" style="text-align:center;">'
          txt += 'Attack: ' + OGPAccount.account.skills['attack'];
          txt += '&nbsp;-&nbsp;Defense: ' + OGPAccount.account.skills['defense'];
          txt += '&nbsp;-&nbsp;Health: ' + OGPAccount.account.skills['health'];
          txt += '&nbsp;-&nbsp;Stamina: ' + OGPAccount.account.skills['stamina'];
          txt += '&nbsp;-&nbsp;Energy: ' + OGPAccount.account.skills['energy'];
          txt += '</td></tr>';
          txt += '<tr>';
          
          // Sort by attack
          OGPAccount.account.weapons = OGPAccount.sortArrayDesc(OGPAccount.account.weapons,1);
          OGPAccount.account.armor = OGPAccount.sortArrayDesc(OGPAccount.account.armor,1);
          OGPAccount.account.vehicles = OGPAccount.sortArrayDesc(OGPAccount.account.vehicles,1);
          OGPAccount.account.animals = OGPAccount.sortArrayDesc(OGPAccount.account.animals,1);

          txt += '<td><h1>Attack Items: (' + OGPAccount.account.fightattack + ')</h1>';
          txt += '<table><tr><td><h2>Weapons</h2></td></tr>';
          for (var i=0; i < OGPAccount.account.weapons.length; i++) {
            if (OGPAccount.account.weapons[i][4] > 0) {
              txt += '<tr><td>' + OGPAccount.account.weapons[i][0] + ' (' + OGPAccount.account.weapons[i][1] + ')</td><td>' + OGPAccount.account.weapons[i][4] + '</td></tr>';
            }
          }
          txt += '<tr><td><h2>Armor</h2></td></tr>';
          for (var i=0; i < OGPAccount.account.armor.length; i++) {
            if (OGPAccount.account.armor[i][4] > 0) {
              txt += '<tr><td>' + OGPAccount.account.armor[i][0] + ' (' + OGPAccount.account.armor[i][1] + ')</td><td>' + OGPAccount.account.armor[i][4] + '</td></tr>';
            }
          }
          txt += '<tr><td><h2>Vehicles</h2></td></tr>';
          for (var i=0; i < OGPAccount.account.vehicles.length; i++) {
            if (OGPAccount.account.vehicles[i][4] > 0) {
              txt += '<tr><td>' + OGPAccount.account.vehicles[i][0] + ' (' + OGPAccount.account.vehicles[i][1] + ')</td><td>' + OGPAccount.account.vehicles[i][4] + '</td></tr>';
            }
          }
          txt += '<tr><td><h2>Animals</h2></td></tr>';
          for (var i=0; i < OGPAccount.account.animals.length; i++) {
            if (OGPAccount.account.animals[i][4] > 0) {
              txt += '<tr><td>' + OGPAccount.account.animals[i][0] + ' (' + OGPAccount.account.animals[i][1] + ')</td><td>' + OGPAccount.account.animals[i][4] + '</td></tr>';
            }
          }
          txt += '</table>';
          txt += '</td>';

          // Sort by attack
          OGPAccount.account.weapons = OGPAccount.sortArrayDesc(OGPAccount.account.weapons,2);
          OGPAccount.account.armor = OGPAccount.sortArrayDesc(OGPAccount.account.armor,2);
          OGPAccount.account.vehicles = OGPAccount.sortArrayDesc(OGPAccount.account.vehicles,2);
          OGPAccount.account.animals = OGPAccount.sortArrayDesc(OGPAccount.account.animals,2);

          txt += '<td><h1>Defense Items: (' + OGPAccount.account.fightdefense + ')</h1>';
          txt += '<table><tr><td><h2>Weapons</h2></td></tr>';
          for (var i=0; i < OGPAccount.account.weapons.length; i++) {
            if (OGPAccount.account.weapons[i][5] > 0) {
              txt += '<tr><td>' + OGPAccount.account.weapons[i][0] + ' (' + OGPAccount.account.weapons[i][2] + ')</td><td>' + OGPAccount.account.weapons[i][5] + '</td></tr>';
            }
          }
          txt += '<tr><td><h2>Armor</h2></td></tr>';
          for (var i=0; i < OGPAccount.account.armor.length; i++) {
            if (OGPAccount.account.armor[i][5] > 0) {
              txt += '<tr><td>' + OGPAccount.account.armor[i][0] + ' (' + OGPAccount.account.armor[i][2] + ')</td><td>' + OGPAccount.account.armor[i][5] + '</td></tr>';
            }
          }
          txt += '<tr><td><h2>Vehicles</h2></td></tr>';
          for (var i=0; i < OGPAccount.account.vehicles.length; i++) {
            if (OGPAccount.account.vehicles[i][5] > 0) {
              txt += '<tr><td>' + OGPAccount.account.vehicles[i][0] + ' (' + OGPAccount.account.vehicles[i][2] + ')</td><td>' + OGPAccount.account.vehicles[i][5] + '</td></tr>';
            }
          }
          txt += '<tr><td><h2>Animals</h2></td></tr>';
          for (var i=0; i < OGPAccount.account.animals.length; i++) {
            if (OGPAccount.account.animals[i][5] > 0) {
              txt += '<tr><td>' + OGPAccount.account.animals[i][0] + ' (' + OGPAccount.account.animals[i][2] + ')</td><td>' + OGPAccount.account.animals[i][5] + '</td></tr>';
            }
          }
          txt += '</table>';
          txt += '</td>';
          txt += '<td><h1>Statistics:</h1>';
          txt += '<table>';
          for (var i=0; i < OGPAccount.account.stats.length; i++) {
            txt += '<tr><td>' + OGPAccount.account.stats[i][0] + '</td>';
            txt += '<td>' + OGPAccount.account.stats[i][1] + '</td></tr>';
          }
          txt += '<tr><td colspan=2><br /><h1>Computed Stats:</h1></td>';
          var me = OGPAccount.account.skills['energy'];
          txt += '<tr><td>Ratio on Level Up (No jump)</td>';
          var rat = (parseInt(OGPAccount.account.level) * 12.5)/parseInt(me);
          txt += '<td>' + parseInt(rat*100)/100 + '</td></tr>';
          txt += '<tr><td>Ratio on Level Up (Big Job)</td>';
          var big = 0;
          for (var i=1; i < OGPItems.jobs.length; i++) {
            if (parseInt(OGPItems.jobs[i][6]) > 0 && parseInt(OGPItems.jobs[i][6]) > parseInt(OGPItems.jobs[big][6])) {
              big = i;
            }
          }
          var rat = ((parseInt(OGPAccount.account.level) * 12.5)-OGPItems.jobs[big][7])/parseInt(me);
          txt += '<td>' + parseInt(rat*100)/100 + '</td></tr>';
          txt += '</table></td>';
          txt += '<td rowspan="3"><h1>Achievements:</h1>';
          txt += '<table>';
          for (var i=0; i < OGPAccount.account.achievements.length; i++) {
            txt += '<tr><td style="cursor:help;" title="' + OGPAccount.account.achievements[i][1] + '">' + OGPAccount.account.achievements[i][0] + '</td>';
            if (OGPAccount.account.achievements[i][2]==true)
              txt += '<td>Earned</td>';
            else 
              txt += '<td nowrap>-----</td>';
          }
          txt += '</table>';
          txt += '</td>';
          txt += '</tr>';

          // Sort by name
          OGPAccount.account.weapons = OGPAccount.sortArrayAsc(OGPAccount.account.weapons,0);
          OGPAccount.account.armor = OGPAccount.sortArrayAsc(OGPAccount.account.armor,0);
          OGPAccount.account.vehicles = OGPAccount.sortArrayAsc(OGPAccount.account.vehicles,0);
          OGPAccount.account.animals = OGPAccount.sortArrayAsc(OGPAccount.account.animals,0);

          txt += '<tr><td colspan="3"><h1>Unused Loot</h1></td></tr>';
          txt += '<tr><td colspan="3"><table><tr>';
          txt += '<td><h4>Weapons</h4><table>';
          for (var i=0; i < OGPAccount.account.weapons.length; i++) {
            var aused = parseInt(OGPAccount.account.weapons[i][4]);
            var dused = parseInt(OGPAccount.account.weapons[i][5]);
            var qt = parseInt(OGPAccount.account.weapons[i][3]);
            if (qt > aused && qt > dused) {
              txt +='<tr><td>' + OGPAccount.account.weapons[i][0] + '(';
              txt +=OGPAccount.account.weapons[i][1] + '/' + OGPAccount.account.weapons[i][2] + ')</td>';
              if (aused > dused)
                txt += '<td>' + (qt-aused) + '</td>';
              else
                txt += '<td>' + (qt-dused) + '</td>';
            }
          }
          txt += '</table></td>';
          txt += '<td><h4>Armor</h4><table>';
          for (var i=0; i < OGPAccount.account.armor.length; i++) {
            var aused = parseInt(OGPAccount.account.armor[i][4]);
            var dused = parseInt(OGPAccount.account.armor[i][5]);
            var qt = parseInt(OGPAccount.account.armor[i][3]);
            if (qt > aused && qt > dused) {
              txt +='<tr><td>' + OGPAccount.account.armor[i][0] + '(';
              txt +=OGPAccount.account.armor[i][1] + '/' + OGPAccount.account.armor[i][2] + ')</td>';
              if (aused > dused)
                txt += '<td>' + (qt-aused) + '</td>';
              else
                txt += '<td>' + (qt-dused) + '</td>';
            }
          }
          txt += '</table></td>';
          txt += '<td><h4>Vehicles</h4><table>';
          for (var i=0; i < OGPAccount.account.vehicles.length; i++) {
            var aused = parseInt(OGPAccount.account.vehicles[i][4]);
            var dused = parseInt(OGPAccount.account.vehicles[i][5]);
            var qt = parseInt(OGPAccount.account.vehicles[i][3]);
            if (qt > aused && qt > dused) {
              txt +='<tr><td>' + OGPAccount.account.vehicles[i][0] + '(';
              txt +=OGPAccount.account.vehicles[i][1] + '/' + OGPAccount.account.vehicles[i][2] + ')</td>';
              if (aused > dused)
                txt += '<td>' + (qt-aused) + '</td>';
              else
                txt += '<td>' + (qt-dused) + '</td>';
            }
          }
          txt += '</table></td>';
          txt += '<td><h4>Animals</h4><table>';
          for (var i=0; i < OGPAccount.account.animals.length; i++) {
            var aused = parseInt(OGPAccount.account.animals[i][4]);
            var dused = parseInt(OGPAccount.account.animals[i][5]);
            var qt = parseInt(OGPAccount.account.animals[i][3]);
            if (qt > aused && qt > dused) {
              txt +='<tr><td>' + OGPAccount.account.animals[i][0] + '(';
              txt +=OGPAccount.account.animals[i][1] + '/' + OGPAccount.account.animals[i][2] + ')</td>';
              if (aused > dused)
                txt += '<td>' + (qt-aused) + '</td>';
              else
                txt += '<td>' + (qt-dused) + '</td>';
            }
          }
          txt += '</table></td>';
          txt += '</tr></table>';
          txt += '</td>';
          txt += '</tr>';
          txt += '</table>';
          OGPDisplay.clearSetup();
          OGPDisplay.setHTML('divOGPResults',txt);
          break;
    }
  };
  
  this.getInvItem = function (r,s) {
    var title = OGPParser.getValueInTags(r.substr(s),'strong');
    s = r.indexOf('table',s);
    if (s < 0) return null;
    s = r.indexOf('<img',s);
    if (s < 0) return null;
    var attack = parseInt(OGPParser.getValueInTags(r.substr(s),'img'));
    if (!isNaN(attack)) {
      // Has an attack value, regular loot
      s = r.indexOf('<img',++s);
      if (s < 0) return null;
      var defense = parseInt(OGPParser.getValueInTags(r.substr(s),'img'));
    } else {
      // Special loot with no A/D
      attack = 0;
      var defense = 0;
    }
    s = r.indexOf('Owned:',s);s+=6;
    if (s < 0) return null;
    var qt = parseInt(r.substr(s));
    return new Array(title,attack,defense,qt,0,0);
  }

  this.sortArrayDesc = function(ar,pos) {
    for (var i=0; i < ar.length-1; i++)
      for (var j=i+1; j < ar.length; j++)
        if (ar[i][pos] < ar[j][pos]) {
          var t = ar[i];
          ar[i] = ar[j];
          ar[j] = t;
        }
    return ar;
  };
  
  this.sortArrayAsc = function(ar,pos) {
    for (var i=0; i < ar.length-1; i++)
      for (var j=i+1; j < ar.length; j++)
        if (ar[i][pos] > ar[j][pos]) {
          var t = ar[i];
          ar[i] = ar[j];
          ar[j] = t;
        }
    return ar;
  };
  
  this.setUsedLoot = function(ar,ad,pos) {
    var msize = parseInt(OGPAccount.account.mafiasize);
    if (msize > 501) msize = 501;
    var tu = 0;
    var allused = 0;
    while (tu < msize && allused == 0) {
      var biga = 0;bigi = -1;
      for (var i=0; i < ar.length; i++) {
        if (ar[i][pos]==0 && parseInt(ar[i][ad]) >= biga && parseInt(ar[i][3]) > 0) {
          biga = ar[i][ad]; 
          bigi=i;
        }
      }
      if (bigi >= 0) {
        if ((parseInt(ar[bigi][3])+parseInt(tu)) > msize) {
          ar[bigi][pos] = parseInt(msize)-parseInt(tu);
        }
        else
          ar[bigi][pos] = ar[bigi][3];
        tu += parseInt(ar[bigi][pos]);
      }
      else
        allused = 1;
    }
    return ar;
  };
  
  this.getFactionItem = function(r,str) {
    var s = r.indexOf(str);
    s = r.indexOf('<img',s);
    var attack = parseInt(OGPParser.getValueInTags(r.substr(s),'img'));
    s = r.indexOf('<img',++s);
    var defense = parseInt(OGPParser.getValueInTags(r.substr(s),'img'));
    s = r.indexOf('Owned:',s);s+=6;
    var qt = parseInt(r.substr(s));
    return new Array(str,attack,defense,qt,0,0);
  };
  
  this.lootgetlow = function(s1,v1,v2,v3,v4,v5,v6,defval) {
    var ev = defval;
    if (v1 < ev && v1 > s1) ev = v1-1;
    if (v2 < ev && v2 > s1) ev = v2-1;
    if (v3 < ev && v3 > s1) ev = v3-1;
    if (v4 < ev && v4 > s1) ev = v4-1;
    if (v5 < ev && v5 > s1) ev = v5-1;
    if (v6 < ev && v6 > s1) ev = v6-1;
    return(ev);
  };
  
  this.loadFBFriends = function(retfunction) {
    var qry = "SELECT uid,name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1=" + FB.Facebook.apiClient.get_session().uid + ") ORDER BY name";
    FB.Facebook.apiClient.fql_query(qry,
      function(rows) {
        OGPDisplay.setHTML('divCurFriends',rows.length);
        for (var i=0; i < rows.length; i++)
        {
          OGPAccount.friends[i] = new Array(rows[i].uid,rows[i].name,0);
        }
        if (retfunction != '') eval(retfunction);
      });
  };

  this.addFriends = function(step,index) {

    switch(step) {
      case 0:
        var txt = '';
        txt += '<table id="tblAddFriends" name="tblAddFriends">';
        txt += '<tr><td style="width:50%"><div>Current Friends: </div><div id="divCurFriends" name="divCurFriends"></div></td>';
        txt += '<td><div>Current Mafia Members: </div><div id="divCurMafia" name="divCurMafia"></div></td></tr>';
        txt += '<tr><td colspan="2"><div id="divAFStatus">&nbsp;</div></td></tr>';
        txt += '</table>';
        OGPDisplay.setHTML('divOGPResults',txt);
        OGPAccount.addFriends(1,0);
        break;

      case 1:
        // Get the FB friend list from the API interface
        OGPDisplay.setHTML('divAFStatus','Loading your Facebook friend list');
        OGPAccount.loadFBFriends('OGPAccount.addFriends(2,0)');
        break;
    
      case 2:
        OGPDisplay.setHTML('divAFStatus','Loading current mafia member list');
        //var url = OGPConfig.MWURLAJAX + OGPConfig.urlMafiaList;
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlRecruit + '&xw_city=' + OGPConfig.currentCity + '&tmp=' + OGPConfig.tmpkey;
        OGPAjax.buildAjax(url,'OGPAccount.addFriends','3,%ix%');
        break;

      case 3:
        if (OGPAjax.ajax[index]) {
          var r = OGPAjax.ajax[index].response;
          if (r.indexOf('exclude_ids="') > 0) {
            var s = r.indexOf('exclude_ids="');
            s+=13;
            var str = '';
            while (r.substr(s,1) != '"') str+=r.substr(s++,1);
            OGPAccount.currentMafia = str.split(',');
            OGPDisplay.setHTML('divCurMafia',OGPAccount.currentMafia.length);
            OGPAccount.friendCount = -1;
            OGPAccount.addFriends(4,0); // Add a friend
            break;
          }
        }
        OGPDisplay.addLine('Could not load current mafia member list...Stopping',OGPConfig.clrFatal);
        break;
 
      case 4:
        OGPAccount.friendCount++;
        if (OGPAccount.friendCount < OGPAccount.friends.length) {
          var idFound = false;
          for (var i=0; i < OGPAccount.currentMafia.length; i++) {
            if (parseInt(OGPAccount.friends[OGPAccount.friendCount][0]) == parseInt(OGPAccount.currentMafia[i])) idFound = true;
          }
          if (idFound == false) {
            OGPDisplay.setHTML('divAFStatus','Attempting to add ' + OGPAccount.friends[OGPAccount.friendCount][1] + ' (' + OGPAccount.friends[OGPAccount.friendCount][0] + ')');
            OGPParser.setTempKey(document.body.innerHTML,'');
            var url = OGPConfig.FBAPPURL + OGPConfig.urlAddToMafiaP1 + OGPAccount.friends[OGPAccount.friendCount][0] + OGPConfig.urlAddToMafiaP2;
            e$('ogpiframe').src = url;
            // Wait 5 seconds and load the next one
            setTimeout("OGPAccount.addFriends(4,0)",5000);
          } else {
            // This friend already in our mafia, move to the next
            OGPAccount.addFriends(4,0);
            break;
          }
        } else {
          OGPDisplay.setHTML('divAFStatus','Completed attempts to add all friends to your mafia');
          break;
        }
        break;       
 
    }
  };

  this.useSkills = function(step,index) {
    
    switch(step) {
      case 0:
        if (OGPConfig.curSkillPoints == 0) {
          OGPDisplay.addLine('You have no skill points to spend',OGPConfig.clrWarning);
          break;
        } 
        OGPAccount.useSkills(1,0);
        break;

      case 1:
        var txt = '';
        txt += '<div id="divSkillSetup" name="divSkillSetup">';
        txt += '<table>';
        txt += '<tr>';
        txt += '<td>Add <select id="selSkillQty" name="selSkillQty">';
        for (var i=1; i <= OGPConfig.curSkillPoints; i++) {
          txt += '<option value="' + i + '">' + i + '</option>';
        }
        txt += '</select> points to ';
        txt += '<select id="selSkillCat" name="selSkillCat">';
        for (var i=0; i < OGPAccount.skills.length; i+=2) {
          txt += '<option value="' + OGPAccount.skills[i] + '">' + OGPAccount.skills[i+1] + '</option>';
        }
        //txt += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="ckExtra" name="ckExtra">Try for extras';
        txt += '<br />Selecting try for extras will ignore your quantity selection and could spend up to 250 points';
        txt += '</td></tr>';
        txt += '<tr><td><a onclick="OGPAccount.useSkills(2,0)">Use Skill Points</a></td></tr>';
        txt += '</table>';
        txt += '</div>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;

      case 2:
        /*
        if (e$('ckExtra').checked) {
          OGPAccount.useSkills(5,0);
          break;
        }
        */
        var qty = parseInt(e$('selSkillQty').value);
        var cat = e$('selSkillCat').value;
        OGPDisplay.clearSetup();
        var txt = '';
        txt += '<div id="divSkillResults" name="divSkillResults">';
        txt += '<table><tr><td>Skill Points Left:</td>';
        txt += '<td><div id="divSkillsLeft" name="divSkillsLeft">' + qty + '</div>';
        txt += '</td></tr></table>';
        txt += '</div>';
        OGPDisplay.setHTML('divOGPResults',txt);
        this.skillQty = qty;
        this.skillCat = cat;
        OGPAccount.useSkills(3,0);
        break;
        
      case 3:
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlSpendSkillPoints;
        url += '&upgrade_key=' + OGPAccount.skillCat + '&upgrade_amt=';
        if (parseInt(OGPAccount.skillQty) >= 5) {
          url += '5'; 
          OGPAccount.skillQty -= 5;
        } else {
          url += '1'; 
          OGPAccount.skillQty--;
        }
        OGPAjax.buildAjax(url,'OGPAccount.useSkills','4,%ix%');
        break;

      case 4:
        if (OGPAjax.ajax[index]) {
          OGPTimers.updateStats(1,index);          
          e$('divSkillsLeft').innerHTML = OGPAccount.skillQty;
          if (parseInt(OGPAccount.skillQty) > 0) {
            OGPAccount.useSkills(3,0);
          } else {
            e$('divSkillsLeft').innerHTML = '--Done--';
            OGPAccount.skillQty = 0;
            OGPAccount.skillCat = '';
            if (parseInt(OGPConfig.curSkillPoints) > 0)
              OGPAccount.useSkills(1,0);
          }
        } else {
          OGPDisplay.addLine('Could not spend skill point');
        }
        break;

      case 5:
        var cat = e$('selSkillCat').value;
        var qty = parseInt(e$('selSkillQty').value);
        var txt = '';
        txt += '<div id="divSkillResults" name="divSkillResults">';
        txt += 'Trying to add extra points...please wait for about 10 seconds';
        txt += '</div>';
        OGPDisplay.clearSetup();
        OGPDisplay.setHTML('divOGPResults',txt);
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlSpendSkillPoints;
        url += '&upgrade_key=' + cat + '&upgrade_amt=';
        if (parseInt(OGPConfig.curSkillPoints) >= 5) {
          url += '5'; 
        } else {
          url += '1'; 
        }
        for (var i=0; i < 10; i++)
          OGPAjax.buildAjax(url,'OGPAccount.useSkills','6,%ix%');
        break;
      
      case 6:
        OGPTimers.updateStats(1,index);
        break;
    }
  };  

  this.loadProfile = function(step,index,id) {

    switch(step) {
      case 0:
        var txt = '<table name="tblLoadProfile" id="tblLoadProfile">';
        txt += '<tr><td>Enter a UserID, paste a FB or MW link, or just drag a link here:';
        txt += '<input type="text" id="txtProfile" size="30">&nbsp;';
        txt += '<a onclick="OGPAccount.loadProfile(1,0,0);">Load Profile</a>';
        txt += '</td></tr></table>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        OGPDisplay.show('divOGPSetup');
        OGPDisplay.clearResults();
        break;

      case 1:
        var v = unescape(e$('txtProfile').value);
        var idToLoad = '';
        if (v != '') {
          if (OGPParser.isNumeric(v)) {
            idToLoad = v;
          } else if (v.indexOf('next_params=') > 0) {
            var s = v.indexOf('next_params=') + 12;
            var x = '';
            while (s < v.length && v.substr(s,1)!='&') x+=v.substr(s++,1);
            x = OGPParser.decodeBase64(x);
            if (x.indexOf('user=') > 0) {
              e$('txtProfile').value = x;
              OGPAccount.loadProfile(1,0,0);
              return;
            } 
          }
          else if (v.indexOf('user=') > 0) {idToLoad=OGPParser.findId(v,'user=');}
          else if (v.indexOf('{"user":"') > 0) {idToLoad=OGPParser.findId(v,'{"user":"');}
          else if (v.indexOf('target_id=') > 0) {idToLoad=OGPParser.findId(v,'target_id=');}
          else if (v.indexOf('fid=') > 0) {idToLoad=OGPParser.findId(v,'fid=');}
          else if (v.indexOf('leader_id=') > 0) {idToLoad=OGPParser.findId(v,'leader_id=');}
          else if (v.indexOf('id=') > 0) {idToLoad=OGPParser.findId(v,'id=');}
        }
        if (idToLoad == '') {
          OGPDisplay.addLine('The entered value does not contain profile information.',OGPConfig.clrWarning);
        } else {
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlProfile + '&xw_city=' + OGPConfig.currentCity + '&user=' + idToLoad;
          OGPAjax.buildAjax(url,'OGPAccount.loadProfile','2,%ix%,\'' + idToLoad + '\'');
        }          
        break;
      
      case 2:
        //e$('divOGPDebug').innerHTML = '<textarea>' + OGPAjax.ajax[index].response + '</textarea>';
        OGPDisplay.showPage(index,'inner_page');
        var r = OGPAjax.ajax[index].response;
        var UName = OGPParser.getUserNameFromProfile(OGPAjax.ajax[index].response);
        var txt='<table name="tblProfileLinks" id="tblProfileLinks">';
        txt+='<tr><th colspan="2">The following links can be used to save as bookmarks, or you can save them to your MW Tools Favorites.</th></tr>';
        txt+='<tr><th colspan="2">(You are currently using ' + OGPAccount.getUsedFavoriteSize() + ' of your available 4000 characters.)</th></tr>';
        txt+='<tr><th colspan="2"><a onclick="OGPAccount.saveFavorite(\'' + UName + '\',' + id + ');">Save To My Favorites</a></td></tr>';
        txt+='<tr><td colspan="2">&nbsp;</td></tr>';
        if (id.indexOf('p|') < 0)
          txt+='<tr><td>FB Link:</td><td><a href="' + OGPConfig.urlFBProfileLink + id + '" target="_blank">' + OGPConfig.urlFBProfileLink + id + '</a></td></tr>';
        txt+='<tr><td>MW Link:</td><td><a href="' + OGPConfig.urlMWProfileLink + id + '" target="_blank">' + OGPConfig.urlMWProfileLink + id + '</a></td></tr>';
        txt+='</table>';
        OGPDisplay.setHTML('divOGPResults',txt);
        //OGPDisplay.show('');
        break;
    }    

  };


  this.getUsedFavoriteSize = function() {
    if (OGPCookie.readCookie('ogp_favorites'))
      return OGPCookie.readCookie('ogp_favorites').length;
    else
      return 0;
  };
  
  this.saveFavorite = function(name,id) {
    var curcookie = OGPCookie.readCookie('ogp_favorites');
    if (!curcookie) {
      curcookie = name + ':|:' + id;
      OGPCookie.createCookie('ogp_favorites',curcookie,365);
      OGPDisplay.addLine('User account saved to your favorites.',OGPConfig.clrGood);
    } else {
      // Check for duplicate
      var arFav = curcookie.split(':|:');
      var duplicate = false;
      for (var i=0; i < arFav.length; i++)
        if (arFav[i]==id) duplicate = true;
      if (duplicate) {
        OGPDisplay.addLine('This account is already saved in your favorites.',OGPConfig.clrWarning);
        return;
      } else {
        if (curcookie.length + name.length + id.length + 6 > 4000) {
          OGPDisplay.addLine('Saving favorite would exceed cookie limit',OGPConfig.clrWarning);
          return;
        } else {
          if (curcookie != '') curcookie += ':|:';
          curcookie += name + ':|:' + id;
          OGPCookie.createCookie('ogp_favorites',curcookie,365);
          OGPDisplay.addLine('User account saved to your favorites.',OGPConfig.clrGood);
        }
      }
    }
  };

  this.manageFavorites = function(edit) {
    OGPDisplay.clearSetup();
    var curcookie = OGPCookie.readCookie('ogp_favorites');
    if (!curcookie) {
      OGPDisplay.addLine('You do not have any saved profiles.',OGPConfig.clrWarning);
      OGPDisplay.clearResults();
      OGPDisplay.clearSetup();
      return;
    }

    var favs = curcookie.split(':|:');
    if (favs.length <= 1) {
      OGPDisplay.addLine('Your saved favorites links are corrupt.  The current content is displayed below.',OGPConfig.clrError);
      var txt = 'The saved favorites do not match the proper format.  The cookie may have become corrupt.';
      txt += 'The contents of the current cookie are displayed below to allow you to save the contents ';
      txt += 'of your saved profiles.  The cookie has been cleared and will need to be recreated.<br /><br />';
      txt += 'Saved Favorites Content:';
      txt += '<div>' + curcookie + '</div>';
      OGPDisplay.setHTML('divOGPResults',txt);
    } else {
      var txt = '<input type="hidden" name="txtProfile" id="txtProfile" value="">';
      txt += '<table name="tblFavorites" id="tblFavorites">';
      txt += '<tr><th>Mafia Member</th><th>MW Link</th><th>FB Link</th><th>Delete</th></tr>';
      for (var i = 0; i < parseInt(favs.length/2); i++) {
        txt += '<tr><td>' + favs[i*2] + '</td>';
        txt += '<td><a onclick="OGPAccount.loadFavorite(' + favs[(i*2)+1] + ');">Load MW Profile</a></td>';
        txt += '<td><a href="http://www.facebook.com/profile.php?id=' + favs[(i*2)+1] + '" target="_blank">Load FB Profile</a></td>';
        txt += '<td><a onclick="OGPAccount.deleteFavorite(' + favs[(i*2)+1] + ')";>Delete</a></td></tr>';
      }
      OGPDisplay.setHTML('divOGPResults',txt);
    }
  };

  this.loadFavorite = function(id) {
    e$('txtProfile').value = id;
    OGPAccount.loadProfile(1,0);  
  };

  this.deleteFavorite = function(id) {
    var curcookie = OGPCookie.readCookie('ogp_favorites');
    if (!curcookie) {
      OGPDisplay.addLine('No saved profiles were found.',OGPConfig.clrError);
      OGPDisplay.resetDisplay();
      return;
    }

    var favs = curcookie.split(':|:');
    for (var i = 0; i < parseInt(favs.length/2); i++) {
      if (favs[(i*2)+1]==id) {
        favs[i*2] = '';
        favs[(i*2)+1] = '';
      }
    }
    curcookie = '';
    for (var i = 0; i < parseInt(favs.length/2); i++) {
      if (favs[i*2] != '') {
        if (curcookie != '') curcookie += ':|:';
        curcookie+=favs[i*2] + ':|:' + favs[(i*2)+1];
      }
    }
    OGPCookie.createCookie('ogp_favorites',curcookie,365);
    OGPAccount.manageFavorites();
  };      


  this.promote = function(step,index,val) {

    switch(step) {

      case 0:
        if (!OGPParser.getTargetUser()) {
          OGPDisplay.addLine('This function must be run from a user\'s profile page',OGPConfig.clrWarning);
          break;
        }
        var txt='';
        txt += '<div name="divPromote" id="divPromote">';
        txt += 'Select the position to promote this user to: <br />';
        for (var i=0; i < OGPAccount.topmafia.length; i+=2) {
          txt += '<a onclick="OGPAccount.promote(1,0,\'' + OGPAccount.topmafia[i+1] + '\');">' + OGPAccount.topmafia[i] + '</a>';
        }
        txt += '</div>';
        OGPDisplay.setHTML('divOGPSetup',txt);

        break;

      case 1: 
        OGPDisplay.clearSetup();
        OGPDisplay.setHTML('divOGPResults','<div style="width:100%;text-align:center;">Attempting to Promote...</div>');
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlPromotePage;
        url += '&xw_city=' + OGPConfig.currentCity;
        url += '&pid=' + OGPParser.getTargetUser();
        url += '&tmp=' + OGPConfig.tmpkey;
        OGPAjax.buildAjax(url,'OGPAccount.promote','2,%ix%,"' + val + '"');
        break;
        
      case 2:
        var r = OGPAjax.ajax[index].response;
        var promotekey = OGPParser.setTempKey(r,'promote');

        // Promote and display the results
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlPromote + val;
        url += '&xw_city=' + OGPConfig.currentCity;
        url += '&pid=' + OGPParser.getTargetUser();
        url += '&tmp=' + promotekey;
        OGPAjax.buildAjax(url,'OGPAccount.promote','3,%ix%,""');
        break;
        
      case 3:
        // Display the top mafia
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlMafiaPage;
        url += '&xw_city=' + OGPConfig.currentCity;
        url += '&tmp=' + OGPConfig.tmpkey;
        OGPAjax.buildAjax(url,'OGPAccount.promote','4,%ix%,""');
        break;
        
      case 4:
        OGPDisplay.setHTML('divOGPResults','<div style="width:100%;text-align:center;">-- Done --</div>');
        if (OGPAjax.ajax[index]) {
          OGPDisplay.showPage(index,'inner_page');
          OGPDisplay.addLine('Promotion Attempted.  Your current Top Mafia is shown below',OGPConfig.clrGood);
        }
        break;
    }
  }

};


/***************************************
  Send Loot, Gifts, Collections 
****************************************/
function ogpSendDef() {
  
  this.giftkey = null;
  this.tmpkey = null;
  this.recipient = null;
  this.weapons = new Array();
  this.armor = new Array();
  this.vehicles = new Array();
  this.special = new Array();
  
  this.amountToSend = '';
  this.itemToSend = '';
  this.itemToSendDesc = '';
  this.sentItemCount = 0;
  this.sentRetryCount = 0;
  this.triedGiftKey = false;
  this.sendDelay = 500;
  this.sendDelayFlag = false;
  this.pauseSending = false;
  this.lootqueue = new Array();
  this.lootIndex = 0;
  this.sendUsername = '';
  
  this.colSendCity = 0;
  this.colSendItems = new Array();
  this.colSendRetries = 0;
  
  this.colType = 0;
  
  this.sendLoot = function(step,index) {
    switch(step) {
      case 0: // See if the user is on a profile page
        if (!OGPParser.getTargetUser()) {
          OGPDisplay.addLine('The ID for the user to send loot to could not be found on this page.  Be sure you have loaded a user profile page.',OGPConfig.clrUserError);
          return;
        }
        // Valid user to send to, save the id and try to get the tempkey and gift key
        OGPSend.recipient = OGPParser.getTargetUser();
        var tmp = OGPParser.getValueInTags(document.body.innerHTML,'class="stats_title_text"');
        tmp = tmp.split('"');
        OGPSend.sendUsername = tmp[1];
        if (!OGPSend.getGiftTempKey()) {
          OGPDisplay.addLine('Could not get gifting temp key.  Reload the user profile and try again',OGPConfig.clrWarning);
          break;
        }
        if (!OGPSend.giftkey) {
          var r = document.body.innerHTML;
          var s = r.indexOf('gift_key=');
          if (s < 0) {
            // Handle reloading here
            if (OGPSend.triedGiftKey==false) {
              OGPDisplay.addLine('Can not find gift key, reloading profile',OGPConfig.clrInfo);
              OGPSend.triedGiftKey = true;
              OGPAjax.buildAjax(OGPConfig.MWURLAJAX + OGPConfig.urlProfile + '&xw_city=' + OGPConfig.currentCity + '&id=' + OGPSend.recipient + '&tmp=' + OGPConfig.tmpkey, 'OGPSend.reloadProfile','%ix%,OGPSend.sendLoot(0,0)');
            } else {
              OGPDisplay.addLine('Can not retrieve the gift key for this user.  Make sure they have an item on their wishlist.',OGPConfig.clrWarning);
              break;
            }
          }
          s+=9;
          var x = '';
          while (r.substr(s,1) != '&' && r.substr(s,1) != '"') x+=r.substr(s++,1);
          OGPSend.giftkey = x;
        }
        
        OGPSend.lootqueue.length = 0;
        // Build the table
        OGPSend.triedGiftKey = false;
        var txt = '';
        txt += '<table name="tblSendLoot" id="tblSendLoot">';
        txt += '<tr>';
        txt += '<td>Quantity:<br /><select name="selOGPSendQty" id="selOGPSendQty" onchange="OGPSend.updateSendGiftSelections(-1)">';
        txt += '<option value="">--</option>';
        for (var i=1; i <= 100; i++) txt+='<option value="' + i + '">' + i + '</option>';
        for (var i=125; i <= 500; i+=25) txt+='<option value="' + i + '">' + i + '</option>';
        for (var i=600; i <= 2000; i+=100) txt+='<option value="' + i + '">' + i + '</option>';
        for (var i=2500; i <= 10000; i+=500) txt+='<option value="' + i + '">' + i + '</option>';
        for (var i=15000; i <= 50000; i+=5000) txt+='<option value="' + i + '">' + i + '</option>';
        txt += '</select></td>\n';
        for (var i = 0; i < OGPItems.lootTypes.length; i++) {
          if (i==4) txt += '</tr><tr><th></th>';
          txt += '<td>' + OGPItems.lootTypes[i] + '<br />';
          var tarray = new Array();
          tarray.length = 0;
          for (var j = 0; j < OGPItems.lootItems.length; j++) {
            if (OGPItems.lootItems[j][2] == i) {
              if (tarray.length == 0) {
                tarray[0] = OGPItems.lootItems[j];
              } else {
                var insert = tarray.length;
                for (var k = tarray.length-1; k >= 0; k--) {
                  if (OGPItems.lootItems[j][0] < tarray[k][0]) {
                    insert = k;
                  }
                }
                for (var l = tarray.length; l > insert; l--) {
                      tarray[l] = tarray[l-1];
                }
                tarray[insert] = OGPItems.lootItems[j];
              }
            }
          }
          txt += '<select name="selOGPLootType' + i + '" id="selOGPLootType' + i + '" onchange="OGPSend.updateSendGiftSelections(' + i + ')">';
          txt += '<option value="">--</option>';
          for (var j=0; j < tarray.length; j++) {
            txt += '<option value="' + tarray[j][1] + '">' + tarray[j][0].replace(/@/g,"'") + '</option>';
          }
          txt += '</select>';
          txt += '</td>\n';
        }
        txt += '</tr>';
        txt += '</table>';
        txt += '<div style="text-align:center;color:#ffff00;font-size:12px;" id="divOGPSendLoot" name="divOGPSendLoot">Select quantity and item to send</div>';
        txt += '<table align="center" class="tblSendItems">';
        txt += '<tr>';
        txt += '<td style="width:200px;"><div id="divOGPSendAdd" name="divOGPSendAdd"></div></td>';
        txt += '<td style="width:200px;margin-left:10px;border:1px solid #fff" valign="top">';
        txt += '<b><u>Send Queue</u></b>';
        txt += '<div id="divOGPSendQueue" name="divOGPSendQueue"></div>';
        txt += '</td></tr>';
        txt += '</table>';
        txt += '<div style="text-align:center;font-size:12px;" id="divOGPSendStart" name="divOGPSendStart"></div>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        OGPDisplay.show('divOGPSetup');
        break;
        
      case 2:
        OGPDisplay.clearSetup();
        OGPSend.sentItemCount = 0;
        var txt = '';
        txt +='<table align="center" style="width:600px;border:1px solid #fff">';
        txt +='<tr><th style="text-align:left;">Item(s) To Send</th><th style="text-align:left;">Send Results</th></tr>';
        txt +='<tr><td><table>';
        for (var i=0; i < OGPSend.lootqueue.length; i++) {
          txt += '<tr><td style="font-size:11px;padding:0px;margin:0px;">' + OGPSend.lootqueue[i][0] + 'x</td><td style="font-size:11px;margin:0px;padding:0px;">' + OGPSend.lootqueue[i][2] + '</td></tr>';
        }
        txt +='</table></td>';
        txt +='<td style="width:75%;" valign="top"><div style="font-size:11px;" id="divOGPSendResults" name="divOGPSendResults"></div></td>';
        txt +='</tr></table>';
        txt +='<div id="divSingleSend">';
        txt +='<table name="tblSendItems" id="tblSendItems">';
        txt +='<tr><th>Item To Send</th><th>Sent</th><th>Remaining</th><th>Retries</th></tr>';
        txt +='<tr><td><div name="divItemToSend" id="divItemToSend"></div></td>';
        txt +='<td><div name="divSentCount" id="divSentCount">0</div></td>';
        txt +='<td><div name="divRemaining" id="divRemaining">' + OGPSend.amountToSend + '</div></td>';
        txt +='<td><div name="divRetries" id="divRetries">0</div></td>';
        txt +='</tr></table>';
        txt +='<div name="divSendItemControl" id="divSendItemControl"><a onclick="OGPSend.toggleSendRun()">Pause Sending</a></div></div>';
        OGPDisplay.setHTML('divOGPResults',txt);
        OGPSend.sendDelay = 500;
        OGPSend.sendDelayFlag = false;
        OGPSend.sentRetryCount = 0;
        OGPSend.sentItemCount = 0;
        OGPSend.pauseSending = false;
        OGPSend.lootIndex = 0;
        OGPSend.amountToSend = OGPSend.lootqueue[0][0];
        OGPSend.itemToSend = OGPSend.lootqueue[0][1];
        OGPSend.itemToSendDesc = OGPSend.lootqueue[0][2];
        OGPSend.sendLoot(3,0);
        break;
      
      case 3: // Send up to 50 items
        OGPDisplay.setHTML('divSentCount',OGPSend.sentItemCount);
        OGPDisplay.setHTML('divRemaining',OGPSend.amountToSend-OGPSend.sentItemCount);
        OGPDisplay.setHTML('divItemToSend',OGPSend.itemToSendDesc);
      
        if (parseInt(OGPSend.sentItemCount) >= parseInt(OGPSend.amountToSend)) {
          e$('divOGPSendResults').innerHTML += '[' + OGPParser.getCurTime() + '] Sent ' + OGPSend.lootqueue[OGPSend.lootIndex][0] + 'x ' + OGPSend.lootqueue[OGPSend.lootIndex][2] + ' to ' + OGPSend.sendUsername + '<br>';
          //This item done, move to the next
          OGPSend.lootIndex++;
          if (OGPSend.lootIndex >= OGPSend.lootqueue.length) {
            OGPDisplay.addLine('All items have been sent',OGPConfig.clrGood);
            OGPDisplay.setHTML('divSingleSend','');
            return;
          } else {
            // Move to next
            OGPSend.amountToSend = OGPSend.lootqueue[OGPSend.lootIndex][0];
            OGPSend.itemToSend = OGPSend.lootqueue[OGPSend.lootIndex][1];
            OGPSend.itemToSendDesc = OGPSend.lootqueue[OGPSend.lootIndex][2];
            OGPSend.sentItemCount = 0;
            OGPSend.sentRetryCount = 0;
            OGPDisplay.setHTML('divSentCount',OGPSend.sentItemCount);
            OGPDisplay.setHTML('divRemaining',OGPSend.amountToSend-OGPSend.sentItemCount);
            OGPDisplay.setHTML('divItemToSend',OGPSend.itemToSendDesc);
          }
        }
        // Get a free ajax object index
        var ix = OGPAjax.getAjaxIndex();
        
        // Get the gift category
        var cat = 0;
        for (var i=0; i < OGPItems.lootItems.length; i++) {
          if (OGPItems.lootItems[i][0] == OGPSend.itemToSendDesc)
            cat = i;
        }
        
        // Build the new ajax object
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlSendItemNew;
        OGPAjax.ajax[ix].requestFile = url;
        OGPAjax.ajax[ix].setVar('ajax',1);
        OGPAjax.ajax[ix].setVar('gift_key',OGPSend.giftkey);
        OGPAjax.ajax[ix].setVar('gift_id',OGPSend.itemToSend);
        OGPAjax.ajax[ix].setVar('gift_category',OGPItems.lootItems[cat][3]);
        
        // See how many we're sending
        var giftcount=1;
        if (parseInt(OGPSend.amountToSend) - parseInt(OGPSend.sentItemCount) >= 50)
          giftcount=50;
        else if (parseInt(OGPSend.amountToSend) - parseInt(OGPSend.sentItemCount) >= 25)
          giftcount=25;
        else if (parseInt(OGPSend.amountToSend) - parseInt(OGPSend.sentItemCount) >= 10)
          giftcount=10;
        else if (parseInt(OGPSend.amountToSend) - parseInt(OGPSend.sentItemCount) >= 5)
          giftcount=5;
        
        OGPAjax.ajax[ix].setVar('gift_count',giftcount);
        OGPAjax.ajax[ix].setVar('recipients[0]',unescape(OGPSend.recipient));
        OGPAjax.ajax[ix].setVar('liteload','1');
        OGPAjax.ajax[ix].setVar('sf_xw_user_id',OGPConfig.local_player_id);
        OGPAjax.ajax[ix].setVar('sf_xw_sig',OGPConfig.local_xw_sig);
        OGPAjax.buildAjaxForm(ix,'OGPSend.sendLoot','4,%ix%');
        break;
        
      case 4:
        var r=' ';
        if (OGPAjax.ajax[index]) r = OGPAjax.ajax[index].response;
        //e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>';
        if (!r) r=' ';
        var s = r.indexOf('class="message_body"');
        var e = r.indexOf('</td>',s);
        var results = '';
        if (s>-1 && e>-1) results = r.substr(s,e-s);
        //var results = OGPParser.getValueInTags(r,'class="message_body"',0);
        if (OGPSend.pauseSending==true)
          OGPDisplay.setHTML('divSendItemControl','<a onclick="OGPSend.toggleSendRun()">Resume Sending</a>');
        else
          OGPDisplay.setHTML('divSendItemControl','<a onclick="OGPSend.toggleSendRun()">Pause Sending</a>');
        if (results.indexOf('You gave') >= 0) {
          // Success
          // Find out how many were sent
          var sent = results.indexOf('You gave') + 8;
          OGPSend.sentItemCount += parseInt(results.substr(sent,10));
          //OGPSend.sentItemCount++;
          OGPDisplay.setHTML('divSentCount',OGPSend.sentItemCount);
          OGPDisplay.setHTML('divRemaining',OGPSend.amountToSend-OGPSend.sentItemCount);
          OGPDisplay.setHTML('divItemToSend',OGPSend.itemToSendDesc);
          if (OGPSend.pauseSending==false) setTimeout('OGPSend.sendLoot(3,0)',OGPSend.sendDelay);
        } else if (results.indexOf('You don') >= 0) {
          // Not enough
          OGPDisplay.addLine('You do not have enough of those left to send...skipping',OGPConfig.clrWarning);
          e$('divOGPSendResults').innerHTML += '[' + OGPParser.getCurTime() + '] <font color="#ff0">Sent ' + OGPSend.sentItemCount + ' of ' + OGPSend.amountToSend + ' ' + OGPSend.itemToSendDesc + ' to ' + OGPSend.sendUsername + '</font><br>';
          OGPSend.lootIndex++;
          if (OGPSend.lootIndex < OGPSend.lootqueue.length) {
            // Move to next
            OGPSend.amountToSend = OGPSend.lootqueue[OGPSend.lootIndex][0];
            OGPSend.itemToSend = OGPSend.lootqueue[OGPSend.lootIndex][1];
            OGPSend.itemToSendDesc = OGPSend.lootqueue[OGPSend.lootIndex][2];
            OGPSend.sentItemCount = 0;
            OGPSend.sentRetryCount = 0;
            OGPDisplay.setHTML('divSentCount',OGPSend.sentItemCount);
            OGPDisplay.setHTML('divRemaining',OGPSend.amountToSend-OGPSend.sentItemCount);
            OGPDisplay.setHTML('divItemToSend',OGPSend.itemToSendDesc);
            if (OGPSend.pauseSending==false) setTimeout('OGPSend.sendLoot(3,0)',OGPSend.sendDelay);
          } else {
            // All done
            OGPDisplay.addLine('All items have been sent',OGPConfig.clrGood);
            OGPDisplay.setHTML('divSingleSend','');
            return;
          }
          
        } else if (results.indexOf('Please wait a moment') >= 0) {
          // Too quick, try again
            OGPSend.sendDelay += 100;
            OGPSend.sendDelayFlag = true;
            OGPSend.sentRetryCount++;
            OGPDisplay.setHTML('divRetries',OGPSend.sentRetryCount);
            if (OGPSend.pauseSending==false) OGPSend.sendLoot(3,0);
        } else {
          // Something else, trap for now
          if (OGPConfig.Session == 0) {
            OGPDisplay.addLine('Session has timed out, stopping sending items.',OGPConfig.clrFatal);
            OGPDisplay.setHTML('divSingleSend','');
          } else {
            if (results.indexOf('You have already reached the daily limit for today') >= 0) {
              OGPDisplay.setHTML('divSendItemControl','Maximum daily gift limit reached...Stopping.');
              OGPDisplay.setHTML('divSingleSend','');
            } else {
              OGPDisplay.addLine('Unrecognized Response, Attempting to Continue.',OGPConfig.clrWarning); 
              if (OGPSend.pauseSending==false) OGPSend.sendLoot(3,0);
            }
          }
        }
        break;
    }
  };

  this.updateSendGiftSelections = function(dd) {
    OGPSend.amountToSend = e$('selOGPSendQty').options[e$('selOGPSendQty').selectedIndex].value;
    if (dd >= 0) {
      OGPSend.itemToSend = e$('selOGPLootType' + dd).options[e$('selOGPLootType' + dd).selectedIndex].value;
      OGPSend.itemToSendDesc = e$('selOGPLootType' + dd).options[e$('selOGPLootType' + dd).selectedIndex].text;
    }
    if (OGPSend.itemToSend == '' || OGPSend.amountToSend == '') {
      OGPDisplay.setHTML('divOGPSendLoot','Select the quantity and gift to send');
      OGPDisplay.hide('divOGPSendStart');
    } else {
      OGPDisplay.setHTML('divOGPSendLoot','Ready to add ' + OGPSend.amountToSend + ' ' + OGPSend.itemToSendDesc + '(s)');
      OGPDisplay.setHTML('divOGPSendAdd','<a onclick="OGPSend.addToQueue()">Add Item(s) To Queue</a>');
      OGPDisplay.show('divOGPSendStart');
    }
  };
  
  this.addToQueue = function() {
    OGPSend.lootqueue[OGPSend.lootqueue.length] = new Array(OGPSend.amountToSend,OGPSend.itemToSend,OGPSend.itemToSendDesc);
    OGPDisplay.setHTML('divOGPSendAdd','&nbsp;');
    OGPDisplay.setHTML('divOGPSendLoot','Select quantity and item to send');
    var txt = '';
    txt += '<table><tr><th>Qt.</th><th nowrap>Item</th></tr>';
    for (var i=0; i < OGPSend.lootqueue.length; i++) {
      txt += '<tr><td>' + OGPSend.lootqueue[i][0] + '</td>';
      txt += '<td nowrap>' + OGPSend.lootqueue[i][2] + '</td></tr>';
    }
    txt += '</table>';
    OGPDisplay.setHTML('divOGPSendQueue',txt);
    OGPDisplay.setHTML('divOGPSendStart','<a onclick="OGPSend.sendLoot(2,0)">Send Items</a>');
  };
  
  this.toggleSendRun = function() {
    if (this.pauseSending == true) {
      this.pauseSending = false;
      OGPDisplay.addLine('Loot sending resuming',OGPConfig.clrInfo);
      OGPDisplay.setHTML('divSendItemControl',' -- Wait -- ');
      OGPSend.sendLoot(2,0); 
    } else {
      this.pauseSending = true;
      OGPDisplay.addLine('Loot sending paused...current send operation will complete.',OGPConfig.clrInfo);
      OGPDisplay.setHTML('divSendItemControl',' -- Wait -- ');
    }
  }
  this.reloadProfile = function(index,retfunction) {
    var r = OGPAjax.ajax[index].response;
    OGPDisplay.setHTML('content_row','');
    var newdiv = document.createElement('div');
    newdiv.innerHTML = r;
    var container = e$('content_row');
    container.appendChild(newdiv);
    eval(retfunction);
  };
  
  this.getGiftTempKey = function() {
    var r = document.body.innerHTML;
    var s = r.indexOf('var wishlist_urls');
    if (s < 0) return null;
    s = r.indexOf('gift_key=',s);
    if (s < 0) return null;
    s = r.indexOf('=',s) + 1;
    var x = '';
    while (r.substr(s,1) != '&' && r.substr(s,1) != '"') x += r.substr(s++,1);
    return x;
  };
  
  this.sendCollections = function(step,index) {
    
    this.sendCity = 0;
    this.colItems = new Array();
    
    switch(step) {
      case 0:
        OGPSend.colType = 0;
        if (!OGPParser.getTargetUser()) {
          OGPDisplay.addLine('The ID for the user to send collection items to could not be found on this page.  Be sure you have loaded a user profile page.',OGPConfig.clrUserError);
          return;
        }
        // Valid user to send to, save the id and try to get the tempkey and gift key
        OGPSend.recipient = OGPParser.getTargetUser();
        if (!OGPSend.getGiftTempKey()) {
          OGPDisplay.addLine('Could not get gifting temp key.  Reload the user profile and try again',OGPConfig.clrWarning);
          break;
        }
        if (!OGPSend.giftkey) {
          var r = document.body.innerHTML;
          var s = r.indexOf('gift_key=');
          if (s < 0) {
            // Handle reloading here
            if (OGPSend.triedGiftKey==false) {
              OGPDisplay.addLine('Can not find gift key, reloading profile',OGPConfig.clrInfo);
              OGPSend.triedGiftKey = true;
              OGPAjax.buildAjax(OGPConfig.MWURLAJAX + OGPConfig.urlProfile + '&xw_city=' + OGPConfig.currentCity + '&id=' + OGPSend.recipient + '&tmp=' + OGPConfig.tmpkey, 'OGPSend.reloadProfile','%ix%,OGPSend.sendCollections(0,0)');
            } else {
              OGPDisplay.addLine('Can not retrieve the gift key for this user.  Make sure they have an item on their wishlist.',OGPConfig.clrWarning);
              break;
            }
          }
          s+=9;
          var x = '';
          while (r.substr(s,1) != '&' && r.substr(s,1) != '"') x+=r.substr(s++,1);
          OGPSend.giftkey = x;
        }
        OGPSend.colSendCity = 0;
        OGPSend.colItems.length = 0;
        OGPConfig.originalCity = OGPConfig.currentCity;
        var txt = '<div id="divCitySelect" name="divCitySelect">';
        txt += 'Select the city for the collection items:<br />';
        for (var i=0; i < OGPItems.cities.length; i++) {
          txt += '&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="OGPSend.colSendCity=' + OGPItems.cities[i][3] + ';OGPSend.sendCollections(1,0);">';
          txt += OGPItems.cities[i][0] + '</a>';
        }
        // Add special and crew
        txt += '&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="OGPSend.colSendCity=' + OGPConfig.currentCity + ';OGPSend.sendCollections(1,4);">';
        txt += 'Crew</a>';
        txt += '&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="OGPSend.colSendCity=' + OGPConfig.currentCity + ';OGPSend.sendCollections(1,256873);">';
        txt += 'Special</a>';
        txt += '&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="OGPSend.colSendCity=' + OGPConfig.currentCity + ';OGPSend.sendCollections(1,9);">';
        txt += 'Mission</a>';
        
        txt += '&nbsp;&nbsp;&nbsp;&nbsp;';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;
     
      case 1:
        OGPDisplay.setHTML('divOGPSetup','<div name="divLoading" id="divLoading">Loading Collection Quantities...</div>');
        if (index != 0) {
          if (index == 256873) OGPSend.colType = 1000;
          if (index == 4) OGPSend.colType = 1001;
          if (index == 9) OGPSend.colType = 1002;
        }
        var txt = '';
        if (OGPConfig.currentCity != OGPSend.colSendCity) {
          OGPTravel.goCity(OGPSend.colSendCity,'OGPSend.sendCollections(2,' + index + ')')
        } else {
          OGPSend.sendCollections(2,index);
        }
        break;
        
      case 2:
        // Select the collection tab
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlCollectionPage;
        url += '&xw_city=' + OGPSend.colSendCity + '&selected_city=' + OGPSend.colSendCity;
        if (index != 0)
          url += '&filter_col=' + index;
        else
          url += '&filter_col=1';
        OGPAjax.buildAjax(url,'OGPSend.sendCollections','3,%ix%');
        break;
        
      case 3:
        // Load the collection items
        OGPDisplay.addLine('Parsing Location Items',OGPConfig.clrInfo);
        var r = OGPAjax.ajax[index].response;
        var s = r.indexOf('class="loot_vault"');
        var s = r.indexOf('<div style="height:35', s);
        while (s > 0) {
          s = r.indexOf('<img',s);
          s = r.indexOf('>',s) + 1;
          e = r.indexOf('<',s);
          var qty = 0;
          var ts = r.substr(s,e-s);
          if (ts.indexOf('x') > 0) {
            var qs = ts.indexOf('x')+1;
            qty = parseInt(ts.substr(qs));
          } 
          s = r.indexOf('gift_id=',s) + 8;
          var cid = parseInt(r.substr(s));
          OGPSend.colItems[OGPSend.colItems.length] = new Array(cid,qty);
          s = r.indexOf('<div style="height:35',s);
        }
        var txt = '<form name="frmSendCollection" id="frmSendCollection">';
        txt += '<table name="tblSendCollection" id="tblSendCollection">';
        if (OGPSend.colType != 0)
          OGPSend.colSendCity = OGPSend.colType;
        for (var i=0; i < OGPItems.collectionTitles.length; i++) {
          if (OGPItems.collectionTitles[i][0]==OGPSend.colSendCity) {
            txt += '<tr><td style="border:0;border-top:1px solid #ffffff;"></td><th colspan="7">' + OGPItems.collectionTitles[i][1] + '</th></tr>';
            for (var j=0; j < OGPItems.collections.length; j++) {
              if (OGPItems.collections[j][0]==i) {
                txt += '<tr>';
                txt += '<td><input type="checkbox" name="chkCollection_' + j + '" id="chkCollection_' + j + '" onChange="OGPSend.toggleCollectionItems(' + j + ');"></td>';
                for (var k = 0; k < parseInt(OGPItems.collections[j].length/2); k++) {
                  txt += '<td>';
                  for (var l=0; l < OGPSend.colItems.length; l++) {
                    if (OGPSend.colItems[l][0]==OGPItems.collections[j][1+(k*2)] && parseInt(OGPSend.colItems[l][1]) > 0) {
                      txt += '<select name="selCollection_' + j + '_' + OGPItems.collections[j][1+(k*2)] + '" id="selCollection_' + j + '_' + OGPItems.collections[j][1+(k*2)] + '">';
                      for (var m = 0; m <= OGPSend.colItems[l][1]; m++) {
                        txt += '<option value="' + m + '">' + m + '</option>';
                      }
                      txt += '</select>';
                    } else if (OGPSend.colItems[l][0]==OGPItems.collections[j][1+(k*2)]) {
                      txt += '<input type="text" style="" disabled value="--"></select>';
                    }
                  }
                  txt += OGPItems.collections[j][1+((k*2)+1)];
                  txt += '</td>';
                }
                txt += '</tr>';
              }
            }
          }
        }
        txt += '</table>';
        txt += '<div style="display:block" id="divOGPSendStart" name="divOGPSendStart"><input type="button" value="Send Collection Items" onclick="OGPSend.sendCollections(5,0)"></div>';
        txt += '</form>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        // Travel back if needed
        if (OGPConfig.currentCity != OGPConfig.originalCity) {
          OGPTravel.goCity(OGPConfig.originalCity,'OGPSend.sendCollections(4,0)');
        } else {
          OGPSend.sendCollections(4,0);
        }
        break;
        
      case 4:
        break;
        
      case 5:
        scroll(0,0);
        var elms = e$('frmSendCollection').getElementsByTagName('select');
        OGPSend.colSendItems.length = '';
        for (var i=0; i < elms.length; i++) {
          var cid = elms[i].name.split('_')[2];
          for (var j=0; j < OGPItems.collections.length; j ++) {
            for (var k = 0; k < parseInt(OGPItems.collections[j].length/2); k++) {
              if (OGPItems.collections[j][1+(k*2)]==cid)
                OGPSend.colSendItems[OGPSend.colSendItems.length] = new Array(cid,elms[i].value,OGPItems.collections[j][1+(k*2)+1],OGPItems.collectionTitles[OGPItems.collections[j][0]][1]);
            }
          }
        }
        OGPDisplay.clearSetup();
        // Build the send table
        var txt='<table name="tblColSending" id="tblColSending">';
        txt += '<tr><th>Current Item</th><th>Total Items</th><th>Items Remaining</th><th>Retries</th><tr>';
        txt += '<tr><td><div style="width:340px;" id="divColSendName" name="divColSendName"></div></td>';
        txt += '<td><div id="divColSendTotal" name="divColSendTotal"></div></td>';
        txt += '<td><div id="divColSendRemain" name="divColSendRemain"></div></td>';
        txt += '<td><div id="divColSendRetries" name="divColSendRetries"></div></td>';
        txt += '</tr>';
        txt += '</table>';
        txt += '<div id="divSendItemControl" name="divSendItemControl"></div>';
        OGPDisplay.setHTML('divOGPResults',txt);
        var total = 0;
        for (var i=0; i < OGPSend.colSendItems.length; i++)
          total += parseInt(OGPSend.colSendItems[i][1]);
        OGPDisplay.setHTML('divColSendTotal',total);
        OGPSend.pauseSending = false;
        OGPSend.colSendRetries = 0;
        OGPSend.sendCollections(6,0);
        break;
        
      case 6:
        if (OGPSend.pauseSending==true)
          OGPDisplay.setHTML('divSendItemControl','<a onclick="OGPSend.toggleSendColRun()">Resume Sending</a>');
        else
          OGPDisplay.setHTML('divSendItemControl','<a onclick="OGPSend.toggleSendColRun()">Pause Sending</a>');
        if (OGPSend.pauseSending == false) {
          // Send one item
          var remaining = 0;
          for (var i=0; i < OGPSend.colSendItems.length; i++)
            remaining += parseInt(OGPSend.colSendItems[i][1]);
          OGPDisplay.setHTML('divColSendRemain',remaining);
          OGPDisplay.setHTML('divColSendRetries',OGPSend.colSendRetries);
          // Find the next item to send
          var sitem = -1;
          for (var i=OGPSend.colSendItems.length-1; i >= 0; i--)
            if (OGPSend.colSendItems[i][1] > 0)
              sitem = i;
          if (sitem < 0) {
            OGPDisplay.addLine('All Collection Items Sent',OGPConfig.clrGood);
            OGPDisplay.setHTML('divSendItemControl','');
          } else {
            OGPDisplay.setHTML('divColSendName',OGPSend.colSendItems[sitem][2] + ' (' + OGPSend.colSendItems[sitem][3] + ')');
            var url = OGPConfig.MWURLAJAX + OGPConfig.urlSendItem;
            url += '&recipients%5b0%5d=' + OGPSend.recipient;
            url += '&gift_category=0';
            url += '&gift_id=' + OGPSend.colSendItems[sitem][0] + '&gift_key=' + OGPSend.giftkey;
            OGPAjax.buildAjax(url,'OGPSend.sendCollections','7,%ix%');
          }
        }
        break;
        
      case 7:
        var r = OGPAjax.ajax[index].response;
        var results = OGPParser.getValueInTags(r,'class="message_body"',0);
        if (OGPSend.pauseSending==true)
          OGPDisplay.setHTML('divSendItemControl','<a onclick="OGPSend.toggleSendColRun()">Resume Sending</a>');
        else
          OGPDisplay.setHTML('divSendItemControl','<a onclick="OGPSend.toggleSendColRun()">Pause Sending</a>');
        if (results.indexOf('You gave') >= 0) {
          // Success
          for (var i=0; i < OGPSend.colSendItems.length; i++) {
            if (OGPSend.colSendItems[i][1] > 0) {
              OGPSend.colSendItems[i][1]--;
              break;
            }
          }
          if (OGPSend.sendDelayFlag==false) {
            OGPSend.sendDelay -= 100; if (OGPSend.sendDelay < 0) OGPSend.sendDelay = 0;
          }
          if (OGPSend.pauseSending==false) setTimeout('OGPSend.sendCollections(6,0)',OGPSend.sendDelay);
        } else if (results.indexOf('You don') >= 0) {
          // Not enough
          OGPDisplay.addLine('You do not have enough of those left to send...stopping',OGPConfig.clrWarning);
        } else if (results.indexOf('Please wait a moment') >= 0) {
          // Too quick, try again
          OGPSend.sendDelay += 100;
          OGPSend.sendDelayFlag = true;
          OGPSend.colSendRetries++;
          if (OGPSend.pauseSending==false) OGPSend.sendCollections(6,0);
        } else {
          // Something else, trap for now
          if (OGPConfig.Session == 0) {
            OGPDisplay.addLine('Session has timed out, stopping sending items.',OGPConfig.clrFatal);
          } else {
            OGPDisplay.addLine('Something Else!',OGPConfig.clrFatal);  
          }
        }
        break;
    }
  
  };
  
  this.toggleSendColRun = function() {
    if (this.pauseSending == true) {
      this.pauseSending = false;
      OGPDisplay.addLine('Loot sending resuming',OGPConfig.clrInfo);
      OGPDisplay.setHTML('divSendItemControl',' -- Wait -- ');
      OGPSend.sendCollections(6,0); 
    } else {
      this.pauseSending = true;
      OGPDisplay.addLine('Loot sending paused...current send operation will complete.',OGPConfig.clrInfo);
      OGPDisplay.setHTML('divSendItemControl',' -- Wait -- ');
    }
  }
  
  this.toggleCollectionItems = function(col) {
    var setval = e$('chkCollection_' + col).checked;
    for (var i=0; i < parseInt(OGPItems.collections[col].length/2); i++) {
      var elm = e$('selCollection_' + col + '_' + OGPItems.collections[col][1+(i*2)]);
      if (elm) {
        if (setval == true) {
          elm.selectedIndex = elm.options.length-1;
        }
        else
          elm.selectedIndex = 0;
      }
    }
  };
};

/***************************************
  AJAX Call Functions 
****************************************/
function ogpAJAXDef() {
  this.ajax = new Array();
  this.ajaxtimers = new Array(); 
  this.ajaxclicks = 0;
 
  this.buildAjax = function(url,retfunction,params) {
  
    // Do the MW.RequestTimer stuff
    var cont = url.match(/xw_controller=(\w+)/);
    cont = (cont[1]==undefined)?null:cont[1];
    var action = url.match(/xw_action=(\w+)/);
    action = (action[1]==undefined)?null:action[1];
    var stime = new Date().getTime();
    MW.RequestTimer.track(cont,action,stime);
    
    if (url.indexOf('xw_client_id') < 0 && url.indexOf('isajax') < 0) url += '&xw_client_id=8';
    url = url.replace('?&','?');
    //e$('divOGPDebug').innerHTML += '<br>' + url;
    // Find an available index
    var index = 0;
    while (index < this.ajax.length && this.ajax[index] != 'free') index++;
    this.ajax[index] = new sack(url);
    this.ajax[index].onCompletion = function(){OGPAjax.buildAjaxRun(index,retfunction,params)};
    this.ajax[index].onFail = function(){OGPAjax.ajaxFailed(index,url,retfunction,params)};
    this.ajax[index].onError = function(){OGPAjax.ajaxFailed(index,url,retfunction,params)};
    // Add the parameters
    this.ajax[index].setVar('ajax','1');
    this.ajax[index].setVar('liteload','1');
    this.ajax[index].setVar('sf_xw_user_id',OGPConfig.local_player_id);
    this.ajax[index].setVar('sf_xw_sig',OGPConfig.local_xw_sig);
    this.ajax[index].setVar('clicks',++this.ajaxclicks);
    // Set the timeout for the call
    this.ajaxtimers[index] = setTimeout("OGPAjax.ajaxTimedOut(" + index + ",'" + retfunction + "','" + params + "')",20000);
    this.ajax[index].runAJAX();
  };

  this.getAjaxIndex = function() {
    var index = 0;
    while (index < this.ajax.length && this.ajax[index] != 'free') index++;
    this.ajax[index] = new sack();
    return index;
  }  
  this.buildAjaxForm = function(index,retfunction,params) {
    this.ajax[index].onCompletion = function(){OGPAjax.buildAjaxRun(index,retfunction,params)};
    this.ajax[index].onFail = function(){OGPAjax.ajaxFailed(index,url,retfunction,params)};
    this.ajax[index].onError = function(){OGPAjax.ajaxFailed(index,url,retfunction,params)};
    // Add the parameters
    this.ajax[index].setVar('ajax','1');
    this.ajax[index].setVar('liteload','1');
    this.ajax[index].setVar('sf_xw_user_id',OGPConfig.local_player_id);
    this.ajax[index].setVar('sf_xw_sig',OGPConfig.local_xw_sig);
    this.ajaxtimers[index] = setTimeout("OGPAjax.ajaxTimedOut(" + index + ",'" + retfunction + "','" + params + "')",20000);
    this.ajax[index].runAJAX();
  }

  this.buildAjaxRun = function(index,retfunction,params) {
    // Clear the ajax call timeout handler
    clearTimeout(this.ajaxtimers[index]);

    var r = OGPAjax.ajax[index].response.toLowerCase();
    /*
    if (r.indexOf('script') < 50 && r.indexOf('script') >= 0) {
      
      e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>';
      alert(r);
      return;
    }
    */
    
    // Replace the index in the results and pass back to the return function
    params = params.replace(/%ix%/,index);
    var x = retfunction + '(' + params + ')';
    if (retfunction != '')
      eval(x);

    // Give the calling function 5 seconds to process the results
    setTimeout("OGPAjax.ajax[" + index + "]='free';",5000);
  };

  this.ajaxTimedOut = function(index,retfunction,params) {
    // Ajax call hung, set the flags and return to the calling function
    OGPDisplay.addLine('AJAX Call hung',OGPConfig.clrWarning);
    OGPConfig.appHung = true;  
    if (retfunction != '') eval(retfunction + '(' + params.replace(/%ix%/,index) + ')');
  };

  this.ajaxFailed = function(index,url,retfunction,params) {
    // Something went horribly wrong, give it a few seconds and try again
    OGPDisplay.addLine('AJAX Call failed',OGPConfig.clrFatal);
    clearTimeout(this.ajaxtimers[index]);
    try {
      this.ajax[index].reset();
    } catch(err) {}
    setTimeout("OGPAjax.ajax[" + index + "]='free';",5000);
    setTimeout("OGPAjax.buildAjax('" + url + "','" + retfunction + "','" + params + "');",1000);
  };

};

/***************************************
 TRAVEL Functions 
****************************************/
function ogpTravelDef() {
  
  this.goCity = function(city,retfunction) {
    OGPDisplay.addLine('Travelling to ' + OGPItems.getCityName(city),OGPConfig.clrAction);
    var url =  OGPConfig.MWURLAJAX + OGPConfig.urlTravel;
    url += '&xw_city=' + OGPConfig.currentCity + '&destination=' + city + '&tmp=' + OGPConfig.tmpkey;
    OGPAjax.buildAjax(url,'OGPTravel.travelComplete','%ix%,"' + retfunction +'",' + city);
  };

  this.travelComplete = function(index,retfunction,newCity) {
    var r = OGPAjax.ajax[index].response;
    //e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>' + r;
    OGPDisplay.showPage(index,'inner_page');
    e$('mw_city_wrapper').className = 'mw_city' + newCity;
    OGPDisplay.addLine('Arrived in ' + OGPItems.getCityName(newCity),OGPConfig.clrInfo);
    OGPConfig.currentCity = newCity;
    // Clear out the tabs
    OGPDrone.curJobTab = -1;
    OGPJob.curJobTab = -1;
    // Give it some time to update the page
    setTimeout("eval('" + retfunction + "');",2000);
  };
  
  this.getCurrentCity = function() {
    if(e$('mw_city_wrapper')) {
      return(OGPItems.getCityNum(e$('mw_city_wrapper').className));
    }
    return(OGPConfig.currentCity);
  };
  
};

/***************************************
 PARSER Functions 
****************************************/
function ogpParserDef() {
  this.keyStr = "ABCDEFGHIJKLMNOP" +
              "QRSTUVWXYZabcdef" +
              "ghijklmnopqrstuv" +
              "wxyz0123456789+/" +
              "=";

  this.getCurTime = function() {
    var d = new Date();
    return OGPParser.pad(d.getHours(),2) + ':' + OGPParser.pad(d.getMinutes(),2);
  }
    
  this.showDebug = function(str,showres) {
    e$('divOGPDebug').innerHTML += '<textarea rows=8 cols=50>' + str + '</textarea>';
    if (showres == 1)
      e$('divOGPDebug').innerHTML += str;
  };
  this.getRobLoot = function(r) {
    //e$('divOGPDebug').innerHTML += '<hr><textarea>' + r + '</textarea>';
    var la = new Array();
    var d='rob_res_expanded_details_item';
    if (r.indexOf(d) > 0) {
      var s = r.indexOf(d);
      while (s > 0) {
        e = r.indexOf(d,s+1);
        if (e < 0) e = r.length;
        s = r.indexOf('>',s)+1;
        e = r.indexOf('<',s);
        // Ignore non-loot items
        var ts = r.substr(s,e-s);
        var qt = parseInt(ts);
        if (isNaN(qt)) {
          // Not a number, probably "a item"
          qt = 1;
        }
        var i = 0;
        while ((ts.substr(i,1) >= '0' && ts.substr(i,1) <= '9') || ts.substr(i,1) == ' ') i++;
        var item = ts.substr(i);
        if (item != '')
          la[la.length] = new Array(qt,item);
        s = r.indexOf(d,s);
      }
    }
    return la;
  };
  
  this.getRobbingMoney = function(r) {
    r = r.replace(/,/g,'');
    var regex = /You gained.*?(C|R|B|V|L)?(\$)([0-9]+)/;
    var me = regex.exec(r);
    if (me) {
      if (me[1]==null) me[1] = '';
      return new Array(me[1],me[2],me[3]);
    } else {
      return new Array('','',0);
    }
  };
  
  this.getFightMoney = function(r) {
    r = r.replace(/,/g,'');
    var regex = /fightres_stats.*?\+.*?(C|R|B|V|L)?(\$)([0-9]+).*?<\/div>/;
    var me = regex.exec(r);
    if (me) {
      if (me[1]==null) me[1] = '';
      return new Array(me[1],me[2],me[3]);
    } else {
      return new Array('','',0);
    }
  };
  
  this.getFightLoot = function(r) {
    var la = new Array();
    var d = 'fightres_bonus_message';
    if (r.indexOf(d) > 0) {
      var s = r.indexOf(d);
      while (s > 0) {
        e = r.indexOf(d,s+1);
        if (e < 0) e = r.length;
        s = r.indexOf('<a',s);
        s = r.indexOf('</a>',s)+4;
        e = r.indexOf('!',s);
        if (e < 0) e = r.indexOf('<',s);
        // Ignore non-loot items
        var ts = r.substr(s,e-s);
        if (ts.indexOf('secret stash') < 0 && ts.indexOf('rallied the troops') < 0) {
          if (ts.indexOf('found') > 0) {
            var i = ts.indexOf('found') + 5;
            var qt = parseInt(ts.substr(i));
            while ((ts.substr(i,1) >= '0' && ts.substr(i,1) <= '9') || ts.substr(i,1) == ' ') i++;
            var item = ts.substr(i);
            la[la.length] = new Array(qt,item);
          }
        }
        s = r.indexOf(d,s);
      }
    }
    
    var regex = /socialMessageCards":(.*?),/;
    //var regex = /loot":(.*?),/;
    var match = regex.exec(r);
    if (match) {
      var s = r.indexOf('socialMessageCards":');
      var e = r.indexOf('HOW TO FIGHT',s);
      //e$('divOGPDebug').innerHTML += '<textarea>' + r.substr(s,e-s) + '</textarea>';
      //var s = r.indexOf('loot":');
      var s = r.indexOf('socialMessageCards":');
      var e = r.indexOf(']',s);
      r = r.substr(s,e-s);
      if (match[1] != '[]') {
        //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea><br>';
        //var regex = /graphics.*?item_.*?item_card_(.*?).png/g;
        //var regex = /graphics.*?item_(.*?).(png|gif|jpg)/g;
        var regex = /img src.*?graphics\\\/(.*?).(png|gif|jpg)/g;
        while (match = regex.exec(r)) {
          if (match[1].indexOf('profile.ak.fbcdn') < 0)
            la[la.length] = new Array(1,match[1]);
        }
      } 
    } 
    var txt = '';
    for (var i=0; i < la.length; i++) {
      la[i][1] = la[i][1].replace(/_01/,'');
      la[i][1] = la[i][1].replace(/item_/,'');
      txt += la[i][1] + '<br>';
    }
    //if (txt != '') e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>';
    return la;
  };
  
  this.getADStats = function(str,ad) {
    str = str.replace(/[\r\n|\n|\t|]/g,'');
    //e$('divOGPDebug').innerHTML += '<textarea>' + str + '</textarea>';
    var retval = 0;
    try {
      switch(ad) {
        case 'A':
          var regexa = /fightbar_group.*?icon_mafia_attack.*?>\s+?([0-9,]+)/;
          var ma = regexa.exec(str);
          if (ma) retval = ma[1].replace(/,/g,'');
          var regexa = /"Mafia Attack Strength".*?>.*?([0-9,]+)/;
          var ma = regexa.exec(str);
          if (ma) retval = ma[1].replace(/,/g,'');
          break;
        case 'D':
          var regexd = /fightbar_group.*?icon_mafia_defense.*?>\s+?([0-9,]+)/;
          var md = regexd.exec(str);
          if (md) retval = md[1].replace(/,/g,'');
          var regexd = /"Mafia Defense Strength".*?>.*?([0-9,]+)/;
          var md = regexd.exec(str);
          if (md) retval = md[1].replace(/,/g,'');
          break;
      }
    } catch(err){}
    return (retval);
  };
  
  this.setTempKey = function(str,type) {
    var tmpkey = '';
    if (str=='') str = document.body.innerHTML;
    switch(type)
    {
      case 'job':
        if (str.indexOf('class="job_list"') > 0) {
          var s = str.indexOf('class="job_list"');
          s = str.indexOf('class="job_action"',s+1);
          s = str.indexOf("href='",s+1);
          s+=6;
          var x = '';
          while (str.substr(s,1) != '"' && s < str.length) x+= str.substr(s++,1);
          var str = x;
          OGPDrone.specialcontroller = OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2];
          OGPJob.specialcontroller = OGPItems.cities[OGPItems.getCityIndex(OGPConfig.currentCity)][2];
        } else if (str.indexOf('doJob: function(') > 0) {
          // Vegas
          var s = str.indexOf('doJob: function(');
          s = str.indexOf('&tmp',s);
          s = str.indexOf('&tmp',s);
          var x = '';
          while (str.substr(s,1) != '+' && s < str.length) x+= str.substr(s++,1);
          var str = x;
          OGPDrone.specialcontroller = 'map';
          OGPJob.specialcontroller = 'map';
        } else if (OGPConfig.currentCity >= 7 && OGPConfig.currentCity <= 9) { //Brazil, Chicago, London
          var regex = /btn_dojob.*?(&tmp=.*?)&/;
          var match = regex.exec(str);
          if (match)
            var str = match[1];
          OGPDrone.specialcontroller = 'job';
          OGPJob.specialcontroller = 'job';
        } else {
          // New job selection page
          var s = str.indexOf('id="new_user_jobs"');
          s = str.indexOf('class="title_results"',s);
          s = str.indexOf('do_ajax(',s);
          var x = '';
          while (str.substr(s,1) != '"' && s < str.length) x+= str.substr(s++,1);
          var str = x;
          OGPDrone.specialcontroller = 'story'; // Fix for new job layout
          OGPJob.specialcontroller = 'story'; // Fix for new job layout
        }
        break; 
        
      case 'fight':
        var s = str.indexOf('inner_page');
        s = str.indexOf('?xw_controller=fight&xw_action=attack',s);
        if (s<0) s=str.indexOf('?xw_controller=fight&amp;xw_action=attack');
        if (s > 0)
        {
           x = '';
           while (str.substr(s,1)!='"' && s < str.length) x+=str.substr(s++,1);
           var str = x;
        }
        else
          var str = '';
        break;

      case 'punch':
        var s = str.indexOf('inner_page');
        s = str.indexOf('?xw_controller=fight&xw_action=punch',s);
        if (s<0) s=str.indexOf('?xw_controller=fight&amp;xw_action=punch');
        if (s > 0)
        {
           x = '';
           while (str.substr(s,1)!='"' && s < str.length) x+=str.substr(s++,1);
           var str = x;
        }
        else
          var str = '';
        OGPDisplay.addLine("FK:" + str,'#fff');
        break;
        
      case 'promote':
        var s = str.indexOf('inner_page');
        s = str.indexOf('xw_action=promote',s);
        s = str.indexOf('do_ajax',s);
        if (s > 0) {
          s = str.indexOf('xw_controller=group&xw_action=promote',s);
          x = '';
          while (str.substr(s,1) != '"' && s < str.length) x+=str.substr(s++,1);
          var str = x;
        }
        else 
          var str = '';
        break;
        
      default:
        tmpkey = this.getTmpKeyFromOnClick(document.body.innerHTML,'id="nav_link_home_unlock"');
        return tmpkey;
        break;
    }
    var s = str.indexOf('tmp=');
    if (s > 0)
    {
      s += 4;
      tmpkey = '';
      while (str.substr(s,1) !='&' && s < str.length) tmpkey+= str.substr(s++,1);
    }
    else
    {
    tmpkey='';
    }

    return tmpkey;
  };

  this.getCBValue = function(loc) {
    var str = document.body.innerHTML;
    switch(loc) {
      case 'home':
        var s = str.indexOf('nav_link_home_unlock');
        s = str.indexOf('cb=',s);
        s+=3;
        var e = s;
        while (str.substr(e,1) != '"' && str.substr(e,1) != '&') e++;
        return str.substr(s,e-s);
        break;
    
    }
    return '';
  };
  this.getNewPlayerId = function(str) {
    var s = str.indexOf('sf_xw_user_id');
    if (s < 0) return '';
    s = str.indexOf(':',s);
    s = str.indexOf("'",s);
    s++;
    var e = s;
    while (str.substr(e,1)!="'" && e < str.length) e++;
    return str.substr(s,e-s);
  
  };
  
  this.getTmpKeyFromOnClick = function(str,id) {  
    var s = str.indexOf(id);
    if (s >= 0) {
      s = str.indexOf('onclick=',s);
      s = str.indexOf('tmp=',s); s+=4;
      var e = s;
      while (str.substr(e,1) != "&" && str.substr(e,1) !="'" && e < str.length) e++;
      if (e > s)
      {
        return str.substr(s,e-s);
      }
    }
    return '';
  };

  this.getValueInTags = function(str,tag,skip) {
    var s1 = str.indexOf(tag);
    if (s1 < 0) return '';
    while (str.substr(s1,1) != '>' && s1 < str.length) s1++;
    s1++;
    var e = s1;
    while ((str.substr(e,1) != '<' && e < str.length) || skip > 0)
    {
      if (str.substr(e,1) == '<') skip--;
      e++;
    }
    return str.substr(s1,e-s1);
  };
  
  this.getValueInQuotes = function(str,tag) {
    var s = str.indexOf(tag);
    if (s < 0) return '';
    s++;
    var e = s;
    while (str.substr(e,1) != '"' && e < str.length) e++;
    var tstr = str.substr(s,e-s);
    if (tstr.substr(tstr.length-1,1)=='\\') tstr = tstr.substr(0,tstr.length-1);
    return tstr;
  };
  
  this.getValueInJSONResults = function(str,tag) {
    str = str.replace(/\\/g,'');
    var s = str.indexOf(tag);
    if (s < 0) return '';
    s = str.indexOf('":',s);
    if (s < 0) return '';
    s+=2;
    if (str.substr(s,1)=='"') s++;
    var e = s;
    while (str.substr(e,1) != '"' && e < str.length) e++;
    var tstr = str.substr(s,e-s);
    if (tstr.substr(tstr.length-1,1)=='\\') tstr = tstr.substr(0,tstr.length-1);
    return tstr;
  };    
  
  this.getTargetUser = function() {
    try {
      var content=document.getElementById('content_row');
      var as=content.getElementsByTagName('a');
      for (var i=0; i < as.length; i++){
        if(as[i].innerHTML=='Profile') { 
          match=/[;&]user=p\|(\d+)/.exec(as[i].href);
          if(match) return 'p|' + match[1];
        }
      }
    } catch(err){}
    try {
      var content=document.getElementById('app_content_16421175101').innerHTML;
      return/[?;&]opponent_id=p\|(\d+)/.exec(content)[1];
    } catch(err){}
    return null;
  };

  this.findId = function(str,srch) {
    var id = '';
    if (str.indexOf(srch) > 0)
    {
      var s = str.indexOf(srch) + srch.length;
      while (s < str.length && str.substr(s,1)!='"' && str.substr(s,1)!='&') id+=str.substr(s++,1);
      if (id.substr(0,2)=='p|') return id;
      if (!OGPParser.isNumeric(id))
        id = OGPParser.decodeBase64(id);
    }
    return id;
  };

  this.decodeBase64 = function(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
  
    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
       OGPDisplay.addLine("There were invalid base64 characters in the input text.\n" +
             "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
             "Expect errors in decoding.",OGPConfig.clrError);
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
       enc1 = this.keyStr.indexOf(input.charAt(i++));
       enc2 = this.keyStr.indexOf(input.charAt(i++));
       enc3 = this.keyStr.indexOf(input.charAt(i++));
       enc4 = this.keyStr.indexOf(input.charAt(i++));
  
       chr1 = (enc1 << 2) | (enc2 >> 4);
       chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
       chr3 = ((enc3 & 3) << 6) | enc4;
   
       output = output + String.fromCharCode(chr1);
   
       if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
       }
       if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
       }
   
       chr1 = chr2 = chr3 = "";
       enc1 = enc2 = enc3 = enc4 = "";
   
    } while (i < input.length);
   
    return unescape(output);
  };
  
  this.isNumeric = function(str) {
    var ValidChars = '0123456789.';
    var IsNumber = true;
    for (var i=0; i < str.length; i++) {
      if (ValidChars.indexOf(str.charAt(i))==-1)
        IsNumber = false;
    }
    return IsNumber;
  };
  
  this.getUserNameFromProfile = function(str) {
    var fname = OGPParser.getValueInTags(str,'div class="stats_title_text">',0);
    var s = fname.indexOf('"')+1;
    if (s < 0) return '';
    var last = s;
    var e = fname.indexOf('"',s+1);
    while (e != -1) {
      last = e;
      e = fname.indexOf('"',e+1);
    }
    if (s==-1 || last==-1 || s==last || s>=last) 
      fname = '';
    else
      fname = fname.substr(s,last-s);
    return fname;
  };
  
  this.getSpecificTagValue = function(r,tag) {
    if (!r) return;
    switch(tag) {
      case 'bosseng':
        var s = r.indexOf('Requires:');
        s = r.indexOf('strong',s);
        return (OGPParser.getValueInTags(r.substr(s,100),'strong',0));
        break;
        
      case 'bossexp':
        var s = r.indexOf('Payout:');
        s = r.indexOf('bullet_list',s);
        s = r.indexOf('"bold_number',s);
        return (OGPParser.getValueInTags(r.substr(s,100),'"bold_number',0));
        break;
                
      case 'token':
        s = r.indexOf('Jobs preparation');
        if (s < 0) return '';
        s = r.indexOf('Manufacture Tokens',s);
        var nj = r.indexOf('class="job_name"',s);
        s = r.indexOf('Owned:',s);
        if (parseInt(s) > parseInt(nj)) return '0';
        if (s > 0)
          return(parseInt(r.substr(s+6)));
        else
          return '0';
        break;
        
      case 'deck':
        s = r.indexOf('Jobs preparation');
        if (s < 0) return '';
        s = r.indexOf('Get Cheating Deck',s);
        var nj = r.indexOf('class="job_name"',s);
        s = r.indexOf('Owned:',s);
        if (parseInt(s) > parseInt(nj)) return '0';
        if (s > 0)
          return(parseInt(r.substr(s+6)));
        else
          return '0';
        break;
    }
    return '';
  };

  this.getStatsFromPage = function(r) {
    if (!r) return;
    var s = r.indexOf('{"user_fields":');
    if (s < 0) s = r.indexOf('var user_fields = [];');
    if (s >0) {
      // New version
      OGPConfig.curExpNeeded = parseInt(OGPString.getNewStatValue(r,'exp_for_next_level'));
      OGPConfig.curExp = parseInt(OGPString.getNewStatValue(r,'user_experience'));
      OGPConfig.curEnergy = parseInt(OGPString.getNewStatValue(r,'user_energy'));
      OGPConfig.curRatio = parseInt(((OGPConfig.curExpNeeded-OGPConfig.curExp)/OGPConfig.curEnergy)*100)/100;
      OGPConfig.curStamina = OGPString.getNewStatValue(r,'user_stamina');
      OGPConfig.curHealth = OGPString.getNewStatValue(r,'user_health');
      OGPConfig.curSkillPoints = OGPString.getNewStatValue(r,'user_skill');
      OGPConfig.curLevel = OGPString.getNewStatValue(r,'user_level');
      OGPConfig.curRP = OGPString.getNewStatValue(r,'user_favor');
      OGPConfig.curCash = OGPString.getNewStatValue(r,'user_cash');
    } else {
      OGPConfig.curExpNeeded = parseInt(OGPString.getStatValue(r,'exp_for_next_level'));
      OGPConfig.curExp = parseInt(OGPString.getStatValue(r,'user_experience'));
      OGPConfig.curEnergy = parseInt(OGPString.getStatValue(r,'user_energy'));
      OGPConfig.curRatio = parseInt(((OGPConfig.curExpNeeded-OGPConfig.curExp)/OGPConfig.curEnergy)*100)/100;
      OGPConfig.curStamina = OGPString.getStatValue(r,'user_stamina');
      OGPConfig.curHealth = OGPString.getStatValue(r,'user_health');
      OGPConfig.curSkillPoints = OGPString.getStatValue(r,'user_skill');
      OGPConfig.curLevel = OGPString.getStatValue(r,'user_level');
      OGPConfig.curRP = OGPString.getStatValue(r,'user_favor');
      OGPConfig.curCash = OGPString.getStatValue(r,'user_cash');
    }
  };

  this.parseJobResults = function(r) {
    //e$('divOGPDebug').innerHTML = '<textarea cols=100 rows=8>' + r + '</textarea>';return;
    // Clear the res array
    res['timeout'] = false;
    res['jobEnergySpent'] = null;
    res['jobResults'] = null;
    res['jobExp'] = null;
    res['jobMoney'] = null;
    res['jobExtraMoney'] = null;
    res['jobBadMoney'] = null;
    res['jobExtraExp'] = null;
    res['jobLoot'] = null;

    // Check for session timeout
    try {
      if (r.substr(0,7)=='<script') {
        res['timeout'] = true;
        return;
      }
    } catch(err) {
      res['jobResults'] = 'Failed';
      return;
    }
    
    
    // Get the regular stats
    OGPParser.getStatsFromPage(r);
    
    // Check to see what kind of results we got back
    var s = r.indexOf('{"user_fields":');
    if (s >= 0 && s < 20) {
      // New job running type, parse differently
      if (r.indexOf('Job Success!') > 0) res['jobResults']='Completed';
      if (res['jobResults']=='Completed') {
        res['jobExp'] = parseInt(OGPParser.getValueInTags(r,'class=\"experience\">',0));
        var tmoney = OGPParser.getValueInTags(r,'class=\"cash',0);
        if (tmoney.indexOf('+') > 0) {
          tmoney = tmoney.split('+');
          res['jobMoney'] = tmoney[0].replace(/[^0-9]/g,'');
          res['jobExtraMoney'] = tmoney[1].replace(/[^0-9]/g,'');
        } else {        
          res['jobMoney'] = tmoney.replace(/[^0-9]/g,'');
        }
      } else if (r.indexOf('SUCCESS!') > 0) {
        // Vegas
        res['jobResults']='Completed';
        res['jobExp'] = parseInt(OGPParser.getValueInJSONResults(r,'exp_gained'));
        if (r.indexOf('bonus_xp') > 0) {
          res['jobExtraExp'] = parseInt(res['jobExp']/2);
        }
        var tmoney = OGPParser.getValueInJSONResults(r,'cash_gained');
        if (tmoney.indexOf('+') > 0) {
          tmoney = tmoney.split('+');
          res['jobMoney'] = tmoney[0].replace(/[^0-9]/g,'');
          res['jobExtraMoney'] = tmoney[1].replace(/[^0-9]/g,'');
        } else {        
          res['jobMoney'] = tmoney.replace(/[^0-9]/g,'');
        }
        if (r.indexOf('bonus_cash') > 0) {
          res['jobExtraMoney'] = OGPParser.getValueInJSONResults(r,'bonus_cash');
        }
        res['jobEnergySpent'] = parseInt(OGPParser.getValueInJSONResults(r,'energy_consumed'));
        // Check for loot
        // "loot\":{\"type\":1,\"id\":2027,\"quantity\":1,\"name\":\"Alarm Code\",\"image\":\"item_AlarmCode_01.gif\"}
        if (r.indexOf('"loot\\":{') > 0) {
          var s = r.indexOf('"loot\\":{');
          var e = s;
          while (r.substr(e,1) != '}') e++;
          var li = r.substr(s,e-s);
          res['jobLoot'] = OGPParser.getValueInJSONResults(li,'name');
        }
        if (r.indexOf('\\"name\\"') > 0) {
          var s = r.indexOf('\\"name\\"');
          var e = s;
          while (r.substr(e,1) != '}') e++;
          var li = r.substr(s,e-s);
          res['jobLoot'] = OGPParser.getValueInJSONResults(li,'\"name\"');
        }
        if (res['jobLoot'] != null) {
          if (res['jobLoot'].indexOf('was used to build') > 0) {
            res['jobLoot'] = res['jobLoot'].substr(0,res['jobLoot'].indexOf('was used to build')-1);
          }
        }
      } else if (r.indexOf('jobResult') > 0) {
        // Brazil
        res['jobResults']='Completed';
        res['jobExp'] = parseInt(OGPParser.getValueInJSONResults(r,'experience'));
        if (r.indexOf('bonus_xp') > 0) {
          res['jobExtraExp'] = parseInt(res['jobExp']/2);
        }
        var tmoney = OGPParser.getValueInJSONResults(r,'"cash"');
        if (tmoney.indexOf('+') > 0) {
          tmoney = tmoney.split('+');
          res['jobMoney'] = tmoney[0].replace(/[^0-9]/g,'');
          res['jobExtraMoney'] = tmoney[1].replace(/[^0-9]/g,'');
        } else {        
          res['jobMoney'] = tmoney.replace(/[^0-9]/g,'');
        }
        if (r.indexOf('bonus_cash') > 0) {
          res['jobExtraMoney'] = OGPParser.getValueInJSONResults(r,'bonus_cash');
        }
        res['jobEnergySpent'] = parseInt(OGPParser.getValueInJSONResults(r,'energy'));
        // Check for loot
        // "loot\":{\"type\":1,\"id\":2027,\"quantity\":1,\"name\":\"Alarm Code\",\"image\":\"item_AlarmCode_01.gif\"}
        if (r.indexOf('"loot":[') > 0) {
          var s = r.indexOf('"loot":[');
          var e = s;
          while (r.substr(e,1) != ']') e++;
          var li = r.substr(s,e-s);
          var regex = /img.*?item_(.*?)_[0-9]+.[png|gif]/;
          var match = regex.exec(li);
          if (match)
            res['jobLoot'] = match[1];
        }
        if (r.indexOf('\\"name\\"') > 0) {
          var s = r.indexOf('\\"name\\"');
          var e = s;
          while (r.substr(e,1) != '}') e++;
          var li = r.substr(s,e-s);
          res['jobLoot'] = OGPParser.getValueInJSONResults(li,'\"name\"');
        }
        if (res['jobLoot'] != null) {
          if (res['jobLoot'].indexOf('was used to build') > 0) {
            res['jobLoot'] = res['jobLoot'].substr(0,res['jobLoot'].indexOf('was used to build')-1);
          }
        }
      } else {
        // Job failed, new version
        //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>' + r;
        return;
      }
     
    } else {
      // Old job running type
      if (r.indexOf('You cannot do jobs for the opposing gang') > 0) res['jobWrongGang'] = 'yes';
      res['jobEnergySpent'] = parseInt(OGPParser.getValueInTags(r,'class="message_energy">',0));
      res['jobResults'] = OGPParser.getValueInTags(r,'class="job_outcome">',0);
      if (res['jobResults'].indexOf('Completed') > 0) {
        // Job ran successfully fill in the rest of the stats
        res['jobResults'] = 'Completed';
        res['jobExp'] = parseInt(OGPParser.getValueInTags(r,'class="message_experience">',0));
        var tmoney = OGPParser.getValueInTags(r,'class="money">',0);
        if (tmoney.indexOf('+') > 0) {
          tmoney = tmoney.split('+');
          res['jobMoney'] = tmoney[0].replace(/[^0-9]/g,'');
          res['jobExtraMoney'] = tmoney[1].replace(/[^0-9]/g,'');
        } else {        
          res['jobMoney'] = tmoney.replace(/[^0-9]/g,'');
        }
        res['jobBadMoney'] = OGPParser.getValueInTags(r,'class="message_cash bad">',0).replace(/[^0-9]/g,'');
        // Find any loot, bonuses, etc
        if (r.indexOf('As a Top Mafia Mastermind you gained') > 0) res['jobExtraExp'] = parseInt(parseInt(res['jobExp'])/2);
        // if (r.indexOf('As a Top Mafia Bagman') > 0) res['jobExtraMoney'] = parseInt(parseInt(res['jobMoney'])/2);
        var lstr = '';
        r = r.replace(/ found an item from/g,'');
        if (r.indexOf(' gained a ') > 0) lstr = ' gained a ';
        if (r.indexOf(' gained an ') > 0) lstr=' gained an ';
        if (r.indexOf(' found a ') > 0) lstr=' found a ';
        if (r.indexOf(' found an ') > 0) lstr=' found an ';
        var extraloot = '';
        if (r.indexOf(' secret stash') > 0) lstr = '';
        if (lstr != '')
        {
          s = r.indexOf(lstr);
          extraloot = OGPParser.findLootItemInResults(r.substr(s,100),lstr);
          extraloot = extraloot.replace(' on the job.','');
          res['jobLoot'] = extraloot;
        }
      } else {
        // Job didn't run successfully, try it again
        res['jobResults'] = 'Failed';
      }
    }
  };
  
  this.parseFightResults = function(r) {
    //e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>' + r;
    // Clear the res array
    res['timeout'] = false;
    res['aaResults'] = null;
    res['aaExp'] = 0;
    res['aaMoney'] = 0;
    res['aaLoot'] = null;
    res['aaDamage'] = 0;
    res['aaIced'] = 'No';
    
    // Check for session timeout
    try {
      if (r.substr(0,7)=='<script') {
        res['timeout'] = true;
        return;
      }
    } catch(err) {
      res['aaResults'] = 'Failed';
      return;
    }

    // Get the regular stats
    OGPParser.getStatsFromPage(r);

    // Get the fight specific stats
    if (r.indexOf('You win!') > 0) {
      res['aaResults'] = 'Win';
      var s = r.indexOf('class="fight_results"');
      s = r.indexOf('$',s);
      res['aaMoney'] = parseInt(r.substr(s+1));
      s = r.indexOf('+',s);
      res['aaExp'] = parseInt(r.substr(s+1));
      s = r.indexOf('dealt',s);
      res['aaDamage'] = parseInt(r.substr(s+5));
    }
    if (r.indexOf('You lose!') > 0) {
      res['aaResults'] = 'Lose';
    }
    if (r.indexOf('Attack Again!') < 0) {
      res['aaIced'] = 'Yes';
    }
    if (r.indexOf('Your opponent is already iced or too weak to fight') > 0) {
      res['aaIced'] = 'Yes';
    }
    if (r.indexOf('You punched') > 0) {
      res['aaResults'] = 'Punch';
      var s = r.indexOf('in the face');
      s = r.indexOf('<strong>',s);
      res['aaDamage'] = parseInt(OGPParser.getValueInTags(r.substr(s,50),'<strong',0));
    }  
    
   
  };

  this.getFightList = function(res) {
    var s,e;
    // Parse the fight list
    // Title, UserID, Name, Level, Mafia, tmpkey, iced, available
    OGPConfig.curFightList.length = 0;
    s = res.indexOf('fight_table');
    if (s < 0) return;
    s = res.indexOf('</tr>',s);
    s = res.indexOf('<tr>',s);
    while (s > 0) {
      e = res.indexOf('</tr>',s);
      var txt = res.substr(s,e-s);
      txt = txt.replace(/\t/g,'');
      txt = txt.replace(/\r\n/g,'');
      txt = txt.replace(/\n/g,'');
      //e$('divOGPDebug').innerHTML += '<textarea>' + txt + '</textarea>';
      var regexstr = /<span\s+>(.*?)<.*?>(.*?)<.*?user=(.*?)".*?>(.*?)<.*?Level.*?>([0-9]+).*?([0-9]+).*?xw_city=(.*?)'/;
      if (txt.indexOf('color:red') > 0)
        var regexstr = /<span\s+>(.*?)<.*?color.*?red.*?>(.*?)<.*?user=(.*?)".*?>(.*?)<.*?Level.*?>([0-9]+).*?([0-9]+).*?xw_city=(.*?)'/;
      //e$('divOGPDebug').innerHTML += regexstr;
      var match = regexstr.exec(txt);
      if (match) {
        var uid = OGPParser.decodeBase64(unescape(match[3]));
        var iced = 0;
        if (txt.indexOf('iced.png') > 0) iced=1;
        OGPConfig.curFightList[OGPConfig.curFightList.length] = new Array(match[1],uid,match[2]+ ' '+match[4],match[5],match[6],match[7],iced,1);
        //e$('divOGPDebug').innerHTML += OGPConfig.curFightList[OGPConfig.curFightList.length-1]+ '<br>';
      }
      s = res.indexOf('<tr>',e+1);
    }
  };
  
  this.getAttackTarget = function(mlvl,xlvl,mmafia,xmafia,ignore) {
    var found = -1;
    for (var i=0; i < OGPConfig.curFightList.length; i++) {
      if (found == -1 && OGPConfig.curFightList[i][6] == 0 && OGPConfig.curFightList[i][7]==1) {
        if (parseInt(OGPConfig.curFightList[i][3]) >= parseInt(mlvl) && parseInt(OGPConfig.curFightList[i][3]) <= parseInt(xlvl) && parseInt(OGPConfig.curFightList[i][4]) >= parseInt(mmafia) && parseInt(OGPConfig.curFightList[i][4]) <= xmafia) {
          if (ignore.length == 0)
            found = i;
          else {
            var fl = 0;
            for (var j = 0; j < ignore.length; j++) {
              if (OGPConfig.curFightList[i][2].indexOf(ignore[j]) >= 0) {
                fl = 1;
              }
            }
            if (fl == 0)
              found = i;
          }
        }
      }
    }
    return found;
  };
  
  this.findLootItemInResults = function(res,str) {
    var s = res.indexOf(str);
    if(s < 0) return ('');
    s+=str.length;
    while (res.substr(s,1) == ' ') s++;
    var e = s+1;
    while (res.substr(e,1) != '<' && res.substr(e,1) != '.' && e < res.length) e++;
    return(res.substr(s,e-s));
  };
  
  this.getUserFieldValue = function(res,str) {
    var s = res.indexOf("user_fields['" + str + "'] =");
    if (s < 0) return '';
    while (res.substr(s,1) != '=') s++;
    while (res.substr(s,1) != '"') s++;
    s++;
    var e = s;
    while (res.substr(e,1) != '"') e++;
    return (res.substr(s,e-s));
  };
  
  this.pad = function(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
  };
};

/***************************************
 PROPERTY Functions 
****************************************/
function ogpPropertyDef() {
  this.reset = function() {
    this.currentCity = 1;
    this.cityMoney = 0;
    this.collectFlag = false;
    this.depositFlag = false;
    this.processAll = false;
    this.isRunning = false;
    this.curCityProperties = 0;
    this.curCityCollected = 0;
  };

  // Main Entry Point 
  this.start = function(city,collect,deposit,all) {
    OGPConfig.functionRunning = true;
    this.reset();
    OGPConfig.originalCity = OGPConfig.currentCity;
    this.collectFlag = collect;
    this.depositFlag = deposit;
    this.processAll = all;
    if (city=='All')
      this.currentCity = 1;
    else 
      this.currentCity = city;
    // Process the current city
    this.processCity(0);
  };
   
  this.processCity = function(step,index) {
    switch(step) {
      case 0:
        //OGPDisplay.addLine('Processing ' + OGPItems.getCityName(OGPProperty.currentCity),OGPConfig.clrInfo);
        if (OGPConfig.currentCity != OGPProperty.currentCity) {
          OGPTravel.goCity(OGPProperty.currentCity,'OGPProperty.processCity(1,0)');
        } else {
          OGPProperty.processCity(1,0);
        }
        break;

      case 1: // Traveled (if necessary to property city) - Set up and collect from the properties
        for (var i=0; i < OGPItems.cities.length; i++) {
          if (OGPItems.cities[i][3]==OGPConfig.currentCity)
            OGPProperty.currentCity = OGPItems.cities[i][3];
        }
        OGPProperty.curCityProperties = 0;
        OGPProperty.curCityCollected = 0;
        if (OGPProperty.collectFlag) {
          var txt = '<table id="tblPropertyCollect" name="tblPropertyCollect">';
          for (var i=0; i < OGPItems.cityProperties.length; i++) {
            if (OGPItems.cityProperties[i][0] == OGPProperty.currentCity) {
              OGPProperty.curCityProperties++;
              txt += '<tr><td style="width:240px;">' + OGPItems.cityProperties[i][2] + '</td><td><div style="color:' + OGPConfig.clrAction + '" id="divPropCol' + i + '"></div></td></tr>';
            }
          }
          txt += '</table>';
          OGPDisplay.setHTML('divOGPResults',txt);
          for (var i=0; i < OGPItems.cityProperties.length; i++) {
            if (OGPItems.cityProperties[i][0] == OGPProperty.currentCity) {
              //if (OGPProperty.currentCity >= 1 && OGPProperty.currentCity <= 7) { // Collect all for speed
                var url = OGPConfig.MWURLAJAX + OGPConfig.urlAllPropertiesCollect;
              //}
              /*
              else if (OGPProperty.currentCity == 5) { // Hack for Vegas
                var url = OGPConfig.MWURLAJAX + OGPConfig.urlVegasCollect;
              }
              else if (OGPProperty.currentCity == 6) { // Hack for Italy
                var url = OGPConfig.MWURLAJAX + OGPConfig.urlItalyCollect;
              }
              else if (OGPItems.cities[OGPItems.getCityIndex(OGPProperty.currentCity)][4]=='business')
                var url = OGPConfig.MWURLAJAX + '&xw_action=sell&business=' + OGPItems.cityProperties[i][1];
              else
                var url = OGPConfig.MWURLJSON + '&xw_action=collect&building_type=' + OGPItems.cityProperties[i][1] + '&business=' + OGPItems.cityProperties[i][1];
              */
              url += '&xw_controller=' + OGPItems.getCityBusinessType(OGPProperty.currentCity);
              url += '&xw_city=' + OGPProperty.currentCity + '&tmp=' + OGPConfig.tmpkey;
              //e$('divOGPDebug').innerHTML = url;return;
              setTimeout("OGPAjax.buildAjax('" + url + "','OGPProperty.productSold','%ix%," + i + "');",1000);
            }
          }
        } else {
          // Didn't collect, load the index page to pass the values to the next step
          OGPAjax.buildAjax(OGPConfig.MWURLAJAX + OGPConfig.urlUpdateStats + '&tmp=' + OGPConfig.tmpkey,'OGPProperty.processCity','2,%ix%');
        }
        break;
        
      case 2: // See if we need to deposit
        if (OGPProperty.depositFlag) {
          // Deposit the money
          var r = OGPAjax.ajax[index].response;
          //e$('divOGPDebug').innerHTML += '<br>Deposit!<textarea>' + r + '</textarea>';
          var tamount = OGPString.getStatValue(r,'user_cash_nyc');
          if (tamount == '') tamount = OGPParser.getValueInJSONResults(r,'user_cash_nyc');
          var amount='';
          for (var i=0; i < tamount.length; i++)
            if (tamount.substr(i,1) >= '0' && tamount.substr(i,1) <='9') amount += tamount.substr(i,1);
          OGPDisplay.addLine('Depositing ' + tamount.replace('$',''),OGPConfig.clrAction);
          //if (OGPProperty.currentCity == 5)
          //  var url = OGPConfig.MWURLAJAX + OGPConfig.urlVegasDeposit + '&city=5&xw_client_id=8';
          //else
            var url = OGPConfig.MWURLAJAX + OGPConfig.urlDeposit + '&city=' + OGPItems.cities[OGPItems.getCityIndex(OGPProperty.currentCity)][7];
          url += '&xw_city=' + OGPProperty.currentCity + '&amount=' + amount;
          OGPAjax.buildAjax(url,'OGPProperty.processCity','3,%ix%');
        } else {
          OGPProperty.processCity(4,0);
        }
        break;
        
      case 3: // Money deposited
        // Parse the results and move on
        //OGPDisplay.addLine('Money Desposited.',OGPConfig.clrInfo);
        OGPProperty.processCity(4,0);
        break;
        
      case 4: // Check for the next city
        if (OGPProperty.processAll) {
          var ci = OGPItems.getCityIndex(OGPProperty.currentCity)+1;
          if (ci < OGPItems.cities.length) {
            OGPProperty.currentCity = OGPItems.cities[ci][3];
            OGPProperty.processCity(0,0);
          } else {
            // Go back to original city
            if (OGPConfig.currentCity != OGPConfig.originalCity) {
              OGPTravel.goCity(OGPConfig.originalCity,'OGPProperty.processFinished()');
            }
            else
              OGPProperty.processFinished();
          }
        } else {
          // Go back to original city
          if (OGPConfig.currentCity != OGPConfig.originalCity)
          {
            OGPTravel.goCity(OGPConfig.originalCity,'OGPProperty.processFinished()');
          }
          else
            OGPProperty.processFinished();
        }
        break;
    } // switch
  };

  this.productSold = function(index,business) {
    if (OGPAjax.ajax[index].response) {
      var r = OGPAjax.ajax[index].response;
      //e$('divOGPDebug').innerHTML += '<textarea>' + r + '</textarea>';
      OGPProperty.curCityCollected++;
      if (r.indexOf('class="message_body"') > 0) {
        OGPDisplay.setHTML("divPropCol" + business,OGPParser.getValueInTags(r,'class="message_body"',0));
      } else {
        if (r.indexOf('<div>You collected on') > 0) {
           OGPDisplay.setHTML("divPropCol" + business,OGPParser.getValueInTags(r,'<div>You collected on',1));
        } else {
          if (r.indexOf('"You have collected') > 0) {
            OGPDisplay.setHTML("divPropCol" + business,OGPParser.getValueInQuotes(r,'"You have collected')); 
          } else {
            OGPDisplay.setHTML("divPropCol" + business,'Collected');
          }
        }
      }
    } else {
      // Didn't get a result, something went wrong
      OGPDisplay.addLine('Could not collect on a property, something went wrong...continuing',OGPConfig.clrWarning);
      OGPProperty.curCityCollected++;
    }
    
    // See if this city is done and what to do next
    if (OGPProperty.curCityCollected == OGPProperty.curCityProperties) {
      // All businesses collected from this city check for deposit and/or move to the next city
      OGPProperty.processCity(2,index);
    } 
  };
  
  this.processFinished = function() {
    OGPDisplay.clearResults();
    OGPDisplay.addLine('All processing finished',OGPConfig.clrGood);
    // Reset the global running flag
    OGPConfig.functionRunning = false;
  };
}

/***************************************
 ITEM and OBJECT Functions 
****************************************/
function ogpItemsDef() {

  // Internal arrays to hold city, job, collection, loot information
  this.cities = new Array();
  this.cityProperties = new Array();
  this.robProperties = new Array();
  this.jobLevels = new Array();
  this.jobs = new Array();
  this.collectionTitles = new Array();
  this.collections = new Array();
  this.lootTypes = new Array();
  this.lootItems = new Array();
  this.shopItems = new Array();
  this.FCItems = new Array();

  // Flags to avoid reloading information
  this.citiesLoaded = false;
  this.jobLevelsLoaded = false;
  this.jobsLoaded = false;
  this.collectionTitlesLoaded = false;
  this.collectionsLoaded = false;
  this.lootTypesLoaded = false;
  this.lootItemsLoaded = false;
  this.shopItemsLoaded = false;
  this.cityPropertiesLoaded = false;
  this.robPropertiesLoaded = false;
  this.fightClubLoaded = false;
  
  // Variables to track the job payout updates
  this.currentJobLevel = 0;
  this.currentJobTab = 0;
  this.currentJobCity = 0;
  
  // Variables to track multiple jobs on the shop build
  this.shop1 = 0;
  this.shop2 = 0;
  this.shoptries = 1;
  
  // Variables for mystery bag collection
  this.mysbags = new Array();
  
  // Variables for auto-build shop items
  this.curBuild = 0;
  this.numtobuild = 0;
  this.propertynum = 0;
  this.itemnum = 0;
  this.itemname = '';

  // External Methods
  this.init = function() {
    OGPDisplay.addLine('Loading Cities, Jobs, Properties, Loot, Collections',OGPConfig.clrInfo);
    this.loadCities();
    this.loadProperties();
    this.loadRobProperties();
    this.loadJobLevels();
    this.loadJobs();
    this.loadCollectionTitles();
    this.loadCollections();
    this.loadLootTypes();
    this.loadLootItems();
    this.loadShopItems();
    this.loadFightClubItems();
  };

  // Build Fight Club Items
  this.afcCoins;
  this.afcRP;
  this.FCItemsToBuy;
  this.FCItemsBought;
  this.afcItem;
  
  this.addSmugglersHaven = function() {
    OGPItems.addManualJob(6,9,101,486,1090);
    OGPItems.addManualJob(6,9,102,594,1320);
    OGPItems.addManualJob(6,9,103,594,1380);
    OGPItems.addManualJob(6,9,104,756,1670);
    OGPItems.addManualJob(6,9,105,756,1610);
    OGPItems.addManualJob(6,9,106,702,1550);
    OGPItems.addManualJob(6,9,107,864,1900);
    OGPItems.addManualJob(6,9,108,972,2180);
    OGPItems.addManualJob(6,9,109,756,1670);
    var ckstring = '';
    for (var j = 1; j <= 9; j++) {
      var bvi = -1;
      for (var i=0; i < OGPItems.jobs.length; i++)
      {
        if (OGPItems.jobs[i][0]==6 && OGPItems.jobs[i][1]==9)
          OGPItems.jobs[i][4] = '';
        if (OGPItems.jobs[i][0]==6 && OGPItems.jobs[i][1]==9 && OGPItems.jobs[i][8]==0 && OGPItems.jobs[i][9]==0) {
          if (parseFloat(OGPItems.jobs[i][7]) > 0)  
            if (bvi == -1) {
              bvi = i;
            }
            else
               if (parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[bvi][7])/parseFloat(OGPItems.jobs[bvi][6])) {
               bvi = i;
             }
        }
      }
      if (bvi > -1) {
        OGPItems.jobs[bvi][4]='Best Brazil L' + j + ' Job';
        if (ckstring != '') ckstring += '|';
        ckstring += j + ',' + bvi;
      }
    }
    OGPItems.saveJobInfoToCookies(); 
    OGPDisplay.addLine('Smuggler\'s Haven jobs added',OGPConfig.clrGood); 
  };
  this.addElDorado = function() {
    OGPItems.addManualJob(6,10,201,594,1260);
    OGPItems.addManualJob(6,10,202,486,1030);
    OGPItems.addManualJob(6,10,203,648,1380);
    OGPItems.addManualJob(6,10,204,756,1610);
    OGPItems.addManualJob(6,10,205,702,1670);
    OGPItems.addManualJob(6,10,206,648,1550);
    OGPItems.addManualJob(6,10,207,756,1670);
    OGPItems.addManualJob(6,10,208,810,2010);
    OGPItems.addManualJob(6,10,209,864,2016);
    var ckstring = '';
    for (var j = 1; j <= 10; j++) {
      var bvi = -1;
      for (var i=0; i < OGPItems.jobs.length; i++)
      {
        if (OGPItems.jobs[i][0]==6 && OGPItems.jobs[i][1]==9)
          OGPItems.jobs[i][4] = '';
        if (OGPItems.jobs[i][0]==6 && OGPItems.jobs[i][1]==10 && OGPItems.jobs[i][8]==0 && OGPItems.jobs[i][9]==0) {
          if (parseFloat(OGPItems.jobs[i][7]) > 0)  
            if (bvi == -1) {
              bvi = i;
            }
            else
               if (parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[bvi][7])/parseFloat(OGPItems.jobs[bvi][6])) {
               bvi = i;
             }
        }
      }
      if (bvi > -1) {
        OGPItems.jobs[bvi][4]='Best Brazil L' + j + ' Job';
        if (ckstring != '') ckstring += '|';
        ckstring += j + ',' + bvi;
      }
    }
    OGPItems.saveJobInfoToCookies(); 
    OGPDisplay.addLine('El Dorado jobs added',OGPConfig.clrGood); 
  };
  
  this.addManualJob = function(city,tab,job,eng,exp) {
    for (var i=0; i < OGPItems.jobs.length; i++) {
      if (OGPItems.jobs[i][0] == city && OGPItems.jobs[i][1] == tab && OGPItems.jobs[i][2]==job) {
        OGPItems.jobs[i][6] = eng;
        OGPItems.jobs[i][7] = exp;
      }
    }
  };
  
  this.autoBuyFightClub = function(step,index) {
    switch(step) {
      case 0:
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlMarketFight;
        OGPAjax.buildAjax(url,'OGPItems.autoBuyFightClub','1,%ix%');
        break;
        
      case 1:
        var r = OGPAjax.ajax[index].response;
        r = r.replace(/[\r\n|\n|\t|]/g,'');
        var regex = /toggleViewAll.*?<div.*?>.*?([0-9]+)/;
        var match = regex.exec(r);
        if (!match) {
          OGPDisplay.addLine('Could not determine current Victory Coins',OGPDisplay.clrFatal);
          return;
        }
        OGPItems.afcCoins = parseInt(match[1]);
        // Have the Victory Coin Count, check RPs
        var r = document.body.innerHTML;
        r = r.replace(/[\r\n|\n|\t|]/g,'');
        var regex = /user_favor_wrapper.*?id=.user_favor.*?>([0-9]+)</;
        var match = regex.exec(r);
        if (!match) {
          OGPDisplay.addLine('Could not determine current RP count',OGPConfig.clrFatal);
          return;
        }
        OGPItems.afcRP = parseInt(match[1]);
        
        var txt = '<table id="tblDrone" style="width:550px;">';
        txt += '<tr><td colspan="3" style="text-align:center;">Auto Buy Fight Club Items</td></tr>';
        txt += '<tr><td colspan="3" style="text-align:center;">You have ' + OGPItems.afcCoins + ' Victory Coints and ' + OGPItems.afcRP + ' RPs to spend</td></tr>';
        txt += '<tr><td style="width:33%;">Step 1</td><td style="width:33%;">Step 2</td><td>Step 3</td></tr>';
        txt += '<tr><td valign="top">Select the item to buy<br>';
        txt += '<select id="selItem" name="selItem" onchange="OGPItems.autoBuyFightClub(10,0)">';
        txt += '<option value="">-- Select Item --</option>';
        for (var i=0; i < OGPItems.FCItems.length; i++) {
          txt += '<option value="' + OGPItems.FCItems[i][1] + '">' + OGPItems.FCItems[i][0];
          txt += ' [' + OGPItems.FCItems[i][3] + 'VC';
          if (OGPItems.FCItems[i][4]!=0)
            txt += '/' + OGPItems.FCItems[i][4] + 'RP';
          txt += ']</option>';
        }
        txt += '</select></td>';
        txt += '<td valign="top"><div id="divFCCount" name="divFCCount"></div></td>';
        txt += '<td valign="top"><div id="divFCGo" name="divFCGo" style="font-size:16px;"></div></td>';
        txt += '</tr>';
        txt += '</table>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;
        
      case 2:
        var item = e$('selItem').value;
        OGPItems.afcItem = item;
        var qt = e$('selFCCount').value;
        e$('divOGPSetup').innerHTML = '';
        
        OGPItems.FCItemsToBuy = qt;
        OGPItems.FCItemsBought = 0;
        
        var txt = '<table id="tblDrone" style="width:550px;">';
        txt += '<tr><td colspan="3">Auto Buy Fight Club Items</td></tr>';
        txt += '<tr><td>Buying ' + qt + ' ' + OGPItems.FCItems[item][0];
        txt += '</td>';
        txt += '<td><div style="float:left;">Items Bought:&nbsp;&nbsp;</div><div id="divBought" name="divBought">0</div></td>';
        txt += '<td><div style="float:left;">Remaining:&nbsp;&nbsp;</div><div id="divRemain" name="divRemain">' + qt + '</div></td>';
        txt += '</tr></table>';
        OGPDisplay.setHTML('divOGPResults',txt);
        OGPItems.autoBuyFightClub(3,0);
        break;
        
      case 3:
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlBuyFightClub;
        url += '&favor_type=' + OGPItems.FCItems[OGPItems.afcItem][2] + '&favor_id=' + OGPItems.FCItems[OGPItems.afcItem][1];
        OGPAjax.buildAjax(url,'OGPItems.autoBuyFightClub','4,%ix%');
        break;
        
      case 4:
        var r = OGPAjax.ajax[index].response;
        if (r.indexOf('You have purchased') > 0) {
          OGPDisplay.setHTML('divBought',++OGPItems.FCItemsBought);
          OGPDisplay.setHTML('divRemain',OGPItems.FCItemsToBuy-OGPItems.FCItemsBought);
          if (OGPItems.FCItemsBought == OGPItems.FCItemsToBuy) {
            e$('divOGPResults').innerHTML += OGPDisplay.setGoodColor('<br>All items bought');
          } else {
            OGPItems.autoBuyFightClub(3,0);  
          }
        } else {
          // Purchase failed, stop
          e$('divOGPResults').innerHTML += OGPDisplay.setBadColor('Purchase Failed...Stopping');
        }
        break;
        
        
      case 10:
        var v = e$('selItem').value;
        e$('divFCGo').innerHTML = '';
        if (v == '') {
          e$('divFCCount').innerHTML = '';
          return;
        }
        // Figure out how many they can buy
        var maxCoin = parseInt(OGPItems.afcCoins/OGPItems.FCItems[v][3]);
        var maxRP = -1;
        if (OGPItems.FCItems[v][4] != 0)
          maxRP = parseInt(OGPItems.afcRP/OGPItems.FCItems[v][4]);
        var maxBuild = maxCoin;
        if (maxRP != -1)
          if (maxRP < maxBuild) maxBuild = maxRP;
        var txt = 'You can buy ' + maxBuild + ' of this item.<br>';
        txt += '<select id="selFCCount" name="selFCCount" onchange="OGPItems.autoBuyFightClub(11,0)">';
        txt += '<option value="">How Many?</option>';
        for (var i=1; i <= maxBuild; i++) {
          txt += '<option value="' + i + '">' + i + '</option>';
        }
        txt += '</select>';
        e$('divFCCount').innerHTML = txt;
        break;
        
      case 11:
        var v = e$('selFCCount').value;
        if (v == '') {
          e$('divFCGo').innerHTML = '';
          return;
        }
        var txt = '<a onclick="OGPItems.autoBuyFightClub(2,0)">Start Buying</a>';
        e$('divFCGo').innerHTML = txt;
        break;
        
        
    }
  };
  
  // Add to wishlist
  this.addToWishlist = function(step,index,item) {
    switch(step) {
      case 0:
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlAddToWishlist;
        url += '&gift_category=1&gift_id=' + item;
        OGPAjax.buildAjax(url,'OGPItems.addToWishlist','1,%ix%');
        break;
        
      case 1:
        var r = OGPAjax.ajax[index].response;
        var regstat = /wlstatus\\":\\"([A-Za-z]+)\\"/;
        var regmsg = /wlmsg\\":\\"([A-Za-z.\s]+)\\"/;
        var stat = regstat.exec(r);
        var msg = regmsg.exec(r);
        switch(stat[1]) {
          case 'ok':
            // Added successfully
            alert('Item added to wishlist');
            break;
          case 'error':
            // Error
            alert('Error adding item to wishlist.\n\nError Reported: ' + msg[1]);
            break;
        }
        break;
    }
  };
  
  // Collect Mystery Bags
  this.collectMysteryBags = function(step,index) {
    switch(step) {
      case 0:
        var txt = '';
        txt += '<div id="divMysBag" name="divMysBag">';
        txt += 'From your Facebook Requests page, view the source and paste it here<br />';
        txt += '<textarea id="taMysBag" name="taMysBag" rows="3" cols="40"></textarea><br />';
        txt += '<input type="button" value="Collect!" onclick="OGPItems.collectMysteryBags(1,0);">';
        txt += '</div>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;
        
      case 1:
        OGPItems.mysbags.length = 0;
        var txt = e$('taMysBag').value;
        OGPDisplay.setHTML('divOGPSetup','<div>Finding Mystery Bags</div>');
        var s = txt.indexOf('Claim Rewards');
        while (s > 0) {
          s = txt.indexOf('[',s);
          s++; var e=s;
          while (txt.substr(e,1) != ']' && e < txt.length) e++;
          var url = txt.substr(s,e-s);
          OGPItems.mysbags[OGPItems.mysbags.length] = url;
          s = txt.indexOf('Claim Rewards',s);
        }
        OGPDisplay.clearSetup();
        var txt = '';
        txt += '<table id="tblMysBag" name="tblMysBag">';
        for (var i=0; i < OGPItems.mysbags.length; i++) {
          txt += '<tr><td>' + (i+1) + '</td><td><div id="divMB' + i + '" name="divMB' + i + '">Waiting...</td></tr>';
        }
        txt += '</table>';
        OGPDisplay.setHTML('divOGPResults',txt);
        OGPItems.collectMysteryBags(2,0);
        break;
        
      case 2:
        OGPItems.curbag = -1;
        for (var i=OGPItems.mysbags.length-1; i >= 0; i--)
          if (OGPItems.mysbags[i] != '') OGPItems.curbag = i;
        if (OGPItems.curbag >= 0) {
          e$('divMB' + OGPItems.curbag).innerHTML = 'Collecting Bag From Facebook';
          e$('ogpiframe').src = OGPItems.mysbags[OGPItems.curbag];
          setTimeout('OGPItems.collectMysteryBags(3,0)',5000);
          break;
        } else {
          OGPDisplay.setHTML('divOGPSetup','All Mystery Bags Collected');
        }
        break;
      
      case 3:
        e$('divMB' + OGPItems.curbag).innerHTML = 'Opening Mystery Bag';

        OGPItems.mysbags[OGPItems.curbag] = '';        
        //OGPItems.collectMysteryBags(2,0);
        break;
    }
  };
  
  // Auto spend RP to build items
  this.autoBuildShopItems = function(step,index) {
    switch(step) {
      case 0:
        var txt = '<table align="center" id="tblBiuldShop" name="tblBuildShop" style="width:500px">';
        txt += '<tr><td style="font-size:11px;">This function will build the selected number of shop items ';
        txt += 'by spending RPs to unlock the appropriate shop to allow item building before ';
        txt += 'waiting for the timer to countdown.</td></tr>';
        txt += '<tr><td style="text-align:center;">You currently have <font style="color:#ffff00">' + OGPConfig.curRP + '</font> RPs which will allow <font style="color:#ffff00">' + parseInt(OGPConfig.curRP/12) + '</font> items to be built.</td></tr>';
        txt += '<tr><td style="text-align:center;font-size:11px;">Amount:<select style="font-size:11px;" id="selAmount" name="selAmount">';
        for (var i=1; i <= parseInt(OGPConfig.curRP/12); i++)
          txt += '<option value="' + i + '">' + i + '</option>';
        txt += '</select>&nbsp;&nbsp;&nbsp;&nbsp;';
        txt += 'Item:<select style="font-size:11px;" id="selItem" name="selItem">';
        for (var i=0; i < OGPItems.shopItems.length; i++) {
          txt += '<option value="' + OGPItems.shopItems[i][1] + '|' + OGPItems.shopItems[i][2] + '|' + OGPItems.shopItems[i][0] + '">' + OGPItems.shopItems[i][0].replace(/@/g,"'") + '</option>';
        }
        txt += '</select></td></tr>';
        txt += '</tr><td style="text-align:center"><a onclick="OGPItems.autoBuildShopItems(2,0)">Build Items</a></tr></tr></table>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;

      case 2:
        var tmpval = e$('selItem').value;
        tmpval = tmpval.split('|');
        OGPItems.itemnum = tmpval[0];
        OGPItems.propertynum = tmpval[1];
        OGPItems.itemname = tmpval[2];
        OGPItems.numtobuild = parseInt(e$('selAmount').value);
        OGPDisplay.clearSetup();
        var txt = '';
        txt += '<table align="center" style="width:500px;">';
        txt += '<tr><td style="text-align:center">Building ' + OGPItems.itemname.replace(/@/g,"'") + ' (x' + OGPItems.numtobuild + ')</td></tr>';
        txt += '<tr><td style="text-align:center"><div id="divBuilt" name="divBuilt">0/' + OGPItems.numtobuild + ' items built</div></td></tr>';
        txt += '<tr><td style="text-align:center"><div id="divBRes" name="divBRes"></div></td></tr>';
        txt += '</table>';
        OGPDisplay.setHTML('divOGPResults',txt);
        OGPItems.curBuild = 0;
        if (OGPConfig.currentCity != 1) 
          OGPTravel.goCity(1,"OGPItems.autoBuildShopItems(3,0);");
        else
          OGPItems.autoBuildShopItems(3,0);
        break;
        
      case 3:
        // Unlock the property - won't spend if already unlocked
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlUnlockShop + '&building_type=' + OGPItems.propertynum;
        OGPAjax.buildAjax(url,'OGPItems.autoBuildShopItems','4,%ix%');
        break;
        
      case 4:
        // Unlocked, try to build
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlBuildShop + '&recipe=' + OGPItems.itemnum + '&building_type=' + OGPItems.propertynum;
        OGPAjax.buildAjax(url,'OGPItems.autoBuildShopItems','5,%ix%');
        break;
        
      case 5:
        // Built Item
        var r = OGPAjax.ajax[index].response;
        //e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>' ; return; 
        var s = r.indexOf('CONGRATULATIONS!');
        if (s >= 0) {
          e$('divBRes').innerHTML += 'Built ' + OGPItems.itemname + '<br />';
          OGPItems.curBuild ++;
          e$('divBuilt').innerHTML = OGPItems.curBuild + '/' + OGPItems.numtobuild + ' items built';
        } else {
          // Didn't build, stop here
          e$('divBRes').innerHTML = '<font style="color:#ff0000">Item not built...stopping<br></font>' + e$('divBRes').innerHTML;
          break;
        }
        if (parseInt(OGPItems.curBuild) < parseInt(OGPItems.numtobuild))
          OGPItems.autoBuildShopItems(3,0);
        else
          e$('divBRes').innerHTML = '<font style="color:#ffff00">All Items Built<br></font>' + e$('divBRes').innerHTML;
        break;
      
    }
  
  }
  // Build shop items
  this.shopnytobuild = 0;
  this.shopnybuilt = 0;
  this.shopittobuild = 0;
  this.shopitbuilt = 0;
  this.shoporigcity = 0;
  this.itemItaly = '';
  this.itemBrazil1 = '';
  this.itemBrazil2 = '';
  this.sjobs; // Array for secret job
  
  this.buildShopItems = function(step,index,prop) {
    switch(step) {
      case 0:
        var arbsi = new Array(0,0,0,0,0,0,0);
        if (OGPCookie.readCookie('ogpbsi') != null && OGPCookie.readCookie('ogpbsi') != '') {
          arbsi = OGPCookie.readCookie('ogpbsi').split(',');
        }
        OGPItems.shoporigcity = OGPConfig.currentCity;
        OGPItems.shop1 = 0;
        OGPItems.shop2 = 0;
        OGPItems.shop3 = 0;
        OGPItems.shop4 = 0;
        OGPItems.shop5 = 0;
        OGPItems.shop6 = 0;
        OGPItems.shop7 = 0;
        OGPItems.shopnytobuild = 0;
        OGPItems.shopnybuilt = 0;
        OGPItems.shopittobuild = 0;
        OGPItems.shopitbuilt = 0;
        var txt = '';
        txt += '<table id="tblBuildShop" name="tblBuildShop">';
        txt += '<tr><th colspan="4">Build Shop Items</th></tr>';
        txt += '<tr><td colspan="4" style="text-align:center;">New York</td></tr>';
        txt += '<tr><td style="width:25%;">Chop Shop</td><td style="width:33%">Weapons Depot</td><td>Armory</td><td>Private Zoo</td></tr>';
        txt += '<tr><td><select id="selChopShop" name="selChopShop"><option value ="">-- Select --</option>';
        for (var i=0; i < OGPItems.shopItems.length; i++) {
          if (OGPItems.shopItems[i][2] == 11) {
            txt += '<option value="' + OGPItems.shopItems[i][1] + '"';
            if (parseInt(OGPItems.shopItems[i][1])==parseInt(arbsi[0])) txt += ' selected';
            txt += '>' + OGPItems.shopItems[i][0].replace(/@/g,"'") + '</option>';
          }
        }
        txt += '</select></td>';
        txt += '<td><select id="selWeapons" name="selWeapons"><option value ="">-- Select --</option>';
        for (var i=0; i < OGPItems.shopItems.length; i++) {
          if (OGPItems.shopItems[i][2] == 12) {
            txt += '<option value="' + OGPItems.shopItems[i][1] + '"';
            if (OGPItems.shopItems[i][1]==arbsi[1]) txt += ' selected';
            txt += '>' + OGPItems.shopItems[i][0].replace(/@/g,"'") + '</option>';
          }
        }
        txt += '</select></td>';
        txt += '<td><select id="selArmor" name="selArmor"><option value ="">-- Select --</option>';
        for (var i=0; i < OGPItems.shopItems.length; i++) {
          if (OGPItems.shopItems[i][2] == 13) {
            txt += '<option value="' + OGPItems.shopItems[i][1] + '"';
            if (OGPItems.shopItems[i][1]==arbsi[2]) txt += ' selected';
            txt += '>' + OGPItems.shopItems[i][0].replace(/@/g,"'") + '</option>';
          }
        }
        txt += '</select></td>';
        txt += '<td><select id="selZoo" name="selZoo"><option value ="">-- Select --</option>';
        for (var i=0; i < OGPItems.shopItems.length; i++) {
          if (OGPItems.shopItems[i][2] == 14) {
            txt += '<option value="' + OGPItems.shopItems[i][1] + '"';
            if (OGPItems.shopItems[i][1]==arbsi[3]) txt += ' selected';
            txt += '>' + OGPItems.shopItems[i][0].replace(/@/g,"'") + '</option>';
          }
        }
        txt += '</select></td></tr>';
        txt += '</table>';
        txt += '<table id="tblBuildShop" name="tblBuildShop">';
        txt += '<tr><td style="text-align:center;">Italy</td><td style="text-align:center;" colspan="2">Brazil</td></tr>';
        txt += '<tr><td>Port</td><td>Workshop</td><td>Black Market</td></tr>';
        txt += '<td><select id="selPort" name="selPort"><option value ="">-- Select --</option>';
        for (var i=0; i < OGPItems.shopItems.length; i++) {
          if (OGPItems.shopItems[i][2] == 99) {
            txt += '<option value="' + OGPItems.shopItems[i][1] + '"'
            if (OGPItems.shopItems[i][1]==arbsi[4]) txt += ' selected';
            txt += '>' + OGPItems.shopItems[i][0].replace(/@/g,"'") + '</option>';
          }
        }
        txt += '</select></td>';
        txt += '<td><select id="selShop" name="selShop"><option value ="">-- Select --</option>';
        for (var i=0; i < OGPItems.shopItems.length; i++) {
          if (OGPItems.shopItems[i][2] == 2) {
            txt += '<option value="' + OGPItems.shopItems[i][1] + '"'
            if (OGPItems.shopItems[i][1]==arbsi[5]) txt += ' selected';
            txt += '>' + OGPItems.shopItems[i][0].replace(/@/g,"'") + '</option>';
          }
        }
        txt += '</select></td>';
        txt += '<td><select id="selBlack" name="selBlack"><option value ="">-- Select --</option>';
        for (var i=0; i < OGPItems.shopItems.length; i++) {
          if (OGPItems.shopItems[i][2] == 3) {
            txt += '<option value="' + OGPItems.shopItems[i][1] + '"'
            if (OGPItems.shopItems[i][1]==arbsi[6]) txt += ' selected';
            txt += '>' + OGPItems.shopItems[i][0].replace(/@/g,"'") + '</option>';
          }
        }
        txt += '</select></td>';
        txt += '<tr><td colspan="5"><a onclick="OGPItems.buildShopItems(1,0,0)">Build Items</a></td></tr>';
        txt += '</table>';
        OGPDisplay.setHTML('divOGPSetup',txt);
        break;
        
      case 1:
        // Save the cookie
        var txt = e$('selChopShop').value;
        txt += ',' + e$('selWeapons').value;
        txt += ',' + e$('selArmor').value;
        txt += ',' + e$('selZoo').value;
        txt += ',' + e$('selPort').value;
        txt += ',' + e$('selShop').value;
        txt += ',' + e$('selBlack').value;
        OGPCookie.createCookie('ogpbsi',txt,365);
        
        if (OGPConfig.currentCity != 1) 
          OGPTravel.goCity(1,'OGPItems.buildShopItems(2,0,0)');
        else
          OGPItems.buildShopItems(2,0,0);
        break;
          
      case 2:
        var item1 = e$('selChopShop').value;
        var item2 = e$('selWeapons').value;
        var item3 = e$('selArmor').value;
        var item4 = e$('selZoo').value;
        OGPItems.itemItaly = e$('selPort').value;
        OGPItems.itemBrazil1 = e$('selShop').value;
        OGPItems.itemBrazil2 = e$('selBlack').value;
        OGPDisplay.clearSetup();
        var txt = '';
        txt += '<table id="tblBuildShop" name="tblBuildShop">';
        txt += '<tr><th colspan="2">Build Shop Items Results</th></tr><tr><td style="width:120px;">Chop Shop:</td><td><div id="divItem1" name="divItem1"></div></td></tr><tr><td>Weapons Depot:</td><td><div id="divItem2" name="divItem2"></div></td></tr><tr><td>Armory:</td><td><div id="divItem3" name="divItem3"></div></td></tr><tr><td>Zoo:</td><td><div id="divItem4" name="divItem4"></div></td></tr><tr><td>Port:</td><td><div id="divItem5" name="divItem5"></div></td></tr><tr><td>Workshop:</td><td><div id="divItem6" name="divItem6"></div></td></tr><tr><td>Black Market:</td><td><div id="divItem7" name="divItem7"></div></td></tr>';
        txt += '</table>';
        OGPDisplay.setHTML('divOGPResults',txt);
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlBuildShop;
        if (item1 != '') {
          OGPItems.shopnytobuild++;
          for (var i=0; i < OGPItems.shoptries; i++)
            OGPAjax.buildAjax(url + '&recipe=' + item1 + '&building_type=11','OGPItems.buildShopItems','3,%ix%,1');
        } else {
          OGPDisplay.setHTML('divItem1','No item selected to build');
        }
        if (item2 != '') {
          OGPItems.shopnytobuild++;
          for (var i=0; i < OGPItems.shoptries; i++)
            OGPAjax.buildAjax(url + '&recipe=' + item2 + '&building_type=12','OGPItems.buildShopItems','3,%ix%,2');
        } else {
          OGPDisplay.setHTML('divItem2','No item selected to build');
        }
        if (item3 != '') {
          OGPItems.shopnytobuild++;
          for (var i=0; i < OGPItems.shoptries; i++)
            OGPAjax.buildAjax(url + '&recipe=' + item3 + '&building_type=13','OGPItems.buildShopItems','3,%ix%,3');
        } else {
          OGPDisplay.setHTML('divItem3','No item selected to build');
        }
        if (item4 != '') {
          OGPItems.shopnytobuild++;
          for (var i=0; i < OGPItems.shoptries; i++)
            OGPAjax.buildAjax(url + '&recipe=' + item4 + '&building_type=14','OGPItems.buildShopItems','3,%ix%,4');
        } else {
          OGPDisplay.setHTML('divItem4','No item selected to build');
        }
        if (OGPItems.shopnytobuild == 0) {
          // Check for only building Italy
          OGPItems.buildShopItems(4,0,0);  
        }
        break;
        
      case 3:
        var r = OGPAjax.ajax[index].response;
        OGPItems.shopnybuilt++;
        if (prop == 1) OGPItems.shop1++;
        if (prop == 2) OGPItems.shop2++;
        if (prop == 3) OGPItems.shop3++;
        if (prop == 4) OGPItems.shop4++;
        if (r.indexOf('You got') > 0) {
          var s = r.indexOf('You got');
          var e = s;
          while (r.substr(e,1) != '<') e++;
          e$('divItem' + prop).innerHTML += r.substr(s,e-s) + '<br />';
        } else {
          if (prop == 1 && OGPItems.shop1 == OGPItems.shoptries && e$('divItem1').innerHTML == '')
            OGPDisplay.setHTML('divItem1',OGPParser.getValueInTags(r,'class="message_body"',0));
          if (prop == 2 && OGPItems.shop2 == OGPItems.shoptries && e$('divItem2').innerHTML == '')
            OGPDisplay.setHTML('divItem2',OGPParser.getValueInTags(r,'class="message_body"',0));
          if (prop == 3 && OGPItems.shop3 == OGPItems.shoptries && e$('divItem3').innerHTML == '')
            OGPDisplay.setHTML('divItem3',OGPParser.getValueInTags(r,'class="message_body"',0));
          if (prop == 4 && OGPItems.shop4 == OGPItems.shoptries && e$('divItem4').innerHTML == '')
            OGPDisplay.setHTML('divItem4',OGPParser.getValueInTags(r,'class="message_body"',0));
        }
        
        //  If all built, process italy
        if (OGPItems.shopnybuilt == OGPItems.shopnytobuild) {
          OGPItems.buildShopItems(4,0,0);
        }
        break;
        
      case 4:
        if (OGPItems.itemItaly != '') {
          if (OGPConfig.currentCity != 6) 
            OGPTravel.goCity(6,'OGPItems.buildShopItems(5,0,0)');
          else
            OGPItems.buildShopItems(5,0,0);
        } else {
          OGPDisplay.setHTML('divItem5','No item selected to build');
          OGPItems.buildShopItems(7,0,0);
        }
        break;
        
      case 5:
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlViewPort;
        OGPAjax.buildAjax(url,'OGPItems.buildShopItems','51,%ix%,0');
        break;
        
      case 51:
        var r = OGPAjax.ajax[index].response;
        var regex = /port_buy_item_url:".*?php(.*?)"/;
        var match = regex.exec(r);
        if (match) {
          var url = OGPConfig.MWROOTPATH + unescape(match[1]);
          url += '&id=' + OGPItems.itemItaly;
          url += '&city=6&client_id=8&building_type=7';
          OGPAjax.buildAjax(url,'OGPItems.buildShopItems','6,%ix%,0');
        }
        break;
        
      case 6:
        var r = OGPAjax.ajax[index].response;
        var regex = /purchase_message.*?:.*?"(.*?)\\/;
        var match = regex.exec(r);
        if (match) {
          OGPDisplay.setHTML('divItem5',match[1]);
        } else {
          OGPDisplay.setHTML('divItem5','Could not understand response from server');
        }
        OGPItems.buildShopItems(7,0,0);
        break;
        
      case 7:
        if (OGPItems.itemBrazil1 != '' || OGPItems.itemBrazil2 != '') {
          if (OGPConfig.currentCity != 7) 
            OGPTravel.goCity(7,'OGPItems.buildShopItems(8,0,0)');
          else
            OGPItems.buildShopItems(8,0,0);
          break;
        }
        OGPItems.buildShopItems(20,0,0);
        break;
        
      case 8:
        if (OGPItems.itemBrazil1 != '') {
          // Load the properties page
          var url = OGPConfig.MWURLAJAX + OGPConfig.urlViewBrazilProp;
          OGPAjax.buildAjax(url,'OGPItems.buildShopItems','9,%ix%,0');
          break;
        } else {
          OGPDisplay.setHTML('divItem6','No item selected to build');
          OGPItems.buildShopItems(11,0,0);
        }
        break;
        
      case 9:
        var r = OGPAjax.ajax[index].response;
        var regex = /port_buy_item_url:".*?php(.*?)"/;
        var match = regex.exec(r);
        if (match) {
          var url = OGPConfig.MWROOTPATH + unescape(match[1]);
          url += '&id=' + OGPItems.itemBrazil1;
          url += '&city=7&client_id=8&building_type=2';
          OGPAjax.buildAjax(url,'OGPItems.buildShopItems','10,%ix%,0');
        }
        break;
        
      case 10:
        var r = OGPAjax.ajax[index].response;
        var regex = /result.*,/;
        var match = regex.exec(r);
        if (match) {
          if (match[0].indexOf('success')) {
            var regex = /purchase_message.*?:.*?"(.*?)\\/;
            var match = regex.exec(r);
            if (match) {
              e$('divItem6').innerHTML += match[1] + '<br>';
              if (match[1].indexOf('Maximum number of') >= 0 || match[1].indexOf('cannot be purchased') >= 0) 
                OGPItems.buildShopItems(11,0,0);
              else
                // Try another
                OGPItems.buildShopItems(8,0,0);
              break;
            }
          } else {
            if (e$('divItem6').innerHTML == '') {
              var regex = /purchase_message.*?:.*?"(.*?)\\/;
              var match = regex.exec(r);
              if (match) {
                e$('divItem6').innerHTML += match[1];
              }
            }
            OGPItems.buildShopItems(11,0,0);
          }
        } else {
          if (e$('divItem6').innerHTML == '')
            OGPDisplay.setHTML('divItem6','Could not understand response');
            OGPItems.buildShopItems(11,0,0);
        }
        break;
        
      case 11:
        if (OGPItems.itemBrazil2 == '') {
          OGPDisplay.setHTML('divItem7','No item selected to build');
          OGPItems.biuldShopItems(20,0,0);
          break;
        }
        // Load the properties page
        var url = OGPConfig.MWURLAJAX + OGPConfig.urlViewBrazilProp;
        OGPAjax.buildAjax(url,'OGPItems.buildShopItems','12,%ix%,0');
        break;
        
      case 12:
        var r = OGPAjax.ajax[index].response;
        var regex = /port_buy_item_url:".*?php(.*?)"/;
        var match = regex.exec(r);
        if (match) {
          var url = OGPConfig.MWROOTPATH + unescape(match[1]);
          url += '&id=' + OGPItems.itemBrazil2;
          url += '&city=7&client_id=8&building_type=3';
          OGPAjax.buildAjax(url,'OGPItems.buildShopItems','13,%ix%,0');
        }
        break;
      
      case 13:
        var r = OGPAjax.ajax[index].response;
        var regex = /purchase_message.*?:.*?"(.*?)\\/;
        var match = regex.exec(r);
        if (match) {
          OGPDisplay.setHTML('divItem7',match[1]);
        } else {
          OGPDisplay.setHTML('divItem7','Could not understand response from server');
        }
        OGPItems.buildShopItems(20,0,0);
        break;
        
      case 20:
        if (OGPConfig.currentCity != OGPItems.shoporigcity) 
          OGPTravel.goCity(OGPItems.shoporigcity,'OGPItems.buildShopItems(21,0,0)');
        else
          OGPItems.buildShopItems(21,0,0);
        break;

      case 21:
        OGPDisplay.addLine('All Items Built',OGPConfig.clrGood);
        break;
    }
  };
  
  // City related methods
  this.getCityName = function(tag) {
    for (var i=0; i < this.cities.length; i++)
      if (this.cities[i][1]==tag || this.cities[i][3]==tag) return this.cities[i][0];
    return('Unknown');
  };
  this.getCityTag = function(id) {
    for (var i=0; i < this.cities.length; i++)
      if (this.cities[i][3]==id) return this.cities[i][1];
  };
  this.getCityNum = function(tag) {
    for (var i=0; i < this.cities.length; i++)
      if (this.cities[i][0]==tag || this.cities[i][1]==tag) return this.cities[i][3];
    if (this.cities[tag][3])
      return(this.cities[tag][3]);
    else 
      return(tag);
  };
  this.getCityNumByIndex = function(tag) {
    for (var i=0; i < this.cities.length; i++)
      if (this.cities[i][8]==tag) return this.cities[i][3];
    return 0;
  };
  this.getCityBusinessType = function(tag) {
    for (var i=0; i < this.cities.length; i++) {
      if (this.cities[i][0]==tag || this.cities[i][2]==tag || this.cities[i][3]==tag) {
        return this.cities[i][4];
      }
    }
    return('0');
  };
  this.updateCurrentCity = function() {
    OGPConfig.currentCity = OGPTravel.getCurrentCity();
  };
  this.getCityIndex = function(tag) {
    for (var i=0; i < this.cities.length; i++) {
      if (this.cities[i][0]==tag || this.cities[i][1]==tag || this.cities[i][3]==tag) {
        return i;
      }
    }
    return('-1');
  };
  
  // Job related methods
  
  this.updateJobPayouts = function(step,index) {
    switch(step) {
      case 0:
        OGPDisplay.clearResults();
        OGPDisplay.addLine('Updating job energy and experience information, this will take a minute...',OGPConfig.clrAction);
        
        // Save the Brazil secret jobs
        /*
        OGPItems.sjobs = new Array();
        for (var i=0; i < OGPItems.jobs.length; i++)
          if (OGPItems.jobs[i][0]==6 && OGPItems.jobs[i][1]==9) 
            OGPItems.sjobs[OGPItems.sjobs.length] = OGPItems.jobs[i];
        */
        OGPItems.currentJobLevel = 0; 
        OGPItems.currentJobTab = 1;
        OGPItems.currentJobCity = OGPItems.jobLevels[0][0];
        OGPConfig.originalCity = OGPConfig.currentCity;
        for (var i=0; i < OGPItems.jobs.length; i++) {
          if (OGPItems.jobs[i][4].substr(0,4)=='Best')
            OGPItems.jobs[i][4] = '';
          //if (OGPItems.jobs[i][0]!=6) {
          OGPItems.jobs[i][6] = 0;
          OGPItems.jobs[i][7] = 0;
          //}
          if (OGPItems.jobs[i][4].substr(0,10)=='Best Vegas') OGPItems.jobs[i][4] = '';
        }
        if (OGPConfig.currentCity != OGPItems.currentJobCity) {
          OGPConfig.currentCity = OGPItems.currentJobCity;
          OGPTravel.goCity(OGPItems.currentJobCity,'OGPItems.updateJobPayouts(1,0)');
        } else {
          OGPItems.updateJobPayouts(1,0);
        }
        break;
  
      case 1:
      
        var url = OGPConfig.MWURLAJAX;
        url += '&xw_controller=' + OGPItems.cities[OGPItems.currentJobLevel][2];
        url += '&xw_action=view&xw_city=' + OGPItems.currentJobCity;
        if (OGPItems.currentJobCity == 7 && OGPItems.currentJobTab >= 9) 
          url += '&tab=' + (parseInt(OGPItems.currentJobTab) + 95);
        else if (OGPItems.currentJobCity == 8 && OGPItems.currentJobTab >= 7) 
          url += '&tab=' + (parseInt(OGPItems.currentJobTab) + 99);
        else 
          url += '&tab=' + OGPItems.currentJobTab;
        if (OGPItems.currentJobCity == 2) url += '&bar=0';
        if (OGPItems.currentJobCity == 1) 
          if (OGPItems.currentJobLevel <= 5)
            url += '&bar=0';
          else
            url += '&bar=1';
        //e$('divOGPDebug').innerHTML += '<br>' + url;
        OGPAjax.buildAjax(url,'OGPItems.updateJobPayouts','2,%ix%');
        break;
        
      case 2:
        var r = OGPAjax.ajax[index].response;
        //OGPDisplay.showPage(index,'inner_page');
        r = r.replace(/[\r\n|\n|\t|]/g,'');
        OGPDisplay.addLine(OGPItems.getCityName(OGPItems.currentJobCity) + ' - Tab ' + OGPItems.currentJobTab,OGPConfig.clrInfo);
        if (r.indexOf('div id="new_user_jobs"') > 0) {
          var s = r.indexOf('div id="new_user_jobs"');
          s = r.indexOf('class="title_results"',s);
          while (s > 0) {
            var e = r.indexOf('class="title_results"',s+1);
            if (e < 0) e = r.length;
            var jobname = OGPParser.getValueInTags(r.substr(s,e-s),'<h3>',0);
            s = r.indexOf('&job=',s) + 5;
            var jobnum = parseInt(r.substr(s));
            var texp = parseInt(OGPParser.getValueInTags(r.substr(s,e-s),'class="energy"',0));
            var teng = parseInt(OGPParser.getValueInTags(r.substr(s,e-s),'class="experience"',0));
            
            for (var i=0; i < OGPItems.jobs.length; i++) {
              if (OGPItems.jobs[i][0] == OGPItems.currentJobLevel && OGPItems.jobs[i][1]==OGPItems.currentJobTab && OGPItems.jobs[i][2]==jobnum) {
                if (jobname != '') OGPItems.jobs[i][3] = jobname.replace(/^\s+|\s+$/g, '');
                OGPItems.jobs[i][6] = teng;
                OGPItems.jobs[i][7] = texp;
              }
            }
            s = r.indexOf('class="title_results"',s+1);
          }
        } else if (OGPConfig.currentCity>=7 && OGPConfig.currentCity<=9) { // Brazil Chicago London
          //e$('divOGPDebug').innerHTML = '<textarea>' + r + '</textarea>' + r;
          //return;
          var match;
          var regex = /class="job ".*?<h4>(.*?)<.*?class="energy".*?>([0-9.]+)<.*?class="experience".*?>([0-9.]+).*?btn_dojob_([0-9]+)/g;
          while (match = regex.exec(r)) {
            var jobnum = parseInt(match[4]);
            for (var i=0; i < OGPItems.jobs.length; i++) {
              if (OGPItems.jobs[i][0] == OGPItems.jobLevels[OGPItems.currentJobLevel][0]-1 && OGPItems.jobs[i][1]==OGPItems.currentJobTab && OGPItems.jobs[i][2]==jobnum) {
                if (match[1] != '') OGPItems.jobs[i][3] = match[1].replace(/^\s+|\s+$/g, '');
                if (match[3].indexOf('.') >= 0)
                  OGPItems.jobs[i][7] = parseInt(match[3].replace('.',''))*10;
                else
                  OGPItems.jobs[i][7] = match[3];
                if (match[2].indexOf('.') >= 0)
                  OGPItems.jobs[i][6] = parseInt(match[2].replace('.',''))*10;
                else
                  OGPItems.jobs[i][6] = match[2];
              }
            }
          }
        } else if (r.indexOf('<div class="job_title">' > 0) && r.indexOf('class="job_name"') < 0) {
          // Vegas jobs
          var s = r.indexOf('class="job_title"');
          var x = 0;
          while (s > 0) {
            var goodJob = true;
            var e = r.indexOf('class="job_title"',s+1);
            if (e < 0) e = r.length;
            var jobname = OGPParser.getValueInTags(r.substr(s,e-s),'<h3>',0);
            s = r.indexOf('class="experience"',s);
            if (s < 0 || s > e) goodJob = false;
            var texp = parseInt(OGPParser.getValueInTags(r.substr(s,e-s),'class="experience"',0));
            s = r.indexOf('class="energy"',s);
            if (s < 0 || s > e) goodJob = false;
            var teng = parseInt(OGPParser.getValueInTags(r.substr(s,e-s),'class="energy"',0));
            s = r.indexOf('panelButtonDoJob(',s);
            if (s < 0 || s > e) goodJob = false;
            while (r.substr(s,1) != '(') s++;
            var jobnum = parseInt(r.substr(s+1));
            s = r.indexOf('<span>',s);
            var te = r.indexOf('</span>',s);
            s = r.substr(s,te-s).indexOf('Locked');
            if (s >= 0) goodJob = false;
            if (goodJob) {
              for (var i=0; i < OGPItems.jobs.length; i++) {
                if (OGPItems.jobs[i][0] == OGPItems.jobLevels[OGPItems.currentJobLevel][0]-1 && OGPItems.jobs[i][1]==OGPItems.currentJobTab && OGPItems.jobs[i][2]==jobnum) {
                  if (jobname != '') OGPItems.jobs[i][3] = jobname.replace(/^\s+|\s+$/g, '');
                  /*if (OGPConfig.currentCity == 5) { // Vegas hack for 10% exp
                    texp = Math.round((texp * 1.1)-.01);
                  }*/
                  OGPItems.jobs[i][6] = teng;
                  OGPItems.jobs[i][7] = texp;
                }
              }
              s = e; 
            }
            else
              if (e == r.length)
                s = -1; 
              else 
                s = e;
          }
          
        } else if (OGPConfig.currentCity==4){
          // Correction for Bangkok til it closes
          var match;
          /*
          if (OGPItems.currentJobTab == 7) {
            e$('divOGPDebug').innerHTML += '<br><textarea>' + r + '</textarea>';return;
          }
          */
          var regex1 = /job_name".*?<\/tr>/g;
          var regex2 = /job_name".*?>(.*?)<.*?Experience.*?([0-9]+)<.*?([0-9]+)<.*?job=([0-9]+)/;
          while (match = regex1.exec(r)) {
            if (match[0].indexOf('job=') > 0) {
              var rmatch = regex2.exec(match[0]);
              if (rmatch) {
                var jobnum = parseInt(rmatch[4]);
                for (var i=0; i < OGPItems.jobs.length; i++) {
                  if (OGPItems.jobs[i][0] == OGPItems.jobLevels[OGPItems.currentJobLevel][0]-1 && OGPItems.jobs[i][1]==OGPItems.currentJobTab && OGPItems.jobs[i][2]==jobnum) {
                    if (rmatch[1] != '') OGPItems.jobs[i][3] = rmatch[1].replace(/^\s+|\s+$/g, '');
                    OGPItems.jobs[i][6] = rmatch[3];
                    OGPItems.jobs[i][7] = rmatch[2];
                  }
                }
              }
            }
          }
          var regex3 = /job_name_oneline.*?<\/tr>.*?<\/tr>/g;
          var regex4 = /job_name_oneline.*?>(.*?)<.*?Experience.*?([0-9]+)<.*?([0-9]+)<.*?job=([0-9]+)/;
          while (match = regex3.exec(r)) {
            if (match[0].indexOf('job=') > 0) {
              var rmatch = regex4.exec(match[0]);
              if (rmatch) {
                var jobnum = parseInt(rmatch[4]);
                for (var i=0; i < OGPItems.jobs.length; i++) {
                  if (OGPItems.jobs[i][0] == OGPItems.jobLevels[OGPItems.currentJobLevel][0]-1 && OGPItems.jobs[i][1]==OGPItems.currentJobTab && OGPItems.jobs[i][2]==jobnum) {
                    if (rmatch[1] != '') OGPItems.jobs[i][3] = rmatch[1].replace(/^\s+|\s+$/g, '');
                    OGPItems.jobs[i][6] = rmatch[3];
                    OGPItems.jobs[i][7] = rmatch[2];
                  }
                }
              }
            }
          }
        } else {
          var s = r.indexOf('class="job_name');
          var goodJob = true;
          while (s > 0) {
            goodJob = true;
            var e = r.indexOf('class="job_name',s+1);
            if (e-s > 0 && e-s < 10000) e= r.indexOf('class="job_name',e+1);
            if (e < 0) e = r.length;
            // Check for locked job
            if (r.substr(s,e-s).indexOf('sexy_lock') > 0) {
              s = r.indexOf('class="job_name',s+1);
              e = r.indexOf('class="job_name',s+1);
              if (e-s > 0 && e-s < 10000) e = r.indexOf('class="job_name',e+1);
              if (e < 0) e = r.length;
            }
            var jobname = OGPParser.getValueInTags(r.substr(s,e-s),'class="job_name',0);
            s = r.indexOf('class="job_reward',s);
            // Correction for boss jobs
            if (s <= e) {   
              var texp = parseInt(OGPParser.getValueInTags(r.substr(s,e-s),'class="experience"',0));
              var teng = OGPParser.getValueInTags(r.substr(s,e-s),'class="energy"',0);
              if (r.substr(s,e-s).indexOf('NEED') > 0) 
                goodJob = false;
              s = r.indexOf('class="job_action',s+1);
              s = r.indexOf('&job=',s+1);
              while (r.substr(s,1) < '0' || r.substr(s,1) > '9') s++;
              var jobnum = parseInt(r.substr(s));
              
              // ALWAYS include Poker game
              if (parseInt(OGPConfig.currentCity) == 1 && parseInt(jobnum) == parseInt(OGPDrone.jobPoker[2]))
                goodJob = true;
              if (goodJob == true) {
                for (var i=0; i < OGPItems.jobs.length; i++) {
                  if (OGPItems.jobs[i][0] == OGPItems.jobLevels[OGPItems.currentJobLevel][0]-1 && OGPItems.jobs[i][1]==OGPItems.currentJobTab && OGPItems.jobs[i][2]==jobnum) {
                    if (jobname != '') OGPItems.jobs[i][3] = jobname.replace(/^\s+|\s+$/g, '');
                    OGPItems.jobs[i][6] = teng;
                    OGPItems.jobs[i][7] = texp;
                  }
                }
              }
            }
            else
            {
              // Correct for choice point
              s = e;
            }
            s = r.indexOf('class="job_name',s);
          }
        }
        
        OGPItems.currentJobTab++;
        if (OGPItems.currentJobTab >= OGPItems.jobLevels[OGPItems.currentJobLevel].length) {
          OGPItems.currentJobLevel++;
          if (OGPItems.currentJobLevel >= OGPItems.jobLevels.length) {
            // All Done
            // Restore the Brazil secret level
            /*
            for (var i=0; i < OGPItems.sjobs.length; i++) {
              for (var j = 0; j < OGPItems.jobs.length; j++) {
                if (OGPItems.jobs[j][0] == OGPItems.sjobs[i][0] && OGPItems.jobs[j][1]==OGPItems.sjobs[i][1] && OGPItems.jobs[j][2]==OGPItems.sjobs[i][2]) {
                  OGPItems.jobs[j][6] = OGPItems.sjobs[i][6];
                  OGPItems.jobs[j][7] = OGPItems.sjobs[i][7];
                }  
              }
            }
            */
            if (OGPConfig.originalCity != OGPConfig.currentCity) 
              OGPTravel.goCity(OGPConfig.originalCity,'OGPItems.updateJobPayouts(3,0)');
            else
              OGPItems.updateJobPayouts(3,0);
          } else {
            // Travel to the next city
            OGPItems.currentJobCity = OGPItems.jobLevels[OGPItems.currentJobLevel][0];
            OGPItems.currentJobTab = 1;
            OGPTravel.goCity(OGPItems.currentJobCity,'OGPItems.updateJobPayouts(1,0)');
          }
        } else {
          setTimeout("OGPItems.updateJobPayouts(1,0);",250);
        }
        break;
        
      case 3:
        OGPAjax.buildAjax(OGPConfig.MWURLAJAX + OGPConfig.urlUpdateStats,'OGPItems.updateJobPayouts','4,%ix%');
        break;
      
      case 4:
        // Add the "dummy" loot for all levels of Vegas and Italy
        var ckstring = '';
        for (var j = 1; j <= 8; j++) {
          var bvj = -1;
          for (var i=0; i < OGPItems.jobs.length; i++)
          {
            if (OGPItems.jobs[i][0]==4 && OGPItems.jobs[i][1]==j && OGPItems.jobs[i][8]==0 && OGPItems.jobs[i][9]==0) {
              if (parseFloat(OGPItems.jobs[i][7]) > 0)  
                if (bvj == -1) {
                  bvj = i;
                }
                else
                  if (parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[bvj][7])/parseFloat(OGPItems.jobs[bvj][6])) {
                    bvj = i;
                  }
            }
          }
          if (bvj > -1) {
            OGPItems.jobs[bvj][4]='Best Vegas L' + j + ' Job';
            if (ckstring != '') ckstring += '|';
            ckstring += j + ',' + bvj;
          }
        }
        if (ckstring != '')
          OGPCookie.createCookie('mwjobs_bv',ckstring,365);
        //Italy
        /*
        var ckstring = '';
        for (var j = 1; j <= 8; j++) {
          var bvi = -1;
          for (var i=0; i < OGPItems.jobs.length; i++)
          {
            if (OGPItems.jobs[i][0]==5 && OGPItems.jobs[i][1]==j && OGPItems.jobs[i][8]==0 && OGPItems.jobs[i][9]==0) {
              if (parseFloat(OGPItems.jobs[i][7]) > 0)  
                if (bvi == -1) {
                  bvi = i;
                }
                else
                  if (parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[bvi][7])/parseFloat(OGPItems.jobs[bvi][6])) {
                    bvi = i;
                  }
            }
          }
          if (bvi > -1) {
            OGPItems.jobs[bvi][4]='Best Italy L' + j + ' Job';
            if (ckstring != '') ckstring += '|';
            ckstring += j + ',' + bvi;
          }
        }
        if (ckstring != '')
          OGPCookie.createCookie('mwjobs_bi',ckstring,365);        
        */
        //Cuba
        /*
        var ckstring = '';
        for (var j = 1; j <= 6; j++) {
          var bvi = -1;
          for (var i=0; i < OGPItems.jobs.length; i++)
          {
            if (OGPItems.jobs[i][0]==1 && OGPItems.jobs[i][1]==j && OGPItems.jobs[i][8]==0 && OGPItems.jobs[i][9]==0) {
              if (parseFloat(OGPItems.jobs[i][7]) > 0)  
                if (bvi == -1) {
                  bvi = i;
                }
                else
                  if (parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[bvi][7])/parseFloat(OGPItems.jobs[bvi][6])) {
                    bvi = i;
                  }
            }
          }
          if (bvi > -1) {
            OGPItems.jobs[bvi][4]='Best Cuba L' + j + ' Job';
            if (ckstring != '') ckstring += '|';
            ckstring += j + ',' + bvi;
          }
        }
        if (ckstring != '')
          OGPCookie.createCookie('mwjobs_bc',ckstring,365);        
        */
        //Brazil
        var ckstring = '';
        for (var j = 1; j <= 12; j++) {
          var bvi = -1;
          for (var i=0; i < OGPItems.jobs.length; i++)
          {
            if (OGPItems.jobs[i][0]==6 && OGPItems.jobs[i][1]==j && OGPItems.jobs[i][8]==0 && OGPItems.jobs[i][9]==0) {
              if (parseFloat(OGPItems.jobs[i][7]) > 0)  
                if (bvi == -1) {
                  bvi = i;
                }
                else
                  if (parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[bvi][7])/parseFloat(OGPItems.jobs[bvi][6])) {
                    bvi = i;
                  }
            }
          }
          if (bvi > -1) {
            OGPItems.jobs[bvi][4]='Best Brazil L' + j + ' Job';
            if (ckstring != '') ckstring += '|';
            ckstring += j + ',' + bvi;
          }
        }
        if (ckstring != '')
          OGPCookie.createCookie('mwjobs_bb',ckstring,365);        
        //Chicago
        var ckstring = '';
        for (var j = 1; j <= 7; j++) {
          var bvi = -1;
          for (var i=0; i < OGPItems.jobs.length; i++)
          {
            if (OGPItems.jobs[i][0]==7 && OGPItems.jobs[i][1]==j && OGPItems.jobs[i][8]==0 && OGPItems.jobs[i][9]==0) {
              if (parseFloat(OGPItems.jobs[i][7]) > 0)  
                if (bvi == -1) {
                  bvi = i;
                }
                else
                  if (parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[bvi][7])/parseFloat(OGPItems.jobs[bvi][6])) {
                    bvi = i;
                  }
            }
          }
          if (bvi > -1) {
            OGPItems.jobs[bvi][4]='Best Chicago L' + j + ' Job';
            if (ckstring != '') ckstring += '|';
            ckstring += j + ',' + bvi;
          }
        }
        if (ckstring != '')
          OGPCookie.createCookie('mwjobs_bch',ckstring,365);        
        //London
        var ckstring = '';
        for (var j = 1; j <= 3; j++) {
          var bvi = -1;
          for (var i=0; i < OGPItems.jobs.length; i++)
          {
            if (OGPItems.jobs[i][0]==8 && OGPItems.jobs[i][1]==j && OGPItems.jobs[i][8]==0 && OGPItems.jobs[i][9]==0) {
              if (parseFloat(OGPItems.jobs[i][7]) > 0)  
                if (bvi == -1) {
                  bvi = i;
                }
                else
                  if (parseFloat(OGPItems.jobs[i][7])/parseFloat(OGPItems.jobs[i][6]) > parseFloat(OGPItems.jobs[bvi][7])/parseFloat(OGPItems.jobs[bvi][6])) {
                    bvi = i;
                  }
            }
          }
          if (bvi > -1) {
            OGPItems.jobs[bvi][4]='Best Longdon L' + j + ' Job';
            if (ckstring != '') ckstring += '|';
            ckstring += j + ',' + bvi;
          }
        }
        if (ckstring != '')
          OGPCookie.createCookie('mwjobs_blo',ckstring,365);        
          
        OGPDisplay.showPage(index,'inner_page');
        OGPDisplay.addLine('Saving job payouts',OGPConfig.clrAction);
        OGPItems.saveJobInfoToCookies();
        OGPDisplay.addLine('All Updated',OGPConfig.clrGood);
        break;

    }
  };
  
  this.showJobPayouts = function() {
    OGPDisplay.setHTML('divOGPResults','Loading...');
    var txt = '<table name="tblJobPayouts" id="tblJobPayouts">';
    for (var i=0; i < this.jobLevels.length; i++) {
      txt += '<tr><td name="title" id="title" colspan="9">' + OGPItems.cities[i][0] + '</td></tr>';
      txt += '<tr><th>Job Level</th><th>Job Title</th><th>Energy</th><th>Exp.</th><th>Ratio</th><th>Loot Item</th><th>HEL</th><th>Req. Money</th><th>Req. Consumable</th></tr>';
      for (var j = 1; j < this.jobLevels[i].length; j++) {
        if (this.jobLevels[i][j] != '') {
        for (var k=0; k < this.jobs.length; k++) {
          if (this.jobs[k][0]==(this.jobLevels[i][0]-1) && this.jobs[k][1]==j) {
            txt += '<tr><td name="data" id="data">' + this.jobLevels[i][j] + '</td>';
            txt +='<td name="data" id="data">' + this.jobs[k][3] + '</td>';
            txt +='<td name="data" id="data">' + this.jobs[k][6] + '</td>';
            txt +='<td name="data" id="data">' + this.jobs[k][7] + '</td>';
            if (this.jobs[k][7] != 0)
              txt +='<td name="data" id="data">' + parseInt((this.jobs[k][7]/this.jobs[k][6])*1000)/1000.0 + '</td>';
            else
              txt +='<td name="data" id="data">-</td>';
            txt +='<td name="data" id="data">' + this.jobs[k][4] + '</td>';
            txt +='<td name="data" id="data">' + (this.jobs[k][5]==true?'Yes':'&nbsp;') + '</td>';
            txt +='<td name="data" id="data">' + (this.jobs[k][8]==true?'Yes':'&nbsp;') + '</td>';
            txt +='<td name="data" id="data">' + (this.jobs[k][9]==true?'Yes':'&nbsp;') + '</td>';
            txt +='</tr>';
          }
        }
      }
      }
    }
    OGPDisplay.setHTML('divOGPResults',txt);
  };
  
  this.loadJobInfoFromCookies = function(addbest) {
    // Delete the dead city cookies
    OGPCookie.eraseCookie('mwjobs_1');
    OGPCookie.eraseCookie('mwjobs_bc');
    OGPCookie.eraseCookie('mwjobs_2');
    OGPCookie.eraseCookie('mwjobs_3');
    OGPCookie.eraseCookie('mwjobs_5');
    
    // Clear out the best jobs by reloading the list
    if (addbest == 1) 
    {
      OGPItems.jobsLoaded = 0;
      OGPItems.jobs.length = 0;
      OGPItems.loadJobs();
    }
    
    for (var i = 0; i < 20; i++) {
      if (OGPCookie.readCookie('mwjobs_' + i) != '' && OGPCookie.readCookie('mwjobs_' + i) != null) {
        var jobInfo = OGPCookie.readCookie('mwjobs_' + i);
        var z = -1;
        for (var j = 0; j < this.jobLevels.length; j++) {
          if (i == this.jobLevels[j][0]-1)
            z = j;
        }
        for (var j = 1; j < this.jobLevels[z].length; j++) {
          var arInfo = jobInfo.split('|');
          for (var k = 0; k < arInfo.length; k++) {
            var arJob = arInfo[k].split(',');
            for (var l = 0; l < this.jobs.length; l++) {
              if (this.jobs[l][0]==i && this.jobs[l][1]==j && this.jobs[l][2]==arJob[0]) {
                this.jobs[l][6] = arJob[1];
                this.jobs[l][7] = arJob[2];
              }
            }
          }
        }
      }
    }
    // Load the best jobs
    if (addbest == 1) {
    if (OGPCookie.readCookie('mwjobs_bv') != '' && OGPCookie.readCookie('mwjobs_bv') != null) {
      var bvjobs = OGPCookie.readCookie('mwjobs_bv');
      var arInfo = bvjobs.split('|');
      for (var i = 0; i < arInfo.length; i++) {
        var job = arInfo[i].split(',');
        if (this.jobs[job[1]][4] == '')
          this.jobs[job[1]][4] = 'Best Vegas L' + job[0] + ' Job';
        else
          this.jobs[job[1]][4] += '/BVJ L' + job[0];
      }
    }
    if (OGPCookie.readCookie('mwjobs_bc') != '' && OGPCookie.readCookie('mwjobs_bc') != null) {
      var bijobs = OGPCookie.readCookie('mwjobs_bc');
      var arInfo = bijobs.split('|');
      for (var i = 0; i < arInfo.length; i++) {
        if (arInfo[i]) {
          var job = arInfo[i].split(',');
          if (this.jobs[job[1]]) {
            if (this.jobs[job[1]][4] == '')
              this.jobs[job[1]][4] = 'Best Cuba L' + job[0] + ' Job';
            else
              this.jobs[job[1]][4] += '/BC L' + job[0];
          }
        }
      }
    }
    if (OGPCookie.readCookie('mwjobs_bi') != '' && OGPCookie.readCookie('mwjobs_bi') != null) {
      var bijobs = OGPCookie.readCookie('mwjobs_bi');
      var arInfo = bijobs.split('|');
      for (var i = 0; i < arInfo.length; i++) {
        if (arInfo[i]) {
          var job = arInfo[i].split(',');
          if (this.jobs[job[1]]) {
            if (this.jobs[job[1]][4] == '')
              this.jobs[job[1]][4] = 'Best Italy L' + job[0] + ' Job';
            else
              this.jobs[job[1]][4] += '/BI L' + job[0];
          }
        }
      }
    }
    if (OGPCookie.readCookie('mwjobs_bb') != '' && OGPCookie.readCookie('mwjobs_bb') != null) {
      var bijobs = OGPCookie.readCookie('mwjobs_bb');
      var arInfo = bijobs.split('|');
      for (var i = 0; i < arInfo.length; i++) {
        if (arInfo[i]) {
          var job = arInfo[i].split(',');
          if (this.jobs[job[1]]) {
            if (this.jobs[job[1]][4] == '')
              this.jobs[job[1]][4] = 'Best Brazil L' + job[0] + ' Job';
            else
              this.jobs[job[1]][4] += '/BB L' + job[0];
          }
        }
      }
    }
    if (OGPCookie.readCookie('mwjobs_bch') != '' && OGPCookie.readCookie('mwjobs_bch') != null) {
      var bijobs = OGPCookie.readCookie('mwjobs_bch');
      var arInfo = bijobs.split('|');
      for (var i = 0; i < arInfo.length; i++) {
        if (arInfo[i]) {
          var job = arInfo[i].split(',');
          if (this.jobs[job[1]]) {
            if (this.jobs[job[1]][4] == '')
              this.jobs[job[1]][4] = 'Best Chicago L' + job[0] + ' Job';
            else
              this.jobs[job[1]][4] += '/BCH L' + job[0];
          }
        }
      }
    }
    if (OGPCookie.readCookie('mwjobs_blo') != '' && OGPCookie.readCookie('mwjobs_blo') != null) {
      var bijobs = OGPCookie.readCookie('mwjobs_blo');
      var arInfo = bijobs.split('|');
      for (var i = 0; i < arInfo.length; i++) {
        if (arInfo[i]) {
          var job = arInfo[i].split(',');
          if (this.jobs[job[1]]) {
            if (this.jobs[job[1]][4] == '')
              this.jobs[job[1]][4] = 'Best London L' + job[0] + ' Job';
            else
              this.jobs[job[1]][4] += '/BLO L' + job[0];
          }
        }
      }
    }
    } // End addbest
  };
  
  this.saveJobInfoToCookies = function() {
    for (var i = 0; i < this.jobLevels.length; i++) {
      var str = '';
      for (var j = 1; j < this.jobLevels[i].length; j++) {
        for (var k = 0; k < this.jobs.length; k++) {
          if (this.jobs[k][0] == OGPItems.jobLevels[i][0]-1 && this.jobs[k][1] == j) {
            if (str != '') str += '|';
            str += this.jobs[k][2] + ',' + this.jobs[k][6] + ',' + this.jobs[k][7];
          }
        }
      }
      OGPCookie.createCookie('mwjobs_' + (OGPItems.jobLevels[i][0]-1),str,365);
    }
    // Hardcode Max Brazil ratios
    //OGPCookie.createCookie('mwjobs_6','1,54,62|2,54,62|3,81,92|4,81,123|5,54,62|6,81,123|7,108,123|8,135,153|9,135,184|10,135,215|11,189,276|13,189,276|14,189,276|15,216,368|16,189,368|17,216,368|18,243,398|19,243,429|20,243,459|21,270,490|22,243,490|23,297,551|24,297,551|25,324,551|26,351,551|27,378,612|28,351,582|29,378,612|30,405,674|31,405,704|32,432,704|33,459,765|34,459,735|35,486,827|36,486,796|37,486,827|38,513,888|39,486,888|40,540,949|41,540,1010|42,567,1010|43,567,1070|44,594,1130|45,621,1130|46,594,1100|47,621,1160|48,648,1220|49,648,1190|50,675,1220|51,702,1250|52,675,1250|53,702,1280|54,648,1250|55,675,1340|56,702,1370|57,729,1280|58,756,1460|59,756,1500|60,702,1400|61,621,1250|62,594,1220|63,675,1280|64,594,1190|65,648,1250|66,621,1220|67,675,1370|68,621,1220|69,675,1340|70,675,1400|71,729,1530|72,468,911|73,432,872|74,450,891|75,432,872|76,432,872|77,450,891|78,486,951|79,486,971|80,468,911|81,450,891|82,486,951|83,504,1010|84,243,432|85,234,423|86,225,414|87,216,423|88,234,423|89,243,423|90,225,405|91,243,450|92,252,459|93,252,450|94,261,477|95,270,522|101,486,1090|102,594,1320|103,594,1380|104,756,1670|105,756,1610|106,702,1550|107,864,1900|108,972,2180|109,756,1670',365);
    OGPCookie.createCookie('mwjobs_updated',new Date(),365);
    this.loadJobInfoFromCookies(0);
  };
  
  // Load Functions 

  // Name, Wrapper Tag, Job Controller, CityNum, Property Controller, Money Display
  this.loadCities = function() {
    if (this.citiesLoaded == true) return;
    this.cities[this.cities.length] = new Array('New York','mw_city1','job',1,'propertyV2','tab','$','new_york',0);
    //this.cities[this.cities.length] = new Array('Cuba','mw_city2','job',2,'propertyV2','tab','C$','cuba',1);
    //this.cities[this.cities.length] = new Array('Moscow','mw_city3','story',3,'propertyV2','story_tab','R$','moscow',2);
    //this.cities[this.cities.length] = new Array('Bangkok','mw_city4','story',4,'propertyV2','story_tab','B$','bangkok',3);
    this.cities[this.cities.length] = new Array('Las Vegas','mw_city5','story',5,'propertyV2','tab','V$','vegas_beta',4);
    //this.cities[this.cities.length] = new Array('Italy','mw_city6','story',6,'propertyV2','story_tab','L$','italy',5);
    this.cities[this.cities.length] = new Array('Brazil','mw_city7','job',7,'propertyV2','tab','BRL$','brazil',6);
    this.cities[this.cities.length] = new Array('Chicago','mw_city8','job',8,'propertyV2','tab','&#162;','chicago',7);
    this.cities[this.cities.length] = new Array('London','mw_city9','job',9,'propertyV2','tab','&#163;','london',8);
    this.citiesLoaded = true;
  };

  // City, Property ID, Property Name
  this.loadProperties = function() {
    if (this.cityPropertiesLoaded == true) return;
    this.cityProperties[this.cityProperties.length] = new Array(1,1,'New York Properties');
    //this.cityProperties[this.cityProperties.length] = new Array(2,1,'Cuba Properties');
    //this.cityProperties[this.cityProperties.length] = new Array(3,1,'Moscow Properties');
    //this.cityProperties[this.cityProperties.length] = new Array(4,1,'Bangkok Properties');
    this.cityProperties[this.cityProperties.length] = new Array(5,1,'My Casino');
    //this.cityProperties[this.cityProperties.length] = new Array(6,1,'My Village');
    this.cityProperties[this.cityProperties.length] = new Array(7,1,'Brazil Properties');
    this.cityProperties[this.cityProperties.length] = new Array(8,1,'Chicago Properties');
    this.cityProperties[this.cityProperties.length] = new Array(9,1,'London Properties');
    
    this.cityPropertiesLoaded = true;
  };
  
  this.loadRobProperties = function() {
    if (this.robPropertiesLoaded == true) return;
    this.robProperties[this.robProperties.length] = new Array(1,2,'Flophouse');
    this.robProperties[this.robProperties.length] = new Array(1,3,'Pawnshop');
    this.robProperties[this.robProperties.length] = new Array(1,4,'Tenement');
    this.robProperties[this.robProperties.length] = new Array(1,5,'Warehouse');
    this.robProperties[this.robProperties.length] = new Array(1,6,'Restaurant');
    this.robProperties[this.robProperties.length] = new Array(1,7,'Dockyard');
    this.robProperties[this.robProperties.length] = new Array(1,8,'Office Park');
    this.robProperties[this.robProperties.length] = new Array(1,9,'Uptown Hotel');
    this.robProperties[this.robProperties.length] = new Array(1,10,'Mega Casino');
    this.robProperties[this.robProperties.length] = new Array(1,11,'Chop Shop');
    this.robProperties[this.robProperties.length] = new Array(1,12,'Weapons Depot');
    this.robProperties[this.robProperties.length] = new Array(1,13,'Armory');
    this.robProperties[this.robProperties.length] = new Array(1,14,'Private Zoo');
    /*
    this.robProperties[this.robProperties.length] = new Array(2,1,'Tobacco Plantation');
    this.robProperties[this.robProperties.length] = new Array(2,2,'Sugar Plantation');
    this.robProperties[this.robProperties.length] = new Array(2,3,'Factory');
    this.robProperties[this.robProperties.length] = new Array(2,4,'Coca Field');
    this.robProperties[this.robProperties.length] = new Array(2,5,'Bodega');
    this.robProperties[this.robProperties.length] = new Array(2,6,'Bribery Ring');
    this.robProperties[this.robProperties.length] = new Array(3,1,'Unlicensed Taxi Stand');
    this.robProperties[this.robProperties.length] = new Array(3,2,'Cigarette Smuggling Ring');
    this.robProperties[this.robProperties.length] = new Array(3,3,'Black-Market Car Lot');
    this.robProperties[this.robProperties.length] = new Array(3,4,'Munitions Camp');
    this.robProperties[this.robProperties.length] = new Array(3,6,'Trafficking Operation');
    this.robProperties[this.robProperties.length] = new Array(4,1,'Fighting Fish Arena');
    this.robProperties[this.robProperties.length] = new Array(4,2,'Cockfighting Pen');
    this.robProperties[this.robProperties.length] = new Array(4,3,'Tourist Guide Scam');
    this.robProperties[this.robProperties.length] = new Array(4,4,'Gambling Den');
    this.robProperties[this.robProperties.length] = new Array(4,5,'Piracy Operation');
    this.robProperties[this.robProperties.length] = new Array(4,6,'Drug Smuggling Ring');
    this.robProperties[this.robProperties.length] = new Array(4,7,'Ammo Trading Camp');
    this.robProperties[this.robProperties.length] = new Array(4,8,'Yaa Baa Parlor');
    */
    this.robProperties[this.robProperties.length] = new Array(5,1,'Slots');
    this.robProperties[this.robProperties.length] = new Array(5,2,'Table Games');
    this.robProperties[this.robProperties.length] = new Array(5,3,'Restaurant');
    this.robProperties[this.robProperties.length] = new Array(5,4,'Poker Room');
    this.robProperties[this.robProperties.length] = new Array(5,5,'Hotel');
    this.robProperties[this.robProperties.length] = new Array(5,7,'Fountain');
    this.robProperties[this.robProperties.length] = new Array(6,1,'Villa');
    this.robProperties[this.robProperties.length] = new Array(6,2,'Winery');
    this.robProperties[this.robProperties.length] = new Array(6,3,'Fishery');
    this.robProperties[this.robProperties.length] = new Array(6,4,'Auto Boutique');
    this.robProperties[this.robProperties.length] = new Array(6,5,'Football Stadium');
    
    this.robProperties[this.robProperties.length] = new Array(7,1,'Headquarters');
    this.robProperties[this.robProperties.length] = new Array(7,4,'Refinery');
    this.robProperties[this.robProperties.length] = new Array(7,5,'Barracks');
    this.robPropertiesLoaded=true;    
  };
  
  // Null, Tab 1 Title, Tab 2 Title, ...
  this.loadJobLevels = function() {
    if (this.jobLevelsLoaded == true) return;
    this.jobLevels[this.jobLevels.length] = new Array(1,'Street Thug','Associate','Soldier','Enforcer','Hitman','Capo','Consigliere','Underboss','Boss');
    //this.jobLevels[this.jobLevels.length] = new Array(2,'El Soldado','El Capitan','El Jefe','El Patron','El Padrino','El Cacique');
    //this.jobLevels[this.jobLevels.length] = new Array(3,'Episode 1','Episode 2','Episode 3','Episode 4','Episode 5','Episode 6');
    //this.jobLevels[this.jobLevels.length] = new Array(4,'Episode 1 - Brawler','Episode 2 - Criminal','Episode 3 - Pirate','Episode 4 - Commandant','Episode 5a - Oyabun','Episode 5b - Dragon Head','Episode 6 - Saboteur','Episode 7 - Assassin');
    this.jobLevels[this.jobLevels.length] = new Array(5,'District 1 - North Las Vegas','District 2 - Paradise City','District 3 - The Lower Strip','District 4 - Shogun Casino','District 5 - Mojave Desert','District 6 - The Upper Strip','District 7 - Area 51','District 8 - Hoover Dam');
    //this.jobLevels[this.jobLevels.length] = new Array(6,'Region 1 - Roma','Region 2 - Palermo','Region 3 - Venezia','Region 4 - Milano','Region 5 - Napoli','Region 6 - Calabria','Region 7 - Citta Del Vaticano','Region 8 - The Eternal City');
    this.jobLevels[this.jobLevels.length] = new Array(7,'Rio de Janeiro:Centro','Belem','Manaus','Sao Paolo: Heliopolis','Recife','Rio De Janeiro: Rocinha','Rio De Janeiro: Copacobana','Sao Paolo: Taubate Prison','','','','Snake Island');
    this.jobLevels[this.jobLevels.length] = new Array(8,'Sam\'s Truck Stop','Main Street Speakeasy','The Old Warehouse','Ballot Box Distillery','Lakeside Docks','Crosstown Showdown','City of Traverse');
    this.jobLevels[this.jobLevels.length] = new Array(9,'Notes From The Undergound','East End Story','Dead In Red');

    /*
    this.jobLevels[0] = new Array(1,'Street Thug');
    this.jobLevels[1] = new Array(2,'El Soldado');
    this.jobLevels[2] = new Array(3,'Episode 1');
    this.jobLevels[3] = new Array(4,'Episode 1 - Brawler');
    this.jobLevels[4] = new Array(5,'District 1 - North Las Vegas');
    */

    this.jobLevelsLoaded = true;
  };

  // City, Job Level (Tab), Job ID, Title, Loot, HEL, Energy, Exp, Requires Money, Requires Loot
  this.loadJobs = function() {
    if (this.jobsLoaded) return;
    this.jobs[this.jobs.length] = new Array(0,1,1,'Chase Away Thugs','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,1,2,'Rob A Drug Runner','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,1,3,'Rough Up Dealers','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,1,4,'Rob The Warehouse','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,1,5,'Collect Protection Money','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,1,8,'Grow Your Family','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,1,37,'Perform A Hit','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,2,6,'Mugging','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,2,7,'Auto Theft','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,2,9,'Take Out A Rogue Cop','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,2,10,'Collect On A Loan','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,2,11,'Bank Heist','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,2,12,'Jewelry Store Job','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,2,38,'Hijack A Semi','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,3,13,'Destroy Enemy Mob Hideout','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,3,14,'Kill A Protected Snitch','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,3,15,'Bust A Made Man Out Of Prison','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,3,16,'Museum Break-in','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,3,17,'Fight A Haitian Gang','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,3,39,'Clip The Irish Mobs Local Enforcer','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,3,40,'Steal A Tanker Truck','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,4,18,'Federal Reserve Raid','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,4,19,'Smuggle Across The Border','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,4,22,'Liquor Smuggling','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,4,26,'Run Illegal Poker Game','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,4,28,'Wiretap The Cops','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,4,41,'Rob An Electronics Store','UCP/Camera/Computer',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,4,42,'Burn Down A Tenament','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,4,23,'Distill Some Liquor','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,4,24,'Manufacture Tokens','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,4,25,'Get Cheating Deck','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,4,27,'Overtake Phone Central','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,5,29,'Repel The Yakuza','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,5,30,'Disrupt Rival Smuggling Ring','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,5,31,'Invade Tong-controlled Neighborhood','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,5,32,'Sell Guns To The Russian Mob','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,5,33,'Protect Your City Against A Rival Family','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,5,34,'Assassinate A Political Figure','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,5,35,'Exterminate A Rival Family','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,5,43,'Obtain Comprimising Photos','Blackmail Photos',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,5,44,'Frame A Rival Capo','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,6,45,'Steal An Air Freight Delivery','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,6,46,'Run A Biker Gang Out Of Town','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,6,47,'Flip A Snitch','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,6,48,'Steal Bank Records','Transaction Records',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,6,49,'Loot The Police Impound Lot','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,6,50,'Recruit A Rival Crew Member','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,6,51,'Dodge An FBI Tail','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,6,52,'Whack A Rival Crew Leader','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,7,53,'Influence A Harbor Official','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,7,54,'Move Stolen Merchandise','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,7,55,'Snuff A Rat','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,7,56,'Help A Fugitive Flee The Country','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,7,57,'Dispose Of A Body','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,7,58,'Ransom A Businessmans Kids','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,7,59,'Fix The Big Game','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,7,60,'Steal An Arms Shipment','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,8,61,'Extort A Corrupt Judge','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,8,62,'Embezzle Funds Through A Phony Company','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,8,63,'Break Into The Armory','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,8,64,'Rip Off The Armenian Mob','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,8,65,'Muscle In On A Triad Operation','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,8,66,'Ambush A Rival At A Sit Down','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,8,67,'Order A Hit On A Public Official','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,8,68,'Take Over An Identity Theft Ring','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,9,69,'Settle A Beef...Permanently','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,9,70,'Buy Off A Federal Agent','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,9,71,'Make A Deal With The Mexican Cartel','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,9,72,'Blackmail The District Attorney','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,9,73,'Shake Down A City Council Member','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(0,9,74,'Make Arrangements For A Visiting Don','Big NY Money',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,9,75,'Take Control Of A Casino','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(0,9,76,'Travel To The Old Country','',false,0,0,0,0);
/*
    this.jobs[this.jobs.length] = new Array(1,1,1,'Rob Your Cab Driver','Cuba Loot 10/18',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,1,2,'Secure A Safehouse','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,1,3,'Intimidate The Locals','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,1,4,'Silence A Noisy Neighbor','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,1,5,'Smuggle In Some Supplies','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,1,6,'Set Up A Numbers Racket','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,1,7,'Establish Contract With The FRG','Cuban Mercenary L1',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,1,8,'Take Out The Local Police Chief','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,1,41,'Persuade A Local To Talk','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,1,42,'Assault A Snitchs Hideout','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,2,9,'Transport A Shipment Of US Arms','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,2,10,'Meet With The FRG Leadership','Cuban Mercenary L2',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,2,11,'Hold Up A Tour Bus','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,2,12,'Ambush A Military Patrol','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,2,13,'Capture An Army Outpost','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,2,14,'Sneak A Friend Of The Family Into The Country','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,2,15,'Ransack A Local Plantation','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,2,16,'Burn Down A Hacienda','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,3,17,'Offer Protection To A Nightclub','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,3,18,'Rob The Banco Nacional Branch','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,3,19,'Shake Down A Hotel Owner','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,3,20,'Bring The Local Teamsters Under Your Control','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(1,3,21,'Help The FRG Steal A Truckload Of Weapons','Cuban Mercenary L3',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,3,22,'Hijack A Booze Shipment','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,3,23,'Pillage A Shipyard','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,3,24,'Take Over The Docks','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,4,25,'Muscle In On A Local Casino','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,4,26,'Establish A LoanSharking Business','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(1,4,27,'Eliminate A Rival Familys Agent','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,4,28,'Pass On Some Intel To The FRG','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,4,29,'Execute A Regional Arms Dealer','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,4,30,'Sink A Competing Smugglers Ship','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,4,31,'Gun Down An Enemy Crew At The Airport','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,4,32,'Assassinate An Opposing Consigliere','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,5,33,'Raid The Arms Depot','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,5,34,'Supply The FRG With Some Extra Muscle','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,5,35,'Capture The Airport','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,5,36,'Knock Off A Visiting Head Of State','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,5,37,'Set Up A High Volume Smuggling Operation','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(1,5,38,'Blow Up A Rail Line','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,5,39,'Attack The Army Command Post','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,5,40,'Storm The Presidential Palace','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,6,43,'Arrange A New York Drug Shipment','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,6,44,'Launder Money Through A Resort','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,6,45,'Loot The National Museum','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,6,46,'Send Some Help Home To New York','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(1,6,47,'Take Over The Havana Reconstruction','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,6,48,'Help Get An Associate A No Bid Contract','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(1,6,49,'Trans-ship A Container Full Of Refugees','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(1,6,50,'Meet With The Russian','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(2,1,3,'Fight Off An Ultra-National Gang','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,1,2,'Arrange A Drug Shipment for the Mafiya','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,1,1,'Smuggle Consumer Electronics for the Vory','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,1,6,'Receive Vory Intel On Dmitri','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,1,5,'Collect The Ransom','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,1,4,'Kidnap A Local Gang Leader for the Vory','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,1,11,'Hijack An Arms Shipment From A Militant Gang','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,1,10,'Threaten A Gang\'s Supplier','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,1,12,'Hospitalize Some Nationalists','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(2,2,14,'Bribe An Election Official','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,2,15,'Silence A Political Critic','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,2,16,'Violently Break Up A Campaign Rally','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,2,20,'Abduct A Candidate\'s Wife For the Mafiya','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,2,21,'"Convince" The Candidate To Withdraw','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,2,22,'Kill An Investigative Reporter','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,2,23,'Pay Off The Port Authority In Arkhangelsk','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,2,24,'Re-route An Equipment Shipment','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,2,25,'Circulate Damaging Photos','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(2,3,33,'Rob The RossijaBanc Central Repository','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,3,32,'Map Out The Escape Route','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,3,31,'Case The RossijaBanc Building','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,3,39,'Strip A Uniform Off The Corpse','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,3,38,'Steal The Bank President\'s Car Keys','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,3,37,'Execute A Bank Guard During Your Escape','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,3,41,'Dispose Of A RossijaBanc Exec At Sea','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,3,40,'Blackmail A Secretary For An Exec\'s Itinerary','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,3,42,'Replace A Guard With Your Own Man','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(2,4,46,'Ransack A Defense Contractor\'s Office','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,4,45,'Support The Habit Of A Procurement Officer','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,4,44,'Manage An Escort Service Catering to Soldiers','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,4,49,'Intercept The Base\'s Pay Shipment','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,4,48,'Rob A Troop Convoy','Shturmovik',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,4,47,'Fly To The Siberian Military District','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,4,54,'Transport Some Stolen Military Hardware','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,4,53,'Make Connections With An Arms Dealer','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,4,55,'Buy Off The General\'s Command Team','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(2,5,72,'Start An Avalanche Above The Terrorist Camp','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(2,5,70,'Torture a ULF Leiutenant','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,5,71,'Look For The Boss\'s Mountain Hideout','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,5,64,'Infiltrate The ULF Cell','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,5,65,'Help Plan The Next Attack','Ubijca Assault Rifle',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,5,66,'Sabotage The Plan From The Inside','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,5,67,'Discover The Location Of The Next ULF Attack','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,5,68,'Kill A Lookout','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,5,69,'Stop The ULF Attack','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,5,61,'Stop A Terrorist Attack In Moscow','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,5,62,'Discover Who Was Responsible','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,5,63,'Hunt Down A Ural Liberation Front Contact','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,85,'Assault The Mansion Walls','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(2,6,83,'Take Over A West-Bound Trafficking Pipeline','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,84,'Ship Black-Market Caviar To London','Zoloto Sports Car',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,77,'Attack A Mafiya Business','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,78,'Hijack A Mafiya Cargo','Konstantin Cargo Carrier',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,79,'Threaten A Mafiya Moneyman\'s Family','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,80,'Burn Down A Vory Safehouse','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,81,'Hit A Vory Nightclub','Zmeya Carbon Blade',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,82,'Break Into An Architect\'s Office','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,74,'Foil The Sabotage Of Your Moscow Holdings','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,75,'Acquire Classified Files On Crime Syndicates','Executive Overcoat',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(2,6,76,'Gun Down Some Russian Muscle','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,1,'Move Stolen Art Through Suvarnabhumi Airport','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,2,'Show A Cocky Biker Who\'s In Charge','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,3,'Take On Local Motorcycle Thugs','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,5,'(Yakuza) Meet A Gang\'s Rep In A Go-Go Bar','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,1,8,'(Triad) Meet A Gang\'s Rep In A Go-Go Bar','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,1,6,'Arrange An Accident For A Witness','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,7,'Take On Local Motorcycle Thugs','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,9,'Raid One Of Suchart\'s Gambling Dens','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,10,'Trash The Low-Rent Casino','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,11,'(Yakuza) Intercept An Ammo Shipment','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,14,'(Triad) Intercept An Ammo Shipment','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,12,'Deliver It To A Japanese Front Company','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,13,'Pay Off A Corrupt Police Officer','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,15,'Sneak It On To A Chinese Cargo Ship','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,16,'Bribe A Dock Guard','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(3,1,17,'Blow Up Suchart\'s Warehouse','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,1,18,'Take Down Boss Suchart','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,20,'Force A Local Landowner To Sell','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,21,'Receive A Kickback From The Buyer','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,22,'Attack A Paramilitary Police Post','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,24,'(Yakuza) Set Up A Phony Business','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,27,'(Triad) Set Up A Phony Business','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,25,'Re-Route A Van Full Of Medical Supplies','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,26,'Resell The Stolen Supplies','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,28,'Set Up A Bogus Chess Tournament','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,29,'Rob The Chess Masters','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,30,'(Yakuza) Pay Off The Guards At Bangkwang Prison','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(3,2,33,'(Triad) Pay Off The Guards At Bangkwang Prison','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(3,2,31,'Sneak A Yakuza Enforcer In','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,32,'Help Stage An Accident For A Tong Inmate Triad','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,34,'Break A Triad Hitman Out','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,35,'Help Rub Out A Bosozoku Leader','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,36,'Expose A Crooked Royal Thai Police Officer','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,2,37,'Discredit Police Commissioner Chatri','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,39,'Secure A Pirate Vessel','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,40,'Hire An Unsavory Crew','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,41,'Take Down A Rival Pirate Outfit','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,43,'Hijack A Boat Load Of Electronics (Yakuza)','Satellite Phone',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,46,'Hijack A Boat Load Of Electronics (Triad)','Satellite Phone',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,44,'Truck The Cargo To Kuala Lumpur','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,45,'Smuggle Cigarettes Back Into Thailand','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,47,'Ship The Cargo To Jakarta','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,48,'Return With A Shipment Of Weapons','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,49,'Steal Shipping Manifests (Yakuza)','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,52,'Steal Shipping Manifests (Triad)','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,50,'Sink A Chinese Metals Freighter','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,3,51,'Hire Divers To Retrieve The Gold Bars','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,53,'Steal Japanese Auto Shipping Containers','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,54,'Offload The Cars Onto A Waiting Barge','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,55,'Sink A Fleet Vessel','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,3,56,'Send Captain Mok Overboard','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,4,58,'Buy Some Chemicals On The Black Market','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,4,59,'Make Contact WIth The United Wa State Army','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,4,60,'Ambush A Burmese Army Convoy','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,4,62,'Establish Contact With A CIA Agent (Yakuza)','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,4,65,'Establish Contact With A CIA Agent (Triad)','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,4,66,'Set Up The Import Of Illegal Chinese Arms','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,4,67,'Ship The Yaa Baa Payment To Phuket','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,4,63,'Set Up An Opium Shipment','Forest Scorpion',true,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,4,64,'Arrange To Process It In Bangkok','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,4,69,'Pass On Information To The Thai Police','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,4,70,'Steal A Seized Drug Shipment','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,4,71,'Betray Commander Change And The UWSA','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,4,72,'Eliminate An Insurgent Escort','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,4,73,'Make Off With Stolen Miltary Hardware','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,4,74,'Attack Chang\'s Heroin-Processing Facility','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,4,75,'Kill Commander Chang','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,77,'Ship Burmese Sapphires Into Thailand','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,78,'Smuggle The Sapphires Into Tokyo','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,5,79,'Fight Off A Minato-Kai Sponsored Hit','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,81,'Meet With Boss Matsumura\'s Advisor (Yakuza)','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,84,'Meet With Boss Matsumura\'s Advisor (Triad)','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,82,'Help Broker A Minato-Matsumura Peace','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,83,'Take A Piece of the Kabukicho Action','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,85,'Assassinate the Minato-Kai Family Head','Kage Jet',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,86,'Frame An Enemy For the Murder','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,5,87,'Talk with a Police Insider About Matsumura (Yakuza)','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(3,5,90,'Talk with a Police Insider About Matsumura (Triad)','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(3,5,88,'Gather More Evidence Of A Betrayal','Tanto',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,89,'Get The Support Of The Yakuza Families','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,91,'Spread Distrust Among The Yakuza Families','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,92,'Start A War Between Matsumura And Minato','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,5,93,'Remove Matsumura\'s Loyal Lieutenants','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,5,94,'Execute Oyabum Matsumura','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,96,'Set Up A Drug Shipment To China','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,6,97,'Dodge Customs At The POrt of Hong Kong','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(3,6,98,'Win A Shoot-Out With The Kowloon Police','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,100,'Intimidate Wealthy Expatriates (Yakuza)','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,103,'Intimidate Wealthy Expatriates (Triad)','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,101,'Make a Example of a Wealthy Industrialist','Lloyds Spectre',true,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,6,102,'Fence the Goods Stolen From the Mansion','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,104,'Extort the Head of the Hong Kong Polo Club','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,105,'Fix the Hong Kong Polo Invitational','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,106,'Talk With Wei\'s Disloyal Followers (Yakuza)','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,6,109,'Talk With Wei\'s Disloyal Followers (Triad)','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,6,107,'Sneak an Industrial Spy into Hong Kong','Cleaver',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,108,'Break In To Cheng-We Ballistics','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,110,'Kidnap One of Wei\'s Trusted Advisors','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,111,'Bury the Body Under A Construction Site','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,112,'Attack Wei\'s Gambling Halls','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,6,113,'Dispose of Mountain Master Wei','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,115,'Shore Up Control Of Your New Territory','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,7,116,'Spread The Wealth To Your New Lieutenants','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(3,7,117,'Eliminate The Last Traces Of Resistance','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,119,'Get A Gang Member Back Into Thailand (Yakuza)','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,122,'Get A Gang Member Back Into Thailand (Triad)','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,120,'Break Into A Government Research Facility','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,121,'Steal An Experimental Armor Prototype','Titanium Mesh Jacket',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,123,'Kidnap A Trade Consortium Leader','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,124,'Extort The Consortium\'s Remaining Officers','Raed Armored Sedan',true,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(3,7,125,'Undermine Nongchai\'s Support (Yakuza)','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,128,'Undermine Nongchai\'s Support (Triad)','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,129,'Bribe A Royal Thai Army Colonel','Nak Kha Shotgun',true,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(3,7,130,'Route A Drug Shipment Through An Army Post','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,126,'Acquire Information On A Government Supporter','Ninja',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,127,'Assassinate A Bangkok Council Member','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,131,'Infiltrate The Parliament House','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,7,132,'Depose Prime Minister Nongchai','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,8,134,'Consolidate Political Power In Bangkok','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,8,135,'Take Over The Royal Bank Of Thailand','Royal Thai Marine',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,8,136,'Foil An Attempt On Your Life','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,8,138,'Question The Surviving Assassin','Titanium Katar',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,8,139,'Gather Information On The Shadow King','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,8,140,'Eliminate A Spy For The Shadow King','Lamang Motorcycle',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,8,141,'Hire A Guide To Find The Temple of Shadows','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(3,8,142,'Fight Off A Hill Tribe Loyal To The Shadow King','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,8,143,'Silence A Shadow Kingdom Patrol','Chain Viper',true,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,8,144,'Battle Your Way Through The Temple','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(3,8,145,'Overthrow The Shadow King','',false,0,0,0,0);
    */
    this.jobs[this.jobs.length] = new Array(4,1,1,'Move Your Crew Into A Safehouse','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,1,2,'Blackmail A Car Dealer','Car Key Copy',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,1,3,'Steal A Truckload Of Slots','Slot Machine',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,1,4,'Secure Some Wheels','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(4,1,6,'Break Into A Gun Shop','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,1,7,'Scout Out Alphabet City','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,1,8,'Open Fire On Victor\'s Crew','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,2,10,'Help A Bookie Out Of A Jam','Hot Tip',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,2,13,'Fix A Boxing Match','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,2,14,'Clean Up At A Rigged Table','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(4,2,15,'Recruit A Table Game Dealer','Casino Dealer',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,2,16,'Strong-arm A Limo Company','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,2,17,'Shut Down An Uncooperative Club','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,2,18,'Hit Up A Nightclub','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,3,21,'Buy Some Black-Market Info','Alarm Code',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,3,22,'Steal An SUV','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,3,24,'Do Some Late Night Shopping','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(4,3,25,'Rob A Gem Broker','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,3,26,'Convince A Restaurateur To Leave Town','Chef',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,3,27,'Arrange A Hardware Delivery','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,3,28,'Break Into A Luxury Suite','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,4,30,'Bribe A Casino Pit Boss','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(4,4,31,'Steal A Valet\'s Uniform','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,4,32,'Swipe A Security Keycard','Hotel Security Key Card',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,4,34,'Create A Distraction On The Floor','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,4,35,'Hack The Casino Security System','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(4,4,36,'Break Into The Vault','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,4,37,'Get To An Exit','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,4,38,'Hijack A Poker Table Delivery','Poker Table',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,5,40,'Move The Take Out Of Town','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,5,42,'Run A Highway Patrol Blockade','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,5,43,'Buy Off A Crooked Border Agent','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(4,5,44,'Stash The Take','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,5,45,'Arrange A Cartel Sale','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,5,47,'Create A Diversion','Unwanted Evidence',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,5,48,'Dispose Of The Evidence','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(4,5,50,'Rescue A Hotelier','Bellhop',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,6,52,'Get A Council Member On Board','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(4,6,53,'Buy Off A Precint Captain','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(4,6,55,'Convince A Judge To Step Down','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,6,57,'Remove The Hill\'s Support Base','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,6,58,'Reveal A Politician\'s Dirty Secret','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,6,59,'Infiltrate The Hill Resort','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,7,61,'Breach the Area 51 Perimeter','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(4,7,63,'Disable a Surveillance Statio','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,7,64,'Infiltrate A Top Secret Bunker','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(4,7,66,'Find A Route Through The Duct','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,7,68,'Nab A High Tech Prototype','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,7,69,'Hack The Research Lab Door','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(4,8,71,'Uncover Rumors About Governor Halloran','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(4,8,73,'Dig Up Links To Halloran And A Meth Ring','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(4,8,74,'Discover A Big Meth Buy At The Hoover Dam','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(4,8,75,'Get Your Spotters In Place Above The Dam','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(4,8,77,'Verify Halloran\'s Arrival At The Dam','',false,0,0,0,0);
    /*
    this.jobs[this.jobs.length] = new Array(5,1,1,'Connect With La Familia','Volcanic Bricks',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,1,2,'Recruit Some Local Muscle','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,1,3,'Set Up The Italian Operation','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,1,5,'Intercept A Handoff In The Coliseum','Severed Pinky',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,1,7,'Discover The Conspiracy','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,1,9,'Send A Message To The Di Rossa Family','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,2,11,'Find An Old Family Friend','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,2,12,'Build The Winery','Wine Barrel',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,2,14,'Sabotage A Rival','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,2,15,'Survive Adriano\'s Betrayal','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,2,17,'Hide Your Family','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,2,18,'Flee To Safety','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,2,19,'Swear An Oath Of Vengeance','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,2,20,'Track Down Don Adriano','Rail Ticket',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,3,22,'Bug The Don\'s Train Car','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,3,23,'Collect Info From A Gondolier','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,3,24,'Smuggle Goods Through A Fishery','Fishing Net',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,3,26,'Counterfeit Tickets For The Masque Ball','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,3,27,'Recruit Gang Of Street Rats','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,3,29,'Buy Out A Costume Shop','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,3,30,'Lift A Performer\'s Outfit','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,3,32,'Distract The Don\'s Guards','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,3,33,'Lure The Don To A Secluded Location','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,4,35,'Free A Professional Assassin','Smart Phone',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,4,36,'Bug A Confessional','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,4,37,'Infiltrate A Seven Star Hotel','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,4,38,'Blackmail A Track Official','Cooked Book',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,4,40,'Rob A Collector','Motor Oil',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,4,41,'Pressure The Bookies','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,4,43,'Rig The Big Race','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,5,45,'Snag A Lucrative Disposal Contract','Hidden Charges',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,5,47,'\'Lose\' A Waste Cargo At Sea','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,5,48,'Show A Business Owner Who\'s In Charge','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,5,50,'Link The Camorra To The Police','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,5,51,'Break Out An Incarcerated Lieutenant','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,5,53,'Blow Up A Police Station','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,5,54,'Trash A Rival Camorra Stadium','Football Player',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,6,56,'Deal With The Dock Union','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(5,6,57,'Replace The Dock Workers','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,6,58,'Smuggle Out The Contraband','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,6,62,'Rig The Vote For The Local Governor','',false,0,0,1,1);
    this.jobs[this.jobs.length] = new Array(5,6,63,'Expose The corruption Of The Messino Family','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,6,64,'Set Up Your Nightclub','DJ',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,7,68,'Scale The Vatican Wall','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,7,71,'Disable The Surveillance System','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,7,73,'Infiltrate The Basilica','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,7,75,'Locate The Secret Archive Vault','',false,0,0,1,1);
    this.jobs[this.jobs.length] = new Array(5,7,69,'Procure A Roman Sewer Map','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,7,72,'Find An Entrance In The Catacombs','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,7,67,'Blow A Hole In The Vatican Wall','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,8,78,'Set A Trap For Di Rossi\'s Top Capo','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,8,80,'Meet A Traitor','',false,0,0,1,1);
    this.jobs[this.jobs.length] = new Array(5,8,81,'Gain Access To Private Villa','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(5,8,83,'Tip Off The Rome Police','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(5,8,84,'Smuggle In Explosives','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,8,85,'Demolish Di Rossi\'s Villa','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(5,8,77,'Infiltrate Rafaele Di Rossi\'s Spy Network','',false,0,0,0,1);
    */
    this.jobs[this.jobs.length] = new Array(6,1,1,'Scope Out The Financial District','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,1,2,'Set Up Your Own Operation In A Renovated Skyscraper','Gas Can',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,1,3,'Ask An Informant About Local Crime Activity','Local Informant',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,1,4,'Steal Artwork From The Paco Imperial','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,1,5,'Bribe A Corporate Executive','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,1,6,'Ambush A Group Of Neo-Imperium','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,1,7,'Destroy A Bondinho Tram','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,1,8,'Blackmail A Cathedral Representative','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,1,9,'Run A Collection Plate Co','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,1,10,'Track Down Lieutenant Sandoval','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,1,11,'Assassinate A Politician At A Museum Gala','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,13,'Meet a Contact at Mosqueiro','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,14,'Impersonate a Wealthy Entrepreneur','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,15,'Dispose of a Police Chief','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,16,'Intimidate the Local Crime Ring','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,17,'Track Down Neo-Imperium Members','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,18,'Smuggle a Shipment Through Aeroporto de Belem','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,19,'Steal the Plans','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,20,'Burn Down a Jungle Hideout','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,2,21,'Establish a Spy Ring of Belem Fishermen','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,22,'Gun Down Kidnappers','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,23,'Capture a Neo-Imperium Captain','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,2,24,'Bribe a City Official','Button Camera',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,3,25,'Blackmail a City Official','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,3,26,'Gather Intel from Street Rats','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,3,27,'Assassinate a Neo-Imperium Spokesman','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,3,28,'Bribe a Police Commandant','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,3,29,'Pilfer from a Rebel Supply House','Radio Phone',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,3,30,'Locate a Rebel Outpost','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,3,31,'Intercept a Rebel Convoy','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,3,32,'Take Out a Rebel Lookout','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,3,33,'Create a Diversion in the Jungle','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,3,34,'Blow Up a Munitions Dump','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,3,35,'Open Fire on Rebel Fighters','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,3,36,'Rescue a Hostage','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,4,37,'Move to a Sao Paolo Safe House','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,4,38,'Transport a Drug Shipment','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,4,39,'Push Over a Gun Runner','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,4,40,'Pass Along a Bribe','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,4,41,'Contact a Comando do Candiru Agent','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,4,42,'Scout Out the City','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,4,43,'Rob a Jewelry Store','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,4,44,'Burn Down a Slum Building','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,4,45,'Escape a Police Pursuit','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,4,46,'Demolish a Rooftop Helipad','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,4,47,'Wipe Out a Favela Street Gang','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,4,48,'Interrogate a Neo-Imperium Supporter','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,5,49,'Smuggle Weapons Down the River to a Recife Port','Satchel Charge',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,5,50,'Negotiate a Sit-Down with the Comando do Candiru','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,5,51,'Auction Off a Rival\'s Private Island','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,5,52,'Detonate an Ethanol Shipment','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,5,53,'Create a Shark Scare','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,5,54,'Steal Confidential Medical Records','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,5,55,'Blackmail a University Instructor','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,5,56,'Raid a Biochemist\'s Lab','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,5,57,'Sink a Cargo Ship in Port','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,5,58,'Take Over a Shipyard','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,5,59,'Give Chase to the Neo-Imperium','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,6,60,'Shake Down Some Locals For Information','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,6,61,'Discover Connections To Local Gangs','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,6,62,'Bribe A News Network Executive','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,6,63,'Make An Announcement on a Local TV Network','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,6,64,'Convince The Locals Of Your Good Intentions','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,6,65,'Hunt Down The Revolucao Vermelho\'s Affiliates','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,6,66,'Bust Up A Local Drug Ring','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,6,67,'Delay A Police Patrol','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,6,68,'Hijack A Fuel Truck','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,6,69,'Offer Protection To A Franchise Business','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,6,70,'Execute a Slum Gang Leader','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,6,71,'Make a Direct Assault on the RV Base','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,7,72,'Mobilize Your Operation','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,7,73,'Generate Revenue for Your Cause','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,7,74,'Find Proof of Police Corruption','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,7,75,'Rendezvous with Comando do Candiru Agents','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,7,76,'Bribe a Carnival Director','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,7,77,'Take Advantage of a Distracted Crowd','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,7,78,'Blend in with a Group of Float Performers','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,7,79,'Assasinate the Guest of Honor','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,7,80,'Cut the RV\'s Purse Strings','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,7,81,'Tail a Group of RV to Their Base','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,7,82,'Remove the Police Protection','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,7,83,'Demolish the RV stronghold','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,8,84,'Prepare an Ambush for a Neo-Imperium Sect','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,8,85,'Interrogate Comando de Candiru Agents','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,8,86,'Acquire Funds for Taubate Operations','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,8,87,'Bribe a Taubate Prison Worker','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,8,88,'Infiltrate Taubate Prison','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,8,89,'Arrange for Prisoner Transfers','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,8,90,'Disable Police Emergency Response','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,8,91,'Cause Civilian Panic','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,8,92,'Scout For Potential','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,8,93,'Break Mafia Members Out of Taubate','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,8,94,'Destroy the Neo-Imperium\'s Cover Operations','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,8,95,'Assassinate the Neo-Imperium\'s Primary Heads','',false,0,0,0,0);
    /*
    this.jobs[this.jobs.length] = new Array(6,9,101,'Discover The Smuggler\'s Haven','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,9,102,'Infiltrate a Rival\'s Dealings','Life Saver',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,9,103,'Help Defend The Haven From Police','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,9,104,'Recover Lost Cargo','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,9,105,'Establish New River Routes','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,9,106,'Intimidate A Local Thug','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,9,107,'Gain Respect From A Gang Ringleader','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,9,108,'Capture A Secret Shipment','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,9,109,'Bribe Officials To Ignore The Haven','',false,0,0,1,0);
    */
    this.jobs[this.jobs.length] = new Array(6,10,201,'Intimidate A Junior Researcher','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,10,202,'Steal A Historic Explorer\'s Notes','Jungle Map',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,10,203,'Bribe A Jungle Conservationist','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,10,204,'Ambush An Unwitting Expedition','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,10,205,'Locate The Golden City','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,10,206,'Make A Path To The Temple','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,10,207,'Avoid Ancient Traps','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,10,208,'Discover A Mythic Treasure','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,10,209,'Smuggle A Relic Overseas','',false,0,0,0,0);
    
    this.jobs[this.jobs.length] = new Array(6,11,301,'Research Leticia\'s Casa Grande','Casa Grande Reservation',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,11,302,'Take The River To The Colombian Border','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,11,303,'Bribe The Brazilian Border Guards','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,11,304,'Bribe The Colombian Border Guards','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,11,305,'Infiltrate A Political Rally','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,11,306,'Create A Distraction','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,11,307,'Rush The Casa Grande','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,11,308,'Locate The Hidden Stash','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,11,309,'Make A Run To The Border','',false,0,0,0,0);

    this.jobs[this.jobs.length] = new Array(6,12,501,'Discover A Series Of Disappearances','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,12,502,'Track Down Corpses','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,12,503,'Contact A Snake Expert','Antivenom',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,12,504,'Book Passage To Snake Island','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(6,12,505,'Navigate The Snake Infested Jungle','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,12,506,'Infiltrate A Research Laboratory','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,12,507,'Uncover A Slew Of Interesting Experiments','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(6,12,508,'Fight Off The Lab\'s Guard','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(6,12,509,'Escape The Island With Some Specimines','',false,0,0,0,1);
    
    this.jobs[this.jobs.length] = new Array(7,1,1,'Meet With the South Gang Family','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,1,2,'Drive North of the Border','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,1,3,'Set Up a Rum Running Operation','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,1,4,'Smuggle a Shipment Back to Chicago','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,1,5,'Break into Guido\'s Pantucci Warehouse','Body Bag',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,1,6,'Dodge the Guards','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,1,7,'Get Rid of Pantucci','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,1,8,'Dispose of the Bodies','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,2,9,'Run an illegal Establishment','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,2,10,'Secure Hooch to Sell in Your Joint','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,2,11,'Recruit Loyal Gunmen','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(7,2,12,'Case Warehouses on the North Side','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,2,13,'Expose a Treachery in Your Family','Incriminating Documents',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,2,14,'Cripple the Colosimo Clan\'s Assets','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,2,15,'Ambush the Don\'s Limo','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,2,16,'Get the Respect You Deserve','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,3,17,'Move Smuggled Liquor','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,3,18,'Collect Income From Your Establishments','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,3,19,'Stuff Local Cop\'s Pockets With Greens','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(7,3,20,'Organize a Private Party','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,3,21,'Evade an Ambush','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,3,22,'Uncover a Plot Against You','Concrete Shoes',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,3,23,'Order a Hit on Disloyal Associates','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,3,24,'Put Brother Franky in Concrete Shoes','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,4,25,'Set Up a Distillery in Cicero','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(7,4,26,'Meet With a Mayoral Candidate','Confidential Records',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,4,27,'Threaten Voters at Polling Stations','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,4,28,'Get Puppet Mayor Elected','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,4,29,'Escape a Federal Agents Raid on Your Distillery','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,4,30,'Find Out About Mayor\'s Dealings With the Bureau','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,4,31,'Blackmail a Prohibition Bureau Top Agent','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(7,4,32,'Frame Mayor in a Political Scandal','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,5,33,'Travel South to the Caribbean','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,5,34,'Set Up a Rum Running Base of Operation','Beer Barrel',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,5,35,'Monitor Coast Guard Patrols','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,5,36,'Hijack a Rival Ship','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,5,37,'Eliminate the Competition','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,5,38,'Comb the Beach for Scraps','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,5,39,'Ferry Customers Across the Rum Line','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,5,40,'Host Happy Hours on Board','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,6,41,'Catch a Saboteur','Mediator',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,6,42,'Storm Into a North Side Gang Brewery','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,6,43,'Dodge a Firebombing on Your Headquarters','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(7,6,44,'Salvage Your Valuables From a Blazing Fire','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,6,45,'Call for a Truce With the North Siders','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,6,46,'Narrowly Survive an Assassination Attempt','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,6,47,'Plan a Decisive Blow Against the North Siders','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,6,48,'Flee the Scene Before the Police Arrive','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,7,401,'Spread the Word','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,7,402,'Renovate and Prepare the City of Traverse','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,7,403,'Oversee the Cruise Gambling Operations','Horseracing Stub',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,7,404,'Prepare Alternate Telegraph Offices','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,7,405,'Obtain Disguises For Crew','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,7,406,'Ferry Passengers Through Other Means','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(7,7,407,'Get Rid of Any Evidence of Gambling','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(7,7,408,'Defend Arrested Passengers In Court','',false,0,0,1,0);
    this.jobs[this.jobs.length] = new Array(7,7,409,'Launder Shares and Dodge the Authorities','',false,0,0,0,0);

    this.jobs[this.jobs.length] = new Array(8,1,1,'Claim Your Winnings After The Match','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,1,2,'Fight Off The Thugs','Betting Slip',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,1,3,'Discuss Your Options With The Betting Mafia','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,1,4,'Persuade "The Kid" To Throw The Championship Fight','Energy Drink',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,1,5,'Spike "The Kid\'s" Energy Drink With A Neurotoxin','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,1,6,'Bet On "The Kid" Losing The Championship Fight','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(8,1,7,'Watch The Fight','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,1,8,'Collect Your Take','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(8,2,9,'Force An Immigrant Family From Their Home','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,2,10,'Meet The Land Mafia To Collect Your Take','Jagged Edge',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,2,11,'Intimidate The New Celebrity Residents','',false,0,0,1,1);
    this.jobs[this.jobs.length] = new Array(8,2,12,'Case The Nouvelle Vague Art Gallery','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,2,13,'Destroy The Rare East End Works Painting','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(8,2,14,'Burn Down A Brand New Condo','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,2,15,'Collect Your Take From The Construction Firms','',false,0,0,0,1);
    this.jobs[this.jobs.length] = new Array(8,2,16,'Leave The East End','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,3,17,'Write About The Mysterious Shooting','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,3,18,'Work With The PI At The Crime Scene','Rubber Gloves',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,3,19,'Approach The Police With Leads','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,3,20,'Search For A Trail','Disguise Mask',false,0,0,1,1);
    this.jobs[this.jobs.length] = new Array(8,3,21,'Threaten To Expose The Royal','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,3,22,'Lay A Trap For The Royal','',false,0,0,1,1);
    this.jobs[this.jobs.length] = new Array(8,3,23,'Tell The Editor The Truth','',false,0,0,0,0);
    this.jobs[this.jobs.length] = new Array(8,3,24,'Publish False Story Under Threat','',false,0,0,0,0);
    this.jobsLoaded = true;
  };

  // City, Collection Title (city 1000 = special, city 1001 = crew)
  this.loadCollectionTitles = function() {
    if (this.collectionTitlesLoaded == true) return;
    this.collectionTitles[this.collectionTitles.length] = new Array(1,'Diamond Flush');
    this.collectionTitles[this.collectionTitles.length] = new Array(1,'Heart Flush');
    this.collectionTitles[this.collectionTitles.length] = new Array(1,'Sculptures');
    this.collectionTitles[this.collectionTitles.length] = new Array(1,'Poker Chips');
    this.collectionTitles[this.collectionTitles.length] = new Array(1,'Club Flush');
    this.collectionTitles[this.collectionTitles.length] = new Array(1,'Boxing');
    this.collectionTitles[this.collectionTitles.length] = new Array(1,'Cigars');
    this.collectionTitles[this.collectionTitles.length] = new Array(1,'Spade Flush');
    this.collectionTitles[this.collectionTitles.length] = new Array(1,'Billiards');
    this.collectionTitles[this.collectionTitles.length] = new Array(1,'Rings');
    this.collectionTitles[this.collectionTitles.length]= new Array(1,'Ties');
    this.collectionTitles[this.collectionTitles.length]= new Array(1,'Paintings');
    this.collectionTitles[this.collectionTitles.length]= new Array(1,'Cufflinks');
    this.collectionTitles[this.collectionTitles.length]= new Array(1,'Barber');
    this.collectionTitles[this.collectionTitles.length]= new Array(1,'Great Race Horses');
    this.collectionTitles[this.collectionTitles.length]= new Array(1,'Daily Chance');
    this.collectionTitles[this.collectionTitles.length]= new Array(1,'Money Laundering');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Valentine\'s Massacre');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Mystery Bag: Chinese New Year');
    this.collectionTitles[this.collectionTitles.length]= new Array(2,'Rum Drinks');
    this.collectionTitles[this.collectionTitles.length]= new Array(2,'Tropical Fruits');
    this.collectionTitles[this.collectionTitles.length]= new Array(2,'Entertainers');
    this.collectionTitles[this.collectionTitles.length]= new Array(2,'Tropical Fish');
    this.collectionTitles[this.collectionTitles.length]= new Array(2,'Beards');
    this.collectionTitles[this.collectionTitles.length]= new Array(3,'Prison Tattoos');
    this.collectionTitles[this.collectionTitles.length]= new Array(3,'Matryoshka Dolls');
    this.collectionTitles[this.collectionTitles.length]= new Array(3,'Russian Leaders');
    this.collectionTitles[this.collectionTitles.length]= new Array(3,'Vodka Drinks');
    this.collectionTitles[this.collectionTitles.length]= new Array(3,'Soviet Memorabilia');
    this.collectionTitles[this.collectionTitles.length]= new Array(3,'Faberge Egg');
    this.collectionTitles[this.collectionTitles.length]= new Array(4,'Chess Set');
    this.collectionTitles[this.collectionTitles.length]= new Array(4,'Masks');
    this.collectionTitles[this.collectionTitles.length]= new Array(4,'Spices');
    this.collectionTitles[this.collectionTitles.length]= new Array(4,'Carvings');
    this.collectionTitles[this.collectionTitles.length]= new Array(4,'Orchids');
    this.collectionTitles[this.collectionTitles.length]= new Array(1001,'Prototype Carjacking');
    this.collectionTitles[this.collectionTitles.length]= new Array(1001,'Theft Of A Drone');
    this.collectionTitles[this.collectionTitles.length]= new Array(1001,'Weapons Shipment Hijacking');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Tools Of The Trade');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Stolen Diamond');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Easter Crime Basket');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'St Paddy\'s Day');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Global Cup Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Slots Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(1001,'Bring Back The Pack');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Mystery Bag Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Pantheon Trophies Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Continental Rings Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Championship Belts Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(5,'Matchbooks Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(5,'Cactus Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(5,'Mojave Animals Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(5,'Poker Hands Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'Silence Don Romo');
    this.collectionTitles[this.collectionTitles.length]= new Array (6,'Dinner Is Served Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array (6,'Roman Standards Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array (6,'The Great Inventor Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array (6,'Famous Rulers Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(1002,'Missions');
    this.collectionTitles[this.collectionTitles.length]= new Array(7,'Beaches Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(7,'Musical Instruments Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(7,'Amazonian Plants Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(7,'Drinks Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(7,'Head Dresses Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'The SuperHero Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(1000,'It\'s A Trap Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(8,'Car Bonnets Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(8,'Stickpins Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(8,'Sharp Dressers Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(8,'Fedora Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(8,'Tie One On Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(8,'Jockey Jacket Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(9,'Training Day Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(9,'Daily Wages Collection');
    this.collectionTitles[this.collectionTitles.length]= new Array(9,'Heel Hath No Fury Collection');
    this.collectionTitlesLoaded = true;
  };

  // Collection Title ID, (Item ID, Item Name), (Item ID, Item Name), ...
  this.loadCollections = function() {
    if (this.collectionsLoaded) return;
    this.collections[this.collections.length] = new Array(0,1036,'Eight',1037,'Nine',1038,'Ten',1039,'Jack',1040,'Queen',1041,'King',1042,'Ace');
    this.collections[this.collections.length] = new Array(1,1043,'Eight',1044,'Nine',1045,'Ten',1046,'Jack',1047,'Queen',1048,'King',1049,'Ace');
    this.collections[this.collections.length] = new Array(2,1022,'Rat',1023,'Sheep',1024,'Rooster',1025,'Monkey',1026,'Tiger',1027,'Snake',1028,'Dragon');
    this.collections[this.collections.length] = new Array(3,1029,'White',1030,'Brown',1031,'Red',1032,'Blue',1033,'Green',1034,'Purple',1035,'Gold');
    this.collections[this.collections.length] = new Array(4,1050,'Eight',1051,'Nine',1052,'Ten',1053,'Jack',1054,'Queen',1055,'King',1056,'Ace');
    this.collections[this.collections.length] = new Array(5,1085,'Hand Tape',1086,'Gloves',1087,'Headgear',1088,'Boxing Trunks',1089,'Speed Bag',1090,'Heavy Bag',1091,'Boxing Ring');
    this.collections[this.collections.length] = new Array(6,1001,'Ebony',1002,'Sky',1003,'Rose',1004,'Ivory',1005,'Turquoise',1006,'Gold',1007,'Royal');
    this.collections[this.collections.length] = new Array(7,1057,'Eight',1058,'Nine',1059,'Ten',1060,'Jack',1061,'Queen',1062,'King',1063,'Ace');
    this.collections[this.collections.length] = new Array(8,1092,'One',1093,'Two',1094,'Three',1095,'Four',1096,'Five',1097,'Six',1098,'Seven');
    this.collections[this.collections.length] = new Array(9,1008,'Topaz',1009,'Opal',1010,'Amethyst',1011,'Emerald',1012,'Sapphire',1013,'Ruby',1014,'Diamond');
    this.collections[this.collections.length] = new Array(10,1064,'Solid',1065,'Striped',1066,'Checked',1067,'Geometric',1068,'Dot',1069,'Paisley',1070,'Knitted');
    this.collections[this.collections.length] = new Array(11,1015,'Warhol',1016,'Cezanne',1017,'Matisse',1018,'Van Gogh',1019,'Dali',1020,'Monet',1021,'Rembrandt');
    this.collections[this.collections.length] = new Array(12,1071,'Silver',1072,'Gold',1073,'Amber',1074,'Jasper',1075,'Agate',1076,'Onyx',1077,'Pearl');
    this.collections[this.collections.length] = new Array(13,1099,'Barber Pole',1100,'Razor',1101,'Brush',1102,'Seat',1103,'Towel',1104,'Scissors',1105,'Cream');
    this.collections[this.collections.length] = new Array(14,1078,'Mill Reef',1079,'Sea Bird',1080,'Arkle',1081,'Golden Miller',1082,'St Simon',1083,'Ormonde',1084,'Eclipse');
    this.collections[this.collections.length] = new Array(15,1106,'Bingo Card',1107,'Deck of Cards',1108,'Dice',1109,'Roulette Wheel',1110,'Slot Machine',1111,'Craps Table',1112,'Baccarat Shoe');
    this.collections[this.collections.length] = new Array(16,1113,'Money Iron',1114,'Dirty Laundry',1115,'Dryer Sheets',1116,'Money Line',1117,'Roll of Quarters',1118,'Death by Detergent',1119,'Dirty Bra');
    this.collections[this.collections.length] = new Array(17,100001,'Heart Tattoo',100002,'Shoot The Moon',100003,'Stolen Heart',100004,'Heart Locket',100005,'Box of Chocolates',100006,'Love Bear',100007,'Valentine');
    this.collections[this.collections.length] = new Array(18,400001,'Baoding Balls',400002,'Cricket Cage',400003,'Dragon Mask',400004,'Four Toed Dragon',400005,'Money Envelope',400006,'Year Of The Tiger',400007,'Money Frog');
    this.collections[this.collections.length] = new Array(19,2001,'Pina Colada',2002,'Hurricane',2003,'Bahama Mama',2004,'Mojito',2005,'Rum Runner',2006,'Long Island',2007,'Cuba Libre');
    this.collections[this.collections.length] = new Array(20,2008,'Banana',2009,'Lime',2010,'Pineapple',2011,'Papaya',2012,'Coconut',2013,'Passion Fruit',2014,'Dragon Fruit');
    this.collections[this.collections.length] = new Array(21,2015,'Magician',2016,'Fan Dancer',2017,'Comedian',2018,'Band Leader',2019,'Cabaret Singer',2020,'Crooner',2021,'Burlesque Dancer');
    this.collections[this.collections.length] = new Array(22,2022,'Pufferfish',2023,'Sergeant Major',2024,'Yellowtail Snapper',2025,'Great Barracuda',2026,'Queen Angelfish',2027,'Reef Shark',2028,'Blue Marlin');
    this.collections[this.collections.length] = new Array(23,2029,'Garibaldi',2030,'Hulihee',2031,'Vandyke',2032,'Mutton Chops',2033,'Soul Patch',2034,'French Fork',2035,'Fidel');
    this.collections[this.collections.length] = new Array(24,3001,'Rose',3002,'Church',3003,'Star',3004,'Spider',3005,'Tiger',3006,'Skull',3007,'Crucifix');
    this.collections[this.collections.length] = new Array(25,3008,'Natayla',3009,'Olga',3010,'Oksana',3011,'Svetlana',3012,'Tatyana',3013,'Anastasiya',3014,'Ekaterina');
    this.collections[this.collections.length] = new Array(26,3015,'Gorbachev',3016,'Yeltsin',3017,'Brezhnev',3018,'Kruschev',3019,'Putin',3020,'Stalin',3021,'Lenin');
    this.collections[this.collections.length] = new Array(27,3022,'Cosmopolitan',3023,'Screwdriver',3024,'Sex on the Beach',3025,'Bloody Mary',3026,'Black Russian',3027,'White Russian',3028,'Soviet');
    this.collections[this.collections.length] = new Array(28,3029,'Red Star',3030,'Kremlin',3031,'Communist Manifesto',3032,'Propaganda Poster',3033,'Hammer',3034,'Sickle',3035,'Bust of Lenin');
    this.collections[this.collections.length] = new Array(29,3036,'Diamond Trellis',3037,'Jade',3038,'Military',3039,'Pansy',3040,'Rainbow',3041,'Winter',3042,'Peter the Great');
    this.collections[this.collections.length] = new Array(30,4001,'Chessboard',4002,'Pawn',4003,'Knight',4004,'Bishop',4005,'Rook',4006,'Queen',4007,'King');
    this.collections[this.collections.length] = new Array(31,4008,'Agat-Talai',4009,'Sukreep',4010,'Palee',4011,'Phra Ram',4012,'Indrachit',4013,'Hanuman',4014,'Tosakanth');
    this.collections[this.collections.length] = new Array(32,4015,'Coriander',4016,'Garlic',4017,'Turmeric',4018,'Green Peppercorn',4019,'Holy Basil',4020,'Lemongrass',4021,'Thai Chili');
    this.collections[this.collections.length] = new Array(33,4022,'Wall Carving',4023,'Floral Statue',4024,'Dragon Statue',4025,'Nightstand',4026,'Lotus Bloom',4027,'Elephant',4028,'Stone Buddha');
    this.collections[this.collections.length] = new Array(34,4029,'Marco Polo',4030,'Grace Pink',4031,'Misteen',4032,'Jade Siam',4033,'Bom Gold',4034,'Bom Blue',4035,'Fatima');
    this.collections[this.collections.length] = new Array(35,300001,'GPS Signal Scambler',300002,'Tank of Gasoline',300003,'Ignition Device',300004,'Microchip Fitted Key',300005,'Map Of The Garage',300006,'Counterfeit ID Badges',300007,'Security Hacker');
    this.collections[this.collections.length] = new Array(36,300008,'Classified Report',300009,'Hijacked Transmitter',300010,'Access Code',300011,'Guards Schedule',300012,'Calibration Manual',300013,'Guidance Module',300014,'UltraLite Fuel Cell');
    this.collections[this.collections.length] = new Array(37,300015,'Shipment Info',300016,'Schedule Of Truck Route',300017,'Road Block',300018,'Container Key',300019,'Rocket Ammo',300020,'Tracking Laser Sight',300021,'Carrying Case');
    this.collections[this.collections.length] = new Array(38,500001,'Lock Picks',500002,'Diamond Drill',500003,'Flashlight',500004,'Walkie Talkie',500005,'Safecrackers Stethoscope',500006,'Black Ski Masks',500007,'Grappling Hooks');
    this.collections[this.collections.length] = new Array(39,500008,'Hope',500009,'Koh-I-Noor',500010,'Great Star Of Africa',500011,'The Orloff',500012,'The Sancy',500013,'The Idols Eye',500014,'The Regent');
    this.collections[this.collections.length] = new Array(40,100015,'Striped Egg',100016,'Polka Dot Egg',100017,'Checkered Egg',100018,'Plaid Egg',100019,'Paisley Egg',100020,'Last Years Egg',100021,'Golden Egg');
    this.collections[this.collections.length] = new Array(41,100008,'Irish Flag',100009,'Leprechaun',100010,'Green Fireworks',100011,'Green Bowlers Hat',100012,'Pot of Gold',100013,'Bag Pipes',100014,'Paddy@s Pint Glass');
    this.collections[this.collections.length] = new Array(42,100022,'English Ball',100023,'French Ball',100024,'Brazilian Ball',100025,'German Ball',100026,'Italian Ball',100027,'Argentinean Ball',100028,'Spanish Ball');
    this.collections[this.collections.length] = new Array(43,100029,'Liberty Bell',100030,'Lucky 7',100031,'Plum',100032,'Lime',100033,'Triple Bar',100034,'Cherry',100035,'Orange');
    this.collections[this.collections.length] = new Array(44,300022,'Sammy\'s Shades',300023,'Ol\' Blue Eyes',300024,'King Of Cool',300025,'Jootes\' Shoes',300026,'Bogey',300027,'Blond Bombshell\'s Dress',300028,'Angel\'s Coat');
    this.collections[this.collections.length] = new Array(45,400008,'Magnifying Glass',400009,'Shoe Prints',400010,'Calabash Pipe',400011,'Deerstalker Hat',400012,'Hand Cuffs',400013,'Case Files',400014,'Mysterious Note');
    this.collections[this.collections.length] = new Array(46,705001,'Atlas Trophy',705002,'Herculean Trophy',705003,'Ares Trophy',705004,'Zeus Trophy',705005,'Athena Trophy',705006,'Artemis Trophy',705007,'Poseidon Trophy');
    this.collections[this.collections.length] = new Array(47,705008,'Oceania Ring',705009,'Europe Ring',705010,'Asia Ring',705011,'South America Ring',705012,'North America Ring',705013,'Antartica Ring',705014,'Africa Ring');
    this.collections[this.collections.length] = new Array(48,705015,'City Belt',705016,'State Belt',705017,'Regional Belt',705018,'National Belt',705019,'Continental Belt',705020,'World Belt',705021,'Universal Belt');    
    this.collections[this.collections.length] = new Array(49,5057,'Loot Isle Casino',5058,'Camelot Hotel',5059,'Giza Las Vegas',5060,'Florentine Resort',5061,'Soft Rock Casino',5062,'Jersey, Jersery',5063,'Planet Bollywood');    
    this.collections[this.collections.length] = new Array(50,5036,'Christmas Cactus',5037,'Silver Cholla',5038,'Cottontop Cactus',5039,'Hedgehog Cactus',5040,'Prickly Pear Cactus',5041,'Barrel Cactus',5042,'Saguaro');    
    this.collections[this.collections.length] = new Array(51,5043,'Jackrabbit',5044,'Coyote',5045,'Roadrunner',5046,'Rattlesnake',5047,'Kit Fox',5048,'Golden Eagle',5049,'Mountain Lion');    
    this.collections[this.collections.length] = new Array(52,5050,'Pair',5051,'Two Pair',5052,'Three of a Kind',5053,'Full House',5056,'Four of a Kind',5054,'Straight Flush',5055,'Joker');    
    this.collections[this.collections.length] = new Array(53,10036,'Conchiglie',10037,'Farfalle',10038,'Lasagna',10039,'Manicotti',10040,'Rotini',10041,'Spaghetti',10042,'Ziti');    
    this.collections[this.collections.length] = new Array(54,6001,'Toasted Ravioli',6002,'Traditional Pizza',6003,'Calzone',6004,'Gnocchi',6005,'Meatballs',6006,'Gelato',6007,'Cioppino');
    this.collections[this.collections.length] = new Array(55,6008,'Banner',6009,'Capitoline',6010,'Castle',6011,'Centurion',6012,'Eagle',6013,'Flag',6014,'Palm');
    this.collections[this.collections.length] = new Array(56,6015,'Bones Of Man',6016,'Mother With Child',6017,'Portrait',6018,'Helicopter Scroll',6019,'Vitruvian Man',6020,'Tank',6021,'Crossbow');
    this.collections[this.collections.length] = new Array(57,6022,'Marius - Great Man',6023,'Caesar - Statesman',6024,'Augustus - First',6025,'Nero - Madman',6026,'Trajan - Kind Soldier',6027,'Constantine - Unifier',6028,'Justinian - Last');
    this.collections[this.collections.length] = new Array(58,800001,'Blasting Caps',800002,'Code Breaker',800003,'Earbud Shades',800004,'Fake Identity',800005,'Mook Jong',800006,'Sniper Scope',800007,'Stick Shift Grip');
    this.collections[this.collections.length] = new Array(59,7001,'Pinho',7002,'Jericoacoara',7003,'Ipanema',7004,'Recife',7005,'Ponta Negra',7006,'Florianopolis',7007,'Canoa Quebrada');
    this.collections[this.collections.length] = new Array(60,7008,'Agogo',7009,'Atabaque',7010,'Bateria',7011,'Ganza',7012,'Pandeiro',7013,'Skekere/Xequere',7014,'Tamborim');
    this.collections[this.collections.length] = new Array(61,7015,'Dutchman\'s Pipe',7016,'Giant Amazon Water Lily',7017,'Tabebuia',7018,'Amazon Coral Tree',7019,'Passion Fruit',7020,'Banana Plant',7021,'White Flowers');
    this.collections[this.collections.length] = new Array(62,7022,'West Rum Caipirinha',7023,'Leite do Onca',7024,'Agua de Coco',7025,'Chimarrao',7026,'Vinho Quente',7027,'Cerveja',7028,'Lucky Lucas');
    this.collections[this.collections.length] = new Array(63,7029,'Golden Goddess',7030,'Red Dawn',7031,'Green Canopy',7032,'Black Midnight',7033,'Jungle Vines',7034,'Purple Plume',7035,'Sun Shine');
    this.collections[this.collections.length] = new Array(64,400015,'Arachnid-Man',400016,'Squirrel Man',400017,'Superbman',400018,'Freak Squad',400019,'Blue Beacon',400020,'General U.S.A.',400021,'Terrific Titan');
    this.collections[this.collections.length] = new Array(65,400022,'Box-on-a-Stick',400023,'Lobster Trap',400024,'Mouse Trap',400025,'Punji Stake Pit',400026,'Spring Snare',400027,'Steel-jaw Trap',400028,'Drop Net');
    this.collections[this.collections.length] = new Array(66,8001,'Aphrodite\'s',8002,'Big Shot',8003,'Dash',8004,'Eagle',8005,'Lion',8006,'Skull',8007,'Stallion');
    this.collections[this.collections.length] = new Array(67,8008,'Amber Star',8009,'Carved Emerald',8010,'Diamond',8011,'Middle Aisle',8012,'Pearl',8013,'Rose',8014,'Shield');
    this.collections[this.collections.length] = new Array(68,8015,'6-Button Long Coat',8016,'4-Button Pinstriped Suit',8017,'Double Breasted Suit',8018,'Garbardine Suit',8019,'Glad Rags',8020,'Swanky Moll Suit',8021,'Glamour Flapper Dress');
    this.collections[this.collections.length] = new Array(69,8022,'Diamond Crowned',8023,'Borsatino Wide-Brimmed',8024,'Cavanagh Edge',8025,'Narrow-Brimmed Triby',8026,'Bowler Hat',8027,'Bell Hat',8042,'Single Dent Homburg');
    this.collections[this.collections.length] = new Array(70,8029,'Black Silk',8030,'White Silk',8031,'Green Silk',8032,'Red Linen',8033,'Canary Linen',8034,'Blue Cotton',8035,'Gray Cotton');
    this.collections[this.collections.length] = new Array(71,8035,'Triple Victory',8036,'Double Stride',8037,'Copacetic',8038,'Checkered',8039,'All Sixes',8040,'Get a Wiggle On',8041,'Java and Joe');
    this.collections[this.collections.length] = new Array(72,9001,'Rubberized Medicine Ball',9002,'Skipping Rope',9003,'Versatile Resistance Trainer',9004,'Punching Bag',9005,'Speed Bag',9006,'Dumb-bells',9007,'Exercise Hand Grip');
    this.collections[this.collections.length] = new Array(73,9008,'Weights',9009,'Weaving Tool',9010,'Garbage Bag',9011,'Shoe Horn',9012,'Sewing Machine',9013,'Tower Pincer',9014,'Washing Bat');
    this.collections[this.collections.length] = new Array(74,9015,'Cone Heels',9016,'Kitten Heels',9017,'Platform Heels',9018,'Stilettos',9019,'Spool Heels',9020,'Wedge Heels',9021,'Prism Heels');
    this.collectionsLoaded = true;
  };

  this.loadLootTypes = function() {
    if (this.lootTypesLoaded == true) return;
    this.lootTypes[0] = 'Weapon';
    this.lootTypes[1] = 'Armor';
    this.lootTypes[2] = 'Vehicle';
    this.lootTypes[3] = 'Consumable';
    this.lootTypes[4] = 'Boost';
    this.lootTypes[5] = 'Hidden Loot';
    this.lootTypes[6] = 'Animals';
    this.lootTypes[7] = 'Special Loot';
    this.lootTypesLoaded = true;
  };
  
  // Loot Name, Item ID, Loot Type, Gift Type, Attack, Defense, Giftable
  this.loadLootItems = function() {
    if (this.lootItemsLoaded == true) return;
    this.lootItems[this.lootItems.length] = new Array('.22 Pistol',1,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Butterfly Knife',2,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Brass Knuckles',3,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('9mm Semi-Automatic',4,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('.45 Revolver',5,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Tactical Shotgun',6,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('C4',7,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Automatic Rifle',9,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Semi-Automatic Shotgun',10,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Grenade Launcher',14,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('.50 Caliber Rifle',15,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('RPG Launcher',17,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Napalm',20,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Firebomb',61,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bookie@s Holdout Pistol',71,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('AR-15 Assault Rifle',73,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Garza 9',194,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('RA-92',195,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('M16A1',196,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ru-38',197,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cane Knife',198,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Para 322',199,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Gaff Hook',200,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('ASC45 "Conquistador"',201,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Aguila HV .50 Sniper Rifle',202,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('TNT',203,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Canonazo',261,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('BA-12 Assault Rifle',73,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Flintlock Pistols',222,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cannon',229,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bayonet',223,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Saber',227,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Musket',226,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('RAS-15',1003,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('RU-7 .45 Pistol',1001,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Molotok Pistol',1000,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ballistic Knife',1002,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Zmeya Carbon Blade',1034,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ubijca Assault Rifle',1032,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Attack Cobra',1500,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Jade Inlaid Pistols',1502,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('BRM-38',1509,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Tanto',1506,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Stab-Proof Vest',8,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bodyguards',18,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Night Vision Goggles',19,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Lucky Shamrock Medallion',60,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Falsified Documents',74,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Federal Agent',78,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Street Gang Member',204,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Camouflage Body Armor',205,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Guerilla Squad',174,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Tri-Point Hat',224,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Red Coat',228,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Davy Crockett Hat',225,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('PNV',1005,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Armored Briefcase',1014,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Shturmovik',1020,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Executive Overcoat',1026,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Royal Thai Army Beret',1515,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Silk Scarf',1513,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Muai Thai Bodyguard',1512,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Armored Truck',11,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Armored Car',2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Prop plane',66,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Chopper',67,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Luxury Yacht',69,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Humvee',72,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Porsche 911',70,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Private Jet',75,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Armored LImousine',77,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Police Cruiser',76,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Mara Serpiente',175,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Chucho FAV',176,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ocelot Armored Truck',177,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Montaine 320',178,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cigarette Boat',179,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Mini-Sub',180,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Si-14 Cargo Plane',181,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hu-9 Helicopter',182,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Armored State Car',183,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Track Loader',262,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('GX9',70,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Multi-Purpose Truck',72,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cherepakha Compact',1007,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Severnyy Olen Snowbike',1008,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Orel Armored Helicopter',1021,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Konstantin Cargo Carrier',1029,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Zoloto Sports Car',1030,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Shchuka Speed Boat',1017,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Volk Luxury Sedan',1016,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Mystery Van',327,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Treat Bag',328,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Arkticheskij Gus',1028,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Osa 17 Snowmobile',1027,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Riding Elephant',1519,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Dirt Bike',1521,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bosozoku Convertible',1523,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('LLoyds Spectre',1522,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Red Angel',569,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Trio Napoli',568,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Computer Set-up',63,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Concealable Camera',62,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Untraceable Cell Phone',64,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Transaction Records',68,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Politico Corrupto',245,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Blackmail Photos',65,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Dossier on Dmitri',1010,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Photos of Karapov',1011,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Officer Corps Paycheck',1018,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bank Guard Uniform',1012,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Stick of Dynamite',1024,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Mansion Details',1025,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Treasure Chest',466,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Pirate',1536,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Envelope Of Thai Baht',1537,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Satellite Phone',1534,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Drug Shipment',1535,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Acetylene Torches',535,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Shipping Containers',536,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cement Blocks',532,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Car Lift',534,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Power Tools',533,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Russian Car Part',560,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Thai Car Part',561,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cuban Car Part',559,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Car Part',558,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Solar Panel',571,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bulletproof Glass',570,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Extra Pair of Eyes',25,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hot Coffee',26,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Mutt',27,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Temporary Tattoo',28,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hidden Matryoshka',29,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Handy Man',30,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Throwing Knives',31,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hollow Points',32,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Political Favor',41,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Boxer',33,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bullmastiff',34,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Mr. Hot Sauce',35,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Lookout',36,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Reinforced Door',37,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Surveillance Camera',38,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Free Ride',39,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Liquid Courage',42,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Berlin Wall Section',43,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Faberge Hen',44,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Money Sock',45,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bola',46,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Car Bomb',47,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Flash Bang',48,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Smoke Grenade',49,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Champagne Bottle',50,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Chess Master',51,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('War Paint',52,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Pepper Spray',53,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Chisel',54,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Boutonniere',55,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Tripwire',1,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cappuccino',2,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Alarm System',3,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bulldog',4,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Problem Solver',5,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Semi-Pro Boxer',6,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Fixer',7,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Sting Grenade',8,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bouncer',9,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Blueprints',10,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Injunction',11,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Motion Detector',12,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Corporate Muscle',13,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Shave and a Haircut',14,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Inside Tip',15,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Flaming Shot',16,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Boosted Smoothie',17,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Sandbag Wall',18,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Blowfish Dart',19,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hobo Lookout',20,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Truck Driver',40,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hyper Alert Sentry',57,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Black Market Ammo',56,4,2,0,true);
    this.lootItems[this.lootItems.length] = new Array('Treasure Chest',466,5,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cleaver',1505,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('High-tech Car Part',635,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Gun Drill',659,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Gunpowder',658,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Weapon Part',668,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Laser Rangefinder',671,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Buzzsaw',657,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Railgun Barrel',654,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Explosive Arrow',669,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Forge',660,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Portable Fusion Reactor',655,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Boomerang',672,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Sonic Emitter',670,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Arc Welder',656,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Grapple',673,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Taiga Combat Shotgun',1013,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('RU-78 Machine Gun',1019,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Razoreiter Grenade Launcher',1022,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Klyk-9 Machine Pistol',1033,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Komodo Dragon',1501,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hung Fa RPG',1504,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Type-103 Machine Gun',1507,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Scalding Hot Tea',1508,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Monk@s Robe',1514,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Optical Camo Suit',1516,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Royal Thai Army Jeep',1520,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('MalayMobil Helang',1524,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Seua Daao Sub',1525,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Kage Jet',1526,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Fugama Kame SUV',1529,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ghost Thug',326,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Big Bad Wolf',675,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ninja Sai',661,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ultrasonic Gun',663,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Robber@s Utility Belt',665,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Railgun',666,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Plasma Rifle',6673,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Tasmanian',562,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('CM Santiago R10',563,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Solar Flare',564,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Russian Dazatz 45',565,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Rebel 2',566,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Thai XS Max',567,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Sirroco 9Z',631,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Andresen 420si',632,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Mugati Sport',633,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hunter @Spy@ XS',634,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Titanium Mesh Jacket',1544,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Royal Thai Marine',1546,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Chain Viper',1550,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ninja',1545,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Nak Kha Shotgun',1542,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Titanium Katar',1543,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Raed Armored Sedan',1547,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Lamang Motorcycle',1548,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Forest Scorpion',1503,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Riding Elephant',1519,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Security Camera',762,7,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Reinforced Steel',763,7,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Deposit Box',764,7,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Motion Sensor',765,7,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Magnetic Lock',766,7,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Day Rider 2K',1836,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Range Finder Rifle',2013,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Football Jersey',2016,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Moving Truck',2019,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Road Tractor',2026,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Car Key Copy',2028,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('24K Chainsaw',2057,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Rhinestone Cowboy',2061,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Mojave Mike',2070,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Precision SMG',2024,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Gilded RPG',2060,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Belt Fed Shotgun',2010,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Pump Shotgun',2059,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Two Pair',2012,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Biohazard',2011,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Reinforced Boots',2062,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('El Scorpion',2058,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Set of Biker Leathers',2015,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Femme Fatale',2063,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Reinforced Tuxedo',2014,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ventilated Blast Cap',2064,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Motorcyle Helmet',2017,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Goldsmobile',2071,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Highrise Sport',2068,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hard Four',2069,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Dune Buggy',2022,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('High Society',2025,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Classic Convertible',2021,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Sand Storm',2020,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('All Terrain',2067,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Diamondback',2076,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bark Scorpion',2073,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bighorn Ram',2074,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bison',2072,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Security Camera',762,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Reinforced Steel',763,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Deposit Box',764,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Motion Sensor',765,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Magnetic Lock',766,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cinder Block',1575,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Steel Girder',1576,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Concrete',1577,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Construction Tool',1578,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Slot Machine',1574,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Casino Dealer',1579,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Chef',1580,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Poker Table',1581,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bellhop',1582,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Gila Monster',2075,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Flux Compressor',1838,7,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Suspension Coil',1839,7,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Snake Eyes',58,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Gourmet Oysters',59,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Dead Man\'s Hand',60,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Mint On The Pillow',61,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Carver',2056,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Reinforced Boots',2062,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Laser Guided RPG',664,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('First Blood',662,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hot Tip',2030,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Alarm Code',2027,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hotel Security Key Card',2029,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Armor Part',2195,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bio-Monitor',2194,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Arcturion Assault Rifle',2159,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ripper Assault Rifle',2161,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Pitbull Sentry Gun',2160,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cooling Vest',2166,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hopped-Up Thug',2165,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('X-22 Peregrine',2167,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Amphiquad',2170,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ballista Missile Launcher',2169,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Foo Fighter',2168,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Pronghorn Antelope',2171,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bighorn',2172,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Reinhardt and Otto',2066,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ares Power Armor',2164,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Anvil',2185,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Rivet',2197,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Vice',2184,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hammer',2196,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Furnace',2183,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Micro-Fission Cell',2193,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Z17 Micro',877,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Grim Reaper',876,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Grip Gloves',878,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Coyote',879,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Fire Ants',62,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Caltrops',63,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Glass Knuckles',64,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Protective Suit',79,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Blackjack',80,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bottle of Wine',81,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bottle of Olive Oil',82,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Swordfish',83,4,2,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Animal Feed',4603,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Bird Cage',4607,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Feeding Trough',4608,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Big Cage',4606,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Aquarium',4605,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Terrarium',4609,3,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Jackal ATV',846,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('New Year\'s Resolution',844,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Roman Legion',5349,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Holy Hand Grenade',5335,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Marco Marino AF',5348,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Sea Eagle',5350,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Swiss Guard',5339,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Popemobile',5337,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Italian Porcupine',5330,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Armatura Ramarro',5345,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Corpo Armatura',1053,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Templar Shield',5341,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Pontiff-1',5336,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Giove Velocita',5329,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Meadow Viper',1069,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Spaghetti Western',5351,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Templar Hammer',5340,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Angelo Della Morte',5324,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Armatura Motocicletta',5344,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Avanti Tutta',1059,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Rex Enterra',5333,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('New Years Party Bus',843,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cinghiale',1068,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ottoman Krug',2655,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('House Fire',1131,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hack n Slash',1714,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Azazel\'s Sword',827,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Snake Fang',1752,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cazador Assault Rifle',263,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hail Storm Jacket',1132,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Thief',1128,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Antidote',2435,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Storm Chaser',1130,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Amplitude',852,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Prop 4',1749,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Shaw\'s Submarine',830,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Remorra Gray',2457,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Sloth',2154,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Yellow Sea Snake',5294,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Galapagos Hawk',1712,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Hippopotamus',881,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Structural Damage',1129,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Flood Damage',1133,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('ZPR Pulemet',1035,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Death Dealer Minigun',711,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Car Cutter',2199,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Indian Katar',2210,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Tundra SMG',1561,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Lock and Stock',4561,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Ascension',2455,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Woodsman',2095,0,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Brawler\'s Headgear',1756,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Protective Shirt',1701,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Snow Resist Layer',1750,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Havok\'s Chest',826,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('X-Men Crest',825,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Lust',2151,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Pair of Skywalkers',849,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Parisian Fixer',697,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Fox Hole',2434,1,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Autoboatome',1134,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Maltese Falcon',2112,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Growler',1713,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Water Truck',2641,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Magma Magnifique',2213,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Contender',1711,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Set of Roaring 20\'s',880,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('X-Men Blackbird',828,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Pesaro Racer',2109,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Asconini 33',5326,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Dive Scooter',896,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cocodrilo APC',193,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Extended Cab 640',2324,2,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('California Moray',5368,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Nyala',2654,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Brown Pelican',1917,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('California Condor',1763,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Plains Zebra',778,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Stellar Sea Lion',777,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Grizzly Bear',1803,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Savanna Baboon',1706,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Rhinoceros',1815,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Red Kangaroo',4613,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Red Back Spider',2090,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Dublin Stallion',615,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Stage Show Tiger',759,6,1,0,0,true);
    this.lootItems[this.lootItems.length] = new Array('Cuban Mercenary',1321,3,1,0,0,true);
    this.lootItemsLoaded = true;
  };
  // Loot Name, Item ID, Loot Type, Gift Type, Attack, Defense, Giftable

  this.loadShopItems = function() {
    if (this.shopItemsLoaded == true) return;
    this.shopItems[this.shopItems.length] = new Array('Legacy (+2A)',70,11);
    this.shopItems[this.shopItems.length] = new Array('Common Car',1,11);
    this.shopItems[this.shopItems.length] = new Array('Sonic Five',39,11);
    this.shopItems[this.shopItems.length] = new Array('Midnight (+1D)',39,11);
    this.shopItems[this.shopItems.length] = new Array('Sonic Five',25,11);
    this.shopItems[this.shopItems.length] = new Array('Rare Car',2,11);
    this.shopItems[this.shopItems.length] = new Array('General Ulysses',26,11);
    this.shopItems[this.shopItems.length] = new Array('Palermo Luxury (+5H)',40,11);
    this.shopItems[this.shopItems.length] = new Array('Tasmanian',3,11);
    this.shopItems[this.shopItems.length] = new Array('Sleek (+1A)',41,11);
    this.shopItems[this.shopItems.length] = new Array('CM Santiago R10',4,11);
    this.shopItems[this.shopItems.length] = new Array('Rebel 2 (+6S)',5,11);
    this.shopItems[this.shopItems.length] = new Array('Sirroco 9Z',11,11);
    this.shopItems[this.shopItems.length] = new Array('Russian Dazantz 45',6,11);
    this.shopItems[this.shopItems.length] = new Array('Solar Flare (+6E)',7,11);
    this.shopItems[this.shopItems.length] = new Array('Andressen 420si',12,11);
    this.shopItems[this.shopItems.length] = new Array('Thai XS Max',8,11);
    this.shopItems[this.shopItems.length] = new Array('Trio Napoli',9,11);
    this.shopItems[this.shopItems.length] = new Array('Red Angel',10,11);
    this.shopItems[this.shopItems.length] = new Array('Mugati Sport (+3A)',13,11);
    this.shopItems[this.shopItems.length] = new Array('Hunter @Spy@ XS (+3D)',14,11);
    this.shopItems[this.shopItems.length] = new Array('Day Rider 2K (+1A/+1D)',27,11);
    this.shopItems[this.shopItems.length] = new Array('Sportster (+3E/+3S)',42,11);
    this.shopItems[this.shopItems.length] = new Array('Extended Cab 640 (+3SP)',43,11);
    this.shopItems[this.shopItems.length] = new Array('Blazing Santoku (+1A)',49,12);
    this.shopItems[this.shopItems.length] = new Array('Common Weapon',15,12);
    this.shopItems[this.shopItems.length] = new Array('Double Dare (+1D)',50,12);
    this.shopItems[this.shopItems.length] = new Array('Uncommon Weapon',16,12);
    this.shopItems[this.shopItems.length] = new Array('Rare Weapon',17,12);
    this.shopItems[this.shopItems.length] = new Array('Need A Jump? (+1E)',51,12);
    this.shopItems[this.shopItems.length] = new Array('Ninja Sai',18,12);
    this.shopItems[this.shopItems.length] = new Array('First Blood',19,12);
    this.shopItems[this.shopItems.length] = new Array('Ultrasonic Gun',20,12);
    this.shopItems[this.shopItems.length] = new Array('Laser Guided RPG',21,12);
    this.shopItems[this.shopItems.length] = new Array('Robber@s Utility Belt (+6S)',22,12);
    this.shopItems[this.shopItems.length] = new Array('Railgun (+5A)',23,12);
    this.shopItems[this.shopItems.length] = new Array('Plasma Rifle (+5D)',24,12);
    this.shopItems[this.shopItems.length] = new Array('Dirty Trick (+5H/+2S)',44,12);
    this.shopItems[this.shopItems.length] = new Array('Electric Prod (+5H/+2E)',45,12);
    this.shopItems[this.shopItems.length] = new Array('Hack Blade (+6D)',46,12);
    this.shopItems[this.shopItems.length] = new Array('Stun Knuckles (+6A)',47,12);
    this.shopItems[this.shopItems.length] = new Array('Wasper Knife (+4SP)',48,12);
    this.shopItems[this.shopItems.length] = new Array('Welding Mask (+1A)',54,13);
    this.shopItems[this.shopItems.length] = new Array('Random Common Armor',29,13);
    this.shopItems[this.shopItems.length] = new Array('Random Uncommon Armor',30,13);
    this.shopItems[this.shopItems.length] = new Array('Sprinting Shoes (+1D)',55,13);
    this.shopItems[this.shopItems.length] = new Array('Random Rare Armor',31,13);
    this.shopItems[this.shopItems.length] = new Array('Forearm Guard (+1S)',56,13);
    this.shopItems[this.shopItems.length] = new Array('Plastic Legging',32,13);
    this.shopItems[this.shopItems.length] = new Array('Mariner\'s Suit',33,13);
    this.shopItems[this.shopItems.length] = new Array('Pressure Suit',34,13);
    this.shopItems[this.shopItems.length] = new Array('Sleek Torso Guard',35,13);
    this.shopItems[this.shopItems.length] = new Array('Full Body Armor (+1A/+1D)',36,13);
    this.shopItems[this.shopItems.length] = new Array('MNU Suit (+10H)',37,13);
    this.shopItems[this.shopItems.length] = new Array('Power Armor (+2E/+2S)',38,13);
    this.shopItems[this.shopItems.length] = new Array('Desert Eyes (+1E/+1S)',89,13);
    this.shopItems[this.shopItems.length] = new Array('Spotted Vest',90,13);
    this.shopItems[this.shopItems.length] = new Array('Five Finger Fortification (+3D)',91,13);
    this.shopItems[this.shopItems.length] = new Array('Strong Arm',92,13);
    this.shopItems[this.shopItems.length] = new Array('Stout Shoulders (+3A)',93,13);
    this.shopItems[this.shopItems.length] = new Array('Fennec Fox',60,14);
    this.shopItems[this.shopItems.length] = new Array('Spur Tortoise',61,14);
    this.shopItems[this.shopItems.length] = new Array('Phillipine Eagle',62,14);
    this.shopItems[this.shopItems.length] = new Array('Bobcat',63,14);
    this.shopItems[this.shopItems.length] = new Array('Secretary Raptor',64,14);
    this.shopItems[this.shopItems.length] = new Array('Brown Recluse SPider',65,14);
    this.shopItems[this.shopItems.length] = new Array('Tiger Shark (+3A)',66,14);
    this.shopItems[this.shopItems.length] = new Array('Black Mamba (+1SP)',67,14);
    this.shopItems[this.shopItems.length] = new Array('Gharial (+3D)',68,14);
    this.shopItems[this.shopItems.length] = new Array('Warthog (+20H)',69,14);
    this.shopItems[this.shopItems.length] = new Array('Cocunut Crab (+3A)',84,14);
    this.shopItems[this.shopItems.length] = new Array('Malayan Tiger',85,14);
    this.shopItems[this.shopItems.length] = new Array('Raccoon (+3D)',86,14);
    this.shopItems[this.shopItems.length] = new Array('Snow Monkey',87,14);
    this.shopItems[this.shopItems.length] = new Array('Wildebeest (+20H)',88,14);
    // Italy
    this.shopItems[this.shopItems.length] = new Array('Escalation (47/37)',2635,99);
    this.shopItems[this.shopItems.length] = new Array('Officer\'s Jacket (48/40)',2636,99);
    this.shopItems[this.shopItems.length] = new Array('Osprey (52/24)',2637,99);
    this.shopItems[this.shopItems.length] = new Array('Conchiglia (35/55) (+1E)',2638,99);
    this.shopItems[this.shopItems.length] = new Array('Coccodrillo (57/40) (+1S)',2639,99);
    this.shopItems[this.shopItems.length] = new Array('Bear-Proof Suit (55/65) (+2S) Cost:10RP',2665,99);
    this.shopItems[this.shopItems.length] = new Array('Tiger Claw (73/56) (+30H) Cost:15RP',2666,99);
    this.shopItems[this.shopItems.length] = new Array('Un Tuono (60/49)',2640,99);
    this.shopItems[this.shopItems.length] = new Array('Water Truck (45/64) (+5H)',2641,99);
    this.shopItems[this.shopItems.length] = new Array('Antiproiettil (66/52)',2642,99);
    this.shopItems[this.shopItems.length] = new Array('Bolla (68/55) (+2A)',2643,99);
    this.shopItems[this.shopItems.length] = new Array('Lantern Fish (72/51) (+2E)',2663,99);
    this.shopItems[this.shopItems.length] = new Array('Pirahna XE (72/55) (+1A/+1D)',2664,99);
    this.shopItems[this.shopItems.length] = new Array('Fanteria (23/71) (+2D)',2644,99);
    this.shopItems[this.shopItems.length] = new Array('Good Neighbor (70/47) (+5H)',2658,99);
    this.shopItems[this.shopItems.length] = new Array('Raven (53/69) (+1E)',2659,99);
    this.shopItems[this.shopItems.length] = new Array('Pitch Car (50/70) (+1A)',2660,99);
    this.shopItems[this.shopItems.length] = new Array('Pesce Spada (71/35) (+1S)',2661,99);
    this.shopItems[this.shopItems.length] = new Array('Pair of Armored Shoulder Pads (43/71) (+1D)',2662,99);
    // Brazil
    this.shopItems[this.shopItems.length] = new Array('Local Informant',2684,2);
    this.shopItems[this.shopItems.length] = new Array('Gas Can',2683,2);
    this.shopItems[this.shopItems.length] = new Array('Untraceable Cell Phone',64,2);
    this.shopItems[this.shopItems.length] = new Array('Button Camera',2681,2);
    this.shopItems[this.shopItems.length] = new Array('Concealable Camera',62,2);
    this.shopItems[this.shopItems.length] = new Array('Radio Phone',2680,2);
    this.shopItems[this.shopItems.length] = new Array('Satellite Phone',1534,2);
    this.shopItems[this.shopItems.length] = new Array('Satchel Charge',2682,2);
    this.shopItems[this.shopItems.length] = new Array('Computer Set-Up',63,2);
    this.shopItems[this.shopItems.length] = new Array('Alarm Code',2027,2);
    this.shopItems[this.shopItems.length] = new Array('Aesculapian Snake (50/26)',5580,3);
    this.shopItems[this.shopItems.length] = new Array('Horny Toad ATV (28/52)',5581,3);
    this.shopItems[this.shopItems.length] = new Array('Croc Skin Jacket (54/29)',5582,3);
    this.shopItems[this.shopItems.length] = new Array('Buckeye (29/56)',5583,3);
    this.shopItems[this.shopItems.length] = new Array('Ostrich (59/31)',5584,3);
    this.shopItems[this.shopItems.length] = new Array('Frog Spear (33/62)',5585,3);
    this.shopItems[this.shopItems.length] = new Array('Argiope Net Gun (65/35)',5586,3);
    this.shopItems[this.shopItems.length] = new Array('Puma (36/68)',5587,3);
    this.shopItems[this.shopItems.length] = new Array('Scaled Gauntlet (71/41)',5588,3);
    this.shopItems[this.shopItems.length] = new Array('Antler Cannon (44/75)',5589,3);
    
    this.shopItemsLoaded = true;
  };
  
  // Name, favorid, favortype, Victory Coins, RP
  this.loadFightClubItems = function() {
    if (this.fightClubLoaded == true) return;
    this.FCItems[this.FCItems.length] = new Array('Fighter\'s Energy Refill',0,6,100,5);
    this.FCItems[this.FCItems.length] = new Array('Fighter\'s Energy Refill',1,6,400,0);
    this.FCItems[this.FCItems.length] = new Array('Bomb Helmet (32/52)',2,6,200,0);
    this.FCItems[this.FCItems.length] = new Array('Bomb Helmet (32/52)',3,6,100,5);
    this.FCItems[this.FCItems.length] = new Array('Red Back Spider (33/53)',4,6,200,0);
    this.FCItems[this.FCItems.length] = new Array('Red Back Spider (33/53)',5,6,100,5);
    this.FCItems[this.FCItems.length] = new Array('SK 7 Shorty (54/34)',6,6,200,0);
    this.FCItems[this.FCItems.length] = new Array('SK 7 Shorty (54/34)',7,6,100,5);
    this.FCItems[this.FCItems.length] = new Array('Buzzsaw (55/35)',8,6,200,0);
    this.FCItems[this.FCItems.length] = new Array('Buzzsaw (55/35)',9,6,100,5);
    this.FCItems[this.FCItems.length] = new Array('Panel Vest (56/36)',10,6,200,0);
    this.FCItems[this.FCItems.length] = new Array('Panel Vest (56/36)',11,6,100,5);
    this.FCItems[this.FCItems.length] = new Array('Fire Ants (x5)',12,6,50,0);
    this.FCItems[this.FCItems.length] = new Array('Nile Crocodile (57/37)',13,6,200,0);
    this.FCItems[this.FCItems.length] = new Array('Quest 38 (40/62)',14,6,300,0);
    this.FCItems[this.FCItems.length] = new Array('Caltrops (x5)',15,6,100,0);
    this.FCItems[this.FCItems.length] = new Array('Worst Nightmare (63/50)',16,6,300,0);
    this.FCItems[this.FCItems.length] = new Array('Bullet Concerto (63/45)',17,6,300,0);
    this.FCItems[this.FCItems.length] = new Array('Chrome Essence (64/38)',18,6,300,0);
    this.FCItems[this.FCItems.length] = new Array('Snowy Owl (67/41)',19,6,300,0);
    this.FCItems[this.FCItems.length] = new Array('Duality (68/48)',20,6,300,0);
    this.FCItems[this.FCItems.length] = new Array('Breath Of Fresh Air (24/70)',21,6,300,0);
    this.FCItems[this.FCItems.length] = new Array('Silinced Sniper Rifle (70/28)',22,6,300,0);
    this.FCItems[this.FCItems.length] = new Array('Glass Knuckles (x5)',23,6,100,0);
    this.FCItems[this.FCItems.length] = new Array('Glance 32 SR (33/72)',24,6,400,0);
    this.FCItems[this.FCItems.length] = new Array('Hazard Gear (35/71)',25,6,400,0);
    this.FCItems[this.FCItems.length] = new Array('The Fates (72/50)',26,6,400,0);
    this.FCItems[this.FCItems.length] = new Array('Thresher Shark (73/54)',27,6,500,0);
    this.FCItems[this.FCItems.length] = new Array('Splint Greaves (28/73)',28,6,500,0);
    this.FCItems[this.FCItems.length] = new Array('Slaying Moon (98/63)',29,6,750,0);
    this.FCItems[this.FCItems.length] = new Array('Reed Runner(65/99)',30,6,750,0);
    this.FCItems[this.FCItems.length] = new Array('Rugged Tactics Vest (70/92)',31,6,750,0);
    this.FCItems[this.FCItems.length] = new Array('Himalayan Wolf (70/96)',32,6,750,0);
    this.FCItems[this.FCItems.length] = new Array('Angel Arm (64/96)',33,6,750,0);
    this.FCItems[this.FCItems.length] = new Array('Gothic Boots(100/64)',34,6,750,0);
    this.FCItems[this.FCItems.length] = new Array('Hellion (100/63)',35,6,750,0);
    this.FCItems[this.FCItems.length] = new Array('Cheetah (99/65)',36,6,750,0);
    
    this.fightClubLoaded = true;
  };
  
};

/***************************************
 Global Functions 
****************************************/
// Replaces getElementById
function e$(str)  {
  var obj=document.getElementById(str);return obj?obj:null;
}

/***************************************
 String prototype functions 
****************************************/
// Existing Library Extensions
String.prototype.count=function(s1) {return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;};
String.prototype.findx=function(s1,numtofind) {
  var indices=[],data,exp=(typeof s1=='string'?new RegExp(s1,'g'):s1);
  while ((data=exp.exec(this)))
    indices.push(data.index);
  return(indices[numtofind-1]>=0?indices[numtofind-1]:null);
};

/***************************************
 AJAX Library 
****************************************/
/* Simple AJAX Code-Kit (SACK) v1.6.1 */
/* ©2005 Gregory Wild-Smith */
/* www.twilightuniverse.com */
/* Software licenced under a modified X11 licence,
   see documentation or authors website for more details */

function sack(file) {
  this.xmlhttp = null;

  this.resetData = function() {
    this.method = "POST";
    this.queryStringSeparator = "?";    
    this.argumentSeparator = "&";
    this.URLString = "";
    this.encodeURIString = true;
    this.execute = false;
    this.element = null;
    this.elementObj = null;
    this.requestFile = file;
    this.vars = new Object();
    this.responseStatus = new Array(2);
  };

  this.resetFunctions = function() {
    this.onLoading = function() { };
    this.onLoaded = function() { };
    this.onInteractive = function() { };
    this.onCompletion = function() { };
    this.onError = function() { };
    this.onFail = function() { };
  };

  this.reset = function() {
    this.resetFunctions();
    this.resetData();
  };

  this.createAJAX = function() {
    try {
      this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e1) {
      try {
        this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
        this.xmlhttp = null;
      }
    }

    if (! this.xmlhttp) {
      if (typeof XMLHttpRequest != "undefined") {
        this.xmlhttp = new XMLHttpRequest();
      } else {
        this.failed = true;
      }
    }
  };

  this.setVar = function(name, value){
    this.vars[name] = Array(value, false);
  };

  this.encVar = function(name, value, returnvars) {
    if (true == returnvars) {
      return Array(encodeURIComponent(name), encodeURIComponent(value));
    } else {
      this.vars[encodeURIComponent(name)] = Array(encodeURIComponent(value),true);
    }
  };

  this.processURLString = function(string, encode) {
    encoded = encodeURIComponent(this.argumentSeparator);
    regexp = new RegExp(this.argumentSeparator + "|" + encoded);
    varArray = string.split(regexp);
    for (i = 0; i < varArray.length; i++){
      urlVars = varArray[i].split("=");
      if (true == encode){
        this.encVar(urlVars[0], urlVars[1]);
      } else {
        this.setVar(urlVars[0], urlVars[1]);
      }
    }
  };

  this.createURLString = function(urlstring) {
    if (this.encodeURIString && this.URLString.length) {
      this.processURLString(this.URLString, true);
    }

    if (urlstring) {
      if (this.URLString.length) {
        this.URLString += this.argumentSeparator + urlstring;
      } else {
        this.URLString = urlstring;
      }
    }

    // prevents caching of URLString
    this.setVar("rndval", new Date().getTime());
    urlstringtemp = new Array();
    for (key in this.vars) {
      if (false == this.vars[key][1] && true == this.encodeURIString) {
        encoded = this.encVar(key, this.vars[key][0], true);
        delete this.vars[key];
        this.vars[encoded[0]] = Array(encoded[1], true);
        key = encoded[0];
      }

      urlstringtemp[urlstringtemp.length] = key + "=" + this.vars[key][0];
    }
    if (urlstring){
      this.URLString += this.argumentSeparator + urlstringtemp.join(this.argumentSeparator);
    } else {
      this.URLString += urlstringtemp.join(this.argumentSeparator);
    }
  };

  this.runResponse = function() {
    eval(this.response);
  }

  this.runAJAX = function(urlstring) {
    if (this.failed) {
      this.onFail();
    } else {
      this.createURLString(urlstring);
      if (this.element) {
        this.elementObj = document.getElementById(this.element);
      }
      if (this.xmlhttp) {
        var self = this;
        if (this.method == "GET") {
          totalurlstring = this.requestFile + this.queryStringSeparator + this.URLString;
          this.xmlhttp.open(this.method, totalurlstring, true);
        } else {
          this.xmlhttp.open(this.method, this.requestFile, true);
          try {
            this.xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
          } catch (e) { }
        }

        this.xmlhttp.onreadystatechange = function() {
          switch (self.xmlhttp.readyState) {
            case 1:
              self.onLoading();
              break;
            case 2:
              self.onLoaded();
              break;
            case 3:
              self.onInteractive();
              break;
            case 4:
              self.response = self.xmlhttp.responseText;
              self.responseXML = self.xmlhttp.responseXML;
              self.responseStatus[0] = self.xmlhttp.status;
              self.responseStatus[1] = self.xmlhttp.statusText;

              if (self.execute) {
                self.runResponse();
              }

              if (self.elementObj) {
                elemNodeName = self.elementObj.nodeName;
                elemNodeName.toLowerCase();
                if (elemNodeName == "input" || elemNodeName == "select" || elemNodeName == "option" || elemNodeName == "textarea") {
                  self.elementObj.value = self.response;
                } else {
                  self.elementObj.innerHTML = self.response;
                }
              }
              if (self.responseStatus[0] == "200") {
                self.onCompletion();
              } else {
                self.onError();
              }

              self.URLString = "";
              break;
          }
        };

        this.xmlhttp.send(this.URLString);
      }
    }
  };

  this.reset();
  this.createAJAX();
};

/***************************************
 WINDOW UTILITY Functions 
****************************************/
function ogpWindowUtilsDef() {

  this.MoveNode = function(oldElement, newElement, newAsClone, optionalWhere){
    if(typeof oldElement=="string"){oldElement=document.getElementById(oldElement);};
    if(typeof newElement=="string"){newElement=document.getElementById(newElement);};
    if(!oldElement || !newElement){return null;};
    var optionalWhereWasPassedAsNode=(typeof optionalWhere=="object" && optionalWhere/*not object NULL*/)?true:false;
    var removed=(!newAsClone)?
    newElement.parentNode.removeChild(newElement):newElement.cloneNode(true);
    optionalWhere=(optionalWhere==="")?null:optionalWhere;
    if(!isNaN(parseFloat(optionalWhere))){
    optionalWhere=parseFloat(optionalWhere);
	    if(optionalWhere<0 || optionalWhere>=oldElement.childNodes.length){optionalWhere=null;}
	    else{optionalWhere=oldElement.childNodes[optionalWhere];};
    };
    if(typeof optionalWhere!="undefined" && typeof optionalWhere!="object"/*includes null*/){optionalWhere=null;};
    if(optionalWhereWasPassedAsNode){/*maybe optionalWhere does not belong to oldElement, therefore is unfit for: oldElement.insertBefore; verify:*/
    var optionalWhereBelongsTo_oldElement=false;
    var optionalWhere2=optionalWhere;
	    while(optionalWhere2.parentNode){
	    optionalWhere2=optionalWhere2.parentNode;
		    if(optionalWhere2==oldElement){optionalWhereBelongsTo_oldElement=true; break;};
	    }
	    if(!optionalWhereBelongsTo_oldElement){optionalWhere=null;/*null defaults to: append*/};
    };
    return (typeof optionalWhere=="undefined")?
    oldElement.parentNode.replaceChild(removed, oldElement)/*oldElement replaced by newElement (or its clone)*/:
    (optionalWhere===null)?oldElement.appendChild(removed)/*newElement (or its clone) appended after optionalWhere*/:
    oldElement.insertBefore(removed, optionalWhere)/*newElement (or its clone) inserted before optionalWhere*/;
    /* keep this comment to reuse freely:
    http://www.fullposter.com/?1 */
  };
};

Date.prototype.formatDate = function(format)
{
    var date = this;
    if (!format)
      format="MM/dd/yyyy";               
 
    var month = date.getMonth() + 1;
    var year = date.getFullYear();    
 
    format = format.replace("MM",month.toString().padL(2,"0"));        
 
    if (format.indexOf("yyyy") > -1)
        format = format.replace("yyyy",year.toString());
    else if (format.indexOf("yy") > -1)
        format = format.replace("yy",year.toString().substr(2,2));
 
    format = format.replace("dd",date.getDate().toString().padL(2,"0"));
 
    var hours = date.getHours();       
    if (format.indexOf("t") > -1)
    {
       if (hours > 11)
        format = format.replace("t","pm")
       else
        format = format.replace("t","am")
    }
    if (format.indexOf("HH") > -1)
        format = format.replace("HH",hours.toString().padL(2,"0"));
    if (format.indexOf("hh") > -1) {
        if (hours > 12) hours - 12;
        if (hours == 0) hours = 12;
        format = format.replace("hh",hours.toString().padL(2,"0"));        
    }
    if (format.indexOf("mm") > -1)
       format = format.replace("mm",date.getMinutes().toString().padL(2,"0"));
    if (format.indexOf("ss") > -1)
       format = format.replace("ss",date.getSeconds().toString().padL(2,"0"));
    return format;
}
String.repeat = function(chr,count)
{    
    var str = ""; 
    for(var x=0;x<count;x++) {str += chr}; 
    return str;
}
String.prototype.padL = function(width,pad)
{
    if (!width ||width<1)
        return this;   
 
    if (!pad) pad=" ";        
    var length = width - this.length
    if (length < 1) return this.substr(0,width);
 
    return (String.repeat(pad,length) + this).substr(0,width);    
}    
String.prototype.padR = function(width,pad)
{
    if (!width || width<1)
        return this;        
 
    if (!pad) pad=" ";
    var length = width - this.length
    if (length < 1) this.substr(0,width);
 
    return (this + String.repeat(pad,length)).substr(0,width);
} 
/********************
  COOKIE Functions 
********************/
function OGPCookieDef() {
  this.createCookie = function(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; domain=.facebook.mafiawars.zynga.com; path=/";
  };

  this.readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
  };

  this.eraseCookie = function(name) {
	OGPCookie.createCookie(name,"",-1);
  };
};

/***************************************
  SCRIPT Initialization Function Calls 
****************************************/
// Create all of the objects
var OGPMain = new ogpMainDef();
var OGPConfig = new ogpConfigDef();
var OGPItems = new ogpItemsDef();
var OGPDisplay = new ogpDisplayDef();
var OGPProperty = new ogpPropertyDef();
var OGPParser = new ogpParserDef();
var OGPAjax = new ogpAJAXDef();
var OGPTimers = new ogpTimersDef();
var OGPString = new ogpStringDef();
var OGPTravel = new ogpTravelDef();
var OGPWindowUtils = new ogpWindowUtilsDef();
var OGPSend = new ogpSendDef();
var OGPCookie = new OGPCookieDef();
var OGPAccount = new ogpAccountDef();
var OGPDrone = new ogpDroneRunnerDef();
var OGPMinipack = new ogpMinipackDef();
var OGPJob = new ogpJobDef();
var OGPFight = new ogpFightDef();
var OGPStream = new ogpStreamDef();

// Setup the tools
OGPMain.initialize();