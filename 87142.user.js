// ==UserScript==
// @name           New comment scroller
// @author         Stasik0
// @namespace      Nothing
// @description    Scrolls showing new comments
// @require        http://sizzlemctwizzle.com/updater.php?id=87142
// @include        http://dirty.ru/*
// @include        http://www.dirty.ru/*
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

			//if(y!==null){
			//	if(document.body.scrollTop) document.body.scrollTop = y;
			//	else document.documentElement.scrollTop = y;
			//}

			//if(x!==null){
			//	if(document.body.scrollLeft) document.body.scrollLeft = x;
			//	else document.documentElement.scrollLeft = x;
			//}
			x=(x==null)?0:x;
			y=(y==null)?0:y;
			window.scrollTo(x,y);
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


//handle new ajax-generated content
_stasik.addEvent(document,"DOMNodeInserted", documentChanged);
	
function documentChanged(event) {
	if(event.target.className != null && event.target.className.indexOf("comment")>-1){
		var comments = _stasik.$c('comment', document, 'div');
		if(comments.length > 0){
		allPostsArr = comments;
		var newPosts = _stasik.$c('new', document, 'div');
		var mine = _stasik.$c('mine', document, 'div');
		var allPosts = comments.length;
		}
	}
}


var comments = _stasik.$c('comment', document, 'div');
var posts = _stasik.$c('post', document, 'div');
if(comments.length > 0){
	allPostsArr = comments;
	var newPosts = _stasik.$c('new', document, 'div');
	var mine = _stasik.$c('mine', document, 'div');
	var allPosts = comments.length;
}else{
	allPostsArr = posts;
	var newPosts = Array();
	var mine = Array();
	var allPosts = posts.length;
	var suffix = '<a href="/user/'+_stasik.getUsername();

	for(var i=0;i<allPostsArr.length;i++){
		inner = _stasik.$c('dd',allPostsArr[i],'div')[0];
		ownComment = false;
		if(inner.innerHTML.indexOf('Написал '+suffix) > -1 || inner.innerHTML.indexOf('Написала '+suffix) > -1 || inner.innerHTML.indexOf('Забанил '+suffix) > -1 || inner.innerHTML.indexOf('Забанила '+suffix) > -1)ownComment = true;
		if(inner.innerHTML.match(/href="\/(comments|my\/inbox)\/([0-9]+)#new">/g) != null){
			newPosts.push(allPostsArr[i]);
			var newLink = (location.pathname.indexOf('/banned')==0)?_stasik.$t('a',inner)[2]:_stasik.$t('a',inner)[3];
			id = newLink.href;
			link = document.createElement("a");
			link.setAttribute("href", "#");
			link.setAttribute("style", "margin-left:5px; display:inline-block;");
			link.setAttribute("title", "Пометить комментарии как прочтённые");
			if(ownComment)link.setAttribute("own", "true");
			link.setAttribute("pos", i);
			link.setAttribute("posId", id);
			link.innerHTML = "<strong>[x]</strong>";
			_stasik.addEvent(link, 'click', function(e){
				if(this.getAttribute("href")==""){e.preventDefault(); return false;}
				pos = this.getAttribute('pos');
				id = this.getAttribute('posId');
				newPosts = removeFromArray(newPosts, allPostsArr[pos]);	
				if(this.getAttribute('own')=="true")mine = removeFromArray(mine, allPostsArr[pos]);
				onScroll();
				this.setAttribute("href", "");
				this.innerHTML = '<img src="http://pit.dirty.ru/dirty/1/2010/10/25/28281-184741-b29db745feb47786dade8a8e50c4f461.gif" style="border:0px;"/>';
				//parent.innerHTML = parent.innerHTML.replace(/ \/ <a(.+)<\/a>/,"");
				_stasik.ajaxLoad(id,function(ajaxObject){
					parent = this.parentNode;
					this.parentNode.removeChild(this);
					//hide link
					parent.innerHTML = parent.innerHTML.replace(/ \/ <a(.+)<\/a>/,"");
					//hide post
					if(_stasik.$('inboxunread') != null && _stasik.$('inboxunread').checked){
						parent.parentNode.parentNode.setAttribute("style","display:none;");
					}
				},this);
				
				e.preventDefault();
				return false;
			});
			_stasik.insertAfter(newLink, link);
		}
		if(ownComment == true){
			mine.push(allPostsArr[i]);
		}
	}
}

function removeFromArray(arr, elem){
	var re = Array();
	for(var i=0;i<arr.length;i++){
		if(arr[i]!=elem)re.push(arr[i]);
	}
	return re;
}


var newPos = 0; 
var newCount = newPosts.length;

