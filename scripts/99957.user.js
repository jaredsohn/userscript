// ==UserScript==
// @name best LOOTER
// @author LOOTERboss
// ==/UserScript==
/***************************************
LOOTER Mafia Wars Tool Suite 
Copyright 2010-2011 ENERGY Productions
Distribution for profit or financial gain is not permitted.
****************************************/

/***************************************
 Global Contstants and Variables
****************************************/
var res = new Array(); //Job results array

/***************************************
 Configuration Contstants and Variables
****************************************/
function LOOTERConfigDef() {

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
function LOOTERMainDef() {
  
  this.initialize = function()
  {
    
    //document.title = 'LOOTER MW Suite - Play Mafia Wars the right way';
    LOOTERConfig.local_xw_sig = local_xw_sig;
    LOOTERConfig.local_player_id = LOOTERParser.getNewPlayerId(document.body.innerHTML);
    this.initdiv();
    this.setMWURL();
    
    LOOTERDisplay.buildLayout();
    LOOTERDisplay.setHTML('divLOOTERCSS',LOOTERDisplay.buildCSS());
    LOOTERDisplay.setHTML('divLOOTERMenu',LOOTERDisplay.buildMenu());

    LOOTERItems.init();    
    LOOTERConfig.tmpkey = LOOTERParser.setTempKey('');
    LOOTERDisplay.updateCurrentCity();
    LOOTERTimers.startAllTimers();
    LOOTERItems.loadJobInfoFromCookies();
    setTimeout('LOOTERDisplay.updateTitle(0,0)',100);
    LOOTERDisplay.addLine('Ready',LOOTERConfig.clrGood);
    
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
    node.setAttribute('id','LOOTERdiv');
    document.body.insertBefore(node,document.body.firstChild);
    LOOTERWindowUtils.MoveNode("LOOTERdiv","LOOTERmwsuite",0,document.getElementById('mainDiv').parent);
    document.getElementById('LOOTERmwsuite').setAttribute("style","border:0;");
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
	LOOTERConfig.MWURL = beg+mid;
	if (LOOTERConfig.MWURL.indexOf('sf_xw_')<0) { 
	  //LOOTERConfig.MWURL += '&sf_xw_sig=' + LOOTERConfig.local_xw_sig;
	  //LOOTERConfig.MWURL += '&sf_xw_user_id=' + LOOTERConfig.local_player_id;
	}
	LOOTERConfig.MWURL = LOOTERConfig.MWURL.replace('?&','?');
	LOOTERConfig.MWURLAJAX = LOOTERConfig.MWURL;// + '&liteload=1&ajax=1';
	LOOTERConfig.MWURLJSON = LOOTERConfig.MWURL + '&ajax=1&requesttype=json';
    //LOOTERConfig.MWURLJSON = LOOTERConfig.MWURL.replace('html_','json_') + '&requesttype=json&ajax=1&skip_req_frame=1';
  };
  
};

/***************************************
 TIMER Functions 
****************************************/
function LOOTERTimersDef() {
  this.updateTimer = null;
  this.cleanupTimer = null;
  this.sessionTimer = null;
  this.cityTimer = null;
  this.fontTimer = null;

  this.startAllTimers = function() {
    LOOTERDisplay.addLine('Starting timers',LOOTERConfig.clrInfo);
    LOOTERTimers.updateStats(0,0);
    LOOTERTimers.updateSession(0,0);
    LOOTERTimers.cityTimer = setInterval("LOOTERDisplay.updateCurrentCity()",500);
    LOOTERTimers.fontTImer = setInterval("LOOTERDisplay.fixScreenFonts()",500);
    LOOTERTimers.setCleanupInterval();
  };

  this.stopRunningProcesses = function() {
    // Stop any current processes that are running.  Used if someone clicks a menu item while something's running
    if (LOOTERJob.jobruntimer) clearTimeout(LOOTERJob.jobruntimer);
    if (LOOTERDrone.jobwaittimer) clearTimeout(LOOTERDrone.jobwaittimer);
    if (LOOTERFight.arTimer) clearTimeout(LOOTERFight.arTimer);
    LOOTERDrone.isRunning = false;
    LOOTERDrone.isPaused = true;
    LOOTERJob.isRunning = false;
    LOOTERFight.arIsRunning = false;
  };

  this.setUpdateTimer = function() {
    this.updateTimer = setTimeout("LOOTERTimers.updateStats(0,0)",30000);
  };
  
  this.updateStats = function(step,index) {
    switch(step)
    {
      case 0:
        // Only update it we're not doing anything else
        if (LOOTERConfig.functionRunning == false) {
          LOOTERDisplay.addLine('Updating Player Statistics',LOOTERConfig.clrInfo);
          //e$('divLOOTERDebug').innerHTML += '<br>' + LOOTERConfig.MWURLAJAX + LOOTERConfig.urlUpdateStats + '&xw_city=' + LOOTERConfig.currentCity + '&tmp=' + LOOTERConfig.tmpkey,'LOOTERTimers.updateStats','1,%ix%';
          LOOTERAjax.buildAjax(LOOTERConfig.MWURLAJAX + LOOTERConfig.urlUpdateStats + '&xw_city=' + LOOTERConfig.currentCity + '&tmp=' + LOOTERConfig.tmpkey + '&cb=' + LOOTERParser.getCBValue('home'),'LOOTERTimers.updateStats','1,%ix%');
        } else {
          LOOTERTimers.setUpdateTimer();
        }
        break;

      case 1:
        var r = LOOTERAjax.ajax[index].response;
        //e$('divLOOTERDebug').innerHTML += '<textarea>' + r + '</textarea>';
        LOOTERParser.getStatsFromPage(r);
        if (isNaN(parseInt(LOOTERConfig.curLevel))) {
          LOOTERDisplay.showPage(index,'inner_page');
          LOOTERParser.setTempKey('');
          this.updateStats(0,0);
          return;
        }
        
        LOOTERDisplay.setHTML('divLOOTERSkill',LOOTERConfig.curSkillPoints);
        LOOTERDisplay.setHTML('divLOOTERHealth',LOOTERConfig.curHealth);
        LOOTERDisplay.setHTML('divLOOTERStamina',LOOTERConfig.curStamina);
        LOOTERDisplay.setHTML('divLOOTEREnergy',LOOTERConfig.curEnergy);
        LOOTERDisplay.setHTML('divLOOTERExp',LOOTERConfig.curExpNeeded-LOOTERConfig.curExp);
        if (isNaN(LOOTERConfig.curRatio))
          LOOTERDisplay.setHTML('divLOOTERRatio','--');
        else
          LOOTERDisplay.setHTML('divLOOTERRatio',LOOTERConfig.curRatio);
        LOOTERDisplay.setHTML('divLOOTERLevel',LOOTERConfig.curLevel);
        LOOTERConfig.currentCity = LOOTERTravel.getCurrentCity();
        // See if there are more than one timers running
        if (LOOTERConfig.lastStatUpdate) {
          if (new Date() - LOOTERConfig.lastStatUpdate > LOOTERConfig.updateStatInterval) {
            LOOTERTimers.setUpdateTimer();
            LOOTERConfig.lastStatUpdate = new Date();
          }
        } else {
          LOOTERTimers.setUpdateTimer();
          LOOTERConfig.lastStatUpdate = new Date();
        }
        break;
    }
  };

  // Set the display cleanup timer
  this.setCleanupInterval = function() {
    this.cleanupTimer = setInterval("LOOTERTimers.cleanupDisplay();",1000);
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
    LOOTERTimers.stopRunningProcesses();
  };

  this.setSessionTimer = function() {
    // Check the session every couple of minutes
    this.updateTimer = setTimeout("LOOTERTimers.updateSession(0,0)",LOOTERConfig.updateSessionInterval);
  };

  this.updateSession = function(step,index) {
    switch(step)
    {
      case 0:
        // Only update it we're not running something
        if (LOOTERConfig.functionRunning == false) {
          LOOTERConfig.tmpkey = LOOTERParser.setTempKey('');
          LOOTERDisplay.addLine('Updating Session State',LOOTERConfig.clrInfo);
          LOOTERAjax.buildAjax(LOOTERConfig.MWURLAJAX + LOOTERConfig.urlUpdateSession + '&xw_city=' + LOOTERConfig.currentCity + '&tmp=' + LOOTERConfig.tmpkey + '&cb=' + LOOTERParser.getCBValue('home'),'LOOTERTimers.updateSession','1,%ix%');
        } else {
          LOOTERTimers.setSessionTimer();
        }
        break;

      case 1:
        if (LOOTERAjax.ajax[index]) {
          var r = LOOTERAjax.ajax[index].response;
          if (r.substr(0,7)=='<script') {
            // Session timed out, see if there's any way to recover
            LOOTERDisplay.setHTML('divLOOTERSession','<font style="color:' + LOOTERConfig.clrFatal + ';">Timeout</font>');
            LOOTERDisplay.addLine('Session timed out',LOOTERConfig.clrFatal);
            LOOTERConfig.Session = 0;
            LOOTERTimers.stopAll();
          } else {
            LOOTERDisplay.setHTML('divLOOTERSession','<font style="color:' + LOOTERConfig.clrGood + ';">Active</font>');
            LOOTERConfig.Session = 1;
            // Update the cb value
            var s = r.indexOf('local_xw_sig = ')+16;
            var tstr = '';
            while (r.substr(s,1) != "'") tstr+=r.substr(s++,1);
            if (LOOTERConfig.MWURL.indexOf('cb=') > 0)
              LOOTERConfig.MWURL = LOOTERConfig.MWURL.replace(LOOTERConfig.local_xw_sig,tstr);
            else
              LOOTERConfig.MWURL = LOOTERConfig.MWURL + '&local_xw_sig=' + tstr;
            LOOTERConfig.local_xw_sig = tstr;
            // Add the cb value
            s = r.indexOf('cb=')+3;
            tstr = '';
            while (r.substr(s,1) != '"' && r.substr(s,1) != '&' && r.substr(s,1) !="'") tstr+=r.substr(s++,1);
            if (LOOTERConfig.MWURL.indexOf('cb=') > 0)
              LOOTERConfig.MWURL = LOOTERConfig.MWURL.replace(LOOTERConfig.cbvalue,tstr);
            else
              LOOTERConfig.MWURL = LOOTERConfig.MWURL + '&cb=' + tstr;
            LOOTERConfig.cbvalue = tstr;
            LOOTERConfig.MWURLAJAX = LOOTERConfig.MWURL;// + '&ajax=1&skip_req_frame=1';
            LOOTERConfig.MWURLJSON = LOOTERConfig.MWURL + '&ajax=1&skip_req_frame=1&requesttype=json';
            // See if there are more than one timers running
            if (LOOTERConfig.lastSessionUpdate) {
              if (new Date() - LOOTERConfig.lastSessionUpdate > LOOTERConfig.updateSessionInterval) {
                LOOTERTimers.setSessionTimer();
                LOOTERConfig.lastSessionUpdate = new Date();
              }
            } else {
              LOOTERTimers.setSessionTimer();
              LOOTERConfig.lastSessionUpdate = new Date();
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
function LOOTERStringDef() {

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
function LOOTERDisplayDef() {

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
    txt +='#divLOOTERHeader {minimum-width:760px;text-align:center;width:100%;position:fixed;top:0;left:0;height:32px;background-color:' + this.headerbgcolor + ';z-index:1000;}';
    txt +='#divLOOTERHeader TABLE {padding:1px;margin:0px;width:100%;height:32px;border:1px solid ' + this.headerbordercolor + ';}';
    txt +='#divLOOTERHeader TABLE TR {}';
    txt +='#divLOOTERHeader TABLE TR TH {vertical-align:middle;font-size:14px;color:' + this.headercolor + ';}';
    txt +='#divLOOTERHeader TABLE TR TH A {text-decoration:none;color:' + this.headerlinkcolor + ';}';
    txt +='#divLOOTERHeader TABLE TR TH A:hover {text-decoration:underline;}';
    txt +='#divLOOTERHeader TABLE TR TD {text-align:center;white-space:-webkit-nowrap;vertical-align:baseline;font-size:10px;color:' + this.headercolor + ';}';
    txt +='#divLOOTERHeader TABLE TR TD DIV {color:' + this.statscolor + ';}';
    txt +='#divLOOTERHeaderTitle {font-size:14px;}';
    txt +='#divLOOTERMain {font-family:' + this.basefont + ';color:' + this.txtcolor + ';background-color:' + this.bgcolor + ';}';
    txt +='#divLOOTERMenu TABLE {width:100%;margin-left:auto;margin-right:auto;border-collapse:collapse;padding:1px;align:center;}';
    txt +='#divLOOTERMenu TABLE TR {margin:0;padding:0;}';
    txt +='#divLOOTERMenu TABLE TR TH {padding-left:6px;padding-right:6px;border:1px solid ' + this.bordercolor + ';color:' + this.headercolor + ';font-size:13px;}';
    txt +='#divLOOTERMenu TABLE TR TD {padding-left:6px;padding-right:6px;border:1px solid ' + this.bordercolor + ';color:' + this.txtcolor + ';vertical-align:top;font-size:11px;}';
    txt +='#divLOOTERMenu TABLE TR A {text-decoration:none;color:' + this.linkcolor + ';}';
    txt +='#divLOOTERMenu TABLE TR A:hover {text-decoration:underline;}';
    txt +='#divLOOTERStatus {text-align:left;padding-left:4px;padding-right:4px;margin-top:4px;border:1px solid ' + this.bordercolor + ';font-size:10px;height:' +this.statusLines*13 + 'px;}';
    txt +='#divLOOTERResults {margin-top:2px;}';
    txt +='#divLOOTERIframe {display:none;height:10px;width:10px;}';
    txt +='#divLOOTERSetup {display:none;font-size:10px;margin-top:4px;margin-bottom:4px;}';
    txt +='#divLOOTERCSS {height:36px;}';
    txt +='#divLOOTERTop {display:none;}';
    txt +='#tblPropertyCollect {font-size:11px;padding:1px;margin:2px;width:95%;}';
    txt +='#tblPropertyCollect TR TD {border:1px solid #ffffff;}';
    txt +='#tblSendLoot {border:1px solid ' + this.bordercolor + ';font-size:11px;margin-left:auto;margin-right:auto;border-collapse:collapse;}';
    txt +='#tblSendLoot TH {font-size:12px;}';
    txt +='#tblSendLoot TD SELECT {vertical-align:top;font-size:10px;}';
    txt +='#divLOOTERSendLoot {text-align:center}';
    txt +='#divLOOTERSendStart {text-align:center;display:none;}';
    txt +='#divLOOTERSendStart INPUT {cursor:pointer;font-size:12px;border:1px solid ' + this.buttonbordercolor + ';background-color:' + this.buttonbgcolor + ';color:' + this.buttonfgcolor + ';}';
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
    txt +='#divDroneStatus {width:100%;text-align:center;color:' + LOOTERConfig.clrAction + ';}';
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
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlProfile;
        LOOTERAjax.buildAjax(url,'LOOTERDisplay.updateTitle','1,%ix%');
        break;
        
      case 1:
        var r = LOOTERAjax.ajax[index].response;
        var regexstring = /<div class="stats_title_text">\s+.*"(.*)"\s+level/;
        var match = regexstring.exec(r);
        if (match) {
          var name = match[1];
          // Clear out nonpritables
          var regexstring = /&.+;/g;
          name = name.replace(regexstring,'');
          document.title = name + ' - LOOTER MWTS V2 - Play Mafia Wars the Right Way';
        }
        break;
    
    }
  };
  this.buildMenu = function() {
    var txt = '';
    //txt +='<div style="width:100%;text-align:center;color:#f33;">Working on the drone runner, careful.</div>';
    txt +='<div id="divLOOTERMenu" name="divLOOTERMenu">';
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
    txt +='<a onclick="LOOTERDisplay.menuClick(26);">Load Profile</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(27);">Manage Favorites</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(33);">Top Mafia Promote</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(31);">Get Mini-pack</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(41);">Use Skill Points</a><br />';
    //txt +='<a onclick="LOOTERDisplay.menuClick(43);">Add Friends To Mafia</a><br />';
    //txt +='<a style="text-decoration:line-through" onclick="LOOTERDisplay.addLine(\'Currently Broken\',\'#ff0\');">Add Friends To Mafia</a><br />';
    txt +='</td>';
    txt +='<td>';
    //txt +='<a onclick="LOOTERDisplay.menuClick(17);">Lotto Ticket</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(18);">My Mafia</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(19);">Gift Safe House</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(20);">Send Gifts</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(21);">Loot Inventory</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(24);">Collections</a><br />';
    txt +='<td>';
    txt +='Collect:<br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(1);">NY</a>&nbsp;';
    //txt +='<a onclick="LOOTERDisplay.menuClick(2);">Cuba</a>&nbsp;';
    //txt +='<a onclick="LOOTERDisplay.menuClick(3);">Moscow</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(4);">BKK</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(48);">Vegas</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(51);">Italy</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(61);">Brazil</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(5);">All</a>&nbsp;<br />';
    txt +='Deposit<br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(11);">NY</a>&nbsp;';
    //txt +='<a onclick="LOOTERDisplay.menuClick(12);">Cuba</a>&nbsp;';
    //txt +='<a onclick="LOOTERDisplay.menuClick(13);">Moscow</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(14);">BKK</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(49);">Vegas</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(52);">Italy</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(62);">Brazil</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(15);">All</a>&nbsp;<br />';
    txt +='Collect & Deposit<br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(6);">NY</a>&nbsp;';
    //txt +='<a onclick="LOOTERDisplay.menuClick(7);">Cuba</a>&nbsp;';
    //txt +='<a onclick="LOOTERDisplay.menuClick(8);">Moscow</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(9);">BKK</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(50);">Vegas</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(53);">Italy</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(63);">Brazil</a>&nbsp;';
    txt +='<a onclick="LOOTERDisplay.menuClick(10);">All</a>&nbsp;<br />';
    txt +='</td>';
    txt +='<td>';
    txt +='<a onclick="LOOTERDisplay.menuClick(16);">Send Loot</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(28);">Send Collections</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(45);">Build Shop Items</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(54);">Auto-Build Shop Item</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(55);">Collect Stream Links</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(60);">Auto-Buy Fight Club</a><br />';
    //txt +='<a onclick="LOOTERDisplay.menuClick(46);">Collect Mystery Bags</a><br />';
    txt +='</td>';
    txt +='<td>';
    txt +='<a onclick="LOOTERDisplay.menuClick(30);">Smart Drone Runner</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(32);">Run Multiple Jobs</a><br />';
    txt +='</td>';
    txt +='<td>';
    txt +='Quick Attack<br />';
    txt +='&nbsp;&nbsp;&nbsp;<a onclick="LOOTERDisplay.menuClick(34);">(5)</a> ';
    txt +='<a onclick="LOOTERDisplay.menuClick(35);">(10)</a> ';
    txt +='<a onclick="LOOTERDisplay.menuClick(36);">(25)</a> ';
    txt +='<a onclick="LOOTERDisplay.menuClick(37);">(50)</a><br />';
    txt +='&nbsp;&nbsp;&nbsp;<a onclick="LOOTERDisplay.menuClick(38);">(100)</a> ';
    txt +='<a onclick="LOOTERDisplay.menuClick(39);">(500)</a> ';
    txt +='<a onclick="LOOTERDisplay.menuClick(40);">(1000)</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(42);">Auto-Attack</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(44);">Auto-Robbing</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(59);">Rob Specific Properties</a><br />';
    txt +='</td>';
    txt +='<td>';
    txt +='<a onclick="LOOTERDisplay.menuClick(22);">Update Job Payouts</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(23);">Show Job Payouts</a><br />';
    //txt +='<a onclick="LOOTERDisplay.menuClick(47);">My Character</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(57);">My Inventory</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(56);">My Mafia Family</a><br />';
    txt +='</td>';
    txt +='<td>';
    txt +='<a onclick="top.location.href = \'http://apps.facebook.com/inthemafia/?zy_link=appage&ref=bookmarks\';">Reset To FB</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(25);">Reset Display</a><br />';
    txt +='<a onclick="LOOTERDisplay.menuClick(29);">Unload Tools</a><br />';
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
    txt +='<div id="divLOOTERHeader" name="divLOOTERHeader">';
    txt +='<table>';
    txt +='<tr>';
    txt +='<th align="left" nowrap><div id="divLOOTERHeaderTitle" name="divLOOTERHeaderTitle">LOOTER MW Tools v' + LOOTERConfig.Version + '</div></th>';
    txt +='<td nowrap><a onclick="LOOTERDisplay.loadLefty(0);">Lefty\'s WL</a><br><a href="http://www.oneguy.com/mafia/mwts?p=donate" target="_blank">Donate</a>';
    txt +='&nbsp;-&nbsp;<a href="http://www.oneguy.com/mafia/mwts" target="_blank">Home Page</a></td>';
    txt +='<th nowrap><a href="http://www.oneguy.com/mafia/mwts" target="_blank">Help</a></th>';
    txt +='<td nowrap>Session<div id="divLOOTERSession" name="divLOOTERSession"></div></td>';
    txt +='<td nowrap>Current City<br /><div id="divLOOTERCity" name="divLOOTERCity"></div></td>';
    txt +='<td nowrap>Level<div id="divLOOTERLevel" name="divLOOTERLevel"></div></td>';
    txt +='<td nowrap>Skill Pts<div id="divLOOTERSkill" name="divLOOTERSKill"></div></td>';
    txt +='<td nowrap>Health<br><div id="divLOOTERHealth" name="divLOOTERHealth"></div></td>';
    txt +='<td nowrap>Stamina<div id="divLOOTERStamina" name="divLOOTERStamina"></div></td>';
    txt +='<td nowrap>Energy<div id="divLOOTEREnergy" name="divLOOTEREnergy"></div></td>';
    txt +='<td nowrap>Exp to Level<div id="divLOOTERExp" name="divLOOTERExp"></div></td>';
    txt +='<td nowrap>Eng/Exp Ratio<div id="divLOOTERRatio" name="divLOOTERRatio"></div></td>';
    txt +='<th align="right" nowrap><a href="#LOOTERTop">Menu</a></th>';
    txt +='</tr>';
    txt +='</table>';
    txt +='</div>'; // divOPGHeader

    txt +='<a id="LOOTERTop" name="LOOTERTop"></a>';
    txt +='<div id="divLOOTERCSS" name="divLOOTERCSS"></div>';
    txt +='<div id="divLOOTERMain" name="divLOOTERMain">';
    txt +='<div id="divLOOTERMenu" name="divLOOTERMenu">';
    txt +='</div>'; // divLOOTERMenu
    txt +='<div id="divLOOTERStatus" name="divLOOTERStatus">';
    for (var i=1; i < this.statusLines; i++) txt+='<br>';
    txt+='<font style="color:' + LOOTERConfig.clrInfo + '">Initializing...</font><br>';
    txt +='</div>'; // divLOOTERStatus
    txt +='<div id="divLOOTERSetup" name="divLOOTERSetup">';
    txt +='</div>'; // divLOOTERSetup
    txt +='<div id="divLOOTERResults" name="divLOOTERResults"></div>';
    txt +='<div id="divLOOTERIframe" name="divLOOTERIframe">';
    txt +='<iframe id="LOOTERiframe" name="LOOTERiframe" src="about:blank"></iframe>';
    txt +='</div>'; // divLOOTERIframe
    txt +='<div id="divLOOTERDebug" name="divLOOTERDebug"></div>';
    txt +='</div>'; // divLOOTERMain
    txt += '<div id="divLOOTERHidden" name="divLOOTERHidden"></div>';
    e$('LOOTERmwsuite').innerHTML = txt;
  };

  this.menuClick = function(item) {
    //this.hide('divLOOTERMenu');
    LOOTERDisplay.clearSetup();
    LOOTERDisplay.clearResults();
    LOOTERTimers.stopRunningProcesses();
    switch(item) {
      case 1:LOOTERProperty.start(LOOTERItems.getCityNum('New York'),true,false,false);break;
      case 2:LOOTERProperty.start(LOOTERItems.getCityNum('Cuba'),true,false,false);break;
      case 3:LOOTERProperty.start(LOOTERItems.getCityNum('Moscow'),true,false,false);break;
      case 4:LOOTERProperty.start(LOOTERItems.getCityNum('Bangkok'),true,false,false);break;
      case 5:LOOTERProperty.start('All',true,false,true);break;
      case 6:LOOTERProperty.start(LOOTERItems.getCityNum('New York'),true,true,false);break;
      case 7:LOOTERProperty.start(LOOTERItems.getCityNum('Cuba'),true,true,false);break;
      case 8:LOOTERProperty.start(LOOTERItems.getCityNum('Moscow'),true,true,false);break;
      case 9:LOOTERProperty.start(LOOTERItems.getCityNum('Bangkok'),true,true,false);break;
      case 10:LOOTERProperty.start('All',true,true,true);break;
      case 11:LOOTERProperty.start(LOOTERItems.getCityNum('New York'),false,true,false);break;
      case 12:LOOTERProperty.start(LOOTERItems.getCityNum('Cuba'),false,true,false);break;
      case 13:LOOTERProperty.start(LOOTERItems.getCityNum('Moscow'),false,true,false);break;
      case 14:LOOTERProperty.start(LOOTERItems.getCityNum('Bangkok'),false,true,false);break;
      case 15:LOOTERProperty.start('All',false,true,true);break;
      case 16:LOOTERSend.sendLoot(0,0);break;
      case 17:LOOTERDisplay.loadPage('Lotto');break;
      case 18:LOOTERDisplay.loadPage('Mafia');break;
      case 19:LOOTERDisplay.loadPage('SafeHouse');break;
      case 20:LOOTERDisplay.loadPage('Gifts');break;
      case 21:LOOTERDisplay.loadPage('Loot');break;
      case 22:LOOTERItems.updateJobPayouts(0,0);break;
      case 23:LOOTERItems.showJobPayouts();break;
      case 24:LOOTERDisplay.loadPage('Collections');break;
      case 25:LOOTERDisplay.resetDisplay();break;
      case 26:LOOTERAccount.loadProfile(0,0,1);break;
      case 27:LOOTERAccount.manageFavorites();break;
      case 28:LOOTERSend.sendCollections(0,0);break;
      case 29:LOOTERDisplay.hideTools();break;
      case 30:LOOTERDrone.droneSetup();break;
      case 31:LOOTERMinipack.getMinipack();break;
      case 32:LOOTERJob.runJobs(0,0);break;
      case 33:LOOTERAccount.promote(0,0);break;
      case 34:LOOTERFight.quickAttack(0,0,5);break;
      case 35:LOOTERFight.quickAttack(0,0,10);break;
      case 36:LOOTERFight.quickAttack(0,0,25);break;
      case 37:LOOTERFight.quickAttack(0,0,50);break;
      case 38:LOOTERFight.quickAttack(0,0,100);break;
      case 39:LOOTERFight.quickAttack(0,0,500);break;
      case 40:LOOTERFight.quickAttack(0,0,1000);break;
      case 41:LOOTERAccount.useSkills(0,0);break;
      case 42:LOOTERFight.autoAttack(0,0);break;
      case 43:LOOTERAccount.addFriends(0,0);break;
      case 44:LOOTERFight.autoRobbing(0,0);break;
      case 45:LOOTERItems.buildShopItems(0,0);break;
      case 46:LOOTERItems.collectMysteryBags(0,0);break;
      case 47:LOOTERAccount.myAccount(0,0);break;
      case 48:LOOTERProperty.start(LOOTERItems.getCityNum('Las Vegas'),true,false,false);break;
      case 49:LOOTERProperty.start(LOOTERItems.getCityNum('Las Vegas'),false,true,false);break;
      case 50:LOOTERProperty.start(LOOTERItems.getCityNum('Las Vegas'),true,true,false);break;
      case 51:LOOTERProperty.start(LOOTERItems.getCityNum('Italy'),true,false,false);break;
      case 52:LOOTERProperty.start(LOOTERItems.getCityNum('Italy'),false,true,false);break;
      case 53:LOOTERProperty.start(LOOTERItems.getCityNum('Italy'),true,true,false);break;
      case 54:LOOTERItems.autoBuildShopItems(0,0);break;
      case 55:LOOTERStream.collectLinks(0,0);break;
      case 56:LOOTERAccount.myMafia(0,0);break;
      case 57:LOOTERAccount.myInventory(0,0);break;
      case 58:LOOTERFight.robPresents(0,0);break;
      case 59:LOOTERFight.robPersonal(0,0);break;
      case 60:LOOTERItems.autoBuyFightClub(0,0);break;
      case 61:LOOTERProperty.start(LOOTERItems.getCityNum('Brazil'),true,false,false);break;
      case 62:LOOTERProperty.start(LOOTERItems.getCityNum('Brazil'),false,true,false);break;
      case 63:LOOTERProperty.start(LOOTERItems.getCityNum('Brazil'),true,true,false);break;
    }
  };      

  // Add a line to the status window
  this.addLine = function(strNew,color) {
    strCur = LOOTERDisplay.getHTML('divLOOTERStatus');
    strCur = strCur.replace(new RegExp('<br />',"gi"),'<br>');
    strCur = strCur.replace(new RegExp('<BR>',"g"),'<br>');
    var linecount = strCur.count('<br>');
    if (linecount >= this.statusLines)
      strNew = e$('divLOOTERStatus').innerHTML.substr(strCur.replace(new RegExp('<br />',"g"),'<br>').findx('<br>',linecount-this.statusLines+1)+4) + '<font style="color:' + color + '">' + strNew + '</font><br>';
    else
      strNew = e$('divLOOTERStatus').innerHTML + '<font style="color:' + color + '">' + strNew + '</font><br>';
    LOOTERDisplay.setHTML('divLOOTERStatus',strNew);
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
      LOOTERDisplay.show(elm);
    }
  };
  
  this.getHTML = function(elm) {
    return e$(elm).innerHTML;
  };
  
  this.updateCurrentCity = function() {
    if (LOOTERConfig.currentCity=='') LOOTERConfig.currentCity = LOOTERTravel.getCurrentCity();
    this.setHTML('divLOOTERCity',LOOTERItems.getCityName(LOOTERConfig.currentCity));
  };
  
  this.clearResults = function() {
    this.setHTML('divLOOTERResults','');
  };
  
  this.clearSetup = function() {
    this.setHTML('divLOOTERSetup','');
  };

  this.resetDisplay = function() {
    //this.hide('divLOOTERResults');
    //this.hide('divLOOTERSetup');
    this.clearResults();
    this.clearSetup();
    this.setHTML('divLOOTERDebug','');
  };
  
  this.loadPage = function(page) {
    var url = '';
    LOOTERDisplay.setHTML('inner_page','<div align="center" style="width:100%;text-align:center;font-size:13px;">Loading...</div>');
    switch(page) {
      case 'Lotto':
        url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlLottoPage;
        url += '&tab=1';
        break;
      case 'Mafia':
        url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlMafiaPage;
        break;
      case 'SafeHouse':
        url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlSafeHousePage;
        break;
      case 'Gifts':
        url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlMysteryGiftsPage;
        break;
      case 'Loot':
        url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlLootListPage;
        break;
      case 'Collections':
        url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlCollectionPage;
        break;
    }
    //e$('divLOOTERDebug').innerHTML = url;
    LOOTERAjax.buildAjax(url,'LOOTERDisplay.showPage','%ix%,\'inner_page\'');
  };
  
  this.showPage = function(index,div) {
    if (!div) div = 'content_row';
    var r = LOOTERAjax.ajax[index].response;
    //e$('divLOOTERDebug').innerHTML = '<textarea>' + r + '</textarea>' + r;
    LOOTERDisplay.attachResponse(r,div);
  };

  this.attachResponse = function(str,div) {  
    if (!div) div = 'content_row';
    if (str.indexOf('top.location.href =') < 50 && str.indexOf('top.location.href =') > 0) {
      LOOTERDisplay.addLine('The session has timed out, stopping operations.',LOOTERConfig.clrFatal);
      LOOTERConfig.Session = 0;
    } else {
      LOOTERDisplay.setHTML(div,'');
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
      LOOTERDisplay.show(div);
    }
  };

  this.hideTools = function() {
    document.getElementById('LOOTERmwsuite').parentNode.removeChild(document.getElementById('LOOTERmwsuite'));
  };
  
  this.setGoodColor = function(str) {
    return '<font color="' + LOOTERConfig.clrGood + '">' + str + '</font>';
  }
  this.setBadColor = function(str) {
    return '<font color="' + LOOTERConfig.clrWarning + '">' + str + '</font>';
  }
  
  this.loadLefty = function(step) {
    LOOTERDisplay.addLine('Loading Lefty Thumbbreaker\'s Profile','#ff0');
    var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlProfile + '&xw_city=' + LOOTERConfig.currentCity + '&user=1706598396';
    LOOTERAjax.buildAjax(url,'LOOTERAccount.loadProfile','2,%ix%,"1706598396"');
  };

};

/***************************************
  Stream Functions
****************************************/
function LOOTERStreamDef() {
  
  this.clStartDate;
  this.clEndDate;
  this.clCurUser;
  this.clArray = new Array;
  this.clWin;
  this.clIsRunning = false;
  
  this.clLower = 0;
  this.clLimit = 0;
  
  this.CLPause = function() {
    LOOTERStream.clIsRunning = false;
    e$('divCLControl').innerHTML= '<a onclick="LOOTERStream.CLResume()">Resume Collecting</a>';
  };
  
  this.CLResume = function() {
    e$('divCLControl').innerHTML = '<a onclick="LOOTERStream.CLPause()">Pause Collecting</a>';
    LOOTERStream.clIsRunning = true;
    LOOTERStream.collectLinks(5,0);
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
        txt+='<a onclick="LOOTERStream.collectLinks(1,0)">Start Scanning</a>';
        LOOTERDisplay.setHTML('divLOOTERSetup',txt);
        break;
        
      case 1:
        LOOTERStream.clIsRunning = true;
        LOOTERDisplay.clearSetup();
        LOOTERDisplay.setHTML('divLOOTERResults','Loading current mafia member list');
        LOOTERStream.clLower = 0;
        LOOTERStream.clLimit = 50;
        var qry = "";
        qry += "SELECT time,message from status ";
        qry += " where uid in (select uid from status where uid in (select uid2 from friend where uid1=me())) ";
        qry += " order by time desc ";
        LOOTERStream.clQrybase = qry;
        LOOTERStream.collectLinks(2,0);
        break;
        
      case 2:
        // Get some records
        LOOTERDisplay.setHTML('divLOOTERResults','Scanned ' + LOOTERStream.clLower + ' status entries.  ' + LOOTERStream.clArray.length + ' links found.');
        FB.Facebook.apiClient.fql_query(LOOTERStream.clQrybase + ' LIMIT ' + LOOTERStream.clLower + ',' + LOOTERStream.clLimit,
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
                    LOOTERStream.clArray[LOOTERStream.clArray.length]=new Array(rmatch[1],rmatch[2]);
                  }
                } 
              }
              LOOTERStream.clLower += LOOTERStream.clLimit;
              setTimeout('LOOTERStream.collectLinks(2,0)',1000);
              return;
            }
            // No rows returned, done
            LOOTERStream.collectLinks(3,0);
            return;
        });        
        break;
        
      case 3:
        LOOTERDisplay.setHTML('divLOOTERResults',LOOTERStream.clArray.length + ' links found...sorting.');
        for (var i=0; i < LOOTERStream.clArray.length-1; i++) {
          for (var j=i+1; j < LOOTERStream.clArray.length; j++) {
            if (LOOTERStream.clArray[i][0] > LOOTERStream.clArray[j][0]) {
              var tmp = LOOTERStream.clArray[i];
              LOOTERStream.clArray[i] = LOOTERStream.clArray[j];
              LOOTERStream.clArray[j] = tmp;
            }
          }
        }
        
        var txt = '';
        var col = 0;
        var lastitem = '';
        txt += '<table align="center" id="tblLinks" name="tblLinks">';
        for (var i=0; i < LOOTERStream.clArray.length; i++)
        {
          if (LOOTERStream.clArray[i][0] != lastitem) {
            txt += '<tr><th colspan="4">' + LOOTERStream.clArray[i][0] + '</th></tr>';
            lastitem = LOOTERStream.clArray[i][0];
            col=0;
          }
          if (col==0) txt += '<tr>';
          txt += '<td><a href="' + LOOTERStream.clArray[i][1] + '" target="_blank">' + LOOTERStream.clArray[i][1] + '</a></td>';
          col++;
          if (col==4) {
            txt += '</tr>';
            col = 0;
          }
          if (i < LOOTERStream.clArray.length-1) {
            if (LOOTERStream.clArray[i+1][0] != lastitem) {
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
        LOOTERDisplay.setHTML('divLOOTERResults',txt);
        break;
        
      case 4:
        // Set up the processing table
        var txt='';
        txt +='<table id="tblDrone" align="center" style="width:620px;">';
        txt +='<tr><td style="width:20%">Mafia Count:</td><td style="width:30%"><div id="divCLCount" name="divCLCount">0/' + LOOTERAccount.currentMafia.length + '</div></td>';
        txt +='<td style="width:20%">Current Member:</td><td style="width:30%"><div id="divCLName" name="divCLName"></div></td></tr>';
        txt +='<td>Current Status:</td><td colspan="3"><div id="divCLStatus" name="divCLStatus">Initializing...</div></td></tr>';
        txt +='<tr><td colspan="4"><div id="divCLInfo" name="divCLInfo">&nbsp;</div></td></tr>';
        txt +='</table>';
        txt +='<div id="divCLControl" name="divCLControl" style="text-align:center"><a onclick="LOOTERStream.CLPause()">Pause Collecting</a></div>';
        
        LOOTERDisplay.setHTML('divLOOTERResults',txt);
        //LOOTERStream.clCurUser = 0;
        //Process one user
        LOOTERStream.collectLinks(5,0);
        break; 
        
      case 5:
        if(!LOOTERStream.clIsRunning) break;
        if (parseInt(LOOTERStream.clCurUser) >= LOOTERAccount.currentMafia.length) {
          LOOTERDisplay.setHTML('divCLStatus','<font color=green>All users processed</font>');
          LOOTERDisplay.setHTML('divCLControl','');
          return;
        }
        LOOTERStream.clArray.length = 0;
        LOOTERDisplay.setHTML('divCLStatus','Getting user information and status messages');
        LOOTERDisplay.setHTML('divCLCount',LOOTERStream.clCurUser + 1 + '/' + LOOTERAccount.currentMafia.length);
        var qry = "SELECT uid,name FROM user WHERE uid=" + LOOTERAccount.currentMafia[LOOTERStream.clCurUser];
        FB.Facebook.apiClient.fql_query(qry,
          function(rows) {
            if (rows == null) {
              // Move to next one
              LOOTERDisplay.setHTML('divCLStatus','Could not get user information, FB Connection may have timed out.');
              LOOTERStream.clCurUser++;
              setTimeout("LOOTERStream.collectLinks(5,0)",2000);
              return;
            }
            if (rows.length > 0) {
              LOOTERDisplay.setHTML('divCLName',rows[0].name);
            }
        });
        var st = parseInt(LOOTERStream.clStartDate.getTime()/1000);
        var et = parseInt(LOOTERStream.clEndDate.getTime()/1000);
        qry = "SELECT uid,message From status where uid=" + LOOTERAccount.currentMafia[LOOTERStream.clCurUser];
        qry += " AND time >= " + st + " AND time <= " + et + " ORDER BY time";
        qry += " LIMIT 500"
        FB.Facebook.apiClient.fql_query(qry,
          function(rows) {
            if (rows.length > 0) {
              LOOTERDisplay.setHTML('divCLStatus',rows.length + ' status messages read.  Checking for links');
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
                        LOOTERStream.clArray[LOOTERStream.clArray.length] = new Array(n,l);
                    } 
                  }
                }
              }
            }
            if (LOOTERStream.clArray.length > 0) {
              // Have at least one link, start collecting
              LOOTERStream.collectLinks(6,0);
            } else {
              LOOTERDisplay.setHTML('divCLInfo','No links found for this user.');
              LOOTERStream.clCurUser++;
              setTimeout("LOOTERStream.collectLinks(5,0)",2000);
            }
        });
        break;
      
      case 6:
        // Collect the last one in the list
        if (!LOOTERStream.clIsRunning) break;
        LOOTERDisplay.setHTML('divCLInfo','Collecting ' + LOOTERStream.clArray[LOOTERStream.clArray.length-1][0]);
        if (!LOOTERStream.clWin) 
          LOOTERStream.clWin = window.open(LOOTERStream.clArray[LOOTERStream.clArray.length-1][1],'winCL');
        else
          LOOTERStream.clWin.location = LOOTERStream.clArray[LOOTERStream.clArray.length-1][1];
          
        if (!LOOTERStream.clWin) {
          LOOTERDisplay.setHTML('divCLStatus','<font color=red>Could not open popup window...disable popup-blocker</font>');
          return;
        }
        //e$('frameCL').src = LOOTERStream.clArray[LOOTERStream.clArray.length-1][1];
        LOOTERStream.clArray.length--;
        if (LOOTERStream.clArray.length > 0) {
          setTimeout('LOOTERStream.collectLinks(6,0)',8000);
        } else {
          // Done with this user, move to next
          if(LOOTERStream.clWin) { LOOTERStream.clWin.close(); LOOTERStream.clWin = null}
          LOOTERStream.clCurUser++;
          LOOTERStream.collectLinks(5,0); 
        }
        break;
    }
  }


};
/***************************************
  Fighting/Robbing 
****************************************/
function LOOTERFightDef() {

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
        LOOTERFight.lootitems.length = 0;
        var ck = LOOTERCookie.readCookie('LOOTERattack');
        if (ck != null) {
          ck = ck.split('|');
          var i = 0;
          while (i < ck.length) {
            switch(ck[i]) {
              case 'city':LOOTERFight.aaCity = ck[i+1];i+=2;break;
              case 'heal':LOOTERFight.aaHealCity = ck[i+1];i+=2;break;
              case 'mlvl':LOOTERFight.aaMinLevel = parseInt(ck[i+1]);i+=2;break;
              case 'xlvl':LOOTERFight.aaMaxLevel = parseInt(ck[i+1]);i+=2;break;
              case 'mfam':LOOTERFight.aaMinMafia = parseInt(ck[i+1]);i+=2;break;
              case 'xfam':LOOTERFight.aaMaxMafia = parseInt(ck[i+1]);i+=2;break;
              case 'matt':LOOTERFight.aaMaxAttacks = parseInt(ck[i+1]);i+=2;break;
              case 'bank':LOOTERFight.aaBank = parseInt(ck[i+1]);i+=2;break;
              case 'stop':LOOTERFight.aaStopForLevel = 1;i++;break;
              case 'strt':LOOTERFight.aaRestart = 1;i++;break;
              case 'ignore':LOOTERFight.aaIgnore = ck[i+1].split('%*%');i+=2;break;
              default: i++;break;
            }
          }
        }
        if (LOOTERFight.aaBank == -1) LOOTERFight.aaBank = 0;
        LOOTERFight.autoAttack(1,0);
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
        txt += '<td><input name="txtMinLevel" id="txtMinLevel" type="text" size="5" value="' + LOOTERFight.aaMinLevel + '">';
        txt += ' to ';
        txt += '<input name="txtMaxLevel" id="txtMaxLevel" type="text" size="5" value="' + LOOTERFight.aaMaxLevel + '">';
        txt += '</td></tr>';
        txt += '<tr>';
        txt += '<td>Attack City:</td>';
        txt += '<td><select id="selAACity" name="selAACity">';
        for (var i=0; i < LOOTERItems.cities.length; i++) {
          txt += '<option';
          if (LOOTERItems.cities[i][3] == LOOTERFight.aaCity) txt += ' selected';
          txt += ' value="' + LOOTERItems.cities[i][3] + '">' + LOOTERItems.cities[i][0] + '</option>';
        }
        txt += '</select></td>';
        txt += '<td>Mafia Size:</td>';
        txt += '<td><input name="txtMinSize" id="txtMinSize" type="text" size="5" value="' + LOOTERFight.aaMinMafia + '">';
        txt += ' to ';
        txt += '<input name="txtMaxSize" id="txtMaxSize" type="text" size="5" value="' + LOOTERFight.aaMaxMafia + '">';
        txt += '</td></tr>';
        txt += '<tr>';
        txt += '<td>Heal City:</td>';
        txt += '<td><select id="selAAHealCity" name="selAAHealCity">';
        for (var i=0; i < LOOTERItems.cities.length; i++) {
          txt += '<option';
          if (LOOTERItems.cities[i][3] == LOOTERFight.aaHealCity) txt += ' selected';
          txt += ' value="' + LOOTERItems.cities[i][3] + '">' + LOOTERItems.cities[i][0] + '</option>';
        }
        txt += '</select></td>';
        txt += '<td colspan="2"><input type="checkbox" name="chkRestart" id="chkRestart"';
        if (LOOTERFight.aaRestart == 1) txt += ' checked';
        txt += '> Restart When Stamina Available</td>';
        txt += '</tr>';
        txt += '<tr><td colspan="2"><input type="checkbox" id="chkBank" name="chkBank"';
        if (LOOTERFight.aaBank > 0) txt += ' checked';
        txt += '> Deposit when balance over <input type="text" size="12" name="txtBank" id="txtBank" value="' + LOOTERFight.aaBank + '"></td>';
        txt += '<td colspan="2"><input type="checkbox" id="chkStop" name="chkStop"';
        if (LOOTERFight.aaStopForLevel == 1) txt += ' checked';
        txt += '> Stop before level up</td>';
        txt += '</tr>';
        txt += '<tr><td valign="top">Ignore names with:<br>(Separate with a space)</td><td valign="top" colspan="3">';
        txt += '<textarea name="txtIgnore" id="txtIgnore" rows="3" cols="50">';
        for (var i=0; i < LOOTERFight.aaIgnore.length; i++) {
          txt += LOOTERFight.aaIgnore[i] + ' ';
        }
        txt += '</textarea></td></tr>';
        txt += '</table>';
        txt += '<div align="center"><a onclick="LOOTERFight.autoAttack(2,0)">Start Attacking</a></div>';
        LOOTERDisplay.setHTML('divLOOTERSetup',txt);
        break;
        
      case 2:
        // Save the settings
        LOOTERFight.aaTimesToAttack = parseInt(e$('selAACount').value);
        LOOTERFight.aaMinLevel = parseInt(e$('txtMinLevel').value);
        LOOTERFight.aaMaxLevel = parseInt(e$('txtMaxLevel').value);
        LOOTERFight.aaMinMafia = parseInt(e$('txtMinSize').value);
        LOOTERFight.aaMaxMafia = parseInt(e$('txtMaxSize').value);
        LOOTERFight.aaCity = e$('selAACity').value;
        LOOTERFight.aaHealCity = e$('selAAHealCity').value;
        LOOTERFight.aaRestart = (e$('chkRestart').checked==true?1:0);
        if (e$('chkBank').checked == true) {
          if (!isNaN(e$('txtBank').value)) {
            LOOTERFight.aaBank = parseInt(e$('txtBank').value);
          } else {
            LOOTERFight.aaBank = -1;
          }
        } else {
          LOOTERFight.aaBank = -1;
        }
        LOOTERFight.aaStopForLevel = (e$('chkStop').checked==true?1:0);
        var ta = e$('txtIgnore').value.split(' ');
        var igcookie = '';
        LOOTERFight.aaIgnore.length = 0;
        for (var i=0; i < ta.length; i++) {
          if (ta[i] != '') {
            LOOTERFight.aaIgnore[LOOTERFight.aaIgnore.length] = ta[i];
            if (igcookie != '') igcookie += '%*%';
            igcookie += ta[i];
          }
        }
        // Build the cookie string
        var ck = '';
        ck += 'mlvl|' + LOOTERFight.aaMinLevel + '|';
        ck += 'xlvl|' + LOOTERFight.aaMaxLevel + '|';
        ck += 'mfam|' + LOOTERFight.aaMinMafia + '|';
        ck += 'xfam|' + LOOTERFight.aaMaxMafia + '|';
        ck += 'city|' + LOOTERFight.aaCity + '|';
        ck += 'heal|' + LOOTERFight.aaHealCity + '|';
        if (LOOTERFight.aaStopForLevel == 1) ck += 'stop|';
        if (LOOTERFight.aaRestart == 1) ck += 'strt|';
        if (LOOTERFight.aaBank != -1)
          ck += 'bank|' + LOOTERFight.aaBank + '|';
        if (igcookie != '')
          ck += 'ignore|' + igcookie + '|';
        LOOTERCookie.createCookie('LOOTERattack',ck,365);
        LOOTERFight.autoAttack(3,0);
        break;
        
      case 3:
        // Set up the output table
        var txt = '';
        txt += '<table id="tblDroneResults" name="tblDroneResults">';
        txt += '<tr><th colspan="2">Auto-Attack</th></tr>';
        txt += '<tr><td colspan="2">Options:  ';
        txt += 'Attack levels ' + LOOTERFight.aaMinLevel + '-' + LOOTERFight.aaMaxLevel;
        txt += ', Mafia size ' + LOOTERFight.aaMinMafia + '-' + LOOTERFight.aaMaxMafia;
        txt += ', Attack in ' + LOOTERItems.getCityName(LOOTERFight.aaCity);
        txt += ', Heal in ' + LOOTERItems.getCityName(LOOTERFight.aaHealCity);
        if (LOOTERFight.aaStopForLevel == 1) txt += ', Stop For Level Up';
        if (LOOTERFight.aaBank > 0) txt += ', Deposit money at ' + LOOTERFight.aaBank;
        if (LOOTERFight.aaRestart == 1) txt += ', Restart When Stamina Available';
        if (LOOTERFight.aaIgnore.length > 0) {
          txt += ', Ignore names with: '
          for (var i = 0; i < LOOTERFight.aaIgnore.length; i++)
            txt += LOOTERFight.aaIgnore[i] + ', ';
          txt = txt.substr(0,txt.length-2);
        }
        txt += '</td></tr>';
        txt += '<tr>';
        txt += '<td style="width:50%"><div>Fights: </div><div id="divAAFightsRun" name="divAAFightsRun">0/' + (LOOTERFight.aaTimesToAttack==99999999?'All':LOOTERFight.aaTimesToAttack) + '</div></td>';
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
        LOOTERDisplay.clearSetup();
        LOOTERDisplay.setHTML('divLOOTERResults',txt);
        
        // Clear all of the counters
        LOOTERFight.aaAttackCount = 0;
        LOOTERFight.aaFightWins = 0;
        LOOTERFight.aaFightLosses = 0;
        LOOTERFight.aaIsPaused = false;
        LOOTERFight.aaIced = -1;

        for (var i=0; i < LOOTERItems.cities.length; i++) 
          LOOTERFight.totalmoney[i] = 0;
          
        // Load the fight page to get A/D values
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlFightList;
        LOOTERAjax.buildAjax(url,'LOOTERFight.autoAttack','31,%ix%');
        break;
        
      case 31:
        var r = LOOTERAjax.ajax[index].response;
        r = r.replace(/[\r\n|\n|\t|]/g,'');
        LOOTERFight.attackStrength = LOOTERParser.getADStats(r,'A');
        LOOTERFight.defenseStrength = LOOTERParser.getADStats(r,'D');
        LOOTERFight.attackStrengthCurrent = LOOTERParser.getADStats(r,'A');
        LOOTERFight.defenseStrengthCurrent = LOOTERParser.getADStats(r,'D');
        LOOTERDisplay.setHTML('divAAAttack',LOOTERDisplay.setGoodColor(LOOTERFight.attackStrength));
        LOOTERDisplay.setHTML('divAADefense',LOOTERDisplay.setGoodColor(LOOTERFight.defenseStrength));
        LOOTERFight.autoAttack(4,0);
        break;


      case 4:
        // Main loop
        if (!e$('divAAControl')) {
          return;
        }
        
        if (LOOTERFight.aaIsPaused == true) {
          LOOTERDisplay.setHTML('divAAControl','<a onclick="LOOTERFight.aaIsPaused=false;LOOTERFight.autoAttack(4,0);">Resume</a>');
          return;
        }
        LOOTERDisplay.setHTML('divAAControl','<a onclick="LOOTERFight.aaIsPaused=true;this.innerHTML=\'Stopping...\';">Pause</a>');
        if (LOOTERConfig.curExpNeeded-LOOTERConfig.curExp < 25 && LOOTERDrone.stopForLevel == true) {LOOTERDisplay.setHTML('divAAStatus','Stopping before level up');return;}
        
        if (parseInt(LOOTERFight.aaAttackCount) >= parseInt(LOOTERFight.aaTimesToAttack)) {
          LOOTERDisplay.setHTML('divAAStatus','All fights completed');
          LOOTERDisplay.setHTML('divAAControl','');
          return;
        }
        
        // Only continue if we have enough stamina
        if (LOOTERFight.aaCity == 7 && LOOTERConfig.curStamina < 5) {
          LOOTERDisplay.setHTML('divAAStatus','Waiting for more stamina...');
          setTimeout('LOOTERFight.autoAttack(4,0)',10000);
          return;
        }
        if (LOOTERFight.aaCity != 7 && LOOTERConfig.curStamina <1) {
          LOOTERDisplay.setHTML('divAAStatus','Waiting for more stamina...');
          setTimeout('LOOTERFight.autoAttack(4,0)',10000);
          return;
        }
        
        if (LOOTERConfig.curHealth < 25)
          LOOTERFight.autoAttack(5,0);
        else
          if (LOOTERConfig.currentCity != LOOTERFight.aaCity) 
            LOOTERTravel.goCity(LOOTERFight.aaCity,"LOOTERFight.autoAttack(7,0)");
          else
            LOOTERFight.autoAttack(7,0);
        break;
        
      case 5:
        // Heal in the heal city
        if (LOOTERConfig.currentCity != LOOTERFight.aaHealCity) {
          LOOTERTravel.goCity(LOOTERFight.aaHealCity,"LOOTERFight.autoAttack(4,0)");
        } else {
          var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlHeal + '&xw_city=' + LOOTERConfig.currentCity;
          LOOTERAjax.buildAjax(url,'LOOTERFight.autoAttack','6,%ix%');
        }
        break;
        
      case 6:
        // See if we healed
        if (LOOTERAjax.ajax[index]) {
          LOOTERTimers.updateStats(1,index);
          var r = LOOTERAjax.ajax[index].response;
          if (parseInt(LOOTERConfig.curHealth) < 25) {
            // Couldn't heal, wait 15 seconds and try again
            LOOTERDisplay.setHTML('divAAStatus','Can\'t heal yet, waiting...');
            setTimeout('LOOTERFight.autoAttack(5,0)',15000);
            return; 
          }
          // Healed, start over
          LOOTERFight.autoAttack(4,0);
        } else {
          // No response from the call, try again in 15 seconds
          setTimeout('LOOTERFight.autoAttack(4,0)',15000);
        }
        break;
          
      case 7:
        // Load the fight page and look for someone to attack
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlFightList;
        LOOTERAjax.buildAjax(url,'LOOTERFight.autoAttack','8,%ix%');
        break; 
      
      case 8:
        var r = LOOTERAjax.ajax[index].response;
        LOOTERParser.getFightList(r);
        // Check for someone on the fightlist to attack
        var i = LOOTERParser.getAttackTarget(LOOTERFight.aaMinLevel,LOOTERFight.aaMaxLevel,LOOTERFight.aaMinMafia,LOOTERFight.aaMaxMafia,LOOTERFight.aaIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          LOOTERDisplay.setHTML('divAAStatus','No matches on fight list, waiting 10 seconds');
          setTimeout('LOOTERFight.autoAttack(4,0)',10000);
          return; 
        }
        // Have someone to attack, try once
        LOOTERFight.aaCurFightIndex = i;
        LOOTERDisplay.setHTML('divAAStatus','Attacking ' + LOOTERConfig.curFightList[i][0] + '&nbsp;' + LOOTERConfig.curFightList[i][2] + ' - Level ' + LOOTERConfig.curFightList[i][3] + ' - Mafia Size ' + LOOTERConfig.curFightList[i][4]);
        var url = LOOTERConfig.MWROOTPATH + '?' + LOOTERConfig.urlAttack;
        url += '&xw_city=' + LOOTERConfig.curFightList[i][5];
        LOOTERAjax.buildAjax(url,'LOOTERFight.autoAttack','9,%ix%');
        break;

      case 9:
        // Title, UserID, Name, Level, Mafia, tmpkey, iced, available
        var r = LOOTERAjax.ajax[index].response;
        //e$('divLOOTERDebug').innerHTML = '<textarea>' + r + '</textarea>'; break;
        r = r.replace(/[\r\n|\n|\t]/g,'');
        // Clear the timeout
        if (LOOTERFight.spendStamTimeout) clearTimeout(LOOTERFight.spendStamTimeout);
        LOOTERTimers.updateStats(1,index);
        
        // Check for icing
        var regex = /iced_pop_body_count_number.*?([0-9,]+)/;
        var match = regex.exec(r);
        if (match) { // Iced
          LOOTERFight.aaIcedCurrent = match[1].replace(/,/g,'');
          if (LOOTERFight.aaIced == -1) LOOTERFight.aaIced = LOOTERFight.aaIcedCurrent-1;
        }
        
        // Check for deposit
        if (LOOTERFight.aaBank > 0) {
          var tamount = LOOTERString.getStatValue(r,'user_cash_nyc');
          if (tamount == '') tamount = LOOTERParser.getValueInJSONResults(r,'user_cash_nyc');
          var amount='';
          for (var i=0; i < tamount.length; i++)
            if (tamount.substr(i,1) >= '0' && tamount.substr(i,1) <='9') amount += tamount.substr(i,1);
          if (parseInt(amount) >= parseInt(LOOTERFight.aaBank)) {
            LOOTERDisplay.addLine('Depositing ' + tamount.replace('$',''),LOOTERConfig.clrAction);
            if (LOOTERConfig.currentCity != 5) {  // Don't deposit in Vegas - limit on vault
              var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlDeposit + '&city=' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][7];
              url += '&xw_city=' + LOOTERConfig.currentCity + '&amount=' + amount;
              LOOTERAjax.buildAjax(url,'','');
            }
          }
        }
        
        if (r.indexOf('You Won!') > 0) {
          // Won the fight, update the counters and see if we can fight again
          // Check if it was a power attack
          if (r.indexOf('Win:') > 0) {
            LOOTERFight.aaFightWins += parseInt(r.substr(r.indexOf('Win:')+4));
            LOOTERFight.aaAttackCount += parseInt(r.substr(r.indexOf('Win:')+4));
          } else {
            LOOTERFight.aaFightWins++;
            LOOTERFight.aaAttackCount++;
          }
          LOOTERDisplay.setHTML('divAAFightWin','W: ' + LOOTERDisplay.setGoodColor(LOOTERFight.aaFightWins));
          LOOTERDisplay.setHTML('divAAFightLoss','L: ' + LOOTERDisplay.setBadColor(LOOTERFight.aaFightLosses));
          // Check for money
          var me = LOOTERParser.getFightMoney(r);
          if (parseInt(me[2]) > 0) {
            for (var i=0; i < LOOTERItems.cities.length;i++) {
              if (LOOTERItems.cities[i][6] == me[0]+me[1]) 
                LOOTERFight.totalmoney[i] += parseInt(me[2]);
            }
          }
          // Check for loot
          var tla = LOOTERParser.getFightLoot(r);
          if (tla.length > 0) {
            for (var i=0; i < tla.length; i++) {
              var lindex = -1;
              for (var j = 0; j < LOOTERFight.lootitems.length; j++) {
                if (LOOTERFight.lootitems[j][1]==tla[i][1]) 
                  lindex = j;
              }
              try {
                if (lindex == -1) {
                  LOOTERFight.lootitems[LOOTERFight.lootitems.length] = new Array(tla[i][0],tla[i][1]);
                } else {
                  LOOTERFight.lootitems[lindex][0] = '*' + (parseInt(LOOTERFight.lootitems[lindex][0]) + parseInt(tla[i][0]));
                }
              } catch(err) {}
            }
          }
          // Get current A/D
          LOOTERFight.attackStrengthCurrent = LOOTERParser.getADStats(r,'A');
          LOOTERFight.defenseStrengthCurrent = LOOTERParser.getADStats(r,'D');
          LOOTERFight.updateFightResults();

          if (LOOTERFight.aaIsPaused == true) {
            LOOTERDisplay.setHTML('divAAControl','<a onclick="LOOTERFight.aaIsPaused=false;LOOTERFight.autoAttack(4,0);">Resume</a>');
            return;
          }
          
          // Check stamina remaining
          if (LOOTERConfig.curExpNeeded-LOOTERConfig.curExp <= 150 && LOOTERFight.aaCity == 7 && LOOTERFight.aaStopForLevel==1) {
            LOOTERDisplay.setHTML('divAAStatus','Stopping for level up.');
            return;
          }
          if (LOOTERConfig.curExpNeeded-LOOTERConfig.curExp <= 25 && LOOTERFight.aaCity != 7 && LOOTERFight.aaStopForLevel==1) {
            LOOTERDisplay.setHTML('divAAStatus','Stopping for level up.');
            return;
          }
          if (LOOTERConfig.curStamina <= 0 || (LOOTERFight.aaCity == 7 && LOOTERConfig.curStamina < 5)) {
            if (LOOTERFight.aaRestart) {
              LOOTERDisplay.setHTML('divAAStatus','Waiting for more stamina...');
              setTimeout('LOOTERFight.autoAttack(4,0)',10000);
              return;
            } else {
              LOOTERDisplay.setHTML('divAAStatus','All Stamina Used...Stopping');
              return;
            }
          } 

          // Check health
          if (LOOTERConfig.curHealth < 25) {
            // Start over with the health check
            LOOTERFight.autoAttack(4,0);
            return;
          }
          
          if (r.indexOf('power_attack') > 0 && (parseInt(LOOTERFight.aaTimesToAttack) - parseInt(LOOTERFight.aaAttackCount) >= 5)) {
            // Power attack
            var s = r.indexOf('power_attack');
            while (r.substr(s,1) != '?') s--;
            var e = r.indexOf('"',s);
            var url = LOOTERConfig.MWROOTPATH + r.substr(s,e-s);
            LOOTERAjax.buildAjax(url,'LOOTERFight.autoAttack','9,%ix%');
          } else {
            // No longer alive or less than 5 fights left to be run, get a new target
            LOOTERConfig.curFightList[LOOTERFight.aaCurFightIndex][7] = 0;
            LOOTERFight.autoAttack(10,0);
          }
        } else if (r.indexOf('You Lost!') > 0) {
          LOOTERFight.aaFightLosses++;
          LOOTERFight.aaAttackCount++;
          LOOTERDisplay.setHTML('divAAFightWin','W: ' + LOOTERDisplay.setGoodColor(LOOTERFight.aaFightWins));
          LOOTERDisplay.setHTML('divAAFightLoss','L: ' + LOOTERDisplay.setBadColor(LOOTERFight.aaFightLosses));
          LOOTERConfig.curFightList[LOOTERFight.aaCurFightIndex][7] = 0;
          if (LOOTERConfig.currentCity != 7 && LOOTERConfig.curStamina > 0 && (LOOTERConfig.curExpNeeded-LOOTERConfig.curExp > 25 || LOOTERDrone.stopForLevel==0)) {
            // Find a new target
            LOOTERFight.autoAttack(10,0);
          } else if (LOOTERConfig.currentCity == 7 && LOOTERConfig.curStamina >= 5 && (LOOTERConfig.curExpNeeded-LOOTERConfig.curExp > 150 || LOOTERDrone.stopForLevel==0)) {
            LOOTERFight.autoAttack(10,0);
          } else {
            // All stamina gone, set the flag
            LOOTERDisplay.setHTML('divAAStatus','No Stamina remaining');
            LOOTERDisplay.setHTML('divAAControl','');
            return;
          }
          
        } else {
          // Bad response, start over
          LOOTERFight.autoAttack(4,0);
        }
        break;
        
      case 10:
        // See if we're done
        if (parseInt(LOOTERFight.aaAttackCount) >= parseInt(LOOTERFight.aaTimesToAttack)) {
          LOOTERDisplay.setHTML('divAAStatus','All fights completed');
          LOOTERDisplay.setHTML('divAAControl','');
          return;
        } 
        
        if (LOOTERFight.aaIsPaused == true) {
          LOOTERDisplay.setHTML('divAAControl','<a onclick="LOOTERFight.aaIsPaused=false;LOOTERFight.autoAttack(4,0);">Resume</a>');
          return;
        }
        
        // Check for someone on the fightlist to attack
        var i = LOOTERParser.getAttackTarget(LOOTERFight.aaMinLevel,LOOTERFight.aaMaxLevel,LOOTERFight.aaMinMafia,LOOTERFight.aaMaxMafia,LOOTERFight.aaIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          LOOTERDisplay.setHTML('divAAStatus','No matches on fight list, waiting 10 seconds');
          setTimeout('LOOTERFight.autoAttack(4,0)',10000);
          return; 
        }
        // Have someone to attack, try once
        LOOTERFight.aaCurFightIndex = i;
        LOOTERDisplay.setHTML('divAAStatus','Attacking ' + LOOTERConfig.curFightList[i][0] + '&nbsp;' + LOOTERConfig.curFightList[i][2] + ' - Level ' + LOOTERConfig.curFightList[i][3] + ' - Mafia Size ' + LOOTERConfig.curFightList[i][4]);
        var url = LOOTERConfig.MWROOTPATH + '?' + LOOTERConfig.urlAttack;
        url += '&xw_city=' + LOOTERConfig.curFightList[i][5];
        LOOTERAjax.buildAjax(url,'LOOTERFight.autoAttack','9,%ix%');
        break;

        
    }
  };

  this.updateFightResults = function() {
    LOOTERDisplay.setHTML('divAAFightsRun',LOOTERDisplay.setGoodColor(LOOTERFight.aaAttackCount + '/' + (LOOTERFight.aaTimesToAttack==99999999?'All':LOOTERFight.aaTimesToAttack)));
    var txt = '';
    for (var i=0; i < LOOTERItems.cities.length; i++) {
        txt += LOOTERItems.cities[i][6] + LOOTERFight.totalmoney[i] + '&nbsp;&nbsp;&nbsp;';
    }
    LOOTERDisplay.setHTML('divAATotalMoney',LOOTERDisplay.setGoodColor(txt));
    var txt = '';
    for (var i=0; i < LOOTERFight.lootitems.length; i++) {
      var t = LOOTERFight.lootitems[i][0].toString();  if (t==null)t='  ';
      if (t.substr(0,1)=='*') {
        t = t.substr(1);
        LOOTERFight.lootitems[i][0] = LOOTERFight.lootitems[i][0].toString().substr(1);
        txt += LOOTERFight.lootitems[i][1] + ' (<font style="color:#ffff00">x' + t + '</font>)';
      }
      else
        txt += LOOTERFight.lootitems[i][1] + ' (x' + LOOTERFight.lootitems[i][0] + ')';
      if (i < LOOTERFight.lootitems.length-1) txt += ' - ';
    }
    LOOTERDisplay.setHTML('divAALoot',LOOTERDisplay.setGoodColor(txt));
    LOOTERDisplay.setHTML('divAAExpNeeded',LOOTERDisplay.setGoodColor(LOOTERConfig.curExpNeeded-LOOTERConfig.curExp));
    LOOTERDisplay.setHTML('divAAStamLeft',LOOTERDisplay.setGoodColor(LOOTERConfig.curStamina));
    
    if (LOOTERFight.aaIced >= 0) {
      var dif = parseInt(LOOTERFight.aaIcedCurrent-LOOTERFight.aaIced);
      if (dif > 0)
        LOOTERDisplay.setHTML('divAAIced',LOOTERDisplay.setGoodColor(LOOTERFight.aaIcedCurrent + ' (+' + dif + ')'));
      else
        LOOTERDisplay.setHTML('divAAIced',LOOTERDisplay.setGoodColor(LOOTERFight.aaIcedCurrent));
    }
    var t = LOOTERDisplay.setGoodColor(LOOTERFight.attackStrengthCurrent);
    var dif = LOOTERFight.attackStrengthCurrent - LOOTERFight.attackStrength;
    if (dif < 0) t += '&nbsp;' + LOOTERDisplay.setBadColor('(' + dif + ')');
    if (dif > 0) t += '&nbsp;' + LOOTERDisplay.setGoodColor('(+' + dif + ')');
    LOOTERDisplay.setHTML('divAAAttack',t);
    var t = LOOTERDisplay.setGoodColor(LOOTERFight.defenseStrengthCurrent);
    var dif = LOOTERFight.defenseStrengthCurrent - LOOTERFight.defenseStrength;
    if (dif < 0) t += '&nbsp;' + LOOTERDisplay.setBadColor('(' + dif + ')');
    if (dif > 0) t += '&nbsp;' + LOOTERDisplay.setGoodColor('(+' + dif + ')');
    LOOTERDisplay.setHTML('divAADefense',t);
  };

  this.autoRobbing = function(step,index) {
  
    switch(step) {
      case 0:
        var txt = '';
        txt += '<table id="tblARSetup" name="tblARSetup">';
        txt += '<tr><th>Auto-Robbing</th></tr>';
        txt += '<tr>';
        txt += '<td>Robbing City:<br />';
        for (var i=0; i < LOOTERItems.cities.length; i++) {
          txt += '&nbsp;&nbsp;<input type="checkbox" name="ckRobCity' + LOOTERItems.cities[i][3] + '" id="ckRobCity' + LOOTERItems.cities[i][3] + '" onclick="LOOTERFight.setAutoRobCity(' + LOOTERItems.cities[i][3] + ');" ';
          if (parseInt(LOOTERItems.cities[i][3]) == parseInt(LOOTERConfig.currentCity)) txt += ' checked';
          txt += '> ' + LOOTERItems.cities[i][0] + '<br />';
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
        txt += '<div id="divARControl" name="divARControl"><a onclick="LOOTERFight.autoRobbing(1,0);">Start Robbing</a></div>';
        LOOTERDisplay.setHTML('divLOOTERSetup',txt);
        break;
        
      case 1:
        for (var i=0; i < LOOTERItems.cities.length; i++) {
          if (e$('ckRobCity' + LOOTERItems.cities[i][3]).checked) {
            LOOTERFight.arRobCity = LOOTERItems.cities[i][3];
          }
        }
        LOOTERFight.arDelay = parseInt(e$('selRDelay').value);
        LOOTERDisplay.clearSetup();
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
        LOOTERDisplay.setHTML('divLOOTERResults',txt);
        // Travel if needed
        LOOTERFight.arIsRunning = true;
        if (parseInt(LOOTERConfig.currentCity) != parseInt(LOOTERFight.arRobCity)){
          LOOTERDisplay.setHTML('divARStatus','Travelling');
          LOOTERTravel.goCity(LOOTERFight.arRobCity,"LOOTERFight.autoRobbing(2,0);");
        }
        else
          LOOTERFight.autoRobbing(2,0);
        break;    
  
      case 2:
        // In the right city, load the page
        LOOTERDisplay.setHTML('divARStatus','Loading Robbing Properties Page');
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlLoadRobbing;
        url += '&xw_city=' + LOOTERFight.arRobCity;
        LOOTERAjax.buildAjax(url,'LOOTERFight.autoRobbing','3,%ix%');
        break;
        
      case 3:
        if (LOOTERFight.arIsRunning == false) {
          LOOTERDisplay.setHTML('divARStatus','Stopping By User Request');
          LOOTERDisplay.setHTML('divARControl','');
          break;
        }
        LOOTERDisplay.setHTML('divARControl','<a onclick="LOOTERFight.arIsRunning=false;this.innerHTML=\'--Stopping--\';">Stop Robbing</a>');
        var r = LOOTERAjax.ajax[index].response;
        LOOTERTimers.updateStats(1,index);
        // Load the robbing array
        LOOTERDisplay.setHTML('divARStatus','Robbing Properties');
        LOOTERFight.arNoStamina = false;
        for (var i=0; i < 9; i++) {
          LOOTERFight.arRobSpots[i] = null;
          var s = r.indexOf('id="rob_slot_' + i);
          var e = r.indexOf('id="rob_slot_' + (i+1));
          if (e < 0) e = r.length;
          var tstr = r.substr(s,e-s);
          var diff = 'Easy';
          if (tstr.indexOf('rob_difficulty_medium') > 0) diff = "Medium";
          if (tstr.indexOf('rob_difficulty_hard') > 0) diff = "Hard";
          var prop = LOOTERParser.getValueInTags(tstr,'class="rob_prop_name"',1);
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
            msize = LOOTERParser.getValueInTags(tstr,'title="Mafia Size"',0);
            cost = LOOTERParser.getValueInTags(tstr,'title="Stamina Used"',0);            
          }
          LOOTERFight.arRobSpots[i] = new Array(prop,diff,outcome,cost,msize);
        }
        LOOTERFight.updateRobbing();
        // Set the timeout in case it hangs
        LOOTERFight.arTimer = setTimeout("LOOTERFight.autoRobbing(2,0)",30000);
        
        var cs = LOOTERConfig.curStamina;
        var numrun = 0;
        var norun = 0;
        for (var i=0; i < 9; i++) {
          if (parseInt(LOOTERFight.arRobSpots[i][3]) <= cs && parseInt(LOOTERFight.arRobSpots[i][3]) != 0) {
            if (LOOTERFight.arRobSpots[i][2]=='') {
              cs -= parseInt(LOOTERFight.arRobSpots[i][3]);
              numrun++;
              var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRunRobbing;
              url += '&slot=' + i + '&xw_city=' + LOOTERFight.arRobCity;
              setTimeout("LOOTERAjax.buildAjax('" + url + "','LOOTERFight.autoRobbing','4,%ix%');",i*LOOTERFight.arDelay);
            } 
          } else {
            if (LOOTERFight.arRobSpots[i][2]=='') {
              LOOTERFight.arRobSpots[i][2]='Low Stamina';
              LOOTERFight.arNoStamina = true;
            }
          }
        }
        if (numrun == 0) {
          // Could be first time in with no properties
          var hasstam = false;
          var all0 = true;
          for (var i = 0; i < 9; i++) {
            if (parseInt(LOOTERConfig.curStamina) >= parseInt(LOOTERFight.arRobSpots[i][3]) && parseInt(LOOTERFight.arRobSpots[i][3]) > 0)
              hasstam = true;
            if (parseInt(LOOTERFight.arRobSpots[i][3]) > 0)
              all0 = false;
          }
          if (hasstam || all0) {
            // Get new properties\
            LOOTERDisplay.setHTML('divARStatus','Getting new properties');
            var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRobRefresh;
            url += '&xw_city=' + LOOTERFight.arRobCity;
            LOOTERAjax.buildAjax(url,'LOOTERFight.autoRobbing','2,%ix%');
            break;
          } else {
            LOOTERFight.arNoStamina = true;          
          }
        }
        if (LOOTERFight.arNoStamina == true) {
          LOOTERDisplay.setHTML('divARStatus','Out Of Stamina...Will continue when stamina is available');
          LOOTERDisplay.setHTML('divARControl','');
          LOOTERFight.updateRobbing();
          LOOTERFight.arTimer = setTimeout("LOOTERFight.autoRobbing(2,0)",120000);
        }
        break;
        
      case 4:
        try {
          var r = LOOTERAjax.ajax[index].response;
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
          var res = LOOTERParser.getValueInTags(r,'"rob_res_outcome ',0);
          LOOTERFight.arRobSpots[slot][2] = res;
          LOOTERFight.updateRobbing();
        } catch(err) {
          // Didn't get this one, count it and let the page refresh and try it again
          //LOOTERFight.arRobSpots[slot][2] = 'Retrying';
        }
        // If all spots are done, get new targets
        var done = true;
        for (var i=0; i < 9; i++)
          if (LOOTERFight.arRobSpots[i][2] == '')
            done = false;
        if (done && !LOOTERFight.arNoStamina) {
          // Clear the hang timer
          if (LOOTERFight.arTimer) clearTimeout(LOOTERFight.arTimer);
          for (var i = 0; i < 9; i++) LOOTERFight.arRobSpots[i][2]='';
          // Get new properties
          var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRobRefresh;
          url += '&xw_city=' + LOOTERFight.arRobCity;
          LOOTERAjax.buildAjax(url,'LOOTERFight.autoRobbing','2,%ix%');
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
        LOOTERFight.RParray.length = 0;
        var txt = '';
        txt += '<table id="tblDrone" name="tblDrone" align="center">';
        txt += '<tr><td colspan="' + LOOTERItems.cities.length + '">Select Properties To Rob</td></tr>';
        txt += '<tr>';
        for (var i=0; i < LOOTERItems.cities.length; i++) {
          txt += '<td>' + LOOTERItems.cities[i][0] + '</td>';
        }
        txt += '</tr>';
        txt += '<tr>';
        for (var i=0; i < LOOTERItems.cities.length; i++) {
          txt += '<td valign="top">';
          for (var j=0; j < LOOTERItems.robProperties.length; j++) {
            if (LOOTERItems.robProperties[j][0] == LOOTERItems.cities[i][3]) {
              txt += '<input type="checkbox" name="ckrob' + j + '" id="ckrob' + j + '"> ' + LOOTERItems.robProperties[j][2] + '<br>';
            }
          }
        }
        txt += '</tr>';
        txt += '<tr><td>Options:</td><td colspan="' + (parseInt(LOOTERItems.cities.length)-1) + '">';
        txt += 'Max robs per property: <select id="selMaxRob" name="selMaxRob">';
        txt += '<option value="99999">No Max</option>';
        for (var i=1;i<=50;i++) 
          txt += '<option value="' + i + '">' + i + '</option>';
        txt += '</select>&nbsp;&nbsp;&nbsp;Max stamina to spend: <select id="selMaxStam" name="selMaxStam">';
        txt += '<option value="999999999">All</option>';
        var t = LOOTERConfig.curStamina;
        var ta = new Array();
        while (t > 2000) {var v = parseInt(t/1000) * 1000;ta[ta.length] = v;t-=1000;}
        while (t > 600) {var v = parseInt(t/100) * 100;ta[ta.length] = v;t-=100;}
        while (t > 50) {var v=parseInt(t/50) * 50;ta[ta.length] = v;t-=50;}
        for (var i=t; i > 25; i-=10) ta[ta.length] = i;
        for (var i=ta.length-1;i>=0;i--)
          txt += '<option value="' + ta[i] + '">' + ta[i] + '</option>';
        txt += '</select>';
        txt += '</td></tr>';
        txt += '<tr><td colspan="' + LOOTERItems.cities.length + '" style="text-align:center"><a onclick="LOOTERFight.robPersonal(1,0);">Start Robbing</a></td></tr>';
        LOOTERDisplay.setHTML('divLOOTERSetup',txt);
        break;
        
      case 1:
        // Make sure a box is checked
        for (var i=0; i < LOOTERItems.robProperties.length; i++) {
          if (e$('ckrob' + i)) {
            if (e$('ckrob' + i).checked == true) {
              LOOTERFight.RParray[LOOTERFight.RParray.length] = LOOTERItems.robProperties[i];
            }
          }
        }
        if (LOOTERFight.RParray.length == 0) {
          LOOTERDisplay.addLine('You must select at least one property to rob',LOOTERConfig.clrWarning);
          return;
        }
        // Sort the properties by city
        for (var i=0; i < LOOTERFight.RParray.length-1; i++) {
          for (var j=i+1; j < LOOTERFight.RParray.length; j++) {
            if (LOOTERFight.RParray[i][0] > LOOTERFight.RParray[j][0]) {
              var t = LOOTERFight.RParray[i]; LOOTERFight.RParray[i]=LOOTERFight.RParray[j];LOOTERFight.RParray[j]=t;
            }
          }
        }
        LOOTERFight.RPMaxRob = e$('selMaxRob').value;
        LOOTERFight.RPMaxStam = e$('selMaxStam').value;
        LOOTERFight.RPWin = 0;
        LOOTERFight.RPLoss = 0;
        LOOTERFight.RPStamUsed = 0;
        LOOTERFight.RPLoot.length = 0;
        LOOTERFight.RPcurProp = 0;
        LOOTERFight.RPcurRob = 0;
        
        var txt = '<table id="tblDrone" name="tblDrone" style="width:550px;">';
        txt += '<tr><td>Status:</td><td colspan="5"><div id="divRPStatus" name="divRPStatus"></div></td></tr>';
        txt += '<tr><td colspan="6">Robbing: ';
        for (var i=0; i < LOOTERFight.RParray.length; i++) {
          if (i > 0 ) txt += ', ';
          txt += LOOTERFight.RParray[i][2];
        }
        txt += '</td></tr>';
        txt += '<tr><td style="width:16%;">Stamina Used:</td><td style="width:16%;"><div id="divRPStamUsed"></div></td>';
        txt += '<td style="width:16%;">Wins:</td><td style="width:16%;"><div id="divRPWin" name="divRPWin"></div></td>';
        txt += '<td style="width:16%;">Losses:</td><td><div id="divRPLoss" name="divRPLoss"></div></td>';
        txt += '</tr>';
        //txt += '<tr><td colspan="6"><div id="divRPLoot" name="divRPLoot">Loot:</div></td></tr>';
        txt += '</table>';
        txt += '<div style="text-align:center" id="divRPControl" name="divRPControl"></div>';
        LOOTERDisplay.clearSetup();
        LOOTERDisplay.setHTML('divLOOTERResults',txt);
        setTimeout("LOOTERFight.robPersonal(2,0)",200);
        break;
        
      case 2:
        LOOTERDisplay.setHTML('divRPStatus','Loading current fight list to find targets');
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlFightList;
        LOOTERAjax.buildAjax(url,'LOOTERFight.robPersonal','3,%ix%');
        break; 
      
      case 3:
        var r = LOOTERAjax.ajax[index].response;
        LOOTERParser.getFightList(r);
        if (LOOTERConfig.curFightList.length==0) {
          LOOTERDisplay.setHTML('divRPStatus','No one on the fight list, waiting 10 seconds');
          setTimeout('LOOTERFight.robPersonal(2,0)',10000);
          return;
        }
        LOOTERFight.RPcurRob = 0;
        LOOTERDisplay.setHTML('divRPControl','<a onclick="LOOTERFight.robPersonal(99,0);">Stop Robbing</a>');
        LOOTERFight.isRobbingPersonal=true;
        LOOTERFight.robPersonal(4,0);
        break;
        
      case 4:
        // Title, UserID, Name, Level, Mafia, tmpkey, iced, available
        LOOTERDisplay.setHTML('divRPStatus','Checking properties for ' + LOOTERConfig.curFightList[LOOTERFight.RPcurRob][2]);
        LOOTERFight.RPRobCounter=0;
        if (LOOTERConfig.currentCity != LOOTERFight.RParray[LOOTERFight.RPcurProp][0]) {
          LOOTERTravel.goCity(LOOTERFight.RParray[LOOTERFight.RPcurProp][0],'LOOTERFight.robPersonal(5,0)');
        } else {
          setTimeout('LOOTERFight.robPersonal(5,0)',100);
        }
        break;
        
      case 5:
        if (!e$('tblDrone')) LOOTERFight.isRobbingPerson = false;
        if (!LOOTERFight.isRobbingPersonal) return;
        // In the right city, load the robbing page for this user
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRobPersonal;
        url += '&target=' + LOOTERConfig.curFightList[LOOTERFight.RPcurRob][1];
        LOOTERAjax.buildAjax(url,'LOOTERFight.robPersonal','6,%ix%');
        break;
        
      case 6:
        var r = LOOTERAjax.ajax[index].response;
        //e$('divLOOTERDebug').innerHTML = r;
        var e = r.indexOf('rob_prop=' + LOOTERFight.RParray[LOOTERFight.RPcurProp][1]);
        var s = e;
        if (s < 0) {
          // Property not listed or police tape - Go to the next property
          LOOTERFight.robPersonal(7,0);
        } else {
          while (r.substr(s,8) != 'rob_slot') s--;
          var st = r.indexOf('Stamina Used',s);
          st = parseInt(r.substr(st+14));
          if (r.substr(s,e-s).indexOf('zy_progress_bar') > 0) {
            var s = r.substr(s,e-s).indexOf('rob_slot_');
            var slot = parseInt(r.substr(s+9));
            // Rob them
            LOOTERDisplay.setHTML('divRPStatus','Robbing the ' + LOOTERFight.RParray[LOOTERFight.RPcurProp][2] + ' from ' + LOOTERConfig.curFightList[LOOTERFight.RPcurRob][2]);
            var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRobProperty;
            url += '&rob_user=' + LOOTERConfig.curFightList[LOOTERFight.RPcurRob][1];
            url += '&rob_prop=' + LOOTERFight.RParray[LOOTERFight.RPcurProp][1];
            url += '&rob_city=' + LOOTERConfig.currentCity;
            url += '&slot=' + slot;
            LOOTERFight.RPStamUsed+=st;
            LOOTERAjax.buildAjax(url,'LOOTERFight.robPersonal','8,%ix%');
          } else {
            // Listed but not robbable
            LOOTERFight.robPersonal(7,0);
          }
        }
        break;

      case 7:
        if (!e$('tblDrone')) LOOTERFight.isRobbingPersonal = false;
        if (!LOOTERFight.isRobbingPersonal) return;
        LOOTERFight.RPcurProp++;
        if (LOOTERFight.RPcurProp < LOOTERFight.RParray.length) {
          setTimeout('LOOTERFight.robPersonal(4,0);',100);
        } else {
          LOOTERFight.RPcurProp = 0;
          LOOTERFight.RPcurRob++;
          if (LOOTERFight.RPcurRob < LOOTERConfig.curFightList.length) {
            setTimeout('LOOTERFight.robPersonal(4,0);',100);
          } else {
            setTimeout('LOOTERFight.robPersonal(2,0);',100);
          }
        }
        break;
              
      case 8:
        var r = LOOTERAjax.ajax[index].response;
        var s = r.indexOf('user_stamina');
        if (s > 0) {
          LOOTERConfig.curStamina = parseInt(r.substr(s+14));
        }
        LOOTERDisplay.setHTML('divLOOTERStamina',LOOTERConfig.curStamina);
        // Check for low stamina
        if (r.indexOf('do not have enough stamina') > 0) {
          LOOTERDisplay.setHTML('divRPControl','Out of stamina...stopping');
          LOOTERFight.isRobbingPersonal=false;
          return;
        }
        LOOTERFight.RPRobCounter++;
        var won = false;
        if (r.indexOf('SUCCESS!') > 0) {
          LOOTERFight.RPWin++;
          won = true;
        } else {
          LOOTERFight.RPLoss++;
        }
        LOOTERDisplay.setHTML('divRPWin',LOOTERFight.RPWin);
        LOOTERDisplay.setHTML('divRPLoss',LOOTERFight.RPLoss);
        LOOTERDisplay.setHTML('divRPStamUsed',LOOTERFight.RPStamUsed);
        if (LOOTERFight.RPStamUsed > LOOTERFight.RPMaxStam) {
          LOOTERDisplay.setHTML('divRPControl','Selected Max Stamina Used');
          LOOTERFight.isRobbingPersonal = false;
          return;
        }
        if (parseInt(LOOTERConfig.curStamina) < 25) {
          LOOTERDisplay.setHTML('divRPControl','Less Than 25 Stamina Remaining...Stopping');
          LOOTERFight.isRobbingPersonal = false;
          return;
        }
        if (LOOTERFight.RPRobCounter == LOOTERFight.RPMaxRob) {
          // Max hits on this property, move on win or lose
          LOOTERFight.robPersonal(7,0);
        } else {
          if (won) {
            setTimeout('LOOTERFight.robPersonal(5,0);',250);
          } else {
            // Lost, don't try to rob this user again
            LOOTERFight.RPcurProp = LOOTERFight.RParray.length;
            LOOTERFight.robPersonal(7,0);
          }
        }
        break;
        
      case 99:
        LOOTERFight.isRobbingPersonal = false;
        LOOTERDisplay.setHTML('divRPControl','Stopped');
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
        txt += 'You currently have ' + LOOTERConfig.curStamina + ' stamina, which will allow ' + parseInt(LOOTERConfig.curStamina/14) + ' Christmas Trees to be robbed.<br><br>';
        txt += 'How many times to rob? <select id="selRobTree" name= "selRobTree">';
        txt += '<option value="' + parseInt(LOOTERConfig.curStamina/14) + '">' + parseInt(LOOTERConfig.curStamina/13) + '</option>';
        txt += '<option value="0">-----</option>';
        for (var i=1; i < parseInt(LOOTERConfig.curStamina/14); i++)
          txt += '<option value="' + i + '">' + i + '</option>';
        txt += '</select>';
        if (LOOTERConfig.curStamina >= 14)
          txt += '<br><br><a onclick="LOOTERFight.robPresents(1,0);">Click Here to begin robbing</a></td></tr></table>';
        else
          txt += '<br><br>You do not have enough stamina to rob a Christmas Tree!';
        LOOTERDisplay.setHTML('divLOOTERSetup',txt);
        break;
        
      case 1:
        LOOTERFight.CTRobMax = e$('selRobTree').value;
        LOOTERDisplay.setHTML('divLOOTERSetup','Checking for how many presents you have');
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlChristmas;
        LOOTERAjax.buildAjax(url,'LOOTERFight.robPresents','2,%ix%');
        break;
        
      case 2:
        var r = LOOTERAjax.ajax[index].response;
        var regex = /([0-9]+)\/([0-9]+)/;
        var match = regex.exec(r);
        LOOTERFight.CTcurPresents = parseInt(match[1]);
        LOOTERFight.CTmaxPresents = parseInt(match[2]);
        if (LOOTERFight.CTcurPresents == LOOTERFight.CTmaxPresents) {
          LOOTERDisplay.setHTML('divLOOTERSetup','You are already at max presents, no need to rob');
          return;
        }
        LOOTERFight.robPresents(3,0);
        break;
      
      case 3:
        LOOTERDisplay.setHTML('divLOOTERSetup','');
        var txt = '<table id="tblARResults" name="tblARResults" style"width:450px;">';
        txt += '<tr><td style="width:150px;">Robbed:</td><td><div style="text-align:left;" id="divRobCount" name="divRobCount"></div></td></tr>';
        txt += '<tr><td style="width:150px;">Presents:</td><td><div style="text-align:left;" id="divPresentCount" name="divPresentCount"></div></td></tr>';
        txt += '<tr><td style="width:150px;">Successful Robberies:</td><td><div style="text-align:left;" id="divSuccessCount" name="divSuccessCount"></div></td></tr>';
        txt += '<tr><td style="width:150px;">Failed Robberies:</td><td><div style="text-align:left;" id="divFailedCount" name="divFailedCount"></div></td></tr>';
        txt += '<tr><td valign="top">Loot Gathered:</td><td><div style="text-align:left;" id="divRobLoot" name="divRobLoot"></div></td></tr>';
        txt += '</table>';
        txt += '<div align="center" id="divRobControl" name="divRobControl"></div>';
        LOOTERDisplay.setHTML('divLOOTERResults',txt);
        LOOTERFight.CTIsRobbing = true;
        LOOTERFight.CTSuccess = 0;
        LOOTERFight.CTFailed = 0;
        LOOTERFight.CTCurRob = 0;
        LOOTERFight.CTLoot.length = 0;
        LOOTERFight.robPresents(4,0);
        LOOTERDisplay.setHTML('divRobControl','<a onclick="LOOTERFight.CTIsRobbing=false;LOOTERDispaly.setHTML(\'divRobControl\',\'Stopping...\');">Stop Robbing</a>');
        break;
        
      case 4:
        if (LOOTERFight.CTIsRobbing == false) {
          LOOTERDisplay.setHTML('divRobControl','Stopped robbing by user selection');
          return;
        }
        LOOTERDisplay.setHTML('divRobCount',LOOTERFight.CTCurRob + '/' + LOOTERFight.CTRobMax);
        LOOTERDisplay.setHTML('divPresentCount',LOOTERFight.CTcurPresents + '/' + LOOTERFight.CTmaxPresents);
        LOOTERDisplay.setHTML('divSuccessCount',LOOTERFight.CTSuccess);
        LOOTERDisplay.setHTML('divFailedCount',LOOTERFight.CTFailed);
        if (LOOTERFight.CTCurRob >= LOOTERFight.CTRobMax) {
          LOOTERDisplay.setHTML('divRobControl','All robbing complete');
          return;
        }
        if (LOOTERFight.CTcurPresents == LOOTERFight.CTmaxPresents) {
          LOOTERDisplay.setHTML('divRobControl','Max presents reached...stopping');
          return;
        }
        if (LOOTERConfig.curStamina < 6) {
          LOOTERDisplay.setHTML('divRobControl','Out of Stamina...stopping');
          return;
        }
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlLoadRobbing;
        LOOTERAjax.buildAjax(url,'LOOTERFight.robPresents','5,%ix%');
        break;
        
      case 5:
        // Robbing board loaded, check for Christmas tree
        var r = LOOTERAjax.ajax[index].response;
        LOOTERParser.getStatsFromPage(r);
        var s = r.indexOf('Christmas Tree');
        if (s > 0) {
          while (r.substr(s,9) != 'rob_slot_' && s > 0) s--;
          var slot = parseInt(r.substr(s+9));
          var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRunRobbing;
          url += '&slot=' + slot + '&xw_city=' + LOOTERConfig.currentCity;
          LOOTERAjax.buildAjax(url,'LOOTERFight.robPresents','6,%ix%');
        } else {
          // No Christmas tree, must be over
          LOOTERDisplay.setHTML('divLOOTERResults','No Christmas Tree found, promotion must be over');
          return;
        }
        break;
        
      case 6:
        var r = LOOTERAjax.ajax[index].response;
        if (r.indexOf('Sorry, please try again later') > 0) {
          // Already robbed, get new
          LOOTERFight.robPresents(7,0);
        } else if (r.indexOf('Failed') > 0 ) {
          LOOTERFight.CTCurRob++;
          LOOTERFight.CTFailed++;
        } else if (r.indexOf('Success') > 0 ) {
          LOOTERFight.CTCurRob++;
          LOOTERFight.CTSuccess++;
          var regex = /You gained:.+title=."([a-zA-Z0-9\s]+)/;
          var match = regex.exec(r);
          if (match)
            if (match[1].indexOf('Present') > 0) LOOTERFight.CTcurPresents++;
          var am = -1;
          for (var i=0; i < LOOTERFight.CTLoot.length; i++) {
            if (LOOTERFight.CTLoot[i][0] == match[1])
              am = i;
          }
          if (am == -1) {
            LOOTERFight.CTLoot[LOOTERFight.CTLoot.length] = new Array(match[1],1);
          } else {
            LOOTERFight.CTLoot[am][1]++;
          }
          var txt = '';
          for (var i=0; i < LOOTERFight.CTLoot.length; i++)
            txt += LOOTERFight.CTLoot[i][0] + ' (x' + LOOTERFight.CTLoot[i][1] + ')<br>';
          LOOTERDisplay.setHTML('divRobLoot',txt);
        } else {
          // Something else
        }
        if (LOOTERFight.CTCurRob < LOOTERFight.CTRobMax) {
          var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRobRefresh;
          LOOTERAjax.buildAjax(url,'LOOTERFight.robPresents','4,%ix%');
        } else {
          LOOTERFight.robPresents(4,0);
        }
        break;
    }
  };
  
  this.updateRobbing = function() {
    for (var i=0; i < 9; i++) {
      if (LOOTERFight.arRobSpots[i] != null) {
        LOOTERDisplay.setHTML('divProp' + i,LOOTERFight.arRobSpots[i][0]);
        LOOTERDisplay.setHTML('divDiff' + i,LOOTERFight.arRobSpots[i][1]);
        LOOTERDisplay.setHTML('divResult' + i,LOOTERFight.arRobSpots[i][2]);
        LOOTERDisplay.setHTML('divCost' + i,LOOTERFight.arRobSpots[i][3]);
        LOOTERDisplay.setHTML('divSize' + i,LOOTERFight.arRobSpots[i][4]);
      }
    }
  };
  this.setAutoRobCity = function(city) {
    for (var i=0; i < LOOTERItems.cities.length; i++)
      if (city != LOOTERItems.cities[i][3])
        e$('ckRobCity' + LOOTERItems.cities[i][3]).checked = false;
  };

  this.quickAttackReset = function() {
    LOOTERFight.qkFightCount = 0;
    LOOTERFight.qkFightsToDo = 0;
    LOOTERFight.qkSuccess = 0;
    LOOTERFight.qkFail = 0;
    LOOTERFight.qkNothing = 0;
    LOOTERFight.qkWeak = false;
    this.fighttempkey = null;
  };  

  this.quickAttack = function(step,index,qty) {
    switch(step) {
      case 0:
        LOOTERFight.quickAttackReset();
        LOOTERFight.qkFightsToDo = qty;
        if (!LOOTERParser.getTargetUser()) {
          LOOTERDisplay.addLine('This function must be run from a user\'s profile page',LOOTERConfig.clrWarning);
          break;
        }
        // Get the fight key
        LOOTERFight.fighttmpkey = LOOTERParser.setTempKey(document.body.innerHTML,'fight');
        if (!LOOTERFight.fighttmpkey) {
          LOOTERDisplay.addLine('Could not locate temporary key, please reload user profile and try again',LOOTERConfig.clrWarning);
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
        LOOTERDisplay.setHTML('divLOOTERResults',txt);

        LOOTERDisplay.setHTML('divQStatus',LOOTERFight.beatdowns[parseInt(LOOTERFight.beatdowns.length * Math.random())] + '...');
        // Now start blasting them
        var sendcount = 0;
        while (sendcount < qty && !LOOTERFight.qkWeak) {
          setTimeout("LOOTERFight.quickAttack(1,0,0)",sendcount * 250);
          sendcount++;
        }
        break;
      
      case 1:  
        // Build the fight url and start it
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlAttack;
        url += '&xw_city=' + LOOTERConfig.currentCity;
        url += '&opponent_id=' + LOOTERParser.getTargetUser() + '&tmp=' + LOOTERFight.fighttmpkey;
        if (!LOOTERFight.qkWeak)
          setTimeout("LOOTERAjax.buildAjax('" + url + "','LOOTERFight.quickAttack','2,%ix%," + i + "')",i*200);
        else  
          LOOTERDisplay.setHTML('divQStatus','Health low, stopping after current fights complete');
        break;

      case 2:
        // Fight done, parse
        if (LOOTERAjax.ajax[index]) {
          var r = LOOTERAjax.ajax[index].response;
          //e$('divLOOTERDebug').innerHTML = '<textarea>' + r + '</textarea>' + r;
          LOOTERFight.qkFightCount = parseInt(LOOTERFight.qkFightCount) + 1;
          LOOTERDisplay.setHTML('divQAttackRun',LOOTERFight.qkFightCount);
          if (r.indexOf('You win') > 0) {
            LOOTERFight.qkSuccess = parseInt(LOOTERFight.qkSuccess) + 1;
            LOOTERDisplay.setHTML('divQAttackSuccess',LOOTERFight.qkSuccess);
          } else if (r.indexOf('You lose') > 0) {
            LOOTERFight.qkFail = parseInt(LOOTERFight.qkFail) + 1;
            LOOTERDisplay.setHTML('divQAttackFail',LOOTERFight.qkFail);
          } else if (r.indexOf('You do not have enough health to keep fighting') > 0) {
            if (!LOOTERFight.qkWeak) LOOTERDisplay.addLine('Not enough health to continue fighting.',LOOTERConfig.clrWarning);
            LOOTERFight.qkWeak = true;
          } else {
            // Something unexplained came back
            LOOTERFight.qkNothing = parseInt(LOOTERFight.qkNothing) + 1;
            LOOTERDisplay.setHTML('divQAttackBad',LOOTERFight.qkNothing);
          }
        } else {
          LOOTERFight.qkNothing = LOOTERFight.qkNothing + 1;
          LOOTERDisplay.setHTML('divQAttackBad',LOOTERFight.qkNothing);
        }
        if (parseInt(LOOTERFight.qkFightCount)+parseInt(LOOTERFight.qkNothing) == parseInt(LOOTERFight.qkFightsToDo))
          LOOTERDisplay.setHTML('divQStatus','Finished');
        break;
    }
  };
};

/***************************************
  Single job runner
****************************************/
function LOOTERJobDef() {

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
    for (var i=0; i < LOOTERItems.cities.length; i++) 
      this.totalmoney[i] = 0;

  };

  this.runJobs = function(step,index) {

    switch(step) {

      case 0: // Initial setup
        LOOTERJob.reset();
        var txt = '';
        txt += '<table name="tblRunJobSetup" id="tblRunJobSetup">';
        txt += '<tr><th colspan="' + LOOTERItems.cities.length + '"><div name="divRunJobParams" id="divRunJobParams">Select quantity and job to run</div></th></tr>';
        txt += '<tr><td colspan="' + LOOTERItems.cities.length + '" name="tdQuantity" id="tdQuantity">';
        txt += 'Quantity to run: <select name="selJobQty" id="selJobQty" onchange="LOOTERJob.setQty()">';
        txt += '<option value="999999">All Energy</option>';
        for (var i=1; i < 100; i++) {txt += '<option value="' + i + '">' + i + '</option>';}        
        for (var i=100; i < 250; i+=25) {txt += '<option value="' + i + '">' + i + '</option>';}        
        for (var i=250; i < 500; i+=50) {txt += '<option value="' + i + '">' + i + '</option>';}        
        for (var i=500; i <= 2000; i+=100) {txt += '<option value="' + i + '">' + i + '</option>';}
        txt += '</select>'; 
        txt += '</td></tr>';
        txt += '<tr name="trJobTabs" id="trJobTabs">';
        for (var i=0; i < LOOTERItems.cities.length; i++) {
          txt += '<td id="tdJobTab' + i + '" name="tdJobTab' + i + '" onclick="LOOTERJob.showTab(' + i + ');">' + LOOTERItems.cities[i][0] + '</td>';
        }
        txt += '</tr>';
        txt += '<tr><td colspan="' + LOOTERItems.cities.length + '" id="tdCityJobs" name="tdCityJobs">';
        for (var i=0; i < LOOTERItems.cities.length; i++) {
          txt += '<div id="divCityJobs' + i + '" name="divCityJobs' + i + '" style="display:none;">';
          txt += '<table>';
          var curcol = 0;
          for (var j=1; j < LOOTERItems.jobLevels[i].length; j++) {
            if (curcol == 0) txt += '<tr>';
            txt += '<td>';
            txt += '<div>'+ LOOTERItems.jobLevels[i][j] + '</div>';
            for (var k=0; k < LOOTERItems.jobs.length; k++) {
              if (LOOTERItems.jobs[k][0]==LOOTERItems.cities[i][8] && LOOTERItems.jobs[k][1]==j) {
                if (parseInt(LOOTERItems.jobs[k][6]) != 0 && parseInt(LOOTERItems.jobs[k][7]) != 0) {
                  txt += '<a onclick="LOOTERJob.setJob(' + k + ');">' + LOOTERItems.jobs[k][3] + '</a>';
                  if (LOOTERItems.jobs[k][4]!='') {
                    if (LOOTERItems.jobs[k][5] == true) {
                      txt += '<br />&nbsp;&nbsp;<font style="color:' + LOOTERConfig.clrHighlight + '"> *HEL - ' + LOOTERItems.jobs[k][4] + '</font>';
                    } else {
                      txt += '<br />&nbsp;&nbsp;<font style="color:' + LOOTERConfig.clrInfo + '"> Loot - ' + LOOTERItems.jobs[k][4] + '</font>';
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
        LOOTERDisplay.setHTML('divLOOTERSetup',txt);
        LOOTERJob.showTab(0);
        break;

      case 1: // Start running the jobs
        LOOTERDisplay.clearSetup();
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
        LOOTERDisplay.setHTML('divLOOTERResults',txt);        
        LOOTERJob.updateJobResults();
        LOOTERDisplay.setHTML('divJobStatus','Running');
        LOOTERDisplay.setHTML('divJobControl','<a onclick="javascript:LOOTERJob.pause();">Pause</a>');
        LOOTERJob.isRunning = true;
        LOOTERJob.isPaused = false;
        LOOTERJob.runJobs(2,-1);
        break;

      case 2: // Main Loop
        if (LOOTERConfig.Session==1 && LOOTERJob.isRunning && !LOOTERJob.isPaused) {
          if (LOOTERConfig.currentCity != (parseInt(LOOTERItems.jobs[LOOTERJob.jobToRun][0])+1)) {
            // Wrong city, travel
            LOOTERTravel.goCity((parseInt(LOOTERItems.jobs[LOOTERJob.jobToRun][0])+1),'LOOTERJob.runJobs(2,0)');
            break;
          }
  
          // In the right city, select the job tab
          if (LOOTERJob.curJobTab != LOOTERItems.jobs[LOOTERJob.jobToRun][1]) {
            var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlSwitchJobTab;
            url += '&xw_city=' + LOOTERConfig.currentCity;
            url += '&xw_controller=' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2];
            url += '&' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][5] + '=' + LOOTERItems.jobs[LOOTERJob.jobToRun][1];
            url += '&tmp=' + LOOTERConfig.tmpkey;
            LOOTERAjax.buildAjax(url,'LOOTERJob.runJobs','2,%ix%');
            LOOTERJob.curJobTab = LOOTERItems.jobs[LOOTERJob.jobToRun][1];
            break;
          }
  
          // Right city and right tab, run the job
          if (index != -1) {
            LOOTERJob.jobtmpkey = LOOTERParser.setTempKey(LOOTERAjax.ajax[index].response,'job');
          } 
          var url  = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRunJob;
          //url += '&xw_controller=' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2];
          url += '&xw_controller=' + LOOTERJob.specialcontroller;
          if (LOOTERJob.specialcontroller != LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2])
            url += '&no_load=1';
          url += '&xw_city=' + LOOTERConfig.currentCity;
          url += '&' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][5] + '=' + LOOTERItems.jobs[LOOTERJob.jobToRun][1]; 
          url += '&job=' + LOOTERItems.jobs[LOOTERJob.jobToRun][2];
          url += '&tmp=' + LOOTERJob.jobtmpkey;
          if (LOOTERConfig.currentCity == 7) {
            url += '&clkdiv=btn_dojob_' + LOOTERItems.jobs[LOOTERJob.jobToRun][2];
          }
          LOOTERDisplay.setHTML('divJobStatus','Running Job');
          LOOTERAjax.buildAjax(url,'LOOTERJob.runJobs','3,%ix%');
        }
        break;
              
      case 3: // Job ran, parse results
        if (LOOTERAjax.ajax[index]) {
          var r = LOOTERAjax.ajax[index].response;
          //e$('divLOOTERDebug').innerHTML += '<textarea>' + r + '</textarea>';
          LOOTERParser.parseJobResults(r);
          if (r.indexOf('class="messages"') > 0) r = r.substr(r.indexOf('class="messages"'));
          LOOTERTimers.updateStats(1,index);
          if (res['jobResults'] == 'Completed') {
            LOOTERJob.jobtmpkey = LOOTERParser.setTempKey(r,'job')?LOOTERParser.setTempKey(r,'job'):LOOTERJob.jobtmpkey;
            LOOTERJob.jobsrun++;
            if (res['jobExtraExp']) {LOOTERJob.extraexpcount++;LOOTERJob.extraexp+=parseInt(res['jobExtraExp']);}
            if (res['jobEnergySpent']==0) LOOTERJob.freejobs++;
            if (!isNaN(parseInt(res['jobMoney']))) LOOTERJob.totalmoney[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)] += parseInt(res['jobMoney']);
            if (!isNaN(parseInt(res['jobExtraMoney']))) {LOOTERJob.extramoney++;LOOTERJob.totalmoney[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)]+=parseInt(res['jobExtraMoney']);}
            // Check the loot
            if (res['jobLoot']) {
              var lindex = -1;
              for (var i = 0; i < LOOTERJob.lootitems.length; i++) {
                if (LOOTERJob.lootitems[i][1]==res['jobLoot']) 
                  lindex = i;
              }
              if (lindex == -1) {
                LOOTERJob.lootitems[LOOTERJob.lootitems.length] = new Array(1,res['jobLoot']);
              } else {
                LOOTERJob.lootitems[lindex][0] = parseInt(LOOTERJob.lootitems[lindex][0]) + 1;
              }
            }
            LOOTERJob.updateJobResults();
            if (parseInt(LOOTERJob.jobsrun) < parseInt(LOOTERJob.qtyToRun)) {
              if (LOOTERConfig.currentCity == 5 || LOOTERConfig.currentCity == 6) LOOTERJob.curJobTab = -1;
              LOOTERJob.jobruntimer = setTimeout("LOOTERJob.runJobs(2,-1);",250);
            } else {
              LOOTERDisplay.setHTML('divJobStatus','<font style="color:' + LOOTERConfig.clrGood + '">All jobs complete</font>');
            }
          } else {
            // Got return value, but wasn't successful run
            if (res['timeout']) {
              LOOTERJob.isRunning = false;
              LOOTERDisplay.setHTML('divJobStatus','<font style="color:' + LOOTERConfig.clrFatal + '">Session has timed out...stopping</font>');
              LOOTERDisplay.addLine('Session has timed out...stopping running jobs',LOOTERConfig.clrFatal);
              break;
            }
            if (r.indexOf('session has timed out') > 0) {
              // Wrong temp key, get a new one
              LOOTERDisplay.setHTML('divJobStatus','<font style="color:' + LOOTERConfig.clrWarning + '">Temp key has expired, attempting to refresh key</font>');
              LOOTERJob.curJobTab = -1;
              LOOTERJob.jobruntimer = setTimeout("LOOTERJob.runJobs(2,-1);",250);
              break;
            }
            if (r.indexOf('need more energy') > 0) {
              //e$('divLOOTERDebug').innerHTML += '<textarea>' + r + '</textarea>' + r;
              LOOTERDisplay.setHTML('divJobStatus','No energy remaining...waiting for additional energy');
              LOOTERJob.curJobTab = -1; // Force tmpkey refresh
              LOOTERJob.jobruntimer = setTimeout("LOOTERJob.runJobs(2,-1);",30000);
              break;
            }
            if (res['jobResults']=='Failed') {
              LOOTERDisplay.setHTML('divJobStatus','<font style="color:' + LOOTERConfig.clrWarning + '">Job did not run correctly, attempting to recover</font>');
              // Reload the city and try again
              var tcity = LOOTERConfig.currentCity;
              LOOTERConfig.currentCity = -1;
              LOOTERTravel.goCity(tcity,"LOOTERJob.runJobs(2,-1)");
              //LOOTERJob.jobruntimer = setTimeout("LOOTERJob.runJobs(2,-1);",5000);
              break;
            }
            
            LOOTERDisplay.setHTML('divJobStatus','<font style="color:' + LOOTERConfig.clrFatal + '">Could not understand response from server.  Stopping job running</font>');
            LOOTERJob.isRunning = false;
            break;
          }
        } else {
          // AJAX non-existant
          LOOTERDisplay.setHTML('divJobStatus','<font style="color:' + LOOTERConfig.clrFatal + '">No response returned from server, attempting to recover</font>');
          LOOTERConfig.currentCity = -1; // Force travel to city again
          LOOTERJob.curJobTab = -1; // Force tmpkey refresh
          LOOTERJob.jobruntimer = setTimeout("LOOTERJob.runJobs(2,-1);",5000);
        }
        break;
    }
  };

  this.pause = function() {
    LOOTERJob.isPaused = true;
    if (LOOTERJob.jobruntimer) clearTimeout(LOOTERJob.jobruntimer);
    LOOTERDisplay.setHTML('divJobStatus','Paused');
    LOOTERDisplay.setHTML('divJobControl','<a onclick="LOOTERJob.resume();">Resume</a>');
  }

  this.resume = function() {
    LOOTERDisplay.setHTML('divJobControl','<a onclick="LOOTERJob.pause();">Pause</a>');
    LOOTERDisplay.setHTML('divJobStatus','Running');
    LOOTERJob.isPaused = false;
    LOOTERJob.runJobs(2,-1);
  }

  this.updateJobResults = function() {
    LOOTERDisplay.setHTML('divExpNeeded',LOOTERDisplay.setGoodColor(parseInt(LOOTERConfig.curExpNeeded) - parseInt(LOOTERConfig.curExp))); 
    LOOTERDisplay.setHTML('divJobsRun',LOOTERDisplay.setGoodColor(LOOTERJob.jobsrun + '/' + LOOTERJob.qtyToRun));
    LOOTERDisplay.setHTML('divEngLeft',LOOTERDisplay.setGoodColor(LOOTERConfig.curEnergy));
    LOOTERDisplay.setHTML('divFreeJobs',LOOTERDisplay.setGoodColor(LOOTERJob.freejobs + ' (' + LOOTERString.percentage(LOOTERJob.freejobs/LOOTERJob.jobsrun,2) + '%)'));
    LOOTERDisplay.setHTML('divCurRatio',LOOTERDisplay.setGoodColor(LOOTERConfig.curRatio));
    LOOTERDisplay.setHTML('divExtraExp',LOOTERDisplay.setGoodColor(LOOTERJob.extraexpcount + ' for ' + LOOTERJob.extraexp + ' (' + LOOTERString.percentage(LOOTERJob.extraexpcount/LOOTERJob.jobsrun,2) + '%)'));
    LOOTERDisplay.setHTML('divExtrMoney',LOOTERDisplay.setGoodColor(LOOTERJob.extramoney));
    var txt = '';
    for (var i=0; i < LOOTERItems.cities.length; i++) {
        txt += LOOTERItems.cities[i][6] + LOOTERJob.totalmoney[i] + '&nbsp;&nbsp;&nbsp;';
    }
    LOOTERDisplay.setHTML('divTotalMoney',LOOTERDisplay.setGoodColor(txt));
    var txt = '';
    for (var i=0; i < LOOTERJob.lootitems.length; i++) {
      txt += LOOTERJob.lootitems[i][1] + ' (x' + LOOTERJob.lootitems[i][0] + ')';
      if (i < LOOTERJob.lootitems.length-1) txt += ' - ';
    }
    LOOTERDisplay.setHTML('divLoot',LOOTERDisplay.setGoodColor(txt));
    
  };

  this.showTab = function(tab) {
    for (var i=0; i < LOOTERItems.cities.length; i++) {
      if (i==tab) {
        LOOTERDisplay.show('divCityJobs' + i);
        e$('tdJobTab' + i).style.backgroundColor= LOOTERDisplay.buttonbgcolor;
      } else {
        LOOTERDisplay.hide('divCityJobs' + i);
        e$('tdJobTab' + i).style.backgroundColor = LOOTERDisplay.headerbgcolor;
      }
    } 
  };

  this.setQty = function() {
    LOOTERJob.qtyToRun = e$('selJobQty').value;
    if (LOOTERJob.jobToRun != -1 && parseInt(LOOTERJob.qtyToRun) != 0) {
      e$('divRunJobParams').innerHTML = 'Ready to run ' + LOOTERJob.qtyToRun + ' "' + LOOTERItems.jobs[LOOTERJob.jobToRun][3] + '" job' + ((parseInt(LOOTERJob.qtyToRun) > 1)?'s':'');
      e$('divRunJobParams').innerHTML += '  <a onclick="LOOTERJob.runJobs(1,0);">Start Running</a>';
    }
  };
  this.setJob = function(jobid) {
    LOOTERJob.jobToRun = jobid;
    LOOTERJob.qtyToRun = e$('selJobQty').value;
    if (LOOTERJob.jobToRun != -1 && parseInt(LOOTERJob.qtyToRun) != 0) {
      e$('divRunJobParams').innerHTML = 'Ready to run ' + LOOTERJob.qtyToRun + ' "' + LOOTERItems.jobs[LOOTERJob.jobToRun][3] + '" job' + ((parseInt(LOOTERJob.qtyToRun) > 1)?'s':'');
      e$('divRunJobParams').innerHTML += '  <a onclick="LOOTERJob.runJobs(1,0)">Start Running</a>';
    }
  };
  
};

/***************************************
  Mini-pack
****************************************/
function LOOTERMinipackDef() {

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
    LOOTERDisplay.setHTML('divLOOTERSetup',txt);
  };
};

