// ==UserScript==
// @name          Table View Plus
// @version       4.2.0
// @description   Enhancement suite for the Userstyles.org site
// @author        Sonny Razzano
// @namespace     srazzano
// @license       CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include       http://userstyles.org*
// @homepage	  http://userscripts.org/scripts/show/100937
// @updateURL	  https://userscripts.org/scripts/source/100937.meta.js
// @downloadURL	  https://userscripts.org/scripts/source/100937.user.js
// ==/UserScript==

// ============================================================
// ********************** CUSTOMIZE TEXT **********************
// ============================================================
// *** Page Body **********************************************
var tvp_3 = 'Home Page';

// *** LEFT SIDEBAR *******************************************
var tvp_10 = 'Migrate acct. to OpenID';
var tvp_72 = 'Discussions on my styles';
var tvp_78 = 'Create widget for styles';
var tvp_75 = '';
var tvp_12 = 'Style options';
var tvp_13 = 'Table Filter';
var tvp_44 = ' \u2003 Results per page: ';
var tvp_45 = 'OK';
var tvp_46 = 'Separate multiple entries with <> and no spacing. Double click: clears field. Middle click: enters active keywords.'; // Tooltip
var tvp_47 = 'Show Filtered';
var tvp_48 = 'Hide Filtered';
var tvp_49 = 'Create';
var tvp_50 = 'Create Filter'; // Tooltip
var tvp_69 = 'No Entries'; // Tooltip
var tvp_51 = 'Clear';
var tvp_68 = 'Delete Keyword(s)\nMiddle-click input box inserts all keywords'; // Tooltip
var tvp_52 = 'Filtered';
var tvp_104 = 'Table Options';
var tvp_109 = 'Profile for ';
var tvp_111 = 'More:';

// *** TABLE OPTIONS POPUP MENU *******************************
var tvp_0 = 'Userstyles.org Table View Preferences';
var tvp_1 = 'Default sort direction for table';
var tvp_2 = 'Auto fetch metadata on page load';
var tvp_4 = 'Enable Metadata Fetcher (&#119830;&#119816;&#119819;&#119819; &#119821;&#119822;&#119827; fetch data for @-moz-document using RegExp or userstyles.org as url)';
var tvp_5 = 'Metadata previews on hover (Default click)';
var tvp_70 = 'Hide Social and Donate Tags';
var tvp_80 = 'Show Hidden Metadata on Styles Page';
var tvp_81 = 'Enable Brown/Tan Theme';
var tvp_82 = 'Show Table Filter in Sidebar';
var tvp_83 = 'Show Nav Links in Sidebar';
var tvp_90 = 'Sidebar Width Value in px';
var tvp_91 = 'Content Margin Left Value in px';
var tvp_92 = 'Table Width Value in % or px';
var tvp_93 = 'Enable Sidebar, Content and Table Size Mode';
var tvp_94 = 'Size Mode:';
var tvp_95 = 'Enable Stats Keeper (Displays after site updates)';
var tvp_105 = 'Body background-color:'; // Background tint
var tvp_106 = 'Links color:'; // Links color
var tvp_107 = 'Visited links color:'; // Visited links color
var tvp_108 = 'Color Values:';

// *** TABLE STYLES *******************************************
var tvp_74 = 'rgba(44,44,44,.5) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAAAYCAYAAADJcMJ/AAAA0ElEQVR42u3RCRGAMBBDUaoELxVeLzhBQe/NkiyNgcybn3LO9+W8Usrj+fcXY/KGnpA4o2vMExJrdIt5QuKNLjG/RnqMwQiPyYBEj8UIjcmCRI7JCIvJhESNzQiJyYZEjNFoHpMRaT1Wo2lMVqTlmI1mMZmRVmM3msRkR1pMwbgdUwG5OxXjVkwV5M6UjMsxlZCrUzMuxVRDrkzROB1TETk7VeNUTFXkzJSNwzGVkaNTNw7FVEeOLIKxGzMCsrcoxmbMKMjWIhmrMSMha4tmfAGfx9WRixYU2gAAAABJRU5ErkJggg==)'; // Disabled items background

// *** TABLE SUMMARY STATS ************************************
var tvp_58 = 'Total Installs:';
var tvp_59 = 'Weekly Total:';
var tvp_60 = 'Ratings:';
var tvp_61 = 'Good';
var tvp_62 = 'Ok';
var tvp_63 = 'Bad';
var tvp_100 = 'Reset Stats';
var tvp_101 = 'First visit, statistics recorded.';
var tvp_102 = 'last reset ';
var tvp_103 = 'This will clear all stats until next site update. Proceed?';

// *** TABLE HEADER COLUMNS ***********************************
var tvp_15 = '#';
var tvp_22 = 'Styles: ';
var tvp_43 = ' Log in to view your account... ';
var tvp_23 = ' \u2003 Active: '; // space string \u2004=8px, \u2005=7px, \u2006=6px
var tvp_56 = '';
var tvp_24 = ' \u2003 Obsolete: '; // space string \u2004=8px, \u2005=7px, \u2006=6px
var tvp_17 = 'Installs';
var tvp_18 = 'Weekly';
var tvp_19 = 'Updated';
var tvp_20 = 'Rating';
var tvp_21 = 'Discussions';
var tvp_42 = 'Show Obsolete Styles'; // Tooltip
var tvp_25 = 'Hide Obsolete Styles'; // Tooltip
var tvp_96 = 'Fetch/Open metadata of all Styles.\nShift Key or Ctrl Key + left-click excludes obsolete.'; // Tooltip
var tvp_97 = 'Fetch/Open metadata of all Styles.'; // Tooltip
var tvp_98 = 'Close metadata of all Styles.'; // Tooltip
var tvp_110 = 'Reset metadata of all Styles.'; // Tooltip
var tvp_99 = 'Obsolete';

// *** TABLE METADATA ROWS ************************************
var tvp_40 = 'Created on ';
var tvp_41 = 'Updated on ';
var tvp_64 = ' by ';
var tvp_112 = 'Undelete';
var tvp_113 = 'Undelete Style';
var tvp_114 = 'Delete Style';
var tvp_115 = 'Edit Style';
var tvp_116 = 'View Stats';
var tvp_117 = 'Main Screenshot';
var tvp_118 = 'Other Screenshots';
var tvp_119 = 'Created on ';
var tvp_120 = 'Updated on ';
var tvp_121 = 'User ID:';

// *** TABLE TOOLTIPS *****************************************
var tvp_26 = 'Open metadata of all Styles'; // Tooltip
var tvp_27 = 'Close metadata of all Styles'; // Tooltip
var tvp_54 = 'Open table options'; // Tooltip
var tvp_28 = 'Open Cell'; // Tooltip
var tvp_29 = 'Close Cell'; // Tooltip
var tvp_34 = 'Main Screenshot'; // Tooltip
var tvp_35 = 'Other Screenshots'; // Tooltip
var tvp_36 = ' Discussions ('; // Tooltip
var tvp_37 = ' Good, '; // Tooltip
var tvp_38 = ' Ok and '; // Tooltip
var tvp_39 = ' Bad)'; // Tooltip
var tvp_65 = 'Not Rated'; // Tooltip

// *** OWN PAGE AND STYLES PAGE *******************************
var tvp_30 = 'Edit';
var tvp_31 = 'Delete';
var tvp_32 = 'Installs (this week)';
var tvp_33 = '(total)';
var tvp_71 = 'No Screenshots';
// ============================================================
// ******************** END CUSTOMIZE TEXT ********************
// ============================================================

