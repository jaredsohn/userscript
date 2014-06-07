// ==UserScript==
// @name           VkScripts by LOGOS) 
// @namespace      http://vkontakte.ru/
// @description    Расширение функционала ВКонтакте.ру
// @author         Russian 
// @version        0.0.1.3
// @include http://vkontakte.ru/*
// ==/UserScript==
var SCRIPT_NAME = 'VkScripts';
var SCRIPT_VERSION = '0.0.1.3'; // DO NOT FORGET TO UPDATE!!!

var GET = parseGET();

var args = Array();
var param = Array();

// addParam(имя,по-умолчанию,минимум,максимум,дробное?)
addParam('useLinks');
addParam('shortMenu',false);
addParam('hideMyInMenu');
addParam('confirmOpinion');
addParam('directLinks',false);
addParam('newComments',false);
addParam('checkNewComments',false);
addParam('downAudio');
addParam('uniqAudio');
addParam('removeAudiosAuthor');
addParam('showDublCount');
addParam('showReply');
addParam('downVideo');
addParam('skipVersion',0,0,99*99,true);
addParam('inviteAll');
addParam('horLinks',false);
addParam('rightMenu',false);
addParam('comfirmWhenPlaying');
addParam('confirmGraffiti');
addParam('menuRightAlignment',false);
addParam('groupList');
addParam('clearGroup',false);
addParam('searchVideo');
addParam('invertTitle');
addParam('searchVideoTimeout',10,0.2,300,true);
addParam('widescreen',false);
addParam('removeMe');
addParam('checkNewMessages');
addParam('checkNewMessagesTimeout',30,1,108000);
addParam('removeBanners',false);
addParam('popupMessage');
addParam('popupReply');
addParam('smile_in_all');
addParam('smile_in_message');
addParam('admingroups_banlist',true);
addParam('fiends',true);
addParam('main_status',true);
addParam('friendsonline',false);
addParam('new_menu',true);
addParam('inviz',true);
addParam('app_download',true);
addParam('app_download_prof',true);
addParam('rate',true);
addParam('activity_history',true);
addParam('clock_calendar',true);
addParam('ratetext',true);
addParam('mess_bgcolor',true);
addParam('check_all_in_photo',true);
addParam('matches_in_stolbik',true);
addParam('menu_sideBar_fixed',true);
//-0.11-
//addParam('grafiti',false);
addParam('count_audio',true);
addParam('serch_audio_border',true);
addParam('regulator_audio',true);
addParam('rotate_img_foto',true);
addParam('link_del_comm_album',true);
addParam('video_foto_in_board',true);
addParam('textarea_lines',true);
addParam('online_blink',true);
addParam('audio_auto_play',false);
addParam('out_from_all_groups',true);
//-0.12-
addParam('smile_in_photo',true);
addParam('smile_in_video',true);
addParam('smile_in_board',true);
//-0.13-
addParam('new_cursor',true);
addParam('banlink_user_in_group',true);
addParam('banlink_user_in_group_id_group',6438995,0.2,99999999,true);
addParam('look_banlist_in_open_group',true);

if (GET['vkScripts'] != undefined)
	showMessageSettSaved();


setParams(args);

getParams(args);


// глобализуем параметры
// !!! Переделать все параметры в скрипте в массив param
for (var i in param) {
	var valStr;
	if (typeof(param[i]) == 'string') {
		valStr = 'var '+i+' = "'+param[i].replace(/\\/g,"\\\\").replace(/\"/g,"\\\"")+'";';
	} else
		valStr = 'var '+i+' = '+param[i].toString()+';';

	eval(valStr);
}

// ID текущего пользователя, т.е. авторизированного
var currentUserId = getCookie('remixmid');


// Добавляем служебные слои
if (document.getElementsByTagName('body').length > 0) {
	var servLayout = document.createElement('div');
	servLayout.id = 'notify_sound';
	document.getElementsByTagName('body')[0].appendChild(servLayout);

	//скрытое поле инициализации таймера Админ бан листа.
	var servpoint_session_admin_ban = document.createElement('input');
	servpoint_session_admin_ban.type='HIDDEN';
	servpoint_session_admin_ban.id = 'servpoint_session_admin_ban';
	servpoint_session_admin_ban.value='0';
	document.getElementsByTagName('head')[0].appendChild(servpoint_session_admin_ban);

	//ф-я start_session_admin_ban
	var start_session_admin_ban_func = document.createElement("script");
	start_session_admin_ban_func.setAttribute("type", "text/javascript");
	start_session_admin_ban_func.text = 'function start_session_admin_ban_loading(){document.getElementById(\'servpoint_session_admin_ban\').value=\'1\'; document.getElementById(\'Cancel_button_session_admin_ban\').style.display="none"; document.getElementById(\'Ok_button_session_admin_ban\').style.display="none"; document.getElementById(\'button_div_session_admin_ban\').innerHTML += \'<center>Подготовка...</center>\';}'; 
	document.getElementsByTagName("head")[0].appendChild(start_session_admin_ban_func);
	
}


//Ajax
function Ajax(onDone, onFail, eval_res){
	var _t = this;
	this.onDone = onDone;
	this.onFail = onFail;
	var tran = null;
	var calls = 0;
	try { tran = new XMLHttpRequest(); }
	catch(e) { tran = null; }
	try { if(!tran) tran = new ActiveXObject("Msxml2.XMLHTTP"); }
	catch(e) { tran = null; }
	try { if(!tran) tran = new ActiveXObject("Microsoft.XMLHTTP"); }
	catch(e) { tran = null; }

	var parseRes = function(){
		if(!tran || !tran.responseText)return;
		var res = tran.responseText.replace(/^[\s\n]+/g, '');

		if(res.substr(0,10)=="<noscript>")
		{
			try{
				var arr = res.substr(10).split("</noscript>");
				eval(arr[0]);
				tran.responseText = arr[1];
			}catch(e){
			}
		}else{}
	};
	this.get = function(u, q, f){
		f = f || false;
		if(typeof(q)!='string')q = ajx2q(q);
		u = u + (q ? ('?'+q) : '');
		tran.open('GET', u, !f);
		if (calls) {
			tran.onreadystatechange = function() { stateDisp(); };
		}
		tran.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		tran.send('');
		calls++;
	};
	this.post = function(u, d, f){
		f = f || false;
		if(typeof(d)!='string')d = ajx2q(d);
		tran.open('POST', u, !f);
		if (calls) {
			tran.onreadystatechange = function() { stateDisp(); };
		}
		tran.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		tran.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		tran.send(d);
		calls++;
	};
	var stateDisp = function(){
		if(tran.readyState == 4 ) {
			if(tran.status >= 200 && tran.status < 300) {
				if(eval_res) parseRes();
				if( _t.onDone ) _t.onDone(_t, tran.responseText);
			} else {
				if( _t.onFail ) _t.onFail(_t, tran.responseText);
			}
		}
	}
	tran.onreadystatechange = stateDisp;
}

function ajx2q(qa)
{
  var query = [], q, i =0;
	
  for( var key in qa ) {
	if(qa[key]===undefined || qa[key] === null || typeof(qa[key])=='function')continue;
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(qa[key]));
  }
  return query.join('&');
}

var ajaxHistory = $ah = new (function(){
	var _t = this;
	
	var curHash = "";
	var curHashes = {};
	var frame = null;
	var forceLoad = false;
	var order = null;
	
	_t.frameLoading = false;
	_t.enabled = false;
	_t.useCache = true;
	_t.onLoad = {};
	_t.cache = {};
	
	var setHash = function(hash){
		hash = hash.replace("#","");
		if(location.hash != "#" + hash){
			location.hash = "#" + hash;
			if(isIE()){
				frame.src = 'blank.html?ahHash='+encodeURIComponent(hash);
				_t.frameLoading = true;
			}
		}
		return true;
	};
	var getHash = function(){
		if(!isIE())return location.hash.replace("#","");
		try{
			var hash = ge('ahFrame').contentWindow.document.location.search.match(/ahHash=(.*)$/);
			return decodeURIComponent((hash && hash[1]) || "").replace("#","");
		}catch(e){return curHash;}
	};
	var splitHash = function(hash){
		if(!hash)return {};
		hash = hash.split("/");
		if(hash.length == 1){
			if(!_t.onLoad['default'])return {};
			if(_t.onLoad['default'].show)hash[0] = _t.onLoad['default'].show.from(hash[0]);
			return {'default':sortParams(hash[0])};
		}
		var parsed = {};
		for(var i=0;i<hash.length;i+=2){
			var h = hash[i];var p = hash[i+1];
			if(_t.onLoad[h].show){p = sortParams(_t.onLoad[h].show.from(p));}
			else{
				p = sortParams(p);
				if(!p && _t.onLoad[h])p = sortParams(_t.onLoad[h].def);
			}
			parsed[h] = p;
		}
		return parsed;
	};
	var joinHash = function(hash){
		var joined = [];
		var def = true;
		for(var i in hash){
			def = def && (i=='default');
			var p = sortParams(hash[i]);
			if(_t.onLoad[i].show){
				var p1 = _t.onLoad[i].show.to(splitParams(hash[i]));
				if(p1)p = p1;
			}
			joined.push(i + "/" + p);
		}
		if(def && joined[0])return joined[0].split("/")[1];
		return joined.sort().join("/");
	};
	var splitParams = function(params){
		if(!params)return {};
		if(typeof(params)!='string')return params;
		if(!/&|=/.test(params))return params;
		var vals = params.split("&");
		var p = {};
		for(var i=0;i<vals.length;i++){
			var v = vals[i].split("=");
			p[v[0]] = v[1];
		}
		return p;
	};
	var sortParams = function(params){
		if(typeof(params)=='number')return params+'';
		if(typeof(params)!='string'){
			params = ajx2q(params);
		}
		return params.split("&").sort().join("&");
	};
	
	_t.init = function(){
		if(!this.enabled)return;
		for(var i in _t.onLoad){
			var p = sortParams(_t.onLoad[i].def);
			curHashes[i] = p;
		};
		var handler = function(){
			var origHash = getHash();
			if(origHash==curHash && !forceLoad)return;
			var state = splitHash(origHash);
			var hash = joinHash(state);
			if(hash!=curHash || forceLoad){
				var ordered = order || _t.onLoad;
				for(var i in ordered){
					if(order)i = ordered[i];
					var l = _t.onLoad[i];
					var p = state[i] || sortParams(l.def);
					if(p!=curHashes[i] || i == forceLoad){
						forceLoad = false;
						if(l.before && !l.before(splitParams(p))){
							curHashes[i] = p;
							continue;
						}
						if(!_t.cache[i])_t.cache[i] = {};
						if(!_t.useCache || !_t.cache[i][p]){
							_t.getData(l,i,p,hash);
						}else if(l.done){
							l.done({}, _t.cache[i][p]);
						}
						curHashes[i] = p;
					}
				}
				curHash = hash;
				if(isIE()){
					if(location.hash != "#" + hash)location.hash = "#" + hash;
				}
			}
		};
		if(isIE()){
			var initHash = encodeURIComponent(location.hash);
			document.body.innerHTML += "<iframe id='ahFrame' style='position:absolute;left:-1000px;width:0;height:0' src='/blank.html?ahHash="+initHash+"'></iframe>";
			frame = ge('ahFrame');
			
			frame.attachEvent('onreadystatechange', function() {
				if(frame.contentWindow.document.readyState == 'complete'){
					_t.frameLoading = false;
					handler();
				}
			}, false);
			frame.attachEvent('onload', function() {
				if(_t.frameLoading){
					_t.frameLoading = false;
					handler();
				}
			}, false);
			
			setInterval(function(){
				if(!_t.frameLoading && (location.hash.replace("#", "") != getHash())){
					setHash(location.hash);
				}				
			}, 200);
		}else{
			setInterval(handler,150);
		}
	};
	_t.go = function(s, params){
		if(params===undefined){params = s; s = 'default';}
		var state = splitHash(curHash);
		state[s] = sortParams(params);
		var hash = joinHash(state);
		setHash(hash);
		forceLoad = s;
	};
	_t.getData = function(loadObj, id, params, hash){
		var a = new Ajax(
		(function(l,i,p,t){return function(res,text){
			if(l.done)l.done(res,text);
			if(t.useCache)_t.cache[i][p] = text;
			t.frameLoading = false;
		};})(loadObj,id,params, _t), 
		(function(l,i,p,t){return function(res,text){
			if(l.fail)l.fail(res,text);
			t.frameLoading = false;
		};})(loadObj,id,params, _t),
		true);
		a.post(loadObj.url, params);
	};
	_t.prepare = function(id, params){
		_t.enabled = true;
		if(params===undefined){params = id; id = 'default';}
		_t.onLoad[id] = params;
	};
	_t.validateHash = function(hash){return joinHash(splitHash(hash));};
	_t.clearCache = function(id){_t.cache[id] = {}};
	
})();

//JQuery
(function(){var _jQuery=window.jQuery,_$=window.$;var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context);};var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this;}if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3])return jQuery().find(selector);return jQuery(elem);}selector=[];}}else
return jQuery(context).find(selector);}else if(jQuery.isFunction(selector))return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return this.setArray(jQuery.makeArray(selector));},jquery:"1.2.6",size:function(){return this.length;},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num];},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret;},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this;},each:function(callback,args){return jQuery.each(this,callback,args);},index:function(elem){var ret=-1;return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this);},attr:function(name,value,type){var options=name;if(name.constructor==String)if(value===undefined)return this[0]&&jQuery[type||"attr"](this[0],name);else{options={};options[name]=value;}return this.each(function(i){for(name in options)jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name));});},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)value=undefined;return this.attr(key,value,"curCSS");},text:function(text){if(typeof text!="object"&&text!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this]);});});return ret;},wrapAll:function(html){if(this[0])jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)elem=elem.firstChild;return elem;}).append(this);return this;},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html);});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)this.appendChild(elem);});},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)this.insertBefore(elem,this.firstChild);});},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this);});},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});},end:function(){return this.prevObject||jQuery([]);},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem);});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems);},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0];}else
return this.cloneNode(true);});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)this[expando]=null;});if(events===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var events=jQuery.data(this,"events");for(var type in events)for(var handler in events[type])jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data);});return ret;},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i);})||jQuery.multiFilter(selector,this));},not:function(selector){if(selector.constructor==String)if(isSimple.test(selector))return this.pushStack(jQuery.multiFilter(selector,this,true));else
selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector;});},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=='string'?jQuery(selector):jQuery.makeArray(selector))));},is:function(selector){return!!selector&&jQuery.multiFilter(selector,this).length>0;},hasClass:function(selector){return this.is("."+selector);},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)return value;values.push(value);}}return values;}else
return(this[0].value||"").replace(/\r/g,"");}return undefined;}if(value.constructor==Number)value+='';return this.each(function(){if(this.nodeType!=1)return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0);});if(!values.length)this.selectedIndex=-1;}else
this.value=value;});},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value);},replaceWith:function(value){return this.after(value).remove();},eq:function(i){return this.slice(i,i+1);},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},andSelf:function(){return this.add(this.prevObject);},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length)data=jQuery.data(this[0],key);return data===undefined&&parts[1]?this.data(parts[0]):data;}else
return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value);});},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)elems.reverse();}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script"))scripts=scripts.add(elem);else{if(elem.nodeType==1)scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem);}});scripts.each(evalScript);});}};jQuery.fn.init.prototype=jQuery.fn;function evalScript(i,elem){if(elem.src)jQuery.ajax({url:elem.src,async:false,dataType:"script"});else
jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)elem.parentNode.removeChild(elem);}function now(){return+new Date;}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2;}if(typeof target!="object"&&typeof target!="function")target={};if(length==i){target=this;--i;}for(;i<length;i++)if((options=arguments[i])!=null)for(var name in options){var src=target[name],copy=options[name];if(target===copy)continue;if(deep&&copy&&typeof copy=="object"&&!copy.nodeType)target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy);else if(copy!==undefined)target[name]=copy;}return target;};var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep)window.jQuery=_jQuery;return jQuery;},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"");},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body;},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)script.text=data;else
script.appendChild(document.createTextNode(data));head.insertBefore(script,head.firstChild);head.removeChild(script);}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])jQuery.cache[id]={};if(data!==undefined)jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id;},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])break;if(!name)jQuery.removeData(elem);}}else{try{delete elem[expando];}catch(e){if(elem.removeAttribute)elem.removeAttribute(expando);}delete jQuery.cache[id];}},each:function(object,callback,args){var name,i=0,length=object.length;if(args){if(length==undefined){for(name in object)if(callback.apply(object[name],args)===false)break;}else
for(;i<length;)if(callback.apply(object[i++],args)===false)break;}else{if(length==undefined){for(name in object)if(callback.call(object[name],name,object[name])===false)break;}else
for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}return object;},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value;},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))elem.className+=(elem.className?" ":"")+className;});},remove:function(elem,classNames){if(elem.nodeType==1)elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className);}).join(" "):"";},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1;}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}callback.call(elem);for(var name in options)elem.style[name]=old[name];},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0;});val-=Math.round(padding+border);}if(jQuery(elem).is(":visible"))getWH();else
jQuery.swap(elem,props,getWH);return Math.max(0,val);}return jQuery.curCSS(elem,name,force);},curCSS:function(elem,name,force){var ret,style=elem.style;function color(elem){if(!jQuery.browser.safari)return false;var ret=defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")=="";}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");return ret==""?"1":ret;}if(jQuery.browser.opera&&name=="display"){var save=style.outline;style.outline="0 solid black";style.outline=save;}if(name.match(/float/i))name=styleFloat;if(!force&&style&&style[name])ret=style[name];else if(defaultView.getComputedStyle){if(name.match(/float/i))name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle&&!color(elem))ret=computedStyle.getPropertyValue(name);else{var swap=[],stack=[],a=elem,i=0;for(;a&&color(a);a=a.parentNode)stack.unshift(a);for(;i<stack.length;i++)if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block";}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";for(i=0;i<swap.length;i++)if(swap[i]!=null)stack[i].style.display=swap[i];}if(name=="opacity"&&ret=="")ret="1";}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase();});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft;}}return ret;},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)return;if(elem.constructor==Number)elem+='';if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">";});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild);}elem=jQuery.makeArray(div.childNodes);}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)ret.push(elem);else
ret=jQuery.merge(ret,elem);});return ret;},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)return undefined;var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;name=notxml&&jQuery.props[name]||name;if(elem.tagName){var special=/href|src|style/.test(name);if(name=="selected"&&jQuery.browser.safari)elem.parentNode.selectedIndex;if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)throw"type property can't be changed";elem[name]=value;}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name))return elem.getAttributeNode(name).nodeValue;return elem[name];}if(msie&&notxml&&name=="style")return jQuery.attr(elem.style,"cssText",value);if(set)elem.setAttribute(name,""+value);var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr;}if(msie&&name=="opacity"){if(set){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+''=="NaN"?"":"alpha(opacity="+value*100+")");}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+'':"";}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase();});if(set)elem[name]=value;return elem[name];},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"");},makeArray:function(array){var ret=[];if(array!=null){var i=array.length;if(i==null||array.split||array.setInterval||array.call)ret[0]=array;else
while(i)ret[--i]=array[i];}return ret;},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)if(array[i]===elem)return i;return-1;},merge:function(first,second){var i=0,elem,pos=first.length;if(jQuery.browser.msie){while(elem=second[i++])if(elem.nodeType!=8)first[pos++]=elem;}else
while(elem=second[i++])first[pos++]=elem;return first;},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i]);}}}catch(e){ret=array;}return ret;},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++)if(!inv!=!callback(elems[i],i))ret.push(elems[i]);return ret;},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!=null)ret[ret.length]=value;}return ret.concat.apply([],ret);}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});jQuery.each({parent:function(elem){return elem.parentNode;},parents:function(elem){return jQuery.dir(elem,"parentNode");},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret));};});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)jQuery(args[i])[original](this);});};});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)this.removeAttribute(name);},addClass:function(classNames){jQuery.className.add(this,classNames);},removeClass:function(classNames){jQuery.className.remove(this,classNames);},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames);},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this);});if(this.parentNode)this.parentNode.removeChild(this);}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild);}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments);};});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px");};});function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2]);},"#":function(a,i,m){return a.getAttribute("id")==m[2];},":":{lt:function(a,i,m){return i<m[3]-0;},gt:function(a,i,m){return i>m[3]-0;},nth:function(a,i,m){return m[3]-0==i;},eq:function(a,i,m){return m[3]-0==i;},first:function(a,i){return i==0;},last:function(a,i,m,r){return i==r.length-1;},even:function(a,i){return i%2==0;},odd:function(a,i){return i%2;},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a;},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a;},"only-child":function(a){return!jQuery.nth(a.parentNode.lastChild,2,"previousSibling");},parent:function(a){return a.firstChild;},empty:function(a){return!a.firstChild;},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0;},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden";},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden";},enabled:function(a){return!a.disabled;},disabled:function(a){return a.disabled;},checked:function(a){return a.checked;},selected:function(a){return a.selected||jQuery.attr(a,"selected");},text:function(a){return"text"==a.type;},radio:function(a){return"radio"==a.type;},checkbox:function(a){return"checkbox"==a.type;},file:function(a){return"file"==a.type;},password:function(a){return"password"==a.type;},submit:function(a){return"submit"==a.type;},image:function(a){return"image"==a.type;},reset:function(a){return"reset"==a.type;},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button");},input:function(a){return/input|select|textarea|button/i.test(a.nodeName);},has:function(a,i,m){return jQuery.find(m[3],a).length;},header:function(a){return/h\d/i.test(a.nodeName);},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length;}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r);}return cur;},find:function(t,context){if(typeof t!="string")return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)for(var c=ret[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true;}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n);}if(m=="+")break;}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true;}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length);}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]];}else{re2=quickClass;m=re2.exec(t);}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[];}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag));}if(m[1]==".")r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break;}r=tmp;}ret=r;}t=t.replace(re2,"");}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t);}}if(t)ret=[];if(ret&&context==ret[0])ret.shift();done=jQuery.merge(done,ret);return done;},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)tmp.push(r[i]);}return tmp;},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break;}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)tmp.push(a);}r=tmp;}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;merge[id]=true;}var add=false;if(first==0){if(node.nodeIndex==last)add=true;}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)add=true;if(add^not)tmp.push(node);}r=tmp;}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object")fn=fn[m[2]];if(typeof fn=="string")fn=eval("false||function(a,i){return "+fn+";}");r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r);},not);}}return{r:r,t:t};},dir:function(elem,dir){var matched=[],cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)matched.push(cur);cur=cur[dir];}return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])if(cur.nodeType==1&&++num==result)break;return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=elem)r.push(n);}return r;}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)return;if(jQuery.browser.msie&&elem.setInterval)elem=window;if(!handler.guid)handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=this.proxy(fn,function(){return fn.apply(this,arguments);});handler.data=data;}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered)return jQuery.event.handle.apply(arguments.callee.elem,arguments);});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)elem.addEventListener(type,handle,false);else if(elem.attachEvent)elem.attachEvent("on"+type,handle);}}handlers[handler.guid]=handler;jQuery.event.global[type]=true;});elem=null;},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)=="."))for(var type in events)this.remove(elem,type+(types||""));else{if(types.type){handler=types.handler;types=types.type;}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)delete events[type][handler.guid];else
for(handler in events[type])if(!parts[1]||events[type][handler].type==parts[1])delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)elem.detachEvent("on"+type,jQuery.data(elem,"handle"));}ret=null;delete events[type];}}});}for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle");}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true;}if(!elem){if(this.global[type])jQuery("*").add([window,document]).trigger(type,data);}else{if(elem.nodeType==3||elem.nodeType==8)return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});data[0][expando]=true;}data[0].type=type;if(exclusive)data[0].exclusive=true;var handle=jQuery.data(elem,"handle");if(handle)val=handle.apply(elem,data);if((!fn||(jQuery.nodeName(elem,'a')&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)val=false;if(event)data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)val=ret;}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]();}catch(e){}}this.triggered=false;}return val;},handle:function(event){var val,ret,namespace,all,handlers;event=arguments[0]=jQuery.event.fix(event||window.event);namespace=event.type.split(".");event.type=namespace[0];namespace=namespace[1];all=!namespace&&!event.exclusive;handlers=(jQuery.data(this,"events")||{})[event.type];for(var j in handlers){var handler=handlers[j];if(all||handler.type==namespace){event.handler=handler;event.data=handler.data;ret=handler.apply(this,arguments);if(val!==false)val=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}}return val;},fix:function(event){if(event[expando]==true)return event;var originalEvent=event;event={originalEvent:originalEvent};var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");for(var i=props.length;i;i--)event[props[i]]=originalEvent[props[i]];event[expando]=true;event.preventDefault=function(){if(originalEvent.preventDefault)originalEvent.preventDefault();originalEvent.returnValue=false;};event.stopPropagation=function(){if(originalEvent.stopPropagation)originalEvent.stopPropagation();originalEvent.cancelBubble=true;};event.timeStamp=event.timeStamp||now();if(!event.target)event.target=event.srcElement||document;if(event.target.nodeType==3)event.target=event.target.parentNode;if(!event.relatedTarget&&event.fromElement)event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0);}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)event.metaKey=event.ctrlKey;if(!event.which&&event.button)event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event;},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;return proxy;},special:{ready:{setup:function(){bindReady();return;},teardown:function(){return;}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseenter";return jQuery.event.handle.apply(this,arguments);}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseleave";return jQuery.event.handle.apply(this,arguments);}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data);});},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);return(fn||data).apply(this,arguments);});return this.each(function(){jQuery.event.add(this,type,one,fn&&data);});},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn);});},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn);});},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn);},toggle:function(fn){var args=arguments,i=1;while(i<args.length)jQuery.event.proxy(fn,args[i++]);return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;event.preventDefault();return args[this.lastToggle++].apply(this,arguments)||false;}));},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut);},ready:function(fn){bindReady();if(jQuery.isReady)fn.call(document,jQuery);else
jQuery.readyList.push(function(){return fn.call(this,jQuery);});return this;}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document);});jQuery.readyList=null;}jQuery(document).triggerHandler("ready");}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}jQuery.ready();})();if(jQuery.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}jQuery.ready();},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}if(numStyles===undefined)numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}jQuery.ready();})();}jQuery.event.add(window,"load",jQuery.ready);}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode;}catch(error){parent=elem;}return parent==elem;};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind();});jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!='string')return this._load(url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}callback=callback||function(){};var type="GET";if(params)if(jQuery.isFunction(params)){callback=params;params=null;}else{params=jQuery.param(params);type="POST";}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res]);}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val};}):{name:elem.name,value:val};}).get();}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});var jsc=now();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null;}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type});},getScript:function(url,callback){return jQuery.get(url,null,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={};}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type});},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings);},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string")s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?";}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json";}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}if(head)head.removeChild(script);};}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&type=="GET"){var ts=now();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"");}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null;}if(s.global&&!jQuery.active++)jQuery.event.trigger("ajaxStart");var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script);}};}head.appendChild(script);return undefined;}var requestDone=false;var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(s.username)xhr.open(type,s.url,s.async,s.username,s.password);else
xhr.open(type,s.url,s.async);try{if(s.data)xhr.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default);}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;xhr.abort();return false;}if(s.global)jQuery.event.trigger("ajaxSend",[xhr,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null;}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter);}catch(e){status="parsererror";}}if(status=="success"){var modRes;try{modRes=xhr.getResponseHeader("Last-Modified");}catch(e){}if(s.ifModified&&modRes)jQuery.lastModified[s.url]=modRes;if(!jsonp)success();}else
jQuery.handleError(s,xhr,status);complete();if(s.async)xhr=null;}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)setTimeout(function(){if(xhr){xhr.abort();if(!requestDone)onreadystatechange("timeout");}},s.timeout);}try{xhr.send(s.data);}catch(e){jQuery.handleError(s,xhr,null,e);}if(!s.async)onreadystatechange();function success(){if(s.success)s.success(data,status);if(s.global)jQuery.event.trigger("ajaxSuccess",[xhr,s]);}function complete(){if(s.complete)s.complete(xhr,status);if(s.global)jQuery.event.trigger("ajaxComplete",[xhr,s]);if(s.global&&!--jQuery.active)jQuery.event.trigger("ajaxStop");}return xhr;},handleError:function(s,xhr,status,e){if(s.error)s.error(xhr,status,e);if(s.global)jQuery.event.trigger("ajaxError",[xhr,s,e]);},active:0,httpSuccess:function(xhr){try{return!xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(filter)data=filter(data,type);if(type=="script")jQuery.globalEval(data);if(type=="json")data=eval("("+data+")");return data;},param:function(a){var s=[];if(a.constructor==Array||a.jquery)jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value));});else
for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this));});else
s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+");}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove();}}).end();},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none";}).end();},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]();});},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback);},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback);},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback);},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback);},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return opt.complete.call(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow;}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit;}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit);}else
e.custom(start,val,"");}});return true;});},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx";}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this);}});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1);}});if(!gotoEnd)this.dequeue();return this;}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array));}return q;};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this);});};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={};}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block";},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd);}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null;}},13);}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block";}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p]);}if(done)this.options.complete.call(this.elem);return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}return true;}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now;},scrollTop:function(fx){fx.elem.scrollTop=fx.now;},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now);},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit;}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop);}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent;}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode;}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));}results={top:top,left:left};}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true));}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0;}return results;};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}return results;},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent);}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val;}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method];};});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br);};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0);};});})();

