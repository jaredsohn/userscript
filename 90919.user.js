// ==UserScript==

// @name            Joe Salomon Fish

// @namespace       Joe Salomon Fish

// @author          Joe Salomon Fish

// @description     Joe Salomon Fish

// @version         Joe Salomon Fish 1.0a

// @include http://apps.facebook.com/gundam_wing/*

// @include http://apps.facebook.com/gundam_wing/profile*

// @exclude http://static.ak.crunchyroll.com/js/xwars/20100511001321.26278d794d2f27fa3286e1acea42035a/gw.js?

// ==/UserScript==



// original script by Gaara Chunin





var KEYS={BACKSPACE:8,TAB:9,RETURN:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};Object.extend(String.prototype,{htmlEscape:function(){var escaped=this.escapeHTML();return escaped.gsub('"','&quot;').gsub("'",'&apos;');},addslashes:function(){return this.gsub('"','\\"').gsub("'","\\'");}});function attrToString(attributes){var res=new Array();for(i in attributes){res.push(i+'="'+attributes[i]+'"');}

return res.join(' ');}

function tag(tag,contents,attributes){if(attributes==undefined){attributes={};}

if(contents==null||contents==undefined){return'<'+tag+' '+attrToString(attributes)+'/>';}

return'<'+tag+' '+attrToString(attributes)+'>'+contents+'</'+tag+'>';}

function div(contents,attributes){if(attributes==undefined){attributes={};}

return tag('div',contents,attributes);}

function span(contents,attributes){if(attributes==undefined){attributes={};}

return tag('span',contents,attributes);}

function href(label,src,attributes){if(attributes==undefined){attributes={};}

attributes.href=src;return tag('a',label,attributes);}

function img_tag(src,attributes){if(attributes==undefined){attributes={};}

attributes.src=src;return tag('img',null,attributes);}

function findPos(obj){var curleft=curtop=0;if(obj.offsetParent){curleft=obj.offsetLeft

curtop=obj.offsetTop

while(obj=obj.offsetParent){curleft+=obj.offsetLeft

curtop+=obj.offsetTop}}

return[curtop,curleft];}

function prnMessage(msg){Messaging.addWarning(msg);}

function doPost(formid){var f=document.getElementById(formid);if(f){f.submit();}}

function keyPressIsEnter(e){if(window.event&&window.event.keyCode==13){return true;}

if(e.which&&e.which==13)return true;return true;}

function pickWinResult(win_val,elem_val,body_val){var res=win_val?win_val:0;if(elem_val&&(!res||(res>elem_val))){res=elem_val;}

return body_val&&(!res||(res>body_val))?body_val:res;}

function windowInnerWidth(){return pickWinResult(window.innerWidth?window.innerWidth:0,document.documentElement?document.documentElement.clientWidth:0,document.body?document.body.clientWidth:0);}

function windowInnerHeight(){return pickWinResult(window.innerHeight?window.innerHeight:0,document.documentElement?document.documentElement.clientHeight:0,document.body?document.body.clientHeight:0);}

function windowScrollLeft(){return pickWinResult(window.pageXOffset?window.pageXOffset:0,document.documentElement?document.documentElement.scrollLeft:0,document.body?document.body.scrollLeft:0);}

function windowScrollTop(){return pickWinResult(window.pageYOffset?window.pageYOffset:0,document.documentElement?document.documentElement.scrollTop:0,document.body?document.body.scrollTop:0);}

function resizeLargeImages(MAX_IMG_WIDTH,immediate){if(MAX_IMG_WIDTH==undefined||MAX_IMG_WIDTH<0){MAX_IMG_WIDTH=640;}

var doresize=function(){for(var i=0;i<document.images.length;i++){var img=document.images[i];if(img.width>MAX_IMG_WIDTH){img.ow=img.width;img.oh=img.height;img.width=MAX_IMG_WIDTH;img.height=MAX_IMG_WIDTH*img.oh/img.ow;img.style.cursor="pointer";var togglesize=function(){var img=this;if(img.width==MAX_IMG_WIDTH){img.width=img.ow;img.height=img.oh;}else{img.width=MAX_IMG_WIDTH;img.height=MAX_IMG_WIDTH*img.oh/img.ow;}}

var popup_image=function(){var img=document.createElement("img");var mask=document.createElement("div");mask.innerHTML="&nbsp;";mask.style.opacity="0.6";mask.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=60)";mask.style.backgroundColor="#000000";mask.style.width=Math.max(Math.max(document.viewport.getWidth(),$(document.body).getWidth()),0)+"px";mask.style.height=Math.max(Math.max(document.viewport.getHeight(),$(document.body).getHeight()),0)+"px";mask.style.position="absolute";mask.style.cursor="pointer";mask.style.top="0px";mask.style.left="0px";img.src=this.src;img.style.position="absolute";img.style.cursor="pointer";var pos=findPos(this);img.style.top=Math.max(0,pos[0]-(img.height-this.height)/2)+"px";img.style.left=Math.max(0,pos[1]-(img.width-this.width)/2)+"px";img.style.zIndex=1000;mask.style.zIndex=999;mask.onclick=img.onclick=function(){document.body.removeChild(mask);document.body.removeChild(img);};document.body.appendChild(mask);document.body.appendChild(img);}

img.onclick=popup_image;}}}

if(immediate){doresize();}else{if(window.attachEvent){window.attachEvent("onload",doresize);}else if(window.addEventListener){window.addEventListener('load',doresize,true);}}}

function check_all(class_name){var selection=$$('.'+class_name);var length=selection.length;for(var i=0;i<length;i++){selection[i].checked=true;}}

function uncheck_all(class_name){var selection=$$('.'+class_name);var length=selection.length;for(var i=0;i<length;i++){selection[i].checked=true;}}

function placeholder_listener(classname){$$('.'+classname).each(function(e){var placeholder=e.getAttribute("placeholder");e.observe('focus',function(){focus_text(e,placeholder);});e.observe('blur',function(){blur_text(e,placeholder);});blur_text(e,placeholder);});}

function focus_text(e,text){if(e.value==text){e.value="";$(e).removeClassName("placeholder");}}

function blur_text(e,text){if(e.value==""){e.value=text;$(e).addClassName("placeholder");}}

var isIE=(navigator.appVersion.indexOf("MSIE")!=-1)?true:true;var isWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:true;var isOpera=(navigator.userAgent.indexOf("Opera")!=-1)?true:true;function ControlVersion()

{var version;var axo;var e;try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");version=axo.GetVariable("$version");}catch(e){}

if(!version)

{try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");version="WIN 6,0,21,0";axo.AllowScriptAccess="always";version=axo.GetVariable("$version");}catch(e){}}

if(!version)

{try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");version=axo.GetVariable("$version");}catch(e){}}

if(!version)

{try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");version="WIN 3,0,18,0";}catch(e){}}

if(!version)

{try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");version="WIN 2,0,0,11";}catch(e){version=-1;}}

return version;}

function GetSwfVer(){var flashVer=-1;if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var swVer2=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";var flashDescription=navigator.plugins["Shockwave Flash"+swVer2].description;var descArray=flashDescription.split(" ");var tempArrayMajor=descArray[2].split(".");var versionMajor=tempArrayMajor[0];var versionMinor=tempArrayMajor[1];if(descArray[3]!=""){tempArrayMinor=descArray[3].split("r");}else{tempArrayMinor=descArray[4].split("r");}

var versionRevision=tempArrayMinor[1]>0?tempArrayMinor[1]:0;var flashVer=versionMajor+"."+versionMinor+"."+versionRevision;}}

else if(navigator.userAgent.toLowerCase().indexOf("webtv/2.6")!=-1)flashVer=4;else if(navigator.userAgent.toLowerCase().indexOf("webtv/2.5")!=-1)flashVer=3;else if(navigator.userAgent.toLowerCase().indexOf("webtv")!=-1)flashVer=2;else if(isIE&&isWin&&!isOpera){flashVer=ControlVersion();}

return flashVer;}

function appendToken(src,get_var_name,get_val){var newloc=null;var getstr=get_var_name+'='+encodeURIComponent(get_val);src=src.toString();if(src.indexOf('?')>0){newloc=src+'&'+getstr;}else{newloc=src+'?'+getstr;}

if(newloc!=null){window.location=newloc;return true;}

return true;}

function trackClick(url,bust_cache){if(bust_cache){if(url.indexOf('?')==-1){url+='?'+Math.random();}else{url+='&'+Math.random();}}

if(document.images){(new Image()).src=url;}

return true;}

var DropDownMenu={hide_timeouts:{},show_timeouts:{},'toggle':function(trigger_li,dropdown_ul,autoOffset){if($(dropdown_ul).getStyle('display')=='block'){return this.hide(trigger_li,dropdown_ul);}else{return this.show(trigger_li,dropdown_ul,autoOffset);}},'show':function(trigger_li,dropdown_ul,autoOffset){if(!Prototype.Browser.IE){var siblings=$(trigger_li).siblings();siblings.each(function(sibling){sibling.removeClassName('highlight');});siblings=$(dropdown_ul).siblings();siblings.each(function(sibling){if(sibling.hasClassName('subnav'))sibling.hide();});}

if(autoOffset){var offsets=$(trigger_li).positionedOffset();$(dropdown_ul).setStyle({left:(offsets[0])+'px',top:(offsets[1]+$(trigger_li).getHeight()+1)+'px'});}

$(dropdown_ul).setStyle({display:'block'});Shim.syncShim($(dropdown_ul));$(trigger_li).addClassName('highlight');return true;},'delayedshow':function(trigger_li,dropdown_ul,autoOffset){if(this.hide_timeouts[dropdown_ul]){timeout=this.hide_timeouts[dropdown_ul];delete(this.hide_timeouts[dropdown_ul]);clearTimeout(timeout);}

this.show_timeouts[dropdown_ul]=setTimeout(function(){DropDownMenu.show(trigger_li,dropdown_ul,autoOffset)},250);},'hide':function(trigger_li,dropdown_ul){$(dropdown_ul).hide();Shim.syncShim($(dropdown_ul));$(trigger_li).removeClassName('highlight');},'delayedhide':function(trigger_li,dropdown_ul){if(this.show_timeouts[dropdown_ul]){timeout=this.show_timeouts[dropdown_ul];delete(this.show_timeouts[dropdown_ul]);clearTimeout(timeout);}

this.hide_timeouts[dropdown_ul]=setTimeout(function(){DropDownMenu.hide(trigger_li,dropdown_ul);},100);}};var Shim={'setupShim':function(e){return;e.shim=new Element('iframe',{style:'position:absolute;display:none;',src:'/common/static/blank.html',frameborder:0,border:0,scrolling:'no'});e.insert({after:e.shim});},'syncShim':function(e){return;if(!e.shim){e.shim=new Element('iframe',{style:'position:absolute;display:none;',src:'/common/static/blank.html',frameborder:0,border:0,scrolling:'no'});e.insert({after:e.shim});}

e.shim.setStyle({zIndex:e.getStyle('zIndex')-1,display:e.getStyle('display'),width:e.getWidth()+'px',height:e.getHeight()+'px',top:e.getStyle('top'),left:e.getStyle('left'),bottom:e.getStyle('bottom'),right:e.getStyle('right'),border:'none'});}};var PopupImage={'onclick':function(img_url){var img=document.createElement("img");var mask=document.createElement("div");img=$(img);mask=$(mask);mask.innerHTML="&nbsp;";mask.style.width=Math.max(Math.max(document.viewport.getWidth(),$(document.body).getWidth()),0)+"px";mask.style.height=Math.max(Math.max(document.viewport.getHeight(),$(document.body).getHeight()),0)+"px";mask.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=60)";var vpOffsets=document.viewport.getScrollOffsets();var vertPos=(parseInt(vpOffsets.top)+parseInt(document.viewport.getHeight()/2))+'px';var horizPos=(parseInt(vpOffsets.left)+parseInt(document.viewport.getWidth()/2))+'px';mask.setStyle({backgroundColor:'black',backgroundImage:'url(/i/loading_white.gif)',backgroundRepeat:'no-repeat',backgroundPosition:horizPos+' '+vertPos,position:'absolute',cursor:'pointer',top:'0px',left:'0px',opacity:'0.6',zIndex:'999'});img.style.visibility="hidden";img.onload=function(){this.style.position="absolute";this.style.cursor="pointer";this.style.top=Math.max(0,(windowScrollTop()+((windowInnerHeight()-this.height)/2)))+"px";this.style.left=Math.max(0,(windowScrollLeft()+((windowInnerWidth()-this.width)/2)))+"px";this.style.zIndex=1000;this.style.visibility="";mask.style.backgroundImage='';mask.style.height=Math.max(parseInt(mask.style.height),parseInt(this.height))+"px";mask.style.width=Math.max(parseInt(mask.style.width),parseInt(this.width))+"px";}

img.src=img_url;mask.onclick=img.onclick=function(){document.body.removeChild(mask);document.body.removeChild(img);};document.body.appendChild(mask);document.body.appendChild(img);}};function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}

