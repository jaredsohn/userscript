// ==UserScript==
// @name        SEObar
// @version     3.16
// @date        2008-08-12
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/seobar/seobar3.js
// @exclude     file://*
// @exclude     ftp://*
// @exclude     http://localhost/*
// @exclude     http://www.alexa.com/*
// ==/UserScript==

// The SEObar's settings are saved only if cookies are allowed for domain
// 8412ea42-008d-4621-b919-3cb2e38a2e6c.ru

// Description: http://www.puzzleclub.ru/files/seobar/

  var ujs_seob = {

    /////////////////////////////////////////////////////////////////
    // variable settings. read the note

    //display the information on panel
    bPanel : true,
    // display the information in status bar
    bStatusbar : true,

    // minimizing the panel disables the script while maximizing enables it;
    // if set to false the script is enabled in the 'Settings' section.
    bDisableScriptByPanelCollapse : true,

    // diplay (true) or not (false) the extra informatin of Yandex.ru
    // in status bar
    showYandexInfoInStatusbar : false,

    // Regular expression URL filter
    // Example (include an index pages only): /\/$|index\.[a-z]{3,5}$|default\.[a-z]{3,5}$/i
    includeUrlFilter : null,
    // Example (exclude a pages with the "?" symbol): /\?/
    excludeUrlFilter : null,

    // delay (ms.) before questioning Alexa and Google after the page is loaded.
    requestDelay : 1500,

    // the symbol for grouping numbers (eg. 1,673,433 - are grouped by comma)
    digitGroupingSymbol : ' ', // eg.: 1 673 433

    undefinedRank : 'n/a',
    unrequestedRank : '?',

    fontSize : '11px',
    fontFamily : 'verdana, arial, helvetica, sans-serif',
    sectionHeaderFontSize : '14px',

    // delete frames after receiving the infromation
    removeFrames : true,

    // specifies the non-existing domain's name where the SEObar stores it's settings
    fakeDomain : '8412ea42-008d-4621-b919-3cb2e38a2e6c.ru',

    // cookies's name where the SEObar stores it's settings
    preferencesCookie : 'SEObar_preferences',
    // cookies's name where the the current domain's info is stored.
    domainCookie : 'SEObar_domain',
    // cookies's name where the SEObar's state is stored.
    stateCookie : 'SEObar_state',
    switchStatusbarState : true,

    // Directories
    maxDirectoryResults : 5,

    // Tools
    // URL of the whois service; %s - placeholder for the domain name
    whoisUrl : 'http://whois.domaintools.com/%s',

    // Domain ratings
    // Storage time in minutes
    domainRatingStorageTime : 1440, // 1 day
    domainRatingCookie : 'SEObar_domain_ratings',

    busyIndicator : {
      image : 'data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYiIiHd3d2ZmZlVVVURERDMzMyIiIhEREQARAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAQACwAAAAAEAAQAAAFdyAkQgGJJOWoQgIjBM8jkKsoPEzgyMGsCjPDw7ADpkQBxRDmSCRetpRA6Rj4kFBkgLC4IlUGhbNQIwXOYYWCXDufzYPDMaoKGBoKb886OjAKdgZAAgQkfCwzAgsDBAUCgl8jAQkHEAVkAoA1AgczlyIDczUDA2UhACH5BAUHABAALAAAAAAPABAAAAVjICSO0IGIATkqIiMKDaGKC8Q49jPMYsE0hQdrlABCGgvT45FKiRKQhWA0mPKGPAgBcTjsspBCAoH4gl+FmXNEUEBVAYHToJAVZK/XWoQQDAgBZioHaX8igigFKYYQVlkCjiMhACH5BAUHABAALAAAAAAQAA8AAAVgICSOUGGQqIiIChMESyo6CdQGdRqUENESI8FAdFgAFwqDISYwPB4CVSMnEhSej+FogNhtHyfRQFmIol5owmEta/fcKITB6y4choMBmk7yGgSAEAJ8JAVDgQFmKUCCZnwhACH5BAUHABAALAAAAAAQABAAAAViICSOYkGe4hFAiSImAwotB+si6Co2QxvjAYHIgBAqDoWCK2Bq6A40iA4yYMggNZKwGFgVCAQZotFwwJIF4QnxaC9IsZNgLtAJDKbraJCGzPVSIgEDXVNXA0JdgH6ChoCKKCEAIfkEBQcAEAAsAAAAABAADgAABUkgJI7QcZComIjPw6bs2kINLB5uW9Bo0gyQx8LkKgVHiccKVdyRlqjFSAApOKOtR810StVeU9RAmLqOxi0qRG3LptikAVQEh4UAACH5BAUHABAALAAAAAAQABAAAAVxICSO0DCQKBQQonGIh5AGB2sYkMHIqYAIN0EDRxoQZIaC6bAoMRSiwMAwCIwCggRkwRMJWKSAomBVCc5lUiGRUBjO6FSBwWggwijBooDCdiFfIlBRAlYBZQ0PWRANaSkED1oQYHgjDA8nM3kPfCmejiEAIfkEBQcAEAAsAAAAABAAEAAABWAgJI6QIJCoOIhFwabsSbiFAotGMEMKgZoB3cBUQIgURpFgmEI0EqjACYXwiYJBGAGBgGIDWsVicbiNEgSsGbKCIMCwA4IBCRgXt8bDACkvYQF6U1OADg8mDlaACQtwJCEAIfkEBQcAEAAsAAABABAADwAABV4gJEKCOAwiMa4Q2qIDwq4wiriBmItCCREHUsIwCgh2q8MiyEKODK7ZbHCoqqSjWGKI1d2kRp+RAWGyHg+DQUEmKliGx4HBKECIMwG61AgssAQPKA19EAxRKz4QCVIhACH5BAUHABAALAAAAAAQABAAAAVjICSOUBCQqHhCgiAOKyqcLVvEZOC2geGiK5NpQBAZCilgAYFMogo/J0lgqEpHgoO2+GIMUL6p4vFojhQNg8rxWLgYBQJCASkwEKLC17hYFJtRIwwBfRAJDk4ObwsidEkrWkkhACH5BAUHABAALAAAAQAQAA8AAAVcICSOUGAGAqmKpjis6vmuqSrUxQyPhDEEtpUOgmgYETCCcrB4OBWwQsGHEhQatVFhB/mNAojFVsQgBhgKpSHRTRxEhGwhoRg0CCXYAkKHHPZCZRAKUERZMAYGMCEAIfkEBQcAEAAsAAABABAADwAABV0gJI4kFJToGAilwKLCST6PUcrB8A70844CXenwILRkIoYyBRk4BQlHo3FIOQmvAEGBMpYSop/IgPBCFpCqIuEsIESHgkgoJxwQAjSzwb1DClwwgQhgAVVMIgVyKCEAIfkECQcAEAAsAAAAABAAEAAABWQgJI5kSQ6NYK7Dw6xr8hCw+ELC85hCIAq3Am0U6JUKjkHJNzIsFAqDqShQHRhY6bKqgvgGCZOSFDhAUiWCYQwJSxGHKqGAE/5EqIHBjOgyRQELCBB7EAQHfySDhGYQdDWGQyUhADs=',
      text : '...',
      useImage : false
    },

    /////////////////////////////////////////////////////////////////
    // permanent settings. do not edit

    version : {
      exact : '3.16.00',
      string : '3.16',
      date :'August 12, 2008',
      author : 'Mike Samokhvalov',
      email : 'mikivanch@gmail.com',
      homepage : 'http://www.puzzleclub.ru/files/seobar/',
      discussion : [
        ['English', 'http://my.opera.com/community/forums/topic.dml?id=178339', 'my.opera.com'],
        ['Russian', 'http://operafan.net/forum/index.php?topic=1451.0', 'operafan.net']
      ]
    },

    SEObarState : true,

    anchorAttribute : {
      name : 'seobar',
      value : '1'
    },

    urlFilter : /\.(jpg|jpeg|gif|png|tif|tiff|bmp|txt|js|css)$/i,

    style : {
      highlight : 'color: #000 !important; border: 1px dotted #000 !important; padding: 2px !important; display: inline-block !important;',
      noindex : 'background: #c8d0e7 !important; ',
      nofollow : 'background: #d2e7c7 !important; ',
      external : 'background: #eedfc1 !important; ',

      scrollbar : (
        "scrollbar-3dlight-color:#b3b3b3 !important; "
        +"scrollbar-arrow-color:#000 !important; "
        +"scrollbar-base-color:#d0d0d0 !important; "
        +"scrollbar-darkshadow-color:#919191 !important; "
        +"scrollbar-face-color:#d0d0d0 !important; "
        +"scrollbar-highlight-color:#f6f6f6 !important; "
        +"scrollbar-shadow-color:#cfcfdf !important; "
        +"scrollbar-track-color:#efefef !important;"
      )
    },

    storage : new ujs_Storage('SEObar'),
    urlToken : '#SEObar_frame_',
    busyRank : '...',
    getNextValueDelay : 10000, // milliseconds
    busyWaitDelay : 120000, // milliseconds

    frame : {
      // Main ratings
      alexa : new ujs_seobarFrame(),
      google : new ujs_seobarFrame(),
      yandex : new ujs_seobarFrame(),
      // Directories
      dir : {
        dmoz : new ujs_seobarFrame(),
        yahoo : new ujs_seobarFrame(),
        yandex : new ujs_seobarFrame(),
        rambler : new ujs_seobarFrame()
      },
      // Backward Links
      link : {
        google : new ujs_seobarFrame(),
        yahoo : new ujs_seobarFrame(),
        yahooDomain : new ujs_seobarFrame(),
        msn : new ujs_seobarFrame(),
        msnDomain : new ujs_seobarFrame(),
        yandex : new ujs_seobarFrame()
      },
      // Indexed Pages
      index : {
        google : new ujs_seobarFrame(),
        yahoo : new ujs_seobarFrame(),
        msn : new ujs_seobarFrame(),
        yandex : new ujs_seobarFrame(),
        rambler : new ujs_seobarFrame()
      },
      // Other Ratings
      other : {
        technorati : new ujs_seobarFrame(),
        delicious : new ujs_seobarFrame(),
        digg : new ujs_seobarFrame(),
        googleCache : new ujs_seobarFrame(),
        waybackMachine : new ujs_seobarFrame()
      },
      // SEObar update  information
      seobarUpdate : new ujs_seobarFrame()
    },

    // storage: frame id
    sFrameId : 'SEObar_storage_frame',

    panelId : 'SEObar_panel',
    mainStyleId : 'SEObar_main_style',
    highlightStyleId : 'SEObar_highlight_style',

    alexaRank : '',
    alexaDomain : '',
    googlePR : '',
    googleRealUrl : '',
    yandexCY : '',
    yandexRank : '',
    yandexInfo : '',
    yandexRealDomain : '',
    // Directories
    dirDmoz : '',
    dirYahoo : '',
    dirYandex : '',
    dirRambler : '',
    // Backward Links
    linkGoogle : '',
    linkYahooUrl : '',
    linkYahooDomain : '',
    linkMsnURL : '',
    linkMsnDomain : '',
    linkYandex : '',
    // Indexed Pages
    indexGoogle : '',
    indexYahoo : '',
    indexMsn : '',
    indexYandex : '',
    indexRambler : '',
    // Other
    technorati : '',
    delicious : '',
    digg : '',
    googleCache : '',
    waybackMachine : '',
    // Tools
    highlightNoindex : false,
    highlightNofollow : false,
    highlightExternalLinks: false,
    httpHeaders : '',
    seobarUpdateInfo : '',

    domainData : ['ujs_seob.alexaRank', 'ujs_seob.alexaDomain',
    'ujs_seob.yandexCY', 'ujs_seob.yandexRank', 'ujs_seob.yandexInfo', 'ujs_seob.yandexRealDomain',
    'ujs_seob.linkGoogle', 'ujs_seob.linkYahooDomain', 'ujs_seob.linkMsnDomain',
    'ujs_seob.indexGoogle', 'ujs_seob.indexYahoo', 'ujs_seob.indexMsn',
    'ujs_seob.indexYandex', 'ujs_seob.indexRambler'],

    currentToolTab : 0,
    bTools : false,
    currentRatingTab : 0,
    bRatings : false,
    bShowOptions : false,
    bCollapsedPanel : false,
    bMore : false,
    bMoreDirectories : false,
    bMoreBackwardLinks : false,
    bMoreIndexedPages : false,
    bMoreOtherRatings : false,
    bInit : false,

    // options
    opFormId : 'SEObar_panel_options_form',

    op : [
      [false, 'SEObar_options_disable_script'],   // 0 Disable Script (true, false)
      [true, 'SEObar_options_store_ratings'],     // 1 Store Domain Ratings (true, false)
      [true, 'SEObar_options_check_fake_pr']      // 2 Check Fake PR (true, false)
    ],

    opRepresentation : [
      [0, 'SEObar_options_alexa_rank'],      // 0 Alexa Rank            (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_alexa_domain'],    // 1 Alexa Domain          (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_google_pr'],       // 2 Google Rank           (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_yandex_tcy'],      // 3 Yandex tCY            (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_yandex_rank'],     // 4 Yandex Rank           (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_yandex_info'],     // 5 Yandex Info           (0 - always, 1 - By request, 2 - Never)
      // Directories
      [0, 'SEObar_options_dir_dmoz'],        // 6 DMOZ                  (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_dir_yahoo'],       // 7 Yahoo!                (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_dir_yandex'],      // 8 Yandex                (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_dir_rambler'],     // 9 Rambler Top100        (0 - always, 1 - By request, 2 - Never)
      // Backward Links
      [0, 'SEObar_options_link_google'],     // 10 Google               (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_link_yahooUrl'],   // 11 Yahoo! URL           (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_link_yahooDomain'],// 12 Yahoo! Domain        (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_link_msnUrl'],     // 13 MSN URL              (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_link_msnDomain'],  // 14 MSN Domain           (0 - always, 1 - By request, 2 - Never)
      [2, 'SEObar_options_link_yandex'],     // 15 Yandex               (0 - always, 1 - By request, 2 - Never)
      // Indexed Pages
      [0, 'SEObar_options_index_google'],    // 16 Google               (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_index_yahoo'],     // 17 Yahoo!               (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_index_msn'],       // 18 MSN                  (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_index_yandex'],    // 19 Yandex               (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_index_rambler'],   // 20 Rambler              (0 - always, 1 - By request, 2 - Never)
      // Panel Elements
      [0, 'SEObar_options_btn_options'],      // 21 Button "Options"        (0 - always, 1 - By request)
      [0, 'SEObar_options_btn_refresh'],      // 22 Button "Refresh"        (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_btn_ratings'],      // 23 Button "Ratings"        (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_btn_tools'],        // 24 Button "Tools"          (0 - always, 1 - By request, 2 - Never)
      // Other
      [0, 'SEObar_options_other_technorati'],     // 25 Technorati              (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_other_delicious'],      // 26 del.icio.us             (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_other_digg'],           // 27 Digg                    (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_other_googleCache'],    // 28 Google's Cache          (0 - always, 1 - By request, 2 - Never)
      [0, 'SEObar_options_other_waybackMachine']  // 29 Wayback Machine         (0 - always, 1 - By request, 2 - Never)
    ],

    opRep : {
      main : [0, 1, 2, 3, 4, 5, 21, 22, 23, 24],
      directories : [6, 7, 8, 9],
      backwardLinks : [10, 11, 12, 13, 14, 15],
      indexedPages : [16, 17, 18, 19, 20],
      otherRatings : [25, 26, 27, 28, 29]
    },

    opPosition : [
      [1, 'SEObar_options_location'],   // 0 Panel Location 1 (0 - Top Left, 1 - Top Right, 2 - Bottom Left, 3 - Bottom Right)
      [0, 'SEObar_options_position']    // 1 Panel Position (0 - fixed, 1 - absolute)
    ],

    getDomainName : function(host)
    {
      var domain = host;
      var i = domain.indexOf('www.');
      if(i != -1)
      {
        domain = domain.substr(i + 4);
      }
      return domain;
    },
    
    postMessage : function(msg, doc, wnd)
    {
      try
      {
        doc.postMessage(msg);        
      }
      catch(err1)
      {
        try
        {
          wnd.postMessage(msg);
        }
        catch(err2){}
      }
    },

    getMainDomainName : function(domain)
    {
      if(!domain.match(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/))
        return domain;

      var a = domain.split('.');
      var l = a.length;

      if(l == 2)
        return domain;

      return (a[l - 2] + '.' + a[l - 1]);
    },
    
    getFormElementByName : function(name)
    {
      if(!document.forms)
        return null;

      for(var i = 0; i < document.forms.length; i++)
      {
        if(document.forms[i][name])
          return document.forms[i][name];
      }
      
      return null;
    },

    appendStyle : function(id, css)
    {
      var s = document.createElement('style');
      s.id = id;
      s.setAttribute('type', 'text/css');
			s.setAttribute('style', 'display:none !important;');
			s.appendChild(document.createTextNode(css));
      document.documentElement.appendChild(s);
    },

    createStyle : function()
    {
      var font = (
        'font-family: ' + ujs_seob.fontFamily + ' !important;'
        + 'font-size: ' + ujs_seob.fontSize + ' !important;'
      );

      var loc = '';
      switch(ujs_seob.opPosition[0][0])
      {
        case 0:
          loc = 'top:0 !important; bottom:auto !important; left:0 !important; right:auto !important;';
          break;
        case 1:
          loc = 'top:0 !important; bottom:auto !important; left:auto !important; right:0 !important;';
          break;
        case 2:
          loc = 'top:auto !important; bottom:0 !important; left:0 !important; right:auto !important;';
          break;
        case 3:
          loc = 'top:auto !important; bottom:0 !important; left:auto !important; right:0 !important;';
          break;
        default:
          loc = 'top:0 !important; bottom:auto !important; left:auto !important; right:0 !important;';
      }

      var pos = 'position: fixed !important;';
      if(ujs_seob.opPosition[1][0] == 1)
        pos = 'position: absolute !important;';


      var input = ujs_seob.getInputStyle();

      var css = (
        "#SEObar_panel, #SEObar_panel * {color: black !important; background-image: none !important; border: none !important; outline: none !important;" + font + " font-weight: normal !important; margin: auto !important; width: auto !important; height: auto !important; float: none !important; word-spacing: normal !important; white-space: normal !important; /*line-height: normal !important;*/ text-align: left !important; text-indent: 0 !important;} "
        +"#SEObar_panel {" + loc + pos + " background: white !important; border: 1px solid black !important; padding: 3px !important; z-index: 9999 !important; display: block !important; /*line-height: normal !important;*/ text-align: right !important; vertical-align: middle !important;} "
        +"#SEObar_panel div#SEObar_panel_box {text-align: right !important; vertical-align: middle !important;} "
        +"#SEObar_panel img {vertical-align: middle !important;} "
        +"#SEObar_panel a:link, #SEObar_panel a:visited {background: white !important; text-decoration: none !important; line-height: normal !important;} "
        +"#SEObar_panel a:hover, #SEObar_panel a:active {background: white !important; color: #0000cc !important; text-decoration: none !important; line-height: normal !important;} "
        +"#SEObar_panel b {background: white !important; color: #404040 !important; line-height: normal !important; font-weight: bold !important;} "
        +"#SEObar_panel .right {text-align: right !important;} "
        +"#SEObar_panel .line {border-top: 1px solid #d0d0d0 !important; font-size: 0 !important; margin: 0 0 10px 0 !important; padding: 0 !important; display: block !important; width: 100% !important;} "
        +"#SEObar_panel input {display: inline !important;} "
        +"#SEObar_panel input[type=checkbox] {" + input + "} "
        +"#SEObar_panel input[type=radio] {" + input + "} "
        +"#SEObar_panel input[type=button] {background: white !important; border: 1px solid #a0a0a0 !important; text-align: center !important; vertical-align: middle !important; padding: 1px 10px !important; min-width: 90px !important;} "
        +"#SEObar_panel input.SEObar_panel_btn {background: white !important; border: 1px solid #a0a0a0 !important; min-width: 60px !important; width: 60px !important; height: 17px !important; padding: 0 !important;} "
        +"#SEObar_panel input.SEObar_panel_btn[selected] {background: #f0f0f0 !important;} "
        +"#SEObar_panel input.SEObar_panel_sbtn {background: white !important; border: 1px solid #a0a0a0 !important; min-width: 16px !important; width: 16px !important; height: 17px !important; padding: 0 !important; line-height: normal !important;} "
        +"#SEObar_panel input.SEObar_panel_sbtn[selected] {background: #f0f0f0 !important;} "
        +"#SEObar_panel .pointer {cursor: pointer !important;} "
        +"#SEObar_panel_addon {background: white !important; border-top: 1px solid #a0a0a0 !important; padding: 6px !important; margin-top: 4px !important; text-align: left !important;} "
        +"#SEObar_panel_addon div#SEObar_panel_addon_h2 {color: #404040 !important; background: #f0f0f0 !important; border: 1px solid #d0d0d0 !important; font-size: " + ujs_seob.sectionHeaderFontSize + " !important; font-weight: bold !important; margin-bottom: 10px !important; padding: 3px 3px !important; text-align: center !important; display: block !important;} "
        +"#SEObar_panel_addon a:link, #SEObar_panel_addon a:visited {color: #0000cc !important; text-decoration: underline !important; } "
        +"#SEObar_panel_addon a:hover, #SEObar_panel_addon a:active {color: #f06200 !important; text-decoration: underline !important;} "
        +"#SEObar_panel_addon form {background: white !important; padding: 0 !important;} "
        +"#SEObar_panel_addon fieldset {background: white !important; border: 1px solid #a0a0a0 !important; padding: 10px !important;} "
        +"#SEObar_panel_addon legend {background: white !important; color: #505050 !important; font-weight: bold !important; margin: 0 !important;} "
        +"#SEObar_panel_addon label {background: white !important; display: inline !important; vertical-align: middle !important;} "
        +"#SEObar_panel_addon input {vertical-align: middle !important;} "
        +"#SEObar_panel_addon div.overflow {height: 280px !important; overflow: auto !important; padding-right: 20px !important;} "
        +"#SEObar_panel_addon table {background: white !important; empty-cells: show !important; border-collapse: collapse !important; padding: 0 !important;} "
        +"#SEObar_panel_addon table.main td {background: white !important; padding-left: 10px !important; vertical-align: top !important;} "
        +"#SEObar_panel_addon table.main td.left {padding-left: 0 !important;} "
        +"#SEObar_panel_addon table.options {margin: auto !important} "
        +"#SEObar_panel_addon table.options th, #SEObar_panel_addon table.options td {background: white !important; border: 1px solid #d0d0d0 !important; padding: 2px 6px !important;} "
        +"#SEObar_panel_addon table.options td.SEObar_panel_subhdr {color: #0000cc !important; background: #f5f5f5 !important;} "
        +"#SEObar_panel_addon .SEObar_panel_gray_text {color: #808080 !important;} "

        +"#SEObar_panel_addon ul#SEObar_tabs {background: white !important; list-style: none !important; padding: 0 5px !important; margin: 0 !important;} "
        +"#SEObar_panel_addon ul#SEObar_tabs li {background: white !important; float: left !important; border: 1px solid #d0d0d0 !important; border-left: none !important; border-bottom-width: 0 !important; margin: 0 !important; padding: 0 !important; line-height: normal !important;} "
        +"#SEObar_panel_addon ul#SEObar_tabs li.first_tab {border-left: 1px solid #d0d0d0 !important;} "
	      +"#SEObar_panel_addon ul#SEObar_tabs a {color: #000 !important; background: #f0f0f0 !important; text-decoration: none !important; display: block !important; padding: 1px 10px !important; text-align: center !important;} "
	      +"#SEObar_panel_addon ul#SEObar_tabs a:hover {background: #fff !important;} "
	      +"#SEObar_panel_addon ul#SEObar_tabs #selected_tab a {position: relative !important; top: 1px !important; background: white !important;} "
	      +"#SEObar_panel_addon div#tab_content {border: 1px solid #d0d0d0 !important; clear: both !important; padding: 10px !important; margin-left: 0 !important; line-height: 1.4 !important; width: 450px !important; height: auto !important; max-height: 300px !important; min-height: 100px !important; overflow: auto !important;}  "
        +"#SEObar_panel_addon div#tab_content table {margin: 0 !important; width: 100% !important;} "
        +"#SEObar_panel_addon div#tab_content table td {background: white !important; padding: 1px 10px !important; vertical-align: top !important; border: 1px solid #e0e0e0 !important; width: 100% !important; line-height: 1.8 !important;} "
        +"#SEObar_panel_addon div#tab_content table td[noborder] {padding-right: 0 !important; border: none !important;} "
        +"#SEObar_panel_addon div#tab_content table td.hdr {color: #404040 !important; width: auto !important; max-width: 33% !important;white-space: nowrap !important; font-weight: bold !important;} "
        +"#SEObar_panel_addon div#tab_content table td.hdr[noborder] {padding-left: 0 !important;} "
        +"#SEObar_panel_addon div#tab_content table td.separator {border-left: none !important; border-right: none !important;} "
      );
      ujs_seob.appendStyle(ujs_seob.mainStyleId, css);
    },

    getInputStyle : function()
    {
      var s = '', bg = 'color: #000 !important; background-color: transparent !important;';

      var input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
			input.setAttribute('style', 'display:none !important;');
      input = document.documentElement.appendChild(input);

      if(ujs_seob.isOpera9())
      {
        if(input.currentStyle.backgroundColor != 'transparent')
          s = bg;
      }
      else if(window.getComputedStyle)
      {
        try
        {
          if(document.defaultView.getComputedStyle(input, null).getPropertyValue('background-color') != 'transparent')
            s = bg;
        }
        catch(e)
        {
        }
      }

      input.parentNode.removeChild(input);
      return s;
    },
    
    parseQuery : function()
    {
      var k = new Array();
      var re = /[?&]([^=]+)(?:=([^&]*))?/g;
      while(m = re.exec(window.location.search))
      {
        if(m[1] && m[2])    
          k[m[1]] = m[2];
        else if(m[1])
          k[m[1]] = '';
      };
      return k;
    },

    initFrameData : function()
    {
      var url = window.location.href;
      var protocol = window.location.protocol;
      var host = window.location.host;
      var domain = ujs_seob.getDomainName(host);

      var style = 'img, embed, object {display: none !important;}';
      style += ' iframe {content: "Frame";}';

      with(ujs_seob.frame)
      {
        ///////////////////////////////////////////////////////////////
        // Alexa
        alexa.msgPrefix = 'SEObar_Alexa_Rank';
        alexa.frameId = 'SEObar_alexa_frame';
        alexa.frameToken = 'AlexaRank';
        alexa.url = 'http://xml.alexa.com/data?cli=10&dat=nsa&url=' + escape(url) + ujs_seob.urlToken + alexa.frameToken;
        alexa.checkUrl = 'http://www.alexa.com/data/details/main?url=' + protocol + '//' + host;
        alexa.domain = 'xml.alexa.com';
        alexa.deleteFrame = ujs_seob.removeFrames;
        alexa.IsObjectLoaded = function() {
          var obj = document.getElementsByTagName('DMOZ');
          if(obj)
          {
            return true;
          }
          return false;
        };
        alexa.getDataFromDocumentFunction = function () {
          var rank = '';
          var popularity = document.getElementsByTagName('POPULARITY');
          if(popularity && popularity.length > 0)
          {
            rank = popularity.item(0).attributes.getNamedItem('TEXT').nodeValue;
            if(rank)
              rank = ujs_seob.groupDigits(rank);

            var domain = popularity.item(0).attributes.getNamedItem('URL').nodeValue;
            if(domain)
            {
              if(domain.charAt(domain.length - 1) == '/')
                domain = domain.substr(0, domain.length - 1);

              rank += alexa.dataSeparator + domain;
            }
          }
          return rank;
        };
        alexa.getDataFunction = ujs_seob.getRatings;

        ///////////////////////////////////////////////////////////////
        // Google
        google.msgPrefix = 'SEObar_Google_PR';
        google.frameId = 'SEObar_google_frame';
        google.frameToken = 'GooglePR';
        // GooglePR from http://opera.oslocity.org/shoust/?p=userjs
        var r=function(x,y) {return Math.floor((x/y-Math.floor(x/y))*y+.1);}
        var ch=function(url){url='info:'+url; var c=[0x9E3779B9,0x9E3779B9,0xE6359A60],i,j,k=0,l,f=Math.floor; var m=function(c){var i,j,s=[13,8,13,12,16,5,3,10,15]; for(i=0;i<9;i+=1){j=c[r(i+2,3)]; c[r(i,3)]=(c[r(i,3)]-c[r(i+1,3)]-j)^(r(i,3)==1?j<<s[i]:j>>>s[i]);}}; for(l=url.length;l>=12;l-=12){for(i=0;i<16;i+=1){j=k+i; c[f(i/4)]+=url.charCodeAt(j)<<(r(j,4)*8);} m(c); k+=12;} c[2]+=url.length; for(i=l;i>0;i--) c[f((i-1)/4)]+=url.charCodeAt(k+i-1)<<(r(i-1,4)+(i>8?1:0))*8;m(c); return'6'+c[2];};
        google.r = r;
        google.ch = ch;
        google.getSrc=function(host, url){return 'http://' + host + '/search?client=navclient-auto&ch=' + ch(url) + '&features=Rank&q=info:' + escape(url);}
        google.checkUrl = google.getSrc('www.google.com', url);// 'http://www.google.com/search?client=navclient-auto&ch=' + google.ch(url) + '&features=Rank&q=info:' + escape(url);
        google.url = google.checkUrl + ujs_seob.urlToken + google.frameToken;
        google.domain = 'www.google.com';
        google.deleteFrame = !ujs_seob.op[2][0];
        google.IsObjectLoaded = function() {
          return false;
        };

        google.createFrame = function() {
          var gDiv = document.createElement('DIV');
          gDiv.setAttribute('style', 'display: none !important;');
          var gFrame = '<iframe src="' + google.url + '"';
          gFrame += ' id="' + google.frameId  + '" width="0" height="0" frameborder="0" scrolling="no">';
          gDiv.innerHTML = gFrame;
          document.documentElement.appendChild(gDiv);
        };

        google.getDataFromDocumentFunction = function () {
          var rank = document.body.innerText;
          if(rank)
          {
            var res = rank.match(/Rank_\d{1}:\d{1}:([\d]+)/);
            rank = '';
            if(res && res.length > 1)
            {
              rank = res[1];
            }
          }
          
          if(window.location.host.indexOf(ujs_seob.frame.google.domain) >= 0 &&
            window.location.hash.indexOf(ujs_seob.urlToken + ujs_seob.frame.google.frameToken) >= 0)
          {
            if(ujs_seob.op[2][0])
            {
              var q = ujs_seob.parseQuery();
              if(q['q'])
              {
                var url = 'http://www.google.com/search?hl=en&q=' + q['q'] + '&btnG=Search';
                var xmlhttp = new XMLHttpRequest();      
                xmlhttp.open("GET", url, true);
                xmlhttp.onreadystatechange = function() {
                  if(this.readyState == 4)
                  {
                    var data = '';
                    if(this.responseText)
                    {
                      var u = '', a = '';
                      while(a = /<a([^>]+)/ig.exec(this.responseText))
                      {
                        if(a && a.length > 1 && a[1].search(/class=[\x22\x27]?l[\x22\x27]?/i) != -1)
                        {
                          var href = a[1].match(/href=[\x22\x27]([^\x22\x27]+)[\x22\x27]/i);
                          if(href && href.length > 1)
                          {
                            u = href[1];
                            break;
                          }
                        }
                      }

                      if(u)
                      {
                        var a1 = document.createElement('a');
                        if(u.search(/^http:\/\//i) == -1)
                          a1.href = 'http://' + u;
                        else  
                          a1.href = u;
                          
                        var u1 = a1.host + '/' + a1.pathname;                                            
                        u1 = u1.replace(/^(www\.)?/i, '');                      
                        
                        var a2 = document.createElement('a');
                        var u2 = unescape(q['q']).replace(/^info:?/i, '');
                        if(u2.search(/^http:\/\//i) == -1)
                          a2.href = 'http://' + u2;
                        else
                          a2.href = u2;

                        u2 = a2.host + '/' + a2.pathname;
                        u2 = u2.replace(/^(www\.)?/i, '');

                        if(u1.toLowerCase() != u2.toLowerCase())
                          data = rank + '|' + u;
                      }
                    }
                    
                    if(!data)
                      data = rank + '|';
                    
                    var msg = google.msgPrefix + google.msg + google.msgSeparator + google.frameToken;
                    if(data)
                    {
                      data = encodeURIComponent(data);
                    }
                    msg += google.msgSeparator + data;
                    //window.parent.document.postMessage(msg);
                    ujs_seob.postMessage(msg, window.parent.document, window.parent);
                  }
                };
                xmlhttp.send();              
              }
            }
          }

          return rank;
        };
        google.getDataFunction = ujs_seob.getRatings;

        ///////////////////////////////////////////////////////////////
        // Yandex
        yandex.msgPrefix = 'SEObar_Yandex_tCY';
        yandex.frameId = 'SEObar_yandex_frame';
        yandex.frameToken = 'YandexTCY';
        yandex.url = 'http://bar-navig.yandex.ru/u?ver=2&lang=1049&url=' + escape(url) + '&show=1&thc=0' + ujs_seob.urlToken + yandex.frameToken;
        yandex.checkUrl = 'http://www.yandex.ru/cy?base=0&host=' + protocol + '//' + host;
        yandex.domain = 'bar-navig.yandex.ru';
        yandex.deleteFrame = ujs_seob.removeFrames;
        yandex.IsObjectLoaded = function() {
          var obj = document.getElementsByTagName('urlinfo');
          if(obj && obj.length > 0)
          {
            return true;
          }
          return false;
        };
        yandex.getDataFromDocumentFunction = function () {
          var rank = '';
          var obj = document.getElementsByTagName('tcy');
          if(obj && obj.length > 0)
          {
            var res = obj.item(0).attributes.getNamedItem('value').nodeValue;
            if(res)
            {
              rank = ujs_seob.groupDigits(res);

              res = obj.item(0).attributes.getNamedItem('rang').nodeValue;
              if(res)
              {
                rank += '|' + res;
              }
              
              obj = document.getElementsByTagName('url');
              if(obj && obj.length > 0)
              {
                var real_domain = obj.item(0).attributes.getNamedItem('domain').nodeValue;
                if(real_domain)
                {
                  rank += '|' + real_domain;
                }
              }

              obj = document.getElementsByTagName('textinfo');
              if(obj && obj.length > 0)
              {
                res = obj.item(0).childNodes[0].nodeValue;
                if(res)
                {
                  var info = res.split('\n');
                  if(info.length > 0)
                  {
                    res = '';
                    var sep = '';
                    for(var i = 0; i < info.length; i++)
                    {
                      if(info[i])
                      {
                        res += sep + info[i];
                        sep = ' | ';
                      }
                    }
                  }

                  rank += '#' + res;
                }
              }
            }
          }
          
          return rank;
        };
        yandex.getDataFunction = ujs_seob.getRatings;
      }

      ///////////////////////////////////////////////////////////////
      // DIRECTORIES
      with(ujs_seob.frame.dir)
      {
        ///////////////////////////////////////////////////////////////
        // DMOZ
        dmoz.msgPrefix = 'SEObar_DMOZ';
        dmoz.frameId = 'SEObar_dmoz_frame';
        dmoz.frameToken = 'DMOZ';
        dmoz.checkUrl = 'http://search.dmoz.org/cgi-bin/search?search=' + domain + '&all=no&cat=&t=s';
        dmoz.url = dmoz.checkUrl + ujs_seob.urlToken + dmoz.frameToken;
        dmoz.domain = 'search.dmoz.org';
        dmoz.deleteFrame = ujs_seob.removeFrames;
        dmoz.style = style;
        dmoz.IsObjectLoaded = function() {
          if(document.getElementById('search'))
          {
            return true;
          }
          return false;
        };
        dmoz.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementsByTagName('ol');
          if(obj && obj.length > 0)
          {
            var ol = obj[0];
            if(obj.length > 1)
              ol = obj[1];

            var u1 = '', u2 = '';   
            var s = ujs_seob.getFormElementByName('search');
            if(s && s.value)
              u1 = s.value;
            else
              return info;

            u2 = 'http://www.' + u1 + '/';
            u1 = 'http://' + u1 + '/';

            var count = 0, sep = '';
            var li = ol.getElementsByTagName('li');
            for(var i = 0; i < li.length; i++)
            {
              var a = li.item(i).getElementsByTagName('a');
              if(a.length >= 3)
              {
                var d = a.item(0).href.toString();
                if(d.charAt(d.length - 1) != '/')
                  d += '/';
                if(d.indexOf(u1) == 0 || d.indexOf(u2) == 0)
                {
                  count++;
                  if(count > ujs_seob.maxDirectoryResults)
                  {
                    info += sep + '...';
                    break;
                  }

                  info += sep;
                  info += count.toString() + ') ';
                  info += '<a href="' + a.item(1).href + '"';
                  info += ' title="';

                  d = li.item(i).innerText;
                  if(d)
                  {
                    d = d.split('\n');
                    if(d && d.length > 0)
                    {
                      info += d[0].replace(/\x22/g, '&quot;');
                    }
                  }

                  info += '">';
                  info += a.item(1).innerText;
                  info += '</a>';
                  sep = '<br />';
                }
              }
            }
          }
          return info;
        };
        dmoz.getDataFunction = ujs_seob.getDirectoriesInfo;

        ///////////////////////////////////////////////////////////////
        // Yahoo! Directory
        yahoo.msgPrefix = 'SEObar_Yahoo_Dir';
        yahoo.frameId = 'SEObar_yahoodir_frame';
        yahoo.frameToken = 'YahooDir';
        yahoo.checkUrl = 'http://search.yahoo.com/search/dir?p=' + domain + '&ei=UTF-8&x=drt';
        yahoo.url = yahoo.checkUrl + ujs_seob.urlToken + yahoo.frameToken;
        yahoo.domain = 'search.yahoo.com';
        yahoo.deleteFrame = ujs_seob.removeFrames;
        yahoo.style = style;
        yahoo.IsObjectLoaded = function() {
          if(document.getElementById('yschssbx'))
          {
            return true;
          }
          return false;
        };
        yahoo.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('yschsp');
          if(!obj)
            return info;

          var u1 = obj.value;
          u1 = u1.replace(/"+/g, '');
          var u2 = 'www.' + u1;

          var parent = document.getElementById('yschweb');
          if(!parent)
          {
            parent = document;
          }
          var ol = parent.getElementsByTagName('ol');
          if(ol && ol.length > 0)
          {
            ol = ol.item(0);
            var li = ol.getElementsByTagName('li');

            var count = 0, sep = '';

            for(var i = 0; i < li.length; i++)
            {
              var href='', text = '', desc = '';

              var em = li.item(i).getElementsByTagName('em');
              for(var j = 0; j < em.length; j++)
              {
                if(em.item(j).className == 'yschurl')
                {
                  var d = em.item(j).innerText;
                  if(d.indexOf(u1) == 0 || d.indexOf(u2) == 0)
                  {
                    var div = li.item(i).getElementsByTagName('div');
                    for(var k = 0; k < div.length; k++)
                    {
                      if(div.item(k).className == 'yschabstr')
                      {
                        desc = div.item(k).innerText;
                      }
                      else if((div.item(k).firstChild && div.item(k).firstChild.nodeValue == ' Category: ') ||
                        (div.item(k).className == 'yschdircat' && div.item(k).firstChild && div.item(k).firstChild.innerText.indexOf('Category: ') == 0))
                      {
                        var a = div.item(k).getElementsByTagName('a');
                        if(a && a.length > 0)
                        {
                          a = a.item(0);
                          var href = a.href;
                          if(href)
                          {
                            var ind = href.indexOf('**');
                            if(ind >= 0)
                            {
                              href = href.substr(ind + 2);
                            }
                            href = unescape(href);
                            text = a.innerText;
                          }
                        }
                      }
                    }
                  }
                  break;
                }
              }

              if(href && text)
              {
                count++;
                if(count > ujs_seob.maxDirectoryResults)
                {
                  info += sep + '...';
                  break;
                }

                info += sep + count.toString() + ') ';
                info += '<a href="' + href +'" title="' + desc + '">' + text + '</a>';
                sep = '<br />';
              }
            }
          }

          return info;
        };
        yahoo.getDataFunction = ujs_seob.getDirectoriesInfo;

        ///////////////////////////////////////////////////////////////
        // Yandex Catalog
        yandex.msgPrefix = 'SEObar_YaCa';
        yandex.frameId = 'SEObar_yaca_frame';
        yandex.frameToken = 'YaCa';
        yandex.checkUrl = 'http://search.yaca.yandex.ru/yca/cy/ch/' + domain + '/';
        yandex.url = yandex.checkUrl + ujs_seob.urlToken + yandex.frameToken;
        yandex.domain = 'search.yaca.yandex.ru';
        yandex.deleteFrame = ujs_seob.removeFrames;
        yandex.style = style;
        yandex.IsObjectLoaded = function() {
          var obj = document.getElementsByTagName('table');
          for(var i = 0; i < obj.length; i++)
          {
            if(obj.item(i).className && obj.item(i).className == 'content')
              return true;
          }
          return false;
        };
        yandex.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementsByTagName('div');
          for(var i = 0; i < obj.length; i++)
          {
            if(obj.item(i).className && obj.item(i).className == 'path2root')
            {
              var a = obj.item(i).getElementsByTagName('a');
              var sep = '';
              for(var j = 0; j < a.length; j++)
              {
                info += sep;
                info += a.item(j).outerHTML;
                sep = ' / ';
              }
              break;
            }
          }
          return info;
        };
        yandex.getDataFunction = ujs_seob.getDirectoriesInfo;

        ///////////////////////////////////////////////////////////////
        // Rambler Top100
        rambler.msgPrefix = 'SEObar_Rambler_Top100';
        rambler.frameId = 'SEObar_ratop100_frame';
        rambler.frameToken = 'RamblerTop100';
        rambler.checkUrl = 'http://www.rambler.ru/cgi-bin/counter_search?words=' + domain;
        rambler.url = rambler.checkUrl + ujs_seob.urlToken + rambler.frameToken;
        rambler.domain = 'www.rambler.ru';
        rambler.deleteFrame = ujs_seob.removeFrames;
        rambler.style = style;
        rambler.IsObjectLoaded = function() {
          var obj = document.getElementsByTagName('div');
          for(var i = 0; i < obj.length; i++)
          {
            if(obj.item(i).className && obj.item(i).className == 'bottomSearchTable')
              return true;
          }
          return false;
        };
        rambler.getDataFromDocumentFunction = function () {
          var info = '';
          if(document.search && document.search.words && document.search.words.value)
          {
            var u1 = 'http://' + document.search.words.value;
            var u2 = 'http://www.' + document.search.words.value;

            var obj = document.getElementsByTagName('ol');
            if(obj && obj.length > 0)
            {
              var sep = '', count = 0;
              obj = obj.item(0).getElementsByTagName('div');
              for(var i = 0; i < obj.length; i++)
              {
                if(obj.item(i).className == 'inf')
                {
                  var res = obj.item(i).innerHTML;
                  var ind = res.indexOf(u1);
                  if(ind < 0)
                    ind = res.indexOf(u2);

                  if(ind >= 0)
                  {
                    count++;
                    if(count > ujs_seob.maxDirectoryResults)
                    {
                      info += sep + '...';
                      break;
                    }
                    var a = obj.item(i).getElementsByTagName('a');
                    var href = a.item(0).href;
                    info += sep + count.toString() + ') ';
                    info += '<a href="' + href + '">';
                    info += a.item(0).innerText;
                    info += '</a>';
                    sep = ', ';

                  }
                }
              }
            }
          }
          return info;
        };
        rambler.getDataFunction = ujs_seob.getDirectoriesInfo;
      }

      ///////////////////////////////////////////////////////////////
      // BACKWARD LINKS
      with(ujs_seob.frame.link)
      {
        ///////////////////////////////////////////////////////////////
        // Google Backward Links
        google.msgPrefix = 'SEObar_link_Google';
        google.frameId = 'SEObar_link_google_frame';
        google.frameToken = 'linkGoogle';
        google.checkUrl = 'http://www.google.com/search?hl=en&q=link%3A' + host + '&btnG=Search';
        google.url = google.checkUrl + ujs_seob.urlToken + google.frameToken;
        google.domain = 'www.google.com';
        google.deleteFrame = ujs_seob.removeFrames;
        google.style = style;
        google.IsObjectLoaded = function() {
          if(document.getElementById('res'))
          {
            return true;
          }
          return false;
        };
        google.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('ssb');
          if(obj)
          {
            var txt = obj.innerText;
            var res = txt.match(/of\s+(?:about\s*)?([\d,]+)\s+linking/);
            if(res && res.length > 1)
            {
              info = res[1].replace(/,+/g, '');
              info = ujs_seob.groupDigits(info);              
            }
          }
          return info;
        };
        google.getDataFunction = ujs_seob.getBackwardLinksInfo;

        ///////////////////////////////////////////////////////////////
        // Yahoo! URL Backward Links
        yahoo.msgPrefix = 'SEObar_link_YahooUrl';
        yahoo.frameId = 'SEObar_link_yahoourl_frame';
        yahoo.frameToken = 'linkYahooUrl';
        yahoo.checkUrl = 'http://search.yahoo.com/search?p=link%3A' + escape(url) + '+-site%3A' + domain + '&prssweb=Search&ei=UTF-8&x=wrt';
        yahoo.url = yahoo.checkUrl + ujs_seob.urlToken + yahoo.frameToken;
        yahoo.domain = 'search.yahoo.com';
        yahoo.deleteFrame = ujs_seob.removeFrames;
        yahoo.style = style;
        yahoo.IsObjectLoaded = function() {
          if(document.getElementById('web'))
          {
            return true;
          }
          return false;
        };
        yahoo.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('infotext');
          if(obj)
          {
            info = obj.innerText.match(/of\s*(?:about\s*)?([\d,\x20]+)\s*for/i);
            if(info && info.length > 1)
            {
              info = info[1].replace(/[\x20,]+/g, '');
              info = ujs_seob.groupDigits(info);
            }
          }
          return info;
        };
        yahoo.getDataFunction = ujs_seob.getBackwardLinksInfo;

        ///////////////////////////////////////////////////////////////
        // Yahoo! Domain Backward Links
        yahooDomain.msgPrefix = 'SEObar_link_YahooDomain';
        yahooDomain.frameId = 'SEObar_link_yahoodomain_frame';
        yahooDomain.frameToken = 'linkYahooDomain';
        yahooDomain.checkUrl = 'http://search.yahoo.com/search?p=linkdomain%3A' + domain + '+-site%3A' + domain + '&prssweb=Search&ei=UTF-8&x=wrt';
        yahooDomain.url = yahooDomain.checkUrl + ujs_seob.urlToken + yahooDomain.frameToken;
        yahooDomain.domain = 'search.yahoo.com';
        yahooDomain.deleteFrame = ujs_seob.removeFrames;
        yahooDomain.style = style;
        yahooDomain.IsObjectLoaded = function() {
          if(document.getElementById('web'))
          {
            return true;
          }
          return false;
        };
        yahooDomain.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('infotext');
          if(obj)
          {
            info = obj.innerText.match(/of\s*(?:about\s*)?([\d,\x20]+)\s*for/i);
            if(info && info.length > 1)
            {
              info = info[1].replace(/[\x20,]+/g, '');
              info = ujs_seob.groupDigits(info);
            }
          }
          return info;
        };
        yahooDomain.getDataFunction = ujs_seob.getBackwardLinksInfo;

        ///////////////////////////////////////////////////////////////
        // MSN URL Backward Links
        msn.msgPrefix = 'SEObar_link_MsnUrl';
        msn.frameId = 'SEObar_link_msnurl_frame';
        msn.frameToken = 'linkMsnUrl';
        msn.checkUrl = 'http://search.msn.com/results.aspx?q=%20link%3A' + escape(url) + '+-site%3A' + domain + '&setlang=en-US&go=Search&form=QBRE';
        msn.url = msn.checkUrl + ujs_seob.urlToken + msn.frameToken;
        msn.domain = 'search.msn.com';
        msn.deleteFrame = ujs_seob.removeFrames;
        msn.style = style;
        msn.IsObjectLoaded = function() {
          if(document.getElementById('results'))
          {
            return true;
          }
          return false;
        };
        msn.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('count');
          if(obj && obj.innerText)
          {
            var r = /of\s*([\d,]+)/i.exec(obj.innerText)
            if(r && r.length > 1)
            {
              info = r[1].replace(/,+/g, '');
              info = ujs_seob.groupDigits(info);
            }
          }
          return info;
        };
        msn.getDataFunction = ujs_seob.getBackwardLinksInfo;

        ///////////////////////////////////////////////////////////////
        // MSN Domain Backward Links
        msnDomain.msgPrefix = 'SEObar_link_MsnDomain';
        msnDomain.frameId = 'SEObar_link_msndomain_frame';
        msnDomain.frameToken = 'linkMsnDomain';
        msnDomain.checkUrl = 'http://search.msn.com/results.aspx?q=%2Blinkdomain%3A' + domain + '+-site%3A' + domain + '&setlang=en-US&go=Search&form=QBRE';
        msnDomain.url = msnDomain.checkUrl + ujs_seob.urlToken + msnDomain.frameToken;
        msnDomain.domain = 'search.msn.com';
        msnDomain.deleteFrame = ujs_seob.removeFrames;
        msnDomain.style = style;
        msnDomain.IsObjectLoaded = function() {
          if(document.getElementById('results'))
          {
            return true;
          }
          return false;
        };
        msnDomain.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('count');
          if(obj && obj.innerText)
          {
            var r = /of\s*([\d,]+)/i.exec(obj.innerText)
            if(r && r.length > 1)
            {
              info = r[1].replace(/,+/g, '');
              info = ujs_seob.groupDigits(info);
            }
          }
          return info;
        };
        msnDomain.getDataFunction = ujs_seob.getBackwardLinksInfo;

        ///////////////////////////////////////////////////////////////
        // Yandex Backward Links
        yandex.msgPrefix = 'SEObar_link_Yandex';
        yandex.frameId = 'SEObar_link_yandex_frame';
        yandex.frameToken = 'linkYandex';
        yandex.url = 'http://www.yandex.ru/yandsearch?text=&Link=' + url + ujs_seob.urlToken + yandex.frameToken;
        yandex.checkUrl = 'http://www.yandex.ru/yandsearch?text=&Link=' + url + '&numdoc=50';
        yandex.domain = 'yandex.ru';
        yandex.deleteFrame = ujs_seob.removeFrames;
        yandex.style = style;
        yandex.IsObjectLoaded = function() {
          obj = document.getElementsByTagName('div');
          for(var i = 0; i < obj.length; i++)
          {
            if(obj.item(i).className == 'moreInfo')
              return true;
          }
          return false;
        };
        yandex.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementsByTagName('div');
          if(obj && obj.length > 0)
          {
            for(var i = 0; i < obj.length; i++)
            {
              if(obj.item(i).className == 'refblock')
              {
                var b = obj.item(i).getElementsByTagName('b');
                if(b && b.length > 0)
                {
                  var txt = b.item(0).innerText;
                  txt = txt.replace(/[\s,.]+/g, '');
                  var rank = parseInt(txt);
                  if(!isNaN(rank))
                  {
                    info += ujs_seob.groupDigits(rank.toString());
                    if(b.length > 1)
                    {
                      txt = b.item(1).innerText;
                      txt = txt.replace(/[\s,.]+/g, '');
                      rank = parseInt(txt);
                      if(!isNaN(rank))
                      {
                        info += ' | ' + ujs_seob.groupDigits(rank.toString());
                      }
                    }
                  }
                }

                break;
              }
            }
          }
          return info;
        };
        yandex.getDataFunction = ujs_seob.getBackwardLinksInfo;
      }

      ///////////////////////////////////////////////////////////////
      // INDEXED PAGES
      with(ujs_seob.frame.index)
      {
        ///////////////////////////////////////////////////////////////
        // Google Indexed Pages
        google.msgPrefix = 'SEObar_index_Google';
        google.frameId = 'SEObar_index_google_frame';
        google.frameToken = 'indexGoogle';
        google.checkUrl = 'http://www.google.com/search?hl=en&lr=&q=site%3A' + host + '&btnG=Search';
        google.url = google.checkUrl + ujs_seob.urlToken + google.frameToken;
        google.domain = 'www.google.com';
        google.deleteFrame = ujs_seob.removeFrames;
        google.style = style;
        google.IsObjectLoaded = function() {
          if(document.getElementById('res'))
          {
            return true;
          }
          return false;
        };
        google.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('ssb');
          if(obj)
          {
            var txt = obj.innerText;
            var res = txt.match(/of\s+(?:about\s*)?([\d,]+)\s+from/);
            if(res && res.length > 1)
            {
              info = res[1].replace(/,+/g, '');
              info = ujs_seob.groupDigits(info);
            }
          }
          return info;
        };
        google.getDataFunction = ujs_seob.getIndexedPagesInfo;

        ///////////////////////////////////////////////////////////////
        // Yahoo! Indexed Pages
        yahoo.msgPrefix = 'SEObar_index_Yahoo';
        yahoo.frameId = 'SEObar_index_yahoo_frame';
        yahoo.frameToken = 'indexYahoo';
        yahoo.checkUrl = 'http://search.yahoo.com/search?p=' + host;
        yahoo.url = yahoo.checkUrl + ujs_seob.urlToken + yahoo.frameToken;
        yahoo.domain = 'search.yahoo.com';
        yahoo.deleteFrame = ujs_seob.removeFrames;
        yahoo.style = style;
        yahoo.IsObjectLoaded = function() {
          if(document.getElementById('web'))
          {
            return true;
          }
          return false;
        };
        yahoo.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('infotext');
          if(obj)
          {
            info = obj.innerText.match(/of\s*(?:about\s*)?([\d,\x20]+)\s*for/i);
            if(info && info.length > 1)
            {
              info = info[1].replace(/[\x20,]+/g, '');
              info = ujs_seob.groupDigits(info);
            }
          }
          return info;
        };
        yahoo.getDataFunction = ujs_seob.getIndexedPagesInfo;

        ///////////////////////////////////////////////////////////////
        // MSN Indexed Pages
        msn.msgPrefix = 'SEObar_index_Msn';
        msn.frameId = 'SEObar_index_msn_frame';
        msn.frameToken = 'indexMsn';
        msn.checkUrl = 'http://search.msn.com/results.aspx?q=site%3A' + host + '&setlang=en-US&go=Search&form=QBRE';
        msn.url = msn.checkUrl + ujs_seob.urlToken + msn.frameToken;
        msn.domain = 'search.msn.com';
        msn.deleteFrame = ujs_seob.removeFrames;
        msn.style = style;
        msn.IsObjectLoaded = function() {
          if(document.getElementById('results'))
          {
            return true;
          }
          return false;
        };
        msn.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('count');
          if(obj && obj.innerText)
          {
            var r = /of\s*([\d,]+)/i.exec(obj.innerText)
            if(r && r.length > 1)
            {
              info = r[1].replace(/,+/g, '');
              info = ujs_seob.groupDigits(info);
            }
          }
          return info;
        };
        msn.getDataFunction = ujs_seob.getIndexedPagesInfo;

        ///////////////////////////////////////////////////////////////
        // Yandex Indexed Pages
        yandex.msgPrefix = 'SEObar_index_Yandex';
        yandex.frameId = 'SEObar_index_yandex_frame';
        yandex.frameToken = 'indexYandex';
        yandex.checkUrl = 'http://www.yandex.ru/yandsearch?serverurl=' + host;
        yandex.url = yandex.checkUrl + ujs_seob.urlToken + yandex.frameToken;
        yandex.domain = 'yandex.ru';
        yandex.deleteFrame = ujs_seob.removeFrames;
        yandex.style = style;
        yandex.IsObjectLoaded = function() {
          var obj = document.getElementsByTagName('div');
          for(var i = 0; i < obj.length; i++)
          {
            if(obj.item(i).className == 'moreInfo')
              return true;
          }
          return false;
        };
        yandex.getDataFromDocumentFunction = function () {
          var info = '';
          var t = document.title;
          if(t)
          {
            var rank = t.match(/[\u043d\u041d][\u0430\u0410][\u0448\u0428][\u043b\u041b][\u043e\u041e][\u0441\u0421][\u044c\u042c]\s*(\d+)/i);
            if(rank && rank.length > 1)
            {
              rank = rank[1];
              if(t.search(/[\u0442\u0422][\u044b\u042b][\u0441\u0421]/i) != -1)
                rank += '000';
              else if(t.search(/[\u043c\u041c][\u043b\u041b][\u043d\u041d]/i) != -1)  
                rank += '000000';
                
              info += ujs_seob.groupDigits(rank.toString());  
            }
          }
          return info;
        };
        yandex.getDataFunction = ujs_seob.getIndexedPagesInfo;

        ///////////////////////////////////////////////////////////////
        // Rambler Indexed Pages
        rambler.msgPrefix = 'SEObar_index_Rambler';
        rambler.frameId = 'SEObar_index_rambler_frame';
        rambler.frameToken = 'indexRambler';
        rambler.checkUrl = 'http://www.rambler.ru/srch?words=&filter=' + host + '&sort=0';
        rambler.url = rambler.checkUrl + ujs_seob.urlToken + rambler.frameToken;
        rambler.domain = 'www.rambler.ru';
        rambler.deleteFrame = ujs_seob.removeFrames;
        rambler.style = style;
        rambler.IsObjectLoaded = function() {
          if(document.getElementById('resultsdiv'))
          {
            return true;
          }
          return false;
        };
        rambler.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementsByTagName('table');
          if(obj && obj.length > 0)
          {
            for(var i = 0; i < obj.length; i++)
            {
              if(obj.item(i).className == 'find')
              {
                var b = obj.item(i).getElementsByTagName('b');
                if(b && b.length > 0)
                {
                  var txt = b.item(0).innerText;
                  txt = txt.replace(/[\s,.]+/g, '');
                  var rank = parseInt(txt);
                  if(!isNaN(rank))
                  {
                    info += ujs_seob.groupDigits(rank.toString());
                  }
                }
                break;
              }
            }
          }
          return info;
        };
        rambler.getDataFunction = ujs_seob.getIndexedPagesInfo;
      }

      ///////////////////////////////////////////////////////////////
      // OTHER RATINGS
      with(ujs_seob.frame.other)
      {
        ///////////////////////////////////////////////////////////////
        // Technorati
        technorati.msgPrefix = 'SEObar_other_Technorati';
        technorati.frameId = 'SEObar_other_technorati_frame';
        technorati.frameToken = 'otherTechnorati';
        technorati.checkUrl = 'http://technorati.com/search/' + escape(url);
        technorati.url = technorati.checkUrl + ujs_seob.urlToken + technorati.frameToken;
        technorati.domain = 'technorati.com';
        technorati.deleteFrame = ujs_seob.removeFrames;
        technorati.style = style;
        technorati.IsObjectLoaded = function() {
          if(document.getElementById('collection'))
          {
            return true;
          }
          return false;
        };
        technorati.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('content');
          if(obj)
          {
            var h = obj.getElementsByTagName('h1');
            if(h && h.length > 0)
            {
              h = h[0];
              if(h.innerText)
              {
                var res = h.innerText.match(/([\d,]+)\s*blog\s+reactions/i);
                if(res && res.length > 1)
                {
                  info = res[1].replace(/,+/g, '');
                  info = ujs_seob.groupDigits(info);
                }
              }
            }
          }
          return info;
        };
        technorati.getDataFunction = ujs_seob.getOtherRatingsInfo;

        ///////////////////////////////////////////////////////////////
        // del.icio.us
        delicious.msgPrefix = 'SEObar_other_Delicious';
        delicious.frameId = 'SEObar_other_delicious_frame';
        delicious.frameToken = 'otherDelicious';
        delicious.checkUrl = 'http://delicious.com/url/view?url=' + encodeURIComponent(url);
        delicious.url = delicious.checkUrl + ujs_seob.urlToken + delicious.frameToken;
        delicious.domain = 'delicious.com';
        delicious.deleteFrame = ujs_seob.removeFrames;
        delicious.style = style;
        delicious.IsObjectLoaded = function() {
          if(document.getElementById('ft') || document.getElementById('footernavigation'))
          {
            return true;
          }          
          return false;
        };
        delicious.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementById('savedBy');
          if(obj)
          {
            var txt = obj.innerText;
            if(txt)
            {
              var t = '', n = '';
              var m = txt.match(/\s+([\d,]+)\s+times/i);
              if(m && m.length > 1)              
                t = ujs_seob.groupDigits(m[1]);
              
              m = txt.match(/\s+([\d,]+)\s+wrote\s+notes/i);              
              if(m && m.length > 1)
                n = ujs_seob.groupDigits(m[1]);

              if(t != '')
              {
                info = t;
                if(n != '')
                  info += ' (' + n + ' notes)';
              }
            }
          }
          return info;
        };
        delicious.getDataFunction = ujs_seob.getOtherRatingsInfo;

        ///////////////////////////////////////////////////////////////
        // Digg
        digg.msgPrefix = 'SEObar_other_Digg';
        digg.frameId = 'SEObar_other_digg_frame';
        digg.frameToken = 'otherDigg';
        digg.checkUrl = 'http://digg.com/search?s=' + encodeURIComponent(url) + '&submit=Search&section=all&type=all&area=all&sort=new';
        digg.url = digg.checkUrl + ujs_seob.urlToken + digg.frameToken;
        digg.domain = 'digg.com';
        digg.deleteFrame = ujs_seob.removeFrames;
        digg.style = style;
        digg.IsObjectLoaded = function() {
          if(document.getElementById('footer'))
          {
            return true;
          }
          return false;
        };
        digg.getDataFromDocumentFunction = function () {
          var info = '';
          var pages = 0;
          var obj = document.getElementsByTagName('div');
          for(var i = 0; i < obj.length; i++)
          {
            if(obj[i].className && obj[i].className == 'pages')
            {
              var a = obj[i].getElementsByTagName('a');
              for(var j = a.length - 1; j >= 0; j--)
              {
                if(a[j].innerText && a[j].innerText.search(/^\s*[\d,]+\s*$/) != -1)
                {
                  var res = a[j].innerText.match(/([\d,]+)/);
                  if(res && res.length > 1)
                  {
                    pages = res[1].replace(/,+/g, '');
                    pages = parseInt(pages);
                    if(isNaN(pages))
                      pages = 0;
                  }
                  break;
                }
              }
              break;
            }
          }

          var results = 0;
          obj = document.getElementsByTagName('div');
          for(var i = 0; i < obj.length; i++)
          {
            if(obj[i].className && obj[i].className == 'news-body')
              results++;
          }

          if(results > 0)
          {
            if(pages > 1)
            {
              results *= (pages - 1);
              results = '> ' + results.toString();
            }
            results = results.toString();
            info = results;
          }
          return info;
        };
        digg.getDataFunction = ujs_seob.getOtherRatingsInfo;

        ///////////////////////////////////////////////////////////////
        // Google's Cache
        googleCache.msgPrefix = 'SEObar_other_GoogleCache';
        googleCache.frameId = 'SEObar_other_googlecache_frame';
        googleCache.frameToken = 'otherGoogleCache';
        googleCache.checkUrl = 'http://google.com/search?hl=en&q=cache:' + encodeURIComponent(url);
        googleCache.url = googleCache.checkUrl + ujs_seob.urlToken + googleCache.frameToken;
        googleCache.domain = '';
        googleCache.deleteFrame = ujs_seob.removeFrames;
        googleCache.style = style;
        googleCache.IsObjectLoaded = function() {
          var h = document.getElementsByTagName('head');
          if(h && h.length > 0)
          {
            return true;
          }
          return false;
        };
        googleCache.getDataFromDocumentFunction = function () {
          var info = '';
          var obj = document.getElementsByTagName('div');
          if(obj && obj.length > 0)
          {
            if(obj[0].innerText && obj[0].innerText.search(/as it appeared on/i) != -1)
            {
              var res = obj[0].innerText.match(/as it appeared on\s*([\w\x20\:-]+)/i);
              if(res && res.length > 1)
              {
                info = res[1];
              }
            }
          }
          return info;
        };
        googleCache.getDataFunction = ujs_seob.getOtherRatingsInfo;

        ///////////////////////////////////////////////////////////////
        // Wayback Machine
        waybackMachine.msgPrefix = 'SEObar_other_WaybackMachine';
        waybackMachine.frameId = 'SEObar_other_waybackmachine_frame';
        waybackMachine.frameToken = 'otherWaybackMachine';
        waybackMachine.checkUrl = 'http://web.archive.org/archive_request_ng?collection=web&url=' + encodeURIComponent(url) + '&Submit=Take+Me+Back';
        waybackMachine.url = waybackMachine.checkUrl + ujs_seob.urlToken + waybackMachine.frameToken;
        waybackMachine.domain = 'web.archive.org';
        waybackMachine.deleteFrame = ujs_seob.removeFrames;
        waybackMachine.style = style;
        waybackMachine.IsObjectLoaded = function() {
          return false;
        };
        waybackMachine.getDataFromDocumentFunction = function () {
          var info = '';

          var from = '';
          var t = document.getElementsByTagName('td');
          for(var i = t.length - 1; i >= 0; i--)
          {
            if(t[i].className && t[i].className == 'mainBody')
            {
              var a = t[i].getElementsByTagName('a');
              if(a && a.length > 0 && a[0].innerText)
              {
                from = a[0].innerText;
              }
            }
          }

          var to = '';
          for(var i = 0; i < t.length; i++)
          {
            if(t[i].className && t[i].className == 'mainBody')
            {
              var a = t[i].getElementsByTagName('a');
              if(a && a.length > 0 && a[a.length - 1].innerText)
              {
                to = a[a.length - 1].innerText;
              }
            }
          }

          if(from || to)
          {
            info = from ? from : '?';
            info += ' - ';
            info += to ? to : '?';
          }
          return info;
        };
        waybackMachine.getDataFunction = ujs_seob.getOtherRatingsInfo;
      }

      ///////////////////////////////////////////////////////////////
      // SEOBAR UPDATE
      with(ujs_seob.frame)
      {
        seobarUpdate.msgPrefix = 'SEObar_update';
        seobarUpdate.frameId = 'SEObar_update_frame';
        seobarUpdate.frameToken = 'update';
        seobarUpdate.url = 'http://www.puzzleclub.ru/files/seobar/update.html' + ujs_seob.urlToken + seobarUpdate.frameToken;
        seobarUpdate.domain = 'www.puzzleclub.ru';
        seobarUpdate.deleteFrame = ujs_seob.removeFrames;
        seobarUpdate.style = '';
        seobarUpdate.IsObjectLoaded = function() {return false;};
        seobarUpdate.getDataFromDocumentFunction = function () {
          SEObarUpdateVersion = '0.00.00';
          SEObarUpdateVersionString = '';
          SEObarUpdateDate = '';
          SEObarUpdateUrl = '';
          SEObarDownloadUrl = '';
          SEObarUpdateInfo = new Array();
          SEObarUpdateImportantInfo = '';

          var id = 'SEObar_version_script';
          var url = 'http://www.puzzleclub.ru/files/seobar/seobar_version.js';
          if(!document.getElementById(id))
          {
            var s = document.createElement('script');
            s.setAttribute('id', id);
            s.setAttribute('type', 'text/javascript');
            s.setAttribute('src', url);
            s.setAttribute('style', 'display:none !important;');
            document.documentElement.appendChild(s);
          }

          var bUpdate = false;
          var ver1 = ujs_seob.version.exact.split('.');
          var ver2 = SEObarUpdateVersion.split('.');
          var l = ver1.length;
          if(l > ver2.length)
            l = ver2.length;

          for(var i = 0; i < l; i++)
          {
            var v1 = parseInt(ver1[i]);
            if(isNaN(v1))
              v1 = 0;

            var v2 = parseInt(ver2[i]);
            if(isNaN(v2))
              v2 = 0;

            if(v2 > v1)
            {
              bUpdate = true;
              break;
            }
            else if(v1 > v2)
              break;
          }

          var info = '<br /><br />';

          if(bUpdate)
          {
            info += '<b>Update available</b><br />';
            info += 'Version: ' + SEObarUpdateVersionString + '<br />';
            info += 'Date: ' + SEObarUpdateDate + '<br />';
            info += 'Download: ' + SEObarUpdateUrl + '<br /><br />';
            info += '<input type="button" value="Download" onclick="var wnd=window.open(\'' + SEObarDownloadUrl + '\');" />';


            if(SEObarUpdateInfo)
            {
              info += '<br /><br /><b>Information about this update:</b>';
              for(var i = 0; i < SEObarUpdateInfo.length; i++)
              {
                info += '<br />' + SEObarUpdateInfo[i];
              }
            }
          }
          else
          {
            info += 'There are no new updates available.';
            if(SEObarUpdateImportantInfo)
              info += '<br /><br />' + SEObarUpdateImportantInfo;
          }

         return info;
        };
        seobarUpdate.getDataFunction = ujs_seob.getUpdateInfo;
      }
    },

    getFrameObjects : function()
    {
      with(ujs_seob.frame)
      {
        var fo = [
          alexa, google, yandex,
          dir.dmoz, dir.yahoo, dir.yandex, dir.rambler,
          link.google, link.yahoo, link.yahooDomain, link.msn, link.msnDomain, link.yandex,
          index.google, index.yahoo, index.msn, index.yandex, index.rambler,
          other.technorati, other.delicious, other.digg, other.googleCache, other.waybackMachine,
          seobarUpdate
        ];
        return fo;
      }
    },

    removeObject : function(id)
    {
      var obj = document.getElementById(id);
      if(obj)
        obj.parentNode.removeChild(obj);
    },


    toggleOptionsSections : function(obj, from, to)
    {
      var v = obj.value, stDisplay = '';
      if(escape(v) == '%u2212')
      {
        stDisplay = 'none';
        v = '+';
      }
      else
      {
        v = unescape('%u2212');
      }

      var tbl = document.getElementById('SEObar_panel_addon_options_rep');
      if(tbl)
      {
        var tr = tbl.getElementsByTagName('tr');
        if(tr && tr.length > 0)
        {
          if(from < 0)
            from = 0;
          if(to >= tr.length)
            to = tr.length - 1;

          for(var i = from; i <= to; i++)
          {
            tr[i].style.display = stDisplay;
          }
          obj.value = v;
        }
      }
    },

    toggleObj : function(id)
    {
      var obj = document.getElementById(id);
      if(!obj)
        return -1;

      if(obj.style.display == 'none')
      {
        obj.style.display = '';
        return 1;
      }
      else
      {
        obj.style.display = 'none';
        return 0;
      }
    },

    toggleTextarea : function(id, text)
    {
      var res = ujs_seob.toggleObj(id);
      if(res == 1)
        return '(Hide)';
      else if(res == 0)
        return '(Show)';
      else
        return text;
    },

    closeSEObar : function()
    {
      ujs_seob.removeObject(ujs_seob.panelId);
      ujs_seob.removeObject(ujs_seob.mainStyleId);
      ujs_seob.removeObject(ujs_seob.highlightStyleId);
    },

    getOptions : function(btnOptions, btnClose)
    {
      var html = btnOptions + '&nbsp;' + btnClose;

      var getRadioBtn = function(i) {
        return '<td><input type="radio" name="' + ujs_seob.opRepresentation[i][1] + '" /></td>';
      };

      var getRadioBtn3 = function(i)
      {
        return getRadioBtn(i) + getRadioBtn(i) + getRadioBtn(i);
      }

      var disableScript = '<label style="display: none !important;"><input type="checkbox" name="' + ujs_seob.op[0][1] + '" value="Disable Script"/>&nbsp;Disable script</label>';
      if(!ujs_seob.bDisableScriptByPanelCollapse)
      {
        disableScript = '<label><input type="checkbox" name="' + ujs_seob.op[0][1] + '" value="Disable Script"/>&nbsp;Disable script</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
      }

      var storeRatings = '<label title="Keep domain ratings in cookies to minimize the use of traffic. By default the ratings are updated 1 each day."><input type="checkbox" name="' + ujs_seob.op[1][1] + '" value="Store Domain Ratings" />&nbsp;Store domain ratings</label>';
      var checkFakePR = '<label><input type="checkbox" name="' + ujs_seob.op[2][1] + '" value="Check Fake PR" />&nbsp;Check fake Google PR</label>';

      var alexaRank = '<td><input type="radio" name="' + ujs_seob.opRepresentation[0][1]  + '" onclick="ujs_seob.onOptionsAlexaRankClick()" /></td>';            
      var yandexValue = '<td><input type="radio" name="' + ujs_seob.opRepresentation[3][1] + '" onclick="ujs_seob.onOptionsYandexTcyClick()" /></td>';
      var yandexRank = '<td><input type="radio" name="' + ujs_seob.opRepresentation[4][1] + '" onclick="ujs_seob.onOptionsYandexTcyClick()" /></td>';
      var panelLocation = '<td><input type="radio" name="' + ujs_seob.opPosition[0][1] + '" /></td>';
      var panelPosition = '<input type="radio" name="' + ujs_seob.opPosition[1][1] + '" />';

      var options = (
        '<div id="SEObar_panel_addon">'
        +'<form name="' + ujs_seob.opFormId + '" method="get" action="" onsubmit="return false;">'
        +disableScript
        +storeRatings
        +'<br><br>'  + checkFakePR
        +'<br /><br />'
        +'<table class="main"><tr><td class="left">'
        +'<fieldset><legend>Elements Representation</legend>'
        +'<div class="overflow" style="' + ujs_seob.style.scrollbar + '">'
        +'<table class="options" id="SEObar_panel_addon_options_rep"><tr><th>Panel&nbsp;Elements&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>Always</th><th>By&nbsp;request</th><th>Never</th></tr>'
        +'<tr><td colspan="4" class="SEObar_panel_subhdr"><input type="button" value="&minus;" class="SEObar_panel_sbtn" onclick="javascript:ujs_seob.toggleOptionsSections(this, 2, 7);"/>&nbsp;Ratings</td></tr>'
        +'<tr><td>Alexa&nbsp;rank</td>' + alexaRank + alexaRank + alexaRank + '</tr>'
        +'<tr><td>Alexa&nbsp;domain&nbsp;name</td>' + getRadioBtn3(1) + '</tr>'
        +'<tr><td>Google&nbsp;page&nbsp;rank</td>' + getRadioBtn3(2) + '</tr>'        
        +'<tr><td>Yandex&nbsp;tCY&nbsp;value</td>' + yandexValue + yandexValue + yandexValue + '</tr>'
        +'<tr><td>Yandex&nbsp;rank</td>' + yandexRank + yandexRank + yandexRank + '</tr>'
        +'<tr><td>Yandex&nbsp;additional&nbsp;info</td>' + getRadioBtn3(5) + '</tr>'

        +'<tr><td colspan="4" class="SEObar_panel_subhdr"><input type="button" value="&minus;" class="SEObar_panel_sbtn" onclick="javascript:ujs_seob.toggleOptionsSections(this, 9, 13);"/>&nbsp;Indexed Pages&nbsp</td></tr>'
        +'<tr><td>Google</td>' + getRadioBtn3(16) + '</tr>'
        +'<tr><td>Yahoo</td>' + getRadioBtn3(17) + '</tr>'
        +'<tr><td>MSN</td>' + getRadioBtn3(18) + '</tr>'
        +'<tr><td>Yandex</td>' + getRadioBtn3(19) + '</tr>'
        +'<tr><td>Rambler</td>' + getRadioBtn3(20) + '</tr>'

        +'<tr><td colspan="4" class="SEObar_panel_subhdr"><input type="button" value="&minus;" class="SEObar_panel_sbtn" onclick="javascript:ujs_seob.toggleOptionsSections(this, 15, 20);"/>&nbsp;Backward Links&nbsp</td></tr>'
        +'<tr><td>Google</td>' + getRadioBtn3(10) + '</tr>'
        +'<tr><td>Yahoo! URL</td>' + getRadioBtn3(11) + '</tr>'
        +'<tr><td>Yahoo! domain</td>' + getRadioBtn3(12) + '</tr>'
        +'<tr><td>MSN URL</td>' + getRadioBtn3(13) + '</tr>'
        +'<tr><td>MSN domain</td>' + getRadioBtn3(14) + '</tr>'
        +'<tr><td>Yandex</td>' + getRadioBtn3(15) + '</tr>'


        +'<tr><td colspan="4" class="SEObar_panel_subhdr"><input type="button" value="&minus;" class="SEObar_panel_sbtn" onclick="javascript:ujs_seob.toggleOptionsSections(this, 22, 25);"/>&nbsp;Directories</td></tr>'
        +'<tr><td>DMOZ</td>' + getRadioBtn3(6) + '</tr>'
        +'<tr><td>Yahoo!&nbsp;directory</td>' + getRadioBtn3(7) + '</tr>'
        +'<tr><td>Yandex&nbsp;catalogue</td>' + getRadioBtn3(8) + '</tr>'
        +'<tr><td>Rambler&nbsp;Top100</td>' + getRadioBtn3(9) + '</tr>'

        +'<tr><td colspan="4" class="SEObar_panel_subhdr"><input type="button" value="&minus;" class="SEObar_panel_sbtn" onclick="javascript:ujs_seob.toggleOptionsSections(this, 27, 31);"/>&nbsp;Other</td></tr>'
        +'<tr><td>Technorati</td>' + getRadioBtn3(25) + '</tr>'
        +'<tr><td>del.icio.us</td>' + getRadioBtn3(26) + '</tr>'
        +'<tr><td>Digg</td>' + getRadioBtn3(27) + '</tr>'
        +'<tr><td>Google\'s cache</td>' + getRadioBtn3(28) + '</tr>'
        +'<tr><td>Wayback machine</td>' + getRadioBtn3(29) + '</tr>'

        +'<tr><td colspan="4" class="SEObar_panel_subhdr"><input type="button" value="&minus;" class="SEObar_panel_sbtn" onclick="javascript:ujs_seob.toggleOptionsSections(this, 33, 36);"/>&nbsp;Controls</td></tr>'
        +'<tr><td>Button&nbsp;&quot;Ratings&quot;</td>' + getRadioBtn3(23) + '</tr>'
        +'<tr><td>Button&nbsp;&quot;Tools&quot;</td>' + getRadioBtn3(24) + '</tr>'
        +'<tr><td>Button&nbsp;&quot;Refresh&quot;</td>' + getRadioBtn3(22) + '</tr>'
        +'<tr><td>Button&nbsp;"Options"</td>' + getRadioBtn(21) + getRadioBtn(21) + '<td></td></tr>'

        +'</table></div></fieldset>'

        +'</td><td><fieldset><legend>Panel Position</legend>'
        +'<table class="options"><tr>' + panelLocation + panelLocation + '</tr><tr>' + panelLocation + panelLocation + '</tr></table>'
        +'<br />'
        +'<label>' + panelPosition + '&nbsp;Fixed</label><br /><label>' + panelPosition + '&nbsp;Absolute</label>'
        +'</fieldset>'
        +'</td></table><br />'
        +'<div class="line"></div>'        
        +'<div class="right">'
        +'<input type="button" value="Delete SEObar\'s data" title="" onclick="ujs_seob.deleteData();" style="float: left !important;" title="Delete cookies where SeoBar stores it\'s data. You should delete the cookies if any script malfunctions occur or when updating the script."/>'
        +'<input type="button" value="OK" class="SEObar_panel_btn" onMouseUp="ujs_seob.saveOptions();ujs_seob.bShowOptions=false;ujs_seob.setPanelData();ujs_seob.setStatusbarData();" />&nbsp;'
        +'<input type="button" value="Cancel" class="SEObar_panel_btn" onMouseUp="ujs_seob.bShowOptions=false;ujs_seob.setPanelData();ujs_seob.setStatusbarData();" />'
        +'</div>'
        +'<br /><span class="SEObar_panel_gray_text">Storage domain: ' + ujs_seob.fakeDomain + '</span>'
        +'</form></div>'
      );

      html += options;
      return html;
    },

    getRatingTabs : function()
    {
      var tabs = new Array('', '', '', '', '');
      tabs[ujs_seob.currentRatingTab] = ' id="selected_tab"';
      var ratings = '<div id="SEObar_panel_addon_h2">Ratings</div>';

      var aa = ujs_seob.anchorAttribute.name + '="' + ujs_seob.anchorAttribute.value + '"';
      ratings += '<ul id="SEObar_tabs">';
      ratings += '<li' + tabs[1] + ' class="first_tab"><a href="#" ' + aa + ' onMouseUp="ujs_seob.currentRatingTab = 1; ujs_seob.setPanelData(); ujs_seob.getIndexedPagesInfo();">Indexed&nbsp;Pages</a></li>';
      ratings += '<li' + tabs[2] + '><a href="#" ' + aa + ' onMouseUp="ujs_seob.currentRatingTab = 2; ujs_seob.setPanelData(); ujs_seob.getBackwardLinksInfo();">Backward&nbsp;Links</a></li>';
      ratings += '<li' + tabs[3] + '><a href="#" ' + aa + ' onMouseUp="ujs_seob.currentRatingTab = 3; ujs_seob.setPanelData(); ujs_seob.getDirectoriesInfo();">Directories</a></li>';
      ratings += '<li' + tabs[4] + '><a href="#" ' + aa + ' onMouseUp="ujs_seob.currentRatingTab = 4; ujs_seob.setPanelData(); ujs_seob.getOtherRatingsInfo();">Other</a></li>';
      ratings += '</ul>';

      ratings += '<div id="tab_content" style="' + ujs_seob.style.scrollbar + '">';

      switch(ujs_seob.currentRatingTab)
      {
        case 0:
          break;
        case 1:
          if(ujs_seob.bInitRatings)
          {
            ujs_seob.bInitRatings = false;
            ujs_seob.getIndexedPagesInfo();
          }
          ratings += ujs_seob.getIndexedPages();
          break;
        case 2:
          if(ujs_seob.bInitRatings)
          {
            ujs_seob.bInitRatings = false;
            ujs_seob.getBackwardLinksInfo();
          }
          ratings += ujs_seob.getBackwardLinks();
          break;
        case 3:
          if(ujs_seob.bInitRatings)
          {
            ujs_seob.bInitRatings = false;
            ujs_seob.getDirectoriesInfo();
          }
          ratings += ujs_seob.getDirectories();
          break;
        case 4:
          if(ujs_seob.bInitRatings)
          {
            ujs_seob.bInitRatings = false;
            ujs_seob.getOtherRatingsInfo();
          }
          ratings += ujs_seob.getOtherRatings();
          break;
        default:
          ujs_seob.currentRatingTab = 0;
          ujs_seob.setPanelData();
          break;
      }
      ratings += '</div>';

      return '<div id="SEObar_panel_addon">' + ratings + '</div>';
    },

    getToolTabs : function()
    {
      var tabs = new Array('', '', '', '', '', '');
      tabs[ujs_seob.currentToolTab] = ' id="selected_tab"';
      var tools = '';
      tools += '<div id="SEObar_panel_addon_h2">Tools</div>';

      var aa = ujs_seob.anchorAttribute.name + '="' + ujs_seob.anchorAttribute.value + '"';
      tools += '<ul id="SEObar_tabs">';
      tools += '<li' + tabs[0] + ' class="first_tab"><a href="#" ' + aa + ' onMouseUp="ujs_seob.currentToolTab = 0; ujs_seob.setPanelData();">General</a></li>';
      tools += '<li' + tabs[1] + '><a href="#" ' + aa + ' onMouseUp="ujs_seob.currentToolTab = 1; ujs_seob.setPanelData();">Link&nbsp;Statistics</a></li>';
      tools += '<li' + tabs[2] + '><a href="#" ' + aa + ' onMouseUp="ujs_seob.currentToolTab = 2; ujs_seob.setPanelData();">Meta&nbsp;Tags</a></li>';
      tools += '<li' + tabs[3] + '><a href="#" ' + aa + ' onMouseUp="ujs_seob.currentToolTab = 3; ujs_seob.getHttpHeaders();">HTTP&nbsp;Headers</a></li>';
      tools += '<li' + tabs[4] + '><a href="#" ' + aa + ' onMouseUp="ujs_seob.currentToolTab = 4; ujs_seob.setPanelData();">SEObar</a></li>';
      tools += '</ul>';

      tools += '<div id="tab_content" style="' + ujs_seob.style.scrollbar + '">';

      switch(ujs_seob.currentToolTab)
      {
        case 0:
          tools += '<table>';
          // noindex
          var checked = '';
          if(ujs_seob.highlightNoindex)
          {
            checked = 'checked';
          }
          tools += '<tr><td class="hdr" noborder><label><input type="checkbox" value="noindex" ' + checked + ' onclick="ujs_seob.highlightNoindex = this.checked; ujs_seob.putPreferencesToStorage(); ujs_seob.highlightElements();">&nbsp;Highlight&nbsp;&quot;noindex&quot;</label></td>';
          tools += '<td noborder><span style="' + ujs_seob.style.noindex + ujs_seob.style.highlight + '">[example]</span></td></tr>';
          // nofollow
          checked = '';
          if(ujs_seob.highlightNofollow)
          {
            checked = 'checked';
          }
          tools += '<tr><td class="hdr" noborder><label><input type="checkbox" value="nofollow" ' + checked + ' onclick="ujs_seob.highlightNofollow = this.checked; ujs_seob.putPreferencesToStorage(); ujs_seob.highlightElements();">&nbsp;Highlight&nbsp;&quot;nofollow&quot;</label></td>';
          tools += '<td noborder><span style="' + ujs_seob.style.nofollow + ujs_seob.style.highlight + '">[example]</span></td></tr>';
          // external links
          checked = '';
          if(ujs_seob.highlightExternalLinks)
          {
            checked = 'checked';
          }
          tools += '<td class="hdr" noborder><label><input type="checkbox" value="external_links" ' + checked + ' onclick="ujs_seob.highlightExternalLinks = this.checked; ujs_seob.putPreferencesToStorage(); ujs_seob.highlightElements();">&nbsp;Highlight&nbsp;external&nbsp;links</label></td>';
          tools += '<td noborder><span style="' + ujs_seob.style.external + ujs_seob.style.highlight + '">[example]</span></td></tr>';
          tools += '</table><br /><br />';

          tools += '<table>';
          // Whois
          var whois = ujs_seob.whoisUrl.replace(/%s{1}/, document.location.protocol + '//' + document.location.host);
          tools += '<tr><td class="hdr" noborder><input type="button" value="Whois" onMouseUp="var wnd=window.open(\'' + whois + '\');" /></td>';
          tools += '<td noborder><input type="button" value="SEOmoz" onMouseUp="var wnd=window.open(\'http://www.seomoz.org/page-strength/' + window.location.href + '\');" /></td></tr>';
          // Robots.txt
          tools += '<tr><td class="hdr" noborder><input type="button" value="Robots.txt" onMouseUp="var wnd=window.open(\'' + document.location.protocol + '//' + document.location.host + '/robots.txt\');" /></td>';
          tools += '<td noborder><input type="button" value="SmartPageRank" onMouseUp="var wnd=window.open(\'http://www.smartpagerank.com/result.php?domain=' + window.location.hostname + '\');" /></td></tr>';
          // Google's cache
          tools += '<tr><td class="hdr" noborder><input type="button" value="Google\'s cache" onMouseUp="var wnd=window.open(\'http://google.com/search?q=cache:' + document.location.href + '\');" /></td>'
          tools += '<td noborder><input type="button" value="Multi PR" title="Multi Datacenter Page Rank" onMouseUp="ujs_seob.multiDatacenterPR();" /></td></tr>';

          tools += '</table>';
          break;
        case 1:
          tools += ujs_seob.getLinkStatistics();
          break;
        case 2:
          tools += ujs_seob.getMetaTags();
          break;
        case 3:
          tools += ujs_seob.httpHeaders;
          break;
        case 4:
          tools += ujs_seob.getSeobarInfo() + ujs_seob.seobarUpdateInfo;
          break;
        default:
          ujs_seob.currentToolTab = 0;
          ujs_seob.setPanelData();
          break;
      }
      tools += '</div>';

      return '<div id="SEObar_panel_addon">' + tools + '</div>';
    },

    getMainRatings : function(th)
    {
      var aa = ujs_seob.anchorAttribute.name + '="' + ujs_seob.anchorAttribute.value + '"';
      var ratings = '';

      var alexa = ujs_seob.formatAlexa(th);
      if(alexa)
      {
        ratings += '<b>Alexa</b>:&nbsp;';
        ratings += '<a href="' + ujs_seob.frame.alexa.checkUrl + '" ' + aa + '>';
        ratings += alexa + '</a>' + '&nbsp;&nbsp;&nbsp;';
      }

      var google = ujs_seob.formatData(ujs_seob.googlePR, ujs_seob.opRepresentation[2][0], th);
      if(google)
      {
        var url1 = 'http://www.google.com/search?hl=en&q=info:' + encodeURIComponent(window.location.href) + '&btnG=Search';
        var url2 = 'http://google.com/search?hl=en&q=cache:' + encodeURIComponent(window.location.href);
        var onclick = 'ujs_seob.checkForFakePR(\u0027' + url1 + '\u0027, \u0027' + url2 + '\u0027);'

        if(ujs_seob.googleRealUrl)
          ratings += '<b class="pointer" style="color:#f00 !important;" title="Fake PR! Real URL: ' + ujs_seob.googleRealUrl + '" onclick="' + onclick + '">Google</b>:&nbsp;';
        else  
          ratings += '<b class="pointer" onclick="' + onclick + '">Google</b>:&nbsp;';
          
        ratings += '<a href="' + ujs_seob.frame.google.checkUrl + '" ' + aa + '>' + google + '</a>&nbsp;&nbsp;&nbsp;';
      }

      var yandex = ujs_seob.formatYandex(th);
      if(yandex)
      {
        var url = 'http://search.yaca.yandex.ru/yca/cy/ch/' + ujs_seob.getDomainName(window.location.host) + '/';
        var onclick = 'var w = window.open(); w.location.href = \x27' + url + '\x27';
        
        if(ujs_seob.yandexRealDomain)        
          ratings += '<b class="pointer" style="color:#f00 !important;" title="Fake tCY! Real domain: ' + ujs_seob.yandexRealDomain + '" onclick="' + onclick + '">Yandex</b>:&nbsp;';
        else
          ratings += '<b class="pointer" onclick="' + onclick + '">Yandex</b>:&nbsp;';
          
        ratings += '<a href="' + ujs_seob.frame.yandex.checkUrl + '"';
        if(ujs_seob.yandexInfo && ujs_seob.opRepresentation[5][0] <= th)
        {
          ratings += ' title="' + ujs_seob.yandexInfo + '" ';
        }
        ratings += aa + '>' + yandex + '</a>' + '&nbsp;&nbsp;&nbsp;';
      }

      return ratings;
    },

    setPanelData : function()
    {
      if(!ujs_seob.bPanel)
        return;

      var p = document.getElementById(ujs_seob.panelId);
      if(!p)
        return;

      p.innerHTML = '';

      var d = '';
      var grip = ujs_seob.getGripBtn();
      var btnOptions = ujs_seob.getOptionsBtn();
      var btnClose = '<input type="button" value="&times;" class="SEObar_panel_sbtn" title="Close" onMouseUp="javascript: ujs_seob.closeSEObar()" />';

      if(ujs_seob.bShowOptions)
      {
        var box = document.createElement('div');
        box.id = 'SEObar_panel_box';
        box.innerHTML = ujs_seob.getOptions(btnOptions, btnClose);
        p.appendChild(box);
        ujs_seob.setFormValues();
        return;
      }

      if(ujs_seob.bCollapsedPanel)
      {
        var box = document.createElement('div');
        box.id = 'SEObar_panel_box';
        box.innerHTML = grip;
        p.appendChild(box);
         return;
      }

      var btnMoreLess = '';
      if(ujs_seob.isMoreLessBtnRequired())
        btnMoreLess = ujs_seob.getMoreLessBtn();

      var th = ujs_seob.getTh(ujs_seob.bMore);
      d = grip + '&nbsp;';
      d += ujs_seob.getMainRatings(th);

      if(ujs_seob.opRepresentation[22][0] <= th)
      {
        d += '<input type="button" value="&#8629;" class="SEObar_panel_sbtn" title="Refresh" onMouseUp="ujs_seob.refreshRatings()" />&nbsp;';
      }

      if(ujs_seob.opRepresentation[23][0] <= th)
      {
        d += ujs_seob.getRatingsBtn() + '&nbsp;';
      }

      if(ujs_seob.opRepresentation[24][0] <= th)
      {
        d += ujs_seob.getToolsBtn() + '&nbsp;';
      }

      if(ujs_seob.opRepresentation[21][0] <= th)
      {
        d += btnOptions;
      }

      d += btnMoreLess;

      d += btnClose;

      if(this.bRatings)
      {
        d += ujs_seob.getRatingTabs();
      }
      else if(this.bTools)
      {
        d += ujs_seob.getToolTabs();
      }

      var box = document.createElement('div');
      box.id = 'SEObar_panel_box';
      box.innerHTML = d;
      p.appendChild(box);
    },

    setStatusbarData : function()
    {
      if(!ujs_seob.bStatusbar)
        return;

      if(ujs_seob.op[0][0])
      {
        window.defaultStatus = '';
        return;
      }

      var s = '';
      var th = ujs_seob.getTh(ujs_seob.bMore);

      var alexa = ujs_seob.formatAlexa(th);
      if(alexa)
      {
        s += 'Alexa: ' + alexa + '   ';
      }

      var google = ujs_seob.formatData(ujs_seob.googlePR,
        ujs_seob.opRepresentation[2][0], th);
      if(google)
      {
        s += 'Google: ' + google + '   ';
      }

      var yandex = ujs_seob.formatYandex(th);
      if(yandex)
      {
        s += 'Yandex: ' + yandex;
        if(ujs_seob.showYandexInfoInStatusbar && ujs_seob.yandexInfo &&
          ujs_seob.opRepresentation[5][0] <= th)
        {
          s += ' [' + ujs_seob.yandexInfo + ']';
        }
      }

      if(s)
          window.defaultStatus = s;

    },

    getTh : function(bMore)
    {
      return  (bMore) ? 1 : 0;
    },

    isMoreLessBtnRequired : function()
    {
      for(var i = 0; i < ujs_seob.opRep.main.length; i++)
      {
        if(ujs_seob.opRepresentation[ujs_seob.opRep.main[i]][0] == 1)
        {
          return true;
        }
      }

      return false;
    },

    isDirMoreLessBtnRequired : function()
    {
      for(var i = 0; i < ujs_seob.opRep.directories.length; i++)
      {
        if(ujs_seob.opRepresentation[ujs_seob.opRep.directories[i]][0] == 1)
        {
          return true;
        }
      }

      return false;
    },

    isLinkMoreLessBtnRequired : function()
    {
      for(var i = 0; i < ujs_seob.opRep.backwardLinks.length; i++)
      {
        if(ujs_seob.opRepresentation[ujs_seob.opRep.backwardLinks[i]][0] == 1)
        {
          return true;
        }
      }

      return false;
    },

    isIndexMoreLessBtnRequired : function()
    {
      for(var i = 0; i < ujs_seob.opRep.indexedPages.length; i++)
      {
        if(ujs_seob.opRepresentation[ujs_seob.opRep.indexedPages[i]][0] == 1)
        {
          return true;
        }
      }

      return false;
    },

    isOtherMoreLessBtnRequired : function()
    {
      for(var i = 0; i < ujs_seob.opRep.otherRatings.length; i++)
      {
        if(ujs_seob.opRepresentation[ujs_seob.opRep.otherRatings[i]][0] == 1)
        {
          return true;
        }
      }

      return false;
    },

    getMoreLessBtn : function()
    {
      var v = '&laquo;', t = 'More';
      if(ujs_seob.bMore)
      {
        v = '&raquo;';
        t = 'Less';
      }
      return '<input type="button" value="' + v + '" class="SEObar_panel_sbtn" title="' + t + '" onMouseUp="ujs_seob.onMoreLessData()" />&nbsp;';
    },

    getSecButtons : function(bShowMoreLessButton, bMore, onMouseUp, onRefresh)
    {
      var v = 'More', t = 'More';
      if(bMore)
      {
        v = 'Less';
        t = 'Less';
      }
      var ret = '<br /><div class="right">'
      ret += '<input type="button" value="Refresh" class="SEObar_panel_btn" title="Refresh" onMouseUp="' + onRefresh + '" />';

      if(bShowMoreLessButton)
      {
        ret += '&nbsp;';
        ret += '<input type="button" value="' + v + '" class="SEObar_panel_btn" title="' + t + '" onMouseUp="' + onMouseUp + '" />'
      }
      ret += '</div>';

      return ret;
    },

    getGripBtn : function()
    {
      var v = '&minus;', t = 'Collapse';
      if(ujs_seob.bCollapsedPanel)
      {
        v = '+';
        t = 'Expand';
      }
      return '<input type="button" value="' + v + '" class="SEObar_panel_sbtn" title="' + t + '" onMouseUp="ujs_seob.onExpandCollapsePanel()" />';
    },

    getOptionsBtn : function()
    {
      var sel = '';
      if(ujs_seob.bShowOptions)
        sel = 'selected';

      return '<input type="button" value="Options" class="SEObar_panel_btn" ' + sel + ' onMouseUp="ujs_seob.onOptions()" />&nbsp;';
    },

    getRatingsBtn : function()
    {
      var sel = '';
      if(ujs_seob.bRatings)
        sel = 'selected';

      return '<input type="button" value="R" title="Ratings" class="SEObar_panel_sbtn" ' + sel + ' onMouseUp="ujs_seob.onRatings()" />';
    },

    getToolsBtn : function()
    {
      var sel = '';
      if(ujs_seob.bTools)
        sel = 'selected';

      return '<input type="button" value="T" title="Tools" class="SEObar_panel_sbtn" ' + sel + ' onMouseUp="ujs_seob.onTools()" />';
    },

    onExpandCollapsePanel : function()
    {
      ujs_seob.bCollapsedPanel = !ujs_seob.bCollapsedPanel;
      if(ujs_seob.bDisableScriptByPanelCollapse)
        ujs_seob.op[0][0] = ujs_seob.bCollapsedPanel;

      if(!ujs_seob.op[0][0])
      {
        ujs_seob.getRatings();
      }

      ujs_seob.setPanelData();
      ujs_seob.setStatusbarData();
      ujs_seob.putPreferencesToStorage();
    },

    onMoreLessData : function()
    {
      ujs_seob.bMore = !ujs_seob.bMore;

      if(ujs_seob.bMore)
      {
        ujs_seob.getRatings();
      }

      ujs_seob.setPanelData();
      ujs_seob.setStatusbarData();
    },

    onDirMoreLessData : function()
    {
      ujs_seob.bMoreDirectories = !ujs_seob.bMoreDirectories;

      if(ujs_seob.bMoreDirectories)
      {
        ujs_seob.getDirectoriesInfo();
      }

      ujs_seob.setPanelData();
    },

    onLinkMoreLessData : function()
    {
      ujs_seob.bMoreBackwardLinks = !ujs_seob.bMoreBackwardLinks;

      if(ujs_seob.bMoreBackwardLinks)
      {
        ujs_seob.getBackwardLinksInfo();
      }

      ujs_seob.setPanelData();
    },

    onIndexMoreLessData : function()
    {
      ujs_seob.bMoreIndexedPages = !ujs_seob.bMoreIndexedPages;

      if(ujs_seob.bMoreIndexedPages)
      {
        ujs_seob.getIndexedPagesInfo();
      }

      ujs_seob.setPanelData();
    },

    onOtherMoreLessData : function()
    {
      ujs_seob.bMoreOtherRatings = !ujs_seob.bMoreOtherRatings;

      if(ujs_seob.bMoreOtherRatings)
      {
        ujs_seob.getOtherRatingsInfo();
      }

      ujs_seob.setPanelData();
    },

    onOptions : function()
    {
      ujs_seob.bShowOptions = !ujs_seob.bShowOptions;
      ujs_seob.setPanelData();
      ujs_seob.setStatusbarData();
    },

    onRatings : function()
    {
      ujs_seob.bTools = false;
      ujs_seob.bRatings = !ujs_seob.bRatings;

      ujs_seob.setPanelData();
      ujs_seob.setStatusbarData();
    },

    onTools : function()
    {
      ujs_seob.bRatings = false;
      ujs_seob.bTools = !ujs_seob.bTools;

      ujs_seob.setPanelData();
      ujs_seob.setStatusbarData();
    },

    setFormValues : function()
    {
      var f = document.forms[ujs_seob.opFormId];
      if(!f)
        return;

      f.elements[ujs_seob.op[0][1]].checked = ujs_seob.op[0][0];
      f.elements[ujs_seob.op[1][1]].checked = ujs_seob.op[1][0];
      f.elements[ujs_seob.op[2][1]].checked = ujs_seob.op[2][0];
      

      for(var i = 0; i < ujs_seob.opRepresentation.length; i++)
      {
        f.elements[ujs_seob.opRepresentation[i][1]][ujs_seob.opRepresentation[i][0]].checked = true;
      }

      for(var i = 0; i < ujs_seob.opPosition.length; i++)
      {
        f.elements[ujs_seob.opPosition[i][1]][ujs_seob.opPosition[i][0]].checked = true;
      }
    },

    onOptionsAlexaRankClick : function()
    {
      var f = document.forms[ujs_seob.opFormId];
      var d = f.elements[ujs_seob.opRepresentation[1][1]];

      var i1 = 0, i2 = 0;
      for(var k = 0; k < d.length; k++)
      {
        if(f.elements[ujs_seob.opRepresentation[0][1]][k].checked)
          i1 = k;
        if(d[k].checked)
          i2 = k;
      }

      if(i2 < i1)
      {
        d[i2].checked = false;
        d[i1].checked = true;
      }

      var dis = true;
      for(k = 0; k < d.length; k++)
      {
        if(i1 == k)
          dis = false;

        d[k].disabled = dis;
      }
    },

    onOptionsYandexTcyClick : function()
    {
      var f = document.forms[ujs_seob.opFormId];
      var ai = f.elements[ujs_seob.opRepresentation[5][1]];

      var i1 = 0, i2 = 0, i3 = 0;
      for(var k = 0; k < ai.length; k++)
      {
        if(f.elements[ujs_seob.opRepresentation[3][1]][k].checked)
          i1 = k;
        if(f.elements[ujs_seob.opRepresentation[4][1]][k].checked)
          i2 = k;
        if(ai[k].checked)
          i3 = k;
      }

      if(i2 < i1)
        i1 = i2;

      if(i3 < i1)
      {
        ai[i3].checked = false;
        ai[i1].checked = true;
      }

      var dis = true;
      for(k = 0; k < ai.length; k++)
      {
        if(i1 == k)
          dis = false;

        ai[k].disabled = dis;
      }
    },

    saveOptions : function()
    {
      var f = document.forms[ujs_seob.opFormId];
      if(f)
      {
        ujs_seob.op[0][0] = f.elements[ujs_seob.op[0][1]].checked;
        ujs_seob.op[1][0] = f.elements[ujs_seob.op[1][1]].checked;
        ujs_seob.op[2][0] = f.elements[ujs_seob.op[2][1]].checked;

        for(var i = 0; i < ujs_seob.opRepresentation.length; i++)
        {
          ujs_seob.opRepresentation[i][0] = 0;
          var e = f.elements[ujs_seob.opRepresentation[i][1]];

          for(var j = 0; j < e.length; j++)
          {
            if(e[j].checked)
            {
              ujs_seob.opRepresentation[i][0] = j;
            }
          }
        }

        var loc = ujs_seob.opPosition[0][0];
        var pos = ujs_seob.opPosition[1][0];

        for(var i = 0; i < ujs_seob.opPosition.length; i++)
        {
          var e = f.elements[ujs_seob.opPosition[i][1]];

          for(var j = 0; j < e.length; j++)
          {
            if(e[j].checked)
            {
              ujs_seob.opPosition[i][0] = j;
            }
          }
        }

        if(loc != ujs_seob.opPosition[0][0])
          ujs_seob.setPanelLocation();

        if(pos != ujs_seob.opPosition[1][0])
          ujs_seob.setPanelPosition();
      }

      ujs_seob.putPreferencesToStorage();
    },

    setPanelLocation : function()
    {
      var p = document.getElementById(ujs_seob.panelId);
      if(!p)
        return;

      var sa = 'auto !important', s0 = '0 !important';
      switch(ujs_seob.opPosition[0][0])
      {
        case 0:
          p.style.top = s0;
          p.style.bottom = sa;
          p.style.left = s0;
          p.style.right = sa;
          break;
        case 1:
          p.style.top = s0;
          p.style.bottom = sa;
          p.style.left = sa;
          p.style.right = s0;
          break;
        case 2:
          p.style.top = sa;
          p.style.bottom = s0;
          p.style.left = s0;
          p.style.right = sa;
          break;
        case 3:
          p.style.top = sa;
          p.style.bottom = s0;
          p.style.left = sa;
          p.style.right = s0;
          break;
        default:
          p.style.top = s0;
          p.style.bottom = sa;
          p.style.left = s0;
          p.style.right = sa;
      }
    },

    setPanelPosition : function()
    {
      var p = document.getElementById(ujs_seob.panelId);
      if(!p)
        return;

      if(ujs_seob.opPosition[1][0] == 1)
        p.style.position = 'absolute !important';
      else
        p.style.position = 'fixed !important';
    },

    getDataFromStorage : function(data, id)
    {
      if(id == ujs_seob.stateCookie)
      {
        if(!data)
        {
          ujs_seob.storage.loadData(ujs_seob.preferencesCookie, ujs_seob.preferencesCookie);
          return;
        }

        ujs_seob.SEObarState = (data == 'false') ? false : true;

        ujs_seob.storage.loadData(ujs_seob.preferencesCookie, ujs_seob.preferencesCookie);
      }
      else if(id == ujs_seob.preferencesCookie)
      {
        if(!data)
        {
          ujs_seob.storage.loadData(ujs_seob.domainCookie, ujs_seob.domainCookie);
          return;
        }

        var v = data.split('**');
        if(v.length >= 2)
        {
          var count1 = parseInt(v[0]);
          if(!isNaN(count1))
          {
            // version, collapsed, disable script, store domain ratings, check fake PR, highlight (noindex, nofollow, external links)
            var count2 = 8; 
            count2 += ujs_seob.opRepresentation.length;
            count2 += ujs_seob.opPosition.length;

            if(count1 == count2)
            {
              v = v[1].split('-');
              if(v.length == count1)
              {
                var bContinue = true;
                // version
                if(v[0] != ujs_seob.version.exact)
                {
                  if(confirm('New version of SEOBAR was installed. Do you want to delete an old data (recommended)?'))
                  {
                    ujs_seob.deleteData();
                    bContinue = false;
                  }
                }
                
                if(bContinue)
                {                
                  // collapsed
                  ujs_seob.bCollapsedPanel = (v[1] == 'false') ? false : true;
                  // disable script
                  ujs_seob.op[0][0] = (v[2] == 'false') ? false : true;
                  // store domain ratings
                  ujs_seob.op[1][0] = (v[3] == 'false') ? false : true;
                  // check fake PR
                  ujs_seob.op[2][0] = (v[4] == 'false') ? false : true;                  
                  // highlight
                  ujs_seob.highlightNoindex = (v[5] == 'false') ? false : true;
                  ujs_seob.highlightNofollow = (v[6] == 'false') ? false : true;
                  ujs_seob.highlightExternalLinks = (v[7] == 'false') ? false : true;

                  // Elements Representation
                  var offset = 8;
                  for(var i = 0; i < ujs_seob.opRepresentation.length; i++)
                  {
                    var val = parseInt(v[i + offset]);
                    if(!isNaN(val))
                    {
                      ujs_seob.opRepresentation[i][0] = val;
                    }
                  }
                  offset += ujs_seob.opRepresentation.length;

                  // Panel Position
                  for(var i = 0; i < ujs_seob.opPosition.length; i++)
                  {
                    var val = parseInt(v[i + offset]);
                    if(!isNaN(val))
                    {
                      ujs_seob.opPosition[i][0] = val;
                    }
                  }
                  offset += ujs_seob.opPosition.length;
                }  
              }
            }
          }
        }

        ujs_seob.storage.loadData(ujs_seob.domainCookie, ujs_seob.domainCookie);
      }
      else if(id == ujs_seob.domainCookie)
      {
        if(ujs_seob.op[1][0])
        {
          ujs_seob.getDomainRatings();
          ujs_seob.init();
          return;
        }

        if(!data)
        {
          ujs_seob.init();
          return;
        }

        var v = data.split('**');
        if(v.length >= 2)
        {
          var count1 = parseInt(v[0]);
          if(!isNaN(count1))
          {
            var count2 = 1; // domain name
            count2 += ujs_seob.domainData.length;

            if(count1 == count2)
            {
              v = v[1].split('\t');
              if(v.length == count1)
              {
                if(v[0] == document.location.host)
                {
                  for(var i = 0; i < ujs_seob.domainData.length; i++)
                  {
                    var str = 'if(!' + ujs_seob.domainData[i] + ' && v[i + 1])';
                    str += ujs_seob.domainData[i] + '=' + 'v[i + 1]';
                    eval(str);
                  }
                }
              }
            }
          }
        }

        ujs_seob.init();
      }
    },

    putStateToStorage : function()
    {
      ujs_seob.storage.saveData(ujs_seob.SEObarState, ujs_seob.stateCookie);
    },

    switchState : function()
    {
      ujs_seob.SEObarState = !ujs_seob.SEObarState;
      ujs_seob.putStateToStorage();

      if(!ujs_seob.SEObarState)
        ujs_seob.closeSEObar();
      else
      {
        ujs_seob.bInit = false;
        ujs_seob.init();
      }
    },

    putPreferencesToStorage : function()
    {
      var d = ['ujs_seob.version.exact', 'ujs_seob.bCollapsedPanel', 'ujs_seob.op[0][0]', 'ujs_seob.op[1][0]', 'ujs_seob.op[2][0]', 'ujs_seob.highlightNoindex', 'ujs_seob.highlightNofollow', 'ujs_seob.highlightExternalLinks'];
      var v = '', count = d.length, sep = '';
      for(var i = 0; i < d.length; i++)
      {
        v += sep + eval(d[i]);
        sep = '-';
      }

      for(var i = 0; i < ujs_seob.opRepresentation.length; i++)
      {
        v += '-' + ujs_seob.opRepresentation[i][0].toString();
      }
      count += ujs_seob.opRepresentation.length;

      for(var i = 0; i < ujs_seob.opPosition.length; i++)
      {
        v += '-' + ujs_seob.opPosition[i][0].toString();
      }

      count += ujs_seob.opPosition.length;
      v = count.toString() + '**' + v;

      ujs_seob.storage.saveData(v, ujs_seob.preferencesCookie);
    },

    putDomainInfoToStorage : function()
    {
      if(ujs_seob.op[1][0])
      {
        ujs_seob.storeDomainRatings();
        return;
      }

      var count = 0;
      var v = document.location.host;
      count++;
      for(var i = 0; i < ujs_seob.domainData.length; i++)
      {
        v += '\t' + eval(ujs_seob.domainData[i]);
      }
      count += ujs_seob.domainData.length;
      v = count.toString() + '**' + v;

      ujs_seob.storage.saveData(v, ujs_seob.domainCookie);
    },

    deleteData : function()
    {
      ujs_seob.storage.deleteData(ujs_seob.stateCookie);
      ujs_seob.storage.deleteData(ujs_seob.preferencesCookie);
      ujs_seob.storage.deleteData(ujs_seob.domainCookie);
    },

    getDomainRatings : function()
    {
      var data = ujs_seob.getCookie(ujs_seob.domainRatingCookie);
      if(!data)
        return;

      var v = data.split('**');
      if(v.length < 2)
        return;

      var count = parseInt(v[0]);
      if(isNaN(count))
        return;

      if(count != ujs_seob.domainData.length)
        return;

      v = v[1].split('\t');
      if(v.length != count)
        return;

      for(var i = 0; i < ujs_seob.domainData.length; i++)
      {
        var str = ujs_seob.domainData[i] + '=' + 'v[i]';
        eval(str);
      }
    },

    storeDomainRatings : function()
    {
      var v = ujs_seob.domainData.length.toString() + '**';
      var sep = '';
      for(var i = 0; i < ujs_seob.domainData.length; i++)
      {
        v += sep + eval(ujs_seob.domainData[i]);
        sep = '\t';
      }

      var exp = new Date();
      var msec = exp.getTime();
      msec += ujs_seob.domainRatingStorageTime * 60000;
      exp = new Date(msec);
      ujs_seob.setCookie(ujs_seob.domainRatingCookie, v, exp, window.location.host);
    },

    checkBodyChildrenHeight : function()
    {
      if(!ujs_seob.isOpera9())
        return;

      if(!document.body)
        return;

      var c = document.body.children;
      for(var i = 0; i < c.length; i++)
      {
        var h = c[i].currentStyle.height;
        if(h == '100%' || h == '-100px')
        {
          c[i].style.height = 'auto !important';
        }
      }
    },

    init : function()
    {
      if(!ujs_seob.SEObarState)
        return;

      ujs_seob.checkBodyChildrenHeight();

      if(ujs_seob.bInit)
        return;

      ujs_seob.bInit = true;

      if(ujs_seob.bDisableScriptByPanelCollapse)
        ujs_seob.op[0][0] = ujs_seob.bCollapsedPanel;

      if(ujs_seob.bPanel)
      {
        ujs_seob.createStyle();
        // create panel
        var panel = document.createElement('DIV');
        panel.id = ujs_seob.panelId;
        document.documentElement.appendChild(panel);
        ujs_seob.setPanelData();
      }

      if(ujs_seob.bStatusbar)
      {
        ujs_seob.setStatusbarData();
      }

      ujs_seob.highlightElements();

      if(ujs_seob.op[0][0])
        return;

      ujs_seob.getRatings();
    },

    getNextValue : function(variable, func, id)
    {
      if(eval(variable) != ujs_seob.busyRank)
        return;

      func('', id);
    },

    stopBusyIndicator : function(variable)
    {
      if(eval(variable) != ujs_seob.busyRank)
        return;

      eval(variable + "=''");
      ujs_seob.setPanelData();
    },

    setBusyState : function(variable, func, id)
    {
      with(ujs_seob)
      {
        eval(variable + '="' + busyRank + '";');
        setPanelData();
        setTimeout(getNextValue, getNextValueDelay, variable, func, id);
        setTimeout(stopBusyIndicator, busyWaitDelay, variable);
      }
    },

    getRatings : function(data, id)
    {
      var th = ujs_seob.getTh(ujs_seob.bMore);
      if(!id)
        id = 1;

      with(ujs_seob)
      {
        switch(id)
        {
          case 1:
          {
            if(opRepresentation[0][0] <= th && !alexaRank)
            {
              setBusyState('ujs_seob.alexaRank', getRatings, id + 1);
              getInfoFromFrame(frame.alexa);
            }
            else
            {
              getRatings('', 2);
            }
            return;
          }

          case frame.alexa.frameToken:
          {
            parseAlexaData(data);
            getRatings('', 2);
            return;
          }

          case 2:
          {
            if(opRepresentation[2][0] <= th && !googlePR)
            {
              setBusyState('ujs_seob.googlePR', getRatings, id + 1);
              getInfoFromFrame(frame.google);
            }
            else
            {
              getRatings('', 3);
            }
            return;
          }

          case frame.google.frameToken:
          {
            parseGoogleData(data);
            getRatings('', 3);
            return;
          }

          case 3:
          {
            if((opRepresentation[3][0] <= th && !yandexCY) ||
              (opRepresentation[4][0] <= th && !yandexRank))
            {
              setBusyState('ujs_seob.yandexCY', getRatings, id + 1);
              getInfoFromFrame(frame.yandex);
            }
            return;
          }

          case frame.yandex.frameToken:
          {
            parseYandexData(data);
            return;
          }
        }
      }
    },

    getDirectoriesInfo : function(data, id)
    {
      var th = ujs_seob.getTh(ujs_seob.bMoreDirectories);
      if(!id)
      {
        id = 1;
      }

      with(ujs_seob)
      {
        switch(id)
        {
          case 1:
          {
            if(opRepresentation[6][0] <= th && !dirDmoz)
            {
              setBusyState('ujs_seob.dirDmoz', getDirectoriesInfo, id + 1);
              getInfoFromFrame(frame.dir.dmoz);
            }
            else
            {
              getDirectoriesInfo('', 2);
            }
            return;
          }

          case frame.dir.dmoz.frameToken:
          {
            dirDmoz = parseData(data);
            setPanelData();

            getDirectoriesInfo('', 2);
            return;
          }

          case 2:
          {
            if(opRepresentation[7][0] <= th && !dirYahoo)
            {
              setBusyState('ujs_seob.dirYahoo', getDirectoriesInfo, id + 1);
              getInfoFromFrame(frame.dir.yahoo);
            }
            else
            {
              getDirectoriesInfo('', 3);
            }
            return;
          }

          case frame.dir.yahoo.frameToken:
          {
            dirYahoo = parseData(data);
            setPanelData();

            getDirectoriesInfo('', 3);
            return;
          }

          case 3:
          {
            if(opRepresentation[8][0] <= th && !dirYandex)
            {
              setBusyState('ujs_seob.dirYandex', getDirectoriesInfo, id + 1);
              getInfoFromFrame(frame.dir.yandex);
            }
            else
            {
              getDirectoriesInfo('', 4);
            }
            return;
          }

          case frame.dir.yandex.frameToken:
          {
            dirYandex = parseData(data);
            setPanelData();

            getDirectoriesInfo('', 4);
            return;
          }

          case 4:
          {
            if(opRepresentation[9][0] <= th && !dirRambler)
            {
              setBusyState('ujs_seob.dirRambler', getDirectoriesInfo, id + 1);
              getInfoFromFrame(frame.dir.rambler);
            }
            else
            {
              getDirectoriesInfo('', 5);
            }
            return;
          }

          case frame.dir.rambler.frameToken:
          {
            dirRambler = parseData(data);
            setPanelData();

            getDirectoriesInfo('', 5);
            return;
          }
        }
      }
    },

    getBackwardLinksInfo : function(data, id)
    {
      var th = ujs_seob.getTh(ujs_seob.bMoreBackwardLinks);
      if(!id)
      {
        id = 1;
      }

      with(ujs_seob)
      {
        switch(id)
        {
          case 1:
          {
            if(opRepresentation[10][0] <= th && !linkGoogle)
            {
              setBusyState('ujs_seob.linkGoogle', getBackwardLinksInfo, id + 1);
              getInfoFromFrame(frame.link.google);
            }
            else
            {
              getBackwardLinksInfo('', 2);
            }
            return;
          }

          case frame.link.google.frameToken:
          {
            linkGoogle = parseData(data);
            setPanelData();
            putDomainInfoToStorage();

            getBackwardLinksInfo('', 2);
            return;
          }

          case 2:
          {
            if(opRepresentation[11][0] <= th && !linkYahooUrl)
            {
              setBusyState('ujs_seob.linkYahooUrl', getBackwardLinksInfo, id + 1);
              getInfoFromFrame(frame.link.yahoo);
            }
            else
            {
              ujs_seob.getBackwardLinksInfo('', 3);
            }
            return;
          }

          case frame.link.yahoo.frameToken:
          {
            linkYahooUrl = parseData(data);
            setPanelData();

            getBackwardLinksInfo('', 3);
            return;
          }

          case 3:
          {
            if(opRepresentation[12][0] <= th && !linkYahooDomain)
            {
              setBusyState('ujs_seob.linkYahooDomain', getBackwardLinksInfo, id + 1);
              getInfoFromFrame(frame.link.yahooDomain);
            }
            else
            {
              getBackwardLinksInfo('', 4);
            }
            return;
          }

          case frame.link.yahooDomain.frameToken:
          {
            linkYahooDomain = parseData(data);
            setPanelData();
            putDomainInfoToStorage();

            getBackwardLinksInfo('', 4);
            return;
          }

          case 4:
          {
            if(opRepresentation[13][0] <= th && !linkMsnURL)
            {
              setBusyState('ujs_seob.linkMsnURL', getBackwardLinksInfo, id + 1);
              getInfoFromFrame(frame.link.msn);
            }
            else
            {
              getBackwardLinksInfo('', 5);
            }
            return;
          }

          case frame.link.msn.frameToken:
          {
            linkMsnURL  = parseData(data);
            setPanelData();

            getBackwardLinksInfo('', 5);
            return;
          }

          case 5:
          {
            if(opRepresentation[14][0] <= th && !linkMsnDomain)
            {
              setBusyState('ujs_seob.linkMsnDomain', getBackwardLinksInfo, id + 1);
              getInfoFromFrame(frame.link.msnDomain);
            }
            else
            {
              getBackwardLinksInfo('', 6);
            }
            return;
          }

          case frame.link.msnDomain.frameToken:
          {
            linkMsnDomain   = parseData(data);
            setPanelData();
            putDomainInfoToStorage();

            getBackwardLinksInfo('', 6);
            return;
          }

          case 6:
          {
            if(opRepresentation[15][0] <= th && !linkYandex)
            {
              setBusyState('ujs_seob.linkYandex', getBackwardLinksInfo, id + 1);
              getInfoFromFrame(frame.link.yandex);
            }
            else
            {
              getBackwardLinksInfo('', 7);
            }
            return;
          }

          case frame.link.yandex.frameToken:
          {
            linkYandex = parseData(data);
            setPanelData();

            getBackwardLinksInfo('', 7);
            return;
          }
        }
      }
    },

    getIndexedPagesInfo : function(data, id)
    {
      var th = ujs_seob.getTh(ujs_seob.bMoreIndexedPages);
      if(!id)
      {
        id = 1;
      }

      with(ujs_seob)
      {
        switch(id)
        {
          case 1:
          {
            if(opRepresentation[16][0] <= th && !indexGoogle)
            {
              setBusyState('ujs_seob.indexGoogle', getIndexedPagesInfo, id + 1);
              getInfoFromFrame(frame.index.google);
            }
            else
            {
              getIndexedPagesInfo('', 2);
            }
            return;
          }

          case frame.index.google.frameToken:
          {
            indexGoogle = parseData(data);
            setPanelData();
            putDomainInfoToStorage();

            getIndexedPagesInfo('', 2);
            return;
          }

          case 2:
          {
            if(opRepresentation[17][0] <= th && !indexYahoo)
            {
              setBusyState('ujs_seob.indexYahoo', getIndexedPagesInfo, id + 1);
              getInfoFromFrame(frame.index.yahoo);
            }
            else
            {
              getIndexedPagesInfo('', 3);
            }
            return;
          }

          case frame.index.yahoo.frameToken:
          {
            indexYahoo = parseData(data);
            setPanelData();
            putDomainInfoToStorage();

            getIndexedPagesInfo('', 3);
            return;
          }

          case 3:
          {
            if(opRepresentation[18][0] <= th && !indexMsn)
            {
              setBusyState('ujs_seob.indexMsn', getIndexedPagesInfo, id + 1);
              getInfoFromFrame(frame.index.msn);
            }
            else
            {
              getIndexedPagesInfo('', 4);
            }
            return;
          }

          case frame.index.msn.frameToken:
          {
            indexMsn = parseData(data);
            setPanelData();
            putDomainInfoToStorage();

            getIndexedPagesInfo('', 4);
            return;
          }

          case 4:
          {
            if(opRepresentation[19][0] <= th && !indexYandex)
            {
              setBusyState('ujs_seob.indexYandex', getIndexedPagesInfo, id + 1);
              getInfoFromFrame(frame.index.yandex);
            }
            else
            {
              getIndexedPagesInfo('', 5);
            }
            return;
          }

          case frame.index.yandex.frameToken:
          {
            indexYandex = parseData(data);
            setPanelData();
            putDomainInfoToStorage();

            getIndexedPagesInfo('', 5);
            return;
          }

          case 5:
          {
            if(opRepresentation[20][0] <= th && !indexRambler)
            {
              setBusyState('ujs_seob.indexRambler', getIndexedPagesInfo, id + 1);
              getInfoFromFrame(frame.index.rambler);
            }
            else
            {
              getIndexedPagesInfo('', 6);
            }
            return;
          }

          case frame.index.rambler.frameToken:
          {
            indexRambler = parseData(data);
            setPanelData();
            putDomainInfoToStorage();

            getIndexedPagesInfo('', 6);
            return;
          }
        }
      }
    },

    getOtherRatingsInfo : function(data, id)
    {
      var th = ujs_seob.getTh(ujs_seob.bMoreOtherRatings);
      if(!id)
      {
        id = 1;
      }

      with(ujs_seob)
      {
        switch(id)
        {
          case 1:
          {
            if(opRepresentation[25][0] <= th && !technorati)
            {
              setBusyState('ujs_seob.technorati', getOtherRatingsInfo, id + 1);
              getInfoFromFrame(frame.other.technorati);
            }
            else
            {
              getOtherRatingsInfo('', 2);
            }
            return;
          }

          case frame.other.technorati.frameToken:
          {
            technorati = parseData(data);
            setPanelData();

            getOtherRatingsInfo('', 2);
            return;
          }

          case 2:
          {
            if(opRepresentation[26][0] <= th && !delicious)
            {
              setBusyState('ujs_seob.delicious', getOtherRatingsInfo, id + 1);
              getInfoFromFrame(frame.other.delicious);
            }
            else
            {
              getOtherRatingsInfo('', 3);
            }
            return;
          }

          case frame.other.delicious.frameToken:
          {
            delicious = parseData(data);
            setPanelData();

            getOtherRatingsInfo('', 3);
            return;
          }

          case 3:
          {
            if(opRepresentation[27][0] <= th && !digg)
            {
              setBusyState('ujs_seob.digg', getOtherRatingsInfo, id + 1);
              getInfoFromFrame(frame.other.digg);
            }
            else
            {
              getOtherRatingsInfo('', 4);
            }
            return;
          }

          case frame.other.digg.frameToken:
          {
            digg = parseData(data);
            setPanelData();

            getOtherRatingsInfo('', 4);
            return;
          }

          case 4:
          {
            if(opRepresentation[28][0] <= th && !googleCache)
            {
              setBusyState('ujs_seob.googleCache', getOtherRatingsInfo, id + 1);
              getInfoFromFrame(frame.other.googleCache);
            }
            else
            {
              ujs_seob.getOtherRatingsInfo('', 5);
            }
            return;
          }

          case frame.other.googleCache.frameToken:
          {
            googleCache = parseData(data);
            setPanelData();

            getOtherRatingsInfo('', 5);
            return;
          }

          case 5:
          {
            if(opRepresentation[29][0] <= th && !waybackMachine)
            {
              setBusyState('ujs_seob.waybackMachine', getOtherRatingsInfo, id + 1);
              getInfoFromFrame(frame.other.waybackMachine);
            }
            else
            {
              getOtherRatingsInfo('', 6);
            }
            return;
          }

          case frame.other.waybackMachine.frameToken:
          {
            waybackMachine = parseData(data);
            setPanelData();

            getOtherRatingsInfo('', 6);
            return;
          }
        }
      }
    },

    getUpdateInfo : function(data, id)
    {
      if(!id)
      {
        ujs_seob.getInfoFromFrame(ujs_seob.frame.seobarUpdate);
      }
      else if(ujs_seob.frame.seobarUpdate.frameToken)
      {
        if(data != undefined)
          ujs_seob.seobarUpdateInfo = data;

        ujs_seob.setPanelData();
      }
    },

    refreshRatings : function()
    {
      with(ujs_seob)
      {
        alexaRank = '';
        googlePR = '';
        googleRealUrl = '';
        yandexCY = '';
        yandexRank = '';
        yandexInfo = '';
        yandexRealDomain = '';

        setPanelData();
        getRatings();
      }
    },

    refreshDirectoriesInfo : function()
    {
      with(ujs_seob)
      {
        dirDmoz = '';
        dirYahoo = '';
        dirYandex = '';
        dirRambler = '';

        setPanelData();
        getDirectoriesInfo();
      }
    },

    refreshBackwardLinksInfo : function()
    {
      with(ujs_seob)
      {
        linkGoogle = '';
        linkYahooUrl = '';
        linkYahooDomain = '';
        linkMsnURL = '';
        linkMsnDomain = '';
        linkYandex = '';

        setPanelData();
        getBackwardLinksInfo();
      }
    },

    refreshIndexedPagesInfo : function()
    {
      with(ujs_seob)
      {
        indexGoogle = '';
        indexYahoo = '';
        indexMsn = '';
        indexYandex = '';
        indexRambler = '';

        setPanelData();
        getIndexedPagesInfo();
      }
    },

    refreshOtherRatingsInfo : function()
    {
      with(ujs_seob)
      {
        technorati = '';
        delicious = '';
        digg = '';
        googleCache = '';
        waybackMachine = '';

        setPanelData();
        getOtherRatingsInfo();
      }
    },

    getInfoFromFrame : function(frameObj)
    {
      var obj = document.getElementById(frameObj.frameId);
      if(obj)
        frameObj.getData(frameObj.frameToken);
      else
        frameObj.createFrame();
    },

    parseData : function(data)
    {
      if(!data)
        return ujs_seob.undefinedRank;
      else
        return data;
    },

    parseAlexaData : function(data)
    {
      var d = data.split(ujs_seob.frame.alexa.dataSeparator);
      if(d.length > 0)
        ujs_seob.alexaRank = d[0];
      if(d.length > 1)
        ujs_seob.alexaDomain = d[1];

      if(!ujs_seob.alexaRank)
      {
        ujs_seob.alexaRank = ujs_seob.undefinedRank;
      }

      ujs_seob.setStatusbarData();
      ujs_seob.setPanelData();
      ujs_seob.putDomainInfoToStorage();
    },

    parseGoogleData : function(data)
    {
      if(data.indexOf('|') != -1)
      {
        var p = data.split('|');
        if(p.length > 0)
          ujs_seob.googlePR = p[0];
        if(p.length > 1)
          ujs_seob.googleRealUrl = p[1];
          
        if(ujs_seob.removeFrames)  
        {
          var f = document.getElementById(ujs_seob.frame.google.frameId);
          if(f)
            f.parentNode.removeChild(f);
        }
      }
      else
        ujs_seob.googlePR = data;
        
      if(!ujs_seob.googlePR)
      {
        ujs_seob.googlePR = ujs_seob.undefinedRank;
      }

      ujs_seob.setStatusbarData();
      ujs_seob.setPanelData();
    },

    parseYandexData : function(data)
    {
      var d = data.split('#'), tcy = '', info = '';
      if(d.length > 0)
      {
        tcy = d[0].split('|');
        if(tcy.length > 0)
          ujs_seob.yandexCY = tcy[0];
        if(tcy.length > 1)
          ujs_seob.yandexRank = tcy[1];
        if(tcy.length > 2) 
        {
          var d1 = tcy[2].replace(/^www\./i, '');
          var d1 = d1.replace(/\:\d+$/, '');
          var d1 = d1.toLowerCase();
          
          var d2 = window.location.hostname.replace(/^www\./i, '');
          d2 = d2.toLowerCase();
          
          if(d1 != d2)
          {                    
            ujs_seob.yandexRealDomain = tcy[2];
          }  
        }  
      }
      if(d.length > 1)
      {
        ujs_seob.yandexInfo = d[1];
      }

      if(!ujs_seob.yandexCY)
        ujs_seob.yandexCY = ujs_seob.undefinedRank;

      if(!ujs_seob.yandexRank)
        ujs_seob.yandexRank = ujs_seob.undefinedRank;

      ujs_seob.setStatusbarData();
      ujs_seob.setPanelData();
      ujs_seob.putDomainInfoToStorage();
    },

    formatData : function(data, rep, th)
    {
      var d = '';
      if(rep <= th)
      {
        if(data)
        {
          if(data == ujs_seob.busyRank)
            d = ujs_seob.getBusyIndicator();
          else
            d = data;
        }
        else
          d = ujs_seob.unrequestedRank;
      }

      return d;
    },

    formatAlexa : function(th)
    {
      var a = '';

      if(ujs_seob.opRepresentation[0][0] <= th)
      {
        if(ujs_seob.alexaRank == ujs_seob.busyRank)
          return ujs_seob.getBusyIndicator();

        if(ujs_seob.alexaRank)
          a = ujs_seob.alexaRank;
        else
          return ujs_seob.unrequestedRank;

        if(ujs_seob.opRepresentation[1][0] <= th)
        {
          if(ujs_seob.alexaDomain)
            a += ' | ' + ujs_seob.alexaDomain;
        }
      }

      return a;
    },

    formatYandex : function(th)
    {
      var v = '', r = '';

      if(ujs_seob.opRepresentation[3][0] <= th)
      {
        if(ujs_seob.yandexCY == ujs_seob.busyRank)
          return ujs_seob.getBusyIndicator();

        if(ujs_seob.yandexCY)
          v = ujs_seob.yandexCY;
        else
          v = ujs_seob.unrequestedRank;
      }

      if(ujs_seob.opRepresentation[4][0] <= th)
      {
        if(ujs_seob.yandexRank == ujs_seob.busyRank)
          return ujs_seob.getBusyIndicator();

        if(ujs_seob.yandexRank)
          r = ujs_seob.yandexRank;
        else
          r = ujs_seob.unrequestedRank;
      }

      if(v == ujs_seob.unrequestedRank && v == r)
        return ujs_seob.unrequestedRank;

      if(v && r)
        return v + ' | ' + r;

      if(v)
        return v;

      if(r)
        return r;

      return '';
    },

    groupDigits : function(number)
    {
      if(number.length <= 3)
        return number;

      var r = number.length % 3;
      var n = Math.floor(number.length / 3);
      var i = 0;

      var res = '';
      if(r > 0)
      {
        res += number.substr(i, r);
        i += r;
        res += ujs_seob.digitGroupingSymbol;
      }

      var sep = '';
      for(var k = 0; k < n; k++)
      {
        res += sep;
        sep = ujs_seob.digitGroupingSymbol;
        res += number.substr(i, 3);
        i += 3;
      }

      return res;
    },

    reloadImage : function(src)
    {
      if(!src)
        return;

      var img = new Image();
      img.src = src;

      if(src.search(/data\/image/i) != -1)
      {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", src, true);
        xmlhttp.send();
        return;
      }
      else
      {
        var f = document.createElement('iframe');
        f.src = img.src;
        f.width = 0;
        f.height = 0;
        f.frameBorder = 'no';
        f.scrolling = 'no';
        f.onload = function(){
          this.parentNode.removeChild(this);
        };
        document.documentElement.appendChild(f);
      }
    },

    getBusyIndicator : function()
    {
      if(ujs_seob.busyIndicator.useImage)
      {
        ujs_seob.reloadImage(ujs_seob.busyIndicator.image);
        return '<img alt="wait" title="" src="' + ujs_seob.busyIndicator.image + '" />';
      }
      else
        return ujs_seob.busyIndicator.text;
    },

    getIndexedPages : function()
    {
      var indTh = ujs_seob.getTh(ujs_seob.bMoreIndexedPages);
      var ind = '<table>';

      var indData = [
        ['Google', 16, ujs_seob.indexGoogle, ujs_seob.frame.index.google],
        ['Yahoo!', 17, ujs_seob.indexYahoo, ujs_seob.frame.index.yahoo],
        ['MSN', 18, ujs_seob.indexMsn, ujs_seob.frame.index.msn],
        ['Yandex', 19, ujs_seob.indexYandex, ujs_seob.frame.index.yandex],
        ['Rambler', 20, ujs_seob.indexRambler, ujs_seob.frame.index.rambler]
      ];

      for(var i = 0; i < indData.length; i++)
      {
        var val = ujs_seob.formatData(indData[i][2],
          ujs_seob.opRepresentation[indData[i][1]][0], indTh);
        if(val)
        {
          ind += '<tr><td class="hdr">' + indData[i][0] + '</td><td>';
          ind += '<a href="' + indData[i][3].getUrl() + '">' + val + '</a></td></tr>';
        }
      }

      ind += '</table>';

      var btnInd = ujs_seob.getSecButtons(ujs_seob.isIndexMoreLessBtnRequired(),
        ujs_seob.bMoreIndexedPages, 'ujs_seob.onIndexMoreLessData()',
        'ujs_seob.refreshIndexedPagesInfo()');

      ind += btnInd;
      return ind;
    },

    getBackwardLinks : function()
    {
      var linkTh = ujs_seob.getTh(ujs_seob.bMoreBackwardLinks);
      var link = '<table>';

      var linkData = [
        ['Google', 10, ujs_seob.linkGoogle, ujs_seob.frame.link.google],
        ['Yahoo!&nbsp;<span class="SEObar_panel_gray_text">(URL)</span>', 11, ujs_seob.linkYahooUrl, ujs_seob.frame.link.yahoo],
        ['Yahoo!&nbsp;<span class="SEObar_panel_gray_text">(domain)</span>', 12, ujs_seob.linkYahooDomain, ujs_seob.frame.link.yahooDomain],
        ['MSN&nbsp;<span class="SEObar_panel_gray_text">(URL)</span>', 13, ujs_seob.linkMsnURL, ujs_seob.frame.link.msn],
        ['MSN&nbsp;<span class="SEObar_panel_gray_text">(domain)</span>', 14, ujs_seob.linkMsnDomain, ujs_seob.frame.link.msnDomain],
        ['Yandex&nbsp;<span class="SEObar_panel_gray_text">(pages&nbsp;|&nbsp;sites)</span>', 15, ujs_seob.linkYandex, ujs_seob.frame.link.yandex]
      ];

      for(var i = 0; i < linkData.length; i++)
      {
        var val = ujs_seob.formatData(linkData[i][2],
          ujs_seob.opRepresentation[linkData[i][1]][0], linkTh);
        if(val)
        {
          link += '<tr><td class="hdr">' + linkData[i][0] + '</td><td>';
          link += '<a href="' + linkData[i][3].getUrl() + '">' + val + '</a></td></tr>';
        }
      }

      link += '</table>';

      var btnLink = ujs_seob.getSecButtons(ujs_seob.isLinkMoreLessBtnRequired(),
        ujs_seob.bMoreBackwardLinks, 'ujs_seob.onLinkMoreLessData()',
        'ujs_seob.refreshBackwardLinksInfo()');

      link += btnLink;
      return link;
    },

    getDirectories : function()
    {
      var dirTh = ujs_seob.getTh(ujs_seob.bMoreDirectories);
      var dir = '<table>';

      var dirData = [
        ['DMOZ', 6, ujs_seob.dirDmoz, ujs_seob.frame.dir.dmoz],
        ['Yahoo!', 7, ujs_seob.dirYahoo, ujs_seob.frame.dir.yahoo],
        ['Yandex', 8, ujs_seob.dirYandex, ujs_seob.frame.dir.yandex],
        ['Rambler', 9, ujs_seob.dirRambler, ujs_seob.frame.dir.rambler]
      ];

      for(var i = 0; i < dirData.length; i++)
      {
        var val = ujs_seob.formatData(dirData[i][2],
          ujs_seob.opRepresentation[dirData[i][1]][0], dirTh);
        if(val)
        {
          dir += '<tr><td class="hdr">' + dirData[i][0] + '<br />';
          dir += '<a href="' + dirData[i][3].getUrl() + '">link</a></td><td>';
          dir += val + '</td></tr>';
        }
      }

      dir += '</table>';

      var btnDir = ujs_seob.getSecButtons(ujs_seob.isDirMoreLessBtnRequired(),
        ujs_seob.bMoreDirectories, 'ujs_seob.onDirMoreLessData()',
        'ujs_seob.refreshDirectoriesInfo()');

      dir += btnDir;
      return dir;
    },

    getOtherRatings : function()
    {
      var otherTh = ujs_seob.getTh(ujs_seob.bMoreOtherRatings);
      var other = '<table>';

      var otherData = [
        ['Technorati', 25, ujs_seob.technorati, ujs_seob.frame.other.technorati],
        ['del.icio.us', 26, ujs_seob.delicious, ujs_seob.frame.other.delicious],
        ['Digg', 27, ujs_seob.digg, ujs_seob.frame.other.digg],
        ['Google\'s cache', 28, ujs_seob.googleCache, ujs_seob.frame.other.googleCache],
        ['Wayback machine', 29, ujs_seob.waybackMachine, ujs_seob.frame.other.waybackMachine]
      ];

      for(var i = 0; i < otherData.length; i++)
      {
        var val = ujs_seob.formatData(otherData[i][2], ujs_seob.opRepresentation[otherData[i][1]][0], otherTh);
        if(val)
        {
          other += '<tr><td class="hdr">' + otherData[i][0] + '</td><td>';
          other += '<a href="' + otherData[i][3].getUrl() + '">' + val + '</a></td></tr>';
        }
      }

      other += '</table>';

      other += ujs_seob.getSecButtons(ujs_seob.isOtherMoreLessBtnRequired(),
        ujs_seob.bMoreOtherRatings, 'ujs_seob.onOtherMoreLessData()',
        'ujs_seob.refreshOtherRatingsInfo()');

      return other;
    },

    highlightElements : function()
    {
      var extAtName = 'external';
      var extAtValue = '1';
      var ext = 'a[' + extAtName + '="' + extAtValue + '"]';

      var child = '{color: inherit !important; background: inherit !important;}';
      var css = '';
      if(ujs_seob.highlightNoindex)
      {
        css += 'noindex {' + ujs_seob.style.noindex + ujs_seob.style.highlight + '} ';
        css += 'noindex * ' + child + ' ';
      }

      if(ujs_seob.highlightNofollow)
      {
        css += '*[rel*="nofollow"] {' + ujs_seob.style.nofollow + ujs_seob.style.highlight + '} ';
        css += ext + '[rel*="nofollow"] {' + ujs_seob.style.nofollow + ujs_seob.style.highlight + '} ';
        css += '*[rel*="nofollow"] * ' + child + ' ';
        css += ext + '[rel*="nofollow"] * ' + child + ' ';
      }

      if(ujs_seob.highlightExternalLinks)
      {
        css += ext + ' {' + ujs_seob.style.external + ujs_seob.style.highlight + '}';
        css += ext + ' * ' + child;
      }

      var style = document.getElementById(ujs_seob.highlightStyleId);
      if(style)
      {
        style.innerText = css;
      }
      else
      {
        ujs_seob.appendStyle(ujs_seob.highlightStyleId, css);
      }

      if(ujs_seob.highlightExternalLinks)
      {
        var a = document.getElementsByTagName('a');

        var domain = ujs_seob.getDomainName(document.location.hostname);
        domain = domain.toLowerCase();

        mdomain = ujs_seob.getMainDomainName(domain);
        if(mdomain)
          mdomain = mdomain.toLowerCase();

        for(var i = a.length - 1; i >= 0; i--)
        {
          if(a[i].getAttribute(ujs_seob.anchorAttribute.name, false) != ujs_seob.anchorAttribute.value &&
          a[i].getAttribute(extAtName, false) != extAtValue)
          {
            if(a[i].hostname)
            {
              var d = ujs_seob.getDomainName(a[i].hostname);
              d = d.toLowerCase();
              if(d != domain)
              {
                if(mdomain)
                {
                  var m = ujs_seob.getMainDomainName(d);
                  if(m)
                  {
                    m = m.toLowerCase();
                    if(m != mdomain)
                    {
                      a[i].setAttribute(extAtName, extAtValue, false);
                    }
                  }
                  else
                    a[i].setAttribute(extAtName, extAtValue, false);
                }
                else
                  a[i].setAttribute(extAtName, extAtValue, false);
              }
            }
          }
        }
      }
    },

    getMetaTags : function()
    {
      var txt = '';
      var meta = document.getElementsByTagName('meta');
      for(var i = 0; i < meta.length; i++)
      {
        var at1 = meta[i].getAttribute('http-equiv', false);
        var at2 = 'content';
        if(!at1)
        {
          at1 = meta[i].getAttribute('name', false);
          at2 = 'content';
        }

        if(at1)
        {
          txt += '<tr><td class="hdr">' + at1 + '</td><td>';
          txt += meta[i].getAttribute(at2, false) + '</td></tr>';
        }
      }

      if(txt)
        return '<table>' + txt + '</table>';
      else
        return 'There is no information to display.';
    },

    getLinkStatistics : function()
    {
      var links = new Array(
        new Array(0, 'Total&nbsp;Links'),
        new Array(0, 'Internal'),
        new Array(0, 'Subdomain'),
        new Array(0, 'External'),
        new Array(0, 'Text'),
        new Array(0, 'Image'),
        new Array(0, 'Nofollow')
      );

      var ext = new Array(
        new Array(0, 'Text'),
        new Array(0, 'Image'),
        new Array(0, 'Nofollow')
      );

      var a = document.getElementsByTagName('a');
      links[0][0] = a.length;

      var domain = ujs_seob.getDomainName(document.location.hostname);
      domain = domain.toLowerCase();

      mdomain = ujs_seob.getMainDomainName(domain);
      if(mdomain)
        mdomain = mdomain.toLowerCase();

      for(var i = a.length - 1; i >= 0; i--)
      {
        if(a[i].getAttribute(ujs_seob.anchorAttribute.name, false) == ujs_seob.anchorAttribute.value)
          links[0][0]--;
        else
        {
          var ex = false;
          if(a[i].hostname)
          {
            var d = ujs_seob.getDomainName(a[i].hostname);
            d = d.toLowerCase();
            if(d == domain)
              links[1][0]++; // internal
            else
            {
              if(mdomain)
              {
                var m = ujs_seob.getMainDomainName(d);
                if(m)
                {
                  m = m.toLowerCase();
                  if(m == mdomain)
                    links[2][0]++; // subdomain
                  else
                  {
                    links[3][0]++; // external
                    ex = true;
                  }
                }
                else
                {
                  links[3][0]++; // external
                  ex = true;
                }
              }
              else
              {
                links[3][0]++; // external
                ex = true;
              }
            }
          }
          else
            links[1][0]++; // internal

          if(a[i].innerHTML.match(/<img[^>]+>/i))
          {
            links[5][0]++; // image
            if(ex)
              ext[1][0]++; // external image
          }

          if(a[i].rel && a[i].rel.toLowerCase().indexOf('nofollow') != -1)
          {
            links[6][0]++; // nofollow
            if(ex)
              ext[2][0]++; // external nofollow
          }
        }
      }

      links[4][0] = links[0][0] - links[5][0];
      ext[0][0] = links[3][0] - ext[1][0];

      var coef = 100;

      var stat = '<table><tr>';
      stat += '<tr><td class="hdr">' + links[0][1] + '</td><td>' + links[0][0] + '</td><tr>';

      for(var i = 0; i < ext.length; i++)
        links[3][1] += '<br /><span>-&nbsp;' + ext[i][1] + '</span>';


      for(var i = 1; i < links.length; i++)
      {
        stat += '<tr><td class="hdr">' + links[i][1] + '</td><td>' + links[i][0] + ' (';
        stat += ujs_seob.getPercentValue(links[0][0], links[i][0], coef).toString() + '%)';

        if(i == 3) // external
        {
          for(var j = 0; j < ext.length; j++)
          {
            stat += '<br />' + ext[j][0] + ' (';
            stat += ujs_seob.getPercentValue(links[3][0], ext[j][0], coef).toString() + '%)';
          }
        }

        stat += '</td></tr>';
      }

      stat += '</table>';

      return stat;
    },

    getHttpHeaders : function()
    {
      ujs_seob.httpHeaders = 'Loading, please wait.';
      ujs_seob.setPanelData();
      ujs_seob.requestHeaders(true);
    },

    requestHeaders : function(bCheckStatusText)
    {
      var bCheck = bCheckStatusText;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", window.location.href, true);
      xmlhttp.setRequestHeader("Content-Type", "text/html");
      xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4)
        {
          if(bCheck && this.statusText != undefined && !this.statusText)
          {
            ujs_seob.requestHeaders(false);
            return;
          }

          ujs_seob.httpHeaders = 'Status: ' +  this.status;
          if(this.statusText)
            ujs_seob.httpHeaders += ' ' + this.statusText;

          ujs_seob.httpHeaders += '<br /><br /><table>';

          var a = this.getAllResponseHeaders().split('\n');
          for(var i = 0; i < a.length; i++)
          {
            if(a[i] && a[i] != '\n' && a[i] != '\r\n' && a[i] != '\r')
            {
              var ind = a[i].indexOf(':');
              if(ind >= 0)
              {
                ujs_seob.httpHeaders += '<tr><td class="hdr">' + a[i].substring(0, ind);
                ujs_seob.httpHeaders += '</td><td>' + a[i].substr(ind + 1) + '</td></tr>';
              }
              else
              {
                alert(a[i].length + '\n' + escape(a[i]))
                ujs_seob.httpHeaders += '<tr><td colspan="2" class="hdr">' + a[i] + '</td></tr>';
              }
            }
          }

          ujs_seob.httpHeaders += '</table>';
          ujs_seob.setPanelData();
        }
      };
      xmlhttp.send();
    },

    getSeobarInfo : function()
    {
      var mail = ujs_seob.version.email + '?subject=SEObar ' + ujs_seob.version.string;
      mail = 'mailto:' + escape(mail);
      mail = '<a href="' + mail + '">' + ujs_seob.version.email + '</a>';

      var homepage = '<a href="javascript:void(0);" ';
      homepage += 'onMouseUp="javascript:var wnd=window.open(\'' + ujs_seob.version.homepage + '\');">';
      homepage += ujs_seob.version.homepage + '</a>';
      var info = '<table>';
      info += '<tr><td class="hdr">Version</td><td>' + ujs_seob.version.string + '</td></tr>';
      info += '<tr><td class="hdr">Date</td><td>' + ujs_seob.version.date + '</td></tr>';
      info += '<tr><td class="hdr">Author</td><td>' + ujs_seob.version.author + '</td></tr>';
      info += '<tr><td class="hdr">E-Mail</td><td>' + mail + '</td></tr>';
      info += '<tr><td class="hdr">Homepage</td><td>' + homepage + '</td></tr>';
      var discussion = '', sep = '';;
      for(var i = 0; i < ujs_seob.version.discussion.length; i++)
      {
        var d = '';
        if(ujs_seob.version.discussion[i].length == 3)
        {
          d += ujs_seob.version.discussion[i][0] + ': ';
          d += '<a href="' + ujs_seob.version.discussion[i][1] + '">';
          d += ujs_seob.version.discussion[i][2] + '</a>';
        }
        if(d)
        {
          discussion += sep + d;
          sep = '<br />';
        }
      }
      if(discussion)
        info += '<tr><td class="hdr">Discussion</td><td>' + discussion + '</td></tr>';


      info += '</table><br />';
      
      var icons = ['Panel Widgets', 'Top10', 'Panel Info', 'Trust Unknown', 'View', 'Resume transfer', 'Panel Bookmarks', 'Smiley Cool', 'Smiley Pacman', 'Opera Logo'];
      
      info += '<div id="SEObar_stapler_buttons_box" style="border: 1px solid #e0e0e0 !important; padding: 0 !important;">';
      info += '<div class="SEObar_stapler_buttons_hdr" style="background-color: #f0f0f0 !important; border-bottom: 1px solid #e0e0e0 !important; padding: 3px 10px !important;">Seobar on/off button</div>';
      info += '<div id="SEObar_stapler_buttons" style="padding: 3px 10px !important; vertical-align: middle !important; line-height: 1.6 !important;">';      
      
      for(var i = 0; i < icons.length; i++)
      {
        info += '<a href="opera:/button/Go%20to%20page,%22javascript:if(window.ujs_seob%20&&%20window.ujs_seob.switchState){ujs_seob.switchState();}%22,,SEObar,%22' + escape(icons[i]) + '%22"';
        info += ' class="SEObar_stapler_button" title="' + icons[i] + '"';
        info += ' style="display: inline-block !important; margin-right: 20px !important; text-decoration: none !important; border: none !important;';
        info += " background-image: -o-skin('" + icons[i] + "') !important; width: -o-skin !important; height: -o-skin !important;";
        info += '"> </a>';
      }
      info += '<br />Drag and drop one of the buttons to your toolbar.';
      info += '</div></div><br />';
      
      info += '<input type="button" value="Check for Updates" onMouseUp="ujs_seob.getUpdateInfo()" />';

      return info;
    },

    getPercentValue : function(whole, part, coefficient)
    {
      if(whole == 0 || part == 0)
        return 0;

      if(coefficient == 0)
        coefficient = 1;

      var p = ((part / whole) * 100) * coefficient;
      p = Math.round(p);
      p = p / coefficient;
      return p;
    },

    setCookie : function(name, value, expires, domain)
    {
      value = value ? escape(value) : '';
      domain = domain ? domain : '';
      expires = expires ? expires.toGMTString() : '';
      
      setTimeout(function(){document.cookie = name + '=' + value + '; domain=' + domain + '; path=/; expires=' + expires;}, 10);
    },


    getCookie : function(name)
    {
      var prefix = name + '=';
      var i1 = document.cookie.indexOf(prefix);
      if (i1 == -1)
        return null;

      var i2 = document.cookie.indexOf(";", i1 + prefix.length);
      if (i2 == -1)
        i2 = document.cookie.length;

      var len = prefix.length;

      return unescape(document.cookie.substring(i1 + len, i2));
    },

    deleteCookie : function(name, domain)
    {
      domain = domain ? domain : '';
      setTimeout(function(){document.cookie = name + '=; domain=' + domain + '; path=/; expires=' + new Date((new Date).getTime()-1e11).toGMTString();}, 10);
    },

    isOpera9 : function()
    {
      if(typeof(window.opera.version) == 'function' && window.opera.version() >= 9)
      {
        return true;
      }
      return false;
    },
    
    checkForFakePR : function(url1, url2)
    {
      var w = window.open();
      with(w.document)
      {
        write(
          '<html><head><title>Fake PR Check</title><style type="text/css">\n'
          +'body,body * {color:#000;background-color:#fff;font-family:' + ujs_seob.fontFamily + ';font-size:13px;margin:0;padding:0;}\n'
          +'a{color:#3060c0;text-decoration:none;} p{margin-bottom:1em;}'
          +'div#main{text-align: center; padding:5px 0;} div#cnt{border:1px solid #fff;margin:0 auto;padding:10px;width:780px;text-align:center;}\n'
          +'h1{color:#404040;font-size:16pt;font-weight:normal;text-align:center;margin-bottom:1em;}\n'          
          +'</style></head><body><div id="main"><div id="cnt"><h1>Fake PR Check</h1>\n'
          +'<p><a href="' + url1 + '">' + url1 + '</a><br><br>\n'
          +'<iframe src="' + url1 + '" width="100%" height="300" frameborder="1" scrolling="yes"></iframe></p><br><br>\n'
          +'<p><a href="' + url2 + '">' + url2 + '</a><br><br>\n'
          +'<iframe src="' + url2 + '" width="100%" height="300" frameborder="1" scrolling="yes"></iframe></p>\n'
          +'<div></div></body></html>'
        );
      }
    },

    multiDatacenterPR : function()
    {
      var w = window.open();
      with(w.document)
      {
        write(
          '<html><head><title>Multi Datacenter Page Rank</title><style type="text/css">\n'
          +'body,body * {color:#000;background-color:#fff;border:none;font-family:' + ujs_seob.fontFamily + ';font-size:13px;margin:0;padding:0;}\n'
          +'a{color:#3060c0;text-decoration:none;} table{empty-cells:show;border-collapse:collapse;}\np{margin-bottom:1em;}'
          +'div#main{text-align: center; padding:5px 0;} div#cnt{border:1px solid #fff;margin:0 auto;padding:10px;width:680px;text-align:center;}\n'
          +'h1{color:#404040;font-size:16pt;font-weight:normal;text-align:center;margin-bottom:1em;}\n'
          +'.dc{margin:0 auto; width: 360px;} .dc th,td{border:1px solid #d0d0d0;padding:3px 10px;vertical-align: middle;}\n'
          +'.dc td iframe{display:block;margin:-3px auto;} .dc th{background-color:#e5e5e5;} .dc tr.even{background-color:#f5f5f5;}\n'
          +'</style><script type="text/javascript">\n'
          +'var dc1=["www.google.com","toolbarqueries.google.com","64.233.161.104","64.233.167.104","72.14.203.104","64.233.171.104","64.233.179.104","64.233.183.104","64.233.185.104","64.233.187.104","64.233.189.104","64.233.161.99","66.102.9.104","66.102.11.104","66.249.89.104","66.249.93.104","72.14.247.104","72.14.255.104","209.85.129.104","209.85.133.104","209.85.135.104","209.85.139.104","209.85.143.104","72.14.207.184","216.239.51.104","72.14.221.18"];\n'
          +'var dc2=["72.14.221.93","72.14.221.99","209.85.129.18","209.85.129.19","209.85.129.44","209.85.129.80","209.85.129.81","209.85.129.83","209.85.129.84","209.85.129.99","209.85.129.100","209.85.129.101","209.85.129.102","209.85.129.104","209.85.129.107","209.85.129.115","64.233.161.18","64.233.161.19","64.233.161.44","64.233.161.80","64.233.161.81","64.233.161.83","64.233.161.84","64.233.161.91","64.233.161.93","64.233.161.95","64.233.161.100","66.102.7.104","216.239.63.104","72.14.221.19","72.14.221.44","72.14.221.80","72.14.221.81","72.14.221.83","72.14.221.84","72.14.221.91","72.14.221.93","72.14.221.99","72.14.221.101"];\n'
          +'var pageurl="'+window.location.href+'", hash="#ujs_SEObar_Google_Multi_PR", number=1, frame=1; timer=null; var r='+ujs_seob.frame.google.r+';\n'
          +'var ch = ' + ujs_seob.frame.google.ch + '; var getSrc = ' + ujs_seob.frame.google.getSrc + ';\n'
          +'function getFrame(host, n){var src=getSrc(host,pageurl)+hash+n.toString(); var f=\'<iframe id="frame\'+n+\'" title="\'+src+\'" width="100" height="19" frameborder="0" scrolling="no" style="display:none;" ujs_external_unblocked="1"></iframe>\'; return f;}\n'
          +'function getTable(dc, url){var t=\'<table class="dc"><tr><th>#</th><th width="100%">Datacenter</th><th>PageRank</th></tr>\'; var even=false; for(var i=0; i<dc.length; i++){var c=even ? \' class="even"\' : \'\'; t+=\'<tr\'+c+\'><td>\'+number+\'</td><td><a href="http://\'+dc[i]+\'">\'+dc[i]+\'</a></td><td>\'+getFrame(dc[i], number)+\'</td></tr>\'; even=!even; number++;} t+=\'</table>\'; return t;}\n'
          +'function more(){var d = document.getElementById("more"); if(d){d.innerHTML = getTable(dc2, pageurl); clearTimeout(timer); getPR(); getPR(); getPR();}}\n'
          //+'function createFrame(host, number, parent){var f=document.createElement("iframe"); f.src=getSrc(host,pageurl)+hash+number.toString(); f.width=0; f.height=0; f.frameBorder="no"; f.scrolling="no"; f.setAttribute("ujs_external_unblocked","",false); parent.appendChild(f);}\n'
          +'function getPR(){var e=document.getElementById("frame"+frame); if(e){frame++; timer=setTimeout(getPR,5000); e.setAttribute("src", e.getAttribute("title", false), false); e.parentNode.appendChild(document.createTextNode("..."));}}\n'
          +'document.addEventListener("message",function(e){if(e.data&&(e.data.indexOf(hash)==0)){var d=e.data.split("\\n"); if(d.length>0){var r=decodeURIComponent(d[1]); var id=d[0].substring(hash.length); id=parseInt(id); if(!isNaN(id)){clearTimeout(timer); getPR(); var e=document.getElementById("frame"+id); if(e){e.parentNode.innerHTML=r;}}}}}, false);\n'
          +'</script></head><body><div id="main"><div id="cnt"><h1>Multi Datacenter Page Rank</h1>\n'
          +'<p>' + window.location.href + '</p>\n'
          +'<script type="text/javascript">window.document.write(getTable(dc1, pageurl)); getPR();getPR();getPR();</script>\n'
          +'<br><br><div><a href="javascript:void(0)" onclick="this.outerHTML=this.innerText; more();">Display the PageRank from other datacenters</a></div><br><br><div id="more"></div><br><br>\n'
          +'<div></div></body></html>'
        );
      }
    }
  };

  (function(){

    if(!window.opera)
      return;

    if(window.opera.ujs_SEObar_switch_off)
      return;

    ujs_seob.initFrameData();

    var bFrame = false;
    try
    {
      if(window.parent != window)
      {
        bFrame = true;
      }
    }
    catch(e)
    {
      bFrame = true;
    }

    var prevent = function(e) {
      e.preventDefault();
    };

    if(!bFrame)
    {
      if(window.location.hostname.search(/(?:yandex\.ru|google\.(?:com|[a-z][a-z]))$/i) != -1)
      {
        return;
      }
      
      if(ujs_seob.urlFilter &&
        window.location.href.search(ujs_seob.urlFilter) != -1)
      {
        return;
      }

      if(ujs_seob.includeUrlFilter &&
        window.location.href.search(ujs_seob.includeUrlFilter) == -1)
      {
        return;
      }

      if(ujs_seob.excludeUrlFilter &&
        window.location.href.search(ujs_seob.excludeUrlFilter) != -1)
      {
        return;
      }

      var onMessage = function(e) {
        if(ujs_seob.storage.processMessage(e))
            return;

        with(ujs_seob.frame)
        {
          if(alexa.processMessage(e))
            return;
          if(google.processMessage(e))
            return;
          if(yandex.processMessage(e))
            return;

          // Directories
          if(dir.dmoz.processMessage(e))
            return;
          if(dir.yahoo.processMessage(e))
            return;
          if(dir.yandex.processMessage(e))
            return;
          if(dir.rambler.processMessage(e))
            return;

          // Backward Links
          if(link.google.processMessage(e))
            return;
          if(link.yahoo.processMessage(e))
            return;
          if(link.yahooDomain.processMessage(e))
            return;
          if(link.msn.processMessage(e))
            return;
          if(link.msnDomain.processMessage(e))
            return;
          if(link.yandex.processMessage(e))
            return;

          // Indexed Pages
          if(index.google.processMessage(e))
            return;
          if(index.yahoo.processMessage(e))
            return;
          if(index.msn.processMessage(e))
            return;
          if(index.yandex.processMessage(e))
            return;
          if(index.rambler.processMessage(e))
            return;

          // Other Ratings
          if(other.technorati.processMessage(e))
            return;
          if(other.delicious.processMessage(e))
            return;
          if(other.digg.processMessage(e))
            return;
          if(other.googleCache.processMessage(e))
            return;
          if(other.waybackMachine.processMessage(e))
            return;

          // SEObar update information
          if(seobarUpdate.processMessage(e))
            return;
        }
      };

      // main document
      document.addEventListener('load', function(e) {
        if(!ujs_seob.bPanel && !ujs_seob.bStatusbar)
        {
          return;
        }

        ujs_seob.checkBodyChildrenHeight();

        // storage
        ujs_seob.storage.domain = ujs_seob.fakeDomain;
        ujs_seob.storage.getDataFunction = ujs_seob.getDataFromStorage;

        var onload = function(){
          var f = function(){
            ujs_seob.storage.loadData(ujs_seob.stateCookie,ujs_seob.stateCookie);
          };
          try
          {
            setTimeout(f, ujs_seob.requestDelay);
          }
          catch(e){}
        };
        ujs_seob.storage.createFrame(ujs_seob.sFrameId, onload);
      }, false);

      document.addEventListener('message', onMessage, false);
    }

    else if(window.location.host == ujs_seob.fakeDomain)
    {
      // Storage frame
      window.opera.addEventListener('BeforeExternalScript', prevent ,false);
      window.opera.addEventListener('BeforeScript', prevent, false);
      window.opera.addEventListener('BeforeEventListener.load', prevent, false);
      window.opera.addEventListener('BeforeEventListener.message', function(e) {
        if(!e.event.data || (e.event.data.indexOf(ujs_seob.storage.msgPrefix) == -1))
          e.preventDefault();
      }, false);

      document.addEventListener('message', function(e){
        if(ujs_seob.storage.processMessage(e))
          return;
      }, false);
    }

    else if(window.location.hash.indexOf('#ujs_SEObar_Google_Multi_PR') != -1)
    {
      var bLoaded = false;
      var onLoad = function()
      {
        if(bLoaded)
          return;

        var r = ujs_seob.frame.google.getDataFromDocumentFunction();
        if(r)
        {
          bLoaded = true;
        }
        r = r ? r : 'n/a';
        var msg = window.location.hash + '\n' + encodeURIComponent(r);
        //window.parent.document.postMessage(msg);
        ujs_seob.postMessage(msg, window.parent.document, window.parent);
      };
      onLoad();
      window.opera.addEventListener('BeforeEventListener.message', prevent, false);
      if(ujs_seob.isOpera9())
      {
         window.opera.addEventListener('BeforeEventListener.DOMContentLoaded', prevent, false);
      }
      window.opera.addEventListener('BeforeEventListener.load', function(e){
        e.preventDefault();
        onLoad();
        bLoaded = true;
      }, false);
      window.addEventListener('load', function(){var a=0;}, false);
    }

    else
    {
      // Data frames
      var id = window.location.hash.indexOf(ujs_seob.urlToken);
      if(id == -1)
        return;

      id = window.location.hash.substr(id + ujs_seob.urlToken.length);
      var frameObj = null;

      var fo = ujs_seob.getFrameObjects();
      if(fo && fo.length > 0)
      {
        for(var i in fo)
        {
          if(fo[i].frameToken == id)
          {
            frameObj = fo[i];
            break;
          }
        }
      }

      if(!frameObj)
        return;

      var bLoaded = false;

      if(frameObj.msgPrefix != 'SEObar_update')
      {
        window.opera.addEventListener('BeforeExternalScript', prevent ,false);
        window.opera.addEventListener('BeforeScript', prevent, false);
      }
      window.opera.addEventListener('BeforeEventListener.message', prevent, false);

      if(frameObj.style)
      {
        ujs_seob.appendStyle('', frameObj.style);
      }

      if(ujs_seob.isOpera9())
      {
        window.opera.addEventListener('BeforeEventListener.load', prevent, false);
        window.opera.addEventListener('BeforeEventListener.DOMContentLoaded', function(e) {
          e.preventDefault();

          if(bLoaded)
            return;

          bLoaded = true;
          frameObj.getData(id);
        }, false);

        window.addEventListener('DOMContentLoaded', function(){var a = 0;}, false);
      }
      else
      {
        window.opera.addEventListener('BeforeEventListener.load', function(e) {
          e.preventDefault();

          if(bLoaded)
            return;

          bLoaded = true;
          frameObj.getData(id);
          clearInterval(interval);
        }, false) ;

        var count = 0, interval = 0;
        var onLoad = function() {

          if(frameObj.IsObjectLoaded())
          {
            frameObj.getData(id);
            clearInterval(interval);
            return;
          }

          count++;
          if(count == 40)
          {
            clearInterval(interval);
          }
        };

        interval = setInterval(onLoad, 250);

        window.addEventListener('load', function() {var a = 0;}, false);
      }
    }

  })();