// Корректировка бокового меню
// Получение числа новых сообщений
var newMessagesCount = 0;
if (document.getElementById("nav") != null) {
	var elements = document.getElementById("nav").getElementsByTagName("a");
	var parts = new Array;
	var space;
	
	for (i=0;i<=elements.length-1;i++) { 
		// Получение числа новых сообщений
		if (elements[i].href.search(/\/mail\.php\?/) > -1) {
			elements[i].id = 'messageMenuItem';
			var mtch = elements[i].innerHTML.match(/\(<b>([0-9]+)<\/b>\)/);
			if (mtch != null) {
				newMessagesCount = mtch[1];
			}
		}
		
		// корректировка меню
		space = elements[i].innerHTML.indexOf(" ");
		if (space > -1) {
			parts[0] = elements[i].innerHTML.substring(0,space);
			parts[1] = elements[i].innerHTML.substring(space);
			if (shortMenu && i>1) {
				elements[i].innerHTML = parts[1];
			} else if(hideMyInMenu && parts[0].length<=4) {
				elements[i].innerHTML = "<font color='#9DCBBF'>"+parts[0]+"</font> "+parts[1];
			}
		}
	}

}
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ###############################################------0.13------###########################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################

// ##########################################################################################################
// #################################
// #################################                     Курсор в контакте                                   
// #################################
// ##########################################################################################################
if (new_cursor) {
	$(document).ready(function(){
		jQuery("body, div, a").css({"cursor":"url(http://zongozara.narod.ru/11.png), auto"}); 
	});
}

// ##########################################################################################################
// #################################
// #################################                    В своей группе над каждым участником пишет БАН        
// #################################
// ##########################################################################################################
if (banlink_user_in_group) {
	$(document).ready(function(){
		var gid = banlink_user_in_group_id_group;

		document.body.innerHTML=document.body.innerHTML+'<iframe id="del_frame" name="del_frame" width="1" height="1"></iframe>';

		document.body.innerHTML=document.body.innerHTML+'<iframe id="del_frame" name="del_frame" width="1" height="1"></iframe>';


		re1 = /id([0-9]+)/;
		re2 = /profile\.php\?id=([0-9]+)/;

		inclub = (location.href.indexOf("club"+gid) != -1 || location.href.indexOf("gid="+gid) != -1);

		if (inclub) {
			ar = document.getElementsByTagName('a');
			for (i = 10; i < ar.length; i++) {
				a = ar[i];
				if(href = a.getAttribute('href')) {
					if(res = re1.exec(href)) {
						a.parentNode.innerHTML += "<a href='#' onclick=\"del_frame = document.getElementById('del_frame'); del_frame.src='groups.php?act=ban&id="+res[1]+"&gid="+gid+"'; this.innerHTML = '<b>[:::::Забанен:::::]</b>'; return false;\">[:::::Бан:::::]</a>";
					} else if(res = re2.exec(href)) {
						a.parentNode.innerHTML += "<a href='#' onclick=\"del_frame = document.getElementById('del_frame'); del_frame.src='groups.php?act=ban&id="+res[1]+"&gid="+gid+"'; this.innerHTML = '<b>[:::::Забанен:::::]</b>'; return false;\">[:::::Бан:::::]</a>";
					}
				}
			}
		}
	});
}

// ##########################################################################################################
// #################################
// #################################                    В своей группе над каждым участником пишет БАН        
// #################################
// ##########################################################################################################
if (look_banlist_in_open_group) {
	$(document).ready(function(){
		var mid = $('#mid').attr("value");
		$(".actionspro").html($(".actionspro").html()+'<li><a href="/groups.php?act=members&gid='+mid+'&op=-1" style="cursor: url(http://zongozara.narod.ru/11.png), auto;">Бан лист</a></li>');
	});
}

// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ###########################################------0.13------End------######################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################


// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ###############################################------0.11------###########################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################

// ##########################################################################################################
// #################################
// #################################                     Cчетчик аудио                               
// #################################
// ##########################################################################################################
if (count_audio) {
	$(document).ready(function(){
		//normal
		var elements_audioRow = $(".audioRow").get();
		var count_audioRow = elements_audioRow.length;

		//edit
		var elements_audioEditRow = $(".audioEditRow").get();
		var count_audioEditRow = elements_audioEditRow.length;

		elements_play_name_audioRow = $(".audioRow td div b");//normal
		elements_play_name_audioEditRow = $(".audioEditRow td b");//edit

		//normal
		var j = 1;
		for (var i = 0; i < count_audioRow; i++) {
			elements_play_name_audioRow[i].innerHTML = (j+". "+elements_play_name_audioRow[i].innerHTML);
			j++;
		}

		//edit
		var k = 1;
		for (var s = 0; s < count_audioEditRow; s++) {
			elements_play_name_audioEditRow[s].innerHTML = (k+". "+elements_play_name_audioEditRow[s].innerHTML);
			k++;
		}
	});
}

// ##########################################################################################################
// #################################
// #################################                     Ячейка для аудио при поиске                               
// #################################
// ##########################################################################################################
if (serch_audio_border) {
	$(document).ready(function(){
		$('#bigResult .audioRow').css({"background-color":"#f4f7f9","border":"1px solid #cccccc","-moz-border-radius":"15px","background-position":"0% 0%","margin":"24px 0px -3px 22px","display":"inline-block","z-index":"5"});
	});
}

// ##########################################################################################################
// #################################
// #################################                     Аудио регуляторы                               
// #################################
// ##########################################################################################################
if (regulator_audio) {
	$(document).ready(function(){
		$('.audioRow .playerClass').css({"position":"absolute","height":"14px","background":"#f4f7f9","width":"335px","padding":"0px 18px 2px 18px","margin":"1px 0 0 6px","border-right":"1px solid #cccccc","border-left":"1px solid #cccccc","border-bottom":"1px solid #cccccc","-moz-border-radius-bottomright":"20px","-moz-border-radius-bottomleft":"20px","z-index":"4"});
	});
}

// ##########################################################################################################
// #################################
// #################################                     Картинки поворота фото вправо и влево                               
// #################################
// ##########################################################################################################
if (rotate_img_foto) {
	$(document).ready(function(){
		$('a#rotateleft, a#rotateright').css({"margin-left":"3px"});
		$('a#rotateright').css({"background":"url(http://s43.radikal.ru/i099/0808/64/bf99b3d39172.png) no-repeat 7px center"});
		$('a#rotateleft').css({"background":"url(http://s48.radikal.ru/i119/0808/63/de0ba6836600.png) no-repeat 7px center"});
		$('a#rotateleft').hover(function(){$(this).css({"background-color":"#DAE1E8","background":"url(http://img91.imageshack.us/img91/5695/rotateleftanimationns9.gif) no-repeat 7px center"})},function(){$(this).css({"background":"url(http://s48.radikal.ru/i119/0808/63/de0ba6836600.png) no-repeat 7px center"})});
		$('a#rotateright').hover(function(){$(this).css({"background-color":"#DAE1E8","background":"url(http://img128.imageshack.us/img128/1421/rotaterightanimationss3.gif) no-repeat 7px center"})},function(){$(this).css({"background":"url(http://s43.radikal.ru/i099/0808/64/bf99b3d39172.png) no-repeat 7px center"})});
	});
}

// ##########################################################################################################
// #################################
// #################################                     Очистить комментарии с альбома                               
// #################################
// ##########################################################################################################
if (link_del_comm_album) {
	$(document).ready(function(){
		$('<a href="javascript: void(0);" style="float:right">Очистить комментарии</a>').click(deleteAll).prependTo('#wallpage div.nav');

		function deleteAll() {
			var elements = $('#wallpage div.actions a[href^="javascript:deleteComment"]');
			var count = elements.length;
	
			if (!confirm('Удалить '+elements.length+' сообщ.?'))
				return false;
	
			elements.each(function() {
				location.href = this.href;
			});
		};
	});
}

// ##########################################################################################################
// #################################
// #################################                     Видео и фото на стенке показываются всегда                               
// #################################
// ##########################################################################################################
if (video_foto_in_board) {
	$(document).ready(function(){
		$('.wallpost .iLink').css({"display":"none"});
		$('.wallpost .feedVideos, .wallpost .feedPhotos').css({"display":"block","margin":"-23px 0px 0px 25px"});
	});
}

// ##########################################################################################################
// #################################
// #################################                     Поле ввода сообщения в клеточку                               
// #################################
// ##########################################################################################################
if (textarea_lines) {
	$(document).ready(function(){
		$('textarea').css({"background-image":"url(http://s1.travian.ru/img/ru/msg/underline.gif)","font-size":"10pt"});
	});
}

// ##########################################################################################################
// #################################
// #################################                     Надпись онлайн мигает                               
// #################################
// ##########################################################################################################
if (online_blink) {
	$(document).ready(function(){
		$('#header b ').css({"text-decoration":"blink","font-size":"10pt","color":"#006699"});
	});
}

// ##########################################################################################################
// #################################
// #################################                     Автоматический запуск аудио                              
// #################################
// ##########################################################################################################
if (audio_auto_play) {
	$(document).ready(function(){
		var first = document.getElementsByClassName('playimg');
		if (first[0]) {
			setTimeout(first[0].getAttribute('onclick').substring(7), 0);
		}
	});
}

// ##########################################################################################################
// #################################
// #################################                     Выйти со всех групп                              
// #################################
// ##########################################################################################################
if (location.pathname == '/groups.php' && out_from_all_groups) {
	$(document).ready(function(){
		var elements_menu = $('.summary').html();
		$('.summary').html(elements_menu+'<span class="divider" style="font-weight:normal"> | </span><a href="javascript: void(0);" class="deleteAll" style="font-weight: normal">Покинуть все группы</a>');
		$('.deleteAll').click(function() {
			var elements = $('td.actions a[href^="javascript:processLeave"]');
			var count = elements.length;
	
			if (!confirm('Вы действительно хотите покинуть все группы?'))
				return false;
	
			elements.each(function() {
				location.href = this.href;
			});
		});
	});
}
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ###########################################------0.11------End------######################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################
// ##########################################################################################################


// ##########################################################################################################
// #################################
// #################################                     Невидимка                                   
// #################################
// ##########################################################################################################
if (inviz) {
		today = new Date();
		expire = new Date();
		expire.setTime(today.getTime()+3600000*24*365);
		expire = expire.toGMTString();

		insheder_h1 = document.getElementById('header').getElementsByTagName('h1')[0];
			if (getCookie("VKScriptInvis") == "y") {
				insheder_h1.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#696029">Невидимка [ <span><span style="color:lime">On</span><span style="color:#696029"> | </span><a href="#" onclick="document.cookie=\'VKScriptInvis=n;expires='+ expire + '\';window.location.reload();">Off</a><span style="color:#696029"> ]</span></b>';
			}
			else {
				insheder_h1.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#696029">Невидимка [ </span><a href="#" onclick="document.cookie=\'VKScriptInvis=y;expires='+ expire + '\';window.location.reload();">On</a><span style="color:#696029"> | </span><span style="color:red">Off</span><span style="color:#696029"> ]</span></b>';
			}
	Invis();
}

// ##########################################################################################################
// #################################
// #################################                     Меню                                   
// #################################
// ##########################################################################################################
if (new_menu) {
//Устанавливаем все сервисы вкл.(пока будет так, иначе меню вылетит)
xmlhttpservice = getXMLhttp();
xmlhttpservice.open('GET', '/settings.php?act=change_services&subm=1&news=1&audio=1&fave=1&matches=1&opinions=1&apps=1&questions=1&friendgroups=1&market=1', true);
xmlhttpservice.send(null);
	
	//наводим марафет
	jQuery("#pageBody").css({ "margin":"-2px 5px 0px 0px", "width":"635px"}); 
	jQuery("#pageHeader").css({ "width":"791px", "height":"43px", "position":"relative", "background-image":"url(http://www.vkkoss.comze.com/image/xhead2009.gif)", "background-repeat":"no-repeat", "background-position":"left top", "background-color":"#32608A"}); 
	
	jQuery("#sideBar").css({
		"width":"149px",
		"margin":"0px 0px 0 0px"
	});


	//обработка кликов 
	$(document).ready(function(){
		$(".super_menu_btn-slide").toggle(function(){
			$(this).parent().parent().find(".super_menu_panel").animate({"width": "-=140px",opacity: "hide"}, "slow");
			$(this).toggleClass("super_menu_active"); return false;			

		},function(){
			$(this).parent().parent().find(".super_menu_panel").animate({"width": "+=140px"}, "slow");
			$(this).toggleClass("super_menu_active"); return false;			
		});	
	
		var h = $(".super_menu_panel2").css("height");
		$(".super_menu_manu_li").hover(function(){
			$(this).find(".super_menu_panel2").css("height", h);
			$(this).find(".super_menu_panel2").slideDown("slow");
		},function(){	
			$(this).find(".super_menu_panel2").slideUp("slow");
			$(this).find(".super_menu_panel2").css("height",h);
		});	
		
		var h_news = $(".members_news_visible_no_news").css("height");
		$(".members_news_visible_a").toggle(function(){
			$(".members_news_visible_no_news").css("height", h_news);
			$(".members_news_visible_no_news").slideDown("slow");
		},function(){	
			$(".members_news_visible_no_news").slideUp("slow");
			$(".members_news_visible_no_news").css("height",h_news);
		});	
	});

//добавляем свои стили
cssoption = document.createElement("style");
cssoption.setAttribute("type", "text/css");
var newStyle = document.createTextNode('.left{     float:left;  	width:164px; }'+
'.super_menu_right{float:right; 	width:300px; }'+
'.super_menu_panel{  padding: 1px 3px 4px; border-left: solid 1px #D5DDE6; border-bottom: solid 1px #D5DDE6; width:140px;    background: #F0FAF3; }'+
'.super_menu_right .super_menu_slide { margin: 0; 	padding: 0; 	background: url(http://www.vkkoss.comze.com/image/btn-slide-right.gif) no-repeat left center; 	width:38px; 	float:right; } '+
'.super_menu_right .super_menu_panel { 	float:right; } '+
'.super_menu_right .super_menu_btn-slide { background: url(http://www.vkkoss.comze.com/image/white-arrow-hor.gif) no-repeat -45px 20px; 	text-indent: -9000%; 	display: block; 	height: 150px; 	width:38px; }  '+
'.super_menu_right .super_menu_active { 	background-position: 15px 20px; }  '+
'.super_menu_panel ul { list-style:none; border-bottom:0px solid #333;     padding:1px 2px;     margin:0; }  '+
'.super_menu_menu { list-style: none; } '+
'.super_menu_menu li { padding: 0; 	float: left; 	position: relative; 	text-align: left; } '+
'.super_menu_main_menu { padding: 5px 0px; 	display: block; width: 140px; background: url(http://www.vkkoss.comze.com/image/button.gif) no-repeat center center; } '+
'.super_menu_panel ul li a:HOVER{ color: #0000CC; } '+
'.super_menu_panel ul li{margin: 0; padding: 0; display: inline;}'+
'.super_menu_panel2 { background: #F0FAF3;	display: none;}'+
'.super_menu_panel2 a {display:block;padding:5px 10px; height:100%; width:100px;  background: #D5DDE6;}'+
'.super_menu_slide2 { margin: 0; padding: 0; border-top: solid 1px #422410; }'+
'.members_content { padding:3px; margin: 0pt auto; width: 100%; color: #000; border: solid 1px #D5DDE6; background-color: #F0FAF3; }'+
'.members_content p{ margin:1px 5px; overflow: hidden; word-wrap: break-word; color: #222; }'+
'.members_content h4 { text-align: center; font-size: 12px; border-bottom: solid 1px #DAE1E8; padding: 0px 0px 3px; margin: 0px 5px 3px; }'+
'.members_content h3 { text-align: center; margin: 4px 5px 3px; color: black; font-weight: bold; }'+
'.members_news_visible_no_news { background: #F0FAF3;	display: none;}');
cssoption.appendChild(newStyle);
document.getElementsByTagName("head")[0].appendChild(cssoption);

//Парсим меню и читаем названия меню
sidebar = document.getElementById("sideBar");
var resultsElement = document.getElementById("nav").getElementsByTagName('a');
var a = new Array();
for (i=0;i<=resultsElement.length-1;i++) {
	a[i] = [resultsElement[i].innerHTML];
}

//контент ссылки новостей или држ.
if ($(".leftAd")) {
	//обработка
	var members_title = $(".leftAd h4").html();
	var members_title2 = $(".leftAd h3").html();
	var members_news = $(".leftAd div").html();

	if (!members_title) {members_title = ""}
	if (!members_title2) {members_title2 = ""}
	if (!members_news) {members_news = ""}

	var members_content = '<ul><li><br><div align="center" class="members_content"><h4><a href="#" class="members_news_visible_a">'+members_title+'</a></h4><div class="members_news_visible_no_news" align="center"><h3>'+members_title2+'</h3<p><div>'+members_news+'</div></p></div></div></li></ul>';
}
else {
	var members_content_content = '<div class="members_news_visible_no_news" align="center"><h3>Новостей нету</h3></div>';
	var members_news_visible = '<ul><li><br><div align="center" id="members_news_visible" class="members_content"><h4><a href="#" class="members_news_visible_a">Новости</a></h4>'+members_content_content+'</div></li></ul>';
	var members_content = members_news_visible;
}

//очищаем меню...
sidebar.innerHTML = "";

//Лепим меню
super_menu_right = document.createElement('div');
super_menu_right.id = "super_menu_right";
super_menu_right.className = "super_menu_right";
document.getElementById("sideBar").appendChild(super_menu_right);
super_menu_panel = document.createElement('div');
super_menu_panel.id = "super_menu_panel";
super_menu_panel.className = "super_menu_panel";
super_menu_panel.innerHTML = '<ul class="super_menu_menu">'+
'<li>'+
'<a href="/index.php" class="super_menu_main_menu">&nbsp;&nbsp;<img src="http://www.vkkoss.comze.com/image/home.png.gif">&nbsp;&nbsp;&nbsp;'+a[0]+'</a>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/friend.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img" src="http://vkontakte.ru/images/icons/person_icon.gif">&nbsp;&nbsp;&nbsp;'+a[2]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/friend.php?act=online" style="border-bottom: 3px solid white;" title="Друзья онлайн">онлайн</A>'+
'<A href="/news.php?act=friends&custom=1" style="border-bottom: 3px solid white;" title="Обновления">обновления</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/photos.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img2" src="http://vkontakte.ru/images/icons/add_photo_icon.gif">&nbsp;&nbsp;&nbsp;'+a[3]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/photos.php?act=comments" style="border-bottom: 3px solid white;" title="Комментарии">комментарии</A>'+
'<A href="/photos.php?act=albums" style="border-bottom: 3px solid white;" title="Обзор фотографий">обзор</A>'+
'<A href="/photos.php?act=new" style="border-bottom: 3px solid white;" title="Добавить альбом">добавить</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/video.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img3" src="http://vkontakte.ru/images/icons/movie_icon.gif">&nbsp;&nbsp;&nbsp;'+a[4]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/video.php?act=new" style="border-bottom: 3px solid white;" title="Добавить видеозапись">добавить</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/audio.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img4" src="http://vkontakte.ru/images/icons/audio_icon.gif">&nbsp;&nbsp;&nbsp;'+a[5]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/audio.php?act=edit" style="border-bottom: 3px solid white;" title="Редактировать аудиозаписи">изменить</A>'+
'<A href="/audio.php?act=new" style="border-bottom: 3px solid white;" title="Добавить аудиозапись">добавить</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/mail.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img5" src="http://www.vkkoss.comze.com/image/messages_icon.png">&nbsp;&nbsp;&nbsp;'+a[6]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/mail.php?out=1" style="border-bottom: 3px solid white;" title="Исходящие сообщения">исходящие</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/notes.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img6" src="http://vkontakte.ru/images/icons/add_item_icon.gif">&nbsp;&nbsp;&nbsp;'+a[7]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/notes.php?act=comms" style="border-bottom: 3px solid white;" title="Комментарии">комментарии</A>'+
'<A href="/notes.php?act=friends" style="border-bottom: 3px solid white;" title="Заметки друзей">друзей</A>'+
'<A href="/notes.php?act=fave" style="border-bottom: 3px solid white;" title="Избранные заметки">избранные</A>'+
'<A href="/notes.php?act=new" style="border-bottom: 3px solid white;" title="Добавить заметку">добавить</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/groups.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img7" src="http://vkontakte.ru/images/icons/group_icon.gif">&nbsp;&nbsp;&nbsp;'+a[8]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/groups.php?act=groups&custop=1" style="border-bottom: 3px solid white;" title="Новости групп">новости</A>'+
'<A href="/browse.php" style="border-bottom: 3px solid white;" title="Поиск групп">поиск</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/events.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img8" src="http://vkontakte.ru/images/icons/event_icon.gif">&nbsp;&nbsp;&nbsp;'+a[9]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/events.php?act=list&past=1" style="border-bottom: 3px solid white;" title="Прошедшие встречи">прошедшие</A>'+
'<A href="/events.php?act=calendar" style="border-bottom: 3px solid white;" title="Календарь">календарь</A>'+
'<A href="/events.php?act=create" style="border-bottom: 3px solid white;" title="Создать событие">создать</A>'+
'<A href="/ebrowse.php" style="border-bottom: 3px solid white;" title="Поиск события">поиск</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/news.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img9" src="http://vkontakte.ru/images/icons/plus_icon.gif">&nbsp;&nbsp;&nbsp;'+a[10]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/news.php?act=groups" style="border-bottom: 3px solid white;" title="Новости групп">группы</A>'+
'<A href="/news.php?act=bookmarks" style="border-bottom: 3px solid white;" title="Комментарии">комментарии</A>'+
'</div>'+
'</li>'+
'<li>'+
'<a href="/fave.php" class="super_menu_main_menu">&nbsp;&nbsp;<img src="http://vkontakte.ru/images/icons/record_icon.gif">&nbsp;&nbsp;&nbsp;'+a[11]+'</a>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/settings.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img10" src="http://www.vkkoss.comze.com/image/settings.png">&nbsp;&nbsp;&nbsp;'+a[12]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/settings.php?act=privacy" style="border-bottom: 3px solid white;" title="Настройки приватности">приватность</A>'+
'<A href="/settings.php?act=notify" style="border-bottom: 3px solid white;" title="Настройка оповещений">оповещения</A>'+
'<A href="/settings.php?act=blacklist" style="border-bottom: 3px solid white;" title="Настройка черного списка">черный список</A>'+
'<A href="/settings.php?act=updates" style="border-bottom: 3px solid white;" title="Настройка обновлений">обновления</A>'+
'<A href="/settings.php?act=vkScripts" style="border-bottom: 3px solid white;" title="Настройка скрипта">VKScripts</A>'+
'</div>'+
'<hr width="70%">'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/matches.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img11" src="http://vkontakte.ru/images/icons/post_icon.gif">&nbsp;&nbsp;&nbsp;'+a[13]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/matches.php?act=search" style="border-bottom: 3px solid white;" title="Поиск предложений">поиск</A>'+
'<A href="/matches.php?act=sent" style="border-bottom: 3px solid white;" title="Предложения на которые я согласился">соглашенные</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/opinions.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img12" src="http://www.vkkoss.comze.com/image/opinions_icon.png">&nbsp;&nbsp;&nbsp;'+a[14]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/opinions.php?act=outbox" style="border-top: 3px solid white;border-bottom: 3px solid white;" title="Мои мнения">мои</A>'+
'<A href="/opinions.php?act=all" style="border-bottom: 3px solid white;" title="Написать мнение другу">друзей</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/apps.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img12" src="http://www.vkkoss.comze.com/image/apps.png">&nbsp;&nbsp;&nbsp;'+a[15]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/apps.php?act=all" style="border-bottom: 3px solid white;" title="Все приложения">все</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/questions.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img13" src="http://vkontakte.ru/images/icons/q_icon.gif">&nbsp;&nbsp;&nbsp;'+a[16]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/questions.php?act=add_questions" style="border-bottom: 3px solid white;" title="Добавить вопрос">добавить</A>'+
'<A href="/questions.php?act=all" style="border-bottom: 3px solid white;" title="Поиск вопросов">поиск</A>'+
'<A href="/questions.php?act=friends" style="border-bottom: 3px solid white;" title="Вопросы друзей">друзей</A>'+
'<A href="/questions.php?act=answered" style="border-bottom: 3px solid white;" title="Мои ответы">ответы</A>'+
'</div>'+
'</li>'+
'<li class="super_menu_manu_li">'+
'<a href="/market.php" class="super_menu_main_menu">&nbsp;&nbsp;<img id="super_menu_main_menu_img14" src="http://www.vkkoss.comze.com/image/market.png">&nbsp;&nbsp;&nbsp;'+a[17]+'</a>'+
'<div class="super_menu_panel2" align="center">'+
'<A href="/photos.php?show=my" style="border-bottom: 3px solid white;" title="Мои объявления">мои</A>'+
'<A href="/photos.php?show=friends" style="border-bottom: 3px solid white;" title="Объявления друзей">друзей</A>'+
'</div>'+
'</li>'+
'</ul>'+members_content;
document.getElementById("super_menu_right").appendChild(super_menu_panel);
document.getElementById("super_menu_right").innerHTML += '<p class="super_menu_slide"><a href="#" class="super_menu_btn-slide"></a></p>';

}

