// ==UserScript==
// @name          Userstyles.org Enhancer
// @description   Enhancement suite for the Userstyles.org site
// @author        1nfected
// @version       1.4.5
// @namespace     1nfected
// @license       CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/

// @include       http://userstyles.org/users/*
// @include       https://userstyles.org/users/*
// @include       http://userstyles.org/styles/browse*
// @include       https://userstyles.org/styles/browse*

// @history       1.4.5 Fix for recent changes in the site (again!).
// @history       1.4.5 Added a 'Updated Date' Column to the table.
// @history       1.4.5 Also added sorting for the Date column.
// @history       1.4.5 Updated styling for the table & summary block.
// @history       1.4.5 Changed a few icons.
// ==/UserScript==

(function() {

testGM();

/*  Developer Tools: Dialog
 *  -----------------------
 *  @author     Cletus
 *  @homepage	http://userscripts.org/scripts/show/87345
 *  @version	1.0.0+
 */
if(typeof devtools=='undefined'){var devtools={};}if(typeof devtools.JSON=='undefined'){devtools.JSON={};devtools.JSON.stringify=function(obj){obj=JSON.stringify(obj);return obj.replace(/"/g,'!~dq~!').replace(/'/g,'!~sq~!');};devtools.JSON.parse=function(str){str=str.replace(/!~dq~!/g,'"').replace(/!~sq~!/g,"'");return JSON.parse(str);};}devtools.dialog={open:function(options,id){this.__setVars(options);if(!id){id=(new Date()).getTime();}this.__var.lastDialogId=id;var wrapper=document.getElementById('devtools-wrapper');if(!wrapper){wrapper=document.createElement('div');wrapper.id='devtools-wrapper';wrapper.innerHTML='<div class="grid">'+'<div id="devtools-cell-topleft" class="dialog-wrapper top left"></div>'+'<div id="devtools-cell-top" class="dialog-wrapper top"></div>'+'<div id="devtools-cell-topright" class="dialog-wrapper top right"></div>'+'<div id="devtools-cell-left" class="dialog-wrapper left"></div>'+'<div id="devtools-cell-center" class="dialog-wrapper center"></div>'+'<div id="devtools-cell-right" class="dialog-wrapper right"></div>'+'<div id="devtools-cell-bottomleft" class="dialog-wrapper bottom left"></div>'+'<div id="devtools-cell-bottom" class="dialog-wrapper bottom"></div>'+'<div id="devtools-cell-bottomright" class="dialog-wrapper bottom right"></div>'+'</div>';document.body.appendChild(wrapper);wrapper=document.getElementById('devtools-wrapper');this.__handleHooks();}wrapper.className=(this.__setting.mask)?'mask':'';var dialog=document.getElementById('devtools-dialog-'+id);if(!dialog||dialog.parentNode.id!=='devtools-cell-'+this.__setting.location.replace('-','')){if(dialog){dialog.parentNode.removeChild(dialog);}dialog=document.createElement('div');dialog.id='devtools-dialog-'+id;dialog.className='dialog'+((this.__setting.class&&this.__setting.class!='')?' '+this.__setting.class:'');dialog.innerHTML='<div class="dialog-close"><span>X</span></div>'+'<div class="dialog-title"><span></span></div>'+'<div class="dialog-content"></div>'+'<div class="dialog-footer"></div>';wrapper.querySelector('#devtools-cell-'+this.__setting.location.replace('-','')).appendChild(dialog);dialog=document.getElementById('devtools-dialog-'+id);dialog.querySelector('.dialog-close').addEventListener('click',function(){devtools.dialog.close(this.parentNode.getAttribute('id').replace(/^devtools-dialog-/,''));},false);}dialog.querySelector('.dialog-close').style.display=(this.__setting.closeButton)?'block':'none';dialog.querySelector('.dialog-title').firstElementChild.textContent=this.__setting.title;dialog.querySelector('.dialog-content').innerHTML=this.__parseTokens(this.__setting.message);dialog.querySelector('.dialog-footer').textContent='';var button,buttonImg,i;for(i=0;i<this.__setting.buttons.length;i++){button=document.createElement('button');button.textContent=this.__setting.buttons[i].text;button.setAttribute('data-devtools-dialog-button',this.__setting.buttons[i].text);if(this.__setting.buttons[i].icon){buttonImg=document.createElement('img');buttonImg.setAttribute('src',this.__setting.buttons[i].icon);buttonImg.setAttribute('alt','');button.insertBefore(buttonImg,button.firstChild);}if(typeof this.__setting.buttons[i].tooltip=='string'){button.setAttribute('title',this.__setting.buttons[i].tooltip);}button.addEventListener('click',this.__setting.buttons[i].callback,false);dialog.querySelector('.dialog-footer').appendChild(button);}var style=document.getElementById('devtools-dialog-style');if(!style||style.className!=this.__setting.theme){if(style){style.parentNode.removeChild(style);}style=document.createElement('style');style.id='devtools-dialog-style';style.className=this.__setting.theme;style.setAttribute('type','text/css');style.textContent=this.__themes[this.__setting.theme].finalcss||(this.__themes._base.css+'\n'+this.__themes[this.__setting.theme].css);document.querySelector('head').appendChild(style);}return id;},close:function(id){if(!id){if(!this.__var.lastDialogId){return false;}id=this.__var.lastDialogId;}var dialog=document.getElementById('devtools-dialog-'+id);if(!dialog){return false;}else{dialog.querySelector('.dialog-close').removeEventListener('click',function(){devtools.dialog.close(this.parentNode.getAttribute('id').replace(/^devtools-dialog-/,''));},false);var inputs=this.getInputs(id);dialog.parentNode.removeChild(dialog);}if(document.querySelector('div[id*="devtools-dialog-"]')==null){var wrapper=document.getElementById('devtools-wrapper');wrapper.parentNode.removeChild(wrapper);var styles=document.querySelectorAll('head style[id^="devtools-dialog-theme-"]');for(var i=0;i<styles.length;i++){styles[i].parentNode.removeChild(styles[i]);}}return inputs;},setDefaults:function(options){this.__userDefaults={};for(var i in options){if(this.__defaults.hasOwnProperty(i)){this.__userDefaults[i]=options[i];}}},defineToken:function(tag,attributes,replacement){if(typeof tag!='string'||/^\w+$/.test(tag)===false){return false;}if(typeof this.__tokens[tag]!='undefined'){return false;}if(typeof attributes=='object'&&attributes!=null){for(var a in attributes){if(!attributes.hasOwnProperty(a)){continue;}if(typeof attributes[a].validation=='undefined'){return false;}}}else{attributes={};}if(typeof replacement!='function'&&typeof replacement!='string'){return false;}this.__tokens[tag]={attributes:attributes,replacement:replacement};return true;},defineTheme:function(name,css,base){if(typeof name!='string'||typeof css!='string'){return false;}if(!/^\w+$/.test(name)||name=='default'){return false;}var cssOut='';var bases={};var baseTmp=base;if(typeof base=='string'){for(var i=0;i<5;i++){if(this.__themes[baseTmp]&&!bases[baseTmp]){cssOut='/* devtools.dialog prerequisite theme: '+baseTmp+' */\n'+this.__themes[baseTmp].css+'\n\n'+cssOut;bases[baseTmp]=true;baseTmp=this.__themes[baseTmp].base;}else{break;}}}else{base=null;}cssOut=('/* devtools.dialog base reset */\n'+this.__themes._base.css+"\n\n"+cssOut+'/* devtools.dialog theme: '+name+' */\n'+css).replace('%theme%',name);this.__themes[name]={base:base,finalcss:cssOut,css:css};return true;},defineHook:function(name,func){if(typeof this.__hooks[name]!='undefined'||typeof func!='function'){return false;}this.__hooks[name]=func;return true;},getInputs:function(id){if(!id){if(!this.__var.lastDialogId){return false;}id=this.__var.lastDialogId;}var dialog=document.querySelector('#devtools-dialog-'+id);if(dialog){var out={},i,j;var simpleInputs=dialog.querySelectorAll('[data-devtools-input="text"], [data-devtools-input="select"]');for(i=0;i<simpleInputs.length;i++){out[simpleInputs[i].getAttribute('name')]=simpleInputs[i].value;}var checkboxInputs=dialog.querySelectorAll('[data-devtools-input="checkbox"]');for(i=0;i<checkboxInputs.length;i++){out[checkboxInputs[i].getAttribute('name')]=(checkboxInputs[i].checked)?true:false;}var radioInputs=dialog.querySelectorAll('[data-devtools-input="radio"]');var radios;for(i=0;i<radioInputs.length;i++){radios=radioInputs[i].querySelectorAll('input');for(j=0;j<radios.length;j++){if(radios[j].checked){out[radios[j].getAttribute('name').split('-')[0]]=radios[j].value;break;}}}return out;}return false;},__var:{lastDialogId:false},__defaults:{title:'Script Notification',message:'This is a dialog from a userscript.',mask:true,closeButton:true,location:'center',buttons:null,theme:'default',class:''},__settingsValidation:{title:['type','string'],message:['type','string'],mask:['type','boolean'],closeButton:['type','boolean'],location:['match',/^(top-left|top|top-right|left|center|right|bottom-left|bottom|bottom-right)$/],buttons:null,theme:null,class:['match',/^[\w- ]+$/]},__themes:{'_base':{css:'#devtools-wrapper,#devtools-wrapper *{-moz-border-radius:0 !important;-moz-box-shadow:none !important;background:transparent !important;border:none !important;border-collapse:separate !important;border-radius:0 !important;border-spacing:0 !important;box-shadow:none !important;color:#000 !important;float:none !important;font-family:Arial, sans-serif !important;font-size:12px !important;font-weight:400;height:auto !important;letter-spacing:normal !important;line-height:16px !important;margin:0 !important;max-height:none !important;max-width:none !important;min-height:0 !important;min-width:0 !important;opacity:1.0 !important;padding:0 !important;text-align:left !important;text-decoration:none !important;text-shadow:none !important;text-transform:none !important;vertical-align:baseline !important;visibility:hidden !important;white-space:normal !important;width:auto !important;}'+'#devtools-wrapper{background-color:rgba(0, 0, 0, 0.8) !important;display:block !important;height:100% !important;left:0 !important;overflow:auto !important;position:fixed !important;top:0 !important;visibility:hidden !important;width:100% !important;z-index:2147483640 !important;}'+'#devtools-wrapper.mask{background-color:rgba(0, 0, 0, 0.8) !important;visibility:visible !important;}'+'#devtools-wrapper .grid{display:table !important;height:100% !important;position:fixed !important;visibility:hidden !important;width:100% !important;}'+'#devtools-wrapper .center,#devtools-wrapper .top,#devtools-wrapper .bottom,#devtools-wrapper .left,#devtools-wrapper .right{display:table-cell !important;padding:15px !important;}'+'#devtools-wrapper .left,#devtools-wrapper .center,#devtools-wrapper .right{vertical-align:middle !important;}'+'#devtools-wrapper .top{vertical-align:top !important;}'+'#devtools-wrapper .bottom{vertical-align:bottom !important;}'+'#devtools-wrapper .left .dialog{clear:both !important;float:left !important;}'+'#devtools-wrapper .right .dialog{clear:both !important;float:right !important;}'+'#devtools-wrapper .center .dialog,#devtools-wrapper .bottom .dialog,#devtools-wrapper .top .dialog{margin-left:auto !important;margin-right:auto !important;}'+'#devtools-wrapper .dialog,#devtools-wrapper .dialog *{visibility:visible !important;}'+'#devtools-wrapper .dialog fieldset{border:1px solid #000 !important;padding:5px !important;}'+'#devtools-wrapper .dialog legend{padding:0 5px !important;}'+'#devtools-wrapper .dialog input[type="text"],#devtools-wrapper input[type="password"],#devtools-wrapper textarea,#devtools-wrapper select{-moz-box-sizing:border-box !important;background-color:#fff !important;border:1px solid #000 !important;box-sizing:border-box !important;padding:2px !important;width:100% !important;}'+'#devtools-wrapper .dialog input[type="checkbox"],#devtools-wrapper input[type="radio"]{margin-right:3px !important;vertical-align:top !important;}'+'#devtools-wrapper .dialog input[type="radio"]+span{margin-right:7px !important;vertical-align:middle !important;}'+'#devtools-wrapper .dialog .progress-bar{-moz-box-sizing:border-box !important;background-color:#fff !important;border:1px solid #000 !important;box-sizing:border-box !important;height:20px !important;margin-left:auto !important;margin-right:auto !important;overflow:hidden !important;position:relative !important;width:100% !important;}'+'#devtools-wrapper .dialog .progress-bar-inner{background-color:#000 !important;height:100% !important;left:0 !important;position:absolute !important;top:0 !important;}'+'#devtools-wrapper .dialog .progress-bar-text{height:100% !important;position:relative !important;text-align:center !important;width:100% !important;z-index:1 !important;}'+'#devtools-wrapper .dialog .dialog-content br:first-child, #devtools-wrapper .dialog .dialog-content br:last-child{display:none !important;}'+'#devtools-wrapper .dialog strong{font-weight:bold !important;}'+'#devtools-wrapper .dialog em{font-style:italic !important;}'+'#devtools-wrapper .dialog ins{text-decoration:underline !important;}'+'#devtools-wrapper .dialog a:link,#devtools-wrapper .dialog a:hover{color:EE0000 !important;text-decoration:underline !important;}'+'#devtools-wrapper .dialog a:visited{color:#74198b !important;}'},'default':{css:'#devtools-wrapper .dialog{-moz-border-radius:10px !important;-moz-box-shadow:0 0 50px #000 !important;background-color:#eee !important;border-radius:10px !important;box-shadow:0 0 50px #000 !important;margin-bottom:5px !important;margin-top:5px !important;padding:5px !important;position:relative !important;width:300px !important;}'+'#devtools-wrapper .dialog .dialog-close{-moz-border-radius:10px !important;background-color:#444 !important;border:5px solid #eee !important;border-radius:10px !important;cursor:pointer !important;height:25px !important;padding:0 !important;position:absolute !important;right:0 !important;text-align:center !important;top:0 !important;vertical-align:middle !important;width:25px !important;z-index:4 !important;}'+'#devtools-wrapper .dialog .dialog-close span{color:#eee !important;font-size:18px !important;font-weight:700;line-height:25px !important;vertical-align:middle !important;}'+'#devtools-wrapper .dialog .dialog-close:hover{border-color:orange !important;}'+'#devtools-wrapper .dialog .dialog-close:hover span{color:orange !important;}'+'#devtools-wrapper .dialog .dialog-title{-moz-border-radius:5px !important;background-color:#444 !important;border-radius:5px !important;color:#eee !important;height:15px !important;padding:5px !important;}'+'#devtools-wrapper .dialog .dialog-title span{color:#eee !important;font-size:14px !important;font-weight:700;}'+'#devtools-wrapper .dialog .dialog-content{color:#000 !important;margin:10px 5px !important;max-width:100% !important;}'+'#devtools-wrapper .dialog .dialog-footer{text-align:center !important;width:100% !important;}'+'#devtools-wrapper .dialog .dialog-footer button{-moz-border-radius:10px !important;background-color:#444 !important;border-radius:10px !important;color:#eee !important;cursor:pointer !important;display:inline-block !important;height:25px !important;margin-left:2px !important;margin-right:2px !important;padding:0 5px 3px !important;}'+'#devtools-wrapper .dialog .dialog-footer button:hover{background-color:orange !important;color:#444 !important;}'+'#devtools-wrapper .dialog .dialog-footer button img{margin-right:3px !important;vertical-align:top !important;}'+'#devtools-wrapper .dialog hr{background-color:#ddd !important;margin:7px 0 7px 0 !important;padding:0.5px !important;}'+'#devtools-wrapper .dialog fieldset{-moz-border-radius:4px !important;border:1px solid #aaa !important;border-radius:4px !important;}'+'#devtools-wrapper .dialog label{display:block !important;font-weight:bold !important;}'+'#devtools-wrapper .dialog label span{font-weight:normal !important;}'+'#devtools-wrapper .dialog legend{font-weight:bold !important;}'+'#devtools-wrapper .dialog input[type="text"],#devtools-wrapper input[type="password"],#devtools-wrapper textarea,#devtools-wrapper select{-moz-border-radius:4px !important;background-color:#fafafa !important;border:1px solid #ddd !important;border-radius:4px !important;}'+'#devtools-wrapper .dialog input[type="text"]:focus,#devtools-wrapper input[type="password"]:focus,#devtools-wrapper textarea:focus,#devtools-wrapper select:focus{border:1px solid #444 !important;}'+'#devtools-wrapper .dialog input[type="checkbox"] label{display:block !important;}'+'#devtools-wrapper .dialog .progress-bar{-moz-border-radius:5px !important;background-color:#fafafa !important;border:1px solid #ddd !important;border-radius:5px !important;}'+'#devtools-wrapper .dialog .progress-bar-inner{-moz-border-radius:5px !important;background-color:#444 !important;border-radius:5px !important;}'+'#devtools-wrapper .dialog .progress-bar-text{text-shadow:#f2f2f2 -1px 0 3px #f2f2f2 0 -1px 3px #f2f2f2 1px 0 3px #f2f2f2 0 1px 3px #f2f2f2 -1px -1px 3px #f2f2f2 1px 1px 3px !important;}'}},__tokens:{'progressbar':{attributes:{'percent':{defaultValue:'',validation:/^(100|\d{1,2})$/},'calculate':{defaultValue:'',validation:/^\s*\d+\s*\/\s*\d+\s*$/}},replacement:function(tag){var p;if(tag.attributes.calculate!=''){p=/^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(tag.attributes.calculate);if(p){p=(p[1]/p[2])*10000;p=Math.round(p)/100;}else{p=0;}}else if(tag.attributes.percent!=''){p=tag.attributes.percent;}else{return false;}if(p>100){p=100;}if(p<0){p=0;}p+='%';return'<div class="progress-bar"><div class="progress-bar-text">'+p+'</div><div class="progress-bar-inner" style="width: '+p+' !important;"></div></div>';}},'input':{attributes:{'type':{validation:/^(text|textarea|radio|checkbox|select|password)$/},'name':{validation:/^\w+$/},'label':{defaultValue:'',validation:false},'options':{defaultValue:'',validation:/^{.+}$/},'defaultValue':{defaultValue:'',validation:false},'hook':{defaultValue:'',validation:/^\w+$/}},replacement:function(tag){var r=false;switch(tag.attributes.type){case 'text':r='<label>'+tag.attributes.label+'<input type="text" name="'+tag.attributes.name+'" value="'+tag.attributes.defaultValue+'" data-devtools-input="text"/></label>';break;case 'password':r='<label>'+tag.attributes.label+'<input type="password" name="'+tag.attributes.name+'" value="'+tag.attributes.defaultValue+'" data-devtools-input="text"/></label>';break;case 'textarea':r='<label>'+tag.attributes.label+'<textarea name="'+tag.attributes.name+'" data-devtools-input="text">'+tag.attributes.defaultValue+'</textarea></label>';break;case 'checkbox':r='<div><label><input type="checkbox" name="'+tag.attributes.name+'"'+((tag.attributes.defaultValue=='true')?' checked':'')+' data-devtools-input="checkbox"/><span>'+tag.attributes.label+'</span></label></div>';break;case 'radio':try{var options=devtools.JSON.parse(tag.attributes.options);var hash=Math.floor(Math.random()*100000);r='<div data-devtools-input="radio"><fieldset><legend>'+tag.attributes.label+'</legend>';for(var key in options){r+='<label><input type="radio" name="'+tag.attributes.name+'-'+hash+'" value="'+options[key]+'"';r+=((tag.attributes.defaultValue==options[key])?' checked':'')+'/><span>'+key+'</span></label>';}r+='</fieldset></div>';}catch(e){return false;}break;case 'select':try{var options=devtools.JSON.parse(tag.attributes.options);r='<div><label>'+tag.attributes.label+'</label>';r+='<select name="'+tag.attributes.name+'"'+((tag.attributes.hook=='color')?' data-devtools-hook="'+tag.attributes.hook+'"':'')+' data-devtools-input="select">';for(var key in options){if(typeof options[key]=='string'){r+='<option value="'+options[key]+'"';r+=(tag.attributes.hook=='color'&&/^#[0-9a-f]{3,6}$/i.test(options[key]))?' style="background-color:'+options[key]+' !important;"':'';r+=((tag.attributes.defaultValue==options[key])?' selected':'')+'>'+key+'</option>';}}r+='</select></div>';}catch(e){return false;}break;}return r;}}},__hooks:{'color':function(){var el=document.querySelectorAll('[data-devtools-hook="color"]');if(!el){return;}setInterval(function(){var el=document.querySelectorAll('[data-devtools-hook="color"]');if(el){for(var i=0;i<el.length;i++){if(/^#[0-9a-f]{3,6}$/i.test(el[i].value)){el[i].setAttribute('style','background-color: '+el[i].value+' !important');}}}},500);}},__userDefaults:{},__setting:{},__handleHooks:function(){for(var hook in this.__hooks){this.__hooks[hook]();}},__setVars:function(options){this.__setting={};var out=this.__copyObj(this.__defaults);var setting,validationCopy,validationCount,valid;for(setting in this.__userDefaults){if(this.__defaults.hasOwnProperty(setting)){out[setting]=this.__copyObj(this.__userDefaults[setting]);}}if(typeof options=='object'){for(setting in options){if(this.__defaults.hasOwnProperty(setting)){out[setting]=options[setting];}}}for(setting in out){if(setting=='buttons'){this.__setting[setting]=this.__validateButtons(out[setting]);continue;}if(setting=='theme'){this.__setting[setting]=this.__validateTheme(out[setting]);continue;}if(this.__settingsValidation.hasOwnProperty(setting)){validationCopy=this.__copyObj(this.__settingsValidation[setting]);valid=false;switch(validationCopy.shift()){case 'type':for(validationCount=0;validationCount<validationCopy.length;validationCount++){if(validationCopy[validationCount]=='array'){if(out[setting]instanceof Array){valid=true;this.__setting[setting]=out[setting];break;}else if(this.__userDefaults[setting]instanceof Array){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}else if(typeof out[setting]==validationCopy[validationCount]){valid=true;this.__setting[setting]=out[setting];break;}else if(typeof this.__userDefaults[setting]==validationCopy[validationCount]){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}break;case 'match':for(validationCount=0;validationCount<validationCopy.length;validationCount++){if(validationCopy[validationCount].test(out[setting])){valid=true;this.__setting[setting]=out[setting];break;}else if(validationCopy[validationCount].test(this.__userDefaults[setting])){valid=true;this.__setting[setting]=this.__userDefaults[setting];break;}}break;}if(!valid){this.__setting[setting]=this.__copyObj(this.__defaults[setting]);}}}},__validateButtons:function(buttons){var btns=[];if(typeof buttons=='object'&&buttons instanceof Array){var btnNum,btnAttr,o;button:for(btnNum=0;btnNum<buttons.length;btnNum++){if(typeof buttons[btnNum]!='object'){continue button;}for(btnAttr in buttons[btnNum]){o=buttons[btnNum][btnAttr];switch(btnAttr){case 'text':if(typeof o!='string'){o='';}break;case 'tooltip':if(typeof o!='string'){o=false;}break;case 'icon':if(typeof o!='string'){o=false;}break;case 'callback':if(typeof o!='function'){continue button;}break;}}btns.push(buttons[btnNum]);}}return btns;},__validateTheme:function(theme){if(typeof theme!='string'||theme==''){return this.__defaults.theme;}if(typeof this.__themes[theme]=='object'&&this.__themes[theme]!==null){var t=this.__themes[theme];if(t.base){if(typeof this.__themes[t.base]=='object'&&this.__themes[t.base]!==null){return theme;}else{return this.__defaults.theme;}}else{return theme;}}return this.__defaults.theme;},__parseTokens:function(text){var tagSplitRegex=/({\s*\w+\s*(?:\w+(?:\s*=\s*(?:".*?"|'.*?'))?\s*|\s*)})/;var tagRegex=/{\s*(\w+)\s*(?:(\w+(?:\s*=\s*(?:".*?"|'.*?'))?)+\s*|\s*)}/;var attrRegex=/(\w+)\s*=\s*(".*?"|'.*?')/g;var text_obj=text.split(tagSplitRegex);var i,match,attr,tag;token_search:for(i=1;i<text_obj.length;i+=2){tag={};match=tagRegex.exec(text_obj[i]);tag.name=match[1];tag.attributes={};if(typeof this.__tokens[tag.name]=='undefined'){continue;}if(typeof match[2]!='undefined'){while((attr=attrRegex.exec(match[2]))!=null){attr[2]=attr[2].substring(1,attr[2].length-1);if(typeof this.__tokens[tag.name].attributes[attr[1]]=='undefined'){continue;}if(this.__tokens[tag.name].attributes[attr[1]].validation===false){tag.attributes[attr[1]]=attr[2];}else if(this.__tokens[tag.name].attributes[attr[1]].validation.test(attr[2])){tag.attributes[attr[1]]=attr[2];}else if(typeof this.__tokens[tag.name].attributes[attr[1]].defaultValue=='string'){tag.attributes[attr[1]]=this.__tokens[tag.name].attributes[attr[1]].defaultValue;}else{continue token_search;}}}for(attr in this.__tokens[tag.name].attributes){if(!this.__tokens[tag.name].attributes.hasOwnProperty(attr)){continue;}if(typeof tag.attributes[attr]=='undefined'){if(typeof this.__tokens[tag.name].attributes[attr].defaultValue=='string'){tag.attributes[attr]=this.__tokens[tag.name].attributes[attr].defaultValue;}else{continue token_search;}}}var rep=this.__tokens[tag.name].replacement;if(typeof rep=='string'){text_obj[i]=rep;}else if(typeof rep=='function'){var rep_result=rep(tag);if(typeof rep_result!='string'){continue token_search;}text_obj[i]=rep_result;}}return text_obj.join('');},__copyObj:function(obj){if(obj==null||typeof(obj)!='object'||obj instanceof RegExp){return obj;}var c=new obj.constructor();for(var key in obj){c[key]=this.__copyObj(obj[key]);}return c;}};

/*  Developer Tools: Config
 *  -----------------------
 *  @author     Cletus
 *  @homepage	http://userscripts.org/scripts/show/98574
 *  @version	1.0.3+
 */
if(typeof devtools.dialog!='undefined'){devtools.config={open:function(){var msg=(typeof this.__options.html=='string')?this.__options.html+'<hr/>':'';for(var name in this.__options.settings){msg+=this.__options.settings[name].input;}devtools.dialog.open({message:msg,title:this.__options.title,mask:true,buttons:[{text:'Save',icon:this.__icons.save,callback:this.__save},{text:'Save & Close',icon:this.__icons.save,callback:function(){devtools.config.__save();devtools.config.close();}},{text:'Close',icon:this.__icons.close,callback:this.close}],theme:(typeof this.__options.theme.css=='string')?'devtoolsconfig':'default'},'devtools-config');},close:function(){devtools.dialog.close('devtools-config');},get:function(name){if(this.__options.settings[name]!==null&&typeof this.__options.settings[name]!='undefined'){return getValue('devtools-config-'+name,this.__options.settings[name].defaultValue);}return undefined;},getAll:function(){var vals={};var allVals=listValues();for(var val in allVals){if(/^devtools-config-/.test(val)){vals[val]=this.get(val);}}return vals;},init:function(options){if(typeof options!='object'||!options){return false;}if(!options.settings){return false;}if(options.prefix){this.__options.prefix=options.prefix;}this.__options.title=(typeof options.title=='string')?options.title:'Configuration Options';var setting,name;for(name in options.settings){if(!/^\w+$/.test(name)||!options.settings.hasOwnProperty(name)){continue;}this.__options.settings[name]={};setting=options.settings[name];if(typeof setting.type=='string'){if(setting.type=='text'||setting.type=='textarea'||setting.type=='password'){this.__options.settings[name].defaultValue=(typeof setting.defaultValue=='string')?setting.defaultValue:'';this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+(this.get(name)||this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"}';}if(setting.type=='checkbox'){this.__options.settings[name].defaultValue=(setting.defaultValue==true||setting.defaultValue=='true')?true:false;this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+((typeof this.get(name)=='boolean')?this.get(name):this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"}';}if(setting.type=='radio'||setting.type=='select'){this.__options.settings[name].defaultValue=(typeof setting.defaultValue=='string')?setting.defaultValue:'';this.__options.settings[name].input='{input type="'+setting.type+'" name="'+name+'" defaultValue="'+(this.get(name)||this.__options.settings[name].defaultValue)+'" label="'+((typeof setting.label=='string')?setting.label:'')+'"';this.__options.settings[name].input+=' options="'+((typeof setting.options=='object')?devtools.JSON.stringify(setting.options):'')+'"';this.__options.settings[name].input+=((setting.colorHook===true&&setting.type=='select')?' hook="color"':'')+'}';}}}this.__options.html=(typeof options.html=='string')?options.html:false;this.__options.theme.useBase=(options.useBase===false)?false:true;this.__options.theme.css=(typeof options.css=='string')?options.css:null;if(typeof this.__options.theme.css=='string'){devtools.dialog.defineTheme('devtoolsconfig',this.__options.theme.css,((this.__options.theme.useBase)?'default':null));}this.__initSettings=options;return true;},__initSettings:null,__save:function(options){options=devtools.dialog.getInputs('devtools-config');for(var name in options){if(!options.hasOwnProperty(name)){continue;}setValue('devtools-config-'+name,options[name]);}var img=document.querySelector('#devtools-dialog-devtools-config [data-devtools-dialog-button="Save"] img');img.src=devtools.config.__icons.savecomplete;setTimeout(function(){img.src=devtools.config.__icons.save;},2000);devtools.config.init(devtools.config.__initSettings);return true;},__options:{title:'',html:'',theme:{useBase:true,css:false},settings:{},prefix:'my_storage_prefix'},__icons:{save:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKCSURBVHjaYjTL3lPIwMAgD8Q2QKwExDwMDP9ZgDQjw38GMGBmYmRgAuL///8x/PvH8IGNleHO95+/O09N81wDEEAghVqzS61SQOrVpdnBev7/+8/w6w8Q//4H1szJzsTAyMjA8OX7P4YvP/7y33v+xWDhzrszzLK28QMEEBNQvS1I1/pTnxiA+oC2/GfIm3waaBOQA9TFygKxHWTgd6CBf/4xMP5lYGKJd1cW5mRnmwoQQCADJEC2gjT8Bsr+/gNx928gn4WZAWwASO77L6gc0IIDlz8zsLEyM3z/+YcNIIBAXuD68w/scLAiEGACufc/SDPQ6UD4A2jz95//gS78D3YliH729gfIMEaAAGIBBdhfoAAQMfyE2l6bYADWDEQMv//+Z/j2E+R0cAACzQXCfyDX/AUHKkAAgUP7318GsNOaF5wHehvoZ0aY7QwMINf9AXoNGiFgICAgBDSAGawHIIBYGMBOApn+l0FMXBoUGZD4A+uAOhlo4///UC+AnAG05PfvP6DoYgAIIJALGP7+BRsGBoxwBgPEyf8h4QOh/oPlQU7//RuSLgACCGzAn7//GKBWgv0ICjgGsEKIf8H+Btv+F5xGgCyGn7//g10AEECgQGT4+w/i5LpIGQZiQOnsq8BwgbgEIIBYQFH2Fxa6QEMmHkvBqznPcjbQy3/ACQukASCAWCB+/Q8OcRCwkokl6IJ/QBv//gYnPwaAAGIB+u0/0AuMsDA49mQxXs0msnZAF/wFpw+QXoAAYgFa/uDXn3+Kxspc4AxTYD2HoAvEeYEu+Au28D1AADGaZe3qBxqkBnSBJdBIQZCzwFH3/x84kJBpWMxAIv3/ZwZGpssAAQYAIXxui1/HoMEAAAAASUVORK5CYII%3D',savecomplete:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAAN6SURBVDhPTZLrT5tlGIf7HziDi/GLZsk0ZsYYDq0YsrEAbrq5KPvieWEwOk6DSWYmh204YYByBoHCKO06oIVWThaEopgFNrp1DOQwgoMhOg6FVqDjVA6XT19j4ocrT94373397vt+H5kitusLQYHAJnAK3IpYy64ARcy/vBXXRUD8z/gk6tibHbLpVfz6yt7SA917dV57ZKKgcnBqjcGpdTa2dlkXrG3usLS6jX3JjWNlS3qedTl46eY+Tna+x7leJaHifFH92phHMDb4eI20+nnW3KLYvcOZnD6cri3sy1usrG1L4qQ7Vwg2B1I4kkXS/QQKR7M5YNyPR7A0IASX9XMsi489eATzy26cT7dYF8K+2X72aJ4hdySDRJtSouBhphC8IgnctolVIZhlTrTsQZlrZV6cro0dNkRXQS1vE289S/F4NlH3PqFqsoTPb32Id36UR2DZtT56yqW6Wf5Y3JT407Ep0rel9MoRLT6Nb6CZKuOr4VhKJ3LIGL7EoaZgfGMbJAFa221OaPIJzbtBpEg/m2clrugeyqJunlO/QJFILp7MJGciDe10OYfbAkhv/xE/ZSuy56+eZH/NPt5tC8FL8yzyqghSbk6TopvGX3uKUz0fUfvkOlmTyfxgryHaGk6oPpUK8wR+kc3IZKUyrg1cJl8sKG/0mtSuj/pjwnQmXm14GeOcjpK/MjEuaCl5nMOhxqMkXO/n+6ZxfM80CkGZjCLxS1IenCdt6Etp1qMdQYhLQvbYVfT2KqrtRTQ76njHEoxS3cF51Sh5DSP4RpjECN+E4t/sh+r3AjJGk/hu/Ar6mWrShpNodRhQLxTS5WrhwkAcqocV0p04VzrEt3W/4RMulugvlnjE9CmB5gC0U+XkT6STKeZtWdRTs6ii3WWkeqaM4+2BZP0aLt3KmOIHpOv68TldLwRxFtpsThSazzhuOYJhRkPFkzwKZ9Ix/F1Fh6uRD345hmGklluPuiVBVMF9vlbbhECP7M3Yzt3Wuw6Sb0wR35vAQbM/hjkNRqeG7lUzyUOJRFrel9L/6yAy9y6plVa8w+p2ZfKYzknT7QVMvXZpvovWixyzhNDiNKCaLiCyJ1x6/39SK/pIKr/jEThkipjOfHl0h1ke/ZNTHtWOPMqMPCeRg02HCTKdQHFBhU+EUSysXrRsEEV6Kdk7rHbZ+7S+5x96SM+LUN/dOQAAAABJRU5ErkJggg==',close:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII%3D'}};}

/*  Script Updater
 *  --------------
 *  @autor      PhasmaExMachina (mod by 1nfected)
 *  @version    1.1
 */
ScriptUpdater=function(){var _version="1.1";var isGM=typeof GM_getValue!="undefined"&&typeof GM_getValue("a","b")!="undefined";function $(id){return document.getElementById(id)}function initVars(id,currentVersion,callbackfn,notice,noticeEnabled){this.scriptId=id;this.scriptCurrentVersion=typeof currentVersion!="undefined"?currentVersion.toString():false;this.callbackFunction=typeof callbackfn=="function"?callbackfn:false;this.useNotice=notice;this.forceNoticeEnabled=noticeEnabled;this.interval=getInterval(); this.lastCheck=getLastCheck()}function checkRemoteScript(){if(scriptCurrentVersion&&!alreadyOffered(scriptCurrentVersion))addOffer(scriptCurrentVersion);var d=new Date;if(isGM){GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+scriptId+".meta.js",headers:{"User-agent":"Mozilla/5.0","Accept":"text/html"},onload:function(response){handleResponse(response.responseText)}});setVal("lastCheck",d.getTime())}else if(jsURL){var script=document.createElement("script");script.src= jsURL;script.type="text/javascript";var versionCheckDiv=document.createElement("div");versionCheckDiv.id="ScriptUpdater-"+scriptId;versionCheckDiv.style.display="none";versionCheckDiv.addEventListener("DOMNodeInserted",function(){handleResponse(versionCheckDiv.textContent);versionCheckDiv.parentNode.removeChild(versionCheckDiv);script.parentNode.removeChild(script)},false);document.body.appendChild(versionCheckDiv);document.getElementsByTagName("head")[0].appendChild(script);setVal("lastCheck",d.getTime())}} function handleResponse(response){this.meta=parseHeaders(response);setVal("versionAvailable",meta.version);if(forceNoticeEnabled||scriptCurrentVersion!=meta.version&&useNotice){if(!alreadyOffered(meta.version))addOffer(meta.version);showNotice()}if(typeof callbackFunction=="function")callbackFunction(meta.version)}function parseHeaders(metadataBlock){var source=metadataBlock;var headers={};var tmp=source.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);if(tmp){var lines=tmp[0].match(/@(.*?)(\n|\r)/g); for(var i=0;i<lines.length;i++){var tmp=lines[i].match(/^@([^\s]*?)\s+(.*)/);var key=tmp[1];var value=tmp[2];if(headers[key]&&!(headers[key]instanceof Array))headers[key]=new Array(headers[key]);if(headers[key]instanceof Array)headers[key].push(value);else headers[key]=value}}return headers}function showNotice(){if(meta.name&&meta.version){var s="#ScriptUpdater-"+scriptId+"-";addStyle(s+"Mask{position:fixed;width:100%;top:0;left:0;height:100%;background-color:#000;opacity:.7;z-index:9000}"+s+"BodyWrapper{position:absolute;width:100%;top:0;left:0;z-index:9010;max-width:auto;min-width:auto;max-height:auto;min-height:auto}"+ s+"Body *{border:none;font-size:12px;color:#333;font-weight:normal;margin:0;padding:0;background:none;text-decoration:none;font-family:sans-serif}"+s+"Body{width:500px;margin:auto;top:125px;position:fixed;left:35%;text-align:left;background:#f9f9f9;border:1px outset #333;padding:0;font-family:sans-serif;font-size:14px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;cursor:default;z-index:9010;color:#333;padding-bottom:1em}"+s+"Body a{margin:0 .5em;text-decoration:underline;color:#009;font-weight:bold}"+ s+"Body strong{font-weight:bold}"+s+"Body h1{font-size:13px;font-weight:bold;padding:.5em;border-bottom:1px solid #333;background-color:#999;margin-bottom:.75em}"+s+"Body h2{font-weight:bold;margin:.5em 1em}"+s+"Body h1 img{margin-top:2px;vertical-align:middle}"+s+"Body h1 a{font-size:17px;font-weight:bold;color:#fff;text-decoration:none;cursor:help;vertical-align:middle}"+s+"Body h1 a:hover{text-decoration:underline}"+s+"Body table{width:auto;margin:0 1em}"+s+"Body table tr th{padding-left:2em;text-align:right;padding-right:.5em;line-height:2em}"+ s+"Body table tr td{line-height:2em;font-weight:bold}"+s+"Body p{font-size:12px;font-weight:normal;margin:1em}"+s+"CloseButton{background-image:url("+icons.close+")!important}"+s+"InstallButton{background-image:url("+icons.install+")!important}"+s+"History{margin:0 1em 1em 1em;max-height:150px;overflow-y:auto;border:1px inset #999;padding:0 1em 1em;width:448px}"+s+"History ul{margin-left:2em}"+s+"Close{float:right;cursor:pointer;height:14px}"+s+"Footer{margin:.75em 1em}"+s+"Footer input{border:1px outset #666;padding:3px 5px 5px 22px;background:no-repeat 4px center #eee;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;cursor:pointer;float:right;margin-left:.5em}"+ s+"Footer input:hover{background-color:#f9f9f9}"+s+"Footer select{border:1px inset #666}");var noticeBg=document.createElement("div");noticeBg.id="ScriptUpdater-"+scriptId+"-Mask";document.body.appendChild(noticeBg);var noticeWrapper=document.createElement("div");noticeWrapper.id="ScriptUpdater-"+scriptId+"-BodyWrapper";var html=new Array;var notice=document.createElement("div");notice.id="ScriptUpdater-"+scriptId+"-Body";html.push('<h1><img id="ScriptUpdater-'+scriptId+'-Close" src="');html.push(icons.close); html.push('" title="Close"/><img id="ScriptUpdater-'+scriptId+'-USO" src="');html.push(icons.uso);html.push('"/><a href="http://userscripts.org/scripts/show/57756" target="_blank" title="About Userscripts.org Script Updater v');html.push(_version);html.push('">Userscripts.org Updater</a></h1>');if(!forceNoticeEnabled){html.push('<p>There is a new version of <strong><a href="http://userscripts.org/scripts/show/');html.push(scriptId);html.push('" target="_blank" title="Go to script page">');html.push(meta.name); html.push("</a> </strong> available for installation.</p>")}else{html.push('<p><strong><a href="http://userscripts.org/scripts/show/');html.push(scriptId);html.push('" target="_blank" title="Go to script page" style="margin:0; padding:0;">');html.push(meta.name);html.push("</a> </strong></p>")}if(scriptCurrentVersion){html.push("<p>You currently have version <strong>");html.push(scriptCurrentVersion);html.push("</strong> installed. The latest version is <strong>");html.push(meta.version);html.push("</strong></p>")}if(meta.history){html.push('<h2>Version History:</h2><div id="ScriptUpdater-'+ scriptId+'-History">');var history=new Array;var version,desc;if(typeof meta.history!="string")for(var i=0;i<meta.history.length;i++){var tmp=meta.history[i].match(/(\S+)\s+(.*)$/);version=tmp[1];change=tmp[2];history[version]=typeof history[version]=="undefined"?new Array:history[version];history[version].push(change)}else{var tmp=meta.history.match(/(\S+)\s+(.*)$/);version=tmp[1];change=tmp[2];history[version]=typeof history[version]=="undefined"?new Array:history[version];history[version].push(change)}for(var v in history){html.push('<div style="margin-top:.75em;"><strong>v'+ v+"</strong></div><ul>");for(var i=0;i<history[v].length;i++)html.push("<li>"+history[v][i]+"</li>");html.push("</ul>")}html.push("</div>")}html.push('<div id="ScriptUpdater-'+scriptId+'-Footer">');html.push('<input type="button" id="ScriptUpdater-'+scriptId+'-CloseButton" value="Close"/>');html.push('<input type="button" id="ScriptUpdater-'+scriptId+'-InstallButton" value="Install"/>');html.push("Check for updates every ");html.push('<select id="ScriptUpdater-'+scriptId+'-Interval"><option value="3600000"> Hour </option><option value="21600000"> 6 Hours </option><option value="43200000"> 12 Hours </option><option value="86400000"> Day </option><option value="259200000"> 3 Days </option><option value="604800000"> Week </option><option value="0">Never</option></select>'); html.push("</div>");notice.innerHTML=html.join("");noticeWrapper.appendChild(notice);document.body.appendChild(noticeWrapper);$("ScriptUpdater-"+scriptId+"-Close").addEventListener("click",closeNotice,true);$("ScriptUpdater-"+scriptId+"-CloseButton").addEventListener("click",closeNotice,true);$("ScriptUpdater-"+scriptId+"-InstallButton").addEventListener("click",function(){setTimeout(closeNotice,500);document.location=typeof installUrl=="string"?installUrl:"http://userscripts.org/scripts/source/"+ scriptId+".user.js"},true);window.addEventListener("keyup",keyUpHandler,true);var selector=$("ScriptUpdater-"+scriptId+"-Interval");for(var i=0;i<selector.options.length;i++)if(selector.options[i].value.toString()==interval.toString())selector.options[i].selected=true;selector.addEventListener("change",function(){interval=this.value;setVal("interval",parseInt(interval))},true);noticeWrapper.style.height=document.documentElement.clientHeight+"px";$("ScriptUpdater-"+scriptId+"-Mask").style.height=window.scrollMaxY+ window.innerHeight+"px"}}function closeNotice(){document.body.removeChild($("ScriptUpdater-"+scriptId+"-BodyWrapper"));document.body.removeChild($("ScriptUpdater-"+scriptId+"-Mask"));window.removeEventListener("keyup",keyUpHandler,true)}function keyUpHandler(e){if(e.keyCode==27)closeNotice()}function addStyle(css){var head=document.getElementsByTagName("head")[0];if(!head)return;var style=document.createElement("style");style.type="text/css";style.appendChild(document.createTextNode(css));head.appendChild(style)} function getVal(key,defValue){if(isGM)return eval(GM_getValue("ScriptUpdater."+key,"({})"));else{key="ScriptUpdater."+scriptId+"."+key;var value=localStorage.getItem(key);if(value==null)return defValue;else switch(value.substr(0,2)){case "S]":return value.substr(2);case "N]":return parseInt(value.substr(2));case "B]":return value.substr(2)=="true";case "A]":return value.substr(2).split(",")}return value}}function setVal(key,value){if(isGM)GM_setValue("ScriptUpdater."+key,uneval(value));else{key="ScriptUpdater."+ scriptId+"."+key;switch(typeof value){case "string":localStorage.setItem(key,"S]"+value);break;case "number":if(value.toString().indexOf(".")<0)localStorage.setItem(key,"N]"+value);break;case "boolean":localStorage.setItem(key,"B]"+value);break;case "object":localStorage.setItem(key,"A]"+value.join(","));break}}}function alreadyOffered(version){var offers=getOffers();if(offers.length==0){addOffer(version);return true}for(var i=0;i<offers.length;i++)if(version.toString()==offers[i].toString())return true; return false}function getOffers(){var offers=getVal("versionsOffered");return typeof offers=="undefined"||typeof offers.length=="undefined"||typeof offers.push=="undefined"?new Array:offers}function addOffer(version){var offers=getOffers();offers.push(version);setVal("versionsOffered",offers)}function getInterval(){var val=getVal("interval");return typeof val=="undefined"||!val.toString().match(/^\d+$/)?864E5:parseInt(val.toString())}function getLastCheck(){var val=getVal("lastCheck");return typeof val== "undefined"||!val.toString().match(/^\d+$/)?0:parseInt(val.toString())}var icons={install:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKCSURBVHjaYjTL3lPIwMAgD8Q2QKwExDwMDP9ZgDQjw38GMGBmYmRgAuL///8x/PvH8IGNleHO95+/O09N81wDEEAghVqzS61SQOrVpdnBev7/+8/w6w8Q//4H1szJzsTAyMjA8OX7P4YvP/7y33v+xWDhzrszzLK28QMEEBNQvS1I1/pTnxiA+oC2/GfIm3waaBOQA9TFygKxHWTgd6CBf/4xMP5lYGKJd1cW5mRnmwoQQCADJEC2gjT8Bsr+/gNx928gn4WZAWwASO77L6gc0IIDlz8zsLEyM3z/+YcNIIBAXuD68w/scLAiEGACufc/SDPQ6UD4A2jz95//gS78D3YliH729gfIMEaAAGIBBdhfoAAQMfyE2l6bYADWDEQMv//+Z/j2E+R0cAACzQXCfyDX/AUHKkAAgUP7318GsNOaF5wHehvoZ0aY7QwMINf9AXoNGiFgICAgBDSAGawHIIBYGMBOApn+l0FMXBoUGZD4A+uAOhlo4///UC+AnAG05PfvP6DoYgAIIJALGP7+BRsGBoxwBgPEyf8h4QOh/oPlQU7//RuSLgACCGzAn7//GKBWgv0ICjgGsEKIf8H+Btv+F5xGgCyGn7//g10AEECgQGT4+w/i5LpIGQZiQOnsq8BwgbgEIIBYQFH2Fxa6QEMmHkvBqznPcjbQy3/ACQukASCAWCB+/Q8OcRCwkokl6IJ/QBv//gYnPwaAAGIB+u0/0AuMsDA49mQxXs0msnZAF/wFpw+QXoAAYgFa/uDXn3+Kxspc4AxTYD2HoAvEeYEu+Au28D1AADGaZe3qBxqkBnSBJdBIQZCzwFH3/x84kJBpWMxAIv3/ZwZGpssAAQYAIXxui1/HoMEAAAAASUVORK5CYII%3D", close:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII%3D", uso:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKwSURBVHjabJNJTBNRGID/mc5MQYVWVNCGTbEtNZGDBj1ogolEMR5UJA2LBmMoIokxERIj8ehJjx6MYIQoJgq4JIa6gEARkKJFTa2iFFtKWwp2oeDCzNQ+31DQCc5L/nmT/P/3749ACAFBECBxiEPFFds0Ws399DRVhtX2udc97ig0PmgOLBkIbOwjAR8uMRRdvXF7pqv/NfrqnEAOlxsdLas6j3Wk2AEpCRcbKvLydrdu1WUr0lXrITEhAZKUSkhQKvKwXiY2ppbDRzCcv29P/ZZsDaSqUkCJYVJGwKMnHTDlmWgTZ/CvjkW4sKTScP1WC+oZsKAxpwv5gyEUnAkj2xc70p88Y8Y2a8VBxT0gispOGa413UVDb23IMe6OwaEw+jTqQKMOF3pptqBSw7k74hLEPaDUOu0VmpFDV58ZCJIAkiDB5fUBz0eApmjQqbOgrqa69HhVbZO4jKUfmiBJBctysHJFPPiDYbA7J4DjeJDLaWAYGVAyErIy0uDs6RPH9OXVtULWYgfEmN3emJK8BlYrEsHl8cEvloX4ODnEyRlgKGZhV1iOhcz0VNixM7dOCCp2EBkeMF3u6DaNqDasg1U4CzlFxxSRKMyz8xjmsPAQwNmRsc2jxGPkR0esHp7n9RBFrYbyUi1DUzh1GujFG0UBQrNz8P7DR3j+9NklqTEK3VVkbNLkVNZc9AwNW5Hb60PT/gCamg6gEbsT3XvYjvIP6i9gu2ShhOWb+BvLD13O9o3azWrVdy4K3wKhv5HfWW1Q39BY19nechPbzQrVwX9bhU+iIqnyQMF+mPvJQr/FCsHwDJgG30ADhl8Y2wQ4jIUVkpdaZRnPcd6AfxomJ32AIhEwdvaC8XG7JLwwvmXPmVFn52Tu2lvQjN9Crn3M6bWY+6otr3oGpWCB/SPAAJaJRguGUxB0AAAAAElFTkSuQmCC"}; return{setjsURL:function(url){if(url!="undefined"&&typeof url=="string")jsURL=url},check:function(scriptId,currentVersion,callback){initVars(scriptId,currentVersion,callback,true,false);var d=new Date;if(interval>0&&d.getTime()-lastCheck>interval)checkRemoteScript()},forceCheck:function(scriptId,currentVersion,callback){initVars(scriptId,currentVersion,callback,true,false);checkRemoteScript()},getLatestVersion:function(scriptId,callback){if(typeof callback!="function")alert("ScriptUpdater error:\n\n scriptUpdater.getLatestVersion() requires a callback function as the second argument"); initVars(scriptId,callback,false,false,false);checkRemoteScript()},forceNotice:function(scriptId,currentVersion,callback){initVars(scriptId,currentVersion,callback,true,true);checkRemoteScript()},checkStored:function(){if(typeof scriptId!="undefined"&&typeof scriptCurrentVersion!="undefined")return typeof getVal("versionAvailable")!="undefined"&&scriptCurrentVersion.toString()!=getVal("versionAvailable").toString();else return false}}}();

//-------------------------------------------------------------------------------------------

// Create Preferences.
devtools.config.init({
	title: 'Userstyles.org Enhancer Preferences',
	settings: {
		'sortdir': {
			type: 'radio',
			label: 'Default sort direction for table.',
			options: {
				'Descending': 'desc',
				'Ascending': 'asc'
			},
			defaultValue: 'desc'
		},
		'sk4all': {
			type: 'checkbox',
			label: 'Enable Stats-keeper for everyone.',
			defaultValue: false
		},
		'metadata': {
			type: 'checkbox',
			label: 'Enable Metadata fetcher.',
			defaultValue: true
		},
		'auto': {
			type: 'checkbox',
			label: 'Auto fetch metadata on page load.',
			defaultValue: false
		},
		'popup': {
			type: 'checkbox',
			label: 'Screenshot preview on hover.',
			defaultValue: true
		}
	},
	css: '#devtools-wrapper .dialog input[type="checkbox"]{margin:5px 3px 5px 5px !important}'
});

var sortdir = devtools.config.get('sortdir');
var sk4all = devtools.config.get('sk4all');
var metadata = devtools.config.get('metadata');
var auto = devtools.config.get('auto');
var popup = devtools.config.get('popup');

var scriptID = 80666;
var version = '1.4.5';

// Check for Greasemonkey API & adapt accordingly
function testGM() {
	const STORAGE_PREFIX = 'ustoe-';
	const LOG_PREFIX = 'Userstyles.org Enhancer: ';
	const LOG = true; // Enable logging
	const DEBUG = false; // Set Debugging ON/OFF
	isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
	log = isGM ? function(msg) { if(LOG) GM_log(msg) } : window.opera ? function(msg) { if(LOG) opera.postError(LOG_PREFIX+msg); } : function(msg) { try { if(LOG) console.log(LOG_PREFIX+msg); } catch(e) {} }
	debug = function(msg) { if(LOG && DEBUG) log('** Debug: '+msg+' **') }
	addStyle = isGM ? GM_addStyle : function(css) { var head = $('head')[0]; if(!head) return; var style = $c('style',{type:'text/css',innerHTML:css}); head.appendChild(style); }
	setValue = isGM ? GM_setValue : function(name,value) { switch (typeof(value)) { case 'string': localStorage.setItem(STORAGE_PREFIX+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.') < 0) { localStorage.setItem(STORAGE_PREFIX+name,'N]'+value); } break; case 'boolean': localStorage.setItem(STORAGE_PREFIX+name,'B]'+value); break; } }
	getValue = isGM ? GM_getValue : function(name,defValue) { var value = localStorage.getItem(STORAGE_PREFIX+name); if(value == null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2) == 'true'; } } return value; }
	deleteValue = isGM ? GM_deleteValue : function(name) { localStorage.removeItem(STORAGE_PREFIX+name); }
	xhr = isGM ? GM_xmlhttpRequest : function(obj) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState == 4 && obj.onload) { obj.onload(request); } }
		request.onerror = function() { if(obj.onerror) { obj.onerror(request); } }
		try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
		if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
		request.send(obj.data); return request;
	}
	jParse = (window.JSON && window.JSON.parse) ? window.JSON.parse : eval;
	jStringify = (window.JSON && window.JSON.stringify) ? window.JSON.stringify : uneval;
}


// -------------- HELPER FUNCTIONS -------------- //

// All in one function to get elements
function $(q,root,single,context) {
	root = root || document;
	context = context || root;
	if(q[0] == '#') return root.getElementById(q.substr(1));
	if(q.match(/^[\/*]|^\.[\/\.]/)) {
		if(single) return root.evaluate(q,context,null,9,null).singleNodeValue;
		var arr = []; var xpr = root.evaluate(q,context,null,7,null);
		for(var i = 0, len = xpr.snapshotLength; i < len; i++) arr.push(xpr.snapshotItem(i));
		return arr;
	}
	if(q[0] == '.') {
		if(single) return root.getElementsByClassName(q.substr(1))[0];
		return root.getElementsByClassName(q.substr(1));
	}
	if(single) return root.getElementsByTagName(q)[0];
	return root.getElementsByTagName(q);
}

// Function to create an Element
function $c(type,props,evls) {
	var node = document.createElement(type);
	// Set node properties
	if(props && typeof props == 'object') {
		for(prop in props) {
			if(typeof node[prop] == 'undefined') node.setAttribute(prop,props[prop]);
			else node[prop] = props[prop];
		}
	}
	// Attach event listeners
	if(evls instanceof Array) {
		for(var i = 0; i < evls.length; i++) {
			var evl = evls[i];
			if(typeof evl.type == 'string' && typeof evl.fn == 'function')
				node.addEventListener(evl.type,evl.fn,false);
		}
	}
	return node;
}

// Creates a span element which displays the stats diffrence
function createDiffSpan(diff) {
	if(diff > 0) return $c('span', {className: 'diffP', innerHTML:'(+'+toCustStr(diff)+')'});
	else return $c('span', {className: 'diffN', innerHTML:'('+toCustStr(diff)+')'});
}

// Returns a number in string format with thousands separator
function toCustStr(num) {
	return num.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g,',');
}

// Returns a number after stripping out the thousands separator
String.prototype.toCustNum = function() {
	return parseFloat(this.replace(',',''));
}

// Trim all kinds of leading and trailing whitepace in a String
// taken from http://blog.stevenlevithan.com/archives/faster-trim-javascript
String.prototype.trim = function() {
	var	str = this.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

// Returns the difference in the two dates passed, in a "Humanized" form.
// Author: Mindeye @userscripts.org
function getDateDiffString(dateNew, dateOld) {
	var dateDiff = new Date(dateNew.getTime() - dateOld.getTime());
	dateDiff.setUTCFullYear(dateDiff.getUTCFullYear() - 1970);

	var strDateDiff = '', timeunitValue = 0;
	var timeunitsHash = { year: 'getUTCFullYear', month: 'getUTCMonth', day: 'getUTCDate', hour: 'getUTCHours', minute: 'getUTCMinutes', second: 'getUTCSeconds', millisecond: 'getUTCMilliseconds' };

	for (var timeunitName in timeunitsHash) {
		timeunitValue = dateDiff[timeunitsHash[timeunitName]]() - ((timeunitName == 'day') ? 1 : 0);
		if (timeunitValue !== 0) {
			if ((timeunitName == 'millisecond') && (strDateDiff.length !== 0)) continue;
			strDateDiff += ((strDateDiff.length === 0) ? '' : ', ') + toCustStr(timeunitValue) + ' ' + timeunitName + (timeunitValue>1?'s':'');
		}
	}
	return strDateDiff.replace(/,([^,]*)$/, ' and$1');
}

// Function to insert an Node after a given Node
function insertAfter(newNode,refNode) {
	if(refNode.nextSibling) return refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
	else return refNode.parentNode.appendChild(newNode);
}

// Removes the given node
function remove(node) {
	if(node) node.parentNode.removeChild(node);
}

// ------------ END HELPER FUNCTIONS ------------ //


var url = window.location.href.toLowerCase();

// Determing if on userpage & if logged in
var onUserPage = url.match(/^https?:\/\/userstyles\.org\/users\/\d+/)
var loggedIn = onUserPage && $('//a[@href="/logout"]',document,1);

// Get username
if(onUserPage) var user = document.title.match(/^(.*)?\s-/)[1];

// Get a handle to style-list element
var styleList = loggedIn ? $('.author-styles')[0] : $('#main-article');

// Will hold style objects
var styleArray = [];

// All the styles in styleList
var styles = loggedIn ? $('//tbody/tr') : $('.style-brief');//,document,0,$('.author-styles',1));
var styleCount = styles.length;
if(styleCount < 1) return; // Exit if no styles found.

// Variables needed for Stats-keeper & User Summary
var DATA = {};
var totalInstalls = 0;
var totalWeekly = 0;
var totalObsoleteInstalls = 0;
var totalObsoleteWeekly = 0;
var obsoleteCount = $('.obsolete',styleList).length;
if(loggedIn) {
	var ratingGood = $('.good-average-rating',styleList).length;
	var ratingOk = $('.ok-average-rating',styleList).length;
	var ratingBad = $('.bad-average-rating',styleList).length;
}
else{
	var ratingGood = $('.good-rating',styleList).length;
	var ratingOk = $('.ok-rating',styleList).length;
	var ratingBad = $('.bad-rating',styleList).length;
}

// Populate stlyeArray by parsing all styles on the page.
for(var i = 0; i < styleCount; i++) {
	var styleObj = {};
	var style = styles[i];
	
	if(loggedIn) {
		var link = $('a',style,1);
		styleObj.id = link.href.match(/\/(\d+)\//)[1];
		styleObj.name = link.textContent;
		var installs = $('.numeric-value',style);
		styleObj.installs = installs[1].textContent.toCustNum();
		styleObj.weekly = installs[0].textContent.toCustNum();
		var dates = $('.date-value',style);
		styleObj.updated = dates[0].textContent;
		var rating = $('img',style,1);
		if(rating) {
			switch(rating.className) {
				case 'good-average-rating':
					styleObj.rating = 3;
					break;
				case 'ok-average-rating':
					styleObj.rating = 2;
					break;
				case 'bad-average-rating':
					styleObj.rating = 1;
					break;
			}
			styleObj.rated = true;
		}
		else {
			styleObj.rating = 0;
			styleObj.rated = false;
		}
		styleObj.obsolete = Boolean($('.obsolete',style,1));
		if(styleObj.obsolete) {
			totalObsoleteInstalls += parseInt(styleObj.installs);
			totalObsoleteWeekly += parseInt(styleObj.weekly);
		}
		
	}
	else {
		var link = $('a',$('header',style,1),1);
		styleObj.id = link.href.match(/\/(\d+)\//)[1];
		styleObj.name = link.textContent;
		styleObj.isOwn = style.className.indexOf('by-current-user') != -1;
		styleObj.installs = style.getAttribute('total-install-count');
		styleObj.weekly = style.getAttribute('weekly-install-count');
		var updated = $('.style-brief-stats',style,1);
		if(updated) {
			updated = updated.children[0].textContent.match(/Updated:\s+(.*)\s+/)[1];
			styleObj.updated = updated.replace(/\s+/g,' ');
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
	
	if(onUserPage) {
		if(sk4all || loggedIn) {
			var id = styleObj.id;
			DATA[id] = {};
			DATA[id].installs = styleObj.installs;
			DATA[id].weekly = styleObj.weekly;
		}
		
		totalInstalls += parseInt(styleObj.installs);
		totalWeekly += parseInt(styleObj.weekly);
	}
}

// Our table which will replace the style-list element
var styleTable = $c('table',{id:'style-table'});

// Add CSS for the table
addStyle('#summary,#lastcheck,#style-table{font-family:Ubuntu,Verdana!important;font-size:9pt!important}#summary{-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;background-color:#444;color:#e5e5e5;margin:10px;padding:5px;min-width:400px}#summary .title{font-size:13pt;font-weight:bold;color:#fd0}#summary .good{color:#0f0}#summary .ok{color:#fd0}#summary .bad{color:red}#summary .good,#summary .ok,#summary .bad{font-weight:bold}#lastcheck{color:gray;padding:2px 10px}#table-container{-moz-border-radius:5px 5px 0 0;-webkit-border-radius:5px 5px 0 0;border-radius:5px 5px 0 0;border:2px solid #444;margin:5px 10px;display:inline-block}#style-table{min-width:700px;border-collapse:collapse;margin:0}#style-table .obsolete{text-decoration:none!important}#style-table tr:hover td{background-color:rgba(0,0,0,.1)}#style-table td,#style-table th{padding:2px 5px;text-align:center;border:1px solid #444!important}#style-table th{background:#444;padding:4px 5px;border:1px solid #444;color:#fd0}#style-table th:hover{cursor:pointer}#style-table tr td:nth-child(2){text-align:left}#style-table a{margin-right:15px;text-decoration:none!important;line-height:20px}#style-table a:hover{text-decoration:underline}#style-table .obsolete:not(:hover){opacity:.4}th span.diffP{color:limegreen}td span.diffP{color:green}span.diffN{color:red}span.diffP,span.diffN{padding-left:2px}#style-table td a{margin-right:5px!important}#style-table .meta{display:inline;color:gray;font-size:80%!important}#style-table .subtitle{margin-right:15px}#style-table .url{color:red!important;margin-right:5px}#style-table .delete,#style-table .edit,#style-table #metaPrefs,#style-table #metaOpen,#style-table #metaClose,#style-table .metalink,#style-table .metascreenmain,#style-table .metascreenmore,#style-table .metadiscussions{float:right;width:20px;height:20px;background-position:center;background-repeat:no-repeat;margin:0!important}#style-table img[class^=\"metafavicon\"]{margin-right:4px;vertical-align:top;width:16px;height:16px;display:inline-block}#style-table .delete{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAIABKAIc2U4ruAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gMcCDcBvM8GfwAAADV0RVh0Q29tbWVudAAoYykgMjAwNCBKYWt1YiBTdGVpbmVyCgpDcmVhdGVkIHdpdGggVGhlIEdJTVCQ2YtvAAACnUlEQVQ4y6XST28TRxzG8e/Mbrx2vGsgB5zYRoUS0kKRUKqoh5577C1CfRNUvVVIICSQilquvAN6qCiFN4DaS1FFBUhQl15Ko4SgGvCfXWd3nZ3Z3RkOEU5A3JjTzOWjeZ7fD97ziNeX7698tw9YBU5KKU8KIRaNMfMAUoqetfaJMbYL/APcOvvtuWgKXLx04XMEtw9/cMT9aGmpsrDQwg8aeJUZiqIkSWOiKGQ0Gtr1pxt6Y329sJYvLpy/eNcF0Hn+6/LycrXd6nD/UZet3+8SxTHjJMH3AzqdDnP7G7gSsXTsuPfpqWXv519u/AbMugCmLNxOu8Olyz8QbiUEQQO/0cAPAhy3Qu9ln/4oJBwO+fPeA85+cwat9QyAC6B0Tqd9iJ9+vMajv7o8f9HnWa/H5v89/KDBiY+XaM0f5EAjYPHIhxRFjta5mAJ5nvPf2hNc1+XY0aN8trKC4zhIKbHWorViMpmwFY/pPn5Ia6FNnmv2ABqtNXEc0w/6eJ6H4zgYU6K0Ik0TkiQhSWPSSUqzOU+e7/xA7gAFSinA7s5XvDXnPa+yKNA6ZwpUvapQWmEtbyBvEHuksiyp1Wq7gM6V1VpTq80ihMBa+86tk1JSrdZQWUae690IYRghhcM4ClGZIk1TlNJTyBqDKQ1FUTAc9NnOJoRhtFviTmbB2voa43iMX6/j1+vMztYpS02WbROOI6KtCKUU7VZnGmoKPO/1aB5sUq1V8SozOI4DGIwxOI6D53n49QDfbzAYDqZlOQAnPjne3Xz29MssU9ZiXYHEq1TwfR8hBJPJNmEUMegP2NjYVHfu/JFJKVf/7j7+d9rt6a9W54QQX7uuuyKEOGStbZZlOYe1OK47EoIXxtjNsizvW2uv3rh+cwTwCpDtR2y4fzwDAAAAAElFTkSuQmCC)}#style-table .edit{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJTSURBVDiNfZLfS5NRGMc/Z717t3dzc82NFiGIy2GswoToB4hl+SMjuoi667abLsP/oKvSPyEIuohuLKIkK+pitYEr8QeTudQEUSwbIrbNnXc7bxfW4G3Zc3Pg4fl+zvd7niOy2WyPUmrEsqwO9iiHlDQ9H6UsJT/7B1FNIYQQUw6H445DSjkSiUQ6JiYmiEaj/Ot0qSpWgw+xuEA2lSIajZJIJDqklCMinU5b8Xgcy7L2MkAqlcLr9fLwwQPuDw+zz+lECEEmk0EzTZNqtbqnGMCjV1hZWcHlFChAKAWAaZpoUkrU78aL19N1Yr+7zEDgLp68wZRs5NnYJ670n0DTNKSUdsDgxWN1AJfMUn78Ef+Smxs3nxBsjaGUQim1CzBNs5b/5ZuZOkB3c4KwprNaNJjJVdC+znL96hksy9qNYJpmzcGlC0f/klsEF+9RdeoUDnTSdfowoVCoNl/3BmNvZ23yUEOJy8YkmlNnrniI+Q/zNAY2alFLpZLdwUBP3AbwymkKT7+zmnNxvLePWOcpdF1ne3ubQqHA1taWHfDqXcYGGGhLE3AHWS4JZpYtst8+s7n5g7MnWzEMg52dHXuEvnNHbICGYpGVxlsUwpM0RzQqlQIHQ0GklPj9fnRdR6tUKrUtjL+fswEiMomRX2JhfxfefB6Px0M4HKalpQWPxwNgj9Db3W4DjD8aZSNvEGoPEQwGicViBAIBAJRSu1sQQuTW1tZikUik7g+cv3Ybze2z9f5ctr6+jhAip7nd7qFkMjlcLpfb6gj/KZfL9cXn8w39AhsaKcU8/gx6AAAAAElFTkSuQmCC);background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFUSURBVDjLrZM/SAJxGIZdWwuDlnCplkAEm1zkaIiGFFpyMIwGK5KGoK2lphDKkMDg3LLUSIJsSKhIi+684CokOtTiMizCGuzEU5K3vOEgKvtBDe/2Pc8H3x8NAM1fQlx4H9M3pcOWp6TXWmM8A7j0629v1nraiAVC0IrrwATKIgs5xyG5QiE+Z4iQdoeU2oAsnqCSO1NSTu+D9VhqRLD8nIB8F0Q2MgmJDyipCzjvYJkIfpN2UBLG8MpP4dxvQ3ZzGuyyBQ2H+AnOOCBd9aL6soh81A5hyYSGWyCFvxUcerqI4S+CvYVOFPMHxLAq8I3qdHVY5LbBhJzEsCrwutpRFBlUHy6wO2tEYtWAzLELPN2P03kjfj3luqDycV2F8AgefWbEnVqEHa2IznSD6BdsVDNStB0lfh0FPoQjdx8RrAqGzC0YprSgxzsUMOY2bf37N/6Ud1Vc9yYcH50CAAAAAElFTkSuQmCC)}#style-table #metaPrefs{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QAbgCEALDyHHKDAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAB3RJTUUH1gIOETowjDhWUwAAAfhJREFUOMvlkk9oE1EQh78kajUpNlEoCCrBshcP2vYWsXrQpRC7Vw+CB6EiRa22SEgJtBgICYGeBdGTASmKBzc2Qos9CUrbJCY9VAhWpY39ZwhCRKS762W3bJJNW6/t7/bezPvezPwG9pxsVpexeKQHkAEpGAglG7zticUjdTn2Bsly741eAFmHW8Ju3exT9I+3Vywe0crlkhaLRzTrWNmIVX1oN7dpPDaqcjqbG42Dx08eEQyEJCBpCQTk/jv3tRcvxzRAvnd3kLWVZYQ2gVJp/WHtbAMPhmy1sCpTjOTbff2aomzYVFXVVFUhPTtjS3/KAEg7MKraZVMFm/J3XyGXz7NY/A4QDgZCI/+9Nma9Tb3RsvksHWc6yeTS6BWOA+qOgF5/9BhQNM7XfSrtpwVOHD9JpVLh48wHtmrbYQUbHRDp9rXR6nGSmFrjVMvP8MK3hYsdZzvxuD0sFRevXRYvzU5OvCsAmqXLXn+0HSg+HZaYzs0znZun9YgLAH1uUjL1GkEQuHCuy1j6unma1yYzOiAy8T7LhqJiP+hmtVTZDOotSonnzzjc4ua8rwtgeCsgAPv3OTjgOsqf339JpOYAxFpoMiVT+FKwNLEKuLT6i0MuD81NDl5NfQYQv44PTZpzdGh4eeXHHBBu6LLXH70KjJlidbDdoX/so9X2d8JO4gAAAABJRU5ErkJggg==)}#style-table #metaOpen{background:center no-repeat url(data:image/gif;base64,R0lGODlhDAAMAIIAMXzESanYdkSlAJPPVP///wAAAAAAAAAAACH5BAEAAAQALAAAAAAMAAwAAgMqSArSAioSMeoQUlGL866d9F0R01hXwwQoGmAC275R7IaaTGdTsPMTHCEBADs=)}#style-table #metaClose{background:center no-repeat url(data:image/gif;base64,R0lGODlhDAAMAIIAMcZTRtdraqURANFRUf///wAAAAAAAAAAACH5BAEAAAQALAAAAAAMAAwAAgMnSKoi+2wMB4mQkq6L8+6dIwRkRwYC0HBZA3yYBnsQO1XjKSvq+ioJADs=)}#style-table .metalink{cursor:pointer;background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgWESQAJylMXwAAAgZJREFUOMvllE1rE1EUhp85J0lRYpLami6kdCGlIGIWFjcBF9KNBrsvCG4qBrsUlIL/wEVRSCnUPyC4sEIsRRchirgQoQhK/QCjtKRN08ZSYpqZzLiYaTpNDC247IGBO/fc+3DOe94ZOHJhdEokUul+YAJIAUPe9hKQBTKL2ZlfhwYmUunxWCQ8nRw+HxwcOE3dsjBEqNUtCsurvMq/M4Hbi9mZxwcCE6n0+NnBgdlrl5MUiutsVLb5U7cQEUSEvp4YNg4vc2/ZrPy+2Qo1WtuMRcLfb42NBj//WKFc2W6CRBRRdx0+fgzbdph7sWACZ/ztS0uBE6MjyWBpc4uNyjYqgqrycPIGU/euo6KoKDumRVdXkIvDF4KeznQCpnpiEb4Uioiq+8jeEVHxqlRq9QbxeC/e0JoR8L/EIuEhwwfabfPu1BN37WtbRFEjgM8B7UAAMQT1XXxwZ6yZuz/9zAO7lRqGtDlk346KfNsxzWZbIsrko6e+vKLq6qqi4Di73vw3sFzZev5zpUS8J+rp5UL3NFRfhUppvYxn9I5Dycwt5EwHOHUy2hxC87AHElVs2yb/+o0JZA40dnd3bPbqyCUatkGtbvkkcHVtOA65XJ5SqdRmbG0Frn59/yHaf27546elK33xXo1GTtAVChEKBqhbDYpra8zPL5jVajV9qE/vf38ORzD+AntIqtPevfVEAAAAAElFTkSuQmCC)}#style-table .metascreenmain{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAEAA7AKxu/clPAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAB3RJTUUH1gIOBB0lIc1hRgAAAaJJREFUOMulk8tqEwEUhr/OrTODk9oWbegFJaELl6moi9KdgoK7MEwX9TlEn8C9DyBYEMWViHRfEQShKVQr1MwguFEhRo2hJTM5x4U6dByFRv/V4cD5zn0sjJprwDr/pmuEUVPjuK2jKo7bGkZNtQBqtTpJkoyUularA2Addpqmiaogoiig8tNWQVRREVQEz/fzmBzw4OF9Wq2tI2VvNJa4cf1mEdBqbXH5wiKTcx20twDA1943Xu22WVk+C4AChmGy/uRFDjMOk91KjHf6GU6QAML8TIXtl3sM+l0G/S7jJmiWFqopzMAfLqLvJtjvzqKacfvOBp7vcu/RJr43zsWVc5w8MVUAGL/3l36Zx7ZNHMdm7ep5ztTnOBgMaV5ZpjozXZpHoYLjToppDQGln9lUq8cI3FM8397DSD8zW3HJ0uzvgIp9wPs3H/nUTem8/UA2GLLf6XEJg527T3nt2tieA5MLZUCjscStx7/WOAZeFTxg4s9rLAGicJUoXB35GXJAEASoKiKCYRiICCKCZVklXwmQJHF+20dVksQ/mv3fd/4O0cXV7TVbPYgAAAAASUVORK5CYII=)}#style-table .metascreenmore{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAD2AAAA9gAXp4RY0AAAAHdElNRQfWAg4EHSUhzWFGAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4zoOlZ1QAAATlJREFUOE+lk82qglAUhXsqB86CsIGTHDRIAof6DL6A4EAdRKFYmlEmNCjoTcQo+sFJhL7EunefQRBa3K4HFgf2Ofvbe52fVr/fH/4K/9SwRYmXywXfDsqhXAagcb1evxLlVAB5nuN2uzEQVTifzzidTjgejzgcDsiyDGmasvUKwDCMP58D7a0AqB3bthFFEWazGZPjOFBVlcVI8/kci8WCFaoFjMdj7HY7tmk6nWK9XoPneUwmE6blcokwDN8DfN/HarWC53lwXReCIKDT6aDb7aLX68GyrM8dECAIgqdGoxE0TUO73WZQ6uCjBVqM45iJPG82G2aF4ziQvf1+j+12+95CkiQwTRO6rkNRFMiyDFEUn5IkCYPBoB7Q+Bobv8SyLFEUBR6Px3O+3++1MYq/vIOmn6nRd/4Be8jWG0NpB4wAAAAASUVORK5CYII=)}#style-table .metadiscussions{background:center no-repeat url(data:image/png;base64,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)}#style-table .loading{background:center no-repeat url(data:image/png;base64,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)!important}#style-table .metafaviconblank{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB7klEQVQ4jYWTTWtTQRSGnzP3phpQ0WixtYgbazeKf0BE3PgBKrjwRyjiqgsXgj9BFCxVhC4qFj+w0KCb/hu1sW2akFA1yZmZ4+Lem9ymggcOMwzzPuc9MxwxM+pfV2+IyGII8TQYZoYZgAH8AVmPMTy/e+feOuNhZqyuffy+02pajHFfDgZ922j8sLUvq79XPrx9nMFH6QD6/f7MsaM1dn/t0um22Wlvs9VssPHzG5vbDbqdDjev3apOnph8svxuab5swAGoegBCUHzwhBCyjBH1ylZzE+ccVy5frR6YOPj0zdKrS2MABdgnjjEQYyTEwPtPK9TrdS6cv1jFbH4PwKsClot9LszE0SJT01PMzc0yc+YUzjnp9XrXX7x8luxxYPmDmhkGCIKTUVarVY4cPsTs2XOo+kRVKwBp+Q2KEMAEEEHEkaYuOxehKBgtMgJ4LT41kwsIjsQJiUtG4ALgFYtWAmgBcDhnGIIMvZSXbOO9J4a4FyCAc254u6gmuaMyQNUTQygDPCCkaQKWi6XkogCYICJ4VUIZ4PMWkiQdVhdk5CJfLRsQVJUw3gJA4pJMXM6Sg2y2/gEQkUa73Zqu1Y7zv+h2O4C01Gs/a8uMh48e3E4r6YIOBifNwDDIR7q8B6NSmdhW1fuLC68/A/wFxrpB47jmkM8AAAAASUVORK5CYII=)}#style-table .metafaviconapp{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADRklEQVQ4jV2TT0ybZQCHn/f9+rWlpXylA0opY1hAAgm4McjWEidGF7LT/JO4wxJN1Dk96BUTDzTxoMa7B72o0WTs5IyJJou6bCadYFh0YoKMrRRKKf9KC2352u/7Xi/TLD7nX57T8xMAyTi+ZIoKwMDA+RBSvuP2eJ6p2+q4cGw16p0vHtMetDton7mENZ1MscVDxEPB+8DszN5509XQOBN/9qlAJNKi1YprtD4+xuFBid1vppxA4XeplKohOJdM8ROABLyapr2thPZ5uCv67aXXJoMDO1c0cfVFgpu3CLVHiPT240x+KM3QAD7hdrvdvh+ScUYBZDLOeFNbZ9ORI0ZoovSJZ/erl1Hpm4Bi5MIU4VaDTHaLXKHGg/bnaGhpY3RkRBdCzABoE0d5TDnOK29dPMvw8WHGTw/RGo6SXt+mtrcOtsXdTTd1y8JZncW/cYvEyBOkc9vBRFt1TtpKxJpbWtFcGoHNmzRwyLHePs5ceJOduo7PLVAojCYfLf1jgKJ0UGa4LyyE4HWphOuiQQEcE+x9lLmPcmz++PEagWqOBYZIZ/L8tZhheTmDQoBZIdbXCMgTUsOK+4ItoNWRbTH2qvDn8iYb6b8JDJ1jZWkRaRZwlGIgfxWhFE0NAr/fQCkn6rKUtlwy5SDWHjLYTkjvYa+oc3TwJNnvPiJc2iXkjzLb8x6Bwwy6dNHc2kExn0cIUZGW0qY28tsotwdr6Teol+na/Zn42BAvvfoG4yd70ctZemp3EMpmONZJk99kI19AoOZcDdK8Xdm3KS66CEgLe3cBLdTF9a+/pFhVOECtM4F/5w6RcBtPnz6B8FVZuJdWjuK2dmONSqJDnzAdp7vP1Y3w3EcYBh1dQ9xbyWFWKrgOspzq9TKZ6MbtbSSTXmf27ooFXPo35bAScvWFU2N67OAQmrPIYBhh9FMqVPD6vbjFPqruoWoX+fT7X51azXo3meJjDeDGGuUno+L+Ui73vIiERNTXjVot46xl8RxWkZUK6D6y5R2+uD7nOJadmk5xGVCCR0jGGUPIa4YRCA/G2mXECODVdXKFTZbSebW2daCA6WSKDwD7vzf+T+IDLgtICCHOKKUMKZi3Fb8AV5Ip5h/d/wN3iGBJByQZzAAAAABJRU5ErkJggg==)}#style-table .metafaviconglobal{background:center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMUlEQVQ4jW2TzU8cZQDGf+/M7M5+8LF8FFBsWVCsUktoSzRA0dSCNmBCvDQkmng28ehl/wJik5486sF466mNNntQ8VCVWloPjTGUUrJLIbDsLrAf3ZnZmfd9x4s1TdPn9Bx+z+/2CJ5Lem4pBSwYhjFhGMZ5QGmt/9Ba/wlcz2cz9Wd58dx4Ph7j+6kzkcTwiR27u2NfWPYE/2y8Fea2i+79B9uOH8jFfDaz/HRjPi1DH3319eTYwZWFmURL7zHbMkwphOlRcceIJgbE+Km/I1NnyolCyb5M34etRw9//uV/QXpu6dL4SP3K7FTZ9kOBaTkU6+/j6RmEaCVirhGJ7HCs7Ranhzet3M7guO6ZXalsLOdFem4pZUd59OVnN7qSCQ9hdvKo8ClucJZEPEosajH00je0x+/ieQGe51N70sHStzNF39evGsDChbe9pGnUaQYJVta+oFgdQWlNECgsc5OG283d9c95XJwgkDGi1j7TZ702YN4SQkymX87FtssXKFRP4QQdxG1F05CEYUifleNEz0+0xdo4rLXRDBIoCYP9OzYMvWOAOB+PueT3T1I4SuMHimYg8ZoBjtdksO9HpFTYkRKdLevUnA5C3UQzKgzDmLYQ6L3DRVLJ30jGy9hRk92jSZTS2BGJ7yuwJFJqlNJ0JDbJFUaouSOE3NNmanhmtLuz91yxNiTePH6dk6+sYkdq7B4M4kuL3dIAj/dfJxEtEjErKBWwd3CavVKv3topXTMIw9vlo5qTarFoTxSQUpHuucOlc1dxXJftUg8PdwbJFwaQUhEEIZXGLPuligusGsCNB5t7bls8wv3cHEpppJQUDjppuBLHbeK4Pkd1myBQuE0bk5CNrWIduGnks5malOqT23+tN1oSH+A02/H9kNW1cRqeT8P1aXg+lZqFlIqDJx+zcm/D1Uov5rMZxwSobCxvRo+/21UqV0fH3ngUrTqvkS++h1IK0xB0tsboTvURs1x++LW/Ua54V/PZzHcvOtPFzpRzrb93wE61dyW7UkkRhnBYbejSQdXZ2CrWlVSX89nM7y9843+SFmAeISaEENOADrW+BdwBbuazGedZ/l/lhZP/TH2c8gAAAABJRU5ErkJggg==)}#style-table .ratingbg{margin:0 auto;position:relative;width:48px;height:16px;background:url(data:image/png;base64,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)}#style-table .ratingfg{position:absolute;height:16px;background:url(data:image/png;base64,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)}#popup_container{position:fixed;top:8px;background:white;border:3px solid white;-moz-box-shadow:0 0 10px rgba(0,0,0,.7);-webkit-box-shadow:0 0 10px rgba(0,0,0,.7);box-shadow:0 0 10px rgba(0,0,0,.7);-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px}.popup_right{right:8px}.popup_left{left:8px}#popup_container img{display:block!important}');

// Create the Table
// Header
var styleTableHeaderRow = $c('tr');
var theaders = ['#','Name','Installs','Weekly','Updated','Rating'];
for(var i = 0, l = theaders.length; i < l; i++) {
	styleTableHeaderRow.appendChild($c('th',{textContent:theaders[i]}));
}
styleTable.appendChild(styleTableHeaderRow);
// Body
for(var i = 0, l = styleArray.length; i < l; i++) {
	var style = styleArray[i];
	
	// Create row
	var row = $c('tr',{id:style.id});
	if(style.obsolete) row.className = 'obsolete';
	
	// Index Cell
	row.appendChild($c('td',{textContent:(i+1)}));
	
	// Name Cell
	var cellN = $c('td');
	cellN.appendChild($c('a',{href:'/styles/'+style.id,textContent:style.name}));
	// Add fetch metadata link if enabled AND not on own userpage
	if(!loggedIn && metadata) {
		var infolink = $c('div',{className:'metalink',title:'Fetch Style Metadata',styleid:style.id});
		if(auto) infolink.className += ' loading';
		else {
			infolink.addEventListener('click', function(e) {
				var src = e.target;
				src.className += ' loading';
				fetchMeta(src.getAttribute('styleid'));
			},false);
		}
		cellN.appendChild(infolink);
	}
	if(loggedIn || style.isOwn) {
		cellN.appendChild($c('a',{href:'/styles/delete/'+style.id,innerHTML:'<div class="delete" title="Delete Style"></div>'}));
		cellN.appendChild($c('a',{href:'/styles/'+style.id+'/edit',innerHTML:'<div class="edit" title="Edit Style"></div>'}));
	}

	// Installs Cell
	var cellI = $c('td',{textContent:toCustStr(style.installs)});

	// Weekly Cell
	var cellW = $c('td',{textContent:toCustStr(style.weekly)});

	// Updated Date Cell
	var cellU = $c('td',{textContent:style.updated});

	// Ratings Cell
	var cellR = $c('td',{rating:style.rating,title:(style.rated ? 'Rated '+style.rating : 'Not Rated'),innerHTML:'<div class="ratingbg"><div class="ratingfg" style="width:'+Math.round(style.rating/3*100)+'%"></div</div>'});


	// Append Cells to the Row
	row.appendChild(cellN);
	row.appendChild(cellI);
	row.appendChild(cellW);
	row.appendChild(cellU);
	row.appendChild(cellR);

	// Append Row to the Table
	styleTable.appendChild(row);
}

var tableContainer = $c('div',{id:'table-container'});
tableContainer.appendChild(styleTable);

if(loggedIn) {
	// Insert our Style-table into the page.
	styleList.parentNode.replaceChild(tableContainer, styleList);
}
else {
	// Remove all the styles from the page.
	while(styles.length > 0) {
		styles[0].parentNode.removeChild(styles[0]);
	}

	// Insert our Style-table into the page.
	if($('.pagination')[0])
		styleList.insertBefore(tableContainer, $('.pagination')[0]);
	else
		styleList.appendChild(tableContainer);
}


// Make table sortable.
var th = $('th',styleTable);
for(var i = 0, l = th.length; i < l; i++) {
	th[i].addEventListener('click',function(e) {
		if(e.target.nodeName == 'TH') sortTable(e.target);
	},false);
}

// Table Sorting Algorithm
var colIndex = 0; // Remeber last clicked Column
function sortTable(source) {
	var table = source;
	while(table.nodeName.toLowerCase() != 'table') { table = table.parentNode; }

	var newRows = [];
	for(var i = 0, l = table.rows.length-1; i < l; i++) { newRows[i] = table.rows[i+1]; }

	// If last clicked column is same, just reverse the rows.
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

	// Sort Date Column
	function sortD(a,b) {
		var _a = new Date(a.cells[4].textContent.replace(',',''));
		var _b = new Date(b.cells[4].textContent.replace(',',''));
		if(_a < _b) return -1;
		if(_a > _b) return 1;
		// Sort by Rating if equal
		return sortR(a,b);
	}
	// Sort Rating Column
	function sortR(a,b) {
		var res = parseFloat(a.cells[5].getAttribute('rating')) - parseFloat(b.cells[5].getAttribute('rating'));
		if(res == 0) res = a.cells[2].textContent.toCustNum() - b.cells[2].textContent.toCustNum(); // Sort by Installs if Ratings are equal.
		if(res == 0) res = a.cells[3].textContent.toCustNum() - b.cells[3].textContent.toCustNum(); // Sort by Weekly if Installs are equal.
		return res;
	}
	// Sort Number Columns
	function sortF(a,b) {
		var res = a.cells[colIndex].textContent.toCustNum() - b.cells[colIndex].textContent.toCustNum();
		if(res == 0) {
			var index = (colIndex == 2) ? 3 : 2;
			res = a.cells[index].textContent.toCustNum() - b.cells[index].textContent.toCustNum(); // Sort by Installs/Weekly
		}
		if(res == 0) res = sortR(a,b); // Sort by Rating.
		return res;
	}
	// Sort Text Columns
	function sortT(a,b) {
		a = a.cells[colIndex].textContent.toLowerCase();
		b = b.cells[colIndex].textContent.toLowerCase();
		if(a < b) return -1;
		if(a > b) return 1;
		return 0;
	}

	for(var i = 0, l = newRows.length; i < l; i++) { table.appendChild(newRows[i]); }
}

// Style Summary & Stats-Keeper
if(onUserPage) {
	// Style Summary
	var summary =  '<tr><td align="center" colspan="2"><span class="title">S U M M A R Y</span></td></tr>'+
				   '<tr><td align="right"><b>Style Count</b></td><td>: '+toCustStr(styleCount)+' ('+toCustStr(obsoleteCount)+' obsolete)</td></tr>'+
				   '<tr><td align="right"><b>Total Installs</b></td><td>: '+toCustStr(totalInstalls)+'</td></tr>'+
				   '<tr><td align="right"><b>Avg Installs per Style</b></td><td>: '+toCustStr(Math.round((totalInstalls-totalObsoleteInstalls)/(styleCount-obsoleteCount)*10)/10)+'</td></tr>'+
				   '<tr><td align="right"><b>Weekly Total</b></td><td>: '+toCustStr(totalWeekly-totalObsoleteWeekly)+'</td></tr>'+
				   '<tr><td align="right"><b>Weekly Avg per Style</b></td><td>: '+toCustStr(Math.round((totalWeekly-totalObsoleteWeekly)/(styleCount-obsoleteCount)*10)/10)+'</td></tr>'+
				   '<tr><td align="right"><b>Ratings</b></td><td>: <span class="good">'+toCustStr(ratingGood)+' Good</span>, '+
				   '<span class="ok">'+toCustStr(ratingOk)+' Ok</span> and '+
				   '<span class="bad">'+toCustStr(ratingBad)+' Bad</span></td></tr>';

	tableContainer.parentNode.insertBefore($c('table',{id:'summary',innerHTML:summary}),tableContainer);

	// Stats-Keeper
	if(sk4all || loggedIn) {
		var oldDATA = getValue('DATA-'+user);
		if(!oldDATA) { setValue('DATA-'+user,jStringify(DATA)); }
		else {
			oldDATA = jParse(oldDATA);

			var styleRows = $('tr',styleTable);
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

					diffITotal += diff_I; diffWTotal += diff_W;
				}
			}

			var styleHeaderRow = $('//tr[th]',document,true,styleTable);
			if(diffITotal != 0) { styleHeaderRow.cells[2].appendChild(createDiffSpan(diffITotal)); }
			if(diffWTotal != 0) { styleHeaderRow.cells[3].appendChild(createDiffSpan(diffWTotal)); }

			setValue('DATA-'+user,jStringify(DATA));
		}

		var lastDiffCheck = getValue('lastDiffCheck-'+user);
		if(lastDiffCheck) {
			lastDiffCheck = new Date(parseInt(lastDiffCheck));
			var lastCheckNode = $c('p',{id:'lastcheck',textContent:'Last checked '+getDateDiffString(new Date(), lastDiffCheck)+' ago ('+lastDiffCheck.toUTCString()+')'});
			tableContainer.parentNode.insertBefore(lastCheckNode,tableContainer);
		}
		else tableContainer.parentNode.insertBefore($c('p',{id:'lastcheck',textContent:'First visit, statistics recorded.'}),tableContainer);

		setValue('lastDiffCheck-'+user, new Date().getTime().toString());
	}
}

// Fetch metadata if Auto-fetch is enabled.
if(!loggedIn && metadata && auto) {
	var rows = $('tr',styleTable);
	for(var i = 1; i < rows.length; i++) {
		fetchMeta(rows[i].id);
	}
}

// Will fetch metadata and add data to the given rowid
function fetchMeta(id) {
	xhr({
		method : 'GET',
		url    : 'http://userstyles.org/styles/'+id,
		onload : function(responseDetails) {
			if(responseDetails.status == 200) {
				var body = responseDetails.responseText.split(/<body[^>]*>((?:.|\n|\r)*)<\/body>/i);
				body = body[1].replace(/<script((?:.|\n|\r)*?)>((?:.|\n|\r)*?)<\/script>/g,'');

				var holder = $c('div',{innerHTML:body});
				holder.style.display = 'none';
				document.body.appendChild(holder);

				var misc_info = $('#miscellaneous-info');
				var author = $('.//a[contains(@href,"/users/")]',document,1,misc_info);
				var more = $('.more',holder,1);
				var affects = more ? $('a',more,1).href.match(/browse\/(.*)/)[1] : 'N/A';
				var affectsurl = responseDetails.responseText.match(/<link\srel='stylish-example-url'\shref='(https?:\/\/[a-zA-Z0-9\.]+\/?).*'\/>/);
				var favicon = $c('img',{className:'metafavicon'});
				switch(affects.toLowerCase()) {
					case 'n/a':
						favicon.className += 'blank';
						break;
					case 'app':
						favicon.className += 'app';
						break;
					case 'global':
						favicon.className += 'global';
						break;
					case 'userscripts.org':
						favicon.src = 'http://userscripts.org/images/script_icon.png'; // Default uso script icon
						//favicon.src = 'http://wiki.greasespot.net/favicon.ico'; // GM favicon (bad quality)
						//favicon.src = 'http://greasemonkey.darkterminal.com/images/greasemonkey.png'; // Greasemonkey icon (better quality)
						break;
					default:
						favicon.src = affectsurl[1]+'/favicon.ico';
				}
				var date_created = $('.//tr[2]/td[1]',document,1,misc_info).textContent.trim();
				var date_updated = $('.//tr[3]/td[1]',document,1,misc_info).textContent.trim();
				var _screenshot = $('#screenshots');

				var row = $('#'+id);
				if(!row) { log('Unable to find row.'); return; }
				row = row.children[1]; // Name Cell

				// Remove loading sprite
				var loading = $('.metalink',row,true);
				if(loading) loading.parentNode.removeChild(loading);

				var meta = $c('div',{className:'meta'});
				meta.appendChild($c('span',{className:'metauser',innerHTML:'by <a href="'+author.href+'">'+author.textContent+'</a>'}),row.children[0]);
				if(_screenshot) {
					if($('#main-screenshot')) {
						meta.appendChild(addPopup($c('a',{className:'metascreenmain',title:'Main Screenshot',href:$('img',_screenshot,1).src,target:'_blank'})));
					}
					if($('#more-screenshots')) {
						var screenshots = $('a',$('#more-screenshots'));
						for(var i = 0; i < screenshots.length; i++) {
							meta.appendChild(addPopup($c('a',{className:'metascreenmore',title:'Other Screenshots',href:screenshots[i].href,target:'_blank'})));
						}
					}
				}
				var discussions = $('#discussions');
				if(discussions) {
					var good = $('.good-rating',discussions).length;
					var ok = $('.ok-rating',discussions).length;
					var bad = $('.bad-rating',discussions).length;
					var tot = $('li',discussions).length;
					meta.appendChild($c('div',{className:'metadiscussions',title:tot+' Discussions ('+good+' Good, '+ok+' Ok and '+bad+' Bad.)'}));
				}
				var div = $c('div');
				div.appendChild(favicon);
				div.appendChild($c('span',{className:'url',textContent:affects}));
				var date = 'Created on '+date_created + (date_created != date_updated ? ', Updated on '+date_updated : '');
				div.appendChild($c('span',{className:'date',textContent:'('+date+')'}));
				meta.appendChild(div);
				row.appendChild(meta);

				holder.parentNode.removeChild(holder);
			}
		}
	});
}

// Timeout variables;
var hidePopupTimeout = 0;
var showPopupTimeout = 0;
// Remeber last pic hovered
var source = null;

if(popup) {
	var popupdiv = $c('div',{id:'popup_container'});

	popupdiv.addEventListener('mouseover', function(e) { window.clearTimeout(hidePopupTimeout); source = e.relatedTarget; }, false);
	popupdiv.addEventListener('mouseout', function() { hidePopupTimeout = window.setTimeout(hidePopup,50); }, false);
	popupdiv.addEventListener('click', function() { hidePopup(); }, false);

	document.body.appendChild(popupdiv);
}

function addPopup(el) {
	// If Popup Pictures option is disabled, return default element without adding listeners.
	if(!popup) return el;

	el.addEventListener('mouseover', function(e) {
		if(e.relatedTarget != source) window.clearTimeout(hidePopupTimeout);
		showPopupTimeout = window.setTimeout(function() { showPopup(e, el.href); },250);
	}, false);
	el.addEventListener('mouseout', function(e) { hidePopupTimeout = window.setTimeout(hidePopup,50); }, false);

	return el;
}

function showPopup(e, src) {
	var popup = $('#popup_container');
	if(!popup) debug('Unable to find Popup Picture Container.');

	popup.className = (e.pageX > document.body.clientWidth/2) ? 'popup_left' : 'popup_right';
	popup.style.display = '';
	popup.innerHTML = '<img src="'+src+'" alt="Loading Screenshot..." style="max-height:'+(window.innerHeight-22)+'px; max-width:'+(window.innerWidth-42)+'px; margin: 2px;">';
}

function hidePopup() {
	window.clearTimeout(showPopupTimeout);
	$('#popup_container').style.display = 'none';
}

// Add Global Metadata-Fetcher Icons
var headerCell = $('./tr/th[2]',document,true,styleTable);
if(!loggedIn && metadata && styleCount > 1) {
	headerCell.appendChild($c('img',{id:'metaOpen',title:'Fetch/Open metadata of all Styles.'},[{type:'click',fn:function(e){toggleMetadata(true,e.shiftKey?true:false)}}]));
	headerCell.appendChild($c('img',{id:'metaClose',title:'Close metadata of all Styles.'},[{type:'click',fn:function(){toggleMetadata(false)}}]));
}
// Add Preferences Icon
headerCell.appendChild($c('img',{id:'metaPrefs',title:'Userstyles.org Enhancer Preferences'},[{type:'click',fn:function(e){e.preventDefault();devtools.config.open()}}]));

function toggleMetadata(open, skipObs) {
	var rows = $('tr',styleTable);
	for(var i = 1; i < rows.length; i++) {
		var metablock = $('.meta',rows[i],1);
		if(open) {
			var obs = rows[i].className == 'obsolete';
			if(metablock && !obs) metablock.style.display = 'inline';
			else {
				if(skipObs && obs) continue;
				$('.metalink',rows[i],1).className += ' loading';
				fetchMeta(rows[i].id);
			}
		}
		else {
			if(metablock) metablock.style.display = 'none';
		}
	}
}

// Update Check [Uses PhasmaExMachina's Script Updater]
ScriptUpdater.setjsURL('http://dl.dropbox.com/u/19875602/gm/80666.metax.js');
ScriptUpdater.check(scriptID,version);

})();