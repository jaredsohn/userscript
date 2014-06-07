// ==UserScript==
// @name           KinoX.to MirrorList
// @description    Download videos from sockshare.com and putlocker.com without leaving kinox.to
// @namespace      http://userscripts.org/scripts/source/162921.user.js
// @version        2.1.1
// @author         Frissdiegurke
// @copyright      2013+, Frissdiegurke
// @icon           data:image/png;base64,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
// @updateURL      http://userscripts.org/scripts/source/162921.meta.js
// @include        http://kinox.to/*
// @include        http://www.kinox.to/*
// @match          http://kinox.to/*
// @match          http://www.kinox.to/*
// @include        http://movreel.com/*
// @include        http://www.movreel.com/*
// @match          http://movreel.com/*
// @match          http://www.movreel.com/*
// @include        http://hostingbulk.com/*
// @include        http://www.hostingbulk.com/*
// @match          http://hostingbulk.com/*
// @match          http://www.hostingbulk.com/*
// @require        http://code.jquery.com/jquery-2.0.0.min.js
// ==/UserScript==

/*
 * VERSION-CHANGES
 *  -> fixed 400-Error by +, etc. in url by encodeURIComponent
 *  -> added support for TB, GB, KB, B in addition to MB
 *  -> new layout (sepreated container)
 *  -> include/match pages movreel and hostingbulk to gain possibility to open link with other 'hoster'-header in request (otherwise no permissions)
 *  -> no async requests any more
 *  -> no click-triggering, instead direct requests for url to kinox.to
 *  -> settings-panel added
 *  -> settings implemented (mostly)
 *  -> added possibility to backup/restore settings
 *  -> added possibility to generate new list when new episode gets selected
 *  -> added series position-saving and -loading
 *  -> added alert on last episode
 *  -> functionality expanded by more links to control script
 *  -> episode-buttons copied into MirrorList-Container
 *  -> hide quickDLs if just movie, no series
 *  -> no classes attribute, instead status-level
 *  -> link-colorization by $status$
 *  -> if sockshare and putlocker activate captcha: mark all online-streams with status
 *  -> surrounded code by function (own scope => better code)
 *  -> re-implemented automatic downloads (check 1st matched file all matching mirrors, then 2nd matched file...)
 *  -> some minor fixes
 * 
 * TODO
 *  *  http://wiki.greasespot.net/@grant
 *  *  add quick-downloads (1 episode, 3 episodes, complete season); Settings: quickDownloads, quickEpisodesAtOnce, quickDownloadDelay, quickStopRules
 *  *  show skipped mirror amount
 *  *  add possibility to search for keywords within filenames and list them; Settings: ratings
 *  *  add possibility to stop on first link of $status$ >= x; Settings: stopAtStateAboveEq
 *  *  add possibility to hide $status$ <= x links completely; Settings: hideBelowOrEqualState
 *  *  add possibility to sort by availability of download-links
 *  *  replace sort-checkboxes by text-input; implement sort-system (lower: descending, upper: ascending) default: "za23(s23)(s14)xi"
 *       size: s
 *       available: a[1234]{1,4}\(THEN\)\(ELSE\)
 *       statusMin: i
 *       statusMax: x
 *       status[1234]{1,4}
 *  *  limit time of each mirror, hoster and full duration; Settings: breakAfterTimeMirror, breakAfterTimeHoster, stopAfterTime
 * 
 * FEATURES TO ADD
 *  *  imdb.com description of movie/series; Settings: addImdb
 * 
 * SUPPORTED HOSTER
 *  -> Putlocker.com
 *  -> Sockshare.com
 *  -> FileNuke.com
 *       http://kinox.to/Stream/Elementary-1.html 1 7   no direct link to online-stream
 *       http://kinox.to/Stream/Marvels_The_Avengers-1.html max-filesize 2GB as Free-User
 *       has to be 2nd link, because http://kinox.to/Stream/Flashpoint-Das_Spezialkommando.html 1 1  size differs from download-size
 *  -> HostingBulk.com
 *       mp4 no possibility to check whether file exists
 *  -> MovReel.com
 *       max parallel downloads limit (says homepage, not seen yet): 1
 *       http://kinox.to/Stream/Person_of_Interest-2.html 2 18   no online-stream
 *  -> PrimeShare.tv
 *       http://kinox.to/Stream/Elementary-1.html 1 8   not implemented yet
 * 
 * HOSTER NOT SUPPORTED YET (going to support them in future)
 *  -> StreamCloud.eu + direct link + download                http://kinox.to/Stream/Elementary-1.html 1 8
 *  -> XvidStage.com + download                               http://kinox.to/Stream/Elementary-1.html 1 8
 *  -> VidStream.in + direct link + fullscreen-player         http://kinox.to/Stream/Elementary-1.html 1 8
 *  -> UploadC.com + direct link + download                   http://kinox.to/Stream/Elementary-1.html 1 7
 * 
 * PREDEFINED LINK RATINGS (case-insensitive)
 *  4 1080P?|1920|FULL[\._\s-]?HD|ULTRA[\._\s-]?HD
 *  3 BD[\._\s-]?RIP|720P?|1280|HD[\._\s-]?READY
 *  2 LD[\._\s-]?RIP|DVD[\._\s-]?RIP
 *  1 \d{3}P|HD[\._\s-]?TV|HD
 *  0 WP|WORK[\._\s-]?PRINT|(DVD[\._\s-]?)?SCREENER|(DVD[\._\s-]?)?SCR|([A-Z]*[\._\s-]?)?RIP
 * -1 CAM|TS|TELESYNC|TC|TELECINE
 * -2 Limit (to be fixed by captcha, etc. without router-restart)
 * -3 Limit (to be fixed by router-restart)
 * -4 Limit (just for premium-members)
 */

if (!Array.prototype.indexOf)
  Array.prototype.indexOf = function(obj, start){
    for(var i = (start || 0), j = this.length; i < j; i++)
      if(this[i] === obj)
        return i;
    return -1;
  }