// ##########################################################################################################
// #################################
// #################################                     Скачивание приложений                               
// #################################
// ##########################################################################################################
if (app_download) {
	if (document.getElementById('searchResults') && !location.href.split('search.php')[1] && !location.href.split('browse.php')[1] && !location.href.split('people.php')[1]) {
		vkscripts_IDAppsList_get();
	}
}
if (app_download_prof) {
	if (document.getElementById('apps') && !location.href.split('search.php')[1] && !location.href.split('browse.php')[1] && !location.href.split('people.php')[1]) {
		vkscripts_IDAppsProf_get();
	}
}

// ##########################################################################################################
// #################################
// #################################                     История статусов                               
// #################################
// ##########################################################################################################
if (activity_history) {
	if (document.getElementById("profile_activity")) {
		s = document.getElementById("profile_activity");
		a = document.createElement('a');
		a.innerHTML= "<br>История";
		a.href='javascript: getActivityHistory('+getIDFromURI()+');';
		s.appendChild(a);
	}
}

// ##########################################################################################################
// #################################
// #################################                     Рейтин                               
// #################################
// ##########################################################################################################
if (rate) {
	if (document.getElementById('rate')) {
		var rate_id = document.getElementById('rate');
		rate_id.parentNode.removeChild(rate_id);
	}
}

// ##########################################################################################################
// #################################
// #################################                     Рейтин(text)                               
// #################################
// ##########################################################################################################
if (ratetext) {
	if (document.getElementById('rate')) {
		document.getElementById('rate').innerHTML = '<br><div id="rateLeft" align="center" style="width:100%"></div>';
		var rate_a = $('a');
		for (rate_a_count = 0; rate_a_count < rate_a.length-1; rate_a_count++) {
			if ($(rate_a[rate_a_count]).attr("href") == 'rate.php'){
				$(rate_a[rate_a_count]).attr("href","#");
				$(rate_a[rate_a_count]).attr("class","rate_a_class");
			}
		}
		var rate_id = document.getElementById('rateLeft');
		if (getCookie("vkscripts_rate_text")) {
			rate_id.innerHTML = getCookie("vkscripts_rate_text");
		}
		else {
			rate_id.innerHTML = "Впишите сюда что угодно";
		}
		$("<div width='100%' class='rate_text_box' style=\"display:none\"></div><br>").insertAfter(".rate_a_class");
		var rate_textss = '<input class="rate_input" type="text" width="100%" value="">';
		$(".rate_a_class").toggle(function(){ $(".rate_text_box").show(); $(".rate_text_box").html(rate_textss); if (getCookie("vkscripts_rate_text")){ var rate_text_cook = getCookie("vkscripts_rate_text"); $('.rate_input').attr("value",rate_text_cook); $("#rateLeft").html("Сохранить");}},function(){setCookie("vkscripts_rate_text",$('.rate_input').attr("value"),350); $("#rateLeft").html($('.rate_input').attr("value")); $(".rate_text_box").css("display","none")});
	}
}

// ##########################################################################################################
// #################################
// #################################                     Cообщения(новое+оформление)                               
// #################################
// ##########################################################################################################
if (mess_bgcolor) {
		GM_addStyle('.mailbox table tr.newRow {background-image:url(http://www.vkkoss.comze.com/image/mess.jpg) !important;}');
}

// ##########################################################################################################
// #################################
// #################################                     Отметить всех на фото                               
// #################################
// ##########################################################################################################
if (check_all_in_photo) {
	if(document.getElementById('photoactions')) {
		document.getElementById('photoactions').innerHTML += '<a href="#" class="check_all_in_photo_click">Отметить всех</a>(Время ожидания составляет до 10 секунд.)';
		ajaxHistory.init();
	}
}
$(".check_all_in_photo_click").click(check_all_in_photo_run);
function check_all_in_photo_run(){ function getPhotoInfo(){if(res = /([0-9\-]+)_(\d+)/.exec(location.href))return {'mid': res[1], 'pid': res[2]};else return {'mid': 0, 'pid': 0};}p_mark = function(i){request_uri = '/photos.php?act=put&pid='+mid+'_'+pid+'&id='+mid+'&oid=0&subject='+window.friends[i].id+'&name='+encodeURI(window.friends[i].name)+'&add=1&x=0&y=0&x2=100&y2=100';img = new Image();img.src = request_uri;timerID = setTimeout(p_mark(i+1), 500);};p_markall = function(){if(!confirm('Вы уверенны что хотети отметить всех друзей?')) return; ajax = new Ajax(function(a,r){eval(r);window.friends = fr; p_mark(0);}, function(a,r){alert('Request problem. Try again');});ajax.get('/photos.php?act=get');};if(!(location.href.match(/vkontakte.ru/) && location.href.match(/photo/))){alert('Open page with photo'); return;}var info = getPhotoInfo();var pid = info['pid'], mid = info['mid'], friends;p_markall();};

// ##########################################################################################################
// #################################
// #################################                     Предложения в столбик                               
// #################################
// ##########################################################################################################
if (location.pathname == '/matches.php' && matches_in_stolbik) {
	if(document.getElementById('question')) {
		var vkscripts_questionText = document.getElementById('questionText').value;
		$('#question a').attr("href","javascript:");
		$('#question a').attr("class","vkscripts_question_link");
		$('.pollEdit a').attr("class","vkscripts_question_link");
		$('.pollEdit a').attr("href","javascript:");
		$('#qAction a').attr("href","javascript: qClose();");
		var vkscripts_hash = $('.ncc a').attr("href");
		vkscripts_hash = vkscripts_hash.split("('")[1].split("')")[0];
		$('.ncc a').attr("href","#");
		$('.ncc a').attr("class","vkscripts_save");

		$('.vkscripts_question_link').click(function(){
			document.getElementById('qButtons').style.display = "";
			$('#question').html("<textarea id='questionEdited' style='width: 223px;height:100px'>"+vkscripts_questionText+"</textarea>");
			$('.vkscripts_save').click(function(){
				var ajax = new Ajax(); 
				ajax.onDone = function(ajaxObj,responseText) {
					document.getElementById('progr2').style.display = 'none';
					document.getElementById('qButtons').style.display = "none";
				};
				document.getElementById('progr2').style.display = '';
				document.getElementById('questionText').value = document.getElementById('questionEdited').value;
				ajax.post('/matches.php', {'act': 'a_save', 'question': document.getElementById('questionEdited').value, 'hash': ''+vkscripts_hash+''});
			});
		});
	}
}

// ##########################################################################################################
// #################################
// #################################                     Картинка на стенку                               
// #################################
// ##########################################################################################################
//if (grafiti) {
//	if (document.getElementById("moreWall") != null) {
//		var elements = document.getElementById("moreWall");
//		elements.innerHTML += '<a class="wallFunc" href="javascript:open(\'http://vkontakte.ru/swf/Graffiti.swf\');">Большое графити</a>';
//	}
//}

// ##########################################################################################################
// #################################
// #################################                     Прикрепленное меню                               
// #################################
// ##########################################################################################################
if (menu_sideBar_fixed) {
	$("#sideBar").css({"position":"fixed"});  
}

// ##########################################################################################################
// #################################
// #################################                     Он-лайн                                   
// #################################
// ##########################################################################################################
if (friendsonline) {
	friends_online();
}

// ##########################################################################################################
// #################################
// #################################                     Статус                                   
// #################################
// ##########################################################################################################
if (main_status) {
	if (document.getElementById("activity_editor") != null) {
		link_main_status = document.getElementById("activity_editor").getElementsByTagName('div')[1];
		link_main_status.innerHTML = '<textarea rows="10" id="edit_activity_text" name="edit_activity_text" onblur="return activity_editor.blur();" ></textarea><a id="edit_activity_toggle" href="#" onmousedown="return activity_editor.toggle_menu(event);" onclick="return false;">&nbsp;</a>';
	}
}

// ##########################################################################################################
// #################################
// #################################                     Часы + Календарик                                   
// #################################
// ##########################################################################################################
if (clock_calendar) {
	vkClock();
	addCalendar();
}


// ##########################################################################################################
// #################################
// #################################                     Друзья                                   
// #################################
// ########################################################################################################## 
if (location.pathname == '/friend.php' && fiends) {
	//ф-я получения друзей
	function friendsrun () {
	jQuery(document).ready(function(){
		xmlhttp = getXMLhttp();
		xmlhttp.open('GET', '/friendJS.php', true);
		xmlhttp.onreadystatechange = checkUsersXML;
		xmlhttp.send(null);

		function checkUsersXML() {
			if (xmlhttp.readyState == 4) {
				checkUsers(xmlhttp);
			}
		}

		function checkUsers(responseDetails) {
			if (responseDetails.status == 200) {
				var reguserinfo = new RegExp(/\[([0-9]*),\s\{f:\'([^\']*)\', l:\'([^\']*)\'\},/gi);
				var counterusers = new RegExp(/\[([0-9]*),/gi);
				var res;
				var i=0;
				var arr = new Array();
				while(res = reguserinfo.exec(responseDetails.responseText)) {
					if (document.getElementById("friendCont"+res[1])) {document.getElementById("friendCont"+res[1]).innerHTML += "<center>| " + getLinksForDeleted(res[1]).join(" | ") + " |<br>| "+getLinksForNotFriend_dop(res[1]).join(" | ")+" |</center>";}
					if (document.getElementById("friendName_"+res[1])) {document.getElementById("friendName_"+res[1]).innerHTML += "<center>| " + getLinksForDeleted(res[1]).join(" | ") + " |<br>| "+getLinksForNotFriend_dop(res[1]).join(" | ")+" |</center>";}
					//инициализируем ф-ю find_user_updates.
					arr[i] = res[1];
					i++;
				}
				//find_user_updates_friends(arr);
			}
		}
	});
	}

	friendsrun();
}

// ##########################################################################################################
// #################################
// #################################                     Работа с бан листом. Администратор группы
// #################################
// ########################################################################################################## 
if ((/groups(.*)\?act=banned&gid=(\d+)/.exec(window.location)) && admingroups_banlist) {
	var groupid = getIDFromURIgroup();//запоминаем ID групы

	//Запускаем таймер слежения
	start_session_admin_ban();

	InputLinkCode("Нажмите здесь для массового бана","location.href='groups.php?act=banned&gid="+getIDFromURIgroup()+"&admin=ban'");

	InputLinkSaveBan("Нажмите здесь для создания бан листа","location.href='groups.php?act=banned&gid="+getIDFromURIgroup()+"&admin=saveban'");

	if (GET['admin'] === 'ban') {
		InputSelfCode();
	}

	if (GET['admin'] === 'saveban') {
		InputSelfSaveCode();
	}


}

// Широкий контакт
if (widescreen) {
	var inc = 400;
	vkontakte_widescreen_mod(inc);
}

// Удаляем рекламу
if (removeBanners) {

	/*
	 * Подмена ф-ии загрузчика рекламы.
	 */
	if (typeof(unsafeWindow.BannerLoader) != 'undefined')
		unsafeWindow.BannerLoader.init = function(id) {};
	
	
	function hideSomeElement(id) {
		if (document.getElementById(id)) {
			var elem = document.getElementById(id);
			elem.style.display = 'none';	
			elem.style.visibility = 'hidden';
		}
	}
	
	
	hideSomeElement('banner1');
	hideSomeElement('banner2');
}

if (newMessagesCount > 0 && location.pathname != '/mail.php') {
	newMessageHandler(newMessagesCount);
	
	var count_new_message_timer = 0;
	var orig_title = document.title;

	$(document).ready(function(){
		var timer_messages = setTimeout(function(){new_messsage_title()}, 1000);
	
		function new_messsage_title() {
			if (count_new_message_timer !== 5) {
				var new_title = 'У Вас новое сообщение...';
				document.title = new_title;
				count_new_message_timer++;
				var timer_messages = setTimeout(function(){new_messsage_title2()}, 5000);
			}
			else {
				clearTimeout(timer_messages);
			}
		}

		function new_messsage_title2() {
			document.title = orig_title;
			var timer_messages = setTimeout(function(){new_messsage_title()}, 5000);
		}
	});
}
GM_setValue('messagesCount',newMessagesCount);

// Исправление ссылок на прямые
if (directLinks) {
	var elements = document.getElementsByTagName("a");
	var reg = new RegExp(/http:\/\/vkontakte\.ru\/away\.php\?to=([^&]+)/);
	for (i=0;i<=elements.length-1;i++) { 
			if (reg.test(elements[i].getAttribute("href"))) {
				var link = decodeURIComponent(elements[i].getAttribute("href").match(reg)[1]);
				elements[i].setAttribute("href",link);
			}
	}
}

// Меню справа
if (rightMenu && !widescreen) {
	var sideBar = document.getElementById("sideBar");
	var pageBody = document.getElementById("pageBody");
	
	pageBody.setAttribute('style','float: left; margin-left: 17px; margin-right: 0px;');
	sideBar.setAttribute('style','float: right; margin: 5px 20px 0px 4px;');
}
// Выравнивание меню справа
if (menuRightAlignment) {
	document.getElementById("sideBar").align='left';
}

// Предупреждение при переходе со страницы во время проигрывания аудио
if (comfirmWhenPlaying && document.getElementsByTagName('body').length) {
	document.getElementsByTagName('body')[0].setAttribute('onbeforeunload','function playingNow() {var links = document.getElementsByTagName("link");for(i in links){var ico = links[i];if (ico && ico.parentNode && (ico.rel == "shortcut icon")) {return (ico.getAttribute("href") == "/images/playicon.ico");}}} if (playingNow()) {return false};');
}

// Открывать поле отправки сообщения
if (showReply && document.getElementById("r") != null) {
	document.getElementById("r").style.display="block";
	document.getElementById("br").style.display="block";
}

// Заголовок окна
if (invertTitle) {
	document.title = document.title.split(' | ').reverse().join(' | ');
}

// Добавление пункта Комментарии
if (newComments) {
	var commLink = "<li><a id=\"comments_menuitem\" class=\"more\" href=\"news.php?act=bookmarks\">Комментарии</a></li>";
	var menuBar = document.getElementById("nav");
	if (menuBar != null) {
		if (menuBar.innerHTML.indexOf("<ol id=\"nav\" style=\"margin-bottom: 0px;\">")>-1) {	// есть хотя-бы один дополнительный пункт
			menuBar.innerHTML = menuBar.innerHTML.replace("<ol id=\"nav\" style=\"margin-bottom: 0px;\">","<ol id=\"nav\" style=\"margin-bottom: 0px;\">"+commLink);
		} else {
			menuBar.innerHTML += "<div class=\"moreDiv\"><ol id=\"nav\" style=\"margin-bottom: 0px;\">"+commLink+"</ol></div>";
		}
	}
}


// Предотвратить закрытие граффити
// ### /graffiti.php?act=draw
if (location.pathname == '/graffiti.php' && GET['act'] == 'draw' && confirmGraffiti) {
	document.getElementsByTagName('body')[0].setAttribute('onbeforeunload','return false');
}

// Удалить себя с фотографии

if (location.pathname == '/photos.php' && GET['act'] == 'show' && removeMe) {
	if (document.getElementById('phototags') !== null) {
		var element = document.getElementById('phototags').innerHTML;
		var reg = new RegExp("<a href=\"photos\\.php\\?act=user&amp;id="+currentUserId+"\">[^<]+<\/a> \\| <a href=\"#\" onclick=\"(return removeTag\\([0-9]+, '[0-9_]+'\\))");
		if (reg.test(element)) {
			var match = element.match(reg);
			var msg = document.getElementById('msg');
			if (msg != null)
				msg.innerHTML = msg.innerHTML.replace(/, ([^]+)\.$/,", <a href='#' onClick=\"document.getElementById('deleteMeLink').style.display='none';document.getElementById('msg').style.display='none';"+match[1]+"\">$1</a>.");			
			document.getElementById('photoactions').innerHTML += getLinkForDeleteMe(match[1],'Удалить себя')		
		}
	}
}

// Удалить себя с видео
if (/\/video[0-9]/.test(location.pathname) && removeMe) {
	var element = document.getElementById('videotags').innerHTML;
	var reg = new RegExp("<a href=\"profile\\.php\\?id="+currentUserId+"\">[^<]+<\/a> \\(<a href=\"#\" onclick=\"(return removeTag\\([0-9]+\\))");
	if (reg.test(element)) {
		var match = element.match(reg);
		var msg = document.getElementById('message');
		if (msg != null)
			msg.innerHTML = msg.innerHTML.replace(/, ([^]+)\.$/,", <a href='#' onClick=\"document.getElementById('deleteMeLink').style.display='none';document.getElementById('message').style.display='none';"+match[1]+"\">$1</a>.");
		
		document.getElementById('videoactions').innerHTML += getLinkForDeleteMe(match[1],'Удалить себя')
	}
}

function getLinkForDeleteMe(act,text) {
	return "<a id='deleteMeLink' href='#' onClick=\"document.getElementById('deleteMeLink').style.display='none';document.getElementById('msg').style.display='none';document.getElementById('msg').style.display='none';"+act+"\">"+text+"</a>";
}


var useGMFunction = false;		// не использовать по возможности фунции GreaseMonkey
// ##########################################################################################################
// #################################
// #################################                     Проверка новых комментариев
// #################################
// ########################################################################################################## 
var lastChkTime = parseInt(GM_getValue('commentsChkTime',0));
if (newComments && checkNewComments) {
	if (location.pathname == '/news.php' && GET['act'] == 'bookmarks') {
		var comments = parseComments(document.body.innerHTML);
		GM_setValue('comments',serializeArr(comments));
	} else {
		if (useGMFunction) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://vkontakte.ru/news.php?act=bookmarks',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
        			'Cookie': document.cookie,
					},
    			onload: checkComments
			});
		} else {
			xmlhttp = getXMLhttp();
			xmlhttp.open('GET', '/news.php?act=bookmarks', true);
			xmlhttp.onreadystatechange = checkCommentsXML;
			xmlhttp.send(null);
		}
	}
}


function checkCommentsXML() {
	if (xmlhttp.readyState == 4) {
		checkComments(xmlhttp);
	}
}

// Проверка наличия новых комментариев
function checkComments(responseDetails) {
	if (responseDetails.status == 200) {
	    	var actualComm = parseComments(responseDetails.responseText.split("<body>")[1].split("</body>")[0]);
	    	var oldComm = unserializeArr(GM_getValue('comments',''));
	    	
	    	var newCount = countArrDiffs(oldComm,actualComm);
	    	
	    	if (newCount > 0) {
	    		document.getElementById("comments_menuitem").innerHTML += " (<b>"+newCount+"</b>)";
	    	}
   	}
}
// Поиск новых записей в массиве новых коментариев по сравнению с массивом просмотренных. Во-как!
// по сути дела вычитание массивов и возврат кол-ва элементов
// ( actualComm - oldComm ).length
function countArrDiffs(oldComm,actualComm) {
	var count = 0;	// кол-во новых
	var foundedOld = 0;	// кол-во уже просмотренных из актуальных
	var j = 0;
	oldComm.sort();
	actualComm.sort();
	
	for(i=0;i<=oldComm.length-1;i++) {
		for(j=0;j<=actualComm.length-1;j++) {
			if (oldComm[i] == actualComm[j]) {
				foundedOld++;
				break;
			}
		}
	}
	count = actualComm.length - foundedOld;	// кол-во новых = всего - просмотренных
	return count;
}


