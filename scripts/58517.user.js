// ==UserScript==
// @name            EmbeViSpecial
// @namespace       darkyndy.com/embevispecial
// @author          darkyndy
// @description     Auto Embed Video from link (codename: EmbeVi), special functionality
// @include         *
// @exclude         *youtube.com*
// @exclude         *220.ro*
// @exclude         *video.google.com*
// @exclude         *dailymotion.com*
// @exclude         *trilulilu.ro*
// @exclude         *metacafe.com*
// @exclude         *collegehumor.com*
// @exclude         *cnet.com*
// @exclude         *glumbert.com*
// @exclude         *myvideo.at*
// @exclude         *video.yahoo.com*
// @exclude         *vids.myspace.com*
// @exclude         *liveleak.com*
// @exclude         *vimeo.com*
// @exclude         *gametrailers.com*
// @exclude         *ustream.tv*
// @exclude         *clipshack.com*
// @exclude         *funnyordie.com*
// @exclude         *filebox.ro*
// @exclude         *last.fm*
// @exclude         *youku.com*
// @exclude         *ishare.rediff.com*
// @exclude         *vision.rambler.ru*
// @exclude         *tudou.com*
// @exclude         *ku6.com*
// @exclude         *tinypic.com*
// @exclude         *video.libero.it*
// @exclude         *espn.go.com*
// @exclude         *espn.com*
// @exclude         *nfl.com*
// @exclude         *video.web.de*
// @exclude         *video.eksenim.mynet.com*
// @exclude         *rutube.ru*
// @exclude         *livevideo.com*
// @exclude         *vbox7.com*
// @exclude         *revver.com*
// @exclude         *current.com*
// @exclude         *dalealplay.com*
// @exclude         *clipfish.de*
// @exclude         *clip.vn*
// @exclude         *livestream.com*
// @exclude         *tangle.com*
// @exclude         *vidiac.com*
// @exclude         *5min.com*
// @exclude         *video.vol.at*
// @exclude         *wegame.com*
// @exclude         *ikbis.com*
// @exclude         *youmaker.com*
// @exclude         *snotr.com*
// @exclude         *onetruemedia.com*
// @exclude         *clevver.com*
// @exclude         *kewego.com*
// @exclude         *clipser.com*
// @exclude         *dailyhaha.com*
// @exclude         *howcast.com*
// @exclude         *aniboom.com*
// @exclude         *bragster.com*
// @exclude         *teachertube.com*
// @exclude         *shredordie.com*
// @exclude         *talentrun.com*
// @exclude         *autsch.de*
// @exclude         *tvbvideo.de*
// @exclude         *clipmoon.com*
// @exclude         *viddyou.com*
// @exclude         *spymac.com*
// @exclude         *youare.tv*
// @exclude         *mindbites.com*
// @exclude         *jujunation.com*
// @exclude         *rooftopcomedy.com*
// @exclude         *hamburg1video.de*
// @exclude         *caught-on-video.com*
// @exclude         *bubblare.se*
// @exclude         *jaycut.com*
// @exclude         *spotn.de*
// @exclude         *thexvid.com*
// @exclude         *scivee.tv*
// @exclude         *tvosz.com*
// @exclude         *dailycomedy.com*
// @exclude         *deutschlandreporter.de*
// @exclude         *motorsportmad.com*
// @exclude         *rheinvideo.de*
// @exclude         *selfcasttv.com*
// @exclude         *myubo.sk*
// @exclude         *gettyload.de*
// @exclude         *cliphost24.com*
// @exclude         *uvuvideo.org*
// @exclude         *crovideos.com*
// @exclude         *qubetv.tv*
// @exclude         *citytube.de*
// @exclude         *constantcomedy.com*
// @exclude         *luegmol.ch*
// @exclude         *mantoutv.com*
// @exclude         *clonevideos.com*
// @exclude         *realitatea.net*
// @exclude         *mtv.com*
// @exclude         *rocktube.us*
// @exclude         *myplay.com*
// @exclude         *123video.com*
// @exclude         *9you.com*
// @exclude         *blastro.com*
// @exclude         *cellfish.com*
// @exclude         *clarin.com*
// @exclude         *clipjunkie.com*
// @exclude         *cliplife.jp*
// @exclude         *thedailyshow.com*
// @exclude         *comedycentral.com*
// @exclude         *colbertnation.com*
// @exclude         *crunchyroll.com*
// @exclude         *dotsub.com*
// @exclude         *divshare.com*
// @exclude         *fandome.com*
// @exclude         *g4tv.com*
// @exclude         *gamespot.com*
// @exclude         *gametube.com*
// @exclude         *gloria.tv*
// @exclude         *gotgame.com*
// @exclude         *izlesene.com*
// @exclude         *joost.com*
// @exclude         *justin.tv*
// @exclude         *koreus.com*
// @exclude         *machinima.com*
// @exclude         *msnbc.msn.com*
// @exclude         *video.mail.ru*
// @exclude         *madnessvideo.net*
// @exclude         *video.milliyet.com.tr*
// @exclude         *mofile.com*
// @exclude         *video.mpora.com*
// @exclude         *seehaha.com*
// @exclude         *video.mthai.com*
// @exclude         *onsmash.com*
// @exclude         *rawvegas.tv*
// @exclude         *screentoaster.com*
// @exclude         *sevenload.com*
// @exclude         *shareview.us*
// @exclude         *smotri.com*
// @exclude         *southparkstudios.com*
// @exclude         *spike.com*
// @exclude         *cbssports.com*
// @exclude         *tagtele.com*
// @exclude         *tm-tube.com*
// @exclude         *trtube.com*
// @exclude         *videolog.uol.com.br*
// @exclude         *u-tube.ru*
// @exclude         *videos.sapo.pt*
// @exclude         *videonuz.com*
// @exclude         *vidmax.com*
// @exclude         *vsocial.com*
// @exclude         *goear.com*
// @exclude         *ijigg.com*
// @exclude         *jamendo.com*
// @exclude         *jujunation.com*
// @exclude         *nhaccuatui.com*
// @exclude         *playlist.com*
// @exclude         *myvideo.de*
// @exclude         *myvideo.ch*
// @exclude         *myvideo.be*
// @exclude         *myvideo.nl*
// @version         1.2
// ==/UserScript==

/**
*    EmbeVi - Auto Embed Video From Link
*    Copyright (C) 2009  darkyndy
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*    Developer contact: darkyndy@gmail.com
*/


/*
ChangeLog (last version)
version 1.1.1
Added same functionality as EmbeVi 2.2
*/