var mirrorList = (function(){
  
/*================================================================================================*/
/*======================================= GLOBAL VARIABLES =======================================*/
/*================================================================================================*/
  
  const version = '2.1.1';
  
  const dataSaveName = "KinoX_to_MirrorList_settings";
  
  const urlIdRegex = [/^(http:\/\/)?(www\.)?kinox.to\/Stream\//, // kinox.to
                      /^(http:\/\/)?(www\.)?movreel.com\//,      // movreel.com
                      /^(http:\/\/)?(www\.)?hostingbulk.com\//]; // hostingbulk.com
  
  const fileLinkInfo = [[/var file_link = '(http:\/\/.[^"]+)';/, "#download_box"],                               // movreel.com
                        [/'file': '(http:\/\/(?:[^']+))',/,      "#main>.portlet>.portlet-content>center>div"]]; // hostingbulk.com
  
  const ddRegex = /\?([^\/]+&)?directdownload=1(&[^\/]+)?$/;
  
  const linkForm = "<form id=\"downloadForm\" style=\"margin: 100px 0;\" target=\"downloadContainer\">"
                 + "  <span id=\"downloadMessage\" style=\"font-size: 20pt;\">The download will start promptly.</span><br />"
                 + "  <i style=\"font-size: 12pt; padding-left: 60pt;\">Your (KinoX.to MirrorList)-Userscript</i>"
                 + "</form>"
                 + "<iframe id=\"downloadContainer\" style=\"display: none;\" name=downloadContainer></iframe>";
  
  const failText = "Sorry, download link broken.";
  
  const sizeRegex = [[4,  /<strong>\(\s(\d+(?:\.\d+)?)\s(TB|GB|MB|KB|B)\s\)<\/strong>/i],
                     [5,  /<strong>\(\s(\d+(?:\.\d+)?)\s(TB|GB|MB|KB|B)\s\)<\/strong>/i],
                     [34, /<\/span> (\d+(?:\.\d+)?) (TB|GB|MB|KB|B)<\/div>/i],
                     [36, /<td>(\d+(?:\.\d+)?)\s(TB|GB|MB|KB|B)\s<small>/i],
                     [39, /<\/font>\s\((\d+(?:\.\d+)?)\s(TB|GB|MB|KB|B)\)<\/font>/i],
                     [45, /<strong>\((\d+(?:\.\d+)?)\s(TB|GB|MB|KB|B)\)<\/strong>/i]];
  
  const hosterNames = [[4,  "Putlocker.com"],
                       [5,  "SockShare.com"],
                       [34, "FileNuke.com"],
                       [36, "HostingBulk.com"],
                       [39, "MovReel.com"],
                       [45, "PrimeShare.tv"]];
  
  var style = [], tableRowHoverBGColor = [];
  var styleHideKinoxContainer = "#AjaxStream, .MirrorModule { display: none !important; }";
  var styleAll =
      "  .mirrorTable                     { width: 100%; text-align: center; margin-top: 2px; }"
      +" .cZDescription                   { width: 20px;                                      }"
      +" .mirrorTable td                  { border-radius: 10px;                              }"
      +" .cZState-1,.cZState-2,.cZState-3 { text-decoration: line-through;                    }"
      +" .mirrorSize                      { font-family: monospace;                           }"
      +" #mirrorTable                     { margin: 0 10px;                                   }"
      +" #mirrorTable a:hover             { font-weight: bold;                                }"
      +" #cZContainerCtrl a               { margin: 0 20px;                                   }"
      +" #mirrorCaptcha                   { text-align: center; margin-top: 10px;             }"
      +" #cZSettingsForm input[type=text] { width: 100%;                                      }";
  
  style[0] = // Dark
    "  .mirrorSize                { color: rgb(204, 204, 174);            }"
    +" #mirrorTable,#cZSettings b { color: rgb(202, 202, 101);            }"
    +" #mirrorTable a             { color: rgb(185, 185, 131);            }"
    +" #mirrorTable a:hover       { color: rgb(221, 221, 151);            }"
    +" #cZContainerCtrl a         { color: rgb(243, 243, 151);            }"
    +" #mirrorCaptcha             { color: rgb(224, 116, 116);            }"
    +" #cZContainerCtrl a:hover   { color: rgb(245, 255,   0);            }"
    +" .cZState-3                 { color: rgb(128,  50,  31) !important; }"
    +" .cZState-2                 { color: rgb(146, 108,  99) !important; }"
    +" .cZState-1                 { color: rgb(156, 134, 101) !important; }"
    +" .cZState1                  { color: rgb(132, 192,  52) !important; }"
    +" .cZState2                  { color: rgb( 75, 187,  53) !important; }"
    +" .cZState3                  { color: rgb(  0, 255,   0) !important; }";
  tableRowHoverBGColor[0] = "rgb(43, 43, 32)";
  style[1] = // Girly
    "  .mirrorSize                { color: rgb(179,  45, 147);            }"
    +" #mirrorTable,#cZSettings b { color: rgb(150,  29, 121);            }"
    +" #mirrorTable a             { color: rgb(255,   0, 194);            }"
    +" #mirrorTable a:hover       { color: rgb(200,   0, 160);            }"
    +" #cZContainerCtrl a         { color: rgb(255, 210, 255);            }"
    +" #mirrorCaptcha             { color: rgb(112,   0, 255);            }"
    +" #cZContainerCtrl a:hover   { color: rgb(255, 255, 255);            }"
    +" .cZState-3                 { color: rgb(206, 191, 202) !important; }"
    +" .cZState-2                 { color: rgb(228, 130, 204) !important; }"
    +" .cZState-1                 { color: rgb(230,  83, 194) !important; }"
    +" .cZState1                  { color: rgb( 60, 187,  49) !important; }"
    +" .cZState2                  { color: rgb( 10, 133,   0) !important; }"
    +" .cZState3                  { color: rgb(  7,  82,   0) !important; }";
  tableRowHoverBGColor[1] = "rgb(255, 186, 227)";
  style[2] = // Default
    "  .mirrorSize                { color: rgb( 50, 157, 255);            }"
    +" #mirrorTable,#cZSettings b { color: rgb( 57, 136, 209);            }"
    +" #mirrorTable a             { color: rgb(  0,  92, 255);            }"
    +" #mirrorTable a:hover       { color: rgb(  0,  67, 187);            }"
    +" #cZContainerCtrl a         { color: rgb(186, 230, 255);            }"
    +" #mirrorCaptcha             { color: rgb(184,   0,   0);            }"
    +" #cZContainerCtrl a:hover   { color: rgb(216, 241, 255);            }"
    +" .cZState-3                 { color: rgb(191, 192, 206) !important; }"
    +" .cZState-2                 { color: rgb(127, 139, 226) !important; }"
    +" .cZState-1                 { color: rgb( 87, 126, 226) !important; }"
    +" .cZState1                  { color: rgb( 20, 176, 206) !important; }"
    +" .cZState2                  { color: rgb(  0, 180, 115) !important; }"
    +" .cZState3                  { color: rgb( 32, 202,   0) !important; }";
  tableRowHoverBGColor[2] = "rgb(190, 216, 255)";
  style[3] = // Saw
    "  .mirrorSize                { color: rgb(187, 187, 187);            }"
    +" #mirrorTable,#cZSettings b { color: rgb(133,  95,  95);            }"
    +" #mirrorTable a             { color: rgb(162, 162, 162);            }"
    +" #mirrorTable a:hover       { color: rgb(197, 197, 197);            }"
    +" #cZContainerCtrl a         { color: rgb(218, 218, 218);            }"
    +" #mirrorCaptcha             { color: rgb(182, 100, 100);            }"
    +" #cZContainerCtrl a:hover   { color: rgb(172, 172, 172);            }"
    +" .cZState-3                 { color: rgb(119,  21,  21) !important; }"
    +" .cZState-2                 { color: rgb(124,  56,  56) !important; }"
    +" .cZState-1                 { color: rgb(126,  91,  91) !important; }"
    +" .cZState1                  { color: rgb(144, 167, 115) !important; }"
    +" .cZState2                  { color: rgb( 92, 148,  81) !important; }"
    +" .cZState3                  { color: rgb( 29, 172,  29) !important; }";
  tableRowHoverBGColor[3] = "rgb(48, 42, 42)";
  
/*========================================= INITIALIZING =========================================*/
  
  function identifyUrl(){
    var url = location.href;
    for(var i = 0; i < urlIdRegex.length; i ++){
      var regex = urlIdRegex[i];
      if(regex.exec(url)){
        return i;
      }
    }
  }
  
  $(document).ready(function(){
    var urlId = identifyUrl();
    if(urlId > 0)
      hosterInit(urlId);
    else {
      removeKinoxADs();
      if(/\/Stream\//.exec(location.href)){
        settingsInit();
        kinoxInit();
      }
    }
  });
  
  function testResponse(x){
    if(!x && $("#downloadContainer").contents().length == 0 || x.status == 404)
      $("#downloadMessage").html(failText);
  }
  
  function hosterInit(urlId){
    if(ddRegex.exec(location.href)){
      var urlInfo = fileLinkInfo[urlId-1];
      var url = urlInfo[0].exec($("body").text());
      if(url && url.length > 1){
        $.ajax({url: url[1], type: "HEAD", complete: testResponse});
        $(urlInfo[1]).eq(0).before(linkForm);
        $("#downloadContainer").load(function(){ testResponse(false); });
        $("#downloadForm").attr("action", url[1]).submit();
      }
    }
  }
  
  // used by process
  var styleTheme, list, mixedList, listCreated, isSeries, startup, working, interrupt, kinoxRel, seriesId, kinoxtoContainer, settingsForm, settings, hideBackupDiv,
      linkCounter, hosterNum, hosterActiveLink, hoster, captcha, mirrorAmounts, timeStop, timeOutStop, timeBreakHoster, timeOutBreakHoster, breakHoster, timeBreakMirror, timeOutBreakMirror, breakMirror;
  function kinoxInit(){
    startup = hideBackupDiv = true;
    kinoxRel = $("#HosterList li:first-child").attr("rel");
    if(!/Mirror/.exec(kinoxRel))
      kinoxRel += "&Mirror=1";
    isSeries = ($("#SeasonSelection").length > 0);
    listCreated = working = false;
    showCtrl();
    setKinoxStyle(true);
    if(isSeries){
      createSeriesCtrl();
      refreshEpisodeList(true);
    }
    if((isSeries && settings['autoGenerateOnSeriesPageLoad']) || (!isSeries && settings['autoGenerateOnMoviePageLoad']))
      startFlow();
    startup = false;
  }
  
  function removeKinoxADs() {
    if(unsafeWindow){
      unsafeWindow.openSafe = unsafeWindow.open;
      unsafeWindow.open = function(){};
    }
  }
  
  function setKinoxStyle(getTheme){
    if(getTheme){
      styleTheme = 2;
      var bg = $("body").css("background");
      if(bg.match(/rgb\(35, 35, 35\)/))
        styleTheme = 0;
      else if(bg.match(/rgb\(249, 232, 242\)/))
        styleTheme = 1;
      else if(bg.match(/rgb\(23, 23, 23\)/))
        styleTheme = 3;
      $("#cZTableDiv")
      .on("mouseover", ".mirrorTable tr", function(){$(this).css("background-color", tableRowHoverBGColor[styleTheme]);})
      .on("mouseout",  ".mirrorTable tr", function(){$(this).css("background-color", "");});
    }
    var s = styleAll + style[styleTheme];
    $('#Vadda>center').remove();
    if(settings['hideKinoxContainer']){
      $("#ClickHelper").parent().add($("#AjaxStream").next()).css("display", "none");
      s += styleHideKinoxContainer;
    } else
      $("#ClickHelper").parent().add($("#AjaxStream").next()).css("display", "");
    $("body").prepend("<style>"+s+"</style>");
  }
  
/*=========================================== SETTINGS ===========================================*/
  
  function log(msg){
    if(settings['spamMe'])
      console.log("KinoX.to MirrorList: " + msg);
  }
  
  function err(msg){
    if(settings['spamMe'])
      console.error("KinoX.to MirrorList: " + msg);
  }
  
  const defSettings = {
    dev: {
      version: version,
      name: dataSaveName,
      series: {},
      descriptions: ["(online stream)", "(download original)", "(download flv)", "(download mobile)", "(download mp4)", ""],
      stateList: {pLsScaptcha:   -1,   // putlocker,sockshare captcha
                  fileNukeLimit: -3 }  // filenuke download-limit (3GB)
    },
    
    spamMe: false,
    hideKinoxContainer: true,
    addImdb: true, //
    
    restoreSeriesPosition: true,
    autoGenerateOnSeriesPageLoad: false,
    autoGenerateOnMoviePageLoad: false,
    autoGenerateOnEpisodeSelection: true,
    
    stopAtLinkSetCount: -1,
    stopAtMinSize: -1,
    stopAtMaxSize: -1,
    stopAfterTime: -1, //
    stopAtStateAboveEq: -1, //
    
    breakAtLinkSetCountPerHost: -1,
    breakAfterTimeHoster: -1, //
    breakAfterTimeMirror: 500, //
    
    autoDownloadAtStart: false, //
    autoDownload: true, //
    autoDownloads: [[-1, 1]], //
    
    quickDownloads: [-1, 1, 2], //
    quickEpisodesAtOnce: 3, //
    quickDownloadDelay: 30, //
    quickStopRules: false, //
    
    hideMiddleMirrors: false,
    hideBelowOrEqualState: -4, //
    
    ratings: [["TS|TC", -2], //
              ["", 1]], //
    
    sortHosterBySize: true,
    sortHosterByRate: true,
    sortMirrorByRate: true,
    mixHoster: false,
    
    hosterList: [4, 5, 34, 36, 39, 45]
  };
  
  function saveData(key, val){
    if(GM_getValue && (!GM_getValue.toString || GM_getValue.toString().indexOf("not supported") == -1))
      GM_setValue(key, val);
    else if(localStorage)
      localStorage[key] = val;
    else if(document.cookie){
      var date = new Date();
      date.setTime(date.getTime() + (1000*24*60*60*1000));
      var expires = "; expires=" + date.toGMTString();
      document.cookie = key + "=" + val + expires + "; path=/";
    }
  }

  function loadData(key, def){
    if(GM_getValue && (!GM_getValue.toString || GM_getValue.toString().indexOf("not supported") == -1))
      return GM_getValue(key, def);
    else if(localStorage)
      return localStorage[key] || def;
    else if(document.cookie){
      var nameEQ = key + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i ++){
        var c = ca[i];
        while (c.charAt(0) == ' ')
          c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
          return c.substring(nameEQ.length, c.length);
      }
      return def;
    }
    return "{}";
  }

  function unsetData(key){
    if(GM_getValue && (!GM_getValue.toString || GM_getValue.toString().indexOf("not supported") == -1))
      GM_deleteValue(key);
    if(localStorage)
      localStorage.clear();
    if(document.cookie){
      var cookies = document.cookie.split(";");
      for(var cookie in cookies){
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if(name == key)
    	  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }
  }
  
  function getSettings(){
    log("loading settings");
    if(typeof(settings['dev']) == "undefined")
      return $.extend(true, {}, defSettings);
    return JSON.parse(loadData(settings['dev']['name'], "{}"));
  }
  
  function getUserSettings(){
    var userSettings = {dev: $.extend(true, {}, defSettings['dev']), ratings: [], autoDownloads: []};
    if(settings['dev'])
      userSettings['dev'] = settings['dev'];
    var arr = settingsForm.serializeArray();
    for(var val in arr){
      val = arr[val];
      var des = val.name.replace(/^descriptions(\d+)$/, "$1");
      var rate = val.name.replace(/^rate(\d+)$/, "$1");
      var down = val.name.replace(/^autoDownloads(\d+)$/, "$1");
      if(des && des != val.name){
        if(val.value.replace(/\s/, "") != "")
          userSettings['ratings'][des] = [val.value];
      } else if(rate && rate != val.name){
        if(userSettings['ratings'][rate])
          userSettings['ratings'][rate][1] = val.value;
      } else if(down && down != val.name){
        var val = val.value.replace(/\s/, "");
        var opts = val.split(",");
        var pos = userSettings['autoDownloads'].length;
        if(val != ""){
          userSettings['autoDownloads'][pos] = [];
          for(var i = 0; i < opts.length; i ++)
            userSettings['autoDownloads'][pos].push(opts[i]*1);
        }
      } else if(val.value == "on")
        userSettings[val.name] = true;
      else
        userSettings[val.name] = val.value;
    }
    userSettings['hosterList'] = userSettings['hosterList'].replace(/\s/, "").split(',');
    for(var val in defSettings)
      if(typeof(defSettings[val]) == "boolean" && !userSettings[val])
        userSettings[val] = false;
    return userSettings;
  }
  
  function saveUserSettings(){
    var series = settings['dev']['series'];
    saveSettingsFile(getUserSettings());
    settings = getSettings();
    if(!settings['restoreSeriesPosition'])
      settings['dev']['series'] = series;
  }
  
  function saveSettingsFile(settings){
    log("saving settings");
    if(!settings['restoreSeriesPosition'])
      settings['dev']['series'] = $.extend(true, {}, defSettings['dev']['series']);
    saveData(settings['dev']['name'], JSON.stringify(settings));
  }
  
  function updateSettingsFile(){
    log("updating settings");
    var newSettings = $.extend(true, {}, defSettings);
    for(var key in settings)
      if(typeof(defSettings[key]) != "undefined")
        newSettings[key] = settings[key];
    var series = settings['dev']['series'];
    settings = newSettings;
    settings['dev'] = $.extend(true, {}, defSettings['dev']);
    settings['dev']['series'] = series;
    saveSettingsFile(settings);
  }
  
  function restoreSettings(){
    log("restoring settings");
    var series = {};
    if(settings['dev'] && settings['dev']['series'])
      series = settings['dev']['series'];
    unsetData(defSettings['dev']['name']);
    settings = $.extend(true, {}, defSettings);
    settings['dev']['series'] = series;
    saveSettingsFile(settings);
  }
  
  function saveEpisodeState(movie){
    var oldSettings = getSettings();
    oldSettings['dev']['series'][movie] = settings['dev']['series'][movie];
    saveSettingsFile(oldSettings);
  }
  
  function removeEpisodeState(movie){
    var oldSettings = getSettings();
    var newSeriess = {};
    for(var key in oldSettings['dev']['series'])
      if(key != movie)
        newSeriess[key] = oldSettings[key];
    oldSettings['dev']['series'] = newSeriess;
    saveSettingsFile(oldSettings);
  }
  
  function removeEpisodeStates(){
    var oldSettings = getSettings();
    oldSettings['dev']['series'] = $.extend(true, {}, defSettings['dev']['series']);
    saveSettingsFile(oldSettings);
  }
  
  function settingsInit(){
    settings = {dev: $.extend(true, {}, defSettings['dev'])};
    settings = getSettings();
    if(typeof(settings['dev']) == "undefined"){
      restoreSettings();
    }else if(settings['dev']['version'] != version)
      updateSettingsFile();
  }
  
/*================================================================================================*/
/*======================================== LIST-GENERATION =======================================*/
/*================================================================================================*/
  
/*----------------------------------------- list-objects -----------------------------------------*/
  
  function Link(url, description, any, form, linkSet){
    this.url = url;
    this.encodedUrl = encodeURIComponent(url);
    this.prefix = "";
    this.description = description;
    this.suffix = "";
    this.state = 0;
    this.any = any;
    this.form = form;
    this.linkSet = linkSet;
  }
  Link.prototype.setState = function(state, overwrite){
    if(overwrite || state < this.state)
      this.state = state;
    if(!this.linkSet['minState'] || this.linkSet['minState'] > this.state)
      this.linkSet['minState'] = this.state;
    if(!this.linkSet['maxState'] || this.linkSet['maxState'] < this.state)
      this.linkSet['maxState'] = this.state;
    if(!this.linkSet.hoster['minState'] || this.linkSet.hoster['minState'] > this.state)
      this.linkSet.hoster['minState'] = this.state;
    if(!this.linkSet.hoster['maxState'] || this.linkSet.hoster['maxState'] < this.state)
      this.linkSet.hoster['maxState'] = this.state;
  }
  function LinkSet(size, unit, hoster){
    this.links = [];
    this.dSize = size;
    this.size;
    this.unit = unit;
    this.hoster = hoster;
    this.minState;
    this.maxState;
  }
  LinkSet.prototype.setMBSize = function(){
    this.size = this.dSize*1;
    switch(this.unit.toLowerCase()){
      case 'tb': this.size *= 1000000; break;
      case 'gb': this.size *= 1000; break;
      case 'kb': this.size /= 1000; break;
      case 'b': this.size /= 1000000; break;
    }
    return this;
  }
  function Hoster(id){
    this.linkSets = [];
    this.id = id;
    this.minState;
    this.maxState;
  }
  function pushHoster(id){
    list[activeHosterCounter] = new Hoster(id);
  }
  function pushLinkSet(size, sizeUnit, hoster){
    list[activeHosterCounter]['linkSets'][hosterActiveLink] = new LinkSet(size, sizeUnit.toUpperCase(), hoster).setMBSize();
    if(!list[activeHosterCounter]['maxSize'] || list[activeHosterCounter]['maxSize'] < size)
      list[activeHosterCounter]['maxSize'] = size;
    if(!list[activeHosterCounter]['minSize'] || list[activeHosterCounter]['minSize'] > size)
      list[activeHosterCounter]['minSize'] = size;
  }
  function pushLink(url, des, any, state, form){
    var link = new Link(url, des, any, form, list[activeHosterCounter]['linkSets'][hosterActiveLink]);
    link.setState(state, false);
    list[activeHosterCounter]['linkSets'][hosterActiveLink].links.push(link);
    return link;
  }
  function createMixedList(){
    mixedList = [];
    for(var i = 0; i < list.length; i ++)
      for(var j = 0; j < list[i]['linkSets'].length; j ++)
        mixedList.push(list[i]['linkSets'][j]);
  }
  function sortSetsBySizeDesc(){
    for(var i = 0; i < list.length; i ++){
      list[i]['linkSets'].sort(compareSetsDesc);
    }
  }
  function sortMixedListBySize(){
    mixedList.sort(compareSetsDesc);
  }
  function compareSetsDesc(set1, set2){
    if(settings['sortMirrorByRate']){
      if(set1['maxState'] > set2['maxState'])
      return -1;
      if(set1['maxState'] < set2['maxState'])
      return 1;
    }
    return set2.size - set1.size;
  }
  function sortHosterByHosterList(){
    list.sort(compareHosterByList);
  }
  function compareHosterByList(hoster1, hoster2){
    return settings['hosterList'].indexOf(hoster1['id']) - settings['hosterList'].indexOf(hoster2['id']);
  }
  function sortHosterBySizeDesc(){
    list.sort(compareHosterBySizeDesc);
  }
  function compareHosterBySizeDesc(hoster1, hoster2){
    if(settings['sortHosterByRate']){
      if(hoster1['maxState'] > hoster2['maxState'])
      return -1;
      if(hoster1['maxState'] < hoster2['maxState'])
      return 1;
    }
    return hoster2['maxSize'] - hoster1['maxSize'];
  }
  
/*--------------------------------------------- flow ---------------------------------------------*/
  
  function startFlow(){
    var time = (settings['stopAfterTime'] * 1), now = new Date().getTime();
    timeStop = now + 864000000; // 10 Days
    log("Stop-Timeout: " + time);
    if(time >= 0){
      timeStop = now + time;
      timeOutStop = window.setTimeout(function(){ log("stopped"); interrupt = true; }, time);
    }
    list = [];
    working = true;
    listCreated = interrupt = captcha = false;
    activeHosterCounter = -1;
    linkCounter = hoster = 0;
    mirrorAmounts = [];
    if(isSeries){
      var seriesInfo = settings['dev']['series'][seriesId];
      var season = seriesInfo['seasons'][seriesInfo['season']];
      var episode = season['episodes'][seriesInfo['episode']];
      $.ajax({
        type: "GET",
        async: false,
        url: '/aGET/MirrorByEpisode/'+seriesId+'&Season='+season['name']+'&Episode='+episode,
        success: function(x){
          for(var i = 0; i < settings['hosterList'].length; i ++){
            mirrorAmounts[i] = [];
            var res = new RegExp("Hoster_"+settings['hosterList'][i]+"\".*\\d+\\/(\\d+)").exec(x);
            if(res && res.length > 1)
              mirrorAmounts[i][0] = mirrorAmounts[i][1] = res[1];
            else if(new RegExp("Hoster_"+settings['hosterList'][i] + "\"").exec(x))
              mirrorAmounts[i][0] = mirrorAmounts[i][1] = 1;
          }
        }
      });
    } else {
      for(var i = 0; i < settings['hosterList'].length; i ++){
        mirrorAmounts[i] = [];
        var hosterData = $("#Hoster_"+settings['hosterList'][i]+" div.Data");
        if(hosterData.length == 0 )
          continue;
        var res = /\d+\/(\d+)/.exec(hosterData.html());
        if(res && res.length > 1)
          mirrorAmounts[i][0] = mirrorAmounts[i][1] = res[1];
        else
          mirrorAmounts[i][0] = mirrorAmounts[i][1] = 1;
      }
    }
    $(".mirrorSwapForm").remove();
    getHosterData();
    listCreated = true;
    window.clearTimeout(timeOutStop);
    listFinishedOrInterrupted();
    working = false;
  }
  
  function getHosterData(){
    hosterNum = settings['hosterList'][hoster];
    while(!interrupt && hoster < settings['hosterList'].length){
      breakHoster = false;
      var time = (settings['breakAfterTimeHoster'] * 1), now = new Date().getTime();
      timeBreakHoster = now + time;
      if(timeBreakHoster > timeStop || time < 0){
        time = timeStop - now;
        timeBreakHoster = timeStop;
      }
      log("Hoster-Timeout: " + time);
      timeOutBreakHoster = window.setTimeout(function(){ log("hoster breaked"); breakHoster = true; }, time);
      hosterActiveLink = 0;
      kinoxRel = kinoxRel.replace(/(&?Hoster=)[^&]+(&?)/, "$1"+hosterNum+"$2");
      getHosterSets();
      hoster ++;
      hosterNum = settings['hosterList'][hoster];
      window.clearTimeout(timeOutBreakHoster);
    }
  }
  
  function getHosterSets(){
    while(!interrupt && !breakHoster && mirrorAmounts[hoster][0] > 0){
      breakMirror = false;
      var time = (settings['breakAfterTimeMirror'] * 1), now = new Date().getTime();
      timeBreakMirror = now + time;
      if(timeBreakMirror > timeBreakHoster || time < 0){
        time = timeBreakHoster - now;
        timeBreakMirror = timeBreakHoster;
      }
      log("Mirror-Timeout: " + time);
      timeOutBreakMirror = window.setTimeout(function(){ log("mirror breaked"); breakMirror = true; }, time);
      if(settings['stopAtLinkSetCount'] == linkCounter){
        interrupt = true;
        break;
      }
      if(mirrorAmounts[hoster][1] - mirrorAmounts[hoster][0] == settings['breakAtLinkSetCountPerHost'])
        break;
      getHosterSet(mirrorAmounts[hoster][0]);
      mirrorAmounts[hoster][0] --;
      window.clearTimeout(timeOutBreakMirror);
    }
  }
  
  function getHosterSet(number){
    kinoxRel = kinoxRel.replace(/(&?Mirror=)[^&]+(&?)/, "$1"+number+"$2");
    log("loading resources " + kinoxRel);
    var x = $.ajax({
      type: "GET",
      async: false,
      cacheBoolean: false,
      url: '/aGET/Mirror/'+ kinoxRel,
      dataType: "json",
      success: checkSite,
      timeout: (timeBreakMirror - new Date().getTime())
    });
  }
  
  function checkSite(x){
    var src = $(x.Stream).attr("href");
    var site = $.ajax({ url: src, async: false, timeout: (timeBreakMirror - new Date().getTime()) }).responseText;
    var regex;
    for(var i = 0; i < sizeRegex.length; i ++)
      if(sizeRegex[i][0] == hosterNum){
        regex = sizeRegex[i][1];
        break;
      }
    var s = regex.exec(site);
    var next = true;
    if(s && s.length > 1 && !breakMirror){ // active link
      if(hosterActiveLink == 0){
        activeHosterCounter ++;
        pushHoster(settings['hosterList'][hoster]);
      }
      var size = s[1];
      if((settings['stopAtMaxSize']*1 > 0 && size*1 >= settings['stopAtMaxSize']*1) || size*1 <= settings['stopAtMinSize']*1)
        interrupt = true;
      pushLinkSet(size, s[2], list[activeHosterCounter]);
      switch(hosterNum*1){
        case 4:
        case 5:
          getPutlockerSockshare(site, src);
          break;
        case 34:
          getFilenuke(site, src);
          break;
        case 36:
          getHostingbulk(site, src);
          break;
        case 39:
          getMovreel(site, src);
          break;
        case 45:
          getPrimeshare(site, src);
          break;
        default:
          err("Hoster-ID '" + hosterNum + "' not supported!");
      }
      linkCounter ++;
      hosterActiveLink ++;
    }
  }
  
/*==================================== HOSTER MIRROR-HANDLING ====================================*/
  
/*------------------------------------- putlocker / sockshare ------------------------------------*/
  
  function getPutlockerSockshare(site, src){
    // online
    var res = simulatePutlockerSockshareForm(site, src);
    if(captcha){
      pushLink();
      pushLink();
      pushLink();
      return ;
    }
    var urlPrefix = "http://www."+(/putlocker/.exec(src) ? "putlocker.com" : "sockshare.com");
    var regex, rl, rl2;
    // original
    regex = /\/get_file\.php\?id=[a-zA-Z0-9&=]+original=1/;
    rl = regex.exec(res);
    if(rl && rl.length > 0)
      pushLink(urlPrefix + rl[0], 1, true);
    else
      pushLink();
    // stream
    regex = /\/get_file\.php\?stream=[a-zA-Z0-9]+=/;
    rl2 = regex.exec(res);
    if(rl2 && rl2.length > 0){
      var data = { type: "GET", url: urlPrefix + rl2[0], async: false, timeout: (timeBreakMirror - new Date().getTime()) };
      var res2 = $.ajax(data).responseText;
      regex = /url="(http:\/\/[^"]+)"/;
      rl2 = regex.exec(res2);
      if(rl2 && rl2.length > 1){
        var url = (rl2[1]+"").replace(/\&amp;/g, "&").replace(/(\&e=[0-9]+)(\&.*)/, "$1");
        pushLink(url, 2, true);
      } else
        pushLink();
    } else
      pushLink();
    // mobile
    if(rl2 && rl2.length > 1 && rl && rl.length > 0){
      rl[0] = rl[0].replace(/original=1$/, "mobile=1");
      if(urlPrefix + rl[0])
        pushLink(urlPrefix + rl[0], 3, true);
      else
        pushLink();
    } else
      pushLink();
  }
  
  function simulatePutlockerSockshareForm(site, url){
    var regex = /<input[^>]+value="([\d\w]{16})"[^>]+name="hash">/;
    var hash = regex.exec(site)[1];
    var data = {
      type: "POST",
      url: url,
      async: false,
      data: { hash: hash, confirm: "Continue as Free User" },
      timeout: (timeBreakMirror - new Date().getTime())
    };
    var x = $.ajax(data);
    if(!captcha)
      $("#mirrorCaptcha").remove();
    if(!captcha && !x.responseText && /Exception 101/.exec(x.statusText)){
      captcha = true;
      for(var i = 0; i < list.length; i ++)
        if(list[i]['id'] == 4 || list[i]['id'] == 5)
          for(var j = 0; j < list[i]['linkSets'].length; j ++)
            if(list[i]['linkSets'][j]['links'].length > 0)
              list[i]['linkSets'][j]['links'][0].setState(settings['dev']['stateList']['pLsScaptcha']);
      $("#cZTableDiv").prepend("<div id=\"mirrorCaptcha\">putlocker and sockshare have activated their captcha-lock, so you have to type in one captcha to unlock it.</div>");
    }
    regex = /<div class="video_player" /;
    if(captcha)
      pushLink(url, 0, true, settings['dev']['stateList']['pLsScaptcha']);
    else if(!regex.exec(x.responseText))
      pushLink();
    else {
      var form = $("<form class=\"mirrorSwapForm\" target=\"blank\" id=\"mirrorForm"+linkCounter+"\" style=\"display:none;\" method=\"POST\" action=\""+url+"\"></form>");
      form.append("<input name=\"hash\" value=\""+hash+"\">");
      form.append("<input name=\"confirm\" value=\"Continue as Free User\">");
      form.append("<input type=\"submit\" id=\"btn_download\" value=\"Create Download Link\" class=\"btn-creat-dwnld-link\">");
      $("#cZTableDiv").append(form);
      pushLink("", 0, true, false, "mirrorForm"+linkCounter);
    }
    return x.responseText;
  }
  