// Распарсивание странички комментов
// Возвращает массив (id автора,время)
function parseComments(content) {
	var reg = new RegExp(/<td id=\"startQuote\">\s+\n\s+<div>(?:[^<>]+(?:<br>|<br \/>)*[^<>]+)*<span id=\"endQuote\">&nbsp;<\/span><\/div>(?:<br>|<br \/>)<small>\(<a href=[\"\']id([0-9]+)[\"\']>[^<>]+<\/a> <b>([^<>]+)<\/b>\)<\/small>/g);
	var res;
	var arr = new Array();
	var i = 0;
	
	while(res = reg.exec(content)) {
		if (res[1] != currentUserId) {
			arr[i] = res[1] + "/" + res[2];
			i++;
		}
	}
	return arr;
}

// ##########################################################################################################
// #################################
// #################################                     Пригласить всех
// #################################
// ##########################################################################################################    
// ### /groups.php
if ((location.pathname == '/groups.php' || location.pathname == '/events.php') && inviteAll) {
	var elements = document.getElementsByTagName('div');
	var reg = new RegExp(/return addToInvite\(([0-9]+)\)/);
	var element;
	for (i=0;i<=elements.length-1;i++) {
		if (elements[i].className == 'iPanel') 
			element = elements[i];
	}
	
	if (element != undefined) {
		elements = element.getElementsByTagName("div");
		var action = '';
		var id;
		for (i=0;i<=elements.length-1;i++) {
			id = elements[i].getAttribute('onclick').match(reg)[1];
			action += 'if(document.getElementById("toinvite'+id+'") != null){delToInvite('+id+')};addToInvite('+id+');';
		}
		element.getElementsByTagName("tbody")[0].innerHTML = "<tr style=''><td><div class='friendRow' onclick='"+action+"'><b>Пригласить всех</b></div></td></tr>" + element.getElementsByTagName("tbody")[0].innerHTML;
	}
	
}

// ###   /mail.php
// ##########################################################################################################
// #################################
// #################################                     Cмайлы
// #################################
// ##########################################################################################################    
if (smile_in_all) {
	smile_in_all_func();
}

// ###   /mail.php
// ##########################################################################################################
// #################################
// #################################                     Cмайлы при написании сообщения
// #################################
// ##########################################################################################################    
if ((/mail(.*)\?act=show&id=(\d+)/.exec(window.location)) && smile_in_message) {
	if (document.getElementById("postMessage") != null) {
		smile_in_all_func();
		//вставка в код наш стиль+скрипт

		var scriptTagStyle = document.createElement("style");
		scriptTagStyle.setAttribute("type", "text/css");
		var newStyle = document.createTextNode('\n<!--\ntable.stylesmileform {\width:410px; margin: 5px 12px;}\n-->\n');
		scriptTagStyle.appendChild(newStyle);
		document.getElementsByTagName("head")[0].appendChild(scriptTagStyle);

		//вставить смайл
		var scriptTagCode = document.createElement("script");
		scriptTagCode.setAttribute("type", "text/javascript");
		scriptTagCode.text = 'function emoticon(code) {'+
			'if (code != "") {'+
				'var txtarea = document.getElementById("reply_field");'+
				'if (code == 1) {code=":-*"}'+
				'if (code == 2) {code=":angel:"}'+
				'if (code == 3) {code=":applause:"}'+
				'if (code == 4) {code=":barbarian:"}'+
				'if (code == 5) {code=":bash:"}'+
				'if (code == 6) {code=":book:"}'+
				'if (code == 7) {code=":cranky:"}'+
				'if (code == 8) {code="^_^"}'+
				'if (code == 9) {code=":dollar:"}'+
				'if (code == 10) {code=":evil:"}'+
				'if (code == 11) {code=":eye:"}'+
				'if (code == 12) {code=":faint:"}'+
				'if (code == 13) {code=":flower:"}'+
				'if (code == 14) {code=":fool:"}'+
				'if (code == 15) {code=":good:"}'+
				'if (code == 16) {code=":hands:"}'+
				'if (code == 17) {code=":heart:"}'+
				'if (code == 18) {code=":hello:"}'+
				'if (code == 19) {code=":hippy:"}'+
				'if (code == 20) {code=":holiday:"}'+
				'if (code == 21) {code=":icecream:"}'+
				'if (code == 22) {code=":lol:"}'+
				'if (code == 23) {code=":love:"}'+
				'if (code == 24) {code=":lumped:"}'+
				'if (code == 25) {code=":moonw:"}'+
				'if (code == 26) {code=":nocomp:"}'+
				'if (code == 27) {code=":nono:"}'+
				'if (code == 28) {code=":poor:"}'+
				'if (code == 29) {code=":pray:"}'+
				'if (code == 30) {code=":rah:"}'+
				'if (code == 31) {code=":roll:"}'+
				'if (code == 32) {code=":shock:"}'+
				'if (code == 33) {code=":sick:"}'+
				'if (code == 34) {code=":sleep:"}'+
				'if (code == 35) {code=":snap:"}'+
				'if (code == 36) {code=":sob:"}'+
				'if (code == 37) {code=":suspect:"}'+
				'if (code == 38) {code=":sweated:"}'+
				'if (code == 39) {code=":wine:"}'+
				'if (code == 40) {code=")("}'+
				'if (code == 41) {code=":D"}'+
				'if (code == 42) {code="B)"}'+
				'if (code == 43) {code=":\'("}'+
				'if (code == 44) {code=")_("}'+
				'if (code == 45) {code=":("}'+
				'if (code == 46) {code=":)"}'+
				'if (code == 47) {code=":o"}'+
				'if (code == 48) {code=":p"}'+
				'if (code == 49) {code="%)"}'+
				'if (code == 50) {code=";)"}'+
				'if (code == 51) {code=";)"}'+
				'cod = " " + code + " ";'+
				'txtarea.value = txtarea.value+cod;'+
			'}'+
		'}';
		document.getElementsByTagName("head")[0].appendChild(scriptTagCode);

		//показать смайли
		var scriptTagCode = document.createElement("script");
		scriptTagCode.setAttribute("type", "text/javascript");
		scriptTagCode.text = 'function smileform() {'+
			'document.getElementById("smileform").innerHTML ="<table border=0 align=center class=stylesmileform>'+
			'<tr><td><center>'+
				'<a href=javascript:// onclick=emoticon(1);>'+
					'<img src=http://s9.ucoz.net/sm/24/love.gif title=love >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(2);>'+
					'<img src=http://s9.ucoz.net/sm/24/angel.gif title=angel >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(3);>'+
					'<img src=http://s9.ucoz.net/sm/24/applause.gif title=applause >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(4);>'+
					'<img src=http://s9.ucoz.net/sm/24/barbarian.gif title=barbarian >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(5);>'+
					'<img src=http://s9.ucoz.net/sm/24/bash.gif title=bash >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(6);>'+
					'<img src=http://s9.ucoz.net/sm/24/book.gif title=book >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(7);>'+
					'<img src=http://s9.ucoz.net/sm/24/cranky.gif title=cranky >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(8);>'+
					'<img src=http://s9.ucoz.net/sm/24/crazy.gif title=crazy >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(9);>'+
					'<img src=http://s9.ucoz.net/sm/24/dollar.gif title=dollar >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(10);>'+
					'<img src=http://s9.ucoz.net/sm/24/evil.gif title=evil >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(11);>'+
					'<img src=http://s9.ucoz.net/sm/24/eye.gif title=eye >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(12);>'+
					'<img src=http://s9.ucoz.net/sm/24/faint.gif title=faint >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(13);>'+
					'<img src=http://s9.ucoz.net/sm/24/flower.gif title=flower >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(14);>'+
					'<img src=http://s9.ucoz.net/sm/24/fool.gif title=fool >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(15);>'+
					'<img src=http://s9.ucoz.net/sm/24/good.gif title=good >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(16);>'+
					'<img src=http://s9.ucoz.net/sm/24/hands.gif title=hands >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(17);>'+
					'<img src=http://s9.ucoz.net/sm/24/heart.gif title=heart >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(18);>'+
					'<img src=http://s9.ucoz.net/sm/24/hello.gif title=hello >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(19);>'+
					'<img src=http://s9.ucoz.net/sm/24/hippy.gif title=hippy >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(20);>'+
					'<img src=http://s9.ucoz.net/sm/24/holiday.gif title=holiday >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(21);>'+
					'<img src=http://s9.ucoz.net/sm/24/icecream.gif title=icecream >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(22);>'+
					'<img src=http://s9.ucoz.net/sm/24/lol.gif title=lol >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(23);>'+
					'<img src=http://s9.ucoz.net/sm/24/lumped.gif title=lumped >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(24);>'+
					'<img src=http://s9.ucoz.net/sm/24/moonw.gif title=moonw >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(25);>'+
					'<img src=http://s9.ucoz.net/sm/24/nocomp.gif title=nocomp >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(26);>'+
					'<img src=http://s9.ucoz.net/sm/24/nono.gif title=nono >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(27);>'+
					'<img src=http://s9.ucoz.net/sm/24/poor.gif title=poor >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(28);>'+
					'<img src=http://s9.ucoz.net/sm/24/pray.gif title=pray >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(29);>'+
					'<img src=http://s9.ucoz.net/sm/24/rah.gif title=rah >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(30);>'+
					'<img src=http://s9.ucoz.net/sm/24/roll.gif title=roll >'+
				'</a>'+	
				'<a href=javascript:// onclick=emoticon(31);>'+
					'<img src=http://s9.ucoz.net/sm/24/shock.gif title=shock >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(32);>'+
					'<img src=http://s9.ucoz.net/sm/24/sick.gif title=sick >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(33);>'+
					'<img src=http://s9.ucoz.net/sm/24/sleep.gif title=sleep >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(34);>'+
					'<img src=http://s9.ucoz.net/sm/24/snap.gif title=snap >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(35);>'+
					'<img src=http://s9.ucoz.net/sm/24/sob.gif title=sob >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(36);>'+
					'<img src=http://s9.ucoz.net/sm/24/suspect.gif title=suspect >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(37);>'+
					'<img src=http://s9.ucoz.net/sm/24/sweated.gif title=sweated >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(38);>'+
					'<img src=http://s9.ucoz.net/sm/24/wine.gif title=wine >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(39);>'+
					'<img src=http://s9.ucoz.net/sm/24/angry.gif title=angry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(40);>'+
					'<img src=http://s9.ucoz.net/sm/24/biggrin.gif title=biggrin >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(41);>'+
					'<img src=http://s9.ucoz.net/sm/24/cool.gif title=cool >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(42);>'+
					'<img src=http://s9.ucoz.net/sm/24/cry.gif title=cry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(43);>'+
					'<img src=http://s9.ucoz.net/sm/24/dry.gif title=dry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(44);>'+
					'<img src=http://s9.ucoz.net/sm/24/happy.gif title=happy >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(45);>'+
					'<img src=http://s9.ucoz.net/sm/24/sad.gif title=sad >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(46);>'+
					'<img src=http://s9.ucoz.net/sm/24/smile.gif title=smile >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(47);>'+
					'<img src=http://s9.ucoz.net/sm/24/surprised.gif title=surprised >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(48);>'+
					'<img src=http://s9.ucoz.net/sm/24/tongue.gif title=tongue >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(49);>'+
					'<img src=http://s9.ucoz.net/sm/24/wacko.gif title=wacko >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(50);>'+
					'<img src=http://s9.ucoz.net/sm/24/wink.gif title=wink >'+
				'</a>'+
			'</center></td></tr>'+
			'</table>";'+
			'}';
		document.getElementsByTagName("head")[0].appendChild(scriptTagCode);

		//вставили

		//Лепим линк)
		document.getElementById("postMessage").innerHTML += '<center><a href="javascript://" onclick="smileform();">Cмайлы</a></center><div id="smileform" ></div>';
	}
}

if ((/mail(.*)\?act=write&to=(\d+)/.exec(window.location)) && smile_in_message) {
	if (document.getElementById("postMessage") != null) {
		smile_in_all_func();
		//вставка в код наш стиль+скрипт

		var scriptTagStyle = document.createElement("style");
		scriptTagStyle.setAttribute("type", "text/css");
		var newStyle = document.createTextNode('\n<!--\ntable.stylesmileform {\width:410px; margin: 5px 12px;}\n-->\n');
		scriptTagStyle.appendChild(newStyle);
		document.getElementsByTagName("head")[0].appendChild(scriptTagStyle);

		//вставить смайл
		var scriptTagCode = document.createElement("script");
		scriptTagCode.setAttribute("type", "text/javascript");
		scriptTagCode.text = 'function emoticon(code) {'+
			'if (code != "") {'+
				'var txtarea = document.getElementById("messageBody");'+
				'if (code == 1) {code=":-*"}'+
				'if (code == 2) {code=":angel:"}'+
				'if (code == 3) {code=":applause:"}'+
				'if (code == 4) {code=":barbarian:"}'+
				'if (code == 5) {code=":bash:"}'+
				'if (code == 6) {code=":book:"}'+
				'if (code == 7) {code=":cranky:"}'+
				'if (code == 8) {code="^_^"}'+
				'if (code == 9) {code=":dollar:"}'+
				'if (code == 10) {code=":evil:"}'+
				'if (code == 11) {code=":eye:"}'+
				'if (code == 12) {code=":faint:"}'+
				'if (code == 13) {code=":flower:"}'+
				'if (code == 14) {code=":fool:"}'+
				'if (code == 15) {code=":good:"}'+
				'if (code == 16) {code=":hands:"}'+
				'if (code == 17) {code=":heart:"}'+
				'if (code == 18) {code=":hello:"}'+
				'if (code == 19) {code=":hippy:"}'+
				'if (code == 20) {code=":holiday:"}'+
				'if (code == 21) {code=":icecream:"}'+
				'if (code == 22) {code=":lol:"}'+
				'if (code == 23) {code=":love:"}'+
				'if (code == 24) {code=":lumped:"}'+
				'if (code == 25) {code=":moonw:"}'+
				'if (code == 26) {code=":nocomp:"}'+
				'if (code == 27) {code=":nono:"}'+
				'if (code == 28) {code=":poor:"}'+
				'if (code == 29) {code=":pray:"}'+
				'if (code == 30) {code=":rah:"}'+
				'if (code == 31) {code=":roll:"}'+
				'if (code == 32) {code=":shock:"}'+
				'if (code == 33) {code=":sick:"}'+
				'if (code == 34) {code=":sleep:"}'+
				'if (code == 35) {code=":snap:"}'+
				'if (code == 36) {code=":sob:"}'+
				'if (code == 37) {code=":suspect:"}'+
				'if (code == 38) {code=":sweated:"}'+
				'if (code == 39) {code=":wine:"}'+
				'if (code == 40) {code=")("}'+
				'if (code == 41) {code=":D"}'+
				'if (code == 42) {code="B)"}'+
				'if (code == 43) {code=":\'("}'+
				'if (code == 44) {code=")_("}'+
				'if (code == 45) {code=":("}'+
				'if (code == 46) {code=":)"}'+
				'if (code == 47) {code=":o"}'+
				'if (code == 48) {code=":p"}'+
				'if (code == 49) {code="%)"}'+
				'if (code == 50) {code=";)"}'+
				'if (code == 51) {code=";)"}'+
				'cod = " " + code + " ";'+
				'txtarea.value = txtarea.value+cod;'+
			'}'+
		'}';		
		document.getElementsByTagName("head")[0].appendChild(scriptTagCode);

		//показать смайли
		var scriptTagCode = document.createElement("script");
		scriptTagCode.setAttribute("type", "text/javascript");
		scriptTagCode.text = 'function smileform() {'+
			'document.getElementById("smileform").innerHTML ="<table border=0 align=center class=stylesmileform>'+
			'<tr><td><center>'+
				'<a href=javascript:// onclick=emoticon(1);>'+
					'<img src=http://s9.ucoz.net/sm/24/love.gif title=love >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(2);>'+
					'<img src=http://s9.ucoz.net/sm/24/angel.gif title=angel >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(3);>'+
					'<img src=http://s9.ucoz.net/sm/24/applause.gif title=applause >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(4);>'+
					'<img src=http://s9.ucoz.net/sm/24/barbarian.gif title=barbarian >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(5);>'+
					'<img src=http://s9.ucoz.net/sm/24/bash.gif title=bash >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(6);>'+
					'<img src=http://s9.ucoz.net/sm/24/book.gif title=book >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(7);>'+
					'<img src=http://s9.ucoz.net/sm/24/cranky.gif title=cranky >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(8);>'+
					'<img src=http://s9.ucoz.net/sm/24/crazy.gif title=crazy >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(9);>'+
					'<img src=http://s9.ucoz.net/sm/24/dollar.gif title=dollar >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(10);>'+
					'<img src=http://s9.ucoz.net/sm/24/evil.gif title=evil >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(11);>'+
					'<img src=http://s9.ucoz.net/sm/24/eye.gif title=eye >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(12);>'+
					'<img src=http://s9.ucoz.net/sm/24/faint.gif title=faint >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(13);>'+
					'<img src=http://s9.ucoz.net/sm/24/flower.gif title=flower >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(14);>'+
					'<img src=http://s9.ucoz.net/sm/24/fool.gif title=fool >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(15);>'+
					'<img src=http://s9.ucoz.net/sm/24/good.gif title=good >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(16);>'+
					'<img src=http://s9.ucoz.net/sm/24/hands.gif title=hands >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(17);>'+
					'<img src=http://s9.ucoz.net/sm/24/heart.gif title=heart >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(18);>'+
					'<img src=http://s9.ucoz.net/sm/24/hello.gif title=hello >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(19);>'+
					'<img src=http://s9.ucoz.net/sm/24/hippy.gif title=hippy >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(20);>'+
					'<img src=http://s9.ucoz.net/sm/24/holiday.gif title=holiday >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(21);>'+
					'<img src=http://s9.ucoz.net/sm/24/icecream.gif title=icecream >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(22);>'+
					'<img src=http://s9.ucoz.net/sm/24/lol.gif title=lol >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(23);>'+
					'<img src=http://s9.ucoz.net/sm/24/lumped.gif title=lumped >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(24);>'+
					'<img src=http://s9.ucoz.net/sm/24/moonw.gif title=moonw >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(25);>'+
					'<img src=http://s9.ucoz.net/sm/24/nocomp.gif title=nocomp >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(26);>'+
					'<img src=http://s9.ucoz.net/sm/24/nono.gif title=nono >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(27);>'+
					'<img src=http://s9.ucoz.net/sm/24/poor.gif title=poor >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(28);>'+
					'<img src=http://s9.ucoz.net/sm/24/pray.gif title=pray >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(29);>'+
					'<img src=http://s9.ucoz.net/sm/24/rah.gif title=rah >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(30);>'+
					'<img src=http://s9.ucoz.net/sm/24/roll.gif title=roll >'+
				'</a>'+	
				'<a href=javascript:// onclick=emoticon(31);>'+
					'<img src=http://s9.ucoz.net/sm/24/shock.gif title=shock >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(32);>'+
					'<img src=http://s9.ucoz.net/sm/24/sick.gif title=sick >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(33);>'+
					'<img src=http://s9.ucoz.net/sm/24/sleep.gif title=sleep >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(34);>'+
					'<img src=http://s9.ucoz.net/sm/24/snap.gif title=snap >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(35);>'+
					'<img src=http://s9.ucoz.net/sm/24/sob.gif title=sob >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(36);>'+
					'<img src=http://s9.ucoz.net/sm/24/suspect.gif title=suspect >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(37);>'+
					'<img src=http://s9.ucoz.net/sm/24/sweated.gif title=sweated >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(38);>'+
					'<img src=http://s9.ucoz.net/sm/24/wine.gif title=wine >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(39);>'+
					'<img src=http://s9.ucoz.net/sm/24/angry.gif title=angry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(40);>'+
					'<img src=http://s9.ucoz.net/sm/24/biggrin.gif title=biggrin >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(41);>'+
					'<img src=http://s9.ucoz.net/sm/24/cool.gif title=cool >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(42);>'+
					'<img src=http://s9.ucoz.net/sm/24/cry.gif title=cry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(43);>'+
					'<img src=http://s9.ucoz.net/sm/24/dry.gif title=dry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(44);>'+
					'<img src=http://s9.ucoz.net/sm/24/happy.gif title=happy >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(45);>'+
					'<img src=http://s9.ucoz.net/sm/24/sad.gif title=sad >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(46);>'+
					'<img src=http://s9.ucoz.net/sm/24/smile.gif title=smile >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(47);>'+
					'<img src=http://s9.ucoz.net/sm/24/surprised.gif title=surprised >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(48);>'+
					'<img src=http://s9.ucoz.net/sm/24/tongue.gif title=tongue >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(49);>'+
					'<img src=http://s9.ucoz.net/sm/24/wacko.gif title=wacko >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(50);>'+
					'<img src=http://s9.ucoz.net/sm/24/wink.gif title=wink >'+
				'</a>'+
			'</center></td></tr>'+
			'</table>";'+
			'}';
			document.getElementsByTagName("head")[0].appendChild(scriptTagCode);

		//вставили

		//Лепим линк)
		document.getElementById("postMessage").innerHTML += '<center><br><a href="javascript://" onclick="smileform();">Cмайлы</a></center><div id="smileform" ></div>';
	}
}

if ((/\/photo[0-9]/.test(location.pathname)) || (location.pathname == '/photos.php' && GET['act'] == 'show') && smile_in_photo) {
	if (document.getElementById("comment") != null) {
			smile_in_all_func();
		//обработка формы
		var elements1 = document.getElementById("comment").getElementsByTagName("ul");
		for (i=0;i<=elements1.length-1;i++) {
			elements1[i].id = "smileformss";
		}

		//вставка в код наш стиль+скрипт

		var scriptTagStyle = document.createElement("style");
		scriptTagStyle.setAttribute("type", "text/css");
		var newStyle = document.createTextNode('\n<!--\ntable.stylesmileform {\width:410px; margin: 5px 12px;}\n-->\n');
		scriptTagStyle.appendChild(newStyle);
		document.getElementsByTagName("head")[0].appendChild(scriptTagStyle);

		//вставить смайл
		var scriptTagCode = document.createElement("script");
		scriptTagCode.setAttribute("type", "text/javascript");
		scriptTagCode.text = 'function emoticon(code) {'+
			'if (code != "") {'+
				'var txtarea = document.getElementById("commentArea");'+
				'if (code == 1) {code=":-*"}'+
				'if (code == 2) {code=":angel:"}'+
				'if (code == 3) {code=":applause:"}'+
				'if (code == 4) {code=":barbarian:"}'+
				'if (code == 5) {code=":bash:"}'+
				'if (code == 6) {code=":book:"}'+
				'if (code == 7) {code=":cranky:"}'+
				'if (code == 8) {code="^_^"}'+
				'if (code == 9) {code=":dollar:"}'+
				'if (code == 10) {code=":evil:"}'+
				'if (code == 11) {code=":eye:"}'+
				'if (code == 12) {code=":faint:"}'+
				'if (code == 13) {code=":flower:"}'+
				'if (code == 14) {code=":fool:"}'+
				'if (code == 15) {code=":good:"}'+
				'if (code == 16) {code=":hands:"}'+
				'if (code == 17) {code=":heart:"}'+
				'if (code == 18) {code=":hello:"}'+
				'if (code == 19) {code=":hippy:"}'+
				'if (code == 20) {code=":holiday:"}'+
				'if (code == 21) {code=":icecream:"}'+
				'if (code == 22) {code=":lol:"}'+
				'if (code == 23) {code=":love:"}'+
				'if (code == 24) {code=":lumped:"}'+
				'if (code == 25) {code=":moonw:"}'+
				'if (code == 26) {code=":nocomp:"}'+
				'if (code == 27) {code=":nono:"}'+
				'if (code == 28) {code=":poor:"}'+
				'if (code == 29) {code=":pray:"}'+
				'if (code == 30) {code=":rah:"}'+
				'if (code == 31) {code=":roll:"}'+
				'if (code == 32) {code=":shock:"}'+
				'if (code == 33) {code=":sick:"}'+
				'if (code == 34) {code=":sleep:"}'+
				'if (code == 35) {code=":snap:"}'+
				'if (code == 36) {code=":sob:"}'+
				'if (code == 37) {code=":suspect:"}'+
				'if (code == 38) {code=":sweated:"}'+
				'if (code == 39) {code=":wine:"}'+
				'if (code == 40) {code=")("}'+
				'if (code == 41) {code=":D"}'+
				'if (code == 42) {code="B)"}'+
				'if (code == 43) {code=":\'("}'+
				'if (code == 44) {code=")_("}'+
				'if (code == 45) {code=":("}'+
				'if (code == 46) {code=":)"}'+
				'if (code == 47) {code=":o"}'+
				'if (code == 48) {code=":p"}'+
				'if (code == 49) {code="%)"}'+
				'if (code == 50) {code=";)"}'+
				'if (code == 51) {code=";)"}'+
				'cod = " " + code + " ";'+
				'txtarea.value = txtarea.value+cod;'+
			'}'+
		'}';
		document.getElementsByTagName("head")[0].appendChild(scriptTagCode);

		//показать смайли
		var scriptTagCode = document.createElement("script");
		scriptTagCode.setAttribute("type", "text/javascript");
		scriptTagCode.text = 'function smileform() {'+
			'document.getElementById("smileform").innerHTML ="<table border=0 align=center class=stylesmileform>'+
			'<tr><td><center>'+
				'<a href=javascript:// onclick=emoticon(1);>'+
					'<img src=http://s9.ucoz.net/sm/24/love.gif title=love >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(2);>'+
					'<img src=http://s9.ucoz.net/sm/24/angel.gif title=angel >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(3);>'+
					'<img src=http://s9.ucoz.net/sm/24/applause.gif title=applause >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(4);>'+
					'<img src=http://s9.ucoz.net/sm/24/barbarian.gif title=barbarian >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(5);>'+
					'<img src=http://s9.ucoz.net/sm/24/bash.gif title=bash >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(6);>'+
					'<img src=http://s9.ucoz.net/sm/24/book.gif title=book >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(7);>'+
					'<img src=http://s9.ucoz.net/sm/24/cranky.gif title=cranky >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(8);>'+
					'<img src=http://s9.ucoz.net/sm/24/crazy.gif title=crazy >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(9);>'+
					'<img src=http://s9.ucoz.net/sm/24/dollar.gif title=dollar >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(10);>'+
					'<img src=http://s9.ucoz.net/sm/24/evil.gif title=evil >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(11);>'+
					'<img src=http://s9.ucoz.net/sm/24/eye.gif title=eye >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(12);>'+
					'<img src=http://s9.ucoz.net/sm/24/faint.gif title=faint >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(13);>'+
					'<img src=http://s9.ucoz.net/sm/24/flower.gif title=flower >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(14);>'+
					'<img src=http://s9.ucoz.net/sm/24/fool.gif title=fool >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(15);>'+
					'<img src=http://s9.ucoz.net/sm/24/good.gif title=good >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(16);>'+
					'<img src=http://s9.ucoz.net/sm/24/hands.gif title=hands >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(17);>'+
					'<img src=http://s9.ucoz.net/sm/24/heart.gif title=heart >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(18);>'+
					'<img src=http://s9.ucoz.net/sm/24/hello.gif title=hello >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(19);>'+
					'<img src=http://s9.ucoz.net/sm/24/hippy.gif title=hippy >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(20);>'+
					'<img src=http://s9.ucoz.net/sm/24/holiday.gif title=holiday >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(21);>'+
					'<img src=http://s9.ucoz.net/sm/24/icecream.gif title=icecream >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(22);>'+
					'<img src=http://s9.ucoz.net/sm/24/lol.gif title=lol >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(23);>'+
					'<img src=http://s9.ucoz.net/sm/24/lumped.gif title=lumped >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(24);>'+
					'<img src=http://s9.ucoz.net/sm/24/moonw.gif title=moonw >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(25);>'+
					'<img src=http://s9.ucoz.net/sm/24/nocomp.gif title=nocomp >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(26);>'+
					'<img src=http://s9.ucoz.net/sm/24/nono.gif title=nono >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(27);>'+
					'<img src=http://s9.ucoz.net/sm/24/poor.gif title=poor >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(28);>'+
					'<img src=http://s9.ucoz.net/sm/24/pray.gif title=pray >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(29);>'+
					'<img src=http://s9.ucoz.net/sm/24/rah.gif title=rah >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(30);>'+
					'<img src=http://s9.ucoz.net/sm/24/roll.gif title=roll >'+
				'</a>'+	
				'<a href=javascript:// onclick=emoticon(31);>'+
					'<img src=http://s9.ucoz.net/sm/24/shock.gif title=shock >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(32);>'+
					'<img src=http://s9.ucoz.net/sm/24/sick.gif title=sick >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(33);>'+
					'<img src=http://s9.ucoz.net/sm/24/sleep.gif title=sleep >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(34);>'+
					'<img src=http://s9.ucoz.net/sm/24/snap.gif title=snap >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(35);>'+
					'<img src=http://s9.ucoz.net/sm/24/sob.gif title=sob >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(36);>'+
					'<img src=http://s9.ucoz.net/sm/24/suspect.gif title=suspect >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(37);>'+
					'<img src=http://s9.ucoz.net/sm/24/sweated.gif title=sweated >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(38);>'+
					'<img src=http://s9.ucoz.net/sm/24/wine.gif title=wine >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(39);>'+
					'<img src=http://s9.ucoz.net/sm/24/angry.gif title=angry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(40);>'+
					'<img src=http://s9.ucoz.net/sm/24/biggrin.gif title=biggrin >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(41);>'+
					'<img src=http://s9.ucoz.net/sm/24/cool.gif title=cool >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(42);>'+
					'<img src=http://s9.ucoz.net/sm/24/cry.gif title=cry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(43);>'+
					'<img src=http://s9.ucoz.net/sm/24/dry.gif title=dry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(44);>'+
					'<img src=http://s9.ucoz.net/sm/24/happy.gif title=happy >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(45);>'+
					'<img src=http://s9.ucoz.net/sm/24/sad.gif title=sad >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(46);>'+
					'<img src=http://s9.ucoz.net/sm/24/smile.gif title=smile >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(47);>'+
					'<img src=http://s9.ucoz.net/sm/24/surprised.gif title=surprised >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(48);>'+
					'<img src=http://s9.ucoz.net/sm/24/tongue.gif title=tongue >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(49);>'+
					'<img src=http://s9.ucoz.net/sm/24/wacko.gif title=wacko >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(50);>'+
					'<img src=http://s9.ucoz.net/sm/24/wink.gif title=wink >'+
				'</a>'+
			'</center></td></tr>'+
			'</table>";'+
			'}';
			document.getElementsByTagName("head")[0].appendChild(scriptTagCode);

		//вставили

		//Лепим линк)
		document.getElementById("smileformss").innerHTML = '<li style="margin-left:30%"><span class="ncc"><a href="javascript:smileform();">Cмайлы</a></span></li><li style="margin-left:5%"><span class="ncc"><a href="javascript:postComment();">Добавить комментарий</a></span></li><li><div id="smileform" ></div></li>';
	}
}

//видео
if ((/\/video[0-9]/.test(location.pathname)) && smile_in_video) {
	if (document.getElementById("videoaddcomment") != null) {
		smile_in_all_func();
		//обработка формы
		var elements1 = document.getElementById("comment").getElementsByTagName("ul");
		for (i=0;i<=elements1.length-1;i++) {
			elements1[i].id = "smileformss";
		}

		//вставка в код наш стиль+скрипт

		var scriptTagStyle = document.createElement("style");
		scriptTagStyle.setAttribute("type", "text/css");
		var newStyle = document.createTextNode('\n<!--\ntable.stylesmileform {\width:410px; margin: 5px 12px;}\n-->\n');
		scriptTagStyle.appendChild(newStyle);
		document.getElementsByTagName("head")[0].appendChild(scriptTagStyle);

		//вставить смайл
		var scriptTagCode = document.createElement("script");
		scriptTagCode.setAttribute("type", "text/javascript");
		scriptTagCode.text = 'function emoticon(code) {'+
			'if (code != "") {'+
				'var txtarea = document.getElementById("reply_field");'+
				'if (code == 1) {code=":-*"}'+
				'if (code == 2) {code=":angel:"}'+
				'if (code == 3) {code=":applause:"}'+
				'if (code == 4) {code=":barbarian:"}'+
				'if (code == 5) {code=":bash:"}'+
				'if (code == 6) {code=":book:"}'+
				'if (code == 7) {code=":cranky:"}'+
				'if (code == 8) {code="^_^"}'+
				'if (code == 9) {code=":dollar:"}'+
				'if (code == 10) {code=":evil:"}'+
				'if (code == 11) {code=":eye:"}'+
				'if (code == 12) {code=":faint:"}'+
				'if (code == 13) {code=":flower:"}'+
				'if (code == 14) {code=":fool:"}'+
				'if (code == 15) {code=":good:"}'+
				'if (code == 16) {code=":hands:"}'+
				'if (code == 17) {code=":heart:"}'+
				'if (code == 18) {code=":hello:"}'+
				'if (code == 19) {code=":hippy:"}'+
				'if (code == 20) {code=":holiday:"}'+
				'if (code == 21) {code=":icecream:"}'+
				'if (code == 22) {code=":lol:"}'+
				'if (code == 23) {code=":love:"}'+
				'if (code == 24) {code=":lumped:"}'+
				'if (code == 25) {code=":moonw:"}'+
				'if (code == 26) {code=":nocomp:"}'+
				'if (code == 27) {code=":nono:"}'+
				'if (code == 28) {code=":poor:"}'+
				'if (code == 29) {code=":pray:"}'+
				'if (code == 30) {code=":rah:"}'+
				'if (code == 31) {code=":roll:"}'+
				'if (code == 32) {code=":shock:"}'+
				'if (code == 33) {code=":sick:"}'+
				'if (code == 34) {code=":sleep:"}'+
				'if (code == 35) {code=":snap:"}'+
				'if (code == 36) {code=":sob:"}'+
				'if (code == 37) {code=":suspect:"}'+
				'if (code == 38) {code=":sweated:"}'+
				'if (code == 39) {code=":wine:"}'+
				'if (code == 40) {code=")("}'+
				'if (code == 41) {code=":D"}'+
				'if (code == 42) {code="B)"}'+
				'if (code == 43) {code=":\'("}'+
				'if (code == 44) {code=")_("}'+
				'if (code == 45) {code=":("}'+
				'if (code == 46) {code=":)"}'+
				'if (code == 47) {code=":o"}'+
				'if (code == 48) {code=":p"}'+
				'if (code == 49) {code="%)"}'+
				'if (code == 50) {code=";)"}'+
				'if (code == 51) {code=";)"}'+
				'cod = " " + code + " ";'+
				'txtarea.value = txtarea.value+cod;'+
			'}'+
		'}';
		document.getElementsByTagName("head")[0].appendChild(scriptTagCode);

		//показать смайли
		var scriptTagCode = document.createElement("script");
		scriptTagCode.setAttribute("type", "text/javascript");
		scriptTagCode.text = 'function smileform() {'+
			'document.getElementById("smileform").innerHTML ="<table border=0 align=center class=stylesmileform>'+
			'<tr><td><center>'+
				'<a href=javascript:// onclick=emoticon(1);>'+
					'<img src=http://s9.ucoz.net/sm/24/love.gif title=love >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(2);>'+
					'<img src=http://s9.ucoz.net/sm/24/angel.gif title=angel >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(3);>'+
					'<img src=http://s9.ucoz.net/sm/24/applause.gif title=applause >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(4);>'+
					'<img src=http://s9.ucoz.net/sm/24/barbarian.gif title=barbarian >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(5);>'+
					'<img src=http://s9.ucoz.net/sm/24/bash.gif title=bash >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(6);>'+
					'<img src=http://s9.ucoz.net/sm/24/book.gif title=book >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(7);>'+
					'<img src=http://s9.ucoz.net/sm/24/cranky.gif title=cranky >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(8);>'+
					'<img src=http://s9.ucoz.net/sm/24/crazy.gif title=crazy >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(9);>'+
					'<img src=http://s9.ucoz.net/sm/24/dollar.gif title=dollar >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(10);>'+
					'<img src=http://s9.ucoz.net/sm/24/evil.gif title=evil >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(11);>'+
					'<img src=http://s9.ucoz.net/sm/24/eye.gif title=eye >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(12);>'+
					'<img src=http://s9.ucoz.net/sm/24/faint.gif title=faint >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(13);>'+
					'<img src=http://s9.ucoz.net/sm/24/flower.gif title=flower >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(14);>'+
					'<img src=http://s9.ucoz.net/sm/24/fool.gif title=fool >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(15);>'+
					'<img src=http://s9.ucoz.net/sm/24/good.gif title=good >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(16);>'+
					'<img src=http://s9.ucoz.net/sm/24/hands.gif title=hands >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(17);>'+
					'<img src=http://s9.ucoz.net/sm/24/heart.gif title=heart >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(18);>'+
					'<img src=http://s9.ucoz.net/sm/24/hello.gif title=hello >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(19);>'+
					'<img src=http://s9.ucoz.net/sm/24/hippy.gif title=hippy >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(20);>'+
					'<img src=http://s9.ucoz.net/sm/24/holiday.gif title=holiday >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(21);>'+
					'<img src=http://s9.ucoz.net/sm/24/icecream.gif title=icecream >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(22);>'+
					'<img src=http://s9.ucoz.net/sm/24/lol.gif title=lol >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(23);>'+
					'<img src=http://s9.ucoz.net/sm/24/lumped.gif title=lumped >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(24);>'+
					'<img src=http://s9.ucoz.net/sm/24/moonw.gif title=moonw >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(25);>'+
					'<img src=http://s9.ucoz.net/sm/24/nocomp.gif title=nocomp >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(26);>'+
					'<img src=http://s9.ucoz.net/sm/24/nono.gif title=nono >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(27);>'+
					'<img src=http://s9.ucoz.net/sm/24/poor.gif title=poor >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(28);>'+
					'<img src=http://s9.ucoz.net/sm/24/pray.gif title=pray >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(29);>'+
					'<img src=http://s9.ucoz.net/sm/24/rah.gif title=rah >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(30);>'+
					'<img src=http://s9.ucoz.net/sm/24/roll.gif title=roll >'+
				'</a>'+	
				'<a href=javascript:// onclick=emoticon(31);>'+
					'<img src=http://s9.ucoz.net/sm/24/shock.gif title=shock >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(32);>'+
					'<img src=http://s9.ucoz.net/sm/24/sick.gif title=sick >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(33);>'+
					'<img src=http://s9.ucoz.net/sm/24/sleep.gif title=sleep >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(34);>'+
					'<img src=http://s9.ucoz.net/sm/24/snap.gif title=snap >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(35);>'+
					'<img src=http://s9.ucoz.net/sm/24/sob.gif title=sob >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(36);>'+
					'<img src=http://s9.ucoz.net/sm/24/suspect.gif title=suspect >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(37);>'+
					'<img src=http://s9.ucoz.net/sm/24/sweated.gif title=sweated >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(38);>'+
					'<img src=http://s9.ucoz.net/sm/24/wine.gif title=wine >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(39);>'+
					'<img src=http://s9.ucoz.net/sm/24/angry.gif title=angry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(40);>'+
					'<img src=http://s9.ucoz.net/sm/24/biggrin.gif title=biggrin >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(41);>'+
					'<img src=http://s9.ucoz.net/sm/24/cool.gif title=cool >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(42);>'+
					'<img src=http://s9.ucoz.net/sm/24/cry.gif title=cry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(43);>'+
					'<img src=http://s9.ucoz.net/sm/24/dry.gif title=dry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(44);>'+
					'<img src=http://s9.ucoz.net/sm/24/happy.gif title=happy >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(45);>'+
					'<img src=http://s9.ucoz.net/sm/24/sad.gif title=sad >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(46);>'+
					'<img src=http://s9.ucoz.net/sm/24/smile.gif title=smile >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(47);>'+
					'<img src=http://s9.ucoz.net/sm/24/surprised.gif title=surprised >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(48);>'+
					'<img src=http://s9.ucoz.net/sm/24/tongue.gif title=tongue >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(49);>'+
					'<img src=http://s9.ucoz.net/sm/24/wacko.gif title=wacko >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(50);>'+
					'<img src=http://s9.ucoz.net/sm/24/wink.gif title=wink >'+
				'</a>'+
			'</center></td></tr>'+
			'</table>";'+
			'}';
			document.getElementsByTagName("head")[0].appendChild(scriptTagCode);

		//вставили

		//Лепим линк)
		document.getElementById("smileformss").innerHTML = '<li style="width:8em"><a href="javascript:smileform();">Cмайлы</a></li><li><a style="width:11.5em" title="Ctrl+Enter" id="postIt" href="javascript: postIt()">Добавить комментарий</a></li>';
		$('<div id="smileform" ></div>').insertAfter(".buttonRow");
	}
}

//стена
if (smile_in_board) {
	if (document.getElementById("moreWall") != null) {
		//обработка формы
		var elements1 = document.getElementById("br");
			elements1.innerHTML += '<ul class="buttonRow" style="float:center;" class="clearFix">'+
					'<li style="width:6.4em;" id="smileform_link">'+
					'</li>'+
				'</ul><br>'+
				'<ul style="float:center; text-align: left; line-height: 10px; height:21px; margin: 0px; padding: 1px 0px;" >'+
					'<li style="float: left; margin-bottom:1px">'+
						'<div id="smileform"></div>'+
					'</li>'+
				'</ul>';

		//вставка в код наш стиль+скрипт

		var scriptTagStyle = document.createElement("style");
		scriptTagStyle.setAttribute("type", "text/css");
		var newStyle = document.createTextNode('\n<!--\ntable.stylesmileform {\width:410px; margin: 5px 12px;}\n-->\n');
		scriptTagStyle.appendChild(newStyle);
		document.getElementsByTagName("head")[0].appendChild(scriptTagStyle);

		//вставить смайл
		var scriptTagCode = document.createElement("script");
		scriptTagCode.setAttribute("type", "text/javascript");
		scriptTagCode.text = 'function emoticon(code) {'+
			'if (code != "") {'+
				'var txtarea = document.getElementById("reply_field");'+
				'if (code == 1) {code=":-*"}'+
				'if (code == 2) {code=":angel:"}'+
				'if (code == 3) {code=":applause:"}'+
				'if (code == 4) {code=":barbarian:"}'+
				'if (code == 5) {code=":bash:"}'+
				'if (code == 6) {code=":book:"}'+
				'if (code == 7) {code=":cranky:"}'+
				'if (code == 8) {code="^_^"}'+
				'if (code == 9) {code=":dollar:"}'+
				'if (code == 10) {code=":evil:"}'+
				'if (code == 11) {code=":eye:"}'+
				'if (code == 12) {code=":faint:"}'+
				'if (code == 13) {code=":flower:"}'+
				'if (code == 14) {code=":fool:"}'+
				'if (code == 15) {code=":good:"}'+
				'if (code == 16) {code=":hands:"}'+
				'if (code == 17) {code=":heart:"}'+
				'if (code == 18) {code=":hello:"}'+
				'if (code == 19) {code=":hippy:"}'+
				'if (code == 20) {code=":holiday:"}'+
				'if (code == 21) {code=":icecream:"}'+
				'if (code == 22) {code=":lol:"}'+
				'if (code == 23) {code=":love:"}'+
				'if (code == 24) {code=":lumped:"}'+
				'if (code == 25) {code=":moonw:"}'+
				'if (code == 26) {code=":nocomp:"}'+
				'if (code == 27) {code=":nono:"}'+
				'if (code == 28) {code=":poor:"}'+
				'if (code == 29) {code=":pray:"}'+
				'if (code == 30) {code=":rah:"}'+
				'if (code == 31) {code=":roll:"}'+
				'if (code == 32) {code=":shock:"}'+
				'if (code == 33) {code=":sick:"}'+
				'if (code == 34) {code=":sleep:"}'+
				'if (code == 35) {code=":snap:"}'+
				'if (code == 36) {code=":sob:"}'+
				'if (code == 37) {code=":suspect:"}'+
				'if (code == 38) {code=":sweated:"}'+
				'if (code == 39) {code=":wine:"}'+
				'if (code == 40) {code=")("}'+
				'if (code == 41) {code=":D"}'+
				'if (code == 42) {code="B)"}'+
				'if (code == 43) {code=":\'("}'+
				'if (code == 44) {code=")_("}'+
				'if (code == 45) {code=":("}'+
				'if (code == 46) {code=":)"}'+
				'if (code == 47) {code=":o"}'+
				'if (code == 48) {code=":p"}'+
				'if (code == 49) {code="%)"}'+
				'if (code == 50) {code=";)"}'+
				'if (code == 51) {code=";)"}'+
				'cod = " " + code + " ";'+
				'txtarea.value = txtarea.value+cod;'+
			'}'+
		'}';
		document.getElementsByTagName("head")[0].appendChild(scriptTagCode);

		//показать смайли
		var scriptTagCode = document.createElement("script");
		scriptTagCode.setAttribute("type", "text/javascript");
		scriptTagCode.text = 'function smileform() {'+
			'document.getElementById("smileform").innerHTML ="<table border=0 align=center class=stylesmileform>'+
			'<tr><td><center>'+
				'<a href=javascript:// onclick=emoticon(1);>'+
					'<img src=http://s9.ucoz.net/sm/24/love.gif title=love >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(2);>'+
					'<img src=http://s9.ucoz.net/sm/24/angel.gif title=angel >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(3);>'+
					'<img src=http://s9.ucoz.net/sm/24/applause.gif title=applause >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(4);>'+
					'<img src=http://s9.ucoz.net/sm/24/barbarian.gif title=barbarian >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(5);>'+
					'<img src=http://s9.ucoz.net/sm/24/bash.gif title=bash >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(6);>'+
					'<img src=http://s9.ucoz.net/sm/24/book.gif title=book >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(7);>'+
					'<img src=http://s9.ucoz.net/sm/24/cranky.gif title=cranky >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(8);>'+
					'<img src=http://s9.ucoz.net/sm/24/crazy.gif title=crazy >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(9);>'+
					'<img src=http://s9.ucoz.net/sm/24/dollar.gif title=dollar >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(10);>'+
					'<img src=http://s9.ucoz.net/sm/24/evil.gif title=evil >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(11);>'+
					'<img src=http://s9.ucoz.net/sm/24/eye.gif title=eye >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(12);>'+
					'<img src=http://s9.ucoz.net/sm/24/faint.gif title=faint >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(13);>'+
					'<img src=http://s9.ucoz.net/sm/24/flower.gif title=flower >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(14);>'+
					'<img src=http://s9.ucoz.net/sm/24/fool.gif title=fool >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(15);>'+
					'<img src=http://s9.ucoz.net/sm/24/good.gif title=good >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(16);>'+
					'<img src=http://s9.ucoz.net/sm/24/hands.gif title=hands >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(17);>'+
					'<img src=http://s9.ucoz.net/sm/24/heart.gif title=heart >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(18);>'+
					'<img src=http://s9.ucoz.net/sm/24/hello.gif title=hello >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(19);>'+
					'<img src=http://s9.ucoz.net/sm/24/hippy.gif title=hippy >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(20);>'+
					'<img src=http://s9.ucoz.net/sm/24/holiday.gif title=holiday >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(21);>'+
					'<img src=http://s9.ucoz.net/sm/24/icecream.gif title=icecream >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(22);>'+
					'<img src=http://s9.ucoz.net/sm/24/lol.gif title=lol >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(23);>'+
					'<img src=http://s9.ucoz.net/sm/24/lumped.gif title=lumped >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(24);>'+
					'<img src=http://s9.ucoz.net/sm/24/moonw.gif title=moonw >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(25);>'+
					'<img src=http://s9.ucoz.net/sm/24/nocomp.gif title=nocomp >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(26);>'+
					'<img src=http://s9.ucoz.net/sm/24/nono.gif title=nono >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(27);>'+
					'<img src=http://s9.ucoz.net/sm/24/poor.gif title=poor >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(28);>'+
					'<img src=http://s9.ucoz.net/sm/24/pray.gif title=pray >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(29);>'+
					'<img src=http://s9.ucoz.net/sm/24/rah.gif title=rah >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(30);>'+
					'<img src=http://s9.ucoz.net/sm/24/roll.gif title=roll >'+
				'</a>'+	
				'<a href=javascript:// onclick=emoticon(31);>'+
					'<img src=http://s9.ucoz.net/sm/24/shock.gif title=shock >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(32);>'+
					'<img src=http://s9.ucoz.net/sm/24/sick.gif title=sick >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(33);>'+
					'<img src=http://s9.ucoz.net/sm/24/sleep.gif title=sleep >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(34);>'+
					'<img src=http://s9.ucoz.net/sm/24/snap.gif title=snap >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(35);>'+
					'<img src=http://s9.ucoz.net/sm/24/sob.gif title=sob >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(36);>'+
					'<img src=http://s9.ucoz.net/sm/24/suspect.gif title=suspect >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(37);>'+
					'<img src=http://s9.ucoz.net/sm/24/sweated.gif title=sweated >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(38);>'+
					'<img src=http://s9.ucoz.net/sm/24/wine.gif title=wine >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(39);>'+
					'<img src=http://s9.ucoz.net/sm/24/angry.gif title=angry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(40);>'+
					'<img src=http://s9.ucoz.net/sm/24/biggrin.gif title=biggrin >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(41);>'+
					'<img src=http://s9.ucoz.net/sm/24/cool.gif title=cool >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(42);>'+
					'<img src=http://s9.ucoz.net/sm/24/cry.gif title=cry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(43);>'+
					'<img src=http://s9.ucoz.net/sm/24/dry.gif title=dry >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(44);>'+
					'<img src=http://s9.ucoz.net/sm/24/happy.gif title=happy >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(45);>'+
					'<img src=http://s9.ucoz.net/sm/24/sad.gif title=sad >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(46);>'+
					'<img src=http://s9.ucoz.net/sm/24/smile.gif title=smile >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(47);>'+
					'<img src=http://s9.ucoz.net/sm/24/surprised.gif title=surprised >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(48);>'+
					'<img src=http://s9.ucoz.net/sm/24/tongue.gif title=tongue >'+
				'</a><br>'+
				'<a href=javascript:// onclick=emoticon(49);>'+
					'<img src=http://s9.ucoz.net/sm/24/wacko.gif title=wacko >'+
				'</a>'+
				'<a href=javascript:// onclick=emoticon(50);>'+
					'<img src=http://s9.ucoz.net/sm/24/wink.gif title=wink >'+
				'</a>'+
			'</center></td></tr>'+
			'</table>";'+
			'}';
			document.getElementsByTagName("head")[0].appendChild(scriptTagCode);

		//вставили

		//Лепим линк)
		document.getElementById("smileform_link").innerHTML = '<a href="javascript:smileform();">Cмайлы</a>';
	}
}


// ###   /video123
// ##########################################################################################################
// #################################
// #################################                     Видео
// #################################
// ##########################################################################################################    
if (((/video(\d+)/.exec(window.location)) || (/video(.*)\&tagged_id=(\d+)/.exec(window.location))) && downVideo )
{
jQuery(document).ready(function(){
    var allText = document.documentElement.innerHTML;
	var vars = {vtag:"",vkid:"",host:"",link:"",md_title:"",md_author:""}
	var varsStr = ""
	for(v in vars){
		var val = allText.match(v + ":'(.*?)',");
		if(val){
			vars[v] = val[1];
			varsStr += v + "=" + vars[v] + "&";
		}
	}
	var cont = document.createElement("div");
	cont.setAttribute("style", "float:left");
    var addon=document.createElement("a");
	var src = "http://"+vars["host"]+"/assets/videos/"+vars["vtag"]+vars["vkid"]+".vk.flv";
    addon.setAttribute("href",src);
    addon.innerHTML="<br>\u0421\u043A\u0430\u0447\u0430\u0442\u044C"; 
    cont.appendChild(addon);
	cont.innerHTML += " | ";
    var input=document.createElement("input");
	var movie = "http://1.vkadre.ru/VkontaktePlayer.swf?14";
	var text = '<object width="460" height="345">'+
	'<param name="movie" value="' + movie + '"></param>'+
	'<param name="flashvars" value="' + varsStr + '"></param>'+
	'<embed src="' + movie + '" flashvars="' + varsStr + '" type="application/x-shockwave-flash" width="460" height="345"></embed>'+
	'</object><br/>'+
	'<a href="'+location.href+'">\u0412\u0438\u0434\u0435\u043E \u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435</a>';
    input.setAttribute("value",text);
	input.setAttribute("readonly","1");
	input.setAttribute("style", "font-size:10px;width:150px;border:#CCCCCC 1px solid;color:#666666");
	input.setAttribute("onclick","javascript:this.focus();this.select();");
    var addon=document.createElement("a");
    addon.setAttribute("href","http://vixy.net?u="+src);
    addon.innerHTML="\u0421\u043A\u0430\u0447\u0430\u0442\u044C AVI"; 
    cont.appendChild(addon);
	cont.innerHTML += " | ";
	var addon=document.createElement("a");
    addon.setAttribute("href","http://www.download.com/FLV-Player/3000-13632_4-10467081.html");
    addon.innerHTML="\u0421\u043A\u0430\u0447\u0430\u0442\u044C FLV плеер"; 
    cont.appendChild(addon);
	cont.innerHTML += " | ";
	var addon=document.createElement("a");
    addon.setAttribute("href","javascript:showTagSelector(); hideTagSelector(); for(blabla=0;blabla<5000;blabla++){ var elem = document.getElementById('f'+blabla); if(elem == null) break; elem.onclick(); }");
    addon.innerHTML="Отметить всех"; 
    cont.appendChild(addon);
	cont.innerHTML += " | Код для блога: ";
    cont.appendChild(input);
    document.getElementById("bigSummary").appendChild(cont);
});
}

// ###   /search.php
// ##########################################################################################################
// #################################
// #################################                     Ссылки
// #################################
// ##########################################################################################################    
if (location.pathname == '/search.php' && useLinks) {
jQuery(document).ready(function(){
	var reg_notfriend = new RegExp(/<a href=\"friend.php\?id=([0-9]+)\">([^<]*)<\/a><\/li><li><a href=\"(.*?)\" onclick=\"(.*?)\">([^<]*)<\/a><\/li>/);
	var reg_friend = new RegExp(/<a href=\"friend.php\?act=remove&amp;id=([0-9]+)\">([^<]*)<\/a><\/li>/);
	var reg_nopage = new RegExp(/<ul id=\"nav\" style=\"margin: 0px; width: 150px;\">\s*<\/ul>/g);
	var idReg = new RegExp(/profile.php\?id=([0-9]+)/);

	//ф-я start_link_ajax
	var start_link_ajax_func = document.createElement("script");
	start_link_ajax_func.setAttribute("type", "text/javascript");
	start_link_ajax_func.src = 'js/ajax.js'; 
	document.getElementsByTagName("head")[0].appendChild(start_link_ajax_func);
	
	//ф-я start_link_addToFaves
	var start_link_addToFaves_func = document.createElement("script");
	start_link_addToFaves_func.setAttribute("type", "text/javascript");
	start_link_addToFaves_func.src = 'js/fave.js'; 
	document.getElementsByTagName("head")[0].appendChild(start_link_addToFaves_func);

	if (document.getElementById("searchResults") != null) {
		var resultsElement = document.getElementById("searchResults").getElementsByTagName("div");
		for (i=0;i<=resultsElement.length-1;i++) {
			if (resultsElement[i].className == 'result clearFix') {
			
				var userid;
				if (idReg.test(resultsElement[i].innerHTML)) {
					userid = resultsElement[i].innerHTML.match(idReg)[1];						
				} else {
					userid = resultsElement[i].innerHTML.match(reg_notfriend)[1];
				}
				
				var notFriendLinks,friendLinks,deletedLinks;
				
				if (!horLinks) {
					notFriendLinks = "<li>&nbsp;</li><li>" + getLinksForNotFriend(userid).join("</li>\n<li>") + "</li><li><div id='addToFaves' align='left'><a href='javascript: addFave()'>Добавить в закладки<span id='faveProgress'></span></a></div></li><li>"+getLinksForNotFriend_dop(userid).join("</li>\n<li>")+"</li></ul>";
					friendLinks = "<li>&nbsp;</li><li>" + getLinksForDeleted(userid).join("</li>\n<li>") + "</li><li><div id='addToFaves' align='left'><a href='javascript: addFave()'>Добавить в закладки<span id='faveProgress'></span></a></div></li><li>"+getLinksForNotFriend_dop(userid).join("</li>\n<li>")+"</li></ul>";
					deletedLinks = "<ul id=\"nav\" style=\"margin: 0px; width: 150px;\"><li>" + getLinksForDeleted(userid).join("</li>\n<li>") + "</li><li><div id='addToFaves' align='left'><a href='javascript: addFave()'>Добавить в закладки<span id='faveProgress'></span></a></div></li><li>"+getLinksForNotFriend_dop(userid).join("</li>\n<li>")+"</li></ul>";
				} else {
					notFriendLinks = "</ul><tr><td colspan='3'><br><center>| " + getLinksForNotFriend(userid).join(" | ") + " |</center></td><tr><td colspan='3'><br><center><div id='addToFaves'><a href='javascript: addFave()'>Добавить в закладки<span id='faveProgress'></span></a></div></center></td></tr><tr><td colspan='3'><center><div>"+getLinksForNotFriend_dop(userid).join(" | ")+"</div></center></td></tr>";
					friendLinks = "</ul><tr><td colspan='3'><br><center>| " + getLinksForDeleted(userid).join(" | ") + " |</center></td></tr><tr><td colspan='3'><br><center><div id='addToFaves'><a href='javascript: addFave()'>Добавить в закладки<span id='faveProgress'></span></a></div></center></td></tr><tr><td colspan='3'><center><div>"+getLinksForNotFriend_dop(userid).join(" | ")+"</div></center></td></tr>";
					deletedLinks = "<tr><td colspan='3'><br><center>| " + getLinksForDeleted(userid).join(" | ") + " |</center></td></tr><tr><td colspan='3'><br><center><div id='addToFaves'><a href='javascript: addFave()'>Добавить в закладки<span id='faveProgress'></span></a></div></center></td></tr><tr><td colspan='3'><center><div>"+getLinksForNotFriend_dop(userid).join(" | ")+"</div></center></td></tr>";
				}
				
				resultsElement[i].innerHTML = resultsElement[i].innerHTML.replace(reg_notfriend,"<ul id=\"nav\" style=\"margin: 0px; width: 150px;\"><a href=\"friend.php?id=$1\">$2</a></li><li><a href=\"$3\" onclick=\"$4\">$5</a></li>"+notFriendLinks);
				resultsElement[i].innerHTML = resultsElement[i].innerHTML.replace(reg_friend,"<ul id=\"nav\" style=\"margin: 0px; width: 150px;\"><a href=\"friend.php?act=remove&amp;id=$1\">$2</a></li>"+friendLinks);
				resultsElement[i].innerHTML = resultsElement[i].innerHTML.replace(reg_nopage,deletedLinks);	
				document.getElementById("content").innerHTML += "<input type='hidden' id='mid' value="+userid+">";
			}
		}		
	}
});
}

// ## /audio.php
// ##########################################################################################################
// #################################
// #################################                     Аудио
// #################################
// ##########################################################################################################    

if ((location.pathname == '/audio.php' || location.pathname == '/audiosearch.php') && (downAudio || uniqAudio || removeAudiosAuthor)) {
	var audioL = document.getElementById("audios");
	if (audioL == null) {
		audioL = document.getElementById("bigResult");
	}
	var elements = audioL.getElementsByTagName("div");
	
	var regDownLink = new RegExp(/operate\([0-9]+,([0-9]+),([0-9]+),\'([0-9a-zA-z]+)\',[0-9]+\);/);
	//var regInfo = new RegExp(/<b id=\"performer[0-9]+\">([^<]*)<\/b> - (?:<a href=\"javasсript: showLyrics\([0-9]+,[0-9]+\);\">)?<span id=\"title[0-9]+\">([^]*)(?:<\/a>)?<\/span>[^]*/);
	var regRemove = new RegExp(/<small>\((?:<a href=\"id[0-9]+\">[^<]+<\/a>)?\)<\/small>/);
	var currElement;
	var uniqId = 0;
	var audioList = Array();
	
	for (elNum=0;elNum<=elements.length-1;elNum++) {
		currElement = elements[elNum];
		if (currElement.className != "audioRow") {
			continue;
		}

		if (downAudio) {
			var onclck = currElement.getElementsByTagName("img")[0].getAttribute("onclick");
			var res = onclck.match(regDownLink);
			res[2] = strRepeat('0',5-res[2].length)+res[2];
			var href = "http://cs"+res[1]+".vkontakte.ru/u"+res[2]+"/audio/"+res[3]+".mp3";
		
			//currElement.getElementsByTagName("tr")[0].innerHTML = "<td style=\"width: 20px;padding-top: 5px;padding-right: 5px; vertical-align: top;\"><img id='downloadmp3' width=\"17\" height=\"16\" class=\"playimg\" onClick=\"javascript:alert('A')\"></td>" + currElement.getElementsByTagName("tr")[0].innerHTML;
			currElement.getElementsByTagName("td")[0].setAttribute("style","width: 52px;");
			currElement.getElementsByTagName("td")[0].innerHTML = "<a href=\""+href+"\" target='_blank'><img src=\""+getDownloadImageBase64()+"\"></a> " + currElement.getElementsByTagName("td")[0].innerHTML;
		}
		
		

		if (uniqAudio) {
			var info = currElement.getElementsByTagName("div")[0];
			var dur = currElement.getElementsByTagName("div")[1].innerHTML;
		
			//var res = info.innerHTML.match(regInfo);
			//if (res == null) {
				//alert("Ошибка парсинга:\n"+info.innerHTML);
			//}
			
			
			if (addAudioInfo(res[1],res[2],dur,uniqId) == false) {
				//alert("Повтор: \n"+res[0]+"\n"+res[1]+"\n"+res[2]+"\n"+res[3]);
				currElement.setAttribute("style","display: none;");
			} else {
				// Показывать кол-во дубликатов
				if (showDublCount) {
					info.innerHTML += "<span style=\"color: #9DCBBF\" id=\"audioInfo"+uniqId+"\" title=\"Кол-во дубликатов\"></div>";
					uniqId++;
				}
			}
		}
		
		if (removeAudiosAuthor) {
			currElement.getElementsByTagName("td")[1].innerHTML = currElement.getElementsByTagName("td")[1].innerHTML.replace(regRemove,'');
		}
		
	}

	//Текст песни
	makeLyrics();
	addLyrics();
}

function addAudioInfo(perf,titl,dur,id) {
	perf = perf.toLowerCase().replace(/\s+/g,' ').replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/^the /g,'');
	titl = titl.toLowerCase().replace(/\s+/g,' ').replace(/^\s+/g,'').replace(/\s+$/g,'');
	if (dur.length == 0) {
		len = 0;
	} else {
		len = parseInt(dur.split(":")[0]*60)+parseInt(dur.split(":")[1]);		// Внимание! Предусмотрен только формат xx:xx. Формат x:xx:xx я не встречал
	}
	//var infoHash = crc32(perf)+"/"+crc32(titl)+"/"+dur;
	
	//parseInt 
	// Поиск идентичного элемента
	for(j=0;j<=audioList.length-1;j++) {
		if (audioList[j]['perf'] == perf && audioList[j]['titl'] == titl && Math.abs(len-audioList[j]['len']) <= 5) {
			if (showDublCount) {
				audioList[j]['count']++;
				document.getElementById("audioInfo"+audioList[j]['id']).innerHTML = "("+audioList[j]['count']+")";
			}
			return false;
		}
	}
	
	var arr = new Array();
	arr['perf'] = perf;
	arr['titl'] = titl;
	arr['len'] = len;
	arr['id'] = id;
	arr['count'] = 0;
	audioList.push(arr);
	
	return true;
}

// ### /profile.php или id*
if (location.pathname == '/profile.php' || location.pathname.substring(0,3) == '/id') {
	
	// Ссылки на удалённой странице
	var reg = new RegExp(/<div style=\"margin: 100px auto; font-size: 14px; text-align: center; height: 200px;\">([^<]*)<\/div>/);
	if (reg.test(document.getElementById("userProfile").innerHTML) && useLinks) {
		var userid = getIDFromURI();
		var deletedLinks;
		if (!horLinks) {
			deletedLinks = "<div style=\"margin: 100px auto; font-size: 14px; text-align: center;\">$1<\/div><br><div id=\"leftColumn\"><div id=\"profileActions\">"+getLinksForDeleted(userid).join("\n")+"<\/div><\/div>"
		} else {
			deletedLinks = "<div style=\"margin: 100px auto; font-size: 14px; text-align: center;\">$1<\/div><div><center>| "+getLinksForDeleted(userid).join(" | ")+" |</center><\/div>";
		}
		document.getElementById("userProfile").innerHTML = document.getElementById("userProfile").innerHTML.replace(reg,deletedLinks);
	}
	
	// Подтверждение отправки анонимного мнения
	if (document.getElementById("opinions") != null && confirmOpinion) {
		var element = document.getElementById("opinions").getElementsByTagName("span")[0];
		element.innerHTML = element.innerHTML.replace(/<a href=\"javascript: postOpinion\(\)\">([^]+)<\/a>/,"<a href=\"javascript:if(confirm('Вы действительно хотите отправить анонимное сообщение?')){postOpinion();}\">$1<\/a>");
	}
	
	// группы списком
	if (groupList || clearGroup) {
		var groups =  getElementByClassName(document.getElementById("groups"),'div','flexBox clearFix aPad');
		var fJoin = ' ▪ ';
		var suffix = '';
		if (groupList) {
			fJoin = '<br>';
			//suffix = '»&nbsp;&nbsp;';
			suffix = '<img src='+getGroupImageBase64()+'>&nbsp;&nbsp;';
		}
			
		var list = groups.innerHTML.match(/<a href=.*?<\/a>/g);
		var components;
		for (i in list) {
			
			components = list[i].match(/<a href=\"(.*?)\">(.*?)<\/a>/);
			if (clearGroup) {
				components[2] = clearString(components[2]);		// очищаем
				components[2] = correctString(components[2]);	// В верхний регистр
			}
			// Удаляем пустые группы
			if (components[2] == '')
				components[2] = 'Без названия';
			
			list[i] = suffix+"<a href='"+components[1]+"'>"+components[2]+"</a>";
		}
		groups.innerHTML = list.join(fJoin);
	}

}


// ##########################################################################################################
// #################################
// #################################                     Новые сообщения
// #################################
// ##########################################################################################################  
var xmlhttp;
var chkInboxInterval;
if (location.pathname == '/mail.php' && !GET['out']) {		// только на первой странице входящих
	
}
if (checkNewMessages) {
	chkInboxInterval = setInterval(downloadInbox,checkNewMessagesTimeout*1000);
}
function downloadInbox() {
	xmlhttp = getXMLhttp();
	xmlhttp.open('GET', '/mail.php', true);
	xmlhttp.onreadystatechange = parseInbox;
	xmlhttp.send(null);
}
function parseInbox() {
	if (xmlhttp.readyState == 4) {
		var el = document.createElement('div');
		el.innerHTML = xmlhttp.responseText;
		var unreadMesIds = getUnreadMessagesIds(el);
		newMessageHandler(unreadMesIds.length,unreadMesIds);
	}
}
// получаем все id непрочитанных сообщений
function getUnreadMessagesIds(element) {
	var n = 0;
	var arr = new Array();
	var elements = element.getElementsByTagName('input');
	for (i=0;i<=elements.length-1;i++) {
		if (elements[i].id.indexOf('0msg') == 0) 
			arr.push(elements[i].value);
	}
	return arr;
}
	
function setMessCountOnMenu(count) {
	var el = document.getElementById('messageMenuItem').getElementsByTagName('b');	
	if (el.length > 0) {		
		if (count == 0) 		// удаляем 
			document.getElementById('messageMenuItem').innerHTML = document.getElementById('messageMenuItem').innerHTML.replace(/ \(<b>[0-9]+?<\/b>\)/,'');
		else
			el[0].innerHTML = count;
	} else if (count>0) {
		document.getElementById('messageMenuItem').innerHTML += ' (<b>'+count+'</b>)';	
	}
}
// Событие на новое сообщение
function newMessageHandler(count,messIds) {
	// Меняем в меню
	setMessCountOnMenu(count);
	
	var oldCount = GM_getValue('messagesCount',0);
	GM_setValue('messagesCount',count);	
	
	if (messIds == undefined && count - oldCount == 1 && popupReply) {		// Если есть новое сообщение ОДНО, то скачиваем его Id
		downloadInbox();
		return;
	}
	
	if (count > oldCount && popupMessage && (!popupReply || count - oldCount > 1)) {
		showDialog('Сообщение','<center><h2>У вас '+count+getNumericalStr(count,' новое сообщение',' новых сообщения',' новых сообщений')+'.</h2></center>','','Ок','',hideFunc());
	}
	
	// Если только однo сообщение и окно ответа неактивно
	if (count - oldCount == 1 && popupReply) {
		if (document.getElementById('replyBoxOpened') == null || document.getElementById('replyBoxOpened').value != 'true') {
			setMessCountOnMenu(count-1);		// сейчас сообщение будет прочтено
			downloadMessage(messIds[0]); 		// прочли
			GM_setValue('messagesCount',count-1);
		}
	}
}

var messageID;
function downloadMessage(id) {
	messageID = id;
	xmlhttp = getXMLhttp();
	xmlhttp.open('GET', '/mail.php?act=show&id='+id, true);
	xmlhttp.onreadystatechange = showReplyBox;
	xmlhttp.send(null);
}
function showReplyBox() {
	if (xmlhttp.readyState == 4) {
		var element = document.createElement('div');
		element.innerHTML = xmlhttp.responseText;
		var content = element.getElementsByTagName('table')[1].innerHTML;
		
		if (document.getElementById('replyBoxOpened') == null)
			document.getElementsByTagName("body")[0].innerHTML += "<input type='hidden' name='replyBoxOpened' id='replyBoxOpened' value='true'>";
		else
			document.getElementById('replyBoxOpened').value = 'true';
			
		// Исправляем интерфейс
		document.getElementsByTagName("head")[0].innerHTML += "<link rel='stylesheet' href='css/mail2.css' type='text/css'>";
		document.getElementsByTagName("head")[0].innerHTML += "<link rel='stylesheet' href='css/dialog2.css' type='text/css'>";
		content = content.replace(/<td class=\"label\"([^>]*)>([^<]+)<\/td>/g,"<td class='label'$1><font color='gray'><b>$2</b></font></td>");
		content = content.replace(/reply_field/g,'reply_to_mess');		// меняем ID на уникальные
		content = content.replace(/postMessage/g,'postMessage_2');		//
		content = content.replace(/<ul class=\"nNav\">[^]*?<\/ul>/,'<a href="mail.php?act=do_delete&amp;id='+messageID+'&amp;out=0">Удалить</a>');
		content = content.replace(/<ul class=\"nNav\">[^]*?<\/ul>/,'');
		
		showDialog('Сообщение','<table>'+content+'</table>','Закрыть','Отправить',"document.getElementById('replyBoxOpened').value = 'false';"+hideFunc(),"this.disabled=true; if (ge('to_reply').value.length > 1) {ge('postMessage_2').submit();} else {alert('Вы не ввели текст сообщения.'); return false;};"+hideFunc(),485);
	}
}
	
// ##########################################################################################################
// #################################
// #################################                     Поиск видео
// #################################
// ##########################################################################################################  

var resultsContainer;
var videosPerPage = 100;
var xmlhttp;
var searchWords;
var currPage = 0;
var lastpage = 0;
var foundVideos = 0;
var strForCountFound = '';
var elemForCountFound;
var timeout;
var loaderImage = "<div align='center' id='vkLoadImg' style='display: none'><img style='position: absolute;top: 107px;' src='"+getLoaderImageBase64()+"'>" +
				"<b><span style='font-size:10px;color: gray; position: absolute; top: 109px;' id='vkPerc' title='Поиск видео'></span></b></div>";
if (location.pathname == '/video.php' && GET['gid'] && searchVideo) {
	// Добавляю панель поиска
	var gid = GET['gid'];
	var column = getElementByClassName(document.getElementById('bigResult'),'div','column results');
	var vkpSearch = GET['vkpSearch']?GET['vkpSearch']:'';
	column.innerHTML = "<div id='searchVideo' style='margin: -5px 0px 5px; text-align: right;'><form method='GET' action='video.php' name='vSearch' id='vSearch'>"+
  						"<input name='gid' value='"+GET['gid']+"' type='hidden'>"+
						"<span class='sWord'>Поиск</span> <input class='inputText inputSearch' id='quickquery' name='vkpSearch' size='20' value='"+vkpSearch+"' style='width: 150px;' type='search'>"+
  						"<input style='display: none;' class='inputSubmit' value='Go' type='submit'></form></div>"+loaderImage+column.innerHTML;
  	
  	vkpSearch = clearString(vkpSearch);
	if (vkpSearch != '') {
		resultsContainer = getElementByClassName(document.getElementById('bigResult'),'div','result_wrap');
		
		showLoader();
		// Получаю кол-во страниц и убираю номера страниц
		var pageLists = getAllElementsByClassName(document.getElementById('content'),'ul','pageList');
		
		if (pageLists.length > 0) {
			var pageLinks = pageLists[0].getElementsByTagName('a');
			lastpage = pageLinks[pageLinks.length-1].href.match(/[&?]st=([0-9]+)/)[1]/videosPerPage;
			pageLists[0].innerHTML = '';
			pageLists[1].innerHTML = '';
		} 
		
		// Строка для кол-ва найденных
		elemForCountFound = getElementByClassName(document.getElementById('bigSummary'),'div','summary');
		strForCountFound = elemForCountFound.innerHTML;
		// Заголовок
		var element = document.getElementById('header').getElementsByTagName('h1')[0];
		element.innerHTML = element.innerHTML.replace(/ » (.+)/," » <a href='/video.php?gid="+gid+"'>$1</a>");
		searchWords = getWordsForSearch(GET['vkpSearch']);
		var buff = document.createElement('div');
		
		getSearchResult(searchWords,document.documentElement,buff);	// поиск по текущей странице в буфер
		
		resultsContainer.innerHTML = '';
		resultsContainer.innerHTML = buff.innerHTML;
		
		currPage = 0;
		getVideopage(currPage,i);
	}
}
function getVideopage(gid,page) {	
	xmlhttp = getXMLhttp();
	xmlhttp.open('GET', '/video.php?gid='+gid+'&st='+page*videosPerPage, true);
	xmlhttp.onreadystatechange = parseVideoPage;
	timeout = setTimeout( function(){ xmlhttp.abort(); getVideopage(gid,page) }, searchVideoTimeout*1000);
	xmlhttp.send(null);	
}




function parseVideoPage() {
	if (xmlhttp.readyState == 4) {
		clearTimeout(timeout);
		var el = document.createElement('div');
		el.innerHTML = xmlhttp.responseText;
		getSearchResult(searchWords,el);
		
		setPercent(100/lastpage*currPage);
		if (currPage<lastpage) {
			currPage++;
			getVideopage(gid,currPage);
		} else {
			hideLoader();
			if (foundVideos == 0)
				showNotFound();
		}
			
	}
}
function setPercent(per) {
	document.getElementById('vkPerc').innerHTML = strRepeat('&nbsp;',7)+Math.round(per*100)/100+'%';
}
function setCountFoundedVideos(count) {
	elemForCountFound.innerHTML = strForCountFound + "<span class='divider'>|</span> <b>Найдено "+count+" "+getNumericalStr(count,'видеофайл','видеофайла','видеофайлов') + '.';
}
function hideLoader() {
	document.getElementById('vkLoadImg').style.display = 'none';
}
function showLoader() {
	document.getElementById('vkLoadImg').style.display = '';
}
function showNotFound() {
	document.getElementById('bigResult').innerHTML += '<div class="fallBack">Не найдено ни одной видеозаписи с подобным названием или описанием.</div>';
}
function getSearchResult(searchWords,docum,buff) {
	var allElements = getAllElementsByClassName(docum,'div','result clearFix');	
	var words = new Array();
	var title;
		
	if (buff == undefined)
		buff = resultsContainer;
	var t = 0;

	for (r in allElements) {
		
		title = getVideoTitle(allElements[r]);
		words = getWordsForSearch(title);
		
		if (countArrDiffs(words,searchWords) == 0) {
			buff.appendChild(allElements[r]);
			foundVideos++;
			setCountFoundedVideos(foundVideos);
		}

	}
}

function getVideoTitle(element) {
	return getElementByClassName(element,'div','aname').getElementsByTagName('a')[0].innerHTML;
}
function getWordsForSearch(str) {
	str = str.replace(/[^a-zA-Z0-9а-яА-Я ]/g,' ');
	str = str.toLocaleLowerCase();
	return clearString(str).split(' ');
}

// ## /settings.php
// ##########################################################################################################
// #################################
// #################################                     Настройки
// #################################
// ##########################################################################################################    
if (location.pathname == '/settings.php') {
	var contentElements = document.getElementById("content").getElementsByTagName("div");
	var menuElements;
	var editorPanelElements;
	for (i=0;i<=contentElements.length-1;i++) {
		if (contentElements[i].className == "clearFix tBar") {
			menuElements = contentElements[i].getElementsByTagName('ul')[0];
		}
		if (contentElements[i].className == "editorPanel clearFix") {
			editorPanelElements = contentElements[i];
			break;
		}
	}
	
	if (GET['act'] != 'vkScripts') {
		// Добавляем нашу вкладку
		menuElements.innerHTML += '<li>'+settInActiveLink('VKScripts','?act=vkScripts','6em')+'</li>';
		
	} else {
		// Убираем активность основной вкладки
		var settLink = menuElements.getElementsByTagName('li')[0];
		var settLinkA = settLink.getElementsByTagName('a')[0];
		settLink.innerHTML = settInActiveLink(settLinkA.innerHTML,'/settings.php',settLinkA.style.width);
		settLink.className = '';
		
		// Добавляем нашу вкладку
		menuElements.innerHTML += '<li>'+settInActiveLink('VKScripts','?act=vkScripts','6em')+'</li>';
		
		editorPanelElements.innerHTML = "     <div id=\"cname\" class=\"settingsPanel\">"+
		"<small><center><font color='#98A7B5'>Bерсия:<b> "+SCRIPT_VERSION+" </b></font></center></small><br><h4>Настройки</h4>"+
		"<form method=\"GET\" id=\"vkScriptsSettings\" name=\"vkScriptsSettings\" action=\"\"><input type=\"hidden\" name=\"act\" value='vkScripts'><input type=\"hidden\" name=\"vkScripts\">"+
		"<table class=\"editor\" style=\"margin-left: 0px; width: 420px;\" border=\"0\" cellspacing=\"0\">"+
		"<tbody>"+
			settCheckbox('inviz',				'Невидимка',			'Невидимость В Контакте.')+
			//settCheckbox('grafiti',				'Графити',				'Отправить картинку на стенку.')+
			settCheckbox('count_audio',			'Cчетчик аудио',		'Cчетчик аудиозаписей.')+
			settCheckbox('serch_audio_border',	'Ячейка аудио',			'Ячейка для аудио при поиске.')+
			settCheckbox('regulator_audio',		'Регуляторы аудио',		'Аудио регуляторы.')+
			settCheckbox('rotate_img_foto',		'Поворот фото',			'Картинки поворота фото вправо и влево.')+
			settCheckbox('link_del_comm_album',	'Удалить комментарии',	'Линк на удаления всех комментариев с фотоальбома.')+
			settCheckbox('video_foto_in_board',	'Видео и фото на стенке','Видео и фото на стенке показываются всегда.')+
			settCheckbox('textarea_lines',		'Поле сообщения в клеточку','Поле ввода сообщения в клеточку.')+
			settCheckbox('online_blink',		'Онлайн - мигает',		'Надпись Онлайн мигает.')+
			settCheckbox('audio_auto_play',		'Автозапуск аудио',		'Автоматический запуск аудио.')+
			settCheckbox('out_from_all_groups',	'Выход со всех групп',	'Линк на выход со всех групп.')+
			settCheckbox('useLinks',			'Ссылки',				'Добавить ссылки на разделы профиля для пользователей с недоступной страничкой.')+
			settCheckbox('fiends',				'Ссылки на друзей',		'Добавить ссылки на разделы профиля друга.')+
			settCheckbox('app_download',		'Приложения',			'Добавить ссылки на скачивание приложений.')+
			settCheckbox('app_download_prof',	'Приложения(Страница пользователя)',			'Добавить ссылки на скачивание приложений со страницы пользователя.')+

			settCheckbox('checkNewComments',	'Новые комментарии',	'Показать кол-во новых комментариев рядом с ссылкой в боковом меню.')+
			settCheckbox('downVideo',			'Скачать видео',		'Добавить ссылку для скачивания видео.')+
			settCheckbox('confirmOpinion',		'Подтверждение мнения',	'Запрашивать подтверждение перед отправкой анонимного мнения.')+
			settCheckbox('confirmGraffiti',		'Подтверждение граффити','Запрашивать подтверждение при переходе со странички рисования граффити.')+
			settCheckbox('directLinks',			'Прямые ссылки',		'Убрать промежуточную страницу при переходе по внешней ссылке.')+
			settCheckbox('inviteAll',			'Пригласить всех',		'Добавить кнопку для приглашения всех друзей в группу или на встречу (ограничение сайта: не более 40 человек в сутки).')+
			settCheckbox('searchVideo',			'Поиск видео',			'Добавить возможность поиска видео в группе.')+
			settTextbox('searchVideoTimeout',	'Таймаут',				'Макс. время закачки одной стр. при поиске видео в секундах.','20px')+	
			settCheckbox('removeMe',			'Удалить себя',			'Добавить кнопки для быстрого удаления отметки о себе на фотографии или видео.')+	
			settCheckbox('removeBanners',		'Убрать рекламу',		'Убирает невидимые фреймы с баннерами.')+
				
				
						
			settLine('Внешний вид')+
			settCheckbox('new_menu',			'Графическое меню',		'Графическое меню В Контакте <br>Внимание! Конфликты с:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ссылка "Онлайн"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Магнитное меню<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Широкий контакт<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Меню справа')+	
			settCheckbox('rate',				'Рейтинг',				'Убрать рейтиг')+
			settCheckbox('ratetext',			'Надпись в рейтинге',	'Изменять надпись в рейтинге. Клацаем по рейтингу и изменяем надпись.(Измененный рейтинг виден только у себя. Ради своего удовольствия так сказать.)')+	
			settCheckbox('activity_history',	'История статусов',		'Ссылка на историю статусов пользователя.')+
			settCheckbox('clock_calendar',		'Часы + Календарик',	'Отображать часы + календарик. <br>Внимание! Конфликты с:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Графическое меню')+
			settCheckbox('friendsonline',		'Ссылка "Онлайн"',		'Скрипт добавляет ссылку "Онлайн" справа от Мои Друзья.')+	
			settCheckbox('main_status',			'Большой статус',		'Редактор статуса (вводишь что хочешь, и уводишь фокус с текстового поля).')+	
			settCheckbox('matches_in_stolbik',	'Предложения в столбик','Позволяет писать предложения в столбик.')+
			settCheckbox('menu_sideBar_fixed',	'Фиксированное меню',	'Позволяет зафиксировать меню.')+
			settCheckbox('showReply',			'Сообщение на стену',	'Всегда открывать поле для отправки сообщения на стену.')+
			settCheckbox('shortMenu',			'Короткое меню',		'Убрать слова “Мои” в боковом меню')+
			settCheckbox('hideMyInMenu',		'Затенить слово “Мои”',	'Затенить слова “Мои” в боковом меню.')+
			settCheckbox('newComments',			'Комментарии',			'Показать ссылку на комментарии в боковом меню.')+
			settCheckbox('horLinks',			'Ссылки горизонтально',	'Располагать ссылки на разделы горизонтально.')+
			settCheckbox('menuRightAlignment',	'Магнитное меню',		'Выравнивать пункты меню по правой стороне.')+
			settCheckbox('groupList',			'Группы списком',		'Показывать группы пользователя вертикальным списком.')+
			settCheckbox('clearGroup',			'Названия групп',		'Очистить названия групп.')+
			settCheckbox('invertTitle',			'Заголовок',			'Поменять в заголовке текущий раздел и имя сайта местами.')+
			settCheckbox('widescreen',			'Широкий контакт',		'Растянуть интерфейс сайта. При включении данной опции “Меню справа” будет игнорироваться.')+
			settCheckbox('rightMenu',			'Меню справа',			'Расположить боковое меню справа (при медленной работе может “прыгать”, конфликтует с функцией “Широкий контакт”).')+
			settCheckbox('new_cursor',			'Курсор',				'Измененный курсор.')+

			settLine('Cмайлы')+
			settCheckbox('smile_in_all',		'Смайлы везде',			'Отображать смайлы во всех страницах.')+
			settCheckbox('smile_in_message',	'Смайлы в сообщениях',	'Отображать смайлы в сообщениях.')+
			settCheckbox('smile_in_photo',		'Смайлы в фото',		'Отображать смайлы в фотографиях.')+
			settCheckbox('smile_in_video',		'Смайлы в видео',		'Отображать смайлы в видеозаписях.')+
			settCheckbox('smile_in_board',		'Смайлы на стенке',		'Отображать смайлы на стенке (только при написании сообщения на стене).')+


			settLine('Аудио')+
			settCheckbox('uniqAudio',			'Дубликаты mp3',		'Убрать повторяющиеся аудиозаписи.')+
			settCheckbox('showDublCount',		'Кол-во дубликатов',	'Показать кол-во дубликатов mp3.')+
			settCheckbox('downAudio',			'Скачать mp3',			'Добавить ссылки для скачивания mp3.')+
			settCheckbox('comfirmWhenPlaying',	'Прерывание аудио',		'Подтверждать переход со страницы во время проигрывания аудио.')+
			settCheckbox('removeAudiosAuthor',	'Авторы аудио',			'Убрать в результатах поиска ссылки на профили людей, выложивших аудиозапись.')+

			settLine('Фотографии')+
			settCheckbox('check_all_in_photo',	'Ссылка "Отметить всех"',		'Дополнительная ссылка к фотографии "Отметить всех"')+

			settLine('Сообщения')+
			settCheckbox('mess_bgcolor',		'Цвет сообщения',		'Изменяет цвет нового сообщения.')+
			settCheckbox('checkNewMessages',	'Проверка в фоне',		'Проверять периодически в фоне наличие новых сообщений.')+			
			settTextbox('checkNewMessagesTimeout','Интервал',			'Интервал между каждой проверкой новых сообщений в секундах.','20px')+	
			settCheckbox('popupMessage',		'Всплывающее окно',		'Показывать всплывающее окно при поступлении новых сообщений.')+
			settCheckbox('popupReply',			'Мгновенный ответ',		'Показывать сообщение полностью с возможностью ответа.')+	


			settLine('Администратор группы')+
			settCheckbox('admingroups_banlist',			'Бан лист',					'Дополнительные возможности работы с бан листом')+
			settCheckbox('banlink_user_in_group',		'Бан учасников группы',		'Над каждым учасником группы пишет БАН')+
			settTextbox('banlink_user_in_group_id_group','ID группы',				'ID группы, для "Бан учасников группы"','70px')+
			settCheckbox('look_banlist_in_open_group',	'Бан лист открытых групп',	'Просмотр бан листа открытых групп')+
				

		"</tbody></table>"+
		"<div style=\"height: 30px; margin-left: 143px;\">"+
		"<ul class=\"nNav\"><li>"+
		"<b class=\"nc\"><b class=\"nc1\"><b></b></b><b class=\"nc2\"><b></b></b></b>"+
		"<span class=\"ncc\"><a href=\"javascript:document.vkScriptsSettings.submit();\">Сохранить</a></span>"+
		"<b class=\"nc\"><b class=\"nc2\"><b></b></b><b class=\"nc1\"><b></b></b></b>"+
		"</li></ul></div></form></div>";
	}
}

// ##########################################################################################################
// #################################
// #################################                     Функции
// #################################
// ##########################################################################################################

//Смайлы везде
function smile_in_all_func() {
map = [
	['love',			/[:;]-\*|[:;]\*/gi],
	['angel',			/:angel:/gi],
	['applause',		/:applause:/gi],
	['barbarian',		/:barbarian:/gi],
	['bash',			/:bash:/gi],
	['book',			/:book:/gi],
	['cranky',			/:cranky:/gi],
	['crazy',			/\^_\^/gi],
	['dollar',			/:dollar:/gi],
	['evil',			/:evil:/gi],
	['eye',				/:eye:/gi],
	['faint',			/:faint:/gi],
	['flower',			/:flower:/gi],
	['fool',			/:fool:/gi],
	['good',			/:good:/gi],
	['hands',			/:hands:/gi],
	['heart',			/:heart:/gi],
	['hello',			/:hello:/gi],
	['hippy',			/:hippy:/gi],
	['holiday',			/:holiday:/gi],
	['icecream',		/:icecream:/gi],
	['lol',				/:lol:/gi],
	['love',			/:love:/gi],
	['lumped',			/:lumped:/gi],
	['moonw',			/:moonw:/gi],
	['nocomp',			/:nocomp:/gi],
	['nono',			/:nono:/gi],
	['poor',			/:poor:/gi],
	['pray',			/:pray:/gi],
	['rah',				/:rah:/gi],
	['roll',			/:roll:/gi],
	['shock',			/:shock:/gi],
	['sick',			/:sick:/gi],
	['sleep',			/:sleep:/gi],
	['snap',			/:snap:/gi],
	['sob',				/:sob:/gi],
	['suspect',			/:suspect:/gi],
	['sweated',			/:sweated:/gi],
	['wine',			/:wine:/gi],
	['angry',			/\)\(/gi],
	['biggrin',			/:D|:\)\)+|=\)\)+/gi],
	['biggrin',			/\)\)\)+/gi],
	['cool',			/B\)/gi],
	['cry',				/:\'\(/gi],
	['dry',				/\<_\</gi],
	['happy',			/\)_\(/gi],
	['sad',				/:\(+|:-\(+|=\(+|:-\[|:\[|=\[/gi],
	['smile',			/:\)+|:-\)+|=\)+|:-\]|:\]|=\]/gi],
	['surprised',		/:-\||:\||=\|/gi],
	['surprised',		/:o/gi],
	['tongue',			/:-[pСЂ]|:-[PР ]|:[p]/gi],
	['wacko',			/%\)/gi],
	['wink',			/;\)+|;-\)+/gi],
]

function xform(s) { 
  s = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  for (var i = 0; i < map.length; i++) 
  {
  
    s = s.replace(map[i][1], ' <img ' +
                                       'style="margin-bottom:-0.3em;"  ' +
                                       'src="http://s9.ucoz.net/sm/24/' +
                                        map[i][0] +'.gif" alt="" />')
  }
  return s;
} 

function smilize_node(text_node, p) {
  var s = text_node.data;
  
  var parent = p;
  if (!p) parent = text_node.parentNode;
  
  if (s.match(/\.write/)) {
    //alert(s);
    return;
  }
  
  try {
    // we need this 'cos node is text node.
    //var parent = text_node.parentNode;
    var new_node = document.createElement("span");
    var new_content = xform(s);
    if (new_content != s) {
      new_node.innerHTML = new_content;
      parent.replaceChild(new_node, text_node);
    }
  }catch(e) {    
    //alert(e);
  }
}

// replace in body text 
if (document.evaluate) { 
  //with XPath support
  var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  for (var i = 0; i < textnodes.snapshotLength; i++) { 
     node = textnodes.snapshotItem(i); 
     //node.data = xform(node.data);
     smilize_node(node, null);
  }
} else {
  // no XPath -- do recursive
  function processNode(node, parent) {
      // is this a text node?
      if (node.nodeType == 3) {
          //node.data = xform(node.data);
          smilize_node(node, parent);
      } else  if (node.nodeType == 1) {
        var i;                   
        for (i = 0; i < node.childNodes.length; i++) {
            processNode(node.childNodes[i], node);
        }
    }
  }
  processNode(document.body, document.body);
}
};

//Часы
function vkClock() {
document.getElementById('sideBar').innerHTML+='<br><div id=vkCl align=center  style="color: #2b587a; font-size: 22px; font-family: arial; font-weight: bold;">'+new Date().toLocaleString().split(' ')[4]+'</div><br>';
setInterval(function(){document.getElementById('vkCl').innerHTML=new Date().toLocaleString().split(' ')[4];},1000);
}

function makeClock(){
s=document.getElementById('sideBar')
d=document.createElement('span')
s.appendChild(d)
clock();
setInterval(clock,1000);
}

//Календарь
function daysInMonth(m,y) {
if (m==1) //feb
    if ((y%4 != 0) || (y%100 == 0 && y%400 != 0)) return 28
    else return 29
else //other months
    return [31,0,31,30,31,30,31,31,30,31,30,31][m]
}

function addCalendar(){
//table header
text='<table style="font-size:10px;" width="115"><tr style="background-color: #CFE0F0;"><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td style="color:blue;">Сб</td><td style="color:red;">Вс</td></tr><tr>';
//get 1st date's day of week
day=new Date()
today=day.getDate()
month=day.getMonth()
year=day.getFullYear()
day.setDate(1)
day=day.getDay()
day=(day)?day-1:6 //fix to russian notation
//fill the emptiness before
for(col=0;col<day;col++)
    text+='<td>&nbsp;</td>'
//col=day
//fill the main structure
last=daysInMonth(month,year)
for(day=1;day<=last;day++){
    style='';
	link1='';
	link2='';
    if(col==5)style+='color:blue; background-color: #CFE0F0; ';
    if(col==6)style+='color:red; background-color: #CFE0F0; ';
    if(day==today)style+='border:dotted thin; background-color: rgb(255, 247, 202);';
	//if(day==today){link1 +='<u><b><a href="#" style="cursor: hand; color:green;">'; link2+='</a></b></u>';}
    text+='<td style="'+style+'"><center>';
	text+=link1;
    text+=String(day);
	text+=link2;
    text+='</center></td>';

    if((col==6)&day!=last){
	col=0
	text+='</tr><tr>'
	}
    else col++
    }
//fill the emptiness after
for(;col<6;col++)
    text+='<td>&nbsp;</td>'
text+='</tr></table>'
s=document.getElementById('sideBar')
d=document.createElement('span')
a=document.createElement('a')
a.innerHTML=text
a.href='http://vkontakte.ru/events.php?act=calendar'
d.appendChild(a)
s.appendChild(d)
}

//Текст песни
function addLyric(id) {
	var audioRow = document.getElementById("audio"+id);
	

    var img = document.getElementById("imgbutton"+id);
	var str = img.getAttribute("onclick");
    var re=/operate\((\d+)[^0-9]+(\d+)[^0-9]+(\d+),[^0-9a-zA-Z]+([0-9a-zA-Z]+)/;
    var arr=re.exec(str);
    var user=arr[3];
    if (user<100000) {
   	user=parseInt(user)+100000;
  	user=(user.toString()).substr(1);
    }
    var span = document.getElementById("title"+id);
    var title=span.innerHTML.replace(/<[^>]+>/g,"");
    var artb=document.getElementById("performer"+id);
    var artist=artb.innerHTML.replace(/<[^>]+>/g,"");    
    var newdiv=document.createElement("div");
    var addon1=document.createElement("a");
		addon1.setAttribute("href",'http://www.lyricsplugin.com/wmplayer03/plugin/?artist='+encodeURIComponent(artist)+'&title='+encodeURIComponent(title));
     GM_xmlhttpRequest({
		    method: 'GET',
    url: 'http://www.lyricsplugin.com/ref/?tag='+encodeURIComponent(artist)+'|'+encodeURIComponent(title),
    headers: {
        'User-agent': 'Mozilla/5.0',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var rtxt = responseDetails.responseText; 
        if (rtxt) {
        
         img.setAttribute("alt",'http://www.songscroller.com/'+rtxt.substring(rtxt.indexOf("scroller.swf?song="),rtxt.indexOf("scroller_id")-24)+'4C6A8A&bcolor=FFFFFF');
       }
       }
		 });
    if (document.getElementById("audioBar")) {
		img.setAttribute('onClick', "ifr = window.content.document.getElementById('iframe1');this.style.color = '#cc0000'; ifr.src = this.alt;" +str);
	}
    addon1.setAttribute("target","_blank");
	addon1.setAttribute("class","addAudioLink");
    addon1.innerHTML="Текст";

    newdiv.appendChild(addon1);
    newdiv.className="duration";
    artb.parentNode.parentNode.appendChild(newdiv);
}

function addLyrics() {
	var parent = document.getElementById("audios");   
        if (!parent) {
	    parent = document.getElementById("bigResult");
        }
	if(parent){
		var audios = parent.getElementsByTagName("div");
		re=/audio(\d+)/;
		for (var i=0;i<audios.length;i++) {
		var m = audios[i].id.match(re);
			if (m) {
				addLyric(m[1]);
			}
		}
	}
}

function makeLyrics(){
var doc = window.content.document;
if (doc.getElementById("audioBar")) {
	s = doc.getElementById("audioBar");
	fr = doc.createElement("iframe");
	fr.setAttribute("height","200px");
	fr.setAttribute("scrolling","no");
	fr.setAttribute("id","iframe1");
	fr.setAttribute("name","lyrics_iframe");
	fr.setAttribute("src","");
	fr.setAttribute("style","BORDER: none; width: 172px; padding:2px; TOP: 100px; visibility:visible; scrolling:no");
	s.appendChild(fr);
}
}

//Скачивание приложений
function vkscripts_IDAppsProf_get() {
if (document.getElementById('mid') && !location.href.split('search.php')[1] && !location.href.split('browse.php')[1] && !location.href.split('people.php')[1]) {
	function runtimer(){
			timeout = setTimeout(function(){vkscripts_IDAppsProf_get_run()}, 5*1000);
		}
		runtimer();
		function vkscripts_IDAppsProf_get_run() {
mid = document.getElementById('mid').value;

if (document.getElementById('apps')) {
   var http_request = false;
    http_request = new XMLHttpRequest();
if (location.href.split('club')[1]) mid='-'+mid;
http_request.open("GET", "http://vkontakte.ru/apps.php?mid="+mid, false);
http_request.send("");
var response = http_request.responseText;
var apps = response.split('<div class="appRow">');
var list='';
for (i=1; i<apps.length; i++)
 list+='<li class="app"><a'+apps[i].split('style="padding-bottom:10px">')[1].split('<a')[1].split('</a>')[0].replace(/&amp;/gi,'&')+'</a></li>';
document.getElementById('apps').getElementsByTagName('ul')[0].innerHTML=list;
if (document.getElementById('apps')) {
var names = document.getElementById('apps').getElementsByTagName('li');
for (j= 0; j< names.length; j++)
  {
   var apid = names[j].innerHTML.replace(/&amp;/gi,'&').split('&id=')[1].split('"')[0];
   names[j].innerHTML=names[j].innerHTML+'<a align=right href="apps.php?act=quit&id='+apid+'">&nbsp;&nbsp;&nbsp;&nbsp;Удалить</a>';
  }
}
var names = document.getElementById('apps').getElementsByTagName('li');
for (j= 0; j< names.length; j++)
	{	
		
		var apid = names[j].innerHTML.replace(/&amp;/gi,'&').split('&id=')[1].split('"')[0];
		http_request.open("GET", "http://vkontakte.ru/apps.php?act=s&id="+apid, false);
		http_request.send("");
		var response = http_request.responseText;
		if (response.split("<embed")[1].split(">")[0]) {
			var slink = response.split("<embed")[1].split(">")[0];
			slink = slink.split('src="')[1].split('"')[0];
		} else {slink = ""}
		names[j].innerHTML=names[j].innerHTML+'<a align=right href="'+ slink+ '">&nbsp;&nbsp;&nbsp;&nbsp;Скачать</a>';
	}
}
}
}
}

function vkscripts_IDAppsList_get() {
if (location.href.split('mid')[1] && location.href.split('apps.php')[1] && !location.href.split('search.php')[1] && !location.href.split('browse.php')[1] && !location.href.split('people.php')[1]) {
    var http_request = false;
    http_request = new XMLHttpRequest();
var names = document.getElementById('searchResults').getElementsByTagName('ul');
for (j= 0; j< names.length; j++) {
var apid = names[j].getElementsByTagName('a')[0].href.split('&id=')[1];
http_request.open("GET", "http://vkontakte.ru/apps.php?act=s&id="+apid, false);
http_request.send("");
var response = http_request.responseText;
if (response.split(' id="noApps"')[1]) {
names[j].innerHTML+='<li><br>'+ response.split(' id="noApps">')[1].split('</div>')[0]+'</li>';
}
else {
var slink = response.split("<embed")[1].split(">")[0];
slink = slink.split('src="')[1].split('"')[0];
names[j].innerHTML+='<li><a href="'+ slink+ '"> Скачать </a></li>';
names[j].innerHTML+='<li><a href="apps.php?act=quit&id='+apid+'"> Удалить </a></li>';
}
}}
else if (location.href.split('=all')[0]) {
var n = $(".appRowFixed").length;
function disp(a_href, dom_el) {
	var http_request = false;
	http_request = new XMLHttpRequest();
	for (i = 0; i < n; i++) {
		apid = $(a_href[i]).attr('href').split('&id=')[1].split('&')[0];
		http_request.open("GET", "http://vkontakte.ru/apps.php?act=s&id="+apid, false);
		http_request.send("");
		var response = http_request.responseText;
		var slink = response.split("<embed")[1].split(">")[0];
		slink = slink.split('src="')[1].split('"')[0];
		$('<br>&nbsp;&nbsp;&nbsp;<a href="'+slink+ '">Cкачать</a>').insertAfter($(dom_el[i]).find("div:last"));
	}
}
disp( $(".dataWrap").get(), $(".appRowFixed").get());
}
}

//Невидимка
function Invis() {
	if ((getCookie('VKScriptInvis') == 'y')){
		var cok = document.cookie;

		if (cok.indexOf("remixpass") != -1) 
		{
			xmlhttpinviz = getXMLhttp();
			xmlhttpinviz.onreadystatechange = function() { 
				if (xmlhttpinviz.readyState == 3 || xmlhttpinviz.readyState == 4) {
					var aCookie = cok.split("; ");
					for (var i=0; i < aCookie.length; i++)
					{
						var aCrumb = aCookie[i].split("=");
						cookieName = aCrumb[0];
						cookieValue = unescape(aCrumb[1]);
              
						if (cookieName == 'remixemail' || cookieName == 'remixmid' || cookieName == 'remixmgid' || cookieName == 'remixsid' || cookieName == 'remixpass') {
							today = new Date();
							expire = new Date();
							expire.setTime(today.getTime()+3600000*24*365);
							document.cookie= cookieName+ "="+ escape(cookieValue)+";expires="+ expire.toGMTString()+'; path=/; domain=.vkontakte.ru';
						}

						cok = '';
					}
				}
			}
			xmlhttpinviz.open('GET', 'http://vkontakte.ru/login.php?op=logout');
			xmlhttpinviz.send(1);
		}
	}
}

//ф-я добавления надписи "онлайн"
function friends_online() {
	var link_li = document.getElementById("myfriends");
	if (link_li) {
		var link_online = document.createElement("a");
		link_online.setAttribute("href","friend.php?act=online");
		link_online.setAttribute("style","color:grey;");
		link_online.innerHTML="Онлайн";
		link_li.setAttribute("style","clear:both;");
		link_li.childNodes[0].setAttribute("style","width:67px;float:left;padding:3px 3px 3px 6px;margin-");
		link_li.appendChild(link_online);
	}
}

// Вставляем в код свой линки
function InputLinkCode(linkOk_label,linkOk_action){
		if (document.getElementById("password") != null) {
			code = "<div id=\"selfcode\"><table align='center'><tr><td align='center'><h4><a href=\"javascript://\" onclick=\""+linkOk_action+"\">"+linkOk_label+"</a></h4></td></tr></table></div>";
			document.getElementById("password").innerHTML += code;
		}
}

function InputLinkSaveBan(linkOk_label,linkOk_action){
		if (document.getElementById("password") != null) {
			code = "<div id=\"selfcodesave\"><table align='center'><tr><td align='center'><h4><a href=\"javascript://\" onclick=\""+linkOk_action+"\">"+linkOk_label+"</a></h4></td></tr></table></div>";
			document.getElementById("password").innerHTML += code;
		}
}

// Вставляем в код textarea+кнопки
function InputSelfCode(){
		if (document.getElementById("selfcode") != null) {
			regstr = 'start_session_admin_ban_loading();';
			buttonOk = "<input type=\"button\" id=\"Ok_button_session_admin_ban\" name=\"button1\" value=\"Готово\" onclick=\""+regstr+"\" />";
			buttonCancel = "<input type=\"button\" id=\"Cancel_button_session_admin_ban\" name=\"button2\" value=\"Отмена\" onclick=\"location.href='groups.php?act=banned&gid="+getIDFromURIgroup()+"'\"/>";
			code = "<table align='center'><tr><h4>Массовый бан</h4><td></td></tr><tr><td><textarea rows=\"20\" cols=\"50\" id=\"ban_list\"></textarea><br><div id=\"button_div_session_admin_ban\"><center>"+buttonOk+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+buttonCancel+"</center></div></td></tr></table>";
			document.getElementById("selfcode").innerHTML = code;
		}
}

// Вставляем в код textarea+бан лист
function InputSelfSaveCode(){
		if (document.getElementById("selfcodesave") != null) {
			code = "<table align='center'><tr><h4>Бан лист</h4><td></td></tr><tr><td><textarea rows=\"20\" cols=\"50\" id=\"ban_list_save\"></textarea></td></tr></table>";
			document.getElementById("selfcodesave").innerHTML = code;
		}

		if (document.getElementById("membersPanel").getElementsByTagName("a") != null) {
			//обработка формы
			var elements = document.getElementById("membersPanel").getElementsByTagName("a");
			for (i=0;i<=elements.length-1;i++) {
				if (elements[i].href.search(/\/profile\.php\?/) > -1) {
					document.getElementById("ban_list_save").value += elements[i].href+"\r\n";
				}
			}
		}
}

	function start_session_admin_ban (){
		var point = document.getElementById("servpoint_session_admin_ban").value;
		if (point < 1) {
			timer_session_admin_ban = window.setTimeout(function(){start_session_admin_ban()}, 1000);
		} 
		else {
			clearTimeout(timer_session_admin_ban);
			sstr = document.getElementById("ban_list").value;
			document.getElementById('selfcode').innerHTML = "<center><h4>Состояние запроса</h4><br><div id=\'statusidtext\' align=\'center\'><img src='images/progress7.gif'><br><br><h1>Обработка: </h1></div><div id=\'statusid\' align=\'center\'>0</div></center>";
			regwork_session_admin_ban_timer(sstr);
		}
	}

	function regwork_session_admin_ban_timer(memo) {
		timer_session_admin_ban_timer = window.setTimeout(function(){regwork_session_admin_ban(memo)}, 2000);
	}

	function regwork_session_admin_ban(s){
		if (s == "") {
			alert("Список пуст");
			InputSelfCode();
			document.getElementById('servpoint_session_admin_ban').value="0";
			start_session_admin_ban();
		}
		else {
			var str = s.replace(/\r\n|\r|\n/g," "); 
			str +=" ";
			var space = str.indexOf(" ");
			var resultstr = str.substring(0, space);
			str = str.replace(resultstr+" ","");
			regsend_session_admin_ban(resultstr,str);
		}
	}
	
	function regsend_session_admin_ban(resstr,s){
		if (resstr != "") {
			var req; 
			function loadXMLDoc(url) { 
				if (window.XMLHttpRequest) { 
					req = new XMLHttpRequest(); 
					req.onreadystatechange = processReqChange; 
					req.open("GET", url, true); 
					req.send(null); 
				} 
				else if (window.ActiveXObject) { 
					req = new ActiveXObject("Microsoft.XMLHTTP"); 
					if (req) { 	
						req.onreadystatechange = processReqChange; 
						req.open("GET", url, true); 	
						req.send(); 
					} 
				} 
			}  
	
			function processReqChange() { 
				ab = window.setTimeout("req.abort();", 5000);  
				if (req.readyState == 4) { 
					clearTimeout(ab); 
					if (req.status != 200) { 
						alert("Не удалось получить данные от сервера:n" + req.statusText); 
					} 
				}  
			} 
	
			loadXMLDoc("groups.php?act=ban&gid="+getIDFromURIgroup()+"&uid="+resstr); 
			regwork_session_admin_ban_timer(s);
			a = document.getElementById('statusid').innerHTML*1;
			document.getElementById('statusid').innerHTML = a+1;
		}
		else {
			clearTimeout(timer_session_admin_ban_timer);
			document.getElementById('statusidtext').innerHTML = "<h1>Выполнено:</h1>";
			document.getElementById('statusid').innerHTML = "<h1><font color=\"green\">"+document.getElementById('statusid').innerHTML + "</font> добавлено в бан лист.</h1><br><a href=\'groups.php?act=banned&gid="+getIDFromURIgroup()+"&admin=ban\'><h1>Добавить еще</h1></a>";
		}
	}
//ф-я поиска обновлений у друзей.
function find_user_updates_friends(id) {
	alert(id);
	for (i=0; i<=id.length-1; i++) {
		alert(id[i]);
		timeout_new_photo_with_friends = setTimeout(function(){new_photo_with_friends(id[i])}, 1000);
	}
	//
	//new_photo_with_friends(id);
	//new_photo_in_album_friends(id);
	//new_music_friends(id);
}

function new_photo_with_friends(id) {
	//загружаем страницу "Фотографии с..."
		//ф-я получения "Фотографии с..."
		clearTimeout(timeout_new_photo_with_friends);
		alert(id);

		xmlhttp_new_photo_with_friends = getXMLhttp();
		xmlhttp_new_photo_with_friends.open('GET', '/photos.php?act=user&id='+id, true);
		xmlhttp_new_photo_with_friends.onreadystatechange = check_new_photo_with_friends_XML;
		xmlhttp_new_photo_with_friends.send(null);

		function check_new_photo_with_friends_XML() {
			if (xmlhttp_new_photo_with_friends.readyState == 4) {
				check_new_photo_with_friends_Users(xmlhttp_new_photo_with_friends);
			}
		}

		function check_new_photo_with_friends_Users(responseDetails_new_photo_with_friends) {
			//alert(GM_getValue("11230203",0));
			if (responseDetails_new_photo_with_friends.status == 200) {
				//кол-во Фотографии с...
				var reguserinfo_new_photo_with_friends = new RegExp(/class=\"summary\"\>([0-9]*)\s/gi);
				while(res_new_photo_with_friends = reguserinfo_new_photo_with_friends.exec(responseDetails_new_photo_with_friends.responseText)) {
					//читаем с памяти для сравнения
					if (GM_getValue(id,0)) {
						old_photos_new_photo_with_friends = GM_getValue(id,0);
						results_new_photo_with_friends = res_new_photo_with_friends[1] - old_photos_new_photo_with_friends;
						if (results_new_photo_with_friends > 0) {
							document.getElementById("friendCont"+id).setAttribute('class','result');
							document.getElementById("friendCont"+id).style.backgroundColor = "#F5FEF7";
							GM_setValue(id,parseInt(res_new_photo_with_friends[1]));
						}
						else {
							//alert("new_comment_not_found");
							alert("nf - "+id);
						}
					} 
					else {
						//запись в память
						GM_setValue(id,parseInt(res_new_photo_with_friends[1]));
						alert("write to memory - "+id+" value - "+res_new_photo_with_friends[1]);
					}
				}
			}
		}
}


// Вкладка настроки
function settInActiveLink(title,href,width) {
	return "<a href='"+href+"' style='width: "+width+"; padding-top: 0pt;'><b class='niftycorners' style='background: transparent none repeat scroll 0% 0%; margin-left: 0px; margin-right: 0px; display: block; margin-bottom: 3px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;'><b style='border-style: solid; border-color: rgb(255, 255, 255); border-width: 0pt 2px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: transparent;'></b><b style='border-style: solid; border-color: rgb(255, 255, 255); border-width: 0pt 1px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: transparent;'></b></b>"+title+"</a>";
}
function settActiveLink(title,href,width) {
	return "<a href='"+href+"' style='width: "+width+"; padding-top: 0pt;'><b class='niftycorners' style='background: rgb(255, 255, 255) none repeat scroll 0% 0%; margin-left: 0px; margin-right: 0px; display: block; margin-bottom: 3px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;'><b style='border-style: solid; border-color: rgb(154, 177, 198); border-width: 0pt 1px; margin: 0pt 1px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: rgb(54, 99, 142);'></b><b style='border-style: solid; border-color: rgb(154, 177, 198); border-width: 0pt 1px; overflow: hidden; display: block; height: 1px; line-height: 1px; font-size: 1px; background-color: rgb(54, 99, 142);'></b></b>"+title+"</a>";
}

// Категория настройки
function settLine(title) {
	return "<tr><td colspan='3'><h4>"+title+"</h4></td></tr>";
}
// Добавить пункт настройки - галочка
function settCheckbox(name,title,desc) {
	var checked = getChecked(eval(name));
	return "<tr>"+
			"<td class=\"label\" style=\"text-align: right; vertical-align: top;\">"+title+"</td>"+
			"<td style=\"width: 20px; text-align: right; vertical-align: top;\">"+
			"<input id=\""+name+"\" name=\""+name+"\" value=\"1\" "+checked+" type=\"checkbox\"></td>"+
			"<td style=\"padding: 4px 0px 10px 10px; width: 280px; text-align: left;\"><small>"+desc+"</small>"+
			"</td>"+
			"</tr>";
}

// Добавить пункт настройки - строка
function settTextbox(name,title,desc,width) {
	var value = eval(name);
	return "<tr class='password confirm_password tallrow'>"+
			"<td class='label' style='text-align: right; vertical-align: top;'>"+title+"</td>"+
			"<td style='text-align: left; vertical-align: top;' colspan='2'>"+
			"<input id='"+name+"' name='"+name+"' value='"+value+"' type='text' style='width: "+width+";'> <br><small style=\"color: rgb(119, 119, 119);\">"+desc+"</small></td>"+
			"</tr>";
}

// Получить элемент по имени класса
function getElementByClassName(container,tag,className) {
	var elements = container.getElementsByTagName(tag);
	for (i in elements) {
		if (elements[i].className == className) {
			return elements[i];
		}
	}
}

// Получить все элементы по имени класса
function getAllElementsByClassName(container,tag,className) {
	var elements = container.getElementsByTagName(tag);
	var result = new Array();
	var findClasses = className.toLowerCase().replace(/\s+/g,' ').split(' ');
	var hereClasses;
	for (var i in elements) {
		hereClasses = elements[i].className.toLowerCase().replace(/\s+/g,' ').split(' ');
		if (countArrDiffs(hereClasses,findClasses) == 0) {
			result.push(elements[i]);
		}
	}
	return result;
}

// алиас 
function getElementsByClassName(className,tag,elem) {
	if (elem == undefined)
		elem = document;
	return getAllElementsByClassName(elem,tag,className);
}


// Показать всплывающее окно
function showDialog(title,text,buttOk_label,buttCancel_label,buttOk_action,buttCancel_action,width) {
	if (width == undefined) {
		width = 400;
	}
	
	var head = document.getElementsByTagName("head")[0];
	var cssLink = "css/box.css";
	if (head.innerHTML.indexOf(cssLink) == -1) {
		head.innerHTML += "<script src=\"js/box2.js\">";
		head.innerHTML += "<script src=\"js/box.js\">";
		head.innerHTML += "<link rel='stylesheet' href='css/box.css' type='text/css'>";
	}
	
	var buttonOk = "";
	if (buttOk_label != '')
		buttonOk = "<div id=\"button1Cont\" class=\"button1\" onmouseover=\"this.className='button1_hover';\" onmouseout=\"this.className='button1'\" onclick=\""+buttOk_action+"\"><div class=\"button1Line\"><div id=\"button1\">"+buttOk_label+"</div></div></div>";
	
	var buttonCancel = "";
	if (buttCancel_label != '')
		var buttonCancel = "<div id=\"button2Cont\" class=\"button2\" onmouseover=\"this.className='button2_hover';\" onmouseout=\"this.className='button2'\" onclick=\""+buttCancel_action+"\"><div class=\"button2Line\"><div id=\"button2\">"+buttCancel_label+"</div></div></div>";
	if (document.getElementById("boxFader") != null) {
		document.getElementById("boxFader").id = "nahui";
	}
	
	var boxBody = document.getElementById('boxBody');
	
	// из js/box.js
	var sctop = 0;
	var fw = 0, fh = 0;
	var left,top;
	if (self.innerWidth)
	{
		fw = self.innerWidth;
		fh = self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientWidth)
	{
		de = document.documentElement;
		fw = de.clientWidth;
		fh = de.clientHeight;		
		sctop = document.documentElement.scrollTop;		
	}
	// end
	left = fw / 2 - width / 2 + "px";
	//top = sctop + fh / 2 - bb.clientHeight / 2 - 50 + "px";
	
	document.getElementById("boxHolder").style.display='none';
	document.getElementById("boxHolder").innerHTML = "<div id=\"boxFader\" style=\"display: block; opacity: 1; left: "+left+"; top: 117.5px;\"><div style=\"width: "+width+"px;\" id=\"boxWrap\"><div style=\"display: block;\" id=\"boxBody\"><div id=\"nameLabel\"><div id=\"boxTitle\">"+title+"</div></div><div id=\"boxMessage\">"+text+"</div><div class=\"buttons\"><table align=\"right\"><tbody><tr><td>"+buttonCancel+"</td></tr></tbody></table><table align=\"right\"><tbody><tr><td>"+buttonOk+"</td></tr></tbody></table></div></div></div><iframe id=\"boxGoodFrame\" style=\"display: none; width: 1000px; height: 1000px;\"></iframe></div>";
	document.getElementById("boxHolder").style.display='';
	
}
// javascript ф-ия ддля скрытия Окна
function hideFunc() {
	return "var vkPath_faderTimer = 0;function vkPath_hideBox() {vkPath_faderTimer = setInterval(vkPath_fadeBox, 5);vkPath_fadeBox();}function vkPath_fadeBox() {var vkPath_boxfader = document.getElementById('boxFader');if (vkPath_boxfader.style.opacity <= 0.0) {clearInterval(vkPath_faderTimer);vkPath_faderTimer = 0;vkPath_boxfader.style.display='none'};vkPath_boxfader.style.opacity = vkPath_boxfader.style.opacity - 0.28;vkPath_boxfader.style.filter = 'alpha(opacity='+vkPath_boxfader.style.opacity*100+')';}vkPath_hideBox();";
}

// Ставить галку?
function getChecked(variable) {
	return variable ? 'checked="checked"' : '';
}

// Вырываем ID групы или URI
function getIDFromURIgroup() {
	var URIpart = location.search;
	if (URIpart.length > 0) {
		URIpart = URIpart.substring(1);
		URIargs = URIpart.split('&');
		for (i=0;i<=URIargs.length-1;i++) {
			if (URIargs[i].substring(0,3) == 'gid') {
				return URIargs[i].substring(4);
			}
		}
	}
}

// Вырываем ID пользователя ил URI
function getIDFromURI() {
	var URIpart = location.search;
	if (URIpart.length > 0) {
		URIpart = URIpart.substring(1);
		URIargs = URIpart.split('&');
		for (i=0;i<=URIargs.length-1;i++) {
			if (URIargs[i].substring(0,2) == 'id') {
				return URIargs[i].substring(3);
			}
		}
	}
	
	if (location.pathname.substring(0,3) == '/id')
		return location.pathname.substring(3);
}

// Формирование ссылок для удаленных страниц
function getLinksForDeleted(userid) {
	links = new Array();
	links[0] = "<a href=\"http://vkontakte.ru/wall.php?id="+userid+"\">Стена</a>";
	links[1] = "<a href=\"http://vkontakte.ru/notes.php?id="+userid+"\">Заметки</a>";
	links[2] = "<a href=\"http://vkontakte.ru/groups.php?id="+userid+"\">Группы</a>";
	links[3] = "<a href=\"http://vkontakte.ru/apps.php?mid="+userid+"\">Приложения</a>";
	links[4] = "<a href=\"http://vkontakte.ru/questions.php?mid="+userid+"\">Вопросы</a>";
	links[5] = "<a href=\"http://vkontakte.ru/opinions.php?id="+userid+"\">Мнения</a>";
	links[6] = "<a href=\"http://vkontakte.ru/video.php?act=tagview&id="+userid+"\">Видео с…</a>";
	links[7] = "<a href=\"http://vkontakte.ru/photos.php?act=user&id="+userid+"\">Фотографии с…</a>";
	links[8] = "<a href=\"http://vkontakte.ru/audio.php?id="+userid+"\">Аудио</a>";
	links[9] = "<a href=\"http://vkontakte.ru/video.php?id="+userid+"\">Видео</a>";
	links[10] = "<a href=\"http://vkontakte.ru/photos.php?id="+userid+"\">Фото</a>";
	return links;
}
// Формирование ссылок для недрузей
function getLinksForNotFriend(userid) {
	links = new Array();
	links[0] = "<a href=\"http://vkontakte.ru/notes.php?id="+userid+"\">Заметки</a>";
	links[1] = "<a href=\"http://vkontakte.ru/groups.php?id="+userid+"\">Группы</a>";
	links[2] = "<a href=\"http://vkontakte.ru/apps.php?mid="+userid+"\">Приложения</a>";
	links[3] = "<a href=\"http://vkontakte.ru/questions.php?mid="+userid+"\">Вопросы</a>";
	links[4] = "<a href=\"http://vkontakte.ru/video.php?act=tagview&id="+userid+"\">Видео с…</a>";
	links[5] = "<a href=\"http://vkontakte.ru/photos.php?act=user&id="+userid+"\">Фотографии с…</a>";
	links[6] = "<a href=\"http://vkontakte.ru/audio.php?id="+userid+"\">Аудио</a>";
	links[7] = "<a href=\"http://vkontakte.ru/video.php?id="+userid+"\">Видео</a>";
	links[8] = "<a href=\"http://vkontakte.ru/photos.php?id="+userid+"\">Фото</a>";
	return links;
}

// Формирование дополнительных ссылок для недрузей
function getLinksForNotFriend_dop(userid) {
	links = new Array();
	links[0] = "<a href='http://vkontakte.ru/rate.php?act=vote&id="+userid+"'>Рейтинг</a>";
	links[1] = "<a href='http://vkontakte.ru/friend.php?id="+userid+"'>Друзья</a>";
	links[2] = "<a href='http://vkontakte.ru/friend.php?act=online&id="+userid+"'>Друзья онлайн</a>";
	links[3] = "<a href='http://vkontakte.ru/opinions.php?id="+userid+"'>Мнения</a>";
	links[4] = "<a href='http://vkontakte.ru/gifts.php?id="+userid+"'>Подарки</a>";
	return links;
}

// Сериализация одномерного массива (текст должны быть однострочным)
function serializeArr(arr) {

	var str = "";
	for(i=0;i<=arr.length-1;i++) {
		str += arr[i]+"\n";
	}
	return str;
}
// Десериализация одномерного массива
function unserializeArr(str) {
	var arr = str.split("\n");
	arr.pop();
	
	return arr;
}

// Сообщение - Настройки сохранены
function showMessageSettSaved() {
	var contentElements = document.getElementById("content");
	message = 'Настройки vkScripts сохранены.';
	contentElements.innerHTML = contentElements.innerHTML.replace(/(<div class=\"clearFix tBar\">[^]+)<div class=\"editorPanel clearFix\">/,"$1<div id=\"messageWrap\"><div id=\"message\">"+message+"</div></div><div class=\"editorPanel clearFix\">");

}
// получить xmlhttp. Пока только для FF
function getXMLhttp() {
	return new XMLHttpRequest();
}

/**
*
*  Распарсивание URI для получения аналога массива GET в PHP
*  с какого-то сайта, модифицированная по Windows-1251
*
**/
function parseGET(str){  

	var anchor = "";
	var GET = Array(); 
	
    var str = location.search.substring(1);
    if(str.indexOf('#')!=-1)    
    {    
        anchor = str.substr(str.indexOf('#')+1); 
        str = str.substr(0,str.indexOf('#'));
    }

    params = str.split('&');
    for (i=0; i<params.length; i++)
    {
        var keyval = params[i].split('=');
        if (keyval[1] != undefined)
        	GET[keyval[0]]=win2unicode(unescape(keyval[1].replace(/\+/g,' ')));
    }
	return (GET); 
};


/**
*
*  Перекодировка из Windows-1251 в Unicode
*  http://xpoint.ru/know-how/JavaScript/PoleznyieFunktsii?38#EscapeSovmestimyiySRusskimiBuk
*
**/
function win2unicode(str) {
   var charmap   = unescape(
      "%u0402%u0403%u201A%u0453%u201E%u2026%u2020%u2021%u20AC%u2030%u0409%u2039%u040A%u040C%u040B%u040F"+
      "%u0452%u2018%u2019%u201C%u201D%u2022%u2013%u2014%u0000%u2122%u0459%u203A%u045A%u045C%u045B%u045F"+
      "%u00A0%u040E%u045E%u0408%u00A4%u0490%u00A6%u00A7%u0401%u00A9%u0404%u00AB%u00AC%u00AD%u00AE%u0407"+
      "%u00B0%u00B1%u0406%u0456%u0491%u00B5%u00B6%u00B7%u0451%u2116%u0454%u00BB%u0458%u0405%u0455%u0457")
   var code2char = function(code) {
               if(code >= 0xC0 && code <= 0xFF) return String.fromCharCode(code - 0xC0 + 0x0410)
               if(code >= 0x80 && code <= 0xBF) return charmap.charAt(code - 0x80)
               return String.fromCharCode(code)
            }
   var res = ""
   for(var i = 0; i < str.length; i++) res = res + code2char(str.charCodeAt(i))
   return res
}

/**
*
*  Получение значения cookies
*  http://www.codenet.ru/webmast/js/Cookies.php
*
**/
function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

function setCookie(c_name, value, expiredays) {
 var exdate=new Date();
 exdate.setDate(exdate.getDate()+expiredays);
 document.cookie=c_name+ "=" +escape(value)+
 ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}


/**
*
*  Javascript crc32
*  http://www.webtoolkit.info/
*
**/

function crc32 (str) {

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    str = Utf8Encode(str);

    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

    if (typeof(crc) == "undefined") { crc = 0; }
    var x = 0;
    var y = 0;

    crc = crc ^ (-1);
    for( var i = 0, iTop = str.length; i < iTop; i++ ) {
        y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
        x = "0x" + table.substr( y * 9, 8 );
        crc = ( crc >>> 8 ) ^ x;
    }

    return crc ^ (-1);

};


// очистка строки от припадков 
function clearString(str) {
			str = str.replace(/<br>/g,'');		
			str = str.replace(/ $/g,'');
			str = str.replace(/([^0-9]),(?=[^ .])/g,'$1, ');
			str = str.replace(/[^a-zA-Z0-9а-яА-Я(),.!?%№\-+|\\\/ ]+/g,'');	
			str = str.replace(/\s+/g,' ');
			str = str.replace(/^\s+/g,'');
			return str;
}
// Порядковые формы слова
// (число,вещь,вещи,вещей)
function getNumericalStr(num,str1,str2,str3) {
	num = num.toString();	
	var num2 = (num.length>1) ? num[num.length-2] : 0;
	num = num[num.length-1];
	num = parseInt(num);
	num2 = parseInt(num2);
	
	
	switch (num) {
		case 1:
			if (num2 == 1)
				return str3;
			else
				return str1;
		case 2:
		case 3:
		case 4:
			if (num2 == 1)
				return str3;
			else
				return str2;
		default:
			return str3;
	}
}
// Преобразование в верхний регистр первых букв каждого слова в предложении кроме однобуквенных слов
function correctString(str) {
	var words = str.split(' ');
	for (j in words) {
		if (words[j].length > 1) { 
			words[j] = words[j].substr(0,1).toLocaleUpperCase()+words[j].substr(1).toLocaleLowerCase();
		} 
	}
	return words.join(' ');
}
// Алерт для массивов
function aalert(arr) {
	alert(formatArray(arr,0));
}
// Преобразовывает многомерный массив в строку
function formatArray(arr,level) {
	if (level == undefined) {
		level = 0;
	}
	var str="";
	for (key in arr) {
		if (typeof(arr[key]) == 'object' && arr[key] instanceof Array) {
			str += "\n"+strRepeat("\t",level)+"["+key+"]: "+formatArray(arr[key],level+1);
		} else {
			str += "\n"+strRepeat("\t",level)+"["+key+"]: “"+arr[key]+"”";
		}
	}
	if (level == 0) {
		str = str.substr(1);
	}
	return str;
}

function strRepeat(str,n) {
	if (n <= 0) {
		return ''
	} else {
		return str+strRepeat(str,n-1);
	}

}

// Читаем параметры из GET и сохраняем в памяти
function setParams(arr) {
	for (i in arr) {
		if (arr[i]['default'] === true || arr[i]['default'] === false) {
			
			if (GET['vkScripts'] != undefined) 
				GM_setValue(arr[i]['name'],GET[arr[i]['name']]?true:false);
			
		} else {

			// число
			var tmpValue = GET[arr[i]['name']];
			if (arr[i]['default'] == '' && GET[arr[i]['name']] == '') {
				tmpValue = '';
			} else if ( arr[i]['min'] != undefined || arr[i]['max'] != undefined ) {
				if (arr[i]['isFloat'])
					tmpValue = parseFloat(tmpValue);
				else
					tmpValue = parseInt(tmpValue);
				
				if (isNaN(tmpValue)) {
					tmpValue = arr[i]['default'];
				}
				if (arr[i]['min'] != undefined && tmpValue < arr[i]['min']) {
					tmpValue = arr[i]['min'];
				}
				if (arr[i]['max'] != undefined && tmpValue > arr[i]['max']) {
					tmpValue = arr[i]['max'];
				}	
			}
			if (arr[i]['isFloat'] && GET[arr[i]['name']] != undefined)
				tmpValue = tmpValue.toString();
			
			if (GET[arr[i]['name']] != undefined) 
				GM_setValue(arr[i]['name'],(tmpValue != undefined)?tmpValue:arr[i]['default']);
						
		}
	}
}

// Читаем параметры из памяти
function getParams(arr) {
	var tmpValue;
	for (i in arr) {
		tmpValue = GM_getValue(arr[i]['name'],arr[i]['default']);	
		if (arr[i]['isFloat'])
				tmpValue = parseFloat(tmpValue);
		param[arr[i]['name']] = tmpValue;
	}
}

// Добавляет параметр для использования
// Имя,по умолчанию, минимум, максимум, дробное, читать всегда
// Если установлен min или max, то значение укладывается в эти границы
function addParam(name,def,min,max,isFloat) {
	var a = Array();
	if (def == undefined) 
		def = true;
	if (isFloat == undefined)
		isFloat = false;
	
	a['name'] = name;
	a['default'] = def;
	a['min'] = min;
	a['max'] = max;
	a['isFloat'] = isFloat;
	
	
	args.push(a);
}

// ##########################################################################################################
// #################################
// #################################                     Base64 Files
// #################################
// ########################################################################################################## 

function getLoaderImageBase64() {
	return "data:image/gif;base64,R0lGODlhEAAQAPYAAPf39wAAAM7Ozo+Pj11dXT4+PkJCQmpqap2dndXV1Z+fnyMjIyYmJi4uLjQ0NDw8PGdnZ7S0tBsbG25ubuXl5efn57y8vIaGhk1NTVtbW7i4uMrKyjg4OBUVFYiIiKWlpVlZWXh4eNvb24KCgg0NDWVlZZeXl2NjY7CwsERERAkJCaurq5GRkRcX"+
		"FwUFBeHh4e3t7XR0dICAgO/v735+fqOjo/Pz8/X19bq6usTExPHx8dDQ0Kmpqenp6czMzN3d3dfX18jIyMDAwLa2ttnZ2dLS0uvr69PT03Z2dq+vr62trUlJSU9PT1dXV19fX0BAQDo6Or6+vnJycjAwMOPj4ygoKIqKilVVVSoqKh0dHZubm0tLSxEREYSEhGFhYTIy"+
		"MsLCwsbGxt/f37Kysnp6eo2NjZmZmVNTU4yMjEdHR0ZGRiEhIaGhoQ8PDwsLC6enpwMDA5WVlSQkJBMTEzY2NnBwcCwsLAcHB2xsbB8fH1FRUWlpaXx8fAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjAD"+
		"AQAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaDERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGh"+
		"Ro5gwhIGAgAh+QQACgABACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9K"+
		"Q2FUkFQ5SWqsEJIAhq6DAAIBACH5BAAKAAIALAAAAAAQABAAAAeJgACCg4SFhQkKE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAU"+
		"LxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkEAAoAAwAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4"+
		"IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQACgAEACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3Q3Ze"+
		"ghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5BAAKAAUALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZN"+
		"J4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkEAAoABgAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjczrJBRZkGyNpCCRCw8vIUzHmXB"+
		"hDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAAKAAcALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSu"+
		"Nkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA";
}

function getDownloadImageBase64() {
	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJC"+
		"i4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwr"+
		"IsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgt"+
		"ADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62"+
		"Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUc"+
		"z5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTK"+
		"sz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJ"+
		"iBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwD"+
		"u4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmU"+
		"LCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWD"+
		"x4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09D"+
		"pFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5B"+
		"x0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnG"+
		"XOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZ"+
		"sOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWd"+
		"m7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJ"+
		"gUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6"+
		"P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCep"+
		"kLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9"+
		"rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaq"+
		"l+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw62"+
		"17nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi75"+
		"3GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28"+
		"T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70"+
		"VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAJlJREFUeNpiZGBgYJi18dj/o2euM5AC"+
		"rE00GdL8rRgZydGMbAgTuZoZGBgYjp65zsCCLrigKYmgxoS6eXA2CzbNF24+YpiwdA+KpoJoF4YJS/dgWMCEz3RiABMDhYAFl0RBtAv5BqD7n6ZeGHgDyEpIOA0gNQ0wMDAwMFmbaJLtfGsTTQZG"+
		"irMzAwMDw7t37/6T4wIhISFGwAAFFzM7AP5V3AAAAABJRU5ErkJggg==";
}
function getGroupImageBase64() {
	return "data:image/gif;base64,R0lGODlhEQAOAMQAAJSUlHp6eq2trfb29rm5ufr6+u3t7ebm5rKystbW1vT09PDw8O7u7t3d3b+/v/Ly8qSkpISEhMjIyPz8/Pj4+IiIiJCQkP7+/o+Pj4mJifv7+4uLi46Ojo2NjZmZmf///yH5BAAAAAAALAAAAAARAA4AAAW24HVlW/ddXJd9X9dV15kNiqQaR8Jl"+
		"y9JwnwmG0ZBwNj5JBLBIOCKsSgISqGAkDoxF6thgWCqOBXPcVDIWTmrzqUgICEHkMtHQOwqNprDhEAgaDh16QRoWExcUEyUCjQgbFBqKExyRBRpeEAIDBBsaAxd6GKB7fRYQCARWFJEkFAsFACsZVB4WeAYDaTgGACwcHgEQHRwDCQMqBxIPXxMAEQEeKTkLXg0EBiYf"+
		"EcQVLilH3hZ9HyEAOw==";
}


// Добавление ссылки на ЖЖ
if (document.getElementById('vkontakte')) {
	var link = document.createElement('li');
	link.innerHTML = '<a href=\"http://vkontakte.ru/club6438995" target=\"_blank\">VKScripts_by_Koss</a>';
	document.getElementById("bFooter").getElementsByTagName('ul')[0].appendChild(link);
}


// ##########################################################################################################
// #################################
// #################################                     vkontakte_widescreen_mod by vkchk
// #################################								vkchk@ya.org
// #################################
// ########################################################################################################## 
// vkontakte_widescreen_mod 0.0.2
// written by vkchk
// feel free to send bugs and suggestions to vkchk@ya.org
function vkontakte_widescreen_mod(width_inc) {
	if (width_inc == undefined || width_inc == null)
		width_inc = 400;

	// --------------------------------------------------------------------------------

	function setWidth(elementId,orig_width) {
	   var element = document.getElementById(elementId);
	   if ( element != null)
	      element.style.width = ( orig_width + width_inc ) + "px";
	}

	function setWidthClass(classname,type,orig_width) {
	   var elems = getElementsByClassName(classname, type);
	   
	   for (var i in elems){
	      elems[i].style.width = ( orig_width + width_inc ) + "px";
	   }
	}

	// whole page width -----------------------------------------------------------
	setWidth("pageLayout",791);
	setWidth("pageBody",632);


	// fucking header fix (maunal redrawing) --------------------------------------------------------------------------------
	var header = document.getElementById("pageHeader");


	var header_border = document.createElement("div");
	header_border.setAttribute("style","position:relative; left:-2px; width:" +(791+width_inc+2)+ "px; height: 42px; background-color:#A6BBCF; -moz-border-radius:0 0 8px 8px; z-index:-1; border: 1px solid #345E8C; border-top: 0px;"); //
	header.appendChild(header_border);

	header.setAttribute("style","height:41px; -moz-border-radius:0 0 8px 8px; background-image:url(http://antibox.org/images/vk_header_line.gif); background-repeat: repeat-x;");

	setWidth("pageHeader",791);


	var header_logo = document.createElement("div");
	header_logo.setAttribute("style","position:absolute; width:131px; height:25px; top:8px; left:11px; background-image:url(http://antibox.org/images/vk_logo.gif); background-repeat: none;");
	header_logo.innerHTML = "";
	header.appendChild(header_logo);


	var header_addon = document.createElement("div");
	header_addon.setAttribute("style","position:absolute; width:"+(630+width_inc)+"px; height:2px; top:43px; left:144px; background-color:#D5DDE6; border:1px solid #EAEEF3; border-top:0px; border-bottom:0px;");
	header_addon.innerHTML = "";
	var header_addon_inner = document.createElement("div");
	header_addon_inner.setAttribute("style","position:absolute; width:"+(630+width_inc-4)+"px; height:2px; top:0px; left:1px; background-color:#FBF3C4; border:1px solid #E4DDB4; border-top:0px; border-bottom:0px;");
	header_addon_inner.innerHTML = "";
	header_addon.appendChild(header_addon_inner);
	header.appendChild(header_addon);

	// profile view ---------------------------------------------------------------
	if (location.href.search(/vkontakte\.ru\/profile\.php/i) != -1 ||
	    location.href.search(/vkontakte\.ru\/id/i) != -1) {
	   // rightColomn
	   setWidth("rightColumn",396);
	   //dataWarp - right column of the self-description
	   setWidthClass("dataWrap", "div", 260);
	   setWidth("op_field",360);
	   setWidth("reply_field",360);
	}

	// news view ------------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/news\.php/i) != -1) {
	   //feedStory
	   setWidthClass("feedStory", "td", 510);
	}

	// friends view ---------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/friend\.php/i) != -1) {
	   //friendsCont
	   setWidth("friendsCont", 606);
	}

	// photos view ----------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/photos\.php/i) != -1) {
	   //feedStory
	   setWidthClass("results","div",606);
	   setWidthClass("aname", "div", 390);
	   setWidthClass("adesc", "div", 390);

	   setWidth("photocaptionleft",606);
	   setWidth("photoinfo",606);
	   setWidth("photocomment",400);
	   setWidth("commentArea",400);
	}

	// video view -----------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/video/i) != -1) {
	   setWidthClass("results", "div", 606);
	   setWidthClass("aname", "div", 390);
	   setWidthClass("adesc", "div", 390);
	   setWidth("videocaption",470);
	   setWidth("videoinfo",606);
	   setWidth("videocomment",400);
	   setWidth("reply_field",400);
	}

	// messages view --------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/mail\.php/i) != -1) {
	   setWidthClass("messageSnippet", "td", 300);
	   setWidth("dialog", 460);
	   setWidth("reply_field", 400);
	   document.getElementById("reply_field").style.height = "200px";
	   var elems = getElementsByClassName("formTable", "table");
	   for (var i in elems) {
	      elems[i].rows[1].cells[2].style.width = ( 285 + width_inc ) + "px";
	   }
	}                           

	// notes view -----------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/note/i) != -1) {
	   if (document.getElementById("notesBar") != null)
	      document.getElementById("notesBar").style.backgroundImage = "none";

	   var elems = getElementsByClassName("notesEdit", "div");
	   for (var i in elems) {
	      elems[i].style.backgroundImage = "none";
	   }
	   if (document.getElementById("sidePanel") != null){
	      document.getElementById("sidePanel").style.width = "140px";
	      document.getElementById("sidePanel").childNodes[1].style.paddingLeft = "0px";
	      setWidth("editFrame",448);
	   }
	   setWidth("mainPanel",451);
	   setWidthClass("note_body","div",350);
	   setWidth("comment",380);
	   setWidth("blogcomment",400);
	}

	// group list view ------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/groups\.php/i) != -1) {
	   setWidthClass("grouprow","div",594);
	   setWidthClass("info","td",468);
	}

	// group wiew -----------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/club/i) != -1) {
	   setWidthClass("left","div",395);
	   setWidthClass("dataWrap","div",260);
	}
	// group wiew -----------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/board/i) != -1 ||
	    location.href.search(/vkontakte\.ru\/topic/i) != -1 ) {
	   setWidthClass("postBody","div",420);

	}

	// apps wiew ------------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/apps/i) != -1) {
	   setWidthClass("appRowFixed","div",440);

	}

	// questions wiew -------------------------------------------------------------
	else if (location.href.search(/vkontakte\.ru\/questions/i) != -1) {
	   setWidthClass("text","div",410);
	   setWidth("reply_field",440);
	   setWidthClass("questionOut","div",584);
	   setWidthClass("questionOutTwo","div",582);

	   var elems = getElementsByClassName("questionInner", "div");
	   for (var i in elems) {
	      elems[i].parentNode.style.width = (width_inc + 520) + "px";
	   }
	}
}