/***************************************
  Smart Drone Runner
****************************************/
function LOOTERDroneRunnerDef() {
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
    this.startinglevel = LOOTERConfig.curLevel;
    this.curJobCity = LOOTERConfig.currentCity;
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
    this.specialcontroller = LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2];
    for (var i=0;i<LOOTERItems.cities.length;i++) this.totalmoney[i]=0;
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
    LOOTERDrone.resetSettings();
    if (LOOTERCookie.readCookie('mwjobs_updated'))
      lastupdate = LOOTERCookie.readCookie('mwjobs_udated');
    else
      lastupdate = new Date().getTime();
      
    // See if the job payouts need to be updated
    if (new Date().getTime() - lastupdate < LOOTERDrone.updateInterval) {
      LOOTERDisplay.addLine('It has been a while since you have updated the job payouts.  For maximum effectiveness, this should be updated.',LOOTERConfig.clrWarning);
      LOOTERDrone.updateWarning = true;
    }
    
    // Load the user preferences
    if (LOOTERCookie.readCookie('LOOTERdrone')) {
      var dr = LOOTERCookie.readCookie('LOOTERdrone');
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
    txt += '<td colspan="2"><input type="checkbox" onclick="LOOTERDrone.fightrobck(1);" name="ckSTFight" id="ckSTFight"' + (this.stamFight==true?' checked':'') + '> Fight&nbsp;&nbsp;&nbsp;';
    txt += '<input type="checkbox" onclick="LOOTERDrone.fightrobck(2);" name="ckSTRob" id="ckSTRob"' + (this.stamRob==true?' checked':'') + '> Rob';
    txt += '<input type="checkbox" onclick="LOOTERDrone.fightrobck(3);" name="ckSTFightRob" id="ckSTFightRob"' + (this.stamFightRob==true?' checked':'') + '> Fight then Rob';
    txt += '<input type="checkbox" onclick="LOOTERDrone.fightrobck(4);" name="ckSTRobFight" id="ckSTRobFight"' + (this.stamRobFight==true?' checked':'') + '> Rob then Fight</td>';
    //txt += '<td><input type="checkbox" name="ckENUseFirst" id="ckENUseFirst"' + (this.useEnergyFirst==true?' checked':'') + ' onclick="e$(\'ckEnergy\').checked=(this.checked==true?true:e$(\'ckEnergy\').checked);"> Use Energy First</td>';
    txt += '<td>For F/R or R/F, switch at <input type="text" size="5" name="txtFRSwitch" id="txtFRSwitch" value="' + this.FRSwitch + '"> energy remaining</td>';
    txt += '</tr>';
    txt += '<tr>';
    txt += '<td colspan="4">Fighting: Max Lvl: <input size="5" type="text" name="txtFLevel" id="txtFLevel" value="' + this.fightLevel + '"> - Max Mafia: <input size="3" type="text" name="txtFMafia" id="txtFMafia" value="' + this.fightMafia + '">';
    txt += '&nbsp;&nbsp;Rob in ';
    txt += '<select name="selRobCity" id="selRobCity">';
    for (var i=0; i < LOOTERItems.cities.length; i++) {
      txt += '<option value="' + LOOTERItems.cities[i][3] + '"' + (parseInt(LOOTERItems.cities[i][3])==parseInt(this.stamRobCity)?' selected':'') + '>' + LOOTERItems.cities[i][0] + '</option>';
    }
    txt += '</select>&nbsp;&nbsp;';
    txt += 'Fight in ';
    txt += '<select name="selFightCity" id="selFightCity">';
    for (var i=0; i < LOOTERItems.cities.length; i++) {
      txt += '<option value="' + LOOTERItems.cities[i][3] + '"' + (parseInt(LOOTERItems.cities[i][3])==parseInt(this.stamFightCity)?' selected':'') + '>' + LOOTERItems.cities[i][0] + '</option>';
    }
    txt += '</select>&nbsp;&nbsp;';
    txt += 'Heal in ';
    txt += '<select name="selHealCity" id="selHealCity">';
    for (var i=0; i < LOOTERItems.cities.length; i++) {
      txt += '<option value="' + LOOTERItems.cities[i][3] + '"' + (parseInt(LOOTERItems.cities[i][3])==parseInt(this.stamHealCity)?' selected':'') + '>' + LOOTERItems.cities[i][0] + '</option>';
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
    txt += '<option value="0"' + (parseInt(LOOTERDrone.RobDelay)==0?' selected':'') + '>None</option>';
    txt += '<option value="100"' + (parseInt(LOOTERDrone.RobDelay)==100?' selected':'') + '>0.10</option>';
    txt += '<option value="250"' + (parseInt(LOOTERDrone.RobDelay)==250?' selected':'') + '>0.25</option>';
    txt += '<option value="500"' + (parseInt(LOOTERDrone.RobDelay)==500?' selected':'') + '>0.50</option>';
    txt += '<option value="750"' + (parseInt(LOOTERDrone.RobDelay)==750?' selected':'') + '>0.75</option>';
    txt += '<option value="1000"' + (parseInt(LOOTERDrone.RobDelay)==1000?' selected':'') + '>1.00</option>';
    txt += '<option value="2000"' + (parseInt(LOOTERDrone.RobDelay)==2000?' selected':'') + '>2.00</option>';
    txt += '</select> seconds between robbing calls';
    txt += '</tr>';
    txt += '<tr><td colspan="4">Your account may be flagged and disabled if the robbing delay value is set too low.  Use low numbers at your own risk.</td></tr>';
    txt += '<tr>';
    txt += '<td colspan="4">Don\'t fight people with these characters in their name: ';
    txt += '<input size="120" type="text" name="txtIgnore" id="txtIgnore" value="';
    for (var i=0; i < LOOTERDrone.FIgnore.length; i++) {
      txt += LOOTERDrone.FIgnore[i] + ' ';
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
    for (var i=0; i < LOOTERAccount.skills.length; i+=2) {
      txt += '<option value="' + LOOTERAccount.skills[i] + '"' + (LOOTERAccount.skills[i]==this.skillToSpend?' selected':'') + '>' + LOOTERAccount.skills[i+1] + '</option>';
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
    for (var i=0; i < LOOTERItems.jobs.length; i++) {
      if (LOOTERItems.jobs[i][5]==true) {
        ccnt+=1;
        if (ccnt > this.lootCols) {
          txt += '</tr><tr>';
          ccnt = 1;
        }
        txt += '<td><input type="checkbox" value="' + i + '" name="HEL' + i + '" id="HEL' + i + '"> ' + LOOTERItems.jobs[i][4] + '</td>';
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
    for (var i=0; i < LOOTERItems.jobs.length; i++) {
      if (LOOTERItems.jobs[i][5]==false && LOOTERItems.jobs[i][4]!='' && LOOTERItems.jobs[i][6]!=0) {
      //if (LOOTERItems.jobs[i][5]==false && LOOTERItems.jobs[i][4]!='') {
        ccnt+=1;
        if (ccnt > this.lootCols) {
          txt += '</tr><tr>';
          ccnt = 0;
        }
        txt += '<td><input type="checkbox" value="' + i + '" name="Loot' + i + '" id="Loot' + i + '"> ' + LOOTERItems.jobs[i][4] + '</td>';
      }
    }
    txt += '</tr>';
    txt += '</table>';
    txt += '</td>';
    txt += '</tr>';
    txt += '<tr><th colspan="4><div id="divLOOTERDroneStart" name="divLOOTERDroneStart"><input type="button" value="Start Drone" onclick="LOOTERDrone.run(0,0)"></div></th></tr>';
    txt += '</table>';
    LOOTERDisplay.setHTML('divLOOTERSetup',txt);
  
  };
  

  this.run = function(step,index) {
    switch(step) {
      case 0:
        LOOTERDrone.resetSettings();
        LOOTERDrone.isRunning = true;
        var curcookie = '';
        // Set the robbing settings if robbing city selected.
        //if (e$('ckSTRob').checked && e$('selRobCity').value != '0') e$('ckENUseFirst').checked=true;
        if (e$('ckStamina').checked) {LOOTERDrone.useEnergyFirst = true;LOOTERDrone.burnStamina = true;curcookie+='stamina|';}
        if (e$('ckSTFight').checked) {LOOTERDrone.stamFight = true;curcookie+='stfight|';}
        if (e$('ckSTRob').checked) {LOOTERDrone.stamRob = true;curcookie+='strob|';}
        if (e$('ckSTFightRob').checked) {LOOTERDrone.stamFightRob = true;curcookie+='stfightrob|';}
        if (e$('ckSTRobFight').checked) {LOOTERDrone.stamRobFight = true;curcookie+='strobfight|';}
        LOOTERDrone.FRSwitch = e$('txtFRSwitch').value;
        if (isNaN(LOOTERDrone.FRSwitch)) LOOTERDrone.FRSwitch = 0;
        LOOTERDrone.FDelay = e$('txtFDelay').value;
        if (isNaN(LOOTERDrone.FDelay)) LOOTERDrone.FDelay = 0;
        curcookie+='fdelay|' + LOOTERDrone.FDelay + '|';
        LOOTERDrone.RobDelay = e$('selRDelay').value;
        if (isNaN(LOOTERDrone.RobDelay)) LOOTERDrone.RobDelay = 1000;
        curcookie+='rdelay|' + LOOTERDrone.RobDelay + '|';
        curcookie+='frswitch|' + LOOTERDrone.FRSwitch + '|';
        if (isNaN(e$('txtFLevel').value)) e$('txtFLevel').value = '25000';
        if (isNaN(e$('txtFMafia').value)) e$('txtFMafia').value = '501';
        curcookie+='flevel|' + e$('txtFLevel').value + '|';
        curcookie+='fmafia|' + e$('txtFMafia').value + '|';
        LOOTERDrone.fightLevel = e$('txtFLevel').value;
        LOOTERDrone.fightMafia = e$('txtFMafia').value;
        if (e$('ckBoss').checked) {LOOTERDrone.stopForBoss = true;curcookie+='stopboss|';}
        if (e$('ckLevel').checked) {LOOTERDrone.stopForLevel = true;curcookie+='stoplevel|';}
        if (e$('ckNoMoney').checked) {LOOTERDrone.noReqMoney = true;curcookie+='nomoney|'; }
        if (e$('ckNoItem').checked) {LOOTERDrone.noReqItem = true;curcookie+='noitem|'; }
        //if (e$('ckBestVegas').checked) {LOOTERDrone.bestVegas = true;curcookie+='bestvegas|'; }
        LOOTERDrone.BurstMode = false;
        if (e$('ckStopRatio').checked) {LOOTERDrone.StopRatio = true;curcookie+='stopratio|';}
        if (e$('ckStopEng').checked) {LOOTERDrone.StopEng = true;curcookie+='stopeng|';}
        LOOTERDrone.stamRobCity = e$('selRobCity').value;curcookie+='robcity|' + LOOTERDrone.stamRobCity + '|';
        LOOTERDrone.stamFightCity = e$('selFightCity').value;curcookie+='fightcity|' + LOOTERDrone.stamFightCity + '|';
        LOOTERDrone.stamHealCity = e$('selHealCity').value;curcookie+='healcity|' + LOOTERDrone.stamHealCity + '|';
        LOOTERDrone.StopRatioVal = e$('txtStopRatio').value;curcookie+='stopratioval|' + LOOTERDrone.StopRatioVal + '|';
        LOOTERDrone.StopEngVal = e$('txtStopEng').value;curcookie+='stopengval|' + LOOTERDrone.StopEngVal + '|';
        if (isNaN(LOOTERDrone.StopRatioVal)) {LOOTERDrone.StopRatio=false;LOOTERDrone.StopRatioVal='';}
        if (isNaN(LOOTERDrone.StopEngVal)) {LOOTERDrone.StopEng=false;LOOTERDrone.StopEngVal='';}
        LOOTERDrone.runHELJobs = false;
        LOOTERDrone.runLootJobs = false;
        for (var i=0; i < LOOTERItems.jobs.length; i++) {
          if (e$('HEL' + i)) {
            if (e$('HEL' + i).checked) {
              LOOTERDrone.runHELJobs = true;
              curcookie+='hel|';
              LOOTERDrone.HELJobs[LOOTERDrone.HELJobs.length] = i;
            }
          }
          if (e$('Loot' + i)) {
            if (e$('Loot' + i).checked) {
              LOOTERDrone.runLootJobs = true;
              curcookie+='loot|';
              LOOTERDrone.LootJobs[LOOTERDrone.LootJobs.length] = i;
            }
          }
        }
        if (e$('ckChips').checked) {LOOTERDrone.ChipsDecksOnly = true;curcookie+='chips|';}
        if (e$('ckBeef').checked) {LOOTERDrone.BeefPokerOnly = true;curcookie+='beef|';}
        if (e$('ckSpend').checked) {LOOTERDrone.spendSkillPoints = true;curcookie+='spendskill|';}
        LOOTERDrone.skillToSpend = e$('selSkill').value; curcookie+=e$('selSkill').value + '|';
        if (e$('ckDelay').checked) {LOOTERDrone.ForceDelay = true;LOOTERDrone.ForceDelayVal=e$('txtDelay').value;curcookie+='delay|' + e$('txtDelay').value + '|';}
        //if (e$('ckDeposit').checked) {LOOTERDrone.depositMoney = true;curcookie+='deposit|';}
        //if (e$('ckJump').checked) {LOOTERDrone.BigJump = true;curcookie+='jump|';}
        if (e$('ckAdjust').checked) {LOOTERDrone.AdjustTime = true; curcookie+='adjust|';}
        var ta = e$('txtIgnore').value.split(' ');
        var igcookie = '';
        LOOTERDrone.FIgnore.length = 0;
        for (var i=0; i < ta.length; i++) {
          if (ta[i] != '') {
            LOOTERDrone.FIgnore[LOOTERDrone.FIgnore.length] = ta[i];
            if (igcookie != '') igcookie += '%*%';
            igcookie += ta[i];
          }
        }
        if (igcookie != '')
          curcookie += 'ignore|' + igcookie + '|';


        curcookie=curcookie.substr(0,curcookie.length-1);
        LOOTERCookie.createCookie('LOOTERdrone',curcookie,365);
        // Got the settings, set up the output
        var txt = '';
        txt += '<table id="tblDroneResults" name="tblDroneResults">';
        txt += '<tr><th colspan="3">Smart Drone Runner</th></tr>';
        txt += '<tr><td colspan="3">Options:  ';
        if (LOOTERDrone.burnStamina) txt += 'Burn Stamina, ';
        if (LOOTERDrone.stopForBoss) txt += 'Stop For Boss Job, ';
        if (LOOTERDrone.stopForLevel) txt += 'Stop Before Level Up, ';
        if (LOOTERDrone.runHELJobs && !LOOTERDrone.ChipsDecksOnly.checked && !LOOTERDrone.BeefPokerOnly.checked) txt += 'Run HEL Jobs, ';
        if (LOOTERDrone.runLootJobs && !LOOTERDrone.ChipsDecksOnly.checked && !LOOTERDrone.BeefPokerOnly.checked) txt += 'Run Loot Jobs, ';
        if (LOOTERDrone.ChipsDecksOnly) txt += 'Run Tokens/Decks Jobs Only, ';
        if (LOOTERDrone.BeefPokerOnly) txt += 'Run Best/Poker Jobs Only, ';
        if (LOOTERDrone.spendSkillPoints) txt += 'Spend Skill Points, ';
        if (LOOTERDrone.depositMoney) txt += 'Deposit Money, ';
        //if (LOOTERDrone.BigJump) txt += 'Max Jump To Next Level, ';
        if (LOOTERDrone.AdjustTime) txt += 'Adjust Delay For Bonuses, ';
        if (LOOTERDrone.BurstMode) txt += 'Burst Mode, ';
        if (LOOTERDrone.useenergyFirst) txt += 'Use Energy First, ';
        if (LOOTERDrone.stamRob && LOOTERDrone.burnStamina) txt += 'Use Robbing To Burn Stamina, ';
        if (LOOTERDrone.stamFightRob && LOOTERDrone.burnStamina) txt += 'Fight Then Rob, Switch at ' + LOOTERDrone.FRSwitch + ' stamina remaining, ';
        if (LOOTERDrone.stamRobFight && LOOTERDrone.burnStamina) txt += 'Rob Then Fight, Switch at ' + LOOTERDrone.FRSwitch + ' stamina remaining, ';
        if (LOOTERDrone.burnStamina && LOOTERDrone.FDelay > 0) txt += 'Wait ' + LOOTERDrone.FDelay + ' seconds between fights, ';          
        if (LOOTERDrone.StopRatio) txt += 'Stop At Ratio Of ' + LOOTERDrone.StopRatioVal + ', ';
        if (LOOTERDrone.StopEng) txt += 'Stop When Energy At ' + LOOTERDrone.StopEngVal + ', ';
        if (LOOTERDrone.noReqMoney) txt += 'Don\'t run jobs that cost money, ';
        if (LOOTERDrone.noReqItem) txt += 'Don\'t run jobs that require consumables, ';
        if (LOOTERDrone.FIgnore.length > 0) {
          txt += ', Ignore names with: '
          for (var i = 0; i < LOOTERDrone.FIgnore.length; i++)
            txt += LOOTERDrone.FIgnore[i] + ', ';
          txt = txt.substr(0,txt.length-2);
        }
        
        //if (LOOTERDrone.bestVegas) txt += 'Run best Vegas job, ';
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
        LOOTERDisplay.setHTML('divLOOTERResults',txt);
        LOOTERDrone.run(1,0);
        break;
    
      case 1:
        // Display is all set, fill in the blanks and call functions we need
        // Find the best job
        var best = parseFloat(LOOTERItems.jobs[0][7])/parseFloat(LOOTERItems.jobs[0][6]);
        
        var big = LOOTERItems.jobs[0][6];
        for (var i=1; i < LOOTERItems.jobs.length; i++) {
          if (parseInt(LOOTERItems.jobs[i][6]) > 0 && parseInt(LOOTERItems.jobs[i][6]) > parseInt(LOOTERItems.jobs[big][6])) {
            if ((!LOOTERDrone.noReqMoney) || (LOOTERDrone.noReqMoney && LOOTERItems.jobs[i][8] != 1))
              if ((!LOOTERDrone.noReqLoot) || (LOOTERDrone.noReqLoot && LOOTERItems.jobs[i][9] != 1))
                big = i;
          }
          if (parseInt(LOOTERItems.jobs[i][6]) > 0 && parseFloat(LOOTERItems.jobs[i][7])/parseFloat(LOOTERItems.jobs[i][6]) > parseFloat(LOOTERItems.jobs[best][7])/parseFloat(LOOTERItems.jobs[best][6])) {
            // Skip Poker game
            if (LOOTERItems.jobs[i][0] != 0 || LOOTERItems.jobs[i][1] != 4 || LOOTERItems.jobs[i][2] != 26)
              best = i;
          }
        }
        LOOTERDrone.jobBest[0] = LOOTERItems.jobs[best][0];
        LOOTERDrone.jobBest[1] = LOOTERItems.jobs[best][1];
        LOOTERDrone.jobBest[2] = LOOTERItems.jobs[best][2];
        
        if (LOOTERItems.jobs[big][6] > 0) { 
          LOOTERDrone.bigjumpid = big;
          LOOTERDrone.bigjumpeng = LOOTERItems.jobs[big][6];
          LOOTERDrone.bigjumpexp = LOOTERItems.jobs[big][7];
          LOOTERDisplay.setHTML('divDroneBigJump','<font color="' + LOOTERConfig.clrGood + '">' + LOOTERDrone.bigjumpeng + '</font>');
        } else {
          LOOTERDisplay.setHTML('divDroneBigJump','<font color="' + LOOTERConfig.clrWarning + '">Update Job Payouts</font>');
        }
        LOOTERDisplay.clearSetup();
        // Check for boss job and tokens/decks
        if (LOOTERConfig.currentCity != LOOTERItems.getCityNum('New York')) {
          LOOTERTravel.goCity(LOOTERItems.getCityNum('New York'),'LOOTERDrone.run(2,0)');
        } else {
            LOOTERDrone.run(2,0);
        }
        break;
    
      case 2:
        // Get the boss job value - Select the boss job tab
        var url = LOOTERConfig.MWURLAJAX;
        url += '&xw_controller=' + LOOTERItems.cities[LOOTERConfig.currentCity][2];
        url += '&xw_action=view&xw_city=' + LOOTERConfig.currentCity;
        url += '&tab=4&bar=0';
        LOOTERAjax.buildAjax(url,'LOOTERDrone.run','3,%ix%');
        break;
        
      case 3:
        var r = LOOTERAjax.ajax[index].response;
        LOOTERDrone.bossjobeng = LOOTERParser.getSpecificTagValue(r,'bosseng');
        LOOTERDrone.bossjobexp = LOOTERParser.getSpecificTagValue(r,'bossexp');
        LOOTERDisplay.setHTML('divDroneBossJob',LOOTERDrone.stopForBoss?LOOTERDisplay.setGoodColor(LOOTERDrone.bossjobeng):'--');
        // Pull the tokens and decks at the same time
        LOOTERDrone.tokencount = LOOTERParser.getSpecificTagValue(r,'token');
        LOOTERDrone.deckcount = LOOTERParser.getSpecificTagValue(r,'deck');
        LOOTERDisplay.setHTML('divDroneTokens',LOOTERDisplay.setGoodColor(LOOTERDrone.tokencount));
        LOOTERDisplay.setHTML('divDroneDecks',LOOTERDisplay.setGoodColor(LOOTERDrone.deckcount));
        LOOTERDisplay.setHTML('divDroneControl','<a onclick="javascript:LOOTERDrone.pause();">Pause</a>');
        LOOTERDrone.updateDroneResults();
        
        // Load the fight page to get A/D values
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlFightList;
        LOOTERAjax.buildAjax(url,'LOOTERDrone.run','31,%ix%');
        break;
        
      case 31:
        var r = LOOTERAjax.ajax[index].response;
        r = r.replace(/[\r\n|\n|\t|]/g,'');
        LOOTERDrone.attackStrength = LOOTERParser.getADStats(r,'A');
        LOOTERDrone.defenseStrength = LOOTERParser.getADStats(r,'D');
        LOOTERDrone.attackStrengthCurrent = LOOTERParser.getADStats(r,'A');
        LOOTERDrone.defenseStrengthCurrent = LOOTERParser.getADStats(r,'D');
        LOOTERDisplay.setHTML('divDroneAttack',LOOTERDisplay.setGoodColor(LOOTERDrone.attackStrength));
        LOOTERDisplay.setHTML('divDroneDefense',LOOTERDisplay.setGoodColor(LOOTERDrone.defenseStrength));
        LOOTERDrone.run(4,0);
        break;
        
      case 4:
        // Main Loop
        if (LOOTERConfig.Session==1 && LOOTERDrone.isRunning && !LOOTERDrone.isPaused) {
          // Calculate the target ratio
          var tExpNeed = parseInt(LOOTERConfig.curExpNeeded-LOOTERConfig.curExp);
          var tEng = LOOTERConfig.curEnergy;
          var canDoBoss = true;
          var canDoJump = true;
          
          // See what our options are at this point
          if (tEng < LOOTERDrone.bossjobeng) canDoBoss = false;
          if (tEng < LOOTERDrone.bigjumpeng) canDoJump = false;

          // Compute our target ratio based on the settings
          if (LOOTERDrone.stopForBoss && canDoBoss) {
            LOOTERConfig.curRatio = parseInt((tExpNeed/(tEng-LOOTERDrone.bossjobeng))*100)/100;
          //} else if ((LOOTERDrone.BigJump && canDoJump) && (tEng-LOOTERDrone.bigjumpeng >= 0)) {
          //  LOOTERConfig.curRatio = parseInt((tExpNeed/(tEng-LOOTERDrone.bigjumpeng))*100)/100;
          } else { // Regular job
            LOOTERConfig.curRatio = parseInt((tExpNeed/tEng)*100)/100;
          }
          
          // Check for Stop For Ratio
          if (LOOTERDrone.StopRatio) {
            if (parseFloat(LOOTERConfig.curRatio) <= parseFloat(LOOTERDrone.StopRatioVal)) {
              LOOTERDisplay.setHTML('divDroneStatus','Stopping at user selected ratio');
              LOOTERDrone.isRunning = false;
              LOOTERDrone.isPaused = false;
              break;
            }
          }
          
          // Check for Stop For Energy
          if (LOOTERDrone.StopEng) {
            if (parseInt(LOOTERConfig.curEnergy) <= parseInt(LOOTERDrone.StopEngVal)) {
              LOOTERDisplay.setHTML('divDroneStatus','Stopping at user seelcted energy level');
              LOOTERDrone.isRunning = false;
              LOOTERDrone.isPaused = false;
              break;
            }
          }
          // Set the most exp and energy we can get/spend
          var maxexp = tExpNeed-1;
          var maxeng = tEng;

          if (LOOTERDrone.burnStamina==true) tExpNeed-=(3*LOOTERConfig.curStamina);

          // See if skill points need to be used
          if (LOOTERDrone.spendSkillPoints==true && LOOTERConfig.curSkillPoints > 0) {
            LOOTERDrone.useSkillPoints(0,0);
          }
          
          // See if stamina needs to be used
          if (LOOTERDrone.burnStamina==true && LOOTERDrone.isburningstamina==false) {
            // Trap for not enough to rob
            if ( ((LOOTERDrone.stamFight==true) && (parseInt(LOOTERConfig.curStamina) >= 5)) || parseInt(LOOTERConfig.curStamina) >= 20) {
              LOOTERDrone.spendStamina(0,0);
              // Give the flag time to set
              setTimeout("LOOTERDrone.run(4,0);",250);
              break;
            }
          }

          // See if we're supposed to be burning energy before running fight
          if (LOOTERDrone.useenergyFirst==true && LOOTERDrone.isburningenergy==true) {
            // Check again in 3 seconds
            setTimeout("LOOTERDrone.run(4,0);",3000);
            break;
          }
          
          // Adjust the max energy we can spend
          if (LOOTERDrone.stopForBoss && canDoBoss) {
            maxeng -= LOOTERDrone.bossjobeng;
          //} else if (LOOTERDrone.BigJump && canDoJump) {
          //  maxeng -= LOOTERDrone.bigjumpeng;
          }

          // Compute in Mastermind and Wheelman bonuses
          var mmbonus = parseInt(((maxexp/74)*.03)*37);
          var wmbonus = parseInt(((maxeng/35)*.03)*74);
          
          LOOTERDrone.curRatio = maxexp/maxeng;
          LOOTERDrone.updateDroneResults();
          
          // At this point, max energy will have how much energy we can spend without
          // missing boss or big jump

          // Check for stop for boss
          if (LOOTERDrone.stopForBoss && canDoBoss) {
            if (parseInt(maxeng) <= 15 || parseInt(maxexp) <= 15) {
              LOOTERDrone.isRunning = false;
              LOOTERDisplay.setHTML('divDroneStatus','Stopping to run boss job.  Reset to FB to avoid running away.');
              return;
            }
          }
          
          // Check for stop for level
          if (LOOTERDrone.stopForLevel) {
            if (parseInt(tExpNeed) <= 10) {
              LOOTERDrone.isRunning = false;
              LOOTERDisplay.setHTML('divDroneStatus','Stopping for level up.');
              return;
            }
          }
          
          // See if we can level up
          var lujob = LOOTERDrone.findJumpJob(LOOTERConfig.curEnergy,maxexp);
          if (lujob > 0) {
            // Stop if stop for level is checked
            if (LOOTERDrone.stopForLevel) {
              LOOTERDrone.isRunning = false;
              LOOTERDisplay.setHTML('divDroneStatus','Stopping for level up.');
              return;
            }
              
            // Job that can level us up, if there's less than 5 energy or 5 exp needed, run it
            if (((parseInt(LOOTERConfig.curEnergy) - parseInt(LOOTERItems.jobs[lujob][6])) < 5) || (parseInt(tExpNeed) < 5)) {
              LOOTERDrone.runOneJob(0,0,new Array(LOOTERItems.jobs[lujob][0],LOOTERItems.jobs[lujob][1],LOOTERItems.jobs[lujob][2]));
              return; 
            }
          }
          
          // Not leveling up, find the right job to run
          var wrat = parseFloat(maxexp)/parseFloat(maxeng);

          if (LOOTERDrone.ChipsDecksOnly) {
            var runit = true;
            // If Stop for boss or level, make sure we're not going to accidentally level up
            if ((LOOTERDrone.stopForBoss && canDoBoss) || LOOTERDrone.stopForLevel) {
              if (parseInt(tExpNeed) <= parseInt(LOOTERDrone.getJobExp(LOOTERDrone.jobToken)) * 1.5 || parseInt(LOOTERConfig.curEnergy) <= parseInt(LOOTERDrone.getJobEng(LOOTERDrone.jobToken))) {
                runit = false;              
              }
            }
            if (runit == true) {
              if (parseInt(LOOTERDrone.tokencount) > parseInt(LOOTERDrone.deckcount)) {
                LOOTERDrone.runOneJob(0,0,LOOTERDrone.jobDeck);
                if (parseInt(LOOTERConfig.curEnergy) > 400 && parseInt(LOOTERConfig.curExpNeeded) > 500 && LOOTERDrone.BurstMode)
                  LOOTERDrone.runBurst(0,0,LOOTERDrone.jobDeck);
                return;
              } else {
                LOOTERDrone.runOneJob(0,0,LOOTERDrone.jobToken);
                if (parseInt(LOOTERConfig.curEnergy) > 400 && parseInt(LOOTERConfig.curExpNeeded) > 500 && LOOTERDrone.BurstMode)
                  LOOTERDrone.runBurst(0,0,LOOTERDrone.jobToken);
                return;
              }
            } 
          }

          if (LOOTERDrone.BeefPokerOnly) {
            var runit = true;
            // If Stop for boss or level, make sure we're not going to accidentally level up
            if ((LOOTERDrone.stopForBoss && canDoBoss) || LOOTERDrone.stopForLevel) {
              if (parseInt(tExpNeed) <= parseInt(LOOTERDrone.getJobExp(LOOTERDrone.jobToken)) * 1.5 || parseInt(LOOTERConfig.curEnergy) <= parseInt(LOOTERDrone.getJobEng(LOOTERDrone.jobToken))) {
                runit = false;              
              }
            }
            if (runit == true) {
              if (parseFloat(LOOTERConfig.curRatio) >= parseFloat(LOOTERDrone.getJobRatio(LOOTERDrone.jobPoker)) && (parseInt(LOOTERDrone.tokencount) >= 20 && parseInt(LOOTERDrone.deckcount) >= 20)) {
                LOOTERDrone.runOneJob(0,0,LOOTERDrone.jobPoker);
                if (parseInt(LOOTERConfig.curEnergy) > 500 && parseInt(LOOTERConfig.curExpNeeded) > 1000 && LOOTERDrone.BurstMode)
                  LOOTERDrone.runBurst(0,0,LOOTERDrone.jobPoker);
                return;
              } else {
                LOOTERDrone.runOneJob(0,0,LOOTERDrone.jobBest);
                if (parseInt(LOOTERConfig.curEnergy) > 500 && parseInt(LOOTERConfig.curExpNeeded) > 1000 && LOOTERDrone.BurstMode)
                  LOOTERDrone.runBurst(0,0,LOOTERDrone.jobBest);
                return;
              }
            }
          }

          if (LOOTERDrone.runHELJobs) {
            for (var i=0; i < LOOTERDrone.HELJobs.length; i++) {
              if (parseFloat(LOOTERDrone.getJobRatio(LOOTERItems.jobs[LOOTERDrone.HELJobs[i]])) > parseFloat(LOOTERConfig.curRatio) && maxexp >= LOOTERDrone.getJobExp(LOOTERItems.jobs[LOOTERDrone.HELJobs[i]])) {
                LOOTERDrone.runOneJob(0,0,LOOTERItems.jobs[LOOTERDrone.HELJobs[i]]);
                if (parseInt(LOOTERConfig.curEnergy) > 2000 && parseInt(LOOTERConfig.curExpNeeded) > 2500 && LOOTERDrone.BurstMode)
                  LOOTERDrone.runBurst(0,0,LOOTERItems.jobs[LOOTERDrone.HELJobs[i]]);
                return;
              }
            }
          }
          
          if (LOOTERDrone.runLootJobs) {
            for (var i=0; i < LOOTERDrone.LootJobs.length; i++) {
              if (parseFloat(LOOTERDrone.getJobRatio(LOOTERItems.jobs[LOOTERDrone.LootJobs[i]])) >= parseFloat(LOOTERConfig.curRatio) && maxexp >= LOOTERDrone.getJobExp(LOOTERItems.jobs[LOOTERDrone.LootJobs[i]])) {
                LOOTERDrone.runOneJob(0,0,LOOTERItems.jobs[LOOTERDrone.LootJobs[i]]);
                if (parseInt(LOOTERConfig.curEnergy) > 1500 && parseInt(LOOTERConfig.curExpNeeded) > 2000 && LOOTERDrone.BurstMode)
                  LOOTERDrone.runBurst(0,0,LOOTERItems.jobs[LOOTERDrone.LootJobs[i]]);
                return;
              }
            }
          }
          
          // Check for best Vegas job
          var bvj = -1;
          if (LOOTERDrone.bestVegas == true) {
            for (var i=0; i < LOOTERItems.jobs.length; i++ ) {
              if (parseInt(LOOTERItems.jobs[i][0])==4) {
                if (parseInt(LOOTERItems.jobs[i][8])==0 || LOOTERDrone.noReqMoney==false) {
                  if (parseInt(LOOTERItems.jobs[i][9])==0 || LOOTERDrone.noReqItem==false) {
                    if (parseFloat(LOOTERDrone.getJobRatio(LOOTERItems.jobs[i])) >= parseFloat(LOOTERConfig.curRatio) && maxexp >= LOOTERDrone.getJobExp(LOOTERItems.jobs[i])) {
                      if (bvj == -1) 
                        bvj = i;
                      else
                        if (parseFloat(LOOTERItems.jobs[i][7])/parseFloat(LOOTERItems.jobs[i][6]) > parseFloat(LOOTERItems.jobs[bvj][7])/parseFloat(LOOTERItems.jobs[bvj][6])) {
                          bvj = i;
                      }
                    }
                  }
                }
              }
            }
          }
          if (bvj != -1) {
            LOOTERDrone.runOneJob(0,0,new Array(LOOTERItems.jobs[bvj][0],LOOTERItems.jobs[bvj][1],LOOTERItems.jobs[bvj][2]));
            return;
          }
            
          // No special circumstances, find the best job
          var regjob = LOOTERDrone.findJob(maxeng,maxexp);
          //if (lujob > 0)
          //  regjob = LOOTERDrone.findJob(maxeng-LOOTERItems.jobs[lujob][6],maxexp);
          if (regjob >= 0) {
            LOOTERDrone.runOneJob(0,0,new Array(LOOTERItems.jobs[regjob][0],LOOTERItems.jobs[regjob][1],LOOTERItems.jobs[regjob][2]));
            if (parseInt(LOOTERConfig.curEnergy) > 1500 && parseInt(LOOTERConfig.curExpNeeded) > 2000 && LOOTERDrone.BurstMode)
              LOOTERDrone.runBurst(0,0,new Array(LOOTERItems.jobs[regjob][0],LOOTERItems.jobs[regjob][1],LOOTERItems.jobs[regjob][2]));
            return;
          }
          
          // No regular job, no jump job, need more energy
          LOOTERDisplay.setHTML('divDroneStatus','No jobs available to run, waiting for energy or stamina');
          LOOTERDrone.jobwaittimer = setTimeout("LOOTERDrone.run(4,0);",30000);
          return;
        } else {
          if (LOOTERConfig.Session == 0)
            LOOTERDisplay.addLine('Stopping Drone Runner - Session Timeout',LOOTERConfig.clrFatal);
          else 
          {
            LOOTERDisplay.addLine('Stopping based on user selections',LOOTERConfig.clrAction);
          }
        }
        break;
    }
  
  };
  
  this.runBurst = function(step,index,job) {
    switch(step) {
      case 0:
        var url  = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRunJob;
        url += '&xw_controller=' + LOOTERDrone.specialcontroller;
        if (LOOTERDrone.specialcontroller != LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2])
          url += '&no_load=1';
        url += '&xw_city=' + LOOTERConfig.currentCity;
        url += '&' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][5] + '=' + LOOTERDrone.currentJob[1];
        url += '&job=' + LOOTERDrone.currentJob[2];
        url += '&tmp=' + LOOTERDrone.jobtmpkey;
        if (parseFloat(LOOTERDrone.expRatio) <= parseFloat(LOOTERDrone.getJobRatio(LOOTERDrone.jobPoker)) && (parseInt(LOOTERDrone.jobsrun) >= 100) || LOOTERDrone.ChipsDecksOnly || LOOTERDrone.BeefPokerOnly) {
          for (var i = 0; i < (5-LOOTERDrone.burstCount); i++) {
            LOOTERDrone.burstCount++;
            setTimeout("LOOTERAjax.buildAjax('" + url + "','LOOTERDrone.runBurst','1,%ix%,0');",i*250);
          }
          break;
        }
        break;
      case 1:
        LOOTERDrone.burstCount--;
        if (LOOTERAjax.ajax[index]) {
          var r = LOOTERAjax.ajax[index].response;
          LOOTERParser.parseJobResults(r);
          if (res['jobResults'] == 'Completed') {
            // Job ran successfully
            LOOTERDrone.jobsrun++;
            if (res['jobExtraExp']) {LOOTERDrone.extraexp++;LOOTERDrone.totalextraexp+=res['jobExtraExp'];}
            if (res['jobEnergySpent']=='0') LOOTERDrone.freejobs++;
            if (!isNaN(parseInt(res['jobMoney']))) LOOTERDrone.totalmoney[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)] += parseInt(res['jobMoney']);
            if (!isNaN(parseInt(res['jobExtraMoney']))) {LOOTERDrone.extramoney++;LOOTERDrone.totalmoney[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)]+=parseInt(res['jobExtraMoney']);}
            // Check the loot
            if (res['jobLoot']) {
              var lindex = -1;
              for (var i = 0; i < LOOTERDrone.lootitems.length; i++) {
                if (LOOTERDrone.lootitems[i][1]==res['jobLoot']) 
                  lindex = i;
              }
              if (lindex == -1) {
                LOOTERDrone.lootitems[LOOTERDrone.lootitems.length] = new Array(1,res['jobLoot']);
              } else {
                LOOTERDrone.lootitems[lindex][0] = parseInt(LOOTERDrone.lootitems[lindex][0]) + 1;
              }
            }
            LOOTERDrone.tokencount = LOOTERParser.getSpecificTagValue(r,'token')?LOOTERParser.getSpecificTagValue(r,'token'):LOOTERDrone.tokencount;
            LOOTERDrone.deckcount = LOOTERParser.getSpecificTagValue(r,'deck')?LOOTERParser.getSpecificTagValue(r,'deck'):LOOTERDrone.deckcount;
            // Mark the last100 array with the results
            var tval=0;
            if (res['jobEnergySpent']=='0') tval+=1;
            if (res['jobExtraExp']) tval+=2;
            LOOTERDrone.last100[LOOTERDrone.locntr++] = tval;
            if (LOOTERDrone.locntr == 100) LOOTERDrone.locntr = 0;
            LOOTERDrone.updateDroneResults();
          }
        } 
        break;
    }       
  };

  this.runOneJob = function(step,index,job) {
    switch(step) {
      case 0:
        LOOTERDrone.currentJob = job;
        LOOTERDisplay.setHTML('divDroneStatus','Running ' + LOOTERDrone.getJobName(job));
        //if (!confirm('Run job?')) return;
        if (LOOTERConfig.currentCity != LOOTERItems.getCityNumByIndex(job[0]))
          LOOTERTravel.goCity(LOOTERItems.getCityNumByIndex(job[0]),'LOOTERDrone.runOneJob(1,0,0)');
        else
          LOOTERDrone.runOneJob(1,0,0);
        break;
        
      case 1:
        // In the right city, select the job tab
        if (LOOTERConfig.currentCity == 5 || LOOTERConfig.currentCity == 6) LOOTERDrone.curJobTab = -1;
        if (LOOTERDrone.curJobTab != LOOTERDrone.currentJob[1]) {
          var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlSwitchJobTab;
          url += '&xw_city=' + LOOTERConfig.currentCity;
          url += '&xw_controller=' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2];
          url += '&' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][5] + '=' + LOOTERDrone.currentJob[1];
          url += '&tmp=' + LOOTERConfig.tmpkey;
          LOOTERAjax.buildAjax(url,'LOOTERDrone.runOneJob','2,%ix%,0');
          LOOTERDrone.curJobTab = LOOTERDrone.currentJob[1];
        } else {
          LOOTERDrone.runOneJob(2,-1,0);
        }
        break;
    
      case 2:
        // On the right tab, run the job
        if (index != -1) {
          LOOTERDrone.jobtmpkey = LOOTERParser.setTempKey(LOOTERAjax.ajax[index].response,'job');
        }
        var url  = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRunJob;
        //url += '&xw_controller=' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2];
        url += '&xw_controller=' + LOOTERDrone.specialcontroller;
        if (LOOTERDrone.specialcontroller != LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2])
          url += '&no_load=1';
        url += '&xw_city=' + LOOTERConfig.currentCity;
        url += '&' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][5] + '=' + LOOTERDrone.currentJob[1];
        url += '&job=' + LOOTERDrone.currentJob[2];
        url += '&tmp=' + LOOTERDrone.jobtmpkey;
        LOOTERAjax.buildAjax(url,'LOOTERDrone.runOneJob','3,%ix%,0');
        break;
        
      case 3:
        // Job ran, parse the results
        if (LOOTERAjax.ajax[index]) {
          var r = LOOTERAjax.ajax[index].response;
          //e$('divLOOTERDebug').innerHTML = '<textarea>' + r + '</textarea>' + r;
          //return;
          LOOTERParser.parseJobResults(r);
          LOOTERTimers.updateStats(1,index);
          if (res['jobResults'] == 'Completed') {
            // Clear the bad run counter
            LOOTERDrone.BadJobRunCount = 0;
            // Update the job tempkey
            LOOTERDrone.jobtmpkey = LOOTERParser.setTempKey(r,'job')?LOOTERParser.setTempKey(r,'job'):LOOTERDrone.jobtmpkey;
            // Job ran successfully
            LOOTERDrone.jobsrun++;
            if (res['jobExtraExp']) {LOOTERDrone.extraexp++;LOOTERDrone.totalextraexp+=res['jobExtraExp'];}
            if (res['jobEnergySpent']=='0') LOOTERDrone.freejobs++;
            //if (res['jobBadMoney']) LOOTERDrone.totalmoney[LOOTERConfig.currentCity]-=res['jobBadMoney'];
            if (!isNaN(parseInt(res['jobMoney']))) LOOTERDrone.totalmoney[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)] += parseInt(res['jobMoney']);
            if (!isNaN(parseInt(res['jobExtraMoney']))) {LOOTERDrone.extramoney++;LOOTERDrone.totalmoney[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)]+=parseInt(res['jobExtraMoney']);}

            // Check the loot
            if (res['jobLoot']) {
              var lindex = -1;
              for (var i = 0; i < LOOTERDrone.lootitems.length; i++) {
                if (LOOTERDrone.lootitems[i][1]==res['jobLoot']) 
                  lindex = i;
              }
              if (lindex == -1) {
                LOOTERDrone.lootitems[LOOTERDrone.lootitems.length] = new Array(1,res['jobLoot']);
              } else {
                LOOTERDrone.lootitems[lindex][0] = '*' + (parseInt(LOOTERDrone.lootitems[lindex][0]) + 1);
              }
            }
            LOOTERDrone.tokencount = LOOTERParser.getSpecificTagValue(r,'token')?LOOTERParser.getSpecificTagValue(r,'token'):LOOTERDrone.tokencount;
            LOOTERDrone.deckcount = LOOTERParser.getSpecificTagValue(r,'deck')?LOOTERParser.getSpecificTagValue(r,'deck'):LOOTERDrone.deckcount;

            // Mark the last100 array with the results
            var tval=0;
            if (res['jobEnergySpent']=='0') tval+=1;
            if (res['jobExtraExp']) tval+=2;
            LOOTERDrone.last100[LOOTERDrone.locntr++] = tval;
            if (LOOTERDrone.locntr == 100) LOOTERDrone.locntr = 0;

          } else {
            // Unsuccesful job run
            if (res['timeout']) {
              LOOTERDrone.isRunning = false;
              LOOTERDisplay.setHTML('divDroneStatus','<font style="color:' + LOOTERConfig.clrFatal + '">Session has timed out...stopping</font>');
              LOOTERDisplay.addLine('Session has timed out...stopping drone runner',LOOTERConfig.clrFatal);
              return;
            } 
            if (r.indexOf('session has timed out') > 0) {
              // Wrong temp key, need a new one
              LOOTERDisplay.setHTML('divDroneStatus','<font style="color:' + LOOTERConfig.clrWarning + '">Temp key has expired, attempting to refresh key</font>');
              LOOTERConfig.currentCity = -1;
              LOOTERDrone.run(4,0);
              return; 
            }
            if (r.indexOf('need more energy') > 0 && LOOTERConfig.curEnergy < 100) {
              // Out of energy, wait a while and try again
              LOOTERDisplay.setHTML('divDroneStatus','Not enough energy...waiting');
              //LOOTERDrone.jobwaittimer = setTimeout("LOOTERDrone.run(4,0);",120000);
              return;
            }
            if (res['jobResults']=='Failed') {
              LOOTERDrone.BadJobRunCount++;
              if (LOOTERDrone.BadJobRunCount == 3) {
                // Three tries at running the job, mark it unrunnable
                LOOTERDisplay.addLine('Job failed to run 3 times, marking as unrunnable',LOOTERConfig.clrAction);
                for (var i=0; i < LOOTERItems.jobs.length; i++) {
                  if (LOOTERItems.jobs[i][0] == LOOTERDrone.currentJob[0] && LOOTERItems.jobs[i][1] == LOOTERDrone.currentJob[1] && LOOTERItems.jobs[i][2] == LOOTERDrone.currentJob[2]) {
                    LOOTERItems.jobs[i][6] = 0;
                    LOOTERItems.jbos[i][7] = 0;
                  }
                }
                LOOTERDrone.BadJobRunCount = 0;
                // Start over with next job
                LOOTERDrone.run(4,0);
                return;
              }
              // Job run hung
              LOOTERDisplay.setHTML('divDroneStatus','<font style="color:' + LOOTERConfig.clrWarning + '">Job did not run correctly, attempting to recover</font>');

              // Catch for Zynga's Episode 7 locking problem
              if (parseInt(LOOTERDrone.currentJob[1]) == 8 && parseInt(LOOTERItems.getCityNum(LOOTERDrone.currentJob[0]))==4) {
                // Episode 7 got locked probably
                LOOTERDrone.fix7Lock(0,0);
                break;
              }

              // Reload the city and try again
              var tcity = LOOTERConfig.currentCity;
              LOOTERConfig.currentCity = -1;
              //LOOTERTravel.goCity(tcity,"LOOTERDrone.run(4,0)");
              LOOTERDrone.jobwaittimer = setTimeout("LOOTERDrone.run(4,0);",2000);
              return; 
            }
            // Didn't return Failed, but didn't run
            LOOTERDrone.BadJobRunCount++;
            if (LOOTERDrone.BadJobRunCount == 3) {
              // Three tries at running the job, mark it unrunnable
              LOOTERDisplay.addLine('Job failed to run 3 times, marking as unrunnable',LOOTERConfig.clrAction);
              for (var i=0; i < LOOTERItems.jobs.length; i++) {
                if (LOOTERItems.jobs[i][0] == LOOTERDrone.currentJob[0] && LOOTERItems.jobs[i][1] == LOOTERDrone.currentJob[1] && LOOTERItems.jobs[i][2] == LOOTERDrone.currentJob[2]) {
                  LOOTERItems.jobs[i][6] = 0;
                  LOOTERItems.jobs[i][7] = 0;
                }
              }
              LOOTERDrone.BadJobRunCount = 0;
              // Start over with next job
              LOOTERDrone.run(4,0);
              return;
            }
            LOOTERDisplay.addLine('Job failed to run correctly - Try #' + LOOTERDrone.BadJobRunCount,LOOTERConfig.clrFatal);
            LOOTERDrone.run(4,0);
            break;
          }

        } else {
          // Really bad result
          LOOTERDisplay.addLine('Unexpected result...debug',LOOTERConfig.clrFatal);
          break;
        }
        //LOOTERDrone.updateDroneResults();
 
        // If this is the 10th job, update the AD Stats
        if (LOOTERDrone.jobsrun % 10 == 0) 
          LOOTERDrone.updateADStats(0,0);
          

        // Check to see if the delay needs to be adjusted based on the payouts
        if (parseInt(LOOTERDrone.jobsrun) >= 100) {
          // Conditions met, figure out the delay
          var tbonus = 0;
          for (var i=0; i < 100; i++) {
            if (this.last100[i] == 1 || this.last100[i] == 3) tbonus += 1.0;
            if (this.last100[i] == 2 || this.last100[i] == 3) tbonus += 0.5;
          }
          var cp=0;
          var cr = (LOOTERConfig.curExpNeeded-LOOTERConfig.curExp)/LOOTERConfig.curEnergy;
          if (tbonus > 0) cp = tbonus/100.0;
          var joben = LOOTERDrone.getJobEng(LOOTERDrone.jobBest);
          var jobex = LOOTERDrone.getJobExp(LOOTERDrone.jobBest);
          var crun = parseInt(LOOTERConfig.curEnergy/joben); // Number of jobs we can run
          var eexp = parseInt(crun * (jobex * cp)); // Expected amount of extra energy based on current bonus percentage
          var ttr = crun * ((LOOTERDrone.cDelay/1000) + .25); // Time it will take to burn energy (1/4 sec per job + delay)
          var eeng = 2 * (ttr/150); // Extra energy gained during run
          var expneeded = LOOTERConfig.curExpNeeded-LOOTERConfig.curExp; // Experience needed to level
          var totalexp = eexp + (parseInt(.9 * crun) * jobex); // Total exp gained by burning our energy (90% to give more accurate ratios)
          var expleft = expneeded-totalexp;
          var engleft = LOOTERConfig.curEnergy-(parseInt(.9 * crun) *joben); // (90% for more accurate ratio)
          var er = expleft/engleft;
          //LOOTERDisplay.addLine(totalexp + ' ::: ' + expleft + ' ::: ' + engleft + ' ::: ' + er,'#fff');
          
          //var er = ((LOOTERConfig.curExpNeeded-LOOTERConfig.curExp)-(((LOOTERConfig.curEnergy/35)*cp)*LOOTERDrone.getJobExp(LOOTERDrone.jobBest)))/(LOOTERConfig.curEnergy + (2 * (ttr/150)));
          LOOTERDrone.expRatio = er;
          LOOTERDrone.cDelay = (er-cr)*50000;
          LOOTERDrone.cBonus = parseInt(cp*10000)/100;
          
          if (LOOTERDrone.cDelay < 0) LOOTERDrone.cDelay = 0;
          // Adjust for ratio below Beef
          if (parseFloat(LOOTERConfig.curRatio) <= LOOTERDrone.getJobRatio(LOOTERDrone.jobBest))
            LOOTERDrone.cDelay = 0;
          else {
            if (LOOTERDrone.cDelay > 5000) LOOTERDrone.cDelay = 5000; // Max 5 second wait
            if (LOOTERDrone.cDelay > 500 && LOOTERDrone.AdjustTime)
              LOOTERDisplay.setHTML('divDroneStatus','Waiting ' + parseInt(LOOTERDrone.cDelay)/1000 + ' seconds based on bonus ratio');
          }
          if (LOOTERDrone.AdjustTime) {
            setTimeout("LOOTERDrone.run(4,0);",LOOTERDrone.cDelay);
            break;
          }
        }
        // If we're forcing a delay, wait the right number of seconds
        if (LOOTERDrone.ForceDelay==true) {
          LOOTERDisplay.setHTML('divDroneStatus','Waiting ' + LOOTERDrone.ForceDelayVal + ' seconds to run next job');
          setTimeout("LOOTERDrone.run(4,0);",parseFloat(LOOTERDrone.ForceDelayVal)*1000);
          break;
        }
        
        // This job has been processed, start the next one
        if (parseInt(LOOTERConfig.curExpNeeded)-parseInt(LOOTERConfig.curExp) < 350)
          setTimeout("LOOTERDrone.run(4,0);",25);
        else
          setTimeout("LOOTERDrone.run(4,0);",25);
        break;
    }
  
  };

  this.updateADStats = function(step,index) {
    switch (step) {
      case 0:
        // Load the fight page
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlFightList;
        LOOTERAjax.buildAjax(url,'LOOTERDrone.updateADStats','1,%ix%');
        break;
        
      case 1:
        var r = LOOTERAjax.ajax[index].response;
        r = r.replace(/[\r\n|\n|\t|]/g,'');
        LOOTERDrone.attackStrengthCurrent = LOOTERParser.getADStats(r,'A');
        LOOTERDrone.defenseStrengthCurrent = LOOTERParser.getADStats(r,'D');
        break;
    }
  };
  
  
  this.fix7Lock = function(step,index) {
    switch (step) {
      case 0:
        LOOTERDisplay.setHTML('divDroneStatus','Level 7 may have locked...attempting to unlock');
        LOOTERTravel.goCity(1,'LOOTERDrone.fix7Lock(1,0)');
        break;

      case 1:
        LOOTERTravel.goCity(4,'LOOTERDrone.fix7Lock(2,0)');
        break;
                      
      case 2:
        // Select tab 4
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlSwitchJobTab;
        url += '&xw_city=' + LOOTERConfig.currentCity;
        url += '&xw_controller=' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2];
        url += '&' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][5] + '=4';
        url += '&tmp=' + LOOTERConfig.tmpkey;
        LOOTERAjax.buildAjax(url,'LOOTERDrone.fix7Lock','3,%ix%');
        LOOTERDrone.curJobTab = LOOTERDrone.currentJob[1];
        break;

      case 3:
        // Select tab 6
        LOOTERDisplay.showPage(index,'inner_page');
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlSwitchJobTab;
        url += '&xw_city=' + LOOTERConfig.currentCity;
        url += '&xw_controller=' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2];
        url += '&' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][5] + '=6';
        url += '&tmp=' + LOOTERConfig.tmpkey;
        LOOTERAjax.buildAjax(url,'LOOTERDrone.fix7Lock','4,%ix%');
        LOOTERDrone.curJobTab = LOOTERDrone.currentJob[1];
        break;

      case 4:
        // Select tab 6
        LOOTERDisplay.showPage(index,'inner_page');
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlSwitchJobTab;
        url += '&xw_city=' + LOOTERConfig.currentCity;
        url += '&xw_controller=' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][2];
        url += '&' + LOOTERItems.cities[LOOTERItems.getCityIndex(LOOTERConfig.currentCity)][5] + '=7';
        url += '&tmp=' + LOOTERConfig.tmpkey;
        LOOTERAjax.buildAjax(url,'LOOTERDrone.fix7Lock','5,%ix%');
        LOOTERDrone.curJobTab = LOOTERDrone.currentJob[1];
        break;

      case 5:
        // Go back and try to run the real job again
        LOOTERDisplay.showPage(index,'inner_page');
        LOOTERDrone.run(4,0);
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
    LOOTERDrone.isPaused = true;
    LOOTERDrone.isburningstamina = false;
    if (LOOTERDrone.jobwaittimer) clearTimeout(LOOTERDrone.jobwaittimer);
    LOOTERDisplay.setHTML('divDroneControl','<a onclick="LOOTERDrone.resume();">Resume</a>');
  };

  this.resume = function() {
    LOOTERDisplay.setHTML('divDroneControl','<a onclick="LOOTERDrone.pause();">Pause</a>');
    LOOTERDrone.isPaused = false;
    LOOTERDrone.run(4,0);
  };
  
  this.findJumpJob = function(eng,exp) {
    // Find the biggest job that can be run with the energy
    var goodjob = -1;
    for (var i = 0; i < LOOTERItems.jobs.length; i++) {
      if (parseInt(LOOTERItems.jobs[i][6]) > 0 && parseInt(LOOTERItems.jobs[i][6]) <= parseInt(eng)) {
        if (parseInt(LOOTERItems.jobs[i][7]) >= parseInt(exp)) {
          if (goodjob == -1)
            goodjob = i;
          else
            if (parseInt(LOOTERItems.jobs[i][7]) > parseInt(LOOTERItems.jobs[goodjob][7]))
              goodjob = i;
        }
      }
    } 
    return goodjob;
  };
  
  this.canRunTokenDeck = function(job,eng,exp) {
    // Not with HEL
    if (LOOTERDrone.runHELJobs || LOOTERDrone.runLootJobs) return false;
    for (var i=0; i < LOOTERItems.jobs.length; i++) {
      if (LOOTERItems.jobs[i][0] == job[0] && LOOTERItems.jobs[i][1] == job[1] && LOOTERItems.jobs[i][2]==job[2]) {
        if ((parseFloat(LOOTERItems.jobs[i][7])/parseFloat(LOOTERItems.jobs[i][6])) >= (parseFloat(exp)/parseFloat(eng))) {
          if (parseFloat(LOOTERItems.jobs[i][7]*1.5) < parseFloat(exp))
            return i;
        }
      }
    }
    return false;
  };
  
  this.findJob = function(eng,exp) {
    // Find a job for eng or less that won't give back more than exp
    var goodjob = -1;

    if (parseInt(LOOTERDrone.tokencount) <= parseInt(LOOTERDrone.deckcount)) {
      var job = LOOTERDrone.canRunTokenDeck(LOOTERDrone.jobToken,eng,exp);
      if (job != false) {
        return job;
      } 
    } else {
      var job = LOOTERDrone.canRunTokenDeck(LOOTERDrone.jobDeck,eng,exp);
      if (job != false) {
        return job;
      }
    }

    for (var i = 0; i < LOOTERItems.jobs.length; i++) {
      if (parseInt(LOOTERItems.jobs[i][6]) > 0 && parseInt(LOOTERItems.jobs[i][6]) <= parseInt(eng) && (parseFloat(LOOTERItems.jobs[i][7])*1.5) < parseFloat(exp)) {
        var usejob = true;
        // Skip jobs that require money or consumables if selected
        if (parseInt(LOOTERItems.jobs[i][8])==1 && LOOTERDrone.noReqMoney==true) usejob = false;
        if (parseInt(LOOTERItems.jobs[i][9])==1 && LOOTERDrone.noReqItem==true) usejob = false; 
        
        // Avoid poker if no chips or decks or ratio is below poker
        if (parseInt(LOOTERItems.jobs[i][0])==parseInt(LOOTERDrone.jobPoker[0]) && parseInt(LOOTERItems.jobs[i][1])==parseInt(LOOTERDrone.jobPoker[1]) && parseInt(LOOTERItems.jobs[i][2])==parseInt(LOOTERDrone.jobPoker[2])) {
          if (parseInt(LOOTERDrone.deckcount) < parseInt(20) || parseInt(LOOTERDrone.tokencount) < parseInt(20)) usejob = false;
          if (parseFloat(LOOTERConfig.curRatio) <= (parseFloat(LOOTERDrone.getJobRatio(LOOTERDrone.jobPoker)))) usejob = false;
        }
        if (usejob == true) {
          if (goodjob==-1) {
            goodjob = i;
          }
          else
            if (parseFloat(LOOTERItems.jobs[i][7])/parseFloat(LOOTERItems.jobs[i][6]) > parseFloat(LOOTERItems.jobs[goodjob][7])/parseFloat(LOOTERItems.jobs[goodjob][6])) {
              goodjob = i;
            }
        }
      }
    }
    /*
    // If no viable job, run Poker or Settle A Beef if it won't put us over the top
    if (goodjob == -1) {
      if (LOOTERDrone.deckcount >= 20 && LOOTERDrone.tokencount >= 20 && exp <= LOOTERDrone.getJobEng(LOOTERDrone.jobPoker)) {
        goodjob = LOOTERDrone.getJobNumber(LOOTERDrone.jobPoker);
      } 
    }
    if (goodjob == -1) {
      if (exp <= LOOTERDrone.getJobEng(LOOTERDrone.jobBest)) {
        goodjob = LOOTERDrone.getJobNumber(LOOTERDrone.jobPoker);
      }
    }
    */
    return goodjob;
  }

  this.setBigJump = function() {
    // Set up for the big jump to the next level
    var bEng = parseInt(LOOTERConfig.curEnergy) - parseInt(LOOTERDrone.bigjumpeng);
    var bExp = parseInt(LOOTERConfig.curExpNeeded) - parseInt(LOOTERConfig.curExp);
    // Try to find a job to run
    var job = LOOTERDrone.findJob(bEng,bExp);
    if (job >= 0 && bExp > 1) {
      // Run the good job unless we're low on energy
      // *** TODO - Add code to handle waiting to avoid mugging job
      LOOTERDrone.runOneJob(0,0,new Array(LOOTERItems.jobs[job][0],LOOTERItems.jobs[job][1],LOOTERItems.jobs[job][2]));
    } else { 
      // Only thing left to do is the big job if it gets us there
      if (bEng >= 0 && bExp <= parseInt(LOOTERItems.jobs[LOOTERDrone.bigjumpid][7])) {
        LOOTERDisplay.addLine('Running Big Job - ' + LOOTERItems.jobs[LOOTERDrone.bigjumpid][3],LOOTERConfig.clrAction);
        LOOTERDrone.runOneJob(0,0,new Array(LOOTERItems.jobs[LOOTERDrone.bigjumpid][0],LOOTERItems.jobs[LOOTERDrone.bigjumpid][1],LOOTERItems.jobs[LOOTERDrone.bigjumpid][2]));
      } else {
        LOOTERDisplay.addLine('Not enough exp from big job to level, running normal jobs',LOOTERConfig.clrAction);
        LOOTERDrone.runOneJob(0,0,LOOTERDrone.jobBest);
      }
    }
  };
  
  this.getJobName = function(arJob) {
    for (var i=0; i < LOOTERItems.jobs.length; i++)
      if (LOOTERItems.jobs[i][0]==arJob[0] && LOOTERItems.jobs[i][1]==arJob[1] && LOOTERItems.jobs[i][2]==arJob[2])
        return(LOOTERItems.jobs[i][3]);
    return ' - Job name not available';
  };
  
  this.getJobNumber = function(arJob) {
    for (var i=0; i < LOOTERItems.jobs.length; i++)
      if (LOOTERItems.jobs[i][0]==arJob[0] && LOOTERItems.jobs[i][1]==arJob[1] && LOOTERItems.jobs[i][2]==arJob[2]) {
        return(i);
      }
    return -1;
  };
  
  this.getJobRatio = function(arJob) {
    for (var i=0; i < LOOTERItems.jobs.length; i++)
      if (LOOTERItems.jobs[i][0]==arJob[0] && LOOTERItems.jobs[i][1]==arJob[1] && LOOTERItems.jobs[i][2]==arJob[2]) {
        return(parseFloat((LOOTERItems.jobs[i][7]/LOOTERItems.jobs[i][6])*100)/100);
      }
    return 999999;
  };

  this.getJobEng = function(arJob) {
    for (var i=0; i < LOOTERItems.jobs.length; i++)
      if (LOOTERItems.jobs[i][0]==arJob[0] && LOOTERItems.jobs[i][1]==arJob[1] && LOOTERItems.jobs[i][2]==arJob[2])
        return(parseInt(LOOTERItems.jobs[i][6]));
    return 0;
  };
  
  this.getJobExp = function(arJob) {
    for (var i=0; i < LOOTERItems.jobs.length; i++)
      if (LOOTERItems.jobs[i][0]==arJob[0] && LOOTERItems.jobs[i][1]==arJob[1] && LOOTERItems.jobs[i][2]==arJob[2])
        return(parseInt(LOOTERItems.jobs[i][7]));
    return 0;
  };
  
  this.useSkillPoints = function(step,index) {
    if (LOOTERDrone.isRunning == false || LOOTERDrone.isPaused==true) return;
    switch(step) {
      case 0:
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlSpendSkillPoints;
        url += '&upgrade_key=' + LOOTERDrone.skillToSpend + '&upgrade_amt=';
        if (parseInt(LOOTERConfig.curSkillPoints) >= 5)
          url += '5';
        else 
          url += '1';
        //for (var i=0; i < 10; i++)
        LOOTERAjax.buildAjax(url,'LOOTERDrone.useSkillPoints','1,%ix%');
        break;
      case 1:
        // Skill points spend, update the stats
        LOOTERTimers.updateStats(1,index);
        if (parseInt(LOOTERConfig.curSkillPoints) > 0)
          LOOTERDrone.useSkillPoints(0,0);
        break;
    }
  };
  
  this.spendStamTimeout;
  
  this.spendStamina = function(step,index) {
    // Make sure that we aren't spending when it could cause us to level up accidentally
    if (LOOTERConfig.curExpNeeded-LOOTERConfig.curExp < 25 && LOOTERDrone.stopForLevel==true) {LOOTERDisplay.setHTML('divDroneStatus','Low stamina, stopping before level up');LOOTERDrone.isburningstamina=false;return;}
    if (LOOTERDrone.isRunning == false || LOOTERDrone.isPaused==true) return;
    switch(step) {
      case 0:
        LOOTERDisplay.setHTML('divDroneStatus','Using Stamina Before Running Jobs');
        LOOTERDrone.isburningstamina = true;
        // Check if we're robbing. If so, jump to the other section
        if (LOOTERDrone.stamRob == true) {
          LOOTERDrone.spendStamina(10,0);
          return;
        }
        
        if (LOOTERDrone.stamRobFight == true && parseInt(LOOTERConfig.curStamina) > parseInt(LOOTERDrone.FRSwitch)) {
          LOOTERDrone.spendStamina(10,0);
          return;
        }
        
        if (LOOTERDrone.stamFightRob == true && parseInt(LOOTERConfig.curStamina) <= parseInt(LOOTERDrone.FRSwitch)) {
          LOOTERDrone.spendStamina(10,0);
          return;
        }
        
        // Check for healing
        if (parseInt(LOOTERConfig.curHealth) < 25) {
          LOOTERDrone.spendStamina(1,0);
          return;
        }
          
        if ((LOOTERDrone.stamFightCity != 7 && parseInt(LOOTERConfig.curStamina) > 0) || (LOOTERDrone.stamFightCity == 7 && parseInt(LOOTERConfig.curStamina) >= 5)) {
          // Travel to the right city and jump to the main loop
          if ((LOOTERConfig.currentCity != LOOTERDrone.stamFightCity) && LOOTERDrone.stamFightCity > 0)
            LOOTERTravel.goCity(LOOTERDrone.stamFightCity,"LOOTERDrone.spendStamina(3,0)");
          else
            LOOTERDrone.spendStamina(3,0);
        } else {
          LOOTERDrone.isburningstamina = false;
        }
        break;
      
      case 1:
        if (LOOTERConfig.curExpNeeded-LOOTERConfig.curExp < 25 && LOOTERDrone.stopForLevel == true) {LOOTERDisplay.setHTML('divDroneStatus','Stopping before level up');LOOTERDrone.isburningstamina=false;return;}
        // Heal in the heal city
        
        if ((LOOTERConfig.currentCity != LOOTERDrone.stamHealCity) && LOOTERDrone.stamHealCity > 0) {
          LOOTERTravel.goCity(LOOTERDrone.stamHealCity,"LOOTERDrone.spendStamina(1,0)");
        } else {
          var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlHeal + '&xw_city=' + LOOTERConfig.currentCity;
          LOOTERAjax.buildAjax(url,'LOOTERDrone.spendStamina','2,%ix%');
        }
        break;
        
      case 2:
        // See if we healed
        if (LOOTERAjax.ajax[index]) {
          LOOTERTimers.updateStats(1,index);
          var r = LOOTERAjax.ajax[index].response;
          if (parseInt(LOOTERConfig.curHealth) < 25) {
            // Couldn't heal, wait 15 seconds and try again
            LOOTERDisplay.setHTML('divDroneStatus','Can\'t heal yet, waiting...');
            setTimeout('LOOTERDrone.spendStamina(1,0)',15000);
            return; 
          }
          // Healed, start over
          LOOTERDrone.spendStamina(0,0);
        } else {
          // No response from the call, try again in 15 seconds
          setTimeout('LOOTERDrone.spendStamina(1,0)',15000);
        }
        break;
          
      case 3:
        // Load the fight page and look for someone to attack
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlFightList;
        LOOTERAjax.buildAjax(url,'LOOTERDrone.spendStamina','4,%ix%');
        break; 
      
      case 4:
        var r = LOOTERAjax.ajax[index].response;
        LOOTERParser.getFightList(r);
        // Check for someone on the fightlist to attack
        var i = LOOTERParser.getAttackTarget(1,LOOTERDrone.fightLevel,1,LOOTERDrone.fightMafia,LOOTERDrone.FIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          LOOTERDisplay.setHTML('divDroneStatus','No matches on fight list, waiting 10 seconds');
          setTimeout('LOOTERDrone.spendStamina(0,0)',10000);
          return; 
        }
        // Have someone to attack, try once
        LOOTERDrone.curFightIndex = i;
        LOOTERDisplay.setHTML('divDroneStatus','Attacking ' + LOOTERConfig.curFightList[i][0] + '&nbsp;' + LOOTERConfig.curFightList[i][2] + ' - Level ' + LOOTERConfig.curFightList[i][3] + ' - Mafia Size ' + LOOTERConfig.curFightList[i][4]);
        var url = LOOTERConfig.MWROOTPATH + '?' + LOOTERConfig.urlAttack;
        url += '&xw_city=' + LOOTERConfig.curFightList[i][5];
        LOOTERAjax.buildAjax(url,'LOOTERDrone.spendStamina','5,%ix%');
        break;

      case 5:
        // Title, UserID, Name, Level, Mafia, tmpkey, iced, available
        var r = LOOTERAjax.ajax[index].response;
        r = r.replace(/[\r\n|\n|\t]/g,'');
        // Clear the timeout
        if (LOOTERDrone.spendStamTimeout) clearTimeout(LOOTERDrone.spendStamTimeout);
        LOOTERTimers.updateStats(1,index);
        if (r.indexOf('You Won!') > 0) {
          // Won the fight, update the counters and see if we can fight again
          // Check if it was a power attack
          if (r.indexOf('Win:') > 0) {
            LOOTERDrone.fightwins += parseInt(r.substr(r.indexOf('Win:')+4));
          } else {
            LOOTERDrone.fightwins++;
          }
          LOOTERDisplay.setHTML('divDroneFightLoss','L: ' + LOOTERDrone.fightlosses);
          LOOTERDisplay.setHTML('divDroneFightWin','W: ' + LOOTERDrone.fightwins);
          // Check for money
          var me = LOOTERParser.getFightMoney(r);
          if (parseInt(me[2]) > 0) {
            for (var i=0; i < LOOTERItems.cities.length;i++) {
              if (LOOTERItems.cities[i][6] == me[0]+me[1]) 
                LOOTERDrone.totalmoney[i] += parseInt(me[2]);
            }
          }
          // Check for loot
          var tla = LOOTERParser.getFightLoot(r);
          if (tla.length > 0) {
            for (var i=0; i < tla.length; i++) {
              var lindex = -1;
              for (var j = 0; j < LOOTERDrone.lootitems.length; j++) {
                if (LOOTERDrone.lootitems[j][1]==tla[i][1]) 
                  lindex = j;
              }
              try {
                if (lindex == -1) {
                  LOOTERDrone.lootitems[LOOTERDrone.lootitems.length] = new Array(tla[i][0],tla[i][1]);
                } else {
                  LOOTERDrone.lootitems[lindex][0] = '*' + (parseInt(LOOTERDrone.lootitems[lindex][0]) + parseInt(tla[i][0]));
                }
              } catch(err) {}
            }
          }
          // Get current A/D
          LOOTERDrone.attackStrengthCurrent = LOOTERParser.getADStats(r,'A');
          LOOTERDrone.defenseStrengthCurrent = LOOTERParser.getADStats(r,'D');
          LOOTERDrone.updateDroneResults();

          // Check stamina remaining
          if (LOOTERConfig.curStamina <= 0 || LOOTERConfig.curExpNeeded-LOOTERConfig.curExp < 25) {
            if (LOOTERConfig.curStamina > 0)
              LOOTERDisplay.setHTML('divDroneStatus','All Stamina used...Stopping');
            else
              LOOTERDisplay.setHTML('divDroneStatus','Stopping before level up');
            LOOTERDrone.isburningstamina = false;
            return;
          }
          
          // Check to see if we need to switch
          if (LOOTERDrone.stamRobFight == true && parseInt(LOOTERConfig.curStamina) > parseInt(LOOTERDrone.FRSwitch)) {
            LOOTERDrone.spendStamina(10,0);
            return;
          }
        
          if (LOOTERDrone.stamFightRob == true && parseInt(LOOTERConfig.curStamina) <= parseInt(LOOTERDrone.FRSwitch)) {
            LOOTERDrone.spendStamina(10,0);
            return;
          }
          
          // Check health
          if (LOOTERConfig.curHealth < 25) {
            // Start over with the health check
            LOOTERDrone.spendStamina(0,0);
            return;
          }
          if (r.indexOf('power_attack') > 0) {
            // Power attack
            var s = r.indexOf('power_attack');
            while (r.substr(s,1) != '?') s--;
            var e = r.indexOf('"',s);
            var url = LOOTERConfig.MWROOTPATH + r.substr(s,e-s);
            setTimeout("LOOTERAjax.buildAjax('" + url + "','LOOTERDrone.spendStamina','5,%ix%')",LOOTERDrone.FDelay*1000);
          } else {
            // No longer alive, get a new target
            LOOTERConfig.curFightList[LOOTERDrone.curFightIndex][7] = 0;
            setTimeout("LOOTERDrone.spendStamina(6,0);",LOOTERDrone.FDelay*1000);
          }
        } else if (r.indexOf('You Lost!') > 0) {
          LOOTERDrone.fightlosses++;
          LOOTERDisplay.setHTML('divDroneFightLoss','L: ' + LOOTERDrone.fightlosses);
          LOOTERDisplay.setHTML('divDroneFightWin','W: ' + LOOTERDrone.fightwins);
          LOOTERConfig.curFightList[LOOTERDrone.curFightIndex][7] = 0;
          if (LOOTERConfig.curStamina > 0 && (LOOTERConfig.curExpNeeded-LOOTERConfig.curExp > 25 || LOOTERDrone.stopForLevel==false)) {
            // Find a new target
            setTimeout("LOOTERDrone.spendStamina(6,0);",LOOTERDrone.FDelay*1000);
          } else {
            // All stamina gone, set the flag
            LOOTERDrone.isburningstamina = false;
            return;
          }
          
        } else {
          // Bad response, start over
          LOOTERDrone.spendStamina(0,0);
        }
        break;
        
      case 6: 
                
        var i = LOOTERParser.getAttackTarget(1,LOOTERDrone.fightLevel,1,LOOTERDrone.fightMafia,LOOTERDrone.FIgnore);
        if (i==-1) {
          // Nothing on the fight list, wait
          LOOTERDisplay.setHTML('divDroneStatus','No matches on fight list, waiting 10 seconds');
          setTimeout('LOOTERDrone.spendStamina(0,0)',10000);
          return; 
        }
        // Have someone to attack, try once
        LOOTERDrone.curFightIndex = i;
        LOOTERDisplay.setHTML('divDroneStatus','Attacking ' + LOOTERConfig.curFightList[i][0] + '&nbsp;' + LOOTERConfig.curFightList[i][2] + ' - Level ' + LOOTERConfig.curFightList[i][3] + ' - Mafia Size ' + LOOTERConfig.curFightList[i][4]);
        var url = LOOTERConfig.MWROOTPATH + '?' + LOOTERConfig.urlAttack;
        url += '&xw_city=' + LOOTERConfig.curFightList[i][5];
        LOOTERAjax.buildAjax(url,'LOOTERDrone.spendStamina','5,%ix%');
        break;
        
      case 10: // Robbing section
        // If stamina is too low, just bail

        if (LOOTERConfig.curStamina < 5) {
          LOOTERDrone.isburningstamina = false;
          break;
        }
        
        // If we're not in the robbing city, go back there
        if (parseInt(LOOTERDrone.stamRobCity) != 0) {
          if (parseInt(LOOTERConfig.currentCity) != parseInt(LOOTERDrone.stamRobCity)) {
            LOOTERTravel.goCity(LOOTERDrone.stamRobCity,'LOOTERDrone.spendStamina(10,0)');
            break;
          }
        }
        
        // Set the timeout to reset flag to false to keep from hanging
        LOOTERDrone.spendStamTimeout = setTimeout("LOOTERDrone.isburningstamina=false;",15000);
        // Load the robbing page
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlLoadRobbing;
        url += '&xw_city=' + LOOTERConfig.currentCity;
        LOOTERAjax.buildAjax(url,'LOOTERDrone.spendStamina','11,%ix%');
        break;
        
      case 11:
        if (LOOTERDrone.isRunning == false) {
          break;
        }
        var r = LOOTERAjax.ajax[index].response;
        LOOTERTimers.updateStats(1,index);
        // Load the robbing array
        LOOTERDrone.arNoStamina = false;
        for (var i=0; i < 9; i++) {
          LOOTERDrone.arRobSpots[i] = null;
          var s = r.indexOf('id="rob_slot_' + i);
          var e = r.indexOf('id="rob_slot_' + (i+1));
          if (e < 0) e = r.length;
          var tstr = r.substr(s,e-s);
          var diff = 'Easy';
          if (tstr.indexOf('rob_difficulty_medium') > 0) diff = "Medium";
          if (tstr.indexOf('rob_difficulty_hard') > 0) diff = "Hard";
          var prop = LOOTERParser.getValueInTags(tstr,'class="rob_prop_name"',1);
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
            msize = LOOTERParser.getValueInTags(tstr,'title="Mafia Size"',0);
            cost = LOOTERParser.getValueInTags(tstr,'title="Stamina Used"',0);            
          }
          
          LOOTERDrone.arRobSpots[i] = new Array(prop,diff,outcome,cost,msize);
        }
        var cs = LOOTERConfig.curStamina;
        var numrun = 0;
        var norun = 0;
        for (var i=0; i < 9; i++) {
          if (parseInt(LOOTERDrone.arRobSpots[i][3]) <= cs && parseInt(LOOTERDrone.arRobSpots[i][3]) != 0) {
            if (LOOTERDrone.arRobSpots[i][2]=='') {
              cs -= parseInt(LOOTERDrone.arRobSpots[i][3]);
              numrun++;
              var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRunRobbing;
              url += '&slot=' + i + '&xw_city=' + LOOTERConfig.currentCity;
              setTimeout("LOOTERAjax.buildAjax('" + url + "','LOOTERDrone.spendStamina','12,%ix%');",i*LOOTERDrone.RobDelay);
            } 
          } else {
            if (LOOTERDrone.arRobSpots[i][2]=='') {
              LOOTERDrone.arRobSpots[i][2]='Low Stamina';
              LOOTERDrone.arNoStamina = true;
            }
          }
        }
        if (numrun == 0) {
          // Could be first time in with no properties
          var hasstam = false;
          var all0 = true;
          for (var i = 0; i < 9; i++) {
            if (parseInt(LOOTERConfig.curStamina) >= parseInt(LOOTERDrone.arRobSpots[i][3]) && parseInt(LOOTERDrone.arRobSpots[i][3]) > 0)
              hasstam = true;
            if (parseInt(LOOTERDrone.arRobSpots[i][3]) > 0)
              all0 = false;
          }
          if (hasstam || all0) {
            // Get new properties\
            var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRobRefresh;
            url += '&xw_city=' + LOOTERConfig.currentCity;
            LOOTERAjax.buildAjax(url,'LOOTERDrone.spendStamina','11,%ix%');
            break;
          } else {
            LOOTERDrone.arNoStamina = true;          
          }
        }
        if (LOOTERDrone.arNoStamina == true) {
          LOOTERDrone.isburningstamina = false;
        }
        break;
        
      case 12:
        var r = LOOTERAjax.ajax[index].response;
        LOOTERParser.getStatsFromPage(r);
        r = r.replace(/[\r\n|\n|\t]/g,'');
        if (r.indexOf('SUCCESS!') > 0) LOOTERDrone.robwins++;
        if (r.indexOf('FAILED') > 0) LOOTERDrone.roblosses++;
        var s = r.indexOf('openSlot(');
        var slot = parseInt(r.substr(s+9));
        var res = LOOTERParser.getValueInTags(r,'"rob_res_outcome ',0);
        LOOTERDrone.arRobSpots[slot][2] = res;

        // Check for money
        var me = LOOTERParser.getRobbingMoney(r);
        if (parseInt(me[2]) > 0) {
          for (var i=0; i < LOOTERItems.cities.length;i++) {
            if (LOOTERItems.cities[i][6] == me[0]+me[1]) 
              LOOTERDrone.totalmoney[i] += parseInt(me[2]);
          }
        }
        
        var tla = LOOTERParser.getRobLoot(r);
        if (tla.length > 0) {
          for (var i=0; i < tla.length; i++) {
            var lindex = -1;
            for (var j = 0; j < LOOTERDrone.lootitems.length; j++) {
              if (LOOTERDrone.lootitems[j][1]==tla[i][1]) 
                lindex = j;
            }
            try {
              if (lindex == -1) {
                LOOTERDrone.lootitems[LOOTERDrone.lootitems.length] = new Array(tla[i][0],tla[i][1]);
              } else {
                LOOTERDrone.lootitems[lindex][0] = '*' + (parseInt(LOOTERDrone.lootitems[lindex][0]) + parseInt(tla[i][0]));
              }
            } catch(err) {}
          }
        }
        LOOTERDrone.updateDroneResults();
        
        // If all spots are done, get new targets
        var done = true;
        for (var i=0; i < 9; i++)
          if (LOOTERDrone.arRobSpots[i][2] == '')
            done = false;
        if (done && !LOOTERDrone.arNoStamina) {
          // Check for switching to fighting
          if (LOOTERDrone.stamRobFight == true && parseInt(LOOTERConfig.curStamina) <= parseInt(LOOTERDrone.FRSwitch)) {
            LOOTERDrone.spendStamina(0,0);
            if (LOOTERDrone.spendStamTimeout) clearTimeout(LOOTERDrone.spendStamTimeout);
            return;
          }
        
          if (LOOTERDrone.stamFightRob == true && parseInt(LOOTERConfig.curStamina) > parseInt(LOOTERDrone.FRSwitch)) {
            LOOTERDrone.spendStamina(0,0);
            if (LOOTERDrone.spendStamTimeout) clearTimeout(LOOTERDrone.spendStamTimeout);
            return;
          }

          for (var i = 0; i < 9; i++) LOOTERDrone.arRobSpots[i][2]='';
          // Get new properties
          var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRobRefresh;
          url += '&xw_city=' + LOOTERConfig.currentCity;
          LOOTERAjax.buildAjax(url,'LOOTERDrone.spendStamina','11,%ix%');
        }
        break;
        
    }
  };
  
  this.updateDroneResults = function() {
    LOOTERDisplay.setHTML('divDroneJobsRun',LOOTERDisplay.setGoodColor(LOOTERDrone.jobsrun));
    var tval = parseInt((LOOTERDrone.freejobs/LOOTERDrone.jobsrun)*10000)/100;
    if (isNaN(tval)) tval = 0;
    LOOTERDisplay.setHTML('divDroneFreeJobs',LOOTERDisplay.setGoodColor(LOOTERDrone.freejobs) + ' (' + tval + '%)');
    tval = parseInt((LOOTERDrone.extraexp/LOOTERDrone.jobsrun)*10000)/100;
    if (isNaN(tval)) tval = 0;
    LOOTERDisplay.setHTML('divDroneExtraExp',LOOTERDisplay.setGoodColor(LOOTERDrone.extraexp) + ' for ' + LOOTERDisplay.setGoodColor(LOOTERDrone.totalextraexp) + ' (' + tval + '%)');
    LOOTERDisplay.setHTML('divDroneExtraMoney',LOOTERDisplay.setGoodColor(LOOTERDrone.extramoney));
    var txt = '';
    for (var i=0; i < LOOTERItems.cities.length; i++) {
        txt += LOOTERItems.cities[i][6] + LOOTERDrone.totalmoney[i] + '&nbsp;&nbsp;&nbsp;';
    }
    LOOTERDisplay.setHTML('divDroneTotalMoney',LOOTERDisplay.setGoodColor(txt));
    var txt = '';
    for (var i=0; i < LOOTERDrone.lootitems.length; i++) {
      var t = LOOTERDrone.lootitems[i][0].toString();  if (t==null)t='  ';
      if (t.substr(0,1)=='*') {
        t = t.substr(1);
        LOOTERDrone.lootitems[i][0] = LOOTERDrone.lootitems[i][0].toString().substr(1);
        txt += LOOTERDrone.lootitems[i][1] + ' (<font style="color:#ffff00">x' + t + '</font>)';
      }
      else
        txt += LOOTERDrone.lootitems[i][1] + ' (x' + LOOTERDrone.lootitems[i][0] + ')';
      if (i < LOOTERDrone.lootitems.length-1) txt += ' - ';
    }
    LOOTERDisplay.setHTML('divDroneLoot',LOOTERDisplay.setGoodColor(txt));
    LOOTERDisplay.setHTML('divDroneLevels',LOOTERDisplay.setGoodColor(parseInt(LOOTERConfig.curLevel)-parseInt(LOOTERDrone.startinglevel)));
    LOOTERDisplay.setHTML('divDroneExpNeeded',LOOTERDisplay.setGoodColor(LOOTERConfig.curExpNeeded-LOOTERConfig.curExp));
    LOOTERDisplay.setHTML('divDroneEngLeft',LOOTERDisplay.setGoodColor(LOOTERConfig.curEnergy));
    LOOTERDisplay.setHTML('divDroneStamLeft',LOOTERDisplay.setGoodColor(LOOTERConfig.curStamina));
    if (parseFloat(LOOTERConfig.curRatio) >= 0)
      LOOTERDisplay.setHTML('divDroneCurRatio',LOOTERDisplay.setGoodColor(LOOTERConfig.curRatio));
    else
      LOOTERDisplay.setHTML('divDroneCurRatio','Waiting...');
    var bonusText = '<font style="color:#ff0000">' + LOOTERDrone.cBonus + '%</font>';
    if (parseFloat(LOOTERDrone.cBonus) >= 6.0) bonusText = '<font style="color:#ffff00">' + LOOTERDrone.cBonus + '%</font>';
    if (parseFloat(LOOTERDrone.cBonus) >= 10.0) bonusText = '<font style="color:#00ff00">' + LOOTERDrone.cBonus + '%</font>';
    if (parseFloat(LOOTERDrone.expRatio) >= LOOTERDrone.getJobRatio(LOOTERDrone.jobPoker))
      LOOTERDisplay.setHTML('divDroneExpRatio',LOOTERDisplay.setGoodColor(parseInt(LOOTERDrone.expRatio*100)/100) + ' (' + bonusText + ')');
    else  
      LOOTERDisplay.setHTML('divDroneExpRatio',LOOTERDisplay.setGoodColor('Level Up') + ' (' + bonusText + ')');
    LOOTERDisplay.setHTML('divDroneTokens',LOOTERDisplay.setGoodColor(LOOTERDrone.tokencount));
    LOOTERDisplay.setHTML('divDroneDecks',LOOTERDisplay.setGoodColor(LOOTERDrone.deckcount));
    
    var t = LOOTERDisplay.setGoodColor(LOOTERDrone.attackStrengthCurrent);
    var dif = LOOTERDrone.attackStrengthCurrent - LOOTERDrone.attackStrength;
    if (dif < 0) t += '&nbsp;' + LOOTERDisplay.setBadColor('(' + dif + ')');
    if (dif > 0) t += '&nbsp;' + LOOTERDisplay.setGoodColor('(+' + dif + ')');
    LOOTERDisplay.setHTML('divDroneAttack',t);
    var t = LOOTERDisplay.setGoodColor(LOOTERDrone.defenseStrengthCurrent);
    var dif = LOOTERDrone.defenseStrengthCurrent - LOOTERDrone.defenseStrength;
    if (dif < 0) t += '&nbsp;' + LOOTERDisplay.setBadColor('(' + dif + ')');
    if (dif > 0) t += '&nbsp;' + LOOTERDisplay.setGoodColor('(+' + dif + ')');
    LOOTERDisplay.setHTML('divDroneDefense',t);
    LOOTERDisplay.setHTML('divDroneRobLoss','L: ' + LOOTERDrone.roblosses);
    LOOTERDisplay.setHTML('divDroneRobWin','W: ' + LOOTERDrone.robwins);

  };
  
};

