// ==UserScript==
// @name           	Forum Extract
// @namespace      	srazzano
// @description		Filters out any unwanted listings on forum.userstyles.org w/emoticons
// @author   		Sonny Razzano
// @version       	3.0.7
// @include        	http://forum.userstyles.org/*
// @homepage		http://userscripts.org/scripts/show/133681
// @updateURL	  	https://userscripts.org/scripts/source/133681.user.js
// ==/UserScript==
var fe0 = 'Empty';
var fe1 = 'Open Option Settings';
var fe2 = 'Delete Keyword';
var fe3 = '\u2007(1) Separate multiple entries with <> and no spacing.' + '<br>' + '\u2007(2) Middle click in inputbox inserts all active keywords.' + '<br>' + '\u2007(3) Double click in inputbox clears field.' + '<br>' + '\u2007(4) Auto Insert Highlighted Text button toggles function on/off.' + '<br>' + '\u2007(5) Highlight text in discussions to auto insert.' + '<br>' + '\u2007(6) Double click just above text without selecting to auto insert.' + '<br>' + '\u2007(7) Filter does not catch "+", "(", ")", "[" or "]"' + '<br>' + '\u2007(8) Hover filtered/unfiltered button for menulist of keywords.' + '<br>' + '\u2007(9) Click on "Highlight To Select:" in menulist to insert all keywords.' + '<br>' + '(10) Highlight word/s in menulist to be removed and mouseout to close.';
var fe4 = 'Case-Sensitive';
var fe5 = 'Search';
var fe6 = 'Create Filter';
var fe7 = 'Clear Button for Searchbar';
var fe8 = 'Clear';
var fe9 = 'Clear Field';
var fe10 = 'Filtered';
var fe11 = 'Unfiltered';
var fe12 = 'Styles Site';
var fe13 = 'Go to userstyles.org';
var fe14 = 'Non Case-Sensitive';
var fe15 = 'Default Theme';
var fe16 = 'Case-Sensitive Filter Search';
var fe17 = 'Forum Extract Options';
var fe18 = 'Item Count';
var fe19 = 'http://userstyles.org';
var fe20 = 'Removing from filter:\n';
var fe21 = 'Show Inputbox Hover Tooltip';
var fe22 = 'Turn On Auto Insert Highlighted Text';
var fe23 = 'Turn Off Auto Insert Highlighted Text';
var fe24 = 'Highlight To Select:';
var fe25 = 'Double Click For Filter List';
initGM();
function initGM() {
  const STORAGE_PREFIX = 'usofe-', LOG_PREFIX = 'Forum Extract: ', LOG = true, DEBUG = false;
  isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
  log = isGM ? function(msg) {if(LOG) GM_log(msg)} : window.opera ? function(msg) {if(LOG) opera.postError(LOG_PREFIX+msg)} : function(msg) {try {if(LOG) console.log(LOG_PREFIX+msg)} catch(e) {}}
  debug = function(msg) {if(LOG && DEBUG) log('** Debug: ' + msg + ' **')}
  addStyle = isGM ? GM_addStyle : function(css) {var head = $('head')[0]; if(!head) return; var style = $c('style', {type:'text/css',innerHTML:css}); head.appendChild(style)}
  setValue = isGM ? GM_setValue : function(name,value) {switch (typeof(value)) {case 'string': localStorage.setItem(STORAGE_PREFIX+name,'S]' + value); break; case 'number': if(value.toString().indexOf('.') < 0) {localStorage.setItem(STORAGE_PREFIX + name, 'N]' + value)} break; case 'boolean': localStorage.setItem(STORAGE_PREFIX+name, 'B]' + value); break}}
  getValue = isGM ? GM_getValue : function(name,defValue) {var value = localStorage.getItem(STORAGE_PREFIX + name); if(value == null) {return defValue} else {switch(value.substr(0,2)) {case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2) == 'true';}} return value}
  deleteValue = isGM ? GM_deleteValue : function(name) {localStorage.removeItem(STORAGE_PREFIX+name)}
}
if(typeof devtools=='undefined'){var devtools={};}if(typeof devtools.JSON=='undefined'){devtools.JSON={};devtools.JSON.stringify=function(obj){obj=JSON.stringify(obj);return obj.replace(/"/g,'!~dq~!').replace(/'/g,'!~sq~!');};devtools.JSON.parse=function(str){str=str.replace(/!~dq~!/g,'"').replace(/!~sq~!/g,"'");return JSON.parse(str);};}devtools.dialog={open:function(options,id){this.__setVars(options);if(!id){id=(new Date()).getTime();}this.__var.lastDialogId=id;var wrapper=document.getElementById('devtools-wrapper');if(!wrapper){wrapper=document.createElement('div');wrapper.id='devtools-wrapper';wrapper.innerHTML='<div class="grid">'+'<div id="devtools-cell-topleft" class="dialog-wrapper top left"></div>'+'<div id="devtools-cell-top" class="dialog-wrapper top"></div>'+'<div id="devtools-cell-topright" class="dialog-wrapper top right"></div>'+'<div id="devtools-cell-left" class="dialog-wrapper left"></div>'+'<div id="devtools-cell-center" class="dialog-wrapper center"></div>'+'<div id="devtools-cell-right" class="dialog-wrapper right"></div>'+'<div id="devtools-cell-bottomleft" class="dialog-wrapper bottom left"></div>'+'<div id="devtools-cell-bottom" class="dialog-wrapper bottom"></div>'+'<div id="devtools-cell-bottomright" class="dialog-wrapper bottom right"></div>'+'</div>';document.body.appendChild(wrapper);wrapper=document.getElementById('devtools-wrapper');this.__handleHooks();}wrapper.className=(this.__setting.mask)?'mask':'';var dialog=document.getElementById('devtools-dialog-'+id);if(!dialog||dialog.parentNode.id!=='devtools-cell-'+this.__setting.location.replace('-','')){if(dialog){dialog.parentNode.removeChild(dialog);}dialog=document.createElement('div');dialog.id='devtools-dialog-'+id;dialog.className='dialog'+((this.__setting.class&&this.__setting.class!='')?' '+this.__setting.class:'');dialog.innerHTML='<div class="dialog-close"><span>X</span></div>'+'<div class="dialog-title"><span></span></div>'+'<div class="dialog-content"></div>'+'<div class="dialog-footer"></div>';wrapper.querySelector('#devtools-cell-'+this.__setting.location.replace('-','')).appendChild(dialog);dialog=document.getElementById('devtools-dialog-'+id);dialog.querySelector('.dialog-close').addEventListener('click',function(){devtools.dialog.close(this.parentNode.getAttribute('id').replace(/^devtools-dialog-/,''));},false);}dialog.querySelector('.dialog-close').style.display=(this.__setting.closeButton)?'block':'none';dialog.querySelector('.dialog-title').firstElementChild.textContent=this.__setting.title;dialog.querySelector('.dialog-content').innerHTML=this.__parseTokens(this.__setting.message);dialog.querySelector('.dialog-footer').textContent='';var button,buttonImg,i;for(i=0;i<this.__setting.buttons.length;i++){button=document.createElement('button');button.textContent=this.__setting.buttons[i].text;button.setAttribute('data-devtools-dialog-button',this.__setting.buttons[i].text);if(this.__setting.buttons[i].icon){buttonImg=document.createElement('img');buttonImg.setAttribute('src',this.__setting.buttons[i].icon);buttonImg.setAttribute('alt','');button.insertBefore(buttonImg,button.firstChild);}if(typeof this.__setting.buttons[i].tooltip=='string'){button.setAttribute('title',this.__setting.buttons[i].tooltip);}button.addEventListener('click',this.__setting.buttons[i].callback,false);dialog.querySelector('.dialog-footer').appendChild(button);}var style=document.getElementById('devtools-dialog-style');if(!style||style.className!=this.__setting.theme){if(style){style.parentNode.removeChild(style);}style=document.createElement('style');style.id='devtools-dialog-style';style.className=this.__setting.theme;style.setAttribute('type','text/css');style.textContent=this.__themes[this.__setting.theme].finalcss||(this.__themes._base.css+'\n'+this.__themes[this.__setting.theme].css);document.querySelector('head').appendChild(style);}return id;},close:function(id){if(!id){if(!this.__var.lastDialogId){return false;}id=this.__var.lastDialogId;}var dialog=document.getElementById('devtools-dialog-'+id);if(!dialog){return false;}else{dialog.querySelector('.dialog-close').removeEventListener('click',function(){devtools.dialog.close(this.parentNode.getAttribute('id').replace(/^devtools-dialog-/,''));},false);var inputs=this.getInputs(id);dialog.parentNode.removeChild(dialog);}if(document.querySelector('div[id*="devtools-dialog-"]')==null){var wrapper=document.getElementById('devtools-wrapper');wrapper.parentNode.removeChild(wrapper);var styles=document.querySelectorAll('head style[id^="devtools-dialog-theme-"]');for(var i=0;i<styles.length;i++){styles[i].parentNode.removeChild(styles[i]);}}return inputs;},setDefaults:function(options){this.__userDefaults={};for(var i in options){if(this.__defaults.hasOwnProperty(i)){this.__userDefaults[i]=options[i];}}},defineToken:function(tag,attributes,replacement){if(typeof tag!='string'||/^\w+$/.test(tag)===false){return false;}if(typeof this.__tokens[tag]!='undefined'){return false;}if(typeof attributes=='object'&&attributes!=null){for(var a in attributes){if(!attributes.hasOwnProperty(a)){continue;}if(typeof attributes[a].validation=='undefined'){return false;}}}else{attributes={};}if(typeof replacement!='function'&&typeof replacement!='string'){return false;}this.__tokens[tag]={attributes:attributes,replacement:replacement};return true;},defineTheme:function(name,css,base){if(typeof name!='string'||typeof css!='string'){return false;}if(!/^\w+$/.test(name)||name=='default'){return false;}var cssOut='';var bases={};var baseTmp=base;if(typeof base=='string'){for(var i=0;i<5;i++){if(this.__themes[baseTmp]&&!bases[baseTmp]){cssOut='/* devtools.dialog prerequisite theme: '+baseTmp+' */\n'+this.__themes[baseTmp].css+'\n\n'+cssOut;bases[baseTmp]=true;baseTmp=this.__themes[baseTmp].base;}else{break;}}}else{base=null;}cssOut=('/* devtools.dialog base reset */\n'+this.__themes._base.css+"\n\n"+cssOut+'/* devtools.dialog theme: '+name+' */\n'+css).replace('%theme%',name);this.__themes[name]={base:base,finalcss:cssOut,css:css};return true;},defineHook:function(name,func){if(typeof this.__hooks[name]!='undefined'||typeof func!='function'){return false;}this.__hooks[name]=func;return true;},getInputs:function(id){if(!id){if(!this.__var.lastDialogId){return false;}id=this.__var.lastDialogId;}var dialog=document.querySelector('#devtools-dialog-'+id);if(dialog){var out={},i,j;var simpleInputs=dialog.querySelectorAll('[data-devtools-input="text"], [data-devtools-input="select"]');for(i=0;i<simpleInputs.length;i++){out[simpleInputs[i].getAttribute('name')]=simpleInputs[i].value;}var checkboxInputs=dialog.querySelectorAll('[data-devtools-input="checkbox"]');for(i=0;i<checkboxInputs.length;i++){out[checkboxInputs[i].getAttribute('name')]=(checkboxInputs[i].checked)?true:false;}var radioInputs=dialog.querySelectorAll('[data-devtools-input="radio"]');var radios;for(i=0;i<radioInputs.length;i++){radios=radioInputs[i].querySelectorAll('input');for(j=0;j<radios.length;j++){if(radios[j].checked){out[radios[j].getAttribute('name').split('-')[0]]=radios[j].value;break;}}}return out;}return false;},__var:{lastDialogId:false},__defaults:{title:'Script Notification',message:'This is a dialog from a userscript.',mask:true,closeButton:true,location:'center',buttons:null,theme:'default',class:''},__settingsValidation:{title:['type','string'],message:['type','string'],mask:['type','boolean'],closeButton:['type','boolean'],location:['match',/^(top-left|top|top-right|left|center|right|bottom-left|bottom|bottom-right)$/],buttons:null,theme:null,class:['match',/^[\w- ]+$/]},__themes:{'_base':{css:'#devtools-wrapper,#devtools-wrapper *{border-radius:0!important;box-shadow:none!important;background:transparent!important;border:none!important;border-collapse:separate!important;border-spacing:0!important;color:#000!important;float:none!important;font-family:Arial,sans-serif!important;font-size:12px!important;font-weight:400;height:auto!important;letter-spacing:normal!important;line-height:18px!important;margin:0!important;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:1.0!important;padding:0!important;text-align:left!important;text-decoration:none!important;text-shadow:none!important;text-transform:none!important;vertical-align:middle!important;visibility:hidden!important;white-space:normal!important;width:auto!important;}#devtools-wrapper .dialog-content>div:nth-last-child(-n+4)>label>span{position:relative;top:2px}#devtools-wrapper .dialog-content fieldset>label>input{position:relative;top:2px}'+'#devtools-wrapper{background-color:rgba(0, 0, 0, 0.8)!important;display:block!important;height:100%!important;left:0!important;overflow:auto!important;position:fixed!important;top:0!important;visibility:hidden!important;width:100%!important;z-index:2147483640!important;}'+'#devtools-wrapper.mask{background-color:rgba(0, 0, 0, 0.8)!important;visibility:visible!important;}'+'#devtools-wrapper .grid{display:table!important;height:100%!important;position:fixed!important;visibility:hidden!important;width:100%!important;}'+'#devtools-wrapper .center,#devtools-wrapper .top,#devtools-wrapper .bottom,#devtools-wrapper .left,#devtools-wrapper .right{display:table-cell!important;padding:15px!important;}'+'#devtools-wrapper .left,#devtools-wrapper .center,#devtools-wrapper .right{vertical-align:middle!important;}'+'#devtools-wrapper .top{vertical-align:top!important;}'+'#devtools-wrapper .bottom{vertical-align:bottom!important;}'+'#devtools-wrapper .left .dialog{clear:both!important;float:left!important;}'+'#devtools-wrapper .right .dialog{clear:both!important;float:right!important;}'+'#devtools-wrapper .center .dialog,#devtools-wrapper .bottom .dialog,#devtools-wrapper .top .dialog{margin-left:auto!important;margin-right:auto!important;}'+'#devtools-wrapper .dialog,#devtools-wrapper .dialog *{visibility:visible!important;}'+'#devtools-wrapper .dialog fieldset{border:1px solid #000!important;padding:5px!important;}'+'#devtools-wrapper .dialog legend{padding:0 5px!important;}'+'#devtools-wrapper .dialog input[type="text"],#devtools-wrapper input[type="password"],#devtools-wrapper textarea,#devtools-wrapper select{-moz-box-sizing:border-box!important;background-color:#fff!important;border:1px solid #000!important;box-sizing:border-box!important;padding:2px!important;width:100%!important;}'+'#devtools-wrapper .dialog input[type="checkbox"],#devtools-wrapper input[type="radio"]{margin-right:6px!important;vertical-align:top!important;}'+'#devtools-wrapper .dialog input[type="radio"]+span{margin-right:12px!important;vertical-align:middle!important;}'+'#devtools-wrapper .dialog .progress-bar{-moz-box-sizing:border-box!important;background-color:#fff!important;border:1px solid #000!important;box-sizing:border-box!important;height:20px!important;margin-left:auto!important;margin-right:auto!important;overflow:hidden!important;position:relative!important;width:100%!important;}'+'#devtools-wrapper .dialog .progress-bar-inner{background-color:#000!important;height:100%!important;left:0!important;position:absolute!important;top:0!important;}'+'#devtools-wrapper .dialog .progress-bar-text{height:100%!important;position:relative!important;text-align:center!important;width:100%!important;z-index:1!important;}'+'#devtools-wrapper .dialog .dialog-content br:first-child, #devtools-wrapper .dialog .dialog-content br:last-child{display:none!important;}'+'#devtools-wrapper .dialog strong{font-weight:bold!important;}'+'#devtools-wrapper .dialog em{font-style:italic!important;}'+'#devtools-wrapper .dialog ins{text-decoration:underline!important;}'+'#devtools-wrapper .dialog a:link,#devtools-wrapper .dialog a:hover{color:EE0000!important;text-decoration:underline!important;}'+'#devtools-wrapper .dialog a:visited{color:#74198b!important;}'},'default':{css:'#devtools-wrapper .dialog{border-radius:10px!important;box-shadow:0 0 50px #000!important;background-color:#eee !important;margin-bottom:5px!important;margin-top:5px!important;padding:5px!important;position:relative!important;width:200px!important;}'+'#devtools-wrapper .dialog .dialog-close span{color:#eee!important;font-size:18px!important;font-weight:700;line-height:25px!important;vertical-align:middle!important;}'+'#devtools-wrapper .dialog .dialog-close:hover{border-color:orange!important;}'+'#devtools-wrapper .dialog .dialog-close:hover span{color:orange!important;}'+'#devtools-wrapper .dialog .dialog-title{border-radius:5px!important;background-color:#444!important;color:#eee!important;height:15px!important;padding:4px 0 7px 0!important;text-align:center!important}'+'#devtools-wrapper .dialog .dialog-title span{color:#eee!important;font-size:14px!important;font-weight:700;}'+'#devtools-wrapper .dialog .dialog-content{color:#000!important;margin:10px 5px!important;max-width:100%!important;}'+'#devtools-wrapper .dialog .dialog-footer{text-align:center!important;width:100%!important;}'+'#devtools-wrapper .dialog .dialog-footer button{border-radius:10px!important;background-color:#444!important;color:#eee!important;cursor:pointer!important;display:inline-block!important;height:25px!important;margin-left:2px!important;margin-right:2px!important;padding:0 5px!important;}'+'#devtools-wrapper .dialog .dialog-footer button:hover{background-color:orange!important;color:#444!important;}'+'#devtools-wrapper .dialog .dialog-footer button img{margin-right:3px!important;vertical-align:top!important;}'+'#devtools-wrapper .dialog hr{background-color:#ddd!important;margin:7px 0 7px 0!important;padding:0.5px!important;}'+'#devtools-wrapper .dialog fieldset{border-radius:4px!important;border:1px solid #aaa!important}'+'#devtools-wrapper .dialog label{display:block!important;font-weight:bold!important;}'+'#devtools-wrapper .dialog label span{font-weight:normal!important;}'+'#devtools-wrapper .dialog legend{font-weight:bold!important;}'+'#devtools-wrapper .dialog input[type="text"],#devtools-wrapper input[type="password"],#devtools-wrapper textarea,#devtools-wrapper select{border-radius:4px!important;background-color:#fafafa!important;border:1px solid #ddd!important}'+'#devtools-wrapper .dialog input[type="text"]:focus,#devtools-wrapper input[type="password"]:focus,#devtools-wrapper textarea:focus,#devtools-wrapper select:focus{border:1px solid #444!important;}'+'#devtools-wrapper .dialog input[type="checkbox"] label{display:block!important;}'+'#devtools-wrapper .dialog .progress-bar{border-radius:5px!important;background-color:#fafafa!important;border:1px solid #ddd!important}'+'#devtools-wrapper .dialog .progress-bar-inner{border-radius:5px!important;background-color:#444!important}'+'#devtools-wrapper .dialog .progress-bar-text{text-shadow:#f2f2f2 -1px 0 3px #f2f2f2 0 -1px 3px #f2f2f2 1px 0 3px #f2f2f2 0 1px 3px #f2f2f2 -1px -1px 3px #f2f2f2 1px 1px 3px!important;}#devtools-wrapper .dialog-content div:nth-child(2) label{margin-top:6px!important}#devtools-wrapper .dialog-content div:nth-child(2) label span{position:relative!important;top:2px!important}'}},__tokens:{'progressbar':{attributes:{'percent':{defaultValue:'',validation:/^(100|\d{1,2})$/},'calculate':{defaultValue:'',validation:/^\s*\d+\s*\/\s*\d+\s*$/}},replacement:function(tag){var p;if(tag.attributes.calculate!=''){p=/^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(tag.attributes.calculate);if(p){p=(p[1]/p[2])*10000;p=Math.round(p)/100;}else{p=0;}}else if(tag.attributes.percent!=''){p=tag.attributes.percent;}else{return false;}if(p>100){p=100;}if(p<0){p=0;}p+='%';return'<div class="progress-bar"><div class="progress-bar-text">'+p+'</div><div class="progress-bar-inner" style="width: '+p+' !important;"></div></div>';}},'input':{attributes:{'type':{validation:/^(text|textarea|radio|checkbox|select|password|button)$/},'name':{validation:/^\w+$/},'label':{defaultValue:'',validation:false},'options':{defaultValue:'',validation:/^{.+}$/},'defaultValue':{defaultValue:'',validation:false},'hook':{defaultValue:'',validation:/^\w+$/}},replacement:function(tag){var r=false;switch(tag.attributes.type){case 'text':r='<label>'+tag.attributes.label+'<input type="text" name="'+tag.attributes.name+'" value="'+tag.attributes.defaultValue+'" data-devtools-input="text"/></label>';break;case 'password':r='<label>'+tag.attributes.label+'<input type="password" name="'+tag.attributes.name+'" value="'+tag.attributes.defaultValue+'" data-devtools-input="text"/></label>';break;case 'textarea':r='<label>'+tag.attributes.label+'<textarea name="'+tag.attributes.name+'" data-devtools-input="text">'+tag.attributes.defaultValue+'</textarea></label>';break;case 'checkbox':r='<div><label><input type="checkbox" name="'+tag.attributes.name+'"'+((tag.attributes.defaultValue=='true')?' checked':'')+' data-devtools-input="checkbox"/><span>'+tag.attributes.label+'</span></label></div>';break;case 'radio':try{var options=devtools.JSON.parse(tag.attributes.options);var hash=Math.floor(Math.random()*100000);r='<div data-devtools-input="radio"><fieldset><legend>'+tag.attributes.label+'</legend>';for(var key in options){r+='<label><input type="radio" name="'+tag.attributes.name+'-'+hash+'" value="'+options[key]+'"';r+=((tag.attributes.defaultValue==options[key])?' checked':'')+'/><span>'+key+'</span></label>';}r+='</fieldset></div>';}catch(e){return false;}break;case 'select':try{var options=devtools.JSON.parse(tag.attributes.options);r='<div><label>'+tag.attributes.label+'</label>';r+='<select name="'+tag.attributes.name+'"'+((tag.attributes.hook=='color')?' data-devtools-hook="'+tag.attributes.hook+'"':'')+' data-devtools-input="select">';for(var key in options){if(typeof options[key]=='string'){r+='<option value="'+options[key]+'"';r+=(tag.attributes.hook=='color'&&/^#[0-9a-f]{3,6}$/i.test(options[key]))?' style="background-color:'+options[key]+' !important;"':'';r+=((tag.attributes.defaultValue==options[key])?' selected':'')+'>'+key+'</option>';}}r+='</select></div>';}catch(e){return false;}break;}return r;}}},__hooks:{'color':function(){var el=document.querySelectorAll('[data-devtools-hook="color"]');if(!el){return;}setInterval(function(){var el=document.querySelectorAll('[data-devtools-hook="color"]');if(el){for(var i=0;i<el.length;i++){if(/^#[0-9a-f]{3,6}$/i.test(el[i].value)){el[i].setAttribute('style','background-color: '+el[i].value+' !important');}}}},500);}},__userDefaults:{},__setting:{},__handleHooks:function(){for(var hook in this.__hooks){this.__hooks[hook]();}},__setVars:function(options){this.__setting={};var out=this.__copyObj(this.__defaults);var setting,validationCopy,validationCount,valid;for(setting in this.__userDefaults){if(this.__defaults.hasOwnProperty(setting)){out[setting]=this.__copyObj(this.__userDefaults[setting]);}}if(typeof options=='object'){for(setting in options){if(this.__defaults.hasOwnProperty(setting)){out[setting]=options[setting];}}}for(setting in out){if(setting=='buttons'){this.__setting[setting]=this.__validateButtons(out[setting]);continue;}if(setting=='theme'){this.__setting[setting]=this.__validateTheme(out[setting]);continue;}if(this.__settingsValidation.hasOwnProperty(setting)){validationCopy=this.__copyObj(this.__settingsValidation[setting]);valid=false;switch(validationCopy.shift()){case 'type':for(validationCount=0;validationCount<validationCopy.length;validationCount++){if(validationCopy[validationCount]=='array'){if(out[setting]instanceof Array){valid=true;this.__setting[setting]=out[setting];break;}else if(this.__userDefaults[setting]instanceof Array){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}else if(typeof out[setting]==validationCopy[validationCount]){valid=true;this.__setting[setting]=out[setting];break;}else if(typeof this.__userDefaults[setting]==validationCopy[validationCount]){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}break;case 'match':for(validationCount=0;validationCount<validationCopy.length;validationCount++){if(validationCopy[validationCount].test(out[setting])){valid=true;this.__setting[setting]=out[setting];break;}else if(validationCopy[validationCount].test(this.__userDefaults[setting])){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}break;}if(!valid){this.__setting[setting]=this.__copyObj(this.__defaults[setting]);}}}},__validateButtons:function(buttons){var btns=[];if(typeof buttons=='object'&&buttons instanceof Array){var btnNum,btnAttr,o;button:for(btnNum=0;btnNum<buttons.length;btnNum++){if(typeof buttons[btnNum]!='object'){continue button;}for(btnAttr in buttons[btnNum]){o=buttons[btnNum][btnAttr];switch(btnAttr){case 'text':if(typeof o!='string'){o='';}break;case 'tooltip':if(typeof o!='string'){o=false;}break;case 'icon':if(typeof o!='string'){o=false;}break;case 'callback':if(typeof o!='function'){continue button;}break;}}btns.push(buttons[btnNum]);}}return btns;},__validateTheme:function(theme){if(typeof theme!='string'||theme==''){return this.__defaults.theme;}if(typeof this.__themes[theme]=='object'&&this.__themes[theme]!==null){var t=this.__themes[theme];if(t.base){if(typeof this.__themes[t.base]=='object'&&this.__themes[t.base]!==null){return theme;}else{return this.__defaults.theme;}}else{return theme;}}return this.__defaults.theme;},__parseTokens:function(text){var tagSplitRegex=/({\s*\w+\s*(?:\w+(?:\s*=\s*(?:".*?"|'.*?'))?\s*|\s*)})/;var tagRegex=/{\s*(\w+)\s*(?:(\w+(?:\s*=\s*(?:".*?"|'.*?'))?)+\s*|\s*)}/;var attrRegex=/(\w+)\s*=\s*(".*?"|'.*?')/g;var text_obj=text.split(tagSplitRegex);var i,match,attr,tag;token_search:for(i=1;i<text_obj.length;i+=2){tag={};match=tagRegex.exec(text_obj[i]);tag.name=match[1];tag.attributes={};if(typeof this.__tokens[tag.name]=='undefined'){continue;}if(typeof match[2]!='undefined'){while((attr=attrRegex.exec(match[2]))!=null){attr[2]=attr[2].substring(1,attr[2].length-1);if(typeof this.__tokens[tag.name].attributes[attr[1]]=='undefined'){continue;}if(this.__tokens[tag.name].attributes[attr[1]].validation===false){tag.attributes[attr[1]]=attr[2];}else if(this.__tokens[tag.name].attributes[attr[1]].validation.test(attr[2])){tag.attributes[attr[1]]=attr[2];}else if(typeof this.__tokens[tag.name].attributes[attr[1]].defaultValue=='string'){tag.attributes[attr[1]]=this.__tokens[tag.name].attributes[attr[1]].defaultValue;}else{continue token_search;}}}for(attr in this.__tokens[tag.name].attributes){if(!this.__tokens[tag.name].attributes.hasOwnProperty(attr)){continue;}if(typeof tag.attributes[attr]=='undefined'){if(typeof this.__tokens[tag.name].attributes[attr].defaultValue=='string'){tag.attributes[attr]=this.__tokens[tag.name].attributes[attr].defaultValue;}else{continue token_search;}}}var rep=this.__tokens[tag.name].replacement;if(typeof rep=='string'){text_obj[i]=rep;}else if(typeof rep=='function'){var rep_result=rep(tag);if(typeof rep_result!='string'){continue token_search;}text_obj[i]=rep_result;}}return text_obj.join('');},__copyObj:function(obj){if(obj==null||typeof(obj)!='object'||obj instanceof RegExp){return obj;}var c=new obj.constructor();for(var key in obj){c[key]=this.__copyObj(obj[key]);}return c;}};
if(typeof devtools.dialog!='undefined'){devtools.config={open:function(){var msg=(typeof this.__options.html=='string')?this.__options.html+'<hr/>':'';for(var name in this.__options.settings){msg+=this.__options.settings[name].input;}devtools.dialog.open({message:msg,title:this.__options.title,mask:true,buttons:[{text:'Save',icon:this.__icons.save,callback:this.__save},{text:'Save & Reload',icon:this.__icons.save,callback:function(){devtools.config.__save();document.location.reload();}},{text:'Close',icon:this.__icons.close,callback:this.close}],theme:(typeof this.__options.theme.css=='string')?'devtoolsconfig':'default'},'devtools-config');},close:function(){devtools.dialog.close('devtools-config');},get:function(name){if(this.__options.settings[name]!==null&&typeof this.__options.settings[name]!='undefined'){return getValue('devtools-config-'+name,this.__options.settings[name].defaultValue);}return undefined;},getAll:function(){var vals={};var allVals=listValues();for(var val in allVals){if(/^devtools-config-/.test(val)){vals[val]=this.get(val);}}return vals;},init:function(options){if(typeof options!='object'||!options){return false;}if(!options.settings){return false;}if(options.prefix){this.__options.prefix=options.prefix;}this.__options.title=(typeof options.title=='string')?options.title:'Configuration Options';var setting,name;for(name in options.settings){if(!/^\w+$/.test(name)||!options.settings.hasOwnProperty(name)){continue;}this.__options.settings[name]={};setting=options.settings[name];if(typeof setting.type=='string'){if(setting.type=='text'||setting.type=='textarea'||setting.type=='password'){this.__options.settings[name].defaultValue=(typeof setting.defaultValue=='string')?setting.defaultValue:'';this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+(this.get(name)||this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"}';}if(setting.type=='checkbox'){this.__options.settings[name].defaultValue=(setting.defaultValue==true||setting.defaultValue=='true')?true:false;this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+((typeof this.get(name)=='boolean')?this.get(name):this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"}';}if(setting.type=='radio'||setting.type=='select'){this.__options.settings[name].defaultValue=(typeof setting.defaultValue=='string')?setting.defaultValue:'';this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+(this.get(name)||this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"';this.__options.settings[name].input+=' options="'+((typeof setting.options=='object')?devtools.JSON.stringify(setting.options):'')+'"';this.__options.settings[name].input+=((setting.colorHook===true&&setting.type=='select')?' hook="color"':'')+'}';}}}this.__options.html=(typeof options.html=='string')?options.html:false;this.__options.theme.useBase=(options.useBase===false)?false:true;this.__options.theme.css=(typeof options.css=='string')?options.css:null;if(typeof this.__options.theme.css=='string'){devtools.dialog.defineTheme('devtoolsconfig',this.__options.theme.css,((this.__options.theme.useBase)?'default':null));}this.__initSettings=options;return true;},__initSettings:null,__save:function(options){options=devtools.dialog.getInputs('devtools-config');for(var name in options){if(!options.hasOwnProperty(name)){continue;}setValue('devtools-config-'+name,options[name]);}var img=document.querySelector('#devtools-dialog-devtools-config [data-devtools-dialog-button="Save"] img');img.src=devtools.config.__icons.savecomplete;setTimeout(function(){img.src=devtools.config.__icons.save;},2000);devtools.config.init(devtools.config.__initSettings);return true;},__options:{title:'',html:'',theme:{useBase:true,css:false},settings:{},prefix:'my_storage_prefix'},__icons:{save:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKCSURBVHjaYjTL3lPIwMAgD8Q2QKwExDwMDP9ZgDQjw38GMGBmYmRgAuL///8x/PvH8IGNleHO95+/O09N81wDEEAghVqzS61SQOrVpdnBev7/+8/w6w8Q//4H1szJzsTAyMjA8OX7P4YvP/7y33v+xWDhzrszzLK28QMEEBNQvS1I1/pTnxiA+oC2/GfIm3waaBOQA9TFygKxHWTgd6CBf/4xMP5lYGKJd1cW5mRnmwoQQCADJEC2gjT8Bsr+/gNx928gn4WZAWwASO77L6gc0IIDlz8zsLEyM3z/+YcNIIBAXuD68w/scLAiEGACufc/SDPQ6UD4A2jz95//gS78D3YliH729gfIMEaAAGIBBdhfoAAQMfyE2l6bYADWDEQMv//+Z/j2E+R0cAACzQXCfyDX/AUHKkAAgUP7318GsNOaF5wHehvoZ0aY7QwMINf9AXoNGiFgICAgBDSAGawHIIBYGMBOApn+l0FMXBoUGZD4A+uAOhlo4///UC+AnAG05PfvP6DoYgAIIJALGP7+BRsGBoxwBgPEyf8h4QOh/oPlQU7//RuSLgACCGzAn7//GKBWgv0ICjgGsEKIf8H+Btv+F5xGgCyGn7//g10AEECgQGT4+w/i5LpIGQZiQOnsq8BwgbgEIIBYQFH2Fxa6QEMmHkvBqznPcjbQy3/ACQukASCAWCB+/Q8OcRCwkokl6IJ/QBv//gYnPwaAAGIB+u0/0AuMsDA49mQxXs0msnZAF/wFpw+QXoAAYgFa/uDXn3+Kxspc4AxTYD2HoAvEeYEu+Au28D1AADGaZe3qBxqkBnSBJdBIQZCzwFH3/x84kJBpWMxAIv3/ZwZGpssAAQYAIXxui1/HoMEAAAAASUVORK5CYII%3D',savecomplete:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAAN6SURBVDhPTZLrT5tlGIf7HziDi/GLZsk0ZsYYDq0YsrEAbrq5KPvieWEwOk6DSWYmh204YYByBoHCKO06oIVWThaEopgFNrp1DOQwgoMhOg6FVqDjVA6XT19j4ocrT94373397vt+H5kitusLQYHAJnAK3IpYy64ARcy/vBXXRUD8z/gk6tibHbLpVfz6yt7SA917dV57ZKKgcnBqjcGpdTa2dlkXrG3usLS6jX3JjWNlS3qedTl46eY+Tna+x7leJaHifFH92phHMDb4eI20+nnW3KLYvcOZnD6cri3sy1usrG1L4qQ7Vwg2B1I4kkXS/QQKR7M5YNyPR7A0IASX9XMsi489eATzy26cT7dYF8K+2X72aJ4hdySDRJtSouBhphC8IgnctolVIZhlTrTsQZlrZV6cro0dNkRXQS1vE289S/F4NlH3PqFqsoTPb32Id36UR2DZtT56yqW6Wf5Y3JT407Ep0rel9MoRLT6Nb6CZKuOr4VhKJ3LIGL7EoaZgfGMbJAFa221OaPIJzbtBpEg/m2clrugeyqJunlO/QJFILp7MJGciDe10OYfbAkhv/xE/ZSuy56+eZH/NPt5tC8FL8yzyqghSbk6TopvGX3uKUz0fUfvkOlmTyfxgryHaGk6oPpUK8wR+kc3IZKUyrg1cJl8sKG/0mtSuj/pjwnQmXm14GeOcjpK/MjEuaCl5nMOhxqMkXO/n+6ZxfM80CkGZjCLxS1IenCdt6Etp1qMdQYhLQvbYVfT2KqrtRTQ76njHEoxS3cF51Sh5DSP4RpjECN+E4t/sh+r3AjJGk/hu/Ar6mWrShpNodRhQLxTS5WrhwkAcqocV0p04VzrEt3W/4RMulugvlnjE9CmB5gC0U+XkT6STKeZtWdRTs6ii3WWkeqaM4+2BZP0aLt3KmOIHpOv68TldLwRxFtpsThSazzhuOYJhRkPFkzwKZ9Ix/F1Fh6uRD345hmGklluPuiVBVMF9vlbbhECP7M3Yzt3Wuw6Sb0wR35vAQbM/hjkNRqeG7lUzyUOJRFrel9L/6yAy9y6plVa8w+p2ZfKYzknT7QVMvXZpvovWixyzhNDiNKCaLiCyJ1x6/39SK/pIKr/jEThkipjOfHl0h1ke/ZNTHtWOPMqMPCeRg02HCTKdQHFBhU+EUSysXrRsEEV6Kdk7rHbZ+7S+5x96SM+LUN/dOQAAAABJRU5ErkJggg==',close:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII%3D'}};}
devtools.config.init({
  title: fe17,
  settings: {
    'itemCount': {type: 'checkbox', label: fe18, defaultValue: false},
    'caseSensitive': {type: 'checkbox', label: fe16, defaultValue: false},
    'showClear': {type: 'checkbox', label: fe7, defaultValue: false},
    'showTips': {type: 'checkbox', label: fe21, defaultValue: true}
  },
  css: '\
    #devtools-wrapper .dialog input[type="checkbox"]{margin:5px 6px 3px 6px!important}\
    #devtools-wrapper .dialog-content div:first-child{margin-bottom:-6px!important}\
    #devtools-wrapper .dialog .dialog-close span{display:none!important}\
    #devtools-wrapper .dialog .dialog-footer button:first-child{display:none!important}'
});
var caseSensitive = devtools.config.get('caseSensitive');
var showClear = devtools.config.get('showClear');
var itemCount = devtools.config.get('itemCount');
var showTips = devtools.config.get('showTips');
if(!getValue('Keywords')) setValue('Keywords', '\u2007');
if(getValue('Keywords') == 'undefined') setValue('Keywords', '\u2007');
if(getValue('Keywords').indexOf('<>') == -1 && getValue('Keywords') != '\u2007')
  setValue('Keywords', getValue('Keywords').replace(/,(?!\s)/g, '<>'));
if(!getValue('showFiltered')) setValue('showFiltered', false);
if(!getValue('insertText')) setValue('insertText', false);
var showFiltered = getValue('showFiltered');
var insertText = getValue('insertText');
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
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
}
function getKey(e) {
  var ki = $('#keywordIn'), gvkw = getValue('Keywords');
  if(e.button == 1  && gvkw != '\u2007') ki.value = gvkw;
} 
/*
function genKey() {
  var ki = $('#keywordIn');
  if(ki.value == '') return;
  var gvkw = getValue('Keywords');
  if(gvkw == '\u2007') setValue('Keywords', ki.value);
  else setValue('Keywords', gvkw + '<>' + ki.value);
  ki.value = '';
  document.location.reload();
}
*/
//vv
function genKey() {
  var ki = $('#keywordIn');
  if(ki.value == '') return;
  var gvkw = getValue('Keywords');
  if(gvkw == '' || gvkw == '\u2007') {
    setValue('Keywords', ki.value);
  } else {
    var aaa = ki.value.split('<>'), bbb = gvkw.split('<>'), array = [];
    for(var i in aaa) {
      for(var j in bbb) if(bbb[j].indexOf(aaa[i]) > -1) array.push(aaa[i]);
    }
    if(array.length > 0) {
      alert("Duplicates:  " + array.toString().replace(/,/g, ' & '));
      var kkk = ki.value.split('<>'), www = [];
      for(var i in array) {
        for(var j in kkk) if(kkk[j].indexOf(array[i]) == -1) www.push(kkk[j]);
      }
      //array = [];
      //zzz = [];
      ki.value = www.toString();
      return;
    }
    setValue('Keywords', gvkw + '<>' + ki.value);
  }
  ki.value = '';
  document.location.reload();
}
function remKey() {
  var ki = $('#keywordIn'), gvkw = getValue('Keywords');
  if(ki.value == '' || gvkw == '\u2007') return;
  if (confirm(fe20 + '\u2003' + ki.value.replace(/<>/g, '\n\u2003')) == false) return;
  var names = [], undo = [], kw = gvkw.split('<>'), kwu = ki.value.split('<>');
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
  if(newStr == '') newStr = '\u2007';
  setValue('Keywords', newStr);
  ki.value = '';
  document.location.reload();
}
function getActiveText() { 
  var getText = '', ki = $('#keywordIn');
  getText = getSelection().toString();
  if(getText != '') {
    if(ki.value == '') ki.value = getText.trim();
    else ki.value = ki.value + '<>' + getText.trim();
} }
function getListText() {
  if(!$('#listBox') && getValue('Keywords') != '\u2007' && getValue('Keywords') != '') {
    var listdiv = $c('div', {id:'listBox', innerHTML:getValue('Keywords').replace(/<>/g, '<><br>')});
    var head = $c('td', {id:'listHeader', innerHTML:fe24 + '<br>'});
    listdiv.insertBefore(head, listdiv.firstChild);
    document.body.appendChild(listdiv);
  }
  $('#listBox').addEventListener('mouseout', function(){document.body.removeChild(listdiv)}, false);
  $('#listBox').addEventListener('mouseup', getText, false);
}
function getText() { 
  var gText = '', ki = $('#keywordIn');
  gText = getSelection().toString();
  if(gText != '') ki.value = ki.value + gText;
}
function getInsertText() { 
  var gB = getValue('insertText') != false ? false : true, iB = $('#insertBtn');
  setValue('insertText', gB);
  if(gB) {
    $('#Content').addEventListener('mouseup', getActiveText, false);
    iB.setAttribute('style', insertOn);
    iB.title = fe23;
  } else {
    $('#Content').removeEventListener('mouseup', getActiveText, false);
    iB.setAttribute('style', insertOff);
    iB.title = fe22;
} }
function getTip() {
  var tipdiv = $c('div', {id:'tipBox', innerHTML:fe3});
  if(showTips) {
    document.body.appendChild(tipdiv);
    $('#keywordIn').addEventListener('mouseout', function() {document.body.removeChild(tipdiv)}, false);
  } else {
    $('#keywordIn').removeEventListener('mouseout', function() {document.body.removeChild(tipdiv)}, false);
  }
  $('#keywordIn').addEventListener('click', function(e) {getKey(e)}, false);
}
function setFilter() {
  var fCnt = $('#filterCnt').textContent;
  if(fCnt == 0) {
    $('#filterBtn').title = '';
    return;
  } 
  $('#filterBtn').title = fe25;
  var enable = getValue('showFiltered');
  setValue('showFiltered', !enable);
  if(getValue('showFiltered') == true) {
    $('#filterBtn').textContent = fe11 + '\u2007' + fCnt;
    setUnfiltered();
  } else {
    $('#filterBtn').textContent = fe10 + '\u2007' + fCnt;
    setFiltered();
} }
function setUnfiltered() {
  for(var i = 0; i < item.length; i++) {
    if(item[i].getAttribute('filtered')) {
      item[i].style.visibility = 'visible';
      item[i].style.display = 'block';
      item[i].style.height = 'auto';
} } }
function setFiltered() {
  for(var i = 0; i < item.length; i++) {
    if(item[i].hasAttribute('filtered')) {
      item[i].style.visibility = 'collapse';
      item[i].style.display = 'none';
      item[i].style.height = '0';
      item[i].setAttribute('filtered', true);
} } }
function getBookmarks() {
  var a1 = document.body.parentNode.clientHeight, a2 = $('#Head').clientHeight;
  var a3 = $('#Panel').children[0].clientHeight, a4 = $('#Panel').children[1].clientHeight;
  $('#Bookmarks').style.maxHeight = a1 - a2 - a3 - a4 - 40 + 'px';
}
addStyle('\
  #Head{background:-moz-linear-gradient(#599FD8,#2A72AB);position:fixed;top:0;width:100%;z-index:999}\
  body #Head h1{margin:0 10px 0 -10px;padding:6px 0 11px 0}\
  #Head h1 a span{font-style:italic;text-shadow:-2px -2px 2px #000}\
  #Filter{float:right;margin-top:8px}\
  #Filter *{vertical-align:top}\
  #filterCnt{display:none}\
  .forumBtn{border:none;cursor:pointer;height:24px;vertical-align:top;width:24px}\
  #okBtn{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADOUlEQVR42u2VW0iUQRTH/996T9PVWNEsLSgNhbIlL6SZEBUiRElKD92kovAhqcguRA/RhQK7kBRpdzB7iTAsWwNr04TUhC6imQ8Jlqhlq6mlrX79Zxyhwt2U6CFoht+33wzznf+Zc87MavjLTfsv8CcC7iSYTCE+auxChkkP6SafSC/5RgYnIqAhHGU4hqmxabGR3vDGJHZX9uLM4kFEoI+v9diNe1xbSZqV2NfxCvjR10NYivUhpSFGf/jDyC6ELNMtQAZXbAaMs4267aqtGltwnjOPSQfp+52AK4lCEfIokCgCJAQC2MVvrVY7smoOyYcetihMa8lveY2tOMUZsaMP5IszARNisAu52EOnIblOUpgQczDatDYdBoZiJjxpRkMC9MCiQK0jtOMR3kuRSpWfIUcCUThI3+ZioUxtKzmsUniOrMQ7PqtJENYhjgExYBoTn8jEZ8hQXSNvyYAjgRScRgE9D5F184LckOmzMUoDaISVoxLihtXYiWV0SAQlDnYswR2+nSW1qrrGFNhE/4/SeKAsyDJyU3p0n7whbUrWBaHIQjmjb+OoHjo2oIpvx0kFsTkSyMJl5NB8mFyylp4BpeQiaVTB6peVtgD7TDWmzG6GfLCC00kydCdIuSrbMQVSsQ1XsIPJ7uQom8F5xpoCLkjv7zIjqXjK92QGKDo+N35WD8PfYG2Anqw/4fxJ8tCZgJlbL8Re5mANJuMVt56EGs4XCAGzbi6pm1/XihZ4JXQmBHi6eGp2btJ6xDqMA7CoHFSpShpTIITk8LkdG/llNs9FF7NxBk2UbXDvdl81AzNYQkHMshuLqA9d/V1o8m76LLMFXJIZcZJkbxIrt2pANG8IIJ67cGHsLbJAPXiNwORngi97+1A7etNp6zZeyqMHBhE8EU7K1I0EkOVkPwn/aZ1IYaQ8BSOpToM4uyJbt0ghEULiurA7EhDNgwSSxSSdJBBfiGtkBb8JUivE3fpABqSOzzwi9vhx1HtnAqMi4qKIIDFkHkaub3/ipczrah+iPMWF8lyNMR4BKCPCmJ8KijDuo8QNSsCOkcPXrLy3T0RgtLkqg6O/PzZx3oeU4aFfP/z3/5O/A6jQ6xn4X1e3AAAAAElFTkSuQmCC)no-repeat,-moz-linear-gradient(#FFF,#999);border-radius:12px;margin-right:-12px;position:relative;z-index:2}\
  #okBtn:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEUElEQVR42u2VbUxbZRTHzy0t9JZCC6W8D5KJ01IojMJmpma06pYhwcxuMmZiYgejgGkyjWMT2YYwDUwhuBm2smXxhUBi9gGcU+YUrTgRhcHIgi8LYDKpiAYo4/aFC/V/DRhiaLZl2Tef5OQ+9z73/H/PPec55zIajYbu5WD+B9wNIJDjuBiGYVQ+n08u3MMCMF/EcC4sLMxgfcrtdt/0eDzz0PHeCYAxm80XDcbHYvUZ65NXLrR+eM4bplTMuTjuWvOpkxd6enq6AbnucrmmoOW+LYDT6VSYTKbXHtSmPFeyt0i5cu2NNxsoVZtM+vXppI5Q+do7Onr3mM1NgNjxJX9Ab+5WADFe1r7/QcsJnS71ERnLUkBAwL+LTz+zi5TKMIqNiaWC/B0+bbKGaWtr+6mwsLABX3EB4fsTmi6/AIirLSWlL5l2mMqlQVJiWSldGRyi+5PWUkJ8PMWtWePLysxy6zdukgLMsEESn7WshMnLe+rLS5c+a/B6vd2QmYHugj+AtvH4O7bExIRNgYGBNON0UrfdTpzHQw9l6iknJ+c3JL43JSUlet/L5RshIXJzc4tRapUzPz9fCNW7kBmDrmdVQFhY2LaqmqPNCoUiTozQ/O5w0LG6WpqcnJxee1+S56OO9q9wks7L5XJJxauVL2YbjVqOc5FMGsgbDYYOhOk4ZH6A7s1VARkZGXuKLCWvy2SySAjR5xc7qaKiYgzzT7H8C8wBuxoaGhqwq6CgtKamptjldtPgwIDv2d27L8/OztZi/WvoTq8KSEtLK91rKdkfFRWVKDhaigr5vr6+TwA4jeUfRSKRF3NOrVYrSsteOHj4UOXzgt+3PT20dcuWXgDqcPsFdKdWBcD5ycqq6rPGzY+qOZeLqqur3a0tLa1I3ins2mG322vKy8u/i46Ozs7JzUvfadqeJPh1dXUJ+fkGOagXbv0CpqenM8xFxS0bsjLjjIbskLGxX30WS/H3VwcHmxF3x/j4+PnaumM3ppxO9mjVkXDhJAl+b9XXLx48cKBzfn5eyMFl6M6sCpiYmIjT6XT7H9+Wa02Ij+WfMBrE8zy/2N7e8fPAwMDw6Wbb9v8WDloGwWd2dHS0DXVwBo+u+U3yyMhIMMuyG7INxnpNanq6WCIhZYgcDWjBe2PcQfusZUERKhUFy2T/vI+eRFarlWw22xDP8zY8+hg27veYDg8PS6RSabhEItmq12e9otGlrUM9MMgBSaUs5eXmUKQ6guTyYEI46GRTE73d2DiJ+TnkrwUSQ7A56PJ+exEgQQBEisXizYj7znUazcMRKnWoIjxcbDQYmRCICzUiEjF0pb+fjhw+1I/QnIBrJ+yv5d37BSxDcFEiiQ/gaGbB0lDBMUItwljsVmjdQu/mEKZeTN/D80HocbdqdishQpdjYQpY9JK48G8Q4CLhVMP4peK7vrR7/rYBK0DiJcHl68qxKORaAC03uDsG3M2454C/AReV7bAs4NcUAAAAAElFTkSuQmCC)no-repeat,-moz-linear-gradient(#090,#050)}\
  #keywordIn{background:-moz-linear-gradient(#999,#FFF);border:1px solid #FFF;color:black;padding:0 16px;height:22px;text-align:center;text-shadow:2px 2px 2px #999;width:201px}\
  #keywordIn:focus{text-align:left}\
  #remBtn{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABQ0lEQVR42mNkoDFgHLVgcFrwH4zgCkyA1H0gfkcTC6CKQoHUPmyWwNQC1RhBHfKBmCAyAuo6i6YwBEjtR7YEyfBJQOoBEK+H0gQtEARiByAOBJoQi2bJASB+i2T4YohdDBugDiDKByAgAMSKQGwI1D0XSUMYkL+KGMMJWYDsGyegKWvQNC4DUn+hhu/DZjixFoCACNCC12gajwGp+dBwf4tLI1EWoKcqJM0pQGodEL8n2wIsSfYbkLoPFNSG8oMYIBH/nmQLsBj+lQESmaBw/w+LfHyWMJJo+D5ouB+ACjv8hwQRTkuIsgDNcOTkKIhmSSDUkg9EWwBU8AlIHcRiOAO6JUC1E4DsBUB8kSgLgJIbIUyGRTgMR7bEDogVoD4gbAEQGACxPQOkbDmIx3AY4GeA5H6Quo/EWIBVA6lgmNZo1AQA4uVyGTkCZW8AAAAASUVORK5CYII=)no-repeat,-moz-linear-gradient(#FFF,#999);border-radius:12px;margin:0 8px 0 -12px}\
  #remBtn:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABQUlEQVR42u2Vz0pCQRTGZ54ghR4g125KWpf4Bka2a9cDRXspElxEmL7ATTfuWvgEtg/TgtpF/S5zlGEYveeGgkQHPr7758z3uzN3rlqz4bL/gO0EfFOLBmsPsTF63QhAIA0siUHmvfRU5EFmmiWqMO4pgJxijz7EC7/CntGDeCagiKqoTsZ5AOmjiRfeSlmoKw+gmkFaBVRCB2Q1PcgZ53ea8CyAP5saoffBkrWxLwlPYuFaQFq7AF4CwBC7lnWfLBuoAoS7yoNcYB00/TUgsmU/sTGXy3J+YtyLn+YGRMI/jHuZXbndzILYnOGJrHtfLldp66yCqABBuL8diwGkLpCZGsCgd2wQCTchhN5Ljm/QSAVgQM+4D+l2SbgPOUJ7MoNsALWPjo37bRmsCJ/XjnFff9r3pgFEB+StP/qPts76Ab4UoBna/YR8AAAAAElFTkSuQmCC)no-repeat,-moz-linear-gradient(#FF404D,#8A1E26)}\
  #listBox,#tipBox,#filterBtn{background:-moz-linear-gradient(#1794D9,#0E5381);border:1px solid #064168;border-radius:6px;box-shadow:0 1px 0 rgba(255,255,255,.35),0 0 2px rgba(255,255,255,.15)inset;color:#FFF;text-shadow:0 -1px 0 rgba(0,0,0,.8)}\
  #filterBtn{height:24px;padding:0 4px 2px 4px}\
  #insertBtn{border:1px solid #064168;border-radius:6px;box-shadow:0 1px 0 rgba(255,255,255,.35),0 0 2px rgba(255,255,255,.15)inset;height:24px;margin:0 8px;vertical-align:top;width:24px}\
  #listBox{height:auto;padding:0 8px 4px 8px;position:fixed;right:356px;text-align:left;top:33px;min-width:55px;text-shadow:1px 1px 1px #000;z-index:999}\
  #listHeader{-moz-user-select:none;pointer-events:none;border-bottom:2px groove #010101}\
  #tipBox{height:auto;padding:0 8px 4px 8px;position:fixed;right:0;text-align:left;top:72px;width:auto}\
  #optBtn{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAC/klEQVR42mNkoDFgHLWAZAvWrl27k5mZ2TkgIIADyP2DQx9baWnpam9vb7+fP38yfP36tS0oKKiaKAtkZWXbr1+/XrF69eoXiYmJktg0TZ069VhWVpbl06dPGbKzszfp6+uHNjU1/SI6iKSkpMpKSko63d3dV2hra0ciy5mamjru2rVrHwcHB8OMGTMY5OXlwa6fPn36qX379i0EOmwqUXEgJycnBfTBUz8/v6nGxsY5MHEvL6+EpUuXzv/16xfD/fv3GUC+ePbsGUNmZiZILg1o+WyiLAABoOvY4+Pjf/j6+rYAXV4LElNWVrYGGnLk+PHjDM7Ozgx///5l4ObmZrh9+/YPNzc38w8fPlwi2gIYqKmp+R8cHFxgaGg4ERjm/ydOnAhKDAx//vxhABrK8PLlS4bKysqJmzdvLiAqDrCBlStX/gdGPsPp06fBhsfFxW1+8uTJA6CPJE+cOLEL6IPZ2PQRbUF0dPT/jIwMhra2Nobv37+fYGVlfbh79+4IQvqIsgAYgf/37t0LSkEMubm5DC0tLQz//v3buG3btgCKLSguLv7Pz8/PAAoee3v7H0BDOfLy8hiOHj3KcODAAQYeHh5mYNj/I8uCoqKi/wICAgy3bt1i0NPTYwAafoydnX0dCwtLz+zZsxkWLFgAEmOQkZExWbFixVmSLAAGxX8JCQmGa9euMejq6jIcO3Zs5aZNm8Bh7urqWgu0qGnOnDkMy5cvZ1i/fj2DioqK3Lx58x4TZQEwWL6IiIhwX7p0icHAwIABmOYPbNiwwRFZDTB5/hcVFWXo7e0FW7J9+3YGYP5gJGhBQkLCQU1NTbvLly+DXX7q1KkzwGRpis0hHh4e/yUlJcEpCxRcr1+/3tjX1xeA1wJg7k0ICQmZDyyPQOn9HTBohPHFE7Cg++jv788nLCzMMG3aNLGbN2++JhhEwEhMAxZmst++fVsL5PIxMTFx/v///zcQg4tvYHHOzMjIyAZkfgbm5ufA+AgCFtuHgUn3FEmpiBpg1AKCAACoKz4oNSRQIAAAAABJRU5ErkJggg==)no-repeat,-moz-linear-gradient(#FFF,#999);border-radius:6px;border:1px solid #FFF;margin-right:2px}\
  #optBtn:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADLklEQVR42mNkoDFgHLWAZAvWrV27k4WZ2dkvIIADyP2DQx9beWnpai9vH78fP38wfP32tS0oMKiaKAvkZWXbr924XrF21aoXcYlJktg0TZ069VhWVpbl06dPGXKysjcZGuiF1jc1/yI6iGQlJcqKS0o7Pd1dV6jr6EUiy5mamTnu2rlzHwcHB8OMGTMY5BXkwa6fPn36qX379i1cvXr1VKLiQEtSXCoqNfWpr7/fVH1jsxyYuJeXV8LSpUvn//r1i+H+/QcMj58+Z3gO9ElWVjpILm3Xrl2zibIABHSlxdjDklJ++Pr6tRiYWdSCxJSUVax379p55Pjx4wzOzs4Mf//+ZeDm5ma4ffv2Dzc3N/MPHz5cItoCGGiqLv9f7ORSwO3sOrEzMON/yeopDGvWrmX48+cPA9BQhpcvXzJUVlZO3Lx5cwFRcYANvOrs+v/r2BGGM6dPM3jfuccQFpm7+fHTJw80NUUlT5w4sQvog9nY9BFtwTU5+f8yE3oYdmTnMrz79fdEhWz1ww8XCiII6SPKAq74K/9DV1kwlEgKMihMmsqwPyUDlEE2Br14FkCxBfLZF/6zCosx3DnylCHPleuH90QXDvOeToYva9YxbDl2jEGCi5k54MHzf2RZIJt14T+7iCjD3RMvGTSd5RheL5pybMKbmeu4mRh6PI8cZnhTVcOwfN9eBh1ZbhOPcw/OkmSBeNK5/wLyUgy3Dj9j0HCSZbi/bffKH0eiwGG+UEK8lp+Jucnz2HGGd80tDCs3bWAw0uGXs9t/5zFRFshlXPnCJSPKfWPPIwYtDwWGe9v2H/hxKMwRWc0SCYn/Snx8DMa7djG8a2ph2LNtC0PsixeMBC1g9z13UNlK1u7GvkcMGo5yDHd2Hz/za7+fKTaHLJeU/K8pKMiguWUrMLiqGL68fLJRff/hALwWsIi5Jgj5z5ovqcHLcH3+xHe/rjQL44unAn7+j8W2tnws0tIMFUuXii388uU1wSBiY2JLY2ATkGX88WotkMvHwszA+ZuR4fcfJoY//0BamNiZgU5hY/jL/Jn1z6fnQoyMQe/+/z/8+///UySlImqAUQsIAgCZdzkoCEq9CwAAAABJRU5ErkJggg==)no-repeat,-moz-linear-gradient(#999,#FFF)}\
  #Head form input.InputBox{color:#000;padding:1px 4px 0 4px;height:22px;margin-right:6px!important;text-align:center}\
  #Head form *{vertical-align:top}\
  #Head form input.InputBox:focus{text-align:left}\
  input.Button {padding:4px 3px 3px 3px}\
  ul#Menu{top:28px}\
  ul#Menu li:not(.Highlight){font-weight:normal}\
  ul#Menu a{border-radius:6px 6px 0 0;height:26px;color:#FFF;text-decoration:none!important}\
  #Menu a:not([href*="/signin?"]){background:#1C5788 -moz-linear-gradient(#1794D9,#0E5381);border:1px solid #064168;box-shadow:0 1px 0 rgba(255,255,255,.35),0 0 2px rgba(255,255,255,.15)inset;text-shadow:0 -1px 0 rgba(0,0,0,0.8)}\
  #Menu a:not([href*="/signin?"]):hover{background:-moz-linear-gradient(#0E5381,#1794D9)}\
  #Menu li.NonTab a[href*="/signout?"]{background:-moz-linear-gradient(#FF404D,#8A1E26);border:1px solid #64090F}\
  #Menu li.NonTab a[href*="/signout?"]:hover{background:-moz-linear-gradient(#8A1E26,#FF404D);border:1px solid #64090F}\
  #Menu li.NonTab a[href*="/signin?"]{background:-moz-linear-gradient(#090,#040);border:1px solid #030;color:#FFF;text-shadow:-1px -1px 1px #000}\
  #Menu li.NonTab a[href*="/signin?"]:hover{background:-moz-linear-gradient(#040,#090)}\
  #Menu li.Highlight a,#Menu li.Highlight:hover a{background:#FFF;border:1px solid #FFF;color:#000;cursor:default;font-size:110%;font-style:italic;text-shadow:2px 2px 2px #999}\
  #Menu li .Alert{background:#FFF;border-radius:6px;color:#000;padding:1px 3px 0 3px}\
  #Menu li.Highlight .Alert,#Menu li.Highlight:hover .Alert{background:#000;border-radius:6px;color:#FFF;font-style:normal;padding:1px 3px 0 3px}\
  #Body{margin-top:72px}\
  #Panel{position:fixed;right:4px;top:72px}\
  #Panel>*:not(.Photo){box-shadow: 4px 4px 4px #666;border-radius:6px;margin-bottom:6px}\
  #Bookmarks{overflow:auto}\
  #Bookmarks a,.Message,pre{word-wrap:break-word}\
  .DataList .Options,.MessageList .Options{margin-right:0}\
  body.Profile #Body #Panel{left:3px;position:fixed;top:72px}\
  body.Profile #Content{margin:0}\
  #Content .Item{padding:2px 20px 2px 4px}\
  #Content .Item:not([filtered]):not(.Mine):hover{background:-moz-radial-gradient(center,ellipse cover,rgba(250,250,250,1)0%,rgba(255,255,255,1)47%,rgba(222,222,222,1)100%)}\
  #Content .Item[filtered]{background:rgba(255,231,237,.7)}\
  #Content .Item[filtered] .Meta strong{background:#900;color:#FFF;text-shadow:1px 1px 1px #000}\
  #Content .Item[filtered] a.Title{color:#900}\
  #Content .ItemContent{margin:0}\
  #Content .Meta a.Category{background:rgba(120,120,120,.1)}\
  .DataList .Options,.MessageList .Options{margin:0}\
  .Mine:hover,.PanelInfo li:not(.Active):hover{background:#F6F4D0}\
  code,pre{white-space:pre-wrap;word-wrap: break-word}\
  #insertBtn:hover{opacity:.8!important}\
');
var insertOff = 'background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAASUlEQVR42mNkwAJEzAL/g+g3p9Yzossx4tIAUgyjidaAzgZrgFmPDpAVIWvCai0+W4nWANNEOw0oTiLJ0yQHKz4NJEUcurNgAADoIFNBKAHn9wAAAABJRU5ErkJggg==)no-repeat center,-moz-linear-gradient(#1794D9,#0E5381);opacity:.5';
var insertOn = 'background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAUklEQVR42mNkwAJEzAL/g+g3p9Yzossx4tLw+uQ6BlHzIAxNeDWAALomRpj16ACmAV0TI7Jp+ABME9EaYJpopwHFSSR5muRgxaeBpIgD0diSBgADaklBhGhkcQAAAABJRU5ErkJggg==)no-repeat center,-moz-linear-gradient(#1794D9,#0E5381)';
var menu = $('#Menu'), stylesSite = $c('li', {id:'StylesSite'});
stylesSite.appendChild($c('a', {title:fe13, textContent:fe12, href:fe19}));
menu.insertBefore(stylesSite, menu.lastElementChild);
var filter = $c('div', {id:'Filter'});
var okButton = $c('button', {id:'okBtn', className:'forumBtn', title:fe6}, [{type:'click', fn:function() {genKey()}}]);
var inputBox = $c('input', {id:'keywordIn', placeholder:fe4}, [{type:'mouseover', fn:function() {getTip()}}]);
var removeButton = $c('button', {id:'remBtn', className:'forumBtn', title:fe2}, [{type:'click', fn:function() {remKey()}}]);
var filterButton = $c('button', {id:'filterBtn', textContent:fe10}, [{type:'click', fn:function() {setFilter()}}]);
var filterCount = $c('button', {id:'filterCnt', textContent:0});
var insertButton = $c('button', {id:'insertBtn'}, [{type:'click', fn:function() {getInsertText()}}]);
var optionButton = $c('button', {id:'optBtn', className:'forumBtn', title:fe1}, [{type:'click', fn:function(){devtools.config.open()}}]);
filter.appendChild(filterButton);
filter.appendChild(filterCount);
filter.appendChild(insertButton);
filter.appendChild(okButton);
filter.appendChild(inputBox);
filter.appendChild(removeButton);
filter.appendChild(optionButton);
var head = $('#Head').childNodes[1];
head.insertBefore(filter, head.childNodes[3]);
$('#filterBtn').addEventListener('dblclick', getListText, false);
$('#keywordIn').addEventListener('dblclick', function() {$('#keywordIn').value = ''}, false);
var docWidth = document.body.clientWidth, a1 = Math.round(docWidth / 1.33), a2 = docWidth - a1;
$('#Body').style.width = docWidth + 'px';
$('#Content').style.width = a1 - 10 + 'px';
$('#Panel').style.width = a2 + 'px';
if($('#Menu').lastElementChild.textContent == 'Sign In') {
  $('#Filter').style.display = 'none';
  addStyle('\
    #Body{margin-top:39px}\
    #Panel{top:39px}\
    body #Head h1{padding:6px 0}\
  ');
}
var formSearch = $('#Form_Search'), div = formSearch.parentNode;
formSearch.placeholder = fe5;
if(showClear) {
  var clearButton = $c('input', {id:'clearBtn', className:'Button', value:fe8, title:fe9, type:'submit'}, [{type:'click', fn:function(e) {var fs = $('#Form_Search'); fs.value = ''; fs.focus(); e.preventDefault()}}]);
  div.insertBefore(clearButton, formSearch);
  addStyle('\
    #Head form{width:300px}\
    #clearBtn{margin-right:6px}\
  ')
}
if(insertText) {
  $('#Content').addEventListener('mouseup', getActiveText, false);
  $('#insertBtn').setAttribute('style', insertOn);
  $('#insertBtn').title = fe23;
} else {
  $('#Content').removeEventListener('mouseup', getActiveText, false);
  $('#insertBtn').setAttribute('style', insertOff);
  $('#insertBtn').title = fe22;
}
//vvvvv
var names = [], undo = [], item = $('.Item'), itemContent = $('.ItemContent'), listCnt = 0;
var ki = $('#keywordIn'), gvkw = getValue('Keywords'), kw = gvkw.split('<>');
if(caseSensitive) ki.placeholder = fe4;
else ki.placeholder = fe14;
for(k = 0; k < kw.length; k++) names.push(kw[k]);
for(var x in names)
for(var i = 0; i < item.length; i++) {
  if(caseSensitive) var word = new RegExp('(\\s|title="|>|\\.)' + names[x] + '(\\.|<|"|\\s)');
  else var word = new RegExp('(\\s|title="|>|\\.)' + names[x] + '(\\.|<|"|\\s)', 'i');
  if(item[i].innerHTML.match(word)) {
  //if(itemContent[i].innerHTML.match(word)) {
    item[i].style.visibility = 'hidden';
    item[i].style.height = '0';
    item[i].setAttribute('filtered', true);
    listCnt++
} }
$('#filterCnt').textContent = listCnt;
if(listCnt == 0) {
  addStyle('#filterBtn{opacity:.5}');
  $('#filterBtn').title = '';
} else {
  addStyle('#filterBtn:hover{background:-moz-linear-gradient(#0E5381,#1794D9)}');
  $('#filterBtn').title = fe25;
}
if(showFiltered) {
  $('#filterBtn').textContent = fe11 + '\u2007' + listCnt;
  setUnfiltered();
} else {
  $('#filterBtn').textContent = fe10 + '\u2007' + listCnt;
  setFiltered();
}
if(itemCount) {
  var item = $('.Item', $('#Content'));
  for(var i = 0; i < item.length; i++)
  if(!item[i].hasAttribute('filtered'))
  item[i].insertBefore($c('span', {className:'fSpan', textContent:i + 1 + '.'}), item[i].firstElementChild);
  addStyle('\
    #Content .fSpan{left:0;position:absolute;text-align:center;width:24px}\
    #Content .Item{padding-left:26px}\
    #Content .Item[filtered]{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABQ0lEQVR42mNkoDFgHLVgcFrwH4zgCkyA1H0gfkcTC6CKQoHUPmyWwNQC1RhBHfKBmCAyAuo6i6YwBEjtR7YEyfBJQOoBEK+H0gQtEARiByAOBJoQi2bJASB+i2T4YohdDBugDiDKByAgAMSKQGwI1D0XSUMYkL+KGMMJWYDsGyegKWvQNC4DUn+hhu/DZjixFoCACNCC12gajwGp+dBwf4tLI1EWoKcqJM0pQGodEL8n2wIsSfYbkLoPFNSG8oMYIBH/nmQLsBj+lQESmaBw/w+LfHyWMJJo+D5ouB+ACjv8hwQRTkuIsgDNcOTkKIhmSSDUkg9EWwBU8AlIHcRiOAO6JUC1E4DsBUB8kSgLgJIbIUyGRTgMR7bEDogVoD4gbAEQGACxPQOkbDmIx3AY4GeA5H6Quo/EWIBVA6lgmNZo1AQA4uVyGTkCZW8AAAAASUVORK5CYII=)no-repeat,rgba(255,231,237,.7)}\
  ')
}
if($('#Bookmarks')) {
  var a1 = document.activeElement.parentElement.clientHeight, a2 = $('#Head').clientHeight;
  var a3 = $('#Panel').children[0].clientHeight, a4 = $('#Panel').children[1].clientHeight;
  $('#Bookmarks').style.maxHeight = a1 - a2 - a3 - a4 - 40 + 'px';
} else {
  var bookMark = $('.Bookmark');
  for(var i = 0; i < bookMark.length; i++) bookMark[i].addEventListener('click', getBookmarks, false);
}
// Smileys
if(!getValue("smileyPosition")) setValue("smileyPosition", "right");
document.addEventListener("click", function(e) {showHide(e)}, false);
document.addEventListener("keypress", function(e) {showHide(e)}, false);
var textar, tagtype = "html";
function setemoticons() {
  var editbar = document.body;
  if(editbar) {
    var bdiv = $c("div",{id:"srEmoticons", align:"center"});
    bdiv.setAttribute("style", "display:none");
    var buttons = "<div id='emoticonContainer'>";
    buttons += emoticonButton("Thankyou!", "http://www.freesmileys.org/smileys/smiley-signs153.gif");
    buttons += emoticonButton("ThreadNice", "http://www.smileyvault.com/albums/forum/smileyvault-nicethread.gif");
    buttons += emoticonButton("ThreadHijacked", "http://www.smileyvault.com/albums/forum/smileyvault-hijacked.gif");
    buttons += emoticonButton("GoodNight", "http://www.freesmileys.org/smileys/smiley-forum/goodnight.gif");
    buttons += emoticonButton("GoogleFriend", "http://www.smilies.4-user.de/include/Schilder/google.gif");
    buttons += emoticonButton("Peace...", "http://www.smileyvault.com/albums/signs/smiley-vault-signs-042.gif"); 
    buttons += emoticonButton("Oops!", "http://smileys.on-my-web.com/repository/Confused/redface-oops-6.gif"); 
    buttons += emoticonButton("SOS", "http://www.freesmileys.org/smileys/smiley-gen164.gif");
    buttons += emoticonButton("Fishing", "http://www.smileyvault.com/albums/character/smiley-vault-character-262.gif");
    buttons += emoticonButton("Huh?", "http://www.mysmiley.net/imgs/smile/sign/sign0035.gif");
    buttons += emoticonButton("Oops!", "http://www.mysmiley.net/imgs/smile/sign/sign0040.gif");
    buttons += emoticonButton("WOW!", "http://www.mysmiley.net/imgs/smile/sign/sign0046.gif");
    buttons += emoticonButton("Cool", "http://www.mysmiley.net/imgs/smile/sign/sign0028.gif");
    buttons += emoticonButton("Smile", "http://www.freesmileys.org/smileys/smiley-basic/smile.gif");
    buttons += emoticonButton("Sad", "http://www.freesmileys.org/smileys/smiley-basic/sad.gif");
    buttons += emoticonButton("Huh", "http://www.freesmileys.org/smileys/smiley-basic/huh.gif");
    buttons += emoticonButton("Dry", "http://www.freesmileys.org/smileys/smiley-basic/dry.gif");
    buttons += emoticonButton("Mellow", "http://www.freesmileys.org/smileys/smiley-basic/mellow.gif");
    buttons += emoticonButton("Died", "http://www.freesmileys.org/smileys/smiley-violent004.gif");
    buttons += emoticonButton("Cool", "http://www.freesmileys.org/smileys/smiley-basic/cool.gif");
    buttons += emoticonButton("Whistle", "http://www.freesmileys.org/smileys/smiley-green/greensmilies-029.gif");
    buttons += emoticonButton("Huh?", "http://smileyjungle.com/smilies/doh28.gif");
    buttons += emoticonButton("Confused", "http://www.smileyvault.com/albums/basic/smileyvault-chin.gif");
    buttons += emoticonButton("What", "http://www.freesmileys.org/smileys/smiley-basic/what.gif");
    buttons += emoticonButton("whao?", "http://www.freesmileys.org/smileys/smiley-basic/spock.gif");
    buttons += emoticonButton("Wink", "http://www.freesmileys.org/smileys/smiley-basic/wink.gif");
    buttons += emoticonButton("OhMy", "http://www.freesmileys.org/smileys/smiley-basic/ohmy.gif");
    buttons += emoticonButton("Laugh", "http://www.freesmileys.org/smileys/smiley-basic/laugh.gif");
    buttons += emoticonButton("Tongue", "http://www.freesmileys.org/smileys/smiley-basic/tongue.gif");
    buttons += emoticonButton("Bleh", "http://www.freesmileys.org/smileys/smiley-fc/bleh.gif");
    buttons += emoticonButton("Tongue", "http://smileys.on-my-web.com/repository/Tongue/mockery-035.gif");
    buttons += emoticonButton("...", "http://smileyjungle.com/smilies/disdain21.gif");
    buttons += emoticonButton("Angel", "http://www.freesmileys.org/smileys/smiley-basic/angel.gif");
    buttons += emoticonButton("Nono", "http://smileyjungle.com/smilies/disdain25.gif");
    buttons += emoticonButton("OhYes!", "http://www.freesmileys.org/smileys/smiley-basic/lol.gif");
    buttons += emoticonButton("ROFL", "http://www.freesmileys.org/smileys/smiley-basic/rofl.gif");
    buttons += emoticonButton("LOL", "http://www.freesmileys.org/smileys/smiley-laughing001.gif");
    buttons += emoticonButton("Hehaha!", "http://www.freesmileys.org/smileys/smiley-laughing021.gif");
    buttons += emoticonButton("Yeap!", "http://www.freesmileys.org/smileys/smiley-happy120.gif");
    buttons += emoticonButton("Guru", "http://www.freesmileys.org/smileys/smiley-green/greensmilies-028.gif");
    buttons += emoticonButton("RollEyes", "http://www.freesmileys.org/smileys/smiley-basic/rolleyes.gif");
    buttons += emoticonButton("Unsure", "http://www.freesmileys.org/smileys/smiley-basic/unsure.gif");
    buttons += emoticonButton("Excited", "http://www.freesmileys.org/smileys/smiley-basic/excited.gif");
    buttons += emoticonButton("Tears", "http://www.freesmileys.org/smileys/smiley-basic/tears.gif");
    buttons += emoticonButton("Sick", "http://www.freesmileys.org/smileys/smiley-basic/sick.gif");
    buttons += emoticonButton("Sleep", "http://www.freesmileys.org/smileys/smiley-basic/sleep.gif");
    buttons += emoticonButton("Shy", "http://www.freesmileys.org/smileys/smiley-basic/shy.gif");
    buttons += emoticonButton("Censored", "http://www.freesmileys.org/smileys/smiley-forum/censored.gif");
    buttons += emoticonButton("Stop", "http://www.freesmileys.org/smileys/smiley-forum/stop.gif");
    buttons += emoticonButton("Ashamed", "http://www.freesmileys.org/smileys/smiley-ashamed005.gif");
    buttons += emoticonButton("NoIdea", "http://www.freesmileys.org/smileys/smiley-confused005.gif");
    buttons += emoticonButton("Beer", "http://www.freesmileys.org/smileys/smiley-eatdrink004.gif");
    buttons += emoticonButton("Sweat", "http://www.freesmileys.org/smileys/smiley-gen113.gif");
    buttons += emoticonButton("LaOla2", "http://www.freesmileys.org/smileys/smiley-happy110.gif");
    buttons += emoticonButton("Hiding", "http://www.freesmileys.org/smileys/smiley-scared003.gif");
    buttons += emoticonButton("Peace!", "http://www.smileyvault.com/albums/userpics/10001/victory-smiley.gif"); 
    buttons += emoticonButton("Censored", "http://www.freesmileys.org/smileys/smiley-forum/censored.gif"); 
    buttons += emoticonButton("GoodLuck!", "http://www.smiley-lol.com/smiley/heureux/goodluck.gif"); 
    buttons += emoticonButton("Thank you!", "http://www.smileyvault.com/albums/basic/smileyvault-flowers.gif"); 
    buttons += emoticonButton("hey!", "http://foolstown.com/sm/yaya.gif"); 
    buttons += emoticonButton("Laugh", "http://www.freesmileys.org/smileys/smiley-basic/laugh.gif"); 
    buttons += emoticonButton("I did not say that!", "http://www.freesmileys.org/smileys/smiley-shocked002.gif"); 
    buttons += emoticonButton("Cool", "http://www.freesmileys.org/smileys/smiley-basic/cool.gif"); 
    buttons += emoticonButton("wink", "http://foolstown.com/sm/wink.gif"); 
    buttons += emoticonButton("Wink", "http://img215.imageshack.us/img215/2860/grinwink.gif"); 
    buttons += emoticonButton("Hehe", "http://img204.imageshack.us/img204/8863/wink2a.gif"); 
    buttons += emoticonButton("Hehe", "http://img215.imageshack.us/img215/438/chuckle.gif"); 
    buttons += emoticonButton("whao?", "http://www.freesmileys.org/smileys/smiley-basic/spock.gif"); 
    buttons += emoticonButton("...", "http://i6.photobucket.com/albums/y236/demonferret/Emoticons/th_thninjav1.gif"); 
    buttons += emoticonButton("Angel", "http://www.freesmileys.org/smileys/smiley-basic/angel.gif"); 
    buttons += emoticonButton("brrrr....", "http://smileys.smilchat.net/smileys/argue/bagarreurr.gif"); 
    buttons += emoticonButton("Yeap!", "http://www.smileyhut.com/yes_no/yes.gif"); 
    buttons += emoticonButton("yeah... right!", "http://img205.imageshack.us/img205/143/acute.gif"); 
    buttons += emoticonButton("whining", "http://www.freesmileys.org/smileys/smiley-sad045.gif"); 
    buttons += emoticonButton("RollEyes", "http://www.freesmileys.org/smileys/smiley-basic/rolleyes.gif"); 
    buttons += emoticonButton(" ... thinking ...", "http://www.smileyfaze.tk/slides/imthinkin6.gif"); 
    buttons += emoticonButton("Hmm...", "http://smileys.on-my-web.com/repository/Thinking/thinking-012.gif"); 
    buttons += emoticonButton("Confused", "http://forums.mozillazine.org/images/smilies/eusa_think.gif"); 
    buttons += emoticonButton("Hmmm...", "http://www.freesmileys.org/smileys/smiley-think005.gif"); 
    buttons += emoticonButton("Doh", "http://forums.mozillazine.org/images/smilies/eusa_doh.gif"); 
    buttons += emoticonButton("Doh", "http://smileyjungle.com/smilies/doh13.gif"); 
    buttons += emoticonButton("Doh!..", "http://www.smileyvault.com/albums/basic/smileyvault-slaphead.gif");
    buttons += emoticonButton("nobody home", "http://www.smileyfaze.tk/slides/knockanyonehome.gif"); 
    buttons += emoticonButton("Oi!", "http://www.freesmileys.org/smileys/smiley-ashamed005.gif"); 
    buttons += emoticonButton("palmface", "http://i.imgur.com/J5gci.gif"); 
    buttons += emoticonButton("shame", "http://forum.userstyles.org/plugins/Emotify/design/images/109.gif");
    buttons += emoticonButton("NoIdea", "http://www.freesmileys.org/smileys/smiley-confused005.gif"); 
    buttons += emoticonButton("Thank you!", "http://www.smileyfaze.tk/slides/adoreen7.gif"); 
    buttons += emoticonButton("Bow", "http://www.theabeforum.com/images/emoticons/New/bow.gif"); 
    buttons += emoticonButton("hatoff", "http://www.smileyfaze.tk/slides/hi.gif"); 
    buttons += emoticonButton("welcome!", "http://www.smileyfaze.tk/slides/Im%20good01.gif"); 
    buttons += emoticonButton("floored", "http://img301.imageshack.us/img301/6272/floored.gif"); 
    buttons += emoticonButton("Nosepunch", "http://smileyjungle.com/smilies/fighting0.gif"); 
    buttons += emoticonButton("just kiddng...", "http://smileys.smilchat.net/smileys/argue/beleubeleu.gif");
    buttons += emoticonButton("ThumbsUp", "http://www.smiliesuche.de/smileys/grinsende/grinsende-smilies-0189.gif");
    buttons += emoticonButton("Oops!..oi!..", "http://www.smileyvault.com/albums/stock/smiley-scared0012.gif"); 
    buttons += emoticonButton("yada-yada-yah...", "http://www.smileyfaze.tk/slides/tease.gif"); 
    buttons += emoticonButton("....", "http://www.dogforums.com/images/smilies/smilies/bored.gif"); 
    buttons += emoticonButton("coffee break anyone?", "http://www.smileyvault.com/albums/userpics/10001/coffee-news.gif"); 
    buttons += emoticonButton("huh?", "http://www.smileyfaze.tk/slides/peekaboo02.gif"); 
    buttons += emoticonButton("Yay!", "http://img204.imageshack.us/img204/6302/yayrn.gif"); 
    buttons += emoticonButton("Hahaha!...", "http://www.smiley-lol.com/smiley/heureux/totalmdr.gif"); 
    buttons += emoticonButton("Hehe!...", "http://www.smiley-lol.com/smiley/heureux/lol/lulz.gif"); 
    buttons += emoticonButton("LOL", "http://www.smiley-lol.com/smiley/heureux/lolfun.gif"); 
    buttons += emoticonButton("Ppew!...", "http://www.smiley-lol.com/smiley/ordinateurs/chatter.gif"); 
    //buttons += emoticonButton("", "");
    buttons += "</div>";
    bdiv.innerHTML += buttons;
    editbar.appendChild(bdiv);
    var btnCon = $c("td",{id:"btnBox"});
    var Ubtn = $c("button",{id:"boxUp",textContent:"Top"},[{type:"click",fn:function(e){moveBox(e)}}]);
    var Dbtn = $c("button",{id:"boxDn",textContent:"Bottom"},[{type:"click",fn:function(e){moveBox(e)}}]);
    var Lbtn = $c("button",{id:"boxLt",textContent:"Left"},[{type:"click",fn:function(e){moveBox(e)}}]);
    var Rbtn = $c("button",{id:"boxRt",textContent:"Right"},[{type:"click",fn:function(e){moveBox(e)}}]);
    var Cbtn = $c("button",{id:"boxCl",textContent:"Close"},[{type:"click",fn:function(){$("#srEmoticons").setAttribute("style","display:none");}}]);
    btnCon.appendChild(Ubtn);
    btnCon.appendChild(Dbtn);
    btnCon.appendChild(Lbtn);
    btnCon.appendChild(Rbtn);
    btnCon.appendChild(Cbtn);
    bdiv.appendChild(btnCon);
} }
var Sdiv = $c("div",{id:"popBtnContainer"});
var Sbtn = $c("button",{id:"popBtn", className:"myButton", title:"Smileys"},[{type:"click",fn:function(){openBox()}}]);
Sdiv.appendChild(Sbtn);
if($("#vanilla_discussion_index")) {
  var xxx = $("#Form_Comment").parentNode;
  xxx.parentNode.insertBefore(Sdiv, xxx);
  initEmoticons("Form_Body");
  addStyle('\
    #popBtnContainer{margin:0 8px 0 0;text-align:right;top:6px}\
  ');
}
if($("#conversations_messages_index")) {
  var xxx = $("#Form_ConversationMessage").parentNode;
  xxx.parentNode.insertBefore(Sdiv, xxx);
  initEmoticons("Form_Body");
  addStyle('\
    #popBtnContainer{margin:0 8px 0 0;text-align:right;top:6px}\
  ');
}
if($("#dashboard_activity_index") || $("#dashboard_profile_index") || $("#dashboard_profile_activity")) {
  var xxx = $("#Form_Form");
  xxx.insertBefore(Sdiv, xxx.firstElementChild);
  initEmoticons("Form_Comment");
  addStyle('\
    #popBtnContainer{margin:0;text-align:right;top:-5px}\
  ');
}
if($("#vanilla_post_discussion") || $("#conversations_messages_add")) {
  ta = document.evaluate("//textarea[@id='Form_Body']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i = 0; i < ta.snapshotLength; i++)
    ta.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.id = 'edit';
  var xxx = $("#edit");
  xxx.insertBefore(Sdiv, xxx.children[1]);
  initEmoticons("Form_Body");
  addStyle('\
    #popBtnContainer{margin:0;text-align:right;top:-10px}\
    #edit .EmotifyWrapper,#edit .EmotifyDropdown{display:none!important}\
  ');
}
function emoticonButton(name, url) {
  if(tagtype == "html") return "<span id='srEmoticons_" + name + "' title='" + name + "' onmousedown='emoticonInsert(\"<img src=\\\"" + url + "\\\"/>\")'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
  else return "<span id='srEmoticons_" + name + "' title='" + name + "' onmousedown='emoticonInsert(\"[img]" + url + "[/img]\");'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}
function initEmoticons(txtname) {
  var editbar = document.body;
  if(editbar) {
    textar = txtname;
    setemoticons();
    return true;
  }
  return false;
}
var scriptElement = $c("script");
scriptElement.type = "text/javascript";
scriptElement.innerHTML = "function emoticonInsert(instext) {var input = document.getElementById('" + textar + "'); var start = input.selectionStart; var end = input.selectionEnd; input.value = input.value.substr(0, start) + instext + input.value.substr(end); var pos = start + instext.length; input.selectionStart = pos; input.selectionEnd = pos; input.focus()}";
document.getElementsByTagName("head")[0].appendChild(scriptElement);
var dch = document.body.parentNode.clientHeight;
var style1 = "background:-moz-linear-gradient(#FFF,#EEE);border:1px solid #999;border-radius:10px;box-shadow:0 0 3px #333 inset;padding:0";
var styleUp = "box-shadow:none;display:block;height:auto;position:fixed; overflow:auto;right:0;top:0;width:auto;z-index:999";
var styleDn = "box-shadow:none;display:block;height:auto;position:fixed; overflow:auto;right:0;bottom:0;width:auto;z-index:999";
var styleLt = "box-shadow:none;display:block;height:" + dch + "px;position:fixed; overflow:auto;left:0;top:0;width:260px;z-index:999";
var styleRt = "box-shadow:none;display:block;height:" + dch + "px;position:fixed; overflow:auto;right:0;top:0;width:260px;z-index:999";
addStyle('\
  #emoticonContainer span:hover{cursor:pointer}\
  body#conversations_messages_add #Content,body#vanilla_post_discussion #Content{padding-left:10px}\
  #boxUp,#boxDn,#boxLt,#boxRt,#boxCl{margin:0 3px;padding:0}\
  #btnBox{border:none}\
  #Form_Comment .EmotifyWrapper,#Form_Comment .EmotifyDropdown{display:none}\
  #popBtnContainer{float:right;position:relative;width:50px;z-index:99}\
  #popBtn{-moz-appearance:none;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAACh0lEQVR42sWUy2sTURTGv9GbOLFjnUX+gNYipQgpgi4UISaLKgouChLJokEEFwUrFRdFRKvgQjcWsVofoIKIySJiFr4QU0G7UZB049sUXVRB8BoGMiQX4rnzyGOaJgotHjjM3Lkzv/vNd+85CpYplP8C3r5J76JLgnKQss95/JYyTXlr+jWf+ycwATvpcjXgF7Fwv4kd2wR6u+2593ng8QuG5zkVxRJL0qODtEChLViqVJRKPtJbxNGRFWAaAxizJ4WgNCEMAcGBs7f9mPkYQKWidHvVK16lBP19LFFAONoBn6bbMBfswMumQXCZQDarYOJRp4SvrVfuBd/dudmIHTmkwqdqjUAZciwXoigb3Ib/BCbu+PHs3eokgfctAEsLyNP8/SmTlAar0MiggWy6tkhkD7fHrnJuwCDfE5Oa9LxqST34JKkdt9RKC5ywwJm6sQRnbItc1eZ34GLKUj1O4FNecO7yGA/1hPSaDfTxomDXDs4tO2bfAMfv6bME7veCSw8ucR/THbDraYuoBxvfgPg1vUxg/0LwBQnWMDDEGlS2Ag/EqVpOcAs8dKM5OHd+lIc2bHTAaa21Ysdj+W5qlOPLZ2As09wKa/NG9gsqijZw50RItZnTHOYvYOrh4pvXFfCJfPKMQWDU4CkVUNUq0LLAhZ4j6DysQjlwk45buclxqy+Q4b3CghMRu4bVpk5IqARKb69MM7zMa80LxAFbJR2PFhALV8Cc/WNBvarY6hMm3XLTUpvNKbj+qk1Ju5bIJrR1fRGHd5fA1jRUMrj8j3n7fvIpw8xcR/smVK8csm36RGxLTwnRvhLWBe25rz+AJx+oq31aBVOs/Pu26VWPpWz0SxHLBv4DqE1oJk2WEwcAAAAASUVORK5CYII=)no-repeat center,-moz-linear-gradient(#FFF,#CCC);height:22px;width:22px}\
  #popBtn{border:1px solid #999;border-radius:4px}\
  #popBtn:hover{border-color:#666}\
');
function openBox(e) {
  var pos = getValue("smileyPosition");
  var sty = $("#srEmoticons").style.display;
  if(sty == "block") {
    $("#srEmoticons").style.display = "none";
    return;
  } else $("#srEmoticons").style.display = "block"; 
  $("#srEmoticons").firstChild.setAttribute("style", style1); 
  switch(getValue("smileyPosition")) {
    case "top": $("#srEmoticons").setAttribute("style", styleUp); break;
    case "bottom": $("#srEmoticons").setAttribute("style", styleDn); break;
    case "left": $("#srEmoticons").setAttribute("style", styleLt); break;
    case "right": $("#srEmoticons").setAttribute("style", styleRt); break;
}  e.preventDefault();
 }
function showHide(e) {
  if(e.button == 1 && e.target.nodeName == "TEXTAREA") {
    $("#srEmoticons").firstChild.setAttribute("style", style1); 
    switch(getValue("smileyPosition")) {
      case "top": $("#srEmoticons").setAttribute("style", styleUp); break;
      case "bottom": $("#srEmoticons").setAttribute("style", styleDn); break;
      case "left": $("#srEmoticons").setAttribute("style", styleLt); break;
      case "right": $("#srEmoticons").setAttribute("style", styleRt); break;
  } }
  if(e.keyCode == 27) {
    e.preventDefault();
    $("#srEmoticons").setAttribute("style", "display:none");
} }
function moveBox(e) {
  $("#srEmoticons").firstChild.setAttribute("style", style1); 
  switch(e.target.id) {
    case 'boxUp': 
      document.getElementById("srEmoticons").setAttribute("style", styleUp); 
      setValue("smileyPosition", "top"); break;
    case 'boxDn': 
      document.getElementById("srEmoticons").setAttribute("style", styleDn); 
      setValue("smileyPosition", "bottom"); break;
    case 'boxLt': 
      document.getElementById("srEmoticons").setAttribute("style", styleLt); 
      setValue("smileyPosition", "left"); break;
    case 'boxRt': 
      document.getElementById("srEmoticons").setAttribute("style", styleRt); 
      setValue("smileyPosition", "right"); break;
} }