/*------------------------------------------- filenuke -------------------------------------------*/
  
  function getFilenuke(site, src){
    // online + original
    simulateFilenukeForm(site, src);
    pushLink();
    pushLink();
  }
  
  function simulateFilenukeForm(site, url){
    var regex = /<input type="hidden" name="id" value="(\w+)">/;
    var id = regex.exec(site)[1];
    var form = $("<form class=\"mirrorSwapForm\" target=\"_blank\" id=\"mirrorForm"+linkCounter+"a\" style=\"display:none;\" method=\"POST\" action=\""+url+"\"></form>");
    form.append("<input name=\"id\" value=\""+id+"\">");
    form.append("<input name=\"op\" value=\"download2\">");
    form.append("<input name=\"down_direct\" value=\"1\">");
    form.append("<input type=\"submit\" id=\"btn_download\" value=\"Create Download Link\" class=\"btn-creat-dwnld-link\">");
    $("#cZTableDiv").append(form);
    var data = {
      type: "POST",
      url: url,
      async: false,
      data: { down_direct: 1, op: "download2", method_free: "Free", id: id },
      timeout: (timeBreakMirror - new Date().getTime())
    };
    var x = $.ajax(data);
    var res = x.responseText;
    regex = /<img src="..\/images1\/file-icon-other.png">/;
    var valueOff = regex.exec(res);
    if(valueOff)
      pushLink("", 0, true, settings['dev']['stateList']['fileNukeLimit'], "mirrorForm"+linkCounter+"a");
    else if(x.status != 404)
      pushLink("", 0, true, false, "mirrorForm"+linkCounter+"a");
    else
      pushLink();
    regex = /<input type="hidden" name="rand" value="(\w+)">/;
    var rand = regex.exec(res);
    if(rand && rand.length > 1){
      form = form.clone().attr("id", "mirrorForm"+linkCounter+"b");
      form.append("<input name=\"rand\" value=\""+rand[1]+"\">");
      $("#cZTableDiv").append(form);
      if(!valueOff)
        pushLink("", 1, true, false, "mirrorForm"+linkCounter+"b");
      else
        pushLink("", 1, true, settings['dev']['stateList']['fileNukeLimit'], "mirrorForm"+linkCounter+"b");
    } else
      pushLink();
  }
  
