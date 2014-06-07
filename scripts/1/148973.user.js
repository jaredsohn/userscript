//
// ==UserScript==
// @name			HabraNavigator
// @author			crea7or, Stasik0
// @namespace		http://habrahabr.ru/
// @description		Navigator for habra posts for effective navigation between the comments
// @match			http://habrahabr.ru/post/*
// @match			http://habrahabr.ru/company/*/blog/*
// @run-at			document-end
// @version			1.01
// ==/UserScript==

var _$ = 
{
	location: window.location.href.split(window.location.host)[1],

	browser: function()
	{
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

	$: function(id)
	{
		return document.getElementById(id);
	},

	$t: function(name,obj)
	{
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

	$f: function(name,element,val)
	{
		var element = element||false;
		var val = val||false;
		var obj,rtn;

		if(document.forms[name]) obj = document.forms[name];
		else obj = name;

		if(element!==false)
		{
			if(isNaN(element)) el = obj.elements[element];
			else el = obj.elements[parseInt(element)];

			if(val!==false)
			{
				if(el.type) rtn = el.value;
				else rtn = el[el.selectedIndex].value;
			}
			else rtn = el;
		}
		else rtn = obj;

		return rtn;
	},

	current_scroll: function()
	{
		var scrollx = (document.scrollX)?document.scrollX:document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft;
		var scrolly = (document.scrollY)?document.scrollY:document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
		return {x:scrollx,y:scrolly}
	},

	element_position: function(el)
	{
		var x = y = 0;

		if(el.offsetParent)
		{
			x = el.offsetLeft;
			y = el.offsetTop;
			while(el = el.offsetParent){
				x += el.offsetLeft;
				y += el.offsetTop;
			}
		}
		return {x:x,y:y}
	},

	document_size: function()
	{
		var y = parseInt(Math.max(document.compatMode!='CSS1Compat'?document.body.scrollHeight:document.documentElement.scrollHeight,_$.viewarea_size().y));
		var x = parseInt(Math.max(document.compatMode!='CSS1Compat'?document.body.scrollWidth:document.documentElement.scrollWidth,_$.viewarea_size().x));
		return {x:x,y:y}
	},

	viewarea_size: function()
	{
		var y = parseInt(((document.compatMode||_$.browser().name=='ie')&&!window.opera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight:(document.parentWindow||document.defaultView).innerHeight);
		var x = parseInt(((document.compatMode||_$.browser().name=='ie')&&!window.opera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth:(document.parentWindow||document.defaultView).innerWidth);
		return {x:x,y:y}
	},

	scroll_position: function(y,x)
	{
		var x = x||null;
		var y = y||null;

		if(x===null&&y===null)
		{
			y = document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
			x = document.body.scrollTop?document.body.scrollLeft:document.documentElement.scrollLeft;
			return {x:x, y:y}
		}
		else
		{
			if(y===null){y = document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;};
			if(x===null){x = document.body.scrollTop?document.body.scrollLeft:document.documentElement.scrollLeft;};
			window.scrollTo(x,y);
		}
	},
	
	addEvent: function(obj,sEvent,sFunc)
	{
		if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
		else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
	},

	addCSS: function(cssStr)
	{
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

	event: function(e)
	{
		e = e||window.event;
		if(e.pageX==null&&e.clientX!=null)
		{
			var html = document.documentElement;
			var body = document.body;
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
		}
		if(!e.which&&e.button) e.which = e.button&1?1:(e.button&2?3:(e.button&4?2:0));
		return e;
	},
}

	function recountComments()
	{
		allComments = _$.$c('comment_item', document, 'div');
		if( allComments.length > 0 )
		{
			newComments = _$.$c('is_new', document, 'div');
			myComments = _$.$c('is_author', document, 'div');
			allCommentsCount = allComments.length;
		}
	}
		
	function documentChanged(event) 
	{
		if(event.target.className != null && event.target.className.indexOf("comment_item")>-1)
		{
			recountComments();
		}
	}

	function removeFromArray(arr, elem)
	{
		var re = Array();
		for( var i = 0 ; i < arr.length; i++ )
		{
			if(arr[i]!=elem)
			{
				re.push(arr[i]);
			}
		}
		return re;
	}

	function my()
	{
		if( myComments.length > 0)
		{
			scrollToMiddle(myComments[myComPos]);
			myComPos = (myComPos+1)%myComments.length;
		}
	}

	function next()
	{
		if( newComments.length > 0 )
		{
			onScrollSupress = true;
			if ( newPos < newComments.length )
			{
				newPos++;
			}
			scrollToMiddle(newComments[newPos - 1]);
			onScrollSupress = false;
		}
	}

	function prev()
	{
		if ( newPos == 0 )
		{
			newPos = 2;
		}
		if( newComments.length > 0 && newPos > 1 )
		{
			onScrollSupress = true;
			newPos--;
			scrollToMiddle(newComments[newPos -1]);
			onScrollSupress = false;
		}
	}

	function getId(elem) 
	{
		prefix = "omgwtf";
		if(elem.id)
		{
			return elem.id;
		}
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
		recolor = _$.$c("info", elem, "div")[0];
		if(recolor == null)
		{
			recolor = elem;
		}

		if(recolor.style.borderColor != "#fff48d")
		{
			recolor.setAttribute("oldColor", recolor.style.backgroundColor);
			recolor.setAttribute("data-timeoutID", window.setInterval("var el = document.getElementById('"+getId(recolor)+"'); el.style.backgroundColor = el.getAttribute('oldColor'); el.removeAttribute('oldColor'); clearInterval(el.getAttribute('data-timeoutID')); el.removeAttribute('data-timeoutID');", 650));
			recolor.style.backgroundColor = "#fff48d";
		}
		var middle = _$.element_position(elem).y + Math.round(elem.clientHeight/2) - Math.round(_$.viewarea_size().y/2);
		var x = _$.current_scroll().x;
		_$.scroll_position(middle, x);
	}

	function scrollDeamon()
	{
		this.x = _$.current_scroll().x;
		this.start = _$.scroll_position().y;
		this.distance = gScrollDestination - this.start;

		if(gScrollDestination == null)
		{
				onScroll();
				return;
		}

		if(lastDistance != "none")
		{
			if(lastDistance == this.distance)
			{
				lastDistance = "none";
				onScroll();
				return;
			}
		}
		
		lastDistance = this.distance;
		if ( Math.abs(this.distance) < 5 ) 
		{
			_$.scroll_position(gScrollDestination, x);
			lastDistance = "none";
			onScroll();
			return;
		}

		_$.scroll_position(this.start + Math.round(this.distance/4.5), x);
		window.setTimeout(scrollDeamon, 30);
	}


	function disableSelection(target)
	{
		if (typeof target.onselectstart!="undefined") //IE route
		{	
				target.onselectstart=function(){return false}
		}
		else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
		{
				target.style.MozUserSelect="none"
		}
		else //All other route (ie: Opera)
		{
				target.onmousedown=function(){return false}
		}
	}

	function scanVisible(array)
	{
		var newArray = Array();
		for( var i=0; i < array.length; i++ )
		{
			if(array[i].style.display != "none")
			{
				newArray.push(array[i]);
			}
		}
		return newArray;
	}

	function setInnerText(elem, text)
	{
		if(elem == null)
		{
			return;
		}
		var hasInnerText = (_$.$t('body')[0].innerText != undefined) ? true : false;
		if(!hasInnerText)
		{
			elem.textContent = text;
		}
		else
		{
			elem.innerText = text;
		}
	}

	function onScroll()
	{
		if ( onScrollSupress )
		{
			return;
		}
		var current = _$.current_scroll();
		if( newComments.length >= 0 )
		{
			var pre = 0;
			var post = newComments.length;
			for(var i = 0; i < newComments.length; i++)
			{
				if(_$.element_position( newComments[i]).y - Math.round(_$.viewarea_size().y/2) <= current.y + 2 )
				{
					pre++;
					post--;
				}
				else
				{
					break;
				}
			}
			newPos = pre;

			setInnerText(_$.$('up'), pre);
			setInnerText(_$.$('down'), post);
		}
		
		if( myComments.length >= 0 )
		{
			for(var i = 0; i < myComments.length; i++)
			{
				if(_$.element_position(myComments[i]).y - Math.round(_$.viewarea_size().y/2) <= current.y + 2)
				{
				}
				else
				{
					break;
				}
			}
			myComPos = i%myComments.length;
			setInnerText(_$.$('mine'), myComments.length-i);
		}
	}


	_$.addCSS('#xpanel { margin-top: -150px; right: 2px !important; };');

	var allComments = _$.$c('comment_item', document, 'div');
	var allCommentsCount = 0;
	var myComments;
	var newComments;
	
	recountComments();

if( allComments.length > 0 )
{
	var eventDispatcher = document.createElement('div');
	var newPos = 0;
	var newCount = newComments.length;
	var myComPos = 0;
	var tempId = 0;
	var onScrollSupress = false;
	var gScrollDestination = 0;
	var lastDistance = "none";

	var newdiv = document.createElement('div');
	newdiv.style.position = "fixed";
	newdiv.style.top = "50%";
	newdiv.style.marginTop = "-72px";
	newdiv.style.right = "2px";
	newdiv.style.zIndex = "100";
	var temp = "";
	temp += '<div id="home" style="height:32px; width:32px; color:#ffffff; background-image: url(http://habrastorage.org/storage2/ca1/3b9/036/ca13b90367b3d0c55e430cd13b914df9.png); cursor: pointer; cursor: hand; text-align:center; margin-bottom: 10px;"></div>';
	temp += '<div id="up" style="height:22px; width:32px; color:#ffffff; background-image: url(http://habrastorage.org/storage2/a1e/f2d/741/a1ef2d74197820e473bf071fc82c7457.png); cursor: pointer; cursor: hand; text-align:center; padding: 10px 0px 0px 0px;">0</div>';
	temp += '<div id="mine" style="height:18px; width:32px; color:#ffffff; background-image: url(http://habrastorage.org/storage2/12f/5e7/b42/12f5e7b42540469e484d2969da2bb376.png); cursor: pointer; cursor: hand; text-align:center; padding: 14px 0px 0px 0px;">'+myComments.length+'</div>';
	temp += '<div id="down" style="height:24px; width:32px; color:#ffffff; background-image: url(http://habrastorage.org/storage2/b65/b93/0a7/b65b930a7aef6bdf5abfba2ab411f753.png); cursor: pointer; cursor: hand; text-align:center; padding: 8px 0px 0px 0px;">'+newComments.length+'</div>';
	newdiv.innerHTML = temp;
	document.body.insertBefore(newdiv, document.body.firstChild);

	disableSelection(_$.$('mine'));
	disableSelection(_$.$('up'));
	disableSelection(_$.$('down'));

	_$.addEvent(_$.$('home'), 'click', function(){ window.scrollTo(_$.current_scroll().x,0);});
	_$.addEvent(_$.$('up'), 'click', prev);
	_$.addEvent(_$.$('down'), 'click', next);
	_$.addEvent(_$.$('mine'), 'click', my);
	_$.addEvent(window, 'scroll', onScroll);

	onScroll();

	_$.addEvent(document,"DOMNodeInserted", documentChanged);
}