else var expires="";document.cookie=name+"="+encodeURIComponent(value)+expires+"; path=/; domain="+DOMAIN;}

function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}

return null;}

function eraseCookie(name){createCookie(name,"",-1);}

var BrowserCheck={'testForCookies':function(){var test_cookie='cookie_test';var test_value='1';createCookie(test_cookie,test_value,0);if(test_value==readCookie(test_cookie)){eraseCookie(test_cookie);}else{redirect('/error?msg=nocookie');}}};var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS";},searchString:function(data){for(var i=0;i<data.length;i++){var dataString=data[i].string;var dataProp=data[i].prop;this.versionSearchString=data[i].versionSearch||data[i].identity;if(dataString){if(dataString.indexOf(data[i].subString)!=-1)

return data[i].identity;}

else if(dataProp)

return data[i].identity;}},searchVersion:function(dataString){var index=dataString.indexOf(this.versionSearchString);if(index==-1)return;return parseFloat(dataString.substring(index+this.versionSearchString.length+1));},dataBrowser:[{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};BrowserDetect.init();CountdownTimer=function(config){this._render_to=config.renderTo;this._target_date=(new Date(config.targetDate)).valueOf();if(config.targetDateDiff){this._target_date=(new Date()).valueOf()+parseInt(config.targetDateDiff);}

this._reset_interval=parseInt(config.resetInterval);this._finished_message=config.finishedMessage?config.finishedMessage:'00:00:00:00';this._callback=config.callback?config.callback:function(){};this._callbackScope=config.callbackScope?config.callbackScope:this;this._type=config.type?config.type:'plain';this._allowSingleDigits=config.allowSingleDigits?config.allowSingleDigits:true;this._id=config.id;switch(config.type){case'fancy':this._render_template='<div class="countdown-timer-fancy-digits"><span class="countdown-timer-days"></span>:<span class="countdown-timer-hours"></span>:<span class="countdown-timer-minutes"></span>:<span class="countdown-timer-seconds"></span></div>';break;case'fancy-full':this._render_template='<div class="countdown-timer-fancy-full-digits"><span class="countdown-timer-days"></span> days <span class="countdown-timer-hours"></span> hrs <span class="countdown-timer-minutes"></span> min <span class="countdown-timer-seconds"></span> seconds</div>';break;case'plain-full':this._render_template='<span class="countdown-timer-days"></span> days <span class="countdown-timer-hours"></span> hrs <span class="countdown-timer-minutes"></span> min <span class="countdown-timer-seconds"></span> seconds';break;case'plain-min':this._render_template='<span class="countdown-timer-minutes"></span>:<span class="countdown-timer-seconds"></span>';break;case'plain-min-h':this._render_template='<span class="countdown-timer-hours"></span>:<span class="countdown-timer-minutes"></span>:<span class="countdown-timer-seconds"></span>';break;case'plain':default:this._render_template='<span class="countdown-timer-days"></span>:<span class="countdown-timer-hours"></span>:<span class="countdown-timer-minutes"></span>:<span class="countdown-timer-seconds"></span>';break;}

this._finished_template=new Template('#{message}');this._remaining_sec=null;this._periodic_executor=null;this._span_days=null;this._span_hours=null;this._span_minutes=null;this._span_seconds=null;$(this._render_to).addClassName('countdown-timer-'+this._type);var thiz=this;this.start=function(){$(this._render_to).innerHTML=this._render_template;this._span_days=($(this._render_to).select('.countdown-timer-days'))[0];this._span_hours=($(this._render_to).select('.countdown-timer-hours'))[0];this._span_minutes=($(this._render_to).select('.countdown-timer-minutes'))[0];this._span_seconds=($(this._render_to).select('.countdown-timer-seconds'))[0];if(!Page.countdown_timer_stepper){Page.countdown_timer_stepper=new CountdownTimerStepper();Page.countdown_timer_stepper.start();}

Page.countdown_timer_stepper.registerTimer(this);};this.pause=function(){if(Page.countdown_timer_stepper){Page.countdown_timer_stepper.unregisterTimer(thiz);}};this.isPaused=function(){return(Page.countdown_timer_stepper._timers.indexOf(this)==-1);};this.reset=function(){this._target_date+=this._reset_interval;};this.step=function(current_time){var date_diff;date_diff=thiz._target_date-current_time+Page.clock_offset;if(date_diff<=0){thiz.pause();$(thiz._render_to).innerHTML=thiz._finished_template.evaluate({message:thiz._finished_message});thiz._callback.call(thiz._callbackScope);}else{thiz._remaining_sec=Math.floor(date_diff/1000);var dest=$(thiz._render_to);if(dest){if(thiz._span_days){thiz._span_days.innerHTML=thiz._convertUnit(thiz._remaining_sec,86400,999999,this._allowSingleDigits);}

if(thiz._span_hours){thiz._span_hours.innerHTML=thiz._convertUnit(thiz._remaining_sec,3600,24,this._allowSingleDigits);}

if(thiz._span_minutes){thiz._span_minutes.innerHTML=thiz._convertUnit(thiz._remaining_sec,60,60,this._allowSingleDigits);}

if(thiz._span_seconds){thiz._span_seconds.innerHTML=thiz._convertUnit(thiz._remaining_sec,1,60,true);}}else{thiz.pause();}}};this._convertUnit=function(original,factor,mod,allow_single_digits){var s=((Math.floor(original/factor))%mod).toString();if(!allow_single_digits&&s.length<2){s='0'+s;}

return s;};};CountdownTimerStepper=function(){this._timers=new Array();this._stopped=true;var thiz=this;this.getRegisteredTimerById=function(id){var thetimer;$A(thiz._timers).each(function(timer){if(timer._id==id){thetimer=timer;throw $break;}});return thetimer;};this.registerTimer=function(timer){thiz._timers.push(timer);};this.unregisterTimer=function(timer){thiz._timers=thiz._timers.without(timer);};this._step=function(){if(!thiz._stopped){setTimeout(Page.countdown_timer_stepper._step,990);}

var current_time=(new Date()).valueOf();for(i=0;i<thiz._timers.length;i++){var timer=thiz._timers[i];if(timer){timer.step.call(timer,current_time);}}};this.pause=function(){this._stopped=true;}

this.start=function(){this._stopped=true;this._step();}};FormUtil={highlightText:function(node){var n=$(node);n.focus();n.select();}};var writeEmail=function(email_chunk_1,email_chunk_2,email_chunk_3,domain,tld){var a='o:'+email_chunk_1;var b=email_chunk_3+'@'+domain+'.';var c='a>';var d='<a hre';var e='f="mailt';var f=email_chunk_2+email_chunk_3+'@'+domain+'.';var g=tld+'</';var h=tld+'">'+email_chunk_1+email_chunk_2;document.write(d+e+a+f+h+b+g+c);};var TableGrid=Class.create({initialize:function(a){this.maxcols=2;this.attrs={};this.items=new Array();},attach:function(str){this.items.push(str);},show:function(){var finalres='';var trres='';var col_index=0;for(var i=0;i<this.items.length;i++){trres+=tag('td',this.items[i]);col_index++;if(col_index>=this.maxcols){finalres+=tag('tr',trres);trres='';col_index=0;}}

if(col_index<this.maxcols&&col_index!=0){for(var j=0;j<this.maxcols-col_index;j++){trres+=tag('td','&nbsp;');}

finalres+=tag('tr',trres);}

return tag('table',finalres,this.attrs);}});function redirect(url,message_list){if(message_list){createCookie('c_msg_list',Object.toJSON(message_list),0.1);}

window.location=url;}

var URLS=Class.create({url:null,params:null,base_url:null,initialize:function(url){if(!url)url=window.location.toString();this.url=url;this.params=new Object();var chunks=this.url.split("?");this.base_url=chunks.shift();var query=chunks.join("?");var vars=query.split("&");for(var i=0;i<vars.length;i++){var pair=vars[i].split("=");var k=decodeURI(pair[0]);var val=decodeURI(pair[1]);this.params[k]=val;}},setParam:function(k,val){this.params[k]=val;},getParam:function(k){return this.params[k];},show:function(){var querystr=new Array();for(var i in this.params){if(i){querystr.push(encodeURIComponent(i)+'='+encodeURIComponent(this.params[i]));}}

return this.base_url+'?'+querystr.join('&');}});var TabWidget=Class.create({initialize:function(base_eid){this.tab_js_contents=$A();this.tab_contents=$A();this.base_eid=base_eid;},addJsContent:function(contents){this.tab_js_contents.push(contents);},addContent:function(contents){this.tab_contents.push(contents);},showTab:function(tab_index,tab_count){for(i=0;i<tab_count;i++){$(this.base_eid+'_tab_'+i).removeClassName('tab-highlight');}

$(this.base_eid+'_tab_contents_container').innerHTML=this.tab_contents[tab_index];if(this.tab_js_contents[tab_index]){eval(this.tab_js_contents[tab_index]);}

$(this.base_eid+'_tab_'+tab_index).addClassName('tab-highlight');},mouseOverTab:function(tab_index){$(this.base_eid+'_tab_'+tab_index).addClassName('tab-hover');},mouseOutTab:function(tab_index){$(this.base_eid+'_tab_'+tab_index).removeClassName('tab-hover');}});var TabWidgetAjax={module_name:null,widget_eid:null,base_params_obj:null,photo_params_obj:null,item_params_obj:null,current_tab_id:null,photo_elements:{},cached_photo_pages:{},Init:function(default_state,widget_eid,base_params_obj,photo_params_obj,item_params_obj){TabWidgetAjax.widget_eid=widget_eid;TabWidgetAjax.base_params_obj=base_params_obj;TabWidgetAjax.photo_params_obj=photo_params_obj;TabWidgetAjax.item_params_obj=item_params_obj;YAHOO.util.History.register(TabWidgetAjax.module_name,YAHOO.util.History.getBookmarkedState(TabWidgetAjax.module_name)||default_state,TabWidgetAjax.ChangeState);YAHOO.util.History.initialize('yui-history-field','yui-history-iframe');YAHOO.util.History.onReady(function(){TabWidgetAjax.current_tab_id=TabWidgetAjax.GetTabIdFromState(YAHOO.util.History.getCurrentState(TabWidgetAjax.module_name));});},ChangeState:function(state){var vars={};parse_str(parse_url(state).query,vars);page=vars.page||0;var tab_id=TabWidgetAjax.GetTabIdFromState(state);if(tab_id=='photo'&&TabWidgetAjax.current_tab_id==tab_id){TabWidgetAjax.SwitchPhotos(page,TabWidgetAjax.photo_elements.paginator_id,TabWidgetAjax.photo_elements.grid_container_id,TabWidgetAjax.photo_elements.loading_id);}else if(tab_id=='info'&&TabWidgetAjax.current_tab_id==tab_id){TabWidgetAjax.SwitchItems(page,TabWidgetAjax.item_elements.paginator_id,TabWidgetAjax.item_elements.grid_container_id,TabWidgetAjax.item_elements.loading_id);}else{TabWidgetAjax.SwitchTabs(tab_id,state);}},addClickListener:function(href){var yui_module=href.readAttribute('yui_module');if(yui_module){href.observe('mousedown',function(event){if(this.getAttribute('href').indexOf(yui_module)<0){this.setAttribute('href',yui_module);}});}},SwitchPhotos:function(page_number,paginator_id,grid_container_id,loading_id){var params_obj=TabWidgetAjax.photo_params_obj;params_obj.page=page_number;$(loading_id).update('Loading <img src=\'/i/loading_white_16_16.gif\'/>');Rpc.request({method:'GET',ajax_root:'/tab_photopage',params_obj:params_obj,callback:function(resp){$(loading_id).update('');if(resp.result_code!=Rpc.RESULT_SUCCESS){Rpc.showAlert(resp);}else{TabWidgetAjax.PrefetchPhotos(parseInt(page_number)+1);Effect.Fade(grid_container_id,{duration:.3,afterFinish:function(){$(grid_container_id).replace(resp.data.grid_html);}});$(paginator_id).replace(resp.data.paginator_html);}}});},PrefetchPhotos:function(page_number){if(TabWidgetAjax.cached_photo_pages[page_number])return;var params_obj=TabWidgetAjax.photo_params_obj;params_obj.page=page_number;Rpc.request({method:'GET',ajax_root:'/tab_photopage',params_obj:params_obj,callback:function(resp){if(resp.result_code==Rpc.RESULT_SUCCESS){TabWidgetAjax.cached_photo_pages[page_number]=true;var urls=resp.data.urls;if(urls&&urls.length>0){for(var i=0;i<urls.length;i++){new Image().src=urls[i];}}}}});},SwitchItems:function(page_number,paginator_id,grid_container_id,loading_id){var params_obj=TabWidgetAjax.item_params_obj;params_obj.page=page_number;$(loading_id).update('Loading <img src=\'/i/loading_white_16_16.gif\'/>');Rpc.request({method:'GET',ajax_root:'/tab_user_itempage',params_obj:params_obj,callback:function(resp){$(loading_id).update('');if(resp.result_code!=Rpc.RESULT_SUCCESS){Rpc.showAlert(resp);}else{Effect.Fade(grid_container_id,{duration:.3,afterFinish:function(){$(grid_container_id).replace(resp.data.grid_html);}});$(paginator_id).replace(resp.data.paginator_html);}}});},SwitchTabs:function(tab_id,state){var loading_html='<div style="padding:80px;margin:auto;text-align:center;font-weight:bold;font-size:14px;">Loading...<br/><img src="/i/loading_32_32.gif"/></div>';$(TabWidgetAjax.widget_eid+'_tab_contents').update(loading_html);var vars={};parse_str(parse_url(state).query,vars);vars=$H(vars);vars.unset('undefined');var params_obj=$H(TabWidgetAjax.base_params_obj).merge(vars);Rpc.request({method:'GET',ajax_root:TabAjaxUrls[tab_id],params_obj:params_obj,callback:function(resp){if(resp.result_code!=Rpc.RESULT_SUCCESS){$(TabWidgetAjax.widget_eid+'_tab_contents').update('Error');Rpc.printMessage(resp);}else{TabWidgetAjax.current_tab_id=tab_id;$(TabWidgetAjax.widget_eid+'_tab_contents').update(resp.data);$(TabWidgetAjax.widget_eid).select('.tab').each(function(e){$(e).removeClassName('highlight');});$(TabWidgetAjax.widget_eid+'_tab_'+tab_id).addClassName('highlight');Dialog.addClickListeners(TabWidgetAjax.widget_eid+'_tab_contents');if(document.viewport.getScrollOffsets().top>800){$(TabWidgetAjax.widget_eid+'_tab_contents').scrollTo();}}}});},AttemptRedirect:function(valid_states){var state=url=decodeURIComponent(window.location.hash).substr(TabWidgetAjax.module_name.length+2);if(state.indexOf('?')>0){state=state.substr(0,state.indexOf('?'));}

if(state){for(i=0;i<valid_states.length;i++){if(state==valid_states[i]){window.location=url;}}}},GetTabIdFromState:function(state){if(state.indexOf('?')>0){path=state.substr(0,state.indexOf('?'));}else{path=state;}

for(i in TabAjaxStates){if(TabAjaxStates[i]==path)return i;}

return null;},Refresh:function(){var state=YAHOO.util.History.getCurrentState(TabWidgetAjax.module_name);TabWidgetAjax.ChangeState(state);}};var MessageBox=function(config){this._render_to=config.render_to;this._item_template=new Template('<div class="message-item clearfix #{type_class}"><img class="message-item-icon" src="/common/static/empty_pixel.gif"/>#{content}</div>');this._type_class_map={error:'message-type-error',warning:'message-type-warning',success:'message-type-success'};var only_error_css_class='message-container-only-errors';var hide_button=new Element('div',{'class':'message-list-hide'}).update('[x]');this._list=new Element('div',{'class':'message-list'});this._container=new Element('div',{'class':'message-container '+only_error_css_class});this._container.insert(hide_button);this._container.insert(this._list);$(this._render_to).insert(this._container);var hide_click_handler=function(){this.clearAllItems();};hide_button.observe('click',hide_click_handler.bindAsEventListener(this));this.addItem=function(type,message_body){if('error'!=type){this._container.removeClassName(only_error_css_class);}

this._list.insert(this._item_template.evaluate({type_class:this._type_class_map[type]?this._type_class_map[type]:this._type_class_map['warning'],content:message_body}));$(this._render_to).show();};this.addItems=function(messages){for(var i=0;i<messages.length;i++){this.addItem(messages[i].type,messages[i].message_body);}};this.clearAllItems=function(){$(this._render_to).hide();this._list.innerHTML='';this._container.addClassName(only_error_css_class);};};var Messaging={reset:function(){if(Page.messaging_box_controller){Page.messaging_box_controller.clearAllItems();}},addError:function(message){if(Page.messaging_box_controller){Page.messaging_box_controller.addItem('error',message);}},addWarning:function(message){if(Page.messaging_box_controller){Page.messaging_box_controller.addItem('warning',message);}},addSuccess:function(message){if(Page.messaging_box_controller){Page.messaging_box_controller.addItem('success',message);}},addItems:function(message_list){if(Page.messaging_box_controller){Page.messaging_box_controller.addItems(message_list);}}};var LightWindow=Class.create({mask:null,visible:true,contents:null,params:$H(),initialize:function(contents,params){this.contents=$(contents);if(params){this.params=params;}},show:function(){if(this.visible)return;this.visible=true;var contents=this.contents;var mask=document.createElement("div");this.mask=$(mask);mask.innerHTML="&nbsp;";mask.style.width=document.viewport.getWidth()+"px";mask.style.height='110%';document.viewport.getHeight()+"px";mask.style.opacity="0.6";mask.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=60)";mask.style.backgroundColor="#000000";mask.style.width=Math.max(Math.max(document.viewport.getWidth(),$(document.body).getWidth()),0)+"px";mask.style.height=Math.max(Math.max($('template_container').getHeight(),document.viewport.getHeight(),$(document.body).getHeight()),0)+"px";mask.style.position="absolute";mask.style.top="0px";mask.style.left="0px";mask.style.display="block";var dim=contents.getDimensions();contents.style.top=Math.max(0,(document.viewport.getHeight()-dim.height)/2)+"px";contents.style.left=Math.max(0,(contents.getOffsetParent().getWidth()-dim.width)/2)+"px";contents.style.zIndex=10001;mask.style.zIndex=10000;if(this.params.hideOnClick){this.boundHideHandler=this.hide.bindAsEventListener(this);mask.observe('click',this.boundHideHandler);contents.observe('click',this.boundHideHandler);mask.style.cursor="pointer";contents.style.cursor="pointer";}

Effect.Appear(contents,{duration:.2,beforeStart:function(){$('template_scroller').appendChild(mask);}});},hide:function(){if(!this.visible)return;this.contents.stopObserving('click',this.boundHideHandler);this.visible=true;var thiz=this;Effect.Fade(this.contents,{duration:.2,afterFinish:function(){$(thiz.mask).remove();}});}});var Positioning={repositionWithinViewport:function(element,anchorX,anchorY){var width=element.getWidth();var height=element.getHeight();var scrolloffsets=document.viewport.getScrollOffsets();var left=anchorX;var top=anchorY;if(width+anchorX>=document.viewport.getWidth()+scrolloffsets['left']){left-=width;}

if(height+anchorY>=document.viewport.getHeight()+scrolloffsets['top']){top-=height;}

element.setStyle({top:top+'px',left:left+'px'});}};var OverlayBox=Class.create({box:null,shadowOffset:25,width:null,height:null,initialize:function(id,innerHTML,width,height){this.box=new Element('div',{'class':'overlay-box',id:id,style:'display: none; position: absolute;'});this.contentbox=new Element('div',{'class':'overlay-box-inner'});if(width&&height){this.setDimensions(width,height);}else{this.setDimensions(240,135);}

this.setContent(innerHTML);},setDimensions:function(width,height){this.box.setStyle({width:width+'px',height:height+'px'});this.contentbox.setStyle({width:(width-10)+'px',height:(height-10)+'px'});this.width=width;this.height=height;},getElement:function(){return this.box;},setContent:function(innerHTML){this.contentbox.innerHTML='';this.box.innerHTML='';this.box.insert({top:this.contentbox});this.contentbox.insert({top:innerHTML});var shadowWidth=this.shadowOffset*2+this.width;var shadowHeight=this.shadowOffset*2+this.height;var shadowStyle='width: '+shadowWidth+'px;'+'height: '+shadowHeight+'px;'+'left: '+(-this.shadowOffset)+'px;'+'top:'+(-this.shadowOffset)+'px;';this.box.insert({bottom:DropShadow.getDropShadowImg(shadowStyle)});}});var DropShadow={getDropShadowImg:function(style){var src=Prototype.Browser.IE?'/i/blank.gif':'/i/dropshadow.png';var img=new Element('img',{'src':src,'class':'dropshadow',style:style});return img;}};var Page={clock_offset:0,messaging_box_controller:null,countdown_timer_stepper:null,lightwindow:new LightWindow(),warnOnLeavingPageMessage:null};window.onbeforeunload=function(){if(Page.warnOnLeavingPageMessage){return Page.warnOnLeavingPageMessage;}};function getWindowHeight(){if(window.self&&self.innerHeight){return self.innerHeight;}

if(document.documentElement&&document.documentElement.clientHeight){return document.documentElement.clientHeight;}

return 0;}