var EmbeVi = {
  //BEGIN init
  init: function() {
    var browserUsed = "";
    var acceptSpecialFunctionality = true;
    if(navigator.appName.indexOf('Netscape') === 0){
      browserUsed = "firefox";
      if(navigator.appVersion.indexOf('Chrome') !== -1){
        browserUsed = "chrome";
      }
    }
    else if(navigator.appName.indexOf('Opera') === 0){
      browserUsed = "opera";
    }
    else if(navigator.appName.indexOf('Microsoft') === 0){
      browserUsed = "ie";
    }
    //if(EmbeVi.displayLog(5)){ alert("Browser detected: "+browserUsed);}

    //init video params
    EmbeVi.initVideoParams();
    
    switch(browserUsed){
      case 'firefox':
        if (unsafeWindow.console !== undefined){
          GM_log = unsafeWindow.console.log;
        }
        //if(EmbeVi.displayLog(1)){ GM_log("EmbeVi running on FireFox Browser");}
        EmbeVi.beginAutoUpdate();
      break;
      case 'opera':
        GM_log = window.opera.postError;
        //if(EmbeVi.displayLog(1)){ GM_log("EmbeVi running on Opera Browser");}
      break;
      case 'chrome':
        if(typeof console != "undefined"){
          GM_log = function(logData){ console.log(logData); };
        }
        else {
          GM_log = function(){};
        }
        //if(EmbeVi.displayLog(1)){ GM_log("EmbeVi running on Google Chrome Browser");}
      break;
      case 'ie':
        GM_log = console.log;
        //if(EmbeVi.displayLog(1)){ GM_log("EmbeVi running on Microsoft Internet Explorer Browser");}
      break;
    }

    if(browserUsed != ""){
      EmbeVi.insertStyle();
      EmbeVi.insertScript(browserUsed);
      EmbeVi.embedVideo(browserUsed, acceptSpecialFunctionality);
    }
  },
  //END init
  
  //START init video parameters
  initVideoParams: function(){
    var pluginspage = 'http://get.adobe.com/flashplayer/';
    var allowScriptAccess = 'always';
    var wmode = 'transparent';
    var videoSrc = '';
    var videoWidth = 600;
    var videoHeight = 400;
    
    /**
     * Embed Attributes
     */
    this.embedAttr = {
      'type':'application/x-shockwave-flash',
      'src':videoSrc,
      'width':videoWidth,
      'height':videoHeight,
      'wmode':wmode,
      'allowScriptAccess':allowScriptAccess,
      'pluginspage':pluginspage,
      'flashvars':'',
      'quality':'high',
      'allowfullscreen':'true',
      'loop':'false',
      'autoplay':'false',
      'autostart':'false',
      'scale':'exactfit',
      'align':'middle'
    };

    /**
     * Object Param
     */
    this.objectParam = {
      'movie':videoSrc,
      'wmode':wmode,
      'allowScriptAccess':allowScriptAccess,
      'pluginspage':pluginspage,
      'flashvars':''
    };

    /**
     * Object Attributes
     */
    this.objectAttr = {
      'classid':'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
      'codebase':'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0',
      'type':'application/x-shockwave-flash',
      'width':videoWidth,
      'height':videoHeight
    };
  },
  //END init video parameters
  
  //START logging
  /**
   * Debug Function - display in console
   * 
   * @param logLevel int - log level
   * debug Level values:
   * 0 -> none
   * 1 -> info
   * 2 -> debug
   * 3 -> special
   * 4 -> all
   */
  displayLog: function(logLevel){
    var debugLevel = 0;
    var echoLog = false;
    if(logLevel === 3 && debugLevel !== 0){
      echoLog = true;
    }
    else if(logLevel <= debugLevel){
      echoLog = true;
    }
    return echoLog;
  },
  //END logging
  
  //BEGIN Autoupdate
  /**
   * Check Update Period Function
   * - true -> then check if new version is available
   * - false -> do nothing
   */
  beginAutoUpdate: function() {
    var lastCheck = GM_getValue("lastVersionCheck");
    var now = (new Date()).getTime();
    if (!lastCheck){
      lastCheck = 0;
    }
    //check in 7 days
    var haveToCheck = ((now - lastCheck) > 7* 24 * 60 * 60 * 1000);
    if (haveToCheck) {
      EmbeVi.checkForUpdate();
    }
  },
  //END Autoupdate
  
  //BEGIN check for update
  /**
   * Check for Update Function
   * test if a new version is available
   */
  checkForUpdate: function() {
    //if(EmbeVi.displayLog(1)){ GM_log("Checking for new version...");}
    var now = (new Date()).getTime();
    GM_setValue("lastVersionCheck", now.toString());
    GM_xmlhttpRequest({
      method: 'GET',
      url: "http://userscripts.org/scripts/show/58517",
      headers: {
        "User-Agent": navigator.userAgent,
        "Referer": document.location
      },
        onload: function(responseDetails) {
        EmbeVi.autoUpdate(responseDetails);
      }
    });
  },
  //END check for update
  
  //BEGIN check for version
  /**
   * Start Auto Update Function
   * if a new version is available then display a message
   */
  autoUpdate: function(responseDetails) {
    if (responseDetails.status != 200){
      return;
    }
    var now = (new Date()).getTime();
    GM_setValue("lastVersionCheck", now.toString());
    //var currentVersion = GM_getValue("currentVersion");
    var currentVersion = "1.2";
    GM_setValue("currentVersion", currentVersion);
    
    var versionRE = /Version:<\/b>\s*([0-9\.]+)/;
    var latestVersion = responseDetails.responseText.match(versionRE)[1];
    //if(EmbeVi.displayLog(1)){ GM_log("Current version: " + currentVersion);}
    //if(EmbeVi.displayLog(1)){ GM_log("Found version: " + latestVersion);}

    if (currentVersion != latestVersion) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: "http://userscripts.org/scripts/show/58517",
        headers: {
          "User-Agent": navigator.userAgent,
          "Referer": document.location
        },
        onload: function(responseDetails) {
          EmbeVi.autoUpdateConfirm(responseDetails, currentVersion, latestVersion);
        }
      });
    }
  },
  //END check for version
  
  //BEGIN confirm update
  /**
   * Auto Update Confirm Function
   * Display a dialog if the user want's too update
   */
  autoUpdateConfirm: function(responseDetails, oldVersion, newVersion) {
    var stringEmbeViTitle = 'Auto Embed Video From Link (EmbeVi)';
    var versionChangeInfo = 'New version (' + newVersion + ') found. Update from version ' + oldVersion + '?';
    var confirmAlert = document.createElement("DIV");
    confirmAlert.id = 'EmbeVi:ConfirmAlert';
    confirmAlert.setAttribute('class', 'EmbeViConfirmAlert');
    
    confirmAlert.style.left = (window.innerWidth - 500) / 2 + "px";
    confirmAlert.style.top = (80 + window.scrollY) + "px";
    var divHeight = 150;
    //var divHeight = window.innerHeight - 250;
    //confirmAlert.style.height = divHeight + "px";
    
    confirmAlert.innerHTML = '<div style="background-color:#4a3918;height:22px;">' +
      '<div style="color:yellow;position:absolute;top:0px;left:10px">' +
      stringEmbeViTitle +
      '</div><div style="position:absolute;top:0px;right:0px">' +
      '<input type="button" id="EmbeVi:AutoUpdateOk" value="Ok" class="custombutton">' +
      '&nbsp;<input type="button" id="EmbeVi:AutoUpdateCancel" value="Cancel" class="custombutton"></div></div>' +
      '<div id="EmbeVi:Output" class="EmbeViOutput" style="height:' + (divHeight-40) + 'px;overflow:auto;">' + versionChangeInfo + '</div>';
    document.body.insertBefore(confirmAlert, document.body.firstChild);
    document.getElementById("EmbeVi:AutoUpdateOk").addEventListener("click", EmbeVi.autoUpdateConfirmOk, true);
    document.getElementById("EmbeVi:AutoUpdateOk").setAttribute("newVersion", newVersion);
    document.getElementById("EmbeVi:AutoUpdateCancel").addEventListener("click", EmbeVi.autoUpdateConfirmCancel, true);
  },
  //END confirm update
  
  //START confirm update (ok)
  /**
   * Auto Update Ok Function
   * Start update - user pressed "Ok"
   */
  autoUpdateConfirmOk: function(evt) {
    var newVersion = evt.target.getAttribute("newVersion").toString();
    GM_setValue("currentVersion", newVersion);
    GM_openInTab("http://userscripts.org/scripts/source/58517.user.js");
    EmbeVi.autoUpdateConfirmCancel(evt);
  },
  //END confirm update (ok)
  
  //START confirm update (cancel)
  /**
   * Auto Update Cancel Function
   * Stop update - user pressed "Cancel"
   */
  autoUpdateConfirmCancel: function(evt) {
    var confirmAlert = document.getElementById("EmbeVi:ConfirmAlert");
    confirmAlert.style.display = "none";
    confirmAlert.visibility = "hidden";
  },
  //END confirm update (cancel)
  
  //START filter a element for Opera/Chrome/IE
  /**
   * Page Links Function for Opera/Chrome/IE
   *
   * @param link string - page link
   * @param baseUrl string - domain link
   *
   * @return boolean - true, if the link isn't from the same domain or is not a javascript function
   */
  possibleLink: function(link, baseUrl){
    return (link.href.indexOf(baseUrl)!==0) && (link.href.indexOf('javascript:')!==0);
  },
  //END filter a element for Opera/Chrome/IE
  
  //START links to filter
  /**
   * Filter Links Function for Opera/Chrome/IE
   *
   * @param baseUrl string - domain link
   *
   * @return array - list of links that can be videos
   */
  linksToFilter: function(baseUrl){
    var pageLinks = [];
    var allLinks = document.links;
    var b=0;
    //if(EmbeVi.displayLog(2)){GM_log('Total links on page: '+allLinks.length); }
    for (var a=0; a<allLinks.length; a=a+1) {
      if (EmbeVi.possibleLink(allLinks[a], baseUrl)){
        pageLinks[b] = allLinks[a];
        b=b+1;
      }
    }
    return pageLinks;
  },
  //START links to filter
  
  //START verify links and embed
  /**
   * Embed video from link Function
   *
   * @param browserUsed string - browser used
   *
   * Embed videos on page for all links that are videos and are supported by EmbeVi
   */
  embedVideo: function(browserUsed, acceptSpecialFunctionality) {
    //window.location.host
    var baseUrl = location.protocol+"//"+location.host;
    var currentUrl = location.href;
    
    //if(EmbeVi.displayLog(2)){ GM_log('Create pageLinks for '+browserUsed);};
    var specialSites = [
      { 'domainExpr':'elotrolado\\.net', 'siteId':0 }
    ];
    if(specialSites.length!=0 && acceptSpecialFunctionality){
      var foundSpecialSite = false;
      var specialSiteExpr;
      for(var i=0;i<specialSites.length;i=i+1){
        specialSiteExpr = new RegExp(specialSites[i].domainExpr, "gmi");
        if(!foundSpecialSite && specialSiteExpr.test(currentUrl)){
          foundSpecialSite = true;
          var specialSiteId = specialSites[i].siteId;
        }
      }
    }
    
    switch(browserUsed){
      case 'opera':
      case 'chrome':
      case 'ie':
        var pageLinks = EmbeVi.linksToFilter(baseUrl);
      break;
      case 'firefox':
        var pageLinks = Array.filter(document.links,function(link){return (link.href.indexOf(baseUrl)!==0) && (link.href.indexOf('javascript:')!==0) });
      break;
    }
    
    var paramArray = [];
    //if(EmbeVi.displayLog(1)){GM_log('Script is running on: '+baseUrl); }
    //if(EmbeVi.displayLog(1)){ GM_log('Found '+pageLinks.length+' a nodes');}
    //BEGIN we have links
    if(pageLinks.length!==0){
      //embeded video properties
      var embedVideoProperties = embedVideoSupport.embedVideoSupportProperties();
      //if(EmbeVi.displayLog(2)){ GM_log('embedVideoProperties has '+embedVideoProperties.length+' properties');}

      var currentVideoObjectParameter, currentVideoEmbed, divElement;
      var linkHref, currentRegExpr, currentReplaceExpr, regCount;
      
      //BEGIN for loop (1)
      var videoEmdededCount = 0;
      for(var i=0;i<pageLinks.length;i++){
        //link is video?
        var linkToEmbed = false;
        var linkAcceptedForEmbed = true;
        linkHref = pageLinks[i].href;
        //if(EmbeVi.displayLog(2)){ GM_log('Found href: '+linkHref);}
        
        //START test special site properties
        if(foundSpecialSite){
          switch(specialSiteId){
            /* elotrolado.net test */
            case 0:
              var fix_element = pageLinks[i];
              for (var fix=1; fix<=10; fix=fix+1) {
                if (fix_element.className == "signature" || fix_element.className == "web-icon") {
                  linkAcceptedForEmbed = false;
                }
                fix_element = fix_element.parentNode;
                if(fix_element === null){
                  break;
                }
              }
            break;
          }
        }
        //END test special site properties
        
        if(null !== embedVideoProperties && embedVideoProperties.length!==0 && linkAcceptedForEmbed){
          //BEGIN for loop (2)
          for(var j=0;j<embedVideoProperties.length;j=j+1){
            //if(EmbeVi.displayLog(2)){ GM_log('Reg exp used: '+embedVideoProperties[j].matchExpr);}
            currentRegExpr = new RegExp(embedVideoProperties[j].matchExpr, "gmi");
            if(!linkToEmbed && linkHref.match(currentRegExpr)){
              //we have a link to embed
              //if(EmbeVi.displayLog(2)){ GM_log('We have a link to embed! Id on list is '+j);}
              linkToEmbed = true;
              //increment video embeded counter
              videoEmdededCount = videoEmdededCount+1;
              rezReg = currentRegExpr.exec(linkHref);
              //set current site
              currentSite = embedVideoProperties[j];
              
              EmbeVi.setWidth(currentSite.width);
              EmbeVi.setHeight(currentSite.height);
              var currentFlashvars = '';
              var currentSrc = currentSite.src;
              
              //if(EmbeVi.displayLog(2)){ GM_log('Src is '+embedVideoProperties[j].src);}
              //we have flashvars
              if(currentSite.flashvars){
                currentFlashvars = currentSite.flashvars;
                //if(EmbeVi.displayLog(2)){ GM_log('Flashvars is '+embedVideoProperties[j].flashvars);}
                for(regCount = 1; regCount<rezReg.length; regCount=regCount+1){
                  currentReplaceExpr = new RegExp("~to_replace"+regCount+"~", "gmi");
                  currentSrc = currentSrc.replace(currentReplaceExpr, rezReg[regCount]);
                  currentFlashvars = currentFlashvars.replace(currentReplaceExpr, rezReg[regCount]);
                }
              }
              else{
                for(regCount = 1; regCount<rezReg.length; regCount=regCount+1){
                  currentReplaceExpr = new RegExp("~to_replace"+regCount+"~", "gmi");
                  currentSrc = currentSrc.replace(currentReplaceExpr, rezReg[regCount]);
                }
              }
              //if(EmbeVi.displayLog(2)){ GM_log('Final Src is '+currentSrc);}
              //if(EmbeVi.displayLog(2)){ GM_log('Final Flashvars is '+currentFlashvars);}
              
              EmbeVi.setSrc(currentSrc);
              EmbeVi.setFlashvars(currentFlashvars);
              EmbeVi.setEmbedAttr('id', 'linkVideoEmbeded'+videoEmdededCount);
              
              //start embed using object
              //create object
              var currentVideoObject = document.createElement("object");
              //create the embed element
              currentVideoEmbed = document.createElement("embed");
              //set object attributes
              for(var objectAttrName in this.objectAttr){
                currentVideoObject.setAttribute(objectAttrName,this.objectAttr[objectAttrName]);
                //if(EmbeVi.displayLog(2)){ GM_log('Set object attribute name '+objectAttrName+' to '+this.objectAttr[objectAttrName]);}
              }
              //set object param
              for(var objectParamName in this.objectParam){
                currentVideoObjectParameter = document.createElement("param");
                currentVideoObjectParameter.setAttribute('name', objectParamName);
                currentVideoObjectParameter.setAttribute('value', this.embedAttr[objectParamName]);
                currentVideoObject.appendChild(currentVideoObjectParameter);
                //if(EmbeVi.displayLog(2)){ GM_log('Set object param name '+objectParamName+' to '+this.objectParam[objectParamName]);}
              }
              //set embed attributes
              for(var embedAttrName in this.embedAttr){
                currentVideoEmbed.setAttribute(embedAttrName,this.embedAttr[embedAttrName]);
                //if(EmbeVi.displayLog(2)){ GM_log('Set embed attribute name '+embedAttrName+' to '+this.embedAttr[embedAttrName]);}
              }
              
              //create the embed container
              divElement = document.createElement('div');
              divElement.setAttribute('id', 'containerEmbeVi'+videoEmdededCount);
              divElement.setAttribute('class', 'containerEmbeVi');
              divElement.appendChild(document.createElement('br'));
              //insert div with embeded code in page
              pageLinks[i].parentNode.insertBefore(divElement, pageLinks[i]);
              divElement.appendChild(currentVideoObject);
              //divElement.appendChild(document.createElement('br'));
              currentVideoObject.appendChild(currentVideoEmbed);
              var showHideElement = document.createElement('span');
              showHideElement.setAttribute('id', 'showHide'+videoEmdededCount);
              showHideElement.setAttribute('class', 'showHide');
              showHideElement.setAttribute('onclick', 'showHide('+videoEmdededCount+')');
              showHideElement.innerHTML = "[hide video "+videoEmdededCount+"]";
              //pageLinks[i].parentNode.insertBefore(document.createElement('br'), pageLinks[i]);
              pageLinks[i].parentNode.insertBefore(showHideElement, pageLinks[i]);
              //finish embed using object
            }
          }
          //end for loop (2)
        }
        else{
          //if(EmbeVi.displayLog(2)){ GM_log('found special link, this will not be embeded! Link skipped is: '+linkHref);};
        }
      }
      //end for loop (1)
    }
    //END we have links
  },
  //END verify links and embed
  
  //START insert script
  /**
   * Insert Script Function
   *
   * @param browserUsed string - browser used
   *
   * Insert in page a javascript show/hide function
   */
  insertScript: function(browserUsed){
    var insertInto = document.getElementsByTagName('head')[0];
    if (!insertInto) {
      insertInto = document.getElementsByTagName('body')[0];
      if(!insertInto){ return; }
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if(browserUsed == "ie"){
      script.innerHTML = "function showHide(elementIndex){"
        + "  var selectedVideoContainer = document.getElementById('containerEmbeVi'+elementIndex);"
        + "  var newDisplayState = 'none';"
        + "  var newDisplayText = '[display video '+elementIndex+']';"
        + "  if(selectedVideoContainer.style.display == 'none'){"
        + "    newDisplayState = 'block';"
        + "    newDisplayText = '[hide video '+elementIndex+']';"
        + "  }"
        + "  selectedVideoContainer.style.display = newDisplayState;"
        + "  var selectedShowHide = document.getElementById('showHide'+elementIndex);"
        + "  selectedShowHide.innerHTML = newDisplayText;"
        + "};";
    }
    else{
      script.innerHTML = showHide;
    }
    insertInto.appendChild(script);
  },
  //END insert script
  
  //START insert style
  /**
   * Insert Style Function
   *
   * Insert in page a CSS for EmbeVi
   */
  insertStyle: function() {
    if (typeof GM_addStyle == "undefined") {
      GM_addStyle = function(text) {
        var head = document.getElementsByTagName("head")[0];
        if (!head) { return; }
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        style.textContent = text;
        head.appendChild(style);
      }
    };
    
    GM_addStyle("           \
      .containerEmbeVi {    \
        display:block;      \
        position:relative;  \
        z-index:990;        \
      }                     \
      .updateEmbeVi {       \
        position:absolute;  \
        z-index:992;        \
        display:block;      \
        opacity:0.9;        \
        background:#000000; \
        color:#FFFFFF;      \
        border:ridge;       \
        width:500px;        \
      }                     \
      .showHide {           \
        position:relative;  \
        width:150px;        \
        height:20px;        \
        line-height:16px;   \
        font-size:12px;     \
        background:#FFFFFF; \
        color:#000000;      \
        z-index:990;        \
        top:5px;            \
        display:block;      \
        cursor:pointer;     \
      }                     \
      .EmbeViOutput{        \
        position: absolute; \
        height: 110px;      \
        display: block;     \
        width: 500px;       \
        top: 40px;          \
        left: 20px;         \
      }                     \
      .EmbeViConfirmAlert {                           \
        border: medium ridge ;                        \
        background: #000000;                          \
        position: absolute;                           \
        left: 387px;                                  \
        top: 1163px;                                  \
        width: 500px;                                 \
        height: 150px;                                \
        display: block;                               \
        z-index: 999;                                 \
        opacity: 0.9;                                 \
        color: white;                                 \
      }"
    );
  },
  //END insert style
  
  /**
   * Set object attribute value
   *
   * @param param string - the name of the object attribute to be set
   * @param value string - the value to set the object attribute
   *
   * @return boolean - true, if the value was set
   *                 - false, if objectAttr isn't object
   */
  setObjectAttr: function(param, value){
    if (!EmbeVi.is_object(this.objectAttr)) return false;

    this.objectAttr[param] = value;
    return true;
  },
  
  /**
   * Set embed attribute value
   *
   * @param param string - the name of the embed attribute to be set
   * @param value string - the value to set the embed attribute
   *
   * @return boolean - true, if the value was set
   *                 - false, if embedAttr isn't object
   */
  setEmbedAttr: function(param, value){
    if (!EmbeVi.is_object(this.embedAttr)) return false;
    
    this.embedAttr[param] = value;
    return true;
  },
  
  /**
   * Set object param value
   *
   * @param param mixed - the name of the object param to be set
   * @param value string - the value to set the object param
   *
   * @return boolean - true, if the value was set
   *                 - false, if objectParam isn't array
   */
  setObjectParam: function(param, value){
    if (!EmbeVi.is_object(this.objectParam)) return false;
    
    this.objectParam[param] = value;
    return true;
  },
  
  /**
   * Is array function
   *
   * @param input mixed - any variable
   *
   * @return boolean - true, if variable is array
   *                 - false, if variable isn't array
   */
  is_array: function(input){
    return typeof(input) == 'object' && (input instanceof Array);
  },
  
  /**
   * Is object function
   *
   * @param input mixed - any variable
   *
   * @return boolean - true, if variable is object
   *                 - false, if variable isn't object
   */
  is_object: function(input){
    return typeof(input) == 'object';
  },
  
  /**
   * Set the width of the object and embed
   * 
   * @param width integer - width to set the object and embed
   *
   * @return boolean - true, if the value was set,
   *                 - false, if objectAttr and embedAttr aren't objects
   */
  setWidth: function(width){
    return EmbeVi.setObjectAttr('width', width) && EmbeVi.setEmbedAttr('width', width);
  },
  
  /**
   * Set the height of the object and embed
   * 
   * @param height integer - height to set the object and embed
   *
   * @return boolean - true, if the value was set,
   *                 - false, if objectAttr and embedAttr aren't objects
   */
  setHeight: function(height){
    return EmbeVi.setObjectAttr('height', height) && EmbeVi.setEmbedAttr('height', height);
  },
  
  /**
   * Set the video source of the object param and embed
   * 
   * @param src string - src to set the object param and embed
   *
   * @return boolean - true, if the value was set,
   *                 - false, if objectParam and embedAttr aren't objects
   */
  setSrc: function(src){
    return EmbeVi.setEmbedAttr('src', src) && EmbeVi.setObjectParam('movie', src);
  },
  
  /**
   * Set the video flashvars of the object param and embed
   * 
   * @param flashvars string - flashvars to set the object param and embed
   *
   * @return boolean - true, if the value was set,
   *                 - false, if objectParam and embedAttr aren't objects
   */
  setFlashvars: function(flashvars){
    return EmbeVi.setEmbedAttr('flashvars', flashvars) && EmbeVi.setObjectParam('flashvars', flashvars);
  }

};

