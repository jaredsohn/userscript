//
// ==UserScript==
// @name			Dirty Service Pack 2
// @author			Stasik0, BearOff, crea7or, flashface, slavka123
// @namespace		http://dirty.ru/
// @description		Dirty Service Pack 2.6
// @require			http://crea7or.spb.ru/scripts/user.js.updater.php?id=88906&days=7
// @include			http://dirty.ru/*
// @include			http://www.dirty.ru/*
// @include			http://music.dirty.ru/*
// @run-at			document-end
// @version			2.6.5
// ==/UserScript==

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Funtions and Params

* * * * * * * * * * * * * * * * * * * * * * * * * */
var dateToCheck1 = new Date();

var _$ = {
	settings: {},
	settings_colors: new Array(),
	settings_ignorlist: new Array(),
	settings_ignorTextlist: new Array(),
	location: window.location.href.split(window.location.host)[1],

	// made by crea7or
	// start of SCRIPTS-71
	set_save: function(name,option)
	{
		if ( name != null )
		{
			_$.settings[name] = option;
		}
		localStorage.setItem('dirtySp', jsonStringify(_$.settings));
		localStorage.setItem('dirtyCommentsColors', jsonStringify(_$.settings_colors));
		localStorage.setItem('dirtyIgnoreList', jsonStringify(_$.settings_ignorlist));
		localStorage.setItem('dirtyIgnoreTextList', jsonStringify(_$.settings_ignorTextlist));
	},
	set_get: function()
	{
		if( document.cookie.indexOf('dsp.settings=')>-1)
		{
			var param = unescape( document.cookie.split('dsp.settings=')[1].split(";")[0]);
			eval("_$.settings="+unescape(param));
			document.cookie = "dsp.settings=1; domain=.dirty.ru; path=/; expires=Thu, 01-Jan-1970 00:34:13 GMT";
			document.cookie = "posts_thresh.settings=1; domain=.dirty.ru; path=/; expires=Thu, 01-Jan-1970 00:34:13 GMT";
			document.cookie = "comm_thresh.settings=1; domain=.dirty.ru; path=/; expires=Thu, 01-Jan-1970 00:34:13 GMT";
			_$.settings_colors = _$.settings.colors;
		}
		else
		{
			_$.settings = jsonParse( localStorGetItem('dirtySp', "{}"));
			_$.settings_colors = jsonParse( localStorGetItem('dirtyCommentsColors', "[]"));
			_$.settings_ignorlist = jsonParse( localStorGetItem('dirtyIgnoreList', "[]"));
			_$.settings_ignorTextlist = jsonParse( localStorGetItem('dirtyIgnoreTextList', "[]"));			
			if ( _$.settings_colors == "[]" || _$.settings_colors.constructor === undefined || _$.settings_colors.constructor != Array )
			{
				_$.settings_colors = new Array();
			}
			if (_$.settings_ignorlist == "[]" || _$.settings_ignorlist.constructor === undefined || _$.settings_ignorlist.constructor != Array)
			{
				_$.settings_ignorlist = new Array();
			}
			if (_$.settings_ignorTextlist == "[]" || _$.settings_ignorTextlist.constructor === undefined || _$.settings_ignorTextlist.constructor != Array)
			{
				_$.settings_ignorTextlist = new Array();
			}			
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

	$c: function(name,obj,tagName)
	{
		var obj = obj||document;
		if( tagName==null )
		{
			return obj.querySelectorAll( '*.' + name );
		}
		else
		{
			return obj.querySelectorAll( tagName + '.' + name );
		}
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
			if(y===null){y = document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;};
			if(x===null){x = document.body.scrollTop?document.body.scrollLeft:document.documentElement.scrollLeft;};
			window.scrollTo(x,y);
			//if(y!==null){
			//	if(document.body.scrollTop) document.body.scrollTop = y;
			//	else document.documentElement.scrollTop = y;
			//}

			//if(x!==null){
			//	if(document.body.scrollLeft) document.body.scrollLeft = x;
			//	else document.documentElement.scrollLeft = x;
			//}
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
	},

	injectScript: function(source){
		var inject = document.createElement("script");
		inject.setAttribute("type", "text/javascript");
		inject.textContent = source;
		_$.$t('head')[0].appendChild(inject);
	},

	injectScriptUrl: function(url){
		var inject = document.createElement("script");
		inject.setAttribute("type", "text/javascript");
		inject.setAttribute("src", url);
		_$.$t('head')[0].appendChild(inject);
	},

	insertAfter: function (referenceNode, node) {
		referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
	},

	$n: function(element){
		return document.getElementsByName(element);
	},

	getUsername: function(){
		elem = _$.$c('header_tagline_inner');
		if(elem.length == 1){
			var raw = elem[0].innerHTML.match(/\/users\/[0-9]+">(.*)<\/a>/g);
			if(raw != null){
				return raw[0].split('>')[1].split('<')[0];
			}
		}
		return "";
	},

	getNumber: function(){
		elem = _$.$c('header_tagline_inner');
		if(elem.length == 1){
			var raw = elem[0].innerHTML.split('dirty.ru/users/')[1].split('"')[0];
			return raw;
		}
		return "";
	},

	fireEvent: function(element,event){
		if (document.createEventObject){
			// dispatch for IE
			var evt = document.createEventObject();
			return element.fireEvent('on'+event,evt)
		}else{
			// dispatch for firefox + others
			var evt = document.createEvent("MouseEvents");
			evt.initEvent(event, true, true ); // event type,bubbling,cancelable
			return !element.dispatchEvent(evt);
		}
	}

	//,
	//setInnerText: function(element, text){
	//	var hasInnerText = (_$.$t('body')[0].innerText != undefined) ? true : false;
	//	if(!hasInnerText){
	//		element.textContent = text;
	//	} else{
	//		element.innerText = text;
	//	}
	//}
}

// BEGIN CONFIG
// made by crea7or
// loading from a localStorage with default value instead of null, json wrappers
// should be available for the injected scripts
function jsonParse( valueToParse )
{
	if ( typeof JSON.parse !== "undefined" )
	{
		return JSON.parse( valueToParse );
	}
	else
	{
		return JSON.decode( valueToParse );
	}
}
function jsonStringify( valueToStringify )
{
	if ( typeof JSON.stringify !== "undefined" )
	{
		return JSON.stringify( valueToStringify );
	}
	else
	{
		return JSON.encode( valueToStringify );
	}
}
function localStorGetItem( itemName, defaultValue )
{
	var loadedValue = localStorage.getItem( itemName );
	if ( loadedValue == null )
	{
		loadedValue = defaultValue;
	}
	return loadedValue;
}
_$.injectScript( jsonParse + "\n" + jsonStringify  + "\n" +  localStorGetItem );
//

_$.set_get();

var settingsSave = false;
if( typeof _$.settings.use_pictures == "undefined") { _$.settings.use_pictures = 1; settingsSave = true; }
if( typeof _$.settings.username_replace == "undefined") { _$.settings.username_replace = 0; settingsSave = true; }
if( typeof _$.settings.posts_average == "undefined") { _$.settings.posts_average = 0; settingsSave = true; }
if( typeof _$.settings.youtube_fullscreen == "undefined") { _$.settings.youtube_fullscreen = 1; settingsSave = true; }
if( typeof _$.settings.imglinks_preview == "undefined") { _$.settings.imglinks_preview = 1; settingsSave = true; }
if( typeof _$.settings.tooltip_on == "undefined") { _$.settings.tooltip_on = 1; settingsSave = true; };
if( typeof _$.settings.tooltip_show_self == "undefined") { _$.settings.tooltip_show_self = 1; settingsSave = true; }
if( typeof _$.settings.favicon_on == "undefined") { _$.settings.favicon_on = 1; _$.settings.favicon_style = 0; settingsSave = true; }
if( typeof _$.settings.colors_on == "undefined") { _$.settings.colors_on = 0; settingsSave = true; }
if( typeof _$.settings.colors_border == "undefined") { _$.settings.colors_border = 1; settingsSave = true; }
//if( typeof _$.settings_colors.length < 1 ) { _$.settings_colors = '[]'; settingsSave = true; }
//SP2 adding scripts - STEP ONE
if( typeof _$.settings.dirty_avatar == "undefined") { _$.settings.dirty_avatar = 1; settingsSave = true; }
if( typeof _$.settings.grt_enabled == "undefined") { _$.settings.grt_enabled = 1; settingsSave = true; }
if( typeof _$.settings.grt_random == "undefined") { _$.settings.grt_random = 1; settingsSave = true; }
if( typeof _$.settings.online_enabled == "undefined") { _$.settings.online_enabled = 1; settingsSave = true; }
if( typeof _$.settings.instant_search == "undefined") { _$.settings.instant_search = 1; settingsSave = true; }
if( typeof _$.settings.instant_search_hide == "undefined") { _$.settings.instant_search_hide = 0; settingsSave = true; }
if( typeof _$.settings.inbox_text == "undefined") { _$.settings.inbox_text = 1; settingsSave = true; }
if( typeof _$.settings.arrows_on == "undefined") { _$.settings.arrows_on = 1; settingsSave = true; }
if( typeof _$.settings.inbox_recreate == "undefined") { _$.settings.inbox_recreate = 1; settingsSave = true; }
if( typeof _$.settings.user_stats == "undefined") { _$.settings.user_stats = 1; settingsSave = true; }
if( typeof _$.settings.ban_encoding == "undefined") { _$.settings.ban_encoding = 1; settingsSave = true; }
if( typeof _$.settings.links_test == "undefined") { _$.settings.links_test = 1; settingsSave = true; }
if( typeof _$.settings.d3search == "undefined") { _$.settings.d3search = 1; settingsSave = true; }
if( typeof _$.settings.d3search_quick == "undefined") { _$.settings.d3search_quick = 1; settingsSave = true; }
if( typeof _$.settings.karma_log == "undefined") { _$.settings.karma_log = 1; settingsSave = true; }
if( typeof _$.settings.youtube_preview == "undefined") { _$.settings.youtube_preview = 1; settingsSave = true; }
if( typeof _$.settings.read_button == "undefined") { _$.settings.read_button = 1; settingsSave = true; }
if( typeof _$.settings.comment_scroller == "undefined") { _$.settings.comment_scroller = 1; settingsSave = true; }
if( typeof _$.settings.smooth_scroll == "undefined")
{
	if(_$.browser().name == "chrome"){
		{ _$.settings.smooth_scroll = 0; settingsSave = true; };
	}else{
		{ _$.settings.smooth_scroll = 1; settingsSave = true; };
	}
}
if( typeof _$.settings.dirty_tags == "undefined") { _$.settings.dirty_tags = 1; settingsSave = true; }
if( typeof _$.settings.dirty_tags_autogold == "undefined") { _$.settings.dirty_tags_autogold = 1; settingsSave = true; }
if( typeof _$.settings.dirty_tags_hidetags == "undefined") { _$.settings.dirty_tags_hidetags = 1; settingsSave = true; }
if( typeof _$.settings.timings_display == "undefined") { _$.settings.timings_display = 0; settingsSave = true; }
if( typeof _$.settings.comments_threshold == "undefined") { _$.settings.comments_threshold = 0; settingsSave = true; }
if( typeof _$.settings.posts_spades == "undefined") { _$.settings.posts_spades = 1; settingsSave = true; }
if( typeof _$.settings.posts_threshold == "undefined") { _$.settings.posts_threshold = 0; settingsSave = true; }
if( typeof _$.settings.post_content_filter_layout == "undefined") { _$.settings.post_content_filter_layout = 0; settingsSave = true; }
if( typeof _$.settings.posts_threshold_use_or == "undefined") { _$.settings.posts_threshold_use_or = 0; settingsSave = true; }
if( typeof _$.settings.comments_order == "undefined") { _$.settings.comments_order = 1; settingsSave = true; }
//posts & comments threshold
if( typeof _$.settings.threshold == "undefined") { _$.settings.threshold = 0; settingsSave = true; }
if( typeof _$.settings.thresh_comm_count == "undefined") { _$.settings.thresh_comm_count = 0; settingsSave = true; }
if( typeof _$.settings.thresh_step == "undefined") { _$.settings.thresh_step = 100; settingsSave = true; }
if( typeof _$.settings.opt_count == "undefined") { _$.settings.opt_count = 4; settingsSave = true; }
if( typeof _$.settings.show_posts == "undefined") { _$.settings.show_posts = 1; settingsSave = true; }
if( typeof _$.settings.show_video == "undefined") { _$.settings.show_video = 1; settingsSave = true; }
if( typeof _$.settings.show_photo == "undefined") { _$.settings.show_photo = 1; settingsSave = true; }
if( typeof _$.settings.show_audio == "undefined") { _$.settings.show_audio = 1; settingsSave = true; }
if( typeof _$.settings.cmnt_threshold == "undefined") { _$.settings.cmnt_threshold = -1000; settingsSave = true; }
if( typeof _$.settings.cmnt_thresh_type == "undefined") { _$.settings.cmnt_thresh_type = 1; settingsSave = true; }
if( typeof _$.settings.cmnt_thresh_step == "undefined") { _$.settings.cmnt_thresh_step = 10; settingsSave = true; }
if( typeof _$.settings.cmnt_opt_count == "undefined") { _$.settings.cmnt_opt_count = 4; settingsSave = true; }
if( typeof _$.settings.cmnt_picts_always == "undefined") { _$.settings.cmnt_picts_always = 0; settingsSave = true; }
//posts & comments tresh

if( typeof _$.settings.own_threshold == "undefined"){ _$.settings.own_threshold = 0; settingsSave = true; }
if( typeof _$.settings.new_window == "undefined"){ _$.settings.new_window = 1; settingsSave = true; }
if( typeof _$.settings.quotes == "undefined") { _$.settings.quotes = 1; settingsSave = true; }
if( typeof _$.settings.ignorlist == "undefined") { _$.settings.ignorlist = 1; settingsSave = true; }

//moderate
if( typeof _$.settings.moderate == "undefined") { _$.settings.moderate = 0; settingsSave = true; }

if ( settingsSave )
{
	_$.set_save( null , 0);
}
//END CONFIG

if ( _$.settings.timings_display == 1 )
{
	var divWithBenchmark = document.createElement('div');
	divWithBenchmark.setAttribute('id','js-benchmark');
	divWithBenchmark.setAttribute('style','border: 1px dotted grey; padding: 5px 5px 5px 5px; font-family: verdana, sans-serif; font-size: 10px;');
	divWithBenchmark.innerHTML = "<table cellspacing=1 cellpadding=1>";
	document.body.insertBefore( divWithBenchmark, document.body.firstChild );
}

function addBenchmark( results, name )
{
	if ( _$.settings.timings_display == 1 )
	{
		var time2 = new Date();
		var divBench = document.getElementById('js-benchmark');
		if ( divBench )
		{
			var divWithBenchmark = document.createElement('div');
			divWithBenchmark.setAttribute('style','font-family: verdana, sans-serif; font-size: 10px;');
			divWithBenchmark.innerHTML = ( time2 - results ) + " ms   : " + name;
			divBench.appendChild( divWithBenchmark );
		}
	}
}

if(_$.location.indexOf('/off/')!=0)
{
	var dsp_general_bar = '';
	var dsp_general_param = '';
	var dsp_check_change_pictures = 1;
	if(_$.getUsername()!="")
	{
		var dsp_self_name = _$.getUsername();
		var dsp_self_num = _$.getNumber();
	}
	else
	{
		var dsp_self_name = "%username%";
		var dsp_self_num = 0;
	}

	if ( document.location.href.indexOf('/comments/') > -1 )
	{
		_$.addCSS(".new_only .comment { display:block !important; }");
	}

	function DSP_make_General_Bar()
	{
		//var time1 = new Date();
		var dsp_output = dsp_bars = dsp_params = '';
		var dsp_left_panel = _$.$c('left_col_nav')[0];
		for(var i=0; i<6; i++)
		{
				dsp_bars += '<div id="dsp_setting_button_'+i+'" style="background-color:#edf1f6;width:140px;height:30px;line-height:30px;border-top:1px solid #edf1f6;border-right:1px solid #b6b6b6">&nbsp;</div>';
				dsp_params += '<div id="dsp_setting_'+i+'" style="padding:10px 0 0 10px;display:none;border-top:1px solid #b6b6b6"></div>';
		}

		dsp_output += '<br><div style="background: #fff url(http://pit.dirty.ru/dirty/1/2010/04/27/11119-033725-660249a537b6f5822a9918ea8835026b.png) 7px 4px no-repeat;height:50px;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9"><a id="dsp_setting_bar" style="cursor:pointer;text-decoration:underline;line-height:50px;margin-left:62px">Настройки</a></div>';
		dsp_output += '<div id="_$.settings" style="display:none;position:fixed;top:'+((_$.viewarea_size().y-300)/2)+'px;left:'+((_$.viewarea_size().x-610)/2)+'px;width:610px;height:300px;z-index:2999"><table cellspacing="0" cellpadding="0" border="0" width="610" height="300"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" valign="top">';
		dsp_output += '<table cellspacing="0" cellpadding="0" width="100%" border="0" style="font-size: 110%;"><tr><td valign="top" colspan="1" height="30" style="font-size:140%;color:#5880af;"><a href="http://userscripts.org/scripts/show/88906">Service Pack 2</a></td><td valign="top" colspan="1" height="30" style="padding-left:5px; font-size:8%;color:#5880af;"></td><td width="40" align="right" valign="top"><div id="dsp_setting_close" style="background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div></td></tr><tr><td valign="top" width="140" style="">'+dsp_bars+'</td><td colspan="2" valign="top">'+dsp_params+'</td></tr></table>';
		dsp_output += '</td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table></div>';

		if ( dsp_left_panel == null )
		{
			var tablesArray = document.body.getElementsByTagName('table');
			var tdArray = tablesArray[5].getElementsByTagName('td');
			dsp_left_panel = document.createElement('div');
			tdArray[0].appendChild( dsp_left_panel );			
		}

		dsp_left_panel.innerHTML += dsp_output;

		_$.addEvent(_$.$('dsp_setting_bar'),'click',DSP_make_content_settings);
		_$.addEvent(_$.$('dsp_setting_close'),'click',function(){DSP_show_hide_window('_$.settings')});
		dsp_general_bar = _$.$('dsp_settings_panels');
		dsp_general_param = _$.$('dsp_settings_props');

		//addBenchmark( time1, 'general bar' );
	}

	function DSP_make_Setting_Bar(title,params,init){

		//var time1 = new Date();
		var dsp_setting_id = 0;

		while(dsp_setting_id<6){
			if(_$.$('dsp_setting_button_'+dsp_setting_id).innerHTML.length<10) break;
			else dsp_setting_id++;
		}

		_$.$('dsp_setting_button_'+dsp_setting_id).style.borderTop = '1px solid #b6b6b6';
		_$.$('dsp_setting_button_'+dsp_setting_id).innerHTML += '<span style="margin-left:10px;cursor:pointer" id="dsp_setting_link_'+dsp_setting_id+'">'+title+'</span>';
		_$.$('dsp_setting_'+dsp_setting_id).innerHTML += params;
		eval(init);

		_$.$('dsp_setting_button_'+dsp_setting_id).style.cursor="pointer";
		_$.addEvent(_$.$('dsp_setting_button_'+dsp_setting_id),'click',function(){DSP_show_hide_setting(dsp_setting_id)});
		//addBenchmark( time1, 'settings bar' );
	}

	function DSP_show_hide_window(name){
		var dsp_layer = _$.$(name);
		//dirty hack for opera
		if(dsp_layer.style.display=='block'){
			dsp_layer.style.display ="none";
			if(_$.browser().name=='opera'){
				var x = _$.current_scroll().x;
				var y = _$.current_scroll().y;
				_$.scroll_position(y+1, x);
				_$.scroll_position(y, x);
			}
		}else{
			dsp_layer.style.display ="block";
		}
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

function DSP_color_remove(obj)
{
	var user = _$.$t('a',obj.parentNode.parentNode.parentNode)[1].innerHTML;
	for(var i=0; i< _$.settings_colors.length; i++)
	{
		if( _$.settings_colors[i].indexOf(user+',')>-1)
		{
			//delete  temp_array[i];
			_$.settings_colors.splice(i,1);
		}
	}
	_$.set_save( null, 0 );
	DSP_paint_comment(user,'transparent','');
}

function DSP_save_color()
{
	var color = dsp_color_user.title.split('#').join('');
	var user = _$.$t('a',dsp_color_user.parentNode.parentNode)[1].innerHTML;
	var font = dsp_color_user.name;
	var checker = 0;
	for(var i=0; i < _$.settings_colors.length; i++)
	{
		if(_$.settings_colors[i].indexOf(user+',')>-1)
		{
			_$.settings_colors[i] = user+','+color+','+font;
			checker = 1;
			break;
		}
	}
	if(checker==0) _$.settings_colors.push(user+','+color+','+font);
	_$.set_save( null, 0 );
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
		if(!e) {e = window.event;}
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
					case 'left':a=1;b=0;c=-1;break;
					case 'right':a=1;b=0;c=1;break;
					case 'top':a=0;b=1;c=-1;break;
					default:a=0;b=1;c=1;break;
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
			if(m === 0) {return [ null, 0, v ];}
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h,s,v){
			if(h === null) {return [ v, v, v ];}
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0:return [v,n,m];
				case 1:return [n,v,m];
				case 2:return [m,v,n];
				case 3:return [m,n,v];
				case 4:return [n,m,v];
				case 5:return [v,m,n];
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
				dsp_closer.style.fontSize = '12px';
				dsp_closer.style.lineHeight = '18px';
				dsp_closer.style.textAlign = 'center';
				dsp_closer.style.color = '#fff';
				dsp_closer.style.cursor = 'pointer';
				dsp_closer.style.zIndex = 1400;
				dsp_closer.style.left = '237px';
				dsp_closer.style.top = '30px';
				dsp_closer.innerHTML = '<b>x</b>';
				_$.addEvent(dsp_closer,'click',function(){removePicker();});
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

			_$.addEvent(p.box,'mouseout',function() {otarget.focus();});
			_$.addEvent(p.box,'click',function(e) {holdPad && setPad(e);holdSld && setSld(e);});
			_$.addEvent(p.padM,'mouseout',function() {if(holdPad) {holdPad=false;dsp_jscolor.fireEvent(valueElement,'change');}});
			_$.addEvent(p.padM,'click',function(e) {holdPad=true;setPad(e);});
			_$.addEvent(p.sldM,'mouseout',function() {if(holdSld) {holdSld=false;dsp_jscolor.fireEvent(valueElement,'change');}});
			_$.addEvent(p.sldM,'click',function(e) {holdSld=true;setSld(e);});

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


function DSP_colorize_comments()
{
	for(var i=0; i<dsp_all_comments.length; i++)
	{
		var temp_name = _$.$t('a',dsp_all_comments[i])[1].innerHTML;
		var temp_color = '';
		var temp_font = '';
		for(var j=0; j < _$.settings_colors.length; j++)
		{
			if(_$.settings_colors[j].split(',')[0]==temp_name)
			{
				temp_color = _$.settings_colors[j].split(',')[1];
				temp_font = _$.settings_colors[j].split(',')[2];
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

//SP2
//turn events supression on to optimize loading time
var supressEvents = true;

_$.tooltip = {

	processLinks: function(elem){
		if(_$.settings.tooltip_on==0)return;
		var linkes = elem.getElementsByTagName('a');
		for(var i=0; i<linkes.length; i++){

		var dup_an = linkes[i].href.toString();

		if(dup_an.indexOf('/user/')>0&&
		   dup_an.indexOf('/posts/')<0 &&
			 dup_an.indexOf('/comments/')<0 &&
			 dup_an.indexOf('/favs/')<0 &&
			 linkes[i].className.indexOf("button") < 0
//					dup_an.indexOf('/'+dsp_self_name)<0 &&
//				dup_an[dup_an.length-2]!='/' &&
//				dup_an.indexOf('#')<0
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
	},

	processGreeting: function(){
		if(_$.settings.tooltip_show_self==1 && _$.settings.tooltip_on==1){
			_$.addEvent(_$.$t('a',_$.$c('header_tagline_inner')[0])[0],'mouseover',function(e){clearTimeout(dup_showing);dup_showBaloon(e.target)});
			_$.addEvent(_$.$t('a',_$.$c('header_tagline_inner')[0])[0],'mouseout',function(){clearTimeout(dup_showing);dup_processing=0});
		}
	},

	init: function(){

		if(_$.settings.tooltip_on==1){

			this.processLinks(document.body);
			this.processGreeting();

			//SP2
			function documentChanged(event) {
				if (supressEvents) {
					return;
				}
				if(typeof(event.target) !== 'undefined' && typeof(event.target.className) !== 'undefined'  && event.target.className.indexOf("comment")>-1){
					_$.tooltip.processLinks(event.target);
				}

				if(event.target !== null && typeof(event.target) !== 'undefined' && typeof(event.target.tagName) !== 'undefined' &&
					event.target.parentNode !== null
					&& event.target.parentNode.parentNode !== null
					&& event.target.parentNode.parentNode.parentNode !== null
					&& event.target.parentNode.parentNode.parentNode.parentNode !== null
					&& typeof(event.target.parentNode.parentNode.parentNode.parentNode) !== 'undefined'
					&& event.target.parentNode.parentNode.parentNode.parentNode.className !== null
					&& typeof(event.target.parentNode.parentNode.parentNode.parentNode.className) !== 'undefined'
					&& event.target.parentNode.parentNode.parentNode.parentNode.className.indexOf("vote_details") > -1 &&
					(event.target.tagName.toLowerCase()=='li')){
						_$.tooltip.processLinks(event.target);
				}
			}
			/* watch for any changed attributes */
			document.addEventListener("DOMNodeInserted", documentChanged, false);
		}
	}
};



var dup_showing = 0;
var dup_processing = 0;


function dup_showBaloon(obj){

	//if(_$.settings.tooltip_on==1){

		//if((obj.innerHTML.toString()==dsp_self_name&&_$.settings.tooltip_show_self==1)||obj.innerHTML!=dsp_self_name){

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
				//dup_getData(obj);
			}

			var dup_pos = _$.element_position(obj);
			var dup_leftOffset = (_$.settings.use_pictures==1)?35:10;

			dup_showing = setTimeout(function(){
					_$.$('dup_show_div').style.display = 'block';
					dup_getData(obj);
				},700);

			dup_div.style.top = (dup_pos.y+obj.offsetHeight+5)+'px';
			dup_div.style.left = (dup_pos.x-dup_leftOffset)+'px';
		//}
	//}
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

			if(dup_text.split('<span>с нами с ').length < 2){
				var dup_date = "неизвестно";
			}else{
				var dup_date = dup_text.split('<span>с нами с ')[1].split(' года')[0];
			}
			var dup_karma = dup_text.split(' onclick="voteDetailsHandler.show({type:\'karma\'')[1].split('>')[1].split('<')[0];
			var dup_pluses = dup_text.split('plus voted').length-1;
			var dup_minuses = dup_text.split('minus voted').length-1;

			dup_pluses = (dup_pluses>0)?'<span style="color:green;"><b>+'+dup_pluses+'</b></span>':0;
			dup_minuses = (dup_minuses>0)?'<span style="color:red;"><b>-'+dup_minuses+'</b></span>':0;

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
			dup_name = '<span style="font-size:130%;color:#'+((dup_sex=='m')?'009ced':'ff4fdc')+'"><b>'+dup_name+'</b></span>';

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


			if(dup_text.split('id="js-usernote">').length >= 2){
				var dup_note = dup_text.split('id="js-usernote">')[1].split('</em>')[0];
				if(dup_note!='Место для заметок о пользователе. Заметки видны только вам.'){

					dup_temp_body_mini = (dup_note.length>32)?dup_note.substring(0,32)+'...':dup_note;

					if(dup_temp_body_mini!=dup_note){
						dup_note = '<b>Ваша заметка:</b><div style="font-size:130%; cursor:help;background-color:#eee;padding:10px;font-family:Times New Roman" title="'+dup_note+'"><i>'+dup_temp_body_mini+'</i></div>';
					}
					else{
						dup_note = '<b>Ваша заметка:</b><div style="font-size:130%; background-color:#eee;padding:10px;font-family:Times New Roman"><i>'+dup_temp_body_mini+'</i></div>';
					}
				}
				else dup_note = '';
			}else{
				var dup_note = '';
			}

			dup_output = '<table cellspacing="0" cellpadding="0" border="0"><tr><td align="center" valign="top" style="padding-right:10px">'+dup_userpic+'<span style="color:#444">№'+dup_user_id+'</span><br>'+dup_parent+'<div style="margin-top:10px;font-size:10px"><b>Регистрация:</b><br>'+dup_date+'</div><div style="margin-top:5px; font-size: 130%;"><b>Карма: <span style="color:'+((dup_karma>=0)?'green':'red')+'">'+dup_karma+'</span></b></div></td>';
			dup_output += '<td valign="top"><div style="float:left;margin-bottom:5px">'+dup_name+'<br><span style="font-size:10px"><b>'+dup_country+'</b></span></div>';
			dup_output += '<div style="float:right;margin-left:5px;margin-bottom:5px"><span style="display:block'+((_$.settings.use_pictures=='1')?';background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png);background-repeat:no-repeat':'')+';width:36px;height:20px;line-height:20px;text-align:center;color:#fff;background-color:#999"><b>'+dup_prop+'</b></span></div>';
			dup_output += '<div style="clear:both">Автор <b>'+dup_posts+'</b> постов и <b>'+dup_comments+'</b> комментариев<br>Заработал'+((dup_sex=='f')?'а':'')+' голос <span style="color:#0069ac; font-size:130%;"><b>'+dup_vote+'</b></span> и рейтинг '+dup_raiting+'</div>';
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
			dup_temp = '<b>'+((dup_sex=='f')?'Её':'Его')+' оценка вас: <span style="color:'+((dup_temp>0)?'green">+':'red">')+dup_temp+'</span></b>';

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
			dup_temp = '<b>Ваша оценка '+((dup_sex=='f')?'её':'его')+': <span style="color:'+((dup_temp>0)?'green">+':'red">')+dup_temp+'</span></b>';

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

function add_checkbox_event(checkboxId, optionId){
	_$.addEvent(_$.$(checkboxId),'click',
	function(){
		if(_$.$(checkboxId).checked===true) _$.set_save(optionId,1);
		else _$.set_save(optionId,0);
	});
}

function dsp_d3search_init(){
	//SP2 - STEP THREE
	_$.addEvent(_$.$('dsp_c_d3search'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_new_window');

		if(_$.$('dsp_c_d3search').checked===true) _$.set_save('d3search',1);
		else _$.set_save('d3search',0);

	});

	add_checkbox_event('dsp_c_new_window','new_window');
	add_checkbox_event('dsp_c_user_stats','user_stats');
	add_checkbox_event('dsp_c_links_test','links_test');
	add_checkbox_event('dsp_c_d3search_quick','d3search_quick');
	
}

function dsp_general_init(){

	add_checkbox_event('dsp_c_moderate','moderate');
	
	//SP2
	add_checkbox_event('dsp_c_youtube_preview','youtube_preview');
	add_checkbox_event('dsp_c_online_enabled','online_enabled');


	if(_$.browser().name != "chrome")add_checkbox_event('dsp_c_smooth_scroll','smooth_scroll');
	_$.addEvent(_$.$('dsp_c_comment_scroller'),'click',
	function(){
		if(_$.browser().name != "chrome")DSP_show_hide_menu('dsp_l_scroll');

		if(_$.$('dsp_c_comment_scroller').checked===true) _$.set_save('comment_scroller',1);
		else _$.set_save('comment_scroller',0);

	});


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

	_$.addEvent(_$.$('dsp_c_ignorlist'), 'click',
	function()
	{
		if (_$.$('dsp_c_ignorlist').checked === true) _$.set_save('ignorlist', 1);
		else _$.set_save('ignorlist', 0);
	});
	
}

function dsp_posts_init(){
	//SP2

    add_checkbox_event('dsp_c_posts_spades','posts_spades');

	_$.addEvent(_$.$('dsp_c_posts_threshold'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_threshold');

		if(_$.$('dsp_c_posts_threshold').checked===true) _$.set_save('posts_threshold',1);
		else _$.set_save('posts_threshold',0);

	});

    add_checkbox_event('dsp_c_own_threshold','own_threshold');
	add_checkbox_event('dsp_c_posts_threshold_use_or','posts_threshold_use_or');

	add_checkbox_event('dsp_c_read_button','read_button');
	
	_$.addEvent(_$.$('dsp_c_dirty_tags'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_dirty_tags');
		if(_$.$('dsp_c_dirty_tags').checked===true) _$.set_save('dirty_tags',1);
		else _$.set_save('dirty_tags',0);
	});
	
	add_checkbox_event('dsp_c_dirty_tags_hidetags','dirty_tags_hidetags');
	add_checkbox_event('dsp_c_dirty_tags_autogold','dirty_tags_autogold');

	_$.addEvent(_$.$('dsp_c_instant_search'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_instant_search');
		if(_$.$('dsp_c_instant_search').checked===true) _$.set_save('instant_search',1);
		else _$.set_save('instant_search',0);
	});
	add_checkbox_event('dsp_c_instant_search_hide','instant_search_hide');

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


		
	add_checkbox_event('dsp_c_post_content_filter_layout','post_content_filter_layout');
}

function dsp_comments_init(){

	//SP2
	add_checkbox_event('dsp_c_quotes','quotes');
	add_checkbox_event('dsp_c_arrows_on','arrows_on');
	add_checkbox_event('dsp_c_comments_threshold','comments_threshold');
	add_checkbox_event('dsp_c_comments_order','comments_order');

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
	//SP2
	add_checkbox_event('dsp_c_karma_log','karma_log');
	add_checkbox_event('dsp_c_inbox_text','inbox_text');
	add_checkbox_event('dsp_c_inbox_recreate','inbox_recreate');
	add_checkbox_event('dsp_c_ban_encoding','ban_encoding');
	add_checkbox_event('dsp_c_timings_display','timings_display');

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

	// start events for gertrudes options
	_$.addEvent(_$.$('dsp_c_grt_enabled'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_grt_enabled');

		if(_$.$('dsp_c_grt_enabled').checked===true) _$.set_save('grt_enabled',1);
		else _$.set_save('grt_enabled',0);

	});
	_$.addEvent(_$.$('dsp_c_grt_random_off'),'click',
	function(){
		_$.set_save('grt_random',0);
	});
	_$.addEvent(_$.$('dsp_c_grt_random_on'),'click',
	function(){
		_$.set_save('grt_random',1);
	});
	// end events for gertrudes options

}

function DSP_make_content_settings(){

	if(_$.$('dsp_setting_button_0').innerHTML.length<10){

		var dsp_txt = '<table cellspacing="0" border="0">';
		//SP2 adding scripts - STEP TWO
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_moderate" type="checkbox" '+((_$.settings.moderate=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_moderate">Альтернативная модерация</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_comment_scroller" type="checkbox" '+((_$.settings.comment_scroller=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_comment_scroller">SP2.0: Навигация по комментариям и постам</label></td></tr>';
		dsp_txt += '</table>';
		if(_$.browser().name != "chrome"){
		dsp_txt += '<div id="dsp_l_scroll" style="display:'+((_$.settings.comment_scroller=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left:20px;">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_smooth_scroll" type="checkbox" '+((_$.settings.smooth_scroll=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_smooth_scroll">Плавная прокрутка</label></td></tr>';
		dsp_txt += '</table></div>';
		}
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_youtube_preview" type="checkbox" '+((_$.settings.youtube_preview=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_youtube_preview">SP2.0: Предпросмотр youtube видео в постах и комментариях</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_online_enabled" type="checkbox" '+((_$.settings.online_enabled=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_online_enabled">SP2.5: Показывать кто на сайте</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_username_replace" type="checkbox" '+((_$.settings.username_replace=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_username_replace">Заменять %username% на ваше имя</label></td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_ignorlist" type="checkbox" ' + ((_$.settings.ignorlist == '1') ? 'checked="checked"' : '') + '></td><td style=""><label for="dsp_c_ignorlist">Игнорирование выбранных пользователей</label></td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_favicon_on" type="checkbox" '+((_$.settings.favicon_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_favicon_on">Показывать иконку сайта ссылки:</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_favicon" style="display:'+((_$.settings.favicon_on=='1')?'block':'none')+'"><form style="margin:0"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td align="right" width="45"><input name="dsp_favicon_s" value="1" id="dsp_c_favicon_style_a" type="radio" '+((_$.settings.favicon_style=='1')?'checked="checked"':'')+'></td><td style=";color:#777"><label for="dsp_c_favicon_style_a">при наведении - над ссылкой</label></td></tr>';
		dsp_txt += '<tr><td align="right"><input name="dsp_favicon_s" value="0" id="dsp_c_favicon_style_b" type="radio" '+((_$.settings.favicon_style=='0')?'checked="checked"':'')+'></td><td style=";color:#777"><label for="dsp_c_favicon_style_b">всегда перед ссылкой</label></td></tr>';
		dsp_txt += '</table></form>';
		dsp_txt += '</div>';
		dsp_txt += '<div><a href="#" onclick="localStorage.setItem(\'lastD3sFetchTimestamp\', 0); window.location.reload();">Принудительно обновить списки гертруд, иконок и.т.д.</a></div>';

		DSP_make_Setting_Bar('Общие',dsp_txt,'dsp_general_init()');

		dsp_txt = '<table cellspacing="0" border="0">';
		//SP2
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_posts_spades" type="checkbox" '+((_$.settings.posts_spades=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_posts_spades">Лопаты</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_posts_threshold" type="checkbox" '+((_$.settings.posts_threshold=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_posts_threshold">SP2.0: Фильтр по рейтингу постов</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_threshold" style="display:'+((_$.settings.posts_threshold=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left:20px;">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_own_threshold" type="checkbox" '+((_$.settings.own_threshold=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_own_threshold">Корректировать родной фильтр (см. FAQ)</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_posts_threshold_use_or" type="checkbox" '+((_$.settings.posts_threshold_use_or=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_posts_threshold_use_or">Использовать ИЛИ</label></td></tr>';
		dsp_txt += '</table></div>';
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_dirty_tags" type="checkbox" '+((_$.settings.dirty_tags=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_dirty_tags">SP2.0: Dirty Tags</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_dirty_tags" style="display:'+((_$.settings.dirty_tags=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left: 25px;">';
		dsp_txt += '<tr><td align="right" width="25"><input id="dsp_c_dirty_tags_autogold" type="checkbox" '+((_$.settings.dirty_tags_autogold=='1')?'checked="checked"':'')+'></td><td><label for="dsp_c_dirty_tags_autogold">Ставить автоматически "Золотой пост"</label></td></tr>';
		dsp_txt += '<tr><td align="right"><input id="dsp_c_dirty_tags_hidetags" type="checkbox" '+((_$.settings.dirty_tags_hidetags=='1')?'checked="checked"':'')+'></td><td><label for="dsp_c_dirty_tags_hidetags">Прятать список тегов под ссылку</label></td></tr>';
		dsp_txt += '</table></div>';
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_instant_search" type="checkbox" '+((_$.settings.instant_search=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_instant_search">SP2.5: Поиск по комментариям в постах</label></td></tr>';
		dsp_txt += '</table>';		
		dsp_txt += '<div id="dsp_l_instant_search" style="display:'+((_$.settings.instant_search=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left: 25px;">';
		dsp_txt += '<tr><td align="right" width="25"><input id="dsp_c_instant_search_hide" type="checkbox" '+((_$.settings.instant_search_hide=='1')?'checked="checked"':'')+'></td><td><label for="dsp_c_instant_search_hide">Прятать отфильтрованные комментарии совсем</label></td></tr>';
		dsp_txt += '</table></div>';
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_read_button" type="checkbox" '+((_$.settings.read_button=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_read_button">SP2.0: Кнопка прочтения новых комментариев</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_posts_average" type="checkbox" '+((_$.settings.posts_average=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_posts_average">Показывать средние ID и оценку</label></td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_youtube_fullscreen" type="checkbox" '+((_$.settings.youtube_fullscreen=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_youtube_fullscreen">Кнопка "Fullscreen" в постах с видеороликами youtube</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_post_content_filter_layout" type="checkbox" '+((_$.settings.post_content_filter_layout=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_post_content_filter_layout">Фильтр контента без чекбоксов</label></td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Посты',dsp_txt,'dsp_posts_init()');

		dsp_txt = '<table cellspacing="0" border="0">';
		//SP2
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_quotes" type="checkbox" '+((_$.settings.quotes=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_quotes">SP2.0: Цитатник</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_comments_threshold" type="checkbox" '+((_$.settings.comments_threshold=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_comments_threshold">SP2.0: Продвинутый фильтр по рейтингу</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_comments_order" type="checkbox" '+((_$.settings.comments_order=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_comments_order">SP2.0: Списком->Деревом->Реверс</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_arrows_on" type="checkbox" '+((_$.settings.arrows_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_arrows_on">SP2.0: Увеличить стрелочки под комментарием</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_colors_on" type="checkbox" '+((_$.settings.colors_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_colors_on">Изменять цвет комментариев пользователей</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_colors" style="display:'+((_$.settings.colors_on=='1')?'block':'none')+'"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_colors_border" type="checkbox" '+((_$.settings.colors_border=='1')?'checked="checked"':'')+'></td><td style="color:#777"><label for="dsp_c_colors_border">Выделять рамкой новые комментарии</label></td></tr>';
		dsp_txt += '</table></div>';

		DSP_make_Setting_Bar('Комментарии',dsp_txt,'dsp_comments_init()');
		var dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_d3search" type="checkbox" '+((_$.settings.d3search=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_d3search">SP2.0: Замена поиска на <a href="http://d3search.ru" target="_blank">d3search.ru</a></label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_new_window" style="display:'+((_$.settings.d3search=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left:20px;">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_new_window" type="checkbox" '+((_$.settings.new_window=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_new_window">Результаты поиска в новом окне</label></td></tr>';
		dsp_txt += '</table></div>';
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_links_test" type="checkbox" '+((_$.settings.links_test=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_links_test">SP2.0: Проверка ссылок при написании поста на d3search</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_user_stats" type="checkbox" '+((_$.settings.user_stats=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_user_stats">SP2.0: Статистика в профилях</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_d3search_quick" type="checkbox" '+((_$.settings.d3search_quick=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_d3search_quick">Кнопка быстрого поиска на d3search</label></td></tr>';
		dsp_txt += '</table>';
		DSP_make_Setting_Bar('d3search',dsp_txt,'dsp_d3search_init()');

		dsp_txt = '<table cellspacing="0" border="0">';
		//SP2
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_karma_log" type="checkbox" '+((_$.settings.karma_log=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_karma_log">SP2.0: Комментарии к карме</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_ban_encoding" type="checkbox" '+((_$.settings.ban_encoding=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_ban_encoding">SP2.0: Править кодировку в бан-блогах</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_inbox_recreate" type="checkbox" '+((_$.settings.inbox_recreate=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_inbox_recreate">SP2.0: Кнопка пересоздания инбокса</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_inbox_text" type="checkbox" '+((_$.settings.inbox_text=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_inbox_text">SP2.5: Добавлять "Инбокс" к конверту</label></td></tr>';
		// start gertrudes options
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_grt_enabled" type="checkbox" '+((_$.settings.grt_enabled=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_grt_enabled">SP2.5: Показывать новые гертруды и приветствия</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_grt_enabled" style="display:'+((_$.settings.grt_enabled=='1')?'block':'none')+'"><form style="margin:0"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td align="right" width="45"><input name="dsp_grt_random_s" value="1" id="dsp_c_grt_random_on" type="radio" '+((_$.settings.grt_random=='1')?'checked="checked"':'')+'></td><td style=";color:#777"><label for="dsp_c_grt_random_on">Смешивать со старыми случайно</label></td></tr>';
		dsp_txt += '<tr><td align="right"><input name="dsp_grt_random_s" value="0" id="dsp_c_grt_random_off" type="radio" '+((_$.settings.grt_random=='0')?'checked="checked"':'')+'></td><td style=";color:#777"><label for="dsp_c_grt_random_off">Только новые</label></td></tr>';
		dsp_txt += '</table></form></div>';
		// end gertrudes options
		dsp_txt += '<table cellspacing="0" border="0"><tr><td width="25" valign="top"><input id="dsp_c_tooltip_on" type="checkbox" '+((_$.settings.tooltip_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_tooltip_on">Включить Dirty Tooltip</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_tooltip" style="display:'+((_$.settings.tooltip_on=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left: 25px;">';
		dsp_txt += '<tr><td align="right" width="25"><input id="dsp_c_use_picture" type="checkbox" '+((_$.settings.use_pictures=='0')?'checked="checked"':'')+'></td><td><label for="dsp_c_use_picture">Режим "без картинок"</label></td></tr>';
		dsp_txt += '<tr><td align="right"><input id="dsp_c_tooltip_show_self" type="checkbox" '+((_$.settings.favicon_style=='0')?'checked="checked"':'')+'></td><td><label for="dsp_c_tooltip_show_self">Тултип на ссылке возле logout</label></td></tr>';
		dsp_txt += '</table></div>';
		dsp_txt += '<table cellspacing="0" border="0">'
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_timings_display" type="checkbox" '+((_$.settings.timings_display=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_timings_display">SP2.5: Показывать время выполнения</label></td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Tooltip & Misc',dsp_txt,'dsp_tooltip_init()');

	}
	DSP_show_hide_window('_$.settings');
}


function DSP_init()
{
	if ( document.querySelector('div.content_left') != null || document.location.href.indexOf('music.dirty') > -1 )
	{
		var time1 = new Date();
		DSP_make_General_Bar();
		DSP_show_hide_setting(0);
		addBenchmark( time1, 'dsp init' );   
		
		var ulLeft = document.querySelector('ul.left_col_nav')
		if ( ulLeft)
		{
		    liLast = ulLeft.getElementsByTagName('li');
		    if ( liLast )
		    {
		    	liItem = document.createElement('li');
		    	aItem = document.createElement('a');
		    	aItem.setAttribute('href', 'http://inboxes.d3search.ru/');
		    	aItem.innerHTML = 'Список инбоксов';
		    	aItem.setAttribute('target', '_blank');
		    	liItem.appendChild(aItem);
		    	ulLeft.insertBefore(liItem, liLast[liLast.length - 1]);

		    	liItem = document.createElement('li');
		    	aItem = document.createElement('a');
		    	aItem.setAttribute('href', 'http://d3search.ru/stat');
		    	aItem.setAttribute('target', '_blank');
		    	aItem.innerHTML = 'Статистика';
		    	liItem.appendChild(aItem);
		    	ulLeft.insertBefore(liItem, liLast[liLast.length - 1]);

		    	liItem = document.createElement('li');
		    	aItem = document.createElement('a');
		    	aItem.setAttribute('href', 'http://d3search.ru/roulette');
		    	aItem.setAttribute('target', '_blank');
		    	aItem.innerHTML = 'КДПВ рулет';
		    	liItem.appendChild(aItem);
		    	ulLeft.insertBefore(liItem, liLast[liLast.length - 1]);

		    	liItem = document.createElement('li');
		    	aItem = document.createElement('a');
		    	aItem.setAttribute('href', 'http://together.ru/');
		    	aItem.setAttribute('target', '_blank');
		    	aItem.innerHTML = 'Сообщество "Тугеза"';
		    	liItem.appendChild(aItem);
		    	ulLeft.insertBefore(liItem, liLast[liLast.length - 1]);
            }
		}		
	}

	// made by crea7or
	// start of ignorlist
	function commentShowHideIgnorList(commentId, showIfTrue)
	{
		var commentDiv = document.getElementById(commentId + '-sh-body');
		var commentDivHeader = document.getElementById(commentId + '-sh-header');
		if (commentDiv)
		{
			if (showIfTrue)
			{
				commentDiv.removeAttribute('style');
				commentDivHeader.removeAttribute('style');
				var commentAlink = document.getElementById(commentId + '-sh');
				if (commentAlink)
				{
					commentAlink.setAttribute('onclick', "return commentShowHideIgnorList('" + commentId + "', false );")
					commentAlink.innerHTML = 'убрать это';
				}
			}
			else
			{
				commentDiv.setAttribute('style', 'display: none');
				commentDivHeader.setAttribute('style', 'opacity: 0.5');
				var commentAlink = document.getElementById(commentId + '-sh');
				if (commentAlink)
				{
					commentAlink.setAttribute('onclick', "return commentShowHideIgnorList('" + commentId + "', true );")
					commentAlink.innerHTML = 'а что там?';
				}
			}
		}
		return false;
	}
	
	
	function hideIgnoredPosts()
	{
		var ignoredPost;
		for (childNodeIndex = 0; childNodeIndex < postHolderDiv.childNodes.length; childNodeIndex++)
		{
			if (postHolderDiv.childNodes[childNodeIndex].nodeName == 'DIV')
			{
				// ignore users
				ignoredPost = 0;
				
				ddDiv = postHolderDiv.childNodes[childNodeIndex].querySelector('div.dd');
				if (ddDiv != null)
				{
					ddLinks = ddDiv.getElementsByTagName('a');
					for (userLinkInd = 0; userLinkInd < ddLinks.length; userLinkInd++)
					{
						if (ddLinks[userLinkInd].getAttribute('href').indexOf('/user/') > -1)
						{
							for (ignorListIndex = 0; ignorListIndex < _$.settings_ignorlist.length; ignorListIndex++)
							{
								if (ddLinks[userLinkInd].innerHTML.indexOf(_$.settings_ignorlist[ignorListIndex]) > -1)
								{
									postHolderDiv.childNodes[childNodeIndex].setAttribute('style', 'display: none');
									ignoredPost = 1;
									break;
								}
							}
						}
					}
				}
				// ignore words
				if ( ignoredPost == 0 )
				{
					dtDiv = postHolderDiv.childNodes[childNodeIndex].querySelector('div.dt');
					if (dtDiv != null)
					{
						for (ignorListIndex = 0; ignorListIndex < _$.settings_ignorTextlist.length; ignorListIndex++)
						{					
							if (dtDiv.innerHTML.search(new RegExp(( _$.settings_ignorTextlist[ ignorListIndex] + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1"), 'ig')) > -1)
							{
								postHolderDiv.childNodes[childNodeIndex].setAttribute('style', 'display: none');
								break;
							}
						}
					}					
				}
			}
		}
	}
	
	function showBlockedWords()
	{
		mainContainer = document.getElementById('sp-BlockedWords');
		if ( mainContainer.firstChild != null )
		{
			mainContainer.removeChild( mainContainer.firstChild );
		}
		newContainer = document.createElement('div');
		newContainer.innerHTML = '<br><br><b>Список слов, которые вы заблокировали:</b><br>';

		for (blockedWordIndex = 0; blockedWordIndex < _$.settings_ignorTextlist.length; blockedWordIndex++)
		{
			blockToAdd = document.createElement('div');
			blockToAdd.appendChild(document.createTextNode(' '));
			linkToBlock = document.createElement('a');
			linkToBlock.setAttribute('href', '#');
			linkToBlock.innerHTML = "<strong>[x]</strong>";
			linkToBlock.setAttribute('style', 'text-decoration:none');
			linkToBlock.setAttribute('title', _$.settings_ignorTextlist[blockedWordIndex ]);
			blockToAdd.appendChild(linkToBlock);
			blockToAdd.appendChild(document.createTextNode('  '));
			blockToAdd.appendChild(document.createTextNode( _$.settings_ignorTextlist[blockedWordIndex ] ));
			newContainer.appendChild(blockToAdd);

			linkToBlock.addEventListener('click', function()
			{
				requestConfirm = confirm('Разблокировать слово: ' + this.getAttribute('title') + ' ?')
				if (requestConfirm)
				{
					for (blockedWordIndex = 0; blockedWordIndex < _$.settings_ignorTextlist.length; blockedWordIndex++)
					{
						if (_$.settings_ignorTextlist[blockedWordIndex] == this.getAttribute('title'))
						{
							_$.settings_ignorTextlist.splice(blockedWordIndex, 1);
							blockedWordIndex--;
						}
					}
					this.parentNode.parentNode.removeChild(this.parentNode);
					_$.set_save();
				}
			}, false);
		}
		if (_$.settings_ignorTextlist.length == 0)
		{
			newContainer.appendChild(document.createTextNode('Ура! Читаем - всё!'));
		}		
		mainContainer.appendChild( newContainer );
	}

	function showBlockedUsers()
	{
		mainContainer = document.getElementById('sp-BlockedUsers');
		if (mainContainer.firstChild != null)
		{
			mainContainer.removeChild(mainContainer.firstChild);
		}
		newContainer = document.createElement('div');
		newContainer.innerHTML = '<br><br><b>Список людей, которых вы заблокировали:</b><br>';

		for (blockedUserIndex = 0; blockedUserIndex < _$.settings_ignorlist.length; blockedUserIndex++)
		{

			blockToAdd = document.createElement('div');
			blockToAdd.appendChild(document.createTextNode(' '));
			linkToBlock = document.createElement('a');
			linkToBlock.setAttribute('href', '#');
			linkToBlock.innerHTML = "<strong>[x]</strong>";
			linkToBlock.setAttribute('style', 'text-decoration:none');
			linkToBlock.setAttribute('title', _$.settings_ignorlist[blockedUserIndex ]);			
			blockToAdd.appendChild(linkToBlock);
			blockToAdd.appendChild(document.createTextNode('  '));

			linkToUser = document.createElement('a');
			linkToUser.setAttribute('href', 'http://dirty.ru/user/' + _$.settings_ignorlist[blockedUserIndex] + '/');
			linkToUser.innerHTML = _$.settings_ignorlist[blockedUserIndex];

			blockToAdd.appendChild(linkToUser);

			newContainer.appendChild(blockToAdd);

			linkToBlock.addEventListener('click', function()
			{
				requestConfirm = confirm('Снова смотреть посты пользователя ' + this.getAttribute('title') + ' ?')
				if (requestConfirm)
				{
					for (blockedUsrIndex = 0; blockedUsrIndex < _$.settings_ignorlist.length; blockedUsrIndex++)
					{
						if (_$.settings_ignorlist[blockedUsrIndex] == this.getAttribute('title'))
						{
							_$.settings_ignorlist.splice(blockedUsrIndex, 1);
							blockedUsrIndex--;
						}
					}
					this.parentNode.parentNode.removeChild(this.parentNode);
					_$.set_save();
				}
			}, false);
		}

		if (_$.settings_ignorlist.length == 0)
		{
			newContainer.appendChild(document.createTextNode('Мир вам, нет тут никого.'));
		}		
		mainContainer.appendChild(newContainer);
	}

	if (_$.settings.ignorlist == '1')
	{
		var time1 = new Date();
		postHolderDiv = document.getElementById('js-posts_holder');
		if (postHolderDiv != null &&  location.pathname.indexOf('inbox') == -1 )
		{
			hideIgnoredPosts();
		}
		else
		{
			if ( location.pathname.indexOf('/my/socialism/') > -1)
			{
				td2td = document.getElementById('td2');
				if (td2td != null)
				{
					newContainer = document.createElement('div');
					newContainer.innerHTML = '<br><br><b>Заблокируем какое-нибудь ключевое слово?</b><br>';
					
					newInput = document.createElement('input');
					newInput.setAttribute('type', 'text');
					newInput.setAttribute('id', 'sp-textToBlock');
					newContainer.appendChild(newInput);
					newImage = document.createElement('img');
					newImage.setAttribute('src', 'http://img.dirty.ru/d3/social-add-button.gif');
					newImage.setAttribute('alt', 'Заблокировать ключевое слово');
					newContainer.appendChild(newImage);
					newImage.addEventListener('click', function()
					{
						userName = document.getElementById('sp-textToBlock').value;
						requestConfirm = confirm('Заблокировать ключевое слово ' + userName + ' ?')
						if (requestConfirm)
						{
							_$.settings_ignorTextlist.push(userName);
							_$.set_save();
							showBlockedWords();
						}
						document.getElementById('sp-userToBlock').value = "";
					}, false);
					
					td2td.appendChild(newContainer);

					newContainer = document.createElement('div');
					newContainer.setAttribute('id', 'sp-BlockedWords');
					td2td.appendChild(newContainer);
					showBlockedWords();					
				
					newContainer = document.createElement('div');
					newContainer.innerHTML = '<br><br><b>Может заблокируем кого-нибудь?</b><br>';

					newInput = document.createElement('input');
					newInput.setAttribute('type', 'text');
					newInput.setAttribute('id', 'sp-userToBlock');
					newContainer.appendChild( newInput );
					newImage = document.createElement('img');
					newImage.setAttribute('src','http://img.dirty.ru/d3/social-add-button.gif');
					newImage.setAttribute('alt','Заблокировать пользователя');
					newContainer.appendChild( newImage );
					newImage.addEventListener('click', function()
					{
						userName = document.getElementById('sp-userToBlock').value;
						requestConfirm = confirm('Заблокировать пользователя ' + userName + ' ?')
						if (requestConfirm)
						{
							_$.settings_ignorlist.push( userName );
							_$.set_save();
							showBlockedUsers();
						}
						document.getElementById('sp-userToBlock').value = "";
					}, false);
							
					td2td.appendChild(newContainer);
					
					newContainer = document.createElement('div');
					newContainer.setAttribute('id', 'sp-BlockedUsers');
					td2td.appendChild(newContainer);
					showBlockedUsers();
				}
			}
			
			if (location.pathname.indexOf('/comments/') > -1)
			{
				_$.injectScript( commentShowHideIgnorList );
	
				var currentCommentId;
				var currentCommentBody;
				var currentCommentHeader;
				var commentUserNameA;
				var hideShowLink;
				var newLinkToShowHide;
				var spaceSpan;
				var commentsHolder = document.getElementById('js-commentsHolder');
				for (var indexOfComment = 0; indexOfComment < commentsHolder.childNodes.length; indexOfComment++)
				{
					if (commentsHolder.childNodes[indexOfComment].nodeName == 'DIV')
					{
						currentCommentId = commentsHolder.childNodes[indexOfComment].getAttribute('id');
//						currentCommentBody = commentsHolder.childNodes[indexOfComment].childNodes[1].childNodes[1];
						currentCommentBody = commentsHolder.childNodes[indexOfComment].querySelector('div.c_body');
//						currentCommentHeader = commentsHolder.childNodes[indexOfComment].childNodes[1].childNodes[3];
						currentCommentHeader = commentsHolder.childNodes[indexOfComment].querySelector('div.c_footer');
						commentUserNameA = currentCommentHeader.querySelector('a.c_user');
						
						for ( ignUserIndex = 0; ignUserIndex < _$.settings_ignorlist.length; ignUserIndex++ )
						{							
							if ( _$.settings_ignorlist[ignUserIndex] == commentUserNameA.innerHTML )
							{
								currentCommentBody.setAttribute('id', currentCommentId + '-sh-body');
								currentCommentHeader.setAttribute('id', currentCommentId + '-sh-header');
								spaceSpan = document.createElement('span');
								spaceSpan.innerHTML = "&nbsp;&nbsp";
								currentCommentHeader.appendChild(spaceSpan);
								newLinkToShowHide = document.createElement('a');
								newLinkToShowHide.setAttribute('href', '#');
								newLinkToShowHide.setAttribute('id', currentCommentId + '-sh');
								currentCommentHeader.appendChild(newLinkToShowHide);
								commentShowHideIgnorList( currentCommentId, false );
							}
						}
					}
				}
			}
		}
		addBenchmark(time1, 'ignorlist');
	}
// end of ignorlist

// start favicons
if(_$.settings.favicon_on=='1'&&_$.settings.use_pictures=='1')
{
	//global vars + some config
	var domainArray = new Object();
	var faviconUrls = new Array();
	var faviconImages = new Array();
	var faviconsAtOnce = 40;
	var query = "http://favicon.yandex.net/favicon/";
	//

	objectSize = function(obj) {
		var size = 0, key;
		for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
	

	function extractDomain(domain){
		if(typeof(domain) === 'undefined'){
			return "";
		}
		//normalize, 'www.ru' will not work ;)
		domain = domain.toLowerCase().replace(/^www\./, "");
		//more work, extract root domain
		var s = domain.split('.');
		//let us hope that it works, do not want to check all TLDs
		if(s.length > 2){
			if(s[s.length-2].length == 2){
				//form like blabla.**.blabla
				//domain has 3 segments
				domain = s.slice(-3).join('.');
			}else{
				domain = s.slice(-2).join('.');
			}
		}
		return domain;		
	}
	
	function DSP_show_favicon(obj,show){
			if(show==1){
				var favicon = 'http://favicon.yandex.net/favicon/'+extractDomain(obj.toString().split('/')[2]);
				obj.style.paddingTop='16px';
				obj.style.backgroundImage = 'url('+favicon+')';//,url(http://pit.dirty.ru/dirty/1/2010/10/31/28281-154853-236c6922bc86581a4d9fbf18719fb16b.png)';
				obj.style.backgroundRepeat = 'no-repeat';//, no-repeat';
			}
			else obj.style.backgroundImage = 'none';
	}
	
	//TODO: make editable by the user
	function inWhiteList(domain){
		if(domain.length==0)return false;
	
		//TODO: populate this line with 2nd level domains
		//whitelist = "dirty.ru, livejournal.com, wikipedia.org, leprosorium.ru, rian.ru, ebay.com, flickr.com, lenta.ru, yandex.net, yandex.ru, youtube.com, 1tv.ru, wikimedia.org, nytimes.com, d3search.ru, adm-dirty.ru";
		var whitelist = jsonParse( localStorGetItem( 'faviconsWhitelist',"[]"));
		
		if(whitelist == "*"){
			return true;
		}else{
			whitelist = whitelist+",";
			//next line done in the caller function
			//domain = extractDomain(domain);
			if(whitelist.indexOf(domain+",")>-1) {
				return true;
			}else{
				return false;
			}
		}
	
	}

	if(_$.location.indexOf('/user/')<0)
	{
		var time1 = new Date();
		//dsp_elements = _$.$t('a',_$.$('js-posts_holder'));
		dsp_elements = document.querySelectorAll('div.dt > a, div.c_body > a');
		if(_$.settings.favicon_style=='1')
		{
			for(var i=0;i<dsp_elements.length;i++)
			{
				raw_domain = extractDomain(dsp_elements[i].toString().split('/')[2]);
				if(dsp_elements[i].toString().indexOf('http://')!=-1&&inWhiteList(raw_domain))
				{
					_$.addEvent(dsp_elements[i],'mouseover',function(e){DSP_show_favicon(e.target,1);});
					_$.addEvent(dsp_elements[i],'mouseout',function(e){DSP_show_favicon(e.target,0);});
				}
			}
		}
		else
		{
		  var youTube = -1;
			for(var i=0;i<dsp_elements.length;i++)
			{
				raw_domain = extractDomain(dsp_elements[i].toString().split('/')[2]);
				if(dsp_elements[i].toString().indexOf('http://')!=-1&&inWhiteList(raw_domain))
				{
					if(raw_domain!="youtube.com"){
						if(typeof(domainArray[raw_domain]) === "undefined"){
							domainArray[raw_domain] = objectSize(domainArray);
							lastDomain = raw_domain;
						}
					}else{
						youTube=1;
					}
				}
			}
			//hack: make sure that youtube ist on the last position
			if(youTube==1){
				domainArray["youtube.com"] = objectSize(domainArray);		
			}
			
			//forming query for yandex			
			list = "";
			var counter = 0;
			for (var domain in domainArray) {
				list += domain + '/';
				counter++;
				if(counter == faviconsAtOnce){
					faviconUrls[faviconUrls.length] = query+list;
					list = "";
					counter=0;
				}
			}
			//some unsubmitted icons?
			if(counter>0)faviconUrls[faviconUrls.length] = query+list;
			for(var i=0;i<dsp_elements.length;i++)
			{
				raw_domain = extractDomain(dsp_elements[i].toString().split('/')[2]);
				if(dsp_elements[i].toString().indexOf('http://')!=-1&&inWhiteList(raw_domain))
				{
					//var favicon = 'http://favicon.yandex.net/favicon/'+dsp_elements[i].toString().split('/')[2]+'/dirty.ru/';
					domainNr = domainArray[raw_domain];
					imageNr = Math.floor(domainNr/faviconsAtOnce);
					offset = (domainNr-faviconsAtOnce*imageNr) * 16;
					dsp_elements[i].style.paddingLeft = '19px';
					dsp_elements[i].style.backgroundRepeat = 'no-repeat';//, no-repeat';
					dsp_elements[i].style.backgroundPosition = "0px -"+offset+"px";
					dsp_elements[i].style.backgroundImage = 'url('+faviconUrls[imageNr]+')';
					//dsp_elements[i].style.backgroundImage = 'url('+favicon+')';//,url(http://pit.dirty.ru/dirty/1/2010/10/31/28281-154853-236c6922bc86581a4d9fbf18719fb16b.png)';
				}
			}
		
		}
		addBenchmark( time1, 'favicons' );
	}
	function submitFavQuery(){
	}
}
// end favicons

// start Average IDs and Votes
if(_$.settings.posts_average=='1')
{
	if(_$.location.indexOf('/comments/')==0)
	{
		var time1 = new Date();

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
		//dsp_average_votes = '';

		if(isNaN(dsp_votes_count)) dsp_votes_count = 0;
		if(isNaN(dsp_ids_count)) dsp_ids_count = 0;

		_$.$('dsp_layer_posts_average').innerHTML += ' | &#216;id '+dsp_ids_count+' | &#216;&#177; '+dsp_votes_count;

		if(dsp_temp_length>=0)_$.$('dsp_layer_posts_average').innerHTML += ' | '+dsp_average_votes.length+' комментариев'

		addBenchmark( time1, 'post average' );
	}
}// end Average IDs and Votes


// Username replace

if(_$.settings.username_replace=='1')
{
	var time1 = new Date();
	DSP_replace_username(1);
	addBenchmark( time1, '%username% replace' );
}


//		Youtube Video Enhancer
if(_$.settings.youtube_fullscreen=='1')
{
	if(_$.location.indexOf('/comments/')==0)
	{
		var time1 = new Date();
		if(_$.$t('object').length>0&&_$.$c('dt')[0].innerHTML.indexOf('value="http://www.youtube.com')>0)
		{
			var dsp_video_link = _$.$t('object')[0].parentNode.innerHTML.split('value="http')[1].split('"')[0];
			var dsp_video_array = _$.$t('object')[0].parentNode.innerHTML.split('<');
			var dsp_video_html = dsp_video_array[0];
			for(var i=1; i<dsp_video_array.length; i++)
			{
				if(dsp_video_array[i][0]=='p') dsp_video_html += '<'+dsp_video_array[i]+'</param>';
				else if(dsp_video_array[i][0]=='e') dsp_video_html += '<'+dsp_video_array[i]+'</embed>';
				else dsp_video_html += '<'+dsp_video_array[i];
			}
			dsp_video_html = dsp_video_html.split('%20').join('').split('<embed').join('<param name="allowFullScreen" value="true"></param><embed allowfullscreen="true"');
			dsp_video_html = dsp_video_html.split(dsp_video_link).join(dsp_video_link+'&hl=ru_RU&fs=1');
			_$.$t('object')[0].parentNode.innerHTML = dsp_video_html;
		}
		addBenchmark( time1, 'youtube fullscreen' );
	}
}

// Color Picker
if(_$.settings.colors_on=='1')
{
	var time1 = new Date();
	if(_$.location.indexOf('/comments/')==0||_$.location.indexOf('/news/')==0||(_$.location.indexOf('/my/inbox/')==0&&_$.location!='/my/inbox/'))
	{
		dsp_all_comments = _$.$c('c_footer');
		DSP_colorize_comments();
		dsp_jscolor.init();
	}
	addBenchmark( time1, 'comments colorizer' );
}


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Service Pack 2
		
* * * * * * * * * * * * * * * * * * * * * * * * * */
//SP 2, NEW SCRIPTS START HERE
//STEP FOUR
//GENERAL FUNCTIONS
//show new comments correctly -- in the new comment scroller section
//if(document.location.href.indexOf('#new')>-1){
//	document.location.href = document.location.href;
//}

//simplest eventDispatcher, listens to standard events like mouseup and mousedown
var eventDispatcher = document.createElement('div');

// made by crea7or
// fetching data from d3search - every 12 hours
var d3sCurDate = new Date();
if (( d3sCurDate.getTime() - localStorGetItem('lastD3sFetchTimestamp', 0 )) > 1000 * 60 * 60 * 12 )
{
	// add script to the page and fetch new gertrudas
	_$.injectScriptUrl('http://api.d3search.ru/integration');
	localStorage.setItem('lastD3sFetchTimestamp', d3sCurDate.getTime());
}
// end of loading data

// made by crea7or
// start of SCRIPTS-37 & SCRIPTS-29
// should be launched as soon as possible after script start
if ( _$.settings.grt_enabled =='1' )
{
	var time1 = new Date();
	var divs = document.querySelector('div.gertruda');
	if ( divs )
	{
		var vGrtShow = true;
		// random or only new
		if ( _$.settings.grt_random == '1' )
		{
			if ( Math.random() > 0.499 )
			{
				vGrtShow = false;
			}
		}
		if ( vGrtShow )
		{
			var vImgsArr = jsonParse( localStorGetItem( "gertrudasJson", "[]" ));
			if ( vImgsArr.length > 0 )
			{
				var vImgsArrIndex = Math.floor( Math.random() * vImgsArr.length );
				var vImgs = divs.getElementsByTagName('img');
				var vRandomGrt = vImgsArr[ vImgsArrIndex ];
				//Stasik0: hack to remove flicker
				vImgs[1].setAttribute('height', "262");
				vImgs[1].setAttribute('width', "149");
				vImgs[1].setAttribute('src', "");
				vImgs[1].setAttribute('src', vRandomGrt.path );
				if (vRandomGrt.fixMargins)
				{
					//Stasik0: hack to remove flicker
					vImgs[0].setAttribute('src', "");
					vImgs[2].setAttribute('src', "");
					// proper-sized images to hide top and bottom
					vImgs[0].setAttribute('src', 'http://pit.dirty.ru/dirty/1/2010/11/13/14466-162241-866f1139300aba6aae076b1ccc1a1bf7.gif' );
					vImgs[2].setAttribute('src', 'http://pit.dirty.ru/dirty/1/2010/11/13/14466-162231-5b8c44f94625c1247474ce40292ffa14.gif' );
				}
			}
		}
	}

	divs = document.querySelector('div.header_logout');
	if ( divs != null && document.location.href.indexOf("/banned/") == -1 )
	{
		divs = document.querySelector('div.header_tagline_inner');
		var vGreetShow = true;
		// random or only new
		if ( _$.settings.grt_random == '1' )
		{
			if ( Math.random() > 0.499 )
			{
				vGreetShow = false;
			}
		}
		if ( vGreetShow )
		{
			var vTxtsArr = jsonParse( localStorGetItem("greetingsJson", "[]" ));
			if ( vTxtsArr.length > 0 )
			{
				var vTxtsArrIndex = Math.floor( Math.random() * vTxtsArr.length );
				var vGreetName;
				var vGreetLink;
				while ( divs.childNodes[0].tagName != 'DIV')
				{
					if (divs.childNodes[0].tagName == 'A')
					{
						vGreetName = divs.childNodes[0].innerHTML;
						vGreetLink = divs.childNodes[0].getAttribute('href');
					}
					divs.removeChild(divs.childNodes[0]);
				};
				var vGreetPattern = /(\%username\%)+/gi;
				var vGreetReplacement = "<a href=\"" + vGreetLink+ "\">" + vGreetName + "</a>";
				var vGreetResult = vTxtsArr[vTxtsArrIndex].text.replace(vGreetPattern, vGreetReplacement);
				var vGreetNode = document.createElement('div');
				vGreetNode.innerHTML = vGreetResult;
				divs.insertBefore( vGreetNode, divs.childNodes[0] );
				_$.tooltip.processGreeting();
			}
		}
	}
	addBenchmark( time1, 'gertrudas & greetings' );
}
// end of SCRIPTS-37 & SCRIPTS-29

// made by crea7or
// start of SCRIPTS-60
var time1 = new Date();

var divRightCol = document.querySelector('div.content_right');
var divTags = document.getElementById('js-tags');
if ( divRightCol && divTags)
{
	var divAds = divRightCol.querySelector('div.b-ads');
	if ( divAds == null )
	{	
		divAds = document.createElement('div');
		divAds.setAttribute('style','float: right; width: 300px; height: 690px; margin-top: 0px; position: relative; z-index: 3;');
		divAds.setAttribute('class', 'b-abs');
		divTags.parentNode.insertBefore( divAds, divTags );
	}	
	
	var newsFromD3search = localStorage.getItem('stickersMarkup');
	if ( newsFromD3search != null  && divAds)
	{
		var hiddenStickers = jsonParse( localStorGetItem('dirtySpHiddenStickers',"[]"));

		//find out whether there are some news items to present
		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = newsFromD3search;
		var saveHiddenStickers = false;
		//remove hidden elements
		for ( var stickerIndex = 0; stickerIndex < hiddenStickers.length; stickerIndex++){
			divId = tempDiv.querySelector('div#' + hiddenStickers[stickerIndex] );
			if ( divId ){
				tempDiv.removeChild(divId);
			}else{
				hiddenStickers.splice( stickerIndex, 1 );
				saveHiddenStickers = true;
			}
		}
		//update if changed
		if ( saveHiddenStickers ) localStorage.setItem('dirtySpHiddenStickers', jsonStringify( hiddenStickers ));

		//do we have some items to show?
		newsArray = tempDiv.querySelectorAll('div.sticker');
		if( newsArray.length > 0 )
		{
			//only if new news are present
			//divAds.setAttribute('style', 'clear: both; margin-top: 0px;');
			var divForNews = document.createElement('div');
			divForNews.setAttribute('style', 'margin-top: 30px;');
			var subDivForNews = document.createElement('div');
			for(var i=0;i<newsArray.length;i++)
			{
				//remove original hide link
				var hide = newsArray[i].querySelector('div.sticker-hide');
				if(hide)newsArray[i].removeChild(hide);
				//frame sticker into layout
				subDivForNews.innerHTML += '<div class="subs_ads" style="position: relative;"><a class="vote_details_close" style="top: 10px;" href="" title="Убрать это объявление"></a><div class="subs_ads_inner">\
																		<div class="subs_block"><div class="sticker" id="'+newsArray[i].getAttribute("id")+'">'+newsArray[i].innerHTML+'</div></div></div><div class="subs_ads_bottom_bg"></div></div>';
				//remove the sticker from tempDiv
				tempDiv.removeChild(newsArray[i]);
			}

			//now append some events
			var linksArray = subDivForNews.querySelectorAll("a.vote_details_close");
			for(var i=0;i<linksArray.length;i++)
			{
				_$.addEvent(linksArray[i], 'click', function(e){
				  var parentDiv = e.target.parentNode;
					if(parentDiv.parentNode.querySelectorAll("div.subs_ads").length <=1){
						//removing last news element
						//put ads on the right place
						var divRightCol = document.querySelector('div.content_right');
						var divTags = document.getElementById('js-tags');
						if ( divRightCol && divTags)
						{
							var divAds = divRightCol.querySelector('div.b-ads');
							if(divAds) divAds.setAttribute('style', 'margin-top: -105px;');
						}
					}
					//mark sticker as read
					var hiddenStickers = jsonParse( localStorGetItem('dirtySpHiddenStickers',"[]"));
					var sticker = parentDiv.querySelector("div.sticker");
					if(sticker){
						var stickerId = sticker.getAttribute('id');
						if ( stickerId ){
							hiddenStickers.push( stickerId );
							localStorage.setItem('dirtySpHiddenStickers', jsonStringify( hiddenStickers ));
						}
					}

					//finally, remove sticker
					parentDiv.parentNode.removeChild(parentDiv);
					e.preventDefault();
				});
			}

			//in tempDiv there are some remainders like <style> tags etc
			divForNews.appendChild(tempDiv);
			divForNews.appendChild( subDivForNews );
			divAds.appendChild( divForNews );
		}
	}
}
addBenchmark( time1, 'd3s news' );
// end of SCRIPTS-60

// made by crea7or
// socialism in user profile
// start of SCRIPTS-35
function socialAdd( userName )
{
	var parameters = "user=" + userName + "&wtf=101010"  + "&action=add";
	var request = new XMLHttpRequest()
	if(! request)
	{
		futu_alert( 'Что-то пошло не так...', false, 'red');
		return false;
	}
	request.open("POST", "/socialism/", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", parameters.length);
    request.setRequestHeader("Connection", "close");
	request.onreadystatechange = function()
	{
		if (request.readyState == 4)
		{
			if (request.status == 200)
			{
				// от сервера приходит либо -1 (user не существует), либо 0 (если юзер уже был добавлен)
				var responce = request.responseText;
				if (responce != -1 && responce != 0)
				{
					futu_alert( 'Ура! Всё получилось!', false, 'red');
				}
				else
				{
					futu_alert( 'Что-то пошло не так...', false, 'red');
				}
				return;
			}
		}
	};
	try
	{
		request.send(parameters);
	}
	catch (err)
	{
		futu_alert( 'Что-то пошло не так...', false, 'red');
	}
	return false;
}

if ( document.location.href.indexOf("dirty.ru/user/") > -1 )
{
	var userBasicInfo = document.querySelector('div.userbasicinfo');
	var divUser = document.querySelector('div.user_name_inner');
	var userName = "";
	if ( divUser )
	{
		userNameAnchors = divUser.getElementsByTagName('a');
		userName = userNameAnchors[0].innerHTML;
	}
	if ( userBasicInfo && dsp_self_name.length > 0 && userName.length > 0 )
	{
		var newDiv = document.createElement('div');
		newDiv.innerHTML = "<a href=\"#\" onclick=\"return socialAdd('" + userName + "');\" style=\"background: url(http://img.dirty.ru/d3/social-add-button.gif) no-repeat 1px 0px; padding: 0px 0px 3px 22px;\">Следить за пользователем</a>";
		userBasicInfo.appendChild( newDiv );
		_$.injectScript( socialAdd );
	}
}
// end of SCRIPTS-35

// made by crea7or
// start of SCRIPTS-26
if ( _$.settings.online_enabled =='1' )
{
  var time1 = new Date();

	var vUserName = _$.getUsername();
	if( vUserName.length > 0 )
	{
		var lastCheckinTimestamp = localStorGetItem('lastCheckinTimestamp', 0 );
		var drawStuff = function()
		{
			var divContentLeft = document.querySelector("div.content_left");
			if ( divContentLeft )
			{
				var checkinsMarkup = localStorage.getItem('checkinsMarkup');
				var newdiv = document.createElement('div');
				newdiv.innerHTML =  checkinsMarkup;
				divContentLeft.appendChild( newdiv );
				_$.tooltip.processLinks(divContentLeft);
			}
			var highlightsStyles = localStorage.getItem('checkinsHighlights');
			if (highlightsStyles != null)
			{
				var highlightsDiv = document.createElement('div');
				highlightsDiv.innerHTML = highlightsStyles;
				document.body.appendChild(highlightsDiv);
			}
		};
		var now = new Date().getTime();
		if ((now - lastCheckinTimestamp) > 1000 * 60 * 2 )
		{
			_$.addEvent(window, 'load', function(){
				var checkinScript = document.createElement("script");
				checkinScript.setAttribute("src", "http://api.d3search.ru/checkin/" + vUserName );
				document.body.appendChild(checkinScript);
				localStorage.setItem('lastCheckinTimestamp', now);
				_$.addEvent(checkinScript, 'load', drawStuff);
			});
		}else{
			drawStuff();
		}
	}
	addBenchmark( time1, 'online users' );
}
// end of SCRIPTS-26


// made by crea7or
// start of SCRIPTS-58
// comments fix in inboxes
if ( document.location.href.indexOf("/my/inbox/") >= 0 )
{
	var time1 = new Date();
	// user page
	var vS58links = document.querySelectorAll('a.c_icon');
	if ( vS58links )
	{
		for( vS58ind = 0; vS58ind < vS58links.length; vS58ind++)
		{
			vS58href = vS58links[ vS58ind].getAttribute('href');
			if ( vS58href.length > 10 )
			{
				vS58links[ vS58ind].setAttribute('href', "/my/inbox/" + vS58href.substring(10, vS58href.length ));
			}
		}
	}
	addBenchmark( time1, 'inbox comments fix' );
}
// end of SCRIPTS-58

// made by Stasik0
// start of moderate
if(_$.settings.moderate=='1'){
	(function () {

		var moderation = document.createElement('script');
		moderation.setAttribute('type', 'text/javascript');
		moderation.setAttribute('src', 'http://api.d3search.ru/moderation/list');
		document.getElementsByTagName('head')[0].appendChild(moderation);

	})();
}
// end of moderate

//preview posts
function addEvent(obj,sEvent,sFunc)
{
	if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
	else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
}

function vPreview(e)
{
	var vPrvDiv = document.getElementById( 'js-comments_reply_block' );
	var vPrvTextArea = document.getElementById( 'comment_textarea' );
	if ( vPrvTextArea && vPrvDiv )
	{
		vRemovePreview( null );
		var newdiv = document.createElement('div');
		newdiv.setAttribute('style', 'padding: 5px 5px 5px 5px; margin-left: 0px  !important; border: 1px dashed grey;');
		newdiv.setAttribute('id', 'vprw-preview');
		newdiv.setAttribute('class', 'comment');
		newdiv.innerHTML = vPrvTextArea.value.replace(/\n/g,'<br>');
		vPrvDiv.appendChild( newdiv );
	}
	e.preventDefault();
	return false;
}

function vRemovePreview(e)
{
	var vPrvDiv = document.getElementById( 'js-comments_reply_block' );
	var vPrvTextArea = document.getElementById( 'comment_textarea' );
	if ( vPrvTextArea && vPrvDiv )
	{
		vPrvTextPreview = document.getElementById( 'vprw-preview' );
		if ( vPrvTextPreview )
		{
			vPrvDiv.removeChild( vPrvTextPreview );
		}
	}
	return false;
}

var vPrvDiv = document.querySelector('div.comments_add_pics');
if ( vPrvDiv )
{
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', 'margin-right: 30px; float: right;');
	newdiv.innerHTML = "<a href=\"#\" id=\"prevLink\" class=\"dashed\" style=\"color: black; font-size: 11px;\">предпросмотр</a>";
	vPrvDiv.parentNode.insertBefore( newdiv, vPrvDiv );
	addEvent(document.getElementById('prevLink'), "click", vPreview);
	addEvent(document.getElementById('js-post-yarrr'), "click", vRemovePreview);
}

//
// start - part of dirtytort script
// modifying inbox users list, inbox header, invites link
// adding links to banned/music
//
	var time1 = new Date();
	var vTortDupDetected = 0;
	var vTortAddLinks = document.querySelector('div.header_logout');
	if ( vTortAddLinks )
	{
		if ( vTortAddLinks.innerHTML.indexOf('banned') > 0 )
		{
			vTortDupDetected = 1;
		}
		else
		{
			vTortAddLinks.firstChild.setAttribute( 'style', 'margin-left: 10px; padding-left: 15px;');
			newa = document.createElement('a');
			newa.setAttribute('href', 'http://music.dirty.ru/');
			newa.setAttribute('style', 'margin-left: 10px; background: none; padding-left: 0px;');
			newa.innerHTML = 'music';
			vTortAddLinks.insertBefore( newa, vTortAddLinks.firstChild );
			newa = document.createElement('a');
			newa.setAttribute('href', 'http://dirty.ru/banned/');
			newa.setAttribute('style', 'margin-left: 10px; background: none; padding-left: 0px;');
			newa.innerHTML = 'banned';
			vTortAddLinks.insertBefore( newa, vTortAddLinks.firstChild );
			newa = document.createElement('a');
			newa.setAttribute('href', 'http://www.quotes-dirty.ru/');
			newa.setAttribute('style', 'margin-left: 0px; background: none; padding-left: 0px;');
			newa.setAttribute('target', '_blank');
			newa.innerHTML = 'quotes';
			vTortAddLinks.insertBefore( newa, vTortAddLinks.firstChild );
			vTortAddLinks.parentNode.setAttribute( 'style', 'padding-left: 10px;');
			vTortAddLinks = document.querySelector('div.header_tagline');
			vTortAddLinks.setAttribute('style', 'margin-right: 0px;');
		}
	}

	if ( vTortDupDetected == 0 )
	{
		var vTortAddLinksInbox = document.querySelector('div.inbox_header');
		// start fix for list of users (for banned users in the inbox)
		if ( vTortAddLinksInbox == null )
		{
			vTortInbMenu = document.querySelector('div.under_menu');
			vTortInbPreHeader = document.querySelector('div.inbox_comments');
			if ( vTortInbMenu && vTortInbPreHeader )
			{
				vTortAddLinksInbox = document.createElement('div');
				vTortAddLinksInbox.setAttribute('class', 'inbox_header');
				vTortAddLinksInbox.innerHTML = '&nbsp;';
				vTortInbMenu.insertBefore( vTortAddLinksInbox, vTortInbPreHeader );
			}
		}
		// end fix for list of users (for banned users in the inbox)
		if ( vTortAddLinksInbox)
		{
			vTortAddLinksInbox.setAttribute('style', 'background: #FAFAFA; padding: 20px 20px 20px 42px; margin: 0px 0px 20px 0px;');
			vTortNewa = document.createElement('div');
			vTortNewa.setAttribute('style', 'float: right;');
			vTortNewa.innerHTML = "<a href=\"#\" class=\"dashed comments_header_new_comment\" onclick=\"var e = document.getElementById('js-inboxers-list');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;\">список инбоксеров</a>&nbsp;&nbsp;";
			vTortAddLinksInbox.appendChild( vTortNewa );
		}

		var vTortHideInboxers = document.querySelector('div.inbox-tools-static');
		if ( vTortHideInboxers )
		{
			vTortHideInboxers.setAttribute('id', 'js-inboxers-list');
			vTortHideInboxers.style.display = 'none';

			vTortHideInboxers = document.querySelector('div.comments_holder_inner');
			if ( vTortHideInboxers)
			{
				vTortHideInboxers.setAttribute('style', 'padding-right: 0px');
			}
		}

		var vTortFixInvitesNotice = document.querySelector('li.b-menu_invites_link');
		if ( vTortFixInvitesNotice )
		{
			vTortFixInvitesNotice.setAttribute('class','bbbaaaccc');
			vTortFixInvitesNotice.childNodes[0].setAttribute('class','menu_item');
		}
	}
// end - part of dirtytort script
	addBenchmark( time1, 'dirty tort' );

// start of the dirty ranks script
function setRankToNote( ranksName )
{
	ranksUserNote = document.getElementById('js-usernote');
	if ( ranksUserNote && ranksUserNote.children.length == 0 )
	{
		ranksNote = ranksUserNote.innerHTML;
		ranksIndex = ranksNote.lastIndexOf('#');
		if ( ranksIndex > -1 )
		{
			// some name already in the note
			ranksNote = ranksNote.substring( 0, ranksIndex );
			if ( ranksName != null )
			{
				document.getElementById('js-usernote').innerHTML = ranksNote + " #" + ranksName;
			}
			else
			{
				document.getElementById('js-usernote').innerHTML = ranksNote;
			}
			_$.fireEvent(document.getElementById('js-usernote'), 'click');
			_$.fireEvent(document, 'click');
		}
		else
		{
			// no name at all
			if ( ranksName != null )
			{
				document.getElementById('js-usernote').innerHTML = ranksNote + " #" + ranksName;
			}
		}
	}
}

function setNewRank( e )
{
	var ranksDivUser = document.querySelector('div.user_name_inner');
	if ( ranksDivUser )
	{
		ranksA = ranksDivUser.getElementsByTagName('a');
		ranksUserName = ranksA[0].innerHTML;

		ranksName = prompt('Как назовём?', getRankByUsername( ranksUserName ));
		if( ranksName )
		{
			var ranksDivUser = document.querySelector('div.user_name_inner');
			if ( ranksDivUser )
			{
				if ( ranksName.indexOf('#') > -1 )
				{
					ranksName = null;
				}
				saveRanks( ranksUserName, ranksName );
				setRankToNote( ranksName );
			}
		}
	}
	e.preventDefault();
	return false;
}

function getRankIndex( ranksArray, ranksUserName )
{
	for ( var ranksIndex = 0; ranksIndex < ranksArray.length; ranksIndex++ )
	{
		if ( ranksArray[ranksIndex].name == ranksUserName )
		{
			return ranksIndex;
		}
	}
	return -1;
}

function loadRanks()
{
	var ranksOldItem = localStorage.getItem('vRanksStore' );
	var ranksOldArray;
	var usersRanksArray = [];
	if ( ranksOldItem )
	{
		// remove in 2.6
		ranksOldArray = ranksOldItem.split("#");
		for ( var index = 0; index < ranksOldArray.length; index += 2 )
		{
			var rankObject = new Object();
			rankObject.name = ranksOldArray[index];
			rankObject.rank = ranksOldArray[index +1 ];
			usersRanksArray.push( rankObject );
		}
		localStorage.setItem('dirtyRanks', jsonStringify( usersRanksArray ));
		localStorage.removeItem('vRanksStore' );
	}
	else
	{
		usersRanksArray = jsonParse( localStorGetItem('dirtyRanks', "[]"));
	}
	return usersRanksArray;
}

function getRankByUsername( ranksUserName )
{
	var usersRanksArray = loadRanks();
	var ranksNameIndex = getRankIndex( usersRanksArray, ranksUserName );
	if ( ranksNameIndex > -1 )
	{
		return usersRanksArray[ ranksNameIndex ].rank;
	}
	else
	{
		return null;
	}
}

function saveRanks( ranksUserName, ranksRank )
{
	var usersRanksArray = loadRanks();
	var ranksNameIndex = getRankIndex( usersRanksArray, ranksUserName );
	if ( ranksNameIndex > -1 )
	{
		if ( ranksRank != null )
		{
			usersRanksArray[ ranksNameIndex ].rank = ranksRank;
		}
		else
		{
			usersRanksArray.splice( ranksNameIndex , 1 );
		}
	}
	else
	{
		if ( ranksRank != null )
		{
			var rankObject = new Object();
			rankObject.name = ranksUserName;
			rankObject.rank = ranksRank;
			usersRanksArray.push( rankObject );
		}
	}
	localStorage.setItem('dirtyRanks', jsonStringify( usersRanksArray ));
}

if ( document.location.href.indexOf("dirty.ru/user/") >= 0 )
{
	// user page
	var time1 = new Date();
	var ranksUserName;
	var ranksDivUser = document.querySelector('div.user_name_inner');
	if ( ranksDivUser )
	{
		ranksA = ranksDivUser.getElementsByTagName('a');
		ranksA[0].setAttribute('href', '#');
		ranksUserName = ranksA[0].innerHTML;
		_$.addEvent( ranksA[0], "click", setNewRank );

		ranksNoteRank = null;
		ranksUserNote = document.getElementById('js-usernote');
		if ( ranksUserNote && ranksUserNote.children.length == 0 )
		{
			ranksIndex = ranksUserNote.innerHTML.lastIndexOf('#');
			if ( ranksIndex > -1 )
			{
				ranksNoteRank = ranksUserNote.innerHTML.substring( ranksIndex + 1 , ranksUserNote.innerHTML.length );
			}
		}
		ranksLocStorRank = getRankByUsername( ranksUserName );
		if ( ranksLocStorRank == null && ranksNoteRank != null )
		{
			saveRanks( ranksUserName, ranksNoteRank );
		}
		else if ( ranksLocStorRank != null && ranksNoteRank == null )
		{
			setRankToNote( ranksLocStorRank );
		}
		else if ( ranksLocStorRank != ranksNoteRank )
		{
			setRankToNote( ranksLocStorRank );
		}

		// made by crea7or
		// adding: SCRIPTS-65
		// start of SCRIPTS-65
		var vUserIdVote = document.querySelector('strong.vote_result');
		if ( vUserIdVote )
		{
			vUserIdJs = vUserIdVote.getAttribute('onclick');
			vUserIdJsInd = vUserIdJs.indexOf('id:') + 4;
			vUserIdTxt = vUserIdJs.substring(vUserIdJsInd, vUserIdJs.indexOf("'", vUserIdJsInd ));
			ranksDivUser.childNodes[6].innerHTML = 'User ID: ' +  vUserIdTxt + ', ' + ranksDivUser.childNodes[6].innerHTML;
		}
		// end of SCRIPTS-65
	}
	addBenchmark( time1, 'dirty ranks' );
}
else
{
	var time1 = new Date();
	var usersRanksArray = loadRanks();
	if ( usersRanksArray.length > 0 )
	{
		// other pages
		var ranksDivDD = document.querySelectorAll('div.dd');
		if ( ranksDivDD )
		{
			for ( ranksInd = 0; ranksInd < ranksDivDD.length; ranksInd++ )
			{
				if ( ranksDivDD[ranksInd].children.length > 2 )
				{
					ranksUserName = ranksDivDD[ranksInd].childNodes[3].innerHTML;
					ranksNameInd = getRankIndex( usersRanksArray, ranksUserName );
					if ( ranksNameInd > -1 )
					{
						var ranksTxt =  document.createTextNode(" " + usersRanksArray[ ranksNameInd ].rank + " ");
						ranksDivDD[ranksInd].insertBefore( ranksTxt, ranksDivDD[ranksInd].childNodes[3]);
					}
				}
			}
		}
		var ranksDivFooter = document.querySelectorAll('div.c_footer');
		if ( ranksDivFooter )
		{
			for ( ranksInd = 0; ranksInd < ranksDivFooter.length; ranksInd++ )
			{
				if ( ranksDivFooter[ranksInd].children.length > 2 )
				{
					ranksUserName = ranksDivFooter[ranksInd].childNodes[3].innerHTML;
					ranksNameInd = getRankIndex( usersRanksArray, ranksUserName );
					if ( ranksNameInd > -1 )
					{
						var ranksTxt =  document.createTextNode(" " + usersRanksArray[ ranksNameInd ].rank + " ");
						ranksDivFooter[ranksInd].insertBefore( ranksTxt, ranksDivFooter[ranksInd].childNodes[3]);
					}
				}
			}
		}
	}
	addBenchmark( time1, 'dirty ranks' );
}
// end of the dirty ranks script

// begin - add logout link listener
if(_$.$('js-header_logout_link')){
	_$.addEvent(_$.$('js-header_logout_link'), "click", function(e){
		_$.injectScript("futu_alert('Уходя &ndash; гаси свет!');");
		window.setTimeout(function(){document.location.href=e.target.href;}, 1000);
		e.preventDefault();
		return false;
	});
}
//end - logogut link listener

//add Youtube to textarea
//BIG BLOCK
//begin shared
function processUrl(url){
	var rawid = url.split("v=")[1];
	if(rawid == null || rawid.length==0){
		return false;
	}
	id = rawid.replace(/(&|#).+/g, "");
	var time = -1;
	var timeraw = url.split("t=")[1];
	if(!(timeraw == null || timeraw.length==0)){
		//process time
		timeraw = timeraw.replace(/(&|#).+/g, "");
		if(timeraw.match(/[0-9]+/gi) && timeraw > -1){
			time = timeraw;
		}else{
			var values = timeraw.match(/([0-9]+m)?([0-9]+(s)?){1}/gi);
			if(values != null){
				minutes = timeraw.split("m")[0];
				if(minutes == timeraw || minutes == null || minutes.length == 0){
					minutes = 0;
				}
				seconds = timeraw.split("m")[1];
				if(seconds == null || seconds.length == 0){
					seconds = timeraw;
				}
				seconds = seconds.replace("s", "");
				if(minutes > -1 && seconds > -1){
					time = 60*minutes + 1*seconds;
				}
			}
		}
	}
	return {id: id, time: time};
}
//end shared

function close(){
	_$.injectScript("if(interval){window.clearInterval(interval);}");
	_$.$('youtube_embed').innerHTML = "";
	_$.toggle_div('youtube_preview',0);
}

function yarr(){
	var radios = document.getElementsByName('thumb');
	for (var i=0; i < radios.length; i++){
		if (radios[i].checked){
			var val = radios[i].value;
	}
  }
	tagpref = "<a href=\"http://www.youtube.com/watch?v="+youtube_id+"&t='+seconds+'\">";
	taginf = "<img src=\"http://img.youtube.com/vi/"+youtube_id+"/"+val+".jpg\">";
	tagpost = "</a>";

	if(val == 4){
		_$.injectScript("insert_tag('"+tagpref+"','"+tagpost+"');");
	}else{
		_$.injectScript("insert_tag('"+tagpref+taginf+tagpost+"','');");
	}
	close();
}

function processUrl(url){
	var rawid = url.split("v=")[1];
	if(rawid == null || rawid.length==0){
		return false;
	}
	id = rawid.replace(/(&|#).+/g, "");
	var time = -1;
	var timeraw = url.split("t=")[1];
	if(!(timeraw == null || timeraw.length==0)){
		//process time
		timeraw = timeraw.replace(/(&|#).+/g, "");
		if(timeraw.match(/[0-9]+/gi) && timeraw > -1){
			time = timeraw;
		}else{
			var values = timeraw.match(/([0-9]+m)?([0-9]+(s)?){1}/gi);
			if(values != null){
				minutes = timeraw.split("m")[0];
				if(minutes == timeraw || minutes == null || minutes.length == 0){
					minutes = 0;
				}
				seconds = timeraw.split("m")[1];
				if(seconds == null || seconds.length == 0){
					seconds = timeraw;
				}
				seconds = seconds.replace("s", "");
				if(minutes > -1 && seconds > -1){
					time = 60*minutes + 1*seconds;
				}
			}
		}
	}
	return {id: id, time: time};
}

function addYoutube(){
	var url = prompt("Введите URL с youtube", "");
	//check url
	var search = url.search("youtube.com/");
	if (search == -1){
		alert("Поддерживаются только youtube видео");
		return false;
	}
	//process
	var re=processUrl(url);
	if(re==false){
		alert("В URL нет id ролика");
		return false;
	}

	//global
	youtube_id = re.id;
	var id = re.id
	time = re.time;

	var inject = "";
	inject += 'var player; var interval; var seconds = 0; ';
  if(_$.browser().name=='ie'){
		inject += 'function onYouTubePlayerReady(playerId) { player=document.getElementById(\'yobject\');';
	}else{
		inject += 'function onYouTubePlayerReady(playerId) { player=document.getElementById(\'yembed\');';
	}
	if(time > -1){inject += 'player.seekTo('+time+', true); ';}
	inject += ' interval=setInterval(statechange, 250); };'
	inject += 'function statechange(){if(player){seconds = Math.round(player.getCurrentTime()); document.getElementById(\'youtube_time\').innerHTML = "Перемотайте на нужное время. Позиция сейчас: "+seconds+" cек. Ссылка будет поставлена именно на эту секунду ролика.";}}';
	_$.injectScript(inject);

	_$.$('youtube_embed').innerHTML = '<object width="311" height="200" id="yobject"><param name="movie" value="http://www.youtube.com/v/'+id+'?enablejsapi=1&playerapiid=player"></param><param name="allowFullScreen" value="true"></param><param name="allowScriptAccess" value="always"></param><embed id="yembed" src="http://www.youtube.com/v/'+id+'?enablejsapi=1&playerapiid=player" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="311" height="200"></embed></object>';

	temp = "<table><tr><td width=\"150\">";
	temp += '<label><input type="radio" name="thumb" value="0" style="position:relative; top: -40px;" checked="checked"/><img src="http://img.youtube.com/vi/'+id+'/0.jpg" width="120" height="90"/></label>';
	temp += "</td><td width=\"150\">";
	temp += '<label><input type="radio" name="thumb" value="1" style="position:relative; top: -40px;" /><img src="http://img.youtube.com/vi/'+id+'/1.jpg" width="120" height="90"/></label>';
	temp += "</td></tr><tr><td>";
	temp +=  '<label><input type="radio" name="thumb" value="2" style="position:relative; top: -40px;" /><img src="http://img.youtube.com/vi/'+id+'/2.jpg" width="120" height="90"/></label>';
	temp +=  "</td><td>";
	temp +=  '<label><input type="radio" name="thumb" value="3" style="position:relative; top: -40px;" /><img src="http://img.youtube.com/vi/'+id+'/3.jpg" width="120" height="90"/></label>';
	temp +=  '</td></tr><tr><td colspan="2"><label><input type="radio" name="thumb" value="4" />Без картинки</label></td></tr></table>';

	_$.$('youtube_thumbs').innerHTML = temp;

	_$.toggle_div('youtube_preview',1);
	return false;
}
//global holder
var youtube_id;

//add link to textarea
var youtube_textarea = _$.$c('textarea_editor')[0];
if(youtube_textarea!=null){
	var link = document.createElement("a");
	link.innerHTML = "<b>Youtube</b>";
	link.id = "youtube_link";
	link.style.cursor="pointer";
	//link.onclick = "insert_youtube(); return false;";
	youtube_textarea.appendChild(link);
	_$.addEvent(_$.$('youtube_link'),'click',addYoutube);

	var preview_div = document.createElement("div");
	var width = 720;
	var height = 295;
	dsp_output = "";
	dsp_output += '<div id="youtube_preview" style="display:none;position:fixed;top:'+((_$.viewarea_size().y-height)/2)+'px;left:'+((_$.viewarea_size().x-width)/2)+'px;width:'+width+'px;height:'+height+'px;z-index:2999"><table cellspacing="0" cellpadding="0" border="0" width="'+width+'" height="'+height+'"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" valign="top">';
	dsp_output += '<div id="youtube_preview_close" style="float: right; background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div>';
	dsp_output += '<table><tr><td><div style="font-size:180%;color:#5880af; padding-bottom: 10px;">Youtube preview</div></td><td><div style="float: left";>Картинка в посте</div></td></tr>';
	dsp_output += '<tr><td><div id="youtube_embed" style="width: 340px; float:left;"></div></td>';
	dsp_output += '<td><div id="youtube_thumbs"></div></td></tr></table>';
	dsp_output += '<div id="youtube_time" style="width: 340px; float:left;">Перемотайте на нужное время. Позиция сейчас: 0 cек. Ссылка будет поставлена именно на эту секунду ролика.</div>';
	dsp_output += '<div id="youtube_yarrr" style="cursor: pointer; float: right;"><img src="http://dirty.ru/i/yarrr.gif"/></div>';
	dsp_output += '</td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table></div>';
	preview_div.innerHTML = dsp_output;
	document.body.appendChild(preview_div);
	_$.addEvent(_$.$('youtube_preview_close'),'click',close);
	_$.addEvent(_$.$('youtube_yarrr'),'click',yarr);
}

//END BIG BLOCK

// preview img links by crea7or
function clickOnImageLink(e)
{
	// http://pit.dirty.ru/dirty/1/2011/04/15/28284-142540-32deef3d70482f072b516ac3a723533d.gif
	var imgPreview = document.createElement('img');
	imgPreview.setAttribute('src', this.href );
	var imgLink = document.createElement('a');
	imgLink.setAttribute('href', '#');
	_$.addEvent( imgLink, 'click', function(e) { this.previousSibling.setAttribute('style', this.previousSibling.getAttribute('bkpstyle')); this.parentNode.removeChild(this ); e.preventDefault(); return false; });
	imgLink.appendChild( imgPreview );
	_$.insertAfter(this, imgLink);
	this.setAttribute('bkpstyle', this.getAttribute('style'));
	this.setAttribute('style', 'display: none');
	e.preventDefault();
	return false;
}

if ( _$.settings.imglinks_preview == 1 )
{
	function imagesPreview( baseelement )
	{
		var allLinksArray = baseelement.getElementsByTagName('a');
		for (var i = 0; i < allLinksArray.length; i++)
		{
			if (allLinksArray[i].href.length > 5)
			{
				linkext3 = allLinksArray[i].href.substr(allLinksArray[i].href.length - 4);
				if (linkext3.search(/\.gif/i) == 0)
				{
					_$.addEvent(allLinksArray[i], 'click', clickOnImageLink);
				}
				else if (linkext3.search(/\.jpg/i) == 0)
				{
					_$.addEvent(allLinksArray[i], 'click', clickOnImageLink);
				}
				else if (linkext3.search(/\.png/i) == 0)
				{
					_$.addEvent(allLinksArray[i], 'click', clickOnImageLink);
				}
				else if (linkext3.search(/jpeg/i) == 0)
				{
					_$.addEvent(allLinksArray[i], 'click', clickOnImageLink);
				}
			}
		}	
	}

	imagesPreview( document.body );

	function imgDocumentChanged( event )
	{
		if ( supressEvents )
		{
			return;
		}
		if ( event.target.className != null && event.target.className.indexOf("comment") > -1)
		{
			imagesPreview(event.target);
		}
	}	

	//handle new ajax-generated content
	_$.addEvent(document, "DOMNodeInserted", imgDocumentChanged);	
}

// preview img links by crea7or

//click on ещё
if(location.pathname.indexOf('/user/')==0 && _$.$c('usermorebutton').length > 0)
{
	_$.$c('usermorebutton')[0].style.display = "none";
	_$.injectScript("$('js-user_page_more').toggleClass('hidden');");
}

//fix inbox link in profile + works for inbox recreation
if(document.location.href.split('/my/inbox/write/').length > 1 && _$.$('js-new_inbox_to_whom_input')){
	var field = _$.$('js-new_inbox_to_whom_input');
	field.value = decodeURI(document.location.href.split('/my/inbox/write/')[1]);
}

//Ссылка на статистику d3search
if(location.pathname.indexOf('/users/')==0){
	var img = _$.$t('img', _$.$('generic-wrapper'))[4];
	var div = document.createElement('div');
	div.innerHTML = '<a href="http://d3search.ru/stat">Статистика на d3search.ru</a><br>';
	img.parentNode.insertBefore(div, img);
}

//ON/OFF THRNABLE FUNCTIONS
//add inbox link
if(_$.settings.inbox_text=='1'){
	if(_$.$('js-header_inbox_link'))_$.$('js-header_inbox_link').innerHTML = _$.$('js-header_inbox_link').innerHTML.replace("&nbsp;","") + " <span>Инбокс</span>";
}

//make arrows bigger
if(_$.settings.arrows_on=='1'){

	var time1 = new Date();

	function apply_links(element){
		var array = _$.$c('c_parent',element);
		for(var i=0; i<array.length; i++){
			array[i].innerHTML = "↑↑↑";
			_$.addEvent(array[i],"click", prevClicked);
		}

		var array = _$.$c('c_previous',element);
		for(var i=0; i<array.length; i++){
			array[i].innerHTML = " ↓↓↓";
		}
	}

	function prevClicked(e){
		apply_links(_$.$(e.target.getAttribute('replyto')));
		e.preventDefault();
		return false;
	}

	function documentChangedArr(event) {
		if (supressEvents) {
			return;
		}
		if(event.target.className != null && event.target.className.indexOf("comment")>-1){
			apply_links(event.target);
		}
	}

	apply_links(document);
	_$.addEvent(document,"DOMNodeInserted", documentChangedArr);

	addBenchmark( time1, 'triple arrows in comments' );
}

//recreate inbox link
if(_$.settings.inbox_recreate=='1')
{
	userlist = "";
	var arr = _$.$c("js-inboxPerson-name");
	for(var i=0;i<arr.length;i++)
	{
		var user = arr[i].innerHTML.replace(/<[^<>]+>/g,'');
		userlist += user+",";
	}
	var arr = _$.$n("banf");
	if(arr.length == 1 && userlist.length > 0)
	{
		var form = arr[0];
		var elem = document.createElement("div");
		elem.innerHTML = '[<a href="http://dirty.ru/my/inbox/write/'+userlist.substr(0,userlist.length-1)+'">копировать пользователей</a>]';
		_$.insertAfter(form, elem);

		// made by crea7or
		// start of SCRIPTS-57
		vS57own = document.getElementById('js-inboxUserAddInput');
		if ( vS57own )
		{
			_$.injectScript( s57inboxBanAll );
			var elemz = document.createElement("div");
			elemz.innerHTML = '[<a href="#" onclick="s57inboxBanAll(); return false;">забанить всех</a>]';
			_$.insertAfter(form, elemz);
		}
	}
}

function s57inboxBanAll()
{
	var vS57inbox = document.querySelectorAll( 'a.js-inboxPerson-ban');
	if ( vS57inbox )
	{
		var vS57oncli;
		var vS57inboxId;
		var vS57userId;
		for ( var vS57i = 0; vS57i < vS57inbox.length; vS57i++)
		{
			vS57oncli = vS57inbox[ vS57i ].getAttribute('onclick').split(",");
			if ( vS57oncli.length > 2 )
			{
				vS57inboxId = vS57oncli[1].replace(/\'/g,"");
				vS57userId = vS57oncli[2].replace(/\'/g,"");
				inboxHandler.users('ban', vS57inboxId, vS57userId, vS57inbox[ vS57i ] );
			}
		}
	}
}
// end of SCRIPTS-57

//user stats in profiles
if(_$.settings.user_stats=='1')
{
	if(location.pathname.indexOf('/user/')==0)
	{
		var elem = _$.$c('user_name_inner');
		if(elem.length == 1)
		{
			var ownUsername = _$.getUsername();
			var userStatsInfo = document.querySelector('div.userstats');
			if ( userStatsInfo )
			{
				// made by crea7or
				// start SCRIPTS-61
				// isn't needed for non users
				if ( ownUsername.length > 0 )
				{
					var vS61div = document.createElement('div');
					vS61div.setAttribute("class", "userinboxwrite");
					vS61div.innerHTML = userStatsInfo.parentNode.childNodes[5].innerHTML;
					userStatsInfo.parentNode.childNodes[1].appendChild( vS61div );
				}
				// end SCRIPTS-61
				var username = elem[0].innerHTML.split('</a></h2>')[0].split('">')[1];
				var div = document.createElement('div');
				div.setAttribute("id", "d3search-userinfo");
				div.setAttribute("class", "userstat");
				userStatsInfo.appendChild(div);
				_$.injectScriptUrl("http://d3search.ru/wazzup?username=" + encodeURI(username) + "&ownUsername=" + encodeURI(ownUsername)+"&container=d3search-userinfo");
			}
		}
	}
}

//Правим кодировку в бан бложике
//Greetz to NickJr
if( _$.settings.ban_encoding == '1')
{
	if(location.pathname.indexOf('/banned')==0 || document.referrer.indexOf('/banned')>-1 || (location.pathname.indexOf('/comments')>-1 && _$.$c('b-tag_add_form').length == 0))
	{
		var posts = _$.$c("dt");
		var comments = _$.$c("c_body");
		//problem: the table has collisions
		var table =
		{
			'Ð»Ð¾Ð¿Ð°ÑÐ¾Ð¹':'лопатой',
			'Ð´Ð¾':'до',
			'Ð·Ð°':'за',
			'ÐÑÐ½Ñ':'Июня',
			'ÐÐ°Ñ':'Мая',
			'ÐÐ¿ÑÐµÐ»Ñ':'Апреля',
			'ÐÐ°ÑÑÐ°':'Марта',
			'Ð¤ÐµÐ²ÑÐ°Ð»Ñ':'Февраля',
			'Ð¯Ð½Ð²Ð°ÑÑ':'Января',
			'ÐÐµÐºÐ°Ð±ÑÑ':'Декабря',
			'ÐÐºÑÑÐ±ÑÑ':'Октября',
			'ÐÐ¾ÑÐ±ÑÑ':'Ноября',
			'Ð¡ÐµÐ½ÑÑÐ±ÑÑ':'Сентября',
			'ÐÐ²Ð³ÑÑÑÐ°':'Августа',
			'ÐÑÐ»Ñ':'Июля',
			'ÐÐ¾':'Во',
			'ÑÐ°Ð·':'раз',
			//now we have tried our best
			'Ð°':'а',
			'Ð±':'б',
			'Ð²':'в',
			'Ð³':'г',
			'Ð´':'д',
			'Ðµ':'е',
			'Ñ‘':'ё',
			'Ð¶':'ж',
			'Ð·':'з',
			'Ð¸':'и',
			'Ð¹':'й',
			'Ðº':'к',
			'Ð»':'л',
			'Ð¼':'м',
			'Ð½':'н',
			'Ð¾':'о',
			'Ð¿':'п',
			'Ñ€':'р',
			'Ñƒ':'у',
			'Ñ„':'ф',
			'Ñ…':'х',
			'Ñ†':'ц',
			'Ñ‡':'ч',
			'Ñˆ':'ш',
			'Ñ‰':'щ',
			'ÑŠ':'ъ',
			'Ñ‹':'ы',
			'ÑŒ':'ь',
			'ÑŽ':'ю',
			'Ñ‚':'т',
			'Ñ':'с',
			'Ñ':'э',
			'Ñ':'я',
			'Ð':'А',
			'Ð‘':'Б',
			'Ð’':'В',
			'Ð“':'Г',
			'Ð”':'Д',
			'Ð•':'Е',
			'Ð':'Ё',
			'Ð–':'Ж',
			'Ð—':'З',
			'Ð˜':'И',
			'Ð™':'Й',
			'Ðš':'К',
			'Ð›':'Л',
			'Ðœ':'М',
			'Ðž':'О',
			'ÐŸ':'П',
			'Ð ':'Р',
			'Ð¡':'С',
			'Ð¢':'Т',
			'Ð£':'У',
			'Ð¤':'Ф',
			'Ð¥':'Х',
			'Ð¦':'Ц',
			'Ð§':'Ч',
			'Ð¨':'Ш',
			'Ð©':'Щ',
			'Ðª':'Ъ',
			'Ð«':'Ы',
			'Ð¬':'Ь',
			'Ð­':'Э',
			'Ð®':'Ю',
			'Ð¯':'Я',
			'Ð':'Н',
			//some more tries
			'Ð':'В'
		};

		for( var i = 0; i < posts.length; i++)
		{
			txt_str = posts[i].innerHTML;
			for(var index in table) txt_str = txt_str.split(index).join(table[index]);
			posts[i].innerHTML = txt_str;
		}
		for( var i = 0; i < comments.length; i++)
		{
			txt_str = comments[i].innerHTML;
			for(var index in table) txt_str = txt_str.split(index).join(table[index]);
			comments[i].innerHTML = txt_str;
		}
	}
}

//как там всё - tool
if(_$.settings.links_test=='1'){
	if(location.pathname.indexOf('/write/')==0){
		function addIframe(e){
			var form = _$.$(e.target.getAttribute('onclick').split("$('")[1].split("')")[0]);
			var comment = _$.$t('textarea',form)[0].value;

			link = "";
			var arr = _$.$t('input',form);
			for(var i=0;i<arr.length;i++){
				if(arr[i].name == "link")link = arr[i].value;
			}
			if(link == "http://")	link="";

			var div = document.createElement('div');
			div.setAttribute("id", "d3search-postinfo");
			div.setAttribute("class", "userstat");
			if(_$.$('d3search-postinfo')!=null)_$.$('d3search-postinfo').parentNode.removeChild(_$.$('d3search-postinfo'));
			form.insertBefore(div, _$.$c("submit_btn", form)[0]);

			_$.injectScriptUrl("http://d3search.ru/wazzup?post="+encodeURIComponent(comment)+"&link="+encodeURIComponent(link)+"&container=d3search-postinfo");
		}

			for(var i=0;i<4;i++){
				var prevButton = _$.$c('preview_btn')[i].getElementsByTagName('img')[0];
				_$.addEvent(prevButton, 'click', addIframe);
			}

			//hide preview if broken
			window.setInterval(function(){
				var pre = _$.$c('write_form_preview')[0];
				if(pre.innerHTML.indexOf('/error/1.jpg')>-1){
						pre.innerHTML = 'Родной просмотр выдал ошибку.';
				}
			}, 200);
	}
}

//Замена поиска
if(_$.settings.d3search=='1'){
	var searchDiv = _$.$c('header_search',document.body,'div');
	if(searchDiv.length == 1){
		searchDiv[0].innerHTML = '\
				<form name="simple-search" action="http://d3search.ru/search" '+((_$.settings.new_window=='1')?'target="_new" ':'')+'method="get">\
					<div class="header_search_input"><input type="text" defaultValue="поиск на d3search.ru" id="js-header_search_input_new" value="поиск на d3search.ru" name="query" class="text_input"></div>\
					<input class="header_search_submit" type="image" src="/i/header_search_icon.gif">\
				</form>';
			_$.injectScript("utils.focusText('js-header_search_input_new', 'поиск на d3search.ru');");
	}
}

//Karma Log
if(_$.settings.karma_log=='1'){
	if(location.pathname.indexOf('/user')==0){
		function carmaUpdate(e){
			//alert(e.target.style.backgroundColor);
			waitUntilVoted(e.target, _$.$c('vote_result')[0].innerHTML);
		}

		function waitUntilVoted(elem, oldValue){
			if(elem.className.indexOf("js-lh_active") > -1){
				window.setTimeout(function(){waitUntilVoted(elem, oldValue);}, 100);
			}else{
				var newValue = _$.$c('vote_result')[0].innerHTML;
				if((newValue-oldValue) > 0){
					updateEntry(1);
				}else if((newValue-oldValue) < 0){
					updateEntry(-1);
				};
			}
		}

		function updateEntry(value){
			var oldtext = _$.$('js-usernote').firstChild.nodeValue;
			if(oldtext == "Место для заметок о пользователе. Заметки видны только вам.")oldtext = "";
			var d = new Date();
			date = "["+d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear()+"]";
			var newEntry = true;
			if(value>0){var sign="+";}else{var sign="-";}
			value = Math.abs(value);
			if(oldtext.substr(0,date.length) == date){
				oldsign = oldtext.substr(date.length+7, 1);
				olddelta = parseInt(oldtext.substr(date.length+8, 1));
				if(oldsign == sign){
					_$.$('js-usernote').firstChild.nodeValue = oldtext.substr(0, date.length+8) + (olddelta+value) + oldtext.substr(date.length+9);
					newEntry = false;
				}
			}
			if(newEntry){
				var reason = prompt("Почему?", "");
				if(reason == null){reason = "";};
				_$.$('js-usernote').firstChild.nodeValue = date+' Карма '+sign+Math.abs(value)+': '+reason.replace(/\./g, "")+'. '+oldtext;
			}
			_$.fireEvent(_$.$('js-usernote'), 'click');
			_$.fireEvent(document, 'click');
		}

		if(_$.$c("vote_button_plus_left")[0])_$.addEvent(_$.$c("vote_button_plus_left")[0], "click", carmaUpdate);
		if(_$.$c("vote_button_plus_right")[0])_$.addEvent(_$.$c("vote_button_plus_right")[0], "click", carmaUpdate);
		if(_$.$c("vote_button_minus_left")[0])_$.addEvent(_$.$c("vote_button_minus_left")[0], "click", carmaUpdate);
		if(_$.$c("vote_button_minus_right")[0])_$.addEvent(_$.$c("vote_button_minus_right")[0], "click", carmaUpdate);

		var updatesPending = 0;

	}
}

//Youtube preview
if(_$.settings.youtube_preview=='1')
{
		var time1 = new Date();

		function isNumber(n)
		{
			return !isNaN(parseFloat(n)) && isFinite(n);
		}

		function addPreview(comments)
		{
			var comment_links = comments.getElementsByTagName('a');
			var youtube_links = new Array();
			var vimeo_links = new Array();
			for (var i = 0; i < comment_links.length; i++)
			{
				if (comment_links[i].href.split("youtube.com/").length > 1)
				{
					youtube_links.push(comment_links[i]);
				}
				else if (comment_links[i].href.split("vimeo.com/").length > 1)
				{
					vimeo_links.push(comment_links[i]);
				}
			}

		width = 480;
		var height = 385;
		var button = '<div style="display:inline-block; position:relative; top: -'+(height-14)+'px; left: 2px; background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b style="color: #FFF;">x</b></div>';
		//process youtube links
		for(var i=0; i<youtube_links.length; i++){
			var link = youtube_links[i];
			_$.addEvent(link,'click',function(e)
			{
					var re = processUrl(this.href);
					if(re != false)
					{
						youtube_id = re.id;
						time = re.time;
						if(time<0)time=0; //2.6.5 fix by Stasik0 on 12.05.12
						if(this.name == "")
						{
							if(this.parentNode.tagName.toLowerCase()=="td")
							{
								//it`s a video-post preview
								this.parentNode.setAttribute('name', this.parentNode.width);
								this.parentNode.setAttribute('width', width+46);
							}
							this.setAttribute('name', this.innerHTML);
							this.style.textDecoration = "none";
							this.innerHTML = '<span style="display:inline-block; clear: both; width: '+(width+36)+'px; "><span><object width="'+width+'" height="'+height+'"><param name="movie" value="http://www.youtube.com/v/'+id+'?autoplay=1&start='+time+'&fs=1"></param><param name="allowFullScreen" value="true"></param></param><param name="allowScriptAccess" value="always"></param><embed src="http://www.youtube.com/v/'+id+'?autoplay=1&start='+time+'&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+width+'" height="'+height+'"></embed></object></span>'+button+'</span>';
							//adding size change links
							var div = document.createElement('div');
							div.innerHTML = '<sup>Размер: <a class="normal" href="#">нормальный</a> <a class="big" href="#">побольше</a> <a class="bigger" href="#">большой</a></sup>';
							_$.insertAfter(this, div);
							//div.setAttribute("style","position:relative;");
							//div.style.left = (_$.element_position(this).x - div.clientWidth + 30) + "px";
							this.style.display = "block";
							arr = _$.$t('a',div);
							for(var link in arr)
							{
							  link = arr[link];
								_$.addEvent(link,'click',function(e){
									if(this.className == "normal"){
										w=480; h=385;
									}else if (this.className == "big"){
										w=640; h=480;
									}else{
										w=800; h=600;
									};
									
									var pDiv = this.parentNode.parentNode.previousSibling;
									//move x button
									_$.$t('span',pDiv)[0].style.width = w+36+"px";
									_$.$t('div',pDiv)[0].style.top = "-"+(h-14)+"px";
									//resize movie
									var elem = _$.$t('embed',pDiv)[0];
									elem.width = w;
									elem.height = h;
									var elem = _$.$t('object',pDiv)[0];
									elem.width = w;
									elem.height = h;
									e.preventDefault();
									return false;
								});
							}
						}
//						else if (e.target.firstChild.data == 'x')
						else
						{
							if(this.parentNode.tagName.toLowerCase()=="td")
							{
								//it`s a video-post preview
								this.parentNode.setAttribute('width', this.parentNode.getAttribute('name'));
							}
							this.innerHTML = this.getAttribute('name');
							this.style.textDecoration = "underline";
							this.setAttribute('name', "");
							this.style.display = "inline";
							this.parentNode.removeChild(this.nextSibling);
						}
						e.preventDefault();
						return false;
					}
				}
			);
		}
		
     width = 480;
        height = 385;
        button = '<div style="display:inline-block; position:relative; top: -' + (height - 14) + 'px; left: 2px; background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b style="color: #FFF;">x</b></div>';
        //process vimeo links
        for (var i = 0; i < vimeo_links.length; i++)
        {
            var link = vimeo_links[i];
            var linkar = link.href.split("vimeo.com/");
            var changeIt = false;
			if (linkar.length > 1)
			{
				changeIt = isNumber(linkar[1])
			}
			if ( changeIt )
			{
            _$.addEvent(link, 'click', function(e)
            {
                //var re = processUrl(this.href);
                var linkar = this.href.split("vimeo.com/");
                if (linkar.length > 1)
                {
                    vimeo_id = linkar[1];
                    if (this.name == "")
                    {
                        if (this.parentNode.tagName.toLowerCase() == "td")
                        {
                            //it`s a video-post preview
                            this.parentNode.setAttribute('name', this.parentNode.width);
                            this.parentNode.setAttribute('width', width + 46);
                        }
                        this.setAttribute('name', this.innerHTML);
                        this.style.textDecoration = "none";
                        this.innerHTML = '<span style="display:inline-block; clear: both; width: ' + (width + 36) + 'px; "><span><iframe width="' + width + '" height="' + height + '" src="http://player.vimeo.com/video/' + vimeo_id + '?autoplay=1" frameborder="0"></iframe></span>' + button + '</span>';
                        //adding size change links
                        var div = document.createElement('div');
                        div.innerHTML = '<sup>Размер: <a class="normal" href="#">нормальный</a> <a class="big" href="#">побольше</a> <a class="bigger" href="#">большой</a></sup>';
                        _$.insertAfter(this, div);
                        //div.setAttribute("style","position:relative;");
                        //div.style.left = (_$.element_position(this).x - div.clientWidth + 30) + "px";
                        this.style.display = "block";
                        arr = _$.$t('a', div);
                        for (var link in arr)
                        {
                            link = arr[link];
                            _$.addEvent(link, 'click', function(e)
                            {
                                if (this.className == "normal")
                                {
                                    w = 480; h = 385;
                                }
                                else if (this.className == "big")
                                {
                                    w = 640; h = 480;
                                }
                                else
                                {
                                    w = 800; h = 600;
                                };

                                var pDiv = this.parentNode.parentNode.previousSibling;
                                //move x button
                                _$.$t('span', pDiv)[0].style.width = w + 36 + "px";
                                _$.$t('div', pDiv)[0].style.top = "-" + (h - 14) + "px";
                                //resize movie
                                var elem = _$.$t('iframe', pDiv)[0];
                                elem.width = w;
                                elem.height = h;
                                e.preventDefault();
                                return false;
                            });
                        }
                    }
                    else
                    {
                        if (this.parentNode.tagName.toLowerCase() == "td")
                        {
                            //it`s a video-post preview
                            this.parentNode.setAttribute('width', this.parentNode.getAttribute('name'));
                        }
                        this.innerHTML = this.getAttribute('name');
                        this.style.textDecoration = "underline";
                        this.setAttribute('name', "");
                        this.style.display = "inline";
                        this.parentNode.removeChild(this.nextSibling);
                    }
                    e.preventDefault();
                    return false;
                }
            }
			);
			}		
		}
		
	}

		function documentChangedYT(event) 
		{
			if (supressEvents) 
			{
				return;
			}
			if(event.target.className != null && event.target.className.indexOf("comment")>-1)
			{
				addPreview(event.target);
			}
		}

		//handle video-posts
		//step 1: add youtube links to video posts
		var video_posts = _$.$c('post_video');
		for(var i=0;i<video_posts.length;i++){
			var post = video_posts[i];
			var image_link = post.style.backgroundImage;
			if(image_link.search("youtube.com")>-1){
				image_link = post.style.backgroundImage.split("url(")[1].split(")")[0];
				image_link = image_link.replace('"','')
				var url = image_link.split("/vi/")[1].split("/")[0];
				post.style.backgroundImage = "";
				post.style.paddingLeft = 0;
				post.innerHTML = '<table style="display: block;"><tr><td width="150"><a href="http://www.youtube.com/watch?v='+url+'"><img src="'+image_link+'"/></a></td><td>'+post.innerHTML+'</td></tr></table>';
				//step 2: add previews
				//addPreview(post);
			}
		}

		//var comments = _$.$('js-comments');
		var comments = document.body;
		if(comments != null){
			addPreview(comments);
		}

		//handle new ajax-generated content
		_$.addEvent(document,"DOMNodeInserted", documentChangedYT);

		addBenchmark( time1, 'youtube preview' );
	}

// formatting buttons for post and music.dirty
function postBoxGetCursor(input)
{
	var result = {start: 0, end: 0};
	if (input.setSelectionRange)
	{
		result.start= input.selectionStart;
		result.end = input.selectionEnd;
	} else if (!document.selection)
	{
		return false;
	} else if (document.selection && document.selection.createRange)
	{
		var range = document.selection.createRange();
		var stored_range = range.duplicate();
		stored_range.moveToElementText(input);
		stored_range.setEndPoint('EndToEnd', range);
		result.start = stored_range.text.length - range.text.length;
		result.end = result.start + range.text.length;
	}
	return result;
}

function postBoxSetCursor(txtarea, start, end)
{
	if(txtarea.createTextRange)
	{
		var range = txtarea.createTextRange();
		range.move("character", start);
		range.select();
	}
	else if (txtarea.selectionStart)
	{
		txtarea.setSelectionRange(start, end);
	}
}

function postBoxInsTag(startTag, endTag, elementId)
{
	var txtarea = document.getElementById( elementId );
	txtarea.focus();
	var scrtop = txtarea.scrollTop;
	var cursorPos = postBoxGetCursor(txtarea);
	var txt_pre = txtarea.value.substring(0, cursorPos.start);
	var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
	var txt_aft = txtarea.value.substring(cursorPos.end);
	if (cursorPos.start == cursorPos.end)
	{
		var nuCursorPos = cursorPos.start + startTag.length;
	}
	else
	{
		var nuCursorPos=String(txt_pre + startTag + txt_sel + endTag).length;
	}
	txtarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;
	postBoxSetCursor(txtarea,nuCursorPos,nuCursorPos);
	if (scrtop) txtarea.scrollTop=scrtop;
}

function postBoxInsText(tagName, elementId)
{
	var startTag = '<' + tagName + '>';
	var endTag = '</' + tagName + '>';
	postBoxInsTag(startTag, endTag, elementId);
	return false;
}

function postBoxInsImage( elementId)
{
	var src = prompt('enter image src', 'http://');
	if(src)
	{
		postBoxInsTag('<img src="' + src + '" alt="image">', '', elementId);
	}
	return false;
}


function postBoxInsLink( elementId)
{
	var href = prompt('enter a href', 'http://');
	if(href)
	{
		postBoxInsTag('<a href="' + href + '">', '</a>', elementId);
	}
	return false;
}

// Format buttons for posts and comments (at music.dirty.ru)
if(( document.location.href.indexOf("music.dirty.ru/comments") > 0 || document.location.href.indexOf("write") > 0 ) && ( document.location.href.indexOf("/inbox/") == -1 ))
{
	// add script to the page
	var postBoxScr=document.createElement("script");
	postBoxScr.type="application/javascript";
	postBoxScr.textContent = postBoxGetCursor + "\n" + postBoxSetCursor + "\n" + postBoxInsTag + "\n" + postBoxInsText + "\n" + postBoxInsImage + "\n" + postBoxInsLink;
	document.body.appendChild( postBoxScr );
	var formatButtonsInputs =  document.getElementsByTagName('form');
	var fbID;
	if ( formatButtonsInputs )
	{
		for ( i =0; i < formatButtonsInputs.length; i++ )
		{
			fbID = 'cmnt_' + formatButtonsInputs[i].getAttribute('id');
			formatButtonsTextAreaDiv = formatButtonsInputs[i].querySelector('textarea');
			if ( formatButtonsTextAreaDiv )
			{
				formatButtonsTextAreaDiv.setAttribute('id',fbID);
				if ( document.location.href.indexOf("music") >= 0 )
				{
					vTagTab1 = formatButtonsInputs[i].querySelector('table');
					vTagTab2 = vTagTab1.querySelector('table');
					formatButtonsTextAreaWriteHdr = vTagTab2.querySelector('td');
				}
				else
				{
					formatButtonsTextAreaWriteHdr = formatButtonsInputs[i].querySelector('div.write_page_header_right');
				}
				if (formatButtonsTextAreaWriteHdr )
				{
					var newdiv = document.createElement('div');
					newdiv.setAttribute('class', 'textarea_editor');
					newdiv.setAttribute('style', 'textarea_editor');
					newdiv.innerHTML = "<br><a onclick=\"return postBoxInsText('b', '" + fbID + "');\" href=\"#\"><b>Bold</b></a>&nbsp;<a onclick=\"return postBoxInsText('i', '" + fbID + "');\" href=\"#\"><i>Italic</i></a>&nbsp;<a onclick=\"return postBoxInsText('u', '" + fbID + "');\" href=\"#\"><u>Underline</u></a>&nbsp;<a onclick=\"return postBoxInsText('sup', '" + fbID + "');\" href=\"#\">x<sup>2</sup></a>&nbsp;<a onclick=\"return postBoxInsText('sub', '" + fbID + "');\" href=\"#\">x<sub>2</sub></a>&nbsp;<a onclick=\"return postBoxInsText('irony', '" + fbID + "');\" href=\"#\"><span class=\"irony\">Irony</span></a><span class=\"textarea_editor_divider\">&nbsp;</span><a onclick=\"return postBoxInsLink('" + fbID + "');\" href=\"#\"><b>Link</b></a>&nbsp;<a onclick=\"return postBoxInsImage('" + fbID + "');\" href=\"#\"><b>Image</b></a>";
					formatButtonsTextAreaWriteHdr.appendChild( newdiv );
				}
			}
		}
	}
}
// end of formatting buttons

//dirty tags
if(_$.settings.dirty_tags=='1')
{
	function manageTag( tagAnchor )
	{
		var tagText = tagAnchor.title.replace( /,/ig, ' ');
		if (tagAnchor.innerHTML == 'x' )
		{
			tagAnchor.innerHTML = '-';
			$('js-new_tag_input').value = tagText;
			tagsHandler.submitTag();
		}
		else
		{
			tagAnchor.innerHTML = 'x' ;
			tagsHandler.deleteTag( $('js-tags_private'), tagText );
		}
		return false;
	}

	function manageOwnTags()
	{
		var ourTagsDivCheck = document.getElementById('js-vtags-textarea');
		if (ourTagsDivCheck == null )
		{
			var tagsDivAtDirty = document.getElementById('js-post_tags');
			if ( tagsDivAtDirty )
			{
				// create list of tags to edit
				var divEditor = document.createElement('div');
				divEditor.setAttribute('style', 'font-size: 12px;');
				divEditor.setAttribute('id','js-vtags-textarea');
				divEditor.innerHTML = "<textarea rows=\"32\" cols=\"40\" id=\"vtags-own-tags\" style=\"font-size: 12px;\"></textarea><br><br>";
				divEditor.innerHTML += "<a href=\"#\" onclick=\"return saveTagsList();\" class=\"dashed\"><img src=\"http://pit.dirty.ru/dirty/1/2010/07/18/28284-165319-dab6dbe746b938b30cc807225bee1e65.png\" width=\"16\" height=\"16\" hspace=\"5\" vspace=\"3\" border=\"0\" align=\"top\">сохранить мой список</a><br><br>";
				tagsDivAtDirty.appendChild(divEditor);
				var vTagsTextArea = document.getElementById('vtags-own-tags');
				if ( vTagsTextArea )
				{
					var tagsArray = loadTagsList();
					var tagsInString = tagsArray.toString();
					vTagsTextArea.value = tagsInString.replace(/,/gi,'\n');
				}
			}
		}
		else
		{
			ourTagsDivCheck.parentNode.removeChild( ourTagsDivCheck );
		}
		return false;
	}
	function saveTagsList()
	{
		//workaround for opera with 0x10 code at the end of stings
	    var nrm = document.getElementById('vtags-own-tags').value.replace(/\r/g, '');
//	    var tagsArray = tagsArray = nrm.split('\n');
	    localStorage.setItem('dirtyTags', jsonStringify(nrm.split('\n')));
		manageOwnTags();
		return false;
	}
	function loadTagsList()
	{
		// load values
		// remove in 2.6
		var tagsArrayFromLocalStore = localStorage.getItem('vTagsStore');
		var tagsArray = new Array();
		if ( tagsArrayFromLocalStore == null )
		{
		    tagsArray = jsonParse(localStorGetItem('dirtyTags', '["Тупая фигня", "Это же реклама" , "Это неправда", "Об этом уже писали", "Ctrl-C Ctrl-V", "Свежак", "КДПВ", "Скандалы интриги расследования", "Все правильно сделал", "Фишкинет", "Господи какая красота111", "британские учёные", "Чиновники", "Милиция","Оборотни","Беспредел","Наука","Космос","Искусство","История","Авто","Авиация","Армия","РПЦ","Маразм","Кругом враги","Животные","fapfapfap","боже он умер","Вавилонская библиотека","вирусняк","Гурусик нямка","Думаем о России","пост проклят","еще один все понял","и снова о Главном","Зачем моё измождённое тело","слава богу родился","лепрозорий на выезде","нафталин","ожируй клюв","он же упоротый","политический кружок при сельском клубе","слава России","Творчество душевнобольных","понаехали","Я маленькая лошадка","Я открыл для себя википедию"]'));
		    //localStorage.setItem('dirtyTags', jsonStringify(tagsArray));
		}
		else
		{
			//workaround for opera with 0x10 code at the end of stings
			tagsArrayFromLocalStore = tagsArrayFromLocalStore.replace(/\r/g,'');
			tagsArray = tagsArrayFromLocalStore.split("\n");
			localStorage.removeItem('vTagsStore');
			localStorage.removeItem('vTagsFloatCloud');
			localStorage.removeItem('vTagsAutoSetGold');
			localStorage.removeItem('vTagsJovanPremium');
			localStorage.setItem('dirtyTags', jsonStringify( tagsArray ));
		}
		return tagsArray;
	}
	function manageTagsList()
	{
		var ourTagsDivCheck = document.getElementById('js-tags-script-predefines');
		if (ourTagsDivCheck == null )
		{
			var tagsArray = loadTagsList();
			// add popular tags from the post to our list
			// get my user name
			var myUserName;
			var divWithUserName = document.querySelector('div.header_tagline_inner');
			var dlinks = divWithUserName.getElementsByTagName('a');
			if ( dlinks.length > 0 )
			{
				myUserName = dlinks[0].text;
			}
			// get list of public tags
			var publicTagsDiv = document.getElementById('js-tags_public');
			var ourTagsList = tagsArray.toString();
			var publicTags = publicTagsDiv.querySelectorAll('a.tag');
			for ( var i = 0; i < publicTags.length; i++ )
			{
				if ( publicTags[i].title.indexOf( myUserName ) < 0 )
				{
					if ( ourTagsList.search( new RegExp( publicTags[i].text,'i') ) < 0 )
					{
						tagsArray.unshift( publicTags[i].text );
					}
				}
			}
			//
			// create div for tags
			var tagsDivAtDirty = document.getElementById('js-post_tags');
			if ( tagsDivAtDirty )
			{
				ourTagsDiv = document.createElement('div');
				ourTagsDiv.setAttribute('id','js-tags-script-predefines');
				ourTagsDiv.setAttribute('style', 'font-size: 12px;');
				var postUserName;
				var postFooter = document.querySelector('div.dd');
				if ( postFooter )
				{
					var linksFromPostHrd = postFooter.querySelectorAll('a');
					for ( i = 0; i < linksFromPostHrd.length; i++ )
					{
						if ( linksFromPostHrd[i].href.indexOf('user') >= 0 )
						{
							postUserName = linksFromPostHrd[i].text + " молодец!";
							break;
						}
					}
				}
				if ( postUserName.length > 0 )
				{
					tagsArray.push( postUserName );
				}
				if ( tagsArray.length > 0 )
				{
					for ( i = 0; i < tagsArray.length; i++ )
					{
						ourTagsDiv.innerHTML += "<a href=\"#\" onclick=\"$('js-new_tag_input').value = '" + tagsArray[i] + "'; tagsHandler.submitTag(); return false;\" title=\"" + tagsArray[i] + "\">" + tagsArray[i] +   "</a>";
						if (( tagsArray.length - 1 ) != i )
						{
							ourTagsDiv.innerHTML += " . ";
						}
					}
					ourTagsDiv.innerHTML += "<br><br>";
				}
				tagsDivAtDirty.appendChild( ourTagsDiv );
			}
		}
		else
		{
			ourTagsDivCheck.parentNode.removeChild( ourTagsDivCheck );
		}
		return false;
	}

	// set gold tag
	function checkGoldTag()
	{
	    var goldSet = false;
		var postGoldTag = document.getElementsByClassName('stars');
		var postSilverTag = document.getElementsByClassName('wasstars');
		if ( postSilverTag.length > 0 || postGoldTag.length > 0 )
		{
		    goldSet = true;
			if ( document.querySelector('li#js-personal_tag_72') == null )
			{
				// add  gold
				document.getElementById('js-new_tag_input').value = 'Золотой пост';
				location.href="javascript:void( tagsHandler.submitTag());"
			}
		}
		//
		//	if ( js-public_tag_31045)
		var divDd = document.querySelector('div.dd');
		if( divDd ) 
		{
		    var sizePreTime = 10;
		    var posTime = divDd.innerHTML.indexOf('сегодня в ');
		    if ( posTime < 0 )
		    {
		        sizePreTime = 8;
		        posTime = divDd.innerHTML.indexOf('вчера в ');
		    }
		    if ( posTime > 0 )
		    {
		        var timeArr = divDd.innerHTML.slice( posTime + sizePreTime, posTime + sizePreTime + 5 ).split('.');
		        if ( timeArr.length == 2 )
		        {
			var curTime = new Date();
			if ( curTime.getTimezoneOffset() == -240 )
			{
		            var postTime = ( Number(timeArr[0]) * 60 ) + Number( timeArr[1]);
		            var nowTime = ( curTime.getHours() * 60 ) + curTime.getMinutes();
		            if (sizePreTime == 8) 
		            {
		                nowTime += ( 24 * 60 );
		            }
		            if (( nowTime - postTime) < 61 )
		            {
		                if (( document.querySelector('li#js-personal_tag_31045') == null ) && ( goldSet == true )) 
		                {
		                    // add  gold for hour
		                    document.getElementById('js-new_tag_input').value = 'Золото за час';
		                    location.href = "javascript:void( tagsHandler.submitTag());"
		                }		            
		            }
			}
		        }
            }		    
		}
		
		
	}
	function processCommentTags( commentDiv )
	{
		var vTagStr = commentDiv.innerHTML.replace( /(\&nbsp;)/gi,' ');
		// regexp based on http://leprosorium.ru/users/antyrat script
		commentDiv.innerHTML = vTagStr.replace( /([^:\s\.\>\<][\wа-яёЁ\-\–\—\s\!\%\?,]+)(\[x\]|\s\[x\]|\s\[х\]|\[х\])+/gi, "$1 [<a href=\"#\" onclick=\"return manageTag(this);\" title=\"$1\" style=\"color: red;\">x</a>]");
	}
	function documentChangedTags( event )
	{
		if (supressEvents)
		{
			return;
		}
		if( event.target.className != null && event.target.className.indexOf("comment") > -1 )
		{
			var tagComment = event.target.querySelector('div.c_body');
			if ( tagComment != null )
			{
				processCommentTags( tagComment );
			}
		}
	}
	if( document.location.href.indexOf("comments") > -1 )
	{
		var time1 = new Date();
		
		var newTagsDiv = document.getElementById('js-post_tags');
		if ( newTagsDiv)
		{
			//var oldTagsDiv = document.querySelector('div.h-ads_comments_page');
			//var cloneDiv = document.cloneNode( newTagsDiv );
			//if ( oldTagsDiv )
			//{
//				oldTagsDiv.appendChild( newTagsDiv );
//				_$.injectScript("tagsHandler.toggleTagEdit();");				
//				newTagsDiv = document.getElementById('js-new_tag_input');
//				if ( newTagsDiv)
//				{
//					newTagsDiv.setAttribute('style','width: 220px !important;');
//				}				
//			}
		}
		
		var loggedUser = document.querySelector('div.header_logout');
		var addFormDiv = document.getElementById('js-tag_add_form_block');
		if ( loggedUser && addFormDiv )
		{
			// add script to the page
			_$.injectScript( manageTag + "\n" + manageTagsList + "\n" + manageOwnTags + "\n"+ loadTagsList + "\n" + saveTagsList );
			if ( _$.settings.dirty_tags_hidetags == 1 )
			{
				var tagsDivAtDirty = document.getElementById('js-post_tags');
				var divWithLinkToTags = document.createElement('div');
				divWithLinkToTags.setAttribute('id','js-tags-script-floatlink');
				divWithLinkToTags.setAttribute('style', 'font-size: 12px; display: block;');
				divWithLinkToTags.innerHTML = "<a href=\"#\" onclick=\"return manageTagsList();\" class=\"dashed\">ваш список меток</a><br><br>";
				tagsDivAtDirty.appendChild( divWithLinkToTags );
			}
			else
			{
				manageTagsList();
			}
			// create link to edit tags
			var tagForms = addFormDiv.getElementsByTagName('form');
			newdiv = document.createElement('a');
			newdiv.setAttribute('style', 'margin-left: 10px;');
			newdiv.setAttribute('class', 'dashed');
			newdiv.setAttribute('href', '#');
			newdiv.innerHTML = "<img src=\"http://pit.dirty.ru/dirty/1/2010/07/18/28284-162705-21ac0118341f8bfd711a91b3a893af67.png\" width=\"16\" height=\"16\" border=\"0\">";
			newdiv.setAttribute('onclick', "manageOwnTags()");
			tagForms[0].appendChild(newdiv);

			addBenchmark( time1, 'dirtytags settings' );
			var time1 = new Date();

			// fast tags part
			var tagComments = document.querySelectorAll('div.c_body');
			var xPosition;
			for( var i=0; i < tagComments.length; i++)
			{
				xPosition = tagComments[i].innerHTML.indexOf('[x]');
				if ( xPosition < 0 )
				{
					xPosition = tagComments[i].innerHTML.indexOf('[X]');
				}
				if ( xPosition < 0 )
				{
					xPosition = tagComments[i].innerHTML.indexOf('[х]');
				}
				if ( xPosition < 0 )
				{
					xPosition = tagComments[i].innerHTML.indexOf('[Х]');
				}
				if ( xPosition > 0 )
				{
					processCommentTags( tagComments[i]);
				}
			}
			if ( _$.settings.dirty_tags_autogold == 1 )
			{
				document.onLoad = checkGoldTag();
			}
			_$.addEvent(document,"DOMNodeInserted", documentChangedTags);

			addBenchmark( time1, 'dirtytags replace' );
		}
	}
}

	//comment threshold
	if( _$.settings.comments_threshold == 1 || _$.settings.comments_order == 1 )
	{
		var time1 = new Date();
		var _dct = {
				comments : {},
				curr_select_numb : 0,
				comm_order : 1, // 1 for tree, 2 for linear, 3 for back-ordered linear
				tree_order : [],
				list_order : [],
				list_reverse : [],
				isPostPage : false,
				isInboxPage : false,

				toggle_div : function (name,param){
						if(param) document.getElementById(name).style.display = (param==1)?'block':'none';
						else document.getElementById(name).style.display = (document.getElementById(name).style.display=='none')?'block':'none';
				},

				getElementsByClassAndTag : function(name, tag, obj) {
						var obj = obj||document;
						//opts by stasik
						//var result = [];
						//var allElements = obj.getElementsByTagName(tag);
						//for(var i=0; i<allElements.length; i++){
						//		if(allElements[i].className && allElements[i].className==name){
						//				result[result.length] = allElements[i];
						//		}
						//}
						var str = "";
						var clas = name.split(" ");
						for(var i=0;i<clas.length;i++){
							str += tag+"."+clas[i];
							if(i< clas.length-1)str+=",";
						}
						var result = obj.querySelectorAll(str);
						return Array.prototype.slice.call(result);
				},

				getPositiveAverage : function () {
						var sum = 0;
						for (var i=1; i<_dct.comments.length; i++) {
								if (_dct.comments[i].vote>0) {
										sum += _dct.comments[i].vote;
								}
						}
						return sum/_dct.comments.length;
				},

				getIntFromPrompt : function (msg, curr_val) {
					 var result = prompt(msg, curr_val)
					 if (result==null) {
								return false;
					 }

					 if (!result) {
								alert('Имело смысл что-нибудь ввести!');
								return false;
					 }

					 result = parseInt(result);
					 if (!result) {
								alert('Невнятное число!');
								return false;
					 }
					 return result;
				},

				onChangeThreshold : function () {
						var new_sel = document.getElementById('thres_select_'+_dct.curr_select_numb);

						if (new_sel.value == 'set_step') {
								var result = _dct.getIntFromPrompt("Новое значение шага:", _$.settings.cmnt_thresh_step)
								if (result) {
										_$.settings.cmnt_thresh_step = result;
								}
								new_sel.options[0].selected = true;
								_dct.replaceSelect();
						} else if (new_sel.value == 'set_type') {
								_$.settings.cmnt_thresh_type = (_$.settings.cmnt_thresh_type==1) ? 2:1;
								_dct.replaceSelect();
						} else if (new_sel.value == 'set_opt_count') {
								var result = _dct.getIntFromPrompt("Количество опций:", _$.settings.cmnt_opt_count)
								if (result) {
										if (result<=0) {
												result = 1;
										}
										_$.settings.cmnt_opt_count = result;
								}
								new_sel.options[0].selected = true;
								_dct.replaceSelect();
						} else if (new_sel.value == 'set_pict_filter') {
								_$.settings.cmnt_picts_always = (_$.settings.cmnt_picts_always==0) ? 1:0;
								_dct.replaceSelect();
						}else {
								_$.settings.cmnt_threshold = new_sel.value;
						}
						_$.set_save( null, 0 );
						_dct.refreshComments();
				},

				replaceSelect : function () {
						var toggle_type_to = "В процентах от среднего!";
						var picts_filtering = "Фильтровать картинки!";
						var thresh_suffix = " голосов";
						if (_$.settings.cmnt_thresh_type==2) {
								toggle_type_to = "В голосах!";
								thresh_suffix = "%";
						}

						if (_$.settings.cmnt_picts_always==0) {
								picts_filtering = "Показать картинки!";
						}

						if (_dct.curr_select_numb==0) {
								curr_select_node_name = 'comments-threshold'
						} else {
								curr_select_node_name = 'div_select_'+_dct.curr_select_numb;
						}
						_dct.curr_select_numb++;

						var curr_sel_node = document.getElementById(curr_select_node_name);
						var new_sel = document.createElement("SELECT");

						if (navigator.appName == "Opera") {
								new_sel.className = "hidden";
								new_sel.onchange = function(){_dct.onChangeThreshold()};
						} else {
								new_sel.addEventListener('change', _dct.onChangeThreshold, false);
						}

						new_sel.length = 5+_$.settings.cmnt_opt_count;
						new_sel.name='thres_select_'+_dct.curr_select_numb;
						new_sel.id='thres_select_'+_dct.curr_select_numb;
						new_sel.options[0].text = "Все";
						new_sel.options[0].value = "-1000";

						var selected = false;
						for (var i=1; i<=_$.settings.cmnt_opt_count; i++) {
								new_sel.options[i].text = "Больше "+(_$.settings.cmnt_thresh_step*i)+thresh_suffix;
								new_sel.options[i].value = _$.settings.cmnt_thresh_step*i;

								if (_$.settings.cmnt_threshold == _$.settings.cmnt_thresh_step*i) {
										new_sel.options[i].selected = true;
										selected = true;
								}
						}
						if (!selected) {
								new_sel.options[0].selected = true;
						}
						new_sel.options[_$.settings.cmnt_opt_count+1].text = toggle_type_to;
						new_sel.options[_$.settings.cmnt_opt_count+1].value = 'set_type';
						new_sel.options[_$.settings.cmnt_opt_count+2].text = "Сменить шаг...";
						new_sel.options[_$.settings.cmnt_opt_count+2].value = "set_step";
						new_sel.options[_$.settings.cmnt_opt_count+3].text = "Число опций...";
						new_sel.options[_$.settings.cmnt_opt_count+3].value = "set_opt_count";
						new_sel.options[_$.settings.cmnt_opt_count+4].text = picts_filtering;
						new_sel.options[_$.settings.cmnt_opt_count+4].value = "set_pict_filter";

						var new_div = document.createElement("FORM");
						new_div.name='div_select_'+_dct.curr_select_numb;
						new_div.id='div_select_'+_dct.curr_select_numb;
						new_div.appendChild(new_sel);
						curr_sel_node.parentNode.replaceChild(new_div, curr_sel_node);

						if (navigator.appName == "Opera") {
								new futuSelect('thres_select_'+_dct.curr_select_numb);
						}
				},

				replaceParentLinks : function() {
						var allLinks=document.getElementsByTagName('a');
						for (var i=0; i<allLinks.length; i++) {
								if (allLinks[i].className=='c_parent') {
										var oncl = allLinks[i].getAttribute("onclick");
										if (!oncl) {
												continue;
										}
										var s = oncl.indexOf("'");
										var e = oncl.indexOf(';');
										var params = oncl.substring(s,e-1).split(',');
										eval("allLinks[i].addEventListener('click', function(event){_dct.toggle_div("+params[0]+",1);}, false);");
								}
						}
				},

				refreshComments : function () {
						var curr_threshold = _$.settings.cmnt_threshold;
						if (_$.settings.cmnt_thresh_type==2) {
								var average = _dct.getPositiveAverage();
								curr_threshold = average*_$.settings.cmnt_threshold/100;
						}

						for (var i=0; i<_dct.comments.length; i++) {
								if (_dct.comments[i].vote >= curr_threshold || (_dct.comments[i].has_img && _$.settings.cmnt_picts_always==1) ) {
										_dct.toggle_div(_dct.comments[i].parent_id, 1);
								} else {
										_dct.toggle_div(_dct.comments[i].parent_id, 22);
								}
						}

						//fire event for comment scroller
						_$.fireEvent(eventDispatcher, 'mouseup');
				},
				initCommentsArray : function () {
						_dct.comments = _dct.getElementsByClassAndTag('comment_inner', 'div');
						var vote_arr;
						_$.$c('comment', document, 'div');
						for (var i=0; i<_dct.comments.length;i++) {
								_dct.comments[i].parent_id = _dct.comments[i].parentNode.id
								vote_arr = _dct.getElementsByClassAndTag('vote_result', 'strong', _dct.comments[i]);
								if (vote_arr && vote_arr.length==1) {
										_dct.comments[i].vote = parseInt(vote_arr[0].innerHTML);
								} else {
										_dct.comments[i].vote = 0;
								}

								var images = _dct.comments[i].getElementsByTagName('img');
								if (images && images.length>0) {
										_dct.comments[i].has_img = true;
								} else {
										_dct.comments[i].has_img = false;
								}
						}
				},

				compareNumbers : function(a,b) {
						return a - b;
				},

				doOrder : function(order) {
						var last_comment;
						var prev_comment
						var big_parent = document.getElementById("js-commentsHolder");
						supressEvents = true;
						for (var i=order.length; i>0; i--) {
								last_comment = document.getElementById(order[i]);
								prev_comment = document.getElementById(order[i-1]);
								big_parent.insertBefore(prev_comment, last_comment);
						}
						supressEvents = false;
				},

				toggleCommentsOrder : function() {
						var time1 = new Date();
						var allow_reverse_list = 1;
						if (_dct.tree_order.length==0) {
								for (var i=0; i<_dct.comments.length;i++) {
										_dct.tree_order.push(_dct.comments[i].parent_id);
										_dct.list_order.push(_dct.comments[i].parent_id);
										_dct.list_reverse.push(_dct.comments[i].parent_id);
								}
								_dct.list_order.sort(_dct.compareNumbers);
								_dct.list_reverse.sort(_dct.compareNumbers);
								_dct.list_reverse.reverse();
						}

						var tree_link = document.getElementById("tree_link");
						if (_dct.comm_order==1) {
								_dct.comm_order=2;
								_dct.doOrder(_dct.list_order);
								if (allow_reverse_list == 1) {
									tree_link.innerHTML = "реверс!";
								} else {
									tree_link.innerHTML = "деревом!";
								}
						}
						else if(allow_reverse_list == 1 && _dct.comm_order==2) {
								_dct.comm_order=3;
								_dct.doOrder(_dct.list_reverse);
								tree_link.innerHTML = "деревом!";
						} else {
								_dct.comm_order=1;
								_dct.doOrder(_dct.tree_order);
								tree_link.innerHTML = "списком!";
						}
						//fire event for comment scroller
						_$.fireEvent(eventDispatcher, 'mousedown');
						addBenchmark( time1, 'Comments order changed');
				},

				addTreeLinearLink : function() {
						var div_to_insert;
						if (_dct.isPostPage) {
								div_to_insert = _dct.getElementsByClassAndTag("comments_header_controls_inner","div");
						} else {
								div_to_insert = _dct.getElementsByClassAndTag("inbox_header", "div");
						}
						div_to_insert = div_to_insert[0];
						//<A HREF="javascript:top.frames[0].toggleNode('<?php print(("".($app_id * 10)."_".$function_id));?>')" ID="fun_<?=$function_id?>1"><?php print($function_name);?></A>
						var tree_link = document.createElement("a");
						tree_link.id = "tree_link";
						tree_link.href = "javascript:void(0);";
						//tree_link.href = "javascript:_dct.toggleCommentsOrder();";

						tree_link.innerHTML = "списком!";
						tree_link.className = "dashed comments_header_refresh_comments";

						if (navigator.appName == "Opera") {
								tree_link.onclick = function(){_dct.toggleCommentsOrder()};
						} else {
								tree_link.addEventListener('click', _dct.toggleCommentsOrder, false);
						}
						var space_link = document.createElement("a");
						div_to_insert.appendChild(space_link);
						space_link.innerHTML = "&nbsp;&nbsp;";
						div_to_insert.appendChild(tree_link);
				},

				isPostCommentsPage : function () {
						if (document.getElementById("comments-threshold")) {
								return true;
						} else {
								return false;
						}
				},

				isInboxCommentsPage : function () {
						if (document.getElementById("js-inbox_people_list")) {
								return true;
						} else {
								return false;
						}
				},

				workPlease : function () {
						_dct.isInboxPage = _dct.isInboxCommentsPage();
						if (_dct.isInboxPage && _$.settings.comments_order!='1') return;
						_dct.isPostPage = _dct.isPostCommentsPage();
						if (!_dct.isInboxPage && !_dct.isPostPage) return;

						_dct.initCommentsArray();
						if (_$.settings.comments_order=='1') _dct.addTreeLinearLink();

						if (_dct.isPostPage && _$.settings.comments_threshold=='1') {
								_dct.replaceSelect();
								_dct.replaceParentLinks();
								_dct.onChangeThreshold();
						}
				}
		}
		_dct.workPlease();
		addBenchmark( time1, 'comments threshhold' );
	}

	//post threshold
	if(_$.settings.posts_threshold=='1')
	{
		var time1 = new Date();
		var _dpt = {
				posts : [],
				curr_select_numb : 0,

				toggle_div  : function(name,param){
						if(param) document.getElementById(name).style.display = (param==1)?'block':'none';
						else document.getElementById(name).style.display = (document.getElementById(name).style.display=='none')?'block':'none';
				},

				getElementsByClassAndTag : function(name, tag, obj) {
						var obj = obj||document;
						var result = new Array();
						var allElements = obj.getElementsByTagName(tag);
						for(var i=0; i<allElements.length; i++){
								if(allElements[i].className && allElements[i].className==name){
										result[result.length] = allElements[i];
								}
						}
						return result;
				},


				getIntFromPrompt : function(msg, curr_val, allow_0) {
					 var result = prompt(msg, curr_val)
					 if (result==null) {
								return false;
					 }

					 if (!result) {
								alert('Имело смысл что-нибудь ввести!');
								return false;
					 }

					 result = parseInt(result);
					 if (isNaN(result)) {
								alert('Невнятное число!');
								return false;
					 }
					 return result;
				},

				onChangeThreshold : function() {
						var new_sel = document.getElementById('thres_select_'+_dpt.curr_select_numb);

						if (new_sel.value == 'set_step') {
								var result = _dpt.getIntFromPrompt("Новое значение шага:", _$.settings.thresh_step)
								if (result) {
										_$.settings.thresh_step = result;
								}
								new_sel.options[0].selected = true;
								_dpt.replaceSelect();
						} else if (new_sel.value == 'set_comm_tresh') {
								var result = _dpt.getIntFromPrompt("Минимальное количество комментариев\n(ноль для выключения этой опции):", _$.settings.thresh_comm_count)
								if (result!==false) {
										if (result<0) {
												result = 0;
										}
										_$.settings.thresh_comm_count = result;
								}
								new_sel.options[0].selected = true;
								_dpt.replaceSelect();
						} else if (new_sel.value == 'set_opt_count') {
								var result = _dpt.getIntFromPrompt("Количество опций:", _$.settings.opt_count)
								if (result!==false) {
										if (result<=0) {
												result = 1;
										}
										_$.settings.opt_count = result;
								}
								new_sel.options[0].selected = true;
								_dpt.replaceSelect();
						} else {
								_$.settings.threshold = new_sel.value;
						}
						_$.set_save( null, 0);
						_dpt.refreshPosts();
				},

				onSortChks : function (check) {
						if (navigator.appName != "Opera") {
								check = this;
						}
						if (_$.settings.post_content_filter_layout!='1')
						{
							eval("_$.settings."+check.id+" = (check.checked?1:0);");
						}
						else
						{
							if (eval("_$.settings."+check.id) == 1)
							{
								eval("_$.settings."+check.id+"=0;");
								check.style.fontWeight = "normal";
							}
							else
							{
								eval("_$.settings."+check.id+"=1;");
								check.style.fontWeight = "bold";
							}
						}
						_$.set_save( null, 0);
						_dpt.refreshPosts();
				},

				addSortChks : function () {
						div_to_insert = _dpt.getElementsByClassAndTag('threshold_other_inner', 'div');
						div_to_insert = div_to_insert[0];
						var chcks = ['show_posts', 'show_photo', 'show_video', 'show_audio'];
						var names = ['Посты', 'Фото', 'Видео', 'Аудио'];
						if (_$.settings.post_content_filter_layout!='1') {
							for (var i=0; i<chcks.length; i++) {
								var temp_chk = document.createElement("input");
								temp_chk.type='checkbox';
								temp_chk.id=chcks[i];
								if (navigator.appName == "Opera") {
										temp_chk.onclick=function(){_dpt.onSortChks(this);};
								} else {
										temp_chk.addEventListener('click', _dpt.onSortChks, false);
								}

								temp_chk.checked = (eval("_$.settings."+chcks[i]) == 1);
								var temp_link = document.createElement("a");
								temp_link.innerHTML ='<label for="'+chcks[i]+'">'+names[i]+'</label>';
								div_to_insert.appendChild(temp_chk);
								div_to_insert.appendChild(temp_link);
							}
						} else {
							for (var i=0; i<chcks.length; i++) {
								var temp_link=document.createElement("a");
								temp_link.id=chcks[i];
								if (navigator.appName == "Opera") {
										temp_link.onclick=function(){_dpt.onSortChks(this);};
								} else {
										temp_link.addEventListener('click', _dpt.onSortChks, false);
								}

								temp_link.href ="javascript:void(0)";
								temp_link.innerHTML = names[i];
								if (eval("_$.settings."+chcks[i]) == 1) {
									temp_link.style.fontWeight = "bold"
								}

								var span = document.createElement("span");
								span.innerHTML = "&nbsp;"
								div_to_insert.appendChild(temp_link);
								div_to_insert.appendChild(span);
							}
						}
				},

				replaceSelect : function () {
						var thresh_suffix = " голосов";
						var all_posts_title = "Все посты";
						var operand_name = " и ";
						if (_$.settings.posts_threshold_use_or=='1')
						{
							operand_name = " или ";
						}

						if (_$.settings.thresh_comm_count > 0 )
						{
								thresh_suffix += operand_name+_$.settings.thresh_comm_count+" комментариев";
								all_posts_title += ", у которых >"+_$.settings.thresh_comm_count+" комментариев";
						}

						if (_dpt.curr_select_numb==0) {
								curr_select_node_id = 'posts-threshold'
						} else {
								curr_select_node_id = 'div_select_'+_dpt.curr_select_numb;
						}
						_dpt.curr_select_numb++;
						var curr_sel_node = document.getElementById(curr_select_node_id);
						var new_sel = document.createElement("SELECT");

						if (navigator.appName == "Opera") {
								new_sel.className = "hidden";
								new_sel.onchange = function(){_dpt.onChangeThreshold()};
						} else {
								new_sel.addEventListener('change', _dpt.onChangeThreshold, false);
						}
						new_sel.length = 4+_$.settings.opt_count;
						new_sel.name='thres_select_'+_dpt.curr_select_numb;
						new_sel.id='thres_select_'+_dpt.curr_select_numb;
						new_sel.options[0].text = all_posts_title;
						new_sel.options[0].value = "-1000";
						var selected = false;
						for (var i=1; i<=_$.settings.opt_count; i++) {
								new_sel.options[i].text = "Больше "+(_$.settings.thresh_step*i)+thresh_suffix;
								new_sel.options[i].value = _$.settings.thresh_step*i;

								if (_$.settings.threshold == _$.settings.thresh_step*i) {
										new_sel.options[i].selected = true;
										selected = true;
								}
						}

						if (!selected) {
								new_sel.options[0].selected = true;
						}
						new_sel.options[_$.settings.opt_count+1].text = 'Число комментариев...';
						new_sel.options[_$.settings.opt_count+1].value = 'set_comm_tresh';
						new_sel.options[_$.settings.opt_count+2].text = "Сменить шаг...";
						new_sel.options[_$.settings.opt_count+2].value = "set_step";
						new_sel.options[_$.settings.opt_count+3].text = "Число опций...";
						new_sel.options[_$.settings.opt_count+3].value = "set_opt_count";

						var new_div = document.createElement("FORM");
						new_div.name='div_select_'+_dpt.curr_select_numb;
						new_div.id='div_select_'+_dpt.curr_select_numb;
						new_div.appendChild(new_sel);

						curr_sel_node.parentNode.replaceChild(new_div, curr_sel_node);
						if (navigator.appName == "Opera") {
								new futuSelect('thres_select_'+_dpt.curr_select_numb);
						}
				},

				refreshPosts : function() {
						for (var i=0; i<_dpt.posts.length; i++) {
								// pre-filtering by type
								if ( (_dpt.posts[i].is_post && _$.settings.show_posts=='0')
										|| (_dpt.posts[i].is_video && _$.settings.show_video=='0')
										|| (_dpt.posts[i].is_img && _$.settings.show_photo=='0')
										|| (_dpt.posts[i].is_audio && _$.settings.show_audio=='0')
										)
								{
										_dpt.toggle_div(_dpt.posts[i].id, 2);
										continue;
								}

								if (_$.settings.posts_threshold_use_or=='1') {
									if ( (_$.settings.thresh_comm_count>0 && _dpt.posts[i].comm_count>=_$.settings.thresh_comm_count)
										|| _dpt.posts[i].vote >= _$.settings.threshold)
									{
										_dpt.toggle_div(_dpt.posts[i].id, 1);
									} else {
										_dpt.toggle_div(_dpt.posts[i].id, 2);
									}
								} else {
									if (_dpt.posts[i].vote < _$.settings.threshold) {
											_dpt.toggle_div(_dpt.posts[i].id, 2);
									} else if (_$.settings.thresh_comm_count>0 && _dpt.posts[i].comm_count<_$.settings.thresh_comm_count) {
											_dpt.toggle_div(_dpt.posts[i].id, 2);
									} else {
											_dpt.toggle_div(_dpt.posts[i].id, 1);
									}
								}
						}
						//fire event for comment scroller
						_$.fireEvent(eventDispatcher, 'mouseup');
				},

				checkMainPage : function () {
						if (document.getElementById("posts-threshold")) {
								return true;
						} else {
								return false;
						}
				},

				initPostsArray : function () {
						var status_div = null;
						var post_links = null;
						var posts_usual = _dpt.getElementsByClassAndTag('post ord', 'div');
						var posts_golden = _dpt.getElementsByClassAndTag('post golden ord', 'div');
						_dpt.posts = posts_usual.concat(posts_golden);
						for (var i=0; i<_dpt.posts.length;i++) {
								var vote_arr = _dpt.getElementsByClassAndTag('vote_result', 'strong', _dpt.posts[i]);
								if (vote_arr && vote_arr.length==1) {
										_dpt.posts[i].vote = parseInt(vote_arr[0].innerHTML);
								} else {
										_dpt.posts[i].vote = 0;
								}

								// comments count
								status_div = _dpt.getElementsByClassAndTag('dd', 'div', _dpt.posts[i]);
								post_links = status_div[0].getElementsByTagName('a');
								_dpt.posts[i].comm_count = parseInt(post_links[2].innerHTML);
								if (isNaN(_dpt.posts[i].comm_count)) {
										_dpt.posts[i].comm_count = 0;
								}

								_dpt.posts[i].is_img = false;
								_dpt.posts[i].is_video = false;
								_dpt.posts[i].show_audio = false;
								_dpt.posts[i].is_post = true;

								// is video
								var videos = _dpt.getElementsByClassAndTag('post_video', 'div', _dpt.posts[i]);
								if (videos && videos.length>0) {
										_dpt.posts[i].is_video = true;
										_dpt.posts[i].is_post = false;
										continue;
								}

								// is image
								var images = _dpt.posts[i].getElementsByTagName('img');
								if (images && images.length>0) {
										_dpt.posts[i].is_img = true;
										_dpt.posts[i].is_post = false;
										continue;
								}

								// is audio - not yet implemented
								var audios = _dpt.posts[i].getElementsByTagName('embed');
								if (audios && audios.length>0) {
										_dpt.posts[i].is_audio = true;
										_dpt.posts[i].is_post = false;
										continue;
								}
						}
				},

				workPlease : function () {
						if (_dpt.checkMainPage()) {
								if(_$.settings.own_threshold=='1'){
									//part from Stasik0
									//set default selector to show needed posts
									if(_$.getUsername()!="" && _$.$('js-select_threshold_posts_rate')){
										if(_$.settings.threshold >= 250){
											if(_$.$('js-select_threshold_posts_rate').value != "best"){
												_$.$('js-select_threshold_posts_rate').value = "best";
												_$.$('posts-threshold').submit();
											}
										}else if(_$.settings.threshold >= 25){
											if(_$.$('js-select_threshold_posts_rate').value != "good"){
												_$.$('js-select_threshold_posts_rate').value = "good";
												_$.$('posts-threshold').submit();
											}
										}else{
											if(_$.$('js-select_threshold_posts_rate').value != "all"){
												_$.$('js-select_threshold_posts_rate').value = "all";
												_$.$('posts-threshold').submit();
											}
										}
									}
								}

								_dpt.replaceSelect();
								_dpt.initPostsArray();
								_dpt.addSortChks();
								_dpt.onChangeThreshold();
						}
				}
		}

		_dpt.workPlease();
		addBenchmark( time1, 'posts threshhold' );
	}

	//SHARED PART of read-button and new comment scroller
	if(_$.settings.read_button=='1' || _$.settings.comment_scroller=='1')
	{
		var time1 = new Date();

		function removeFromArray(arr, elem){
			var re = Array();
			for(var i=0;i<arr.length;i++){
				if(arr[i]!=elem)re.push(arr[i]);
			}
			return re;
		}

		//shared between read comments-button and scroller
		var comments = _$.$c('comment', document, 'div');
		var posts = _$.$c('post', document, 'div');
		var allPostsArr;
		if(comments.length > 0){
			allPostsArr = comments;
			var newPosts = _$.$c('new', document, 'div');
			var mine = _$.$c('mine', document, 'div');
			var allPosts = comments.length;
		}else{
			posts = posts;
			allPostsArr = posts;
			var newPosts = Array();
			var mine = Array();
			var allPosts = posts.length;
			var suffix = '<a href="/user/'+_$.getUsername();
		}
		//add read button and populate mine and newPosts
		for(var i=0;i<allPostsArr.length;i++){
			//inner = _$.$c('dd',allPostsArr[i],'div')[0];
			//opts by Stasik upper path is now hard-coded
			inner = allPostsArr[i].childNodes[3];
			if(inner == null)continue;
			ownComment = false;
			var html = inner.innerHTML;
			if(html.indexOf('Написал '+suffix) > -1 || html.indexOf('Написала '+suffix) > -1 || html.indexOf('Забанил '+suffix) > -1 || html.indexOf('Забанила '+suffix) > -1) ownComment = true;
			//if(html.match(/href="\/(comments|my\/inbox)\/([0-9]+)#new">/g) != null)
			if(html.indexOf('#new') > -1)
			{
				newPosts.push(allPostsArr[i]);
				//Add read comments - button
				if(_$.settings.read_button=='1')
				{
					var newLink = (location.pathname.indexOf('/banned')==0)?_$.$t('a',inner)[2]:_$.$t('a',inner)[3];
					id = newLink.href;
					link = document.createElement("a");
					link.setAttribute("href", "#");
					link.setAttribute("style", "margin-left:5px; display:inline-block; text-decoration:none");
					link.setAttribute("title", "Пометить комментарии как прочтённые");
					if(ownComment)link.setAttribute("own", "true");
					link.setAttribute("pos", i);
					link.setAttribute("posId", id);
					link.innerHTML = "<strong>[x]</strong>";
					_$.insertAfter(newLink, link);

					_$.addEvent(link, 'click', function(e){
						if(this.getAttribute("href")==""){e.preventDefault();return false;}
						pos = this.getAttribute('pos');
						id = this.getAttribute('posId');
						//
						if(_$.settings.comment_scroller=='1'){
							newPosts = removeFromArray(newPosts, allPostsArr[pos]);
							if(this.getAttribute('own')=="true")mine = removeFromArray(mine, allPostsArr[pos]);
							onScroll();
						}
						//												
						this.setAttribute("href", "");
						this.innerHTML = '<img src="http://pit.dirty.ru/dirty/1/2010/10/25/28281-184741-b29db745feb47786dade8a8e50c4f461.gif" style="border:0px;"/>';
						//parent.innerHTML = parent.innerHTML.replace(/ \/ <a(.+)<\/a>/,"");
						_$.ajaxLoad(id,function(){
							//hide post
								if(_$.$('inboxunread') != null && _$.$('inboxunread').checked){
								this.parentNode.parentNode.parentNode.setAttribute("style","display:none;");
							}
							//hide link
							this.parentNode.innerHTML = this.parentNode.innerHTML.replace(/ \/ <a(.+)<\/a><a(.+)<\/a>/,"");
						},this,this);

						e.preventDefault();
						return false;
					});
				}
			}
			if(ownComment == true){
				mine.push(allPostsArr[i]);
			}
		}

		//new comment scroller
		if(_$.settings.comment_scroller=='1' && location.pathname.indexOf('/write/')==-1 && location.pathname.indexOf('/user')==-1){
			function documentChanged(event) {
				if (supressEvents) {
					return;
				}
				if(event.target.className != null && event.target.className.indexOf("comment")>-1){
					recountComments();
				}
			}

			function removeFromArray(arr, elem){
				var re = Array();
				for(var i=0;i<arr.length;i++){
					if(arr[i]!=elem)re.push(arr[i]);
				}
				return re;
			}

			function my(){
				if(mine.length > 0){
					scrollToMiddle(mine[minePos]);
					minePos = (minePos+1)%mine.length;
				}
			}

			function next(){
				if(newPosts.length > 0 && newPos < newPosts.length-1 && autoScroll){
					newPos++;
				}
				if(newPosts.length > 0 )scrollToMiddle(newPosts[newPos]);
				//if(_$.$('down').innerHTML=="0" && _$.$('js-footer')!==null){
				//	smoothScroll(_$.element_position(_$.$('js-footer')).y);
				//};
			}

			function prev(){
				if(newPosts.length > 0 && newPos > 0){
					if(newPos > 1 && !autoScroll)newPos--;
					newPos--;
				}
				if(newPosts.length > 0 )scrollToMiddle(newPosts[newPos]);
			}

			function getId(elem) {
				prefix = "omgwtf";
				if(elem.id)return elem.id;
				tempId++;
				elem.id = prefix+tempId;
				return prefix+tempId;
			}

			function scrollToMiddle(elem){
				if(elem == null)return;
				recolor = _$.$c("comment_inner", elem, "div")[0];
				if(recolor == null){
					recolor = elem;
				}

				if(recolor.style.borderColor != "#fff48d"){
					//recolor.style.borderColor = recolor.style.backgroundColor;
					recolor.setAttribute("oldColor", recolor.style.backgroundColor);
					//window.setTimeout("var el = document.getElementById('"+getId(recolor)+"'); el.style.backgroundColor = el.getAttribute('oldColor'); el.setAttribute('oldColor', '');", 650);
					//Rehacked by Stasik0 on 11.05.12
					//https://github.com/greasemonkey/greasemonkey/issues/1552
					//changed setTimeout to setInterval
					recolor.setAttribute("data-timeoutID", window.setInterval("var el = document.getElementById('"+getId(recolor)+"'); el.style.backgroundColor = el.getAttribute('oldColor'); el.removeAttribute('oldColor'); clearInterval(el.getAttribute('data-timeoutID')); el.removeAttribute('data-timeoutID');", 650));
					recolor.style.backgroundColor = "#fff48d";
				}
				var middle = _$.element_position(elem).y + Math.round(elem.clientHeight/2) - Math.round(_$.viewarea_size().y/2);
				//
				if(_$.settings.smooth_scroll=='1'){
					smoothScroll(middle);
				}else{
					var x = _$.current_scroll().x;
					_$.scroll_position(middle, x);
				}
				//
			}

			function smoothScroll ( y ) {
				var oldScroll = autoScroll;
				autoScroll = true;
				gScrollDestination = y;
				if(!oldScroll){scrollDeamon();}
			}

			function scrollDeamon(){
				this.x = _$.current_scroll().x;
				this.start = _$.scroll_position().y;

				this.distance = gScrollDestination - this.start;
				if(gScrollDestination == null){
					autoScroll = false;
					onScroll();
					return;
				}

				if(lastDistance != "none"){
					if(lastDistance == this.distance){
						autoScroll = false;
						lastDistance = "none";
						onScroll();
						return;
					}
				}
				lastDistance = this.distance;
				if ( Math.abs(this.distance) < 5 ) {
					_$.scroll_position(gScrollDestination, x);
					lastDistance = "none";
					autoScroll = false;
					onScroll();
					return;
				}

				_$.scroll_position(this.start + Math.round(this.distance/4.5), x);
				window.setTimeout(scrollDeamon, 30);
			}


			function disableSelection(target){
				if (typeof target.onselectstart!="undefined") //IE route

						target.onselectstart=function(){return false}

				else if (typeof target.style.MozUserSelect!="undefined") //Firefox route

						target.style.MozUserSelect="none"

				else //All other route (ie: Opera)

						target.onmousedown=function(){return false}

			}

			function scanVisible(array){
				var newArray = Array();
				for(var i=0;i<array.length;i++){
					if(array[i].style.display != "none"){
						newArray.push(array[i]);
					}
				}
				return newArray;
			}

			function setInnerText(elem, text){
				if(elem==null)return;
				var hasInnerText = (_$.$t('body')[0].innerText != undefined) ? true : false;
				if(!hasInnerText){
					elem.textContent = text;
				} else{
					elem.innerText = text;
				}
			}

			function onScroll(){
				if(autoScroll)return '';
				var current = _$.current_scroll();
				if(newPosts.length >= 0){
				var pre = 0;
				var post = newPosts.length;
				for(var i=0;i<newPosts.length;i++){
					if(_$.element_position(newPosts[i]).y - Math.round(_$.viewarea_size().y/2) <= current.y + 2){
						pre++;
						post--;
					}else{
						break;
					}
				}
				newPos = pre;
				setInnerText(_$.$('up'), pre);
				setInnerText(_$.$('down'), post);
				}
				if(mine.length >= 0){
					for(var i=0;i<mine.length;i++){
						if(_$.element_position(mine[i]).y - Math.round(_$.viewarea_size().y/2) <= current.y + 2){
						}else{
							break;
						}
					}
					minePos = i%mine.length;
					setInnerText(_$.$('mine'), mine.length-i);
				}
			}
			function recountComments(){
				backup_allPostsArr = _$.$c('comment', document, 'div');
				backup_newPosts = _$.$c('new', document, 'div');
				backup_mine = _$.$c('mine', document, 'div');
				allPosts = backup_allPostsArr.length;
				recountVisible();
			}
			function recountVisible(){
				allPostsArr = scanVisible(backup_allPostsArr);
				newPosts = scanVisible(backup_newPosts);
				mine = scanVisible(backup_mine);
				allPosts = allPostsArr.length
				//update scroller items
				onScroll();
			};

			//freshly added stuff to work with BearOff's scripts. Мама, прости меня за этот код.
			//do a backup
			var backup_allPostsArr = allPostsArr;
			var backup_newPosts = newPosts;
			var backup_mine = mine;
			var newPos = 0;
			var newCount = newPosts.length;
			var autoScroll = false;
			var minePos = 0;
			var tempId = 0;
			var gScrollDestination = 0;
			var lastDistance = "none";

			//controls
			//consider visible stuff
			recountVisible();

			//handle new ajax-generated content
			_$.addEvent(document,"DOMNodeInserted", documentChanged);

			var newdiv = document.createElement('div');
			newdiv.style.position = "fixed";
			newdiv.style.top = "50%";
			newdiv.style.marginTop = "-72px";
			newdiv.style.right = "1px";
			newdiv.style.zIndex = "100";
			var temp = "";
			temp += '<div id="home" style="height:36px; width:36px; color:#999999; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/30/28281-204632-bb73ad97827cd6adc734021bf511df3b.png); cursor: pointer; cursor: hand; text-align:center;"></div>';
			temp += '<div id="up" style="height:22px; width:24px; color:#999999; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/30/28281-204624-e6ddb7dc3df674a675eb1342db0b529a.png); cursor: pointer; cursor: hand; text-align:center; padding: 14px 0px 0px 12px;">0</div>';
			temp += '<div id="mine" style="height:22px; width:24px; color:#999999; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/30/28281-205202-7f74bf0a90bf664faa43d98952774908.png); cursor: pointer; cursor: hand; text-align:center; padding: 14px 0px 0px 12px;">'+mine.length+'</div>';
			temp += '<div id="down" style="height:22px; width:24px; color:#999999; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/30/28281-205411-ceb943a765914621d0558fed8e5c5400.png); cursor: pointer; cursor: hand; text-align:center; padding: 14px 0px 0px 12px;">'+newPosts.length+'</div>';
			newdiv.innerHTML = temp;
			document.body.insertBefore(newdiv, document.body.firstChild);

			disableSelection(_$.$('mine'));
			disableSelection(_$.$('up'));
			disableSelection(_$.$('down'));

			_$.addEvent(_$.$('home'), 'click', function(){if(_$.settings.smooth_scroll=='1'){smoothScroll(0);}else{window.scrollTo(_$.current_scroll().x,0);}});
			_$.addEvent(_$.$('up'), 'click', prev);
			_$.addEvent(_$.$('down'), 'click', next);
			_$.addEvent(_$.$('mine'), 'click', my);
			_$.addEvent(window, 'scroll', onScroll);
			onScroll();

			//stuff to make BearOff happy
			_$.addEvent(eventDispatcher, 'mouseup', recountVisible);
			_$.addEvent(eventDispatcher, 'mousedown', recountComments);

			//add onload event to show new comments correctly
			if(document.location.href.indexOf('#new')>-1 && newPosts.length>0){
				//scrollToMiddle(newPosts[0]);
				//document.location.href = document.location.href;
				_$.scroll_position(_$.element_position(newPosts[0]).y, _$.current_scroll().x);
			}

		}
		addBenchmark( time1, 'comments scroll & read button' );
	}

	//quotes
	if(_$.settings.quotes=='1' && location.pathname.indexOf('/comments')>-1)
	{
		var time1 = new Date();
		var commentsHolder = document.getElementById('js-commentsHolder');
		var allBodies = commentsHolder.querySelectorAll('div.c_body');
		var allUsers = commentsHolder.querySelectorAll('a.c_user');
		for (var key = 0; key < allBodies.length; key++)
		{
			var c_inner = allBodies[key].innerHTML;
			c_inner = c_inner.replace('&','amp');
			c_inner = c_inner.replace("'",'');
			c_inner = c_inner.replace('"','');
			var link = document.createElement('a');
			link.setAttribute('href', 'http://quotes-dirty.ru/write?username='+encodeURI( allUsers[key].innerHTML )+'&text='+encodeURI(c_inner));
			link.setAttribute('target', '_blank');
			link.setAttribute('class', 'c_answer');
			link.setAttribute('style', 'margin-left: 10px;');
			link.innerHTML = "в цитатник";
			allUsers[key].parentNode.appendChild(link);
		}
		addBenchmark( time1, 'quotes' );
	}



	// made by crea7or
	// start of dirty avatar
	if(_$.settings.dirty_avatar == '1' && location.pathname.indexOf('/user/') > -1 )
	{
		var time1 = new Date();
		var divWithAvatar = document.querySelector('div.userstory')
		var avatarImg = null;
		if ( divWithAvatar )
		{
			var imgArray = divWithAvatar.getElementsByTagName('img');
			var altAttr;
			for ( index = 0; index < imgArray.length; index++ )
			{
				altAttr = imgArray[index].getAttribute('alt');
				if ( altAttr != null )
				{
					if ( altAttr.toLowerCase().indexOf('dirty avatar') > -1 )
					{
						avatarImg = imgArray[index];
						break;
					}
				}
			}
		}
		if ( avatarImg != null )
		{
			var tableWehereAvatar = document.querySelector('table.userpic')
			var tdWehereAvatar = null;
			if ( tableWehereAvatar != null )
			{
				tdWehereAvatar = tableWehereAvatar.getElementsByTagName('td')[0];
			}
			if ( tdWehereAvatar != null )
			{
				tdWehereAvatar.innerHTML = "<img src=\"" + avatarImg.getAttribute('src') + "\">";
			}
		}
		addBenchmark( time1, 'dirty avatar' );
	}
	// end of dirty avatar


	// made by crea7or
	// start of instant search in comments
	if (_$.settings.instant_search == '1' )
	{
		function commentsFilter()
		{
			var inputBox = document.getElementById('js-search-in-comments');
			var currentCommentId;
			var currentCommentBody;
			var currentCommentBodyText;
			var currentCommentHeader;
			var commentUserNameA;
			var hideShowLink;
			var newLinkToShowHide;
			var spaceSpan;
			var commentsHolder = document.getElementById('js-commentsHolder');
			for (var indexOfComment = 0; indexOfComment < commentsHolder.childNodes.length; indexOfComment++)
			{
				if (commentsHolder.childNodes[indexOfComment].nodeName == 'DIV')
				{
					currentCommentId = commentsHolder.childNodes[indexOfComment].getAttribute('id');
					currentCommentBody = commentsHolder.childNodes[indexOfComment].childNodes[1].childNodes[1];
					currentCommentBodyText = currentCommentBody.innerHTML;
					currentCommentHeader = commentsHolder.childNodes[indexOfComment].childNodes[1].childNodes[3];
					commentUserNameA = currentCommentHeader.querySelector('a.c_user');
					if (commentUserNameA)
					{
						currentCommentBodyText += " " + commentUserNameA.innerHTML;
					}
					currentCommentBody.setAttribute('id', currentCommentId + '-sh-body');
					currentCommentHeader.setAttribute('id', currentCommentId + '-sh-header');
					if (currentCommentBodyText.search(new RegExp((inputBox.value + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1"), 'ig')) > -1)
					{
						hideShowLink = currentCommentHeader.getElementById(currentCommentId + '-sh');
						if (hideShowLink)
						{
							commentShowHide(currentCommentId, true);
						}
					}
					else
					{
						hideShowLink = currentCommentHeader.getElementById(currentCommentId + '-sh');
						if (hideShowLink == null)
						{
							spaceSpan = document.createElement('span');
							spaceSpan.innerHTML = "&nbsp;&nbsp";
							currentCommentHeader.appendChild(spaceSpan);
							newLinkToShowHide = document.createElement('a');
							newLinkToShowHide.setAttribute('href', '#');
							newLinkToShowHide.setAttribute('id', currentCommentId + '-sh');
							currentCommentHeader.appendChild(newLinkToShowHide);
						}
						commentShowHide(currentCommentId, false);
					}

				}
			}
			return false;
		}

		function commentShowHide(commentId, showIfTrue)
		{
			var commentDiv = document.getElementById(commentId + '-sh-body');
			var commentDivHeader = document.getElementById(commentId + '-sh-header');
			if (commentDiv)
			{
				if (showIfTrue)
				{
					if (instant_search_hide)
					{
						commentDivHeader.parentNode.removeAttribute('style');
					}
					else
					{
						commentDiv.removeAttribute('style');
						commentDivHeader.removeAttribute('style');
					}
					var commentAlink = document.getElementById(commentId + '-sh');
					if (commentAlink)
					{
						commentAlink.setAttribute('onclick', "return commentShowHide('" + commentId + "', false );")
						commentAlink.innerHTML = 'убрать это';
					}
				}
				else
				{
					if (instant_search_hide)
					{
						commentDivHeader.parentNode.setAttribute('style', 'display: none');
					}
					else
					{
						commentDiv.setAttribute('style', 'display: none');
						commentDivHeader.setAttribute('style', 'opacity: 0.5');
					}
					var commentAlink = document.getElementById(commentId + '-sh');
					if (commentAlink)
					{
						commentAlink.setAttribute('onclick', "return commentShowHide('" + commentId + "', true );")
						commentAlink.innerHTML = 'а что там?';
					}
				}
			}
			return false;
		}

		var time1 = new Date();
		var headerDiv = null;
		var insertOurHeaderAfter = null;
		var postPage = false;
		if (document.location.href.indexOf("/comments/") >= 0)
		{
			var commentsHolder = document.getElementById('js-comments');
			if (commentsHolder)
			{
				postPage = true;
				headerDiv = document.querySelector('div.comments_header');
				divToModifyStyle = headerDiv.querySelector('div.comments_header_threshhold');
				if (divToModifyStyle)
				{
					divToModifyStyle.setAttribute('style', 'width: 300px;');
				}
				divToModifyStyle = headerDiv.querySelector('div.comments_header_controls');
				if (divToModifyStyle)
				{
					divToModifyStyle.setAttribute('style', 'width: 30%; min-width: 300px;');
				}
				divToModifyStyle = headerDiv.querySelector('div.comments_header_threshhold_inner');
				if (divToModifyStyle)
				{
					divToModifyStyle.setAttribute('style', 'padding-left: 5px; padding-right: 5px;');
				}
				divToModifyStyle = headerDiv.querySelector('div.comments_header_controls_inner');
				if (divToModifyStyle)
				{
					divToModifyStyle.setAttribute('style', 'padding-left: 0px; margin-right: 0px; margin-left: 60px;');
				}
				insertOurHeaderAfter = headerDiv.firstChild;
			}
		}
		else if (document.location.href.indexOf("/inbox/") >= 0)
		{
			headerDiv = document.querySelector('div.inbox_header');
			if (headerDiv)
			{
				insertOurHeaderAfter = headerDiv.lastChild;
			}
		}

		if (headerDiv && insertOurHeaderAfter)
		{
			var inputElementDiv = document.createElement('div');
			if (postPage)
			{
				inputElementDiv.setAttribute('style', 'float: left; padding-left: 10px; padding-right: 5px;');
				inputElementDiv.setAttribute('class', 'comments_header_threshhold_inner');
			}
			else
			{
				inputElementDiv.setAttribute('style', 'float: left;');
			}
			var formElement = document.createElement('form');
			formElement.setAttribute('onsubmit', 'return commentsFilter();');
			var inputElementA = document.createElement('a');
			inputElementA.setAttribute('href', '#');
			inputElementA.setAttribute('onclick', 'return commentsFilter();');
			inputElementA.setAttribute('style', 'margin-left: 5px;');
			inputElementA.setAttribute('class', 'dashed');
			inputElementA.innerHTML = 'фас!';
			var inputElement = document.createElement('input');
			inputElement.setAttribute('type', 'text');
			inputElement.setAttribute('id', 'js-search-in-comments');
			inputElement.setAttribute('onchange', 'return commentsFilter();');
			inputElement.setAttribute('name', 'js-search-in-comments');
			inputElement.setAttribute('class', 'text_input js-input_default');
			formElement.appendChild(inputElement);
			formElement.appendChild(inputElementA);
			inputElementDiv.appendChild(formElement);
			headerDiv.insertBefore(inputElementDiv, insertOurHeaderAfter);
			_$.injectScript(commentsFilter + "\n" + "var instant_search_hide = " + _$.settings.instant_search_hide + ";" + "\n" + commentShowHide);
		}
		addBenchmark(time1, 'instant search');
	}
	// end of instant search in comments

    if (_$.settings.posts_spades == '1') {

    	var time1 = new Date();


        (function() {

            var d3searchUrl = "http://api.d3search.ru";

            var realWindow = (window.unsafeWindow || window);
            if (window.navigator.vendor && window.navigator.vendor.match(/Google/)) {
                //chrome hack
                var div = document.createElement("div");
                div.setAttribute("onclick", "return window;");
                realWindow = div.onclick();
            }

            var realDocument = realWindow.document;
            var crossBrowserJSObject = (realWindow.wrappedJSObject || realWindow);
            var globals = crossBrowserJSObject.globals;
            var $A = crossBrowserJSObject.$A;
            var $ = crossBrowserJSObject.$;
            var $$ = crossBrowserJSObject.$$;
            var username = $$.call(crossBrowserJSObject, ".header_tagline_inner a")[0].innerHTML;

            injectIntoVoteDetailsHandler();
            injectIntoVoteHandler();
            createSpadeButtons();

            function getSpades() {
                return {
                    DUPLICATE : {
                        name: 'Об этом уже писали'
                    },
                    BULLSHIT : {
                        name: 'Пост — тупая фигня'
                    },
                    ADVERT : {
                        name: 'Это же реклама!'
                    },
                    LIE: {
                        name: 'Это неправда'
                    },
                    DULL: {
                        name: 'Пост никакой'
                    },
                    COPYPASTE: {
                        name: 'Ctrl+C -> Ctrl+V'
                    },
                    GRAMMAR : {
                        name: 'Я люблю русский язык'
                    }
                }
            }

            function injectIntoVoteDetailsHandler() {

                var voteDetailsHandler = crossBrowserJSObject.voteDetailsHandler;
                if (!voteDetailsHandler) return;

                var voteDetailsHandlerLoadDataOriginal = voteDetailsHandler.loadData;

                voteDetailsHandler.loadData = function() {
                    var script = realDocument.createElement("script");
                    //somehow evil browsers sometimes ignore no-cache headers, maybe because this is an injected script
                    script.setAttribute('src', d3searchUrl + "/lopating/get/" + voteDetailsHandler.params.id + "?nocache=" + new Date().getTime());
                    script.addEventListener('load', function() {
                        voteDetailsHandlerLoadDataOriginal.call(voteDetailsHandler);
                    }, true);
                    realDocument.body.appendChild(script);
                };

                var voteDetailsHandlerVotesOriginal = voteDetailsHandler.countVotes;

                voteDetailsHandler.countVotes = function(response) {

                    if (voteDetailsHandler.params.type !== 'post') { //not being rude for karma or comments
                        voteDetailsHandlerVotesOriginal.call(voteDetailsHandler, response);
                        return;
                    }

                    var spadeGroups = getSpades();
                    spadeGroups.OLDFAGS = {
                        name: 'Без лопаты'
                    };
                    for (var groupId in spadeGroups) {
                        spadeGroups[groupId].persons = [];
                    }

                    $A(response.votes).each(function (person) {

                        var isSpade = false;
                        $A(voteDetailsHandler.spades).each(function(spade) { // << voteDetailsHandler.spades is set via injecting /lopating/get/<postid>
                            if (person.login === spade.login) {
                                spadeGroups[spade.spadeType].persons.push(person);
                                isSpade = true;
                            }
                        });
                        if (!isSpade) {
                            spadeGroups.OLDFAGS.persons.push(person);
                        }
                    });

                    voteDetailsHandler.groupHeaderCounter = 0; //will fix person counters
                    var first = true;
                    response.votes = [];
                    for (var group in spadeGroups) {
                        if (spadeGroups[group].persons.length > 0) {
                            if (!first) {
                                voteDetailsHandler.groupHeaderCounter++;
                                response.votes.push({spade: '&nbsp;'}); ///a silly spacer
                            } else {
                                first = false;
                            }
                            voteDetailsHandler.groupHeaderCounter++;
                            response.votes.push({spade: spadeGroups[group].name});
                            response.votes = response.votes.concat(spadeGroups[group].persons);
                        }
                    }

                    voteDetailsHandlerVotesOriginal.call(voteDetailsHandler, response);

                };

                voteDetailsHandler.groupHeaderCounter = 0; //must set zero counters for non-post vote details

                var voteDetailsHandlerSetHeadersOriginal = voteDetailsHandler.setHeaders;
                voteDetailsHandler.setHeaders = function() {
                    //fixing vote counters that were incorrect due to group headers
                    voteDetailsHandler.minusCol -= voteDetailsHandler.groupHeaderCounter;
                    voteDetailsHandlerSetHeadersOriginal.apply(this, arguments);
                };

                //ok, copy-paste, not granular enough
                voteDetailsHandler.buildCol = function (page, arr) {

                    var iHTML = '';
                    if (arr[page]) {
                        $A(arr[page]).each(function (person) {
                            if (voteDetailsHandler.params.type == 'karma') {
                                iHTML += '<li><a href="' + globals.parentSite + '/user/' + person.login + '/">' + person.login + '&nbsp;(' + person.attitude + ')' + '</a></li>';
                            } else if (person.spade) {
                                iHTML += '<li><strong>' + person.spade + '</strong></li>';
                            } else {
                                iHTML += '<li><a href="' + globals.parentSite + '/user/' + person.login + '/">' + person.login + '</a>&nbsp;(' + person.attitude + ')</li>';
                            }
                        });
                    }
                    return iHTML;

                };


                var voteDetailsHandlerBuildLayerOriginal = voteDetailsHandler.buildLayer;
                voteDetailsHandler.buildLayer = function() {
                    voteDetailsHandlerBuildLayerOriginal.apply(voteDetailsHandler, arguments);
                    //greetz from Stasik
                    $$.call(crossBrowserJSObject, voteDetailsHandler.layer).set('styles', {
                        width: "450px",
                        background: "#eeecec"
                    });
                };
            }


            function injectIntoVoteHandler() {

                var voteHandler = crossBrowserJSObject.voteHandler;
                if (!voteHandler) return;

                //copy-paste with changes
                voteHandler.realSpadeVote = function (button, target_id, token) {
                    //greetz from Stasik
                    if ($$.call(crossBrowserJSObject, button).hasClass('vote_voted')) {

                        var url = '/ratectl/';
                        var data = 'wtf=' + voteHandler.wtf + '&id=' + target_id + '&type=1&value=-1';

                        //OMG IT'S FULL OF WIN
                        //Using low-level code because mootools shit won't work in userscript sandbox in all browsers
                        var ajaxObject = null;
                        if (window.XMLHttpRequest) {
                            ajaxObject = new XMLHttpRequest();
                        } else if (window.ActiveXObject) {
                            //in fact I'm not sure if this script is used in IE anyway
                            ajaxObject = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        if (!ajaxObject) return;

                        ajaxObject.onreadystatechange = function() {
                            if (ajaxObject.readyState == 4) {
                                if (ajaxObject.status == 200) {

                                    //removing plus button highlighting
                                    button.parentNode.querySelector('.vote_button_plus').className = 'vote_button vote_button_plus';

                                    //highlighting minus button
                                    button.parentNode.querySelector('.vote_button_minus').className = 'vote_button vote_button_minus vote_voted';

                                    //committing spade transaction. token may be undefined if a user tried to change spade type directly
                                    if (token != undefined) {
                                        var script = realDocument.createElement("script");
                                        script.setAttribute('src', d3searchUrl + "/lopating/vote/" + token + "?nocache=" + new Date().getTime());
                                        script.addEventListener('load', function() {
                                            button.parentNode.className = "vote"; //kinda removing vote_over, effectively hiding vote buttons
                                        }, true);
                                        realDocument.body.appendChild(script);
                                    } else {
                                        //hide spades selector if no spade will be set
                                        button.parentNode.className = "vote";
                                    }

                                    var response = eval("(" + ajaxObject.responseText + ")");
                                    if (response.rating) {
                                        button.parentNode.querySelector('.vote_result').innerHTML = response.rating;
                                    }

                                }
                            }
                        };
                        ajaxObject.open("POST", url, true);
                        ajaxObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        ajaxObject.setRequestHeader("Content-length", data.length);
                        ajaxObject.setRequestHeader("Connection", "close");
                        ajaxObject.send(data);

                    }
                };


                voteHandler.spadeVote = function(button, targetId, spadeId) {

                    //starting spade transaction
                    var script = realDocument.createElement("script");
                    script.setAttribute('src', d3searchUrl + "/lopating/try/" + targetId + "?user=" + encodeURI(username) + "&type=" + spadeId + "&nocache=" + new Date().getTime());
                    script.addEventListener('load', function() {
                        //voting on dirty server
                        voteHandler.realSpadeVote($.call(crossBrowserJSObject, button), "p" + targetId, crossBrowserJSObject.spadeVoteToken); //token from loaded script
                    }, true);
                    realDocument.body.appendChild(script);

                };
            }

            //'http://img.dirty.ru/pics/lapata.gif'
            function createSpadeButtons() {

                //tweaking vote buttons container
                var postContainerSelector = "div[id^='p'][class^='post']";

                setStyleRule(postContainerSelector + " .vote.over", "width: 180px; height: 188px; bottom: -153px; z-index: 100;");
                setStyleRule(postContainerSelector + " .vote_button_spade", "width: 160px; padding: 0 8px 2px 20px; line-height: 20px; font-size: 10px; text-align: left;");
                setStyleRule(postContainerSelector + " .vote_button_spade_over", "background: #eee url('http://img.dirty.ru/d3/lopata.gif') no-repeat 4px 4px;");
                setStyleRule(postContainerSelector + " .vote_button_minus", "background-image: url('http://img.dirty.ru/d3/lopata.gif'); background-repeat: no-repeat; background-position: 2px 3px;");
                setStyleRule(postContainerSelector + " .vote.over .vote_button_minus", "display: none"); //hide minus button when spades selector is shown

                var spadeButton = '<a class="vote_button vote_button_spade" style="top: {shift}px;" ' +
                        'onclick="voteHandler.spadeVote(this, {postid}, \'{spade}\'); return false;" href="#">{title}</a>';

                var postContainers = realDocument.querySelectorAll(postContainerSelector);
                $A(postContainers).each(function(postContainer) {

                    var postId = postContainer.getAttribute("id").substring(1);
                    var voteContainer = postContainer.getElementsByClassName("vote")[0];

                    var minusButton = voteContainer.querySelector(".vote_button_minus");
                    if (minusButton) { //it might be no minus button for your own posts
                        minusButton.innerHTML = '';
                        var spades = getSpades(), spade, spadeIndex = 0;
                        for (var spadeId in spades) {
                            spade = spades[spadeId];
                            voteContainer.innerHTML += spadeButton.
                                    replace(/\{shift\}/g, (spadeIndex + 2) * 20).
                                    replace(/\{postid\}/g, postId).
                                    replace(/\{title\}/g, spade.name).
                                    replace(/\{spade\}/g, spadeId);
                            spadeIndex++;
                        }
                    }
                });

                var highlightMinusButton = function() {
                    //greetz from Stasik
                    $$.call(crossBrowserJSObject, this).toggleClass("vote_button_spade_over");
                };

                $$.call(crossBrowserJSObject, ".vote_button_spade").addEvent('mouseenter', highlightMinusButton);
                $$.call(crossBrowserJSObject, ".vote_button_spade").addEvent('mouseleave', highlightMinusButton);

                function setStyleRule (selector, rule) {
                    var stylesheet = document.styleSheets[(document.styleSheets.length - 1)];

                    for (var i in document.styleSheets) {
                        if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf("style.css")) {
                            stylesheet = document.styleSheets[i];
                        }
                    }

                    if (stylesheet.addRule) {
                        stylesheet.addRule(selector, rule);
                    } else if (stylesheet.insertRule) {
                        stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
                    }
                }

            }


        })();
        //
        addBenchmark(time1, 'lopatas');
    }

    if (_$.settings.d3search_quick == '1') {
    	var time1 = new Date();
    
        (function() {

            var postContainers = document.querySelectorAll("div[class^='post ']");

            for (var i = 0, searchButton; i < postContainers.length; i++) {

                searchButton = document.createElement("span");
                searchButton.title = "Поиск ссылок из этого поста на d3search.ru";
                searchButton.style.href = "#";
                searchButton.style.cursor = "pointer";
                searchButton.style.backgroundPosition = "50% 50%";
                searchButton.style.backgroundColor = "transparent";
                searchButton.style.backgroundImage = "url('http://dirty.ru/i/header_search_icon.gif')";
                searchButton.style.padding = "6px";
                searchButton.style.marginLeft = "3px";
                searchButton.style.marginRight = "3px";

                searchButton.addEventListener('click', function(postContainer) {

                    return function() {

                        //hide the button after click
                        this.parentNode.removeChild(this);

                        var hrefs = "";
                        var anchors = postContainer.querySelectorAll("div[class^='dt'] a");
                        for (var j = 0; j < anchors.length; j++) {
                            var anchor = anchors[j];
                            //skipping post link
                            if (anchor.parentNode.tagName == 'H3' && (anchor.href.indexOf("www.dirty.ru/") + anchor.href.indexOf("dirty.ru/")) >= 0) continue;
                            hrefs += "<a href=\"" + anchor.href + "\"></a>\n"
                        }

                        var thisPostId = postContainer.id.substring(1);
                        var quickSearchContainerId = "quick-search-" + thisPostId;
                        var quickSearchUrl = "http://d3search.ru/wazzup?container=" + quickSearchContainerId + "&thisPostId=" + thisPostId + "&post=" + encodeURIComponent(hrefs);

                        var quickSearchContainer = document.createElement("div");
                        quickSearchContainer.style.padding = "8px";
                        quickSearchContainer.style.borderTop = "1px solid #eee";
                        quickSearchContainer.style.backgroundColor = "#f5f5f5";

                        if (quickSearchUrl.length > 4000) {

                            quickSearchContainer.innerHTML = 'Слишком много ссылок в этом посте. Поиска не будет. Так-то.';
                            postContainer.appendChild(quickSearchContainer);

                        } else {
                            quickSearchContainer.innerHTML = 'Ищем на d3search...';
                            quickSearchContainer.setAttribute("id", quickSearchContainerId);
                            postContainer.appendChild(quickSearchContainer);

                            var injectedScript = document.createElement("script");
                            injectedScript.src = quickSearchUrl;
                            document.body.appendChild(injectedScript);
                        }

                    };

                }(postContainers[i]), false);

                //inserting the button next to post icon
                var nextToIconContainer = postContainers[i].querySelector(".c_icon").nextSibling;
                nextToIconContainer.parentNode.insertBefore(searchButton, nextToIconContainer);

            }

        })()

        addBenchmark(time1, 'instant d3 search');
    
    }

}

var time1 = new Date();
_$.tooltip.init();
addBenchmark( time1, 'tooltop init' );

DSP_init();
//Stasik: now turn on event handlers
supressEvents = false;

}

addBenchmark( dateToCheck1, 'grand total' );