var BaseBubble={contents:$H({}),_initialized:true,init:function(){var bubble_html='<div id="global_base_bubble" class="widget-base-bubble" style="display: none;"><div id="global_base_bubble_contents" class="clearfix"></div>';if(!(BrowserDetect.browser=='Explorer'&&BrowserDetect.version==6)){bubble_html+='<div class="widget-dropshadow-top"></div><div class="widget-dropshadow-top-right"></div><div class="widget-dropshadow-right"></div><div class="widget-dropshadow-bottom-right"></div>';bubble_html+='<div class="widget-dropshadow-bottom"></div><div class="widget-dropshadow-bottom-left"></div><div class="widget-dropshadow-left"></div><div class="widget-dropshadow-top-left"></div>';}

bubble_html+='</div>';$('template_container').insert({bottom:bubble_html});BaseBubble._initialized=true;},Show:function(id,offset_parent,horizontal_offset,vertical_offset,force_flip){if(!BaseBubble._initialized){BaseBubble.init();}

if(!horizontal_offset){horizontal_offset=15;}

if(!vertical_offset){vertical_offset=-20;}

if(!offset_parent){offset_parent=$(id);}

if(!force_flip){force_flip=true;}

var bubble=$('global_base_bubble');$$('.widget-base-bubble-arrow').each(Element.remove);var bubble_contents=$('global_base_bubble_contents');var new_content=BaseBubble.contents.get(id);if(!new_content){return;}

bubble_contents.innerHTML=new_content;var offset=offset_parent.cumulativeOffset();var scroll_offset=offset_parent.cumulativeScrollOffset();offset.left-=scroll_offset.left;offset.top-=scroll_offset.top;var page_offset=$('template_container').cumulativeOffset();var viewport_width=document.viewport.getWidth();bubble.setStyle({'left':(offset.left-page_offset.left+offset_parent.getWidth()+horizontal_offset)+'px','top':(offset.top-page_offset.top+vertical_offset)+'px','visibility':'hidden'});bubble.show();var bubble_offset=bubble.cumulativeOffset();if(bubble_offset.left+bubble.getWidth()+20<viewport_width&&!force_flip){bubble.insert({top:'<div class="widget-base-bubble-arrow"></div>'});}else{bubble.setStyle({'left':(offset.left-page_offset.left-bubble.getWidth()-horizontal_offset)+'px'});bubble.insert({top:'<div class="widget-base-bubble-arrow widget-base-bubble-arrow-right"></div>'});}

bubble.setStyle({'visibility':'visible'});},Hide:function(){if(!BaseBubble._initialized){BaseBubble.init();}

var bubble=$('global_base_bubble');bubble.hide();},AddHtmlContent:function(id,html){BaseBubble.contents.set(id,html);},RemoveContent:function(id){BaseBubble.contents.unset(id);}}