/////////////////////////////////////////////////
// ujs_seobarFrame

function ujs_seobarFrame(prefix, frameId, frameToken, url, domain)
{
  this.msgPrefix = prefix;
  this.frameId = frameId;
  this.frameToken = frameToken;
  this.url = url;
  this.checkUrl = '';
  this.domain = domain;
  // Function for obtaining data from document.
  // returns - the data string.
  this.getDataFromDocumentFunction = null;
  // Function to which the received data will be transferred.
  // 1-st parameter - data string,
  // 2-nd parameter - identifier allowing to determine type of data.
  this.getDataFunction = null;
  // Function
  this.IsObjectLoaded = null;

  this.deleteFrame = true;
  this.style = '';
  this.msg = '_frame_data';

  this.dataSeparator = '\n';
  this.msgSeparator = '\n';

  this.getUrl = function()
  {
    if(this.checkUrl)
      return this.checkUrl;

    return this.url;
  };

  this.createFrame = function()
  {
    if(!this.url)
    {
      alert('ujs_seobarFrame: [url] property must be initialized before calling [createFrame] function.');
      return;
    }

    if(!this.frameId)
    {
      alert('ujs_seobarFrame: [frameId] property must be initialized before calling [createFrame] function.');
      return;
    }

    if(!this.IsObjectLoaded)
    {
      alert('ujs_seobarFrame: [IsObjectLoaded] property must be initialized before calling [createFrame] function.');
      return;
    }

    var f = document.createElement('IFRAME');
    f.src = this.url;
    f.id = this.frameId;
    f.width = 0;
    f.height = 0;
    f.frameBorder = 'no';
    f.scrolling = 'no';
    document.documentElement.appendChild(f);
  };

  this.getData = function(msgId)
  {
    if(!msgId)
    {
      alert('ujs_seobarFrame: Incorrect call to the [getData] function. [msgId] parameter is not specified.');
      return;
    }

    if(!this.msgPrefix)
    {
      alert('ujs_seobarFrame: [msgPrefix] property must be initialized before calling [getData] function.');
      return;
    }

    if(!this.getDataFromDocumentFunction)
    {
      alert('ujs_seobarFrame: [getDataFromDocumentFunction] property must be initialized before calling [getData] function.');
      return;
    }

    if(!this.getDataFunction)
    {
      alert('ujs_seobarFrame: [getDataFunction] property must be initialized before calling [getData] function.');
      return;
    }

    var data = this.getDataFromDocumentFunction();

    var msg = this.msgPrefix + this.msg + this.msgSeparator + msgId;
    if(data)
    {
      data = encodeURIComponent(data);
    }
    msg += this.msgSeparator + data;
    //window.parent.document.postMessage(msg);
    ujs_seob.postMessage(msg, window.parent.document, window.parent);
  };

  this.processMessage = function(e)
  {
    if(e.data && (e.data.indexOf(this.msgPrefix) == 0))
    {
      if(this.domain && this.url.indexOf(this.domain) < 0)
      {
        alert('ujs_seobarFrame: The [domain]: "' + this.domain + '" is not a part of the [url]: "' + this.url + '"');
        return false;
      }

      var d = e.data.split(this.msgSeparator);
      if(d.length == 0)
      {
        return false;
      }

      if((!this.domain || e.domain == this.domain) && (d[0] == this.msgPrefix + this.msg))
      {
        // process message from frame
        var id = '', data = '';
        if(d[1])
          id = d[1];
        if(d[2])
          data = decodeURIComponent(d[2]);

        if(this.deleteFrame)
        {
          var frame = document.getElementById(this.frameId);
          if(frame)
          {
            frame.parentNode.removeChild(frame);
          }
        }


        this.getDataFunction(data, id);
        return true;
      }
    }

    return false;
  };
}