/***************************************
  Player/Account Functions
****************************************/
function LOOTERAccountDef() {

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
        LOOTERAccount.mafiaindex = 0;
        var txt = '';
        txt += '<div style="text-align:center;">This function will go through your mafia family and retrieve all of the ';
        txt += 'information to cross-reference their account with their<br>Facebook profile ';
        txt += 'plus other MW account data.  It will be listed in a table that can be saved ';
        txt += 'to your computer for easy reference.<br><br>';
        txt += 'There will be some entries where the FB call doesn\'t return a name, this is normal ';
        txt += 'and the name will have to be filled in manually.<br><br>'; 
        txt += '<a onclick="LOOTERAccount.myMafia(1,0);">Click here to get started</a></div>';
        LOOTERDisplay.setHTML('divLOOTERSetup',txt);
        break;
        
      case 1:
        LOOTERDisplay.setHTML('divLOOTERSetup','Loading mafia page...');
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlRecruit + '&xw_city=' + LOOTERConfig.currentCity + '&tmp=' + LOOTERConfig.tmpkey;
        LOOTERAjax.buildAjax(url,'LOOTERAccount.myMafia','2,%ix%'); 
        break;
        
      case 2:
        if (LOOTERAjax.ajax[index]) {
          var r = LOOTERAjax.ajax[index].response;
          if (r.indexOf('exclude_ids="') > 0) {
            var s = r.indexOf('exclude_ids="');
            s+=13;
            var str = '';
            while (r.substr(s,1) != '"') str+=r.substr(s++,1);
            LOOTERAccount.currentMafia = str.split(',');
            LOOTERAccount.myMafia(3,0);
            break;
          }
        }
        LOOTERDisplay.clearSetup();
        LOOTERDisplay.setHTML('divLOOTERResults','Could not retrieve mafia list...stopping');
        break;
        
      case 3:
        // Set up the table
        var txt = '';
        txt += '<b>My Mafia</b><br>';
        txt += '<table align="center" cellpadding="1" cellspacing="0" id="tblMafia" name="tblMafia">';
        txt += '<tr><th>Facebook ID</th><th>MW ID</th><th>Facebook Name</th><th>MW Name</th>';
        txt += '<th>Title</th><th>Level</th><th>Jobs Run</th><th>Fights Won</th><th>Fights Lost</th><th>Robbing Wins</th><th>Robbing Losses</th><th>Gifts Sent</th>';
        txt += '</table>';
        LOOTERDisplay.setHTML('divLOOTERResults',txt);
        // Start getting information
        LOOTERAccount.myMafia(4,0);
        break;
        
      case 4:
        // See if the user stopped it
        if (e$('tblMafia')==null) return;
        
        if (LOOTERAccount.mafiaindex < LOOTERAccount.currentMafia.length) {
          // Get the mafia info for this user
          LOOTERDisplay.setHTML('divLOOTERSetup',LOOTERAccount.mafiaindex + '/' + LOOTERAccount.currentMafia.length + ' - Loading information for user ' + LOOTERAccount.currentMafia[LOOTERAccount.mafiaindex]);
          var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlProfile + '&xw_city=' + LOOTERConfig.currentCity + '&user=' + LOOTERAccount.currentMafia[LOOTERAccount.mafiaindex];
          LOOTERAjax.buildAjax(url,'LOOTERAccount.myMafia','5,%ix%');
        } else {
          LOOTERDisplay.setHTML('divLOOTERSetup','All Mafia Family information loaded');
        }
        break;
        
      case 5:
        if (LOOTERAjax.ajax[index]) {
          var r = LOOTERAjax.ajax[index].response;
          // Parse out the mafia information
          var fbid=LOOTERAccount.currentMafia[LOOTERAccount.mafiaindex];
          var tmp = LOOTERParser.getValueInTags(r,'<div class="title"',0);
          tmp = tmp.split('"');
          var mwname = tmp[1];
          var title = tmp[0];
          tmp = tmp[2].split(' ');
          var level = tmp[2];
          var s = r.indexOf('class="main_table stats"');
          s = r.indexOf('Jobs Completed',s);
          var jobs = LOOTERParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('Fights Won',s);
          var fightsw = LOOTERParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('Fights Lost',s);
          var fightsl = LOOTERParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('Robbing Wins',s);
          var robw = LOOTERParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('Robbing Losses',s);
          var robl = LOOTERParser.getValueInTags(r.substr(s,s+100),'<td style',0);
          s = r.indexOf('Gifts sent',s);
          var gifts = LOOTERParser.getValueInTags(r.substr(s,s+100),'<td style',0);
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
            var qry = "SELECT uid,name FROM user WHERE uid=" + LOOTERAccount.currentMafia[LOOTERAccount.mafiaindex];
            FB.Facebook.apiClient.fql_query(qry,
              function(rows) {
                if (rows.length > 0) {
                  cellname.innerHTML = rows[0].name;
                } 
            });
          }
        }
        LOOTERAccount.mafiaindex++;
        LOOTERAccount.myMafia(4,0);
        break;
        
    }
        
  };
  
  this.arInventory = new Array();
  this.myInventory = function(step,index) {
    switch(step) {
      case 0:
        var txt = 'Please wait, loading inventory information...<Br>';
        LOOTERDisplay.setHTML('divLOOTERSetup',txt);
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlLootListPage;
        url += '&xw_city=' + LOOTERConfig.currentCity;
        LOOTERAjax.buildAjax(url,'LOOTERAccount.myInventory','1,%ix%');
        break;
    
      case 1:
        var r = LOOTERAjax.ajax[index].response;
        var s = r.indexOf('var Items');
        s = r.indexOf('data:',s) + 6;
        var e = r.indexOf('var InventorySearch',s);
        r = r.substr(s,e-s);
        // Get the items
        var regexitem = /\{[^}]+\}/g;
        var match = regexitem.exec(r);
        regexitem.lastIndex=0;
        LOOTERAccount.arInventory.length = 0;
        while (rmatch = regexitem.exec(r)) {
          LOOTERAccount.arInventory[LOOTERAccount.arInventory.length] = rmatch[0];
        }
        LOOTERDisplay.setHTML('divLOOTERSetup','Parsing inventory information');
        setTimeout('LOOTERAccount.myInventory(2,0)',100);
        break;
        
      case 2:
        var regexsplit = /".+?":"?.+?"?[,\}]/g;
        var item;
        for (var i=0; i < LOOTERAccount.arInventory.length; i++) {
          var tval = LOOTERAccount.arInventory[i];
          LOOTERAccount.arInventory[i] = new Array();
          while (item = regexsplit.exec(tval)) {
            var t = item[0].replace(new RegExp ('[",]','gi'),'');
            t = t.substr(t.indexOf('{')+1);
            t = t.split(':');
            switch(t[0]) {
              case 'id':LOOTERAccount.arInventory[i][0] = t[1];break;
              case 'name':LOOTERAccount.arInventory[i][1] = t[1];break;
              case 'attack':LOOTERAccount.arInventory[i][2] = t[1];break;
              case 'defense':LOOTERAccount.arInventory[i][3] = t[1];break;
              case 'quantity':LOOTERAccount.arInventory[i][4] = t[1];break;
              case 'equipped_offense':LOOTERAccount.arInventory[i][5] = t[1];break;
              case 'equipped_defense':LOOTERAccount.arInventory[i][6] = t[1];break;
              case 'type':LOOTERAccount.arInventory[i][7] = t[1];break;
              case 'tradeable':LOOTERAccount.arInventory[i][8] = t[1];break;
              case 'quality':LOOTERAccount.arInventory[i][9] = t[1];break;
              case 'gift_link':LOOTERAccount.arInventory[i][10] = t[1];break;
              case 'wishlist':LOOTERAccount.arInventory[i][11] = t[1];break;
              case 'location':LOOTERAccount.arInventory[i][12] = t[1];break;
              case 'subtype':LOOTERAccount.arInventory[i][13] = t[1];break;
            }
          }
        }
        LOOTERDisplay.clearSetup();
        setTimeout('LOOTERAccount.myInventory(3,0)',100);
        break;
        
      case 3:
        var txt = '';
        txt += '<table style="width:600px;" id="tblInventory" id="tblInventory">';
        txt += '<tr>';
        txt += '<th style="cursor:pointer;background-color:green;border:1px solid #fff;" id="invHdrTab1" name="invHdrTab1" onclick="LOOTERAccount.invTab(1);">Used Equipment</th>';
        txt += '<th style="cursor:pointer;border:1px solid #fff;" id="invHdrTab2" name="invHdrTab2" onclick="LOOTERAccount.invTab(2);">Consumables</th>';
        txt += '<th style="cursor:pointer;border:1px solid #fff;" id="invHdrTab3" name="invHdrTab3" onclick="LOOTERAccount.invTab(3);">Unused Equipment</th>';
        txt += '<th style="cursor:pointer;border:1px solid #fff;" id="invHdrTab4" name="invHdrTab4" onclick="LOOTERAccount.invTab(4);">Unowned Equipment</th>';
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
        LOOTERDisplay.setHTML('divLOOTERResults',txt);
        LOOTERAccount.invSort('A');
        LOOTERAccount.invShowEquipment(1);
        LOOTERAccount.invSort('D');
        LOOTERAccount.invShowEquipment(2);
        LOOTERAccount.invShowConsumables();
        LOOTERAccount.invSort('N');
        LOOTERAccount.invShowUnusedEquipment();
        LOOTERAccount.invShowUnownedEquipment();
        
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
    LOOTERAccount.invSort('N');
    for (var i=0; i < LOOTERAccount.arInventory.length; i++) {
      if (LOOTERAccount.arInventory[i][7]==4 && LOOTERAccount.arInventory[i][4] > 0) {
        txt += '<tr>';
        txt += '<td>' + LOOTERAccount.arInventory[i][4] + '</td>'; 
        txt += '<td>' + LOOTERAccount.arInventory[i][1] + '</td>'; 
        txt += '<td>';
        if(LOOTERAccount.arInventory[i][8]==1) 
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
    txt += '<th onclick="LOOTERAccount.invSort(\'Q\');LOOTERAccount.invShowUnusedEquipment();" title="Sort by Quantity">Qt.</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'N\');LOOTERAccount.invShowUnusedEquipment();" title="Sort by Name">Item Name</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'A\');LOOTERAccount.invShowUnusedEquipment();" title="Sort by Attack">Att</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'D\');LOOTERAccount.invShowUnusedEquipment();" title="Sort by Defense">Def</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'G\');LOOTERAccount.invShowUnusedEquipment();" title="Sort by Giftable">Gift</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'C\');LOOTERAccount.invShowUnusedEquipment();" title="Sort by Category">Qual</th>';
    txt += '</tr>';
    txt += LOOTERAccount.invShowUnusedItems(1);
    txt += LOOTERAccount.invShowUnusedItems(2);
    txt += LOOTERAccount.invShowUnusedItems(3);
    txt += LOOTERAccount.invShowUnusedItems(8);
    e$('invTab3').innerHTML = txt;    
  };
  
  this.invShowUnownedEquipment = function() {
    var txt = '';
    txt += '<table id="tblInvEquip" name="tblInvEquip" style="border:1px solid #fff;">';
    txt += '<tr>';
    txt += '<th onclick="LOOTERAccount.invSort(\'N\');LOOTERAccount.invShowUnownedEquipment();" title="Sort by Name">Item Name</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'A\');LOOTERAccount.invShowUnownedEquipment();" title="Sort by Attack">Att</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'D\');LOOTERAccount.invShowUnownedEquipment();" title="Sort by Defense">Def</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'G\');LOOTERAccount.invShowUnownedEquipment();" title="Sort by Giftable">Gift</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'C\');LOOTERAccount.invShowUnownedEquipment();" title="Sort by Category">Qual</th>';
    txt += '</tr>';
    txt += LOOTERAccount.invShowUnownedItems(1);
    txt += LOOTERAccount.invShowUnownedItems(2);
    txt += LOOTERAccount.invShowUnownedItems(3);
    txt += LOOTERAccount.invShowUnownedItems(8);
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
    for (var i=0; i < LOOTERAccount.arInventory.length; i++) {
      if (parseInt(LOOTERAccount.arInventory[i][4]) > 0 && LOOTERAccount.arInventory[i][5] == 0 && LOOTERAccount.arInventory[i][6] == 0 && LOOTERAccount.arInventory[i][7]==cat) {
        t += '<tr style="font-size:8px;">';
        t += '<td>' + LOOTERAccount.arInventory[i][4] + '</td>';
        t += '<td>' + LOOTERAccount.arInventory[i][1] + '</td>';
        t += '<td>' + LOOTERAccount.arInventory[i][2] + '</td>';
        t += '<td>' + LOOTERAccount.arInventory[i][3] + '</td>';
        t += '<td>';
        if (LOOTERAccount.arInventory[i][8] == 1) 
          t += 'Y';
        else
          t += 'N';
        t += '</td>';
        t += '<td>';
        switch (parseInt(LOOTERAccount.arInventory[i][9])) {
          case 1: t+='Common';break;
          case 2: t+='Uncommon';break;
          case 3: t+='Rare';break;
          case 4: t+='Superior';break;
          case 5: t+='Ultimate';break;
        }
        t += '</td>';
        t += '<td>';
        if (LOOTERAccount.arInventory[i][8] == 1)
          t += '<a title="Add item to Wishlist" onclick="LOOTERItems.addToWishlist(0,0,' + LOOTERAccount.arInventory[i][0] + ');">WL</a>';
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
    for (var i=0; i < LOOTERAccount.arInventory.length; i++) {
      if (parseInt(LOOTERAccount.arInventory[i][4]) == 0 && LOOTERAccount.arInventory[i][7]==cat) {
        t += '<tr style="font-size:8px;">';
        t += '<td>' + LOOTERAccount.arInventory[i][1] + '</td>';
        t += '<td>' + LOOTERAccount.arInventory[i][2] + '</td>';
        t += '<td>' + LOOTERAccount.arInventory[i][3] + '</td>';
        t += '<td>';
        if (LOOTERAccount.arInventory[i][8] == 1) 
          t += 'Y';
        else
          t += 'N';
        t += '</td>';
        t += '<td>';
        switch (parseInt(LOOTERAccount.arInventory[i][9])) {
          case 1: t+='Common';break;
          case 2: t+='Uncommon';break;
          case 3: t+='Rare';break;
          case 4: t+='Superior';break;
          case 5: t+='Ultimate';break;
        }
        t += '</td>';
        t += '<td>';
        if (LOOTERAccount.arInventory[i][8] == 1)
          t += '<a title="Add item to Wishlist" onclick="LOOTERItems.addToWishlist(0,0,' + LOOTERAccount.arInventory[i][0] + ');">WL</a>';
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
    txt += '<th onclick="LOOTERAccount.invSort(\'Q\');LOOTERAccount.invShowEquipment(' + col + ');" title="Sort by Quantity">Qt.</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'N\');LOOTERAccount.invShowEquipment(' + col + ');" title="Sort by Name">Item Name</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'A\');LOOTERAccount.invShowEquipment(' + col + ');" title="Sort by Attack">Att</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'D\');LOOTERAccount.invShowEquipment(' + col + ');" title="Sort by Defense">Def</th>';
    txt += '<th style="cursor:default;">Extra</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'G\');LOOTERAccount.invShowEquipment(' + col + ');" title="Sort by Giftable">Gift</th>';
    txt += '<th onclick="LOOTERAccount.invSort(\'C\');LOOTERAccount.invShowEquipment(' + col + ');" title="Sort by Category">Qual</th>';
    txt += '</tr>';
    switch (col) {
      case 1:
        txt += LOOTERAccount.invShowItems(1,5);
        txt += LOOTERAccount.invShowItems(2,5);
        txt += LOOTERAccount.invShowItems(3,5);
        txt += LOOTERAccount.invShowItems(8,5);
        break;
      case 2:
        txt += LOOTERAccount.invShowItems(1,6);
        txt += LOOTERAccount.invShowItems(2,6);
        txt += LOOTERAccount.invShowItems(3,6);
        txt += LOOTERAccount.invShowItems(8,6);
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
    for (var i=0; i < LOOTERAccount.arInventory.length-1; i++) {
      for (var j=i+1; j < LOOTERAccount.arInventory.length; j++) {
        switch(by) {
          case 'A':
            if (parseInt(LOOTERAccount.arInventory[i][2]) < parseInt(LOOTERAccount.arInventory[j][2])) {
              LOOTERAccount.swapInv(i,j);
            }
            break;
          case 'D':
            if (parseInt(LOOTERAccount.arInventory[i][3]) < parseInt(LOOTERAccount.arInventory[j][3])) {
              LOOTERAccount.swapInv(i,j);
            }
            break;
          case 'Q':
            if (parseInt(LOOTERAccount.arInventory[i][4]) < parseInt(LOOTERAccount.arInventory[j][4])) {
              LOOTERAccount.swapInv(i,j);
            }
            break;
          case 'N':
            if (LOOTERAccount.arInventory[i][1] > LOOTERAccount.arInventory[j][1]) {
              LOOTERAccount.swapInv(i,j);
            }
            break;
          case 'G':
            if (LOOTERAccount.arInventory[i][8] < LOOTERAccount.arInventory[j][8]) {
              LOOTERAccount.swapInv(i,j);
            }
            break;
          case 'C':
            if (LOOTERAccount.arInventory[i][9] < LOOTERAccount.arInventory[j][9]) {
              LOOTERAccount.swapInv(i,j);
            }
            break;
        
        }
      }
    }
  };
  
  this.swapInv = function(a,b) {
    var t = LOOTERAccount.arInventory[a];
    LOOTERAccount.arInventory[a] = LOOTERAccount.arInventory[b];
    LOOTERAccount.arInventory[b] = t;
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
    for (var i=0; i < LOOTERAccount.arInventory.length; i++) {
      if (parseInt(LOOTERAccount.arInventory[i][ad]) > 0 && LOOTERAccount.arInventory[i][7]==cat) {
        t += '<tr style="font-size:8px;">';
        t += '<td>' + LOOTERAccount.arInventory[i][4] + '</td>';
        t += '<td>' + LOOTERAccount.arInventory[i][1] + '</td>';
        t += '<td>' + LOOTERAccount.arInventory[i][2] + '</td>';
        t += '<td>' + LOOTERAccount.arInventory[i][3] + '</td>';
        var ea = LOOTERAccount.arInventory[i][4]-LOOTERAccount.arInventory[i][5];
        var ed = LOOTERAccount.arInventory[i][4]-LOOTERAccount.arInventory[i][6];
        if (ea > 0 && ed > 0) {
          t += '<td><font color="yellow">';
          if (ea > ed)
            t += ed;
          else 
            t += ea;
          t += '</font></td>';
        } else { t+='<td></td>'; }
        t += '<td>';
        if (LOOTERAccount.arInventory[i][8] == 1) 
          t += 'Y';
        else
          t += 'N';
        t += '</td>';
        t += '<td>';
        switch (parseInt(LOOTERAccount.arInventory[i][9])) {
          case 1: t+='Common';break;
          case 2: t+='Uncommon';break;
          case 3: t+='Rare';break;
          case 4: t+='Superior';break;
          case 5: t+='Ultimate';break;
        }
        t += '</td>';
        t += '<td>';
        if (LOOTERAccount.arInventory[i][8] == 1)
          t += '<a title="Add item to Wishlist" onclick="LOOTERItems.addToWishlist(0,0,' + LOOTERAccount.arInventory[i][0] + ');">WL</a>';
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
        LOOTERAccount.accountcurcity = LOOTERConfig.currentCity;
        LOOTERAccount.account.skills.length = 0;
        LOOTERAccount.account.hiddenloot.length = 0;
        LOOTERAccount.account.specialloot.length = 0;
        LOOTERAccount.account.preploot.length = 0;
        LOOTERAccount.account.weapons.length = 0;
        LOOTERAccount.account.armor.length = 0;
        LOOTERAccount.account.weapons.length = 0;
        LOOTERAccount.account.vehicles.length = 0;
        LOOTERAccount.account.boosts.length = 0;
        LOOTERAccount.account.achievements.length = 0;
        LOOTERAccount.account.animals.length = 0;
        var txt = 'Please wait, loading your account information...<br>';
        txt += 'Loading profile information...';
        LOOTERDisplay.setHTML('divLOOTERSetup',txt);
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlProfile;
        url += '&xw_city=' + LOOTERConfig.currentCity;
        LOOTERAjax.buildAjax(url,'LOOTERAccount.myAccount','1,%ix%');
        break;
        
      case 1:
        var r = LOOTERAjax.ajax[index].response;
        var s,e;
        var tmp = LOOTERParser.getValueInTags(r,'<div class="title"',0);
        tmp = tmp.split('"');
        LOOTERAccount.account.name = tmp[1];
        LOOTERAccount.account.title = tmp[0];
        LOOTERAccount.account.level = LOOTERParser.getUserFieldValue(r,'user_level');
        LOOTERAccount.account.mafiasize = LOOTERParser.getUserFieldValue(r,'user_group_size');
        LOOTERAccount.account.skills['energy'] = LOOTERParser.getUserFieldValue(r,'user_max_energy');
        LOOTERAccount.account.skills['stamina'] = LOOTERParser.getUserFieldValue(r,'user_max_stamina');
        LOOTERAccount.account.skills['health'] = LOOTERParser.getUserFieldValue(r,'user_max_health');
        s = r.indexOf('Attack:');
        while (r.substr(s,4) != '<td>') s++;
        LOOTERAccount.account.skills['attack'] = parseInt(r.substr(s+4));
        s = r.indexOf('Defense:');
        while (r.substr(s,4) != '<td>') s++;
        LOOTERAccount.account.skills['defense'] = parseInt(r.substr(s+4));
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
          LOOTERAccount.account.stats[LOOTERAccount.account.stats.length]=new Array(tname,r.substr(s,e-s));
          s = r.indexOf('<tr>',e);
          i++;
        }
        LOOTERDisplay.setHTML('divLOOTERSetup','Loading Achievements...');
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlAchievements;
        url += '&xw_city=' + LOOTERConfig.currentCity;
        LOOTERAjax.buildAjax(url,'LOOTERAccount.myAccount','2,%ix%');
        break; 
        
      case 2:
        var e;
        var r = LOOTERAjax.ajax[index].response;
        var s = r.indexOf('ach_ach_img');
        while (s > 0) {
          s+= 12;
          var earned = false;
          if (r.substr(s,8)=='ach_earn') earned = true;
          var atitle = LOOTERParser.getValueInTags(r.substr(s),'ach_ach_name',0);
          var adesc = LOOTERParser.getValueInTags(r.substr(s),'ach_ach_description',0);
          LOOTERAccount.account.achievements[LOOTERAccount.account.achievements.length] = new Array(atitle,adesc,earned);
          s = r.indexOf('ach_ach_img',s);
        }
        LOOTERDisplay.setHTML('divLOOTERSetup','Loading Equipment...');
        var url = LOOTERConfig.MWURLAJAX + LOOTERConfig.urlLootListPage;
        url += '&xw_city=' + LOOTERConfig.currentCity;
        LOOTERAjax.buildAjax(url,'LOOTERAccount.myAccount','3,%ix%');
        break;
        
      case 3:
        LOOTERAccount.ares = LOOTERAjax.ajax[index].response;
        var r = LOOTERAccount.ares;
                
        LOOTERAccount.swpn = r.indexOf('<h3><span class="text">Weapons</span></h3>');
        LOOTERAccount.sarm = r.indexOf('<h3><span class="text">Armor</span></h3>');
        LOOTERAccount.sveh = r.indexOf('<h3><span class="text">Vehicles</span></h3>');
        LOOTERAccount.sspc = r.indexOf('<h3><span class="text">Special Loot</span></h3>');
        LOOTERAccount.sani = r.indexOf('<h3><span class="text">Animals</span></h3>');
        LOOTERAccount.shid = r.indexOf('<h3><span class="text">Hidden Loot</span></h3>');
        LOOTERAccount.spre = r.indexOf('<h3><span class="text">Prep Loot</span></h3>');

        // Determine ending points
        LOOTERAccount.endlist = r.indexOf('Job Mastery Items');

        LOOTERAccount.ewpn = LOOTERAccount.lootgetlow(LOOTERAccount.swpn,LOOTERAccount.sarm,LOOTERAccount.sveh,LOOTERAccount.sspc,LOOTERAccount.sani,LOOTERAccount.shid,LOOTERAccount.spre,LOOTERAccount.endlist);
        LOOTERAccount.earm = LOOTERAccount.lootgetlow(LOOTERAccount.sarm,LOOTERAccount.swpn,LOOTERAccount.sveh,LOOTERAccount.sspc,LOOTERAccount.sani,LOOTERAccount.shid,LOOTERAccount.spre,LOOTERAccount.endlist);
        LOOTERAccount.eveh = LOOTERAccount.lootgetlow(LOOTERAccount.sveh,LOOTERAccount.swpn,LOOTERAccount.sarm,LOOTERAccount.sspc,LOOTERAccount.sani,LOOTERAccount.shid,LOOTERAccount.spre,LOOTERAccount.endlist);
        LOOTERAccount.espc = LOOTERAccount.lootgetlow(LOOTERAccount.sspc,LOOTERAccount.swpn,LOOTERAccount.sarm,LOOTERAccount.sveh,LOOTERAccount.sani,LOOTERAccount.shid,LOOTERAccount.spre,LOOTERAccount.endlist);
        LOOTERAccount.eani = LOOTERAccount.lootgetlow(LOOTERAccount.sani,LOOTERAccount.sspc,LOOTERAccount.swpn,LOOTERAccount.sarm,LOOTERAccount.sveh,LOOTERAccount.shid,LOOTERAccount.spre,LOOTERAccount.endlist);
        LOOTERAccount.ehid = LOOTERAccount.lootgetlow(LOOTERAccount.shid,LOOTERAccount.sspc,LOOTERAccount.swpn,LOOTERAccount.sarm,LOOTERAccount.sveh,LOOTERAccount.spre,LOOTERAccount.sani,LOOTERAccount.endlist);
        LOOTERAccount.epre = LOOTERAccount.lootgetlow(LOOTERAccount.spre,LOOTERAccount.sspc,LOOTERAccount.swpn,LOOTERAccount.sarm,LOOTERAccount.sveh,LOOTERAccount.shid,LOOTERAccount.sani,LOOTERAccount.endlist);

        LOOTERDisplay.setHTML('divLOOTERSetup','Weapons...');
        setTimeout('LOOTERAccount.myAccount(31,0)',1000);
        break;
        
      case 31:
        var r = LOOTERAccount.ares.substr(LOOTERAccount.swpn,LOOTERAccount.ewpn-LOOTERAccount.swpn);
        var s = r.indexOf('<strong>');
        while ( s > 0) {
          var tmp = LOOTERAccount.getInvItem(r,s);
          if (tmp == null) break;
          LOOTERAccount.account.weapons[LOOTERAccount.account.weapons.length] = tmp;
          s = r.indexOf('<strong>',++s);
        }
        LOOTERDisplay.setHTML('divLOOTERSetup','Armor...');
        setTimeout('LOOTERAccount.myAccount(32,0)',1000);
        break;
        
      case 32:
        var r = LOOTERAccount.ares.substr(LOOTERAccount.sarm,LOOTERAccount.earm-LOOTERAccount.sarm);
        var s = r.indexOf('<strong>');
        while ( s > 0) {
          var tmp = LOOTERAccount.getInvItem(r,s);
          if (tmp == null) break;
          LOOTERAccount.account.armor[LOOTERAccount.account.armor.length] = tmp;
          s = r.indexOf('<strong>',++s);
        }
        LOOTERDisplay.setHTML('divLOOTERSetup','Vehicles...');
        setTimeout('LOOTERAccount.myAccount(33,0)',1000);
        break;
        
      case 33:
        var r = LOOTERAccount.ares.substr(LOOTERAccount.sveh,LOOTERAccount.eveh-LOOTERAccount.sveh);
        var s = r.indexOf('<strong>');
        while ( s > 0) {
          var tmp = LOOTERAccount.getInvItem(r,s);
          if (tmp == null) break;
          LOOTERAccount.account.vehicles[LOOTERAccount.account.vehicles.length] = tmp;
          s = r.indexOf('<strong>',++s);
        }
        LOOTERDisplay.setHTML('divLOOTERSetup','Animals...');
        setTimeout('LOOTERAccount.myAccount(34,0)',1000);
        break;
        
   