/*------------------------------------------ hostingbulk -----------------------------------------*/
  
  function getHostingbulk(site, src){
    // online
    var regex = /'file': '(http:\/\/[^']+)',/;
    var swp = regex.exec(site);
    var stream = false;
    if(swp && swp.length > 1){
      stream = true;
      pushLink(src, 0, true);
    } else
      pushLink();
    // original
    simulateHostingbulkForm(site, src);
    // stream
    if(src.match(/\?[^\/]$/))
      src += '&directdownload=1';
    else
      src += '?directdownload=1';
    if(stream)
      pushLink(src, 5, true).suffix = "(try download mp4)";
    else
      pushLink();
    pushLink();
  }
  
  function simulateHostingbulkForm(site, url){
    var regex = /<input type="hidden" name="id" value="(\w+)" \/>/;
    var swp = regex.exec(site);
    var id, rand;
    if(swp && swp.length > 1)
      id = swp[1];
    regex = /<input type="hidden" name="rand" value="(\w+)" \/>/;
    swp = regex.exec(site);
    if(swp && swp.length > 1)
      rand = swp[1];
    var data = {
      type: "POST",
      url: url,
      async: false,
      data: { down_direct: 1, op: "download2", id: id, btn_download: "Create Download Link" },
      timeout: (timeBreakMirror - new Date().getTime())
    };
    var res = $.ajax(data).responseText;
    regex = /<span style="background:#f9f9f9;border:1px dotted #bbb;padding:7px;">\s*<a href="(http:\/\/[^"]+)">http:\/\//;
    var urlOrig = regex.exec(res);
    if(urlOrig && urlOrig.length > 1)
      pushLink(urlOrig[1], 1, true);
    else
      pushLink();
  }
  
