//
// ==UserScript==
// @name			Lepra Service Pack 1
// @author			Stasik0, BearOff, crea7or, flashface, slavka123
// @namespace		http://leprosorium.ru/
// @description		Lepra Service Pack 1 (based on Dirty Service Pack 2.5 )
// @require			http://crea7or.spb.ru/scripts/user.js.updater.php?id=96606&days=1
// @include			http://*.leprosorium.ru/*
// @include			http://leprosorium.ru/*
// @version        0.0.6
// @run-at			document-end
// ==/UserScript==

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Funtions and Params

* * * * * * * * * * * * * * * * * * * * * * * * * */
var dateToCheck1 = new Date();

var _$ = {
    settings: {},
    settings_colors: new Array(),
    location: window.location.href.split(window.location.host)[1],

    // made by crea7or
    // start of SCRIPTS-71
    set_save: function(name, option)
    {
        if (name != null)
        {
            _$.settings[name] = option;
        }
        localStorage.setItem('dirtySp', jsonStringify(_$.settings));
        localStorage.setItem('dirtyCommentsColors', jsonStringify(_$.settings_colors));
    },
    set_get: function()
    {
           _$.settings = jsonParse(localStorGetItem('dirtySp', "{}"));
           _$.settings_colors = jsonParse(localStorGetItem('dirtyCommentsColors', "[]"));
           if (_$.settings_colors == "[]" || _$.settings_colors.constructor === undefined || _$.settings_colors.constructor != Array)
           {
               _$.settings_colors = new Array();
           }
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
                //				else alert('There was a problem retrieving the XML data:\n'+ajaxObject.statusText);
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

    getNumber: function()
    {
        elem = _$.$c('header_tagline_inner');
        if (elem.length == 1)
        {
            var raw = elem[0].innerHTML.split('dirty.ru/users/')[1].split('"')[0];
            return raw;
        }
        return "";
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
if( typeof _$.settings.use_pictures == "undefined") { _$.settings.use_pictures = 1; settingsSave = true; }
if( typeof _$.settings.username_replace == "undefined") { _$.settings.username_replace = 0; settingsSave = true; }
if( typeof _$.settings.youtube_fullscreen == "undefined") { _$.settings.youtube_fullscreen = 1; settingsSave = true; }
if( typeof _$.settings.colors_on == "undefined") { _$.settings.colors_on = 0; settingsSave = true; }
if( typeof _$.settings.colors_border == "undefined") { _$.settings.colors_border = 1; settingsSave = true; }
//SP2 adding scripts - STEP ONE
if( typeof _$.settings.dirty_avatar == "undefined") { _$.settings.dirty_avatar = 1; settingsSave = true; }
if( typeof _$.settings.instant_search == "undefined") { _$.settings.instant_search = 1; settingsSave = true; }
if( typeof _$.settings.instant_search_hide == "undefined") { _$.settings.instant_search_hide = 1; settingsSave = true; }
if( typeof _$.settings.arrows_on == "undefined") { _$.settings.arrows_on = 1; settingsSave = true; }
if( typeof _$.settings.d3search == "undefined") { _$.settings.d3search = 1; settingsSave = true; }
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

	function DSP_make_General_Bar()
	{
		var dsp_output = dsp_bars = dsp_params = '';
		var dsp_left_panel = _$.$c('layout_left')[0];
		for(var i=0; i<6; i++)
		{
				dsp_bars += '<div id="dsp_setting_button_'+i+'" style="background-color:#edf1f6;width:140px;height:30px;line-height:30px;border-top:1px solid #edf1f6;border-right:1px solid #b6b6b6">&nbsp;</div>';
				dsp_params += '<div id="dsp_setting_'+i+'" style="padding:10px 0 0 10px;display:none;border-top:1px solid #b6b6b6"></div>';
		}

		dsp_output += '<br><div style="background: #fff url(http://pit.dirty.ru/dirty/1/2010/04/27/11119-033725-660249a537b6f5822a9918ea8835026b.png) 7px 4px no-repeat;height:50px;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9"><a id="dsp_setting_bar" style="cursor:pointer;text-decoration:underline;line-height:50px;margin-left:62px">Настройки</a></div>';
		dsp_output += '<div id="_$.settings" style="display:none;position:fixed;top:'+((_$.viewarea_size().y-300)/2)+'px;left:'+((_$.viewarea_size().x-610)/2)+'px;width:610px;height:300px;z-index:2999"><table cellspacing="0" cellpadding="0" border="0" width="610" height="300"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" valign="top">';
		dsp_output += '<table cellspacing="0" cellpadding="0" width="100%" border="0" style="font-size: 110%;"><tr><td valign="top" colspan="1" height="30" style="font-size:140%;color:#5880af;"><a href="http://userscripts.org/scripts/show/96606">Service Pack 1</a></td><td valign="top" colspan="1" height="30" style="padding-left:5px; font-size:8%;color:#5880af;"></td><td width="40" align="right" valign="top"><div id="dsp_setting_close" style="background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div></td></tr><tr><td valign="top" width="140" style="">'+dsp_bars+'</td><td colspan="2" valign="top">'+dsp_params+'</td></tr></table>';
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
}

function dsp_general_init(){
	//SP2
	add_checkbox_event('dsp_c_youtube_preview','youtube_preview');

	if(_$.browser().name != "chrome")add_checkbox_event('dsp_c_smooth_scroll','smooth_scroll');
	_$.addEvent(_$.$('dsp_c_comment_scroller'),'click',
	function()
	{
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
	//SP2
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

	_$.addEvent(_$.$('dsp_c_youtube_fullscreen'),'click',
		function(){
			if(_$.$('dsp_c_youtube_fullscreen').checked===true) _$.set_save('youtube_fullscreen',1);
			else _$.set_save('youtube_fullscreen',0);
		});
}

function dsp_comments_init(){

	//SP2
	add_checkbox_event('dsp_c_arrows_on','arrows_on');
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
	add_checkbox_event('dsp_c_inbox_recreate','inbox_recreate');
	add_checkbox_event('dsp_c_timings_display','timings_display');

}

function DSP_make_content_settings(){

	if(_$.$('dsp_setting_button_0').innerHTML.length<10)
	{

		var dsp_txt = '<table cellspacing="0" border="0">';
		//SP2 adding scripts - STEP TWO
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
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_username_replace" type="checkbox" '+((_$.settings.username_replace=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_username_replace">Заменять %username% на ваше имя</label></td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_favicon_on" type="checkbox" '+((_$.settings.favicon_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_favicon_on">Показывать иконку сайта ссылки:</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_favicon" style="display:'+((_$.settings.favicon_on=='1')?'block':'none')+'"><form style="margin:0"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td align="right" width="45"><input name="dsp_favicon_s" value="1" id="dsp_c_favicon_style_a" type="radio" '+((_$.settings.favicon_style=='1')?'checked="checked"':'')+'></td><td style=";color:#777"><label for="dsp_c_favicon_style_a">при наведении - над ссылкой</label></td></tr>';
		dsp_txt += '<tr><td align="right"><input name="dsp_favicon_s" value="0" id="dsp_c_favicon_style_b" type="radio" '+((_$.settings.favicon_style=='0')?'checked="checked"':'')+'></td><td style=";color:#777"><label for="dsp_c_favicon_style_b">всегда перед ссылкой</label></td></tr>';
		dsp_txt += '</table></form>';
		dsp_txt += '</div>';

		DSP_make_Setting_Bar('Общие',dsp_txt,'dsp_general_init()');

		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_dirty_tags" type="checkbox" '+((_$.settings.dirty_tags=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_dirty_tags">Lepro Tags</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_dirty_tags" style="display:'+((_$.settings.dirty_tags=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left: 25px;">';
		dsp_txt += '<tr><td align="right" width="25"><input id="dsp_c_dirty_tags_autogold" type="checkbox" '+((_$.settings.dirty_tags_autogold=='1')?'checked="checked"':'')+'></td><td><label for="dsp_c_dirty_tags_autogold">Ставить автоматически "Золотой пост"</label></td></tr>';
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
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_youtube_fullscreen" type="checkbox" '+((_$.settings.youtube_fullscreen=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_youtube_fullscreen">Кнопка "Fullscreen" в постах с видеороликами youtube</label></td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Посты',dsp_txt,'dsp_posts_init()');

		dsp_txt = '<table cellspacing="0" border="0">';
		//SP2
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_arrows_on" type="checkbox" '+((_$.settings.arrows_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_arrows_on">Увеличить стрелочки под комментарием</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_colors_on" type="checkbox" '+((_$.settings.colors_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_colors_on">Изменять цвет комментариев пользователей</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_colors" style="display:'+((_$.settings.colors_on=='1')?'block':'none')+'"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_colors_border" type="checkbox" '+((_$.settings.colors_border=='1')?'checked="checked"':'')+'></td><td style="color:#777"><label for="dsp_c_colors_border">Выделять рамкой новые комментарии</label></td></tr>';
		dsp_txt += '</table></div>';

		DSP_make_Setting_Bar('Комментарии',dsp_txt,'dsp_comments_init()');
		
		dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_d3search" type="checkbox" '+((_$.settings.d3search=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_d3search">Замена поиска на <a href="http://leprosearch.ru" target="_blank">leprosearch.ru</a></label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_new_window" style="display:'+((_$.settings.d3search=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left:20px;">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_new_window" type="checkbox" '+((_$.settings.new_window=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_new_window">Результаты поиска в новом окне</label></td></tr>';
		dsp_txt += '</table></div>';
		
		DSP_make_Setting_Bar('Поиск',dsp_txt,'dsp_d3search_init()');

		dsp_txt = '<table cellspacing="0" border="0">';
		//SP2
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

	// start favicons
	if (_$.settings.favicon_on == '1' && _$.settings.use_pictures == '1')
	{
		//global vars + some config
		var domainArray = new Object();
		var faviconUrls = new Array();
		var faviconImages = new Array();
		var faviconsAtOnce = 40;
		var query = "http://favicon.yandex.net/favicon/";
		//

		objectSize = function(obj)
		{
			var size = 0, key;
			for (key in obj)
			{
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		};

		function DSP_show_favicon(obj, show)
		{
			if (show == 1)
			{
				var favicon = 'http://favicon.yandex.net/favicon/' + obj.toString().split('/')[2];
				obj.style.paddingTop = '16px';
				obj.style.backgroundImage = 'url(' + favicon + ')'; //,url(http://pit.dirty.ru/dirty/1/2010/10/31/28281-154853-236c6922bc86581a4d9fbf18719fb16b.png)';
				obj.style.backgroundRepeat = 'no-repeat'; //, no-repeat';
			}
			else obj.style.backgroundImage = 'none';
		}

		if (_$.location.indexOf('/user/') < 0)
		{
			var time1 = new Date();
			dsp_elements = _$.$t('a', _$.$('js-posts_holder'));
			if (_$.settings.favicon_style == '1')
			{
				for (var i = 0; i < dsp_elements.length; i++)
				{
					if (dsp_elements[i].toString().indexOf('http://') != -1 && dsp_elements[i].toString().indexOf('dirty.ru/') < 0)
					{
						_$.addEvent(dsp_elements[i], 'mouseover', function(e) { DSP_show_favicon(e.target, 1); });
						_$.addEvent(dsp_elements[i], 'mouseout', function(e) { DSP_show_favicon(e.target, 0); });
					}
				}
			}
			else
			{
				for (var i = 0; i < dsp_elements.length; i++)
				{
					if (dsp_elements[i].toString().indexOf('http://') != -1 && dsp_elements[i].toString().indexOf('dirty.ru/') < 0)
					{
						domainArray[dsp_elements[i].toString().split('/')[2]] = objectSize(domainArray);
					}
				}
				//forming query for yandex			
				list = "";
				var counter = 0;
				for (var domain in domainArray)
				{
					list += domain + '/';
					counter++;
					if (counter == faviconsAtOnce)
					{
						faviconUrls[faviconUrls.length] = query + list;
						list = "";
						counter = 0;
					}
				}
				//some unsubmitted icons?
				if (counter > 0) faviconUrls[faviconUrls.length] = query + list;
				for (var i = 0; i < dsp_elements.length; i++)
				{
					if (dsp_elements[i].toString().indexOf('http://') != -1 && dsp_elements[i].toString().indexOf('leprosorium.ru/') < 0)
					{
						//var favicon = 'http://favicon.yandex.net/favicon/'+dsp_elements[i].toString().split('/')[2]+'/dirty.ru/';
						domain = dsp_elements[i].toString().split('/')[2];
						domainNr = domainArray[domain];
						imageNr = Math.floor(domainNr / faviconsAtOnce);
						offset = (domainNr - faviconsAtOnce * imageNr) * 16;
						dsp_elements[i].style.paddingLeft = '19px';
						dsp_elements[i].style.backgroundRepeat = 'no-repeat'; //, no-repeat';
						dsp_elements[i].style.backgroundPosition = "0px -" + offset + "px";
						dsp_elements[i].style.backgroundImage = 'url(' + faviconUrls[imageNr] + ')';
						//dsp_elements[i].style.backgroundImage = 'url('+favicon+')';//,url(http://pit.dirty.ru/dirty/1/2010/10/31/28281-154853-236c6922bc86581a4d9fbf18719fb16b.png)';
					}
				}

			}
			addBenchmark(time1, 'favicons');
		}
		function submitFavQuery()
		{
		}
	}
	// end favicons
	
// Username replace
if(_$.settings.username_replace=='1')
{
	var time1 = new Date();
	DSP_replace_username(1);
	addBenchmark( time1, '%username% replace' );
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *
		Youtube Video Enhancer
* * * * * * * * * * * * * * * * * * * * * * * * * */

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

//preview posts
function addEvent(obj,sEvent,sFunc)
{
	if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
	else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
}

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

var vPrvDiv = document.querySelector('div.bottom_left');
if ( vPrvDiv )
{
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', 'margin-right: 30px; float: right;');
	newdiv.innerHTML = "<a href=\"#\" id=\"prevLink\" class=\"dashed\" style=\"color: black; font-size: 11px;\">предпросмотр</a>";
	vPrvDiv.parentNode.insertBefore( newdiv, vPrvDiv );
	addEvent(document.getElementById('prevLink'), "click", vPreview);
	addEvent(document.getElementById('js-post-yarrr'), "click", vRemovePreview);
}

// start of the dirty ranks script
function setRankToNote( ranksName )
{
	ranksNote= document.getElementById('js-usernote_inner').innerHTML;
	ranksIndex = ranksNote.indexOf('#');
	if ( ranksIndex > -1 )
	{
		// some name already in the note
		ranksNote = ranksNote.substring( 0, ranksIndex );
		if ( ranksName != null )
		{
			document.getElementById('js-usernote_inner').innerHTML = ranksNote + " #" + ranksName;
		}
		else
		{
			document.getElementById('js-usernote_inner').innerHTML = ranksNote;
		}
		_$.fireEvent(document.getElementById('js-usernote_inner'), 'click');
		_$.fireEvent(document, 'click');
	}
	else
	{
		// no name at all
		if ( ranksName != null )
		{
			document.getElementById('js-usernote_inner').innerHTML = ranksNote + " #" + ranksName;
		}
	}
}

function setNewRank( e )
{
	var ranksDivUser = document.querySelector('div.usernote_inner');
	if ( ranksDivUser )
	{
		ranksA = document.querySelector('h2.username');
		ranksUserName = ranksA.firstChild.innerHTML;
		ranksName = prompt('Как назовём?', getRankByUsername( ranksUserName ));
		if( ranksName )
		{
			if ( ranksName.indexOf('#') > -1 )
			{
				ranksName = null;
			}
			saveRanks( ranksUserName, ranksName );
			setRankToNote( ranksName );
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
	return jsonParse( localStorGetItem('dirtyRanks', "[]"));
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

if ( document.location.href.indexOf("leprosorium.ru/users/") >= 0 )
{
	// user page
	var time1 = new Date();
	var ranksUserName;
	var ranksDivUser = document.querySelector('div.usernote_inner');
	if ( ranksDivUser )
	{
		ranksA = document.querySelector('h2.username');
		ranksA.firstChild.setAttribute('href', '#');
		ranksUserName = ranksA.firstChild.innerHTML;
		_$.addEvent( ranksA.firstChild, "click", setNewRank );

		ranksNoteRank = null;
		ranksNote = document.getElementById('js-usernote_inner').innerHTML;
		ranksIndex = ranksNote.indexOf('#');
		if ( ranksIndex > -1 )
		{
			ranksNoteRank = ranksNote.substring( ranksIndex + 1 , ranksNote.length );
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
	var ranksComments = document.location.href.indexOf("leprosorium.ru/comments/");
	// main page
	var ranksDivDD = document.querySelectorAll('div.p');
	if ( ranksDivDD )
	{
		for ( ranksInd = 0; ranksInd < ranksDivDD.length; ranksInd++ )
		{	
			if ( ranksDivDD[ranksInd].children.length > 1 )
			{
				if ( ranksComments > -1 )
				{
					ranksUserName = ranksDivDD[ranksInd].childNodes[3].innerHTML;
				}
				else
				{
					ranksUserName = ranksDivDD[ranksInd].childNodes[1].innerHTML;
				}
				ranksNameSet = getRankByUsername(  ranksUserName );
				if ( ranksNameSet != null )
				{
					if ( ranksComments > -1 )
					{
						ranksTxt = ranksDivDD[ranksInd].childNodes[2].nodeValue;
					}
					else
					{
						ranksTxt = ranksDivDD[ranksInd].firstChild.nodeValue;
					}
					ranksIndSp = ranksTxt.indexOf(' ');
					if ( ranksIndSp > -1 )
					{
						ranksModText = ranksTxt.substring( 0, ranksIndSp );
						ranksModText +=  " " + ranksNameSet + " ";
						if ( ranksComments > -1 )
						{
							ranksDivDD[ranksInd].childNodes[2].nodeValue = ranksModText;
						}
						else
						{
							ranksDivDD[ranksInd].firstChild.nodeValue = ranksModText;
						}
					}
				}
			}		
		}
	}		
	}
	addBenchmark( time1, 'dirty ranks' );
}
// end of the dirty ranks script


//add Youtube to textarea
//BIG BLOCK
//begin shared

//end shared

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

function processUrl(url)
{
	var rawid = url.split("v=")[1];
	if(rawid == null || rawid.length==0)
	{
		return false;
	}
	id = rawid.replace(/(&|#).+/g, "");
	var time = -1;
	var timeraw = url.split("t=")[1];
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
			
		width = 800;
		var height = 600;
		var button = '<div style="display:inline-block; position:relative; top: -'+(height-14)+'px; left: 2px; background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b style="color: #FFF;">x</b></div>';
		//process youtube links
		for(var i=0; i<youtube_links.length; i++)
		{
			var link = youtube_links[i];
			_$.addEvent(link,'click',function(e)
			{
					var re = processUrl(this.href);
					if(re != false)
					{
						youtube_id = re.id;
						time = re.time;
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
							for(var link in arr){
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



		width = 800;
		height = 600;
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
			if (changeIt)
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

		function documentChanged(event) {
			if (supressEvents) {
				return;
			}
			if(event.target.className != null && event.target.className.indexOf("comment")>-1){
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

	// set gold tag
	function checkGoldTag()
	{
		var postGoldTag = document.getElementsByClassName('stars');
		var postSilverTag = document.getElementsByClassName('wasstars');
		if ( postSilverTag.length > 0 || postGoldTag.length > 0 )
		{
//			if ( document.querySelector('li#js-personal_tag_72') == null )
//			{
				// add  gold
				_$.injectScript("addTag( 'Золотой пост' )");
//			}
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
			if ( _$.settings.dirty_tags_autogold == 1 )
			{
				document.onLoad = checkGoldTag();
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

	// made by crea7or
	// start of dirty avatar
	if(_$.settings.dirty_avatar == '1' && location.pathname.indexOf('/users/') > -1 )
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
					if ( altAttr.toLowerCase().indexOf('lepra avatar') > -1 )
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
}

DSP_init();
//Stasik: now turn on event handlers
supressEvents = false;

}

addBenchmark( dateToCheck1, 'grand total' );
