// ==UserScript==
// @name           ETI Imagemap Insert
// @namespace      pendevin
// @description    Allows you to quickly access your imagemap and post image tags. Bring up the imagemap with Alt+`
// @include        http://endoftheinter.net/postmsg.php*
// @include        http://boards.endoftheinter.net/postmsg.php*
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        https://endoftheinter.net/postmsg.php*
// @include        https://boards.endoftheinter.net/postmsg.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// ==/UserScript==


//xhtmlhttprequest handler
//i got this from shoecream's userscript autoupdater at http://userscripts.org/scripts/show/45904
var XHR={
	// r.doc is the returned page
	// r.respose is the response element
	createDoc:function(response,callback,optional){
		var doc=document.implementation.createDocument('','',null);
		var html=document.createElement("html");
		html.innerHTML=response.responseText;
		doc.appendChild(html);
		var r={};
		r.response=response;
		r.doc=doc;
		callback(r,optional);
	},

	//sends the XHR request, callback is the function to call on the returned page
	get:function(url,callback,optional){
		if(optional==undefined)optional=null;
		GM_xmlhttpRequest({
			method:'GET',
			url:url,
			headers:{
				'User-Agent': navigator.userAgent,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			onload:function(r){XHR.createDoc(r,callback,optional);}
		});
	}
}

//not a method
function insertAfter(newNode,target){
	var parent=target.parentNode;
	var refChild=target.nextSibling;
	if(refChild!=null)parent.insertBefore(newNode,refChild);
	else parent.appendChild(newNode);
}

function simulateClick(element){
	var evt=document.createEvent('MouseEvents');
	evt.initMouseEvent('click',true,true,window,1,0,0,0,0,false,false,false,false,0,null);
	element.dispatchEvent(evt);
}

//sets up a resizable box by having a draggable handle
//obj is the object to be resized. should have inline width and height styles
//handle is the object that is a draggable handle for resizing
//x and y are booleans determining if the object is resizable on the x and y axes
function dragResize(obj,handle,x,y){
	//change the height of the element
	function mousemove(e){
		var diffX=e.clientX-oldX;
		var diffY=e.clientY-oldY;
		if(x)
			obj.style.height=(oldWidth+diffX)+'px';
		if(y)
			obj.style.height=(oldHeight+diffY)+'px';
	}

	//clean shit up
	function mouseup(){
		document.removeEventListener('mousemove',mousemove,false);
		document.removeEventListener('mouseup',mouseup,false);
	}

	//init variables
	var oldX,oldY,oldWidth,oldHeight;
	handle.addEventListener('mousedown',function(e){
		e.preventDefault();
		//old values
		oldX=e.clientX;
		oldY=e.clientY;
		oldWidth=parseInt(obj.style.width.slice(0,-2));
		oldHeight=parseInt(obj.style.height.slice(0,-2));
		//listeners for dragging shit
		document.addEventListener('mousemove',mousemove,false);
		document.addEventListener('mouseup',mouseup,false);
		document.getElementById('draggy_thing').addEventListener('click',function(e){e.preventDefault();},false);
	},false);
}

function insertImage(e){
	e.preventDefault();
	if(document.getElementsByClassName('quickpost')[0]){
		var textArea=document.getElementsByClassName('quickpost')[0].getElementsByTagName('textarea')[0];
		if(getComputedStyle(document.getElementsByClassName('quickpost-canvas')[0],null).getPropertyValue('display')=='none')
			simulateClick(document.getElementsByClassName('quickpost-nub')[0]);
	}
	else if(document.getElementById('message'))
		var textArea=document.getElementById('message');
	var scrolled=textArea.scrollTop;
	var cursor=textArea.selectionEnd;
	var tag='<img src="'+decodeURI(e.target.parentNode.href.replace(/dealtwith\.it/,'endoftheinter.net'))+'" />';
	textArea.value=textArea.value.substring(0,cursor)+tag+textArea.value.substring(cursor);
	textArea.scrollTop=scrolled;
	textArea.selectionEnd=cursor+tag.length;
	textArea.focus();
}

function keyDown(e){
	if(!e.ctrlKey&&e.altKey&&e.which==96){
		e.preventDefault();
		insert.style.display=insert.style.display=='none'?'block':'none';
	}
}

function getMap(p){
	XHR.get(location.protocol+'//images.endoftheinter.net/imagemap.php?page='+p,function(r){
		grid.appendChild(r.doc.getElementsByClassName('image_grid')[0]);
		var desc=grid.lastChild.getElementsByClassName('block_desc');
		for(var i=0;i<desc.length;i++)desc[i].innerHTML=desc[i].firstChild.innerHTML;
		var block=grid.lastChild.getElementsByClassName('grid_block');
		for(i=0;i<block.length;i++){
			block[i].firstChild.href=block[i].firstChild.firstChild.src.replace(/\/t\//,'/n/').slice(0,-3)+(block[i].lastChild.innerHTML.slice(-3)=='png'||block[i].lastChild.innerHTML.slice(-3)=='jpg'||block[i].lastChild.innerHTML.slice(-3)=='gif'?block[i].lastChild.innerHTML.slice(-3):'jpg');
			if(block[i].lastChild.innerHTML=='')block[i].style.display='none';
			block[i].firstChild.addEventListener('click',insertImage,false);
		}
	});
	page++;
}

var insert=document.createElement('div');
insert.id='imagemapInsert';
insert.style.display='none';
insert.innerHTML='<div id="imagemapInsert_ImageGrids">\
	</div>\
	<div id="imagemapInsert_GetMore" class="infobar">\
		<span id="imagemapInsert_GetMoreText" class="linky">Load More</span> | \
		<span id="imagemapInsert_Close" class="linky">Close</span> | \
		<a href="#" id="draggy_thing">grip</a>\
	</div>';
var grid=insert.firstChild;
grid.style.height='369px';
var page=1;
document.getElementsByClassName('body')[0].appendChild(insert);
dragResize(grid,document.getElementById('draggy_thing'),false,true);
getMap(page);
document.getElementById('imagemapInsert_GetMoreText').addEventListener('click',function(){getMap(page)},true);
var button=document.createElement('input');
button.id='imagemapInsert_Button';
button.type='button';
button.value='Imagemap';
if(document.getElementsByClassName('quickpost-nub')[0])
	document.getElementsByClassName('quickpost-body')[0].appendChild(button);
else if(document.getElementById('message'))
	document.getElementById('message').parentNode.appendChild(button);
var closeme=document.getElementById('imagemapInsert_Close');
button.addEventListener('click',function(){insert.style.display=insert.style.display=='block'?'none':'block';},false);
closeme.addEventListener('click',function(){insert.style.display='none';},false);
document.addEventListener('keypress',keyDown,true);

GM_addStyle('\
	#imagemapInsert{position:fixed;top:0;background-color:'+
		window.getComputedStyle(document.body).getPropertyValue('background-color')+
		';border-width:0 1px 1px 1px;border-style:solid;border-color:'+
		window.getComputedStyle(document.getElementsByClassName('quickpost')[0]).getPropertyValue('border-top-color')+
		';margin:0 9 0 0;padding:2px 5px;}\
	#imagemapInsert_ImageGrids{overflow-y:scroll;}\
	#imagemapInsert_GetMore{width:100%;padding:1px 0;margin:5px 0 2px;display:inline-block;}\
	.linky{cursor:pointer;text-decoration:underline;}\
');


//that thing for kamano with the insert shit for the uploader
//listen for the uploader to open
document.addEventListener('DOMNodeInserted',uploadListener,false);

//parse the images in the uploader and listen for more images to pop up
function uploadListener(e){
	if(e.target.className=='upload_form'){
		//e.target.addEventLister('DOMNodeInserted',function(e){unsafeWindow.console.log(e);},false);
		//if there are any images in there already, listen for clicks on them
		var imgs=e.target.firstChild.getElementsByClassName('img');
		unsafeWindow.console.log(e.target.firstChild.contentDocument)
		for(var i=0;i<imgs.length;i++){
			unsafeWindow.console.log(imgs[i]);
			imgs[i].addEventListener('click',uploaderInsert,false);
		}
		//listen for changes
		e.target.firstChild.addEventLister('DOMSubtreeModified',function(e){unsafeWindow.console.log(e.target);},false);
	}
}

function uploaderInsert(e){
	unsafeWindow.console.log('sip');
}


//function upload_form(a,c,b){
//	this.iframe=document.createElement("iframe");
//	this.iframe.src="//u.endoftheinter.net/u.php?topic="+b;
//	this.iframe.className="upload_form";
//	this.iframe.frameBorder=0;
//	var d=document.createElement("div");
//	d.className="upload_form";
//	d.appendChild(this.iframe);
//	c.parentNode.insertBefore(d,c.nextSibling);
//	CSS.addClass(c.parentNode,"has-upload-form");
//	return d;
//}
//function tagTopic(c,a,b){
//	if(Ajax("/ajax.php?r="+(b?1:2)+"&t="+a).onsuccess(function(d){
//		if(d.error){
//			c.firstChild.nodeValue=d.error
//		}
//		else{
//			c.firstChild.nodeValue=b?"Untag":"Tag";
//			c.onclick=function(){return !tagTopic(c,a,!b)};
//			c.href=c.href.replace(/tag=\d/,"tag="+(b?"0":"1"))
//		}
//	}).send()){
//		c.firstChild.nodeValue=b?"Tagging...":"Untagging...";
//		c.onclick=function(){return false};
//		return true
//	}
//	else{
//		return false
//	}
//}
//function clearBookmark(a,b){
//	Ajax("/ajax.php?r=3&t="+a).onsuccess(function(c){
//		if(!c.error){
//			b.innerHTML=""
//		}
//	}).send();
//	return false
//}
//function toggle_spoiler(a){
//	while(!/spoiler_(?:open|close)/.test(a.className)){
//		a=a.parentNode
//	}
//	a.className=a.className.indexOf("closed")!=-1?a.className.replace("closed","opened"):a.className.replace("opened","closed");
//	return false
//}
//var contentLoadedHooks=[];
//function onDOMContentLoaded(a){
//	if(window.loaded){
//		a()
//	}
//	else{
//		contentLoadedHooks.push(a)
//	}
//}
//function DOMContentLoaded(){
//	if(window.loaded){
//		return
//	}
//	window.loaded=true;
//	contentLoadedHooks.invoke("call");
//	EventNotifier.init();
//	var a=document.body.getElementsByTagName("script"),b;
//	while(b=a[0]){
//		b.parentNode.removeChild(b)
//	}
//}
//if(/WebKit/i.test(navigator.userAgent)){
//	var _onloadTimer=setInterval(function(){
//		if(/loaded|complete/.test(document.readyState)){
//			clearInterval(_onloadTimer);
//			DOMContentLoaded()
//		}
//	},10)
//}
//else{
//	if(document.addEventListener){
//		document.addEventListener("DOMContentLoaded",DOMContentLoaded,false)
//	}
//	else{
//		document.write('<script onreadystatechange="if(this.readyState==\'complete\')DOMContentLoaded()" defer="defer" src="javascript:void(0)"><\/script>')
//	}
//}
//function chain(b,a){
//	return function(){return(b&&b.apply(this,arguments)===false||a&&a.apply(this,arguments)===false)?true:undefined}
//}
//function addEventListener(c,b,a){
//	if(c.addEventListener){
//		c.addEventListener(b,a,false)
//	}
//	else{
//		if(c.attachEvent){
//			c.attachEvent("on"+b,a)
//		}
//		else{c["on"+b]=chain(c["on"+b],a)
//		}
//	}
//}
//function $(a){
//	return document.getElementById(a)
//}
//var DOM={
//	eval:function(d){
//		var h=d.getElementsByTagName("script"),b;
//		if(DOM.scriptsEval===null){
//			DOM.scriptsEval=false;
//			var a=document.createElement("div");
//			a.innerHTML="<script>DOM.scriptsEval = true<\/script>";
//			document.body.removeChild(document.body.appendChild(a))
//		}
//		while(b=h[0]){
//			if(!DOM.scriptsEval){
//				var g=b.innerHTML,c=document.createElement("script");
//				c.type="text/javascript";
//				try{
//					c.appendChild(document.createTextNode(g))
//				}
//				catch(f){
//					c.text=g
//				}
//				document.body.appendChild(c).parentNode.removeChild(c)
//			}
//			b.parentNode.removeChild(b)
//		}
//	},
//	scriptsEval:null,
//	getCaret:function(c){
//		if("selectionStart" in c){
//			return{
//				start:c.selectionStart,
//				end:c.selectionEnd
//			}
//		}
//		else{
//			try{
//				var b=document.selection.createRange(),f=b.duplicate();
//				f.moveToElementText(c);
//				f.setEndPoint("StartToEnd",b);
//				var a=c.value.length-f.text.length;
//				f.setEndPoint("StartToStart",b);
//				return{
//					start:c.value.length-f.text.length,
//					end:a
//				}
//			}
//			catch(d){
//				return{
//					start:0,
//					end:0
//				}
//			}
//		}
//	},
//	setCaret:function(d,e,a){
//		if(a===void 0){
//			a=e
//		}
//		else{
//			a=Math.min(d.value.length,a)
//		}
//		if("selectionStart" in d){
//			d.focus();
//			d.selectionStart=e;
//			d.selectionEnd=a
//		}
//		else{
//			if(d.tagName==="TEXTAREA"){
//				var c=d.value.indexOf("\r",0);
//				while(c!=-1&&c<a){
//					--a;
//					if(c<e){
//						--e
//					}
//					c=d.value.indexOf("\r",c+1)
//				}
//			}
//			var b=d.createTextRange();
//			b.collapse(true);
//			b.moveStart("character",e);
//			if(a!=undefined){
//				b.moveEnd("character",a-e)
//			}
//			b.select()
//		}
//	},
//	serializeForm:function(b){
//		var a={};
//		$A(b.elements).forEach(function(c){
//			if(c.tagName!="INPUT"||(c.type!="submit"&&c.type!="button")){
//				a[c.name]=c.value
//			}
//		});
//		return a
//	}
//};
//var CSS={
//	hasClass:function(b,a){
//		return new RegExp("(?:^|\\s)"+a+"(?:\\s|$)").test(b.className)
//	},
//	addClass:function(b,a){
//		CSS.hasClass(b,a)||(b.className+=" "+a)
//	},
//	removeClass:function(b,a){
//		b.className=b.className.replace(new RegExp("(?:^|\\s)"+a+"(?:\\s|$)","g"),"")
//	},
//	toggleClass:function(b,a){
//		(CSS.hasClass(b,a)?CSS.removeClass:CSS.addClass)(b,a)
//	},
//	getComputedStyle:function(a){
//		if(window.getComputedStyle){
//			return getComputedStyle(a,null)
//		}
//		if(document.defaultView&&document.defaultView.getComputedStyle){
//			return document.defaultView.getComputedStyle(a,null)
//		}
//		if(a.currentStyle){
//			return a.currentStyle
//		}
//		return a.style
//	}
//};
//function json_encode(c){
//	var a=[];
//	if(c instanceof Array){
//		for(var b=0;b<c.length;b++){
//			a.push(json_encode(c[b]))
//		}
//		return"["+a.join(",")+"]"
//	}
//	else{
//		if(typeof c=="object"){
//			for(var b in c){
//				a.push('"'+b+'":'+json_encode(c[b]))
//			}
//			return"{"+a.join(",")+"}"
//		}
//		else{
//			if(typeof c=="string"){
//				return'"'+c.replace(/"/g,'\\"').replace(/\\/g,"\\\\")+'"'
//			}
//			else{
//				return""+c
//			}
//		}
//	}
//}
//Function.prototype.bind=function(b){
//	var c=this,a=arguments.length>1?[].slice.call(arguments,1):null;
//	return function(){
//		return c.apply(b,a?a.concat([].slice.call(arguments)):arguments)
//	}
//};
//Function.prototype.bindShift=function(b){
//	var c=this,a=arguments.length>1?[].slice.call(arguments,1):null;
//	return function(){
//		...move=document.onmouseup=null;
//		document.body.style.cursor="auto"
//	};
//	document.body.style.cursor="pointer";
//	return false
//};
//QuickPost.prototype.onselectionchange=function(range){
//	if(!this.expanded){
//		return
//	}
//	range=range||getSelectedRange();
//	var oldRange=this.range;
//	this.range=null;
//	if(!range){
//		this.killQuoteBox();
//		return
//	}
//	var parentNode=getQuotableParent(range);
//	if(!parentNode){
//		this.killQuoteBox();
//		return
//	}
//	range=expandRangeToSpoiler(stripSigFromRange(range,this.quoteRoot=parentNode));
//	if(oldRange&&oldRange.startContainer==range.startContainer&&oldRange.endContainer==range.endContainer&&oldRange.startOffset==range.startOffset&&oldRange.endOffset==range.endOffset){
//		this.range=oldRange;
//		return
//	}
//	this.killQuoteBox();
//	var box=getRangeBoundingBox(range,parentNode);
//	if(parentNode.offsetParent==document.body){
//		box.top+=parentNode.offsetTop;
//		box.left+=parentNode.offsetLeft
//	}
//	else{
//		box.top+=parentNode.offsetParent.offsetTop;
//		box.left+=parentNode.offsetParent.offsetLeft
//	}
//	this.visibleBox=new QuoteBox(box);
//	this.visibleBox.subscribe("click",this.onquote.bind(this));
//	this.range={
//		startContainer:range.startContainer,
//		endContainer:range.endContainer,
//		startOffset:range.startOffset,
//		endOffset:range.endOffset
//	}
//};
//this.QuickPost=QuickPost();
//function uiPagerBrowser(d,a,c,b){
//	this.dom=d;
//	this.uri=a;
//	this.rows=c;
//	this.page=b
//}
//uiPagerBrowser.prototype.perPage=50;
//uiPagerBrowser.prototype.setRows=function(b){
//	var a=this.getPages();
//	this.rows=b;
//	if(a!=this.getPages()){
//		this.updateDOM(a,this.getPages())
//	}
//};
//uiPagerBrowser.prototype.getPage=function(){
//	return this.page
//};
//uiPagerBrowser.prototype.getPages=function(){
//	return Math.max(1,Math.ceil(this.rows/this.perPage))
//};
//uiPagerBrowser.prototype.updateDOM=function(e,b){
//	var d=this.dom.lastChild,c=d.previousSibling,a=this.dom.getElementsByTagName("span")[0];
//	var f=d.getElementsByTagName("a")[0];
//	f.href=f.href.replace(/page=[0-9]+/,"page="+b);
//	if(this.getPage()<this.getPages()){
//		c.style.display="inline"
//	}
//	if(this.getPage()+1<this.getPages()){
//		d.style.display="inline"
//	}
//	a.innerHTML=b
//};
//function uiPagerEnum(d,a,c,b){
//	uiPagerBrowser.call(this,d,a,c,b)
//}
//uiPagerEnum.prototype=new uiPagerBrowser;
//uiPagerEnum.prototype.updateDOM=function(c,a){
//	var b=c;
//	while(++b<=a){
//		this.dom.appendChild(document.createTextNode(" | "));
//		var d=document.createElement("a");
//		d.href=this.uri+"&page="+b;
//		d.appendChild(document.createTextNode(b));
//		this.dom.appendChild(d)}
//};
//function PrivateMessageManager(c,b,a){
//	this.dom=c;
//	this.count=b;
//	EventNotifier.register(a[0],a[1],this.update.bind(this))
//}
//PrivateMessageManager.prototype.update=function(a){
//	this.dom.style.display=a?"inline":"none";
//	this.count.innerHTML=a
//};
//
//
//
//function ImageLoader(d,c,b,a){
//	this.dom=d;
//	this.src=c;
//	this.width=b;
//	this.height=a;
//	ImageLoader.instances[this.instance=ImageLoader.instanceCount++]=this;
//	if(!ImageLoader.timeout){
//		window.onresize=window.onscroll=window.onload=ImageLoader.onViewportChanged;
//		ImageLoader.timeout=ImageLoader.onViewportChanged.defer()
//	}
//}
//ImageLoader.instances={};
//ImageLoader.instanceCount=0;
//ImageLoader.loading={};
//ImageLoader.loadingSlots=10;
//ImageLoader.onViewportChanged=function(){
//	delete ImageLoader.timeout;
//	var a=ImageLoader.getViewportSlice();
//	for(var b in ImageLoader.instances){
//		if(!ImageLoader.loadingSlots){
//			break
//		}
//		if(ImageLoader.intersects(a,ImageLoader.instances[b].getElementSlice())){
//			ImageLoader.instances[b].load()
//		}
//	}
//};
//ImageLoader.getViewportSlice=function(){
//	return[document.body.scrollTop||document.documentElement.scrollTop,window.innerHeight||document.documentElement.clientHeight]
//};
//ImageLoader.intersects=function(b,a){
//	return !a||b[1]&&a[1]&&b[0]<a[0]+a[1]&&a[0]<b[0]+b[1]
//};
//ImageLoader.doneHandler=function(a){
//	if(a in ImageLoader.loading){
//		ImageLoader.loading[a].dom.className="img-loaded";
//		delete ImageLoader.loading[a];
//		++ImageLoader.loadingSlots
//	}
//};
//ImageLoader.prototype.getElementSlice=function(){
//	var a=this.dom.offsetTop,d=this.dom.offsetParent,c=this.dom.parentNode,b;
//	while(d){
//		b=CSS.getComputedStyle(c);
//		if(c==d){
//			if(b.position=="fixed"){
//				a+=(document.body.scrollTop||document.documentElement.scrollTop)
//			}
//			a+=c.offsetTop;d=d.offsetParent
//		}
//		if(b.overflowY=="auto"){
//			return false
//		}
//		c=c.parentNode
//	}
//	return[a,this.dom.offsetHeight]
//};
//ImageLoader.prototype.load=function(){
//	delete ImageLoader.instances[this.instance];
//	ImageLoader.loading[this.instance]=this;
//	--ImageLoader.loadingSlots;
//	var b=document.createElement("img");
//	this.img=b;
//	b.onload=ImageLoader.doneHandler.bind(null,this.instance);
//	b.onerror=this.fallBack.bind(this);
//	b.src=this.src;
//	b.width=this.width;
//	b.height=this.height;
//	this.dom.appendChild(b);
//	var a;
//	for(var c in ImageLoader.instances){
//		if(ImageLoader.instances[c].src==this.src){
//			a=b.cloneNode(false);
//			ImageLoader.instances[c].img=a;
//			a.onload=function(){
//				this.className="img-loaded"
//			}.bind(ImageLoader.instances[c].dom);
//			a.onerror=this.fallBack.bind(ImageLoader.instances[c]);
//			ImageLoader.instances[c].dom.appendChild(a);
//			delete ImageLoader.instances[c]
//		}
//	}
//};
//ImageLoader.prototype.fallBack=function(){
//	var a=this.img.src.replace("dealtwith.it","endoftheinter.net");
//	if(a!=this.img.src){
//		this.img.src=a
//	}
//	this.dom.className="img-loaded";
//	ImageLoader.doneHandler(this.instance)
//};