/*-------------------------------------------- movreel -------------------------------------------*/
  
  function getMovreel(site, src){
    // online + original
    simulateMovreelForm(site, src);
    pushLink();
    pushLink();
  }
  
  function simulateMovreelForm(site, url){
    var regex = /<input type="hidden" name="id" value="(\w+)">/;
    var id = regex.exec(site)[1];
    var data = {
      type: "POST",
      url: url,
      async: false,
      data: { down_direct: 1, op: "download2", method_free: "Free", id: id },
      timeout: (timeBreakMirror - new Date().getTime())
    };
    var res = $.ajax(data).responseText;
    regex = /<input type="hidden" name="rand" value="(\w+)">/;
    var rand = regex.exec(res);
    if(rand && rand.length > 1){
      var form = $("<form class=\"mirrorSwapForm\" target=\"_blank\" id=\"mirrorForm"+linkCounter+"a\" style=\"display:none;\" method=\"POST\" action=\""+url+"\"></form>");
      form.append("<input name=\"id\" value=\""+id+"\">");
      form.append("<input name=\"op\" value=\"download2\">");
      form.append("<input name=\"down_direct\" value=\"1\">");
      form.append("<input type=\"submit\" id=\"btn_download\" value=\"Create Download Link\" class=\"btn-creat-dwnld-link\">");
      form.append("<input name=\"rand\" value=\""+rand[1]+"\">");
      $("#cZTableDiv").append(form);
      pushLink("", 0, true, false, "mirrorForm"+linkCounter+"a");
      if(url.match(/\?[^\/]$/))
        url += '&directdownload=1';
      else
        url += '?directdownload=1';
      form = form.clone().attr("id", "mirrorForm"+linkCounter+"b").attr("action", url);
      $("#cZTableDiv").append(form);
      pushLink("", 1, true, false, "mirrorForm"+linkCounter+"b");
    } else {
      pushLink();
      pushLink();
    }
  }
  