var minePos = 0;
if(location.pathname.indexOf('/write/')==-1 && location.pathname.indexOf('/user')==-1){
	var newdiv = document.createElement('div');
	newdiv.style.position = "fixed";
	newdiv.style.top = "50%";
	newdiv.style.right = "1px";
	newdiv.style.zIndex = "100";
	var temp = "";
	temp += '<div id="home" style="height:48px; width:48px; color:#ffffff; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/22/28281-134842-4ceddc75dbe98106ae946b4978c04ef4.png); cursor: pointer; cursor: hand; text-align:center;"></div>';
	temp += '<div id="up" style="height:39px; width:48px; color:#ffffff; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/22/28281-135148-9c441aec7e26f8b2eebd3b6a7482b117.png); cursor: pointer; cursor: hand; text-align:center; padding: 9px 0px 0px 0px;">0</div>';
	temp += '<div id="mine" style="height:24px; width:48px; color:#ffffff; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/22/28281-135207-cb9622b0ba3df356a538b0bce2505276.png); cursor: pointer; cursor: hand; text-align:center; padding: 24px 0px 0px 0px;">'+mine.length+'</div>';
	temp += '<div id="down" style="height:27px; width:48px; color:#ffffff; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/22/28281-135156-95bd6bc0119f252cf72161725d3401e5.png); cursor: pointer; cursor: hand; text-align:center; padding: 21px 0px 0px 0px;">'+newPosts.length+'</div>';
	newdiv.innerHTML = temp;
	document.body.insertBefore(newdiv, document.body.firstChild);

	disableSelection(_stasik.$('mine'));
	disableSelection(_stasik.$('up'));
	disableSelection(_stasik.$('down'));
	
	_stasik.addEvent(_stasik.$('home'), 'click', function(){smoothScroll(0);});
	_stasik.addEvent(_stasik.$('up'), 'click', prev);
	_stasik.addEvent(_stasik.$('down'), 'click', next);
	_stasik.addEvent(_stasik.$('mine'), 'click', my);
	_stasik.addEvent(document, 'scroll', onScroll);
	onScroll();
}


var tempId = 0;
var autoScroll = false;
var gScrollDestination = 0;
var lastDistance = "none";

function onScroll(){
	if(autoScroll)return '';
	var current = _stasik.current_scroll();
	if(newPosts.length > 0){
	var pre = 0;
	var post = newPosts.length;
	for(var i=0;i<newPosts.length;i++){
		if(_stasik.element_position(newPosts[i]).y - Math.round(_stasik.viewarea_size().y/2) <= current.y + 2){
			pre++;
			post--;
		}else{
			break;
		}
	}
	newPos = pre;
	setInnerText(_stasik.$('up'), pre);
	setInnerText(_stasik.$('down'), post);
	}
	if(mine.length > 0){
		for(var i=0;i<mine.length;i++){
			if(_stasik.element_position(mine[i]).y - Math.round(_stasik.viewarea_size().y/2) <= current.y + 2){
			}else{
				break;
			}
		}
		minePos = i%mine.length;
		setInnerText(_stasik.$('mine'), mine.length-i);
	}
}

function setInnerText(element, text){
	var hasInnerText = (_stasik.$t('body')[0].innerText != undefined) ? true : false;
	if(!hasInnerText){
		element.textContent = text;
	} else{
		element.innerText = text;
	}
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
	console.log(newPos);
	if(newPosts.length > 0 )scrollToMiddle(newPosts[newPos]);
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
	recolor = _stasik.$c("comment_inner", elem, "div")[0];
	if(recolor == null){
		recolor = elem;
	}

	if(recolor.style.borderColor != "#fff48d"){
		recolor.style.borderColor = recolor.style.backgroundColor;
		window.setTimeout("var el = document.getElementById('"+getId(recolor)+"'); el.style.backgroundColor = el.style.borderColor; el.style.backgroundColor = '';", 650);
		recolor.style.backgroundColor = "#fff48d";
	}
	var middle = _stasik.element_position(elem).y - Math.round(_stasik.viewarea_size().y/2);
	smoothScroll(middle);
}

function smoothScroll ( y ) {
	var oldScroll = autoScroll;
	autoScroll = true;
	gScrollDestination = y;
	if(!oldScroll){scrollDeamon();}
}

function scrollDeamon(){
	this.x = _stasik.current_scroll().x;
	this.start = _stasik.scroll_position().y;

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
	if ( Math.abs(this.distance) < 10 ) {
		_stasik.scroll_position(gScrollDestination, x);
		lastDistance = "none";
		autoScroll = false;
		onScroll();
		return;
	}
	
	_stasik.scroll_position(this.start + Math.round(this.distance/4.5), x);
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

