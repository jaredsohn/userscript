// ==UserScript==
// @name            Forum Auto Pager
// @namespace       http://
// @description     Auto Pager for forum
// Discuz
// @include         http://*/viewthread.php?*
// @include         http://*/thread-*-*-*.html
// @include         https://*/viewthread.php?*
// @include         https://*/thread-*-*-*.html
// vBulletin
// @include         http://*/showthread.php?*
// @include         http://*/thread/*
// @include         http://*/thread*.html
// @include         https://*/showthread.php?*
// @include         https://*/thread/*
// @include         https://*/thread*.html
// @version     0.5.2
// ==/UserScript==

//
// Version history:
// Version 0.5.1:
// vBulletin 3.8 module updated
//
// Version 0.5.2:
// updated by muziling: Add Discuz7 support and page which have no generator content,then check page right info.

(function(){

if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(func, scope) {
		scope = scope || this;
		for (var i = 0, l = this.length; i < l; i++)
			func.call(scope, this[i], i, this); 
	}
}

Function.prototype.bind = function() {
	var __method = this, args = Array.prototype.slice.call(arguments,0), object = args.shift();
	return function() {
		return __method.apply(object, args.concat(Array.prototype.slice.call(arguments,0)));
	}
}

})();

(function(){

var AutoPager = function(){
	var plugin = null;
	var remain = -1;
	var Remain = function(){	
		if (document.compatMode == "CSS1Compat"){
			return {
				valueOf : function() {
					var sc = document.documentElement.scrollTop;
					var total = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
					var remain = total - sc;
					return total - sc;
				}
			};
		} else if (document.compatMode == "BackCompat" || document.compatMode == "" || document.compatMode == null){
			return {
				valueOf : function() {
					var sc = document.body.scrollTop;
					var total = (document.body.scrollHeight - document.body.clientHeight);
					var remain = total - sc;
					return remain;
				}
			};
		}
	}();
  
	var monitorScroll = function() {
		var self = arguments.callee;
		var remain_tmp = Remain.valueOf();
		if (remain != remain_tmp){
			remain = remain_tmp;
			plugin.onScroll(remain);
		}
		setTimeout(self,150);
	};
	
	return {
		init : function(inPlugin){
			plugin = inPlugin;
			plugin.init();
			monitorScroll();
		}
	};
}();

window.AutoPager = AutoPager;

var AutoPagerComponent = function(){
	function init_protected(protected){
		protected.insertPoint=null;
		protected.maxPage=1;
		protected.requested=1;
		protected.nextPage=2;
		protected.scrollRange=1900;
		protected.url=null;
		protected.disabled=false;
		var $this=null;
		protected.infoBox={
			timer: null,
			startTime : 0,
			action : null,
			state : null,
			box : null,
			text : null,
			options: {
				hideDelay : 325,
				interval : 40,
				moveLength : 10
			},
			init: function(){
				$this=this;
				var div = document.createElement('div');
				div.setAttribute("style", "border: solid 1px; position: fixed; right: -200px; bottom: 100px; width: 200px; line-height: 50px;height: 50px;background-color: #ff5; opacity: 0.78;text-align: center; vertical-align: middle;");
				var text = document.createTextNode('');
				div.appendChild(text);
				div.id='_infoBox';
				document.body.appendChild(div);
				$this.text = text;
				$this.box = div;
				$this.action='idle';$this.state='hided';
			},
			setText: function(input){
				if (!$this.action) alert('setText');
				$this.text.nodeValue = input;
				return $this;
			},
			show: function(){
				if (!$this.action) alert('show');
				if ($this.action != 'showing' && $this.state != 'showed'){
					$this.action='showing';$this.state='showing';
					if (!$this.timer)
						$this.timer=setInterval($this.slide,$this.options.interval);
				}
				return $this;
			},
			hide: function(){
				if (!$this.action) alert('hide');
				if ($this.action != 'hiding' && $this.state != 'hided' && $this.state != 'wantToHide'){
					$this.state='wantToHide';
					$this.startTime=(new Date()).valueOf();
					if (!$this.timer)
						$this.timer=setInterval($this.slide,$this.options.interval);
				}
				return $this;
			},
			slide: function(){
				var value=parseInt($this.box.style.right.toString().match('-?\\d+'));				
				if ($this.action == 'hiding'){
					if (value<=-200){
						$this.action = 'idle';						
						if($this.state=='hiding')
							$this.state='hided';
					} else {
						var result=value-$this.options.moveLength + 'px';
						$this.box.style.right = result;
					}
				} else if ($this.action == 'showing'){
					if (value>=0){
						$this.action = 'idle';
						if($this.state=='showing')
							$this.state='showed';
					} else {
						var result=value+$this.options.moveLength + 'px';
						$this.box.style.right = result;
					}
				} else if ($this.state == 'wantToHide'){
					var diff= (new Date()).valueOf()-$this.startTime;
					if (diff > 3000){
						$this.action = 'hiding';$this.state='hiding';
						$this.startTime=0;						
					}
				} else if ($this.state == 'showed' || $this.state == 'hided'){
					clearInterval($this.timer);
					$this.timer=null;
				}
				return $this;
			}
		};
		protected.write=function(str){
			var moz = !window.opera && !/Apple/.test(navigator.vendor);
			
			// Watch for writing out closing tags, we just
			// ignore these (as we auto-generate our own)
			if ( str.match(/^<\//) ) return;

			// Make sure & are formatted properly, but Opera
			// messes this up and just ignores it
			if ( !window.opera )
				str = str.replace(/&(?![#a-z0-9]+;)/g, "&amp;");

			// Watch for when no closing tag is provided
			// (Only does one element, quite weak)
			str = str.replace(/<([a-z]+)(.*[^\/])>$/, "<$1$2></$1>");
			
			// Mozilla assumes that everything in XHTML innerHTML
			// is actually XHTML - Opera and Safari assume that it's XML
			if ( !moz )
				str = str.replace(/(<[a-z]+)/g, "$1 xmlns='http://www.w3.org/1999/xhtml'");
			 
			// The HTML needs to be within a XHTML element
			var div = document.createElementNS("http://www.w3.org/1999/xhtml","div");
			div.innerHTML = str;
			
			// Find the last element in the document
			var pos;
			
			// Opera and Safari treat getElementsByTagName("*") accurately
			// always including the last element on the page
			if ( !moz ) {
				pos = document.getElementsByTagName("*");
				pos = pos[pos.length - 1];
				
			// Mozilla does not, we have to traverse manually
			} else {
				pos = document;
				while ( pos.lastChild && pos.lastChild.nodeType == 1 )
					pos = pos.lastChild;
			}
			
			// Add all the nodes in that position
			var nodes = div.childNodes;
			while ( nodes.length )
				pos.parentNode.appendChild( nodes[0] );
		};
	}
	return {
		getInstance : function(protected){
			protected = protected || {};
			init_protected(protected);
			var $this= {
				onScroll : function(scroll){
					if(!protected.disabled && scroll<protected.scrollRange){
						if(protected.requested != protected.maxPage && protected.requested!=protected.nextPage)
						{
							protected.requested=protected.nextPage;
							if(protected.url != null)
							{
								this.sendRequest(protected.url);
							}
						}
					}
				},
				sendRequest : function(url){
					protected.infoBox.setText(' Loading Next Page ').show();
					var obj=document.createElement('html');

					var callback=function(data){
						protected.infoBox.setText(' Data Received ');
						var oldFunction=unsafeWindow.document.write;
						var oldFunction2=unsafeWindow.document.writeln;
						unsafeWindow.document.write=protected.write;
						unsafeWindow.document.writeln=protected.write;

						obj.innerHTML=data;
						//console.log(obj2.contentWindow.document.documentElement.innerHTML);
						//obj = (new DOMParser()).parseFromString(data, "text/xml");

						protected.nextPage++;$this.ProcessResultData(data,obj);
						unsafeWindow.document.write=oldFunction;
						unsafeWindow.document.writeln=oldFunction2;
						obj=null;
						//document.body.removeChild(obj);
						protected.infoBox.hide();
					};
					var ajaxOptions= {
							type: "GET",
							url: url,
							data: null,
							contentType: "application/x-www-form-urlencoded",
							async: true,
							beforeSend: function(xml){
								xml.overrideMimeType('text/html;charset='+(!document.characterSet?document.charset:document.characterSet));
							},
							success: callback,
						};
					try{
						jQ.ajax(ajaxOptions);
					} catch(e){
						GM_xmlhttpRequest({
							method:ajaxOptions.type,
							url: ajaxOptions.url,
							data: ajaxOptions.data,
							overrideMimeType: 'text/html;charset='+(!document.characterSet?document.charset:document.characterSet),
							headers: {
								"X-Requested-With" : "XMLHttpRequest",
								"Content-Type" : "application/x-www-form-urlencoded"
							},
							onload: function(d){ ajaxOptions.success(d.responseText); }
						});
					}
				}
			};
			return $this;
		}
	};
}();

if (window.AutoPagerComponent==null)
	window.AutoPagerComponent=AutoPagerComponent;

})();



(function(){

var Discuz7 = function(){//add Discuz7 support by muziling
	var protected = {};
	var that = AutoPagerComponent.getInstance(protected);

	that.init = function(){
		protected.infoBox.init();
		try{
			var xpath=document.evaluate(".//div[@class='forumcontrol s_clear']//div[@class='pages']/a[attribute::class='next']/preceding-sibling::a[position()=1]/text()"
				,document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (xpath.snapshotLength==1)
				protected.maxPage=xpath.snapshotItem(0).nodeValue.match(/(\d+)/)[0];
			else
				throw "Cannot get maximum page of this thread.";
			protected.insertPoint=xpath.snapshotItem(0).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling;
			var div = xpath.snapshotItem(0).parentNode.parentNode;
			xpath=document.evaluate("./strong/child::text()",div,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var curpage=xpath.snapshotItem(0).nodeValue;
			if (curpage==protected.maxPage){
				throw "Already the last page of thread.";
			}
			protected.nextPage = curpage;
			protected.nextPage++;
			
			var loc=document.location.href.toString();
			var result=null;
			if (loc.match(/\?tid=\d+/)){
				if (loc.match(/&page=\d+/)){
					protected.url = loc.replace(/&page=\d+/,'&page='+protected.nextPage);
				}else // curpage == 1
					protected.url=loc+'&page='+protected.nextPage;
			}else if (result=loc.match(/thread-(\d+)-(\d+)-(\d+)/)){
				protected.url = loc.replace(/thread.*?\.html/,'viewthread.php?tid='+result[1]+'&extra=page='+result[3]+'&page='+protected.nextPage);
			}else{
				throw "Cannot get the next link of thread.";
			}
		}catch(e){
			protected.disabled=true;
			throw (e);
			return;
		}
	};

	that.ProcessResultData = function(data, obj){
		// mixing descendant with ancestor seems odd, but who knows?
		var xpath = document.evaluate(".//div[@id='postlist']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		//var xpath = document.evaluate(".//div[@id='postlist']/div[@class='viewthread_table']"
		//	,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var content=[];
		content[1]=xpath.snapshotItem(0).cloneNode(true);
		//for (var i=0; i<xpath.snapshotLength; ++i)
		//	content[i+1]=xpath.snapshotItem(i).cloneNode(true);
		xpath=document.evaluate(".//div[@class='forumcontrol s_clear']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[0]=xpath.snapshotItem(0).cloneNode(true);
		content.forEach(function(item){
			protected.insertPoint.parentNode.insertBefore(item,protected.insertPoint);
		});
		
		protected.url = protected.url.replace(/&page=\d+/,'&page='+protected.nextPage);
	};

	return that;
}();

var Discuz6 = function(){
	var protected = {};
	var that = AutoPagerComponent.getInstance(protected);

	that.init = function(){
		protected.infoBox.init();
		try{
			var xpath=document.evaluate(".//div[@class='pages_btns']/div[@class='pages']/a[attribute::class='next']/preceding-sibling::a[position()=1]/text()"
				,document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (xpath.snapshotLength==2)
				protected.maxPage=xpath.snapshotItem(1).nodeValue.match(/(\d+)/)[1];
			else
				throw "Cannot get maximum page of this thread.";
			protected.insertPoint=xpath.snapshotItem(1).parentNode.parentNode.parentNode.nextSibling;
			var div = xpath.snapshotItem(0).parentNode.parentNode;
			xpath=document.evaluate("./strong/child::text()",div,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var curpage=xpath.snapshotItem(0).nodeValue;
			if (curpage==protected.maxPage){
				throw "Already the last page of thread.";
			}
			protected.nextPage = curpage;
			protected.nextPage++;
			
			var loc=document.location.href.toString();
			var result=null;
			if (loc.match(/\?tid=\d+/)){
				if (loc.match(/&page=\d+/)){
					protected.url = loc.replace(/&page=\d+/,'&page='+protected.nextPage);
				}else // curpage == 1
					protected.url=loc+'&page='+protected.nextPage;
			}else if (result=loc.match(/thread-(\d+)-(\d+)-(\d+)/)){
				protected.url = loc.replace(/thread.*?\.html/,'viewthread.php?tid='+result[1]+'&extra=page='+result[3]+'&page='+protected.nextPage);
			}else{
				throw "Cannot get the next link of thread.";
			}
		}catch(e){
			protected.disabled=true;
			throw (e);
			return;
		}
	};

	that.ProcessResultData = function(data, obj){
		// mixing descendant with ancestor seems odd, but who knows?
		var xpath = document.evaluate(".//form//div[@class='mainbox viewthread']/ancestor::form"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var content=[];
		content[1]=xpath.snapshotItem(0).cloneNode(true);

		xpath=document.evaluate(".//div[@class='pages_btns']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[0]=xpath.snapshotItem(0).cloneNode(true);
		content[2]=xpath.snapshotItem(1).cloneNode(true);

		content.forEach(function(item){
			protected.insertPoint.parentNode.insertBefore(item,protected.insertPoint);
		});
		
		protected.url = protected.url.replace(/&page=\d+/,'&page='+protected.nextPage);
	};

	return that;
}();

var Discuz5 = function(){
	var protected = {};
	var that = AutoPagerComponent.getInstance(protected);

	that.init = function(){
		protected.infoBox.init();
		try{
			var xpath=document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='maintable']/descendant-or-self::node()/child::div[attribute::class='p_bar']/a[attribute::class='p_pages']/child::text()"
				,document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (xpath.snapshotLength==2)
				protected.maxPage=xpath.snapshotItem(1).nodeValue.match("/(\\d+)")[1];
			else
				throw "Cannot get maximum page of this thread.";
			protected.insertPoint=xpath.snapshotItem(1).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling;
			var div = xpath.snapshotItem(0).parentNode.parentNode;
			xpath=document.evaluate("self::node()/child::a[attribute::class='p_curpage']/child::text()",div,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var curpage=xpath.snapshotItem(0).nodeValue;
			if (curpage==protected.maxPage){
				throw "Already the last page of thread.";
			}
			protected.nextPage = curpage;
			protected.nextPage++;
			
			var loc=document.location.href.toString();
			var result=null;
			if (loc.match(/\?tid=\d+/)){
				if (loc.match(/&page=\d+/)){
					protected.url = loc.replace(/&page=\d+/,'&page='+protected.nextPage);
				}else // curpage == 1
					protected.url=loc+'&page='+protected.nextPage;
			}else if (result=loc.match(/thread-(\d+)-(\d+)-(\d+)/)){
				protected.url = loc.replace(/thread.*?\.html/,'viewthread.php?tid='+result[1]+'&extra=page='+result[3]+'&page='+protected.nextPage);
			}else{
				throw "Cannot get the next link of thread.";
			}
		}catch(e){
			protected.disabled=true;
			throw (e);
			return;
		}
	};

	that.ProcessResultData = function(data, obj){
		// mixing descendant with ancestor seems odd, but who knows?
		var xpath = document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='maintable']/descendant-or-self::node()/child::div[attribute::class='p_bar']/ancestor::div[attribute::class='maintable']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var content=[];

		content[0]=xpath.snapshotItem(0).cloneNode(true);
		content[2]=xpath.snapshotItem(1).cloneNode(true);

		// Is there anyway to specify two OR child nodes in one statement?
		xpath = document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='maintable']/descendant-or-self::node()/child::tr[attribute::class='header']/ancestor::div[attribute::class='maintable']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[1]=xpath.snapshotItem(0).cloneNode(true);

		content.forEach(function(item){
			protected.insertPoint.parentNode.insertBefore(item,protected.insertPoint);
		});
		
		protected.url = protected.url.replace(/&page=\d+/,'&page='+protected.nextPage);
	};

	return that;
}();

var vBulletin3_8 = function(){
	var protected = {};
	var that = AutoPagerComponent.getInstance(protected);

	that.init = function(){
		protected.infoBox.init();
		var xpath=document.evaluate(".//div[@class='page']//div[@class='pagenav']//td[@class='vbmenu_control'][1]"
			,document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (xpath.snapshotLength==2)
			protected.maxPage=xpath.snapshotItem(0).firstChild.nodeValue.match(/(\d+)/g)[1];
		else {
			protected.disabled=true;
			return;
		}

		var curpage=xpath.snapshotItem(0).firstChild.nodeValue.match(/(\d+)/g)[0];
		if (curpage==protected.maxPage){
			protected.disabled=true;
			return;
		}

		protected.nextPage = parseInt(curpage)+1;
		var a=xpath.snapshotItem(0).parentNode.getElementsByTagName('a')[0].href.toString();
		var result=null;
		if (a.match(/\/showthread\.php\?/)){
			protected.url = a.toString().replace(/&page=\d+/,'&page='+protected.nextPage);
		}else if (result=a.match(/\/thread\/(\d+)\/(\d+)\//)){
			protected.url = a.replace(/\/thread\/.*/,'/showthread.php?t='+result[2]+'&page='+protected.nextPage);
		}else if (result=a.match(/\/thread(\d+)-(\d+)\.html/)){
			protected.url = a.replace(/\/thread.*?\.html/,'/showthread.php?t='+result[1]+'&page='+protected.nextPage);
		}

		xpath=document.evaluate("./ancestor::table"
			,xpath.snapshotItem(1),null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var pageBar=xpath.snapshotItem(xpath.snapshotLength-2);
		pageBar.style.cssText="visibility: hidden"
		protected.insertPoint=document.getElementById('lastpost');
	};
	that.ProcessResultData = function(data, obj){
		var xpath = document.evaluate(".//table//div[@class='pagenav']//td[@class='vbmenu_control'][1]"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var content=[];
		var xpath2 = document.evaluate("./ancestor::table"
			,xpath.snapshotItem(0),null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[0]=xpath2.snapshotItem(xpath2.snapshotLength-2).cloneNode(true);
		xpath2 = document.evaluate("./ancestor::table"
			,xpath.snapshotItem(1),null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[2]=xpath2.snapshotItem(xpath2.snapshotLength-2).cloneNode(true);
		xpath = document.evaluate(".//td[@id='threadtools']/ancestor::table[@class='tborder']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		xpath = document.evaluate(".//td[@id='threadtools']/ancestor::table"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[1]=xpath.snapshotItem(xpath.snapshotLength-1).cloneNode(true);
		//content[1].setAttribute('style','background-color: none');
		xpath = document.evaluate(".//div[@id='posts']/div"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=xpath.snapshotLength-2;i>=0 ;i-- )
		{
			content.splice(2, 0, xpath.snapshotItem(i).cloneNode(true));
		}
		content.forEach(function(item){
			protected.insertPoint.parentNode.insertBefore(item,protected.insertPoint);
		});
		protected.url = protected.url.replace(/&page=\d+/,'&page='+protected.nextPage);
	};

	return that;
}();

var vBulletin = function(){
	var protected = {};
	var that = AutoPagerComponent.getInstance(protected);

	that.init = function(){
		protected.infoBox.init();
		var xpath=document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='page']/descendant-or-self::node()/child::div[attribute::class='pagenav']/descendant-or-self::node()/td[attribute::class='vbmenu_control'][1]"
			,document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		console.log(xpath.snapshotLength);
		if (xpath.snapshotLength==2)
			protected.maxPage=xpath.snapshotItem(1).firstChild.nodeValue.match(/(\d+)/g)[1];
		else {
			protected.disabled=true;
			return;
		}

		var curpage=xpath.snapshotItem(1).firstChild.nodeValue.match(/(\d+)/g)[0];
		if (curpage==protected.maxPage){
			protected.disabled=true;
			return;
		}

		var pagebar = xpath.snapshotItem(1).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		protected.style=pagebar.parentNode.getAttribute('style');
		protected.insertPoint=pagebar.parentNode;
		// move page bar location
		var pagebar2 = pagebar.cloneNode(true);
		pagebar.parentNode.parentNode.insertBefore(pagebar2,pagebar.parentNode);
		pagebar2.setAttribute('style',protected.style);
		pagebar.parentNode.removeChild(pagebar);
	 
		protected.nextPage = curpage;
		protected.nextPage++;
		var a=xpath.snapshotItem(0).parentNode.getElementsByTagName('a')[0].href.toString();
		var result=null;
		if (a.match(/\/showthread\.php\?/)){
			protected.url = a.toString().replace(/&page=\d+/,'&page='+protected.nextPage);
		}else if (result=a.match(/\/thread\/(\d+)\/(\d+)\//)){
			protected.url = a.replace(/\/thread\/.*/,'/showthread.php?t='+result[2]+'&page='+protected.nextPage);
		}
	};
	that.ProcessResultData = function(data, obj){
		var xpath = document.evaluate(".//table//div[@class='pagenav']//td[@class='vbmenu_control']/ancestor::table/ancestor::table"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var content=[];
		content[0]=xpath.snapshotItem(0).cloneNode(true);
		content[3]=xpath.snapshotItem(1).cloneNode(true);
		xpath = document.evaluate(".//td[@id='threadtools']/ancestor::table[@class='tborder']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[1]=xpath.snapshotItem(0).cloneNode(true);
		content[1].setAttribute('style','background-color: none');
		content.forEach(function(item){
			item.setAttribute('style',protected.style);
		});
		xpath = document.evaluate(".//div[@id='posts']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[2]=xpath.snapshotItem(0).cloneNode(true);

		content.forEach(function(item){
			protected.insertPoint.parentNode.insertBefore(item,protected.insertPoint);
		});
		protected.url = protected.url.replace(/&page=\d+/,'&page='+protected.nextPage);
	};

	return that;
}();

var generator = document.evaluate("self::node()/descendant-or-self::node()/meta[attribute::name='generator']",document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (generator!=null){
	generator = generator.content || "";
	if (generator.match("Discuz! 7")){
		AutoPager.init(Discuz7);
	}
	else if (generator.match("Discuz! 6")){
		AutoPager.init(Discuz6);
	}
	else if (generator.match("Discuz! 5")){
		AutoPager.init(Discuz5);
	}
	else if (generator.match("vBulletin 3\.0")){
		AutoPager.init(vBulletin);
	}
	else if (generator.match("vBulletin 3\.")){
		AutoPager.init(vBulletin3_8);
	}
}
else{
	var v = document.getElementById("footlink");
	if (v==null) v = document.getElementById("rightinfo");
	if (v){
		if (v.textContent.indexOf("Discuz! 7") >= 0){
			AutoPager.init(Discuz7);
		}
		else if (v.textContent.indexOf("Discuz! 6") >= 0){
			AutoPager.init(Discuz6);
		}
		else if (v.textContent.indexOf("Discuz! 5") >= 0){
			AutoPager.init(Discuz5);
		}
	}
}

})();