/*------------------------------------------ primeshare ------------------------------------------*/
  
  function getPrimeshare(site, src){
    pushLink(src, 0, true);
    pushLink();
    pushLink();
    pushLink();
  }
  
/*================================================================================================*/
/*============================================ DISPLAY ===========================================*/
/*================================================================================================*/
  
  function showCtrl(){
    var links;
//    if(isSeries)
      links = [["generateList", "generate list",      generateClick],
               ["hideMList",    "hide list",          hideTableClick]];
//               ["quickDL",      "QuickDL",            quickDLClick],
//               ["quickDLx3",    "QuickDL 3 episodes", quickDL3Click],
//               ["quickDLxx",    "QuickDL series",      quickDLXClick]];
//    else
//      links = [["generateList", "generate list",      generateClick],
//               ["hideMList",    "hide list",          hideTableClick],
//               ["quickDL",      "QuickDL",            quickDLClick]];
    var mirrorContainer= $(
       '<div id="mirrorListContainer">'
      +'  <div class="ModuleHead mHead">'
      +'    <div class="Opt leftOpt Customize"><img src="/gr/sys/btn/Transam.png" style="height: 30px; width: 30px; cursor: pointer;" alt="Anpassen" title="Anpassen" class="OptLoader" id="cZContainerSettings"></div>'
      +'    <div class="Opt leftOpt Spacer"></div>'
      +'    <div class="Opt leftOpt Headlne">'
      +'      <h1 id="cZContainerCtrl">KinoX.to MirrorList<span style="padding-right: 20px;"></span></h1>'
      +'    </div>'
      +'  </div>'
      +'  <div style="clear: both;"></div>'
      +'  <div class="ModuleDefault" style="width: 100%;">'
      +'    <div id="cZContainerContent">'
      + getCtrlSettingsForm()
      +'      <div id="cZTableDiv"></div'
      +'      <div style="clear: both"></div>'
      +'    </div>'
      +'  </div>'
      +'  <div style="clear: both"></div>'
      +'  <div class="ModuleFooter"></div>'
      +'</div>').insertAfter("#trailer-box");
    $("#cZContainerSettings").click(settingsClick);
    addSettingsHandler();
    for(var i = 0; i < links.length; i ++)
      $("<a id=\""+links[i][0]+"\">"+links[i][1]+"</a>").click(links[i][2]).appendTo($("#cZContainerCtrl"));
    $("#hideMList").hide();
    settingsForm = $("#cZSettingsForm").hide();
    $("#cZSettingsMsg").fadeTo(0, 0);
  }
  
  function loadSettingsToForm(){
    var sForm = $(getCtrlSettingsForm());
    settingsForm.replaceWith(sForm);
    settingsForm = sForm;
    addSettingsHandler();
  }
  
  function addSettingsHandler(){
    $("#cZAddRate", settingsForm).click(cZSettingsAddRate);
    $("#cZAddDown", settingsForm).click(cZSettingsAddDownload);
    $("#cZSaveButton", settingsForm).click(cZSaveSettings);
    $("#cZUndo", settingsForm).click(cZUndoSettings);
    $("#cZRestore", settingsForm).click(cZRestoreSettings);
    $("#cZBackup", settingsForm).click(cZBackupSettings);
    $("#cZRestoreBackup", settingsForm).click(cZRestoreBackup);
    if(hideBackupDiv)
      $("#mlBackupDiv").hide();
  }
  
  function getCtrlSettingsForm(){
    var helpAutoDown = 
         ' negative mirrors mean counting descending \n'
        +'   -1 is the biggest file \n'
        +'   0 is the smallest file \n'
        +' option-numbers (comma-seperated): \n'
        +'   0 - online-stream \n'
        +'   1 - original download \n'
        +'   2 - stream download \n'
        +'   3 - mobile download ';
    var helpHosterList = 
         '   4 - Putlocker.com \n'
        +'   5 - SockShare.com \n'
        +' 34 - FileNuke.com \n'
        +' 36 - HostingBulk.com \n'
        +' 39 - MovReel.com \n'
        +' 45 - PrimeShare.tv';
    var form = 
       '<form id="cZSettingsForm" style="border: 1px dotted rgb(0, 0, 0); margin: 0px auto 10px; display: block; background: rgba(0,0,0,0.05);">'
      +'  <div style="float: left; width: 31%; padding: 9px;">'
      +'    <b>KinoX.to</b><br>'
      +'    <input type="checkbox" name="hideKinoxContainer"'+(settings['hideKinoxContainer'] ? " checked" : "")+'> Hide original mirror-area<br>'
      +'    <input type="checkbox" name="spamMe"'+(settings['spamMe'] ? " checked" : "")+'> Use console for messages<br>'
      +'    <b>Page loading</b><br>'
      +'    <input type="checkbox" name="autoGenerateOnMoviePageLoad"'+(settings['autoGenerateOnMoviePageLoad'] ? " checked" : "")+'> Automatic list-generation (movies)<br>'
      +'    <input type="checkbox" name="autoGenerateOnSeriesPageLoad"'+(settings['autoGenerateOnSeriesPageLoad'] ? " checked" : "")+'> Automatic list-generation (series)<br>'
      +'    <b>Episode changing</b><br>'
      +'    <input type="checkbox" name="restoreSeriesPosition"'+(settings['restoreSeriesPosition'] ? " checked" : "")+'> Save last episode, automatic restore<br>'
      +'    <input type="checkbox" name="autoGenerateOnEpisodeSelection"'+(settings['autoGenerateOnEpisodeSelection'] ? " checked" : "")+'> Automatic list-generation<br>'
//      +'    <b>Searchstrings to rank mirrors<br>(not case-sensitive, part of regex)</b><br>';
//    var i = 0;
//    for(var key in settings['searchStrings']){
//      var val = settings['searchStrings'];
//      form +=
//         '    <input type="text" name="descriptions'+i+'" value="'+key+'" style="width: 170px;">'
//        +'    <select name="rate'+i+'" style="width: 55px;">'
//        +'      <option value="3"'+(val == 3 ? " selected" : "")+'>+ 3</option>'
//        +'      <option value="2"'+(val == 2 ? " selected" : "")+'>+ 2</option>'
//        +'      <option value="1"'+(val == 1 ? " selected" : "")+'>+ 1</option>'
//        +'      <option value="0"'+(val == 0 ? " selected" : "")+'>0</option>'
//        +'      <option value="-1"'+(val == -1 ? " selected" : "")+'>- 1</option>'
//        +'      <option value="-2"'+(val == -2 ? " selected" : "")+'>- 2</option>'
//        +'      <option value="-3"'+(val == -3 ? " selected" : "")+'>- 3</option>'
//        +'    </select><br>';
//      i ++;
//    }
//    form +=
//       '    <div style="text-align: center;">'
//      +'      <input type="button" value="+" id="cZAddRate">'
//      +'    </div>'
      +'  </div>'
      +'  <div style="float: left; width: 31%; padding: 8px;">'
      +'    <b>Interrupt (-1 means no interruption)</b><br>'
      +'    After xth found mirror<br>'
      +'    <input type="text" name="stopAtLinkSetCount" value="'+settings['stopAtLinkSetCount']+'"><br>'
      +'    At filesize found less or equal x MB<br>'
      +'    <input type="text" name="stopAtMinSize" value="'+settings['stopAtMinSize']+'"><br>'
      +'    At filesize found more or equal x MB<br>'
      +'    <input type="text" name="stopAtMaxSize" value="'+settings['stopAtMaxSize']+'"><br>'
      +'    After x milliseconds<br>'
      +'    <input type="text" name="stopAfterTime" value="'+settings['stopAfterTime']+'"><br>'
      +'    <b>Next Hoster (-1 means no breaks)</b><br>'
      +'    After xth found mirror of the same hoster<br>'
      +'    <input type="text" name="breakAtLinkSetCountPerHost" value="'+settings['breakAtLinkSetCountPerHost']+'"><br>'
      +'    After x milliseconds at the same hoster<br>'
      +'    <input type="text" name="breakAfterTimeHoster" value="'+settings['breakAfterTimeHoster']+'"><br>'
      +'    <b>Next Mirror (-1 means no breaks)</b><br>'
      +'    After x milliseconds at the same mirror<br>'
      +'    <input type="text" name="breakAfterTimeMirror" value="'+settings['breakAfterTimeMirror']+'"><br>'
      +'  </div>'
      +'  <div style="float: left; width: 31%; padding: 9px;">'
      +'    <b>Display</b><br>'
      +'    <input type="checkbox" name="hideMiddleMirrors"'+(settings['hideMiddleMirrors'] ? " checked" : "")+'> Show only min- and max-sized files of each hoster<br>'
      +'    <input type="checkbox" name="sortHosterBySize"'+(settings['sortHosterBySize'] ? " checked" : "")+'> Sort hoster by max-filesize<br>'
      +'    <input type="checkbox" name="sortHosterByRate"'+(settings['sortHosterByRate'] ? " checked" : "")+'> Sort hoster by highest mirror-rating<br>'
      +'    <input type="checkbox" name="sortMirrorByRate"'+(settings['sortMirrorByRate'] ? " checked" : "")+'> Sort mirror by rating<br>'
      +'    <input type="checkbox" name="mixHoster"'+(settings['mixHoster'] ? " checked" : "")+'> Sort hoster-independent<br>'
      +'    <b title="'+helpHosterList+'">Preferred hoster-order</b><br>'
      +'    <input type="text" name="hosterList" value="'+settings['hosterList'].join(",")+'"><br>'
      +'    <b>Automatic downloads</b><br>'
      +'    <input type="checkbox" name="autoDownloadAtStart"'+(settings['autoDownloadAtStart'] ? " checked" : "")+'> Enable following automatic downloads at generation of page loading<br>'
      +'    <input type="checkbox" name="autoDownload"'+(settings['autoDownload'] ? " checked" : "")+'> Enable following automatic downloads<br>'
      +'    <b title="'+helpAutoDown+'">number of mirror, option-numbers</b>';
    for(var i = 0; i < settings['autoDownloads'].length; i ++){
      var down = settings['autoDownloads'][i];
      form += '<input type="text" name="autoDownloads'+i+'" value="'+down.join(",")+'"><br>';
    }
    form +=
       '    <div style="text-align: center;">'
      +'      <input type="button" value="+" id="cZAddDown">'
      +'    </div>'
      +'  </div>'
      +'  <div style="clear: both; padding: 5px;"></div>'
      +'  <div style="text-align: center;">'
      +'    <input type="button" id="cZSaveButton" value="save">'
      +'    <input type="button" id="cZUndo" value="undo">'
      +'    <input type="button" id="cZRestore" value="restore defaults">'
      +'    <input type="button" id="cZBackup" value="backup"><br>'
      +'    <span id="cZSettingsMsg">[hidden]</span>'
      +'    <div id="mlBackupDiv">'
      +'      <textarea id="cZBackupArea" cols="80" rows="10"></textarea><br>'
      +'      <input type="button" id="cZRestoreBackup" value="restore">'
      +'    </div>'
      +'  </div>'
      +'</form>';
    return form;
  }
  
  function createSeriesCtrl(){
    var seasonSelect = $("#SeasonSelection"), seriesInfo;
    seriesId = $('#SeasonSelection').attr('rel');
    if(settings['dev']['series'][seriesId] && settings['restoreSeriesPosition'])
      seriesInfo = settings['dev']['series'][seriesId];
    else {
      seriesInfo = {
        seasons: [],
        episode: 0,
        season: 0
      };
    }
    var i = 0;
    $("option", seasonSelect).each(function(){
      var name = $(this).attr("value"), display = $(this).html(), episodes = $(this).attr("rel").split(",");
      seriesInfo['seasons'][i] = {name: name, display: display, episodes: episodes};
      i ++;
    });
    var MM = $(".MirrorModule").first();
    var newSeriesCtrl =
        '<select id="cZSeasonSelect" style="margin: 0px 0px 0px 10px; float: left;"></select>'
      + '<select id="cZEpisodeSelect" style="margin: 0px 0px 0px 3px; float: left;"></select>'
      + '<a id="cZBackward"  style="width: 28px; height: 20px; background-image: url(\'/gr/episode-icons.gif\'); display: block; float: left; background-position: left top; margin-left: 15px;\"></a>'
      + '<a id="cZForward" style="width: 28px; height: 20px; background-image: url(\'/gr/episode-icons.gif\'); display: block; float: left; background-position: right top; margin-left: 5px;"></a>'
      + '<span id="cZEpisodeWarning" style="display: block; float: left; margin-left: 5px; line-height: 20px;"></span>'
      + '<div style="clear: both"></div>';
    settingsForm.after(newSeriesCtrl);
    $("#cZSeasonSelect, #cZEpisodeSelect").change(newEpisodeSelected);
    $("#cZBackward").click(function(){ changeEpisode(true); });
    $("#cZForward").click(function(){ changeEpisode(false); });
    settings['dev']['series'][seriesId] = seriesInfo;
  }
  
  function refreshEpisodeList(noStart){
    var seriesInfo = settings['dev']['series'][seriesId];
    var season = seriesInfo['season'], seSel = $("#cZSeasonSelect").html("");
    var seasons = seriesInfo['seasons'];
    var episode = seriesInfo['episode'], epSel = $("#cZEpisodeSelect").html("");
    var episodes = seasons[season]['episodes'];
    for(var i = 0; i < episodes.length; i ++)
      if(episode == i)
        epSel.append('<option value="'+episodes[i]+' selected">Episode '+episodes[i]+'</option>');
      else
        epSel.append('<option value="'+episodes[i]+'">Episode '+episodes[i]+'</option>');
    epSel.prop('selectedIndex', episode);
    for(var i = 0; i < seasons.length; i ++)
      if(season == i)
        seSel.append('<option value="'+seasons[i]['name']+' selected">'+seasons[i]['display']+'</option>');
      else
        seSel.append('<option value="'+seasons[i]['name']+'">'+seasons[i]['display']+'</option>');
    seSel.prop('selectedIndex', season);
    kinoxRel = kinoxRel.replace(/(&?Season=)\d+(&?)/, "$1"+seasons[season]['name']+"$2").replace(/(&?Episode=)\d+(&?)/, "$1"+episodes[episode]+"$2");
    if(settings['restoreSeriesPosition'])
      saveEpisodeState(seriesId);
    if($("#cZTableDiv").is(":visible"))
      hideTableClick();
    if(settings['autoGenerateOnEpisodeSelection'] && !noStart)
      startFlow();
    var warn = $("#cZEpisodeWarning").html("");
    $("#cZForward").css("background-image", "url('/gr/episode-icons.gif')");
    if(episode == seasons[season]['episodes'].length - 1)
      if(season == seasons.length - 1){
        warn.html("<b>last episode of series</b>");
        $("#cZForward").css("background-image", "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAIAAAARPMquAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QQEDR0wyftbJQAAAWBJREFUOMutlLuugkAQhoe7KBECjYmtHe9jKMAQKzqfiRBiIRWlnYkFr0BjR6smJosIy56C5OQc5Jrwl5OZb//d2Rlqv9/D1GIBYL1eT0hMkoQFgLIsp3c6BPr5fNI0FUWR5/neZLqC9gohZJrmcrl8vV7dmSOgGGNVVR3HUVUVIdQPxU1K/wsA3u+3JEmWZcmyjBDCLWp90yzLdF0XRfFvUFEUANA0zbZt13Xv9zvHca2NqvC1tmy328Vi8V0gCIKmaYZh+L7/eDxYlm1uVOMVEEJtzeV5frVa7Xa7PM9br//tlBDCMEzHp5nNZnEcN9a2QgHg+XzWuJIk/UYul0sYhhRFNdZSw2f/cDhsNpuKGARBz0Q1nlZ/e5qmaRoArtfr6XTqGEKGYUZA5/N5FEXH4xFjTAjpgQ6Z/bIsb7fb+XwuiqI3f6hTQojneXmeD3EwwmlRFBOvvtH7VJblaaE/g0iIEdpL/qMAAAAASUVORK5CYII=')");
      } else
        warn.html("last episode of season");
  }
  
  function createTable(){
    var div = $("<div id=\"mirrorTable\"></div>");
    var content = "";
    if(settings['mixHoster'])
      content = getHosterMirrorTable(mixedList);
    else {
      var first = true;
      for(var i = 0; i < settings['hosterList'].length; i ++){
        if(!list[i] || list[i]['linkSets'].length == 0)
          continue;
        if(!first)
          content += "<br />";
        var hosterName;
        for(var j = 0; j < hosterNames.length; j ++)
          if(hosterNames[j][0] == list[i]['id']){
            hosterName = hosterNames[j][1];
            break;
          }
        content += "<b>" + hosterName + "</b><br />" + getHosterMirrorTable(list[i]['linkSets']);
        first = false;
      }
    }
    div.append(content);
    $("#cZTableDiv").append(div).show();
  }
  
  function getHosterMirrorTable(linkSets){
    var content = "<table class=\"mirrorTable\">";
    for(var j = 0; j < linkSets.length; j ++){
      if(settings['hideMiddleMirrors'] && j == 1)
        j = linkSets.length-1;
      content += getLinkSetTableRow(linkSets[j]);
    }
    content += "</table>";
    return content;
  }
  
  function getLinkSetTableRow(linkSet){
    var content = "<tr>";
    content += "<td class=\"mirrorSize\">" + linkSet['dSize'] + " " + linkSet['unit'] + "</td>";
    for(var i = 0; i < linkSet['links'].length; i ++)
      content += getLinkTableData(linkSet['links'][i]);
    content += "</tr>";
    return content;
  }
  
  function getLinkTableData(link){
    var content = "<td>";
    if(link['any']){
      var des = link['prefix'] + settings['dev']['descriptions'][link['description']] + link['suffix'];
      var classes = "";
      if(link['state'] != 0)
        classes = "class=\"cZState"+link['state']+"\" ";
      if(link['form'])
        content += "<a "+classes+"href=\"javascript:$('#"+link['form']+"').submit();\">" + des + "</a>";
      else 
        content += "<a "+classes+"href=\"javascript:var win = window.openSafe('"+link['encodedUrl']+"', '_blank'); $(win).load(win.close);\" >" + des + "</a>";
    }
    content += "</td>";
    return content;
  }
  
  function removeTable(){
    $("#mirrorTable").remove();
  }
  
  function sortListBySettings(){
    sortSetsBySizeDesc();
    if(settings['sortHosterBySize'])
      sortHosterBySizeDesc();
    else
      sortHosterByHosterList();
    createMixedList();
    sortMixedListBySize();
  }
  
  function listFinishedOrInterrupted(){
    sortListBySettings();
    removeTable();
    createTable();
    if($("#cZTableDiv").is(":visible"))
      $("#hideMList").html("hide list");
    $("#hideMList").show();
    if(settings['autoDownloads'].length > 0 && ((!startup && settings['autoDownload']) || (startup && settings['autoDownloadAtStart']))){
      sortMixedListBySize();
      handleDownloads(settings['autoDownloads']);
    }
  }
  