/////////////////////////////////////////////////
// UserJS Storage (http://www.puzzleclub.ru/files/ujs_storage.zip)

function ujs_Storage(prefix, domain, getDataFunction)
{
  // Prefix used for recognition of the messages.
  this.msgPrefix = prefix;
  // Domain used for storing data in the cookies.
  this.domain = domain;
  // Function for obtaining stored data.
  // 1-st parameter - data string,
  // 2-nd parameter - identifier allowing to determine type of data.
  this.getDataFunction = getDataFunction;

  this.frameId = '';
  this.msgSave = '_ujs_storage_save';
  this.msgLoad = '_ujs_storage_load';
  this.msgDelete = '_ujs_storage_delete';
  this.msgSeparator = '\n';

  this.createFrame = function(id, onload)
  {
    if(!id)
    {
      alert('UserJS Storage: Incorrect call to the [createFrame] function. [id] parameter is not specified.');
      return;
    }

    if(!this.domain)
    {
      alert('UserJS Storage: [domain] property must be initialized before calling [createFrame] function.');
      return;
    }

    this.frameId = id;

    var f = document.createElement('IFRAME');
    f.src = 'http://' + this.domain;
    f.id = id;
    f.width = 0;
    f.height = 0;
    f.frameBorder = 'no';
    f.scrolling = 'no';
    if(onload)
      f.onload = onload;
    document.documentElement.appendChild(f);
  };

  this.sendMessageToFrame = function(msg)
  {
    var f = document.getElementById(this.frameId);
    if(f)
    {
      ujs_seob.postMessage(msg, f.contentDocument, f.contentWindow);
    }
  };

  this.saveData = function(data, cookie)
  {
    if(!cookie)
    {
      alert('UserJS Storage: Incorrect call to the [saveData] function. [cookie] parameter is not specified.');
      return;
    }

    if(!this.msgPrefix)
    {
      alert('UserJS Storage: [msgPrefix] property must be initialized before calling [saveData] function.');
      return;
    }

    var msg = this.msgPrefix + this.msgSave + this.msgSeparator;
    msg += cookie + this.msgSeparator + encodeURIComponent(data);
    this.sendMessageToFrame(msg);
  };

  this.loadData = function(cookie, msgId)
  {
    if(!cookie)
    {
      alert('UserJS Storage: Incorrect call to the [loadData] function. [cookie] parameter is not specified.');
      return;
    }

    if(!msgId)
    {
      alert('UserJS Storage: Incorrect call to the [loadData] function. [msgId] parameter is not specified.');
      return;
    }

    if(!this.msgPrefix)
    {
      alert('UserJS Storage: [msgPrefix] property must be initialized before calling [loadData] function.');
      return;
    }

    if(!this.getDataFunction)
    {
      alert('UserJS Storage: [getDataFunction] property must be initialized before calling [loadData] function.');
      return;
    }

    var msg = this.msgPrefix + this.msgLoad + this.msgSeparator;
    msg += cookie + this.msgSeparator + msgId;
    this.sendMessageToFrame(msg);
  };

  this.deleteData = function(cookie)
  {
    if(!cookie)
    {
      alert('UserJS Storage: Incorrect call to the [deleteData] function. [cookie] parameter is not specified.');
      return;
    }

    if(!this.msgPrefix)
    {
      alert('UserJS Storage: [msgPrefix] property must be initialized before calling [deleteData] function.');
      return;
    }

    var msg = this.msgPrefix + this.msgDelete + this.msgSeparator;
    msg += cookie;
    this.sendMessageToFrame(msg);
  };

  this.processMessage = function(e)
  {
    if(e.data && (e.data.indexOf(this.msgPrefix) == 0))
    {
      var d = e.data.split(this.msgSeparator);

      if(e.domain == this.domain)
      {
        // process message from frame
        if(d[0] && d[0] == this.msgPrefix + this.msgLoad)
        {
          // load
          var id = '', data = '';
          if(d[1])
            id = d[1];
          if(d[2])
            data = decodeURIComponent(d[2]);

          this.getDataFunction(data, id);
        }

        return true;
      }
      else if(d[0])
      {
        // process message to frame
        if(d[0] == this.msgPrefix + this.msgSave)
        {
          // save
          var cookie = '', data = '';
          if(d[1])
            cookie = d[1];
          else
            return true;

          if(d[2])
            data = d[2];

          expdate = new Date("November 22, 2025 00:00:00");
          this.setCookie(cookie, data, expdate);

          return true;
        }
        else if(d[0] == this.msgPrefix + this.msgLoad)
        {
          // load
          var cookie = '', id = '';
          if(d[1])
            cookie = d[1];
          else
            return true;

          if(d[2])
            id = d[2];

          var msg = this.msgPrefix + this.msgLoad + this.msgSeparator + id;
          var data = this.getCookie(cookie);
          if(data)
            msg += this.msgSeparator + data;

          e.source.postMessage(msg);

          return true;
        }
        else if(d[0] == this.msgPrefix + this.msgDelete)
        {
          if(d[1])
            this.deleteCookie(d[1]);

          return true;
        }
      }
    }

    return false;
  };
  
  this.setCookie = function(name, value, expires)
  {
    value = value ? escape(value) : '';    
    expires = expires ? expires.toGMTString() : '';    
    
    setTimeout(function(){document.cookie = name + '=' + value + '; domain=' + ujs_seob.fakeDomain + '; path=/; expires=' + expires;}, 10);
  };


  this.getCookie = function(name)
  {
    var prefix = name + '=';
    var i1 = document.cookie.indexOf(prefix);
    if (i1 == -1)
      return null;

    var i2 = document.cookie.indexOf(";", i1 + prefix.length);
    if (i2 == -1)
      i2 = document.cookie.length;

    var len = prefix.length;

    return unescape(document.cookie.substring(i1 + len, i2));
  };

  this.deleteCookie = function(name)
  {
    setTimeout(function(){document.cookie = name + '=; domain=' + ujs_seob.fakeDomain + '; path=/; expires=' + new Date((new Date).getTime()-1e11).toGMTString();}, 10);
  };
}