//START show/hide function
/**
 * Show/Hide Function
 * 
 * @param elementIndex integer - element index to be displayed or not
 */
function showHide(elementIndex){
  var selectedVideoContainer = document.getElementById('containerEmbeVi'+elementIndex);
  var newDisplayState = "none";
  var newDisplayText = "[display video "+elementIndex+"]";
  if(selectedVideoContainer.style.display == "none"){
    newDisplayState = "block";
    newDisplayText = "[hide video "+elementIndex+"]";
  }
  selectedVideoContainer.style.display = newDisplayState;
  var selectedShowHide = document.getElementById('showHide'+elementIndex);
  selectedShowHide.innerHTML = newDisplayText;
};
//END show/hide function
  

/**
 * EmbeVi Support List (Array of Objects)
 * Example:
 * {
 *   'info'         => Support information (site and support type)
 *   'width'        => Default width (for object and embed tag)
 *   'height'       => Default height (for object and embed tag)
 *   'src'          => Source of the media to embed. Replace ~to_replace1~, ~to_replace2~, ... with matches from the matchExpr regular expression
 *   'matchExpr'    => Regular expression for matching url
 *   'flashvars'    => (optional) if set, will be passed in the embed tag. Replace ~to_replace1~, ~to_replace2~, ... etc with matches from the matchExpr
 * }
 */