/*================================================================================================*/
/*=========================================== DOWNLOADS ==========================================*/
/*================================================================================================*/
  
  function handleDownloads(options){
    var downloaded = [];
    for(var i = 0; i < options.length; i ++){
      var pos = options[i][0]*1;
      var step = 1;
      if(pos < 0)
        pos = -pos-1;
      else {
        pos = mixedList.length - 1 - pos;
        step = -1;
      }
      for(; pos >= 0 && pos < mixedList.length; pos += step){
        if(followLinkSet(mixedList[pos], options[i], downloaded))
          break;
      }
    }
  }
  
  function followLinkSet(linkSet, options, downloaded){
    for(var i = 1; i < options.length; i ++)
      for(var j = 0; j < linkSet.links.length; j ++){
        if(linkSet.links[j].any && linkSet.links[j]['description'] == options[i]){
          if(downloaded.indexOf(linkSet.links[j]) == -1){
            if(linkSet.links[j].form)
              $('#' + linkSet.links[j]['form']).submit();
            else {
              var win = window.openSafe(linkSet.links[j]['url'], '_blank');
              $(win).load(win.close);
            }
            downloaded.push(linkSet.links[j]);
          }
          return true;
        }
      }
    return false;
  }
  
/*================================================================================================*/
/*========================================= CLICK-HANDLER ========================================*/
/*================================================================================================*/
  
