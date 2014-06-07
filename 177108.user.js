// ==UserScript==
// @name        GM_config Extender Tab Demo
// @namespace   http://www.cryotest.com/
// @description GM_config Extender tabs working again.
// @include     *
// @version     1
// @require     http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require     http://userscripts.org/scripts/source/50018.user.js
// @grant       GM_registerMenuCommand
// ==/UserScript==

(function()
{
  /**********************************************************************************************
  ** I override GM_config Extender's tab functions here.
  ** Once the script has been updated this won't be necessary - just include GM_config Extender.
  ** 
  ** Changes:
  ** --------  
  ** toggleSection():
  ** -Updated element names which were out of date and preventing style assignments from working.
  **
  ** sections2tabs()
  ** -significant rewrite...
  ** -Fixed bugs.
  ** -Corrected tab structure.
  ** -Updated element names to match changes in GM_Config.
  ** -Added tab container to allow setting background styles.
  ** -Removed most styles to configStyle for easier management.
  **********************************************************************************************/

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
      tdat.setAttribute('className','section_header tab'); // does not work - DOES NOW
      if (i==objNum) { // Activate
        // tab
        if (tobj.style.cssText.match(/font-weight/) )
          tobj.setAttribute('style',tobj.style.cssText.replace(/font-weight:[^\;]*/,'font-weight: bold !important'));
        else
          tobj.setAttribute('style',tobj.style.cssText + 'font-weight: bold !important;');
        tobj.setAttribute('selected',true);
        // content
        if (tdat.style.cssText.match(/display:/))
          tdat.setAttribute('style',tdat.style.cssText.replace(/display:[^\;]*/,'display:table !important'));
        else
          tdat.setAttribute('style',tdat.style.cssText +'display:table !important;');
      } else { // DeActivate
        // tab
        if (tobj.style.cssText.match(/font-weight/) )
          tobj.setAttribute('style',tobj.style.cssText.replace(/font-weight:[^\;]*/,'font-weight: normal !important'));
        else
          tobj.setAttribute('style',tobj.style.cssText + 'font-weight: normal !important;');
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
    // Find the current config pages.
    var divs = this.frame.contentWindow.document.getElementsByTagName('div');
    var rows = [];
    for(var i = 0;i < divs.length;i++){
      if(divs[i].id.indexOf('GM_config_section_') == 0 && divs[i].id.indexOf('GM_config_section_header_') != 0) {
          rows.push(divs[i]);
      }
    }
    if (rows.length<1) return;
    // Create a new div to hold the tab structure.
    var anch = document.createElement('div');
    anch.style.cssText = 'border-bottom: 3px solid #cccccc;';
    anch.id = 'GM_config_tab_holder';
    sectionTabs = rows.length;
    // Create tab container header.
    var tab_container = document.createElement('div');
    tab_container.setAttribute('class', "tab-container");
    // Add tabs to the container header.
    for (var i=0;i<sectionTabs;i++) {
      var tab = document.createElement('div');
      tab.setAttribute('class', "tab");
      tab.id = 'GM_config_section_'+i+'_tab';
      tab.addEventListener('click', GM_config.toggleSection, false);
      tab.innerHTML = GM_config.frame.contentWindow.document.getElementById('GM_config_section_header_'+i).innerHTML;
      tab_container.appendChild(tab);
    }
    // Add the tab container to the new tab structure.
    anch.appendChild(tab_container);
    // Add the config. pages to the structure as tab content.
    for (var i=0;i<sectionTabs;i++) {
      anch.appendChild(rows[i]);
      rows[i].style.marginLeft = "auto";
      rows[i].style.marginRight = "auto";
    }
    // Attach the new tab collection and select the first one.
    this.frame.contentWindow.document.getElementById('GM_config_wrapper').insertBefore(anch,this.frame.contentWindow.document.getElementById('GM_config_buttons_holder'));
    this.frame.contentWindow.document.getElementById('GM_config_section_0_tab').setAttribute('selected',true);
    this.toggleSection(0);
  }
  //********************************************************************************



  var TabDemo1 = {
    // Configuration management.
    config: function(){
    
      /**********************************************************************************************
      ** Most of the tab styling is done here.
      **********************************************************************************************/
      var configStyle = "\
        /* General styles */\
        .config_var {text-align: center; padding-top: 5px;} \
        .field_label {padding-left: 5px;} \
        .reset {display: none;} \
        input {width: 50px;} \
        #GM_config_field_wcg {width: 100px;} \
        .config_var {width: 245px; text-align: left !important; margin: 0 auto 4px !important;} \
        .field_label {width: 130px; float: left; margin-top: 4px;} \
        #GM_config_asteroids_field_label {float: left;} \
        /* Tabbed */\
        #GM_config .section_header_holder{margin-top: 0; width: 98%;}\
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
        /* Tab Background */\
        .tab-container {\
          background: none repeat scroll 0 0 rgba(226, 193, 255, 0.59);\
          border-radius: 5px 5px 5px 5px;\
          height: 30px;\
          margin-left: 4px;\
          width: 98%;\
        }\
        /* Tabs */\
        .tab {\
          -moz-user-select: -moz-none;\
          background: -moz-linear-gradient(center top , #2555BB, #669BC1) repeat scroll 0 0 transparent;\
          border-radius: 5px 5px 0 0;\
          color: white;\
          cursor: pointer;\
          display:inline-block;\
          font-size: 11px;\
          font-weight: bold;\
          height: 25px;\
          line-height: 25px;\
          margin-right: 4px;\
          margin-top: 4px;\
          padding-left:10px;\
          padding-right:10px;\
          user-select: none;\
          text-align: center;\
          white-space: nowrap;\
        }\
        /* Selected Tab */\
        .tab[selected=\"true\"] {\
          background: -moz-linear-gradient(center top , #2951A6, #549ACB) repeat scroll 0 0 transparent\
          margin-top: 4px;\
          padding-bottom: 1px;\
        }\
        #GM_config_section_0_tab { margin-left:4px !important; }\
      ";
      
      GM_config.init('GM_config Extender Tab Demo', 
      /* Fields object */
       {
          'config1': {
            'section': ['Tab 1', 'Tab 1 section text.'],
            'label': 'Config 1:',
            'type': 'text',
            'default': ''
          },
          'config2': {
            'label': 'Config 2:',
            'type': 'text',
            'default': ''
          },
          'config3': {
            'label': 'Config 3:',
            'type': 'text',
            'default': ''
          },
          'config4': {
            'label': 'Config 4:',
            'type': 'text',
            'default': ''
          },
          
          'config5': {
            'section': ['Tab 2', 'Tab 2 section text.'],
            'label': 'Config 5:',
            'type': 'text',
            'default': ''
          },
          'config6': {
            'label': 'Config 6:',
            'type': 'text',
            'default': ''
          },
          'config7': {
            'label': 'Config 7:',
            'type': 'text',
            'default': ''
          },
      }, configStyle, {
          open: function(){
            GM_config.addBorder();                          // add a fancy border
            GM_config.resizeFrame('420px', '310px');        // resize the config window
            GM_config.center();
            GM_config.sections2tabs();                      // *****INITIALIZE THE TABS*****
          },
          save: function(){
          }

        }
      );

      // Register the menu items.
      GM_registerMenuCommand("GM_config Extender Tab Demo 1", function(){
        GM_config.open()
      }, 'T');
    }
  }
  
  TabDemo1.config(); 

})();