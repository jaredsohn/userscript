// ==UserScript==
// @name          Youtube in comments
// @namespace     http://dirty.ru/
// @description   Enables embedding of youtube videos in comments
// @require       http://sizzlemctwizzle.com/updater.php?id=88040
// @include       http://www.dirty.ru/*
// @include       http://dirty.ru/*
// ==/UserScript==

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
	},
	
	injectScript: function(source){
		var inject = document.createElement("script");
		inject.setAttribute("type", "text/javascript");
		inject.textContent = source;
		_$.$t('head')[0].appendChild(inject);
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

//global holder
var youtube_id;

//add link to textarea
var youtube_textarea = _$.getElementsByClassName('textarea_editor')[0];
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
	dsp_output += '<div id="youtube_preview_close" style="float: right; background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:8pt;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div>';
	dsp_output += '<table><tr><td><div style="font-size:14pt;color:#5880af; padding-bottom: 10px;">Youtube preview</div></td><td><div style="float: left";>Картинка в посте</div></td></tr>';
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

//Bonus track

if(_$.location.indexOf('/user/')>=0){
	_$.getElementsByClassName('usermorebutton')[0].style.display = "none";
	_$.injectScript("$('js-user_page_more').toggleClass('hidden');");	
}

//End Bonus

//Add videos in comments


//handle video-posts
//step 1: add youtube links to video posts
var video_posts = _$.getElementsByClassName('post_video');
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

function addPreview(comments){
	var comment_links = comments.getElementsByTagName('a');
	var youtube_links = new Array();
	for(var i=0; i<comment_links.length; i++){
		if(comment_links[i].href.split("youtube.com/").length>1){
			youtube_links.push(comment_links[i]);
		}
	}
	var width = 480;
	var height = 385;
	var button = '<div style="display:inline-block; position:relative; top: -'+(height-14)+'px; left: 2px; background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:8pt;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b style="color: #FFF;">x</b></div>';
	//process youtube links
	for(var i=0; i<youtube_links.length; i++){
		var link = youtube_links[i];
		_$.addEvent(link,'click',function(e){
				var re = processUrl(this.href);
				if(re != false){
					youtube_id = re.id;
					time = re.time;
					if(this.name == ""){
						if(this.parentNode.tagName.toLowerCase()=="td"){
							//it`s a video-post preview
							this.parentNode.setAttribute('name', this.parentNode.width);
							this.parentNode.setAttribute('width', width+46);
						}
						this.setAttribute('name', this.innerHTML);
						this.style.textDecoration = "none";
						this.innerHTML = '<span style="display:inline-block; clear: both; width: '+(width+36)+'px; "><span><object width="'+width+'" height="'+height+'"><param name="movie" value="http://www.youtube.com/v/'+id+'?autoplay=1&start='+time+'&fs=1"></param><param name="allowFullScreen" value="true"></param></param><param name="allowScriptAccess" value="always"></param><embed src="http://www.youtube.com/v/'+id+'?autoplay=1&start='+time+'&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+width+'" height="'+height+'"></embed></object></span>'+button+'</span>';
					}else{
						if(this.parentNode.tagName.toLowerCase()=="td"){
							//it`s a video-post preview
							this.parentNode.setAttribute('width', this.parentNode.getAttribute('name'));
						}
						this.innerHTML = this.getAttribute('name');
						this.style.textDecoration = "underline";
						this.setAttribute('name', "");
					}
					e.preventDefault();
					return false;
				}
			}
		);
	}
}

//handle new ajax-generated content
_$.addEvent(document,"DOMNodeInserted", documentChanged);
	
function documentChanged(event) {
	if(event.target.className != null && event.target.className.indexOf("comment")>-1){
		addPreview(event.target);
	}
}
	
//End end videos in comments

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
	taginf = "<img src=\"http://img.youtube.com/vi/"+youtube_id+"/"+val+".jpg\" width=\"120\">";
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
