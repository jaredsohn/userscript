// ==UserScript==
// @name          Dirty Karma Log
// @namespace     http://dirty.ru/
// @description   Logs karma change reasons on d3
// @include       http://www.dirty.ru/user/*
// @include       http://dirty.ru/user/*
// @require       http://sizzlemctwizzle.com/updater.php?id=85611
// ==/UserScript==

var _stasik = {

	settings: {},
	location: window.location.href.split(window.location.host)[1],

	set_save: function(name,option){

		if(option.toString().indexOf('"')>-1){
			option = option.toString().replace(/"/g,'\\"');
		}

		if(document.cookie.indexOf('dsp.settings=')>-1){
			var param = unescape(document.cookie.split('dsp.settings=')[1].split(";")[0]);

			if(param.indexOf(name+':')>0){
			eval("var temp_name = name+':\"'+_stasik.settings."+name+".split('\"').join('\\\\\"')+'\"';");
				param = param.split(temp_name).join(name+':"'+option+'"');
			}
			else param = param.split('}').join(','+name+':"'+option+'"}');

			document.cookie = "dsp.settings="+escape(param)+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
			eval("_stasik.settings="+unescape(param));
		}
		else{
			document.cookie = "dsp.settings="+escape('{'+name+':"'+option+'"}')+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
		}
	},

	set_get: function(){

		if(document.cookie.indexOf('dsp.settings=')>-1){
			var param = unescape(document.cookie.split('dsp.settings=')[1].split(";")[0]);
			eval("_stasik.settings="+unescape(param));
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

	$c: function(name,obj,tagName){
		if(tagName==null){tagName='*'};
		var obj = obj||document;

		var Array = [];
		var checkArray = obj.getElementsByTagName(tagName);

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

		var y = parseInt(Math.max(document.compatMode!='CSS1Compat'?document.body.scrollHeight:document.documentElement.scrollHeight,_stasik.viewarea_size().y));
		var x = parseInt(Math.max(document.compatMode!='CSS1Compat'?document.body.scrollWidth:document.documentElement.scrollWidth,_stasik.viewarea_size().x));
		return {x:x,y:y}
	},

	viewarea_size: function(){

		var y = parseInt(((document.compatMode||_stasik.browser().name=='ie')&&!window.opera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight:(document.parentWindow||document.defaultView).innerHeight);
		var x = parseInt(((document.compatMode||_stasik.browser().name=='ie')&&!window.opera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth:(document.parentWindow||document.defaultView).innerWidth);
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
				_stasik.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
			};
			ajaxObject.open('GET',url,true);
			ajaxObject.send(null);
		}
		else if (window.ActiveXObject){
			var ajaxObject = new ActiveXObject('Microsoft.XMLHTTP');
			if (ajaxObject){
				ajaxObject.onreadystatechange = function(){
					_stasik.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
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
				_stasik.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
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
		var head = _stasik.$t('head')[0];
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
		_stasik.$t('head')[0].appendChild(inject);
	},
	
	insertAfter: function (referenceNode, node) {
		referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
	},
	
	getElementsByClassName: function(className, parentElement, tagName) {
		if(tagName==null){tagName='*'};
		if(parentElement==null){parentElement = document.body;}
		var children = parentElement.getElementsByTagName(tagName);
		var elements = [], child;
		for (var i = 0, length = children.length; i < length; i++) {
			child = children[i];
			if (child.className == className || child.className.indexOf(className+" ") > -1 || child.className.indexOf(className+" ") < -1)
				elements.push(child);
		}
		return elements;
	}

}

if(_stasik.$c("vote_button_plus_left")[0])_stasik.addEvent(_stasik.$c("vote_button_plus_left")[0], "click", carmaUpdate);
if(_stasik.$c("vote_button_plus_right")[0])_stasik.addEvent(_stasik.$c("vote_button_plus_right")[0], "click", carmaUpdate);
if(_stasik.$c("vote_button_minus_left")[0])_stasik.addEvent(_stasik.$c("vote_button_minus_left")[0], "click", carmaUpdate);
if(_stasik.$c("vote_button_minus_right")[0])_stasik.addEvent(_stasik.$c("vote_button_minus_right")[0], "click", carmaUpdate);

var updatesPending = 0;
function carmaUpdate(e){
	//alert(e.target.style.backgroundColor);
	waitUntilVoted(e.target, _stasik.$c('vote_result')[0].innerHTML);
}

function waitUntilVoted(elem, oldValue){
	if(elem.className.indexOf("js-lh_active") > -1){
		window.setTimeout(function(){waitUntilVoted(elem, oldValue);}, 100);
	}else{
		var newValue = _stasik.$c('vote_result')[0].innerHTML;
		if((newValue-oldValue) > 0){
			updateEntry(1);
		}else if((newValue-oldValue) < 0){
			updateEntry(-1);
		};
	}
}

function updateEntry(value){
	var oldtext = _stasik.$('js-usernote').firstChild.nodeValue;
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
			_stasik.$('js-usernote').firstChild.nodeValue = oldtext.substr(0, date.length+8) + (olddelta+value) + oldtext.substr(date.length+9);
			newEntry = false;
		}
	}
	if(newEntry){
		var reason = prompt("Почему?", "");
		if(reason == null){reason = "";};
		_stasik.$('js-usernote').firstChild.nodeValue = date+' Карма '+sign+Math.abs(value)+': '+reason.replace(/\./g, "")+'. '+oldtext;
	}
	fireEvent(_stasik.$('js-usernote'), 'click');
	fireEvent(document, 'click');
}

function fireEvent(element,event){
    if (document.createEventObject){
    // dispatch for IE
    var evt = document.createEventObject();
    return element.fireEvent('on'+event,evt)
    }
    else{
    // dispatch for firefox + others
    var evt = document.createEvent("MouseEvents");
    evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
    }
}