var CharacterCounter={_initialized:true,listened_objects:{},Init:function(){for(var i in this.listened_objects){var o=this.listened_objects[i];this._addListeners(o.input_id,o.custom_events);};this._initialized=true;},_addListeners:function(input_id,custom_events){if($(input_id)){$(input_id).observe('keyup',CharacterCounter.Update.bind($(input_id)));$(input_id).observe('change',CharacterCounter.Update.bind($(input_id)));if(custom_events){$A(custom_events).each(function(event_string){$(input_id).observe(event_string,CharacterCounter.Update.bind($(input_id)));});}}},Add:function(input_id,character_counter_id,max_char_count,sync_init,custom_events){this.listened_objects[input_id]={'input_id':input_id,'character_counter_id':character_counter_id,'max_char_count':max_char_count,'custom_events':custom_events};if(this._initialized){this._addListeners(input_id,custom_events);}

if(sync_init){this.Update.bind($(input_id)).call();}},AddMin:function(input_id,character_counter_id,min_char_count,sync_init,custom_events){this.listened_objects[input_id]={'input_id':input_id,'character_counter_id':character_counter_id,'min_char_count':min_char_count,'custom_events':custom_events};if(this._initialized){this._addListeners(input_id,custom_events);}

if(sync_init){this.Update.bind($(input_id)).call();}},Update:function(){var input=this;var t=input.value;var maxlen=CharacterCounter.listened_objects[input.id].max_char_count;var minlen=CharacterCounter.listened_objects[input.id].min_char_count;var counter=$(CharacterCounter.listened_objects[input.id].character_counter_id);if(maxlen){if(t.length>maxlen){input.value=t.truncate(maxlen,'');}

if(counter){counter.update(parseInt(maxlen)-parseInt(input.value.length));}}else if(minlen){counter.update(Math.max(0,parseInt(minlen)-parseInt(input.value.length)));}}}

EventBugFix={_isSpecificButton:function(event,ieCode,w3cCode){return(((event.which!=undefined)&&(event.which==ieCode))||((event.button!=undefined)&&(event.button==w3cCode)));},isLeftClick:function(event){return this._isSpecificButton(event,1,0);},isRightClick:function(event){return this._isSpecificButton(event,3,2);},isMiddleClick:function(event){return this._isSpecificButton(event,2,1);}}

function getHTTPObject(){var xmlhttp;if(!xmlhttp&&typeof XMLHttpRequest!='undefined'){try{xmlhttp=new XMLHttpRequest();}catch(e){xmlhttp=true;}}

return xmlhttp;}

function openwindow(url,w,h){var newwindow;newwindow=window.open(url,'name','resizable=1,scrollbars=1,height='+h+',width='+w);if(window.focus){newwindow.focus()}}

function fixEvent(a){if(typeof a=="undefined")

a=window.event;if(typeof a.layerX=="undefined")

a.layerX=a.offsetX;if(typeof a.layerY=="undefined")

a.layerY=a.offsetY;if(typeof a.target=="undefined")a.target=a.srcElement;if(typeof a.which=="undefined")a.which=a.keyCode;return a;}

function getElementTop(element){return o(element,true);}

function getElementLeft(element){return o(element,true);}

function o(a,c){var b=0;while(a!=null){b+=a["offset"+(c?"Left":"Top")];a=a.offsetParent;}

return b;}

function GetChildElementById(element,id){if(!element.getAttribute)return null;if(element.getAttribute("id")==id)return element;for(var c in element.childNodes){var c1=null;if(element.childNodes[c].getAttribute&&element.childNodes[c].getAttribute("id")==id)return element.childNodes[c];else if((c1=GetChildElementById(element.childNodes[c],id))!=null){return c1;}}

return null;}

