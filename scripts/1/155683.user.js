// ==UserScript==
// @name        BOINCstatsBadges
// @namespace   http://www.cryotest.com/
// @description Add badge stats to the boincstats user page.
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     http://boincstats.com/*/stats/-1/user/detail/*
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @version     2.01
// @icon        http://s20.postimage.org/v41hivk09/bbadges.png
// @require     http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require     http://usocheckup.redirectme.net/155683.js?maxage=7
// ==/UserScript==

// Change Log
//----------------------------
// Version 1.0
// -Initial release.
//
// Version 1.01
// -Added updater.
// -Added icon.
//
// Version 1.02
// -Removed the updater as it's dead. :-(
//
// Version 1.03
// -Tried another updater.
//
// Version 1.04
// -Updater tweak.
//
// Version 1.05
// -Added NumberFields and Radioactive.
// -Improved error handling.
// 
// Version 1.06
// -Added WUProp.
// -Fixed an error with GPUGrid tooltips.
// 
// Version 1.07
// -Added Collatz Conjecture but left it disabled until the server is back up.
// -Added default GPUGrid badge for no publications.
//
// Version 2.0
// -Enabled Collatz Conjecture.
// -Added Wildlife@Home.
// -Changed things so that badges graphics are loaded after the AJAX call returns,
//  to prevent them not rendering if the tab is selected before the HTML finishes rendering.
// -Added failure to connect message.
// -Added delay configuration.
//
// Version 2.01
// -Fixed a bug in delay prefs.
//

