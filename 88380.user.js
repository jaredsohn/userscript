// ==UserScript==
// @name          Miscellaneous
// @namespace     http://dirty.ru/
// @description   Missing stuff 
// @include       http://www.dirty.ru/*
// @include       http://dirty.ru/*
// @require       http://sizzlemctwizzle.com/updater.php?id=88380
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
	
	injectScriptUrl: function(url){
		var inject = document.createElement("script");
		inject.setAttribute("type", "text/javascript");
		inject.setAttribute("src", url);
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
	},
	
	$n: function(element){
		return document.getElementsByName(element);
	},
	
	getUsername: function(){
		elem = _stasik.$c('header_tagline_inner');
		if(elem.length == 1){
			var raw = elem[0].innerHTML.match(/\/users\/[0-9]+">(.*)<\/a>/g);
			if(raw != null){
				return raw[0].split('>')[1].split('<')[0];
			}
		}
		return null;
	}
	//,
	//setInnerText: function(element, text){
	//	var hasInnerText = (_stasik.$t('body')[0].innerText != undefined) ? true : false;
	//	if(!hasInnerText){
	//		element.textContent = text;
	//	} else{
	//		element.innerText = text;
	//	}
	//}
}

//add inbox link
if(_stasik.$('js-header_inbox_link'))_stasik.$('js-header_inbox_link').innerHTML = _stasik.$('js-header_inbox_link').innerHTML.replace("&nbsp;","") + " <span>Инбокс</span>";

//make arrows bigger
apply_links(document);

function apply_links(element){
	var array = _stasik.$c('c_parent',element);
	for(var i=0; i<array.length; i++){
		//array[i].style.textDecoration = "none";
		//array[i].className = "c_answer";
		array[i].innerHTML = "↑↑↑";
		_stasik.addEvent(array[i],"click", prevClicked);
	}

	//var array = _stasik.$c('c_show_user',element);
	//for(var i=0; i<array.length; i++){
	//	array[i].style.textDecoration = "none";
	//	array[i].className = "c_answer";
	//	array[i].innerHTML = ".url";
	//}

	var array = _stasik.$c('c_previous',element);
	for(var i=0; i<array.length; i++){
		//array[i].style.textDecoration = "none";
		//array[i].className = "c_answer";
		array[i].innerHTML = "↓↓↓";
	}
}

function prevClicked(e){
	apply_links(_stasik.$(e.target.getAttribute('replyto')));
	e.preventDefault();
	return false;
}

_stasik.addEvent(document,"DOMNodeInserted", documentChanged);
function documentChanged(event) {
	if(event.target.className != null && event.target.className.indexOf("comment")>-1){
		apply_links(event.target);
	}
}

//recreate inbox link
userlist = "";
var arr = _stasik.$c("js-inboxPerson-name");
for(var i=0;i<arr.length;i++){
	var user = arr[i].innerHTML.replace(/<[^<>]+>/g,'');
	userlist += user+",";
}
var arr = _stasik.$n("banf");
if(arr.length == 1 && userlist.length > 0){
	var form = arr[0];
	var elem = document.createElement("div");
	elem.innerHTML = '[<a href="http://dirty.ru/my/inbox/write/'+userlist.substr(0,userlist.length-1)+'">копировать пользователей</a>]';
	_stasik.insertAfter(form, elem);
}

if(document.location.href.indexOf('http://dirty.ru/my/inbox/write/') > -1 && _stasik.$('js-new_inbox_to_whom_input')){
	var field = _stasik.$('js-new_inbox_to_whom_input');
	if(document.location.href.split('/my/inbox/write/').length > 1){
		field.value = decodeURI(document.location.href.split('/my/inbox/write/')[1]);
	}
}

//user profile statistics + hide ещё link + fix write into inbox link
if(location.pathname.indexOf('/user/')==0){
	var elem = _stasik.$c('user_name_inner');
	if(elem.length == 1){
		var username = elem[0].innerHTML.split('</a></h2>')[0].split('">')[1];
		var ownUsername = _stasik.getUsername();
		
		var div = document.createElement('div');
		div.setAttribute("id", "d3search-userinfo");
		div.setAttribute("class", "userstat");
		_stasik.$c("userstats")[0].appendChild(div);
		
		_stasik.injectScriptUrl("http://d3search.ru/wazzup?username=" + encodeURI(username) + "&ownUsername=" + encodeURI(ownUsername)+"&container=d3search-userinfo");
	}

	_stasik.getElementsByClassName('usermorebutton')[0].style.display = "none";
	_stasik.injectScript("$('js-user_page_more').toggleClass('hidden');");	
		
	//_stasik.$c('userinboxwrite')[0].innerHTML = _stasik.$c('userinboxwrite')[0].innerHTML.replace("/my/inbox/write/","/my/inbox/write/?");
}

//как там всё - tool
if(location.pathname.indexOf('/write/')==0){
	for(var i=0;i<4;i++){
		var prevButton = _stasik.$c('preview_btn')[i].getElementsByTagName('img')[0];
		_stasik.addEvent(prevButton, 'click', addIframe);
	}
	
	//hide preview if broken
	window.setInterval(function(){
		var pre = _stasik.$c('write_form_preview')[0];
		if(pre.innerHTML.indexOf('/error/1.jpg')>-1){
				pre.innerHTML = 'Родной просмотр выдал ошибку.';
		}
	}, 200);
}

function addIframe(e){
	var form = _stasik.$(e.target.getAttribute('onclick').split("$('")[1].split("')")[0]);
	var comment = _stasik.$t('textarea',form)[0].value;
	
	link = "";
	var arr = _stasik.$t('input',form);
	for(var i=0;i<arr.length;i++){
		if(arr[i].name == "link")link = arr[i].value;
	}
	if(link == "http://")	link="";
	
	var div = document.createElement('div');
	div.setAttribute("id", "d3search-postinfo");
	div.setAttribute("class", "userstat");
	if(_stasik.$('d3search-postinfo')!=null)_stasik.$('d3search-postinfo').parentNode.removeChild(_stasik.$('d3search-postinfo'));
	form.insertBefore(div, _stasik.$c("submit_btn", form)[0]);
	
	_stasik.injectScriptUrl("http://d3search.ru/wazzup?post="+encodeURIComponent(comment)+"&link="+encodeURIComponent(link)+"&container=d3search-postinfo");
}

//Ссылка на статистику d3search
if(location.pathname.indexOf('/users/')==0){
	var img = _stasik.$t('img', _stasik.$('generic-wrapper'))[4];
	var div = document.createElement('div');
	div.innerHTML = '<a href="http://d3search.ru/stat">Статистика на d3search.ru</a><br>';
	img.parentNode.insertBefore(div, img);
}

//Правим кодировку в бан бложике
//Greetz to NickJr
if(location.pathname.indexOf('/banned')==0 || document.referrer.indexOf('/banned')>-1 || (location.pathname.indexOf('/comments')>-1 && _stasik.$c('b-tag_add_form').length == 0)){
	var posts = _stasik.$c("dt").concat(_stasik.$c("c_body"));
	//problem: the table has collisions
	var table = {
		'Ð»Ð¾Ð¿Ð°ÑÐ¾Ð¹':'лопатой',
		'Ð´Ð¾':'до',
		'Ð·Ð°':'за',
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
		'Ð':'Н'
	};

	for(var i=0;i<posts.length;i++){
		txt_str = posts[i].innerHTML;
		for(var index in table) txt_str = txt_str.split(index).join(table[index]);
		posts[i].innerHTML = txt_str;
	}
}