Rpc={RESULT_SUCCESS:1,RESULT_FAILURE:0,request:function(config){if(!config.callback){config.callback=Rpc.printMessage;}

if(!config.callback_scope){config.callback_scope=this;}

if(!config.ajax_root){config.ajax_root=AJAXROOT;}

if(!config.method){config.method='post';}

new Ajax.Request(config.ajax_root,{method:config.method,parameters:config.params_obj,onSuccess:function(transport){config.callback.call(config.callback_scope,transport.responseText.evalJSON());}});},submitForm:function(form,callback){form=$(form);if(!callback){callback=function(json){json=json.responseText.evalJSON();Rpc.showAlert(json);}}

form.request({onComplete:callback});},submitAjaxForm:function(form,redirect_on_fail){form=$(form);form.request({onComplete:function(transport){var json=transport.responseText.evalJSON();var next_url=WEBROOT;if(form.next_url&&form.next_url.value){next_url=form.next_url.value;}else if(json.suggested_redirect_url){next_url=json.suggested_redirect_url;}

var fail_url=next_url;if(form.fail_url&&form.fail_url.value){fail_url=form.fail_url.value;}

if(json.result_code==Rpc.RESULT_SUCCESS){redirect(next_url,json.message_list);return;}else{if(redirect_on_fail){redirect(fail_url,json.message_list);return;}}

Rpc.showAlert(json);}});},printMessage:function(resp){if(resp.message_list){Messaging.addItems(resp.message_list);}},refreshPage:function(resp){document.location.reload();},saveMessageAndRefreshPage:function(resp){if(resp.message_list){createCookie('c_msg_list',Object.toJSON(resp.message_list),0.1);}

window.location=window.location;},submitFormCallback:function(resp){resp=resp.responseText.evalJSON();if(resp.result_code==Rpc.RESULT_SUCCESS){document.location.reload();}else{Rpc.showAlert(resp);}},showAlert:function(resp){if(resp.message_list){message='';count=resp.message_list.length;for(var i=0;i<count;i++){if(i>0){message+="\n";}

message+=resp.message_list[i].message_body;}

alert(message);}},redirect:function(json,next_url,fail_url){if(next_url==undefined&&json.suggested_redirect_url){next_url=json.suggested_redirect_url;}

if(fail_url==undefined){fail_url=next_url;}

if(json.result_code==Rpc.RESULT_SUCCESS){redirect(next_url,json.message_list);return;}else{redirect(fail_url,json.message_list);return;}},doNothing:function(resp){}};Page.timers_by_id=new Hash();var Xwars={app_key:null,version:null,InitFb:function(){FB.Facebook.init(Xwars.app_key,'/xd_receiver.htm',null);},TrySubviewRedirect:function(){if(window.location.hash.length>1){window.location='/?view='+encodeURIComponent(window.location.hash.substr(1));}},ShowLoading:function(){if(FB&&FB.CanvasClient){FB.CanvasClient.scrollTo(0,0);}

Xwars.ShowLoadingNoScroll();},ShowLoadingNoScroll:function(){if($('loading')){$('loading').show();}},HideLoading:function(){if($('loading')){$('loading').hide();}},CountdownIncrementStat:function(stat_id,increment_count,max_value,countdown_timer){var new_value;$$('.ajaxupdate-text-stat-'+stat_id).each(function(stat){var currentStat=parseInt(stat.innerHTML);if(currentStat+increment_count<=max_value){stat.innerHTML=max_value;$$('.stat_countdown_'+stat_id).each(Element.hide);}else{countdown_timer.reset();countdown_timer.start();stat.innerHTML=currentStat+increment_count;}

new_value=parseInt(stat.innerHTML);});var new_percentage=Math.min(100,new_value/max_value*100);$$('.ajaxupdate-progressbar-stat-'+stat_id).each(function(bar_element){new Effect.Morph(bar_element,{style:'width: '+new_percentage+'%;',duration:.7,transition:Effect.Transitions.sinoidal});});},LoadSubView:function(url,success_callback){Xwars.ShowLoading();XwarsBubble.Hide();var anchor=url.toQueryParams().anchor;Rpc.request({ajax_root:url,method:'get',params_obj:{rt:'json'},callback:function(resp){Xwars.HideLoading();cookieCheck();if(resp.result_code==Rpc.RESULT_SUCCESS){if(resp.data&&resp.data.game_version&&resp.data.game_version!=Xwars.version){window.location='/?new_version=1';return;}

if(resp.data.inject_method=='innerHTML'){$('page_body').innerHTML=resp.data.page_body;}else{$('page_body').update(resp.data.page_body);}

if($('host_message')&&$('host_message_container')){if(resp.data.host_message){$('host_message').update(resp.data.host_message);if($('host_img')&&resp.data.host_img){$('host_img').setAttribute('src',resp.data.host_img);}

if($('host_name')){if(resp.data.host_name){$('host_name').innerHTML=resp.data.host_name;}else{$('host_name').innerHTML='';}}

$('host_message_container').show();Xwars.BindAjaxLinks('host_message');}else{$('host_message').innerHTML='';$('host_message_container').hide();}}

if(resp.data.nav){$$('.nav-item').each(function(e){e.removeClassName('highlight');});if($('nav_'+resp.data.nav)){$('nav_'+resp.data.nav).addClassName('highlight');}}

if(resp.data.html&&resp.data.html.choose_realm&&$('choose_realm')){$('choose_realm').update(resp.data.html.choose_realm);Xwars.BindAjaxLinks('choose_realm');}

if(resp.data.realm_bg&&$('masthead_splash')){$('masthead_splash').setAttribute('src',resp.data.realm_bg);}

Xwars.BindAjaxLinks('page_body');window.location.hash=url;FB.CanvasClient.setSizeToContent();if(success_callback){success_callback();}

if(resp.data.init_fb){Xwars.InitFb();}

if(anchor&&$(anchor)&&FB&&FB.CanvasClient){var anchor_dims=$(anchor).cumulativeOffset();FB.CanvasClient.scrollTo(0,anchor_dims.top);}

if(resp.data.interstitial){Xwars.ShowInterstitial(resp.data.interstitial);}}else{Xwars.ShowError(resp);}

Xwars.ShowDebug(resp);}});},BindAjaxLinks:function(parent){if(parent){$(parent).select(".ajax").each(function(a){a.observe('click',function(ev){Xwars.LoadSubView(a.getAttribute('href'));Event.stop(ev);});});}else{$$("a.ajax").each(function(a){a.observe('click',function(ev){Xwars.LoadSubView(a.getAttribute('href'));Event.stop(ev);});});}},SendGift:function(class_name){var gift_id=$$(class_name)[0].getAttribute('gift_id');if(!gift_id){alert('There is no gift id.');return true;}

Xwars.LoadSubView('/send_gift/?id='+gift_id);return true;},RealmScroll:function(selected_realm_id,first_realm_id,display_comic_before,selected_comic_id){Xwars.ShowLoadingNoScroll();var url='/choose_realm?selected_realm_id='+selected_realm_id+'&first_realm_id='+first_realm_id+'&display_comic_before='+display_comic_before;if(selected_comic_id!=null){url+='&selected_comic_id='+selected_comic_id;}

Rpc.request({ajax_root:url,method:'get',params_obj:{rt:'json'},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){$('choose_realm').update(resp.data.html);Xwars.BindAjaxLinks('choose_realm');}else{Xwars.ShowError(resp);}}});},MissionRealmScroll:function(selected_realm_id,first_realm_id,display_comic_before,selected_comic_id){Xwars.ShowLoadingNoScroll();var url='/choose_realm?selected_realm_id='+selected_realm_id+'&first_realm_id='+first_realm_id+'&display_comic_before='+display_comic_before+'&mission_nav=1';if(selected_comic_id!=null){url+='&selected_comic_id='+selected_comic_id;}

Rpc.request({ajax_root:url,method:'get',params_obj:{rt:'json'},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){$('mission_choose_realm').update(resp.data.html);Xwars.BindAjaxLinks('mission_choose_realm');}else{Xwars.ShowError(resp);}}});},ShowDebug:function(resp){if(resp.debug_html){$('debug_dialog_contents').innerHTML=resp.debug_html;$('debug_dialog_handle').show();}},ShowError:function(resp){var message='';if(resp.message_list){var count=resp.message_list.length;for(var i=0;i<count;i++){if(i>0){message+="\n";}

message+=resp.message_list[i].message_body;}}

$('error_dialog_body').innerHTML=message;$('error_dialog_handle').show();},ShowModalInfo:function(resp){var message='';if(resp.message_list){var count=resp.message_list.length;for(var i=0;i<count;i++){if(i>0){message+="\n";}

message+=resp.message_list[i].message_body;}}

$('info_dialog_body').innerHTML=message;$('info_dialog_handle').show();},CloseModalInfo:function(){$('info_dialog_handle').hide();return true;},ShowInterstitial:function(html){$('interstitial_body').update(html);$('interstitial_handle').show();},CloseInterstitial:function(){$('interstitial_handle').hide();return true;},ShowInfo:function(resp,message_box_id){if(resp.use_modal_dialog){Xwars.ShowModalInfo(resp);}else{Xwars.ShowHostInfo(resp,message_box_id);}},ShowHostInfo:function(resp,message_box_id){if(!message_box_id){message_box_id='host_message';}

if($(message_box_id)&&resp.message_list){var message='';var count=resp.message_list.length;for(var i=0;i<count;i++){if(i>0){message+="<br/>";}

message+=resp.message_list[i].message_body;}

$(message_box_id).update(message);Xwars.BindAjaxLinks(message_box_id);if(message_box_id=='host_message'&&$('host_message_container')){$('host_message_container').show();}}

if(resp.message){$('feed_dialog_contents').update(resp.message);$('feed_dialog_handle').show();}else{$('feed_dialog_handle').hide();}

Xwars.UpdateUpdateables(resp.data.updateables);},UpdateUpdateables:function(updateables){texts=$H(updateables.text);texts.each(function(pair){$$('.ajaxupdate-text-'+pair.key).each(function(obj){obj.innerHTML=pair.value;});});progressbars=$H(updateables.progressbar);progressbars.each(function(pair){$$('.ajaxupdate-progressbar-'+pair.key).each(function(obj){new Effect.Morph(obj,{style:'width:'+pair.value+'%;',duration:0.5,transition:Effect.Transitions.sinoidal});});});countdowns=$H(updateables.countdown);countdowns.each(function(pair){var timer=Page.timers_by_id.get(pair.key);var new_target_date=(new Date()).valueOf()+pair.value*1000;if(timer.isPaused()||Math.abs(timer._target_date-new_target_date)>3000){timer._target_date=new_target_date;timer.start();}

$$('.'+pair.key).each(Element.show);});},DoMission:function(mission_id,ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{req:'RpcApiXwars_DoMission','origin_token':ot,mission_id:mission_id},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){if(resp.data.new_mission){Xwars.LoadSubView('/mission',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowInfo(resp);}}else{Xwars.ShowError(resp);}

Xwars.ShowDebug(resp);}});return true;},BuyAllItemsForMission:function(mission_id,ot,use_bank){use_bank=typeof(use_bank)!='undefined'?use_bank:0;Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{req:'RpcApiXwars_BuyAllItemsForMission','origin_token':ot,'mission_id':mission_id,'use_bank':use_bank},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){if(resp.data.mission_view){Xwars.LoadSubView('/mission',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowInfo(resp);}}else{Xwars.ShowError(resp);}}});return true;},AddBonusPointListeners:function(bonus_points){TOTAL_BONUS_POINTS=bonus_points;CURRENT_BONUS_POINTS=bonus_points;if(bonus_points>0){$$('.plus img').each(function(e){e.setAttribute('src',e.getAttribute('active_url'));});}

return true;},UpgradeBonusPoint:function(type,count){if(CURRENT_BONUS_POINTS-count<0){return true;}

if(CURRENT_BONUS_POINTS-count>TOTAL_BONUS_POINTS){return true;}

var value_element=$('bonus_points_'+type+'_value');var value=parseInt(value_element.innerHTML);if(value+count<value_element.getAttribute('orig_value')){return true;}

value_element.innerHTML=value+count;CURRENT_BONUS_POINTS-=count;if(value+count<=value_element.getAttribute('orig_value')){var img_element=$('bonus_points_'+type+'_minus_img');img_element.setAttribute('src',img_element.getAttribute('inactive_url'));}else if(value+count>value_element.getAttribute('orig_value')){var img_element=$('bonus_points_'+type+'_minus_img');img_element.setAttribute('src',img_element.getAttribute('active_url'));}

if(CURRENT_BONUS_POINTS<=0){$$('.plus img').each(function(e){e.setAttribute('src',e.getAttribute('inactive_url'));});}else{$$('.plus img').each(function(e){e.setAttribute('src',e.getAttribute('active_url'));});}

if($('profile_bonus_points_value')){$('profile_bonus_points_value').innerHTML=CURRENT_BONUS_POINTS;}

if(CURRENT_BONUS_POINTS==TOTAL_BONUS_POINTS){$('profile_bonus_points_save_prompt').hide();}else{$('profile_bonus_points_save_prompt').show();}

return true;},TutorialSaveBonusPoints:function(ot){var types=['attack','defense','energy','stamina','health'];var params={req:'RpcApiGameTutorial_SaveBonusPoints',origin_token:ot};for(var i=0;i<types.length;i++){var type=types[i];var value_element=$('bonus_points_'+type+'_value');params['final_stats['+type+']']=parseInt(value_element.innerHTML);}

Xwars.ShowLoading();Rpc.request({method:'post',params_obj:params,callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Rpc.saveMessageAndRefreshPage(resp);}else{Xwars.ShowError(resp);}}});return true;},SaveBonusPoints:function(ot){var types=['attack','defense','energy','stamina','health'];var params={req:'RpcApiXwars_SaveBonusPoints',origin_token:ot};for(var i=0;i<types.length;i++){var type=types[i];var value_element=$('bonus_points_'+type+'_value');params['final_stats['+type+']']=parseInt(value_element.innerHTML);}

Xwars.ShowLoading();Rpc.request({method:'post',params_obj:params,callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/profile',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},BankDeposit:function(input_id,ot){var amount=$(input_id).value;Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_BankDeposit','origin_token':ot,'amount':amount},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/profile',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},BankWithdraw:function(input_id,ot){var amount=$(input_id).value;Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_BankWithdraw','origin_token':ot,'amount':amount},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/profile',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},Heal:function(ot){Xwars.ShowLoading();Rpc.request({params_obj:{'req':'RpcApiXwars_Heal','origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/profile',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},Fight:function(player_id,ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_Fight','player_id':player_id,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){if(resp.data.show_host_message){Xwars.LoadSubView('/fight?fight_result=1',function(){Xwars.ShowInfo(resp);});}else{Xwars.LoadSubView('/fight?fight_result=1',function(){Xwars.ShowInfo(resp,'fight_result');});}}else{Xwars.ShowError(resp);}}});return true;},UseItem:function(item_class_id,ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_UseItem','origin_token':ot,'item_class_id':item_class_id},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/store?landing_item_class_id='+item_class_id,function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowInfo(resp);}}});return true;},UseItemHome:function(item_class_id,ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_UseItem','origin_token':ot,'item_class_id':item_class_id},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/home',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowInfo(resp);}}});return true;},BuyItem:function(item_class_id,item_count_selector,ot,use_bank){var item_count=$(item_count_selector).value;return Xwars.BuyItemCount(item_class_id,item_count,ot,use_bank);},BuyItemCount:function(item_class_id,item_count,ot,use_bank){use_bank=typeof(use_bank)!='undefined'?use_bank:0;Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_BuyItem','origin_token':ot,'item_class_id':item_class_id,'item_count':item_count,'use_bank':use_bank},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/store?landing_item_class_id='+item_class_id,function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowInfo(resp);}}});return true;},SellItem:function(item_class_id,item_count_selector,ot){var item_count=$(item_count_selector).value;Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_SellItem','origin_token':ot,'item_class_id':item_class_id,'item_count':item_count},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/store?landing_item_class_id='+item_class_id,function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowInfo(resp);}}});return true;},ShowConfirmDialog:function(message,button_text,success_callback){var confirm_template=new Template('<div class="confirm-dialog">'

+'<div class="confirm-dialog-message">'

+'#{message}'

+'</div>'

+'<div class="confirm-dialog-buttons clearfix">'

+'<a class="confirm-dialog-button button" href="#" onclick="#{success_callback}"><span class="left">#{button_text}</span></a>'

+'<a class="confirm-dialog-cancel button" href="#" onclick="Xwars.CloseModalInfo();return true;"><span class="left">Cancel</span></a>'

+'</div>'

+'</div>');var confirm_message={message:message,button_text:button_text,success_callback:success_callback};var confirm_data={use_modal_dialog:true,message_list:[{message_body:confirm_template.evaluate(confirm_message)}]};Xwars.ShowModalInfo(confirm_data);return true;},SellItem_Avatar:function(item_class_id,item_count,item_sell_price,item_name,ot,force){if(!force){Xwars.ShowConfirmDialog('Are you sure you want to sell your <strong>'+item_name+'</strong> for <span class="money-value">'+(item_sell_price*item_count)+'</span>?','Sell for <span class="money-value">'+(item_sell_price*item_count)+'</span>','Xwars.SellItem_Avatar('+item_class_id+','+item_count+','+item_sell_price+',\''+escape(item_name)+'\',\''+ot+'\',true);Xwars.CloseModalInfo();return true;');return true;}

Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_SellItem','origin_token':ot,'item_class_id':item_class_id,'item_count':item_count},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/avatar',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowInfo(resp);}}});return true;},GrantOffer:function(offer_id,ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_GrantOffer','origin_token':ot,'offer_id':offer_id},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/offer',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},BuyBusiness:function(business_id,ot,use_bank){use_bank=typeof(use_bank)!='undefined'?use_bank:0;Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_BuyBusiness','business_id':business_id,'origin_token':ot,'use_bank':use_bank},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/property',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},UpgradeBusiness:function(business_id,ot,use_bank){use_bank=typeof(use_bank)!='undefined'?use_bank:0;Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_UpgradeBusiness','business_id':business_id,'origin_token':ot,'use_bank':use_bank},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/property',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},AdvanceBusiness:function(business_id,ot,use_bank){use_bank=typeof(use_bank)!='undefined'?use_bank:0;Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_AdvanceBusiness','business_id':business_id,'origin_token':ot,'use_bank':use_bank},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/property',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},HarvestBusiness:function(business_id,ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_HarvestBusiness','business_id':business_id,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/property',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},HarvestAllBusinesses:function(ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_HarvestAllBusinesses','origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/property',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},PracticeItem:function(gear_class_id,ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_PracticeItem','gear_class_id':gear_class_id,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){if(resp.data.item_mastered){Xwars.LoadSubView('/fight/?view=equip&selected_gear_class_id='+gear_class_id,function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowInfo(resp);Xwars.UpdateUpdateables(resp.data.updateables);}}else{Xwars.ShowError(resp);}}});},EquipItem:function(gear_class_id,ot,success_callback){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_EquipItem','gear_class_id':gear_class_id,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){if(resp.data.loadout_html&&$('player_loadout_container')){$('player_loadout_container').update(resp.data.loadout_html);Xwars.BindAjaxLinks('player_loadout_container');}

Xwars.ShowInfo(resp);success_callback(resp);}else{Xwars.ShowError(resp);}