(function() 
{
  //Enable jQuery from the page itself since it is already loaded in the native document
  try{
      $ = unsafeWindow.jQuery;
  } catch(e){
      alert(e)
  }

  //********************************************************************************
  // Borrowed from GM_config Extender.
  //********************************************************************************
  // ========================================================[ localization ]===
  // --------------------------------------------------------[ translations ]---
  GM_config.trans = {
    en: {
     'ButtonSave':     'Save',
     'ButtonSaveTip':  'Save options and close window',
     'ButtonCancel':   'Cancel',
     'ButtonCancelTip':'Close window (reject changes)',
     'ResetLinkName':  'Reset to defaults',
     'ResetLinkTip':   'Reset settings to shipped defaults',
     'ConfirmOverwriteFromClipboard': 'Sure to overwrite your settings from Clipboard?',
     'SettingsSaved':  'Settings saved.',
     'SaveAborted':    'Aborted.',
     'PromptSettingsPaste': 'Please paste your settings here:',
     'ConfirmOverwriteFromPaste': 'Sure to overwrite your settings with the entered data?'
    },
    de: {
     'ButtonSave':     'Speichern',
     'ButtonSaveTip':  'Änderungen speichern und Fenster schließen',
     'ButtonCancel':   'Abbrechen',
     'ButtonCancelTip':'Fenster schließen (Änderungen verwerfen)',
     'ResetLinkName':  'Zurücksetzen',
     'ResetLinkTip':   'Alle Werte auf Defaults zurücksetzen',
     'ConfirmOverwriteFromClipboard': 'Sollen die Einstellungen wirklich mit den Daten vom Clipboard überschrieben werden?',
     'SettingsSaved':  'Einstellungen gespeichert.',
     'SaveAborted':    'Aktion abgebrochen.',
     'PromptSettingsPaste': 'Bitte Einstellungen hier hineinkopieren:',
     'ConfirmOverwriteFromPaste': 'Sicher, dass die Einstellungen mit den kopierten Daten überschrieben werden sollen?'
    },
    nl: {
     'ButtonSave': 'Opslaan',
     'ButtonSaveTip': 'Instellingen opslaan en sluit venster',
     'ButtonCancel': 'Annuleren',
     'ButtonCancelTip':'Sluit venster (wist wijzigingen)',
     'ResetLinkName': 'Standaardinstellingen herstellen',
     'ResetLinkTip': 'Herstelt alle instellingen naar de standaardwaarden',
     'ConfirmOverwriteFromClipboard': 'Weet u zeker dat u de instellen vanaf het clipboard wil overschrijven?',
     'SettingsSaved': 'Instellingen opgeslagen.',
     'SaveAborted': 'Afgebroken.',
     'PromptSettingsPaste': 'Plak uw instellingen hier:',
     'ConfirmOverwriteFromPaste': 'Weet u zeker dat u de instellingen wilt overschrijven met de ingevoerde data?'
    },
    br: {},
    cz: {},
    cn: {},
    es: {},
    fi: {},
    fr: {},
    ro: {},
    ru: {},
    se: {},
    tw: {},
    
    useLang: 'en',
    fallBack: true
  };
  /* -------------------------------------------------[ adding translations ]---
   * can be used to overwrite existing translations and/or add new ones
   * string lang: 2 char language code
   * object trans: translations to add in the format {'code':'translation','code2':'trans2', ...) */
  GM_config.setTranslations = function(lang,trans) {
    for (attrname in trans) { GM_config.trans[lang][attrname] = trans[attrname]; }
  }
  /* ---------------------------------------------------[ init localization ]---
   * string lang: language to translate into
   * boolean fallback: return original (true) or empty string (false) on NoFound? */
  GM_config.initLocalization = function(lang,fallback) {
    GM_config.trans.useLang = lang;
    GM_config.trans.fallback = fallback;
  }
  /* -------------------------------------------------[ translate something ]---
   * string term: term to translate */
  GM_config.lang = function(term) {
    if (typeof(GM_config.trans[GM_config.trans.useLang])=='undefined' || !GM_config.trans[GM_config.trans.useLang][term]) {
      if (!GM_config.trans['en'][term]) {
        if (GM_config.trans.fallback) return term;
        return '';
      }
      return GM_config.trans['en'][term];
    }
    return GM_config.trans[GM_config.trans.useLang][term];
  }
  /* ----------------------------------------------------[ localize Buttons ]---
   * uses setup default language for translation - see initLocalization() */
  GM_config.localizeButtons = function() {
    if ( cf=this.frame.contentWindow.document.getElementById('buttons_holder') ) {
      cf.childNodes[0].innerHTML = this.lang('ButtonSave');
      cf.childNodes[0].setAttribute('title',this.lang('ButtonSaveTip'));
      cf.childNodes[1].innerHTML = this.lang('ButtonCancel');
      cf.childNodes[1].setAttribute('title',this.lang('ButtonCancelTip'));
      cf.childNodes[2].childNodes[0].innerHTML = this.lang('ResetLinkName');
      cf.childNodes[2].childNodes[0].setAttribute('title',this.lang('ResetLinkTip'));
    }
  }

  /* =========================================[ Resize configuration window ]===
   * int width: new width
   * int height: new height */
  GM_config.resizeFrame = function(wid,hei) {
    if(fid=this.frame.id) {
      this.frame.style.width = wid;
      this.frame.style.height = hei;
    }
  }
  
  /* ====================================[ Add a border to the config frame ]===
   * object spec { width (5px), style (ridge), color (#eae9e8) }
   */
  GM_config.addBorder = function() {
    if(fid=this.frame.id) {
      spec = arguments[0] || {};
      this.frame.style.borderWidth = (spec.width || '5px');
      this.frame.style.borderStyle = (spec.style || 'ridge');
      this.frame.style.borderColor = (spec.color || '#999999');
    }
  }
  
  /* -------------------------------------------------[ Sections to Tabs ]---
   * Convert sections to tabbed pages
   */
  var sectionTabs = 0; // holds the number of tabs we have
  GM_config.toggleSection = function(e) { // onClick handler for the tabs
    if ( (typeof e)=='number' ) var objNum = e;
    else var objNum = /\_(\d+)\_/.exec(e.target.id)[1], tobj;
    for (var i=0;i<sectionTabs;i++) {
      tobj = GM_config.frame.contentWindow.document.getElementById('GM_config_section_'+i+'_tab');
      tdat = GM_config.frame.contentWindow.document.getElementById('GM_config_section_'+i);
      tdat.setAttribute('className','section_header tab'); // does not work
      if (i==objNum) { // Activate
        // tab
//         if (tobj.style.cssText.match(/font-weight/) )
//           tobj.setAttribute('style',tobj.style.cssText.replace(/font-weight:[^\;]*/,'font-weight: bold !important'));
//         else
//           tobj.setAttribute('style',tobj.style.cssText + 'font-weight: bold !important;');
        tobj.setAttribute('selected',true);
        // content
        if (tdat.style.cssText.match(/display:/))
          tdat.setAttribute('style',tdat.style.cssText.replace(/display:[^\;]*/,'display:table !important'));
        else
          tdat.setAttribute('style',tdat.style.cssText +'display:table !important;');
      } else { // DeActivate
        // tab
//         if (tobj.style.cssText.match(/font-weight/) )
//           tobj.setAttribute('style',tobj.style.cssText.replace(/font-weight:[^\;]*/,'font-weight: normal !important'));
//         else
//           tobj.setAttribute('style',tobj.style.cssText + 'font-weight: normal !important;');
        tobj.setAttribute('selected',false);
        // content
        if (tdat.style.cssText.match(/display:/))
          tdat.setAttribute('style',tdat.style.cssText.replace(/display:[^\;]*/,'display:none !important'));
        else
          tdat.setAttribute('style',tdat.style.cssText +'display:none !important;');
      }
    }
  }

  GM_config.sections2tabs = function() {
  var divs = this.frame.contentWindow.document.getElementsByTagName('div');
  var rows = [];
  for(var i = 0;i < divs.length;i++){
    if(divs[i].id.indexOf('GM_config_section_') == 0 && divs[i].id.indexOf('GM_config_section_header_') != 0) {
        rows.push(divs[i]);
    }
  }
  if (rows.length<1) return;
  var anch = document.createElement('div');
  anch.style.cssText = 'border-bottom: 3px solid #cccccc;';
  anch.id = 'GM_config_tab_holder';
  sectionTabs = rows.length;
  // Tabs.
  var tab_container = document.createElement('div');
  tab_container.setAttribute('class', "tab-container");
  for (var i=0;i<sectionTabs;i++) {
    var tab = document.createElement('div');
    tab.setAttribute('class', "tab");
    tab.id = 'GM_config_section_'+i+'_tab';
    tab.addEventListener('click', GM_config.toggleSection, false);
    tab.innerHTML = GM_config.frame.contentWindow.document.getElementById('GM_config_section_header_'+i).innerHTML;
    tab_container.appendChild(tab);
  }
  anch.appendChild(tab_container);
  // Config. pages.
  for (var i=0;i<sectionTabs;i++) {
    anch.appendChild(rows[i]);
    rows[i].style.marginLeft = "auto";
    rows[i].style.marginRight = "auto";
  }
  this.frame.contentWindow.document.getElementById('GM_config_wrapper').insertBefore(anch,this.frame.contentWindow.document.getElementById('GM_config_buttons_holder'));
  this.frame.contentWindow.document.getElementById('GM_config_section_0_tab').setAttribute('selected',true);
  this.toggleSection(0);
}
//********************************************************************************
      

  var BBadges = {
    idAsteroids: GM_getValue('asteroids'),
    idCollatz: GM_getValue('collatz'),
    idEnigma: GM_getValue('enigma'),
    idGPUGrid: GM_getValue('gpugrid'),
    idNumberFields: GM_getValue('numberfields'),
    idOProject: GM_getValue('oproject'),
    idPrimeGrid: GM_getValue('primegrid'),
    idRadioactive: GM_getValue('radioactive'),
    idWCG: GM_getValue('wcg'),
    idWildlife: GM_getValue('wildlife'),
    idWUProp: GM_getValue('wuprop'),
    idYoyo: GM_getValue('yoyo'),
    delayAJAX: GM_getValue('stats_timeout'),
    delayTabLoad: GM_getValue('tab_load_delay'),
    userPage: "show_user.php?userid=",
    
    asteroids: {
      name: "Asteroids@home",
      root: "http://asteroidsathome.net/boinc/",
      badges: [],
      alt: []
    },
    collatz: {
      name: "Collatz Conjecture",
      root: "http://boinc.thesonntags.com/collatz/",
      badges: [],
      alt: []
    },
    enigma: {
      name: "Enigma@home",
      root: "http://www.enigmaathome.net/",
      badges: '',
      alt: ''
    },
    gpugrid: {
      name: "GPUGRID.net",
      root: "http://www.gpugrid.net/",
      badges: [],
      alt: [],
      ranks: [],
      citations: [],
      topics: []
    },
    numberfields: {
      name: "NumberFields@home",
      root: "http://numberfields.asu.edu/NumberFields/",
      badges: [],
      alt: []
    },
    oproject: {
      name: "OProject@Home",
      root: "http://oproject.info/",
      badges: [],
      alt: []
    },
    primegrid: {
      name: "PrimeGrid",
      root: "http://www.primegrid.com/",
      badges: [],
      alt: []
    },
    radioactive: {
      name: "Radioactive@home",
      root: "http://radioactiveathome.org/boinc/",
      badges: [],
      alt: []
    },
    wcg: {
      name: "World Community Grid",
      root: "http://www.worldcommunitygrid.org/stat/viewMemberInfo.do?userName=",
      badges: [],
      alt: []
    },
    wildlife: {
      name: "Wildlife@Home",
      root: "http://volunteer.cs.und.edu/wildlife/",
      badges: [],
      alt: []
    },
    wuprop: {
      name: "WUProp@home",
      root: "http://wuprop.boinc-af.org/",
      badges: [],
      alt: []
    },
    yoyo: {
      name: "Yoyo@home",
      root: "http://www.rechenkraft.net/yoyo/",
      badges: [],
      alt: []
    },
    
    // Configuration management.
    config: function(){
      var configStyle = "\
        .config_var {text-align: center; padding-top: 5px;} \
        .field_label {padding-left: 5px;} \
        .reset {display: none;} \
        input {width: 50px;} \
        #GM_config_field_wcg {width: 100px;} \
        .config_var {width: 245px; text-align: left !important; margin: 0 auto 4px !important;} \
        .field_label {width: 130px; float: left; margin-top: 4px;} \
        #GM_config_asteroids_field_label {float: left;} \
        /* Tabbed */\
        #GM_config .section_header_holder{margin-top: 0;}\
        .section_header[selected=\"true\"] {\
          position: relative !important;\
          color: #000000 !important;\
          top: 1px !important;\
        }\
        #GM_config_tab_holder {\
          margin-left:5px !important;\
          margin-right:5px !important;\
          border-bottom: 1px solid #B2A293 !important;\
        }\
        .tab-container {\
          background: url(\"http://boincstats.com/css/images/ui-bg_gloss-wave_55_5c9ccc_500x100.png\") repeat-x scroll 55% 55% transparent;\
          border-radius: 5px 5px 5px 5px;\
          height: 30px;\
          margin-bottom: 1px;\
          margin-left: 4px;\
          width: 98%;\
        }\
        .tab {\
          -moz-user-select: -moz-none;\
          background: url(\"images/ui-bg_glass_85_dfeffc_1x400.png\") repeat-x scroll 50% 50% #DFEFFC;\
          border-radius: 5px 5px 0 0;\
          color: #2E6E9E;\
          cursor: pointer;\
          display:inline-block;\
          font-size: 11px;\
          font-weight: bold;\
          height: 25px;\
          line-height: 25px;\
          margin-right: 4px;\
          margin-top: 3px;\
          padding-left:10px;\
          padding-right:10px;\
          user-select: none;\
          text-align: center;\
          white-space: nowrap;\
        }\
        .tab[selected=\"true\"] {\
          background: url(\"images/ui-bg_inset-hard_100_f5f8f9_1x100.png\") repeat-x scroll 50% 50% #F5F8F9;\
          color: #E17009;\
          margin-top: 4px;\
          padding-bottom: 1px;\
        }\
        #GM_config_section_0_tab { margin-left:4px !important; }\
        ";
      
      GM_config.init('BoincStats Badges', 
      /* Fields object */
       {
          'asteroids': {
            'section': ['Project IDs', 'Enter your user ID for each project, found on your account details page.<br/>For World Community Grid, enter your user NAME.'],
            'label': 'Asteroids@home:',
            'type': 'text',
            'default': ''
          },
          'collatz': {
            'label': 'Collatz Conjecture:',
            'type': 'text',
            'default': ''
          },
          'enigma': {
            'label': 'Enigma@home:',
            'type': 'text',
            'default': ''
          },
          'gpugrid': {
            'label': 'GPUGRID.net:',
            'type': 'text',
            'default': ''
          },
          'numberfields': {
            'label': 'NumberFields@home:',
            'type': 'text',
            'default': ''
          },
          'oproject': {
            'label': 'OProject@Home:',
            'type': 'text',
            'default': ''
          },
          'primegrid': {
            'label': 'PrimeGrid:',
            'type': 'text',
            'default': ''
          },
          'radioactive': {
            'label': 'Radioactive@home:',
            'type': 'text',
            'default': ''
          },
          'wildlife': {
            'label': 'Wildlife@Home:',
            'type': 'text',
            'default': ''
          },
          'wcg': {
            'label': 'World Community Grid:',
            'type': 'text',
            'default': ''
          },
          'wuprop': {
            'label': 'WUProp@Home:',
            'type': 'text',
            'default': ''
          },
          'yoyo': {
            'label': 'Yoyo@home:',
            'type': 'text',
            'default': ''
          },
          
          'stats_timeout': {
            'section': ['Delays', 'You can adjust the maximum periods that the script will wait for AJAX badge stats and for the tab to be rendered.'],
            'label': 'AJAX Timeout (ms):',
            'type': 'text',
            'default': '2000'
          },
          'tab_load_delay': {
            'label': 'Tab Load Delay (ms)',
            'type': 'text',
            'default': '1500'
          }
      }, configStyle, {
          open: function(){
            GM_config.addBorder();                          // add a fancy border
            GM_config.resizeFrame('420px', '600px');        // resize the config window
            GM_config.center();
            GM_config.sections2tabs();
          },
          save: function(){
            GM_setValue('asteroids', GM_config.get('asteroids'));
            GM_setValue('collatz', GM_config.get('collatz'));
            GM_setValue('enigma', GM_config.get('enigma'));
            GM_setValue('gpugrid', GM_config.get('gpugrid'));
            GM_setValue('numberfields', GM_config.get('numberfields'));
            GM_setValue('oproject', GM_config.get('oproject'));
            GM_setValue('primegrid', GM_config.get('primegrid'));
            GM_setValue('radioactive', GM_config.get('radioactive'));
            GM_setValue('wcg', GM_config.get('wcg'));
            GM_setValue('wildlife', GM_config.get('wildlife'));
            GM_setValue('wuprop', GM_config.get('wuprop'));
            GM_setValue('yoyo', GM_config.get('yoyo'));
            GM_setValue('stats_timeout', GM_config.get('stats_timeout'));
            GM_setValue('tab_load_delay', GM_config.get('tab_load_delay'));
            location.reload();                              // reload the page when configuration was changed
          }

        }
      );

      // Register the menu item.
      GM_registerMenuCommand("BoincStats Badges", function(){
        GM_config.open()
      }, 'B');
      // Open prefs on first run.
      if(!GM_getValue('hasrun')){
        GM_config.open();
        GM_setValue('hasrun', true)
      }
    },
    
    // Language support.
    locale: 'en',
    br: {
      "Badges": "Emblemas",
      "Project name": "Nome do projeto",
      "Unable To Connect": "Não é possível conectar ao projeto."
    },
    cz: {
      "Badges": "Odznaky",
      "Project name": "Název projektu",
      "Unable To Connect": "Nelze se připojit k projektu."
    },
    cn: {
      "Badges": "徽章",
      "Project name": "项目名称",
      "Unable To Connect": "无法连接到项目。"
    },
    de: {
      "Badges": "Abzeichen",
      "Project name": "Projektname",
      "Unable To Connect": "Es kann keine Verbindung zum Projekt."
    },
    en: {
      "Badges": "Badges",
      "Project name": "Project name",
      "Unable To Connect": "Unable to connect to project."
    },
    es: {
      "Badges": "Insignias",
      "Project name": "Nombre del proyecto",
      "Unable To Connect": "No se puede conectar al proyecto."
    },
    fi: {
      "Badges": "Merkit",
      "Project name": "Hankkeen nimi",
      "Unable To Connect": "Ei voida yhdistää hankkeeseen."
    },
    fr: {
      "Badges": "Emblem",
      "Project name": "Nom du projet",
      "Unable To Connect": "Impossible de se connecter au projet."
    },
    nl: {
      "Badges": "Badges",
      "Project name": "Naam van het project",
      "Unable To Connect": "Kan geen verbinding maken met project."
    },
    ro: {
      "Badges": "Insigne",
      "Project name": "Proiectul nume",
      "Unable To Connect": "Nu se poate conecta la proiect."
    },
    ru: {
      "Badges": "Значки",
      "Project name": "название проекта",
      "Unable To Connect": "Не удается подключиться к проекту."
    },
    se: {
      "Badges": "Emblem",
      "Project name": "Projektnamn",
      "Unable To Connect": "Kan inte ansluta till projektet."
    },
    tw: {
      "Badges": "徽章",
      "Project name": "項目名稱",
      "Unable To Connect": "无法连接到项目。"
    },
    getLocale: function(){
      var loc = document.URL.split('/')[3];
      if(typeof loc != 'undefined'){
        this.locale = loc;
      }
    },
    initLang: function(){
      GM_config.setTranslations('br', BBadges.br);
      GM_config.setTranslations('cz', BBadges.cz);
      GM_config.setTranslations('cn', BBadges.cn);
      GM_config.setTranslations('en', BBadges.en);
      GM_config.setTranslations('es', BBadges.es);
      GM_config.setTranslations('fi', BBadges.fi);
      GM_config.setTranslations('de', BBadges.de);
      GM_config.setTranslations('fr', BBadges.fr);
      GM_config.setTranslations('nl', BBadges.nl);
      GM_config.setTranslations('ro', BBadges.ro);
      GM_config.setTranslations('ru', BBadges.ru);
      GM_config.setTranslations('se', BBadges.se);
      GM_config.setTranslations('tw', BBadges.tw);
      GM_config.initLocalization(BBadges.locale,true);
    }
  }
  
  // Init language and config. settings.
  BBadges.config();
  BBadges.getLocale();
  BBadges.initLang();
  
  // Insert a new tab in the header.
  $("#main .ui-tabs ul").append("<li id=\"tabBadges\" class=\"ui-state-default ui-corner-top\"><a href=\"#\"><span>" + GM_config.lang('Badges') + "</span></a></li>");
  $('#tabBadges').click(function(e)
  {
    // Set selected styles on our tab and remove them from the currently selected one.
    var selectedTab = $(".ui-tabs-selected");
    selectedTab.removeClass('ui-tabs-selected ui-state-active');
    $('#tabBadges').addClass('ui-tabs-selected ui-state-active');
    // Check whether the current tab is charts and, if so, remove them and create the stats table.
    if(selectedTab.index() == 3){
      // Remove charts.
      $("img[src*='chart.png']").each(function(i){
        $(this).remove();
      });
      // Remove breaks.
      $("#main br").each(function(i){
        $(this).remove();
      });
      // Insert table.
      $('<table id="tblStats" class="dataTable"></table>').appendTo('#main');
    }
    else{
      // Remove the current data from the display.
      $('#tblStats').empty();
      if(selectedTab.index() == 2){
        $('#tblStats').next("br").remove();
        $('#tblStats').next("b").remove();
        $('#tblStatsRetired').remove();
      }
    }
   
    // Insert badge data.
    $('<tr class="header"><th width="25%">' + GM_config.lang('Project name') + '</th><th>' + GM_config.lang('Badges') + '</th></tr>').appendTo('#tblStats');
    // Asteroids
    var asteroidsHTML = '<tr class="odd"><td>';
    asteroidsHTML += BBadges.idAsteroids ? '<a href="' + BBadges.asteroids.root + BBadges.userPage + BBadges.idAsteroids + '">' : '';
    asteroidsHTML += BBadges.asteroids.name;
    asteroidsHTML += BBadges.idAsteroids ? '</a>' : '';
    asteroidsHTML += '</td><td id="asteroids"></td></tr>\n';
    $(asteroidsHTML).appendTo('#tblStats');
    
    // Collatz Conjecture.
    var collatzHTML = '<tr class="even"><td>';
    collatzHTML += BBadges.idCollatz ? '<a href="' + BBadges.collatz.root + BBadges.userPage + BBadges.idCollatz + '">' : '';
    collatzHTML += BBadges.collatz.name;
    collatzHTML += BBadges.idCollatz ? '</a>' : '';
    collatzHTML += '</td><td id="collatz"></td></tr>\n';
    $(collatzHTML).appendTo('#tblStats');
    
    // Enigma.
    var enigmaHTML = '<tr class="odd"><td>';
    enigmaHTML += BBadges.idEnigma ? '<a href="' + BBadges.enigma.root + BBadges.userPage + BBadges.idEnigma + '">' : '';
    enigmaHTML += BBadges.enigma.name;
    enigmaHTML += BBadges.idEnigma ? '</a>' : '';
    enigmaHTML += '</td><td id="enigma"></td></tr>\n';
    $(enigmaHTML).appendTo('#tblStats');
    
    // GPUGRID
    var gpugridHTML = '<tr class="even"><td>';
    gpugridHTML += BBadges.idGPUGrid ? '<a href="' + BBadges.gpugrid.root + BBadges.userPage + BBadges.idGPUGrid + '">' : '';
    gpugridHTML += BBadges.gpugrid.name;
    gpugridHTML += BBadges.idGPUGrid ? '</a>' : '';
    gpugridHTML += '</td><td id="gpugrid"></td></tr>\n';
    $(gpugridHTML).appendTo('#tblStats');
    
    // NumberFields
    var numberfieldsHTML = '<tr class="odd"><td>';
    numberfieldsHTML += BBadges.idNumberFields ? '<a href="' + BBadges.numberfields.root + BBadges.userPage + BBadges.idNumberFields + '">' : '';
    numberfieldsHTML += BBadges.numberfields.name;
    numberfieldsHTML += BBadges.idNumberFields ? '</a>' : '';
    numberfieldsHTML += '</td><td id="numberfields"></td></tr>\n';
    $(numberfieldsHTML).appendTo('#tblStats');
    
    // OProject
    var oprojectHTML = '<tr class="even"><td>';
    oprojectHTML += BBadges.idOProject ? '<a href="' + BBadges.oproject.root + BBadges.userPage + BBadges.idOProject + '">' : '';
    oprojectHTML += BBadges.oproject.name;
    oprojectHTML += BBadges.idOProject ? '</a>' : '';
    oprojectHTML += '</td><td id="oproject"></td></tr>\n';
    $(oprojectHTML).appendTo('#tblStats');
    
    // PrimeGrid
    var primegridHTML = '<tr class="odd"><td>';
    primegridHTML += BBadges.idPrimeGrid ? '<a href="' + BBadges.primegrid.root + BBadges.userPage + BBadges.idPrimeGrid + '">' : '';
    primegridHTML += BBadges.primegrid.name;
    primegridHTML += BBadges.idPrimeGrid ? '</a>' : '';
    primegridHTML += '</td><td id="primegrid"></td></tr>\n';
    $(primegridHTML).appendTo('#tblStats');
    
    // Radioactive
    var radioactiveHTML = '<tr class="even"><td>';
    radioactiveHTML += BBadges.idRadioactive ? '<a href="' + BBadges.radioactive.root + BBadges.userPage + BBadges.idRadioactive + '">' : '';
    radioactiveHTML += BBadges.radioactive.name;
    radioactiveHTML += BBadges.idRadioactive ? '</a>' : '';
    radioactiveHTML += '</td><td id="radioactive"></td></tr>\n';
    $(radioactiveHTML).appendTo('#tblStats');
    
    // WCG
    var wcgHTML = '<tr class="odd"><td>';
    wcgHTML += BBadges.idWCG ? '<a href="' + BBadges.wcg.root + BBadges.idWCG + '">' : '';
    wcgHTML += BBadges.wcg.name;
    wcgHTML += BBadges.idWCG ? '</a>' : '';
    wcgHTML += '</td><td id="wcg"></td></tr>\n';
    $(wcgHTML).appendTo('#tblStats');
    
    // Wildlife
    var wildlifeHTML = '<tr class="even"><td>';
    wildlifeHTML += BBadges.idWildlife ? '<a href="'  + BBadges.wildlife.root + BBadges.userPage + BBadges.idWildlife + '">' : '';
    wildlifeHTML += BBadges.wildlife.name;
    wildlifeHTML += BBadges.idWildlife ? '</a>' : '';
    wildlifeHTML += '</td><td id="wildlife"></td></tr>\n';
    $(wildlifeHTML).appendTo('#tblStats');
    
    // WUProp
    var wupropHTML = '<tr class="odd"><td>';
    wupropHTML += BBadges.idWUProp ? '<a href="' + BBadges.wuprop.root + BBadges.userPage + BBadges.idWUProp + '">' : '';
    wupropHTML += BBadges.wuprop.name;
    wupropHTML += BBadges.idWUProp ? '</a>' : '';
    wupropHTML += '</td><td id="wuprop"></td></tr>\n';
    $(wupropHTML).appendTo('#tblStats');
    
    // Yoyo.
    var yoyoHTML = '<tr class="even"><td>';
    yoyoHTML += BBadges.idYoyo ? '<a href="'  + BBadges.yoyo.root + BBadges.userPage + BBadges.idYoyo + '">' : '';
    yoyoHTML += BBadges.yoyo.name;
    yoyoHTML += BBadges.idYoyo ? '</a>' : '';
    yoyoHTML += '</td><td id="yoyo"></td></tr>\n';
    $(yoyoHTML).appendTo('#tblStats');
  });
  
  
  try{
    // Asteroids.
    if(BBadges.idAsteroids){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.asteroids.root + BBadges.userPage + BBadges.idAsteroids,
        onload: function(response){
          $(response.responseText).find("td.fieldvalue img[alt|='badge']").each(function(i){
            BBadges.asteroids.badges.push($(this).attr("src"));
            BBadges.asteroids.alt.push($(this).attr("title"));
          });
          
          // Draw the badges after AJAX has returned.
          var asteroidsBadges = '';
          for(var i = 0;i < BBadges.asteroids.badges.length;i++){
            asteroidsBadges += '<img src="' + BBadges.asteroids.root + BBadges.asteroids.badges[i] + '" title="' + BBadges.asteroids.alt[i] + '" alt="' + BBadges.asteroids.alt[i] + '" />\n';
          }
          setTimeout(function(){
            $("#asteroids").html(asteroidsBadges);
          }, BBadges.delayTabLoad);
        },
        onerror: function(response){
          $("#asteroids").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#asteroids").html(GM_config.lang('Unable To Connect'));
        }
      });
    }
      
    // Collatz Conjecture.
    if(BBadges.idCollatz){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.collatz.root + BBadges.userPage + BBadges.idCollatz,
        onload: function(response){
          var img = $(response.responseText).find("img[src^='img/badge_']");
          if(typeof img.attr("src") != "undefined"){
            BBadges.collatz.badges = img.attr("src");
            BBadges.collatz.alt = img.attr("title");
          }
          
          // Draw the badges after AJAX has returned.
          var collatzBadges = '<img src="' + BBadges.collatz.root + BBadges.collatz.badges + '" title="' + BBadges.collatz.alt + '" alt="' + BBadges.collatz.alt + '" />';
          setTimeout(function(){
              $("#collatz").html(collatzBadges);
          }, BBadges.delayTabLoad);          
        },
        onerror: function(response){
          $("#collatz").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#collatz").html(GM_config.lang('Unable To Connect'));
        }
      });
    }

    // Enigma.
    if(BBadges.idEnigma){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.enigma.root + BBadges.userPage + BBadges.idEnigma,
        onload: function(response){
          var img = $(response.responseText).find("img[alt~='badge']");
          BBadges.enigma.badges = img.attr("src");
          BBadges.enigma.alt = img.attr("alt");
          
          // Draw the badges after AJAX has returned.
          var enigmaBadges = '<img src="' + BBadges.enigma.root + BBadges.enigma.badges + '" title="' + BBadges.enigma.alt + '" alt="' + BBadges.enigma.alt + '" />';
          setTimeout(function(){
              $("#enigma").html(enigmaBadges);
          }, BBadges.delayTabLoad);
        },
        onerror: function(response){
          $("#enigma").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#enigma").html(GM_config.lang('Unable To Connect'));
        }
      });
    }
    
    // GPUGRID.
    if(BBadges.idGPUGrid){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.gpugrid.root + BBadges.userPage + BBadges.idGPUGrid,
        onload: function(response){
          var img = $(response.responseText).find("#level-badge img");
          // Badges.
          if(img.length > 0){
            BBadges.gpugrid.badges.push(img.attr("src"));
            BBadges.gpugrid.alt.push(img.attr("title"));
          }
          // Default badge for no publications.
          $(response.responseText).find("td img.badge").each(function(i){
            BBadges.gpugrid.badges.push($(this).attr("src"));
            BBadges.gpugrid.alt.push($(this).attr("title"));
            BBadges.gpugrid.ranks.push("None");
            BBadges.gpugrid.citations.push("None");
            BBadges.gpugrid.topics.push("None");
          });
          // Publication badges.
          $(response.responseText).find("#publication-badge").each(function(i){
            img = $(this).find("img");
            BBadges.gpugrid.badges.push(img.attr("src"));
            BBadges.gpugrid.alt.push(img.attr("title"));
          });
          $("<div>").html(response.responseText).find("#rank").each(function(i){
            BBadges.gpugrid.ranks.push($(this).text());
          });
          $("<div>").html(response.responseText).find("#citation a").each(function(i){
            BBadges.gpugrid.citations.push($(this).text());
          });
          $("<div>").html(response.responseText).find("#topic a").each(function(i){
            BBadges.gpugrid.topics.push($(this).text());
          });
          
          // Draw the badges after AJAX has returned.
          var gpugridBadges = '';
          for(var i = 0;i < BBadges.gpugrid.badges.length;i++){
            gpugridBadges += '<img src="' + BBadges.gpugrid.root + BBadges.gpugrid.badges[i] + '" title="' + BBadges.gpugrid.alt[i];
            if(i >= 1){
              // Only add rank, citation and topic for publication icons.
              gpugridBadges += '\nRank: ' + BBadges.gpugrid.ranks[i - 1] + '\nCitation: ' + BBadges.gpugrid.citations[i - 1] + '\nTopic: ' + BBadges.gpugrid.topics[i - 1];
            }
            gpugridBadges += '" alt="' + BBadges.gpugrid.alt[i] + '" />\n';
          }
          setTimeout(function(){
            $("#gpugrid").html(gpugridBadges);
          }, BBadges.delayTabLoad);
        },
        onerror: function(response){
          $("#gpugrid").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#gpugrid").html(GM_config.lang('Unable To Connect'));
        }
      });
    }

    // NumberFields.
    if(BBadges.idNumberFields){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.numberfields.root + BBadges.userPage + BBadges.idNumberFields,
        onload: function(response){
          var img = $(response.responseText).find("img[src*='/img/badges']");
          if(img.length > 0){
            BBadges.numberfields.badges = img.attr("src");
            BBadges.numberfields.alt = img.attr("title");
          }
          
          // Draw the badges after AJAX has returned.
          var numberfieldsBadges = '<img src="' + BBadges.numberfields.badges + '" title="' + BBadges.numberfields.alt + '" alt="' + BBadges.numberfields.alt + '" />';
          setTimeout(function(){
            $("#numberfields").html(numberfieldsBadges);
          }, BBadges.delayTabLoad);          
        },
        onerror: function(response){
          $("#numberfields").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#numberfields").html(GM_config.lang('Unable To Connect'));
        }
      });
    }
    
    // OProject.
    if(BBadges.idOProject){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.oproject.root + BBadges.userPage + BBadges.idOProject,
        onload: function(response){
          $(response.responseText).find("img[src*='/img/badges']").each(function(i){
            var src = $(this).attr("src");
            var alt = '';
            BBadges.oproject.badges.push(src);
            if(src.indexOf("alx") != -1){
              alt = "ALX ";
            }
            else if(src.indexOf("shor") != -1){
              alt = "Shor's Algorithm ";
            }
            else if(src.indexOf("gsce-sv") != -1){
              alt = "GSCE-SV ";
            }
            else if(src.indexOf("weird") != -1){
              alt = "Weird Engine ";
            }
            
            if(src.indexOf("bronze.png") != -1){
              alt += 'Bronze Badge';
            }
            else if(src.indexOf("silver.png") != -1){
              alt += 'Silver Badge';
            }
            else if(src.indexOf("gold.png") != -1){
              alt += 'Gold Badge';
            }
            else if(src.indexOf("amethyst.png") != -1){
              alt += 'AmethystBadge';
            }
            else if(src.indexOf("sapphire.png") != -1){
              alt += 'Sapphire Badge';
            }
            else if(src.indexOf("ruby.png") != -1){
              alt += 'Ruby Badge';
            }
            else if(src.indexOf("emerald.png") != -1){
              alt += 'Emerald Badge';
            }
            BBadges.oproject.alt.push(alt);
          });
          
          // Draw the badges after AJAX has returned.
          var oprojectBadges = '';
          for(var i = 0;i < BBadges.oproject.badges.length;i++){
            oprojectBadges += '<img src="' + BBadges.oproject.root + BBadges.oproject.badges[i] + '" title="' + BBadges.oproject.alt[i] + '" alt="' + BBadges.oproject.alt[i] + '" />\n';
          }
          setTimeout(function(){
            $("#oproject").html(oprojectBadges);
          }, BBadges.delayTabLoad);          
        },
        onerror: function(response){
          $("#oproject").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#oproject").html(GM_config.lang('Unable To Connect'));
        }
      });
    }
      
    // PrimeGrid.
    if(BBadges.idPrimeGrid){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.primegrid.root + BBadges.userPage + BBadges.idPrimeGrid,
        onload: function(response){
          $(response.responseText).find(".badge").each(function(i){
            var src = $(this).attr("src");
            BBadges.primegrid.badges.push(src);
            
            var alt = '';
            if(src.indexOf("sr2sieve_321_") != -1){
              alt += '321 Sieve - ';
            }
            else if(src.indexOf("gcwsieve_") != -1){
              alt += 'Cullen/Woodall Sieve - ';
            }
            else if(src.indexOf("sr2sieve_pps_") != -1){
              alt += 'Proth Prime Search Sieve - ';
            }
            else if(src.indexOf("sr2sieve_psp_") != -1){
              alt += 'Prime Sierpinski Problem/Seventeen or Bust Sieve - ';
            }
            else if(src.indexOf("sr2sieve_trp_") != -1){
              alt += 'The Riesel Problem Sieve - ';
            }
            else if(src.indexOf("321_") != -1){
              alt += '321 LLR - ';
            }
            else if(src.indexOf("cul_") != -1){
              alt += 'Cullen Prime Search LLR - ';
            }
            else if(src.indexOf("pps_llr_") != -1){
              alt += 'Proth Prime Search LLR - ';
            }
            else if(src.indexOf("psp_llr_") != -1){
              alt += 'Prime Sierpinski Problem LLR - ';
            }
            else if(src.indexOf("sob_llr_") != -1){
              alt += 'Seventeen or Bust LLR - ';
            }
            else if(src.indexOf("sgs_") != -1){
              alt += 'Sophie Germain Prime Search LLR - ';
            }
            else if(src.indexOf("tps_") != -1){
              alt += 'Twin Prime search - ';
            }
            else if(src.indexOf("trp_llr_") != -1){
              alt += 'The Riesel Problem LLR - ';
            }
            else if(src.indexOf("woo_") != -1){
              alt += 'Woodall Prime Search LLR - ';
            }
            else if(src.indexOf("ap26_") != -1){
              alt += 'Arithmetic Progression of 26 Primes - ';
            }
            else if(src.indexOf("genefer_") != -1){
              alt += 'Genefer - ';
            }
            else if(src.indexOf("manual_") != -1){
              alt += ' Project Staging Area - ';
            }
            alt += $(this).attr("alt");
            BBadges.primegrid.alt.push(alt);
          });
          
          // Draw the badges after AJAX has returned.
          var primegridBadges = '';
          for(var i = 0;i < BBadges.primegrid.badges.length;i++){
            primegridBadges += '<img src="' + BBadges.primegrid.root + BBadges.primegrid.badges[i] + '" title="' + BBadges.primegrid.alt[i] + '" alt="' + BBadges.primegrid.alt[i] + '" />\n';
          }
          setTimeout(function(){
            $("#primegrid").html(primegridBadges);
          }, BBadges.delayTabLoad);
        },
        onerror: function(response){
          $("#primegrid").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#primegrid").html(GM_config.lang('Unable To Connect'));
        }
      });
    }
    
    // Radioactive.
    if(BBadges.idRadioactive){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.radioactive.root + BBadges.userPage + BBadges.idRadioactive,
        onload: function(response){
          var img = $(response.responseText).find("img[src*='display_badge.php']");
          BBadges.radioactive.badges = img.attr("src");
          BBadges.radioactive.alt = img.attr("alt");
          
          // Draw the badges after AJAX has returned.
          radioactiveBadges = '<img src="' + BBadges.radioactive.root + BBadges.radioactive.badges + '" title="' + BBadges.radioactive.alt + '" alt="' + BBadges.radioactive.alt + '" />';
          setTimeout(function(){
            $("#radioactive").html(radioactiveBadges);
          }, BBadges.delayTabLoad);
        },
        onerror: function(response){
          $("#radioactive").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#radioactive").html(GM_config.lang('Unable To Connect'));
        }
      });
    }
    
    // WCG.
    if(BBadges.idWCG){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.wcg.root + BBadges.idWCG + "&xml=true",
        onload: function(response){
          $(response.responseText).find("Badge").each(function(i){
            BBadges.wcg.badges.push($(this).find("url").text());
            BBadges.wcg.alt.push($(this).find("description").text());
          });

          // Draw the badges after AJAX has returned.
          var wcgBadges = '';
          for(var i = 0;i < BBadges.wcg.badges.length;i++){
            wcgBadges += '<img src="' + BBadges.wcg.badges[i] + '" title="' + BBadges.wcg.alt[i] + '" alt="' + BBadges.wcg.alt[i] + '" />\n';
          }
          setTimeout(function(){
            $("#wcg").html(wcgBadges);
          }, BBadges.delayTabLoad);
        },
        onerror: function(response){
          $("#wcg").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#wcg").html(GM_config.lang('Unable To Connect'));
        }
      });
    }

    // Wildlife.
    if(BBadges.idWildlife){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.wildlife.root + BBadges.userPage + BBadges.idWildlife,
        onload: function(response){
          var imgCredit = $(response.responseText).find("img[src^='wildlife_badges/credit']");
          var imgFeather = $(response.responseText).find("img[src^='wildlife_badges/Feder']");
          if(imgCredit.length > 0){
            BBadges.wildlife.badges.push(imgCredit.attr("src"));
            BBadges.wildlife.alt.push(imgCredit.attr("title"));
          }
          if(imgFeather.length > 0){
            BBadges.wildlife.badges.push(imgFeather.attr("src"));
            BBadges.wildlife.alt.push(imgFeather.attr("title"));
          }
          
          // Draw the badges after AJAX has returned.
          var wildlifeBadges = '';
          for(var i = 0;i < BBadges.wildlife.badges.length;i++){
            wildlifeBadges += '<img src="' + BBadges.wildlife.root + BBadges.wildlife.badges[i] + '" title="' + BBadges.wildlife.alt[i] + '" alt="' + BBadges.wildlife.alt[i] + '" />\n';
          }
          setTimeout(function(){
            $("#wildlife").html(wildlifeBadges);
          }, BBadges.delayTabLoad);
        },
        onerror: function(response){
          $("#wildlife").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#wildlife").html(GM_config.lang('Unable To Connect'));
        }
      });
    }

    // WUProp.
    if(BBadges.idWUProp){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.wuprop.root + BBadges.userPage + BBadges.idWUProp,

        onload: function(response){
          var img = $(response.responseText).find("img[src*='img/badge/']");
          if(img.length > 0){
            BBadges.wuprop.badges = img.attr("src");
  
            // Split the image name (e.g. 1000_250_100_0_0.png) and build the alt string.
            var nums = img.attr("src").split('/')[2].replace('.png', '').split('_');
            var apps = {
              'Sapphire': 0,  // 5000
              'Emerald': 0,   // 2500
              'Ruby': 0,      // 1000
              'Gold': 0,      // 500
              'Silver': 0,    // 250
              'Bronze': 0     // 100
            };
  
            for(n in nums){
              switch(nums[n]){
                case '5000':
                apps.Sapphire += 20
                break;
                case '2500':
                apps.Emerald += 20
                break;
                case '1000':
                apps.Ruby += 20
                break;
                case '500':
                apps.Gold += 20
                break;
                case '250':
                apps.Silver += 20
                break;
                case '100':
                apps.Bronze += 20
                break;
              }
            }
  
            var alt = '';
            if(apps.Sapphire > 0){
              alt += "Sapphire " + apps.Sapphire + " apps > 5000hrs.";
            }
            if(apps.Emerald > 0){
              alt += alt.length > 0 ? '\n' : ''
              alt += "Emerald " + apps.Emerald + " apps > 2500hrs.";
            }
            if(apps.Ruby > 0){
              alt += alt.length > 0 ? '\n' : ''
              alt += "Ruby " + apps.Ruby + " apps > 1000hrs.";
            }
            if(apps.Gold > 0){
              alt += alt.length > 0 ? '\n' : ''
              alt += "Gold " + apps.Gold + " apps > 500hrs.";
            }
            if(apps.Silver > 0){
              alt += alt.length > 0 ? '\n' : ''
              alt += "Silver " + apps.Silver + " apps > 250hrs.";
            }
            if(apps.Bronze > 0){
              alt += alt.length > 0 ? '\n' : ''
              alt += "Bronze " + apps.Bronze + " apps > 100hrs.";
            }
            BBadges.wuprop.alt = alt;
          }
          
          // Draw the badges after AJAX has returned.
          var wupropBadges = '<img src="' + BBadges.wuprop.root + BBadges.wuprop.badges + '" title="' + BBadges.wuprop.alt + '" alt="' + BBadges.wuprop.alt + '" />';
          setTimeout(function(){
            $("#wuprop").html(wupropBadges);
          }, BBadges.delayTabLoad);
        },
        onerror: function(response){
          $("#wuprop").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#wuprop").html(GM_config.lang('Unable To Connect'));
        }
      });
    }
    
    // Yoyo.
    if(BBadges.idYoyo){
      GM_xmlhttpRequest({
        method: 'GET',
        timeout: BBadges.delayAJAX,
        url: BBadges.yoyo.root + BBadges.userPage + BBadges.idYoyo,
        onload: function(response){
          $(response.responseText).find("th:contains('Badges Earned')").parent().parent().children().each(function(i){
            var img = $(this).find("img");
            // Skip the header row.
            if(img.length > 0){
              var src = img.attr('src');
              BBadges.yoyo.badges.push(src);
              var imgName = src.slice(37);
              
              switch(imgName[0]){
                case '2':
                  alt = 'Cruncher OGR ';
                  break;
                case '3':
                  alt = 'Evolution@home ';
                  break;
                case '4':
                  alt = 'Muon ';
                  break;
                case '5':
                  alt = 'ECM ';
                  break;
                case '6':
                  alt = 'Euler 625 ';
                  break;
                case '8':
                  alt = 'Harmonious Trees ';
                  break;
              }
              switch(imgName[2]){
                case '1':
                  alt += 'Bronze 10K';
                  break;
                case '2':
                  alt += 'Silver 100K';
                  break;
                case '3':
                  alt += 'Gold 500K';
                  break;
                case '4':
                  alt += 'Master 1M';
                  break;
                case '5':
                  alt += 'Grandmaster 2M';
                  break;
                case '6':
                  alt += 'Guru 5M';
                  break;
                case '7':
                  alt += 'Spirit 10M';
                  break;
                case '8':
                  alt += 'Held 25M';
                  break;
                case '9':
                  alt += 'Half God 50M';
                  break;
                case '10':
                  alt += 'God 100M';
                  break;
              }
  
              BBadges.yoyo.alt.push(alt);
            }
          });
        
          // Draw the badges after AJAX has returned.
          var yoyoBadges = '';
          for(var i = 0;i < BBadges.yoyo.badges.length;i++){
            yoyoBadges += '<img src="' + BBadges.yoyo.badges[i] + '" title="' + BBadges.yoyo.alt[i] + '" alt="' + BBadges.yoyo.alt[i] + '" />\n';
          }
          setTimeout(function(){
            $("#yoyo").html(yoyoBadges);
          }, BBadges.delayTabLoad);
        },
        onerror: function(response){
          $("#yoyo").html(GM_config.lang('Unable To Connect'));
        },
        ontimeout: function(response){
          $("#yoyo").html(GM_config.lang('Unable To Connect'));
        }
      });
    }
  } catch(e){
    alert('An error occurred while checking your stats:\n' + e);
  }
})();

