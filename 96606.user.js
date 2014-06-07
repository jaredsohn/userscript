//
// ==UserScript==
// @name			Lepra Service Pack 0.992
// @author			crea7or, Stasik0, BearOff, flashface, slavka123
// @namespace		http://leprosorium.ru/
// @description		Lepra Service Pack 1 (based on Dirty Service Pack 2.5 )
// @require			http://crea7or.spb.ru/scripts/user.js.updater.php?id=96606&days=7
// @include			http://*.leprosorium.ru/*
// @include			http://leprosorium.ru/*
// @version         0.992
// @run-at			document-end
// ==/UserScript==

var dateToCheck1 = new Date();

var _$ = {
    settings: {},
    settings_colors: new Array(),
    location: window.location.href.split(window.location.host)[1],

    set_save: function(name, option)
    {
        if (name != null)
        {
            _$.settings[name] = option;
        }
        localStorage.setItem('dirtySp', jsonStringify(_$.settings));
    },
    set_get: function()
    {
        _$.settings = jsonParse(localStorGetItem('dirtySp', "{}"));
    },
    browser: function()
    {
        var string = navigator.userAgent.toLowerCase();
        var params = null;

        if (string.indexOf('opera/') > -1)
            params = { name: 'opera', ver: string.split('opera/')[1].split(' ')[0] };

        else if (string.indexOf('firefox/') > -1)
            params = { name: 'firefox', ver: string.split('firefox/')[1].split(' ')[0] };

        else if (string.indexOf('chrome/') > -1)
            params = { name: 'chrome', ver: string.split('chrome/')[1].split(' ')[0] };

        else if (string.indexOf('safari/') > -1)
            params = { name: 'safari', ver: string.split('safari/')[1].split(' ')[0] };

        else if (string.indexOf('msie ') > -1)
            params = { name: 'ie', ver: string.split('msie ')[1].split(' ')[0] };

        else params = { name: 'unknown', ver: 'unknown' };

        return params;
    },

    $: function(id)
    {

        return document.getElementById(id);
    },

    $t: function(name, obj)
    {
        var obj = obj || document;
        return obj.getElementsByTagName(name);
    },

    $c: function(name, obj, tagName)
    {
        var obj = obj || document;
        if (tagName == null)
        {
            return obj.querySelectorAll('*.' + name);
        }
        else
        {
            return obj.querySelectorAll(tagName + '.' + name);
        }
    },

    $f: function(name, element, val)
    {
        var element = element || false;
        var val = val || false;
        var obj, rtn;

        if (document.forms[name]) obj = document.forms[name];
        else obj = name;

        if (element !== false)
        {

            if (isNaN(element)) el = obj.elements[element];
            else el = obj.elements[parseInt(element)];

            if (val !== false)
            {

                if (el.type) rtn = el.value;
                else rtn = el[el.selectedIndex].value;
            }
            else rtn = el;
        }
        else rtn = obj;

        return rtn;
    },

    toggle_div: function(name, param)
    {

        if (param) document.getElementById(name).style.display = (param == 1) ? 'block' : 'none';
        else document.getElementById(name).style.display = (document.getElementById(name).style.display == 'none') ? 'block' : 'none';
    },

    current_scroll: function()
    {

        var scrollx = (document.scrollX) ? document.scrollX : document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
        var scrolly = (document.scrollY) ? document.scrollY : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        return { x: scrollx, y: scrolly }
    },

    element_position: function(el)
    {

        var x = y = 0;

        if (el.offsetParent)
        {
            x = el.offsetLeft;
            y = el.offsetTop;
            while (el = el.offsetParent)
            {
                x += el.offsetLeft;
                y += el.offsetTop;
            }
        }
        return { x: x, y: y }
    },

    document_size: function()
    {

        var y = parseInt(Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollHeight : document.documentElement.scrollHeight, _$.viewarea_size().y));
        var x = parseInt(Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollWidth : document.documentElement.scrollWidth, _$.viewarea_size().x));
        return { x: x, y: y }
    },

    viewarea_size: function()
    {

        var y = parseInt(((document.compatMode || _$.browser().name == 'ie') && !window.opera) ? (document.compatMode == 'CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight : (document.parentWindow || document.defaultView).innerHeight);
        var x = parseInt(((document.compatMode || _$.browser().name == 'ie') && !window.opera) ? (document.compatMode == 'CSS1Compat') ? document.documentElement.clientWidth : document.body.clientWidth : (document.parentWindow || document.defaultView).innerWidth);
        return { x: x, y: y }
    },

    scroll_position: function(y, x)
    {

        var x = x || null;
        var y = y || null;

        if (x === null && y === null)
        {

            y = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
            x = document.body.scrollTop ? document.body.scrollLeft : document.documentElement.scrollLeft;
            return { x: x, y: y }
        }
        else
        {
            if (y === null) { y = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop; };
            if (x === null) { x = document.body.scrollTop ? document.body.scrollLeft : document.documentElement.scrollLeft; };
            window.scrollTo(x, y);
        }
    },

    ajaxLoad: function(url, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction)
    {

        if (window.XMLHttpRequest)
        {
            var ajaxObject = new XMLHttpRequest();
            ajaxObject.onreadystatechange = function()
            {
                _$.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
            };
            ajaxObject.open('GET', url, true);
            ajaxObject.send(null);
        }
        else if (window.ActiveXObject)
        {
            var ajaxObject = new ActiveXObject('Microsoft.XMLHTTP');
            if (ajaxObject)
            {
                ajaxObject.onreadystatechange = function()
                {
                    _$.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
                };
                ajaxObject.open('GET', url, true);
                ajaxObject.send();
            }
        }
    },

    ajaxLoadPost: function(url, data, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction)
    {

        var ajaxObject = null;

        if (window.XMLHttpRequest) ajaxObject = new XMLHttpRequest();
        else if (window.ActiveXObject) ajaxObject = new ActiveXObject('Microsoft.XMLHTTP');

        if (ajaxObject)
        {

            ajaxObject.onreadystatechange = function()
            {
                _$.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
            };
            ajaxObject.open('POST', url, true);
            ajaxObject.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ajaxObject.setRequestHeader('Content-length', data.length);
            ajaxObject.setRequestHeader('Connection', 'close');
            ajaxObject.send(data);
        };
    },

    ajaxLoadHandler: function(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction)
    {

        if (ajaxObject.readyState == 4)
        {
            if (ajaxObject.status == 200) ajaxCallBackFunction.call(callObject, ajaxObject, params);
            else
            {
                if (ajaxCallBackErrorFunction) ajaxCallBackErrorFunction.call(callObject, ajaxObject);
            }
        }
    },

    addEvent: function(obj, sEvent, sFunc)
    {
        if (obj.addEventListener) obj.addEventListener(sEvent, sFunc, false);
        else if (obj.attachEvent) obj.attachEvent('on' + sEvent, sFunc);
    },

    removeEvent: function(obj, sEvent, sFunc)
    {
        if (obj.removeEventListener) obj.removeEventListener(sEvent, sFunc, false);
        else if (obj.detachEvent) obj.detachEvent('on' + sEvent, sFunc);
    },

    addCSS: function(cssStr)
    {
        var head = _$.$t('head')[0];
        var styleSheets = head.getElementsByTagName('style');
        var styleSheet = null;
        if (styleSheets.length) styleSheet = styleSheets[styleSheets.length - 1];
        else
        {
            styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            head.appendChild(styleSheet);
        }

        if (styleSheet.styleSheet) styleSheet.styleSheet.cssText += cssStr;
        else styleSheet.appendChild(document.createTextNode(cssStr));
    },

    js_include: function(script)
    {

        var new_js = document.createElement('script');
        new_js.setAttribute('type', 'text/javascript');
        new_js.setAttribute('src', script);
        document.getElementsByTagName('head')[0].appendChild(new_js);
    },

    event: function(e)
    {

        e = e || window.event;

        if (e.pageX == null && e.clientX != null)
        {
            var html = document.documentElement;
            var body = document.body;
            e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
            e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
        }

        if (!e.which && e.button) e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));

        return e;
    },

    injectScript: function(source)
    {
        var inject = document.createElement("script");
        inject.setAttribute("type", "text/javascript");
        inject.textContent = source;
        _$.$t('head')[0].appendChild(inject);
    },

    injectScriptUrl: function(url)
    {
        var inject = document.createElement("script");
        inject.setAttribute("type", "text/javascript");
        inject.setAttribute("src", url);
        _$.$t('head')[0].appendChild(inject);
    },

    insertAfter: function(referenceNode, node)
    {
        referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
    },

    $n: function(element)
    {
        return document.getElementsByName(element);
    },

    getUsername: function()
    {
        var username = "";
        divWithA = document.getElementById('greetings');
        if (divWithA)
        {
            arrayOfA = divWithA.getElementsByTagName('a');
            if (arrayOfA)
            {
                username = arrayOfA[0].innerHTML;
            }
        }
        return username;
    },

    fireEvent: function(element, event)
    {
        if (document.createEventObject)
        {
            // dispatch for IE
            var evt = document.createEventObject();
            return element.fireEvent('on' + event, evt)
        } else
        {
            // dispatch for firefox + others
            var evt = document.createEvent("MouseEvents");
            evt.initEvent(event, true, true); // event type,bubbling,cancelable
            return !element.dispatchEvent(evt);
        }
    }

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
if( typeof _$.settings.username_replace == "undefined") { _$.settings.username_replace = 0; settingsSave = true; }
//SP1 adding scripts - STEP ONE
if( typeof _$.settings.instant_search == "undefined") { _$.settings.instant_search = 1; settingsSave = true; }
if( typeof _$.settings.instant_search_hide == "undefined") { _$.settings.instant_search_hide = 1; settingsSave = true; }
if( typeof _$.settings.arrows_on == "undefined") { _$.settings.arrows_on = 1; settingsSave = true; }
if( typeof _$.settings.d3search == "undefined") { _$.settings.d3search = 1; settingsSave = true; }
if( typeof _$.settings.karma_log == "undefined") { _$.settings.karma_log = 1; settingsSave = true; }
if( typeof _$.settings.youtube_preview == "undefined") { _$.settings.youtube_preview = 1; settingsSave = true; }
if( typeof _$.settings.youtube_addmiss_preview == "undefined") { _$.settings.youtube_addmiss_preview = 1; settingsSave = true; }
if( typeof _$.settings.youtube_auto_hd == "undefined") { _$.settings.youtube_auto_hd = 1; settingsSave = true; }
if( typeof _$.settings.gender_color == "undefined") { _$.settings.gender_color = 1; settingsSave = true; }
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
if( typeof _$.settings.dirty_tags_hidetags == "undefined") { _$.settings.dirty_tags_hidetags = 1; settingsSave = true; }
if( typeof _$.settings.timings_display == "undefined") { _$.settings.timings_display = 0; settingsSave = true; }
if( typeof _$.settings.new_window == "undefined"){ _$.settings.new_window = 1; settingsSave = true; }

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

