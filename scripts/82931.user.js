//
// ==UserScript==
// @name          Dirty Service Pack 1.1
// @namespace     http://dirty.ru/
// @description   Dirty Service Pack 1.1
// @include       http://www.dirty.ru/*
// @include       http://dirty.ru/*
// ==/UserScript==


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Funtions and Params


* * * * * * * * * * * * * * * * * * * * * * * * * */


var _$ = {

	settings: {},
	location: window.location.href.split(window.location.host)[1],

	set_save: function(name,option){

		if(option.toString().indexOf('"')>-1){
			option = option.toString().replace(/"/g,'\\"');
		}

		if(document.cookie.indexOf('dsp.settings=')>-1){
			var param = unescape(document.cookie.split('dsp.settings=')[1].split(";")[0]);

			if(param.indexOf(name+':')>0){
			eval("var temp_name = name+':\"'+_$.settings."+name+".split('\"').join('\\\\\"')+'\"';");
				param = param.split(temp_name).join(name+':"'+option+'"');
			}
			else param = param.split('}').join(','+name+':"'+option+'"}');

			document.cookie = "dsp.settings="+escape(param)+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
			eval("_$.settings="+unescape(param));
		}
		else{
			document.cookie = "dsp.settings="+escape('{'+name+':"'+option+'"}')+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
		}
	},

	set_get: function(){

		if(document.cookie.indexOf('dsp.settings=')>-1){
			var param = unescape(document.cookie.split('dsp.settings=')[1].split(";")[0]);
			eval("_$.settings="+unescape(param));
		}
	},


	browser: function(){

		var string = navigator.userAgent.toLowerCase();
		var params = null;

		if(string.indexOf('opera/')>-1)
			params = {name:'opera',ver:string.split('opera/')[1].split(' ')[0]};

		else if(string.indexOf('firefox/')>-1)
			params = {name:'firefox',ver:string.split('firefox/')[1].split(' ')[0]};

		else if(string.indexOf('chrome/')>-1)
			params = {name:'chrome',ver:string.split('chrome/')[1].split(' ')[0]};

		else if(string.indexOf('safari/')>-1)
			params = {name:'safari',ver:string.split('safari/')[1].split(' ')[0]};

		else if(string.indexOf('msie ')>-1)
			params = {name:'ie',ver:string.split('msie ')[1].split(' ')[0]};

		else params = {name:'unknown',ver:'unknown'};

		return params;
	},

	$: function(id){

		return document.getElementById(id);
	},

	$t: function(name,obj){

		var obj = obj||document;

		return obj.getElementsByTagName(name);
	},

	$c: function(name,obj){

		var obj = obj||document;

		var Array = [];
		var checkArray = obj.getElementsByTagName('*');

		for(var i=0; i<checkArray.length; i++){

			if((' '+checkArray[i].className+' ').indexOf(' '+name+' ')>-1){
				Array[Array.length] = checkArray[i];
			}
		}

		return Array;
	},

	$f: function(name,element,val){

		var element = element||false;
		var val = val||false;
		var obj,rtn;

		if(document.forms[name]) obj = document.forms[name];
		else obj = name;

		if(element!==false){

			if(isNaN(element)) el = obj.elements[element];
			else el = obj.elements[parseInt(element)];

			if(val!==false){

				if(el.type) rtn = el.value;
				else rtn = el[el.selectedIndex].value;
			}
			else rtn = el;
		}
		else rtn = obj;

		return rtn;
	},

	toggle_div: function(name,param){

		if(param) document.getElementById(name).style.display = (param==1)?'block':'none';
		else document.getElementById(name).style.display = (document.getElementById(name).style.display=='none')?'block':'none';
	},

	current_scroll: function(){

		var scrollx = (document.scrollX)?document.scrollX:document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft;
		var scrolly = (document.scrollY)?document.scrollY:document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
		return {x:scrollx,y:scrolly}
	},

	element_position: function(el){

		var x = y = 0;

		if(el.offsetParent){
			x = el.offsetLeft;
			y = el.offsetTop;
			while(el = el.offsetParent){
				x += el.offsetLeft;
				y += el.offsetTop;
			}
		}
		return {x:x,y:y}
	},

	document_size: function(){

		var y = parseInt(Math.max(document.compatMode!='CSS1Compat'?document.body.scrollHeight:document.documentElement.scrollHeight,_$.viewarea_size().y));
		var x = parseInt(Math.max(document.compatMode!='CSS1Compat'?document.body.scrollWidth:document.documentElement.scrollWidth,_$.viewarea_size().x));
		return {x:x,y:y}
	},

	viewarea_size: function(){

		var y = parseInt(((document.compatMode||_$.browser().name=='ie')&&!window.opera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight:(document.parentWindow||document.defaultView).innerHeight);
		var x = parseInt(((document.compatMode||_$.browser().name=='ie')&&!window.opera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth:(document.parentWindow||document.defaultView).innerWidth);
		return {x:x,y:y}
	},

	scroll_position: function(y,x){

		var x = x||null;
		var y = y||null;

		if(x===null&&y===null){

			y = document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
			x = document.body.scrollTop?document.body.scrollLeft:document.documentElement.scrollLeft;
			return {x:x, y:y}
		}
		else{

			if(y!==null){
				if(document.body.scrollTop) document.body.scrollTop = y;
				else document.documentElement.scrollTop = y;
			}

			if(x!==null){
				if(document.body.scrollLeft) document.body.scrollLeft = x;
				else document.documentElement.scrollLeft = x;
			}
		}
	},

	ajaxLoad: function(url,ajaxCallBackFunction,callObject,params,ajaxCallBackErrorFunction){

		if(window.XMLHttpRequest){
			var ajaxObject = new XMLHttpRequest();
			ajaxObject.onreadystatechange = function(){
				_$.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
			};
			ajaxObject.open('GET',url,true);
			ajaxObject.send(null);
		}
		else if (window.ActiveXObject){
			var ajaxObject = new ActiveXObject('Microsoft.XMLHTTP');
			if (ajaxObject){
				ajaxObject.onreadystatechange = function(){
					_$.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
				};
				ajaxObject.open('GET',url,true);
				ajaxObject.send();
			}
		}
	},

	ajaxLoadPost: function(url, data, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction) {

		var ajaxObject = null;
	
		if(window.XMLHttpRequest) ajaxObject = new XMLHttpRequest();
		else if(window.ActiveXObject) ajaxObject = new ActiveXObject('Microsoft.XMLHTTP');

		if(ajaxObject){

			ajaxObject.onreadystatechange = function(){
				_$.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
			};
			ajaxObject.open('POST',url,true);
			ajaxObject.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			ajaxObject.setRequestHeader('Content-length',data.length);
			ajaxObject.setRequestHeader('Connection','close');
			ajaxObject.send(data);	
		};
	},

	ajaxLoadHandler: function(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction){

		if(ajaxObject.readyState==4){
			if(ajaxObject.status==200) ajaxCallBackFunction.call(callObject, ajaxObject, params);
			else{
				if(ajaxCallBackErrorFunction) ajaxCallBackErrorFunction.call(callObject, ajaxObject);	
//				else alert('There was a problem retrieving the XML data:\n'+ajaxObject.statusText);
			}
		}
	},

	addEvent: function(obj,sEvent,sFunc){
		if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
		else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
	},

	removeEvent: function(obj,sEvent,sFunc){
		if(obj.removeEventListener) obj.removeEventListener(sEvent,sFunc,false);
		else if(obj.detachEvent) obj.detachEvent('on'+sEvent,sFunc);
	},

	addCSS: function(cssStr){
		var head = _$.$t('head')[0];
		var styleSheets = head.getElementsByTagName('style');
		var styleSheet = null;
		if(styleSheets.length) styleSheet = styleSheets[styleSheets.length-1];
		else{
			styleSheet = document.createElement('style');
			styleSheet.type = 'text/css';
			head.appendChild(styleSheet);
		}
	
		if(styleSheet.styleSheet) styleSheet.styleSheet.cssText += cssStr;
		else styleSheet.appendChild(document.createTextNode(cssStr));
	},

	js_include: function(script){

		var new_js = document.createElement('script');
		new_js.setAttribute('type','text/javascript');
		new_js.setAttribute('src',script);
		document.getElementsByTagName('head')[0].appendChild(new_js);
	},

	event: function(e){

		e = e||window.event;

		if(e.pageX==null&&e.clientX!=null){
			var html = document.documentElement;
			var body = document.body;
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
		}

		if(!e.which&&e.button) e.which = e.button&1?1:(e.button&2?3:(e.button&4?2:0));

		return e;
	}
}

_$.set_get();

if(!_$.settings.use_pictures) _$.set_save('use_pictures',1);
if(!_$.settings.username_replace) _$.set_save('username_replace',0);
if(!_$.settings.posts_average) _$.set_save('posts_average',0);
if(!_$.settings.youtube_fullscreen) _$.set_save('youtube_fullscreen',1);
if(!_$.settings.tooltip_on) _$.set_save('tooltip_on',1);
if(!_$.settings.tooltip_show_self) _$.set_save('tooltip_show_self',1);
if(!_$.settings.favicon_on){ _$.set_save('favicon_on',1); _$.set_save('favicon_style',0); }
if(!_$.settings.colors_on) _$.set_save('colors_on',0);
if(!_$.settings.colors_border) _$.set_save('colors_border',1);
if(!_$.settings.colors){ _$.set_save('colors','[]');}


if(_$.location.indexOf('/off/')!=0){

	var dsp_general_bar = '';
	var dsp_general_param = '';
	var dsp_check_change_pictures = 1;
	var dsp_self_name = _$.$t('a',_$.$('header_tagline_inner'))[0].innerHTML;
	var dsp_self_num = _$.$t('a',_$.$('header_tagline_inner'))[0].href.split('dirty.ru/users/')[1].split('"')[0];


	function DSP_make_General_Bar(){

		var dsp_output = dsp_bars = dsp_params = '';
		var dsp_left_panel = _$.$c('left_col_nav')[0];

		for(var i=0; i<6; i++){
			dsp_bars += '<div id="dsp_setting_button_'+i+'" style="background-color:#edf1f6;width:140px;height:30px;line-height:30px;border-top:1px solid #edf1f6;border-right:1px solid #b6b6b6">&nbsp;</div>';
			dsp_params += '<div id="dsp_setting_'+i+'" style="padding:10px 0 0 10px;display:none;border-top:1px solid #b6b6b6"></div>';
		}

		dsp_output += '<br><div style="background: #fff url(http://pit.dirty.ru/dirty/1/2010/04/27/11119-033725-660249a537b6f5822a9918ea8835026b.png) 7px 4px no-repeat;height:50px;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9"><a id="dsp_setting_bar" style="cursor:pointer;text-decoration:underline;line-height:50px;margin-left:62px">Настройки</a></div>';
		dsp_output += '<div id="_$.settings" style="display:none;position:fixed;top:'+((_$.viewarea_size().y-300)/2)+'px;left:'+((_$.viewarea_size().x-500)/2)+'px;width:500px;height:300px;z-index:2999"><table cellspacing="0" cellpadding="0" border="0" width="500" height="300"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" valign="top">';
		dsp_output += '<table cellspacing="0" cellpadding="0" width="100%" border="0"><tr><td valign="top" colspan="2" height="30" style="font-size:14pt;color:#5880af">Разные штуки</td><td width="40" align="right" valign="top"><div id="dsp_setting_close" style="background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:8pt;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div></td></tr><tr><td valign="top" width="140" style="font-size:10pt">'+dsp_bars+'</td><td colspan="2" valign="top">'+dsp_params+'</td></tr></table>';
		dsp_output += '</td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table></div>';

		dsp_left_panel.innerHTML += dsp_output;

		_$.addEvent(_$.$('dsp_setting_bar'),'click',DSP_make_content_settings);
		_$.addEvent(_$.$('dsp_setting_close'),'click',function(){DSP_show_hide_menu('_$.settings')});
		dsp_general_bar = _$.$('dsp_settings_panels');
		dsp_general_param = _$.$('dsp_settings_props');
	}



	function DSP_make_Setting_Bar(title,params,init){

		var dsp_setting_id = 0;

		while(dsp_setting_id<6){
			if(_$.$('dsp_setting_button_'+dsp_setting_id).innerHTML.length<10) break;
			else dsp_setting_id++;
		}

		_$.$('dsp_setting_button_'+dsp_setting_id).style.borderTop = '1px solid #b6b6b6';
		_$.$('dsp_setting_button_'+dsp_setting_id).innerHTML += '<span style="margin-left:10px;cursor:pointer" id="dsp_setting_link_'+dsp_setting_id+'">'+title+'</span>';
		_$.$('dsp_setting_'+dsp_setting_id).innerHTML += params;
		eval(init);

		_$.addEvent(_$.$('dsp_setting_link_'+dsp_setting_id),'click',function(){DSP_show_hide_setting(dsp_setting_id)});
	}


	function DSP_show_hide_menu(name){

		var dsp_layer = _$.$(name);

		if(dsp_layer.style.display=='block') dsp_layer.style.display = 'none';
		else dsp_layer.style.display = 'block';
	}


	function DSP_show_hide_setting(num){

		var dsp_setting_id = 0;

		while(dsp_setting_id<6){

			if(_$.$('dsp_setting_'+dsp_setting_id).style.display=='block'){
				_$.toggle_div('dsp_setting_'+dsp_setting_id,0);
				_$.$('dsp_setting_button_'+dsp_setting_id).style.borderRight = '1px solid #b6b6b6';
				_$.$('dsp_setting_button_'+dsp_setting_id).style.backgroundColor = '#edf1f6';
				_$.$('dsp_setting_button_'+dsp_setting_id).style.fontWeight = 'normal';

				if(dsp_setting_id<5){

					if(_$.$('dsp_setting_button_'+(dsp_setting_id+1)).innerHTML=='&nbsp;'){
						_$.$('dsp_setting_button_'+(dsp_setting_id+1)).style.borderTop = '1px solid #edf1f6';
					}
					else{
						_$.$('dsp_setting_button_'+(dsp_setting_id+1)).style.borderTop = '1px solid #b6b6b6';
					}
				}
			}
			dsp_setting_id++;
		}

		_$.toggle_div('dsp_setting_'+num,1);
		_$.$('dsp_setting_button_'+num).style.borderRight = '1px solid #fff';
		_$.$('dsp_setting_button_'+num).style.backgroundColor = '#fff';
		_$.$('dsp_setting_button_'+num).style.fontWeight = 'bold';

		if(num<5) _$.$('dsp_setting_button_'+(num+1)).style.borderTop = '1px solid #b6b6b6';
	}


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Favicons


* * * * * * * * * * * * * * * * * * * * * * * * * */


	function DSP_show_favicon(obj,show){
		if(show==1){
			var favicon = 'http://favicon.yandex.ru/favicon/'+obj.toString().split('/')[2];
			obj.style.paddingTop='16px';
			obj.style.backgroundImage = 'url('+favicon+')';
			obj.style.backgroundRepeat = 'no-repeat';
		}
		else obj.style.backgroundImage = 'none';
	}


	
/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Username Replace


* * * * * * * * * * * * * * * * * * * * * * * * * */

function DSP_replace_username(option){

	var dsp_content_nodes = _$.$c('dt',_$.$('main'));
	var dsp_first = '%username%';
	var dsp_second = dsp_self_name;

	if(option==0){
		dsp_first = dsp_self_name;
		dsp_second = '%username%';
	}

	for(var i=0; i<dsp_content_nodes.length; i++){
		if(dsp_content_nodes[i].innerHTML.indexOf(dsp_first)>-1){
			dsp_content_nodes[i].innerHTML = dsp_content_nodes[i].innerHTML.split(dsp_first).join(dsp_second);
		}
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Color Picker + User Skiper


* * * * * * * * * * * * * * * * * * * * * * * * * */

var dsp_all_comments;
var dsp_color_user = '';

function DSP_paint_comment(name,color,font){

	if(color!='transparent'){
		color = '#'+color;
		font = '#'+font;
	}

	for(var i=0;i<dsp_all_comments.length;i++){

		if(_$.$t('a',dsp_all_comments[i])[1].innerHTML.toString()==name.toString()){

			if(color.toLowerCase()!='#ffffff'){
				dsp_all_comments[i].parentNode.style.backgroundColor = color;
				dsp_all_comments[i].parentNode.style.color = font;
				dsp_all_comments[i].style.color = font;

				if(color!='transparent') var link_color = (font=='#fff')?'#e3e3e3':'#393939';
				else var link_color = '';

				var div_links = _$.$t('a',dsp_all_comments[i].parentNode.parentNode);

				for(var j=0; j<div_links.length; j++){

					div_links[j].style.color = link_color;
				}

				_$.$t('span',_$.$t('span',dsp_all_comments[i])[0])[0].style.display = (color=='transparent')?'none':'inline';
			}
		}

		if(_$.settings.colors_border=='1'){

			if(dsp_all_comments[i].parentNode.parentNode.className.indexOf(' new ')>0){
				dsp_all_comments[i].parentNode.style.border = '1px solid red';
			}
		}
	}
}

function DSP_color_remove(obj){

	var user = _$.$t('a',obj.parentNode.parentNode.parentNode)[1].innerHTML;

	eval('var temp_array='+_$.settings.colors);

	for(var i=0; i<temp_array.length; i++){
		if(temp_array[i].indexOf(user+',')>-1){
			delete temp_array[i];
		}
	}

	_$.set_save('colors','["'+temp_array.join('","')+'"]');
	DSP_paint_comment(user,'transparent','');
}

function DSP_save_color(){

	var color = dsp_color_user.title.split('#').join('');
	var user = _$.$t('a',dsp_color_user.parentNode.parentNode)[1].innerHTML;
	var font = dsp_color_user.name;
	var checker = 0;

	eval('var temp_array='+_$.settings.colors);

	for(var i=0; i<temp_array.length; i++){
		if(temp_array[i].indexOf(user+',')>-1){

			temp_array[i] = user+','+color+','+font;
			checker = 1;
			break;
		}
	}

	if(checker==0) temp_array.push(user+','+color+','+font);

	_$.set_save('colors','["'+temp_array.join('","')+'"]');
}

var dsp_jscolor = {

	bindClass : 'dsp_color',
	binding : true,


	init : function() {
		if(dsp_jscolor.binding) {
			dsp_jscolor.bind();
		}
	},

	bind : function() {
		var matchClass = new RegExp('(^|\\s)('+dsp_jscolor.bindClass+')\\s*(\\{[^}]*\\})?', 'i');
		var el = _$.$t('a');
		for(var i=0; i<el.length; i+=1) {
			var m;
			if(!el[i].color && el[i].className && (m = el[i].className.match(matchClass))){
				var prop = {};
				if(m[3]) {
					try {
						eval('prop='+m[3]);
					} catch(eInvalidProp) {}
				}
				el[i].color = new dsp_jscolor.color(el[i], prop);
			}
		}
	},


	preload : function() {
		for(var fn in dsp_jscolor.imgRequire) {
			if(dsp_jscolor.imgRequire.hasOwnProperty(fn)) {
				dsp_jscolor.loadImage(fn);
			}
		}
	},


	images : {
		pad : [ 181, 101 ],
		sld : [ 16, 101 ],
		cross : [ 15, 15 ],
		arrow : [ 7, 11 ]
	},


	imgRequire : {},
	imgLoaded : {},


	requireImage : function(filename) {
		dsp_jscolor.imgRequire[filename] = true;
	},


	loadImage : function(filename) {
		if(!dsp_jscolor.imgLoaded[filename]) {
			dsp_jscolor.imgLoaded[filename] = new Image();
			dsp_jscolor.imgLoaded[filename].src = filename;
		}
	},


	fetchElement : function(mixed) {
		return typeof mixed === 'string' ? _$.$(mixed) : mixed;
	},


	fireEvent : function(el, evnt) {
		if(!el) {
			return;
		}
		if(document.createEventObject) {
			var ev = document.createEventObject();
			el.fireEvent('on'+evnt, ev);
		} else if(document.createEvent) {
			var ev = document.createEvent('HTMLEvents');
			ev.initEvent(evnt, true, true);
			el.dispatchEvent(ev);
		} else if(el['on'+evnt]) {
			el['on'+evnt]();
		}
	},


	dsp_getElementPos : function(obj) {
		var e1=obj, e2=obj;
		var x=0, y=0;
		if(e1.offsetParent){
			do{
				x += e1.offsetLeft;
				y += e1.offsetTop;
			} while(e1 = e1.offsetParent);
		}
		while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
			x -= e2.scrollLeft;
			y -= e2.scrollTop;
		}
		return [x, y];
	},


	getElementSize : function(el) {
		return [el.offsetWidth, el.offsetHeight];
	},


	getMousePos : function(e){
		if(!e) { e = window.event; }
		if(typeof e.pageX === 'number') {
			return [e.pageX, e.pageY];
		} else if(typeof e.clientX === 'number') {
			return [
				e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
				e.clientY + document.body.scrollTop + document.documentElement.scrollTop
			];
		}
	},


	getViewPos : function(){
		if(typeof window.pageYOffset === 'number') {
			return [window.pageXOffset, window.pageYOffset];
		} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			return [document.body.scrollLeft, document.body.scrollTop];
		} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
		} else {
			return [0, 0];
		}
	},


	getViewSize : function() {
		if(typeof window.innerWidth === 'number') {
			return [window.innerWidth, window.innerHeight];
		} else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
			return [document.body.clientWidth, document.body.clientHeight];
		} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else {
			return [0, 0];
		}
	},



	color : function(otarget, prop) {

		this.required = true;
		this.adjust = true;
		this.hash = false;
		this.caps = true;
		this.valueElement = otarget;
		this.styleElement = otarget;
		this.hsv = [0,0,1];
		this.rgb = [1,1,1];

		this.pickerOnfocus = true;
		this.pickerPosition = 'bottom';
		this.pickerFace = 10;
		this.pickerBorder = 0;
		this.pickerInset = 0;


		for(var p in prop) {
			if(prop.hasOwnProperty(p)) {
				this[p] = prop[p];
			}
		}

		this.showPicker = function(){
			if(!isPickerOwner()) {

				var tp = dsp_jscolor.dsp_getElementPos(otarget);
				var ts = dsp_jscolor.getElementSize(otarget);
				var vp = dsp_jscolor.getViewPos();
				var vs = dsp_jscolor.getViewSize();
				var ps = [
					2*this.pickerBorder + 4*this.pickerInset + 2*this.pickerFace + dsp_jscolor.images.pad[0] + 2*dsp_jscolor.images.arrow[0] + dsp_jscolor.images.sld[0],
					2*this.pickerBorder + 2*this.pickerInset + 2*this.pickerFace + dsp_jscolor.images.pad[1]
				];
				var a, b, c;
				switch(this.pickerPosition.toLowerCase()) {
					case 'left': a=1; b=0; c=-1; break;
					case 'right':a=1; b=0; c=1; break;
					case 'top':  a=0; b=1; c=-1; break;
					default:     a=0; b=1; c=1; break;
				}
				var l = (ts[b]+ps[b])/2;
				var pp = [
					-vp[a]+tp[a]+ps[a] > vs[a] ?
						(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
						tp[a],
					-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
						(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
						(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
				];

				drawPicker(pp[a]-28, pp[b]+26);

			}
		};


		this.exportColor = function(flags){
			if(!(flags & leaveValue) && valueElement){
				var temp_font = 0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? 'fff':'000';

				var value = this.toString();
				if(this.caps) value = value.toUpperCase();
				valueElement.title = value;
				valueElement.name = temp_font;

			}
			if(!(flags & leaveStyle) && styleElement) {
				var temp_font = 0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? 'fff':'000';

				var temp_color = this.toString().split('#').join();

				DSP_paint_comment(otarget.parentNode.parentNode.getElementsByTagName('a')[1].innerHTML,temp_color,temp_font);
			}

			if(!(flags & leavePad) && isPickerOwner()) {
				redrawPad();
			}
			if(!(flags & leaveSld) && isPickerOwner()) {
				redrawSld();
			}
		};


		this.fromHSV = function(h, s, v, flags) {
			h<0 && (h=0) || h>6 && (h=6);
			s<0 && (s=0) || s>1 && (s=1);
			v<0 && (v=0) || v>1 && (v=1);
			this.rgb = HSV_RGB(
				h===null ? this.hsv[0] : (this.hsv[0]=h),
				s===null ? this.hsv[1] : (this.hsv[1]=s),
				v===null ? this.hsv[2] : (this.hsv[2]=v)
			);
			this.exportColor(flags);
		};


		this.fromRGB = function(r, g, b, flags) {
			r<0 && (r=0) || r>1 && (r=1);
			g<0 && (g=0) || g>1 && (g=1);
			b<0 && (b=0) || b>1 && (b=1);
			var hsv = RGB_HSV(
				r===null ? this.rgb[0] : (this.rgb[0]=r),
				g===null ? this.rgb[1] : (this.rgb[1]=g),
				b===null ? this.rgb[2] : (this.rgb[2]=b)
			);
			if(hsv[0] !== null) {
				this.hsv[0] = hsv[0];
			}
			if(hsv[2] !== 0) {
				this.hsv[1] = hsv[1];
			}
			this.hsv[2] = hsv[2];
			this.exportColor(flags);
		};


		this.fromString = function(hex, flags) {
			var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
			if(!m) {
				return false;
			} else {
				if(m[1].length === 6) {
					this.fromRGB(
						parseInt(m[1].substr(0,2),16) / 255,
						parseInt(m[1].substr(2,2),16) / 255,
						parseInt(m[1].substr(4,2),16) / 255,
						flags
					);
				} else {
					this.fromRGB(
						parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
						parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
						parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
						flags
					);
				}
				return true;
			}
		};


		this.toString = function() {
			return (
				(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
			);
		};


		function RGB_HSV(r,g,b){
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if(m === 0) { return [ null, 0, v ]; }
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h,s,v){
			if(h === null) { return [ v, v, v ]; }
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0: return [v,n,m];
				case 1: return [n,v,m];
				case 2: return [m,v,n];
				case 3: return [m,n,v];
				case 4: return [n,m,v];
				case 5: return [v,m,n];
			}
		}


		function removePicker(){
			DSP_save_color();
			document.getElementsByTagName('body')[0].removeChild(dsp_jscolor.picker.boxB);
			_$.$("dsp_color_show_div").style.display = 'none';
			delete dsp_jscolor.picker;
		}


		function drawPicker(x,y){
			var dsp_color = _$.$("dsp_color_show_div");
			if(!dsp_color){
				document.body.appendChild(dsp_color = document.createElement('div'));
				dsp_color.id = 'dsp_color_show_div';
				dsp_color.style.position = 'absolute';
				dsp_color.style.zIndex = 1399;
				dsp_color.innerHTML = '<table cellspacing="0" cellpadding="0" width="282" height="160" border="0"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"><div style="width:100px;height:35px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:-20px 0"></div></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table>';

				dsp_color.appendChild(dsp_closer = document.createElement('div'));
				dsp_closer.id = 'dsp_color_closer';
				dsp_closer.style.backgroundColor = '#999';
				dsp_closer.style.position = 'absolute';
				dsp_closer.style.width = '20px';
				dsp_closer.style.height = '20px';
				dsp_closer.style.fontSize = '8pt';
				dsp_closer.style.lineHeight = '18px';
				dsp_closer.style.textAlign = 'center';
				dsp_closer.style.color = '#fff';
				dsp_closer.style.cursor = 'pointer';
				dsp_closer.style.zIndex = 1400;
				dsp_closer.style.left = '237px';
				dsp_closer.style.top = '30px';
				dsp_closer.innerHTML = '<b>x</b>';
				_$.addEvent(dsp_closer,'click',function(){ removePicker(); });
			}

			dsp_color.style.left = (x-5)+'px';
			dsp_color.style.top = (y-20)+'px';
			dsp_color.style.display = 'block';



			if(!dsp_jscolor.picker){

				dsp_jscolor.picker = {
					box : document.createElement('div'),
					boxB : document.createElement('div'),
					pad : document.createElement('div'),
					padB : document.createElement('div'),
					padM : document.createElement('div'),
					sld : document.createElement('div'),
					sldB : document.createElement('div'),
					sldM : document.createElement('div')
				};
				for(var i=0,segSize=4; i<dsp_jscolor.images.sld[1]; i+=segSize) {
					var seg = document.createElement('div');
					seg.style.height = segSize+'px';
					seg.style.fontSize = '1px';
					seg.style.lineHeight = '0';
					dsp_jscolor.picker.sld.appendChild(seg);
				}
				dsp_jscolor.picker.sldB.appendChild(dsp_jscolor.picker.sld);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.sldB);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.sldM);
				dsp_jscolor.picker.padB.appendChild(dsp_jscolor.picker.pad);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.padB);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.padM);
				dsp_jscolor.picker.boxB.appendChild(dsp_jscolor.picker.box);
			}



			var p = dsp_jscolor.picker;

			posPad = [
				x+DSP_this.pickerBorder+DSP_this.pickerFace+DSP_this.pickerInset,
				y+DSP_this.pickerBorder+DSP_this.pickerFace+DSP_this.pickerInset ];
			posSld = [
				null,
				y+DSP_this.pickerBorder+DSP_this.pickerFace+DSP_this.pickerInset ];

			_$.addEvent(p.box,'mouseout',function() { otarget.focus(); });
			_$.addEvent(p.box,'click',function(e) { holdPad && setPad(e); holdSld && setSld(e);});
			_$.addEvent(p.padM,'mouseout',function() { if(holdPad) { holdPad=false; dsp_jscolor.fireEvent(valueElement,'change'); } });
			_$.addEvent(p.padM,'click',function(e) { holdPad=true; setPad(e); });
			_$.addEvent(p.sldM,'mouseout',function() { if(holdSld) { holdSld=false; dsp_jscolor.fireEvent(valueElement,'change'); } });
			_$.addEvent(p.sldM,'click',function(e) { holdSld=true; setSld(e); });

			p.box.style.width = 4*DSP_this.pickerInset + 2*DSP_this.pickerFace + dsp_jscolor.images.pad[0] + 2*dsp_jscolor.images.arrow[0] + dsp_jscolor.images.sld[0] + 'px';
			p.box.style.height = 2*DSP_this.pickerInset + 2*DSP_this.pickerFace + dsp_jscolor.images.pad[1] + 'px';

			p.boxB.style.position = 'absolute';
			p.boxB.style.clear = 'both';
			p.boxB.style.left = x+'px';
			p.boxB.style.top = y+'px';
			p.boxB.style.zIndex = 1400;
			p.boxB.style.border = DSP_this.pickerBorder+'px solid';

			p.pad.style.width = dsp_jscolor.images.pad[0]+'px';
			p.pad.style.height = dsp_jscolor.images.pad[1]+'px';

			p.padB.style.position = 'absolute';
			p.padB.style.left = DSP_this.pickerFace+'px';
			p.padB.style.top = DSP_this.pickerFace+'px';
			p.padB.style.border = DSP_this.pickerInset+'px solid';

			p.padM.style.position = 'absolute';
			p.padM.style.left = '0';
			p.padM.style.top = '0';
			p.padM.style.width = DSP_this.pickerFace + 2*DSP_this.pickerInset + dsp_jscolor.images.pad[0] + dsp_jscolor.images.arrow[0] + 'px';
			p.padM.style.height = p.box.style.height;
			p.padM.style.cursor = 'crosshair';

			p.sld.style.overflow = 'hidden';
			p.sld.style.width = dsp_jscolor.images.sld[0]+'px';
			p.sld.style.height = dsp_jscolor.images.sld[1]+'px';

			p.sldB.style.position = 'absolute';
			p.sldB.style.right = DSP_this.pickerFace+'px';
			p.sldB.style.top = DSP_this.pickerFace+'px';
			p.sldB.style.border = DSP_this.pickerInset+'px solid';

			p.sldM.style.position = 'absolute';
			p.sldM.style.right = '0';
			p.sldM.style.top = '0';
			p.sldM.style.width = dsp_jscolor.images.sld[0] + dsp_jscolor.images.arrow[0] + DSP_this.pickerFace + 2*DSP_this.pickerInset + 'px';
			p.sldM.style.height = p.box.style.height;
			p.sldM.style.cursor = 'pointer';


			p.padM.style.background = "url(http://pit.dirty.ru/dirty/1/2010/04/29/11119-151007-7d331cbee9f80935305d342227e0f6f5.gif) no-repeat";
			p.padB.style.border = '1px solid #b6b6b6';
			p.sldB.style.border = '1px solid #b6b6b6';
			p.sldM.style.background = "url(http://pit.dirty.ru/dirty/1/2010/04/29/11119-150848-9b8117b5cfa416505278cda8115a920d.gif) no-repeat";
			p.pad.style.background = "url(http://pit.dirty.ru/dirty/1/2010/04/29/11119-151231-97b37c241b1e778ddd94c2659e7e0614.png) 0 0 no-repeat";

			redrawPad();
			redrawSld();

			dsp_jscolor.picker.owner = DSP_this;
			document.getElementsByTagName('body')[0].appendChild(p.boxB);

		}


		function redrawPad() {
			var yComponent = 1;
			var x = Math.round((DSP_this.hsv[0]/6) * (dsp_jscolor.images.pad[0]-1));
			var y = Math.round((1-DSP_this.hsv[yComponent]) * (dsp_jscolor.images.pad[1]-1));
			dsp_jscolor.picker.padM.style.backgroundPosition =
				(DSP_this.pickerFace+DSP_this.pickerInset+x - Math.floor(dsp_jscolor.images.cross[0]/2)) + 'px ' +
				(DSP_this.pickerFace+DSP_this.pickerInset+y - Math.floor(dsp_jscolor.images.cross[1]/2)) + 'px';

			var seg = dsp_jscolor.picker.sld.childNodes;

			var rgb = HSV_RGB(DSP_this.hsv[0], DSP_this.hsv[1], 1);
			for(var i=0; i<seg.length; i+=1) {
				seg[i].style.backgroundColor = 'rgb('+
					(rgb[0]*(1-i/seg.length)*100)+'%,'+
					(rgb[1]*(1-i/seg.length)*100)+'%,'+
					(rgb[2]*(1-i/seg.length)*100)+'%)';
			}
		}


		function redrawSld() {
			var yComponent = 2;
			var y = Math.round((1-DSP_this.hsv[yComponent]) * (dsp_jscolor.images.sld[1]-1));
			dsp_jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (DSP_this.pickerFace+DSP_this.pickerInset+y - Math.floor(dsp_jscolor.images.arrow[1]/2)) + 'px';
		}


		function isPickerOwner() {
			if(dsp_jscolor.picker) return dsp_jscolor.picker && dsp_jscolor.picker.owner === DSP_this;
		}


		function setPad(e){
			var posM = dsp_jscolor.getMousePos(e);
			var x = posM[0]-posPad[0];
			var y = posM[1]-posPad[1];
			DSP_this.fromHSV(x*(6/(dsp_jscolor.images.pad[0]-1)), 1 - y/(dsp_jscolor.images.pad[1]-1), null, leaveSld);
		}


		function setSld(e) {
			var posM = dsp_jscolor.getMousePos(e);
			var y = posM[1]-posPad[1];
			DSP_this.fromHSV(null, null, 1 - y/(dsp_jscolor.images.sld[1]-1), leavePad);
		}


		var DSP_this = this;
		var abortBlur = false;
		var
			valueElement = dsp_jscolor.fetchElement(this.valueElement),
			styleElement = dsp_jscolor.fetchElement(this.styleElement);
		var
			holdPad = false,
			holdSld = false;
		var
			posPad,
			posSld;
		var
			leaveValue = 1<<0,
			leaveStyle = 1<<1,
			leavePad = 1<<2,
			leaveSld = 1<<3;

		_$.addEvent(otarget,'click',function(e){
			if(dsp_jscolor.picker) removePicker();
			dsp_color_user = e.target;
			if(DSP_this.pickerOnfocus) DSP_this.showPicker();
		});


		if(valueElement){
			var updateField = function(){
				DSP_this.fromString(valueElement.value, leaveValue);
			};
		}

		if(styleElement){
			styleElement.jscStyle = {
				backgroundColor:styleElement.style.backgroundColor,
				color:styleElement.style.color
			};
		}

		dsp_jscolor.requireImage('http://pit.dirty.ru/dirty/1/2010/04/29/11119-151231-97b37c241b1e778ddd94c2659e7e0614.png');
		dsp_jscolor.requireImage('http://pit.dirty.ru/dirty/1/2010/04/29/11119-151007-7d331cbee9f80935305d342227e0f6f5.gif');
		dsp_jscolor.requireImage('http://pit.dirty.ru/dirty/1/2010/04/29/11119-150848-9b8117b5cfa416505278cda8115a920d.gif');

	}

}


function DSP_colorize_comments(){

	eval('var temp_array='+_$.settings.colors);

	for(var i=0; i<dsp_all_comments.length; i++){
		var temp_name = _$.$t('a',dsp_all_comments[i])[1].innerHTML;

		var temp_color = '';
		var temp_font = '';

		for(var j=0; j<temp_array.length; j++){
			if(temp_array[j].split(',')[0]==temp_name){
				temp_color = temp_array[j].split(',')[1];
				temp_font = temp_array[j].split(',')[2];
				break;
			}
		}

		var dsp_av_res = document.createElement('span');
		dsp_av_res.innerHTML = '&nbsp; <a class="dsp_color" style="text-decoration:underline;cursor:pointer">цвет</a><span'+((temp_color=='')?' style="display:none"':'')+' id="dsp_color_remover_'+i+'"> | <a style="text-decoration:underline;cursor:pointer">сбросить</a></span>';
		dsp_all_comments[i].appendChild(dsp_av_res);

		_$.addEvent(_$.$('dsp_color_remover_'+i),'click',function(e){DSP_color_remove(e.target);});

		if(temp_color!=''){

			var temp_div = _$.$t('a',dsp_all_comments[i]);
			temp_div = temp_div[temp_div.length-2];

			temp_div.title = '#'+temp_color;
			temp_div.color = '#'+temp_font;

			var temp_div = dsp_all_comments[i].parentNode;

			if(temp_color.toLowerCase()!='fff'){

				dsp_all_comments[i].parentNode.style.backgroundColor = '#'+temp_color;
				dsp_all_comments[i].parentNode.style.color = '#'+temp_font;
				dsp_all_comments[i].style.color = '#'+temp_font;

				var link_color = (temp_font=='fff')?'#e3e3e3':'#393939';

				var div_links = _$.$t('a',dsp_all_comments[i].parentNode.parentNode);

				for(var j=0; j<div_links.length; j++){

					div_links[j].style.color = link_color;
				}
			}
		}

		if(_$.settings.colors_border=='1'){

			if(dsp_all_comments[i].parentNode.parentNode.className.indexOf(' new ')>-1)
			dsp_all_comments[i].parentNode.style.border = '1px solid red';
		}

	}

}

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Dirty Tooltip


* * * * * * * * * * * * * * * * * * * * * * * * * */


_$.tooltip = {


	init: function(){

		if(_$.location.indexOf('/user/')==-1){

			var linkes = _$.$t('a');

			for(var i=0; i<linkes.length; i++){

				var dup_an = linkes[i].href.toString();

				if(
					dup_an.indexOf('dirty.ru/user/')>-1 &&
					dup_an.indexOf('/'+dsp_self_name)<0 &&
					dup_an[dup_an.length-2]!='/'
				){

					_$.addEvent(linkes[i],'mouseover',function(e){
						clearTimeout(dup_showing);
						dup_showBaloon(e.target);
					});

					_$.addEvent(linkes[i],'mouseout',function(){
						clearTimeout(dup_showing);
						dup_processing = 0;
					});
				}
			}

			_$.addEvent(_$.$t('a',_$.$c('header_tagline_inner')[0])[0],'mouseover',function(e){clearTimeout(dup_showing);dup_showBaloon(e.target)});
			_$.addEvent(_$.$t('a',_$.$c('header_tagline_inner')[0])[0],'mouseout',function(){clearTimeout(dup_showing);dup_processing=0});
		}
	}



};



var dup_showing = 0;
var dup_processing = 0;


function dup_showBaloon(obj){

	if(_$.settings.tooltip_on==1){

		if((obj.innerHTML.toString()==dsp_self_name&&_$.settings.tooltip_show_self==1)||obj.innerHTML!=dsp_self_name){

			var dup_div;

			if(!_$.$('dup_show_div')){
				dup_div = document.createElement('div');
				dup_div.id = 'dup_show_div';
				dup_div.style.position = 'absolute';
				dup_div.style.zIndex = '1300';
				document.body.appendChild(dup_div);

				_$.addEvent(document,'click',function(){
						_$.$('dup_show_div').style.display = 'none';
					});
			}

			dup_div = _$.$('dup_show_div');

			if(dsp_check_change_pictures==1){
				if(_$.settings.use_pictures==1) dup_div.innerHTML = '<input type="hidden" id="dup_current_id" value=""><table cellspacing="0" cellpadding="0" border="0"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"><div style="width:100px;height:35px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:-20px 0"></div></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" id="dup_data_td"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table>';
				else dup_div.innerHTML = '<input type="hidden" id="dup_current_id" value=""><div style="border-right:1px solid #a1a1a1;border-bottom:1px solid #a1a1a1"><div style="background-color:#fff;border:1px solid #505050;font-size:10px;padding:14px;line-height:16px" id="dup_data_td"></div></div>';
			}

			if(_$.$("dup_current_id").value!=obj.toString()){

				dup_div.style.display = 'none';

				if(_$.settings.use_pictures==1) _$.$("dup_data_td").innerHTML = '<center><div style="width:150px;height:60px;background-repeat:no-repeat;background-position:center;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center>';
				else _$.$("dup_data_td").innerHTML = '<center><div style="width:150px;height:60px;line-height:60px">...</div></center>';

				dup_processing = 1;
				dup_getData(obj);
			}

			var dup_pos = _$.element_position(obj);
			var dup_leftOffset = (_$.settings.use_pictures==1)?35:10;

			dup_showing = setTimeout(function(){
					_$.$('dup_show_div').style.display = 'block'
				},700);

			dup_div.style.top = (dup_pos.y+obj.offsetHeight+5)+'px';
			dup_div.style.left = (dup_pos.x-dup_leftOffset)+'px';
		}
	}
}

function dup_getData(obj){

	if(dup_processing!=0){

		_$.ajaxLoad(obj.href,function(ajaxObject){

			var dup_text = ajaxObject.responseText;

			if(dup_text.indexOf(' onclick="voteHandler.vote(this, \'')==-1){

				var dup_user_id = dsp_self_num;
				var dup_user_name = dsp_self_name;
			}
			else{

				var dup_user_id = dup_text.split(' onclick="voteHandler.vote(this, \'')[1].split('\'')[0];
				var dup_user_name = obj.href.split('/');
				dup_user_name = dup_user_name[dup_user_name.length-2];
			}

			var dup_date = dup_text.split('<span>с нами с ')[1].split(' года')[0];
			var dup_karma = dup_text.split(' onclick="voteDetailsHandler.show({type:\'karma\'')[1].split('>')[1].split('<')[0];
			var dup_pluses = dup_text.split('plus voted').length-1;
			var dup_minuses = dup_text.split('minus voted').length-1;

			dup_pluses = (dup_pluses>0)?'<span style="color:green;font-size:9pt"><b>+'+dup_pluses+'</b></span>':0;
			dup_minuses = (dup_minuses>0)?'<span style="color:red;font-size:9pt"><b>-'+dup_minuses+'</b></span>':0;
				
			var dup_votes_him = '';
			if(dup_minuses!==0) dup_votes_him += dup_minuses;
			if(dup_minuses!==0&&dup_pluses!==0) dup_votes_him += ' <span style="color:#ccc">/</span> ';
			if(dup_pluses!==0) dup_votes_him += dup_pluses;


			var dup_parent = dup_text.split(' по приглашению ')[1].split('</div>')[0];

			var dup_name = dup_text.split('<div class="userbasicinfo">')[1].split('<h3>')[1].split('</div>')[0];
			dup_name = dup_name.split('</h3>').join('');
			for(var i=0;i<2;i++) dup_name = dup_name.split('&#35;').join('#').split('&#59;').join(';').split('&amp;').join('&');

			var dup_country = dup_name.split('<div class="userego">')[1];

			var dup_raitdata = dup_text.split('<div class="userstat userrating">')[1];
			dup_raitdata = dup_raitdata.split('<div class="clear">')[0];

			var dup_sex = (dup_raitdata.indexOf('аписала')>-1)?'f':'m';
			var dup_posts = (dup_raitdata.indexOf('/posts/">')>-1)?parseInt(dup_raitdata.split('/posts/">')[1].split(' ')[0]):0;
			var dup_comments = (dup_raitdata.indexOf('/comments/">')>-1)?parseInt(dup_raitdata.split('/comments/">')[1].split(' ')[0]):0;
			var dup_vote = dup_raitdata.split(' голоса&nbsp;&#8212; ')[1].split('<')[0];

			if(dup_posts!=0||dup_comments!=0){
				var dup_raiting = parseInt(dup_raitdata.split('рейтинг ')[1].split('<')[0]);
			}
			else var dup_raiting = 0;

			dup_name = dup_name.split('<div class="userego">')[0];
			dup_name = '<span style="font-size:10pt;color:#'+((dup_sex=='m')?'009ced':'ff4fdc')+'"><b>'+dup_name+'</b></span>';

//			dup_votes_him = (dup_votes_him!='')?'<b>Ваша оценка:</b> '+dup_votes_him:'<span style="color:#999"><b>Ваших оценок нет в '+((dup_sex=='f')?'её':'его')+' карме</b></span>';
			dup_votes_him = '';

			var dup_prop = Math.round((dup_raiting/(dup_posts+dup_comments))*10)/10;

			var dup_userpic = '';
			if(_$.settings.use_pictures=='1'){
				if(dup_text.indexOf('alt="Dirty Avatar"')>0){
					dup_userpic = dup_text.split('alt="Dirty Avatar"')[0];
					dup_userpic = dup_userpic.split('src="');
					dup_userpic = dup_userpic[dup_userpic.length-1].split('"')[0];
				}
				else if(dup_text.indexOf('#Dirty Avatar#')>0){
					dup_userpic = dup_text.split('#Dirty Avatar#')[1].split('src="')[1].split('"')[0];
				}
				else{
					dup_check_avatar = dup_text.split('<table class="userpic">')[1].split('<td>')[1].split('</td>')[0];
					if(dup_check_avatar.indexOf('<img')>0){
						dup_userpic = dup_check_avatar.split('src="')[1].split('"')[0];
					}
				}

				if(dup_userpic!='') dup_userpic = '<img src="http://www.amaryllis.nl/cmm/tools/thumb.php?src='+dup_userpic+'&maxw=70&maxh=100" border="0" alt=""><br>';
				else dup_userpic = '<div style="width:75px;height:75px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-074626-d60640dc88fd86bcef83e920d94a8797.png);background-position:'+((dup_sex=='m')?'left':'-75px')+' top">&nbsp;</div>';
			}
			else{
				if(_$.browser().name=='opera'){
					if(dup_sex=='m') dup_userpic = '<div style="width:66px;height:70px;color:#d2dae2;border:1px solid #919191;font-family:Verdana;text-align:center;font-size:50px;line-height:70px">♂</div>';
					else dup_userpic = '<div style="width:66px;height:70px;color:#e2d2d9;border:1px solid #919191;text-align:center;font-size:50px;line-height:70px">♀</div>';
				}
				else{
					if(dup_sex=='m') dup_userpic = '<div style="width:66px;color:#d2dae2;border:1px solid #919191;text-align:center;font-size:4px;line-height:4px"><pre>  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~~~       ~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                  ~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~~                ~~~~~~  '+"\r\n"+'  ~~~~~~~~              ~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~           ~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~                      ~~~~  </pre></div>';
					else dup_userpic = '<div style="width:66px;color:#e2d2d9;border:1px solid #919191;text-align:center;font-size:4px;line-height:4px"><pre>  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~~~       ~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~           ~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~                    ~~~~~  '+"\r\n"+'  ~~~~~                  ~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~                      ~~~~  '+"\r\n"+'</pre></div>';
					dup_userpic = dup_userpic.split('~').join('█');
				}
			}



			var dup_note = dup_text.split('id="js-usernote">')[1].split('</em>')[0];
			if(dup_note!='Место для заметок о пользователе. Заметки видны только вам.'){

				dup_temp_body_mini = (dup_note.length>32)?dup_note.substring(0,32)+'...':dup_note;

				if(dup_temp_body_mini!=dup_note){
					dup_note = '<b>Ваша заметка:</b><div style="cursor:help;background-color:#eee;padding:10px;font-size:10pt;font-family:Times New Roman" title="'+dup_note+'"><i>'+dup_temp_body_mini+'</i></div>';
				}
				else{
					dup_note = '<b>Ваша заметка:</b><div style="background-color:#eee;padding:10px;font-size:10pt;font-family:Times New Roman"><i>'+dup_temp_body_mini+'</i></div>';
				}
			}
			else dup_note = '';

			dup_output = '<table cellspacing="0" cellpadding="0" border="0"><tr><td align="center" valign="top" style="padding-right:10px">'+dup_userpic+'<span style="color:#444">№'+dup_user_id+'</span><br>'+dup_parent+'<div style="margin-top:10px;font-size:10px"><b>Регистрация:</b><br>'+dup_date+'</div><div style="margin-top:5px"><b>Карма: <span style="font-size:10pt;color:'+((dup_karma>=0)?'green':'red')+'">'+dup_karma+'</span></b></div></td>';
			dup_output += '<td valign="top"><div style="float:left;margin-bottom:5px">'+dup_name+'<br><span style="font-size:10px"><b>'+dup_country+'</b></span></div>';
			dup_output += '<div style="float:right;margin-left:5px;margin-bottom:5px"><span style="display:block'+((_$.settings.use_pictures=='1')?';background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png);background-repeat:no-repeat':'')+';width:36px;height:20px;font-size:8pt;line-height:20px;text-align:center;color:#fff;background-color:#999"><b>'+dup_prop+'</b></span></div>';
			dup_output += '<div style="clear:both">Автор <b>'+dup_posts+'</b> постов и <b>'+dup_comments+'</b> комментариев<br>Заработал'+((dup_sex=='f')?'а':'')+' голос <span style="font-size:10pt;color:#0069ac"><b>'+dup_vote+'</b></span> и рейтинг '+dup_raiting+'</div>';
			dup_output += '<div style="margin-top:10px">'+dup_votes_him+'</div><div id="dup_my_vote"></div><div id="dup_his_vote"></div><div style="margin-top:10px">'+dup_note+'</div></td></tr></table>';

			_$.$('dup_current_id').value = obj.href;

			dup_getKarma(dup_output,dup_user_id,dup_sex,dup_user_name);
		});
	}
}

function dup_getKarma(dup_text,dup_user_id,dup_sex,dup_user_name){

	if(dup_user_id!=dsp_self_num){

	var url = '/karmactl';
	var data = 'view='+dsp_self_num;

	_$.ajaxLoadPost(url,data,function(ajaxObject){

		var dup_temp = ajaxObject.responseText;

		if(dup_temp.indexOf('{"uid":"'+dup_user_id+'"')>0){

			dup_temp = dup_temp.split('{"uid":"'+dup_user_id+'"')[1].split('","login"')[0].split('"');
			dup_temp = dup_temp[dup_temp.length-1];
			dup_temp = '<b>'+((dup_sex=='f')?'Её':'Его')+' оценка вас: <span style="font-size:9pt;color:'+((dup_temp>0)?'green">+':'red">')+dup_temp+'</span></b>';

			_$.$('dup_his_vote').innerHTML = dup_temp;
		}
		else _$.$('dup_his_vote').innerHTML = '<span style="color:#999"><b>Е'+((dup_sex=='f')?'ё':'го')+' оценок нет в вашей карме</b></span>';
	});

	var url = '/karmactl';
	var data = 'view='+dup_user_id;

	_$.ajaxLoadPost(url,data,function(ajaxObject){

		var dup_temp = ajaxObject.responseText;

		if(dup_temp.indexOf('{"uid":"'+dsp_self_num+'"')>0){

			dup_temp = dup_temp.split('{"uid":"'+dsp_self_num+'"')[1].split('","login"')[0].split('"');
			dup_temp = dup_temp[dup_temp.length-1];
			dup_temp = '<b>Ваша оценка '+((dup_sex=='f')?'её':'его')+': <span style="font-size:9pt;color:'+((dup_temp>0)?'green">+':'red">')+dup_temp+'</span></b>';

			_$.$('dup_my_vote').innerHTML = dup_temp;
		}
		else _$.$('dup_my_vote').innerHTML = '<span style="color:#999"><b>Ваших оценок нет в е'+((dup_sex=='f')?'ё':'го')+' карме</b></span>';
	});

	}

	_$.$('dup_data_td').innerHTML = dup_text;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Функции создания настроек


* * * * * * * * * * * * * * * * * * * * * * * * * */


function dsp_general_init(){

	_$.addEvent(_$.$('dsp_c_favicon_on'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_favicon');

		if(_$.$('dsp_c_favicon_on').checked===true) _$.set_save('favicon_on',1);
		else _$.set_save('favicon_on',0);

	});


/*	_$.$('dsp_c_after_load').addEventListener('click',
	function(){
		if(_$.$('dsp_c_after_load').checked===true) _$.set_save('after_load',1);
		else _$.set_save('after_load',0);

	},false);
*/


	_$.addEvent(_$.$('dsp_c_favicon_style_a'),'click',
	function(){
		_$.set_save('favicon_style',1);
	});


	_$.addEvent(_$.$('dsp_c_favicon_style_b'),'click',
	function(){
		_$.set_save('favicon_style',0);
	});


	_$.addEvent(_$.$('dsp_c_username_replace'),'click',
	function(){

		if(_$.$('dsp_c_username_replace').checked===true){
			DSP_replace_username(1);
			_$.set_save('username_replace',1);
		}
		else{
			DSP_replace_username(0);
			_$.set_save('username_replace',0);
		}

	});
}

function dsp_posts_init(){

	_$.addEvent(_$.$('dsp_c_posts_average'),'click',
	function(){
		if(_$.$('dsp_c_posts_average').checked===true) _$.set_save('posts_average',1);
		else _$.set_save('posts_average',0);

	});

	_$.addEvent(_$.$('dsp_c_youtube_fullscreen'),'click',
		function(){
			if(_$.$('dsp_c_youtube_fullscreen').checked===true) _$.set_save('youtube_fullscreen',1);
			else _$.set_save('youtube_fullscreen',0);

		});
}

function dsp_comments_init(){

	_$.addEvent(_$.$('dsp_c_colors_on'),'click',
		function(){
			DSP_show_hide_menu('dsp_l_colors');

			if(_$.$('dsp_c_colors_on').checked===true) _$.set_save('colors_on',1);
			else _$.set_save('colors_on',0);

		});

	_$.addEvent(_$.$('dsp_c_colors_border'),'click',
		function(){
			if(_$.$('dsp_c_colors_border').checked===true) _$.set_save('colors_border',1);
			else _$.set_save('colors_border',0);

		});

}


function dsp_tooltip_init(){

	_$.addEvent(_$.$('dsp_c_use_picture'),'click',
	function(){
		dsp_check_change_pictures = 1;

		if(_$.$('dsp_c_use_picture').checked===true) _$.set_save('use_pictures',0);
		else _$.set_save('use_pictures',1);

	});


	_$.addEvent(_$.$('dsp_c_tooltip_on'),'click',
		function(){
			DSP_show_hide_menu('dsp_l_tooltip');

			if(_$.$('dsp_c_tooltip_on').checked===true) _$.set_save('tooltip_on',1);
			else _$.set_save('tooltip_on',0);
		});


/*	_$.$('dsp_c_tooltip_with_notepad').addEventListener('click',
		function(){
			if(_$.$('dsp_c_tooltip_with_notepad').checked===true) _$.set_save('tooltip_with_notepad',1);
			else _$.set_save('tooltip_with_notepad',0);
		},false);
*/


	_$.addEvent(_$.$('dsp_c_tooltip_show_self'),'click',
		function(){
			if(_$.$('dsp_c_tooltip_show_self').checked===true) _$.set_save('tooltip_show_self',1);
			else _$.set_save('tooltip_show_self',0);
		});
}


function DSP_make_content_settings(){

	if(_$.$('dsp_setting_button_0').innerHTML.length<10){

		var dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_username_replace" type="checkbox" '+((_$.settings.username_replace=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Заменять %username% на ваше имя</td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_favicon_on" type="checkbox" '+((_$.settings.favicon_on=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Показывать иконку сайта ссылки:</td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_favicon" style="display:'+((_$.settings.favicon_on=='1')?'block':'none')+'"><form style="margin:0"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td align="right" width="45"><input name="dsp_favicon_s" value="1" id="dsp_c_favicon_style_a" type="radio" '+((_$.settings.favicon_style=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt;color:#777">при наведении - над ссылкой</td></tr>';
		dsp_txt += '<tr><td align="right"><input name="dsp_favicon_s" value="0" id="dsp_c_favicon_style_b" type="radio" '+((_$.settings.favicon_style=='0')?'checked="checked"':'')+'></td><td style="font-size:10pt;color:#777">всегда перед ссылкой</td></tr>';
		dsp_txt += '</table></form></div>';

		DSP_make_Setting_Bar('Общие',dsp_txt,'dsp_general_init()');


		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_posts_average" type="checkbox" '+((_$.settings.posts_average=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Показывать средние ID и оценку</td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_youtube_fullscreen" type="checkbox" '+((_$.settings.youtube_fullscreen=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Добавить кнопку "Fullscreen" в постах с видеороликами youtube</td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Посты',dsp_txt,'dsp_posts_init()');


		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_colors_on" type="checkbox" '+((_$.settings.colors_on=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Изменять цвет комментариев пользователей</td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_colors" style="display:'+((_$.settings.colors_on=='1')?'block':'none')+'"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_colors_border" type="checkbox" '+((_$.settings.colors_border=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt;color:#777">Выделять рамкой новые комментарии</td></tr>';
		dsp_txt += '</table></div>';

		DSP_make_Setting_Bar('Комментарии',dsp_txt,'dsp_comments_init()');


		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_tooltip_on" type="checkbox" '+((_$.settings.tooltip_on=='1')?'checked="checked"':'')+'></td><td style="font-size:10pt">Включить Dirty Tooltip</td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_tooltip" style="display:'+((_$.settings.tooltip_on=='1')?'block':'none')+'"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_use_picture" type="checkbox" '+((_$.settings.use_pictures=='0')?'checked="checked"':'')+'></td><td style="font-size:10pt">Режим "без картинок"</td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_tooltip_show_self" type="checkbox" '+((_$.settings.favicon_style=='0')?'checked="checked"':'')+'></td><td style="font-size:10pt">Показывать информацию о себе по ссылке возле logout</td></tr>';
		dsp_txt += '</table></div>';

		DSP_make_Setting_Bar('Dirty Tooltip',dsp_txt,'dsp_tooltip_init()');

	}
	DSP_show_hide_menu('_$.settings');
}


function DSP_init(){

	DSP_make_General_Bar();
	DSP_show_hide_setting(0);


// Favicons inits

if(_$.settings.favicon_on=='1'&&_$.settings.use_pictures=='1'){

	if(_$.location.indexOf('/user/')<0){

		var dsp_elements = _$.$t('a',_$.$('content'));

		if(_$.settings.favicon_style=='1'){

			for(var i=0;i<dsp_elements.length;i++){

				if(dsp_elements[i].toString().indexOf('http://')!=-1&&dsp_elements[i].toString().indexOf('dirty.ru/')<0){

					_$.addEvent(dsp_elements[i],'mouseover',function(e){DSP_show_favicon(e.target,1);});
					_$.addEvent(dsp_elements[i],'mouseout',function(e){DSP_show_favicon(e.target,0);});
				}
			}

		}
		else{

			for(var i=0;i<dsp_elements.length;i++){

				if(dsp_elements[i].toString().indexOf('http://')!=-1&&dsp_elements[i].toString().indexOf('dirty.ru/')<0){

					var favicon = 'http://favicon.yandex.ru/favicon/'+dsp_elements[i].toString().split('/')[2];

					dsp_elements[i].style.paddingLeft = '18px';
					dsp_elements[i].style.backgroundImage = 'url('+favicon+')';
					dsp_elements[i].style.backgroundRepeat = 'no-repeat';
				}
			}

		}
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Average IDs and Votes


* * * * * * * * * * * * * * * * * * * * * * * * * */

if(_$.settings.posts_average=='1'){

	if(_$.location.indexOf('/comments/')==0){

		var dsp_av_res = document.createElement('span');
		dsp_av_res.id = 'dsp_layer_posts_average';
		_$.$c('dd')[0].appendChild(dsp_av_res);

		var dsp_ids_count = 0;
		var dsp_votes_count = 0;

		var dsp_average_votes = _$.$c('vote_result',_$.$('js-commentsHolder'));

		for(var i=0; i<dsp_average_votes.length; i++){
			dsp_votes_count = dsp_votes_count+parseInt(dsp_average_votes[i].innerHTML);
		}
		dsp_votes_count = Math.round((dsp_votes_count/dsp_average_votes.length)*10)/10;

		dsp_average_votes = _$.$c('comment',_$.$('js-commentsHolder'));
		var dsp_temp_array = ',';

		for(var i=0; i<dsp_average_votes.length; i++){
			var dsp_temp = dsp_average_votes[i].className.split(' u')[1];
			if(dsp_temp_array.indexOf(','+dsp_temp+',')<0) dsp_temp_array += dsp_temp+',';
		}
		dsp_temp_length = dsp_temp_array.split(',').length-2;
		dsp_temp_array = eval('0'+dsp_temp_array.split(',').join('+')+'0');

		dsp_ids_count = Math.round((dsp_temp_array/dsp_temp_length)*10)/10;
		dsp_average_votes = '';

		if(isNaN(dsp_votes_count)) dsp_votes_count = 0;
		if(isNaN(dsp_ids_count)) dsp_ids_count = 0;

		_$.$('dsp_layer_posts_average').innerHTML += ' | &#216;id '+dsp_ids_count+' | &#216;&#177; '+dsp_votes_count;
	}
}


// Username replace

if(_$.settings.username_replace=='1'){

	DSP_replace_username(1);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Youtube Video Enhancer


* * * * * * * * * * * * * * * * * * * * * * * * * */


if(_$.settings.youtube_fullscreen=='1'){

	if(_$.location.indexOf('/comments/')==0){

		if(_$.$t('object').length>0&&_$.$c('dt')[0].innerHTML.indexOf('value="http://www.youtube.com')>0){

			var dsp_video_link = _$.$t('object')[0].parentNode.innerHTML.split('value="http')[1].split('"')[0];
			var dsp_video_array = _$.$t('object')[0].parentNode.innerHTML.split('<');
			var dsp_video_html = dsp_video_array[0];

			for(var i=1; i<dsp_video_array.length; i++){

				if(dsp_video_array[i][0]=='p') dsp_video_html += '<'+dsp_video_array[i]+'</param>';
				else if(dsp_video_array[i][0]=='e') dsp_video_html += '<'+dsp_video_array[i]+'</embed>';
				else dsp_video_html += '<'+dsp_video_array[i];
			}

			dsp_video_html = dsp_video_html.split('%20').join('').split('<embed').join('<param name="allowFullScreen" value="true"></param><embed allowfullscreen="true"');
			dsp_video_html = dsp_video_html.split(dsp_video_link).join(dsp_video_link+'&hl=ru_RU&fs=1');
			_$.$t('object')[0].parentNode.innerHTML = dsp_video_html;
		}
	}
}


// Color Picker

if(_$.settings.colors_on=='1'){

	if(_$.location.indexOf('/comments/')==0||_$.location.indexOf('/news/')==0||(_$.location.indexOf('/my/inbox/')==0&&_$.location!='/my/inbox/')){

		dsp_all_comments = _$.$c('c_footer');

		DSP_colorize_comments();
		dsp_jscolor.init();
	}
}










}

_$.tooltip.init();


if(_$.location.indexOf('/user/')==-1) DSP_init();

}