var embedVideoSupport = {

	embedVideoSupportProperties: function() {
    var embedVideoPropertiesArray = [
      {
         'info' : 'youtube playlist',
         'width' : 530,
         'height' : 370,
         'src' : 'http://www.youtube.com/p/~to_replace1~',
         'matchExpr' : 'youtube\\.com/watch\\?v=[a-z0-9-_]+&feature=PlayList&p=([a-z0-9-_]+)'
      },
      {
         'info' : 'youtube video',
         'width' : 425,
         'height' : 344,
         'src' : 'http://www.youtube.com/v/~to_replace2~&f=videos&app=youtube_gdata',
         'matchExpr' : 'youtube\\.com/(watch\\?v=|v/|watch\\?v=[a-z0-9-_]+&feature=PlayList&p=)([a-z0-9-_]+)'
      },
      {
        'info' : '220.ro video',
        'width' : 450,
        'height' : 366,
        'src' : 'http://www.220.ro/emb/~to_replace1~',
        'matchExpr' : '220\\.ro/([a-z0-9-_]+)/'
      },
      {
        'info' : 'google video',
        'width' : 400,
        'height' : 326,
        'src' : 'http://video.google.com/googleplayer.swf?docid=~to_replace1~&hl=en&fs=true',
        'matchExpr' : 'video\\.google\\.com/videoplay\\?docid=([a-z0-9-_]+)'
      },
      {
        'info' : 'dailymotion video',
        'width' : 420,
        'height' : 399,
        'src' : 'http://www.dailymotion.com/swf/~to_replace1~',
        'matchExpr' : "dailymotion\\.com.*/video/([a-z0-9]+)_"
      },
      {
        'info' : 'trilulilu video',
        'width' : 440,
        'height' : 362,
        'src' : 'http://embed.trilulilu.ro/source/go2player.php?type=video&hash=~to_replace2~&userid=~to_replace1~&src=hi5',
        'matchExpr' : "trilulilu\\.ro/([a-z0-9-_]+)/([a-z0-9-_]+)"
      },
      {
        'info' : 'metacafe video',
        'width' : 400,
        'height' : 345,
        'src' : 'http://www.metacafe.com/fplayer/~to_replace1~/~to_replace2~.swf',
        'matchExpr' : "metacafe\\.com/watch/([a-z0-9-_]+)/([a-z0-9-_]+)"
      },
      {
        'info' : 'youtube playlist v2',
        'width' : 530,
        'height' : 370,
        'src' : 'http://www.youtube.com/p/~to_replace1~',
        'matchExpr' : "youtube\\.com/view_play_list\\?p=([a-z0-9-_]+)"
      },
      {
        'info' : 'collegehumor video',
        'width' : 480,
        'height' : 360,
        'src' : 'http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id=~to_replace1~&fullscreen=1',
        'matchExpr' : "collegehumor\\.com/video:([a-z0-9-_]+)"
      },
      {
        'info' : 'cnettv video',
        'width' : 364, 
        'height' : 280,
        'src' : 'http://www.cnet.com/av/video/flv/universalPlayer/universalSmall.swf?playerType=embedded&type=id&value=~to_replace4~',
        'matchExpr' : "cnettv\\.cnet\\.com/([a-z0-9-_]+)/([0-9]+)-([0-9_]+)-([0-9]+)"
      },
      {
        'info' : 'glumbert video',
        'width' : 448, 
        'height' : 336,
        'src' : 'http://www.glumbert.com/embed/~to_replace1~',
        'matchExpr' : "glumbert\\.com/media/([0-9a-z]+)"
      },
      {
        'info' : 'myvideo .at .de .ch .be .nl video',
        'width' : 470, 
        'height' : 406,
        'src' : 'http://www.myvideo.~to_replace1~/movie/~to_replace2~',
        'matchExpr' : 'myvideo\.(at|be|ch|de|nl)\/(?:watch|movie)\/([a-z0-9-_=]+)'
      },
      {
        'info' : 'video.yahoo.com video',
        'flashvars' : 'id=~to_replace2~&vid=~to_replace1~&lang=en-us&intl=us',
        'width' : 512,
        'height' : 322,
        'src' : 'http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf?ver=2.2.40&id=~to_replace2~&vid=~to_replace1~&lang=en-us&intl=us',
        'matchExpr' : "video\\.yahoo\\.com/watch/([0-9a-z]+)/([0-9a-z]+)"
      },
      {
        'info' : 'vids.myspace.com video',
        'width' : 425,
        'height' : 360,
        'src' : 'http://mediaservices.myspace.com/services/media/embed.aspx/m=~to_replace1~,t=1,mt=video',
        'matchExpr' : "vids\\.myspace\\.com/.*VideoID=([0-9a-z]+)"
      },
      {
        'info' : 'liveleak.com video',
        'width' : 450,
        'height' : 370,
        'src' : 'http://www.liveleak.com/e/~to_replace1~',
        'matchExpr' : "liveleak\\.com/view\\?i=([0-9a-z-_]+)"
      },
      {
        'info' : 'vimeo.com video',
        'width' : 400,
        'height' : 255,
        'src' : 'http://vimeo.com/moogaloop.swf?clip_id=~to_replace1~&server=vimeo.com&show_title=1&show_byline=1&show_portrait=0&color=&fullscreen=1',
        'matchExpr' : "vimeo\\.com/([0-9a-z-_]+)"
      },
      {
        'info' : 'gametrailers.com video',
        'width' : 480,
        'height' : 392,
        'src' : 'http://www.gametrailers.com/remote_wrap.php?mid=~to_replace2~',
        'matchExpr' : "gametrailers\\.com/(player|video.*)/([0-9a-z-_]+)"
      },
      {
        'info' : 'ustream.tv video',
        'flashvars' : 'viewcount=true&autoplay=false&brand=embed',
        'width' : 400,
        'height' : 320,
        'src' : 'http://www.ustream.tv/flash/video/~to_replace1~',
        'matchExpr' : "ustream\\.tv/recorded/([0-9a-z-_]+)"
      },
      {
        'info' : 'clipshack.com video',
        'width' : 430,
        'height' : 370,
        'src' : 'http://clipshack.com/player.swf?key=~to_replace1~',
        'matchExpr' : "clipshack\\.com/Clip\\.aspx\\?key=([0-9a-z-_]+)"
      },
      {
        'info' : 'funnyordie.com video',
        'width' : 480,
        'height' : 400,
        'src' : 'http://funnyordie.com/public/flash/fodplayer.swf?key=~to_replace1~',
        'matchExpr' : "funnyordie\\.com/videos/([0-9a-z-_]+)"
      },
      {
        'info' : 'filebox.ro video',
        'flashvars' : 'source_script=http://videoserver273.filebox.ro/get_video.php&key=~to_replace1~&autostart=0&getLink=http://fbx.ro/v/~to_replace1~&splash=http://imageserver.filebox.ro/get_splash.php?key=~to_replace1~&link=http://fbx.ro/v/~to_replace1~',
        'width' : 420,
        'height' : 315,
        'src' : 'http://www.filebox.ro/video/FileboxPlayer_provider.php',
        'matchExpr' : "filebox\\.ro/video/play_video\\.php\\?key=([0-9a-z-_]+)"
      },
      {
        'info' : 'last.fm video',
        'flashvars' : 'uniqueName=~to_replace1~&autostart=&FSSupport=false&track=false&http://userserve-ak.last.fm/serve/image:320/~to_replace1~.jpg&title=&albumArt=&duration=&creator=',
        'width' : 450,
        'height' : 373,
        'src' : 'http://cdn.last.fm/videoplayer/l/15/VideoPlayer.swf?autostart=false',
        'matchExpr' : "last\\.fm/music/.*/\\+videos/([0-9a-z-_]+)"
      },
      {
        'info' : 'youku.com video',
        'width' : 480,
        'height' : 400,
        'src' : 'http://player.youku.com/player.php/sid/~to_replace1~/v.swf',
        'matchExpr' : "youku\\.com/v_show/id_([0-9a-z-_=]+)\\.html"
      },
      {
        'info' : 'ishare.rediff.com video',
        'flashvars' : 'videoURL=http://ishare.rediff.com/embedcodeplayer_config_REST.php?content_id=~to_replace1~&x=3',
        'width' : 400,
        'height' : 322,
        'src' : 'http://ishare.rediff.com/images/player_ad_20090416.swf',
        'matchExpr' : "ishare\\.rediff\\.com/video/.*/([0-9a-z-_=]+)"
      },
      {
        'info' : 'vision.rambler.ru video',
        'width' : 390,
        'height' : 370,
        'src' : 'http://vision.rambler.ru/i/e.swf?id=~to_replace1~/~to_replace2~/~to_replace3~&logo=1',
        'matchExpr' : "vision\\.rambler\\.ru/users/([0-9a-z-_=]+)/([0-9a-z-_=]+)/([0-9a-z-_=]+)"
      },
      {
        'info' : 'tudou.com video',
        'width' : 400,
        'height' : 340,
        'src' : 'http://www.tudou.com/v/~to_replace2~',
        'matchExpr' : "tudou\\.com/(programs/view|v)/([0-9a-z-_=]+)"
      },
      {
        'info' : 'ku6.com video',
        'width' : 414,
        'height' : 305,
        'src' : 'http://player.ku6.com/refer/~to_replace1~/v.swf',
        'matchExpr' : "ku6\\.com/.*show.*/([0-9a-z-_=]+)\\.html"
      },
      {
        'info' : 'tinypic.com video',
        'width' : 440,
        'height' : 420,
        'src' : 'http://v5.tinypic.com/player.swf?file=~to_replace1~&s=~to_replace2~',
        'matchExpr' : "tinypic\\.com/player.php\\?v=([0-9a-z-_]+)&s=([0-9]+)"
      },
      {
        'info' : 'video.libero.it video',
        'width' : 440,
        'height' : 420,
        'src' : 'http://video.libero.it/static/swf/eltvplayer.swf?id=~to_replace1~.flv&ap=0',
        'matchExpr' : "video\\.libero\\.it/app/play\\?id=([0-9a-z-_]+)"
      },
      {
        'info' : 'espn.go.com video',
        'width' : 440,
        'height' : 361,
        'src' : 'http://espn.go.com/broadband/player.swf?mediaId=~to_replace1~',
        'matchExpr' : "espn\\.go\\.com/video/clip\\?id=([0-9a-z-_]+)"
      },
      {
        'info' : 'nfl.com video',
        'flashvars' : 'autoplay=0&contentId=~to_replace2~&channelId=~to_replace1~',
        'width' : 768,
        'height' : 432,
        'src' : 'http://static.nfl.com/static/site/flash/video/video-detail-player.swf',
        'matchExpr' : "nfl\\.com/videos/([0-9a-z-_]+)/([0-9a-z-_]+)"
      },
      {
        'info' : 'video.web.de video',
        'width' : 470,
        'height' : 406,
        'src' : 'http://video.web.de/movie/~to_replace1~',
        'matchExpr' : "video\\.web\\.de/watch/([0-9a-z-_]+)"
      },
      {
        'info' : 'video.eksenim.mynet.com video',
        'flashvars' : 'videolist=http://video.eksenim.mynet.com/batch/video_xml_embed.php?video_id=~to_replace1~&adxml=&autoplay=0',
        'width' : 400,
        'height' : 344,
        'src' : 'http://video.eksenim.mynet.com/flvplayers/vplayer17.swf',
        'matchExpr' : "video\\.eksenim\\.mynet\\.com/[0-9a-z-_\\.]+/[0-9a-z-_]+/([0-9]+)"
      },
      {
        'info' : 'rutube.ru video',
        'width' : 470,
        'height' : 353,
        'src' : 'http://video.rutube.ru/~to_replace1~',
        'matchExpr' : "rutube\\.ru/tracks/[0-9+]+\\.html\\?.*&?v=([0-9a-z-_=]+)"
      },
      {
        'info' : 'livevideo.com video',
        'width' : 445,
        'height' : 369,
        'src' : 'http://www.livevideo.com/flvplayer/embed/~to_replace2~&autoStart=0',
        'matchExpr' : "livevideo\\.com/video(.*|.{0})/([0-9a-z]+)/.*\\.aspx"
      },
      {
        'info' : 'vbox7.com video',
        'width' : 450,
        'height' : 403,
        'src' : 'http://i48.vbox7.com/player/ext.swf?vid=~to_replace1~',
        'matchExpr' : "vbox7\\.com/play:([0-9a-z-_=]+)"
      },
      {
        'info' : 'revver.com video',
        'width' : 480,
        'height' : 392,
        'src' : 'http://flash.revver.com/player/1.0/player.swf?mediaId=~to_replace1~',
        'matchExpr' : "revver\\.com/video/([0-9a-z-_=]+)"
      },
      {
        'info' : 'current.com video',
        'width' : 400,
        'height' : 286,
        'src' : 'http://current.com/e/~to_replace1~/en_US',
        'matchExpr' : "current\\.com/items/([0-9a-z-=]+)_"
      },
      {
        'info' : 'dalealplay.com video',
        'width' : 464,
        'height' : 380,
        'src' : 'http://www.dalealplay.com/smarty/dap/embedplayer.swf?file=~to_replace1~/busadoraWisinYandel.flv&videoValoracion=0.00&autoStart=false',
        'matchExpr' : "dalealplay\\.com/informaciondecontenido\\.php\\?con=([0-9a-z-_=]+)"
      },
      {
        'info' : 'clipfish.de video',
        'width' : 450,
        'height' : 390,
        'src' : 'http://www.clipfish.de/videoplayer.swf?as=0&vid=~to_replace1~&r=1',
        'matchExpr' : "clipfish\\.de.*/video/([0-9a-z-_=]+)/"
      },
      {
        'info' : 'clip.vn video',
        'width' : 450,
        'height' : 390,
        'src' : 'http://clip.vn/w/~to_replace1~',
        'matchExpr' : "clip\\.vn/watch/[0-9a-z-_=]+,([0-9a-z-_=]+)"
      },
      {
        'info' : 'livestream.com video',
        'width' : 400,
        'height' : 400,
        'src' : 'http://static.livestream.com/grid/PlayerV2.swf?channel=~to_replace1~&layout=playerEmbedDefault&backgroundColor=0xffffff&backgroundAlpha=1&backgroundGradientStrength=0&chromeColor=0x000000&headerBarGlossEnabled=true&controlBarGlossEnabled=true&chatInputGlossEnabled=false&uiWhite=true&uiAlpha=0.5&uiSelectedAlpha=1&dropShadowEnabled=true&dropShadowHorizontalDistance=10&dropShadowVerticalDistance=10&paddingLeft=10&paddingRight=10&paddingTop=10&paddingBottom=10&cornerRadius=10&backToDirectoryURL=null&showViewers=true&embedEnabled=true&chatEnabled=true&onDemandEnabled=true&programGuideEnabled=false&fullScreenEnabled=true&reportAbuseEnabled=false&gridEnabled=false&initialIsOn=true&initialIsMute=false&initialVolume=10&contentId=null&initThumbUrl=null&playeraspectwidth=4&playeraspectheight=3&mogulusLogoEnabled=true',
        'matchExpr' : "livestream\\.com/([0-9a-z-_=]+)"
      },
      {
        'info' : 'tangle.com video',
        'flashvars' : 'viewkey=~to_replace2~',
        'width' : 330,
        'height' : 270,
        'src' : 'http://www.tangle.com/flash/swf/flvplayer.swf',
        'matchExpr' : "tangle\\.com/view_video(\\.php|.*)\\?viewkey=([0-9a-z-_=]+)"
      },
      {
        'info' : 'vidiac.com video',
        'width' : 400,
        'height' : 350,
        'src' : 'http://www.vidiac.com/vidiac.swf?video=~to_replace1~&servicecfg=386',
        'matchExpr' : "vidiac\\.com/video/([0-9a-z-_=]+)\\.htm"
      },
      {
        'info' : '5min.com video',
        'width' : 480,
        'height' : 401,
        'src' : 'http://www.5min.com/Embeded/~to_replace1~/',
        'matchExpr' : "5min\\.com/Video/.*-([0-9]+)"
      },
      {
        'info' : 'video.vol.at video',
        'width' : 480,
        'height' : 388,
        'src' : 'http://video.vol.at/media_tp/custom/flowplayer/swf/FlowPlayerDark.swf?config={embedded:true,baseURL:\'http://video.vol.at/media_tp/custom/flowplayer/swf\',loop:false,playList:[{suggestedClipsInfoUrl:\'http://video.vol.at/suggestions.php?id=~to_replace1~\',url:\'http://video.vol.at/media/video_at/~to_replace1~.flv\'}],initialScale:\'scale\',controlBarBackgroundColor:\'0x000000\',autoBuffering:true,autoPlay:false}',
        'matchExpr' : "video\\.vol\\.at/video/([0-9a-z-_=]+)"
      },
      {
        'info' : 'wegame.com video',
        'flashvars' : 'xmlrequest=http://www.wegame.com/player/video/~to_replace1~&embedPlayer=true',
        'width' : 480,
        'height' : 387,
        'src' : 'http://www.wegame.com/static/flash/player.swf?xmlrequest=http://www.wegame.com//player/video/~to_replace0~',
        'matchExpr' : "wegame\\.com/watch/([0-9a-z-_=]+)"
      },
      {
        'info' : 'ikbis.com video',
        'width' : 425,
        'height' : 344,
        'src' : 'http://ikbis.com/swf/embded_flv.swf?video_id=~to_replace1~&fullscreenmode=false&file=http://ikbis.com/playlist_feed/~to_replace1~&image=http://shots.ikbis.com/video_thumbnail/~to_replace1~/screen/video.jpg&autostart=false&overstretch=fit&ply_color=undefined',
        'matchExpr' : "ikbis\\.com/[0-9a-z-_=]+/shot/([0-9a-z-_=]+)"
      },
      {
        'info' : 'youmaker.com video',
        'flashvars' : 'file=http://www.youmaker.com/video/v?id=~to_replace1~%26nu%3Dnu&showdigits=true&overstretch=fit&autostart=false&rotatetime=12&linkfromdisplay=false&repeat=list&shuffle=false&&showfsbutton=false&fsreturnpage=&fullscreenpage=',
        'width' : 450,
        'height' : 358,
        'src' : 'http://www.youmaker.com/v.swf',
        'matchExpr' : "youmaker\\.com/video/sv\\?id=([0-9a-z-_]+)"
      },
      {
        'info' : 'snotr.com video',
        'flashvars' : 'video=~to_replace1~&autoload=false&autoplay=false&startat=0',
        'width' : 520,
        'height' : 390,
        'src' : 'http://www.snotr.com/player.swf?v6',
        'matchExpr' : "snotr\\.com/video/([0-9a-z-_]+)"
      },
      {
        'info' : 'onetruemedia.com video',
        'flashvars' : '&p=~to_replace2~&skin_id=&host=http://www.onetruemedia.com',
        'width' : 408,
        'height' : 382,
        'src' : 'http://www.onetruemedia.com/share_view_player?p=~to_replace2~',
        'matchExpr' : "onetruemedia\\.com/(shared|otm_site/view_shared)\\?p=([0-9a-z-_]+)"
      },
      {
        'info' : 'clevver.com video',
        'width' : 428,
        'height' : 380,
        'src' : 'http://i.clevver.com/flash/clvembed.swf?vid=~to_replace2~',
        'matchExpr' : "clevver.com(/.*|.?)/videof/([0-9a-z-_]+)"
      },
      {
        'info' : 'kewego.com video',
        'flashvars' : 'playerKey=061ca722fea8&skinKey=&language_code=en&stat=internal&autoStart=false&sig=~to_replace1~',
        'width' : 400,
        'height' : 300,
        'src' : 'http://sa.kewego.com/swf/p3/epix.swf',
        'matchExpr' : "kewego\\.com/video/([0-9a-z-_]+)\\.html"
      },
      {
        'info' : 'clipser.com video',
        'width' : 425,
        'height' : 355,
        'src' : 'http://www.clipser.com/Play?vid=~to_replace1~',
        'matchExpr' : "clipser\\.com/watch_video/([0-9a-z-_]+)"
      },
      {
        'info' : 'dailyhaha.com video',
        'width' : 425,
        'height' : 350,
        'src' : 'http://www.dailyhaha.com/_vids/Whohah.swf?Vid=~to_replace1~.flv',
        'matchExpr' : "dailyhaha\\.com/_vids/([0-9a-z-_]+)\\.htm"
      },
      {
        'info' : 'howcast.com video',
        'width' : 432,
        'height' : 276,
        'src' : 'http://www.howcast.com/flash/howcast_player.swf?file=~to_replace1~&theme=black',
        'matchExpr' : "howcast\\.com/videos/([0-9]+)"
      },
      {
        'info' : 'aniboom.com video',
        'width' : 594,
        'height' : 334,
        'src' : 'http://api.aniboom.com/e/~to_replace1~',
        'matchExpr' : "aniboom\\.com/animation-video/([0-9]+)"
      },
      {
        'info' : 'bragster.com video',
        'flashvars' : 'autoPlay=false&brag_id=~to_replace1~',
        'width' : 420,
        'height' : 315,
        'src' : 'http://www.bragster.com/flash/bragster_player_embed.swf',
        'matchExpr' : "bragster\\.com/brags/([0-9]+)-"
      },
      {
        'info' : 'teachertube.com video',
        'flashvars' : 'file=http://www.teachertube.com/embedFLV.php?pg=video_~to_replace1~&menu=false&frontcolor=ffffff&lightcolor=FF0000&logo=http://www.teachertube.com/www3/images/greylogo.swf&skin=http://www.teachertube.com/embed/overlay.swf&volume=80&controlbar=over&displayclick=link&viral.link=http://www.teachertube.com/viewVideo.php?video_id=~to_replace1~&stretching=exactfit&plugins=viral-1&viral.callout=none&viral.onpause=false',
        'width' : 470,
        'height' : 260,
        'src' : 'http://www.teachertube.com/embed/player.swf',
        'matchExpr' : "teachertube\\.com/viewVideo\\.php\\?video_id=([0-9]+)"
      },
      {
        'info' : 'shredordie.com video',
        'flashvars' : 'key=~to_replace1~&vert=shredordie',
        'width' : 480,
        'height' : 400,
        'src' : 'http://player.ordienetworks.com/flash/fodplayer.swf',
        'matchExpr' : "shredordie\\.com/videos/([0-9a-z-_]+)"
      },
      {
        'info' : 'talentrun.com video',
        'flashvars' : 'autostart=false&id=~to_replace1~&mode=splay&extUrl=http://www.talentrun.com/',
        'width' : 454,
        'height' : 421,
        'src' : 'http://www.talentrun.com/player/trp/',
        'matchExpr' : "talentrun\\.com/player/index/([0-9a-z-_]+)"
      },
      {
        'info' : 'autsch.de video',
        'flashvars' : 'pk=~to_replace1~&displayheight=338&autostart=false',
        'width' : 450,
        'height' : 370,
        'src' : 'http://www.autsch.de/playerext/~to_replace1~',
        'matchExpr' : "autsch\\.de/([0-9a-z-_]+)"
      },
      {
        'info' : 'tvbvideo.de video',
        'flashvars' : 'playerKey=a67dd9fb6a97&skinKey=&language_code=de&stat=internal&advertise=false&autoStart=false&sig=~to_replace1~',
        'width' : 400,
        'height' : 300,
        'src' : 'http://sa.kewego.com/swf/p3/epix.swf',
        'matchExpr' : "tvbvideo\\.de/video/([0-9a-z-_]+)\\.html"
      },
      {
        'info' : 'clipmoon.com video',
        'flashvars' : 'config=http://www.clipmoon.com/flvplayer.php?viewkey=~to_replace1~&external=no',
        'width' : 500,
        'height' : 357,
        'src' : 'http://www.clipmoon.com/flvplayer.swf',
        'matchExpr' : "clipmoon\\.com/videos/([0-9a-z-_]+)"
      },
      {
        'info' : 'viddyou.com video',
        'width' : 640,
        'height' : 480,
        'src' : 'http://www.viddyou.com/get/v2_full/~to_replace1~.swf',
        'matchExpr' : "viddyou\\.com/viddstream\\?videoid=([0-9a-z-_]+)"
      },
      {
        'info' : 'spymac.com video',
        'width' : 468,
        'height' : 308,
        'src' : 'http://www.spymac.com/hop?id=~to_replace1~',
        'matchExpr' : "spymac\\.com/details/\\?([0-9a-z-_]+)"
      },
      {
        'info' : 'youare.tv video',
        'width' : 350,
        'height' : 300,
        'src' : 'http://www.youare.tv/yatvplayer.swf?videoID=~to_replace1~&serverDomain=youare.tv',
        'matchExpr' : "youare\\.tv/watch\\.php\\?id=([0-9a-z-_]+)"
      },
      {
        'info' : 'mindbites.com video',
        'width' : 554,
        'height' : 316,
        'src' : 'http://www.mindbites.com/v/~to_replace1~',
        'matchExpr' : "mindbites\\.com/lesson/([0-9a-z_]+)-"
      },
      {
        'info' : 'jujunation.com video',
        'flashvars' : 'config=http://www.jujunation.com/videoConfigXmlCode.php?pg=video_~to_replace1~_no_0_extsite&autoPlay=false',
        'width' : 450,
        'height' : 370,
        'src' : 'http://www.jujunation.com/flvplayer_elite.swf',
        'matchExpr' : "jujunation\\.com/viewVideo\\.php\\?video_id=([0-9a-z-_]+)"
      },
      {
        'info' : 'rooftopcomedy.com video',
        'flashvars' : 'baseURL=http://www.rooftopcomedy.com&clipCode=~to_replace1~',
        'width' : 448,
        'height' : 292,
        'src' : 'http://www.rooftopcomedy.com/flash/fmpv3/RooftopPlayerEmbedded.swf',
        'matchExpr' : "rooftopcomedy\\.com/watch/([0-9a-z-_]+)"
      },
      {
        'info' : 'hamburg1video.de video',
        'flashvars' : 'playerKey=acd17bc8b8f7&skinKey=&language_code=de&stat=internal&advertise=false&autoStart=false&sig=~to_replace1~',
        'width' : 400,
        'height' : 300,
        'src' : 'http://sa.kewego.com/swf/p3/epix.swf',
        'matchExpr' : "hamburg1video\\.de/video/([0-9a-z-_]+)\\.html"
      },
      {
        'info' : 'caught-on-video.com video',
        'flashvars' : 'video=~to_replace1~',
        'width' : 428,
        'height' : 352,
        'src' : 'http://videos.caught-on-video.com/vidiac.swf',
        'matchExpr' : "videos\\.caught-on-video\\.com/.*/[0-9]+/([0-9a-z-_]+)\\.htm"
      },
      {
        'info' : 'bubblare.se video',
        'width' : 425,
        'height' : 350,
        'src' : 'http://bubblare.se/v/~to_replace1~/',
        'matchExpr' : "bubblare\\.se/movie/([0-9a-z-_]+)"
      },
      {
        'info' : 'jaycut.com video',
        'flashvars' : 'file=http://jaycut.com/videos/send_preview/~to_replace1~&type=flv&returnUrl=http://jaycut.com/&locale=en&author=Toffan&autostart=false&mixerUrl=http://jaycut.com/mixer&inviteFriendsUrl=http://jaycut.com/myjaycut/friends/invite&createGroupUrl=http://jaycut.com/group/create&image=http://jaycut.com/video/~to_replace1~/thumbnail_big.jpeg&profileUrl=',
        'width' : 408,
        'height' : 324,
        'src' : 'http://jaycut.com/flash/preview.swf',
        'matchExpr' : "jaycut\\.com/video/([0-9a-z-_]+)"
      },
      {
        'info' : 'jaycut.com video v2',
        'flashvars' : 'file=http://jaycut.com/mixes/send_preview/~to_replace1~&type=flv&returnUrl=http://jaycut.com/&locale=en&author=Toffan&autostart=false&mixerUrl=http://jaycut.com/mixer&inviteFriendsUrl=http://jaycut.com/myjaycut/friends/invite&createGroupUrl=http://jaycut.com/group/create&image=http://jaycut.com/video/~to_replace1~/thumbnail_big.jpeg&profileUrl=',
        'width' : 408,
        'height' : 324,
        'src' : 'http://jaycut.com/flash/preview.swf',
        'matchExpr' : "jaycut\\.com/mix/([0-9a-z-_]+)"
      },
      {
        'info' : 'spotn.de video',
        'flashvars' : 'config=http://www.spotn.de/flvplayer.php?viewkey=~to_replace1~',
        'width' : 450,
        'height' : 370,
        'src' : 'http://www.spotn.de/videoplayer.swf',
        'matchExpr' : "spotn\\.de/watch/([0-9a-z-_]+)"
      },
      {
        'info' : 'thexvid.com video',
        'width' : 600,
        'height' : 369,
        'src' : 'http://www.thexvid.com/plr/~to_replace1~/video.swf',
        'matchExpr' : "thexvid\\.com/video/([0-9a-z-_]+)-"
      },
      {
        'info' : 'scivee.tv video',
        'flashvars' : 'id=~to_replace1~&type=4',
        'width' : 480,
        'height' : 400,
        'src' : 'http://www.scivee.tv/flash/embedCast.swf',
        'matchExpr' : "scivee\\.tv/node/([0-9a-z-_]+)"
      },
      {
        'info' : 'tvosz.com video',
        'width' : 470,
        'height' : 380,
        'src' : 'http://www.tvosz.com/gtembed.swf?key=~to_replace1~',
        'matchExpr' : "tvosz\\.com/view_video\\.php\\?viewkey=([0-9a-z-_]+)"
      },
      {
        'info' : 'dailycomedy.com video',
        'width' : 320,
        'height' : 240,
        'src' : 'http://www.dailycomedy.com/videos/DCVideoPlayerII_HTTP.swf?videoid=~to_replace1~',
        'matchExpr' : "dailycomedy\\.com/videos/([0-9a-z-_]+)"
      },
      {
        'info' : 'deutschlandreporter.de video',
        'width' : 480,
        'height' : 360,
        'src' : 'http://www.deutschlandreporter.de/flvplayer.swf?mediaid=~to_replace1~&hosturl=http://www.deutschlandreporter.de/&themecolor=0x99B3CC&symbolcolor=0x000000&backgroundcolor=0xFFFFFF&autostart=false&loop=false&overlay=http://www.deutschlandreporter.de//media/custom/player_emb.png',
        'matchExpr' : "deutschlandreporter\\.de/videos/([0-9a-z-_]+)"
      },
      {
        'info' : 'motorsportmad.com video',
        'width' : 320,
        'height' : 260,
        'src' : 'http://www.motorsportmad.com/flvplayer.swf?file=http://media.motorsportmad.net.s3.amazonaws.com/~to_replace1~.flv&showfsbutton=true',
        'matchExpr' : "motorsportmad\\.com/view/([0-9a-z-_]+)"
      },
      {
        'info' : 'rheinvideo.de video',
        'flashvars' : 'apiHost=apiwww.rheinvideo.de',
        'width' : 425,
        'height' : 350,
        'src' : 'http://www.rheinvideo.de/pl/~to_replace1~/425x350/swf',
        'matchExpr' : "rheinvideo\\.de/videos/([0-9a-z-_]+)"
      },
      {
        'info' : 'selfcasttv.com video',
        'width' : 340,
        'height' : 283,
        'src' : 'http://www.selfcasttv.com/Selfcast/selfcast.swf?video_1=/~to_replace1~',
        'matchExpr' : "selfcasttv\\.com/Selfcast/playVideo\\.do\\?ref=([0-9a-z-_/]+)"
      },
      {
        'info' : 'myubo.sk video',
        'width' : 470,
        'height' : 386,
        'src' : 'http://myubo.com/storage/cms/flashPlayer/player.swf?movieURL=http://www.myubo.sk/videa/1/VideoDisk/Media/~to_replace1~/~to_replace2~/flv_~to_replace1~~to_replace2~~to_replace3~~to_replace4~~to_replace5~~to_replace6~~to_replace7~.flv',
        'matchExpr' : "myubo\\.sk/page/media_detail\\.html\\?movieid=([0-9a-z]{2})([0-9a-z]{2})([0-9a-z]+)-([0-9a-z]+)-([0-9a-z]+)-([0-9a-z]+)-([0-9a-z]+)"
      },
      {
        'info' : 'gettyload.de video',
        'width' : 425,
        'height' : 350,
        'src' : 'http://www.gettyload.de/flashplayer/video_embed.swf?xmlFile=~to_replace1~',
        'matchExpr' : "gettyload\\.de/video/[a-z0-9-_]+/([0-9a-z]+)"
      },
      {
        'info' : 'cliphost24.com video',
        'flashvars' : 'config=http://www.cliphost24.com/share/~to_replace1~/',
        'width' : 400,
        'height' : 320,
        'src' : 'http://www.cliphost24.com/flashplayer',
        'matchExpr' : "cliphost24\\.com/videoclip-([0-9a-z]+)\\.html"
      },
      {
        'info' : 'uvuvideo.org video',
        'flashvars' : 'affiliateSiteId=~to_replace2~&widgetId=110617&width=510&height=419&revision=12&kaShare=1&mediaType_mediaID=video_~to_replace1~&autoPlay=0',
        'width' : 510,
        'height' : 419,
        'src' : 'http://serve.a-widget.com/service/getWidgetSwf.kickAction',
        'matchExpr' : "ka\\.uvuvideo\\.org/[0-9a-z-_]+/video/([0-9a-z]+)/([0-9a-z]+)\\.html"
      },
      {
        'info' : 'crovideos.com video',
        'flashvars' : '&file=http://www.crovideos.com/flvideo/~to_replace1~.flv&height=260&width=320&frontcolor=0xCCCCCC&backcolor=0x6666FF&lightcolor=0xEEEEEE&logo=http://www.crovideos.com/crovideos-logo-player.png',
        'width' : 320,
        'height' : 260,
        'src' : 'http://www.crovideos.com/player.swf?file=http://www.crovideos.com/flvideo/~to_replace1~.flv&height=260&width=320&frontcolor=0xCCCCCC&backcolor=0x6666FF&lightcolor=0xEEEEEE&logo=http://www.crovideos.com/crovideos-logo-player.png',
        'matchExpr' : "crovideos\\.com/video/([0-9a-z]+)"
      },
      {
        'info' : 'qubetv.tv video',
        'flashvars' : 'file=/videos/~to_replace1~/~to_replace1~.flv&autostart=false',
        'width' : 320,
        'height' : 240,
        'src' : 'http://www.qubetv.tv/swf/flvplayer.swf',
        'matchExpr' : "qubetv\\.tv/videos/detail/([0-9a-z]+)"
      },
      {
        'info' : 'citytube.de video',
        'width' : 450,
        'height' : 390,
        'src' : 'http://stream.city-tube.de/player.swf?m=~to_replace2~',
        'matchExpr' : "citytube\\.de/(\\?m=|tube/movie/)([0-9a-z]+)"
      },
      {
        'info' : 'constantcomedy.com video',
        'width' : 430,
        'height' : 360,
        'src' : 'http://constantcomedy.com/swfs/embedPlayer.swf?ccVideo=~to_replace1~',
        'matchExpr' : "constantcomedy\\.com/Video\\.aspx\\?id=([0-9a-z]+)"
      },
      {
        'info' : 'luegmol.ch video',
        'flashvars' : 'config=http://www.luegmol.ch/player/luegmol_player_config_ext.php?vkey=~to_replace1~',
        'width' : 500,
        'height' : 395,
        'src' : 'http://www.luegmol.ch/player/luegmol_player.swf',
        'matchExpr' : "luegmol\\.ch/video/([0-9a-z]+)"
      },
      {
        'info' : 'mantoutv.com video',
        'flashvars' : 'config=http://www.mantoutv.com/flvplayer.php?viewkey=~to_replace1~',
        'width' : 450,
        'height' : 370,
        'src' : 'http://www.mantoutv.com/videoplayer.swf',
        'matchExpr' : "mantoutv\\.com/videoview_([0-9a-z]+)\\.html"
      },
      {
        'info' : 'clonevideos.com video',
        'width' : 450,
        'height' : 375,
        'src' : 'http://www.clonevideos.com/videowatchproplayer.swf?file=http://www.clonevideos.com/vdata/~to_replace1~.flv&vid=~to_replace1~&baseurl=http://www.clonevideos.com/&e=y',
        'matchExpr' : "clonevideos\\.com/videos/([0-9a-z]+)"
      },
      {
        'info' : 'realitatea.net video',
        'width' : 480,
        'height' : 380,
        'src' : 'http://www.realitatea.net/images/player/playlist_player.swf?url=1&id=~to_replace1~&autostart=false&showdigits=true&bufferlength=10&allowscriptaccess=always&recommendations=http://www.realitatea.net/feed_recommendations.php?id=~to_replace1~',
        'matchExpr' : "realitatea\\.net/video_([0-9a-z]+)_"
      },
      {
        'info' : 'mtv.com video',
        'flashvars' : 'configParams=id=~to_replace2~&vid=~to_replace0~&uri=mgid:uma:video:mtv.com:~to_replace1~&startUri=(startUri)',
        'width' : 512,
        'height' : 319,
        'src' : 'http://media.mtvnservices.com/mgid:uma:video:mtv.com:~to_replace1~',
        'matchExpr' : "mtv\\.com/videos/.*/([0-9a-z]+)/.*#id=([0-9a-z]+)"
      },
      {
        'info' : 'mtv.com video v2',
        'flashvars' : 'configParams=vid=~to_replace1~',
        'width' : 512,
        'height' : 319,
        'src' : 'http://media.mtvnservices.com/mgid:uma:video:mtv.com:~to_replace1~',
        'matchExpr' : "mtv\\.com/videos/.*/([0-9]+)/"
      },
      {
        'info' : 'rocktube.us video',
        'width' : 450,
        'height' : 366,
        'src' : 'http://www.rocktube.us/embedded/~to_replace1~',
        'matchExpr' : "rocktube\\.us/([0-9a-z]+)"
      },
      {
        'info' : 'myplay.com video',
        'flashvars' : 'videoId=~to_replace1~&playerId=271548504&viewerSecureGatewayURL=https://console.brightcove.com/services/amfgateway&servicesURL=http://services.brightcove.com/services&cdnURL=http://admin.brightcove.com&domain=embed&autoStart=false&',
        'width' : 425,
        'height' : 344,
        'src' : 'http://c.brightcove.com/services/viewer/federated_f8/271548504',
        'matchExpr' : "myplay\\.com/video-player/[0-9a-z-_]+/\\?bcpid=[0-9a-z-_]+&bclid=[0-9a-z-_]+&bctid=([0-9a-z-_]+)"
      },
      {
        'info' : '123video.com video',
        'width' : 420,
        'height' : 339,
        'src' : 'http://www.123video.nl/123video_share.swf?mediaSrc=~to_replace2~',
        'matchExpr' : '123video\\.nl/(playvideos\\.asp\\?MovieID|123video_share\\.swf\\?mediaSrc)=([0-9a-z-_]+)'
      },
      {
        'info' : '9You.com video',
        'width' : 960,
        'height' : 480,
        'src' : 'http://v.9you.com/fplayer/player_watch.swf?flvID=~to_replace1~',
        'matchExpr' : '9you\\.com/watch/([0-9a-z-_]+)'
      },
      {
        'info' : 'blastro.com video',
        'width' : 512,
        'height' : 408,
        'src' : 'http://images.blastro.com/images/flashplayer/flvPlayer.swf?site=www.blastro.com&filename=~to_replace1~&pageID=&soundLevel=100&embed=&user_ID=-1&playlistMode=ondemand&playlist_id=&adsource=&channel=&keywords=&vid_pos=&artist_name=&quality=700&content_provider=&player_mode=&player_size=&autoplay=false&shuffle=&preroll_provider=&overlay_provider=&endcap_provider=&paidContent=&syndicated_pos=&getVars=detect_mediatype%3Dflv;detect_bitrate%3D_700;big%3D1;&redirect=http://www.blastro.com/player/~to_replace1~.html?detect_mediatype=flv&detect_bitrate=_700&big=1',
        'matchExpr' : 'blastro\\.com/player/([a-z0-9-_]+)',
      },
      {
        'info' : 'cellfish.com video',
        'width' : 420,
        'height' : 315,
        'src' : 'http://static.cellfish.com/static/swf/player8.swf',
        'matchExpr' : 'cellfish\\.com/(video|ringtone|multimedia)/([a-z0-9-_]+)',
        'flashvars' : 'Id=~to_replace2~&autoplay=false&widget=true&mediaPage=true&domain=cellfish.com&showProfileName=true'
      },
      {
        'info' : 'clarin.com videos',
        'width' : 533,
        'height' : 438,
        'src' : 'http://www.clarin.com/shared/v9/swf/clarinvideos/player.swf',
        'matchExpr' : 'videos\\.clarin\\.com/index\\.html\\?id=([a-z0-9-_]+)',
        'flashvars' : 'SEARCH=http://www.videos.clarin.com/decoder/buscador_getMtmYRelacionados/~to_replace1~|CLARIN_VIDEOS|VIDEO|EMBEDDED|10|1|10|null.xml&RUTAS=http://www.clarin.com/shared/v9/swf/clarinvideos/rutas.xml&autoplay=false'
      },
      {
        'info' : 'ClipJunkie.com video',
        'width' : 495,
        'height' : 370,
        'src' : 'http://www.clipjunkie.com/flvplayer/flvplayer.swf',
        'matchExpr' : 'clipjunkie\\.com/([a-z0-9-_]+)\\.htm',
        'flashvars' : 'config=http://www.clipjunkie.com/skin/config.xml&playList=http://www.clipjunkie.com/playlist.php&themes=http://www.clipjunkie.com/flvplayer/themes.xml&flv=http://videos.clipjunkie.com/videos/~to_replace1~.flv&autoplay=false'
      },
      {
        'info' : 'cliplife.jp video',
        'width' : 320,
        'height' : 264,
        'src' : 'http://player.cliplife.jp/player_external_03.swf?clipinfo=http%3A%2F%2Fstream.cliplife.jp%2Fclipinfo%2Fclipinfo_03.php%3Fcontent_id%3D~to_replace1~',
        'matchExpr' : 'cliplife\\.jp/clip/\\?content_id=([a-z0-9-_]+)',
      },
      {
        'info' : 'TheDailyShow video',
        'width' : 480,
        'height' : 383,
        'src' : 'http://media.mtvnservices.com/mgid:cms:video:comedycentral.com:~to_replace1~',
        'matchExpr' : 'thedailyshow\\.com/.*\\.jhtml\\?videoId=([a-z0-9-_]+)',
        'flashvars' : 'autoPlay=false&endCapAutoPlay=false&nextvideo=off&loop=false'
      },
      {
        'info' : 'ComedyCentral video',
        'width' : 480,
        'height' : 383,
        'src' : 'http://media.mtvnservices.com/mgid:cms:video:comedycentral.com:~to_replace2~',
        'matchExpr' : 'comedycentral\\.com/.*\\.jhtml\\?(videoId|episodeId)=([a-z0-9-_]+)',
        'flashvars' : 'autoPlay=false&endCapAutoPlay=false&nextvideo=off&loop=false'
      },
      {
        'info' : 'colbertnation.com video',
        'width' : 480,
        'height' : 383,
        'src' : 'http://media.mtvnservices.com/mgid:cms:item:comedycentral.com:~to_replace1~',
        'matchExpr' : 'colbertnation\\.com/.*/([0-9]+)',
        'flashvars' : 'autoPlay=false&endCapAutoPlay=false&nextvideo=off&loop=false'
      },
      {
        'info' : 'crunchyroll.com video',
        'width' : 624,
        'height' : 328,
        'src' : 'http://static.crunchyroll.com/flash/20090921112226.d65e2ddb80363cc34004bd6214de692b/StandardVideoPlayer.swf',
        'matchExpr' : 'crunchyroll\\.com/.*(media-|\\?mediaid=|\\?videoid=)([0-9]+)',
        'flashvars' : 'config_url=http%3A%2F%2Fwww.crunchyroll.com%2Fxml%2F%3Freq%3DRpcApiVideoPlayer_GetStandardConfig%26media_id%3D~to_replace2~%26auto_play%3D0'
      },
      {
        'info' : 'dotsub.com video',
        'width' : 420,
        'height' : 347,
        'src' : 'http://dotsub.com/static/players/portalplayer.swf',
        'matchExpr' : 'dotsub\\.com/(media|view)/((?:(?:[0-9a-z]+)-?){5})',
        'flashvars' : 'uuid=~to_replace2~&lang=eng&type=video&plugins=dotsub&embedded=true'
      },
      {
        'info' : 'divshare.com video',
        'width' : 425,
        'height' : 319,
        'src' : 'http://www.divshare.com/flash/video2?myId=~to_replace1~',
        'matchExpr' : 'divshare\\.com/download/([a-z0-9-_]+)'
      },
      {
        'info' : 'fandome.com video',
        'width' : 400,
        'height' : 400,
        'src' : 'http://www.kaltura.com/index.php/kwidget/wid/_35168/uiconf_id/1002330',
        'matchExpr' : 'fandome\\.com/video/([a-z0-9-_]+)',
        'flashvars' : 'entryId=http://s3.amazonaws.com/lazyjock/~to_replace1~.flv&autoplay=false&volume=100&stretching=exactfit'
      },
      {
        'info' : 'g4tv.com video',
        'width' : 611,
        'height' : 341,
        'src' : 'http://www.g4tv.com/lv3/~to_replace2~',
        'matchExpr' : 'g4tv\\.com/(xplay|videos|lv3|sv3)/([a-z0-9-_]+)',
        'flashvars' : 'phoenixBase=http%3A//g4tv.com/&colorTheme=0xff9933%2C0x492b0e%2C0xff620e%2C0xffc46f&videokey=~to_replace2~&image=&playerName=videodetail&autoplay=n&leftBarButtons=hidden&rightBarButtons=link%2Ccode%2Cdim&hdContent=false&showSDHD=false&sideBarsOverlap=false&endVideoCallback=VideoPlayer.playNextVideo&showContinuousPlay=false'
      },
      {
        'info' : 'gamespot.com video',
        'width' : 480,
        'height' : 310,
        'src' : 'http://image.com.com/gamespot/images/cne_flash/production/media_player/proteus/gs/proteus2_gs.swf',
        'matchExpr' : 'gamespot\\.com/.*video/([a-z0-9-_]+)',
        'flashvars' : 'playerMode=in_page&movieAspect=16.9&allowFullScreen=1&showOptions=1&menu_mode=&cs_id=3002244&flavor=480Version&skin=http://image.com.com/gamespot/images/cne_flash/production/media_player/proteus/one/skins/gamespot.png&autoPlay=false&embeddingAllowed=true&paramsURI=http%3A%2F%2Fwww.gamespot.com%2Fpages%2Fvideo_player%2Fxml.php%3Fid%3D~to_replace1~%26pid%3D972793%26ads%3Dnone%26ad_freq%3D0%26ontology%3D36%26ptype%3D6475%26mode%3Din_page%26width%3D480%26height%3D310'
      },
      {
        'info' : 'gametube.com video',
        'width' : 451,
        'height' : 372,
        'src' : 'http://www.gametube.org/miniPlayer.swf?vidId=~to_replace2~',
        'matchExpr' : 'gametube\\.org/.*(\#/video/|htmlVideo\\.jsp\\?id=|miniPlayer\\.swf\\?vidId=)([/a-z0-9-_=]+)',
      },
      {
        'info' : 'gloria.tv video',
        'width' : 494,
        'height' : 400,
        'src' : 'http://www.gloria.tv/?media=~to_replace1~&amp;embed',
        'matchExpr' : 'gloria\\.tv/\\?media=([a-z0-9-_=]+)'
      },
      {
        'info' : 'gotgame.com video',
        'width' : 600,
        'height' : 418,
        'src' : 'http://video.gotgame.com/public/flash/flash_gordon.swf?vid=~to_replace1~',
        'matchExpr' : 'video\\.gotgame\\.com/index\\.php/video/view/([a-z0-9-_=]+)'
      },
      {
        'title' : 'guzer.com video',
        'width' : 486,
        'height' : 382,
        'src' : 'http://www.guzer.com/player/4-4player-licensed.swf',
        'matchExpr' : 'guzer\\.com/videos/(.*)\\.php',
        'flashvars' : '&file=http://www.guzer.com/videos/~to_replace1~.flv&image=http://www.guzer.com/videos/s~to_replace1~.jpg&stretching=exactfit'
      },
      {
        'info' : 'izlesene.com video',
        'width' : 465,
        'height' : 355,
        'src' : 'http://www.izlesene.com/player2.swf?video=~to_replace2~',
        'matchExpr' : 'izlesene\\.com/(player2\\.swf\\?video=|video/(?:[a-z0-9-_]+)?/)([a-z0-9-_=]+)'
      },
      {
        'info' : 'joost.com video',
        'width' : 640,
        'height' : 360,
        'src' : 'http://www.joost.com/embed/~to_replace1~',
        'matchExpr' : 'joost\\.com/([a-z0-9-_=]+)'
      },
      {
        'info' : 'justin.tv video',
        'width' : 400,
        'height' : 300,
        'src' : 'http://www.justin.tv/widgets/live_embed_player.swf',
        'matchExpr' : 'justin\\.tv/([a-z0-9-_=]+)',
        'flashvars' : 'channel=~to_replace1~&auto_play=false&start_volume=50'
      },
      {
        'info' : 'koreus.com video',
        'width' : 400,
        'height' : 320,
        'src' : 'http://www.koreus.com/video/~to_replace1~',
        'matchExpr' : 'koreus.com/video/([a-z0-9-_=]+)\\.html'
      },
      {
        'info' : 'machinima.com video',
        'width' : 450,
        'height' : 300,
        'src' : 'http://www.machinima.com/flv_player_master/player/waPlayer.swf?VideoID=~to_replace1~&Style=&PlaylistID=&path=http://www.machinima.com/flv_player_master&playerID=0&ra=',
        'matchExpr' : 'machinima\\.com(?::80)?/(?:film/view(?:&|&amp;)id=|#details_)([a-z0-9-_=]+)'
      },
      {
        'info' : 'msnbc.msn.com video',
        'width' : 425,
        'height' : 339,
        'matchExpr' : 'msnbc\\.msn\\.com/id/[a-z0-9-_=]+/vp/((?:[a-z0-9-_=]+#)?([a-z0-9-_=]+))',
        'src' : 'http://msnbcmedia.msn.com/i/MSNBC/Components/Video/_Player/swfs/embedPlayer/ey073009.swf?domain=www.msnbc.msn.com&settings=22425448&useProxy=true&wbDomain=www.msnbc.msn.com&launch=~to_replace2~&sw=1280&sh=800&EID=oVPEFC&playerid=22425001',
      },
      {
        'info' : 'video.mail.ru video',
        'width' : 585,
        'height' : 387,
        'src' : 'http://img.mail.ru/r/video2/player_v2.swf?ver=8&par=http://content.video.mail.ru/mail/~to_replace1~/~to_replace2~/$~to_replace3~$0$',
        'matchExpr' : 'video\\.mail\\.ru/mail/([a-z0-9-_=]+)/([a-z0-9-_=]+)/([a-z0-9-_=]+)\\.html'
      },
      {
        'info' : 'madnessvideo.net video',
        'width' : 400,
        'height' : 320,
        'src' : 'http://www.madnessvideo.net/emb.aspx/~to_replace2~',
        'matchExpr' : 'madnessvideo\\.net/((?:videos.aspx/)?(video~.*))'
      },
      {
        'info' : 'video.milliyet.com.tr video',
        'width' : 340,
        'height' : 325,
        'src' : 'http://video.milliyet.com.tr/m.swf?prm=~to_replace1~,~to_replace2~&kanal=~to_replace3~&id=~to_replace4~&tarih=~to_replace5~&get=~to_replace6~',
        'matchExpr' : 'video\\.milliyet\\.com\\.tr/default\\.asp\\?prm=([0-9]+),([0-9]+)&kanal=([0-9]+)&id=([0-9]+)&tarih=([0-9/]+)&get=([0-9\\.]+)',
        'flashvars' : '&id=~to_replace4~&tarih=~to_replace5~'
      },
      {
        'info' : 'mofile.com video',
        'width' : 500,
        'height' : 370,
        'src' : 'http://tv.mofile.com/cn/xplayer.swf?v=~to_replace1~',
        'matchExpr' : 'mofile\\.com/(?:show/)?([a-z0-9-_=]+)',
        'flashvars' : 'v=~to_replace1~&fadshow=0&fadshowtime=8000&fadurl=http://v.mofile.com/v.mofile.com/swf/xbsg_500x358.swf&c=1&b=2&p=&autoplay=0&vTitle=&vtid=6&qDomain=tv.mofile.com&ad=0&ipregion=unknown&ipcity=unknown'
      },
      {
        'info' : 'video.mpora.com video',
        'width' : 480,
        'height' : 315,
        'src' : 'http://video.mpora.com/ep/~to_replace1~/',
        'matchExpr' : 'video\\.mpora\\.com/watch/([a-z0-9-_=]+)'
      },
      {
        'info' : 'seehaha.com video',
        'width' : '480',
        'height' : '400',
        'src' : 'http://www.seehaha.com/flash/player.swf?vidFileName=~to_replace1~.flv',
        'matchExpr' : 'seehaha\\.com/flash/player\\.swf\\?vidFileName=([a-z0-9-_=]+)\\.flv'
      },
      {
        'info' : 'video.mthai.com video',
        'width' : 407,
        'height' : 342,
        'src' : 'http://video.mthai.com/Flash_player/player.swf?idMovie=~to_replace1~',
        'matchExpr' : 'video\\.mthai\\.com/player\\.php\\?.*id=([0-9a-z]+)',
      },
      {
        'info' : 'onsmash.com video',
        'width' : 448,
        'height' : 374,
        'src' : 'http://videos.onsmash.com/e/~to_replace1~',
        'matchExpr' : 'videos\\.onsmash\\.com/(?:v|e)/([a-z0-9-_=]+)',
        'flashvars' : 'autoplay=0'
      },
      {
        'info' : 'playlist.com playlist',
        'width' : 506,
        'height' : 300,
        'src' : 'http://static.pplaylist.com/players/mp3player_new_v103.swf',
        'matchExpr' : 'playlist\\.com/playlist/([0-9]+)',
        'flashvars' : 'baseurl=http://www.playlist.com&config=site_noautostart&sopath=ppl-103&loginjs=false&autologin=never&getCode=gigya&movie=http://static.pplaylist.com/players/mp3player_new_v103.swf&enablejs=false&javascriptid=playerTop&playlist_id=~to_replace1~&apibaseurl=http://www.playlist.com/api&domain_pre_xspf=http://pl.playlist.com/pl.php?e=1%26playlist=&tracking=true&bgcolor=#ffffff&myheight=300&mywidth=506&wid=si&loc=playlist_audio&getcode=&promo=&meebo=false&userid=&debug=false',
      },
      {
        'info' : 'rawvegas.tv video',
        'width' : 427,
        'height' : 300,
        'src' : 'http://www.rawvegas.tv/ext.php?uniqueVidID=~to_replace1~',
        'matchExpr' : 'rawvegas\\.tv/watch/[a-z0-9-_]*/([a-z0-9-_=]+)',
        'flashvars' : 'uniqueVidID=~to_replace1~'
      },
      {
        'info' : 'screentoaster.com video',
        'width' : 425,
        'height' : 344,
        'src' : 'http://www.screentoaster.com/swf/STPlayer.swf',
        'matchExpr' : 'screentoaster\\.com/watch/([a-z0-9]+)',
        'flashvars' : 'video=~to_replace1~',
      },
      {
        'info' : 'sevenload.com .en .de .tr .fr .es .it .nl .pl .ru .uk .in .cn .jp .kr .sg .au .se .co .mx .ph .my .id video',
        'width' : 500,
        'height' : 408,
        'src' : 'http://static.sevenload.com/swf/player/player.swf?v=143',
        'matchExpr' : 'sevenload\\.com/(?:videos?|videolar|filmy)/([a-z0-9]{1,7})',
        'flashvars' : 'configPath=http://flash.sevenload.com/player?itemId=~to_replace1~&portalId=&screenlink=0&autoplay=0&environment=sevenload&autoPlayNext=0&locale=en_US'
      },
      {
        'info' : 'sevenload.com .en .de .tr .fr .es .it .nl .pl .ru .uk .in .cn .jp .kr .sg .au .se .co .mx .ph .my .id shows',
        'width' : 500,
        'height' : 408,
        'src' : 'http://sevenload.com/pl/~to_replace1~/500x408/swf',
        'matchExpr' : 'sevenload\\.com/.*(?:episodes|folgen|puntate)/([a-z0-9]{1,7})',
        'flashvars' : 'configPath=http://flash.sevenload.com/player?itemId=~to_replace1~&portalId=&screenlink=0&autoplay=0&environment=sevenload&autoPlayNext=0&locale=en_US'
      },
      {
        'info' : 'shareview.us video',
        'width' : 540,
        'height' : 380,
        'src' : 'http://www.shareview.us/nvembed.swf?key=~to_replace1~',
        'matchExpr' : 'shareview\\.us/(?:video/|nvembed\\.swf\\?key=)([a-z0-9-_=]+)/'
      },
      {
        'info' : 'smotri.com video',
        'width' : 400,
        'height' : 330,
        'src' : 'http://pics.smotri.com/scrubber_custom8.swf?file=~to_replace1~&bufferTime=3&autoStart=false&str_lang=eng&xmlsource=http%3A%2F%2Fpics.smotri.com%2Fcskins%2Fblue%2Fskin_color_lightaqua.xml&xmldatasource=http%3A%2F%2Fpics.smotri.com%2Fskin_ng.xml',
        'matchExpr' : 'smotri\\.com/video/view/\\?id=([a-z0-9-_=]+)',
      },
      {
        'info' : 'southparkstudios.com video clip',
        'width' : 480,
        'height' : 400,
        'src' : 'http://media.mtvnservices.com/mgid:cms:item:southparkstudios.com:~to_replace1~',
        'matchExpr' : 'southparkstudios\\.com/clips/([0-9]+)',
        'flashvars' : 'autoPlay=false&configParams=location%3Dhomepage&soWmode=window&soTargetDivId=video_player_box'
      },
      {
        'info' : 'spike.com video',
        'width' : 640,
        'height' : 480,
        'src' : 'http://www.spike.com/efp',
        'matchExpr' : 'spike\\.com/(?:video/(?:[0-9a-z_-]+/)?|efp\\?flvbaseclip=)([0-9]+)',
        'flashvars' : 'flvbaseclip=~to_replace1~'
      },
      {
        'info' : 'cbssports.com video',
        'width' : 500,
        'height' : 380,
        'src' : 'http://www.cbs.com/thunder/swf30can10cbssports/rcpHolderCbs-3-4x3.swf?releaseURL=http://release.theplatform.com/content.select?pid=~to_replace1~&amp;Tracking=true&amp;Embedded=True&autoPlayVid=false',
        'matchExpr' : 'cbssports\\.com/video/player/(?:play|embed)/[a-z0-9-_]+/([0-9a-z_-]+)'
      },
      {
        'info' : 'tagtele.com video',
        'width' : 425,
        'height' : 350,
        'src' : 'http://www.tagtele.com/v/~to_replace1~',
        'matchExpr' : 'tagtele\\.com/(?:v|videos/voir)/([0-9]+)'
      },
      {
        'info' : 'tm-tube.com video',
        'width' : 480,
        'height' : 360,
        'src' : 'http://www.tm-tube.com/flvplayer.swf?mediaid=~to_replace1~&hosturl=http://www.tm-tube.com/&themecolor=0x696969&symbolcolor=0xb22222&backgroundcolor=0x000000&autostart=false&loop=false',
        'matchExpr' : 'tm-tube\\.com/video/([0-9]+)',
      },
      {
        'info' : 'trtube.com video',
        'width' : 425,
        'height' : 350,
        'src' : 'http://www.trtube.com/mediaplayer_3_15.swf?file=http://www.trtube.com/playlist.php?v=~to_replace1~&image=http://www.trtube.com/vi/~to_replace1~.gif&logo=http://www.trimg.com/img/logoembed.gif&linkfromdisplay=false&linktarget=_blank&autostart=false',
        'matchExpr' : 'trtube\\.com/(?:izle\\.php\\?v=|[a-z0-9-_]+-)([a-z0-9]+)(\\.html)?'
      },
      {
        'info' : 'videolog.uol.com.br video',
        'width' : 424,
        'height' : 318,
        'src' : 'http://www.videolog.tv/ajax/codigoPlayer.php?id_video=~to_replace1~&relacionados=S&default=S&lang=PT_BR&cor_fundo=000000&swf=1&width=424&height=318',
        'matchExpr' : 'videolog\\.uol\\.com\\.br/video(?:\\?|\\.php\\?id=)([0-9]+)',
      },
      {
        'info' : 'u-tube.ru video',
        'width' : 400,
        'height' : 300,
        'src' : 'http://www.u-tube.ru/upload/others/flvplayer.swf?file=http://www.u-tube.ru/playlist.php?id=~to_replace1~&width=400&height=300',
        'matchExpr' : 'u-tube\\.ru/(?:playlist\\.php\\?id=|pages/video/)([0-9]+)',
      },
      {
        'info' : 'videos.sapo.pt video',
        'width' : 410,
        'height' : 281,
        'src' : 'http://rd3.videos.sapo.pt/play?file=http://rd3.videos.sapo.pt/~to_replace1~/mov/1',
        'matchExpr' : 'videos\\.sapo\\.pt/([0-9a-z]{20})',
      },
      {
        'info' : 'videonuz.com video',
        'width' : 468,
        'height' : 379,
        'src' : 'http://videonuz.ensonhaber.com/mediaplayer2.swf?settings=http://videonuz.ensonhaber.com/player2.config.php?vid=~to_replace1~',
        'matchExpr' : 'videonuz\\.ensonhaber\\.com/(?:medyaizle\\.php\\?haber_id=|haber-|.*?)([0-9]+)'
      },
      {
        'info' : 'vidmax.com video',
        'width' : 475,
        'height' : 356,
        'src' : 'http://vidmax.com/player.swf',
        'matchExpr' : 'vidmax\\.com/(?:index\\.php/)?videos?/(?:view/)?([0-9]+)',
        'flashvars' : '&file=http://www.vidmax.com/media/video/~to_replace1~.mp4&streamer=lighttpd&autostart=false&stretching=fill'
      },
      {
        'info' : 'vsocial.com video V1',
        'width' : 400,
        'height' : 330,
        'src' : 'http://static.vsocial.com/flash/upsl3.0.2/ups3.0.2.swf?d=~to_replace1~&a=0&s=false&url=http://www.vsocial.com/xml/upsl/vsocial/template.php',
        'matchExpr' : 'vsocial\\.com/(?:video/|flash/ups\\.swf)\\?d=([0-9]+)'
      },
      {
        'info' : 'vsocial.com video V2',
        'width' : 410,
        'height' : 400,
        'src' : 'http://www.vsocial.com/ups/~to_replace1~',
        'matchExpr' : 'vsocial\\.com/(?:ups|pdk)/([0-9a-z]+)'
      },
      {
        'info' : 'goear.com audio',
        'width' : 353,
        'height' : 132,
        'src' : 'http://www.goear.com/files/external.swf?file=~to_replace2~',
        'matchExpr' : 'goear\\.com/listen(\\.php\\?v=|/)([a-z0-9-_=]+)'
      },
      {
        'info' : 'ijigg.com audio',
        'width' : 315,
        'height' : 80,
        'src' : 'http://www.ijigg.com/jiggPlayer.swf?songID=~to_replace2~&Autoplay=0',
        'matchExpr' : 'ijigg\\.com/(jiggPlayer\\.swf\\?songID=|songs/|trackback/)([a-z0-9-_=]+)'
      },
      {
        'info' : 'jamendo.com audio',
        'width' : 200,
        'height' : 300,
        'src' : 'http://widgets.jamendo.com/en/~to_replace1~/?playertype=2008&~to_replace1~_id=~to_replace2~',
        'matchExpr' : 'jamendo\\.com/.*(playlist|track|album)/([a-z0-9-_=]+)'
      },
      {
        'info' : 'jujunation.com audio',
        'width' : 220,
        'height' : 66,
        'src' : 'http://www.jujunation.com/player.swf?configXmlPath=http://www.jujunation.com/musicConfigXmlCode.php?pg=music_~to_replace1~&playListXmlPath=http://www.jujunation.com/musicPlaylistXmlCode.php?pg=music_~to_replace1~',
        'matchExpr' : 'jujunation.com/music\\.php\\?music_id=([a-z0-9-_=]+)'
      },
      {
        'info' : 'last.fm audio',
        'width' : 300,
        'height' : 211,
        'matchExpr' : 'last\\.fm/music/([a-z0-9-_=\\+%]+)/_/([a-z0-9-_=\\+]+)',
        'src' : 'http://cdn.last.fm/webclient/s12n/s/53/lfmPlayer.swf',
        'flashvars' : 'lang=en&amp;lfmMode=playlist&amp;FOD=true&amp;resname=~to_replace2~&amp;restype=track&amp;artist=~to_replace1~',
      },
      {
        'info' : 'nhaccuatui.com audio',
        'width' : 300,
        'height' : 270,
        'src' : 'http://www.nhaccuatui.com/m/~to_replace1~',
        'matchExpr' : 'nhaccuatui\\.com/(?:nghe\\?M=|m/)([a-z0-9-_=]+)',
      }
    ];
		return embedVideoPropertiesArray;
	}
  
};
  
EmbeVi.init();