function getDateString( d )
{
    var postsLink = "http://leprosorium.ru/archive/" + d.getFullYear();
    if ( d.getMonth() < 9 )
    {
        postsLink += "0";
    }
    postsLink += ( d.getMonth() + 1 );

    if ( d.getDate() < 10 )
    {
        postsLink += "0";
    }
    postsLink += ( d.getDate());
    return postsLink;
}

if(_$.location.indexOf('/off/')!=0)
{
	var dsp_general_bar = '';
	var dsp_general_param = '';
	var dsp_check_change_pictures = 1;
	if(_$.getUsername()!="")
	{
		var dsp_self_name = _$.getUsername();
		var dsp_self_num = 0
	}
	else
	{
		var dsp_self_name = "%username%";
		var dsp_self_num = 0;
	}

	function DSP_make_General_Bar()
	{
		var dsp_output = dsp_bars = dsp_params = '';
		var dsp_left_panel = _$.$c('layout_left')[0];
		for(var i=0; i<6; i++)
		{
				dsp_bars += '<div id="dsp_setting_button_'+i+'" style="background-color:#edf1f6;width:140px;height:30px;line-height:30px;border-top:1px solid #edf1f6;border-right:1px solid #b6b6b6">&nbsp;</div>';
				dsp_params += '<div id="dsp_setting_'+i+'" style="padding:10px 0 0 10px;display:none;border-top:1px solid #b6b6b6"></div>';
		}

		dsp_output += '<br><div style="background: #fff url(data:image/png;base64,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) 4px 4px no-repeat;height:50px;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9"><a id="dsp_setting_bar" style="cursor:pointer;text-decoration:underline;line-height:50px;margin-left:62px">Настройки</a></div>';		dsp_output += '<div id="_$.settings" style="display:none;position:fixed;top:'+((_$.viewarea_size().y-300)/2)+'px;left:'+((_$.viewarea_size().x-610)/2)+'px;width:610px;height:300px;z-index:2999">';
        dsp_output += '<table width="610" height="300" cellpadding="20" style="background-color: #f0f0f0;" align="center"><tr><td>';
		dsp_output += '<table cellspacing="0" cellpadding="0" width="100%" backgtound="FFFFFF" style="font-size: 90%;"><tr><td valign="top" colspan="1" height="30" style="font-size:90%;color:#5880af;"><a href="http://userscripts.org/scripts/show/96606">Service Pack 1</a></td><td valign="top" colspan="1" height="30" style="padding-left:5px; font-size:8%;color:#5880af;"></td><td width="40" align="right" valign="top"><div id="dsp_setting_close" style="background: #999; width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div></td></tr><tr><td valign="top" width="140" style="">'+dsp_bars+'</td><td colspan="2" valign="top">'+dsp_params+'</td></tr></table>';
		dsp_output += '</tr></td></table></div>';

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

        // http://leprosorium.ru/archive/20130601

        var d = new Date();
        var todayPostsLink = getDateString( d );
        var dy = new Date();
        dy.setDate(dy.getDate() - 1);        
        var yesterdayPostsLink = getDateString( dy );

        var newDiv = document.createElement('div');
        newDiv.setAttribute('style', 'padding: 20px;');
        newDiv.appendChild( document.createTextNode('Посты за '));
        var newLink = document.createElement('a');
        newLink.setAttribute('href', todayPostsLink );
        newLink.innerHTML = "сегодня";
        newDiv.appendChild( newLink );
        newDiv.appendChild( document.createTextNode(' и '));
        newLink = document.createElement('a');
        newLink.setAttribute('href', yesterdayPostsLink );
        newLink.innerHTML = "вчера";
        newDiv.appendChild( newLink );
        dsp_left_panel.appendChild( newDiv );


	}



	function DSP_make_Setting_Bar(title,params,init)
	{
		var dsp_setting_id = 0;
		while(dsp_setting_id<6)
		{
			if(_$.$('dsp_setting_button_'+dsp_setting_id).innerHTML.length<10) break;
			else dsp_setting_id++;
		}
		_$.$('dsp_setting_button_'+dsp_setting_id).style.borderTop = '1px solid #b6b6b6';
		_$.$('dsp_setting_button_'+dsp_setting_id).innerHTML += '<span style="margin-left:10px;cursor:pointer" id="dsp_setting_link_'+dsp_setting_id+'">'+title+'</span>';
		_$.$('dsp_setting_'+dsp_setting_id).innerHTML += params;
		eval(init);
		_$.$('dsp_setting_button_'+dsp_setting_id).style.cursor="pointer";
		_$.addEvent(_$.$('dsp_setting_button_'+dsp_setting_id),'click',function(){DSP_show_hide_setting(dsp_setting_id)});
	}

	function DSP_show_hide_window(name)
	{
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

function DSP_replace_username(option)
{
	var dsp_content_nodes = _$.$c('dt',_$.$('main'));
	var dsp_first = '%username%';
	var dsp_second = dsp_self_name;

	if(option==0)
    {
		dsp_first = dsp_self_name;
		dsp_second = '%username%';
	}

	for(var i=0; i<dsp_content_nodes.length; i++)
    {
		if(dsp_content_nodes[i].innerHTML.indexOf(dsp_first)>-1)
        {
			dsp_content_nodes[i].innerHTML = dsp_content_nodes[i].innerHTML.split(dsp_first).join(dsp_second);
		}
	}
}

//SP1
//turn events supression on to optimize loading time
var supressEvents = true;

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Функции создания настроек


* * * * * * * * * * * * * * * * * * * * * * * * * */

function add_checkbox_event(checkboxId, optionId)
{
	_$.addEvent(_$.$(checkboxId),'click',
	function()
    {
		if(_$.$(checkboxId).checked===true) _$.set_save(optionId,1);
		else _$.set_save(optionId,0);
	});
}

function dsp_d3search_init()
{
	//SP1 - STEP THREE
	_$.addEvent(_$.$('dsp_c_d3search'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_new_window');

		if(_$.$('dsp_c_d3search').checked===true) _$.set_save('d3search',1);
		else _$.set_save('d3search',0);

	});

	add_checkbox_event('dsp_c_new_window','new_window');
}

function dsp_general_init(){
	//SP1
	add_checkbox_event('dsp_c_youtube_preview','youtube_preview');
    add_checkbox_event('dsp_c_youtube_addmiss_preview','youtube_addmiss_preview');
    add_checkbox_event('dsp_c_youtube_auto_hd','youtube_auto_hd');
    add_checkbox_event('dsp_c_gender_color','gender_color');    
   

	if(_$.browser().name != "chrome")add_checkbox_event('dsp_c_smooth_scroll','smooth_scroll');

	_$.addEvent(_$.$('dsp_c_comment_scroller'),'click',
	function()
	{
		if(_$.browser().name != "chrome")DSP_show_hide_menu('dsp_l_scroll');

		if(_$.$('dsp_c_comment_scroller').checked===true) _$.set_save('comment_scroller',1);
		else _$.set_save('comment_scroller',0);

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
	//SP1
	add_checkbox_event('dsp_c_read_button','read_button');
	
	_$.addEvent(_$.$('dsp_c_dirty_tags'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_dirty_tags');
		if(_$.$('dsp_c_dirty_tags').checked===true) _$.set_save('dirty_tags',1);
		else _$.set_save('dirty_tags',0);
	});
	
	add_checkbox_event('dsp_c_dirty_tags_hidetags','dirty_tags_hidetags');

	_$.addEvent(_$.$('dsp_c_instant_search'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_instant_search');
		if(_$.$('dsp_c_instant_search').checked===true) _$.set_save('instant_search',1);
		else _$.set_save('instant_search',0);
	});
	add_checkbox_event('dsp_c_instant_search_hide','instant_search_hide');
}

function dsp_comments_init()
{
	//SP1
}


function dsp_tooltip_init()
{
	//SP1
	add_checkbox_event('dsp_c_karma_log','karma_log');
	add_checkbox_event('dsp_c_inbox_recreate','inbox_recreate');
	add_checkbox_event('dsp_c_timings_display','timings_display');
}

function DSP_make_content_settings()
{
	if(_$.$('dsp_setting_button_0').innerHTML.length<10)
	{
		var dsp_txt = '<table cellspacing="0" border="0">';
		//SP1 adding scripts - STEP TWO
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_comment_scroller" type="checkbox" '+((_$.settings.comment_scroller=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_comment_scroller">Навигация по комментариям и постам</label></td></tr>';
		dsp_txt += '</table>';
		if(_$.browser().name != "chrome")
		{
    	  dsp_txt += '<div id="dsp_l_scroll" style="display:'+((_$.settings.comment_scroller=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left:20px;">';
		  dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_smooth_scroll" type="checkbox" '+((_$.settings.smooth_scroll=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_smooth_scroll">Плавная прокрутка</label></td></tr>';
		  dsp_txt += '</table></div>';
		}
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_youtube_preview" type="checkbox" '+((_$.settings.youtube_preview=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_youtube_preview">Предпросмотр youtube видео в постах и комментариях</label></td></tr>';
        dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_youtube_addmiss_preview" type="checkbox" '+((_$.settings.youtube_addmiss_preview=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_youtube_addmiss_preview">Добавлять картинку из видео для видеоссылок без неё</label></td></tr>';

        dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_youtube_auto_hd" type="checkbox" '+((_$.settings.youtube_auto_hd=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_youtube_auto_hd">Показывать видео в HD (если можно)</label></td></tr>';
        dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_gender_color" type="checkbox" '+((_$.settings.gender_color=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_gender_color">Выделять цветом мальчиков и девочек</label></td></tr>';


		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_username_replace" type="checkbox" '+((_$.settings.username_replace=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_username_replace">Заменять %username% на ваше имя</label></td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Общие',dsp_txt,'dsp_general_init()');

		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_dirty_tags" type="checkbox" '+((_$.settings.dirty_tags=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_dirty_tags">Lepro Tags</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_dirty_tags" style="display:'+((_$.settings.dirty_tags=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left: 25px;">';
		dsp_txt += '<tr><td align="right"><input id="dsp_c_dirty_tags_hidetags" type="checkbox" '+((_$.settings.dirty_tags_hidetags=='1')?'checked="checked"':'')+'></td><td><label for="dsp_c_dirty_tags_hidetags">Прятать список тегов под ссылку</label></td></tr>';
		dsp_txt += '</table></div>';
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_instant_search" type="checkbox" '+((_$.settings.instant_search=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_instant_search">Поиск по комментариям в постах</label></td></tr>';
		dsp_txt += '</table>';		
		dsp_txt += '<div id="dsp_l_instant_search" style="display:'+((_$.settings.instant_search=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left: 25px;">';
		dsp_txt += '<tr><td align="right" width="25"><input id="dsp_c_instant_search_hide" type="checkbox" '+((_$.settings.instant_search_hide=='1')?'checked="checked"':'')+'></td><td><label for="dsp_c_instant_search_hide">Прятать отфильтрованные комментарии совсем</label></td></tr>';
		dsp_txt += '</table></div>';
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_read_button" type="checkbox" '+((_$.settings.read_button=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_read_button">Кнопка прочтения новых комментариев</label></td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Посты',dsp_txt,'dsp_posts_init()');

		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_arrows_on" type="checkbox" '+((_$.settings.arrows_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_arrows_on">Увеличить стрелочки под комментарием</label></td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Комментарии',dsp_txt,'dsp_comments_init()');
		
		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_d3search" type="checkbox" '+((_$.settings.d3search=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_d3search">Замена поиска на <a href="http://leprosearch.ru" target="_blank">leprosearch.ru</a></label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_new_window" style="display:'+((_$.settings.d3search=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left:20px;">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_new_window" type="checkbox" '+((_$.settings.new_window=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_new_window">Результаты поиска в новом окне</label></td></tr>';
		dsp_txt += '</table></div>';
		
		DSP_make_Setting_Bar('Поиск',dsp_txt,'dsp_d3search_init()');

		dsp_txt = '<table cellspacing="0" border="0">';
		//SP1
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_karma_log" type="checkbox" '+((_$.settings.karma_log=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_karma_log">Комментарии к карме</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_inbox_recreate" type="checkbox" '+((_$.settings.inbox_recreate=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_inbox_recreate">Кнопка пересоздания инбокса</label></td></tr>';
		// start gertrudes options
		dsp_txt += '</table>';
		// end gertrudes options
		dsp_txt += '<table cellspacing="0" border="0">'
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_timings_display" type="checkbox" '+((_$.settings.timings_display=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_timings_display">Показывать время выполнения</label></td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Остальное',dsp_txt,'dsp_tooltip_init()');

	}
	DSP_show_hide_window('_$.settings');
}


function DSP_init()
{
	if ( document.querySelector('div.layout_left') != null )
	{
		DSP_make_General_Bar();
		DSP_show_hide_setting(0);
	}
	
    // Username replace
    if(_$.settings.username_replace=='1')
    {
    	var time1 = new Date();
    	DSP_replace_username(1);
    	addBenchmark( time1, '%username% replace' );
    }


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Service Pack 1

* * * * * * * * * * * * * * * * * * * * * * * * * */
//SP 1, NEW SCRIPTS START HERE

//simplest eventDispatcher, listens to standard events like mouseup and mousedown
var eventDispatcher = document.createElement('div');

//previews
function vPreview(e)
{
	var vPrvDiv = document.getElementById( 'reply_form' );
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
	var vPrvDiv = document.getElementById( 'reply_form' );
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

// comments preview
if ( document.location.href.indexOf('/comments/') > -1 )
{
    vPrvDiv = document.querySelector('div.bottom_left');
    if ( vPrvDiv )
    {
    	newdiv = document.createElement('div');
    	newdiv.setAttribute('style', 'margin-right: 30px; float: right;');
    	newdiv.innerHTML = "<a href=\"#\" id=\"prevLink\" class=\"dashed\" style=\"color: black; font-size: 11px;\">предпросмотр</a>";
    	vPrvDiv.parentNode.insertBefore( newdiv, vPrvDiv );
    	_$.addEvent(document.getElementById('prevLink'), "click", vPreview);
    	_$.addEvent(document.getElementById('js-post-yarrr'), "click", vRemovePreview);
    }
}

// post preview
if ( document.location.href.indexOf('/asylum/') > -1 )
{
    vPrvDiv = document.getElementById('picform');
    if ( vPrvDiv )
    {
        newdiv = document.createElement('div');
        newdiv.setAttribute('style', 'float: right; margin: 0px 50px 0px 20px;')
        newLink = document.createElement('a');
        newLink.setAttribute('href', '#');
        newLink.setAttribute('id', 'prevLink');
        newLink.setAttribute('style', 'color: black; font-size: 11px;');
        newLink.setAttribute('class', 'dashed');
        newLink.appendChild( document.createTextNode('предпросмотр'));
        newdiv.appendChild( newLink );
        vPrvDiv.parentNode.appendChild( newdiv );

        _$.addEvent(document.getElementById('prevLink'), "click", vPreview);

        yarrButton = document.querySelector('input.image');
        if ( yarrButton )
        {
           _$.addEvent( yarrButton, "click", vRemovePreview);
        }

        //add reply_form
        docForm = document.forms["pf"];
        if ( docForm )
        {
            vPrvDiv = document.createElement('div');
            vPrvDiv.setAttribute('id', 'reply_form');
            _$.insertAfter( docForm, vPrvDiv );
        }
    }
}
//add Youtube to textarea
//BIG BLOCK

function close()
{
	_$.injectScript("if(interval){window.clearInterval(interval);}");
	_$.$('youtube_embed').innerHTML = "";
	_$.toggle_div('youtube_preview',0);
}

function yarr()
{
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

function getParameterByName(name, url) 
{
    var match = RegExp('[?&#]' + name + '=([^&#]*)').exec( url );
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function processUrl(url)
{
//    console.log( getParameterByName('v', url ));
//    console.log( getParameterByName('t', url ));

	var id = getParameterByName('v', url );
	if( id == null || id.length==0)
	{
		return false;
	}
	var time = -1;
	var timeraw = getParameterByName('t', url );
	if(!(timeraw == null || timeraw.length==0))
	{
		//process time        
		timeraw = timeraw.replace(/(&|#).+/g, "");
		if(timeraw.match(/[0-9]+/gi) && timeraw > -1)
		{
			time = timeraw;
		}
		else
		{
			var values = timeraw.match(/([0-9]+m)?([0-9]+(s)?){1}/gi);
			if(values != null)
			{
				minutes = timeraw.split("m")[0];
				if(minutes == timeraw || minutes == null || minutes.length == 0)
				{
					minutes = 0;
				}
				seconds = timeraw.split("m")[1];
				if(seconds == null || seconds.length == 0)
				{
					seconds = timeraw;
				}
				seconds = seconds.replace("s", "");
				if(minutes > -1 && seconds > -1)
				{
					time = 60*minutes + 1*seconds;
				}
			}
		}
	}
	return {id: id, time: time};
}


function addNiceTableCss()
{
    var css = '#newspaper-a {  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;   font-size: 12px;   margin: 45px;  text-align: left;   border-collapse: collapse;   border: 1px solid #69c; }'
    + '#newspaper-a th { padding: 12px 17px 12px 17px; font-weight: normal; font-size: 14px; color: #039; border-bottom: 1px dashed #69c; }'
    + '#newspaper-a td { padding: 7px 17px 7px 17px;  color: #669; }';

    style = document.createElement('style');
    style.type = 'text/css';
    if(style.styleSheet)
    {
        style.styleSheet.cssText = css;
    }
    else
    {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild( style );
}

function addYoutube()
{
	var url = prompt("Введите URL с youtube", "");
	//check url
	var search = url.search("youtube.com/");
	if (search == -1)
	{
		alert("Поддерживаются только youtube видео");
		return false;
	}
	//process
	var re=processUrl(url);
	if(re==false)
	{
		alert("В URL нет id ролика");
		return false;
	}

	//global
    var boyan = false;
    var links = document.getElementsByTagName('A');
    if ( links )
    {
        for ( var cnt =0; cnt < links.length; cnt++)
        {
            if ( links[cnt].href.indexOf( re.id ) > -1 )
            {
                boyan = true;
                break;
            }
        }
    }

    if ( boyan )
    {
        if (confirm('Хочешь боян запостить?') == false ) 
        {
            return false;           
        }
    }


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
var replyForm = document.getElementById( 'reply_form');
if ( ! replyForm )
{
	replyForm = document.querySelector('div.textarea_editor');
}
if  ( replyForm )
{
	var replyFormHeader =  replyForm.querySelector( 'div.header');
	if (!replyFormHeader)
	{
		replyFormHeader = document.querySelector('div.textarea_editor');
	}	
	if ( replyFormHeader )
	{	
		var link = document.createElement("a");
		link.innerHTML = "<b>Youtube</b>";
		link.id = "youtube_link";
		link.style.cursor="pointer";
		//link.onclick = "insert_youtube(); return false;";
		replyFormHeader.appendChild(link);
		_$.addEvent(_$.$('youtube_link'),'click',addYoutube);

		var preview_div = document.createElement("div");
		var width = 720;
		var height = 295;
		dsp_output = "";
		dsp_output += '<div id="youtube_preview" style="bavkground-color: #f0f0f0; display:none;position:fixed;top:'+((_$.viewarea_size().y-height)/2)+'px;left:'+((_$.viewarea_size().x-width)/2)+'px;width:'+width+'px;height:'+height+'px;z-index:2999"><table style="background-color: #f0f0f0;" cellspacing="0" cellpadding="0" border="0" width="'+width+'" height="'+height+'"><tr><td width="20" height="35"></td><td></td><td width="20"></td></tr><tr><td></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" valign="top">';
		dsp_output += '<div id="youtube_preview_close" style="float: right; background-color: #999;width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div>';
		dsp_output += '<table style="background-color: #ffffff;"><tr><td><div style="font-size:180%;color:#5880af; padding-bottom: 10px;">Youtube preview</div></td><td><div style="float: left";>Картинка в посте</div></td></tr>';
		dsp_output += '<tr><td><div id="youtube_embed" style="width: 340px; float:left;"></div></td>';
		dsp_output += '<td><div id="youtube_thumbs"></div></td></tr></table>';
		dsp_output += '<div id="youtube_time" style="width: 340px; float:left;">Перемотайте на нужное время. Позиция сейчас: 0 cек. Ссылка будет поставлена именно на эту секунду ролика.</div>';
		dsp_output += '<div id="youtube_yarrr" style="width: 54px; height: 20px; cursor: pointer; float: right; background-image: url(data:image/gif;base64,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);"></div>';
		dsp_output += '</td><td></td></tr><tr><td height="20"></td><td></td><td></td></tr></table></div>';
		preview_div.innerHTML = dsp_output;
		document.body.appendChild(preview_div);
		_$.addEvent(_$.$('youtube_preview_close'),'click',close);
		_$.addEvent(_$.$('youtube_yarrr'),'click',yarr);
	}
}

//END BIG BLOCK

//ON/OFF THRNABLE FUNCTIONS
//make arrows bigger
if(_$.settings.arrows_on=='1')
{
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

	function documentChanged(event) {
		if (supressEvents) {
			return;
		}
		if(event.target.className != null && event.target.className.indexOf("comment")>-1){
			apply_links(event.target);
		}
	}

	apply_links(document);
	_$.addEvent(document,"DOMNodeInserted", documentChanged);

	addBenchmark( time1, 'triple arrows in comments' );
}


//Замена поиска
if(_$.settings.d3search=='1')
{
	var searchDiv = document.getElementById('search');
	if(searchDiv)
	{
		searchDiv.innerHTML = '\
				<form name="simple-search" action="http://leprosearch.ru/" '+((_$.settings.new_window=='1')?'target="_new" ':'')+'method="get">\
					<div><input type="text" defaultValue="поиск на leprosearch.ru" id="js-header_search_input_new" value="поиск на leprosearch.ru" name="query" class="text dynamic_value">\
					<input class="image" type="image" src="http://img.dirty.ru/lepro/search.gif"></div>\
				</form><p><a href="http://search.leprosorium.ru/" class="nobr">супер поиск</a></p>';
			_$.injectScript("utils.focusText('js-header_search_input_new', 'поиск на leprosearch.ru');");
	}
}


// Gender color
if(_$.settings.gender_color=='1' && document.location.href.indexOf('/comments/') != -1 )
{
    var tagComments = document.querySelectorAll('div.dd');
    var linkUserName;
    var femalesCommentsCount = 0;
    var malesCommentsCount = 0;

    var femalesNames = new Array();
    var malesNames = new Array();

    for( var i=0; i < tagComments.length; i++)
    {
        divLinks = tagComments[i].getElementsByTagName('A');
        if ( divLinks.length > 1 )
        {
            if (divLinks[1].parentNode.innerHTML.indexOf('Написала') > -1 )
            {
                //female
                divLinks[1].style.borderBottom = '1px solid #ff78f7';
                femalesCommentsCount++;
                if ( femalesNames.indexOf( divLinks[1].textContent ) == -1 )
                {
                    femalesNames.push( divLinks[1].textContent );
                }
            }
            else
            {
                //male
                divLinks[1].style.borderBottom = '1px solid #5086ff';
                malesCommentsCount++;
                if ( malesNames.indexOf( divLinks[1].textContent ) == -1 )
                {
                    malesNames.push( divLinks[1].textContent );
                }
            }
            divLinks[1].style.textDecoration = 'none';
        }
    }

    var hdrSex = document.querySelector('span.js-addToFavs');
    if ( hdrSex )
    {
        var newSpan = document.createElement('span');
        newSpan.setAttribute('style', 'padding: 0px 7px 0px 27px;');
        newSpan.appendChild(document.createTextNode('м: '+malesNames.length+' ('+malesCommentsCount+') / ж: '+femalesNames.length+' ('+femalesCommentsCount+')'));
        hdrSex.parentNode.appendChild( newSpan );
    }

}



//Youtube preview
if(_$.settings.youtube_preview=='1')
{

    function isNumber(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    function lspSetVideoSize( srcobject, width, height )
    {
        srcobject.parentNode.parentNode.firstChild.setAttribute('width', width );
        srcobject.parentNode.parentNode.setAttribute('style', 'width: ' + ( width + 35 ) + 'px;' );
        srcobject.parentNode.parentNode.firstChild.setAttribute('height', height );  
    }
    function lspCloseVideo( srcobject )
    {
        srcobject.parentNode.parentNode.previousSibling.setAttribute('style', srcobject.parentNode.parentNode.previousSibling.getAttribute('bkpstyle'));
        srcobject.parentNode.parentNode.parentNode.removeChild( srcobject.parentNode.parentNode );
    }

    function clickOnVideoLink( e )
    {
        var videoId;
        if (( this.href.search(/youtube.com/i) > -1 ) && ( this.href.search(/v=/i) > -1 ))
        {
            //urlFixed = this.href.replace("#t=", "&t=");
            var re = processUrl( this.href );
            if(re==false)
            {
                alert("В URL нет id ролика");
                return false;
            }            
            videoId = re.id;
            videoTime = re.time;
            if ( videoTime < 0 )
            {
                videoTime = 0;
            }

            if(_$.settings.youtube_auto_hd=='1')
            {
                videoId = 'http://www.youtube.com/embed/' + videoId + '?autoplay=1&fs=1&vq=hd1080&start=' + videoTime;
            }
            else
            {
                videoId = 'http://www.youtube.com/embed/' + videoId + '?autoplay=1&fs=1&start=' + videoTime;
            }

        }
        else if ( this.href.search(/youtu.be/i) > -1 )
        {
            videoId = this.href.slice( this.href.search(/youtu.be/i) + 9 );

            if(_$.settings.youtube_auto_hd=='1')
            {
                videoId = 'http://www.youtube.com/embed/' + videoId + '?autoplay=1&vq=hd1080&fs=1';
            }
            else
            {
                videoId = 'http://www.youtube.com/embed/' + videoId + '?autoplay=1&fs=1';
            }


        }
        else if ( this.href.search(/vimeo.com/i) > -1 )
        {
            videoId = this.href.slice( this.href.search(/vimeo.com/i) + 10 );
            if ( isNumber( videoId ))
            {
                videoId = 'http://player.vimeo.com/video/' + videoId + '?autoplay=1';
            }
        }
        else if ( this.href.search(/twitvid.com/i) > -1 )
        {
            videoId = 'http://www.twitvid.com/embed.php?guid=' + this.href.slice( this.href.search(/twitvid.com/i) + 12 );
        }

        if ( videoId.length > 0 )
        {
            var playerMainDiv = document.createElement('div');
            var newA;
            var newDiv;

            var iframeObj =  document.createElement('iframe');
            iframeObj.setAttribute('width', '800');
            iframeObj.setAttribute('height', '600');
            iframeObj.setAttribute('frameborder', '0');
            iframeObj.setAttribute('src', videoId );
            playerMainDiv.appendChild( iframeObj );
            playerMainDiv.setAttribute('style', 'width: 835px;' );

            newDiv = document.createElement('span');
            newDiv.setAttribute('style', 'float: right; position: relative; top: 0px; padding: 3px; text-decoration: none;')
            newA = document.createElement('a');
            newA.setAttribute('href', '#');
            newA.appendChild( document.createTextNode('[ x ]'));
            _$.addEvent( newA, 'click', function (e) { lspCloseVideo( this ); e.preventDefault(); return false; });
            newDiv.appendChild( newA );
            playerMainDiv.appendChild( newDiv );

            newDiv = document.createElement('span');
            newA = document.createElement('a');
            newA.setAttribute('href', '#');
            newA.appendChild( document.createTextNode('[ закрыть ]'));
            _$.addEvent( newA, 'click', function (e) { lspCloseVideo( this ); e.preventDefault(); return false;});
            newDiv.appendChild( newA );
            playerMainDiv.appendChild( newDiv );

            newDiv = document.createElement('span');
            newDiv.setAttribute('style', 'float: right;');
            newDiv.appendChild( document.createTextNode(' размер: '));

            newA = document.createElement('a');
            newA.setAttribute('href', '#');
            newA.appendChild( document.createTextNode('нормальный'));
            _$.addEvent( newA, 'click', function (e) { lspSetVideoSize( this, 480, 360 ); e.preventDefault(); return false; });
            newDiv.appendChild( newA );     
            newDiv.appendChild( document.createTextNode(' | '));

            newA = document.createElement('a');
            newA.setAttribute('href', '#');
            newA.appendChild( document.createTextNode('большой'));
            _$.addEvent( newA, 'click', function (e) { lspSetVideoSize( this, 640, 480 ); e.preventDefault(); return false; });
            newDiv.appendChild( newA );     
            newDiv.appendChild( document.createTextNode(' | '));

            newA = document.createElement('a');
            newA.setAttribute('href', '#');
            newA.appendChild( document.createTextNode('огромный'));
            _$.addEvent( newA, 'click', function (e) { lspSetVideoSize( this, 800, 600 ); e.preventDefault(); return false; });
            newDiv.appendChild( newA ); 
            playerMainDiv.appendChild( newDiv );

            newDiv = document.createElement('br');
            newDiv.setAttribute('clear','all');
            playerMainDiv.appendChild( newDiv );
                    
            _$.insertAfter( this, playerMainDiv );
            this.setAttribute('bkpstyle', this.getAttribute('style'));
            this.setAttribute('style', 'display: none');
        
            e.preventDefault();
            return false;
        }
    }

    function lspAddVideoPreview( linkObject )
    {
        videoId = '';
     if (( linkObject.href.search(/youtube.com/i) > -1 ) && ( linkObject.href.search(/v=/i) > -1 ))
        {
            videoTime = 0;
            videoId = linkObject.href.slice(  linkObject.href.search(/v=/i) + 2 );
            if ( videoId.indexOf('&') > 1 )
            {
                videoId = videoId.slice( 0, videoId.indexOf('&'));
            }
            if ( videoId.indexOf('#') > -1 )
            {
                videoId = videoId.slice( 0, videoId.indexOf('#'));
            }            
        }
        else if ( linkObject.href.search(/youtu.be/i) > -1 )
        {
            videoId = linkObject.href.slice( linkObject.href.search(/youtu.be/i) + 9 );
        }
        if ( videoId.length > 0 )
        {
            var insertPreview = true;
            var imgs = linkObject.parentNode.getElementsByTagName('img');
            if ( imgs )
            {
                for ( var cnt =0; cnt < imgs.length; cnt++)
                {
                    if ( imgs[cnt].src.indexOf( videoId ) > -1 )
                    {
                        insertPreview = false;
                        break;
                    }
                }
            }
            if ( insertPreview )
            {
                if ( linkObject.innerHTML.indexOf('<img') > -1 )
                {
                    insertPreview = false;
                }
            }

            if ( insertPreview )
            {
                newImg = document.createElement('img');
                newImg.setAttribute('src', 'http://img.youtube.com/vi/' + videoId + '/0.jpg');
                linkObject.appendChild( document.createElement('br'));
                linkObject.appendChild( newImg );
                linkObject.appendChild( document.createElement('br'));
            }
        }
    }    

    function addPreview(comments)
    {
        addPreviews = true;
        var allLinksArray = comments.getElementsByTagName('a');
        for (var i = 0; i < allLinksArray.length; i++)
        {
            if (allLinksArray[i].href.search(/youtube.com/i) > -1)
            {
                if ( _$.settings.youtube_addmiss_preview == 1 )
                {
                    lspAddVideoPreview(allLinksArray[i]);
                }
                _$.addEvent(allLinksArray[i], 'click', clickOnVideoLink);
            }
            if (allLinksArray[i].href.search(/youtu.be/i) > -1)
            {
                if ( _$.settings.youtube_addmiss_preview == 1 )
                {
                    lspAddVideoPreview(allLinksArray[i]);
                }
                _$.addEvent(allLinksArray[i], 'click', clickOnVideoLink);
            }
            else if (allLinksArray[i].href.search(/vimeo.com/i) > -1)
            {
                _$.addEvent(allLinksArray[i], 'click', clickOnVideoLink);
            }
        }
    }   

	function documentChanged(event) 
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

    var time1 = new Date();
	//var comments = _$.$('js-comments');
	var comments = document.body;
	if( comments != null )
    {
		addPreview(comments);
	}

	//handle new ajax-generated content
	_$.addEvent(document,"DOMNodeInserted", documentChanged);

	addBenchmark( time1, 'youtube preview' );
}


//dirty tags
if(_$.settings.dirty_tags=='1')
{
	function manageTag( tagAnchor )
	{
		var tagText = tagAnchor.title.replace( /,/ig, ' ');
		if (tagAnchor.innerHTML == 'x' )
		{
			tagAnchor.innerHTML = '-';
			//$('js-new_tag_input').value = tagText;
			addTag( tagText );
		}
		else
		{
			tagAnchor.innerHTML = 'x' ;
			delTag( tagText );
			//tagsHandler.deleteTag( $('js-tags_private'), tagText );
		}
		return false;
	}

	function manageOwnTags()
	{
		var ourTagsDivCheck = document.getElementById('js-vtags-textarea');
		if (ourTagsDivCheck == null )
		{
//			var tagsDivAtDirty = document.querySelector('div.b-i-tags_comments_page');
			var tagsDivAtDirty = document.getElementById('tags_add');
			if ( tagsDivAtDirty )
			{
				// create list of tags to edit
				var divEditor = document.createElement('div');
				divEditor.setAttribute('style', 'font-size: 12px;');
				divEditor.setAttribute('id','js-vtags-textarea');
				divEditor.innerHTML = "<textarea rows=\"32\" cols=\"40\" id=\"vtags-own-tags\" style=\"font-size: 12px;\"></textarea><br><br>";
				divEditor.innerHTML += "<a href=\"#\" onclick=\"return saveTagsList();\" class=\"dashed\"><img src=\"http://pit.dirty.ru/dirty/1/2010/07/18/28284-165319-dab6dbe746b938b30cc807225bee1e65.png\" width=\"16\" height=\"16\" hspace=\"5\" vspace=\"3\" border=\"0\" align=\"top\">сохранить мой список</a><br><br>";
				tagsDivAtDirty.parentNode.appendChild(divEditor);
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
		var nrm = document.getElementById('vtags-own-tags').value.replace(/\r/g,'');
		localStorage.setItem('dirtyTags', jsonStringify( nrm.split('\n')));
		manageOwnTags();
		return false;
	}
	function loadTagsList()
	{
		// load values
		var tagsArray = new Array();
		tagsArray = jsonParse( localStorGetItem( 'dirtyTags', '["Тупая фигня", "Это же реклама" , "Это неправда", "Об этом уже писали", "Ctrl-C Ctrl-V", "Свежак", "КДПВ", "Скандалы интриги расследования", "Все правильно сделал", "Фишкинет", "Господи какая красота111", "британские учёные", "Чиновники", "Милиция","Оборотни","Беспредел","Наука","Космос","Искусство","История","Авто","Авиация","Армия","РПЦ","Маразм","Кругом враги","Животные","fapfapfap","боже он умер","Вавилонская библиотека","вирусняк","Гурусик нямка","Думаем о России","пост проклят","еще один все понял","и снова о Главном","Зачем моё измождённое тело","слава богу родился","лепрозорий на выезде","нафталин","ожируй клюв","он же упоротый","политический кружок при сельском клубе","слава России","Творчество душевнобольных","понаехали","Я маленькая лошадка","Я открыл для себя википедию"]'));
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
			var divWithUserName = document.getElementById('greetings');
			var dlinks = divWithUserName.getElementsByTagName('a');
			if ( dlinks.length > 0 )
			{
				myUserName = dlinks[0].text;
			}
			// get list of public tags
			var publicTagsDiv = document.getElementById('tags_common');
			if ( publicTagsDiv )
			{
				var ourTagsList = tagsArray.toString();
				var publicTags = publicTagsDiv.getElementsByTagName('a');
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
			}
			//
			// create div for tags
//			var tagsDivAtDirty = document.querySelector('div.b-i-tags_comments_page');
			var tagsDivAtDirty = document.getElementById('tags_add');
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
						ourTagsDiv.innerHTML += "<a href=\"#\" onclick=\"addTag('" + tagsArray[i] + "'); return false;\" title=\"" + tagsArray[i] + "\">" + tagsArray[i] +   "</a>";
						if (( tagsArray.length - 1 ) != i )
						{
							ourTagsDiv.innerHTML += " . ";
						}
					}
					ourTagsDiv.innerHTML += "<br><br>";
				}
				tagsDivAtDirty.parentNode.appendChild( ourTagsDiv );
			}
		}
		else
		{
			ourTagsDivCheck.parentNode.removeChild( ourTagsDivCheck );
		}
		return false;
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
			var tagComment = event.target.querySelector('div.dt');
			if ( tagComment != null )
			{
				processCommentTags( tagComment );
			}
		}
	}
	if( document.location.href.indexOf("comments") > -1 )
	{
		var time1 = new Date();
		var loggedUser = document.getElementById('logout');
		var addFormDiv = document.getElementById('tags_add');
		if ( loggedUser && addFormDiv )
		{
			// add script to the page
			_$.injectScript( manageTag + "\n" + manageTagsList + "\n" + manageOwnTags + "\n"+ loadTagsList + "\n" + saveTagsList );
			if ( _$.settings.dirty_tags_hidetags == 1 )
			{
				var divWithLinkToTags = document.createElement('div');
				divWithLinkToTags.setAttribute('id','js-tags-script-floatlink');
				divWithLinkToTags.setAttribute('style', 'font-size: 12px; display: block;');
				divWithLinkToTags.innerHTML = "<a href=\"#\" onclick=\"return manageTagsList();\" class=\"dashed\">ваш список меток</a><br><br>";
				addFormDiv.parentNode.appendChild( divWithLinkToTags );
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
			var tagComments = document.querySelectorAll('div.dt');
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

			_$.addEvent(document,"DOMNodeInserted", documentChangedTags);

			addBenchmark( time1, 'dirtytags replace' );
		}
	}
}

	//SHARED PART of read-button and new comment scroller
	if(_$.settings.read_button=='1' || _$.settings.comment_scorller=='1')
	{
		var time1 = new Date();

		function removeFromArray(arr, elem)
		{
			var re = Array();
			for(var i=0;i<arr.length;i++)
			{
				if(arr[i]!=elem)re.push(arr[i]);
			}
			return re;
		}

		//shared between read comments-button and scroller
		var posts = _$.$c('post', document, 'div');
		var allPostsArr = posts;
		var allPosts = posts.length;
		var suffix = '<a href="/users/' + _$.getUsername();
		var inboxDetect = document.location.href.indexOf('/inbox/');
		var newPosts = Array();
		var mine = Array();
		if (document.location.href.indexOf('/comments/') > -1 || inboxDetect > -1)
		{
			var newPosts1 = _$.$c('new', document, 'div');
			if (newPosts1)
			{
				for (newPostsCnt = 0; newPostsCnt < newPosts1.length; newPostsCnt++)
				{
					newPosts.push(newPosts1[newPostsCnt]);
				}
			}
			if (inboxDetect == -1 )
			{
				var mine1 = _$.$c('mine', document, 'div');
				if (mine1)
				{
					for (mineCnt = 0; mineCnt < mine1.length; mineCnt++)
					{
						mine.push(mine1[mineCnt]);
					}
				}
			}
		}

		//add read button and populate mine and newPosts
		for(var i=0;i<allPostsArr.length;i++)
		{
			inner = allPostsArr[i].querySelector('div.dd');
			if (inner == null) continue;
			inner = inner.childNodes[1];
			ownComment = false;
			var html = inner.innerHTML;
			if( html.indexOf( suffix) > -1 )
			{
				 ownComment = true;
			}
			if( html.indexOf('#new') > -1)
			{
				newPosts.push(allPostsArr[i]);
				//Add read comments - button
				if(_$.settings.read_button=='1')
				{
				    var newLinks = _$.$t('a', inner);
				    var newLink;
				    if (newLinks) 
				    {
				        for (var intcnt = 0; intcnt < newLinks.length; intcnt++)
				        {
				            if ( newLinks[intcnt].href.indexOf('#new') > -1 )
				            {
				                newLink = newLinks[intcnt];
				            }
				        }			        
				        
                    id = newLink.href;
					link = document.createElement("a");
					link.setAttribute("href", "#");
					link.setAttribute("style", "margin-left:5px; display:inline-block;");
					link.setAttribute("title", "Пометить комментарии как прочтённые");
					if(ownComment)link.setAttribute("own", "true");
					link.setAttribute("pos", i);
					link.setAttribute("posId", id);
					link.innerHTML = " <strong>[ прочитать ]</strong>";
					_$.insertAfter(newLink, link);

					_$.addEvent(link, 'click', function(e)
					{
					    if (this.getAttribute("href") == "") 
					    {
					        e.preventDefault(); return false;
						}
						pos = this.getAttribute('pos');
						id = this.getAttribute('posId');
						//
						if(_$.settings.comment_scroller=='1')
						{
							newPosts = removeFromArray(newPosts, allPostsArr[pos]);
							if(this.getAttribute('own')=="true")mine = removeFromArray(mine, allPostsArr[pos]);
							onScroll();
						}
						//												
						this.setAttribute("href", "");
						this.innerHTML = '<img src="http://pit.dirty.ru/dirty/1/2010/10/25/28281-184741-b29db745feb47786dade8a8e50c4f461.gif" style="border:0px;"/>';
						_$.ajaxLoad(id,function()
						{
							//hide post
							if(_$.$('inboxunread') != null && _$.$('inboxunread').checked)
							{
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
			}
			if(ownComment == true)
			{
				mine.push(allPostsArr[i]);
			}
		}
		//new comment scroller
		if(_$.settings.comment_scroller=='1' && location.pathname.indexOf('/write/')==-1 && location.pathname.indexOf('/user')==-1)
		{
			function documentChanged(event) 
			{
				if (supressEvents) 
				{
					return;
				}
				if(event.target.className != null && event.target.className.indexOf("post")>-1)
				{
					recountComments();
				}
			}

			function removeFromArray(arr, elem)
			{
				var re = Array();
				for(var i=0;i<arr.length;i++)
				{
					if(arr[i]!=elem)re.push(arr[i]);
				}
				return re;
			}

			function my()
			{
				if(mine.length > 0)
				{
					scrollToMiddle(mine[minePos]);
					minePos = (minePos+1)%mine.length;
				}
			}

			function next()
			{
				if(newPosts.length > 0 && newPos < ( newPosts.length - 1 ) && autoScroll )
				{
					newPos++;
				}
				if(newPosts.length > 0 )
				{
					scrollToMiddle(newPosts[newPos]);
				}
			}

			function prev()
			{
				if(newPosts.length > 0 && newPos > 0)
				{
					if(newPos > 1 && !autoScroll)
					{					
						newPos--;
					}
					newPos--;
				}
				
				if(newPosts.length > 0 )
				{
					scrollToMiddle(newPosts[newPos]);
				}
			}

			function getId(elem) 
			{
				prefix = "omgwtf";
				if(elem.id)return elem.id;
				tempId++;
				elem.id = prefix+tempId;
				return prefix+tempId;
			}

			function scrollToMiddle(elem)
			{
				if(elem == null)
				{ 
					return;
				}
				recolor = _$.$c("dt", elem, "div")[0];
				if(recolor == null)
				{
					recolor = elem;
				}

				if(recolor.style.borderColor != "#fff48d")
				{
					recolor.setAttribute("oldColor", recolor.style.backgroundColor);
					window.setTimeout("var el = document.getElementById('"+getId(recolor)+"'); el.style.backgroundColor = el.getAttribute('oldColor'); el.setAttribute('oldColor', '');", 650);
					recolor.style.backgroundColor = "#fff48d";
				}
				var middle = _$.element_position(elem).y + Math.round(elem.clientHeight/2) - Math.round(_$.viewarea_size().y/2);
				//
				if(_$.settings.smooth_scroll=='1')
				{
					smoothScroll(middle);
				}
				else
				{
					var x = _$.current_scroll().x;
					_$.scroll_position(middle, x);
				}
				//
			}

			function smoothScroll ( y )
			{
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
				if(mine.length >= 0)
				{
					for(var i=0;i<mine.length;i++)
					{
						if(_$.element_position(mine[i]).y - Math.round(_$.viewarea_size().y/2) <= current.y + 2)
						{
						}
						else
						{
							break;
						}
					}
					minePos = i%mine.length;
					setInnerText(_$.$('mine'), mine.length-i);
				}
			}
			function recountComments()
			{
				backup_allPostsArr = _$.$c('post', document, 'div');
				backup_newPosts = _$.$c('new', document, 'div');
				backup_mine = _$.$c('mine', document, 'div');
				allPosts = backup_allPostsArr.length;
				recountVisible();
			}
			function recountVisible()
			{
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
            temp += '<div id="home" style="height:32px; width:32px; color:#ffffff; background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAALOzs////yH5BAAAAAAALAAAAAAgACAAAAIyhI+py+0Po5y02ouz3rx7GgSfEYZfWXYouq1r64qwy8WylgI5bur9CAwKh8Si8YhEFgAAOw==); cursor: pointer; cursor: hand; text-align:center; margin-bottom: 10px;"></div>';
            temp += '<div id="up" style="height:22px; width:32px; color:#ffffff; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeNJREFUeNrsl8tLAlEYxeeOM1oGxSCW44tESJLEpJZFLoISol0PEPLPat+ibNFqIKhVD4QIatHWJ4YPCvNFWljZuTGIRY/RKDdz4DB831w5P787d2BIs9lkFIqFm7KptPitUK/Xa3q9vob6pe2eYnEdrKUBBNYg2FQoFJay2WwgnU7XXS7XkcViOQTINe4/yeuJfP0WinQwAbp2EMH+fD4fTKVSs+gNy0FF+MLtdu8CRNLpdLdKp6EEgAZoETyF4FAymZxHbYP5TyZUIIScejyeLVEUT3ieL8v9rgBoMF8sFkcx6lUEr6Aeg/t+AH6GcyzLHni93m2TyXSu0Wjuv5rIVwBsqVQSEbyYSCTWUU/DQ237qkQNOMlx3L7P59sxGo1XgHr8CEIBSHuzXC4PIXguHo8HUc7AI/TBY7rXAxy12+17ZrM5bDAYYtim1olpTaBSqWgRPBmLxUIoA7D1k33+jehRvXQ4HGGASIIg5OiJIdVqdSCTydii0egyGmvwONzP/I3oP7+Dz5xOZ9hqtR4TSZI20XDDE7DQ4T53K/qg3tCJ0BfRBqz75T53KpolwgsUQM/0ThzL9FgqgAqgAqgAKoAKoAKoAD0HaH2cNhqNfw3GZ9t7AL/f/68AkUjk7foqwACX9rDUyu2FOQAAAABJRU5ErkJggg==); cursor: pointer; cursor: hand; text-align:center; padding: 10px 0px 0px 0px; font-size: 90%; text-shadow: 0 1px 1px rgba( 0, 0, 0, 0.75);">0</div>';
            temp += '<div id="mine" style="height:18px; width:32px; color:#ffffff; background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAALOzs////yH5BAAAAAAALAAAAAAgACAAAAIvhI+py+0Po1QhTFnrhdnup33ieHQk1XknkGYr26pn+9b2jef6zvf+DwwKh8QisAAAOw==); cursor: pointer; cursor: hand; text-align:center; padding: 14px 0px 0px 0px; font-size: 90%; text-shadow: 0 1px 1px rgba( 0, 0, 0, 0.75);">'+mine.length+'</div>';
            temp += '<div id="down" style="height:26px; width:32px; color:#ffffff; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdJJREFUeNrsl11LwmAUx93mC6yLElOYxjBEBDEho4sQQropgyjqG/U9uqgLiy4i8KLLKLCrbgqCLuYLwqZIvmRv0Mr1f+QZLBtkUBNiBw7jnD3P/r+dczZ4mHw+rzlgqqo6rDSXy9W/OvVEJpOxFKBQKHwG0BNWG+sYsdkANoANYAPYADaADWADDAXAMMxoATRN+98teCYvOQJtotlkut3utizLS5IkxZDwwjkLxF8ikchNKBTKMegvERQBsgyQ1WKxmEIcIGeHPxBWw+GwAuETr9e7g/iaoQPG0HYEOp1OularbQBkAfEU3P0Lwj1RFO+CweCFz+fbw1d1itx9X9hkwgnIRLvdngfIZqlUSiMOw3kK+iPjOO4hlUpd+f3+A5Zl80jJ8Hf6LE0HYOlQGGnIgrFWqzUDkLVyubyCOEpyw4BATE0mkxVBEI4AkUPqFv765R8zUAHOAKIZQNzNZjMKkK1KpZKlIONmA4vy9hKJRAPlPsMBdBepc/iT/sbfARhBHLRUxrUcQKbr9XoWIKQis/BJesbU4vH4Iwbs0uPx7CMm5W6Q/g9UVRsGQF/spBveTEAERVEWq9XqeiwWm4Nwl+f5Y9w/hEuDe0xa3LcPAQYAuF+uyd4wHk0AAAAASUVORK5CYII=); cursor: pointer; cursor: hand; text-align:center; padding: 6px 0px 0px 0px;  font-size: 90%; text-shadow: 0 1px 1px rgba( 0, 0, 0, 0.75);">'+newPosts.length+'<br/></div>';
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

	// made by crea7or
	// start of instant search in comments
	if(_$.settings.instant_search == '1' )
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
			for ( var indexOfComment = 0; indexOfComment < commentsHolder.childNodes.length; indexOfComment++ )
			{
				if (commentsHolder.childNodes[indexOfComment].nodeName == 'DIV')
				{
					currentCommentId = commentsHolder.childNodes[indexOfComment].getAttribute('id');
					currentCommentBody = commentsHolder.childNodes[indexOfComment].querySelector('div.dt');
					currentCommentBodyText = currentCommentBody.innerHTML;
					currentCommentHeader = commentsHolder.childNodes[indexOfComment].querySelector('div.p');
					commentUserNameA = currentCommentHeader.getElementsByTagName('a');
					if ( commentUserNameA )
					{
						currentCommentBodyText += " " + commentUserNameA[1].innerHTML;
					}
					currentCommentBody.setAttribute('id', currentCommentId + '-sh-body');
					currentCommentHeader.setAttribute('id', currentCommentId + '-sh-header');
					if ( currentCommentBodyText.search( new RegExp(( inputBox.value +'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1"), 'ig' )) > -1 )
					{
						hideShowLink = currentCommentHeader.getElementById( currentCommentId + '-sh');
						if ( hideShowLink )
						{
							commentShowHide( currentCommentId, true );
						}
					}
					else
					{
						hideShowLink = currentCommentHeader.getElementById( currentCommentId + '-sh');
						if ( hideShowLink == null )
						{
							spaceSpan = document.createElement('span');
							spaceSpan.innerHTML = "&nbsp;&nbsp";
							currentCommentHeader.appendChild( spaceSpan );
							newLinkToShowHide = document.createElement('a');
							newLinkToShowHide.setAttribute('href', '#');
							newLinkToShowHide.setAttribute('id', currentCommentId + '-sh');
							currentCommentHeader.appendChild( newLinkToShowHide );
						}
						commentShowHide( currentCommentId, false );
					}

				}
			}
			return false;
		}

		function commentShowHide( commentId, showIfTrue )
		{
			var commentDiv = document.getElementById( commentId + '-sh-body');
			var commentDivHeader = document.getElementById( commentId + '-sh-header');
			if ( commentDiv )
			{
				if ( showIfTrue )
				{
					if ( instant_search_hide )
					{
						commentDivHeader.parentNode.parentNode.removeAttribute('style');
					}
					else
					{
						commentDiv.removeAttribute('style');
						commentDivHeader.removeAttribute('style');
					}
					var commentAlink = document.getElementById( commentId + '-sh');
					if ( commentAlink )
					{
						commentAlink.setAttribute('onclick', "return commentShowHide('" + commentId + "', false );")
						commentAlink.innerHTML = 'убрать это';
					}
				}
				else
				{
					if ( instant_search_hide )
					{
						commentDivHeader.parentNode.parentNode.setAttribute('style', 'display: none');
					}
					else
					{
						commentDiv.setAttribute('style', 'display: none');
						commentDivHeader.setAttribute('style', 'opacity: 0.5');					
					}
					var commentAlink = document.getElementById( commentId + '-sh');
					if ( commentAlink )
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
		headerTable = document.querySelector('table.category');
		if ( headerTable )
		{
			headerDiv = headerTable.querySelector('tr');
		}
		if ( headerDiv )
		{
			var inputElementTd = document.createElement('td');
			var inputElementDiv = document.createElement('div');
			inputElementDiv.setAttribute('style', 'padding-left: 10px; padding-right: 5px; width: 200px');
			var formElement = document.createElement('form');
			formElement.setAttribute('onsubmit', 'return commentsFilter();');
			var inputElementA = document.createElement('a');
			inputElementA.setAttribute('href', '#');
			inputElementA.setAttribute('onclick', 'return commentsFilter();');
			inputElementA.setAttribute('style', 'float: left;');
			inputElementA.innerHTML = 'Искать:';
			var inputElement = document.createElement('input');
			inputElement.setAttribute('type', 'text');
			inputElement.setAttribute('id', 'js-search-in-comments');
			inputElement.setAttribute('onchange', 'return commentsFilter();');
			inputElement.setAttribute('name', 'js-search-in-comments');
			inputElement.setAttribute('class', 'text_input js-input_default');
			formElement.appendChild( inputElement );
			formElement.appendChild( inputElementA );
			inputElementDiv.appendChild( formElement );
			inputElementTd.appendChild( inputElementDiv);
			headerDiv.insertBefore(  inputElementTd, headerDiv.firstChild );
			_$.injectScript( commentsFilter + "\n" + "var instant_search_hide = " + _$.settings.instant_search_hide + ";" + "\n" + commentShowHide );
		}
		addBenchmark( time1, 'instant search' );
	}
	// end of instant search in comments
}

DSP_init();
//Stasik: now turn on event handlers
supressEvents = false;

}

addBenchmark( dateToCheck1, 'grand total' );