(function() {
  testGM();
  function testGM() {
    const STORAGE_PREFIX = 'ustoe-';
    const LOG_PREFIX = 'Userstyles.org Enhancer: ';
    const LOG = true; // Enable logging
    const DEBUG = false; // Set Debugging ON/OFF
    isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
    log = isGM ? function(msg) {if(LOG) GM_log(msg)} : window.opera ? function(msg) {if(LOG) opera.postError(LOG_PREFIX+msg)} : function(msg) {try {if(LOG) console.log(LOG_PREFIX+msg)} catch(e) {}}
    debug = function(msg) {if(LOG && DEBUG) log('** Debug: ' + msg + ' **')}
    addStyle = isGM ? GM_addStyle : function(css) {var head = $('head')[0]; if(!head) return; var style = $c('style', {type:'text/css',innerHTML:css}); head.appendChild(style)}
    setValue = isGM ? GM_setValue : function(name,value) {switch (typeof(value)) {case 'string': localStorage.setItem(STORAGE_PREFIX+name,'S]' + value); break; case 'number': if(value.toString().indexOf('.') < 0) {localStorage.setItem(STORAGE_PREFIX + name, 'N]' + value)} break; case 'boolean': localStorage.setItem(STORAGE_PREFIX+name, 'B]' + value); break}}
    getValue = isGM ? GM_getValue : function(name,defValue) {var value = localStorage.getItem(STORAGE_PREFIX + name); if(value == null) {return defValue} else {switch(value.substr(0,2)) {case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2) == 'true';}} return value}
    deleteValue = isGM ? GM_deleteValue : function(name) {localStorage.removeItem(STORAGE_PREFIX+name)}
    xhr = isGM ? GM_xmlhttpRequest : function(obj) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {if(obj.onreadystatechange) {obj.onreadystatechange(request)}; if(request.readyState == 4 && obj.onload) {obj.onload(request)}}
      request.onerror = function() {if(obj.onerror) {obj.onerror(request)}}
      try {request.open(obj.method, obj.url, true)} catch(e) {if(obj.onerror) {obj.onerror({readyState:4, responseHeaders:'', responseText:'', responseXML:'', status:403, statusText:'Forbidden'})}; return}
      if(obj.headers) {for(name in obj.headers) {request.setRequestHeader(name,obj.headers[name])}}
      request.send(obj.data); return request;
    }
    jParse = (window.JSON && window.JSON.parse) ? window.JSON.parse : eval;
    jStringify = (window.JSON && window.JSON.stringify) ? window.JSON.stringify : uneval;
  }

  if(typeof devtools=='undefined'){var devtools={};}if(typeof devtools.JSON=='undefined'){devtools.JSON={};devtools.JSON.stringify=function(obj){obj=JSON.stringify(obj);return obj.replace(/"/g,'!~dq~!').replace(/'/g,'!~sq~!');};devtools.JSON.parse=function(str){str=str.replace(/!~dq~!/g,'"').replace(/!~sq~!/g,"'");return JSON.parse(str);};}devtools.dialog={open:function(options,id){this.__setVars(options);if(!id){id=(new Date()).getTime();}this.__var.lastDialogId=id;var wrapper=document.getElementById('devtools-wrapper');if(!wrapper){wrapper=document.createElement('div');wrapper.id='devtools-wrapper';wrapper.innerHTML='<div class="grid">'+'<div id="devtools-cell-topleft" class="dialog-wrapper top left"></div>'+'<div id="devtools-cell-top" class="dialog-wrapper top"></div>'+'<div id="devtools-cell-topright" class="dialog-wrapper top right"></div>'+'<div id="devtools-cell-left" class="dialog-wrapper left"></div>'+'<div id="devtools-cell-center" class="dialog-wrapper center"></div>'+'<div id="devtools-cell-right" class="dialog-wrapper right"></div>'+'<div id="devtools-cell-bottomleft" class="dialog-wrapper bottom left"></div>'+'<div id="devtools-cell-bottom" class="dialog-wrapper bottom"></div>'+'<div id="devtools-cell-bottomright" class="dialog-wrapper bottom right"></div>'+'</div>';document.body.appendChild(wrapper);wrapper=document.getElementById('devtools-wrapper');this.__handleHooks();}wrapper.className=(this.__setting.mask)?'mask':'';var dialog=document.getElementById('devtools-dialog-'+id);if(!dialog||dialog.parentNode.id!=='devtools-cell-'+this.__setting.location.replace('-','')){if(dialog){dialog.parentNode.removeChild(dialog);}dialog=document.createElement('div');dialog.id='devtools-dialog-'+id;dialog.className='dialog'+((this.__setting.class&&this.__setting.class!='')?' '+this.__setting.class:'');dialog.innerHTML='<div class="dialog-close"><span>X</span></div>'+'<div class="dialog-title"><span></span></div>'+'<div class="dialog-content"></div>'+'<div class="dialog-footer"></div>';wrapper.querySelector('#devtools-cell-'+this.__setting.location.replace('-','')).appendChild(dialog);dialog=document.getElementById('devtools-dialog-'+id);dialog.querySelector('.dialog-close').addEventListener('click',function(){devtools.dialog.close(this.parentNode.getAttribute('id').replace(/^devtools-dialog-/,''));},false);}dialog.querySelector('.dialog-close').style.display=(this.__setting.closeButton)?'block':'none';dialog.querySelector('.dialog-title').firstElementChild.textContent=this.__setting.title;dialog.querySelector('.dialog-content').innerHTML=this.__parseTokens(this.__setting.message);dialog.querySelector('.dialog-footer').textContent='';var button,buttonImg,i;for(i=0;i<this.__setting.buttons.length;i++){button=document.createElement('button');button.textContent=this.__setting.buttons[i].text;button.setAttribute('data-devtools-dialog-button',this.__setting.buttons[i].text);if(this.__setting.buttons[i].icon){buttonImg=document.createElement('img');buttonImg.setAttribute('src',this.__setting.buttons[i].icon);buttonImg.setAttribute('alt','');button.insertBefore(buttonImg,button.firstChild);}if(typeof this.__setting.buttons[i].tooltip=='string'){button.setAttribute('title',this.__setting.buttons[i].tooltip);}button.addEventListener('click',this.__setting.buttons[i].callback,false);dialog.querySelector('.dialog-footer').appendChild(button);}var style=document.getElementById('devtools-dialog-style');if(!style||style.className!=this.__setting.theme){if(style){style.parentNode.removeChild(style);}style=document.createElement('style');style.id='devtools-dialog-style';style.className=this.__setting.theme;style.setAttribute('type','text/css');style.textContent=this.__themes[this.__setting.theme].finalcss||(this.__themes._base.css+'\n'+this.__themes[this.__setting.theme].css);document.querySelector('head').appendChild(style);}return id;},close:function(id){if(!id){if(!this.__var.lastDialogId){return false;}id=this.__var.lastDialogId;}var dialog=document.getElementById('devtools-dialog-'+id);if(!dialog){return false;}else{dialog.querySelector('.dialog-close').removeEventListener('click',function(){devtools.dialog.close(this.parentNode.getAttribute('id').replace(/^devtools-dialog-/,''));},false);var inputs=this.getInputs(id);dialog.parentNode.removeChild(dialog);}if(document.querySelector('div[id*="devtools-dialog-"]')==null){var wrapper=document.getElementById('devtools-wrapper');wrapper.parentNode.removeChild(wrapper);var styles=document.querySelectorAll('head style[id^="devtools-dialog-theme-"]');for(var i=0;i<styles.length;i++){styles[i].parentNode.removeChild(styles[i]);}}return inputs;},setDefaults:function(options){this.__userDefaults={};for(var i in options){if(this.__defaults.hasOwnProperty(i)){this.__userDefaults[i]=options[i];}}},defineToken:function(tag,attributes,replacement){if(typeof tag!='string'||/^\w+$/.test(tag)===false){return false;}if(typeof this.__tokens[tag]!='undefined'){return false;}if(typeof attributes=='object'&&attributes!=null){for(var a in attributes){if(!attributes.hasOwnProperty(a)){continue;}if(typeof attributes[a].validation=='undefined'){return false;}}}else{attributes={};}if(typeof replacement!='function'&&typeof replacement!='string'){return false;}this.__tokens[tag]={attributes:attributes,replacement:replacement};return true;},defineTheme:function(name,css,base){if(typeof name!='string'||typeof css!='string'){return false;}if(!/^\w+$/.test(name)||name=='default'){return false;}var cssOut='';var bases={};var baseTmp=base;if(typeof base=='string'){for(var i=0;i<5;i++){if(this.__themes[baseTmp]&&!bases[baseTmp]){cssOut='/* devtools.dialog prerequisite theme: '+baseTmp+' */\n'+this.__themes[baseTmp].css+'\n\n'+cssOut;bases[baseTmp]=true;baseTmp=this.__themes[baseTmp].base;}else{break;}}}else{base=null;}cssOut=('/* devtools.dialog base reset */\n'+this.__themes._base.css+"\n\n"+cssOut+'/* devtools.dialog theme: '+name+' */\n'+css).replace('%theme%',name);this.__themes[name]={base:base,finalcss:cssOut,css:css};return true;},defineHook:function(name,func){if(typeof this.__hooks[name]!='undefined'||typeof func!='function'){return false;}this.__hooks[name]=func;return true;},getInputs:function(id){if(!id){if(!this.__var.lastDialogId){return false;}id=this.__var.lastDialogId;}var dialog=document.querySelector('#devtools-dialog-'+id);if(dialog){var out={},i,j;var simpleInputs=dialog.querySelectorAll('[data-devtools-input="text"], [data-devtools-input="select"]');for(i=0;i<simpleInputs.length;i++){out[simpleInputs[i].getAttribute('name')]=simpleInputs[i].value;}var checkboxInputs=dialog.querySelectorAll('[data-devtools-input="checkbox"]');for(i=0;i<checkboxInputs.length;i++){out[checkboxInputs[i].getAttribute('name')]=(checkboxInputs[i].checked)?true:false;}var radioInputs=dialog.querySelectorAll('[data-devtools-input="radio"]');var radios;for(i=0;i<radioInputs.length;i++){radios=radioInputs[i].querySelectorAll('input');for(j=0;j<radios.length;j++){if(radios[j].checked){out[radios[j].getAttribute('name').split('-')[0]]=radios[j].value;break;}}}return out;}return false;},__var:{lastDialogId:false},__defaults:{title:'Script Notification',message:'This is a dialog from a userscript.',mask:true,closeButton:true,location:'center',buttons:null,theme:'default',class:''},__settingsValidation:{title:['type','string'],message:['type','string'],mask:['type','boolean'],closeButton:['type','boolean'],location:['match',/^(top-left|top|top-right|left|center|right|bottom-left|bottom|bottom-right)$/],buttons:null,theme:null,class:['match',/^[\w- ]+$/]},__themes:{'_base':{css:'#devtools-wrapper,#devtools-wrapper *{border-radius:0!important;-webkit-border-radius:0!important;box-shadow:none!important;-webkit-box-shadow:none!important;background:transparent!important;border:none!important;border-collapse:separate!important;border-spacing:0!important;color:#000!important;float:none!important;font-family:Arial,sans-serif!important;font-size:12px!important;font-weight:400;height:auto!important;letter-spacing:normal!important;line-height:18px!important;margin:0!important;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:1.0!important;padding:0!important;text-align:left!important;text-decoration:none!important;text-shadow:none!important;text-transform:none!important;vertical-align:middle!important;visibility:hidden!important;white-space:normal!important;width:auto!important;}#devtools-wrapper .dialog-content fieldset>label>input{position:relative;top:0}'+'#devtools-wrapper{background-color:rgba(0, 0, 0, 0.8)!important;display:block!important;height:100%!important;left:0!important;overflow:auto!important;position:fixed!important;top:0!important;visibility:hidden!important;width:100%!important;z-index:2147483640!important;}'+'#devtools-wrapper.mask{background-color:rgba(0, 0, 0, 0.8)!important;visibility:visible!important;}'+'#devtools-wrapper .grid{display:table!important;height:100%!important;position:fixed!important;visibility:hidden!important;width:100%!important;}'+'#devtools-wrapper .center,#devtools-wrapper .top,#devtools-wrapper .bottom,#devtools-wrapper .left,#devtools-wrapper .right{display:table-cell!important;padding:15px!important;}'+'#devtools-wrapper .left,#devtools-wrapper .center,#devtools-wrapper .right{vertical-align:middle!important;}'+'#devtools-wrapper .top{vertical-align:top!important;}'+'#devtools-wrapper .bottom{vertical-align:bottom!important;}'+'#devtools-wrapper .left .dialog{clear:both!important;float:left!important;}'+'#devtools-wrapper .right .dialog{clear:both!important;float:right!important;}'+'#devtools-wrapper .center .dialog,#devtools-wrapper .bottom .dialog,#devtools-wrapper .top .dialog{margin-left:auto!important;margin-right:auto!important;}'+'#devtools-wrapper .dialog,#devtools-wrapper .dialog *{visibility:visible!important;}'+'#devtools-wrapper .dialog fieldset{border:1px solid #000!important;margin-bottom:10px!important;padding:5px!important;}'+'#devtools-wrapper .dialog legend{padding:0 5px!important;}'+'#devtools-wrapper .dialog input[type="text"],#devtools-wrapper input[type="password"],#devtools-wrapper textarea,#devtools-wrapper select{-moz-appearance:none!important;-webkit-appearance:none!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;background:#444!important;border:1px solid transparent!important;box-sizing:border-box!important;-webkit-box-sizing:border-box!important;color:#FFF!important;margin:2px 5px!important;padding:2px!important;width:100%!important;}'+'#devtools-wrapper .dialog input[type="checkbox"],#devtools-wrapper input[type="radio"]{margin-right:6px!important;vertical-align:top!important;}'+'#devtools-wrapper .dialog input[type="radio"]+span{margin-right:12px!important;vertical-align:middle!important;}'+'#devtools-wrapper .dialog .progress-bar{box-sizing:border-box!important;background-color:#fff!important;border:1px solid #000!important;box-sizing:border-box!important;height:20px!important;margin-left:auto!important;margin-right:auto!important;overflow:hidden!important;position:relative!important;width:100%!important;}'+'#devtools-wrapper .dialog .progress-bar-inner{background-color:#000!important;height:100%!important;left:0!important;position:absolute!important;top:0!important;}'+'#devtools-wrapper .dialog .progress-bar-text{height:100%!important;position:relative!important;text-align:center!important;width:100%!important;z-index:1!important;}'+'#devtools-wrapper .dialog .dialog-content br:first-child, #devtools-wrapper .dialog .dialog-content br:last-child{display:none!important;}'+'#devtools-wrapper .dialog strong{font-weight:bold!important;}'+'#devtools-wrapper .dialog em{font-style:italic!important;}'+'#devtools-wrapper .dialog ins{text-decoration:underline!important;}'+'#devtools-wrapper .dialog a:link,#devtools-wrapper .dialog a:hover{color:EE0000!important;text-decoration:underline!important;}'+'#devtools-wrapper .dialog a:visited{color:#74198b!important;}'},'default':{css:'#devtools-wrapper .dialog{border-radius:10px!important;-webkit-border-radius:10px!important;box-shadow:0 0 50px #000!important;-webkit-box-shadow:0 0 50px #000!important;background-color:#eee !important;margin-bottom:5px!important;margin-top:5px!important;padding:5px!important;position:relative!important;width:330px!important;}'+'#devtools-wrapper .dialog .dialog-close span{color:#eee!important;font-size:18px!important;font-weight:700;line-height:25px!important;vertical-align:middle!important;}'+'#devtools-wrapper .dialog .dialog-title{border-radius:5px!important;-webkit-border-radius:5px!important;background-color:#444!important;color:#eee!important;height:15px!important;padding:4px 0 7px 0!important;text-align:center!important}'+'#devtools-wrapper .dialog .dialog-title span{color:#eee!important;font-size:14px!important;font-weight:700;}'+'#devtools-wrapper .dialog .dialog-content{color:#000!important;margin:10px 5px!important;max-width:100%!important;}'+'#devtools-wrapper .dialog .dialog-footer{text-align:center!important;width:100%!important;}'+'#devtools-wrapper .dialog .dialog-footer button{background:linear-gradient(#555,#222)!important;background:-webkit-linear-gradient(#555,#222)!important;border:1px solid #333!important;box-shadow:0 0 1px #666 inset!important;-webkit-box-shadow:0 0 1px #666 inset!important;border-radius:10px!important;-webkit-border-radius:10px!important;color:#FFF!important;cursor:pointer!important;display:inline-block!important;height:25px!important;margin-left:2px!important;margin-right:2px!important;padding:0px 5px!important;}'+'#devtools-wrapper .dialog .dialog-footer button:hover{background:linear-gradient(#222,#555)!important;background:-webkit-linear-gradient(#222,#555)!important}}'+'#devtools-wrapper .dialog hr{background-color:#ddd!important;margin:7px 0 7px 0!important;}'+'#devtools-wrapper .dialog fieldset{border-radius:4px!important;-webkit-border-radius:4px!important;border:1px solid #aaa!important}'+'#devtools-wrapper .dialog label{-moz-box-align:center!important;-webkit-box-align:center!important;display:block!important;font-weight:bold!important;}'+'#devtools-wrapper .dialog label span{font-weight:normal!important;position:relative!important;top:-3px!important}'+'#devtools-wrapper .dialog legend{font-weight:bold!important;}'+'#devtools-wrapper .dialog input[type="text"],#devtools-wrapper input[type="password"],#devtools-wrapper textarea,#devtools-wrapper select{border-radius:4px!important;-webkit-border-radius:4px!important;background:#444!important;border:1px solid transparent!important;color:#FFF!important}'+'#devtools-wrapper .dialog input[type="text"]:focus,#devtools-wrapper input[type="password"]:focus,#devtools-wrapper textarea:focus,#devtools-wrapper select:focus{border:1px solid #444!important;}'+'#devtools-wrapper .dialog input[type="checkbox"] label{display:block!important;}'+'#devtools-wrapper .dialog .progress-bar{border-radius:5px!important;-webkit-border-radius:5px!important;background-color:#fafafa!important;border:1px solid #ddd!important}'+'#devtools-wrapper .dialog .progress-bar-inner{border-radius:5px!important;-webkit-border-radius:5px!important;background-color:#444!important}'+'#devtools-wrapper .dialog .progress-bar-text{text-shadow:#f2f2f2 -1px 0 3px #f2f2f2 0 -1px 3px #f2f2f2 1px 0 3px #f2f2f2 0 1px 3px #f2f2f2 -1px -1px 3px #f2f2f2 1px 1px 3px!important;}#devtools-wrapper .dialog-content div:nth-child(2) label span{position:relative!important;top:0!important}#devtools-wrapper .dialog-content>div:nth-child(2)>label>span{position:relative!important;top:-3px!important}'}},__tokens:{'progressbar':{attributes:{'percent':{defaultValue:'',validation:/^(100|\d{1,2})$/},'calculate':{defaultValue:'',validation:/^\s*\d+\s*\/\s*\d+\s*$/}},replacement:function(tag){var p;if(tag.attributes.calculate!=''){p=/^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(tag.attributes.calculate);if(p){p=(p[1]/p[2])*10000;p=Math.round(p)/100;}else{p=0;}}else if(tag.attributes.percent!=''){p=tag.attributes.percent;}else{return false;}if(p>100){p=100;}if(p<0){p=0;}p+='%';return'<div class="progress-bar"><div class="progress-bar-text">'+p+'</div><div class="progress-bar-inner" style="width: '+p+' !important;"></div></div>';}},'input':{attributes:{'type':{validation:/^(text|textarea|radio|checkbox|select|password|button)$/},'name':{validation:/^\w+$/},'label':{defaultValue:'',validation:false},'options':{defaultValue:'',validation:/^{.+}$/},'defaultValue':{defaultValue:'',validation:false},'hook':{defaultValue:'',validation:/^\w+$/}},replacement:function(tag){var r=false;switch(tag.attributes.type){case 'text':r='<label>'+tag.attributes.label+'<input type="text" name="'+tag.attributes.name+'" value="'+tag.attributes.defaultValue+'" data-devtools-input="text"/></label>';break;case 'password':r='<label>'+tag.attributes.label+'<input type="password" name="'+tag.attributes.name+'" value="'+tag.attributes.defaultValue+'" data-devtools-input="text"/></label>';break;case 'textarea':r='<label>'+tag.attributes.label+'<textarea name="'+tag.attributes.name+'" data-devtools-input="text">'+tag.attributes.defaultValue+'</textarea></label>';break;case 'checkbox':r='<div><label><input type="checkbox" name="'+tag.attributes.name+'"'+((tag.attributes.defaultValue=='true')?' checked':'')+' data-devtools-input="checkbox"/><span>'+tag.attributes.label+'</span></label></div>';break;case 'radio':try{var options=devtools.JSON.parse(tag.attributes.options);var hash=Math.floor(Math.random()*100000);r='<div data-devtools-input="radio"><fieldset><legend>'+tag.attributes.label+'</legend>';for(var key in options){r+='<label><input type="radio" name="'+tag.attributes.name+'-'+hash+'" value="'+options[key]+'"';r+=((tag.attributes.defaultValue==options[key])?' checked':'')+'/><span>'+key+'</span></label>';}r+='</fieldset></div>';}catch(e){return false;}break;case 'select':try{var options=devtools.JSON.parse(tag.attributes.options);r='<div><label>'+tag.attributes.label+'</label>';r+='<select name="'+tag.attributes.name+'"'+((tag.attributes.hook=='color')?' data-devtools-hook="'+tag.attributes.hook+'"':'')+' data-devtools-input="select">';for(var key in options){if(typeof options[key]=='string'){r+='<option value="'+options[key]+'"';r+=(tag.attributes.hook=='color'&&/^#[0-9a-f]{3,6}$/i.test(options[key]))?' style="background-color:'+options[key]+' !important;"':'';r+=((tag.attributes.defaultValue==options[key])?' selected':'')+'>'+key+'</option>';}}r+='</select></div>';}catch(e){return false;}break;}return r;}}},__hooks:{'color':function(){var el=document.querySelectorAll('[data-devtools-hook="color"]');if(!el){return;}setInterval(function(){var el=document.querySelectorAll('[data-devtools-hook="color"]');if(el){for(var i=0;i<el.length;i++){if(/^#[0-9a-f]{3,6}$/i.test(el[i].value)){el[i].setAttribute('style','background-color: '+el[i].value+' !important');}}}},500);}},__userDefaults:{},__setting:{},__handleHooks:function(){for(var hook in this.__hooks){this.__hooks[hook]();}},__setVars:function(options){this.__setting={};var out=this.__copyObj(this.__defaults);var setting,validationCopy,validationCount,valid;for(setting in this.__userDefaults){if(this.__defaults.hasOwnProperty(setting)){out[setting]=this.__copyObj(this.__userDefaults[setting]);}}if(typeof options=='object'){for(setting in options){if(this.__defaults.hasOwnProperty(setting)){out[setting]=options[setting];}}}for(setting in out){if(setting=='buttons'){this.__setting[setting]=this.__validateButtons(out[setting]);continue;}if(setting=='theme'){this.__setting[setting]=this.__validateTheme(out[setting]);continue;}if(this.__settingsValidation.hasOwnProperty(setting)){validationCopy=this.__copyObj(this.__settingsValidation[setting]);valid=false;switch(validationCopy.shift()){case 'type':for(validationCount=0;validationCount<validationCopy.length;validationCount++){if(validationCopy[validationCount]=='array'){if(out[setting]instanceof Array){valid=true;this.__setting[setting]=out[setting];break;}else if(this.__userDefaults[setting]instanceof Array){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}else if(typeof out[setting]==validationCopy[validationCount]){valid=true;this.__setting[setting]=out[setting];break;}else if(typeof this.__userDefaults[setting]==validationCopy[validationCount]){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}break;case 'match':for(validationCount=0;validationCount<validationCopy.length;validationCount++){if(validationCopy[validationCount].test(out[setting])){valid=true;this.__setting[setting]=out[setting];break;}else if(validationCopy[validationCount].test(this.__userDefaults[setting])){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}break;}if(!valid){this.__setting[setting]=this.__copyObj(this.__defaults[setting]);}}}},__validateButtons:function(buttons){var btns=[];if(typeof buttons=='object'&&buttons instanceof Array){var btnNum,btnAttr,o;button:for(btnNum=0;btnNum<buttons.length;btnNum++){if(typeof buttons[btnNum]!='object'){continue button;}for(btnAttr in buttons[btnNum]){o=buttons[btnNum][btnAttr];switch(btnAttr){case 'text':if(typeof o!='string'){o='';}break;case 'tooltip':if(typeof o!='string'){o=false;}break;case 'icon':if(typeof o!='string'){o=false;}break;case 'callback':if(typeof o!='function'){continue button;}break;}}btns.push(buttons[btnNum]);}}return btns;},__validateTheme:function(theme){if(typeof theme!='string'||theme==''){return this.__defaults.theme;}if(typeof this.__themes[theme]=='object'&&this.__themes[theme]!==null){var t=this.__themes[theme];if(t.base){if(typeof this.__themes[t.base]=='object'&&this.__themes[t.base]!==null){return theme;}else{return this.__defaults.theme;}}else{return theme;}}return this.__defaults.theme;},__parseTokens:function(text){var tagSplitRegex=/({\s*\w+\s*(?:\w+(?:\s*=\s*(?:".*?"|'.*?'))?\s*|\s*)})/;var tagRegex=/{\s*(\w+)\s*(?:(\w+(?:\s*=\s*(?:".*?"|'.*?'))?)+\s*|\s*)}/;var attrRegex=/(\w+)\s*=\s*(".*?"|'.*?')/g;var text_obj=text.split(tagSplitRegex);var i,match,attr,tag;token_search:for(i=1;i<text_obj.length;i+=2){tag={};match=tagRegex.exec(text_obj[i]);tag.name=match[1];tag.attributes={};if(typeof this.__tokens[tag.name]=='undefined'){continue;}if(typeof match[2]!='undefined'){while((attr=attrRegex.exec(match[2]))!=null){attr[2]=attr[2].substring(1,attr[2].length-1);if(typeof this.__tokens[tag.name].attributes[attr[1]]=='undefined'){continue;}if(this.__tokens[tag.name].attributes[attr[1]].validation===false){tag.attributes[attr[1]]=attr[2];}else if(this.__tokens[tag.name].attributes[attr[1]].validation.test(attr[2])){tag.attributes[attr[1]]=attr[2];}else if(typeof this.__tokens[tag.name].attributes[attr[1]].defaultValue=='string'){tag.attributes[attr[1]]=this.__tokens[tag.name].attributes[attr[1]].defaultValue;}else{continue token_search;}}}for(attr in this.__tokens[tag.name].attributes){if(!this.__tokens[tag.name].attributes.hasOwnProperty(attr)){continue;}if(typeof tag.attributes[attr]=='undefined'){if(typeof this.__tokens[tag.name].attributes[attr].defaultValue=='string'){tag.attributes[attr]=this.__tokens[tag.name].attributes[attr].defaultValue;}else{continue token_search;}}}var rep=this.__tokens[tag.name].replacement;if(typeof rep=='string'){text_obj[i]=rep;}else if(typeof rep=='function'){var rep_result=rep(tag);if(typeof rep_result!='string'){continue token_search;}text_obj[i]=rep_result;}}return text_obj.join('');},__copyObj:function(obj){if(obj==null||typeof(obj)!='object'||obj instanceof RegExp){return obj;}var c=new obj.constructor();for(var key in obj){c[key]=this.__copyObj(obj[key]);}return c;
  } }

  if(typeof devtools.dialog!='undefined'){devtools.config={open:function(){var msg=(typeof this.__options.html=='string')?this.__options.html+'<hr/>':'';for(var name in this.__options.settings){msg+=this.__options.settings[name].input;}devtools.dialog.open({message:msg,title:this.__options.title,mask:true,buttons:[{text:'Save',icon:this.__icons.save,callback:this.__save},{text:'Save & Reload',icon:this.__icons.save,callback:function(){devtools.config.__save();document.location.reload();}},{text:'Close',icon:this.__icons.close,callback:this.close}],theme:(typeof this.__options.theme.css=='string')?'devtoolsconfig':'default'},'devtools-config');},close:function(){devtools.dialog.close('devtools-config');},get:function(name){if(this.__options.settings[name]!==null&&typeof this.__options.settings[name]!='undefined'){return getValue('devtools-config-'+name,this.__options.settings[name].defaultValue);}return undefined;},getAll:function(){var vals={};var allVals=listValues();for(var val in allVals){if(/^devtools-config-/.test(val)){vals[val]=this.get(val);}}return vals;},init:function(options){if(typeof options!='object'||!options){return false;}if(!options.settings){return false;}if(options.prefix){this.__options.prefix=options.prefix;}this.__options.title=(typeof options.title=='string')?options.title:'Configuration Options';var setting,name;for(name in options.settings){if(!/^\w+$/.test(name)||!options.settings.hasOwnProperty(name)){continue;}this.__options.settings[name]={};setting=options.settings[name];if(typeof setting.type=='string'){if(setting.type=='text'||setting.type=='textarea'||setting.type=='password'){this.__options.settings[name].defaultValue=(typeof setting.defaultValue=='string')?setting.defaultValue:'';this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+(this.get(name)||this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"}';}if(setting.type=='checkbox'){this.__options.settings[name].defaultValue=(setting.defaultValue==true||setting.defaultValue=='true')?true:false;this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+((typeof this.get(name)=='boolean')?this.get(name):this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"}';}if(setting.type=='radio'||setting.type=='select'){this.__options.settings[name].defaultValue=(typeof setting.defaultValue=='string')?setting.defaultValue:'';this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+(this.get(name)||this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"';this.__options.settings[name].input+=' options="'+((typeof setting.options=='object')?devtools.JSON.stringify(setting.options):'')+'"';this.__options.settings[name].input+=((setting.colorHook===true&&setting.type=='select')?' hook="color"':'')+'}';}}}this.__options.html=(typeof options.html=='string')?options.html:false;this.__options.theme.useBase=(options.useBase===false)?false:true;this.__options.theme.css=(typeof options.css=='string')?options.css:null;if(typeof this.__options.theme.css=='string'){devtools.dialog.defineTheme('devtoolsconfig',this.__options.theme.css,((this.__options.theme.useBase)?'default':null));}this.__initSettings=options;return true;},__initSettings:null,__save:function(options){options=devtools.dialog.getInputs('devtools-config');for(var name in options){if(!options.hasOwnProperty(name)){continue;}setValue('devtools-config-'+name,options[name]);}var img=document.querySelector('#devtools-dialog-devtools-config [data-devtools-dialog-button="Save"] img');img.src=devtools.config.__icons.savecomplete;setTimeout(function(){img.src=devtools.config.__icons.save;},2000);devtools.config.init(devtools.config.__initSettings);return true;},__options:{title:'',html:'',theme:{useBase:true,css:false},settings:{},prefix:'my_storage_prefix'},__icons:{save:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKCSURBVHjaYjTL3lPIwMAgD8Q2QKwExDwMDP9ZgDQjw38GMGBmYmRgAuL///8x/PvH8IGNleHO95+/O09N81wDEEAghVqzS61SQOrVpdnBev7/+8/w6w8Q//4H1szJzsTAyMjA8OX7P4YvP/7y33v+xWDhzrszzLK28QMEEBNQvS1I1/pTnxiA+oC2/GfIm3waaBOQA9TFygKxHWTgd6CBf/4xMP5lYGKJd1cW5mRnmwoQQCADJEC2gjT8Bsr+/gNx928gn4WZAWwASO77L6gc0IIDlz8zsLEyM3z/+YcNIIBAXuD68w/scLAiEGACufc/SDPQ6UD4A2jz95//gS78D3YliH729gfIMEaAAGIBBdhfoAAQMfyE2l6bYADWDEQMv//+Z/j2E+R0cAACzQXCfyDX/AUHKkAAgUP7318GsNOaF5wHehvoZ0aY7QwMINf9AXoNGiFgICAgBDSAGawHIIBYGMBOApn+l0FMXBoUGZD4A+uAOhlo4///UC+AnAG05PfvP6DoYgAIIJALGP7+BRsGBoxwBgPEyf8h4QOh/oPlQU7//RuSLgACCGzAn7//GKBWgv0ICjgGsEKIf8H+Btv+F5xGgCyGn7//g10AEECgQGT4+w/i5LpIGQZiQOnsq8BwgbgEIIBYQFH2Fxa6QEMmHkvBqznPcjbQy3/ACQukASCAWCB+/Q8OcRCwkokl6IJ/QBv//gYnPwaAAGIB+u0/0AuMsDA49mQxXs0msnZAF/wFpw+QXoAAYgFa/uDXn3+Kxspc4AxTYD2HoAvEeYEu+Au28D1AADGaZe3qBxqkBnSBJdBIQZCzwFH3/x84kJBpWMxAIv3/ZwZGpssAAQYAIXxui1/HoMEAAAAASUVORK5CYII%3D',savecomplete:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAAN6SURBVDhPTZLrT5tlGIf7HziDi/GLZsk0ZsYYDq0YsrEAbrq5KPvieWEwOk6DSWYmh204YYByBoHCKO06oIVWThaEopgFNrp1DOQwgoMhOg6FVqDjVA6XT19j4ocrT94373397vt+H5kitusLQYHAJnAK3IpYy64ARcy/vBXXRUD8z/gk6tibHbLpVfz6yt7SA917dV57ZKKgcnBqjcGpdTa2dlkXrG3usLS6jX3JjWNlS3qedTl46eY+Tna+x7leJaHifFH92phHMDb4eI20+nnW3KLYvcOZnD6cri3sy1usrG1L4qQ7Vwg2B1I4kkXS/QQKR7M5YNyPR7A0IASX9XMsi489eATzy26cT7dYF8K+2X72aJ4hdySDRJtSouBhphC8IgnctolVIZhlTrTsQZlrZV6cro0dNkRXQS1vE289S/F4NlH3PqFqsoTPb32Id36UR2DZtT56yqW6Wf5Y3JT407Ep0rel9MoRLT6Nb6CZKuOr4VhKJ3LIGL7EoaZgfGMbJAFa221OaPIJzbtBpEg/m2clrugeyqJunlO/QJFILp7MJGciDe10OYfbAkhv/xE/ZSuy56+eZH/NPt5tC8FL8yzyqghSbk6TopvGX3uKUz0fUfvkOlmTyfxgryHaGk6oPpUK8wR+kc3IZKUyrg1cJl8sKG/0mtSuj/pjwnQmXm14GeOcjpK/MjEuaCl5nMOhxqMkXO/n+6ZxfM80CkGZjCLxS1IenCdt6Etp1qMdQYhLQvbYVfT2KqrtRTQ76njHEoxS3cF51Sh5DSP4RpjECN+E4t/sh+r3AjJGk/hu/Ar6mWrShpNodRhQLxTS5WrhwkAcqocV0p04VzrEt3W/4RMulugvlnjE9CmB5gC0U+XkT6STKeZtWdRTs6ii3WWkeqaM4+2BZP0aLt3KmOIHpOv68TldLwRxFtpsThSazzhuOYJhRkPFkzwKZ9Ix/F1Fh6uRD345hmGklluPuiVBVMF9vlbbhECP7M3Yzt3Wuw6Sb0wR35vAQbM/hjkNRqeG7lUzyUOJRFrel9L/6yAy9y6plVa8w+p2ZfKYzknT7QVMvXZpvovWixyzhNDiNKCaLiCyJ1x6/39SK/pIKr/jEThkipjOfHl0h1ke/ZNTHtWOPMqMPCeRg02HCTKdQHFBhU+EUSysXrRsEEV6Kdk7rHbZ+7S+5x96SM+LUN/dOQAAAABJRU5ErkJggg==',close:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII%3D'}};
  }

  devtools.config.init({
    title: tvp_0,
    settings: {
      'userid': {
        type: 'text',
        label: tvp_121,
        defaultValue: ''
      },
      'sortdir': {
        type: 'radio',
        label: tvp_1,
        options: {
          'Descending': 'desc',
          'Ascending': 'asc'
        },
        defaultValue: 'desc'
      },
      'theme': {
        type: 'checkbox',
        label: tvp_81,
        defaultValue: false
      },
      'filter': {
        type: 'checkbox',
        label: tvp_82,
        defaultValue: true
      },
      'links': {
        type: 'checkbox',
        label: tvp_83,
        defaultValue: false
      },
      'tags': {
        type: 'checkbox',
        label: tvp_70,
        defaultValue: false
      },
      'stats': {
        type: 'checkbox',
        label: tvp_95,
        defaultValue: true
      },
      'metadata': {
        type: 'checkbox',
        label: tvp_4,
        defaultValue: true
      },
      'auto': {
        type: 'checkbox',
        label: tvp_2,
        defaultValue: false
      },
      'popup': {
        type: 'checkbox',
        label: tvp_5,
        defaultValue: false
      },
      'hiddenmeta': {
        type: 'checkbox',
        label: tvp_80,
        defaultValue: false
      },
      'sizemode': {
        type: 'checkbox',
        label: tvp_93,
        defaultValue: false
      },
      'label': {
        type: 'textarea',
        label: tvp_94,
        defaultValue: tvp_94
      },
      'sidebar': {
        type: 'text',
        label: tvp_90,
        defaultValue: '295px'
      },
      'content': {
        type: 'text',
        label: tvp_91,
        defaultValue: '300px'
      },
      'table': {
        type: 'text',
        label: tvp_92,
        defaultValue: '60%'
      },
      'label2': {
        type: 'textarea',
        label: tvp_108,
        defaultValue: tvp_108
     },
     'tint': {
        type: 'text',
        label: tvp_105,
        defaultValue: '#D5C6A5'
      },
      'nonvisited': {
        type: 'text',
        label: tvp_106,
        defaultValue: '#00A'
      },
      'visited': {
        type: 'text',
        label: tvp_107,
        defaultValue: '#909'
      }
    },
    css: '\
         #devtools-wrapper input[type="text"]{margin:0 5px 0 19px!important;max-width:50px!important;text-align:center!important}\
         #devtools-wrapper .dialog-content>label:not(:first-child){font-weight:normal!important;direction:rtl!important;padding-top:2px!important}\
         #devtools-wrapper .dialog input[type="text"]{margin-top:-2px!important}\
         #devtools-wrapper .dialog-content>label:nth-child(12){font-weight:bold!important;direction:ltr!important}\
         #devtools-wrapper .dialog-content>label:nth-child(16){font-weight:bold!important;direction:ltr!important;margin-right:81px!important;text-align:right!important}\
         #devtools-wrapper .dialog-content>label:nth-last-child(-n+3){direction:ltr!important;text-align:right!important}\
         #devtools-wrapper .dialog-content>label:nth-last-child(-n+3)>input{min-width:140px!important}\
         #devtools-wrapper .dialog-close,#devtools-wrapper textarea{display:none!important}\
         #devtools-wrapper .dialog [data-devtools-input="radio"] label{display:inline!important}\
         #devtools-wrapper .dialog [data-devtools-input="radio"] label>span{position:relative;top:-2px}\
         #devtools-wrapper .dialog .dialog-footer button:first-child{display:none!important}\
         #devtools-wrapper .dialog .dialog-footer button img{margin-right:5px!important;vertical-align:top!important}'
  });

  var scriptID = 100937, version = '4.2.0';
  var userid = devtools.config.get('userid');
  var sortdir = devtools.config.get('sortdir');
  var stats = devtools.config.get('stats');
  var metadata = devtools.config.get('metadata');
  var hiddenmeta = devtools.config.get('hiddenmeta');
  var auto = devtools.config.get('auto');
  var popup = devtools.config.get('popup');
  var theme = devtools.config.get('theme');
  var filter = devtools.config.get('filter');
  var tags = devtools.config.get('tags');
  var sidebar = devtools.config.get('sidebar');
  var content = devtools.config.get('content');
  var table = devtools.config.get('table');
  var tint = devtools.config.get('tint');
  var nonvisited = devtools.config.get('nonvisited');
  var visited = devtools.config.get('visited');
  var links = devtools.config.get('links');
  var sizemode = devtools.config.get('sizemode');
  var hideObsolete = getValue('hideObsolete');
  if(!getValue('keyWords')) setValue('keyWords', '');
  if(getValue('keyWords') == 'undefined') setValue('keyWords', '');
  if(getValue('keyWords').indexOf('<>') == -1 && getValue('keyWords') != '') 
    setValue('keyWords', getValue('keyWords').replace(/,(?!\s)/g, '<>'));
  if(!getValue('hideObsolete')) setValue('hideObsolete', false);
  if(!getValue('perPageCount')) setValue('perPageCount', '10');
  var keywords = getValue('keyWords');
  var hideObsolete = getValue('hideObsolete');

  //var vals = document.cookie.split(/;\s*/);
  //for(var i = 0; i < vals.length; i++) {
    //if(vals[i].split("=")[0] == "user_id") var userID = vals[i].split("=")[1];
  //}

  var userID = getValue('userid'); // 1573

  if(userID) setValue('myID', userID);
  var myID = getValue('myID'), url = window.location.href.toLowerCase();
  var url = window.location.href.toLowerCase();
  var onUserPage = url.match(/^https?:\/\/userstyles\.org\/users\/\d+/);
  if(onUserPage) var user = document.title.match(/^(.*)?\s-/)[1];
  var loggedIn = onUserPage && $('//a[@href="/logout"]', document, 1);
  var onAllPage = url.match('http://userstyles.org');
  var onMyPage = url.match('http://userstyles.org/users/' + myID);
  var onStylePage = url.match(/^https?:\/\/userstyles\.org\/styles\/\d+/);
  var onBrowsePage = url.match(/^https?:\/\/userstyles\.org\/styles\/browse/);
  var onEditPage = url.match(/^https?:\/\/userstyles\.org\/styles\/\d+\/\edit/);
  //var onEdit2Page = url.match('http://userstyles\.org/users/' + myID + '/edit');
  var onEdit2Page = url.match(/^https?:\/\/userstyles\.org\/users\/\d+\/\edit/);
  var onEdit3Page = url.match(/^https?:\/\/userstyles\.org\/styles\/edit\/\d+/);
  var onEditPW = url.match(/^https?:\/\/userstyles\.org\/users\/edit_password/);
  var onCreatePage = url.match(/^https?:\/\/userstyles\.org\/styles\/create/);
  var onHelpPage = url.match(/^https?:\/\/userstyles\.org\/help/);
  var onLoginPage = url.match(/^https?:\/\/userstyles\.org\/login/);
  var onDeletePage = url.match(/^https?:\/\/userstyles\.org\/styles\/delete\/\d+/);
  var onUDPage = url.match(/^https?:\/\/userstyles\.org\/styles\/update/);
  var onNewPage = url.match(/^https?:\/\/userstyles\.org\/styles\/new/);
  var onSitePage = url.match(/^https?:\/\/userstyles\.org\/categories\/site/);
  var onCatPage = url.match(/^https?:\/\/userstyles\.org\/categories/);
  var onAppPage = url.match(/^https?:\/\/userstyles\.org\/categories\/app/);
  var onMigratePage = url.match('http://userstyles.org/users/migrate_openid_info/' + myID);
  var styleList = loggedIn ? $('.author-styles')[0] : $('#main-article');
  var styleArray = [], styles = loggedIn ? $('//tbody/tr') : $('.style-brief');
  var styleCount = styles.length, DATA = {}, totalInstalls = 0, totalWeekly = 0, totalObsoleteInstalls = 0;
  var totalObsoleteWeekly = 0, obsoleteCount = $('.obsolete', styleList).length;

  addStyle('\
*:focus{outline:none!important}\
#style-table img[src^="http://forum.userstyles.org"]{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAr5JREFUeNqkk09IFFEcx3/v7czOun9cTV1MQjJLqYj0olGHDiZUpCXUpYg6RBZ5KlCioDp1iYjw1EWJEKGE1lrSpIOXdEs7mK2hm7rmuu7quLOzszvOvze9KQ0q7OIPvm+YH7/P7/1+v/ceqn0lwmYMwyYNiZr5h6O+L51HP+epqqlK19xzVGNUnQNHPcI/CXJZBLW9KRf9v+G1o5aGUntOpdfG+nKwzQpKyMQIi4b2MqLKKdVsp65HwUavaLHM+v6mrt05V+m62lTGueZkQHEFYDFjQlwi8DWuMyFe406Us24gpM0/K7tr/cJNyhrYpGtNT6KlYbuzucpnd3dM66gjpMDtPgEmBQOeBSU47EPwpsEDVm+Cipyny51X6IbXLRYTuiJAF6t9rKsnosHrkTQwGQ18HMCnyCqcqbCDr4CFex9leDujQFQ2YU8h60IAFywWi1YPxCz+kCR4jAInd3FwtsoJikIgFlOgJN8GHSMZeD4hwzLGYHdgeM8TRJk8i8UzlNczqeGwoKqprE5LJDDMG3QmBMo8GEK8DqGIDNt8DBTm2kAxCMyKmqbL6RGLxXM0ixyd6v6+LKedeQwZmMjAAk1UV8nBEm2Fl3RQVjVw0PMwaMkyMcn8UlZUYtPdFosXqTN063ggOfX5SVbKriyYmj4UkgC2sLB7hwMkWgnnQKASYmZUNbsYl/hk+EvneFt9r8Uy/K9TXB1vrbtf3HhtEO88dHmaq2rq01R08EAhKiowYXYhba5ExRROjAWSo/1PY/72IcrIP9nWrPH7UlHR2UMJdhYdqbjbL+x/PCofe8cbpwKT8r4Hg8uMJ794LQatszZtbzNEex6uJ7GySaaWnReC/i53RTVWdM6b+DbzIhMevbQSDMxbM18Ptlio6Ypu9E6sa+yl2kpVQMX+HWCxzH8emlVNak0b2g8BBgCd12EWkPb0JQAAAABJRU5ErkJggg==)}\
#style-table img[class="metafaviconblank"]{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACSUlEQVR42p1TS2gTURQ9k9SO0ZDQkNb6aRC7slCQNrZQ6aIF3bnShUIRrAW7kSyrIpRCF4JRKLgJRQIiuBLBhavSRWlXqYIfImIUaRsJtMF8NNPMmI7nTt6UJO4cOLx5n3vuuefdp6Hluw10cLhGTBD9avkD8Yx4eh/42XheawmOcbhJhp5uTfN7bRs2F6qahh3bNgrAd04TJFn4h4DBT7zAxQGg0+D8FxEkuIaSGg/WpRT3gBckubFPIJl5YHaY8jc4P0IMrawgMjrqkJc2N7E2MoKvW1vo5Pw9UKny/EMgrqma184Ap7f5I5InMhl09PZiO52GWS7j+DCpWU7S44GhlHwBPnE4JwQxnWynSCTuSIYrpomN1VW8HB/HLudXl5dxcmwMr8NhfM7nndIygMFkd4QgxaCosFqER9VbIyTbCeJSsQg9EMBzmplTCiRZGVgXgt0uQJfAPWWorQi6icvM6AuFsDQ5ibfJJHSVpEIU5IKEgCboBxSBey0mcWFxEQNTU1iansZ6IoF2te9R6oqKIOUHBg9zz2roCTl8i15YhoGFYNBZ86q9tnqwkDglxGjUPZoYrjQQyOH+SARWNouPtZqT1f0OEd9YBcu5u3+NPl6jT9Uun5Q0ND+PaqGAN/G444sr36obWL9Gt5FoyAxVHBUf/hDHiOu27ZA9pvslJb2tnr1EFXMPgEdNrZwHzjOwx68MHYxGYeZyeMcOFEW/iR/ADiW/amrl1sfEbF0BINS4z7dRInHWfUxn+/raU+m02UTwP8/5L+luwlcKrAW1AAAAAElFTkSuQmCC)}\
#style-table .undelete{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACB0lEQVR42u2VMUgbURjH/wetpEJBw23Rwc3dXTMlwUKGgEuGclDFEm6WghlKSRbnEIqDZKlDAxmCQjKoRxEUQaG0hgTbamMDgYQEFFHsEP/Pu7MxerkQksl+8Od79+6+7/e97z3uSeizSU8QoDHGjQbWsY1XmObMNXXV+xVohOTxFW8xw6c/1GVXAE3TGm63u3WOizDm9nCKBXg4+v0YRLJKao5FcpFQ2HJpGQW5gKJURGWg8i9gF1W8wyRHJ60QySp5a9XBT0Gsulb1bj8z1Gyb2MAHzHF0bAtortqsXCSXyzJcJRcmDiew8npFf/kNUPYVJBKJ93z6Qm3ZtWiUyYv3ViBYRxTre07noM455/jhwNXs7QFKUzvUuo5sD3hJwJm5CvrG7dHMA+p3FR9jMXxOpRAoBbBYXkQ0GhUxS9QadUBd2AGGmLguEtNLwrP/kmiRs+BEbb6GTCYDn8+HeDyOUCgkYlQqQ/3s5BQNMvFFEwDJZBIzOR73KW52KQjPXw8URUE6nYbf74fePG4z8KsTgLnRd4BsNguv14tIJIJwOIwY26SqqtlCETJrbG53ADNRSvQ+ELjzPQdY+f+A/gFgY7IsS9VqVQzfGIDj1m+sftcjhJzaAYSxkDBdDvqvotwpYJAao8apIbS/N+oGQFT/4GZrF/iCGja8lYk2XhqQR6/Nvl/6N86INyhRcmdFAAAAAElFTkSuQmCC)}\
#style-table .delete{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACEklEQVR42u2VTWgTQRiG36khRSVQQxSyiFBSRALFgoce3RpILgpetTQ0xJ+DJ8VLwAo2hx568y4JCelNUCxCFqILIh7EU7E9NFbwJwSJqRBqe7Hr+8VpSdv8Vc1JBx6+YXbme76ZyWYVetzUvyFwDMOZL5Xq/fOGAVUqnWC3Stb+WLCVvAz82OR8A+hbBr7eAs7y8QpZ/23BVvLD7J/TY49JH7kA3GawyZt9CZ5wzGPbm9I/Y5qwGIsjIyiPjSEQCMDlcuH69DTuxuMIBoPw+/0wTbPlke0R2LbtSOQivGb8TC62qZDzoeefllrI97aCR8PDzoGFhabJyv398M7Nwe12QylVj+FwuC6h4BKnvNA1tb2D4IOhobfHisUdgzVymbjJIfKNeDwe1GryBPfIEnlJPnUSHM3lcl+Wxscxqgc+kBskkUhgdmYGTy2rsXKZclMnX9x9D80EA5ZlrUqC+14vBqtVPJycRDqdRiqVQiwW207cILhGnpF3HS9ZToAL12RhNpvF/MQETk5NIZlMIp/PIxKJbCcuFAoIhUKy5qoWrHQjqP+SmMDhTpTsJJPJIBqN7qm8YQdXyPN9CxiVJLB2nflfF7RK/F/QewE6NJ/PpyqVinTjWvC+KwHbcUo+dhJIYyF38OsNfkXK3Qrk72aQnCIDaP/dWNUCqX6jW4G0g+SIjq2aHOO6lmw0m9Dzj/5Pwu4nKMtPHr4AAAAASUVORK5CYII=)}\
#style-table .edit{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACWklEQVR42u2UXUhTYRzGH0cSEeFFH6DTC42zVXRjV9J1QXbTddCFWdGFRhdeBF4Eya6CLoLqIoiFq0Qw6APM2lLP3E5ZLXOnlUvXzjk6mU7B0czZ7Kz/e/YmNdppfl0EHXg4h70vz+85z/89K8EGXyX/ARsOaDiCWna/3YOhdQcw8wM29G1Oo8z1Asd8Mvz0c5K0tGZAYz3qyneg3dEsCGp0FE97gbM3UU9Lr0mzawJQ8n1CJdytZ+wVcigMSo7JGcDhQhstd5I+rBrAku+24n7r6eqKSCSKZ29y5iMa0CXiOm1xkgKrArDOrTvR6Wi2C5GxMDxkM5GguCowEMR4Yg4dtO0uKbhiAJnb91djsKVBKJNDo8u1hBTovW+hJeeNAXtIblJsRYDGozhYvh0uGmgNG2j3YM6cJX8egELmXtrm41JIC0UDWHKqpdtxvrZGDg5Bep+rhXUuDhu1DNC2fhKDaL+a/xXAOqda+n7W4h2m5HQAR1RkH78sjWYyGT9P7eXJ0/keBQH557znFcWbXk6uziYhcnP2Bmp+clNA9kvAMj0Vb9m1Rbkck5rwSOKdK8iKQWhkLvFaRJ58sVDQPwLCss9q27N3AouTQKILt25cMt7goVT6mWphqf08+W8DLRqQSqWubUW0CXP0/cfbceFKAM4nxkD7ubFpLaaAtpOouuiEJj84jBnFvXDuKubHYniX/oYILdMBNeoxrcUUcOIQ7t3x4Dh7tlgsPl3XP9JjiOsTKVFM8oIAW9WmU7q+ZKXU25A7duzfkUHipK+k78WaF5zBel7/PuAHJTcKKN+dhTgAAAAASUVORK5CYII=)}\
#style-table .stats{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEB0lEQVR42u2Va0xbZRjH/6UX2pUWysqlo3VgJ5Opmc44nHPpRjLxw5yZEbJkEWlUQM0007CFSQYyGqUi02lMtuCELTBRN+OimOF0bLhoIESUuTAgkDXlYu29Hb2eHp9TzwxxlM0sxi+e5PflPc/7/J/L+z6vAP/yJ/hf4JYF0pZVZQolWU8LBOIdZF4QX2SZ0RjjOxHw/tgR8PRZaSVCRP+xgDq34VWJUtksvkuPtUUrsFKrQJRhcXHChcEzI4hdvoKQ32J2T73XQuYuInzTAuq8xnb5nfqy4qoNqN6UjRy5EAc/HoHf7kFFRSEcIRZHzlzB8cavwNgnelzWlkraNksEbyjARS5fld+827wFT94hh0jwp6FlyotQmEGmToUQQ55iwOlxH5rKjoBxDLV6ZttMZDY9P5PrBNJydmYsWaq3bTWVorpIA3ESIOQFYiwVmgiT492VRkjkCjy7/yA6esbRXfcZXNb3S6LhqfNk6iCYBQXUua9Xq4sKzYeaNiNTmhSPXshbxbhdJLCHnH9z6iT2tXZBt+4RXHJFcPiZDxGwnP/UZ+vaT2Zj10p1vUBe49C6mpLVtSX5kFD0nEDSvAxqnzeih5zv+uA45Ks3YtLPYI7SGukewmTn19NOy5vlZPoTYU8gYApte6dcInP4YFirgTZHGc+gpWYXJAE32traUPxCDbRrNkD7gAF2VwjD58YgS5dhsOUUY5+sfYrc9BHWhAJPHCiX+C9Pw7BRD+1yVTyL+vJtqCh9HEaj8S/bNwZs8ASEGPjyZyjyMvC9+QtOoIp+fUdMJOhBw/DmvSV3P7QpH0sodKkQBIuo341LP/RiecE9UGRkI0jNCLIiBFghPJEYLnwygP727hmnpWnfogLpuur6ZYWFdVWmLUhLToKCjlGKmBMSQETNYKkPEWoGV3cfOfbSkXITB7Yfgmvq3Gm//fP2RUskSzOsSNU8NvbcW6W4714N0qjTCkJGmZBOXIDuWFzAE2bhDsXQ3zeOo3tPwDndbIpF3b18kx2JLppUlfNSvVK7as/bHWXQpkuhJM90keF0hxCNRJGuloMOD0XOwmq7ipcffRfBuUEu+pO0/wIxToQSCQi5Sqm0rxxTZN1eXGfeCsODOihFQGvnMAIOLypfXA8vjbazZ8fRsLMLwbBlyDNzuJOPfIhw8tcm4SwSE5rUbONrySkrK3S3LUXZjjUo0KvAMDH8OmpH+0f9mJn1Xov8W7K/yDODeZN1sWmaTGSJkrX3y1If3i6W5q5PEqZkx28047OF50Z/mXP3DsSiLgt/YkaJ3/C3iXqj94DLJJXIJDjnGYSc/3eV+J2P2EZ4sMCbcDMvGg0MiHjHUkLCr3ORBnghzjG70Ob//sm81e8Pp9ifKPmDYxIAAAAASUVORK5CYII=)}\
#style-table #metaOpen{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABHElEQVR42mNkoDFgHLWAcgvmMvxn4ICy/0Ppv1CaE4jD8JtB2ILlQGNFoOx/UPojEj9i0FuwAmiBKBIfZOgHpCCjOIhAFogj8UGGvoey2YDYl1ILVuGxABTZIYPOgkXwxAgxjAeIxZBUg+LgBxSDIvsnw2NgUMnC9cShmondAisGRET+YUCk//9IGMb/AST/A815zfAG6CMRwhaAwEKGDgZbhnKGd1BD/iEZyIDE/w0WYWR4BmZjuB5/HMAseUvAgmcMn4A0PzbD8VuAbAksuP5CLfkN5T8DBuB3BhZchhO2ANmSz1D+V2iwPAGyfjBw4zOcOAvQLfkKxE8YIKkojrB+4otrmCVniDecNAtAAJZHiDScdAvIAKMWEAQALs1sGThFFJMAAAAASUVORK5CYII=)}\
#style-table #metaClose{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABQElEQVR42u2SwU4CMRCG/26AaJB4QTl5EXkJEh/BmzGefA1fwZfwABeNz+ILGOEk8QIoaDYidrfOsG26Qdg22dV4YJJN92+m/zedjsAvh9gACgV0m1C8XvT9z3kndpq4Oq7h8j4EZrE/xCvJmL9HQEjmg7k/xJmQNucgALdJECQkSNUFET7mE20ekTW7f6lEP88hP2KUsiDCZT6WQKz3lDY2mkCKIG+07q6DiCzzF5lUnAVgD4IsbrUK8mODR7FdAyYy0VK3ZQEwn7J6RhDSYigxohbWlyErAUgZ7gTAftkmc/U8QWSMKRXxqfBUETgwZ5yA5bhrQTXKVjP0VdpHP33MMUV/Arg9Wg+oUPtOHgoA7KUA/AZmABh2lvcGNwSoa0Csn38aWX3e+++A60OorcC2hCPSP9tBAS3KGxuAM74BGhetGSRRhR0AAAAASUVORK5CYII=)}\
#style-table #metaReset{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADs0lEQVR42mNkoDFgHLWAEgvYgFgQiAWAmBOIWYCYGYj/AvEnKP4IxD+B+B+pFjDu7Yz9LaOmcV7OPNGEWYSTgYmJnYGRkZnhZIPXVy4xpfesnIKHZ19Zv3zChNtngerfAPEvUizgamzULha9z1oX3biQheUvLwMLDw8DkyAnw+x4KwYTY2UGcW0fBj4V3T/v7p6Zp+ye3Q3U8wibJdgsAAWF0s0N7T18Uuq+LEx8DCwCQAs4gfR/XoboQJMXqhI8X/Tl+f5ZeaSKCenbCry9dXyeonNqA1DfU/TgwmaB4Joii0wD69BWFg4esOGvLm5nEJS1/C+oa8loY2ufHmYpYyYryBb89dNfARN1qUsa8e3a2ydkJkVOPLkOqP8LIQuUz81ImsolJO3OxMbJ8OvVS4bDpw4x/Pv9j8E/tfSUjE1MICiiY2PlPTMVVCb//PGdR0BZ/byovucTGcuwLKDcE7wW6Ojw2SzPiZvLxMKmxsjNxvDl1YM/b9We5rCwMN1iPC27z6VqCTtQ2R8glj7eE9jEwyub8OffRwZRXddrQMtDgeLX8FqQnKwYUmwT0vn/71+l////M3zRfbnLwmJZAFDqO5pSgQVZJtHOEblT/nz4DOKfMk0qynrz5tdZvBYkJipElHsnFDExMZn++fiZYfm9LVnNzdcXQC1ghOL/QCy8vt0i3yF8as3fj18Yfv95d1HXMzyZoAViYhxmW/Jdl0nahij8evOW+enlTRPs6g/0AqWeATHnnraYLxOP7w2TlOR0StMxM9YJ7Tf98+0bw/cPDw+KGjtlANXcIBTJ8jOjDBY5hgRx8srqmv58+eL9jNkTyjs23twLlOP59vjxxbl1Pj9/P/l3P3vpXlVGATbm////Mrw4uXWmvF1cI1DNc0IW8Hh5SUQ3OFvM4OCUvChpFiz18+crzldX9m06cPTU3bjCybXs3JIMbEJCDIx8LAz/3n5n+PPly7fWeb5B7e03DqHHFTYLmIBYIsFevjPLzzDmwLGbDEYKAg9ZmRm/7L/7ViQuLkecU1qOgUNIhmFFcwpDeOXUv49PrOnSj+ubCNT3Cho/eC0AAVZQMvT0lKhrdLFIBAnsPHGD4cuPPwyRPnYMXKIKDKwsQgx/f/9k2Lp50e38BRc9GSBFxW90g/CVpqAiQ1BamlNH/y9/vJg6mwoPA7NsgImEHBcXHwPjTzYGRk4mhrvvnj+QlNYUdapYyIPNEGLqA5BveKAYVGwzIyVVkIs/QjFJpSnVwKgFBAEAKpNDKC1I70QAAAAASUVORK5CYII=)}\
#style-table .metascreenmain{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABE0lEQVR42mMMDQ/+z0ABYAQZsHrlWkZyNIP0wg1IzAwgySXzp29gxDCgwESDoMYXhy4zrOBixW6An6oqg4DMO4b/H+XAij9/+cSwaut+hrToIDD/P9CjP/cfx21AhDEDg4b1RYbHF2wZfn1RZODhZGUwi6lh2DOpCGwAN78ww6d9xwbAgGgXI4ZEPwfCBsTrajKwi7xi+PJWkuH//38MblltKAG4sSufgePqHfwGMLKyMfxjhCSLPx9fMyzYfpxh6Z5zDPunljNw8PDhd0GugSoDMwszKLwZvv1nYeBj/8/w6cNnBsvcyQwHe9MYZOVkGW5vOYHbgCpDOYZvzFzkp4OIb7+JSoU4DaAoKVOUmcjRDAMA4FTt8WGSsBEAAAAASUVORK5CYII=)}\
#style-table .metascreenmore,#more-screenshots .metascreenmore{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCklEQVR42r3Tz4pFUBwH8N8RRUnZKMVKiWJrYaXcV7CyuN1X8gKWFp5BvIWllBJR/izdmKhR0x1j5qr57b+ffuec70GO4yxwYdAKhGGI3gmv2R2wLOtPmyRJgl4ATdNOg23bQlmW3wOmaQJFUUAQBGRZBsMwQF3XIMvyDnRddwwYhgEsy8I0TVAUBZAkCZ7nofv9vh2PYRhomuYfgXEcIQgCZNv2IgjCOXC73QDDMJjnGeI4hiiKvjzvCnEcdwxIkgQ4ju+BdYOqqjbo8XgsNE3/vIGiKDvwfD63O+j7HnzfR67rLqIoQp7nx4Cu67Asr31K0xRUVT3vAc/zv2rhIXCpypc+0zvhz/kApN4MAC9lC0AAAAAASUVORK5CYII=)}\
#style-table .metadiscussions{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQUlEQVR42o2STYiSURSG7ydS0oh/G3+QSBHURcRAGrYIMRAkKBE3DYSBoWLKuJAgmRZJ0ES6mlbhD4QFuVBJRXe1Elq0CkVdpBZDVjKImjlR1ntFQ2IyDzzovd+977nnnJchS6FWq48JBIIzIpHogkQiOc9ms0/R/fF43O52u5Ver/eq3++/7XQ63xd3mMUfbG64XK4rGo3GrVQqN1Uq1XEej8eaTqfk4OBg2mw2D+v1+pt2u/04kUi8UCgUX/8I6HQ6Dg5fM5vNt/V6vQLZyVGBy6RSqbQLhcIuXvKk1Wp9mwlYLJZLJpNpz2g0KrhcLlkVKIPkcrn35XJ5u1qt5hipVCqxWq33bDabUy6Xk3WiVquRWCz2tFQqeRk+n38xGAw+tNvtm+tc5nA4ZDKZkEgkUovH41cZoVC4BYG7eIFqrfRzkXA4/CGZTN6gPbC43e4HgUDgNO04i8Ui9HdV0D75fL5mPp+/TgVOGgyG+6FQaAujmx1YJUAT0MC08sPh8CYzH6XN4XA88ng8Ehjpv9m9Xm8P2XewTC6MtAH8TqfzFp4mpDUeFbR5qP1zNptNYrkH9pml7zJMJIsZ62Uy2axRo9GIwM4ENv4F8/xIp9Pv4NgUzj4DHfBzWUAqFouzmUzmHHXiYDAgqVSKRKPRl/j2CbwGFdAE/cWlhcAJ4Pb7/TuoT0SNAr+PisXic+zvgi/gkFbxd1lUgA0ugztarVaMCYwbjQZ9XhkUQIMO5l9NZebZzwItGM9r2wcf5+uV8Rt9P+PvQ17ScgAAAABJRU5ErkJggg==)}\
#style-table .loading{background:center no-repeat url(data:image/png;base64,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)!important}\
#style-table .metafaviconapp{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADRklEQVQ4jV2TT0ybZQCHn/f9+rWlpXylA0opY1hAAgm4McjWEidGF7LT/JO4wxJN1Dk96BUTDzTxoMa7B72o0WTs5IyJJou6bCadYFh0YoKMrRRKKf9KC2352u/7Xi/TLD7nX57T8xMAyTi+ZIoKwMDA+RBSvuP2eJ6p2+q4cGw16p0vHtMetDton7mENZ1MscVDxEPB+8DszN5509XQOBN/9qlAJNKi1YprtD4+xuFBid1vppxA4XeplKohOJdM8ROABLyapr2thPZ5uCv67aXXJoMDO1c0cfVFgpu3CLVHiPT240x+KM3QAD7hdrvdvh+ScUYBZDLOeFNbZ9ORI0ZoovSJZ/erl1Hpm4Bi5MIU4VaDTHaLXKHGg/bnaGhpY3RkRBdCzABoE0d5TDnOK29dPMvw8WHGTw/RGo6SXt+mtrcOtsXdTTd1y8JZncW/cYvEyBOkc9vBRFt1TtpKxJpbWtFcGoHNmzRwyLHePs5ceJOduo7PLVAojCYfLf1jgKJ0UGa4LyyE4HWphOuiQQEcE+x9lLmPcmz++PEagWqOBYZIZ/L8tZhheTmDQoBZIdbXCMgTUsOK+4ItoNWRbTH2qvDn8iYb6b8JDJ1jZWkRaRZwlGIgfxWhFE0NAr/fQCkn6rKUtlwy5SDWHjLYTkjvYa+oc3TwJNnvPiJc2iXkjzLb8x6Bwwy6dNHc2kExn0cIUZGW0qY28tsotwdr6Teol+na/Zn42BAvvfoG4yd70ctZemp3EMpmONZJk99kI19AoOZcDdK8Xdm3KS66CEgLe3cBLdTF9a+/pFhVOECtM4F/5w6RcBtPnz6B8FVZuJdWjuK2dmONSqJDnzAdp7vP1Y3w3EcYBh1dQ9xbyWFWKrgOspzq9TKZ6MbtbSSTXmf27ooFXPo35bAScvWFU2N67OAQmrPIYBhh9FMqVPD6vbjFPqruoWoX+fT7X51azXo3meJjDeDGGuUno+L+Ui73vIiERNTXjVot46xl8RxWkZUK6D6y5R2+uD7nOJadmk5xGVCCR0jGGUPIa4YRCA/G2mXECODVdXKFTZbSebW2daCA6WSKDwD7vzf+T+IDLgtICCHOKKUMKZi3Fb8AV5Ip5h/d/wN3iGBJByQZzAAAAABJRU5ErkJggg==)}\
#style-table .metafaviconglobal{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMUlEQVQ4jW2TzU8cZQDGf+/M7M5+8LF8FFBsWVCsUktoSzRA0dSCNmBCvDQkmng28ehl/wJik5486sF466mNNntQ8VCVWloPjTGUUrJLIbDsLrAf3ZnZmfd9x4s1TdPn9Bx+z+/2CJ5Lem4pBSwYhjFhGMZ5QGmt/9Ba/wlcz2cz9Wd58dx4Ph7j+6kzkcTwiR27u2NfWPYE/2y8Fea2i+79B9uOH8jFfDaz/HRjPi1DH3319eTYwZWFmURL7zHbMkwphOlRcceIJgbE+Km/I1NnyolCyb5M34etRw9//uV/QXpu6dL4SP3K7FTZ9kOBaTkU6+/j6RmEaCVirhGJ7HCs7Ranhzet3M7guO6ZXalsLOdFem4pZUd59OVnN7qSCQ9hdvKo8ClucJZEPEosajH00je0x+/ieQGe51N70sHStzNF39evGsDChbe9pGnUaQYJVta+oFgdQWlNECgsc5OG283d9c95XJwgkDGi1j7TZ702YN4SQkymX87FtssXKFRP4QQdxG1F05CEYUifleNEz0+0xdo4rLXRDBIoCYP9OzYMvWOAOB+PueT3T1I4SuMHimYg8ZoBjtdksO9HpFTYkRKdLevUnA5C3UQzKgzDmLYQ6L3DRVLJ30jGy9hRk92jSZTS2BGJ7yuwJFJqlNJ0JDbJFUaouSOE3NNmanhmtLuz91yxNiTePH6dk6+sYkdq7B4M4kuL3dIAj/dfJxEtEjErKBWwd3CavVKv3topXTMIw9vlo5qTarFoTxSQUpHuucOlc1dxXJftUg8PdwbJFwaQUhEEIZXGLPuligusGsCNB5t7bls8wv3cHEpppJQUDjppuBLHbeK4Pkd1myBQuE0bk5CNrWIduGnks5malOqT23+tN1oSH+A02/H9kNW1cRqeT8P1aXg+lZqFlIqDJx+zcm/D1Uov5rMZxwSobCxvRo+/21UqV0fH3ngUrTqvkS++h1IK0xB0tsboTvURs1x++LW/Ua54V/PZzHcvOtPFzpRzrb93wE61dyW7UkkRhnBYbejSQdXZ2CrWlVSX89nM7y9843+SFmAeISaEENOADrW+BdwBbuazGedZ/l/lhZP/TH2c8gAAAABJRU5ErkJggg==)}\
.ratingbg{margin:0 auto;position:relative;width:48px;height:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAACUElEQVR42sWWO6saQRTHz6xG8bFGY8BHl+5CCKQJgTQpAhfzCUSwET+AiKKNjZWVhSAKYmEhon6Bm1sFEkjIB0hzC7ERQSG+d9fXbs5Z2OASlRsD7sDiLDO/M/M/r5XBmdHtdoOKojjD4fADXDCuwbNzBjqdTkiWZYhEIp8uucA1+JMC2u32jdVqfUHz1Wr1KxqN/viXw6/FnxTQarVCHo+H4YDRaAT7/f4+FovJj73AtXh2An5rs9meORwOoBDOZjNYLpdSPB7//MjDr8azRqPxCjfzOLfiZgsWDYfvQLAoiiBJkjqfTqcUSjKIW5T1brcTyYDL5Vr9Jy/ifselPMNCeWe3259ivoHJZAIKGakWBAHm8zmFDsxms2oEIdhut7Ber7VH8vl8ayN5puWb0+lk6A1VKS3SZoLp0eaoHDAvKZywWCwUPOhLKpUSjORVAc1mk8PFW57nGRqC8XisA7Vfr9dLIHmG4K/pdHplNP+niLEWnqCRD4FAgFHeUeEceoCG2+2G4XCo4Pv3TCYzOywmo3hdF6rX628wjM/JC9S6CNTUax0BvSNls9mj3cQIXiegVqu9xzDZOY5T88xisahFRcVEhqjQBoOBnMvl7o9dwAheJ6Bard76/X4TVT0BZISqntoaqd9sNtDv95V8Pn/0024ErxNQqVRCwWCQTSYTNQcREjB8ezTCkxEKba/Xg0KhcHfsAkbwOgHlcvkj5RuCs2Qy+e1wDcP2Gr3iR2OsWCwevYARvE5AqVR6mUgkfsKZges3eMgDHvbX/xIj+N9aU+PUlJfsgQAAAABJRU5ErkJggg==)no-repeat}\
.ratingfg{position:absolute;height:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAACDElEQVR42sWWvW6cQBDHdw6WD2EEiLV0ubR2lRSRIsXFdXaTFGnyDHmnVHmGvEFewUWU4hrbTeQUZ+SzORaWZTfMKViHcjjORWJHQqx25zfsf5hZgPl8ToYsWq8/Ecd5vaL0DdnDxuDhMQEsTTUBIMvlEvbZwBj8oIBIynN3NnuFY5Flq1sp43/K3kj8oADGmKaUbsZ1XZN8sXhWpunPJ2dvJH6ngITSW5okkW3bRGtNpJRE5Hmz4tx+ysPH5OHtycmCBsFzoNQDx7HAstqyA4IwghjAaudw3DQN0UoRJYQSnK8xAJXy+r94pTLq+2xfHt6fnuZOkgSTyaSnDAHVOmMADIjrOEbr5qs8Vy4AN8lvSgi7fdKqdF2XVFX14Ij37QsNM4OZwLq8u7g4g8PDr0Z5FBBk2dQ7Orq22kV0wMW/wpeXH4CxLzhvkn9oYv/m5qV/fPwNs4BOm3rbykQXoCxLcnd19RHS9PP2KzfF906hECDzGEvQUQjRU9/VYNnWXSGEtev0MMH3BESeVzthaGPTYKPgHa3LBgbhRUEKznd+GU3wfQFhqF3f3zhigO7CY6zrfs45KYpi9wYM8D0BcRRp53cNYqNIzqWSsqYHB353NmMNDm3ABN8XEMcaVdb39wXXOtgODlX1w4vjGQYa3IABvifAKcvvwvNekEesyfPztpHeBdPpH/8lJvhfYn4+c+Rnaa4AAAAASUVORK5CYII=)no-repeat}\
#style-table tr:hover .ratingfg{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAACk0lEQVR42sWWTU8TURSG32ln2qGUUiFt+QwaqUWJDQlhwcJo4g8wbDQad66MCzfGFf4Ad7hy419w4cbEaOLHyq+QSFCIgGAtjRFqKUPpdO7cezwVYtpYCGLSucnkTufO8855z9xzphr2GTR/8iokpbXh+ds4xGgGr+0noD6lHBbQfac/+w4TQDP4PQ2o2dSUZrTfBAGylH+pjy6d+6eHN4nf04CcSSpfeFAD6RA/Z0GubAuOZ7YOGkCz+IYG5IfkC5/ZcRaBXk6FAFkZOFY+Y57JDhzo4U3kNef1wAOjrSVNGiV4vyVIUZBhINgNiB+AXQT8fZBVkVKBM0ECSq0px12pCgTjkbn/5FeYTx6W1+jj0FuEYmMIRLjsW/gK14vLK04OKH9lEcE/WgG9f+dcbMO1y3ArPDvWavh4Iuclr+3uN8fXGjcQ4jdUWuSbCizi8CF2ZlE9WFXyzeYpzkQetpVXnI0T0YvWkpf8bwPu9GCYlCrobXEdZh+wNV0Dip25KhYagbO5DntznUjKdPRSadZr/k8Rcy0kiGg1EE/7IfKciWV2LHYFKnyus/sUit8XiBw5fuTy9pvaYvKKr+tC9qveZ4H22HnN7AGsd6xa497o432nw1rL5jqulHsbdQ8v+DoD5efdX8zO/mPQDKCS5SvcDcjPr/Qbi9hcW13YyCyVY9fcUKMAvODrDJSeJqxQVzIMH687/BW31qDcCowgdwipIO0K1hfmVNcN+BsF4AVfb+BJTIR6hnWRz8IuMCxpmVy3qGx3xGiJwAxHkZtbxNFbjT+AXvB1QluPO0m5CiTV+/aJ4ljt2uo9POSkTFRsaEN3GgfgBV8ntPkoej9yYeM69hkzk5jixjA5ehd//S/xgv8FVOBkHauti1YAAAAASUVORK5CYII=)no-repeat}\
#style-table .metalink-open{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAB4ElEQVR42p2US0hUURzGf2cKe5mbaGaRU+2UwIW7cCPRpoUbkTbuJBxbBOJGMcSwFiGpWCEyU9oqBmuGFkZFD8kiXChogiguzJ5oaSgkPmH87twrTjN3hmH+8HE/zr3nO9//ca4hOZrwcZIKDnIRwxlieNjiJ6t8YpSXvOa7vtoUdhK3mf9EuqnhCP1kiklu0sMDsT+OYJLQfdrIo5VsYooo92gWs9xt7AulcRILxOzTQiZV7D19hGkX+2Y5M7Tgxc+i28HBQCD+rAuF3J21cZVfPBdbMHRyhXweZpVScgzySjK3xCaM0nqstKpzEprkiwp/XWzIcFdtPUyZW1oBgulrZMU8S9xWF+XNEhqR0Hm37zIW2xb6K6EOsajhDhEKqMpJaEKD2qvk4kItNKhrXTkJPWGcdzyyU7tEEZXM5CTUyDNdnQG72HCUa1oq4Ua6YoeoS52lMNMayhdiEeGzJXRA8FGvQTjHZbKJtyrzU4bE3gjDwuKe5zzBr2lqopzajCK2kxGxj8IH7Pu2nZj8IaGQU1ygVFU7SzHH1U/0G1lhnVldozE5WWVOa2PCqPBD2IrXMek8y9kJ4bQDr5DvvPsn/Ba+Yl/UZcvJ3ka3dngcwWPxRtgc5+Q1BxaPJW7aBZMei+LvQ808AAAAAElFTkSuQmCC)no-repeat;float:right;height:18px;margin:4px -2px 0 0;width:18px}\
#style-table .metalink-close{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACJElEQVR42o2UTUiUURSGnztawzjqwsBB6AdqURCkRIsIWoSbWQQVFUS7CKGtBf0tiiwCQcKKoOhv1SLSgowKgokKMaho3FSrtB9prGyjcatR7L3f9ykz39XBA2c4d+be557znnvGELOnkFkJW5PQmoAVU5CwMPIN+u/Ao274om1/5ZOl50zpogD76uEGFewhdOyCqwp/RMBy0E84VQMnWIA9gd5tcIwwuz+zoLkySTU0wNhYuGhqwhYKZbArcL0dOhV+dpmZl9C4DkbjtwagXC5cZLMeyNkGOPAOHrhcjHLbvwSueaC6OskpPackdzKJHR/3QGfg8Vk4rTBvdM8tlbXXA6VSYeBAVVVYa+cSfkjCH1eYM9/V1lrY5IHyeWhuDheJBHZ62gO9UY82q4sK+4zEGVARGz2QsghKqwz6JVCXwl4zBD0Z2BnfVC1fNHN4HtB9PdQ9cCkADUC7CjjnZZROw8RERdAReHsRbgalHYLVkv2DB6pWTsViEE8aQxHfVsE9jc7tQGx91NyFw1k4Oa/Yg4PYlpYyyEF4fzloHD1uhwNJVTJ90N0Ku1mAXYDho8qCYFp4Jh+dmbXF8mXnVXYbtFWCRJlIWl7InxPOW7F0+vXPwdK1sGU77FgPaxqh3kk9ArZft6qGYWnyUd+9lr+Sf5X/c4dN7EKXmSaG5ZGLRW30m2uh3i+fCAfVTfRsD+KgoNkRMO0aEcVEN/+O3MVl7+E/HP2k4vDLCT0AAAAASUVORK5CYII=)no-repeat;float:right;height:18px;margin:4px -2px 0 0;width:0}\
#summary,#style-table{font-family:Ubuntu,Verdana!important;font-size:9pt!important}\
#summary{border-radius:8px 8px 0 0;-webkit-border-radius:8px 8px 0 0;background-color:#444;color:#e5e5e5;margin:0;padding:5px 8px 0 8px;min-width:400px;text-shadow:2px 2px 2px #000}\
#summary .good,#summary .ok,#summary .bad{font-weight:bold}\
#summary label.good{color:#090}\
#summary label.bad{color:#F00}\
b.b{margin:0 2px 0 4px}\
label.good,label.ok{margin-right:8px}\
b.total,b.weekly{margin-right:10px}\
#summary b.good,#summary b.ok,#summary b.bad{color:#E5E5E5}\
#summary label:not(.good):not(.bad){color:tan}\
#summary #ok{color:#FD0}\
#summary:hover{cursor:default}\
#summary #lastcheck{color:tan!important;margin:0 0 4px 0!important}\
#summary #resetBtn{-moz-appearance:none!important;-webkit-appearance:none!important;background:-moz-linear-gradient(#777, #444)!important;background:-webkit-linear-gradient(#777, #444)!important;border:1px solid #777!important;border-radius:4px!important;-webkit-border-radius:4px!important;box-shadow:0 0 1px #777 inset!important;-webkit-box-shadow:0 0 1px #777 inset!important;color:#FFF!important;margin:0 0 0 8px!important;padding:2px 4px!important}\
#summary #resetBtn:hover{background:-moz-linear-gradient(#444, #777)!important;background:-webkit-linear-gradient(#444, #777)!important}\
#table-container{background:rgba(255,255,230,.5);border-radius:0 8px 0 0;-web-kit-border-radius:0 8px 0 0;border:2px solid #444;display:inline-block;margin:0}\
#style-table tr:not(.obsolete) a[href]{color:#000!important;}\
#style-table{width:100%;border-collapse:collapse;margin:0}\
#main-article #style-table tr.obsolete a{color:#666!important;font-style:italic!important;text-shadow:none!important}\
#style-table tr.obsolete:hover{background:rgba(44,44,44,.3)!important}\
#main-article #style-table tr.obsolete:hover td a{color:#444!important}\
#main-article #style-table tr.obsolete:hover td a:hover{color:#000!important}\
#style-table tr.obsolete:hover td a:hover{color:#FFF!important}\
#style-table tr:hover td{background-color:rgba(0,0,0,.1)}\
#style-table td,#style-table th{border:1px solid #444!important;height:24px;line-height:24px;padding:0 4px;text-align:center!important}\
#style-table th:nth-child(2),#style-table td:nth-child(2){min-width:428px;padding:0 4px;text-align:left!important}\
#style-table th{background:#444;color:tan;height:26px;padding:0 4px 0px 4px;text-shadow:1px 1px 2px #000}\
#style-table th:hover{color:#FFF;cursor:pointer}\
#style-table a{margin-right:15px;text-decoration:none!important;line-height:20px}\
#main-article #table-container #style-table a:hover{text-decoration:none}\
#main-article #style-table a{font-style:normal!important;font-family:inherit!important;font-weight:normal!important;font-size:inherit!important}\
#style-table td a{margin-right:5px}\
#style-table .url{color:red!important;margin-right:5px}\
#style-table img[class^=\"metafavicon\"]{margin-right:4px;vertical-align:top;width:16px;height:16px;display:inline-block}\
#style-table th:nth-child(2){line-height:24px}\
#style-table td:nth-child(2) a:not(.metascreenmain):not(.metascreenmore):first-child{padding:1px 0}\
#style-table th:nth-child(7),#style-table td:nth-child(7){width:72px}\
#style-table>tr:not(:first-child):hover{background-color:#444}\
#style-table>tr:not(:first-child):hover *{color:#FFF;text-shadow:1px 1px 2px #000}\
#style-table>tr:not(:first-child):hover>*{background-color:transparent}\
#style-table tr:not(.obsolete) td *{color:#000;text-shadow:1px 1px 2px #999}\
#style-table tr.obsolete td a,#style-table tr.obsolete td *{color:#666}\
#style-table tr:not(.obsolete):hover a{color:tan!important}\
#style-table th:hover .header{color:tan;cursor:default}\
#style-table tr:hover a:hover{color:#FFF!important}\
#summary,#style-table th,#style-table td:nth-child(1),#style-table td:nth-child(3),#style-table td:nth-child(4),#style-table td:nth-child(5),#style-table td:nth-child(6),#style-table td:nth-child(7){-moz-user-select:none!important;-webkit-user-select:none!important;cursor:default!important}\
#style-table td:nth-child(1){padding:0!important;width:32px!important}\
#style-table #metaOpen,#style-table #metaClose,#style-table #metaReset,#style-table .meta .metascreenmain,#style-table .meta .metascreenmore,#style-table .meta .metadiscussions{float:right}\
#style-table #metaOpen,#style-table #metaClose,#style-table #metaReset{height:24px;margin:-1px -5px 0 0;width:24px}\
#style-table #metaClose,#style-table #metaReset{margin-right:2px}\
#style-table #metaOpen,#style-table #metaClose,#style-table #metaReset{border-radius:100%;-webkit-border-radius:100%;border:1px solid transparent!important}\
#style-table #metaOpen:hover,#style-table #metaClose:hover,#style-table #metaReset:hover{background-color:#FFF!important}\
#style-table #obsBtn{-moz-appearance:none;-webkit-appearance:none;border:1px solid;border-radius:4px;-webkit-border-radius:4px;color:#FFF;font-weight:bold;opacity:.6;margin:0;padding:1px 4px}\
#style-table #obsBtn:hover{opacity:1}\
#style-table th img{position:relative;right:-5px;top:-1px}\
#style-table .edit,#style-table .delete,#style-table .undelete,#style-table .stats{float:right;height:24px;margin:0;width:24px}\
#style-table .meta{display:inline;color:gray;font-size:90%!important}\
#style-table .meta .metascreenmain,#style-table .meta .metascreenmore,#more-screenshots .metascreenmore,#style-table .meta .metadiscussions{height:16px!important;width:16px!important}\
#style-table .meta .metascreenmain,#style-table .meta .metascreenmore{margin:4px 2px 0 0!important}\
#style-table .metadiscussions{margin:4px 1px 0 0!important}\
#style-table .metascreenmain,#style-table .metascreenmore{background-color:#999!important}\
#style-table .metascreenmain:hover,#style-table .metascreenmore:hover{background-color:#FFF!important}\
#style-table td .meta>div:not(.metadiscussions){position:relative!important;top:-4px!important;margin-bottom:-5px!important;vertical-align:top!important}\
#style-table img[class^="metafavicon"]{margin-top:-2px!important;vertical-align:middle!important}\
#style-table tr:hover span.url,#style-table tr:not(.obsolete):hover td span.date{color:tan!important}\
#style-table tr.obsolete:hover td span.url,#style-table tr:hover span.date{color:#444!important;text-shadow:none!important}\
#style-table span.diffP{color:#009900!important}\
#style-table span.diffN{color:#FF0000!important}\
#style-table span.diffP,#style-table span.diffN{padding-left:4px!important}\
#style-table td span.diffP,#style-table td span.diffN{font-size:80%!important}\
#popup_container{display:none;position:fixed;top:2px;box-shadow:2px 2px 2px #000 inset,4px 4px 8px #000;-webkit-box-shadow:2px 2px 2px #000 inset,4px 4px 8px #000;background:rgba(44,44,44,.85);border:2px solid;-moz-border-top-colors:#000 #999;-moz-border-left-colors:#000 #999;-moz-border-right-colors:#000 #999;-moz-border-bottom-colors:#000 #999;border-radius:8px;-webkit-border-radius:8px;padding:16px;z-index:1000}\
.popup_right{right:2px}\
.popup_left{left:2px}\
#popup_container img{box-shadow:4px 4px 8px #000;-webkit-box-shadow:4px 4px 8px #000;display:block!important}\
.date2{margin-left:8px}\
#main-article h2{display:none!important}\
#left-sidebar #filter-block,#left-sidebar #related{border-radius:8px!important;-webkit-border-radius:8px!important}\
#related>h2{text-decoration:underline!important}\
#main-header a:hover{cursor:pointer!important}\
section#obsoletion-message{background:-moz-linear-gradient(#B50000, #640000)!important;background:-webkit-linear-gradient(#B50000, #630000)!important;border:1px solid #B50000!important;border-radius:8px!important;box-shadow:1px 1px 1px #000 inset!important;display:-moz-box!important;margin:0 10px 10px 18px!important;padding:6px!important;position:relative!important;top:0!important;min-width:100px!important;text-shadow:1px 1px 2px #000!important}\
#main-article section#obsoletion-message h2{margin-left:0!important;text-align:center!important}\
#main-article section#obsoletion-message p{color:#FFF!important;margin:0!important}\
#main-article section#obsoletion-message a{color:#999!important}\
#main-article section#obsoletion-message a:hover{color:#FFF!important}\
#left-sidebar #search-terms{width:85%!important}\
#show-code{background:none!important;margin:0 0 0 0!important;padding:0!important}\
#show-button{padding:4px!important;text-align:center!important;width:76px!important}\
#show-code pre#view-code{border-radius:8px!important;-webkit-border-radius:8px!important;background:#F2F2F2!important;border:2px solid #000!important;max-height:90%!important;overflow-y:auto!important;position:fixed!important;text-shadow:1px 1px 2px #000!important;z-index:6!important}\
#stylish-code{color:#000!important;font-family:monospace!important;font-size:15px!important;padding:10px!important;text-shadow:none!important;white-space:pre-wrap!important;word-wrap:break-word!important}\
#post-install-ad{display:none!important}\
footer>p{margin:0!important}\
footer>p>a{color:#9043CC!important;text-decoration:underline!important}\
#left-sidebar #labelGroup{-moz-user-select:none!important;padding:3px!important}\
.install-status.install-info{text-shadow:1px 1px 2px #000!important}\
#left-sidebar a{display:block!important}\
body:not(#f) a#userProfile{white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}\
#left-sidebar li#contact{margin:4px 0 0 0!important}\
#left-sidebar li#contact *{display:inline!important}\
#left-sidebar nav footer p>a{display:none!important}\
#left-sidebar li.more{margin:6px 0 0 0!important}\
#left-sidebar a#email,#left-sidebar a#pm{color:#000!important}\
  ');

//===================================== Change Log ==========================================================
addStyle('\
');
//===========================================================================================================

  if(theme) {
    addStyle('\
body,#devtools-wrapper .dialog{background:'+ tint +' url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAYOUlEQVR42m3cha4j1xKFYZ8wT/B9/ZyJFOZkwox3/r7na62x0pJlu2FD7YJVsPvu008/vf7555+XjgcPHlz++eefy6+//nq5u7u7dL7vV1555fLDDz9cnn/++cuzzz57+frrry9PPvnkcf9vv/12+euvvy7//vvvcc0zzz333OWnn366PPPMM+fvv//++/jd9wsvvHD5448/jt/12fOd+/777y9PPfXU5emnnz76+P3334976rvvJ5544hhr9/S/e3rW+LreGLretf43xu5pLP3uWp/GWd/u79P1znU0nu7pXONpLPr48ccfj/neffXVV9cIZpB1UgN9Ikz/e+C77747HqihBtvgIkbf7u15xOiZ2u3b7661GA20dnumwSNMbf3yyy/Hd30hbr8jdoOu/57tns4ZU9e6V1v9rp/XXnvtWDyLbAF6fr+71rO11xhqOwJ6Dh06zOcg4MOHD68o3o06jto4qI8HDdzgEbD7cZfJ13kriDMRPkJ3r4n2LA5u8Di16wbfd5xgQTpqEwF6JkL23fl+13dzwZU937hffvnlc9y122+c1v0d3Vcb5tx9Ee3FF188zjXmg4s//PDDaxeXpXFIDTag/jfp7rNSfTfZ5bomvSKwohZxImicUtv11dEg3de57rGYxLd2e4ZqMcF+dz5O6d7+N56uNekYwEKnbmo7Sao9fXaOKug3Do/gfXfN4tRW5/r++eef/y/i77777hVB6IEG0UWsbCUQkI6qkYiFaK+//vqpRxxNCifUz+qjnqmdJhhxTLbrPdP/JrK6CNFWCl599dVzcfSJk7Qb17300kuXb7755pwn/eheulAbqzeps1UtPX/3qMGrleiBOqMb1qAQCSvfpKx8HfSpccpeJ3RSH4Qniv3PaNROh4U4dMu96NefhesacaudxtwiMnTdExFrm7Knz/sdAeNA3NVzJKzry421TxU0BvPregfjePeowWsnephVpO9YMh3hQrqNboxTu7cOKfV+a29FJR1i4owQPdtiua+jCbdARIuuq+2ejUj13eR6PiLq11jp4vphFDBF5+i3jtrrfKLf87VDndUOqWmRTj37ySefXA9WvNc/JowT63T1U98LFQySYmWdKfoIZZD0mUkS144Iy5rTYRawdilzlpvRoS87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)fixed!important;margin:0!important}\
:root body{max-width:100%!important;width:100%!important}\
#main-header{background:#404040!important;border-radius:0!important;-webkit-border-radius:0!important;color:tan!important;height:36px!important;margin:0!important;padding:1px 0 0 6px!important;position:fixed!important;text-shadow:2px 2px 2px #000!important;width:100%!important;z-index:99!important}\
#main-header h1 a{font-style:italic!important;text-decoration:none!important;font-family:Georgia,Segoe,Times!important}\
#main-header a,#left-sidebar a{color:tan!important;}\
#main-header>h1,#main-header a:hover{color:#FFF!important}\
#main-article div h2{display:-moz-box!important;margin:0 0 0 10px!important}\
#main-article>p:first-child{margin-top:0!important}\
#left-sidebar{float:none!important;left:0!important;position:fixed!important;top:36px!important;margin:0!important;}\
#left-sidebar>*{border-radius:6px!important;-webkit-border-radius:6px!important;margin:4px 0 4px 4px!important;padding:6px!important}\
#left-sidebar dl,#left-sidebar dd{margin:6px 0 0 0!important}\
#left-sidebar dl a{color:tan!important;text-decoration:none!important}\
#left-sidebar dl dt{display:none}\
#left-sidebar dl dd a{display:block!important}\
#left-sidebar>nav,#left-sidebar>div,#related{background:rgba(44,44,44,.9)!important;color:tan!important;text-shadow:1px 1px 2px #000!important}\
#left-sidebar a,#front-page-best a,#front-page-newest a{display:block!important;text-decoration:none!important}\
#left-sidebar a{margin-top:4px!important}\
#left-sidebar a:hover{color:#FFF!important;}\
#left-sidebar dl>dd>a{font-family:monospace!important;white-space:pre-wrap!important;word-wrap:break-word!important}\
#left-sidebar #show-advanced-search{-moz-appearance:button!important;-webkit-appearance:button!important;color:#000!important;float:none!important;font-size:12px!important;left:100%!important;margin:0 0 -22px -75px!important;padding-right:4px!important;position:relative!important;text-align:center!important;text-decoration:none!important;text-shadow:none!important;top:5px!important;width:65px!important}\
#left-sidebar #advanced-search{border:none!important;margin-bottom:-28px!important}\
#left-sidebar #advanced-search select{font-size:15px!important;height:21px!important;margin-top:4px!important}\
#left-sidebar #advanced-search-submit{margin-top:4px!important}\
#left-sidebar #sort-select{margin-right:4px!important}\
#left-sidebar select>option{background:#444!important;color:tan!important}\
#left-sidebar select>option:hover,a#show-button{color:#FFF!important}\
#left-sidebar #search-submit{padding:2px 4px 6px 4px!important}\
#left-sidebar .more{border-top:2px groove tan!important}\
#main-article>h2,#main-article>p:first-child>hr{display:none}\
#subcategory-list{-moz-column-count:3!important;}\
#main-article div.pagination{background:#444!important;border-radius:0 0 5px 5px!important;-webkit-border-radius:0 0 5px 5px!important;height:23px!important;margin:-3px 0 0 0!important;padding:3px 4px 0 0!important}\
#main-article div.pagination a,#main-article div.pagination span{color:tan!important;font-weight:bold!important;margin:0 4px!important;padding:4px!important;text-decoration:none!important;text-shadow:1px 1px 2px #000!important}\
#main-article div.pagination span{padding:2px!important}\
#main-article div.pagination span.current,#main-article div.pagination span.current:hover{color:#FFF!important}\
#main-article div.pagination span.current{border-bottom:1px solid #444!important}\
#main-article div.pagination a:hover,#main-article div.pagination span:hover{color:#FFF!important;text-decoration:none!important}\
#main-article div.pagination .prev_page{margin-left:4px!important}\
#main-article div.pagination a:not([class]):hover{color:#FFF!important}\
#main-article div.pagination a{border-radius:5px!important;-webkit-border-radius:5px!important;-moz-box-shadow:2px 2px 2px #000!important;-webkit-box-shadow:2px 2px 2px #000!important;background:rgba(44,44,44,.75)!important;border:1px solid #000!important;padding:2px 4px!important}\
#main-article div.pagination a:hover{background:tan!important}\
#main-article div.pagination span.disabled,#main-article div.pagination span.gap{color:#999!important}\
#main-article div.pagination span.gap{position:relative!important;top:5px!important}\
#main-article div.pagination *:not(:last-child){margin-right:-2px!important}\
#main-article #screenshots{border-color:#444!important;box-shadow: 3px 3px 3px #444444 !important;min-height:32px!important}\
#subcategory-list a:hover{text-decoration:underline!important}\
#metaOption,#show-button,#main-article #control-panel a,#left-sidebar #show-advanced-search,#left-sidebar button,#left-sidebar input[type="submit"],#main-article input[type="submit"],#main-article input[type="button"],input[name^="new_screenshot_description_"],#style_pledgie_id{-moz-appearance:none!important;-webkit-appearance:none!important;background:-moz-linear-gradient(#777, #444)!important;background:-webkit-linear-gradient(#777, #444)!important;border:1px solid #444!important;border-radius:4px!important;-webkit-border-radius:4px!important;box-shadow:0 0 2px #777 inset!important;-webkit-box-shadow:0 0 1px #777 inset!important;color:#FFF!important;padding:4px!important;text-shadow:1px 1px 2px #000!important;}\
#metaOption:hover,#main-article #control-panel a:hover,#left-sidebar #show-advanced-search:hover,#left-sidebar button:hover,#left-sidebar input[type="submit"]:hover,#main-article input[type="submit"]:hover,#main-article input[type="button"]:hover,#show-button:hover,input[name^="new_screenshot_description_"]:hover,#style_pledgie_id:hover{background:-moz-linear-gradient(#444, #777)!important;background:-webkit-linear-gradient(#444, #777)!important}\
#labelGroup,#left-sidebar input,#left-sidebar select,#style-options select,#main-article input[type="text"],#main-article input[type="url"],#main-article input[type="password"]{-moz-appearance:none!important;-webkit-appearance:none!important;background:#555!important;border:1px solid #777!important;border-radius:4px!important;-webkit-border-radius:4px!important;box-shadow:0 0 1px #777 inset!important;-webkit-box-shadow:0 0 1px #777 inset!important;color:#FFF!important;text-shadow:1px 1px 2px #000!important;}\
#left-sidebar input,#main-article input[type="text"],#main-article input[type="url"]{padding:4px!important}\
#front-page-best,#front-page-newest{margin:20px!important;padding:10px 20px 10px 0!important}\
#subcategory-list{margin:0 10px!important;padding:10px 10px 10px 30px!important}\
#subcategory-list,#front-page-best,#front-page-newest{background:rgba(255,255,230,.3)!important;border:1px solid #444!important;border-radius:10px!important;-webkit-border-radius:10px!important;box-shadow:3px 3px 3px #444!important;-webkit-box-shadow:3px 3px 3px #444!important}\
#subcategory-list li,#front-page-best li,#front-page-newest li{margin:3px 0!important}\
#main-article .form-controls textarea{border-radius:8px!important;-webkit-border-radius:8px!important;background:#444!important;border:none!important;color:#FFF!important;padding:8px!important;text-shadow:1px 1px 2px #000!important;width:98%!important}\
#main-article #screenshots{background:rgba(255, 255, 230, 0.5)!important}\
#additional-info,#license,#discussions-area{clear:both!important;float:left!important}\
#control-panel{margin-top:2px!important}\
#main-article #control-panel a{-moz-appearance:button!important;-webkit-appearance:none!important;color:#FFF!important;text-decoration:none!important}\
#show-code pre#view-code{background:#222!important;border:none!important;text-shadow:1px 1px 2px #000!important}\
#stylish-code{color:tan!important;text-shadow:1px 1px 2px #000!important}\
#style-options{-moz-column-count:2!important;-webkit-column-count:2!important;background:rgba(255,255,230,.3)!important;border:1px solid #444!important;border-radius:8px!important;box-shadow:3px 3px 3px #444444!important;-webkit-border-radius:8px!important;-webkit-box-shadow:3px 3px 3px #444444!important;padding:8px 8px 8px 24px!important}\
#style-options li{margin:2px 0!important}\
#miscellaneous-info tr:last-child td{float:left!important}\
#metaOption:hover{cursor:pointer!important}\
#content-wrapper{margin-top:40px!important}\
#main-article a{color:'+nonvisited+'!important;font-family:Georgia,Segoe,Times!important;font-size:110%!important;font-style:italic!important;font-weight:normal!important;text-decoration:none!important}\
#main-article a:visited{color:'+visited+'!important}\
#main-article a:hover{text-decoration:underline!important}\
#main-article #style-table a{text-decoration:none!important}\
#main-article > div a,#main-article #subcategory-list a,#main-article div.pagination a{font-family:inherit!important;font-size:inherit!important;font-style:normal!important}\
#main-article div.pagination a:visited{color:#888!important}\
#main-article div.pagination a:visited:hover{color:#FFF!important}\
footer>p>a{color:tan!important;text-decoration:none!important}\
#main-article .install-status a{color:#BBB!important;text-shadow:1px 1px 2px #000!important}\
#content-wrapper{width:99%!important}\
#main-article #control-panel a{position:relative!important;top:3px!important}\
nav>footer>p{display:inline!important}\
.more{font-size:100%!important;font-weight:bold!important}\
.more>a{font-size:smaller!important;font-weight:normal!important}\
.screenshot-thumbnail img{box-shadow:0 4px 10px 2px rgba(0,0,0,0.5)!important;max-height:100%;max-width: 100% !important;}\
.screenshot,#main-screenshot{border:medium none!important;border-radius:1px!important;}\
.screenshot{image-rendering:optimizequality!important;}\
#left-sidebar #btnCont>*{display:inline!important;height:24px!important;padding:0 4px!important}\
#left-sidebar #btnCont{background:none!important;display:inline!important;padding:0!important}\
#metaOption{margin-right:10px!important;padding:4px!important}\
#left-sidebar #show-button{padding:2px 4px 3px 4px!important}\
#left-sidebar a#email,#left-sidebar a#pm{color:tan!important}\
#left-sidebar a#email:hover,#left-sidebar a#pm:hover{color:#FFF!important}\
    ');
  }

  var yyy = document.body.querySelector("a[href='/contact']");
  var contact = $c('li', {id:'contact'});
  var contact1 = $c('a', {id:'email',  href:"mailto:jason.barnabe@gmail.com", textContent:"E-mail"});
  var contact2 = $c('label', {id:'or', textContent:"  Or  "});
  var contact3 = $c('a', {id:'pm', href:"http://forum.userstyles.org/messages/add/JasonBarnabe", textContent:"PM"});
  var contact4 = $c('label', {id:'jason', textContent:"  Jason (np)"});
  contact.appendChild(contact1);
  contact.appendChild(contact2);
  contact.appendChild(contact3);
  contact.appendChild(contact4);
  yyy.parentNode.appendChild(contact);

  var metaOp = $c('button', {id:'metaOption', textContent:tvp_104, title:tvp_54}, [{type:'click', fn:function(e) {e.preventDefault(); devtools.config.open();}}]);
  var mhd = $('#main-header');
  var ost = $('#content-wrapper').offsetTop;
  var ltsb = $('#left-sidebar');
  var sbw = ltsb.clientWidth;
  var cww1 = $('#content-wrapper').clientWidth - content.split('px')[0] - 23;
  var cont = $c('ctrl', {id:'btnCont'});
  cont.appendChild(metaOp);
  if (theme && $('#show-button')) cont.appendChild($('#show-button'));
  ltsb.appendChild(cont);
  var cww2 = $('#content-wrapper').clientWidth - sbw - 24;
  var zzz = $('A', $('#main-header'), 1);
  zzz.title = tvp_3;
  var aaa = zzz.offsetWidth;
  var hhh = $('H1', mhd, 1);
  hhh.innerHTML = hhh.innerHTML.replace('-', '');
  var xxx = content.split('px')[0] - aaa - 12;
  addStyle('\
#main-header>h1>a{margin-right:'+xxx+'px!important}\
  ');

  var cw = $('A', $('#content-wrapper'));
  var re = $('A', $('#related'));
  for(var i = 0; i < cw.length; i++) cw[i].title = cw[i].href;
  for(var i = 0; i < re.length; i++) re[i].title = re[i].href;

  if($('#related')) {
    var vvv = document.body.querySelector("#related .more");
    vvv.firstChild.textContent = tvp_111;
  }

  if($('#control-panel')) {
    var cp = $('#control-panel').children;
    for(var i = 0; i < cp.length; i++) cp[i].textContent = cp[i].textContent.replace(/\[|\]/g, '');
  }

  if(sizemode) {
    var aaa = sidebar.split('px')[0] - 4;
    var bbb = content.split('px')[0] - 1;
    addStyle('\
#left-sidebar{width:'+sidebar+'!important}\
#main-article{margin-left:'+content+'!important}\
div.pagination{width:'+table+'!important}\
#table-container{width:'+table+'!important}\
pre#view-code{left:'+bbb+'px!important;top:'+ost+'px!important;width:'+cww1+'px!important}\
    ');
  }

  if(!sizemode)
    addStyle('\
pre#view-code{left:'+sbw+'px!important;top:'+ost+'px!important;width:'+cww2+'px!important}\
    ');

  if(filter) {
    addStyle('\
#left-sidebar label[for="per-page-select"],#left-sidebar #per-page-select{display:none!important}\
#left-sidebar #labelGroup{text-align:center!important;width:110px!important}\
#left-sidebar #showB{width:100px!important}\
#left-sidebar #wordDiv{margin:5px 0!important}\
#left-sidebar #labCnt{margin:0 8px 0 0!important}\
#left-sidebar #filterCon{text-align:center!important;width:70px!important}\
#left-sidebar #filterGroup{display:inline!important;margin:0!important;text-align:center!important}\
#left-sidebar input#sel{text-align:center!important;width:32px!important}\
    ');
    if(!theme) 
      addStyle('\
#left-sidebar #okB{padding:0!important}\
#left-sidebar #remB,#left-sidebar #showB{margin:0 2px!important;padding:0!important}\
#left-sidebar #wordIn{color:#666;margin:0 0 0 2px!important;width:75%!important}\
#left-sidebar #wordIn:hover,#wordIn:focus{color:#000!important}\
#left-sidebar #labelGroup{color:#000!important}\
    ');
    if(theme) {
      addStyle('\
#left-sidebar #okB{padding:4px!important}\
#left-sidebar #remB,#left-sidebar #showB{margin:0 2px!important;padding:4px!important}\
#left-sidebar #showB{margin-left:0!important}\
#left-sidebar #wordIn{color:#FFF;margin:0 0 0 4px!important;width:75%!important}\
#left-sidebar #wordIn:hover,#wordIn:focus{color:#FFF!important}\
#left-sidebar #labelGroup{color:tan!important}\
    ');
  } }

  if(tags) 
    addStyle('\
#main-article>dl,#social,#donate,#pledgie{display:none!important}\
  ');

  if(links) {
    ltsb.firstElementChild.appendChild(ltsb.nextElementSibling);
    addStyle('\
footer>p>a{display:block!important}\
    ');
  }

  if(onStylePage && hiddenmeta) {
    try {
      var infoTables = $('#info-tables');
      var hiddenMeta = $('#hidden-meta');
      infoTables.appendChild(hiddenMeta);
    } catch(ex) {}
    addStyle('\
#main-article #hidden-meta{background:rgba(44,44,44,.75)!important;border:1px solid #222!important;border-radius:8px!important;-webkit-border-radius:8px!important;color:#FFF!important;display:inline-block!important;margin-left:3em!important;padding:5px 5px 5px 10px!important;text-shadow:1px 1px 2px #000!important}\
#main-article #hidden-meta>*:before{content:attr(id) ": "!important}\
#main-article #hidden-meta>*::first-letter{font-size:120%!important}\
#main-article #hidden-meta>#stylish-description{display:none!important}\
    ');
  }


  if(onBrowsePage) addStyle('\
#table-container{border-radius:5px 5px 0 0;\
-webkit-border-radius:5px 5px 0 0}\
  ');

  if(onEditPage || onEdit3Page || onCreatePage || onNewPage || onUDPage) {
    var lsch = ltsb.clientHeight + 12;
    var doch = window.innerHeight - 100;
    addStyle('\
textarea#css{height:'+doch+'px!important}\
#main-article input[type="submit"][value="Save"]{height:24px!important;left:110px!important;padding:0 0 0 0!important;position:fixed!important;top:'+lsch+'px!important;z-index:2!important}\
    ');
  }

  if(onEdit2Page) addStyle('#summary,#table-container{display:none!important}');

  if(onStylePage) {
    var name = document.body.querySelector("a[rel='nofollow dct:creator']").textContent;
    var navbar = $('nav', ltsb, 1);
    var link = $c('a', {id:'userProfile', href:'http://forum.userstyles.org/profile/' + name, textContent:tvp_109 + name});
    navbar.insertBefore(link, navbar.lastElementChild);
    addStyle('body:not(#f) a#userProfile{width:'+sbw -25+'px!important}');
  }

  if(onUserPage && !onMyPage) {
    var name = document.body.querySelector("dd a[rel='nofollow']").href;
    var val = name.split("messages\/add\/")[1].replace(/%27/g, "'").replace(/%20/g, " ");
    var navbar = $('nav', ltsb, 1);
    var link = $c('a', {id:'userProfile', href:name.replace("messages/add", "profile"), textContent:tvp_109 + val});
    navbar.insertBefore(link, navbar.lastElementChild);
    addStyle('body:not(#f) a#userProfile{width:'+sbw - 25+'px!important}');
  }

  function $(q, root, single, context) {
    root = root || document;
    context = context || root;
    if(q[0] == '#') return root.getElementById(q.substr(1));
    if(q.match(/^[\/*]|^\.[\/\.]/)) {
      if(single) return root.evaluate(q, context, null, 9, null).singleNodeValue;
      var arr = []; var xpr = root.evaluate(q, context, null, 7, null);
      for(var i = 0; i < xpr.snapshotLength; i++) arr.push(xpr.snapshotItem(i));
      return arr;
    }
    if(q[0] == '.') {
      if(single) return root.getElementsByClassName(q.substr(1))[0];
      return root.getElementsByClassName(q.substr(1));
    }
    if(single) return root.getElementsByTagName(q)[0];
    return root.getElementsByTagName(q);
  }

  function $c(type, props, evls) {
    var node = document.createElement(type);
    if(props && typeof props == 'object') {
      for(prop in props) {
        if(typeof node[prop] == 'undefined') node.setAttribute(prop, props[prop]);
        else node[prop] = props[prop];
    } }
    if(evls instanceof Array) {
      for(var i = 0; i < evls.length; i++) {
        var evl = evls[i];
        if(typeof evl.type == 'string' && typeof evl.fn == 'function')
          node.addEventListener(evl.type, evl.fn, false);
    } }
    return node;
  }

  function createDiffSpan(diff) {
    if(diff > 0) return $c('span', {className:'diffP', innerHTML:'+'+toCustStr(diff)+''});
    else return $c('span', {className:'diffN', innerHTML:''+toCustStr(diff)+''});
  }

  function getDateDiffString(dateNew, dateOld) {
    var dateDiff = new Date(dateNew.getTime() - dateOld.getTime());
    dateDiff.setUTCFullYear(dateDiff.getUTCFullYear() - 1970);
    var strDateDiff = '', timeunitValue = 0;
    var timeunitsHash = { year: 'getUTCFullYear', month: 'getUTCMonth', day: 'getUTCDate', hour: 'getUTCHours'};
    for (var timeunitName in timeunitsHash) {
      timeunitValue = dateDiff[timeunitsHash[timeunitName]]() - ((timeunitName == 'day') ? 1 : 0);
      if (timeunitValue !== 0) {
        if ((timeunitName == 'millisecond') && (strDateDiff.length !== 0)) continue;
        strDateDiff += ((strDateDiff.length === 0) ? '' : ', ') + toCustStr(timeunitValue) + ' ' + timeunitName + (timeunitValue>1?'s':'');
    } }
    return strDateDiff.replace(/,([^,]*)$/, ' and$1');
  }

  function toCustStr(num) {
    return num.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }

  String.prototype.toCustNum = function() {
    return parseFloat(this.replace(',', ''));
  }

  String.prototype.trim = function() {
    var	str = this.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
  }

  function insertAfter(newNode, refNode) {
    if(refNode.nextSibling) return refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
    else return refNode.parentNode.appendChild(newNode);
  }

  function remove(node) {
    if(node) node.parentNode.removeChild(node);
  }

  function ucFirst(str) {
    var firstLetter = str.slice(0, 1);
    return firstLetter.toUpperCase() + str.substring(1);
  }

  function capAll(str) { 
    var words = str.toLowerCase().split(' '); 
    for (var i = 0; i < words.length; i++) { 
      var wd = words[i], first = wd.substr(0, 1), rest = wd.substr(1, wd.length - 1);
      words[i] = first.toUpperCase() + rest;
    } 
    return words.join(' '); 
  }

  if(loggedIn) {
    var ratingGood = $('.good-average-rating', styleList).length;
    var ratingOk = $('.ok-average-rating', styleList).length;
    var ratingBad = $('.bad-average-rating', styleList).length;
  } else {
    var ratingGood = $('.good-rating', styleList).length;
    var ratingOk = $('.ok-rating', styleList).length;
    var ratingBad = $('.bad-rating', styleList).length;
  }

  for(var i = 0; i < styleCount; i++) {
    var styleObj = {};
    var style = styles[i];
    if(loggedIn) {
      var link = $('a', style, 1), dates = $('.date-value', style), rating = $('img', style, 1);
      styleObj.id = link.href.match(/\/(\d+)\//)[1];
      styleObj.name = link.textContent;
      var installs = $('.numeric-value', style);
      styleObj.installs = installs[1].textContent.toCustNum();
      styleObj.weekly = installs[0].textContent.toCustNum();
      styleObj.updated = dates[0].textContent;
      styleObj.discussed = dates[1].textContent.replace('-', ' \u00A0 ');
      if(rating) {
        switch(rating.className) {
          case 'good-average-rating': styleObj.rating = 3; break;
          case 'ok-average-rating': styleObj.rating = 2; break;
          case 'bad-average-rating': styleObj.rating = 1; break;
        }
        styleObj.rated = true;
      } else {
        styleObj.rating = 0;
        styleObj.rated = false;
      }
      styleObj.obsolete = Boolean($('.obsolete', style, 1));
      if(styleObj.obsolete) {
        totalObsoleteInstalls += parseInt(styleObj.installs);
        totalObsoleteWeekly += parseInt(styleObj.weekly);
      }
    } else { 
      var link = $('a', $('header', style, 1), 1);
      styleObj.id = link.href.match(/\/(\d+)\//)[1];
      styleObj.name = link.textContent;
      styleObj.isOwn = style.className.indexOf('by-current-user') != -1;
      styleObj.installs = style.getAttribute('total-install-count');
      styleObj.weekly = style.getAttribute('weekly-install-count');
      styleObj.text = $('p', style, 1).textContent.replace(/\s+/g, ' ');
      var updated = $('.style-brief-stats', style, 1);
      if(updated) {
        updated = updated.children[0].textContent.match(/Updated:\s+(.*)\s+/)[1];
        styleObj.updated = updated.replace(/\s+/g, ' ');
      }
      styleObj.rating = style.getAttribute('average-rating') || 0;
      styleObj.obsolete = style.className.indexOf('obsolete') != -1;
      if(styleObj.obsolete) {
        totalObsoleteInstalls += parseInt(styleObj.installs);
        totalObsoleteWeekly += parseInt(styleObj.weekly);
      }
      styleObj.rated = style.className.indexOf('no-rating') == -1;
    }
    styleArray.push(styleObj);
    if(onUserPage) { if(loggedIn) {
      var id = styleObj.id;
      DATA[id] = {};
      DATA[id].installs = styleObj.installs;
      DATA[id].weekly = styleObj.weekly;
    }
    totalInstalls += parseInt(styleObj.installs);
    totalWeekly += parseInt(styleObj.weekly);
  } }

  var styleTable = $c('table', {id:'style-table'});

  if(filter) {
    try {
      $('#advanced-search').childNodes[5].textContent = "";
      $('#advanced-search').childNodes[7].textContent = "";
    } catch(ex) {}
  }

  if(theme && onStylePage) {
    if(!onBrowsePage) {
      var sty = $('#miscellaneous-info').children[0], discussions = $('#discussions');
      var badr = $('.bad-rating', discussions).length, okr = $('.ok-rating', discussions).length;
      var goodr = $('.good-rating', discussions).length;
      if(sty.childElementCount == '6') {
        var misinfo = sty.children[5].lastElementChild;
        var multdiv = (((badr * 1) + (okr * 2) + (goodr * 3)) / (badr + okr + goodr));
        var product = Math.round(multdiv / 3 * 48), rnd = Math.round(multdiv * 100) / 100, rts = rnd.toString();
        if(rts.indexOf(".") == -1) rnd = rnd + ".0"; else rnd = rnd;
        misinfo.parentNode.replaceChild($c('td', {rating:rnd, title:rnd, innerHTML:'<div class="ratingbg"><div class="ratingfg" style="width:' + product + 'px"></div</div>'}), misinfo);
      }
      if(sty.childElementCount == '5') {
        sty.appendChild($c('tr', {id:'noRate'}));
        var sty2 = $('#noRate');
        sty2.appendChild($c('th', {id:'ranked', textContent:'Rated: '}));
        sty2.appendChild($c('td', {id:'rating', title:'Not Rated', textContent:'Not Yet'})); 
  } } }
 
  var styleTableHeaderRow = $c('tr');

  if(onUserPage || onBrowsePage) var theaders = [tvp_15, '', tvp_17, tvp_18, tvp_19, tvp_20];

  if(onMyPage) var theaders = [tvp_15, '', tvp_17, tvp_18, tvp_21, tvp_20, ''];

  for(var i = 0; i < theaders.length; i++) styleTableHeaderRow.appendChild($c('th', {className:'header header-row', textContent:theaders[i]}));

  styleTable.appendChild(styleTableHeaderRow);

  var headerCell2 = $('./tr/th[2]', document, true, styleTable);
  var cnt = styleCount, oCnt = obsoleteCount, aCnt = cnt - oCnt;

  if(!onMyPage) headerCell2.textContent = tvp_22 + cnt;

  if(onMyPage) {
    headerCell2.textContent = tvp_22 + cnt + tvp_23 + aCnt + tvp_24 + oCnt;
    var headerCell7 = $('./tr/th[7]', document, true, styleTable);
    headerCell7.appendChild($c('button', {id:'obsBtn', textContent:tvp_99, title:tvp_25}, [{type:'click', fn:function() {toggleObs()}}]));
  }

  if(metadata && styleCount > 1) {
    headerCell2.appendChild($c('button', {id:'metaOpen', title:(onMyPage ? tvp_96 : tvp_97)}, [{type:'click', fn:function(e) {openCells(e.shiftKey || e.ctrlKey ? true : false)}}]));
    headerCell2.appendChild($c('button', {id:'metaClose', title:tvp_98}, [{type:'click', fn:function() {closeCells()}}]));
    headerCell2.appendChild($c('button', {id:'metaReset', title:tvp_110}, [{type:'click', fn:function() {document.location.reload()}}]));
  }

  if(links && !onEdit2Page) {
    var ma = $('#main-article').children[0];
    var lsb = ltsb.children[0].children[0];
    lsb.appendChild(ma);
  }

  for(var i = 0; i < styleArray.length; i++) {
    var style = styleArray[i], row = $c('tr', {id:style.id});
    if(style.obsolete) row.className = 'obsolete';
    row.appendChild($c('td', {textContent:(i + 1)}));
    var cellN = $c('td');
    if(onBrowsePage || onUserPage  && !onMyPage)
      cellN.appendChild($c('a', {href:'/styles/'+style.id, textContent:style.name, title:style.text.trim()}));
    else
      cellN.appendChild($c('a', {href:'/styles/'+style.id, textContent:style.name, title:style.name}));
    if(metadata) {
      var infolinkopen = $c('div', {className:'metalink-open', title:tvp_28, styleid:style.id});
      var infolinkclose = $c('div', {className:'metalink-close', title:tvp_29, styleid:style.id}, [{type:'mouseover', fn:function() {hidePopup()}}]);
      cellN.appendChild(infolinkclose);
      cellN.appendChild(infolinkopen);
      infolinkopen.addEventListener('click', function(e) {
        var src = e.target, bbb = src.getAttribute('styleid'), row = $('#' + bbb), aRow = row.children[1]; 
        row.setAttribute("opened", "true");
        aRow.children[1].className += ' loading';
        fetchMeta(bbb);
        aRow.children[2].style.width = '0';
        aRow.children[1].style.width = '18px';
        hidePopup();
      }, false);
      infolinkclose.addEventListener('click', function(e) {
        var src = e.target, bbb = src.getAttribute('styleid'), row = $('#' + bbb), aRow = row.children[1]; 
        row.removeAttribute('opened');
        aRow.removeChild(aRow.lastChild);
        aRow.children[2].style.width = '18px';
        aRow.children[1].style.width = '0';
        hidePopup();
      }, false);
    }

    var cellI = $c('td', {textContent:toCustStr(style.installs)});
    var cellW = $c('td', {textContent:toCustStr(style.weekly)});
    if(onMyPage) var cellU = $c('td', {textContent:style.discussed});
    else var cellU = $c('td', {textContent:style.updated});
    var rrr = style.rating.toString();
    if(rrr.indexOf(".") == -1) rrr = rrr + ".0"; 
    else rrr = rrr;
    var cellR = $c('td', {rating:rrr, title:(rrr != '0.0' ? rrr : tvp_65), innerHTML:'<div class="ratingbg"><div class="ratingfg" style="width:' + Math.round(style.rating / 3 * 100) + '%"></div</div>'});

    if(onMyPage) {
      var cellO = $c('td');
      if($('#main-article').lastElementChild.lastElementChild.children[i].lastElementChild.children[1].textContent == tvp_112) 
        var deleteDiv = $c('a', {href:'/styles/delete/' + style.id, innerHTML:'<div class="undelete" title="'+tvp_113+'"></div>'});
      else 
        var deleteDiv = $c('a', {href:'/styles/delete/' + style.id, innerHTML:'<div class="delete" title="'+tvp_114+'"></div>'});
      var editDiv = $c('a', {href:'/styles/edit/' + style.id, innerHTML:'<div class="edit" title="'+tvp_115+'"></div>'});
      var statsDiv = $c('a', {href:'/styles/stats/' + style.id, innerHTML:'<div class="stats" title="'+tvp_116+'"></div>'});
      cellO.appendChild(statsDiv);
      cellO.appendChild(deleteDiv);
      cellO.appendChild(editDiv);
    }

    row.appendChild(cellN);
    row.appendChild(cellI);
    row.appendChild(cellW);
    row.appendChild(cellU);
    row.appendChild(cellR);
    if(onMyPage) row.appendChild(cellO);
    styleTable.appendChild(row);
  }

  var tableContainer = $c('div', {id:'table-container'});

  tableContainer.appendChild(styleTable);

  if(loggedIn) {
    styleList.parentNode.replaceChild(tableContainer, styleList);
  } else {
    while(styles.length > 0) styles[0].parentNode.removeChild(styles[0]);
    if($('.pagination')[0]) styleList.insertBefore(tableContainer, $('.pagination')[0]);
    else styleList.appendChild(tableContainer);
  }

  var th = $('th', styleTable);

  if(onUserPage) {
    for(var i = 0; i < th.length - 1; i++) {
      th[i].addEventListener('click', function(e) {
        if(e.target.nodeName == 'TH') sortTable(e.target);
      },false);
    }
  } else {
    for(var i = 0; i < th.length; i++) {
      th[i].addEventListener('click', function(e) {
        if(e.target.nodeName == 'TH') sortTable(e.target);
      },false);
  } }

  if(onUserPage) {
    var summary = '<label id="total" class="label total"></label><b class="b total">' + toCustStr(totalInstalls) + '</b>' +
      '<label id="weekly" class="label weekly"></label><b class="b weekly">' + toCustStr(totalWeekly-totalObsoleteWeekly) + '</b>' +
      '<label id="ratings" class="label ratings"></label><b class="b good">' + toCustStr(ratingGood) + '</b><label id="good" class="label good"></label>' +
      '<b class="b ok">' + toCustStr(ratingOk) + '</b><label id="ok" class="label ok"></label>' +
      '<b class="b bad">' + toCustStr(ratingBad) + '</b><label id="bad" class="label bad"></label>';
    tableContainer.parentNode.insertBefore($c('table', {id:'summary', innerHTML:summary}), tableContainer);
    $('#total').textContent = tvp_58;
    $('#weekly').textContent = tvp_59;
    $('#ratings').textContent = tvp_60;
    $('#good').textContent = tvp_61;
    $('#ok').textContent = tvp_62;
    $('#bad').textContent = tvp_63;
    if(stats) {
      var oldDATA = getValue('DATA-' + user);
      if(!oldDATA) { 
        setValue('DATA-' + user, jStringify(DATA)); 
      } else {
        oldDATA = jParse(oldDATA);
        var styleRows = $('tr', styleTable);
        var rowCount = styleRows.length;
        var diffITotal = diffWTotal = 0;
        for(var i = 1; i < rowCount; i++) {
          var styleRow = styleRows[i];
          var styleID = styleRow.id;
          var name = styleRow.cells[1].children[0].textContent;
          var installs = styleRow.cells[2].textContent.toCustNum();
          var weekly = styleRow.cells[3].textContent.toCustNum();
          if(oldDATA[styleID]) {
            var diff_I = parseInt(installs) - parseInt(oldDATA[styleID].installs);
            if(diff_I != 0) styleRow.cells[2].appendChild(createDiffSpan(diff_I));
            var diff_W = parseInt(weekly) - parseInt(oldDATA[styleID].weekly);
            if(diff_W != 0) styleRow.cells[3].appendChild(createDiffSpan(diff_W));
            diffITotal += diff_I; 
            diffWTotal += diff_W;
        } }
        var styleHeaderRow = $('//tr[th]', document, true, styleTable);
        var lastDiffCheck = getValue('lastDiffCheck-'+user);
        if(!lastDiffCheck) setValue('lastDiffCheck-' + user, new Date().getTime().toString());
        var sum = $('#summary');
        if(diffITotal != 0 || diffWTotal != 0) {
          if(lastDiffCheck) {
            lastDiffCheck = new Date(parseInt(lastDiffCheck));
            var lastCheckNode = $c('p', {id:'lastcheck', textContent:tvp_102 + getDateDiffString(new Date(), lastDiffCheck) + ' ago  (' + lastDiffCheck + ')'});
            sum.insertBefore(lastCheckNode, sum.firstChild);
            $('#lastcheck').textContent = $('#lastcheck').textContent.split(' GMT')[0] + ')';
          } else sum.insertBefore($c('p',{id:'lastcheck', textContent:tvp_101}), sum.firstChild);
          if(diffITotal != 0) styleHeaderRow.cells[2].appendChild(createDiffSpan(diffITotal));
          if(diffWTotal != 0) styleHeaderRow.cells[3].appendChild(createDiffSpan(diffWTotal));
          if(diffITotal != 0 || diffWTotal != 0) $('#lastcheck').style.display = "block";
          else $('#lastcheck').style.display = "none"; 
          var resetBtn = $c('button', {id:'resetBtn', textContent:tvp_100}, [{type:'click', fn:function() {if(confirm(tvp_103)) { setValue('DATA-' + user, jStringify(DATA)); setValue('lastDiffCheck-' + user, new Date().getTime().toString()); document.location.reload() } else { return }}}]);
          if(diffITotal != 0 || diffWTotal != 0) sum.firstChild.appendChild(resetBtn);
  } } } }

  function openCells(skipObs) {
    var rows = $('tr', styleTable);
    for (var i = 1; i < rows.length; i++) {
      if (skipObs) {
        if(!rows[i].hasAttribute('opened') && rows[i].className != 'obsolete') {
          var aRow = rows[i].children[1];
          rows[i].setAttribute('opened', 'true');
          aRow.children[1].className += ' loading';
          aRow.children[2].style.width = '0';
          aRow.children[1].style.width = '18px';
          fetchMeta(rows[i].id);
        } 
      } else {
        if (!rows[i].hasAttribute('opened')) {
          var aRow = rows[i].children[1];
          rows[i].setAttribute('opened', 'true');
          aRow.children[1].className += ' loading';
          aRow.children[2].style.width = '0';
          aRow.children[1].style.width = '18px';
          fetchMeta(rows[i].id);
  } } } }

  function hideURL() {
    var gvkw = getValue('keyWords'), kw = gvkw.split('<>'), listCnt = 0;
    var names = [], docItem = $('.url', styleTable), rows = $('tr', styleTable);
    if(gvkw == '') return;
    for(k = 0; k < kw.length; k++) names.push(kw[k]);
    for(var x in names)
    for(var i = 0; i < docItem.length; i++) {
      var word = new RegExp('\\b' + names[x] + '\\b', 'g');
      if(docItem[i].textContent.match(word)) {
        docItem[i].parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        docItem[i].parentNode.parentNode.parentNode.parentNode.setAttribute('filtered', 'true');
      } 
    }
    for(var i = 1; i < rows.length; i++) {
      if(rows[i].style.display == 'none') listCnt++;
      $('#filterCount').textContent = listCnt;
  } }

  function closeCells() {
    var rows = $('tr', styleTable);
    for (var i = 1; i < rows.length; i++) {
      if (rows[i].hasAttribute('opened')) {
        var aRow = rows[i].children[1];
        rows[i].removeAttribute('opened');
        aRow.removeChild(aRow.lastChild);
        aRow.children[2].style.width = '18px';
        aRow.children[1].style.width = '0';
  } } }

  if(metadata && auto) {
    var rows = $('tr', styleTable);
    for(var i = 1; i < rows.length; i++) {
      fetchMeta(rows[i].id);
        var aRow = rows[i].children[1];
        rows[i].setAttribute('opened', 'true');
        aRow.children[1].className += ' loading';
        aRow.children[2].style.width = '0';
        aRow.children[1].style.width = '18px';
  } }

  function fetchMeta(id) {
    xhr({
      method : 'GET',
      url    : 'http://userstyles.org/styles/' + id,
      onload : function(responseDetails) {
        if(responseDetails.status == 200) {
          var body = responseDetails.responseText.split(/<body[^>]*>((?:.|\n|\r)*)<\/body>/i);
          body = body[1].replace(/<script((?:.|\n|\r)*?)>((?:.|\n|\r)*?)<\/script>/g,'');
          var holder = $c('div', {innerHTML:body});
          holder.style.display = 'none';
          document.body.appendChild(holder);
          var row = $('#' + id);
          if(!row) {log('Unable to find row.'); return}
          row = row.children[1];
	     var loading = $('.loading', row, true);
	     if (loading) loading.setAttribute('class', 'metalink-close');
          var misc_info = $('#style-author-info');
          var author = $('.//a[contains(@href,"/users/")]', document, 1, misc_info);
          var more = $('.more', holder, 1);
          var affects = more ? $('a', more, 1).href.match(/browse\/(.*)/)[1] : 'N/A';
          var affectsurl = responseDetails.responseText.match(/<link\srel='stylish-example-url'\shref='(https?:\/\/[a-zA-Z0-9\.]+\/?).*'\/>/);
          var favicon = $c('img', {className:'metafavicon'});
          switch(affects.toLowerCase()) {
            case 'n/a': favicon.className += 'blank'; break;
            case 'app': favicon.className += 'app'; break;
            case 'global': favicon.className += 'global'; break;
            case 'userscripts.org': favicon.src = 'http://userscripts.org/images/script_icon.png'; break;
            default: favicon.src = affectsurl[1] + '/favicon.ico';
          }
          var meta = $c('div', {className:'meta'});
          var _screenshot = $('#screenshots');
          if(_screenshot) {
            if($('#main-screenshot')) {
              meta.appendChild(addPopup($c('a', {className:'metascreenmain', title:tvp_117, href:$('img', _screenshot, 1).src, target:'_blank'})));
            }
            if($('#more-screenshots')) {
              var screenshots = $('a', $('#more-screenshots'));
              for(var i = 0; i < screenshots.length; i++) {
                meta.appendChild(addPopup($c('a', {className:'metascreenmore', title:tvp_118, href:screenshots[i].href, target:'_blank'})));
        } } }
        var discussions = $('#discussions');
        if(discussions) {
          var good = $('.good-rating', discussions).length;
          var ok = $('.ok-rating', discussions).length;
          var bad = $('.bad-rating', discussions).length;
          var tot = $('li', discussions).length;
          meta.appendChild($c('div', {className:'metadiscussions', title:tot + ' Discussions (' + good + ' Good, ' + ok + ' Ok and ' + bad + ' Bad)'}));
        }
        var div = $c('div');
        div.appendChild(favicon);
        div.appendChild($c('span', {className:'url', textContent:affects}));
        var date_created = $('.//tr[3]/td[1]', document, 1, misc_info).textContent.trim();
        var date_updated = $('.//tr[4]/td[1]', document, 1, misc_info).textContent.trim();
        if(!onMyPage && onUserPage || onBrowsePage) {
          var dateA = tvp_119 + date_created;
          div.appendChild($c('span', {className:'date date3', textContent:dateA}));
        }
        if(onMyPage) {
          var dateA = tvp_119 + date_created;
          var dateB = tvp_120 + date_updated;
          div.appendChild($c('span', {className:'date date1', textContent:dateA}));
          div.appendChild($c('span', {className:'date date2', textContent:dateB}));
        }
        if(!onUserPage) div.appendChild($c('span', {className:'metauser', innerHTML:' by <a href="' + author.href + '">' + author.textContent + '</a>'}));
          meta.appendChild(div);
          row.appendChild(meta);
          holder.parentNode.removeChild(holder);
        } 
        hideURL();
      }
    });
  }

  var hidePopupTimeout = 0;
  var showPopupTimeout = 0;
  var source = null;
  var popupdiv = $c('div', {id:'popup_container'});

  if(popup) {
    popupdiv.addEventListener('mouseover', function(e) {window.clearTimeout(hidePopupTimeout); source = e.relatedTarget}, false);
    popupdiv.addEventListener('mouseout', function(){hidePopupTimeout = window.setTimeout(hidePopup, 50)}, false);
    popupdiv.addEventListener('click', function() {hidePopup()}, false);
    document.body.appendChild(popupdiv);
    function addPopup(el) {
      if(!popup) return el;
      el.addEventListener('mouseover', function(e) {
        if(e.relatedTarget != source) window.clearTimeout(hidePopupTimeout);
        showPopupTimeout = window.setTimeout(function() {showPopup(e, el.href)},250);
      }, false);
      el.addEventListener('mouseout', function(e) {hidePopupTimeout = window.setTimeout(hidePopup, 50)}, false);
      return el;
  } }

  if(!popup) {
    popupdiv.addEventListener('click', function() {hidePopupTimeout = window.setTimeout(hidePopup, 50)}, false);
    popupdiv.addEventListener('mouseout', function() {hidePopup()}, false);
    document.body.appendChild(popupdiv);
    function addPopup(el) {
      el.addEventListener('click', function(e) { 
        if(e.relatedTarget != source) window.clearTimeout(hidePopupTimeout);
        showPopupTimeout = window.setTimeout(function() {showPopup(e, el.href)}, 250);
      }, false);
      el.addEventListener('mouseup', function() {return el}, false);
      el.addEventListener('click', function(e) {e.preventDefault(); return el; hidePopupTimeout = window.setTimeout(hidePopup, 50)}, false);
      return el;
  } }

  function showPopup(e, src) {
    var popup = $('#popup_container');
    if(!popup) debug('Unable to find Popup Picture Container.');
    popup.className = (e.pageX > document.body.clientWidth/2) ? 'popup_left' : 'popup_right';
    popup.style.display = 'block';
    popup.innerHTML = '<img src="' + src + '" alt="Loading Screenshot..." style="max-height:' + (window.innerHeight-22) + 'px; max-width:' + (window.innerWidth - 42) + 'px; margin: 2px;">';
  }

  function hidePopup() {
    window.clearTimeout(showPopupTimeout);
    $('#popup_container').style.display = 'none';
  }

  if(hideObsolete) {
    setObs();
  }

  var colIndex = 0;

  function sortTable(source) {
    var table = source;
    while(table.nodeName.toLowerCase() != 'table') {table = table.parentNode}
    var newRows = [];
    for(var i = 0; i < table.rows.length - 1; i++) {newRows[i] = table.rows[i + 1]}
    if(colIndex == source.cellIndex) newRows.reverse();
    else {
      colIndex = source.cellIndex;
      var cell = table.rows[1].cells[colIndex].textContent.toCustNum();
      if(colIndex == 4) newRows.sort(sortD);
      else if(colIndex == 5) newRows.sort(sortR);
      else if(!isNaN(cell)) newRows.sort(sortF);
      else newRows.sort(sortT);
      if(sortdir == 'desc') newRows.reverse();
    }
    function sortD(a, b) {
      var _a = new Date(a.cells[4].textContent.replace(' \u00A0 ', '0 0 0'));
      var _b = new Date(b.cells[4].textContent.replace(' \u00A0 ', '0 0 0'));
      if(_a < _b) return -1;
      if(_a > _b) return 1;
      return sortR(a, b);
    }
    function sortR(a, b) {
      var res = parseFloat(a.cells[5].getAttribute('rating')) - parseFloat(b.cells[5].getAttribute('rating'));
      if(res == 0) res = a.cells[2].textContent.toCustNum() - b.cells[2].textContent.toCustNum();
      if(res == 0) res = a.cells[3].textContent.toCustNum() - b.cells[3].textContent.toCustNum();
      return res;
    }
    function sortF(a, b) {
      var res = a.cells[colIndex].textContent.toCustNum() - b.cells[colIndex].textContent.toCustNum();
      if(res == 0) {
        var index = (colIndex == 2) ? 3 : 2;
        res = a.cells[index].textContent.toCustNum() - b.cells[index].textContent.toCustNum();
      }
      if(res == 0) res = sortR(a, b);
      return res;
    }
    function sortT(a, b) {
      a = a.cells[colIndex].textContent.toLowerCase();
      b = b.cells[colIndex].textContent.toLowerCase();
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    }
    for(var i = 0; i < newRows.length; i++) {table.appendChild(newRows[i])}
  }

  var ddd = $('DD');
  for(var i = 0; i < ddd.length; i++) 
  if(ddd[i].innerHTML.indexOf('href="') != -1) ddd[i].style.display = 'block';
  else ddd[i].style.display = 'none';

  if(!sizemode) {
    var tableWidth = $('#table-container').clientWidth;
    addStyle('div.pagination{width:'+tableWidth+'px!important}');
  }

  function perPage() {
    var gvkw = getValue('keyWords');
    if(gvkw != '') hideItem();
    var docURL = document.URL, sel = $('#sel').value;
    if(docURL.indexOf('per_page') > 0) {
      var pf = parseFloat(docURL.split('per_page=')[1]);
      if(sel == '') sel = '10';
      if(sel > 200) {alert('Maximum entry is 200'); sel = '200';}
      if(pf == sel) return;
      document.location = docURL.replace(/per_page=[0-9]+/, 'per_page=' + sel);
    } 
    if(docURL.indexOf('per_page') < 0 && docURL.indexOf('?') > 0 ) {
      var split0 = docURL.split('?')[0], split1 = docURL.split('?')[1];
      document.location = split0 + '?per_page=' + sel + '&' + split1;
    }
    if(docURL.indexOf('?') < 0) document.location = docURL + '?per_page=' + sel;
    setValue('perPageCount', sel);
  }

  function hideItem() {
    var gvkw = getValue('keyWords');
    var names = [], docItem = $('tr', styleTable), kw = gvkw.split('<>'), listCnt = 0;
    for(k = 0; k < kw.length; k++) names.push(kw[k]);
    for(var x in names)
    for(var i = 1; i < docItem.length; i++) {
      var word = new RegExp('\\b' + names[x] + '\\b', 'g');
      if(docItem[i].childNodes[1].textContent.match(word)) {
        docItem[i].childNodes[1].parentNode.style.display = 'none';
        docItem[i].childNodes[1].parentNode.setAttribute('filtered', 'true');
    } }
    for(var i = 1; i < docItem.length; i++) {
      if(docItem[i].style.display == 'none') listCnt++;
      $('#filterCount').textContent = listCnt;
    } 
    hideURL();
    $('#labelGroup').title = getValue('keyWords');
    $('#showB').title = getValue('keyWords');
  }

  if(hideObsolete || onMyPage) setObs();

  function setObs() {
    if(onMyPage) {
      var btnObs = $('#obsBtn');
      if(getValue('hideObsolete')) {
        for(var i = 0; i < styleTable.childElementCount; i++)
        if(styleTable.children[i].className == 'obsolete') styleTable.children[i].style.display = 'none';
        btnObs.title = tvp_42;
        btnObs.style.backgroundColor = '#900';
        btnObs.style.borderColor = '#900';
      } else {
        for(var i = 0; i < styleTable.childElementCount; i++)
        if(styleTable.children[i].className == 'obsolete') styleTable.children[i].style.display = 'table-row';
        btnObs.title = tvp_25;
        btnObs.style.backgroundColor = '#090';
        btnObs.style.borderColor = '#090';
  } } }

  function toggleObs() {
    var xxx = getValue('hideObsolete') != false ? false : true;
    setValue('hideObsolete', xxx);
    setObs();
  }

  if(filter) {
    if(!onMyPage) {
        var filterBlk = $c('div', {id:'filter-block'});
        var wordDiv = $c('div', {id:'wordDiv'});
        var fltGroup = $c('div', {id:'filterGroup'});
        var inp = $c('input', {id:'wordIn', title:tvp_46}, [{type:'click', fn:function(e) {getKey(e)}}]);
        var okBtn = $c('button', {id:'okB', textContent:tvp_49, title:tvp_50}, [{type:'click', fn:function(e) {genKey(); e.preventDefault()}}]);
        var sg = $c('td', {id:'labelGroup', title:getValue('keyWords') ? getValue('keyWords') : tvp_69});
        var cnt = $c('label', {id:'labCnt', textContent:tvp_52})
        var spn = $c('label', {id:'filterCount', textContent:'0'});
        var remBtn = $c('button', {id:'remB', textContent:tvp_51, title:tvp_68}, [{type:'click', fn:function(e) {remKey(); e.preventDefault()}}]);
        var showBtn = $c('button', {id:'showB', textContent:tvp_47, title:getValue('keyWords') ? getValue('keyWords') : tvp_69}, [{type:'click', fn:function(e) {showItem(e)}}]);
        var ppGroup = $c('div', {id:'perPageGroup'});
        var selLabel = $c('label', {id:'selLab', textContent:tvp_44})
        var selInput = $c('input', {id:'sel', maxlength:'3'}, [{type:'blur', fn:function() {perPage()}}]);
        ppGroup.appendChild($c('label', {id:'fb-label', textContent:tvp_13}));
        ppGroup.appendChild(selLabel);
        ppGroup.appendChild(selInput);
        filterBlk.appendChild(ppGroup);
        wordDiv.appendChild(okBtn);
        wordDiv.appendChild(inp);
        filterBlk.appendChild(wordDiv);
        fltGroup.appendChild(showBtn);
        sg.appendChild(cnt);
        sg.appendChild(spn);
        fltGroup.appendChild(sg);
        fltGroup.appendChild(remBtn);
        filterBlk.appendChild(fltGroup);
        ltsb.appendChild(filterBlk);
        if(getValue('keyWords') == '') {
          $('#showB').setAttribute('style', 'opacity:.3;pointer-events:none');
          $('#remB').setAttribute('style', 'opacity:.3;pointer-events:none');
        } else {
          $('#showB').setAttribute('style', 'opacity:1;pointer-events:all');
          $('#remB').setAttribute('style', 'opacity:1;pointer-events:all');
        }
        $('#sel').value = getValue('perPageCount');
        perPage();
  } }

  if(filter) {
    ltsb.insertBefore($('#filter-block'), $('#btnCont'));
    $('#style-table').addEventListener('mouseup', getActiveText, false);
    $('#wordIn').addEventListener('dblclick', function() {$('#wordIn').value = ''}, false);
  } else {
    $('#style-table').removeEventListener('mouseup', getActiveText, false);
    $('#wordIn').removeEventListener('dblclick', function() {$('#wordIn').value = ''}, false);
  }

  function getActiveText() {
    var getText = '', wdIn = $('#wordIn');
    getText = getSelection().toString();
    if(getText != '') {
      if(wdIn.value == '') wdIn.value = getText.trim();
      else wdIn.value = wdIn.value + '<>' + getText.trim();
    }
    return;
  }

  if(onBrowsePage) {
    $('#search-options').style.display = 'block';
    $('#show-search-options').textContent = 'Hide options';  
  }

  if(filter) {
    if(onStylePage || onBrowsePage) {
      var gvkw = getValue('keyWords');
      var names = [], docItem = $('tr', styleTable), kw = gvkw.split('<>'), listCnt = 0;
      for(k = 0; k < kw.length; k++) names.push(kw[k]);
      for(var x in names)
      for(var i = 0; i < docItem.length; i++) {
        var word = new RegExp("\\b" + names[x] + "\\b", "g");
        if(docItem[i].childNodes[1].textContent.match(word)) docItem[i].childNodes[1].parentNode.style.display = 'none';
        if(docItem[i].childNodes[1].textContent.toLowerCase().match(word)) docItem[i].childNodes[1].parentNode.style.display = 'none';
      } 
      for(var i = 0; i < docItem.length; i++) {
        if(docItem[i].style.display == 'none') listCnt++;
        $('#filterCount').textContent = listCnt;
  } } }

  if(filter && getValue('keyWords') == '') return;

  function getKey(e) {
    if(e.button == 1) $('#wordIn').value = getValue('keyWords');
  } 

  function showItem(e) {
    if(getValue('keyWords') == '') return;
    if(e.target.textContent == tvp_48) {
      hideItem();
      e.target.textContent = tvp_47;
      return;
    }
    var docItem = $('tr', styleTable); 
    for(var i = 1; i < docItem.length; i++) 
      if(docItem[i].style.display == 'none') {
        docItem[i].removeAttribute("style");
        docItem[i].style.background = tvp_74;
      }
    e.target.textContent = tvp_48;
  }

  function genKey() {
    var wi = $('#wordIn');
    if(wi.value == '') return;
    var gvkw = getValue('keyWords');
    if(gvkw == '') setValue('keyWords', wi.value);
    else setValue('keyWords', gvkw + '<>' + wi.value);
    wi.value = '';
    $('#showB').setAttribute('style', 'opacity:1;pointer-events:all');
    $('#remB').setAttribute('style', 'opacity:1;pointer-events:all');
    hideItem();
  }

  function remKey(e) {
    var wi = $('#wordIn');
    if(wi.value == '') return;
    var names = [], undo = [];
    var kw = getValue('keyWords').split('<>'), kwu = wi.value.split('<>');
    for(k = 0; k < kw.length; k++) names.push(kw[k]);
    for(i = 0; i < kwu.length; i++) undo.push(kwu[i]);
    var Array1 = names, Array2 = undo;
    for (var i = 0; i < Array2.length; i++) {
      var arrlen = Array1.length;
      for (var j = 0; j < arrlen; j++)
      if (Array2[i] == Array1[j]) Array1 = Array1.slice(0, j).concat(Array1.slice(j+1, arrlen));
    }
    var newStr = Array1.toString();
    newStr = newStr.replace(/,/g, '<>');
    if(newStr.indexOf('<>') == 0) newStr = newStr.substring(2, newStr.length);
    setValue('keyWords', newStr);
    wi.value = '';
    //document.location.reload();
    content.location.reload();
  }

})();