/*--------------------------------------- episode-selection --------------------------------------*/
  
  function changeEpisode(back){
    if(working)
      return ;
    var seriesInfo = settings['dev']['series'][seriesId];
    var season = seriesInfo['season'], seSel = $("#cZSeasonSelect");
    var seasons = seriesInfo['seasons'];
    var episode = seriesInfo['episode'], epSel = $("#cZEpisodeSelect");
    var episodes = seriesInfo['seasons'][season]['episodes'];
    if(back){
      episode --;
      if(episode < 0){
        season --;
        if(season < 0)
          season = seasons.length - 1;
        episodes = seasons[season]['episodes'];
        episode = episodes.length - 1;
      }
    } else {
      episode ++;
      if(episode >= episodes.length){
        season ++;
        if(season >= seasons.length)
          season = 0;
        episodes = seasons[season]['episodes'];
        episode = 0;
      }
    }
    seriesInfo['season'] = season;
    seriesInfo['episode'] = episode;
    refreshEpisodeList();
  }
  
  function newEpisodeSelected(){
    var seriesInfo = settings['dev']['series'][seriesId], noStart = false;
    seriesInfo['episode'] = $("#cZEpisodeSelect").prop('selectedIndex');
    if($("#cZSeasonSelect").prop('selectedIndex') != seriesInfo['season']){
      seriesInfo['season'] = $("#cZSeasonSelect").prop('selectedIndex');
      $("#cZEpisodeSelect").prop('selectedIndex', 0);
      seriesInfo['episode'] = 0;
      noStart = true;
    }
    refreshEpisodeList(noStart);
  }
  
/*----------------------------------------- control-links ----------------------------------------*/
  
  function generateClick(){
    if(!working)
      startFlow();
  }
  
  function hideTableClick(){
    var mTable = $("#cZTableDiv");
    if(mTable.is(":hidden")){
      mTable.show();
      $("#hideMList").html("hide list");
    } else {
      mTable.hide();
      $("#hideMList").html("show list");
    }
  }
  
  function quickDLClick(){
    sortMixedListBySize();
    handleDownloads(settings['quickDownloads']);
  }
  
  function quickDL3Click(){
    log("quickDL3");
  }
  
  function quickDLXClick(){
    log("quickDLX");
  }
  
  function settingsClick(){
    if(settingsForm.is(":hidden"))
      settingsForm.show();
    else
      settingsForm.hide();
  }
  
/*----------------------------------------- settings-panel ---------------------------------------*/
  
  function cZSettingsAddRate(){
    var number;
    var last = $(this).parent().prev().prev();
    if(last.attr('name') && last.attr('name').match(/^rate\d+$/))
      number = (last.attr("name").replace(/^rate(\d+)/, "$1") * 1 + 1);
    else
      number = 0;
    last.after(
         '<br><input type="text" name="descriptions'+number+'" value="" style="width: 170px;">'
        +'<select name="rate'+number+'" style="width: 55px;">'
        +'  <option value="3">+ 3</option>'
        +'  <option value="2">+ 2</option>'
        +'  <option value="1">+ 1</option>'
        +'  <option value="0" selected>0</option>'
        +'  <option value="-1">- 1</option>'
        +'  <option value="-2">- 2</option>'
        +'  <option value="-3">- 3</option>'
        +'</select>');
  }
  
  function cZSettingsAddDownload(){
    var number;
    var last = $(this).parent().prev().prev();
    if(last.attr('name') && last.attr('name').match(/^autoDownloads\d+$/))
      number = (last.attr("name").replace(/^autoDownloads(\d+)/, "$1") * 1 + 1);
    else
      number = 0;
    last.after('<br><input type="text" name="autoDownloads'+number+'" value="">');
  }
  
  function setSettingsMessage(msg){
    $("#cZSettingsMsg", settingsForm).html(msg).finish().fadeIn(200).delay(1500).fadeTo(700, 0);
  }
  
/*--------------------------------- settings-panel control-buttons -------------------------------*/
  
  function cZSaveSettings(){
    var buAr = $("#cZBackupArea", settingsForm);
    var bu = buAr.val();
    buAr.val("");
    saveUserSettings();
    loadSettingsToForm();
    $("#cZBackupArea", settingsForm).val(bu);
    setSettingsMessage('settings saved');
    $("body>style:first-child").remove();
    setKinoxStyle();
    if(listCreated){
      sortListBySettings();
      removeTable();
      createTable();
    }
  }
  
  function cZUndoSettings(){
    var buAr = $("#cZBackupArea", settingsForm);
    var bu = buAr.val();
    buAr.val("");
    loadSettingsToForm();
    $("#cZBackupArea", settingsForm).val(bu);
    setSettingsMessage('formular resetted');
  }
  
  function cZRestoreSettings(){
    var buAr = $("#cZBackupArea", settingsForm);
    var bu = buAr.val();
    buAr.val("");
    restoreSettings();
    loadSettingsToForm();
    $("#cZBackupArea", settingsForm).val(bu);
    setSettingsMessage('default settings restored');
    $("body>style:first-child").remove();
    setKinoxStyle();
    if(listCreated){
      sortListBySettings();
      removeTable();
      createTable();
    }
  }
  
  function cZBackupSettings(){
    hideBackupDiv = false;
    $("#mlBackupDiv").show();
    $("#cZBackupArea").val(JSON.stringify(getUserSettings()));
  }
  
  function cZRestoreBackup(){
    hideBackupDiv = true;
    var series = settings['dev']['series'];
    saveSettingsFile(JSON.parse($("#cZBackupArea").val()));
    settings = getSettings();
    if(!settings['restoreSeriesPosition'])
      settings['dev']['series'] = series;
    loadSettingsToForm();
    $("#mlBackupDiv").hide();
    setSettingsMessage('local settings restored');
  }
  
})();