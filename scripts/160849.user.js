// ==UserScript==
// @name          Table View Plus
// @version       4.0.9
// @description   Enhancement suite for the Userstyles.org site
// @author        Sonny ali
// @namespace     abbas
// @license       CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include       http://userstyles.org*
// @homepage	  http://userscripts.org/scripts/show/100937
// @updateURL	  https://userscripts.org/scripts/source/100937.meta.js
// @downloadURL	  https://userscripts.org/scripts/source/100937.user.js
// ==/UserScript==
// ============================================================
// ********************** CUSTOMIZE TEXT **********************
// ============================================================
// *** LEFT SIDEBAR *********************************************
var tvp_14 = 'Table Options';
var tvp_10 = 'Migrate acct. to OpenID';
var tvp_72 = 'Discussions on my styles';
var tvp_78 = 'Create widget for styles';
var tvp_75 = '';
var tvp_12 = 'Style options';
var tvp_13 = 'Table Filter:';
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
// *** TABLE OPTIONS POPUP MENU ****************************
var tvp_0 = 'Userstyles.org Table View Preferences';
var tvp_1 = 'Default sort direction for table';
var tvp_2 = 'Auto fetch metadata on page load';
var tvp_4 = 'Enable Metadata Fetcher';
var tvp_5 = 'Metadata previews on hover (Default click)';
var tvp_70 = 'Hide Social and Donate tags';
var tvp_80 = 'Show Hidden Metadata on Styles Page';
var tvp_81 = 'Enable Brown/Tan Theme';
var tvp_82 = 'Show Table Filter in Sidebar';
var tvp_83 = 'Show Nav Links in Sidebar';
var tvp_90 = 'Sidebar Width Value';
var tvp_91 = 'Content Margin Left Value';
var tvp_92 = 'Table Width Value';
var tvp_93 = 'Enable Sidebar, Content and Table Size Mode';
var tvp_94 = ':Size Mode';
// *** TABLE STYLES ****************************************
var tvp_74 = '#FFEDED';  // Disabled items background color
// *** TABLE SUMMARY STATS *********************************
var tvp_58 = 'Total Installs:';
var tvp_59 = 'Weekly Total:';
var tvp_60 = 'Ratings:';
var tvp_61 = 'Good';
var tvp_62 = 'Ok';
var tvp_63 = 'Bad';
// *** TABLE HEADER COLUMNS ********************************
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
// *** TABLE METADATA ROWS *********************************
var tvp_40 = 'Created on ';
var tvp_41 = 'Updated on ';
var tvp_64 = ' by ';
// *** TABLE TOOLTIPS **************************************
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
// *** OWN PAGE AND STYLES PAGE ****************************
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
    const LOG_PREFIX = 'Table View Plus: ';
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
  } }
  if(typeof devtools=='undefined'){var devtools={};}if(typeof devtools.JSON=='undefined'){devtools.JSON={};devtools.JSON.stringify=function(obj){obj=JSON.stringify(obj);return obj.replace(/"/g,'!~dq~!').replace(/'/g,'!~sq~!');};devtools.JSON.parse=function(str){str=str.replace(/!~dq~!/g,'"').replace(/!~sq~!/g,"'");return JSON.parse(str);};}devtools.dialog={open:function(options,id){this.__setVars(options);if(!id){id=(new Date()).getTime();}this.__var.lastDialogId=id;var wrapper=document.getElementById('devtools-wrapper');if(!wrapper){wrapper=document.createElement('div');wrapper.id='devtools-wrapper';wrapper.innerHTML='<div class="grid">'+'<div id="devtools-cell-topleft" class="dialog-wrapper top left"></div>'+'<div id="devtools-cell-top" class="dialog-wrapper top"></div>'+'<div id="devtools-cell-topright" class="dialog-wrapper top right"></div>'+'<div id="devtools-cell-left" class="dialog-wrapper left"></div>'+'<div id="devtools-cell-center" class="dialog-wrapper center"></div>'+'<div id="devtools-cell-right" class="dialog-wrapper right"></div>'+'<div id="devtools-cell-bottomleft" class="dialog-wrapper bottom left"></div>'+'<div id="devtools-cell-bottom" class="dialog-wrapper bottom"></div>'+'<div id="devtools-cell-bottomright" class="dialog-wrapper bottom right"></div>'+'</div>';document.body.appendChild(wrapper);wrapper=document.getElementById('devtools-wrapper');this.__handleHooks();}wrapper.className=(this.__setting.mask)?'mask':'';var dialog=document.getElementById('devtools-dialog-'+id);if(!dialog||dialog.parentNode.id!=='devtools-cell-'+this.__setting.location.replace('-','')){if(dialog){dialog.parentNode.removeChild(dialog);}dialog=document.createElement('div');dialog.id='devtools-dialog-'+id;dialog.className='dialog'+((this.__setting.class&&this.__setting.class!='')?' '+this.__setting.class:'');dialog.innerHTML='<div class="dialog-close"><span>X</span></div>'+'<div class="dialog-title"><span></span></div>'+'<div class="dialog-content"></div>'+'<div class="dialog-footer"></div>';wrapper.querySelector('#devtools-cell-'+this.__setting.location.replace('-','')).appendChild(dialog);dialog=document.getElementById('devtools-dialog-'+id);dialog.querySelector('.dialog-close').addEventListener('click',function(){devtools.dialog.close(this.parentNode.getAttribute('id').replace(/^devtools-dialog-/,''));},false);}dialog.querySelector('.dialog-close').style.display=(this.__setting.closeButton)?'block':'none';dialog.querySelector('.dialog-title').firstElementChild.textContent=this.__setting.title;dialog.querySelector('.dialog-content').innerHTML=this.__parseTokens(this.__setting.message);dialog.querySelector('.dialog-footer').textContent='';var button,buttonImg,i;for(i=0;i<this.__setting.buttons.length;i++){button=document.createElement('button');button.textContent=this.__setting.buttons[i].text;button.setAttribute('data-devtools-dialog-button',this.__setting.buttons[i].text);if(this.__setting.buttons[i].icon){buttonImg=document.createElement('img');buttonImg.setAttribute('src',this.__setting.buttons[i].icon);buttonImg.setAttribute('alt','');button.insertBefore(buttonImg,button.firstChild);}if(typeof this.__setting.buttons[i].tooltip=='string'){button.setAttribute('title',this.__setting.buttons[i].tooltip);}button.addEventListener('click',this.__setting.buttons[i].callback,false);dialog.querySelector('.dialog-footer').appendChild(button);}var style=document.getElementById('devtools-dialog-style');if(!style||style.className!=this.__setting.theme){if(style){style.parentNode.removeChild(style);}style=document.createElement('style');style.id='devtools-dialog-style';style.className=this.__setting.theme;style.setAttribute('type','text/css');style.textContent=this.__themes[this.__setting.theme].finalcss||(this.__themes._base.css+'\n'+this.__themes[this.__setting.theme].css);document.querySelector('head').appendChild(style);}return id;},close:function(id){if(!id){if(!this.__var.lastDialogId){return false;}id=this.__var.lastDialogId;}var dialog=document.getElementById('devtools-dialog-'+id);if(!dialog){return false;}else{dialog.querySelector('.dialog-close').removeEventListener('click',function(){devtools.dialog.close(this.parentNode.getAttribute('id').replace(/^devtools-dialog-/,''));},false);var inputs=this.getInputs(id);dialog.parentNode.removeChild(dialog);}if(document.querySelector('div[id*="devtools-dialog-"]')==null){var wrapper=document.getElementById('devtools-wrapper');wrapper.parentNode.removeChild(wrapper);var styles=document.querySelectorAll('head style[id^="devtools-dialog-theme-"]');for(var i=0;i<styles.length;i++){styles[i].parentNode.removeChild(styles[i]);}}return inputs;},setDefaults:function(options){this.__userDefaults={};for(var i in options){if(this.__defaults.hasOwnProperty(i)){this.__userDefaults[i]=options[i];}}},defineToken:function(tag,attributes,replacement){if(typeof tag!='string'||/^\w+$/.test(tag)===false){return false;}if(typeof this.__tokens[tag]!='undefined'){return false;}if(typeof attributes=='object'&&attributes!=null){for(var a in attributes){if(!attributes.hasOwnProperty(a)){continue;}if(typeof attributes[a].validation=='undefined'){return false;}}}else{attributes={};}if(typeof replacement!='function'&&typeof replacement!='string'){return false;}this.__tokens[tag]={attributes:attributes,replacement:replacement};return true;},defineTheme:function(name,css,base){if(typeof name!='string'||typeof css!='string'){return false;}if(!/^\w+$/.test(name)||name=='default'){return false;}var cssOut='';var bases={};var baseTmp=base;if(typeof base=='string'){for(var i=0;i<5;i++){if(this.__themes[baseTmp]&&!bases[baseTmp]){cssOut='/* devtools.dialog prerequisite theme: '+baseTmp+' */\n'+this.__themes[baseTmp].css+'\n\n'+cssOut;bases[baseTmp]=true;baseTmp=this.__themes[baseTmp].base;}else{break;}}}else{base=null;}cssOut=('/* devtools.dialog base reset */\n'+this.__themes._base.css+"\n\n"+cssOut+'/* devtools.dialog theme: '+name+' */\n'+css).replace('%theme%',name);this.__themes[name]={base:base,finalcss:cssOut,css:css};return true;},defineHook:function(name,func){if(typeof this.__hooks[name]!='undefined'||typeof func!='function'){return false;}this.__hooks[name]=func;return true;},getInputs:function(id){if(!id){if(!this.__var.lastDialogId){return false;}id=this.__var.lastDialogId;}var dialog=document.querySelector('#devtools-dialog-'+id);if(dialog){var out={},i,j;var simpleInputs=dialog.querySelectorAll('[data-devtools-input="text"], [data-devtools-input="select"]');for(i=0;i<simpleInputs.length;i++){out[simpleInputs[i].getAttribute('name')]=simpleInputs[i].value;}var checkboxInputs=dialog.querySelectorAll('[data-devtools-input="checkbox"]');for(i=0;i<checkboxInputs.length;i++){out[checkboxInputs[i].getAttribute('name')]=(checkboxInputs[i].checked)?true:false;}var radioInputs=dialog.querySelectorAll('[data-devtools-input="radio"]');var radios;for(i=0;i<radioInputs.length;i++){radios=radioInputs[i].querySelectorAll('input');for(j=0;j<radios.length;j++){if(radios[j].checked){out[radios[j].getAttribute('name').split('-')[0]]=radios[j].value;break;}}}return out;}return false;},__var:{lastDialogId:false},__defaults:{title:'Script Notification',message:'This is a dialog from a userscript.',mask:true,closeButton:true,location:'center',buttons:null,theme:'default',class:''},__settingsValidation:{title:['type','string'],message:['type','string'],mask:['type','boolean'],closeButton:['type','boolean'],location:['match',/^(top-left|top|top-right|left|center|right|bottom-left|bottom|bottom-right)$/],buttons:null,theme:null,class:['match',/^[\w- ]+$/]},__themes:{'_base':{css:'#devtools-wrapper,#devtools-wrapper *{border-radius:0!important;box-shadow:none!important;background:transparent!important;border:none!important;border-collapse:separate!important;border-spacing:0!important;color:#000!important;float:none!important;font-family:Arial,sans-serif!important;font-size:12px!important;font-weight:400;height:auto!important;letter-spacing:normal!important;line-height:18px!important;margin:0!important;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:1.0!important;padding:0!important;text-align:left!important;text-decoration:none!important;text-shadow:none!important;text-transform:none!important;vertical-align:middle!important;visibility:hidden!important;white-space:normal!important;width:auto!important;}#devtools-wrapper .dialog-content fieldset>label>input{position:relative;top:0}'+'#devtools-wrapper{background-color:rgba(0, 0, 0, 0.8)!important;display:block!important;height:100%!important;left:0!important;overflow:auto!important;position:fixed!important;top:0!important;visibility:hidden!important;width:100%!important;z-index:2147483640!important;}'+'#devtools-wrapper.mask{background-color:rgba(0, 0, 0, 0.8)!important;visibility:visible!important;}'+'#devtools-wrapper .grid{display:table!important;height:100%!important;position:fixed!important;visibility:hidden!important;width:100%!important;}'+'#devtools-wrapper .center,#devtools-wrapper .top,#devtools-wrapper .bottom,#devtools-wrapper .left,#devtools-wrapper .right{display:table-cell!important;padding:15px!important;}'+'#devtools-wrapper .left,#devtools-wrapper .center,#devtools-wrapper .right{vertical-align:middle!important;}'+'#devtools-wrapper .top{vertical-align:top!important;}'+'#devtools-wrapper .bottom{vertical-align:bottom!important;}'+'#devtools-wrapper .left .dialog{clear:both!important;float:left!important;}'+'#devtools-wrapper .right .dialog{clear:both!important;float:right!important;}'+'#devtools-wrapper .center .dialog,#devtools-wrapper .bottom .dialog,#devtools-wrapper .top .dialog{margin-left:auto!important;margin-right:auto!important;}'+'#devtools-wrapper .dialog,#devtools-wrapper .dialog *{visibility:visible!important;}'+'#devtools-wrapper .dialog fieldset{border:1px solid #000!important;margin-bottom:10px!important;padding:5px!important;}'+'#devtools-wrapper .dialog legend{padding:0 5px!important;}'+'#devtools-wrapper .dialog input[type="text"],#devtools-wrapper input[type="password"],#devtools-wrapper textarea,#devtools-wrapper select{box-sizing:border-box!important;background-color:#fff!important;border:1px solid #000!important;box-sizing:border-box!important;padding:2px!important;width:100%!important;}'+'#devtools-wrapper .dialog input[type="checkbox"],#devtools-wrapper input[type="radio"]{margin-right:6px!important;vertical-align:top!important;}'+'#devtools-wrapper .dialog input[type="radio"]+span{margin-right:12px!important;vertical-align:middle!important;}'+'#devtools-wrapper .dialog .progress-bar{box-sizing:border-box!important;background-color:#fff!important;border:1px solid #000!important;box-sizing:border-box!important;height:20px!important;margin-left:auto!important;margin-right:auto!important;overflow:hidden!important;position:relative!important;width:100%!important;}'+'#devtools-wrapper .dialog .progress-bar-inner{background-color:#000!important;height:100%!important;left:0!important;position:absolute!important;top:0!important;}'+'#devtools-wrapper .dialog .progress-bar-text{height:100%!important;position:relative!important;text-align:center!important;width:100%!important;z-index:1!important;}'+'#devtools-wrapper .dialog .dialog-content br:first-child, #devtools-wrapper .dialog .dialog-content br:last-child{display:none!important;}'+'#devtools-wrapper .dialog strong{font-weight:bold!important;}'+'#devtools-wrapper .dialog em{font-style:italic!important;}'+'#devtools-wrapper .dialog ins{text-decoration:underline!important;}'+'#devtools-wrapper .dialog a:link,#devtools-wrapper .dialog a:hover{color:EE0000!important;text-decoration:underline!important;}'+'#devtools-wrapper .dialog a:visited{color:#74198b!important;}'},'default':{css:'#devtools-wrapper .dialog{border-radius:10px!important;box-shadow:0 0 50px #000!important;background-color:#eee !important;margin-bottom:5px!important;margin-top:5px!important;padding:5px!important;position:relative!important;width:310px!important;}'+'#devtools-wrapper .dialog .dialog-close span{color:#eee!important;font-size:18px!important;font-weight:700;line-height:25px!important;vertical-align:middle!important;}'+'#devtools-wrapper .dialog .dialog-close:hover{border-color:orange!important;}'+'#devtools-wrapper .dialog .dialog-close:hover span{color:orange!important;}'+'#devtools-wrapper .dialog .dialog-title{border-radius:5px!important;background-color:#444!important;color:#eee!important;height:15px!important;padding:4px 0 7px 0!important;text-align:center!important}'+'#devtools-wrapper .dialog .dialog-title span{color:#eee!important;font-size:14px!important;font-weight:700;}'+'#devtools-wrapper .dialog .dialog-content{color:#000!important;margin:10px 5px!important;max-width:100%!important;}'+'#devtools-wrapper .dialog .dialog-footer{text-align:center!important;width:100%!important;}'+'#devtools-wrapper .dialog .dialog-footer button{border-radius:10px!important;background-color:#444!important;color:#eee!important;cursor:pointer!important;display:inline-block!important;height:25px!important;margin-left:2px!important;margin-right:2px!important;padding:0 5px!important;}'+'#devtools-wrapper .dialog .dialog-footer button:hover{background-color:orange!important;color:#444!important;}'+'#devtools-wrapper .dialog .dialog-footer button img{margin-right:3px!important;vertical-align:top!important;}'+'#devtools-wrapper .dialog hr{background-color:#ddd!important;margin:7px 0 7px 0!important;padding:0.5px!important;}'+'#devtools-wrapper .dialog fieldset{border-radius:4px!important;border:1px solid #aaa!important}'+'#devtools-wrapper .dialog label{-moz-box-align:center!important;display:block!important;font-weight:bold!important;}'+'#devtools-wrapper .dialog label span{font-weight:normal!important;position:relative!important;top:-3px!important}'+'#devtools-wrapper .dialog legend{font-weight:bold!important;}'+'#devtools-wrapper .dialog input[type="text"],#devtools-wrapper input[type="password"],#devtools-wrapper textarea,#devtools-wrapper select{border-radius:4px!important;background-color:#fafafa!important;border:1px solid #ddd!important}'+'#devtools-wrapper .dialog input[type="text"]:focus,#devtools-wrapper input[type="password"]:focus,#devtools-wrapper textarea:focus,#devtools-wrapper select:focus{border:1px solid #444!important;}'+'#devtools-wrapper .dialog input[type="checkbox"] label{display:block!important;}'+'#devtools-wrapper .dialog .progress-bar{border-radius:5px!important;background-color:#fafafa!important;border:1px solid #ddd!important}'+'#devtools-wrapper .dialog .progress-bar-inner{border-radius:5px!important;background-color:#444!important}'+'#devtools-wrapper .dialog .progress-bar-text{text-shadow:#f2f2f2 -1px 0 3px #f2f2f2 0 -1px 3px #f2f2f2 1px 0 3px #f2f2f2 0 1px 3px #f2f2f2 -1px -1px 3px #f2f2f2 1px 1px 3px!important;}#devtools-wrapper .dialog-content div:nth-child(2) label span{position:relative!important;top:0!important}#devtools-wrapper .dialog-content>div:nth-child(2)>label>span{position:relative!important;top:-3px!important}'}},__tokens:{'progressbar':{attributes:{'percent':{defaultValue:'',validation:/^(100|\d{1,2})$/},'calculate':{defaultValue:'',validation:/^\s*\d+\s*\/\s*\d+\s*$/}},replacement:function(tag){var p;if(tag.attributes.calculate!=''){p=/^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(tag.attributes.calculate);if(p){p=(p[1]/p[2])*10000;p=Math.round(p)/100;}else{p=0;}}else if(tag.attributes.percent!=''){p=tag.attributes.percent;}else{return false;}if(p>100){p=100;}if(p<0){p=0;}p+='%';return'<div class="progress-bar"><div class="progress-bar-text">'+p+'</div><div class="progress-bar-inner" style="width: '+p+' !important;"></div></div>';}},'input':{attributes:{'type':{validation:/^(text|textarea|radio|checkbox|select|password|button)$/},'name':{validation:/^\w+$/},'label':{defaultValue:'',validation:false},'options':{defaultValue:'',validation:/^{.+}$/},'defaultValue':{defaultValue:'',validation:false},'hook':{defaultValue:'',validation:/^\w+$/}},replacement:function(tag){var r=false;switch(tag.attributes.type){case 'text':r='<label>'+tag.attributes.label+'<input type="text" name="'+tag.attributes.name+'" value="'+tag.attributes.defaultValue+'" data-devtools-input="text"/></label>';break;case 'password':r='<label>'+tag.attributes.label+'<input type="password" name="'+tag.attributes.name+'" value="'+tag.attributes.defaultValue+'" data-devtools-input="text"/></label>';break;case 'textarea':r='<label>'+tag.attributes.label+'<textarea name="'+tag.attributes.name+'" data-devtools-input="text">'+tag.attributes.defaultValue+'</textarea></label>';break;case 'checkbox':r='<div><label><input type="checkbox" name="'+tag.attributes.name+'"'+((tag.attributes.defaultValue=='true')?' checked':'')+' data-devtools-input="checkbox"/><span>'+tag.attributes.label+'</span></label></div>';break;case 'radio':try{var options=devtools.JSON.parse(tag.attributes.options);var hash=Math.floor(Math.random()*100000);r='<div data-devtools-input="radio"><fieldset><legend>'+tag.attributes.label+'</legend>';for(var key in options){r+='<label><input type="radio" name="'+tag.attributes.name+'-'+hash+'" value="'+options[key]+'"';r+=((tag.attributes.defaultValue==options[key])?' checked':'')+'/><span>'+key+'</span></label>';}r+='</fieldset></div>';}catch(e){return false;}break;case 'select':try{var options=devtools.JSON.parse(tag.attributes.options);r='<div><label>'+tag.attributes.label+'</label>';r+='<select name="'+tag.attributes.name+'"'+((tag.attributes.hook=='color')?' data-devtools-hook="'+tag.attributes.hook+'"':'')+' data-devtools-input="select">';for(var key in options){if(typeof options[key]=='string'){r+='<option value="'+options[key]+'"';r+=(tag.attributes.hook=='color'&&/^#[0-9a-f]{3,6}$/i.test(options[key]))?' style="background-color:'+options[key]+' !important;"':'';r+=((tag.attributes.defaultValue==options[key])?' selected':'')+'>'+key+'</option>';}}r+='</select></div>';}catch(e){return false;}break;}return r;}}},__hooks:{'color':function(){var el=document.querySelectorAll('[data-devtools-hook="color"]');if(!el){return;}setInterval(function(){var el=document.querySelectorAll('[data-devtools-hook="color"]');if(el){for(var i=0;i<el.length;i++){if(/^#[0-9a-f]{3,6}$/i.test(el[i].value)){el[i].setAttribute('style','background-color: '+el[i].value+' !important');}}}},500);}},__userDefaults:{},__setting:{},__handleHooks:function(){for(var hook in this.__hooks){this.__hooks[hook]();}},__setVars:function(options){this.__setting={};var out=this.__copyObj(this.__defaults);var setting,validationCopy,validationCount,valid;for(setting in this.__userDefaults){if(this.__defaults.hasOwnProperty(setting)){out[setting]=this.__copyObj(this.__userDefaults[setting]);}}if(typeof options=='object'){for(setting in options){if(this.__defaults.hasOwnProperty(setting)){out[setting]=options[setting];}}}for(setting in out){if(setting=='buttons'){this.__setting[setting]=this.__validateButtons(out[setting]);continue;}if(setting=='theme'){this.__setting[setting]=this.__validateTheme(out[setting]);continue;}if(this.__settingsValidation.hasOwnProperty(setting)){validationCopy=this.__copyObj(this.__settingsValidation[setting]);valid=false;switch(validationCopy.shift()){case 'type':for(validationCount=0;validationCount<validationCopy.length;validationCount++){if(validationCopy[validationCount]=='array'){if(out[setting]instanceof Array){valid=true;this.__setting[setting]=out[setting];break;}else if(this.__userDefaults[setting]instanceof Array){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}else if(typeof out[setting]==validationCopy[validationCount]){valid=true;this.__setting[setting]=out[setting];break;}else if(typeof this.__userDefaults[setting]==validationCopy[validationCount]){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}break;case 'match':for(validationCount=0;validationCount<validationCopy.length;validationCount++){if(validationCopy[validationCount].test(out[setting])){valid=true;this.__setting[setting]=out[setting];break;}else if(validationCopy[validationCount].test(this.__userDefaults[setting])){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}break;}if(!valid){this.__setting[setting]=this.__copyObj(this.__defaults[setting]);}}}},__validateButtons:function(buttons){var btns=[];if(typeof buttons=='object'&&buttons instanceof Array){var btnNum,btnAttr,o;button:for(btnNum=0;btnNum<buttons.length;btnNum++){if(typeof buttons[btnNum]!='object'){continue button;}for(btnAttr in buttons[btnNum]){o=buttons[btnNum][btnAttr];switch(btnAttr){case 'text':if(typeof o!='string'){o='';}break;case 'tooltip':if(typeof o!='string'){o=false;}break;case 'icon':if(typeof o!='string'){o=false;}break;case 'callback':if(typeof o!='function'){continue button;}break;}}btns.push(buttons[btnNum]);}}return btns;},__validateTheme:function(theme){if(typeof theme!='string'||theme==''){return this.__defaults.theme;}if(typeof this.__themes[theme]=='object'&&this.__themes[theme]!==null){var t=this.__themes[theme];if(t.base){if(typeof this.__themes[t.base]=='object'&&this.__themes[t.base]!==null){return theme;}else{return this.__defaults.theme;}}else{return theme;}}return this.__defaults.theme;},__parseTokens:function(text){var tagSplitRegex=/({\s*\w+\s*(?:\w+(?:\s*=\s*(?:".*?"|'.*?'))?\s*|\s*)})/;var tagRegex=/{\s*(\w+)\s*(?:(\w+(?:\s*=\s*(?:".*?"|'.*?'))?)+\s*|\s*)}/;var attrRegex=/(\w+)\s*=\s*(".*?"|'.*?')/g;var text_obj=text.split(tagSplitRegex);var i,match,attr,tag;token_search:for(i=1;i<text_obj.length;i+=2){tag={};match=tagRegex.exec(text_obj[i]);tag.name=match[1];tag.attributes={};if(typeof this.__tokens[tag.name]=='undefined'){continue;}if(typeof match[2]!='undefined'){while((attr=attrRegex.exec(match[2]))!=null){attr[2]=attr[2].substring(1,attr[2].length-1);if(typeof this.__tokens[tag.name].attributes[attr[1]]=='undefined'){continue;}if(this.__tokens[tag.name].attributes[attr[1]].validation===false){tag.attributes[attr[1]]=attr[2];}else if(this.__tokens[tag.name].attributes[attr[1]].validation.test(attr[2])){tag.attributes[attr[1]]=attr[2];}else if(typeof this.__tokens[tag.name].attributes[attr[1]].defaultValue=='string'){tag.attributes[attr[1]]=this.__tokens[tag.name].attributes[attr[1]].defaultValue;}else{continue token_search;}}}for(attr in this.__tokens[tag.name].attributes){if(!this.__tokens[tag.name].attributes.hasOwnProperty(attr)){continue;}if(typeof tag.attributes[attr]=='undefined'){if(typeof this.__tokens[tag.name].attributes[attr].defaultValue=='string'){tag.attributes[attr]=this.__tokens[tag.name].attributes[attr].defaultValue;}else{continue token_search;}}}var rep=this.__tokens[tag.name].replacement;if(typeof rep=='string'){text_obj[i]=rep;}else if(typeof rep=='function'){var rep_result=rep(tag);if(typeof rep_result!='string'){continue token_search;}text_obj[i]=rep_result;}}return text_obj.join('');},__copyObj:function(obj){if(obj==null||typeof(obj)!='object'||obj instanceof RegExp){return obj;}var c=new obj.constructor();for(var key in obj){c[key]=this.__copyObj(obj[key]);}return c;
  } }
  if(typeof devtools.dialog!='undefined'){devtools.config={open:function(){var msg=(typeof this.__options.html=='string')?this.__options.html+'<hr/>':'';for(var name in this.__options.settings){msg+=this.__options.settings[name].input;}devtools.dialog.open({message:msg,title:this.__options.title,mask:true,buttons:[{text:'Save',icon:this.__icons.save,callback:this.__save},{text:'Save & Reload',icon:this.__icons.save,callback:function(){devtools.config.__save();document.location.reload();}},{text:'Close',icon:this.__icons.close,callback:this.close}],theme:(typeof this.__options.theme.css=='string')?'devtoolsconfig':'default'},'devtools-config');},close:function(){devtools.dialog.close('devtools-config');},get:function(name){if(this.__options.settings[name]!==null&&typeof this.__options.settings[name]!='undefined'){return getValue('devtools-config-'+name,this.__options.settings[name].defaultValue);}return undefined;},getAll:function(){var vals={};var allVals=listValues();for(var val in allVals){if(/^devtools-config-/.test(val)){vals[val]=this.get(val);}}return vals;},init:function(options){if(typeof options!='object'||!options){return false;}if(!options.settings){return false;}if(options.prefix){this.__options.prefix=options.prefix;}this.__options.title=(typeof options.title=='string')?options.title:'Configuration Options';var setting,name;for(name in options.settings){if(!/^\w+$/.test(name)||!options.settings.hasOwnProperty(name)){continue;}this.__options.settings[name]={};setting=options.settings[name];if(typeof setting.type=='string'){if(setting.type=='text'||setting.type=='textarea'||setting.type=='password'){this.__options.settings[name].defaultValue=(typeof setting.defaultValue=='string')?setting.defaultValue:'';this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+(this.get(name)||this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"}';}if(setting.type=='checkbox'){this.__options.settings[name].defaultValue=(setting.defaultValue==true||setting.defaultValue=='true')?true:false;this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+((typeof this.get(name)=='boolean')?this.get(name):this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"}';}if(setting.type=='radio'||setting.type=='select'){this.__options.settings[name].defaultValue=(typeof setting.defaultValue=='string')?setting.defaultValue:'';this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+(this.get(name)||this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"';this.__options.settings[name].input+=' options="'+((typeof setting.options=='object')?devtools.JSON.stringify(setting.options):'')+'"';this.__options.settings[name].input+=((setting.colorHook===true&&setting.type=='select')?' hook="color"':'')+'}';}}}this.__options.html=(typeof options.html=='string')?options.html:false;this.__options.theme.useBase=(options.useBase===false)?false:true;this.__options.theme.css=(typeof options.css=='string')?options.css:null;if(typeof this.__options.theme.css=='string'){devtools.dialog.defineTheme('devtoolsconfig',this.__options.theme.css,((this.__options.theme.useBase)?'default':null));}this.__initSettings=options;return true;},__initSettings:null,__save:function(options){options=devtools.dialog.getInputs('devtools-config');for(var name in options){if(!options.hasOwnProperty(name)){continue;}setValue('devtools-config-'+name,options[name]);}var img=document.querySelector('#devtools-dialog-devtools-config [data-devtools-dialog-button="Save"] img');img.src=devtools.config.__icons.savecomplete;setTimeout(function(){img.src=devtools.config.__icons.save;},2000);devtools.config.init(devtools.config.__initSettings);return true;},__options:{title:'',html:'',theme:{useBase:true,css:false},settings:{},prefix:'my_storage_prefix'},__icons:{save:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKCSURBVHjaYjTL3lPIwMAgD8Q2QKwExDwMDP9ZgDQjw38GMGBmYmRgAuL///8x/PvH8IGNleHO95+/O09N81wDEEAghVqzS61SQOrVpdnBev7/+8/w6w8Q//4H1szJzsTAyMjA8OX7P4YvP/7y33v+xWDhzrszzLK28QMEEBNQvS1I1/pTnxiA+oC2/GfIm3waaBOQA9TFygKxHWTgd6CBf/4xMP5lYGKJd1cW5mRnmwoQQCADJEC2gjT8Bsr+/gNx928gn4WZAWwASO77L6gc0IIDlz8zsLEyM3z/+YcNIIBAXuD68w/scLAiEGACufc/SDPQ6UD4A2jz95//gS78D3YliH729gfIMEaAAGIBBdhfoAAQMfyE2l6bYADWDEQMv//+Z/j2E+R0cAACzQXCfyDX/AUHKkAAgUP7318GsNOaF5wHehvoZ0aY7QwMINf9AXoNGiFgICAgBDSAGawHIIBYGMBOApn+l0FMXBoUGZD4A+uAOhlo4///UC+AnAG05PfvP6DoYgAIIJALGP7+BRsGBoxwBgPEyf8h4QOh/oPlQU7//RuSLgACCGzAn7//GKBWgv0ICjgGsEKIf8H+Btv+F5xGgCyGn7//g10AEECgQGT4+w/i5LpIGQZiQOnsq8BwgbgEIIBYQFH2Fxa6QEMmHkvBqznPcjbQy3/ACQukASCAWCB+/Q8OcRCwkokl6IJ/QBv//gYnPwaAAGIB+u0/0AuMsDA49mQxXs0msnZAF/wFpw+QXoAAYgFa/uDXn3+Kxspc4AxTYD2HoAvEeYEu+Au28D1AADGaZe3qBxqkBnSBJdBIQZCzwFH3/x84kJBpWMxAIv3/ZwZGpssAAQYAIXxui1/HoMEAAAAASUVORK5CYII%3D',savecomplete:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAAN6SURBVDhPTZLrT5tlGIf7HziDi/GLZsk0ZsYYDq0YsrEAbrq5KPvieWEwOk6DSWYmh204YYByBoHCKO06oIVWThaEopgFNrp1DOQwgoMhOg6FVqDjVA6XT19j4ocrT94373397vt+H5kitusLQYHAJnAK3IpYy64ARcy/vBXXRUD8z/gk6tibHbLpVfz6yt7SA917dV57ZKKgcnBqjcGpdTa2dlkXrG3usLS6jX3JjWNlS3qedTl46eY+Tna+x7leJaHifFH92phHMDb4eI20+nnW3KLYvcOZnD6cri3sy1usrG1L4qQ7Vwg2B1I4kkXS/QQKR7M5YNyPR7A0IASX9XMsi489eATzy26cT7dYF8K+2X72aJ4hdySDRJtSouBhphC8IgnctolVIZhlTrTsQZlrZV6cro0dNkRXQS1vE289S/F4NlH3PqFqsoTPb32Id36UR2DZtT56yqW6Wf5Y3JT407Ep0rel9MoRLT6Nb6CZKuOr4VhKJ3LIGL7EoaZgfGMbJAFa221OaPIJzbtBpEg/m2clrugeyqJunlO/QJFILp7MJGciDe10OYfbAkhv/xE/ZSuy56+eZH/NPt5tC8FL8yzyqghSbk6TopvGX3uKUz0fUfvkOlmTyfxgryHaGk6oPpUK8wR+kc3IZKUyrg1cJl8sKG/0mtSuj/pjwnQmXm14GeOcjpK/MjEuaCl5nMOhxqMkXO/n+6ZxfM80CkGZjCLxS1IenCdt6Etp1qMdQYhLQvbYVfT2KqrtRTQ76njHEoxS3cF51Sh5DSP4RpjECN+E4t/sh+r3AjJGk/hu/Ar6mWrShpNodRhQLxTS5WrhwkAcqocV0p04VzrEt3W/4RMulugvlnjE9CmB5gC0U+XkT6STKeZtWdRTs6ii3WWkeqaM4+2BZP0aLt3KmOIHpOv68TldLwRxFtpsThSazzhuOYJhRkPFkzwKZ9Ix/F1Fh6uRD345hmGklluPuiVBVMF9vlbbhECP7M3Yzt3Wuw6Sb0wR35vAQbM/hjkNRqeG7lUzyUOJRFrel9L/6yAy9y6plVa8w+p2ZfKYzknT7QVMvXZpvovWixyzhNDiNKCaLiCyJ1x6/39SK/pIKr/jEThkipjOfHl0h1ke/ZNTHtWOPMqMPCeRg02HCTKdQHFBhU+EUSysXrRsEEV6Kdk7rHbZ+7S+5x96SM+LUN/dOQAAAABJRU5ErkJggg==',close:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII%3D'}};
  }
  devtools.config.init({
    title: tvp_0,
    settings: {
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
        defaultValue: false
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
        defaultValue: '15%'
      },
      'content': {
        type: 'text',
        label: tvp_91,
        defaultValue: '15.5%'
      },
      'table': {
        type: 'text',
        label: tvp_92,
        defaultValue: '99.5%'
      }
    },
    css: '#devtools-wrapper input[type="text"]{margin:0 5px 0 19px!important;max-width:50px!important;text-align:center!important}\
         #devtools-wrapper .dialog-content>div{-moz-user-select:none!important}\
         #devtools-wrapper .dialog-content>label{font-weight:normal!important;direction:rtl!important}'
  });

  function $(q, root, single, context) {
    root = root || document;
    context = context || root;
    if(q[0] == '#') return root.getElementById(q.substr(1));
    if(q.match(/^[\/*]|^\.[\/\.]/)) {
      if(single) return root.evaluate(q, context, null, 9, null).singleNodeValue;
      var arr = []; 
      var xpr = root.evaluate(q, context, null, 7, null);
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

  function toCustStr(num) {
    return num.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }

  String.prototype.toCustNum = function() {
    return parseFloat(this.replace(/,/g, ''));
  }

  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
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

  var scriptID = 100937, version = '4.0.9';
  var sortdir = devtools.config.get('sortdir');
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
  var vals = document.cookie.split(/;\s*/);
  for(var i = 0; i < vals.length; i++) {
    if(vals[i].split("=")[0] == "user_id") var userID = vals[i].split("=")[1];
  }
  if(userID) setValue('myID', userID);
  var myID = getValue('myID'), url = window.location.href.toLowerCase();
  var onUserPage = url.match(/^https?:\/\/userstyles\.org\/users\/\d+/);
  if(onUserPage) var user = document.title.match(/^(.*)?\s-/)[1];
  var loggedIn = onUserPage && $('//a[@href="/logout"]', document, 1);
  var onAllPage = url.match('http://userstyles.org');
  var onMyPage = url.match('http://userstyles.org/users/' + myID);
  var onStylePage = url.match(/^https?:\/\/userstyles\.org\/styles\/\d+/);
  var onUserPage = url.match(/^https?:\/\/userstyles\.org\/users\/\d+/);
  var onBrowsePage = url.match(/^https?:\/\/userstyles\.org\/styles\/browse/);
  var onEditPage = url.match(/^https?:\/\/userstyles\.org\/styles\/\d+\/\edit/);
  var onEdit2Page = url.match('http://userstyles.org/users/' + myID + '/edit');
  var onEditPW = url.match(/^https?:\/\/userstyles\.org\/users\/edit_password/);
  var onHelpPage = url.match(/^https?:\/\/userstyles\.org\/help/);
  var onLoginPage = url.match(/^https?:\/\/userstyles\.org\/login/);
  //var onDeletePage = url.match(/^https?:\/\/userstyles\.org\/styles\/delete\/\d+/);
  //var onEdit2Page = url.match(/^https?:\/\/userstyles\.org\/users\/\d+\/\edit/);
  //var onUDPage = url.match(/^https?:\/\/userstyles\.org\/styles\/update/);
  //var onNewPage = url.match(/^https?:\/\/userstyles\.org\/styles\/new/);
  //var onSitePage = url.match(/^https?:\/\/userstyles\.org\/categories\/site/);
  //var onCatPage = url.match(/^https?:\/\/userstyles\.org\/categories/);
  //var onAppPage = url.match(/^https?:\/\/userstyles\.org\/categories\/app/);
  //var onMigratePage = url.match('http://userstyles.org/users/migrate_openid_info/' + myID);
  var styleList = loggedIn ? $('.author-styles')[0] : $('#main-article');
  var styleArray = [], styles = loggedIn ? $('//tbody/tr') : $('.style-brief');
  var styleCount = styles.length, DATA = {}, totalInstalls = 0, totalWeekly = 0, totalObsoleteInstalls = 0;
  var totalObsoleteWeekly = 0, obsoleteCount = $('.obsolete', styleList).length;

  addStyle('\
#style-table img[src^="http://forum.userstyles.org"]{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAr5JREFUeNqkk09IFFEcx3/v7czOun9cTV1MQjJLqYj0olGHDiZUpCXUpYg6RBZ5KlCioDp1iYjw1EWJEKGE1lrSpIOXdEs7mK2hm7rmuu7quLOzszvOvze9KQ0q7OIPvm+YH7/P7/1+v/ceqn0lwmYMwyYNiZr5h6O+L51HP+epqqlK19xzVGNUnQNHPcI/CXJZBLW9KRf9v+G1o5aGUntOpdfG+nKwzQpKyMQIi4b2MqLKKdVsp65HwUavaLHM+v6mrt05V+m62lTGueZkQHEFYDFjQlwi8DWuMyFe406Us24gpM0/K7tr/cJNyhrYpGtNT6KlYbuzucpnd3dM66gjpMDtPgEmBQOeBSU47EPwpsEDVm+Cipyny51X6IbXLRYTuiJAF6t9rKsnosHrkTQwGQ18HMCnyCqcqbCDr4CFex9leDujQFQ2YU8h60IAFywWi1YPxCz+kCR4jAInd3FwtsoJikIgFlOgJN8GHSMZeD4hwzLGYHdgeM8TRJk8i8UzlNczqeGwoKqprE5LJDDMG3QmBMo8GEK8DqGIDNt8DBTm2kAxCMyKmqbL6RGLxXM0ixyd6v6+LKedeQwZmMjAAk1UV8nBEm2Fl3RQVjVw0PMwaMkyMcn8UlZUYtPdFosXqTN063ggOfX5SVbKriyYmj4UkgC2sLB7hwMkWgnnQKASYmZUNbsYl/hk+EvneFt9r8Uy/K9TXB1vrbtf3HhtEO88dHmaq2rq01R08EAhKiowYXYhba5ExRROjAWSo/1PY/72IcrIP9nWrPH7UlHR2UMJdhYdqbjbL+x/PCofe8cbpwKT8r4Hg8uMJ794LQatszZtbzNEex6uJ7GySaaWnReC/i53RTVWdM6b+DbzIhMevbQSDMxbM18Ptlio6Ypu9E6sa+yl2kpVQMX+HWCxzH8emlVNak0b2g8BBgCd12EWkPb0JQAAAABJRU5ErkJggg==)}\
#style-table img[class="metafaviconblank"]{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACSUlEQVR42p1TS2gTURQ9k9SO0ZDQkNb6aRC7slCQNrZQ6aIF3bnShUIRrAW7kSyrIpRCF4JRKLgJRQIiuBLBhavSRWlXqYIfImIUaRsJtMF8NNPMmI7nTt6UJO4cOLx5n3vuuefdp6Hluw10cLhGTBD9avkD8Yx4eh/42XheawmOcbhJhp5uTfN7bRs2F6qahh3bNgrAd04TJFn4h4DBT7zAxQGg0+D8FxEkuIaSGg/WpRT3gBckubFPIJl5YHaY8jc4P0IMrawgMjrqkJc2N7E2MoKvW1vo5Pw9UKny/EMgrqma184Ap7f5I5InMhl09PZiO52GWS7j+DCpWU7S44GhlHwBPnE4JwQxnWynSCTuSIYrpomN1VW8HB/HLudXl5dxcmwMr8NhfM7nndIygMFkd4QgxaCosFqER9VbIyTbCeJSsQg9EMBzmplTCiRZGVgXgt0uQJfAPWWorQi6icvM6AuFsDQ5ibfJJHSVpEIU5IKEgCboBxSBey0mcWFxEQNTU1iansZ6IoF2te9R6oqKIOUHBg9zz2roCTl8i15YhoGFYNBZ86q9tnqwkDglxGjUPZoYrjQQyOH+SARWNouPtZqT1f0OEd9YBcu5u3+NPl6jT9Uun5Q0ND+PaqGAN/G444sr36obWL9Gt5FoyAxVHBUf/hDHiOu27ZA9pvslJb2tnr1EFXMPgEdNrZwHzjOwx68MHYxGYeZyeMcOFEW/iR/ADiW/amrl1sfEbF0BINS4z7dRInHWfUxn+/raU+m02UTwP8/5L+luwlcKrAW1AAAAAElFTkSuQmCC)}\
#style-table .undelete{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAACg0lEQVR42t2US2gTURSGzzQ2ETcGH4vajdAI3ShCVQLSOuMmtZaGROKiFMwmC7OUuJQQF13ULMRFqEaxQhpqgwkJaXAWdqZVbLAVBBXTmCqkPrABW3xUEynjP8ktlWHapuLKC3/++zj3y5l7Zw5H/7hxW4qWEc+TQvfpMnXSVcz8hJb/HrgGVkikfrpJCSrRK8x8rxsoy7Ky2ud5vhuWA7BQnQjTMBflBhRFeYPRN13gnwAGuUg76RB10cE2d9vhIlekkrG0FnCHxug2XUIvr2bKaWEAuNE9Du2p/mETGXBeZjpH7VTGoxowt02TBU8D+L2lQrmNslNbqBKiUeMotc62Unm2TKaMiXKDudpiHLpWvZQJqB96pH3k04CmkeVz9L9CZZyXQI9x6Fdwo4sYqxcg0wGzZKalwFIF489QGhqEnmqBLQAWAHwCPwa/h81noGXrlHVHVsxmI5GItS/f97HnWU9TKpVawJ6XUJRl+VoL3A7QD4DS8G54rHe41xVtjpJFtFAhXMjGb8StTqczEwgEuvx+/wz2TEN3oTnonRbYCFAFoCTcDh8fGhk66b7u/kB+2kfn6X34QrjZ4/FMJpPJDrvdLmNPFopBb6FF3dcGoATcAZdEURRsNtu0z+c7GgwG50KhUIvX653EegfWHzDgCFSEvmwGlCVJ4gVBeBiLxdpdLtdMIpE44nA4VoHj2DK1JSAajJ+An9Dx/xAowYUNvP5LoVrhUL+EFcigdcSdrQuIdgrBGdqkAaZ+yQ3skceg+fWA+6FOqlWcXSxTRSdOLQp5luEL6JM6pwc0QrshC7SXjfXi1PKvFsYF5mqB/aUX2MDOygQ1sv56bYWdc5n1ld8c9X4m5uk8SQAAAABJRU5ErkJggg==)}\
#style-table .delete{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAACtElEQVR42tWUX0hTURzHfzNr/RGC1V6aoYlEiFQi1cKoxRYWW5NtkMHGaEyQPfQUvcReJ0H0IsQYSAOZ1JKmLRPGNr1R4SpELVmRaZHLWiMKl7oyt77XnYXetlTopQMfztm9v/PZ73fOuUdE/7iJ/n8hx3GZ3FihUGjQvQRTYAH8WFG4VMAkF9HtBhK8MwjeqdG9AB/ATx6RUIagcxjWge07iLZYicq1WSFdIxrqJErMZLNbQLwG8ecx7gdvwKyoUHbpZJLSwSBtbW2l8bIymk6lqCYepz61mqQGA8lkMhKLxXyWPQjvAr3go7BkNaQ9CHp+lqjkAtEuP1ESmc2niTLIVIx0Sg5gHb1e757Gxka+3K+gm0nHlgnXE1UGOW4Mwidcbe3B4sFB6q2ooJaJibd2u73c5XA8tjY0HLrc3T3idrv3WSyWYUwbB3dA5A8h2kZkOMeX8UAq1RQnEmStqqJoNDrs8Xj2m0ymrra2Nl1TU1PQ5/Od0Ov1fZgzCnxMHFsmxMo6Sogu5Ts+U3I5NUQiEb/fL9dqtVw4HFYolcowXj0FnWxTvggzlLhNps/VHs+yh7dxHKJabTFko6Aawn5UchyVhFmpN8E7MC0Ubr7ucs3caG6ebCHayT+4Ba4QzWEDNmEjhgKBQE19ff19CI9ByJc88DchYUIGE8JXVSrl0VCIdKWlFIvF3judTpnNZnsI0RGIVi9kh/tue3v7abPZ/BobUYkNeYY/2rskszULu0KhkE6lUg10dHQcNhqNj/C8bolo7UL0OvS5xS/Ur7gpv4WUvTj424T/btcJe8SdWZUQ7RSCe2mFBhl/mItYyffAZCFhOThJ2RtHwjLN5ImbBa9YhvzXEifhbcPaBrANVAIp+50vLgUS4BPrv4H5fIFFbK3EtHhfLI4Ltdyt/Z2NM78AZLdcJk1joUgAAAAASUVORK5CYII=)}\
#style-table .edit{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAACRklEQVR42s2US0wTQRzGvzYSY4zh4COBygHMtkC81JPhrIl48WziAVHjAYwHDiQcSCQ9mXgwUQ8kpIT6CAkmPhJEW4GFdhWxPLpUKFC7Wx6pFBIaixSrW/+zHQih1IIawyRfdjLzn99+38zsGvCPm2FPAavOwcqerV0Y/msgg50yo2d/AvmOd7jgluGh4dgfAasrcbrgCNpstYKghqbwuhu43oxKmhrcNZCclQvH4Wy4ZimU/QGQM8wvAjYHmmi6fVdA5uyECU8brhYXBoMhvPmYhk2EgQ4R96nEvmMg2zPTUbTbai1CcDoAlxeYjQKfVKDfh5noMp5Q2aMdAQlmOVmMgboqIV/2T23E9CvQuocQjq3oB+IiOXMCq8+jouAwHHQAJewAOgfSMObsrRcKwfqozM2lGHI5o5idtpvWEtk3DGksHZPtmTiqx+ynsl4Sg9IoVg2/gVkpZs96zL5RcrZEMBWpl+/zQslk0sNdMZhCSrB12wK33rOuD/T6hQ1n6lIMIocxhypztr42A5j66jUufInUHTug3J6TavBC4numICX6ECaYxGOK3Nna5vUZwIDsNplLy2axNg9EO9Dy4Jbu8LmU95liMlce7kzZ7CwrMB6P3zuIUA2W6XuKtKH+jhf2V/oB9HJQRsyswKbLKGq0Iyw/O4tFxbl64y5WpucwkviOIE3ThdHjZsTMCrx0Bo8funCR9Y1Go1vTtHHq+rkmSdFszrYFmov2XdG0HyZydYhfg0ESg0ZI30g/kaPtrT/2fwH+ApdfA+zwr/PjAAAAAElFTkSuQmCC)}\
#style-table .edit,#style-table .delete,#style-table .undelete{float:right;height:22px;left:-4px!important;margin:0 4px;position:relative!important;width:24px}\
#style-table #metaOption{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAACkElEQVR42tWUXUhTYRjH/+/5cptoUUY5gkoMLNh1i+xiFaJeFWVKuTJCw0yjG6O7FRrR6KKgq4gVSaUY7U7xokAK5mUf2AdzK8KWGX4Q0x3Pzjk97zk2EPIMJC98YbzvzjnP7/3zfz4YVmmxtQ3e4/cfrqmufr4S0MDg4JGRWCz6T3AoFDLL9tUbkxmZzaomM+m1bsL6LWgGDMOkXUfW0JHJZLEzMYz6VxfRu/82jKJpHs+WBeu+JvP7rM4yBoMgCBAYA78gq9tgVcvSWcf8vIa7z3y52Ce1IWfw+6JazMzpUGQJgsggEhgcbhogNinOYl7VkJxI41zhJ1txJSkuzqP4Xsq/omQ1l8acwXtPdSJtiOAGcKV/P9BIrvqrH3JJHSQBKFIYXLSv57vE8PhOtzO48sxlqFCgGdxTw4LzO+YmetE4FER/UEMBWVSsAC7a1y2CH9y66gw+EOzAwYrNdkLepJCZGbDOHNpT9Qi/kx50NDUsseH+wx4kPn9wBh8KtiFQ4c2Bj/WVWGcO3eg9junRGHQ1DXkxsSQWrgIFI6+HncFHWzvx8wcppXp1l5TCZBJS4/3YsKkKU5ND2FXeAIXK0ENWKNxrIssiEO6+5gw+2X4FC+RtmsC6KVIti1b9jn3ts+x425qxkueWGcheFEp0Aam/eeN6HnBLO3Zv22L9H3qXxPjUyyUeG18UnD3duMTjSCSCeDzuDA42t6FiuzcHDjzdmvM44DuBb/FR6AsqZIFZBcPLUpIkRKNRZ3DL+XYkEmPUuhp2lJXD5fbgxccoanx1EAXbT97mgjVJ7Lbnq6urKw/4wiWIoghZsucEzzxXxuOZaVrPrMZhdiivdZ1mRzgcXh68amPzf661B/4Ddu04JtI61kQAAAAASUVORK5CYII=)}\
#style-table #metaOpen{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABEElEQVR42rWRO04DMRCGx1IUgRKJJkCVi0Sau1BAk4iaKyA6FFHR5SpuuQXRNiFvRSwKu87YO/bOsq+GWJodj9f/J88/ChFBLn2nDVxwYTgnnC8BcIpK3lclwJgAAy5Sztu8xrezAyYEuBYHFrLJW2pvwQJuxYH1Yc37LgFe2gCPDQAyE1//GwCzMKzscp/iJvzNPIg5rJk/8EmtDIuAkTDqF/L5GxG+julrSLeAL3rRwLWg7/UzIDzBii+lQiDHeXQnCiK3B3xHFTwIkGULIIId5SsrLpkYIL6dhCFHriNq8Bs6Xlw9BQ/Z88GBnz2nXQw9Ka4ElCAHink2hb/iWkAB8lEvbgQ4yIN2NtaJ7ToBsX2RVUhoPwEAAAAASUVORK5CYII=)}\
#style-table #metaClose{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABI0lEQVR42rWRTU4CQRCFX02AaJC4QVm5Eb0EiUdgR4grruEVvIQL2EA8ixcwwErDBlSQTATsmbaK6U5P0G5ZaCWTzuvp99UfIRC9OrScnTHI98b7o1vH7VUFNw8xsEr9EAqZlwkQs/l544dQyCzBAGmDGBIzpLwLoZ/Mc2NO2CruT53pyQbqI0UhD6Fd84sCUnOnjdFqBmmGvPN5bCGUN7+qLGMIIB6GbKsSCMmqGhVgrrJHypS9BdhPO71iCGuaKsy4xSrZXdsHRxFwWnT9SXbZABux4CRrjacS4cy7hftL6FrRaYG+KTfU1jCwhT8BDC78gBK313zcA3CSA8gM7IAF1v6tgj4DqgaQmvEuEqevR/8NuDuHPohcyXZ4EofR9xa+AHXJqpkk6164AAAAAElFTkSuQmCC)}\
#style-table .metascreenmain{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABE0lEQVR42mMMDQ/+z0ABYAQZsHrlWkZyNIP0wg1IzAwgySXzp29gxDCgwESDoMYXhy4zrOBixW6An6oqg4DMO4b/H+XAij9/+cSwaut+hrToIDD/P9CjP/cfx21AhDEDg4b1RYbHF2wZfn1RZODhZGUwi6lh2DOpCGwAN78ww6d9xwbAgGgXI4ZEPwfCBsTrajKwi7xi+PJWkuH//38MblltKAG4sSufgePqHfwGMLKyMfxjhCSLPx9fMyzYfpxh6Z5zDPunljNw8PDhd0GugSoDMwszKLwZvv1nYeBj/8/w6cNnBsvcyQwHe9MYZOVkGW5vOYHbgCpDOYZvzFzkp4OIb7+JSoU4DaAoKVOUmcjRDAMA4FTt8WGSsBEAAAAASUVORK5CYII=)}\
#style-table .metascreenmore,#more-screenshots .metascreenmore{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCklEQVR42r3Tz4pFUBwH8N8RRUnZKMVKiWJrYaXcV7CyuN1X8gKWFp5BvIWllBJR/izdmKhR0x1j5qr57b+ffuec70GO4yxwYdAKhGGI3gmv2R2wLOtPmyRJgl4ATdNOg23bQlmW3wOmaQJFUUAQBGRZBsMwQF3XIMvyDnRddwwYhgEsy8I0TVAUBZAkCZ7nofv9vh2PYRhomuYfgXEcIQgCZNv2IgjCOXC73QDDMJjnGeI4hiiKvjzvCnEcdwxIkgQ4ju+BdYOqqjbo8XgsNE3/vIGiKDvwfD63O+j7HnzfR67rLqIoQp7nx4Cu67Asr31K0xRUVT3vAc/zv2rhIXCpypc+0zvhz/kApN4MAC9lC0AAAAAASUVORK5CYII=)}\
#style-table .metadiscussions{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQUlEQVR42o2STYiSURSG7ydS0oh/G3+QSBHURcRAGrYIMRAkKBE3DYSBoWLKuJAgmRZJ0ES6mlbhD4QFuVBJRXe1Elq0CkVdpBZDVjKImjlR1ntFQ2IyDzzovd+977nnnJchS6FWq48JBIIzIpHogkQiOc9ms0/R/fF43O52u5Ver/eq3++/7XQ63xd3mMUfbG64XK4rGo3GrVQqN1Uq1XEej8eaTqfk4OBg2mw2D+v1+pt2u/04kUi8UCgUX/8I6HQ6Dg5fM5vNt/V6vQLZyVGBy6RSqbQLhcIuXvKk1Wp9mwlYLJZLJpNpz2g0KrhcLlkVKIPkcrn35XJ5u1qt5hipVCqxWq33bDabUy6Xk3WiVquRWCz2tFQqeRk+n38xGAw+tNvtm+tc5nA4ZDKZkEgkUovH41cZoVC4BYG7eIFqrfRzkXA4/CGZTN6gPbC43e4HgUDgNO04i8Ui9HdV0D75fL5mPp+/TgVOGgyG+6FQaAujmx1YJUAT0MC08sPh8CYzH6XN4XA88ng8Ehjpv9m9Xm8P2XewTC6MtAH8TqfzFp4mpDUeFbR5qP1zNptNYrkH9pml7zJMJIsZ62Uy2axRo9GIwM4ENv4F8/xIp9Pv4NgUzj4DHfBzWUAqFouzmUzmHHXiYDAgqVSKRKPRl/j2CbwGFdAE/cWlhcAJ4Pb7/TuoT0SNAr+PisXic+zvgi/gkFbxd1lUgA0ugztarVaMCYwbjQZ9XhkUQIMO5l9NZebZzwItGM9r2wcf5+uV8Rt9P+PvQ17ScgAAAABJRU5ErkJggg==)}\
#style-table .loading{background:url(chrome://browser/skin/tabbrowser/loading.png)no-repeat center}\
#style-table .metafaviconapp{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADRklEQVQ4jV2TT0ybZQCHn/f9+rWlpXylA0opY1hAAgm4McjWEidGF7LT/JO4wxJN1Dk96BUTDzTxoMa7B72o0WTs5IyJJou6bCadYFh0YoKMrRRKKf9KC2352u/7Xi/TLD7nX57T8xMAyTi+ZIoKwMDA+RBSvuP2eJ6p2+q4cGw16p0vHtMetDton7mENZ1MscVDxEPB+8DszN5509XQOBN/9qlAJNKi1YprtD4+xuFBid1vppxA4XeplKohOJdM8ROABLyapr2thPZ5uCv67aXXJoMDO1c0cfVFgpu3CLVHiPT240x+KM3QAD7hdrvdvh+ScUYBZDLOeFNbZ9ORI0ZoovSJZ/erl1Hpm4Bi5MIU4VaDTHaLXKHGg/bnaGhpY3RkRBdCzABoE0d5TDnOK29dPMvw8WHGTw/RGo6SXt+mtrcOtsXdTTd1y8JZncW/cYvEyBOkc9vBRFt1TtpKxJpbWtFcGoHNmzRwyLHePs5ceJOduo7PLVAojCYfLf1jgKJ0UGa4LyyE4HWphOuiQQEcE+x9lLmPcmz++PEagWqOBYZIZ/L8tZhheTmDQoBZIdbXCMgTUsOK+4ItoNWRbTH2qvDn8iYb6b8JDJ1jZWkRaRZwlGIgfxWhFE0NAr/fQCkn6rKUtlwy5SDWHjLYTkjvYa+oc3TwJNnvPiJc2iXkjzLb8x6Bwwy6dNHc2kExn0cIUZGW0qY28tsotwdr6Teol+na/Zn42BAvvfoG4yd70ctZemp3EMpmONZJk99kI19AoOZcDdK8Xdm3KS66CEgLe3cBLdTF9a+/pFhVOECtM4F/5w6RcBtPnz6B8FVZuJdWjuK2dmONSqJDnzAdp7vP1Y3w3EcYBh1dQ9xbyWFWKrgOspzq9TKZ6MbtbSSTXmf27ooFXPo35bAScvWFU2N67OAQmrPIYBhh9FMqVPD6vbjFPqruoWoX+fT7X51azXo3meJjDeDGGuUno+L+Ui73vIiERNTXjVot46xl8RxWkZUK6D6y5R2+uD7nOJadmk5xGVCCR0jGGUPIa4YRCA/G2mXECODVdXKFTZbSebW2daCA6WSKDwD7vzf+T+IDLgtICCHOKKUMKZi3Fb8AV5Ip5h/d/wN3iGBJByQZzAAAAABJRU5ErkJggg==)}\
#style-table .metafaviconglobal{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMUlEQVQ4jW2TzU8cZQDGf+/M7M5+8LF8FFBsWVCsUktoSzRA0dSCNmBCvDQkmng28ehl/wJik5486sF466mNNntQ8VCVWloPjTGUUrJLIbDsLrAf3ZnZmfd9x4s1TdPn9Bx+z+/2CJ5Lem4pBSwYhjFhGMZ5QGmt/9Ba/wlcz2cz9Wd58dx4Ph7j+6kzkcTwiR27u2NfWPYE/2y8Fea2i+79B9uOH8jFfDaz/HRjPi1DH3319eTYwZWFmURL7zHbMkwphOlRcceIJgbE+Km/I1NnyolCyb5M34etRw9//uV/QXpu6dL4SP3K7FTZ9kOBaTkU6+/j6RmEaCVirhGJ7HCs7Ranhzet3M7guO6ZXalsLOdFem4pZUd59OVnN7qSCQ9hdvKo8ClucJZEPEosajH00je0x+/ieQGe51N70sHStzNF39evGsDChbe9pGnUaQYJVta+oFgdQWlNECgsc5OG283d9c95XJwgkDGi1j7TZ702YN4SQkymX87FtssXKFRP4QQdxG1F05CEYUifleNEz0+0xdo4rLXRDBIoCYP9OzYMvWOAOB+PueT3T1I4SuMHimYg8ZoBjtdksO9HpFTYkRKdLevUnA5C3UQzKgzDmLYQ6L3DRVLJ30jGy9hRk92jSZTS2BGJ7yuwJFJqlNJ0JDbJFUaouSOE3NNmanhmtLuz91yxNiTePH6dk6+sYkdq7B4M4kuL3dIAj/dfJxEtEjErKBWwd3CavVKv3topXTMIw9vlo5qTarFoTxSQUpHuucOlc1dxXJftUg8PdwbJFwaQUhEEIZXGLPuligusGsCNB5t7bls8wv3cHEpppJQUDjppuBLHbeK4Pkd1myBQuE0bk5CNrWIduGnks5malOqT23+tN1oSH+A02/H9kNW1cRqeT8P1aXg+lZqFlIqDJx+zcm/D1Uov5rMZxwSobCxvRo+/21UqV0fH3ngUrTqvkS++h1IK0xB0tsboTvURs1x++LW/Ua54V/PZzHcvOtPFzpRzrb93wE61dyW7UkkRhnBYbejSQdXZ2CrWlVSX89nM7y9843+SFmAeISaEENOADrW+BdwBbuazGedZ/l/lhZP/TH2c8gAAAABJRU5ErkJggg==)}\
.ratingbg{margin:0 auto;position:relative;width:48px;height:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAACUElEQVR42sWWO6saQRTHz6xG8bFGY8BHl+5CCKQJgTQpAhfzCUSwET+AiKKNjZWVhSAKYmEhon6Bm1sFEkjIB0hzC7ERQSG+d9fXbs5Z2OASlRsD7sDiLDO/M/M/r5XBmdHtdoOKojjD4fADXDCuwbNzBjqdTkiWZYhEIp8uucA1+JMC2u32jdVqfUHz1Wr1KxqN/viXw6/FnxTQarVCHo+H4YDRaAT7/f4+FovJj73AtXh2An5rs9meORwOoBDOZjNYLpdSPB7//MjDr8azRqPxCjfzOLfiZgsWDYfvQLAoiiBJkjqfTqcUSjKIW5T1brcTyYDL5Vr9Jy/ifselPMNCeWe3259ivoHJZAIKGakWBAHm8zmFDsxms2oEIdhut7Ber7VH8vl8ayN5puWb0+lk6A1VKS3SZoLp0eaoHDAvKZywWCwUPOhLKpUSjORVAc1mk8PFW57nGRqC8XisA7Vfr9dLIHmG4K/pdHplNP+niLEWnqCRD4FAgFHeUeEceoCG2+2G4XCo4Pv3TCYzOywmo3hdF6rX628wjM/JC9S6CNTUax0BvSNls9mj3cQIXiegVqu9xzDZOY5T88xisahFRcVEhqjQBoOBnMvl7o9dwAheJ6Bard76/X4TVT0BZISqntoaqd9sNtDv95V8Pn/0024ErxNQqVRCwWCQTSYTNQcREjB8ezTCkxEKba/Xg0KhcHfsAkbwOgHlcvkj5RuCs2Qy+e1wDcP2Gr3iR2OsWCwevYARvE5AqVR6mUgkfsKZges3eMgDHvbX/xIj+N9aU+PUlJfsgQAAAABJRU5ErkJggg==)no-repeat}\
.ratingfg{position:absolute;height:16px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAACk0lEQVR42sWWTU8TURSG32ln2qGUUiFt+QwaqUWJDQlhwcJo4g8wbDQad66MCzfGFf4Ad7hy419w4cbEaOLHyq+QSFCIgGAtjRFqKUPpdO7cezwVYtpYCGLSucnkTufO8855z9xzphr2GTR/8iokpbXh+ds4xGgGr+0noD6lHBbQfac/+w4TQDP4PQ2o2dSUZrTfBAGylH+pjy6d+6eHN4nf04CcSSpfeFAD6RA/Z0GubAuOZ7YOGkCz+IYG5IfkC5/ZcRaBXk6FAFkZOFY+Y57JDhzo4U3kNef1wAOjrSVNGiV4vyVIUZBhINgNiB+AXQT8fZBVkVKBM0ECSq0px12pCgTjkbn/5FeYTx6W1+jj0FuEYmMIRLjsW/gK14vLK04OKH9lEcE/WgG9f+dcbMO1y3ArPDvWavh4Iuclr+3uN8fXGjcQ4jdUWuSbCizi8CF2ZlE9WFXyzeYpzkQetpVXnI0T0YvWkpf8bwPu9GCYlCrobXEdZh+wNV0Dip25KhYagbO5DntznUjKdPRSadZr/k8Rcy0kiGg1EE/7IfKciWV2LHYFKnyus/sUit8XiBw5fuTy9pvaYvKKr+tC9qveZ4H22HnN7AGsd6xa497o432nw1rL5jqulHsbdQ8v+DoD5efdX8zO/mPQDKCS5SvcDcjPr/Qbi9hcW13YyCyVY9fcUKMAvODrDJSeJqxQVzIMH687/BW31qDcCowgdwipIO0K1hfmVNcN+BsF4AVfb+BJTIR6hnWRz8IuMCxpmVy3qGx3xGiJwAxHkZtbxNFbjT+AXvB1QluPO0m5CiTV+/aJ4ljt2uo9POSkTFRsaEN3GgfgBV8ntPkoej9yYeM69hkzk5jixjA5ehd//S/xgv8FVOBkHauti1YAAAAASUVORK5CYII=)no-repeat}\
.metalink-open{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAB4ElEQVR42p2US0hUURzGf2cKe5mbaGaRU+2UwIW7cCPRpoUbkTbuJBxbBOJGMcSwFiGpWCEyU9oqBmuGFkZFD8kiXChogiguzJ5oaSgkPmH87twrTjN3hmH+8HE/zr3nO9//ca4hOZrwcZIKDnIRwxlieNjiJ6t8YpSXvOa7vtoUdhK3mf9EuqnhCP1kiklu0sMDsT+OYJLQfdrIo5VsYooo92gWs9xt7AulcRILxOzTQiZV7D19hGkX+2Y5M7Tgxc+i28HBQCD+rAuF3J21cZVfPBdbMHRyhXweZpVScgzySjK3xCaM0nqstKpzEprkiwp/XWzIcFdtPUyZW1oBgulrZMU8S9xWF+XNEhqR0Hm37zIW2xb6K6EOsajhDhEKqMpJaEKD2qvk4kItNKhrXTkJPWGcdzyyU7tEEZXM5CTUyDNdnQG72HCUa1oq4Ua6YoeoS52lMNMayhdiEeGzJXRA8FGvQTjHZbKJtyrzU4bE3gjDwuKe5zzBr2lqopzajCK2kxGxj8IH7Pu2nZj8IaGQU1ygVFU7SzHH1U/0G1lhnVldozE5WWVOa2PCqPBD2IrXMek8y9kJ4bQDr5DvvPsn/Ba+Yl/UZcvJ3ka3dngcwWPxRtgc5+Q1BxaPJW7aBZMei+LvQ808AAAAAElFTkSuQmCC)no-repeat;float:right;height:18px;margin-right:-2px;width:18px}\
.metalink-close{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACJElEQVR42o2UTUiUURSGnztawzjqwsBB6AdqURCkRIsIWoSbWQQVFUS7CKGtBf0tiiwCQcKKoOhv1SLSgowKgokKMaho3FSrtB9prGyjcatR7L3f9ykz39XBA2c4d+be557znnvGELOnkFkJW5PQmoAVU5CwMPIN+u/Ao274om1/5ZOl50zpogD76uEGFewhdOyCqwp/RMBy0E84VQMnWIA9gd5tcIwwuz+zoLkySTU0wNhYuGhqwhYKZbArcL0dOhV+dpmZl9C4DkbjtwagXC5cZLMeyNkGOPAOHrhcjHLbvwSueaC6OskpPackdzKJHR/3QGfg8Vk4rTBvdM8tlbXXA6VSYeBAVVVYa+cSfkjCH1eYM9/V1lrY5IHyeWhuDheJBHZ62gO9UY82q4sK+4zEGVARGz2QsghKqwz6JVCXwl4zBD0Z2BnfVC1fNHN4HtB9PdQ9cCkADUC7CjjnZZROw8RERdAReHsRbgalHYLVkv2DB6pWTsViEE8aQxHfVsE9jc7tQGx91NyFw1k4Oa/Yg4PYlpYyyEF4fzloHD1uhwNJVTJ90N0Ku1mAXYDho8qCYFp4Jh+dmbXF8mXnVXYbtFWCRJlIWl7InxPOW7F0+vXPwdK1sGU77FgPaxqh3kk9ArZft6qGYWnyUd+9lr+Sf5X/c4dN7EKXmSaG5ZGLRW30m2uh3i+fCAfVTfRsD+KgoNkRMO0aEcVEN/+O3MVl7+E/HP2k4vDLCT0AAAAASUVORK5CYII=)no-repeat;float:right;height:18px;margin-right:-2px;width:0}\
#summary,#style-table{font-family:Ubuntu,Verdana!important;font-size:9pt!important}\
#summary{border-radius:5px 5px 0 0;background-color:#444;color:#e5e5e5;margin:0;padding:5px 5px 0 5px;min-width:400px;text-shadow:2px 2px 2px #000}\
#summary .good,#summary .ok,#summary .bad{font-weight:bold}\
#summary label.good{color:#090}\
#summary label.bad{color:#F00}\
b.b{margin:0 2px}\
label.good,label.ok{margin-right:8px}\
b.total,b.weekly{margin-right:10px}\
#summary b.good,#summary b.ok,#summary b.bad{color:#E5E5E5}\
#summary label:not(.good):not(.bad){color:#FD0}\
#summary:hover{cursor:default}\
#table-container{background:rgba(255,255,230,.5);border-radius:0 5px 0 0;border:2px solid #444;display:inline-block;margin:0}\
#style-table tr:not(.obsolete) a[href]{color:#000!important;}\
#style-table{width:100%;border-collapse:collapse;margin:0}\
#style-table .obsolete{color:#000!important;font-style:italic!important;text-shadow:none!important}\
#style-table tr.obsolete:hover{background:rgba(44,44,44,.3)!important}\
#style-table tr.obsolete:hover td a{color:#000!important}\
#style-table tr.obsolete:hover td a:hover{color:#FFF!important}\
#style-table tr:hover td{background-color:rgba(0,0,0,.1)}\
#style-table td,#style-table th{padding:0 4px;border:1px solid #444!important}\
#style-table th,#style-table td:nth-child(1){text-align:center!important}\
#style-table td:nth-last-child(-n+5),#style-table th:last-child{text-align:center!important}\
#style-table th:nth-child(2),#style-table td:nth-child(2){min-width:428px;padding:0 4px;text-align:left!important}\
#style-table th{background:#444;padding:0 4px 3px 4px;color:tan;text-shadow:1px 1px 2px #000}\
#style-table th:hover{color:#FFF;cursor:pointer}\
#style-table a{margin-right:15px;text-decoration:none!important;line-height:20px}\
#style-table a:hover{text-decoration:underline}\
#style-table td a{margin-right:5px}\
#style-table .meta{display:inline;color:gray;font-size:90%!important}\
#style-table .url{color:red!important;margin-right:5px}\
#style-table img[class^=\"metafavicon\"]{margin-right:4px;vertical-align:top;width:16px;height:16px;display:inline-block}\
#style-table th:nth-child(2){line-height:22px}\
#style-table #styleHead{padding:0 0 3px 0;text-align:left}\
#style-table td:nth-child(2) a:not(.metascreenmain):not(.metascreenmore):first-child{padding:1px 0}\
#styleHead img{position:relative;right:0px;top:0px}\
#style-table th:last-child,#style-table td:last-child{width:70px}\
#style-table>tr:not(:first-child):hover{background-color:#444}\
#style-table>tr:not(:first-child):hover *{color:#FFF;text-shadow:1px 1px 2px #000}\
#style-table>tr:not(:first-child):hover>*{background-color:transparent}\
#style-table tr:not(.obsolete) td *{color:#000;text-shadow:1px 1px 2px #999}\
#style-table tr.obsolete td,#style-table tr.obsolete td *{color:#666}\
#style-table td{height:24px;line-height:23px}\
#style-table tr:not(.obsolete):hover a{color:tan!important}\
#style-table .meta .metascreenmain,#style-table .meta .metascreenmore,#more-screenshots .metascreenmore,#style-table .meta .metadiscussions{height:16px!important;width:16px!important}\
#style-table span.metauser a{position:relative;top:-2px;padding:0}\
#style-table .meta .metascreenmain,#style-table .meta .metascreenmore{margin:2px 2px 0 0!important}\
#style-table .metadiscussions{margin:2px 1px 0 0!important}\
#style-table .metascreenmain,#style-table .metascreenmore{background-color:#999!important}\
#style-table .metascreenmain:hover,#style-table .metascreenmore:hover{background-color:#FFF!important}\
#style-table .metalink-open,#style-table .metalink-close{margin:2px 0 0 0!important}\
#style-table .metalink-close.loading{margin:0 0 0 0!important}\
#style-table td .meta{height:16px;line-height:16px;margin:0 0 -4px 0}\
#style-table td .meta>div:last-child *:not(img){vertical-align:top}\
#style-table th:hover .header{color:tan;cursor:default}\
#style-table tr:hover a:hover{color:#FFF!important}\
#style-table #metaOption,#style-table #metaOpen,#style-table #metaClose,#style-table .meta .metascreenmain,#style-table .meta .metascreenmore,#style-table .meta .metadiscussions{float:right;background-position:center;background-repeat:no-repeat}\
#metaOption,#metaOpen,#metaClose{height:22px;width:22px}\
#metaClose{margin-right:4px}\
#metaOpen,#metaClose{border-radius:100%;border:1px solid transparent!important}\
#metaOption{margin-right:8px!important}\
#metaOpen{margin-right:0px!important}\
#metaOpen:hover,#metaClose:hover{background-color:#FFF!important}\
#obsBtn{-moz-appearance:none;border:1px solid;border-radius:4px;color:#FFF;font-weight:bold;opacity:.6;margin:0;padding:1px 4px}\
#obsBtn:hover{opacity:1}\
#popup_container{display:none;position:fixed;top:2px;box-shadow:2px 2px 2px #000 inset,4px 4px 8px #000;background:rgba(44,44,44,.85);border:2px solid;-moz-border-top-colors:#000 #999;-moz-border-left-colors:#000 #999;-moz-border-right-colors:#000 #999;-moz-border-bottom-colors:#000 #999;border-radius:8px;padding:16px;z-index:1000}\
.popup_right{right:2px}\
.popup_left{left:2px}\
#popup_container img{box-shadow:4px 4px 8px #000;display:block!important}\
.date2{margin-left:8px}\
#devtools-wrapper .dialog-close,#devtools-wrapper textarea{display:none!important}\
#devtools-wrapper .dialog [data-devtools-input="radio"] label{display:inline!important}\
#devtools-wrapper .dialog [data-devtools-input="radio"] label>span{position:relative;top:-2px}\
#devtools-wrapper .dialog .dialog-footer button:first-child{display:none!important}\
#main-article h2{display:none!important}\
#search-terms{width:85%!important}\
#filter-block,#related{border-radius:8px!important}\
  ');

  if(filter) {
    addStyle('\
label[for="per-page-select"],#per-page-select{display:none!important}\
#labelGroup{-moz-user-select:none!important;margin:0 20px!important;text-align:center!important;width:80px!important}\
#showB{width:100px!important}\
#wordDiv{margin:5px 0;text-align:center}\
#labCnt{font-size:11px!important;margin-right:4px!important}\
#filterCount{font-size:11px!important}\
#filterCon{text-align:center!important;width:70px!important}\
#filterGroup{display:inline!important;text-align:center!important;min-width:100%!important}\
input#sel{text-align:center!important;width:32px!important}\
    ');
    if(!theme) addStyle('\
#okB{padding:0!important}\
#remB,#showB{margin:0 2px!important;padding:0!important}\
#wordIn{color:#666;margin:0 0 0 4px!important;width:75%!important}\
#wordIn:hover,#wordIn:focus{color:#000!important}\
    ');
    if(theme) addStyle('\
#okB{padding:4px!important}\
#remB,#showB{margin:0 2px!important;padding:4px!important}\
#wordIn{color:#FFF;margin:0 0 0 4px!important;width:75%!important}\
#wordIn:hover,#wordIn:focus{color:#FFF!important}\
    ');
  }

  if(sizemode) addStyle('\
#left-sidebar{width:'+sidebar+'!important}\
pre#view-code{left:'+content+'!important}\
#main-article{margin-left:'+content+'!important}\
div.pagination{width:'+table+'!important}\
#table-container{width:'+table+'!important}\
  ');

  if(theme) {
    addStyle('\
body{background:#666 url(data:image/png;base64,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) fixed!important;margin:0!important}\
#main-article>p:first-child{margin-top:0!important}\
#main-header{background:rgba(44,44,44,.9)!important;border-radius:8px 0 0 0!important;color:tan!important;margin:0 0 4px 4px!important;text-shadow:2px 2px 2px #000!important}\
#main-header h1 a{font-style:italic!important;text-decoration:none!important}\
#main-header a,#left-sidebar a{color:tan!important;}\
#main-header a:hover{color:#FFF!important;}\
#left-sidebar>*{margin:5px 0 5px 4px!important}\
#left-sidebar dl,#left-sidebar dd{margin:0!important}\
#left-sidebar dl a{color:tan!important;text-decoration:none!important}\
#left-sidebar dl a:hover{text-decoration:underline!important}\
#left-sidebar dd>a{margin-bottom:3px!important}\
#left-sidebar>nav,#left-sidebar>div,#related{background:rgba(44,44,44,.9)!important;color:tan!important;text-shadow:1px 1px 2px #000!important}\
#left-sidebar>nav{border-radius:0 0 8px 8px!important;margin-top:-4px!important;padding-top:7px!important}\
#left-sidebar li a{display:block!important;text-decoration:none!important}\
#left-sidebar li a[href="/categories"],#left-sidebar>nav>ul>li:nth-child(2){margin-top:10px!important}\
#left-sidebar li a{margin-top:4px!important}\
#left-sidebar a:hover{color:#FFF!important;}\
#left-sidebar dl>dd>a{font-family:monospace!important;white-space:pre-wrap!important;word-wrap:break-word!important}\
#search-terms{width:85%!important}\
#show-advanced-search{-moz-appearance:button!important;-moz-user-select:none!important;color:#000!important;cursor:default!important;float:none!important;font-size:12px!important;left:100%!important;margin:0 0 -22px -75px!important;padding-right:4px!important;position:relative!important;text-decoration:none!important;text-shadow:none!important;top:5px!important;width:65px!important}\
#advanced-search{border:none!important;margin-bottom:-24px!important}\
#advanced-search select{font-size:15px!important;height:21px!important;margin-top:4px!important}\
#advanced-search-submit{margin-top:4px!important}\
#perPageGroup{text-align:center!important}\
.more{border-top:2px groove #000!important}\
#main-article>h2,#main-article>p:first-child>hr{display:none}\
#show-code{background:none!important;padding:0!important;width:89px!important}\
pre#view-code{border-radius:8px!important;background:#222!important;border:none!important;max-height:90%!important;overflow-y:auto!important;position:fixed!important;top:46px!important;text-shadow:1px 1px 2px #000!important;width:83%!important;z-index:6!important}\
#stylish-code{color:tan!important;font-family:monospace!important;font-size:15px!important;padding:10px!important;text-shadow:1px 1px 2px #000!important;white-space:pre-wrap!important;word-wrap:break-word!important}\
#subcategory-list{-moz-column-count:3!important;}\
div.pagination{background:#444!important;border-radius:0 0 5px 5px!important;height:22px!important;margin:-3px 0 0 0!important;padding:3px 4px 0 0!important}\
div.pagination a,div.pagination span{color:tan!important;font-weight:bold!important;margin:0 4px!important;padding:4px!important;text-decoration:none!important;text-shadow:1px 1px 2px #000!important}\
div.pagination span{padding:2px!important}\
div.pagination span.current,div.pagination span.current:hover{color:#FFF!important}\
div.pagination span.current{border-bottom:1px solid #444!important}\
div.pagination a:hover,div.pagination span:hover{color:#FFF!important;text-decoration:none!important}\
div.pagination .prev_page{margin-left:4px!important}\
div.pagination a:not([class]):visited{color:#777!important}\
div.pagination a:not([class]):hover{color:#FFF!important}\
div.pagination a{border-radius:5px!important;-moz-box-shadow:2px 2px 2px #000!important;background:rgba(44,44,44,.75)!important;border:1px solid tan!important;padding:2px 4px!important}\
div.pagination a:hover{background:tan!important}\
div.pagination span.disabled,div.pagination span.gap{color:#999!important}\
div.pagination span.gap{position:relative!important;top:5px!important}\
div.pagination *:not(:last-child){margin-right:-2px!important}\
footer a{color:#000!important}\
#screenshots{border-color:#444!important}\
a[href]{color:#000!important;text-decoration:none!important}\
a[href]:visited{color:#888!important}\
a[href]:hover{color:#444!important;text-decoration:underline!important}\
#left-sidebar select>option{background:#444!important;color:tan!important}\
#left-sidebar select>option:hover{color:#FFF!important}\
#search-submit{padding:3px 4px 5px 4px!important}\
#show-advanced-search,button:not(#obsBtn),input[type="submit"]{-moz-appearance:none!important;background:-moz-linear-gradient(#777, #444)!important;border:1px solid #444!important;border-radius:4px!important;color:#FFF!important;padding:4px!important}\
#show-advanced-search:hover,button:not(#obsBtn):hover,input[type="submit"]:hover{background:-moz-linear-gradient(#444, #777)!important;}\
#main-article div h2{display:-moz-box!important;margin:0 0 0 10px!important}\
#front-page-best,#front-page-newest{margin:20px!important;padding:10px 20px 10px 0!important}\
#subcategory-list{margin:0 10px!important;padding:10px 10px 10px 30px!important}\
#subcategory-list,#front-page-best,#front-page-newest{background:rgba(255,255,230,.3)!important;border:1px solid #444!important;border-radius:10px!important;box-shadow:3px 3px 3px #444!important}\
#front-page-best a,#front-page-newest a[href]{color:#444!important}\
#front-page-best a:visited,#front-page-newest a:visited{color:#888!important}\
input{-moz-appearance:none!important;background:#666!important;border:1px solid #333!important;color:#FFF!important;padding:4px!important}\
    ');
    if(onStylePage) {
      var rel = $('#related');
      rel.appendChild($('#show-code'));
  } }

  if(tags) addStyle('\
#main-article>dl,#social{display:none!important}\
#donate,#left-sidebar dl dt{display:none!important}\
  ');

  if(hiddenmeta) addStyle('\
#hidden-meta{-moz-user-select: none !important;background:rgba(44,44,44,.75)!important;border:1px solid #222!important;border-radius:8px!important;color:#FFF!important;cursor:default!important;display:inline-block!important;margin-left:18px!important;padding:10px!important;text-shadow:1px 1px 2px #000!important}\
#hidden-meta>*:before{content:attr(id) ": "!important}\
#hidden-meta>*::first-letter{font-size:120%!important}\
#style-table tr[style]:not(.obsolete):hover *,#style-table tr[style]:not(.obsolete):hover td *{color:#F00!important;text-shadow:none!important}\
  ');

  if(onBrowsePage) addStyle('\
#table-container{border-radius:5px 5px 0 0}\
#style-table #styleHead{padding:0!important}\
  ');

  if(onEdit2Page) addStyle('\
#summary,#table-container{display:none!important}\
  ');

  if(filter) {
    try {
      $('#advanced-search').childNodes[5].textContent = "";
      $('#advanced-search').childNodes[7].textContent = "";
    } catch(ex) {}
  }

  for(var i = 0; i < styleCount; i++) {
    var styleObj = {}, style = styles[i];
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

  var styleTableHeaderRow = $c('tr');
  if(onUserPage || onBrowsePage) var theaders = [tvp_15, '', tvp_17, tvp_18, tvp_19, tvp_20];
  if(onMyPage) var theaders = [tvp_15, '', tvp_17, tvp_18, tvp_21, tvp_20, ''];
  for(var i = 0; i < theaders.length; i++) styleTableHeaderRow.appendChild($c('th', {className:'header header-row', textContent:theaders[i]}));
  styleTable.appendChild(styleTableHeaderRow);
  var headerCell = $('./tr/th[2]', document, true, styleTable);
  var cnt = styleCount, oCnt = obsoleteCount, aCnt = cnt - oCnt;

  if(!loggedIn && onMyPage) {
    var cnt = tvp_43, aCnt = tvp_56, oCnt = tvp_56;
  }

  if(!onMyPage) headerCell.parentNode.replaceChild($c('th', {id:'styleHead', textContent:tvp_22 + cnt}), headerCell);

  if(onMyPage) {
    headerCell.parentNode.replaceChild($c('th', {id:'styleHead', textContent:tvp_22 + cnt + tvp_23 + aCnt + tvp_24 + oCnt}), headerCell);
    var headerCell7 = $('./tr/th[7]', document, true, styleTable);
    headerCell7.appendChild($c('button', {id:'obsBtn', textContent:'Obsolete', title:tvp_25}, [{type:'click', fn:function() {toggleObs()}}]));
  }

  var headerCell2 = $('./tr/th[2]', document, true, styleTable);
  if(metadata && styleCount > 0) {
    if(!onMyPage) {
      headerCell2.appendChild($c('img', {id:'metaOpen', title:tvp_26}));
      headerCell2.appendChild($c('img', {id:'metaClose', title:tvp_27}));
    }
    headerCell2.appendChild($c('img', {id:'metaOption', title:tvp_54}, [{type:'click', fn:function(e) {e.preventDefault(); devtools.config.open();}}]));
  }

  for(var i = 0; i < styleArray.length; i++) {
    var style = styleArray[i], row = $c('tr', {id:style.id});
    if(style.obsolete) row.className = 'obsolete';
    row.appendChild($c('td', {textContent:(i + 1)}));
    var cellN = $c('td');
    if(onBrowsePage || onUserPage) {if(!onMyPage) {
      cellN.appendChild($c('a', {href:'/styles/'+style.id, textContent:style.name, title:style.text.trim()}));
    } else {
      cellN.appendChild($c('a', {href:'/styles/'+style.id, textContent:style.name}));
    } }
    if(metadata && !onMyPage) {
      var infolinkopen = $c('div', {className:'metalink-open', title:tvp_28, styleid:style.id});
      var infolinkclose = $c('div', {className:'metalink-close', title:tvp_29, styleid:style.id});
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
      if($('#main-article').childNodes[7].childNodes[3].children[i].lastElementChild.children[1].textContent == 'Undelete') 
        var deleteDiv = $c('a', {href:'/styles/delete/' + style.id, innerHTML:'<div class="undelete" title="Undelete Style"></div>'});
      else 
        var deleteDiv = $c('a', {href:'/styles/delete/' + style.id, innerHTML:'<div class="delete" title="Delete Style"></div>'});
      var editDiv = $c('a', {href:'/styles/' + style.id + '/edit', innerHTML:'<div class="edit" title="Edit Style"></div>'});
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

  var th = $('th', styleTable);
  if(onUserPage) {
    for(var i = 0; i < th.length - 1; i++) {
      th[i].addEventListener('click', function(e) {
        if(e.target.nodeName == 'TH') sortTable(e.target);
    },false);}
  } else {
    for(var i = 0; i < th.length; i++) {
      th[i].addEventListener('click', function(e) {
        if(e.target.nodeName == 'TH') sortTable(e.target);
    },false);} 
  }

  if(loggedIn) {
    var ratingGood = $('.good-average-rating', styleList).length;
    var ratingOk = $('.ok-average-rating', styleList).length;
    var ratingBad = $('.bad-average-rating', styleList).length;
    styleList.parentNode.replaceChild(tableContainer, styleList);
  } else {
    var ratingGood = $('.good-rating', styleList).length;
    var ratingOk = $('.ok-rating', styleList).length;
    var ratingBad = $('.bad-rating', styleList).length;
    while(styles.length > 0) styles[0].parentNode.removeChild(styles[0]);
    if($('.pagination')[0]) styleList.insertBefore(tableContainer, $('.pagination')[0]);
    else styleList.appendChild(tableContainer);
  }

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
  }

  if(onMyPage) {
    setObs();
  }

  if(!sizemode) {
      var tableWidth = $('#table-container').clientWidth;
      addStyle('div.pagination{width:'+tableWidth+'px!important}');
  }

  if(links && !onEdit2Page) {
    var ma = $('#main-article').children[0];
    var lsb = $('#left-sidebar').children[0].children[0];
    lsb.appendChild(ma);
  }

  if(filter && !onMyPage) {
    if(onBrowsePage || onUserPage) {
      var lsb = $('#left-sidebar');
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
      var selInput = $c('input', {id:'sel', maxlength:'3'}, [{type:'blur', fn:function(e) {perPage(); e.preventDefault()}}]);
      ppGroup.appendChild($c('label', {id:'fb-label', textContent:tvp_13}));
      ppGroup.appendChild(selLabel);
      ppGroup.appendChild(selInput);
      filterBlk.appendChild(ppGroup);
      wordDiv.appendChild(okBtn);
      wordDiv.appendChild(inp);
      filterBlk.appendChild(wordDiv);
      sg.appendChild(cnt);
      sg.appendChild(spn);
      fltGroup.appendChild(sg);
      fltGroup.appendChild(showBtn);
      fltGroup.appendChild(remBtn);
      filterBlk.appendChild(fltGroup);
      lsb.appendChild(filterBlk);
  } }

  if(filter) {
    $('#sel').value = getValue('perPageCount');
    perPage();
  }

  function perPage() {
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

  if(hideObsolete) setObs();

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

  var colIndex = 0;

  function sortTable(source) {
    var table = source;
    while(table.nodeName.toLowerCase() != 'table') table = table.parentNode;
    var newRows = [];
    for(var i = 0; i < table.rows.length - 1; i++) newRows[i] = table.rows[i + 1];
    if(colIndex == source.cellIndex) { 
      newRows.reverse();
    } else {
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
    for(var i = 0; i < newRows.length; i++) table.appendChild(newRows[i]);
  }

  var rows = $('tr', styleTable), openbtn = $('#metaOpen'), closebtn = $('#metaClose');

  openbtn.addEventListener('click', function() {
    for (var a = 1; a < rows.length; a++) {
      if (!rows[a].hasAttribute('opened')) {
        fetchMeta(rows[a].id);
        var aRow = rows[a].children[1];
        rows[a].setAttribute('opened', 'true');
        aRow.children[1].className += ' loading';
        aRow.children[2].style.width = '0';
        aRow.children[1].style.width = '18px';
  } } hidePopup()},false);

  closebtn.addEventListener('click', function() {
    for (var a = 1; a < rows.length; a++) {
      if (rows[a].hasAttribute('opened')) {
        var aRow = rows[a].children[1];
        rows[a].removeAttribute('opened');
        aRow.removeChild(aRow.lastChild);
        aRow.children[2].style.width = '18px';
        aRow.children[1].style.width = '0';
  } } hidePopup()},false);

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
          rowChild = row.children[1];
          var loading = $('.loading', rowChild, true);
          if (loading) loading.setAttribute('class', 'metalink-close');
          var misc_info = $('#miscellaneous-info');
          var author = $('.//a[contains(@href,"/users/")]', document, 1, misc_info);
          var more = $('.more', holder, 1);
          if ($('a', more, 1).href.indexOf('?category') != -1)
            var affects = more ? $('a', more, 1).href.match(/category=(.*)/)[1] : 'N/A';
          else
            var affects = more ? $('a', more, 1).href.match(/browse\/(.*)/)[1] : 'N/A';
          var affectsurl = responseDetails.responseText.match(/<link\srel='stylish-example-url'\shref='(https?:\/\/[a-zA-Z0-9\.]+\/?).*'\/>/);
          var favicon = $c('img', {className:'metafavicon'});
          switch(affects.toLowerCase()) {
            case 'n/a': favicon.className += 'blank'; break;
            case 'example': favicon.className += 'blank'; break;
            case 'app': favicon.className += 'app'; break;
            case 'global': favicon.className += 'global'; break;
            case 'userstyles.org': favicon.src = 'http://cdn.userstyles.org/images/s3-16.png'; break;
            case 'userscripts.org': favicon.src = 'http://userscripts.org/images/script_icon.png'; break;
            default: favicon.src = affectsurl[1] + '/favicon.ico';
          }
          var meta = $c('div', {className:'meta'}), sc = $('#screenshots');
          if(sc) {
            if($('#main-screenshot')) {
              meta.appendChild(addPopup($c('a', {className:'metascreenmain', title:tvp_34, href:$('img',sc,1).src, target:'_blank'})));
            }
            if($('#more-screenshots')) {
              var screenshots = $('a', $('#more-screenshots'));
              for(var i = 0; i < screenshots.length; i++) {
                meta.appendChild(addPopup($c('a', {className:'metascreenmore', title:tvp_35, href:screenshots[i].href, target:'_blank'})));
          } } }
          var discussions = $('#discussions');
          if(discussions) {
            var good = $('.good-rating', discussions).length, ok = $('.ok-rating', discussions).length;
            var bad = $('.bad-rating', discussions).length, tot = $('li', discussions).length;
            meta.appendChild($c('div', {className:'metadiscussions', title:tot + tvp_36 + good + tvp_37 + ok + tvp_38 + bad + tvp_39}));
          }
          var div = $c('div');
          div.appendChild(favicon);
          div.appendChild($c('span', {className:'url', textContent:affects}));
          var date_created = $('.//tr[2]/td[1]', document, 1, misc_info).textContent.trim();
          var date_updated = $('.//tr[3]/td[1]', document, 1, misc_info).textContent.trim();
          if(!onMyPage && onUserPage || onBrowsePage) {
            var dateA = tvp_40 + date_created;
            div.appendChild($c('span', {className:'date date3', textContent:dateA}));
          }
          if(onMyPage) {
            var dateA = tvp_40 + date_created, dateB = tvp_41 + date_updated;
            div.appendChild($c('span', {className:'date date1', textContent:dateA}));
            div.appendChild($c('span', {className:'date date2', textContent:dateB}));
          }
          if(!onUserPage) div.appendChild($c('span', {className:'metauser', innerHTML:tvp_64 + '<a href="' + author.href + '">' + author.textContent + '</a>'}));
          meta.appendChild(div);
          rowChild.appendChild(meta);
          holder.parentNode.removeChild(holder);
  } } });}

  var hidePopupTimeout = 0, showPopupTimeout = 0, source = null;
  var popupdiv = $c('div', {id:'popup_container'});

  if(popup) {
    popupdiv.addEventListener('mouseover', function(e) {window.clearTimeout(hidePopupTimeout); source = e.relatedTarget}, false);
    popupdiv.addEventListener('mouseout', function(){hidePopupTimeout = window.setTimeout(hidePopup, 10)}, false);
    popupdiv.addEventListener('click', function() {hidePopup()}, false);
    document.body.appendChild(popupdiv);
    function addPopup(el) {
      if(!popup) return el;
      el.addEventListener('mouseover', function(e) {
        if(e.relatedTarget != source) window.clearTimeout(hidePopupTimeout);
        showPopupTimeout = window.setTimeout(function() {showPopup(e, el.href)},20);
      }, false);
      el.addEventListener('mouseout', function(e) {hidePopupTimeout = window.setTimeout(hidePopup, 10)}, false);
      return el;
  } }

  if(!popup) {
    popupdiv.addEventListener('click', function() {hidePopupTimeout = window.setTimeout(hidePopup, 10)}, false);
    popupdiv.addEventListener('mouseout', function() {hidePopup()}, false);
    document.body.appendChild(popupdiv);
    function addPopup(el) {
      el.addEventListener('click', function(e) {
        if(e.relatedTarget != source) window.clearTimeout(hidePopupTimeout);
        showPopupTimeout = window.setTimeout(function() {showPopup(e, el.href)}, 20);
      }, false);
      el.addEventListener('mouseup', function() {return el}, false);
      el.addEventListener('click', function(e) {e.preventDefault(); return el; hidePopupTimeout = window.setTimeout(hidePopup, 10)}, false);
      return el;
  } }

  function showPopup(e, src) {
    var popup = $('#popup_container');
    if(!popup) debug('Unable to find Popup Picture Container.');
    popup.className = (e.pageX > document.body.clientWidth/2) ? 'popup_left' : 'popup_right';
    popup.style.display = '-moz-box';
    popup.innerHTML = '<img src="' + src + '" alt="Loading Screenshot..." style="max-height:' + (document.body.clientHeight-22) + 'px; max-width:' + (document.body.clientWidth-44) + 'px; margin: 2px;">';
    window.addEventListener('mousedown', closePopup, false);
  }

  function hidePopup() {
    window.clearTimeout(showPopupTimeout);
    $('#popup_container').style.display = 'none';
    window.removeEventListener('mousedown', closePopup, false);
  }

  function closePopup() {
    if($('#popup_container').style.display == '-moz-box') hidePopup();
  }

  if(filter) {
    $('#style-table').addEventListener('mouseup', getActiveText, false);
    $('#wordIn').addEventListener('dblclick', function() {$('#wordIn').value = ''}, false);
  }

  function getKey(e) {
    if(e.button == 1) $('#wordIn').value = getValue('keyWords');
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
    $('#labelGroup').title = getValue('keyWords');
    $('#showB').title = getValue('keyWords');
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
    document.location.reload();
  }

  if(filter && getValue('keyWords') == '') return;
  if(filter && onBrowsePage) {
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
  } } 
})();