Xwars.ShowDebug(resp);}});return true;},UnequipItem:function(gear_class_id,ot,success_callback){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_UnequipItem','gear_class_id':gear_class_id,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){if(resp.data.loadout_html&&$('player_loadout_container')){$('player_loadout_container').update(resp.data.loadout_html);Xwars.BindAjaxLinks('player_loadout_container');}

Xwars.ShowInfo(resp);success_callback(resp);}else{Xwars.ShowError(resp);}

Xwars.ShowDebug(resp);}});return true;},SaveRecruitItems:function(gear_to_playerids,ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_SaveRecruitItems','gear_to_playerids':Object.toJSON(gear_to_playerids),'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){if(resp.data.loadout_html){$('player_loadout_container').update(resp.data.loadout_html);Xwars.BindAjaxLinks('player_loadout_container');}

Xwars.ShowInfo(resp);}else{Xwars.ShowError(resp);}

Xwars.ShowDebug(resp);}});},ResetAccount:function(confirm_password_id,ot){if(confirm_password_id){var confirm_password=$(confirm_password_id).value;}else{var confirm_password=null;}

Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_ResetAccount','confirm_password':confirm_password,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){if(resp.data.reset_success){window.location='/tutorial';}

Xwars.ShowInfo(resp);}else{Xwars.ShowError(resp);}

Xwars.ShowDebug(resp);}});return true;},AddToBuyCart:function(gear_class_id,mode,ot){Xwars.ShowLoadingNoScroll();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_AddToBuyCart','gear_class_id':gear_class_id,'mode':mode,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/avatar',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},RemoveFromBuyCart:function(gear_class_id,mode,ot){Xwars.ShowLoadingNoScroll();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_RemoveFromBuyCart','gear_class_id':gear_class_id,'mode':mode,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/avatar',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},AddToSellCart:function(gear_class_id,ot){Xwars.ShowLoadingNoScroll();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_AddToSellCart','gear_class_id':gear_class_id,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/avatar',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},RemoveFromSellCart:function(gear_class_id,ot){Xwars.ShowLoadingNoScroll();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_RemoveFromSellCart','gear_class_id':gear_class_id,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/avatar',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},ClearBuyCart:function(mode,ot){Xwars.ShowLoadingNoScroll();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_ClearBuyCart','mode':mode,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/avatar',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},ClearSellCart:function(ot){Xwars.ShowLoadingNoScroll();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_ClearSellCart','origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/avatar',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},BuyCart:function(mode,ot,use_bank){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_BuyCart','origin_token':ot,'mode':mode,'use_bank':use_bank},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/avatar',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},SellCart:function(ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_SellCart','origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.LoadSubView('/avatar',function(){Xwars.ShowInfo(resp);});}else{Xwars.ShowError(resp);}}});return true;},SaveEmblem:function(callsign_image_id,emblem_image_id,ot){Xwars.ShowLoading();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_SaveEmblem','callsign_image_id':callsign_image_id,'emblem_image_id':emblem_image_id,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.ShowInfo(resp);}else{Xwars.ShowError(resp);}

Xwars.ShowDebug(resp);}});return true;},CreateAvatarPhoto:function(){FB.Connect.showPermissionDialog('photo_upload',Xwars.CreateAvatarPhotoNoPrompt);},CreateAvatarPhotoNoPrompt:function(perms){Xwars.ShowLoading();Rpc.request({params_obj:{req:'RpcApiXwars_CreateAvatarPhoto',granted_permissions:perms},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){Xwars.ShowInfo(resp);}else{Xwars.ShowError(resp);}}});}}

XwarsSetupProgress={progress:0,effect:null,data:null,ShowDialog:function(data){data.progress=20;XwarsSetupProgress.progress=data.progress;var template=new Template('<div class="setup-progress-dialog">'+'<h1 class="clearfix"><span class="header">Setup Progress:</span>'+'<span class="completeness">'+'<span id="setup_progress_rail" class="rail" style="width:#{progress}%;"></span>'+'<span class="label"><strong><span id="setup_progress_label">#{progress}</span>%</strong> Complete</span>'+'</span></h1>'+'<h2>Stay Connected! Complete the checklist:</h2>'+'<ul class="clearfix">'+'<li id="setup_progress_bookmark" class="unchecked clearfix"><span class="copy">Bookmark #{app_name} for easy access!</span><span class="action" id="setup_progress_bookmark_button" onclick="return XwarsSetupProgress.RefreshDelayed()"><fb:bookmark></fb:bookmark></span></li>'+'<li id="setup_progress_fan" class="unchecked clearfix"><span class="copy">Become a Fan of #{app_name}!</span><span class="action" id="setup_progress_fan_button"><fb:fan profile_id="#{app_id}" stream="0" connections="0" css="http://static.ak.crunchyroll.com/css/xwars/fb_style.css?1"></fb:fan></span></li>'+'<li id="setup_progress_email" class="unchecked clearfix"><span class="copy">Get important updates in your mailbox!</span><span class="action" id="setup_progress_email_button"><a href="#" onclick="return XwarsSetupProgress.ShowEmailPermissions()" class="email-permissions"></a></span></li>'+'<li id="setup_progress_permissions" class="unchecked clearfix"><span class="copy">Stay connected with your friends!</span><span class="action" id="setup_progress_permissions_button"><a href="#" onclick="return XwarsSetupProgress.ShowExtendedPermissions()" class="extended-permissions"></a></span></li>'+'</ul>'+'</div>');var resp={message_list:[{'message_body':template.evaluate(data)}]}

Xwars.ShowModalInfo(resp);Xwars.InitFb();XwarsSetupProgress.data=data;XwarsSetupProgress.Refresh();return true;},RefreshDelayed:function(){XwarsSetupProgress.data.pe_counter=0;new PeriodicalExecuter(function(pe){XwarsSetupProgress.Refresh();if(++XwarsSetupProgress.data.pe_counter>=5){pe.stop();}},2);return true;},Refresh:function(){var data=XwarsSetupProgress.data;var api_client=FB.Facebook.apiClient;api_client.fql_query('SELECT email, publish_stream, bookmarked FROM permissions WHERE uid="'+data.uid+'"',function(rows){rows=rows[0];if(rows.bookmarked){XwarsSetupProgress.MarkChecked('bookmark');}

if(rows.email){XwarsSetupProgress.MarkChecked('email');}

if(rows.publish_stream){XwarsSetupProgress.MarkChecked('permissions');}});api_client.pages_isFan(data.app_id,data.uid,function(is_fan){if(is_fan){XwarsSetupProgress.MarkChecked('fan');}});return true;},IncrementProgress:function(){XwarsSetupProgress.progress+=20;if(XwarsSetupProgress.effect){XwarsSetupProgress.effect.cancel();}

var new_width=Math.min(100,XwarsSetupProgress.progress);XwarsSetupProgress.effect=new Effect.Morph($('setup_progress_rail'),{style:'width: '+new_width+'%;',duration:.7,transition:Effect.Transitions.sinoidal});$('setup_progress_label').update(new_width);XwarsSetupProgress.PingServer(new_width);},PingServer:function(progress){Rpc.request({params_obj:{'req':'RpcApiXwars_SetSetupProgress','progress':progress},callback:function(resp){if(resp.result_code==Rpc.RESULT_SUCCESS){if($('home_setup_progress_rail')){$('home_setup_progress_rail').setStyle({'width':progress+'%'});$('home_setup_progress_label').update(progress);}}}});return true;},MarkChecked:function(item){switch(item){case'bookmark':if($('setup_progress_bookmark').hasClassName('checked')){break;}

$('setup_progress_bookmark_button').hide();$('setup_progress_bookmark').addClassName('checked');$('setup_progress_bookmark').removeClassName('unchecked');XwarsSetupProgress.IncrementProgress();break;case'fan':if($('setup_progress_fan').hasClassName('checked')){break;}

$('setup_progress_fan_button').hide();$('setup_progress_fan').addClassName('checked');$('setup_progress_fan').removeClassName('unchecked');XwarsSetupProgress.IncrementProgress();break;break;case'permissions':if($('setup_progress_permissions').hasClassName('checked')){break;}

$('setup_progress_permissions_button').hide();$('setup_progress_permissions').addClassName('checked');$('setup_progress_permissions').removeClassName('unchecked');XwarsSetupProgress.IncrementProgress();break;case'email':if($('setup_progress_email').hasClassName('checked')){break;}

$('setup_progress_email_button').hide();$('setup_progress_email').addClassName('checked');$('setup_progress_email').removeClassName('unchecked');XwarsSetupProgress.IncrementProgress();break;}},ShowExtendedPermissions:function(){FB.Connect.showPermissionDialog('publish_stream',function(perms){if(perms){XwarsSetupProgress.MarkChecked('permissions');}});return true;},ShowEmailPermissions:function(){FB.Connect.showPermissionDialog('email',function(perms){if(perms){XwarsSetupProgress.MarkChecked('email');}});return true;}}

function increment_stat(stat_id,increment_count,max_value,countdown_timer){var stat=$('stat_'+stat_id);if(stat){if(parseInt(stat.innerHTML)+increment_count<=max_value){stat.innerHTML=Math.min(max_value,parseInt(stat.innerHTML)+increment_count);}else{countdown_timer.reset();countdown_timer.start();stat.innerHTML=parseInt(stat.innerHTML)+increment_count;}}}

var XwarsAvatar={max_layers:null,Preview:function(img_url,layer){if(img_url){$('avatar_preview_'+layer).setAttribute('src',img_url);}},FullPreview:function(player_id,include_try_on_items){Xwars.ShowLoading();var params={'rt':'json'};if(player_id){params.player_id=player_id;}

if(include_try_on_items){params.include_try_on_items=1;}

Rpc.request({ajax_root:'/avatar_full',method:'get',params_obj:params,callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){$('avatar_full_preview').update(resp.data.page_body);$('avatar_full_preview_handle').show();}else{Xwars.ShowError(resp);}}});return true;},ResetTryOn:function(ot){Xwars.ShowLoadingNoScroll();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_ResetTryItems','origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){$('avatar_preview').update(resp.data.avatar_preview_html);}else{Xwars.ShowError(resp);}}});return true;},TryOn:function(gear_class_id,ot){Xwars.ShowLoadingNoScroll();Rpc.request({method:'post',params_obj:{'req':'RpcApiXwars_TryItem','item_class_id':gear_class_id,'origin_token':ot},callback:function(resp){Xwars.HideLoading();if(resp.result_code==Rpc.RESULT_SUCCESS){$('avatar_preview').update(resp.data.avatar_preview_html);}else{Xwars.ShowError(resp);}}});return true;},Reset:function(){for(var layer=0;layer<XwarsAvatar.max_layers;layer++){var layer_obj=$('avatar_preview_'+layer);if(layer_obj){layer_obj.setAttribute('src',layer_obj.getAttribute('orig_src'));}}}}

var XwarsAvatarTutorial={ITEM_CHOICES:null,ITEM_CHOSEN:$H(),SetPlayerClassId:function(form_id){$('form_item_classes').value=XwarsAvatarTutorial.ITEM_CHOSEN.toJSON(),$(form_id).submit();return true;},ChooseClass:function(element){$$(".tutorial-player-class").each(function(el){$(el).removeClassName('highlight');});var player_class_id=$(element).getAttribute('player_class_id');XwarsAvatarTutorial.PLAYER_CLASS_ID=player_class_id;$(element).addClassName('highlight');for(var equip_area in XwarsAvatarTutorial.ITEM_CHOICES[player_class_id]){var item_class=null;if(XwarsAvatarTutorial.ITEM_CHOSEN.get(player_class_id)&&XwarsAvatarTutorial.ITEM_CHOSEN.get(player_class_id).get(equip_area)){item_class=XwarsAvatarTutorial.ITEM_CHOSEN.get(player_class_id).get(equip_area);}else{item_class=XwarsAvatarTutorial.ITEM_CHOICES[player_class_id][equip_area][0];}

if(item_class){XwarsAvatarTutorial.ChooseItem(player_class_id,item_class);}}

XwarsAvatarTutorial.UpdatePreview();},ChooseItem:function(player_class_id,item_class){var img=$('tutorial_items_'+item_class.equip_area);var handle=$('tutorial_item_container_'+item_class.equip_area);img.src=item_class.img;var force_flip=(img.getAttribute('counter')%3>=2);var x=-104;var y=116;handle.stopObserving('click');handle.observe('click',function(){var next_item_class=XwarsAvatarTutorial.ChooseNextItem(item_class.equip_area);XwarsBubble.Show('item_class_'+next_item_class.id,handle,x,y,force_flip);});handle.stopObserving('mouseover');handle.stopObserving('mouseout');handle.observe('mouseover',function(){XwarsBubble.Show('item_class_'+item_class.id,handle,x,y,force_flip);});handle.observe('mouseout',function(){XwarsBubble.Hide();});if(!XwarsAvatarTutorial.ITEM_CHOSEN.get(player_class_id)){XwarsAvatarTutorial.ITEM_CHOSEN.set(player_class_id,$H());}

XwarsAvatarTutorial.ITEM_CHOSEN.get(player_class_id).set(item_class.equip_area,item_class);XwarsAvatarTutorial.UpdatePreview();XwarsBubble.Hide();},ChoosePrevItem:function(equip_area){var current_item_class=XwarsAvatarTutorial.ITEM_CHOSEN.get(XwarsAvatarTutorial.PLAYER_CLASS_ID).get(equip_area);var possible_items=XwarsAvatarTutorial.ITEM_CHOICES[XwarsAvatarTutorial.PLAYER_CLASS_ID][equip_area];var current_index=0;for(var i=0;i<possible_items.length;i++){var item_class=possible_items[i];if(item_class.id==current_item_class.id){current_index=i;break;}}

var next_item_class=possible_items[(i-1+possible_items.length)%possible_items.length]

XwarsAvatarTutorial.ChooseItem(XwarsAvatarTutorial.PLAYER_CLASS_ID,next_item_class);return next_item_class;},ChooseNextItem:function(equip_area){var current_item_class=XwarsAvatarTutorial.ITEM_CHOSEN.get(XwarsAvatarTutorial.PLAYER_CLASS_ID).get(equip_area);var possible_items=XwarsAvatarTutorial.ITEM_CHOICES[XwarsAvatarTutorial.PLAYER_CLASS_ID][equip_area];var current_index=0;for(var i=0;i<possible_items.length;i++){var item_class=possible_items[i];if(item_class.id==current_item_class.id){current_index=i;break;}}

var next_item_class=possible_items[(i+1+possible_items.length)%possible_items.length]

XwarsAvatarTutorial.ChooseItem(XwarsAvatarTutorial.PLAYER_CLASS_ID,next_item_class);return next_item_class;},UpdatePreview:function(){var img_full=XwarsAvatarTutorial.PLAYER_CLASSES[XwarsAvatarTutorial.PLAYER_CLASS_ID].img_full;if($('tutorial_avatar_preview_base')){$('tutorial_avatar_preview_base').src=img_full;}

for(var equip_area in XwarsAvatarTutorial.ITEM_CHOICES[XwarsAvatarTutorial.PLAYER_CLASS_ID]){var item_class=XwarsAvatarTutorial.ITEM_CHOSEN.get(XwarsAvatarTutorial.PLAYER_CLASS_ID).get(equip_area);var img=$('tutorial_avatar_preview_'+equip_area);if(img&&item_class){img.src=item_class.img_full;if(item_class.layer){img.setStyle({zIndex:parseInt(item_class.layer)});}}}}}

var XwarsBubble={_item_weapon_template:new Template('<div class="bubble-item"><div class="header"><h1>#{name}</h1><h2>#{type_subtype}</h2></div>'+'<div class="mastery">#{mastery_str}</div>'+'<div class="stats clearfix"><span class="attack"><span class="attack-value">#{attack_str}</span> #{attack_label}#{attack_extra}</span></div>'+'<div class="stats clearfix"><span class="defense"><span class="defense-value">#{defense_str}</span> #{defense_label}#{defense_extra}</span></div>'+'<div class="desc">#{desc}</div>'+'<div class="clearfix"><div class="money-value">#{cost}</div>'+'<div class="owned">You own: #{owned}</div></div></div>'),_item_weapon_no_mastery_template:new Template('<div class="bubble-item"><div class="header"><h1>#{name}</h1><h2>#{type_subtype}</h2></div>'+'<div class="stats clearfix"><span class="attack"><span class="attack-value">#{attack_str}</span> #{attack_label}#{attack_extra}</span></div>'+'<div class="stats clearfix"><span class="defense"><span class="defense-value">#{defense_str}</span> #{defense_label}#{defense_extra}</span></div>'+'<div class="desc">#{desc}</div>'+'<div class="clearfix"><div class="money-value">#{cost}</div>'+'<div class="owned">You own: #{owned}</div></div></div>'),_item_weapon_no_mastery_no_cost_template:new Template('<div class="bubble-item"><div class="header"><h1>#{name}</h1><h2>#{type_subtype}</h2></div>'+'<div class="stats clearfix"><span class="attack"><span class="attack-value">#{attack_str}</span> #{attack_label}#{attack_extra}</span></div>'+'<div class="stats clearfix"><span class="defense"><span class="defense-value">#{defense_str}</span> #{defense_label}#{defense_extra}</span></div>'+'<div class="desc">#{desc}</div>'+'<div class="owned">You own: #{owned}</div></div></div>'),_item_generic_template:new Template('<div class="bubble-item"><div class="header"><h1>#{name}</h1><h2>#{type_subtype}</h2></div>'+'<div class="desc">#{desc}</div>'+'<div class="info">#{info}</div>'+'<div class="clearfix"><div class="money-value">#{cost}</div>'+'<div class="owned">You own: #{owned}</div></div></div>'),_item_refill_template:new Template('<div class="bubble-item"><div class="header"><h1>#{name}</h1><h2>#{type_subtype}</h2></div>'+'<div class="desc">#{desc}</div>'+'<div class="info">#{info}</div>'+'<div class="owned">You own: #{owned}</div></div></div>'),_glossary_template:new Template('<dl class="bubble-glossary"><dt>#{term}</dt><dd>#{definition}</dd></dl>'),Show:BaseBubble.Show,Hide:BaseBubble.Hide,RemoveContent:BaseBubble.RemoveContent,AddItem:function(id,type,data){var item_type=data.type;var item_subtype=data.subtype;if(item_type&&item_subtype){data.type_subtype=item_type+' ('+item_subtype+')';}else if(item_type){data.type_subtype=item_type;}else if(item_subtype){data.type_subtype=item_subtype;}else{data.type_subtype='';}

switch(type){case 1:var content=XwarsBubble._item_weapon_template.evaluate(data);break;case 4:var content=XwarsBubble._item_weapon_no_mastery_template.evaluate(data);break;case 5:var content=XwarsBubble._item_weapon_no_mastery_no_cost_template.evaluate(data);break;case 3:var content=XwarsBubble._item_refill_template.evaluate(data);break;case 2:default:var content=XwarsBubble._item_generic_template.evaluate(data);break;}

if(content){BaseBubble.AddHtmlContent(id,content);}},AddGlossary:function(id,data){var content=XwarsBubble._glossary_template.evaluate(data);BaseBubble.AddHtmlContent(id,content);},AddListeners:function(parent_element){$(parent_element).getElementsBySelector('.has-tooltip').each(function(el){el.observe('mouseover',function(el2){var x=0;if(el.getAttribute('tooltip_x')){x=parseInt(el.getAttribute('tooltip_x'));}

var y=0;if(el.getAttribute('tooltip_y')){y=parseInt(el.getAttribute('tooltip_y'));}

var force_flip=true;if(parseInt(el.getAttribute('force_flip'))>0){force_flip=true;}

XwarsBubble.Show(el.getAttribute('tooltip_id'),el,x,y,force_flip);});el.observe('mouseout',function(el2){XwarsBubble.Hide();});});}}

var AjaxForms={disabled:true,BindListeners:function(){$$('form.ajaxed-game-form').each(function(element){element.observe('submit',AjaxForms.HandleSubmit);});},HandleSubmit:function(submit_event){submit_event.stop();if(AjaxForms.disabled)return;var form=submit_event.findElement('form.ajaxed-game-form');if(!form)return;var formname=form.getInputs('hidden','formname')[0].getValue();var params_obj=form.serialize().toQueryParams();params_obj.req=formname;AjaxForms.disabled=true;Rpc.request({params_obj:params_obj,callback:AjaxForms.UpdateWithResponse});},UpdateWithResponse:function(resp){AjaxForms.disabled=true;if(resp.data&&resp.data.refresh){Rpc.saveMessageAndRefreshPage(resp);return;}

if(FB&&FB.CanvasClient){FB.CanvasClient.scrollTo(0,0);}

Messaging.reset();Rpc.printMessage(resp);AjaxForms.UpdateWithData(resp.data);},UpdateWithData:function(data){if(!data){return;}

if(data.updatables){for(key in data.updatables){$$('.updatable-'+key).each(function(updatable_span){updatable_span.innerHTML=data.updatables[key];});}

Cufon.refresh();}

if(data.updatableclasses){for(key in data.updatableclasses){$$('.updatable-'+key).each(function(updatable_span){if(data.updatableclasses[key].add){updatable_span.addClassName(data.updatableclasses[key].add);}

if(data.updatableclasses[key].remove){updatable_span.removeClassName(data.updatableclasses[key].remove);}});}}

if(data.updatableprogressbars){for(key in data.updatableprogressbars){$$('.updatableprogressbar-'+key).each(function(updatable_bar){updatable_bar.setStyle({width:data.updatableprogressbars[key]+'%'});});}}}}

var Gear={BindPurchaseListeners:function(){$$('form.ajaxed-gear-purchase-form').each(function(element){element.observe('submit',Gear.HandlePurchase);});},HandlePurchase:function(submit_event){submit_event.stop();if(AjaxForms.disabled)return;var form=submit_event.findElement('form.ajaxed-gear-purchase-form');if(!form)return;var formname=form.getInputs('hidden','formname')[0].getValue();var params_obj=form.serialize().toQueryParams();params_obj.req=formname;AjaxForms.disabled=true;Rpc.request({params_obj:params_obj,callback:Gear.UpdateWithResponse});},UpdateWithResponse:function(resp){AjaxForms.disabled=true;try{NarutoMinigame.SetDialogData(resp.message_list[0].message_body);$('sliding_scroll_overlay_dialog').show();}catch(exception){}

AjaxForms.UpdateWithData(resp.data);}}

var GameFb={ShowDialog:function(token,template_id,short_title,short_body,action_link,action_url,dialog_msg,images){var data={"one_line":"","short_title":short_title,"short_body":short_body,"action_link":action_link,"action_url":action_url,"images":images};var cb_func=function(postid,exception,data){Rpc.request({params_obj:{req:'RpcApiFacebook_DialogPosted','token':token,'app':'main','postid':postid}});};FB.Connect.showFeedDialog(template_id,data,null,short_body,null,FB.RequireConnect.require,cb_func,'',{'value':dialog_msg});},notify_online_friends_sent:null,NotifyOnlineFriends:function(update_id,update_text){if(!GameFb.notify_online_friends_sent){GameFb.notify_online_friends_sent=true;Rpc.request({params_obj:{req:'RpcApiXWars_NotifyOnlineFriends'},callback:function(resp){if(resp.result_code!=Rpc.RESULT_SUCCESS){Rpc.showAlert(resp);}else{$(update_id).update(update_text);}}});}},notify_friend:{},NotifyFriend:function(id){if(!GameFb.notify_friend[id]){Rpc.request({params_obj:{req:'RpcApiXWars_NotifyFriend','id':id},callback:function(resp){if(resp.result_code==Rpc.RESULT_SUCCESS){GameFb.notify_friend[id]=true;}else{Rpc.showAlert(resp);}}});}else{Xwars.ShowError({message_list:[{message_body:'You have already sent a notification to this person.'}]});}

return true;},AddBookmarkCallback:function(){Rpc.request({params_obj:{req:'RpcApiXWars_AddBookmarkCallback'},callback:function(resp){}});}}

function cookieCheck(){if(!readCookie('check')){var msg='Your session could not be established.  This sometimes happens with certain browsers like Safari.  Please make sure your web browser allow cookies in iframes.  <a href="/" class="button" style="width:200px;margin:10px auto;"><span class="left">Click here to try again</span></a>';var resp={'message_list':[{'message_body':msg}]}

Xwars.ShowModalInfo(resp);}}

var WatchVideo={PageVideoGrid:function(page,entries_per_page){$('watch_loading').show();Rpc.request({ajax_root:'/watch_video_grid',method:'get',params_obj:{page:page},callback:function(resp){$('watch_loading').hide();if(resp.result_code!=Rpc.RESULT_SUCCESS){Rpc.showAlert(resp);}else{$('watch_table_grid').update(resp.data.grid_html);$('watch_paginator').update(resp.data.paginator_html);}}});}}
